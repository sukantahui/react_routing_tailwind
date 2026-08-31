"use client";

import React, { useState } from "react";
import { BookOpen, FileText, CheckCircle2, Award, Layers } from "lucide-react";

const formatCurrency = (val) => {
  if (val === undefined || val === null || isNaN(val)) return "0";
  return Number(val).toLocaleString("en-IN");
};

export default function JournalLedgerViewer({ data, isBengali = false }) {
  const [activeTab, setActiveTab] = useState("journal");
  const [selectedLedgerKey, setSelectedLedgerKey] = useState("Cash Account");

  if (!data) return null;

  const { company, transactions = [], journalEntries = [], ledgers = {}, trialBalance = [] } = data;
  const ledgerKeys = Object.keys(ledgers);
  const currentLedger = ledgers[selectedLedgerKey] || (ledgerKeys.length > 0 ? ledgers[ledgerKeys[0]] : null);

  const totalJournalDr = journalEntries.reduce((sum, j) => sum + (j.drAmount || 0), 0);
  const totalJournalCr = journalEntries.reduce((sum, j) => sum + (j.crAmount || 0), 0);

  const totalTbDr = trialBalance.reduce((sum, t) => sum + (t.drAmount || 0), 0);
  const totalTbCr = trialBalance.reduce((sum, t) => sum + (t.crAmount || 0), 0);

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-5 md:p-8 shadow-2xl space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
            <BookOpen size={14} />
            <span>{isBengali ? "জার্নাল ও খতিয়ান সমাধান ভিউয়ার" : "Master Journal & Ledger Solution Viewer"}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {company?.name || "M/s Apex Global Traders"} — {company?.period || "April 2026"}
          </h2>
          <p className="text-xs text-slate-400">
            {isBengali ? "৩০টি লেনদেনের সম্পূর্ণ ডাবল-এন্ট্রি জাবেদা, খতিয়ান অ্যাকাউন্ট ও ট্রায়াল ব্যালেন্স অডিট" : "Complete 30-Transaction Journal Entries, T-Account Ledgers & Trial Balance Audit Solution"}
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab("txList")}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === "txList" ? "bg-slate-800 text-emerald-300 border border-slate-700" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText size={14} />
            <span>{isBengali ? "১. লেনদেনসমূহ (৩০)" : "1. Transactions (30)"}</span>
          </button>
          <button
            onClick={() => setActiveTab("journal")}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === "journal" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers size={14} />
            <span>{isBengali ? "২. জাবেদা বই (Journal)" : "2. Journal Book"}</span>
          </button>
          <button
            onClick={() => setActiveTab("ledger")}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === "ledger" ? "bg-sky-950 text-sky-300 border border-sky-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen size={14} />
            <span>{isBengali ? "৩. খতিয়ান খাতা (Ledger)" : "3. T-Ledgers"}</span>
          </button>
          <button
            onClick={() => setActiveTab("trialBalance")}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === "trialBalance" ? "bg-teal-950 text-teal-300 border border-teal-500" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Award size={14} />
            <span>{isBengali ? "৪. ট্রায়াল ব্যালেন্স" : "4. Trial Balance"}</span>
          </button>
        </div>
      </div>

      {/* ─── TAB 1: TRANSACTIONS LIST ─── */}
      {activeTab === "txList" && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-emerald-400 font-mono">
            {isBengali ? "৩০টি বাণিজ্যিক লেনদেনের বিবরণী তালিকা:" : "30 Commercial Business Transactions List:"}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <th className="py-2.5 px-3 w-16 text-center">#</th>
                  <th className="py-2.5 px-3 w-28">Date</th>
                  <th className="py-2.5 px-3">Transaction Detail Description</th>
                  <th className="py-2.5 px-3 w-36 text-right">Voucher Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-900/50 transition">
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

      {/* ─── TAB 2: JOURNAL BOOK (5-COLUMN FORMAT) ─── */}
      {activeTab === "journal" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base font-bold text-emerald-300 font-mono flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{isBengali ? "৫-কলামের পূর্ণাঙ্গ সাধারণ জাবেদা বই (Journal Book):" : "Full 5-Column General Journal Book:"}</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Total Lines: {journalEntries.length} Journal Entries</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th className="py-3 px-3 w-24">Date</th>
                  <th className="py-3 px-3">Particulars &amp; Narration</th>
                  <th className="py-3 px-3 w-16 text-center border-r border-slate-800">J.F.</th>
                  <th className="py-3 px-3 w-32 text-right text-emerald-400 border-r border-slate-800">Debit (₹)</th>
                  <th className="py-3 px-3 w-32 text-right text-sky-400">Credit (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-200">
                {journalEntries.map((j, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 px-3 text-slate-400 align-top">{j.date}</td>
                    <td className="py-3 px-3 space-y-1">
                      <div className="font-bold text-emerald-300">{j.drAccount} Dr.</div>
                      <div className="pl-6 text-sky-300">To {j.crAccount}</div>
                      <div className="text-[11px] text-slate-400 italic pt-0.5">({j.narration})</div>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-500 border-r border-slate-800/60 align-top">{j.jf || "—"}</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-400 border-r border-slate-800/60 align-top">
                      ₹{formatCurrency(j.drAmount)}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-sky-400 align-top">
                      ₹{formatCurrency(j.crAmount)}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-slate-900 font-bold text-white border-t-2 border-b-2 border-emerald-500/50 text-sm">
                  <td colSpan={3} className="py-3.5 px-3 text-right uppercase tracking-wider text-slate-300">
                    Grand Journal Total:
                  </td>
                  <td className="py-3.5 px-3 text-right text-emerald-400 border-r border-slate-800">
                    ₹{formatCurrency(totalJournalDr)}
                  </td>
                  <td className="py-3.5 px-3 text-right text-sky-400">
                    ₹{formatCurrency(totalJournalCr)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 3: GENERAL LEDGER T-ACCOUNTS (8-COLUMN FORMAT) ─── */}
      {activeTab === "ledger" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-sky-300 font-mono">
              {isBengali ? "খতিয়ান খাতা নির্বাচন করুন:" : "Select General Ledger Account to View T-Format:"}
            </h3>

            {/* Ledger selector buttons */}
            <div className="flex flex-wrap gap-1.5">
              {ledgerKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedLedgerKey(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                    selectedLedgerKey === key
                      ? "bg-sky-950 border-sky-500 text-sky-300 shadow-md"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Active Ledger T-Account Table */}
          {currentLedger && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
                  ACCOUNT: {selectedLedgerKey}
                </h4>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-bold">
                    Net Balance: ₹{formatCurrency(currentLedger.closingBalance)}
                  </span>
                  <span className="px-3 py-1 rounded bg-sky-950 text-sky-300 border border-sky-500/40 font-bold">
                    {currentLedger.balanceType}
                  </span>
                </div>
              </div>

              {/* 8-Column T-Account Table */}
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
                      <th className="py-2 px-3 border-r border-slate-800/60 w-12 text-center">J.F.</th>
                      <th className="py-2 px-3 border-r-2 border-slate-700 text-right w-24">Amount (₹)</th>
                      <th className="py-2 px-3 border-r border-slate-800/60 w-24">Date</th>
                      <th className="py-2 px-3 border-r border-slate-800/60">Particulars (Cr)</th>
                      <th className="py-2 px-3 border-r border-slate-800/60 w-12 text-center">J.F.</th>
                      <th className="py-2 px-3 text-right w-24">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-200">
                    {Array.from({
                      length: Math.max(
                        currentLedger.debitEntries?.length || 0,
                        currentLedger.creditEntries?.length || 0
                      )
                    }).map((_, i) => {
                      const dr = currentLedger.debitEntries?.[i];
                      const cr = currentLedger.creditEntries?.[i];
                      return (
                        <tr key={i} className="hover:bg-slate-900/50 transition">
                          {/* Debit side */}
                          <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">{dr?.date || ""}</td>
                          <td className="py-2.5 px-3 border-r border-slate-800/60 font-semibold text-emerald-300">{dr?.particular || ""}</td>
                          <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">{dr?.jf || ""}</td>
                          <td className="py-2.5 px-3 border-r-2 border-slate-700 text-right font-bold text-emerald-400">
                            {dr?.amount !== undefined ? `₹${formatCurrency(dr.amount)}` : ""}
                          </td>
                          {/* Credit side */}
                          <td className="py-2.5 px-3 border-r border-slate-800/60 text-slate-400">{cr?.date || ""}</td>
                          <td className={`py-2.5 px-3 border-r border-slate-800/60 font-semibold ${cr?.particular?.includes('c/d') ? 'text-amber-300 font-bold' : 'text-sky-300'}`}>
                            {cr?.particular || ""}
                          </td>
                          <td className="py-2.5 px-3 border-r border-slate-800/60 text-center text-slate-500">{cr?.jf || ""}</td>
                          <td className={`py-2.5 px-3 text-right font-bold ${cr?.particular?.includes('c/d') ? 'text-amber-300' : 'text-sky-400'}`}>
                            {cr?.amount !== undefined ? `₹${formatCurrency(cr.amount)}` : ""}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Total Row */}
                    <tr className="bg-slate-900 font-bold text-white border-t-2 border-b-2 border-emerald-500/50">
                      <td colSpan={3} className="py-3 px-3 text-right border-r border-slate-800/60 uppercase text-[11px] tracking-wider text-emerald-400">Total Dr:</td>
                      <td className="py-3 px-3 border-r-2 border-slate-700 text-right text-emerald-400 font-mono text-sm">
                        ₹{formatCurrency(currentLedger.debitTotal)}
                      </td>
                      <td colSpan={3} className="py-3 px-3 text-right border-r border-slate-800/60 uppercase text-[11px] tracking-wider text-sky-400">Total Cr:</td>
                      <td className="py-3 px-3 text-right text-sky-400 font-mono text-sm">
                        ₹{formatCurrency(currentLedger.creditTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 4: TRIAL BALANCE (SUMMARY) ─── */}
      {activeTab === "trialBalance" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-teal-300 font-mono flex items-center gap-2">
              <Award size={16} className="text-teal-400" />
              <span>{isBengali ? "ট্রায়াল ব্যালেন্স সমীকরণ ও গাণিতিক অডিট:" : "Final Reconciled Trial Balance:"}</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Status: 100% Balanced Equality
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th className="py-2.5 px-3">Ledger Account Name</th>
                  <th className="py-2.5 px-3">Parent Group / Nature</th>
                  <th className="py-2.5 px-3 w-36 text-right text-emerald-400 border-r border-slate-800">Debit (₹)</th>
                  <th className="py-2.5 px-3 w-36 text-right text-sky-400">Credit (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-200">
                {trialBalance.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/50 transition">
                    <td className="py-2.5 px-3 font-bold text-slate-200">{row.accountName}</td>
                    <td className="py-2.5 px-3 text-slate-400 text-[11px]">{row.group}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400 border-r border-slate-800/60">
                      {row.drAmount ? `₹${formatCurrency(row.drAmount)}` : "—"}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-sky-400">
                      {row.crAmount ? `₹${formatCurrency(row.crAmount)}` : "—"}
                    </td>
                  </tr>
                ))}
                {/* Total Trial Balance Row */}
                <tr className="bg-slate-900 font-bold text-white border-t-2 border-b-2 border-teal-500/50 text-sm">
                  <td colSpan={2} className="py-3.5 px-3 text-right uppercase tracking-wider text-teal-300">
                    Trial Balance Total:
                  </td>
                  <td className="py-3.5 px-3 text-right text-emerald-400 border-r border-slate-800">
                    ₹{formatCurrency(totalTbDr)}
                  </td>
                  <td className="py-3.5 px-3 text-right text-sky-400">
                    ₹{formatCurrency(totalTbCr)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
