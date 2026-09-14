import React, { useState } from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode1 from "./topic2_files/TextFileOperationsDemo.c?raw";
import cCode2 from "./topic2_files/CharLineStreamsDemo.c?raw";
import cCode3 from "./topic2_files/WordCountAnalyzerDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      id: "ex1",
      title: "1. Formatted I/O (fprintf / fscanf)",
      file: cCode1,
      filename: "TextFileOperationsDemo.c",
      description:
        "Generates structured tabular student grade reports using fprintf() and parses them back safely using formatted fscanf() token specifiers.",
      lineByLine: [
        {
          line: 'fprintf(fp, "%d %s %.2f %c\\n", id, name, score, grade);',
          explanation:
            "Writes formatted values into the text file separated by spaces, rounding scores to 2 decimal places.",
        },
        {
          line: 'while (fscanf(fp, "%d %49s %f %c", &id, name, &score, &grade) == 4)',
          explanation:
            "Golden pattern! Checks that fscanf successfully parsed exactly 4 items. The %49s prevents string buffer overflows.",
        },
        {
          line: "total_score += score; count++;",
          explanation:
            "Accumulates numerical grades to calculate average student performance across the entire class.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - TEXT FILE I/O OPERATIONS LAB       
========================================================

--- 1. WRITING STRUCTURED DATA WITH fprintf() ---
  Created 'student_grades.txt' and formatted 3 student records.

--- 2. READING & PARSING STRUCTURED DATA WITH fscanf() ---
  Parsed Student Records:
    [ID: 101] Swadeep     | Score:  88.50 | Grade: A
    [ID: 102] Tuhina      | Score:  94.00 | Grade: A
    [ID: 103] Debangshu   | Score:  76.25 | Grade: B

  Average Class Score: 86.25

  Cleaned up 'student_grades.txt'.
========================================================`,
    },
    {
      id: "ex2",
      title: "2. Char & Line Streams (fgetc / fgets)",
      file: cCode2,
      filename: "CharLineStreamsDemo.c",
      description:
        "Demonstrates single-character stream transformation using int-safe fgetc()/fputc() and bounded safe line reading using fgets().",
      lineByLine: [
        {
          line: 'fputs("Hello Coder & AccoTax...\\n", fp_out);',
          explanation:
            "Writes a complete string line to the output stream without adding any extra characters.",
        },
        {
          line: "int ch; while ((ch = fgetc(fp_in)) != EOF)",
          explanation:
            "Reads one character at a time. The variable 'ch' MUST be an int so it can store EOF (-1) without overflow.",
        },
        {
          line: "fputc(toupper(ch), fp_out);",
          explanation:
            "Converts each character to uppercase in memory and writes it out to the destination file stream.",
        },
        {
          line: "while (fgets(line_buffer, sizeof(line_buffer), fp_in) != NULL)",
          explanation:
            "Reads an entire line into memory. Guarantees buffer safety by limiting input to sizeof(line_buffer) bytes.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - CHARACTER & LINE STREAM I/O LAB    
========================================================

--- 1. CREATING SOURCE FILE USING fputs() ---
  Wrote 3 lines to 'source_text.txt'.

--- 2. CHARACTER-BY-CHARACTER COPY & UPPERCASE CONVERSION ---
  Converted and copied 119 characters to 'uppercase_copy.txt'.

--- 3. READING LINES SAFELY WITH fgets() ---
  [Line 1] HELLO CODER & ACCOTAX STUDENTS!
  [Line 2] LEARNING C PROGRAMMING IN BARRACKPORE.
  [Line 3] MASTERING SYSTEMS PROGRAMMING AND STREAM I/O.

  Cleaned up temporary demonstration files.
========================================================`,
    },
    {
      id: "ex3",
      title: "3. CLI Text & Word Analyzer",
      file: cCode3,
      filename: "WordCountAnalyzerDemo.c",
      description:
        "A complete industrial CLI file analytics engine that inspects a text file stream to calculate total line counts, word counts, alphabets, and digits.",
      lineByLine: [
        {
          line: "stats->characters++;",
          explanation:
            "Increments total character count for every byte read from the file stream.",
        },
        {
          line: "if (ch == '\\n') stats->lines++;",
          explanation:
            "Detects newline characters to track the total number of lines in the document.",
        },
        {
          line: "if (isspace(ch)) in_word = false; else if (!in_word) ...",
          explanation:
            "State machine tracking transitions from whitespace to letters to calculate total word count accurately.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - CLI TEXT FILE ANALYZER LAB         
========================================================

--- FILE ANALYSIS REPORT: 'sample_document.txt' ---
  Total Lines       : 4
  Total Words       : 31
  Total Characters  : 265 bytes
  Alphabet Letters  : 209
  Numeric Digits    : 9
--------------------------------------------------------
  Cleaned up temporary document 'sample_document.txt'.
========================================================`,
    },
  ];

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

      {/* 2. DEDICATED SIMPLE EXPLANATION SECTION */}
      <section className="space-y-5 bg-gradient-to-br from-indigo-950/40 via-slate-800/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">💡</span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              In Very Simple Terms: The 3 Ways to Read &amp; Write Text
            </h2>
            <p className="text-indigo-300 text-xs md:text-sm font-medium">
              Magnifying glass, Soup bowl, or Structured Form
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-sky-400 font-bold text-sm flex items-center gap-1.5">
              <span>🔍</span> 1. Character by Character
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Functions: <code>fgetc()</code> &amp; <code>fputc()</code>. Like reading a book with a magnifying glass one alphabet at a time. Returns an <code>int</code> so it can signal <code>EOF (-1)</code> when the file ends.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span>🥣</span> 2. Line by Line (Safe Bowl)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Functions: <code>fgets()</code> &amp; <code>fputs()</code>. Reads an entire sentence until <code>\n</code>. You specify your bowl size (e.g., 128 bytes), so it <strong>never overflows</strong> your memory!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-purple-400 font-bold text-sm flex items-center gap-1.5">
              <span>📋</span> 3. Formatted Tables
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Functions: <code>fprintf()</code> &amp; <code>fscanf()</code>. Like filling in or reading an official report card: ID numbers, names, and decimal averages separated by spaces or commas.
            </p>
          </div>
        </div>

        {/* Tip Box */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200">
          ⚠️ <strong>Why is `fgetc` return type `int` instead of `char`?</strong> Because <code>EOF</code> is defined as <code>-1</code>. An 8-bit unsigned char cannot distinguish between the byte <code>0xFF (255)</code> and the end-of-file sentinel <code>-1</code>!
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section */}
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

      {/* 4. Semantic Visual Diagram Section */}
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

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: fgets() vs gets() Safety
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">Why fgets() is 100% Safe</h3>
            <p className="text-slate-300">
              <code>fgets(buffer, sizeof(buffer), fp)</code> takes the maximum destination buffer size as a strict argument. It will never write beyond <code>sizeof(buffer) - 1</code> bytes, automatically appending the null terminator (<code>\0</code>).
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-rose-300 text-sm">Why gets() is Banned in Modern C</h3>
            <p className="text-slate-300">
              The legacy function <code>gets()</code> had no length limit, allowing attackers to overwrite return addresses on the stack. It was completely removed from the ISO C11 standard.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED MULTI-EXAMPLE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>💻</span> Example Section: Text Stream I/O Demonstrations
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
            <h3 className="font-bold text-rose-300">Pitfall: Unbounded %s in fscanf</h3>
            <p className="text-slate-300">
              Never use <code>fscanf(fp, "%s", buf)</code> without a width limit. Always use <code>fscanf(fp, "%49s", buf)</code> to prevent buffer overflows.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Stripping Trailing Newlines</h3>
            <p className="text-slate-300">
              <code>fgets()</code> keeps the trailing <code>\n</code> in the buffer. Strip it using: <code>buf[strcspn(buf, "\n")] = '\0';</code>.
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
          Why does text mode convert line endings between Windows (<code>\r\n</code>, CRLF) and Linux (<code>\n</code>, LF) automatically, and why does this subtle conversion corrupt binary files if opened without the <code>"b"</code> mode flag?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 2 FAQs: Text Stream I/O Operations" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 2 Note: Text Stream I/O Operations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic2_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "When parsing real-world text feeds or CSV files, read entire lines with fgets() first, and then parse each token with sscanf() or strtok(). This prevents half-read corrupted states if a single field is malformed! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
