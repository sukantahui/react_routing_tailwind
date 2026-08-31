import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import witDemoCode from "./topic3_files/GenericMethodInvocationWitnessDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_002 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Type Inference
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Invoking Generic Methods: Explicit Type Witness vs Compiler Type Inference
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master type deduction: utilizing modern Java compiler type inference and applying explicit type witness syntax (<code className="text-emerald-300 font-mono">ClassName.&lt;Type&gt;method()</code>) to resolve ambiguous supertypes.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={witDemoCode}
          title="GenericMethodInvocationWitnessDemo.java"
          highlightLines={[7, 10, 19, 20, 24, 25, 26]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Type Inference FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_002 Topic 3: Type Witness & Inference"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic3_type_witness_inference_note.txt"
        />
      </section>

      <Teacher
        note="Most of the time, the Java compiler automatically figures out the generic type for you! But if you need to force a common parent type like Number, you can explicitly pass the type witness: 'MyClass.&lt;Number&gt;coalesce(10, 20.5)'! — Sukanta Hui"
      />
    </div>
  );
}