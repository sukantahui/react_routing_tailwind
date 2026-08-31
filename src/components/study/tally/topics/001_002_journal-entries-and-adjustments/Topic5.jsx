"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic5_files/topic5_questions";
import questionsBn from "./topic5_files/topic5_questions_bn";
import noteTextEn from "./topic5_files/topic5_note.txt?raw";
import noteTextBn from "./topic5_files/topic5_note_bn.txt?raw";
import journalEntries from "./topic5_files/topic5_journal.json";

/**
 * Topic 5 – Return Outward (Debit Note) & Return Inward (Credit Note) Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic5() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("outward");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("vendor_return");

  const scenarioData = {
    vendor_return: {
      titleEn: "Returned Defective Merchandise ₹15,000 to Supplier Apex Electronics",
      titleBn: "পাওনাদার অ্যাপেক্স ইলেকট্রনিক্সকে ১৫,০০০ টাকার ত্রুটিপূর্ণ পণ্য ফেরত প্রদান",
      categoryEn: "Return Outward (Debit Note Issued)",
      categoryBn: "ক্রয় ফেরত / রিটার্ন আউটওয়ার্ড (ডেবিট নোট ইস্যু)",
      debitRuleEn: "Debit Apex Electronics A/c (Reduces Sundry Creditor Liability)",
      debitRuleBn: "Apex Electronics A/c ডেবিট (মহাজন দেনা হ্রাস)",
      creditRuleEn: "Credit Return Outward Account (Reduces Purchase Cost)",
      creditRuleBn: "Return Outward Account ক্রেডিট (ক্রয় খরচ হ্রাস)",
      voucherEn: "F7 Journal / Alt+F5 Debit Note",
      voucherBn: "F7 Journal / Alt+F5 Debit Note",
      explanationEn: "Issuing a Debit Note to vendor reduces supplier liability while crediting Return Outward Account.",
      explanationBn: "সরবরাহকারীকে ডেবিট নোট পাঠালে তার দায় কমে এবং Return Outward A/c ক্রেডিট হয়।"
    },
    customer_return: {
      titleEn: "Customer Sharma Traders returned Damaged Goods ₹10,000",
      titleBn: "গ্রাহক শর্মা ট্রেডার্স ১০,০০০ টাকার ক্ষতিগ্রস্ত পণ্য ফেরত পাঠালেন",
      categoryEn: "Return Inward (Credit Note Issued)",
      categoryBn: "বিক্রয় ফেরত / রিটার্ন ইনওয়ার্ড (ক্রেডিট নোট ইস্যু)",
      debitRuleEn: "Debit Return Inward Account (Reduces Net Sales Turnover)",
      debitRuleBn: "Return Inward Account ডেবিট (বিক্রয় রাজস্ব হ্রাস)",
      creditRuleEn: "Credit Sharma Traders A/c (Reduces Sundry Debtor Asset)",
      creditRuleBn: "Sharma Traders A/c ক্রেডিট (দেনাদার পাওনা হ্রাস)",
      voucherEn: "F7 Journal / Alt+F6 Credit Note",
      voucherBn: "F7 Journal / Alt+F6 Credit Note",
      explanationEn: "Issuing a Credit Note to customer reduces trade receivable asset while debiting Return Inward Account.",
      explanationBn: "গ্রাহককে ক্রেডিট নোট পাঠালে দেনাদারের পাওনা কমে এবং Return Inward A/c ডেবিট হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 5</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "Return Outward (ডেবিট নোট) ও Return Inward (ক্রেডিট নোট) ল্যাব" : "Return Outward (Debit Note) & Return Inward (Credit Note) Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ক্রয়কৃত ত্রুটিপূর্ণ পণ্য মহাজনকে ফেরত দেওয়া এবং খদ্দেরের ফেরত আসা বিক্রীত পণ্যের ডেবিট ও ক্রেডিট নোট অ্যাকাউন্টিং।" : "Accounting for goods returned to vendors (Return Outward / Debit Note) and goods returned by customers (Return Inward / Credit Note)."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & RETURNS HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Return Outward বনাম Return Inward মেকানিক্স" : "Return Outward vs Return Inward Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "ক্রয় ফেরত (ডেবিট নোট) ও বিক্রয় ফেরত (ক্রেডিট নোট)-এর অডিট ও এন্ট্রি নিয়মাবলি" : "Legal rules for Debit Note vendor returns and Credit Note customer returns"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("outward")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "outward" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Return Outward (Debit Note)" : "1. Return Outward"}
              </button>
              <button
                onClick={() => setActiveTab("inward")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "inward" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Return Inward (Credit Note)" : "2. Return Inward"}
              </button>
            </div>
          </div>

          {activeTab === "outward" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                DEBIT NOTE ISSUED TO VENDOR
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Return Outward Account (ক্রয় ফেরত)" : "Return Outward Account"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "সাপ্লায়ারের থেকে কেনা ত্রুটিপূর্ণ বা ক্ষতিগ্রস্ত পণ্য ফেরত পাঠানো হলে তা 'Return Outward Account'-এ ক্রেডিট করতে হয় এবং সাপ্লায়ারকে ডেবিট করে দেনা কমানো হয়।"
                  : "Goods returned to suppliers due to defects or damage are credited to Return Outward Account and deducted from Gross Purchases in Trading A/c."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Sundry Creditor A/c Dr | Credit Return Outward Account Cr (Document: Debit Note)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                CREDIT NOTE ISSUED TO CUSTOMER
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Return Inward Account (বিক্রয় ফেরত)" : "Return Inward Account"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "গ্রাহক কর্তৃক বিক্রীত পণ্য ফেরত এলে তা 'Return Inward Account'-এ ডেবিট করে বিক্রয় রাজস্ব কমানো হয় এবং গ্রাহকের অ্যাকাউন্ট ক্রেডিট করে পাওনা কমানো হয়।"
                  : "Merchandise returned by customers is debited to Return Inward Account and deducted from Gross Sales Turnover in Trading A/c."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300">
                Entry: Debit Return Inward Account Dr | Credit Sundry Debtor A/c Cr (Document: Credit Note)
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO RETURNS SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "রিটার্ন নোট প্র্যাকটিক্যাল সিমুলেটর" : "Return Note Practical Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "পণ্য ফেরত ঘটনা বেছে নিন:" : "Select Return Scenario:"}
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
                  <span className="text-teal-400 block text-[11px]">Legal Document</span>
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
                  {isBengali ? "Teacher's Desk: Return Outward ও Return Inward আলোচনা" : "Teacher's Desk: Return Outward & Inward Discussion"}
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
                    ? "সহজ ভাষায় মনে রাখুন—যে পণ্য দোকান থেকে বাইরের সরবরাহকারীর কাছে চলে যাচ্ছে তা Return Outward, আর যা গ্রাহকের কাছ থেকে দোকানে ফেরত আসছে তা Return Inward!"
                    : "Simple mnemonic: Goods going OUT back to supplier is Return Outward; Goods coming IN from customer is Return Inward!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ ডেবিট নোট ও ক্রেডিট নোটের শর্টকাট কী কী?"' : '"Sir, what are the shortcut keys for Debit Note and Credit Note in TallyPrime?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"Tally-তে Alt+F5 হলো Debit Note (Return Outward) এবং Alt+F6 হলো Credit Note (Return Inward)!"' : '"In Tally, Alt+F5 opens Debit Note (Return Outward) and Alt+F6 opens Credit Note (Return Inward)!"'}</em></p>
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
            title={isBengali ? "Return Outward ও Return Inward অনুশীলনী ওয়ার্কশীট" : "Return Outward & Return Inward Practice Worksheet"}
            subtitle={isBengali ? "পণ্য ফেরত সংক্রান্ত ডেবিট নোট ও ক্রেডিট নোটের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for vendor and customer return notes"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic5_study_note_bn.txt" : "topic5_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৫ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 5 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "Return Outward এবং Return Inward-এর আইনি শব্দচয়ন জানা প্রতিটি হিসাবরক্ষকের প্রধান কাজ!"
                : "Mastering Return Outward and Return Inward terminology and legal notes is essential for accurate accounting!"
            }
          />
        </section>

      </div>
    </>
  );
}
