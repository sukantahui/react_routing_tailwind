import React from 'react';
import {
  Code, Terminal, CheckCircle2, AlertTriangle, HelpCircle,
  Layers, ArrowRight, ShieldCheck, Check, X, Calculator
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/operator_precedence_short_circuit_lab.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit I · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Expression Evaluation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Operators &amp; Expression Evaluation: Precedence, Associativity &amp; Short-Circuit Logic
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master arithmetic operator precedence, right-to-left associativity of exponentiation, negative floor division and modulo mechanics, and short-circuit boolean logic.
            </p>
          </div>
        </div>

        {/* 2. Key Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider">
              1. Exponentiation
            </h3>
            <p className="text-xs text-slate-300">
              <code className="text-pink-400 font-bold">**</code> associates <strong>Right-to-Left</strong>!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300">
              2 ** 3 ** 2 = 2 ** (9) = 512
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              2. Negative Floor Div
            </h3>
            <p className="text-xs text-slate-300">
              <code className="text-amber-400 font-bold">//</code> rounds <strong>DOWN</strong> towards -∞!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono text-amber-300">
              -7 // 2 = -4 (NOT -3!)
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              3. Short-Circuit
            </h3>
            <p className="text-xs text-slate-300">
              Stops evaluation as soon as result is guaranteed!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300">
              0 and 100 → 0<br/>
              10 or crash() → 10
            </div>
          </div>
        </div>

        {/* 3. Code Demonstration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">Executable Laboratory Script: Precedence &amp; Short-Circuit Mechanics</h2>
          </div>
          <PythonFileLoader
            fileModule={pythonCode}
            title="operator_precedence_short_circuit_lab.py"
            highlightLines={[9, 17, 18, 27, 28, 33]}
          />
        </div>

        {/* 4. 25-Question FAQ Assessment */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
          <FAQTemplate
            title="CBSE Class XII CS (083) – 25 Diagnostic Questions: Operator Precedence"
            questions={questions}
          />
        </div>

        {/* 5. Teacher's Note & Plain Text Print */}
        <div className="space-y-6">
          <Teacher
            note="Pay close attention to Section A questions featuring '-7 // 2' or '2 ** 3 ** 2'. Almost 40% of board examinees incorrectly answer -3 and 64 respectively! Remember: exponentiation is right-to-left, and floor division rounds down. — Sukanta Hui"
          />
          <PlainTextPrint
            content={noteText}
            title="CBSE Class XII CS 083 – Quick Revision Document (Topic 3)"
            filename="topic3_operators_precedence_notes.txt"
          />
        </div>

      </div>
    </div>
  );
}
