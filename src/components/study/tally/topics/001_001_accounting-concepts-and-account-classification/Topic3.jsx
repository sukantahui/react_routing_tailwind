"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic3_files/topic3_questions";
import questionsBn from "./topic3_files/topic3_questions_bn";
import noteTextEn from "./topic3_files/topic3_note.txt?raw";
import noteTextBn from "./topic3_files/topic3_note_bn.txt?raw";

export default function Topic3() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const glossaryTerms = [
    {
      category: "assets",
      termEn: "Assets (সম্পদ)",
      termBn: "Assets (সম্পদ)",
      defEn: "Economic resources owned or controlled by a business expected to provide future economic benefits.",
      defBn: "ব্যবসায়ের মালিকানাধীন অর্থনৈতিক সম্পদ যা ভবিষ্যতে সুবিধা প্রদান করবে। (যেমন Cash, Bank, Building, Stock, Debtors)",
      tallyGroupEn: "Current Assets / Fixed Assets",
      tallyGroupBn: "Current Assets / Fixed Assets"
    },
    {
      category: "liabilities",
      termEn: "Liabilities (দায়)",
      termBn: "Liabilities (দায়)",
      defEn: "Financial obligations or debts owed by the business to outside creditors or suppliers.",
      defBn: "তৃতীয় পক্ষ বা পাওনাদারদের নিকট ব্যবসায়ের আর্থিক দেনা বা দায়। (যেমন Sundry Creditors, Bank Loan)",
      tallyGroupEn: "Current Liabilities / Loans (Liability)",
      tallyGroupBn: "Current Liabilities / Loans (Liability)"
    },
    {
      category: "capital",
      termEn: "Capital (মূলধন)",
      termBn: "Capital (মূলধন)",
      defEn: "The monetary investment or net worth contributed by the proprietor into the business enterprise.",
      defBn: "ব্যবসায় শুরু ও পরিচালনার জন্য মালিকের নিজস্ব বিনিয়োগ করা নগদ টাকা বা সম্পত্তি।",
      tallyGroupEn: "Capital Account",
      tallyGroupBn: "Capital Account"
    },
    {
      category: "drawings",
      termEn: "Drawings (উত্তোলন)",
      termBn: "Drawings (উত্তোলন)",
      defEn: "Cash or goods withdrawn by the business owner for personal/household consumption.",
      defBn: "মালিক কর্তৃক ব্যক্তিগত বা পারিবারিক ব্যবহারের জন্য ব্যবসা থেকে নগদ টাকা বা পণ্য উত্তোলন।",
      tallyGroupEn: "Capital Account (Deduction)",
      tallyGroupBn: "Capital Account (মালিকানা হ্রাস)"
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

  const filteredTerms = activeCategory === "all"
    ? glossaryTerms
    : glossaryTerms.filter(t => t.category === activeCategory);

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
            <span>TallyPrime Master Series · Module 1.1 · Topic 3</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "অ্যাকাউন্টিং-এর মৌলিক শব্দকোষ: Assets, Liabilities, Capital, Equity & Drawings"
              : "Core Financial Terms: Assets, Liabilities, Capital, Owner's Equity & Drawings"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "বাণিজ্যিক হিসাববিজ্ঞানের মূল পরিভাষাসমূহ এবং TallyPrime-এ তাদের নির্দিষ্ট প্রাইমারি গ্রুপ নির্বাচন।"
              : "Essential financial vocabulary defining assets, debts, capital equity, and drawings with primary TallyPrime group mappings."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. INTERACTIVE GLOSSARY WORKBENCH ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "ইন্টারেক্টিভ শব্দকোষ ও লেজার গ্রুপিং ওয়ার্কবেঞ্চ" : "Interactive Terms & Ledger Grouping Workbench"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "ক্যাটাগরি ফিল্টার করে সংজ্ঞা ও Tally Grouping শিখুন" : "Filter accounting terms to inspect definitions and primary TallyPrime group assignments"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {["all", "assets", "liabilities", "capital", "drawings"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition ${
                    activeCategory === cat ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((t, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <strong className="text-base font-bold text-emerald-300">{isBengali ? t.termBn : t.termEn}</strong>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-sky-400 font-mono text-[11px] font-bold">
                    Group: {isBengali ? t.tallyGroupBn : t.tallyGroupEn}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBengali ? t.defBn : t.defEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 2. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic3_study_note_bn.txt" : "topic3_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 3. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৩ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 3 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 4. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "TallyPrime-এ লেজার তৈরির সময় সঠিক গ্রুপ নির্বাচন করাই হল অর্ধেক কাজ সমাধান করা! Assets এবং Liabilities সঠিকভাবে চিনতে পারলে Balance Sheet নিজে থেকেই মিলে যাবে।"
                : "Assigning the correct group during Ledger creation in TallyPrime solves half the battle! Distinguish Assets from Liabilities, and your Balance Sheet will balance automatically."
            }
          />
        </section>

      </div>
    </>
  );
}
