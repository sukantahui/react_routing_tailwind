import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import java9DemoCode from "./topic7_files/Java9EffectivelyFinalArmDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_004 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Java 9 Modernization
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Java 9 Enhancement: Using <code className="text-emerald-400 font-mono">Effectively Final</code> Variables in ARM
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Clean up modern codebases: leveraging Java 9 syntax to pass pre-declared effectively final resource handles directly into try-with-resources headers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={java9DemoCode}
          title="Java9EffectivelyFinalArmDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Java 9 ARM FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_004 Topic 7: Java 9 ARM"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_004_topic7_java9_arm_note.txt"
        />
      </section>

      <Teacher
        note="If a method takes an open stream parameter, in Java 9+ you can write 'try (stream)' directly without creating a dummy second variable! Much cleaner! — Sukanta Hui"
      />
    </div>
  );
}