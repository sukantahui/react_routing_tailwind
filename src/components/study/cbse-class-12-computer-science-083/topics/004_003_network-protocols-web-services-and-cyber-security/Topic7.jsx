import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Globe, Server
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import pythonCode from "./topic7_files/web_architecture_sim.py?raw";

export default function Topic7() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 7
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Web Systems &amp; Markup
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Web Architecture: WWW, HTML, XML, Web Browsers, Web Servers &amp; Web Hosting
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Explore the foundational architecture of the World Wide Web. Contrast the Internet with the Web, analyze HTML vs XML data representations, understand client-server dynamics between web browsers and servers, and evaluate web hosting tiers.
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
            Think of the <strong>Internet</strong> as a countrywide physical highway and railway network consisting of asphalt roads, traffic lights, and railway tracks. The <strong>World Wide Web (WWW)</strong> is one specific service that travels along those highways—like a fleet of courier delivery trucks transporting interlinked books and catalogs. <strong>HTML</strong> is the glossy printed layout of the book designed to catch your eye; <strong>XML</strong> is the raw warehouse inventory manifest packed inside the boxes containing pure structured product data.
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Markup Foundations */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Globe size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">HTML vs XML: Two Sides of Web Markup</h2>
              <p className="text-xs text-slate-400">Presentation layer vs data transport architecture</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">HTML (Display &amp; Presentation)</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Uses fixed, predefined tags (<code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;table&gt;</code>).</li>
                <li>Designed to format and present hypermedia graphically in web browsers.</li>
                <li>Case-insensitive (<code>&lt;P&gt;</code> equals <code>&lt;p&gt;</code>).</li>
                <li>Focuses strictly on <strong>how data looks</strong>.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">XML (Storage &amp; Data Interchange)</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Uses custom, user-defined extensible tags (<code>&lt;student&gt;</code>, <code>&lt;marks&gt;</code>).</li>
                <li>Designed to store, describe, and transport structured data across heterogeneous platforms.</li>
                <li>Strictly case-sensitive and requires closing tags for well-formedness.</li>
                <li>Focuses strictly on <strong>what data represents</strong>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Server size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Web Architecture &amp; XML Parser Simulator</h2>
              <p className="text-xs text-slate-400">Simulate HTTP request routing and XML structured data parsing</p>
            </div>
          </div>
          <PythonFileLoader
            filename="web_architecture_sim.py"
            code={pythonCode}
            description="Python simulation demonstrating DNS lookup, HTTP response retrieval, and XML DOM tree traversal."
          />
        </div>

        {/* 5. Web Hosting Tiers Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: Web Hosting Models</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Hosting Type</th>
                  <th className="p-3">Server Resource Allocation</th>
                  <th className="p-3">Control &amp; Root Access</th>
                  <th className="p-3">Cost &amp; Ideal Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Shared Hosting</td>
                  <td className="p-3 text-amber-400">Shared with dozens/hundreds of sites</td>
                  <td className="p-3 text-rose-400">No root access (cPanel only)</td>
                  <td className="p-3 text-emerald-400">Lowest cost; ideal for small blogs &amp; portfolio sites</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-blue-400">VPS (Virtual Private Server)</td>
                  <td className="p-3">Dedicated virtual CPU/RAM on partitioned server</td>
                  <td className="p-3 text-emerald-400">Full root/administrator access</td>
                  <td className="p-3">Moderate cost; growing businesses and web apps</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-purple-400">Dedicated Server</td>
                  <td className="p-3 text-emerald-400">100% of entire physical machine reserved</td>
                  <td className="p-3 text-emerald-400">Complete hardware &amp; OS control</td>
                  <td className="p-3 text-rose-400">High cost; large enterprise portals and banks</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-emerald-400">Cloud Hosting</td>
                  <td className="p-3 text-emerald-400">Dynamic clustering across data centers</td>
                  <td className="p-3 text-emerald-400">Elastic scaling on demand</td>
                  <td className="p-3">Pay-as-you-go; high traffic e-commerce &amp; CBSE board portals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Client-Server Request Cycle */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: The Web Request-Response Cycle</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">URL Entry:</strong> User types <code>https://cbse.gov.in/index.html</code> into Chrome.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">DNS Resolution:</strong> Browser queries DNS server to map domain to IP address (e.g. <code>164.100.107.50</code>).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">TCP Handshake &amp; TLS:</strong> Secure TCP connection established on Port 443 with cryptographic TLS certificate exchange.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <strong className="text-white">HTTP Request &amp; Response:</strong> Browser transmits <code>GET /index.html</code>. Web Server fetches document and returns <code>200 OK</code> with HTML/CSS.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">5</span>
              <div>
                <strong className="text-white">Browser Rendering:</strong> Rendering engine parses HTML into DOM tree, executes JavaScript, and displays the web page graphically.
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
            <li><strong>Misconception:</strong> Confusing the Internet with the World Wide Web. The Internet is the network of connected hardware; the Web is a software service of linked hypertext pages running over the Internet.</li>
            <li><strong>Pitfall:</strong> Thinking XML is a replacement for HTML. XML was not designed to replace HTML; they complement each other (XML carries data, HTML displays it).</li>
            <li><strong>Pitfall:</strong> Stating that XML tags are predefined. XML has NO predefined tags; tags are defined by the author.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In board examination questions comparing HTML and XML, state the classic two points: (1) HTML tags are predefined and used to display data; XML tags are user-defined and used to describe and transport data. (2) HTML is case-insensitive, while XML is strictly case-sensitive."
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
          filename="cbse_class12_web_architecture_notes.txt"
          title="Download Topic 7 Revision Notes"
        />

      </div>
    </div>
  );
}
