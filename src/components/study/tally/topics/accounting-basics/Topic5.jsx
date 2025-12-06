import React, { Component } from "react";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200 leading-relaxed">

        {/* ============================================================
            1. INTRODUCTION
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300">
            Ledgers, Journal & Trial Balance (Concept)
          </h2>

          <p className="mt-2 text-base text-slate-300">
            After understanding source documents and vouchers, the next step in
            accounting is to record these transactions systematically.  
            The journey of every transaction flows through:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li><strong>Journal</strong> → initial record (book of original entry)</li>
            <li><strong>Ledger</strong> → classified record (book of accounts)</li>
            <li><strong>Trial Balance</strong> → summary of balances</li>
          </ul>

          <p className="mt-4">
            In <strong>TallyPrime</strong>, you do NOT manually write journal or ledger.
            Tally automatically handles posting based on voucher entries.
          </p>
        </section>

        {/* ============================================================
            2. JOURNAL (BOOK OF ORIGINAL ENTRY)
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            What is Journal?
          </h3>

          <p className="mt-2 text-slate-300">
            A <strong>Journal</strong> is the first place where transactions are recorded,
            in chronological order. Each transaction is written using the{" "}
            <strong>Double Entry System</strong>.
          </p>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300 text-sm">Format of a Journal Entry:</p>
            <pre className="mt-2 bg-slate-950 p-3 text-sm rounded-lg border border-slate-700">
{`Date       Particulars                     L.F.       Debit        Credit
---------------------------------------------------------------------------
xx-xx      Account to be debited              –        xxxx
           Account to be credited              –                     xxxx
           (Narration – brief explanation)`}
            </pre>
          </div>

          {/* Example */}
          <div className="mt-5 p-4 bg-slate-900 border border-slate-700 rounded-xl">
            <p className="font-semibold text-sky-300">Example:</p>
            <p className="mt-2 text-sm">
              Paid salary ₹15,000 in cash.
            </p>
            <pre className="mt-2 bg-slate-950 p-3 text-sm rounded-lg border border-slate-700">
{`Salary A/c        Dr       15,000
    To Cash A/c               15,000
(Being salary paid in cash)`}
            </pre>
          </div>

          <p className="mt-4 italic text-slate-400">
            In Tally: This is recorded using a <strong>Payment Voucher</strong>.
          </p>
        </section>

        {/* ============================================================
            3. LEDGER (BOOK OF ACCOUNTS)
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-purple-300">
            What is a Ledger?
          </h3>

          <p className="mt-2 text-slate-300">
            A <strong>Ledger</strong> is a collection of all accounts.  
            While the journal records transactions date-wise,  
            the ledger records them **account-wise**.
          </p>

          <p className="mt-3">
            Every debit and credit from the journal gets posted to their
            respective ledger accounts.
          </p>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300 text-sm">
              Ledger Format (T-Account Style):
            </p>

            <pre className="mt-2 bg-slate-950 p-3 text-sm rounded-lg border border-slate-700">
{`                      Salary A/c
------------------------------------------------------------------
   Date       Particulars      J.F.      Debit | Date   Particulars   J.F.   Credit
------------------------------------------------------------------
   xx-xx      Cash A/c          –        15,000 | ...`}
            </pre>
          </div>

          {/* Example */}
          <div className="mt-5 p-4 bg-slate-900 border border-slate-700 rounded-xl">
            <p className="font-semibold text-sky-300">Example:</p>
            <p className="mt-2 text-sm">
              For the salary transaction above:
            </p>

            <pre className="mt-2 bg-slate-950 p-3 text-sm rounded-lg border border-slate-700">
{`Salary A/c (Debit side)          15,000
Cash A/c   (Credit side)                     15,000`}
            </pre>

            <p className="mt-2 text-sm">
              The ledger shows how much each account increases or decreases.
            </p>
          </div>

          <p className="mt-4 italic text-slate-400">
            In Tally: Ledgers auto-update when you pass a voucher entry.
          </p>
        </section>

        {/* ============================================================
            4. LEDGER POSTING WORKFLOW
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            How Journal → Ledger Posting Works
          </h3>

          <ol className="list-decimal pl-6 mt-3 space-y-2 text-slate-300">
            <li>Identify the accounts involved.</li>
            <li>Apply debit/credit based on golden rules.</li>
            <li>Pass a journal entry.</li>
            <li>Post debits to debit side of ledger.</li>
            <li>Post credits to credit side of another ledger.</li>
            <li>Balance each ledger at the end of the period.</li>
          </ol>

          <p className="mt-4 italic text-slate-400">
            In Tally, posting is instant and automatic.
          </p>
        </section>

        {/* ============================================================
            5. TRIAL BALANCE
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            What is Trial Balance?
          </h3>

          <p className="mt-2 text-slate-300">
            A <strong>Trial Balance</strong> is a statement showing the closing balance
            of all ledger accounts. It helps check:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Arithmetical accuracy</li>
            <li>Whether total debits = total credits</li>
            <li>Errors in posting</li>
            <li>Ledger balancing mistakes</li>
          </ul>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300 text-sm">Format:</p>
            <pre className="mt-2 bg-slate-950 p-3 text-sm rounded-lg border border-slate-700">
{`                TRIAL BALANCE as on xx-xx-xxxx
--------------------------------------------------------------
Account Name                 Debit (₹)              Credit (₹)
--------------------------------------------------------------
Salary A/c                    15,000                      –
Cash A/c                          –                    15,000
--------------------------------------------------------------
Totals                       15,000                   15,000`}
            </pre>
          </div>

          <p className="mt-4 italic text-slate-400">
            In TallyPrime: You can view Trial Balance instantly via:  
            <strong>Gateway of Tally → Display → Trial Balance</strong>
          </p>
        </section>

        {/* ============================================================
            6. RELATIONSHIP: JOURNAL → LEDGER → TRIAL BALANCE
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-purple-300">
            How They Are Connected
          </h3>

          <ol className="list-decimal pl-6 mt-3 space-y-2 text-slate-300">
            <li>A transaction occurs.</li>
            <li>It is recorded in the <strong>Journal</strong>.</li>
            <li>Journal entries are transferred to <strong>Ledgers</strong>.</li>
            <li>Each ledger shows the running balances.</li>
            <li>Trial Balance is prepared showing all ledger totals.</li>
          </ol>

          <p className="mt-4 text-slate-300">
            If trial balance does not tally, errors may exist in:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Posting</li>
            <li>Ledger balancing</li>
            <li>Wrong debit/credit entries</li>
            <li>Omissions or duplications</li>
          </ul>
        </section>

        {/* ============================================================
            7. REAL-LIFE EXAMPLES
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            Real-Life Examples (With Journal + Ledger + Trial Balance)
          </h3>

          {/* Example 1 */}
          <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-xl">
            <p className="font-semibold text-sky-300">Example 1:</p>
            <p className="mt-2 text-sm">
              Purchased goods worth ₹20,000 in cash.
            </p>

            <pre className="mt-2 bg-slate-950 text-sm p-3 rounded-lg border border-slate-700">
{`Journal:
Purchases A/c      Dr   20,000
    To Cash A/c               20,000
(Being goods purchased in cash)

Ledger:
Purchases A/c (Dr)           20,000
Cash A/c (Cr)                           20,000

Trial Balance:
Purchases A/c → 20,000 (Dr)
Cash A/c      → 20,000 (Cr)`}
            </pre>
          </div>

          {/* Example 2 */}
          <div className="mt-6 p-4 bg-slate-900 border border-slate-700 rounded-xl">
            <p className="font-semibold text-sky-300">Example 2:</p>
            <p className="mt-2 text-sm">
              Received commission ₹500.
            </p>

            <pre className="mt-2 bg-slate-950 text-sm p-3 rounded-lg border border-slate-700">
{`Journal:
Cash A/c           Dr     500
    To Commission Received A/c     500

Ledger:
Cash A/c (Dr)                    500
Commission Received A/c (Cr)              500

Trial Balance:
Cash A/c → 500 (Dr)
Commission Received → 500 (Cr)`}
            </pre>
          </div>
        </section>

        {/* ============================================================
            8. PRACTICE QUESTIONS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            Practice Exercise (Beginner Level)
          </h3>

          <ol className="list-decimal pl-6 mt-4 space-y-3 text-slate-300">
            <li>Paid electricity bill ₹2,400.</li>
            <li>Received cash ₹5,000 from customer Arjun.</li>
            <li>Purchased furniture ₹12,000 on credit.</li>
            <li>Paid ₹3,000 for office cleaning.</li>
            <li>Sold goods to Mehul Stores for ₹18,000 on credit.</li>
          </ol>

          <p className="mt-3 italic text-sky-300">
            Task: Write the journal, post them to ledger, and prepare a trial balance.
          </p>
        </section>

      </div>
    );
  }
}
