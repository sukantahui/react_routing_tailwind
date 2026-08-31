"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questionsEn from "./topic4_files/topic4_questions";
import questionsBn from "./topic4_files/topic4_questions_bn";
import noteTextEn from "./topic4_files/topic4_note.txt?raw";
import noteTextBn from "./topic4_files/topic4_note_bn.txt?raw";

export default function Topic4() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("capex");

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
            <span>TallyPrime Master Series · Module 1.1 · Topic 5</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali
              ? "ক্যাপিটাল বনাম রেভিনিউ ব্যয়: CapEx vs OpEx ও ব্যবসায়িক আয়ের প্রকারভেদ"
              : "Capital Expenditure (CapEx) vs. Revenue Expenditure (OpEx) & Commercial Revenues"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali
              ? "ব্যালেন্স শিটে সম্পদ হিসেবে যোগ হওয়া দীর্ঘমেয়াদী খরচ (CapEx) এবং P&L অ্যাকাউন্টে ডেবিট হওয়া পরিচালন খরচের (OpEx) সুস্পষ্ট পার্থক্য।"
              : "Critical distinction between capital investments capitalized on the Balance Sheet vs operational costs expensed in P&L."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── 1. CAPEX VS OPEX COMPARISON WORKBENCH ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "CapEx বনাম OpEx তুলনামূলক ম্যাট্রিক্স" : "CapEx vs OpEx Comparative Matrix"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "Tally-তে লেজার ও ভাউচার পোস্টিংয়ের নিয়মাবলি" : "Accounting treatment, financial statement impacts, and TallyPrime ledger group mapping"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("capex")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "capex" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Capital Expenditure (CapEx)
              </button>
              <button
                onClick={() => setActiveTab("opex")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeTab === "opex" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Revenue Expenditure (OpEx)
              </button>
            </div>
          </div>

          {activeTab === "capex" ? (
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold">
                Balance Sheet Impact: Fixed Assets (Capitalized)
              </span>
              <h3 className="text-lg font-bold text-emerald-300">
                {isBengali ? "ক্যাপিটাল এক্সপেনডিচার (CapEx)" : "Capital Expenditure (CapEx)"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isBengali
                  ? "যে খরচের সুবিধা ১ বছরের বেশি সময় ধরে পাওয়া যায় এবং যার মাধ্যমে ব্যবসায়ের উপার্জন ক্ষমতা বা স্থায়ী সম্পদ বৃদ্ধি পায়। (যেমন: কম্পিউটার ক্রয়, নতুন কারখানা নির্মাণ, মেশিন ইনস্টলেশন খরচ)।"
                  : "Expenditure incurred to acquire, construct, or enhance long-term fixed assets yielding economic benefits beyond 1 year."}
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                Tally Group: Fixed Assets / Capital Goods &nbsp;|&nbsp; Statement: Balance Sheet
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-sky-500/40 space-y-4">
              <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 font-mono text-xs font-bold">
                P&amp;L Statement Impact: Operating Expenses (Debited)
              </span>
              <h3 className="text-lg font-bold text-sky-300">
                {isBengali ? "রেভিনিউ এক্সপেনডিচার (OpEx)" : "Revenue Expenditure (OpEx)"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isBengali
                  ? "দৈনন্দিন ব্যবসা পরিচালনার জন্য প্রয়োজনীয় ব্যয় যার সুবিধা বর্তমান হিসাববছরের মধ্যেই শেষ হয়ে যায়। (যেমন: অফিসের ভাড়া, কর্মচারীর বেতন, বিদ্যুৎ বিল, স্টেশনারি ক্রয়)।"
                  : "Operational costs incurred for day-to-day business maintenance and revenue generation fully consumed within the current period."}
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400">
                Tally Group: Indirect Expenses / Direct Expenses &nbsp;|&nbsp; Statement: Profit &amp; Loss Account
              </div>
            </div>
          )}
        </section>

        {/* ─── 2. PRINTABLE STUDY NOTE (DOWNLOAD & PRINT ONLY) ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "topic4_study_note_bn.txt" : "topic4_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* ─── 3. DIAGNOSTIC PRACTICE ASSESSMENT ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Topic ৪ মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Topic 4 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* ─── 4. TEACHER PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "CapEx কে ভুল করে OpEx দেখালে বা OpEx কে CapEx হিসেবে ক্যাপিটালাইজ করলে P&L এ মারাত্মক ভুল নিট লাভ দেখা দেবে! Tally-তে সঠিকভাবে গ্রুপ বেছে নিন।"
                : "Misclassifying CapEx as OpEx (or vice versa) distorts Net Profit in the P&L Account and corrupts Balance Sheet accuracy!"
            }
          />
        </section>

      </div>
    </>
  );
}
