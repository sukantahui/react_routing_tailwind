import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table, Check } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic36_faqs";

const Topic36 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Selected minterms for F(x, y, z)
  // Default: F(x, y, z) = Σ(1, 3, 5, 6)
  const [minterms, setMinterms] = useState([1, 3, 5, 6]);

  // Live input test values
  const [valX, setValX] = useState(false);
  const [valY, setValY] = useState(false);
  const [valZ, setValZ] = useState(true);

  const toggleMinterm = (m) => {
    if (minterms.includes(m)) {
      setMinterms(minterms.filter((x) => x !== m));
    } else {
      setMinterms([...minterms, m].sort((a, b) => a - b));
    }
  };

  // Implementation Table Analysis for 4:1 MUX with Leftmost Singled-Out Variable x
  // S1 = y, S0 = z
  // I0: (0, 4) -> 0=x', 4=x
  // I1: (1, 5) -> 1=x', 5=x
  // I2: (2, 6) -> 2=x', 6=x
  // I3: (3, 7) -> 3=x', 7=x
  const getColAnalysis = (topMinterm, bottomMinterm) => {
    const isTopCircled = minterms.includes(topMinterm);
    const isBottomCircled = minterms.includes(bottomMinterm);

    if (!isTopCircled && !isBottomCircled) {
      return { val: "0", rule: "Rule 1", desc: "Neither minterm circled -> Apply 0 (Ground)" };
    }
    if (isTopCircled && isBottomCircled) {
      return { val: "1", rule: "Rule 2", desc: "Both minterms circled -> Apply 1 (VCC)" };
    }
    if (!isTopCircled && isBottomCircled) {
      return { val: "x", rule: "Rule 3", desc: "Bottom circled, top not -> Apply x" };
    }
    return { val: "x'", rule: "Rule 4", desc: "Top circled, bottom not -> Apply x' (Inverter)" };
  };

  const colI0 = getColAnalysis(0, 4);
  const colI1 = getColAnalysis(1, 5);
  const colI2 = getColAnalysis(2, 6);
  const colI3 = getColAnalysis(3, 7);

  // Compute live output for (x, y, z)
  const currentMinterm = (valX ? 4 : 0) + (valY ? 2 : 0) + (valZ ? 1 : 0);
  const outputF = minterms.includes(currentMinterm) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 36
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1.5">
              <CheckCircle2 size={12} /> Textbook Page 108 Standard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Boolean Function Implementation: 3-Variable Realization using 4 × 1 MUX
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Textbook Page 108 (Section 2.3.4A): Leftmost Singled-Out Variable Method, Steps IV–VI &amp; Rules 1–4 for F(x, y, z) = Σ(1, 3, 5, 6) using S₁ = y, S₀ = z with Figure 2.25
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Rules 1-4" },
              { id: "equations", label: "2. Step-by-Step Method" },
              { id: "truthTable", label: "3. Truth Table & Circuit" },
              { id: "interactive", label: "4. Interactive MUX Simulator" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">The 2^(n-1) to 1 Multiplexer Theorem &amp; Rules 1–4</h2>
              <p className="text-xs text-slate-400">Section 2.3.4A: Synthesizing any 3-variable logic function with a 4:1 multiplexer</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Zap size={14} /> Fundamental Theorem (CISCE Textbook Page 107)
            </div>
            <p className="text-sm text-slate-200">
              <strong className="text-emerald-400">Any boolean function of n variables can be implemented with a 2^(n-1) to 1 multiplexer with (n - 1) selection lines.</strong>
            </p>
            <p className="text-xs text-slate-400">
              A multiplexer is essentially a decoder with the OR gate already available. For a 3-variable function (n=3), we take (n - 1) = 2 variables and connect them to the selection lines (S₁, S₀). The remaining single variable (x) is used for the inputs of the multiplexer in one of four states: 0, 1, x, or x&apos;.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> The 4 Fundamental Inspection Rules (Step VI)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-indigo-400 font-bold">Rule Number</th>
                    <th className="p-3 text-cyan-400 font-bold">Circle Inspection Condition</th>
                    <th className="p-3 text-emerald-400 font-bold">Input Applied</th>
                    <th className="p-3 text-slate-400">Circuit Wiring</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 1</td>
                    <td className="p-3">If the two minterms in a column are NOT circled</td>
                    <td className="p-3 font-bold text-emerald-400">0</td>
                    <td className="p-3 text-slate-400">Apply 0 (Ground / GND) to the input</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 2</td>
                    <td className="p-3">If the two minterms in a column ARE circled</td>
                    <td className="p-3 font-bold text-emerald-400">1</td>
                    <td className="p-3 text-slate-400">Apply 1 (Supply / VCC) to the input</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 3</td>
                    <td className="p-3">If bottom minterm is circled and top is NOT circled</td>
                    <td className="p-3 font-bold text-emerald-400">x (uncomplemented)</td>
                    <td className="p-3 text-slate-400">Connect directly to variable line x</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 4</td>
                    <td className="p-3">If top minterm is circled and bottom is NOT circled</td>
                    <td className="p-3 font-bold text-emerald-400">x&apos; (complemented)</td>
                    <td className="p-3 text-slate-400">Connect through a NOT gate (inverter) from x</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: STEP-BY-STEP METHOD */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Step-by-Step Derivation Procedure</h2>
              <p className="text-xs text-slate-400">Steps I through VI as required in CISCE Board Answer Scripts</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">Step I</span>
              <h3 className="font-bold text-white text-sm">Sum-of-Minterms Form</h3>
              <p className="text-slate-400">
                Express the function in its canonical sum-of-minterms: F(x, y, z) = Σ(1, 3, 5, 6).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">Step II</span>
              <h3 className="font-bold text-white text-sm">Single Out Leftmost Variable</h3>
              <p className="text-slate-400">
                In ordered sequence x, y, z, the leftmost variable is <strong>x</strong>. Variable x is singled out as the data literal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">Step III</span>
              <h3 className="font-bold text-white text-sm">Connect Selection Lines</h3>
              <p className="text-slate-400">
                Connect the (n - 1) = 2 variables to select lines: higher-order y to S₁, lowest-order z to S₀.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">Step IV &amp; V</span>
              <h3 className="font-bold text-white text-sm">Partition Minterms &amp; Table</h3>
              <p className="text-slate-400">
                x is 0 for minterms 0 to 3 (x&apos;), and 1 for minterms 4 to 7 (x). List minterms in 2 rows under I₀, I₁, I₂, I₃.
              </p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table, Implementation Table &amp; Realization Circuit</h2>
              <p className="text-xs text-slate-400">Complete graphical solution for Textbook Example F(x, y, z) = Σ(1, 3, 5, 6)</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 text-xs">
            {/* TRUTH TABLE */}
            <div className="space-y-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider">Truth Table of F(x, y, z)</span>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-center font-mono">
                  <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Row</th>
                      <th className="p-2 text-indigo-400 font-bold">x (Data)</th>
                      <th className="p-2 text-cyan-400 font-bold">y (S1)</th>
                      <th className="p-2 text-cyan-400 font-bold">z (S0)</th>
                      <th className="p-2 text-emerald-400 font-bold">F</th>
                      <th className="p-2 text-slate-400">Minterm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 text-slate-300">
                    <tr><td className="p-1.5 text-slate-500">0</td><td>0</td><td>0</td><td>0</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">m0 = x&apos;y&apos;z&apos;</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">1</td><td>0</td><td>0</td><td>1</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">m1 = x&apos;y&apos;z</td></tr>
                    <tr><td className="p-1.5 text-slate-500">2</td><td>0</td><td>1</td><td>0</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">m2 = x&apos;yz&apos;</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">3</td><td>0</td><td>1</td><td>1</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">m3 = x&apos;yz</td></tr>
                    <tr><td className="p-1.5 text-slate-500">4</td><td>1</td><td>0</td><td>0</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">m4 = xy&apos;z&apos;</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">5</td><td>1</td><td>0</td><td>1</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">m5 = xy&apos;z</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">6</td><td>1</td><td>1</td><td>0</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">m6 = xyz&apos;</td></tr>
                    <tr><td className="p-1.5 text-slate-500">7</td><td>1</td><td>1</td><td>1</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">m7 = xyz</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* IMPLEMENTATION TABLE */}
            <div className="space-y-4">
              <span className="font-bold text-slate-300 uppercase tracking-wider">Implementation Table (Textbook Page 108)</span>
              <div className="overflow-x-auto border border-indigo-900/60 rounded-xl bg-slate-950 shadow-md">
                <table className="w-full text-center font-mono">
                  <thead className="bg-indigo-950/60 text-slate-200 border-b border-indigo-800">
                    <tr>
                      <th className="p-2.5 text-left text-amber-400">Literal</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I0 (00)</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I1 (01)</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I2 (10)</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I3 (11)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2.5 text-left font-bold text-indigo-400">x&apos; (x=0)</td>
                      <td className="p-2.5 text-slate-500">0</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">① (Circled)</td>
                      <td className="p-2.5 text-slate-500">2</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">③ (Circled)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-left font-bold text-indigo-400">x (x=1)</td>
                      <td className="p-2.5 text-slate-500">4</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">⑤ (Circled)</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">⑥ (Circled)</td>
                      <td className="p-2.5 text-slate-500">7</td>
                    </tr>
                    <tr className="bg-slate-900/90 font-bold">
                      <td className="p-2 text-left text-amber-400">Input Applied:</td>
                      <td className="p-2 text-rose-400 bg-slate-950">0 (Rule 1)</td>
                      <td className="p-2 text-emerald-400 bg-slate-950">1 (Rule 2)</td>
                      <td className="p-2 text-cyan-400 bg-slate-950">x (Rule 3)</td>
                      <td className="p-2 text-indigo-400 bg-slate-950">x&apos; (Rule 4)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <div className="font-bold text-indigo-300">Output Expression Derivation:</div>
                <div className="font-mono text-slate-300">
                  The equation for a 4 &times; 1 MUX is:
                </div>
                <div className="font-mono text-cyan-300 font-bold">
                  F = S1&apos;S0&apos; &middot; I0 + S1&apos;S0 &middot; I1 + S1S0&apos; &middot; I2 + S1S0 &middot; I3
                </div>
                <div className="font-mono text-emerald-400">
                  F = y&apos;z&apos;(0) + y&apos;z(1) + yz&apos;(x) + yz(x&apos;) = y&apos;z + xyz&apos; + x&apos;yz &#10004;
                </div>
              </div>
            </div>
          </div>

          {/* CIRCUIT DIAGRAM SVG (FIG 2.25) */}
          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Logic Circuit Diagram (Textbook Figure 2.25)
            </span>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 540 220" className="w-full max-w-lg h-auto font-mono text-xs select-none">
                {/* Inputs */}
                <line x1="30" y1="45" x2="160" y2="45" stroke="#ef4444" strokeWidth="2" />
                <text x="18" y="49" fill="#ef4444" fontWeight="bold">0 (GND)</text>
                <text x="165" y="49" fill="#94a3b8">I0</text>

                <line x1="30" y1="80" x2="160" y2="80" stroke="#10b981" strokeWidth="2" />
                <text x="18" y="84" fill="#10b981" fontWeight="bold">1 (VCC)</text>
                <text x="165" y="84" fill="#94a3b8">I1</text>

                <line x1="30" y1="115" x2="160" y2="115" stroke="#38bdf8" strokeWidth="2" />
                <text x="18" y="119" fill="#38bdf8" fontWeight="bold">x</text>
                <text x="165" y="119" fill="#94a3b8">I2</text>

                {/* NOT Gate for x' */}
                <line x1="30" y1="150" x2="70" y2="150" stroke="#818cf8" strokeWidth="2" />
                <text x="18" y="154" fill="#818cf8" fontWeight="bold">x</text>
                <polygon points="70,142 90,150 70,158" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx="93" cy="150" r="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <line x1="96" y1="150" x2="160" y2="150" stroke="#818cf8" strokeWidth="2" />
                <text x="100" y="145" fill="#818cf8" fontSize="10">x&apos;</text>
                <text x="165" y="154" fill="#94a3b8">I3</text>

                {/* 4:1 MUX Block */}
                <rect x="180" y="25" width="160" height="150" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="260" y="65" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle">4 &times; 1</text>
                <text x="260" y="85" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">MUX</text>

                {/* Selection lines */}
                <line x1="225" y1="205" x2="225" y2="175" stroke="#06b6d4" strokeWidth="2" />
                <text x="225" y="167" fill="#06b6d4" textAnchor="middle" fontSize="11">S1</text>
                <text x="225" y="215" fill="#06b6d4" textAnchor="middle" fontWeight="bold">y</text>

                <line x1="295" y1="205" x2="295" y2="175" stroke="#06b6d4" strokeWidth="2" />
                <text x="295" y="167" fill="#06b6d4" textAnchor="middle" fontSize="11">S0</text>
                <text x="295" y="215" fill="#06b6d4" textAnchor="middle" fontWeight="bold">z</text>

                {/* Output line */}
                <line x1="340" y1="100" x2="440" y2="100" stroke="#10b981" strokeWidth="2.5" />
                <polygon points="440,95 450,100 440,105" fill="#10b981" />
                <text x="460" y="105" fill="#10b981" fontWeight="bold" fontSize="15">F</text>
                <text x="360" y="90" fill="#94a3b8" fontSize="10">&Sigma;(1, 3, 5, 6)</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 3-Variable MUX Synthesizer</h2>
              <p className="text-xs text-slate-400">Toggle minterm circles and test live logic states on the 4:1 multiplexer</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-400 uppercase tracking-wider">Active Function Minterms:</span>
              <span className="font-mono text-emerald-400">F(x, y, z) = &Sigma;({minterms.join(", ")})</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono text-xs">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((m) => {
                const isActive = minterms.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleMinterm(m)}
                    className={clsx(
                      "py-2 rounded-lg font-bold transition flex flex-col items-center justify-center border",
                      isActive
                        ? "bg-emerald-600/30 text-emerald-300 border-emerald-500/60 shadow-sm"
                        : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                    )}
                  >
                    <span>m{m}</span>
                    <span className="text-[10px] font-normal">{isActive ? "1" : "0"}</span>
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
              <span className="font-mono text-slate-400">Address S1S0 = {valY ? "1" : "0"}{valZ ? "1" : "0"} = I{(valY ? 2 : 0) + (valZ ? 1 : 0)}</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
              <button
                onClick={() => setValX(!valX)}
                className={clsx(
                  "p-3 rounded-lg border font-bold flex items-center justify-between transition",
                  valX ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Data x:</span>
                <span>{valX ? "1 (HIGH)" : "0 (LOW)"}</span>
              </button>

              <button
                onClick={() => setValY(!valY)}
                className={clsx(
                  "p-3 rounded-lg border font-bold flex items-center justify-between transition",
                  valY ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Select S1 (y):</span>
                <span>{valY ? "1" : "0"}</span>
              </button>

              <button
                onClick={() => setValZ(!valZ)}
                className={clsx(
                  "p-3 rounded-lg border font-bold flex items-center justify-between transition",
                  valZ ? "bg-cyan-600/30 text-cyan-300 border-cyan-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Select S0 (z):</span>
                <span>{valZ ? "1" : "0"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-mono">Multiplexer Output:</div>
                <div className="text-sm font-bold text-slate-200">
                  Input State: ({valX ? "1" : "0"}, {valY ? "1" : "0"}, {valZ ? "1" : "0"}) &#8594; m{currentMinterm}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus &amp; Examiner Criteria</h2>
              <p className="text-xs text-slate-400">High-scoring strategies and common student pitfalls in Section A</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">CISCE 4-Mark Question Rubric</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong className="text-white">1 Mark:</strong> Correct variable assignment (MSB x singled out, y \to S₁, z \to S₀).</li>
                <li><strong className="text-white">1 Mark:</strong> Clean implementation table showing rows x&apos; and x with accurately circled minterms.</li>
                <li><strong className="text-white">1 Mark:</strong> Correct application of Rules 1, 2, 3, 4 with explicit values listed for I₀, I₁, I₂, I₃.</li>
                <li><strong className="text-white">1 Mark:</strong> Properly drawn 4 × 1 MUX block diagram with inputs, select lines, and inverter gate on x.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-400 text-sm">Critical Pitfall to Avoid</h3>
              <p className="text-slate-300">
                Never omit the implementation table and jump directly to the circuit diagram! Examiners are instructed to deduct 2 marks if the intermediate implementation table with circled minterms is missing.
              </p>
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
        topicId="topic-36-3var-mux-function-implementation"
        headline="Sukanta Hui's Board Master Tip on the Leftmost Singled-Out Method"
        note="Whenever you tackle a 3-variable MUX implementation in your ISC examination, remember: singling out the leftmost variable x keeps your table completely intuitive. Minterms 0 to 3 are naturally on top (x=0), and 4 to 7 are on the bottom (x=1). Circle the minterms and run through the four rules like a checklist: empty column gives 0, full column gives 1, bottom only gives x, top only gives x'. Never forget to draw the single NOT gate for x' at the MUX input!"
      />
    </div>
  );
};

export default Topic36;
