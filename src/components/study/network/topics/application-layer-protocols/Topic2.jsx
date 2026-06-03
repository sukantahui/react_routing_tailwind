// Topic2.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic2_files/topic2_questions';

/**
 * Component: Topic2
 * Purpose: Explain remote login protocols – Telnet and SSH.
 * Prototype: function Topic2()
 * Return: JSX.Element
 * When & why: Used in network security curriculum to contrast insecure vs secure remote access.
 */

const Topic2 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-300 bg-clip-text text-transparent">
            Remote Login: Telnet & SSH
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Controlling computers from a distance – from insecure beginnings to encrypted secure shells.
          </p>
        </div>

        {/* Telnet Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
            🖥️ Telnet – Insecure Remote Shell
          </h2>
          <p className="mt-4 leading-relaxed">
            Telnet (Teletype Network) provides bidirectional interactive text communication using a virtual terminal connection. It runs on port 23 and transmits all data (including login credentials) in <strong>plaintext</strong>. Telnet is obsolete for production but still used for debugging legacy devices or testing services.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg">How Telnet Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                <li>Client connects to server on TCP port 23.</li>
                <li>Server sends login prompt (plaintext).</li>
                <li>Client transmits username and password in clear.</li>
                <li>All subsequent commands and outputs are visible to any network sniffer.</li>
              </ol>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border-l-4 border-red-500">
              <h4 className="font-mono text-sm mb-2 text-red-700 dark:text-red-300">⚠️ Security Risk</h4>
              <p className="text-sm leading-relaxed">
                Anyone on the network can capture your password using Wireshark. Never use Telnet over the internet or untrusted networks.
              </p>
            </div>
          </div>

          {/* Telnet SVG visualization showing plaintext danger */}
          <div className="mt-6 flex justify-center">
            <svg width="100%" height="160" viewBox="0 0 600 160" className="max-w-full h-auto">
              <rect x="20" y="30" width="110" height="50" fill="#c2410c" rx="8" />
              <text x="75" y="60" textAnchor="middle" fill="white" fontSize="12">Telnet Client</text>
              <path d="M130,55 L230,55" stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#evil)">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="180" y="45" fontSize="10" fill="#ef4444">📡 Plaintext password</text>
              <rect x="240" y="30" width="110" height="50" fill="#f97316" rx="8" />
              <text x="295" y="60" textAnchor="middle" fill="white" fontSize="12">Telnet Server</text>
              <rect x="120" y="100" width="160" height="30" fill="#991b1b" rx="6" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="200" y="120" textAnchor="middle" fill="white" fontSize="11">Eavesdropper (Wireshark)</text>
              <defs>
                <marker id="evil" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
            <p className="text-sm font-medium">📌 Legitimate Telnet use today</p>
            <p className="text-xs">Debugging network switches, routers, or IoT devices on isolated management networks. For anything else → use SSH.</p>
          </div>
        </div>

        {/* SSH Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-700 dark:text-green-300">
            🔐 SSH – Secure Shell
          </h2>
          <p className="mt-4 leading-relaxed">
            SSH (Secure Shell) provides encrypted remote login and command execution. It runs on port 22 by default. SSH uses public-key cryptography for host authentication and supports password or key-based user authentication. It also tunnels other protocols (X11, port forwarding).
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium">SSH Connection Workflow</h3>
              <ul className="list-decimal list-inside space-y-1 text-sm mt-2">
                <li>TCP handshake on port 22.</li>
                <li>SSH protocol version exchange.</li>
                <li>Server sends its host key (fingerprint).</li>
                <li>Key exchange (Diffie-Hellman) generates session keys.</li>
                <li>Client authenticates (password or public key).</li>
                <li>Encrypted session established.</li>
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-mono text-sm mb-2">🚀 Real‑world usage</h4>
              <p className="text-sm leading-relaxed">
                Susmita from Barrackpore manages a cloud server (Ubuntu) using SSH from her laptop. She logs in with `ssh -i key.pem ubuntu@54.123.45.67` and runs commands, transfers files with SCP or SFTP, and even sets up a VPN tunnel.
              </p>
            </div>
          </div>

          {/* SSH secure tunnel diagram with animation */}
          <div className="mt-6 flex justify-center">
            <svg width="500" height="150" viewBox="0 0 500 150" className="mx-auto">
              <rect x="20" y="45" width="120" height="45" fill="#059669" rx="8" />
              <text x="80" y="70" textAnchor="middle" fill="white" fontSize="12">SSH Client</text>
              <path d="M140,67 L220,67" stroke="#10b981" strokeWidth="3" strokeDasharray="10,5" />
              <rect x="170" y="55" width="60" height="20" fill="#facc15" rx="4" />
              <text x="200" y="69" textAnchor="middle" fill="black" fontSize="9">🔒 TLS</text>
              <rect x="240" y="45" width="120" height="45" fill="#0284c7" rx="8" />
              <text x="300" y="70" textAnchor="middle" fill="white" fontSize="12">SSH Server</text>
              <text x="300" y="125" textAnchor="middle" fill="#6b7280" fontSize="11">Encrypted session (AES, ChaCha20)</text>
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
              <span className="font-bold">Authentication methods:</span> Password, Public Key (RSA/ECDSA/Ed25519), Keyboard-interactive, GSSAPI.
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
              <span className="font-bold">Port forwarding:</span> Local (-L), Remote (-R), Dynamic (-D socks proxy).
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm card-hover p-6 md:p-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            ⚖️ Telnet vs SSH – Head to Head
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="p-2 font-semibold">Feature</th>
                  <th className="p-2 font-semibold text-red-600">Telnet</th>
                  <th className="p-2 font-semibold text-green-600">SSH</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700"><td className="p-2">Encryption</td><td className="p-2 text-red-600">❌ Plaintext</td><td className="p-2 text-green-600">✅ Strong encryption</td></tr>
                <tr className="border-b border-gray-200 dark:border-gray-700"><td className="p-2">Authentication</td><td className="p-2">Password only</td><td className="p-2">Password + public key + 2FA</td></tr>
                <tr className="border-b border-gray-200 dark:border-gray-700"><td className="p-2">Port</td><td className="p-2">23</td><td className="p-2">22</td></tr>
                <tr className="border-b border-gray-200 dark:border-gray-700"><td className="p-2">File transfer</td><td className="p-2">No (separate FTP)</td><td className="p-2">SCP, SFTP built-in</td></tr>
                <tr className="border-b border-gray-200 dark:border-gray-700"><td className="p-2">Port forwarding</td><td className="p-2">❌</td><td className="p-2">✅ Local/Remote/Dynamic</td></tr>
                <tr><td className="p-2">Use case today</td><td className="p-2">Legacy devices, lab</td><td className="p-2">All production remote access</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms] grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 p-5">
            <h3 className="font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Using Telnet over the internet (credentials stolen immediately).</li>
              <li>Forgetting to verify SSH host key fingerprint – leads to MITM attacks.</li>
              <li>Leaving SSH password authentication enabled when keys would be safer.</li>
              <li>Using weak algorithms (RSA 1024, CBC ciphers).</li>
              <li>Not disabling root login over SSH.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 p-5">
            <h3 className="font-bold text-green-700 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
              <li>Always use SSH, never Telnet for production.</li>
              <li>Use Ed25519 keys (or RSA 4096) instead of passwords.</li>
              <li>Disable root login: <code className="text-xs">PermitRootLogin no</code>.</li>
              <li>Change default SSH port (security by obscurity + reduces automated attacks).</li>
              <li>Use <code className="text-xs">ssh-agent</code> and key forwarding carefully.</li>
              <li>Enable two-factor authentication (google-authenticator).</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800/40 rounded-xl p-5 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
          <h3 className="font-bold text-lg mb-3">📋 Mini Checklist – Students should remember:</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div>☐ Telnet = port 23, plaintext, obsolete for secure use.</div>
            <div>☐ SSH = port 22, encrypted, industry standard.</div>
            <div>☐ SSH host key verification prevents MITM (first connection prompt).</div>
            <div>☐ Public key authentication is more secure than passwords.</div>
            <div>☐ Use `ssh -v` for debugging connection issues.</div>
            <div>☐ SSH can tunnel other protocols (e.g., VNC, HTTP).</div>
          </div>
        </div>

        {/* Hints Section */}
        <div className="border-l-4 border-blue-400 bg-blue-50/40 dark:bg-blue-900/20 p-5 rounded-r-xl animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
          <h4 className="font-semibold flex items-center gap-1">💡 Think about…</h4>
          <p className="text-sm mt-1">Why would you see "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!" – and how would an attacker exploit ignoring that warning?</p>
          <p className="text-sm mt-2">Try capturing Telnet traffic with tcpdump/Wireshark – see your password in the packets. Then compare with SSH – only gibberish.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
          <FAQTemplate title="Telnet & SSH FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1500ms]">
          <Teacher note="Demonstrate live: `telnet towel.blinkenlights.nl` for Star Wars ASCII movie (harmless fun, but traffic is plaintext). Then show `ssh -v user@localhost` to see crypto details. Emphasize that SSH keys are stored in `~/.ssh/authorized_keys` and permissions must be 600. A common mistake: `chmod 777 ~/.ssh` – SSH will refuse to use it. Also mention SSH config file (~/.ssh/config) for aliases and per-host options – a pro productivity trick." />
        </div>
      </div>
    </div>
  );
};

export default Topic2;