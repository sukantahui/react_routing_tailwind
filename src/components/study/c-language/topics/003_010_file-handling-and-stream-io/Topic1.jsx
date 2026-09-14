import React, { useState } from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode1 from "./topic1_files/FileModesBasicsDemo.c?raw";
import cCode2 from "./topic1_files/FileUpdateModesDemo.c?raw";
import cCode3 from "./topic1_files/SafeFileOpenerDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      id: "ex1",
      title: "1. Core Modes (r, w, a)",
      file: cCode1,
      filename: "FileModesBasicsDemo.c",
      description:
        "Demonstrates opening files in Write ('w'), Append ('a'), and Read ('r') modes, mandatory NULL checking, and clean stream termination with fclose().",
      lineByLine: [
        {
          line: 'FILE *fp = fopen("demo_file.txt", "w");',
          explanation:
            "Requests the OS to create/open the file in Write mode. If the file exists, it is wiped to 0 bytes; if not, it is created.",
        },
        {
          line: 'if (fp == NULL) { perror("..."); return 1; }',
          explanation:
            "Mandatory safety check! If disk write permissions are denied or path is invalid, fopen returns NULL. We catch it to prevent segmentation faults.",
        },
        {
          line: 'fprintf(fp, "Line 1: Initialized...\\n");',
          explanation:
            "Writes structured formatted text directly into the file stream buffer.",
        },
        {
          line: "fclose(fp); fp = NULL;",
          explanation:
            "Flushes all buffered bytes to disk, releases the OS file descriptor, and sets the pointer to NULL to avoid dangling handles.",
        },
        {
          line: 'fp = fopen("demo_file.txt", "a");',
          explanation:
            "Opens the file in Append mode ('a'). This preserves all existing lines and places the write cursor at the very end.",
        },
        {
          line: "while (fgets(buffer, sizeof(buffer), fp) != NULL)",
          explanation:
            "Loops through the file line by line safely, printing each line until reaching the end of the stream.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - FILE MODES & FOPEN() MECHANICS     
========================================================

--- 1. OPENING FILE IN WRITE MODE ("w") ---
  Created and wrote 2 lines to 'demo_file.txt' successfully.

--- 2. OPENING FILE IN APPEND MODE ("a") ---
  Appended 1 line to 'demo_file.txt' successfully.

--- 3. OPENING FILE IN READ MODE ("r") ---
  File Contents:
    > Line 1: Initialized in write mode.
    > Line 2: Systems Programming at Barrackpore.
    > Line 3: Appended without truncating old records!

  Demo file 'demo_file.txt' closed and cleaned up.
========================================================`,
    },
    {
      id: "ex2",
      title: "2. Update Modes (r+, w+, a+)",
      file: cCode2,
      filename: "FileUpdateModesDemo.c",
      description:
        "Illustrates bidirectional update modes ('+'), performing in-place record overwriting using fseek() in 'r+' mode, and rewind() inspections in 'a+' mode.",
      lineByLine: [
        {
          line: 'FILE *fp = fopen(data_file, "w+");',
          explanation:
            "Creates a new blank file in Read/Write mode. Enables writing initial records and reading them back on the same stream handle.",
        },
        {
          line: "rewind(fp);",
          explanation:
            "Snaps the file position indicator back to byte 0 so we can read the freshly written data from the beginning.",
        },
        {
          line: 'fp = fopen(data_file, "r+");',
          explanation:
            "Opens an existing file for both reading and in-place updating without wiping out existing records.",
        },
        {
          line: "fseek(fp, 20, SEEK_SET);",
          explanation:
            "Jumps directly to byte offset 20 (where Record 2 starts) to perform an in-place update without affecting Record 1 or 3.",
        },
        {
          line: 'fp = fopen(data_file, "a+");',
          explanation:
            "Append update mode. All writes are automatically forced to the end of the file, while reads can seek anywhere.",
        },
      ],
      output: `========================================================
    CODER & ACCOTAX - FILE UPDATE MODES LAB ("+")       
========================================================

--- 1. CREATING INITIAL FILE WITH "w+" MODE ---
  Created file and wrote 3 initial student records.

--- 2. READING BACK WITH SAME STREAM HANDLE ---
    > RECORD001:Swadeep:85
    > RECORD002:Tuhina:92
    > RECORD003:Debangshu:78

--- 3. MODIFYING RECORD IN PLACE WITH "r+" MODE ---
  Updated RECORD002 in-place without touching other records.

--- 4. APPENDING WITH "a+" MODE ---
  Appended RECORD004 to end of file.

--- 5. FINAL FILE SNAPSHOT ---
    > RECORD001:Swadeep:85
    > RECORD002:Tuhina:99
    > RECORD003:Debangshu:78
    > RECORD004:Abhronila:95

  Cleaned up temporary file 'update_modes_demo.dat'.
========================================================`,
    },
    {
      id: "ex3",
      title: "3. Defensive Safe File Opener",
      file: cCode3,
      filename: "SafeFileOpenerDemo.c",
      description:
        "A production-ready defensive wrapper pattern for fopen() and fclose() that traps errors, prints detailed errno system diagnostics, and prevents dangling pointers.",
      lineByLine: [
        {
          line: "FILE *safe_fopen(const char *path, const char *mode)",
          explanation:
            "A defensive helper function that validates input pointers and centralizes error diagnostic logging.",
        },
        {
          line: "strerror(errno), errno",
          explanation:
            "Queries the OS error subsystem to translate integer error codes into plain-English messages (e.g., 'No such file or directory').",
        },
        {
          line: "void safe_fclose(FILE **fp_ptr)",
          explanation:
            "Accepts a pointer-to-pointer (FILE**) so it can close the stream AND reset the caller's variable to NULL in one step.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - SAFE FILE OPENER & ERROR LAB       
========================================================

--- 1. TESTING CONTROLLED FAILURE (MISSING FILE) ---
[ERROR] Failed to open 'non_existent_file_xyz123.txt' in mode 'r'. Reason: No such file or directory (errno=2)
  [HANDLED] Gracefully trapped missing file error without crash.

--- 2. CREATING FILE SAFELY ---
  Successfully wrote record to 'valid_sample.txt'.
  Stream safely closed. Pointer reset: fp_valid == NULL

--- 3. READING CREATED FILE ---
  Read Content: "Safe file handling demonstration in Barrackpore.
"
  Cleaned up sample file 'valid_sample.txt'.
========================================================`,
    },
  ];

  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            File Stream Management
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          File Pointers &amp; Opening Modes (fopen &amp; fclose)
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master file stream binding with <code>fopen()</code> and clean deallocation with <code>fclose()</code>. Understand the operational matrix between Read (<code>r</code>), Write (<code>w</code>), Append (<code>a</code>), and Update (<code>+</code>) modes.
        </p>
      </header>

      {/* 2. DEDICATED SIMPLE EXPLANATION SECTION */}
      <section className="space-y-5 bg-gradient-to-br from-emerald-950/40 via-slate-800/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30">💡</span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              In Very Simple Terms: What is a FILE Pointer and Mode?
            </h2>
            <p className="text-emerald-300 text-xs md:text-sm font-medium">
              The library diary and bookmark analogy
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <span>📖</span> The Librarian &amp; Bookmark (FILE*)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Think of a file on your disk as a spiral notebook on a library shelf. When you call <code>fopen()</code>, you ask the librarian to pull the notebook and insert a <strong>bookmark</strong>. The pointer (<code>FILE*</code>) tracks exactly which line or byte you are currently reading or writing!
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
              <span>⚠️</span> The "w" Mode Danger
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Opening with <code>"w"</code> is like taking the old notebook and throwing all previous pages into the paper shredder! If the file already had 1,000 student records, <code>"w"</code> wipes it clean to 0 bytes. If you only want to add new lines, always use <code>"a"</code> (Append)!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span>🔒</span> Closing the Diary (fclose)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              When you finish writing, you must call <code>fclose(fp)</code>. This locks the notebook, saves all pending ink from memory onto the physical page, and returns the file descriptor back to the operating system so other programs can access it.
            </p>
          </div>
        </div>

        {/* Mode Summary Table */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sky-400 border-b border-slate-800">
                <th className="pb-2">Mode</th>
                <th className="pb-2">If File Exists?</th>
                <th className="pb-2">If File Missing?</th>
                <th className="pb-2">Initial Cursor Position</th>
                <th className="pb-2">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-1.5 font-mono text-indigo-300 font-bold">"r"</td>
                <td className="text-emerald-400">Opens normally</td>
                <td className="text-rose-400 font-bold">Returns NULL!</td>
                <td>Beginning (Byte 0)</td>
                <td>Read only</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono text-rose-300 font-bold">"w"</td>
                <td className="text-rose-400 font-bold">TRUNCATES to 0 bytes!</td>
                <td className="text-emerald-400">Creates new file</td>
                <td>Beginning (Byte 0)</td>
                <td>Fresh write / overwrite</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono text-emerald-300 font-bold">"a"</td>
                <td className="text-emerald-400">Preserves existing data</td>
                <td className="text-emerald-400">Creates new file</td>
                <td>End of File</td>
                <td>Safe appending / logs</td>
              </tr>
              <tr>
                <td className="py-1.5 font-mono text-amber-300 font-bold">"r+"</td>
                <td className="text-emerald-400">Preserves data</td>
                <td className="text-rose-400 font-bold">Returns NULL!</td>
                <td>Beginning (Byte 0)</td>
                <td>Read and In-place Update</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: The FILE* Handle &amp; Mode Behaviors
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Files allow C programs to persist data permanently to secondary storage (SSD, HDD, NVMe). In C, interaction with a file begins by creating a stream bridge using <code>fopen()</code> and ends with releasing system file descriptors via <code>fclose()</code>.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-emerald-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-emerald-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore lab, Abhronila accidentally opened an existing student database file with <code>fopen("students.txt", "w")</code> to add a new record. To her horror, all 500 existing student records were instantly erased! Sukanta Hui explained that <code>"w"</code> mode unconditionally truncates existing files to 0 bytes upon opening; for logging or adding records, always use Append mode (<code>"a"</code>)!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: File Mode Decision Matrix
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Read Mode */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="250" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="20" y="30" fill="#a5b4fc" className="font-bold text-sm">"r" (READ MODE)</text>
              <text x="20" y="55" fill="#818cf8" className="text-xs">File must exist beforehand</text>
              <rect x="20" y="70" width="210" height="40" fill="#312e81" rx="4" />
              <text x="30" y="95" fill="#e0e7ff" className="font-mono text-xs font-bold">Missing File → Returns NULL</text>
              <text x="20" y="145" fill="#c7d2fe" className="text-xs">Cursor placed at start (offset 0). Read only.</text>
            </g>

            {/* Write Mode */}
            <g transform="translate(325, 50)">
              <rect x="0" y="0" width="250" height="180" rx="10" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
              <text x="20" y="30" fill="#fca5a5" className="font-bold text-sm">"w" (WRITE MODE)</text>
              <text x="20" y="55" fill="#f87171" className="text-xs">Creates or TRUNCATES</text>
              <rect x="20" y="70" width="210" height="40" fill="#7f1d1d" rx="4" />
              <text x="30" y="95" fill="#fee2e2" className="font-mono text-xs font-bold">Existing File → Truncated to 0!</text>
              <text x="20" y="145" fill="#fca5a5" className="text-xs">Erases old data. Creates file if missing.</text>
            </g>

            {/* Append Mode */}
            <g transform="translate(610, 50)">
              <rect x="0" y="0" width="250" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="20" y="30" fill="#6ee7b7" className="font-bold text-sm">"a" (APPEND MODE)</text>
              <text x="20" y="55" fill="#34d399" className="text-xs">Preserves existing records</text>
              <rect x="20" y="70" width="210" height="40" fill="#065f46" rx="4" />
              <text x="30" y="95" fill="#ecfdf5" className="font-mono text-xs font-bold">Writes forced to end of file</text>
              <text x="20" y="145" fill="#a7f3d0" className="text-xs">Safe for logging. Creates file if missing.</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Mode Summary &amp; Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">Mandatory NULL Check Idiom</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
{`FILE *fp = fopen("data.txt", "r");
if (fp == NULL) {
    perror("Error opening file");
    return 1; // Exit or handle gracefully!
}`}
            </pre>
            <p className="text-slate-300">
              Dereferencing a NULL <code>FILE*</code> causes an immediate segmentation fault (SIGSEGV) crash.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">Clean Deallocation &amp; Dangling Prevention</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-sky-300">
{`fclose(fp);
fp = NULL; // Prevent accidental reuse`}
            </pre>
            <p className="text-slate-300">
              Failing to close files leaks operating system file descriptor handles (limited to 1024 on most OSes).
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED MULTI-EXAMPLE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>💻</span> Example Section: File Opening &amp; Mode Demonstrations
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Explore 3 comprehensive C programs with step-by-step line explanations and terminal outputs.
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
            <h3 className="font-bold text-rose-300">Pitfall: Accidental Truncation with "w"</h3>
            <p className="text-slate-300">
              Opening an existing log or database file with <code>"w"</code> wipes it completely. If you only intend to append new entries, always open in <code>"a"</code> mode.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Always Set fp = NULL After fclose</h3>
            <p className="text-slate-300">
              Closing a stream does not clear the pointer variable. Setting <code>fp = NULL</code> ensures you cannot inadvertently attempt to perform operations on a closed descriptor.
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
          What happens when two different processes open the same file simultaneously in <code>"w"</code> mode? How do file locking mechanisms (like <code>flock()</code> or <code>LockFileEx()</code>) prevent race-condition data corruption in industrial servers?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 1 FAQs: File Pointers & Opening Modes" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 1 Note: File Pointers & Opening Modes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic1_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Never skip the NULL check after fopen()! In real-world software, missing files, permission errors, and full disks are everyday realities. Always check if (fp == NULL), log with perror(), and clean up gracefully. — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
