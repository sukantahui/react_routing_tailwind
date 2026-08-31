import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic5_files/FieldAndConstructorReflectionInjectionDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 012_004 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Capstone 3: Custom DI Framework
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Reflection Injection: <code className="text-emerald-400 font-mono">Field &amp; Constructor Wiring</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Automated dependency resolution: scanning @Autowired fields and constructors, calling field.setAccessible(true), and wiring bean instances.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="FieldAndConstructorReflectionInjectionDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Custom DI Framework FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 012_004 Topic 5: Field & Constructor Reflection Injection"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="012_004_topic5_field_and_constructor_reflection_injection_note.txt"
        />
      </section>

      <Teacher
        note="Notice field.setAccessible(true)! Even though fields are marked private, our DI engine can inject dependencies directly through reflection without requiring public setters! — Sukanta Hui"
      />
    </div>
  );
}
