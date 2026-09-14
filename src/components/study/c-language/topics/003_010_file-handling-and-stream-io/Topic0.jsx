import React, { useState } from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode1 from "./topic0_files/StreamBufferingDemo.c?raw";
import cCode2 from "./topic0_files/CustomBufferDemo.c?raw";
import cCode3 from "./topic0_files/TerminalProgressDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      id: "ex1",
      title: "1. Standard Streams & fflush()",
      file: cCode1,
      filename: "StreamBufferingDemo.c",
      description:
        "Examines standard stream descriptors (stdin=0, stdout=1, stderr=2), demonstrates immediate unbuffered stderr output, and explains explicit flushing with fflush().",
      lineByLine: [
        {
          line: "fileno(stdin), fileno(stdout), fileno(stderr)",
          explanation:
            "Queries the low-level OS file descriptor numbers: 0 for keyboard input, 1 for screen output, and 2 for error alerts.",
        },
        {
          line: 'fprintf(stderr, "[stderr Immediate Notice]...")',
          explanation:
            "Writes directly to the standard error stream. Because stderr is unbuffered by default (_IONBF), text appears on screen immediately without waiting.",
        },
        {
          line: 'printf(". "); fflush(stdout);',
          explanation:
            "Prints a dot without a newline (\\n). Normally this would stay trapped in the RAM buffer, but fflush(stdout) forces the OS to paint it to the terminal instantly!",
        },
        {
          line: "setvbuf(stdout, custom_buffer, _IOFBF, 1024)",
          explanation:
            "Switches stdout from line-buffered to fully-buffered mode, using our custom 1024-byte RAM buffer before writing to the terminal.",
        },
        {
          line: "setvbuf(stdout, NULL, _IOLBF, 0)",
          explanation:
            "Restores the default line-buffering mode for stdout before exiting so terminal behavior returns to normal.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - STANDARD STREAMS & BUFFERING LAB   
========================================================

--- 1. STANDARD STREAM IDENTIFIERS ---
  Standard Input  (stdin)  : File Descriptor 0
  Standard Output (stdout) : File Descriptor 1
  Standard Error  (stderr) : File Descriptor 2 (Always Unbuffered)

  [stderr Immediate Notice] This message bypasses stdout buffer.
--- 2. STREAM FLUSHING WITH fflush() ---
  Simulating task progress: . . .  [DONE]

--- 3. CUSTOM BUFFERING CONFIGURATION WITH setvbuf() ---
  stdout switched to Full Buffering (_IOFBF) with 1024-byte custom buffer.

  Stream demonstration completed successfully.
========================================================`,
    },
    {
      id: "ex2",
      title: "2. Custom Buffer Tuning (setvbuf)",
      file: cCode2,
      filename: "CustomBufferDemo.c",
      description:
        "Demonstrates allocating a dedicated 512-byte user buffer with setvbuf(), switching between Full Buffering (_IOFBF) and Unbuffered (_IONBF) modes, and flushing pending data.",
      lineByLine: [
        {
          line: "char user_buffer[512];",
          explanation:
            "Allocates a 512-byte memory block in RAM that will temporarily hold file data before sending it to the physical storage disk.",
        },
        {
          line: "setvbuf(fp, user_buffer, _IOFBF, sizeof(user_buffer))",
          explanation:
            "Tells the C runtime to use our 512-byte array as a Full Buffer (_IOFBF). Writes will only touch disk when all 512 bytes are full or when flushed.",
        },
        {
          line: 'fprintf(fp, "[INFO] Server started...");',
          explanation:
            "Writes log strings into the RAM buffer. The physical hard drive is NOT touched yet, keeping CPU performance extremely high.",
        },
        {
          line: "fflush(fp)",
          explanation:
            "Forces all pending log lines sitting inside user_buffer to be committed immediately to the physical disk.",
        },
        {
          line: "setvbuf(fp, NULL, _IONBF, 0)",
          explanation:
            "Switches the stream to Unbuffered mode (_IONBF). Any subsequent fprintf calls write directly to disk with zero buffering lag.",
        },
      ],
      output: `========================================================
     CODER & ACCOTAX - CUSTOM BUFFER TUNING LAB         
========================================================

--- 1. ASSIGNING CUSTOM USER BUFFER (_IOFBF) ---
  [SUCCESS] Attached custom 512-byte buffer to stream.
  Wrote 3 log records (currently residing inside RAM buffer).
  [fflush] Flushed RAM buffer contents directly to disk.

--- 2. SWITCHING TO UNBUFFERED MODE (_IONBF) ---
  [UNBUFFERED] Message written immediately to physical file without caching.

--- 3. VERIFYING COMMITTED LOG FILE CONTENTS ---
    > [INFO] Server started at Barrackpore Lab.
    > [INFO] Student Swadeep connected.
    > [INFO] Student Tuhina connected.
    > [CRITICAL] Immediate emergency alert: Disk threshold reached!

  Cleaned up temporary log file 'custom_buffer_test.log'.
========================================================`,
    },
    {
      id: "ex3",
      title: "3. Real-Time CLI Progress (fflush)",
      file: cCode3,
      filename: "TerminalProgressDemo.c",
      description:
        "Illustrates why fflush(stdout) is essential when building real-time interactive CLI counters or progress bars that output without trailing newline (\\n) characters.",
      lineByLine: [
        {
          line: 'printf("\\r  [Progress: %3d%%] ...", percentage)',
          explanation:
            "Prints the carriage return character (\\r) which moves the cursor back to column 0 of the same line, allowing in-place animated updates.",
        },
        {
          line: "fflush(stdout)",
          explanation:
            "The magic call! Since there is no newline (\\n), stdout would normally freeze the output in RAM. fflush forces the updated progress bar to the monitor immediately.",
        },
        {
          line: "SLEEP_MS(50)",
          explanation:
            "Pauses for 50 milliseconds so human eyes can watch the smooth progression from 0% to 100%.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - REAL-TIME TERMINAL FLUSH LAB       
========================================================

--- 1. SIMULATING INDUSTRIAL FILE BACKUP ---
  Target: /data/students_barrackpore_backup.db
  [Progress: 100%] [##########] (10/10 blocks)

--- 2. STREAM FLUSHING CONCLUSION ---
  [SUCCESS] Backup completed. All stream buffers safely written.
  Tip: Always call fflush(stdout) when designing interactive CLI prompts!
========================================================`,
    },
  ];

  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 0
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Stream Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Standard I/O Streams &amp; Stream Buffering Mechanics
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Understand the logical stream abstraction in C: <code>stdin</code>, <code>stdout</code>, and <code>stderr</code>. Master the three buffering modes (Full, Line, and Unbuffered), stream flushing with <code>fflush()</code>, and custom buffer tuning with <code>setvbuf()</code>.
        </p>
      </header>

      {/* 2. DEDICATED SIMPLE EXPLANATION SECTION */}
      <section className="space-y-5 bg-gradient-to-br from-indigo-950/40 via-slate-800/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">💡</span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              In Very Simple Terms: How Streams and Buffers Work
            </h2>
            <p className="text-indigo-300 text-xs md:text-sm font-medium">
              The real-world analogy to understand C I/O in 2 minutes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Analogy Card 1 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <span>📬</span> The Postal Courier (Why Buffering?)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Writing to a physical hard drive is like sending a postal courier across town. If you called the courier for <em>every single letter</em> you typed, your system would crawl to a halt. Instead, C collects characters in a small memory box (a <strong>Buffer</strong>) and sends the entire box in one fast trip!
            </p>
          </div>

          {/* Analogy Card 2 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-sky-400 font-bold text-sm flex items-center gap-1.5">
              <span>🚪</span> The Three Standard Doors
            </div>
            <ul className="text-slate-300 text-xs space-y-1 leading-relaxed">
              <li><strong className="text-sky-300">stdin:</strong> The front door where keystrokes arrive from the keyboard.</li>
              <li><strong className="text-emerald-300">stdout:</strong> The normal display window that shows regular output.</li>
              <li><strong className="text-rose-300">stderr:</strong> The emergency red alarm that bypasses all waiting queues immediately!</li>
            </ul>
          </div>

          {/* Analogy Card 3 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span>⚡</span> The Flushing Switch (fflush)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Normally, <code>stdout</code> waits for you to press Enter (<code>\n</code>) before it appears on screen. If you are printing a loading bar without <code>\n</code>, call <code>fflush(stdout)</code> to say: <em>"Don't wait! Push whatever is in the box to the screen right now!"</em>
            </p>
          </div>
        </div>

        {/* Quick Rule Card */}
        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-3.5 text-xs text-indigo-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <span>
            📌 <strong>Golden Rule:</strong> Error messages belong in <code>stderr</code> (instant &amp; crash-proof). Regular output belongs in <code>stdout</code>. Never call <code>fflush(stdin)</code> because standard C does not support flushing input!
          </span>
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Stream Buffering &amp; Operating System Interfaces
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Direct physical disk and terminal I/O are among the slowest operations a computer performs. To prevent programs from spending millions of CPU cycles waiting for hardware devices, the C runtime introduces user-space <strong>Stream Buffers</strong> that batch multiple individual byte writes into bulk operating system transfers.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-indigo-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-indigo-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore computer lab, Swadeep created a terminal progress counter using <code>printf("Loading: %d%%", pct);</code>. He was puzzled why nothing appeared on the terminal until the loop finished 100%. Sukanta Hui explained that <code>stdout</code> is Line-Buffered; without a newline (<code>\n</code>), the output remains trapped in the RAM buffer. Sukanta added <code>fflush(stdout);</code>, and the progress counter updated smoothly on the terminal in real time!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Stream Buffering Pipeline
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Application Layer */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="220" height="180" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="15" y="30" fill="#a5b4fc" className="font-bold text-xs">C APPLICATION CODE</text>
              
              <rect x="15" y="45" width="190" height="30" fill="#312e81" rx="4" />
              <text x="25" y="65" fill="#e0e7ff" className="font-mono text-xs">printf("Text...");</text>
              
              <rect x="15" y="85" width="190" height="30" fill="#312e81" rx="4" />
              <text x="25" y="105" fill="#e0e7ff" className="font-mono text-xs">fprintf(stderr, "Err");</text>
              
              <rect x="15" y="125" width="190" height="30" fill="#312e81" rx="4" />
              <text x="25" y="145" fill="#e0e7ff" className="font-mono text-xs">fputs(str, fp);</text>
            </g>

            {/* Arrow */}
            <text x="280" y="145" fill="#64748b" className="font-bold text-xl">→</text>

            {/* Stream Buffer Layer */}
            <g transform="translate(320, 50)">
              <rect x="0" y="0" width="270" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="15" y="30" fill="#6ee7b7" className="font-bold text-xs">C RUNTIME STREAM BUFFERS</text>
              
              <rect x="15" y="45" width="240" height="35" fill="#065f46" rx="4" />
              <text x="25" y="68" fill="#d1fae5" className="font-mono text-xs">_IOLBF: Flushes on '\n' / fflush</text>
              
              <rect x="15" y="90" width="240" height="35" fill="#065f46" rx="4" />
              <text x="25" y="113" fill="#d1fae5" className="font-mono text-xs">_IOFBF: Flushes when 4KB full</text>
              
              <rect x="15" y="135" width="240" height="35" fill="#7f1d1d" rx="4" />
              <text x="25" y="158" fill="#fee2e2" className="font-mono text-xs">_IONBF: stderr (Unbuffered!)</text>
            </g>

            {/* Arrow */}
            <text x="610" y="145" fill="#64748b" className="font-bold text-xl">→</text>

            {/* OS Hardware Layer */}
            <g transform="translate(650, 50)">
              <rect x="0" y="0" width="210" height="180" rx="10" fill="#3b0764" stroke="#d946ef" strokeWidth="1.5" />
              <text x="15" y="30" fill="#f5d0fe" className="font-bold text-xs">OS &amp; HARDWARE DEVICE</text>
              
              <rect x="15" y="45" width="180" height="35" fill="#581c87" rx="4" />
              <text x="25" y="68" fill="#fae8ff" className="font-mono text-xs">write(1, buf, len)</text>
              
              <rect x="15" y="90" width="180" height="35" fill="#581c87" rx="4" />
              <text x="25" y="113" fill="#fae8ff" className="font-mono text-xs">Physical Disk Drive</text>
              
              <rect x="15" y="135" width="180" height="35" fill="#581c87" rx="4" />
              <text x="25" y="158" fill="#fae8ff" className="font-mono text-xs">Terminal Monitor</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: The Three Stream Modes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">1. Full Buffering (_IOFBF)</h3>
            <p className="text-slate-300">
              Data is written to disk only when the internal 4KB/8KB buffer is completely full. Default for all disk file streams.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">2. Line Buffering (_IOLBF)</h3>
            <p className="text-slate-300">
              Data is flushed to the screen whenever a newline (<code>\n</code>) is encountered or <code>fflush()</code> is invoked. Default for <code>stdout</code>.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-rose-300 text-sm">3. Unbuffered (_IONBF)</h3>
            <p className="text-slate-300">
              Every single byte is immediately pushed directly to the OS without delay. Default for <code>stderr</code> so crash notices are never lost.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED MULTI-EXAMPLE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>💻</span> Example Section: Stream Buffering Demonstrations
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Explore 3 hands-on practical C programs with step-by-step line explanations and terminal output.
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

          {/* Code Viewer */}
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

          {/* Console Output */}
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
            <h3 className="font-bold text-rose-300">Pitfall: fflush(stdin) Undefined Behavior</h3>
            <p className="text-slate-300">
              Never use <code>fflush(stdin);</code> to discard trailing input. The C standard defines <code>fflush</code> strictly for output streams. Use a <code>getchar()</code> loop instead!
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Flush Interactive Prompts</h3>
            <p className="text-slate-300">
              When prompting users without a newline (e.g. <code>printf("Enter PIN: ");</code>), always call <code>fflush(stdout);</code> to guarantee immediate display across all terminal environments.
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
          If your program outputs to the screen (Line Buffered), why does redirecting its output to a disk file (<code>./app &gt; file.txt</code>) automatically convert the stream to Full Buffering (4KB)?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 0 FAQs: Standard Streams & Buffering" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 0 Note: Standard Streams & Buffering"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic0_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Always understand where your bytes are waiting! Stderr is immediate, stdout waits for newlines, and disk files wait for full 4KB buffer blocks. When in doubt on interactive CLIs, invoke fflush(stdout)! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
