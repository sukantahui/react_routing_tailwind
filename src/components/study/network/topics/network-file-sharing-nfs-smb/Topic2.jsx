import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";

/**
 * Topic2 Component
 * 
 * Prototype: function Topic2(): JSX.Element
 * Return type: JSX.Element
 * Purpose: Provide in-depth coverage of SMB (Server Message Block) / CIFS – its purpose,
 *          evolution (SMB1, SMB2, SMB3), architecture (session, tree connect, file operations),
 *          security (NTLM, Kerberos, signing, encryption), performance (multichannel, RDMA),
 *          and cross-platform implementation via Samba.
 * When & why used: After NFS (Topic1), this topic covers the dominant protocol for Windows
 *                  and mixed environments, essential for file sharing with Windows clients.
 */
const Topic2 = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* ========== HERO SECTION ========== */}
        <div className="space-y-6 text-center md:text-left">
          <div 
            className="animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]"
            style={{ animationFillMode: 'both' }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 mb-4">
              Topic 2 • Deep Dive
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              SMB / CIFS (Server Message Block)
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              From IBM to Microsoft, SMB is the backbone of Windows file sharing. Understand its evolution,
              security improvements, performance features, and how Samba brings it to Linux.
            </p>
          </div>
        </div>

        {/* ========== SMB OVERVIEW & PURPOSE ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">🖥️</span> What is SMB/CIFS?
            </h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Server Message Block (SMB)</strong> is a network file-sharing protocol native to Windows.
              Originally developed by IBM, later extended by Microsoft. <strong>CIFS (Common Internet File System)</strong>
              was an old dialect (SMB 1.0). Today, SMB 2.x and 3.x are the modern, secure, high-performance versions.
            </p>
            <div className="mt-4 p-3 bg-sky-50 dark:bg-sky-950/30 rounded-lg text-sm">
              💡 <strong>Classroom analogy:</strong> Like a restaurant – client (customer) requests a file (dish); server (kitchen) prepares and serves; session = table reservation.
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">🎯</span> When & Why Use SMB?
            </h2>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Windows client environments – native support, mapped drives, Group Policy.</li>
              <li>Mixed OS networks: Windows, Linux (via Samba), macOS (SMBX).</li>
              <li>Print sharing, named pipes, and remote administration (WMI over SMB).</li>
              <li>Hyper-V storage over SMB (SMB 3.0+ with RDMA).</li>
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              <span className="font-mono">Real-world: Ichapur government office uses SMB shares for departmental drives.</span>
            </div>
          </div>
        </div>

        {/* ========== SMB EVOLUTION (DIALECTS) ========== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-sky-500 pl-4 mb-6">Evolution of SMB Dialects</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-xl border border-red-200 dark:border-red-800 transition hover:shadow">
              <h3 className="font-bold text-red-700 dark:text-red-400">SMB 1.0 / CIFS</h3>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Deprecated, insecure, no encryption, vulnerable to ransomware (EternalBlue).</p>
              <div className="mt-2 text-xs font-mono">Never use.</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl border border-orange-200 dark:border-orange-800 transition hover:shadow">
              <h3 className="font-bold text-orange-700 dark:text-orange-400">SMB 2.0 (2006)</h3>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Reduced command set, higher performance, compounding requests, larger buffers.</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800 transition hover:shadow">
              <h3 className="font-bold text-amber-700 dark:text-amber-400">SMB 2.1 (2010)</h3>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Lease caching (improved oplocks), larger MTU support.</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 transition hover:shadow">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">SMB 3.0+ (2012–present)</h3>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Encryption (AES-128), multichannel, RDMA, directory leasing, transparent failover.</p>
            </div>
          </div>
        </div>

        {/* ========== SMB ARCHITECTURE & PROTOCOL STACK ========== */}
        <div className="mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 transition-all hover:shadow-xl">
            <h3 className="text-xl font-semibold text-center mb-4">SMB Protocol Stack (How a File is Read)</h3>
            <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              {/* Client side */}
              <rect x="30" y="20" width="160" height="40" rx="8" fill="#38bdf8" />
              <text x="110" y="45" textAnchor="middle" fill="white" fontSize="13">Application (Notepad, etc.)</text>
              <rect x="30" y="75" width="160" height="40" rx="8" fill="#7dd3fc" />
              <text x="110" y="100" textAnchor="middle" fill="#082f49" fontSize="12">SMB Client (Redirector)</text>
              <rect x="30" y="130" width="160" height="40" rx="8" fill="#bae6fd" />
              <text x="110" y="155" textAnchor="middle" fill="#0369a1" fontSize="12">Session / Tree Connect</text>
              <rect x="30" y="185" width="160" height="40" rx="8" fill="#e0f2fe" />
              <text x="110" y="210" textAnchor="middle" fill="#0c4a6e" fontSize="12">SMB Commands (READ, WRITE)</text>

              {/* Network */}
              <rect x="250" y="200" width="300" height="40" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="400" y="225" textAnchor="middle" fill="#0f172a" fontSize="13">TCP/IP (Port 445) or NetBIOS (137-139)</text>

              {/* Server side */}
              <rect x="600" y="75" width="160" height="40" rx="8" fill="#f59e0b" />
              <text x="680" y="100" textAnchor="middle" fill="white" fontSize="13">SMB Server (smbd)</text>
              <rect x="600" y="130" width="160" height="40" rx="8" fill="#fed7aa" />
              <text x="680" y="155" textAnchor="middle" fill="#92400e" fontSize="12">Share Access Check</text>
              <rect x="600" y="185" width="160" height="40" rx="8" fill="#fde68a" />
              <text x="680" y="210" textAnchor="middle" fill="#b45309" fontSize="12">File System I/O</text>

              {/* Arrows */}
              <line x1="190" y1="155" x2="242" y2="210" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowSMB)" />
              <line x1="550" y1="210" x2="592" y2="155" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowSMB)" />
              <path d="M110 45 L110 70" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowSMB)" />
              <path d="M110 115 L110 125" stroke="#7dd3fc" strokeWidth="2" />
              <path d="M110 170 L110 180" stroke="#bae6fd" strokeWidth="2" />
              <path d="M680 115 L680 125" stroke="#f59e0b" strokeWidth="2" />
              <path d="M680 170 L680 180" stroke="#fed7aa" strokeWidth="2" />

              <defs>
                <marker id="arrowSMB" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
                </marker>
              </defs>
            </svg>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center text-sm">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded"><strong>Session Setup:</strong> Authenticates user (NTLM/Kerberos)</div>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded"><strong>Tree Connect:</strong> Connects to a share (e.g., \\server\share)</div>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded"><strong>File Operations:</strong> SMB2 READ, WRITE, LOCK, etc.</div>
            </div>
          </div>
        </div>

        {/* ========== KEY FEATURES: STATE, LOCKING, OPLOCKS ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/30 dark:to-gray-900 rounded-2xl p-5 border border-sky-100 dark:border-sky-800 transition hover:shadow-lg">
            <h3 className="text-lg font-bold text-sky-800 dark:text-sky-400">🔁 Stateful Sessions</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">SMB maintains session context (user ID, tree ID, file ID). If session breaks, client can reconnect and resume (durable handles).</p>
          </div>
          <div className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/30 dark:to-gray-900 rounded-2xl p-5 border border-sky-100 dark:border-sky-800 transition hover:shadow-lg">
            <h3 className="text-lg font-bold text-sky-800 dark:text-sky-400">🔒 Opportunistic Locks (Oplocks)</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">Client caches file data; server breaks lock when another client accesses. Greatly reduces network traffic for single-user files.</p>
          </div>
          <div className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/30 dark:to-gray-900 rounded-2xl p-5 border border-sky-100 dark:border-sky-800 transition hover:shadow-lg">
            <h3 className="text-lg font-bold text-sky-800 dark:text-sky-400">📂 Directory Leases</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">Client caches directory metadata; server notifies changes. Reduces queries for folder contents.</p>
          </div>
        </div>

        {/* ========== SMB SECURITY (ENCRYPTION, SIGNING, AUTH) ========== */}
        <div className="mt-16 bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔐 SMB Security Mechanisms</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-bold text-sky-700 dark:text-sky-400">Authentication</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li><strong>NTLMv2</strong> – Challenge-response, better than LANMAN but weaker than Kerberos.</li>
                <li><strong>Kerberos</strong> – Preferred in Active Directory domains; mutual authentication, tickets.</li>
                <li>Guest/anonymous access – Highly discouraged; disable via registry/policy.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sky-700 dark:text-sky-400">Integrity & Encryption</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li><strong>SMB Signing</strong> – Prevents tampering (man-in-the-middle). Mandatory in SMB 3.0+.</li>
                <li><strong>SMB Encryption (AES-128-CCM/GCM)</strong> – Full data confidentiality. Enabled per share or globally.</li>
                <li><strong>Pre-authentication integrity</strong> (SMB 3.1.1) – Protects negotiation phase.</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-sky-100 dark:bg-sky-900/40 rounded-lg text-sm">
            💡 <strong>Observe carefully:</strong> Wireshark capture of SMB without signing shows readable session setup; with signing/encryption, all is scrambled.
          </div>
        </div>

        {/* ========== SMB PERFORMANCE FEATURES ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 dark:from-emerald-950/30 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">⚡ Multichannel (SMB 3.0+)</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Aggregates multiple network connections (NICs) for increased throughput and fault tolerance. Can use different network paths (e.g., 1GbE + 10GbE).</p>
            <div className="mt-2 text-xs bg-white dark:bg-gray-800 p-2 rounded">Example: Two 10GbE NICs → up to 20Gb/s for a single file transfer.</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 dark:from-emerald-950/30 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">🚀 SMB Direct (RDMA) – SMB 3.0+</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Uses RDMA (RoCE, iWARP, InfiniBand) to bypass CPU for data movement. Extremely low latency, high throughput (e.g., for Hyper-V storage).</p>
            <div className="mt-2 text-xs bg-white dark:bg-gray-800 p-2 rounded">Ideal for storage spaces direct, SQL Server over SMB.</div>
          </div>
        </div>

        {/* ========== SAMBA: THE LINUX SMB IMPLEMENTATION ========== */}
        <div className="mt-16 bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
          <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300">🐧 Samba – Bringing SMB to Linux/Unix</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Samba is an open-source reimplementation of SMB/CIFS. It allows Linux servers to act as file/print servers for Windows clients, and even domain controllers.</p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-bold">Basic smb.conf share example:</h3>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                {`[public]
   path = /srv/samba/public
   read only = no
   guest ok = yes
   create mask = 0664
   directory mask = 0775

[secure]
   path = /srv/samba/secure
   valid users = mamata, mahima
   smb encrypt = mandatory
   read only = no`}
              </pre>
            </div>
            <div>
              <h3 className="font-bold">Access from Windows:</h3>
              <code className="block bg-gray-900 text-gray-100 p-3 rounded text-xs">\\linux-server\public</code>
              <h3 className="font-bold mt-3">Mount on Linux client:</h3>
              <code className="block bg-gray-900 text-gray-100 p-3 rounded text-xs">sudo mount -t cifs //server/share /mnt -o username=mamata</code>
              <p className="text-xs text-gray-500 mt-1">Requires cifs-utils package.</p>
            </div>
          </div>
          <div className="mt-4 p-2 bg-white dark:bg-gray-800 rounded text-sm">
            🔧 <strong>Pro tip:</strong> Use <code>testparm</code> to verify smb.conf syntax before restarting smbd.
          </div>
        </div>

        {/* ========== TIPS, MISTAKES, BEST PRACTICES, CHECKLIST ========== */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 dark:from-cyan-950/30 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800 hover:shadow">
              <h4 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">🧠 SMB Pro Tips</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>Disable SMB1 entirely: set <code>server min protocol = SMB2</code> in smb.conf.</li>
                <li>Use <code>smbstatus</code> to see active connections and locked files.</li>
                <li>For Windows 10/11, enable SMB 3.1.1 via PowerShell: <code>Set-SmbServerConfiguration -EncryptData $true</code>.</li>
                <li>Test Samba configuration with <code>testparm -v</code> before restarting.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 dark:from-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-800 hover:shadow">
              <h4 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Mistakes (Beginners)</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Leaving SMB1 enabled for compatibility – huge security risk (EternalBlue, WannaCry).</li>
                <li>Using <code>guest ok = yes</code> with sensitive data.</li>
                <li>Forgetting to set Linux filesystem permissions (<code>chmod</code> and <code>chown</code>) on the shared directory.</li>
                <li>Not mapping Samba users with <code>smbpasswd -a</code> for standalone servers.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">✅ Best Practices</h4>
              <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Always enable SMB signing and encryption for sensitive shares.</li>
                <li>Use separate shares for different departments with least privilege permissions.</li>
                <li>Regularly audit SMB logs and monitor for brute-force attempts.</li>
                <li>For Samba, set <code>strict locking = yes</code> to prevent data corruption.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 hover:shadow">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300">📋 SMB/CIFS Memory Checklist</h4>
              <ul className="space-y-1 text-gray-800 dark:text-gray-200 text-sm font-mono">
                <li>☐ SMB1 disabled (server and client)</li>
                <li>☐ SMB 2.0 or 3.0+ as minimum protocol</li>
                <li>☐ Encryption enabled on sensitive shares</li>
                <li>☐ Use Kerberos if in AD domain; otherwise strong passwords</li>
                <li>☐ Test with smbclient: <code>smbclient -L //server -U user</code></li>
                <li>☐ Firewall allows TCP 445 (and 137-139 only if legacy needed)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== REAL-WORLD SCENARIO ========== */}
        <div className="mt-16 bg-sky-50 dark:bg-sky-950/30 rounded-2xl p-6 border border-sky-200 dark:border-sky-800">
          <h3 className="text-xl font-bold text-sky-800 dark:text-sky-300">📖 Real-World Scenario: Ichapur Government Office</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            The office has 20 Windows desktops and 5 Linux workstations. They need shared access to:
            <ul className="list-disc list-inside mt-2 ml-4">
              <li><strong>Finance Share</strong> – Only accounts team (read/write), encrypted at rest and in transit.</li>
              <li><strong>Public Share</strong> – Read-only for everyone, writable only by admins.</li>
            </ul>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            Solution: A Ubuntu server running Samba 4.15+. Configuration uses <code>smb encrypt = mandatory</code> for the finance share,
            <code>valid users = @finance</code> group, and <code>read only = yes</code> for public share. Windows clients map drives via GPO;
            Linux clients mount with <code>mount -t cifs -o sec=ntlmssp,username=...</code>.
          </p>
          <div className="mt-3 text-xs text-gray-500">
            💡 <strong>Try changing this:</strong> Compare performance of encrypted vs unencrypted SMB share using <code>time dd</code> on a large file.
          </div>
        </div>

        {/* ========== FAQ SECTION ========== */}
        <div className="mt-20">
          <FAQTemplate title="SMB / CIFS – Deep Dive FAQs" questions={questions} />
        </div>

        {/* ========== TEACHER'S NOTE ========== */}
        <div className="mt-12">
          <Teacher note="Students often confuse CIFS with modern SMB. Emphasize that CIFS is an insecure dialect (SMB1) and should never be used. Demonstrate Wireshark capture of SMB1 vs SMB3 to show encryption and reduced chattiness. Also, show how to enable SMB signing on Windows (gpedit.msc) and why it matters. For hands-on, have students set up Samba shares on a Linux VM, access from Windows, and then intentionally break authentication – teaches troubleshooting. Finally, discuss that SMB 3.0's multichannel can be tested with two virtual NICs and a large file copy." />
        </div>

        <style jsx>{`
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[fadeSlideUp_.*\\] {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic2;