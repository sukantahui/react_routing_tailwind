import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import switchDemoCode from "./topic5_files/EnumSwitchExpressionsDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Modern Switch
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Using Enums in Modern Switch Statements &amp; Expressions (Java 14+)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Write elegant pattern matching: leveraging arrow switch expressions, compiler exhaustiveness verification, and eliminating boilerplate break statements.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={switchDemoCode}
          title="EnumSwitchExpressionsDemo.java"
          highlightLines={[7, 16, 17, 18, 19, 20, 21, 22, 30, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Enum Switch FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 5: Enums in Switch Expressions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic5_enum_switch_note.txt"
        />
      </section>

      <Teacher
        note="With modern arrow switch expressions, you don't even need a 'default:' case if you handle all enum constants! The compiler will alert you the second you add a new constant! — Sukanta Hui"
      />
    </div>
  );
}