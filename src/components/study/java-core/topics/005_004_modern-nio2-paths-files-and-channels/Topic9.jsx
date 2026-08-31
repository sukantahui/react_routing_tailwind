import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import oneDemoCode from "./topic9_files/ModernOneLinerReadWriteStringDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_004 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Java 11 One-Liners
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Convenience Methods: <code className="text-emerald-400 font-mono">Files.readString()</code> &amp; <code className="text-sky-400 font-mono">Files.writeString()</code> (Java 11+)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Write elegant modern Java: reading and writing complete text payloads in a single line of code with automatic resource management and appending options.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={oneDemoCode}
          title="ModernOneLinerReadWriteStringDemo.java"
          highlightLines={[7, 10, 19, 20, 24, 25, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="One-Liner I/O FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_004 Topic 9: Files.readString & writeString"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_004_topic9_read_write_string_note.txt"
        />
      </section>

      <Teacher
        note="If you are on Java 11 or higher, you almost never need to write a 15-line BufferedReader loop for small config files! Just call 'String content = Files.readString(path)' and you are done! — Sukanta Hui"
      />
    </div>
  );
}