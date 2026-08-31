import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import extDemoCode from "./topic2_files/ExtendsKeywordClassesAndInterfacesDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_003 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Subtype Theory
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Why <code className="text-emerald-400 font-mono">extends</code> is Used for Both Classes AND Interfaces
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Clarify generic type keywords: discovering why <code className="text-emerald-300 font-mono">extends</code> signifies the universal &quot;is-a-subtype-of&quot; relation for both classes and interfaces.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={extDemoCode}
          title="ExtendsKeywordClassesAndInterfacesDemo.java"
          highlightLines={[7, 10, 15, 16, 17, 21, 22, 31, 32]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Extends Keyword FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_003 Topic 2: 'extends' Keyword in Generics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_003_topic2_extends_keyword_note.txt"
        />
      </section>

      <Teacher
        note="Never write '<T implements Runnable>'! In Java generics, the keyword 'extends' is used for BOTH classes and interfaces because it means 'is a subtype of'! — Sukanta Hui"
      />
    </div>
  );
}