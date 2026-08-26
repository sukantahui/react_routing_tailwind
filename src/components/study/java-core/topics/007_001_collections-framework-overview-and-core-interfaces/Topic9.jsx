import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mapDemoCode from "./topic9_files/MapInterfaceContractBehaviorDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Map Contract
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          4. <code className="text-purple-400 font-mono">java.util.Map</code>: Key-Value Pairs, Unique Keys &amp; Collection Views
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master dictionary mappings: utilizing key-value association, fast <code className="text-emerald-300 font-mono">O(1)</code> lookup, and traversing Map collection views (<code className="text-sky-300 font-mono">keySet</code>, <code className="text-purple-300 font-mono">values</code>, <code className="text-amber-300 font-mono">entrySet</code>).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mapDemoCode}
          title="MapInterfaceContractBehaviorDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 21, 31, 32, 33, 36, 37]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Map Interface FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_001 Topic 9: java.util.Map Interface"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic9_map_interface_note.txt"
        />
      </section>

      <Teacher
        note="Whenever you iterate over a Map, always use 'map.entrySet()' instead of looping through 'map.keySet()' and calling 'map.get(key)'! 'entrySet()' is twice as fast because it gives you both key and value together in one single lookup! — Sukanta Hui"
      />
    </div>
  );
}