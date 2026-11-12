import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/StringImmutabilityDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Immutability of String Objects and Its Advantages
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 200" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="160" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">IMMUTABILITY: WHAT HAPPENS ON s = s + " World"</text>
          
          <rect x="50" y="70" width="180" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="140" y="95" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Original Object @0x1</text>
          <text x="140" y="125" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">"Hello"</text>
          <text x="140" y="145" fill="#ef4444" fontSize="9" textAnchor="middle">(Untouched / Orphaned)</text>

          <path d="M 240 115 L 360 115" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
          <text x="300" y="105" fill="#f59e0b" fontSize="10" textAnchor="middle">+ " World"</text>

          <rect x="370" y="70" width="220" height="90" rx="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <text x="480" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">BRAND NEW Object @0x2</text>
          <text x="480" y="125" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">"Hello World"</text>
          <text x="480" y="145" fill="#34d399" fontSize="9" textAnchor="middle">'s' now points here</text>
        </svg>
      </div>
    
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Strings Basic & Core Concepts
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Immutability of String Objects and Its Advantages
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Why String objects in Java cannot be altered once created. Advantages including thread safety, security, caching, and hashcode preservation.
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
              Why String objects in Java cannot be altered once created. Advantages including thread safety, security, caching, and hashcode preservation.
            </p>
            <p>
              In ICSE board programming, mastering these core string mechanics ensures clean algorithmic implementation and zero loss of marks in Section A and Section B.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-base">Classroom Scenario</h3>
            <p>
              Debangshu from Barrackpore lab tries modifying a string variable and traces memory addresses with Sukanta Sir.
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
          title="StringImmutabilityDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Topic 3: Immutability of String Objects and Its Advantages FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_001 Topic 3: Immutability of String Objects and Its Advantages"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_001_topic3_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"ICSE Section A favourite question: What is printed by `s.toLowerCase()` if not assigned? The original string! Always teach students that String methods have RETURN VALUES that must be captured: `s = s.toLowerCase()`. — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic3;
