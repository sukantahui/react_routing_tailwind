"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic2_files/topic2_questions";
import questionsBn from "./topic2_files/topic2_questions_bn";
import noteTextEn from "./topic2_files/topic2_note.txt?raw";
import noteTextBn from "./topic2_files/topic2_note_bn.txt?raw";
import journalEntries from "./topic2_files/topic2_journal.json";

/**
 * Topic 2 – Opening Journal Entries & Balance Sheet Carryover Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic2() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("opening");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("normal");

  const scenarioData = {
    normal: {
      titleEn: "Standard Opening Entry (Assets = Liabilities + Capital)",
      titleBn: "সাধারণ প্রারম্ভিক এন্ট্রি (সম্পদ = দায় + মূলধন)",
      ruleEn: "Debit all Assets (Dr), Credit all Liabilities (Cr), Credit Capital A/c (Cr)",
      ruleBn: "সকল সম্পদ ডেবিট (Dr), সকল দায় ক্রেডিট (Cr), মূলধন হিসাব ক্রেডিট (Cr)",
      equationEn: "Total Assets (₹10,00,000) = Total Liabilities (₹4,20,000) + Capital (₹5,80,000)",
      equationBn: "মোট সম্পদ (₹১০,০০,০০০) = মোট দায় (₹৪,২০,০০০) + মূলধন (₹৫,৮০,০০০)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Brings forward ending audited Balance Sheet balances from 31st March into 1st April new accounting year.",
      explanationBn: "৩১শে মার্চের নিরীক্ষিত ব্যালেন্স শিটের জের ১লা এপ্রিলে নতুন অর্থবছরে স্থানান্তরিত করার নিয়ম।"
    },
    goodwill: {
      titleEn: "Opening Entry with Goodwill as Balancing Figure (Assets < Liabilities + Capital)",
      titleBn: "সুনাম (Goodwill) ব্যালেন্সিং ফিগারসহ প্রারম্ভিক এন্ট্রি (সম্পদ < দায় + মূলধন)",
      ruleEn: "Debit Goodwill Account (Intangible Asset) for the deficit amount",
      ruleBn: "ঘাটতি টাকার পরিমাণ সুনাম (Goodwill) হিসাবে ডেবিট করতে হয়",
      equationEn: "Deficit Debit Balance = Goodwill Account Dr",
      equationBn: "ডেবিট কলামের সমতাবিধানী ঘাটতি = Goodwill A/c Dr",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "When acquiring an existing business where purchase consideration exceeds tangible net assets, Goodwill is debited as balancing figure.",
      explanationBn: "চলতি ব্যবসায় অধিগ্রহণের সময় বাস্তব সম্পদের চেয়ে প্রদত্ত দায় ও মূল্য বেশি হলে ঘাটতি টাকা Goodwill নামে ডেবিট করা হয়।"
    },
    capital_reserve: {
      titleEn: "Opening Entry with Capital Reserve (Assets > Liabilities + Capital)",
      titleBn: "ক্যাপিটাল রিজার্ভসহ প্রারম্ভিক এন্ট্রি (সম্পদ > দায় + মূলধন)",
      ruleEn: "Credit Capital Reserve Account for the surplus asset amount",
      ruleBn: "উদ্বৃত্ত টাকা ক্যাপিটাল রিজার্ভ (Capital Reserve) হিসাবে ক্রেডিট করতে হয়",
      equationEn: "Surplus Credit Balance = Capital Reserve Account Cr",
      equationBn: "ক্রেডিট কলামের সমতাবিধানী উদ্বৃত্ত = Capital Reserve A/c Cr",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "When total tangible assets taken over exceed total liabilities and capital, the excess is credited to Capital Reserve.",
      explanationBn: "অধিগ্রহণকৃত মোট সম্পদ দায় অপেক্ষা বেশি হলে অতিরিক্ত টাকা Capital Reserve নামে জমা হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 2</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "Opening Journal Entries ও ব্যালেন্স শীট ক্যারি-ওভার ল্যাব" : "Opening Journal Entries & Balance Sheet Carryover Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "পূর্ববর্তী অর্থবর্ষের ব্যালেন্স শীট থেকে সম্পদ, দায় এবং মূলধনের প্রারম্ভিক জের নতুন অর্থবর্ষের খাতায় স্থানান্তরের ওপেনিং জার্নাল এন্ট্রি।" : "Journalizing opening entries to carry forward asset, liability, and capital balances from previous financial year into the new books of account."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & OPENING ENTRY EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "প্রারম্ভিক এন্ট্রি (Opening Entry) মেকানিক্স হাব" : "Opening Entry Mechanics & Balance Sheet Continuity"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "১লা এপ্রিলে নতুন অর্থবছরে সকল সম্পদ, দায় ও মূলধন স্থানান্তরের নিয়মাবলি" : "Rules for transferring prior year Balance Sheet balances into the new financial year"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("opening")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "opening" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. সমীকরণ নিয়ম" : "1. Accounting Equation"}
              </button>
              <button
                onClick={() => setActiveTab("balancing")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "balancing" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Goodwill / Reserve" : "2. Balancing Figures"}
              </button>
            </div>
          </div>

          {activeTab === "opening" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                1st APRIL OPENING BALANCES
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Opening Journal Entry-র মৌলিক নিয়ম" : "Fundamental Rule of Opening Journal Entries"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "নতুন হিসাব বছরের শুরুতে (১লা এপ্রিল) পূর্ববর্তী বছরের ব্যালেন্স শীটে থাকা সমস্ত স্থায়ী ও চলতি সম্পদকে ডেবিট এবং সমস্ত বহিরাগত দায় ও মালিকের মূলধনকে ক্রেডিট করে এন্ট্রি দিতে হয়।"
                  : "On the first day of a new financial year (1st April), an opening entry is passed debiting all asset accounts and crediting all liability and proprietor capital accounts."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Formula: Debit All Assets A/c Dr = Credit All Liabilities A/c + Credit Proprietor Capital A/c
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                GOODWILL VS CAPITAL RESERVE
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "সমতাবিধানী ফিগার (Goodwill / Capital Reserve) নির্ণয়" : "Balancing Figure Rules (Goodwill vs Capital Reserve)"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "চলতি ব্যবসা অধিগ্রহণের সময় যদি সম্পদ অপেক্ষা দায় ও মূলধনের যোগফল বেশি হয়, তবে ঘাটতি টাকা 'Goodwill Account' নামে ডেবিট হয়। আর যদি সম্পদ বেশি হয়, তবে অতিরিক্ত টাকা 'Capital Reserve Account' নামে ক্রেডিট হয়।"
                  : "If liabilities + capital exceed tangible assets, the deficit is debited to Goodwill Account. If tangible assets exceed liabilities + capital, the surplus is credited to Capital Reserve Account."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO OPENING SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "ওপেনিং এন্ট্রি প্র্যাকটিক্যাল সিমুলেটর" : "Opening Entry Practical Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "ওপেনিং পরিস্থিতি বেছে নিন:" : "Select Opening Scenario:"}
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
                  Tally Voucher: {isBengali ? currentSc.voucherBn : currentSc.voucherEn}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isBengali ? currentSc.explanationBn : currentSc.explanationEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 block text-[11px]">Journalizing Rule</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.ruleBn : currentSc.ruleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-sky-400 block text-[11px]">Accounting Invariant</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.equationBn : currentSc.equationEn}</strong>
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
                  {isBengali ? "Teacher's Desk: ওপেনিং জার্নাল এন্ট্রি আলোচনা" : "Teacher's Desk: Opening Entry Discussion"}
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
                    ? "১লা এপ্রিলে নতুন খাতা খোলার সময় মনে রাখবেন—আগের বছরের ব্যালেন্স শিটের সমস্ত সম্পদকে ডেবিট এবং দায় ও মূলধনকে ক্রেডিট করলেই তৈরি হয়ে যায় নিখুঁত Opening Entry!"
                    : "When opening new books on 1st April, debiting all prior assets and crediting all prior liabilities & capital constructs the perfect opening entry!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ কি আলাদা করে Opening Journal Entry করতে হয়?"' : '"Sir, do we need to pass a manual Opening Journal Entry in TallyPrime?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"Tally-তে লেজার ক্রিয়েট করার সময় Opening Balance ফিল্ডে মান বসিয়ে দেওয়া যায়, অথবা F7 Journal-এ মেকানিক্যাল ওপেনিং এন্ট্রি দেওয়া যায়!"' : '"In Tally, you can type Opening Balance directly in Ledger Creation screen or pass an F7 Journal entry!"'}</em></p>
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
            title={isBengali ? "Opening Journal এন্ট্রি অনুশীলন ওয়ার্কশীট" : "Opening Journal Entry Practice Worksheet"}
            subtitle={isBengali ? "পূর্ববর্তী অর্থবর্ষের ব্যালেন্স স্থানান্তরের ওপেনিং জার্নাল অনুশীলন" : "Attempt opening entry journalization to carry forward audited Balance Sheet balances"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic2_study_note_bn.txt" : "topic2_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ২ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 2 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "ওপেনিং জার্নাল এন্ট্রি শেখা হলো নতুন অর্থবর্ষের বই নির্ভুলভাবে চালু করার প্রথম প্রধান পদক্ষেপ!"
                : "Mastering opening journal entries is the prime step for starting new financial year books error-free!"
            }
          />
        </section>

      </div>
    </>
  );
}
