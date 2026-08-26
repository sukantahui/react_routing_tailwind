import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prohibitedModifiersDemoCode from "./topic15_files/ProhibitedConstructorModifiersDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
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
            Module 002_002 · Topic 15
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Compiler Prohibitions
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Can Constructors Be static, final, synchronized, or abstract?
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Deep-dive into the architectural reasons why Java prohibits <code className="text-rose-400 font-mono">static</code>, <code className="text-rose-400 font-mono">final</code>, <code className="text-rose-400 font-mono">abstract</code>, and <code className="text-rose-400 font-mono">synchronized</code> on constructor declarations.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>🚫</span> The 4 Illegal Constructor Keywords
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-800/40 space-y-2">
            <h3 className="text-rose-300 font-bold">1. Why NOT static?</h3>
            <p className="text-slate-300">Constructors initialize the living <code className="text-sky-300 font-mono">this</code> instance. Static members have no instance pointer.</p>
          </div>
          <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-800/40 space-y-2">
            <h3 className="text-rose-300 font-bold">2. Why NOT final?</h3>
            <p className="text-slate-300">Constructors are not inherited and cannot be overridden, making <code className="text-amber-300 font-mono">final</code> redundant.</p>
          </div>
          <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-800/40 space-y-2">
            <h3 className="text-rose-300 font-bold">3. Why NOT abstract?</h3>
            <p className="text-slate-300">An abstract constructor has no body, leaving fields uninitialized.</p>
          </div>
          <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-800/40 space-y-2">
            <h3 className="text-rose-300 font-bold">4. Why NOT synchronized?</h3>
            <p className="text-slate-300">The object is thread-confined during construction. No other thread can see it until it returns.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={prohibitedModifiersDemoCode}
          title="ProhibitedConstructorModifiersDemo.java"
          highlightLines={[12, 17, 22, 27, 32]}
        />
      </section>

      {/* Section 3: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Prohibited Constructor Modifiers FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 4: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 15: Prohibited Constructor Modifiers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic15_prohibited_modifiers_note.txt"
        />
      </section>

      {/* Section 5: Teacher's Note */}
      <Teacher
        note="Remember: Only access modifiers (public, protected, package, private) are permitted on constructors. Never put static, final, abstract, or synchronized on your constructor! — Sukanta Hui"
      />
    </div>
  );
}