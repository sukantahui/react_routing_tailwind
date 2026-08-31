import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import exactDemoCode from "./topic2_files/ExactArithmeticOverflowDetectionDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 2
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Overflow Protection
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Exact Arithmetic with Overflow Detection: <code className="text-emerald-400 font-mono">Math.addExact()</code> &amp; <code className="text-emerald-400 font-mono">multiplyExact()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Prevent silent integer wraparounds: exploring Java 8 exact arithmetic methods that catch integer overflows and safely downcast with <code className="text-emerald-300 font-mono">Math.toIntExact()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={exactDemoCode}
          title="ExactArithmeticOverflowDetectionDemo.java"
          highlightLines={[7, 14, 15, 20, 21, 28, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Exact Arithmetic FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 2: Exact Arithmetic"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic2_exact_arithmetic_note.txt"
        />
      </section>

      <Teacher
        note="Silent overflow has caused spacecraft failures and financial loss! Always use Math.addExact() or Math.multiplyExact() when calculating critical account balances. — Sukanta Hui"
      />
    </div>
  );
}