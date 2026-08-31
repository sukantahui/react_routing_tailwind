"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic2_files/topic2_questions";
import questionsBn from "./topic2_files/topic2_questions_bn";
import noteTextEn from "./topic2_files/topic2_note.txt?raw";
import noteTextBn from "./topic2_files/topic2_note_bn.txt?raw";

export default function Topic2() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);
  const [selectedConcept, setSelectedConcept] = useState(0);

  const concepts = [
    {
      titleEn: "1. Business Entity Concept",
      titleBn: "১. ব্যবসায়িক সত্ত্বা ধারণা (Business Entity)",
      descEn: "Business is legally and accounting-wise distinct from its proprietor. Capital invested by the owner is treated as a liability of the business to the owner.",
      descBn: "ব্যবসা ও মালিক দুটি পৃথক সত্ত্বা। মালিকের দেওয়া মূলধনকে ব্যবসায়ের নিকট দায় হিসেবে গণ্য করা হয়।",
      impactEn: "Capital ledger grouped under Capital Account (Liability). Drawings reduce Capital.",
      impactBn: "Tally-তে Capital অ্যাকাউন্ট Liability হিসেবে বিবেচিত হয়।"
    },
    {
      titleEn: "2. Going Concern Concept",
      titleBn: "২. চলমান প্রতিষ্ঠান ধারণা (Going Concern)",
      descEn: "Assumes business will continue operating indefinitely in the foreseeable future. Assets are recorded at historical cost rather than liquidation value.",
      descBn: "ধরে নেওয়া হয় ব্যবসা ভবিষ্যতেও অনির্দিষ্টকাল চলতে থাকবে। তাই স্থায়ী সম্পদ ঐতিহাসিক মূল্যে দেখানো হয়।",
      impactEn: "Fixed Assets (Plant/Machinery) capitalized & depreciated over operational life.",
      impactBn: "স্থায়ী সম্পদ এককালীন খরচ না দেখিয়ে আস্তে আস্তে অবচয় (Depreciation) করা হয়।"
    },
    {
      titleEn: "3. Accrual Concept",
      titleBn: "৩. বকেয়া ধারণা (Accrual Basis)",
      descEn: "Revenues and expenses are recognized when earned or incurred, regardless of actual cash flow.",
      descBn: "নগদ টাকা দেওয়া বা পাওয়া যাক বা না যাক, লেনদেন ঘটার সাথে সাথে তা হিসাবভুক্ত করতে হয়।",
      tallyVoucherEn: "Journal Voucher (F7) for Outstanding Rent, Prepaid Insurance, Accrued Interest.",
      tallyVoucherBn: "বকেয়া বা অগ্রিম খরচের জন্য Journal Voucher (F7) ব্যবহার।"
    },
    {
      titleEn: "4. Dual Aspect Concept",
      titleBn: "৪. দ্বৈত সত্ত্বা নীতি (Dual Aspect)",
      descEn: "Every commercial transaction affects at least two ledgers with equal Debit and Credit values. Foundation of Assets = Liabilities + Capital.",
      descBn: "প্রতিটি লেনদেনের দুটি দিক থাকে—সমপরিমাণ ডেবিট ও ক্রেডিট। (Assets = Liabilities + Capital)",
      impactEn: "Total Debit Amount strictly equals Total Credit Amount across all Vouchers.",
      impactBn: "Tally-তে Voucher এন্ট্রিতে মোট Debit ও Credit টাকা সমান হওয়া বাধ্যতামূলক।"
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
            <span>TallyPrime Master Series · Module 1.1 · Topic 3</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "অ্যাকাউন্টিং-এর মৌলিক ধারণা ও নীতিসমূহ (GAAP Concepts & Conventions)"
              : "Fundamental Accounting Concepts & Conventions (GAAP Principles)"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "Business Entity, Going Concern, Accrual এবং Dual Aspect ধারণার ব্যবহারিক বাণিজ্যিক প্রয়োগ।"
              : "Mastering the pillar concepts governing commercial financial statements and TallyPrime ledger rules."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. INTERACTIVE CONCEPT EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-lg">
              📜
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "GAAP ধারণা এক্সপ্লোরার" : "GAAP Accounting Concepts Explorer"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "ধারণাসমূহ নির্বাচন করে Tally-তে তাদের প্রভাব দেখুন" : "Select concepts to explore their direct impact on TallyPrime ledgers and vouchers"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {concepts.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedConcept(idx)}
                className={`p-3 rounded-xl text-left text-xs font-semibold transition border ${
                  selectedConcept === idx
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? c.titleBn : c.titleEn}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-emerald-300">
              {isBengali ? concepts[selectedConcept].titleBn : concepts[selectedConcept].titleEn}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isBengali ? concepts[selectedConcept].descBn : concepts[selectedConcept].descEn}
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 flex items-center justify-between">
              <span>TallyPrime Impact:</span>
              <span className="font-bold text-white">{isBengali ? concepts[selectedConcept].impactBn || concepts[selectedConcept].tallyVoucherBn : concepts[selectedConcept].impactEn || concepts[selectedConcept].tallyVoucherEn}</span>
            </div>
          </div>
        </section>

        {/* ─── 2. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic2_study_note_bn.txt" : "topic2_study_note.txt"}
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
                ? "Accrual ও Dual Aspect ধারণা ভালোভাবে বুঝলে TallyPrime-এ ভাউচার পাস করা এবং ব্যালেন্স শিট মেলানো ১০০% সহজ হয়ে যায়!"
                : "Understanding Accrual and Dual Aspect concepts is the master key to error-free voucher entries and balanced financial statements in TallyPrime!"
            }
          />
        </section>

      </div>
    </>
  );
}
