import React, { Component } from "react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 5 — Company Creation & Company Features in TallyPrime (F11)
        </h1>

        {/* INTRO */}
        <section className="space-y-4">
          <p className="text-sm leading-relaxed">
            Before you start recording transactions in TallyPrime, you must create a
            company. A “Company” in Tally represents a business or accounting
            entity for which books of accounts will be maintained.  
          </p>

          <p className="text-sm">
            After creation, TallyPrime allows you to activate features such as:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Accounting Features</li>
            <li>Inventory Features</li>
            <li>Statutory & Taxation (GST, TDS, TCS)</li>
            <li>Payroll (if required)</li>
          </ul>

          <p className="text-sm">
            This topic explains how to create a company and configure its features using <strong>F11: Company Features</strong>.
          </p>
        </section>

        {/* SECTION 1: CREATE COMPANY */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            1. How to Create a New Company in TallyPrime
          </h2>

          <p className="text-sm">
            Follow these steps to create a new company:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open TallyPrime → Click <strong>Create Company</strong></li>
            <li>Fill the company details such as Name, Address, State, Country.</li>
            <li>Set Financial Year beginning and Books beginning dates.</li>
            <li>Enable/Disable Security based on need.</li>
            <li>Save the company using <strong>Ctrl + A</strong>.</li>
          </ol>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            <strong>Example:</strong><br />
            Company Name: Horizon Traders  
            Financial Year: 01-04-2024  
            Books Beginning: 01-04-2024  
            Base Currency: Indian Rupees (₹)
          </div>
        </section>

        {/* SECTION 2: COMPANY CREATION FORM DETAILS */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            2. Important Fields in Company Creation Form
          </h2>

          <table className="w-full text-sm border border-slate-700 bg-slate-800 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-900 text-sky-300">
                <th className="p-2 border border-slate-700">Field</th>
                <th className="p-2 border border-slate-700">Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">Company Name</td>
                <td className="p-2 border border-slate-700">Legal or business name</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Mailing Address</td>
                <td className="p-2 border border-slate-700">Address printed on invoices</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Financial Year</td>
                <td className="p-2 border border-slate-700">Typically 01-Apr to 31-Mar</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Books Beginning</td>
                <td className="p-2 border border-slate-700">Start date of accounting</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Security</td>
                <td className="p-2 border border-slate-700">Enable username/password</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-700">Base Currency</td>
                <td className="p-2 border border-slate-700">Currency for all accounts</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* SECTION 3: COMPANY FEATURES (F11) */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            3. What Are Company Features? (Press F11)
          </h2>

          <p className="text-sm">
            Company Features allow you to enable advanced functionalities depending
            on your business requirements.
          </p>

          <p className="text-sm">
            To access features:  
            <strong>Press F11 → Company Features</strong>
          </p>

          <h3 className="text-lg font-semibold text-sky-300">
            Categories of Features:
          </h3>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>Accounting Features</strong></li>
            <li><strong>Inventory Features</strong></li>
            <li><strong>Statutory & Taxation Features (GST)</strong></li>
            <li><strong>Payroll Features</strong></li>
          </ul>
        </section>

        {/* SECTION 4: ACCOUNTING FEATURES */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            4. Important Accounting Features in TallyPrime
          </h2>

          <ul className="list-disc list-inside text-sm space-y-2">
            <li><strong>Bill-wise details</strong> — Required for Sundry Debtors/Creditors</li>
            <li><strong>Cost Centres & Cost Categories</strong> — For departmental accounting</li>
            <li><strong>Interest Calculation</strong> — Used for party interest</li>
            <li><strong>Maintaining Budgets & Controls</strong></li>
            <li><strong>Enable Zero-Value Transactions</strong> — Useful for samples</li>
          </ul>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            <strong>Example:</strong><br />
            If you sell goods on credit, enable <strong>Maintain Bill-wise Details</strong>  
            to track outstanding receivables bill-by-bill.
          </div>
        </section>

        {/* SECTION 5: INVENTORY FEATURES */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            5. Inventory Features (For Stock & Item Management)
          </h2>

          <ul className="list-disc list-inside text-sm space-y-2">
            <li><strong>Maintain Inventory</strong> — Turn inventory system ON</li>
            <li><strong>Batch-wise details</strong> — For medicine, cosmetics, food items</li>
            <li><strong>Expiry date management</strong></li>
            <li><strong>Use Multiple Godowns</strong></li>
            <li><strong>Enable Job Work</strong></li>
          </ul>

          <p className="text-sm">
            If your business manages physical stock, enabling inventory is essential.
          </p>
        </section>

        {/* SECTION 6: GST FEATURES */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            6. GST & Statutory Features
          </h2>

          <p className="text-sm">Enable GST in TallyPrime by:</p>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg text-sm">
            <strong>F11 → Statutory & Taxation → Enable Goods & Services Tax (GST)</strong>
          </div>

          <ul className="list-disc list-inside text-sm space-y-2 mt-2">
            <li>Set <strong>Registration Type</strong> (Regular/Composition)</li>
            <li>Enter <strong>GSTIN</strong></li>
            <li>Select your <strong>Applicable State</strong></li>
            <li>Enable <strong>Tax Ledgers</strong> automatically</li>
            <li>Activate <strong>e-Invoice</strong> (if applicable)</li>
          </ul>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            <strong>Example:</strong><br />
            ABC Electronics  
            GSTIN: 19ABCDE1234F1Z5  
            Registration Type: Regular  
            State: West Bengal
          </div>
        </section>

        {/* SECTION 7: PAYROLL FEATURES */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            7. Payroll Features (Optional)
          </h2>

          <p className="text-sm">
            Enable payroll if your business has employees and salary processing.
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Attendance & Pay Heads</li>
            <li>Salary Structure</li>
            <li>Employee Records</li>
          </ul>
        </section>

        {/* SECTION 8: PRACTICAL WORKFLOW */}
        <section className="space-y-4">
          <h2 className="text-xl text-sky-300 font-semibold">
            8. Practical Workflow for Setting Up a Company
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Create Company (Basic details)</li>
            <li>Enable Accounting Features</li>
            <li>Enable Inventory (if required)</li>
            <li>Activate GST & Statutory</li>
            <li>Configure Voucher Types</li>
            <li>Create Ledgers & Groups</li>
            <li>Start voucher entry</li>
          </ol>
        </section>

        {/* SECTION 9: SUMMARY */}
        <section className="space-y-4">
          <h2 className="text-xl text-sky-300 font-semibold">
            Summary — Company Creation & Features
          </h2>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>A “Company” stores all books of accounts.</li>
            <li>F11 is used to enable advanced features.</li>
            <li>Enable GST compulsory for tax invoices.</li>
            <li>Accounting Features help manage bills and interest.</li>
            <li>Inventory Features help track stock and batches.</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            © Coder & AccoTax — TallyPrime Professional Course  
            Topic by Sukanta Hui
          </p>
        </footer>
      </div>
    );
  }
}
