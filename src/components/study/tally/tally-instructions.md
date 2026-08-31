================================================================================
CODER & ACCOTAX - MASTER INSTRUCTIONS FOR TALLYPRIME & ACCOUNTING TUTORIAL GENERATION
Repository: react_routing_tailwind
Subject: TallyPrime & Commercial Accounting (Non-Accounting to Advanced Pro Edition)
Educator: Mr. CNAT (Barrackpore, West Bengal, India)
Target Environment: React 19 + Vite + Tailwind CSS + Master Roadmap Architecture
Special Features: Friendly Teacher Mr. CNAT's Desk, Commercial Accounting Dialogues,
                  Double-Entry Invariants, TallyPrime Keyboard Execution,
                  GST / e-Invoice / e-Way Bill Compliance, POS, BRS, Manufacturing BOM,
                  Payroll (PF/ESI/PT), TDS/TCS, Edit Log Audit & Printable Notes
================================================================================

CRITICAL DIRECTIVE: ZERO-TOLERANCE FOR GENERIC BOILERPLATE OR PLACEHOLDER FLUFF
--------------------------------------------------------------------------------
Every generated topic MUST be rich, deeply educational, highly specific, and practical.
NEVER use generic placeholder sentences like "understanding [Topic] is critical for accounting...".
Every single paragraph, accounting equation, transaction voucher table, Tally execution shortcut,
statutory tax rule, pitfall comparison, FAQ question, and plain-text note MUST be 100% tailored to
the exact topic, explaining the actual commercial double-entry accounting mechanics, statutory tax
laws (GST, TDS, TCS, PF, ESI, Income Tax), F11/F12 configurations, and real-world business scenarios.

NOTE FOR NON-ACCOUNTING STUDENTS:
TallyPrime is NOT a computer programming language (like C, Java, or Python). It is a business
accounting, inventory, and Enterprise Resource Planning (ERP) software. Therefore, every topic MUST
first establish the underlying accounting principle, double-entry rules, or business document logic
BEFORE walking through the step-by-step TallyPrime software navigation.


================================================================================
1. DIRECTORY STRUCTURE & FILE NAMING RULES
================================================================================
All topic folders must reside under:
`src/components/study/tally/topics/`

