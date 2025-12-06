import React, { Component } from "react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200 leading-relaxed">

        {/* ============================================================
            1. WHAT ARE SOURCE DOCUMENTS?
        ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold text-sky-300">
            Source Documents & Vouchers
          </h2>

          <p className="mt-2 text-base text-slate-300">
            In accounting, we never record entries based on guess or memory.
            Every transaction must be supported by a{" "}
            <strong>Source Document</strong>.
          </p>

          <p className="mt-3">
            A <strong>source document</strong> is the original proof that a
            transaction actually happened. It contains:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Date of transaction</li>
            <li>Parties involved (buyer, seller, bank, etc.)</li>
            <li>Amount of transaction</li>
            <li>Description of goods/services</li>
            <li>Signatures / stamp / invoice number</li>
          </ul>

          <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-xl">
            <p className="font-semibold text-sky-300">Example:</p>
            <p className="mt-2">
              You pay electricity bill. Your electricity receipt is a{" "}
              <strong>source document</strong> for that payment.  
              Based on this document, you will pass a <strong>journal entry</strong>
              or record a <strong>Payment Voucher in Tally</strong>.
            </p>
          </div>
        </section>

        {/* ============================================================
            2. COMMON TYPES OF SOURCE DOCUMENTS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            Common Types of Source Documents
          </h3>

          <div className="mt-3 space-y-3 text-slate-300">
            <p>Some important source documents are:</p>

            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Cash Memo</strong> – cash sale or cash purchase</li>
              <li><strong>Invoice/Bill</strong> – credit sale or credit purchase</li>
              <li><strong>Receipt</strong> – when money is received</li>
              <li><strong>Payment Receipt</strong> – proof of money paid</li>
              <li><strong>Bank Statement / Passbook</strong> – bank transactions</li>
              <li><strong>Debit Note</strong> – when we return goods or claim reduction</li>
              <li><strong>Credit Note</strong> – when we allow reduction to customer</li>
              <li><strong>Cheque Counterfoil</strong> – proof of cheque issued</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <p className="font-semibold text-sky-300">
              Example — Cash Memo:
            </p>
            <p className="mt-2">
              You buy goods for cash from a shop. The shopkeeper gives you a
              <strong>Cash Memo</strong>.  
              This serves as the basis for entering a purchase transaction in your books.
            </p>
          </div>
        </section>

        {/* ============================================================
            3. WHAT IS A VOUCHER?
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-sky-300">
            What is a Voucher?
          </h3>

          <p className="mt-2 text-slate-300">
            A <strong>Voucher</strong> is a document (or record) prepared by the
            business to <strong>record</strong> a transaction in the books.
          </p>

          <p className="mt-2">
            In manual accounting, you might prepare a{" "}
            <strong>Payment Voucher</strong> or <strong>Receipt Voucher</strong>
            before writing into the journal.
          </p>

          <p className="mt-2">
            In <strong>TallyPrime</strong>, every transaction you enter uses a{" "}
            <strong>Voucher Type</strong> such as:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Payment Voucher</li>
            <li>Receipt Voucher</li>
            <li>Contra Voucher</li>
            <li>Journal Voucher</li>
            <li>Sales Voucher</li>
            <li>Purchase Voucher</li>
            <li>Debit Note / Credit Note Voucher</li>
          </ul>

          <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-xl">
            <p className="font-semibold text-sky-300">Important:</p>
            <p className="mt-2">
              <strong>Source Document</strong> is external proof (bill, invoice, memo).  
              <br />
              <strong>Voucher</strong> is the internal document or record used to
              enter the transaction in the accounting books (or in Tally).
            </p>
          </div>
        </section>

        {/* ============================================================
            4. TYPES OF ACCOUNTING VOUCHERS (MANUAL + TALLY)
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            Major Voucher Types with Examples
          </h3>

          {/* Contra Voucher */}
          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="font-semibold text-sky-300">1. Contra Voucher</h4>
            <p className="mt-1">
              Used for transactions between <strong>Cash and Bank</strong>.
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Cash deposited into bank</li>
              <li>Cash withdrawn from bank</li>
            </ul>

            <p className="mt-2 text-sm text-slate-300">
              Example: Cash deposited in bank ₹10,000
            </p>
            <pre className="mt-2 text-sm bg-slate-950 p-3 rounded-lg border border-slate-700 text-slate-200">
{`Bank A/c      Dr   10,000
    To Cash A/c         10,000`}
            </pre>
          </div>

          {/* Payment Voucher */}
          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="font-semibold text-sky-300">2. Payment Voucher</h4>
            <p className="mt-1">
              Used when <strong>money goes out</strong> of the business.
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Paying rent</li>
              <li>Paying salary</li>
              <li>Paying a supplier</li>
            </ul>

            <p className="mt-2 text-sm text-slate-300">
              Example: Paid salary ₹15,000
            </p>
            <pre className="mt-2 text-sm bg-slate-950 p-3 rounded-lg border border-slate-700 text-slate-200">
{`Salary A/c    Dr   15,000
    To Cash A/c         15,000`}
            </pre>
          </div>

          {/* Receipt Voucher */}
          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="font-semibold text-sky-300">3. Receipt Voucher</h4>
            <p className="mt-1">
              Used when <strong>money is received</strong> by the business.
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Customer paying cash</li>
              <li>Commission received</li>
              <li>Interest received</li>
            </ul>

            <p className="mt-2 text-sm text-slate-300">
              Example: Received cash from Rohan ₹8,000
            </p>
            <pre className="mt-2 text-sm bg-slate-950 p-3 rounded-lg border border-slate-700 text-slate-200">
{`Cash A/c      Dr    8,000
    To Rohan A/c         8,000`}
            </pre>
          </div>

          {/* Sales Voucher */}
          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="font-semibold text-sky-300">4. Sales Voucher</h4>
            <p className="mt-1">
              Used when goods/services are <strong>sold</strong>.
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Example: Sold goods for ₹25,000 on credit to Shreya Traders
            </p>
            <pre className="mt-2 text-sm bg-slate-950 p-3 rounded-lg border border-slate-700 text-slate-200">
{`Shreya Traders A/c   Dr   25,000
    To Sales A/c                 25,000`}
            </pre>
          </div>

          {/* Purchase Voucher */}
          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="font-semibold text-sky-300">5. Purchase Voucher</h4>
            <p className="mt-1">
              Used when goods are <strong>purchased</strong>.
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Example: Purchased goods for ₹30,000 on credit from ABC Suppliers
            </p>
            <pre className="mt-2 text-sm bg-slate-950 p-3 rounded-lg border border-slate-700 text-slate-200">
{`Purchases A/c        Dr   30,000
    To ABC Suppliers A/c       30,000`}
            </pre>
          </div>

          {/* Journal Voucher */}
          <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <h4 className="font-semibold text-sky-300">6. Journal Voucher</h4>
            <p className="mt-1">
              Used for entries that are not pure cash/bank/sales/purchase, such as:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Depreciation entry</li>
              <li>Adjustment entries</li>
              <li>Provision for expenses</li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            5. LINK BETWEEN DOCUMENT → VOUCHER → BOOKS
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-purple-300">
            Flow: Source Document → Voucher → Books of Accounts
          </h3>

          <ol className="list-decimal pl-6 mt-3 space-y-2 text-slate-300">
            <li>
              Transaction happens (e.g., goods purchased, cash received).
            </li>
            <li>
              A <strong>Source Document</strong> is generated (invoice, receipt, bill).
            </li>
            <li>
              Based on that, an <strong>Accounting Voucher</strong> is prepared.
            </li>
            <li>
              The voucher is used to pass a <strong>Journal Entry</strong>.
            </li>
            <li>
              The amounts are posted to <strong>Ledgers</strong>.
            </li>
            <li>
              Finally, they appear in <strong>Trial Balance</strong> and financial statements.
            </li>
          </ol>

          <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-xl text-sm">
            <p className="font-semibold text-sky-300">In TallyPrime:</p>
            <p className="mt-2">
              You directly create a <strong>Voucher Entry</strong> (e.g., Payment,
              Receipt, Sales).  
              Tally automatically updates all related ledgers and reports.
            </p>
          </div>
        </section>

        {/* ============================================================
            6. CLASSROOM PRACTICE
        ============================================================ */}
        <section>
          <h3 className="text-xl font-semibold text-emerald-300">
            Practice Exercise (Identify Document & Voucher Type)
          </h3>

          <p className="mt-2 text-slate-300">
            For each transaction, write:
            <br />
            (a) Source Document  
            (b) Type of Voucher
          </p>

          <ol className="list-decimal pl-6 mt-3 space-y-3 text-slate-300">
            <li>Paid office rent in cash ₹12,000.</li>
            <li>Cash deposited into bank ₹25,000.</li>
            <li>Sold goods for cash ₹18,000.</li>
            <li>Purchased goods on credit from Krishna Stores ₹40,000.</li>
            <li>Received interest from bank ₹800.</li>
          </ol>

          <p className="mt-3 italic text-sky-300">
            (Teacher may discuss answers or prepare separate solution sheet.)
          </p>
        </section>

      </div>
    );
  }
}
