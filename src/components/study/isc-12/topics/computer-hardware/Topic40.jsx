import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table, ArrowRight, Layers, Split } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import { faqs } from "./faqs/topic40_faqs";

const Topic40 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Interactive Live Signals for F(a, b, c) = ab + b'c' + c'a'
  const [sigA, setSigA] = useState(false);
  const [sigB, setSigB] = useState(false);
  const [sigC, setSigC] = useState(false);

  // Sub-circuit derivations:
  // c' = NOT(c)
  const cBar = !sigC;
  // I0 = c'
  const inputI0 = cBar;
  // I1 = b + c'
  const inputI1 = sigB || cBar;
  // S0 = a
  // MUX Output: if a == 0 -> I0, if a == 1 -> I1
  const muxOutput = sigA ? inputI1 : inputI0;

  // Algebraic direct check: F = ab + b'c' + c'a'
  const directF = (sigA && sigB) || (!sigB && !sigC) || (!sigC && !sigA);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 40
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Section 2.3.4B
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Scaled-Down Multiplexing
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Realizing 3-Variable Logic using a Scaled-Down $2 \times 1$ Multiplexer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Textbook Section 2.3.4B (Pages 109–110): Implementing $F(a, b, c) = ab + b&apos;c&apos; + c&apos;a&apos;$ on a $2 \times 1$ MUX via Boolean factoring and Shannon&apos;s expansion with external logic gates.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "truthTable", label: "1. Circuit Schematic & Truth Table" },
              { id: "theory", label: "2. Scaled-Down MUX Theory" },
              { id: "factoring", label: "3. Step-by-Step Factoring Derivation" },
              { id: "interactive", label: "4. Interactive Scaled MUX Simulator" },
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

      {/* TAB 1: CIRCUIT & TRUTH TABLE */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Textbook Fig 2.26: Scaled-Down $2 \times 1$ MUX Realization</h2>
              <p className="text-xs text-slate-400">Complete schematic diagram with external NOT and OR gates realizing $F(a, b, c) = ab + b&apos;c&apos; + c&apos;a&apos;$</p>
            </div>
          </div>

          {/* SVG SCHEMATIC FIG 2.26 */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-indigo-900/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <span className="font-bold text-sm text-indigo-400">Hardware Schematic (Textbook Fig 2.26)</span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                1 × $2:1$ MUX + 1 × NOT Gate + 1 × OR Gate
              </span>
            </div>

            <div className="w-full bg-slate-900/90 rounded-lg p-4 flex justify-center items-center border border-slate-800">
              <svg viewBox="0 0 540 260" className="w-full max-w-xl h-auto font-mono text-[11px]">
                {/* Inputs b and c */}
                <text x="25" y="70" fill="#38bdf8" fontWeight="bold" fontSize="13">b</text>
                <text x="25" y="145" fill="#34d399" fontWeight="bold" fontSize="13">c</text>

                {/* NOT Gate on c */}
                <line x1="45" y1="140" x2="85" y2="140" stroke="#34d399" strokeWidth="2" />
                <polygon points="85,130 115,140 85,150" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
                <circle cx="118" cy="140" r="3" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
                <text x="126" y="134" fill="#a7f3d0" fontSize="10">c&apos;</text>

                {/* Wire c' branching: one to I0, one to OR gate */}
                <line x1="121" y1="140" x2="160" y2="140" stroke="#a7f3d0" strokeWidth="2" />
                <circle cx="160" cy="140" r="3" fill="#a7f3d0" />

                {/* Wire from c' straight to I0 (top of MUX) */}
                <path d="M 160 140 L 160 100 L 320 100" fill="none" stroke="#a7f3d0" strokeWidth="2" />

                {/* Wire b to OR Gate */}
                <line x1="45" y1="65" x2="200" y2="65" stroke="#38bdf8" strokeWidth="2" />

                {/* Wire c' to OR Gate */}
                <path d="M 160 140 L 160 85 L 200 85" fill="none" stroke="#a7f3d0" strokeWidth="2" />

                {/* 2-Input OR Gate (b + c') */}
                <path
                  d="M 200 55 Q 215 75 200 95 Q 230 95 245 75 Q 230 55 200 55 Z"
                  fill="#1e293b"
                  stroke="#818cf8"
                  strokeWidth="2"
                />
                <text x="212" y="79" fill="#c7d2fe" fontSize="10">OR</text>

                {/* OR Gate Output (b + c') to I1 */}
                <line x1="245" y1="75" x2="280" y2="75" stroke="#818cf8" strokeWidth="2" />
                <path d="M 280 75 L 280 140 L 320 140" fill="none" stroke="#818cf8" strokeWidth="2" />
                <text x="245" y="65" fill="#a5b4fc" fontSize="9">b + c&apos;</text>

                {/* 2 to 1 MUX Box */}
                <polygon
                  points="320,60 410,75 410,165 320,180"
                  fill="#1e1b4b"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
                <text x="365" y="115" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="12">2 × 1</text>
                <text x="365" y="130" fill="#a5b4fc" fontWeight="bold" textAnchor="middle" fontSize="11">MUX</text>

                {/* MUX Pin Labels */}
                <text x="330" y="104" fill="#94a3b8" fontSize="10">I₀</text>
                <text x="330" y="144" fill="#94a3b8" fontSize="10">I₁</text>

                {/* Select Line a (S0) */}
                <line x1="365" y1="230" x2="365" y2="173" stroke="#f59e0b" strokeWidth="2" />
                <text x="365" y="245" fill="#fbbf24" textAnchor="middle" fontWeight="bold" fontSize="12">S₀ = a</text>

                {/* Output F */}
                <line x1="410" y1="120" x2="490" y2="120" stroke="#ec4899" strokeWidth="2.5" />
                <circle cx="490" cy="120" r="3.5" fill="#ec4899" />
                <text x="500" y="125" fill="#f472b6" fontWeight="bold" fontSize="14">F</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-1">When Select Line $a = 0$ ($a&apos;$ active):</span>
                <span className="text-slate-300">
                  Input $I_0$ is routed to output $F$. Since $I_0 = c&apos;$, output $F = c&apos;$.
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-indigo-400 block mb-1">When Select Line $a = 1$ ($a$ active):</span>
                <span className="text-slate-300">
                  Input $I_1$ is routed to output $F$. Since $I_1 = b + c&apos;$, output $F = b + c&apos;$.
                </span>
              </div>
            </div>
          </div>

          {/* TRUTH TABLE WITH SUB-FUNCTION TRACE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Table size={16} className="text-cyan-400" />
              Complete Truth Table &amp; Sub-Function Tracking for $F(a, b, c) = ab + b&apos;c&apos; + c&apos;a&apos;$
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Minterm</th>
                    <th className="py-2.5 px-2 text-center text-amber-300 font-bold">a (S₀)</th>
                    <th className="py-2.5 px-2 text-center text-indigo-300 font-bold">b</th>
                    <th className="py-2.5 px-2 text-center text-cyan-300 font-bold">c</th>
                    <th className="py-2.5 px-3 text-center text-slate-400 font-mono">c&apos; (NOT)</th>
                    <th className="py-2.5 px-3 text-center text-indigo-300 font-mono">I₀ = c&apos;</th>
                    <th className="py-2.5 px-3 text-center text-cyan-300 font-mono">I₁ = b + c&apos;</th>
                    <th className="py-2.5 px-3 text-center bg-slate-900 font-bold text-emerald-300">F (Output)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {[
                    { m: "m₀ (000)", a: 0, b: 0, c: 0, cBar: 1, i0: 1, i1: 1, f: 1, route: "I₀ routed (a=0)" },
                    { m: "m₁ (001)", a: 0, b: 0, c: 1, cBar: 0, i0: 0, i1: 0, f: 0, route: "I₀ routed (a=0)" },
                    { m: "m₂ (010)", a: 0, b: 1, c: 0, cBar: 1, i0: 1, i1: 1, f: 1, route: "I₀ routed (a=0)" },
                    { m: "m₃ (011)", a: 0, b: 1, c: 1, cBar: 0, i0: 0, i1: 1, f: 0, route: "I₀ routed (a=0)" },
                    { m: "m₄ (100)", a: 1, b: 0, c: 0, cBar: 1, i0: 1, i1: 1, f: 1, route: "I₁ routed (a=1)" },
                    { m: "m₅ (101)", a: 1, b: 0, c: 1, cBar: 0, i0: 0, i1: 0, f: 0, route: "I₁ routed (a=1)" },
                    { m: "m₆ (110)", a: 1, b: 1, c: 0, cBar: 1, i0: 1, i1: 1, f: 1, route: "I₁ routed (a=1)" },
                    { m: "m₇ (111)", a: 1, b: 1, c: 1, cBar: 0, i0: 0, i1: 1, f: 1, route: "I₁ routed (a=1)" }
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className={clsx(
                        "hover:bg-slate-800/50 transition-colors",
                        row.f === 1 ? "bg-indigo-950/20" : "bg-slate-900/20"
                      )}
                    >
                      <td className="py-2 px-3 font-semibold text-slate-300">{row.m}</td>
                      <td className="py-2 px-2 text-center text-amber-300 font-bold">{row.a}</td>
                      <td className="py-2 px-2 text-center text-indigo-300">{row.b}</td>
                      <td className="py-2 px-2 text-center text-cyan-300">{row.c}</td>
                      <td className="py-2 px-3 text-center text-slate-400">{row.cBar}</td>
                      <td className={clsx("py-2 px-3 text-center", row.a === 0 ? "font-bold text-amber-300 bg-amber-950/30" : "text-slate-500")}>
                        {row.i0}
                      </td>
                      <td className={clsx("py-2 px-3 text-center", row.a === 1 ? "font-bold text-amber-300 bg-amber-950/30" : "text-slate-500")}>
                        {row.i1}
                      </td>
                      <td className="py-2 px-3 text-center bg-slate-900/60 font-bold">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px]",
                            row.f === 1
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          )}
                        >
                          {row.f}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Scaled-Down Multiplexing &amp; Shannon&apos;s Expansion</h2>
              <p className="text-xs text-slate-400">Section 2.3.4B architectural principles and gate-multiplexer trade-offs</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-3 text-xs">
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Zap size={14} className="text-indigo-400" />
              What is a Scaled-Down Multiplexer?
            </span>
            <p className="text-slate-200">
              In standard multiplexer implementation (Section 2.3.4A), an $n$-variable Boolean function is implemented with a $2^{"{n-1}"} \times 1$ multiplexer where $n-1$ variables drive the select lines, and each data input receives a simple single literal ($0, 1, X$, or $X&apos;$).
            </p>
            <p className="text-slate-300">
              However, when cost, pin count, or board space prohibits using a large MUX, we can use a <strong>scaled-down multiplexer</strong> (e.g., using a $2 \times 1$ MUX with only 1 select line for a 3-variable function).
            </p>
            <p className="text-slate-400">
              Because fewer selection lines are available, the data inputs must receive <strong>sub-functions of the remaining variables</strong> realized using external logic gates (such as AND, OR, and NOT gates).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-cyan-400 text-sm">Shannon&apos;s Expansion Theorem</h3>
            <p className="text-slate-300 leading-relaxed">
              Any Boolean function $F(x_1, x_2, \dots, x_n)$ can be decomposed around any variable $x_1$ into two sub-functions:
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-center text-sm text-amber-300">
              F(x₁, x₂, ..., xₙ) = x₁&apos; · F(0, x₂, ..., xₙ) + x₁ · F(1, x₂, ..., xₙ)
            </div>
            <p className="text-slate-400">
              Comparing this directly to the $2 \times 1$ multiplexer equation $F = S_0&apos; \cdot I_0 + S_0 \cdot I_1$, we see that:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>Selection Line $S_0 = x_1$</li>
              <li>Input $I_0 = F(0, x_2, \dots, x_n)$ (the sub-function when $x_1 = 0$)</li>
              <li>Input $I_1 = F(1, x_2, \dots, x_n)$ (the sub-function when $x_1 = 1$)</li>
            </ul>
          </div>
        </section>
      )}

      {/* TAB 3: STEP-BY-STEP FACTORING */}
      {activeTab === "factoring" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Step-by-Step Algebraic Factoring Derivation</h2>
              <p className="text-xs text-slate-400">Exact mathematical proof from textbook page 109 for $F(a, b, c) = ab + b&apos;c&apos; + c&apos;a&apos;$</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* STEP 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-indigo-400 font-bold font-sans">
                <span>Step 1: Inspect the Given Expression &amp; Select Variable &lsquo;a&rsquo;</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20">Initial State</span>
              </div>
              <p className="text-slate-300 font-sans">
                Given function: $F(a, b, c) = ab + b&apos;c&apos; + c&apos;a&apos;$. We choose variable $a$ for selection line $S_0$.
              </p>
              <div className="p-2.5 rounded bg-slate-900 text-slate-200">
                F = a&apos; · I₀ + a · I₁
              </div>
            </div>

            {/* STEP 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-cyan-400 font-bold font-sans">
                <span>Step 2: Expand Missing Variable &lsquo;a&rsquo; into the Middle Term</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20">Boolean Identity</span>
              </div>
              <p className="text-slate-300 font-sans">
                Notice that the term $b&apos;c&apos;$ does not contain variable $a$. By the Boolean identity $(a + a&apos;) = 1$:
              </p>
              <div className="p-2.5 rounded bg-slate-900 text-cyan-300">
                b&apos;c&apos; = (a + a&apos;) · b&apos;c&apos; = a · b&apos;c&apos; + a&apos; · b&apos;c&apos;
              </div>
              <p className="text-slate-300 font-sans">
                Substitute this back into the original expression:
              </p>
              <div className="p-2.5 rounded bg-slate-900 text-slate-200">
                F = ab + (a · b&apos;c&apos; + a&apos; · b&apos;c&apos;) + a&apos;c&apos;
              </div>
            </div>

            {/* STEP 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold font-sans">
                <span>Step 3: Factor out &lsquo;a&rsquo; and &lsquo;a&apos;&rsquo;</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20">Grouping</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 text-emerald-300">
                F = a(b + b&apos;c&apos;) + a&apos;(b&apos;c&apos; + c&apos;)
              </div>
              <p className="text-slate-300 font-sans">
                Apply Boolean absorption and consensus reduction laws:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 font-sans pl-2">
                <li>By Rule of Absorption: <strong className="text-white">$b + b&apos;c&apos; = b + c&apos;$</strong></li>
                <li>By Consensus / Distributive extraction: <strong className="text-white">$b&apos;c&apos; + c&apos; = c&apos;(b&apos; + 1) = c&apos; \cdot 1 = c&apos;$</strong></li>
              </ul>
              <p className="text-slate-300 font-sans">
                Substituting these simplifications yields the factored form:
              </p>
              <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 font-bold text-sm">
                F = a(b + c&apos;) + a&apos;(c&apos;)
              </div>
            </div>

            {/* STEP 4 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-bold font-sans">
                <span>Step 4: Map Sub-Functions to Multiplexer Pins</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20">Final Hardware Assignment</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans pt-1">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center">
                  <span className="text-slate-400 text-[11px] block">Select Line</span>
                  <span className="font-bold text-amber-400 text-sm">S₀ = a</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center">
                  <span className="text-slate-400 text-[11px] block">Input I₀ (a = 0)</span>
                  <span className="font-bold text-cyan-400 text-sm">I₀ = c&apos;</span>
                  <span className="text-[10px] text-slate-500 block">1 NOT Gate</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center">
                  <span className="text-slate-400 text-[11px] block">Input I₁ (a = 1)</span>
                  <span className="font-bold text-emerald-400 text-sm">I₁ = b + c&apos;</span>
                  <span className="text-[10px] text-slate-500 block">1 OR Gate</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Scaled-Down $2 \times 1$ MUX Simulator</h2>
              <p className="text-xs text-slate-400">Toggle input signals to probe sub-circuits, MUX pin states, and final function output</p>
            </div>
          </div>

          {/* INPUT SWITCHES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "a", name: "Select Line (S₀ = a)", val: sigA, set: setSigA, color: "amber" },
              { id: "b", name: "Input Literal (b)", val: sigB, set: setSigB, color: "indigo" },
              { id: "c", name: "Input Literal (c)", val: sigC, set: setSigC, color: "cyan" }
            ].map((pin) => (
              <div
                key={pin.id}
                onClick={() => pin.set(!pin.val)}
                className={clsx(
                  "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                  pin.val
                    ? `bg-${pin.color}-950/40 border-${pin.color}-500/50 shadow-lg shadow-${pin.color}-500/10`
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                )}
              >
                <div>
                  <span className="text-xs text-slate-400 font-mono">Pin {pin.id.toUpperCase()}</span>
                  <div className="text-sm font-bold text-white">{pin.name}</div>
                </div>
                <div
                  className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                    pin.val
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-slate-800 text-slate-400"
                  )}
                >
                  {pin.val ? "1" : "0"}
                </div>
              </div>
            ))}
          </div>

          {/* CIRCUIT SIGNAL PROBER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">Live Internal Stage Probes</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                {/* PROBE 1: NOT GATE */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] block font-sans">NOT Gate (c &rarr; c&apos;)</span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-300">c&apos; = !({sigC ? 1 : 0})</span>
                    <span className="font-bold text-cyan-400 text-sm">{cBar ? "1" : "0"}</span>
                  </div>
                </div>

                {/* PROBE 2: INPUT I0 */}
                <div className={clsx("p-3 rounded-lg border space-y-1 transition-all", !sigA ? "bg-indigo-950/60 border-indigo-500" : "bg-slate-900 border-slate-800 opacity-60")}>
                  <span className="text-slate-400 text-[11px] block font-sans">Input I₀ = c&apos;</span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-300">I₀ value</span>
                    <span className="font-bold text-white text-sm">{inputI0 ? "1" : "0"}</span>
                  </div>
                  <div className="text-[10px] text-amber-400 font-sans font-semibold">
                    {!sigA ? "★ SELECTED (a=0)" : "Disabled"}
                  </div>
                </div>

                {/* PROBE 3: INPUT I1 */}
                <div className={clsx("p-3 rounded-lg border space-y-1 transition-all", sigA ? "bg-indigo-950/60 border-indigo-500" : "bg-slate-900 border-slate-800 opacity-60")}>
                  <span className="text-slate-400 text-[11px] block font-sans">Input I₁ = b + c&apos;</span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-300">{sigB ? 1 : 0} OR {cBar ? 1 : 0}</span>
                    <span className="font-bold text-white text-sm">{inputI1 ? "1" : "0"}</span>
                  </div>
                  <div className="text-[10px] text-amber-400 font-sans font-semibold">
                    {sigA ? "★ SELECTED (a=1)" : "Disabled"}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Active Routing Path:</span>
                  <span className="font-mono text-amber-300">
                    S₀ = a = {sigA ? 1 : 0} &rarr; MUX selects Pin I{sigA ? 1 : 0}
                  </span>
                </div>
                <div className="text-slate-400">
                  Direct Boolean evaluation $F = ab + b&apos;c&apos; + c&apos;a&apos; = $
                  <span className="font-bold text-emerald-400 font-mono ml-1">{directF ? "1" : "0"}</span>
                  {" "}(matches MUX output <span className="font-bold text-emerald-400 font-mono">{muxOutput ? "1" : "0"}</span> 100%).
                </div>
              </div>
            </div>

            {/* LIVE OUTPUT DISPLAY */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between items-center text-center space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Circuit Output</span>
                <div className="text-sm font-bold text-slate-300 mt-1">F = a(b + c&apos;) + a&apos;c&apos;</div>
              </div>

              <div
                className={clsx(
                  "w-24 h-24 rounded-2xl flex items-center justify-center font-extrabold text-4xl border transition-all",
                  muxOutput
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-xl shadow-emerald-500/20"
                    : "bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-xl shadow-rose-500/20"
                )}
              >
                {muxOutput ? "1" : "0"}
              </div>

              <div className="text-xs text-slate-400">
                Minterm:{" "}
                <span className="font-mono font-bold text-white">
                  m{(sigA ? 4 : 0) + (sigB ? 2 : 0) + (sigC ? 1 : 0)}
                </span>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                  {muxOutput ? "Logic High (1)" : "Logic Low (0)"}
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus &amp; Step Marking Breakdown</h2>
              <p className="text-xs text-slate-400">How to score maximum marks on scaled-down multiplexer questions (Section 2.3.4B)</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">Key Evaluation Checkpoints</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">Show Factoring Steps:</strong> Never skip algebraic factorization! Write $(a + a&apos;)b&apos;c&apos;$ and show grouping by $a$ and $a&apos;$. Evaluators award 2 marks purely for this algebraic reduction.</li>
                <li><strong className="text-white">State Multiplexer Equation:</strong> State the canonical $2 \times 1$ MUX formula: $F = S_0&apos; I_0 + S_0 I_1$.</li>
                <li><strong className="text-white">Pin Correspondence:</strong> Clearly declare: $S_0 = a$, $I_0 = c&apos;$, $I_1 = b + c&apos;$.</li>
                <li><strong className="text-white">Draw External Gates Accurately:</strong> Remember to draw the inverter on input line $c$, and the 2-input OR gate receiving inputs $b$ and $c&apos;$ feeding into $I_1$.</li>
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
        topicId="topic-40-scaled-down-mux"
        headline="Sukanta Hui's Blueprint for Scaled-Down Multiplexers"
        note="Section 2.3.4B of the ISC textbook teaches a profound hardware design technique: Scaled-Down Multiplexing! While a standard 3-variable function normally calls for a 4:1 MUX, here we use only a 2:1 MUX. Notice how Shannon's decomposition breaks F into a'(c') + a(b + c'). The single select line S0=a chooses between sub-function c' at I0 and (b + c') at I1. Always show the algebraic factoring steps clearly in your answer sheet to score full 5 marks!"
      />
    </div>
  );
};

export default Topic40;
