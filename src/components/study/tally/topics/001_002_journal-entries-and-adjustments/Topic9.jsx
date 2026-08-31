"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic9_files/topic9_questions";
import questionsBn from "./topic9_files/topic9_questions_bn";
import noteTextEn from "./topic9_files/topic9_note.txt?raw";
import noteTextBn from "./topic9_files/topic9_note_bn.txt?raw";
import journalEntries from "./topic9_files/topic9_journal.json";

/**
 * Topic 9 – Fixed Asset Depreciation & Amortization Accounting Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic9() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("slm");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("slm_machinery");

  const scenarioData = {
    slm_machinery: {
      titleEn: "Charged annual 10% SLM Depreciation on Plant & Machinery (Cost ₹3,00,000)",
      titleBn: "প্ল্যান্ট ও মেশিনারির (মূল্য ৩,০০,০০০ টাকা) ওপর বার্ষিক ১০% সরল অবচয় (SLM) ধার্য",
      categoryEn: "Straight Line Method (SLM)",
      categoryBn: "সরলরৈখিক পদ্ধতি (SLM)",
      deprAmountEn: "Depreciation Amount = 10% of ₹3,00,000 = ₹30,000",
      deprAmountBn: "অবচয়ের পরিমাণ = ৩,০০,০০০ টাকার ১০% = ৩০,০০০ টাকা",
      debitRuleEn: "Debit Depreciation Account (Non-Cash Operating Expense)",
      debitRuleBn: "Depreciation Account ডেবিট (অ-নগদ পরিচালন খরচ)",
      creditRuleEn: "Credit Plant & Machinery Account (Reduces Asset Book Value)",
      creditRuleBn: "Plant & Machinery Account ক্রেডিট (সম্পদের বইমূল্য হ্রাস)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Under SLM, depreciation is calculated on original historical cost and charged to P&L via F7 Journal.",
      explanationBn: "SLM পদ্ধতিতে ঐতিহাসিক মূল্যের ওপর স্থির অবচয় হিসেব করে F7 জার্নাল ভাউচারে P&L-এ চার্জ করা হয়।"
    },
    wdv_computer: {
      titleEn: "Charged 40% WDV Depreciation on Office Computers (Opening WDV ₹80,000)",
      titleBn: "অফিস কম্পিউটারের (বুকমূল্য ৮০,০০০ টাকা) ওপর ৪০% ক্রমহ্রাসমান অবচয় (WDV) ধার্য",
      categoryEn: "Written Down Value Method (WDV)",
      categoryBn: "ক্রমহ্রাসমান জের পদ্ধতি (WDV)",
      deprAmountEn: "Depreciation Amount = 40% of ₹80,000 = ₹32,000",
      deprAmountBn: "অবচয়ের পরিমাণ = ৮০,০০০ টাকার ৪০% = ৩২,০০০ টাকা",
      debitRuleEn: "Debit Depreciation Account (P&L Charge)",
      debitRuleBn: "Depreciation Account ডেবিট (P&L খরচ)",
      creditRuleEn: "Credit Computer / Equipment Account",
      creditRuleBn: "Computer / Equipment Account ক্রেডিট",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Under WDV, depreciation is calculated on reduced opening book value each year.",
      explanationBn: "WDV পদ্ধতিতে প্রতি বছর শুরুর হ্রাসকৃত বুকমূল্যের ওপর অবচয় ধরা হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 9</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "স্থায়ী সম্পত্তির অবচয় (Depreciation) হিসাববিজ্ঞানের ল্যাব" : "Fixed Asset Depreciation & Amortization Accounting Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ব্যবসায়ের স্থায়ী সম্পত্তি ব্যবহারের ফলে সৃষ্ট বার্ষিক অবচয়ের (Depreciation) অ-নগদ সমন্বয় এন্ট্রি।" : "Calculating and passing non-cash adjusting journal entries for depreciation wear-and-tear on fixed assets using straight-line and written-down value methods."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & DEPRECIATION HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Depreciation অবচয় মেকানিক্স হাব" : "Depreciation Non-Cash Expense Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "স্থায়ী সম্পত্তির অ-নগদ ক্ষয়ক্ষতি ও SLM বনাম WDV গণনা পদ্ধতি" : "Rules for non-cash asset wear-and-tear depreciation under SLM & WDV methods"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("slm")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "slm" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. SLM (Straight Line)" : "1. SLM Method"}
              </button>
              <button
                onClick={() => setActiveTab("wdv")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "wdv" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. WDV (Written Down Value)" : "2. WDV Method"}
              </button>
            </div>
          </div>

          {activeTab === "slm" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                FIXED EQUAL DEPRECIATION EVERY YEAR
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Straight Line Method - SLM (সরলরৈখিক পদ্ধতি)" : "Straight Line Method (SLM)"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "সম্পত্তির মূল ক্রয়মূল্যের ওপর প্রতি বছর সমান টাকা অবচয় ধরা হয়। এর ফলে প্রতি বছর P&L-এ একই পরিমাণ অবচয় খরচ চার্জ হয়।"
                  : "Depreciation is calculated as a fixed percentage on original historical cost every year, resulting in equal annual P&L charges."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Depreciation Account Dr | Credit Fixed Asset Account Cr (Voucher: F7 Journal)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                DEPRECIATION CHARGED ON OPENING BOOK VALUE
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Written Down Value Method - WDV (ক্রমহ্রাসমান পদ্ধতি)" : "Written Down Value Method (WDV)"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "আইন ও ইনকাম ট্যাক্স অ্যাক্ট অনুযায়ী ব্যবহৃত প্রধান পদ্ধতি। প্রতি বছর অবচয় বাদ দেওয়ার পর অবশিষ্ট বইমূল্যের (Book Value) ওপর অবচয় ধার্য করা হয়।"
                  : "Recognized under Indian Income Tax Act. Depreciation percentage is applied on opening reduced book value each year."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300">
                Entry: Debit Depreciation Account Dr | Credit Fixed Asset Account Cr (Voucher: F7 Journal)
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO DEPRECIATION SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "অবচয় এন্ট্রি ও গণনা সিমুলেটর" : "Depreciation Calculation & Entry Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "অবচয় ঘটনা বেছে নিন:" : "Select Depreciation Scenario:"}
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
                  <span className="text-emerald-400 block text-[11px]">Calculated Depreciation</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.deprAmountBn : currentSc.deprAmountEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-sky-400 block text-[11px]">Debit Rule</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.debitRuleBn : currentSc.debitRuleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-teal-400 block text-[11px]">Credit Rule</span>
                  <strong className="text-teal-300 text-xs block">{isBengali ? currentSc.creditRuleBn : currentSc.creditRuleEn}</strong>
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
                  {isBengali ? "Teacher's Desk: অবচয় (Depreciation) আলোচনা" : "Teacher's Desk: Depreciation Accounting Discussion"}
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
                    ? "মনে রাখবেন—অবচয় কোনো নগদ টাকা পকেট থেকে বের করে না! এটি একটি অ-নগদ খরচ (Non-Cash Expense) যা প্রতি বছর ৩১শে মার্চ F7 জার্নাল ভাউচারে লিখে সম্পদের দাম কমাতে হয়।"
                    : "Depreciation does not involve cash outflow! It is a non-cash operating expense adjusted on 31st March in F7 Journal to reduce asset carrying value."}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ কি অবচয়ের জন্য কোনো ক্যাশ ভাউচার ব্যবহার করা যাবে?"' : '"Sir, can we pass depreciation in Payment (F5) voucher?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"একদম নয়! যেহেতু কোনো নগদ টাকা দেওয়া হয় না, তাই F5 ব্যবহার করা যাবে না। একমাত্র F7 Journal Voucher-এই অবচয়ের এন্ট্রি দিতে হবে!"' : '"No! Since no cash is paid, F5 cannot be used. Depreciation must be passed strictly in F7 Journal Voucher!"'}</em></p>
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
            title={isBengali ? "অবচয় (Depreciation) অনুশীলনী ওয়ার্কশীট" : "Depreciation Practice Worksheet"}
            subtitle={isBengali ? "স্থায়ী সম্পত্তির অবচয়ের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for non-cash fixed asset depreciation charges"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic9_study_note_bn.txt" : "topic9_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৯ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 9 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "অবচয়ের অ-নগদ প্রকৃতি ও F7 জার্নাল এন্ট্রি শেখা বাণিজ্যিক অডিটের মৌলিক যোগ্যতা!"
                : "Mastering non-cash depreciation mechanics and F7 journal entries is fundamental for commercial auditing!"
            }
          />
        </section>

      </div>
    </>
  );
}
