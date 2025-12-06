import React, { Component } from "react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300">
            Debit & Credit Explained (Easy + Advanced Examples)
          </h2>

          <p className="mt-2 text-base text-slate-300">
            Debit (Dr) and Credit (Cr) are the **foundation of double-entry accounting**.
            Every transaction has **two sides**:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>One account is **Debited**</li>
            <li>Another account is **Credited**</li>
          </ul>

          <p className="mt-3">
            Debit and Credit DO NOT mean *increase* or *decrease* by themselves —  
            the meaning **depends on the type of account**.
          </p>
        </section>

        {/* ============================================================
            1. WHAT DEBIT AND CREDIT ACTUALLY MEAN
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            What Debit (Dr) Means
          </h3>
          <p className="mt-2">
            Think of Debit as:  
            <span className="text-emerald-300 font-semibold">
              “Value coming into the business”
            </span>
          </p>

          <h3 className="text-xl font-semibold text-rose-300 mt-6">
            What Credit (Cr) Means
          </h3>
          <p className="mt-2">
            Think of Credit as:  
            <span className="text-rose-300 font-semibold">
              “Value going out of the business”
            </span>
          </p>

          <p className="mt-4 italic text-sky-300">
            (This concept applies mainly to Real Accounts, but helps beginners understand the flow.)
          </p>
        </section>

        {/* ============================================================
            2. ACCOUNT TYPE-WISE DEBIT & CREDIT RULES
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            The Correct Meaning Depends on Account Type
          </h3>

          <table className="w-full text-sm mt-4 border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-2 border border-slate-700">Account Type</th>
                <th className="p-2 border border-slate-700">Debit Means</th>
                <th className="p-2 border border-slate-700">Credit Means</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">Real Account</td>
                <td className="p-2 border border-slate-700">Asset coming in</td>
                <td className="p-2 border border-slate-700">Asset going out</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Personal Account</td>
                <td className="p-2 border border-slate-700">Receiver</td>
                <td className="p-2 border border-slate-700">Giver</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Nominal Account</td>
                <td className="p-2 border border-slate-700">Expense or Loss</td>
                <td className="p-2 border border-slate-700">Income or Gain</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ============================================================
            3. T-ACCOUNT VISUALIZATION
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            T-Account Format (Debit on Left, Credit on Right)
          </h3>

          <pre className="bg-slate-900 p-4 border border-slate-700 rounded-xl text-sm mt-3 text-slate-200">
{`             ACCOUNT NAME
-----------------------------------------
Debit (Left)                 Credit (Right)
-----------------------------------------`}
          </pre>

          <p className="mt-3">
            Every debit entry must be matched with an equal credit entry.
          </p>
        </section>

        {/* ============================================================
            4. MOST IMPORTANT — INCREASE/DECREASE RULES
        ============================================================ */}
        <section>
          <h3 className="text-xl font-bold text-sky-300">
            Increase / Decrease Rules for Each Account Type
          </h3>

          <table className="w-full text-sm mt-4 border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-2 border border-slate-700">Account</th>
                <th className="p-2 border border-slate-700">Increase</th>
                <th className="p-2 border border-slate-700">Decrease</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">Asset</td>
                <td className="p-2 border border-slate-700">Debit</td>
                <td className="p-2 border border-slate-700">Credit</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Expense</td>
                <td className="p-2 border border-slate-700">Debit</td>
                <td className="p-2 border border-slate-700">Credit</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Liability</td>
                <td className="p-2 border border-slate-700">Credit</td>
                <td className="p-2 border border-slate-700">Debit</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Income</td>
                <td className="p-2 border border-slate-700">Credit</td>
                <td className="p-2 border border-slate-700">Debit</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Capital</td>
                <td className="p-2 border border-slate-700">Credit</td>
                <td className="p-2 border border-slate-700">Debit</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-3 italic text-sky-300">
            This table is extremely useful for journal entries & Tally voucher creation.
          </p>
        </section>

        {/* ============================================================
            5. REAL BUSINESS EXAMPLES (PRACTICAL)
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            Practical Examples (You Must Learn These!)
          </h3>

          <div className="space-y-6 mt-4">

            {/* Example 1 */}
            <div className="bg-slate-900 p-4 border border-slate-700 rounded-xl">
              <p className="font-semibold text-sky-300">1. Cash received ₹10,000</p>
              <p className="text-sm mt-2 text-slate-300">
                Cash increases → Debit Cash  
                Source of cash is customer → Credit Customer
              </p>
              <pre className="text-sm mt-2 text-slate-200">
{`Cash A/c          Dr   10,000
    To Customer A/c        10,000`}
              </pre>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-900 p-4 border border-slate-700 rounded-xl">
              <p className="font-semibold text-sky-300">2. Paid salary ₹15,000</p>
              <p className="text-sm mt-2 text-slate-300">
                Expense increases → Debit Salary  
                Cash decreases → Credit Cash
              </p>
              <pre className="text-sm mt-2 text-slate-200">
{`Salary A/c       Dr   15,000
    To Cash A/c           15,000`}
              </pre>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-900 p-4 border border-slate-700 rounded-xl">
              <p className="font-semibold text-sky-300">3. Bought furniture for ₹25,000</p>
              <pre className="text-sm mt-2 text-slate-200">
{`Furniture A/c    Dr   25,000
    To Cash A/c           25,000`}
              </pre>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-900 p-4 border border-slate-700 rounded-xl">
              <p className="font-semibold text-sky-300">4. Commission received ₹5,000</p>
              <pre className="text-sm mt-2 text-slate-200">
{`Cash A/c        Dr    5,000
    To Commission A/c        5,000`}
              </pre>
            </div>

            {/* Example 5 */}
            <div className="bg-slate-900 p-4 border border-slate-700 rounded-xl">
              <p className="font-semibold text-sky-300">5. Borrowed ₹50,000 from SBI Bank</p>
              <p className="text-sm mt-2 text-slate-300">
                Cash increases → Debit Cash  
                Liability increases → Credit SBI Bank A/c
              </p>
              <pre className="text-sm mt-2 text-slate-200">
{`Cash A/c        Dr    50,000
    To SBI Bank Loan A/c     50,000`}
              </pre>
            </div>

          </div>
        </section>

        {/* ============================================================
            6. COMMON MISCONCEPTIONS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-rose-300">
            Common Mistakes Students Make
          </h3>

          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Thinking debit always means “increase” — wrong.</li>
            <li>Confusing personal accounts with nominal accounts.</li>
            <li>Recording only one side of the transaction.</li>
            <li>Debiting “Cash” when it is actually decreasing.</li>
            <li>Forgetting that liabilities increase on the credit side.</li>
          </ul>
        </section>

        {/* ============================================================
            7. PRACTICE SET
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            Practice Questions (For Classwork)
          </h3>

          <ol className="list-decimal pl-6 mt-3 space-y-3">
            <li>Paid electricity bill ₹3,200.</li>
            <li>Received cash from Anil ₹5,000.</li>
            <li>Bought a new computer for ₹45,000.</li>
            <li>Paid rent ₹12,000.</li>
            <li>Owner invested capital ₹1,00,000.</li>
          </ol>

          <p className="mt-3 italic text-sky-300">
            (Teacher can discuss the answers or include them in the next topic.)
          </p>
        </section>

      </div>
    );
  }
}
