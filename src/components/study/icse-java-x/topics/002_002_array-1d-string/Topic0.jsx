import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/StringArrayDeclarationDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: String Array Declaration and Initialization
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">STRING ARRAY MEMORY: ARRAY OF OBJECT REFERENCES</text>
          
          <rect x="50" y="70" width="310" height="65" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="205" y="95" fill="#38bdf8" fontSize="11" textAnchor="middle">Stack / Array Heap Slots</text>
          <text x="205" y="120" fill="#ffffff" fontSize="12" textAnchor="middle">names[0], names[1], names[2]</text>

          <path d="M 370 102 L 440 102" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="405" y="94" fill="#10b981" fontSize="10" textAnchor="middle">points to</text>

          <rect x="450" y="70" width="320" height="65" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
          <text x="610" y="95" fill="#34d399" fontSize="11" textAnchor="middle">Heap String Objects</text>
          <text x="610" y="120" fill="#facc15" fontSize="12" textAnchor="middle">"Barrackpore", "Shyamnagar"</text>
        </svg>
      </div>
    
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002_array-1d-string · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            1D Array (String Values)
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          String Array Declaration and Initialization
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Foundational concepts of 1D String arrays. Understanding reference storage, null default initialization, array size vs string length, and traversing with for loops.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> Method Signature &amp; Specification
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs">
            <h3 className="font-bold text-sky-400 text-sm font-sans">Method Prototype</h3>
            <p className="text-amber-300 bg-slate-900 p-2 rounded">{"String[] arr = new String[size]; / String[] arr = {\"A\", \"B\"};"}</p>
            <p><strong className="text-slate-400">Return Type:</strong> <span className="text-emerald-400">{"1D Array of String References"}</span></p>
            <p><strong className="text-slate-400">Parameters:</strong> <span className="text-sky-300">{"Stores object references pointing to heap Strings"}</span></p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-sm">Classroom Scenario</h3>
            <p>
              Swadeep and Tuhina initialize an array of city names: Barrackpore, Shyamnagar, Ichapur, Naihati.
            </p>
            <p>
              Mastering this method prototype is essential for passing ICSE Section A questions and constructing robust Section B algorithms.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section>
        <TopicVisualDiagram />
      </section>

      {/* 4. Hands-on Code Example Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💻</span> Hands-on Executable Java Program
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Trace this compilable BlueJ Java class simulating the topic concepts.
          </p>
        </div>

        <JavaFileLoader
          fileModule={demoCode}
          title="StringArrayDeclarationDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title={"Topic 0: String Array Declaration and Initialization FAQs"}
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title={"Module 002_002_array-1d-string Topic 0: String Array Declaration and Initialization"}
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic0_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"NullPointerException Warning: `new String[5]` creates 5 `null` references! If you invoke `names[0].length()` before assigning a string, BlueJ throws NullPointerException! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic0;
