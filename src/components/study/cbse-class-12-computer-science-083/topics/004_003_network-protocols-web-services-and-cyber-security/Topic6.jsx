import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, RefreshCw, Terminal, Lock
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";
import pythonCode from "./topic6_files/telnet_vs_ssh_sim.py?raw";

export default function Topic6() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Remote Access &amp; Administration
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                CBSE Code 083
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Remote Access Protocols: Telnet and Secure Shell (SSH)
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Understand how systems administrators remotely manage networked servers and routers. Contrast insecure, cleartext Telnet (Port 23) with cryptographically hardened Secure Shell (SSH, Port 22), public-key authentication, and secure tunneling.
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
            Logging in via <strong>Telnet</strong> is like yelling your secret bank password through a megaphone across a crowded cafeteria: anyone sitting between you and the bank teller hears every syllable clearly. Logging in via <strong>SSH (Secure Shell)</strong> is like stepping into an impenetrable, soundproof subterranean tunnel with armed guards and speaking to the teller through a scrambler phone that converts your voice into mathematical noise decipherable only by the bank's private key.
          </p>
        </div>

        {/* 3. Deep-Dive Theory & Security Architecture */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <Terminal size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Telnet vs SSH Architecture</h2>
              <p className="text-xs text-slate-400">The historical transition from plaintext to cryptographic shells</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/60 border border-rose-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <AlertTriangle size={18} />
                <h3>Telnet (Deprecated Plaintext)</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Default Port: <strong>TCP Port 23</strong>.</li>
                <li>Transmits all data, passwords, and commands in unencrypted cleartext ASCII.</li>
                <li>No server host verification: vulnerable to DNS spoofing and rogue relays.</li>
                <li>No message integrity check: susceptible to session hijacking.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/60 border border-emerald-500/30 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Lock size={18} />
                <h3>SSH (Cryptographic Standard)</h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Default Port: <strong>TCP Port 22</strong>.</li>
                <li>Full session encryption using symmetric ciphers (AES-256, ChaCha20).</li>
                <li>Server host key verification prevents Man-in-the-Middle spoofing.</li>
                <li>Cryptographic HMAC tags guarantee packet data integrity.</li>
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
              <h2 className="text-xl font-bold text-white">Remote Shell Packet Capture Simulator</h2>
              <p className="text-xs text-slate-400">Observe cleartext password exposure in Telnet vs encrypted SSH noise</p>
            </div>
          </div>
          <PythonFileLoader
            filename="telnet_vs_ssh_sim.py"
            code={pythonCode}
            description="Python simulation contrasting packet inspection on Port 23 (Telnet) vs cryptographic payload protection on Port 22 (SSH)."
          />
        </div>

        {/* 5. Comprehensive Comparison Matrix */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Comparative Matrix: Telnet vs Secure Shell (SSH)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                  <th className="p-3">Feature</th>
                  <th className="p-3">Telnet</th>
                  <th className="p-3">SSH (Secure Shell)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Standard TCP Port</td>
                  <td className="p-3 font-mono text-amber-400">Port 23</td>
                  <td className="p-3 font-mono text-emerald-400">Port 22</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Data Confidentiality</td>
                  <td className="p-3 text-rose-400">None (Cleartext ASCII)</td>
                  <td className="p-3 text-emerald-400">High (End-to-end AES encryption)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Authentication Methods</td>
                  <td className="p-3">Plain password only</td>
                  <td className="p-3 text-emerald-400">Public-Key (RSA/Ed25519), Passwords, Tokens</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">Integrity &amp; Anti-Tampering</td>
                  <td className="p-3 text-rose-400">None</td>
                  <td className="p-3 text-emerald-400">Cryptographic HMAC verification</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-white">CBSE Recommendation</td>
                  <td className="p-3 text-rose-400">Never use over public networks</td>
                  <td className="p-3 text-emerald-400">MANDATORY for remote administration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Step-by-Step SSH Public-Key Authentication */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Step-by-Step: SSH Public-Key Authentication Workflow</h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <strong className="text-white">Key Generation:</strong> Client generates an asymmetric key pair: a Private Key (kept strictly confidential) and a Public Key.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <strong className="text-white">Public Key Installation:</strong> The client's Public Key is copied to the server's <code>~/.ssh/authorized_keys</code> file.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <strong className="text-white">Challenge-Response Authentication:</strong> During login, the server encrypts a random challenge string with the client's public key. The client decrypts it using its private key and sends the proof back. Authentication succeeds without ever transmitting a password!
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
            <li><strong>Misconception:</strong> Confusing port numbers: Telnet is Port 23; SSH is Port 22. Reversing them will lose marks.</li>
            <li><strong>Pitfall:</strong> Thinking Telnet is secure on an intranet. Even on a private LAN, rogue devices or compromised hosts can sniff Telnet credentials using ARP spoofing.</li>
            <li><strong>Pitfall:</strong> Believing SSH only provides terminal shells. SSH also powers secure file transfer (SCP, SFTP) and secure network port forwarding/tunneling.</li>
          </ul>
        </div>

        {/* 8. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="In board exams, whenever asked: 'Why should a network administrator replace Telnet with SSH?', clearly state: 'Because Telnet transmits passwords and commands in unencrypted cleartext across the network on Port 23, making it vulnerable to packet sniffing, whereas SSH encrypts all data and authentication credentials using strong cryptography on Port 22.'"
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
          filename="cbse_class12_telnet_vs_ssh_notes.txt"
          title="Download Topic 6 Revision Notes"
        />

      </div>
    </div>
  );
}
