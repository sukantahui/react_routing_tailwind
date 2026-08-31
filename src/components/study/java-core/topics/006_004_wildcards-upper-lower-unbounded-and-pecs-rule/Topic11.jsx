import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cptDemoCode from "./topic11_files/WildcardCaptureHelperMethodDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_004 · Topic 11
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Wildcard Capture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Wildcard Capture &amp; Helper Methods: Fixing <code className="text-rose-400 font-mono">CAP#1</code> Capture Errors
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Resolve wildcard capture compiler errors: designing private generic helper methods (<code className="text-emerald-300 font-mono">&lt;T&gt; void helper(List&lt;T&gt;)</code>) to bind anonymous wildcards during in-place collection mutation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cptDemoCode}
          title="WildcardCaptureHelperMethodDemo.java"
          highlightLines={[7, 10, 13, 14, 17, 18, 19, 20, 21]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Wildcard Capture FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_004 Topic 11: Wildcard Capture & Helper Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_004_topic11_wildcard_capture_helper_note.txt"
        />
      </section>

      <Teacher
        note="When the compiler throws a mysterious error about 'capture#1 of ?', don't panic! Just write a private helper method with '&lt;T&gt;' and delegate the work to it! The helper method captures the wildcard and solves the issue instantly! — Sukanta Hui"
      />
    </div>
  );
}