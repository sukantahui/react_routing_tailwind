import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/ArrayOfStructsDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_008 · Topic 2
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Multi-Record Datasets
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Array of Structures: Managing Multi-Record Datasets
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Learn how to manage tabular datasets in C. Build arrays of structures for record processing, database indexing, sorting, and search algorithms.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Array of Structures: Managing Multi-Record Datasets
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            An Array of Structures stores multiple struct instances in contiguous memory, indexed from 0 to N-1 like a spreadsheet table.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              Debangshu built a student database for Shyamnagar high school using an array of 50 student structures, enabling linear search and sorting by marks.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Memory Architecture &amp; Execution Layout
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 200" className="w-full min-w-[700px] font-sans">
            <rect x="20" y="50" width="860" height="100" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="450" y="90" textAnchor="middle" fill="#38bdf8" className="font-bold text-base">
              Memory Layout Architecture: Array of Structures: Managing Multi-Record Datasets
            </text>
            <text x="450" y="120" textAnchor="middle" fill="#94a3b8" className="text-xs">
              Contiguous byte alignment in C memory space (Module 003_008 • Topic 2)
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown &amp; Architectural Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300">Rule 1: Memory Contiguity &amp; Access</h3>
            <p className="text-slate-300">An Array of Structures stores multiple struct instances in contiguous memory, indexed from 0 to N-1 like a spreadsheet table.</p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-indigo-300">Rule 2: Performance &amp; Hardware Alignment</h3>
            <p className="text-slate-300">Always optimize data alignment to prevent CPU bus penalty or unwanted cache line splits.</p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Array of Structures: Managing Multi-Record Datasets Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ArrayOfStructsDemo.c</code>) demonstrates a complete standalone C console application for Array of Structures: Managing Multi-Record Datasets.
        </p>

        <CFileLoader fileModule={cCode} title="ArrayOfStructsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
  CODER & ACCOTAX - ARRAY OF STRUCTURES DEMO
  Center: Barrackpore | Educator: Sukanta Hui
====================================================

Student Database (3 Records Loaded):
[ID: 101] Swadeep Biswas  - Grade: A+ (94.50%)
[ID: 102] Tuhina Das      - Grade: A  (91.00%)
[ID: 103] Abhronila Roy   - Grade: A+ (96.80%)

Class Average Marks: 94.10%`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><b>Uninitialized Members:</b> Always initialize struct fields before dereferencing.</li>
          <li><b>Padding Overhead:</b> Order struct fields from largest data type to smallest data type to minimize padding bytes.</li>
          <li><b>Type Safety:</b> Use explicit type casting when punning union fields.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400">
          🤔 Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How do operating system kernel drivers use bit-fields and structures to parse Ethernet headers and PCI express configuration registers in hardware real-time?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_008 Topic 2 FAQs" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 2 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_008_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Debangshu built a student database for Shyamnagar high school using an array of 50 student structures, enabling linear search and sorting by marks. — Sukanta Hui" />
      </section>
    </div>
  );
}
