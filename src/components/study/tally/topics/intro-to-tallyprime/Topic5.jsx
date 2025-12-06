import React, { Component } from "react";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 6 — Basic Configurations (F12) & Voucher / Invoice Settings in TallyPrime
        </h1>

        {/* INTRO */}
        <section className="space-y-4">
          <p className="text-sm leading-relaxed">
            After creating a company and enabling features (F11), the next important step is to configure
            how TallyPrime behaves during day-to-day usage. This is done through
            <strong> F12: Configurations</strong>.  
          </p>

          <p className="text-sm">
            F12 settings affect:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Voucher entry behaviour</li>
            <li>Invoice format & printing</li>
            <li>Inventory display and valuation</li>
            <li>Masters creation behaviour</li>
            <li>Warning & validation messages</li>
          </ul>

          <p className="text-sm">
            While F11 enables features at the company level,  
            <strong>F12 fine-tunes how each feature works</strong>.
          </p>
        </section>

        {/* SECTION 1 – WHAT IS F12 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            1. What is F12 (Configurations)?
          </h2>

          <p className="text-sm">
            F12 controls **screen-level settings** that affect data entry and display.  
            These settings are temporary and can be changed anytime, unlike F11 (which affects entire company).
          </p>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            <strong>Shortcut:</strong> Press <strong>F12</strong> on any screen  
            → Configuration options appear for that specific section  
          </div>

          <p className="text-sm">
            For example:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Press F12 inside a voucher → Voucher Configuration</li>
            <li>Press F12 inside Ledger → Ledger Creation Config</li>
            <li>Press F12 inside Inventory → Inventory Config</li>
          </ul>
        </section>

        {/* SECTION 2 – VOUCHER CONFIGURATION */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            2. Voucher Configuration (Very Important)
          </h2>

          <p className="text-sm">
            Voucher configuration modifies how vouchers behave while entering data.
            Apply by:  
            <strong>Open any voucher → Press F12</strong>
          </p>

          <h3 className="text-lg font-semibold text-sky-300">
            Common Voucher Configurations:
          </h3>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Allow narration</li>
            <li>Provide reference details</li>
            <li>Use voucher class (if available)</li>
            <li>Show bill-wise details</li>
            <li>Inventory values are affected (for accounting vouchers)</li>
            <li>Use default ledger allocation</li>
            <li>Warn on negative cash balance</li>
          </ul>

          <div className="p-3 bg-slate-900 border border-slate-700 rounded-md text-sm">
            <strong>Example:</strong>  
            If you enable “Provide Reference No.” in a Purchase Voucher → You must enter supplier reference number each time.
          </div>
        </section>

        {/* SECTION 3 – INVOICE SETTINGS */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            3. Sales Invoice Configuration (GST Enabled)
          </h2>

          <p className="text-sm">
            TallyPrime allows customizing how invoices look and what data they contain.
          </p>

          <h3 className="text-lg text-sky-300 font-semibold">Key Invoice Settings:</h3>

          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Enable Item-wise GST details</li>
            <li>Show HSN/SAC column</li>
            <li>Show GST Breakdown (CGST/SGST/IGST)</li>
            <li>Enable e-Way Bill & e-Invoice</li>
            <li>Show Terms & Conditions</li>
            <li>Show Dispatch Details</li>
            <li>Show Customer Address on Invoice</li>
            <li>Enable Rounding</li>
          </ul>

          <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 text-sm">
            <strong>Example:</strong><br />
            If customer details require shipping address → Enable “Show Dispatch Details” inside Invoice F12 settings.
          </div>
        </section>

        {/* SECTION 4 – INVENTORY CONFIG */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            4. Inventory Configuration (for stock & item entry)
          </h2>

          <p className="text-sm">
            Inventory configurations appear when inside Inventory menus or stock vouchers.
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Show batch numbers</li>
            <li>Show expiry dates</li>
            <li>Show opening balance columns</li>
            <li>Use separate discount columns</li>
            <li>Show actual & billed quantity</li>
          </ul>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            <strong>Example:</strong>  
            Medical shops must enable <strong>Batch & Expiry</strong> for each stock item.
          </div>
        </section>

        {/* SECTION 5 – PRINTING CONFIG */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            5. Printing Configuration (ALT + P)
          </h2>

          <p className="text-sm">
            Printing settings control layout and details for printed invoices.
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Add logo to invoice</li>
            <li>Show bank details for payment</li>
            <li>Show terms & conditions</li>
            <li>Add signature space</li>
            <li>Show GST summary</li>
            <li>Print invoice in simple or detailed format</li>
          </ul>

          <div className="p-4 text-sm bg-slate-900 rounded-lg border border-slate-700">
            <strong>Tip:</strong>  
            Go to <strong>Voucher → ALT + P (Print) → Configuration</strong>  
            to customize invoice design.
          </div>
        </section>

        {/* SECTION 6 – MASTER CREATION CONFIG */}
        <section className="space-y-4">
          <h2 className="text-xl text-purple-300 font-semibold">
            6. Master Creation Configuration (Ledgers, Items)
          </h2>

          <p className="text-sm">
            When creating Ledgers or Stock Items, F12 decides what fields appear.
          </p>

          <h3 className="text-lg text-sky-300 font-semibold">Important Options:</h3>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Show opening balance</li>
            <li>Enable sub-groups / multiple groups</li>
            <li>Show GST details for ledgers</li>
            <li>Show credit period</li>
            <li>Show cost centres</li>
            <li>Show price lists</li>
          </ul>

          <div className="p-4 bg-slate-900 border border-slate-700 text-sm rounded-lg">
            <strong>Example:</strong>  
            When creating Supplier Ledger, enable:  
            <strong>“Set/alter GST Details – Yes”</strong>
          </div>
        </section>

        {/* SECTION 7 – RECOMMENDED SETTINGS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            7. Recommended F12 Settings for New Businesses
          </h2>

          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Enable narration for every voucher</li>
            <li>Enable bill-wise details for sundry groups</li>
            <li>Enable GST classification in items</li>
            <li>Show HSN code column in invoices</li>
            <li>Enable “Warn on negative cash”</li>
            <li>Enable rounding off for tax invoices</li>
          </ul>
        </section>

        {/* SECTION 8 – PRACTICAL WORKFLOW */}
        <section className="space-y-4">
          <h2 className="text-xl text-sky-300 font-semibold">
            8. Practical Workflow Using F12 Settings
          </h2>

          <ol className="list-decimal list-inside text-sm space-y-2">
            <li>Create Company</li>
            <li>Enable F11 features (Accounting, Inventory, GST)</li>
            <li>Open Sales Voucher → Press F12</li>
            <li>Turn ON GST fields, HSN, item discounts</li>
            <li>Open Ledger → Press F12 → Enable GST details</li>
            <li>Open Stock Item → Enable price & tax settings</li>
            <li>Print invoice → ALT + P → Configure layout</li>
          </ol>
        </section>

        {/* SUMMARY */}
        <section className="space-y-4">
          <h2 className="text-xl text-sky-300 font-semibold">Summary</h2>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>F12 controls configuration at the screen level.</li>
            <li>Voucher configuration customizes invoice entry.</li>
            <li>Inventory configuration manages stock details.</li>
            <li>Printing configuration customizes invoice print formats.</li>
            <li>Master configuration helps with ledger/item creation fields.</li>
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
