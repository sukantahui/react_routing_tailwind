import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import privDemoCode from "./topic7_files/EnumPrivateConstructorIntegrityDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 7
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Constructor Security
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Enum Constructors Are Strictly Private by Default
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand JVM instance control: discovering why <code className="text-emerald-300 font-mono">new MyEnum()</code> is illegal and how private constructors guarantee immutable singleton integrity.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={privDemoCode}
          title="EnumPrivateConstructorIntegrityDemo.java"
          highlightLines={[7, 10, 11, 12, 17, 18, 19, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Private Constructor FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 7: Enum Private Constructors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic7_enum_private_constructor_note.txt"
        />
      </section>

      <Teacher
        note="If you try to write 'public MyEnum()', the Java compiler will shout at you! Enums represent a closed set of instances instantiated strictly once by the JVM! — Sukanta Hui"
      />
    </div>
  );
}