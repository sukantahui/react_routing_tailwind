import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic6_files/StudentRecordDatabaseDemo.c?raw";
import { topic6Questions } from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 003_010</span>
          <span>•</span>
          <span>Topic 6 (Capstone Project)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Capstone Project: Binary Student Record &amp; Database Engine (CLI Binary CRUD)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Synthesize binary stream I/O, struct serialization, random access seeking, and atomic error handling into a full-featured, persistent database engine supporting CRUD, soft delete, and compaction.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🚀 Classroom Story: Building a Production Database from Scratch</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          At our Barrackpore tech center, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> were tasked with writing a standalone student management database without using MySQL, SQLite, or third-party engines.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Under <strong>Sukanta Sir&apos;s</strong> guidance, they engineered a binary storage engine: record inserts using <code>ab</code> mode, random lookups with <code>fseek</code>, in-place updates with <code>rb+</code>, soft deletes using tombstone booleans (<code>isActive = false</code>), and garbage collection through atomic file compaction. The resulting standalone C binary processed tens of thousands of student queries per second with a microscopic RAM footprint.
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          System Architecture: CRUD Pipeline &amp; Compaction Lifecycle
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 320"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Database Engine Architecture Diagram"
          >
            <rect width="900" height="320" fill="none" />

            {/* Client / CLI Layer */}
            <rect x="40" y="40" width="220" height="240" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="150" y="70" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">CLI Interface</text>

            <rect x="60" y="90" width="180" height="32" rx="6" fill="#047857" />
            <text x="150" y="111" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1. INSERT (ab)</text>

            <rect x="60" y="130" width="180" height="32" rx="6" fill="#0284c7" />
            <text x="150" y="151" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">2. SEARCH (rb + fseek)</text>

            <rect x="60" y="170" width="180" height="32" rx="6" fill="#d97706" />
            <text x="150" y="191" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">3. UPDATE (rb+)</text>

            <rect x="60" y="210" width="180" height="32" rx="6" fill="#b91c1c" />
            <text x="150" y="231" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">4. TOMBSTONE / PURGE</text>

            {/* Master Database File */}
            <rect x="330" y="40" width="260" height="240" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="460" y="70" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">student_master.dat</text>

            <rect x="350" y="90" width="220" height="35" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="360" y="112" fill="#a7f3d0" fontSize="11">Rec #1 [ID: 101 | ACTIVE]</text>

            <rect x="350" y="135" width="220" height="35" rx="6" fill="#451a03" stroke="#f59e0b" />
            <text x="360" y="157" fill="#fde68a" fontSize="11">Rec #2 [ID: 102 | TOMBSTONE]</text>

            <rect x="350" y="180" width="220" height="35" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="360" y="202" fill="#a7f3d0" fontSize="11">Rec #3 [ID: 103 | ACTIVE]</text>

            <rect x="350" y="225" width="220" height="35" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="360" y="247" fill="#a7f3d0" fontSize="11">Rec #4 [ID: 104 | ACTIVE]</text>

            {/* Compaction Stream */}
            <path d="M 590 140 L 660 140" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-cap-amber)" />
            <text x="625" y="130" fill="#f59e0b" fontSize="10" textAnchor="middle">Purge</text>

            {/* Compacted Temp File */}
            <rect x="660" y="40" width="200" height="240" rx="12" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
            <text x="760" y="70" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">student_temp.dat</text>

            <rect x="675" y="95" width="170" height="35" rx="6" fill="#064e3b" />
            <text x="685" y="117" fill="#a7f3d0" fontSize="11">Rec #1 [ID: 101]</text>

            <rect x="675" y="140" width="170" height="35" rx="6" fill="#064e3b" />
            <text x="685" y="162" fill="#a7f3d0" fontSize="11">Rec #3 [ID: 103]</text>

            <rect x="675" y="185" width="170" height="35" rx="6" fill="#064e3b" />
            <text x="685" y="207" fill="#a7f3d0" fontSize="11">Rec #4 [ID: 104]</text>

            <text x="760" y="250" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Atomic Swap &rarr; Master</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-cap-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The 4 Tenets of Engine Design
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. Append Mode (ab) for Append-Only Writes
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When inserting records, opening with <code>&quot;ab&quot;</code> guarantees that the operating system positions write pointers at EOF atomically, preventing race conditions or inadvertent overwriting of earlier records.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400">
              2. Tombstone Architecture (Soft Delete)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Hard deletion on disk requires shifting gigabytes of trailing bytes (an $O(N)$ write penalty). By toggling <code>isActive = false</code>, deletions execute in $O(1)$ constant time with zero file rewrites.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              3. In-Place Random Access Updates (rb+)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Updates seek to <code>(index * sizeof(Record))</code>, read the struct, modify fields in RAM, re-seek to the offset, write, and call <code>fflush()</code>.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
              4. Atomic Compaction (Garbage Collection)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Periodically, the purge engine streams active records to a temporary file, closes both streams, and replaces the master file using <code>rename()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Complete Capstone Code: Binary Student Database Engine
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Inspect this complete, compilable CLI database engine implementing Insert, Search, In-Place Update, Soft Delete, and Purge Compaction.
        </p>
        <CFileLoader
          fileName="StudentRecordDatabaseDemo.c"
          code={cCode}
          title="Production-Grade Binary Database CRUD Engine"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  CAPSTONE: Binary Student Database Engine (CRUD)
