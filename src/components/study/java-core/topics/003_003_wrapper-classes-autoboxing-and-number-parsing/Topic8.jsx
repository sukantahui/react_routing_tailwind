import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import npeDemoCode from "./topic8_files/UnboxingNullPointerExceptionDangerDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Production Danger
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Hidden Danger of Unboxing: <code className="text-rose-400 font-mono">NullPointerException</code> on Null Wrappers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnose and eliminate the #1 autoboxing disaster in production: why unboxing null wrapper references triggers unexpected runtime <code className="text-rose-400 font-mono">NullPointerException</code> crashes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={npeDemoCode}
          title="UnboxingNullPointerExceptionDangerDemo.java"
          highlightLines={[7, 14, 18, 19, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Unboxing NPE FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 8: Unboxing NPE Trap"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic8_unboxing_npe_note.txt"
        />
      </section>

      <Teacher
        note="If your database entity has a column mapped to Integer and it contains NULL, assigning it to a primitive 'int score = entity.getScore();' will crash your server! Always check null or keep it as Integer. — Sukanta Hui"
      />
    </div>
  );
}