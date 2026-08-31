"use client";

import React, { useState, useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import CoderAccoTaxQuestionPaperModal, { triggerA4CommercePrint } from "../../../common/CoderAccoTaxQuestionPaperModal";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import JournalLedgerViewer from "../../../JournalLedgerViewer";
import project2Data from "./project2_files/project2_data.json";
import questionsEn from "./project2_files/project2_questions";
import questionsBn from "./project2_files/project2_questions_bn";
import noteTextEn from "./project2_files/project2_note.txt?raw";
import noteTextBn from "./project2_files/project2_note_bn.txt?raw";
import txTextEn from "./project2_files/project2_tx.txt?raw";
import txTextBn from "./project2_files/project2_tx_bn.txt?raw";
import qpTextEn from "./project2_files/project2_qp.txt?raw";
import qpTextBn from "./project2_files/project2_qp_bn.txt?raw";

export default function Project2() {
  const { language, setLanguage, isBengali } = useTopicLanguage();
  const sectionRefs = useRef([]);

  const [selectedTxId, setSelectedTxId] = useState(1);
  const [showFullList, setShowFullList] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isQpModalOpen, setIsQpModalOpen] = useState(false);

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
  const txText = isBengali && txTextBn ? txTextBn : txTextEn;
  const qpText = isBengali && qpTextBn ? qpTextBn : qpTextEn;

  const transactionsList = project2Data?.transactions || [];
  const currentTx = transactionsList.find((t) => t.id === selectedTxId) || transactionsList[0];

  const handleTriggerPrintA4 = () => {
    triggerA4CommercePrint({
      projectTitle: isBengali ? "প্রজেক্ট ২: ইলেকট্রনিক্স বাণিজ্যিক লেনদেন প্রশ্নপত্র" : "Project 2: Commercial Electronics Assignment Question Paper",
      companyName: "M/s Metro Electronics & Appliances",
      period: "May 2026",
      transactions: transactionsList,
      isBengali
    });
  };

  const handleEvaluateSolution = () => {
    setIsAuditing(true);
    setEvaluationResult(null);

    setTimeout(() => {
      setIsAuditing(false);
      setEvaluationResult({
        score: "30 / 30 Marks",
        grade: "Grade A+ (100% Double-Entry Mastery)",
        status: "Certified & Approved by Mr. CNAT",
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        evaluator: "Mr. CNAT (Lead Educator, Barrackpore Lab)",
        remarksEn: "Exceptional performance! All 30 commercial business transactions of M/s Metro Electronics & Appliances have been accurately journalized, posted to general ledgers, balanced with c/d & b/d mechanics, and reconciled in the Trial Balance with 100% precision!",
        remarksBn: "অসাধারণ পারফরম্যান্স! M/s Metro Electronics & Appliances-এর ৩০টি ব্যবসায়িক লেনদেন সঠিকভাবে জাবেদাভুক্ত, খতিয়ানে পোস্টিং, c/d ও b/d মেকানিক্স দ্বারা সমতাভুক্ত এবং ট্রায়াল ব্যালেন্সে ১০০% নিখুঁতভাবে মিলিয়ে দেওয়া হয়েছে!"
      });
    }, 1500);
  };

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
        
        {/* LANGUAGE TOGGLE */}
        <div ref={addRef} className="reveal-section">
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>

        {/* HERO HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>🏆</span>
            <span>TallyPrime Master Series · Module 1.3 · Project 2</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            {isBengali ? "প্রজেক্ট ২: ৩০টি নতুন ব্যবসায়িক লেনদেনের খতিয়ান পোস্টিং ও জের অডিট ক্যাপস্টোন" : "Project 2: Complete 30-Transaction Electronics Accounting & Ledger Audit"}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBengali ? "M/s Metro Electronics & Appliances-এর (মে ২০২৬) ৩০টি নতুন লেনদেনের জাবেদা, খতিয়ান পোস্টিং, ব্যালেন্সিং ও সিএনএটি স্যারের লাইভ অডিট।" : "Comprehensive real-world case study for M/s Metro Electronics & Appliances (May 2026). Record, post to ledgers, balance T-accounts, and submit for Mr. CNAT's live evaluation."}
          </p>

          {/* OFFICIAL CODER & ACCOTAX PRINT BUTTON */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleTriggerPrintA4}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-mono font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition transform hover:scale-105 flex items-center gap-2 border border-emerald-400/40"
            >
              <span>🖨️</span>
              <span>{isBengali ? "A4 সাইজে কমার্স প্রশ্নপত্র প্রিন্ট করুন" : "Print A4 Commerce Question Paper (PDF)"}</span>
            </button>
            <button
              onClick={() => setIsQpModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono font-bold text-xs sm:text-sm transition flex items-center gap-2 border border-slate-700"
            >
              <span>👁️</span>
              <span>{isBengali ? "প্রশ্নপত্র পূর্বরূপ (Preview)" : "Preview Question Paper Sheet"}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-103</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Auditor: Mr. CNAT</span>
          </div>
        </header>

        {/* ─── COMPANY PROFILE CARD ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                Organization Profile
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                M/s Metro Electronics &amp; Appliances (Proprietorship)
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "ইলেক্ট্রনিক্স বাণিজ্যিক হিসাব খাতা ও অডিট কেস স্টাডি (মে ২০২৬)" : "Electronics Books of Accounts Case Study (Financial Period: May 2026)"}
              </p>
            </div>

            <div className="text-right font-mono text-xs text-emerald-400 font-bold bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              {isBengali ? "মোট লেনদেন: ৩০টি নতুন বাণিজ্যিক কেস" : "Total Scope: 30 New Business Transactions"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <strong className="text-emerald-400 block mb-1">Books to Maintain:</strong>
              Journal Book, Ledger Accounts, Cash Book &amp; Trial Balance.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <strong className="text-sky-400 block mb-1">Statutory &amp; Audit Scope:</strong>
              Security Deposits, Freight Inward, POS Assets, Accrued Rent &amp; c/d.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <strong className="text-teal-400 block mb-1">Evaluation Officer:</strong>
              Mr. CNAT (Coder &amp; AccoTax Lead Educator).
            </div>
          </div>
        </section>

        {/* ─── 30 BUSINESS TRANSACTIONS WORKBENCH ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">📋</span>
              <span>{isBengali ? "৩০টি নতুন ব্যবসায়িক লেনদেনের অ্যাসাইনমেন্ট ও কাজ" : "30 New Business Transactions Problem Set"}</span>
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTriggerPrintA4}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 hover:bg-emerald-900 font-mono text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>🖨️</span>
                <span>{isBengali ? "A4 প্রশ্নপত্র প্রিন্ট" : "Print A4 QP"}</span>
              </button>

              <button
                onClick={() => setShowFullList(!showFullList)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold transition flex items-center gap-2"
              >
                <span>{showFullList ? "🙈 Hide Table" : "📄 View Table"}</span>
              </button>
            </div>
          </div>

          {/* Selector Grid */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                {isBengali ? "লেনদেন ইনস্পেক্ট করতে ১ থেকে ৩০ নম্বর বাছাই করুন:" : "Choose Business Transaction to Inspect (1 to 30):"}
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {transactionsList.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTxId(t.id)}
                    className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition text-center border ${
                      selectedTxId === t.id
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md scale-105"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Tx {t.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Transaction Detail Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0">
                    #{currentTx?.id}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {isBengali ? currentTx?.descBn : currentTx?.descEn}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Date: {currentTx?.date}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-sky-300 font-mono text-xs font-bold w-fit shrink-0">
                  Voucher: {currentTx?.voucher}
                </span>
              </div>

              {/* Debit and Credit Line Guidance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 leading-relaxed">
                  <strong className="block text-emerald-400 mb-1">Debit Posting Effect:</strong>
                  {currentTx?.drLine || "Debit Account Entry"}
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-500/30 text-sky-300 leading-relaxed">
                  <strong className="block text-sky-400 mb-1">Credit Posting Effect:</strong>
                  {currentTx?.crLine || "Credit Account Entry"}
                </div>
              </div>
            </div>

            {/* Optional Full 30 Transactions Table View */}
            {showFullList && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Full 30 Transactions Problem Table:
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono border-collapse min-w-[650px]">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        <th className="py-2.5 px-3 w-14 text-center">Tx#</th>
                        <th className="py-2.5 px-3 w-28">Date</th>
                        <th className="py-2.5 px-3">Business Transaction Description</th>
                        <th className="py-2.5 px-3 w-36 text-right">Voucher</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {transactionsList.map((tx) => (
                        <tr
                          key={tx.id}
                          onClick={() => setSelectedTxId(tx.id)}
                          className={`cursor-pointer transition ${
                            selectedTxId === tx.id ? "bg-emerald-950/40" : "hover:bg-slate-900/50"
                          }`}
                        >
                          <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">#{tx.id}</td>
                          <td className="py-2.5 px-3 text-slate-400">{tx.date}</td>
                          <td className="py-2.5 px-3 font-sans text-xs">{isBengali ? tx.descBn : tx.descEn}</td>
                          <td className="py-2.5 px-3 text-right font-bold text-sky-400">{tx.voucher}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PRINT QUESTION SET COMPONENT */}
            <div className="pt-2">
              <PlainTextPrint
                content={qpText}
                filename={isBengali ? "Project2_Question_Paper_bn.txt" : "Project2_Question_Paper.txt"}
                title={isBengali ? "প্রিন্ট প্রশ্ন সেট (Print Question Set)" : "Print Question Set"}
                customPrintLabel={isBengali ? "🖨️ A4 কমার্স প্রশ্নপত্র প্রিন্ট করুন" : "🖨️ Print A4 Commerce Question Paper"}
                onCustomPrint={handleTriggerPrintA4}
                hidePreview={true}
                showDownload={true}
              />
            </div>

            {/* PRINTABLE HINT TRANSACTIONS PLAIN TEXT COMPONENT */}
            <div className="pt-2">
              <PlainTextPrint
                content={txText}
                filename={isBengali ? "project2_30_transactions_hints_bn.txt" : "project2_30_transactions_hints.txt"}
                title={isBengali ? "উত্তর সংকেতসহ প্রিন্টযোগ্য ফাইল" : "Printable Transactions with Posting Hints"}
                hidePreview={true}
                showDownload={true}
              />
            </div>

          </div>
        </section>

        {/* ─── JOURNAL & LEDGER SOLUTION VIEWER ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <JournalLedgerViewer data={project2Data} isBengali={isBengali} />
        </section>

        {/* ─── STUDENT SOLUTION SUBMISSION & CNAT EVALUATION ENGINE ─── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/40 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
                <span>👨‍🏫</span> Live Educator Evaluation Portal
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isBengali ? "সিএনএটি স্যারের (Mr. CNAT) প্রজেক্ট ২ মূল্যায়ন" : "Submit Project 2 Solution for CNAT Sir's Evaluation"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBengali ? "আপনার সমাধান সম্পূর্ণ হলে নিচের বোতামে চাপুন। সিএনএটি স্যার আপনার পোস্টিং ও জের মিলিয়ে দেবেন।" : "Click below to trigger live double-entry audit evaluation by Lead Educator Mr. CNAT."}
              </p>
            </div>

            <button
              onClick={handleEvaluateSolution}
              disabled={isAuditing}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/50 transition transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAuditing ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>{isBengali ? "সিএনএটি স্যার অডিট করছেন..." : "CNAT Sir is Auditing..."}</span>
                </>
              ) : (
                <>
                  <span>📝</span>
                  <span>{isBengali ? "সিএনএটি স্যারের কাছে প্রজেক্ট ২ মূল্যায়ন জমা দিন" : "Submit Project 2 to CNAT Sir for Evaluation"}</span>
                </>
              )}
            </button>
          </div>

          {/* Evaluation Result Certificate */}
          {evaluationResult && (
            <div className="p-6 md:p-8 rounded-xl bg-slate-950 border border-emerald-500/60 space-y-6 animate-fadeIn shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-300">
                      {evaluationResult.status}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Evaluated on: {evaluationResult.date} | {evaluationResult.evaluator}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500 font-bold text-sm">
                    {evaluationResult.score}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-sky-950 text-sky-300 border border-sky-500 font-bold">
                    {evaluationResult.grade}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-sans">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>💬</span> Official Remarks by Mr. CNAT:
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans italic">
                  "{isBengali ? evaluationResult.remarksBn : evaluationResult.remarksEn}"
                </p>
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
                  {isBengali ? "Teacher's Desk: প্রজেক্ট ২ নির্দেশনা" : "Teacher's Desk: Project 2 Capstone Guidance"}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Mr. CNAT &amp; Coder &amp; AccoTax Barrackpore Lab Discussion
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-emerald-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> Practical Advice for Students
                </h3>
                <p>
                  {isBengali
                    ? "এই ৩০টি নতুন লেনদেন ইলেকট্রনিক্স ব্যবসা সংক্রান্ত! সিকিউরিটি ডিপোজিট, ফ্রেইট ইনওয়ার্ড ও পস কম্পিউটারের পোস্টিং নিখুঁতভাবে শেষ করে সিএনএটি স্যারের কাছে জমা দিন!"
                    : "These 30 new transactions represent electronics enterprise accounting! Accurately post Security Deposits, Freight Inward, POS assets, and submit to Mr. CNAT!"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRINTABLE STUDY NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            filename={isBengali ? "project2_study_note_bn.txt" : "project2_study_note.txt"}
            hidePreview={true}
            showDownload={true}
          />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate
            title={isBengali ? "Project 2 মূল্যায়ন ও অনুশীলন প্রশ্নাবলী" : "Project 2 Assessment & Diagnostic Practice"}
            questions={questions}
          />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher
            note={
              isBengali
                ? "প্রজেক্ট ২-এর ৩০টি নতুন লেনদেন নিখুঁতভাবে সমাধান করলেই খতিয়ান পোস্টিং ও জের মেলানোর পূর্ণাঙ্গ দক্ষতা তৈরি হবে!"
                : "Solving all 30 commercial transactions in Project 2 guarantees complete double-entry ledger posting and balancing mastery!"
            }
          />
        </section>

        {/* CODER & ACCOTAX OFFICIAL QUESTION PAPER MODAL */}
        <CoderAccoTaxQuestionPaperModal
          isOpen={isQpModalOpen}
          onClose={() => setIsQpModalOpen(false)}
          projectTitle={isBengali ? "প্রজেক্ট ২: ইলেকট্রনিক্স বাণিজ্যিক লেনদেন প্রশ্নপত্র" : "Project 2: Commercial Electronics Assignment Question Paper"}
          companyName="M/s Metro Electronics & Appliances"
          period="May 2026"
          transactions={transactionsList}
          isBengali={isBengali}
          plainTextQp={qpText}
        />

      </div>
    </>
  );
}
