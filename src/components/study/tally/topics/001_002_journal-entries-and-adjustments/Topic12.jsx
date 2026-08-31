"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic12_files/topic12_questions";
import questionsBn from "./topic12_files/topic12_questions_bn";
import noteTextEn from "./topic12_files/topic12_note.txt?raw";
import noteTextBn from "./topic12_files/topic12_note_bn.txt?raw";
import journalEntries from "./topic12_files/topic12_journal.json";

/**
 * Topic 12 – Year-End Closing Entries & Final Accounts Transfer Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic12() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("trading");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("net_profit_transfer");

  const scenarioData = {
    net_profit_transfer: {
      titleEn: "Transferred Financial Year Net Profit ₹1,45,000 to Proprietor Capital Account",
      titleBn: "আর্থিক বছরের অর্জিত নিট লাভ ১,৪৫,০০০ টাকা মালিকের Capital A/c-এ স্থানান্তর",
      categoryEn: "Net Profit Equity Transfer Entry",
      categoryBn: "নিট লাভ মূলধনে স্থানান্তর এন্ট্রি",
      debitRuleEn: "Debit Profit & Loss Account ₹1,45,000 (Zeroes out P&L Net Balance)",
      debitRuleBn: "Profit & Loss Account ডেবিট ১,৪৫,০০০ টাকা (P&L নিট জের শূন্যকরণ)",
      creditRuleEn: "Credit Proprietor Capital Account ₹1,45,000 (Increases Owner Equity)",
      creditRuleBn: "Proprietor Capital Account ক্রেডিট ১,৪৫,০০০ টাকা (মূলধন বৃদ্ধি)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Transfers final operational Net Profit into Capital Account at 31st March year end, zeroing out all nominal accounts.",
      explanationBn: "৩১শে মার্চ সমাপ্ত বছরে অর্জিত নিট লাভ মালিকের মূলধনে যোগ করে সমস্ত নামমাত্র হিসাব শূন্য করা হয়।"
    },
    closing_stock_entry: {
      titleEn: "Adjusted year-end physical Closing Inventory Stock-in-Trade ₹2,80,000",
      titleBn: "বছর শেষে গণনাকৃত সমাপনী মজুদ পণ্য (Closing Stock) ২,৮০,০০০ টাকা হিসাবভুক্তকরণ",
      categoryEn: "Closing Stock Adjustment Entry",
      categoryBn: "সমাপনী স্টক সমন্বয় এন্ট্রি",
      debitRuleEn: "Debit Stock-in-Trade / Closing Stock Account (Current Asset)",
      debitRuleBn: "Closing Stock Account ডেবিট (চলতি সম্পদ)",
      creditRuleEn: "Credit Trading Account (Reduces Cost of Goods Sold)",
      creditRuleBn: "Trading Account ক্রেডিট (বিক্রীত পণ্যের ব্যয় হ্রাস)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Physical closing inventory at 31st March is debited as Current Asset and credited to Trading Account.",
      explanationBn: "৩১শে মার্চে থাকা সমাপনী স্টক চলতি সম্পদ হিসেবে ডেবিট এবং Trading A/c-এ ক্রেডিট করে দেখানো হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 12</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "বছরের শেষের সমন্বয় এন্ট্রি (Year-End Closing) ও P&L ট্রান্সফার ল্যাব" : "Year-End Closing Entries & Final Accounts Transfer Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "অর্থবর্ষের শেষে সমস্ত নামমাত্র ব্যয় ও আয়ের হিসাব বন্ধ করে Trading A/c এবং Profit & Loss A/c-এ স্থানান্তরের সমাপনী এন্ট্রি।" : "Executing year-end adjustment entries and closing transfer entries to transfer nominal accounts to Trading and Profit & Loss Accounts."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & YEAR-END CLOSING HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Year-End Closing & Final Accounts ট্রান্সফার" : "Year-End Closing & Final Accounts Transfer Mechanics"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "৩১শে মার্চে সমস্ত নামমাত্র হিসাব (Nominal Accounts) বন্ধ করার নিয়মাবলি" : "Rules for transferring all nominal expense and revenue accounts to Trading & P&L A/c"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("trading")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "trading" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Trading Account Transfer" : "1. Trading Transfer"}
              </button>
              <button
                onClick={() => setActiveTab("pnl")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "pnl" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. P&L & Capital Transfer" : "2. P&L & Capital Transfer"}
              </button>
            </div>
          </div>

          {activeTab === "trading" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                DIRECT EXPENSES &amp; SALES TRANSFER
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Trading Account Closing Entries (মোট লাভ নির্ণয়)" : "Trading Account Closing Entries"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "৩১শে মার্চ সমাপ্ত বছরে Opening Stock, Purchases, Direct Wages ও Freight Trading A/c-এ ডেবিট করে স্থানান্তর করা হয় এবং Sales ও Closing Stock Trading A/c-এ ক্রেডিট করে Gross Profit নির্ণয় করা হয়।"
                  : "All direct cost of sales accounts (Opening Stock, Purchases, Carriage Inward) are transferred to Trading A/c to compute Gross Profit/Loss."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Trading Account Dr | Credit Opening Stock, Purchases &amp; Wages A/c (F7 Journal)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                INDIRECT EXPENSES &amp; NET PROFIT TRANSFER
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Profit & Loss Account & Net Profit Transfer (নিট লাভ স্থানান্তর)" : "Profit & Loss Closing & Net Profit Transfer"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "সমস্ত পরোক্ষ খরচ (Salaries, Rent, Depreciation) P&L-এ ডেবিট করে স্থানান্তর করা হয়। সর্বশেষে অর্জিত Net Profit মালিকের Capital Account-এ স্থানান্তর করা হয়।"
                  : "All indirect operating expenses are debited to P&L. Finally, Net Profit is transferred to Proprietor Capital Account, zeroing out nominal balances for the new year."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                <p>Expense Closing: Debit Profit &amp; Loss A/c Dr | Credit Salaries, Rent, Depreciation A/c</p>
                <p>Net Profit Transfer: Debit Profit &amp; Loss A/c Dr | Credit Proprietor Capital A/c Cr</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO CLOSING SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "বছরের শেষ ক্লোজিং এন্ট্রি সিমুলেটর" : "Year-End Closing Entry Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "ক্লোজিং এন্ট্রি ঘটনা বেছে নিন:" : "Select Closing Entry Scenario:"}
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
                  <span className="text-teal-400 block text-[11px]">Category</span>
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
                  {isBengali ? "Teacher's Desk: Year-End Closing আলোচনা" : "Teacher's Desk: Year-End Closing Discussion"}
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
                    ? "মনে রাখবেন—৩১শে মার্চ সমস্ত নামমাত্র হিসাব (Nominal Accounts) ট্রেডিং ও P&L-এ স্থানান্তরিত হয়ে শূন্য হয়ে যায়! কেবল সম্পদ (Assets), দায় (Liabilities) ও মূলধন (Capital) জের নতুন বছরে স্থানান্তরিত হয়।"
                    : "Remember: On 31st March, all nominal revenue and expense accounts close out to Trading & P&L and reset to zero! Only Real assets, Liabilities, and Capital carry forward!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ কি বছরের শেষে Closing Entries হাত দিয়ে করতে হয়?"' : '"Sir, does TallyPrime generate Year-End Closing entries automatically?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"Tally স্বয়ংক্রিয়ভাবে P&L এবং Balance Sheet তৈরি করে; কিন্তু ম্যানুয়াল অ্যাকাউন্টিং বইতে F7 Journal-এ Closing Entries দিয়ে খাতা সমাপনী করা শেখা জরুরি!"' : '"Tally automatically computes P&L and Balance Sheet; however, understanding manual F7 Closing Entries is essential for accounting mastery!"'}</em></p>
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
            title={isBengali ? "Year-End Closing অনুশীলনী ওয়ার্কশীট" : "Year-End Closing Practice Worksheet"}
            subtitle={isBengali ? "বছরের শেষ সমাপনী ও P&L স্থানান্তরের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for year-end closing entries and net profit capital transfers"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic12_study_note_bn.txt" : "topic12_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ১২ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 12 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "বছরের শেষে ফাইনাল অ্যাকাউন্টস ট্রান্সফার ও নিট লাভ স্থানান্তর শেখাই হলো হিসাবরক্ষণের পূর্ণতা!"
                : "Mastering final accounts transfers and net profit capital transfers completes the accounting cycle!"
            }
          />
        </section>

      </div>
    </>
  );
}
