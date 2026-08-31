import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ieeeDemoCode from "./topic5_files/IeeeFloatingPointDilemmaDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_004 · Topic 5
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Binary Hardware Dilemma
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The IEEE 754 Floating-Point Dilemma: Why <code className="text-rose-400 font-mono">0.1 + 0.2 == 0.30000000000000004</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace base-2 binary floating-point representation: understanding why 0.1 creates an infinite repeating binary sequence and why IEEE 754 hardware causes roundoff truncation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ieeeDemoCode}
          title="IeeeFloatingPointDilemmaDemo.java"
          highlightLines={[7, 13, 14, 15, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="IEEE 754 FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_004 Topic 5: IEEE 754 Dilemma"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_004_topic5_ieee754_dilemma_note.txt"
        />
      </section>

      <Teacher
        note="Just like 1/3 in decimal is 0.33333..., 1/10 in binary is 0.0001100110011... infinitely! The computer has to chop it off somewhere, which causes tiny fractions of a cent to disappear or appear! — Sukanta Hui"
      />
    </div>
  );
}