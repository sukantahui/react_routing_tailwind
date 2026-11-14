import React, { useState } from "react";
import clsx from "clsx";
import {
  Cpu,
  Layers,
  CheckCircle2,
  Table,
  HelpCircle,
  Lightbulb,
  Video,
  Award,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Sparkles,
  ExternalLink,
  BookOpen,
  Check
} from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import { faqs } from "./faqs/topic42_faqs";

// The 10 predefined problems from Textbook & Curriculum
const PRESET_PROBLEMS = [
  { id: 1, mins: [0, 1, 3, 4, 8, 9, 15], title: "Textbook Example 2.13 (Page 109)", desc: "Original CISCE Textbook Problem" },
  { id: 2, mins: [0, 2, 5, 7, 8, 10, 13, 15], title: "Example 2: All Constants (0 & 1)", desc: "Zero inverters required" },
  { id: 3, mins: [1, 2, 3, 6, 9, 10, 11, 14], title: "Example 3: Mixed Constant Channels", desc: "Paired symmetry" },
  { id: 4, mins: [0, 1, 2, 3, 12, 13, 14, 15], title: "Example 4: Quad a' and Quad a", desc: "Four complemented and four normal literals" },
  { id: 5, mins: [4, 5, 6, 7, 8, 9, 10, 11], title: "Example 5: Quad a and Quad a'", desc: "Inverted block pattern" },
  { id: 6, mins: [0, 3, 5, 6, 9, 10, 12, 15], title: "Example 6: Alternating a' and a Channels", desc: "Checkerboard distribution" },
  { id: 7, mins: [1, 3, 4, 6, 8, 11, 13, 14], title: "Example 7: Complex Diverse Spectrum", desc: "All 4 rules active across channels" },
  { id: 8, mins: [0, 2, 4, 6, 9, 11, 13, 15], title: "Example 8: Even/Odd Striped Minterms", desc: "High-frequency alternation" },
  { id: 9, mins: [2, 3, 4, 5, 10, 11, 12, 13], title: "Example 9: Central Dense Cluster", desc: "Mid-band minterms" },
  { id: 10, mins: [0, 1, 6, 7, 8, 9, 14, 15], title: "Example 10: Corner Boundary Blocks", desc: "Outer perimeter minterms" }
];

function getPinValue(top, bottom) {
  if (top === 0 && bottom === 0) return { val: "0", rule: "Rule 1", desc: "Neither m_k nor m_(k+8) is listed (0/0) -> Connect to Logic 0 (GND)" };
  if (top === 1 && bottom === 1) return { val: "1", rule: "Rule 2", desc: "Both m_k and m_(k+8) are listed (1/1) -> Connect to Logic 1 (VCC)" };
  if (top === 0 && bottom === 1) return { val: "a", rule: "Rule 3", desc: "Only bottom m_(k+8) is listed (0/1) -> Connect to variable a" };
  return { val: "a'", rule: "Rule 4", desc: "Only top m_k is listed (1/0) -> Connect to complement a' (via NOT gate)" };
}

