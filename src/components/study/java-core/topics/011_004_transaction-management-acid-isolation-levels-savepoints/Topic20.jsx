import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic20_files/TransactionSerializableDemo.java?raw";
import noteText from "./topic20_files/topic20_note.txt?raw";
import questions from "./topic20_files/topic20_questions";

export default function Topic20() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 011_004 · Topic 20
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Transactions & ACID
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          4. TRANSACTION_SERIALIZABLE: <code className="text-emerald-400 font-mono">Total Strict Isolation</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Zero anomalies: the highest isolation level that guarantees concurrent transactions produce results identical to serial one-by-one execution.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="TransactionSerializableDemo.java"
          highlightLines={[18,25,34,43]}
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
          title="Module 011_004 Topic 20: TRANSACTION_SERIALIZABLE"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="011_004_topic20_transaction_serializable_note.txt"
        />
      </section>

      <Teacher
        note="SERIALIZABLE is the Fort Knox of database isolation! It completely prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads! But beware: if two transactions conflict, the database will abort one with a serialization failure error! — Sukanta Hui"
      />
    </div>
  );
}
