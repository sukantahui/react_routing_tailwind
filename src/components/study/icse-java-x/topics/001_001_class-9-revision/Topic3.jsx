import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/ClassStructureAndMainDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Anatomy of an ICSE Java Class & JVM Entry Point">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">Anatomy of an ICSE Java Class & JVM Entry Point</text>
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

const Topic3 = () => {
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
            Module 001_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Class IX Revision
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Basic Class Structure & main in BlueJ
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Class IX Revision: Anatomy of a Java program, public static void main, BlueJ compilation, and console I/O
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Concept Principles & Architecture
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Every executable Java program is encapsulated inside a class definition matching the source filename. The 'public static void main(String[] args)' method serves as the standard entry point invoked by the Java Virtual Machine. In BlueJ, classes compile into bytecode and can be interacted with directly on the visual workbench.
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Class Declaration: 'public class ClassName' matches 'ClassName.java' on disk.</li>
              <li>Main Signature: 'public static void main(String[] args)' is the exact mandatory signature for JVM execution.</li>
              <li>Keyword 'public': Makes the class or method accessible from outside the package by the JVM.</li>
              <li>Keyword 'static': Allows the JVM to invoke main() without having to create an object of the class first.</li>
              <li>System.out.println: Standard console output stream in java.lang package that outputs text followed by newline.</li>
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
            Dissecting class tokens, access modifiers, main method signature, and BlueJ workbench interaction.
          </p>
        </div>
        <JavaFileLoader
          fileName="ClassStructureAndMainDemo.java"
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
              <li>Mismatched filename and class name causing compile-time error in Java.</li>
              <li>Altering the main method signature (e.g. omitting 'static' or 'String[] args').</li>
              <li>Confusing System.out.print() (no newline) with System.out.println() (appends newline).</li>
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
          title="Basic Class Structure & main in BlueJ FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 3: Basic Class Structure & main in BlueJ"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic3_note.txt"
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

export default Topic3;
