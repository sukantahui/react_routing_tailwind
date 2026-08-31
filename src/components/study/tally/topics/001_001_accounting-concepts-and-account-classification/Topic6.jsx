"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic6_files/topic6_questions";
import questionsBn from "./topic6_files/topic6_questions_bn";
import noteTextEn from "./topic6_files/topic6_note.txt?raw";
import noteTextBn from "./topic6_files/topic6_note_bn.txt?raw";

export default function Topic6() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);
  const [selectedSubtype, setSelectedSubtype] = useState("natural");

  const subtypes = {
    natural: {
      titleEn: "1. Natural Personal Accounts (স্বাভাবিক ব্যক্তিসত্তা)",
      descEn: "Accounts representing human beings created by nature.",
      descBn: "প্রকৃতিসৃষ্ট রক্তমাংসের মানুষের হিসাব। (যেমন: Ram's A/c, Priya's A/c, Capital A/c, Drawings A/c)",
      examplesEn: "Ram, Rahim, Capital A/c (Proprietor), Drawings A/c",
      tallyGroupsEn: "Capital Account, Sundry Debtors, Sundry Creditors"
    },
    artificial: {
      titleEn: "2. Artificial / Legal Personal Accounts (কৃত্রিম বা আইনসৃষ্ট ব্যক্তি)",
      descEn: "Accounts representing artificial entities, registered companies, banks, firms, or institutions recognized as legal persons by law.",
      descBn: "আইন দ্বারা স্বীকৃত ব্যবসায় প্রতিষ্ঠান, নিবন্ধিত কোম্পানি, ব্যাংক বা শিক্ষা প্রতিষ্ঠান।",
      examplesEn: "State Bank of India, TCS Ltd, CNAT Academy, Barrackpore Club",
      tallyGroupsEn: "Bank Accounts, Sundry Debtors, Sundry Creditors"
    },
    representative: {
      titleEn: "3. Representative Personal Accounts (প্রতিনিধিত্বমূলক ব্যক্তিবাচক হিসাব)",
      descEn: "Accounts representing a group of persons to whom money is payable or receivable (e.g. Outstanding Expenses, Prepaid Expenses).",
      descBn: "কোনো ব্যক্তি বা ব্যক্তিবর্গের প্রতিনিধি হিসেবে ব্যবহৃত হিসাব (যেমন বকেয়া বেতন, অগ্রিম ভাড়া)।",
      examplesEn: "Outstanding Salary A/c, Prepaid Rent A/c, Accrued Interest A/c",
      tallyGroupsEn: "Current Liabilities, Current Assets, Provisions"
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
              ? "ব্যক্তিবাচক হিসাবের ৩টি উপশ্রেণী: Natural, Artificial এবং Representative Personal Accounts"
              : "Personal Accounts Classification: Natural, Artificial & Representative Personal Accounts"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "মানুষ, রেজিস্টার্ড কোম্পানি এবং বকেয়া/অগ্রিম প্রতিনিধিমূলক হিসাবের গভীর বিশ্লেষণ।"
              : "In-depth breakdown of human individuals, registered corporate entities, and representative accrual ledgers."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. INTERACTIVE PERSONAL SUBTYPES EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "Personal Account সাবটাইপ এক্সপ্লোরার" : "Personal Account Subtype Explorer"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "টাইপ নির্বাচন করে টিপিক্যাল উদাহরণ ও Tally Groupিং দেখুন" : "Select personal account subtype to inspect real-world examples and parent Tally groups"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["natural", "artificial", "representative"].map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedSubtype(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition ${
                    selectedSubtype === st ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-emerald-300">
              {subtypes[selectedSubtype].titleEn}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isBengali ? subtypes[selectedSubtype].descBn : subtypes[selectedSubtype].descEn}
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              Typical Examples: <span className="text-white font-bold">{subtypes[selectedSubtype].examplesEn}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400">
              Tally Primary Groups: <span className="text-white font-bold">{subtypes[selectedSubtype].tallyGroupsEn}</span>
            </div>
          </div>
        </section>

        {/* ─── 2. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic6_study_note_bn.txt" : "topic6_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 3. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৬ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 6 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 4. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "Representative Personal Account (যেমন Outstanding Salary) আসলে কর্মচারীদের দলগত দেনাকে নির্দেশ করে। TallyPrime-এ এগুলোকে Current Liabilities গ্রুপের অধীনে রাখা হয়।"
                : "Representative Personal Accounts (like Outstanding Rent/Salary) represent real people to whom money is owed. In TallyPrime, they are grouped under Current Liabilities!"
            }
          />
        </section>

      </div>
    </>
  );
}
