import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import insDemoCode from "./topic9_files/Restriction4NoInstanceofParameterizedTypesDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 9
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Restriction 4
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Restriction 4: Cannot Use <code className="text-rose-400 font-mono">instanceof</code> with Parameterized Types (<code className="text-rose-400 font-mono">List&lt;String&gt;</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master reifiability constraints: understanding why non-reifiable parameterized types cannot be tested with <code className="text-rose-400 font-mono">instanceof</code> and applying <code className="text-emerald-300 font-mono">List&lt;?&gt;</code> checks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={insDemoCode}
          title="Restriction4NoInstanceofParameterizedTypesDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Instanceof FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 9: Restriction 4 - No Instanceof"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic9_restriction4_no_instanceof_note.txt"
        />
      </section>

      <Teacher
        note="At runtime, the JVM has no idea if a list was created as List<String> or List<Integer>! That's why 'obj instanceof List<String>' is illegal! Always write 'obj instanceof List<?>' instead! — Sukanta Hui"
      />
    </div>
  );
}