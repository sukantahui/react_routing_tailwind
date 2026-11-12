import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic6_files/TraverseLengthProperty.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Dynamic Bound Control with arr.length Field">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">Dynamic Bound Control with arr.length Field</text>
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

const Topic6 = () => {
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
            Module 002_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            1D Array Numeric
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Traversing Using length Property
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dynamic bound checking, defensive array iteration, and avoiding hardcoded size limits
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Concept Breakdown & Architecture
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes.
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).</li>
              <li>Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.</li>
              <li>Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].</li>
              <li>Generalization: Functions taking array parameters should always use the array's own length property.</li>
              <li>Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.</li>
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
            Comparing hardcoded loop limits against flexible arr.length loops across varied array instances.
          </p>
        </div>
        <JavaFileLoader
          fileName="TraverseLengthProperty.java"
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
              <li>Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().</li>
              <li>Hardcoding numeric limits (e.g. i &lt; 10) that fail when passed arrays of different lengths.</li>
              <li>Checking arr.length when the array reference is null, causing NullPointerException.</li>
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
          title="Traversing Using length Property FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 002_001 Topic 6: Traversing Using length Property"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_001_topic6_note.txt"
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

export default Topic6;
