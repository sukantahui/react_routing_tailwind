import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic6_files/GrandCapstoneSystemDemo.c?raw";
import { topic6Questions } from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 004_012</span>
          <span>•</span>
          <span>Topic 6 (Grand Finale Capstone)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Grand Finale Capstone Project: Dynamic Linked Engine &amp; Binary File Persistence
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          The ultimate synthesis of modern C systems programming. Combine dynamic Doubly Linked List in-memory caching, binary file serialization, $O(1)$ CRUD mutations, and leak-free memory management into a production-grade database engine.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🏆 Classroom Story: The Master Engineers of Barrackpore</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Over the course of their journey at Coder &amp; AccoTax, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> progressed from printing simple pyramid patterns to mastering pointers, dynamic memory allocation, binary disk streams, and preprocessor metaprogramming.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          For their Grand Finale Capstone under <strong>Sukanta Sir</strong>, they built a complete student records database engine. It loads binary records from disk into a high-speed Doubly Linked List in RAM, executes updates with microsecond latency, and persists data back to non-volatile disk storage with zero memory leaks. They have achieved the rank of Master C Systems Engineers!
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          System Architecture: RAM Cache &amp; Binary Disk Serialization Cycle
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 300"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Grand Finale Architecture Diagram"
          >
            <rect width="900" height="300" fill="none" />

            {/* RAM Cache (Doubly Linked Nodes) */}
            <rect x="40" y="40" width="380" height="220" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="230" y="70" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle">In-Memory RAM Cache (DLL Nodes)</text>

            <rect x="60" y="90" width="340" height="40" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="75" y="115" fill="#a7f3d0" fontSize="12" font-family="monospace">Node [ID: 101] &lt;-&gt; Swadeep Sharma</text>

            <rect x="60" y="140" width="340" height="40" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="75" y="165" fill="#a7f3d0" fontSize="12" font-family="monospace">Node [ID: 102] &lt;-&gt; Tuhina Roy</text>

            <rect x="60" y="190" width="340" height="40" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="75" y="215" fill="#a7f3d0" fontSize="12" font-family="monospace">Node [ID: 103] &lt;-&gt; Abhronila Das</text>

            {/* Serialization Transfer Arrows */}
            <path d="M 430 120 L 510 120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-cap-g)" />
            <text x="470" y="105" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">fwrite()</text>

            <path d="M 510 180 L 430 180" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-cap-b)" />
            <text x="470" y="202" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">fread()</text>

            {/* Persistent Binary File on Disk */}
            <rect x="520" y="40" width="340" height="220" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="690" y="70" fill="#10b981" fontSize="15" fontWeight="bold" textAnchor="middle">Disk Storage (grand_student_db.dat)</text>

            <rect x="540" y="90" width="300" height="40" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="555" y="115" fill="#94a3b8" fontSize="11" font-family="monospace">Binary Record 1 [88 Bytes]</text>

            <rect x="540" y="140" width="300" height="40" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="555" y="165" fill="#94a3b8" fontSize="11" font-family="monospace">Binary Record 2 [88 Bytes]</text>

            <rect x="540" y="190" width="300" height="40" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="555" y="215" fill="#94a3b8" fontSize="11" font-family="monospace">Binary Record 3 [88 Bytes]</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-cap-g" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-cap-b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Complete Systems Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. In-Memory Cache (Heap DLL)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Provides sub-microsecond query and mutation speeds. Deletions unlink <code>prev</code> and <code>next</code> pointers in strictly $O(1)$ time without searching predecessors.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. Binary File Persistence
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Streams raw <code>StudentRecord</code> bytes directly to non-volatile disk via <code>fwrite()</code>, omitting in-memory pointers to guarantee complete file portability across sessions.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Complete Capstone Code: Unified Dynamic &amp; Persistent Database Engine
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Inspect this complete, compilable production engine demonstrating RAM caching, in-place updates, $O(1)$ DLL deletion, binary disk serialization, and rehydration.
        </p>
        <CFileLoader
          fileName="GrandCapstoneSystemDemo.c"
          code={cCode}
          title="Grand Finale: Dynamic Linked Engine & Binary File Persistence"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  GRAND CAPSTONE: Dynamic Linked Engine & File Persistence
