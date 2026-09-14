import React, { useState } from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode1 from "./topic5_files/FileErrorHandlingDemo.c?raw";
import cCode2 from "./topic5_files/SafeEofLoopDemo.c?raw";
import cCode3 from "./topic5_files/TemporaryFileSandboxDemo.c?raw";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      id: "ex1",
      title: "1. Error Diagnostics (perror & errno)",
      file: cCode1,
      filename: "FileErrorHandlingDemo.c",
      description:
        "Comprehensive diagnostic test suite for file streams: testing errno, printing human OS error descriptions with perror(), and recovering with clearerr().",
      lineByLine: [
        {
          line: 'perror("Open missing file");',
          explanation:
            "Fetches the system error code from errno and prints a user-friendly error string to stderr.",
        },
        {
          line: "strerror(errno)",
          explanation:
            "Returns a pointer to the textual description of the system error corresponding to integer errno.",
        },
        {
          line: "if (ferror(read_only_fp))",
          explanation:
            "Inspects the internal stream flags to detect whether an illegal operation (like writing to a read-only file) failed.",
        },
        {
          line: "clearerr(read_only_fp);",
          explanation:
            "Resets both error and EOF sticky flags back to 0 so the stream handle can be reused cleanly.",
        },
      ],
      output: `========================================================
   CODER & ACCOTAX - STREAM ERROR HANDLING & DIAGNOSTICS
========================================================

--- TEST 1: OPENING NON-EXISTENT FILE ---
  [EXPECTED ERROR TRAPPED]
  [perror output] Open missing file: No such file or directory
  [strerror description] System error message: No such file or directory
  errno code = 2

--- TEST 2: WRITE ATTEMPT ON READ-ONLY STREAM ---
  Created sample file 'readonly_sample.txt'.
  Opened 'readonly_sample.txt' in Read-Only ("r") mode.
  Attempting illegal write to read-only stream...
  [ferror DETECTED] Write operation failed on stream!
  [perror output] Illegal stream write: Bad file descriptor
  Error flag reset with clearerr(). ferror status = 0

--- TEST 3: PROPER EOF DETECTION VS ERROR ---
  Reading stream: Line 1: Systems programming in Barrackpore.
  Reading stream: Line 2: Diagnostic error handling lab.
  [EOF CONFIRMED] Stream reached End-Of-File (feof = 1, ferror = 0).

  Cleaned up temporary test files.
========================================================`,
    },
    {
      id: "ex2",
      title: "2. The feof() One-Off Bug Trap",
      file: cCode2,
      filename: "SafeEofLoopDemo.c",
      description:
        "Side-by-side contrast of the notorious while(!feof) loop bug (which reads past EOF) vs the clean, industry-standard read-driven loop condition.",
      lineByLine: [
        {
          line: "while (!feof(fp)) { ... }",
          explanation:
            "The classic bug! feof() only becomes true AFTER an attempted read fails, so the loop processes stale data on the final iteration.",
        },
        {
          line: "while (fgets(buffer, sizeof(buffer), fp) != NULL)",
          explanation:
            "The safe pattern! The read attempt is tested BEFORE executing the loop body, guaranteeing zero duplicate reads.",
        },
        {
          line: "if (feof(fp)) ... else if (ferror(fp)) ...",
          explanation:
            "Diagnostic check after loop termination to determine if the loop ended due to natural EOF or a disk hardware failure.",
        },
      ],
      output: `========================================================
     CODER & ACCOTAX - THE FEOF() ONE-OFF TRAP LAB      
========================================================

--- 1. THE BUGGY PATTERN (while (!feof(fp))) ---
  [Loop 1] Read: Line 1: Swadeep
  [Loop 2] Read: Line 2: Tuhina
  [Loop 3] Read: Line 2: Tuhina
  [NOTICE] Notice how the last line was printed TWICE or with stale data!

--- 2. THE CORRECT INDUSTRIAL PATTERN (while (fgets(...) != NULL)) ---
  [Loop 1] Read: Line 1: Swadeep
  [Loop 2] Read: Line 2: Tuhina
  [CONFIRMED] Loop terminated cleanly at true End-of-File (EOF).

  Cleaned up temporary test file 'eof_trap_demo.txt'.
========================================================`,
    },
    {
      id: "ex3",
      title: "3. Temporary File Sandboxing (tmpfile)",
      file: cCode3,
      filename: "TemporaryFileSandboxDemo.c",
      description:
        "Creates an anonymous self-deleting scratch buffer with tmpfile(), performs intermediate computations, and traps invalid read-only stream operations.",
      lineByLine: [
        {
          line: "FILE *tmp_fp = tmpfile();",
          explanation:
            "Creates an anonymous temporary binary stream in 'wb+' mode that automatically disappears from disk when closed.",
        },
        {
          line: "rewind(tmp_fp);",
          explanation:
            "Snaps the scratch file cursor back to the start so we can read and verify calculated values.",
        },
        {
          line: "fclose(tmp_fp);",
          explanation:
            "Closes the stream and triggers the OS kernel to instantly purge the anonymous file from storage.",
        },
      ],
      output: `========================================================
  CODER & ACCOTAX - TMPFILE SANDBOX & DIAGNOSTICS LAB   
========================================================

--- 1. CREATING ANONYMOUS SECURE TEMPORARY STREAM ---
  [SUCCESS] Anonymous temporary stream created in RAM/Disk sandbox.

--- 2. READING SCRATCH DATA FROM TEMPORARY STREAM ---
    > SCRATCH_INDEX_001: 100
    > SCRATCH_INDEX_002: 200
    > SCRATCH_INDEX_003: 300
    > SCRATCH_INDEX_004: 400
    > SCRATCH_INDEX_005: 500

--- 3. TESTING ERROR DETECTION & clearerr() ---
  [ferror DETECTED] Illegal write operation on read-only stream!
  [perror Message]: Bad file descriptor
  [clearerr] Error flag reset. ferror() status = 0

  Temporary sandbox closed and automatically purged from disk.
========================================================`,
    },
  ];

  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 5
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Diagnostics &amp; Reliability
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Stream Diagnostics &amp; Error Handling (feof, ferror &amp; perror)
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Avoid the infamous <code>while(!feof)</code> one-off bug, diagnose I/O failures with <code>ferror()</code>, query system error messages with <code>perror()</code> and <code>strerror(errno)</code>, and reset stream flags with <code>clearerr()</code>.
        </p>
      </header>

      {/* 2. DEDICATED SIMPLE EXPLANATION SECTION */}
      <section className="space-y-5 bg-gradient-to-br from-rose-950/40 via-slate-800/40 to-slate-900 border border-rose-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-rose-500/20 rounded-xl border border-rose-500/30">💡</span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              In Very Simple Terms: Why while(!feof) is a Trap
            </h2>
            <p className="text-rose-300 text-xs md:text-sm font-medium">
              The "Bumping into the Wall" analogy
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
              <span>🧱</span> Bumping into the Wall
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              <code>feof()</code> does NOT predict the future! It only returns true <em>after</em> you try to read past the end of the file and fail. If you loop on <code>!feof(fp)</code>, your program will always process the last line <strong>twice</strong>!
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span>🛡️</span> Test the Read Directly
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Always put the read function in the loop condition: <code>while (fgets(...) != NULL)</code> or <code>while (fread(...) == 1)</code>. The moment nothing is read, the loop stops immediately!
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
            <div className="text-sky-400 font-bold text-sm flex items-center gap-1.5">
              <span>🗣️</span> Human Error Messages (perror)
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              When an I/O function returns an error, the operating system sets a hidden number called <code>errno</code>. Calling <code>perror("My App")</code> prints the plain English reason (e.g., <em>"Permission denied"</em> or <em>"No space left on device"</em>).
            </p>
          </div>
        </div>

        {/* Diagnostic Checklist */}
        <div className="bg-rose-900/20 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-200">
          🎯 <strong>Diagnostic Golden Rule:</strong> After a loop terminates, check:
          <span className="font-mono text-emerald-300 ml-1">if (feof(fp))</span> → Normal end of file reached. |
          <span className="font-mono text-rose-300 ml-1">else if (ferror(fp))</span> → Hardware/network stream fault occurred!
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Error Diagnostics &amp; Stream Flag Lifecycle
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Operating systems can fail file operations for numerous reasons: disk space exhaustion, network drive disconnects, bad sectors, permission denials, or deleted file handles. Robust C applications maintain zero tolerance for unhandled I/O failures.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-rose-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-rose-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore lab, Debangshu's file reader printed the last student record twice in the summary report. Swadeep suspected a compiler glitch. Sukanta Hui demonstrated how <code>while(!feof(fp))</code> executes the loop body before knowing the next read will fail. Sukanta showed them how rewriting the loop to <code>while(fread(&amp;rec, sizeof(rec), 1, fp) == 1)</code> completely eliminated the ghost record!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: Stream Error Diagnostic Flowchart
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 280" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="240" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Read Step */}
            <g transform="translate(40, 90)">
              <rect x="0" y="0" width="200" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="20" y="30" fill="#a5b4fc" className="font-bold text-xs">Execute Stream Read</text>
              <text x="20" y="52" fill="#e0e7ff" className="font-mono text-xs">n = fread(..., fp);</text>
            </g>

            {/* Decision Arrow */}
            <path d="M 240 125 L 300 125" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Decision Diamond */}
            <g transform="translate(300, 75)">
              <polygon points="70,0 140,50 70,100 0,50" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
              <text x="70" y="55" textAnchor="middle" fill="#e0e7ff" className="font-bold text-xs">n &lt; count?</text>
            </g>

            {/* Success Branch */}
            <g transform="translate(480, 45)">
              <rect x="0" y="0" width="180" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="20" y="22" fill="#6ee7b7" className="font-bold text-xs">NO: Successful Read</text>
              <text x="20" y="40" fill="#ecfdf5" className="text-xs">Process Record Buffer</text>
            </g>

            {/* Error / EOF Branch */}
            <g transform="translate(480, 135)">
              <rect x="0" y="0" width="370" height="90" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
              <text x="20" y="25" fill="#fca5a5" className="font-bold text-xs">YES: Read Incomplete or Stopped</text>
              
              <rect x="15" y="35" width="160" height="40" fill="#7f1d1d" rx="4" />
              <text x="25" y="52" fill="#fee2e2" className="font-mono text-xs">if (feof(fp))</text>
              <text x="25" y="68" fill="#fca5a5" className="text-xs">True End of File</text>

              <rect x="190" y="35" width="165" height="40" fill="#7f1d1d" rx="4" />
              <text x="200" y="52" fill="#fee2e2" className="font-mono text-xs">else if (ferror(fp))</text>
              <text x="200" y="68" fill="#fca5a5" className="text-xs">Call perror("I/O Error")</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Diagnostic API Matrix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sky-300 text-sm">feof(fp)</h3>
            <p className="text-slate-300">
              Returns non-zero if the end-of-file indicator has been tripped by an attempted read past EOF.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-rose-300 text-sm">ferror(fp)</h3>
            <p className="text-slate-300">
              Returns non-zero if a hardware, permission, or media error occurred on the stream.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-amber-300 text-sm">clearerr(fp)</h3>
            <p className="text-slate-300">
              Resets both the EOF and error indicators back to 0, allowing further read/write attempts.
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-1.5">
            <h3 className="font-bold text-emerald-300 text-sm">perror(msg)</h3>
            <p className="text-slate-300">
              Prints your prefix string followed by the system error description matching current <code>errno</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DEDICATED MULTI-EXAMPLE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>💻</span> Example Section: Error Diagnostics &amp; Recovery
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
            <h3 className="font-bold text-rose-300">Pitfall: Testing feof() in While Loop Condition</h3>
            <p className="text-slate-300">
              Never write <code>while (!feof(fp))</code>. The EOF indicator is only set <em>after</em> an attempted read past the end has already failed.
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Inspect errno Immediately</h3>
            <p className="text-slate-300">
              Check <code>errno</code> immediately after a failed call. Subsequent library calls (like <code>printf</code>) can overwrite <code>errno</code> with their own status codes.
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
          Why does <code>tmpfile()</code> create anonymous unlinked files on POSIX systems, and why is this significantly more secure against race-condition symlink attacks than generating predictable temporary filenames with <code>tmpnam()</code>?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_010 Topic 5 FAQs: Stream Diagnostics & Error Handling" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 5 Note: Stream Diagnostics & Error Handling"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic5_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "Industrial code is distinguished by its error handling. Always check every return code, inspect errno, and print human-readable explanations with perror(). Your future self debugging a production server at 3 AM will thank you! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
