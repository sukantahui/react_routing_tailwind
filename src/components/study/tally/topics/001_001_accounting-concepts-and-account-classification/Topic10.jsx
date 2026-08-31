"use client";

import React, { useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic10() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
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
        
        {/* HERO HEADER */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>📊</span>
            <span>TallyPrime Master Series · Module 1.1 · Topic 11</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            Practical Transaction Illustrations: Cash Purchase, Credit Purchase, Cash Sale, Credit Sale, Expense Paid, Income Received, Drawings, and Capital Introduced
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive practical case studies covering all basic commercial vouchers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">Course Code: TALLY-PRO-101</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 font-semibold">Center: CNAT Academy (Barrackpore Lab)</span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-400 font-semibold">Educator: Mr. CNAT</span>
          </div>
        </header>

        {/* TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-300">
                  Teacher's Desk: Commercial Intuition &amp; Lab Discussion
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
                <p>Practical illustrations detailing narration, debit/credit entries, and corresponding TallyPrime voucher types for standard business scenarios.</p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Sohini (Lab Student):</strong> <em>"Sir, can we see a side-by-side comparison of Cash Sales vs Credit Sales in TallyPrime?"</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>"Yes! Cash Sale: Debit Cash A/c / Credit Sales A/c (Voucher F8 or F6). Credit Sale: Debit Customer Ledger (Sundry Debtor) / Credit Sales A/c (Voucher F8 Sales Invoice)!"</em></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CONCEPTUAL BREAKDOWN TABLE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📌</span> Master Practical Commercial Transaction Guide
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-800">
                <thead>
                  <tr className="bg-slate-800/90 text-slate-200">
                    <th className="p-3 border border-slate-700">Category / Concept</th>
                    <th className="p-3 border border-slate-700 text-emerald-400">Technical Breakdown &amp; Description</th>
                    <th className="p-3 border border-slate-700 text-sky-400">TallyPrime Software Mapping</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">1. Capital Introduced ₹5,00,000 Cash</td>
                      <td className="p-3 border border-slate-800">Debit Cash A/c ₹5,00,000 | Credit Capital A/c ₹5,00,000</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Tally Voucher: F6 Receipt</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">2. Cash Purchase Goods ₹40,000</td>
                      <td className="p-3 border border-slate-800">Debit Purchase A/c ₹40,000 | Credit Cash A/c ₹40,000</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Tally Voucher: F9 Purchase</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">3. Credit Purchase from HP Ltd ₹80,000</td>
                      <td className="p-3 border border-slate-800">Debit Purchase A/c ₹80,000 | Credit HP Ltd A/c ₹80,000</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Tally Voucher: F9 Purchase</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">4. Credit Sale to Sohini Traders ₹60,000</td>
                      <td className="p-3 border border-slate-800">Debit Sohini Traders A/c ₹60,000 | Credit Sales A/c ₹60,000</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Tally Voucher: F8 Sales</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">5. Paid Office Rent ₹15,000 Cheque</td>
                      <td className="p-3 border border-slate-800">Debit Rent Expense A/c ₹15,000 | Credit HDFC Bank A/c ₹15,000</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Tally Voucher: F5 Payment</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">6. Received Commission ₹8,000 Cash</td>
                      <td className="p-3 border border-slate-800">Debit Cash A/c ₹8,000 | Credit Commission Income A/c ₹8,000</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Tally Voucher: F6 Receipt</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">7. Proprietor Personal Cash Drawing ₹10,000</td>
                      <td className="p-3 border border-slate-800">Debit Drawings A/c ₹10,000 | Credit Cash A/c ₹10,000</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Tally Voucher: F5 Payment</td>
                    </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TALLYPRIME OPERATIONAL EXECUTION GUIDE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-teal-400 flex items-center gap-2">
              <span>⚙️</span> TallyPrime Software Integration Guide
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Practice entering these 7 foundational transactions in TallyPrime to see how Day Book, Profit & Loss, and Balance Sheet update dynamically.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300 pt-2">
              <li>Open <strong>Gateway of Tally</strong> using <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">Alt+G</kbd> (Go To) or main dashboard.</li>
              <li>Select <strong>Masters &gt; Create &gt; Ledger</strong> to set up classified account ledgers under appropriate parent groups.</li>
              <li>Select <strong>Vouchers</strong> (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F5 Payment</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F6 Receipt</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F7 Journal</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F8 Sales</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F9 Purchase</kbd>).</li>
              <li>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">Ctrl+A</kbd> to accept and save voucher entry.</li>
            </ol>
          </div>
        </section>

        {/* PRINTABLE STUDY NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} filename="topic10_study_note.txt" />
        </section>

        {/* DIAGNOSTIC PRACTICE ASSESSMENT */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate title="Topic Assessment & Diagnostic Practice" questions={questions} />
        </section>

        {/* TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher note="Mastering double-entry account classification with Mr. CNAT is the secret to error-free bookkeeping in TallyPrime. Every ledger created under the right group ensures flawless Balance Sheet and P&L generation!" />
        </section>

      </div>
    </>
  );
}
