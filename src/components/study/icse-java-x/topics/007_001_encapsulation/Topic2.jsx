import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic2_files/DataHidingSecurityDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Data Hiding & Security Architecture
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">DATA HIDING: SECURITY SHIELD AROUND CORE STATE</text>
          
          <circle cx="410" cy="100" r="50" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="410" y="98" fill="#34d399" fontSize="11" textAnchor="middle">PRIVATE</text>
          <text x="410" y="113" fill="#ffffff" fontSize="10" textAnchor="middle">DATA</text>

          <circle cx="410" cy="100" r="70" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
          
          <rect x="60" y="80" width="160" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="140" y="105" fill="#38bdf8" fontSize="11" textAnchor="middle">Public Methods</text>

          <rect x="600" y="80" width="160" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="680" y="105" fill="#38bdf8" fontSize="11" textAnchor="middle">Public Interface</text>
        </svg>
      </div>
    
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 007_001_encapsulation · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Encapsulation in Java
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Data Hiding & Security Architecture
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Architectural significance of data hiding in Java. Preventing accidental corruption of internal state, defensive programming, and separation of interface from implementation.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> Method Signature &amp; Specification
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-300">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 font-mono text-xs">
            <h3 className="font-bold text-sky-400 text-sm font-sans">Method Prototype</h3>
            <p className="text-amber-300 bg-slate-900 p-2 rounded">{"Data Hiding = Private State + Controlled Public Interface"}</p>
            <p><strong className="text-slate-400">Return Type:</strong> <span className="text-emerald-400">Robust System Integrity</span></p>
            <p><strong className="text-slate-400">Parameters:</strong> <span className="text-sky-300">Strict boundary separation</span></p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-sm">Classroom Scenario</h3>
            <p>
              Swadeep and Tuhina simulate an ATM PIN verification system where the internal PIN hash is hidden.
            </p>
            <p>
              Mastering this method prototype is essential for passing ICSE Section A questions and constructing robust Section B algorithms.
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
          title="DataHidingSecurityDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title={"Topic 2: Data Hiding & Security Architecture FAQs"}
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title={"Module 007_001_encapsulation Topic 2: Data Hiding & Security Architecture"}
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic2_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"Classroom Observation: Students in Barrackpore often confuse Abstraction and Encapsulation. Remember: Abstraction answers 'WHAT does it do?' while Encapsulation answers 'HOW is it packaged and protected?' — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic2;
