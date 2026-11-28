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
import pythonCode from "./topic0_files/python_tokens_lexical_lab.py?raw";

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
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
        <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
          <Variable size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Interactive Identifier &amp; Keyword Rules Auditor
          </h3>
          <p className="text-xs text-slate-400">
            Type any variable name to test statutory Python lexical rules in real time.
          </p>
        </div>
      </div>

      <div className="space-y-3">
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

        <div
          className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
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

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Class XI Core Revision
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Review of Python Tokens: Keywords, Identifiers, Literals, Operators &amp; Punctuators
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the foundational building blocks of Python source code. Learn the five statutory token classifications, strict identifier naming rules, numeral systems (hex, octal, binary), and common board examination traps.
            </p>
          </div>
        </div>

        {/* 2. Interactive Tool */}
        <IdentifierValidatorWidget />

        {/* 3. Deep Technical Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
              <Code size={18} className="text-sky-400" /> The 5 Token Categories
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li><strong>1. Keywords (35):</strong> Reserved words with pre-set grammatical meanings (e.g., <code className="text-pink-400">def</code>, <code className="text-pink-400">return</code>). Only <code className="text-emerald-400">True</code>, <code className="text-emerald-400">False</code>, and <code className="text-emerald-400">None</code> are capitalized.</li>
              <li><strong>2. Identifiers:</strong> User-defined names for variables, functions, and objects. Must start with a letter or underscore, never a digit.</li>
              <li><strong>3. Literals:</strong> Fixed data values: Numbers (<code className="text-sky-400">42, 3.14, 0x1A</code>), Strings (<code className="text-amber-400">"CBSE"</code>), Booleans, and <code className="text-purple-400">None</code>.</li>
              <li><strong>4. Operators:</strong> Computation triggers: Arithmetic, Relational, Logical (<code className="text-indigo-400">and, or, not</code>), Identity (<code className="text-indigo-400">is</code>), and Membership (<code className="text-indigo-400">in</code>).</li>
              <li><strong>5. Punctuators:</strong> Syntax organizers and delimiters: <code className="text-slate-400">: , ( ) [ ] { } = @</code>.</li>
            </ul>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" /> CBSE Board Traps &amp; Rules
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li><strong className="text-rose-400">Trap 1:</strong> Using keywords as variable names (e.g. <code className="text-rose-400">pass = 80</code> raises SyntaxError).</li>
              <li><strong className="text-rose-400">Trap 2:</strong> Starting identifier with digit (e.g. <code className="text-rose-400">2nd_rank = 'Ajay'</code>).</li>
              <li><strong className="text-rose-400">Trap 3:</strong> Hyphen vs Underscore: <code className="text-rose-400">total-score</code> is evaluated as subtraction, raising NameError!</li>
              <li><strong className="text-emerald-400">Pro Rule:</strong> Use snake_case for variables (<code className="text-emerald-400">student_age</code>) and SCREAMING_SNAKE for constants (<code className="text-emerald-400">MAX_MARKS = 100</code>).</li>
            </ul>
          </div>
        </div>

        {/* 4. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Python Tokens Deep-Dive</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="python_tokens_lexical_lab.py"
            highlightLines={[9, 10, 24, 25, 26, 42]}
          />
        </div>

        {/* 5. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Python Tokens"
            questions={questions}
          />
        </div>

        {/* 6. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="In CBSE Class 12 CS (083) Section A, Q1 and Q2 almost always test valid/invalid identifiers or keyword capitalization. Keep in mind: True, False, and None are the ONLY capitalized keywords in Python! — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 0)"
            filename="topic0_python_tokens_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
