import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/RandomAccessFileDemo.c?raw";
import { topic4Questions } from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 003_010</span>
          <span>•</span>
          <span>Topic 4</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Random Access File Positioning (<code className="text-emerald-600 dark:text-emerald-400">fseek</code>, <code className="text-emerald-600 dark:text-emerald-400">ftell</code>, <code className="text-emerald-600 dark:text-emerald-400">rewind</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master non-sequential stream navigation. Learn how to seek arbitrary byte offsets in $O(1)$ time, inspect current file pointer positions, and perform lightning-fast in-place record updates.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⏱️ Classroom Story: The 1-Millionth Inventory Record Search</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          During an inventory project session in Shyamnagar, <strong>Tuhina</strong> wanted to update the price of item #854,200 in a binary catalog of 1,000,000 products. Her first implementation used a <code>while</code> loop reading 854,199 records one by one until the target was reached, taking over 4 seconds on disk.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> intervened: <em>&ldquo;Files are not cassette tapes where you must fast-forward through every song. If each record is 64 bytes, record 854,200 is located at exactly <code>854,200 * 64</code> bytes! Jump straight to it with <code>fseek()</code> in zero milliseconds.&rdquo;</em> Tuhina applied <code>fseek</code> with <code>SEEK_SET</code>, and the lookup occurred in less than 50 microseconds.
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: File Pointer Seeking Modes
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 320"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="fseek Positioning Modes Diagram"
          >
            <rect width="900" height="320" fill="none" />

            {/* File Strip */}
            <rect x="50" y="80" width="800" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />

            {/* Blocks / Records */}
            <rect x="50" y="80" width="160" height="70" fill="#047857" stroke="#10b981" />
            <text x="130" y="120" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Record 0 (0B)</text>

            <rect x="210" y="80" width="160" height="70" fill="#1e293b" stroke="#475569" />
            <text x="290" y="120" fill="#cbd5e1" fontSize="14" textAnchor="middle">Record 1 (64B)</text>

            <rect x="370" y="80" width="160" height="70" fill="#0284c7" stroke="#38bdf8" />
            <text x="450" y="120" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Current Pos (128B)</text>

            <rect x="530" y="80" width="160" height="70" fill="#1e293b" stroke="#475569" />
            <text x="610" y="120" fill="#cbd5e1" fontSize="14" textAnchor="middle">Record 3 (192B)</text>

            <rect x="690" y="80" width="160" height="70" fill="#b91c1c" stroke="#f87171" />
            <text x="770" y="120" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">EOF (256B)</text>

            {/* SEEK_SET Arrow */}
            <path d="M 50 190 L 450 190" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-seek-green)" />
            <circle cx="50" cy="190" r="5" fill="#10b981" />
            <text x="170" y="215" fill="#10b981" fontSize="13" fontWeight="bold">SEEK_SET: fseek(fp, +128, SEEK_SET)</text>

            {/* SEEK_CUR Arrow */}
            <path d="M 450 40 L 610 40" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-seek-blue)" />
            <circle cx="450" cy="40" r="5" fill="#38bdf8" />
            <text x="470" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">SEEK_CUR: fseek(fp, +64, SEEK_CUR)</text>

            {/* SEEK_END Arrow */}
            <path d="M 850 250 L 690 250" stroke="#f87171" strokeWidth="3" markerEnd="url(#arrow-seek-red)" />
            <circle cx="850" cy="250" r="5" fill="#f87171" />
            <text x="700" y="275" fill="#f87171" fontSize="13" fontWeight="bold">SEEK_END: fseek(fp, -64, SEEK_END)</text>

            {/* Markers */}
            <defs>
              <marker id="arrow-seek-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-seek-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker id="arrow-seek-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f87171" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Three Origin Anchors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="inline-block px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
              SEEK_SET (Value: 0)
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">File Start Anchor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Positions pointer relative to byte 0. Offset must be non-negative ($\ge 0$). Used for absolute record addressing: <code>index * sizeof(Record)</code>.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="inline-block px-2.5 py-1 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 font-mono text-xs font-bold">
              SEEK_CUR (Value: 1)
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Current Position</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Positions pointer relative to current indicator. Positive offset skips forward; negative offset steps backward.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="inline-block px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-mono text-xs font-bold">
              SEEK_END (Value: 2)
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">End of File Anchor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Positions pointer relative to EOF. Negative offset reads tail records: <code>-(long)sizeof(Record)</code> jumps to the last record.
            </p>
          </div>
        </div>

        {/* In-Place Update Mechanics */}
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h3 className="text-lg font-bold text-emerald-400">The 6-Step In-Place Update Protocol</h3>
          <ol className="text-sm space-y-2 text-slate-300 list-decimal list-inside font-mono">
            <li><span className="text-white font-semibold">Open:</span> <code>FILE *fp = fopen(&quot;data.dat&quot;, &quot;rb+&quot;);</code> (update mode, preserve contents)</li>
            <li><span className="text-white font-semibold">Seek:</span> <code>fseek(fp, targetIndex * sizeof(Rec), SEEK_SET);</code></li>
            <li><span className="text-white font-semibold">Read:</span> <code>fread(&amp;rec, sizeof(Rec), 1, fp);</code> (modifies file pointer!)</li>
            <li><span className="text-white font-semibold">Mutate:</span> Modify struct members in RAM.</li>
            <li><span className="text-white font-semibold">Re-Seek:</span> <code>fseek(fp, targetIndex * sizeof(Rec), SEEK_SET);</code> (reset pointer!)</li>
            <li><span className="text-white font-semibold">Write &amp; Flush:</span> <code>fwrite(&amp;rec, sizeof(Rec), 1, fp); fflush(fp);</code></li>
          </ol>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Random Access &amp; In-Place Record Mutation
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          This program demonstrates jumping directly to arbitrary records, seeking relative offsets, and performing an in-place quantity/price modification.
        </p>
        <CFileLoader
          fileName="RandomAccessFileDemo.c"
          code={cCode}
          title="Random Access Navigation, ftell Auditing & In-Place Update"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  C Random Access File Positioning: fseek, ftell, rewind
