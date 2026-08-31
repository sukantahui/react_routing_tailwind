"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic1_files/topic1_questions";
import questionsBn from "./topic1_files/topic1_questions_bn";
import noteTextEn from "./topic1_files/topic1_note.txt?raw";
import noteTextBn from "./topic1_files/topic1_note_bn.txt?raw";

export default function Topic1() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("comparison");

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
            <span>TallyPrime Master Series · Module 1.1 · Topic 2</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "বুককিপিং বনাম অ্যাকাউন্টিং: সম্পূর্ণ অ্যাকাউন্টিং লাইফসাইকেল"
              : "Bookkeeping versus Accounting: The Complete Accounting Lifecycle"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "দৈনন্দিন বুককিপিং ডেটা এন্ট্রি এবং বিশ্লেষণধর্মী অ্যাকাউন্টিং রিপোর্টিংয়ের মধ্যে সূক্ষ্ম প্রযুক্তিগত তফাৎ ও TallyPrime-এ অটোমেশন।"
              : "Understanding the primary recording phase versus analytical financial reporting across the entire commercial lifecycle."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. INTERACTIVE COMPARISON WORKBENCH ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "বুককিপিং বনাম অ্যাকাউন্টিং তুলনামূলক বিশ্লেষণ" : "Bookkeeping vs. Accounting Comparative Matrix"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "পর্যাপ্ততা, দায়িত্ব ও কাজের পরিধি" : "Scope, technical responsibility, and business decision impact"}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("comparison")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "comparison" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "তুলনামূলক ছক" : "Comparison Matrix"}
              </button>
              <button
                onClick={() => setActiveTab("lifecycle")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "lifecycle" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "লাইফসাইকেল ফ্লো" : "Lifecycle Flow"}
              </button>
            </div>
          </div>

          {activeTab === "comparison" ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-slate-900 text-slate-200 border-b border-slate-800">
                    <th className="p-3">Parameter / মানদণ্ড</th>
                    <th className="p-3 text-emerald-400">Bookkeeping (বুককিপিং)</th>
                    <th className="p-3 text-sky-400">Accounting (অ্যাকাউন্টিং)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-white">Primary Focus / মূল লক্ষ্য</td>
                    <td className="p-3">Recording daily transactions in vouchers &amp; ledgers.</td>
                    <td className="p-3">Summarizing, auditing, &amp; interpreting financial health.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Stage / ধাপ</td>
                    <td className="p-3 text-emerald-300 font-semibold">Primary Stage (প্রাথমিক ধাপ)</td>
                    <td className="p-3 text-sky-300 font-semibold">Secondary / Advanced Stage (দ্বিতীয় ধাপ)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">TallyPrime Role</td>
                    <td className="p-3">Voucher Entry (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-xs">F5, F6, F8, F9</kbd>)</td>
                    <td className="p-3">P&amp;L, Balance Sheet, GST Returns &amp; Ratio Analysis</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Performed By</td>
                    <td className="p-3">Accounts Clerk / Data Entry Operator</td>
                    <td className="p-3">Senior Accountant / Financial Controller / CA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-mono font-bold block">1. RECORDING PHASE (Bookkeeping)</span>
                <p className="text-slate-300 leading-relaxed">
                  {isBengali ? "রসিদ ও মেমো থেকে TallyPrime ভাউচারে নিয়মিত এন্ট্রি করা।" : "Regular entry from bills & invoices into TallyPrime vouchers."}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-sky-400 font-mono font-bold block">2. PROCESSING PHASE (Software Engine)</span>
                <p className="text-slate-300 leading-relaxed">
                  {isBengali ? "Tally-র অটোমেটেড লেজার পোস্টিং ও রেওয়ামিল গঠন।" : "Automated ledger posting, balancing, and Trial Balance compilation."}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-purple-400 font-mono font-bold block">3. REPORTING PHASE (Accounting)</span>
                <p className="text-slate-300 leading-relaxed">
                  {isBengali ? "লাভ-ক্ষতি ও ব্যালেন্স শিট বিশ্লেষণ করে বাণিজ্যিক সিদ্ধান্ত নেওয়া।" : "Analyzing P&L, Balance Sheet, and GST compliance for business decisions."}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic1_study_note_bn.txt" : "topic1_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 3. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ২ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 2 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 4. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "বুককিপিং হল ভিত্তি আর অ্যাকাউন্টিং হল সিদ্ধান্ত গ্রহণের ক্ষমতা! TallyPrime দুটিকেই একত্রিত করে এক ক্লিকে বুককিপারকে অ্যাকাউন্ট্যান্টে রূপান্তর করে।"
                : "Bookkeeping builds the foundation while Accounting drives decision-making! TallyPrime bridges both seamlessly by automating reporting from raw vouchers."
            }
          />
        </section>

      </div>
    </>
  );
}
