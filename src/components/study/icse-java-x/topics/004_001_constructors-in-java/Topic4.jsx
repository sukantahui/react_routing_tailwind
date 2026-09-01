import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/ConstructorVsMethodDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

/**
 * Interactive Comparison Table Component
 */
const ComparisonAnalyzer = () => {
  const comparisonData = [
    { feature: "Name", constructor: "Must match Class Name exactly", method: "Any valid Java identifier" },
    { feature: "Return Type", constructor: "NO return type (not even void)", method: "MUST specify return type (void, primitive, ref)" },
    { feature: "Invocation", constructor: "Implicit via 'new' operator", method: "Explicit via dot notation (obj.method())" },
    { feature: "Primary Role", constructor: "Initialize object state", method: "Perform tasks / compute operations" },
    { feature: "Compiler Default", constructor: "Provided if zero constructors declared", method: "Never provided by compiler" },
    { feature: "Inheritance", constructor: "NOT inherited by subclasses", method: "Inherited by subclasses (unless private)" }
  ];

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-sky-400">
          📊 Comprehensive Comparison: Constructor vs Member Method
        </h3>
        <p className="text-xs text-slate-400">
          Side-by-side breakdown of structural and behavioral differences essential for ICSE Board Exams.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
              <th className="p-3 font-bold">Feature</th>
              <th className="p-3 font-bold text-amber-400">Constructor</th>
              <th className="p-3 font-bold text-emerald-400">Member Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-400">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-3 font-semibold text-slate-300">{row.feature}</td>
                <td className="p-3 text-amber-300 font-mono text-[11px]">{row.constructor}</td>
                <td className="p-3 text-emerald-300 font-mono text-[11px]">{row.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Constructor vs Method
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Difference Between Constructor and Member Method
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Detailed comparison of structural rules, invocation mechanics, and common ICSE exam traps regarding constructor definitions.
        </p>
      </header>

      {/* Comparison Table */}
      <section>
        <ComparisonAnalyzer />
      </section>

      {/* Exam Traps & Theory */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white">💡 Common ICSE Exam Traps & Misconceptions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-amber-400">The 'void' Return Type Trap</h3>
            <p className="text-xs text-slate-400">
              Writing <code className="text-amber-300">public void Student()</code> inside a <code className="text-sky-300">Student</code> class does NOT cause a compile error. Instead, Java turns it into a regular method. During <code className="text-sky-300">new Student()</code>, this method is IGNORED!
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400">Explicit Invocation Rule</h3>
            <p className="text-xs text-slate-400">
              Constructors can only be invoked during instantiation (<code className="text-emerald-300">new Class()</code>) or inside another constructor via <code className="text-emerald-300">this()</code> or <code className="text-emerald-300">super()</code>. They cannot be called via <code className="text-slate-400">obj.Constructor()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Code Demo */}
      <section>
        <JavaFileLoader
          fileName="ConstructorVsMethodDemo.java"
          code={demoCode}
          title="Executable Code: Demonstrating Constructor vs Method Invocation"
        />
      </section>

      {/* Quiz */}
      <section>
        <FAQTemplate questions={questions} title="ICSE Quiz: Constructor vs Method" />
      </section>

      {/* Teacher Note & Cheat Sheet */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Teacher note="ICSE Board Pattern: Question 2 of Section A frequently asks: 'State two differences between a constructor and a method'. Memorize the table above for full 2 marks!" />
        <PlainTextPrint content={noteText} title="Printable Cheat Sheet: Topic 4 Notes" />
      </section>
    </div>
  );
};

export default Topic4;
