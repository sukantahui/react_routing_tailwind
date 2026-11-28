import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Lock, Globe
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import pythonCode from "./topic2_files/http_vs_https_sim.py?raw";

export default function Topic2() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 2
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Web Application Protocols
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Web Protocols: Hypertext Transfer Protocol (HTTP) vs Secure HTTP (HTTPS)
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Understand the core mechanics of hypermedia transmission. Contrast unencrypted HTTP (Port 80) with cryptographic HTTPS (Port 443), examine SSL/TLS handshakes, HTTP request methods (GET vs POST), and key status codes.
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
            Sending sensitive information over plain <strong>HTTP</strong> is like writing your credit card PIN number on an open postcard: any postal worker, sorter, or neighbor can read it as it travels. In contrast, sending data over <strong>HTTPS</strong> is like placing the message inside an indestructible, biometric titanium briefcase locked with an unbreakable cipher that can only be opened by the recipient's verified master key.
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Security Architecture */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Globe size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">HTTP vs HTTPS Architecture</h2>
              <p className="text-xs text-slate-400">Security primitives, port assignments, and data flow</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-rose-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <AlertTriangle size={18} />
                <h3>HTTP (Insecure Cleartext)</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Default Port: <strong>TCP Port 80</strong>.</li>
                <li>Transmits requests and responses in readable plain ASCII text.</li>
                <li>Completely vulnerable to packet sniffing, eavesdropping, and Man-in-the-Middle (MitM) attacks.</li>
                <li>No server identity verification: vulnerable to DNS spoofing and phishing clones.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Lock size={18} />
                <h3>HTTPS (Encrypted via SSL/TLS)</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Default Port: <strong>TCP Port 443</strong>.</li>
                <li>Encrypts all application data using modern TLS ciphers (AES-GCM / ChaCha20).</li>
                <li>Provides <strong>Data Integrity</strong>: tamper-proof cryptographic checksums (HMAC).</li>
                <li>Provides <strong>Server Authentication</strong>: verified by trusted Certificate Authorities (CAs).</li>
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
              <h2 className="text-xl font-bold text-white">Packet Sniffing Interception Simulator</h2>
              <p className="text-xs text-slate-400">Observe cleartext HTTP vulnerability vs encrypted TLS payload</p>
            </div>
          </div>
          <PythonFileLoader
            filename="http_vs_https_sim.py"
            code={pythonCode}
            description="Python simulation contrasting packet inspection on port 80 vs cryptographic obfuscation on port 443."
          />
        </div>

        {/* 5. Comprehensive Comparison Matrix */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comprehensive Matrix: HTTP vs HTTPS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Comparison Parameter</th>
                  <th className="p-3">HTTP (Hypertext Transfer Protocol)</th>
                  <th className="p-3">HTTPS (HTTP Secure)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Standard TCP Port</td>
                  <td className="p-3 font-mono text-amber-400">Port 80</td>
                  <td className="p-3 font-mono text-emerald-400">Port 443</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Encryption Layer</td>
                  <td className="p-3 text-rose-400">None (Cleartext transmission)</td>
                  <td className="p-3 text-emerald-400">SSL / TLS Cryptographic Sublayer</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Digital Certificate Required?</td>
                  <td className="p-3">No certificate needed</td>
                  <td className="p-3 text-emerald-400">Mandatory (Signed by a trusted CA)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">URL Prefix &amp; Visual Cue</td>
                  <td className="p-3 font-mono text-rose-400">http:// (Not Secure banner)</td>
                  <td className="p-3 font-mono text-emerald-400">https:// (Closed padlock icon)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">CBSE Exam Recommended Use</td>
                  <td className="p-3">Public informational static web pages</td>
                  <td className="p-3 text-emerald-400">Banking, e-commerce, user logins, student portals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step GET vs POST Breakdown */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: HTTP Request Methods (GET vs POST)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-blue-400">HTTP GET Method:</strong>
              <p>Parameters are appended directly to the URL query string: <code>/search?query=cbse</code>.</p>
              <p className="text-slate-400">Visible in browser history, bookmarks, and server logs. Limited URL length (~2048 chars). Ideal for searches and page retrievals.</p>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-emerald-400">HTTP POST Method:</strong>
              <p>Parameters are enclosed securely inside the HTTP Request Message Body, not in the URL.</p>
              <p className="text-slate-400">Not cached or bookmarked. Unlimited data payload size. Mandatory for login passwords, file uploads, and credit card payments.</p>
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
            <li><strong>Misconception:</strong> Thinking HTTPS is a completely separate protocol from HTTP. HTTPS is simply standard HTTP commands executed inside an encrypted SSL/TLS tunnel.</li>
            <li><strong>Pitfall:</strong> Confusing port numbers: Port 80 is HTTP; Port 443 is HTTPS. Reversing them in a board exam loses the mark.</li>
            <li><strong>Pitfall:</strong> Assuming HTTPS prevents website hacking. HTTPS only encrypts data in transit over the network; it does not protect against weak passwords or SQL injection vulnerabilities on the server.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In Section D case-study questions, examiners frequently ask: 'Which protocol should be used for the school's online fee payment portal, and why?' Your answer MUST state: 'HTTPS (Hypertext Transfer Protocol Secure) because it encrypts sensitive financial data and passwords using SSL/TLS, preventing interception over public networks.'"
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
          filename="cbse_class12_http_vs_https_notes.txt"
          title="Download Topic 2 Revision Notes"
        />

      </div>
    </div>
  );
}
