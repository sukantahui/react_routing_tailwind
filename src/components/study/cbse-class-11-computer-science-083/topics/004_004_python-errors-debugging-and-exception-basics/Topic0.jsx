import React, { useState } from 'react';
import {
  AlertTriangle, Bug, Terminal, ShieldAlert, CheckCircle2,
  HelpCircle, FileText, Code, Sparkles, ArrowRight,
  RefreshCw, ShieldCheck, Layers, Eye
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/python_error_debugging_suite.py?raw";

// Interactive Error Diagnostic Classifier Component
const ErrorClassifierSandbox = () => {
  const [selectedErrorType, setSelectedErrorType] = useState('syntax');

  const errorCategories = {
    syntax: {
      name: "Syntax Errors (Compile / Parse Time)",
      badge: "Grammar Violation",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      color: "border-rose-500/50 bg-rose-950/20",
      timing: "Detected by Python parser BEFORE any code executes.",
      examples: [
        {
          bug: "if marks >= 33\n    print('Pass')",
          reason: "SyntaxError: expected ':' (Missing colon at the end of if header)"
        },
        {
          bug: "2nd_rank = 'Mamata'",
          reason: "SyntaxError: invalid decimal literal (Identifier starts with digit)"
        },
        {
          bug: "x + y = 100",
          reason: "SyntaxError: cannot assign to expression (Invalid l-value)"
        }
      ]
    },
    logical: {
      name: "Logical Errors (Semantic Algorithm Bugs)",
      badge: "Formula / Algorithmic Flaw",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      color: "border-amber-500/50 bg-amber-950/20",
      timing: "Runs completely without crashing, but silently outputs INCORRECT results.",
      examples: [
        {
          bug: "avg = mark1 + mark2 / 2",
          reason: "Calculates mark1 + (mark2 / 2) due to precedence. Fix: (mark1 + mark2) / 2"
        },
        {
          bug: "perimeter = 2 * length + width",
          reason: "Calculates (2 * length) + width. Fix: 2 * (length + width)"
        },
        {
          bug: "for i in range(1, 10):  # Intended 1 to 10\n    print(i)",
          reason: "Loop stops at 9 (off-by-one bug). Fix: range(1, 11)"
        }
      ]
    },
    runtime: {
      name: "Runtime Errors (Exceptions)",
      badge: "Execution-Time Crash",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      color: "border-purple-500/50 bg-purple-950/20",
      timing: "Occurs DURING execution when an illegal operation is attempted.",
      examples: [
        {
          bug: "avg = total_score / 0",
          reason: "ZeroDivisionError: division by zero"
        },
        {
          bug: "roll = int('Barrackpore')",
          reason: "ValueError: invalid literal for int() with base 10: 'Barrackpore'"
        },
        {
          bug: "msg = 'Score: ' + 95",
          reason: "TypeError: can only concatenate str (not 'int') to str"
        },
        {
          bug: "lst = [10, 20, 30]\nprint(lst[5])",
          reason: "IndexError: list index out of range"
        }
      ]
    }
  };

  const curr = errorCategories[selectedErrorType];

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            <Bug size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Python Error Taxonomy &amp; Diagnostic Analyzer
            </h3>
            <p className="text-xs text-slate-400">
              Compare the three fundamental error categories: Syntax Errors, Logical Errors, and Runtime Exceptions.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {Object.keys(errorCategories).map((key) => {
          const item = errorCategories[key];
          const isSelected = selectedErrorType === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedErrorType(key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? `${item.color} shadow-lg scale-[1.02] font-bold`
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="text-xs block font-bold text-white">{item.name.split('(')[0]}</span>
              <span className="text-[10px] text-slate-400 block pt-0.5">{item.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Details */}
      <div className={`p-5 rounded-2xl border ${curr.color} space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base font-bold text-white">{curr.name}</h4>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${curr.badgeColor}`}>
            {curr.badge}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          <strong>Detection Timing:</strong> {curr.timing}
        </p>

        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Real Code Examples &amp; Analysis:</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {curr.examples.map((ex, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                <pre className="font-mono text-xs text-rose-300 bg-slate-900 p-2 rounded border border-slate-800 whitespace-pre-wrap">
                  {ex.bug}
                </pre>
                <p className="text-[11px] text-slate-300 italic border-t border-slate-800 pt-1.5">
                  {ex.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Traceback Anatomy Breakdown Component
const TracebackAnatomyWidget = () => {
  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-sky-500/30 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Terminal size={18} className="text-sky-400" />
        <h4 className="text-sm font-bold text-white">Anatomy of a Python Traceback Crash Report</h4>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
        <div className="text-slate-500">// 1. Call Stack Header</div>
        <div className="text-rose-400">Traceback (most recent call last):</div>
        <div className="text-slate-400 pl-4">
          File <span className="text-amber-300">"student_grades.py"</span>, line <span className="text-sky-400 font-bold">18</span>, in <span className="text-purple-300">&lt;module&gt;</span>
        </div>
        <div className="text-slate-200 pl-8 bg-slate-900/80 p-2 rounded border border-slate-800">
          average = total_score / student_count
        </div>
        <div className="text-rose-400 font-bold text-sm pt-1">
          ZeroDivisionError: <span className="text-slate-300 font-normal">division by zero</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-amber-400 block font-bold">1. File Name</span>
          <span className="text-slate-300 text-[11px]">Exact source script file</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-sky-400 block font-bold">2. Line Number</span>
          <span className="text-slate-300 text-[11px]">Line 18 triggered the exception</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-purple-400 block font-bold">3. Offending Code</span>
          <span className="text-slate-300 text-[11px]">Statement being evaluated</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-rose-400 block font-bold">4. Exception Type</span>
          <span className="text-slate-300 text-[11px]">ZeroDivisionError occurred</span>
        </div>
      </div>
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit II: Python · 45 Marks
              </span>
              <span className="px-3 py-1 bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold rounded-full">
                Module 004_004 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Dedicated Error Mastery
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Python Errors, Debugging Techniques &amp; Exception Basics: Syntax, Logical &amp; Runtime Errors
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Master the three fundamental pillars of software errors. Understand compile-time Syntax Errors, silent semantic Logical Bugs, runtime Exceptions (ZeroDivisionError, ValueError, TypeError, IndexError, KeyError, NameError), Traceback diagnostic decoding, and graceful error interception with `try-except`.
            </p>
          </div>
        </div>

        {/* SECTION 2: IN SIMPLE WORDS */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: The Grammar, Logic &amp; Roadblock Analogy</h2>
              <p className="text-xs text-slate-400">Classifying mistakes in communication and computing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <span className="font-bold text-rose-400 text-sm">1. Syntax Error (Grammar)</span>
              <p className="text-slate-300 leading-relaxed">
                Writing <em>"Cat the dog is."</em> The sentence violates English grammar rules; the listener cannot understand it at all (Python parser halts before execution).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
              <span className="font-bold text-amber-400 text-sm">2. Logical Error (Wrong Route)</span>
              <p className="text-slate-300 leading-relaxed">
                You want to travel to Kolkata from Barrackpore, but you board the train to Naihati. The train operates perfectly, but you arrive at the wrong destination (Silent bad math).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <span className="font-bold text-purple-400 text-sm">3. Runtime Error (Roadblock)</span>
              <p className="text-slate-300 leading-relaxed">
                You are driving smoothly on the highway, but suddenly a collapsed bridge blocks the road. The journey is forced to stop immediately (ZeroDivisionError crash).
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE ERROR CLASSIFIER */}
        <div className="space-y-4">
          <ErrorClassifierSandbox />
        </div>

        {/* SECTION 4: TRACEBACK ANATOMY */}
        <div className="space-y-4">
          <TracebackAnatomyWidget />
        </div>

        {/* SECTION 5: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Error Diagnostics &amp; Try-Except Interception
              </h2>
              <p className="text-xs text-slate-400">
                Executable Python demonstration comparing logical calculation bugs against try-except exception interceptors.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="python_error_debugging_suite.py – Error Classification & Try-Except Engine"
              highlightLines={[12, 26, 44, 60]}
            />
          </div>
        </div>

        {/* SECTION 6: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Calling Division by Zero a Syntax Error:</strong> `10 / 0` has perfect syntax. It is a <strong>Runtime Error (ZeroDivisionError)</strong> that occurs during execution.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Assuming Logical Errors Show Error Logs:</strong> Logical errors never crash or show error messages; only wrong outputs are produced.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Debugging Rules
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Identify Exception Names Exactly:</strong> Capitalization matters: `ZeroDivisionError`, `ValueError`, `TypeError`, `IndexError`, `KeyError`, `NameError`.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Use Try-Except Gracefully:</strong> Catch specific exception types rather than bare `except:` to avoid masking unexpected bugs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 7: FAQ ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Exam Preparation &amp; Conceptual Self-Assessment (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                Test your mastery of Syntax, Logical, and Runtime Errors, Traceback inspection, and exception handling.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 8: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="004_004_python_errors_and_debugging_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
