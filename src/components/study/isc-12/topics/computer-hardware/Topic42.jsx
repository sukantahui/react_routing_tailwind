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
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowDownCircle,
  Eye,
  List
} from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import { faqs } from "./faqs/topic42_faqs";

// The 10 predefined problems from Textbook & Curriculum
const TEN_PROBLEMS = [
  {
    id: 1,
    mins: [0, 1, 3, 4, 8, 9, 15],
    title: "Example 1: Original Textbook Example 2.13 (Page 109)",
    subtitle: "CISCE Textbook Reference Problem • Standard Syllabus Benchmark",
    tag: "Textbook Core"
  },
  {
    id: 2,
    mins: [0, 2, 5, 7, 8, 10, 13, 15],
    title: "Example 2: All Constant Inputs (0 & 1)",
    subtitle: "Zero External Inverters Required • Passive High/Low Connections Only",
    tag: "0 Inverters"
  },
  {
    id: 3,
    mins: [1, 2, 3, 6, 9, 10, 11, 14],
    title: "Example 3: Mixed Constant Channels",
    subtitle: "Balanced Paired Symmetry with Logic 0 and Logic 1",
    tag: "0 Inverters"
  },
  {
    id: 4,
    mins: [0, 1, 2, 3, 12, 13, 14, 15],
    title: "Example 4: Quad a' Followed by Quad a",
    subtitle: "Four Complemented Literals (I₀–I₃) and Four Normal Literals (I₄–I₇)",
    tag: "Block Partition"
  },
  {
    id: 5,
    mins: [4, 5, 6, 7, 8, 9, 10, 11],
    title: "Example 5: Quad a Followed by Quad a'",
    subtitle: "Reversed Block Pattern • Four Normal (I₀–I₃) and Four Inverted (I₄–I₇)",
    tag: "Block Partition"
  },
  {
    id: 6,
    mins: [0, 3, 5, 6, 9, 10, 12, 15],
    title: "Example 6: Alternating a' and a Channels",
    subtitle: "Checkerboard Distribution Across Adjacent MUX Channels",
    tag: "Alternating"
  },
  {
    id: 7,
    mins: [1, 3, 4, 6, 8, 11, 13, 14],
    title: "Example 7: Complex Diverse Spectrum",
    subtitle: "All Four Rules (0, 1, a, a') Active Across Different Data Pins",
    tag: "All 4 Rules"
  },
  {
    id: 8,
    mins: [0, 2, 4, 6, 9, 11, 13, 15],
    title: "Example 8: Even/Odd Striped Minterms",
    subtitle: "High-Frequency Alternation Between a' and a Across All Eight Pins",
    tag: "High Frequency"
  },
  {
    id: 9,
    mins: [2, 3, 4, 5, 10, 11, 12, 13],
    title: "Example 9: Central Dense Cluster",
    subtitle: "Mid-Band Minterms Grouping with Constant Low Boundaries",
    tag: "Mid-Band"
  },
  {
    id: 10,
    mins: [0, 1, 6, 7, 8, 9, 14, 15],
    title: "Example 10: Corner Boundary Blocks",
    subtitle: "Outer Perimeter Minterms with Inactive Internal Channels",
    tag: "Perimeter"
  }
];

// Helper: Calculate pin value, rule and explanation
function computePin(top, bottom, i) {
  if (top === 0 && bottom === 0) {
    return {
      val: "0",
      rule: "Rule 1",
      pair: "0/0",
      desc: `Neither m${i} nor m${i + 8} is listed in Σ. The output pair is 0/0, so connect logic 0 (Ground).`
    };
  }
  if (top === 1 && bottom === 1) {
    return {
      val: "1",
      rule: "Rule 2",
      pair: "1/1",
      desc: `Both m${i} and m${i + 8} are listed in Σ. The output pair is 1/1, so connect logic 1 (VCC).`
    };
  }
  if (top === 0 && bottom === 1) {
    return {
      val: "a",
      rule: "Rule 3",
      pair: "0/1",
      desc: `m${i} is not listed but m${i + 8} is listed in Σ. The pair is 0/1, which behaves like variable a.`
    };
  }
  return {
    val: "a'",
    rule: "Rule 4",
    pair: "1/0",
    desc: `m${i} is listed but m${i + 8} is not listed in Σ. The pair is 1/0, which behaves like complement a' (via NOT gate).`
  };
}

