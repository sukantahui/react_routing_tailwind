import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Shield, Lock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";
import pythonCode from "./topic11_files/firewall_acl_sim.py?raw";

export default function Topic11() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 11
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Defensive Countermeasures
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Defense: Firewalls, Cookies, HTTPS &amp; Hackers vs Crackers
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore essential defensive controls protecting enterprise networks. Master Hardware vs Software Firewalls and Packet Filtering ACLs, dissect HTTP Cookies and privacy risks, and clearly contrast Ethical Hackers (White Hat) with Malicious Crackers (Black Hat).
            </p>
          </div>
        </div>

        {/* 2. Real-World Analogy */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
            <Zap size={18} />
            <span>Real-World Pedagogical Analogy</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Think of an exclusive gated community: a <strong>Firewall</strong> is the security guard booth at the main gate. The guard carries a written visitor guestlist (Access Control List): if your ID and license plate match an allowed home (allowed IP and port), the barrier raises; if you are carrying unauthorized items or come from an unknown address, you are turned away. An <strong>Ethical Hacker</strong> is a professional locksmith hired by the homeowner to test whether their window locks can be picked; a <strong>Cracker</strong> is a burglar who breaks through the window at 2 AM to steal jewelry!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Defensive Architecture */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Shield size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Firewall Architectures &amp; Cookie Security</h2>
              <p className="text-xs text-slate-400">Perimeter filtering, stateful tracking, and session privacy</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">Hardware vs Software Firewalls</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Hardware Firewall:</strong> Dedicated perimeter appliance (Cisco, Fortinet). Protects entire subnets before packets enter the LAN.</li>
                <li><strong>Software Firewall:</strong> Installed directly on host endpoints (Windows Defender). Protects individual workstations from internal peer attacks.</li>
                <li><strong>Packet Filtering:</strong> Matches IP, port, and protocol against ACL rules.</li>
                <li><strong>Stateful Inspection (SPI):</strong> Tracks active session handshakes dynamically.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">Cookies &amp; Web Security</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li><strong>Session Cookies:</strong> Kept in memory; deleted when browser exits.</li>
                <li><strong>Persistent Cookies:</strong> Saved on disk until expiration timestamp.</li>
                <li><strong>HttpOnly Flag:</strong> Shields session tokens from JavaScript XSS theft.</li>
                <li><strong>Third-Party Cookies:</strong> Used by advertisers for cross-site behavioral tracking.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Lock size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Firewall ACL Packet Filter Simulator</h2>
              <p className="text-xs text-slate-400">Evaluate packet acceptance or rejection against Access Control Rules</p>
            </div>
          </div>
          <PythonFileLoader
            filename="firewall_acl_sim.py"
            code={pythonCode}
            description="Python simulation parsing incoming packets and applying Access Control List rules (ALLOW/DENY) with Default Deny enforcement."
          />
        </div>

        {/* 5. Comprehensive Comparison Matrix */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: Ethical Hacker vs Cracker</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Comparison Parameter</th>
                  <th className="p-3">Ethical Hacker (White Hat)</th>
                  <th className="p-3">Cracker (Black Hat)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Authorization &amp; Consent</td>
                  <td className="p-3 font-bold text-emerald-400">Explicit written legal permission</td>
                  <td className="p-3 font-bold text-rose-400">Unauthorized / Illegal penetration</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Intent &amp; Motivation</td>
                  <td className="p-3 text-emerald-400">Defensive: Discover and patch vulnerabilities</td>
                  <td className="p-3 text-rose-400">Malicious: Extortion, data theft, destruction</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Disclosure Policy</td>
                  <td className="p-3">Responsible private reporting to vendor</td>
                  <td className="p-3">Exploits flaw or sells on dark web markets</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Legal Standing</td>
                  <td className="p-3 text-emerald-400">Lawful profession (Penetration Tester)</td>
                  <td className="p-3 text-rose-400">Criminal activity punishable under IT Act</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Defense-in-Depth Model */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: Defense-in-Depth Layered Architecture</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Perimeter Defense:</strong> Hardware firewall at internet gateway blocks unauthorized ports and enforces Default Deny.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Transit Security:</strong> Mandate HTTPS (TLS) on Port 443 for all web portals, ensuring encrypted transmission and certificate validation.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Endpoint Hardening:</strong> Host software firewalls, automated antivirus signature updates, and Multi-Factor Authentication (MFA).
              </div>
            </div>
          </div>
        </div>

        {/* 7. Common Pitfalls & Misconceptions */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Common Board Examination Pitfalls &amp; Misconceptions</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Misconception:</strong> Thinking a Firewall is a physical wall made of concrete or bricks. In CS, it is a hardware device or software program that filters packets.</li>
            <li><strong>Pitfall:</strong> Using the term 'Hacker' exclusively to mean cybercriminals. Always differentiate: Hackers can be ethical white-hat security professionals; Crackers are criminals with malicious intent.</li>
            <li><strong>Pitfall:</strong> Believing cookies are executable virus programs. Cookies are passive text files and cannot execute code.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE board questions asking for the difference between a Hacker and a Cracker, state clearly: 'A Hacker is an expert who tests and audits systems with legal authorization to find and patch security flaws; a Cracker breaks into systems without authorization with malicious intent to steal or damage data.' In case studies, always suggest a Firewall for gateway network protection."
        />

        {/* 9. CBSE Board Examination Practice & FAQs */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Practice &amp; FAQs</h2>
              <p className="text-xs text-slate-400">25 Authentic Questions with Complete Explanations &amp; Hints</p>
            </div>
          </div>
          <FAQTemplate questions={questions} />
        </div>

        {/* 10. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_network_defense_notes.txt"
          title="Download Topic 11 Revision Notes"
        />

      </div>
    </div>
  );
}
