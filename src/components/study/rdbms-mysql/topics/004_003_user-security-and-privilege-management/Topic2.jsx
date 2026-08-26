import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Host Matching Rules (localhost, IP addresses, % wildcards, subnet masks)
 * Module: 004_003_user-security-and-privilege-management
 *
 * @component
 * @returns {JSX.Element} Interactive host matching workbench: exploring localhost vs 127.0.0.1 socket vs TCP routing, evaluating host sorting specificity algorithms, defining IP subnet netmasks, and optimizing connection handshakes with skip_name_resolve.
 */
const Topic2 = () => {
  // Interactive Host Matching State
  const [selectedHostPhase, setSelectedHostPhase] = useState("phase1_socket_vs_tcp");

  const hostPhases = {
    phase1_socket_vs_tcp: {
      phaseNumber: "Phase 1: Socket vs TCP",
      title: "1. localhost (Socket) vs 127.0.0.1 (TCP/IP) vs '%' (Any Host)",
      badge: "Transport Protocol",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔌 COMPARING CONNECTION PROTOCOLS & HOST DEFINITIONS:

-- Account 1: Connects ONLY via local UNIX Domain Socket file (No TCP networking!):
CREATE USER 'admin_local'@'localhost' IDENTIFIED BY 'PassLocal#2026';

-- Account 2: Connects via local TCP/IP Loopback interface (Port 3306):
CREATE USER 'admin_tcp'@'127.0.0.1' IDENTIFIED BY 'PassTcp#2026';

-- Account 3: Connects from ANY remote client over TCP/IP:
CREATE USER 'app_remote'@'%' IDENTIFIED BY 'PassRemote#2026';

-- ⚠️ CRUCIAL TAKEAWAYS:
-- 1. Connecting via: mysql -u admin_local -p
--    -> Routes through /var/run/mysqld/mysqld.sock (Matches 'localhost'!) ✅
-- 2. Connecting via: mysql -h 127.0.0.1 -u admin_local -p
--    -> Routes through TCP/IP stack (FAILS because 'localhost' != '127.0.0.1'!) ❌
-- 3. '%' matches any TCP host, but does NOT match Unix socket localhost!`,
      metricsTable: [
        { hostSpecifier: "localhost", transportProtocol: "UNIX Domain Socket (Linux) / Named Pipe (Win)", tcpNetworking: "NO (Bypasses network stack) ⚡", matchesWildcard: "NO ('%' does not match socket)" },
        { hostSpecifier: "127.0.0.1", transportProtocol: "TCP/IP Loopback interface", tcpNetworking: "YES (Port 3306)", matchesWildcard: "YES (Matched by '%')" },
        { hostSpecifier: "%", transportProtocol: "Any remote or local TCP/IP connection", tcpNetworking: "YES (Any IP address)", matchesWildcard: "N/A (Universal wildcard)" },
        { hostSpecifier: "::1", transportProtocol: "IPv6 TCP/IP Loopback", tcpNetworking: "YES (IPv6 stack)", matchesWildcard: "YES (Matched by '%')" }
      ],
      explanation:
        "In MySQL, `localhost` is not an alias for `127.0.0.1`! On Linux, `localhost` routes connections through local Unix domain socket files for ultra-low latency, while `127.0.0.1` routes through the TCP/IP stack. The `%` wildcard matches TCP/IP connections only."
    },
    phase2_specificity_resolution: {
      phaseNumber: "Phase 2: Specificity Sorting",
      title: "2. The Most-Specific-First Host Resolution Algorithm",
      badge: "ACL Resolution",
      badgeColor: "cyan",
      sqlSnippet: `-- 🎯 HOW MYSQL RESOLVES MULTIPLE MATCHING HOST ACCOUNTS:
-- Suppose all 4 accounts exist in mysql.user for username 'developer':
CREATE USER 'developer'@'192.168.1.50' IDENTIFIED BY 'PassExact';      -- Priority 1: Exact IP
CREATE USER 'developer'@'192.168.1.0/24' IDENTIFIED BY 'PassSubnet';   -- Priority 2: Subnet
CREATE USER 'developer'@'192.168.1.%' IDENTIFIED BY 'PassPrefix';      -- Priority 3: Prefix Wildcard
CREATE USER 'developer'@'%' IDENTIFIED BY 'PassUniversal';              -- Priority 4: Universal %

-- SCENARIO: A client connects from IP 192.168.1.50:
-- MySQL evaluates accounts in memory sorted by specificity:
-- 1. Exact IP '192.168.1.50' matches first! -> Authenticates against 'PassExact' ✅
--
-- SCENARIO: A client connects from IP 192.168.1.88:
-- 1. '192.168.1.50' -> No match
-- 2. '192.168.1.0/24' matches! -> Authenticates against 'PassSubnet' ✅

-- Verify which rule matched using CURRENT_USER():
SELECT USER(), CURRENT_USER();
-- USER(): 'developer'@'192.168.1.50' (Client string)
-- CURRENT_USER(): 'developer'@'192.168.1.50' (Matched grant rule!) 🚀`,
      metricsTable: [
        { priority: "Priority 1 (Highest)", hostType: "Exact IP Address", example: "'192.168.1.50'", behavior: "Evaluated first; zero ambiguity ⚡" },
        { priority: "Priority 2", hostType: "Subnet Mask / CIDR", example: "'192.168.1.0/255.255.255.0'", behavior: "Evaluated second; matches network range" },
        { priority: "Priority 3", hostType: "Prefix Wildcard", example: "'192.168.1.%'", behavior: "Evaluated third; octet prefix matching" },
        { priority: "Priority 4 (Lowest)", hostType: "Universal Wildcard", example: "'%'", behavior: "Evaluated last as catch-all fallback" }
      ],
      explanation:
        "When a client connects, MySQL sorts `mysql.user` records in memory from most specific to least specific. An exact IP match always overrides subnet and wildcard accounts, ensuring deterministic access control."
    },
    phase3_subnet_netmasks: {
      phaseNumber: "Phase 3: Subnet Netmasks",
      title: "3. Subnet Masks & Corporate Network Perimeter Control",
      badge: "Subnet Netmasks",
      badgeColor: "amber",
      sqlSnippet: `-- 🏢 RESTRICTING USERS TO CORPORATE SUBNETS & CIDR RANGES:

-- 1. Restricting user to Barrackpore Branch Office (192.168.10.0/24):
CREATE USER 'barrackpore_staff'@'192.168.10.0/255.255.255.0'
  IDENTIFIED BY 'StaffPass#2026';

-- 2. Restricting user to Kolkata Data Center VPC (10.200.0.0/16):
CREATE USER 'kolkata_app'@'10.200.0.0/255.255.0.0'
  IDENTIFIED BY 'VpcAppPass#2026';

-- 3. Restricting user to single IP address block with octet prefix:
CREATE USER 'pos_terminal'@'172.16.5.%'
  IDENTIFIED BY 'TerminalPass#2026';

-- Benefits:
-- If application database credentials leak outside the corporate network,
-- external attackers are blocked immediately at Stage 1 connection! 🔒`,
      metricsTable: [
        { netmaskFormat: "192.168.1.0/255.255.255.0", cidrEquiv: "/24 (256 IPs)", matchedRange: "192.168.1.0 to 192.168.1.255 🏢", useCase: "Branch office network" },
        { netmaskFormat: "10.0.0.0/255.0.0.0", cidrEquiv: "/8 (16.7M IPs)", matchedRange: "10.0.0.0 to 10.255.255.255", useCase: "Corporate enterprise WAN" },
        { netmaskFormat: "172.16.0.0/255.240.0.0", cidrEquiv: "/12 (1M IPs)", matchedRange: "172.16.0.0 to 172.31.255.255", useCase: "Cloud VPC private subnets" },
        { netmaskFormat: "192.168.1.%", cidrEquiv: "Prefix wildcard", matchedRange: "192.168.1.0 to 192.168.1.255", useCase: "Simplified class C subnet" }
      ],
      explanation:
        "Subnet masks and CIDR ranges allow organizations to restrict database logins to specific internal network segments (VPCs, branch offices), ensuring that leaked database passwords cannot be exploited from unauthorized networks."
    },
    phase4_skip_name_resolve: {
      phaseNumber: "Phase 4: skip-name-resolve",
      title: "4. Eliminating DNS Latency with skip-name-resolve",
      badge: "Performance & Reliability",
      badgeColor: "rose",
      sqlSnippet: `-- ⚡ THE DANGER OF HOSTNAMES & THE FIX:

-- ⚠️ ANTI-PATTERN: Defining users with hostnames:
CREATE USER 'analytics'@'app-server-01.internal.net' IDENTIFIED BY 'Pass#1';
-- When 'analytics' connects:
-- 1. MySQL takes client IP 10.0.1.25 and performs a REVERSE DNS LOOKUP!
-- 2. If DNS is slow -> Handshake delays by 500ms - 2,000ms! ⏳
-- 3. If DNS crashes -> ALL DATABASE CONNECTIONS FAIL! 💥

-- ✅ PRODUCTION BEST PRACTICE:
-- Step 1: Enable skip_name_resolve in my.cnf:
-- [mysqld]
-- skip_name_resolve = 1

-- Step 2: Define all accounts using IP addresses and subnets exclusively:
CREATE USER 'analytics'@'10.0.1.25' IDENTIFIED BY 'Pass#1';

-- Result:
-- Zero DNS queries executed! Connection handshakes complete in < 0.5ms! 🚀`,
      metricsTable: [
        { configMode: "Default (DNS Enabled)", reverseDnsLookup: "Executed on every connection ⏳", failureRisk: "DNS outage crashes DB logins", handshakeLatency: "50ms - 2,000ms" },
        { configMode: "skip_name_resolve = 1", reverseDnsLookup: "Completely Disabled ✅", failureRisk: "Zero external DNS dependency", handshakeLatency: "< 0.5ms (Instant!) ⚡" },
        { configMode: "Account Migration Rule", reverseDnsLookup: "Must use IP addresses", failureRisk: "Hostname accounts will fail", handshakeLatency: "Production Standard" }
      ],
      explanation:
        "Enabling `skip_name_resolve = 1` disables all reverse DNS lookups during client handshakes. This eliminates DNS latency and protects database availability against external DNS outages, requiring all user grants to specify IP addresses or subnets."
    }
  };

  const navItems = [
    { id: "host-overview", label: "1. Host Matching Overview" },
    { id: "specificity-diagram", label: "2. Specificity Hierarchy Diagram" },
    { id: "interactive-workbench", label: "3. Host Matching Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Host Security Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_003</span>
            <span>•</span>
            <span>Topic 2 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Host Security &amp; Networking
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Host Matching Rules (localhost, IP addresses, % wildcards, subnet masks)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master MySQL's network perimeter defense: understand the vital difference between <code className="text-emerald-400 font-mono">localhost</code> (Unix socket) and <code className="text-cyan-400 font-mono">127.0.0.1</code> (TCP/IP), leverage the <code className="text-amber-400 font-mono">most-specific-first</code> host sorting algorithm, configure subnet netmasks, and eliminate DNS latency with <code className="text-rose-400 font-mono">skip-name-resolve</code>.
          </p>
        </div>
      </header>

      {/* Navigation Quick Links */}
      <nav className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1: Host Overview */}
        <section id="host-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Network Identity &amp; Host Scoping
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL binds database user identities to physical network connection points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. localhost</span>
              <h3 className="font-bold text-white">Unix Socket File</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects via local Unix socket. Bypasses TCP/IP networking completely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. 127.0.0.1</span>
              <h3 className="font-bold text-white">TCP/IP Loopback</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects over local TCP/IP stack on Port 3306. Matched by `%`.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. Subnets / Netmasks</span>
              <h3 className="font-bold text-white">Perimeter Control</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Restricts access to internal CIDR blocks (e.g. `192.168.1.0/24`).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. skip-name-resolve</span>
              <h3 className="font-bold text-white">Zero DNS Latency</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Disables reverse DNS lookups for instant sub-millisecond connection handshakes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Specificity Diagram */}
        <section id="specificity-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: Host Specificity Sorting &amp; Resolution Order
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How MySQL sorts matching accounts in memory from most specific to least specific.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 2.1: Host Matching Priority &amp; Resolution Pyramid
              </h3>
              <span className="text-xs text-slate-400 font-mono">Resolution Engine</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* Priority 1 */}
                <rect x="150" y="40" width="650" height="55" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="170" y="65" fill="#34d399" fontSize="12" fontWeight="bold">
                  PRIORITY 1 (MOST SPECIFIC): Exact IP Address / Hostname
                </text>
                <text x="170" y="82" fill="#a7f3d0" fontSize="10">
                  Example: 'mamata'@'192.168.1.50' &rarr; Evaluated first; exact match wins! ⚡
                </text>

                {/* Priority 2 */}
                <rect x="190" y="110" width="570" height="55" rx="6" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="210" y="135" fill="#38bdf8" fontSize="12" fontWeight="bold">
                  PRIORITY 2: Subnet Mask / CIDR Range
                </text>
                <text x="210" y="152" fill="#bae6fd" fontSize="10">
                  Example: 'mamata'@'192.168.1.0/255.255.255.0' &rarr; Matches corporate subnets
                </text>

                {/* Priority 3 */}
                <rect x="230" y="180" width="490" height="55" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="250" y="205" fill="#fbbf24" fontSize="12" fontWeight="bold">
                  PRIORITY 3: IP Prefix Wildcard
                </text>
                <text x="250" y="222" fill="#fde68a" fontSize="10">
                  Example: 'mamata'@'192.168.1.%' &rarr; Matches any client starting with 192.168.1.
                </text>

                {/* Priority 4 */}
                <rect x="270" y="250" width="410" height="55" rx="6" fill="#0f172a" stroke="#be123c" strokeWidth="1.5" />
                <text x="290" y="275" fill="#fb7185" fontSize="12" fontWeight="bold">
                  PRIORITY 4 (LEAST SPECIFIC): Universal '%' Wildcard
                </text>
                <text x="290" y="292" fill="#fca5a5" fontSize="10">
                  Example: 'mamata'@'%' &rarr; Matches any TCP host (Fallback only)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Host Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Host Matching Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a phase to inspect socket vs TCP connections, host sorting resolution, subnet netmasks, and DNS optimizations.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(hostPhases).map((key) => {
              const ph = hostPhases[key];
              const isSelected = selectedHostPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedHostPhase(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                    isSelected
                      ? "bg-cyan-600/30 text-cyan-300 border-cyan-500 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full",
                      ph.badgeColor === "emerald" && "bg-emerald-400",
                      ph.badgeColor === "cyan" && "bg-cyan-400",
                      ph.badgeColor === "amber" && "bg-amber-400",
                      ph.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{ph.phaseNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {hostPhases[selectedHostPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  hostPhases[selectedHostPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  hostPhases[selectedHostPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  hostPhases[selectedHostPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  hostPhases[selectedHostPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {hostPhases[selectedHostPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Host Matching &amp; Network Configuration Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {hostPhases[selectedHostPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Host Specifications &amp; Transport Specifications:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Host Specifier / Priority / Netmask</th>
                      <th className="py-2.5 px-4">Transport Protocol / Scope</th>
                      <th className="py-2.5 px-4">Networking / Behavior / Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {hostPhases[selectedHostPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.hostSpecifier || row.priority || row.netmaskFormat || row.configMode}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.transportProtocol || row.hostType || row.cidrEquiv || row.reverseDnsLookup}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.matchesWildcard || row.behavior || row.matchedRange || row.handshakeLatency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Engineering Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {hostPhases[selectedHostPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Host Matching Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Fixing DNS latency delays and isolating VPC subnet perimeters in West Bengal organizations.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's DNS Latency Fix */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating 1.2-Second Connection Delays in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  99% Latency Reduction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an examination portal suffered 1.2-second connection establishment times under traffic bursts due to reverse DNS lookup failures on client hostnames. Adding `skip_name_resolve = 1` to `my.cnf` and converting user definitions to exact subnet CIDR blocks eliminated DNS calls entirely, reducing connection handshake latency to 0.4 milliseconds.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's VPC Subnet Containment */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Stopping Leaked Credential Exploits in Kolkata Fintech
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Perimeter Contained
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, when a developer accidentally exposed staging database credentials in a public GitHub repository, external attackers attempted to log in immediately. Because the user account was strictly restricted to `'fintech_app'@'10.150.0.0/255.255.0.0'` (the internal AWS VPC subnet), all external login attempts were rejected instantly at Stage 1, preventing a catastrophic breach.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid confusing localhost with 127.0.0.1 and leaving anonymous user backdoors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Assuming localhost is 127.0.0.1
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Creating `'user'@'localhost'` and then attempting to connect with `mysql -h 127.0.0.1 -u user -p` fails with Error 1045 because TCP loopback is not Unix domain socket!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Create both 'user'@'localhost' and 'user'@'127.0.0.1' if TCP loopback is needed.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Leaving Anonymous Accounts in mysql.user
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Anonymous accounts (`''@'localhost'`) can intercept connections meant for valid accounts if host patterns match unexpectedly.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Run DROP USER ''@'localhost'; during instance installation.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Always Enable skip_name_resolve
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set `skip_name_resolve = 1` in `my.cnf` to eliminate reverse DNS lookups and ensure ultra-fast sub-millisecond connection handshakes.
              </p>
              <div className="text-xs text-slate-400">
                Mandatory setting for all high-performance production servers.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use CURRENT_USER() to Debug ACLs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Execute `SELECT CURRENT_USER();` to verify exactly which user and host rule MySQL matched when granting permissions.
              </p>
              <div className="text-xs text-slate-400">
                Instant debugging of host grant precedence.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Host Security Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Host Security Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify network perimeter scoping and DNS configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Host Scoping Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">No Host Wildcard on Apps</strong> = Avoid `%` for backend service accounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Subnets Enforced</strong> = Bind accounts to specific private VPC CIDR blocks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">skip_name_resolve ON</strong> = Verify `skip_name_resolve = 1` in `my.cnf`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Anonymous Purged</strong> = Confirm zero empty user accounts exist in `mysql.user`.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe USER() vs CURRENT_USER()...”</span>
                  `USER()` tells you what the client claimed to be (`'mamata'@'192.168.1.50'`), while `CURRENT_USER()` tells you which rule MySQL actually matched (`'mamata'@'192.168.1.%'`)! Always use `CURRENT_USER()` when checking permissions!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about Network Defense-in-Depth...”</span>
                  Even if your database firewall permits traffic, MySQL's host matching rules act as a second layer of defense. If an attacker compromises a bastion host on a different subnet, MySQL will reject their credentials immediately!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering Host Matching Rules, localhost vs 127.0.0.1, Subnet Netmasks, and skip-name-resolve.
            </p>
          </div>

          <FAQTemplate
            title="Host Matching Rules & Network Perimeter FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Host Matching Rules (localhost, IP addresses, % wildcards, subnet masks)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="Understanding MySQL's host matching mechanism is what separates junior developers from senior database architects. Remember: localhost is a Unix domain socket connection, not TCP/IP loopback! Always take advantage of MySQL's most-specific-first resolution algorithm to scope your accounts to private VPC subnets, avoid generic % wildcards on sensitive service accounts, and always enable skip_name_resolve in production to ensure lightning-fast connection handshakes without DNS dependencies!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
