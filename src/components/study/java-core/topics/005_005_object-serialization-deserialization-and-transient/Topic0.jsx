import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import serDemoCode from "./topic0_files/SerializationFundamentalsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_005 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Object Serialization
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What is Serialization: Converting In-Memory Object Graphs into Byte Streams
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover object serialization fundamentals: converting live heap object graphs into binary wire streams, inspecting the 0xACED magic header, and understanding enterprise persistence.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={serDemoCode}
          title="SerializationFundamentalsDemo.java"
          highlightLines={[7, 10, 11, 14, 15, 34, 35, 36, 40]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Serialization FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_005 Topic 0: What is Serialization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_005_topic0_what_is_serialization_note.txt"
        />
      </section>

      <Teacher
        note="Serialization is like freeze-drying a living plant! You convert the complex in-memory object into a dry packet of bytes, send it over the wire, and then rehydrate it in another JVM with Deserialization! — Sukanta Hui"
      />
    </div>
  );
}