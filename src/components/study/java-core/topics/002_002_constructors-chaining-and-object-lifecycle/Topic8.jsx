import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import thisRulesDemoCode from "./topic8_files/ThisCallFirstStatementRulesDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Compiler Syntax Constraints
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Rules of <code className="text-sky-400 font-mono">this()</code> Call: The First Statement Mandate
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the exact compiler laws governing <code className="text-sky-300 font-mono">this(...)</code>: why it must occupy statement #1, permitted static expressions in arguments, and why instance members are strictly prohibited.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚖️</span> The 3 Iron Laws of <code className="text-sky-300 font-mono">this()</code>
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When using constructor chaining, the Java compiler enforces strict grammatical constraints to prevent accessing half-baked object states:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-1">1. Strict Line 1</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Must be the very first executable statement in the constructor body. Zero statements allowed before it.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">2. No 'this' Access</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Cannot access instance fields or instance methods in argument expressions. Only static members allowed.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">3. No super() Coexistence</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Cannot use both <code className="text-sky-300 font-mono">this()</code> and <code className="text-emerald-300 font-mono">super()</code> in the same constructor body.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Legal vs Illegal <code className="text-sky-300 font-mono">this()</code> Placement
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 220" className="w-full h-auto">
            <rect x="30" y="30" width="410" height="160" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="235" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">✔ VALID: this() ON STATEMENT 1</text>
            <rect x="45" y="80" width="380" height="90" rx="6" fill="#064e3b" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
            <text x="60" y="105" fill="#a7f3d0" fontSize="10" fontFamily="monospace">public Student(String name) {'{'}</text>
            <text x="80" y="125" fill="#fde047" fontSize="10" fontFamily="monospace">this(name, 101); // LINE 1: LEGAL!</text>
            <text x="80" y="145" fill="#a7f3d0" fontSize="10" fontFamily="monospace">System.out.println(&quot;Logged&quot;); // Post-init</text>
            <text x="60" y="160" fill="#a7f3d0" fontSize="10" fontFamily="monospace">{'}'}</text>

            <rect x="480" y="30" width="410" height="160" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="685" y="60" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">✖ ILLEGAL: STATEMENT BEFORE this()</text>
            <rect x="495" y="80" width="380" height="90" rx="6" fill="#450a0a" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
            <text x="510" y="105" fill="#fca5a5" fontSize="10" fontFamily="monospace">public Student(String name) {'{'}</text>
            <text x="530" y="125" fill="#f87171" fontSize="10" fontFamily="monospace">System.out.println(&quot;Starting&quot;); // ERROR!</text>
            <text x="530" y="145" fill="#fca5a5" fontSize="10" fontFamily="monospace">this(name, 101); // COMPILE ERROR</text>
            <text x="510" y="160" fill="#fca5a5" fontSize="10" fontFamily="monospace">{'}'}</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={thisRulesDemoCode}
          title="ThisCallFirstStatementRulesDemo.java"
          highlightLines={[13, 27, 31, 39]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Rules of this() Call FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 8: Rules of this() Call"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic8_rules_of_this_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Remember my golden phrase: Foundation first, decoration later. In Java, this(...) or super(...) is your foundation and must sit firmly on Line 1. Any statements you want to run must wait until after this(...) finishes! — Sukanta Hui"
      />
    </div>
  );
}