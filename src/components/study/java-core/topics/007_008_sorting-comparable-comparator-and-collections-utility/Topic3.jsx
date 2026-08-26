import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cstDemoCode from "./topic3_files/ConsistencyCompareToEqualsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_008 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Consistency with equals()
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Consistency: <code className="text-emerald-400 font-mono">(x.compareTo(y) == 0) == (x.equals(y))</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace collection behavioral divergence: analyzing how classes like <code className="text-amber-300 font-mono">BigDecimal</code> behave differently in <code className="text-emerald-300 font-mono">HashSet</code> vs <code className="text-purple-300 font-mono">TreeSet</code> due to equals inconsistency.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cstDemoCode}
          title="ConsistencyCompareToEqualsDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 21, 26, 27, 32, 33]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Consistency FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_008 Topic 3: Consistency: compareTo vs equals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_008_topic3_consistency_compareto_equals_note.txt"
        />
      </section>

      <Teacher
        note="If your compareTo() returns 0 for two objects, make sure equals() also returns true! Otherwise, HashSet will store both items, but TreeSet will throw away the second item as a duplicate! — Sukanta Hui"
      />
    </div>
  );
}