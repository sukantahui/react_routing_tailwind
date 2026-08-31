"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic11_files/topic11_questions";
import questionsBn from "./topic11_files/topic11_questions_bn";
import noteTextEn from "./topic11_files/topic11_note.txt?raw";
import noteTextBn from "./topic11_files/topic11_note_bn.txt?raw";
import journalEntries from "./topic11_files/topic11_journal.json";

/**
 * Topic 11 – Interest on Capital, Interest on Drawings & Commission Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic11() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("ioc");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("ioc_entry");

  const scenarioData = {
    ioc_entry: {
      titleEn: "Allowed 6% annual Interest on Proprietor Capital ₹5,00,000 at year end (₹30,000)",
      titleBn: "মালিকের মূলধন ৫,০০,০০০ টাকার ওপর বার্ষিক ৬% সুদ (৩০,০০০ টাকা) অনুমোদন",
      categoryEn: "Interest on Capital (Firm Expense & Equity Credit)",
      categoryBn: "মূলধনের সুদ (ফার্মের খরচ ও ইকুইটি বৃদ্ধি)",
      debitRuleEn: "Debit Interest on Capital Account (Firm Financial Expense)",
      debitRuleBn: "Interest on Capital Account ডেবিট (ফার্মের খরচ)",
      creditRuleEn: "Credit Proprietor Capital Account (Increases Owner Equity)",
      creditRuleBn: "Proprietor Capital Account ক্রেডিট (মূলধন বৃদ্ধি)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Under Business Entity Concept, Interest on Capital is debited as firm expense and credited to Capital Account.",
      explanationBn: "ব্যবসায়িক সত্তা নীতি অনুযায়ী মূলধনের সুদ ফার্মের খরচ হিসেবে ডেবিট হয় এবং মালিকের মূলধন বাড়ায়।"
    },
    iod_entry: {
      titleEn: "Charged 10% Interest on Proprietor Drawings ₹40,000 (₹4,000)",
      titleBn: "মালিকের নিজস্ব উত্তোলন ৪০,০০০ টাকার ওপর ১০% সুদ (৪,০০০ টাকা) ধার্য",
      categoryEn: "Interest on Drawings (Firm Income & Equity Debit)",
      categoryBn: "উত্তোলনের সুদ (ফার্মের আয় ও ইকুইটি হ্রাস)",
      debitRuleEn: "Debit Drawings / Capital Account (Reduces Owner Equity)",
      debitRuleBn: "Drawings / Capital Account ডেবিট (মূলধন হ্রাস)",
      creditRuleEn: "Credit Interest on Drawings Account (Firm Financial Income)",
      creditRuleBn: "Interest on Drawings Account ক্রেডিট (ফার্মের আয়)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Interest charged on owner's personal drawings is income to the firm and reduces proprietor equity.",
      explanationBn: "উত্তোলনের ওপর ধার্যকৃত সুদ ফার্মের জন্য আয় এবং তা মালিকের মূলধন কমায়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 11</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "মূলধনের সুদ (Interest on Capital) ও উত্তোলনের সুদ (Interest on Drawings) ল্যাব" : "Interest on Capital, Interest on Drawings & Commission Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ব্যবসায়ে প্রোপ্রাইটর মূলধনের উপর সুদের অনুমোদন (Int on Capital), উত্তোলনের উপর সুদ গ্রহণ (Int on Drawings) এবং কমিশনের সমন্বয়।" : "Computing and recording interest on proprietor's capital, interest on drawings, agency commissions, and manager's net profit commission."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & IOC/IOD HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Interest on Capital & Drawings মেকানিক্স" : "Interest on Capital & Drawings Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "ফার্মের দৃষ্টিকোণ থেকে মূলধনের সুদ (খরচ) বনাম উত্তোলনের সুদ (আয়)" : "Firm accounting perspective for interest allowed on capital vs interest charged on drawings"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("ioc")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "ioc" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Interest on Capital (Expense)" : "1. Interest on Capital"}
              </button>
              <button
                onClick={() => setActiveTab("iod")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "iod" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Interest on Drawings (Income)" : "2. Interest on Drawings"}
              </button>
            </div>
          </div>

          {activeTab === "ioc" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                FIRM OPERATING EXPENSE
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Interest on Capital (মূলধনের সুদ)" : "Interest on Capital Principles"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "ফার্মের দৃষ্টিকোণ থেকে মালিককে তার প্রদত্ত মূলধনের ওপর সুদ দেওয়া একটি খরচ। এটি Interest on Capital A/c-এ ডেবিট হয় এবং মালিকের Capital A/c-এ ক্রেডিট হয়ে মূলধন বাড়ায়।"
                  : "From the business entity's perspective, interest on proprietor's capital is a financial expense. Debited to Interest on Capital Account and credited to Capital Account."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Interest on Capital A/c Dr | Credit Capital Account Cr (Voucher: F7 Journal)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                FIRM FINANCIAL INCOME
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Interest on Drawings (উত্তোলনের সুদ)" : "Interest on Drawings Principles"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "মালিক নিজের ব্যবহারের জন্য টাকা বা পণ্য তোলায় তার ওপর ফার্ম যে সুদ ধার্য করে। এটি ফার্মের আয়; তাই Interest on Drawings A/c ক্রেডিট হয় এবং মালিকের Drawings/Capital কমানো হয়।"
                  : "Interest charged on proprietor's personal withdrawals represents financial income to the firm. Credited to Interest on Drawings Account and debited to Drawings/Capital."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300">
                Entry: Debit Drawings / Capital Account Dr | Credit Interest on Drawings A/c Cr (Voucher: F7 Journal)
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO IOC/IOD SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "সুদ গণনা ও এন্ট্রি সিমুলেটর" : "Capital & Drawings Interest Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "সুদ ঘটনা বেছে নিন:" : "Select Interest Scenario:"}
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
                  {isBengali ? "Teacher's Desk: Capital ও Drawings-এর সুদ আলোচনা" : "Teacher's Desk: Capital & Drawings Interest Discussion"}
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
                    ? "মনে রাখবেন—সবসময় ব্যবসায়ের দৃষ্টিকোণ থেকে চিন্তা করুন! মূলধনের সুদ হলো ব্যবসায়ের খরচ (Interest on Capital Dr), আর উত্তোলনের সুদ হলো ব্যবসায়ের ইনকাম (Interest on Drawings Cr)।"
                    : "Always think from the business firm's perspective! Interest on Capital is a firm expense (Dr), while Interest on Drawings is a firm income (Cr)."}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, মূলধনের সুদ কি নগদে দেওয়া হয় নাকি ক্যাপিটালে যোগ করা হয়?"' : '"Sir, is interest on capital paid in cash or added to capital account?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"মালিককে আলাদা নগদে দেওয়া হয় না; সরাসরি F7 জার্নাল এন্ট্রির মাধ্যমে তার Capital Account-এ যোগ করে দেওয়া হয়!"' : '"It is not paid in separate cash; it is added directly to proprietor\'s Capital Account via F7 Journal entry!"'}</em></p>
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
            title={isBengali ? "Capital ও Drawings সুদ অনুশীলনী ওয়ার্কশীট" : "Capital & Drawings Interest Practice Worksheet"}
            subtitle={isBengali ? "মূলধনের সুদ ও উত্তোলনের সুদের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for interest on capital and interest on drawings"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic11_study_note_bn.txt" : "topic11_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ১১ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 11 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "মূলধন ও উত্তোলনের সুদের সমন্বয় বোঝা প্রতিটি পেশাদার হিসাবরক্ষকের জন্য আবশ্যক!"
                : "Mastering interest on capital and interest on drawings adjustments is essential for every accountant!"
            }
          />
        </section>

      </div>
    </>
  );
}
