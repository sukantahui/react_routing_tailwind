"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic9_files/topic9_questions";
import questionsBn from "./topic9_files/topic9_questions_bn";
import noteTextEn from "./topic9_files/topic9_note.txt?raw";
import noteTextBn from "./topic9_files/topic9_note_bn.txt?raw";

/**
 * Topic 9 – Step-by-Step Transaction Analysis Logic: Identifying Accounts Affected & Debit vs Credit
 * Module: 001_001_accounting-concepts-and-account-classification (Accounting Concepts & Account Classification)
 * Track: TallyPrime Master Series – CNAT Academy
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with 4-step workflow, live transaction analyzer workbench,
 *                        bilingual support, FAQ practice assessment, and print/download study notes.
 */
export default function Topic9() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [selectedTxIndex, setSelectedTxIndex] = useState(0);

  const transactions = [
    {
      id: 1,
      titleEn: "1. Started business with Cash ₹5,00,000",
      titleBn: "১. নগদ ₹৫,০০,০০০ টাকা নিয়ে ব্যবসা শুরু করা হলো",
      step1En: "Financial transaction: Cash invested into enterprise by proprietor.",
      step1Bn: "আর্থিক লেনদেন: মালিক ব্যবসায়ে নগদ মূলধন বিনিয়োগ করেছেন।",
      ledgers: [
        { nameEn: "Cash Account", nameBn: "Cash Account (নগদ হিসাব)", categoryEn: "Real Asset", categoryBn: "সম্পদ (Real)", ruleEn: "Debit what comes in", ruleBn: "যা আসে তা ডেবিট", side: "Debit", amount: "₹5,00,000" },
        { nameEn: "Capital Account", nameBn: "Capital Account (মূলধন হিসাব)", categoryEn: "Personal / Equity", categoryBn: "মালিকানা (Personal)", ruleEn: "Credit the giver", ruleBn: "যে দেয় সে ক্রেডিট", side: "Credit", amount: "₹5,00,000" }
      ],
      tallyVoucherEn: "Receipt Voucher (F6)",
      tallyVoucherBn: "Receipt Voucher (F6)"
    },
    {
      id: 2,
      titleEn: "2. Purchased Office Machinery by Cheque ₹1,50,000",
      titleBn: "২. ব্যাংকের চেকের মাধ্যমে ₹১,৫০,০০০ টাকার অফিস যন্ত্রপাতি ক্রয়",
      step1En: "Asset acquisition via bank account payment.",
      step1Bn: "ব্যাংক অ্যাকাউন্টের মাধ্যমে স্থায়ী সম্পদ ক্রয়।",
      ledgers: [
        { nameEn: "Machinery Account", nameBn: "Machinery Account (যন্ত্রপাতি)", categoryEn: "Real Asset", categoryBn: "সম্পদ (Real)", ruleEn: "Debit what comes in (Asset increases)", ruleBn: "যা আসে তা ডেবিট", side: "Debit", amount: "₹1,50,000" },
        { nameEn: "Bank Account (HDFC)", nameBn: "Bank Account (এইচডিএফসি ব্যাংক)", categoryEn: "Personal / Asset", categoryBn: "ব্যক্তিবাচক / ব্যাংক", ruleEn: "Credit the giver (Bank balance decreases)", ruleBn: "যে দেয় সে ক্রেডিট", side: "Credit", amount: "₹1,50,000" }
      ],
      tallyVoucherEn: "Payment Voucher (F5)",
      tallyVoucherBn: "Payment Voucher (F5)"
    },
    {
      id: 3,
      titleEn: "3. Sold Goods on Credit to Roy & Co ₹80,000",
      titleBn: "৩. রয় অ্যান্ড কোং-এর নিকট বাকিতে ₹৮০,০০০ টাকার পণ্য বিক্রয়",
      step1En: "Credit sale transaction creating a Debtors ledger receivable.",
      step1Bn: "ধারে পণ্য বিক্রয় যা দেনাদার (Debtors) তৈরি করে।",
      ledgers: [
        { nameEn: "Roy & Co (Debtors)", nameBn: "Roy & Co (দেনাদার)", categoryEn: "Personal Asset", categoryBn: "ব্যক্তিবাচক সম্পদ", ruleEn: "Debit the receiver (Debtors increase)", ruleBn: "যে গ্রহণ করে সে ডেবিট", side: "Debit", amount: "₹80,000" },
        { nameEn: "Sales Account", nameBn: "Sales Account (বিক্রয় হিসাব)", categoryEn: "Nominal Revenue", categoryBn: "নামমাত্র আয়", ruleEn: "Credit all incomes & gains", ruleBn: "সকল আয় ও লাভ ক্রেডিট", side: "Credit", amount: "₹80,000" }
      ],
      tallyVoucherEn: "Sales Voucher (F8)",
      tallyVoucherBn: "Sales Voucher (F8)"
    },
    {
      id: 4,
      titleEn: "4. Paid Office Rent by Cash ₹25,000",
      titleBn: "৪. নগদে ₹২৫,০০০ টাকা অফিস ভাড়া প্রদান",
      step1En: "Operating expense payment out of cash balance.",
      step1Bn: "নগদ তহবিল থেকে পরিচালন ব্যয় প্রদান।",
      ledgers: [
        { nameEn: "Rent Expense Account", nameBn: "Rent Expense (ভাড়া খরচ)", categoryEn: "Nominal Expense", categoryBn: "নামমাত্র খরচ", ruleEn: "Debit all expenses & losses", ruleBn: "সকল খরচ ও ক্ষতি ডেবিট", side: "Debit", amount: "₹25,000" },
        { nameEn: "Cash Account", nameBn: "Cash Account (নগদ হিসাব)", categoryEn: "Real Asset", categoryBn: "সম্পদ (Real)", ruleEn: "Credit what goes out", ruleBn: "যা চলে যায় তা ক্রেডিট", side: "Credit", amount: "₹25,000" }
      ],
      tallyVoucherEn: "Payment Voucher (F5)",
      tallyVoucherBn: "Payment Voucher (F5)"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const questions = isBengali && questionsBn ? questionsBn : questionsEn;
  const noteText = isBengali && noteTextBn ? noteTextBn : noteTextEn;

  const currentTx = transactions[selectedTxIndex];

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
            <span>TallyPrime Master Series · Module 1.1 · Topic 9</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "ধাপে ধাপে লেনদেন বিশ্লেষণ লজিক: প্রভাবিত অ্যাকাউন্ট শনাক্তকরণ ও Debit vs Credit নিরূপণ"
              : "Step-by-Step Transaction Analysis Logic: Identifying Accounts Affected & Debit vs Credit"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "বাণিজ্যিক লেনদেন থেকে প্রভাবিত লেজারসমূহ খুঁজে বের করা, গোল্ডেন ও আধুনিক নিয়ম অনুযায়ী শ্রেণীবিভাগ করা এবং TallyPrime-এ সঠিক Voucher প্রবেশের পদ্ধতি।"
              : "Master the 4-step systematic logic to analyze commercial events, isolate affected ledgers, determine account categories, and assign equal Debit and Credit values."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. LESSON OVERVIEW & 4-STEP WORKFLOW ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-emerald-950/20 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-lg">
              🔍
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "লেনদেন বিশ্লেষণের ৪-ধাপের বৈজ্ঞানিক ফ্রেমওয়ার্ক" : "The 4-Step Scientific Transaction Analysis Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "হিসাববিজ্ঞানের মৌলিক ভিত্তি ও TallyPrime-এ নিখুঁত জার্নাল এন্ট্রি তৈরির লজিক" : "The foundational blueprint to break down raw events into error-free Debit & Credit entries"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-mono font-bold block w-fit">STEP 1</span>
              <strong className="text-white block text-sm">{isBengali ? "১. ঘটনা চিন্হিতকরণ" : "1. Event Validation"}</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "ঘটনাটি কি ব্যবসায়ের আর্থিক লেনদেন (Financial Event) নাকি অ-আর্থিক ঘটনা? শুধুমাত্র আর্থিক ঘটনা হিসাবভুক্ত হবে।" : "Confirm if the event causes a measurable change in financial position. Non-monetary events are ignored."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 font-mono font-bold block w-fit">STEP 2</span>
              <strong className="text-white block text-sm">{isBengali ? "২. প্রভাবিত অ্যাকাউন্ট শনাক্ত" : "2. Identify 2+ Ledgers"}</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "দ্বৈত সত্ত্বার (Dual Aspect) নিয়ম অনুযায়ী অন্তত ২টি প্রভাবিত লেজার অ্যাকাউন্ট (যেমন: Cash, Capital, Rent) বের করুন।" : "Under Dual Aspect principles, isolate the minimum two ledger accounts affected by the transaction."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 font-mono font-bold block w-fit">STEP 3</span>
              <strong className="text-white block text-sm">{isBengali ? "৩. হিসাবের ধরন নির্ধারণ" : "3. Classify Ledgers"}</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "গোল্ডেন রুল (Personal, Real, Nominal) অথবা আধুনিক নিয়ম (Asset, Liability, Capital, Expense, Revenue) অনুযায়ী সাজান।" : "Classify accounts using Golden Rules or Modern categories (Assets, Liabilities, Capital, Expenses, Income)."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="px-2.5 py-1 rounded bg-purple-950 text-purple-300 font-mono font-bold block w-fit">STEP 4</span>
              <strong className="text-white block text-sm">{isBengali ? "৪. Dr vs Cr প্রয়োগ" : "4. Apply Dr & Cr Rules"}</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "সম্পদ/খরচ বাড়লে Dr, কমলে Cr; দায়/মূলধন/আয় বাড়লে Cr, কমলে Dr নিয়ম প্রয়োগ করে সমপরিমাণ টাকা বসান।" : "Execute Debit vs Credit rules ensuring Total Debit Amount strictly equals Total Credit Amount."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── 2. LIVE INTERACTIVE TRANSACTION ANALYZER WORKBENCH ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span>
            <span>{isBengali ? "ইন্টারেক্টিভ ট্রানজ্যাকশন অ্যানালাইজার ওয়ার্কবেঞ্চ" : "Interactive Transaction Analyzer Workbench"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* Scenario Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                {isBengali ? "বাণিজ্যিক লেনদেন বেছে নিন:" : "Select Commercial Transaction Scenario:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {transactions.map((tx, idx) => (
                  <button
                    key={tx.id}
                    onClick={() => setSelectedTxIndex(idx)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold transition border ${
                      selectedTxIndex === idx
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {isBengali ? tx.titleBn : tx.titleEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Analysis Output Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-emerald-300">
                  {isBengali ? currentTx.titleBn : currentTx.titleEn}
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono text-xs font-bold w-fit">
                  Tally Voucher: {isBengali ? currentTx.tallyVoucherBn : currentTx.tallyVoucherEn}
                </span>
              </div>

              {/* Step 1 Context */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <strong className="text-emerald-400 font-mono block mb-1">Step 1 Validation:</strong>
                {isBengali ? currentTx.step1Bn : currentTx.step1En}
              </div>

              {/* Step 2-4 Ledger Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                      <th className="p-3">{isBengali ? "প্রভাবিত লেজার (Ledger)" : "Affected Ledger"}</th>
                      <th className="p-3">{isBengali ? "শ্রেণীবিভাগ (Category)" : "Category / Nature"}</th>
                      <th className="p-3">{isBengali ? "প্রযুক্ত নিয়ম (Rule Applied)" : "Rule Applied"}</th>
                      <th className="p-3 text-center">{isBengali ? "দিক (Side)" : "Debit / Credit"}</th>
                      <th className="p-3 text-right">{isBengali ? "টাকা (Amount)" : "Amount"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {currentTx.ledgers.map((leg, idx) => (
                      <tr key={idx} className={leg.side === "Debit" ? "bg-emerald-950/20" : "bg-sky-950/20"}>
                        <td className="p-3 font-bold text-white">{isBengali ? leg.nameBn : leg.nameEn}</td>
                        <td className="p-3 text-slate-300">{isBengali ? leg.categoryBn : leg.categoryEn}</td>
                        <td className="p-3 text-slate-400">{isBengali ? leg.ruleBn : leg.ruleEn}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                            leg.side === "Debit"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                              : "bg-sky-950 text-sky-300 border border-sky-700"
                          }`}>
                            {leg.side}
                          </span>
                        </td>
                        <td className="p-3 text-right font-bold text-white">{leg.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic9_study_note_bn.txt" : "topic9_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 4. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৯ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 9 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 5. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "যেকোনো জটিল লেনদেন বিশ্লেষণ করার সময় সর্বপ্রথমে দুটি প্রভাবিত লেজার চিনতে শিখুন—এর ফলে TallyPrime-এ সঠিক Voucher টাইপ (F4, F5, F6, F8, F9) নির্বাচন পানির মতো সহজ হয়ে যাবে!"
                : "Always isolate the two affected ledger accounts first before applying rules! Master this 4-step logic and selecting TallyPrime vouchers (F4 Contras, F5 Payments, F6 Receipts, F8 Sales) will become automatic!"
            }
          />
        </section>

      </div>
    </>
  );
}
