import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/FileIODemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 0
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            File Streams
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          File Handling & Stream I/O Operations
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master disk persistence using FILE* stream pointers, file open modes (r, w, a, rb, wb), text formatted I/O, binary fread/fwrite, and random access fseek positioning.
        </p>
      </header>

      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-sky-300">💡 Persistent File Storage</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          File streams bridge volatile RAM memory with non-volatile disk storage. The C standard library provides buffered file stream abstractions through <code>FILE*</code> structures.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">💻 Reference Code: FileIODemo.c</h2>
        <CFileLoader fileModule={cCode} title="FileIODemo.c" editable={false} />
      </section>

      <section>
        <FAQTemplate title="Module 003_010 Topic 0 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic0_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always call fclose(fp) after file operations to flush internal buffer contents to disk and prevent file lock leaks! — Sukanta Hui" />
      </section>
    </div>
  );
}
