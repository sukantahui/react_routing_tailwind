import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import enumKeyDemoCode from "./topic1_files/AcademicBranch.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Type-Safe Enums
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">enum</code> Keyword: Creating Type-Safe Enumeration Types
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundation of Java enumerations: declaring domain constants, JVM singleton guarantees, and comparing enum constants with null-safe <code className="text-emerald-300 font-mono">==</code> operators.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={enumKeyDemoCode}
          title="AcademicBranch.java"
          highlightLines={[7, 8, 9, 10, 11, 12, 13, 28, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Enum Keyword FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 1: The enum Keyword"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic1_enum_keyword_note.txt"
        />
      </section>

      <Teacher
        note="Always use '==' to compare enums! If myVar is null, 'myVar.equals(Status.ACTIVE)' will throw a NullPointerException, but 'myVar == Status.ACTIVE' returns false cleanly without crashing! — Sukanta Hui"
      />
    </div>
  );
}