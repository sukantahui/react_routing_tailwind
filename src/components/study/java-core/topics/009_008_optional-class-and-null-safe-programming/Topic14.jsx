import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic14_files/OptionalStreamJava9Demo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 009_008 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Optional & Null-Safety
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Converting Optional to Stream: <code className="text-emerald-400 font-mono">Optional.stream()</code> (Java 9+)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Bridging Optionals and Streams: using stream.flatMap(Optional::stream) to filter and unwrap present optionals in collection streams.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="OptionalStreamJava9Demo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Optional & Null-Safe Programming FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 009_008 Topic 14: Optional.stream() in Java 9"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="009_008_topic14_optional_stream_java9_note.txt"
        />
      </section>

      <Teacher
        note="In Java 9, Optional.stream() made filtering lists of Optionals effortless: just write stream.flatMap(Optional::stream) and all empty Optionals vanish while present values are automatically unwrapped! — Sukanta Hui"
      />
    </div>
  );
}
