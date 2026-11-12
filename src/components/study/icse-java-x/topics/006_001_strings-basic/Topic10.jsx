import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic10_files/StringCaseConversionDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Case Conversion Methods (toUpperCase, toLowerCase)
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">CASE CONVERSION TRANSFORMATIONS</text>
          
          <rect x="70" y="70" width="180" height="65" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="160" y="95" fill="#38bdf8" fontSize="11" textAnchor="middle">Original String</text>
          <text x="160" y="122" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">"Barrackpore"</text>

          <text x="310" y="105" fill="#38bdf8" fontSize="11" textAnchor="middle">.toUpperCase() -&gt;</text>

          <rect x="400" y="70" width="180" height="65" rx="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="490" y="95" fill="#ffffff" fontSize="11" textAnchor="middle">Uppercase New Object</text>
          <text x="490" y="122" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">"BARRACKPORE"</text>

          <text x="635" y="105" fill="#10b981" fontSize="11" textAnchor="middle">.toLowerCase() -&gt;</text>

          <rect x="670" y="70" width="120" height="65" rx="8" fill="#059669" stroke="#10b981" strokeWidth="1.5" />
          <text x="730" y="112" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">"barrackpore"</text>
        </svg>
      </div>
    
    </div>
  );
};

const Topic10 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_001 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Strings Basic & Core Concepts
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Case Conversion Methods (toUpperCase, toLowerCase)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Transforming strings to uppercase and lowercase using toUpperCase() and toLowerCase(). Preserving special characters and remembering reassignment.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> Concept Overview & Real-World Analogy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-sky-400 text-base">Core Theory & Mechanics</h3>
            <p>
              Transforming strings to uppercase and lowercase using toUpperCase() and toLowerCase(). Preserving special characters and remembering reassignment.
            </p>
            <p>
              In ICSE board programming, mastering these core string mechanics ensures clean algorithmic implementation and zero loss of marks in Section A and Section B.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-base">Classroom Scenario</h3>
            <p>
              Tuhina and Debangshu format roll numbers, exam hall slips, and titles at Naihati test center.
            </p>
            <p>
              Every student in our Barrackpore and Naihati computer batches traces these operations using step-by-step memory tables before coding in BlueJ.
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
          title="StringCaseConversionDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Topic 10: Case Conversion Methods (toUpperCase, toLowerCase) FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_001 Topic 10: Case Conversion Methods (toUpperCase, toLowerCase)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_001_topic10_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"ICSE Board Trap: Whenever doing palindrome checks or word searches, always convert the entire input string to either all-uppercase or all-lowercase before looping: `s = s.toUpperCase();`! This prevents case mismatch errors. — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic10;
