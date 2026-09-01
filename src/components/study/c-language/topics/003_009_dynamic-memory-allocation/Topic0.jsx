import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/DynamicMemoryDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 0
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Heap Management
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Dynamic Memory Allocation & Heap Management
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master heap allocation with malloc(), calloc(), realloc(), free(), dangling pointer elimination, and memory leak diagnostics.
        </p>
      </header>

      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-sky-300">💡 Stack vs Heap Architecture</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Stack memory is automatically managed per stack frame. Heap memory offers dynamic runtime lifetime persistence until explicitly released via <code>free()</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">💻 Reference Code: DynamicMemoryDemo.c</h2>
        <CFileLoader fileModule={cCode} title="DynamicMemoryDemo.c" editable={false} />
      </section>

      <section>
        <FAQTemplate title="Module 003_009 Topic 0 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic0_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always set pointer = NULL immediately after calling free(pointer) to eliminate dangling pointers! — Sukanta Hui" />
      </section>
    </div>
  );
}