=====================================================

>>> Initialized 'inventory.dat' with 5 records. Total File Size: 280 bytes.

>>> Jumped via SEEK_SET to byte 112:
Record #2  (Offset  112 bytes) -> ID: 1003 | 4K UHD Monitor       | Qty: 18   | Price: $349.00 

>>> Jumped +1 record forward via SEEK_CUR (offset 224):
Record #4  (Offset  224 bytes) -> ID: 1005 | Noise-Canceling Headset | Qty: 32   | Price: $129.95 

>>> Jumped -sizeof(Item) from SEEK_END (offset 224):
Record #4  (Offset  224 bytes) -> ID: 1005 | Noise-Canceling Headset | Qty: 32   | Price: $129.95 

>>> Updating Record #1 in-place:
    Before update -> Qty: 120, Price: $29.50

-----------------------------------------------------
>>> Rewinding file with rewind() and displaying full database:

Record #0  (Offset    0 bytes) -> ID: 1001 | Mechanical Keyboard  | Qty: 45   | Price: $89.99  
Record #1  (Offset   56 bytes) -> ID: 1002 | Wireless Mouse       | Qty: 170  | Price: $24.99  
Record #2  (Offset  112 bytes) -> ID: 1003 | 4K UHD Monitor       | Qty: 18   | Price: $349.00 
Record #3  (Offset  168 bytes) -> ID: 1004 | USB-C Hub Multiport  | Qty: 85   | Price: $45.00  
Record #4  (Offset  224 bytes) -> ID: 1005 | Noise-Canceling Headset | Qty: 32   | Price: $129.95 

=== Random Access Operations Completed Successfully ===`}
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
              <span>⚠️ The Forgotten Re-Seek Bug</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              When updating a record, calling <code>fread()</code> advances the file pointer by 1 record. If you immediately call <code>fwrite()</code> without calling <code>fseek()</code> first, you will overwrite the <em>next</em> record instead of the one you just read!
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Stream Sync Between Read &amp; Write</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              In update modes (<code>rb+</code>, <code>r+</code>), ANSI C mandates an intervening call to <code>fseek</code>, <code>rewind</code>, or <code>fflush</code> when switching between input and output operations to flush internal buffer states.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Binary Search on Disk Files</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          If you have a 10 GB binary database sorted by <code>ID</code>, you do not need to load the 10 GB file into RAM. You can perform binary search directly on disk using <code>low = 0</code>, <code>high = totalRecords - 1</code>, and jumping to <code>mid</code> via <code>fseek</code>. Any key can be located in $\le 25$ disk seeks!
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic4Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic4_Random_Access_File_Positioning_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="Random file access is the mathematical bridge that turns raw sequential disk storage into high-performance relational databases and file engines."
      />
    </div>
  );
};

export default Topic4;
