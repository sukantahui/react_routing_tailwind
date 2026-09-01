import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic17_files/PositiveNegativeCounterDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

const InstructionalSVG = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto max-w-xl mx-auto my-4" aria-label="Counting Positive and Negative Numbers Diagram">
    <rect x="20" y="20" width="460" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <text x="250" y="55" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">ICSE Algorithm: Counting Positive and Negative Numbers</text>
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

const Topic17 = () => {
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
            Module 002_001 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            1D Array Numeric
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Counting Positive and Negative Numbers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Categorizing numbers and zero elements using conditional array iteration
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Concept Overview
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            Understanding <strong>Counting Positive and Negative Numbers</strong> is a core algorithm requirement in the ICSE Class X Computer Applications syllabus.
          </p>
          <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-semibold text-sky-300 mb-1">Classroom Scenario:</p>
            <p className="text-sm">In Barrackpore lab, Debangshu analyzes temperature readings over a month to count warm days (&gt;0°C) and freezing days (&lt;0°C).</p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Algorithm Visual Blueprint
        </h2>
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <InstructionalSVG />
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Technical Breakdown & Execution Logic
        </h2>
        <div className="bg-slate-950/60 p-6 rounded-xl border border-slate-800 space-y-3 text-slate-300">
          <p className="font-semibold text-sky-300">Step-by-Step ICSE Execution Logic:</p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-300">
            <li>Initialize array boundaries from index <code className="text-amber-300 font-mono">0</code> to <code className="text-amber-300 font-mono">arr.length - 1</code>.</li>
            <li>Iterate through the elements using a standard manual <code className="text-amber-300 font-mono">for</code> loop.</li>
            <li>Apply conditional checks or variable updates inside the loop.</li>
            <li>Output the calculated values cleanly using <code className="text-amber-300 font-mono">System.out.println()</code>.</li>
          </ol>
        </div>
      </section>

      {/* 5. Hands-on Code Example Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Java Source Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="PositiveNegativeCounterDemo.java"
          highlightLines={[]}
        />
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Common Board Exam Pitfall</h3>
            <p className="text-slate-400">Iterating past valid indices (<code className="text-rose-300 font-mono">i &lt;= arr.length</code>) resulting in <code className="text-rose-300 font-mono">ArrayIndexOutOfBoundsException</code>.</p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400">Always write clear comments and maintain a Variable Description Table for 60-mark Section B questions.</p>
          </div>
        </div>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-5 bg-sky-950/40 p-6 md:p-8 rounded-2xl border border-sky-800/60 shadow-lg">
        <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
          <span>💭</span> Think About This...
        </h3>
        <ul className="space-y-2 text-sky-200 text-sm">
          <li>• How would the time complexity change if array size doubles?</li>
          <li>• What edge cases (empty array, zero, negative numbers) could break your logic?</li>
        </ul>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Counting Positive and Negative Numbers FAQs"
          questions={questions}
        />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 002_001 Topic 17: Counting Positive and Negative Numbers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_001_topic17_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Practice dry running this algorithm on paper with a trace table before writing Java code in BlueJ. — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic17;
