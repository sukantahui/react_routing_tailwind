import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import crDemoCode from "./topic6_files/ConstructorReferenceDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_003 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Constructor References
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Kind 4: Reference to a <code className="text-emerald-400 font-mono">Constructor</code> (<code className="text-sky-400 font-mono">ClassName::new</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Instantiate objects declaratively: exploring constructor reference resolution across <code className="text-emerald-300 font-mono">Supplier</code>, <code className="text-sky-300 font-mono">Function</code>, and <code className="text-purple-300 font-mono">BiFunction</code> SAM parameter signatures.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={crDemoCode}
          title="ConstructorReferenceDemo.java"
          highlightLines={[7, 8, 9, 10, 39, 40, 43, 44, 47, 48, 51, 52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Constructor References FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_003 Topic 6: Constructor References"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_003_topic6_constructor_references_note.txt"
        />
      </section>

      <Teacher
        note="Constructor references are the ultimate factory shortcuts! Instead of writing '() → new ArrayList&lt;&gt;()', just write 'ArrayList::new'! Java inspects the constructor arguments and calls the right one automatically! — Sukanta Hui"
      />
    </div>
  );
}