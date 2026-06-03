import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4 Component
 * 
 * Prototype: function Topic4(): JSX.Element
 * Return type: JSX.Element
 * Purpose: Present real-world scenarios and case studies for NFS and SMB deployments,
 *          covering schools, offices, cloud backends, media streaming, backup infrastructure,
 *          and hybrid environments.
 * When & why used: After understanding NFS and SMB theory and comparison, this topic
 *                  applies knowledge to realistic situations, fostering decision-making
 *                  and problem-solving skills.
 */
const Topic4 = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* ========== HERO SECTION ========== */}
        <div className="space-y-6 text-center md:text-left">
          <div 
            className="animate-[fadeSlideUp_0.5s_ease-out] motion-safe:animate-[fadeSlideUp_0.5s_ease-out]"
            style={{ animationFillMode: 'both' }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 mb-4">
              Topic 4 • Application
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Real-World Scenarios
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Case studies, deployment patterns, and lessons learned from actual NFS and SMB
              implementations in education, enterprise, cloud, and backup infrastructure.
            </p>
          </div>
        </div>

        {/* ========== SCENARIO 1: SCHOOL LAB (NFS) ========== */}
        <div className="mt-16 group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-2xl">🏫</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scenario 1: Barrackpore High School – Linux Lab with NFS</h2>
              <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong className="font-semibold">The challenge:</strong> 100+ Ubuntu workstations, 500 students. Each student needs a persistent home directory accessible from any machine. Staff require shared assignment dropbox and read-only resource library. No Windows servers, limited IT budget.</p>
                <p><strong className="font-semibold">Solution:</strong> Central NFS server (Ubuntu) exporting three shares:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">/export/home</code> – student home directories (rw, no_root_squash, Kerberos optional).</li>
                  <li><code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">/export/assignments</code> – teacher writable, student read-only (ro).</li>
                  <li><code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">/export/resources</code> – read-only for all.</li>
                </ul>
                <p><strong className="font-semibold">Result:</strong> Students log in via PAM automount; files follow them. Backup of single server simplifies disaster recovery. Performance: NFSv3 with TCP, rsize=32768 handles 100 concurrent sessions well.</p>
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm">
                  💡 <strong>Lesson learned:</strong> Without Kerberos, set <code>all_squash, anonuid=1000</code> to map all students to a single unprivileged user (simpler but less granular). Upgrade to NFSv4+Kerberos when time permits.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SCENARIO 2: GOVERNMENT OFFICE (SMB + SAMBA) ========== */}
        <div className="mt-8 group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-sky-200 dark:hover:border-sky-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-2xl">🏛️</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scenario 2: Ichapur Municipality – Mixed OS with Samba</h2>
              <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong className="font-semibold">The challenge:</strong> 30 Windows 10 desktops, 15 Linux workstations (Ubuntu), 10 iPads. Need to share departmental files (Finance, Engineering, Public Works) with fine-grained permissions. Must comply with data retention and audit logs.</p>
                <p><strong className="font-semibold">Solution:</strong> Ubuntu Server with Samba 4.15 acting as standalone file server (not domain controller). Configuration highlights:</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto mt-2">
                  {`[finance]
   path = /srv/finance
   valid users = @finance
   write list = @finance_admins
   smb encrypt = mandatory
   vfs objects = audit full_audit
   audit:facility = LOCAL5
   audit:priority = NOTICE

[public]
   path = /srv/public
   read only = yes
   guest ok = yes`}
                </pre>
                <p><strong className="font-semibold">Result:</strong> Windows clients map drives via Group Policy; Linux clients mount via <code>mount -t cifs</code>; iPads connect via third-party SMB apps. Auditing tracks all file modifications.</p>
                <div className="mt-3 p-3 bg-sky-50 dark:bg-sky-950/30 rounded-lg text-sm">
                  💡 <strong>Lesson learned:</strong> Enable <code>smb encrypt = mandatory</code> for finance share to ensure compliance. Audit logs proved critical during a data leak investigation.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SCENARIO 3: CLOUD STORAGE BACKEND (NFS + OBJECT) ========== */}
        <div className="mt-8 group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-2xl">☁️</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scenario 3: Cloud Storage Provider – NFS as Building Block</h2>
              <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong className="font-semibold">The challenge:</strong> A startup wants to build a Dropbox-like service. They need a scalable, POSIX-compliant backend for user files, with snapshots and high availability.</p>
                <p><strong className="font-semibold">Solution:</strong> Use NFSv4 on clustered storage (e.g., GlusterFS or Ceph exported via NFS-Ganesha). Each user's home directory is an NFS export from the cluster. The frontend (sync engine) accesses files via NFS and pushes changes to object storage (S3) for versioning.</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>NFS provides low-latency random I/O.</li>
                  <li>Object storage provides durability and cross-region replication.</li>
                  <li>Hybrid: hot data on NFS, cold data archived.</li>
                </ul>
                <p><strong className="font-semibold">Result:</strong> Scalable to millions of users, with NFS delegations reducing server load. However, NFS lock scalability became an issue at extreme concurrency, requiring sharding.</p>
                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-sm">
                  💡 <strong>Lesson learned:</strong> NFS works well as a building block, but not as a complete cloud solution – combine with object storage and rethink locking for WAN clients.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SCENARIO 4: MEDIA PRODUCTION (SMB MULTICHANNEL) ========== */}
        <div className="mt-8 group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-rose-200 dark:hover:border-rose-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-2xl">🎬</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scenario 4: Kolkota Media House – SMB 3.0 with Multichannel</h2>
              <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong className="font-semibold">The challenge:</strong> Video editors (Windows 10) need to access 4K raw footage stored on a central server. Single 10GbE link is bottleneck; editors experience stuttering during playback.</p>
                <p><strong className="font-semibold">Solution:</strong> Windows Server 2019 with SMB 3.0 multichannel. Server has two 10GbE NICs, each editor workstation also dual 10GbE. SMB automatically aggregates bandwidth:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>~20 Gbps aggregate throughput per client.</li>
                  <li>Automatic failover if one NIC fails.</li>
                  <li>No changes to applications.</li>
                </ul>
                <p><strong className="font-semibold">Result:</strong> Smooth 4K editing, 4 concurrent streams per editor. Stuttering eliminated. Backup: Shadow Copies enabled for quick file recovery.</p>
                <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg text-sm">
                  💡 <strong>Lesson learned:</strong> SMB multichannel is underutilized – it's a game-changer for bandwidth-intensive workloads. Ensure NICs and switch support RSS and RSS.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SCENARIO 5: BACKUP INFRASTRUCTURE (NFS VS SMB) ========== */}
        <div className="mt-8 group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-amber-200 dark:hover:border-amber-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-2xl">💾</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scenario 5: University Backup Server – Choosing Protocol</h2>
              <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p><strong className="font-semibold">The challenge:</strong> Jadavpur University needs a backup target for 50 Linux servers (NFS clients) and 20 Windows servers (SMB clients). Backup software (Bacula) can write to either NFS or SMB.</p>
                <p><strong className="font-semibold">Analysis:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>NFS v3 is simpler for Linux backup clients – no authentication configuration.</li>
                  <li>SMB provides encryption out-of-box, but requires authentication and Samba setup.</li>
                  <li>Backup data size: 10 TB weekly.</li>
                </ul>
                <p><strong className="font-semibold">Decision:</strong> Choose NFSv4 with IP restrictions and separate VLAN for backup traffic. Use NFSv4 (not v3) for better locking and future Kerberos. Encryption achieved via VPN tunnel between backup server and clients.</p>
                <p><strong className="font-semibold">Result:</strong> Reliable backups at 800 Mbps (limited by disk IO). No authentication issues. Later migrated to NFSv4 with Kerberos for compliance.</p>
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm">
                  💡 <strong>Lesson learned:</strong> NFS can be secure if network isolated; not every backup needs encryption at rest. Simplicity often wins over features for internal backups.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== DECISION FRAMEWORK SUMMARY ========== */}
        <div className="mt-16 bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Decision Framework Recap</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-bold text-indigo-700 dark:text-indigo-400">When NFS Shines</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>Linux/Unix only environments</li>
                <li>Simple, lightweight file sharing (no user accounts)</li>
                <li>High performance for many small files</li>
                <li>HPC and pNFS workloads</li>
                <li>When encryption can be handled at lower layers (VPN/VLAN)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sky-700 dark:text-sky-400">When SMB Wins</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>Mixed OS (Windows + Linux + macOS)</li>
                <li>Need encryption without Kerberos complexity</li>
                <li>Active Directory integration required</li>
                <li>Print sharing and IPC needed</li>
                <li>High-throughput large files (multichannel, RDMA)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== TIPS, MISTAKES, BEST PRACTICES, CHECKLIST ========== */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 dark:from-cyan-950/30 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800 hover:shadow">
              <h4 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">🧠 Real-World Pro Tips</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>Always separate management VLAN from storage VLAN for security.</li>
                <li>For NFS home directories, enable <code>noatime</code> mount option to reduce writes.</li>
                <li>Samba: Use <code>vfs objects = recycle</code> for a network trash can.</li>
                <li>Monitor NFS with <code>nfsstat</code>; SMB with <code>smbstatus</code> and Windows Performance Monitor.</li>
                <li>Test disaster recovery: Unplug server and see if clients recover (hard vs soft).</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 dark:from-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-800 hover:shadow">
              <h4 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls in Deployments</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Underestimating backup needs – central server failure takes down all.</li>
                <li>Forgetting to set proper quotas on NFS exports – students fill server.</li>
                <li>Using SMB1 for legacy devices without compensating controls.</li>
                <li>Not testing performance before deployment – misconfigured rsize/wsize.</li>
                <li>Ignoring time synchronization (NTP) – Kerberos fails with clock skew.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">✅ Best Practices from Production</h4>
              <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Document the decision rationale for protocol choice.</li>
                <li>Use monitoring (Prometheus + exporters for NFS/SMB).</li>
                <li>Implement least privilege: share only what's needed.</li>
                <li>Regularly audit access with logs and automated reports.</li>
                <li>Plan for growth: use DNS names, not IPs, in exports/fstab.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 hover:shadow">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300">📋 Deployment Readiness Checklist</h4>
              <ul className="space-y-1 text-gray-800 dark:text-gray-200 text-sm font-mono">
                <li>☐ Assess client OS mix and number of concurrent users</li>
                <li>☐ Choose protocol based on decision framework</li>
                <li>☐ Design network: VLANs, firewall rules, jumbo frames if needed</li>
                <li>☐ Deploy test share, validate authentication and permissions</li>
                <li>☐ Load test with expected concurrent users</li>
                <li>☐ Implement backup and monitor for first month</li>
                <li>☐ Document configuration and train helpdesk</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== REAL-WORLD SCENARIO SUMMARY TABLE ========== */}
        <div className="mt-16 overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Case Study Summary Table</h2>
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr><th className="px-4 py-2">Scenario</th><th className="px-4 py-2">Protocol</th><th className="px-4 py-2">Key Takeaway</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr><td className="px-4 py-2">Barrackpore School Linux lab</td><td className="font-semibold text-indigo-600">NFS</td><td>Simplicity + central backup. Use automount for home directories.</td></tr>
                <tr><td className="px-4 py-2">Ichapur Municipality mixed office</td><td className="font-semibold text-sky-600">SMB (Samba)</td><td>Auditing + encryption mandatory for compliance.</td></tr>
                <tr><td className="px-4 py-2">Cloud storage backend</td><td className="font-semibold text-purple-600">NFS + Object</td><td>NFS provides POSIX, object for durability.</td></tr>
                <tr><td className="px-4 py-2">Media production house</td><td className="font-semibold text-rose-600">SMB 3.0 Multichannel</td><td>Aggregate NICs for 4K video editing.</td></tr>
                <tr><td className="px-4 py-2">University backup server</td><td className="font-semibold text-amber-600">NFSv4</td><td>Isolated VLAN can compensate for lack of encryption.</td></tr>
              </tbody>
            </table>
          </div>

        {/* ========== FAQ SECTION ========== */}
        <div className="mt-20">
          <FAQTemplate title="Real-World Scenarios – FAQs" questions={questions} />
        </div>

        {/* ========== TEACHER'S NOTE ========== */}
        <div className="mt-12">
          <Teacher note="These scenarios come from real consulting engagements (anonymized). Have students role-play as consultants: give them a brief and ask them to recommend protocol, justify with trade-offs. Encourage them to question assumptions – 'Do we really need encryption?' 'What's the cost of NFS vs Samba?' Also, emphasize that 'perfect security' is often sacrificed for practicality; e.g., isolated VLAN NFS is acceptable for many internal networks. Invite local IT pros to share their own war stories – students love real failures." />
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

export default Topic4;