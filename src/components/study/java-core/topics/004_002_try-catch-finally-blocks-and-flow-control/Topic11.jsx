import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import retBadDemoCode from "./topic11_files/ReturnInFinallyAntiPatternDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_002 · Topic 11
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Severe Anti-Pattern
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Returning Values from a <code className="text-rose-400 font-mono">finally</code> Block is a Dangerous Anti-Pattern
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnose catastrophic exception swallowing: discovering why <code className="text-rose-300 font-mono">return</code> in finally overrides previous returns, suppresses runtime crashes, and hides production errors.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={retBadDemoCode}
          title="ReturnInFinallyAntiPatternDemo.java"
          highlightLines={[7, 10, 12, 13, 17, 18, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Return in Finally FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_002 Topic 11: Return in finally Anti-Pattern"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_002_topic11_return_in_finally_note.txt"
        />
      </section>

      <Teacher
        note="Never put 'return' inside a finally block! It will silently delete any exception thrown in try! If your server had a database failure, a return in finally makes Java pretend everything succeeded! — Sukanta Hui"
      />
    </div>
  );
}