import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Mail, Send
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";
import pythonCode from "./topic4_files/email_protocols_sim.py?raw";

export default function Topic4() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Electronic Mail Protocols
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Email Protocols: Simple Mail Transfer Protocol (SMTP) vs POP3 and IMAP
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the distinction between email sending (SMTP push) and email retrieval (POP3 vs IMAP pull). Understand port assignments, multi-device synchronization, MIME attachments, and standard command sequences.
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
            Think of the postal system: when you drop a letter into a red mailbox, the postal van picks it up and drives it across states to the destination post office. That dispatch van is <strong>SMTP (Push)</strong>. When the mail arrives at the recipient's local post office: under <strong>POP3</strong>, you walk into the post office, take your physical letters home, and the post office deletes its records. If your house catches fire, your letters are gone forever. Under <strong>IMAP</strong>, the post office acts as a digital bank vault that keeps your letters permanently safe; you can view them anytime through glass windows from your phone, laptop, or office tablet with folder states synchronized in real time!
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Architectural Model */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Mail size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Email Architecture: Push vs Pull</h2>
              <p className="text-xs text-slate-400">Division of labor across email transmission stages</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <Send size={18} />
                <h3>SMTP (Push Only)</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Port: <strong>25</strong> (Plain) / <strong>587/465</strong> (TLS).</li>
                <li>Transfers mail from client to outgoing server.</li>
                <li>Transfers mail between intermediate mail servers.</li>
                <li>Cannot retrieve incoming mail from mailboxes.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-amber-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Mail size={18} />
                <h3>POP3 (Download &amp; Delete)</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Port: <strong>110</strong> (Plain) / <strong>995</strong> (POP3S).</li>
                <li>Downloads all messages to local device.</li>
                <li>Deletes emails from server by default.</li>
                <li>Poor fit for multi-device environments.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <RefreshCw size={18} />
                <h3>IMAP (Centralized Sync)</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Port: <strong>143</strong> (Plain) / <strong>993</strong> (IMAPS).</li>
                <li>Stores messages centrally on the server.</li>
                <li>Real-time folder and flag synchronization.</li>
                <li>Preview headers without full attachment download.</li>
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
              <h2 className="text-xl font-bold text-white">Email Server Protocol Simulator</h2>
              <p className="text-xs text-slate-400">Execute SMTP mail delivery and IMAP mailbox synchronization</p>
            </div>
          </div>
          <PythonFileLoader
            filename="email_protocols_sim.py"
            code={pythonCode}
            description="Python simulation of SMTP command flow (HELO, MAIL FROM, RCPT TO, DATA) followed by IMAP multi-device mailbox synchronization."
          />
        </div>

        {/* 5. Comprehensive Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: SMTP vs POP3 vs IMAP</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Parameter</th>
                  <th className="p-3">SMTP</th>
                  <th className="p-3">POP3</th>
                  <th className="p-3">IMAP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Role / Direction</td>
                  <td className="p-3 font-bold text-blue-400">Push (Sending)</td>
                  <td className="p-3 font-bold text-amber-400">Pull (Retrieval)</td>
                  <td className="p-3 font-bold text-emerald-400">Pull &amp; Synchronize</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Standard Port</td>
                  <td className="p-3 font-mono">Port 25 (or 587)</td>
                  <td className="p-3 font-mono">Port 110</td>
                  <td className="p-3 font-mono">Port 143</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Encrypted Port</td>
                  <td className="p-3 font-mono">Port 465 (SMTPS)</td>
                  <td className="p-3 font-mono">Port 995 (POP3S)</td>
                  <td className="p-3 font-mono">Port 993 (IMAPS)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Mail Location</td>
                  <td className="p-3">Transient in queues</td>
                  <td className="p-3 text-rose-400">Local PC (deleted from server)</td>
                  <td className="p-3 text-emerald-400">Centralized Server Mailbox</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Multi-Device Usability</td>
                  <td className="p-3">N/A (Sending only)</td>
                  <td className="p-3 text-rose-400">Poor (device silos)</td>
                  <td className="p-3 text-emerald-400">Superior (Real-time sync)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step Email Dispatch Lifecycle */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: The Journey of an Email</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Client Push via SMTP:</strong> The sender composes an email and clicks 'Send'. The email client uses SMTP over Port 587 to upload the message to the sender's mail server.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">DNS MX Lookup &amp; Server Relay:</strong> The sender's mail server queries DNS for the MX record of the recipient's domain, then uses SMTP over Port 25 to forward the message to the recipient's mail server.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Mailbox Storage:</strong> The recipient's mail server places the message into the user's specific storage inbox directory.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <strong className="text-white">Recipient Retrieval via IMAP/POP3:</strong> The recipient opens their phone email app. The app connects via IMAP (Port 993) to pull headers and synchronize the message into the inbox folder.
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
            <li><strong>Misconception:</strong> Writing that SMTP retrieves email. SMTP can ONLY send or push email. Mail retrieval is exclusively handled by POP3 or IMAP.</li>
            <li><strong>Pitfall:</strong> Confusing POP3 and IMAP ports. Remember: POP3 is Port 110 (POP3S: 995); IMAP is Port 143 (IMAPS: 993).</li>
            <li><strong>Pitfall:</strong> Forgetting the expansion of MIME: Multipurpose Internet Mail Extensions. It allows non-ASCII multimedia attachments to be transmitted over ASCII SMTP.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In CBSE examinations, if a case study asks: 'Which protocol should an employee choose to access their work emails from both a home laptop and a mobile phone so that read messages and folders remain identical?', always recommend IMAP. Explain that IMAP maintains emails centrally on the server and synchronizes changes across all devices in real time."
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
          filename="cbse_class12_email_protocols_notes.txt"
          title="Download Topic 4 Revision Notes"
        />

      </div>
    </div>
  );
}