const Topic42 = () => {
  const [activeTab, setActiveTab] = useState("examples");
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [customMode, setCustomMode] = useState(false);
  const [customMinterms, setCustomMinterms] = useState([0, 1, 3, 4, 8, 9, 15]);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const activeMins = customMode ? customMinterms : PRESET_PROBLEMS[selectedExampleIndex].mins;

  // Toggle minterm for custom mode
  const toggleMinterm = (m) => {
    setCustomMinterms((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m).sort((a, b) => a - b) : [...prev, m].sort((a, b) => a - b)
    );
  };

  // Derive Table data for current active minterms
  const topRow = Array.from({ length: 8 }, (_, i) => (activeMins.includes(i) ? 1 : 0));
  const bottomRow = Array.from({ length: 8 }, (_, i) => (activeMins.includes(i + 8) ? 1 : 0));
  const pinDetails = topRow.map((top, i) => getPinValue(top, bottomRow[i]));

  // Count inverters required (how many pins need a')
  const invertersNeeded = pinDetails.some((p) => p.val === "a'") ? 1 : 0;

  // Quiz checking
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({ q1: "", q2: "", q3: "" });
    setQuizSubmitted(false);
  };

  const quizScore =
    (quizAnswers.q1 === "b" ? 1 : 0) +
    (quizAnswers.q2 === "c" ? 1 : 0) +
    (quizAnswers.q3 === "a" ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Special Topic 42
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1.5">
              <Sparkles size={12} /> 10 Worked Examples Masterclass
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Special Topic: 10 Detailed 8:1 Multiplexer Implementation Examples
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Exhaustive textbook-aligned implementations of 10 four-variable Boolean functions using an 8:1 MUX (Textbook Section 2.3.4A, Pages 107–109). Master the 4 fundamental data-pin rules, row forming with singled-out variable <em>a</em>, selection line assignment (S₂=b, S₁=c, S₀=d), complete circuits, and self-assessment quiz.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "examples", label: "1. 10 Worked Examples & Simulator" },
              { id: "method", label: "2. Textbook Method & Architecture" },
              { id: "rules", label: "3. The 4 Data-Pin Rules" },
              { id: "deepDive", label: "4. Why the Table Works (Deep Dive)" },
              { id: "quiz", label: "5. Interactive Practice Quiz" },
              { id: "videos", label: "6. Video References & Guides" },
              { id: "faqs", label: "7. 15 Essential FAQs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
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

      {/* TAB 1: 10 WORKED EXAMPLES & SIMULATOR */}
      {activeTab === "examples" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs">SECTION 01</span>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {customMode ? "Custom 4-Variable Function Realizer" : PRESET_PROBLEMS[selectedExampleIndex].title}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {customMode
                  ? "Toggle any minterms (0 to 15) to dynamically synthesize the 8:1 MUX implementation table."
                  : PRESET_PROBLEMS[selectedExampleIndex].desc}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomMode(false)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  !customMode
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                Preset Examples (1–10)
              </button>
              <button
                onClick={() => setCustomMode(true)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5",
                  customMode
                    ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                )}
              >
                <Sliders size={13} /> Custom Builder
              </button>
            </div>
          </div>

          {/* PRESET SELECTOR BUTTONS */}
          {!customMode && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Select One of the 10 Solved Examples:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_PROBLEMS.map((prob, idx) => (
                  <button
                    key={prob.id}
                    onClick={() => setSelectedExampleIndex(idx)}
                    className={clsx(
                      "p-2.5 rounded-xl border text-left transition-all text-xs",
                      selectedExampleIndex === idx
                        ? "bg-indigo-950 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    )}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Ex {prob.id}</span>
                      {idx === 0 && <span className="text-[10px] text-amber-400 font-normal">Textbook</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                      Σ({prob.mins.slice(0, 3).join(",")}{prob.mins.length > 3 ? "…" : ""})
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM MINTERM SELECTOR */}
          {customMode && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders size={14} /> Toggle Minterms in Σ (0 to 15):
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Active Count: <strong className="text-cyan-300">{activeMins.length} / 16</strong>
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono text-xs">
                {Array.from({ length: 16 }, (_, i) => {
                  const isActive = activeMins.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleMinterm(i)}
                      className={clsx(
                        "py-1.5 px-2 rounded-lg border font-bold transition-all flex items-center justify-center gap-1",
                        isActive
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-md shadow-rose-500/20"
                          : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                      )}
                    >
                      <span>m{i}</span>
                      {isActive && <Check size={11} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* FUNCTION HEADER BOX */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Boolean Function Specification</span>
            <div className="font-mono text-lg sm:text-2xl font-bold text-amber-300">
              F(a, b, c, d) = Σ({activeMins.length > 0 ? activeMins.join(", ") : "none"})
            </div>
            <p className="text-xs text-slate-400">
              4 variables (a, b, c, d) &bull; Ordered sequence: abcd &bull; Singled-out variable: <strong>a</strong> &bull; Select lines: <strong>S₂=b, S₁=c, S₀=d</strong>
            </p>
          </div>

          {/* STEP 1 & STEP 2 SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[11px] block">
                Step 1: Choose MUX Size &amp; Select Lines
              </span>
              <p className="text-slate-300">
                Number of variables is <strong className="text-white">n = 4</strong>.
                Number of select lines required is <strong className="text-white">n - 1 = 3</strong>.
                Three select lines choose between <strong className="text-white">2³ = 8</strong> data inputs.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-cyan-300 text-center">
                Device: 8:1 MUX &nbsp;|&nbsp; S₂ = b, S₁ = c, S₀ = d
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] block">
                Step 2: Identify Active Minterms (Output = 1)
              </span>
              <p className="text-slate-300">
                Minterms in Σ receive logic <strong className="text-emerald-400 font-mono">1</strong>.
                All other minterms from 0 to 15 evaluate to <strong className="text-rose-400 font-mono">0</strong>.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-slate-300 text-center truncate">
                Active Minterms (1): {activeMins.length > 0 ? activeMins.join(", ") : "None"}
              </div>
            </div>
          </div>

          {/* STEP 3: TEXTBOOK 2-ROW IMPLEMENTATION TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Table size={16} className="text-cyan-400" />
                Step 3: Construct the 2-Row Implementation Table
              </h3>
              <span className="text-[11px] text-slate-400">
                Pink cells = Minterms included in Σ
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-center font-mono">
                <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3 text-left font-sans font-bold text-slate-400">Row</th>
                    {Array.from({ length: 8 }, (_, i) => (
                      <th key={i} className="py-2.5 px-2 text-indigo-300 font-bold">
                        I<sub>{i}</sub>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {i.toString(2).padStart(3, "0")}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {/* TOP ROW: a' (a = 0) */}
                  <tr>
                    <td className="py-2.5 px-3 text-left font-bold text-indigo-300 font-sans bg-slate-950/70">
                      a&apos; (a = 0)
                    </td>
                    {topRow.map((val, idx) => (
                      <td
                        key={idx}
                        className={clsx(
                          "py-2 px-2 font-bold transition-colors",
                          val === 1
                            ? "bg-rose-950/60 text-rose-300 border border-rose-500/40"
                            : "text-slate-500 bg-slate-950/30"
                        )}
                      >
                        {idx}
                      </td>
                    ))}
                  </tr>

                  {/* BOTTOM ROW: a (a = 1) */}
                  <tr>
                    <td className="py-2.5 px-3 text-left font-bold text-indigo-300 font-sans bg-slate-950/70">
                      a (a = 1)
                    </td>
                    {bottomRow.map((val, idx) => (
                      <td
                        key={idx}
                        className={clsx(
                          "py-2 px-2 font-bold transition-colors",
                          val === 1
                            ? "bg-rose-950/60 text-rose-300 border border-rose-500/40"
                            : "text-slate-500 bg-slate-950/30"
                        )}
                      >
                        {idx + 8}
                      </td>
                    ))}
                  </tr>

                  {/* RESULT ROW: PIN INPUT ASSIGNED */}
                  <tr className="bg-emerald-950/40 font-bold border-t-2 border-emerald-500/50">
                    <td className="py-3 px-3 text-left font-sans text-emerald-400 font-extrabold">
                      Data Pin Input
                    </td>
                    {pinDetails.map((pin, idx) => (
                      <td key={idx} className="py-3 px-2 text-sm text-emerald-300 font-bold font-mono">
                        {pin.val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 font-sans italic">
              Column order: bcd = 000, 001, 010, 011, 100, 101, 110, 111. These address lines route inputs I₀ through I₇ to output F.
            </p>
          </div>

          {/* STEP 4: DETAILED EXPLANATION FOR ALL 8 PINS */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Step 4: Vertical Pair Comparison &amp; Rule Deductions for Every Pin (I₀ to I₇)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {pinDetails.map((pin, i) => {
                const topVal = topRow[i];
                const botVal = bottomRow[i];
                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white font-mono text-sm">
                        Pin I<sub>{i}</sub> (bcd = {i.toString(2).padStart(3, "0")}):
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                        {pin.rule} &rarr; <strong>{pin.val}</strong>
                      </span>
                    </div>

                    <div className="text-slate-400 space-y-1">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-slate-300">Top m{i}: {topVal ? "1 (in Σ)" : "0"}</span>
                        <span>|</span>
                        <span className="text-slate-300">Bottom m{i + 8}: {botVal ? "1 (in Σ)" : "0"}</span>
                        <span>&rarr;</span>
                        <span className="text-amber-300 font-bold">Pair {topVal}/{botVal}</span>
                      </div>
                      <p className="text-slate-300 font-sans text-xs">{pin.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 5: FINAL CONNECTIONS & COMPLETE SCHEMATIC */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-sm text-emerald-400">Step 5: Final Multiplexer Pin Assignments</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                {invertersNeeded === 0 ? "0 Inverters (Passive Realization)" : "1 Hex Inverter IC (7404) for a'"}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 font-mono text-xs text-center text-slate-300 overflow-x-auto">
              {pinDetails.map((p, i) => (
                <span key={i} className="inline-block mx-2">
                  I<sub>{i}</sub> = <strong className="text-emerald-300">{p.val}</strong>
                </span>
              ))}
              <div className="mt-2 text-cyan-300 text-xs">
                Select Lines: <strong>S₂ = b &nbsp;|&nbsp; S₁ = c &nbsp;|&nbsp; S₀ = d</strong>
              </div>
            </div>

            {/* SVG SCHEMATIC DIAGRAM */}
            <div className="w-full bg-slate-900/80 rounded-xl p-4 flex justify-center items-center border border-slate-800">
              <svg viewBox="0 0 540 380" className="w-full max-w-lg h-auto font-mono text-[11px]">
                {/* 8:1 MUX Body */}
                <rect x="200" y="40" width="160" height="280" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
                <text x="280" y="70" fill="#a5b4fc" fontWeight="bold" textAnchor="middle" fontSize="14">8 × 1 MUX</text>
                <text x="280" y="88" fill="#818cf8" textAnchor="middle" fontSize="10">(IC 74151 / 74153)</text>

                {/* 8 Input Pins I0 - I7 */}
                {pinDetails.map((pin, i) => {
                  const y = 110 + i * 24;
                  return (
                    <g key={i}>
                      <text x="215" y={y + 4} fill="#cbd5e1" fontSize="10">I{i}</text>
                      <line x1="80" y1={y} x2="200" y2={y} stroke="#38bdf8" strokeWidth="1.5" />
                      <circle cx="80" cy={y} r="3" fill="#38bdf8" />
                      <text x="70" y={y + 4} fill="#38bdf8" textAnchor="end" fontWeight="bold">
                        {pin.val}
                      </text>
                    </g>
                  );
                })}

                {/* Select Lines S2, S1, S0 */}
                <line x1="240" y1="360" x2="240" y2="320" stroke="#f59e0b" strokeWidth="2" />
                <line x1="280" y1="360" x2="280" y2="320" stroke="#f59e0b" strokeWidth="2" />
                <line x1="320" y1="360" x2="320" y2="320" stroke="#f59e0b" strokeWidth="2" />
                <text x="240" y="375" fill="#fbbf24" textAnchor="middle" fontWeight="bold">S₂ (b)</text>
                <text x="280" y="375" fill="#fbbf24" textAnchor="middle" fontWeight="bold">S₁ (c)</text>
                <text x="320" y="375" fill="#fbbf24" textAnchor="middle" fontWeight="bold">S₀ (d)</text>

                {/* Output Pin F */}
                <line x1="360" y1="180" x2="470" y2="180" stroke="#a855f7" strokeWidth="2.5" />
                <circle cx="470" cy="180" r="4" fill="#a855f7" />
                <text x="485" y="185" fill="#c084fc" fontWeight="bold" fontSize="14">F</text>
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: TEXTBOOK METHOD & ARCHITECTURE */}
      {activeTab === "method" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Textbook Implementation Method (Section 2.3.4A)</h2>
              <p className="text-xs text-slate-400">Formal CISCE Class 12 syllabus specification from Textbook Pages 107–109</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-sans">Ordered Sequence:</span>
              <span className="text-sm font-bold text-indigo-300 font-mono">a &nbsp; b &nbsp; c &nbsp; d</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-sans">Singled-Out Variable:</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">a (MSB Data Literal)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-sans">Selection Variables:</span>
              <span className="text-sm font-bold text-emerald-300 font-mono">b &nbsp; c &nbsp; d</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-sans">Selection Pin Assignment:</span>
              <span className="text-sm font-bold text-amber-300 font-mono">S₂=b, S₁=c, S₀=d</span>
            </div>
          </div>

          {/* MATHEMATICAL SIZING */}
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-2 text-xs">
            <h3 className="font-bold text-indigo-300 text-sm">Why an 8:1 Multiplexer is Required:</h3>
            <p className="text-slate-300">
              There are four variables in function F(a, b, c, d), so <strong>n = 4</strong>.
              The multiplexer requires <strong>n - 1 = 4 - 1 = 3</strong> selection lines.
              Three selection lines can address <strong>2³ = 8</strong> distinct channel combinations (000 to 111).
              Therefore, we select an <strong>8:1 Multiplexer</strong> having 8 data inputs: I₀ to I₇.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 font-mono text-center text-emerald-400 font-bold text-sm">
              Data Channels = 2^(n - 1) = 2^(4 - 1) = 2³ = 8 inputs (I₀ to I₇)
            </div>
          </div>

          {/* HOW THE TWO ROWS ARE FORMED */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-slate-200 text-sm">How the Two Implementation Rows are Formed:</h3>
            <p className="text-slate-400">
              The singled-out variable is <strong>a</strong>. It splits the 16 minterms into two halves:
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-950 text-slate-300">
                  <tr>
                    <th className="p-2.5">Textbook Row Label</th>
                    <th className="p-2.5">Condition</th>
                    <th className="p-2.5">Constituent Minterms</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold text-indigo-300">a&apos;</td>
                    <td className="p-2.5 text-cyan-300">a = 0</td>
                    <td className="p-2.5 text-slate-300">m₀, m₁, m₂, m₃, m₄, m₅, m₆, m₇</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-indigo-300">a</td>
                    <td className="p-2.5 text-cyan-300">a = 1</td>
                    <td className="p-2.5 text-slate-300">m₈, m₉, m₁₀, m₁₁, m₁₂, m₁₃, m₁₄, m₁₅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* HOW COLUMNS MATCH PINS */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-slate-200 text-sm">How Columns Match the MUX Data Pins:</h3>
            <p className="text-slate-400">
              The selection variables <strong>bcd</strong> count in binary from 000 to 111. Each code selects one specific data pin:
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-center font-mono">
                <thead className="bg-slate-950 text-slate-300">
                  <tr>
                    <th className="p-2">bcd Code</th>
                    <th className="p-2">000</th>
                    <th className="p-2">001</th>
                    <th className="p-2">010</th>
                    <th className="p-2">011</th>
                    <th className="p-2">100</th>
                    <th className="p-2">101</th>
                    <th className="p-2">110</th>
                    <th className="p-2">111</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="bg-indigo-950/30 font-bold text-indigo-300">
                    <td className="p-2 text-slate-400 font-sans">MUX Pin</td>
                    <td className="p-2">I₀</td>
                    <td className="p-2">I₁</td>
                    <td className="p-2">I₂</td>
                    <td className="p-2">I₃</td>
                    <td className="p-2">I₄</td>
                    <td className="p-2">I₅</td>
                    <td className="p-2">I₆</td>
                    <td className="p-2">I₇</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: THE FOUR DATA-PIN RULES */}
      {activeTab === "rules" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">The Four Fundamental Data-Pin Rules</h2>
              <p className="text-xs text-slate-400">Determining pin inputs by vertical comparison of the two minterms in each column</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left font-mono">
              <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-sans font-bold">Rule No.</th>
                  <th className="py-3 px-3 text-center">Top (a=0)</th>
                  <th className="py-3 px-3 text-center">Bottom (a=1)</th>
                  <th className="py-3 px-4 text-center font-bold text-emerald-400">Connect to Pin</th>
                  <th className="py-3 px-4 font-sans">Hardware &amp; Logical Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 1</td>
                  <td className="py-3 px-3 text-center text-rose-400 font-bold">0</td>
                  <td className="py-3 px-3 text-center text-rose-400 font-bold">0</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-rose-400">0</td>
                  <td className="py-3 px-4 font-sans">
                    Output remains 0 regardless of variable a &rarr; Tied to Ground (GND).
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 2</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-emerald-400">1</td>
                  <td className="py-3 px-4 font-sans">
                    Output remains 1 regardless of variable a &rarr; Tied to High (+5V / VCC).
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 3</td>
                  <td className="py-3 px-3 text-center text-slate-400">0</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-cyan-400">a</td>
                  <td className="py-3 px-4 font-sans">
                    When a=0 output is 0, when a=1 output is 1 &rarr; Follows uncomplemented variable a.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 4</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-3 text-center text-slate-400">0</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-amber-400">a&apos;</td>
                  <td className="py-3 px-4 font-sans">
                    When a=0 output is 1, when a=1 output is 0 &rarr; Follows complemented variable a&apos; (needs NOT gate).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* MEMORY TRICK BOX */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lightbulb size={14} /> Memory Trick for Exams:
            </span>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li><strong>Same values give a constant:</strong> 0/0 gives 0; 1/1 gives 1.</li>
              <li><strong>Different values give a literal:</strong> Pair 0/1 means uncomplemented <em>a</em>; pair 1/0 means complemented <em>a&apos;</em>.</li>
              <li><strong>Where is the 1 located?</strong> If 1 is in the bottom row (row a), output is <em>a</em>. If 1 is in the top row (row a&apos;), output is <em>a&apos;</em>!</li>
            </ul>
          </div>
        </section>
      )}

      {/* TAB 4: WHY THE IMPLEMENTATION TABLE WORKS (DEEP DIVE) */}
      {activeTab === "deepDive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Understanding Why the Implementation Table Works</h2>
              <p className="text-xs text-slate-400">Rigorous architectural verification and Shannon expansion decomposition</p>
            </div>
          </div>

          {/* WHY 2 MINTERMS PER COLUMN */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-indigo-300 text-sm">Why Are There Exactly Two Minterms in Each Column?</h3>
            <p className="text-slate-300">
              Once selection variables <strong>b, c, and d</strong> are applied to pins S₂, S₁, and S₀, their 3-bit binary combination is fixed. Only variable <strong>a</strong> is left free to take either value: 0 or 1.
            </p>
            <p className="text-slate-400">
              Therefore, the chosen MUX data pin must output the correct Boolean result for <em>both possible values of a</em>:
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left font-mono">
                <thead className="bg-slate-950 text-slate-300">
                  <tr>
                    <th className="p-2">Selection bcd</th>
                    <th className="p-2">Selected Pin</th>
                    <th className="p-2 text-indigo-300">Case a = 0 (Top Row)</th>
                    <th className="p-2 text-cyan-300">Case a = 1 (Bottom Row)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { bcd: "000", pin: "I₀", c0: "0000₂ = m₀", c1: "1000₂ = m₈" },
                    { bcd: "001", pin: "I₁", c0: "0001₂ = m₁", c1: "1001₂ = m₉" },
                    { bcd: "010", pin: "I₂", c0: "0010₂ = m₂", c1: "1010₂ = m₁₀" },
                    { bcd: "011", pin: "I₃", c0: "0011₂ = m₃", c1: "1011₂ = m₁₁" },
                    { bcd: "100", pin: "I₄", c0: "0100₂ = m₄", c1: "1100₂ = m₁₂" },
                    { bcd: "101", pin: "I₅", c0: "0101₂ = m₅", c1: "1101₂ = m₁₃" },
                    { bcd: "110", pin: "I₆", c0: "0110₂ = m₆", c1: "1110₂ = m₁₄" },
                    { bcd: "111", pin: "I₇", c0: "0111₂ = m₇", c1: "1111₂ = m₁₅" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="p-2 font-bold text-amber-300">{row.bcd}</td>
                      <td className="p-2 font-bold text-white">{row.pin}</td>
                      <td className="p-2 text-indigo-300">{row.c0}</td>
                      <td className="p-2 text-cyan-300">{row.c1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VERIFYING ONE COLUMN */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-cyan-300 text-sm">Testing Both Values of a on Channel bcd = 011 (Pin I₃):</h3>
            <p className="text-slate-300">
              For function F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15):
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li>When <strong>a = 0</strong>, input abcd = 0011 (minterm m₃). Since m₃ is in Σ, F must be <strong>1</strong>. If I₃ = a&apos;, then a&apos; = 0&apos; = 1 &rarr; Matches!</li>
              <li>When <strong>a = 1</strong>, input abcd = 1011 (minterm m₁₁). Since m₁₁ is not in Σ, F must be <strong>0</strong>. If I₃ = a&apos;, then a&apos; = 1&apos; = 0 &rarr; Matches!</li>
            </ul>
          </div>

          {/* WARNING ALERT */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1.5 text-xs">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertTriangle size={14} /> Crucial Exam Warning:
            </span>
            <p className="text-slate-300">
              <strong>Never decide a data pin connection by inspecting only one minterm!</strong>
              Both minterms in the column share the same select address. You must always perform a vertical comparison between both rows to determine whether the pin requires 0, 1, a, or a&apos;.
            </p>
          </div>
        </section>
      )}

      {/* TAB 5: INTERACTIVE PRACTICE QUIZ */}
      {activeTab === "quiz" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">05</div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Knowledge Check Quiz</h2>
                <p className="text-xs text-slate-400">Test your mastery of 8:1 MUX synthesis and the 4 data-pin rules</p>
              </div>
            </div>
            {quizSubmitted && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Score: {quizScore} / 3
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs">
            {/* QUESTION 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">
                1. Which variable is singled out in the textbook ordered sequence abcd?
              </span>
              <div className="space-y-2">
                {[
                  { id: "a", label: "Variable d" },
                  { id: "b", label: "Variable a (Correct CISCE convention)" },
                  { id: "c", label: "Variable c" }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={clsx(
                      "flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all",
                      quizAnswers.q1 === opt.id
                        ? "bg-indigo-950/60 border-indigo-500 text-white"
                        : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900"
                    )}
                  >
                    <input
                      type="radio"
                      name="quiz_q1"
                      value={opt.id}
                      checked={quizAnswers.q1 === opt.id}
                      onChange={() => setQuizAnswers({ ...quizAnswers, q1: opt.id })}
                      className="accent-indigo-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {quizSubmitted && (
                <div className={clsx("p-2 rounded text-[11px]", quizAnswers.q1 === "b" ? "text-emerald-400 bg-emerald-950/30" : "text-rose-400 bg-rose-950/30")}>
                  {quizAnswers.q1 === "b" ? "Correct! In sequence abcd, variable a is singled out across the two rows." : "Incorrect. In ordered sequence abcd, the leftmost variable a is singled out."}
                </div>
              )}
            </div>

            {/* QUESTION 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">
                2. In an implementation column, Top = 0 and Bottom = 1. What is connected to the MUX pin?
              </span>
              <div className="space-y-2">
                {[
                  { id: "a", label: "Complemented variable a'" },
                  { id: "b", label: "Logic 0 (Ground)" },
                  { id: "c", label: "Variable a (Follows row a)" }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={clsx(
                      "flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all",
                      quizAnswers.q2 === opt.id
                        ? "bg-indigo-950/60 border-indigo-500 text-white"
                        : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900"
                    )}
                  >
                    <input
                      type="radio"
                      name="quiz_q2"
                      value={opt.id}
                      checked={quizAnswers.q2 === opt.id}
                      onChange={() => setQuizAnswers({ ...quizAnswers, q2: opt.id })}
                      className="accent-indigo-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {quizSubmitted && (
                <div className={clsx("p-2 rounded text-[11px]", quizAnswers.q2 === "c" ? "text-emerald-400 bg-emerald-950/30" : "text-rose-400 bg-rose-950/30")}>
                  {quizAnswers.q2 === "c" ? "Correct! Pair 0/1 has 1 in row a, so output follows variable a." : "Incorrect. Pair 0/1 follows variable a because output is 1 when a=1 and 0 when a=0."}
                </div>
              )}
            </div>

            {/* QUESTION 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">
                3. Which selection pin receives variable b?
              </span>
              <div className="space-y-2">
                {[
                  { id: "a", label: "Selection line S₂ (Most significant select pin)" },
                  { id: "b", label: "Selection line S₁" },
                  { id: "c", label: "Selection line S₀ (Least significant select pin)" }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={clsx(
                      "flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all",
                      quizAnswers.q3 === opt.id
                        ? "bg-indigo-950/60 border-indigo-500 text-white"
                        : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900"
                    )}
                  >
                    <input
                      type="radio"
                      name="quiz_q3"
                      value={opt.id}
                      checked={quizAnswers.q3 === opt.id}
                      onChange={() => setQuizAnswers({ ...quizAnswers, q3: opt.id })}
                      className="accent-indigo-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {quizSubmitted && (
                <div className={clsx("p-2 rounded text-[11px]", quizAnswers.q3 === "a" ? "text-emerald-400 bg-emerald-950/30" : "text-rose-400 bg-rose-950/30")}>
                  {quizAnswers.q3 === "a" ? "Correct! S₂ is the highest select pin, connected to b." : "Incorrect. Variable b connects to S₂ as the most significant select bit."}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleQuizSubmit}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition cursor-pointer"
              >
                Check Answers
              </button>
              <button
                onClick={resetQuiz}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw size={14} /> Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: VIDEO REFERENCES & SUPPLEMENTARY RESOURCES */}
      {activeTab === "videos" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">06</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Curated Video References &amp; Supplementary Guides</h2>
              <p className="text-xs text-slate-400">High-yield external visual learning resources to supplement your textbook study</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                <Video size={15} /> All About Electronics
              </span>
              <p className="text-slate-300">
                Multiplexer Explained / Boolean Function Implementation using MUX.
              </p>
              <p className="text-slate-400 text-[11px]">
                Recommended first for conceptual mastery of internal routing and channel enabling.
              </p>
              <a
                href="https://www.youtube.com/results?search_query=ALL+ABOUT+ELECTRONICS+Boolean+function+implementation+using+multiplexer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1 text-[11px] font-semibold"
              >
                Search on YouTube <ExternalLink size={11} />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                <Video size={15} /> 8:1 MUX Solved Examples
              </span>
              <p className="text-slate-300">
                Step-by-step 4-variable solved problems on 8-to-1 Multiplexers.
              </p>
              <p className="text-slate-400 text-[11px]">
                Watch instructors build the 2-row table and circle active minterms across various functions.
              </p>
              <a
                href="https://www.youtube.com/results?search_query=8%3A1+multiplexer+implementation+of+Boolean+function+solved+example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1 text-[11px] font-semibold"
              >
                Search on YouTube <ExternalLink size={11} />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                <Video size={15} /> Selection Lines &amp; Truth Table
              </span>
              <p className="text-slate-300">
                Understanding how S₂S₁S₀ binary addresses route I₀ through I₇.
              </p>
              <p className="text-slate-400 text-[11px]">
                Essential for visual learners struggling with binary counting across selection buses.
              </p>
              <a
                href="https://www.youtube.com/results?search_query=8%3A1+MUX+truth+table+selection+lines"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1 text-[11px] font-semibold"
              >
                Search on YouTube <ExternalLink size={11} />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-indigo-300">Suggested Learning Sequence:</span>
            <p className="text-slate-400">
              1. Review the 4 Data-Pin Rules &rarr; 2. Examine Textbook Example 2.13 (Example 1) &rarr; 3. Practice all 10 examples in the interactive tab &rarr; 4. Test yourself on the quiz!
            </p>
          </div>
        </section>
      )}

      {/* TAB 7: 15 ESSENTIAL FAQS (STANDALONE TAB) */}
      {activeTab === "faqs" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* BOTTOM ACCORDION FAQS */}
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
        topicId="topic-42-8to1-mux-10-examples"
        headline="Sukanta Hui's Advice on 8:1 MUX Implementation Mastery"
        note="Every year in the ISC Class 12 Computer Science theory paper, questions on MUX realization appear in Section B. The secret to scoring full marks is methodically writing down: (1) Singled-out variable a, (2) Selection bus assignment (S₂=b, S₁=c, S₀=d), (3) Drawing the 2-row table and circling the minterms in Σ, and (4) Stating the rule for each pin before drawing the schematic. Practice all 10 examples here and you will never lose a mark!"
      />
    </div>
  );
};

export default Topic42;
