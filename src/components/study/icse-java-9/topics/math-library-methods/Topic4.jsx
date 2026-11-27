import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/MathFloorDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 130" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Math.floor diagram">
    <rect x="20" y="15" width="460" height="100" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
    <text x="250" y="45" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">Math.floor(x) → Largest Integer ≤ x (Rounds DOWN ←)</text>
    <rect x="50" y="65" width="120" height="32" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
    <text x="110" y="86" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Input (-4.2)</text>
    <text x="220" y="86" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">← floor</text>
    <text x="290" y="86" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">=</text>
    <rect x="320" y="65" width="130" height="32" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
    <text x="385" y="86" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">-5.0 (double)</text>
  </svg>
);

const Topic4 = () => {
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
            ICSE Class 9 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Mathematical Library Methods
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Math.floor(x) - Floor Method
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Returns the largest double value that is less than or equal to the argument and is equal to a mathematical integer. Core for integer step conversions and Section A output questions.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-sky-500 rounded-full" />
          Method Specification & Mechanics
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          <code className="text-sky-300 font-mono bg-slate-950 px-2 py-0.5 rounded">public static double floor(double a)</code>
        </p>
        <InstructionalSVG />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-sky-400 mb-2">Core Rules & Syntax</h3>
            <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Return Type: ALWAYS 'double' (e.g. Math.floor(4.8) -> 4.0).</li>
              <li>Direction: ALWAYS rounds DOWN towards negative infinity (to the left on number line).</li>
              <li>Negative Numbers: Math.floor(-4.2) returns -5.0 (NOT -4.0, because -5.0 is smaller than -4.2).</li>
              <li>Exact Integers: Unchanged (e.g. Math.floor(4.0) -> 4.0).</li>
              <li>Narrowing: Store into int using explicit type cast: int r = (int) Math.floor(x);</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-400 mb-2">BlueJ Workflow & Board Focus</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In BlueJ's interactive Code Pad, practice evaluating positive and negative fractions side by side. Verify why implicit widening converts int inputs to double, and why explicit casting is essential when assigning to integers.
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
            Complete ICSE compliant Java class demonstrating method execution, edge cases, and output formatting.
          </p>
        </div>
        <JavaFileLoader
          fileName="MathFloorDemo.java"
          code={demoCode}
        />
      </section>

      {/* 4. Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="w-2.5 h-6 bg-amber-500 rounded-full" />
          ICSE Board Examination Tips & Pitfalls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Frequent Board Exam Pitfall</h3>
            <ul className="text-sm text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Writing method names without prefixing 'Math.' leads to identifier not found compilation error.</li>
              <li>Forgetting that return types are double; writing int x = Math.method() causes type mismatch.</li>
              <li>Ignoring integer division traps like 1/2 or 1/3 inside method arguments.</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">High Scoring Tip</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Always print output with decimal places for double return values (e.g., write 8.0 instead of 8). In Section A question papers, precision in return types earns full credit.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Math.floor(x) - Floor Method - FAQs & Board Output Practice"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="ICSE Class 9: Math.floor(x) - Floor Method"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="topic4_mathfloordemo_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Mastering Math library return types and signatures is the easiest way to secure full marks in ICSE Computer Applications Section A! Always trace with pencil first. — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic4;
