import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import comparisonDemoCode from "./topic15_files/ThisVsSuperComprehensiveComparisonDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
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
            Module 002_003 · Topic 15
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Mastery Matrix
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Comprehensive Comparison Table: <code className="text-sky-400 font-mono">this</code> vs <code className="text-indigo-400 font-mono">super</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          The ultimate side-by-side comparison matrix. Master all structural, semantic, and JVM differences between Java's two most essential keywords.
        </p>
      </header>

      {/* Section 1: Comparison Table */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📋</span> The Definitive Comparison Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-700 font-mono">
              <tr>
                <th className="p-3 text-sky-400">Feature</th>
                <th className="p-3 text-sky-300">this</th>
                <th className="p-3 text-indigo-300">super</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-semibold text-white">Target Reference</td>
                <td className="p-3 font-mono text-sky-300">Current class instance</td>
                <td className="p-3 font-mono text-indigo-300">Direct superclass members</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-semibold text-white">Field Access</td>
                <td className="p-3">Resolves shadowing (<code className="text-sky-300 font-mono">this.x = x</code>)</td>
                <td className="p-3">Accesses parent field (<code className="text-indigo-300 font-mono">super.x</code>)</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-semibold text-white">Method Invocation</td>
                <td className="p-3">Calls current class method</td>
                <td className="p-3">Calls overridden parent method</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-semibold text-white">Constructor Chaining</td>
                <td className="p-3"><code className="text-sky-300 font-mono">this(...)</code> invokes peer constructor</td>
                <td className="p-3"><code className="text-indigo-300 font-mono">super(...)</code> invokes parent constructor</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-semibold text-white">Static Context</td>
                <td className="p-3 text-rose-300 font-semibold">FORBIDDEN</td>
                <td className="p-3 text-rose-300 font-semibold">FORBIDDEN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={comparisonDemoCode}
          title="ThisVsSuperComprehensiveComparisonDemo.java"
          highlightLines={[18, 22, 33, 34]}
        />
      </section>

      {/* Section 3: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="this vs super FAQs"
          questions={questions}
        />
      </section>

      {/* Section 4: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_003 Topic 15: this vs super Comparison"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_003_topic15_comparison_note.txt"
        />
      </section>

      {/* Section 5: Teacher's Note */}
      <Teacher
        note="Congratulations on mastering Module 002_003! You now understand both 'this' (current object identity) and 'super' (parent bridge). Keep practicing in the Barrackpore lab! — Sukanta Hui"
      />
    </div>
  );
}