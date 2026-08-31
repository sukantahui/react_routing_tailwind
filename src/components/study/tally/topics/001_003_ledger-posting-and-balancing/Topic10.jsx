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

export default function Topic10() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("pur_book_tot");

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

  const scenarios = [{"id":"pur_book_tot","titleEn":"1. April Purchase Book Total = ₹2,50,000","detailEn":"Posted on 30-Apr to Purchases Ledger A/c Debit side: \"To Sundries as per Purchase Book ₹2,50,000\".","detailBn":"৩০শে এপ্রিল Purchases লেজারের Dr পাশে পোস্ট হবে: \"To Sundries as per Purchase Book ২,৫০,০০০ টাকা\"।"},{"id":"sales_book_tot","titleEn":"2. April Sales Book Total = ₹3,80,000","detailEn":"Posted on 30-Apr to Sales Ledger A/c Credit side: \"By Sundries as per Sales Book ₹3,80,000\".","detailBn":"৩০শে এপ্রিল Sales লেজারের Cr পাশে পোস্ট হবে: \"By Sundries as per Sales Book ৩,৮০,০০০ টাকা\"।"}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["In TallyPrime, Go To (Alt+G) -> Trial Balance to verify total debit and credit balances.","Check Group Summary under Sundry Debtors and Sundry Creditors to ensure sub-ledger alignment."];
  const tallyStepsBn = ["TallyPrime-এ Alt+G চেপে \"Trial Balance\" চেক করে মেলাুন।","Sundry Debtors ও Sundry Creditors-এর গ্রুপ সামারি দেখে সাব-লেজারের সাথে প্রধান লেজারের জের মিলিয়ে নিন।"];

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
            <span>TallyPrime Master Series · Module 1.3 · Topic 10</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "সহকারী বইয়ের যোগফল ও প্রধান খতিয়ানের (General Ledger) জের মেলানো মাস্টারক্লাস" : "Reconciling Subsidiary Book Totals with General Ledger Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "মাসিক সহকারী বইয়ের যোগফল জেনারেল লেজারের কন্ট্রোল অ্যাকাউন্টে পোস্ট করা ও গাণিতিক শুদ্ধতা পরীক্ষার ল্যাব।" : "Posting periodic subsidiary book totals to General Ledger Control Accounts and verifying arithmetic trial balance accuracy."}
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
                {isBengali ? "সহকারী বইয়ের যোগফল ও প্রধান খতিয়ানের (General Ledger) জের মেলানো মাস্টারক্লাস - মূল কাঠামো" : "Reconciling Subsidiary Book Totals with General Ledger Masterclass - Core Framework"}
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
                {isBengali ? "১. দৈনিক ব্যক্তিগত পোস্টিং" : "1. Daily Individual Posting"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. মাসিক কন্ট্রোল পোস্টিং" : "2. Monthly Control Posting"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. দৈনিক ব্যক্তিগত পোস্টিং" : "1. Daily Individual Posting"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "সহকারী বইয়ের যোগফল ও প্রধান খতিয়ানের (General Ledger) জের মেলানো মাস্টারক্লাস" : "Reconciling Subsidiary Book Totals with General Ledger Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "সহকারী বইয়ের প্রতিটি এন্ট্রি প্রতিদিন সংশ্লিষ্ট দেনাদার বা পাওনাদারের ব্যক্তিগত লেজার অ্যাকাউন্টে পোস্ট করা হয়।" : "Individual entries in Subsidiary Books are posted daily to respective Personal Ledger Accounts of Debtors or Creditors."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. মাসিক কন্ট্রোল পোস্টিং" : "2. Monthly Control Posting"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "সহকারী বইয়ের যোগফল ও প্রধান খতিয়ানের (General Ledger) জের মেলানো মাস্টারক্লাস" : "Reconciling Subsidiary Book Totals with General Ledger Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "মাস শেষে সহকারী বইয়ের মোট যোগফল জেনারেল লেজারের কন্ট্রোল অ্যাকাউন্টে (Purchases A/c, Sales A/c) পোস্টিং দেওয়া হয়।" : "Monthly totals of Subsidiary Books are posted at month-end to main General Ledger accounts (Purchases A/c, Sales A/c, Return A/c)."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "কন্ট্রোল অ্যাকাউন্ট মেলবন্ধন সিমুলেটর" : "Control Account Reconciliation Simulator"}</span>
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
            {[{"id":1,"titleEn":"Reconciliation Case 1: Posting Monthly Sales Book Total ₹4,80,000","titleBn":"মেলবন্ধন ক্ষেত্র ১: মাসিক বিক্রয় বইয়ের মোট ৪,৮০,০০০ টাকা পোস্টিং","drEn":"Individual Customer Ledgers debited daily.","drBn":"প্রতিদিন পৃথক গ্রাহকের লেজার ডেবিট করা হয়।","crEn":"Month-End: Sales Ledger Account credited with ₹4,80,000 as \"By Sundries as per Sales Book\".","crBn":"মাস শেষে: Sales লেজার Cr পাশে \"By Sundries as per Sales Book\" নামে ৪,৮০,০০০ টাকা বসে।"}].map((ex) => (
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
                  {isBengali ? "দৈনিক এন্ট্রি দেনাদার/পাওনাদারের খাতা আপডেট করে; আর মাসিক যোগফল জেনারেল লেজার কন্ট্রোল অ্যাকাউন্ট আপডেট করে!" : "Individual daily posting updates party ledgers; periodic total posting updates General Ledger control accounts!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, মেয়াদী যোগফল পোস্টিং কীভাবে খতিয়ানের সময় বাঁচায়?\"" : "\"Sir, how does periodic total posting save time in manual accounting?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"৫০০টি বিলের জন্য ৫০০ বার Purchases A/c ডেবিট না করে মাস শেষে ১ বার মোট যোগফল দিয়ে ডেবিট করলেই কাজ শেষ হয়ে যায়!\"" : "\"Instead of debiting Purchases Account 500 times for 500 bills, we debit Purchases Account ONCE at month-end with the total!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic10_study_note_bn.txt" : "topic10_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 10 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 10 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "দৈনিক এন্ট্রি দেনাদার/পাওনাদারের খাতা আপডেট করে; আর মাসিক যোগফল জেনারেল লেজার কন্ট্রোল অ্যাকাউন্ট আপডেট করে!"
                : "Individual daily posting updates party ledgers; periodic total posting updates General Ledger control accounts!"
            }
          />
        </section>

      </div>
    </>
  );
}
