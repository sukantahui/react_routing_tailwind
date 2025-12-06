import React, { Component } from "react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* MAIN HEADING */}
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 4 — Tally Gateway & Menu Navigation in TallyPrime
        </h1>

        {/* INTRO */}
        <section className="space-y-4">
          <p className="text-sm leading-relaxed">
            The <strong>Gateway of Tally</strong> is the starting point of every
            activity in TallyPrime. From company selection to voucher entry to
            advanced reporting, everything begins at the Gateway. TallyPrime has
            redesigned the navigation system to make it faster, cleaner, and more
            intuitive.
          </p>

          <p className="text-sm">
            This topic explains the complete navigation system, including:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Understanding the Gateway screen</li>
            <li>Using the <strong>GoTo (ALT+G)</strong> navigation</li>
            <li>Drill-down structure of menus</li>
            <li>Multitasking and switching between screens</li>
            <li>Shortcut keys (very important for practical work)</li>
          </ul>
        </section>

        {/* GATEWAY STRUCTURE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            1. Understanding the Gateway of TallyPrime
          </h2>

          <p className="text-sm">
            Once you load a company, you will see the Gateway screen containing:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>Company Name</strong> at the top</li>
            <li><strong>Top Bar</strong> with Search, Company Menu, Help, etc.</li>
            <li><strong>Main Menu</strong> containing Masters, Vouchers & Reports</li>
            <li><strong>Right Panel</strong> showing contextual details</li>
          </ul>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-sm">
            In Tally ERP 9, menus were deeper and harder to reach.  
            In TallyPrime, everything is structured cleanly and accessible faster.
          </div>
        </section>

        {/* MENU STRUCTURE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            2. Main Menu Structure of TallyPrime
          </h2>

          <p className="text-sm">
            From Gateway, the main functional menu categories are:
          </p>

          <ul className="list-decimal list-inside text-sm space-y-2">
            <li><strong>Masters</strong> (Ledger, Groups, Stock Items, Units, etc.)</li>
            <li><strong>Transactions</strong> (Sales, Purchase, Receipt, Payment, Journal, Contra)</li>
            <li><strong>Reports</strong> (Balance Sheet, P&L, Stock Summary, Day Book, GST Reports)</li>
            <li><strong>Utilities</strong> (Import, Export, Banking, Backup & Restore)</li>
            <li><strong>Company Features</strong> (F11 Settings)</li>
          </ul>

          <p className="text-sm">
            Selecting any item takes you to a drill-down screen where you can
            explore sub-menus and related details.
          </p>
        </section>

        {/* GOTO NAVIGATION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            3. GoTo — The Fastest Way to Navigate (ALT + G)
          </h2>

          <p className="text-sm">
            <strong>GoTo</strong> is one of the biggest upgrades in TallyPrime.
            It lets you jump instantly to any:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Report (e.g., Day Book, Ledger Vouchers)</li>
            <li>Voucher type (e.g., Sales, Purchase)</li>
            <li>Master (Ledger, Stock Item)</li>
            <li>Settings (Company Features, Configurations)</li>
          </ul>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            <strong>Example:</strong><br />
            Press <strong>ALT + G</strong> → type “Balance Sheet” → press Enter.  
            You reach the report instantly without browsing menus.
          </div>
        </section>

        {/* DRILL DOWN */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            4. Drill-Down System (Very Important)
          </h2>

          <p className="text-sm">
            Drill-down allows you to explore detailed information from a summary
            screen. This is core to how Tally works.
          </p>

          <div className="space-y-2 text-sm">
            <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <strong>Example 1:</strong><br />
              Gateway → Summary → <strong>Balance Sheet</strong> → click on “Capital Account” → see Ledger details.
            </div>

            <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <strong>Example 2:</strong><br />
              Stock Summary → click on Item → see batch details → click on batch → see transaction list.
            </div>

            <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <strong>Example 3:</strong><br />
              Day Book → click on a voucher → edit the voucher directly.
            </div>
          </div>

          <p className="text-sm">
            Drill-down makes auditing, verification, and corrections extremely easy.
          </p>
        </section>

        {/* MULTITASKING */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            5. Multitasking & Switching Between Screens
          </h2>

          <p className="text-sm">
            TallyPrime allows opening multiple screens at once—something difficult
            in Tally ERP 9.
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Press <strong>ALT + G</strong> to open another report.</li>
            <li>Press <strong>ESC</strong> to go back screen-by-screen.</li>
            <li>Use the <strong>Top Navigation Path</strong> to jump levels.</li>
          </ul>

          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-sm">
            <strong>Example Workflow:</strong><br />
            While entering a Sales voucher → need customer ledger details → press ALT+G → open Ledger → return to voucher → continue entry.
          </div>
        </section>

        {/* SHORTCUT KEYS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            6. Essential Shortcut Keys for Fast Navigation
          </h2>

          <table className="w-full text-sm border border-slate-700 bg-slate-800 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-900 text-sky-300">
                <th className="p-2 border border-slate-700">Shortcut</th>
                <th className="p-2 border border-slate-700">Function</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td className="p-2 border border-slate-700">ALT + G</td>
                <td className="p-2 border border-slate-700">GoTo (instant navigation)</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">ESC</td>
                <td className="p-2 border border-slate-700">Go back</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">CTRL + A</td>
                <td className="p-2 border border-slate-700">Save screen</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">ALT + K</td>
                <td className="p-2 border border-slate-700">Company menu</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">F11</td>
                <td className="p-2 border border-slate-700">Company Features</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">F12</td>
                <td className="p-2 border border-slate-700">Configurations</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">ALT + P</td>
                <td className="p-2 border border-slate-700">Print screen</td>
              </tr>

            </tbody>
          </table>
        </section>

        {/* EXAMPLES & WORKFLOWS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            7. Practical Navigation Examples
          </h2>

          <div className="space-y-3 text-sm">

            <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <strong>Example 1: View Day Book</strong><br />
              ALT + G → type “Day Book” → Enter.
            </div>

            <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <strong>Example 2: Open Ledger Creation</strong><br />
              ALT + G → “Create Ledger”.
            </div>

            <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <strong>Example 3: Check Stock Summary</strong><br />
              ALT + G → “Stock Summary”.
            </div>

          </div>
        </section>

        {/* SUMMARY */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Summary — TallyPrime Navigation
          </h2>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Gateway is the central control panel of TallyPrime.</li>
            <li>“Go To” makes all navigation extremely fast.</li>
            <li>Drill-down helps access detailed data instantly.</li>
            <li>Shortcuts dramatically increase productivity.</li>
            <li>Multitasking allows smooth switching between screens.</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            © Coder & AccoTax — Professional TallyPrime Course  
            Topic by Sukanta Hui
          </p>
        </footer>

      </div>
    );
  }
}
