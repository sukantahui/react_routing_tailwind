import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stcDemoCode from "./topic4_files/GenericStaticMethodScopingRulesDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_002 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Static Scoping
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Generic Static Methods: Why Static Methods Cannot Access Class-Level <code className="text-emerald-400 font-mono">&lt;T&gt;</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze static generic constraints: understanding why static methods cannot reference class-level type variables and must declare independent method-level generic parameters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={stcDemoCode}
          title="GenericStaticMethodScopingRulesDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 18, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Static Scoping FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_002 Topic 4: Generic Static Scoping"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic4_generic_static_scoping_note.txt"
        />
      </section>

      <Teacher
        note="This is a famous interview trap! Static methods cannot use the class '<T>' because static methods exist before any object is created! A static method must always declare its own '<E>' before its return type! — Sukanta Hui"
      />
    </div>
  );
}