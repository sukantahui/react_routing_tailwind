"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic2_files/topic2_questions";
import questionsBn from "./topic2_files/topic2_questions_bn";
import noteTextEn from "./topic2_files/topic2_note.txt?raw";
import noteTextBn from "./topic2_files/topic2_note_bn.txt?raw";

export default function Topic2() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("cash_bal");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  const questions = isBengali && questionsBn ? questionsBn : questionsEn;
  const noteText = isBengali && noteTextBn ? noteTextBn : noteTextEn;

  const scenarios = [{"id":"cash_bal","titleEn":"1. Cash Account (Dr ₹1,20,000 vs Cr ₹80,000)","detailEn":"Net Debit Balance = ₹40,000. Balance c/d written on Credit side as ₹40,000 to equalize total ₹1,20,000.","detailBn":"নিট ডেবিট জের = ৪০,০০০ টাকা। ব্যালেন্স সমান করতে ক্রেডিট পাশে Balance c/d ৪০,০০০ টাকা বসে।"},{"id":"creditor_bal","titleEn":"2. Vendor Apex Creditor (Cr ₹90,000 vs Dr ₹30,000)","detailEn":"Net Credit Balance = ₹60,000. Balance c/d written on Debit side as ₹60,000 to equalize total ₹90,000.","detailBn":"নিট ক্রেডিট জের = ৬০,০০০ টাকা। ব্যালেন্স সমান করতে ডেবিট পাশে Balance c/d ৬০,০০০ টাকা বসে।"},{"id":"nil_bal","titleEn":"3. Debtors Settlement (Dr ₹50,000 vs Cr ₹50,000)","detailEn":"Total Dr = Total Cr = ₹50,000. Account is completely settled with NIL balance.","detailBn":"Dr ও Cr উভয় যোগফল ৫০,০০০ টাকা। অ্যাকাউন্টটি সম্পূর্ণ নিষ্পত্তিকৃত (NIL ব্যালেন্স)।"},{"id":"bank_bal","titleEn":"4. SBI Bank Account (Dr ₹2,50,000 vs Cr ₹1,80,000)","detailEn":"Net Debit Balance = ₹70,000 Current Asset available in bank account.","detailBn":"নিট ডেবিট জের = ৭০,০০০ টাকা ব্যাংকে জমা সম্পদ।"}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["In TallyPrime, press Alt+G -> Type \"Trial Balance\" or \"Ledger Vouchers\".","Tally automatically computes net running balances after every single transaction.","Press F12 -> Enable \"Show Closing Balance\" to verify period-end closing figures."];
  const tallyStepsBn = ["TallyPrime-এ Alt+G চাপুন -> \"Trial Balance\" বা \"Ledger Vouchers\" লিখুন।","ট্যালি প্রতি লেনদেনের পরই স্বয়ংক্রিয়ভাবে নিট জের গণনা করে দেখায়।","F12 চেপে \"Show Closing Balance\" অপশনটি সচল করে সমাপনী জের মিলিয়ে নিন।"];

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        
        <div ref={addRef} className="reveal-section">
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>

        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>📊</span>
            <span>TallyPrime Master Series · Module 1.3 · Topic 2</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "লেজার অ্যাকাউন্ট ব্যালেন্সিং ও জের নির্ণয় কৌশল মাস্টারক্লাস" : "Balancing Ledger Accounts & Difference Calculation Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ডেবিট ও ক্রেডিট যোগফলের নিট পার্থক্য হিসেব করে ডেবিট জের, ক্রেডিট জের বা নীল ব্যালেন্স নির্ণয়ের পদ্ধতি।" : "Computing net differences between Debit and Credit totals to determine Debit Balance, Credit Balance, or Nil Balance."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-103</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE CONCEPTUAL MASTERCLASS SECTION ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "লেজার অ্যাকাউন্ট ব্যালেন্সিং ও জের নির্ণয় কৌশল মাস্টারক্লাস - মূল কাঠামো" : "Balancing Ledger Accounts & Difference Calculation Masterclass - Core Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "খতিয়ান ও সহকারী বই পরিচালনার তাত্ত্বিক ও বাণিজ্যিক নিয়মাবলি" : "Theoretical principles and operational framework under Module 1.3"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("tab1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab1" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. ডেবিট জের (Dr > Cr)" : "1. Debit Balance (Dr > Cr)"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. ক্রেডিট জের (Cr > Dr)" : "2. Credit Balance (Cr > Dr)"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. ডেবিট জের (Dr > Cr)" : "1. Debit Balance (Dr > Cr)"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "লেজার অ্যাকাউন্ট ব্যালেন্সিং ও জের নির্ণয় কৌশল মাস্টারক্লাস" : "Balancing Ledger Accounts & Difference Calculation Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "ডেবিট দিকের মোট যোগফল ক্রেডিট দিক অপেক্ষা বড় হলে ডেবিট জের তৈরি হয়। এটি সম্পদ বা পরিচালন খরচ নির্দেশ করে। মাস শেষে সমতার জন্য ক্রেডিট পাশে c/d বসে।" : "Debit Balance occurs when Total Debit side exceeds Total Credit side. Represents an Asset or Expense. Placed on Credit side as Balance c/d at month-end."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. ক্রেডিট জের (Cr > Dr)" : "2. Credit Balance (Cr > Dr)"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "লেজার অ্যাকাউন্ট ব্যালেন্সিং ও জের নির্ণয় কৌশল মাস্টারক্লাস" : "Balancing Ledger Accounts & Difference Calculation Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "ক্রেডিট দিকের মোট যোগফল ডেবিট দিক অপেক্ষা বড় হলে ক্রেডিট জের তৈরি হয়। এটি দায়, মূলধন বা আয় নির্দেশ করে। মাস শেষে সমতার জন্য ডেবিট পাশে c/d বসে।" : "Credit Balance occurs when Total Credit side exceeds Total Debit side. Represents a Liability, Capital, or Revenue Income. Placed on Debit side as Balance c/d at month-end."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "লেজার ব্যালেন্সিং ক্যালকুলেটর ও বাস্তব চিত্র" : "Ledger Balancing Calculator & Real Scenarios"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "পরিস্থিতি বা কলাম নির্বাচন করুন:" : "Select Practice Scenario or Column:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {scenarios.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`p-3 rounded-xl text-left text-xs font-mono font-bold transition border ${
                      selectedScenarioId === sc.id
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-lg"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isBengali ? sc.titleBn : sc.titleEn}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  {isBengali ? currentScenario.titleBn : currentScenario.titleEn}
                </h3>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-teal-300 font-mono text-xs font-bold w-fit">
                  Status: Active Simulation
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed">
                <strong>Accounting Breakdown:</strong> {isBengali ? currentScenario.detailBn : currentScenario.detailEn}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. STEP-BY-STEP TALLYPRIME OPERATIONAL GUIDE ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>⚙️</span>
            <span>{isBengali ? "TallyPrime কার্যপ্রসূত ধাপসমূহ" : "Step-by-Step TallyPrime Execution"}</span>
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 font-sans">
            {(isBengali ? tallyStepsBn : tallySteps).map((step, idx) => (
              <li key={idx} className="leading-relaxed"><span className="text-slate-200">{step}</span></li>
            ))}
          </ol>
        </section>

        
        {/* ─── 4. COMMERCIAL EXAMPLES & CASE STUDIES ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-teal-400">📚</span>
            <span>{isBengali ? "বাস্তব বাণিজ্যিক উদাহরণ ও কেস স্টাডি" : "Commercial Examples & Case Studies"}</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {[{"id":1,"titleEn":"Balancing Case 1: Plant & Equipment (Dr ₹4,50,000 vs Cr Nil)","titleBn":"ব্যালেন্সিং ক্ষেত্র ১: প্ল্যান্ট ও ইকুইপমেন্ট (Dr ৪,৫০,০০০ টাকা vs Cr জিরো)","drEn":"Net Debit Balance = ₹4,50,000. Balance c/d written on Credit side.","drBn":"নিট ডেবিট জের = ৪,৫০,০০০ টাকা। সমাপনী c/d ক্রেডিট পাশে বসবে।","crEn":"Transferred to Balance Sheet Assets side as Tangible Fixed Asset.","crBn":"ব্যালেন্স শিটের স্থায়ী সম্পদ অংশে স্থানান্তরিত হবে।"},{"id":2,"titleEn":"Balancing Case 2: Trade Creditor (Cr ₹1,20,000 vs Dr ₹40,000)","titleBn":"ব্যালেন্সিং ক্ষেত্র ২: ট্রেড পাওনাদার (Cr ১,২০,০০০ টাকা vs Dr ৪০,০০০ টাকা)","drEn":"Net Credit Balance = ₹80,000. Balance c/d written on Debit side.","drBn":"নিট ক্রেডিট জের = ৮০,০০০ টাকা। সমাপনী c/d ডেবিট পাশে বসবে।","crEn":"Transferred to Balance Sheet Liabilities side as Sundry Creditor.","crBn":"ব্যালেন্স শিটের চলতি দায় অংশে স্থানান্তরিত হবে।"}].map((ex) => (
              <div key={ex.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
                <h3 className="text-sm font-bold text-emerald-300 font-mono flex items-center gap-2">
                  <span>📌</span> {isBengali ? ex.titleBn : ex.titleEn}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300">
                    <strong>Debit Posting:</strong> {isBengali ? ex.drBn : ex.drEn}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/30 text-sky-300">
                    <strong>Credit Posting:</strong> {isBengali ? ex.crBn : ex.crEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-300">
                  {isBengali ? "Teacher's Desk: ল্যাব আলোচনা" : "Teacher's Desk: Practical Lab Discussion"}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Mr. CNAT &amp; Barrackpore Accounting Lab Discussion
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-emerald-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> Practical Metaphor
                </h3>
                <p>
                  {isBengali ? "লেজার ব্যালেন্সিং গাণিতিক সমতা নিশ্চিত করে এবং ট্রায়াল ব্যালেন্সের জন্য জের প্রস্তুত করে!" : "Balancing ledgers ensures arithmetic equality and prepares balances for Trial Balance!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, ডেবিট দিক বড় হলে Balance c/d কেন ক্রেডিট পাশে লেখা হয়?\"" : "\"Sir, if Debit side is larger, why is Balance c/d written on the Credit side?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"কারণ সমতাবিধানের জন্য ছোট পাশে Balance c/d বসিয়ে যোগফল সমান করা হয়! আগামী মাসের ১ তারিখে তা ডেবিট পাশে b/d হিসেবে ফিরে আসে!\"" : "\"Balance c/d is the balancing figure written on the smaller side to make both side totals equal! Next month it moves back to the Debit side as Balance b/d!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic2_study_note_bn.txt" : "topic2_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 2 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 2 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "লেজার ব্যালেন্সিং গাণিতিক সমতা নিশ্চিত করে এবং ট্রায়াল ব্যালেন্সের জন্য জের প্রস্তুত করে!"
                : "Balancing ledgers ensures arithmetic equality and prepares balances for Trial Balance!"
            }
          />
        </section>

      </div>
    </>
  );
}
