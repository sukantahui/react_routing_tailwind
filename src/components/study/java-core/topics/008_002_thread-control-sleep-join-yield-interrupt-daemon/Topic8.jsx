import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import uvdDemoCode from "./topic8_files/UserVsDaemonThreadsOverviewDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            User vs Daemon
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">User Threads</code> vs <code className="text-purple-400 font-mono">Daemon Threads</code>: Foreground vs Background Roles
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Classify execution priorities: understanding how the JVM process lifecycle is governed exclusively by active User threads while Daemon threads serve auxiliary background roles.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={uvdDemoCode}
          title="UserVsDaemonThreadsOverviewDemo.java"
          highlightLines={[7, 10, 13, 14, 18, 19, 20, 21, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="User vs Daemon FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_002 Topic 8: User vs Daemon Threads"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_002_topic8_user_vs_daemon_threads_note.txt"
        />
      </section>

      <Teacher
        note="Think of User threads like customers at a restaurant—the restaurant stays open as long as there is 1 customer inside! Daemon threads are like the cleaning crew—the moment all customers leave, the owner shuts the lights off and locks the doors immediately! — Sukanta Hui"
      />
    </div>
  );
}