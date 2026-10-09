import React, { useState } from 'react';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, Terminal, 
  Code, Zap, Layers, RefreshCw, AlertCircle, Shield, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const AssertionSandbox = () => {
  const [balance, setBalance] = useState(500);
  const [withdrawAmount, setWithdrawAmount] = useState(200);

  const resultingBalance = balance - withdrawAmount;
  const isAssertionPassed = resultingBalance >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Shield className="w-3.5 h-3.5" /> Assertion Invariant Tester
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Testing Program Invariants with `assert`
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          `assert balance &gt;= 0 : &quot;Overdraft violation!&quot;;`
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Initial Account Balance: (₹)
          </label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Withdrawal Request: (₹)
          </label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-cyan-400 font-bold focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Assertion Result Live View */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Java Code Execution Trace:
          </span>
          <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`int balance = ${balance};
balance -= ${withdrawAmount}; // Result: ${resultingBalance}

// Checking programmatic invariant:
assert balance >= 0 : "Account balance cannot be negative! Found: " + balance;

System.out.println("✅ Transaction successful. Balance: " + balance);`}
          </pre>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
            isAssertionPassed
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                {isAssertionPassed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Assertion Passed (Condition is TRUE)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                    <span>Assertion FAILED (AssertionError)</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed">
                {isAssertionPassed
                  ? `Condition (balance >= 0) evaluated to true (${resultingBalance} >= 0). Normal execution continues smoothly.`
                  : `Condition (balance >= 0) evaluated to false (${resultingBalance} < 0). If assertions are enabled (-ea), JVM immediately halts and throws java.lang.AssertionError.`}
              </p>
            </div>

            {!isAssertionPassed && (
              <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-rose-500/40 font-mono text-[11px] text-rose-300">
                Exception in thread "main" java.lang.AssertionError: Account balance cannot be negative! Found: {resultingBalance}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Java Assertions: Purpose of the `assert` Keyword in Debugging & Testing Invariants
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Discover the `assert` keyword in Java, learn how developers verify logical invariants during testing, and understand the two syntactic forms of assertion statements.
          </p>
        </div>

        {/* Interactive Invariant Sandbox */}
        <AssertionSandbox />

        {/* Syntax Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-sky-400" />
              1. Simple Assertion Syntax
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluates a boolean condition. If false, an <code className="text-amber-300">AssertionError</code> is thrown without a custom message.
            </p>
            <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
{`assert age >= 18;`}
            </pre>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              2. Augmented Assertion Syntax (With Message)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides an expressive error message following a colon (<code className="text-amber-300">:</code>) to aid debugging logs.
            </p>
            <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
{`assert balance >= 0 : "Invalid Balance: " + balance;`}
            </pre>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Assertions are intended for developers and testers to catch internal software logic bugs during testing, NOT for handling user errors in live production. Remember the golden CBSE rule: never use assertions to validate arguments of public methods!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Java Assertions & Invariants"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic3;
