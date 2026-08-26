import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import brgDemoCode from "./topic3_files/SyntheticBridgeMethodPolymorphismDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_005 · Topic 3
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Bridge Methods
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Synthetic Bridge Methods: Preserving Polymorphism in Inherited Generics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Inspect compiler-generated artifacts: discovering how javac creates synthetic <code className="text-purple-300 font-mono">bridge methods</code> to preserve polymorphic method overriding across generic inheritance.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={brgDemoCode}
          title="SyntheticBridgeMethodPolymorphismDemo.java"
          highlightLines={[7, 10, 16, 17, 36, 37, 40, 41]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Bridge Methods FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_005 Topic 3: Synthetic Bridge Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_005_topic3_synthetic_bridge_methods_note.txt"
        />
      </section>

      <Teacher
        note="Bridge methods are invisible helpers created by Java! When you override a generic method with a concrete class like String, Java generates a hidden 'setData(Object)' method that forwards calls to your 'setData(String)' method! — Sukanta Hui"
      />
    </div>
  );
}