=====================================================

>>> Step 1: Enqueuing Student Records into RAM Cache...
    ----------------------------------------------------------------------
    | ID   | Name               | Department         | GPA  | Status     |
    ----------------------------------------------------------------------
    | 101  | Swadeep Sharma     | Computer Science   | 3.85 | ACTIVE     |
    | 102  | Tuhina Roy         | Data Engineering   | 3.95 | ACTIVE     |
    | 103  | Abhronila Das      | AI & Robotics      | 3.90 | ACTIVE     |
    | 104  | Debangshu Pal      | Information Tech   | 3.65 | ACTIVE     |
    ----------------------------------------------------------------------
    Total In-Memory Records: 4

>>> Step 2: In-Memory Mutation (Updating Student 104 GPA)...
    Record 104 GPA updated to 3.80.

>>> Step 3: Deleting Student 101 from RAM Cache...
    Record 101 removed from active node chain.
    ----------------------------------------------------------------------
    | ID   | Name               | Department         | GPA  | Status     |
    ----------------------------------------------------------------------
    | 102  | Tuhina Roy         | Data Engineering   | 3.95 | ACTIVE     |
    | 103  | Abhronila Das      | AI & Robotics      | 3.90 | ACTIVE     |
    | 104  | Debangshu Pal      | Information Tech   | 3.80 | ACTIVE     |
    ----------------------------------------------------------------------
    Total In-Memory Records: 3

>>> Step 4: Persisting Active Cache to Disk File 'grand_student_db.dat'...
    All records successfully serialized to binary storage.

>>> Step 5: Destroying RAM Cache with freeDatabase()...
    RAM Cache is now empty.
    [Database is empty: 0 Records in RAM]

>>> Step 6: Rehydrating RAM Cache from Disk File 'grand_student_db.dat'...
    Successfully deserialized 3 records from disk into RAM nodes!
    ----------------------------------------------------------------------
    | ID   | Name               | Department         | GPA  | Status     |
    ----------------------------------------------------------------------
    | 102  | Tuhina Roy         | Data Engineering   | 3.95 | ACTIVE     |
    | 103  | Abhronila Das      | AI & Robotics      | 3.90 | ACTIVE     |
    | 104  | Debangshu Pal      | Information Tech   | 3.80 | ACTIVE     |
    ----------------------------------------------------------------------
    Total In-Memory Records: 3

=== Grand Finale Capstone Demonstration Completed ===`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Pitfalls &amp; Professional Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <span>⚠️ Serializing Node Pointers to Disk</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Never pass <code>sizeof(StudentNode)</code> to <code>fwrite()</code>! You would save <code>prev</code> and <code>next</code> pointer addresses to disk, which become invalid when read back in another session. Only serialize the payload <code>&(node-&gt;data)</code> with <code>sizeof(StudentRecord)</code>.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Zero Memory Leaks Guarantee</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Always pair every <code>malloc()</code> with a deterministic <code>free()</code>. Verify with AddressSanitizer (<code>-fsanitize=address</code>) or Valgrind on every build.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: The Foundation of Modern Software</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          From the Linux and Windows operating system kernels, to PostgreSQL, Redis, Git, WebKit, and Python&apos;s CPython interpreter—the foundational software of the modern digital world is written in pure C following the exact pointer, stream, memory, and modular architectures you have mastered in this course.
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic6Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic6_Grand_Finale_Capstone_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="To master C is to master computing from the transistor to the operating system. You now possess the power to build software of limitless scale and enduring reliability."
      />
    </div>
  );
};

export default Topic6;
