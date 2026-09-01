import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/PointersBasicsDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 0
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Pointers & Memory
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Pointers, Address Arithmetic & Function Pointers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the core of C: memory address-of (&amp;), dereference (*), pointer arithmetic scaling, double pointers (**), void pointers (void*), and function callbacks.
        </p>
      </header>

      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-sky-300">💡 Direct RAM Address Access</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Pointers store hexadecimal RAM addresses. Dereferencing <code>*ptr</code> reads or mutates the byte contents at that address directly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">💻 Reference Code: PointersBasicsDemo.c</h2>
        <CFileLoader fileModule={cCode} title="PointersBasicsDemo.c" editable={false} />
      </section>

      <section>
        <FAQTemplate title="Module 002_007 Topic 0 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_002_007_topic0_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always initialize pointers to NULL or a valid address to prevent segmentation fault crashes! — Sukanta Hui" />
      </section>
    </div>
  );
}
