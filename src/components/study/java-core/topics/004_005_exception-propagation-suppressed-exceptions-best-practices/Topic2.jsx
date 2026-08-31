import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import defDemoCode from "./topic2_files/DefaultUncaughtExceptionHandlerDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_005 · Topic 2
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            JVM Death Hook
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The JVM Default Exception Handler &amp; <code className="text-rose-400 font-mono">UncaughtExceptionHandler</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master global crash safety: configuring thread-level <code className="text-emerald-300 font-mono">UncaughtExceptionHandler</code> hooks to capture fatal uncaught crashes and alert monitoring telemetry.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={defDemoCode}
          title="DefaultUncaughtExceptionHandlerDemo.java"
          highlightLines={[7, 14, 15, 16, 17, 18, 19, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Default Handler FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_005 Topic 2: Default Exception Handler"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_005_topic2_default_exception_handler_note.txt"
        />
      </section>

      <Teacher
        note="In production Android apps and Spring servers, you always configure a default UncaughtExceptionHandler to send crash reports to Crashlytics or Sentry before the app dies! — Sukanta Hui"
      />
    </div>
  );
}