"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic10_files/topic10_questions";
import questionsBn from "./topic10_files/topic10_questions_bn";
import noteTextEn from "./topic10_files/topic10_note.txt?raw";
import noteTextBn from "./topic10_files/topic10_note_bn.txt?raw";
import journalEntries from "./topic10_files/topic10_journal.json";

/**
 * Topic 10 – Bad Debts Write-off & Provision for Doubtful Debts Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic10() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("bad_debts");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("insolvent_debtor");

  const scenarioData = {
    insolvent_debtor: {
      titleEn: "Debtor Sen Traders declared insolvent by court; write off full balance ₹18,000",
      titleBn: "দেনাদার সেন ট্রেডার্স আদালত কর্তৃক দেউলিয়া ঘোষিত; পূর্ণ পাওনা ১৮,০০০ টাকা মকুব",
      categoryEn: "Actual Bad Debt Write-Off (Loss)",
      categoryBn: "প্রকৃত অনাদায়ী পাওনা বা কুঋণ মকুব (ক্ষতি)",
      debitRuleEn: "Debit Bad Debts Account (Nominal Loss Expense)",
      debitRuleBn: "Bad Debts Account ডেবিট (নামিক ক্ষতি খরচ)",
      creditRuleEn: "Credit Sen Traders A/c (Removes Insolvent Debtor Asset)",
      creditRuleBn: "Sen Traders A/c ক্রেডিট (দেউলিয়া দেনাদার সম্পদ বাতিল)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Confirmed irrecoverable debt is written off by debiting Bad Debts Account and crediting customer ledger in F7 Journal.",
      explanationBn: "আদায়ের অযোগ্য নিশ্চিত দেনা Bad Debts A/c-এ ডেবিট করে গ্রাহকের অ্যাকাউন্ট থেকে বাদ দিতে হয়।"
    },
    provision_created: {
      titleEn: "Created 5% Provision for Doubtful Debts on closing Debtors ₹2,00,000 at year end",
      titleBn: "বছর শেষে দেনাদার ২,০০,০০০ টাকার ওপর ৫% সন্দেহজনক পাওনা সঞ্চিতি (₹১০,০০০) গঠন",
      categoryEn: "Provision for Doubtful Debts (Prudence Principle)",
      categoryBn: "সন্দেহজনক পাওনা সঞ্চিতি গঠন (সতর্কতা নীতি)",
      debitRuleEn: "Debit Profit & Loss Account ₹10,000",
      debitRuleBn: "Profit & Loss Account ডেবিট ₹১০,০০০",
      creditRuleEn: "Credit Provision for Doubtful Debts A/c ₹10,000",
      creditRuleBn: "Provision for Doubtful Debts A/c ক্রেডিট ₹১০,০০০",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Under Prudence Principle, future expected credit losses are anticipated by creating a provision at year-end.",
      explanationBn: "সতর্কতা বা Prudence নীতি অনুযায়ী ভবিষ্যৎ সম্ভাব্য ঋণের ক্ষতি মোকাবেলায় সঞ্চিতি গঠন করে P&L-এ ডেবিট করা হয়।"
    },
    bad_debt_recovered: {
      titleEn: "Received cash ₹5,000 unexpectedly from Sen Traders previously written off as Bad Debt",
      titleBn: "পূর্বে মকুবকৃত সেন ট্রেডার্সের থেকে অপ্রত্যাশিতভাবে নগদে ৫,০০০ টাকা আদায়",
      categoryEn: "Bad Debts Recovered (Gain / Revenue Income)",
      categoryBn: "কুঋণ আদায় (অপ্রত্যাশিত আয়)",
      debitRuleEn: "Debit Cash Account ₹5,000 (Increases Cash Asset)",
      debitRuleBn: "Cash Account ডেবিট ₹৫,০০০ (নগদ সম্পদ বৃদ্ধি)",
      creditRuleEn: "Credit Bad Debts Recovered Account ₹5,000 (Indirect Income)",
      creditRuleBn: "Bad Debts Recovered Account ক্রেডিট ₹৫,০০০ (পরোক্ষ আয়)",
      voucherEn: "F6 Receipt Voucher",
      voucherBn: "F6 Receipt Voucher",
      explanationEn: "Recovery of a written-off debt is credited to Bad Debts Recovered Account as indirect income, NOT to customer ledger.",
      explanationBn: "পূর্বে মকুবকৃত দেনা আদায় হলে তা সরাসরি Bad Debts Recovered A/c-এ ক্রেডিট করে আয় হিসেব করা হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 10</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "অনাদায়ী পাওনা (Bad Debts) ও সন্দেহজনক পাওনা সঞ্চিতি ল্যাব" : "Bad Debts Write-off & Provision for Doubtful Debts Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "দেউলিয়া বা অনাদায়ী দেনাদারের পাওনা অর্থ মকুব (Bad Debts Write-off) এবং সম্ভাব্য ক্ষতির বিরুদ্ধে প্রুডেন্স সঞ্চিতি গঠন।" : "Writing off irrecoverable trade debtor balances as Bad Debt expenses and establishing Provision for Doubtful Debts under prudence."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & BAD DEBT HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Bad Debts & Provision মেকানিক্স হাব" : "Bad Debts & Provision Mechanics Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "কুঋণ মকুব, সন্দেহজনক পাওনা সঞ্চিতি এবং কুঋণ আদায়ের সঠিক অ্যাকাউন্টিং নিয়ম" : "Rules for Bad Debt write-offs, Doubtful Debt provisions, and Bad Debt recovery receipts"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("bad_debts")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "bad_debts" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Bad Debts Write-Off" : "1. Bad Debts Write-off"}
              </button>
              <button
                onClick={() => setActiveTab("provision")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "provision" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Provision & Recovered" : "2. Provision & Recovery"}
              </button>
            </div>
          </div>

          {activeTab === "bad_debts" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                ACTUAL REALIZED LOSS WRITE-OFF
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Bad Debts Write-Off (কুঋণ বা অনাদায়ী পাওনা মকুব)" : "Bad Debts Write-Off Mechanics"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "যখন দেনাদার বা খদ্দের দেউলিয়া হয়ে যায় বা নিশ্চিতভাবে তার থেকে টাকা পাওয়ার আশা থাকে না, তখন সেই দেনা Bad Debts Account-এ ডেবিট করে খাতা থেকে মুছে দেওয়া হয়।"
                  : "When a customer is declared bankrupt or debt becomes legally uncollectible, it is written off as Bad Debt expense in P&L via F7 Journal."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Bad Debts Account Dr | Credit Sundry Debtor A/c Cr (Voucher: F7 Journal)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                PRUDENCE PROVISION &amp; UNEXPECTED RECOVERY
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Provision & Bad Debt Recovered (সঞ্চিতি ও পুনরুদ্ধার)" : "Provision & Bad Debt Recovery Rules"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "সতর্কতা নীতি অনুযায়ী ভবিষ্যৎ সম্ভাব্য ঋণের জন্য গঠিত সঞ্চিতি Provision A/c-এ ক্রেডিট হয়। আর পূর্বে মকুবকৃত টাকা অপ্রত্যাশিতভাবে ফেরত এলে তা Bad Debts Recovered A/c-এ ক্রেডিট হয়।"
                  : "Provisions anticipate potential future defaults under Prudence. Recovery of a previously written-off debt is credited directly to Bad Debts Recovered Account as indirect income."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                <p>Provision Entry: Debit Profit &amp; Loss A/c Dr | Credit Provision for Doubtful Debts Cr</p>
                <p>Recovery Entry: Debit Cash/Bank A/c Dr | Credit Bad Debts Recovered A/c Cr (F6 Receipt)</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO BAD DEBT SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "কুঋণ ও সঞ্চিতি এন্ট্রি সিমুলেটর" : "Bad Debt & Provision Entry Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "অনাদায়ী পাওনা ঘটনা বেছে নিন:" : "Select Bad Debt Scenario:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
                  {isBengali ? "Teacher's Desk: Bad Debts ও সঞ্চিতি আলোচনা" : "Teacher's Desk: Bad Debts & Provision Discussion"}
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
                    ? "যদি পূর্বে মকুব করা কুঋণের টাকা ভবিষ্যতে অপ্রত্যাশিতভাবে পাওয়া যায়, তবে দেনাদারের খাতায় জমা না দিয়ে সরাসরি Bad Debts Recovered A/c-এ ক্রেডিট করতে হয়!"
                    : "If a previously written-off debt is recovered unexpectedly, credit Bad Debts Recovered Account directly as income, NOT the customer ledger!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, দেউলিয়া দেনাদারের থেকে কিছুটা টাকা পাওয়া গেলে বাকিটা কী হবে?"' : '"Sir, if an insolvent debtor pays partial money, what happens to the remaining balance?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"যতটা পাওয়া গেল তা Cash/Bank-এ ডেবিট হবে, আর বাকিটা Bad Debts A/c-এ ডেবিট হয়ে মোট পাওনা ক্রেডিট হবে!"' : '"The received cash is debited to Cash/Bank, and the unpaid balance is debited to Bad Debts A/c in a single compound entry!"'}</em></p>
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
            title={isBengali ? "Bad Debts ও সঞ্চিতি অনুশীলনী ওয়ার্কশীট" : "Bad Debts & Provision Practice Worksheet"}
            subtitle={isBengali ? "অনাদায়ী পাওনা মকুব ও সন্দেহজনক পাওনা সঞ্চিতির ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for bad debt write-offs, provisions, and bad debt recoveries"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic10_study_note_bn.txt" : "topic10_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ১০ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 10 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "অনাদায়ী পাওনা মকুব ও প্রুডেন্স সঞ্চিতির সঠিক হিসাব রাখাই অডিট নিখুঁত করার মূল মন্ত্র!"
                : "Mastering bad debt write-offs and prudence provisions keeps business audits completely accurate!"
            }
          />
        </section>

      </div>
    </>
  );
}
