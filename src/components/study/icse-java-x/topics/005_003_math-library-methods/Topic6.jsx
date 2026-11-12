import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic6_files/MathExpressionsDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Algebraic Formula to Valid Java Code Translation Matrix">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">Algebraic Formula to Valid Java Code Translation Matrix</text>
    <rect x="60" y="75" width="100" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="110" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Input Value</text>
    <rect x="180" y="75" width="120" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="240" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Writing</text>
    <line x1="310" y1="92" x2="350" y2="92" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3" />
    <rect x="360" y="75" width="100" height="35" rx="5" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="410" y="97" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Result</text>
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
            Module 005_003 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Math Library Methods
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Writing Mathematical Expressions in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Translating algebra & coordinate geometry formulas to Java syntax, operator precedence, and Math library calls
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Method Specification & Mechanics
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          In ICSE Section A, questions consistently ask students to write Java expressions for algebraic, trigonometric, and geometric formulas. This requires correctly applying Math library methods, explicit multiplication operators (*), and parentheses to preserve mathematical precedence.
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Explicit Multiplication: In algebra, '2ab' is implicit multiplication; in Java, you MUST write '2 * a * b'.</li>
              <li>Quadratic Root Formula: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a).</li>
              <li>Denominator Parentheses: Writing '/ 2 * a' divides by 2 then multiplies by a; must write '/ (2 * a)'.</li>
              <li>Powers and Roots: Replace a^3 with Math.pow(a, 3) or a * a * a; replace square roots with Math.sqrt().</li>
              <li>Absolute Expression: |x^2 - y^2| translates to Math.abs(Math.pow(x, 2) - Math.pow(y, 2)) or Math.abs(x * x - y * y).</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-400 mb-2">BlueJ Workflow & Practice</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Compile and test this concept in BlueJ's interactive environment. Verify return types, parameter values, and edge cases directly on the object workbench.
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
            Translating top 10 recurring ICSE board exam algebraic formulas into syntactically valid Java code.
          </p>
        </div>
        <JavaFileLoader
          fileName="MathExpressionsDemo.java"
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
              <li>Omitting the * operator: writing 2a instead of 2 * a causes compile error.</li>
              <li>Denominator precedence error: writing a + b / c + d instead of (a + b) / (c + d).</li>
              <li>Using ^ operator for exponentiation: in Java, ^ is bitwise XOR, NOT power (use Math.pow).</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Always verify method return types (double vs long vs int), parenthesize denominators, and handle edge cases like negative roots and zero division.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Writing Mathematical Expressions in Java FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 005_003 Topic 6: Writing Mathematical Expressions in Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_003_topic6_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Mastering Math and Character methods guarantees full marks in Section A Question 1 & 2! Always dry run negative numbers with pencil first. — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic6;
