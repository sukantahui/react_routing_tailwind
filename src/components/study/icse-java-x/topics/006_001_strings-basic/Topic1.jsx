import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic1_files/StringCreationMethodsDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: String Creation Using Literals vs New Keyword
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 220" className="w-full min-w-[700px] h-auto font-mono">
          <defs>
            <linearGradient id="scpGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="heapGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Stack Frame */}
          <rect x="20" y="20" width="180" height="180" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="110" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">STACK MEMORY</text>
          
          <rect x="35" y="65" width="150" height="35" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
          <text x="45" y="87" fill="#f8fafc" fontSize="10">s1 = "Barrackpore"</text>
          
          <rect x="35" y="110" width="150" height="35" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
          <text x="45" y="132" fill="#f8fafc" fontSize="10">s2 = "Barrackpore"</text>

          <rect x="35" y="155" width="150" height="35" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          <text x="45" y="177" fill="#f8fafc" fontSize="10">s3 = new String(...)</text>

          {/* Heap Memory Outer */}
          <rect x="250" y="20" width="550" height="180" rx="12" fill="#020617" stroke="#334155" strokeWidth="1.5" />
          <text x="525" y="42" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">HEAP MEMORY</text>

          {/* String Constant Pool (SCP) Sub-region */}
          <rect x="270" y="60" width="230" height="120" rx="10" fill="url(#scpGrad1)" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="385" y="82" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">STRING CONSTANT POOL (SCP)</text>
          
          <rect x="290" y="100" width="190" height="60" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="385" y="125" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">"Barrackpore"</text>
          <text x="385" y="145" fill="#f59e0b" fontSize="10" textAnchor="middle">Single Pooled Address @0x101</text>

          {/* Separate Heap Object */}
          <rect x="540" y="85" width="230" height="85" rx="10" fill="url(#heapGrad1)" stroke="#10b981" strokeWidth="1.5" />
          <text x="655" y="110" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">SEPARATE HEAP OBJECT</text>
          <text x="655" y="135" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">"Barrackpore"</text>
          <text x="655" y="155" fill="#f59e0b" fontSize="10" textAnchor="middle">New Address @0x7B9</text>

          {/* Connectors */}
          <path d="M 185 82 L 290 120" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M 185 127 L 290 135" stroke="#0ea5e9" strokeWidth="2" />
          <path d="M 185 172 L 540 135" stroke="#10b981" strokeWidth="2" />
        </svg>
      </div>
    
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Strings Basic & Core Concepts
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          String Creation Using Literals vs New Keyword
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understanding the distinction between String literals in String Constant Pool and explicit object allocation using the new keyword in Heap memory.
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
              Understanding the distinction between String literals in String Constant Pool and explicit object allocation using the new keyword in Heap memory.
            </p>
            <p>
              In ICSE board programming, mastering these core string mechanics ensures clean algorithmic implementation and zero loss of marks in Section A and Section B.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-base">Classroom Scenario</h3>
            <p>
              Swadeep from Barrackpore lab creates string literals while Tuhina from Shyamnagar instantiates strings using 'new'.
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
          title="StringCreationMethodsDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Topic 1: String Creation Using Literals vs New Keyword FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_001 Topic 1: String Creation Using Literals vs New Keyword"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_001_topic1_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"For ICSE Board exams: When accepting user input with Scanner, always use .equals() or .equalsIgnoreCase() to test strings! Remember, input is constructed on the Heap, so using == will always evaluate to false, costing you vital marks in Section B programs! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic1;
