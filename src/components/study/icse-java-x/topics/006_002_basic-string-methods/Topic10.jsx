import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic10_files/CompareToMethodDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Lexicographical Comparison & ASCII Difference Calculation">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">Lexicographical Comparison & ASCII Difference Calculation</text>
    <rect x="60" y="75" width="90" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="105" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Source String</text>
    <rect x="170" y="75" width="100" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="220" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">compareTo(String</text>
    <line x1="280" y1="92" x2="330" y2="92" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3" />
    <rect x="340" y="75" width="100" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="390" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Result State</text>
  </svg>
);

const Topic10 = () => {
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
            Module 006_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE String Methods
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          compareTo(String str) Method
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Lexicographical order evaluation, ASCII difference subtraction, and alphabetical sorting mechanics
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Method Specification & Mechanics
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows.
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Return Values: Returns 0 if equal, &lt; 0 if this &lt; str, > 0 if this > str.</li>
              <li>ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).</li>
              <li>Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().</li>
              <li>Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).</li>
              <li>Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.</li>
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
            Computing exact ASCII differences, prefix length differences, and string array sorting comparisons.
          </p>
        </div>
        <JavaFileLoader
          fileName="CompareToMethodDemo.java"
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
              <li>Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).</li>
              <li>Passing null to compareTo() resulting in runtime NullPointerException.</li>
              <li>Misinterpreting the return sign when sorting arrays in ascending vs descending order.</li>
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
          title="compareTo(String str) Method FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 006_002 Topic 10: compareTo(String str) Method"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_002_topic10_note.txt"
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

export default Topic10;