// Reusable Worked Example Card
const WorkedExampleCard = ({ problem, index }) => {
  const { mins, title, subtitle, tag } = problem;
  const topRow = Array.from({ length: 8 }, (_, i) => (mins.includes(i) ? 1 : 0));
  const bottomRow = Array.from({ length: 8 }, (_, i) => (mins.includes(i + 8) ? 1 : 0));
  const pins = topRow.map((top, i) => computePin(top, bottomRow[i], i));
  const needsInverter = pins.some((p) => p.val === "a'");

  return (
    <article
      id={`example-${problem.id}`}
      className="p-5 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6 scroll-mt-24 transition-all hover:border-slate-700"
    >
      {/* EXAMPLE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              EXAMPLE {problem.id} OF 10
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              4 Variables • 8:1 MUX
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {tag}
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "px-3 py-1 rounded-lg text-xs font-bold font-mono border",
              needsInverter
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
            )}
          >
            {needsInverter ? "1 Inverter IC (7404) for a'" : "0 Inverters Required"}
          </span>
        </div>
      </div>

      {/* FORMULA BANNER */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-base sm:text-lg font-bold text-amber-300 shadow-inner">
        F(a, b, c, d) = Σ({mins.join(", ")})
      </div>

      {/* STEP 1 & STEP 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
          <span className="font-bold text-indigo-400 uppercase tracking-wider text-[11px] block">
            Step 1 – Choose the MUX and Selection Lines
          </span>
          <p className="text-slate-300">
            There are four variables (n = 4). The number of data inputs is 2^(n-1) = 2³ = 8.
            We use an <strong>8:1 MUX</strong>. Follow textbook order: ordered sequence <em>abcd</em>, singled-out variable <strong>a</strong>, selection variables <strong>bcd</strong>, and selection pins:
          </p>
          <div className="p-2 rounded-lg bg-slate-900 font-mono text-cyan-300 text-center font-bold">
            S₂ = b &nbsp;|&nbsp; S₁ = c &nbsp;|&nbsp; S₀ = d
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
          <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] block">
            Step 2 – Identify Minterms with Output 1
          </span>
          <p className="text-slate-300">
            The minterms <strong className="text-white font-mono">{mins.join(", ")}</strong> are included in Σ, so they receive output 1. All other minterms from 0 to 15 receive output 0.
          </p>
          <div className="p-2 rounded-lg bg-slate-900 font-mono text-xs text-slate-300 text-center truncate">
            Active: [{mins.join(", ")}] ({mins.length} minterms)
          </div>
        </div>
      </div>

      {/* STEP 3 – TEXTBOOK IMPLEMENTATION TABLE */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
            <Table size={15} className="text-cyan-400" />
            Step 3 – Build the Implementation Table
          </span>
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
                  <th key={i} className="py-2 px-2 text-indigo-300 font-bold">
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
                <td className="py-2.5 px-3 text-left font-bold text-indigo-300 font-sans bg-slate-950/80">
                  a&apos; (a = 0)
                </td>
                {topRow.map((val, idx) => (
                  <td
                    key={idx}
                    className={clsx(
                      "py-2 px-2 font-bold transition-colors",
                      val === 1
                        ? "bg-rose-950/70 text-rose-300 border border-rose-500/50 shadow-sm"
                        : "text-slate-500 bg-slate-950/30"
                    )}
                  >
                    {idx}
                  </td>
                ))}
              </tr>

              {/* BOTTOM ROW: a (a = 1) */}
              <tr>
                <td className="py-2.5 px-3 text-left font-bold text-indigo-300 font-sans bg-slate-950/80">
                  a (a = 1)
                </td>
                {bottomRow.map((val, idx) => (
                  <td
                    key={idx}
                    className={clsx(
                      "py-2 px-2 font-bold transition-colors",
                      val === 1
                        ? "bg-rose-950/70 text-rose-300 border border-rose-500/50 shadow-sm"
                        : "text-slate-500 bg-slate-950/30"
                    )}
                  >
                    {idx + 8}
                  </td>
                ))}
              </tr>

              {/* RESULT ROW: PIN INPUT */}
              <tr className="bg-emerald-950/50 font-bold border-t-2 border-emerald-500/60">
                <td className="py-3 px-3 text-left font-sans text-emerald-400 font-extrabold">
                  Pin input
                </td>
                {pins.map((pin, idx) => (
                  <td key={idx} className="py-3 px-2 text-sm text-emerald-300 font-extrabold font-mono">
                    {pin.val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 font-sans">
          Column order: bcd = 000, 001, 010, 011, 100, 101, 110, 111. These select I₀, I₁, I₂, I₃, I₄, I₅, I₆, I₇ respectively.
        </p>
      </div>

      {/* STEP 4 – EXPLAIN EVERY DATA PIN */}
      <div className="space-y-2 text-xs">
        <span className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
          <CheckCircle2 size={15} className="text-emerald-400" />
          Step 4 – Explain Every Data Pin (Vertical Pair Comparison)
        </span>
        <p className="text-slate-400">
          Compare the top and bottom values in each column. Apply the four textbook rules:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {pins.map((pin, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-white text-xs">
                  I<sub>{i}</sub> (bcd = {i.toString(2).padStart(3, "0")}):
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {pin.rule} &rarr; <strong className="text-emerald-300">{pin.val}</strong>
                </span>
              </div>
              <p className="text-slate-300 text-xs font-sans">{pin.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CONNECTIONS BANNER */}
      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 space-y-2 text-xs">
        <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            Final Pin Connections for Example {problem.id}
          </span>
          <span className="font-mono text-slate-300 text-xs">
            Selection Pins: <strong className="text-amber-300">S₂=b, S₁=c, S₀=d</strong>
          </span>
        </div>
        <div className="font-mono text-center text-xs sm:text-sm text-slate-200 overflow-x-auto py-1">
          {pins.map((p, i) => (
            <span key={i} className="inline-block mx-1.5 sm:mx-2">
              I<sub>{i}</sub> = <strong className="text-emerald-400">{p.val}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* STEP 5 – COMPLETE CIRCUIT CONNECTION */}
      <div className="space-y-1 text-xs text-slate-300">
        <span className="font-bold text-indigo-300 text-xs block">
          Step 5 – Complete Circuit Connection:
        </span>
        <p className="text-slate-400">
          Connect variable <strong>b</strong> to S₂, <strong>c</strong> to S₁, and <strong>d</strong> to S₀. Connect each data pin I₀–I₇ to the derived value in the final row. Use the variable <strong>a</strong> or its complement <strong>a&apos;</strong> where shown, and logic <strong>0 (GND)</strong> or <strong>1 (VCC)</strong> for constant entries. The multiplexer output is <strong>F</strong>.
        </p>
      </div>
    </article>
  );
};

const Topic42 = () => {
  const [activeTab, setActiveTab] = useState("allExamples");
  const [viewMode, setViewMode] = useState("all"); // "all" (all 10 examples sequentially) or "single" (focus on 1 example)
  const [singleFocusIndex, setSingleFocusIndex] = useState(0);

  // Custom Sandbox State
  const [customMinterms, setCustomMinterms] = useState([0, 1, 3, 4, 8, 9, 15]);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Toggle minterm in custom mode
  const toggleMinterm = (m) => {
    setCustomMinterms((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m).sort((a, b) => a - b) : [...prev, m].sort((a, b) => a - b)
    );
  };

  // Custom problem derivation
  const customTopRow = Array.from({ length: 8 }, (_, i) => (customMinterms.includes(i) ? 1 : 0));
  const customBottomRow = Array.from({ length: 8 }, (_, i) => (customMinterms.includes(i + 8) ? 1 : 0));
  const customPins = customTopRow.map((top, i) => computePin(top, customBottomRow[i], i));
  const customNeedsInverter = customPins.some((p) => p.val === "a'");

  // Quiz evaluation
  const handleQuizSubmit = () => setQuizSubmitted(true);
  const resetQuiz = () => {
    setQuizAnswers({ q1: "", q2: "", q3: "" });
    setQuizSubmitted(false);
  };
  const quizScore =
    (quizAnswers.q1 === "b" ? 1 : 0) +
    (quizAnswers.q2 === "c" ? 1 : 0) +
    (quizAnswers.q3 === "a" ? 1 : 0);

  // Jump to an example smoothly
  const jumpToExample = (id) => {
    if (viewMode === "single") {
      setSingleFocusIndex(id - 1);
    } else {
      const el = document.getElementById(`example-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              <Sparkles size={12} /> 10 Solved Examples Masterclass
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Special Topic: 10 Detailed 8:1 Multiplexer Implementation Examples
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Complete worked implementation tables and derivations for 10 four-variable Boolean functions using an 8:1 Multiplexer (Textbook Section 2.3.4A, Pages 107–109). Every example features Step 1 to Step 5, full implementation tables, vertical pair analysis for all 8 pins (I₀ to I₇), and pin connection summaries.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "allExamples", label: "1. Ten Worked Examples (Complete Tables)" },
              { id: "method", label: "2. Textbook Method & Architecture" },
              { id: "rules", label: "3. The 4 Data-Pin Rules" },
              { id: "deepDive", label: "4. Why the Table Works (Deep Dive)" },
              { id: "quiz", label: "5. Interactive Practice Quiz" },
              { id: "videos", label: "6. Video References & Guides" },
              { id: "customBuilder", label: "7. Custom MUX Sandbox" },
              { id: "faqs", label: "8. 15 Essential FAQs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer",
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

      {/* TAB 1: TEN WORKED EXAMPLES (COMPLETE TABLES & STEPS) */}
      {activeTab === "allExamples" && (
        <section className="space-y-6">
          {/* QUICK JUMP & VIEW CONTROLS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs">
                  NAVIGATION
                </span>
                <span className="text-sm font-bold text-white">Quick Jump to Any Example:</span>
              </div>

              {/* VIEW MODE TOGGLE */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">View Mode:</span>
                <button
                  onClick={() => setViewMode("all")}
                  className={clsx(
                    "px-3 py-1 rounded-lg border font-semibold transition cursor-pointer flex items-center gap-1",
                    viewMode === "all"
                      ? "bg-indigo-600 text-white border-indigo-400 shadow"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  )}
                >
                  <List size={12} /> View All 10 Sequentially
                </button>
                <button
                  onClick={() => setViewMode("single")}
                  className={clsx(
                    "px-3 py-1 rounded-lg border font-semibold transition cursor-pointer flex items-center gap-1",
                    viewMode === "single"
                      ? "bg-cyan-600 text-white border-cyan-400 shadow"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                  )}
                >
                  <Eye size={12} /> Single Example Focus
                </button>
              </div>
            </div>

            {/* JUMP PILLS */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TEN_PROBLEMS.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => jumpToExample(prob.id)}
                  className={clsx(
                    "px-2.5 py-1 rounded-lg text-xs font-mono transition-all border cursor-pointer",
                    viewMode === "single" && singleFocusIndex === prob.id - 1
                      ? "bg-indigo-600 text-white border-indigo-400 shadow"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  Ex {prob.id}
                </button>
              ))}
            </div>
          </div>

          {/* VIEW MODE: ALL 10 EXAMPLES SEQUENTIALLY */}
          {viewMode === "all" && (
            <div className="space-y-8">
              {TEN_PROBLEMS.map((prob, idx) => (
                <WorkedExampleCard key={prob.id} problem={prob} index={idx} />
              ))}
            </div>
          )}

          {/* VIEW MODE: SINGLE EXAMPLE FOCUS */}
          {viewMode === "single" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <button
                  disabled={singleFocusIndex === 0}
                  onClick={() => setSingleFocusIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={14} /> Previous Example
                </button>
                <span className="font-bold text-indigo-300">
                  Showing Example {singleFocusIndex + 1} of 10
                </span>
                <button
                  disabled={singleFocusIndex === TEN_PROBLEMS.length - 1}
                  onClick={() => setSingleFocusIndex((prev) => Math.min(TEN_PROBLEMS.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  Next Example <ChevronRight size={14} />
                </button>
              </div>

              <WorkedExampleCard
                problem={TEN_PROBLEMS[singleFocusIndex]}
                index={singleFocusIndex}
              />
            </div>
          )}
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

          {/* SIZING DERIVATION */}
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

          {/* ROW FORMATION */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-slate-200 text-sm">How the Two Implementation Rows are Formed:</h3>
            <p className="text-slate-400">
              The singled-out variable is <strong>a</strong>. The top row represents a = 0 and is labeled <strong>a&apos;</strong> in the textbook. The bottom row represents a = 1 and is labeled <strong>a</strong>:
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

          {/* COLUMN MATCHING */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-slate-200 text-sm">How Columns Match the MUX Data Pins:</h3>
            <p className="text-slate-400">
              The selection variables <strong>bcd</strong> count in binary from 000 to 111. Each combination selects one data pin:
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
            <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-slate-300">
              <strong>Reading Σ:</strong> In F = Σ(0, 1, 3), minterms 0, 1 and 3 have output 1. Every unlisted minterm from 0 to 15 has output 0.
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
                  <th className="py-3 px-3 text-center">Top (a = 0)</th>
                  <th className="py-3 px-3 text-center">Bottom (a = 1)</th>
                  <th className="py-3 px-4 text-center font-bold text-emerald-400">Connect to Pin</th>
                  <th className="py-3 px-4 font-sans">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 1</td>
                  <td className="py-3 px-3 text-center text-rose-400 font-bold">0</td>
                  <td className="py-3 px-3 text-center text-rose-400 font-bold">0</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-rose-400">0</td>
                  <td className="py-3 px-4 font-sans">
                    Output remains 0 regardless of variable a &rarr; Connect to Ground (GND).
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 2</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-emerald-400">1</td>
                  <td className="py-3 px-4 font-sans">
                    Output remains 1 regardless of variable a &rarr; Connect to High (+5V / VCC).
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 3</td>
                  <td className="py-3 px-3 text-center text-slate-400">0</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-cyan-400">a</td>
                  <td className="py-3 px-4 font-sans">
                    When a = 0 output is 0; when a = 1 output is 1 &rarr; Output follows variable a.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-bold text-indigo-300">Rule 4</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">1</td>
                  <td className="py-3 px-3 text-center text-slate-400">0</td>
                  <td className="py-3 px-4 text-center font-extrabold text-base text-amber-400">a&apos;</td>
                  <td className="py-3 px-4 font-sans">
                    When a = 0 output is 1; when a = 1 output is 0 &rarr; Output is opposite to a (connect to a&apos; via NOT gate).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lightbulb size={14} /> Memory Trick:
            </span>
            <p className="text-slate-300">
              <strong>Same values give a constant. Different values give a or a&apos;.</strong>
              Pair 0/1 means a; pair 1/0 means a&apos;.
            </p>
          </div>
        </section>
      )}

      {/* TAB 4: WHY THE IMPLEMENTATION TABLE WORKS (DEEP DIVE) */}
      {activeTab === "deepDive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Understand Why the Implementation Table Works</h2>
              <p className="text-xs text-slate-400">Mathematical foundations and column-by-column verification</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-indigo-300 text-sm">Why Are There Two Minterms in Each Column?</h3>
            <p className="text-slate-300">
              Once <strong>b, c, and d</strong> are fixed by the selection pins, only <strong>a</strong> is left free. So the selected MUX data pin must give the correct function output for both possible values of a.
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left font-mono">
                <thead className="bg-slate-950 text-slate-300">
                  <tr>
                    <th className="p-2">Selection bcd</th>
                    <th className="p-2">Pin</th>
                    <th className="p-2 text-indigo-300">a = 0 Case</th>
                    <th className="p-2 text-cyan-300">a = 1 Case</th>
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

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-cyan-300 text-sm">Why Does 1/0 Mean a&apos;?</h3>
            <div className="overflow-x-auto rounded border border-slate-800 max-w-xs">
              <table className="w-full text-center font-mono text-xs">
                <thead className="bg-slate-900 text-slate-300">
                  <tr><th className="p-1.5">a</th><th className="p-1.5">a&apos;</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr><td className="p-1.5 text-indigo-300">0</td><td className="p-1.5 text-emerald-300 font-bold">1</td></tr>
                  <tr><td className="p-1.5 text-indigo-300">1</td><td className="p-1.5 text-rose-300 font-bold">0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300">
              The top row is a = 0, where a&apos; = 1. The bottom row is a = 1, where a&apos; = 0. Therefore, a&apos; produces exactly the pair 1/0. In the same way, a produces 0/1.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1.5 text-xs">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertTriangle size={14} /> Common Mistake:
            </span>
            <p className="text-slate-300">
              <strong>Never decide a pin by looking at only one minterm.</strong>
              Always compare the two minterms vertically in the same column!
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
                <h2 className="text-lg sm:text-xl font-bold text-white">Quick Quiz</h2>
                <p className="text-xs text-slate-400">Test your mastery of 8:1 MUX Boolean function implementation</p>
              </div>
            </div>
            {quizSubmitted && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Score: {quizScore} / 3
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">
                1. Which variable is singled out in ordered sequence abcd?
              </span>
              <div className="space-y-2">
                {[
                  { id: "a", label: "d" },
                  { id: "b", label: "a (Correct CISCE convention)" },
                  { id: "c", label: "c" }
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
                      name="q1"
                      value={opt.id}
                      checked={quizAnswers.q1 === opt.id}
                      onChange={() => setQuizAnswers({ ...quizAnswers, q1: opt.id })}
                      className="accent-indigo-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">
                2. Top = 0 and bottom = 1. What is connected to the MUX pin?
              </span>
              <div className="space-y-2">
                {[
                  { id: "a", label: "a'" },
                  { id: "b", label: "0" },
                  { id: "c", label: "a (Output follows a)" }
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
                      name="q2"
                      value={opt.id}
                      checked={quizAnswers.q2 === opt.id}
                      onChange={() => setQuizAnswers({ ...quizAnswers, q2: opt.id })}
                      className="accent-indigo-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm block">
                3. Which selection pin receives variable b?
              </span>
              <div className="space-y-2">
                {[
                  { id: "a", label: "S₂ (Most Significant Select Line)" },
                  { id: "b", label: "S₁" },
                  { id: "c", label: "S₀" }
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
                      name="q3"
                      value={opt.id}
                      checked={quizAnswers.q3 === opt.id}
                      onChange={() => setQuizAnswers({ ...quizAnswers, q3: opt.id })}
                      className="accent-indigo-500"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
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

      {/* TAB 6: VIDEO REFERENCES */}
      {activeTab === "videos" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">06</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Video References</h2>
              <p className="text-xs text-slate-400">Supplementary video lessons to reinforce textbook understanding</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                <Video size={15} /> All About Electronics
              </span>
              <p className="text-slate-300">
                Multiplexer Explained / Boolean Function Implementation
              </p>
              <p className="text-slate-400 text-[11px]">
                Recommended first for understanding what a MUX does and how it implements Boolean functions.
              </p>
              <a
                href="https://www.youtube.com/results?search_query=ALL+ABOUT+ELECTRONICS+Boolean+function+implementation+using+multiplexer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1 text-[11px] font-semibold"
              >
                Find this lesson on YouTube <ExternalLink size={11} />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                <Video size={15} /> 8:1 MUX Solved Examples
              </span>
              <p className="text-slate-300">
                Step-by-step 8:1 MUX Boolean-function solved examples.
              </p>
              <p className="text-slate-400 text-[11px]">
                Check that the teacher identifies selection lines and the singled-out variable before building the table.
              </p>
              <a
                href="https://www.youtube.com/results?search_query=8%3A1+multiplexer+implementation+of+Boolean+function+solved+example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1 text-[11px] font-semibold"
              >
                Find 8:1 MUX solved examples <ExternalLink size={11} />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                <Video size={15} /> Truth Table &amp; Selection Lines
              </span>
              <p className="text-slate-300">
                Multiplexer truth table and selection lines.
              </p>
              <p className="text-slate-400 text-[11px]">
                Useful if students are still confused about how S₂S₁S₀ selects I₀ through I₇.
              </p>
              <a
                href="https://www.youtube.com/results?search_query=8%3A1+MUX+truth+table+selection+lines"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1 text-[11px] font-semibold"
              >
                Find MUX selection-line lessons <ExternalLink size={11} />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-indigo-300">Suggested Learning Order:</span>
            <p className="text-slate-400">
              First watch a basic MUX explanation, then a Boolean-function implementation lesson, then practice the 10 worked examples on this page.
            </p>
          </div>
        </section>
      )}

      {/* TAB 7: CUSTOM MUX SANDBOX (INTERACTIVE BUILDER) */}
      {activeTab === "customBuilder" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">07</div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 8:1 MUX Function Sandbox</h2>
                <p className="text-xs text-slate-400">Toggle any minterms (0 to 15) to dynamically synthesize the implementation table</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Active: {customMinterms.length} / 16 Minterms
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-3">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
              Click Minterm Chips to Toggle in Σ:
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono text-xs">
              {Array.from({ length: 16 }, (_, i) => {
                const isActive = customMinterms.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleMinterm(i)}
                    className={clsx(
                      "py-2 px-2 rounded-lg border font-bold transition cursor-pointer flex items-center justify-center gap-1",
                      isActive
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-md shadow-rose-500/20"
                        : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-200"
                    )}
                  >
                    <span>m{i}</span>
                    {isActive && <Check size={11} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC RESULT CARD */}
          <WorkedExampleCard
            problem={{
              id: "Custom",
              mins: customMinterms,
              title: "Your Custom 4-Variable Function Realization",
              subtitle: "Synthesized in Real Time using Textbook Section 2.3.4A Method",
              tag: "Interactive Sandbox"
            }}
            index={0}
          />
        </section>
      )}

      {/* TAB 8: 15 ESSENTIAL FAQS (STANDALONE TAB) */}
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
        headline="Sukanta Hui's Guidance on 8:1 MUX Implementation Mastery"
        note="Mastering all 10 examples on this page prepares you for any Boolean function question in Section B of the ISC Class 12 Computer Science examination. Remember: ordered sequence abcd always singles out variable a across rows a' (m0-m7) and a (m8-m15), while bcd controls select lines S2, S1, S0. Look vertically in each column: identical values give a constant (0 or 1), while differing values give a or a'. Practice drawing the 2-row table for each example!"
      />
    </div>
  );
};

export default Topic42;
