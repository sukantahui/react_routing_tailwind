import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mapFundDemoCode from "./topic0_files/MapInterfaceFundamentalsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Map Contract
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">java.util.Map</code> Interface: Key-Value Association &amp; Unique Keys
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master dictionary mappings: understanding key uniqueness invariants, value replacement semantics, and the fundamental separation from java.util.Collection.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mapFundDemoCode}
          title="MapInterfaceFundamentalsDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Map Fundamentals FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 0: Map Fundamentals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic0_map_fundamentals_note.txt"
        />
      </section>

      <Teacher
        note="Welcome to Module 007_005! Maps are the most important data structure in real-world Java! Think of a Map like a roll number register: each roll number (Key) is strictly unique, and points to a student record (Value)! — Sukanta Hui"
      />
    </div>
  );
}