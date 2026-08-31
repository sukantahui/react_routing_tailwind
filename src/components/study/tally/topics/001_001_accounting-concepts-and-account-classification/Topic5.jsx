"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic5_files/topic5_questions";
import questionsBn from "./topic5_files/topic5_questions_bn";
import noteTextEn from "./topic5_files/topic5_note.txt?raw";
import noteTextBn from "./topic5_files/topic5_note_bn.txt?raw";

/**
 * Topic 5 – Traditional Approach: The Golden Rules of Accounting (Personal, Real & Nominal)
 * Module: 001_001_accounting-concepts-and-account-classification
 * Track: TallyPrime Master Series – CNAT Academy
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial featuring side-by-side Golden Rules master matrix,
 *                        live Golden Rule application lab, bilingual support, diagnostic assessment, and printable study notes.
 */
export default function Topic5() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [selectedRuleTab, setSelectedRuleTab] = useState("personal");
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  const rulesData = {
    personal: {
      titleEn: "1. Personal Accounts (ব্যক্তিবাচক হিসাব)",
      ruleEn: "DEBIT THE RECEIVER, CREDIT THE GIVER",
      ruleBn: "যে সুবিধা গ্রহণ করে সে ডেবিট, যে সুবিধা প্রদান করে সে ক্রেডিট",
      scopeEn: "Relates to individuals, human proprietors, registered corporate firms, banks, and representative personal ledgers.",
      scopeBn: "ব্যক্তি, মালিক, প্রতিষ্ঠান, ব্যাংক এবং প্রতিনিধি লেজারের ক্ষেত্রে প্রযোজ্য।",
      exampleEn: "Paid cash ₹10,000 to Ramesh -> Ramesh (Receiver) Dr, Cash A/c Cr.",
      exampleBn: "রমেশকে ১০,০০০ টাকা প্রদান -> Ramesh A/c Dr, Cash A/c Cr.",
      tallyGroupsEn: "Sundry Debtors, Sundry Creditors, Capital Account, Bank Accounts"
    },
    real: {
      titleEn: "2. Real Accounts (সম্পত্তিবাচক হিসাব)",
      ruleEn: "DEBIT WHAT COMES IN, CREDIT WHAT GOES OUT",
      ruleBn: "যা ব্যবসায়ে আসে তা ডেবিট, যা ব্যবসা থেকে চলে যায় তা ক্রেডিট",
      scopeEn: "Relates to tangible properties (Land, Machinery, Cash, Stock) and intangible assets (Goodwill, Patents).",
      scopeBn: "দৃশ্যমান সম্পদ (নগদ, আসবাবপত্র, জমি) এবং অদৃশ্যমান সম্পদ (সুনাম, প্যাটেন্ট)-এর ক্ষেত্রে প্রযোজ্য।",
      exampleEn: "Purchased Furniture for Cash ₹25,000 -> Furniture A/c (Comes in) Dr, Cash A/c (Goes out) Cr.",
      exampleBn: "নগদে আসবাবপত্র ক্রয় ২৫,০০০ টাকা -> Furniture A/c Dr, Cash A/c Cr.",
      tallyGroupsEn: "Cash-in-Hand, Fixed Assets, Investments, Stock-in-Hand"
    },
    nominal: {
      titleEn: "3. Nominal Accounts (নামমাত্র / আয়-ব্যয় হিসাব)",
      ruleEn: "DEBIT ALL EXPENSES & LOSSES, CREDIT ALL INCOMES & GAINS",
      ruleBn: "সকল প্রকার খরচ ও ক্ষতি ডেবিট, সকল প্রকার আয় ও লাভ ক্রেডিট",
      scopeEn: "Relates to operational expenses, losses, sales turnover, interest received, and financial gains.",
      scopeBn: "পরিচালন ব্যয়, ক্ষতি, বিক্রয়লব্ধ আয়, প্রাপ্ত কমিশন ও সুদের ক্ষেত্রে প্রযোজ্য।",
      exampleEn: "Paid Shop Rent ₹15,000 in Cash -> Rent A/c (Expense) Dr, Cash A/c Cr.",
      exampleBn: "ভাড়া প্রদান ১৫,০০০ টাকা -> Rent A/c Dr, Cash A/c Cr.",
      tallyGroupsEn: "Direct Expenses, Indirect Expenses, Sales Accounts, Indirect Incomes"
    }
  };

  const labScenarios = [
    {
      titleEn: "Paid cash ₹12,000 to Supplier Ramesh",
      titleBn: "পাওনাদার রমেশকে নগদে ১২,০০০ টাকা প্রদান",
      debitLedgerEn: "Ramesh Account (Personal - Receiver)",
      debitLedgerBn: "Ramesh Account (ব্যক্তিবাচক - গ্রহীতা)",
      debitRuleEn: "Debit the Receiver",
      debitRuleBn: "যে গ্রহণ করে সে ডেবিট",
      creditLedgerEn: "Cash Account (Real - Goes out)",
      creditLedgerBn: "Cash Account (সম্পত্তি - চলে যায়)",
      creditRuleEn: "Credit what goes out",
      creditRuleBn: "যা চলে যায় তা ক্রেডিট",
      tallyVoucherEn: "Payment Voucher (F5)",
      tallyVoucherBn: "Payment Voucher (F5)"
    },
    {
      titleEn: "Purchased Office Computer for Cash ₹35,000",
      titleBn: "নগদে ৩৫,০০০ টাকার অফিস কম্পিউটার ক্রয়",
      debitLedgerEn: "Computer Account (Real - Comes in)",
      debitLedgerBn: "Computer Account (সম্পত্তি - আসে)",
      debitRuleEn: "Debit what comes in",
      debitRuleBn: "যা আসে তা ডেবিট",
      creditLedgerEn: "Cash Account (Real - Goes out)",
      creditLedgerBn: "Cash Account (সম্পত্তি - চলে যায়)",
      creditRuleEn: "Credit what goes out",
      creditRuleBn: "যা চলে যায় তা ক্রেডিট",
      tallyVoucherEn: "Payment Voucher (F5) / Purchase (F9)",
      tallyVoucherBn: "Payment Voucher (F5) / Purchase (F9)"
    },
    {
      titleEn: "Paid Staff Salary by Cheque ₹28,000",
      titleBn: "চেকের মাধ্যমে ২৮,০০০ টাকা কর্মীদের বেতন প্রদান",
      debitLedgerEn: "Salary Expense Account (Nominal - Expense)",
      debitLedgerBn: "Salary Expense (নামমাত্র - খরচ)",
      debitRuleEn: "Debit all expenses & losses",
      debitRuleBn: "সকল খরচ ও ক্ষতি ডেবিট",
      creditLedgerEn: "Bank Account (Personal - Giver)",
      creditLedgerBn: "Bank Account (ব্যক্তিবাচক - দাতা)",
      creditRuleEn: "Credit the giver (Bank pays)",
      creditRuleBn: "যে প্রদান করে সে ক্রেডিট",
      tallyVoucherEn: "Payment Voucher (F5)",
      tallyVoucherBn: "Payment Voucher (F5)"
    },
    {
      titleEn: "Received Commission Cash ₹8,000",
      titleBn: "নগদে ৮,০০০ টাকা কমিশন প্রাপ্তি",
      debitLedgerEn: "Cash Account (Real - Comes in)",
      debitLedgerBn: "Cash Account (সম্পত্তি - আসে)",
      debitRuleEn: "Debit what comes in",
      debitRuleBn: "যা আসে তা ডেবিট",
      creditLedgerEn: "Commission Income Account (Nominal - Income)",
      creditLedgerBn: "Commission Income (নামমাত্র - আয়)",
      creditRuleEn: "Credit all incomes & gains",
      creditRuleBn: "সকল আয় ও লাভ ক্রেডিট",
      tallyVoucherEn: "Receipt Voucher (F6)",
      tallyVoucherBn: "Receipt Voucher (F6)"
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

  const currentScenario = labScenarios[selectedScenarioIndex];

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
            <span>TallyPrime Master Series · Module 1.1 · Topic 5</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "অ্যাকাউন্টিং-এর সনাতন বা গোল্ডেন রুলস: Personal, Real এবং Nominal Accounts"
              : "Traditional Approach: The Golden Rules of Accounting (Personal, Real & Nominal)"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "দ্বৈত সত্তা বুককিপিংয়ের শতবর্ষ প্রাচীন ৩টি গোল্ডেন রুলস এবং TallyPrime ভাউচারে তাদের বাস্তব প্রয়োগ।"
              : "Mastering the classic 3 Golden Rules governing Debit and Credit assignments for error-free ledger entries."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. INTERACTIVE GOLDEN RULES MASTER EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "গোল্ডেন রুলস ইন্টারঅ্যাকটিভ মাস্টারক্লাস" : "Golden Rules Interactive Masterclass"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "অ্যাকাউন্টের ধরন নির্বাচন করে ডেবিট ও ক্রেডিট সুত্র জানুন" : "Select account type to inspect exact Debit/Credit rules, scope, and parent Tally groups"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["personal", "real", "nominal"].map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRuleTab(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition ${
                    selectedRuleTab === r ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {r} Account
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-emerald-300">
              {rulesData[selectedRuleTab].titleEn}
            </h3>

            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 font-mono text-sm text-emerald-400 font-bold text-center tracking-wide">
              {isBengali ? rulesData[selectedRuleTab].ruleBn : rulesData[selectedRuleTab].ruleEn}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
                <strong className="text-sky-300 block">Scope & Applicability:</strong>
                <p className="text-slate-300 font-sans">{isBengali ? rulesData[selectedRuleTab].scopeBn : rulesData[selectedRuleTab].scopeEn}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 space-y-1">
                <strong className="text-teal-300 block">Mapped Tally Groups:</strong>
                <p className="text-slate-200">{rulesData[selectedRuleTab].tallyGroupsEn}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-800/60 text-xs font-mono text-emerald-300">
              <strong>Practical Formula Example:</strong> {isBengali ? rulesData[selectedRuleTab].exampleBn : rulesData[selectedRuleTab].exampleEn}
            </div>
          </div>
        </section>

        {/* ─── 2. LIVE GOLDEN RULE APPLICATION LAB ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">⚡</span>
            <span>{isBengali ? "গোল্ডেন রুলস ল্যাব: প্র্যাকটিক্যাল লেনদেন সিমুলেটর" : "Golden Rules Application Lab: Practical Transaction Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {/* Scenario Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                {isBengali ? "বাণিজ্যিক লেনদেন বেছে নিন:" : "Select Commercial Transaction Scenario:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {labScenarios.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScenarioIndex(idx)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold transition border ${
                      selectedScenarioIndex === idx
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isBengali ? sc.titleBn : sc.titleEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Scenario Output Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-emerald-300">
                  {isBengali ? currentScenario.titleBn : currentScenario.titleEn}
                </h3>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-teal-300 font-mono text-xs font-bold w-fit">
                  Tally Voucher: {isBengali ? currentScenario.tallyVoucherBn : currentScenario.tallyVoucherEn}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/60 space-y-2">
                  <span className="text-emerald-400 font-bold block">DEBIT (Dr): {isBengali ? currentScenario.debitLedgerBn : currentScenario.debitLedgerEn}</span>
                  <span className="text-slate-300 block">Applied Rule: {isBengali ? currentScenario.debitRuleBn : currentScenario.debitRuleEn}</span>
                </div>

                <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-800/60 space-y-2">
                  <span className="text-sky-400 font-bold block">CREDIT (Cr): {isBengali ? currentScenario.creditLedgerBn : currentScenario.creditLedgerEn}</span>
                  <span className="text-slate-300 block">Applied Rule: {isBengali ? currentScenario.creditRuleBn : currentScenario.creditRuleEn}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic5_study_note_bn.txt" : "topic5_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 4. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৫ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 5 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 5. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "গোল্ডেন রুলস আয়ত্ত করা হলো অ্যাকাউন্ট্যান্টের প্রথম বড় বিজয়! Personal (Receiver/Giver), Real (In/Out), Nominal (Expense/Income) সঠিকভাবে স্মরণে রাখুন।"
                : "Mastering the Golden Rules is the first major milestone for any commercial accountant! Keep Personal (Receiver/Giver), Real (In/Out), and Nominal (Expense/Income) clear in your mind."
            }
          />
        </section>

      </div>
    </>
  );
}
