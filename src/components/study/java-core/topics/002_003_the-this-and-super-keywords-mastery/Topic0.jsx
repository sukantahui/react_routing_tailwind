import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import thisMemoryDemoCode from "./topic0_files/ThisMemoryPointerDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
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
            Module 002_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Memory Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          What is the <code className="text-sky-400 font-mono">this</code> Keyword in Java &amp; Memory Pointer Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Uncover the internal memory mechanics of Java's self-reference pointer. Understand how <code className="text-sky-300 font-mono">this</code> occupies Local Variable Slot 0, binds the active Heap instance, and coordinates instance execution.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Self-Reference Pointer in JVM Memory
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <code className="text-sky-300 font-mono">this</code> keyword in Java is an implicit reference variable that holds the Heap address of the current executing object instance. Whenever an instance method or constructor is invoked, the JVM automatically passes <code className="text-sky-300 font-mono">this</code> in slot 0 of the local variable table.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Barrackpore Identity Analogy (Sukanta Hui):</p>
            <p className="text-sm leading-relaxed">
              Think of <code className="text-sky-300 font-mono">this</code> as the pronoun <em>&quot;I / Myself&quot;</em>. When <strong>Swadeep Paul</strong> is executing code, <code className="text-sky-300 font-mono">this</code> points to Swadeep's account in memory. When <strong>Tuhina Das</strong> executes the method, <code className="text-sky-300 font-mono">this</code> points to Tuhina's account!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 'this' Reference Memory Map (Stack Frame to Heap)
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 220" className="w-full h-auto">
            <rect x="30" y="30" width="320" height="160" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="190" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">JVM THREAD STACK FRAME</text>
            <rect x="50" y="80" width="280" height="95" rx="6" fill="#1e293b" />
            <text x="65" y="105" fill="#fde047" fontSize="10" fontFamily="monospace">Slot 0 (this): 0x00FF88AA</text>
            <text x="65" y="130" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Slot 1 (name): &quot;Swadeep&quot;</text>
            <text x="65" y="155" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Slot 2 (roll): 101</text>

            <path d="M 360 110 L 460 110" stroke="#38bdf8" strokeWidth="2" />
            <text x="410" y="100" fill="#38bdf8" fontSize="9" textAnchor="middle">aload_0</text>

            <rect x="470" y="30" width="420" height="160" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="680" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">HEAP MEMORY OBJECT (Address: 0x00FF88AA)</text>
            <rect x="490" y="80" width="380" height="95" rx="6" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
            <text x="510" y="105" fill="#e0f2fe" fontSize="10" fontFamily="monospace">studentName: &quot;Swadeep Paul&quot;</text>
            <text x="510" y="130" fill="#e0f2fe" fontSize="10" fontFamily="monospace">rollNumber: 101</text>
            <text x="510" y="155" fill="#fde047" fontSize="9">Active Object Instance</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={thisMemoryDemoCode}
          title="ThisMemoryPointerDemo.java"
          highlightLines={[13, 19, 36, 41]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="What is 'this' in Memory FAQs (Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_003 Topic 0: What is 'this' Keyword in Memory"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_003_topic0_what_is_this_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Whenever you type 'this', you are holding the exact memory address of the living object on the Heap. It resides in local variable slot 0 of your stack frame! — Sukanta Hui"
      />
    </div>
  );
}