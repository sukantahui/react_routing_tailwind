import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/BinaryStructIODemo.c?raw";
import { topic3Questions } from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <section className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          <span>Module 003_010</span>
          <span>•</span>
          <span>Topic 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Binary Stream I/O & Struct Serialization (<code className="text-emerald-600 dark:text-emerald-400">fwrite</code> &amp; <code className="text-emerald-600 dark:text-emerald-400">fread</code>)
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Master direct byte-for-byte stream serialization. Discover how binary mode bypasses ASCII encoding overhead to store dense C structures directly on disk with unmatched performance.
        </p>
      </section>

      {/* 2. Concept Overview / Narrative */}
      <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900/60 dark:to-emerald-950/20 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>⚡ Classroom Story: The High-Speed Data Engine at Barrackpore</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          In our lab, <strong>Abhronila</strong> built a student portal writing records with <code>fprintf(fp, "%d %s %f %c\n", ...)</code>. When testing with 100,000 student transcripts, the process took several seconds and generated a bloated 4.8 MB text file full of formatted space padding.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <strong>Sukanta Sir</strong> showed the class how <code>fwrite()</code> and <code>fread()</code> work: <em>&ldquo;Why convert an integer into ASCII characters, write them one by one, and then parse them back with sscanf? In binary mode, RAM bytes are mirrored directly into the OS page cache without a single cycle wasted on character translation.&rdquo;</em> Swadeep switched the database engine to <code>fwrite</code>, shrinking the file to 1.6 MB and completing the operation in 18 milliseconds.
        </p>
      </section>

      {/* 3. Semantic SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Architectural Blueprint: Struct Serialization in RAM vs Disk
        </h2>
        <div className="w-full overflow-x-auto bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <svg
            viewBox="0 0 900 300"
            className="w-full min-w-[700px] h-auto font-sans"
            aria-label="Binary Struct Serialization Architecture"
          >
            <rect width="900" height="300" fill="none" />

            {/* RAM Box */}
            <rect x="40" y="40" width="340" height="220" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="70" fill="#38bdf8" fontSize="16" fontWeight="bold">RAM (Stack / Heap Memory)</text>

            <rect x="60" y="90" width="300" height="35" rx="6" fill="#334155" stroke="#64748b" />
            <text x="75" y="113" fill="#f8fafc" fontSize="13">int rollNumber (4 Bytes)</text>

            <rect x="60" y="130" width="300" height="35" rx="6" fill="#334155" stroke="#64748b" />
            <text x="75" y="153" fill="#f8fafc" fontSize="13">char name[50] (50 Bytes)</text>

            <rect x="60" y="170" width="300" height="35" rx="6" fill="#334155" stroke="#64748b" />
            <text x="75" y="193" fill="#f8fafc" fontSize="13">float marks (4 Bytes) + padding</text>

            <rect x="60" y="210" width="300" height="35" rx="6" fill="#0f766e" stroke="#14b8a6" />
            <text x="75" y="233" fill="#ccfbf1" fontSize="13" fontWeight="bold">Student record: sizeof(Student) = 60B</text>

            {/* Transfer Arrows */}
            <path d="M 400 120 L 500 120" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow-green)" strokeDasharray="6,4" />
            <text x="408" y="105" fill="#10b981" fontSize="12" fontWeight="bold">fwrite(&amp;rec, 60, 1, fp)</text>

            <path d="M 500 180 L 400 180" stroke="#0ea5e9" strokeWidth="4" markerEnd="url(#arrow-blue)" strokeDasharray="6,4" />
            <text x="410" y="202" fill="#0ea5e9" fontSize="12" fontWeight="bold">fread(&amp;rec, 60, 1, fp)</text>

            {/* Disk File Box */}
            <rect x="520" y="40" width="340" height="220" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="540" y="70" fill="#10b981" fontSize="16" fontWeight="bold">Binary File on Disk (students.dat)</text>

            <rect x="540" y="90" width="300" height="40" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="555" y="115" fill="#a7f3d0" fontSize="13">Record #1: [0x65 0x00 ... raw bytes]</text>

            <rect x="540" y="140" width="300" height="40" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="555" y="165" fill="#a7f3d0" fontSize="13">Record #2: [0x66 0x00 ... raw bytes]</text>

            <rect x="540" y="190" width="300" height="40" rx="6" fill="#064e3b" stroke="#059669" />
            <text x="555" y="215" fill="#a7f3d0" fontSize="13">Record #3: [0x67 0x00 ... raw bytes]</text>

            {/* Marker definitions */}
            <defs>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deep Technical Breakdown: The Mechanics of Block I/O
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              1. Function Prototypes &amp; Arguments
            </h3>
            <pre className="bg-slate-900 text-emerald-300 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{`size_t fwrite(const void *ptr, size_t size, size_t count, FILE *stream);
