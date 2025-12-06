import React, { Component } from "react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 1 — Introduction to TallyPrime
        </h1>

        {/* SECTION 1 — WHAT IS TALLYPRIME */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            What is TallyPrime?
          </h2>

          <p className="text-sm leading-relaxed text-slate-300">
            <strong>TallyPrime</strong> is the latest and most advanced business
            management software by Tally Solutions Pvt. Ltd. It is used by:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
            <li>Small & medium businesses</li>
            <li>Accountants & bookkeepers</li>
            <li>Tax practitioners & GST consultants</li>
            <li>Retailers, wholesalers, manufacturers</li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-300">
            TallyPrime helps manage:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
            <li>Accounting & finance</li>
            <li>Inventory management</li>
            <li>GST billing & return preparation</li>
            <li>Banking & reconciliation</li>
            <li>Payroll & employee records</li>
          </ul>

          <p className="text-sm leading-relaxed">
            It is known for its speed, simplicity, and reliability. Even
            beginners can learn it quickly because of its clean menu structure
            and F-key navigation system.
          </p>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm">
            <strong>Example real-life usage:</strong>  
            A shopkeeper can record sales, print GST invoices, check daily profit,
            and generate tax reports — all within TallyPrime.
          </div>
        </section>

        {/* SECTION 2 — DIFFERENCE BETWEEN TALLY ERP9 VS TALLYPRIME */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Tally ERP 9 vs TallyPrime (Key Differences)
          </h2>

          <p className="text-sm text-slate-300">
            TallyPrime is not just an upgraded UI — it is a complete redesign
            that improves workflow, reporting, and usability.
          </p>

          <table className="w-full text-sm border border-slate-700 bg-slate-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-900 text-sky-300">
                <th className="p-2 border border-slate-700">Feature</th>
                <th className="p-2 border border-slate-700">Tally ERP 9</th>
                <th className="p-2 border border-slate-700">TallyPrime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-700">Interface</td>
                <td className="p-2 border border-slate-700">Old, complex</td>
                <td className="p-2 border border-slate-700">Modern, simplified</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Navigation</td>
                <td className="p-2 border border-slate-700">Nested menus</td>
                <td className="p-2 border border-slate-700">
                  Universal search (Go To)
                </td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">
                  Multitasking
                </td>
                <td className="p-2 border border-slate-700">Not easy</td>
                <td className="p-2 border border-slate-700">
                  ALT + G for switching tasks instantly
                </td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">
                  Accounting + Inventory
                </td>
                <td className="p-2 border border-slate-700">Separate menus</td>
                <td className="p-2 border border-slate-700">
                  Streamlined & integrated
                </td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Printing</td>
                <td className="p-2 border border-slate-700">
                  Limited formatting
                </td>
                <td className="p-2 border border-slate-700">
                  Enhanced, clean, customizable GST invoices
                </td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Speed</td>
                <td className="p-2 border border-slate-700">Slower</td>
                <td className="p-2 border border-slate-700">Faster & optimized</td>
              </tr>
            </tbody>
          </table>

          <div className="p-3 bg-slate-800 border border-slate-600 rounded-lg text-sm">
            <strong>Conclusion:</strong>  
            TallyPrime is easier to learn, faster to use, and more powerful for GST
            and business operations.
          </div>
        </section>

        {/* SECTION 3 — INSTALLING & ACTIVATING TALLYPRIME */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Installing & Activating TallyPrime
          </h2>

          <p className="text-sm text-slate-300">
            You can download TallyPrime from the official website:
          </p>

          <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-sm">
            <strong>Website:</strong> www.tallysolutions.com
          </div>

          <h3 className="text-lg font-semibold text-sky-400">
            Installation Steps:
          </h3>

          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
            <li>Download the TallyPrime installer.</li>
            <li>Run the setup file (.exe).</li>
            <li>Select the installation directory.</li>
            <li>Choose “Enable Auto Updates”.</li>
            <li>Click Install.</li>
          </ol>

          <h3 className="text-lg font-semibold text-sky-400">
            Activation Options:
          </h3>

          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
            <li>Activate New License</li>
            <li>Reactivate Existing License</li>
            <li>Use Educational Mode (Free)</li>
          </ul>

          <p className="text-sm text-slate-300">
            <strong>Educational Mode</strong> allows full practice but dates are
            restricted to 1st & 2nd, any month.
          </p>
        </section>

        {/* SECTION 4 — TALLY GATEWAY & NAVIGATION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Gateway of Tally & Menu Navigation
          </h2>

          <p className="text-sm text-slate-300">
            The **Gateway of Tally** is the home screen of TallyPrime. All modules
            (Accounts, Inventory, Reports) begin from here.
          </p>

          <h3 className="text-lg text-sky-400 font-semibold">Key areas:</h3>

          <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
            <li>Top Bar – Company name, configuration icons</li>
            <li>Left Panel – Primary menu options</li>
            <li>Right Panel – Actions applicable to current screen</li>
            <li>Go To (ALT+G) – Universal search & navigation</li>
            <li>F-key System – Shortcut-based entry</li>
          </ul>

          <div className="p-3 bg-slate-800 rounded-lg text-sm">
            Example: Press <strong>ALT + G</strong> → type <strong>Balance Sheet</strong> → instantly open report.
          </div>
        </section>

        {/* SECTION 5 — COMPANY CREATION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Company Creation in TallyPrime
          </h2>

          <p className="text-sm leading-relaxed">
            To create a new company in TallyPrime:
          </p>

          <ol className="list-decimal list-inside text-sm space-y-1 text-slate-300">
            <li>Open TallyPrime → Select <strong>Create Company</strong></li>
            <li>Enter Company Name, Address, State & PIN</li>
            <li>Choose Country & Statutory features (GST)</li>
            <li>Set Financial Year</li>
            <li>Enable Maintain Accounts / Inventory</li>
            <li>Save (CTRL + A)</li>
          </ol>

          <div className="bg-slate-800 border border-slate-700 p-3 text-sm rounded-lg">
            <strong>Important:</strong>  
            Financial year in India runs from 1 April to 31 March.
          </div>
        </section>

        {/* SECTION 6 — BASIC CONFIGURATIONS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Setting up Basic Configurations
          </h2>

          <p className="text-sm">
            Configurations help customize TallyPrime based on business needs.
          </p>

          <h3 className="text-lg text-sky-400 font-semibold">Useful Configurations:</h3>

          <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
            <li>Enable GST → Set GSTIN, registration type</li>
            <li>Enable Inventory → Stock Items, Units, Godowns</li>
            <li>Enable Payroll → Salary processing</li>
            <li>Enable Cost Centres → Departmental analysis</li>
            <li>Enable Security → User roles & password control</li>
          </ul>

          <div className="p-3 bg-slate-800 rounded-lg text-sm">
            Tip:  
            To enable features, open **F11 Features** or press **F12 Configure**
            depending on the screen.
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            © Coder & AccoTax — TallyPrime Professional Training  
            Tutorial created by Sukanta Hui  
          </p>
        </footer>

      </div>
    );
  }
}
