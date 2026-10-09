import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, Calculator, Binary, Split
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const DigitExtractorVisualizer = () => {
  const [inputNum, setInputNum] = useState(4827);
  
  // Trace digits
  let temp = Math.abs(Number(inputNum)) || 0;
  const steps = [];
  let sum = 0;
  let rev = 0;
  let iteration = 1;

  while (temp > 0 && steps.length < 10) {
    const digit = temp % 10;
    const remaining = Math.floor(temp / 10);
    sum += digit;
    rev = (rev * 10) + digit;
    
    steps.push({
      iter: iteration++,
      currentN: temp,
      extractedDigit: digit,
      nextN: remaining,
      runningSum: sum,
      runningRev: rev
    });
    
    temp = remaining;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Calculator className="w-3.5 h-3.5" /> Indefinite Iteration Workbench
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Digit Extraction & Number Reversal using While Loop
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `while (n &gt; 0)` Mathematical Traversal
        </div>
      </div>

      {/* Interactive Input */}
      <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
            Test Integer Number (<code className="text-sky-400 font-mono">int n</code>):
          </label>
          <span className="text-xs text-slate-400">
            Enter any multi-digit number to trace step-by-step loop iterations:
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputNum}
            onChange={(e) => setInputNum(Math.min(9999999, Math.max(1, Number(e.target.value))))}
            className="w-36 bg-slate-900 text-sky-300 font-mono font-bold text-base px-3 py-2 rounded-xl border border-slate-700 text-center focus:outline-none focus:border-sky-500"
          />
          <button
            onClick={() => setInputNum(Math.floor(1000 + Math.random() * 9000))}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
          >
            Random
          </button>
        </div>
      </div>

      {/* Step by Step Execution Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            Iteration Trace Matrix ({steps.length} Steps Executed)
          </span>
          <span>Final Sum: <strong className="text-emerald-400 font-mono">{sum}</strong> | Reversed: <strong className="text-purple-400 font-mono">{rev}</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border-collapse bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-200 font-mono">
                <th className="p-3 font-semibold">Iter</th>
                <th className="p-3 font-semibold text-sky-400">Condition (n &gt; 0)</th>
                <th className="p-3 font-semibold text-amber-400">Extract (n % 10)</th>
                <th className="p-3 font-semibold text-rose-400">Reduce (n = n / 10)</th>
                <th className="p-3 font-semibold text-emerald-400">Running Sum</th>
                <th className="p-3 font-semibold text-purple-400">Running Reverse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {steps.map((s) => (
                <tr key={s.iter} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3 font-bold text-white">{s.iter}</td>
                  <td className="p-3 text-sky-300">{s.currentN} &gt; 0 (true)</td>
                  <td className="p-3 text-amber-300 font-bold bg-amber-500/5">{s.extractedDigit}</td>
                  <td className="p-3 text-rose-300">{s.nextN}</td>
                  <td className="p-3 text-emerald-300 font-bold">{s.runningSum}</td>
                  <td className="p-3 text-purple-300 font-bold">{s.runningRev}</td>
                </tr>
              ))}
              <tr className="bg-slate-900/60 font-sans">
                <td className="p-3 font-bold text-slate-400">Exit</td>
                <td className="p-3 font-mono text-red-400 font-bold">0 &gt; 0 (false)</td>
                <td colSpan="4" className="p-3 text-slate-400 italic">
                  Condition is false. Loop terminates immediately and resumes below closing brace.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The <code className="text-sky-400 font-mono">while</code> Loop: Syntax, Execution Flow & Indefinite Iteration
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the entry-controlled <code className="text-sky-400 font-mono">while</code> loop in Java. Learn how indefinite iteration works, explore digit extraction, reverse algorithms, and sentinel input handling.
          </p>
        </div>

        {/* Digit Extraction Interactive Tool */}
        <DigitExtractorVisualizer />

        {/* Syntax & Code Anatomy */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-sky-400" />
              Standard Syntax Blueprint
            </h3>
            <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`// 1. Initialization before loop
int count = 1;

// 2. Pre-Test Condition
while (count <= 5) {
    // 3. Executable Body
    System.out.println("Step " + count);
    
    // 4. Update Expression
    count++;
}`}
            </pre>
            <p className="text-xs text-slate-400 leading-relaxed">
              If <code className="text-sky-300 font-mono">count &lt;= 5</code> is initially false (e.g. <code className="text-slate-200">count = 10</code>), the body is bypassed completely with 0 executions.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Critical CBSE Exam Traps
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200">
                <strong className="block text-red-400 font-semibold mb-0.5">Trap 1: Semicolon after while</strong>
                <code className="text-white font-mono">while(i &lt; 10); &#123; i++; &#125;</code> creates an empty infinite loop because the body with <code className="text-white">i++</code> is detached.
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200">
                <strong className="block text-amber-400 font-semibold mb-0.5">Trap 2: Division vs Modulus</strong>
                <code className="text-white font-mono">n / 10</code> removes the last digit (582 / 10 = 58), while <code className="text-white font-mono">n % 10</code> extracts the last digit (582 % 10 = 2).
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Java While Loop"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – While Loop Mastery Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note (.txt)"
          downloadFileName="003_004_topic2_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Whenever you solve digit-based problems in Java (like Armstrong numbers, Palindromes, or Sum of Digits), a while(n > 0) loop with n % 10 and n / 10 is your standard tool. Never forget to divide n by 10, or your program will loop infinitely! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic2;
