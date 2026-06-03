import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";

/**
 * Topic5 Component
 * 
 * Prototype: function Topic5(): JSX.Element
 * Return type: JSX.Element
 * Purpose: Provide practical troubleshooting skills for NFS and SMB – common errors,
 *          diagnostic commands, log analysis, performance issues, and recovery.
 * When & why used: After covering theory and real-world scenarios, this topic
 *                  prepares students to diagnose and fix issues in production.
 */
const Topic5 = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* ========== HERO SECTION ========== */}
        <div className="space-y-6 text-center md:text-left">
          <div 
            className="animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]"
            style={{ animationFillMode: 'both' }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 mb-4">
              Topic 5 • Practical Skills
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Basic Troubleshooting
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Diagnose and resolve common NFS and SMB issues: mount errors, permission problems,
              performance bottlenecks, firewall misconfigurations, and client/server recovery.
            </p>
          </div>
        </div>

        {/* ========== TROUBLESHOOTING MINDSET & APPROACH ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">🔍</span> Systematic Approach
            </h2>
            <ol className="mt-4 space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside leading-relaxed">
              <li><strong>Identify symptom</strong> – Mount hang? Permission denied? Slow transfer?</li>
              <li><strong>Check physical / network layer</strong> – ping, traceroute, firewall.</li>
              <li><strong>Verify server service status</strong> – nfs-server, smbd, rpcbind.</li>
              <li><strong>Examine logs</strong> – /var/log/syslog, /var/log/messages, journalctl.</li>
              <li><strong>Test with minimal configuration</strong> – isolate variables.</li>
              <li><strong>Reproduce on another client</strong> – is it client-specific?</li>
              <li><strong>Apply fix and validate</strong> – retest.</li>
            </ol>
            <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950/30 rounded text-sm">
              💡 <strong>Think about:</strong> "When you hear hoofbeats, think horses, not zebras." Start with common causes.
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">🛠️</span> Essential Tools
            </h2>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-2 bg-white dark:bg-gray-900 rounded-lg text-center hover:shadow transition">
                <code className="font-mono text-sm">ping</code>
                <p className="text-xs text-gray-500">Basic connectivity</p>
              </div>
              <div className="p-2 bg-white dark:bg-gray-900 rounded-lg text-center hover:shadow transition">
                <code className="font-mono text-sm">rpcinfo -p</code>
                <p className="text-xs text-gray-500">NFS RPC services</p>
              </div>
              <div className="p-2 bg-white dark:bg-gray-900 rounded-lg text-center hover:shadow transition">
                <code className="font-mono text-sm">showmount -e</code>
                <p className="text-xs text-gray-500">List NFS exports</p>
              </div>
              <div className="p-2 bg-white dark:bg-gray-900 rounded-lg text-center hover:shadow transition">
                <code className="font-mono text-sm">smbclient -L</code>
                <p className="text-xs text-gray-500">List SMB shares</p>
              </div>
              <div className="p-2 bg-white dark:bg-gray-900 rounded-lg text-center hover:shadow transition">
                <code className="font-mono text-sm">tcpdump</code>
                <p className="text-xs text-gray-500">Packet capture</p>
              </div>
              <div className="p-2 bg-white dark:bg-gray-900 rounded-lg text-center hover:shadow transition">
                <code className="font-mono text-sm">journalctl -u</code>
                <p className="text-xs text-gray-500">Service logs</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== COMMON NFS ERRORS & SOLUTIONS ========== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 mb-6">NFS Troubleshooting</h2>
          <div className="space-y-4">
            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700">
              <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400">❌ "Permission denied" on NFS mount</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Possible causes:</strong></p>
              <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                <li>Client IP not allowed in /etc/exports</li>
                <li>Export option is 'ro' but client writes</li>
                <li>Filesystem permissions on server (chmod)</li>
                <li>Root squashing (root user mapped to nobody)</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-2"><strong>Solutions:</strong> Check <code>showmount -e server</code>, verify export options, check server file ownership, add <code>no_root_squash</code> if needed (carefully).</p>
              <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                🔧 <strong>Command:</strong> <code>sudo exportfs -v</code> (see active exports with options)
              </div>
            </div>

            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700">
              <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400">🔄 "Stale NFS file handle"</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Cause:</strong> File/directory was deleted or renamed on server while client held handle.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Solution:</strong> Remount the share. For automounted homes, recreate mount.</p>
              <code className="block bg-gray-900 text-gray-100 p-2 rounded text-sm mt-2">sudo umount -f /mnt/nfs ; sudo mount /mnt/nfs</code>
              <div className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                💡 <strong>Prevention:</strong> Avoid deleting open files; use file locking.
              </div>
            </div>

            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700">
              <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400">⏱️ "NFS mount hangs (server not responding)"</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Causes:</strong> Server down, network issue, firewall blocking.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Solutions:</strong> Check server status, ping, firewall rules, use <code>showmount -e</code>. For hanging mount, lazy unmount:</p>
              <code className="block bg-gray-900 text-gray-100 p-2 rounded text-sm mt-2">sudo umount -l /mnt/nfs</code>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Then investigate server logs: <code>journalctl -u nfs-server</code></p>
            </div>

            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700">
              <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400">🔥 Firewall issues with NFSv3</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Problem:</strong> NFSv3 uses random ports for mountd, nlockmgr.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Solutions:</strong> Either fix ports (static) or switch to NFSv4. For static ports, edit <code>/etc/nfs.conf</code>:</p>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                {`[mountd]
port=20048
[nlockmgr]
port=20049`}
              </pre>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Then restart and open those ports plus 111 and 2049.</p>
            </div>
          </div>
        </div>

        {/* ========== COMMON SMB ERRORS & SOLUTIONS ========== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-sky-500 pl-4 mb-6">SMB / Samba Troubleshooting</h2>
          <div className="space-y-4">
            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-sky-200 dark:hover:border-sky-700">
              <h3 className="font-bold text-lg text-sky-700 dark:text-sky-400">🔐 "NT_STATUS_ACCESS_DENIED" or "Permission denied"</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Causes:</strong> Invalid username/password, share not accessible to user, filesystem permissions, or guest restrictions.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                <li>Check Samba user exists: <code>pdbedit -L</code></li>
                <li>Verify share definition: <code>testparm -v</code></li>
                <li>Check Linux permissions on shared directory: <code>ls -ld /srv/share</code></li>
                <li>Ensure <code>valid users</code> includes the user or group.</li>
              </ul>
              <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                🔧 <strong>Debug:</strong> <code>smbclient //localhost/share -U user -c 'ls'</code> (test locally)
              </div>
            </div>

            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-sky-200 dark:hover:border-sky-700">
              <h3 className="font-bold text-lg text-sky-700 dark:text-sky-400">🌐 "Network name not found" or "The specified network name is no longer available"</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Causes:</strong> Server offline, firewall blocking port 445, NetBIOS name resolution failure (old style).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Solutions:</strong> Ping server, check smbd service, ensure TCP 445 open. Use IP address instead of hostname to isolate name resolution.</p>
              <code className="block bg-gray-900 text-gray-100 p-2 rounded text-sm mt-2">smbclient //192.168.1.100/share -U user</code>
            </div>

            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-sky-200 dark:hover:border-sky-700">
              <h3 className="font-bold text-lg text-sky-700 dark:text-sky-400">🐌 "Slow SMB performance"</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Causes:</strong> Misconfigured socket options, low MTU, SMB signing/encryption overhead, network congestion.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Solutions:</strong></p>
              <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                <li>Add to <code>smb.conf</code> [global]: <code>socket options = TCP_NODELAY IPTOS_LOWDELAY</code></li>
                <li>Disable signing if not needed (not recommended for security)</li>
                <li>Check MTU, enable jumbo frames if switch supports.</li>
                <li>Use <code>smbstatus</code> to see if encryption is on unexpectedly.</li>
              </ul>
            </div>

            <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5 transition-all duration-300 hover:shadow-md hover:border-sky-200 dark:hover:border-sky-700">
              <h3 className="font-bold text-lg text-sky-700 dark:text-sky-400">📝 "Unable to write files, but can read" on Samba</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Causes:</strong> Share marked <code>read only = yes</code>, or Linux directory permissions lack write.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1"><strong>Solutions:</strong> Set <code>read only = no</code>. Ensure shared directory has appropriate <code>chmod</code> (e.g., 0775 for group write). Also check <code>create mask</code> and <code>directory mask</code>.</p>
              <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                🔧 <strong>Test:</strong> As local user on server, touch a file in the shared directory.
              </div>
            </div>
          </div>
        </div>

        {/* ========== PERFORMANCE TROUBLESHOOTING ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 dark:from-emerald-950/30 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">📊 Performance Diagnostics</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1 text-sm">
              <li><code>nfsstat -c</code> – client RPC statistics (retransmissions, timeouts).</li>
              <li><code>nfsiostat</code> – per-mount NFS I/O stats (like iostat).</li>
              <li><code>smbstatus -L</code> – open files and locks.</li>
              <li><code>netstat -s</code> – network statistics, retransmits.</li>
              <li><code>tcpdump -i eth0 port 2049 or 445</code> – capture and analyze latency.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 dark:from-cyan-950/30 p-5 rounded-2xl border border-cyan-100 dark:border-cyan-800">
            <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">📁 Log Analysis</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1 text-sm">
              <li>NFS server: <code>journalctl -u nfs-server -f</code></li>
              <li>NFS client: <code>journalctl -f | grep -i nfs</code></li>
              <li>Samba: <code>log level = 2</code> in smb.conf, logs in <code>/var/log/samba/</code></li>
              <li>Kernel messages: <code>dmesg | grep -i nfs</code></li>
            </ul>
          </div>
        </div>

        {/* ========== RECOVERY PROCEDURES ========== */}
        <div className="mt-16 bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-300">🔄 Emergency Recovery Steps</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-bold">NFS Recovery</h3>
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Stop NFS server: <code>systemctl stop nfs-server</code></li>
                <li>Check exports and filesystem integrity (fsck)</li>
                <li>Restart rpcbind and nfs-server</li>
                <li>For clients: <code>umount -f -l</code> then remount</li>
                <li>If stale handles persist, reboot client</li>
              </ol>
            </div>
            <div>
              <h3 className="font-bold">SMB/Samba Recovery</h3>
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Restart smbd: <code>systemctl restart smbd</code></li>
                <li>Check smb.conf syntax: <code>testparm</code></li>
                <li>Verify share directory exists and permissions</li>
                <li>Clear client cache: <code>net use * /delete</code> (Windows)</li>
                <li>Check for port conflicts (445, 139)</li>
              </ol>
            </div>
          </div>
        </div>

        {/* ========== TIPS, MISTAKES, BEST PRACTICES, CHECKLIST ========== */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 dark:from-cyan-950/30 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800 hover:shadow">
              <h4 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">🧠 Professional Debugging Tips</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>Always check logs first – they often contain the exact error.</li>
                <li>Reproduce the issue with increased verbosity (e.g., <code>mount -v</code>).</li>
                <li>Isolate network: test on same subnet, then across routers.</li>
                <li>Use <code>strace</code> on a simple command to see where it hangs.</li>
                <li>For intermittent issues, enable persistent logging and review after occurrence.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 dark:from-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-800 hover:shadow">
              <h4 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Troubleshooting Mistakes</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Assuming the issue is protocol before checking network/firewall.</li>
                <li>Changing multiple variables at once → can't isolate root cause.</li>
                <li>Forgetting to check server time (NTP) for Kerberos.</li>
                <li>Using "guest ok" to test – bypasses authentication but hides real issue.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">✅ Best Practices for Troubleshooting</h4>
              <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Document the issue, what you tried, and the resolution.</li>
                <li>Create a test share with minimal options to validate config.</li>
                <li>Keep a "known good" configuration backup.</li>
                <li>Use version control for config files (git).</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 hover:shadow">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300">📋 Troubleshooting Readiness Checklist</h4>
              <ul className="space-y-1 text-gray-800 dark:text-gray-200 text-sm font-mono">
                <li>☐ Know your network topology (VLANs, firewalls)</li>
                <li>☐ Have access to server logs (journalctl, /var/log/samba)</li>
                <li>☐ Install diagnostic tools (tcpdump, wireshark, nfsstat, smbclient)</li>
                <li>☐ Test connectivity (ping, telnet to ports)</li>
                <li>☐ Verify NTP sync for Kerberos</li>
                <li>☐ Keep a list of critical export/share options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== REAL-WORLD SCENARIO (TROUBLESHOOTING STORY) ========== */}
        <div className="mt-16 bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
          <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">📖 Troubleshooting Story: The Slow Login</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            At Jadavpur University, students complained of 30-second delays logging into Linux lab workstations. 
            The problem was intermittent. Suspecting NFS home directories, the admin checked <code>nfsstat -c</code> 
            and saw high retransmission counts. A <code>tcpdump</code> revealed that the NFS server was sending 
            large packets that fragmented. The solution: reduce MTU on client side (or enable jumbo frames on network). 
            After setting MTU to 1400 on clients, logins became instant.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            <strong>Lesson:</strong> Performance issues often hide at lower layers – don't always blame the protocol.
          </p>
          <div className="mt-3 text-xs text-gray-500">
            💡 <strong>Try changing this:</strong> <code>ip link set eth0 mtu 1400</code> on client and observe changes.
          </div>
        </div>

        {/* ========== FAQ SECTION ========== */}
        <div className="mt-20">
          <FAQTemplate title="Basic Troubleshooting – NFS & SMB FAQs" questions={questions} />
        </div>

        {/* ========== TEACHER'S NOTE ========== */}
        <div className="mt-12">
          <Teacher note="Students need hands-on troubleshooting labs. Set up a broken NFS or Samba share intentionally (e.g., wrong export, firewall block, permission issue) and ask them to diagnose in teams. Provide no hints initially – let them follow the systematic approach. Emphasize that 'git blame' on config files can save hours. Also, show how to use 'script' to log entire troubleshooting session for later review. Finally, remind them that the best troubleshooters are those who read logs thoroughly, not those who guess." />
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

export default Topic5;