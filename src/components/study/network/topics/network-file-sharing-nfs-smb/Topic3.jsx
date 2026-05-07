import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3 Component
 * 
 * Prototype: function Topic3(): JSX.Element
 * Return type: JSX.Element
 * Purpose: Provide a comprehensive comparison between NFS and SMB protocols,
 *          covering architecture, performance, security, platform support,
 *          and use cases to help students choose the right protocol.
 * When & why used: After deep dives into NFS (Topic1) and SMB (Topic2),
 *                  this topic integrates knowledge for decision-making in
 *                  real-world mixed environments.
 */
const Topic3 = () => {
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
              Topic 3 • Comparison
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              NFS vs SMB: A Head-to-Head Comparison
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Which protocol to use when? Compare architecture, performance, security, platform support,
              and real-world decision criteria for network file sharing in mixed environments.
            </p>
          </div>
        </div>

        {/* ========== COMPARISON TABLE (MAIN) ========== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 mb-6">Feature Comparison at a Glance</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30 shadow-sm transition-all duration-300 hover:shadow-md">
            <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-base">
                <tr>
                  <th className="px-6 py-4 w-1/3">Feature</th>
                  <th className="px-6 py-4 w-1/3 bg-indigo-50 dark:bg-indigo-950/40">NFS (v4.2)</th>
                  <th className="px-6 py-4 w-1/3 bg-sky-50 dark:bg-sky-950/40">SMB (3.1.1)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Primary OS</td><td>Unix/Linux (native)</td><td>Windows (native)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Cross-platform</td><td>Windows via MS Client for NFS; macOS (limited)</td><td>Linux via Samba; macOS native (SMBX)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Statefulness</td><td>NFSv3: stateless; NFSv4: stateful</td><td>Stateful (sessions, handles)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Default Port</td><td>2049 (TCP/UDP) + rpcbind (111) for v3</td><td>445 (TCP)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Authentication</td><td>AUTH_SYS (weak), Kerberos (v4)</td><td>NTLMv2, Kerberos (AD integrated)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Encryption</td><td>krb5p (Kerberos privacy), TLS (experimental)</td><td>AES-128-CCM/GCM (SMB 3.0+)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Signing</td><td>Optional (RPCSEC_GSS with integrity)</td><td>Mandatory in SMB 3.1.1, optional earlier</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">File Locking</td><td>NFSv3: NLM (separate); NFSv4: integrated</td><td>Integrated (oplocks, leases, byte-range)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Performance features</td><td>Delegations, compound RPC, pNFS</td><td>Multichannel, RDMA, directory leasing</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Print Sharing</td><td>Not native (CUPS + NFS export)</td><td>Native print server (SMB print)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Auditing</td><td>Minimal (filesystem audit)</td><td>Native via Event Log / Samba audit VFS</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"><td className="px-6 py-3 font-semibold">Open Source Implementation</td><td>Linux kernel (nfsd)</td><td>Samba (smbd)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ========== DETAILED COMPARISON CARDS ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold">N</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NFS Strengths</h2>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside leading-relaxed">
              <li><strong>Simplicity in Unix environments</strong> – No user account management needed; relies on UIDs/GIDs.</li>
              <li><strong>Stateless option (NFSv3)</strong> – Easy recovery after server crash; clients retry.</li>
              <li><strong>Lightweight and fast</strong> – Lower overhead for many small files.</li>
              <li><strong>pNFS (parallel NFS)</strong> – High throughput for HPC workloads.</li>
              <li><strong>Native Kerberos in v4</strong> – Strong security when configured.</li>
            </ul>
            <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg text-sm">
              💡 <strong>When to choose:</strong> Pure Linux/Unix labs, HPC clusters, environments with consistent UIDs.
            </div>
          </div>

          <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 transition-all duration-300 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-700 dark:text-sky-300 font-bold">S</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SMB Strengths</h2>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside leading-relaxed">
              <li><strong>Native Windows integration</strong> – Mapped drives, Group Policy, AD integration.</li>
              <li><strong>Strong built-in security</strong> – Encryption by default (SMB 3.0+), signing, Kerberos.</li>
              <li><strong>Advanced performance features</strong> – Multichannel, RDMA, directory leasing.</li>
              <li><strong>Print sharing & IPC</strong> – Native print server, named pipes.</li>
              <li><strong>Excellent cross-platform support</strong> – Samba on Linux, macOS native SMBX.</li>
            </ul>
            <div className="mt-4 p-3 bg-sky-50 dark:bg-sky-950/30 rounded-lg text-sm">
              💡 <strong>When to choose:</strong> Mixed Windows/Linux environments, need encryption by default, AD integration.
            </div>
          </div>
        </div>

        {/* ========== USE CASE DECISION TREE (SVG) ========== */}
        <div className="mt-20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Decision Flow: Which Protocol to Choose?</h3>
            <p className="text-gray-500 dark:text-gray-400">Hover over each decision node</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 transition-all hover:shadow-xl">
            <svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              {/* Start */}
              <rect x="360" y="20" width="180" height="40" rx="20" fill="#4f46e5" />
              <text x="450" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Start: Need file sharing</text>
              
              {/* First diamond: OS mix */}
              <polygon points="450,90 520,130 450,170 380,130" fill="#f59e0b" className="transition hover:fill-amber-500" />
              <text x="450" y="135" textAnchor="middle" fill="white" fontSize="12">Mixed OS?</text>
              <text x="450" y="150" textAnchor="middle" fill="white" fontSize="10">(Win+Linux+Mac)</text>
              
              <line x1="450" y1="60" x2="450" y2="85" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowDec)" />
              
              {/* Yes branch (right) */}
              <line x1="520" y1="130" x2="650" y2="130" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <text x="585" y="120" textAnchor="middle" fill="#d97706" fontSize="11">Yes</text>
              <rect x="650" y="110" width="200" height="40" rx="8" fill="#0ea5e9" />
              <text x="750" y="135" textAnchor="middle" fill="white" fontSize="13">Use SMB (via Samba)</text>
              
              /* No branch (left) */
              <line x1="380" y1="130" x2="250" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <text x="315" y="120" textAnchor="middle" fill="#f59e0b" fontSize="11">No</text>
              <rect x="50" y="110" width="200" height="40" rx="8" fill="#818cf8" />
              <text x="150" y="135" textAnchor="middle" fill="white" fontSize="13">NFS (Unix/Linux only)</text>
              
              {/* Second level questions */}
              <line x1="450" y1="170" x2="450" y2="210" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <polygon points="450,230 520,270 450,310 380,270" fill="#10b981" className="transition hover:fill-emerald-500" />
              <text x="450" y="275" textAnchor="middle" fill="white" fontSize="11">Need encryption</text>
              <text x="450" y="290" textAnchor="middle" fill="white" fontSize="10">by default?</text>
              
              <line x1="520" y1="270" x2="650" y2="250" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <text x="585" y="260" textAnchor="middle" fill="#059669" fontSize="11">Yes</text>
              <rect x="650" y="230" width="210" height="40" rx="8" fill="#0ea5e9" />
              <text x="755" y="255" textAnchor="middle" fill="white" fontSize="12">SMB 3.0+ (encryption</text>
              <text x="755" y="268" textAnchor="middle" fill="white" fontSize="10">built-in)</text>
              
              <line x1="380" y1="270" x2="230" y2="250" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <text x="305" y="260" textAnchor="middle" fill="#059669" fontSize="11">No</text>
              <rect x="30" y="230" width="200" height="40" rx="8" fill="#818cf8" />
              <text x="130" y="255" textAnchor="middle" fill="white" fontSize="12">NFSv3 (no encryption</text>
              <text x="130" y="268" textAnchor="middle" fill="white" fontSize="10">fast, but insecure)</text>
              
              {/* Third level: performance */}
              <line x1="450" y1="310" x2="450" y2="350" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <polygon points="450,370 520,410 450,450 380,410" fill="#8b5cf6" className="transition hover:fill-violet-500" />
              <text x="450" y="415" textAnchor="middle" fill="white" fontSize="11">Need extreme</text>
              <text x="450" y="430" textAnchor="middle" fill="white" fontSize="10">performance?</text>
              
              <line x1="520" y1="410" x2="650" y2="410" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <text x="585" y="400" textAnchor="middle" fill="#7c3aed" fontSize="11">Yes</text>
              <rect x="650" y="390" width="210" height="40" rx="8" fill="#0ea5e9" />
              <text x="755" y="412" textAnchor="middle" fill="white" fontSize="12">SMB multichannel /</text>
              <text x="755" y="425" textAnchor="middle" fill="white" fontSize="10">RDMA or pNFS</text>
              
              <line x1="380" y1="410" x2="230" y2="410" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowDec)" />
              <text x="305" y="400" textAnchor="middle" fill="#7c3aed" fontSize="11">No</text>
              <rect x="30" y="390" width="200" height="40" rx="8" fill="#818cf8" />
              <text x="130" y="412" textAnchor="middle" fill="white" fontSize="12">Either works;</text>
              <text x="130" y="425" textAnchor="middle" fill="white" fontSize="10">choose based on OS</text>
              
              <defs>
                <marker id="arrowDec" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#4f46e5" />
                </marker>
              </defs>
            </svg>
            <p className="text-center text-xs text-gray-500 mt-4">Use this flow to decide: NFS (Linux-only, no encryption) vs SMB (mixed, encryption, Windows integration)</p>
          </div>
        </div>

        {/* ========== PERFORMANCE & SCALING COMPARISON ========== */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">📈 Performance Comparison</h3>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>Small files (many)</strong> – NFSv3 often faster due to statelessness and lower overhead.</li>
              <li><strong>Large files (sequential)</strong> – SMB 3.0+ with multichannel and RDMA can outperform NFS.</li>
              <li><strong>High latency (WAN)</strong> – Both can be tuned; NFS hard mounts retry, SMB durable handles help.</li>
              <li><strong>CPU overhead</strong> – NFSv4 with krb5p vs SMB3 encryption; both use AES-NI.</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-2xl p-5 border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">🔐 Security Comparison</h3>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>NFSv3</strong> – AUTH_SYS is plaintext UID; easily forged. Use IP restrictions as mitigation.</li>
              <li><strong>NFSv4+Kerberos</strong> – Strong, but complex to set up (keytabs, idmapd).</li>
              <li><strong>SMB 3.0+</strong> – Encryption and signing by default; simple to enable per share.</li>
              <li><strong>SMB signing</strong> – Protects integrity; SMB 3.1.1 requires pre-auth integrity.</li>
            </ul>
          </div>
        </div>

        {/* ========== DECISION TABLE for Common Scenarios ========== */}
        <div className="mt-16 bg-gray-100 dark:bg-gray-800/40 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scenario-Based Recommendation</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300 border-collapse">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr><th className="px-4 py-2">Scenario</th><th className="px-4 py-2">Recommended Protocol</th><th className="px-4 py-2">Reason</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                <tr className="hover:bg-gray-200 dark:hover:bg-gray-700/50"><td className="px-4 py-2">Linux lab, 100+ student workstations</td><td className="px-4 py-2 font-semibold text-indigo-600">NFSv4</td><td>Native, low overhead, home directories with Kerberos</td></tr>
                <tr className="hover:bg-gray-200 dark:hover:bg-gray-700/50"><td className="px-4 py-2">Windows office with 50 PCs</td><td className="px-4 py-2 font-semibold text-sky-600">SMB (Windows Server)</td><td>Native integration, Group Policy, AD permissions</td></tr>
                <tr className="hover:bg-gray-200 dark:hover:bg-gray-700/50"><td className="px-4 py-2">Mixed OS (Windows+Linux+macOS) school</td><td className="px-4 py-2 font-semibold text-sky-600">SMB via Samba</td><td>Best cross-platform compatibility</td></tr>
                <tr className="hover:bg-gray-200 dark:hover:bg-gray-700/50"><td className="px-4 py-2">HPC cluster needing parallel I/O</td><td className="px-4 py-2 font-semibold text-indigo-600">pNFS (NFSv4.1+)</td><td>Parallel data access to multiple storage nodes</td></tr>
                <tr className="hover:bg-gray-200 dark:hover:bg-gray-700/50"><td className="px-4 py-2">Hyper-V storage over network</td><td className="px-4 py-2 font-semibold text-sky-600">SMB 3.0+ (with RDMA)</td><td>Low latency, high throughput, offloaded data transfer</td></tr>
                <tr className="hover:bg-gray-200 dark:hover:bg-gray-700/50"><td className="px-4 py-2">Embedded Linux device (e.g., router)</td><td className="px-4 py-2 font-semibold text-indigo-600">NFS (lightweight)</td><td>Minimal resource usage</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ========== TIPS, MISTAKES, BEST PRACTICES, CHECKLIST ========== */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-50 dark:from-cyan-950/30 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800 hover:shadow">
              <h4 className="text-xl font-bold text-cyan-800 dark:text-cyan-300">🧠 Decision Tips</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                <li>If you need encryption but cannot set up Kerberos → choose SMB 3.0+.</li>
                <li>Linux-only and want fast setup → NFSv3 (but add IP restrictions).</li>
                <li>For Windows clients, SMB is always the native, simplest choice.</li>
                <li>Use Samba to bridge the gap: Linux SMB server serves both worlds.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 dark:from-red-950/30 p-6 rounded-2xl border border-red-100 dark:border-red-800 hover:shadow">
              <h4 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Assuming NFS is “more secure” – default NFSv3 is not.</li>
                <li>Forgetting that SMB1 is disabled by default on modern Windows – legacy devices may fail.</li>
                <li>Enabling root_squash on NFS where admins need full control.</li>
                <li>Not considering firewall ports: NFSv3 needs many; SMB only 445.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 hover:shadow">
              <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300">✅ Best Practices Summary</h4>
              <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>In mixed environments, prefer SMB (via Samba) for simplicity.</li>
                <li>In Linux-only environments, use NFSv4 with Kerberos for security.</li>
                <li>Always disable legacy versions: NFSv2/v3 if possible, SMB1.</li>
                <li>Document your choice and revisit if environment changes.</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 dark:from-purple-950/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 hover:shadow">
              <h4 className="text-xl font-bold text-purple-800 dark:text-purple-300">📋 Comparison Checklist</h4>
              <ul className="space-y-1 text-gray-800 dark:text-gray-200 text-sm font-mono">
                <li>☐ Assess client OS mix (Windows/Linux/macOS)</li>
                <li>☐ Determine security requirements (encryption, authentication)</li>
                <li>☐ Evaluate performance needs (latency, throughput, large vs small files)</li>
                <li>☐ Check administrative overhead (Kerberos vs AD vs simple config)</li>
                <li>☐ Plan firewall rules (ports needed)</li>
                <li>☐ Test both in a lab before deployment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== REAL-WORLD SCENARIO ========== */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950/30 dark:to-sky-950/30 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">📖 Real-World Decision: Barrackpore College</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            <strong>Situation:</strong> The college has 80 Linux lab workstations, 20 administrative Windows PCs, and 15 macOS laptops for faculty. They need to share:
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Student home directories (only Linux lab)</li>
              <li>Department shared drives (accessible from all OS)</li>
              <li>Print server for all (Windows printers)</li>
            </ul>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            <strong>Decision:</strong> Use NFSv4 with Kerberos for Linux home directories (performance, simplicity within Linux). Use Samba to serve SMB shares for department drives and printers, ensuring Windows and macOS compatibility. This hybrid approach leverages strengths of both protocols.
          </p>
          <div className="mt-3 text-xs text-gray-500">
            💡 <strong>Observe carefully:</strong> Why not use one protocol for everything? Answer: Neither is perfect for all use cases – choose the right tool.
          </div>
        </div>

        {/* ========== FAQ SECTION ========== */}
        <div className="mt-20">
          <FAQTemplate title="NFS vs SMB – Comparison FAQs" questions={questions} />
        </div>

        {/* ========== TEACHER'S NOTE ========== */}
        <div className="mt-12">
          <Teacher note="Students often ask 'which one is better' – challenge them to define 'better' based on context. Use real-world constraints: budget (Windows Server vs Linux + Samba), admin skills, security compliance. A great exercise: Split class into two teams – one argues for NFS, one for SMB – in a given scenario (e.g., hospital with mixed OS and strict encryption requirements). They'll learn that there's no absolute winner. Also emphasize that modern solutions like Samba on Linux can do both, so you don't have to choose 100% of one." />
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

export default Topic3;