// Topic1.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic1_files/topic1_questions';

/**
 * Component: Topic1
 * Purpose: Explain the working of FTP, SMTP, POP3, and IMAP protocols.
 * Prototype: function Topic1()
 * Return: JSX.Element
 * When & why: Used in network fundamentals to teach file transfer and email protocols.
 */

const Topic1 = () => {
  return (
    <div className="dark min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 p-6 md:p-10">
      <style>
        {`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-slide-up {
              animation: none !important;
              opacity: 1;
              transform: none;
            }
          }
          .card-hover {
            transition: all 0.3s ease-in-out;
          }
          .card-hover:hover {
            transform: scale(1.01);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        `}
      </style>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300 bg-clip-text text-transparent">
            FTP, SMTP, POP3 & IMAP
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Moving files and sending emails – the protocols that power data transfer and communication.
          </p>
        </div>

        {/* FTP Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-300">
            📁 FTP – File Transfer Protocol
          </h2>
          <p className="mt-4 leading-relaxed">
            FTP is used to transfer files between a client and a server on a network. It runs on port 21 (control) and port 20 (data). FTP can operate in Active or Passive mode, and supports authentication (username/password) or anonymous access.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg">How FTP Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Client connects to server on port 21 (command channel).</li>
                <li>Authentication (USER/PASS) or anonymous login.</li>
                <li>Client sends commands (LIST, RETR, STOR, DELE).</li>
                <li>Server opens separate data connection (port 20 or negotiated).</li>
                <li>File transfer occurs over data connection.</li>
              </ol>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-mono text-sm mb-2">🔧 Real‑world example</h4>
              <p className="text-sm leading-relaxed">
                When Abhronila from Ichapur uploads her website files to a hosting server, she uses FTP. Many IDEs and deployment tools (VS Code SFTP, FileZilla) use FTP or its secure variant FTPS/SFTP.
              </p>
            </div>
          </div>

          {/* FTP SVG Diagram */}
          <div className="mt-6 flex justify-center">
            <svg width="100%" height="150" viewBox="0 0 600 150" className="max-w-full h-auto">
              <rect width="600" height="150" fill="transparent" />
              <rect x="20" y="40" width="120" height="50" fill="#3b82f6" rx="8" />
              <text x="80" y="70" textAnchor="middle" fill="white" fontSize="12">FTP Client</text>
              <path d="M140,65 L220,65" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowftp)">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
              </path>
              <rect x="230" y="40" width="120" height="50" fill="#10b981" rx="8" />
              <text x="290" y="70" textAnchor="middle" fill="white" fontSize="12">FTP Server</text>
              <text x="160" y="55" fontSize="10" fill="#6b7280">Port 21 (commands)</text>
              <path d="M140,95 L220,115" stroke="#f97316" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrowftp2)" />
              <text x="160" y="120" fontSize="10" fill="#6b7280">Port 20 (data)</text>
              <defs>
                <marker id="arrowftp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
                <marker id="arrowftp2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f97316" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
            <p className="text-sm font-medium">⚠️ Security warning</p>
            <p className="text-xs">FTP sends credentials and data in plaintext. Use SFTP (SSH File Transfer) or FTPS (FTP over TLS) for sensitive transfers.</p>
          </div>
        </div>

        {/* SMTP Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
            📧 SMTP – Simple Mail Transfer Protocol
          </h2>
          <p className="mt-4 leading-relaxed">
            SMTP is used for sending emails from client to server or between mail servers. It operates on port 25 (standard), 587 (submission with STARTTLS), or 465 (SSL/TLS). SMTP is a push protocol – it pushes emails toward the recipient's server.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium">SMTP Commands & Workflow</h3>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li><span className="font-mono">HELO/EHLO</span> – identify client</li>
                <li><span className="font-mono">MAIL FROM:</span> – sender address</li>
                <li><span className="font-mono">RCPT TO:</span> – recipient address</li>
                <li><span className="font-mono">DATA</span> – email content (headers + body)</li>
                <li><span className="font-mono">QUIT</span> – end session</li>
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-mono text-sm mb-2">📬 Real‑world scenario</h4>
              <p className="text-sm leading-relaxed">
                Mamata in Kolkata uses Gmail's SMTP server (smtp.gmail.com) to send an email to Susmita in Barrackpore. Gmail's server then uses SMTP to relay the message to the recipient's mail server (POP3/IMAP server).
              </p>
            </div>
          </div>

          {/* SMTP flow diagram */}
          <div className="mt-6 flex justify-center">
            <svg width="500" height="130" viewBox="0 0 500 130" className="mx-auto">
              <rect x="10" y="30" width="100" height="40" fill="#f97316" rx="6" />
              <text x="60" y="55" textAnchor="middle" fill="white" fontSize="10">Mail Client</text>
              <path d="M110,50 L170,50" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowSMTP)" />
              <rect x="180" y="30" width="120" height="40" fill="#ef4444" rx="6" />
              <text x="240" y="55" textAnchor="middle" fill="white" fontSize="10">SMTP Server</text>
              <path d="M300,50 L360,50" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowSMTP2)" />
              <rect x="370" y="30" width="100" height="40" fill="#8b5cf6" rx="6" />
              <text x="420" y="55" textAnchor="middle" fill="white" fontSize="10">Mail Server</text>
              <defs>
                <marker id="arrowSMTP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#3b82f6" /></marker>
                <marker id="arrowSMTP2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#3b82f6" /></marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* POP3 vs IMAP Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            📥 POP3 vs IMAP – Receiving Emails
          </h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
              <h3 className="text-xl font-medium text-center text-orange-600">POP3</h3>
              <p className="mt-2 text-sm leading-relaxed">Post Office Protocol version 3 (port 110 plain, 995 SSL). Downloads emails to local device and <strong>deletes from server</strong> by default.</p>
              <ul className="list-check mt-3 space-y-1 text-sm">
                <li>✓ Single-device usage</li>
                <li>✓ Offline access (emails stored locally)</li>
                <li>✗ Changes not synced across devices</li>
                <li>✗ Server storage saved</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-center text-teal-600">IMAP</h3>
              <p className="mt-2 text-sm leading-relaxed">Internet Message Access Protocol (port 143 plain, 993 SSL). Keeps emails on server; clients sync state (read/unread, folders).</p>
              <ul className="list-check mt-3 space-y-1 text-sm">
                <li>✓ Multi-device synchronization</li>
                <li>✓ Server-side folders and search</li>
                <li>✓ Partial download (headers first)</li>
                <li>✗ Requires server storage space</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 relative bg-gray-100 dark:bg-gray-700/40 rounded-xl p-4">
            <p className="text-sm font-mono">💡 Example: Debangshu checks email on his phone (marks as read). Later on laptop, IMAP shows the email as read. POP3 would not sync that state.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms] grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 p-5">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Using FTP without TLS exposes credentials.</li>
              <li>Configuring SMTP on port 25 (often blocked by ISPs) – use 587 with STARTTLS.</li>
              <li>Choosing POP3 when you need to keep email on server for multiple devices.</li>
              <li>Forgetting that SMTP requires authentication for relaying (open relay = spam).</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 p-5">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Always use SFTP or FTPS instead of plain FTP.</li>
              <li>Prefer IMAP over POP3 for modern, multi-device email usage.</li>
              <li>Set correct SPF, DKIM, DMARC records to improve email deliverability.</li>
              <li>Use `STARTTLS` or implicit SSL for all mail protocols.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/40 rounded-xl p-5 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
          <h3 className="font-bold text-lg mb-3">📋 Mini Checklist – Students should remember:</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div>☐ FTP: port 21 control, 20 data; insecure without TLS.</div>
            <div>☐ SMTP: port 25 (relay), 587 (submission), 465 (SMTPS).</div>
            <div>☐ POP3: downloads and deletes; port 110/995.</div>
            <div>☐ IMAP: keeps emails on server, syncs across devices; port 143/993.</div>
            <div>☐ Always prefer secure variants: FTPS, SFTP, SMTPS, IMAPS, POP3S.</div>
          </div>
        </div>

        {/* Hints Section */}
        <div className="border-l-4 border-blue-400 bg-blue-50/40 dark:bg-blue-900/20 p-5 rounded-r-xl animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
          <h4 className="font-semibold flex items-center gap-1">💡 Think about…</h4>
          <p className="text-sm mt-1">Why would a company block outgoing SMTP port 25? How does that affect a developer trying to send logs via email?</p>
          <p className="text-sm mt-2">Try changing POP3 settings to "leave a copy on server" – observe how multiple devices behave.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
          <FAQTemplate title="FTP, SMTP, POP3 & IMAP FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1500ms]">
          <Teacher note="Encourage students to experiment with telnet to SMTP servers (`telnet smtp.gmail.com 587`) to see SMTP commands live. For FTP, use `ftp` command line or a tool like FileZilla and observe the log window. Remind that POP3 with 'delete after download' is dangerous if you only read on one device – data loss can happen. IMAP is the industry standard today." />
        </div>
      </div>
    </div>
  );
};

export default Topic1;