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

export default function Topic7() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("imprest_float");

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

  const scenarios = [{"id":"imprest_float","titleEn":"1. Received Initial Imprest Advance Float ₹5,000 from Chief Cashier","detailEn":"Debit Received Column: ₹5,000. Petty Cash balance initialized to ₹5,000.","detailBn":"প্রাপ্তি কলামে ডেবিট: ৫,০০০ টাকা। পেটি ক্যাশ ব্যালেন্স ৫,০০০ টাকায় শুরু হলো।"},{"id":"expenses_spent","titleEn":"2. Paid Conveyance ₹800 + Stationery ₹1,200 + Tea Snacks ₹500 (Total ₹2,500)","detailEn":"Expenses Total = ₹2,500. Remaining Cash = ₹2,500. Reimbursement required from Chief Cashier = ₹2,500.","detailBn":"মোট খরচ = ২,৫০০ টাকা। অবশিষ্ট ব্যালেন্স = ২,৫০০ টাকা। রিইম্বার্সমেন্টের পরিমাণ = ২,৫০০ টাকা।"}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["Create Petty Cash Ledger under Cash-in-Hand group.","Record initial float via Contra (F4) from Main Cash to Petty Cash.","Record petty expenses via Payment (F5) against Petty Cash Ledger."];
  const tallyStepsBn = ["Cash-in-Hand গ্রুপের অধীনে Petty Cash লেজার তৈরি করুন।","F4 Contra ভাউচারে প্রধান ক্যাশ থেকে পেটি ক্যাশে ফ্লোট ট্র্যান্সফার করুন।","F5 Payment ভাউচারে পেটি ক্যাশ থেকে ছোটখাটো খরচের এন্ট্রি দিন।"];

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
            <span>TallyPrime Master Series · Module 1.3 · Topic 7</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "পেটি ক্যাশ বুক ও ইম্প্রেস্ট সিস্টেম (খুচরো নগদ) পরিচালনা মাস্টারক্লাস" : "Petty Cash Book & Imprest System Management Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "ইম্প্রেস্ট সিস্টেমে নির্ধারিত ফ্লোট নিয়ে দৈনন্দিন খুচরো খরচ (ডাক, স্টেশনারি, চা) পরিচালন ল্যাব।" : "Managing routine micro-expenses (tea, postage, stationery) using Analytical Petty Cash Book and Imprest Float replenishment."}
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
                {isBengali ? "পেটি ক্যাশ বুক ও ইম্প্রেস্ট সিস্টেম (খুচরো নগদ) পরিচালনা মাস্টারক্লাস - মূল কাঠামো" : "Petty Cash Book & Imprest System Management Masterclass - Core Framework"}
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
                {isBengali ? "১. ইম্প্রেস্ট সিস্টেম ফ্লোট" : "1. Imprest System Float"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. এনালাইটিক্যাল কলাম" : "2. Analytical Expense Columns"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. ইম্প্রেস্ট সিস্টেম ফ্লোট" : "1. Imprest System Float"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "পেটি ক্যাশ বুক ও ইম্প্রেস্ট সিস্টেম (খুচরো নগদ) পরিচালনা মাস্টারক্লাস" : "Petty Cash Book & Imprest System Management Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "মূল ক্যাশিয়ার পেটি ক্যাশিয়ারকে নির্দিষ্ট অগ্রিম ফ্লোট (যেমন ৫,০০০ টাকা) দেন। মাস শেষে খরচ হওয়া টাকা ফেরত দিয়ে আগের ফ্লোট ফিরিয়ে আনা হয়।" : "The Chief Cashier advances a fixed float (e.g. ₹5,000) to Petty Cashier. Spent amount is reimbursed at period end to restore original float."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. এনালাইটিক্যাল কলাম" : "2. Analytical Expense Columns"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "পেটি ক্যাশ বুক ও ইম্প্রেস্ট সিস্টেম (খুচরো নগদ) পরিচালনা মাস্টারক্লাস" : "Petty Cash Book & Imprest System Management Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "এনালাইটিক্যাল পেটি ক্যাশ বুকে খরচের ধরন অনুযায়ী আলাদা কলাম (ডাক, যাতায়াত, স্টেশনারি, চা) থাকে।" : "Analytical Petty Cash Book uses specific expense columns (Postage, Conveyance, Tea, Stationery) for systematic classification."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "পেটি ক্যাশ ফ্লোট ও রিইম্বার্সমেন্ট সিমুলেটর" : "Petty Cash Float & Reimburses Simulator"}</span>
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
            {[{"id":1,"titleEn":"Petty Cash Case 1: Weekly Refreshments ₹1,200 + Courier ₹500 + Cleaning ₹800","titleBn":"পেটি ক্যাশ ক্ষেত্র ১: সাপ্তাহিক নাস্তা ১,২০০ + কুরিয়ার ৫০০ + পরিচ্ছন্নতা ৮০০ টাকা","drEn":"Analytical Columns: Refreshments ₹1,200, Courier ₹500, Misc ₹800.","drBn":"এনালাইটিক্যাল কলাম: নাস্তা ১,২০০, কুরিয়ার ৫০০, বিবিধ ৮০০ টাকা।","crEn":"Total Spend = ₹2,500. Reimbursed by Chief Cashier.","crBn":"মোট খরচ = ২,৫০০ টাকা। মূল ক্যাশ থেকে রিইম্বার্স হবে।"}].map((ex) => (
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
                  {isBengali ? "ইম্প্রেস্ট সিস্টেম প্রকৃত খরচের টাকা রিইম্বার্স করে পেটি ক্যাশ ফ্লোটকে সর্বদা নির্দিষ্ট রাখে!" : "Imprest System keeps petty cash float constant by reimbursing exact spent expenses!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, ইম্প্রেস্ট সিস্টেম কীভাবে খুচরো নগদে জালিয়াতি রোধ করে?\"" : "\"Sir, how does Imprest System prevent petty cash fraud?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"কারণ পেটি ক্যাশিয়ারের কাছে স্থায়ী ফ্লোটের বেশি টাকা থাকে না! মূল ক্যাশিয়ার প্রতি ভাউচার পরীক্ষা করে তবেই রিইম্বার্সমেন্ট দেন!\"" : "\"By capping the petty cashier's exposure to a fixed float! The Chief Cashier audits vouchers before reimbursing exact spent money!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic7_study_note_bn.txt" : "topic7_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 7 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 7 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "ইম্প্রেস্ট সিস্টেম প্রকৃত খরচের টাকা রিইম্বার্স করে পেটি ক্যাশ ফ্লোটকে সর্বদা নির্দিষ্ট রাখে!"
                : "Imprest System keeps petty cash float constant by reimbursing exact spent expenses!"
            }
          />
        </section>

      </div>
    </>
  );
}
