import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/FileModesBasicsDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
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

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
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

      {/* 3. Semantic Visual Diagram Section */}
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

      {/* 4. Deep Technical Breakdown Section */}
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
    perror("Error opening data.txt");
    return 1;
}
// Safe to read...
fclose(fp);
fp = NULL;`}</pre>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">Binary Mode ('b') Cross-Platform Rule</h3>
            <p className="text-slate-300 leading-relaxed">
              On Windows platforms, text streams translate <code>\n</code> to <code>\r\n</code>. Always specify <code>"rb"</code>, <code>"wb"</code>, or <code>"ab"</code> when reading/writing binary data, images, or raw structs to guarantee exact byte preservation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: File Modes Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>FileModesBasicsDemo.c</code>) demonstrates creating a file with <code>"w"</code>, adding data with <code>"a"</code>, reading contents back with <code>"r"</code>, and clean stream closing.
        </p>

        <CFileLoader fileModule={cCode} title="FileModesBasicsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
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
            <h3 className="font-bold text-rose-300">Pitfall: Unintended Truncation with "w"</h3>
            <p className="text-slate-300">
              Opening an existing file in <code>"w"</code> mode wipes its contents immediately. Use <code>"a"</code> or <code>"r+"</code> if existing records must be preserved.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Always Set fp = NULL After fclose()</h3>
            <p className="text-slate-300">
              After calling <code>fclose(fp);</code>, immediately set <code>fp = NULL;</code> to eliminate dangling file handle bugs.
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
          What is the key difference between <code>"r+"</code> (read/update) and <code>"w+"</code> (write/update) if the target file already exists on your hard drive?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 1 FAQs: File Modes & fopen" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 1 Note: File Modes & fopen"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Always treat file handling with extreme care: 'w' mode deletes existing data immediately upon opening! Validate every fopen() with a NULL check, use 'a' for logs, and close every file handle with fclose()! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
