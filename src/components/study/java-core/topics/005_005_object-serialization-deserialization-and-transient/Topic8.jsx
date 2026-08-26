import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import svidDemoCode from "./topic8_files/SerialVersionUIDContractDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 8
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Versioning Fingerprint
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-purple-400 font-mono">serialVersionUID</code> Field: Versioning Contract &amp; Hash Calculation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply Effective Java Item 86: declaring explicit <code className="text-emerald-300 font-mono">serialVersionUID</code> constants to prevent compiler SHA-1 hash drift and maintain backward stream compatibility.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={svidDemoCode}
          title="SerialVersionUIDContractDemo.java"
          highlightLines={[7, 10, 14, 15, 23, 33, 34, 37, 38]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="serialVersionUID FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 8: serialVersionUID Contract"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic8_serial_version_uid_note.txt"
        />
      </section>

      <Teacher
        note="Always write 'private static final long serialVersionUID = 1L;' in every Serializable class! Without it, adding a simple comment or method can change the hash and make all existing saved files unreadable! — Sukanta Hui"
      />
    </div>
  );
}