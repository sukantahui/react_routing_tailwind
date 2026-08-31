"use client";

import React, { useEffect, useRef } from "react";
import Teacher from "../../../common/TeacherCNAT";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic6() {
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
            <span>TallyPrime Master Series · Module 1.1 · Topic 7</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            Traditional Classification of Accounts: Personal Accounts, Real Accounts, and Nominal Accounts
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The 3 classical pillars of double-entry ledger categorization.
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
                <p>Traditional accounting categorizes all ledger accounts into Real Accounts (Properties), Personal Accounts (Entities/Persons), and Nominal Accounts (Incomes/Expenses).</p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Dialogue
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <div>
                    <p><strong className="text-emerald-400">Ayan (Lab Student):</strong> <em>"Sir, what is the difference between an Artificial Personal Account and a Representative Personal Account?"</em></p>
                  </div>
                  <div>
                    <p><strong className="text-sky-300">CNAT Sir:</strong> <em>"An Artificial Personal Account is a legal corporate body (e.g. SBI Bank, Tata Motors). A Representative Personal Account represents unpaid/prepaid person groups (e.g. Outstanding Salary, Accrued Rent)!"</em></p>
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
              <span>📌</span> The Classical Three-Tier Account Taxonomy
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
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">1. Real Accounts (Assets)</td>
                      <td className="p-3 border border-slate-800">Tangible (Cash, Building, Stock) & Intangible (Goodwill, Patents, Trademarks).</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Rule: Debit what comes in &rarr; Credit what goes out</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">2. Personal Accounts (Entities)</td>
                      <td className="p-3 border border-slate-800">Natural Persons (Rohit), Artificial Persons (ABC Ltd), Representative (Outstanding Salary).</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Rule: Debit the receiver &rarr; Credit the giver</td>
                    </tr>
                  
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 border border-slate-800 font-bold text-emerald-300">3. Nominal Accounts (P&L)</td>
                      <td className="p-3 border border-slate-800">Expenses (Rent, Wages), Losses (Bad Debts), Incomes (Sales, Interest), Gains (Profit on Sale).</td>
                      <td className="p-3 border border-slate-800 font-mono text-sky-300">Rule: Debit expenses & losses &rarr; Credit incomes & gains</td>
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
              Understanding traditional classification helps you determine the correct voucher type in Tally (Contra for Cash/Bank Real accounts, Payment/Receipt for Personal/Nominal).
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
          <PlainTextPrint content={noteText} filename="topic6_study_note.txt" />
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
