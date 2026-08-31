import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dcoDemoCode from "./topic1_files/DoubleColonOperatorSyntaxDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_003 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Double Colon (::)
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">Double Colon (::)</code> Operator Syntax &amp; Token Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the delimiter syntax: understanding <code className="text-emerald-300 font-mono">Target::MethodName</code> grammar, avoiding trailing parentheses traps, and letting the compiler route SAM parameters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={dcoDemoCode}
          title="DoubleColonOperatorSyntaxDemo.java"
          highlightLines={[7, 10, 18, 19, 21, 22, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Double Colon FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_003 Topic 1: Double Colon Operator"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_003_topic1_double_colon_operator_note.txt"
        />
      </section>

      <Teacher
        note="Common rookie mistake: typing 'Math::max()' with parentheses! Remember: parentheses mean you want to CALL the method right now; omitting parentheses with '::' means you are handing the method OVER to someone else to call later! — Sukanta Hui"
      />
    </div>
  );
}