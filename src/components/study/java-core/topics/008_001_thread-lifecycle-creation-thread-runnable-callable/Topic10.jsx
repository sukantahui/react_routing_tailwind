import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import clbDemoCode from "./topic10_files/CallableAndFutureTaskDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Callable &amp; FutureTask
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Creation Method 4: <code className="text-emerald-400 font-mono">Callable&lt;V&gt;</code>, Return Values &amp; Checked Exceptions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Overcome <code className="text-rose-300 font-mono">Runnable</code> limitations: returning typed values and propagating checked exceptions across asynchronous threads using <code className="text-emerald-300 font-mono">Callable&lt;V&gt;</code> and <code className="text-sky-300 font-mono">FutureTask</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={clbDemoCode}
          title="CallableAndFutureTaskDemo.java"
          highlightLines={[7, 10, 18, 19, 36, 37, 40, 41, 46, 47]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Callable & FutureTask FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 10: Callable & FutureTask"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic10_callable_and_futuretask_note.txt"
        />
      </section>

      <Teacher
        note="If your background thread needs to return an answer (like calculating total taxes or loading data from a database), use Callable instead of Runnable! Callable returns a value and can throw checked exceptions! — Sukanta Hui"
      />
    </div>
  );
}