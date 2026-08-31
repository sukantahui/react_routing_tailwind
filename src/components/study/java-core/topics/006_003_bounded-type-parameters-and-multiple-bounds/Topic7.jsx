import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import calcDemoCode from "./topic7_files/GenericNumericCalculatorProjectDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_003 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Numeric Calculator
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Building a Type-Safe Generic Numeric Calculator
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Unify numerical operations: constructing a polymorphic mathematical calculator supporting Byte, Short, Integer, Long, Float, and Double numbers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={calcDemoCode}
          title="GenericNumericCalculatorProjectDemo.java"
          highlightLines={[7, 10, 11, 19, 20, 21, 22, 33, 39]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Numeric Calculator FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_003 Topic 7: Generic Numeric Calculator"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_003_topic7_generic_numeric_calculator_note.txt"
        />
      </section>

      <Teacher
        note="Because Java doesn't let us write 'T a + T b', bounding 'T extends Number' and calling 'a.doubleValue() + b.doubleValue()' is the industry-standard way to build generic math libraries! — Sukanta Hui"
      />
    </div>
  );
}