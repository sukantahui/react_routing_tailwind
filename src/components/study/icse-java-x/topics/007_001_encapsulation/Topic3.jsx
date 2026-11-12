import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/EmployeeSalaryDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

const TopicVisualDiagram = () => {
  return (
    <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-sky-400 flex items-center gap-2">
          <span>📊</span> Architectural Diagram: Real Life Class Examples & ICSE Board Specifications
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Visualizing internal memory allocation, JVM execution lifecycle, and reference mechanics.
        </p>
      </div>

      
      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 820 180" className="w-full min-w-[700px] h-auto font-mono">
          <rect x="20" y="20" width="780" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="410" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">ICSE CLASS ARCHITECTURE: DATA MEMBERS &amp; METHODS</text>
          
          <rect x="50" y="65" width="220" height="75" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="160" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Private Fields</text>
          <text x="160" y="105" fill="#ffffff" fontSize="10" textAnchor="middle">panNo, empName</text>
          <text x="160" y="123" fill="#ffffff" fontSize="10" textAnchor="middle">basicPay, da, hra, pf</text>

          <rect x="300" y="65" width="220" height="75" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="410" y="85" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Constructor &amp; Logic</text>
          <text x="410" y="105" fill="#ffffff" fontSize="10" textAnchor="middle">Employee(...)</text>
          <text x="410" y="123" fill="#ffffff" fontSize="10" textAnchor="middle">private void calculate()</text>

          <rect x="550" y="65" width="220" height="75" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
          <text x="660" y="85" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Public Interface</text>
          <text x="660" y="105" fill="#ffffff" fontSize="10" textAnchor="middle">public void display()</text>
          <text x="660" y="123" fill="#ffffff" fontSize="10" textAnchor="middle">main(String[] args)</text>
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
            Module 007_001_encapsulation · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Encapsulation in Java
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ICSE Class X Board Core
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Real Life Class Examples & ICSE Board Specifications
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Step-by-step construction of full ICSE Class X standard classes. Salary calculation, Library fine computation, and complete encapsulation models as per board question formats.
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
            <p className="text-amber-300 bg-slate-900 p-2 rounded">{"class <ClassName> { /* private fields, constructors, methods */ }"}</p>
            <p><strong className="text-slate-400">Return Type:</strong> <span className="text-emerald-400">Complete Compilable ICSE Class</span></p>
            <p><strong className="text-slate-400">Parameters:</strong> <span className="text-sky-300">Aligned with CISCE Class X Section B questions</span></p>
          </div>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-sm">Classroom Scenario</h3>
            <p>
              Abhronila and Debangshu implement an Employee salary slip generator for a Barrackpore textile company.
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
          title="EmployeeSalaryDemo.java"
          highlightLines={[15, 19, 23, 29]}
        />
      </section>

      {/* 5. Comprehensive FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title={"Topic 3: Real Life Class Examples & ICSE Board Specifications FAQs"}
          questions={questions}
        />
      </section>

      {/* 6. Plain Text Printable Note Section */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title={"Module 007_001_encapsulation Topic 3: Real Life Class Examples & ICSE Board Specifications"}
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="007_001_topic3_note.txt"
        />
      </section>

      {/* 7. Teacher's Note Section */}
      <section className="space-y-4">
        <Teacher
          note={"ICSE 15-Mark Strategy: Question 4 or 5 in Section B is ALWAYS a class design program (like Employee, Book, ElectricBill). Writing neat private fields, constructor, calculate(), and display() is the easiest 15 marks in the entire exam! — Sukanta Hui"}
        />
      </section>
    </div>
  );
};

export default Topic3;
