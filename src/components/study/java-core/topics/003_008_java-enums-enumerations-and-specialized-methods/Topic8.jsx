import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import polyDemoCode from "./topic8_files/ConstantSpecificMethodsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Polymorphic Enums
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Constant-Specific Method Implementations: Polymorphic Behavior in Enums
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Eliminate brittle switch statements: defining abstract methods on enums and letting each constant provide its own specialized calculation logic.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={polyDemoCode}
          title="ConstantSpecificMethodsDemo.java"
          highlightLines={[7, 10, 11, 12, 14, 15, 17, 18, 20, 21, 31]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Polymorphic Enums FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 8: Constant-Specific Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic8_constant_specific_methods_note.txt"
        />
      </section>

      <Teacher
        note="Notice how clean Constant-Specific Methods are! Instead of a 20-line switch statement with possible forgotten cases, each constant carries its own behavior right next to its name! — Sukanta Hui"
      />
    </div>
  );
}