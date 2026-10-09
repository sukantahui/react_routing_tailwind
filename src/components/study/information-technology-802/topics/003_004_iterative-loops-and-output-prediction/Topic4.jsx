import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, Calculator, Play, Eye
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const OutputTraceExplorer = () => {
  const [startNum, setStartNum] = useState(5);
  const [offset, setOffset] = useState(2);
  const [limit, setLimit] = useState(2);

  // Trace
  const trace = [];
  let n = startNum;
  let pass = 1;

  do {
    const printed = n + offset;
    const afterDec = n - 1;
    const condCheck = afterDec >= limit;
    
    trace.push({
      pass: pass++,
      currN: n,
      printedVal: printed,
      afterN: afterDec,
      condText: `${afterDec} >= ${limit}`,
      isTrue: condCheck
    });

    n = afterDec;
  } while (n >= limit && trace.length < 15);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Eye className="w-3.5 h-3.5" /> CBSE Board Tracing Visualizer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Step-by-Step Do-While Output Prediction Engine
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `do &#123; System.out.println(num + {offset}); --num; &#125; while(num &gt;= {limit});`
        </div>
      </div>

      {/* Interactive Parameters */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Initial `num`: <span className="font-mono text-purple-400 font-bold">{startNum}</span>
          </label>
          <input
            type="range"
            min="2"
            max="10"
            value={startNum}
            onChange={(e) => setStartNum(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Added Offset (`+ {offset}`): <span className="font-mono text-sky-400 font-bold">{offset}</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Condition Boundary (`&gt;= {limit}`): <span className="font-mono text-emerald-400 font-bold">{limit}</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      {/* Trace Matrix */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300 border-collapse bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-200 font-mono">
                <th className="p-3">Pass</th>
                <th className="p-3 text-purple-400">Entry (num)</th>
                <th className="p-3 text-emerald-400 font-bold">Printed (num+{offset})</th>
                <th className="p-3 text-amber-400">After (--num)</th>
                <th className="p-3 text-sky-400">Exit Test (num &gt;= {limit})</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {trace.map(t => (
                <tr key={t.pass} className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-white">{t.pass}</td>
                  <td className="p-3 text-purple-300">{t.currN}</td>
                  <td className="p-3 text-emerald-300 font-bold text-sm bg-emerald-500/5">{t.printedVal}</td>
                  <td className="p-3 text-amber-300">{t.afterN}</td>
                  <td className="p-3 text-sky-300">{t.condText}</td>
                  <td className="p-3">
                    {t.isTrue ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Loop Repeats
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Terminates
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4" /> Standard Console Output
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-emerald-300 text-sm space-y-1">
              {trace.map((t, idx) => (
                <div key={idx} className="font-bold">{t.printedVal}</div>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-white block mb-1">Final Variable State:</span>
            <code className="text-amber-400 font-mono font-bold text-sm">num = {trace[trace.length - 1]?.afterN}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Step-by-Step Output Prediction of Do-While Loops
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the precise methodology for solving CBSE Class XII IT 802 output tracing problems involving decrement operators, arithmetic print statements, and loop boundary checks.
          </p>
        </div>

        {/* Tracing Explorer Component */}
        <OutputTraceExplorer />

        {/* Theoretical Framework */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-400" />
              The 4-Step Dry Run Formula
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-300 leading-relaxed">
              <li><strong>Record the starting value</strong> of the variable before entering the loop.</li>
              <li><strong>Evaluate the print statement</strong> with current variable values.</li>
              <li><strong>Apply the decrement or increment</strong> to update the variable state.</li>
              <li><strong>Test the Boolean condition</strong> with the UPDATED variable value to decide repetition.</li>
            </ol>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Common Student Misconceptions
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-rose-400 font-bold">Mistake:</span> Assuming condition tests the OLD value of <code className="text-slate-200">num</code>.
                <br /><span className="text-emerald-400">Fact:</span> The condition in <code className="text-slate-200 font-mono">while(num &gt;= 2)</code> tests the NEW value after <code className="text-slate-200 font-mono">--num</code>.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-rose-400 font-bold">Mistake:</span> Confusing <code className="text-slate-200">println</code> with <code className="text-slate-200">print</code>.
                <br /><span className="text-emerald-400">Fact:</span> <code className="text-slate-200">println</code> produces output on separate lines.
              </li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Do-While Output Prediction"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Do-While Output Trace Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note (.txt)"
          downloadFileName="003_004_topic4_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In exams, always write down the trace table neatly on the rough sheet before writing the final output. In the classic question (num=5, println(num+2), --num, while(num>=2)), students often mistakenly write 3 as the last output, but the loop terminates when num becomes 1, so the outputs are 7, 6, 5, 4! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic4;
