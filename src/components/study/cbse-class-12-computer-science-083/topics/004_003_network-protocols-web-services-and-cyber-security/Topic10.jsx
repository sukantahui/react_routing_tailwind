import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, ShieldAlert, Skull
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";
import pythonCode from "./topic10_files/ddos_attack_sim.py?raw";

export default function Topic10() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 10
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                Active Cyber Attacks
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cyber Attacks: Phishing, Denial of Service (DoS/DDoS) &amp; Spoofing
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Examine the execution mechanics and defenses against major cyber attacks. Understand Phishing (social engineering deception), contrast single-source DoS with distributed botnet DDoS attacks, and dissect IP, Email, and DNS Spoofing.
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
            Imagine a popular physical pizza shop: <strong>Phishing</strong> is like a con artist dressing in an identical pizza delivery uniform, knocking on your door, and asking you to sign for a free pizza with your bank card PIN number. A <strong>DDoS attack</strong> is like that con artist hiring 5,000 pranksters to storm into the pizza shop all at once, crowding the counter and shouting fake orders, completely blocking real hungry paying customers from ever reaching the cash register!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Attack Classification */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
              <Skull size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Three Major Cyber Attack Vectors</h2>
              <p className="text-xs text-slate-400">Attack mechanics, indicators, and mitigation protocols</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-rose-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-rose-400">1. Phishing &amp; Social Eng.</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>Mechanism:</strong> Fraudulent emails/clone sites masquerading as trusted brands.</li>
                <li><strong>Goal:</strong> Steals credentials, OTPs, and credit card numbers.</li>
                <li><strong>Variants:</strong> Spear Phishing (targeted), Whaling (executives), Smishing (SMS).</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-amber-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-amber-400">2. DoS vs DDoS</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>DoS:</strong> Single attacking host flooding target; easily blocked by IP.</li>
                <li><strong>DDoS:</strong> Thousands of distributed zombie botnet nodes attacking simultaneously.</li>
                <li><strong>Impact:</strong> Depletes server CPU, memory, and bandwidth, causing 503 errors.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-purple-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-purple-400">3. Spoofing Attacks</h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong>IP Spoofing:</strong> Forging packet header source IP addresses.</li>
                <li><strong>Email Spoofing:</strong> Forging the sender <code>From:</code> address.</li>
                <li><strong>DNS Spoofing:</strong> Poisoning resolver cache to redirect users to imposter sites.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <RefreshCw size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">DDoS Attack &amp; Mitigation Simulator</h2>
              <p className="text-xs text-slate-400">Observe botnet server exhaustion and cloud traffic scrubbing</p>
            </div>
          </div>
          <PythonFileLoader
            filename="ddos_attack_sim.py"
            code={pythonCode}
            description="Python simulation demonstrating server capacity exhaustion during botnet flood and edge mitigation."
          />
        </div>

        {/* 5. Comprehensive Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: DoS vs DDoS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Comparison Parameter</th>
                  <th className="p-3">DoS (Denial of Service)</th>
                  <th className="p-3">DDoS (Distributed Denial of Service)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Attacking Sources</td>
                  <td className="p-3 font-bold text-amber-400">Single system (One IP address)</td>
                  <td className="p-3 font-bold text-rose-500">Multiple distributed systems (Botnet of thousands)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Traffic Volume Generated</td>
                  <td className="p-3">Limited by single connection speed</td>
                  <td className="p-3 text-rose-400 font-bold">Massive (Tens of Gbps to Terabits/sec)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Defense &amp; Mitigation</td>
                  <td className="p-3 text-emerald-400">Easy (Block single IP in firewall)</td>
                  <td className="p-3 text-rose-400">Very Difficult (Requires Anycast cloud scrubbing)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Traceability of Attacker</td>
                  <td className="p-3 text-emerald-400">Relatively easy to trace</td>
                  <td className="p-3 text-rose-400">Extremely hard; hidden behind global zombies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Phishing Defense Checklist */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: Anatomy of a Phishing Email Inspection</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Check the Sender Domain:</strong> Does the actual email address match the official organization domain? (e.g., <code>support@cbse-verify-portal.biz</code> vs <code>cbse.gov.in</code>).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Evaluate Urgency &amp; Threats:</strong> Phishing emails create panic: <em>"Your account will be terminated in 24 hours unless you click here immediately!"</em>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Hover over Hyperlinks:</strong> Hover (without clicking) to inspect the destination URL preview. If the text says <code>www.sbi.co.in</code> but points to <code>http://185.22.45.10/login</code>, it is fraudulent!
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
            <li><strong>Misconception:</strong> Thinking DoS and DDoS are identical. In a board exam, you must clearly highlight the <strong>distributed nature and botnet coordination</strong> in DDoS.</li>
            <li><strong>Pitfall:</strong> Confusing Phishing with Pharming. Phishing requires the victim to click a deceptive link; Pharming manipulates DNS so that even entering the correct URL redirects the victim.</li>
            <li><strong>Pitfall:</strong> Believing strong passwords stop DDoS. DDoS targets server bandwidth and availability, not password guessing.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When answering questions on Phishing in CBSE examinations, always define it as: 'A fraudulent social engineering technique used to steal sensitive personal information like passwords and bank credentials by disguising as a trustworthy entity.' For DDoS, emphasize that it uses a distributed network of zombie computers (botnet) to crash a server by flooding it with illegitimate requests."
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
          filename="cbse_class12_cyber_attacks_notes.txt"
          title="Download Topic 10 Revision Notes"
        />

      </div>
    </div>
  );
}
