"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic7_files/topic7_questions";
import questionsBn from "./topic7_files/topic7_questions_bn";
import noteTextEn from "./topic7_files/topic7_note.txt?raw";
import noteTextBn from "./topic7_files/topic7_note_bn.txt?raw";
import journalEntries from "./topic7_files/topic7_journal.json";

/**
 * Topic 7 – Accrual Accounting: Outstanding Expenses & Prepaid Expenses Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic7() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("outstanding");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("salary_due");

  const scenarioData = {
    salary_due: {
      titleEn: "Staff Salaries ₹25,000 for March 2026 unpaid at year end (31-Mar-2026)",
      titleBn: "মার্চ ২০২৬ মাসের কর্মচারীদের বেতন ২৫,০০০ টাকা ৩১শে মার্চ বকেয়া রয়েছে",
      categoryEn: "Outstanding Expense (Current Liability)",
      categoryBn: "বকেয়া খরচ (চলতি দায় - Liability)",
      debitRuleEn: "Debit Salary Expense Account (Increases Current Year Expense)",
      debitRuleBn: "Salary Expense Account ডেবিট (চলতি বছরের খরচ বৃদ্ধি)",
      creditRuleEn: "Credit Outstanding Salary Account (Creates Current Liability)",
      creditRuleBn: "Outstanding Salary Account ক্রেডিট (চলতি দায় সৃষ্টি)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Under Matching Principle, March salary belongs to current year even if paid in cash in April. F7 entry adjusts P&L.",
      explanationBn: "মেচিং নিয়ম অনুযায়ী মার্চ মাসের বেতন চলতি বছরের খরচ। এপ্রিলে নগদে দিলে তা F7 এন্ট্রির মাধ্যমে বকেয়া দায় হিসেবে দেখাতে হয়।"
    },
    prepaid_insurance: {
      titleEn: "Paid 1 Year Fire Insurance ₹12,000 on 01-Oct-2026 (6 months fall in next FY)",
      titleBn: "১লা অক্টোবর ১ বছরের ফায়ার ইন্স্যুরেন্স ১২,০০০ টাকা প্রদান (৬ মাস পরবর্তী বছরে পড়বে)",
      categoryEn: "Prepaid Expense Adjustment (Current Asset)",
      categoryBn: "অগ্রিম খরচ সমন্বয় (চলতি সম্পদ - Asset)",
      debitRuleEn: "Debit Prepaid Insurance Account ₹6,000 (Current Asset)",
      debitRuleBn: "Prepaid Insurance Account ডেবিট ₹৬,০০০ (চলতি সম্পদ)",
      creditRuleEn: "Credit Insurance Expense Account ₹6,00,0 (Reduces P&L Expense)",
      creditRuleBn: "Insurance Expense Account ক্রেডিট ₹৬,০০০ (চলতি খরচ হ্রাস)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "6 months insurance (₹6,000) belongs to next financial year. Debited as Prepaid Asset to match current year P&L.",
      explanationBn: "৬ মাসের বীমা (৬,০০০ টাকা) পরবর্তী অর্থবর্ষের। P&L সঠিক রাখার জন্য তা Prepaid Asset হিসেবে স্থানান্তর করা হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 7</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "বকেয়া খরচ (Outstanding) ও অগ্রিম খরচ (Prepaid Expenses) সমন্বয় ল্যাব" : "Accrual Accounting: Outstanding Expenses & Prepaid Expenses Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "চলতি অর্থবর্ষের বকেয়া পাওনা (Outstanding Liability) এবং পরবর্তী বছরের জন্য অগ্রিম প্রদত্ত খরচের (Prepaid Asset) অ্যাডজাস্টিং জার্নাল এন্ট্রি।" : "Journalizing routine operating expense payments, accrued outstanding expenses (liabilities), and prepaid expenses (deferred assets)."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & ACCRUAL EXPENSE HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Accrual Expense সমন্বয় মেকানিক্স" : "Accrual Expense Adjustment Mechanics"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "বকেয়া খরচ (Current Liability) বনাম অগ্রিম খরচ (Current Asset) সমন্বয় নিয়ম" : "Rules for year-end Outstanding Expense liabilities and Prepaid Expense deferred assets"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("outstanding")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "outstanding" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Outstanding Expense (Liability)" : "1. Outstanding Expense"}
              </button>
              <button
                onClick={() => setActiveTab("prepaid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "prepaid" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Prepaid Expense (Asset)" : "2. Prepaid Expense"}
              </button>
            </div>
          </div>

          {activeTab === "outstanding" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                CURRENT LIABILITY (Balance Sheet)
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Outstanding Expenses (বকেয়া খরচ)" : "Outstanding Expense Mechanics"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "চলতি হিসাব বছরে সুবিধা নেওয়া হয়ে গেছে (যেমন মার্চ মাসের বেতন বা ঘর ভাড়া), কিন্তু ৩১শে মার্চের মধ্যে নগদ পরিশোধ করা হয়নি। এটি চলতি দায় (Current Liability)।"
                  : "Expenses incurred in current financial year for which benefits have been received, but cash has not yet been paid by 31st March. Represents a Current Liability."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Expense Account Dr | Credit Outstanding Expense A/c Cr (Voucher: F7 Journal)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                CURRENT ASSET (Balance Sheet)
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Prepaid Expenses (অগ্রিম খরচ)" : "Prepaid Expense Mechanics"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "পরবর্তী অর্থবর্ষের খরচের টাকা চলতি বছরেই অগ্রিম পরিশোধ করা হয়েছে (যেমন ১ বছরের বীমা)। এটি চলতি সম্পদ (Current Asset) হিসেবে ব্যালেন্স শিটে দেখানো হয়।"
                  : "Expenses paid in cash during the current financial year whose benefit extends into the next accounting year. Carried forward as a Current Asset."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300">
                Entry: Debit Prepaid Expense Asset A/c Dr | Credit Expense Account Cr (Voucher: F7 Journal)
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO ACCRUAL SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "বকেয়া ও অগ্রিম খরচ সিমুলেটর" : "Accrual Expense Adjustment Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "সমন্বয় ঘটনা বেছে নিন:" : "Select Adjustment Scenario:"}
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
                  <span className="text-emerald-400 block text-[11px]">Debit Rule</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.debitRuleBn : currentSc.debitRuleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-sky-400 block text-[11px]">Credit Rule</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.creditRuleBn : currentSc.creditRuleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-teal-400 block text-[11px]">Balance Sheet Category</span>
                  <strong className="text-teal-300 text-xs block">{isBengali ? currentSc.categoryBn : currentSc.categoryEn}</strong>
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
                  {isBengali ? "Teacher's Desk: বকেয়া ও অগ্রিম খরচ আলোচনা" : "Teacher's Desk: Outstanding & Prepaid Discussion"}
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
                    ? "৩১শে মার্চে অডিট করার সময় মনে রাখুন—বকেয়া খরচ হলো একটি দায় (Liability), আর অগ্রিম প্রদত্ত টাকা হলো আপনার জমা সম্পদ (Asset)! দুটিই F7 জার্নাল ভাউচারে অ্যাডজাস্ট করা হয়।"
                    : "During 31st March audit, remember: Outstanding expense is a Current Liability, and Prepaid expense is a Current Asset! Both are adjusted via F7 Journal."}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, মার্চ মাসের বেতন এপ্রিলে দিলে কি ৩১শে মার্চ এন্ট্রি করতে হবে?"' : '"Sir, if March salary is paid in April, do we still pass an entry on 31st March?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"অবশ্যই! কারণ মেচিং নিয়ম অনুযায়ী মার্চ মাসের বেতন ওই বছরেরই খরচ। ৩১শে মার্চ F7 জার্নালে Salary A/c Dr এবং Outstanding Salary A/c Cr করতে হয়!"' : '"Absolutely! Under Matching Principle, March salary belongs to that year. You must debit Salary A/c and credit Outstanding Salary A/c on 31st March in F7!"'}</em></p>
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
            title={isBengali ? "বকেয়া ও অগ্রিম খরচ অনুশীলনী ওয়ার্কশীট" : "Outstanding & Prepaid Expense Practice Worksheet"}
            subtitle={isBengali ? "বকেয়া খরচ ও অগ্রিম খরচের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for outstanding expense liabilities and prepaid expense assets"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic7_study_note_bn.txt" : "topic7_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৭ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 7 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "বকেয়া খরচ ও অগ্রিম খরচের সমন্বয় শেখাই হলো বাণিজ্যিক এক্রুয়াল অ্যাকাউন্টিংয়ের মূল চাবিকাঠি!"
                : "Mastering outstanding and prepaid expense adjustments is the core key to commercial accrual accounting!"
            }
          />
        </section>

      </div>
    </>
  );
}
