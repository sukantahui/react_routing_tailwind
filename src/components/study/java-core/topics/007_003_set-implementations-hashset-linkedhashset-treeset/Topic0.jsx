import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import setFundDemoCode from "./topic0_files/SetInterfaceFundamentalsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Mathematical Set
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.util.Set</code> Interface: Mathematical Set Concept &amp; Duplicate Rejection
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master mathematical collection uniqueness: exploring duplicate rejection mechanics, single null element permissibility, and the non-indexed contract of java.util.Set.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={setFundDemoCode}
          title="SetInterfaceFundamentalsDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 19, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Set Contract FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 0: Set Interface Contract"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic0_set_interface_contract_note.txt"
        />
      </section>

      <Teacher
        note="A Set is like an exclusive club entry register! If someone's name is already on the list, 'set.add()' simply says 'false' and does not add them again! — Sukanta Hui"
      />
    </div>
  );
}