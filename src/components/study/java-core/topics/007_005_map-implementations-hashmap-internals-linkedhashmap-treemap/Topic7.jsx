import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import xorDemoCode from "./topic7_files/HashMapXorHashSpreadingDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_005 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Hash Spreading
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Key Hash Spreading: <code className="text-emerald-400 font-mono">(h ^ (h &gt;&gt;&gt; 16))</code> Spreading Function
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master bitwise entropy distribution: analyzing how right-shifting by 16 bits and XORing incorporates high-order bits into low-order bucket bitmasks to prevent collisions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={xorDemoCode}
          title="HashMapXorHashSpreadingDemo.java"
          highlightLines={[7, 10, 11, 12, 13, 20, 21, 22, 27, 28]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Hash Spreading FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_005 Topic 7: Hash Spreading Function"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_005_topic7_hash_spreading_function_note.txt"
        />
      </section>

      <Teacher
        note="Why '(h ^ (h >>> 16))'? Because when your table has only 16 buckets, Java only looks at the bottom 4 bits! If we didn't shift the top 16 bits down and XOR them, all the uniqueness in the top half of the hash code would be completely wasted! — Sukanta Hui"
      />
    </div>
  );
}