import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/StringClassBehaviorDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Working with String Class and Object Behavior
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">JAVA STRING CLASS INHERITANCE & INTERFACES</text>
          
          <rect x="310" y="60" width="200" height="35" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="410" y="82" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">java.lang.Object</text>

          <path d="M 410 95 L 410 115" stroke="#38bdf8" strokeWidth="2" />

          <rect x="280" y="115" width="260" height="35" rx="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <text x="410" y="137" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">public final class String</text>

          <rect x="40" y="115" width="180" height="35" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
          <text x="130" y="137" fill="#34d399" fontSize="10" textAnchor="middle">&lt;&lt;CharSequence&gt;&gt;</text>

          <rect x="600" y="115" width="180" height="35" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
          <text x="690" y="137" fill="#34d399" fontSize="10" textAnchor="middle">&lt;&lt;Comparable&gt;&gt;</text>

          <path d="M 220 132 L 280 132" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
          <path d="M 600 132 L 540 132" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
        </svg>
      </div>
    
    </div>
  );
};

const Topic4 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Strings Basic & Core Concepts
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Working with String Class and Object Behavior
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Exploring the java.lang.String class hierarchy, implemented interfaces (Serializable, Comparable, CharSequence), and object behavior in Java.
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
              Exploring the java.lang.String class hierarchy, implemented interfaces (Serializable, Comparable, CharSequence), and object behavior in Java.
            </p>
            <p>
              In ICSE board programming, mastering these core string mechanics ensures clean algorithmic implementation and zero loss of marks in Section A and Section B.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-base">Classroom Scenario</h3>
            <p>
              Abhronila from Ichapur and Swadeep from Barrackpore explore CharSequence polymorphic behavior and the toString() method.
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
          title="StringClassBehaviorDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Topic 4: Working with String Class and Object Behavior FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_001 Topic 4: Working with String Class and Object Behavior"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_001_topic4_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"ICSE Theory Trap: Remember that String is a 'final' class! If examiners ask 'Can we override charAt() by extending String?', the answer is NO because String cannot be extended! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic4;
