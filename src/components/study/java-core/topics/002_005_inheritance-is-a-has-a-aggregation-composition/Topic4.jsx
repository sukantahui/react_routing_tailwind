import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import diamondDemoCode from "./topic4_files/DiamondProblemExplainedDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Language Design Choice
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why Multiple Inheritance with Classes is NOT Supported (The Diamond Problem)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Deep-dive into the famous Diamond Problem that led Java's creators to omit multiple class inheritance in favor of interfaces and composition.
        </p>
      </header>

      {/* Section 1: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={diamondDemoCode}
          title="DiamondProblemExplainedDemo.java"
          highlightLines={[25, 29, 34, 38, 39]}
        />
      </section>

      {/* Section 2: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="The Diamond Problem FAQs"
          questions={questions}
        />
      </section>

      {/* Section 3: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_005 Topic 4: The Diamond Problem"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_005_topic4_diamond_problem_note.txt"
        />
      </section>

      {/* Section 4: Teacher's Note */}
      <Teacher
        note="If two parent classes have a method with the exact same name, the child wouldn't know which parent to listen to! Java avoids this confusion by keeping inheritance strictly single-parent. — Sukanta Hui"
      />
    </div>
  );
}