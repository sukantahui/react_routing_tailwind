import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/DataTypesAndVariablesDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Java Primitive Data Types & Type Promotion Hierarchy">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">Java Primitive Data Types & Type Promotion Hierarchy</text>
    <rect x="60" y="75" width="85" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="102" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Input/Type</text>
    <rect x="165" y="75" width="85" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="207" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Processing</text>
    <rect x="270" y="75" width="85" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="312" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Logic Branch</text>
    <rect x="375" y="75" width="85" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="417" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Output</text>
  </svg>
);

const Topic0 = () => {
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
            Module 001_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Class IX Revision
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Data Types & Variables in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Class IX Revision: Primitive types, memory sizes, default values, type casting, and variable scope
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Concept Principles & Architecture
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss.
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).</li>
              <li>Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).</li>
              <li>Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.</li>
              <li>Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.</li>
              <li>Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-400 mb-2">BlueJ Workflow & Practice</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Compile and test this concept in BlueJ's interactive environment. Verify syntax rules, variable declarations, and logic execution directly on the object workbench.
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
            Simulating primitive type declarations, byte sizes, implicit widening, and explicit narrowing type casting.
          </p>
        </div>
        <JavaFileLoader
          fileName="DataTypesAndVariablesDemo.java"
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
              <li>Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.</li>
              <li>Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.</li>
              <li>Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Always maintain clean Variable Description Tables (VDT), comment key logic statements, and test edge cases like boundary values and division by zero.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Data Types & Variables in Java FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 0: Data Types & Variables in Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic0_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Review Class IX fundamentals thoroughly. A solid grasp of types, conditions, and loops is vital for 100% success in Class X Computer Applications. — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic0;
