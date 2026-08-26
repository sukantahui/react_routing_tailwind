import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import closureDemoCode from "./topic11_files/EffectivelyFinalClosureDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 11
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Closure Mechanics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-amber-400 font-mono">Effectively Final</code> Variable Rule (Java 8+) for Inner Class Closures
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand closure variable capture in the JVM: tracing why local variables must never be reassigned after capture and how Java 8 eliminated mandatory <code className="text-emerald-300 font-mono">final</code> keyword boilerplate.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={closureDemoCode}
          title="EffectivelyFinalClosureDemo.java"
          highlightLines={[7, 18, 21, 23, 24, 25, 26, 27, 30, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Effectively Final FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 11: Effectively Final Rule"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic11_effectively_final_note.txt"
        />
      </section>

      <Teacher
        note="If a method finishes execution, its stack frame is destroyed! But the inner class may live on in another thread. That is why Java copies the effectively final variable into the inner class heap object! — Sukanta Hui"
      />
    </div>
  );
}