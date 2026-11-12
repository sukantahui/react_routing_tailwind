import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/ParseIntDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: parseInt(String s) Method Deep Dive
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">INTEGER.PARSEINT(STRING S): STRING TO PRIMITIVE INT</text>
          
          <rect x="60" y="70" width="280" height="65" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="200" y="95" fill="#38bdf8" fontSize="11" textAnchor="middle">String Literal / Input</text>
          <text x="200" y="120" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">"45000" (Text)</text>

          <path d="M 360 102 L 440 102" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="400" y="94" fill="#10b981" fontSize="10" textAnchor="middle">parseInt()</text>

          <rect x="460" y="70" width="300" height="65" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
          <text x="610" y="95" fill="#34d399" fontSize="11" textAnchor="middle">Primitive 32-bit int</text>
          <text x="610" y="120" fill="#facc15" fontSize="15" fontWeight="bold" textAnchor="middle">45000 (Math Number)</text>
        </svg>
      </div>
    
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_001_wrapper-class-methods · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Wrapper Class Methods
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          parseInt(String s) Method Deep Dive
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Complete guide to Integer.parseInt(String s). Parsing digit strings into primitive int, radix parameters, and handling NumberFormatException.
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
            <p className="text-amber-300 bg-slate-900 p-2 rounded">{"public static int parseInt(String s) throws NumberFormatException"}</p>
            <p><strong className="text-slate-400">Return Type:</strong> <span className="text-emerald-400">{"int (primitive 32-bit signed integer)"}</span></p>
            <p><strong className="text-slate-400">Parameters:</strong> <span className="text-sky-300">{"String s (the string containing the integer representation)"}</span></p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-sm">Classroom Scenario</h3>
            <p>
              Swadeep and Tuhina parse student roll numbers and test scores from Scanner inputs at Barrackpore.
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
          title="ParseIntDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title={"Topic 0: parseInt(String s) Method Deep Dive FAQs"}
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title={"Module 005_001_wrapper-class-methods Topic 0: parseInt(String s) Method Deep Dive"}
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_001_topic0_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"NumberFormatException Trap: `Integer.parseInt(\"12.5\")` throws NumberFormatException because it has a decimal point! For decimals, use `Double.parseDouble(\"12.5\")`! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic0;
