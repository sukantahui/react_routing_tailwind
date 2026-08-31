import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import swallowDemoCode from "./topic7_files/SwallowAndIgnoreAntiPatternDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 7
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Silent Bug Threat
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-rose-400 font-mono">&apos;Swallow &amp; Ignore&apos;</code> Anti-Pattern: Silent Data Corruption
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply Effective Java Item 77: discovering why empty catch blocks defeat the entire purpose of exceptions and turn easily fixable errors into silent production disasters.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={swallowDemoCode}
          title="SwallowAndIgnoreAntiPatternDemo.java"
          highlightLines={[7, 10, 11, 12, 14, 15, 16]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Swallowing Exceptions FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 7: Swallow and Ignore Anti-Pattern"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic7_swallow_and_ignore_note.txt"
        />
      </section>

      <Teacher
        note="Writing 'catch (Exception e) {}' is like seeing a fire alarm flashing in your building and putting tape over the speaker so you can't hear it! Never swallow exceptions! — Sukanta Hui"
      />
    </div>
  );
}