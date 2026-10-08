import React, { useState } from 'react';
import { 
  Terminal, Play, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, 
  RefreshCw, Code, Layers, FileCode, Check, 
  MessageSquare, CornerDownLeft, Eye
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const ConsoleOutputEmulator = () => {
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);

  const snippets = [
    {
      title: "1. print() vs println() Mechanics",
      badge: "Cursor Movement",
      code: `System.out.print("CBSE ");\nSystem.out.print("Class ");\nSystem.out.println("XII");\nSystem.out.print("IT (Code 802)");`,
      steps: [
        { line: 'System.out.print("CBSE ");', console: 'CBSE ', cursor: 'stays on line 1 after space' },
        { line: 'System.out.print("Class ");', console: 'CBSE Class ', cursor: 'stays on line 1 after space' },
        { line: 'System.out.println("XII");', console: 'CBSE Class XII\n', cursor: 'appends XII and jumps to line 2' },
        { line: 'System.out.print("IT (Code 802)");', console: 'CBSE Class XII\nIT (Code 802)', cursor: 'prints on line 2' }
      ],
      output: `CBSE Class XII\nIT (Code 802)`,
      explanation: "Notice how the first three print statements build 'CBSE Class XII' on Line 1. The println() moves the cursor to Line 2, so 'IT (Code 802)' appears on the second line."
    },
    {
      title: "2. String Concatenation Trap (No Parentheses)",
      badge: "Left-to-Right String Conversion",
      code: `int a = 10, b = 20;\nSystem.out.println("Total = " + a + b);`,
      steps: [
        { line: 'int a = 10, b = 20;', console: '', cursor: 'variables loaded on stack' },
        { line: '"Total = " + a -> "Total = 10"', console: '', cursor: 'evaluates string + int -> string' },
        { line: '"Total = 10" + b -> "Total = 1020"', console: 'Total = 1020\n', cursor: 'concatenates 20 as text' }
      ],
      output: `Total = 1020`,
      explanation: "Classic CBSE Exam Trap! Because '+' evaluates left-to-right, '\"Total = \" + 10' produces the String '\"Total = 10\"'. Then '\"Total = 10\" + 20' concatenates 20 as text, yielding 'Total = 1020' instead of 30!"
    },
    {
      title: "3. Addition First with Parentheses",
      badge: "Parentheses Precedence",
      code: `int a = 10, b = 20;\nSystem.out.println("Total = " + (a + b));`,
      steps: [
        { line: '(a + b) evaluated first -> 30', console: '', cursor: 'parentheses enforce numeric addition' },
        { line: '"Total = " + 30 -> "Total = 30"', console: 'Total = 30\n', cursor: 'concatenates string + sum' }
      ],
      output: `Total = 30`,
      explanation: "Parentheses '(a + b)' force mathematical addition (10 + 20 = 30) before String concatenation occurs."
    },
    {
      title: "4. Numbers on Left First",
      badge: "Arithmetic Before String",
      code: `int a = 10, b = 20;\nSystem.out.println(a + b + " is the Total");`,
      steps: [
        { line: 'a + b evaluated first -> 30', console: '', cursor: 'both operands are integers -> 30' },
        { line: '30 + " is the Total"', console: '30 is the Total\n', cursor: 'converts 30 to string' }
      ],
      output: `30 is the Total`,
      explanation: "When two numbers appear on the left, standard integer addition executes first (10 + 20 = 30), and only then is the result concatenated with the trailing String."
    },
    {
      title: "5. Escape Sequences in Action",
      badge: "Tabs & Quotes",
      code: `System.out.println("School:\\t\\"Central Academy\\"\\nCity:\\tBarrackpore\\nSet:\\tSET\\\\A");`,
      steps: [
        { line: '\\t inserts horizontal tab', console: '', cursor: 'tabs aligned' },
        { line: '\\" embeds literal quotes', console: '', cursor: 'quotes preserved' },
        { line: '\\n breaks line', console: '', cursor: 'jumps to new line' },
        { line: '\\\\ prints single backslash', console: '', cursor: 'backslash escaped' }
      ],
      output: `School:\t"Central Academy"\nCity:\tBarrackpore\nSet:\tSET\\A`,
      explanation: "Escape sequences allow formatting inside strings: \\n (newline), \\t (tab), \\\" (quotes), and \\\\ (single backslash)."
    }
  ];

  const cur = snippets[activeSnippetIdx];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            <Terminal className="w-4 h-4" />
            <span>Interactive Java Console Output Emulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            <code className="text-emerald-300">print()</code> vs <code className="text-emerald-300">println()</code> & String Concatenation
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          STDOUT Simulator
        </div>
      </div>

      {/* Snippet Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {snippets.map((snip, idx) => {
          const isActive = activeSnippetIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveSnippetIdx(idx)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? "bg-emerald-500/10 border-emerald-500/40 border-2 shadow-lg shadow-emerald-500/10"
                  : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400"
              }`}
            >
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
              }`}>
                Case {idx + 1}
              </span>
              <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-slate-300"}`}>
                {snip.title.split(". ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Snippet & Live Terminal */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code View */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>OutputDemo.java</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300">
              {cur.badge}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-amber-200/90 overflow-x-auto">
            <pre className="whitespace-pre-wrap leading-relaxed">{cur.code}</pre>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-slate-400 block uppercase tracking-wider text-[10px]">
              How Java Evaluates This:
            </span>
            <p className="leading-relaxed">{cur.explanation}</p>
          </div>
        </div>

        {/* Console Terminal Screen */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4 shadow-xl shadow-emerald-500/5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">Console Terminal (STDOUT)</span>
            </div>
            <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Output Ready
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 min-h-[140px] flex flex-col justify-between">
            <pre className="whitespace-pre-wrap leading-relaxed">{cur.output}</pre>
            <div className="flex items-center gap-1 text-slate-600 text-[10px] pt-4 border-t border-slate-900">
              <CornerDownLeft className="w-3 h-3 text-emerald-500" />
              <span>Program exited with status 0</span>
            </div>
          </div>

          {/* Trace Steps Checklist */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Step-by-Step Evaluation Trace:
            </span>
            <div className="space-y-1 text-xs">
              {cur.steps.map((step, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-300">{step.line}</span>
                  <span className="text-emerald-400 text-[10px]">{step.cursor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic5() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Terminal className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Standard Output Statements: <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">System.out.print() vs System.out.println()</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Master the exact difference between cursor movement in <code className="text-emerald-300 font-mono">print()</code> and <code className="text-emerald-300 font-mono">println()</code>, string concatenation evaluation traps with the <code className="text-amber-300 font-mono">+</code> operator, and escape sequence formatting.
        </p>
      </div>

      {/* Interactive Console Emulator */}
      <div className="max-w-6xl mx-auto">
        <ConsoleOutputEmulator />
      </div>

      {/* Quick Summary Reference Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Code className="w-4 h-4" />
            <span>1. System.out.print()</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Outputs text and leaves the cursor at the end of the printed line. Subsequent prints remain on the same line.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CornerDownLeft className="w-4 h-4" />
            <span>2. System.out.println()</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Outputs text and appends a newline (<code className="text-amber-300">\n</code>), moving cursor to the beginning of the next line.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>3. String Concatenation (+)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Evaluates left to right. <code className="text-amber-300">"A" + 1 + 2 = "A12"</code>, but <code className="text-emerald-300">1 + 2 + "A" = "3A"</code>.
          </p>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Output Statements Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Output Statements & Concatenation" 
          description="Test your ability to predict exact console output lines, String concatenation results, and escape sequences in CBSE IT-802 papers." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          location="Barrackpore, Kolkata" 
          note={`CBSE board exam questions frequently ask: 'What will be the output of System.out.println("Score: " + 50 + 50);?' Remember that it prints 'Score: 5050' because string concatenation happens from left to right. To get 100, you must put parentheses: ("Score: " + (50 + 50))!`}
        />
      </div>
    </div>
  );
}
