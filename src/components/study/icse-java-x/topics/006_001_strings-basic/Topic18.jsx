import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic18_files/ReverseStringDemo.java?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Reverse String Program
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">BACKWARD LOOP REVERSAL: FROM (length - 1) DOWN TO 0</text>
          
          <g transform="translate(180, 70)">
            {['I','C','S','E'].map((c, i) => (
              <g key={i} transform={"translate(" + (i * 70) + ", 0)"}>
                <rect x="0" y="0" width="55" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="27" y="28" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">{c}</text>
                <text x="27" y="58" fill="#64748b" fontSize="10" textAnchor="middle">[{i}]</text>
              </g>
            ))}
            <path d="M 245 22 L -20 22" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
            <polygon points="-25,22 -15,17 -15,27" fill="#f59e0b" />
            <text x="115" y="15" fill="#f59e0b" fontSize="10" textAnchor="middle">&lt;-- Step backward: i--</text>
          </g>

          <rect x="520" y="70" width="220" height="45" rx="6" fill="#059669" stroke="#10b981" strokeWidth="2" />
          <text x="630" y="98" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">rev: "ESCI"</text>
        </svg>
      </div>
    
    </div>
  );
};

const Topic18 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_001 · Topic 18
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Strings Basic & Core Concepts
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Reverse String Program
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          The classic ICSE Class 10 string reversal algorithms: backward for loop traversal, front-to-back prepending, and character array two-pointer swap.
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
              The classic ICSE Class 10 string reversal algorithms: backward for loop traversal, front-to-back prepending, and character array two-pointer swap.
            </p>
            <p>
              In ICSE board programming, mastering these core string mechanics ensures clean algorithmic implementation and zero loss of marks in Section A and Section B.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-base">Classroom Scenario</h3>
            <p>
              Swadeep, Tuhina, and Abhronila reverse school names and student rolls at Barrackpore lab.
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
          title="ReverseStringDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Topic 18: Reverse String Program FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_001 Topic 18: Reverse String Program"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_001_topic18_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"ICSE Section B Must-Know: Reversing a string is the core foundation for Palindrome programs and Piglatin programs! Practice writing the backward loop: `for (int i = s.length() - 1; i >= 0; i--) rev = rev + s.charAt(i);` until you can write it in your sleep! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic18;
