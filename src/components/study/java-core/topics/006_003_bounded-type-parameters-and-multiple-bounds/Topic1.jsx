import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import uprDemoCode from "./topic1_files/UpperBoundedTypeParameterSyntaxDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_003 · Topic 1
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Upper Bounds
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Upper Bounded Type Parameters: <code className="text-emerald-400 font-mono">&lt;T extends SuperClassOrInterface&gt;</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Structure hierarchical constraints: establishing upper bound ceilings to accept domain classes and all child sub-classes with compile-time verification.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={uprDemoCode}
          title="UpperBoundedTypeParameterSyntaxDemo.java"
          highlightLines={[7, 10, 27, 28, 29, 38, 39, 42, 43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Upper Bounds FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_003 Topic 1: Upper Bounded Syntax"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_003_topic1_upper_bounded_syntax_note.txt"
        />
      </section>

      <Teacher
        note="Think of 'extends' in generics as establishing a family ceiling! '<T extends AcademicMember>' means anyone in the AcademicMember family tree (Students, Faculty, Staff) is welcome, but strangers are rejected! — Sukanta Hui"
      />
    </div>
  );
}