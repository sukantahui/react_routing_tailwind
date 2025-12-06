import React, { Component } from "react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">

        {/* MAIN HEADING */}
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 3 — Installing & Activating TallyPrime
        </h1>

        {/* INTRO */}
        <section className="space-y-4">
          <p className="text-sm">
            TallyPrime installation is simple, but understanding the correct
            setup, licensing options, and activation steps is essential for smooth
            operation. In this topic, you will learn how to install, activate,
            update, and troubleshoot TallyPrime.
          </p>

          <p className="text-sm">
            Whether you are using a **licensed version**, **multi-user setup**, or
            **educational mode**, this guide covers everything step-by-step.
          </p>
        </section>

        {/* DOWNLOAD SECTION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            1. Downloading TallyPrime
          </h2>

          <p className="text-sm">
            Visit the official Tally Solutions website to download the latest
            version of TallyPrime:
          </p>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm">
            <strong>Download Page:</strong>  
            https://tallysolutions.com/download/
          </div>

          <p className="text-sm">After downloading, you will see a file like:</p>

          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs">
            <code>TallyPrime_Setup.exe</code>
          </div>
        </section>

        {/* INSTALLATION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            2. Installing TallyPrime (Step-by-Step)
          </h2>

          <ul className="list-decimal list-inside space-y-2 text-sm">
            <li>Double-click on <strong>TallyPrime_Setup.exe</strong>.</li>
            <li>Click <strong>Install</strong> when the installer opens.</li>
            <li>Choose installation path (default recommended).</li>
            <li>Wait until files are copied and installation completes.</li>
            <li>Click <strong>Start TallyPrime</strong>.</li>
          </ul>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm">
            <strong>Recommended:</strong> Install in default directory for easier updates.  
            <br />
            <span className="text-sky-300">C:\Program Files\TallyPrime</span>
          </div>
        </section>

        {/* FIRST SCREEN */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            3. First Screen After Installation
          </h2>

          <p className="text-sm">
            When TallyPrime opens for the first time, you will see the
            <strong>“License Activation Screen”</strong>.
          </p>

          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            Options available:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Activate License</li>
              <li>Reactivate Existing License</li>
              <li>Use Educational Mode</li>
              <li>Work in Trial Mode</li>
            </ul>
          </div>
        </section>

        {/* LICENSE TYPES */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            4. Types of TallyPrime Licenses
          </h2>

          <table className="w-full text-sm border border-slate-700 bg-slate-800 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-900 text-sky-300">
                <th className="p-2 border border-slate-700">License Type</th>
                <th className="p-2 border border-slate-700">Use Case</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td className="p-2 border border-slate-700">Silver (Single User)</td>
                <td className="p-2 border border-slate-700">
                  For individual computers or small offices.
                </td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Gold (Multi User)</td>
                <td className="p-2 border border-slate-700">
                  Multiple users on LAN network.
                </td>
              </tr>

              <tr>
                <td className="p-2 border border-slate-700">Educational Mode</td>
                <td className="p-2 border border-slate-700">
                  Free mode for learning (restricted day-wise voucher entry).
                </td>
              </tr>

            </tbody>
          </table>
        </section>

        {/* ACTIVATION PROCESS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            5. Activating TallyPrime License
          </h2>

          <p className="text-sm">
            To activate your license, follow these steps:
          </p>

          <ul className="list-decimal list-inside text-sm space-y-2">
            <li>Select <strong>Activate License</strong>.</li>
            <li>Enter your <strong>Tally Serial Number</strong>.</li>
            <li>Enter the <strong>Activation Key</strong>.</li>
            <li>Enter your email ID (Tally.net account).</li>
            <li>You will receive an OTP — enter it.</li>
            <li>License gets activated and stored on your system.</li>
          </ul>

          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm">
            <strong>Important:</strong>  
            Your email ID becomes your official <strong>Tally Primary User</strong>.
          </div>
        </section>

        {/* EDUCATIONAL MODE */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            6. Using TallyPrime in Educational Mode
          </h2>

          <p className="text-sm">
            If you don’t have a license, choose:
          </p>

          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-sm">
            <strong>Use Educational Mode</strong>
          </div>

          <p className="text-sm">
            In this mode, you can open companies, view reports, and learn Tally,
            but voucher entry is restricted to:
          </p>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>1st, 2nd, and 31st day of any month</li>
          </ul>
        </section>

        {/* LICENSE REACTIVATION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            7. Reactivating an Existing License
          </h2>

          <p className="text-sm">
            If you reinstall Windows or move TallyPrime to another PC:
          </p>

          <div className="p-4 bg-slate-800 text-sm rounded-xl border border-slate-700">
            <ul className="list-decimal list-inside space-y-1">
              <li>Select <strong>Reactivate License</strong></li>
              <li>Enter registered Email ID</li>
              <li>Enter OTP</li>
            </ul>
          </div>

          <p className="text-sm">
            Your previous activation is restored instantly.
          </p>
        </section>

        {/* TROUBLESHOOTING */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            8. Common Activation Errors & Solutions
          </h2>

          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <strong>Error:</strong> “Unable to connect to Tally Gateway Server”  
              <br />
              ✔ Check Internet  
              <br />
              ✔ Allow TallyPrime through Firewall
            </div>

            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <strong>Error:</strong> “Invalid Email / Password”  
              <br />
              ✔ Use Tally.net registered email  
              <br />
              ✔ Reset password if needed
            </div>

            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <strong>Error:</strong> “License in use on another machine”  
              <br />
              ✔ Reactivate license on this PC  
              <br />
              ✔ Release license from Tally portal if required
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Summary — Installation & Activation
          </h2>

          <ul className="list-disc list-inside text-sm space-y-1">
            <li>TallyPrime installation is simple and quick.</li>
            <li>Activation requires Serial Number + Activation Key + Email.</li>
            <li>Go for Educational Mode if you don’t have a license.</li>
            <li>Reactivation is easy when moving to another PC.</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            © Coder & AccoTax — Professional TallyPrime Training  
            Created by Sukanta Hui  
          </p>
        </footer>

      </div>
    );
  }
}
