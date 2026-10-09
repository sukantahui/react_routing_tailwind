import React, { useState } from 'react';
import { 
  Terminal, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Zap, Layers, Check, ArrowDownRight, CornerDownRight,
  Shield, Key, PlayCircle
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const DoWhileGateVisualizer = () => {
  const [pinInput, setPinInput] = useState(1234);
  const [correctPin, setCorrectPin] = useState(1234);
  const [attempts, setAttempts] = useState(1);
  const [simState, setSimState] = useState('ready'); // 'ready', 'entered_body', 'checking_condition', 'done'

  const isPinMatch = Number(pinInput) === Number(correctPin);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Shield className="w-3.5 h-3.5" /> ATM PIN Verification & Exit-Gate Simulator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Why Do-While Guarantees At Least One Unconditional Run
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          Post-Test Evaluation Architecture
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Interactive Simulation */}
        <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4" /> ATM Terminal Verification Loop
            </h3>
            
            <div className="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Target Correct PIN:</span>
                <span className="font-mono text-emerald-400 font-bold">1234</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-400">User Entered PIN:</label>
                <input
                  type="number"
                  value={pinInput}
                  onChange={(e) => setPinInput(Number(e.target.value))}
                  className="w-24 bg-slate-950 text-amber-300 font-mono text-center font-bold px-2 py-1 rounded border border-slate-700 text-xs"
                />
              </div>
            </div>

            {/* Step-by-step Flow Visualizer */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-2.5">
                <span className="font-bold text-emerald-400 font-mono">STEP 1:</span>
                <span>Control enters <code className="bg-emerald-950/60 px-1 rounded text-emerald-200">do &#123; ... &#125;</code> without asking for credentials. PIN prompt executes once!</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-2.5">
                <span className="font-bold text-amber-400 font-mono">STEP 2:</span>
                <span>User entered <strong className="font-mono">{pinInput}</strong>. Now condition <code className="bg-amber-950/60 px-1 rounded text-amber-200">while (pin != 1234);</code> is evaluated.</span>
              </div>
              <div className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                !isPinMatch 
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' 
                  : 'bg-sky-500/10 border-sky-500/20 text-sky-300'
              }`}>
                <span className="font-bold font-mono">STEP 3:</span>
                <span>
                  {!isPinMatch 
                    ? `Condition is TRUE (${pinInput} != 1234). Gate permits RE-ENTRY into loop body for retry.` 
                    : `Condition is FALSE (1234 != 1234 is false). Loop terminates cleanly. Access Granted!`}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            💡 Notice how the prompt runs before the password check! That is why ATM / Login screens use <code className="text-amber-400">do-while</code>.
          </div>
        </div>

        {/* Right Code and Syntax Breakdown */}
        <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4 text-sky-400" /> Java Production Code
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              CBSE IT 802 Standard
            </span>
          </div>

          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`int pin;
Scanner sc = new Scanner(System.in);

do {
    System.out.print("Enter 4-Digit Security PIN: ");
    pin = sc.nextInt();   // Executed at least ONCE!
    
    if (pin != 1234) {
        System.out.println("❌ Incorrect PIN! Try again.");
    }
} while (pin != 1234);  // <--- Mandatory Semicolon

System.out.println("✅ Access Granted! Welcome.");`}
          </pre>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
            <strong className="text-amber-400 flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" /> Mandatory Semicolon (;) Requirement:
            </strong>
            <p className="text-[11px] leading-relaxed text-amber-200/90">
              In Java, writing <code className="text-white font-mono font-bold">{"} while(cond);"}</code> requires a closing semicolon. Leaving it out produces compile-time error: <span className="font-mono text-rose-300">&quot;error: &apos;;&apos; expected&quot;</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 003_004 • Topic 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Why <code className="text-amber-400 font-mono">do-while</code> is Called an Exit-Controlled Loop
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the post-test loop architecture in Java, explore why condition testing occurs after the body executes, and understand why <code className="text-amber-400">do-while</code> is guaranteed to execute at least once in all scenarios.
          </p>
        </div>

        {/* Interactive Studio */}
        <DoWhileGateVisualizer />

        {/* Detailed Explanation Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl w-fit">
              <PlayCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. Unconditional First Pass</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upon entering the <code className="text-emerald-400">do</code> block, Java does not evaluate any Boolean expression. Statements execute directly, ensuring initialization and display tasks occur without hindrance.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl w-fit">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. Exit Gatekeeper</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The test condition in <code className="text-amber-400">while (condition);</code> acts as an exit-gate check. If true, control loops back up to <code className="text-emerald-400">do</code>; if false, it leaves immediately.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-3 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl w-fit">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. Variable Scoping Trap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Any variable declared inside the <code className="text-sky-400">do &#123; ... &#125;</code> block cannot be referenced inside the <code className="text-amber-400">while(...)</code> condition. Always declare control variables outside!
            </p>
          </div>
        </div>

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Do-While Exit-Controlled Loop"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – Do-While Architecture Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note (.txt)"
          downloadFileName="003_004_topic1_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="Remember this golden rule for CBSE IT 802 exams: When the examiner writes a code snippet where the initial condition is FALSE (e.g. k=50; while(k<10); vs do{...}while(k<10);), the while loop prints NOTHING (0 times), while the do-while loop prints EXACTLY ONCE! — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic1;
