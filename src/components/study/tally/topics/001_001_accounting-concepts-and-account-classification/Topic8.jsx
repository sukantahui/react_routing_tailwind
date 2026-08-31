"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic8_files/topic8_questions";
import questionsBn from "./topic8_files/topic8_questions_bn";
import noteTextEn from "./topic8_files/topic8_note.txt?raw";
import noteTextBn from "./topic8_files/topic8_note_bn.txt?raw";

/**
 * Topic 8 – Modern Classification of Accounts: Assets, Liabilities, Capital, Expenses, and Incomes (DEAD & CLEAR)
 * Module: 001_001_accounting-concepts-and-account-classification
 * Track: TallyPrime Master Series – CNAT Academy
 *
 * @component
 * @returns {JSX.Element} High-efficiency interactive topic component featuring live ledger classification lookup,
 *                        DEAD & CLEAR acronym breakdown, Traditional vs. Modern comparison matrix, and Tally group mapping.
 */
export default function Topic8() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("dead_clear");
  const [selectedLedgerIndex, setSelectedLedgerIndex] = useState(0);

  const sampleLedgers = [
    {
      nameEn: "Factory Plant & Machinery",
      nameBn: "কারখানা ও যন্ত্রপাতি",
      categoryEn: "Asset",
      categoryBn: "সম্পদ (Asset)",
      acronym: "DEAD",
      normalBalance: "Debit",
      increaseRuleEn: "+ Increase ⇒ DEBIT",
      increaseRuleBn: "+ বৃদ্ধি পেলে ⇒ ডেবিট",
      decreaseRuleEn: "- Decrease ⇒ CREDIT",
      decreaseRuleBn: "- হ্রাস পেলে ⇒ ক্রেডিট",
      tallyGroupEn: "Fixed Assets",
      tallyGroupBn: "Fixed Assets (স্থায়ী সম্পদ)",
      statementEn: "Balance Sheet (Asset Side)",
      statementBn: "ব্যালেন্স শিট (সম্পদ দিক)"
    },
    {
      nameEn: "Bank Overdraft Facility (HDFC)",
      nameBn: "এইচডিএফসি ব্যাংক ওভারড্রাফট",
      categoryEn: "Liability",
      categoryBn: "দায় (Liability)",
      acronym: "CLEAR",
      normalBalance: "Credit",
      increaseRuleEn: "+ Increase ⇒ CREDIT",
      increaseRuleBn: "+ বৃদ্ধি পেলে ⇒ ক্রেডিট",
      decreaseRuleEn: "- Decrease ⇒ DEBIT",
      decreaseRuleBn: "- হ্রাস পেলে ⇒ ডেবিট",
      tallyGroupEn: "Bank OD A/c (Current Liabilities)",
      tallyGroupBn: "Bank OD A/c (চলতি দায়)",
      statementEn: "Balance Sheet (Liability Side)",
      statementBn: "ব্যালেন্স শিট (দায় দিক)"
    },
    {
      nameEn: "Proprietor's Capital Investment",
      nameBn: "মালিকের মূলধন বিনিয়োগ",
      categoryEn: "Capital / Equity",
      categoryBn: "মূলধন / ইকুইটি",
      acronym: "CLEAR",
      normalBalance: "Credit",
      increaseRuleEn: "+ Increase ⇒ CREDIT",
      increaseRuleBn: "+ বৃদ্ধি পেলে ⇒ ক্রেডিট",
      decreaseRuleEn: "- Decrease ⇒ DEBIT",
      decreaseRuleBn: "- হ্রাস পেলে ⇒ ডেবিট",
      tallyGroupEn: "Capital Account",
      tallyGroupBn: "Capital Account (মূলধন হিসাব)",
      statementEn: "Balance Sheet (Liability Side)",
      statementBn: "ব্যালেন্স শিট (দায় দিক)"
    },
    {
      nameEn: "Office Staff Salary Expense",
      nameBn: "অফিস কর্মীদের বেতন খরচ",
      categoryEn: "Expense",
      categoryBn: "ব্যয় (Expense)",
      acronym: "DEAD",
      normalBalance: "Debit",
      increaseRuleEn: "+ Increase ⇒ DEBIT",
      increaseRuleBn: "+ বৃদ্ধি পেলে ⇒ ডেবিট",
      decreaseRuleEn: "- Decrease ⇒ CREDIT",
      decreaseRuleBn: "- হ্রাস পেলে ⇒ ক্রেডিট",
      tallyGroupEn: "Indirect Expenses",
      tallyGroupBn: "Indirect Expenses (পরোক্ষ খরচ)",
      statementEn: "Profit & Loss Account (Debit Side)",
      statementBn: "লাভ-ক্ষতি হিসাব (ডেবিট দিক)"
    },
    {
      nameEn: "Sales Turnover Revenue",
      nameBn: "পণ্য বিক্রয়লব্ধ আয়",
      categoryEn: "Revenue / Income",
      categoryBn: "আয় (Revenue)",
      acronym: "CLEAR",
      normalBalance: "Credit",
      increaseRuleEn: "+ Increase ⇒ CREDIT",
      increaseRuleBn: "+ বৃদ্ধি পেলে ⇒ ক্রেডিট",
      decreaseRuleEn: "- Decrease ⇒ DEBIT",
      decreaseRuleBn: "- হ্রাস পেলে ⇒ ডেবিট",
      tallyGroupEn: "Sales Accounts",
      tallyGroupBn: "Sales Accounts (বিক্রয় হিসাব)",
      statementEn: "Trading Account (Credit Side)",
      statementBn: "ট্রেডিং অ্যাকাউন্ট (ক্রেডিট দিক)"
    }
  ];

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

  const currentLedger = sampleLedgers[selectedLedgerIndex];

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
            <span>TallyPrime Master Series · Module 1.1 · Topic 8</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "অ্যাকাউন্টিং-এর আধুনিক শ্রেণীবিভাগ: DEAD & CLEAR সিস্টেম ও ৫টি ক্যাটাগরি"
              : "Modern Classification of Accounts: The DEAD & CLEAR Rule System"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "কম্পিউটারাইজড হিসাববিজ্ঞানের (TallyPrime) জন্য ৫টি আধুনিক শ্রেণীবিভাগ (Assets, Liabilities, Capital, Revenue, Expenses) এবং নির্ভুল বৃদ্ধি/হ্রাস নিয়ম।"
              : "Modern 5-category accounting rules defining increase/decrease debit-credit behavior directly aligned with TallyPrime parent groups."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. HIGH-EFFICIENCY DEAD & CLEAR CONCEPT & SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "আলোকপাত: DEAD & CLEAR অ্যাক্রোনিম ফ্রেমওয়ার্ক" : "Spotlight: The DEAD & CLEAR Acronym Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "আধুনিক ৫টি অ্যাকাউন্টিং ক্যাটাগরির ডেবিট ও ক্রেডিট স্বাভাবিক জের" : "Master normal debit and credit balances for modern computerized accounting software"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("dead_clear")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "dead_clear" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "DEAD & CLEAR নিয়ম" : "DEAD & CLEAR System"}
              </button>
              <button
                onClick={() => setActiveTab("simulator")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "simulator" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "লেজার ক্লাসিফায়ার" : "Live Ledger Classifier"}
              </button>
            </div>
          </div>

          {activeTab === "dead_clear" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DEAD Card */}
              <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-rose-500/30 pb-3">
                  <h3 className="text-lg font-bold text-rose-300 font-mono">D.E.A.D = DEBIT NORMAL</h3>
                  <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 text-xs font-mono font-bold border border-rose-700">
                    Normal Balance: DEBIT
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBengali
                    ? "Drawings, Expenses, এবং Assets বৃদ্ধি পেলে সর্বদা DEBIT করা হয়, এবং হ্রাস পেলে CREDIT করা হয়।"
                    : "Expenses, Assets, and Drawings increase with a DEBIT and decrease with a CREDIT."}
                </p>
                <div className="space-y-2 text-xs font-mono text-slate-200">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>Expenses (ব্যয়)</span>
                    <span className="text-emerald-400 font-bold">+Dr / -Cr</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>Assets (সম্পদ)</span>
                    <span className="text-emerald-400 font-bold">+Dr / -Cr</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>Drawings (উত্তোলন)</span>
                    <span className="text-emerald-400 font-bold">+Dr / -Cr</span>
                  </div>
                </div>
              </div>

              {/* CLEAR Card */}
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                  <h3 className="text-lg font-bold text-emerald-300 font-mono">C.L.E.A.R = CREDIT NORMAL</h3>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-mono font-bold border border-emerald-700">
                    Normal Balance: CREDIT
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBengali
                    ? "Capital, Liabilities, Equity, এবং Revenue বৃদ্ধি পেলে সর্বদা CREDIT করা হয়, এবং হ্রাস পেলে DEBIT করা হয়।"
                    : "Capital, Liabilities, Equity, and Revenue increase with a CREDIT and decrease with a DEBIT."}
                </p>
                <div className="space-y-2 text-xs font-mono text-slate-200">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>Capital / Equity (মূলধন)</span>
                    <span className="text-sky-400 font-bold">+Cr / -Dr</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>Liabilities (দায়)</span>
                    <span className="text-sky-400 font-bold">+Cr / -Dr</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                    <span>Revenue / Income (আয়)</span>
                    <span className="text-sky-400 font-bold">+Cr / -Dr</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Ledger Selector Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                  {isBengali ? "পরীক্ষার জন্য বাণিজ্যিক লেজার বেছে নিন:" : "Select Commercial Ledger Account to Test:"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {sampleLedgers.map((l, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedLedgerIndex(idx)}
                      className={`p-2.5 rounded-xl text-left text-xs font-semibold font-mono transition border ${
                        selectedLedgerIndex === idx
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {isBengali ? l.nameBn : l.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Breakdown Card */}
              <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white">
                    {isBengali ? currentLedger.nameBn : currentLedger.nameEn}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-xs font-bold">
                      Category: {isBengali ? currentLedger.categoryBn : currentLedger.categoryEn}
                    </span>
                    <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                      currentLedger.acronym === "DEAD" ? "bg-rose-950 text-rose-300 border border-rose-700" : "bg-emerald-950 text-emerald-300 border border-emerald-700"
                    }`}>
                      System: {currentLedger.acronym}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[11px]">Normal Balance</span>
                    <strong className="text-white text-sm block">{currentLedger.normalBalance}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[11px]">Increase Rule</span>
                    <strong className="text-emerald-400 text-sm block">{isBengali ? currentLedger.increaseRuleBn : currentLedger.increaseRuleEn}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[11px]">Tally Primary Group</span>
                    <strong className="text-sky-300 text-xs block">{isBengali ? currentLedger.tallyGroupBn : currentLedger.tallyGroupEn}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[11px]">Financial Statement</span>
                    <strong className="text-teal-300 text-xs block">{isBengali ? currentLedger.statementBn : currentLedger.statementEn}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. TRADITIONAL VS MODERN COMPARISON MATRIX ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">⚖️</span>
            <span>{isBengali ? "সনাতন গোল্ডেন রুলস বনাম আধুনিক ৫-ক্যাটাগরি ব্যবস্থার তুলনা" : "Traditional Approach vs. Modern 5-Category Approach"}</span>
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-200 border-b border-slate-800">
                  <th className="p-3.5">Basis / মানদণ্ড</th>
                  <th className="p-3.5 text-amber-400">Traditional Golden Rules</th>
                  <th className="p-3.5 text-emerald-400">Modern 5-Category System (DEAD &amp; CLEAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3.5 font-bold text-white">Classification Categories</td>
                  <td className="p-3.5">3 Accounts: Personal, Real, Nominal</td>
                  <td className="p-3.5 text-emerald-300 font-bold">5 Categories: Assets, Liabilities, Capital, Expenses, Revenues</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Primary Focus</td>
                  <td className="p-3.5">Receiver/Giver, In/Out, Expense/Income rules</td>
                  <td className="p-3.5">Normal Balance &amp; Increase (+)/Decrease (-) equation</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">TallyPrime Alignment</td>
                  <td className="p-3.5">Requires manual mental mapping</td>
                  <td className="p-3.5 text-sky-300 font-bold">Directly maps to Tally's 28 Predefined Groups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── 3. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic8_study_note_bn.txt" : "topic8_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 4. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৮ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 8 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 5. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "আধুনিক নিয়মাবলী (DEAD & CLEAR) জানা থাকলে TallyPrime-এর যেকানো জটিল ভাউচার এন্ট্রি কয়েক সেকেন্ডে ভুলমুক্তভাবে পাস করা যায়!"
                : "Mastering the DEAD & CLEAR acronym system lets you solve any complex TallyPrime voucher entry flawlessly in seconds!"
            }
          />
        </section>

      </div>
    </>
  );
}
