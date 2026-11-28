import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Compass, Globe
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/dns_url_ip_sim.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 8
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Addressing &amp; Identity
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Addressing Schemes: Domain Name System (DNS), URL, and IP Addresses
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master how resources and devices are located on the global Internet. Explore DNS namespace hierarchy, complete URL component dissection, 32-bit IPv4 vs 128-bit IPv6 addressing, private IP ranges (RFC 1918), and DHCP auto-configuration.
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
            Imagine you want to visit your friend Amit. In your mind, you remember him by his human name <strong>"Amit Sharma" (Domain Name)</strong>. But your GPS device cannot route to a human name; it requires exact mathematical coordinates <strong>"22.7632° N, 88.3756° E" (IP Address)</strong>. To bridge this gap, your smartphone uses a contact phonebook <strong>(DNS Server)</strong> that instantly translates "Amit Sharma" into his GPS coordinates. When you arrive at his apartment building, the full address specifying floor, flat number, and room <strong>(URL)</strong> guides you directly to his study room!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Technical Specifications */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Compass size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Anatomy of a Uniform Resource Locator (URL)</h2>
              <p className="text-xs text-slate-400">Complete structural breakdown as tested in CBSE Board Exams</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/90 rounded-2xl border border-blue-500/30 font-mono text-xs text-blue-300 overflow-x-auto">
            https://www.cbse.gov.in:443/exams/datesheet.html?year=2026#sectionA
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-blue-400">1. Scheme / Protocol</strong>
              <p><code>https://</code> tells the browser to encrypt communications using TLS on Port 443.</p>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-emerald-400">2. Host / Domain Name</strong>
              <p><code>www.cbse.gov.in</code> identifies the server. Port <code>:443</code> is the network socket.</p>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-purple-400">3. Path &amp; Query String</strong>
              <p><code>/exams/datesheet.html</code> is the file path; <code>?year=2026</code> passes parameters.</p>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Globe size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">URL Parser &amp; DNS Resolution Simulator</h2>
              <p className="text-xs text-slate-400">Simulate URL decomposition and recursive DNS lookup</p>
            </div>
          </div>
          <PythonFileLoader
            filename="dns_url_ip_sim.py"
            code={pythonCode}
            description="Python simulation parsing URL components and walking through the recursive DNS lookup tree (Root -> TLD -> Authoritative)."
          />
        </div>

        {/* 5. IPv4 vs IPv6 Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: IPv4 vs IPv6</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Feature</th>
                  <th className="p-3">IPv4 (Internet Protocol v4)</th>
                  <th className="p-3">IPv6 (Internet Protocol v6)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Address Size</td>
                  <td className="p-3 font-mono text-amber-400">32 bits (4 bytes)</td>
                  <td className="p-3 font-mono text-emerald-400">128 bits (16 bytes)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Format &amp; Notation</td>
                  <td className="p-3">4 decimal octets separated by dots (e.g. 192.168.1.1)</td>
                  <td className="p-3">8 hexadecimal quartets separated by colons</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Total Address Pool</td>
                  <td className="p-3 text-rose-400">~4.3 Billion (2^32) - Exhausted</td>
                  <td className="p-3 text-emerald-400">~3.4 x 10^38 (2^128) - Virtually Infinite</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Configuration Method</td>
                  <td className="p-3">Manual or DHCP</td>
                  <td className="p-3 text-emerald-400">Stateless Auto-Configuration (SLAAC) or DHCPv6</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Private Address Range</td>
                  <td className="p-3 font-mono">10.x.x.x, 172.16.x.x, 192.168.x.x</td>
                  <td className="p-3 font-mono">Unique Local Addresses (fc00::/7)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step DNS Resolution Workflow */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: Recursive DNS Resolution Journey</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Local Cache Check:</strong> Browser checks its local DNS cache and OS hosts file. If not found, it queries the local ISP recursive resolver.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Root Server Query:</strong> Recursive resolver queries one of the 13 Root Servers (<code>.</code>). The Root Server refers the resolver to the <code>.in</code> TLD servers.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">TLD Server Query:</strong> The <code>.in</code> TLD server refers the resolver to the authoritative nameserver for <code>cbse.gov.in</code>.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <strong className="text-white">Authoritative Answer:</strong> The authoritative server returns the IP address <code>164.100.107.50</code>. The resolver caches the IP and hands it back to the client browser.
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
            <li><strong>Misconception:</strong> Writing an octet greater than 255 in IPv4 (e.g. <code>192.168.1.300</code>). In IPv4, each octet is 8 bits and can only range between 0 and 255.</li>
            <li><strong>Pitfall:</strong> Confusing Domain Name with URL. A domain name (e.g., <code>cbse.gov.in</code>) is just one part of the URL (e.g., <code>https://cbse.gov.in/index.html</code>).</li>
            <li><strong>Pitfall:</strong> Forgetting the expansion of DNS: Domain Name System (NOT Domain Name Server).</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE examinations, questions often ask students to break down a URL into its constituent parts. Memorize the 3 key components: (1) Protocol (http/https/ftp), (2) Domain/Host (server name), and (3) File Path (location of the file). For DNS questions, define it precisely as the system that maps human-readable domain names to numerical IP addresses."
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
          filename="cbse_class12_addressing_schemes_notes.txt"
          title="Download Topic 8 Revision Notes"
        />

      </div>
    </div>
  );
}
