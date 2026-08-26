import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ssmDemoCode from "./topic5_files/SynchronizedStaticMethodsDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 5
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Class-Level Lock
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Synchronized Static Methods: Class-Level Locks (<code className="text-purple-400 font-mono">ClassName.class</code> Monitor)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master global static synchronization: protecting shared static memory across all JVM instances by locking the <code className="text-purple-300 font-mono">Class&lt;?&gt;</code> reflection object in Metaspace.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ssmDemoCode}
          title="SynchronizedStaticMethodsDemo.java"
          highlightLines={[7, 10, 14, 15, 29, 30, 31, 35, 36]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Class-Level Lock FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 5: Synchronized Static Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic5_synchronized_static_methods_note.txt"
        />
      </section>

      <Teacher
        note="If a method is 'static synchronized', Java locks the entire Class blueprint (ClassName.class)! Even if you have 100 separate objects in memory, only ONE thread in the whole JVM can run that static method at a time! — Sukanta Hui"
      />
    </div>
  );
}