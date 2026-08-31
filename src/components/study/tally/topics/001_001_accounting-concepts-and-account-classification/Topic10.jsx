"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic10_files/topic10_questions";
import questionsBn from "./topic10_files/topic10_questions_bn";
import noteTextEn from "./topic10_files/topic10_note.txt?raw";
import noteTextBn from "./topic10_files/topic10_note_bn.txt?raw";

/**
 * Topic 10 – Practical Transaction Illustrations: Cash Purchase, Credit Purchase, Sales, Expenses, Income, Drawings & Capital
 * Module: 001_001_accounting-concepts-and-account-classification
 * Track: TallyPrime Master Series – CNAT Academy
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with practical commercial transaction categories,
 *                        live transaction matrix workbench, bilingual support, assessment tests, and print/download notes.
 */
export default function Topic10() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [selectedCategory, setSelectedCategory] = useState("purchases");

  const transactionData = {
    purchases: [
      {
        titleEn: "Cash Purchase of Goods ₹45,000",
        titleBn: "নগদে ₹৪৫,০০০ টাকার পণ্য ক্রয়",
        descEn: "Goods purchased for resale paid immediately in cash.",
        descBn: "পুনর্বিক্রয়ের জন্য নগদে পণ্য ক্রয় করা হলো।",
        drLedgerEn: "Purchase Account (Expense / Real)",
        drLedgerBn: "Purchase Account (ক্রয় হিসাব)",
        crLedgerEn: "Cash Account (Asset / Real)",
        crLedgerBn: "Cash Account (নগদ হিসাব)",
        drRuleEn: "Debit all expenses / What comes in",
        drRuleBn: "সকল খরচ ডেবিট / যা আসে তা ডেবিট",
        crRuleEn: "Credit what goes out (Cash decreases)",
        crRuleBn: "যা চলে যায় তা ক্রেডিট",
        voucherEn: "Purchase Voucher (F9) / Payment (F5)",
        voucherBn: "Purchase Voucher (F9) / Payment (F5)"
      },
      {
        titleEn: "Credit Purchase from ABC Traders ₹1,20,000",
        titleBn: "ABC ট্রেডার্স-এর কাছ থেকে বাকিতে ₹১,২০,০০০ টাকার পণ্য ক্রয়",
        descEn: "Goods acquired on credit terms creating a Sundry Creditor liability.",
        descBn: "ধারে পণ্য ক্রয় যা পাওনাদার (Sundry Creditors) তৈরি করে।",
        drLedgerEn: "Purchase Account (Expense)",
        drLedgerBn: "Purchase Account (ক্রয় হিসাব)",
        crLedgerEn: "ABC Traders (Sundry Creditors / Liability)",
        crLedgerBn: "ABC Traders (পাওনাদার / দায়)",
        drRuleEn: "Debit the expense (Asset/Expense increases)",
        drRuleBn: "খরচ বৃদ্ধি ডেবিট",
        crRuleEn: "Credit the giver / Liability increases",
        crRuleBn: "যে দেয় সে ক্রেডিট / দায় বৃদ্ধি",
        voucherEn: "Purchase Voucher (F9)",
        voucherBn: "Purchase Voucher (F9)"
      }
    ],
    sales: [
      {
        titleEn: "Cash Sales of Goods ₹65,000",
        titleBn: "নগদে ₹৬৫,০০০ টাকার পণ্য বিক্রয়",
        descEn: "Inventory sold for immediate cash collection.",
        descBn: "নগদ অর্থে পণ্য বিক্রয় করা হলো।",
        drLedgerEn: "Cash Account (Asset / Real)",
        drLedgerBn: "Cash Account (নগদ হিসাব)",
        crLedgerEn: "Sales Account (Revenue / Nominal)",
        crLedgerBn: "Sales Account (বিক্রয় হিসাব)",
        drRuleEn: "Debit what comes in (Cash increases)",
        drRuleBn: "যা আসে তা ডেবিট (নগদ বৃদ্ধি)",
        crRuleEn: "Credit all incomes & gains",
        crRuleBn: "সকল আয় ও লাভ ক্রেডিট",
        voucherEn: "Sales Voucher (F8) / Receipt (F6)",
        voucherBn: "Sales Voucher (F8) / Receipt (F6)"
      },
      {
        titleEn: "Credit Sales to Star Enterprises ₹95,000",
        titleBn: "স্টার এন্টারপ্রাইজ-এর নিকট বাকিতে ₹৯৫,০০০ টাকার পণ্য বিক্রয়",
        descEn: "Goods sold on credit creating a Sundry Debtor asset.",
        descBn: "ধারে পণ্য বিক্রয় যা দেনাদার (Sundry Debtors) তৈরি করে।",
        drLedgerEn: "Star Enterprises (Sundry Debtors / Asset)",
        drLedgerBn: "Star Enterprises (দেনাদার / সম্পদ)",
        crLedgerEn: "Sales Account (Revenue)",
        crLedgerBn: "Sales Account (বিক্রয় হিসাব)",
        drRuleEn: "Debit the receiver / Asset increases",
        drRuleBn: "যে গ্রহণ করে সে ডেবিট / সম্পদ বৃদ্ধি",
        crRuleEn: "Credit all incomes & revenue",
        crRuleBn: "সকল আয় ক্রেডিট",
        voucherEn: "Sales Voucher (F8)",
        voucherBn: "Sales Voucher (F8)"
      }
    ],
    expenses: [
      {
        titleEn: "Paid Electricity Bill by Cheque ₹12,50,00",
        titleBn: "চেকের মাধ্যমে ₹১২,৫০০ টাকা বিদ্যুৎ বিল প্রদান",
        descEn: "Indirect utility operational expense paid via bank account.",
        descBn: "ব্যাংক অ্যাকাউন্টের মাধ্যমে পরোক্ষ পরিচালন ব্যয় প্রদান।",
        drLedgerEn: "Electricity Expense Account (Nominal)",
        drLedgerBn: "Electricity Expense (বিদ্যুৎ খরচ)",
        crLedgerEn: "Bank Account (Asset / Personal)",
        crLedgerBn: "Bank Account (ব্যাংক হিসাব)",
        drRuleEn: "Debit all expenses & losses",
        drRuleBn: "সকল খরচ ও ক্ষতি ডেবিট",
        crRuleEn: "Credit the giver (Bank balance decreases)",
        crRuleBn: "যে দেয় সে ক্রেডিট (ব্যাংক কমবে)",
        voucherEn: "Payment Voucher (F5)",
        voucherBn: "Payment Voucher (F5)"
      }
    ],
    capital: [
      {
        titleEn: "Proprietor Withdrew Cash for Personal Use ₹15,000",
        titleBn: "মালিক ব্যক্তিগত প্রয়োজনে ব্যবসা থেকে নগদে ₹১৫,০০০ টাকা উত্তোলন করলেন",
        descEn: "Proprietor drawings reducing net owner equity.",
        descBn: "মালিকের ব্যক্তিগত উত্তোলন যা ব্যবসায়ের নিট মূলধন হ্রাস করে।",
        drLedgerEn: "Drawings Account (Capital Deduction)",
        drLedgerBn: "Drawings Account (উত্তোলন হিসাব)",
        crLedgerEn: "Cash Account (Asset)",
        crLedgerBn: "Cash Account (নগদ হিসাব)",
        drRuleEn: "Debit the receiver (Owner equity decreases)",
        drRuleBn: "যে গ্রহণ করে সে ডেবিট (মালিকানা হ্রাস)",
        crRuleEn: "Credit what goes out (Cash decreases)",
        crRuleBn: "যা চলে যায় তা ক্রেডিট",
        voucherEn: "Payment Voucher (F5)",
        voucherBn: "Payment Voucher (F5)"
      }
    ]
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
            <span>TallyPrime Master Series · Module 1.1 · Topic 10</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "বাস্তবধর্মী ব্যবসায়িক লেনদেনের উদাহরণ ও TallyPrime এন্ট্রি গাইড"
              : "Practical Commercial Transaction Illustrations & TallyPrime Voucher Guide"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "নগদ ও ধারে ক্রয়-বিক্রয়, খরচ, আয়, ড্রয়িংস এবং মূলধন লেনদেনের সহজ ও ধারাবাহিক বিশ্লেষণ।"
              : "Comprehensive practical walkthrough of standard commercial transactions mapped to TallyPrime voucher types and debit-credit entries."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. INTERACTIVE TRANSACTION CATEGORY NAVIGATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "লেনদেনের ধরন অনুযায়ী বিশ্লেষণ ও ভাউচার ম্যাপিং" : "Transaction Category Analysis & Voucher Mapping"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "বাণিজ্যিক লেনদেনের ধরন নির্বাচন করে Debit/Credit ও Tally Key জানুন" : "Select transaction categories to explore ledgers, rules, and TallyPrime voucher shortcuts"}
              </p>
            </div>
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedCategory("purchases")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  selectedCategory === "purchases" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "ক্রয় (Purchases)" : "Purchases"}
              </button>
              <button
                onClick={() => setSelectedCategory("sales")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  selectedCategory === "sales" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "বিক্রয় (Sales)" : "Sales"}
              </button>
              <button
                onClick={() => setSelectedCategory("expenses")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  selectedCategory === "expenses" ? "bg-rose-950 text-rose-300 border border-rose-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "খরচ (Expenses)" : "Expenses"}
              </button>
              <button
                onClick={() => setSelectedCategory("capital")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  selectedCategory === "capital" ? "bg-purple-950 text-purple-300 border border-purple-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "মূলধন/উত্তোলন" : "Capital/Drawings"}
              </button>
            </div>
          </div>

          {/* Cards for Selected Category */}
          <div className="space-y-4">
            {transactionData[selectedCategory].map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <h3 className="text-base font-bold text-emerald-300">
                    {isBengali ? item.titleBn : item.titleEn}
                  </h3>
                  <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-teal-300 font-mono text-xs font-bold w-fit">
                    Tally: {isBengali ? item.voucherBn : item.voucherEn}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBengali ? item.descBn : item.descEn}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/60 space-y-1">
                    <span className="text-emerald-400 font-bold block">DEBIT (Dr): {isBengali ? item.drLedgerBn : item.drLedgerEn}</span>
                    <span className="text-slate-400 block text-[11px]">Rule: {isBengali ? item.drRuleBn : item.drRuleEn}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-800/60 space-y-1">
                    <span className="text-sky-400 font-bold block">CREDIT (Cr): {isBengali ? item.crLedgerBn : item.crLedgerEn}</span>
                    <span className="text-slate-400 block text-[11px]">Rule: {isBengali ? item.crRuleBn : item.crRuleEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 2. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic10_study_note_bn.txt" : "topic10_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 3. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ১০ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 10 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 4. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "বাস্তবধর্মী কমার্শিয়াল এন্ট্রিগুলি হাতে কলমে অনুশীলন করাই হল TallyPrime-এ দক্ষ অ্যাকাউন্ট্যান্ট হওয়ার সেরা চাবিকাঠি!"
                : "Practicing practical commercial transactions hands-on builds the muscle memory needed to become a master accountant in TallyPrime!"
            }
          />
        </section>

      </div>
    </>
  );
}
