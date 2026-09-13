import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic5_files/FileErrorHandlingDemo.c?raw";
import { topic5Questions } from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 003_010</span>
          <span>•</span>
          <span>Topic 5</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Stream Diagnostics &amp; Error Handling (<code className="text-emerald-600 dark:text-emerald-400">feof</code>, <code className="text-emerald-600 dark:text-emerald-400">ferror</code>, <code className="text-emerald-600 dark:text-emerald-400">clearerr</code>, <code className="text-emerald-600 dark:text-emerald-400">perror</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Demystify I/O stream failure modes. Understand why <code className="text-rose-500 font-mono">while(!feof(fp))</code> is a dangerous bug, and master system diagnostic tools like <code>ferror</code>, <code>clearerr</code>, <code>errno</code>, and <code>perror</code>.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🐛 Classroom Story: The Ghost Duplicate Record Bug</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          During an accounting file parser sprint in Barrackpore, <strong>Debangshu</strong> noticed that his GST tax summary always printed the last invoice twice. He checked his file loop: <code>while (!feof(fp)) &#123; fscanf(fp, ...); processInvoice(); &#125;</code>.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> explained the hidden mechanism: <em>&ldquo;<code>feof()</code> does not predict whether there is data ahead. It is a rearview mirror that only lights up <strong>after</strong> an operation has already crashed into the EOF boundary. When <code>fscanf</code> fails on EOF, your loop still enters and processes the dirty buffer one extra time!&rdquo;</em> Debangshu converted his loop to check <code>fscanf</code> return values directly, eliminating the phantom record instantly.
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          State Machine Diagram: The Lifecycle of EOF &amp; Error Flags
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 280"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="File Stream State Machine Diagram"
          >
            <rect width="900" height="280" fill="none" />

            {/* State: Normal */}
            <circle cx="150" cy="140" r="60" fill="#047857" stroke="#10b981" strokeWidth="3" />
            <text x="150" y="135" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">READY / OK</text>
            <text x="150" y="155" fill="#a7f3d0" fontSize="11" textAnchor="middle">feof=0, ferror=0</text>

            {/* Transition to EOF */}
            <path d="M 210 120 Q 325 50 440 120" fill="none" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-diag-amber)" />
            <text x="325" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Read past EOF (fgetc == EOF)</text>

            {/* State: EOF */}
            <circle cx="500" cy="140" r="60" fill="#b45309" stroke="#f59e0b" strokeWidth="3" />
            <text x="500" y="135" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">EOF STATE</text>
            <text x="500" y="155" fill="#fde68a" fontSize="11" textAnchor="middle">feof() &gt; 0</text>

            {/* Transition to Error */}
            <path d="M 180 190 Q 300 250 440 210" fill="none" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-diag-red)" />
            <text x="310" y="255" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Hardware / Disk / Permission I/O Error</text>

            {/* State: ERROR */}
            <circle cx="500" cy="210" r="50" fill="#991b1b" stroke="#ef4444" strokeWidth="3" />
            <text x="500" y="205" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">STREAM ERROR</text>
            <text x="500" y="223" fill="#fecaca" fontSize="10" textAnchor="middle">ferror() &gt; 0</text>

            {/* ClearErr Reset Transition */}
            <path d="M 560 140 Q 750 40 750 140 Q 750 240 210 160" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="5,4" markerEnd="url(#arrow-diag-blue)" />
            <text x="780" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">clearerr(fp) / rewind(fp)</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-diag-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
              <marker id="arrow-diag-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
              <marker id="arrow-diag-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Diagnostic Toolkit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. feof() vs ferror() vs clearerr()
            </h3>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <strong>feof(fp):</strong> Returns non-zero if an end-of-file condition was triggered.
              </li>
              <li>
                <strong>ferror(fp):</strong> Returns non-zero if an internal stream read/write failure occurred.
              </li>
              <li>
                <strong>clearerr(fp):</strong> Resets both EOF and error flags so the stream can attempt further operations.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. System Diagnostics: errno &amp; perror()
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When standard library I/O functions fail, they assign an integer failure code to <code>errno</code> (defined in <code>&lt;errno.h&gt;</code>).
            </p>
            <pre className="bg-slate-900 text-sky-300 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
{`FILE *fp = fopen("secret.dat", "r");
if (fp == NULL) {
    perror("Error opening secret.dat");
    // Output: Error opening secret.dat: No such file or directory
}`}
            </pre>
          </div>
        </div>

        {/* Antipattern vs Correct Patterns Comparison */}
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h3 className="text-lg font-bold text-amber-400">The 3 Idiomatic Reading Patterns in Standard C</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <div className="text-emerald-400 font-bold mb-1">// Text Lines</div>
              <code>
                while (fgets(buf, sizeof(buf), fp) != NULL) &#123;<br />
                &nbsp;&nbsp;// process line<br />
                &#125;
              </code>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <div className="text-sky-400 font-bold mb-1">// Characters (int ch!)</div>
              <code>
                int ch;<br />
                while ((ch = fgetc(fp)) != EOF) &#123;<br />
                &nbsp;&nbsp;// process ch<br />
                &#125;
              </code>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <div className="text-purple-400 font-bold mb-1">// Binary Structs</div>
              <code>
                Student s;<br />
                while (fread(&amp;s, sizeof(s), 1, fp) == 1) &#123;<br />
                &nbsp;&nbsp;// process struct<br />
                &#125;
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Stream Diagnostics in Action
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program contrasts the <code>while(!feof)</code> bug against proper return checking, and triggers intentional stream errors to demonstrate <code>ferror</code>, <code>clearerr</code>, and <code>perror</code>.
        </p>
        <CFileLoader
          fileName="FileErrorHandlingDemo.c"
          code={cCode}
          title="Stream Error Trapping, feof Pitfall & perror Diagnostics"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  C Stream Diagnostics: Error Handling, feof, & ferror
