import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/StructsDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_008 · Topic 0
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Derived Data Types
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Structures, Unions, Bit-fields & typedef
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master user-defined data grouping using struct, memory padding and alignment, union memory sharing, bit-fields, and typedef type aliases.
        </p>
      </header>

      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-sky-300">💡 Composite Structures in Memory</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Structures aggregate diverse primitive types into single contiguous records. Using pointer access <code>ptr-&gt;member</code> avoids copying large struct instances across call stack frames.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">💻 Reference Code: StructsDemo.c</h2>
        <CFileLoader fileModule={cCode} title="StructsDemo.c" editable={false} />
      </section>

      <section>
        <FAQTemplate title="Module 003_008 Topic 0 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_008_topic0_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always pass structs as const pointers (const Student *s) to prevent costly value copying while protecting read-only fields! — Sukanta Hui" />
      </section>
    </div>
  );
}
