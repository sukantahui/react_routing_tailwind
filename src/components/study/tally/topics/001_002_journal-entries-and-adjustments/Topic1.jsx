"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic1_files/topic1_questions";
import questionsBn from "./topic1_files/topic1_questions_bn";
import noteTextEn from "./topic1_files/topic1_note.txt?raw";
import noteTextBn from "./topic1_files/topic1_note_bn.txt?raw";
import journalEntries from "./topic1_files/topic1_journal.json";

/**
 * Topic 1 – Simple vs Compound Journal Entry Analysis Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic1() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("simple");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("capital");

  const scenarioData = {
    capital: {
      titleEn: "Capital Introduced: Cash ₹6,00,000 & Office Furniture ₹50,000",
      titleBn: "মূলধন আনয়ন: নগদ ₹৬,০০,০০০ এবং আসবাবপত্র ₹৫০,০০০",
      typeEn: "Compound Entry (2 Debits, 1 Credit)",
      typeBn: "যৌগিক এন্ট্রি (২টি ডেবিট, ১টি ক্রেডিট)",
      debitLinesEn: "1. Cash A/c Dr ₹6,00,000 | 2. Furniture A/c Dr ₹50,000",
      debitLinesBn: "১. Cash A/c Dr ₹৬,০০,০০০ | ২. Furniture A/c Dr ₹৫০,০০০",
      creditLinesEn: "To Capital Account Cr ₹6,50,000",
      creditLinesBn: "To Capital Account Cr ₹৬,৫০,০০০",
      voucherEn: "F6 Receipt Voucher",
      voucherBn: "F6 Receipt Voucher",
      explanationEn: "Multiple incoming assets debited simultaneously against owner's total capital liability.",
      explanationBn: "একাধিক আগত সম্পদকে একসাথে ডেবিট করে মালিকের মোট মূলধন দায় গঠন করা হয়।"
    },
    expenses: {
      titleEn: "Paid Shop Rent ₹20,000 and Electricity ₹6,000 by Single Cheque",
      titleBn: "একই চেকে দোকান ভাড়া ₹২০,০০০ এবং বিদ্যুৎ বিল ₹৬,০০০ প্রদান",
      typeEn: "Compound Entry (2 Debits, 1 Credit)",
      typeBn: "যৌগিক এন্ট্রি (২টি ডেবিট, ১টি ক্রেডিট)",
      debitLinesEn: "1. Rent Expense A/c Dr ₹20,000 | 2. Electricity Expense A/c Dr ₹6,000",
      debitLinesBn: "১. Rent Expense A/c Dr ₹২০,০০০ | ২. Electricity Expense A/c Dr ₹৬,০০০",
      creditLinesEn: "To Bank Account Cr ₹26,000",
      creditLinesBn: "To Bank Account Cr ₹২৬,০০০",
      voucherEn: "F5 Payment Voucher",
      voucherBn: "F5 Payment Voucher",
      explanationEn: "Combines two operating expense payments made via a single bank cheque transaction.",
      explanationBn: "একই চেকে দুটি ভিন্ন পরিচালন খরচ পরিশোধের হিসাবকে একটি যৌগিক এন্ট্রিতে রেকর্ড করা হয়।"
    },
    single_rent: {
      titleEn: "Paid Office Rent ₹15,000 in Cash",
      titleBn: "নগদে অফিস ভাড়া ₹১৫,০০০ প্রদান",
      typeEn: "Simple Entry (1 Debit, 1 Credit)",
      typeBn: "সহজ এন্ট্রি (১টি ডেবিট, ১টি ক্রেডিট)",
      debitLinesEn: "Rent Expense Account Dr ₹15,000",
      debitLinesBn: "Rent Expense Account Dr ₹১৫,০০০",
      creditLinesEn: "To Cash Account Cr ₹15,000",
      creditLinesBn: "To Cash Account Cr ₹১৫,০০০",
      voucherEn: "F5 Payment Voucher",
      voucherBn: "F5 Payment Voucher",
      explanationEn: "Basic simple entry with one expense debited and one cash asset credited.",
      explanationBn: "সাধারণ সহজ এন্ট্রি যেখানে একটি মাত্র খরচ ডেবিট এবং একটি নগদ সম্পদ ক্রেডিট হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 1</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "Simple ও Compound জার্নাল এন্ট্রি বিশ্লেষণ ল্যাব" : "Simple vs Compound Journal Entry Analysis Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "একক ডেবিট-ক্রেডিট যুক্ত সহজ জার্নাল এন্ট্রি এবং একটি মাত্র ঘটনায় বহুবিধ ডেবিট বা ক্রেডিট যুক্ত যৌগিক (Compound) জার্নাল এন্ট্রির পার্থক্য।" : "Distinguishing single-debit single-credit entries from compound entries involving multiple debits or credits arising from a single transaction event."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & SIMPLE VS COMPOUND EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Simple বনাম Compound এন্ট্রি ফ্রেমওয়ার্ক" : "Simple vs Compound Entry Architectural Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "হিসাববিজ্ঞানে একক লেনদেন বনাম যৌক্তিক বহুবিধ ডেবিট-ক্রেডিট স্ট্রাকচার" : "Single ledger mapping vs multi-line debit/credit compound journalization"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("simple")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "simple" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Simple Journal Entry" : "1. Simple Entry"}
              </button>
              <button
                onClick={() => setActiveTab("compound")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "compound" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Compound Journal Entry" : "2. Compound Entry"}
              </button>
            </div>
          </div>

          {activeTab === "simple" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                SINGLE DEBIT &amp; SINGLE CREDIT
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Simple Journal Entry (সহজ জার্নাল এন্ট্রি)" : "Simple Journal Entry"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "যে জার্নাল এন্ট্রিতে কেবল ১টি অ্যাকাউন্ট ডেবিট এবং ১টি অ্যাকাউন্ট সমপরিমাণ টাকায় ক্রেডিট হয়।"
                  : "A basic accounting entry containing exactly one debited ledger account and one credited ledger account of equal monetary value."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Example: Paid Cash ₹5,000 for Office Stationery -&gt; Stationery A/c Dr ₹5,000, To Cash A/c Cr ₹5,000.
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                MULTIPLE DEBITS / CREDITS (Same Date &amp; Nature)
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Compound Journal Entry (যৌগিক জার্নাল এন্ট্রি)" : "Compound Journal Entry"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "একই তারিখে ঘটা এবং একই প্রকৃতির লেনদেনে একাধিক ডেবিট বা একাধিক ক্রেডিটকে একটিমাত্র সমন্বিত জার্নাল এন্ট্রিতে প্রকাশ করার পদ্ধতি।"
                  : "A journal entry involving two or more debits or credits recorded under a single transaction date (e.g. introducing multiple capital assets or paying multiple expenses by a single cheque)."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                <p>Debit 1: Cash A/c Dr ₹6,00,000</p>
                <p>Debit 2: Furniture A/c Dr ₹50,000</p>
                <p className="text-emerald-400">Credit: To Capital Account Cr ₹6,50,000</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO COMPOUND ANALYZER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "কম্পাউন্ড এন্ট্রি প্র্যাকটিক্যাল সিমুলেটর" : "Compound Entry Practical Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "বাণিজ্যিক লেনদেন বেছে নিন:" : "Select Commercial Transaction Scenario:"}
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
                  Entry Type: {isBengali ? currentSc.typeBn : currentSc.typeEn}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isBengali ? currentSc.explanationBn : currentSc.explanationEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 block text-[11px]">Debit Lines</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.debitLinesBn : currentSc.debitLinesEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-sky-400 block text-[11px]">Credit Lines</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.creditLinesBn : currentSc.creditLinesEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-teal-400 block text-[11px]">Tally Voucher Key</span>
                  <strong className="text-teal-300 text-xs block">{isBengali ? currentSc.voucherBn : currentSc.voucherEn}</strong>
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
                  {isBengali ? "Teacher's Desk: Simple ও Compound এন্ট্রি আলোচনা" : "Teacher's Desk: Simple & Compound Journalization"}
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
                    ? "যদি একই দিনে আপনি নগদ টাকা ও আসবাবপত্র দিয়ে ব্যবসা শুরু করেন, তবে আলাদা আলাদা দুটি এন্ট্রি না বানিয়ে একটি Compound এন্ট্রিতে দুটি ডেবিট (Cash & Furniture) এবং একটি ক্রেডিট (Capital) করাই বুদ্ধিমান অ্যাকাউন্ট্যান্টের কাজ!"
                    : "If proprietor introduces cash and furniture on the same day, making a single compound entry with two debits and one credit is the hallmark of an efficient accountant!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Abhronila (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ Compound এন্ট্রি কীভাবে ভাউচারে রেকর্ড করতে হয়?"' : '"Sir, how do we record a multi-debit compound entry in TallyPrime voucher screen?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"Tally-র F5 Payment বা F6 Receipt ভাউচারে By/Dr সিলেক্ট করে প্রথম লেজার এবং পুনরায় By/Dr সিলেক্ট করে দ্বিতীয় লেজার ডেবিট করা হয়!"' : '"In Tally\'s F5 Payment or F6 Receipt voucher, select Dr for the first ledger and select Dr again for the second ledger!"'}</em></p>
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
            title={isBengali ? "Simple ও Compound জার্নাল অনুশীলন ওয়ার্কশীট" : "Simple & Compound Journal Practice Worksheet"}
            subtitle={isBengali ? "বাণিজ্যিক লেনদেনের বহু-লাইন যৌগিক জার্নাল বই অনুশীলন" : "Practice multi-line compound journal entries in 5-column format"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic1_study_note_bn.txt" : "topic1_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ১ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 1 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "Simple ও Compound জার্নাল এন্ট্রির সঠিক ব্যবহার বুককিপিংয়ের গতি ও অডিট ট্রেইল বহুগুণ বৃদ্ধি করে!"
                : "Mastering simple and compound journal entries boosts bookkeeping speed and audit clarity!"
            }
          />
        </section>

      </div>
    </>
  );
}
