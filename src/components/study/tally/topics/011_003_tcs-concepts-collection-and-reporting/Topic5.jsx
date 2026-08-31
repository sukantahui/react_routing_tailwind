"use client";

import React from "react";

export default function Topic5() {
  return (
    <div className="space-y-8 text-slate-200 leading-relaxed font-sans">
      {/* HERO TITLE CONTAINER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
          <span>📘</span> TallyPrime Master Series · Topic 6
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
          Configuring Stock Items & Customer Ledgers for TCS applicability
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Comprehensive practical guide and technical breakdown under Tax Collected at Source (TCS): Collection, Configuration, Sales & Form 27EQ.
        </p>
      </div>

      {/* CORE CONCEPTUAL BREAKDOWN */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-sky-400 flex items-center gap-2">
          <span>💡</span> Core Concept & Practical Workflow
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Understanding <strong>Configuring Stock Items & Customer Ledgers for TCS applicability</strong> is essential for maintaining accurate business books, ensuring statutory tax compliance, and operating TallyPrime efficiently.
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Key Practical Takeaway</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Always verify source vouchers, party registration details, and statutory tax parameters before saving master records or recording financial vouchers in TallyPrime.
          </p>
        </div>
      </section>

      {/* STEP-BY-STEP OPERATIONAL GUIDE */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2">
          <span>⚙️</span> Step-by-Step TallyPrime Execution
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
          <li>Navigate to <strong>Gateway of Tally</strong> using keyboard shortcuts or Go To (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">Alt+G</kbd>).</li>
          <li>Select the required option under <strong>Masters</strong> or <strong>Vouchers</strong> menu.</li>
          <li>Verify configuration parameters (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F11</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F12</kbd>) before confirming entries.</li>
          <li>Save the record using <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">Ctrl+A</kbd> and verify the generated Day Book or Financial Report.</li>
        </ol>
      </section>
    </div>
  );
}
