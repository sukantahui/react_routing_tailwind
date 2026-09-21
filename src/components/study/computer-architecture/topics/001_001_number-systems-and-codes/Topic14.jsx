import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  const [activeTab, setActiveTab] = useState("radix");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const referenceCards = [
    {
      id: "radix",
      category: "radix",
      title: "Radix Conversion Formula Matrix",
      tag: "Base Math",
      color: "teal",
      summary: "Decimal to Base-R successive division/multiplication & direct binary-hex-octal grouping.",
      formula: "Integer: Remainder stack (Bottom-Up); Fraction: Integer overflow queue (Top-Down); Direct: 4-bit nibble = 1 Hex digit.",
      code: "// 4-bit Hex Translation\n0b1101_1010 == 0xDA == (332)_8"
    },
    {
      id: "twoscomp",
      category: "signed",
      title: "2's Complement Weight & Range Card",
      tag: "Arithmetic",
      color: "emerald",
      summary: "Signed n-bit integer range [-2^(n-1) to +2^(n-1)-1] with unique zero 0x00.",
      formula: "Value = -2^(n-1)·b_(n-1) + Σ (2^i · b_i) from i=0 to n-2; Negation: -X = ~X + 1",
      code: "// 8-bit limits\nINT8_MIN = -128 (0x80), INT8_MAX = 127 (0x7F)"
    },
    {
      id: "overflow",
      category: "flags",
      title: "ALU Condition Codes & Overflow (V) Flag",
      tag: "Microarchitecture",
      color: "rose",
      summary: "Direct single-gate flag extraction from parallel binary adder datapath.",
      formula: "V = C_n ⊕ C_(n-1); Z = ~(|Sum); N = Sum[MSB]; C = Carry_Out",
      code: "assign overflow_flag = carry[7] ^ carry[6];\nassign zero_flag = ~(|sum);"
    },
    {
      id: "utf8",
      category: "codes",
      title: "Unicode UTF-8 Byte Layout Reference",
      tag: "Encoding",
      color: "indigo",
      summary: "Variable-length 1 to 4-byte standard with 100% backward ASCII compatibility.",
      formula: "1B: 0xxxxxxx; 2B: 110xxxxx 10xxxxxx; 3B: 1110xxxx 10xxxxxx 10xxxxxx; 4B: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx",
      code: "// Bengali 'ক' (U+0995) -> 0xE0 0xA6 0x95 (3 Bytes)"
    },
    {
      id: "gray",
      category: "codes",
      title: "Gray Code (Reflected Binary) Reference",
      tag: "Encoders",
      color: "amber",
      summary: "Unit-distance code eliminating multi-bit switching hazards in shaft encoders.",
      formula: "Binary to Gray: Gray = B ⊕ (B >> 1); Gray to Binary: B[i] = B[i+1] ⊕ G[i]",
      code: "uint32_t bin2gray(uint32_t b) { return b ^ (b >> 1); }"
    },
    {
      id: "bcd",
      category: "codes",
      title: "Packed BCD 8421 & DAA Adjustment",
      tag: "Financial",
      color: "cyan",
      summary: "Exact 4-bit decimal storage (0000..1001) avoiding floating-point rounding drift.",
      formula: "If (Nibble > 9 || Aux_Carry == 1) Nibble += 6 (0110) to skip invalid states 10..15.",
      code: "if (nibble > 9 || aux_carry) nibble += 6; // DAA decimal adjust"
    }
  ];

  const filteredCards = referenceCards.filter((card) => {
    const matchesCat = selectedCategory === "all" || card.category === selectedCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      card.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      card.formula.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Computer Architecture • Module 001.001 • Topic 14
            </span>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Reference Manual & Documents
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Architectural Reference Compendium & Downloadable Cheat-Sheets
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
            A comprehensive, verified reference atlas consolidating all Module 001 number systems, radix conversion rules, 2's complement equations, ALU flag truth tables, and character encoding standards for hardware engineers and computer science scholars.
          </p>
        </header>

        {/* 3-Tab Architecture Schematics Suite */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">⚡</span> Master Architectural Decision Trees & Reference Schematics
              </h2>
              <p className="text-sm text-slate-400">
                Visualizing master conversion pipelines, flag condition logic, and code structures.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("radix")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "radix"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                1. Radix Conversion Decision Tree
              </button>
              <button
                onClick={() => setActiveTab("flags")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "flags"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                2. ALU Flag & Branching Matrix
              </button>
              <button
                onClick={() => setActiveTab("codes")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "codes"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                3. Character & Sensor Encoding Atlas
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
            {activeTab === "radix" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Master Radix Conversion Highway & Direct Binary Grouping
                </text>

                {/* Central Binary Hub */}
                <g transform="translate(325, 120)">
                  <rect width="200" height="100" rx="12" fill="#0f172a" stroke="#14b8a6" strokeWidth="2.5" />
                  <text x="100" y="40" textAnchor="middle" fill="#5eead4" fontSize="16" fontWeight="bold">BINARY (Base-2)</text>
                  <text x="100" y="65" textAnchor="middle" fill="#94a3b8" fontSize="11">0s and 1s (Silicon Core)</text>
                  <text x="100" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="10">Positional: Σ (bᵢ · 2ⁱ)</text>
                </g>

                {/* Octal Box */}
                <g transform="translate(50, 40)">
                  <rect width="180" height="80" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="90" y="32" textAnchor="middle" fill="#7dd3fc" fontSize="14" fontWeight="bold">OCTAL (Base-8)</text>
                  <text x="90" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Digits 0 - 7</text>
                  <text x="90" y="70" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">3-Bit Direct Grouping</text>
                </g>
                <path d="M 230 80 Q 280 100 325 140" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />

                {/* Hex Box */}
                <g transform="translate(620, 40)">
                  <rect width="180" height="80" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="90" y="32" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">HEX (Base-16)</text>
                  <text x="90" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Digits 0-9, A-F</text>
                  <text x="90" y="70" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">4-Bit Direct Grouping (Nibble)</text>
                </g>
                <path d="M 620 80 Q 570 100 525 140" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                {/* Decimal Box */}
                <g transform="translate(325, 270)">
                  <rect width="200" height="70" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="100" y="30" textAnchor="middle" fill="#c084fc" fontSize="14" fontWeight="bold">DECIMAL (Base-10)</text>
                  <text x="100" y="52" textAnchor="middle" fill="#94a3b8" fontSize="11">Div/Mul by Base-R</text>
                </g>
                <line x1="425" y1="220" x2="425" y2="270" stroke="#a855f7" strokeWidth="2" />

                <text x="425" y="355" textAnchor="middle" fill="#64748b" fontSize="11">
                  Rule of Thumb: Never convert Octal to Hex via Decimal; always route through Binary as the fast intermediate bridge!
                </text>
              </svg>
            )}

            {activeTab === "flags" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  ALU Condition Flags Generation & Hardware Branching Logic
                </text>

                {/* 4 Flag Boxes */}
                <g transform="translate(40, 60)">
                  <rect width="170" height="150" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Zero Flag (Z)</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Equation: ~(|Sum)</text>
                  <text x="85" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="11">1 when result is 00..00</text>
                  <text x="85" y="115" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Used in: BEQ, BNE, JZ</text>
                </g>

                <g transform="translate(240, 60)">
                  <rect width="170" height="150" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#7dd3fc" fontSize="14" fontWeight="bold">Sign Flag (N / S)</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Equation: Sum[MSB]</text>
                  <text x="85" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="11">1 when result is negative</text>
                  <text x="85" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Used in: JS, JNS, BLT</text>
                </g>

                <g transform="translate(440, 60)">
                  <rect width="170" height="150" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Carry Flag (C)</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Equation: Carry_Out (C₈)</text>
                  <text x="85" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="11">Unsigned 8-bit overflow</text>
                  <text x="85" y="115" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Used in: JC, JNC, BLTU</text>
                </g>

                <g transform="translate(640, 60)">
                  <rect width="170" height="150" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                  <text x="85" y="30" textAnchor="middle" fill="#fb7185" fontSize="14" fontWeight="bold">Overflow Flag (V)</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Equation: C_in(MSB) ⊕ C_out</text>
                  <text x="85" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="11">Signed range overflow</text>
                  <text x="85" y="115" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">Used in: JO, JNO, BLT</text>
                </g>

                {/* Branch Equation Banner */}
                <g transform="translate(40, 230)">
                  <rect width="770" height="95" rx="8" fill="#1e293b" stroke="#64748b" />
                  <text x="385" y="30" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">
                    Signed vs Unsigned Branching Decision Rule:
                  </text>
                  <text x="385" y="55" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace">
                    Signed Comparison (A &lt; B): Evaluated by (N ⊕ V) == 1
                  </text>
                  <text x="385" y="78" textAnchor="middle" fill="#34d399" fontSize="12" fontFamily="monospace">
                    Unsigned Comparison (A &lt; B): Evaluated by C == 0 (Borrow generation)
                  </text>
                </g>
              </svg>
            )}

            {activeTab === "codes" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Binary Codes & Standard Data Formats Quick Atlas
                </text>

                {/* 4 Code Pillars */}
                <g transform="translate(40, 60)">
                  <rect width="170" height="250" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Standard ASCII</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10">7-Bit (128 Characters)</text>
                  <text x="85" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="11">'0'..'9': 0x30..0x39</text>
                  <text x="85" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="11">'A'..'Z': 0x41..0x5A</text>
                  <text x="85" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">'a'..'z': 0x61..0x7A</text>
                  <text x="85" y="170" textAnchor="middle" fill="#38bdf8" fontSize="10">Toggle Case: OR 0x20</text>
                  <text x="85" y="195" textAnchor="middle" fill="#38bdf8" fontSize="10">To Digit: AND 0x0F</text>
                </g>

                <g transform="translate(240, 60)">
                  <rect width="170" height="250" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="bold">Unicode UTF-8</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10">1 to 4 Bytes</text>
                  <text x="85" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="11">Self-Synchronizing</text>
                  <text x="85" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="11">100% ASCII Compatible</text>
                  <text x="85" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">Prefix defines length</text>
                  <text x="85" y="170" textAnchor="middle" fill="#a78bfa" fontSize="10">Bengali 'ক' = 3 Bytes</text>
                  <text x="85" y="195" textAnchor="middle" fill="#a78bfa" fontSize="10">Global Internet Std</text>
                </g>

                <g transform="translate(440, 60)">
                  <rect width="170" height="250" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Packed BCD</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10">4 Bits per Decimal</text>
                  <text x="85" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="11">Valid: 0000..1001</text>
                  <text x="85" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="11">Invalid: 1010..1111</text>
                  <text x="85" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">DAA: Add +6 on carry</text>
                  <text x="85" y="170" textAnchor="middle" fill="#34d399" fontSize="10">Exact Paisa Banking</text>
                  <text x="85" y="195" textAnchor="middle" fill="#34d399" fontSize="10">No float roundoff</text>
                </g>

                <g transform="translate(640, 60)">
                  <rect width="170" height="250" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Gray Code</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10">Unit-Distance Code</text>
                  <text x="85" y="85" textAnchor="middle" fill="#cbd5e1" fontSize="11">1 Bit Flip per step</text>
                  <text x="85" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="11">G = B ⊕ (B &gt;&gt; 1)</text>
                  <text x="85" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">No false spikes</text>
                  <text x="85" y="170" textAnchor="middle" fill="#fbbf24" fontSize="10">Optical Shaft Discs</text>
                  <text x="85" y="195" textAnchor="middle" fill="#fbbf24" fontSize="10">Async FIFO Pointers</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* Interactive Filterable Reference Matrix */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">📖</span> Searchable Architectural Formula & Reference Cards
              </h2>
              <p className="text-sm text-slate-400">
                Filter and inspect formulas, hardware implementations, and code snippets across Module 001.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Cards" },
                { id: "radix", label: "Radix Math" },
                { id: "signed", label: "Signed Numbers" },
                { id: "flags", label: "ALU Flags" },
                { id: "codes", label: "Encodings" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? "bg-teal-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div>
            <input
              type="text"
              placeholder="Search reference formulas, flags, UTF-8, BCD, 2's complement..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-teal-400">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="text-xs text-slate-400">{card.summary}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono text-teal-300 bg-slate-900 p-2 rounded border border-slate-800/60 break-words">
                    {card.formula}
                  </div>
                  <pre className="text-[11px] font-mono text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/40 overflow-x-auto">
                    {card.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real-World Case Studies */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-teal-500/10 text-teal-400 rounded-md">🚆</span>
              Case Study: Barrackpore Rail Telemetry Interface
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              During the high-voltage substation upgrade in <strong>Barrackpore</strong>, engineers <strong>Mamata</strong> and <strong>Mahima</strong> used verified 2's complement reference cards and parity timing formulas.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standardizing sensor telemetry word alignments across the ₹32 Crore substation network eliminated false fault trips caused by mixed-endian microcontroller protocols.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md">🛰️</span>
              Case Study: Jadavpur University Satellite Telemetry Payload
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              At <strong>Jadavpur University</strong>, researchers <strong>Debangshu</strong> and <strong>Susmita</strong> designed radiation-tolerant telemetry FPGA modules for a micro-satellite launch.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              By adhering strictly to IEEE-754 single-precision float specifications and Gray-coded rotary solar panel positioners, they ensured zero data corruption during high orbital vibration.
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
