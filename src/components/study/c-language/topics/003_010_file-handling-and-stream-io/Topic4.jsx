import React, { useState } from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode1 from "./topic4_files/RandomAccessFileDemo.c?raw";
import cCode2 from "./topic4_files/FileReverseReaderDemo.c?raw";
import cCode3 from "./topic4_files/InPlaceRecordModifierDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      id: "ex1",
      title: "1. Direct Record Index Seeking",
      file: cCode1,
      filename: "RandomAccessFileDemo.c",
      description:
        "Jumps to arbitrary record indexes in O(1) time using fseek(SEEK_SET), queries byte positions with ftell(), and resets with rewind().",
      lineByLine: [
        {
          line: "fseek(fp, index * sizeof(Employee), SEEK_SET);",
          explanation:
            "Calculates byte offset and commands the file system to position the cursor directly at Record 4 in O(1) instant time.",
        },
        {
          line: "long pos = ftell(fp);",
          explanation:
            "Queries the stream indicator to confirm the exact byte offset (e.g. byte 144) before performing reads.",
        },
        {
          line: "rewind(fp);",
          explanation:
            "Instantly resets the file stream position back to byte 0 (start of file) and clears stream EOF indicators.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - RANDOM ACCESS FILE POSITIONING LAB 
========================================================

--- 1. INITIALIZING BINARY DATASET (5 RECORDS) ---
  Wrote 5 records (240 bytes) to 'employees.dat'.

--- 2. RANDOM SEEK: JUMPING DIRECTLY TO RECORD 4 (INDEX 3) ---
  Offset for record 3: 144 bytes
  Position before read (ftell): 144
  [Target Found] ID: 104 | Name: Debangshu Roy      | Dept: Security
  Position after read (ftell): 192

--- 3. JUMPING TO FIRST RECORD VIA rewind() ---
  After rewind(), ftell() returns: 0
  [Record 0] ID: 101 | Name: Swadeep Sharma     | Dept: Systems Eng

  Cleaned up 'employees.dat'.
========================================================`,
    },
    {
      id: "ex2",
      title: "2. Reverse File Seeking (SEEK_END)",
      file: cCode2,
      filename: "FileReverseReaderDemo.c",
      description:
        "Measures exact file size with fseek(0, SEEK_END) and ftell(), then reads characters in reverse order using negative seek offsets.",
      lineByLine: [
        {
          line: "fseek(fp, 0, SEEK_END); long sz = ftell(fp);",
          explanation:
            "The industry-standard 2-line pattern to query the total file size in bytes by jumping to the end and checking offset.",
        },
        {
          line: "fseek(fp, -offset, SEEK_END);",
          explanation:
            "Uses a negative offset relative to SEEK_END to step backward character-by-character from the end toward the start.",
        },
        {
          line: "int ch = fgetc(fp); putchar(ch);",
          explanation:
            "Reads each byte from the backward position and prints it to the terminal.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - REVERSE FILE SEEKING LAB           
========================================================

--- 1. FILE SIZE INSPECTION ---
  Target File : 'reverse_sample.txt'
  Total Size  : 28 bytes

--- 2. READING CHARACTERS IN REVERSE ORDER ---
  Reverse Output: 6202_BAL_SMETSYS_EROPKCARAB

--- 3. RESETTING TO START WITH rewind() ---
  After rewind(), ftell() position = 0 (Byte 0)
  First 10 characters: "BARRACKPOR"

  Cleaned up temporary file 'reverse_sample.txt'.
========================================================`,
    },
    {
      id: "ex3",
      title: "3. In-Place Record Mutation (rb+)",
      file: cCode3,
      filename: "InPlaceRecordModifierDemo.c",
      description:
        "Performs in-place updates of a specific record in a persistent binary database without reading or rewriting any other part of the file.",
      lineByLine: [
        {
          line: 'FILE *fp = fopen(db_file, "rb+");',
          explanation:
            "Opens the database in Read/Write Binary mode. Existing records are preserved and available for random seeking.",
        },
        {
          line: "long byte_offset = target_slot * sizeof(StudentItem);",
          explanation:
            "Calculates the exact byte coordinate on disk where slot 2 (Abhronila) is stored.",
        },
        {
          line: "fseek(fp, byte_offset, SEEK_SET);",
          explanation:
            "Jumps the disk pointer straight to that byte offset so we can read or write slot 2 directly.",
        },
        {
          line: "fseek(fp, byte_offset, SEEK_SET); fwrite(&target, sizeof(StudentItem), 1, fp);",
          explanation:
            "Seeks back to the slot boundary and overwrites the struct in-place without touching any other records in the file.",
        },
      ],
      output: `========================================================
  CODER & ACCOTAX - IN-PLACE RECORD MODIFIER LAB        
========================================================

--- 1. INITIAL DATABASE RECORDS ---
  [Slot 0] ID: 101 | Name: Swadeep          | Score:  85 | Grade: B
  [Slot 1] ID: 102 | Name: Tuhina           | Score:  92 | Grade: A
  [Slot 2] ID: 103 | Name: Abhronila        | Score:  88 | Grade: B
  [Slot 3] ID: 104 | Name: Debangshu        | Score:  74 | Grade: C

--- 2. UPDATING SLOT 2 (Abhronila) IN-PLACE VIA fseek() ---
  Before: Name: Abhronila, Score: 88, Grade: B
  After : Name: Abhronila, Score: 98, Grade: A
  [SUCCESS] Overwrote slot 2 at byte offset 88 directly on disk!

--- 3. DATABASE STATE AFTER IN-PLACE UPDATE ---
  [Slot 0] ID: 101 | Name: Swadeep          | Score:  85 | Grade: B
  [Slot 1] ID: 102 | Name: Tuhina           | Score:  92 | Grade: A
  [Slot 2] ID: 103 | Name: Abhronila        | Score:  98 | Grade: A
  [Slot 3] ID: 104 | Name: Debangshu        | Score:  74 | Grade: C

  Cleaned up temporary database 'students_db.bin'.
========================================================`,
    },
  ];

  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 4
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Random Access Navigation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Random Access File Positioning: fseek(), ftell() &amp; rewind()
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Navigate anywhere inside a file in constant $O(1)$ time. Master byte-offset manipulation with <code>fseek()</code>, position inspection with <code>ftell()</code>, and stream resets with <code>rewind()</code>.
        </p>
      </header>

      {/* 2. DEDICATED SIMPLE EXPLANATION SECTION */}
      <section className="space-y-5 bg-gradient-to-br from-amber-950/40 via-slate-800/40 to-slate-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-amber-500/20 rounded-xl border border-amber-500/30">💡</span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              In Very Simple Terms: Cassette Tape vs Digital Audio Player
            </h2>
            <p className="text-amber-300 text-xs md:text-sm font-medium">
              Why sequential reading is slow and how random seeking changes everything
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
              <span>📼</span> Sequential Access (Old Cassette)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              If you want to hear song #10 on an old cassette tape, you have to fast-forward through songs 1 to 9. In standard file reading, you would have to read and discard all earlier records.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <span>🎛️</span> Random Access (fseek Remote)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              With <code>fseek(fp, index * sizeof(Record), SEEK_SET)</code>, you tap directly on record #50,000 in <strong>1 microsecond</strong>! The disk arm jumps straight to that byte offset without reading anything else.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span>📍</span> The Digital Meter (ftell &amp; rewind)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <code>ftell(fp)</code> is the dashboard odometer telling you: <em>"You are currently at byte 144."</em> <code>rewind(fp)</code> is the reset button that instantly snaps you back to byte 0!
            </p>
          </div>
        </div>

        {/* 3 Anchor Points Card */}
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200">
          📍 <strong>The 3 Seek Anchor Points:</strong>
          <ul className="mt-1.5 space-y-0.5 list-disc list-inside">
            <li><code>SEEK_SET</code>: Starting reference is the very beginning of the file (Byte 0).</li>
            <li><code>SEEK_CUR</code>: Starting reference is the current position where the cursor is right now.</li>
            <li><code>SEEK_END</code>: Starting reference is the end of the file (use negative offsets to move backwards).</li>
          </ul>
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Constant-Time Record Navigation &amp; In-Place Updates
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When managing persistent datasets containing millions of records, reading sequentially from the beginning is prohibitively slow ($O(N)$). Fixed-size binary records enable constant-time ($O(1)$) random seeking directly to byte offset: <code>offset = index * sizeof(Record)</code>.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore lab, Abhronila wanted to update student #450's grade. She originally opened the file, read 449 records into a massive array, updated #450, and rewrote all 500 records back to disk. Sukanta Hui introduced <code>fseek()</code> in <code>"rb+"</code> mode, demonstrating how to jump straight to byte <code>450 * sizeof(StudentRecord)</code> and overwrite just that single 48-byte record in place without touching any other records!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Random Access Navigation Mechanics
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Seek Anchors Top Bar */}
            <g transform="translate(50, 45)">
              <rect x="0" y="0" width="220" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="25" y="22" fill="#a5b4fc" className="font-mono text-xs font-bold">SEEK_SET (Offset 0)</text>

              <rect x="280" y="0" width="220" height="35" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="305" y="22" fill="#6ee7b7" className="font-mono text-xs font-bold">SEEK_CUR (Current Byte)</text>

              <rect x="560" y="0" width="220" height="35" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
              <text x="585" y="22" fill="#fca5a5" className="font-mono text-xs font-bold">SEEK_END (End of File)</text>
            </g>

            {/* Record Grid */}
            <g transform="translate(50, 110)">
              {/* Record 0 */}
              <rect x="0" y="0" width="180" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              <text x="15" y="30" fill="#94a3b8" className="font-bold text-xs">Record 0 [0 - 47B]</text>
              <text x="15" y="52" fill="#64748b" className="font-mono text-xs">ID: 101 (Swadeep)</text>

              {/* Record 1 */}
              <rect x="195" y="0" width="180" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              <text x="210" y="30" fill="#94a3b8" className="font-bold text-xs">Record 1 [48 - 95B]</text>
              <text x="210" y="52" fill="#64748b" className="font-mono text-xs">ID: 102 (Tuhina)</text>

              {/* Record 2 - Target */}
              <rect x="390" y="0" width="180" height="70" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
              <text x="405" y="30" fill="#c7d2fe" className="font-bold text-xs">Record 2 [96 - 143B]</text>
              <text x="405" y="52" fill="#a5b4fc" className="font-mono text-xs font-bold">🎯 TARGET SEEK</text>

              {/* Record 3 */}
              <rect x="585" y="0" width="180" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              <text x="600" y="30" fill="#94a3b8" className="font-bold text-xs">Record 3 [144 - 191B]</text>
              <text x="600" y="52" fill="#64748b" className="font-mono text-xs">ID: 104 (Debangshu)</text>
            </g>

            {/* Jump Annotation */}
            <path d="M 50 100 Q 250 85 480 105" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="200" y="90" fill="#fbbf24" className="font-mono text-xs font-bold">fseek(fp, 2 * 48, SEEK_SET) → O(1) Jump</text>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Seeking Math &amp; Signatures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm">fseek()</h3>
            <code className="text-emerald-300 font-mono block bg-slate-950 p-2 rounded">
              int fseek(FILE *fp, long offset, int whence);
            </code>
            <p className="text-slate-300">
              Moves stream position to byte offset relative to <code>whence</code> (<code>SEEK_SET</code>, <code>SEEK_CUR</code>, <code>SEEK_END</code>). Returns 0 on success.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm">ftell()</h3>
            <code className="text-emerald-300 font-mono block bg-slate-950 p-2 rounded">
              long ftell(FILE *fp);
            </code>
            <p className="text-slate-300">
              Returns current byte position offset (0-indexed). Frequently used with <code>fseek(fp, 0, SEEK_END)</code> to determine file size.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm">rewind()</h3>
            <code className="text-emerald-300 font-mono block bg-slate-950 p-2 rounded">
              void rewind(FILE *fp);
            </code>
            <p className="text-slate-300">
              Equivalent to <code>(void)fseek(fp, 0L, SEEK_SET)</code>, and also clears error and EOF indicators for the stream.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED MULTI-EXAMPLE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>💻</span> Example Section: Random Access Demonstrations
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Explore 3 practical C programs with step-by-step line explanations and terminal outputs.
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
            <h3 className="font-bold text-rose-300">Pitfall: Seeking in Text Mode</h3>
            <p className="text-slate-300">
              On Windows text mode, newline translation (<code>\r\n</code> to <code>\n</code>) causes <code>ftell()</code> byte offsets to not match physical file offsets. Always use binary mode (<code>"rb"</code>/<code>"wb+"</code>) when seeking by calculated byte offsets.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Flush Before Switching Read/Write</h3>
            <p className="text-slate-300">
              When using update modes (<code>"rb+"</code>), always call <code>fseek()</code>, <code>fsetpos()</code>, or <code>fflush()</code> when alternating between reads and writes to synchronize stream buffers.
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
          What happens if you seek beyond the end of a file (e.g. <code>fseek(fp, 1000, SEEK_END)</code>) and write a single byte? (Hint: The OS creates a <em>sparse file</em> with a hole filled with zeroes!).
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 4 FAQs: Random Access File Positioning" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 4 Note: Random Access File Positioning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic4_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "To measure file size accurately in C, do: fseek(fp, 0, SEEK_END); long sz = ftell(fp); rewind(fp);. This 3-line idiom is used in compilers, game engines, and network servers worldwide. — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
