import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ovlDemoCode from "./topic12_files/Restriction7NoOverloadClashDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 12
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Restriction 7
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Restriction 7: Cannot Overload Methods That Erase to Identical Raw Signatures
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Diagnose compiler name clashes: understanding why methods with parameters erasing to identical raw descriptors cannot be overloaded in the same class.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ovlDemoCode}
          title="Restriction7NoOverloadClashDemo.java"
          highlightLines={[7, 10, 14, 15, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Overload Clashes FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 12: Restriction 7 - No Overload Clashes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic12_restriction7_no_overload_clashes_note.txt"
        />
      </section>

      <Teacher
        note="If you try to write 'void save(List<Student> s)' and 'void save(List<Course> c)', the compiler will complain about a 'name clash'! That's because both erase to 'void save(List)' in bytecode! Give them different names! — Sukanta Hui"
      />
    </div>
  );
}