import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table, Check, BookOpen } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import { faqs } from "./faqs/topic28_faqs";

const Topic28 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Default: Textbook Page 109 Example 2.13
  // F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15)
  const [minterms, setMinterms] = useState([0, 1, 3, 4, 8, 9, 15]);

  // Live input test signals
  const [inA, setInA] = useState(false);
  const [inB, setInB] = useState(false);
  const [inC, setInC] = useState(false);
  const [inD, setInD] = useState(false);

  const toggleMinterm = (m) => {
    if (minterms.includes(m)) {
      setMinterms(minterms.filter((x) => x !== m));
    } else {
      setMinterms([...minterms, m].sort((a, b) => a - b));
    }
  };

  // Implementation Table Analysis for 8:1 MUX (Textbook Example 2.13):
  // Ordered Sequence: a b c d
  // Singled out variable: a (MSB)
  // Select lines: S2 = b, S1 = c, S0 = d
  // Row 1: a' (minterms 0 to 7)
  // Row 2: a  (minterms 8 to 15)
  // Column Ik contains (k, k + 8)
  const getColAnalysis = (topM, botM) => {
    const isTop = minterms.includes(topM);
    const isBot = minterms.includes(botM);

    if (!isTop && !isBot) {
      return { val: "0", rule: "Rule 1", desc: "Neither minterm circled -> Apply 0 (GND)" };
    }
    if (isTop && isBot) {
      return { val: "1", rule: "Rule 2", desc: "Both minterms circled -> Apply 1 (VCC)" };
    }
    if (!isTop && isBot) {
      return { val: "a", rule: "Rule 3", desc: "Bottom circled, top not -> Apply a" };
    }
    return { val: "a'", rule: "Rule 4", desc: "Top circled, bottom not -> Apply a' (Inverter)" };
  };

  const columns = Array.from({ length: 8 }, (_, k) => getColAnalysis(k, k + 8));

  // Current minterm and output
  const currentMinterm = (inA ? 8 : 0) + (inB ? 4 : 0) + (inC ? 2 : 0) + (inD ? 1 : 0);
  const currentOutput = minterms.includes(currentMinterm) ? 1 : 0;

  // Selected MUX line index: S2=b, S1=c, S0=d
  const selectedChannel = (inB ? 4 : 0) + (inC ? 2 : 0) + (inD ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 28
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1.5">
              <BookOpen size={12} /> Textbook Page 109 Example 2.13
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Realization of Boolean Functions using $8 \times 1$ Multiplexer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Textbook Page 109 Example 2.13: Implementing 4-Variable Function $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$ with Singled-Out Variable $a$ and Select Lines $S_2 = b, S_1 = c, S_0 = d$.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "truthTable", label: "1. Page 109 Circuit & Table" },
              { id: "theory", label: "2. Example 2.13 Theory" },
              { id: "equations", label: "3. Step-by-Step Derivation" },
              { id: "interactive", label: "4. Interactive MUX Synthesizer" },
              { id: "examTips", label: "5. ISC Board Exam Focus" },
              { id: "faqs", label: "6. 15 Essential FAQs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* TAB 1: CIRCUIT & TABLE (DEFAULT TAB) */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Textbook Page 109 Example 2.13 Implementation</h2>
              <p className="text-xs text-slate-400">Complete Implementation Table and Circuit for $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$</p>
            </div>
          </div>

          {/* IMPLEMENTATION TABLE (PAGE 109) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-xs">
                Implementation Table (Textbook Page 109)
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                Inputs: I₀ through I₇ | Rows: a&apos; and a
              </span>
            </div>

            <div className="overflow-x-auto border border-indigo-900/60 rounded-xl bg-slate-950 shadow-md">
              <table className="w-full text-center font-mono text-xs">
                <thead className="bg-indigo-950/60 text-slate-200 border-b border-indigo-800">
                  <tr>
                    <th className="p-2.5 text-left text-amber-400">Row</th>
                    {Array.from({ length: 8 }, (_, k) => (
                      <th key={k} className="p-2.5 text-cyan-300 font-bold">I{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {/* Row a' */}
                  <tr>
                    <td className="p-2.5 text-left font-bold text-indigo-400">a&apos; (a=0)</td>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((m) => {
                      const isCircled = minterms.includes(m);
                      return (
                        <td
                          key={m}
                          className={clsx(
                            "p-2.5",
                            isCircled
                              ? "font-bold text-emerald-300 bg-emerald-950/50 rounded"
                              : "text-slate-500"
                          )}
                        >
                          {isCircled ? `⓿${m}`.slice(-2) : m}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row a */}
                  <tr>
                    <td className="p-2.5 text-left font-bold text-indigo-400">a (a=1)</td>
                    {[8, 9, 10, 11, 12, 13, 14, 15].map((m) => {
                      const isCircled = minterms.includes(m);
                      return (
                        <td
                          key={m}
                          className={clsx(
                            "p-2.5",
                            isCircled
                              ? "font-bold text-emerald-300 bg-emerald-950/50 rounded"
                              : "text-slate-500"
                          )}
                        >
                          {isCircled ? `⓿${m}`.slice(-2) : m}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Applied Inputs Row */}
                  <tr className="bg-slate-900 font-bold text-[13px]">
                    <td className="p-2.5 text-left text-amber-400">Input Applied:</td>
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        className={clsx(
                          "p-2.5",
                          col.val === "1" && "text-emerald-400",
                          col.val === "0" && "text-rose-400",
                          col.val === "a" && "text-cyan-400",
                          col.val === "a'" && "text-amber-400"
                        )}
                      >
                        {col.val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DEDUCTIONS ACCORDING TO RULES 1-4 */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="font-bold text-indigo-300 block mb-1">Deductions per Textbook Page 109:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold">I₀, I₁ applied 1</span>
                  <div className="text-[10px] text-slate-400 font-sans">Rule 2: Both circled</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-rose-400 font-bold">I₂, I₅, I₆ applied 0</span>
                  <div className="text-[10px] text-slate-400 font-sans">Rule 1: Neither circled</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold">I₃, I₄ applied a&apos;</span>
                  <div className="text-[10px] text-slate-400 font-sans">Rule 4: Top circled (m3, m4)</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-cyan-400 font-bold">I₇ applied a</span>
                  <div className="text-[10px] text-slate-400 font-sans">Rule 3: Bottom circled (m15)</div>
                </div>
              </div>
            </div>
          </div>

          {/* SVG SCHEMATIC FROM TEXTBOOK PAGE 109 */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Textbook Page 109: 8 &times; 1 Multiplexer Realization Circuit
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                1 &times; 8:1 MUX + 1 NOT Gate
              </span>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 560 300" className="w-full max-w-xl h-auto font-mono text-xs select-none">
                {/* 1 (VCC) feeding I0, I1 */}
                <text x="25" y="45" fill="#10b981" fontWeight="bold">1</text>
                <line x1="45" y1="41" x2="160" y2="41" stroke="#10b981" strokeWidth="2" />
                <path d="M 120 41 L 120 66 L 160 66" fill="none" stroke="#10b981" strokeWidth="2" />
                <circle cx="120" cy="41" r="3" fill="#10b981" />

                {/* 0 (GND) feeding I2, I5, I6 */}
                <text x="25" y="95" fill="#ef4444" fontWeight="bold">0</text>
                <line x1="45" y1="91" x2="160" y2="91" stroke="#ef4444" strokeWidth="2" />
                <path d="M 100 91 L 100 166 L 160 166" fill="none" stroke="#ef4444" strokeWidth="2" />
                <path d="M 100 166 L 100 191 L 160 191" fill="none" stroke="#ef4444" strokeWidth="2" />
                <circle cx="100" cy="91" r="3" fill="#ef4444" />
                <circle cx="100" cy="166" r="3" fill="#ef4444" />

                {/* a' (Inverter on a) feeding I3, I4 */}
                <text x="20" y="125" fill="#f59e0b" fontWeight="bold">a&apos;</text>
                {/* NOT Gate on a */}
                <line x1="38" y1="121" x2="58" y2="121" stroke="#f59e0b" strokeWidth="1.5" />
                <polygon points="58,114 75,121 58,128" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="78" cy="121" r="3" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="81" y1="121" x2="160" y2="121" stroke="#f59e0b" strokeWidth="2" />
                <path d="M 130 121 L 130 141 L 160 141" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="130" cy="121" r="3" fill="#f59e0b" />

                {/* a feeding I7 */}
                <text x="25" y="220" fill="#38bdf8" fontWeight="bold">a</text>
                <line x1="45" y1="216" x2="160" y2="216" stroke="#38bdf8" strokeWidth="2" />

                {/* 8:1 MUX Block */}
                <polygon
                  points="160,25 290,45 290,235 160,255"
                  fill="#1e1b4b"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />
                <text x="225" y="130" fill="#ffffff" fontWeight="bold" fontSize="16" textAnchor="middle">8 &times; 1</text>
                <text x="225" y="152" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">MUX</text>

                {/* Channel Labels */}
                <text x="175" y="45" fill="#94a3b8" fontSize="10">I₀</text>
                <text x="175" y="70" fill="#94a3b8" fontSize="10">I₁</text>
                <text x="175" y="95" fill="#94a3b8" fontSize="10">I₂</text>
                <text x="175" y="125" fill="#94a3b8" fontSize="10">I₃</text>
                <text x="175" y="145" fill="#94a3b8" fontSize="10">I₄</text>
                <text x="175" y="170" fill="#94a3b8" fontSize="10">I₅</text>
                <text x="175" y="195" fill="#94a3b8" fontSize="10">I₆</text>
                <text x="175" y="220" fill="#94a3b8" fontSize="10">I₇</text>

                {/* Select Lines S2, S1, S0 (b, c, d) */}
                <line x1="200" y1="280" x2="200" y2="248" stroke="#06b6d4" strokeWidth="2" />
                <text x="200" y="240" fill="#06b6d4" textAnchor="middle" fontSize="10">S₂</text>
                <text x="200" y="295" fill="#06b6d4" textAnchor="middle" fontWeight="bold" fontSize="12">b</text>

                <line x1="230" y1="280" x2="230" y2="244" stroke="#06b6d4" strokeWidth="2" />
                <text x="230" y="236" fill="#06b6d4" textAnchor="middle" fontSize="10">S₁</text>
                <text x="230" y="295" fill="#06b6d4" textAnchor="middle" fontWeight="bold" fontSize="12">c</text>

                <line x1="260" y1="280" x2="260" y2="240" stroke="#06b6d4" strokeWidth="2" />
                <text x="260" y="232" fill="#06b6d4" textAnchor="middle" fontSize="10">S₀</text>
                <text x="260" y="295" fill="#06b6d4" textAnchor="middle" fontWeight="bold" fontSize="12">d</text>

                {/* Output F */}
                <line x1="290" y1="140" x2="390" y2="140" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="390" cy="140" r="3.5" fill="#10b981" />
                <text x="405" y="145" fill="#10b981" fontWeight="bold" fontSize="15">F (Output)</text>
              </svg>
            </div>

            {/* EQUATION OF 8x1 MUX FROM PAGE 109 */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-amber-400">Equation of $8 \times 1$ MUX (Textbook Page 109):</div>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-center text-[11px] text-cyan-300 border border-slate-800 overflow-x-auto">
                F = S̄₂S̄₁S̄₀ I₀ + S̄₂S̄₁S₀ I₁ + S̄₂S₁S̄₀ I₂ + S̄₂S₁S₀ I₃ + S₂S̄₁S̄₀ I₄ + S₂S̄₁S₀ I₅ + S₂S₁S̄₀ I₆ + S₂S₁S₀ I₇
              </div>
              <p className="text-slate-400 text-[11px]">
                Substituting select lines $(S_2=b, S_1=c, S_0=d)$ and inputs $(I_0=1, I_1=1, I_2=0, I_3=a&apos;, I_4=a&apos;, I_5=0, I_6=0, I_7=a)$:
              </p>
              <div className="font-mono text-emerald-400 text-center font-bold text-xs">
                F = b&apos;c&apos;d&apos;(1) + b&apos;c&apos;d(1) + b&apos;cd(a&apos;) + bc&apos;d&apos;(a&apos;) + bcd(a) &equiv; &Sigma;(0, 1, 3, 4, 8, 9, 15)
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: THEORY */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">4-Variable Realization via $8 \times 1$ Multiplexer</h2>
              <p className="text-xs text-slate-400">Textbook Page 109 Example 2.13 core design methodology</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={14} /> Problem Formulation (Example 2.13)
              </span>
              <p className="text-sm text-slate-200">
                <strong>Implement $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$ with a multiplexer.</strong>
              </p>
              <p className="text-xs text-slate-400">
                It is a four-variable function ($n = 4$). Thus it will be implemented using a $2^{"{n-1}"} \text{ to } 1 = 2^3 \text{ to } 1 = 8 \text{ to } 1$ multiplexer with $4 - 1 = 3$ selection lines.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ordered Sequence</span>
                <div className="text-base font-mono font-bold text-white">a b c d</div>
                <p className="text-slate-400">The 4 input variables in canonical order.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Singled-Out Variable</span>
                <div className="text-base font-mono font-bold text-cyan-400">Variable &lsquo;a&rsquo; (Leftmost)</div>
                <p className="text-slate-400">Leftmost variable forms the 2 rows: $a&apos;$ and $a$.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Selection Lines (3)</span>
                <div className="text-base font-mono font-bold text-white">S₂=b, S₁=c, S₀=d</div>
                <p className="text-slate-400">Lower 3 variables connected to the select bus.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: STEP-BY-STEP DERIVATION */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Step-by-Step Column Analysis for Example 2.13</h2>
              <p className="text-xs text-slate-400">Evaluating each of the 8 multiplexer channels $I_0$ through $I_7$</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            {[
              { ch: "I₀ (bcd=000)", pair: "(0, 8)", circled: "Both 0 & 8", rule: "Rule 2", res: "1" },
              { ch: "I₁ (bcd=001)", pair: "(1, 9)", circled: "Both 1 & 9", rule: "Rule 2", res: "1" },
              { ch: "I₂ (bcd=010)", pair: "(2, 10)", circled: "Neither", rule: "Rule 1", res: "0" },
              { ch: "I₃ (bcd=011)", pair: "(3, 11)", circled: "Top (3) only", rule: "Rule 4", res: "a'" },
              { ch: "I₄ (bcd=100)", pair: "(4, 12)", circled: "Top (4) only", rule: "Rule 4", res: "a'" },
              { ch: "I₅ (bcd=101)", pair: "(5, 13)", circled: "Neither", rule: "Rule 1", res: "0" },
              { ch: "I₆ (bcd=110)", pair: "(6, 14)", circled: "Neither", rule: "Rule 1", res: "0" },
              { ch: "I₇ (bcd=111)", pair: "(7, 15)", circled: "Bottom (15) only", rule: "Rule 3", res: "a" }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 block font-sans">{item.ch}</span>
                <div className="text-slate-400 text-[11px]">Minterms: {item.pair}</div>
                <div className="text-slate-300 font-sans text-[11px]">{item.circled}</div>
                <div className="pt-1 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[10px] text-amber-400 font-sans">{item.rule}</span>
                  <span className="font-bold text-white text-sm">{item.res}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 4-Variable $8 \times 1$ MUX Synthesizer</h2>
              <p className="text-xs text-slate-400">Toggle input signals $a, b, c, d$ to verify live multiplexer channel steering</p>
            </div>
          </div>

          {/* INPUT SWITCHES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "a", name: "Data (a)", val: inA, set: setInA, color: "indigo" },
              { id: "b", name: "Select S₂ (b)", val: inB, set: setInB, color: "cyan" },
              { id: "c", name: "Select S₁ (c)", val: inC, set: setInC, color: "emerald" },
              { id: "d", name: "Select S₀ (d)", val: inD, set: setInD, color: "amber" }
            ].map((pin) => (
              <div
                key={pin.id}
                onClick={() => pin.set(!pin.val)}
                className={clsx(
                  "p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                  pin.val
                    ? `bg-${pin.color}-950/40 border-${pin.color}-500/50 shadow-lg shadow-${pin.color}-500/10`
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                )}
              >
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">Pin {pin.id}</span>
                  <div className="text-xs font-bold text-white">{pin.name}</div>
                </div>
                <div
                  className={clsx(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs",
                    pin.val ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                  )}
                >
                  {pin.val ? "1" : "0"}
                </div>
              </div>
            ))}
          </div>

          {/* SIMULATOR CHANNEL PROBER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">8-Channel Multiplexer Internal Status</h3>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-xs font-mono text-center">
                {columns.map((col, idx) => {
                  const isSel = selectedChannel === idx;
                  const liveBit =
                    col.val === "1" ? 1 : col.val === "0" ? 0 : col.val === "a" ? (inA ? 1 : 0) : inA ? 0 : 1;
                  return (
                    <div
                      key={idx}
                      className={clsx(
                        "p-2 rounded-lg border transition-all",
                        isSel
                          ? "bg-indigo-950 border-indigo-400 shadow-md shadow-indigo-500/30"
                          : "bg-slate-900/60 border-slate-800 opacity-60"
                      )}
                    >
                      <div className="text-[10px] text-slate-400">I{idx}</div>
                      <div className="text-sm font-bold text-white my-0.5">{liveBit}</div>
                      <div className="text-[9px] text-amber-400">{isSel ? "ACTIVE" : col.val}</div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div>
                  <strong className="text-white">Active Select Code: </strong>
                  <span className="font-mono text-cyan-300">
                    S₂=b ({inB ? 1 : 0}), S₁=c ({inC ? 1 : 0}), S₀=d ({inD ? 1 : 0}) &rarr; Routes Pin I{selectedChannel}
                  </span>
                </div>
                <div className="text-slate-400">
                  Input vector: $a={inA ? 1 : 0}, b={inB ? 1 : 0}, c={inC ? 1 : 0}, d={inD ? 1 : 0} \implies$ Minterm{" "}
                  <span className="font-mono text-white font-bold">m{currentMinterm}</span>.
                </div>
              </div>
            </div>

            {/* LIVE OUTPUT DISPLAY */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between items-center text-center space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Realized Function Output</span>
                <div className="text-sm font-bold text-slate-300 mt-1">F(a, b, c, d)</div>
              </div>

              <div
                className={clsx(
                  "w-24 h-24 rounded-2xl flex items-center justify-center font-extrabold text-4xl border transition-all",
                  currentOutput
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-xl shadow-emerald-500/20"
                    : "bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-xl shadow-rose-500/20"
                )}
              >
                {currentOutput ? "1" : "0"}
              </div>

              <div className="text-xs text-slate-400">
                Minterm: <span className="font-mono font-bold text-white">m{currentMinterm}</span>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                  {currentOutput ? "✓ High (1) [Member of Σ]" : "✗ Low (0) [Absent from Σ]"}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: ISC BOARD EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Scoring Full Marks on Example 2.13</h2>
              <p className="text-xs text-slate-400">Key step marks awarded by CISCE examiners</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">Key Evaluation Checkpoints</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">State Variable Partitioning:</strong> Write: <em>&ldquo;Four-variable function $n=4 \implies$ implemented using $2^{"{n-1}"} \to 1 = 8 \to 1$ MUX. Singled-out variable is $a$. Select lines are $b, c, d$.&rdquo;</em></li>
                <li><strong className="text-white">Draw the 8-Column Implementation Table:</strong> Carefully draw the 8 columns ($I_0..I_7$) and 2 rows ($a&apos;, a$), circling minterms $0, 1, 3, 4, 8, 9, 15$.</li>
                <li><strong className="text-white">State the Input Rules Applied:</strong> Mention which rule determined each input: $I_0, I_1 \to$ Rule 2; $I_2, I_5, I_6 \to$ Rule 1; $I_3, I_4 \to$ Rule 4; $I_7 \to$ Rule 3.</li>
                <li><strong className="text-white">Draw the Circuit with 1 Inverter:</strong> Point out that only 1 NOT gate on $a$ is needed to feed both $I_3$ and $I_4$.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
      {activeTab === "faqs" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* SECTION: 15 ESSENTIAL FAQS (ACCORDION AT BOTTOM OF LESSON) */}
      {activeTab !== "faqs" && (
        <section className="pt-6 border-t border-slate-800">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-28-mux-example-2-13"
        headline="Sukanta Hui's Master Guide to Example 2.13 (Page 109)"
        note="Example 2.13 from page 109 of your textbook is the classic 4-variable multiplexer question in ISC board examinations! Notice how singling out variable 'a' splits the 16 minterms cleanly into row a' (0-7) and row a (8-15). The remaining three variables b, c, d wire directly to S2, S1, S0. Only one single NOT gate is needed for the entire circuit to supply a' to inputs I3 and I4. Master this table and you are guaranteed full marks!"
      />
    </div>
  );
};

export default Topic28;
