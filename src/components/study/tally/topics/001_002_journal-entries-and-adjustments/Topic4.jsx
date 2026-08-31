"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic4_files/topic4_questions";
import questionsBn from "./topic4_files/topic4_questions_bn";
import noteTextEn from "./topic4_files/topic4_note.txt?raw";
import noteTextBn from "./topic4_files/topic4_note_bn.txt?raw";
import journalEntries from "./topic4_files/topic4_journal.json";

/**
 * Topic 4 – Inventory Purchases/Sales vs Fixed Asset Capital Expenditure Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic4() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("goods");
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("machinery_installation");

  const scenarioData = {
    machinery_installation: {
      titleEn: "Paid ₹5,000 Cash Wages for Installing New Plant & Machinery",
      titleBn: "নতুন যন্ত্রপাতি বসানোর জন্য ক্যাশে ₹৫,০০০ মজুরি প্রদান",
      categoryEn: "Capitalized Asset Cost (CapEx)",
      categoryBn: "সম্পদের ক্রয়মূল্যে ক্যাপিটালাইজড খরচ (CapEx)",
      debitRuleEn: "Debit Plant & Machinery Account (NOT Wages Expense)",
      debitRuleBn: "Plant & Machinery Account ডেবিট (Wages Expense নয়)",
      creditRuleEn: "Credit Cash Account (Reduces Liquid Asset)",
      creditRuleBn: "Cash Account ক্রেডিট (নগদ সম্পদ হ্রাস)",
      voucherEn: "F5 Payment Voucher",
      voucherBn: "F5 Payment Voucher",
      explanationEn: "All expenses incurred to make a new fixed asset ready for use (freight, installation) must be added to the Asset Account cost.",
      explanationBn: "নতুন স্থায়ী সম্পদ চালুর আগে করা সমস্ত পরিবহন ও বসানোর খরচ সম্পদের ক্রয়মূল্যে যোগ (Capitalize) করতে হয়।"
    },
    inventory_purchase: {
      titleEn: "Purchased Trading Goods worth ₹60,000 on credit for resale",
      titleBn: "পুনর্বিক্রয়ের জন্য বাকিতে ৬০,০০০ টাকার পণ্যসামগ্রী ক্রয়",
      categoryEn: "Trading Inventory Purchase (OpEx / Cost of Sales)",
      categoryBn: "পুনর্বিক্রয়ের জন্য ট্রেডিং পণ্য ক্রয়",
      debitRuleEn: "Debit Purchases Account (Trading Account Expense)",
      debitRuleBn: "Purchases Account ডেবিট (ট্রেডিং খরচ)",
      creditRuleEn: "Credit Sundry Creditor Account (Trade Liability)",
      creditRuleBn: "Sundry Creditor Account ক্রেডিট (ব্যবসায়িক দায়)",
      voucherEn: "F9 Purchase Voucher",
      voucherBn: "F9 Purchase Voucher",
      explanationEn: "Goods bought specifically for resale are debited to Purchases Account, NOT to inventory asset account.",
      explanationBn: "যে পণ্য বিক্রয়ের উদ্দেশ্যে কেনা হয় তা সরাসরি Purchases A/c-এ ডেবিট করা হয়।"
    },
    computer_asset: {
      titleEn: "Purchased Office Computer ₹35,000 for office administration",
      titleBn: "অফিসের কাজের জন্য ৩৫,০০০ টাকার কম্পিউটার ক্রয়",
      categoryEn: "Fixed Asset Acquisition (Capital Expenditure)",
      categoryBn: "অফিসের স্থায়ী সম্পত্তি ক্রয় (CapEx)",
      debitRuleEn: "Debit Computer / Equipment Account (Fixed Asset)",
      debitRuleBn: "Computer / Equipment A/c ডেবিট (স্থায়ী সম্পদ)",
      creditRuleEn: "Credit Vendor / Cash Account",
      creditRuleBn: "Vendor / Cash Account ক্রেডিট",
      voucherEn: "F9 Purchase Voucher (As Asset) / F5 Payment",
      voucherBn: "F9 Purchase Voucher / F5 Payment",
      explanationEn: "Computers bought for office work are Fixed Assets, NOT trading goods; debited to Computer Asset Account.",
      explanationBn: "অফিসের কাজের কম্পিউটার স্থায়ী সম্পদ; তাই Purchases A/c-এ না দিয়ে Computer A/c-এ ডেবিট করতে হয়।"
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
            <span>TallyPrime Master Series · Module 1.2 · Topic 4</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "পণ্য ক্রয়/বিক্রয় বনাম স্থায়ী সম্পত্তি (Fixed Asset) ক্রয়/বিক্রয় ল্যাব" : "Inventory Purchases/Sales vs Fixed Asset Capital Expenditure Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ব্যবসায়ের পুনর্বিক্রয়ের পণ্য ক্রয় এবং আসবাবপত্র বা যন্ত্রপাতির মতো স্থায়ী সম্পত্তি ক্রয়ের পার্থক্য বজায় রাখার কৌশল।" : "Differentiating inventory trading purchases/sales from fixed asset acquisitions/disposals to avoid misclassifying capital expenditures."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & GOODS VS ASSETS HUB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Inventory বনাম Capital Expenditure মেকানিক্স" : "Inventory Trading vs Fixed Asset CapEx Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "পুনর্বিক্রয়ের পণ্যসামগ্রী (Purchases) বনাম স্থায়ী সম্পত্তি (Fixed Assets) এবং ক্যাপিটালাইজেশন নিয়ম" : "Distinguishing inventory purchases from capital expenditures and asset installation capitalization"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("goods")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "goods" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Trading Goods (পণ্য)" : "1. Trading Inventory"}
              </button>
              <button
                onClick={() => setActiveTab("fixed_assets")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "fixed_assets" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Fixed Assets & CapEx" : "2. Fixed Assets CapEx"}
              </button>
            </div>
          </div>

          {activeTab === "goods" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                REVENUE EXPENDITURE (Trading Account)
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Trading Goods (পুনর্বিক্রয়ের পণ্যসামগ্রী)" : "Trading Goods Account"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "যেসমস্ত দ্রব্য ব্যবসায়িক ক্রিয়াকলাপে লাভ করার উদ্দেশ্যে খদ্দেরের কাছে পুনর্বিক্রয়ের জন্য কেনা হয়, তা Purchases Account-এ ডেবিট করা হয়।"
                  : "Items purchased strictly for the purpose of reselling to customers to generate operating gross profit are debited to Purchases Account."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                Entry: Debit Purchases Account Dr | Credit Cash / Sundry Creditor Cr (Voucher: F9 Purchase)
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                CAPITAL EXPENDITURE (Balance Sheet Asset)
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Fixed Assets & Capitalization Rule (স্থায়ী সম্পত্তি)" : "Fixed Assets & Capitalization Principles"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "ব্যবসা পরিচালনার কাজে ব্যবহারের জন্য কেনা আসবাবপত্র, কম্পিউটার বা যন্ত্রপাতি স্থায়ী সম্পদ। এছাড়াও, সম্পদটি চালু করার আগে পর্যন্ত করা সমস্ত বসানোর মজুরি ও পরিবহন খরচ সেই সম্পদের ক্রয়মূল্যে যোগ (Capitalize) করতে হয়।"
                  : "Properties acquired for long-term operational use (Machinery, Computers, Furniture). All installation wages and freight incurred prior to ready-for-use state MUST be capitalized into the Asset Account."}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                <p>Asset Purchase: Debit Plant &amp; Machinery A/c Dr | Credit Vendor Cr</p>
                <p>Installation Wages: Debit Plant &amp; Machinery A/c Dr (NOT Wages) | Credit Cash Cr</p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE SCENARIO CAPEX SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "CapEx ও ইনভেন্টরি এন্ট্রি সিমুলেটর" : "CapEx & Inventory Entry Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "ক্রয় সংক্রান্ত ঘটনা বেছে নিন:" : "Select Purchase Scenario:"}
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
                  {isBengali ? "Teacher's Desk: CapEx ও ইনভেন্টরি আলোচনা" : "Teacher's Desk: CapEx & Inventory Discussion"}
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
                    ? "সবচেয়ে বড় গোলমাল হয় এখানে! নতুন মেশিন বসানোর জন্য যে মজুরি দেওয়া হয় তা Wages A/c-এ ডেবিট করলে তা মারাত্মক ভুল। চালু করার আগের সমস্ত খরচ মেশিনের নামেই (Plant & Machinery A/c) ডেবিট করে Capitalize করতে হয়!"
                    : "The biggest beginner mistake is debiting installation wages to Wages Account! All pre-operational costs must be debited directly to the Asset Account!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ আসবাবপত্র কেনার সময় Purchases ভাউচার ব্যবহার করা যাবে কি?"' : '"Sir, can we record furniture fixed asset purchase in Tally\'s Purchase (F9) voucher?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"হ্যাঁ, তবে As Voucher মোড সিলেক্ট করে ডাইরেক্ট Furniture Asset লেজার ডেবিট করতে হবে, Purchases A/c নয়!"' : '"Yes, but select As Voucher mode and debit Furniture Asset Account directly, NOT Purchases Account!"'}</em></p>
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
            title={isBengali ? "CapEx ও ইনভেন্টরি অনুশীলনী ওয়ার্কশীট" : "CapEx & Inventory Practice Worksheet"}
            subtitle={isBengali ? "পণ্য ক্রয়/বিক্রয় বনাম স্থায়ী সম্পত্তি ক্রয়ের ৫-কলাম জার্নাল বই অনুশীলন" : "Attempt journalization for inventory purchases and fixed asset capital expenditures"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic4_study_note_bn.txt" : "topic4_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৪ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 4 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "CapEx এবং OpEx-এর পার্থক্য না বুঝলে P&L ও ব্যালেন্স শিট ভুল হতে বাধ্য!"
                : "Understanding CapEx vs OpEx is essential to keep P&L and Balance Sheet completely accurate!"
            }
          />
        </section>

      </div>
    </>
  );
}
