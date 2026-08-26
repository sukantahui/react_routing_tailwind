import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import uprDemoCode from "./topic8_files/UnboundParameterResolutionMechanicsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Parameter Resolution
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Compiler Resolution in <code className="text-purple-400 font-mono">Unbound Method References</code>: Dual Parameter Routing
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect compiler dispatch mechanics: analyzing how <code className="text-emerald-300 font-mono">String::startsWith</code> maps the first SAM argument to the invocation receiver and subsequent arguments to method parameters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={uprDemoCode}
          title="UnboundParameterResolutionMechanicsDemo.java"
          highlightLines={[7, 8, 20, 21, 24, 25, 30, 31, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Parameter Resolution FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_003 Topic 8: Parameter Resolution"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_003_topic8_parameter_resolution_note.txt"
        />
      </section>

      <Teacher
        note="When you write 'BiPredicate<String, String> p = String::startsWith', Java is smart: it takes the first String as the caller ('s1.') and the second String as the input argument ('.startsWith(s2)')! Elegant compiler magic! — Sukanta Hui"
      />
    </div>
  );
}