import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ubdDemoCode from "./topic3_files/UnboundedWildcardReadOnlyDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Unbounded Wildcard
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Unbounded Wildcard (<code className="text-emerald-400 font-mono">List&lt;?&gt;</code>): Universal Subtyping &amp; Read-Only Rules
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand wildcard write restrictions: discovering why <code className="text-emerald-300 font-mono">List&lt;?&gt;</code> permits reading elements as Objects but blocks all insertions except literal <code className="text-rose-400 font-mono">null</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ubdDemoCode}
          title="UnboundedWildcardReadOnlyDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 20, 21, 22]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Unbounded Wildcard FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 3: Unbounded Wildcard"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic3_unbounded_wildcard_note.txt"
        />
      </section>

      <Teacher
        note="If someone hands you a box labeled 'Unknown Contents' (List<?>), you are allowed to look inside (read), but you aren't allowed to put anything in (write), because you might put an apple into an electronics box! Only null is allowed! — Sukanta Hui"
      />
    </div>
  );
}