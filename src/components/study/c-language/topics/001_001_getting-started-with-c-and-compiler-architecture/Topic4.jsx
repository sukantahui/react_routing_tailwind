import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/ConsoleIODemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_001 · Topic 4
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Console I/O
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Formatted Console I/O: printf(), scanf() &amp; Format Specifiers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master output formatting and input parsing using printf(), scanf(), precision field widths, and format specifiers (%d, %f, %c, %s).
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Formatted I/O Streams
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Format specifiers tell C functions how to interpret binary byte representations in memory into readable text output and vice versa.
        </p>
      </section>

      {/* 3. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Console I/O Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ConsoleIODemo.c</code>) demonstrates interactive input reading and formatted output printing.
        </p>

        <CFileLoader fileModule={demoCode} title="ConsoleIODemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`=== Formatted Console I/O Demo ===

Enter Age (integer): 20
Enter GPA (float): 3.85
Enter Grade (char): A

--- Summary ---
Age  : 20 years
GPA  : 3.85 / 4.00
Grade: A`}
          </pre>
        </div>
      </section>

      {/* 4. FAQs */}
      <section>
        <FAQTemplate title="Module 001_001 Topic 4 FAQs" questions={questions} />
      </section>

      {/* 5. Plain Text Note */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 4 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_001_topic4_note.txt"
        />
      </section>

      {/* 6. Teacher Note */}
      <section>
        <Teacher note="Always add a leading space before %c in scanf(' %c', &ch) to consume leftover newline characters in the input buffer! — Sukanta Hui" />
      </section>
    </div>
  );
}