Folder names MUST strictly match the module slug defined in `tally-prime-roadmap.json`:
Format: `[3-digit-segment]_[3-digit-module]_[descriptive-kebab-slug]`
Examples:
  * `001_001_accounting-concepts-and-account-classification`
  * `001_002_journal-entries-and-adjustments`
  * `001_003_ledger-posting-and-balancing`
  * `001_004_trial-balance-and-error-detection`
  * `001_005_final-accounts-trading-profit-loss-balance-sheet`
  * `001_006_bank-reconciliation-statement`
  * `001_007_rectification-of-errors-and-adjustments`
  * `001_008_complete-accounting-cycle-and-practice-set`
  * `002_001_tallyprime-interface-company-creation`
  * `002_002_tallyprime-features-and-configuration`
  * `002_003_data-security-backup-restore-and-user-access`
  * `003_001_groups-and-chart-of-accounts`
  * `003_002_ledger-creation-and-opening-balances`
  * `003_003_bill-wise-interest-and-cost-centre-foundations`
  * `004_001_voucher-types-and-accounting-vouchers`
  * `004_002_sales-purchase-credit-debit-notes`
  * `004_003_orders-receipt-note-delivery-note`
  * `005_001_stock-groups-categories-items-units`
  * `005_002_godowns-batches-expiry-and-stock-transfer`
  * `005_003_stock-valuation-reorder-and-profitability`
  * `006_001_gst-concepts-registration-and-tax-structure`
  * `006_002_gst-configuration-purchase-sales-returns`
  * `006_003_gst-returns-reconciliation-and-exception-management`
  * `006_004_einvoice-and-eway-bill-workflow`
  * `007_001_banking-cheques-payment-advice`
  * `007_002_bank-reconciliation-and-imported-bank-statements`
  * `007_003_receivables-payables-ageing-and-interest`
  * `008_001_cost-centres-categories-and-profitability`
  * `008_002_interest-and-multi-currency-accounting`
  * `008_003_depreciation-provisions-accruals-and-year-end-adjustments`
  * `009_001_manufacturing-bom-production-and-consumption`
  * `009_002_job-work-material-in-out-and-tracking`
  * `009_003_job-costing-and-project-profitability`
  * `010_001-payroll-employee-groups-pay-heads`
  * `010_002_attendance-salary-processing-payslip`
  * `010_003_payroll-statutory-deductions-and-compliance`
  * `011_001_tds-concepts-configuration-and-deduction`
  * `011_002_tds-payment-returns-certificates-and-reconciliation`
  * `011_003_tcs-concepts-collection-and-reporting`
  * `012_001_trial-balance-profit-loss-balance-sheet-cash-flow`
  * `012_002_inventory-reports-ageing-movement-and-profitability`
  * `012_003_mis-ratios-working-capital-and-management-analysis`
  * `013_001_invoice-printing-and-document-customization`
  * `013_002_export-pdf-excel-xml-json-csv-and-email`
  * `013_003_tallynet-remote-access-control-centre-and-connected-workflows`
  * `014_001_data-verification-exception-and-error-analysis`
  * `014_002_audit-trail-edit-log-and-user-controls`
  * `014_003-data-management-migration-import-export-and-recovery`
  * `015_001_month-end-closing-checklist`
  * `015_002_year-end-closing-final-accounts-and-audit-preparation`
  * `015_003_professional-accountant-daily-monthly-annual-workflow`
  * `016_001_complete-trading-company-capstone`
  * `016_002_complete-manufacturing-and-job-work-capstone`
  * `016_003_complete-service-company-payroll-tds-capstone`
  * `016_004_master-accountant-final-assessment`

For standard topic index `N` (0, 1, 2, ...):
1. Create `Topic[N].jsx` directly inside the module slug folder.
2. Create a subfolder named `topic[N]_files/` for all supporting files belonging specifically to that topic.
3. The `topic[N]_files/` folder MUST use the exact topic index `N` from the topic filename. Do not place supporting files in another topic's folder.
4. Create the following standard files inside `topic[N]_files/`:
   - `topic[N]_questions.js` (Structured Q&A array with MINIMUM 25 and MAXIMUM 30 technical MCQs & transaction problems)
   - `topic[N]_note.txt` (Comprehensive ASCII printable study note with accounting rules, shortcuts, tax rates & voucher flowcharts)
5. SPECIAL JOURNAL-ENTRY DATASET RULE:
   - If the topic is related to Journal, Journal Entries, Journalizing Transactions, or practical journal-entry preparation, the agent MUST create:
     `topic[N]_journal_entries.json`
   - This file MUST be placed inside the same `topic[N]_files/` folder.
   - The JSON file MUST contain a set of journal-entry practice transactions specifically related to that topic.
   - Each transaction MUST include, where applicable:
     * a unique transaction ID
     * transaction date or sequence
     * the transaction description
     * the correct journal entry
     * account name(s)
     * debit amount(s)
     * credit amount(s)
     * a clear accounting explanation
     * a proper narration
   - The journal entries MUST be derived from the accounting concepts taught in that specific topic and MUST NOT be generic or unrelated examples.
   - The dataset SHOULD contain approximately 25-30 journal-entry transactions for a complete practice set unless the topic's scope clearly requires fewer.
   - The answer must be included in the JSON so the application can present the transaction first and reveal/check the correct journal entry afterward.
   - Compound transactions MUST be included when they are relevant to the topic.
   - Every journal entry MUST satisfy the fundamental double-entry invariant:
     Total Debit = Total Credit.
   - Narrations MUST describe the actual transaction and should follow conventional accounting language beginning with "Being..." where appropriate.
