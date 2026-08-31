import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ovrDemoCode from "./topic1_files/BankAccountOverdrawRaceConditionDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 008_003 · Topic 1
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Account Overdraw
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Classic Bank Account Overdraw: <code className="text-rose-400 font-mono">Check-Then-Act</code> Race Condition
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Simulate financial concurrency bugs: observing how simultaneous withdrawals bypass balance checks, produce negative deficits, and demonstrate the danger of unsynchronized check-then-act logic.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={ovrDemoCode}
          title="BankAccountOverdrawRaceConditionDemo.java"
          highlightLines={[7, 10, 13, 14, 21, 22, 38, 39, 45, 46]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Account Overdraw FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 008_003 Topic 1: Bank Account Overdraw Race Condition"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="008_003_topic1_bank_account_overdraw_note.txt"
        />
      </section>

      <Teacher
        note="If Swadeep and Tuhina both swipe their debit cards at the exact same second for ₹8,000 on an account with only ₹10,000, both cards pass the check and the bank loses ₹6,000! That is why the check and the deduction MUST be locked together as one atomic unit! — Sukanta Hui"
      />
    </div>
  );
}