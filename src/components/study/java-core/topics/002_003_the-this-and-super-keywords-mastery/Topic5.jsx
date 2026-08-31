import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import passingThisConstructorCode from "./topic5_files/PassingThisInConstructorDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
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
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_003 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Bi-directional Modeling
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Passing <code className="text-sky-400 font-mono">this</code> as an Argument in Constructor Calls
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build tightly-coupled domain relationships by passing <code className="text-sky-300 font-mono">this</code> to child constructors, establishing parent-child back-pointers cleanly and safely.
        </p>
      </header>

      {/* Section 1: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={passingThisConstructorCode}
          title="PassingThisInConstructorDemo.java"
          highlightLines={[13, 29, 39]}
        />
      </section>

      {/* Section 2: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Passing 'this' in Constructor Calls FAQs"
          questions={questions}
        />
      </section>

      {/* Section 3: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_003 Topic 5: Passing this in Constructor Calls"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_003_topic5_passing_this_constructor_note.txt"
        />
      </section>

      {/* Section 4: Teacher's Note */}
      <Teacher
        note="When a parent creates a child ledger, passing this lets the child know who its parent is. Just ensure all your parent fields are populated first! — Sukanta Hui"
      />
    </div>
  );
}