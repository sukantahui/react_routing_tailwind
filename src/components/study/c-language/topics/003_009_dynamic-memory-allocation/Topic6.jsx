import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic6_files/DynamicVectorProjectDemo.c?raw";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 6
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Systems Capstone Project
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Hands-on Projects: Dynamic Resizable Vector Engine
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Synthesize your dynamic memory mastery by constructing an industrial resizable Dynamic Vector in pure C. Learn geometric capacity expansion, bounds-checked element access, and leak-proof lifecycle management.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Engineering Dynamic Data Structures
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Standard C arrays have rigid compile-time limits. By combining a <code>struct</code> with dynamic heap allocation, we can build custom containers that automatically grow as data arrives, identical to <code>std::vector</code> in C++ or <code>ArrayList</code> in Java.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-emerald-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-emerald-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore project lab, Swadeep, Tuhina, and Abhronila built a real-time banking transaction logger. Instead of fixing the transaction capacity to 100, Sukanta Hui guided them to build an <code>IntVector</code> engine with geometric doubling. They observed that as transactions crossed 2, 4, 8, and 16 items, the vector doubled its capacity seamlessly without losing a single transaction record!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Dynamic Vector Memory Model
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Struct Header Box */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="220" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="15" y="30" fill="#a5b4fc" className="font-bold text-xs">STRUCT IntVector (24 Bytes)</text>
              <rect x="15" y="45" width="190" height="30" fill="#312e81" rx="4" />
              <text x="25" y="65" fill="#e0e7ff" className="font-mono text-xs">data = 0x8A00 (ptr) →</text>
              <rect x="15" y="85" width="190" height="30" fill="#312e81" rx="4" />
              <text x="25" y="105" fill="#e0e7ff" className="font-mono text-xs">size = 3 (active items)</text>
              <rect x="15" y="125" width="190" height="30" fill="#312e81" rx="4" />
              <text x="25" y="145" fill="#e0e7ff" className="font-mono text-xs">capacity = 6 (slots)</text>
            </g>

            {/* Arrow */}
            <text x="280" y="145" fill="#64748b" className="font-bold text-xl">→</text>

            {/* Heap Buffer Layout */}
            <g transform="translate(320, 50)">
              <rect x="0" y="0" width="530" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="20" y="30" fill="#6ee7b7" className="font-bold text-xs">HEAP DATA BUFFER @ 0x8A00 (Capacity = 6)</text>
              
              <g transform="translate(20, 50)">
                {/* Active elements */}
                <rect x="0" y="0" width="75" height="50" fill="#065f46" stroke="#10b981" rx="4" />
                <text x="37" y="30" textAnchor="middle" fill="#ecfdf5" className="font-mono text-xs font-bold">15</text>
                <text x="37" y="65" textAnchor="middle" fill="#a7f3d0" className="font-mono text-[10px]">[0]</text>

                <rect x="80" y="0" width="75" height="50" fill="#065f46" stroke="#10b981" rx="4" />
                <text x="117" y="30" textAnchor="middle" fill="#ecfdf5" className="font-mono text-xs font-bold">30</text>
                <text x="117" y="65" textAnchor="middle" fill="#a7f3d0" className="font-mono text-[10px]">[1]</text>

                <rect x="160" y="0" width="75" height="50" fill="#065f46" stroke="#10b981" rx="4" />
                <text x="197" y="30" textAnchor="middle" fill="#ecfdf5" className="font-mono text-xs font-bold">45</text>
                <text x="197" y="65" textAnchor="middle" fill="#a7f3d0" className="font-mono text-[10px]">[2]</text>

                {/* Free capacity slots */}
                <rect x="240" y="0" width="75" height="50" fill="#022c22" stroke="#059669" strokeDasharray="3 3" rx="4" />
                <text x="277" y="30" textAnchor="middle" fill="#6ee7b7" className="font-mono text-xs">free</text>
                <text x="277" y="65" textAnchor="middle" fill="#059669" className="font-mono text-[10px]">[3]</text>

                <rect x="320" y="0" width="75" height="50" fill="#022c22" stroke="#059669" strokeDasharray="3 3" rx="4" />
                <text x="357" y="30" textAnchor="middle" fill="#6ee7b7" className="font-mono text-xs">free</text>
                <text x="357" y="65" textAnchor="middle" fill="#059669" className="font-mono text-[10px]">[4]</text>

                <rect x="400" y="0" width="75" height="50" fill="#022c22" stroke="#059669" strokeDasharray="3 3" rx="4" />
                <text x="437" y="30" textAnchor="middle" fill="#6ee7b7" className="font-mono text-xs">free</text>
                <text x="437" y="65" textAnchor="middle" fill="#059669" className="font-mono text-[10px]">[5]</text>
              </g>

              <text x="20" y="150" fill="#34d399" className="text-xs font-mono">
                Size = 3 (Green) | Free Capacity = 3 (Dashed) | Automatic 2x resize when full
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Vector API Design
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">Amortized O(1) Growth Strategy</h3>
            <p className="text-slate-300">
              Doubling capacity on demand guarantees that copying elements during reallocation happens infrequently, yielding an average insertion time complexity of O(1).
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">Safe Double-Pointer Destructor</h3>
            <p className="text-slate-300">
              <code>vector_destroy(&amp;my_vec)</code> frees the internal buffer, frees the struct container, and sets <code>my_vec = NULL</code> in one clean call.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Dynamic Vector Capstone Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>DynamicVectorProjectDemo.c</code>) demonstrates a complete, standalone, production-grade Dynamic Vector engine with geometric capacity expansion, bounds checking, and safe destruction.
        </p>

        <CFileLoader fileModule={cCode} title="DynamicVectorProjectDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
   CODER & ACCOTAX - DYNAMIC VECTOR CAPSTONE PROJECT    
