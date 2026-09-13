import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/StreamBufferingDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
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

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
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

      {/* 3. Semantic Visual Diagram Section */}
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

      {/* 4. Deep Technical Breakdown Section */}
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

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Stream Buffering Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>StreamBufferingDemo.c</code>) demonstrates file descriptors for standard streams, immediate unbuffered <code>stderr</code> output, explicit flushing with <code>fflush()</code>, and custom buffer configuration via <code>setvbuf()</code>.
        </p>

        <CFileLoader fileModule={cCode} title="StreamBufferingDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
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

      {/* 7. Thinking & Hints Section ("Think About This...") */}
      <section className="bg-slate-800/30 border border-slate-700/60 p-5 rounded-2xl space-y-2 text-xs md:text-sm">
        <h3 className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>🤔</span> Think About This...
        </h3>
        <p className="text-slate-300 leading-relaxed">
          If your program outputs to the screen (Line Buffered), why does redirecting its output to a disk file (<code>./app &gt; file.txt</code>) automatically convert the stream to Full Buffering (4KB)?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 0 FAQs: Standard Streams & Buffering" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
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

      {/* 10. Teacher's Note Section */}
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
