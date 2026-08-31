import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic1_files/firewall_core.py?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgPlacementTopologyId = useId();
  const svgNetfilterFlowId = useId();

  // Studio 1: Active Placement Zone Selection
  const [selectedPlacementZone, setSelectedPlacementZone] = useState("edge_perimeter");

  // Studio 2: Live Packet Evaluator & NAT Engine State
  const [selectedPacketFlow, setSelectedPacketFlow] = useState("public_https_dmz");
  const [natTranslationEnabled, setNatTranslationEnabled] = useState(true);
  const [interVlanStrictness, setInterVlanStrictness] = useState("strict"); // permissive, strict

  // Studio 3: Firewall Sizing & TCO Calculator (INR ₹)
  const [concurrentUsers, setConcurrentUsers] = useState(2500); // 100 to 20,000 users
  const [bandwidthGbps, setBandwidthGbps] = useState(5); // 1 to 40 Gbps
  const [applianceFormFactor, setApplianceFormFactor] = useState("hardware_ha"); // hardware_ha, virtual_cloud, hybrid
  const [loggingRetentionDays, setLoggingRetentionDays] = useState(180); // 90 to 365 (CERT-In mandates 180)

  // Studio 4: Regional West Bengal Tabletop Drill State
  const [activeRegionalDrillId, setActiveRegionalDrillId] = useState("barrackpore_tax_gateway");

  // Placement Zones Database for Studio 1
  const placementZones = {
    edge_perimeter: {
      key: "edge_perimeter",
      title: "1. Edge / Perimeter Gateway Firewall",
      locationName: "WAN Boundary (Internet <-> Enterprise Edge)",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      accentColor: "#0284c7",
      primaryFunctions: ["Bogon & uRPF Spoofing Drop", "Port Address Translation (PAT)", "Volumetric DDoS Ingress Scrubbing", "BGP FlowSpec Filter"],
      securityPolicy: "Default-Deny for all unsolicited incoming WAN traffic; permits only ports 80/443 mapped to DMZ reverse proxies.",
      failureModeRisk: "If edge firewall fails open, all internal subnets are exposed to raw Internet probes; mitigated by Active-Passive HA clustering.",
      regionalContext: "Deployed as redundant high-availability cluster guarding the main fiber ingress in Salt Lake Sector V and Barrackpore."
    },
    dmz_boundary: {
      key: "dmz_boundary",
      title: "2. Demilitarized Zone (DMZ) Boundary Firewall",
      locationName: "Semi-Trusted Buffer Subnet (172.16.1.0/24)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      accentColor: "#f59e0b",
      primaryFunctions: ["Public Service Isolation (Web/Mail/DNS)", "One-Way Database Gateway Rules", "WAF Reverse Proxy Ingress", "SSL/TLS Decryption"],
      securityPolicy: "DMZ servers can NEVER initiate connections to the internal corporate LAN; only permits DMZ Web to query DB port 5432.",
      failureModeRisk: "If a web application is compromised, the DMZ firewall halts lateral movement, preventing direct access to client desktops or domain controllers.",
      regionalContext: "Isolating citizen tax dispute portals in Barrackpore from the municipal central Aadhaar/PAN record database."
    },
    inter_vlan_core: {
      key: "inter_vlan_core",
      title: "3. Inter-VLAN Core Firewall (Micro-segmentation)",
      locationName: "Internal Layer 3 Core Distribution (East-West Traffic)",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      accentColor: "#6366f1",
      primaryFunctions: ["East-West Lateral Movement Prevention", "SMB (Port 445) / RDP (Port 3389) Block", "Departmental Zone Isolation", "Zero Trust Policy"],
      securityPolicy: "Restricts inter-departmental flows: HR VLAN cannot reach Engineering DB; Healthcare IoT cannot query Finance records.",
      failureModeRisk: "Without Inter-VLAN firewalls, ransomware (WannaCry, LockBit) propagates across the entire corporate network within seconds via SMB.",
      regionalContext: "Enforcing micro-segmentation across healthcare clinics in Ichapur and Jadavpur municipal branches."
    },
    host_endpoint: {
      key: "host_endpoint",
      title: "4. Host-based Endpoint Firewall (iptables / Windows)",
      locationName: "Operating System Kernel Level (Per-Device)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      accentColor: "#10b981",
      primaryFunctions: ["Same-Subnet Attack Protection", "Local Process Outbound Auditing", "Per-Interface Policy Rules", "Ephemeral Port Control"],
      securityPolicy: "Blocks inbound connections from adjacent workstations on the same physical switch; allows SSH only from authorized jump server.",
      failureModeRisk: "Protects mobile laptops and remote work devices even when connected to untrusted public Wi-Fi at coffee shops or airports.",
      regionalContext: "Standardized iptables and Windows Defender baseline configured across 600 student and administrative laptops."
    }
  };

  // Studio 2: Packet Flow Simulation Database
  const packetSimulationCases = {
    public_https_dmz: {
      id: "public_https_dmz",
      label: "Public HTTPS Request ➔ DMZ Web Server",
      src: "203.0.113.88:54210",
      dst: "172.16.1.10:443 (DMZ)",
      protocol: "TCP",
      zoneChecked: "EDGE GATEWAY",
      action: "ACCEPT (Rule #20)",
      natState: "DNAT Applied (Public IP 203.0.113.10:443 ➔ 172.16.1.10:443)",
      explanation: "Permitted by standard public HTTPS publishing rule; routed to DMZ web server without touching internal LAN."
    },
    bogon_spoofed_wan: {
      id: "bogon_spoofed_wan",
      label: "Spoofed Loopback IP on Public WAN",
      src: "127.0.0.1:40120 (Spoofed Bogon)",
      dst: "172.16.1.10:443",
      protocol: "TCP (SYN)",
      zoneChecked: "EDGE GATEWAY",
      action: "DROP (Rule #10)",
      natState: "No NAT Applied (Dropped immediately)",
      explanation: "uRPF and Bogon ACLs instantly drop unroutable loopback IP on public WAN interface, zero state allocated."
    },
    dmz_to_internal_db: {
      id: "dmz_to_internal_db",
      label: "DMZ Web Server ➔ Internal Database (Port 5432)",
      src: "172.16.1.10:48100",
      dst: "10.10.4.50:5432 (PostgreSQL DB)",
      protocol: "TCP",
      zoneChecked: "DMZ BOUNDARY",
      action: "ACCEPT (Rule #40)",
      natState: "No NAT (Internal Routing via mTLS)",
      explanation: "Explicitly whitelisted pinhole rule permits DMZ web application to execute parameterized queries against internal DB."
    },
    dmz_unauthorized_smb: {
      id: "dmz_unauthorized_smb",
      label: "Compromised DMZ Server ➔ Internal LAN SMB Scan",
      src: "172.16.1.10:48200",
      dst: "10.10.1.25:445 (Internal HR PC)",
      protocol: "TCP (SYN)",
      zoneChecked: "DMZ BOUNDARY",
      action: "DROP (Rule #50)",
      natState: "No NAT (Dropped)",
      explanation: "DMZ isolation rule blocks web server from initiating connections to internal LAN workstations, halting lateral attack pivot!"
    },
    inter_vlan_hr_to_db: {
      id: "inter_vlan_hr_to_db",
      label: "HR Workstation ➔ Direct Database Connection",
      src: "10.10.1.50:59000 (HR VLAN)",
      dst: "10.10.4.50:5432 (Production DB)",
      protocol: "TCP (SYN)",
      zoneChecked: "INTER-VLAN CORE",
      action: interVlanStrictness === "strict" ? "DROP (Rule #70)" : "ACCEPT (Permissive Anomaly)",
      natState: "Internal Subnet Routing",
      explanation: interVlanStrictness === "strict"
        ? "Inter-VLAN firewall drops direct DB access from user endpoints; users must access data via authenticated web ERP portal."
        : "Permissive mode allows direct DB connection, leaving database vulnerable to compromised client desktops!"
    }
  };

  // Studio 3: Sizing & Sizing Calculations
  const calculatedSizing = useMemo(() => {
    // Estimated concurrent TCP connection tracking entries
    const estimatedConntrackEntries = concurrentUsers * 40; // ~40 active sessions per user
    const conntrackMemoryMB = Math.round((estimatedConntrackEntries * 320) / (1024 * 1024)); // ~320 bytes per conntrack tuple

    // Estimated daily log generation in GB (approx 2.5 MB per active user per day)
    const dailyLogGB = ((concurrentUsers * 2.5) / 1024).toFixed(2);
    const totalRetentionLogGB = (Number(dailyLogGB) * loggingRetentionDays).toFixed(0);

    // Cost calculations (INR ₹ Lakhs)
    let hardwareCostLakhs = 0;
    let annualMaintenanceLakhs = 0;

    if (applianceFormFactor === "hardware_ha") {
      hardwareCostLakhs = 14.5 + bandwidthGbps * 0.8; // Dual appliance HA pair
      annualMaintenanceLakhs = 2.8;
    } else if (applianceFormFactor === "virtual_cloud") {
      hardwareCostLakhs = 2.0; // Initial setup
      annualMaintenanceLakhs = (bandwidthGbps * 1.5 * 12) / 10; // Elastic cloud bandwidth
    } else {
      hardwareCostLakhs = 18.0;
      annualMaintenanceLakhs = 4.2;
    }

    const fiveYearTcoLakhs = (hardwareCostLakhs + annualMaintenanceLakhs * 5).toFixed(2);

    return {
      estimatedConntrackEntries: estimatedConntrackEntries.toLocaleString(),
      conntrackMemoryMB,
      dailyLogGB,
      totalRetentionLogGB,
      hardwareCostLakhs: hardwareCostLakhs.toFixed(2),
      fiveYearTcoLakhs
    };
  }, [concurrentUsers, bandwidthGbps, applianceFormFactor, loggingRetentionDays]);

  // Studio 4: Regional West Bengal Case Scenarios
  const regionalDrills = {
    barrackpore_tax_gateway: {
      id: "barrackpore_tax_gateway",
      title: "Barrackpore Municipal Civic Tax Payment Gateway",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      firewallLayout: "Dual Next-Gen Firewalls in Active-Passive HA with Dedicated DMZ & Inter-VLAN Core",
      threatScenario: "Adversaries attempted a distributed SYN flood on port 443 combined with an exploit payload on the public dispute portal.",
      defensiveResponse: "Sukanta Hui and Debangshu configured SYN Cookie activation (`net.ipv4.tcp_syncookies = 1`) on the edge cluster, while Mamata quarantined the web portal in the DMZ. When the attackers attempted SMB port 445 lateral movement, Mahima's Inter-VLAN firewall dropped all packets.",
      auditMetrics: "Zero downtime during peak tax collection week; CERT-In compliant 180-day telemetry retention verified by Susmita."
    },
    saltlake_fintech_edge: {
      id: "saltlake_fintech_edge",
      title: "Salt Lake Sector V Commercial UPI Switch",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      firewallLayout: "Multi-Gigabit ASIC Hardware Cluster with Cloudflare WAF Ingress & Cloud VPC Security Groups",
      threatScenario: "High-frequency credential stuffing attack targeting customer payment APIs across 50,000 rotated proxy IPs.",
      defensiveResponse: "Abhronila implemented edge Geo-IP filtering dropping non-Indian ASNs, reducing attack volume by 94%. Mamata deployed rate-limiting token buckets on `/api/v1/auth`, maintaining sub-15ms UPI payment response times.",
      auditMetrics: "Protected ₹45 Crores in daily transaction volume; DPDP Act 2023 technical safeguards fully certified."
    },
    jadavpur_research_network: {
      id: "jadavpur_research_network",
      title: "Jadavpur High-Performance University Computing Cluster",
      location: "Jadavpur, Kolkata, West Bengal",
      firewallLayout: "Routed Campus Core with Transparent Bridge Mode Firewalls between Department Laboratories",
      threatScenario: "Student research lab workstation infected with Mirai botnet variant scanning campus subnets for open Telnet and SSH.",
      defensiveResponse: "Mahima's Inter-VLAN firewall flagged anomalous East-West SYN packets on port 23, dynamically isolating the infected laboratory switch port via 802.1X NAC, preventing the botnet from reaching central university servers.",
      auditMetrics: "Infection contained to a single workstation in 45 seconds with zero administrative intervention required."
    }
  };

  const currentZone = placementZones[selectedPlacementZone];
  const currentPacket = packetSimulationCases[selectedPacketFlow];
  const currentDrill = regionalDrills[activeRegionalDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🧱 Module 005_001 • Topic 1</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            What is a Firewall? Core Functions &amp; Placement in Networks
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the foundational architecture of network access control. Understand the 5 core functions of modern firewalls, strategic placement topologies (<strong className="text-sky-400">Edge Gateway, DMZ Boundary, Inter-VLAN Core, and Host OS</strong>), and Linux Netfilter kernel packet processing lifecycles.
          </p>
        </header>

        {/* SECTION 1: CORE FUNCTIONS & PLACEMENT TOPOLOGY SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Enterprise Firewall Placement Architecture &amp; Zone Isolation
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Where firewalls sit in enterprise networks determines what traffic they can inspect and what blast radius they prevent.
            </p>
          </div>

          {/* SVG 1: FIREWALL PLACEMENT TOPOLOGY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Multi-Tier Enterprise Firewall Placement Topology
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Edge • DMZ • Inter-VLAN • Host</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgPlacementTopologyId}
                viewBox="0 0 850 320"
                className="w-full max-w-4xl h-auto"
                aria-label="Enterprise Firewall Placement Topology"
              >
                {/* ZONE 1: UNTRUSTED INTERNET */}
                <rect x="20" y="40" width="130" height="240" rx="10" fill="#18181b" stroke="#71717a" strokeWidth="1.5" strokeDasharray="4,4" />
                <text x="85" y="65" fill="#a1a1aa" fontSize="11" fontWeight="bold" textAnchor="middle">
                  UNTRUSTED WAN
                </text>
                <circle cx="85" cy="120" r="28" fill="#27272a" stroke="#ef4444" strokeWidth="2" />
                <text x="85" y="124" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Internet
                </text>
                <text x="85" y="180" fill="#ef4444" fontSize="8" textAnchor="middle">
                  Untrusted Probes
                </text>
                <text x="85" y="195" fill="#a1a1aa" fontSize="8" textAnchor="middle">
                  DDoS / Port Scans
                </text>

                {/* ARROW 1 */}
                <path d="M 150 140 L 190 140" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow)" />

                {/* FIREWALL 1: EDGE GATEWAY */}
                <rect x="190" y="80" width="100" height="120" rx="8" fill="#082f49" stroke="#0284c7" strokeWidth="2.5" />
                <text x="240" y="105" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                  1. EDGE FW
                </text>
                <text x="240" y="125" fill="#ffffff" fontSize="8" textAnchor="middle">
                  Bogon Filter
                </text>
                <text x="240" y="140" fill="#7dd3fc" fontSize="8" textAnchor="middle">
                  PAT / SNAT
                </text>
                <text x="240" y="155" fill="#ffffff" fontSize="8" textAnchor="middle">
                  Default-Deny
                </text>

                {/* ARROW 2: TO DMZ */}
                <path d="M 290 120 L 340 90" stroke="#38bdf8" strokeWidth="2" />

                {/* ZONE 2: DMZ BUFFER */}
                <rect x="340" y="30" width="140" height="110" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
                <text x="410" y="52" fill="#f59e0b" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  2. DMZ BUFFER
                </text>
                <rect x="355" y="62" width="110" height="65" rx="5" fill="#312e81" />
                <text x="410" y="80" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Web &amp; DNS Servers
                </text>
                <text x="410" y="96" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Port 443 / 53 Only
                </text>
                <text x="410" y="112" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  No Direct LAN Route!
                </text>

                {/* ARROW 3: FROM DMZ TO INTERNAL FW */}
                <path d="M 480 90 L 530 130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />

                {/* FIREWALL 2: INTER-VLAN CORE */}
                <rect x="530" y="80" width="110" height="120" rx="8" fill="#311042" stroke="#6366f1" strokeWidth="2.5" />
                <text x="585" y="105" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">
                  3. INTER-VLAN FW
                </text>
                <text x="585" y="125" fill="#ffffff" fontSize="8" textAnchor="middle">
                  Micro-segmentation
                </text>
                <text x="585" y="140" fill="#c084fc" fontSize="8" textAnchor="middle">
                  Block SMB (445)
                </text>
                <text x="585" y="155" fill="#ffffff" fontSize="8" textAnchor="middle">
                  DB Whitelist (5432)
                </text>

                {/* ARROW 4: TO INTERNAL LAN */}
                <path d="M 640 140 L 680 140" stroke="#6366f1" strokeWidth="2" />

                {/* ZONE 3: INTERNAL ENTERPRISE LAN */}
                <rect x="680" y="40" width="150" height="240" rx="10" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="755" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. INTERNAL LAN
                </text>
                <rect x="695" y="80" width="120" height="55" rx="6" fill="#064e3b" />
                <text x="755" y="98" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Database Vault Tier
                </text>
                <text x="755" y="115" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  PostgreSQL (10.10.4.50)
                </text>

                <rect x="695" y="150" width="120" height="60" rx="6" fill="#064e3b" />
                <text x="755" y="168" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  User Workstations
                </text>
                <text x="755" y="185" fill="#6ee7b7" fontSize="7.5" textAnchor="middle">
                  Host-based FW (iptables)
                </text>
                <text x="755" y="198" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Isolated from DB Subnet
                </text>
              </svg>
            </div>
          </div>

          {/* 5 Core Functions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-950/60 space-y-1.5">
              <span className="font-bold text-sky-400 uppercase tracking-wider block">
                1. Traffic Filtering &amp; Access Control
              </span>
              <p className="text-gray-300 leading-relaxed">
                Evaluates packets against an ordered rule base, executing <strong className="text-emerald-400">ACCEPT</strong>, <strong className="text-rose-400">DROP</strong> (silent discard), or <strong className="text-amber-400">REJECT</strong> (sends TCP RST/ICMP).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-950/60 space-y-1.5">
              <span className="font-bold text-amber-400 uppercase tracking-wider block">
                2. Network Address Translation (NAT/PAT)
              </span>
              <p className="text-gray-300 leading-relaxed">
                Maps private RFC 1918 internal subnets to public WAN IPs via Port Address Translation, obfuscating internal network topology from external scanners.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-950/60 space-y-1.5">
              <span className="font-bold text-indigo-400 uppercase tracking-wider block">
                3. Stateful Inspection (`conntrack`)
              </span>
              <p className="text-gray-300 leading-relaxed">
                Tracks active TCP 3-way handshakes in kernel memory, ensuring reply packets are permitted only if they belong to an established, valid session.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-950/60 space-y-1.5">
              <span className="font-bold text-purple-400 uppercase tracking-wider block">
                4. Telemetry &amp; SIEM Logging
              </span>
              <p className="text-gray-300 leading-relaxed">
                Dispatches structured audit records to SIEM collectors. CERT-In mandates 180-day log retention and NPL India NTP synchronization.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-950/60 space-y-1.5 sm:col-span-2 lg:col-span-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block">
                5. Cryptographic VPN Termination
              </span>
              <p className="text-gray-300 leading-relaxed">
                Terminates encrypted IPsec and SSL/TLS tunnels for secure site-to-site branch connections and remote employee access across public Internet paths.
              </p>
            </div>
          </div>
        </section>

        {/* STUDIO 1: PLACEMENT ZONE EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Firewall Zone Placement &amp; Policy Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms, security policies, failure modes, and regional deployments for each strategic placement tier.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentZone.badgeColor)}>
              {currentZone.title}
            </span>
          </div>

          {/* Placement Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(placementZones).map((z) => (
              <button
                key={z.key}
                onClick={() => setSelectedPlacementZone(z.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedPlacementZone === z.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {z.title}
              </button>
            ))}
          </div>

          {/* Active Zone Detail Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentZone.title}
                </h3>
                <span className="text-gray-400 font-sans">Physical / Logical Location: {currentZone.locationName}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentZone.badgeColor)}>
                Zone Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider block">
                  🛡️ Primary Security Controls:
                </span>
                <ul className="space-y-1 text-gray-300 list-disc list-inside">
                  {currentZone.primaryFunctions.map((fn, idx) => (
                    <li key={idx}>{fn}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                  📋 Enforced Security Policy:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentZone.securityPolicy}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">
                ⚠️ Critical Failure Mode &amp; Lateral Risk:
              </span>
              <p className="text-gray-300 leading-relaxed font-sans">{currentZone.failureModeRisk}</p>
            </div>

            <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-900/50 text-sky-200 flex items-center gap-2">
              <span className="text-sky-400 font-bold">📍 Regional Deployment Context:</span>
              <span>{currentZone.regionalContext}</span>
            </div>
          </div>
        </section>

        {/* STUDIO 2: PACKET EVALUATOR & NAT SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Multi-Zone Packet Evaluator &amp; NAT Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject network flows across different zones and observe rule evaluation order, NAT translations, and access control verdicts.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Multi-Zone Rule Base
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Network Traffic Flow:</label>
              <select
                value={selectedPacketFlow}
                onChange={(e) => setSelectedPacketFlow(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(packetSimulationCases).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Inter-VLAN Core Firewall Strictness:</label>
              <button
                onClick={() => setInterVlanStrictness(interVlanStrictness === "strict" ? "permissive" : "strict")}
                className={clsx(
                  "w-full p-2.5 rounded-lg text-xs font-semibold border transition-all",
                  interVlanStrictness === "strict"
                    ? "bg-indigo-950/80 text-indigo-300 border-indigo-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              >
                {interVlanStrictness === "strict" ? "✔ Strict Micro-segmentation (Drop Direct DB Access)" : "⚠️ Permissive (Allow Direct DB Subnet Routing)"}
              </button>
            </div>
          </div>

          {/* Live Packet Flow Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Inspected Flow &amp; Destination Zone:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentPacket.src} ➔ {currentPacket.dst} ({currentPacket.protocol})
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-gray-300 font-mono text-[11px]">
                  Zone: {currentPacket.zoneChecked}
                </span>
                <span className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border",
                  currentPacket.action.includes("ACCEPT")
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-rose-950 text-rose-300 border-rose-700"
                )}>
                  {currentPacket.action}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  NAT / Routing Translation Engine:
                </span>
                <div className="text-gray-300 font-mono">{currentPacket.natState}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  Architectural Rationale:
                </span>
                <p className="text-gray-300">{currentPacket.explanation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: FIREWALL CORE ENGINE SCRIPT */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Multi-Zone Firewall Rule Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete, standalone Python implementation demonstrating rule ordering, SNAT/PAT mapping, and zone evaluation logic.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              firewall_core.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="firewall_core.py"
            highlightLines={[25, 41, 53, 67]}
          />
        </section>

        {/* STUDIO 3: SIZING & TCO CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Firewall Sizing, `conntrack` Capacity &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Estimate required connection tracking capacity in kernel RAM, CERT-In 180-day telemetry storage, and 5-year Total Cost of Ownership in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              INR ₹ Sizing Engine
            </span>
          </div>

          {/* Sizing Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Active Concurrent Users:</span>
                <span className="text-sky-400 font-bold">{concurrentUsers.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={concurrentUsers}
                onChange={(e) => setConcurrentUsers(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Peak Throughput Demand:</span>
                <span className="text-indigo-400 font-bold">{bandwidthGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={bandwidthGbps}
                onChange={(e) => setBandwidthGbps(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Deployment Form Factor:</span>
                <span className="text-emerald-400 font-bold uppercase text-[10px]">{applianceFormFactor}</span>
              </div>
              <select
                value={applianceFormFactor}
                onChange={(e) => setApplianceFormFactor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gray-200 focus:outline-none"
              >
                <option value="hardware_ha">Dual Hardware HA Appliance</option>
                <option value="virtual_cloud">Virtual Cloud Firewall (AWS/Azure)</option>
                <option value="hybrid">Hybrid Enterprise Mesh</option>
              </select>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Conntrack Table Sizing</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedSizing.estimatedConntrackEntries}</div>
              <span className="text-[10px] text-gray-500 block">Requires ~{calculatedSizing.conntrackMemoryMB} MB Kernel RAM</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">180-Day CERT-In Log Archive</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">{calculatedSizing.totalRetentionLogGB} GB</div>
              <span className="text-[10px] text-gray-500 block">~{calculatedSizing.dailyLogGB} GB Log Telemetry Daily</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Estimated TCO</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹{calculatedSizing.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Appliance + License + High Availability</span>
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
                onClick={() => setActiveRegionalDrillId(d.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeRegionalDrillId === d.id
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
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.firewallLayout}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300 font-mono self-start sm:self-auto">
                Live Audit Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Multi-Zone Defense Execution:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.defensiveResponse}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.auditMetrics}</p>
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
                <span>Firewalls mediate traffic between security zones based on an ordered, top-down rule base.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>The 3 primary actions are ACCEPT (forward), DROP (silent discard), and REJECT (sends RST/ICMP).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>NAT/PAT translates private RFC 1918 IPs to public WAN IPs and conceals internal topology.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Placement tiers: Edge Perimeter, DMZ Boundary, Inter-VLAN Core, and Host-based Endpoints.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Netfilter sequence: PREROUTING ➔ ROUTING ➔ (INPUT / FORWARD) ➔ OUTPUT ➔ POSTROUTING.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day log retention and NTP synchronization with NPL India.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="What is a Firewall? Core Functions & Placement FAQs"
            subtitle="30 In-depth Practice Questions & Placement Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="What is a Firewall? Core Functions & Placement (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 1 of Module 005_001! In this lesson, we demystified the internal mechanics and strategic placement of enterprise firewalls. Understand that a firewall is not merely a single physical box sitting in a server rack; it is an omnipresent architectural control plane deployed at the WAN Edge, the DMZ Boundary, the Inter-VLAN Distribution Core, and individual Host Kernels. Master the 5 core functions: Access Control filtering, Network Address Translation (NAT/PAT), Stateful session verification (`conntrack`), Telemetry logging, and VPN termination. Remember that rule ordering is critical (First-Match-Wins): placing broad rules above specific rules creates the dangerous 'Rule Shadowing' vulnerability. For Indian enterprise compliance, ensure your firewalls maintain 180-day log retention and synchronize system clocks with NPL India NTP servers as mandated by CERT-In and the DPDP Act 2023. Keep up the high-standard engineering discipline as we move into Packet Filtering and Stateful Inspection architectures next!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic1;
