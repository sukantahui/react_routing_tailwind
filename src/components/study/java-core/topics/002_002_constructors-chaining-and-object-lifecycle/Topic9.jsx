import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import copyConstructorDemoCode from "./topic9_files/CopyConstructorDeepCloningDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
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
            Module 002_002 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Object Duplication &amp; Cloning
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Copy Constructor: Deep Cloning and Defensive State Duplication
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why professional Java architectures replace <code className="text-rose-400 font-mono">Object.clone()</code> with Copy Constructors. Master shallow vs deep cloning and implement defensive state duplication for mutable references.
        </p>
      </header>

      {/* Section 1: Concept Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Architectural Superiority of Copy Constructors
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong>Copy Constructor</strong> accepts an existing object of the same class and duplicates its state into a new Heap instance. Unlike Java's flawed <code className="text-rose-300 font-mono">Cloneable</code> interface, copy constructors are type-safe, support <code className="text-sky-300 font-mono">final</code> fields, and don't throw checked exceptions.
          </p>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Barrackpore Admit Card Duplicate Story:</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> requests a duplicate admit card, the center deep-clones his record. When he changes his exam center address on the duplicate, his original master record at Barrackpore remains 100% untouched!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Shallow Copy vs Deep Copy Memory Architecture
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg viewBox="0 0 920 250" className="w-full h-auto">
            {/* Box 1: Original Object */}
            <rect x="30" y="30" width="380" height="200" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="220" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">ORIGINAL OBJECT (HEAP)</text>
            <rect x="50" y="80" width="340" height="130" rx="6" fill="#1e293b" />
            <text x="65" y="105" fill="#e0f2fe" fontSize="10" fontFamily="monospace">studentName: &quot;Swadeep&quot; (Immutable)</text>
            <text x="65" y="130" fill="#fde047" fontSize="10" fontFamily="monospace">address: 0x88AA &rarr; [Station Rd, Barrackpore]</text>
            <text x="65" y="155" fill="#fde047" fontSize="10" fontFamily="monospace">courses: 0x99BB &rarr; [Core Java, DSA]</text>

            {/* Box 2: Deep Cloned Object */}
            <rect x="490" y="30" width="380" height="200" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="680" y="60" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">DEEP CLONED OBJECT (HEAP)</text>
            <rect x="510" y="80" width="340" height="130" rx="6" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
            <text x="525" y="105" fill="#a7f3d0" fontSize="10" fontFamily="monospace">studentName: &quot;Swadeep&quot;</text>
            <text x="525" y="130" fill="#a7f3d0" fontSize="10" fontFamily="monospace">address: 0x11CC &rarr; [Station Rd, Shyamnagar]</text>
            <text x="525" y="155" fill="#a7f3d0" fontSize="10" fontFamily="monospace">courses: 0x22DD &rarr; [Core Java, DSA, Spring]</text>
            <text x="680" y="195" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">✔ Completely Independent Memory Addresses!</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={copyConstructorDemoCode}
          title="CopyConstructorDeepCloningDemo.java"
          highlightLines={[22, 43, 67, 72, 76]}
        />
      </section>

      {/* Section 4: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Copy Constructor FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 5: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 9: Copy Constructor & Deep Cloning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic9_copy_constructor_note.txt"
        />
      </section>

      {/* Section 6: Teacher's Note */}
      <Teacher
        note="Never use Object.clone() in modern Java! Always write an explicit Copy Constructor that deep-copies mutable collections and nested objects. It makes your code clean, type-safe, and 100% bug-free. — Sukanta Hui"
      />
    </div>
  );
}