import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/LinkedListDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 004_012 · Topic 0
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Systems & Capstones
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Data Structures & Systems Capstone Projects
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master pure C data structure implementations (Singly Linked List, Stack, Queue), command-line arguments (argc, argv), and production system architectures.
        </p>
      </header>

      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-sky-300">💡 Dynamic Linked Memory</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Linked lists overcome fixed array size limitations by linking heap-allocated nodes dynamically via self-referential pointers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">💻 Reference Code: LinkedListDemo.c</h2>
        <CFileLoader fileModule={cCode} title="LinkedListDemo.c" editable={false} />
      </section>

      <section>
        <FAQTemplate title="Module 004_012 Topic 0 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 004_012 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_004_012_topic0_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always free every node in a linked list before exiting to prevent massive memory leaks! — Sukanta Hui" />
      </section>
    </div>
  );
}
