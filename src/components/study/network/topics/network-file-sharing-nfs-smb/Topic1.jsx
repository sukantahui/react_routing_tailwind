import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";

/**
 * Topic1 Component
 * 
 * Prototype: function Topic1(): JSX.Element
 * Return type: JSX.Element
 * Purpose: Provide in-depth coverage of NFS (Network File System) – its purpose,
 *          architecture, versions (NFSv3 vs NFSv4), export/mount concepts,
 *          security, performance tuning, and common use cases.
 * When & why used: After the introduction to network file sharing (Topic0),
 *                  this topic dives into NFS as the primary Unix/Linux file-sharing protocol.
 */
const Topic1 = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* ========== HERO SECTION ========== */}
        <div className="space-y-6 text-center md:text-left">
          <div 
            className="animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]"
            style={{ animationFillMode: 'both' }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 mb-4">
              Topic 1 • Deep Dive
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              NFS (Network File System)
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              From its Unix roots to modern NFSv4.2 – understanding stateless vs stateful,
              exports, mounts, security, and why NFS remains essential in Linux environments.
            </p>
          </div>
        </div>

        {/* ========== NFS OVERVIEW & PURPOSE ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">🗄️</span> What is NFS?
            </h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Network File System</strong> is a distributed file system protocol developed by Sun Microsystems in 1984. 
              It allows a client to access files over a network as if they were on local storage. 
              NFS is the de facto standard for file sharing in Unix/Linux environments.
            </p>
            <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg text-sm">
              💡 <strong>Classroom analogy:</strong> Imagine a library (server) where students (clients) can borrow books (files) 
              but the books remain in the library – they only see a "virtual copy" on their desks.
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-3xl">🎯</span> When & Why Use NFS?
            </h2>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Centralized home directories for Linux workstations (e.g., Jadavpur University lab).</li>
              <li>Shared storage for web servers, database backups, and media files.</li>
              <li>Simpler than SMB in pure Linux environments – no user authentication overhead (though you can add Kerberos).</li>
              <li>Lightweight and fast for many small files (statelessness reduces overhead).</li>
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              <span className="font-mono">Real-world: Barrackpore school uses NFS to host student project directories.</span>
            </div>
          </div>
        </div>

        {/* ========== NFS ARCHITECTURE & COMPONENTS ========== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 mb-6">Architecture & Key Components</h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 transition-all hover:shadow-xl">
            <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              {/* Client side */}
              <rect x="30" y="80" width="140" height="60" rx="10" fill="#818cf8" />
              <text x="100" y="110" textAnchor="middle" fill="white" fontSize="14">User Process</text>
              <text x="100" y="128" textAnchor="middle" fill="#e0e7ff" fontSize="11">(read/write)</text>
              
              <rect x="30" y="160" width="140" height="50" rx="8" fill="#c7d2fe" />
              <text x="100" y="185" textAnchor="middle" fill="#1e1b4b" fontSize="12">VFS</text>
              <text x="100" y="200" textAnchor="middle" fill="#1e1b4b" fontSize="10">(Virtual File System)</text>

              <rect x="230" y="160" width="120" height="50" rx="8" fill="#a5b4fc" />
              <text x="290" y="185" textAnchor="middle" fill="#1e1b4b" fontSize="12">NFS Client</text>

              <rect x="420" y="160" width="120" height="50" rx="8" fill="#fbcfe8" />
              <text x="480" y="185" textAnchor="middle" fill="#9d174d" fontSize="12">RPC / XDR</text>

              <line x1="170" y1="185" x2="222" y2="185" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowNFS)" />
              <line x1="350" y1="185" x2="412" y2="185" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowNFS)" />
              
              {/* Network */}
              <rect x="40" y="230" width="720" height="35" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="400" y="252" textAnchor="middle" fill="#0f172a" fontSize="13">TCP/UDP Network (Port 2049, RPC Portmapper 111)</text>

              {/* Server side */}
              <rect x="600" y="80" width="140" height="60" rx="10" fill="#f59e0b" />
              <text x="670" y="110" textAnchor="middle" fill="white" fontSize="14">NFS Server</text>
              <text x="670" y="128" textAnchor="middle" fill="#fef3c7" fontSize="11">(nfsd threads)</text>

              <rect x="600" y="160" width="140" height="50" rx="8" fill="#fed7aa" />
              <text x="670" y="185" textAnchor="middle" fill="#92400e" fontSize="12">Export fs</text>
              <text x="670" y="200" textAnchor="middle" fill="#92400e" fontSize="10">(/etc/exports)</text>

              <line x1="540" y1="185" x2="592" y2="185" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowNFS)" />
              <line x1="670" y1="140" x2="670" y2="152" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowNFS)" />

              <defs>
                <marker id="arrowNFS" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#4f46e5" />
                </marker>
              </defs>
            </svg>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center text-sm">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded hover:shadow transition">VFS: Intercepts syscalls, redirects NFS ops</div>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded hover:shadow transition">RPC/XDR: Marshals data for network transmission</div>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded hover:shadow transition">nfsd: Kernel threads handling client requests</div>
            </div>
          </div>
        </div>

        {/* ========== NFS VERSIONS: v3 vs v4 ========== */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">📜 NFSv3 (1995)</h3>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Stateless:</strong> Server does not remember client state; each request is independent.</li>
              <li><strong>Uses external lock manager (NLM)</strong> – locking not part of protocol, can break.</li>
              <li><strong>AUTH_SYS</strong> – weak authentication (UID/GID sent in clear).</li>
              <li>Requires <strong>rpcbind</strong> and multiple ports (firewall complex).</li>
              <li>Still widely used for its simplicity and performance.</li>
            </ul>
            <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono">
              mount -o vers=3 server:/export /mnt
            </div>
          </div>

          <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700">
            <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">🚀 NFSv4 (2003) & v4.2</h3>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Stateful</strong> – integrates locking, delegations, and session management.</li>
              <li><strong>Single port 2049</strong> – easier firewall (no rpcbind needed).</li>
              <li><strong>Strong authentication:</strong> Kerberos (krb5, krb5i, krb5p), also LIPKEY.</li>
              <li><strong>Pseudo filesystem</strong> – exports all shares under a single root.</li>
              <li>v4.2 adds server-side copy, sparse files, space reservation.</li>
            </ul>
            <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono">
              mount -t nfs4 -o sec=krb5p server:/ /mnt
            </div>
          </div>
        </div>

        {/* ========== EXPORT & MOUNT CONCEPTS ========== */}
        <div className="mt-16 bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6 transition-all hover:shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📦 Exporting & Mounting NFS</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-bold text-indigo-700 dark:text-indigo-400">Server: /etc/exports syntax</h3>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm mt-2 overflow-x-auto">
                {`/srv/share client_ip(rw,sync,no_subtree_check)
/srv/share 192.168.1.0/24(ro,root_squash)
/srv/share *.example.com(rw,async,no_root_squash)`}
              </pre>
              <p className="text-xs text-gray-500 mt-1">Options: rw/ro, sync/async, root_squash/no_root_squash, subtree_check/no_subtree_check</p>
            </div>
            <div>
              <h3 className="font-bold text-indigo-700 dark:text-indigo-400">Client: mount command</h3>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm mt-2 overflow-x-auto">
                {`sudo mount -t nfs server:/srv/share /mnt/nfs
sudo mount -o vers=4.2,rsize=1048576 server:/export /mnt`}
              </pre>
              <p className="text-xs text-gray-500 mt-1"><strong>Observation:</strong> NFSv4 mounts often use just <code>server:/</code> (pseudo root).</p>
              <div className="mt-3 text-xs bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded">
                💡 Try changing this: Add <code>_netdev</code> to fstab for network-aware mounting.
              </div>
            </div>
          </div>
        </div>

        {/* ========== SECURITY & PERFORMANCE ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800 hover:shadow transition">
            <h3 className="text-xl font-bold text-rose-800 dark:text-rose-300">🔒 NFS Security</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
              <li><strong>AUTH_SYS (default)</strong> – UID/GID sent in plain text; easily spoofed.</li>
              <li><strong>Kerberos (krb5/krb5i/krb5p)</strong> – authentication, integrity, privacy (encryption).</li>
              <li><strong>Root squashing</strong> – maps client root to anonymous (nfsnobody).</li>
              <li><strong>Export restrictions</strong> – limit by IP or hostname.</li>
              <li>NFSv4 supports ACLs (Access Control Lists) similar to POSIX ACLs.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800 hover:shadow transition">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">⚡ Performance Tuning Tips</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
              <li><strong>rsize/wsize</strong> – up to 1MB (1048576) for high speed.</li>
              <li><strong>TCP vs UDP:</strong> TCP for reliability (default), UDP for low latency (NFSv3).</li>
              <li><strong>noatime</strong> – disables access time updates, reduces writes.</li>
              <li><strong>async</strong> export option (risk!) improves write performance.</li>
              <li><strong>jumbo frames</strong> (MTU 9000) reduce packet overhead.</li>
            </ul>
          </div>
        </div>

        {/* ========== TIPS, MISTAKES, BEST PRACTICES, CHECKLIST ========== */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 dark:from-cyan-950/30 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800 hover:shadow">
              <h4 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">🧠 NFS Pro Tips</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>Use <code>exportfs -ra</code> after editing /etc/exports – no restart needed.</li>
                <li>For mixed Unix environments, set consistent UID/GIDs or deploy NFSv4 + idmapd.</li>
                <li>Debug with <code>rpcinfo -p server</code>, <code>showmount -e server</code>, and <code>nfsstat</code>.</li>
                <li>When NFS mounts hang, <code>umount -f -l</code> (lazy unmount) can recover.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 dark:from-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-800 hover:shadow">
              <h4 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Mistakes</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Forgetting to start <code>rpcbind</code> and <code>nfs-server</code> on server.</li>
                <li>Using <code>no_root_squash</code> on multi-user exports – huge security risk.</li>
                <li>Assuming NFSv3 provides strong authentication – it does not.</li>
                <li>Blocking port 111 or ephemeral ports for NFSv3 in firewall.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">✅ Best Practices</h4>
              <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Prefer NFSv4 with Kerberos for any sensitive data.</li>
                <li>Export whole filesystems, not subdirectories (use <code>no_subtree_check</code>).</li>
                <li>Set <code>sync</code> for critical data, <code>async</code> only for caches.</li>
                <li>Monitor NFS with <code>nfsiostat</code> and <code>nfsstat -s</code>.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 hover:shadow">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300">📋 NFS Memory Checklist</h4>
              <ul className="space-y-1 text-gray-800 dark:text-gray-200 text-sm font-mono">
                <li>☐ NFS server: nfs-kernel-server / nfs-utils installed</li>
                <li>☐ /etc/exports correctly formatted</li>
                <li>☐ exportfs -ra applied</li>
                <li>☐ Firewall: TCP/UDP 2049 (and 111 for v3)</li>
                <li>☐ Client: nfs-common installed, mount with correct version</li>
                <li>☐ Test: showmount -e, touch, and nfsstat</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== REAL-WORLD SCENARIO (STORY) ========== */}
        <div className="mt-16 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">📖 Real-World Scenario: Jadavpur University CS Lab</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            The university has 200 Linux workstations for students. Each student (e.g., Abhronila, Debangshu) 
            has a home directory stored on a central NFS server (<code>/export/home/username</code>). 
            When a student logs into any workstation, PAM automatically mounts their home directory via NFSv4. 
            This provides a seamless experience: files follow them, backups are centralized, and storage quotas are enforced.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            The NFS exports are secured with Kerberos, so only authenticated users can access their own directories. 
            Performance is tuned with <code>rsize=1048576,wsize=1048576</code> and jumbo frames.
          </p>
          <div className="mt-3 text-xs text-gray-500">
            🔍 <strong>Observe carefully:</strong> How would you set quotas on NFS? (Hint: Use filesystem quotas on the exported partition.)
          </div>
        </div>

        {/* ========== FAQ SECTION ========== */}
        <div className="mt-20">
          <FAQTemplate title="NFS (Network File System) – Deep Dive FAQs" questions={questions} />
        </div>

        {/* ========== TEACHER'S NOTE ========== */}
        <div className="mt-12">
          <Teacher note="Students often struggle with the stateless vs stateful concept. Use the analogy of a vending machine (stateless) vs a waiter (stateful). Also emphasize that NFSv3's separate lock manager is brittle – show them what happens when the server reboots while a file is locked. For lab exercises, have them set up NFSv3 and NFSv4 side by side, capture traffic with tcpdump, and compare the RPC calls. Finally, highlight that NFS is not 'insecure by default' – it's 'unauthenticated by default'. Kerberos adds real security." />
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

export default Topic1;