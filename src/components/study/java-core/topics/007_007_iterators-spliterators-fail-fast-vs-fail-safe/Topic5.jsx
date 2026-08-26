import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import expDemoCode from "./topic5_files/ExpectedModCountVerificationDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_007 · Topic 5
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Fail-Fast Verification
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Fail-Fast Verification: <code className="text-emerald-400 font-mono">expectedModCount</code> vs <code className="text-sky-400 font-mono">modCount</code> in <code className="text-amber-400 font-mono">next()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace internal JDK source mechanics: dissecting <code className="text-emerald-300 font-mono">checkForComodification()</code> and understanding how 1-cycle integer comparisons guarantee fail-fast safety.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={expDemoCode}
          title="ExpectedModCountVerificationDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 18, 19, 23, 24, 25]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="expectedModCount FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_007 Topic 5: expectedModCount Verification"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_007_topic5_expected_modcount_verification_note.txt"
        />
      </section>

      <Teacher
        note="The secret behind Fail-Fast is just one if-statement: 'if (modCount != expectedModCount) throw new CME()' inside next()! It runs in 1 clock cycle and protects your memory from corrupt pointer offsets! — Sukanta Hui"
      />
    </div>
  );
}