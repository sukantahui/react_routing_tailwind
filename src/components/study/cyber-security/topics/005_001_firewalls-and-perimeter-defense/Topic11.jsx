import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic11_files/firewall_testing.py?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgHaClusterId = useId();
  const svgLoggingPipelineId = useId();

  // Studio 1: Active Hardening Check Selection
  const [selectedHardeningKey, setSelectedHardeningKey] = useState("oob_management");

  // Studio 2: Live Penetration Testing Probe State
  const [selectedProbeKey, setSelectedProbeKey] = useState("nmap_syn_whitelisted");
  const [statefulEngineActive, setStatefulEngineActive] = useState(true);
  const [fragmentReassemblyActive, setFragmentReassemblyActive] = useState(true);

  // Studio 3: Logging & SIEM Storage Sizing Calculator
  const [eventsPerSecond, setEventsPerSecond] = useState(5000); // 500 to 25000 EPS
  const [bytesPerEvent, setBytesPerEvent] = useState(450); // 300 to 800 bytes
  const [wormStorageEnabled, setWormStorageEnabled] = useState(true);

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_state_datacenter");

  // Hardening Checklist Database for Studio 1
  const hardeningPillars = {
    oob_management: {
      key: "oob_management",
      title: "1. Out-of-Band (OOB) Management Isolation",
      category: "Administrative Boundary",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      directive: "Connect management interfaces (HTTPS/SSH) exclusively to dedicated, air-gapped VLAN 99 with zero default route to the WAN.",
      mechanism: "Eliminates all external and user-LAN reachability to the firewall administrative daemon, rendering management ports invisible to Internet scans.",
      auditStandard: "CIS Firewall Benchmark 1.1 / NIST SP 800-41 Section 4.3"
    },
    aaa_mfa_rbac: {
      key: "aaa_mfa_rbac",
      title: "2. AAA, Hardware MFA & Granular RBAC",
      category: "Identity & Access Governance",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      directive: "Integrate with enterprise TACACS+/RADIUS; mandate FIDO2 hardware tokens; enforce read-only access for junior operators.",
      mechanism: "Eliminates generic shared admin accounts. Ensures every configuration commit is tied cryptographically to a verified human engineer.",
      auditStandard: "PCI-DSS 4.0 Requirement 8.3 / ISO 27001 A.9.2"
    },
    four_eyes_change: {
      key: "four_eyes_change",
      title: "3. Four-Eyes Principle & Change Control",
      category: "Operational Governance",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      directive: "Every rule change must be linked to an approved change management ticket (Jira/ServiceNow) and peer-reviewed by a second engineer.",
      mechanism: "Prevents rogue changes, accidental wide-open permit rules, and emergency rule sprawl during crisis operations.",
      auditStandard: "CERT-In 2022 Security Management Guidelines"
    },
    automated_backups: {
      key: "automated_backups",
      title: "4. Automated Encrypted Config Backups",
      category: "Disaster Recovery & Resiliency",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      directive: "Schedule automated daily snapshots, encrypted with AES-256 and pushed to an off-site, immutable SFTP vault.",
      mechanism: "Enables full bare-metal disaster recovery within 2 minutes in the event of hardware flash corruption or catastrophic failure.",
      auditStandard: "NIST SP 800-34 Contingency Planning"
    }
  };

  // Studio 2: Penetration Testing Probe Database
  const penTestProbes = {
    nmap_syn_whitelisted: {
      id: "nmap_syn_whitelisted",
      label: "Nmap TCP SYN Scan (`-sS`) on Port 443 (Whitelisted Business Port)",
      src: "198.51.100.25:51200",
      dst: "172.16.1.10:443 [SYN]",
      verdict: "✔ PERMITTED (SYN-ACK Response ➔ State Table Allocated)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      explanation: "Firewall evaluated Rule #10 (Allow-DMZ-HTTPS); allocated embryonic session in conntrack state table; completed 3-way handshake."
    },
    nmap_syn_closed: {
      id: "nmap_syn_closed",
      label: "Nmap TCP SYN Scan (`-sS`) on Port 22 (Non-Whitelisted WAN Interface)",
      src: "198.51.100.25:51300",
      dst: "172.16.1.10:22 [SYN]",
      verdict: "🛡️ DROPPED / FILTERED (Silent Discard ➔ Zero State Created)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      explanation: "Default-Deny policy matched final catch-all rule; discarded SYN packet silently; zero memory buffers allocated on firewall."
    },
    nmap_ack_bypass: {
      id: "nmap_ack_bypass",
      label: "Nmap ACK Scan (`-sA`) Bypass Attempt (Unsolicited ACK)",
      src: "198.51.100.25:52100",
      dst: "172.16.1.10:8080 [ACK]",
      verdict: statefulEngineActive ? "🛡️ DROPPED (Stateful Inspection: No SYN tracked!)" : "⚠️ PASSED (Stateless Firewall Flaw!)",
      badgeColor: statefulEngineActive ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700",
      explanation: statefulEngineActive
        ? "Stateful Packet Inspection (SPI) engine verified that no prior SYN handshake existed in state memory; dropped packet instantly."
        : "Without stateful tracking, stateless ACLs allow unsolicited ACKs to pass, exposing internal hosts to port mapping!"
    },
    scapy_fragment_evasion: {
      id: "scapy_fragment_evasion",
      label: "Scapy Fragmented IP Packet (Fragment Overlap Evasion Attack)",
      src: "198.51.100.25:54000",
      dst: "172.16.1.10:443 [Frag Offset: 8]",
      verdict: fragmentReassemblyActive ? "🛡️ REASSEMBLED IN MEMORY (Exploit Detected & Dropped)" : "⚠️ EVADED (Fragment Inspected Independently!)",
      badgeColor: fragmentReassemblyActive ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700",
      explanation: fragmentReassemblyActive
        ? "Virtual De-fragmentation engine buffered all IP fragments in memory; reconstructed full payload before DPI signature matching."
        : "Without virtual reassembly, fragmented exploit signatures bypass pattern matchers!"
    }
  };

  // Studio 3: Performance Calculations
  const calculatedLoggingMetrics = useMemo(() => {
    // Daily log generation in Gigabytes
    const dailyEvents = eventsPerSecond * 86400;
    const dailyLogGb = ((dailyEvents * bytesPerEvent) / (1024 * 1024 * 1024)).toFixed(2);

    // 180-Day Statutory Retention Storage (Terabytes)
    const retention180DaysTb = ((Number(dailyLogGb) * 180) / 1024).toFixed(2);

    // 5-Year SIEM Ingestion & WORM Storage TCO (INR ₹ Lakhs)
    const annualStorageCostLakhs = Number(retention180DaysTb) * 0.45;
    const annualSiemLicenseLakhs = (eventsPerSecond / 1000) * 2.8;
    const fiveYearTcoLakhs = ((annualStorageCostLakhs + annualSiemLicenseLakhs) * 5 + 8.5).toFixed(2);

    return {
      dailyLogGb,
      retention180DaysTb,
      fiveYearTcoLakhs
    };
  }, [eventsPerSecond, bytesPerEvent, wormStorageEnabled]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_state_datacenter: {
      id: "saltlake_state_datacenter",
      title: "Salt Lake Sector V State Data Center Perimeter & CERT-In Audit",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      auditScope: "Active-Passive 40 Gbps Firewall Cluster across 1,800 State Portals",
      threatScenario: "Adversary launched automated Scapy fragment evasion scans followed by volumetric SYN floods against tax endpoints.",
      solution: "Sukanta Hui, Mamata, and Debangshu isolated management to an air-gapped OOB VLAN, enabled virtual de-fragmentation, and configured RFC 5424 syslog streaming over TLS port 6514 synchronized with NPL India NTP.",
      outcome: "Zero packet evasion; 100% of fragments reassembled and inspected; passed official CERT-In 180-day compliance audit with zero non-conformities."
    },
    barrackpore_municipal_ha: {
      id: "barrackpore_municipal_ha",
      title: "Barrackpore Municipal Civic Network HA Failover Drill",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      auditScope: "Active-Passive HA Firewall Cluster with Dedicated Fiber Links",
      threatScenario: "Simulated hardware failure during peak civic tax submission hours (10,000 active citizen sessions).",
      solution: "Mahima, Abhronila, and Susmita severed power to the primary firewall node. Dedicated HA2 fiber links maintained conntrack state sync; standby unit took over in 220 milliseconds.",
      outcome: "Zero dropped citizen transactions; seamless sub-second failover verified; 100% telemetry preserved."
    }
  };

  const currentHardening = hardeningPillars[selectedHardeningKey];
  const currentProbe = penTestProbes[selectedProbeKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_001 • Topic 11 (Capstone)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Firewall Configuration, Testing &amp; Logging Best Practices
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master enterprise operational governance and verification. Understand <strong className="text-sky-400">Out-of-Band (OOB) Isolation</strong>, <strong className="text-emerald-400">Active-Passive HA Clustering</strong>, Nmap &amp; Scapy penetration testing, <strong className="text-purple-400">RFC 5424 Structured Syslog</strong>, and statutory 180-day <strong className="text-amber-400">CERT-In / NPL India NTP</strong> compliance.
          </p>
        </header>

        {/* SECTION 1: HA CLUSTER & LOGGING PIPELINE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Active-Passive HA Architecture &amp; CERT-In Syslog Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing dedicated HA1/HA2 state synchronization links, Out-of-Band management isolation, and 180-day SIEM WORM logging.
            </p>
          </div>

          {/* SVG 1: HA CLUSTER & LOGGING PIPELINE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Redundant HA Cluster &amp; CERT-In Structured Logging Pipeline
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Sub-500ms Failover &amp; NPL NTP Sync</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgHaClusterId}
                viewBox="0 0 850 300"
                className="w-full max-w-4xl h-auto"
                aria-label="Firewall HA and Logging Architecture Diagram"
              >
                {/* PRIMARY ACTIVE FIREWALL */}
                <rect x="30" y="35" width="230" height="110" rx="8" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
                <text x="145" y="60" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  PRIMARY FIREWALL (ACTIVE)
                </text>
                <text x="145" y="80" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  100% Traffic Forwarding &amp; DPI
                </text>
                <text x="145" y="98" fill="#7dd3fc" fontSize="7" textAnchor="middle">
                  OOB Mgmt: 10.10.99.1 (VLAN 99)
                </text>
                <text x="145" y="118" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  NTP: time.nplindia.org (UTC)
                </text>

                {/* HA SYNC LINKS */}
                <rect x="290" y="50" width="160" height="35" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                <text x="370" y="66" fill="#c7d2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  HA1 (Control / Config Sync)
                </text>
                <text x="370" y="78" fill="#a5b4fc" fontSize="6.5" textAnchor="middle">
                  TCP 28769 Heartbeats
                </text>

                <rect x="290" y="100" width="160" height="35" rx="4" fill="#1e1b4b" stroke="#10b981" />
                <text x="370" y="116" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  HA2 (Data / State Sync)
                </text>
                <text x="370" y="128" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">
                  Real-time Conntrack Tables
                </text>

                {/* STANDBY PASSIVE FIREWALL */}
                <rect x="480" y="35" width="230" height="110" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                <text x="595" y="60" fill="#a1a1aa" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  STANDBY FIREWALL (PASSIVE)
                </text>
                <text x="595" y="80" fill="#e4e4e7" fontSize="7.5" textAnchor="middle">
                  Mirrors State Tables Continuously
                </text>
                <text x="595" y="98" fill="#a1a1aa" fontSize="7" textAnchor="middle">
                  OOB Mgmt: 10.10.99.2 (VLAN 99)
                </text>
                <text x="595" y="118" fill="#fde68a" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Failover Ready: &lt; 250ms
                </text>

                {/* BOTTOM HALF: LOGGING PIPELINE */}
                <rect x="30" y="170" width="790" height="110" rx="8" fill="#030712" stroke="#10b981" strokeWidth="2" />
                <text x="45" y="192" fill="#34d399" fontSize="10" fontWeight="bold">
                  ✔ STATUTORY CERT-In LOGGING &amp; SIEM TELEMETRY PIPELINE
                </text>

                {/* LOGGING STEP 1 */}
                <rect x="45" y="205" width="160" height="60" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="125" y="225" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">1. RFC 5424 Syslog</text>
                <text x="125" y="240" fill="#a7f3d0" fontSize="7" textAnchor="middle">Encrypted TLS (TCP 6514)</text>
                <text x="125" y="253" fill="#a7f3d0" fontSize="7" textAnchor="middle">5-Tuple + Action + Rules</text>

                <path d="M 205 235 L 245 235" stroke="#10b981" strokeWidth="2.5" />

                {/* LOGGING STEP 2 */}
                <rect x="245" y="205" width="170" height="60" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="330" y="225" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">2. NPL India NTP Sync</text>
                <text x="330" y="240" fill="#a7f3d0" fontSize="7" textAnchor="middle">Millisecond Accuracy</text>
                <text x="330" y="253" fill="#a7f3d0" fontSize="7" textAnchor="middle">Legal Forensic Timeline</text>

                <path d="M 415 235 L 455 235" stroke="#10b981" strokeWidth="2.5" />

                {/* LOGGING STEP 3 */}
                <rect x="455" y="205" width="170" height="60" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="540" y="225" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">3. SIEM Ingestion</text>
                <text x="540" y="240" fill="#a7f3d0" fontSize="7" textAnchor="middle">Splunk / Elastic / Sentinel</text>
                <text x="540" y="253" fill="#a7f3d0" fontSize="7" textAnchor="middle">Port Sweep Correlation</text>

                <path d="M 625 235 L 665 235" stroke="#10b981" strokeWidth="2.5" />

                {/* LOGGING STEP 4 */}
                <rect x="665" y="205" width="145" height="60" rx="5" fill="#022c22" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="737" y="225" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">4. 180-Day WORM</text>
                <text x="737" y="240" fill="#fde68a" fontSize="7" textAnchor="middle">Immutable Storage</text>
                <text x="737" y="253" fill="#fde68a" fontSize="7" textAnchor="middle">CERT-In Compliant</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: HARDENING CHECKLIST */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Firewall Configuration &amp; Hardening Best Practices Checklist
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the mandatory hardening directives, configuration commands, and audit standards for enterprise firewalls.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentHardening.badgeColor)}>
              {currentHardening.category}
            </span>
          </div>

          {/* Hardening Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(hardeningPillars).map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedHardeningKey(p.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedHardeningKey === p.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Hardening Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentHardening.title}
                </h3>
                <span className="text-gray-400 font-sans">Audit Standard: {currentHardening.auditStandard}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentHardening.badgeColor)}>
                Enforced
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  ⚙️ Technical Mechanism:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentHardening.mechanism}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  🔧 Hardening Directive:
                </span>
                <p className="text-gray-200 font-mono text-xs">{currentHardening.directive}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: PENETRATION TESTING & PACKET CRAFTING SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Penetration Testing &amp; Synthetic Packet Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject Nmap SYN/ACK scans, Scapy fragmented packets, and malformed flags to verify firewall statefulness and de-fragmentation.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Scapy Testing Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Penetration Testing Probe:</label>
              <select
                value={selectedProbeKey}
                onChange={(e) => setSelectedProbeKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                {Object.values(penTestProbes).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Stateful Inspection Engine (SPI):</label>
              <button
                onClick={() => setStatefulEngineActive(!statefulEngineActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  statefulEngineActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              &gt;
                {statefulEngineActive ? "✔ Stateful SPI Engine Active" : "❌ Stateless Filter Only (Flawed)"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Virtual De-Fragmentation Engine:</label>
              <button
                onClick={() => setFragmentReassemblyActive(!fragmentReassemblyActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  fragmentReassemblyActive
                    ? "bg-purple-950/80 text-purple-300 border-purple-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              &gt;
                {fragmentReassemblyActive ? "✔ Virtual Reassembly Active" : "❌ Reassembly Off (Evasion Risk)"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Probe Packet:
                </span>
                <div className="font-mono text-sky-300 text-xs">
                  {currentProbe.src} ➔ {currentProbe.dst}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentProbe.badgeColor
              )}>
                {currentProbe.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Verification Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentProbe.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: FIREWALL TESTING CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Synthetic Packet Tester &amp; CERT-In Log Auditor
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python implementation validating Nmap probes, Scapy fragmentation, and RFC 5424 syslog compliance.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              firewall_testing.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="firewall_testing.py"
            highlightLines={[25, 41, 58, 72]}
          />
        </section>

        {/* STUDIO 3: LOGGING STORAGE & SIEM SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Logging Volume, 180-Day WORM Storage &amp; SIEM Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate daily log generation in GB, statutory 180-day storage in TB, and 5-year SIEM TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              SIEM Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Perimeter Event Rate:</span>
                <span className="text-sky-400 font-bold">{eventsPerSecond.toLocaleString()} EPS</span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={eventsPerSecond}
                onChange={(e) => setEventsPerSecond(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Avg Bytes Per Event:</span>
                <span className="text-purple-400 font-bold">{bytesPerEvent} Bytes</span>
              </div>
              <input
                type="range"
                min="300"
                max="800"
                step="50"
                value={bytesPerEvent}
                onChange={(e) => setBytesPerEvent(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>180-Day WORM Storage:</span>
                <span className="text-emerald-400 font-bold">{wormStorageEnabled ? "Immutable Active" : "Standard Disk"}</span>
              </div>
              <button
                onClick={() => setWormStorageEnabled(!wormStorageEnabled)}
                className={clsx(
                  "w-full p-1.5 rounded text-xs font-semibold border transition-all",
                  wormStorageEnabled
                    ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              &gt;
                {wormStorageEnabled ? "✔ WORM Immutable Storage Enforced" : "Standard Disk (No WORM)"}
              </button>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Daily Log Generation</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedLoggingMetrics.dailyLogGb} GB/Day</div>
              <span className="text-[10px] text-gray-500 block">Structured RFC 5424 over TLS</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">180-Day Retention Storage</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedLoggingMetrics.retention180DaysTb} TB</div>
              <span className="text-[10px] text-gray-500 block">Statutory CERT-In Mandate</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year SIEM &amp; WORM TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedLoggingMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Storage + Ingestion Licensing</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL SOC TABLETOP DRILL */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative regional response scenarios authored by Sukanta Hui and the student cyber engineering team.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              WB Defense Lab
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(regionalDrills).map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrillId(d.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeDrillId === d.id
                    ? "bg-sky-600/20 text-sky-300 border-sky-500/60"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200"
                )}
              &gt;
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Scope: {currentDrill.auditScope}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                CERT-In Compliant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Defensive Execution &amp; Testing:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Firewall management ports must reside exclusively on isolated Out-of-Band (OOB) private VLANs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Enforce AAA (TACACS+/RADIUS), MFA with hardware tokens, and RBAC on all administrative logins.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Validate firewall statefulness using Nmap SYN (`-sS`) and ACK (`-sA`) scans.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Test fragmented packet handling and malformed TCP flag drops using Scapy and Hping3.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day secure log retention synchronized with NPL India NTP servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Deploy Active-Passive HA clusters with dedicated physical HA1 (Control) and HA2 (Data) sync links.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Firewall Configuration, Testing & Logging FAQs"
            subtitle="30 In-depth Practice Questions & Best Practice Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Firewall Configuration, Testing & Logging (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 005_001: Firewalls & Perimeter Defense Architectures! In Topic 11, we brought together all foundational concepts to master Configuration, Testing, and Logging best practices. Always isolate firewall management onto dedicated Out-of-Band (OOB) VLANs with hardware MFA. Continuously validate your defenses using Nmap and Scapy penetration testing to verify stateful conntrack drop behavior and virtual fragment reassembly. Ensure 100% compliance with CERT-In directives by synchronizing all system clocks with NPL India NTP servers and streaming structured RFC 5424 logs over encrypted TLS to immutable 180-day WORM storage. Finally, eliminate single points of failure with Active-Passive High Availability clustering. You now possess comprehensive, industry-grade perimeter security mastery!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic11;
