import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stfDemoCode from "./topic8_files/Restriction3NoStaticGenericFieldsDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 8
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Restriction 3
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Restriction 3: Cannot Declare Static Fields of Type Parameter <code className="text-rose-400 font-mono">T</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze Metaspace class architecture: understanding why single static class slots cannot hold instance-parameterized generic type variables.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={stfDemoCode}
          title="Restriction3NoStaticGenericFieldsDemo.java"
          highlightLines={[7, 10, 11, 14, 15, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Static Fields FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 8: Restriction 3 - No Static Fields"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic8_restriction3_no_static_fields_note.txt"
        />
      </section>

      <Teacher
        note="Static variables belong to the Class, not to instances! If you had a 'static T', what would it be when Student creates Box<String> and Faculty creates Box<Integer>? It cannot be both, so Java bans static T! — Sukanta Hui"
      />
    </div>
  );
}