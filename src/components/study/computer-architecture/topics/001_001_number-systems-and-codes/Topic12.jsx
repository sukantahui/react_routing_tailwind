import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import rawNotes from "./topic12_files/topic12_note.txt?raw";
import topic12Questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  const [activeTab, setActiveTab] = useState("utf8");
  
  // Interactive Workbench State
  const [inputText, setInputText] = useState("KOLKATA");
  const [inputNumber, setInputNumber] = useState(25);
  const [grayMode, setGrayMode] = useState("bin2gray"); // bin2gray or gray2bin
  const [grayInput, setGrayInput] = useState("1011");

  // Helper conversions
  const getAsciiTable = (str) => {
    return str.split("").map((ch) => {
      const code = ch.charCodeAt(0);
      const bin7 = (code & 0x7f).toString(2).padStart(7, "0");
      const evenParity = bin7.split("").filter((b) => b === "1").length % 2 === 0 ? "0" : "1";
      const hex = code.toString(16).toUpperCase().padStart(2, "0");
      return { ch, code, bin7, evenParity: evenParity + bin7, hex };
    });
  };

  const getBcdPacked = (num) => {
    const s = Math.abs(Math.floor(num)).toString();
    const unpacked = s.split("").map((digit) => {
      const val = parseInt(digit, 10);
      return { digit, bin4: val.toString(2).padStart(4, "0") };
    });
    const packedHex = unpacked.map(u => u.bin4).join(" ");
    return { unpacked, packedHex };
  };

  const binToGray = (binStr) => {
    if (!/^[01]+$/.test(binStr)) return { gray: "Invalid Binary", steps: [] };
    let gray = binStr[0];
    const steps = [`G[${binStr.length - 1}] = B[${binStr.length - 1}] = ${binStr[0]}`];
    for (let i = 1; i < binStr.length; i++) {
      const bPrev = parseInt(binStr[i - 1], 10);
      const bCurr = parseInt(binStr[i], 10);
      const gBit = bPrev ^ bCurr;
      gray += gBit;
      steps.push(`G[${binStr.length - 1 - i}] = B[${binStr.length - i}] ⊕ B[${binStr.length - 1 - i}] (${bPrev} ⊕ ${bCurr}) = ${gBit}`);
    }
    return { gray, steps };
  };

  const grayToBin = (grayStr) => {
    if (!/^[01]+$/.test(grayStr)) return { bin: "Invalid Gray Code", steps: [] };
    let bin = grayStr[0];
    const steps = [`B[${grayStr.length - 1}] = G[${grayStr.length - 1}] = ${grayStr[0]}`];
    for (let i = 1; i < grayStr.length; i++) {
      const bPrev = parseInt(bin[i - 1], 10);
      const gCurr = parseInt(grayStr[i], 10);
      const bBit = bPrev ^ gCurr;
      bin += bBit;
      steps.push(`B[${grayStr.length - 1 - i}] = B[${grayStr.length - i}] ⊕ G[${grayStr.length - 1 - i}] (${bPrev} ⊕ ${gCurr}) = ${bBit}`);
    }
    return { bin, steps };
  };

  const asciiRows = getAsciiTable(inputText || " ");
  const bcdData = getBcdPacked(inputNumber || 0);
  const grayResult = grayMode === "bin2gray" ? binToGray(grayInput || "0") : grayToBin(grayInput || "0");

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Title & Metadata */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Computer Architecture • Module 001.001 • Topic 12
            </span>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Data Representation & Encoding
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Binary Codes: ASCII, Unicode (UTF-8), BCD, and Gray Code
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
            Uncover how computers translate numbers, alphabets, and physical sensor rotations into digital bits. Explore 7-bit ASCII, global UTF-8 variable-length encoding, commercial Packed BCD for financial math, and unit-distance Gray codes preventing mechanical jitter in robotic shaft encoders.
          </p>
        </header>

        {/* 3-Tab Architecture SVG Suite */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">⚡</span> Architectural Code Standards & Hardware Encoders
              </h2>
              <p className="text-sm text-slate-400">
                Visualizing character representations, mechanical shaft discs, and packed financial digits.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("utf8")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "utf8"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                1. UTF-8 Byte Layouts
              </button>
              <button
                onClick={() => setActiveTab("gray")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "gray"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                2. Gray Code vs Binary Discs
              </button>
              <button
                onClick={() => setActiveTab("bcd")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "bcd"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                3. Packed BCD & +6 Correction
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
            {activeTab === "utf8" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <defs>
                  <linearGradient id="utf1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient id="utf2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                  <linearGradient id="utf3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <text x="425" y="30" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Unicode UTF-8 Variable-Length Encoding Standard (RFC 3629)
                </text>

                {/* 1-Byte (ASCII) */}
                <g transform="translate(40, 60)">
                  <rect width="770" height="60" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="13" fontWeight="bold">1-Byte Sequence (U+0000 to U+007F - Standard ASCII)</text>
                  <rect x="20" y="32" width="60" height="22" rx="4" fill="#14b8a6" />
                  <text x="50" y="47" textAnchor="middle" fill="#022c22" fontSize="11" fontWeight="bold">0 (Prefix)</text>
                  <rect x="85" y="32" width="220" height="22" rx="4" fill="#1e293b" stroke="#0d9488" />
                  <text x="195" y="47" textAnchor="middle" fill="#ccfbf1" fontSize="11">7 Payload Bits (x x x x x x x)</text>
                  <text x="330" y="47" fill="#94a3b8" fontSize="12">Example: 'A' (U+0041) → 01000001 (0x41)</text>
                </g>

                {/* 2-Byte */}
                <g transform="translate(40, 135)">
                  <rect width="770" height="60" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="20" y="25" fill="#60a5fa" fontSize="13" fontWeight="bold">2-Byte Sequence (U+0080 to U+07FF - Greek, Arabic, Latin Ext)</text>
                  <rect x="20" y="32" width="70" height="22" rx="4" fill="#3b82f6" />
                  <text x="55" y="47" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1 1 0 (Pfx)</text>
                  <rect x="95" y="32" width="120" height="22" rx="4" fill="#1e293b" stroke="#3b82f6" />
                  <text x="155" y="47" textAnchor="middle" fill="#dbeafe" fontSize="11">5 Bits (x x x x x)</text>
                  <rect x="225" y="32" width="60" height="22" rx="4" fill="#60a5fa" />
                  <text x="255" y="47" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">1 0 (Cont)</text>
                  <rect x="290" y="32" width="140" height="22" rx="4" fill="#1e293b" stroke="#3b82f6" />
                  <text x="360" y="47" textAnchor="middle" fill="#dbeafe" fontSize="11">6 Bits (x x x x x x)</text>
                  <text x="450" y="47" fill="#94a3b8" fontSize="12">Total: 11 payload bits</text>
                </g>

                {/* 3-Byte */}
                <g transform="translate(40, 210)">
                  <rect width="770" height="65" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="20" y="23" fill="#a78bfa" fontSize="13" fontWeight="bold">3-Byte Sequence (U+0800 to U+FFFF - Bengali, Devanagari, CJK, Symbols)</text>
                  <rect x="20" y="32" width="80" height="24" rx="4" fill="#8b5cf6" />
                  <text x="60" y="48" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1 1 1 0 (Pfx)</text>
                  <rect x="105" y="32" width="100" height="24" rx="4" fill="#1e293b" stroke="#8b5cf6" />
                  <text x="155" y="48" textAnchor="middle" fill="#ede9fe" fontSize="11">4 Bits (xxxx)</text>
                  <rect x="215" y="32" width="60" height="24" rx="4" fill="#a78bfa" />
                  <text x="245" y="48" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">1 0 (Cont)</text>
                  <rect x="280" y="32" width="110" height="24" rx="4" fill="#1e293b" stroke="#8b5cf6" />
                  <text x="335" y="48" textAnchor="middle" fill="#ede9fe" fontSize="11">6 Bits (xxxxxx)</text>
                  <rect x="400" y="32" width="60" height="24" rx="4" fill="#a78bfa" />
                  <text x="430" y="48" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">1 0 (Cont)</text>
                  <rect x="465" y="32" width="110" height="24" rx="4" fill="#1e293b" stroke="#8b5cf6" />
                  <text x="520" y="48" textAnchor="middle" fill="#ede9fe" fontSize="11">6 Bits (xxxxxx)</text>
                  <text x="590" y="48" fill="#c084fc" fontSize="12" fontWeight="bold">Bengali 'ক' (U+0995) → E0 A6 95</text>
                </g>

                <text x="425" y="315" textAnchor="middle" fill="#64748b" fontSize="12">
                  Key Benefit: 100% backward compatible with ASCII. Continuation bytes always start with '10' for instant self-synchronization.
                </text>
              </svg>
            )}

            {activeTab === "gray" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="30" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Gray Code vs Standard Binary: Eliminating Mechanical Shaft Jitter
                </text>

                {/* Binary Track Glitch */}
                <g transform="translate(60, 65)">
                  <rect width="340" height="240" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="170" y="30" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Natural Binary Transition (3 → 4)</text>
                  <rect x="40" y="55" width="260" height="50" rx="6" fill="#1e293b" />
                  <text x="60" y="75" fill="#94a3b8" fontSize="12">Value 3:</text>
                  <text x="140" y="75" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold">0 0 1 1</text>
                  <text x="60" y="95" fill="#94a3b8" fontSize="12">Value 4:</text>
                  <text x="140" y="95" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold">0 1 0 0</text>
                  <text x="210" y="85" fill="#ef4444" fontSize="12" fontWeight="bold">3 bits flip!</text>

                  <rect x="30" y="125" width="280" height="90" rx="6" fill="#450a0a" border="1" stroke="#dc2626" />
                  <text x="40" y="148" fill="#fca5a5" fontSize="12" fontWeight="bold">⚠️ Optical Switch Asynchrony Hazard:</text>
                  <text x="40" y="170" fill="#fecaca" fontSize="11">If sensor bit 2 triggers slightly before 0 & 1:</text>
                  <text x="40" y="190" fill="#fca5a5" fontSize="12" fontFamily="monospace">0011 → 0111 (Value 7! Glitch Spike)</text>
                  <text x="40" y="205" fill="#ef4444" fontSize="11">Causes robot joint jerk or tachometer error.</text>
                </g>

                {/* Gray Code Safety */}
                <g transform="translate(450, 65)">
                  <rect width="340" height="240" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="170" y="30" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Gray Code Transition (3 → 4)</text>
                  <rect x="40" y="55" width="260" height="50" rx="6" fill="#1e293b" />
                  <text x="60" y="75" fill="#94a3b8" fontSize="12">Gray 3:</text>
                  <text x="140" y="75" fill="#34d399" fontSize="13" fontFamily="monospace" fontWeight="bold">0 0 1 0</text>
                  <text x="60" y="95" fill="#94a3b8" fontSize="12">Gray 4:</text>
                  <text x="140" y="95" fill="#34d399" fontSize="13" fontFamily="monospace" fontWeight="bold">0 1 1 0</text>
                  <text x="210" y="85" fill="#10b981" fontSize="12" fontWeight="bold">Only 1 bit flips!</text>

                  <rect x="30" y="125" width="280" height="90" rx="6" fill="#064e3b" border="1" stroke="#059669" />
                  <text x="40" y="148" fill="#a7f3d0" fontSize="12" fontWeight="bold">✅ Unit Distance Principle:</text>
                  <text x="40" y="170" fill="#d1fae5" fontSize="11">Only one optical sensor changes state per step.</text>
                  <text x="40" y="190" fill="#a7f3d0" fontSize="12" fontFamily="monospace">Intermediate state is either 3 or 4.</text>
                  <text x="40" y="205" fill="#34d399" fontSize="11">Zero false spikes. Perfect for CNC & robotics.</text>
                </g>

                <text x="425" y="335" textAnchor="middle" fill="#64748b" fontSize="12">
                  XOR Conversion Rule: Gray = Binary ⊕ (Binary &gt;&gt; 1)
                </text>
              </svg>
            )}

            {activeTab === "bcd" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="30" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Packed BCD (8421) Representation & DAA +6 Adjustment
                </text>

                {/* Packed Byte Layout */}
                <g transform="translate(60, 60)">
                  <rect width="730" height="100" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="25" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">1 Byte Packed BCD representing Number 95:</text>
                  
                  <rect x="100" y="45" width="240" height="35" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="220" y="68" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Upper Nibble: 1 0 0 1 (Digit 9)</text>
                  
                  <rect x="390" y="45" width="240" height="35" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="510" y="68" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Lower Nibble: 0 1 0 1 (Digit 5)</text>
                </g>

                {/* BCD Addition & Correction */}
                <g transform="translate(60, 180)">
                  <rect width="730" height="145" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="25" y="25" fill="#f43f5e" fontSize="13" fontWeight="bold">Why BCD Addition Needs +6 (0110) Correction:</text>
                  
                  <text x="40" y="55" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
                    Compute 7 + 8 in 4-bit Binary: 0111 + 1000 = 1111 (Binary 15, Hex 0xF)
                  </text>
                  <text x="40" y="78" fill="#fca5a5" fontSize="12">
                    ❌ 1111 is an INVALID BCD nibble (Valid BCD is strictly 0000 to 1001 / 0 to 9).
                  </text>
                  <text x="40" y="102" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
                    Hardware DAA adds 6 (0110): 1111 + 0110 = [1] 0101 (Carry 1, Lower 5 → BCD 15!)
                  </text>
                  <text x="40" y="125" fill="#34d399" fontSize="12" fontWeight="bold">
                    ✅ Adding 6 skips the 6 invalid 4-bit states (10..15) and triggers decimal tens carry!
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* Live Interactive Code Workbench */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">🧪</span> Live Interactive Multi-Code Converter Workbench
            </h2>
            <p className="text-sm text-slate-400">
              Test ASCII, UTF-8 strings, financial BCD packaging, and step-by-step Gray code XOR conversions live.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tool 1: ASCII & Parity Inspector */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Tool A: ASCII & 7-Bit Code</span>
                <span className="text-xs text-slate-500">Char → Bits</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enter Text (e.g. Mamata, Kolkata):</label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.slice(0, 10))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 font-mono uppercase"
                  placeholder="Enter text..."
                />
              </div>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {asciiRows.map((r, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800/80 rounded p-2 text-xs flex items-center justify-between">
                    <span className="font-bold text-white px-2 py-0.5 bg-slate-800 rounded">'{r.ch}'</span>
                    <span className="text-slate-400 font-mono">Dec: {r.code}</span>
                    <span className="text-amber-400 font-mono">Hex: 0x{r.hex}</span>
                    <span className="text-teal-300 font-mono font-bold">{r.bin7}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                Notice uppercase 'A' is 0x41 (01000001) and lowercase 'a' is 0x61 (01100001) - flipping bit 5 toggles case!
              </p>
            </div>

            {/* Tool 2: BCD Financial Packer */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Tool B: Packed BCD Inspector</span>
                <span className="text-xs text-slate-500">Exact Decimal</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enter Decimal Number (0 - 99999):</label>
                <input
                  type="number"
                  min="0"
                  max="99999"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(Math.max(0, Math.min(99999, parseInt(e.target.value || "0", 10))))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Digit Nibble Breakdown:</span>
                  <div className="flex flex-wrap gap-2">
                    {bcdData.unpacked.map((u, i) => (
                      <div key={i} className="flex-1 min-w-[50px] bg-slate-950 border border-amber-500/30 rounded p-2 text-center">
                        <div className="text-lg font-bold text-amber-400">{u.digit}</div>
                        <div className="text-xs font-mono text-slate-300">{u.bin4}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">Packed BCD Bitstream:</span>
                  <p className="font-mono text-xs text-teal-300 break-all">{bcdData.packedHex}</p>
                </div>
              </div>
            </div>

            {/* Tool 3: Binary <-> Gray Code Step Tracer */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tool C: Gray Code Converter</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setGrayMode("bin2gray")}
                    className={`px-2 py-0.5 text-[10px] rounded ${grayMode === "bin2gray" ? "bg-indigo-600 text-white font-bold" : "bg-slate-800 text-slate-400"}`}
                  >
                    Bin → Gray
                  </button>
                  <button
                    onClick={() => setGrayMode("gray2bin")}
                    className={`px-2 py-0.5 text-[10px] rounded ${grayMode === "gray2bin" ? "bg-indigo-600 text-white font-bold" : "bg-slate-800 text-slate-400"}`}
                  >
                    Gray → Bin
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {grayMode === "bin2gray" ? "Enter Binary (e.g. 1011):" : "Enter Gray Code (e.g. 1110):"}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={grayInput}
                  onChange={(e) => setGrayInput(e.target.value.replace(/[^01]/g, ""))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono tracking-widest"
                />
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Output Result:</span>
                  <span className="font-mono text-base font-bold text-indigo-300">
                    {grayMode === "bin2gray" ? grayResult.gray : grayResult.bin}
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-2 max-h-24 overflow-y-auto space-y-1 text-[11px] font-mono text-slate-400">
                  {grayResult.steps.map((st, i) => (
                    <div key={i}>{st}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Theory & Real-World Case Studies */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-teal-500/10 text-teal-400 rounded-md">🏢</span>
              Case Study: Financial Ledger Precision in Barrackpore
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When <strong>Mamata</strong> and <strong>Mahima</strong> built a core banking transaction service at <strong>Barrackpore</strong>, floating-point rounding errors (where <code className="text-teal-300">0.1 + 0.2 = 0.30000000000000004</code>) could not be tolerated for statutory audit compliance.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              They implemented <strong>Packed BCD</strong> (Binary Coded Decimal) storage in their mainframe database schema. Because each decimal digit is encoded exactly into 4 bits without fractional base-2 approximations, every single paisa transaction remained exact to the last decimal place without floating-point drift.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md">🤖</span>
              Case Study: Robotic Shaft Positioning in Ichapur Factory
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              At an automated munitions stamping facility in <strong>Ichapur</strong>, engineer <strong>Debangshu</strong> and researcher <strong>Susmita</strong> tested high-speed optical shaft encoders.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standard binary encoders caused sudden destructive robotic arm torque spikes during transitions from position 7 (<code className="text-indigo-300">0111</code>) to 8 (<code className="text-indigo-300">1000</code>) due to multi-sensor timing discrepancies reading intermediate false codes like 15 (<code className="text-rose-400">1111</code>). Switching to <strong>Gray Code</strong> ensured only 1 bit toggled per mechanical step, completely eliminating sensor jitter and equipment wear.
            </p>
          </div>
        </section>

        {/* 30 Curated FAQs */}
        <FAQTemplate questions={topic12Questions} />

        {/* Printable Text Notes Component */}
        <PlainTextPrint rawNotes={rawNotes} />

        {/* Teacher Sukanta Hui Footer / Bio */}
        <Teacher />
      </div>
    </div>
  );
}
