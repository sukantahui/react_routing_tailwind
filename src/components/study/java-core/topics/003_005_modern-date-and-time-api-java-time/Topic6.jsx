import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import zdtDemoCode from "./topic6_files/ZonedDateTimeMasteryDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Global Timezones
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-purple-400 font-mono">ZonedDateTime</code>: Timestamps with Explicit <code className="text-emerald-400 font-mono">ZoneId</code> (<code className="text-emerald-300 font-mono">Asia/Kolkata</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build international flight and webinar broadcast systems: converting global timeline moments across timezones with <code className="text-purple-300 font-mono">withZoneSameInstant()</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={zdtDemoCode}
          title="ZonedDateTimeMasteryDemo.java"
          highlightLines={[7, 16, 17, 19, 28, 29, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ZonedDateTime FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 6: ZonedDateTime Mastery"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic6_zoneddatetime_note.txt"
        />
      </section>

      <Teacher
        note="When we host our global Java masterclasses from Barrackpore at 8:00 PM IST, students in London see 3:30 PM and New York sees 10:30 AM! ZonedDateTime handles all those conversions automatically! — Sukanta Hui"
      />
    </div>
  );
}