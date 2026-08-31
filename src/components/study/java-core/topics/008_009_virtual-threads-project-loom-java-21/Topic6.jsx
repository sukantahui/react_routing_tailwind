import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import aubDemoCode from "./topic6_files/AutomaticUnmountingBlockingIoDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_009 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Automatic Unmounting
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Automatic Unmounting on <code className="text-emerald-400 font-mono">Blocking I/O</code>: Seamless Thread Preservation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect non-blocking kernel integrations: exploring how standard socket, file, and sleep operations yield continuations and free OS carrier threads via <code className="text-emerald-300 font-mono">epoll</code>/<code className="text-sky-300 font-mono">kqueue</code> demultiplexers.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={aubDemoCode}
          title="AutomaticUnmountingBlockingIoDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 19, 20, 21, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Automatic Unmounting FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_009 Topic 6: Automatic Unmounting"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_009_topic6_automatic_unmounting_note.txt"
        />
      </section>

      <Teacher
        note="You don't have to change a single line of your existing JDBC or HTTP code! When your code waits for a response from the network, Java automatically unmounts your virtual thread so the CPU can help someone else until the bytes arrive! — Sukanta Hui"
      />
    </div>
  );
}