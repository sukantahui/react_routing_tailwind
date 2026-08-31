import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import zoneRulesDemoCode from "./topic7_files/ZoneIdAndOffsetRulesDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_005 · Topic 7
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            DST Management
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-indigo-400 font-mono">ZoneId</code> vs <code className="text-emerald-400 font-mono">ZoneOffset</code>: Managing Daylight Saving Time (DST)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand international timezone shifts: comparing static numerical <code className="text-emerald-300 font-mono">ZoneOffset</code> values with dynamic geographical <code className="text-indigo-300 font-mono">ZoneId</code> Daylight Saving Time rules.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={zoneRulesDemoCode}
          title="ZoneIdAndOffsetRulesDemo.java"
          highlightLines={[7, 16, 20, 21, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="ZoneId & Offset FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_005 Topic 7: ZoneId vs ZoneOffset"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_005_topic7_zone_rules_note.txt"
        />
      </section>

      <Teacher
        note="Never hardcode '-05:00' for New York! In summer it becomes '-04:00' due to Daylight Saving Time. Always specify ZoneId.of('America/New_York') so Java handles DST changes automatically! — Sukanta Hui"
      />
    </div>
  );
}
