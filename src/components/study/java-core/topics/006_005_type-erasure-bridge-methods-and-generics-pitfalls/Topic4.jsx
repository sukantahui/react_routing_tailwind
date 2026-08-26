import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jvpDemoCode from "./topic4_files/JavapBytecodeDisassemblyDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Bytecode Disassembly
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Inspecting Bytecode with <code className="text-emerald-400 font-mono">javap -c -v</code>: Observing Erased Types &amp; Bridge Flags
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Disassemble compiled classes: using JDK&apos;s <code className="text-emerald-300 font-mono">javap</code> utility to observe erased type descriptors, checkcast instructions, and synthetic bridge method flags.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={jvpDemoCode}
          title="JavapBytecodeDisassemblyDemo.java"
          highlightLines={[7, 10, 11, 20, 21, 25, 26, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Javap FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 4: Javap Bytecode Disassembly"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic4_javap_bytecode_disassembly_note.txt"
        />
      </section>

      <Teacher
        note="You can verify type erasure with your own eyes by running 'javap -c MyClass.class' in your terminal! You will see that all your <T> types turned into Object or CharSequence in the actual bytecode! — Sukanta Hui"
      />
    </div>
  );
}