=====================================================

>>> Step 1: Inserting 4 initial student records...

>>> Step 2: Displaying All Active Records:
    ----------------------------------------------------------------------
    | ID   | Name               | Course             | GPA  | Status     |
    ----------------------------------------------------------------------
    | 101  | Swadeep Sharma     | Computer Science   | 3.85 | ACTIVE     |
    | 102  | Tuhina Roy         | Data Engineering   | 3.95 | ACTIVE     |
    | 103  | Abhronila Das      | Machine Learning   | 3.90 | ACTIVE     |
    | 104  | Debangshu Pal      | Information Tech   | 3.65 | ACTIVE     |
    ----------------------------------------------------------------------
    Total Active Records: 4

>>> Step 3: Searching for Student ID 102 (Tuhina Roy)...
    [FOUND] ID: 102 | Name: Tuhina Roy       | Course: Data Engineering   | GPA: 3.95

>>> Step 4: Updating Student ID 104 (Debangshu Pal) GPA to 3.80...
    Record updated successfully.

>>> Step 5: Soft-deleting Student ID 101 (Swadeep Sharma)...
    Record 101 marked as inactive (tombstone set).

>>> Step 6: Active Records after Soft Delete:
    ----------------------------------------------------------------------
    | ID   | Name               | Course             | GPA  | Status     |
    ----------------------------------------------------------------------
    | 102  | Tuhina Roy         | Data Engineering   | 3.95 | ACTIVE     |
    | 103  | Abhronila Das      | Machine Learning   | 3.90 | ACTIVE     |
    | 104  | Debangshu Pal      | Information Tech   | 3.80 | ACTIVE     |
    ----------------------------------------------------------------------
    Total Active Records: 3

>>> Step 7: Running Database Purge / Compaction...
    Compaction complete: 1 records purged, 3 records retained.

>>> Final State after Compaction:
    ----------------------------------------------------------------------
    | ID   | Name               | Course             | GPA  | Status     |
    ----------------------------------------------------------------------
    | 102  | Tuhina Roy         | Data Engineering   | 3.95 | ACTIVE     |
    | 103  | Abhronila Das      | Machine Learning   | 3.90 | ACTIVE     |
    | 104  | Debangshu Pal      | Information Tech   | 3.80 | ACTIVE     |
    ----------------------------------------------------------------------
    Total Active Records: 3

=== Database Engine Demonstration Completed Successfully ===`}
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
              <span>⚠️ Leaking File Handles</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Every function that opens a file (e.g., helper functions for search, update, or count) MUST close its <code>FILE *</code> handle before returning. Returning early without calling <code>fclose(fp)</code> exhausts the OS file descriptor table.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Atomic Compaction with POSIX rename()</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Never purge by modifying the master file directly. Write valid records to a temporary file and atomically swap it with <code>rename()</code>. This guarantees the database is never corrupted if a crash or power failure occurs mid-compaction.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: B-Tree Indexing in Real Database Engines</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          In our capstone project, searching by <code>ID</code> uses sequential scanning when the IDs are non-contiguous. Real database engines like SQLite and InnoDB store an auxiliary B-Tree index on disk where nodes are 4KB pages matching the OS page size. That allows searching a billion records in just 3 to 4 disk page reads!
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
        <PlainTextPrint note={noteText} fileName="Topic6_Capstone_Database_Engine_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="When you build your own binary database engine in C, you stop seeing software as magical abstractions and understand how real operating systems and database storage engines truly function."
      />
    </div>
  );
};

export default Topic6;