size_t fread(void *ptr, size_t size, size_t count, FILE *stream);`}
            </pre>
            <ul className="text-sm space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li><strong>ptr:</strong> Memory address of the source or destination buffer.</li>
              <li><strong>size:</strong> Byte width of a single item (e.g. <code>sizeof(Student)</code>).</li>
              <li><strong>count:</strong> Total number of items to transfer in this block.</li>
              <li><strong>Return value:</strong> Count of complete elements successfully transferred.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400">
              2. Struct Padding &amp; Byte Alignment
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Compilers align struct members on 4-byte or 8-byte word boundaries for hardware efficiency. If a struct has a <code>char</code> followed by an <code>int</code>, 3 padding bytes are inserted.
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/50 rounded-lg text-xs text-amber-800 dark:text-amber-200">
              <strong>Crucial Rule:</strong> Always clear memory with <code>memset(&amp;record, 0, sizeof(record))</code> before populating fields to ensure uninitialized padding bytes do not leak confidential garbage into disk files.
            </div>
          </div>
        </div>

        {/* Text vs Binary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-3">Attribute</th>
                <th className="p-3">Text Stream I/O (fprintf / fscanf)</th>
                <th className="p-3">Binary Stream I/O (fwrite / fread)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold">Representation</td>
                <td className="p-3">Human-readable ASCII/UTF-8 strings</td>
                <td className="p-3">Raw machine byte mirror (RAM dump)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Speed</td>
                <td className="p-3">Slower (requires string formatting &amp; parsing)</td>
                <td className="p-3">Near instantaneous (direct memory block copy)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Storage Density</td>
                <td className="p-3">Variable size, space-inefficient for numbers</td>
                <td className="p-3">Exact fixed-width structures (compact)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Windows Line Endings</td>
                <td className="p-3">Translates <code>\n</code> &harr; <code>\r\n</code></td>
                <td className="p-3">Untranslated 1:1 exact byte stream</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Compilable Example Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Working Code: Struct Serialization &amp; Deserialization
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Observe how an array of C structs is written to <code>students.dat</code> in a single <code>fwrite()</code> call, and deserialized record-by-record using <code>fread()</code>.
        </p>
        <CFileLoader
          fileName="BinaryStructIODemo.c"
          code={cCode}
          title="Binary Struct Serialization & Stream Verification"
        />

        {/* Expected Output Card */}
        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm border border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold border-b border-slate-700 pb-1">
            Expected Console Output:
          </div>
          <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">
{`=====================================================
  C Binary File I/O: Struct Serialization (fwrite/fread)
=====================================================

>>> Step 1: Writing 4 student records to binary file 'students.dat'...
    fwrite successfully wrote 4 records (240 bytes total).

-----------------------------------------------------
>>> Step 2: Reading individual records back using fread()...

[1] Roll: 101  | Name: Swadeep Sharma    | Marks: 88.50 | Grade: A
[2] Roll: 102  | Name: Tuhina Roy        | Marks: 94.00 | Grade: E
[3] Roll: 103  | Name: Abhronila Das     | Marks: 91.25 | Grade: E
[4] Roll: 104  | Name: Debangshu Pal     | Marks: 82.75 | Grade: B

-----------------------------------------------------
>>> Step 3: Verifying file size on disk vs calculated size...
    sizeof(Student struct) = 60 bytes
    Expected file size     = 4 * 60 = 240 bytes
    Actual file size       = 240 bytes

=== Binary I/O Demonstration Completed Successfully ===`}
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
              <span>⚠️ The Shallow Pointer Serialization Trap</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Never write a struct containing <code>char *name;</code> or dynamic pointers with <code>fwrite</code>. You are only saving ephemeral 8-byte virtual RAM addresses. When reloaded in another session, those addresses are invalid and cause instant segmentation faults.
            </p>
          </div>

          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span>✅ Safe Field Definition &amp; Fixed-Width Types</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Always use fixed-size character arrays (e.g. <code>char name[50];</code>) or standardized types like <code>int32_t</code> from <code>&lt;stdint.h&gt;</code>. For dynamic strings, write the length integer first, followed by string bytes.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Think About This... */}
      <section className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>💡 Think About This: Cross-Platform Endianness</span>
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          If you write an <code>int x = 0x12345678</code> on an Intel x86-64 machine (Little Endian), the bytes on disk are ordered <code>78 56 34 12</code>. If this binary file is opened on a Big Endian server (such as an IBM mainframe or network router), it reads as <code>0x78563412</code>. How do production network formats like PNG and TCP/IP solve this? (<em>Answer: They enforce Network Byte Order / Big Endian using <code>htons()</code> and <code>htonl()</code>!</em>)
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions (25 In-Depth Answers)
        </h2>
        <FAQTemplate questions={topic3Questions} />
      </section>

      {/* 9. PlainTextPrint Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Printable Quick-Reference Notes
        </h2>
        <PlainTextPrint note={noteText} fileName="Topic3_Binary_Struct_IO_Note.txt" />
      </section>

      {/* 10. Teacher Persona Note */}
      <Teacher
        name="Sukanta Hui"
        role="Senior C & Systems Architect"
        experience="26+ Years Experience"
        location="Barrackpore & Shyamnagar, WB"
        quote="A C programmer sees files not as documents, but as linear sequences of raw memory bytes. Treat disk blocks with the same mathematical precision you treat pointers in RAM."
      />
    </div>
  );
};

export default Topic3;
