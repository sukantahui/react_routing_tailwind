import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic27_faqs";

const Topic27 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Selected minterms for F(A, B, C)
  // Default: F(A, B, C) = Σ(1, 3, 5, 6)
  const [minterms, setMinterms] = useState([1, 3, 5, 6]);

  // Live input test values
  const [valA, setValA] = useState(false);
  const [valB, setValB] = useState(false);
  const [valC, setValC] = useState(true);

  const toggleMinterm = (m) => {
    if (minterms.includes(m)) {
      setMinterms(minterms.filter((x) => x !== m));
    } else {
      setMinterms([...minterms, m].sort((a, b) => a - b));
    }
  };

  // Implementation Table Analysis for 4:1 MUX (A, B select lines, C residual)
  // I0: (0, 1) -> 0=C', 1=C
  // I1: (2, 3) -> 2=C', 3=C
  // I2: (4, 5) -> 4=C', 5=C
  // I3: (6, 7) -> 6=C', 7=C
  const getColValue = (m0, m1) => {
    const has0 = minterms.includes(m0);
    const has1 = minterms.includes(m1);
    if (!has0 && !has1) return { val: "0", type: "zero", desc: "Connected to Ground (0)" };
    if (has0 && has1) return { val: "1", type: "one", desc: "Connected to Vcc (1)" };
    if (has0 && !has1) return { val: "C'", type: "cbar", desc: "Connected to Inverted C (C')" };
    return { val: "C", type: "c", desc: "Connected to Direct C" };
  };

  const colI0 = getColValue(0, 1);
  const colI1 = getColValue(2, 3);
  const colI2 = getColValue(4, 5);
  const colI3 = getColValue(6, 7);

  // Compute live output for (A, B, C)
  const currentMinterm = (valA ? 4 : 0) + (valB ? 2 : 0) + (valC ? 1 : 0);
  const outputF = minterms.includes(currentMinterm) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 27
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Realization of Boolean Functions using 4-to-1 Multiplexer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Implementation Table Method: Synthesizing 3-Variable Functions F(A, B, C) using Select Lines S1=A, S0=B and Residual Inputs {"{0, 1, C, C'}"}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Implementation Table Method" },
              { id: "truthTable", label: "3. Implementation Table & Circuit" },
              { id: "interactive", label: "4. Dynamic Minterm Synthesizer" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Why Multiplexers are Universal Function Generators</h2>
              <p className="text-xs text-slate-400">Implementing any 3-variable logic function without standard logic gates</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              A multiplexer can implement <strong className="text-white">any arbitrary Boolean function</strong> without needing separate AND and OR gates. For a 3-variable function <span className="font-mono text-cyan-400">F(A, B, C)</span>:
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 1: Select Lines</span>
                <div className="text-base font-mono font-bold text-white">A → S1, B → S0</div>
                <p className="text-xs text-slate-400">The first (n-1) variables are mapped directly to the multiplexer select lines.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 2: Residual Variable</span>
                <div className="text-base font-mono font-bold text-white">Variable C</div>
                <p className="text-xs text-slate-400">The remaining variable C provides signals {"{0, 1, C, C'}"} to data inputs I0–I3.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3: Direct Connection</span>
                <div className="text-base font-mono font-bold text-white">Zero Extra Gates</div>
                <p className="text-xs text-slate-400">Only an optional single NOT gate is needed if C&apos; is required.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-2">
              <div className="font-bold text-indigo-300">The 4-Case Evaluation Rule:</div>
              <p>
                In the Implementation Table, each column (representing one data input Ik) contains two minterms corresponding to C=0 and C=1.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Neither minterm circled: <strong className="text-white">Input = 0 (Ground)</strong></li>
                <li>Both minterms circled: <strong className="text-white">Input = 1 (Vcc)</strong></li>
                <li>Only top minterm (C=0) circled: <strong className="text-white">Input = C&apos;</strong></li>
                <li>Only bottom minterm (C=1) circled: <strong className="text-white">Input = C</strong></li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Worked Example: F(A, B, C) = Σ(1, 3, 5, 6)</h2>
              <p className="text-xs text-slate-400">Standard CISCE specimen question solved step-by-step</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              Consider the Boolean function <span className="font-mono text-cyan-300 font-bold">F(A, B, C) = Σ(1, 3, 5, 6)</span>.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-amber-400 font-sans font-bold">Implementation Table Setup:</div>
              <div className="overflow-x-auto">
                <table className="w-full text-center border border-slate-800 text-xs">
                  <thead className="bg-slate-900 text-slate-300">
                    <tr>
                      <th className="p-2 border border-slate-800 text-left">Residual Term</th>
                      <th className="p-2 border border-slate-800">I0 (AB = 00)</th>
                      <th className="p-2 border border-slate-800">I1 (AB = 01)</th>
                      <th className="p-2 border border-slate-800">I2 (AB = 10)</th>
                      <th className="p-2 border border-slate-800">I3 (AB = 11)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-slate-800 font-bold text-slate-400 text-left">C&apos; (C=0)</td>
                      <td className="p-2 border border-slate-800 text-slate-500">0</td>
                      <td className="p-2 border border-slate-800 text-slate-500">2</td>
                      <td className="p-2 border border-slate-800 text-slate-500">4</td>
                      <td className="p-2 border border-slate-800 font-bold text-emerald-400 bg-emerald-950/30">⑥</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-800 font-bold text-slate-400 text-left">C (C=1)</td>
                      <td className="p-2 border border-slate-800 font-bold text-emerald-400 bg-emerald-950/30">①</td>
                      <td className="p-2 border border-slate-800 font-bold text-emerald-400 bg-emerald-950/30">③</td>
                      <td className="p-2 border border-slate-800 font-bold text-emerald-400 bg-emerald-950/30">⑤</td>
                      <td className="p-2 border border-slate-800 text-slate-500">7</td>
                    </tr>
                    <tr className="bg-slate-900/80 font-bold text-cyan-300">
                      <td className="p-2 border border-slate-800 text-left text-white">MUX Input:</td>
                      <td className="p-2 border border-slate-800">C</td>
                      <td className="p-2 border border-slate-800">C</td>
                      <td className="p-2 border border-slate-800">C</td>
                      <td className="p-2 border border-slate-800">C&apos;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-300">
              <div className="font-bold text-emerald-400">Deduction:</div>
              <p>• Column I0: Only minterm 1 is circled (row C) → <strong className="text-white">I0 = C</strong></p>
              <p>• Column I1: Only minterm 3 is circled (row C) → <strong className="text-white">I1 = C</strong></p>
              <p>• Column I2: Only minterm 5 is circled (row C) → <strong className="text-white">I2 = C</strong></p>
              <p>• Column I3: Only minterm 6 is circled (row C&apos;) → <strong className="text-white">I3 = C&apos;</strong></p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Implementation Table &amp; Realization Circuit</h2>
              <p className="text-xs text-slate-400">Complete graphical solution for F(A, B, C) = Σ(1, 3, 5, 6)</p>
            </div>
          </div>

          {/* IMPLEMENTATION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. Function Implementation Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-left text-amber-400">Residual Input</th>
                    <th className="p-3 text-indigo-400 font-bold">I0 (00)</th>
                    <th className="p-3 text-indigo-400 font-bold">I1 (01)</th>
                    <th className="p-3 text-indigo-400 font-bold">I2 (10)</th>
                    <th className="p-3 text-indigo-400 font-bold">I3 (11)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-3 text-left font-bold text-slate-400">C&apos; (C=0)</td>
                    <td className="p-3 text-slate-500">m0</td>
                    <td className="p-3 text-slate-500">m2</td>
                    <td className="p-3 text-slate-500">m4</td>
                    <td className="p-3 font-bold text-emerald-400 bg-emerald-950/30">m6 (Circled)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-left font-bold text-slate-400">C (C=1)</td>
                    <td className="p-3 font-bold text-emerald-400 bg-emerald-950/30">m1 (Circled)</td>
                    <td className="p-3 font-bold text-emerald-400 bg-emerald-950/30">m3 (Circled)</td>
                    <td className="p-3 font-bold text-emerald-400 bg-emerald-950/30">m5 (Circled)</td>
                    <td className="p-3 text-slate-500">m7</td>
                  </tr>
                  <tr className="bg-slate-900/90 font-bold text-emerald-300">
                    <td className="p-3 text-left text-white">Derived Connection:</td>
                    <td className="p-3 text-emerald-400 text-sm">C</td>
                    <td className="p-3 text-emerald-400 text-sm">C</td>
                    <td className="p-3 text-emerald-400 text-sm">C</td>
                    <td className="p-3 text-emerald-400 text-sm">C&apos;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG 1: CIRCUIT REALIZATION */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. 4-to-1 MUX Realization Circuit Diagram
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 680 340" className="w-full max-w-2xl h-auto select-none font-mono text-xs">
                {/* 4:1 MUX Block */}
                <polygon points="260,40 440,80 440,240 260,280" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="350" y="150" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="16">4-to-1</text>
                <text x="350" y="172" fill="#a5b4fc" textAnchor="middle" fontSize="12">MULTIPLEXER</text>

                {/* Select Lines S1=A, S0=B */}
                <line x1="310" y1="265" x2="310" y2="315" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="310" cy="315" r="4" fill="#f59e0b" />
                <text x="310" y="332" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S1 = A</text>

                <line x1="380" y1="250" x2="380" y2="315" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="380" cy="315" r="4" fill="#f59e0b" />
                <text x="380" y="332" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S0 = B</text>

                {/* Input Rails on the left for C and C' */}
                {/* Rail C */}
                <text x="50" y="30" fill="#38bdf8" fontWeight="bold" fontSize="13">C</text>
                <line x1="55" y1="40" x2="55" y2="280" stroke="#38bdf8" strokeWidth="2" />

                {/* NOT Gate on C */}
                <line x1="55" y1="70" x2="90" y2="70" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="90,62 115,70 90,78" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="120" cy="70" r="3.5" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="124" y1="70" x2="150" y2="70" stroke="#38bdf8" strokeWidth="2" />
                <line x1="150" y1="70" x2="150" y2="280" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                <text x="145" y="30" fill="#7dd3fc" fontSize="13">C&apos;</text>

                {/* Connection to I0 (Connected to C) */}
                <circle cx="55" cy="80" r="3.5" fill="#38bdf8" />
                <line x1="55" y1="80" x2="260" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="235" y="75" fill="#c7d2fe">I0</text>

                {/* Connection to I1 (Connected to C) */}
                <circle cx="55" cy="120" r="3.5" fill="#38bdf8" />
                <line x1="55" y1="120" x2="260" y2="120" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="235" y="115" fill="#c7d2fe">I1</text>

                {/* Connection to I2 (Connected to C) */}
                <circle cx="55" cy="160" r="3.5" fill="#38bdf8" />
                <line x1="55" y1="160" x2="260" y2="160" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="235" y="155" fill="#c7d2fe">I2</text>

                {/* Connection to I3 (Connected to C') */}
                <circle cx="150" cy="200" r="3.5" fill="#7dd3fc" />
                <line x1="150" y1="200" x2="260" y2="200" stroke="#7dd3fc" strokeWidth="1.5" />
                <text x="235" y="195" fill="#c7d2fe">I3</text>

                {/* Output Y = F(A, B, C) */}
                <line x1="440" y1="160" x2="570" y2="160" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="570" cy="160" r="4" fill="#10b981" />
                <text x="585" y="165" fill="#6ee7b7" fontWeight="bold" fontSize="13">F(A,B,C)</text>
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Dynamic 4:1 MUX Function Synthesizer</h2>
              <p className="text-xs text-slate-400">Click minterms to customize F(A, B, C) and see live input derivations</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            {/* MINTERM TOGGLES */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Select Minterms in F(A, B, C) = Σ(...):
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((m) => {
                  const active = minterms.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={() => toggleMinterm(m)}
                      className={clsx(
                        "w-10 h-10 rounded-lg font-mono font-bold text-xs border transition-all",
                        active
                          ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                          : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600"
                      )}
                    >
                      m{m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LIVE DEDUCED INPUTS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "I0", res: colI0, ab: "00" },
                { name: "I1", res: colI1, ab: "01" },
                { name: "I2", res: colI2, ab: "10" },
                { name: "I3", res: colI3, ab: "11" }
              ].map((inp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                  <div className="text-xs text-slate-400 font-mono">{inp.name} (AB={inp.ab})</div>
                  <div className="text-2xl font-mono font-black text-emerald-400">{inp.res.val}</div>
                  <div className="text-[11px] text-slate-400">{inp.res.desc}</div>
                </div>
              ))}
            </div>

            {/* LIVE CIRCUIT TEST VERIFICATION */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Test Input Combination (A, B, C):
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setValA(!valA)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    valA ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  A = {valA ? "1" : "0"}
                </button>
                <button
                  onClick={() => setValB(!valB)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    valB ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  B = {valB ? "1" : "0"}
                </button>
                <button
                  onClick={() => setValC(!valC)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    valC ? "bg-cyan-600 text-white border-cyan-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  C = {valC ? "1" : "0"}
                </button>

                <div className="ml-auto text-xs flex items-center gap-3">
                  <span className="text-slate-400">Current Minterm:</span>
                  <span className="font-mono font-bold text-white">m{currentMinterm}</span>
                  <span className="text-slate-400">→ Output F:</span>
                  <span
                    className={clsx(
                      "font-mono font-black text-sm px-2.5 py-0.5 rounded",
                      outputF === 1 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                    )}
                  >
                    {outputF}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Function Realization</h2>
              <p className="text-xs text-slate-400">Standard 4-mark and 5-mark question analysis</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">Exam Step-by-Step Scoring Guide</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">Implementation Table (2 Marks):</strong> Correctly setup 2 rows for C&apos; and C, with circled minterms.</li>
                <li><strong className="text-white">Input Assignments (1 Mark):</strong> Correctly identifying 0, 1, C, C&apos; for I0, I1, I2, I3.</li>
                <li><strong className="text-white">Circuit Diagram (2 Marks):</strong> 4:1 MUX block with S1=A, S0=B, inputs connected correctly, and NOT gate drawn for C&apos;.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

            {/* TAB CONTENT: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
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
        topicId="topic-27-realization"
        headline="Sukanta Hui's Board Strategy on Function Realization"
        note="Whenever you see a question asking to implement a 3-variable function with a 4-to-1 MUX, ALWAYS draw the Implementation Table first! Circle the numbers given in the sigma list. If a column has no circled number, write 0. If both are circled, write 1. If only the top row is circled, write C'. If only the bottom row is circled, write C. That's guaranteed 100% full marks!"
      />
    </div>
  );
};

export default Topic27;
