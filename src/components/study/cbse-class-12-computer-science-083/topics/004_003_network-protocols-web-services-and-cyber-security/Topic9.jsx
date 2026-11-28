import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Bug, ShieldAlert
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";
import pythonCode from "./topic9_files/malware_taxonomy_sim.py?raw";

export default function Topic9() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 9
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                Cyber Security &amp; Threats
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Network Security Threats: Malware (Virus, Worm, Trojan, Spyware, Ransomware)
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the foundational taxonomy of malicious software. Understand how Viruses (parasitic), Worms (autonomous self-replicators), Trojan Horses (deceptive masqueraders), Spyware/Keyloggers, and Ransomware operate, propagate, and harm digital systems.
            </p>
          </div>
        </div>

        {/* 2. Real-World Analogy */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <Zap size={18} />
            <span>Real-World Pedagogical Analogy</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Think of biological and tactical threats: a <strong>Computer Virus</strong> is like a biological flu virus that cannot reproduce on its own—it must attach to a host living cell (host executable program) and relies on people coughing (users sharing and executing files). A <strong>Computer Worm</strong> is like an invasive termite colony that spreads autonomously through underground pipes from house to house without any human action. A <strong>Trojan Horse</strong> is like a package labeled 'Free Gourmet Pizza' delivered to your doorstep that secretly contains a hidden thief who unlocks your windows at night!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Threat Taxonomy */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Core Malware Taxonomy</h2>
              <p className="text-xs text-slate-400">Exact definitions and behavioral criteria tested in CBSE examinations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-rose-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-rose-400">1. Computer Virus</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Requires Host File:</strong> Attaches to existing <code>.exe</code>, <code>.docm</code>, or scripts.</li>
                <li><strong>Requires User Action:</strong> Spreads only when the user executes the infected host file.</li>
                <li><strong>Harm:</strong> Corrupts data, alters code, formats drives.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-amber-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-amber-400">2. Computer Worm</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Standalone Program:</strong> Does not require a host program.</li>
                <li><strong>Autonomous Spread:</strong> Propagates automatically across networks by exploiting security flaws.</li>
                <li><strong>Harm:</strong> Consumes network bandwidth, drops backdoors, creates botnets.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-purple-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-purple-400">3. Trojan Horse</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Deceptive Masquerade:</strong> Disguises itself as useful, legitimate software.</li>
                <li><strong>NO Self-Replication:</strong> Does not attach to files or reproduce.</li>
                <li><strong>Harm:</strong> Secretly installs backdoors, rootkits, or keyloggers.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Bug size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Malware Taxonomy Diagnostic Simulator</h2>
              <p className="text-xs text-slate-400">Analyze binary metadata and categorize threats automatically</p>
            </div>
          </div>
          <PythonFileLoader
            filename="malware_taxonomy_sim.py"
            code={pythonCode}
            description="Python simulation analyzing binary characteristics (host attachment, autonomy, deception, encryption) to categorize malware."
          />
        </div>

        {/* 5. Comprehensive Comparison Matrix */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: Virus vs Worm vs Trojan vs Ransomware</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Malware Type</th>
                  <th className="p-3">Needs Host File?</th>
                  <th className="p-3">Self-Replicating?</th>
                  <th className="p-3">Propagation Method</th>
                  <th className="p-3">Primary Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-rose-400">Virus</td>
                  <td className="p-3 text-emerald-400">YES (Parasitic)</td>
                  <td className="p-3 text-emerald-400">YES</td>
                  <td className="p-3">Infected files, USBs, email attachments</td>
                  <td className="p-3">File deletion, boot sector corruption</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-amber-400">Worm</td>
                  <td className="p-3 text-rose-400">NO (Standalone)</td>
                  <td className="p-3 text-emerald-400">YES (Autonomous)</td>
                  <td className="p-3">Network port vulnerabilities, buffer overflow</td>
                  <td className="p-3">Bandwidth exhaustion, server crashes</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-purple-400">Trojan Horse</td>
                  <td className="p-3 text-rose-400">NO</td>
                  <td className="p-3 text-rose-400">NO (Zero replication)</td>
                  <td className="p-3">Social engineering, deceptive downloads</td>
                  <td className="p-3">Backdoor access, remote control, data theft</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-red-500">Ransomware</td>
                  <td className="p-3">Varies</td>
                  <td className="p-3">Often hybrid (Worm-like)</td>
                  <td className="p-3">Phishing emails, exploit kits, RDP brute force</td>
                  <td className="p-3">Military-grade data encryption, extortion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Ransomware Attack Chain */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: The Ransomware Attack Lifecycle</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Initial Breach:</strong> User clicks a malicious email attachment or an automated worm scans and exploits an unpatched port (e.g. SMB port 445).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Payload Execution &amp; Encryption:</strong> Ransomware contacts Command &amp; Control (C2) server, retrieves an asymmetric public key, and rapidly encrypts local files using AES-256.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Extortion Demand:</strong> Original files are deleted. A ransom note (e.g. <code>README_DECRYPT.txt</code>) locks the screen demanding cryptocurrency payment within 72 hours.
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
            <li><strong>Misconception:</strong> Saying Trojan Horses self-replicate. Trojans do NOT replicate. They rely entirely on deception to convince users to run them.</li>
            <li><strong>Pitfall:</strong> Confusing Viruses with Worms. Remember: A virus requires a host program and user execution; a worm is standalone and replicates automatically across networks.</li>
            <li><strong>Pitfall:</strong> Forgetting that Keyloggers are a specialized subset of Spyware designed specifically to capture typed keystrokes.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE Class 12 board examinations, examiners frequently ask students to differentiate between a Virus, a Worm, and a Trojan Horse. Ensure you state: (1) Virus requires a host program and human execution to replicate; (2) Worm is standalone and replicates automatically across networks without user action; (3) Trojan Horse masquerades as useful software and does not self-replicate."
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
          filename="cbse_class12_malware_threats_notes.txt"
          title="Download Topic 9 Revision Notes"
        />

      </div>
    </div>
  );
}
