"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic1_files/topic1_questions";
import questionsBn from "./topic1_files/topic1_questions_bn";
import noteTextEn from "./topic1_files/topic1_note.txt?raw";
import noteTextBn from "./topic1_files/topic1_note_bn.txt?raw";

export default function Topic1() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("cash_sales");

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

  const scenarios = [{"id":"cash_sales","titleEn":"1. Cash Sales ₹50,000 (Cash A/c Dr to Sales A/c)","detailEn":"Cash Ledger Dr side: \"To Sales A/c ₹50,000\" | Sales Ledger Cr side: \"By Cash A/c ₹50,000\"","detailBn":"Cash লেজারের Dr পাশে: \"To Sales A/c ₹৫০,০০০\" | Sales লেজারের Cr পাশে: \"By Cash A/c ₹৫০,০০০\""},{"id":"rent_paid","titleEn":"2. Paid Shop Rent ₹12,000 in Cash","detailEn":"Rent Expense Dr side: \"To Cash A/c ₹12,000\" | Cash Ledger Cr side: \"By Rent Expense A/c ₹12,000\"","detailBn":"Rent Expense-এর Dr পাশে: \"To Cash A/c ₹১২,০০০\" | Cash লেজারের Cr পাশে: \"By Rent Expense A/c ₹১২,০০০\""},{"id":"credit_purchase","titleEn":"3. Credit Purchase ₹40,000 from Apex Ltd","detailEn":"Purchases Ledger Dr side: \"To Apex Ltd ₹40,000\" | Apex Ltd Creditor Cr side: \"By Purchases A/c ₹40,000\"","detailBn":"Purchases লেজারের Dr পাশে: \"To Apex Ltd ₹৪০,০০০\" | Apex Ltd পাওনাদারের Cr পাশে: \"By Purchases A/c ₹৪০,০০০\""},{"id":"bank_deposit","titleEn":"4. Deposited ₹25,000 Cash into SBI Bank","detailEn":"SBI Bank Dr side: \"To Cash A/c ₹25,000\" | Cash Ledger Cr side: \"By SBI Bank A/c ₹25,000\"","detailBn":"SBI Bank-এর Dr পাশে: \"To Cash A/c ২৫,০০০ টাকা\" | Cash লেজারের Cr পাশে: \"By SBI Bank A/c ২৫,০০০ টাকা\""}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["In TallyPrime, voucher entries are journalized in single-entry or double-entry voucher screens.","Tally automatically posts entries to respective ledgers instantly in real time.","View individual posted ledgers by pressing Alt+G -> Ledger Vouchers -> Select Ledger Name.","Check Dr and Cr columns in Tally report to verify double-entry posting rules."];
  const tallyStepsBn = ["TallyPrime-এ ভাউচার এন্ট্রি সেভ করার সাথেই সিস্টেম স্বয়ংক্রিয়ভাবে লেজার পোস্টিং সম্পন্ন করে।","প্রয়োজনে Alt+G চেপে লেজার ভাউচার রিপোর্টে যেকোনো লেজার ভিউ দেখতে পারেন।","ডাবল এন্ট্রি মেলানোর জন্য Dr এবং Cr টাকার কলাম পরীক্ষা করুন।"];

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
            <span>TallyPrime Master Series · Module 1.3 · Topic 1</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "লেজার পোস্টিংয়ের নিয়মাবলি: To (ডেবিট) ও By (ক্রেডিট) মাস্টারক্লাস" : "Rules of Ledger Posting: To (Debit) & By (Credit) Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "জাবেদা থেকে খতিয়ানে পোস্টিংয়ের সার্বজনীন \"To\" (ডেবিট) এবং \"By\" (ক্রেডিট) নীতিমালার ল্যাব।" : "Translating Journal entries into Ledger accounts using the universal \"To\" and \"By\" posting rules."}
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
                {isBengali ? "লেজার পোস্টিংয়ের নিয়মাবলি: To (ডেবিট) ও By (ক্রেডিট) মাস্টারক্লাস - মূল কাঠামো" : "Rules of Ledger Posting: To (Debit) & By (Credit) Masterclass - Core Framework"}
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
                {isBengali ? "১. ডেবিট লাইন পোস্টিং নিয়ম" : "1. Posting Debit Line Rules"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. ক্রেডিট লাইন পোস্টিং নিয়ম" : "2. Posting Credit Line Rules"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. ডেবিট লাইন পোস্টিং নিয়ম" : "1. Posting Debit Line Rules"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "লেজার পোস্টিংয়ের নিয়মাবলি: To (ডেবিট) ও By (ক্রেডিট) মাস্টারক্লাস" : "Rules of Ledger Posting: To (Debit) & By (Credit) Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "জার্নালে কোন লেজার ডেবিট হলে, খতিয়ানে তার ডেবিট পাশে যান। বিপরীত ক্রেডিট লেজারের নামের আগে \"To\" বসিয়ে বিবরণীতে লিখুন।" : "When an account is DEBITED in Journal, go to its Debit side in Ledger. Write the name of the CREDITED account prefixed with \"To\"."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. ক্রেডিট লাইন পোস্টিং নিয়ম" : "2. Posting Credit Line Rules"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "লেজার পোস্টিংয়ের নিয়মাবলি: To (ডেবিট) ও By (ক্রেডিট) মাস্টারক্লাস" : "Rules of Ledger Posting: To (Debit) & By (Credit) Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "জার্নালে কোন লেজার ক্রেডিট হলে, খতিয়ানে তার ক্রেডিট পাশে যান। বিপরীত ডেবিট লেজারের নামের আগে \"By\" বসিয়ে বিবরণীতে লিখুন।" : "When an account is CREDITED in Journal, go to its Credit side in Ledger. Write the name of the DEBITED account prefixed with \"By\"."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "জাবেদা থেকে খতিয়ান পোস্টিং সিমুলেটর" : "Journal-to-Ledger Posting Simulator"}</span>
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
            {[{"id":1,"titleEn":"Posting Rule Case 1: Credit Sale ₹45,000 to Apex Enterprises","titleBn":"পোস্টিং ক্ষেত্র ১: এপেক্স এন্টারপ্রাইজে বাকিতে বিক্রয় ৪৫,০০০ টাকা","drEn":"Apex Enterprises Debtor Ledger Dr Side: \"To Sales A/c ₹45,000\"","drBn":"এপেক্স এন্টারপ্রাইজ দেনাদার লেজার Dr পাশে: \"To Sales A/c ৪৫,০০০ টাকা\"","crEn":"Sales Ledger Cr Side: \"By Apex Enterprises ₹45,000\"","crBn":"Sales লেজার Cr পাশে: \"By Apex Enterprises ৪৫,০০০ টাকা\""},{"id":2,"titleEn":"Posting Rule Case 2: Paid Salary ₹30,000 to Accounts Manager","titleBn":"পোস্টিং ক্ষেত্র ২: অ্যাকাউন্টস ম্যানেজারকে বেতন প্রদান ৩০,০০০ টাকা","drEn":"Salary Expense Ledger Dr Side: \"To Cash A/c ₹30,000\"","drBn":"Salary Expense লেজার Dr পাশে: \"To Cash A/c ৩০,০০০ টাকা\"","crEn":"Cash Ledger Cr Side: \"By Salary Expense A/c ₹30,000\"","crBn":"Cash লেজার Cr পাশে: \"By Salary Expense A/c ৩০,০০০ টাকা\""},{"id":3,"titleEn":"Posting Rule Case 3: Credit Purchase ₹85,000 from Kolkata Suppliers","titleBn":"পোস্টিং ক্ষেত্র ৩: কলকাতা সাপ্লাইয়ার্স থেকে বাকিতে ক্রয় ৮৫,০০০ টাকা","drEn":"Purchases Ledger Dr Side: \"To Kolkata Suppliers ₹85,000\"","drBn":"Purchases লেজার Dr পাশে: \"To Kolkata Suppliers ৮৫,০০০ টাকা\"","crEn":"Kolkata Suppliers Creditor Cr Side: \"By Purchases A/c ₹85,000\"","crBn":"কলকাতা সাপ্লাইয়ার্স পাওনাদার Cr পাশে: \"By Purchases A/c ৮৫,০০০ টাকা\""}].map((ex) => (
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
                  {isBengali ? "সবসময় বিপরীত লেজারের নাম ডেবিট পাশে \"To\" এবং ক্রেডিট পাশে \"By\" দিয়ে লিখবেন!" : "Always write the opposite account name with \"To\" on Debit side and \"By\" on Credit side!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, বিবরণীর ঘরে নিজের নাম না লিখে বিপরীত লেজারের নাম লেখা হয় কেন?\"" : "\"Sir, why do we write the OPPOSITE account name in Particulars column?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"কারণ বিপরীত লেজারের নাম অডিটরকে জানায় টাকাটা কোথায় গেল বা কোথা থেকে এল! ডাবল-এন্ট্রির দ্বিতীয় দিক বোঝাতেই এই নিয়ম!\"" : "\"Writing the opposite account name explains the dual nature of the transaction! It tells the auditor where the second half of the money went or came from!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic1_study_note_bn.txt" : "topic1_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 1 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 1 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "সবসময় বিপরীত লেজারের নাম ডেবিট পাশে \"To\" এবং ক্রেডিট পাশে \"By\" দিয়ে লিখবেন!"
                : "Always write the opposite account name with \"To\" on Debit side and \"By\" on Credit side!"
            }
          />
        </section>

      </div>
    </>
  );
}
