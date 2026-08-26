import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import mtrDemoCode from "./topic1_files/MasterBigOTimeComplexityMatrixDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_009 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Big-O Matrix
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Master Big-O Time Complexity Matrix across All Collection Operations
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Evaluate computational complexities: comparing index lookup, insertion, deletion, and search performance across contiguous arrays, linked pointers, hash tables, and red-black trees.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={mtrDemoCode}
          title="MasterBigOTimeComplexityMatrixDemo.java"
          highlightLines={[7, 10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Big-O Matrix FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_009 Topic 1: Master Big-O Matrix"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_009_topic1_master_big_o_matrix_note.txt"
        />
      </section>

      <Teacher
        note="Every enterprise architect knows this matrix by heart! Choosing the wrong collection can slow down your app by 10,000x! If you need index lookups, use ArrayList (O(1)); if you need key lookups, use HashMap (O(1)); if you need sorted keys, use TreeMap (O(log n))! — Sukanta Hui"
      />
    </div>
  );
}