import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import instSyntaxDemoCode from "./topic3_files/MemberInnerInstantiationSyntaxDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 3
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Instantiation Syntax
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Instantiating Member Inner Classes: <code className="text-emerald-400 font-mono">outer.new Inner()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the unique Java instantiation syntax: constructing inner instances with <code className="text-emerald-300 font-mono">car.new Engine()</code> and chained one-liners.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={instSyntaxDemoCode}
          title="MemberInnerInstantiationSyntaxDemo.java"
          highlightLines={[7, 10, 19, 20, 21, 26, 27]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Instantiation Syntax FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 3: Member Inner Instantiation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic3_member_inner_instantiation_note.txt"
        />
      </section>

      <Teacher
        note="Many students make the mistake of writing 'new Outer.Inner()'. For a non-static class, that will cause a compiler error! You must write 'outerObject.new Inner()'! — Sukanta Hui"
      />
    </div>
  );
}