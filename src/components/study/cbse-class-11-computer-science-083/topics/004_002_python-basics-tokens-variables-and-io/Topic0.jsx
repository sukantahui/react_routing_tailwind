import React, { useState } from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Sparkles, Layers, ArrowRight,
  RefreshCw, Check, X, Variable
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/python_tokens_and_lvalue_lab.py?raw";

// Interactive Identifier & Token Validator Widget
const IdentifierValidatorWidget = () => {
  const [testIdentifier, setTestIdentifier] = useState('student_rank_1');

  const pythonKeywords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
    'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
  ];

  const checkValidity = (name) => {
    if (!name || name.trim() === '') return { valid: false, reason: 'Identifier name cannot be empty.' };
    if (pythonKeywords.includes(name)) return { valid: false, reason: `'${name}' is a reserved Python KEYWORD.` };
    if (/^[0-9]/.test(name)) return { valid: false, reason: 'Cannot begin with a numeric digit (0-9).' };
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) return { valid: false, reason: 'Contains illegal characters or spaces. Only letters, digits, and underscores allowed.' };
    return { valid: true, reason: `'${name}' is a 100% legal Python identifier!` };
  };

  const result = checkValidity(testIdentifier);

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Variable size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Identifier Naming &amp; Keyword Rules Auditor
            </h3>
            <p className="text-xs text-slate-400">
              Type any candidate variable name to test statutory Python lexical rules in real time.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="max-w-md">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Candidate Variable Identifier:</label>
          <input
            type="text"
            value={testIdentifier}
            onChange={(e) => setTestIdentifier(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:border-sky-500"
            placeholder="e.g. _total_score"
          />
        </div>

        {/* Quick Test Chips */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Test Common CBSE Exam Cases:</span>
          <div className="flex flex-wrap gap-1.5">
            {['_score', '2nd_rank', 'total$sum', 'def', 'True', 'student_name', 'Student Name', 'for_loop'].map((sample) => (
              <button
                key={sample}
                onClick={() => setTestIdentifier(sample)}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Validation Result Box */}
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            result.valid
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="mt-0.5">
            {result.valid ? <Check size={18} className="text-emerald-400" /> : <X size={18} className="text-rose-400" />}
          </div>
          <div>
            <span className="text-xs font-bold block uppercase tracking-wider">
              {result.valid ? 'VALID IDENTIFIER' : 'INVALID IDENTIFIER (SYNTAX ERROR)'}
            </span>
            <p className="text-xs text-slate-200 mt-0.5">{result.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive L-Value vs R-Value Mechanics Sandbox
const LValueSandbox = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      code: "x = 25",
      type: "VALID Simple Assignment",
      valid: true,
      lvalue: "x (Variable memory target)",
      rvalue: "25 (Integer literal)",
      explanation: "Valid. The left-hand side is an assignable variable identifier capable of holding memory reference."
    },
    {
      code: "x + y = 30",
      type: "INVALID L-Value Violation",
      valid: false,
      lvalue: "x + y (Arithmetic Expression)",
      rvalue: "30 (Integer literal)",
      explanation: "SyntaxError: cannot assign to expression. 'x + y' is an evaluated mathematical expression (r-value), not an addressable storage target."
    },
    {
      code: "100 = score",
      type: "INVALID L-Value Violation",
      valid: false,
      lvalue: "100 (Literal Constant)",
      rvalue: "score (Variable value)",
      explanation: "SyntaxError: cannot assign to literal. A constant literal 100 cannot be modified or act as a storage bin."
    },
    {
      code: "a, b = 10, 20",
      type: "VALID Multiple Assignment",
      valid: true,
      lvalue: "a, b (Tuple of variables)",
      rvalue: "10, 20 (Tuple of evaluated values)",
      explanation: "Valid tuple unpacking. Python evaluates the right-hand tuple first, then simultaneously binds to left-hand targets."
    },
    {
      code: "a, b = b, a",
      type: "VALID Variable Swapping",
      valid: true,
      lvalue: "a, b (Swapped targets)",
      rvalue: "b, a (Temporary packed tuple)",
      explanation: "Clean pythonic variable swapping without requiring a third temporary variable."
    }
  ];

  const curr = cases[selectedCase];

  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-amber-500/30 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Core CBSE Concept
          </span>
          <h4 className="text-sm font-bold text-white">L-Value &amp; R-Value Assignment Mechanics</h4>
        </div>
        <span className="text-xs text-slate-400 font-mono">lvalue = rvalue</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {cases.map((c, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCase(idx)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all ${
              selectedCase === idx
                ? c.valid ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-rose-500 text-white border-rose-400'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {c.code}
          </button>
        ))}
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-base font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
            {curr.code}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${curr.valid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
            {curr.type}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block font-semibold">L-Value (Left Target):</span>
            <span className="text-sky-300 font-mono">{curr.lvalue}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400 block font-semibold">R-Value (Right Data):</span>
            <span className="text-emerald-300 font-mono">{curr.rvalue}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          {curr.explanation}
        </p>
      </div>
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit II: Python · 45 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 004_002 · Topic 0
              </span>
              <span className="px-3 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                Core CBSE Syllabus
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Python Basics: Tokens, Keywords, Identifiers, Literals, L-Value / R-Value Mechanics &amp; I/O
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Master the grammatical tokens of Python. Explore Keywords, legal Identifier rules, Literals (Numeric, String, None), Delimiters, strict L-Value and R-Value assignment mechanics, Dynamic Typing, and customized print/input formatting.
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
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: Labeled Post Office Mailboxes</h2>
              <p className="text-xs text-slate-400">Understanding l-values and r-values through post office pigeonholes</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Think of a variable as a labeled post office mailbox (<strong>l-value</strong>) in Barrackpore Post Office. You can drop a letter (<strong>r-value</strong>) into the mailbox: `mailbox = letter`. But you cannot drop a mailbox inside a letter! Attempting to write `letter = mailbox` when you meant to store a value is like trying to put a physical post office inside an envelope.
          </p>
        </div>

        {/* SECTION 3: INTERACTIVE IDENTIFIER AUDITOR */}
        <div className="space-y-4">
          <IdentifierValidatorWidget />
        </div>

        {/* SECTION 4: INTERACTIVE L-VALUE / R-VALUE SANDBOX */}
        <div className="space-y-4">
          <LValueSandbox />
        </div>

        {/* SECTION 5: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Tokens, Identifiers &amp; I/O Formatting
              </h2>
              <p className="text-xs text-slate-400">
                A Python program testing token validation, tuple unpacking assignments, and `print(sep, end)` formatting.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="python_tokens_and_lvalue_lab.py – Tokens & Assignment Engine"
              highlightLines={[12, 25, 38, 52]}
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
                <span><strong>L-Value Syntax Errors:</strong> Writing `a + b = c` or `25 = x`. In Python, the left-hand side must be an assignable target.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Forgetting `input()` returns `str`:</strong> Adding numbers without `int(input())` leads to string concatenation (`'5' + '10' = '510'`).</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Print Parameters
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Use `sep` and `end`:</strong> `print(a, b, sep=':', end=' ')` neatly formats table rows and prompts.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Three Capitalized Keywords:</strong> Remember that only `True`, `False`, and `None` start with capital letters.</span>
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
                Test your mastery of Python tokens, identifier rules, l-value/r-value mechanics, and standard I/O functions.
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
              filename="004_002_python_tokens_and_lvalue_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
