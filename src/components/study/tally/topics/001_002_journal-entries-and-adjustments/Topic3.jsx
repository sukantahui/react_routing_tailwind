"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic3_files/topic3_questions";
import questionsBn from "./topic3_files/topic3_questions_bn";
import noteTextEn from "./topic3_files/topic3_note.txt?raw";
import noteTextBn from "./topic3_files/topic3_note_bn.txt?raw";
import journalEntries from "./topic3_files/topic3_journal.json";

/**
 * Topic 3 – Owner Capital Introduced & Personal Drawings Accounting Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic3() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("capital");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("cash_drawings");

  const scenarioData = {
    cash_drawings: {
      titleEn: "Proprietor withdrew Cash ₹15,000 for daughter's school fee",
      titleBn: "মালিক মেয়ের স্কুলের মাইনের জন্য নগদে ₹১৫,০০০ ক্যাস ভল্ট থেকে উত্তোলন করলেন",
      categoryEn: "Personal Cash Drawings",
      categoryBn: "ব্যক্তিগত নগদ উত্তোলন (Drawings)",
      debitRuleEn: "Debit Drawings Account (Reduces Owner Equity)",
      debitRuleBn: "Drawings Account ডেবিট (মালিকানা সত্তা হ্রাস)",
      creditRuleEn: "Credit Cash Account (Reduces Liquid Cash Asset)",
      creditRuleBn: "Cash Account ক্রেডিট (নগদ সম্পদ হ্রাস)",
      voucherEn: "F5 Payment Voucher",
      voucherBn: "F5 Payment Voucher",
      explanationEn: "Personal expenses paid out of business cash vault are debited to Drawings Account, NOT to Office Fee Expense.",
      explanationBn: "ব্যবসায়ের ক্যাশ ভল্ট থেকে মালিকের ব্যক্তিগত খরচ মেটানো হলে তা Drawings A/c-এ ডেবিট করতে হয়।"
    },
    goods_drawings: {
      titleEn: "Proprietor withdrew Goods worth ₹8,000 for personal household use",
      titleBn: "মালিক ব্যক্তিগত ব্যবহারের জন্য ৮,০০০ টাকার পণ্য দোকান থেকে নিলেন",
      categoryEn: "Inventory Goods Drawings (Recorded at Cost)",
      categoryBn: "পণ্যসামগ্রী ব্যক্তিগত উত্তোলন (ক্রয়মূল্যে লিখিত)",
      debitRuleEn: "Debit Drawings Account (Reduces Owner Equity)",
      debitRuleBn: "Drawings Account ডেবিট (মালিকানা সত্তা হ্রাস)",
      creditRuleEn: "Credit Purchases Account (Reduces Purchases at Cost)",
      creditRuleBn: "Purchases Account ক্রেডিট (ক্রয়মূল্যে স্টক হ্রাস)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Goods taken for personal use are credited to Purchases Account at COST price because no commercial sale occurred.",
      explanationBn: "ব্যক্তিগত ব্যবহারের জন্য পণ্য নেওয়া হলে কোনো লাভ যোগ হয় না; তাই Purchases A/c-কে ক্রয়মূল্যে ক্রেডিট করে কমাতে হয়।"
    },
    income_tax: {
      titleEn: "Paid Proprietor Income Tax ₹25,000 by SBI Bank cheque",
      titleBn: "চেকের মাধ্যমে মালিকের ইনকাম ট্যাক্স বাবদ ২৫,০০০ টাকা প্রদান",
      categoryEn: "Owner Personal Tax Liability (Drawings)",
      categoryBn: "মালিকের ব্যক্তিগত আয়কর প্রদান (Drawings)",
      debitRuleEn: "Debit Drawings Account (NOT Tax Expense A/c)",
      debitRuleBn: "Drawings Account ডেবিট (অফিস ট্যাক্স খরচ নয়)",
      creditRuleEn: "Credit SBI Bank Account (Reduces Bank Asset)",
      creditRuleBn: "SBI Bank Account ক্রেডিট (ব্যাংক তহবিল হ্রাস)",
      voucherEn: "F5 Payment Voucher",
      voucherBn: "F5 Payment Voucher",
      explanationEn: "Income Tax of a sole proprietor is a personal liability. Paying it from business bank account constitutes Drawings.",
      explanationBn: "একক মালিকানা ব্যবসায়ে মালিকের আয়কর একটি ব্যক্তিগত দায়। ব্যবসায়ের ব্যাংক থেকে তা পরিশোধ করলে Drawings ধরতে হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 3</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "মূলধন আনয়ন (Capital) ও মালিকের নিজস্ব উত্তোলন (Drawings) ল্যাব" : "Owner Capital Introduced & Personal Drawings Accounting Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "প্রোপ্রাইটর কর্তৃক ব্যবসায় ক্যাশ, ব্যাংক বা সম্পত্তি বাবদ আনীত মূলধন এবং ব্যক্তিগত প্রয়োজনে ক্যাশ বা পণ্যের উত্তোলনের আইনি হিসাব।" : "Recording initial/additional capital brought in by proprietors and treating cash/goods withdrawals as Drawings reducing capital equity."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & CAPITAL VS DRAWINGS HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Capital & Drawings মেকানিক্স হাব" : "Owner Capital & Personal Drawings Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "ব্যবসায়িক মূলধন ইনভেস্টমেন্ট বনাম ব্যক্তিগত উত্তোলন ও ইনকাম ট্যাক্স মেকানিক্স" : "Accounting mechanics for equity contribution vs personal drawings and owner tax payouts"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("capital")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "capital" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Capital (মূলধন)" : "1. Capital Account"}
              </button>
              <button
                onClick={() => setActiveTab("drawings")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "drawings" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Drawings (উত্তোলন)" : "2. Drawings Account"}
              </button>
            </div>
          </div>

          {activeTab === "capital" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                OWNER EQUITY CONTRIBUTION
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Capital Account (মূলধন হিসাব)" : "Capital Account Rules"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "ব্যবসায়ের শুরু বা পরবর্তীতে মালিক ব্যবসায়ে নগদ, ব্যাংক ব্যালেন্স বা আসবাবপত্র ইত্যাদি নিয়ে এলে মালিক হলেন দাতা (Personal Account - Giver), তাই Capital A/c ক্রেডিট হয়।"
                  : "Under Business Entity Concept, the owner is distinct from the business. Capital Account represents internal equity liability and carries a Credit balance."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Cash/Bank/Asset A/c Dr | Credit Capital Account Cr (Voucher: F6 Receipt)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                PERSONAL WITHDRAWAL (Reduces Capital Equity)
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Drawings Account (উত্তোলন হিসাব)" : "Drawings Account Rules"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "মালিক নিজের ব্যক্তিগত বা পারিবারিক প্রয়জনে ক্যাশ ভল্ট থেকে টাকা বা দোকান থেকে পণ্য বা নিজের ইনকাম ট্যাক্স মেটালে তা Drawings A/c-এ ডেবিট করে মূলধন থেকে বিয়োগ করা হয়।"
                  : "Withdrawals of cash, bank funds, goods, or payment of owner personal income tax/LIC premium are debited to Drawings A/c and deducted from Capital at year-end."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                <p>Cash Drawing: Debit Drawings A/c Dr | Credit Cash A/c Cr (F5 Payment)</p>
                <p>Goods Drawing: Debit Drawings A/c Dr | Credit Purchases A/c Cr at COST (F7 Journal)</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO DRAWINGS SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "উত্তোলন লেনদেন প্র্যাকটিক্যাল সিমুলেটর" : "Drawings Transaction Practical Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "ব্যক্তিগত উত্তোলন ঘটনা বেছে নিন:" : "Select Drawings Scenario:"}
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 block text-[11px]">Debit Assignment</span>
                  <strong className="text-slate-200 text-xs block">{isBengali ? currentSc.debitRuleBn : currentSc.debitRuleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-sky-400 block text-[11px]">Credit Assignment</span>
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
                  {isBengali ? "Teacher's Desk: Capital ও Drawings আলোচনা" : "Teacher's Desk: Capital & Drawings Discussion"}
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
                    ? "মনে রাখবেন—মালিক যদি দোকান থেকে নিজের পরিবারের ব্যবহারের জন্য চাল বা ইলেকট্রনিক্স পণ্য নেন, তবে তা বিক্রয় মূল্য নয়, কেনা দাম বা Cost Price-এ Purchases A/c কমিয়ে ক্রেডিট করতে হয়!"
                    : "Remember—if the proprietor takes inventory for home consumption, it must be credited to Purchases Account at COST price, never at selling price!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, মালিকের ব্যক্তিগত আয়কর মেটানো হলে তা কেন অফিসের ট্যাক্স খরচ হিসেবে ডেবিট করা যাবে না?"' : '"Sir, why can\'t proprietor\'s income tax payment be debited as office tax expense?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"কারণ এক মালিকানা ব্যবসায়ে মালিকের আয়কর একটি ব্যক্তিগত দায়। ব্যবসায়ের টাকা দিয়ে তা দিলে তা আয়কর খরচ নয়, Drawings A/c ধরতে হয়!"' : '"Because in sole proprietorship, proprietor\'s income tax is a personal liability. Paying it from business money is Drawings!"'}</em></p>
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
            title={isBengali ? "Capital ও Drawings অনুশীলনী ওয়ার্কশীট" : "Capital & Drawings Practice Worksheet"}
            subtitle={isBengali ? "মালিকের মূলধন ইনভেস্টমেন্ট ও ব্যক্তিগত উত্তোলনের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for owner equity contributions and personal drawings"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic3_study_note_bn.txt" : "topic3_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৩ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 3 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "Capital এবং Drawings-এর পার্থক্য ও পণ্য উত্তোলনের সঠিক মেকানিক্স শেখা পেশাদার অ্যাকাউন্ট্যান্টের লক্ষণ!"
                : "Mastering Capital vs Drawings and goods withdrawal accounting mechanics is essential for any professional accountant!"
            }
          />
        </section>

      </div>
    </>
  );
}
