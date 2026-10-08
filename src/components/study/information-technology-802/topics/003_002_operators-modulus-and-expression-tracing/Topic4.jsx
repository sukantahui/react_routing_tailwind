import React, { useState } from 'react';
import { 
  GitBranch, Play, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, 
  ShieldCheck, RefreshCw, Code, Terminal, FileCode, 
  Check, Layers, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ExpressionTraceStudio = () => {
  const [activeStep, setActiveStep] = useState(0);

  const classicSteps = [
    {
      step: 0,
      title: "Initial State in Memory",
      astNode: "int x = 5;",
      highlight: "x = 5",
      ramState: { x: 5 },
      explanation: "Variable x is declared and initialized to 5 in stack memory. The expression 'x = ((++x) * 2) + 7;' is loaded for evaluation.",
      badge: "Initialization"
    },
    {
      step: 1,
      title: "Step 1: Evaluate Innermost Parentheses (++x)",
      astNode: "((++x) * 2) + 7",
      highlight: "(++x) -> 6",
      ramState: { x: 6 },
      explanation: "Pre-increment '++x' executes first. It increments x from 5 to 6 in memory, and immediately yields the updated value 6.",
      badge: "Pre-Increment"
    },
    {
      step: 2,
      title: "Step 2: Multiplication (6 * 2)",
      astNode: "(6 * 2) + 7",
      highlight: "6 * 2 -> 12",
      ramState: { x: 6 },
      explanation: "The yielded value 6 is multiplied by 2, producing 12. Notice x in memory remains 6.",
      badge: "Multiplication"
    },
    {
      step: 3,
      title: "Step 3: Addition (12 + 7)",
      astNode: "12 + 7",
      highlight: "12 + 7 -> 19",
      ramState: { x: 6 },
      explanation: "The sub-result 12 is added to literal 7, completing the entire right-hand side with value 19.",
      badge: "Addition"
    },
    {
      step: 4,
      title: "Step 4: Assignment (x = 19)",
      astNode: "x = 19;",
      highlight: "Final x = 19",
      ramState: { x: 19 },
      explanation: "Finally, the assignment operator '=' writes the computed value 19 back into variable x in memory.",
      badge: "Final Assignment"
    }
  ];

  const cur = classicSteps[activeStep];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase">
            <GitBranch className="w-4 h-4" />
            <span>CBSE Master Expression Trace Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Deconstructing: <code className="text-indigo-300">x = ((++x) * 2) + 7</code> (Initial x = 5 $\to$ Result: 19)
          </h3>
        </div>
        <button
          onClick={() => setActiveStep(prev => (prev + 1) % classicSteps.length)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-indigo-500/20"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{activeStep === classicSteps.length - 1 ? "Restart Trace" : "Next Evaluation Step"}</span>
        </button>
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {classicSteps.map((st, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? "bg-indigo-500/15 border-indigo-500/50 border-2 shadow-lg shadow-indigo-500/10"
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800 text-slate-500"
                }`}>
                  Step {idx}
                </span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
              </div>
              <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-slate-300"}`}>
                {st.badge}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AST Node & Logic */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{cur.title}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
              {cur.badge}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-mono">AST Expression State:</div>
            <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-base font-bold text-amber-300">
              {cur.astNode}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              Evaluation Mechanism:
            </span>
            <p className="leading-relaxed">{cur.explanation}</p>
          </div>
        </div>

        {/* Live RAM Memory State */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4 shadow-xl shadow-indigo-500/5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Stack Frame RAM Inspector</span>
            </div>
            <span className="text-xs font-mono text-emerald-400">Live Memory State</span>
          </div>

          <div className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs space-y-3">
            <div className="text-slate-500">// Stack Frame: main()</div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Variable: <strong className="text-white">x</strong></span>
              <span className="text-xl font-black text-emerald-400">{cur.ramState.x}</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-900">
              Operation Yield: <strong className="text-amber-300">{cur.highlight}</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              <strong>CBSE Marking Scheme:</strong> State step-1 `(++x)` becomes 6, step-2 `6 * 2` is 12, step-3 `12 + 7` is 19. Final value of x is <strong>19</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic4() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <GitBranch className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_002 • Topic 4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Evaluating Complex Expressions: <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-400 bg-clip-text text-transparent">x = ((++x) * 2) + 7 (Result: 19)</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the systematic step-by-step tracing of nested parentheses, pre/post increment interactions, and operator precedence required to achieve perfect scores on CBSE Class 12 IT-802 expression questions.
        </p>
      </div>

      {/* Interactive Trace Studio */}
      <div className="max-w-6xl mx-auto">
        <ExpressionTraceStudio />
      </div>

      {/* Benchmark Reference Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Benchmark 1: a += ++a * 4 (Initial a = 3)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            1. a on left = 3<br />
            2. ++a * 4 = 4 * 4 = 16<br />
            3. a = 3 + 16 = 19 (Final a = 19)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Benchmark 2: b = a++ + a++ * a++ (Initial a = 2)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            1. 1st a++ yields 2 (a=3)<br />
            2. 2nd a++ yields 3, 3rd a++ yields 4 (3 * 4 = 12)<br />
            3. b = 2 + 12 = 14 (Final b = 14, a = 5)
          </p>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Expression Tracing Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Complex Expression Tracing" 
          description="Master high-yield expression evaluation questions with step-by-step mathematical workings and bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="In expression tracing questions like 'x = ((++x) * 2) + 7', CBSE examiners look for step-by-step intermediate working. Always show: (1) Value yielded by (++x), (2) Multiplication result, and (3) Addition with 7. Writing the final answer '19' with intermediate working guarantees full marks!" 
        />
      </div>
    </div>
  );
}
