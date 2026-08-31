import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import tprDemoCode from "./topic1_files/ThreadPerRequestBottleneckDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 1
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Thread-per-Request
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-amber-400 font-mono">Thread-per-Request</code> Scaling Bottleneck in Web Servers (Tomcat / Spring)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect enterprise server failures: analyzing why blocking database I/O starves fixed 200-worker thread pools and causes connection dropouts while CPU cores sit idle.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={tprDemoCode}
          title="ThreadPerRequestBottleneckDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Thread-per-Request FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 1: Thread-per-Request Bottleneck"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic1_thread_per_request_bottleneck_note.txt"
        />
      </section>

      <Teacher
        note="In Tomcat, if 200 students are waiting for a slow GST database response, all 200 server threads are sleeping! When student #201 arrives, Tomcat rejects them with 'Server Busy'—even though your CPU is 95% idle! That is the classic Thread-per-Request bottleneck! — Sukanta Hui"
      />
    </div>
  );
}