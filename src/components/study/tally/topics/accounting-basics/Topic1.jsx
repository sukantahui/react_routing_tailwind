import React, { Component } from "react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300">
            Types of Accounts (Real, Personal, Nominal)
          </h2>

          <p className="mt-2 text-base text-slate-300">
            In Double Entry Accounting, every transaction affects **two accounts** —
            one is debited and the other is credited.  
            To apply the correct rule, you must first identify the **type of account**.
          </p>

          <p className="mt-3">
            Every account in accounting belongs to **one** of the following categories:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li><strong>Real Account</strong> – Assets & properties</li>
            <li><strong>Personal Account</strong> – Persons/Organizations</li>
            <li><strong>Nominal Account</strong> – Expenses & incomes</li>
          </ul>
        </section>

        {/* ============================================================
            1. REAL ACCOUNTS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            1. Real Accounts
          </h3>

          <p className="mt-2">
            Real accounts represent **tangible and intangible assets** that the business owns.
            These accounts carry value and generally appear in the **Balance Sheet**.
          </p>

          <div className="mt-3">
            <p className="font-semibold text-sky-300">Examples of Real Accounts:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cash Account</li>
              <li>Furniture Account</li>
              <li>Land & Building Account</li>
              <li>Machinery Account</li>
              <li>Computer & Equipment Account</li>
              <li>Goodwill (Intangible Asset)</li>
            </ul>
          </div>

          <div className="mt-4 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h4 className="font-semibold text-emerald-300 mb-2">
              Golden Rule for Real Accounts:
            </h4>
            <p><strong>Debit what comes in</strong>, <strong>Credit what goes out</strong></p>

            <div className="mt-3">
              <p className="font-semibold text-sky-300">Examples:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You receive cash → Cash comes in → <strong>Debit Cash A/c</strong></li>
                <li>You purchase furniture → Furniture comes in → <strong>Debit Furniture A/c</strong></li>
                <li>You sell old furniture → Furniture goes out → <strong>Credit Furniture A/c</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. PERSONAL ACCOUNTS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-blue-300">
            2. Personal Accounts
          </h3>

          <p className="mt-2">
            These accounts are related to **individuals, firms, companies, customers, and suppliers**.
          </p>

          <div className="mt-3">
            <p className="font-semibold text-sky-300">Types of Personal Accounts:</p>

            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Natural Persons:</strong> Rahul, Priya, Ananya, etc.</li>
              <li><strong>Artificial Persons:</strong> HDFC Bank, Reliance Ltd, Infosys Ltd.</li>
              <li><strong>Representative Persons:</strong> Outstanding Salary A/c, Prepaid Rent A/c</li>
            </ul>
          </div>

          <div className="mt-4 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h4 className="font-semibold text-blue-300 mb-2">
              Golden Rule for Personal Accounts:
            </h4>
            <p><strong>Debit the Receiver</strong>, <strong>Credit the Giver</strong></p>

            <div className="mt-3">
              <p className="font-semibold text-sky-300">Examples:</p>

              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You pay Shreya Traders → They are giver → <strong>Credit Shreya Traders</strong></li>
                <li>You receive ₹10,000 from Rohit → Rohit is receiver → <strong>Debit Rohit A/c</strong></li>
                <li>You buy goods from Anil on credit → Anil is giver → <strong>Credit Anil A/c</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. NOMINAL ACCOUNTS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-purple-300">
            3. Nominal Accounts
          </h3>

          <p className="mt-2">
            Nominal accounts record **expenses, losses, incomes, and gains**.
          </p>

          <div className="mt-3">
            <p className="font-semibold text-sky-300">Examples:</p>

            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Salary Expense A/c</li>
              <li>Rent Paid A/c</li>
              <li>Commission Received A/c</li>
              <li>Discount Allowed A/c</li>
              <li>Interest Earned A/c</li>
            </ul>
          </div>

          <div className="mt-4 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h4 className="font-semibold text-purple-300 mb-2">
              Golden Rule for Nominal Accounts:
            </h4>

            <p>
              <strong>Debit</strong> all expenses & losses  
              <br />
              <strong>Credit</strong> all incomes & gains
            </p>

            <div className="mt-3">
              <p className="font-semibold text-sky-300">Examples:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Rent Paid → Expense → <strong>Debit Rent A/c</strong></li>
                <li>Commission Received → Income → <strong>Credit Commission A/c</strong></li>
                <li>Salary Expense → Expense → <strong>Debit Salary A/c</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            COMPARISON TABLE
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            Comparison Table (Easy Memory Guide)
          </h3>

          <table className="w-full mt-4 text-sm border border-slate-700">
            <thead>
              <tr className="bg-slate-800 text-slate-200">
                <th className="p-2 border border-slate-700">Account Type</th>
                <th className="p-2 border border-slate-700">Represents</th>
                <th className="p-2 border border-slate-700">Rule</th>
                <th className="p-2 border border-slate-700">Examples</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">Real</td>
                <td className="p-2 border border-slate-700">Assets</td>
                <td className="p-2 border border-slate-700">Debit in, Credit out</td>
                <td className="p-2 border border-slate-700">Cash, Furniture</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Personal</td>
                <td className="p-2 border border-slate-700">Persons/Entities</td>
                <td className="p-2 border border-slate-700">Debit receiver, Credit giver</td>
                <td className="p-2 border border-slate-700">Rahul, HDFC Bank</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Nominal</td>
                <td className="p-2 border border-slate-700">Income & Expense</td>
                <td className="p-2 border border-slate-700">Debit expense, Credit income</td>
                <td className="p-2 border border-slate-700">Rent, Salary, Interest</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ============================================================
            PRACTICE QUESTIONS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            Practice Examples
          </h3>

          <p className="mt-2 text-slate-300">Identify the type of account:</p>

          <ul className="list-decimal pl-6 mt-2 space-y-2">
            <li>Cash Account → ?</li>
            <li>SBI Bank Account → ?</li>
            <li>Commission Received → ?</li>
            <li>Salary Expense → ?</li>
            <li>ABC Traders (Supplier) → ?</li>
            <li>Furniture Account → ?</li>
          </ul>

          <p className="mt-3 text-sky-300 italic">
            (Answers should be displayed in class discussion or separate solution file.)
          </p>
        </section>

      </div>
    );
  }
}
