"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic6_files/topic6_questions";
import questionsBn from "./topic6_files/topic6_questions_bn";
import noteTextEn from "./topic6_files/topic6_note.txt?raw";
import noteTextBn from "./topic6_files/topic6_note_bn.txt?raw";
import journalEntries from "./topic6_files/topic6_journal.json";

/**
 * Topic 6 – Trade Discount (Unrecorded) vs Cash Discount (Recorded) Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic6() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("trade");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("both_discounts");

  const scenarioData = {
    both_discounts: {
      titleEn: "Bought Goods List Price ₹1,00,000 at 10% Trade Discount & paid cash under 5% Cash Discount",
      titleBn: "১,০০,০০০ টাকার পণ্য ১০% ট্রেড ডিসকাউন্টে কিনে ৫% ক্যাশ ডিসকাউন্টে নগদ পরিশোধ",
      categoryEn: "Combined Trade & Cash Discount Transaction",
      categoryBn: "ট্রেড ও ক্যাশ ডিসকাউন্ট সমন্বিত লেনদেন",
      step1En: "List Price ₹1,00,000 - 10% Trade Discount (₹10,000) = Net Purchase Price ₹90,000 (UNRECORDED)",
      step1Bn: "তালিকা মূল্য ১,০০,০০০ - ১০% ট্রেড ডিসকাউন্ট (১০,০০০) = নিট ক্রয় মূল্য ৯০,০০০ টাকা (হিসাবে অনুলিখিত)",
      step2En: "Cash Discount = 5% of ₹90,000 = ₹4,500 (RECORDED as Discount Received Income)",
      step2Bn: "ক্যাশ ডিসকাউন্ট = ৯০,০০০ টাকার ৫% = ৪,৫০০ টাকা (Discount Received আয় হিসেবে লিপিবদ্ধ)",
      netCashEn: "Net Cash Paid = ₹90,000 - ₹4,500 = ₹85,500",
      netCashBn: "নিট পরিশোধিত নগদ টাকা = ৯০,০০০ - ৪,৫০০ = ৮৫,৫০০ টাকা",
      voucherEn: "F9 Purchase / F5 Payment Voucher",
      voucherBn: "F9 Purchase / F5 Payment Voucher",
      explanationEn: "Trade discount is deducted silently to fix purchase price at ₹90,000. Cash discount ₹4,500 is debited to Cash/credited to Discount Received.",
      explanationBn: "ট্রেড ডিসকাউন্ট না লিখে নিট মূল্য ৯০,০০০ টাকা ধরা হয় এবং ৪,৫০০ টাকা ক্যাশ ডিসকাউন্ট আয় হিসেবে খাতায় লেখা হয়।"
    },
    cash_discount_allowed: {
      titleEn: "Received ₹80,000 cheque from debtor & allowed ₹5,000 Cash Discount in full settlement",
      titleBn: "দেনাদারের থেকে ৮০,০০০ টাকার চেক প্রাপ্তি এবং ৫,০০০ টাকা ক্যাশ ডিসকাউন্ট প্রদান",
      categoryEn: "Cash Discount Allowed (Nominal Expense)",
      categoryBn: "ক্যাশ ডিসকাউন্ট প্রদান (আর্থিক খরচ)",
      step1En: "Debit Bank A/c ₹80,000 | Debit Discount Allowed A/c ₹5,000",
      step1Bn: "Bank A/c Dr ₹৮০,০০০ | Discount Allowed A/c Dr ₹৫,০০০",
      step2En: "Credit Debtor A/c ₹85,000 in full settlement",
      step2Bn: "Debtor A/c Cr ₹৮৫,০০০ (পূর্ণ নিষ্পত্তিতে)",
      netCashEn: "Financial Expense: Discount Allowed ₹5,000 recorded in P&L",
      netCashBn: "আর্থিক খরচ: Discount Allowed ₹৫,০০০ P&L-এ ডেবিট করা হয়",
      voucherEn: "F6 Receipt Voucher",
      voucherBn: "F6 Receipt Voucher",
      explanationEn: "Prompt payment cash discount allowed to customer is debited as financial expense.",
      explanationBn: "দ্রুত টাকা আদায়ের জন্য খদ্দেরকে ছাড় দেওয়া ক্যাশ ডিসকাউন্ট খরচ হিসেবে খাতায় ডেবিট করতে হয়।"
    }
  };

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
  const currentSc = scenarioData[selectedScenarioKey];

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
        
        {/* BILINGUAL LANGUAGE TOGGLE CONTROL */}
        <div ref={addRef} className="reveal-section">
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>

        {/* HERO HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>📊</span>
            <span>TallyPrime Master Series · Module 1.2 · Topic 6</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "ট্রেড ডিসকাউন্ট বনাম ক্যাশ ডিসকাউন্ট (Discount Allowed/Received) ল্যাব" : "Trade Discount (Unrecorded) vs Cash Discount (Recorded) Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ইনভয়েসের মূল্য থেকে সরাসরি বাদ যাওয়া ট্রেড ডিসকাউন্ট এবং সময়মতো অর্থ পরিশোধে প্রাপ্য ক্যাশ ডিসকাউন্টের অ্যাকাউন্টিং নিয়ম।" : "Understanding Trade Discount (deducted on invoice, not entered in accounts) versus Cash Discount (recorded as financial expense/income)."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & DISCOUNT HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "ট্রেড বনাম ক্যাশ ডিসকাউন্ট মেকানিক্স" : "Trade Discount vs Cash Discount Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "অনুলিখিত বাণিজ্যিক ছাড় বনাম হিসাবভুক্ত আর্থিক বাট্টা নিষ্পত্তির নিয়ম" : "Unrecorded catalog reduction vs recorded financial prompt payment discount"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("trade")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "trade" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Trade Discount (Unrecorded)" : "1. Trade Discount"}
              </button>
              <button
                onClick={() => setActiveTab("cash")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "cash" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Cash Discount (Recorded)" : "2. Cash Discount"}
              </button>
            </div>
          </div>

          {activeTab === "trade" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                UNRECORDED IN ACCOUNTING BOOKS
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Trade Discount (বাণিজ্যিক ডিসকাউন্ট)" : "Trade Discount Principles"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "পণ্য বিক্রয় বৃদ্ধির জন্য বা পাইকারি ক্রয়ে ক্যাটালগ মূল্যের ওপর যে ছাড় দেওয়া হয়। এটি হিসাবের খাতায় আলাদাভাবে কোনো এন্ট্রি পায় না; সরাসরি ইনভয়েসের দাম থেকে বাদ দিয়ে নিট মূল্যে জার্নাল এন্ট্রি করা হয়।"
                  : "Reduction allowed by seller off the catalog/list price at the time of sale. Trade discount is NEVER recorded in journal books; entries are passed at net invoice price."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Formula: Net Invoice Price = List Catalog Price - Trade Discount Amount
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                RECORDED AS EXPENSE / INCOME
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Cash Discount (ক্যাশ ডিসকাউন্ট বা বাট্টা)" : "Cash Discount Principles"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "নির্ধারিত সময়ের মধ্যে দ্রুত নগদ বা ব্যাংক অর্থ আদায়/পরিশোধের জন্য যে ছাড় দেওয়া হয়। এটি হিসাবের খাতায় আর্থিক আয় (Discount Received) বা আর্থিক খরচ (Discount Allowed) হিসেবে ডেবিট/ক্রেডিট করতে হয়।"
                  : "Reduction granted to debtors for prompt cash/cheque settlement within credit period. RECORDED in accounting books as Discount Allowed (Expense) or Discount Received (Income)."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                <p>Discount Allowed: Nominal Expense -&gt; Debit Discount Allowed A/c</p>
                <p>Discount Received: Nominal Income -&gt; Credit Discount Received A/c</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO DISCOUNT SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "ডিসকাউন্ট গণনাকারী সিমুলেটর" : "Discount Calculation Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "ডিসকাউন্ট লেনদেন বেছে নিন:" : "Select Discount Scenario:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.keys(scenarioData).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedScenarioKey(key)}
                    className={`p-3 rounded-xl text-left text-xs font-mono font-bold transition border ${
                      selectedScenarioKey === key
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-lg"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isBengali ? scenarioData[key].titleBn : scenarioData[key].titleEn}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  {isBengali ? currentSc.titleBn : currentSc.titleEn}
                </h3>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-teal-300 font-mono text-xs font-bold w-fit">
                  Tally Key: {isBengali ? currentSc.voucherBn : currentSc.voucherEn}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isBengali ? currentSc.explanationBn : currentSc.explanationEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 block text-[11px]">Step 1 (Trade Discount)</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.step1Bn : currentSc.step1En}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-sky-400 block text-[11px]">Step 2 (Cash Discount)</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.step2Bn : currentSc.step2En}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-teal-400 block text-[11px]">Net Cash / Settlement</span>
                  <strong className="text-teal-300 text-xs block">{isBengali ? currentSc.netCashBn : currentSc.netCashEn}</strong>
                </div>
              </div>
            </div>
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
                  {isBengali ? "Teacher's Desk: Trade বনাম Cash ডিসকাউন্ট আলোচনা" : "Teacher's Desk: Trade vs Cash Discount Discussion"}
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
                  {isBengali
                    ? "গোল্ডেন রুল মনে রাখুন—ট্রেড ডিসকাউন্ট ইনভয়েসের দাম কমায় কিন্তু খাতায় লেখা হয় না! আর ক্যাশ ডিসকাউন্ট নগদ নিষ্পত্তির সময় খাতায় Discount Allowed (খরচ) বা Discount Received (আয়) হিসেবে লেখা হয়!"
                    : "Golden Rule: Trade discount reduces invoice price silently without entering books. Cash discount is recorded in books as Discount Allowed (Expense) or Discount Received (Income)!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, ট্রেড ডিসকাউন্ট ও ক্যাশ ডিসকাউন্ট দুটি একসাথে থাকলে ক্যাশ ডিসকাউন্ট কীভাবে হিসাব করতে হয়?"' : '"Sir, if both Trade and Cash discounts are present, on which amount do we calculate Cash Discount?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"প্রথমে ক্যাটালগ মূল্য থেকে ট্রেড ডিসকাউন্ট বাদ দিয়ে নিট মূল্য বের করতে হয়, তারপর সেই নিট মূল্যের ওপর ক্যাশ ডিসকাউন্ট হিসেব করতে হয়!"' : '"First deduct Trade Discount to find Net Invoice Price, then calculate Cash Discount percentage on that Net Invoice Price!"'}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRACTICAL COMMERCIAL EXAMPLES & JOURNAL VIEWER ENGINE SECTION */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <JournalViewerEngine
            entries={journalEntries}
            title={isBengali ? "ডিসকাউন্ট অনুশীলনী ওয়ার্কশীট" : "Trade & Cash Discount Practice Worksheet"}
            subtitle={isBengali ? "ট্রেড ডিসকাউন্ট ও ক্যাশ ডিসকাউন্ট লেনদেনের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for trade discount invoice pricing and cash discount settlements"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic6_study_note_bn.txt" : "topic6_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৬ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 6 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "ট্রেড ডিসকাউন্ট (অনুলিখিত) এবং ক্যাশ ডিসকাউন্ট (হিসাবভুক্ত)-এর গণনা নির্ভুল করা বাণিজ্য শিক্ষার্থীদের মৌলিক যোগ্যতা!"
                : "Calculating Trade Discount (unrecorded) and Cash Discount (recorded) accurately is fundamental for accounting students!"
            }
          />
        </section>

      </div>
    </>
  );
}
