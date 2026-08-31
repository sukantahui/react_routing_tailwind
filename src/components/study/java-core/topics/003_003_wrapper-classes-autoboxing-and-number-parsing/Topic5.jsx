import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bytecodeDemoCode from "./topic5_files/CompilerBytecodeTranslationDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 5
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Bytecode Decompilation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          How the Compiler Translates Autoboxing: <code className="text-purple-400 font-mono">valueOf()</code> &amp; <code className="text-emerald-400 font-mono">intValue()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Decompile the syntactic sugar of autoboxing: discovering why <code className="text-amber-300 font-mono">obj++</code> performs unboxing, arithmetic addition, and re-boxing behind the scenes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={bytecodeDemoCode}
          title="CompilerBytecodeTranslationDemo.java"
          highlightLines={[7, 13, 14, 15, 19, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bytecode Translation FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 5: Compiler Translation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic5_bytecode_translation_note.txt"
        />
      </section>

      <Teacher
        note="Never use 'Integer' as a loop counter variable ('for (Integer i = 0; i < 1000; i++)')! It creates 1,000 intermediate objects because of re-boxing on every single increment! — Sukanta Hui"
      />
    </div>
  );
}