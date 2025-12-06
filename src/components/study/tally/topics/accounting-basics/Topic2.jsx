import React, { Component } from "react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER — GOLDEN RULES
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300">
            Golden Rules of Accounting (With Examples)
          </h2>

          <p className="mt-2 text-base text-slate-300">
            The Golden Rules of Accounting help determine **when to Debit and when to Credit**  
            for any transaction. They apply to the **three types of accounts**:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Real Accounts</li>
            <li>Personal Accounts</li>
            <li>Nominal Accounts</li>
          </ul>

          <p className="mt-3">
            Once you correctly identify the account type, applying the Golden Rule becomes very easy.
          </p>
        </section>

        {/* ============================================================
            1. RULE FOR REAL ACCOUNT
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            1. Real Account — “Debit What Comes In, Credit What Goes Out”
          </h3>

          <p className="mt-2">
            Real accounts deal with **assets** — things the business owns.  
            Whenever an asset comes into the business → we **Debit** it.  
            Whenever an asset goes out → we **Credit** it.
          </p>

          <div className="mt-5 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h4 className="font-semibold text-sky-300 mb-2">Examples:</h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cash comes in</strong>  
                → Debit Cash A/c
              </li>
              <li>
                <strong>Furniture is purchased</strong>  
                → Furniture comes in → Debit Furniture A/c
              </li>
              <li>
                <strong>Old computer sold</strong>  
                → Computer goes out → Credit Computer A/c
              </li>
            </ul>

            {/* Simple Ledger Illustration */}
            <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="font-semibold text-emerald-300">Ledger Illustration:</p>
              <pre className="text-sm mt-2 text-slate-200">
{`Cash A/c
----------------------------------
Debit (What comes in)
Credit (What goes out)`}
              </pre>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. RULE FOR PERSONAL ACCOUNT
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-blue-300">
            2. Personal Account — “Debit the Receiver, Credit the Giver”
          </h3>

          <p className="mt-2">
            Personal accounts represent **persons, organisations or entities**.
          </p>

          <div className="mt-4 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h4 className="font-semibold text-sky-300 mb-2">Examples:</h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                You pay ₹20,000 to <strong>Shreya Traders</strong>  
                → Shreya Traders is the giver  
                → <strong>Credit Shreya Traders A/c</strong>
              </li>

              <li>
                You receive ₹10,000 from <strong>Rahul</strong>  
                → Rahul is the giver of money  
                → <strong>Debit Rahul A/c</strong>
              </li>

              <li>
                Goods purchased on credit from <strong>ABC Suppliers</strong>  
                → Supplier is the giver  
                → <strong>Credit ABC Suppliers A/c</strong>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="font-semibold text-blue-300">Ledger Illustration:</p>
              <pre className="text-sm mt-2 text-slate-200">
{`Rahul A/c
----------------------------------
Debit (Receiver)
Credit (Giver)`}
              </pre>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. RULE FOR NOMINAL ACCOUNT
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-purple-300">
            3. Nominal Account — “Debit Expenses, Credit Incomes”
          </h3>

          <p className="mt-2">
            Nominal accounts record **expenses, incomes, losses, and gains**.
            They appear in the **Profit & Loss Statement**.
          </p>

          <div className="mt-4 bg-slate-900 p-4 border border-slate-700 rounded-xl">
            <h4 className="font-semibold text-sky-300 mb-2">Examples:</h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Rent Paid → Expense  
                → <strong>Debit Rent A/c</strong>
              </li>
              <li>
                Salary Paid → Expense  
                → <strong>Debit Salary A/c</strong>
              </li>
              <li>
                Commission Received → Income  
                → <strong>Credit Commission A/c</strong>
              </li>
              <li>
                Interest Earned → Income  
                → <strong>Credit Interest A/c</strong>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="font-semibold text-purple-300">Ledger Illustration:</p>
              <pre className="text-sm mt-2 text-slate-200">
{`Rent Expense A/c
----------------------------------
Debit (Expenses)
Credit (Not Used)`}
              </pre>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. JOURNAL ENTRY PRACTICE
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            Journal Entry Examples (Applying Golden Rules)
          </h3>

          <div className="mt-4 space-y-6">

            {/* Example 1 */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
              <h4 className="font-semibold text-emerald-300 mb-2">Example 1</h4>
              <p>You paid Rent ₹5,000</p>
              <pre className="mt-2 text-sm text-slate-300">
{`Rent A/c        Dr   5,000
     To Cash A/c           5,000

(Being rent paid in cash)`}
              </pre>
            </div>

            {/* Example 2 */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
              <h4 className="font-semibold text-blue-300 mb-2">Example 2</h4>
              <p>Purchased Furniture for ₹20,000</p>
              <pre className="mt-2 text-sm text-slate-300">
{`Furniture A/c    Dr   20,000
     To Cash A/c           20,000

(Being furniture purchased)`}
              </pre>
            </div>

            {/* Example 3 */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
              <h4 className="font-semibold text-purple-300 mb-2">Example 3</h4>
              <p>Received Commission ₹3,000</p>
              <pre className="mt-2 text-sm text-slate-300">
{`Cash A/c        Dr     3,000
     To Commission A/c      3,000

(Being commission received)`}
              </pre>
            </div>

          </div>
        </section>

        {/* ============================================================
            5. MEMORY TRICKS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            Easy Memory Tricks
          </h3>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-300">
            <li>Real Account → Think “Things” → When something comes in, you Debit it.</li>
            <li>Personal Account → Think “People” → Who receives? Debit. Who gives? Credit.</li>
            <li>Nominal Account → Think “Profit & Loss” → Expenses = Debit, Income = Credit.</li>
          </ul>
        </section>

        {/* ============================================================
            6. PRACTICE QUESTIONS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            Practice Problems
          </h3>

          <p className="mt-2 text-slate-300">Write the correct journal entry:</p>

          <ol className="list-decimal pl-6 mt-3 space-y-3">
            <li>Bought machinery for ₹50,000 in cash.</li>
            <li>Paid electricity bill ₹2,500.</li>
            <li>Received ₹12,000 from customer Rohan.</li>
            <li>Paid salary to staff ₹18,000.</li>
            <li>Borrowed ₹1,00,000 from SBI Bank.</li>
          </ol>

          <p className="mt-3 italic text-sky-300">(You may create Topic2-Solutions.jsx or use in class.)</p>
        </section>

      </div>
    );
  }
}
