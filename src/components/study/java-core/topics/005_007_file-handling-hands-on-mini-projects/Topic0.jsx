import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import revDemoCode from "./topic0_files/Segment5IoGrandReviewDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_007 · Topic 0
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Segment 5 Grand Review
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Review of Segment 5: Streams, Buffered I/O, NIO.2, Serialization &amp; Properties
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize Java I/O mastery: reviewing the 6 core pillars of stream architecture, modern NIO.2 utilities, and binary serialization before building real-world projects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={revDemoCode}
          title="Segment5IoGrandReviewDemo.java"
          highlightLines={[7, 13, 14, 15, 16, 17, 18]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Segment 5 Review FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_007 Topic 0: Segment 5 Grand Review"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_007_topic0_segment5_review_note.txt"
        />
      </section>

      <Teacher
        note="Welcome to the final capstone lab of Segment 5! In this module, we will put everything together to build a multi-threaded server log analyzer, an encrypted file vault, and a flat-file database engine! — Sukanta Hui"
      />
    </div>
  );
}