"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic7_files/topic7_questions";
import questionsBn from "./topic7_files/topic7_questions_bn";
import noteTextEn from "./topic7_files/topic7_note.txt?raw";
import noteTextBn from "./topic7_files/topic7_note_bn.txt?raw";

/**
 * Topic 7 – Real Accounts vs. Nominal Accounts Mechanics & Operational Rules (Masterpiece Masterclass)
 * Module: 001_001_accounting-concepts-and-account-classification
 * Track: TallyPrime Master Series – CNAT Academy
 *
 * @component
 * @returns {JSX.Element} Masterpiece interactive educational component detailing Tangible & Intangible Real Accounts,
 *                        Nominal Expenses & Incomes, Year-End Financial Closure mechanics, and live Tally group mapping.
 */
export default function Topic7() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLedgerId, setSelectedLedgerId] = useState("cash");

  const ledgerBank = {
    cash: {
      nameEn: "Cash in Hand Account",
      nameBn: "হাতে নগদ (Cash in Hand)",
      typeEn: "Tangible Real Account",
      typeBn: "দৃশ্যমান সম্পত্তিবাচক হিসাব (Tangible Real)",
      ruleEn: "Debit what comes in, Credit what goes out",
      ruleBn: "যা আসে তা ডেবিট, যা চলে যায় তা ক্রেডিট",
      yearEndEn: "Permanent Account: Carried forward as Balance Sheet Asset",
      yearEndBn: "স্থায়ী হিসাব: ব্যালেন্স শিটের সম্পদ পাশে পরবর্তী বছরে স্থানান্তরিত হয়",
      tallyGroupEn: "Cash-in-Hand (Current Assets)",
      tallyGroupBn: "Cash-in-Hand (চলতি সম্পদ)",
      explanationEn: "Physical paper currency and coins owned by business. Never closed at year-end; carries opening balance to next financial year.",
      explanationBn: "ব্যবসায়ের ভল্টে জমা থাকা নগদ টাকা। বছর শেষে এটি কখনো বন্ধ হয় না, পরবর্তী বছরের প্রারম্ভিক জের হিসেবে চলে যায়।"
    },
    goodwill: {
      nameEn: "Business Goodwill & Reputation",
      nameBn: "ব্যবসায়ের সুনাম (Goodwill)",
      typeEn: "Intangible Real Account",
      typeBn: "অদৃশ্যমান সম্পত্তিবাচক হিসাব (Intangible Real)",
      ruleEn: "Debit asset acquisition, Credit asset write-off/amortization",
      ruleBn: "সম্পদ অর্জন ডেবিট, অবলেখন ক্রেডিট",
      yearEndEn: "Permanent Asset: Carried forward on Balance Sheet",
      yearEndBn: "স্থায়ী সম্পদ: ব্যালেন্স শিটে প্রদর্শিত হয়",
      tallyGroupEn: "Fixed Assets (Intangible)",
      tallyGroupBn: "Fixed Assets (অদৃশ্যমান স্থায়ী সম্পদ)",
      explanationEn: "Valuable brand reputation and earning capacity without physical body. Classifies as an Intangible Real Asset on the Balance Sheet.",
      explanationBn: "ব্যবসায়ের সুনাম ও বাজারের আস্থা। এর শারীরিক অবয়ব নেই কিন্তু এটি অত্যন্ত মূল্যবান অস্পৃশ্য সম্পদ।"
    },
    salary: {
      nameEn: "Office Staff Salary Expense",
      nameBn: "কর্মচারীদের বেতন খরচ (Salary Expense)",
      typeEn: "Nominal Account (Expense)",
      typeBn: "নামমাত্র বা আয়-ব্যয় হিসাব (খরচ)",
      ruleEn: "Debit all expenses & losses",
      ruleBn: "সকল প্রকার খরচ ও ক্ষতি ডেবিট",
      yearEndEn: "Temporary Account: Transferred to P&L Account (Closed to Zero)",
      yearEndBn: "অস্থায়ী হিসাব: ৩১শে মার্চ P&L অ্যাকাউন্টে স্থানান্তরিত হয়ে ব্যালেন্স শূন্য হয়",
      tallyGroupEn: "Indirect Expenses",
      tallyGroupBn: "Indirect Expenses (পরোক্ষ ব্যয়)",
      explanationEn: "Operational administration expense incurred during the current period. Closed completely into P&L at year-end.",
      explanationBn: "চলতি বছরের পরিচালন খরচ। বছর শেষে লাভ-ক্ষতি হিসাবে স্থানান্তরের মাধ্যমে এটি বন্ধ হয়ে যায়।"
    },
    discount_rcvd: {
      nameEn: "Discount Received from Suppliers",
      nameBn: "প্রাপ্ত বাট্টা বা ডিসকাউন্ট (Discount Received)",
      typeEn: "Nominal Account (Income / Gain)",
      typeBn: "নামমাত্র বা আয়-ব্যয় হিসাব (আয়/লাভ)",
      ruleEn: "Credit all incomes & gains",
      ruleBn: "সকল প্রকার আয় ও লাভ ক্রেডিট",
      yearEndEn: "Temporary Account: Transferred to P&L Credit side (Closed to Zero)",
      yearEndBn: "অস্থায়ী হিসাব: P&L অ্যাকাউন্টের ক্রেডিট পাশে গিয়ে বছর শেষে শূন্য হয়",
      tallyGroupEn: "Indirect Incomes",
      tallyGroupBn: "Indirect Incomes (পরোক্ষ আয়)",
      explanationEn: "Financial discount revenue earned for prompt payment to trade creditors. Closed into P&L at financial year-end.",
      explanationBn: "পাওনাদারদের দ্রুত টাকা পরিশোধের ফলে প্রাপ্ত আয়। ৩১শে মার্চ P&L-এ ক্রেডিট করে জের বন্ধ করা হয়।"
    },
    patents: {
      nameEn: "Commercial Patent Rights & Trademarks",
      nameBn: "প্যাটেন্ট ও ট্রেডমার্ক রাইটস",
      typeEn: "Intangible Real Account",
      typeBn: "অদৃশ্যমান সম্পত্তিবাচক হিসাব (Intangible Real)",
      ruleEn: "Debit asset purchase cost, Credit amortization",
      ruleBn: "ক্রয়মূল্য ডেবিট, অ্যামর্টাইজেশন ক্রেডিট",
      yearEndEn: "Permanent Asset: Carried forward on Balance Sheet",
      yearEndBn: "স্থায়ী সম্পদ: ব্যালেন্স শিটের সম্পদ পাশে দেখানো হয়",
      tallyGroupEn: "Fixed Assets",
      tallyGroupBn: "Fixed Assets (স্থায়ী সম্পদ)",
      explanationEn: "Legal monopoly rights over proprietary inventions. Maintained as a real asset until legal expiration.",
      explanationBn: "নতুন আবিষ্কৃত প্রযুক্তির আইনি স্বত্ব যা ব্যবসায়ের মূল্য বৃদ্ধি করে।"
    },
    loss_by_fire: {
      nameEn: "Stock Loss by Fire",
      nameBn: "অগ্নিবিনাশজনিত ক্ষতি (Loss by Fire)",
      typeEn: "Nominal Account (Abnormal Loss)",
      typeBn: "নামমাত্র হিসাব (অস্বাভাবিক ক্ষতি)",
      ruleEn: "Debit all expenses & losses",
      ruleBn: "সকল প্রকার খরচ ও ক্ষতি ডেবিট",
      yearEndEn: "Temporary Account: Written off in P&L Account",
      yearEndBn: "অস্থায়ী হিসাব: P&L অ্যাকাউন্টে ডেবিট করে বছর শেষে বন্ধ করা হয়",
      tallyGroupEn: "Indirect Expenses",
      tallyGroupBn: "Indirect Expenses (পরোক্ষ খরচ)",
      explanationEn: "Accidental destruction of goods. Debited to Nominal Loss and closed into Profit & Loss Account.",
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

  const currentLedger = ledgerBank[selectedLedgerId];

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
            <span>TallyPrime Master Series · Module 1.1 · Topic 7</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "Real Accounts এবং Nominal Accounts-এর মাস্টারক্লাস: স্থায়ী সম্পদ বনাম বছর শেষে বন্ধ হওয়া আয়-ব্যয়"
              : "Masterclass: Real Accounts vs. Nominal Accounts Mechanics & Financial Statement Closure"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "দৃশ্যমান/অদৃশ্যমান স্থায়ী সম্পদ (Real Accounts) এবং ৩১শে মার্চ P&L-এ বন্ধ হয়ে যাওয়া অস্থায়ী আয়-ব্যয় হিসাবের (Nominal Accounts) টেকনিক্যাল রহস্য।"
              : "In-depth mechanics of Tangible & Intangible Real Assets carried on Balance Sheets vs Temporary Nominal Accounts closed at year-end."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE ARCHITECTURE TABBED EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Real & Nominal Accounts মেকানিক্স হাব" : "Real & Nominal Accounts Mechanics Hub"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "স্থায়ী সম্পত্তি ও অস্থায়ী আয়-ব্যয়ের নিয়ম ও বছর শেষের আচরণ" : "Permanent property tracking vs temporary revenue & expense year-end closure logic"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "overview" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. মূল পার্থক্য" : "1. Core Distinction"}
              </button>
              <button
                onClick={() => setActiveTab("tangible_intangible")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tangible_intangible" ? "bg-teal-950 text-teal-300 border border-teal-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Tangible vs Intangible" : "2. Real Types"}
              </button>
              <button
                onClick={() => setActiveTab("year_end")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "year_end" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "৩. ৩১শে মার্চ ক্লোজিং" : "3. Year-End Closure"}
              </button>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4">
                <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold">
                  PERMANENT ACCOUNTS (Balance Sheet)
                </span>
                <h3 className="text-lg font-bold text-emerald-300">
                  {isBengali ? "Real Accounts (সম্পত্তিবাচক হিসাব)" : "Real Accounts"}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {isBengali
                    ? "ব্যবসায়ের দৃশ্যমান বা অদৃশ্যমান সম্পত্তি এবং অধিকারের হিসাব। (যেমন: Cash, Building, Machinery, Stock, Patents, Goodwill)। এদেরজের বছর শেষে বন্ধ হয় না, ব্যালেন্স শিটে পরবর্তী বছরের প্রারম্ভিক জের হিসেবে স্থানান্তরিত হয়।"
                    : "Property & asset accounts owned by business. Balances are permanent and carried forward into the next financial year as opening balances on the Balance Sheet."}
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 font-bold">
                  Golden Rule: Debit what comes in, Credit what goes out
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-sky-500/40 space-y-4">
                <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold">
                  TEMPORARY ACCOUNTS (Closed to Trading / P&amp;L)
                </span>
                <h3 className="text-lg font-bold text-sky-300">
                  {isBengali ? "Nominal Accounts (নামমাত্র বা আয়-ব্যয় হিসাব)" : "Nominal Accounts"}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {isBengali
                    ? "নির্দিষ্ট এক বছরের পরিচালন আয়, ব্যয়, লাভ ও ক্ষতির হিসাব। (যেমন: Wages, Rent, Commission Received, Discount, Depreciation)। বছর শেষে Trading ও Profit & Loss অ্যাকাউন্টে স্থানান্তরের মাধ্যমে সম্পূর্ণ বন্ধ (Zero out) করা হয়।"
                    : "Operational revenue, expense, gain, and loss accounts. Closed completely at the end of each accounting period by transferring balances to Trading and Profit & Loss Accounts."}
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-400 font-bold">
                  Golden Rule: Debit all expenses &amp; losses, Credit all incomes &amp; gains
                </div>
              </div>
            </div>
          )}

          {activeTab === "tangible_intangible" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3">
                <h3 className="text-base font-bold text-teal-300 font-mono">1. Tangible Real Accounts (দৃশ্যমান সম্পত্তি)</h3>
                <p className="text-slate-300 leading-relaxed">
                  {isBengali
                    ? "যেসব সম্পদের নির্দিষ্ট শারীরিক আকার, স্পর্শযোগ্যতা ও দৃশ্যমানতা রয়েছে।"
                    : "Assets possessing physical existence that can be touched, seen, and measured."}
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono">
                  <li>Cash in Hand (হাতে নগদ)</li>
                  <li>Plant &amp; Machinery (যন্ত্রপাতি)</li>
                  <li>Office Furniture &amp; Fixtures (আসবাবপত্র)</li>
                  <li>Commercial Real Estate / Land (জমি ও দালানকোঠা)</li>
                  <li>Stock of Goods / Inventory (মজুত পণ্য)</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-purple-500/40 space-y-3">
                <h3 className="text-base font-bold text-purple-300 font-mono">2. Intangible Real Accounts (অদৃশ্যমান সম্পত্তি)</h3>
                <p className="text-slate-300 leading-relaxed">
                  {isBengali
                    ? "যেসব সম্পদের বস্তুগত উপস্থিতি নেই কিন্তু আইনি বা বাজারভিত্তিক অর্থনৈতিক মূল্য রয়েছে।"
                    : "Assets without physical form that possess legal and economic value."}
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono">
                  <li>Business Goodwill (ব্যবসায়ের সুনাম)</li>
                  <li>Patents &amp; Inventions (প্যাটেন্ট স্বত্ব)</li>
                  <li>Trademarks &amp; Brand Names (ট্রেডমার্ক)</li>
                  <li>Copyrights &amp; Software Licenses (কপিরাইট)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "year_end" && (
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs sm:text-sm">
              <h3 className="text-base font-bold text-emerald-300 font-mono">
                📅 31st March Financial Year-End Closing Mechanics in Action
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "আর্থিক বছরের শেষ দিনে (৩১শে মার্চ) TallyPrime স্বয়ংক্রিয়ভাবে Nominal অ্যাকাউন্টগুলির ব্যালেন্স P&L অ্যাকাউন্টে স্থানান্তরিত করে শূন্য করে দেয়। কিন্তু Real অ্যাকাউন্টগুলি পরবর্তীতে ব্যালেন্স শিটের মাধ্যমে স্থানান্তরিত হয়।"
                  : "On 31st March, TallyPrime automatically transfers all Nominal Expense and Income balances to Trading & Profit & Loss Accounts to compute Net Profit. Their balances become ZERO ($0). Real Accounts retain their debit balances and appear on the Balance Sheet!"}
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-800 font-mono text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                      <th className="p-3">Account Type</th>
                      <th className="p-3">Year-End Closing Entry (31st March)</th>
                      <th className="p-3">Ending Balance</th>
                      <th className="p-3">Next Year (1st April)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-3 font-bold text-sky-400">Nominal Expense (e.g. Rent)</td>
                      <td className="p-3">Profit &amp; Loss A/c Dr to Rent A/c</td>
                      <td className="p-3 text-rose-400 font-bold">₹0 (CLOSED)</td>
                      <td className="p-3 text-slate-400">Starts fresh at ₹0</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-sky-400">Nominal Income (e.g. Commission)</td>
                      <td className="p-3">Commission A/c Dr to Profit &amp; Loss A/c</td>
                      <td className="p-3 text-rose-400 font-bold">₹0 (CLOSED)</td>
                      <td className="p-3 text-slate-400">Starts fresh at ₹0</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-400">Real Account (e.g. Building)</td>
                      <td className="p-3">No Closing Entry (Appears on Balance Sheet)</td>
                      <td className="p-3 text-emerald-300 font-bold">₹5,00,000 (CARRIED FORWARD)</td>
                      <td className="p-3 text-emerald-400 font-bold">Opening Balance ₹5,00,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE LEDGER LAB WORKBENCH ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "লাইভ লেজার ল্যাব ও টেকনিক্যাল ক্লাসিফায়ার" : "Live Commercial Ledger Lab & Technical Classifier"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {/* Ledger Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "পরীক্ষার জন্য বাণিজ্যিক লেজার বেছে নিন:" : "Select Commercial Ledger Account to Test:"}
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(ledgerBank).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedLedgerId(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition border ${
                      selectedLedgerId === key
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/50"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isBengali ? ledgerBank[key].nameBn : ledgerBank[key].nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Ledger Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">
                  {isBengali ? currentLedger.nameBn : currentLedger.nameEn}
                </h3>
                <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono text-xs font-bold w-fit">
                  Type: {isBengali ? currentLedger.typeBn : currentLedger.typeEn}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isBengali ? currentLedger.explanationBn : currentLedger.explanationEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Golden Rule Formula</span>
                  <strong className="text-emerald-300 text-xs block">{isBengali ? currentLedger.ruleBn : currentLedger.ruleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Year-End Behavior</span>
                  <strong className="text-sky-300 text-xs block">{isBengali ? currentLedger.yearEndBn : currentLedger.yearEndEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Mapped Tally Group</span>
                  <strong className="text-teal-300 text-xs block">{isBengali ? currentLedger.tallyGroupBn : currentLedger.tallyGroupEn}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic7_study_note_bn.txt" : "topic7_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 4. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৭ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 7 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 5. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "মনে রাখবেন: Real Accounts হলো স্থায়ী সম্পত্তি যা ব্যালেন্স শিটে যায়, আর Nominal Accounts হলো বছরের আয়-ব্যয় যা P&L-এ গিয়ে ৩১শে মার্চ বছরেই বন্ধ হয়ে যায়!"
                : "Remember: Real Accounts are permanent properties appearing on Balance Sheet, while Nominal Accounts are operational revenues/expenses closed in P&L on 31st March at year-end!"
            }
          />
        </section>

      </div>
    </>
  );
}
