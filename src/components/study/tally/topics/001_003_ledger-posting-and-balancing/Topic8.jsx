"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic8_files/topic8_questions";
import questionsBn from "./topic8_files/topic8_questions_bn";
import noteTextEn from "./topic8_files/topic8_note.txt?raw";
import noteTextBn from "./topic8_files/topic8_note_bn.txt?raw";

export default function Topic8() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("cred_pur");

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

  const scenarios = [{"id":"cred_pur","titleEn":"1. Purchased Trading Merchandise ₹80,000 on Credit from Bengal Traders","detailEn":"Recorded in Purchase Book. Cash purchases are excluded and sent to Cash Book.","detailBn":"Purchase Book-এ নথিভুক্ত হবে। নদে কেনা মাল এতে বসবে না।"},{"id":"ret_out","titleEn":"2. Returned Damaged Merchandise ₹10,000 to Bengal Traders under Debit Note #DN-01","detailEn":"Recorded in Return Outward Book.","detailBn":"Return Outward Book-এ নথিভুক্ত হবে।"}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["In TallyPrime, use F9 (Purchase Voucher) for credit purchases, F8 (Sales Voucher) for credit sales.","Use Alt+F5 (Debit Note) for Return Outward, and Alt+F6 (Credit Note) for Return Inward."];
  const tallyStepsBn = ["TallyPrime-এ বাকিতে কেনাকাটার জন্য F9 (Purchase) এবং বাকিতে বিক্রির জন্য F8 (Sales) ব্যবহার করুন।","ক্রয় ফেরতের জন্য Alt+F5 (Debit Note) এবং বিক্রয় ফেরতের জন্য Alt+F6 (Credit Note) ব্যবহার করুন।"];

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
        
        <div ref={addRef} className="reveal-section">
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>

        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>📊</span>
            <span>TallyPrime Master Series · Module 1.3 · Topic 8</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "বিশেষায়িত সহকারী বই: ক্রয় বই, বিক্রয় বই, ক্রয় ফেরত ও বিক্রয় ফেরত বই মাস্টারক্লাস" : "Specialized Subsidiary Books: Purchase, Sales, Returns Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "বাকিতে পণ্য ক্রয়-বিক্রয় ও ফেরত সংক্রান্ত লেনদেন সহকারী বই সমূহে লিপিবদ্ধ করার ল্যাব।" : "Recording credit merchandise transactions in Purchase Book, Sales Book, Return Outward Book, and Return Inward Book."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-103</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CORE CONCEPTUAL MASTERCLASS SECTION ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "বিশেষায়িত সহকারী বই: ক্রয় বই, বিক্রয় বই, ক্রয় ফেরত ও বিক্রয় ফেরত বই মাস্টারক্লাস - মূল কাঠামো" : "Specialized Subsidiary Books: Purchase, Sales, Returns Masterclass - Core Framework"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "খতিয়ান ও সহকারী বই পরিচালনার তাত্ত্বিক ও বাণিজ্যিক নিয়মাবলি" : "Theoretical principles and operational framework under Module 1.3"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("tab1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab1" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "১. ক্রয় ও বিক্রয় বই" : "1. Purchase & Sales Books"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. ক্রয় ফেরত ও বিক্রয় ফেরত" : "2. Return Outward & Inward"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. ক্রয় ও বিক্রয় বই" : "1. Purchase & Sales Books"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "বিশেষায়িত সহকারী বই: ক্রয় বই, বিক্রয় বই, ক্রয় ফেরত ও বিক্রয় ফেরত বই মাস্টারক্লাস" : "Specialized Subsidiary Books: Purchase, Sales, Returns Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "Purchase Book-এ কেবল বাকিতে ট্রেডিং পণ্য ক্রয় এবং Sales Book-এ কেবল বাকিতে ট্রেডিং পণ্য বিক্রয় লেখা হয়।" : "Purchase Book records CREDIT purchases of trading merchandise. Sales Book records CREDIT sales of trading merchandise."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. ক্রয় ফেরত ও বিক্রয় ফেরত" : "2. Return Outward & Inward"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "বিশেষায়িত সহকারী বই: ক্রয় বই, বিক্রয় বই, ক্রয় ফেরত ও বিক্রয় ফেরত বই মাস্টারক্লাস" : "Specialized Subsidiary Books: Purchase, Sales, Returns Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "Return Outward Book-এ পাওনাদারকে ফেরত দেওয়া পণ্য (Debit Note) এবং Return Inward Book-এ গ্রাহকের ফেরত দেওয়া পণ্য (Credit Note) লেখা হয়।" : "Return Outward Book records defective goods returned to suppliers (Debit Note). Return Inward Book records damaged goods returned by debtors (Credit Note)."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "সহকারী বই ক্লাসিফায়ার" : "Subsidiary Book Classifier"}</span>
          </h2>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "পরিস্থিতি বা কলাম নির্বাচন করুন:" : "Select Practice Scenario or Column:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {scenarios.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`p-3 rounded-xl text-left text-xs font-mono font-bold transition border ${
                      selectedScenarioId === sc.id
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-lg"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isBengali ? sc.titleBn : sc.titleEn}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  {isBengali ? currentScenario.titleBn : currentScenario.titleEn}
                </h3>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-teal-300 font-mono text-xs font-bold w-fit">
                  Status: Active Simulation
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed">
                <strong>Accounting Breakdown:</strong> {isBengali ? currentScenario.detailBn : currentScenario.detailEn}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. STEP-BY-STEP TALLYPRIME OPERATIONAL GUIDE ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>⚙️</span>
            <span>{isBengali ? "TallyPrime কার্যপ্রসূত ধাপসমূহ" : "Step-by-Step TallyPrime Execution"}</span>
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 font-sans">
            {(isBengali ? tallyStepsBn : tallySteps).map((step, idx) => (
              <li key={idx} className="leading-relaxed"><span className="text-slate-200">{step}</span></li>
            ))}
          </ol>
        </section>

        
        {/* ─── 4. COMMERCIAL EXAMPLES & CASE STUDIES ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-teal-400">📚</span>
            <span>{isBengali ? "বাস্তব বাণিজ্যিক উদাহরণ ও কেস স্টাডি" : "Commercial Examples & Case Studies"}</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {[{"id":1,"titleEn":"Subsidiary Book Case 1: Purchased 50 Shirts @ ₹800 on Credit from Raymonds","titleBn":"সহকারী বই ক্ষেত্র ১: রেমন্ডস থেকে বাকিতে ৫০টি শার্ট প্রতি পিস ৮০০ টাকা ক্রয়","drEn":"Recorded in Purchase Book: Raymonds ₹40,000.","drBn":"Purchase Book-এ নথিভুক্ত: রেমন্ডস ৪০,০০০ টাকা।","crEn":"Excluded from Cash Book as it is a CREDIT merchandise purchase.","crBn":"ক্যাশ বুক থেকে বাদ কারণ এটি বাকিতে পণ্য ক্রয়।"}].map((ex) => (
              <div key={ex.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
                <h3 className="text-sm font-bold text-emerald-300 font-mono flex items-center gap-2">
                  <span>📌</span> {isBengali ? ex.titleBn : ex.titleEn}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300">
                    <strong>Debit Posting:</strong> {isBengali ? ex.drBn : ex.drEn}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/30 text-sky-300">
                    <strong>Credit Posting:</strong> {isBengali ? ex.crBn : ex.crEn}
                  </div>
                </div>
              </div>
            ))}
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
                  {isBengali ? "Teacher's Desk: ল্যাব আলোচনা" : "Teacher's Desk: Practical Lab Discussion"}
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
                  {isBengali ? "সহকারী বইসমূহ কেবল বাকিতে ক্রয়-বিক্রয় ও ফেরতের হিসাব রাখে!" : "Subsidiary books exclusively record CREDIT trading merchandise transactions!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, নগদে পণ্য ক্রয় কেন Purchase Book-এ লেখা হয় না?\"" : "\"Sir, why are cash purchases NOT entered in the Purchase Book?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"কারণ সমস্ত নগদ লেনদেন সরাসরি ক্যাশ বুকে চলে যায়! সহকারী বইগুলো তৈরিই হয়েছে কেবল বাকিতে পণ্য লেনদেনের জন্য!\"" : "\"Because cash transactions are entered directly in the Cash Book! Subsidiary books are exclusively for CREDIT merchandise transactions!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic8_study_note_bn.txt" : "topic8_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 8 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 8 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "সহকারী বইসমূহ কেবল বাকিতে ক্রয়-বিক্রয় ও ফেরতের হিসাব রাখে!"
                : "Subsidiary books exclusively record CREDIT trading merchandise transactions!"
            }
          />
        </section>

      </div>
    </>
  );
}
