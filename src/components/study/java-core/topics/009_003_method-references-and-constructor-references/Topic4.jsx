import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bimDemoCode from "./topic4_files/BoundInstanceMethodReferenceDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_003 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Bound Instance References
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Kind 2: Reference to an <code className="text-emerald-400 font-mono">Instance Method</code> of a Particular Object (<code className="text-sky-400 font-mono">obj::method</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Bind execution to specific instances: exploring bound instance method references, analyzing target object lifecycles, and demystifying the ubiquitous <code className="text-emerald-300 font-mono">System.out::println</code> handle.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bimDemoCode}
          title="BoundInstanceMethodReferenceDemo.java"
          highlightLines={[7, 10, 15, 16, 26, 27, 30, 31, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bound References FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_003 Topic 4: Bound Instance References"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_003_topic4_bound_instance_references_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you already have an object sitting in a variable (like 'notifier' or 'System.out'), writing 'notifier::dispatchNotification' binds the method to that specific object! — Sukanta Hui"
      />
    </div>
  );
}