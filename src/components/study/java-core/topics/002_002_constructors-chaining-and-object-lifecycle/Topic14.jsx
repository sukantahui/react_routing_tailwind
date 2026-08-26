import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import accessModifiersDemoCode from "./topic14_files/ConstructorAccessModifiersScopeDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 14
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Encapsulation &amp; Access Control
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Constructor Access Modifiers: Public, Protected, Package-Private &amp; Private
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete visibility matrix for constructors. Control instantiation scope across packages, framework subclassing boundaries, and factory-exclusive models.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The 4 Scopes of Object Instantiation
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Applying access modifiers to constructors controls exactly <em>who</em> is allowed to create instances of your class across package and inheritance boundaries:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">public</h3>
              <p className="text-slate-300 font-sans text-xs">Any class in any package can call <code className="text-emerald-300 font-mono">new</code>.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">protected</h3>
              <p className="text-slate-300 font-sans text-xs">Same package + child classes in other packages via <code className="text-sky-300 font-mono">super()</code>.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">package-private</h3>
              <p className="text-slate-300 font-sans text-xs">Only classes in the exact same package.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-1">private</h3>
              <p className="text-slate-300 font-sans text-xs">Only methods/inner classes inside this class (Singleton/Factory).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={accessModifiersDemoCode}
          title="ConstructorAccessModifiersScopeDemo.java"
          highlightLines={[15, 21, 27, 33, 39, 50, 53, 56, 59]}
        />
      </section>

      {/* Section 3: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Constructor Access Modifiers FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 4: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 14: Constructor Access Modifiers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic14_access_modifiers_note.txt"
        />
      </section>

      {/* Section 5: Teacher's Note */}
      <Teacher
        note="Choose constructor visibility deliberately: public for client APIs, protected for framework base classes, package-private for modular internal tools, and private for Singletons! — Sukanta Hui"
      />
    </div>
  );
}