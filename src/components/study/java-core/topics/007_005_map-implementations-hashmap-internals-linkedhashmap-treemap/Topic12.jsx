import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cpxDemoCode from "./topic12_files/HashMapComplexityEvolutionDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            O(log n) Worst-Case
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Worst-Case Search Complexity: From <code className="text-rose-400 font-mono">O(n)</code> to <code className="text-emerald-400 font-mono">O(log n)</code> Treeification
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Analyze algorithmic complexity evolution: comparing Java 7 linear collision lists against Java 8+ balanced Red-Black trees under deliberate HashDoS collision workloads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={cpxDemoCode}
          title="HashMapComplexityEvolutionDemo.java"
          highlightLines={[7, 10, 13, 14, 15, 16, 17, 18, 19, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Complexity Evolution FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 12: Search Complexity Evolution"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic12_search_complexity_evolution_note.txt"
        />
      </section>

      <Teacher
        note="If you are asked in an interview: 'What is the worst-case time complexity of HashMap.get()?', answer: 'In Java 7 it was O(n), but in Java 8+ it is O(log n) because buckets convert into Red-Black trees!' Interviewers love this answer! — Sukanta Hui"
      />
    </div>
  );
}