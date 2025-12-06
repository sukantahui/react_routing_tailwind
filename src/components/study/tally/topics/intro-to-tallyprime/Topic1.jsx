import React, { Component } from "react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">

        {/* MAIN HEADING */}
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 2 — Differences: Tally ERP 9 vs TallyPrime
        </h1>

        {/* INTRO */}
        <section className="space-y-4">
          <p className="text-sm leading-relaxed">
            TallyPrime is the newest and most advanced version of Tally’s
            accounting and business management software. Although Tally ERP 9
            has been widely used for over a decade, TallyPrime offers a modern
            interface, faster performance, simplified workflows, and improved
            reporting features.
          </p>

          <p className="text-sm leading-relaxed">
            This topic explains the key differences between{" "}
            <strong>Tally ERP 9</strong> and <strong>TallyPrime</strong> with
            practical examples to help you understand why most businesses are now
            shifting to TallyPrime.
          </p>
        </section>

        {/* SECTION — COMPARISON TABLE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            1. Side-by-Side Comparison
          </h2>

          <table className="w-full text-sm border border-slate-700 bg-slate-800 rounded-xl overflow-hidden">
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
                <td className="p-2 border border-slate-700">Text-heavy, cluttered</td>
                <td className="p-2 border border-slate-700">Clean, modern UI</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Navigation</td>
                <td className="p-2 border border-slate-700">Deep menu hierarchy</td>
                <td className="p-2 border border-slate-700">Go To (ALT + G) universal navigation</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Multitasking</td>
                <td className="p-2 border border-slate-700">Limited</td>
                <td className="p-2 border border-slate-700">Open multiple screens easily</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Search</td>
                <td className="p-2 border border-slate-700">Not available</td>
                <td className="p-2 border border-slate-700">Global search (reports, masters, vouchers)</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Reporting</td>
                <td className="p-2 border border-slate-700">Less dynamic</td>
                <td className="p-2 border border-slate-700">Filter-driven, drill-down enhanced</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">GST</td>
                <td className="p-2 border border-slate-700">Basic features</td>
                <td className="p-2 border border-slate-700">Advance GST reports & e-Invoice ready</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Performance</td>
                <td className="p-2 border border-slate-700">Slower on large data</td>
                <td className="p-2 border border-slate-700">Optimized for speed</td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Learning Curve</td>
                <td className="p-2 border border-slate-700">Steeper</td>
                <td className="p-2 border border-slate-700">Beginner-friendly</td>
              </tr>

            </tbody>
          </table>
        </section>

        {/* SECTION — UI & NAVIGATION DIFFERENCE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            2. Updated Interface & Improved Workflow
          </h2>

          <p className="text-sm leading-relaxed">
            TallyPrime introduces a much cleaner and visually appealing interface.
            The top bar now includes easy access to company info, search, and
            navigation tools.
          </p>

          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-sm">
            <strong>Example:</strong>  
            In Tally ERP 9, to open Balance Sheet → Gateway of Tally → Reports → Balance Sheet.  
            In TallyPrime, press <strong>ALT + G</strong> and type “Balance Sheet” — open instantly.
          </div>
        </section>

        {/* SECTION — SEARCH & GO TO */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            3. “Go To” Search — A Major Upgrade
          </h2>

          <p className="text-sm leading-relaxed">
            One of the biggest improvements in TallyPrime is the <strong>Go To</strong> bar
            which allows you to jump directly to:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Any report</li>
            <li>Any voucher</li>
            <li>Any master (ledger, stock item)</li>
            <li>Configuration screens</li>
            <li>Settings</li>
          </ul>

          <div className="p-3 text-sm bg-slate-800 border border-slate-700 rounded-lg">
            Press <strong>ALT + G</strong> → type “Day Book” → open immediately.
          </div>
        </section>

        {/* SECTION — MULTITASKING */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            4. Multitasking & Smooth Switching
          </h2>

          <p className="text-sm leading-relaxed">
            TallyPrime allows you to open multiple screens and switch between them
            without closing the current task. This was not possible efficiently in
            Tally ERP 9.
          </p>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm">
            <strong>Example Workflow:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Entering a Sales voucher</li>
              <li>Need to check Stock Summary → Press ALT+G</li>
              <li>Check availability</li>
              <li>Return back to voucher and continue entry</li>
            </ul>
          </div>
        </section>

        {/* SECTION — REPORTING */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            5. Smarter & Faster Reporting
          </h2>

          <p className="text-sm">
            Reports in TallyPrime are redesigned with:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Inline filters</li>
            <li>Better column management</li>
            <li>Instant drill-down</li>
            <li>Auto-view of related details</li>
          </ul>

          <p className="text-sm">
            GST reports, especially GSTR-1 and GSTR-3B, are more detailed and user-friendly.
          </p>
        </section>

        {/* SECTION — PRINTING */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            6. Enhanced Printing & Invoice Customization
          </h2>

          <p className="text-sm">
            TallyPrime provides modern invoice formats and more control over:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Logo placement</li>
            <li>Address formatting</li>
            <li>GST details</li>
            <li>Bank details</li>
            <li>Multiple invoice formats</li>
          </ul>

          <p className="text-sm">
            The preview screen has improved readability and layout.
          </p>
        </section>

        {/* SECTION — PERFORMANCE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            7. Performance Improvements
          </h2>

          <p className="text-sm">
            TallyPrime is optimized for:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Large company database</li>
            <li>Faster loading of reports</li>
            <li>Quick voucher entry</li>
          </ul>

          <p className="text-sm">
            File corruption issues are significantly reduced.
          </p>
        </section>

        {/* SUMMARY */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Summary — Why Choose TallyPrime?
          </h2>

          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>Cleaner UI</li>
              <li>Go-To Navigation makes everything faster</li>
              <li>Better multitasking</li>
              <li>Improved reporting</li>
              <li>Better GST & compliance tools</li>
              <li>Ideal for both beginners & professionals</li>
            </ul>
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
