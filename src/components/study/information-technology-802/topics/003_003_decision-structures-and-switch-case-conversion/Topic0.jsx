import React, { useState } from 'react';
import { 
  GitBranch, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, Sliders, Check, Flame, XCircle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const BranchingVisualizer = () => {
  const [activeTab, setActiveTab] = useState('ladder'); // 'ladder', 'semicolon', 'dangling'
  const [marks, setMarks] = useState(72);
  const [hasSemicolon, setHasSemicolon] = useState(false);
  const [useBraces, setUseBraces] = useState(false);
  const [xVal, setXVal] = useState(8);
  const [yVal, setYVal] = useState(3);

  // Ladder evaluation
  const ladderSteps = [
    { condition: "marks >= 90", test: marks >= 90, grade: "A+", desc: "Outstanding Performance" },
    { condition: "marks >= 75", test: marks >= 75, grade: "A", desc: "Distinction Performance" },
    { condition: "marks >= 60", test: marks >= 60, grade: "B", desc: "First Division" },
    { condition: "marks >= 40", test: marks >= 40, grade: "C", desc: "Passing Grade" },
    { condition: "else (Default)", test: true, grade: "D / Remedial", desc: "Needs Academic Support" }
  ];

  let matchedIdx = -1;
  for (let i = 0; i < ladderSteps.length; i++) {
    if (ladderSteps[i].test) {
      matchedIdx = i;
      break;
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <GitBranch className="w-3.5 h-3.5" /> Interactive Control Flow Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Decision Structures & Execution Path Explorer
          </h2>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'ladder', label: '1. If-Else Ladder' },
            { id: 'semicolon', label: '2. Semicolon Trap' },
            { id: 'dangling', label: '3. Dangling Else' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: If-Else-If Ladder */}
      {activeTab === 'ladder' && (
        <div className="space-y-6">
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Adjust Student Marks: <span className="text-emerald-400 text-base font-bold font-mono">{marks}</span> / 100
              </label>
              <span className="text-xs text-slate-400">
                Awarded Grade: <strong className="text-white font-mono">{ladderSteps[matchedIdx].grade}</strong>
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>0 (Fail)</span>
              <span>40 (Pass)</span>
              <span>60 (1st Div)</span>
              <span>75 (Distinction)</span>
              <span>100 (Max)</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid gap-3 font-mono text-xs">
            {ladderSteps.map((step, idx) => {
              const isMatched = idx === matchedIdx;
              const isSkipped = idx > matchedIdx;
              const isEvaluatedFalse = idx < matchedIdx;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isMatched
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 shadow-lg shadow-emerald-950/20'
                      : isSkipped
                        ? 'bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-60'
                        : 'bg-rose-500/5 border-rose-500/20 text-rose-300/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isMatched 
                          ? 'bg-emerald-500 text-slate-950' 
                          : isSkipped 
                            ? 'bg-slate-800 text-slate-500' 
                            : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {idx === 4 ? 'DEFAULT' : `CHECK ${idx + 1}`}
                      </span>
                      <span className="font-bold text-white">
                        {idx === 0 ? 'if' : idx === 4 ? 'else' : 'else if'} ({step.condition})
                      </span>
                    </div>

                    <span className={`text-[11px] font-sans font-semibold ${
                      isMatched 
                        ? 'text-emerald-400' 
                        : isSkipped 
                          ? 'text-slate-600' 
                          : 'text-rose-400'
                    }`}>
                      {isMatched ? '✓ MATCHED & EXECUTED' : isSkipped ? '⚡ BYPASSED' : '✗ EVALUATED FALSE'}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] font-sans text-slate-300 flex items-center justify-between border-t border-slate-800/60 pt-2">
                    <span>Grade assigned: <code className="text-white font-mono font-bold">{step.grade}</code> ({step.desc})</span>
                    {isMatched && <span className="text-emerald-400 text-xs font-semibold">Terminates ladder immediately!</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Semicolon Trap */}
      {activeTab === 'semicolon' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">Toggle Accidental Semicolon</h4>
              <p className="text-xs text-slate-400">See what happens when an accidental semicolon is placed right after <code className="text-amber-400 font-mono">if (x &gt; 10);</code></p>
            </div>
            <button
              onClick={() => setHasSemicolon(!hasSemicolon)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                hasSemicolon 
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-950' 
                  : 'bg-emerald-600 text-white border-emerald-500'
              }`}
            >
              {hasSemicolon ? 'Semicolon PRESENT: `if (x > 10);`' : 'Clean Syntax: `if (x > 10)`'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
              <span className="text-slate-500">// Java Code</span>
              <p className="text-purple-300 mt-1">int x = 5;</p>
              <p className="text-sky-300">
                if (x &gt; 10){hasSemicolon ? <span className="bg-rose-500 text-white px-1 font-bold animate-pulse">;</span> : ''}
              </p>
              <p className="text-slate-300 pl-4">{'{'}</p>
              <p className="text-amber-300 pl-8">System.out.println("x is greater than 10");</p>
              <p className="text-slate-300 pl-4">{'}'}</p>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              hasSemicolon ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
            }`}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1">
                  Terminal Output:
                </span>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-white">
                  {hasSemicolon ? (
                    <span className="text-rose-400 font-bold">x is greater than 10 (BUG!)</span>
                  ) : (
                    <span className="text-slate-500 italic">(Nothing printed - Condition was false)</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {hasSemicolon ? (
                  <>⚠️ <strong>The CBSE Trap:</strong> The semicolon immediately terminates the if statement as an empty statement! The block below runs unconditionally, even though <code className="text-amber-300 font-mono">5 &gt; 10</code> is completely false!</>
                ) : (
                  <>✓ <strong>Correct Behavior:</strong> Without the semicolon, Java binds the block to the condition. Since <code className="text-emerald-300 font-mono">5 &gt; 10</code> is false, the block is safely bypassed.</>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dangling Else */}
      {activeTab === 'dangling' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">The Dangling Else Ambiguity</h4>
              <p className="text-xs text-slate-400">Toggle curly braces to control whether the `else` pairs with the inner `if` or outer `if`.</p>
            </div>
            <button
              onClick={() => setUseBraces(!useBraces)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                useBraces 
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-950' 
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {useBraces ? 'Braces Added: { inner if }' : 'No Braces (Compiler Default Binding)'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
              <span className="text-slate-500">// Variables: x = 10, y = 5</span>
              <p className="text-sky-300 mt-2">if (x &gt; 5) {useBraces ? '{' : ''}</p>
              <p className="text-purple-300 pl-4">if (y &gt; 10)</p>
              <p className="text-amber-300 pl-8">System.out.println("One");</p>
              {useBraces && <p className="text-sky-300 pl-4">{'}'}</p>}
              <p className="text-rose-400 pl-4">else</p>
              <p className="text-amber-300 pl-8">System.out.println("Two");</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-slate-400">
                  Evaluated Result:
                </span>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 font-bold">
                  {useBraces ? "Nothing printed (Outer else never triggers because x > 5 is true)" : "Outputs: 'Two'"}
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {useBraces ? (
                  <>By enclosing the inner if in braces, the <code className="text-rose-300 font-mono">else</code> is forced to bind to the <strong>outer if</strong>! Because <code className="text-sky-300 font-mono">x &gt; 5</code> is true, the outer else is bypassed.</>
                ) : (
                  <>Under standard Java rules, an <code className="text-rose-300 font-mono">else</code> binds to the <strong>closest preceding unmatched if</strong> (the inner <code className="text-purple-300 font-mono">y &gt; 10</code>). Since <code className="text-purple-300 font-mono">5 &gt; 10</code> is false, its else runs, printing "Two"!</>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <GitBranch className="w-4 h-4" /> CBSE Class 12 IT (Code 802) • Unit 3: Java Programming
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Conditional Branching in Java: Simple if, if-else & Ladders
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          Master linear vs branching execution, mutual exclusion in <code className="text-emerald-400 font-mono">if-else</code>, short-circuit ladder termination, the dangling else ambiguity, and dangerous semicolon traps.
        </p>
      </div>

      {/* Interactive Control Flow Studio */}
      <div className="max-w-6xl mx-auto">
        <BranchingVisualizer />
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Conditional Branching Revision Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Conditional Branching" 
          description="Master 25 exam-tested questions on if conditions, semicolon pitfalls, dangling else resolution, and short-circuit ladders with bilingual explanations." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Never write a semicolon after the parentheses of an if statement (e.g. 'if (x > 5);')! In CBSE practicals and board theory, examiners intentionally hide that semicolon. It immediately ends the if statement, making the code block below execute unconditionally! Also remember that in an if-else-if ladder, the very first true condition executes and skips all remaining branches." 
        />
      </div>
    </div>
  );
}
