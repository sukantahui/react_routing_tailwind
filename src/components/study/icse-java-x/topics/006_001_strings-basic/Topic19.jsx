import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic19_files/PalindromeCheckerDemo.java?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Palindrome Checking Program
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">PALINDROME SYMMETRY: TWO-POINTER CONVERGENCE</text>
          
          <g transform="translate(160, 70)">
            {['R','A','C','E','C','A','R'].map((c, i) => (
              <g key={i} transform={"translate(" + (i * 70) + ", 0)"}>
                <rect x="0" y="0" width="55" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="27" y="28" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">{c}</text>
                <text x="27" y="58" fill="#64748b" fontSize="10" textAnchor="middle">[{i}]</text>
              </g>
            ))}
            {/* Mirror arc */}
            <path d="M 27 0 Q 242 -25 447 0" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 97 0 Q 242 -15 377 0" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 167 0 Q 242 -8 307 0" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" />
          </g>
        </svg>
      </div>
    
    </div>
  );
};

const Topic19 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 006_001 · Topic 19
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Strings Basic & Core Concepts
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Palindrome Checking Program
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Checking if a word or sentence reads identically forward and backward. Case-insensitive checking, ignoring spaces/punctuation, and ICSE Board Section B code patterns.
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
              Checking if a word or sentence reads identically forward and backward. Case-insensitive checking, ignoring spaces/punctuation, and ICSE Board Section B code patterns.
            </p>
            <p>
              In ICSE board programming, mastering these core string mechanics ensures clean algorithmic implementation and zero loss of marks in Section A and Section B.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-base">Classroom Scenario</h3>
            <p>
              Tuhina and Swadeep test classic palindromic words ('MADAM', 'ROTATOR', 'RACECAR') and Bengali phrases at Shyamnagar lab.
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
          title="PalindromeCheckerDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Topic 19: Palindrome Checking Program FAQs"
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 006_001 Topic 19: Palindrome Checking Program"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="006_001_topic19_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"Classic ICSE Board Trap: If input is \"Madam\", and you don't do `s = s.toUpperCase();`, `s.equals(rev)` will return FALSE because 'M' is not equal to 'm'! Always normalize case first in your Section B solution! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic19;
