import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import capDemoCode from "./topic14_files/SetImplementationsComparisonCapstoneDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Set Matrix Capstone
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Comprehensive Set Matrix: <code className="text-emerald-400 font-mono">HashSet</code> vs <code className="text-sky-400 font-mono">LinkedHashSet</code> vs <code className="text-purple-400 font-mono">TreeSet</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Synthesize Java Set architectures: comparing ordering guarantees, time complexities, uniqueness mechanisms, and null support across the entire Set hierarchy.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={capDemoCode}
          title="SetImplementationsComparisonCapstoneDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 19, 20]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Set Capstone FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 14: Set Matrix Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic14_set_matrix_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 007_003! You now possess expert mastery of Java Sets—from HashSet's HashMap internals and PRESENT dummy value, to LinkedHashSet's chronological pointers and TreeSet's Red-Black binary search tree! — Sukanta Hui"
      />
    </div>
  );
}