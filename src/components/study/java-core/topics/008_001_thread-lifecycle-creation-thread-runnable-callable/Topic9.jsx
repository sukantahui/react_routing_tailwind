import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lmbDemoCode from "./topic9_files/RunnableLambdaExpressionsDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_001 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Creation Method 3
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Creation Method 3: Java 8 Lambda Expressions with <code className="text-emerald-400 font-mono">Runnable</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct concise background workers: leveraging functional interface SAM conversion to launch parallel tasks using inline <code className="text-emerald-300 font-mono">() -&gt; &#123; ... &#125;</code> lambda syntax.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lmbDemoCode}
          title="RunnableLambdaExpressionsDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 21, 22, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Runnable Lambda FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_001 Topic 9: Runnable Lambda Expressions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_001_topic9_runnable_lambda_expressions_note.txt"
        />
      </section>

      <Teacher
        note="With Java 8 lambdas, you can spin up a background worker in a single line: 'new Thread(() -> sendEmail()).start()'! No extra classes, no boilerplate—just pure readable concurrency! — Sukanta Hui"
      />
    </div>
  );
}