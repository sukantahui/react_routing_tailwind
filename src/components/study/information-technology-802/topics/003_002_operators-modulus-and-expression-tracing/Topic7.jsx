import React, { useState } from 'react';
import { 
  Layers, ArrowDown, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Check, ShieldAlert, Cpu, ListOrdered
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const PrecedenceLadderStudio = () => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  const testCases = [
    {
      title: "1. The Division vs Multiplication Tie-Breaker",
      expression: "20 / 4 * 2",
      badge: "L-to-R Associativity",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      steps: [
        {
          step: "Step 1: Check Precedence",
          desc: "Both `/` and `*` belong to the same Multiplicative level (Rank 3).",
          activeCode: "20 / 4 * 2"
        },
        {
          step: "Step 2: Apply Associativity (Left-to-Right)",
          desc: "Since they share equal precedence, evaluate from Left-to-Right. Compute `20 / 4` first.",
          activeCode: "(20 / 4) * 2  -->  5 * 2"
        },
        {
          step: "Step 3: Final Multiplication",
          desc: "`5 * 2 = 10`.",
          activeCode: "10"
        }
      ],
      result: "10",
      commonMistake: "Computing `4 * 2 = 8` first and getting `20 / 8 = 2` (WRONG! Multiplication does NOT outrank division)."
    },
    {
      title: "2. Multi-Operator Arithmetic Hierarchy",
      expression: "10 + 20 * 30 / 10 - 5",
      badge: "Mixed Arithmetic",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      steps: [
        {
          step: "Step 1: Highest Operators (* and /)",
          desc: "Multiplicative operators have higher precedence than `+` and `-`. Left-most is `*`.",
          activeCode: "10 + (20 * 30) / 10 - 5  -->  10 + 600 / 10 - 5"
        },
        {
          step: "Step 2: Division (/)",
          desc: "Next multiplicative operator: `600 / 10`.",
          activeCode: "10 + (600 / 10) - 5  -->  10 + 60 - 5"
        },
        {
          step: "Step 3: Left-to-Right Addition & Subtraction",
          desc: "`+` and `-` have equal precedence. Left first: `10 + 60 = 70`. Then `70 - 5 = 65`.",
          activeCode: "(10 + 60) - 5  -->  70 - 5  -->  65"
        }
      ],
      result: "65",
      commonMistake: "Adding `10 + 20` first to get `30 * 30` (Violates BODMAS/PEMDAS precedence)."
    },
    {
      title: "3. Logical AND vs Logical OR Binding",
      expression: "true || false && false",
      badge: "&& Binds Tighter",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      steps: [
        {
          step: "Step 1: Precedence Check",
          desc: "Logical AND (`&&`) has higher precedence (Rank 11) than Logical OR (`||`) (Rank 12).",
          activeCode: "true || (false && false)"
        },
        {
          step: "Step 2: Evaluate AND Expression",
          desc: "`false && false` evaluates to `false`.",
          activeCode: "true || false"
        },
        {
          step: "Step 3: Final OR Evaluation",
          desc: "`true || false` evaluates to `true`. (Also short-circuits on `true`!)",
          activeCode: "true"
        }
      ],
      result: "true",
      commonMistake: "Evaluating left-to-right naively: `true || false` is true, then `true && false` is false (WRONG grouping!)."
    },
    {
      title: "4. Chained Assignment (Right-to-Left)",
      expression: "a = b = c = 15 + 5",
      badge: "Right-to-Left Associativity",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      steps: [
        {
          step: "Step 1: Arithmetic First",
          desc: "Addition `+` (Rank 4) has vastly higher precedence than assignment `=` (Rank 14). `15 + 5 = 20`.",
          activeCode: "a = b = c = 20"
        },
        {
          step: "Step 2: Right-to-Left Assignment",
          desc: "Assignment `=` associates Right-to-Left. `c = 20` occurs first, evaluating to 20.",
          activeCode: "a = b = (c = 20)  -->  c is 20"
        },
        {
          step: "Step 3: Cascade to Left",
          desc: "`b = 20`, then `a = 20`. All three variables hold 20.",
          activeCode: "a = 20, b = 20, c = 20"
        }
      ],
      result: "a=20, b=20, c=20",
      commonMistake: "Assuming assignments happen from left to right."
    }
  ];

  const currentCase = testCases[selectedCaseIdx];

  const ladderLevels = [
    { rank: "1 (Highest)", category: "Postfix", ops: "expr++, expr--", assoc: "Left to Right", color: "text-rose-400" },
    { rank: "2", category: "Unary", ops: "++expr, --expr, +expr, -expr, !, ~", assoc: "Right to Left", color: "text-pink-400" },
    { rank: "3", category: "Multiplicative", ops: "*, /, %", assoc: "Left to Right", color: "text-amber-400" },
    { rank: "4", category: "Additive", ops: "+, -", assoc: "Left to Right", color: "text-yellow-400" },
    { rank: "5", category: "Shift", ops: "<<, >>, >>>", assoc: "Left to Right", color: "text-lime-400" },
    { rank: "6", category: "Relational", ops: "<, >, <=, >=, instanceof", assoc: "Left to Right", color: "text-emerald-400" },
    { rank: "7", category: "Equality", ops: "==, !=", assoc: "Left to Right", color: "text-teal-400" },
    { rank: "8-10", category: "Bitwise", ops: "&, ^, |", assoc: "Left to Right", color: "text-cyan-400" },
    { rank: "11", category: "Logical AND", ops: "&&", assoc: "Left to Right", color: "text-sky-400" },
    { rank: "12", category: "Logical OR", ops: "||", assoc: "Left to Right", color: "text-indigo-400" },
    { rank: "13", category: "Ternary", ops: "? :", assoc: "Right to Left", color: "text-purple-400" },
    { rank: "14 (Lowest)", category: "Assignment", ops: "=, +=, -=, *=, /=, %=", assoc: "Right to Left", color: "text-fuchsia-400" }
  ];

  return (
    <div className="space-y-8 mb-12">
      {/* Interactive Conflict Resolver Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Cpu className="w-3.5 h-3.5" /> Step-by-Step Expression Conflict Resolver
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Precedence & Associativity In Action
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Select a classic CBSE trap to trace evaluation order
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {testCases.map((tc, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCaseIdx(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedCaseIdx === idx
                  ? `${tc.bg} ${tc.border} border-2 shadow-lg shadow-black/40`
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-1 ${
                selectedCaseIdx === idx ? tc.color : 'text-slate-500'
              }`}>
                {tc.badge}
              </span>
              <p className="text-xs font-mono font-bold text-white truncate">
                {tc.expression}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Expression Detail Box */}
        <div className="bg-slate-950 rounded-xl p-5 sm:p-6 border border-slate-800 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className={currentCase.color}>{currentCase.title}</span>
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              Expression: <code className="text-amber-300 font-bold">{currentCase.expression}</code>
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 my-4">
            {currentCase.steps.map((st, sIdx) => (
              <div key={sIdx} className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/60">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-200">{st.step}</span>
                    <code className="text-xs font-mono text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {st.activeCode}
                    </code>
                  </div>
                  <p className="text-xs text-slate-400">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Result & Trap Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-emerald-300">
              <span className="font-bold flex items-center gap-1.5 mb-1 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Final Evaluated Value:
              </span>
              <span className="text-sm font-mono font-extrabold text-white">{currentCase.result}</span>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg text-rose-300">
              <span className="font-bold flex items-center gap-1.5 mb-1 text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Common CBSE Exam Pitfall:
              </span>
              <span>{currentCase.commonMistake}</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Master Precedence Ladder Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4">
          <ListOrdered className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The Complete Java Operator Precedence Ladder
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Memorize the 14 levels: Postfix is highest, Assignment is lowest. Notice that only Unary, Ternary, and Assignment associate from <strong className="text-purple-300">Right to Left</strong>; all other binary operators associate <strong className="text-sky-300">Left to Right</strong>.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Precedence Rank</th>
                <th className="py-3 px-4 font-semibold">Operator Category</th>
                <th className="py-3 px-4 font-semibold">Operators</th>
                <th className="py-3 px-4 font-semibold">Associativity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/50 font-mono">
              {ladderLevels.map((lvl, index) => (
                <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-slate-400">{lvl.rank}</td>
                  <td className={`py-2.5 px-4 font-sans font-semibold ${lvl.color}`}>{lvl.category}</td>
                  <td className="py-2.5 px-4 text-emerald-300">{lvl.ops}</td>
                  <td className="py-2.5 px-4 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                      lvl.assoc === "Right to Left" 
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                        : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                    }`}>
                      {lvl.assoc}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function Topic7() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Layers className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Operator Precedence & Associativity Rules
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master the exact evaluation sequence of compound expressions, resolve equal-precedence tie-breakers with Left-to-Right and Right-to-Left associativity, and avoid classic board exam traps.
        </p>
      </div>

      {/* Interactive Studio */}
      <div className="max-w-6xl mx-auto">
        <PrecedenceLadderStudio />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Operator Precedence & Associativity Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Operator Precedence & Associativity" 
          description="Master 25 exam-style questions covering operator precedence tiers, associativity tie-breakers, logical AND over OR binding, and chained assignments with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Whenever you encounter an expression like '100 / 10 * 2', remember that multiplication and division have EQUAL precedence! They do NOT follow BODMAS where division comes first; in Java, they evaluate strictly Left-to-Right, giving '(100 / 10) * 2 = 20'. And for Right-to-Left associativity, remember the three exceptions: Unary operators, Ternary (? :), and Assignment (=, +=, etc.)!" 
        />
      </div>
    </div>
  );
}
