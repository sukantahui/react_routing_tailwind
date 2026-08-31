import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import privateConstructorDemoCode from "./topic13_files/PrivateConstructorSingletonUtilityDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
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
            Module 002_002 · Topic 13
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Restricted Instantiation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Private Constructors: Preventing Instantiation &amp; Singletons
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Learn how to lock down object creation using <code className="text-rose-400 font-mono">private</code> constructors. Build non-instantiable static utility toolkits and implement thread-safe Bill Pugh Singleton architectures.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Power of the Private Constructor
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Declaring a constructor <code className="text-rose-400 font-mono">private</code> ensures that no outside class can instantiate it using <code className="text-sky-300 font-mono">new</code>. This enables two indispensable design patterns:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">1. Static Utility Class</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Prevents useless allocation of stateless helper classes (e.g. <code className="text-sky-300 font-mono">Math</code>, <code className="text-sky-300 font-mono">Collections</code>).
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">2. Singleton Registry</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Guarantees exactly ONE instance lives in Heap memory, shared globally via <code className="text-emerald-300 font-mono">getInstance()</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Singleton Memory Architecture
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 220" className="w-full h-auto">
            <rect x="30" y="30" width="280" height="160" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="170" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">CALLERS (STACK)</text>
            <rect x="45" y="80" width="250" height="95" rx="6" fill="#1e293b" />
            <text x="55" y="105" fill="#fde047" fontSize="10" fontFamily="monospace">reg1 = getInstance();</text>
            <text x="55" y="130" fill="#fde047" fontSize="10" fontFamily="monospace">reg2 = getInstance();</text>
            <text x="55" y="155" fill="#a7f3d0" fontSize="9">Both hold address: 0xCAFE</text>

            <path d="M 320 110 L 460 110" stroke="#38bdf8" strokeWidth="2" />

            <rect x="470" y="30" width="420" height="160" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="680" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">SINGLETON INSTANCE (HEAP @ 0xCAFE)</text>
            <rect x="490" y="80" width="380" height="95" rx="6" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
            <text x="505" y="105" fill="#a7f3d0" fontSize="10" fontFamily="monospace">CentralAcademicRegistry instance (SINGLETON)</text>
            <text x="505" y="130" fill="#fde047" fontSize="9">Private Constructor ran ONCE on first call</text>
            <text x="505" y="155" fill="#a7f3d0" fontSize="9">reg1 == reg2 → true</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={privateConstructorDemoCode}
          title="PrivateConstructorSingletonUtilityDemo.java"
          highlightLines={[13, 27, 33, 38, 54, 57, 61]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Private Constructor FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 13: Private Constructors"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic13_private_constructors_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="If your class is a pure utility toolkit (like MathUtils), make its constructor private and throw UnsupportedOperationException. If you need one shared central manager, use the Bill Pugh Singleton pattern! — Sukanta Hui"
      />
    </div>
  );
}