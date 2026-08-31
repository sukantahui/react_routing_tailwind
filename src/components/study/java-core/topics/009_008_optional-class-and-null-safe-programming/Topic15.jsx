import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic15_files/BrianGoetzOptionalRulesDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_008 · Topic 15
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Optional & Null-Safety
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Best Practices for Optional: <code className="text-emerald-400 font-mono">Brian Goetz's Rules of Engagement</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          The architect's guide to clean Optional usage: understanding the intended design constraints and avoiding anti-patterns in enterprise codebases.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="BrianGoetzOptionalRulesDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Optional & Null-Safe Programming FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_008 Topic 15: Brian Goetz's Optional Rules"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_008_topic15_brian_goetz_optional_rules_note.txt"
        />
      </section>

      <Teacher
        note="Brian Goetz, Java Language Architect, stated clearly: Optional was created for method return types where 'no result' is a normal outcome! It was NEVER intended to replace every single reference in your class! — Sukanta Hui"
      />
    </div>
  );
}
