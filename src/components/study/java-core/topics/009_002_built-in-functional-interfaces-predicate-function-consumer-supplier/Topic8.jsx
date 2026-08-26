import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fcaDemoCode from "./topic8_files/FunctionCompositionAndThenComposeDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Function Chaining
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">Function</code> Chaining: <code className="text-sky-400 font-mono">andThen()</code> vs <code className="text-purple-400 font-mono">compose()</code> &amp; <code className="text-amber-400 font-mono">identity()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Construct mathematical transformation pipelines: contrasting left-to-right <code className="text-sky-300 font-mono">andThen()</code> forwarding with right-to-left <code className="text-purple-300 font-mono">compose()</code> nesting, and applying the <code className="text-amber-300 font-mono">Function.identity()</code> helper.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fcaDemoCode}
          title="FunctionCompositionAndThenComposeDemo.java"
          highlightLines={[7, 10, 14, 19, 25, 26, 32, 33, 37, 38]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Function Chaining FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_002 Topic 8: Function Chaining"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_002_topic8_function_chaining_note.txt"
        />
      </section>

      <Teacher
        note="Remember the golden rule: andThen() means 'do THIS, and then do THAT' (Left to Right). compose() is the mathematical reverse: 'compose THIS after THAT' (Right to Left)! When in doubt, andThen() is almost always what you want! — Sukanta Hui"
      />
    </div>
  );
}