=====================================================

-----------------------------------------------------
1. THE DANGEROUS 'while (!feof(fp))' TRAP
-----------------------------------------------------
>>> Incorrect approach (while (!feof(fp))):
    Read Line [1]: 'Alpha'
    Read Line [2]: 'Beta'
    Read Line [3]: 'Gamma'
    [feof check failed to prevent loop body! fgets returned NULL at EOF]

>>> Correct idiomatic approach (while (fgets(...) != NULL)):
    Read Line [1]: 'Alpha'
    Read Line [2]: 'Beta'
    Read Line [3]: 'Gamma'

-----------------------------------------------------
2. STREAM DIAGNOSTICS (ferror, clearerr, perror, strerror)
-----------------------------------------------------
>>> Step A: Attempting to open non-existent file 'non_existent_system_file.xyz'...
    fopen returned NULL.
    errno code: 2
    strerror() output: No such file or directory
    perror() output:   fopen failed: No such file or directory

>>> Step B: Attempting illegal write on read-only stream 'diagnostics_sample.txt'...
    fputs returned EOF! ferror(fp) is TRUE (non-zero).
    perror: Stream Error Detected: Bad file descriptor
    ferror(fpReadOnly) before clearerr: 1
    clearerr(fpReadOnly) called.
    ferror(fpReadOnly) after clearerr:  0 (Clean)

=== Stream Diagnostics Demonstration Completed ===`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Common Pitfalls &amp; Professional Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <span>⚠️ Storing fgetc() in a char variable</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <code>char ch = fgetc(fp);</code> is a disastrous bug. In binary files or extended character sets, the byte <code>0xFF</code> (255) when cast to a signed 8-bit char equals <code>-1</code> (EOF), causing premature truncation. Always declare <code>int ch;</code>!
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Always Check fclose() on Output Streams</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When writing files, <code>fclose()</code> performs the final buffer flush to physical disk. If disk space runs out during the final flush, <code>fclose()</code> returns <code>EOF</code>. Always verify <code>if (fclose(fp) != 0) perror(&quot;Flush failed&quot;);</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Atomic File Replacement (Temp Swap)</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          How do mission-critical databases (SQLite, PostgreSQL) ensure power failures don&apos;t corrupt their master files? They write updates to a temporary <code>.tmp</code> file, flush it with <code>fflush()</code>, close it, and then call POSIX <code>rename()</code>. The OS guarantees <code>rename()</code> is atomic—either the old file exists or the new file exists, never a broken half-written file!
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic5Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic5_Stream_Diagnostics_Error_Handling_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Never assume a file operation succeeded. The difference between a student script and mission-critical production software is that production software actively expects failures and handles them gracefully."
      />
    </div>
  );
};

export default Topic5;
