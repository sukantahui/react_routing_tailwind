"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic8_files/topic8_questions";
import questionsBn from "./topic8_files/topic8_questions_bn";
import noteTextEn from "./topic8_files/topic8_note.txt?raw";
import noteTextBn from "./topic8_files/topic8_note_bn.txt?raw";
import journalEntries from "./topic8_files/topic8_journal.json";

/**
 * Topic 8 – Accrued Revenue & Unearned Advance Income Accounting Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 *
 * @component
 * @returns {JSX.Element} Masterpiece interactive educational component with problem framework analysis,
 *                        Accrued vs Unearned income interactive workbench, live transaction lab, and printable notes.
 */
export default function Topic8() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("accrued");
  const [selectedScenarioId, setSelectedScenarioId] = useState("fd_interest");

  const scenarioBank = {
    fd_interest: {
      titleEn: "Fixed Deposit Interest Earned but Uncredited by Bank ₹8,500",
      titleBn: "ব্যাংক এফডি-এর অনাদায়ী সুদ উপার্জিত কিন্তু অপ্রাপ্ত ₹৮,৫০০",
      categoryEn: "Accrued Revenue (Current Asset)",
      categoryBn: "প্রাপ্য আয় (চলতি সম্পদ - Asset)",
      timingEn: "Service/Time performance completed; Cash payment pending from bank",
      timingBn: "মেয়াদ শেষ বা কাজ সম্পন্ন; ব্যাংকের টাকা দেওয়া বাকি",
      debitRuleEn: "Debit Accrued Interest Account (Increases Current Asset)",
      debitRuleBn: "Accrued Interest A/c ডেবিট (চলতি সম্পদ বৃদ্ধি)",
      creditRuleEn: "Credit Interest Income Account (Recognizes Revenue Earned)",
      creditRuleBn: "Interest Income A/c ক্রেডিট (উপার্জিত আয় হিসেবে গণনা)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Under the Accrual & Revenue Recognition Principles, interest earned during April must be recognized as income in April even if the bank credits cash in May.",
      explanationBn: "এক্রুয়াল নীতি অনুযায়ী এপ্রিল মাসের অর্জিত সুদ এপ্রিল মাসেই আয় হিসেবে দেখাতে হবে, যদিও ব্যাংক মে মাসে নগদ জমা করে।"
    },
    advance_rent: {
      titleEn: "Received 6 Months Advance Sub-tenant Rent ₹36,000 in Cash",
      titleBn: "সাব-টেন্যান্টের কাছ থেকে ৬ মাসের অগ্রিম ভাড়া বাবদ নগদে ₹৩৬,০০০ প্রাপ্তি",
      categoryEn: "Unearned Income (Current Liability)",
      categoryBn: "অগ্রিম প্রাপ্ত আয় (চলতি দায় - Liability)",
      timingEn: "Cash received in advance; Occupancy performance yet to occur",
      timingBn: "নগদ টাকা আগেই প্রাপ্ত; ঘর ব্যবহারের মেয়াদ ভবিষ্যতে অনুষ্ঠিত হবে",
      debitRuleEn: "Debit Cash Account (Increases Liquid Asset)",
      debitRuleBn: "Cash A/c ডেবিট (তরল নগদ সম্পদ বৃদ্ধি)",
      creditRuleEn: "Credit Unearned Rent Account (Creates Performance Liability)",
      creditRuleBn: "Unearned Rent A/c ক্রেডিট (পারফরম্যান্স দায় সৃষ্টি)",
      voucherEn: "F6 Receipt Voucher",
      voucherBn: "F6 Receipt Voucher",
      explanationEn: "Receiving cash in advance does not constitute immediate earned revenue. It creates an Unearned Rent Liability until time passes.",
      explanationBn: "অগ্রিম টাকা পেলেই তা অর্জিত আয় হয় না। কাজ বা মেয়াদ শেষ না হওয়া পর্যন্ত এটি একটি দায় (Liability) হিসেবে জমা থাকে।"
    },
    consultancy_fee: {
      titleEn: "Completed Consultancy Services for Client TechCorp ₹25,000 (Bill Unpaid)",
      titleBn: "গ্রাহক টেককর্পকে ₹২৫,০০০ টাকার পরামর্শ প্রদান সম্পন্ন (বিল বাকি)",
      categoryEn: "Accrued Revenue (Current Asset)",
      categoryBn: "প্রাপ্য আয় (চলতি সম্পদ - Asset)",
      timingEn: "Consultancy performance delivered; Client payment pending",
      timingBn: "পরামর্শ প্রদান সম্পন্ন; গ্রাহকের থেকে অর্থ প্রাপ্তি বাকি",
      debitRuleEn: "Debit Accrued Consultancy Fee Account (Current Asset)",
      debitRuleBn: "Accrued Service Fee A/c ডেবিট (চলতি সম্পদ)",
      creditRuleEn: "Credit Consultancy Fee Revenue Account (Earned Income)",
      creditRuleBn: "Consultancy Revenue A/c ক্রেডিট (উপার্জিত সেবা আয়)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
      explanationEn: "Since performance is delivered, revenue is realized immediately. Debit Accrued Service Fee Asset and Credit Consultancy Income.",
      explanationBn: "কাজ শেষ হয়ে গেছে বলেই আয় অর্জিত হয়েছে। সার্ভিস ফি ডেবিট এবং কনসালটেন্সি রেভিনিউ ক্রেডিট করতে হবে।"
    },
    earned_advance: {
      titleEn: "Recognized 1 Month Earned Rent (₹6,000) from Advance Rent Liability",
      titleBn: "অগ্রিম প্রাপ্ত ভাড়া দায় থেকে ১ মাসের উপার্জিত ভাড়া (₹৬,০০০) আয় হিসেবে স্থানান্তর",
      categoryEn: "Unearned Liability Adjustment into Revenue",
      categoryBn: "অগ্রিম দায় থেকে আয়ে রূপান্তর (Adjusting Entry)",
      timingEn: "1 month of occupancy performance completed by tenant",
      timingBn: "ভাড়াটিয়ার ১ মাসের ঘর ব্যবহারের সময় অতিক্রান্ত হয়েছে",
      debitRuleEn: "Debit Unearned Rent Liability Account (Reduces Liability)",
      debitRuleBn: "Unearned Rent Liability A/c ডেবিট (দায় হ্রাস)",
      creditRuleEn: "Credit Rent Income Account (Recognizes Earned Revenue)",
      creditRuleBn: "Rent Income A/c ক্রেডিট (প্রকৃত আয় বৃদ্ধি)",
      voucherEn: "F7 Journal Voucher",
      voucherBn: "F7 Journal Voucher",
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

  const currentScenario = scenarioBank[selectedScenarioId];

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
            <span>TallyPrime Master Series · Module 1.2 · Topic 8</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "প্রাপ্য আয় (Accrued Income) ও অগ্রিম প্রাপ্ত আয় (Unearned Income) ল্যাব" : "Accrued Revenue & Unearned Advance Income Accounting Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ব্যবসায়ে অর্জিত কিন্তু অনাদায়ী আয় (Accrued Income Asset) এবং কাজ শেষ করার আগেই প্রাপ্ত অগ্রিম আয়ের (Unearned Liability) সমন্বয় মেকানিক্স।" : "Accounting for cash income receipts, accrued income earned but unreceived (assets), and unearned income received in advance (liabilities)."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & CONCEPTUAL ENGINE ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "রেভিনিউ রিকগনিশন ও এক্রুয়াল মেকানিক্স হাব" : "Revenue Recognition & Accrual Mechanics Hub"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "অনাদায়ী আয় (Asset) বনাম অগ্রিম প্রাপ্ত আয়ের (Liability) মূল অর্থনৈতিক পার্থক্য" : "Understanding Accrued Income (Current Assets) vs Unearned Revenue (Current Liabilities)"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("accrued")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "accrued" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. Accrued Income (Asset)" : "1. Accrued Revenue"}
              </button>
              <button
                onClick={() => setActiveTab("unearned")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "unearned" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Unearned Income (Liability)" : "2. Unearned Revenue"}
              </button>
            </div>
          </div>

          {activeTab === "accrued" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                CURRENT ASSET (Balance Sheet Asset)
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Accrued Revenue / Income (প্রাপ্য বা অনাদায়ী আয়)" : "Accrued Revenue / Income"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "যে আয় চলতি হিসাব বছরে অর্জিত হয়েছে (যেমন সেবা প্রদান বা মেয়াদের শেষ), কিন্তু নগদ অর্থ এখনো প্রাপ্ত হয়নি। এটি ব্যবসায়ের জন্য একটি চলতি সম্পদ (Current Asset)।"
                  : "Revenue earned during the current period by performing services or delivering goods, but cash payment has not yet been received from the client or bank."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-emerald-400 block">Year-End Adjusting Journal Entry (F7):</strong>
                  <p className="text-slate-200">Debit Accrued Income A/c (Current Asset) Dr.</p>
                  <p className="text-slate-200">Credit Income Account (Revenue) Cr.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-teal-400 block">Balance Sheet &amp; P&amp;L Treatment:</strong>
                  <p className="text-slate-300">P&amp;L: Added to current year Revenue</p>
                  <p className="text-slate-300">Balance Sheet: Shown under Current Assets</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                CURRENT LIABILITY (Balance Sheet Liability)
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Unearned / Advance Income (অগ্রিম প্রাপ্ত আয়)" : "Unearned / Advance Income"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "কাজ সম্পাদন বা সেবা প্রদান করার আগেই খদ্দেরের কাছ থেকে অগ্রিম প্রাপ্ত অর্থ। যেহেতু ব্যবসায়িক দায়িত্ব পালন করা বাকি, তাই এটি চলতি দায় (Current Liability) হিসেবে গণ্য হয়।"
                  : "Cash received in advance from clients before services are rendered or goods are delivered. Represents an obligation/liability until performance obligation is satisfied."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-sky-400 block">Advance Cash Receipt Entry (F6):</strong>
                  <p className="text-slate-200">Debit Cash / Bank Account Dr.</p>
                  <p className="text-slate-200">Credit Unearned Income A/c (Current Liability) Cr.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-teal-400 block">Earned Performance Transfer (F7):</strong>
                  <p className="text-slate-200">Debit Unearned Income A/c (Reduces Liability) Dr.</p>
                  <p className="text-slate-200">Credit Income Account (Recognizes Revenue) Cr.</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE SCENARIO PROBLEM ANALYZER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "বাস্তব লেনদেন সমস্যা ও অ্যাকাউন্টিং সিমুলেটর" : "Practical Scenario Problem & Accounting Simulator"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {/* Scenario Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "বিশ্লেষণের জন্য সমস্যামূলক ঘটনা নির্বাচন করুন:" : "Select Revenue Scenario to Inspect:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.keys(scenarioBank).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedScenarioId(key)}
                    className={`p-3 rounded-xl text-left text-xs font-mono font-bold transition border ${
                      selectedScenarioId === key
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/50"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isBengali ? scenarioBank[key].titleBn : scenarioBank[key].titleEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Scenario Output Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  {isBengali ? currentScenario.titleBn : currentScenario.titleEn}
                </h3>
                <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono text-xs font-bold w-fit">
                  Type: {isBengali ? currentScenario.categoryBn : currentScenario.categoryEn}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isBengali ? currentScenario.explanationBn : currentScenario.explanationEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Debit Assignment</span>
                  <strong className="text-emerald-300 text-xs block">{isBengali ? currentScenario.debitRuleBn : currentScenario.debitRuleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Credit Assignment</span>
                  <strong className="text-sky-300 text-xs block">{isBengali ? currentScenario.creditRuleBn : currentScenario.creditRuleEn}</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Tally Voucher Key</span>
                  <strong className="text-teal-300 text-xs block">{isBengali ? currentScenario.voucherBn : currentScenario.voucherEn}</strong>
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
                  {isBengali ? "Teacher's Desk: এক্রুয়াল আয় সমন্বয় ও ল্যাব আলোচনা" : "Teacher's Desk: Accrued Revenue & Matching Principle"}
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
                    ? "মনে রাখুন, নগদ অর্থ পাওয়াই আয় নয়! আয় অর্জিত হয় তখনই যখন সেবা বা দায়িত্ব সম্পন্ন করা হয়। অনাদায়ী আয় হলো একটি অর্জিত সম্পদ (Asset), আর অগ্রিম প্রাপ্ত অর্থ হলো একটি দায়িত্ব (Liability)।"
                    : "Cash receipt alone is not income! Revenue is earned when performance is completed. Accrued revenue is earned wealth (Asset), while advance retainer cash is a performance obligation (Liability)."}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? '"স্যার, ব্যাংক এফডি-র অনাদায়ী সুদ কেন ৩১শে মার্চ জার্নাল ভাউচারে (F7) রেকর্ড করা হয়?"' : '"Sir, why is accrued fixed deposit interest recorded on 31st March in Journal Voucher (F7) instead of Receipt Voucher (F6)?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"কারণ ব্যাংক এখনো নগদ টাকা দেয়নি; তাই F6 করা যাবে না! F7 জার্নালে Accrued Interest Asset ডেবিট এবং Interest Income ক্রেডিট করতে হয়!"' : '"Because cash hasn\'t entered bank account yet! You cannot pass F6 without cash. You must debit Accrued Interest Asset and credit Interest Income in F7!"'}</em></p>
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
            title={isBengali ? "প্রাপ্য আয় (Accrued Income) ও অগ্রিম প্রাপ্ত আয় (Unearned Income) ল্যাব" : "Accrued Revenue & Unearned Advance Income Accounting Lab"}
            subtitle={isBengali ? "অর্জিত কিন্তু অপ্রাপ্ত আয় (Accrued Asset) এবং অগ্রিম প্রাপ্ত কাজের দায়ের (Unearned Liability) আইনি রূপরেখা" : "Recognizing earned revenue receivables and deferring advance client retainers under matching principles"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic8_study_note_bn.txt" : "topic8_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৮ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 8 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "অনাদায়ী আয় (Accrued Income) এবং অগ্রিম প্রাপ্ত আয় (Unearned Income)-এর সমন্বয় ভালোভাবে বোঝা প্রতিটি পেশাদার অ্যাকাউন্ট্যান্টের জন্য আবশ্যক!"
                : "Mastering Accrued Income (Current Asset) and Unearned Revenue (Current Liability) is essential for any professional TallyPrime accountant!"
            }
          />
        </section>

      </div>
    </>
  );
}
