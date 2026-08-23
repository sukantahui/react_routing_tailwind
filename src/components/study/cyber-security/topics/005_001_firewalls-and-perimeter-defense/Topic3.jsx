import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic3_files/socks_gateway.py?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgDualHandshakeId = useId();
  const svgSocksProtocolId = useId();

  // Studio 1: Active SOCKS Feature Tab
  const [selectedSocksTab, setSelectedSocksTab] = useState("dual_handshake");

  // Studio 2: Live Circuit Relay Simulator State
  const [selectedClientFlow, setSelectedClientFlow] = useState("auth_bank_teller");
  const [proxyAuthMode, setProxyAuthMode] = useState("user_pass"); // anonymous, user_pass, kerberos_gssapi
  const [egressAclStrictness, setEgressAclStrictness] = useState("enforced"); // open, enforced

  // Studio 3: Gateway Sizing & Socket Memory Calculator
  const [concurrentCircuits, setConcurrentCircuits] = useState(15000); // 1,000 to 50,000 active circuits
  const [socketBufferSizeKB, setSocketBufferSizeKB] = useState(16); // 8 to 64 KB per socket
  const [proxyBandwidthGbps, setProxyBandwidthGbps] = useState(10); // 1 to 40 Gbps

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_interbank_relay");

  // SOCKS Feature Database for Studio 1
  const socksFeatures = {
    dual_handshake: {
      key: "dual_handshake",
      title: "1. Dual Handshake & Circuit Decoupling",
      layer: "OSI Layer 5 (Session Layer)",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      mechanism: "Direct IP connectivity is severed. The client establishes a 3-way handshake with the Gateway (Circuit 1). The Gateway verifies policy and initiates a secondary 3-way handshake with the Target Server (Circuit 2).",
      securityAdvantage: "Conceals internal private IP addresses completely; external servers only ever see the Gateway's public IP address.",
      limitation: "Does not inspect Layer 7 application payloads once the dual circuit is established."
    },
    socks5_auth: {
      key: "socks5_auth",
      title: "2. SOCKSv5 Authentication (RFC 1928 / RFC 1929)",
      layer: "Authentication Subnegotiation",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      mechanism: "Negotiates authentication methods: 0x00 (Anonymous), 0x01 (GSS-API / Kerberos Single Sign-On), or 0x02 (Username & Password). The gateway rejects unauthenticated circuit requests.",
      securityAdvantage: "Prevents unauthorized users or rogue internal malware from opening outbound circuits through the corporate boundary.",
      limitation: "Standard RFC 1929 transmits credentials in cleartext unless encapsulated inside a SOCKS-over-TLS tunnel."
    },
    remote_dns: {
      key: "remote_dns",
      title: "3. Remote DNS Resolution (ATYP 0x03)",
      layer: "Domain Privacy & Anti-DNS Leak",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      mechanism: "The client passes the target Fully Qualified Domain Name (FQDN) directly to the proxy using Address Type 0x03. The proxy performs DNS resolution on behalf of the client.",
      securityAdvantage: "Eliminates DNS Leaks on local networks; local network sniffers cannot see which external domains the client is connecting to.",
      limitation: "Requires client application support for SOCKS5 domain name addressing."
    },
    udp_associate: {
      key: "udp_associate",
      title: "4. SOCKSv5 UDP Associate (RFC 1928)",
      layer: "Connectionless Stream Relay",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      mechanism: "Uses the established TCP control session (CMD 0x03) to negotiate a dedicated UDP relay socket, forwarding encapsulated UDP datagrams with custom SOCKS headers.",
      securityAdvantage: "Enables proxying of real-time streaming protocols, VoIP (SIP/RTP), DNS queries, and gaming streams.",
      limitation: "Requires opening and managing secondary UDP ephemeral port ranges on the gateway firewall."
    }
  };

  // Studio 2: Circuit Simulation Flows
  const clientFlows = {
    auth_bank_teller: {
      id: "auth_bank_teller",
      label: "Authenticated Bank Teller ➔ Core Banking API (Port 443)",
      client: "10.10.1.50 (Barrackpore Branch)",
      target: "api.rbi.org.in:443",
      user: "teller_mamata",
      passValid: true,
      destAllowed: true,
      protocol: "TCP (HTTPS)",
      expectedAction: "CIRCUIT ESTABLISHED",
      circuitDetails: "Dual handshake completed successfully; raw bytes relayed bi-directionally over SOCKS5 socket pair."
    },
    anonymous_probe: {
      id: "anonymous_probe",
      label: "Unauthenticated Workstation Probe (Method 0x00)",
      client: "10.10.1.99 (Guest Wi-Fi)",
      target: "external-server.com:443",
      user: "anonymous",
      passValid: false,
      destAllowed: true,
      protocol: "TCP",
      expectedAction: proxyAuthMode === "anonymous" ? "CIRCUIT ESTABLISHED (Open Relay!)" : "HANDSHAKE REJECTED (0xFF)",
      circuitDetails: proxyAuthMode === "anonymous"
        ? "Anonymous access permitted: Open relay vulnerability active!"
        : "Gateway rejected Method 0x00; requires valid Username/Password (Method 0x02)."
    },
    lateral_pivot_attempt: {
      id: "lateral_pivot_attempt",
      label: "Compromised Host ➔ Internal Management Subnet via SOCKS",
      client: "10.10.1.25 (Infected Host)",
      target: "10.10.99.1:22 (Core Switch MGMT)",
      user: "admin_mahima",
      passValid: true,
      destAllowed: false,
      protocol: "TCP (SSH)",
      expectedAction: egressAclStrictness === "enforced" ? "EGRESS BLOCKED (Rule #50)" : "CIRCUIT PIVOT ESTABLISHED!",
      circuitDetails: egressAclStrictness === "enforced"
        ? "Gateway Egress ACL blocked proxy connection to internal Management VLAN!"
        : "SOCKS Proxy Reflection: Attacker pivoted through gateway into restricted management subnet!"
    },
    udp_voip_stream: {
      id: "udp_voip_stream",
      label: "VoIP Intercom Stream ➔ Central SIP Server (UDP Port 5060)",
      client: "10.10.1.75 (Ichapur Clinic)",
      target: "sip.telecom.gov.in:5060",
      user: "teller_mamata",
      passValid: true,
      destAllowed: true,
      protocol: "UDP (SOCKS Associate)",
      expectedAction: "UDP RELAY ACTIVE",
      circuitDetails: "TCP control channel negotiated UDP relay on port 51080; encapsulated UDP packets streaming smoothly."
    }
  };

  // Studio 3: Calculations
  const calculatedSizing = useMemo(() => {
    // Total socket RAM requirement in MB
    // Each circuit uses 2 sockets, each with Rx and Tx buffers
    const totalSockets = concurrentCircuits * 2;
    const memoryPerCircuitKB = socketBufferSizeKB * 2; // Rx + Tx
    const totalMemoryMB = Math.round((concurrentCircuits * memoryPerCircuitKB) / 1024);

    // Handshake latency overhead in milliseconds
    const averageHandshakeLatencyMs = 1.4; // Dual handshake processing time

    // TCO in INR ₹ Lakhs
    const hardwareServerLakhs = 6.5;
    const annualMaintenanceLakhs = 1.2;
    const fiveYearTcoLakhs = (hardwareServerLakhs + annualMaintenanceLakhs * 5).toFixed(2);

    return {
      totalSockets: totalSockets.toLocaleString(),
      totalMemoryMB,
      averageHandshakeLatencyMs,
      fiveYearTcoLakhs
    };
  }, [concurrentCircuits, socketBufferSizeKB, proxyBandwidthGbps]);

  // Studio 4: Regional West Bengal Drills
  const regionalDrills = {
    saltlake_interbank_relay: {
      id: "saltlake_interbank_relay",
      title: "Salt Lake Sector V Interbank SOCKS5 Relay Cluster",
      location: "Sector V, Salt Lake, Kolkata, West Bengal",
      architecture: "Load-Balanced SOCKS5 Gateway Farm with Kerberos GSS-API Authentication",
      threatScenario: "External threat actors launched automated port scans and reconnaissance targeting core interbank API endpoints.",
      solution: "Sukanta Hui and Mamata deployed a SOCKS5 Circuit Gateway cluster. Internal branch tellers authenticate via Kerberos Single Sign-On. Direct IP routing to core databases was severed, hiding internal bank topology.",
      outcome: "15,000 concurrent financial circuits maintained with 0.8ms average relay latency and zero external port exposure."
    },
    barrackpore_clinic_proxy: {
      id: "barrackpore_clinic_proxy",
      title: "Barrackpore Health Network SOCKS5 Dual-Handshake Gateway",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      architecture: "Hardened SOCKSv5 Proxy on Port 1080 with Strict Egress Whitelists",
      threatScenario: "Adversaries attempted to use an infected reception terminal as a SOCKS lateral pivot to access central patient diagnostic servers.",
      solution: "Mahima and Abhronila configured strict gateway egress ACLs: outbound circuits are restricted solely to approved health portal IPs (`api.swasthyasathi.gov.in`). The pivot attempt to the internal database was dropped instantly.",
      outcome: "Lateral pivot contained at the circuit gateway; SIEM alert generated within 800ms."
    }
  };

  const currentTab = socksFeatures[selectedSocksTab];
  const currentFlow = clientFlows[selectedClientFlow];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🔌 Module 005_001 • Topic 3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Circuit-Level Gateways &amp; Handshake Monitoring
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master OSI Layer 5 session-level security. Understand <strong className="text-sky-400">Dual Handshake Circuit Splitting</strong>, the <strong className="text-emerald-400">SOCKSv5 protocol standard (RFC 1928)</strong>, network topology obfuscation, and adversary SOCKS pivoting techniques.
          </p>
        </header>

        {/* SECTION 1: DUAL HANDSHAKE ARCHITECTURE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Dual Handshake Circuit Splitting &amp; Session Layer 5 Mediation
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              How Circuit-Level Gateways terminate transport handshakes locally and establish secondary outbound circuits to hide client topologies.
            </p>
          </div>

          {/* SVG 1: DUAL HANDSHAKE & CIRCUIT SPLITTING */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Circuit-Level Gateway Dual Handshake Decoupling
              </span>
              <span className="text-[11px] text-gray-400 font-mono">RFC 1928 SOCKSv5 Pipeline</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgDualHandshakeId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Circuit-Level Gateway Architecture"
              >
                {/* CLIENT TIER */}
                <rect x="20" y="50" width="160" height="180" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  INTERNAL CLIENT
                </text>
                <text x="100" y="95" fill="#94a3b8" fontSize="8.5" textAnchor="middle">
                  IP: 10.10.1.50
                </text>
                <rect x="35" y="110" width="130" height="45" rx="5" fill="#1e293b" />
                <text x="100" y="128" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SOCKS5 Client App
                </text>
                <text x="100" y="142" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Socket #1 (Port 54120)
                </text>
                <text x="100" y="185" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                  Private Subnet Hidden
                </text>

                {/* ARROW 1: CIRCUIT 1 */}
                <path d="M 180 140 L 320 140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="250" y="128" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  CIRCUIT 1: TCP SYN Handshake
                </text>
                <text x="250" y="158" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  SOCKS5 Auth (0x02)
                </text>

                {/* CIRCUIT-LEVEL GATEWAY */}
                <rect x="320" y="30" width="210" height="220" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                <text x="425" y="55" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CIRCUIT-LEVEL GATEWAY
                </text>
                <text x="425" y="70" fill="#c7d2fe" fontSize="8" textAnchor="middle">
                  IP: 172.16.1.1 (Port 1080)
                </text>

                <rect x="335" y="85" width="180" height="50" rx="6" fill="#312e81" />
                <text x="425" y="103" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  1. Handshake Validator
                </text>
                <text x="425" y="118" fill="#a5b4fc" fontSize="7.5" textAnchor="middle">
                  Verifies User &amp; Egress Policy
                </text>

                <rect x="335" y="145" width="180" height="50" rx="6" fill="#312e81" />
                <text x="425" y="163" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  2. Raw Byte-Relay Engine
                </text>
                <text x="425" y="178" fill="#34d399" fontSize="7.5" textAnchor="middle">
                  Direct memcpy() Between Sockets
                </text>
                <text x="425" y="215" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">
                  No L7 Payload Inspection!
                </text>

                {/* ARROW 2: CIRCUIT 2 */}
                <path d="M 530 140 L 670 140" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="600" y="128" fill="#10b981" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  CIRCUIT 2: Secondary Handshake
                </text>
                <text x="600" y="158" fill="#6ee7b7" fontSize="7.5" textAnchor="middle">
                  Src IP: 203.0.113.10 (Gateway IP)
                </text>

                {/* TARGET SERVER */}
                <rect x="670" y="50" width="160" height="180" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="750" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  DESTINATION SERVER
                </text>
                <text x="750" y="95" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  IP: 203.0.113.88:443
                </text>
                <rect x="685" y="110" width="130" height="45" rx="5" fill="#064e3b" />
                <text x="750" y="128" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Target Service
                </text>
                <text x="750" y="142" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Sees Gateway IP Only!
                </text>
                <text x="750" y="185" fill="#fbcfe8" fontSize="8" textAnchor="middle">
                  Client IP 10.10.1.50 is Invisible
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: SOCKS ARCHITECTURE EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: SOCKSv5 Protocol &amp; Session Layer Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the key features of the SOCKS Version 5 (RFC 1928) specification and its session management capabilities.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentTab.badgeColor)}>
              {currentTab.layer}
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.values(socksFeatures).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedSocksTab(tab.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedSocksTab === tab.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Active Tab Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentTab.title}
                </h3>
                <span className="text-gray-400 font-sans">Operating Layer: {currentTab.layer}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentTab.badgeColor)}>
                Active Spec
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">
                ⚙️ Protocol Mechanism &amp; Handshake Flow:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentTab.mechanism}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                  ✔ Security Advantages:
                </span>
                <p className="text-emerald-200 leading-relaxed">{currentTab.securityAdvantage}</p>
              </div>

              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/50 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">
                  ⚠️ Architectural Limitation:
                </span>
                <p className="text-rose-200 leading-relaxed">{currentTab.limitation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE SOCKS5 RELAY SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live SOCKS5 Authentication &amp; Circuit Relay Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate client handshakes, user credential verification, lateral pivot attempts, and UDP associate streams.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              SOCKS5 Socket Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Simulated Client Flow:</label>
              <select
                value={selectedClientFlow}
                onChange={(e) => setSelectedClientFlow(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(clientFlows).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Proxy Authentication Policy:</label>
              <select
                value={proxyAuthMode}
                onChange={(e) => setProxyAuthMode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="user_pass">RFC 1929 Username/Password (0x02)</option>
                <option value="kerberos_gssapi">GSS-API Kerberos SSO (0x01)</option>
                <option value="anonymous">Anonymous Open Relay (0x00)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Gateway Egress ACL Policy:</label>
              <button
                onClick={() => setEgressAclStrictness(egressAclStrictness === "enforced" ? "open" : "enforced")}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  egressAclStrictness === "enforced"
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              >
                {egressAclStrictness === "enforced" ? "✔ Strict Egress Whitelist" : "⚠️ Open Egress (Pivot Vulnerable)"}
              </button>
            </div>
          </div>

          {/* Circuit Execution State Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Active Circuit Session:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  Client: {currentFlow.client} ➔ Target: {currentFlow.target} ({currentFlow.protocol})
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-gray-300 font-mono text-[11px]">
                  User: {currentFlow.user}
                </span>
                <span className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border",
                  currentFlow.expectedAction.includes("ESTABLISHED") || currentFlow.expectedAction.includes("ACTIVE")
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-rose-950 text-rose-300 border-rose-700"
                )}>
                  {currentFlow.expectedAction}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Session Layer Handshake Verdict:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentFlow.circuitDetails}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: SOCKS5 GATEWAY CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: SOCKS5 Circuit Gateway Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete multi-threaded Python implementation demonstrating SOCKS5 method negotiation, credential authentication, and socket byte relaying.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              socks_gateway.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="socks_gateway.py"
            highlightLines={[25, 37, 56, 75]}
          />
        </section>

        {/* STUDIO 3: SIZING & SOCKET MEMORY CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Gateway Concurrency &amp; Socket Memory Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate socket descriptor allocation, kernel memory consumption, and 5-year Total Cost of Ownership in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Socket Sizing Engine
            </span>
          </div>

          {/* Sizing Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Active Circuit Sessions:</span>
                <span className="text-sky-400 font-bold">{concurrentCircuits.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={concurrentCircuits}
                onChange={(e) => setConcurrentCircuits(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Socket Buffer Size:</span>
                <span className="text-indigo-400 font-bold">{socketBufferSizeKB} KB / Socket</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                step="8"
                value={socketBufferSizeKB}
                onChange={(e) => setSocketBufferSizeKB(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Peak Gateway Throughput:</span>
                <span className="text-emerald-400 font-bold">{proxyBandwidthGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={proxyBandwidthGbps}
                onChange={(e) => setProxyBandwidthGbps(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Socket Descriptors Allocated</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedSizing.totalSockets} Sockets</div>
              <span className="text-[10px] text-gray-500 block">Requires `ulimit -n {calculatedSizing.totalSockets}`</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Estimated Kernel Socket RAM</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">{calculatedSizing.totalMemoryMB} MB</div>
              <span className="text-[10px] text-gray-500 block">Dual Socket Buffers (Rx + Tx)</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year SOCKS Gateway TCO</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹{calculatedSizing.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Redundant Server Farm + Support</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.architecture}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                SOCKS5 Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Session Layer Defense Strategy:</span>
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
                <span>Circuit-Level Gateways operate at Layer 5 (Session Layer), validating TCP 3-way handshakes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Dual Handshake: Client connects to Gateway (Circuit 1); Gateway connects to Server (Circuit 2).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Direct end-to-end IP routing is severed, concealing internal client IP addresses.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>SOCKSv5 (RFC 1928) supports TCP/UDP, IPv6, Domain Names, and Username/Password authentication.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Major limitation: Circuit gateways do NOT inspect Layer 7 payloads; blind to SQLi and malware.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>SOCKS proxies run by default on TCP/UDP port 1080.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Circuit-Level Gateways & Handshake Monitoring FAQs"
            subtitle="30 In-depth Practice Questions & SOCKS5 Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Circuit-Level Gateways & Handshake Monitoring (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 3 of Module 005_001! In this lesson, we advanced to OSI Layer 5 (Session Layer) security with Circuit-Level Gateways and the SOCKSv5 protocol (RFC 1928). Remember the core concept of Dual Handshake Circuit Splitting: by breaking direct end-to-end IP connectivity, the client's private IP is completely hidden from external servers. SOCKSv5 provides robust authentication (Method 0x02 or GSS-API Kerberos) and handles arbitrary TCP and UDP streams with lightweight raw socket byte-copying. However, keep its fundamental blind spot in mind: because circuit gateways do not inspect Layer 7 application payloads, an SQL injection attack or ransomware payload inside an approved circuit will pass through undetected! That is why circuit proxies must always be paired with Layer 7 Web Application Firewalls (WAF) in enterprise architectures. Next, we will explore Stateful Packet Inspection (SPI) firewalls!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic3;
