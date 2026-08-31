"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic0_files/topic0_questions";
import questionsBn from "./topic0_files/topic0_questions_bn";
import noteTextEn from "./topic0_files/topic0_note.txt?raw";
import noteTextBn from "./topic0_files/topic0_note_bn.txt?raw";

export default function Topic0() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      titleEn: "1. Identification & Measurement",
      titleBn: "১. লেনদেন চিন্হিতকরণ ও আর্থিক পরিমাপ",
      descEn: "Isolate economic events that can be quantified in monetary currency (₹ INR). Non-monetary events like employee morale are excluded.",
      descBn: "ব্যবসায়ের যেসকল ঘটনা টাকায় (₹ INR) পরিমাপযোগ্য তা নির্ধারণ করা। অ-আর্থিক ঘটনা এখানে বাদ পড়ে।",
      tallyActionEn: "Source Document (Bill / Invoice / Receipt)",
      tallyActionBn: "উৎস দলিল (বিল / ইনভয়েস / ক্যাশ মেমো)"
    },
    {
      titleEn: "2. Recording (Voucher Entry)",
      titleBn: "২. প্রাথমিক লিপিবদ্ধকরণ (Voucher Entry)",
      descEn: "Enter transactions chronologically into primary books of entry using double-entry principles.",
      descBn: "দ্বৈত সত্তার নীতি মেনে প্রতিদিনের লেনদেন তারিখ অনুযায়ী ভাউচারে এন্ট্রি করা।",
      tallyActionEn: "Gateway of Tally > Vouchers (F4, F5, F6, F8, F9)",
      tallyActionBn: "Gateway of Tally > Vouchers (F4, F5, F6, F8, F9)"
    },
    {
      titleEn: "3. Classification (Ledger Posting)",
      titleBn: "৩. শ্রেণীবিভাগ (Ledger Posting)",
      descEn: "Group similar nature transactions under specific account ledgers (e.g. Cash, Rent, Capital, Sundry Debtors).",
      descBn: "একই ধরণের সকল লেনদেনকে নির্দিষ্ট লেজার অ্যাকাউন্টে (যেমন Cash, Rent, Sales) একত্রিত করা।",
      tallyActionEn: "Chart of Accounts / Ledger Master Creation",
      tallyActionBn: "Chart of Accounts / লেজার মাস্টার তৈরি"
    },
    {
      titleEn: "4. Summarizing (Trial Balance & Final Accounts)",
      titleBn: "৪. সংক্ষিপ্তকরণ (Trial Balance ও চুড়ান্ত হিসাব)",
      descEn: "Prepare Trial Balance, Trading & Profit & Loss Account, and Balance Sheet to determine Net Profit and Financial Position.",
      descBn: "রেওয়ামিল, লাভ-ক্ষতি হিসাব ও ব্যালেন্স শিট তৈরি করে ব্যবসায়ের নিট লাভ ও আর্থিক অবস্থা নিরূপণ।",
      tallyActionEn: "Reports > Display More Reports > Trial Balance & Profit & Loss",
      tallyActionBn: "Reports > Display More Reports > Trial Balance & Profit & Loss"
    },
    {
      titleEn: "5. Analysis & Communication",
      titleBn: "৫. বিশ্লেষণ ও সিদ্ধান্ত গ্রহণ",
      descEn: "Interpret financial ratios, GST returns, cash flows, and communicate performance to owners, banks, and tax authorities.",
      descBn: "আর্থিক অনুপাত, জিএসটি রিটার্ন ও ক্যাশ ফ্লো বিশ্লেষণ করে মালিক ও ট্যাক্স কর্তৃপক্ষকে অবহিত করা।",
      tallyActionEn: "Ratio Analysis & Dashboard Reports",
      tallyActionBn: "Ratio Analysis ও ড্যাশবোর্ড রিপোর্ট"
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
            <span>TallyPrime Master Series · Module 1.1 · Topic 1</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "অ্যাকাউন্টিং-এর সংজ্ঞা, লক্ষ্য ও মূল কাজসমূহ (নন-অ্যাকাউন্টিং শিক্ষার্থীদের জন্য)"
              : "Meaning, Objectives, and Functions of Accounting for Non-Accounting Beginners"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "বাণিজ্যিক হিসাববিজ্ঞানের মূল ধারণা, দ্বৈত সত্তার নীতি এবং TallyPrime সফটওয়্যারের সাথে এর অটোমেটেড মেলবন্ধন।"
              : "The foundational gateway into commercial financial accounting, double-entry principles, and automated TallyPrime integration."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. INTERACTIVE ACCOUNTING LIFECYCLE EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-emerald-950/20 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-lg">
              🔄
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "অ্যাকাউন্টিং-এর ৫টি প্রধান ধাপ ও লাইফসাইকেল এক্সপ্লোরার" : "The 5 Core Accounting Stages & Lifecycle Explorer"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "কাঁচা ভাউচার এন্ট্রি থেকে শুরু করে আর্থিক রিপোর্ট তৈরির পুরো প্রক্রিয়া" : "From raw commercial transaction to final automated reporting in TallyPrime"}
              </p>
            </div>
          </div>

          {/* Stage Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {stages.map((stg, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`px-3 py-2 rounded-xl font-mono text-xs font-bold transition whitespace-nowrap border ${
                  activeStage === idx
                    ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                Stage {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Stage Display Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-emerald-300">
              {isBengali ? stages[activeStage].titleBn : stages[activeStage].titleEn}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isBengali ? stages[activeStage].descBn : stages[activeStage].descEn}
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs text-teal-300">
              <span>TallyPrime Integration Path:</span>
              <span className="font-bold text-white">{isBengali ? stages[activeStage].tallyActionBn : stages[activeStage].tallyActionEn}</span>
            </div>
          </div>
        </section>

        {/* ─── 2. OBJECTIVES OF ACCOUNTING GRID ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🎯</span>
            <span>{isBengali ? "অ্যাকাউন্টিং-এর মূল উদ্দেশ্যসমূহ" : "Primary Objectives of Accounting"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <strong className="text-emerald-300 block text-base font-bold">1. Systematic Record Keeping</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "মানুষের স্মৃতিশক্তির সীমাবদ্ধতা কাটিয়ে উঠতে সকল লেনদেনের স্থায়ী ও নির্ভুল ডিজিটাল রেকর্ড সংরক্ষণ করা।"
                  : "Eliminate memory limitations by keeping permanent, tamper-proof digital records of every commercial transaction."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <strong className="text-sky-300 block text-base font-bold">2. Profit & Loss Determination</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "নির্দিষ্ট আর্থিক হিসাববছরে ব্যবসা লাভজনক নাকি লোকসানে পরিচালিত হয়েছে তা নিরূপণ করা।"
                  : "Ascertain the net operational result (Net Profit or Net Loss) generated during a specific financial period."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <strong className="text-teal-300 block text-base font-bold">3. Financial Position Solvency</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "ব্যালেন্স শিটের মাধ্যমে নির্দিষ্ট তারিখে ব্যবসায়ের মোট সম্পদ (Assets) ও মোট দায়ের (Liabilities) প্রকৃত চিত্র উপস্থাপন।"
                  : "Depict the exact balance of Assets, Liabilities, and Capital on a given date via the Balance Sheet statement."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <strong className="text-purple-300 block text-base font-bold">4. Statutory Tax Compliance</strong>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "জিএসটি (GST), টিডিএস (TDS) এবং ইনকাম ট্যাক্স আইন মেনে সরকারি রিপোর্ট ও রিটার্ন দাখিল নিশ্চিত করা।"
                  : "Comply with government tax mandates including GST returns, TDS deductions, and Income Tax statutory audits."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic0_study_note_bn.txt" : "topic0_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 4. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ১ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 1 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 5. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "মিস্টার সিএনএটি-র গোল্ডেন অ্যাডভাইস: অ্যাকাউন্টিং কেবল একটি বিষয় নয়, এটি হল ব্যবসার ভাষা! TallyPrime আয়ত্ত করতে হলে দৈনন্দিন ব্যবসায়িক ঘটনাগুলোকে সঠিক লেজারে সাজানোর মানসিকতা তৈরি করুন।"
                : "Mr. CNAT's Golden Rule: Accounting is not just a subject, it is the universal language of business! Mastering TallyPrime starts with structuring raw business events into organized ledgers."
            }
          />
        </section>

      </div>
    </>
  );
}
