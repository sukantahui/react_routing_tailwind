import React, { useState } from 'react';
import { 
  Repeat, Play, RefreshCw, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Layers, Sliders, Check, Flame
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const LoopMechanismVisualizer = () => {
  const [initialValue, setInitialValue] = useState(10);
  const [threshold, setThreshold] = useState(10);
  const [activeLoop, setActiveLoop] = useState('both'); // 'while', 'dowhile', 'both'

  // While evaluation
  const whileRuns = initialValue < threshold ? Math.max(0, threshold - initialValue) : 0;
  const whileLogs = [];
  let wVal = initialValue;
  while (wVal < threshold && whileLogs.length < 10) {
    whileLogs.push(`Iteration ${whileLogs.length + 1}: wVal = ${wVal} (prints ${wVal})`);
    wVal++;
  }

  // Do-While evaluation
  const doWhileLogs = [];
  let dVal = initialValue;
  let iter = 0;
  do {
    iter++;
    doWhileLogs.push(`Iteration ${iter}: dVal = ${dVal} (prints ${dVal})`);
    dVal++;
  } while (dVal < threshold && iter < 10);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Repeat className="w-3.5 h-3.5" /> Interactive Loop Execution Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Entry-Controlled (While) vs Exit-Controlled (Do-While)
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          {['both', 'while', 'dowhile'].map(mode => (
            <button
              key={mode}
              onClick={() => setActiveLoop(mode)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer capitalize ${
                activeLoop === mode 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode === 'both' ? 'Compare Both' : mode === 'while' ? 'While Only' : 'Do-While Only'}
            </button>
          ))}
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <label className="font-semibold text-slate-200">Initial Variable Value (x):</label>
            <span className="font-mono text-emerald-400 font-bold text-sm">{initialValue}</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <label className="font-semibold text-slate-200">Condition Limit (x &lt; Limit):</label>
            <span className="font-mono text-cyan-400 font-bold text-sm">{threshold}</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* While Loop Card */}
        {(activeLoop === 'both' || activeLoop === 'while') && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Entry-Controlled (`while`)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Executions: <strong className="text-sky-300">{whileLogs.length}</strong>
                </span>
              </div>
              <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 mb-4 overflow-x-auto">
{`int x = ${initialValue};
while (x < ${threshold}) {
    System.out.print(x + " ");
    x++;
}`}
              </pre>

              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Console Output Stream:
                </div>
                {whileLogs.length === 0 ? (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Condition initially FALSE ({initialValue} &lt; {threshold}). Body skipped (0 iterations).</span>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono space-y-1 max-h-36 overflow-y-auto">
                    {whileLogs.map((log, i) => (
                      <div key={i} className="text-emerald-400">✓ {log}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-200">Rule:</strong> Checks <code className="text-sky-300">x &lt; limit</code> first. If false, executes 0 times.
            </div>
          </div>
        )}

        {/* Do-While Loop Card */}
        {(activeLoop === 'both' || activeLoop === 'dowhile') && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Exit-Controlled (`do-while`)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Executions: <strong className="text-amber-300">{doWhileLogs.length}</strong>
                </span>
              </div>
              <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 mb-4 overflow-x-auto">
{`int x = ${initialValue};
do {
    System.out.print(x + " ");
    x++;
} while (x < ${threshold});`}
              </pre>

              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Console Output Stream:
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono space-y-1 max-h-36 overflow-y-auto">
                  {doWhileLogs.map((log, i) => (
                    <div key={i} className="text-amber-400">✓ {log}</div>
                  ))}
                </div>
                {initialValue >= threshold && (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2 mt-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Guaranteed 1 run occurred before checking ({initialValue + 1} &lt; {threshold}).</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-200">Rule:</strong> Executes body first, then verifies condition. Minimum 1 run.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 0
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Concept of Iteration in Java: Entry-Controlled vs Exit-Controlled Loops
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Understand how iterative statements enable repeated execution in Java programs, how conditions are evaluated, and the critical architectural contrast between entry-controlled (<code className="text-emerald-400">while</code>, <code className="text-emerald-400">for</code>) and exit-controlled (<code className="text-amber-400">do-while</code>) loops.
          </p>
        </div>

        {/* Conceptual Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Repeat className="w-5 h-5 text-emerald-400" />
              1. The 4 Essential Pillars of Any Loop
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every iterative structure in Java relies on four fundamental parts to control execution flow correctly:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400">1. Initialization:</span>
                <span>Sets the initial state of the loop control variable (e.g., <code className="text-slate-200 font-mono">int i = 1;</code>).</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-cyan-400">2. Test Condition:</span>
                <span>Boolean expression evaluated before or after the loop body (e.g., <code className="text-slate-200 font-mono">i &lt;= 10</code>).</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-amber-400">3. Loop Body:</span>
                <span>Executable statements repeatedly executed while condition remains true.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-rose-400">4. Update Expression:</span>
                <span>Increments or decrements the control variable towards termination.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              2. Key Structural Differences
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The primary differentiator is <strong>when the test expression is evaluated</strong>:
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-200">
                <strong className="block text-sky-400 text-sm mb-1 font-semibold">Entry-Controlled (Pre-Test)</strong>
                Condition checked before loop body executes. If condition is false on first test, loop body executes exactly <strong>0 times</strong>.
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <strong className="block text-amber-400 text-sm mb-1 font-semibold">Exit-Controlled (Post-Test)</strong>
                Condition checked after loop body executes. Even if condition is false at the start, body executes at least <strong>1 time</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <LoopMechanismVisualizer />

        {/* Technical Comparison Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Comprehensive CBSE Board Exam Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-200">
                  <th className="p-3 font-semibold">Evaluation Criteria</th>
                  <th className="p-3 font-semibold text-sky-400">Entry-Controlled (while, for)</th>
                  <th className="p-3 font-semibold text-amber-400">Exit-Controlled (do-while)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr>
                  <td className="p-3 font-sans font-medium text-white">Condition Evaluation Point</td>
                  <td className="p-3 text-sky-300">At entry point (before loop body)</td>
                  <td className="p-3 text-amber-300">At exit point (after loop body)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium text-white">Minimum Iteration Count</td>
                  <td className="p-3 text-sky-300">0 (Zero times)</td>
                  <td className="p-3 text-amber-300">1 (One time)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium text-white">Syntax Semicolon Requirement</td>
                  <td className="p-3 text-sky-300">No semicolon: while(cond) &#123; &#125;</td>
                  <td className="p-3 text-amber-300">Mandatory semicolon: while(cond);</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-medium text-white">Primary Real-World Use Case</td>
                  <td className="p-3 text-sky-300 font-sans">Array traversals, mathematical calculations</td>
                  <td className="p-3 text-amber-300 font-sans">Interactive CLI menus, input validation retries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Iterative Loops in Java"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Loops Revision Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note (.txt)"
          downloadFileName="003_004_topic0_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In CBSE Class XII IT (802), board questions frequently test edge-case outputs where a loop condition is false at the start. Remember: while executes 0 times, but do-while executes once! Always check the terminating semicolon in do-while(condition); — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic0;
