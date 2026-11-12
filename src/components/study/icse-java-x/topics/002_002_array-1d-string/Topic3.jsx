import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/CaseInsensitiveStringArrayDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Case Insensitive Comparison in String Array
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">RAW ASCII VS CASE-INSENSITIVE DICTIONARY SORTING</text>
          
          <rect x="50" y="70" width="330" height="65" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
          <text x="215" y="95" fill="#f87171" fontSize="11" textAnchor="middle">compareTo(): ASCII Biased</text>
          <text x="215" y="120" fill="#ffffff" fontSize="12" textAnchor="middle">"Zebra" [90] precedes "apple" [97]</text>

          <rect x="440" y="70" width="330" height="65" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="605" y="95" fill="#4ade80" fontSize="11" textAnchor="middle">compareToIgnoreCase(): Natural Order</text>
          <text x="605" y="120" fill="#ffffff" fontSize="12" textAnchor="middle">"apple" correctly precedes "Zebra"</text>
        </svg>
      </div>
    
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002_array-1d-string · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            1D Array (String Values)
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Case Insensitive Comparison in String Array
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Solving the ASCII case disparity in String arrays. Why uppercase letters precede lowercase in ASCII (65 vs 97), and using compareToIgnoreCase() for natural dictionary order.
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
            <p className="text-amber-300 bg-slate-900 p-2 rounded">{"arr[j].compareToIgnoreCase(arr[j+1]) > 0"}</p>
            <p><strong className="text-slate-400">Return Type:</strong> <span className="text-emerald-400">{"Case-Insensitive Dictionary Sorting"}</span></p>
            <p><strong className="text-slate-400">Parameters:</strong> <span className="text-sky-300">{"Ignores uppercase/lowercase ASCII offsets"}</span></p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-sm">Classroom Scenario</h3>
            <p>
              Tuhina and Abhronila sort mixed-case names (e.g. 'ananya', 'Barrackpore') without uppercase bias at Ichapur.
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
          title="CaseInsensitiveStringArrayDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title={"Topic 3: Case Insensitive Comparison in String Array FAQs"}
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title={"Module 002_002_array-1d-string Topic 3: Case Insensitive Comparison in String Array"}
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic3_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"ASCII Case Trap: In raw ASCII, 'Z' (90) comes BEFORE 'a' (97)! So 'Zebra' precedes 'apple'! Always use `compareToIgnoreCase()` to prevent uppercase bias! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic3;
