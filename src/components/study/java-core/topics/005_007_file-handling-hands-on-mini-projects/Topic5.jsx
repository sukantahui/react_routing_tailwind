import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import chalDemoCode from "./topic5_files/TimedFileIoCodingChallengeCapstoneDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_007 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Segment 5 Master Capstone
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Timed File Handling Coding Challenge: Segment 5 Master Capstone
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Execute the ultimate Segment 5 challenge: building a high-speed multi-file ledger consolidator with lazy stream deduplication and atomic staging moves.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={chalDemoCode}
          title="TimedFileIoCodingChallengeCapstoneDemo.java"
          highlightLines={[7, 10, 20, 21, 23, 24, 27, 28, 41, 42]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Coding Challenge FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_007 Topic 5: Segment 5 Master Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_007_topic5_segment5_master_capstone_note.txt"
        />
      </section>

      <Teacher
        note="CONGRATULATIONS! You have officially conquered Segment 5: Java I/O Streams, File Handling &amp; Serialization! You now possess enterprise-level expertise in streams, NIO.2, file channels, and serialization! — Sukanta Hui"
      />
    </div>
  );
}