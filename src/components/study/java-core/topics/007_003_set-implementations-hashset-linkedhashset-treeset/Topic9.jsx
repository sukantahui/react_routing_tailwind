import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import trsDemoCode from "./topic9_files/TreeSetRedBlackTreeInternalsDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Red-Black Tree Internals
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <code className="text-emerald-400 font-mono">java.util.TreeSet</code> Internal Mechanics: Backed by a Red-Black Tree (<code className="text-purple-400 font-mono">TreeMap</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace Red-Black binary search tree mechanics: inspecting TreeSet&apos;s internal <code className="text-emerald-300 font-mono">TreeMap</code> backing instance and exploring self-balancing node rotations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={trsDemoCode}
          title="TreeSetRedBlackTreeInternalsDemo.java"
          highlightLines={[7, 10, 16, 17, 20, 21, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="TreeSet Internals FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 9: TreeSet Red-Black Tree Internals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic9_treeset_red_black_tree_note.txt"
        />
      </section>

      <Teacher
        note="Just like HashSet delegates to HashMap, TreeSet delegates to TreeMap! The Red-Black tree keeps itself balanced so tree searches never slow down! — Sukanta Hui"
      />
    </div>
  );
}