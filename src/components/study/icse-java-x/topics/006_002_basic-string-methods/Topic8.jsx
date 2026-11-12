import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic8_files/EqualsMethodDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="String Equality: Reference Comparison (==) vs Content Comparison (.equals)">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">String Equality: Reference Comparison (==) vs Content Comparison (.equals)</text>
    <rect x="60" y="75" width="90" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="105" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Source String</text>
    <rect x="170" y="75" width="100" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="220" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">equals(Object</text>
    <line x1="280" y1="92" x2="330" y2="92" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3" />
    <rect x="340" y="75" width="100" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="390" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Result State</text>
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
            Module 006_002 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE String Methods
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          equals(Object obj) Method
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Content-based equality verification, case-sensitive matching, null safety, and contrast with == operator
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Method Specification & Mechanics
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison).
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.</li>
              <li>Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.</li>
              <li>Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.</li>
              <li>Null Safety: str.equals(null) safely returns false without throwing an exception.</li>
              <li>Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-400 mb-2">BlueJ Workflow & Practice</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Compile and test this method in BlueJ's interactive environment. Inspect return values, test boundary conditions, and verify string immutability directly on the object workbench.
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
            Demonstrating String pool references vs new objects, and comparing == with equals().
          </p>
        </div>
        <JavaFileLoader
          fileName="EqualsMethodDemo.java"
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
              <li>Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.</li>
              <li>Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).</li>
              <li>Confusing boolean return value (true/false) with compareTo() integer return value (0).</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Always maintain clean Variable Description Tables (VDT), store returned values in matching variables, and handle edge cases like null or empty strings.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="equals(Object obj) Method FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 006_002 Topic 8: equals(Object obj) Method"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic8_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Remember that Strings are immutable in Java! Whenever you call a method that modifies a string, always assign the result back: str = str.method(...); — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic8;
