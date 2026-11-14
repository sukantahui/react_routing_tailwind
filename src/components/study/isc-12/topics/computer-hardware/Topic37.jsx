import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic37_faqs";

const Topic37 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Selected minterms for F(a, b, c, d)
  // Default: Textbook Example 2.13: Σ(0, 1, 3, 4, 8, 9, 15)
  const [minterms, setMinterms] = useState([0, 1, 3, 4, 8, 9, 15]);

  // Live input test values
  const [valA, setValA] = useState(false);
  const [valB, setValB] = useState(false);
  const [valC, setValC] = useState(false);
  const [valD, setValD] = useState(true);

  const toggleMinterm = (m) => {
    if (minterms.includes(m)) {
      setMinterms(minterms.filter((x) => x !== m));
    } else {
      setMinterms([...minterms, m].sort((a, b) => a - b));
    }
  };

  // 8:1 MUX Implementation Table derivation with 'a' singled out
  // Select lines: S2 = b, S1 = c, S0 = d
  // Top row (a'): 0 to 7
  // Bottom row (a): 8 to 15
  const getColAnalysis = (topMinterm, bottomMinterm) => {
    const isTopCircled = minterms.includes(topMinterm);
    const isBottomCircled = minterms.includes(bottomMinterm);

    if (!isTopCircled && !isBottomCircled) {
      return { val: "0", rule: "Rule 1", desc: "Neither minterm circled -> Apply 0 (GND)" };
    }
    if (isTopCircled && isBottomCircled) {
      return { val: "1", rule: "Rule 2", desc: "Both minterms circled -> Apply 1 (VCC)" };
    }
    if (!isTopCircled && isBottomCircled) {
      return { val: "a", rule: "Rule 3", desc: "Bottom circled, top not -> Apply a" };
    }
    return { val: "a'", rule: "Rule 4", desc: "Top circled, bottom not -> Apply a' (Inverter)" };
  };

  const colInputs = [
    getColAnalysis(0, 8),
    getColAnalysis(1, 9),
    getColAnalysis(2, 10),
    getColAnalysis(3, 11),
    getColAnalysis(4, 12),
    getColAnalysis(5, 13),
    getColAnalysis(6, 14),
    getColAnalysis(7, 15),
  ];

  // Compute live output for (a, b, c, d)
  const currentMinterm = (valA ? 8 : 0) + (valB ? 4 : 0) + (valC ? 2 : 0) + (valD ? 1 : 0);
  const outputF = minterms.includes(currentMinterm) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 37
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868 Masterclass
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Boolean Function Implementation: 4-Variable Realization using $8 \times 1$ MUX
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Textbook Example 2.13: Singled-Out Variable Method &amp; Rules 1–4 for $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$ using Select Lines $S_2 = b, S_1 = c, S_0 = d$
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory (8:1 MUX)" },
              { id: "equations", label: "2. Step-by-Step Derivation" },
              { id: "truthTable", label: "3. Implementation Table & Circuit" },
              { id: "interactive", label: "4. Interactive 4-Var Simulator" },
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

      {/* TAB 1: THEORY */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">4-Variable Logic Implementation on an 8:1 Multiplexer</h2>
              <p className="text-xs text-slate-400">Architecture, selection line mapping, and the 8-column implementation table</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Zap size={14} /> Multiplexer Sizing Formula for 4 Variables
            </div>
            <p className="text-sm text-slate-200">
              For a 4-variable Boolean function ($n = 4$):
            </p>
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-cyan-300 text-xs">
              MUX Size = 2^(n-1) to 1 = 2^(4-1) to 1 = 2^3 to 1 = 8 to 1 Multiplexer.
              <br />
              Selection Lines Required = 4 - 1 = 3 selection lines (S2, S1, S0).
            </div>
            <p className="text-xs text-slate-400">
              In ordered sequence $a, b, c, d$, the leftmost variable <strong>$a$</strong> is singled out. The remaining 3 variables ($b, c, d$) are connected to the selection lines: $b \to S_2$, $c \to S_1$, and $d \to S_0$.
            </p>
          </div>
        </section>
      )}

      {/* TAB 2: STEP-BY-STEP DERIVATION */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Step-by-Step Solution of Example 2.13</h2>
              <p className="text-xs text-slate-400">Textbook Page 109: $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 uppercase tracking-wider">Given Problem Specification:</span>
              <p>Implement the 4-variable function $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$ with a multiplexer.</p>
              <div className="grid sm:grid-cols-3 gap-2 font-mono text-[11px] pt-1">
                <div className="p-2 rounded bg-slate-900">Ordered Sequence: abcd</div>
                <div className="p-2 rounded bg-slate-900">Singled out: a</div>
                <div className="p-2 rounded bg-slate-900">Select lines: b, c, d</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider">Input Deductions by CISCE Rules:</span>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li>• <strong className="text-emerald-400">I0:</strong> minterms 0 and 8 are both circled &#8594; <strong className="text-white">I0 = 1</strong> (Rule 2)</li>
                <li>• <strong className="text-emerald-400">I1:</strong> minterms 1 and 9 are both circled &#8594; <strong className="text-white">I1 = 1</strong> (Rule 2)</li>
                <li>• <strong className="text-rose-400">I2, I5, I6:</strong> neither minterm is circled &#8594; <strong className="text-white">I2 = I5 = I6 = 0</strong> (Rule 1)</li>
                <li>• <strong className="text-indigo-400">I3, I4:</strong> top minterms (3, 4) are circled &#8594; <strong className="text-white">I3 = I4 = a&apos;</strong> (Rule 4)</li>
                <li>• <strong className="text-cyan-400">I7:</strong> bottom minterm 15 is circled &#8594; <strong className="text-white">I7 = a</strong> (Rule 3)</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT (DEFAULT) */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Implementation Table &amp; Realization Circuit</h2>
              <p className="text-xs text-slate-400">Textbook Page 109: Graphical implementation of $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$</p>
            </div>
          </div>

          {/* 8-COLUMN IMPLEMENTATION TABLE */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              8-Column Function Implementation Table
            </span>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-md">
              <table className="w-full text-center font-mono text-xs">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5 text-left text-amber-400">Row</th>
                    <th className="p-2 text-cyan-300 font-bold">I0</th>
                    <th className="p-2 text-cyan-300 font-bold">I1</th>
                    <th className="p-2 text-cyan-300 font-bold">I2</th>
                    <th className="p-2 text-cyan-300 font-bold">I3</th>
                    <th className="p-2 text-cyan-300 font-bold">I4</th>
                    <th className="p-2 text-cyan-300 font-bold">I5</th>
                    <th className="p-2 text-cyan-300 font-bold">I6</th>
                    <th className="p-2 text-cyan-300 font-bold">I7</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr>
                    <td className="p-2 text-left font-bold text-indigo-400">a&apos; (a=0)</td>
                    <td className="p-2 font-bold text-emerald-300 bg-emerald-950/40 rounded">⓪</td>
                    <td className="p-2 font-bold text-emerald-300 bg-emerald-950/40 rounded">①</td>
                    <td className="p-2 text-slate-500">2</td>
                    <td className="p-2 font-bold text-emerald-300 bg-emerald-950/40 rounded">③</td>
                    <td className="p-2 font-bold text-emerald-300 bg-emerald-950/40 rounded">④</td>
                    <td className="p-2 text-slate-500">5</td>
                    <td className="p-2 text-slate-500">6</td>
                    <td className="p-2 text-slate-500">7</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-indigo-400">a (a=1)</td>
                    <td className="p-2 font-bold text-emerald-300 bg-emerald-950/40 rounded">⑧</td>
                    <td className="p-2 font-bold text-emerald-300 bg-emerald-950/40 rounded">⑨</td>
                    <td className="p-2 text-slate-500">10</td>
                    <td className="p-2 text-slate-500">11</td>
                    <td className="p-2 text-slate-500">12</td>
                    <td className="p-2 text-slate-500">13</td>
                    <td className="p-2 text-slate-500">14</td>
                    <td className="p-2 font-bold text-emerald-300 bg-emerald-950/40 rounded">⑮</td>
                  </tr>
                  <tr className="bg-slate-900 font-bold text-amber-300">
                    <td className="p-2.5 text-left text-amber-400">Applied:</td>
                    <td className="text-emerald-400">1</td>
                    <td className="text-emerald-400">1</td>
                    <td className="text-rose-400">0</td>
                    <td className="text-indigo-400">a&apos;</td>
                    <td className="text-indigo-400">a&apos;</td>
                    <td className="text-rose-400">0</td>
                    <td className="text-rose-400">0</td>
                    <td className="text-cyan-400">a</td>
                  </tr>
                  <tr className="text-[10px] text-slate-500">
                    <td className="p-1.5 text-left">Rule Used:</td>
                    <td>Rule 2</td>
                    <td>Rule 2</td>
                    <td>Rule 1</td>
                    <td>Rule 4</td>
                    <td>Rule 4</td>
                    <td>Rule 1</td>
                    <td>Rule 1</td>
                    <td>Rule 3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT SCHEMATIC SVG */}
          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Complete Circuit Diagram (Textbook Page 109)
            </span>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 540 250" className="w-full max-w-lg h-auto font-mono text-xs select-none">
                {/* Fixed inputs 1 and 0 */}
                <line x1="30" y1="40" x2="160" y2="40" stroke="#10b981" strokeWidth="2" />
                <text x="15" y="44" fill="#10b981" fontWeight="bold">1</text>
                <line x1="30" y1="40" x2="30" y2="65" stroke="#10b981" strokeWidth="2" />
                <line x1="30" y1="65" x2="160" y2="65" stroke="#10b981" strokeWidth="2" />

                <line x1="50" y1="90" x2="160" y2="90" stroke="#ef4444" strokeWidth="2" />
                <text x="35" y="94" fill="#ef4444" fontWeight="bold">0</text>
                <line x1="50" y1="90" x2="50" y2="165" stroke="#ef4444" strokeWidth="2" />
                <line x1="50" y1="165" x2="160" y2="165" stroke="#ef4444" strokeWidth="2" />
                <line x1="50" y1="165" x2="50" y2="190" stroke="#ef4444" strokeWidth="2" />
                <line x1="50" y1="190" x2="160" y2="190" stroke="#ef4444" strokeWidth="2" />

                {/* Literal a and a' */}
                <line x1="70" y1="115" x2="110" y2="115" stroke="#818cf8" strokeWidth="2" />
                <text x="35" y="119" fill="#818cf8" fontWeight="bold">a&apos;</text>
                <line x1="70" y1="115" x2="70" y2="140" stroke="#818cf8" strokeWidth="2" />
                <line x1="70" y1="140" x2="160" y2="140" stroke="#818cf8" strokeWidth="2" />
                <line x1="70" y1="115" x2="160" y2="115" stroke="#818cf8" strokeWidth="2" />

                <line x1="30" y1="215" x2="160" y2="215" stroke="#38bdf8" strokeWidth="2" />
                <text x="15" y="219" fill="#38bdf8" fontWeight="bold">a</text>

                {/* Labels I0-I7 */}
                <text x="165" y="44" fill="#94a3b8" fontSize="10">I0</text>
                <text x="165" y="69" fill="#94a3b8" fontSize="10">I1</text>
                <text x="165" y="94" fill="#94a3b8" fontSize="10">I2</text>
                <text x="165" y="119" fill="#94a3b8" fontSize="10">I3</text>
                <text x="165" y="144" fill="#94a3b8" fontSize="10">I4</text>
                <text x="165" y="169" fill="#94a3b8" fontSize="10">I5</text>
                <text x="165" y="194" fill="#94a3b8" fontSize="10">I6</text>
                <text x="165" y="219" fill="#94a3b8" fontSize="10">I7</text>

                {/* 8:1 MUX Box */}
                <rect x="180" y="25" width="160" height="205" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="260" y="90" fill="#ffffff" fontWeight="bold" fontSize="16" textAnchor="middle">8 &times; 1</text>
                <text x="260" y="112" fill="#67e8f9" fontWeight="bold" fontSize="13" textAnchor="middle">MUX</text>

                {/* Select lines */}
                <line x1="215" y1="230" x2="215" y2="245" stroke="#06b6d4" strokeWidth="2" />
                <text x="215" y="222" fill="#06b6d4" textAnchor="middle" fontSize="10">S2</text>
                <line x1="260" y1="230" x2="260" y2="245" stroke="#06b6d4" strokeWidth="2" />
                <text x="260" y="222" fill="#06b6d4" textAnchor="middle" fontSize="10">S1</text>
                <line x1="305" y1="230" x2="305" y2="245" stroke="#06b6d4" strokeWidth="2" />
                <text x="305" y="222" fill="#06b6d4" textAnchor="middle" fontSize="10">S0</text>

                {/* Bus lines */}
                <line x1="215" y1="245" x2="400" y2="245" stroke="#06b6d4" strokeWidth="1.5" />
                <line x1="260" y1="240" x2="400" y2="240" stroke="#06b6d4" strokeWidth="1.5" />
                <line x1="305" y1="235" x2="400" y2="235" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="410" y="248" fill="#06b6d4" fontWeight="bold">b</text>
                <text x="410" y="243" fill="#06b6d4" fontWeight="bold">c</text>
                <text x="410" y="238" fill="#06b6d4" fontWeight="bold">d</text>

                {/* Output */}
                <line x1="340" y1="125" x2="450" y2="125" stroke="#10b981" strokeWidth="2.5" />
                <polygon points="450,120 460,125 450,130" fill="#10b981" />
                <text x="475" y="130" fill="#10b981" fontWeight="bold" fontSize="15">F</text>
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 4-Variable 8:1 MUX Simulator</h2>
              <p className="text-xs text-slate-400">Toggle minterm circles and test live logic states on the 8:1 multiplexer</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-400 uppercase tracking-wider">Active Minterms:</span>
              <span className="font-mono text-emerald-400">F(a, b, c, d) = &Sigma;({minterms.join(", ")})</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 font-mono text-xs">
              {Array.from({ length: 16 }, (_, i) => i).map((m) => {
                const isActive = minterms.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleMinterm(m)}
                    className={clsx(
                      "py-1.5 rounded font-bold transition flex flex-col items-center justify-center border text-[11px]",
                      isActive
                        ? "bg-emerald-600/30 text-emerald-300 border-emerald-500/60"
                        : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                    )}
                  >
                    <span>m{m}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} /> Test Live Input Signals
              </span>
              <span className="font-mono text-slate-400">Current Minterm: m{currentMinterm}</span>
            </div>

            <div className="grid sm:grid-cols-4 gap-2 text-xs font-mono">
              <button
                onClick={() => setValA(!valA)}
                className={clsx(
                  "p-2.5 rounded-lg border font-bold flex items-center justify-between transition",
                  valA ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Data a:</span>
                <span>{valA ? "1" : "0"}</span>
              </button>

              <button
                onClick={() => setValB(!valB)}
                className={clsx(
                  "p-2.5 rounded-lg border font-bold flex items-center justify-between transition",
                  valB ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Select S2 (b):</span>
                <span>{valB ? "1" : "0"}</span>
              </button>

              <button
                onClick={() => setValC(!valC)}
                className={clsx(
                  "p-2.5 rounded-lg border font-bold flex items-center justify-between transition",
                  valC ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Select S1 (c):</span>
                <span>{valC ? "1" : "0"}</span>
              </button>

              <button
                onClick={() => setValD(!valD)}
                className={clsx(
                  "p-2.5 rounded-lg border font-bold flex items-center justify-between transition",
                  valD ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Select S0 (d):</span>
                <span>{valD ? "1" : "0"}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-mono">8:1 MUX Output:</div>
                <div className="text-sm font-bold text-slate-200">
                  Select Address S2S1S0 = {valB ? "1" : "0"}{valC ? "1" : "0"}{valD ? "1" : "0"} routes input I{(valB ? 4 : 0) + (valC ? 2 : 0) + (valD ? 1 : 0)}
                </div>
              </div>
              <div className={clsx(
                "px-5 py-2 rounded-xl text-xl font-extrabold font-mono border transition-all",
                outputF === 1
                  ? "bg-emerald-950 text-emerald-400 border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                  : "bg-slate-950 text-slate-600 border-slate-800"
              )}>
                F = {outputF}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: 4-Variable MUX Questions</h2>
              <p className="text-xs text-slate-400">High-scoring strategies and common student errors in 5-mark questions</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">CISCE 5-Mark Marking Breakdown</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">1 Mark:</strong> Specifying MUX size ($8 \times 1$) and select line assignments ($S_2=b, S_1=c, S_0=d$).</li>
                <li><strong className="text-white">2 Marks:</strong> Neatly drawn 8-column implementation table with circled minterms.</li>
                <li><strong className="text-white">1 Mark:</strong> Listing the derived input equations $I_0$ through $I_7$ with rule references.</li>
                <li><strong className="text-white">1 Mark:</strong> Clean 8:1 MUX block schematic with input pins, select lines, and inverter gate.</li>
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
        topicId="topic-37-4var-mux-function-implementation"
        headline="Sukanta Hui's Advice for 4-Variable 8:1 MUX Questions"
        note="Example 2.13 from page 109 of your textbook is the exact archetype that appears in Section A of the ISC Class 12 board examination. When constructing your 8-column table, take your time placing minterms 0-7 on the top row and 8-15 on the bottom row. Notice how tidy the solution is: out of 8 data inputs, two are tied to 1, three are tied to 0, one receives a directly, and two share a single NOT gate for a'. This is why examiners love this question—it tests whether you can spot hardware optimizations!"
      />
    </div>
  );
};

export default Topic37;
