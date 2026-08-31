"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic4_files/topic4_questions";
import questionsBn from "./topic4_files/topic4_questions_bn";
import noteTextEn from "./topic4_files/topic4_note.txt?raw";
import noteTextBn from "./topic4_files/topic4_note_bn.txt?raw";

export default function Topic4() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("bank_dr");

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

  const scenarios = [{"id":"bank_dr","titleEn":"1. SBI Bank A/c (Debit Balance ₹1,50,000)","detailEn":"Interpretation: Liquid Current Asset available in bank vault.","detailBn":"ব্যাখ্যা: ব্যাংকে জমা থাকা তরল চলতি সম্পদ।"},{"id":"creditor_cr","titleEn":"2. Bengal Electricals A/c (Credit Balance ₹40,000)","detailEn":"Interpretation: Current Trade Liability owed to vendor for credit purchases.","detailBn":"ব্যাখ্যা: পাওনাদারকে বাকিতে কেনা মালের জন্য প্রদেয় চলতি দায়।"},{"id":"rent_exp","titleEn":"3. Shop Rent Expense A/c (Debit Total ₹1,20,000)","detailEn":"Interpretation: Accumulation of 12 months operating expense; closes to P&L A/c.","detailBn":"ব্যাখ্যা: ১২ মাসের পরিচালন খরচ; বছর শেষে P&L-এ গিয়ে বন্ধ হবে।"}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["In TallyPrime, Profit & Loss Account groups all Nominal accounts under Sales, Purchase, Direct/Indirect Expenses.","Balance Sheet groups Real & Personal accounts under Assets and Liabilities."];
  const tallyStepsBn = ["TallyPrime-এ Profit & Loss A/c সমস্ত নামমাত্র আয়-ব্যয়ের হিসাবগুলোকে সাজায়।","Balance Sheet সমস্ত সম্পত্তিবাচক ও ব্যক্তিবাচক হিসাবগুলোকে সম্পদ ও দায় হিসেবে গ্রুপ করে।"];

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
            <span>TallyPrime Master Series · Module 1.3 · Topic 4</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "লেজার ব্যালেন্সের ব্যাখ্যা: Personal, Real ও Nominal অ্যাকাউন্টের জের মাস্টারক্লাস" : "Interpreting Ledger Balances: Personal, Real & Nominal Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ব্যক্তিবাচক (Personal), সম্পত্তিবাচক (Real) এবং নামমাত্র (Nominal) লেজার ব্যালেন্সের অর্থনৈতিক ব্যাখ্যার ল্যাব।" : "Decoding the practical accounting meanings of Debit and Credit balances across Personal, Real, and Nominal ledgers."}
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
                {isBengali ? "লেজার ব্যালেন্সের ব্যাখ্যা: Personal, Real ও Nominal অ্যাকাউন্টের জের মাস্টারক্লাস - মূল কাঠামো" : "Interpreting Ledger Balances: Personal, Real & Nominal Masterclass - Core Framework"}
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
                {isBengali ? "১. Real ও Personal Accounts" : "1. Real & Personal Accounts"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Nominal Accounts" : "2. Nominal Accounts"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. Real ও Personal Accounts" : "1. Real & Personal Accounts"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "লেজার ব্যালেন্সের ব্যাখ্যা: Personal, Real ও Nominal অ্যাকাউন্টের জের মাস্টারক্লাস" : "Interpreting Ledger Balances: Personal, Real & Nominal Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "Real Accounts (নগদ, সম্পত্তি) সর্বদা Dr বা শূন্য জের দেখায়। Personal Accounts-এ দেনাদার Dr জের (পাওনা আছে) এবং পাওনাদার Cr জের (দেনা আছে) দেখায়।" : "Real accounts (Cash, Plant, Stock) show Debit or Nil balance. Personal Debtors show Dr balance (Customer owes us); Creditors show Cr balance (We owe vendor)."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. Nominal Accounts" : "2. Nominal Accounts"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "লেজার ব্যালেন্সের ব্যাখ্যা: Personal, Real ও Nominal অ্যাকাউন্টের জের মাস্টারক্লাস" : "Interpreting Ledger Balances: Personal, Real & Nominal Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "Nominal Accounts বছরজুড়ে খরচ (Dr) বা আয় (Cr) জমায় এবং বছর শেষে Trading & Profit and Loss A/c-এ স্থানান্তরিত হয়ে শূন্য হয়ে যায়।" : "Nominal accounts (Rent, Salary, Sales, Interest) accumulate expenses (Dr) or incomes (Cr) during the year and close to Trading/P&L at year-end."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "লেজার ব্যালেন্স ইন্টারপ্রেটার" : "Ledger Balance Interpreter"}</span>
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
            {[{"id":1,"titleEn":"Interpretation Case 1: Customer Account Debit Balance ₹55,000","titleBn":"ব্যাখ্যা ক্ষেত্র ১: দেনাদার হিসাব ডেবিট জের ৫৫,০০০ টাকা","drEn":"Account Type: Personal Sundry Debtor. Meaning: Customer owes ₹55,000 for credit sales.","drBn":"হিসাবের ধরন: দেনাদার। অর্থ: গ্রাহকের কাছে ৫৫,০০০ টাকা পাওয়া বাকি।","crEn":"Position: Current Asset on Balance Sheet.","crBn":"অবস্থান: ব্যালেন্স শিটের চলতি সম্পদ।"},{"id":2,"titleEn":"Interpretation Case 2: Sales Revenue Account Credit Total ₹6,80,000","titleBn":"ব্যাখ্যা ক্ষেত্র ২: বিক্রয় আয় হিসাব ক্রেডিট যোগফল ৬,৮০,০০০ টাকা","drEn":"Account Type: Nominal Revenue Income. Meaning: Total sales generated during the year.","drBn":"হিসাবের ধরন: নামমাত্র আয়। অর্থ: সারা বছর তৈরি হওয়া মোট বিক্রয় আয়।","crEn":"Position: Transferred to Trading Account Credit side; closes to zero at year end.","crBn":"অবস্থান: Trading A/c-এর ক্রেডিট পাশে গিয়ে বছর শেষে শূন্য হয়।"}].map((ex) => (
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
                  {isBengali ? "Real ও Personal অ্যাকাউন্টের জের ব্যালেন্স শিটে যায়; আর Nominal জের P&L-এ গিয়ে বন্ধ হয়!" : "Real & Personal balances carry forward into Balance Sheet; Nominal balances close into P&L!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, নতুন বছরে Nominal অ্যাকাউন্টে কেন কোনো Balance b/d থাকে না?\"" : "\"Sir, why don't Nominal accounts have Balance b/d in the new financial year?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"কারণ নামমাত্র আয়-ব্যয়ের হিসাব বছর শেষে Trading ও P&L-এ পাঠিয় জিরো করে দেওয়া হয়, তাই নতুন বছরে কোনো b/d থাকে না!\"" : "\"Because nominal accounts are closed to zero at year-end by transferring their totals to Trading and P&L Accounts!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic4_study_note_bn.txt" : "topic4_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 4 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 4 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "Real ও Personal অ্যাকাউন্টের জের ব্যালেন্স শিটে যায়; আর Nominal জের P&L-এ গিয়ে বন্ধ হয়!"
                : "Real & Personal balances carry forward into Balance Sheet; Nominal balances close into P&L!"
            }
          />
        </section>

      </div>
    </>
  );
}