6. Do NOT create `topic[N]_journal_entries.json` for unrelated topics merely to satisfy a file-count requirement. Create it whenever the topic is genuinely a Journal / Journal Entries topic or when the topic explicitly requires journal-entry practice.
7. When a topic is a Journal topic, the presence of `topic[N]_journal_entries.json` is MANDATORY, not optional.


================================================================================
2. FAQ / MCQ SPECIFICATION RULES (MINIMUM 25 TO MAXIMUM 30 QUESTIONS PER TOPIC)
================================================================================
Every single `topic[N]_questions.js` file MUST export an array containing between
25 and 30 exhaustive, technically rigorous Multiple-Choice Questions (MCQs) and accounting scenarios.

Question Quality Guidelines:
1. Exact Schema:
   `{ id: number, question: string, options: string[], answer: string, explanation: string }`
2. Core Categories to Cover in Each Topic's 25-30 Questions:
   • 5 Questions on Core Accounting Invariants & Double-Entry Principles (Debit/Credit, Account Classification, Golden Rules, Matching Concept).
   • 5 Questions on TallyPrime Master & Feature Configurations (F11 options, F12 preferences, Grouping rules, Ledger parameters).
   • 5 Questions on Voucher Selection & Transaction Execution (Contra, Payment, Receipt, Journal, Sales, Purchase, Credit/Debit Notes, POS).
   • 5 Questions on Statutory Compliance & Tax Invariants (CGST/SGST/IGST, HSN/SAC, ITC eligibility, RCM, e-Invoice IRN, e-Way Bill, TDS/TCS thresholds, PF/ESI statutory rules).
   • 5-10 Questions on Report Interpretation, Exception Handling, Audit Trail / Edit Log, BRS reconciliation, and Real-World Commercial Pitfalls.
3. Zero Trivial Questions: Every option must be realistic, and the explanation must cite specific accounting rules, section codes, or TallyPrime software paths.


================================================================================
3. THE 4 MANDATORY CONTENT PILLARS FOR NON-PROGRAMMING ACCOUNTING TUTORIALS
================================================================================
Every topic generated MUST thoroughly satisfy these 4 technical content pillars:

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 1: FRIENDLY TEACHER'S DESK & CLASSROOM LAB DISCUSSIONS                 │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Educator Mr. CNAT's intuitive commercial analogies and real-world        │
│   business metaphors (e.g. Barrackpore & Kolkata trading firms).              │
│ • Classroom lab dialogue featuring Barrackpore lab students (Swadeep, Tuhina, │
│   Abhronila, Debangshu, Sohini, Sneha) asking practical bookkeeping and Tally questions.     │
│ • Clear mental models explaining the WHY behind double-entry rules before     │
│   showing software menus.                                                     │
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 2: DOUBLE-ENTRY ACCOUNTING & STATUTORY RULES (UNDER THE HOOD)          │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Debit and Credit logic breakdown (Assets, Liabilities, Income, Expenses).  │
│   Statutory tax mechanics: GST Place of Supply rules, Input Tax Credit set-off│
│   hierarchy, TDS Section thresholds, PF/ESI rate computation.                  │
│ • Financial statement flow: How transactions affect Trial Balance, P&L, and   │
│   Balance Sheet balance equity.                                               │
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 3: STEP-BY-STEP TALLYPRIME SOFTWARE EXECUTION & KEYBOARD SHORTCUTS     │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Exact navigation paths: Gateway of Tally -> Create -> Ledger / Voucher.     │
│   Keyboard shortcuts: Alt+G (Go To), F11 (Features), F12 (Config),            │
│   F4-F9 (Voucher Shortcuts), Ctrl+A (Accept), Alt+P (Print), Alt+E (Export).  │
│ • Clear step-by-step operational steps with screen field configurations.      │
└───────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────┐
│ PILLAR 4: REAL-WORLD COMMERCIAL USE CASES, AUDIT TRAPS & REMEDIATION          │
├───────────────────────────────────────────────────────────────────────────────┤
│ • Negative Cash, Negative Stock, Un-reconciled Bank items, and Invalid GSTIN  │
│   exception diagnostics.                                                      │
│ • MCA Edit Log / Audit Trail scrutiny and common bookkeeping error fixes.    │
│   Practical commercial business scenarios for Trading, Service & Factory.     │
└───────────────────────────────────────────────────────────────────────────────┘


