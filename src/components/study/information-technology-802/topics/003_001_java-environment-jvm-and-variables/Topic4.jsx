import React, { useState } from 'react';
import { 
  Lock, Unlock, ShieldAlert, CheckCircle2, 
  XCircle, AlertTriangle, HelpCircle, Sparkles, 
  BookOpen, ArrowRight, ShieldCheck, RefreshCw, 
  Code, Terminal, FileCode, Check, Layers
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ConstantMutabilitySandbox = () => {
  const [regularVal, setRegularVal] = useState(500);
  const [newRegularInput, setNewRegularInput] = useState('650');
  const [finalReassignAttempt, setFinalReassignAttempt] = useState(false);
  const [finalInputVal, setFinalInputVal] = useState('750');

  const handleUpdateRegular = () => {
    const num = Number(newRegularInput);
    if (!isNaN(num)) {
      setRegularVal(num);
    }
  };

  const handleAttemptFinalUpdate = () => {
    setFinalReassignAttempt(true);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs tracking-wider uppercase">
            <Lock className="w-4 h-4" />
            <span>Interactive Mutability Sandbox & Compiler Inspector</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Regular Variable vs <code className="text-purple-300">final</code> Constant in Java
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          Immutability Sandbox
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Regular Variable Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Unlock className="w-4 h-4" />
              <span>1. Regular Mutable Variable</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              MUTABLE
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-slate-500">// Declaration & Initial Value:</div>
            <div>int studentBalance = {regularVal};</div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold block">
              Reassign Variable Value:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={newRegularInput}
                onChange={(e) => setNewRegularInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                placeholder="Enter new value"
              />
              <button
                onClick={handleUpdateRegular}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Reassign
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Success: Value smoothly updated in memory to <strong>₹{regularVal}</strong>.</span>
          </div>
        </div>

        {/* Final Constant Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-4 shadow-lg shadow-purple-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>2. Immutable Constant (<code className="text-purple-300">final</code>)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
              READ ONLY
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-slate-500">// Declared with 'final' keyword:</div>
            <div>final double GST_RATE = 18.0;</div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold block">
              Attempt to Modify / Reassign:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={finalInputVal}
                onChange={(e) => setFinalInputVal(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                placeholder="GST_RATE = 12.0;"
              />
              <button
                onClick={handleAttemptFinalUpdate}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Attempt
              </button>
            </div>
          </div>

          {finalReassignAttempt ? (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs font-mono text-rose-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>javac Compile-Time Error</span>
              </div>
              <p className="text-[11px] text-rose-200">
                BillingSystem.java:14: error: cannot assign a value to final variable GST_RATE
              </p>
              <button 
                onClick={() => setFinalReassignAttempt(false)}
                className="text-[10px] text-slate-400 underline hover:text-white mt-1 cursor-pointer"
              >
                Dismiss Error
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Immutable Lock: Value is permanently locked at <strong>18.0%</strong>.</span>
            </div>
          )}
        </div>
      </div>

      {/* 3 Pillars of Final in Java */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          The 3 Applications of the <code className="text-purple-300">final</code> Keyword in Java:
        </h4>
        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-purple-400 block">1. final Variable</span>
            <p className="text-slate-300">Value cannot be changed or reassigned once initialized (acts as a constant).</p>
            <code className="text-[11px] font-mono text-amber-300 block">final double PI = 3.14159;</code>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-sky-400 block">2. final Method</span>
            <p className="text-slate-300">Method cannot be overridden by any child subclass during inheritance.</p>
            <code className="text-[11px] font-mono text-sky-300 block">{"final void printReceipt() { ... }"}</code>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400 block">3. final Class</span>
            <p className="text-slate-300">Class cannot be subclassed/inherited by any other class (e.g. String, Math).</p>
            <code className="text-[11px] font-mono text-emerald-300 block">{"final class SecurityManager { ... }"}</code>
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Lock className="w-4 h-4" />
          <span>CBSE Class 12 Information Technology (Code 802) • Module 003_001 • Topic 4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Declaring Constants in Java using the <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">final</span> Keyword
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
          Explore the mechanics of immutable constants in Java, UPPER_SNAKE_CASE naming standards, compile-time reassignment protection, and how <code className="text-purple-300 font-mono">final double PI = 3.14159;</code> prevents runtime modification bugs.
        </p>
      </div>

      {/* Interactive Mutability Sandbox */}
      <div className="max-w-6xl mx-auto">
        <ConstantMutabilitySandbox />
      </div>

      {/* CBSE Examination Key Rules Matrix */}
      <div className="max-w-6xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>CBSE Exam Rules: Constants & the final Keyword</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 block">1. Naming Convention:</span>
            <p>
              Always use all uppercase letters with words separated by underscores: <code className="text-white font-mono font-bold">MAX_ATTEMPTS</code>, <code className="text-white font-mono font-bold">PASSING_PERCENTAGE</code>.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 block">2. 'const' vs 'final':</span>
            <p>
              While <code className="text-rose-300 font-mono">const</code> is used in C/C++, Java uses <code className="text-emerald-300 font-mono">final</code>. In Java, <code className="text-rose-300 font-mono">const</code> is an unused reserved keyword.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 block">3. Blank Final Variables:</span>
            <p>
              A final variable declared without initial value must be initialized inside constructor before instance creation finishes.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 block">4. Compiler Inlining:</span>
            <p>
              The Java compiler optimizes compile-time final constants by replacing their occurrences directly with literal values in the bytecode.
            </p>
          </div>
        </div>
      </div>

      {/* Printable Revision Notes */}
      <div className="max-w-6xl mx-auto">
        <PlainTextPrint 
          content={noteText} 
          title="CBSE Class 12 IT-802: Java Final Keyword & Constants Notes" 
        />
      </div>

      {/* Interactive FAQ & CBSE Questions */}
      <div className="max-w-6xl mx-auto">
        <FAQTemplate 
          faqs={questions} 
          title="CBSE IT-802 High-Yield Exam Questions: Final Keyword & Constants" 
          description="Master CBSE exam questions on the final modifier, immutability, blank finals, naming rules, and compile-time reassignment errors." 
          defaultOpenCount={3} 
        />
      </div>

      {/* Teacher Sukanta Hui note card placed at the very end */}
      <div className="max-w-6xl mx-auto">
        <Teacher 
          name="Sukanta Hui" 
          role="Senior Vocational IT Educator & Software Architect" 
          location="Barrackpore, Kolkata" 
          note="Whenever you see 'final' attached to a variable in CBSE board questions, remember that its value is locked forever. Any line attempting 'PI = 3.14;' after 'final double PI = 3.14159;' immediately triggers a compile-time error!" 
        />
      </div>
    </div>
  );
}
