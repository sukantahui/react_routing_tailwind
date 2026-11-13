import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic0_faqs";

const Topic0 = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCircuit, setSelectedCircuit] = useState("combinational");

  // Interactive Circuit Simulator State
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  // Combinational outputs (Half Adder simulation)
  const sumOut = (inputA ? 1 : 0) ^ (inputB ? 1 : 0);
  const carryOut = inputA && inputB ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HERO HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Computer Hardware
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Topic 0 (Introduction)
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Introduction to Combinational Logic Circuits
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Understand the foundational digital architecture where outputs are purely mathematical functions of present inputs without memory. Discover the core building blocks mandated in ISC Class 12: <span className="text-cyan-400 font-semibold">Adders</span>, <span className="text-indigo-400 font-semibold">Encoders</span>, <span className="text-purple-400 font-semibold">Decoders</span>, <span className="text-emerald-400 font-semibold">Multiplexers (MUX)</span>, and <span className="text-amber-400 font-semibold">Demultiplexers (DEMUX)</span>.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "overview", label: "1. Core Concept & Definition" },
              { id: "comparison", label: "2. Combinational vs Sequential" },
              { id: "blocks", label: "3. The 4 ISC Building Blocks" },
              { id: "interactive", label: "4. Interactive Logic Gate Sandbox" },
              { id: "faqs", label: "5. 15 Essential FAQs" }
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

      {/* SECTION 1: CORE DEFINITION */}
      {activeTab === "overview" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
              01
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                What is a Combinational Circuit?
              </h2>
              <p className="text-xs text-slate-400">
                Official CISCE ISC Class 12 Definition &amp; Axiomatic Characteristics
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Official ISC Definition
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              A <strong className="text-white">Combinational Logic Circuit</strong> is a connected network of logic gates whose output at any given instant of time depends <em>solely and exclusively</em> on the combination of input signals present at that exact moment. It contains <strong className="text-rose-400">no memory elements</strong> (no flip-flops, no registers, no feedback loops) to store past states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-400 text-sm">1. Zero Memory</div>
              <p className="text-slate-400 leading-relaxed">
                The past history or prior inputs do not influence the current output. If inputs change, the outputs change almost instantaneously (delayed only by gate propagation delay).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400 text-sm">2. Truth Table Driven</div>
              <p className="text-slate-400 leading-relaxed">
                Every combinational circuit with $n$ inputs has exactly $2^n$ distinct input states. The entire behavior is fully described by a standard mathematical truth table.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400 text-sm">3. Universal Gate Realization</div>
              <p className="text-slate-400 leading-relaxed">
                Any combinational circuit can be designed entirely using Universal Gates (NAND or NOR), reducing manufacturing complexity and chip footprint.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: COMBINATIONAL VS SEQUENTIAL */}
      {activeTab === "comparison" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
              02
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Combinational vs Sequential Circuits
              </h2>
              <p className="text-xs text-slate-400">
                A critical distinction tested every year in ISC Class 12 Theory Paper (Section A)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Comparison Parameter</th>
                  <th className="p-3.5 text-cyan-400">Combinational Circuit (Class 12 Syllabus)</th>
                  <th className="p-3.5 text-purple-400">Sequential Circuit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Output Dependence</td>
                  <td className="p-3.5 text-slate-300">Depends solely on present input values at that instant</td>
                  <td className="p-3.5 text-slate-400">Depends on present inputs AND past output states</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Memory Elements</td>
                  <td className="p-3.5 text-slate-300">No memory elements (No storage)</td>
                  <td className="p-3.5 text-slate-400">Contains memory elements (Flip-flops, latches)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Feedback Path</td>
                  <td className="p-3.5 text-slate-300">No feedback path from output to input</td>
                  <td className="p-3.5 text-slate-400">Contains feedback loop from output back into input</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Clock Signal</td>
                  <td className="p-3.5 text-slate-300">No clock required (Asynchronous operation)</td>
                  <td className="p-3.5 text-slate-400">Often requires a clock signal to synchronize transitions</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Design Complexity</td>
                  <td className="p-3.5 text-slate-300">Simpler to design, test, and analyze using K-Maps</td>
                  <td className="p-3.5 text-slate-400">More complex (state diagrams, state tables)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Standard Examples</td>
                  <td className="p-3.5 text-cyan-300 font-mono">Adders, Subtractors, Encoders, Decoders, MUX, DEMUX</td>
                  <td className="p-3.5 text-purple-300 font-mono">Flip-flops, Counters, Shift Registers, RAM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 3: THE 4 ISC BUILDING BLOCKS */}
      {activeTab === "blocks" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
              03
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                The Core Combinational Building Blocks in ISC Class 12
              </h2>
              <p className="text-xs text-slate-400">
                Master the fundamental input-to-output conversion rules and applications
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CARD 1: ENCODER */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-indigo-400">1. Encoder (Code Converter)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
                  2^n Inputs → n Outputs
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compresses multiple active lines into an encoded binary format. Only one input line is active (HIGH) at any moment. Built primarily with <strong className="text-indigo-300">OR gates</strong>.
              </p>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-400">
                Examples: 4-to-2 Binary Encoder, 8-to-3 Octal-to-Binary Encoder, Decimal-to-BCD Encoder.
              </div>
            </div>

            {/* CARD 2: DECODER */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-cyan-400">2. Decoder (Code Expander)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  n Inputs → 2^n Outputs
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reverses the encoder operation. Takes an $n$-bit binary code and activates exactly <em>one</em> corresponding output line (a minterm). Built with <strong className="text-cyan-300">AND/NAND gates</strong> and an Enable ($E$) pin.
              </p>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-400">
                Examples: 2-to-4 Line Decoder, 3-to-8 Line Decoder, Address decoders in RAM.
              </div>
            </div>

            {/* CARD 3: MULTIPLEXER (MUX) */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-400">3. Multiplexer (Data Selector)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                  2^n Inputs + n Select Lines → 1 Output
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Selects one data input out of many and routes it to a single output line based on the binary combination on the selection lines. Acts like a multi-channel digital rotary switch.
              </p>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-400">
                Examples: 2:1, 4:1, 8:1, 16:1 MUX. Used for Boolean function realization and parallel-to-serial conversion.
              </div>
            </div>

            {/* CARD 4: DEMULTIPLEXER (DEMUX) */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-400">4. Demultiplexer (Data Distributor)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
                  1 Input + n Select Lines → 2^n Outputs
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Takes a single serial input line and routes it to one of $2^n$ output lines based on the selection lines. A decoder with an active Enable line acts identically to a demultiplexer!
              </p>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-400">
                Examples: 1:2, 1:4, 1:8 DEMUX. Used for serial-to-parallel conversion and display distribution.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: INTERACTIVE LOGIC GATE SANDBOX */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
              04
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Interactive Half Adder Circuit Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Toggle inputs A and B to observe instantaneous combinational outputs (Sum = A ⊕ B, Carry = A · B)
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 font-bold">Input Controls:</span>
                <button
                  onClick={() => setInputA(!inputA)}
                  className={clsx(
                    "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                    inputA
                      ? "bg-cyan-500 text-black border-cyan-300 shadow-md shadow-cyan-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-700"
                  )}
                >
                  Input A: {inputA ? "1 (HIGH)" : "0 (LOW)"}
                </button>
                <button
                  onClick={() => setInputB(!inputB)}
                  className={clsx(
                    "px-4 py-2 rounded-xl font-mono font-bold transition-all border",
                    inputB
                      ? "bg-purple-500 text-white border-purple-300 shadow-md shadow-purple-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-700"
                  )}
                >
                  Input B: {inputB ? "1 (HIGH)" : "0 (LOW)"}
                </button>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Formula: Sum = A ⊕ B | Carry = A · B
              </div>
            </div>

            {/* Circuit Visualization Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-center">
                <div className="text-xs text-slate-400 uppercase font-mono">Sum Output (XOR Gate)</div>
                <div
                  className={clsx(
                    "text-3xl font-extrabold font-mono py-2 rounded-lg transition-all",
                    sumOut === 1
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-500/50"
                      : "bg-slate-950 text-slate-600 border border-slate-800"
                  )}
                >
                  Sum = {sumOut}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {inputA ? "1" : "0"} ⊕ {inputB ? "1" : "0"} = {sumOut}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-center">
                <div className="text-xs text-slate-400 uppercase font-mono">Carry Output (AND Gate)</div>
                <div
                  className={clsx(
                    "text-3xl font-extrabold font-mono py-2 rounded-lg transition-all",
                    carryOut === 1
                      ? "bg-cyan-950 text-cyan-400 border border-cyan-500/50"
                      : "bg-slate-950 text-slate-600 border border-slate-800"
                  )}
                >
                  Carry = {carryOut}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {inputA ? "1" : "0"} · {inputB ? "1" : "0"} = {carryOut}
                </div>
              </div>
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

{/* TEACHER SUKANTA HUI MENTOR NOTE */}
      <section>
        <Teacher
          note="In ISC Class 12 Computer Science, Computer Hardware is not about PC motherboards or hard drives—it is strictly digital logic engineering! You will be tested on truth tables, algebraic derivations, and drawing gate-level circuits for Encoders, Decoders, Multiplexers, Demultiplexers, and Adders. Always remember the fundamental rules: an Encoder compresses 2^n lines to n lines with OR gates, a Decoder expands n lines to 2^n lines using AND gates, and a Multiplexer uses select lines to funnel multiple data streams into one output. Master these circuits and you secure guaranteed full marks in Section A!"
        />
      </section>
    </div>
  );
};

export default Topic0;

