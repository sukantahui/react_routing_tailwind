import React, { Component } from "react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200 leading-relaxed">

        {/* ============================================================
            1. WHAT IS ACCOUNTING?
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">
            What is Accounting?
          </h2>

          <p className="text-slate-300 text-base">
            Accounting is the <strong>systematic recording, classifying, summarising, and analyzing</strong>
            of all financial transactions of a business. It helps business owners understand:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>How much they earn (profit)</li>
            <li>How much they spend (expenses)</li>
            <li>How much they own (assets)</li>
            <li>How much they owe (liabilities)</li>
          </ul>

          <p className="mt-3">
            Accounting acts as the **language of business** — it communicates the financial health of an
            organisation to owners, investors, government, and institutions.
          </p>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300">Simple Example:</p>
            <p className="mt-2">
              You start a stationery shop.  
              Every time you buy goods, sell goods, pay rent, or receive cash —  
              **all these events are financial transactions**, and accounting helps record them clearly.
            </p>
          </div>
        </section>

        {/* ============================================================
            2. TYPES OF ACCOUNTS
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">
            Types of Accounts in Accounting
          </h2>

          <p>
            In Double-Entry Accounting (used worldwide, including in Tally), all accounts fall into  
            <strong>three major categories</strong>:
          </p>

          <ol className="list-decimal pl-6 mt-3 space-y-2">
            <li><strong>Real Accounts</strong> – Related to properties & assets</li>
            <li><strong>Personal Accounts</strong> – Related to persons or organizations</li>
            <li><strong>Nominal Accounts</strong> – Related to incomes & expenses</li>
          </ol>

          {/* Real Accounts */}
          <div className="mt-5 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h3 className="text-lg font-semibold text-emerald-300 mb-1">1. Real Accounts</h3>
            <p>These represent things we can own:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cash</li>
              <li>Furniture</li>
              <li>Land & Building</li>
              <li>Machinery</li>
              <li>Vehicles</li>
            </ul>
            <p className="mt-2 italic">They have a physical or tangible existence.</p>
          </div>

          {/* Personal Accounts */}
          <div className="mt-5 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-300 mb-1">2. Personal Accounts</h3>
            <p>Accounts of individuals, firms, companies:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Rohit (Customer)</li>
              <li>Tata Motors Ltd.</li>
              <li>ABC Traders</li>
              <li>Creditors & Debtors</li>
            </ul>
            <p className="mt-2">These represent persons or entities doing business with you.</p>
          </div>

          {/* Nominal Accounts */}
          <div className="mt-5 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h3 className="text-lg font-semibold text-purple-300 mb-1">3. Nominal Accounts</h3>
            <p>These represent incomes, expenses, gains, and losses:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Salary Expense</li>
              <li>Rent Paid</li>
              <li>Interest Received</li>
              <li>Discount Allowed</li>
              <li>Commission Earned</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300">Example:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Rent Paid → Nominal Account (Expense)</li>
              <li>Cash in hand → Real Account</li>
              <li>Shreya Traders → Personal Account</li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            3. GOLDEN RULES OF ACCOUNTING
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">
            Golden Rules of Accounting
          </h2>

          <p>
            The double-entry system is governed by **Golden Rules**, which tell us when to <strong>Debit</strong> and when to <strong>Credit</strong>.
          </p>

          <div className="mt-4 space-y-4">

            {/* Rule 1 */}
            <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="text-lg font-semibold text-emerald-300">
                1. Real Account → Debit what comes in, Credit what goes out
              </h3>

              <p className="mt-2 text-sm">Example:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cash received → Cash comes in → <strong>Debit Cash</strong></li>
                <li>Furniture sold → Furniture goes out → <strong>Credit Furniture</strong></li>
              </ul>
            </div>

            {/* Rule 2 */}
            <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-300">
                2. Personal Account → Debit the receiver, Credit the giver
              </h3>

              <p className="mt-2 text-sm">Example:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You pay Shreya Traders → Shreya is giver → <strong>Credit Shreya</strong></li>
                <li>You receive cash from Rahul → Rahul is receiver → <strong>Debit Rahul</strong></li>
              </ul>
            </div>

            {/* Rule 3 */}
            <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-300">
                3. Nominal Account → Debit expenses & losses, Credit incomes & gains
              </h3>

              <p className="mt-2 text-sm">Example:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Rent paid → Expense → <strong>Debit Rent A/c</strong></li>
                <li>Interest received → Income → <strong>Credit Interest A/c</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. DEBIT & CREDIT EXPLAINED (BEGINNER-FRIENDLY)
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">
            Debit & Credit Explained (Simple)
          </h2>

          <p>
            Beginners often confuse debit and credit.  
            Remember: **Debit and Credit DO NOT mean increase or decrease** — it depends on the type of account.
          </p>

          <table className="w-full mt-4 text-sm border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-2 border border-slate-700">Account Type</th>
                <th className="p-2 border border-slate-700">Debit</th>
                <th className="p-2 border border-slate-700">Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">Asset (Cash, Furniture)</td>
                <td className="p-2 border border-slate-700">Increases</td>
                <td className="p-2 border border-slate-700">Decreases</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Expense (Rent, Salary)</td>
                <td className="p-2 border border-slate-700">Increases</td>
                <td className="p-2 border border-slate-700">Decreases</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Income (Commission)</td>
                <td className="p-2 border border-slate-700">Decreases</td>
                <td className="p-2 border border-slate-700">Increases</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Liability (Loan)</td>
                <td className="p-2 border border-slate-700">Decreases</td>
                <td className="p-2 border border-slate-700">Increases</td>
              </tr>
            </tbody>
          </table>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300">Example:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cash received → Asset increases → <strong>Debit Cash</strong></li>
              <li>Loan taken → Liability increases → <strong>Credit Loan A/c</strong></li>
              <li>Rent paid → Expense increases → <strong>Debit Rent</strong></li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            5. SOURCE DOCUMENTS & VOUCHERS
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">
            Source Documents & Vouchers
          </h2>

          <p>
            Every transaction must be supported by a **source document**, which acts as proof.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Cash Memo</li>
            <li>Invoice/Bill</li>
            <li>Bank Receipt</li>
            <li>Payment Voucher</li>
            <li>Purchase Order</li>
            <li>Debit/Credit Notes</li>
          </ul>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300">Example:</p>
            <p className="mt-2">
              When you pay electricity bill — your electricity receipt becomes the **source document**,
              and you record the entry using a **Payment Voucher**.
            </p>
          </div>
        </section>

        {/* ============================================================
            6. LEDGER, JOURNAL & TRIAL BALANCE (CONCEPT)
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300 mb-2">
            Ledgers, Journal & Trial Balance (Concept)
          </h2>

          <h3 className="text-lg font-semibold text-emerald-300 mt-3">
            Journal
          </h3>
          <p>
            Journal is the **first book of accounting**, where transactions are recorded in
            chronological order using debit–credit rules.
          </p>

          <h3 className="text-lg font-semibold text-blue-300 mt-4">
            Ledger
          </h3>
          <p>
            Ledger is the **main book of accounts** containing all individual accounts such as Cash,
            Sales, Rent, Loan, etc.
          </p>

          <h3 className="text-lg font-semibold text-purple-300 mt-4">
            Trial Balance
          </h3>
          <p>
            A Trial Balance is a report that ensures **total debit = total credit**.  
            It helps detect math errors before preparing final accounts.
          </p>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl mt-4">
            <p className="font-semibold text-sky-300">Example Flow:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Rent Paid → first recorded in Journal</li>
              <li>Then posted to Rent Ledger & Cash Ledger</li>
              <li>Trial Balance checks whether entries balance</li>
            </ul>
          </div>
        </section>

      </div>
    );
  }
}
