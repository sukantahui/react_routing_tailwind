import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import prsDemoCode from "./topic2_files/HashSetPresentDummyValueDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_003 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            PRESENT Constant
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-amber-400 font-mono">PRESENT</code> Dummy Value: How HashSet Stores Elements as Map Keys
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Inspect internal dummy placeholders: understanding why HashSet utilizes a static <code className="text-amber-300 font-mono">PRESENT</code> Object singleton as dummy values in the backing HashMap.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={prsDemoCode}
          title="HashSetPresentDummyValueDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 28, 29, 34, 35]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="PRESENT Constant FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 007_003 Topic 2: The PRESENT Dummy Value"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_003_topic2_present_dummy_value_note.txt"
        />
      </section>

      <Teacher
        note="Why does HashSet have 'PRESENT'? Because HashMap requires a Key and a Value! HashSet puts your object as the Key, and puts 'PRESENT' as the Value! All keys in the set share the exact same single dummy object! — Sukanta Hui"
      />
    </div>
  );
}