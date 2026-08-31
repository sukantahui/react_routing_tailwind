import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import biFoundDemoCode from "./topic12_files/BigIntegerFoundationsDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 12
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Infinite Integer Precision
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-indigo-400 font-mono">java.math.BigInteger</code>: Arbitrary-Precision Integers for Cryptography
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Break free from 64-bit <code className="text-amber-400 font-mono">long</code> boundaries: computing exact 50-digit factorials and understanding infinite integer memory structures in RAM.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={biFoundDemoCode}
          title="BigIntegerFoundationsDemo.java"
          highlightLines={[7, 17, 18, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="BigInteger FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 12: BigInteger Foundations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic12_biginteger_foundations_note.txt"
        />
      </section>

      <Teacher
        note="If you need to calculate 100! (factorial of 100) in Java, long overflows at 21!. BigInteger handles 10,000! effortlessly in milliseconds! — Sukanta Hui"
      />
    </div>
  );
}