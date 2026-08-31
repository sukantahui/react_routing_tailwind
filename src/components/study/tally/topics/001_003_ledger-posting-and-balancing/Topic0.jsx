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

  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedScenarioId, setSelectedScenarioId] = useState("date");

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

  const scenarios = [{"id":"date","titleEn":"1. Date Column (তারিখ কলাম)","detailEn":"Records transaction date chronologically. Must match the exact date recorded in the Journal Book.","detailBn":"জার্নাল বইতে নথিভুক্ত লেনদেনের হুবহু কালানুক্রমিক তারিখ বসাতে হয়।"},{"id":"particulars","titleEn":"2. Particulars Column (বিবরণী কলাম)","detailEn":"Specifies the opposing Ledger Account name prefixed with \"To\" (Dr) or \"By\" (Cr) to maintain double-entry audit linkage.","detailBn":"বিপরীত লেজার অ্যাকাউন্টের নাম নির্দেশ করে (Dr পাশে \"To\" এবং Cr পাশে \"By\") যা অডিট লিঙ্ক তৈরি করে।"},{"id":"jf","titleEn":"3. J.F. Column (Journal Folio)","detailEn":"Cross-audit reference page number of the original Journal Book where the entry was first journalized.","detailBn":"মূল জাবেদা বইয়ের যে পৃষ্ঠায় প্রথম এন্ট্রি দেওয়া হয়েছিল তার অডিট রেফারেন্স পৃষ্ঠা নম্বর।"},{"id":"amount","titleEn":"4. Amount Column (টাকার কলাম)","detailEn":"Monetary numerical value posted directly from the debited or credited line in the Journal entry.","detailBn":"জাবেদা এন্ট্রির ডেবিট বা ক্রেডিট লাইন থেকে সরাসরি স্থানান্তরিত টাকার পরিমাণ।"},{"id":"tally_mapping","titleEn":"5. TallyPrime Ledger Display","detailEn":"In TallyPrime, press Alt+G -> Ledger Monthly Summary / Ledger Vouchers to view automatic T-account style presentation.","detailBn":"TallyPrime-এ Alt+G চেপে Ledger Vouchers অপশনে গেলে অটোমেটিক লেজার ভিউ দেখা যায়।"}];
  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const tallySteps = ["Open Gateway of Tally -> Accounts Info / Alter -> Ledger.","Select any master ledger (e.g. Cash, SBI Bank, Rent Expense) to inspect opening balance & configuration.","Press Alt+G (Go To) -> Type \"Ledger Vouchers\" and select the desired ledger to view the live statement.","Press F12 (Configure) to toggle \"Show Running Balance\" and \"Format of Report: Detailed\"."];
  const tallyStepsBn = ["Gateway of Tally-তে যান -> Alter -> Ledger অপশন বাছুন।","যেকোনো লেজার মাস্টার (যেমন Cash, Bank, Rent) নির্বাচন করে প্রারম্ভিক জের ও গ্রুপ দেখুন।","Alt+G (Go To) চাপুন -> \"Ledger Vouchers\" টাইপ করে কাঙ্ক্ষিত লেজারের সম্পূর্ণ স্টেটমেন্ট দেখুন।","F12 চাপুন এবং \"Show Running Balance\" অন করে রানিং ব্যালেন্স দেখুন।"];

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
            <span>TallyPrime Master Series · Module 1.3 · Topic 0</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "লেজার অ্যাকাউন্টের ফরম্যাট (T-Format), Dr/Cr কলাম ও বিস্তৃত কাঠামো মাস্টারক্লাস" : "5-Column Ledger Format (T-Format) & Structure Masterclass"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "লেজারের T-ফরম্যাট কাঠামো: ডেবিট ও ক্রেডিট পাশের ৮টি কলাম, জাবেদা পৃষ্ঠা (J.F.) এবং ট্যালিপ্রাইম লেজার কাঠামোর প্রয়োগ।" : "Mastering the 8-column T-Account structure: Date, Particulars, J.F., and Amount on Debit (Dr) and Credit (Cr) sides with TallyPrime mapping."}
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
                {isBengali ? "লেজার অ্যাকাউন্টের ফরম্যাট (T-Format), Dr/Cr কলাম ও বিস্তৃত কাঠামো মাস্টারক্লাস - মূল কাঠামো" : "5-Column Ledger Format (T-Format) & Structure Masterclass - Core Framework"}
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
                {isBengali ? "১. ডেবিট পাশ (Dr) কলাম কাঠামো" : "1. Debit Side (Dr) Structure"}
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "tab2" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isBengali ? "২. ক্রেডিট পাশ (Cr) কলাম কাঠামো" : "2. Credit Side (Cr) Structure"}
              </button>
            </div>
          </div>

          {activeTab === "tab1" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "১. ডেবিট পাশ (Dr) কলাম কাঠামো" : "1. Debit Side (Dr) Structure"}
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "লেজার অ্যাকাউন্টের ফরম্যাট (T-Format), Dr/Cr কলাম ও বিস্তৃত কাঠামো মাস্টারক্লাস" : "5-Column Ledger Format (T-Format) & Structure Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "ডেবিট পাশ (বামে) আগত মান, সম্পদ বৃদ্ধি এবং পরিচালন খরচ রেকর্ড করে। সকল লাইনের বিবরণীর শুরুতে \"To\" শব্দ বসাতে হয়। এতে তারিখ, বিবরণী, J.F. এবং টাকার কলাম থাকে।" : "The Debit side (left) records all values coming into the business, asset increases, and operating expenses. Lines begin with the prefix \"To\". Contains Date, Particulars, J.F., and Amount columns."}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold w-fit block">
                {isBengali ? "২. ক্রেডিট পাশ (Cr) কলাম কাঠামো" : "2. Credit Side (Cr) Structure"}
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "লেজার অ্যাকাউন্টের ফরম্যাট (T-Format), Dr/Cr কলাম ও বিস্তৃত কাঠামো মাস্টারক্লাস" : "5-Column Ledger Format (T-Format) & Structure Masterclass"}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {isBengali ? "ক্রেডিট পাশ (ডানে) নির্গত মান, দায়, মূলধন এবং রাজস্ব আয় রেকর্ড করে। সকল লাইনের বিবরণীর শুরুতে \"By\" শব্দ বসাতে হয়। এতে তারিখ, বিবরণী, J.F. এবং টাকার কলাম থাকে।" : "The Credit side (right) records all values going out of the business, liabilities, owner equity, and revenues. Lines begin with the prefix \"By\". Contains Date, Particulars, J.F., and Amount columns."}
              </p>
            </div>
          )}
        </section>

        
        {/* ─── 1.5 VISUAL T-ACCOUNT LEDGER FORMAT REFERENCE ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/40 bg-slate-900/90 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-bold uppercase mb-2">
                <span>📖</span> Practical Accounting Reference Format
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "নমুনা খতিয়ান অ্যাকাউন্ট (Visual T-Account Ledger)" : "Standard 8-Column T-Account Ledger Reference"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "বাস্তব খতিয়ান খাতার সঠিক ডাবল-এন্ট্রি গঠন ও ব্যালেন্সিং সমীকরণ" : "Live demonstration of a fully posted and balanced General Ledger Account"}
              </p>
            </div>
            
            <div className="text-right font-mono text-xs text-emerald-400 font-bold bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              ACCOUNT NAME: CASH A/C (ক্যাশ অ্যাকাউন্ট)
            </div>
          </div>

          {/* Real T-Account Ledger Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th colSpan={4} className="py-2.5 px-4 text-emerald-400 font-bold border-r border-slate-800 text-center uppercase tracking-wider bg-emerald-950/40">
                    Dr. (Debit Side - বাম পাশ)
                  </th>
                  <th colSpan={4} className="py-2.5 px-4 text-sky-400 font-bold text-center uppercase tracking-wider bg-sky-950/40">
                    Cr. (Credit Side - ডান পাশ)
                  </th>
                </tr>
                <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[11px]">
                  <th className="py-2 px-3 border-r border-slate-800/60 w-24">Date</th>
                  <th className="py-2 px-3 border-r border-slate-800/60">Particulars (Dr)</th>
                  <th className="py-2 px-3 border-r border-slate-800/60 w-14 text-center">J.F.</th>
                  <th className="py-2 px-3 border-r-2 border-slate-700 text-right w-24">Amount (₹)</th>
                  <th className="py-2 px-3 border-r border-slate-800/60 w-24">Date</th>
                  <th className="py-2 px-3 border-r border-slate-800/60">Particulars (Cr)</th>
                  <th className="py-2 px-3 border-r border-slate-800/60 w-14 text-center">J.F.</th>
                  <th className="py-2 px-3 text-right w-24">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-200">
                <tr className="hover:bg-slate-900/50 transition">
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">2026-04-01</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 font-semibold text-emerald-300">To Capital A/c</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">12</td>
                  <td className="py-2.5 px-3 border-r-2 border-slate-700 text-right font-bold">2,00,000</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">2026-04-05</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 font-semibold text-sky-300">By Furniture A/c</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">15</td>
                  <td className="py-2.5 px-3 text-right font-bold">35,000</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition">
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">2026-04-10</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 font-semibold text-emerald-300">To Sales A/c</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">18</td>
                  <td className="py-2.5 px-3 border-r-2 border-slate-700 text-right font-bold">50,000</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">2026-04-12</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 font-semibold text-sky-300">By Rent Expense A/c</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">22</td>
                  <td className="py-2.5 px-3 text-right font-bold">15,000</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition">
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">2026-04-20</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 font-semibold text-emerald-300">To Commission A/c</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">26</td>
                  <td className="py-2.5 px-3 border-r-2 border-slate-700 text-right font-bold">8,500</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">2026-04-18</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 font-semibold text-sky-300">By Salaries A/c</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">28</td>
                  <td className="py-2.5 px-3 text-right font-bold">25,000</td>
                </tr>
                <tr className="bg-amber-950/20 border-t border-amber-500/30">
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-500">—</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-500">—</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">—</td>
                  <td className="py-2.5 px-3 border-r-2 border-slate-700 text-right text-slate-500">—</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-amber-400 font-bold">2026-04-30</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 font-bold text-amber-300">By Balance c/d (Closing)</td>
                  <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">—</td>
                  <td className="py-2.5 px-3 text-right font-bold text-amber-300">1,83,500</td>
                </tr>
                <tr className="bg-slate-900 font-bold text-white border-t-2 border-b-2 border-emerald-500/50">
                  <td colSpan={3} className="py-3 px-3 text-right border-r border-slate-800/60 uppercase text-[11px] tracking-wider text-emerald-400">Total Dr:</td>
                  <td className="py-3 px-3 border-r-2 border-slate-700 text-right text-emerald-400 font-mono text-sm">₹2,58,500</td>
                  <td colSpan={3} className="py-3 px-3 text-right border-r border-slate-800/60 uppercase text-[11px] tracking-wider text-sky-400">Total Cr:</td>
                  <td className="py-3 px-3 text-right text-sky-400 font-mono text-sm">₹2,58,500</td>
                </tr>
                <tr className="bg-emerald-950/40 text-emerald-300 font-bold">
                  <td className="py-3 px-3 border-r border-slate-800/60">2026-05-01</td>
                  <td className="py-3 px-3 border-r border-slate-800/60">To Balance b/d (Opening)</td>
                  <td className="py-3 px-3 border-r border-slate-800/60 text-center">—</td>
                  <td className="py-3 px-3 border-r-2 border-slate-700 text-right font-mono text-sm">1,83,500</td>
                  <td colSpan={4} className="py-3 px-3 text-slate-500 italic text-[11px] text-center">New Accounting Period Opened on Debit Side</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <span>💡</span> Key Ledger Balancing Rules Illustrated Above:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed font-sans">
              <li><strong>Total Debits (Dr):</strong> ₹2,00,000 + ₹50,000 + ₹8,500 = <strong>₹2,58,500</strong>.</li>
              <li><strong>Total Credits (Cr Expenses):</strong> ₹35,000 + ₹15,000 + ₹25,000 = <strong>₹75,000</strong>.</li>
              <li><strong>Balancing Figure (Balance c/d):</strong> ₹2,58,500 - ₹75,000 = <strong>₹1,83,500</strong> (written on Credit side on 30th April to balance total ₹2,58,500).</li>
              <li><strong>New Period Opening (Balance b/d):</strong> Transferred to Debit side on 1st May as <strong>₹1,83,500</strong> (Debit Balance).</li>
            </ul>
          </div>
        </section>

        {/* ─── 2. LIVE INTERACTIVE WORKBENCH / SIMULATOR ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">🧪</span>
            <span>{isBengali ? "T-অ্যাকাউন্ট কলাম ইনস্পেক্টর ও সরাসরি বিশ্লেষণ" : "T-Account Column Inspector & Live Analysis"}</span>
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
            {[{"id":1,"titleEn":"Commercial Case 1: Owner Capital Contribution ₹2,00,000","titleBn":"বাণিজ্যিক ক্ষেত্র ১: মালিকের মূলধন বিনয়োগ ২,০০,০০০ টাকা","drEn":"Debit Side: Cash A/c Dr -> Date | To Capital A/c | J.F. 01 | ₹2,00,000","drBn":"ডেবিট পাশ: Cash লেজার Dr -> তারিখ | To Capital A/c | J.F. 01 | ২,০০,০০০ টাকা","crEn":"Credit Side: Capital A/c Cr -> Date | By Cash A/c | J.F. 01 | ₹2,00,000","crBn":"ক্রেডিট পাশ: Capital লেজার Cr -> তারিখ | By Cash A/c | J.F. 01 | ২,০০,০০০ টাকা"},{"id":2,"titleEn":"Commercial Case 2: Purchased Office Machinery ₹75,000 by Cheque","titleBn":"বাণিজ্যিক ক্ষেত্র ২: চেকের মাধ্যমে অফিসে যন্ত্রপাতি ক্রয় ৭৫,০০০ টাকা","drEn":"Debit Side: Machinery A/c Dr -> Date | To Bank A/c | J.F. 05 | ₹75,000","drBn":"ডেবিট পাশ: Machinery লেজার Dr -> তারিখ | To Bank A/c | J.F. 05 | ৭৫,০০০ টাকা","crEn":"Credit Side: Bank A/c Cr -> Date | By Machinery A/c | J.F. 05 | ₹75,000","crBn":"ক্রেডিট পাশ: Bank লেজার Cr -> তারিখ | By Machinery A/c | J.F. 05 | ৭৫,০০০ টাকা"},{"id":3,"titleEn":"Commercial Case 3: Paid Showroom Rent ₹25,000 in Cash","titleBn":"বাণিজ্যিক ক্ষেত্র ৩: শোরুমের নগদ ভাড়া প্রদান ২৫,০০০ টাকা","drEn":"Debit Side: Rent Expense Dr -> Date | To Cash A/c | J.F. 10 | ₹25,000","drBn":"ডেবিট পাশ: Rent Expense Dr -> তারিখ | To Cash A/c | J.F. 10 | ২৫,০০০ টাকা","crEn":"Credit Side: Cash A/c Cr -> Date | By Rent Expense A/c | J.F. 10 | ₹25,000","crBn":"ক্রেডিট পাশ: Cash লেজার Cr -> তারিখ | By Rent Expense A/c | J.F. 10 | ২৫,০০০ টাকা"}].map((ex) => (
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
                  {isBengali ? "T-অ্যাকাউন্টের ৮-কলামের কাঠামো নিখুঁতভাবে শেখাই হলো ডাবল-এন্ট্রি লেজার পোস্টিংয়ের প্রথম ধাপ!" : "Mastering the 8-column T-Account structure is the cornerstone of double-entry ledger posting!"}
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Swadeep (Lab Student):</strong> <em>{isBengali ? "\"স্যার, ক্লাসে খতিয়ান আঁকার সময় J.F. (Journal Folio) ঘর ফাঁকা থাকে কেন?\"" : "\"Sir, why is J.F. (Journal Folio) column left blank during classroom practice?\""}</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>{isBengali ? "\"কারণ ক্লাসের খাতায় আলাদা পৃষ্ঠা নম্বরযুক্ত জার্নাল বই থাকে না! তবে বাস্তব ব্যবসায়িক অডিটে J.F. কলাম অডিটরদের ভাউচার মেলাতে সাহায্য করে!\"" : "\"Because classroom exercises don't use numbered Journal Books! In real commercial accounting & Tally, J.F. stores the audit voucher folio number!\""}</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic0_study_note_bn.txt" : "topic0_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic 0 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 0 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "T-অ্যাকাউন্টের ৮-কলামের কাঠামো নিখুঁতভাবে শেখাই হলো ডাবল-এন্ট্রি লেজার পোস্টিংয়ের প্রথম ধাপ!"
                : "Mastering the 8-column T-Account structure is the cornerstone of double-entry ledger posting!"
            }
          />
        </section>

      </div>
    </>
  );
}
