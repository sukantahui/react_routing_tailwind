import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dbDemoCode from "./topic3_files/FlatFileDatabaseEngineProjectDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_007 · Topic 3
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Project 3: Flat-File DB
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Project 3: Flat-File Database Storage Engine with Index-Based Lookup
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build a relational storage engine: structuring fixed-width binary record slots and leveraging in-memory byte offset indexes for instantaneous O(1) random seeks.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={dbDemoCode}
          title="FlatFileDatabaseEngineProjectDemo.java"
          highlightLines={[7, 10, 15, 16, 23, 24, 26, 35, 41, 42, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Flat-File DB FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_007 Topic 3: Flat-File Database Engine"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_007_topic3_flat_file_database_note.txt"
        />
      </section>

      <Teacher
        note="Every relational database engine—from MySQL to PostgreSQL—stores tables using fixed or slotted byte pages on disk! Building your own index-based file database proves you understand the foundation of computer science storage systems! — Sukanta Hui"
      />
    </div>
  );
}