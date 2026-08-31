import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic9_files/AdapterPatternDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 012_001 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            GoF Design Patterns
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Adapter Pattern: <code className="text-emerald-400 font-mono">Interface Translation</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Connecting incompatible contracts: converting legacy 3rd-party APIs, external payment gateways, and data formats into clean domain interfaces.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="AdapterPatternDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="GoF Design Patterns FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 012_001 Topic 9: Adapter Pattern"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="012_001_topic9_adapter_pattern_note.txt"
        />
      </section>

      <Teacher
        note="The Adapter pattern is just like a travel power plug converter! If your Indian laptop plug cannot fit into an American wall socket, you use an adapter! In Java, an Adapter wraps an incompatible legacy class and presents the clean interface your modern code expects! — Sukanta Hui"
      />
    </div>
  );
}
