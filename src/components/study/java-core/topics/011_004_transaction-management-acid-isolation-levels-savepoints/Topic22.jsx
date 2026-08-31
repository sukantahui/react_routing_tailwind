import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic22_files/InterbankTransferCapstoneDemo.java?raw";
import noteText from "./topic22_files/topic22_note.txt?raw";
import questions from "./topic22_files/topic22_questions";

export default function Topic22() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 011_004 · Topic 22
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Transactions & ACID
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Inter-Bank Transfer: <code className="text-emerald-400 font-mono">Debit/Credit Atomicity Transaction</code> (Capstone)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Mission-critical money movement: building an enterprise atomic fund transfer engine with balance checks, row locking, and rollback safeguards.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="InterbankTransferCapstoneDemo.java"
          highlightLines={[18,25,34,43,52]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Transaction & ACID FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 011_004 Topic 22: Inter-Bank Transfer Capstone"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="011_004_topic22_interbank_transfer_capstone_note.txt"
        />
      </section>

      <Teacher
        note="Congratulations on completing Module 4 of Segment 11! You now understand the full power of ACID transactions, isolation levels, MVCC, savepoints, and financial safety! Next up: Batch Processing & Large-Scale Data Handling! — Sukanta Hui"
      />
    </div>
  );
}
