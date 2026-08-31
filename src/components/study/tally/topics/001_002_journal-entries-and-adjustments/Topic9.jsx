"use client";

import React from "react";

export default function Topic9() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed font-sans min-h-screen bg-slate-950 p-4 sm:p-8">
      {/* HERO TITLE CONTAINER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
          <span>📝</span> Journal Entry Practice Worksheet · Topic 10
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
          Depreciation on fixed assets: Purpose, straight-line concept, and journal entry
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Comprehensive practical worksheet featuring transaction problems, step-by-step debit/credit entry breakdowns, and TallyPrime voucher entry mappings.
        </p>
      </div>

      {/* CONCEPTUAL SUMMARY & DEBIT/CREDIT RULES */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2">
          <span>⚖️</span> Double-Entry Journalizing Principle
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          In commercial bookkeeping, every business transaction must be analyzed into its <strong>Debit (Dr)</strong> and <strong>Credit (Cr)</strong> aspects before recording in the Journal Book.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-1">
            <span className="font-bold text-emerald-400">DEBIT (Dr) RULE:</span>
            <p className="text-slate-300">Debit the Receiver | Debit what comes in | Debit all Expenses &amp; Assets Increase.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/20 space-y-1">
            <span className="font-bold text-sky-400">CREDIT (Cr) RULE:</span>
            <p className="text-slate-300">Credit the Giver | Credit what goes out | Credit all Incomes &amp; Liabilities Increase.</p>
          </div>
        </div>
      </section>

      {/* SAMPLE JOURNAL TRANSACTION PRACTICE TABLE */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-sky-400 flex items-center gap-2">
          <span>📋</span> Solved Commercial Journal Entries
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-800">
            <thead>
              <tr className="bg-slate-800 text-slate-200">
                <th className="p-3 border border-slate-700">Date</th>
                <th className="p-3 border border-slate-700">Particulars (Journal Entry &amp; Narration)</th>
                <th className="p-3 border border-slate-700 font-mono">L.F.</th>
                <th className="p-3 border border-slate-700 font-mono text-emerald-400">Debit (₹)</th>
                <th className="p-3 border border-slate-700 font-mono text-sky-400">Credit (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 border border-slate-800 font-sans">01-Apr-2026</td>
                <td className="p-3 border border-slate-800 font-sans space-y-1">
                  <div className="font-bold text-emerald-300">Cash A/c .................. Dr.</div>
                  <div className="pl-6 text-sky-300">To Capital A/c</div>
                  <div className="text-[11px] text-slate-400 italic">(Being capital introduced in cash by owner)</div>
                </td>
                <td className="p-3 border border-slate-800">1</td>
                <td className="p-3 border border-slate-800 text-emerald-400 font-bold">2,50,000</td>
                <td className="p-3 border border-slate-800 text-sky-400 font-bold">2,50,000</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 border border-slate-800 font-sans">05-Apr-2026</td>
                <td className="p-3 border border-slate-800 font-sans space-y-1">
                  <div className="font-bold text-emerald-300">Purchase A/c .................. Dr.</div>
                  <div className="pl-6 text-sky-300">To HP India Ltd A/c</div>
                  <div className="text-[11px] text-slate-400 italic">(Being goods purchased on credit from HP India)</div>
                </td>
                <td className="p-3 border border-slate-800">2</td>
                <td className="p-3 border border-slate-800 text-emerald-400 font-bold">75,000</td>
                <td className="p-3 border border-slate-800 text-sky-400 font-bold">75,000</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 border border-slate-800 font-sans">10-Apr-2026</td>
                <td className="p-3 border border-slate-800 font-sans space-y-1">
                  <div className="font-bold text-emerald-300">Rent Expense A/c .................. Dr.</div>
                  <div className="pl-6 text-sky-300">To Bank A/c</div>
                  <div className="text-[11px] text-slate-400 italic">(Being office rent paid via cheque/NEFT)</div>
                </td>
                <td className="p-3 border border-slate-800">3</td>
                <td className="p-3 border border-slate-800 text-emerald-400 font-bold">18,000</td>
                <td className="p-3 border border-slate-800 text-sky-400 font-bold">18,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TALLYPRIME VOUCHER MAPPING */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-teal-400 flex items-center gap-2">
          <span>🖥️</span> TallyPrime Voucher Execution Guide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400">Receipt Voucher (F6):</span>
            <p className="text-slate-300">Record cash/bank capital receipts, customer collections, and income entries.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400">Payment Voucher (F5):</span>
            <p className="text-slate-300">Record cash/bank expense payments, supplier settlements, and loan repayments.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-purple-400">Journal Voucher (F7):</span>
            <p className="text-slate-300">Record non-cash adjustments, depreciation, credit asset purchases, and year-end entries.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
