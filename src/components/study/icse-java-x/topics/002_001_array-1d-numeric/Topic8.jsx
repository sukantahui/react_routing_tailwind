import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic8_files/LinearSearchBasic.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Sequential Comparison: Linear Search Pointer Movement">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">Sequential Comparison: Linear Search Pointer Movement</text>
    <rect x="60" y="75" width="70" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="95" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">arr[0]</text>
    <rect x="150" y="75" width="70" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="185" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">arr[1]</text>
    <rect x="240" y="75" width="70" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="275" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">arr[2]</text>
    <rect x="330" y="75" width="70" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="365" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">arr[3]</text>
    <line x1="410" y1="92" x2="440" y2="92" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3" />
  </svg>
);

const Topic8 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            1D Array Numeric
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Linear Search in Unsorted Arrays
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Sequential search technique, boolean flag tracking, early loop termination, and index reporting
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Algorithmic Principles & Trace
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity.
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Sequential Inspection: Compares search target element by element starting from index 0.</li>
              <li>Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.</li>
              <li>Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.</li>
              <li>Unsorted Support: Does NOT require the array to be sorted, unlike binary search.</li>
              <li>Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-400 mb-2">BlueJ Workflow & Practice</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Compile and test this concept in BlueJ's interactive environment. Verify memory structures and inspect array elements directly on the object workbench.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Java Demo Simulation */}
      <section className="space-y-5">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <span className="w-2.5 h-6 bg-emerald-500 rounded-full" />
            Runnable Java Implementation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Simulating target search across unsorted elements with flag status and index tracking.
          </p>
        </div>
        <JavaFileLoader
          fileName="LinearSearchBasic.java"
          code={demoCode}
        />
      </section>

      {/* 4. Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-amber-500 rounded-full" />
          Board Examination Tips & Pitfalls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Common Board Exam Pitfall</h3>
            <ul className="text-sm text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Printing 'Element Not Found' inside the loop body instead of after loop termination.</li>
              <li>Continuing to loop after finding the search key without executing a break statement.</li>
              <li>Off-by-one errors when reporting 1-based position versus 0-based index.</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Always maintain clean Variable Description Tables (VDT), comment key logic statements, and verify boundary conditions for index 0 and length - 1.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Linear Search in Unsorted Arrays FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 002_001 Topic 8: Linear Search in Unsorted Arrays"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_001_topic8_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Practice dry running this algorithm on paper with a trace table before writing Java code in BlueJ. — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic8;
