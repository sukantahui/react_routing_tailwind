import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ctpDemoCode from "./topic5_files/CachedThreadPoolThreadExplosionDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_007 · Topic 5
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            CachedThreadPool
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-amber-400 font-mono">Executors.newCachedThreadPool()</code>: Dynamic Scaling &amp; Thread Explosions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Evaluate dynamic worker creation: examining <code className="text-amber-300 font-mono">SynchronousQueue</code> zero-capacity handoffs, 60-second idle lifecycles, and thread explosion native memory crashes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ctpDemoCode}
          title="CachedThreadPoolThreadExplosionDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 21, 22, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="CachedThreadPool FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_007 Topic 5: CachedThreadPool & Thread Explosion"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_007_topic5_cached_thread_pool_note.txt"
        />
      </section>

      <Teacher
        note="CachedThreadPool is the opposite of FixedThreadPool: Its queue holds 0 tasks, but its maximum thread limit is 2.14 BILLION! If 5,000 tasks arrive at once, it tries to create 5,000 OS threads in a fraction of a second, crashing your machine! — Sukanta Hui"
      />
    </div>
  );
}