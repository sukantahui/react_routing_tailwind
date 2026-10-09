import React, { useState } from 'react';
import { 
  AlertOctagon, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, Terminal, 
  Code, Zap, Layers, RefreshCw, Bug, Shield, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const ExceptionDiagnosticLab = () => {
  const [activeException, setActiveException] = useState('npe');

  const exceptions = [
    {
      id: 'npe',
      name: 'NullPointerException',
      short: 'NPE',
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      cause: 'Calling a method or accessing a property on a reference that points to null.',
      code: `String studentName = null;
// Risky Operation:
int len = studentName.length(); // 💥 Throws NullPointerException!`,
      safeCode: `String studentName = null;
if (studentName != null) {
    int len = studentName.length();
} else {
    System.out.println("Name is unassigned!");
}`
    },
    {
      id: 'aioobe',
      name: 'ArrayIndexOutOfBoundsException',
      short: 'AIOOBE',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      cause: 'Accessing an array element with an invalid index (index < 0 or index >= array.length).',
      code: `int[] marks = { 95, 88, 72 }; // length is 3 (indices 0, 1, 2)
// Risky Operation:
int top = marks[3]; // 💥 Throws ArrayIndexOutOfBoundsException!`,
      safeCode: `int[] marks = { 95, 88, 72 };
int idx = 3;
if (idx >= 0 && idx < marks.length) {
    int top = marks[idx];
} else {
    System.out.println("Index outside valid range 0 to " + (marks.length - 1));
}`
    },
    {
      id: 'nfe',
      name: 'NumberFormatException',
      short: 'NFE',
      color: 'text-sky-400',
      border: 'border-sky-500/30',
      bg: 'bg-sky-500/10',
      cause: 'Attempting to parse an alphanumeric or invalid string into an integer/double.',
      code: `String ageInput = "TwentyFive";
// Risky Operation:
int age = Integer.parseInt(ageInput); // 💥 Throws NumberFormatException!`,
      safeCode: `String ageInput = "TwentyFive";
try {
    int age = Integer.parseInt(ageInput);
} catch (NumberFormatException e) {
    System.out.println("Please enter numeric digits only!");
}`
    }
  ];

  const current = exceptions.find(e => e.id === activeException) || exceptions[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
            <Bug className="w-3.5 h-3.5" /> Exception Diagnostic Lab
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The &quot;Big Three&quot; Runtime Exceptions in CBSE IT 802
          </h2>
        </div>

        <div className="flex gap-2">
          {exceptions.map(e => (
            <button
              key={e.id}
              onClick={() => setActiveException(e.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeException === e.id
                  ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {e.short}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Panel */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className={`text-base font-bold ${current.color}`}>{current.name}</span>
          <span className="text-xs text-slate-400">({current.cause})</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Buggy Snippet */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-rose-400 uppercase tracking-wider">
              <span>⚠️ Crash Code (Trigger Exception)</span>
              <span className="font-mono">Unchecked</span>
            </div>
            <pre className="text-xs font-mono text-rose-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
              {current.code}
            </pre>
          </div>

          {/* Defensive Pattern */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <span>🛡️ Defensive Fix (Safe Execution)</span>
              <span className="font-mono">Protected</span>
            </div>
            <pre className="text-xs font-mono text-emerald-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
              {current.safeCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic7 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 004_004 • Topic 7
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Common Runtime Exceptions in CBSE IT 802: `NullPointerException`, `ArrayIndexOutOfBoundsException`, `NumberFormatException`
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Master the identification, diagnostic symptoms, and defensive programming solutions for the most commonly tested runtime exceptions in CBSE Class XII Information Technology.
          </p>
        </div>

        {/* Interactive Lab */}
        <ExceptionDiagnosticLab />

        {/* Quick Diagnostic Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> NullPointerException
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Occurs when calling methods or reading fields from an object reference variable that contains <code className="text-rose-300">null</code>.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> ArrayIndexOutOfBounds
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Occurs when referencing an array slot using an index less than 0 or greater than or equal to <code className="text-amber-300">array.length</code>.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> NumberFormatException
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Occurs when trying to convert string literals containing alphabets or punctuation with <code className="text-sky-300">Integer.parseInt()</code>.
            </p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="In CBSE board exams, questions often give you a 2-line code snippet and ask: 'Name the exception produced by this code'. If you see a string holding letters passed to parseInt, answer NumberFormatException. If you see a null object method call, answer NullPointerException. If you see arr[arr.length], answer ArrayIndexOutOfBoundsException!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Common Runtime Exceptions"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic7;
