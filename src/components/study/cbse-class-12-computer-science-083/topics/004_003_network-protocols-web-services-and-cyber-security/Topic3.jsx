import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, FolderDown, Terminal
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/ftp_dual_connection_sim.py?raw";

export default function Topic3() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                File Transfer Systems
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              File Transfer Protocol (FTP): File Upload, Download &amp; Control Connections
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Master the dual-connection architecture of FTP. Contrast Port 21 (Control/Commands) with Port 20 (Data Transfer), examine Active vs Passive modes, Anonymous FTP, ASCII vs Binary modes, and modern secure alternatives (SFTP/FTPS).
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
            Think of hiring a cargo shipping service. You talk to the logistics dispatcher over the telephone to state what shipping containers you need moved, confirm your contract ID, and arrange delivery dates. That telephone line is the <strong>FTP Control Connection (Port 21)</strong>. Once agreed, the shipping company sends a large flatbed cargo freight train on railroad tracks to physically carry the heavy cargo boxes. That freight train is the <strong>FTP Data Connection (Port 20)</strong>. Once the shipment arrives, the train departs, but your phone line to the dispatcher remains active for the next shipment.
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Dual-Connection Architecture */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <FolderDown size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Dual-Connection Architecture of FTP</h2>
              <p className="text-xs text-slate-400">Why FTP uses two separate TCP connections simultaneously</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-blue-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-blue-300">1. Control Connection (Port 21)</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Listens permanently on <strong>TCP Port 21</strong>.</li>
                <li>Used exclusively for session authentication (USER, PASS) and command routing (LIST, CWD, RETR, STOR).</li>
                <li>Transmits 3-digit status reply codes (220, 230, 331, 550).</li>
                <li>Remains <strong>OPEN</strong> continuously for the entire user session.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/20 rounded-xl space-y-3">
              <h3 className="text-base font-bold text-emerald-300">2. Data Connection (Port 20 / Passive)</h3>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Created <strong>on-demand</strong> dynamically whenever a file transfer or directory listing occurs.</li>
                <li>Streams raw binary or ASCII payload bytes.</li>
                <li><strong>Closed immediately</strong> after the file transfer completes.</li>
                <li>Active Mode: Server initiates to client; Passive Mode (PASV): Client initiates to server.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation Component */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Terminal size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Dual-Connection FTP Simulator</h2>
              <p className="text-xs text-slate-400">Simulate command-control negotiation on Port 21 and data streaming on Port 20</p>
            </div>
          </div>
          <PythonFileLoader
            filename="ftp_dual_connection_sim.py"
            code={pythonCode}
            description="Python simulation demonstrating command exchange over Port 21 and independent data streaming over Port 20."
          />
        </div>

        {/* 5. Transfer Modes & Protocols Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparison: FTP vs SFTP vs TFTP</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Protocol</th>
                  <th className="p-3">Transport &amp; Port</th>
                  <th className="p-3">Security &amp; Encryption</th>
                  <th className="p-3">Typical Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">FTP (Standard)</td>
                  <td className="p-3 font-mono">TCP Ports 20 &amp; 21</td>
                  <td className="p-3 text-rose-400">Insecure (Plaintext passwords/data)</td>
                  <td className="p-3">Legacy public repositories, local trusted LANs</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-emerald-400">SFTP (SSH File Transfer)</td>
                  <td className="p-3 font-mono">TCP Port 22</td>
                  <td className="p-3 text-emerald-400">High (Fully encrypted inside SSH)</td>
                  <td className="p-3">Secure webmaster uploads, Linux server admin</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-amber-400">TFTP (Trivial FTP)</td>
                  <td className="p-3 font-mono">UDP Port 69</td>
                  <td className="p-3 text-rose-400">None (No authentication)</td>
                  <td className="p-3">Network booting (PXE), Cisco router IOS backup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step FTP Session Lifecycle */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: The Lifecycle of an FTP Session</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Connection Setup:</strong> Client opens TCP connection to server Port 21. Server welcomes client with <code>220 Service ready</code>.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Authentication:</strong> Client transmits <code>USER admin</code> and <code>PASS Secret123</code>. Server responds with <code>230 User logged in</code>.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Data Channel Spawning:</strong> Client requests file via <code>RETR file.zip</code>. Server opens data channel on Port 20, streams bytes, and closes data channel upon completion with <code>226 Transfer complete</code>.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <strong className="text-white">Session Teardown:</strong> Client issues <code>QUIT</code>. Server terminates control connection with <code>221 Goodbye</code>.
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
            <li><strong>Misconception:</strong> Thinking FTP uses only one port. Remember that FTP uses <strong>TWO</strong> ports: Port 21 for Control/Commands and Port 20 for Active Data.</li>
            <li><strong>Pitfall:</strong> Confusing FTP with HTTP. While HTTP can download files, FTP is optimized for bidirectional file management (renaming, deleting, directory creation, resume capability, and bulk upload/download).</li>
            <li><strong>Pitfall:</strong> Forgetting that transferring binary files (.exe, .zip) in ASCII mode can corrupt them due to newline character conversion.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="When answering questions about FTP in CBSE Class 12, always emphasize its two distinct ports: TCP Port 21 for control/commands, and TCP Port 20 for data transfer. If asked about security, mention that SFTP (running over SSH on Port 22) is the modern secure encrypted replacement for plain FTP."
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
          filename="cbse_class12_ftp_notes.txt"
          title="Download Topic 3 Revision Notes"
        />

      </div>
    </div>
  );
}
