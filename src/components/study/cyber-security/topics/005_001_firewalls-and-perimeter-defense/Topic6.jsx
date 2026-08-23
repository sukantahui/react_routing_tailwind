import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic6_files/ngfw_dpi.py?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgSp3ArchId = useId();
  const svgPillarsId = useId();

  // Studio 1: Active Pillar Selection
  const [selectedPillarTab, setSelectedPillarTab] = useState("app_id");

  // Studio 2: Live DPI & App-ID Simulator State
  const [selectedDpiFlow, setSelectedDpiFlow] = useState("ssh_disguised_443");
  const [sslDecryptionEnabled, setSslDecryptionEnabled] = useState(true);
  const [wildfireSandboxActive, setWildfireSandboxActive] = useState(true);

  // Studio 3: Hardware Sizing & SP3 Performance Calculator
  const [throughputGbps, setThroughputGbps] = useState(20); // 1 to 100 Gbps
  const [sslDecryptionPercentage, setSslDecryptionPercentage] = useState(70); // 0 to 100%
  const [hardwareAsicAcceleration, setHardwareAsicAcceleration] = useState(true); // ASIC vs Software CPU

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_fintech_ngfw");

  // The 3 Pillars Database for Studio 1
  const ngfwPillars = {
    app_id: {
      key: "app_id",
      title: "1. App-ID (Application Identification)",
      scope: "Protocol Decoders & Behavioral Signatures",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Classifies the true underlying application regardless of port, protocol, or encryption. Eliminates port-based evasion by recognizing protocols like BitTorrent or SSH tunneling even when routed over port 443.",
      engineeringPrinciple: "Never trust the port number on the packet header; inspect the application grammar and byte sequences.",
      regionalContext: "Enforced across Kolkata fintech portals to ensure only approved banking APIs traverse perimeter firewalls."
    },
    user_id: {
      key: "user_id",
      title: "2. User-ID (Identity-Based Access Control)",
      scope: "Active Directory / LDAP / Kerberos Sync",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "Maps dynamic IP addresses to verified corporate usernames and security groups in real-time. Enables human-readable policies: 'Allow Finance-Managers to access SAP-HANA' rather than fragile static subnet rules.",
      engineeringPrinciple: "Security policies must be tied to verified human or service identities, not ephemeral IP addresses.",
      regionalContext: "Integrated with West Bengal state municipal active directories across 1,200 administrative endpoints."
    },
    content_id: {
      key: "content_id",
      title: "3. Content-ID (Unified Threat Prevention)",
      scope: "Single-Pass IPS, Antivirus & DLP",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "Executes simultaneous single-pass scanning for vulnerability exploits (IPS), known malware hashes, spyware, and confidential data loss patterns in hardware ASICs.",
      engineeringPrinciple: "Inspect payload once in memory for all threats simultaneously rather than daisy-chaining standalone security engines.",
      regionalContext: "Neutralizing zero-day Log4Shell and ransomware droppers at the perimeter before endpoint memory is reached."
    }
  };

  // Studio 2: Live Injected DPI Packet Database
  const dpiTestFlows = {
    legitimate_https: {
      id: "legitimate_https",
      label: "Legitimate HTTPS Web Session (Salesforce / Port 443)",
      src: "10.10.1.50 (User: mamata.b | Group: Finance)",
      dst: "203.0.113.88:443",
      detectedApp: "ssl / salesforce",
      threatFound: "CLEAN",
      action: "PERMITTED (Rule #10 Allow-Finance-SSL)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      explanation: "App-ID confirmed legitimate TLS handshake; User-ID verified Mamata is in Finance-Team; Content-ID detected zero exploit signatures."
    },
    ssh_disguised_443: {
      id: "ssh_disguised_443",
      label: "Encrypted SSH Reverse Tunnel Disguised on Port 443",
      src: "10.10.1.50 (User: mamata.b | Group: Finance)",
      dst: "198.51.100.25:443",
      detectedApp: "ssh-tunnel (Evasive)",
      threatFound: "SUSPICIOUS_TUNNEL",
      action: "🛡️ BLOCKED BY APP-ID (Port 443 Evasion)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Legacy firewall would permit this on port 443! NGFW App-ID decoder identified OpenSSH banner; policy blocks non-SSL protocols on port 443."
    },
    bittorrent_port_80: {
      id: "bittorrent_port_80",
      label: "BitTorrent P2P Client Tunneling over HTTP Port 80",
      src: "10.10.1.99 (User: contractor.guest)",
      dst: "198.51.100.40:80",
      detectedApp: "bittorrent (P2P)",
      threatFound: "UNSANCTIONED_P2P",
      action: "🛡️ BLOCKED BY APP-ID (Rule #30 Block-P2P)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "App-ID recognized BitTorrent protocol handshake bytes (`\\x13BitTorrent`); dropped immediately despite using standard HTTP port 80."
    },
    log4shell_exploit: {
      id: "log4shell_exploit",
      label: "Zero-Day Log4Shell Exploit Injection (${jndi:ldap://...})",
      src: "198.51.100.77:54120",
      dst: "172.16.1.10:443 (DMZ Web)",
      detectedApp: "web-browsing",
      threatFound: "CVE-2021-44228 (Log4Shell RCE)",
      action: "🚨 RESET-DROP (Content-ID IPS Signature)",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
      explanation: "Content-ID hardware regex engine matched JNDI LDAP lookup string; terminated connection with TCP RST, preventing code execution."
    },
    mimikatz_payload_download: {
      id: "mimikatz_payload_download",
      label: "Encrypted Mimikatz Credential Dumper Tool Download",
      src: "10.10.1.75 (User: mahima.r | Group: Dev)",
      dst: "198.51.100.99:443",
      detectedApp: "web-browsing (Decrypted TLS)",
      threatFound: "HackTool.Win32.Mimikatz",
      action: sslDecryptionEnabled ? "🚨 DROPPED BY ANTIVIRUS (Decrypted)" : "⚠️ PASSED (Encrypted Blind Spot!)",
      badgeColor: sslDecryptionEnabled ? "bg-rose-950 text-rose-300 border-rose-700" : "bg-amber-950 text-amber-300 border-amber-700",
      explanation: sslDecryptionEnabled
        ? "SSL Forward Proxy decrypted TLS stream; Content-ID antivirus identified Mimikatz binary hash and dropped file download."
        : "Without SSL Decryption, the firewall is blind to ciphertext and passes the malware!"
    }
  };

  // Studio 3: Performance Calculations
  const calculatedSp3Metrics = useMemo(() => {
    // Single-Pass Latency (microseconds) vs Multi-Pass Legacy (microseconds)
    const singlePassLatencyUs = hardwareAsicAcceleration ? 15.0 : 45.0;
    const multiPassLatencyUs = hardwareAsicAcceleration ? 180.0 : 450.0;

    // Decryption Capacity in Gbps
    const effectiveThreatGbps = hardwareAsicAcceleration
      ? (throughputGbps * (1 - (sslDecryptionPercentage / 100) * 0.25)).toFixed(1)
      : (throughputGbps * (1 - (sslDecryptionPercentage / 100) * 0.65)).toFixed(1);

    // 5-Year Enterprise NGFW Cluster TCO (INR ₹ Lakhs)
    const applianceHardwareLakhs = (22.0 + throughputGbps * 0.8).toFixed(2);
    const annualThreatLicenseLakhs = (4.5 + throughputGbps * 0.15).toFixed(2);
    const fiveYearTcoLakhs = (Number(applianceHardwareLakhs) + Number(annualThreatLicenseLakhs) * 5).toFixed(2);

    return {
      singlePassLatencyUs,
      multiPassLatencyUs,
      effectiveThreatGbps,
      fiveYearTcoLakhs
    };
  }, [throughputGbps, sslDecryptionPercentage, hardwareAsicAcceleration]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_fintech_ngfw: {
      id: "saltlake_fintech_ngfw",
      title: "Salt Lake Sector V Commercial UPI Switch NGFW Gateway",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      throughputCapacity: "40 Gbps Line-Rate Single-Pass Cluster",
      threatScenario: "Sophisticated adversary attempted to exfiltrate financial ledger databases via SSH reverse tunnels disguised on HTTPS port 443.",
      solution: "Sukanta Hui and Debangshu deployed an Active-Passive NGFW cluster with full SSL Forward Proxy Decryption and App-ID enforcement. The firewall identified the `ssh-tunnel` protocol on port 443, dropping the session and isolating the compromised workstation via User-ID.",
      outcome: "Zero data exfiltration; 100% of evasive port tunnels blocked; CERT-In compliant 180-day forensic log created."
    },
    barrackpore_health_ngfw: {
      id: "barrackpore_health_ngfw",
      title: "Barrackpore Multi-Speciality Health Network NGFW Perimeter",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      throughputCapacity: "10 Gbps Enterprise Perimeter",
      threatScenario: "Targeted LockBit 3.0 phishing email carrying an obfuscated PowerShell dropper with zero-day sandbox evasion.",
      solution: "Mamata and Mahima configured WildFire Cloud Sandboxing and Content-ID IPS. The unknown executable was detonated in the cloud sandbox within 4.2 seconds; global blocking signatures neutralized the threat across all 450 hospital terminals.",
      outcome: "Zero hospital downtime; protected ₹15 Crores in medical diagnostic infrastructure and patient medical records."
    }
  };

  const currentPillar = ngfwPillars[selectedPillarTab];
  const currentFlow = dpiTestFlows[selectedDpiFlow];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_001 • Topic 6</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Next-Generation Firewalls (NGFW): DPI &amp; App-ID
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master fourth-generation perimeter architecture. Understand <strong className="text-sky-400">Single-Pass Parallel Processing (SP3)</strong>, the 3 core pillars (<strong className="text-emerald-400">App-ID, User-ID, and Content-ID</strong>), SSL/TLS Forward Proxy Decryption, and Cloud Sandboxing.
          </p>
        </header>

        {/* SECTION 1: SINGLE-PASS SP3 ARCHITECTURE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Single-Pass Parallel Processing (SP3) vs Multi-Pass Legacy UTM
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Why legacy firewalls suffer severe latency bottlenecks, and how NGFW hardware ASICs evaluate all threat engines in a single memory pass.
            </p>
          </div>

          {/* SVG 1: SP3 ARCHITECTURE COMPARISON */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Single-Pass Parallel Processing (SP3) vs Multi-Pass Daisy-Chaining
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Palo Alto / Fortinet ASIC Architecture</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgSp3ArchId}
                viewBox="0 0 850 300"
                className="w-full max-w-4xl h-auto"
                aria-label="NGFW Single-Pass Parallel Processing Architecture"
              >
                {/* TOP HALF: LEGACY MULTI-PASS (FLAWED) */}
                <rect x="20" y="25" width="810" height="110" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="1" strokeDasharray="3,3" />
                <text x="35" y="45" fill="#f87171" fontSize="10" fontWeight="bold">
                  ❌ LEGACY MULTI-PASS ARCHITECTURE (UTM): High Latency &amp; Redundant Unpacking
                </text>

                <rect x="40" y="60" width="130" height="60" rx="5" fill="#27272a" stroke="#ef4444" />
                <text x="105" y="85" fill="#fca5a5" fontSize="8.5" fontWeight="bold" textAnchor="middle">1. Stateful FW</text>
                <text x="105" y="100" fill="#a1a1aa" fontSize="7.5" textAnchor="middle">Unpack &amp; Buffer</text>

                <path d="M 170 90 L 200 90" stroke="#ef4444" strokeWidth="2" />

                <rect x="200" y="60" width="130" height="60" rx="5" fill="#27272a" stroke="#ef4444" />
                <text x="265" y="85" fill="#fca5a5" fontSize="8.5" fontWeight="bold" textAnchor="middle">2. IPS Engine</text>
                <text x="265" y="100" fill="#a1a1aa" fontSize="7.5" textAnchor="middle">Re-Unpack &amp; Scan</text>

                <path d="M 330 90 L 360 90" stroke="#ef4444" strokeWidth="2" />

                <rect x="360" y="60" width="130" height="60" rx="5" fill="#27272a" stroke="#ef4444" />
                <text x="425" y="85" fill="#fca5a5" fontSize="8.5" fontWeight="bold" textAnchor="middle">3. Antivirus Scan</text>
                <text x="425" y="100" fill="#a1a1aa" fontSize="7.5" textAnchor="middle">Re-Unpack &amp; Scan</text>

                <path d="M 490 90 L 520 90" stroke="#ef4444" strokeWidth="2" />

                <rect x="520" y="60" width="130" height="60" rx="5" fill="#27272a" stroke="#ef4444" />
                <text x="585" y="85" fill="#fca5a5" fontSize="8.5" fontWeight="bold" textAnchor="middle">4. URL Filter</text>
                <text x="585" y="100" fill="#a1a1aa" fontSize="7.5" textAnchor="middle">Re-Unpack &amp; Check</text>

                <path d="M 650 90 L 700 90" stroke="#ef4444" strokeWidth="2" />
                <text x="750" y="95" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">~180 µs Latency</text>

                {/* BOTTOM HALF: NGFW SINGLE-PASS (SUPERIOR) */}
                <rect x="20" y="150" width="810" height="130" rx="8" fill="#030712" stroke="#0284c7" strokeWidth="2" />
                <text x="35" y="170" fill="#38bdf8" fontSize="10.5" fontWeight="bold">
                  ✔ NGFW SINGLE-PASS PARALLEL PROCESSING (SP3): Unified Single Memory Sweep
                </text>

                <rect x="40" y="185" width="120" height="80" rx="6" fill="#082f49" stroke="#38bdf8" />
                <text x="100" y="215" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Packet Ingress</text>
                <text x="100" y="235" fill="#7dd3fc" fontSize="8" textAnchor="middle">Parsed ONCE in</text>
                <text x="100" y="248" fill="#bae6fd" fontSize="8" textAnchor="middle">Hardware RAM</text>

                <path d="M 160 225 L 200 225" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* UNIFIED HARDWARE ENGINE */}
                <rect x="200" y="185" width="460" height="80" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="430" y="202" fill="#c7d2fe" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  UNIFIED SINGLE-PASS HARDWARE ASIC ENGINE (Parallel Execution)
                </text>

                <rect x="215" y="212" width="100" height="42" rx="4" fill="#312e81" stroke="#38bdf8" />
                <text x="265" y="229" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">App-ID</text>
                <text x="265" y="243" fill="#ffffff" fontSize="7" textAnchor="middle">Protocol Decoder</text>

                <rect x="325" y="212" width="100" height="42" rx="4" fill="#312e81" stroke="#10b981" />
                <text x="375" y="229" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">User-ID</text>
                <text x="375" y="243" fill="#ffffff" fontSize="7" textAnchor="middle">Active Directory</text>

                <rect x="435" y="212" width="100" height="42" rx="4" fill="#312e81" stroke="#a855f7" />
                <text x="485" y="229" fill="#c084fc" fontSize="8" fontWeight="bold" textAnchor="middle">Content-ID</text>
                <text x="485" y="243" fill="#ffffff" fontSize="7" textAnchor="middle">IPS &amp; Antivirus</text>

                <rect x="545" y="212" width="100" height="42" rx="4" fill="#312e81" stroke="#f59e0b" />
                <text x="595" y="229" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">SSL Decrypt</text>
                <text x="595" y="243" fill="#ffffff" fontSize="7" textAnchor="middle">Hardware TLS</text>

                <path d="M 660 225 L 700 225" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="750" y="220" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">Line-Rate Out</text>
                <text x="750" y="235" fill="#a7f3d0" fontSize="8" textAnchor="middle">~15 µs Latency</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: THE 3 PILLARS EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: The 3 Core Pillars of Next-Gen Perimeter Defense
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms, engineering axioms, and regional deployments of App-ID, User-ID, and Content-ID.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentPillar.badgeColor)}>
              {currentPillar.title}
            </span>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(ngfwPillars).map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedPillarTab(p.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedPillarTab === p.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentPillar.title}
                </h3>
                <span className="text-gray-400 font-sans">Engineering Scope: {currentPillar.scope}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentPillar.badgeColor)}>
                Active Pillar
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Technical Mechanism:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentPillar.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/50 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  🧠 Guiding Engineering Axiom:
                </span>
                <p className="text-indigo-200 italic font-mono">"{currentPillar.engineeringPrinciple}"</p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  📍 Regional Deployment Context:
                </span>
                <p className="text-emerald-200 leading-relaxed">{currentPillar.regionalContext}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE APP-ID & DPI SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live App-ID, User-ID &amp; Threat Signature DPI Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject various evasive flows and observe how App-ID unmasks port-hopping protocols and Content-ID drops threats.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              DPI ASIC Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Injected Network Flow:</label>
              <select
                value={selectedDpiFlow}
                onChange={(e) => setSelectedDpiFlow(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(dpiTestFlows).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">SSL/TLS Forward Proxy Decryption:</label>
              <button
                onClick={() => setSslDecryptionEnabled(!sslDecryptionEnabled)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  sslDecryptionEnabled
                    ? "bg-purple-950/80 text-purple-300 border-purple-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {sslDecryptionEnabled ? "✔ SSL Forward Decryption Active" : "❌ SSL Decryption Disabled (Blind)"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Cloud Sandbox Detonation (WildFire):</label>
              <button
                onClick={() => setWildfireSandboxActive(!wildfireSandboxActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  wildfireSandboxActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              >
                {wildfireSandboxActive ? "✔ WildFire Sandbox Enabled" : "❌ Sandbox Off"}
              </button>
            </div>
          </div>

          {/* Flow Execution Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Inspected Session &amp; Endpoint:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentFlow.src} ➔ {currentFlow.dst}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentFlow.badgeColor
              )}>
                {currentFlow.action}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  App-ID Classification:
                </span>
                <div className="text-gray-200">{currentFlow.detectedApp}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                  Content-ID Threat Verdict:
                </span>
                <div className="text-gray-200">{currentFlow.threatFound}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                NGFW Policy &amp; Security Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentFlow.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: NGFW DPI CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Single-Pass App-ID &amp; DPI Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python implementation demonstrating protocol signature classification, User-ID mapping, and Content-ID exploit blocking.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ngfw_dpi.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="ngfw_dpi.py"
            highlightLines={[25, 41, 55, 68]}
          />
        </section>

        {/* STUDIO 3: SP3 PERFORMANCE & HARDWARE CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Single-Pass (SP3) Performance &amp; Hardware Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate line-rate threat inspection throughput, ASIC latency advantages, and 5-year Total Cost of Ownership in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              SP3 Sizing Engine
            </span>
          </div>

          {/* Sizing Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Perimeter Link Bandwidth:</span>
                <span className="text-sky-400 font-bold">{throughputGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={throughputGbps}
                onChange={(e) => setThroughputGbps(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>SSL Decryption Traffic Ratio:</span>
                <span className="text-purple-400 font-bold">{sslDecryptionPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={sslDecryptionPercentage}
                onChange={(e) => setSslDecryptionPercentage(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Hardware Acceleration:</span>
                <span className="text-emerald-400 font-bold">{hardwareAsicAcceleration ? "ASIC / FPGA Active" : "Software x86"}</span>
              </div>
              <button
                onClick={() => setHardwareAsicAcceleration(!hardwareAsicAcceleration)}
                className={clsx(
                  "w-full p-1.5 rounded text-xs font-semibold border transition-all",
                  hardwareAsicAcceleration
                    ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                    : "bg-amber-950 text-amber-300 border-amber-800"
                )}
              >
                {hardwareAsicAcceleration ? "✔ Hardware ASICs Active (SP3)" : "⚠️ Software CPU Scan (UTM Multi-pass)"}
              </button>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Single-Pass Latency Overhead</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedSp3Metrics.singlePassLatencyUs} µs</div>
              <span className="text-[10px] text-gray-500 block">vs {calculatedSp3Metrics.multiPassLatencyUs} µs on Legacy UTM (12x Faster)</span>
            </div>

            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Effective Threat Throughput</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedSp3Metrics.effectiveThreatGbps} Gbps</div>
              <span className="text-[10px] text-gray-500 block">Full App-ID + IPS + AV + Decryption</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Redundant NGFW TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedSp3Metrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Dual HA Hardware + Threat Subscriptions</span>
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
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Capacity: {currentDrill.throughputCapacity}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                App-ID Enforced
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ NGFW Defense Strategy:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
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
                <span>NGFW operates on 3 core pillars: App-ID (Application), User-ID (Identity), Content-ID (Threats).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>App-ID classifies applications based on behavioral signatures and decoders, NOT port numbers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>User-ID maps IP addresses dynamically to Active Directory / LDAP usernames and security groups.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Single-Pass Parallel Processing (SP3) inspects payload once for all threats simultaneously in ASICs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>SSL Forward Proxy decrypts outbound employee traffic using enterprise Root CA subordinate certs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>NGFWs eliminate port-based evasion (e.g. blocking BitTorrent or SSH tunnels running over port 443).</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Next-Generation Firewalls (NGFW): DPI & App-ID FAQs"
            subtitle="30 In-depth Practice Questions & NGFW Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Next-Generation Firewalls (NGFW): DPI & App-ID (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 6 of Module 005_001! In this lesson, we explored the fourth generation of network defense: Next-Generation Firewalls (NGFW). Always remember that in modern cyber security, port numbers are completely untrustworthy—an attacker can easily tunnel malware, command-and-control beacons, or SSH shells over open port 443 or port 80. Master the 3 core pillars of NGFW: App-ID classifies the actual application regardless of port; User-ID integrates with Active Directory to enforce identity-driven Zero Trust policies; and Content-ID performs unified threat prevention (IPS, Antivirus, and WildFire cloud sandboxing) in a lightning-fast Single-Pass Parallel Processing (SP3) architecture. In Topic 7, we will explore physical and logical Firewall Architectures: Dual-Homed Host, Screened Host, and Screened Subnet (DMZ)!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic6;
