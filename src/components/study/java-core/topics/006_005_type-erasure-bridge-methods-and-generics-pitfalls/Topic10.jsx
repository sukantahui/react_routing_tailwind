import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import arrDemoCode from "./topic10_files/Restriction5NoGenericArraysDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 10
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Restriction 5
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Restriction 5: Cannot Create Arrays of Parameterized Types (<code className="text-rose-400 font-mono">new List&lt;String&gt;[10]</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply Effective Java Item 28: analyzing why array covariance fundamentally clashes with generic type erasure and replacing generic arrays with nested collection lists.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={arrDemoCode}
          title="Restriction5NoGenericArraysDemo.java"
          highlightLines={[7, 10, 16, 17, 18, 19]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Generic Arrays FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 10: Restriction 5 - No Generic Arrays"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic10_restriction5_no_generic_arrays_note.txt"
        />
      </section>

      <Teacher
        note="Joshua Bloch wrote in Effective Java Item 28: 'Prefer lists to arrays'! Because arrays and generics have opposite type rules (arrays are covariant, generics are invariant), creating generic arrays is illegal! Always use 'List<List<String>>' instead! — Sukanta Hui"
      />
    </div>
  );
}