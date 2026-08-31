import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import memberDemoCode from "./topic2_files/MemberInnerClassFoundationsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_007 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Member Inner Class
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Non-Static Member Inner Class: Implicit Reference &amp; Outer Private Field Access
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand how inner class instances bind to enclosing objects: accessing private state directly and exploring the compiler-generated <code className="text-emerald-300 font-mono">this$0</code> reference pointer.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={memberDemoCode}
          title="MemberInnerClassFoundationsDemo.java"
          highlightLines={[7, 10, 11, 14, 17, 18, 19, 30, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Member Inner Class FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_007 Topic 2: Member Inner Class"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_007_topic2_member_inner_class_note.txt"
        />
      </section>

      <Teacher
        note="A member inner class is like a room inside a house. You cannot enter the room (create the Inner instance) without first having a house (Outer instance) to build it in! — Sukanta Hui"
      />
    </div>
  );
}