========================================================

--- 1. PUSHING ELEMENTS (Triggering Geometric Growth) ---
  Pushed:  15 | Size: 1 | Capacity: 2
  Pushed:  30 | Size: 2 | Capacity: 2
  [Vector Event] Capacity auto-expanded to 4 elements
  Pushed:  45 | Size: 3 | Capacity: 4
  Pushed:  60 | Size: 4 | Capacity: 4
  [Vector Event] Capacity auto-expanded to 8 elements
  Pushed:  75 | Size: 5 | Capacity: 8
  Pushed:  90 | Size: 6 | Capacity: 8

--- 2. VECTOR CONTENTS ---
  Elements: [0]: 15  [1]: 30  [2]: 45  [3]: 60  [4]: 75  [5]: 90  

--- 3. POPPING LAST ELEMENT ---
  Popped element: 90 | New Size: 5

--- 4. CLEAN DESTRUCTION ---
  Vector destroyed. my_vec pointer neutralized to: (nil)
========================================================`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-rose-300">Pitfall: Freeing Struct Without Data Buffer</h3>
            <p className="text-slate-300">
              Calling <code>free(vec);</code> without first calling <code>free(vec-&gt;data);</code> destroys the struct but leaves the data array permanently stranded in RAM.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Encapsulate Lifecycle in Pairs</h3>
            <p className="text-slate-300">
              Always pair <code>create()</code> and <code>destroy()</code> functions in every custom data structure you design in C.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Thinking & Hints Section ("Think About This...") */}
      <section className="bg-slate-800/30 border border-slate-700/60 p-5 rounded-2xl space-y-2 text-xs md:text-sm">
        <h3 className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>🤔</span> Think About This...
        </h3>
        <p className="text-slate-300 leading-relaxed">
          How would you modify <code>IntVector</code> to support generic <code>void*</code> pointers so it can store any data type (strings, custom structs, or floats)?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_009 Topic 6 FAQs: Dynamic Vector Projects" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 6 Note: Dynamic Vector"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic6_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Building a dynamic vector is the ultimate rite of passage for every systems programmer! Master this encapsulation pattern, and you will understand how modern standard libraries power industrial software! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
