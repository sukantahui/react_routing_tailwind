import React, { useState } from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode1 from "./topic3_files/BinaryStructIODemo.c?raw";
import cCode2 from "./topic3_files/RawByteArrayDemo.c?raw";
import cCode3 from "./topic3_files/BinaryHeaderProtocolDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      id: "ex1",
      title: "1. Struct Serialization (fread/fwrite)",
      file: cCode1,
      filename: "BinaryStructIODemo.c",
      description:
        "Serializes arrays of complex student structures directly to disk in binary mode with fwrite() and restores them back into memory with fread().",
      lineByLine: [
        {
          line: 'FILE *fp = fopen("students.bin", "wb");',
          explanation:
            "Opens the file in Binary Write mode ('wb'). This disables newline byte translations that would otherwise corrupt binary records.",
        },
        {
          line: "fwrite(students, sizeof(Student), 3, fp);",
          explanation:
            "Writes all 3 student structs (144 bytes total) from RAM directly onto the disk in a single CPU instruction burst.",
        },
        {
          line: "while (fread(&s, sizeof(Student), 1, fp) == 1)",
          explanation:
            "Golden binary reading loop! Reads exactly 1 struct (48 bytes) into variable 's'. Terminates cleanly the moment EOF is hit.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - BINARY STRUCT I/O & SERIALIZATION  
========================================================

--- 1. SERIALIZING STRUCTURE ARRAY TO DISK (fwrite) ---
  Wrote 3 student records (144 bytes) to 'students.bin'.

--- 2. DESERIALIZING STRUCTURE ARRAY FROM DISK (fread) ---
  Successfully read 3 records from binary file:
  [Record 1] Roll: 101 | Name: Swadeep Sharma     | Marks: 88.50 | Status: Active
  [Record 2] Roll: 102 | Name: Tuhina Mukherjee   | Marks: 94.00 | Status: Active
  [Record 3] Roll: 103 | Name: Debangshu Roy      | Marks: 76.25 | Status: Inactive

  Cleaned up 'students.bin'.
========================================================`,
    },
    {
      id: "ex2",
      title: "2. Raw Matrix Serialization",
      file: cCode2,
      filename: "RawByteArrayDemo.c",
      description:
        "Demonstrates raw binary array and 2D floating-point matrix persistence with zero string-conversion overhead, preserving 100% mathematical precision.",
      lineByLine: [
        {
          line: "double source_matrix[3][3] = { ... };",
          explanation:
            "Declares a 3x3 matrix of double-precision floating numbers (72 raw bytes) in system memory.",
        },
        {
          line: "fwrite(source_matrix, sizeof(double), 9, fp);",
          explanation:
            "Directly dumps all 9 doubles to disk. There is zero ASCII text formatting overhead, making it 10x to 100x faster than text I/O.",
        },
        {
          line: "fread(dest_matrix, sizeof(double), 9, fp);",
          explanation:
            "Populates the uninitialized dest_matrix in RAM by pulling the raw bytes straight off storage.",
        },
      ],
      output: `========================================================
    CODER & ACCOTAX - RAW BINARY ARRAY SERIALIZATION    
========================================================

--- 1. WRITING RAW 3x3 DOUBLE MATRIX TO DISK ---
  Successfully wrote 9 double elements (72 bytes) to 'matrix_data.bin'.

--- 2. READING RAW BINARY MATRIX BACK INTO MEMORY ---
  Successfully read 9 double elements.

--- 3. RECONSTRUCTED MATRIX IN RAM ---
    [   1.00   0.00   0.00 ]
    [   0.00   1.00   0.00 ]
    [   0.50   0.50   1.00 ]

  Cleaned up binary matrix file 'matrix_data.bin'.
========================================================`,
    },
    {
      id: "ex3",
      title: "3. Custom Binary File Header Protocol",
      file: cCode3,
      filename: "BinaryHeaderProtocolDemo.c",
      description:
        "Designs a custom binary container format with a 16-byte metadata header, magic number (0x434F4445 / 'CODE'), schema versioning, and payload chunks.",
      lineByLine: [
        {
          line: "__attribute__((packed))",
          explanation:
            "Instructs the compiler to eliminate padding bytes between struct fields, ensuring binary file layout is consistent across 32-bit and 64-bit systems.",
        },
        {
          line: "fwrite(&header, sizeof(FileHeader), 1, fp);",
          explanation:
            "Writes the 16-byte metadata preamble containing Magic ID ('CODE'), version number, and total record count.",
        },
        {
          line: "if (read_hdr.magic != FILE_MAGIC) ...",
          explanation:
            "Validates that the file opened is genuine and not corrupted or belonging to another file format.",
        },
      ],
      output: `========================================================
  CODER & ACCOTAX - BINARY FILE PROTOCOL & HEADER LAB   
========================================================

--- 1. WRITING STRUCTURED BINARY PROTOCOL FILE ---
  Wrote Header (16 bytes) + Payload (80 bytes) to 'students_v2.db'.

--- 2. READING & VALIDATING BINARY HEADER ---
  [HEADER OK] Magic: 0x434F4445 ("CODE") | Version: 2 | Records: 2

--- 3. DECODED PAYLOAD RECORDS ---
  [Record 1] ID: 101 | Name: Swadeep Sharma     | Marks: 91.5
  [Record 2] ID: 102 | Name: Tuhina Mukherjee   | Marks: 96.0

  Cleaned up custom protocol file 'students_v2.db'.
========================================================`,
    },
  ];

  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 3
          </span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Binary Persistence
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Binary Stream I/O &amp; Structure Serialization (fread &amp; fwrite)
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master high-performance binary persistence in C. Transfer exact RAM byte representations directly to and from secondary storage using <code>fread()</code> and <code>fwrite()</code> without string-parsing CPU overhead.
        </p>
      </header>

      {/* 2. DEDICATED SIMPLE EXPLANATION SECTION */}
      <section className="space-y-5 bg-gradient-to-br from-purple-950/40 via-slate-800/40 to-slate-900 border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-purple-500/20 rounded-xl border border-purple-500/30">💡</span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              In Very Simple Terms: Text Mode vs Binary Mode
            </h2>
            <p className="text-purple-300 text-xs md:text-sm font-medium">
              English translation vs Instant RAM photograph
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <span>📝</span> Text Mode (Slow Translation)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              When saving the number <code>12345678</code> in text mode, C converts it into 8 individual character codes ('1','2','3'...). This takes CPU time and 8 whole bytes on disk!
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-purple-400 font-bold text-sm flex items-center gap-1.5">
              <span>📸</span> Binary Mode (Instant Snapshot)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Binary mode takes a direct memory snapshot of your variable in RAM. The integer <code>12345678</code> is written as exactly 4 raw bytes. No formatting, no translation, <strong>10x faster</strong>!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span>💾</span> Photocopying a Struct (fwrite)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <code>fwrite(&amp;student, sizeof(Student), 1, fp)</code> is like photocopying an entire student ID card into a drawer with one quick motion. <code>fread()</code> pulls the exact card back into RAM!
            </p>
          </div>
        </div>

        {/* Binary Signature Callout */}
        <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-200">
          🔑 <strong>The Binary Rule:</strong> Always add <code>"b"</code> to your fopen mode (e.g. <code>"rb"</code>, <code>"wb"</code>, <code>"ab+"</code>). Without "b", the operating system may alter byte values like <code>0x0A (\n)</code> into <code>0x0D 0x0A (\r\n)</code>, corrupting binary integers and pointers!
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Direct RAM Serialization &amp; Memory Layout
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Unlike text I/O which parses ASCII strings, binary I/O bypasses character conversion entirely. <code>fwrite()</code> copies the raw bytes directly from a program's RAM buffer to disk, while <code>fread()</code> reconstructs structures in memory in $O(1)$ hardware transfer time.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-purple-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-purple-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              When benchmarking database performance with 100,000 student records in Barrackpore, Swadeep's <code>fprintf/fscanf</code> program took 4.8 seconds to write and parse. Sukanta Hui transitioned the codebase to binary <code>fwrite/fread</code>, cutting the runtime down to <strong>0.04 seconds</strong>! Sukanta also showed Debangshu why <code>#pragma pack(1)</code> is vital when exchanging binary files between 32-bit and 64-bit systems.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Binary Serialization Pipeline
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* RAM Struct */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="230" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="20" y="30" fill="#a5b4fc" className="font-bold text-sm">RAM: struct Student</text>
              <rect x="15" y="45" width="200" height="25" fill="#312e81" rx="4" />
              <text x="25" y="62" fill="#e0e7ff" className="font-mono text-xs">int roll = 101 (4B)</text>
              <rect x="15" y="75" width="200" height="25" fill="#312e81" rx="4" />
              <text x="25" y="92" fill="#e0e7ff" className="font-mono text-xs">char name[32] (32B)</text>
              <rect x="15" y="105" width="200" height="25" fill="#312e81" rx="4" />
              <text x="25" y="122" fill="#e0e7ff" className="font-mono text-xs">float marks = 94.0 (4B)</text>
              <text x="20" y="160" fill="#818cf8" className="text-xs">Total: 40 Bytes in RAM</text>
            </g>

            {/* Middle Action */}
            <g transform="translate(300, 100)">
              <rect x="0" y="0" width="290" height="80" rx="8" fill="#3b0764" stroke="#d946ef" strokeWidth="1.5" />
              <text x="15" y="30" fill="#f5d0fe" className="font-bold text-xs font-mono">fwrite(&amp;s, 40, 1, fp);</text>
              <text x="15" y="55" fill="#e879f9" className="text-xs">Direct DMA byte stream copy (No text conversion)</text>
            </g>

            {/* Disk Binary File */}
            <g transform="translate(620, 50)">
              <rect x="0" y="0" width="240" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="20" y="30" fill="#6ee7b7" className="font-bold text-sm">DISK: students.bin</text>
              <rect x="15" y="45" width="210" height="110" fill="#065f46" rx="4" />
              <text x="25" y="70" fill="#a7f3d0" className="font-mono text-xs">0x65 0x00 0x00 0x00 ...</text>
              <text x="25" y="95" fill="#a7f3d0" className="font-mono text-xs">"Swadeep Sharma\0\0..."</text>
              <text x="25" y="120" fill="#a7f3d0" className="font-mono text-xs">0x00 0x00 0xBC 0x42 ...</text>
              <text x="20" y="170" fill="#34d399" className="text-xs">Raw bit-exact byte persistence</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Function Signatures &amp; Return Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-purple-300 text-sm">fwrite() Signature</h3>
            <code className="text-amber-300 font-mono block bg-slate-950 p-2 rounded">
              size_t fwrite(const void *ptr, size_t size, size_t count, FILE *stream);
            </code>
            <p className="text-slate-300">
              Returns the number of <strong>full items</strong> successfully written (NOT total bytes). If return value &lt; count, a write error occurred.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-purple-300 text-sm">fread() Signature</h3>
            <code className="text-amber-300 font-mono block bg-slate-950 p-2 rounded">
              size_t fread(void *ptr, size_t size, size_t count, FILE *stream);
            </code>
            <p className="text-slate-300">
              Returns the number of items successfully read into memory. When reaching end-of-file, it returns a value less than count.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED MULTI-EXAMPLE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>💻</span> Example Section: Binary Stream Demonstrations
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Explore 3 hands-on C programs with step-by-step line explanations and terminal outputs.
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
            <h3 className="font-bold text-rose-300">Pitfall: Pointer Members in Serialized Structs</h3>
            <p className="text-slate-300">
              Never serialize structs containing pointer fields (e.g., <code>char *name;</code>). <code>fwrite</code> writes the 64-bit RAM memory address, which becomes an invalid dangling address when loaded in another run!
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Structure Packing Padding (#pragma pack)</h3>
            <p className="text-slate-300">
              Use <code>#pragma pack(push, 1)</code> or fixed-width integer types (<code>uint32_t</code>) to guarantee cross-compiler struct alignment compatibility across different CPU architectures.
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
          Why do high-throughput gaming engines and financial exchanges save game saves and order books in pure binary format rather than JSON or XML?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 3 FAQs: Binary Stream I/O & Struct Serialization" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 3 Note: Binary Stream I/O & Struct Serialization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic3_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Binary I/O gives you bare-metal speed! Always verify that fread() and fwrite() return the exact number of elements you requested. If fread returns fewer elements, you either hit EOF or had a physical drive read error. — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
