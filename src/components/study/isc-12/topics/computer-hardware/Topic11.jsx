import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic11_faqs";

const Topic11 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [selectedDigit, setSelectedDigit] = useState(7); // 0-9

  const a = [8, 9].includes(selectedDigit) ? 1 : 0;
  const b = [4, 5, 6, 7].includes(selectedDigit) ? 1 : 0;
  const c = [2, 3, 6, 7].includes(selectedDigit) ? 1 : 0;
  const d = [1, 3, 5, 7, 9].includes(selectedDigit) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 11
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Decimal-to-BCD Encoder: Keypad Logic &amp; Circuit
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Translating 10 Decimal Inputs (0-9) into 4-Bit BCD Binary Code (8421 Weighting) using OR Gates
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Proof" },
              { id: "truthTable", label: "3. Truth Table & Circuit Diagrams" },
              { id: "interactive", label: "4. Interactive Decimal Keypad" },
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Decimal-to-BCD Translation</h2>
              <p className="text-xs text-slate-400">10-input to 4-output BCD (8421) encoder architecture</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              A <strong className="text-cyan-300">Decimal-to-BCD Encoder</strong> has 10 input lines ($D_0$ through $D_9$) corresponding to digits 0 to 9, and 4 binary output lines ($A, B, C, D$) representing the 4-bit Binary-Coded Decimal (8421) code.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              This is the exact circuit used inside calculators, ATMs, and digital weighing scales to convert tactile numeric keypresses into digital data words.
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
              <h2 className="text-lg sm:text-xl font-bold text-white">BCD Boolean Output Equations</h2>
              <p className="text-xs text-slate-400">Equations for 8421 weighted output bits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">A (Weight 8 - MSB)</span>
              A = D8 + D9
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">B (Weight 4)</span>
              B = D4 + D5 + D6 + D7
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">C (Weight 2)</span>
              C = D2 + D3 + D6 + D7
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">D (Weight 1 - LSB)</span>
              D = D1 + D3 + D5 + D7 + D9
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Truth Table &amp; Logic Circuit Schematic</h2>
              <p className="text-xs text-slate-400">Complete 10-row BCD excitation matrix and gate schematic</p>
            </div>
          </div>

          {/* TRUTH TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} /> 1. Decimal-to-BCD Truth Table (Digits 0-9)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <th className="p-2.5 text-cyan-400 border-r border-slate-800">Active Decimal Input</th>
                    <th className="p-2.5 text-indigo-300 border-r border-slate-800">A (8)</th>
                    <th className="p-2.5 text-cyan-300 border-r border-slate-800">B (4)</th>
                    <th className="p-2.5 text-purple-300 border-r border-slate-800">C (2)</th>
                    <th className="p-2.5 text-emerald-300 border-r border-slate-800">D (1)</th>
                    <th className="p-2.5 text-slate-400 text-left pl-4 font-sans">4-Bit BCD Equivalent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {[
                    ["D0 = 1", 0, 0, 0, 0, "0000"],
                    ["D1 = 1", 0, 0, 0, 1, "0001"],
                    ["D2 = 1", 0, 0, 1, 0, "0010"],
                    ["D3 = 1", 0, 0, 1, 1, "0011"],
                    ["D4 = 1", 0, 1, 0, 0, "0100"],
                    ["D5 = 1", 0, 1, 0, 1, "0101"],
                    ["D6 = 1", 0, 1, 1, 0, "0110"],
                    ["D7 = 1", 0, 1, 1, 1, "0111"],
                    ["D8 = 1", 1, 0, 0, 0, "1000"],
                    ["D9 = 1", 1, 0, 0, 1, "1001"]
                  ].map(([line, ra, rb, rc, rd, bcd], i) => (
                    <tr key={i} className="hover:bg-slate-900/60">
                      <td className="p-2 border-r border-slate-800 text-cyan-300 font-bold">{line}</td>
                      <td className="p-2 border-r border-slate-800">{ra}</td>
                      <td className="p-2 border-r border-slate-800">{rb}</td>
                      <td className="p-2 border-r border-slate-800">{rc}</td>
                      <td className="p-2 border-r border-slate-800">{rd}</td>
                      <td className="p-2 text-slate-300 text-left pl-4 font-bold">{bcd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CIRCUIT DIAGRAMS */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} /> 2. Block Diagram &amp; OR Gate Implementation
            </h3>
            <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center">
              <svg viewBox="0 0 780 260" className="w-full max-w-3xl h-auto select-none font-mono text-xs">
                {/* BLOCK DIAGRAM (LEFT) */}
                <g transform="translate(40, 30)">
                  <rect x="0" y="0" width="220" height="200" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <text x="110" y="32" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">DECIMAL-TO-BCD</text>
                  <text x="110" y="50" fill="#64748b" fontSize="10" textAnchor="middle">10 Inputs → 4 Outputs</text>

                  {/* 10 inputs */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <g key={i}>
                      <line x1="-30" y1={65 + i * 13} x2="0" y2={65 + i * 13} stroke="#06b6d4" strokeWidth="1.5" />
                      <text x="-36" y={69 + i * 13} fill="#06b6d4" fontSize="9" textAnchor="end">D{i}</text>
                    </g>
                  ))}

                  {/* 4 outputs */}
                  <line x1="220" y1="80" x2="260" y2="80" stroke="#818cf8" strokeWidth="2.5" />
                  <text x="275" y="84" fill="#818cf8" fontWeight="bold">A (8)</text>

                  <line x1="220" y1="115" x2="260" y2="115" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="275" y="119" fill="#38bdf8" fontWeight="bold">B (4)</text>

                  <line x1="220" y1="150" x2="260" y2="150" stroke="#c084fc" strokeWidth="2.5" />
                  <text x="275" y="154" fill="#c084fc" fontWeight="bold">C (2)</text>

                  <line x1="220" y1="185" x2="260" y2="185" stroke="#34d399" strokeWidth="2.5" />
                  <text x="275" y="189" fill="#34d399" fontWeight="bold">D (1)</text>
                </g>

                {/* OR GATE LOGIC (RIGHT) */}
                <g transform="translate(380, 20)">
                  <g transform="translate(100, 25)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                    <text x="22" y="36" fill="#a5b4fc" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#818cf8" strokeWidth="2" />
                    <text x="145" y="37" fill="#818cf8" fontWeight="bold">A = D8 + D9</text>
                  </g>

                  <g transform="translate(100, 80)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="22" y="36" fill="#7dd3fc" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#38bdf8" strokeWidth="2" />
                    <text x="145" y="37" fill="#38bdf8" fontWeight="bold">B = D4+D5+D6+D7</text>
                  </g>

                  <g transform="translate(100, 135)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
                    <text x="22" y="36" fill="#f5d0fe" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#c084fc" strokeWidth="2" />
                    <text x="145" y="37" fill="#c084fc" fontWeight="bold">C = D2+D3+D6+D7</text>
                  </g>

                  <g transform="translate(100, 190)">
                    <path d="M 0,10 Q 25,25 0,55 Q 35,55 55,32.5 Q 35,10 0,10 Z" fill="#1e1b4b" stroke="#34d399" strokeWidth="2" />
                    <text x="22" y="36" fill="#a7f3d0" fontSize="10" fontWeight="bold">OR</text>
                    <line x1="55" y1="32.5" x2="130" y2="32.5" stroke="#34d399" strokeWidth="2" />
                    <text x="145" y="37" fill="#34d399" fontWeight="bold">D = D1+D3+D5+D7+D9</text>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 10-Digit Keypad</h2>
              <p className="text-xs text-slate-400">Click any decimal key (0 to 9) to generate the corresponding 4-bit BCD code</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dig) => (
                <button
                  key={dig}
                  onClick={() => setSelectedDigit(dig)}
                  className={clsx(
                    "p-3 rounded-xl font-mono text-xs font-bold transition-all border flex flex-col items-center gap-1",
                    selectedDigit === dig
                      ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/30"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <span className="text-base font-extrabold">{dig}</span>
                  <span className="text-[9px]">D{dig}</span>
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase">4-Bit BCD Code (A B C D)</div>
              <div className="text-4xl font-extrabold font-mono text-cyan-300 py-2">
                {a} {b} {c} {d}
              </div>
              <div className="text-xs font-mono text-emerald-400">
                Decimal Digit: {selectedDigit} = BCD ({a}{b}{c}{d})_BCD
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Decimal-to-BCD</h2>
              <p className="text-xs text-slate-400">Important equations for examination synthesis</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2 text-xs">
            <div className="font-bold text-rose-400 uppercase tracking-wider">Number of Gates</div>
            <p className="text-slate-300 leading-relaxed">
              If asked: "How many OR gates are required to design a Decimal-to-BCD encoder?", the answer is 4 OR gates: one 2-input OR gate (A), two 4-input OR gates (B, C), and one 5-input OR gate (D).
            </p>
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
      <section>
        <Teacher note="Decimal-to-BCD is the real-world link between human numbers (0 to 9) and microprocessor words. Always remember that D0 is left unconnected since 0000 requires no HIGH signals." />
      </section>
    </div>
  );
};

export default Topic11;
