import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table, ArrowRight, Layers, Shuffle, Check } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic36_faqs";

const Topic36 = () => {
  const [activeTab, setActiveTab] = useState("examples3var");

  // Interactive Simulator State
  // Presets:
  // 1: Textbook Ex 1 (4:1 MUX): F(x, y, z) = Σ(1, 3, 5, 6)
  // 2: Full Adder Sum (4:1 MUX): F(A, B, C) = Σ(1, 2, 4, 7)
  // 3: Full Adder Carry (4:1 MUX): F(A, B, C) = Σ(3, 5, 6, 7)
  // 4: Ex 3 (4:1 MUX): F(A, B, C) = Σ(0, 2, 4, 6, 7)
  const [selectedPreset, setSelectedPreset] = useState("ex1");
  const [minterms3Var, setMinterms3Var] = useState([1, 3, 5, 6]);

  // Live input testing for 3-variable MUX (x, y, z)
  const [valX, setValX] = useState(false);
  const [valY, setValY] = useState(false);
  const [valZ, setValZ] = useState(true);

  // Scaled-down 2:1 MUX live simulation state for F(a,b,c) = a*b + b'*c' + c'*a'
  const [valA_scaled, setValA_scaled] = useState(false);
  const [valB_scaled, setValB_scaled] = useState(false);
  const [valC_scaled, setValC_scaled] = useState(false);

  const applyPreset = (presetKey) => {
    setSelectedPreset(presetKey);
    if (presetKey === "ex1") setMinterms3Var([1, 3, 5, 6]);
    else if (presetKey === "sum") setMinterms3Var([1, 2, 4, 7]);
    else if (presetKey === "carry") setMinterms3Var([3, 5, 6, 7]);
    else if (presetKey === "ex3") setMinterms3Var([0, 2, 4, 6, 7]);
  };

  const toggleMinterm = (m) => {
    setSelectedPreset("custom");
    if (minterms3Var.includes(m)) {
      setMinterms3Var(minterms3Var.filter((x) => x !== m));
    } else {
      setMinterms3Var([...minterms3Var, m].sort((a, b) => a - b));
    }
  };

  // Implementation Table derivation according to Textbook Leftmost Singled-Out Variable Rule:
  // Ordered variables: x, y, z. Leftmost variable: x.
  // Selection lines: S1 = y, S0 = z.
  // Row 1 (x'): minterms 0, 1, 2, 3 under I0, I1, I2, I3
  // Row 2 (x):  minterms 4, 5, 6, 7 under I0, I1, I2, I3
  const getColAnalysis = (topMinterm, bottomMinterm) => {
    const isTopCircled = minterms3Var.includes(topMinterm);
    const isBottomCircled = minterms3Var.includes(bottomMinterm);

    if (!isTopCircled && !isBottomCircled) {
      return { val: "0", rule: "Rule 1", desc: "Neither minterm circled -> Apply 0 (Ground)" };
    }
    if (isTopCircled && isBottomCircled) {
      return { val: "1", rule: "Rule 2", desc: "Both minterms circled -> Apply 1 (VCC)" };
    }
    if (!isTopCircled && isBottomCircled) {
      return { val: "x", rule: "Rule 3", desc: "Bottom circled, top not -> Apply x" };
    }
    return { val: "x'", rule: "Rule 4", desc: "Top circled, bottom not -> Apply x'" };
  };

  const colI0 = getColAnalysis(0, 4);
  const colI1 = getColAnalysis(1, 5);
  const colI2 = getColAnalysis(2, 6);
  const colI3 = getColAnalysis(3, 7);

  // Live output evaluation for 3-variable MUX
  const currentMinterm3 = (valX ? 4 : 0) + (valY ? 2 : 0) + (valZ ? 1 : 0);
  const outputF3 = minterms3Var.includes(currentMinterm3) ? 1 : 0;

  // Scaled-down 2:1 MUX calculation: F = a(b + c') + a'c'
  // When a=0: F = I0 = c'
  // When a=1: F = I1 = b + c'
  const cBar = !valC_scaled;
  const inputI0_scaled = cBar ? 1 : 0;
  const inputI1_scaled = (valB_scaled || cBar) ? 1 : 0;
  const outputF_scaled = valA_scaled ? inputI1_scaled : inputI0_scaled;

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
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868 Masterclass
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Boolean Function Implementation using Multiplexers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Complete CISCE Textbook Mastery: The Implementation Table Method ($2^{"{"}n-1{"}"} \to 1$ MUX), Leftmost Singled-Out Variable, Rules 1–4, Scaled-Down MUX (Shannon Expansion), Applications &amp; 6 Comprehensive Worked Examples.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Rules 1-4" },
              { id: "examples3var", label: "2. 3-Var Examples (4:1 MUX)" },
              { id: "examples4var", label: "3. 4-Var Examples (8:1 MUX)" },
              { id: "scaledDown", label: "4. Scaled-Down MUX (2:1 MUX)" },
              { id: "applications", label: "5. MUX Applications (Bus & Serializer)" },
              { id: "simulator", label: "6. Interactive MUX Synthesizer" },
              { id: "faqs", label: "7. 15 Essential FAQs" }
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

      {/* ==================================================================== */}
      {/* TAB 1: CORE THEORY & RULES 1-4 */}
      {/* ==================================================================== */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">The $2^{"{"}n-1{"}"}$-to-1 MUX Principle &amp; Implementation Table Rules</h2>
              <p className="text-xs text-slate-400">Formal CISCE textbook methodology for synthesizing any arbitrary Boolean function</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Zap size={14} /> Fundamental Theorem (CISCE Syllabus 868)
            </div>
            <p className="text-sm text-slate-200">
              <strong className="text-emerald-400">Any Boolean function of $n$ variables can be implemented with a $2^{"{"}n-1{"}"}$ to 1 multiplexer with $(n - 1)$ selection lines.</strong>
            </p>
            <p className="text-xs text-slate-400">
              A multiplexer is essentially a decoder with an internal OR gate already built in. By connecting $(n - 1)$ variables to the selection lines and applying either $0, 1$, the remaining variable $X$, or its complement $X&apos;$ to the data inputs, any truth table is synthesized with zero external gate arrays.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              The 6 Step CISCE Implementation Procedure
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">Step I</span>
                <h4 className="font-bold text-white text-sm">Canonical Minterm Form</h4>
                <p className="text-slate-400">
                  Express the given Boolean expression in its canonical Sum-of-Minterms form: $F = \Sigma(m_a, m_b, \dots)$. If given in non-canonical form, expand it algebraically first.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">Step II</span>
                <h4 className="font-bold text-white text-sm">Single Out Leftmost Variable</h4>
                <p className="text-slate-400">
                  From the ordered set of variables (e.g. $x, y, z$), single out the <strong>leftmost variable ($x$)</strong> as the data input literal. The remaining $(n-1)$ variables ($y, z$) are reserved for selection lines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">Step III</span>
                <h4 className="font-bold text-white text-sm">Connect Selection Lines</h4>
                <p className="text-slate-400">
                  Connect the $(n-1)$ variables to select lines preserving positional weight: lowest-order variable to $S_0$, next-order to $S_1$, etc. (e.g., $z \to S_0$, $y \to S_1$).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">Step IV</span>
                <h4 className="font-bold text-white text-sm">Numerical Partitioning</h4>
                <p className="text-slate-400">
                  Leftmost variable $x$ is 0 for the first half of minterms ($0$ to $2^{"{"}n-1{"}"}-1$) and 1 for the second half ($2^{"{"}n-1{"}"}$ to $2^n-1$).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">Step V</span>
                <h4 className="font-bold text-white text-sm">Build Implementation Table</h4>
                <p className="text-slate-400">
                  Construct a table with $2^{"{"}n-1{"}"}$ columns ($I_0, I_1, \dots$) and 2 rows: Row 1 for $x&apos;$ ($0$ to $2^{"{"}n-1{"}"}-1$) and Row 2 for $x$ ($2^{"{"}n-1{"}"}$ to $2^n-1$). Circle all active minterms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">Step VI</span>
                <h4 className="font-bold text-white text-sm">Apply the 4 Rules</h4>
                <p className="text-slate-400">
                  Inspect each column independently and apply Rules 1, 2, 3, or 4 to directly deduce the exact logic literal applied to that multiplexer data input.
                </p>
              </div>
            </div>
          </div>

          {/* THE 4 RULES TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> The 4 Fundamental CISCE Inspection Rules
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-indigo-400 font-bold">Rule Number</th>
                    <th className="p-3 text-cyan-400 font-bold">Circle Inspection Condition</th>
                    <th className="p-3 text-emerald-400 font-bold">Input Applied</th>
                    <th className="p-3 text-slate-400">Hardware Connection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 1</td>
                    <td className="p-3">Neither minterm in the column is circled</td>
                    <td className="p-3 font-bold text-emerald-400">0</td>
                    <td className="p-3 text-slate-400">Connect input pin to Ground (GND / Logic 0)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 2</td>
                    <td className="p-3">Both minterms in the column are circled</td>
                    <td className="p-3 font-bold text-emerald-400">1</td>
                    <td className="p-3 text-slate-400">Connect input pin to Supply (VCC / Logic 1)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 3</td>
                    <td className="p-3">Bottom minterm is circled, top minterm is NOT circled</td>
                    <td className="p-3 font-bold text-emerald-400">x (uncomplemented)</td>
                    <td className="p-3 text-slate-400">Connect input pin directly to variable line $x$</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 4</td>
                    <td className="p-3">Top minterm is circled, bottom minterm is NOT circled</td>
                    <td className="p-3 font-bold text-emerald-400">x&apos; (complemented)</td>
                    <td className="p-3 text-slate-400">Connect through a NOT gate (inverter) from $x$</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: 3-VARIABLE EXAMPLES (4:1 MUX) */}
      {/* ==================================================================== */}
      {activeTab === "examples3var" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">3-Variable Boolean Function Synthesis on $4 \times 1$ MUX</h2>
              <p className="text-xs text-slate-400">Three comprehensive step-by-step worked examples from textbook and board examinations</p>
            </div>
          </div>

          {/* EXAMPLE 1: TEXTBOOK CORE EXAMPLE */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-indigo-800/40 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  Example 1 (Textbook Master Example)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  Implement $F(x, y, z) = \Sigma(1, 3, 5, 6)$ using a $4 \times 1$ Multiplexer
                </h3>
              </div>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-lg">
                n = 3 &#8594; 2^(3-1) = 4:1 MUX
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 text-xs">
              {/* TRUTH TABLE */}
              <div className="space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider">Step 1: Complete Truth Table</span>
                <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/60">
                  <table className="w-full text-center font-mono">
                    <thead className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                      <tr>
                        <th className="p-2">Row</th>
                        <th className="p-2 text-indigo-400 font-bold">x (Data)</th>
                        <th className="p-2 text-cyan-400 font-bold">y (S1)</th>
                        <th className="p-2 text-cyan-400 font-bold">z (S0)</th>
                        <th className="p-2 text-emerald-400 font-bold">F</th>
                        <th className="p-2 text-slate-400">Minterm</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
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

              {/* IMPLEMENTATION TABLE & RULES */}
              <div className="space-y-4">
                <span className="font-bold text-slate-300 uppercase tracking-wider">Step 2: Function Implementation Table</span>
                <div className="overflow-x-auto border border-indigo-900/60 rounded-xl bg-slate-900/80 shadow-md">
                  <table className="w-full text-center font-mono">
                    <thead className="bg-indigo-950/60 text-slate-200 border-b border-indigo-800">
                      <tr>
                        <th className="p-2 text-left text-amber-400">Row Literal</th>
                        <th className="p-2 text-cyan-300 font-bold">I0 (00)</th>
                        <th className="p-2 text-cyan-300 font-bold">I1 (01)</th>
                        <th className="p-2 text-cyan-300 font-bold">I2 (10)</th>
                        <th className="p-2 text-cyan-300 font-bold">I3 (11)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      <tr>
                        <td className="p-2.5 text-left font-bold text-indigo-400">x&apos; (x=0)</td>
                        <td className="p-2.5 text-slate-500">0</td>
                        <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded-lg">① (Circled)</td>
                        <td className="p-2.5 text-slate-500">2</td>
                        <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded-lg">③ (Circled)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-left font-bold text-indigo-400">x (x=1)</td>
                        <td className="p-2.5 text-slate-500">4</td>
                        <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded-lg">⑤ (Circled)</td>
                        <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded-lg">⑥ (Circled)</td>
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

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-[11px]">
                  <div className="font-bold text-indigo-300">Mathematical Verification:</div>
                  <div className="font-mono text-slate-300">
                    F = S1&apos;S0&apos;(I0) + S1&apos;S0(I1) + S1S0&apos;(I2) + S1S0(I3)
                  </div>
                  <div className="font-mono text-emerald-400">
                    F = y&apos;z&apos;(0) + y&apos;z(1) + yz&apos;(x) + yz(x&apos;) = y&apos;z + xyz&apos; + x&apos;yz = &Sigma;(1, 3, 5, 6) &#10004;
                  </div>
                </div>
              </div>
            </div>

            {/* CIRCUIT DIAGRAM SVG */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Gate-Level &amp; MUX Block Diagram (Textbook Fig 2.25)
              </span>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center">
                <svg viewBox="0 0 520 220" className="w-full max-w-lg h-auto font-mono text-xs select-none">
                  {/* Left inputs */}
                  <line x1="30" y1="50" x2="160" y2="50" stroke="#94a3b8" strokeWidth="2" />
                  <text x="20" y="54" fill="#ef4444" fontWeight="bold">0 (GND)</text>
                  <text x="165" y="54" fill="#94a3b8">I0</text>

                  <line x1="30" y1="85" x2="160" y2="85" stroke="#94a3b8" strokeWidth="2" />
                  <text x="20" y="89" fill="#10b981" fontWeight="bold">1 (VCC)</text>
                  <text x="165" y="89" fill="#94a3b8">I1</text>

                  <line x1="30" y1="120" x2="160" y2="120" stroke="#94a3b8" strokeWidth="2" />
                  <text x="20" y="124" fill="#38bdf8" fontWeight="bold">x</text>
                  <text x="165" y="124" fill="#94a3b8">I2</text>

                  {/* NOT gate for x' */}
                  <line x1="30" y1="155" x2="70" y2="155" stroke="#94a3b8" strokeWidth="2" />
                  <text x="18" y="159" fill="#38bdf8" fontWeight="bold">x</text>
                  <polygon points="70,147 90,155 70,163" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                  <circle cx="93" cy="155" r="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                  <line x1="96" y1="155" x2="160" y2="155" stroke="#94a3b8" strokeWidth="2" />
                  <text x="100" y="150" fill="#818cf8" fontSize="10">x&apos;</text>
                  <text x="165" y="159" fill="#94a3b8">I3</text>

                  {/* 4:1 MUX Block */}
                  <rect x="180" y="30" width="160" height="150" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                  <text x="260" y="70" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle">4 &times; 1</text>
                  <text x="260" y="90" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">MUX</text>

                  {/* Selection lines */}
                  <line x1="225" y1="210" x2="225" y2="180" stroke="#06b6d4" strokeWidth="2" />
                  <text x="225" y="172" fill="#06b6d4" textAnchor="middle" fontSize="11">S1</text>
                  <text x="225" y="218" fill="#06b6d4" textAnchor="middle" fontWeight="bold">y</text>

                  <line x1="295" y1="210" x2="295" y2="180" stroke="#06b6d4" strokeWidth="2" />
                  <text x="295" y="172" fill="#06b6d4" textAnchor="middle" fontSize="11">S0</text>
                  <text x="295" y="218" fill="#06b6d4" textAnchor="middle" fontWeight="bold">z</text>

                  {/* Output line */}
                  <line x1="340" y1="105" x2="440" y2="105" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="440,100 450,105 440,110" fill="#10b981" />
                  <text x="460" y="110" fill="#10b981" fontWeight="bold" fontSize="14">F</text>
                  <text x="360" y="95" fill="#94a3b8" fontSize="10">Σ(1, 3, 5, 6)</text>
                </svg>
              </div>
            </div>
          </div>

          {/* EXAMPLE 2: 1-BIT FULL ADDER IMPLEMENTATION */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                  Example 2 (Board Classic)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  1-Bit Full Adder Realization using Two $4 \times 1$ Multiplexers
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Sum = &Sigma;(1, 2, 4, 7), Carry = &Sigma;(3, 5, 6, 7)
              </span>
            </div>

            <p className="text-xs text-slate-300">
              In digital arithmetic, a Full Adder computes 3-variable addition of $A, B, C_{"{"}in{"}"}$. By singling out $A$ and connecting $B \to S_1$ and $C_{"{"}in{"}"} \to S_0$, both Sum and Carry are synthesized using two identical $4 \times 1$ MUX chips sharing the identical selection bus.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              {/* SUM TABLE */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center justify-between">
                  <span>Sum MUX Implementation:</span>
                  <span className="font-mono text-slate-400">Sum = &Sigma;(1, 2, 4, 7)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-center font-mono">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr><th className="p-1.5 text-left">Row</th><th>I0</th><th>I1</th><th>I2</th><th>I3</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      <tr>
                        <td className="p-1.5 text-left text-slate-400">A&apos;</td>
                        <td className="text-slate-500">0</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">①</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">②</td>
                        <td className="text-slate-500">3</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 text-left text-slate-400">A</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">④</td>
                        <td className="text-slate-500">5</td>
                        <td className="text-slate-500">6</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">⑦</td>
                      </tr>
                      <tr className="bg-slate-950 font-bold text-amber-300">
                        <td className="p-1.5 text-left">Sum:</td>
                        <td>A</td><td>A&apos;</td><td>A&apos;</td><td>A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CARRY TABLE */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 flex items-center justify-between">
                  <span>Carry MUX Implementation:</span>
                  <span className="font-mono text-slate-400">Carry = &Sigma;(3, 5, 6, 7)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-center font-mono">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr><th className="p-1.5 text-left">Row</th><th>I0</th><th>I1</th><th>I2</th><th>I3</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      <tr>
                        <td className="p-1.5 text-left text-slate-400">A&apos;</td>
                        <td className="text-slate-500">0</td>
                        <td className="text-slate-500">1</td>
                        <td className="text-slate-500">2</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">③</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 text-left text-slate-400">A</td>
                        <td className="text-slate-500">4</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">⑤</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">⑥</td>
                        <td className="text-emerald-300 font-bold bg-emerald-950/40">⑦</td>
                      </tr>
                      <tr className="bg-slate-950 font-bold text-emerald-300">
                        <td className="p-1.5 text-left">Cout:</td>
                        <td>0</td><td>A</td><td>A</td><td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* EXAMPLE 3: LEFTMOST VS RIGHTMOST COMPARISON */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  Example 3 (Architectural Comparison)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  Leftmost Singled-Out ($A$) vs. Rightmost Singled-Out ($C$) for $F(A, B, C) = \Sigma(0, 2, 4, 6, 7)$
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              In ISC examinations, question papers may specify: <em>&ldquo;Implement using $4 \times 1$ MUX taking $A$ as input variable&rdquo;</em> or <em>&ldquo;taking $C$ as input variable&rdquo;</em>. Both yield 100% equivalent truth tables, but the internal table rows differ:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold">Method A: Leftmost $A$ Singled Out (Textbook Standard)</span>
                <p className="text-[11px] text-slate-400 font-sans">Select lines: $S_1 = B$, $S_0 = C$. Row 1: $A&apos;$ (0-3), Row 2: $A$ (4-7).</p>
                <div className="p-2.5 rounded bg-slate-950 text-slate-300 text-[11px] space-y-1">
                  <div>I0 (0, 4) &#8594; Both circled &#8594; <strong className="text-emerald-400">1</strong></div>
                  <div>I1 (1, 5) &#8594; Neither circled &#8594; <strong className="text-rose-400">0</strong></div>
                  <div>I2 (2, 6) &#8594; Both circled &#8594; <strong className="text-emerald-400">1</strong></div>
                  <div>I3 (3, 7) &#8594; Bottom 7 circled &#8594; <strong className="text-cyan-400">A</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold">Method B: Rightmost $C$ Singled Out (Alternate Method)</span>
                <p className="text-[11px] text-slate-400 font-sans">Select lines: $S_1 = A$, $S_0 = B$. Row 1: $C&apos;$ (0,2,4,6), Row 2: $C$ (1,3,5,7).</p>
                <div className="p-2.5 rounded bg-slate-950 text-slate-300 text-[11px] space-y-1">
                  <div>I0 (0, 1) &#8594; Top 0 circled &#8594; <strong className="text-indigo-400">C&apos;</strong></div>
                  <div>I1 (2, 3) &#8594; Top 2 circled &#8594; <strong className="text-indigo-400">C&apos;</strong></div>
                  <div>I2 (4, 5) &#8594; Top 4 circled &#8594; <strong className="text-indigo-400">C&apos;</strong></div>
                  <div>I3 (6, 7) &#8594; Both circled &#8594; <strong className="text-emerald-400">1</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: 4-VARIABLE EXAMPLES (8:1 MUX) */}
      {/* ==================================================================== */}
      {activeTab === "examples4var" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">4-Variable Function Implementation on $8 \times 1$ MUX</h2>
              <p className="text-xs text-slate-400">Textbook Example 2.13 and Don&apos;t-Care term handling</p>
            </div>
          </div>

          {/* EXAMPLE 4: TEXTBOOK EXAMPLE 2.13 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-cyan-800/40 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  Example 4 (Textbook Example 2.13 - Page 109)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  Implement $F(a, b, c, d) = \Sigma(0, 1, 3, 4, 8, 9, 15)$ using an $8 \times 1$ Multiplexer
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                n = 4 &#8594; 2^(4-1) = 8:1 MUX
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-mono">Ordered Sequence:</div>
                  <div className="font-bold text-white text-sm">a b c d</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-mono">Singled-out Variable:</div>
                  <div className="font-bold text-indigo-400 text-sm">a (Leftmost / MSB)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 font-mono">Selection Lines (3 lines):</div>
                  <div className="font-bold text-cyan-400 text-sm">S2 = b, S1 = c, S0 = d</div>
                </div>
              </div>

              {/* 8-COLUMN IMPLEMENTATION TABLE */}
              <div className="space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider">Textbook Implementation Table</span>
                <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900 shadow-md">
                  <table className="w-full text-center font-mono">
                    <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
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
                      <tr className="bg-slate-950 font-bold text-amber-300">
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
                <span className="font-bold text-slate-300 uppercase tracking-wider">
                  Realization Circuit Diagram (Textbook Page 109)
                </span>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-center">
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
            </div>
          </div>

          {/* EXAMPLE 5: 4-VARIABLE WITH DON'T CARE TERMS */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  Example 5 (Don&apos;t-Care Minimization)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  $F(w, x, y, z) = \Sigma(1, 2, 6, 7, 9, 14) + d(3, 11)$ on $8 \times 1$ MUX
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              When a Boolean function includes Don&apos;t Care conditions $d(\dots)$, they are marked in the implementation table with a dotted or distinct circle. A don&apos;t-care minterm is actively circled <strong>only if it simplifies the input to a constant $1$ (Rule 2)</strong>, saving an inverter from being placed in the physical circuit!
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2">
              <div className="text-cyan-400 font-bold">Column I1 (Minterms 3 and 11):</div>
              <p className="text-slate-400 font-sans">
                Notice that minterms 3 and 11 are both don&apos;t cares. If left uncircled, $I_1$ would be 0. If both are circled, $I_1$ becomes constant 1 (Rule 2).
              </p>
              <div className="text-emerald-400 font-bold">
                Optimized Result: By circling both don&apos;t cares 3 and 11, Column I1 is tied permanently to VCC (1), requiring ZERO external logic gates!
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: SCALED-DOWN MUX (2:1 MUX) */}
      {/* ==================================================================== */}
      {activeTab === "scaledDown" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Implementation through Scaled Down MUX (Textbook Section 2.3.4B)</h2>
              <p className="text-xs text-slate-400">Synthesizing 3-variable logic using a compact $2 \times 1$ MUX via Boolean factoring &amp; Shannon&apos;s expansion</p>
            </div>
          </div>

          {/* TEXTBOOK EXPLANATION */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-purple-800/40 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-xs uppercase tracking-wider">
                Example 6 (Textbook Section 2.3.4B - Page 109-110)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                Implement $F(a, b, c) = ab + b&apos;c&apos; + c&apos;a&apos;$ using a Scaled Down $2 \times 1$ Multiplexer
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Sometimes in hardware design we are constrained by available inventory: we need to implement a 3-variable function $F(a, b, c)$, but only a $2 \times 1$ MUX is available instead of a $4 \times 1$ MUX. Since a $2 \times 1$ MUX has only 1 selection line ($2^1 = 2$), we pick one variable as the selection line (e.g. $S_0 = a$) and factor the Boolean expression into coefficients of $a$ and $a&apos;$.
            </p>

            {/* STEP-BY-STEP ALGEBRAIC PROOF */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="font-bold text-amber-400 uppercase tracking-wider font-sans text-xs">
                Step-by-Step Algebraic Factoring Proof:
              </div>

              <div className="text-slate-300 space-y-1.5 pl-2 border-l-2 border-purple-500">
                <div>Given: <span className="text-cyan-300 font-bold">F = ab + b&apos;c&apos; + c&apos;a&apos;</span></div>
                <div>Selection variable chosen: <span className="text-indigo-400 font-bold">a (connected to S0)</span></div>
                <div className="text-slate-500 pt-1">// Expand middle term b&apos;c&apos; with (a + a&apos;):</div>
                <div>= ab + <span className="text-emerald-400">(a + a&apos;)</span>b&apos;c&apos; + c&apos;a&apos;</div>
                <div>= ab + ab&apos;c&apos; + a&apos;b&apos;c&apos; + c&apos;a&apos;</div>
                <div className="text-slate-500 pt-1">// Group terms by a and a&apos;:</div>
                <div>= <span className="text-indigo-400">a</span>(b + b&apos;c&apos;) + <span className="text-indigo-400">a&apos;</span>(b&apos;c&apos; + c&apos;)</div>
                <div className="text-slate-500 pt-1">// Apply absorption law: b + b&apos;c&apos; = b + c&apos; and b&apos;c&apos; + c&apos; = c&apos;(1 + b&apos;) = c&apos;:</div>
                <div>= <span className="text-indigo-400">a</span><span className="text-emerald-400">(b + c&apos;)</span> + <span className="text-indigo-400">a&apos;</span><span className="text-emerald-400">(c&apos;)</span></div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                <span className="text-emerald-400 font-bold">Final Factored Form: </span>
                <span className="font-bold text-white">F = S0&apos; &middot; I0 + S0 &middot; I1</span>, where:
                <div className="grid sm:grid-cols-2 gap-2 mt-2 text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-indigo-900/60">
                    <span className="text-indigo-400 font-bold">I0 = c&apos;</span> (applied for $a&apos;$, i.e. when $S_0 = 0$)
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-indigo-900/60">
                    <span className="text-indigo-400 font-bold">I1 = b + c&apos;</span> (applied for $a$, i.e. when $S_0 = 1$, using an OR gate)
                  </div>
                </div>
              </div>
            </div>

            {/* CIRCUIT DIAGRAM SVG (TEXTBOOK FIG 2.26) */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Hardware Schematic: $2 \times 1$ MUX with External OR Gate (Textbook Fig 2.26)
              </span>
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
                <svg viewBox="0 0 540 200" className="w-full max-w-lg h-auto font-mono text-xs select-none">
                  {/* Literal c' input */}
                  <text x="20" y="54" fill="#38bdf8" fontWeight="bold">c&apos;</text>
                  <line x1="45" y1="50" x2="220" y2="50" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="90" cy="50" r="3" fill="#38bdf8" />
                  <line x1="90" y1="50" x2="90" y2="135" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="90" y1="135" x2="120" y2="135" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="225" y="54" fill="#94a3b8">I0</text>

                  {/* OR Gate for b + c' */}
                  <text x="20" y="115" fill="#a855f7" fontWeight="bold">b</text>
                  <line x1="45" y1="110" x2="120" y2="110" stroke="#a855f7" strokeWidth="1.5" />

                  {/* 2-input OR gate shape */}
                  <path d="M 120,95 Q 135,122 120,150 Q 155,145 170,122 Q 155,100 120,95 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <text x="135" y="126" fill="#c7d2fe" fontSize="10">OR</text>

                  {/* Output of OR gate into I1 */}
                  <line x1="170" y1="122" x2="220" y2="122" stroke="#10b981" strokeWidth="2" />
                  <text x="180" y="115" fill="#10b981" fontSize="10">b + c&apos;</text>
                  <text x="225" y="126" fill="#94a3b8">I1</text>

                  {/* 2:1 MUX Block */}
                  <rect x="240" y="30" width="130" height="120" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2.5" />
                  <text x="305" y="75" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle">2 &times; 1</text>
                  <text x="305" y="95" fill="#c4b5fd" fontWeight="bold" fontSize="13" textAnchor="middle">MUX</text>

                  {/* Select line S0 = a */}
                  <line x1="305" y1="180" x2="305" y2="150" stroke="#06b6d4" strokeWidth="2" />
                  <text x="305" y="145" fill="#06b6d4" textAnchor="middle" fontSize="10">S0</text>
                  <text x="305" y="195" fill="#06b6d4" textAnchor="middle" fontWeight="bold" fontSize="13">a</text>

                  {/* Final Output F */}
                  <line x1="370" y1="90" x2="450" y2="90" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="450,85 460,90 450,95" fill="#10b981" />
                  <text x="475" y="95" fill="#10b981" fontWeight="bold" fontSize="15">F</text>
                  <text x="385" y="80" fill="#94a3b8" fontSize="10">F = S0&apos;I0 + S0I1</text>
                </svg>
              </div>
            </div>

            {/* LIVE TESTER FOR SCALED-DOWN MUX */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={14} /> Live Signal Interactive Probe (Scaled 2:1 MUX)
                </span>
                <span className="text-xs font-mono text-slate-400">Test all combinations of a, b, c</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <button
                  onClick={() => setValA_scaled(!valA_scaled)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg border font-bold transition",
                    valA_scaled ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50" : "bg-slate-950 text-slate-400 border-slate-700"
                  )}
                >
                  Select a (S0): {valA_scaled ? "1 (Selects I1)" : "0 (Selects I0)"}
                </button>

                <button
                  onClick={() => setValB_scaled(!valB_scaled)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg border font-bold transition",
                    valB_scaled ? "bg-purple-500/20 text-purple-300 border-purple-500/50" : "bg-slate-950 text-slate-400 border-slate-700"
                  )}
                >
                  Variable b: {valB_scaled ? "1" : "0"}
                </button>

                <button
                  onClick={() => setValC_scaled(!valC_scaled)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg border font-bold transition",
                    valC_scaled ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50" : "bg-slate-950 text-slate-400 border-slate-700"
                  )}
                >
                  Variable c: {valC_scaled ? "1 (c'=0)" : "0 (c'=1)"}
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-slate-400 text-xs">Output F:</span>
                  <span className={clsx(
                    "px-4 py-1.5 rounded-lg font-bold text-sm border",
                    outputF_scaled === 1
                      ? "bg-emerald-950 text-emerald-400 border-emerald-500/50"
                      : "bg-slate-950 text-slate-500 border-slate-800"
                  )}>
                    F = {outputF_scaled}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: MUX APPLICATIONS (BUS & SERIALIZER) */}
      {/* ==================================================================== */}
      {activeTab === "applications" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Practical Applications of Multiplexers (Textbook Section 2.3.4C)</h2>
              <p className="text-xs text-slate-400">Bus word routing, parallel-to-serial conversion, and two-level universal logic</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            {/* APPLICATION 1: BUS ROUTING */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-2.5">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider text-[11px]">
                  Application 1 (Textbook Fig 2.27)
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  Bus Word Routing Between CPU Registers
                </h3>
              </div>

              <p className="text-slate-300 leading-relaxed">
                In microprocessor architectures, a <strong>bus</strong> is a shared set of wires accepting data from several sources and routing the selected data word to a destination register. A multiplexer acts as the central electronic switch:
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono">
                <div className="text-indigo-300 font-bold">Select Line Coding:</div>
                <div className="grid grid-cols-2 gap-1.5 text-slate-300 text-[11px]">
                  <div>S1S0 = 00 &#8594; Routes <strong className="text-white">Register A</strong></div>
                  <div>S1S0 = 01 &#8594; Routes <strong className="text-white">Register B</strong></div>
                  <div>S1S0 = 10 &#8594; Routes <strong className="text-white">Register C</strong></div>
                  <div>S1S0 = 11 &#8594; Routes <strong className="text-rose-400">All Zeros (Clear)</strong></div>
                </div>
                <div className="text-[11px] text-emerald-400 pt-1 border-t border-slate-800">
                  Target Destination: Transferred into Register D on clock pulse.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-center">
                <svg viewBox="0 0 320 180" className="w-full max-w-xs h-auto font-mono text-[10px] select-none">
                  {/* Registers */}
                  <rect x="15" y="15" width="80" height="25" rx="4" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="55" y="32" fill="#c7d2fe" textAnchor="middle">Register A</text>

                  <rect x="15" y="50" width="80" height="25" rx="4" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="55" y="67" fill="#c7d2fe" textAnchor="middle">Register B</text>

                  <rect x="15" y="85" width="80" height="25" rx="4" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="55" y="102" fill="#c7d2fe" textAnchor="middle">Register C</text>

                  <rect x="15" y="120" width="80" height="25" rx="4" fill="#1e293b" stroke="#64748b" />
                  <text x="55" y="137" fill="#94a3b8" textAnchor="middle">All zeros</text>

                  {/* Wires */}
                  <line x1="95" y1="27" x2="140" y2="27" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="95" y1="62" x2="140" y2="62" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="95" y1="97" x2="140" y2="97" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="95" y1="132" x2="140" y2="132" stroke="#94a3b8" strokeWidth="1.5" />

                  {/* MUX Box */}
                  <polygon points="140,15 200,35 200,125 140,145" fill="#0f172a" stroke="#ec4899" strokeWidth="2" />
                  <text x="168" y="85" fill="#f472b6" fontWeight="bold" textAnchor="middle" fontSize="11">MUX</text>

                  {/* Select lines */}
                  <line x1="160" y1="165" x2="160" y2="140" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="160" y="176" fill="#06b6d4" textAnchor="middle">S1</text>
                  <line x1="180" y1="165" x2="180" y2="132" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="180" y="176" fill="#06b6d4" textAnchor="middle">S0</text>

                  {/* Destination */}
                  <line x1="200" y1="80" x2="235" y2="80" stroke="#10b981" strokeWidth="2" />
                  <polygon points="235,76 242,80 235,84" fill="#10b981" />
                  <rect x="242" y="67" width="70" height="26" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="277" y="84" fill="#a7f3d0" textAnchor="middle" fontWeight="bold">Register D</text>
                </svg>
              </div>
            </div>

            {/* APPLICATION 2: PARALLEL TO SERIAL CONVERSION */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-2.5">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
                  Application 2 (Textbook Fig 2.28)
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  Parallel-to-Serial Data Conversion (Data Serializer)
                </h3>
              </div>

              <p className="text-slate-300 leading-relaxed">
                In digital telecommunication (e.g. UART transmitters), an $n$-bit parallel byte from memory is converted into a sequential bitstream along a single communication cable. An 8-to-1 MUX driven by a 3-bit binary counter transmits bits $a, b, c, d, e, f, g, h$ sequentially in synchrony with clock pulses.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="text-cyan-300 font-bold">Counter Clock Cycling:</div>
                <div className="text-slate-300">
                  Clock pulse 0 &#8594; S2 S1 S0 = 000 &#8594; Transmits <strong className="text-emerald-400">Bit a</strong>
                </div>
                <div className="text-slate-300">
                  Clock pulse 1 &#8594; S2 S1 S0 = 001 &#8594; Transmits <strong className="text-emerald-400">Bit b</strong>
                </div>
                <div className="text-slate-300">
                  Clock pulse 2 &#8594; S2 S1 S0 = 010 &#8594; Transmits <strong className="text-emerald-400">Bit c</strong> ...
                </div>
                <div className="text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                  Sequence can transmit forward (abcdefg) or reverse (gfedcba) by choosing an up-counter or down-counter!
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-center">
                <svg viewBox="0 0 320 180" className="w-full max-w-xs h-auto font-mono text-[10px] select-none">
                  {/* Parallel inputs a-g */}
                  {["a", "b", "c", "d", "e", "f", "g"].map((letter, idx) => (
                    <g key={letter}>
                      <text x="25" y={25 + idx * 18} fill="#38bdf8" fontWeight="bold">{letter}</text>
                      <line x1="38" y1={21 + idx * 18} x2="130" y2={21 + idx * 18} stroke="#94a3b8" strokeWidth="1.2" />
                    </g>
                  ))}

                  {/* Trapezoid MUX */}
                  <polygon points="130,10 205,35 205,125 130,150" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                  <text x="165" y="85" fill="#67e8f9" fontWeight="bold" textAnchor="middle" fontSize="11">Multiplexer</text>

                  {/* Selection lines */}
                  <line x1="155" y1="165" x2="155" y2="142" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="155" y="175" fill="#f59e0b" textAnchor="middle">S2</text>
                  <line x1="170" y1="165" x2="170" y2="136" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="170" y="175" fill="#f59e0b" textAnchor="middle">S1</text>
                  <line x1="185" y1="165" x2="185" y2="130" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="185" y="175" fill="#f59e0b" textAnchor="middle">S0</text>

                  {/* Serial output */}
                  <line x1="205" y1="80" x2="270" y2="80" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="270,76 278,80 270,84" fill="#10b981" />
                  <text x="285" y="84" fill="#10b981" fontWeight="bold" fontSize="11">Serial Out</text>
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* TAB 6: INTERACTIVE MUX SYNTHESIZER */}
      {/* ==================================================================== */}
      {activeTab === "simulator" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">06</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 3-Variable MUX Function Synthesizer</h2>
              <p className="text-xs text-slate-400">Click minterm buttons to dynamically recalculate the Implementation Table and test live logic states</p>
            </div>
          </div>

          {/* PRESET PICKER */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Load Preset:</span>
            {[
              { id: "ex1", label: "Example 1: Σ(1,3,5,6)" },
              { id: "sum", label: "Full Adder Sum: Σ(1,2,4,7)" },
              { id: "carry", label: "Full Adder Carry: Σ(3,5,6,7)" },
              { id: "ex3", label: "Example 3: Σ(0,2,4,6,7)" }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition border",
                  selectedPreset === p.id
                    ? "bg-indigo-600 text-white border-indigo-400"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* MINTERM TOGGLES */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-400 uppercase tracking-wider">Active Function Minterms:</span>
              <span className="font-mono text-emerald-400">F(x, y, z) = &Sigma;({minterms3Var.join(", ")})</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono text-xs">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((m) => {
                const isActive = minterms3Var.includes(m);
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
                    <span className="text-[10px] font-normal">{isActive ? "Active (1)" : "0"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC IMPLEMENTATION TABLE */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Live Calculated Implementation Table (x Singled Out, S1=y, S0=z)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-left text-amber-400">Row Literal</th>
                    <th className="p-3 text-cyan-300 font-bold">I0 (y&apos;z&apos;)</th>
                    <th className="p-3 text-cyan-300 font-bold">I1 (y&apos;z)</th>
                    <th className="p-3 text-cyan-300 font-bold">I2 (yz&apos;)</th>
                    <th className="p-3 text-cyan-300 font-bold">I3 (yz)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-2.5 text-left font-bold text-indigo-400">x&apos; (x=0)</td>
                    {[0, 1, 2, 3].map((m) => {
                      const isCircled = minterms3Var.includes(m);
                      return (
                        <td key={m} className={clsx("p-2.5", isCircled && "bg-emerald-950/40 text-emerald-300 font-bold")}>
                          {isCircled ? `m${m} (Circled)` : `m${m}`}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="p-2.5 text-left font-bold text-indigo-400">x (x=1)</td>
                    {[4, 5, 6, 7].map((m) => {
                      const isCircled = minterms3Var.includes(m);
                      return (
                        <td key={m} className={clsx("p-2.5", isCircled && "bg-emerald-950/40 text-emerald-300 font-bold")}>
                          {isCircled ? `m${m} (Circled)` : `m${m}`}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="bg-slate-900/90 font-bold text-emerald-400">
                    <td className="p-2.5 text-left text-amber-400">Input Applied:</td>
                    <td className="p-2.5">{colI0.val}</td>
                    <td className="p-2.5">{colI1.val}</td>
                    <td className="p-2.5">{colI2.val}</td>
                    <td className="p-2.5">{colI3.val}</td>
                  </tr>
                  <tr className="text-[11px] text-slate-400">
                    <td className="p-2 text-left text-slate-500">CISCE Rule:</td>
                    <td className="p-2">{colI0.rule}</td>
                    <td className="p-2">{colI1.rule}</td>
                    <td className="p-2">{colI2.rule}</td>
                    <td className="p-2">{colI3.rule}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* LIVE SIMULATOR SIGNAL TOGGLES */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} /> Test Live Input Signals on 4:1 Multiplexer
              </span>
              <span className="font-mono text-slate-400">Current Input Address: {valX ? "1" : "0"}{valY ? "1" : "0"}{valZ ? "1" : "0"} = m{currentMinterm3}</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono">
              <button
                onClick={() => setValX(!valX)}
                className={clsx(
                  "p-3 rounded-lg border font-bold flex items-center justify-between transition",
                  valX ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/50" : "bg-slate-900 text-slate-400 border-slate-800"
                )}
              >
                <span>Data Literal x:</span>
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
                <div className="text-xs text-slate-400 font-mono">MUX Output Function F:</div>
                <div className="text-sm font-bold text-slate-200">
                  Select address S1S0 = {valY ? "1" : "0"}{valZ ? "1" : "0"} routes input I{(valY ? 2 : 0) + (valZ ? 1 : 0)}
                </div>
              </div>
              <div className={clsx(
                "px-5 py-2 rounded-xl text-xl font-extrabold font-mono border transition-all",
                outputF3 === 1
                  ? "bg-emerald-950 text-emerald-400 border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                  : "bg-slate-950 text-slate-600 border-slate-800"
              )}>
                F = {outputF3}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* TAB 7: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
      {/* ==================================================================== */}
      {activeTab === "faqs" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* ==================================================================== */}
      {/* SECTION: 15 ESSENTIAL FAQS (ACCORDION AT BOTTOM OF EVERY TAB) */}
      {/* ==================================================================== */}
      {activeTab !== "faqs" && (
        <section className="pt-6 border-t border-slate-800">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* ==================================================================== */}
      {/* TEACHER SUKANTA HUI MENTOR NOTE */}
      {/* ==================================================================== */}
      <Teacher
        topicId="topic-36-mux-function-implementation"
        headline="Mastering MUX Function Synthesis for ISC Class 12 Boards"
        note="Whenever an ISC examiner asks you to 'Implement F using a Multiplexer', the Implementation Table is where you win all 4 or 5 marks! Remember the CISCE golden rule: always single out the leftmost variable unless explicitly instructed otherwise. If you have 3 variables (x, y, z), single out x and use y, z as select lines. Write down the 2 rows (x' for minterms 0-3, x for minterms 4-7), circle the given minterms, and apply the four rules: neither circled is 0, both circled is 1, bottom is x, top is x'. If you get a question on Scaled-Down Multiplexers (like a 2:1 MUX for 3 variables), use Boolean factoring: expand with (a + a') and group terms until you find the exact input expressions. Master this technique and you have guaranteed full marks in Section A!"
      />
    </div>
  );
};

export default Topic36;

