import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ersDemoCode from "./topic0_files/TypeErasureFundamentalsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Type Erasure
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          How Java Achieves Backward Compatibility: The Type Erasure Compiler Mechanism
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover JVM internals: analyzing how the Java compiler erases type variables during bytecode generation to guarantee 100% backward compatibility with legacy JVMs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ersDemoCode}
          title="TypeErasureFundamentalsDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 19, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Type Erasure FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 0: Type Erasure Mechanism"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic0_type_erasure_mechanism_note.txt"
        />
      </section>

      <Teacher
        note="Generics are a compile-time illusion! The compiler checks all your types to make sure there are no bugs, and then erases them completely so old JVMs can run the code without changes! — Sukanta Hui"
      />
    </div>
  );
}