import React, { useState } from 'react';
import {
  Sparkles, Layers, BookOpen, Code, CheckCircle2,
  AlertTriangle, HelpCircle, ShieldCheck, FileText,
  Activity, ArrowRight, Check, Play, RefreshCw, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/duality_principle_engine.py?raw";

// Interactive Duality vs Complement Converter Component
const DualityWorkbench = () => {
  const [selectedExample, setSelectedExample] = useState('ex1');

  const examples = {
    ex1: {
      name: "F = A + B · C (Distributive Dual)",
      original: "A + (B · C)",
      dual: "A · (B + C)",
      complement: "A' · (B' + C')",
      explanation: "Swap + with ·, · with +. Variables A, B, C remain uncomplemented."
    },
    ex2: {
      name: "Identity: A + 0 = A",
      original: "A + 0 = A",
      dual: "A · 1 = A",
      complement: "A' · 1 = A'",
      explanation: "Swap + with ·, constant 0 with 1. Proves dual identity is automatically valid."
    },
    ex3: {
      name: "Absorption: A + A'B = A + B",
      original: "A + A' · B = A + B",
      dual: "A · (A' + B) = A · B",
      complement: "A' · (A + B') = A' · B'",
      explanation: "Note that A' remains A' in the dual; variables are never inverted."
    },
    ex4: {
      name: "F = AB + B'C + 0",
      original: "(A · B) + (B' · C) + 0",
      dual: "(A + B) · (B' + C) · 1",
      complement: "(A' + B') · (B + C') · 1",
      explanation: "Inner products become sums, sums become products, 0 becomes 1."
    }
  };

  const current = examples[selectedExample];

  return (
    <div className="bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Duality Principle &amp; Complement Converter
            </h3>
            <p className="text-xs text-slate-400">
              Select expressions to contrast the Dual (F*) with the Logical Complement (F&apos;).
            </p>
          </div>
        </div>

        {/* Rule Reminder Pill */}
        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
          Rule: Swap + &harr; · and 0 &harr; 1 (Variables Unchanged)
        </span>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(examples).map(([k, item]) => (
          <button
            key={k}
            onClick={() => setSelectedExample(k)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              selectedExample === k
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* 3-Way Comparison Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Original */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">1. Original Expression (F)</span>
          <div className="text-white font-bold text-sm bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
            {current.original}
          </div>
          <span className="text-[11px] text-slate-400 block font-sans">Starting Boolean equation</span>
        </div>

        {/* Dual */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-500/30 space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] rounded-bl-lg font-sans font-bold">
            Duality Rule
          </div>
          <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold block">2. Dual Expression (F*)</span>
          <div className="text-amber-300 font-bold text-sm bg-slate-950 p-2.5 rounded-lg border border-amber-500/40">
            {current.dual}
          </div>
          <span className="text-[11px] text-emerald-400 block font-sans">✓ Variables stay intact!</span>
        </div>

        {/* Complement */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-rose-500/30 space-y-2">
          <span className="text-[10px] text-rose-400 uppercase tracking-wider font-bold block">3. Complement (F&apos; via De Morgan)</span>
          <div className="text-rose-300 font-bold text-sm bg-slate-950 p-2.5 rounded-lg border border-rose-500/40">
            {current.complement}
          </div>
          <span className="text-[11px] text-rose-400 block font-sans">⚠ Variables ARE inverted!</span>
        </div>
      </div>

      {/* Explanatory Walkthrough */}
      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5 font-sans">
        <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Formulation Insight: </strong>
          {current.explanation}
        </div>
      </div>
    </div>
  );
};

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 8
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Duality Principle
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Duality Principle: Formulating Duals of Boolean Expressions &amp; Equations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the Principle of Duality in Boolean algebra. Learn the 4 golden rules for generating dual equations, understand why proving one theorem automatically validates its dual, and master the crucial distinction between Dual ($F^*$) and Complement ($F&apos;$).
            </p>
          </div>
        </div>

        {/* 2. Deep Conceptual Explanation */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                The 4 Golden Rules of Duality
              </h2>
              <p className="text-xs text-slate-400">
                Systematic transformation rules to formulate the dual of any valid Boolean expression.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <h3 className="text-base font-bold text-white">The 4 Transformation Rules:</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong className="text-sky-300">Rule 1:</strong> Change every <code className="font-mono text-sky-300">+</code> (Logical OR) to <code className="font-mono text-sky-300">·</code> (Logical AND).</li>
                <li><strong className="text-sky-300">Rule 2:</strong> Change every <code className="font-mono text-sky-300">·</code> (Logical AND) to <code className="font-mono text-sky-300">+</code> (Logical OR).</li>
                <li><strong className="text-emerald-300">Rule 3:</strong> Change every constant <code className="font-mono text-emerald-300">0</code> to <code className="font-mono text-emerald-300">1</code>.</li>
                <li><strong className="text-emerald-300">Rule 4:</strong> Change every constant <code className="font-mono text-emerald-300">1</code> to <code className="font-mono text-emerald-300">0</code>.</li>
              </ul>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} /> Crucial Rule: Variables are NOT Inverted!
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In finding the Dual, variable states remain untouched! Variable <code className="font-mono text-white">A</code> remains <code className="font-mono text-white">A</code>, and complemented variable <code className="font-mono text-white">B&apos;</code> remains <code className="font-mono text-white">B&apos;</code>. If you invert variables, you are calculating the <strong>Complement</strong> ($F&apos;$), not the <strong>Dual</strong> ($F^*$).
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Duality Workbench */}
        <DualityWorkbench />

        {/* 4. Dual vs Complement Comparison Table */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Dual (F*) vs Complement (F&apos;) Comparison Matrix
              </h2>
              <p className="text-xs text-slate-400">
                High-yield conceptual comparison for CBSE Class XI examination.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="p-3">Attribute</th>
                  <th className="p-3 text-amber-400">Dual of Expression (F*)</th>
                  <th className="p-3 text-rose-400">Complement of Expression (F&apos;)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Operators (+ and ·)</td>
                  <td className="p-3 text-emerald-400">Interchanged (+ &harr; ·)</td>
                  <td className="p-3 text-emerald-400">Interchanged (+ &harr; ·) via De Morgan</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Constants (0 and 1)</td>
                  <td className="p-3 text-emerald-400">Interchanged (0 &harr; 1)</td>
                  <td className="p-3 text-emerald-400">Interchanged (0 &harr; 1)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Variables (A, B, C)</td>
                  <td className="p-3 text-amber-400 font-bold">UNCHANGED (A stays A)</td>
                  <td className="p-3 text-rose-400 font-bold">COMPLEMENTED (A becomes A&apos;)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">Example for F = A + B&apos;</td>
                  <td className="p-3 text-amber-300">F* = A · B&apos;</td>
                  <td className="p-3 text-rose-300">F&apos; = A&apos; · B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Python File Loader */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Duality Principle Verification Script
            </h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="duality_principle_engine.py"
            highlightLines={[12, 13, 14, 15, 38, 48]}
          />
        </div>

        {/* 6. Real-World Applications */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                CMOS Silicon Hardware Duality
              </h2>
              <p className="text-xs text-slate-400">
                How duality governs complementary transistor pairs in microprocessors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">CMOS Circuit Topology</span>
              <h3 className="text-base font-bold text-white">Pull-Up vs Pull-Down Transistor Networks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In CMOS integrated circuit layout, the PMOS pull-up network is always the exact topological <strong>Dual</strong> of the NMOS pull-down network. Series NMOS switches correspond to parallel PMOS switches.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Proof Acceleration</span>
              <h3 className="text-base font-bold text-white">Halving Mathematical Proof Effort</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Because duality guarantees theorem preservation, mathematics and chip design textbooks only need to prove one half of every Boolean identity pair.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Best Practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} /> Common Exam Mistakes
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-rose-300">Inverting Variables:</strong> Changing <code className="font-mono text-rose-300">A</code> to <code className="font-mono text-rose-300">A&apos;</code> produces the complement, which gets 0 marks for a duality question!
              </li>
              <li>
                <strong className="text-rose-300">Missing Constants:</strong> Forgetting to change <code className="font-mono text-rose-300">0</code> to <code className="font-mono text-rose-300">1</code> or <code className="font-mono text-rose-300">1</code> to <code className="font-mono text-rose-300">0</code>.
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 size={18} /> Pro Duality Strategy
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-emerald-300">Retain Parentheses:</strong> Ensure groupings like <code className="font-mono text-emerald-300">A · (B + C)</code> become <code className="font-mono text-emerald-300">A + (B · C)</code>.
              </li>
              <li>
                <strong className="text-emerald-300">Write Duality Steps:</strong> State: &quot;Replacing + with · and · with + yields the dual expression.&quot;
              </li>
            </ul>
          </div>
        </div>

        {/* 8. Hint Section */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
          <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-slate-300">
            <strong className="text-amber-400 font-semibold">Teacher&apos;s Memory Hook:</strong>
            <p className="mt-1">
              To remember Duality: <em>&quot;Swap the signs (+ and ·), swap the numbers (0 and 1), but leave the letters completely untouched!&quot;</em>
            </p>
          </div>
        </div>

        {/* 9. Frequently Asked Questions */}
        <FAQTemplate
          title="CBSE Class XI Computer Science (083) – Duality Principle FAQs"
          questions={questions}
        />

        {/* 10. Plain Text Printable Document */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XI CS 083 – Duality Principle Quick Revision"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Plain Text Note"
          downloadFileName="topic8_note.txt"
        />

        {/* 11. Teacher's Note */}
        <Teacher
          note="Questions asking 'State the principle of duality and write the dual of the given expression' are frequent 2-mark questions in CBSE Class XI Computer Science (083). Always remember: DO NOT touch the primes/bars on variables when finding the dual! — Sukanta Hui"
        />

      </div>
    </div>
  );
}