================================================================================
4. GOLD STANDARD `Topic[N].jsx` CODE BLUEPRINT
================================================================================
```jsx
import React, { useEffect, useRef } from "react";
import Teacher from "../../../../../common/TeacherCNAT";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic[N]_files/topic[N]_questions";
import noteText from "./topic[N]_files/topic[N]_note.txt?raw";

export default function Topic[N]() {
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
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>📊</span>
            <span>TallyPrime Master Series · Topic [N]</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 tracking-tight leading-tight">
            [Precise Topic Title]
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            [Summary of accounting principles, statutory rules, and TallyPrime software execution.]
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Course Code: TALLY-PRO-900</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-teal-400">Mentor: Mr. CNAT</span>
          </div>
        </header>

        {/* SECTION 2: FRIENDLY TEACHER'S DESK & CLASSROOM DIALOGUE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-300">
                  Teacher's Desk: [Commercial Intuition]
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Mr. CNAT &amp; Barrackpore Accounting Lab Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Metaphor */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-emerald-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> Business Metaphor
                </h3>
                <p>[Real-world commercial analogy explaining the business transaction or tax rule...]</p>
              </div>

              {/* Classroom Dialogue */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Classroom Lab Dialogue
                </h3>
                <div className="space-y-2 text-xs sm:text-sm font-sans border-l-2 border-emerald-500/40 pl-4 py-1">
                  <p><strong className="text-emerald-400">Student (Swadeep):</strong> <em>"[Question about bookkeeping or Tally navigation...]"</em></p>
                  <p><strong className="text-sky-300">CNAT Sir:</strong> <em>"[Clear explanation citing debit/credit rules and Tally menu path...]"</em></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: STEP-BY-STEP TALLYPRIME OPERATIONAL WORKFLOW */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>⚙️</span> TallyPrime Software Execution Steps
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-slate-300 text-sm sm:text-base">
              <li><strong>Gateway Navigation:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">Alt+G</kbd> (Go To) or navigate to <strong>Gateway of Tally &gt; [Menu Path]</strong>.</li>
              <li><strong>Master / Voucher Configuration:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">F12</kbd> to configure specific fields.</li>
              <li><strong>Data Entry &amp; Tax Calculation:</strong> Enter mandatory commercial parameters and inspect tax break-up (<kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">Alt+A</kbd>).</li>
              <li><strong>Save &amp; Verify:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs">Ctrl+A</kbd> to accept voucher and inspect in Day Book or Balance Sheet.</li>
            </ol>
          </div>
        </section>

        {/* SECTION 4: PRINTABLE PLAIN-TEXT STUDY NOTE */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint content={noteText} filename="topic[N]_study_note.txt" />
        </section>

        {/* SECTION 5: FAQ & PRACTICE MCQS */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <FAQTemplate title="Topic Practice & Diagnostic Assessment" questions={questions} />
        </section>

        {/* SECTION 6: TEACHER PROFILE CARD */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto">
          <Teacher note="Mastering commercial accounting in TallyPrime requires linking software clicks to double-entry principles. Practice every transaction until debit and credit become second nature!" />
        </section>

      </div>
    </>
  );
}
```


================================================================================
5. PRINTABLE NOTE STANDARDS (`topic[N]_note.txt`)
================================================================================
1. Must be pure ASCII text formatted cleanly with headers, double borders (`===`), single borders (`---`), and ASCII tables.
2. Must contain:
   • Executive Summary & Core Accounting Invariants.
   • Complete Step-by-Step TallyPrime Gateway Navigation & Shortcut Keys.
   • Double-Entry Debit / Credit Ledger Flow Diagram (ASCII format).
   • Statutory Tax Rules & Rate Matrix (GST, TDS, TCS, PF/ESI where applicable).
   • Audit Scrutiny & Common Pitfall Avoidance Checklist.
