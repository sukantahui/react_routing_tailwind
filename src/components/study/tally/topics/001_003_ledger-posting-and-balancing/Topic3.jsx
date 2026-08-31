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

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("debit_cd");

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

  const scenarios = [{"id":"debit_cd","titleEn":"1. Debit Balance (c/d on Credit side on 30-Apr)","detailEn":"30-Apr: Credit side Balance c/d ₹45,000 -> 01-May: Debit side Balance b/d ₹45,000.","detailBn":"৩০শে এপ্রিল: ক্রেডিট পাশে Balance c/d ৪৫,০০০ টাকা -> ১লা মে: ডেবিট পাশে Balance b/d ৪৫,০০০ টাকা।"},{"id":"credit_cd","titleEn":"2. Credit Balance (c/d on Debit side on 30-Apr)","detailEn":"30-Apr: Debit side Balance c/d ₹75,000 -> 01-May: Credit side Balance b/d ₹75,000.","detailBn":"৩০শে এপ্রিল: ডেবিট পাশে Balance c/d ৭৫,০০০ টাকা -> ১লা মে: ক্রেডিট পাশে Balance b/d ৭৫,০০০ টাকা।"},{"id":"zero_cd","titleEn":"3. Balanced Account (Nil Balance)","detailEn":"No Balance c/d or b/d required as Dr side = Cr side.","detailBn":"উভয় পাশ সমান থাকায় কোনো c/d বা b/d বসবে না।"}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["In TallyPrime, closing balances of previous financial year automatically become opening balances (b/d) on 1st April of new financial year.","No manual closing entries are required for asset/liability balance carryforward in Tally."];
  const tallyStepsBn = ["TallyPrime-এ পূর্ববর্তী অর্থবছরের সমাপনী ব্যালেন্স নতুন অর্থবছরের ১লা এপ্রিলে স্বয়ংক্রিয়ভাবে প্রারম্ভিক ব্যালেন্স (b/d) হয়ে যায়।","সম্পদ ও দায়ের জের নতুন বছরে আনার জন্য ম্যানুয়াল এন্ট্রি করতে হয় না।"];

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
            <span>TallyPrime Master Series · Module 1.3 · Topic 3</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "Balance c/d (জের সমাপনী) ও Balance b/d (জের প্রারম্ভিক) মেকানিক্স মাস্টারক্লাস" : "Balance c/d & Balance b/d Mechanics Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "মাস শেষে সমাপনী জের (c/d) এবং নতুন মাসের শুরুতে প্রারম্ভিক জের (b/d) স্থানান্তরের আইনি মেকানিক্স।" : "Understanding period-end closing balances (Carried Down) and period-start opening balances (Brought Down)."}
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
                {isBengali ? "Balance c/d (জের সমাপনী) ও Balance b/d (জের প্রারম্ভিক) মেকানিক্স মাস্টারক্লাস - মূল কাঠামো" : "Balance c/d & Balance b/d Mechanics Masterclass - Core Framework"}
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
                {isBengali ? "১. Balance c/d (সমাপনী জের)" : "1. Balance c/d (Closing Balance)"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. Balance b/d (প্রারম্ভিক জের)" : "2. Balance b/d (Opening Balance)"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. Balance c/d (সমাপনী জের)" : "1. Balance c/d (Closing Balance)"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "Balance c/d (জের সমাপনী) ও Balance b/d (জের প্রারম্ভিক) মেকানিক্স মাস্টারক্লাস" : "Balance c/d & Balance b/d Mechanics Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "Balance c/d (Carried Down) হলো মাস শেষের নিট সমাপনী জের। দুই পাশের মোট যোগফল সমান করতে কম টাকার পাশে লেখা হয়।" : "Balance c/d (Carried Down) represents the closing net balance at month-end. Placed on the deficit side to equalize column totals."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. Balance b/d (প্রারম্ভিক জের)" : "2. Balance b/d (Opening Balance)"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "Balance c/d (জের সমাপনী) ও Balance b/d (জের প্রারম্ভিক) মেকানিক্স মাস্টারক্লাস" : "Balance c/d & Balance b/d Mechanics Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "Balance b/d (Brought Down) হলো নতুন মাসের ১লা তারিখের প্রারম্ভিক জের। এটি তার প্রকৃত প্রকৃতির পাশে (Dr বা Cr) ফিরে আসে।" : "Balance b/d (Brought Down) represents the opening net balance on the 1st day of the new month. Restored to its true nature side (Dr or Cr)."}
              </p>
            </div>
          )}
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "c/d ও b/d ট্রানজিশন সিমুলেটর" : "c/d & b/d Transition Simulator"}</span>
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
            {[{"id":1,"titleEn":"c/d to b/d Case 1: Bank Account Month-End & New Month Transition","titleBn":"c/d থেকে b/d ক্ষেত্র ১: ব্যাংক হিসাবের মাস শেষের c/d ও নতুন মাসের b/d","drEn":"31st May Closing: Credit side Balance c/d ₹2,10,000.","drBn":"৩১শে মে সমাপনী: ক্রেডিট পাশে Balance c/d ২,১০,০০০ টাকা।","crEn":"1st June Opening: Debit side Balance b/d ₹2,10,000.","crBn":"১লা জুন প্রারম্ভিক: ডেবিট পাশে Balance b/d ২,১০,০০০ টাকা।"},{"id":2,"titleEn":"c/d to b/d Case 2: Supplier Account Month-End & New Month Transition","titleBn":"c/d থেকে b/d ক্ষেত্র ২: সরবরাহকারী খতিয়ানের মাস শেষের c/d ও প্রারম্ভিক b/d","drEn":"30th June Closing: Debit side Balance c/d ₹65,000.","drBn":"৩০শে জুন সমাপনী: ডেবিট পাশে Balance c/d ৬৫,০০০ টাকা।","crEn":"1st July Opening: Credit side Balance b/d ₹65,000.","crBn":"১লা জুলাই প্রারম্ভিক: ক্রেডিট পাশে Balance b/d ৬৫,০০০ টাকা।"}].map((ex) => (
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
                  {isBengali ? "মাস শেষের সমাপনী c/d নতুন মাসের ১লা তারিখে তার প্রকৃত প্রকৃতির পাশে b/d হয়ে ফিরে আসে!" : "Closing c/d on smaller side becomes opening b/d on true nature side in the new month!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, c/d এবং b/d-এর মধ্যে মূল পার্থক্য কী?\"" : "\"Sir, what is the exact difference between c/d and b/d?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"c/d মানে Carried Down যা মাস শেষে নিচে নামিয়ে বন্ধ করা হয়; b/d মানে Brought Down যা নতুন মাসের শুরুতে ওপেনিং হিসেবে আনা হয়!\"" : "\"c/d is Carried Down at the end of a period to close the month; b/d is Brought Down at the start of the next period to open the month!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic3_study_note_bn.txt" : "topic3_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 3 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 3 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "মাস শেষের সমাপনী c/d নতুন মাসের ১লা তারিখে তার প্রকৃত প্রকৃতির পাশে b/d হয়ে ফিরে আসে!"
                : "Closing c/d on smaller side becomes opening b/d on true nature side in the new month!"
            }
          />
        </section>

      </div>
    </>
  );
}
