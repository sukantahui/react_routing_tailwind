import React, { useState } from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode1 from "./topic6_files/StudentRecordDatabaseDemo.c?raw";
import cCode2 from "./topic6_files/DatabaseIndexSearchDemo.c?raw";
import cCode3 from "./topic6_files/CsvToBinaryConverterDemo.c?raw";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

export default function Topic6() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      id: "ex1",
      title: "1. Persistent CRUD Binary Database Engine",
      file: cCode1,
      filename: "StudentRecordDatabaseDemo.c",
      description:
        "Full industrial student database engine implementing Create, Read, Update, In-Place Soft Delete, and File Compaction (Vacuuming) to reclaim disk sectors.",
      lineByLine: [
        {
          line: "typedef struct { int id; ... int is_active; } StudentRecord;",
          explanation:
            "Fixed-size 64-byte struct containing an active status flag (is_active). Predictable struct size makes O(1) random seeking possible.",
        },
        {
          line: "fseek(fp, -sizeof(StudentRecord), SEEK_CUR);",
          explanation:
            "After locating the target record, seeks backward by exactly 1 struct length to reposition the write cursor over the record's start.",
        },
        {
          line: "rec.is_active = 0; fwrite(&rec, sizeof(StudentRecord), 1, fp);",
          explanation:
            "Soft Delete implementation! Flags the record as deleted in place without shifting subsequent data across the hard drive.",
        },
        {
          line: 'rename("temp_compaction.db", DB_FILE);',
          explanation:
            "Atomic compaction swap! Copies active records into a clean temporary file and renames it atomically to reclaim dead sector space.",
        },
      ],
      output: `========================================================
    CODER & ACCOTAX - STUDENT DATABASE ENGINE (CRUD)    
========================================================

--- 1. INSERTING INITIAL STUDENT RECORDS ---
  Inserted: [ID: 101] Swadeep Sharma     (Systems Engineering, GPA: 3.85)
  Inserted: [ID: 102] Tuhina Mukherjee   (Data Science, GPA: 3.95)
  Inserted: [ID: 103] Debangshu Roy      (Cloud Architecture, GPA: 3.60)
  Inserted: [ID: 104] Abhronila Das      (Cyber Security, GPA: 3.90)

--- 2. DISPLAYING ALL ACTIVE RECORDS ---
--------------------------------------------------------------------------------
ID     NAME                 DEPARTMENT           GPA    STATUS    
--------------------------------------------------------------------------------
101    Swadeep Sharma       Systems Engineering  3.85   ACTIVE    
102    Tuhina Mukherjee     Data Science         3.95   ACTIVE    
103    Debangshu Roy        Cloud Architecture   3.60   ACTIVE    
104    Abhronila Das        Cyber Security       3.90   ACTIVE    
--------------------------------------------------------------------------------

--- 3. UPDATING STUDENT RECORD (ID: 103) ---
  [UPDATE SUCCESS] Student ID 103 updated in-place via fseek().

--- 4. SOFT DELETING STUDENT RECORD (ID: 101) ---
  [SOFT DELETE SUCCESS] Student ID 101 flagged as DELETED in-place.

--- 5. DATABASE STATE BEFORE COMPACTION ---
--------------------------------------------------------------------------------
ID     NAME                 DEPARTMENT           GPA    STATUS    
--------------------------------------------------------------------------------
102    Tuhina Mukherjee     Data Science         3.95   ACTIVE    
103    Debangshu Roy        Systems Engineering  3.98   ACTIVE    
104    Abhronila Das        Cyber Security       3.90   ACTIVE    
--------------------------------------------------------------------------------

--- 6. PERFORMING DATABASE COMPACTION (VACUUM) ---
  Compacting database: 3 active records retained, 1 purged.
  [COMPACTION COMPLETE] Reclaimed dead sector space.

  Cleaned up temporary database files.
========================================================`,
    },
    {
      id: "ex2",
      title: "2. Primary-Key Indexing & Instant Lookup",
      file: cCode2,
      filename: "DatabaseIndexSearchDemo.c",
      description:
        "Maintains an in-memory index table mapping primary IDs directly to disk byte offsets, enabling instant O(1) record retrieval without scanning files.",
      lineByLine: [
        {
          line: "typedef struct { int id; long byte_offset; } IndexEntry;",
          explanation:
            "Compact index structure linking student ID to its physical file byte offset.",
        },
        {
          line: "index_table->entries[count].byte_offset = ftell(fp);",
          explanation:
            "Scans database once during boot to register the disk byte positions of all active records.",
        },
        {
          line: "fseek(fp, index_table->entries[i].byte_offset, SEEK_SET);",
          explanation:
            "Jumps the disk pointer directly to the indexed offset for ID 103 in 1 microsecond without scanning the file!",
        },
      ],
      output: `========================================================
  CODER & ACCOTAX - DATABASE PRIMARY-KEY INDEXING LAB   
========================================================

  Seeded 4 student records into binary storage 'indexed_students.db'.

--- 1. IN-MEMORY PRIMARY-KEY INDEX TABLE ---
  [Index Entry 0] Student ID: 101 -> Disk Byte Offset:    0 bytes
  [Index Entry 1] Student ID: 102 -> Disk Byte Offset:   64 bytes
  [Index Entry 2] Student ID: 103 -> Disk Byte Offset:  128 bytes
  [Index Entry 3] Student ID: 104 -> Disk Byte Offset:  192 bytes

--- 2. FAST INDEXED QUERY FOR ID: 103 ---
  [RECORD LOCATED INSTANTLY VIA INDEX]
    ID         : 103
    Name       : Abhronila Das
    Department : Cyber Security
    GPA        : 3.85

  Cleaned up indexed database 'indexed_students.db'.
========================================================`,
    },
    {
      id: "ex3",
      title: "3. CSV to Binary Migration Utility",
      file: cCode3,
      filename: "CsvToBinaryConverterDemo.c",
      description:
        "Data ingestion pipeline that parses plain-text CSV spreadsheets and compiles them into compact binary storage records with validation.",
      lineByLine: [
        {
          line: "fgets(line_buf, sizeof(line_buf), csv_fp);",
          explanation:
            "Reads each comma-separated line safely from the input text file into memory.",
        },
        {
          line: 'sscanf(line_buf, "%d,%31[^,],%23[^,],%f", &s.id, s.name, s.city, &s.marks)',
          explanation:
            "Parses comma-separated tokens with strict buffer width limits to prevent overflow.",
        },
        {
          line: "fwrite(&s, sizeof(CompactStudent), 1, bin_fp);",
          explanation:
            "Serializes the parsed C struct directly to the high-performance binary storage file.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - CSV TO BINARY MIGRATION ENGINE     
========================================================

  Created source raw CSV file 'raw_students.csv'.

--- 1. PARSING CSV & WRITING PACKED BINARY CHUNKS ---
  [MIGRATED] ID: 201 | Name: Swadeep Sharma   | City: Barrackpore  | Marks: 88.5
  [MIGRATED] ID: 202 | Name: Tuhina Mukherjee | City: Shyamnagar   | Marks: 95.0
  [MIGRATED] ID: 203 | Name: Debangshu Roy    | City: Naihati      | Marks: 79.5
  [MIGRATED] ID: 204 | Name: Abhronila Das    | City: Ichapur      | Marks: 92.0
  Successfully migrated 4 records to binary file 'compact_students.bin'.

--- 2. VERIFYING BINARY PERSISTENCE STORAGE ---
  Binary Record 1: ID=201, Name=Swadeep Sharma, Marks=88.5
  Binary Record 2: ID=202, Name=Tuhina Mukherjee, Marks=95.0
  Binary Record 3: ID=203, Name=Debangshu Roy, Marks=79.5
  Binary Record 4: ID=204, Name=Abhronila Das, Marks=92.0

  Cleaned up temporary migration files.
========================================================`,
    },
  ];

  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 6
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Capstone Systems Project
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Capstone Project: Persistent CLI Binary Student Database Engine
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Architect an industrial-grade binary database engine in pure C. Implement persistent CRUD operations, primary-key indexing, in-place soft deletes, CSV migration pipelines, and automated database compaction (vacuuming).
        </p>
      </header>

      {/* 2. DEDICATED SIMPLE EXPLANATION SECTION */}
      <section className="space-y-5 bg-gradient-to-br from-emerald-950/40 via-slate-800/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30">💡</span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              In Very Simple Terms: How Real Databases Work Under the Hood
            </h2>
            <p className="text-emerald-300 text-xs md:text-sm font-medium">
              Fixed slots, soft delete flags, and database compaction
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <span>🗄️</span> 1. Fixed Record Slots
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Every student record occupies the exact same number of bytes (e.g. 64 bytes). This means student #500 is always at byte <code>500 * 64 = 32,000</code>. No scanning needed!
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
              <span>🗑️</span> 2. Soft Deletes (Why Not Erase?)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              If you delete a record in a 10GB database, shifting all 10GB of data left to close the gap is too slow. Instead, we just flip a single flag: <code>is_active = 0</code>. Instant delete!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span>🧹</span> 3. Compaction (Vacuuming)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              During scheduled maintenance, a compaction routine copies only active records to a new temporary file and renames it. This reclaims all wasted space seamlessly!
            </p>
          </div>
        </div>

        {/* Capstone Architecture Highlights */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <span>
            🚀 <strong>Production Pattern:</strong> Real database engines (like SQLite, PostgreSQL, and MySQL InnoDB) use this exact same binary page architecture to provide ACID reliability and millisecond queries!
          </span>
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Systems Capstone Architecture &amp; Maintenance Operations
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            This capstone project synthesizes all concepts learned throughout Module 003_010: Binary Streams, Struct Serialization, Random Seeking, In-Place Record Mutations, Error Diagnostics, and In-Memory Primary-Key Indexing into a coherent production-grade CLI storage engine.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-emerald-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-emerald-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore capstone session, Swadeep, Tuhina, Debangshu, and Abhronila built this exact persistent student database engine. When Swadeep tested the system by inserting 50,000 student records and searching by Roll Number, the in-memory index delivered search results in less than <strong>1 millisecond</strong>! Sukanta Hui then triggered the compaction routine, showing how dead soft-deleted records were pruned cleanly without taking the database offline.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Database Engine CRUD &amp; Compaction Pipeline
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* In-Memory Index */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="220" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="15" y="30" fill="#a5b4fc" className="font-bold text-xs">IN-MEMORY PRIMARY INDEX</text>
              <rect x="15" y="45" width="190" height="25" fill="#312e81" rx="4" />
              <text x="25" y="62" fill="#e0e7ff" className="font-mono text-xs">ID 101 → Offset 0B</text>
              <rect x="15" y="75" width="190" height="25" fill="#312e81" rx="4" />
              <text x="25" y="92" fill="#e0e7ff" className="font-mono text-xs">ID 102 → Offset 64B</text>
              <rect x="15" y="105" width="190" height="25" fill="#312e81" rx="4" />
              <text x="25" y="122" fill="#e0e7ff" className="font-mono text-xs">ID 103 → Offset 128B</text>
              <text x="15" y="160" fill="#818cf8" className="text-xs">O(1) Instant Offset Lookup</text>
            </g>

            {/* Binary Disk File */}
            <g transform="translate(300, 50)">
              <rect x="0" y="0" width="270" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="15" y="30" fill="#6ee7b7" className="font-bold text-xs">BINARY FILE (students.db)</text>
              <rect x="15" y="45" width="240" height="30" fill="#065f46" rx="4" />
              <text x="25" y="65" fill="#ecfdf5" className="font-mono text-xs">[101] Swadeep | ACTIVE</text>
              <rect x="15" y="80" width="240" height="30" fill="#7f1d1d" rx="4" />
              <text x="25" y="100" fill="#fee2e2" className="font-mono text-xs">[102] Tuhina | DELETED</text>
              <rect x="15" y="115" width="240" height="30" fill="#065f46" rx="4" />
              <text x="25" y="135" fill="#ecfdf5" className="font-mono text-xs">[103] Debangshu | ACTIVE</text>
              <text x="15" y="168" fill="#a7f3d0" className="text-xs">Soft Delete preserves file order</text>
            </g>

            {/* Compaction Target */}
            <g transform="translate(610, 50)">
              <rect x="0" y="0" width="250" height="180" rx="10" fill="#3b0764" stroke="#d946ef" strokeWidth="1.5" />
              <text x="15" y="30" fill="#f5d0fe" className="font-bold text-xs">VACUUM / COMPACTION</text>
              <rect x="15" y="45" width="220" height="30" fill="#581c87" rx="4" />
              <text x="25" y="65" fill="#fae8ff" className="font-mono text-xs">[101] Swadeep | ACTIVE</text>
              <rect x="15" y="80" width="220" height="30" fill="#581c87" rx="4" />
              <text x="25" y="100" fill="#fae8ff" className="font-mono text-xs">[103] Debangshu | ACTIVE</text>
              <text x="15" y="145" fill="#e879f9" className="text-xs">Dead sectors purged cleanly!</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Database Engine Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-emerald-300 text-sm">Storage Layout</h3>
            <p className="text-slate-300">
              Fixed 64-byte packed binary struct layout guaranteeing predictable seek arithmetic: <code>offset = slot * 64</code>.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sky-300 text-sm">Soft Delete Idiom</h3>
            <p className="text-slate-300">
              Sets <code>is_active = 0</code> in place without moving subsequent records, maintaining $O(1)$ delete speed.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-purple-300 text-sm">Atomic Vacuuming</h3>
            <p className="text-slate-300">
              Active records are streamed to a temporary binary file and swapped into place using the atomic OS <code>rename()</code> syscall.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED MULTI-EXAMPLE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>💻</span> Example Section: Capstone Database Engine Demonstrations
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Explore 3 production programs with step-by-step line explanations and terminal outputs.
            </p>
          </div>

          {/* Example Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {examples.map((ex, index) => (
              <button
                key={ex.id}
                onClick={() => setActiveTab(index)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === index
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Example Detail */}
        <div className="space-y-5">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60 text-xs md:text-sm text-slate-300 flex items-start gap-2">
            <span className="text-emerald-400 font-bold">📋 Overview:</span>
            <span>{examples[activeTab].description}</span>
          </div>

          <CFileLoader
            fileModule={examples[activeTab].file}
            title={examples[activeTab].filename}
            editable={false}
          />

          {/* Line-by-Line Plain-English Explanation Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 md:p-5 space-y-3 shadow-md">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>🔍</span> Plain-English Line-by-Line Code Breakdown:
            </div>
            <div className="space-y-2">
              {examples[activeTab].lineByLine.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start gap-2 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80"
                >
                  <code className="text-sky-300 font-mono text-[11px] sm:w-2/5 shrink-0 font-semibold bg-slate-900 px-2 py-1 rounded border border-slate-700/60">
                    {item.line}
                  </code>
                  <span className="text-slate-300 text-xs leading-relaxed">
                    {item.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-inner">
            <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
              <span>🖥️</span> Expected Console Execution Output:
            </div>
            <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
              {examples[activeTab].output}
            </pre>
          </div>
        </div>
      </section>

      {/* 7. Common Pitfalls & Best Practices Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-rose-300">Pitfall: Hard Deletions on Live Files</h3>
            <p className="text-slate-300">
              Truncating or shifting bytes in place on disk is notoriously error-prone. Always use soft deletes with flags, and compact into a separate file during quiet maintenance windows.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Atomic Renames for Compaction</h3>
            <p className="text-slate-300">
              When compacting files, write to <code>temp_compaction.db</code> and swap using <code>rename("temp_compaction.db", "students.db")</code> to avoid data loss if a crash occurs mid-vacuum.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Thinking & Hints Section ("Think About This...") */}
      <section className="bg-slate-800/30 border border-slate-700/60 p-5 rounded-2xl space-y-2 text-xs md:text-sm">
        <h3 className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>🤔</span> Think About This...
        </h3>
        <p className="text-slate-300 leading-relaxed">
          How would you implement a Write-Ahead Log (WAL) in C to guarantee zero data loss even if the computer loses power immediately after an <code>fwrite()</code> call?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 6 FAQs: Capstone Database Engine" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 6 Note: Capstone Database Engine"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic6_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Mastering file streams, binary struct serialization, in-memory index tables, and in-place random seeking gives you the exact skills needed to understand how enterprise database engines like PostgreSQL, MySQL, and SQLite work at the hardware level! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
