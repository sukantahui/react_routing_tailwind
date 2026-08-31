import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lsvDemoCode from "./topic2_files/LambdaSyntaxVariationsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Syntax Variations
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-purple-400 font-mono">Lambda Syntax Variations</code>: Type Inference &amp; Compact Expressions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master compact functional notation: applying compiler type inference, omitting parentheses on single arguments, and constructing single-expression shortcuts without return boilerplate.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={lsvDemoCode}
          title="LambdaSyntaxVariationsDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 20, 21, 23, 24, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Syntax Variations FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_001 Topic 2: Syntax Variations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_001_topic2_lambda_syntax_variations_note.txt"
        />
      </section>

      <Teacher
        note="If your lambda is just 1 parameter and 1 calculation, you can strip away the types, parentheses, curly braces, and return keyword! '(Integer x) → { return x * 2; }' shrinks down to just 'x → x * 2'! Ultra clean! — Sukanta Hui"
      />
    </div>
  );
}