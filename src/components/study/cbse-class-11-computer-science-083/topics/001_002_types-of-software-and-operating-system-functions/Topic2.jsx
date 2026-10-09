import React, { useState } from 'react';
import {
  Code, Cpu, Terminal, BookOpen, CheckCircle2,
  AlertTriangle, HelpCircle, FileText, Activity,
  ShieldCheck, ArrowRight, RefreshCw, Play,
  Sparkles, Layers, Sliders, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/compiler_vs_interpreter_benchmark.py?raw";

// Interactive Compiler vs Interpreter Execution Model Simulator
const TranslatorModelSimulator = () => {
  const [translatorMode, setTranslatorMode] = useState('compiler');
  const [executionState, setExecutionState] = useState('idle'); // idle, translating, error, success
  const [activeStep, setActiveStep] = useState(0);

  const sampleCode = [
    { line: 1, text: "a = 15", valid: true },
    { line: 2, text: "b = 30", valid: true },
    { line: 3, text: "sum_val = a + b", valid: true },
    { line: 4, text: "print % 99 (Syntax Error)", valid: false },
    { line: 5, text: "print('Result:', sum_val)", valid: true }
  ];

  const handleRun = () => {
    setExecutionState('translating');
    setActiveStep(1);

    if (translatorMode === 'compiler') {
      setTimeout(() => {
        setActiveStep(2);
        setTimeout(() => {
          setExecutionState('error');
        }, 600);
      }, 600);
    } else {
      // Interpreter steps line-by-line
      let currentLine = 1;
      const interval = setInterval(() => {
        currentLine++;
        setActiveStep(currentLine);
        if (currentLine === 4) {
          clearInterval(interval);
          setExecutionState('error');
        }
      }, 500);
    }
  };

  const handleReset = () => {
    setExecutionState('idle');
    setActiveStep(0);
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Code size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Language Processor Execution Engine: Compiler vs Interpreter
            </h3>
            <p className="text-xs text-slate-400">
              Observe how a batch compiler compares against a line-by-line interpreter on buggy source code.
            </p>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { setTranslatorMode('compiler'); handleReset(); }}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              translatorMode === 'compiler' ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Compiler (Batch Pass)
          </button>
          <button
            onClick={() => { setTranslatorMode('interpreter'); handleReset(); }}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              translatorMode === 'interpreter' ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Interpreter (Line-by-Line)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Source Code Panel */}
        <div className="lg:col-span-6 bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300 font-mono">source_program.py</span>
            <span className="text-[10px] uppercase font-bold text-amber-400">Contains 1 Error at Line 4</span>
          </div>

          <div className="font-mono text-xs space-y-1.5">
            {sampleCode.map((item) => {
              const isCurrentLine = translatorMode === 'interpreter' && activeStep === item.line;
              const hasError = !item.valid && executionState === 'error';
              return (
                <div
                  key={item.line}
                  className={`p-2 rounded-lg flex items-center justify-between border transition-all ${
                    hasError && (translatorMode === 'compiler' || isCurrentLine)
                      ? 'bg-rose-950/50 border-rose-500/80 text-rose-300'
                      : isCurrentLine
                      ? 'bg-amber-500/20 border-amber-500/80 text-amber-200'
                      : 'bg-slate-950 border-slate-850 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 select-none w-4">{item.line}</span>
                    <code>{item.text}</code>
                  </div>
                  {isCurrentLine && (
                    <span className="text-[10px] text-amber-400 font-bold animate-pulse">Executing &rarr;</span>
                  )}
                  {hasError && (
                    <span className="text-[10px] text-rose-400 font-bold">Syntax Error!</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleRun}
              disabled={executionState === 'translating'}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play size={14} /> Run {translatorMode === 'compiler' ? 'Compilation' : 'Interpretation'}
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Translation Output Diagnostics Panel */}
        <div className="lg:col-span-6 bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300">Diagnostic Output Window</span>
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">{translatorMode} Mode</span>
          </div>

          <div className="bg-slate-950 rounded-lg p-3 border border-slate-850 min-h-[190px] font-mono text-xs space-y-2">
            {executionState === 'idle' && (
              <p className="text-slate-500 italic">Click "Run" to initiate the {translatorMode} pipeline.</p>
            )}

            {executionState === 'translating' && (
              <div className="text-amber-300 space-y-1">
                {translatorMode === 'compiler' ? (
                  <>
                    <p>[*] Compiler parsing source AST and symbol tables...</p>
                    <p>[*] Analyzing scope and token hierarchy across entire file...</p>
                  </>
                ) : (
                  <p>[*] Interpreter translating and evaluating statement {activeStep}...</p>
                )}
              </div>
            )}

            {executionState === 'error' && translatorMode === 'compiler' && (
              <div className="text-rose-300 space-y-1.5">
                <p className="font-bold text-rose-400">[!] Compilation Aborted with 1 Fatal Syntax Error:</p>
                <div className="p-2 rounded bg-rose-950/80 border border-rose-800 text-[11px]">
                  <code>Line 4: SyntaxError: invalid syntax in expression 'print % 99'</code>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>CBSE Rule:</strong> A compiler analyzes the whole program at once. It produces 0 output / 0 object code until ALL errors are corrected.
                </p>
              </div>
            )}

            {executionState === 'error' && translatorMode === 'interpreter' && (
              <div className="text-rose-300 space-y-1.5">
                <p className="text-emerald-400">[+] Lines 1, 2, and 3 executed successfully in memory.</p>
                <p className="font-bold text-rose-400">[!] Runtime Crash at Line 4:</p>
                <div className="p-2 rounded bg-rose-950/80 border border-rose-800 text-[11px]">
                  <code>SyntaxError on Line 4: Execution halted immediately.</code>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>CBSE Rule:</strong> An interpreter halts at the exact line of the first error. Line 5 was never reached or executed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic2() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Topic 2
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Language Processors: Assembler, Compiler, and Interpreter
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Compare language translation paradigms, error reporting models, object code generation, and Python's hybrid Bytecode-PVM architecture.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Intuition & Analogy */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Book Translation vs Live UN Diplomat</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 flex items-center gap-1.5"><BookOpen size={14} /> The Compiler: Full Book Publisher</span>
              <p className="text-slate-300">
                A translator receives an entire 500-page English book, translates the whole text into Hindi, prints a brand-new Hindi book (the <strong>Object File</strong>), and hands it to readers. Once printed, anyone can read the Hindi book instantly without needing the translator present.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-sky-400 flex items-center gap-1.5"><Activity size={14} /> The Interpreter: Live UN Speech Interpreter</span>
              <p className="text-slate-300">
                A live diplomat interpreter stands next to the speaker, translating sentence-by-sentence in real time. If the speaker stumbles or speaks an unintelligible word (syntax error), the interpreter stops speaking immediately. No translated book is saved for later.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Core Comparison Table */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Comparative Analysis: Compiler vs Interpreter</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800">
              <thead className="bg-slate-950 text-slate-300 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Comparison Parameter</th>
                  <th className="p-3 text-purple-400">Compiler</th>
                  <th className="p-3 text-sky-400">Interpreter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Translation Methodology</td>
                  <td className="p-3">Translates entire program in one complete batch pass</td>
                  <td className="p-3">Translates and executes code statement by statement</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Error Reporting</td>
                  <td className="p-3">Lists all syntax errors at once after scanning the whole file</td>
                  <td className="p-3">Halts immediately upon the first error encountered</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Target Object Code</td>
                  <td className="p-3">Produces standalone machine object code (.exe / .obj)</td>
                  <td className="p-3">No permanent object code file generated</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Execution Speed</td>
                  <td className="p-3 text-emerald-400 font-bold">Fast (runs directly on CPU hardware)</td>
                  <td className="p-3 text-amber-300">Slower (translation overhead on every run)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">Representative Languages</td>
                  <td className="p-3 font-mono">C, C++, Rust, Go</td>
                  <td className="p-3 font-mono">Python, JavaScript, Ruby, PHP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <TranslatorModelSimulator />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Language Processor Benchmark Simulation</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic2_files/compiler_vs_interpreter_benchmark.py"
            fileContent={pythonCode}
          />
        </div>

        {/* 6. Pitfalls & Best Practices */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">CBSE Examination Pitfalls &amp; Answering Tips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Common Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Writing that an Assembler translates high-level code:</strong> Assemblers ONLY translate low-level Assembly mnemonics to machine code.</li>
                <li><strong>Claiming that an Interpreter creates an .exe file:</strong> Interpreters never save a standalone object file on disk.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Recommended Points</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Mention Python Bytecode:</strong> Explain that Python compiles source code to Bytecode (.pyc) before interpretation by the Python Virtual Machine.</li>
                <li><strong>Highlight error reporting differences:</strong> Explicitly mention "batch error reporting" vs "halt at first error".</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate questions={questions} />
        </div>

        {/* 8. Plain Text Printable */}
        <div className="space-y-4">
          <PlainTextPrint
            fileName="CBSE_Class11_CS_Topic2_Language_Processors_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Language Processors (Assembler, Compiler & Interpreter)"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
