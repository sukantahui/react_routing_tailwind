import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import revDemoCode from "./topic5_files/ReverseOrderTeardownSequenceDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            LIFO Teardown
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Automatic Invocation of <code className="text-emerald-400 font-mono">close()</code> in Reverse Order of Declaration
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand dependency-aware resource teardown: discovering why the JVM guarantees Last-In-First-Out closing sequence to protect dependent stream pipelines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={revDemoCode}
          title="ReverseOrderTeardownSequenceDemo.java"
          highlightLines={[7, 13, 14, 25, 26, 27, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Reverse Order FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 5: Reverse Order Teardown"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic5_reverse_order_teardown_note.txt"
        />
      </section>

      <Teacher
        note="If you open a Database Connection first and then a ResultSet second, you MUST close the ResultSet first before closing the Connection! Try-with-resources handles this automatically in reverse order! — Sukanta Hui"
      />
    </div>
  );
}