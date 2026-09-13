import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/TextFileOperationsDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 2
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Text Stream I/O
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Text File Stream Operations: Character, Line &amp; Formatted I/O
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master reading and writing human-readable text files in C: Character-level I/O with <code>fgetc()</code> / <code>fputc()</code>, safe line-by-line reading with <code>fgets()</code> / <code>fputs()</code>, and structured parsing with <code>fprintf()</code> / <code>fscanf()</code>.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Text Stream Processing Mechanics
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Text files store information encoded as sequences of ASCII or UTF-8 characters organized into lines separated by newline terminators. Understanding how to parse, validate, and format text streams safely without buffer overflows is essential for building log analyzers, configuration parsers, and data ingestion pipelines.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-emerald-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-emerald-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore lab, Tuhina and Debangshu used <code>fscanf(fp, "%s", name)</code> to read student records. When a student name with spaces (like <em>"Debangshu Roy"</em>) was encountered, <code>fscanf</code> split the name into two fields and corrupted all subsequent numerical grades. Sukanta Hui demonstrated how to use <code>fgets()</code> to read full lines safely and then parse with <code>sscanf()</code> or bounded width specifiers, creating rock-solid file parsers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Text Stream I/O Hierarchy
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Level 1: Character I/O */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="250" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="20" y="30" fill="#a5b4fc" className="font-bold text-sm">1. CHARACTER LEVEL</text>
              <rect x="20" y="45" width="210" height="30" fill="#312e81" rx="4" />
              <text x="30" y="65" fill="#e0e7ff" className="font-mono text-xs">int fgetc(fp); (returns int!)</text>
              <rect x="20" y="85" width="210" height="30" fill="#312e81" rx="4" />
              <text x="30" y="105" fill="#e0e7ff" className="font-mono text-xs">int fputc(c, fp);</text>
              <text x="20" y="145" fill="#c7d2fe" className="text-xs">Reads/writes 1 byte at a time until EOF (-1).</text>
            </g>

            {/* Level 2: Line Level */}
            <g transform="translate(325, 50)">
              <rect x="0" y="0" width="250" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="20" y="30" fill="#6ee7b7" className="font-bold text-sm">2. LINE LEVEL (SAFE)</text>
              <rect x="20" y="45" width="210" height="30" fill="#065f46" rx="4" />
              <text x="30" y="65" fill="#ecfdf5" className="font-mono text-xs">fgets(buf, max_len, fp);</text>
              <rect x="20" y="85" width="210" height="30" fill="#065f46" rx="4" />
              <text x="30" y="105" fill="#ecfdf5" className="font-mono text-xs">fputs(str, fp);</text>
              <text x="20" y="145" fill="#a7f3d0" className="text-xs">Bounded line reading. Retains '\n' and appends '\0'.</text>
            </g>

            {/* Level 3: Formatted Level */}
            <g transform="translate(610, 50)">
              <rect x="0" y="0" width="250" height="180" rx="10" fill="#3b0764" stroke="#d946ef" strokeWidth="1.5" />
              <text x="20" y="30" fill="#f5d0fe" className="font-bold text-sm">3. FORMATTED LEVEL</text>
              <rect x="20" y="45" width="210" height="30" fill="#581c87" rx="4" />
              <text x="30" y="65" fill="#fae8ff" className="font-mono text-xs">fprintf(fp, "%d %s", ...);</text>
              <rect x="20" y="85" width="210" height="30" fill="#581c87" rx="4" />
              <text x="30" y="105" fill="#fae8ff" className="font-mono text-xs">fscanf(fp, "%d %49s", ...);</text>
              <text x="20" y="145" fill="#f5d0fe" className="text-xs">Parses structured tokens with width safety (%49s).</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: fgets() vs gets() Safety
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-rose-300 text-sm">Dangerous Legacy gets() (Removed in C11)</h3>
            <p className="text-slate-300">
              <code>gets()</code> had no maximum length parameter. Reading 100 characters into a 50-byte array corrupted adjacent stack memory, leading to major buffer overflow exploits.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">Secure Industrial Standard: fgets()</h3>
            <pre className="bg-slate-950 p-2.5 rounded font-mono text-emerald-300">
{`char buf[256];
if (fgets(buf, sizeof(buf), fp) != NULL) {
    buf[strcspn(buf, "\\r\\n")] = '\\0'; // Clean newline
}`}</pre>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Text Stream Operations Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>TextFileOperationsDemo.c</code>) writes formatted records with <code>fprintf()</code>, reads line-by-line with <code>fgets()</code>, and parses structured fields with <code>fscanf()</code>.
        </p>

        <CFileLoader fileModule={cCode} title="TextFileOperationsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
   CODER & ACCOTAX - TEXT STREAM I/O OPERATIONS LAB     
========================================================

--- 1. WRITING STRUCTURED TEXT (fprintf) ---
  Formatted text successfully written to 'text_records.txt'.

--- 2. SAFE LINE-BY-LINE READING (fgets) ---
  [Line 1]: 101 Swadeep 94.50
  [Line 2]: 102 Tuhina 98.00
  [Line 3]: 103 Abhronila 96.50
  [Line 4]: --- End of Student Marks ---
  [Line 5]: #

--- 3. PARSING STRUCTURED DATA (fscanf) ---
  Parsed Record -> ID: 101 | Name: Swadeep    | Score: 94.50
  Parsed Record -> ID: 102 | Name: Tuhina     | Score: 98.00
  Parsed Record -> ID: 103 | Name: Abhronila  | Score: 96.50

  Text file operations completed successfully.
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
            <h3 className="font-bold text-rose-300">Pitfall: fgetc() Returning to char</h3>
            <p className="text-slate-300">
              Storing the return value of <code>fgetc()</code> in a <code>char</code> variable causes infinite loops or early truncation because <code>EOF (-1)</code> and character byte <code>0xFF (255)</code> cannot be differentiated. Always store in an <code>int</code>!
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Validate fscanf Match Count</h3>
            <p className="text-slate-300">
              Always check <code>if (fscanf(fp, "%d %s", &amp;id, name) == 2)</code> to ensure both variables were populated before using them.
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
          Why does <code>fgetc()</code> advance the file position indicator automatically, and how can you peek at the next character without consuming it using <code>ungetc()</code>?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 2 FAQs: Text File Operations" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 2 Note: Text File Operations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "When parsing text files, prefer fgets() with sizeof(buf) over raw scanf(). It guarantees memory safety and lets you cleanly clean trailing newlines! Always store fgetc return values in an int! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
