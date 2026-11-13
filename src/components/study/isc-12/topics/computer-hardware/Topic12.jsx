import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic12 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [inputs, setInputs] = useState({ d0: false, d1: false, d2: false, d3: true });

  const toggleInput = (key) => {
    setInputs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Priority logic: D3 has highest priority, then D2, D1, D0
  let x = 0;
  let y = 0;
  let valid = 0;
  let highest = "None";

  if (inputs.d3) {
    x = 1; y = 1; valid = 1; highest = "D3 (3)";
  } else if (inputs.d2) {
    x = 1; y = 0; valid = 1; highest = "D2 (2)";
  } else if (inputs.d1) {
    x = 0; y = 1; valid = 1; highest = "D1 (1)";
  } else if (inputs.d0) {
    x = 0; y = 0; valid = 1; highest = "D0 (0)";
  }

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 12
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Priority Encoder: Concept, Truth Table &amp; Circuit
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Resolving Multiple Simultaneous Active Inputs: Priority Arbitration, Don't Care States, and Valid Output (V)
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & K-Map" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Multi-Signal Priority Simulator" },
              { id: "examTips", label: "5. ISC Board Exam Focus" }
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Why Priority Encoders are Required</h2>
              <p className="text-xs text-slate-400">Overcoming the fundamental limitation of standard binary encoders</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              In a standard binary encoder, if two or more input lines are activated simultaneously (e.g., two keyboard keys pressed at once), the output produces an erroneous, corrupted binary code.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">Priority Encoder</strong> resolves this ambiguity by assigning an explicit priority ranking to each input. If multiple inputs are HIGH simultaneously, <strong className="text-emerald-300">the input with the highest priority is encoded</strong>, while all lower-priority inputs are treated as <strong className="text-amber-300">Don't Care (X)</strong>. It also provides a <strong className="text-purple-300">Valid (V)</strong> output to distinguish between "D0 active" and "no input active".
            </p>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Boolean Equations for 4-Input Priority Encoder</h2>
              <p className="text-xs text-slate-400">Derivation of X, Y, and Valid bit V using K-Map minimization</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block">Output X (MSB)</span>
              <p className="text-slate-400 text-[11px] font-sans">Active if D2 or D3 is active:</p>
              <div className="text-cyan-300 font-bold text-sm">X = D2 + D3</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-purple-400 font-bold block">Output Y (LSB)</span>
              <p className="text-slate-400 text-[11px] font-sans">Active if D3 or (D1 and D2'):</p>
              <div className="text-purple-300 font-bold text-sm">{"Y = D3 + D1·D2'"}</div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">Valid Output (V)</span>
              <p className="text-slate-400 text-[11px] font-sans">Active if ANY input is 1:</p>
              <div className="text-emerald-300 font-bold text-sm">V = D0 + D1 + D2 + D3</div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT DIAGRAMS */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table with Don't Care States &amp; Circuit</h2>
              <p className="text-xs text-slate-400">Priority arbitration truth table and gate-level schematic</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. 4-Input Priority Encoder Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">D3 (High)</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">D2</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">D1</th>
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">D0 (Low)</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">X</th>
                    <th className="p-2.5 text-purple-400 border-r border-slate-800">Y</th>
                    <th className="p-2.5 text-emerald-400 border-r border-slate-800">V (Valid)</th>
                    <th className="p-2.5 text-slate-400 font-sans text-left pl-3">Condition Explanation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-500">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-slate-500">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-rose-400 font-bold">0</td>
                    <td className="p-2.5 text-slate-400 font-sans text-left pl-3">No input active (Invalid)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 text-slate-400 font-sans text-left pl-3">Only D0 active (Code 00)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">X</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-purple-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 text-slate-400 font-sans text-left pl-3">D1 active (D0 ignored)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-purple-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800">0</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 text-slate-400 font-sans text-left pl-3">D2 active (D1, D0 ignored)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/60">
                    <td className="p-2.5 border-r border-slate-800 text-cyan-300 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-amber-400">X</td>
                    <td className="p-2.5 border-r border-slate-800 text-purple-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-purple-400 font-bold">1</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400 font-bold">1</td>
                    <td className="p-2.5 text-slate-400 font-sans text-left pl-3">D3 active (Highest priority)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Block Diagram &amp; Priority Logic Schematic
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* BLOCK DIAGRAM */}
                <g transform="translate(40, 30)">
                  <rect x="0" y="0" width="220" height="200" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <text x="110" y="32" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">PRIORITY ENCODER</text>
                  <text x="110" y="50" fill="#64748b" fontSize="10" textAnchor="middle">4-Input with Valid bit</text>

                  <line x1="-30" y1="70" x2="0" y2="70" stroke="#06b6d4" strokeWidth="2" />
                  <text x="-36" y="74" fill="#06b6d4" fontSize="11" textAnchor="end">D0 (Low)</text>

                  <line x1="-30" y1="105" x2="0" y2="105" stroke="#06b6d4" strokeWidth="2" />
                  <text x="-36" y="109" fill="#06b6d4" fontSize="11" textAnchor="end">D1</text>

                  <line x1="-30" y1="140" x2="0" y2="140" stroke="#06b6d4" strokeWidth="2" />
                  <text x="-36" y="144" fill="#06b6d4" fontSize="11" textAnchor="end">D2</text>

                  <line x1="-30" y1="175" x2="0" y2="175" stroke="#06b6d4" strokeWidth="2" />
                  <text x="-36" y="179" fill="#06b6d4" fontSize="11" textAnchor="end">D3 (High)</text>

                  <line x1="220" y1="80" x2="260" y2="80" stroke="#818cf8" strokeWidth="2.5" />
                  <text x="275" y="84" fill="#818cf8" fontWeight="bold">X (MSB)</text>

                  <line x1="220" y1="125" x2="260" y2="125" stroke="#c084fc" strokeWidth="2.5" />
                  <text x="275" y="129" fill="#c084fc" fontWeight="bold">Y (LSB)</text>

                  <line x1="220" y1="170" x2="260" y2="170" stroke="#34d399" strokeWidth="2.5" />
                  <text x="275" y="174" fill="#34d399" fontWeight="bold">V (Valid)</text>
                </g>

                {/* LOGIC SCHEMATIC */}
                <g transform="translate(380, 20)">
                  {/* Gate for X = D2 + D3 */}
                  <g transform="translate(80, 30)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="22" y="36" fill="#a5b4fc" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#818cf8" strokeWidth="2" />
                    <text x="145" y="37" fill="#818cf8" fontWeight="bold">X = D2 + D3</text>
                  </g>

                  {/* Gate for Y = D3 + D1·D2' */}
                  <g transform="translate(80, 100)">
                    <rect x="-35" y="18" width="30" height="28" rx="4" fill="#0f172a" stroke="#c084fc" strokeWidth="1.5" />
                    <text x="-20" y="35" fill="#c084fc" fontSize="8" textAnchor="middle">{"D1·D2'"}</text>

                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
                    <text x="22" y="36" fill="#f5d0fe" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#c084fc" strokeWidth="2" />
                    <text x="145" y="37" fill="#c084fc" fontWeight="bold">{"Y = D3 + D1·D2'"}</text>
                  </g>

                  {/* Gate for V = D0 + D1 + D2 + D3 */}
                  <g transform="translate(80, 170)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#34d399" strokeWidth="2" />
                    <text x="22" y="36" fill="#a7f3d0" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#34d399" strokeWidth="2" />
                    <text x="145" y="37" fill="#34d399" fontWeight="bold">V = D0+D1+D2+D3</text>
                  </g>
                </g>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Multi-Signal Priority Arbitration Simulator</h2>
              <p className="text-xs text-slate-400">Toggle multiple inputs simultaneously to observe how highest priority overrides lower signals</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "d3", label: "Input D3 (Highest)", state: inputs.d3 },
                { id: "d2", label: "Input D2", state: inputs.d2 },
                { id: "d1", label: "Input D1", state: inputs.d1 },
                { id: "d0", label: "Input D0 (Lowest)", state: inputs.d0 }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleInput(item.id)}
                  className={clsx(
                    "p-3.5 rounded-xl font-mono text-xs font-bold transition-all border flex flex-col items-center gap-1",
                    item.state
                      ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase font-bold">{item.state ? "1 (HIGH)" : "0 (LOW)"}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-slate-400 uppercase">Winning Signal</div>
                <div className="text-xl font-bold font-mono text-cyan-300 py-1">{highest}</div>
                <div className="text-[10px] text-slate-500">Highest Active Priority</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-slate-400 uppercase">Binary Output Code (X Y)</div>
                <div className="text-2xl font-bold font-mono text-purple-300 py-1">
                  {valid ? `${x} ${y}` : "Don't Care (XX)"}
                </div>
                <div className="text-[10px] text-slate-500">X = MSB, Y = LSB</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-mono text-slate-400 uppercase">Valid Status (V)</div>
                <div className={clsx("text-2xl font-bold font-mono py-1", valid ? "text-emerald-400" : "text-rose-400")}>
                  V = {valid}
                </div>
                <div className="text-[10px] text-slate-500">{valid ? "Valid Input Detected" : "No Active Inputs"}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: EXAM TIPS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Priority Encoder</h2>
              <p className="text-xs text-slate-400">Scoring tips for Don't Care representation and V output</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Role of the Valid (V) Output</div>
            <p className="text-slate-300 leading-relaxed">
              Why is the Valid bit V necessary? When no input is pressed, the output X and Y might default to 00. But 00 is also the valid code for D0! Without V, the computer cannot tell whether key D0 was pressed or no key was pressed at all. V=1 confirms a genuine keypress!
            </p>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <section>
        <Teacher note="Priority encoders are the brains of computer interrupt controllers (like the PIC in x86). When multiple hardware peripherals request CPU attention at once, the priority encoder ensures the most critical device (like power management) is serviced first!" />
      </section>
    </div>
  );
};

export default Topic12;
