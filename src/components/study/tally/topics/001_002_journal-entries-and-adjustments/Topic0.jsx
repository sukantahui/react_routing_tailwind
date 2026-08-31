"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalViewerEngine from "../../../JournalViewerEngine";
import questionsEn from "./topic0_files/topic0_questions";
import questionsBn from "./topic0_files/topic0_questions_bn";
import noteTextEn from "./topic0_files/topic0_note.txt?raw";
import noteTextBn from "./topic0_files/topic0_note_bn.txt?raw";
import journalEntries from "./topic0_files/topic0_journal.json";

/**
 * Topic 0 – 5-Column Journal Format & Legal Narration Writing Lab
 * Module: 001_002_journal-entries-and-adjustments
 * Track: TallyPrime Master Series – CNAT Academy
 */
export default function Topic0() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("format");
  const [selectedColId, setSelectedColId] = useState("particulars");

  const columnDetails = {
    date: {
      titleEn: "1. Date Column (তারিখ কলাম)",
      purposeEn: "Chronological recording of business transaction occurrence.",
      purposeBn: "লেনদেন ঘটার কালানুক্রমিক তারিখ নথিভুক্তকরণ।",
      ruleEn: "Record Financial Year, Month, and exact Date of transaction.",
      ruleBn: "আর্থিক বছর, মাস এবং দিন সঠিকভাবে ক্রমানুসারে লিখতে হয়।"
    },
    particulars: {
      titleEn: "2. Particulars & Narration Column (বিবরণী ও ন্যারেশন কলাম)",
      purposeEn: "Specifies Debited ledger, Credited ledger (To...), and explanatory Narration.",
      purposeBn: "ডেবিট লেজার, ক্রেডিট লেজার ('To...' সহ) এবং লেনদেনের ব্যাখ্যা প্রদান।",
      ruleEn: "Dr. suffix for Debit line, 'To' prefix for Credit line, 'Being...' for Narration.",
      ruleBn: "ডেবিট লাইনে Dr., ক্রেডিট লাইনে 'To' এবং ব্যাখ্যার শুরুতে 'Being...' লিখতে হয়।"
    },
    lf: {
      titleEn: "3. Ledger Folio / L.F. Column (খতিয়ান পৃষ্ঠা নম্বর)",
      purposeEn: "Audit cross-reference page number where entry is posted in Ledger Book.",
      purposeBn: "লেজার বইতে কোন পেজে পোস্টিং হয়েছে তার অডিট রেফারেন্স নম্বর।",
      ruleEn: "Enables auditors to verify posting from Daybook into individual Ledgers.",
      ruleBn: "ডে-বুক থেকে লেজার বইতে পোস্টিং মেলানোর জন্য অডিটররা এটি পরীক্ষা করেন।"
    },
    debit: {
      titleEn: "4. Debit Amount Column (ডেবিট টাকার কলাম)",
      purposeEn: "Numerical monetary value assigned to the debited ledger account.",
      purposeBn: "ডেবিট হওয়া লেজারের টাকার পরিমাণ।",
      ruleEn: "Must exactly match the corresponding Credit monetary value.",
      ruleBn: "ক্রেডিট কলামের সমান টাকার মূল্য বহন করতে হবে।"
    },
    credit: {
      titleEn: "5. Credit Amount Column (ক্রেডিট টাকার কলাম)",
      purposeEn: "Numerical monetary value assigned to the credited ledger account.",
      purposeBn: "ক্রেডিট হওয়া লেজারের টাকার পরিমাণ।",
      ruleEn: "Maintains mathematical invariant (Total Debit = Total Credit).",
      ruleBn: "হিসাববিজ্ঞানের সমীকরণ (ডেবিট = ক্রেডিট) বজায় রাখে।"
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
  const currentCol = columnDetails[selectedColId];

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
            <span>TallyPrime Master Series · Module 1.2 · Topic 0</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "৫-কলাম জার্নাল ফরম্যাট ও আইনি Narration লেখার ল্যাব" : "5-Column Journal Format & Legal Narration Writing Lab"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "স্ট্যান্ডার্ড ৫-কলাম জার্নাল বইয়ের কাঠামো, লেজার ফলিয়ো (L.F.) ট্র্যাকিং, ডেবিট/ক্রেডিট নিয়মাবলী এবং 'Being...' দিয়ে শুরু হওয়া আইনি বিবরণী লেখার কৌশল।" : "Understanding the standard 5-column Journal Book format, Ledger Folio (L.F.) tracking, Debit/Credit rules, and writing legal narrations beginning with 'Being...'."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-102</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE PROBLEM FRAMEWORK & JOURNAL FORMAT EXPLORER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "৫-কলাম জার্নাল মেকানিক্স হাব" : "5-Column Journal Structure & Narration Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "প্রাথমিক হিসাব বই (Day Book)-এর ৫টি কলামের কাজ ও আইনি Narration লেখার নিয়ম" : "Detailed specifications for Date, Particulars, L.F., Debit, Credit, and Narration writing"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("format")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "format" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. কলাম বিশ্লেষণ" : "1. Column Analysis"}
              </button>
              <button
                onClick={() => setActiveTab("narration")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "narration" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Narration নিয়ম" : "2. Narration Rules"}
              </button>
            </div>
          </div>

          {activeTab === "format" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {Object.keys(columnDetails).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedColId(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition border ${
                      selectedColId === key
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isBengali ? columnDetails[key].titleBn : columnDetails[key].titleEn}
                  </button>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 text-xs sm:text-sm">
                <h3 className="text-base font-bold text-emerald-300">
                  {isBengali ? currentCol.titleBn : currentCol.titleEn}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Purpose:</strong> {isBengali ? currentCol.purposeBn : currentCol.purposeEn}
                </p>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300">
                  <strong>Rule:</strong> {isBengali ? currentCol.ruleBn : currentCol.ruleEn}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <h3 className="text-base font-bold text-sky-300">
                📝 {isBengali ? "আইনি Narration লেখার নিয়মাবলী" : "Rules for Writing Legal Journal Narrations"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali
                  ? "জার্নাল এন্ট্রির নিচে 'Being...' দিয়ে শুরু হওয়া ১ লাইনের বিবরণীই হলো Narration। আয়কর ও জিএসটি অডিটের সময় কেবল সংখ্যা নয়, Narration দেখে ট্যাক্স অফিসাররা লেনদেনের প্রকৃত ধরন বুঝতে পারেন।"
                  : "A narration is a concise explanatory statement written below each journal entry, starting with 'Being...'. During audits, narrations provide legal proof of transaction intent."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-emerald-400 block">Correct Narration Example:</strong>
                  <p className="text-slate-300">(Being office furniture purchased for cash as per Invoice #INV-102)</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-rose-400 block">Incorrect Narration Example:</strong>
                  <p className="text-slate-400">(Bought furniture)</p>
                  <span className="text-[11px] text-rose-300 block">Lacks invoice reference &amp; business context.</span>
                </div>
              </div>
            </div>
          )}
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
                  {isBengali ? "Teacher's Desk: ৫-কলাম জার্নাল বুক আলোচনা" : "Teacher's Desk: 5-Column Journal Discussion"}
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
                    ? "জার্নাল বুক হলো হিসাববিজ্ঞানের প্রথম ডায়েরি বা প্রাইমারি রেকর্ড বুক। ৫টি কলাম সুনির্দিষ্টভাবে সাজানো থাকলে যেকোনো অডিটর মুহূর্তের মধ্যে আয়কর জমা পরীক্ষা করতে পারেন।"
                    : "The Journal Book is the primary book of original entry. A precise 5-column format allows auditors to verify legal transaction trails in seconds."}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Abhronila (Lab Student):</strong> <em>{isBengali ? '"স্যার, TallyPrime-এ ডাইরেক্ট এন্ট্রি করার সময় Narration কেন দরকার?"' : '"Sir, why is typing a detailed Narration essential during voucher entry in TallyPrime?"'}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? '"কারণ অডিটের সময় কেবল নম্বর যথেষ্ট নয়; Being... দিয়ে শুরু হওয়া Narration অডিটরকে লেনদেনের প্রকৃত পটভূমি বুঝতে সাহায্য করে!"' : '"Because during audits, numbers alone are not enough; a clear narration starting with Being... explains the exact business context to tax auditors!"'}</em></p>
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
            title={isBengali ? "৫-কলাম জার্নাল অনুশীলনী ওয়ার্কশীট" : "5-Column Journal Practice Worksheet"}
            subtitle={isBengali ? "প্রাথমিক বাণিজ্যিক লেনদেনের ৫-কলাম জার্নাল বুক অনুশীলন" : "Attempt double-entry journalization in standard 5-column format"}
            isBengali={isBengali}
            hideEngineHeader={true}
            showFlowDiagram={false}
          />
        </section>

        {/* PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic0_study_note_bn.txt" : "topic0_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ০ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 0 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "৫-কলাম জার্নাল ফরম্যাট ও Narration লেখার নিয়ম জানা বাণিজ্যিক অ্যাকাউন্ট্যান্ট হওয়ার প্রথম ভিত্তি!"
                : "Mastering the 5-column journal layout and clear Narration writing is the core foundation for any commercial accountant!"
            }
          />
        </section>

      </div>
    </>
  );
}
