import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import capstoneDemoCode from "./topic13_files/WrapperUtilitiesAndConstantsCapstoneDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_003 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone Toolbox
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Wrapper Utility Constants &amp; Methods: <code className="text-emerald-400 font-mono">MAX_VALUE</code>, <code className="text-sky-400 font-mono">toBinaryString()</code> &amp; <code className="text-amber-400 font-mono">compare()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize all wrapper class utilities: inspecting bit architecture constants, binary string conversions, population count bit manipulation, and overflow-safe <code className="text-emerald-300 font-mono">compare()</code> helpers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={capstoneDemoCode}
          title="WrapperUtilitiesAndConstantsCapstoneDemo.java"
          highlightLines={[7, 14, 15, 21, 23, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Wrapper Toolbox FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_003 Topic 13: Wrapper Toolbox Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_003_topic13_wrapper_toolbox_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 003_003! You now understand the complete mechanics of Wrapper Classes, Autoboxing/Unboxing bytecode translations, the IntegerCache pool, and safe numeric parsing! — Sukanta Hui"
      />
    </div>
  );
}