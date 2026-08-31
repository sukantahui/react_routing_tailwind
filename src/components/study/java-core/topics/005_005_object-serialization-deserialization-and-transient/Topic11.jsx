import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import extDemoCode from "./topic11_files/ExternalizableManualControlDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 11
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Manual Serialization
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-purple-400 font-mono">java.io.Externalizable</code> Interface: Manual Total Control
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Take total control over binary serialization: implementing <code className="text-emerald-300 font-mono">writeExternal()</code> and <code className="text-sky-300 font-mono">readExternal()</code> and fulfilling the public no-arg constructor mandate.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={extDemoCode}
          title="ExternalizableManualControlDemo.java"
          highlightLines={[7, 10, 15, 16, 22, 23, 31, 32, 38, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Externalizable FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 11: Externalizable Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic11_externalizable_interface_note.txt"
        />
      </section>

      <Teacher
        note="If performance is critical and you don't want Java reflection slowing you down, use Externalizable! You decide exactly which bytes get written and read, giving you 5x faster speeds! — Sukanta Hui"
      />
    </div>
  );
}