import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic2_files/stateless_filter.py?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svg5TupleId = useId();
  const svgTcpFlagsId = useId();

  // Studio 1: 5-Tuple Field Selection
  const [selectedTupleField, setSelectedTupleField] = useState("tcp_flags");

  // Studio 2: Live Stateless ACL Simulator State
  const [selectedTestPacket, setSelectedTestPacket] = useState("ack_spoof_probe");
  const [filterMode, setFilterMode] = useState("stateless"); // stateless vs stateful_spi

  // Studio 3: Performance & Latency Sizing
  const [packetRateMpps, setPacketRateMpps] = useState(10); // 1 to 50 Million Packets Per Second (Mpps)
  const [ruleCount, setRuleCount] = useState(500); // 10 to 5,000 rules
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true); // TCAM hardware vs Software CPU

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("jadavpur_nkn_gateway");

  // 5-Tuple Fields Database for Studio 1
  const tupleFields = {
    src_ip: {
      key: "src_ip",
      name: "1. Source IP Address (Layer 3)",
      headerSize: "32 bits (IPv4) / 128 bits (IPv6)",
      matchType: "Exact Host (/32) or Subnet Prefix (CIDR)",
      functionDesc: "Identifies the network layer origin of the packet. Used for Bogon filtering, Geo-IP blocking, and ingress spoofing detection.",
      vulnerabilityContext: "Easily spoofed in connectionless UDP and raw TCP SYN packets unless border routers enforce strict uRPF (RFC 3704).",
      example: "198.51.100.25 &rarr; Mask: 255.255.255.255"
    },
    dst_ip: {
      key: "dst_ip",
      name: "2. Destination IP Address (Layer 3)",
      headerSize: "32 bits (IPv4) / 128 bits (IPv6)",
      matchType: "Target Host or DMZ Subnet",
      functionDesc: "Determines which internal host or service should receive the packet. Used to route traffic into DMZs or internal server zones.",
      vulnerabilityContext: "Target of port scanning and subnet sweeping reconnaissance.",
      example: "172.16.1.10 (DMZ Web Server)"
    },
    protocol: {
      key: "protocol",
      name: "3. Transport Protocol (Layer 3 IP Header)",
      headerSize: "8 bits (IP Header Protocol Field)",
      matchType: "Integer Protocol Number",
      functionDesc: "Identifies the Layer 4 payload protocol: TCP (6), UDP (17), ICMP (1), GRE (47), ESP (50).",
      vulnerabilityContext: "Stateless filters cannot differentiate legitimate ICMP Path MTU Discovery from ICMP tunneling or ping flood sweeps.",
      example: "Protocol 6 (TCP) / Protocol 17 (UDP)"
    },
    src_port: {
      key: "src_port",
      name: "4. Source Port Number (Layer 4)",
      headerSize: "16 bits (0 to 65,535)",
      matchType: "Ephemeral Port Range or Static Service Port",
      functionDesc: "Identifies the client socket initiating the request (typically ephemeral range 1024-65535, or well-known port 53 for DNS responses).",
      vulnerabilityContext: "Attackers often spoof Source Port 53 or Source Port 20 to trick naive stateless filters that blindly permit traffic from trusted service ports.",
      example: "Port 51240 (Dynamic Client Ephemeral Port)"
    },
    dst_port: {
      key: "dst_port",
      name: "5. Destination Port Number (Layer 4)",
      headerSize: "16 bits (0 to 65,535)",
      matchType: "Target Service Port",
      functionDesc: "Defines the target server daemon (e.g. 443 for HTTPS, 80 for HTTP, 22 for SSH, 53 for DNS).",
      vulnerabilityContext: "Stateless filters allow any payload if the port is open, completely blind to SQLi or XSS exploits inside port 443.",
      example: "Port 443 (HTTPS) / Port 22 (SSH)"
    },
    tcp_flags: {
      key: "tcp_flags",
      name: "6. TCP Control Flags (Layer 4 TCP Header)",
      headerSize: "6 Control Bits (SYN, ACK, FIN, RST, PSH, URG)",
      matchType: "Bitmask Bitwise Match",
      functionDesc: "Controls connection state machine: SYN initiates handshakes, ACK confirms data, FIN/RST terminates sessions.",
      vulnerabilityContext: "ACK Spoofing Vulnerability: Forging ACK=1 tricks stateless filters (Cisco 'established') into treating unsolicited attacker probes as approved reply traffic.",
      example: "Flags: SYN=0, ACK=1, RST=0 (Crafted ACK Probe)"
    }
  };

  // Studio 2: Packet Simulation Cases
  const testPackets = {
    valid_https_syn: {
      id: "valid_https_syn",
      label: "Valid Inbound HTTPS Handshake (SYN)",
      src: "198.51.100.10:51200",
      dst: "172.16.1.10:443 (DMZ Web)",
      protocol: "TCP",
      flags: "SYN=1, ACK=0",
      statelessAction: "PERMIT (Rule #10)",
      statefulAction: "PERMIT (Allocates conntrack session)",
      securityAnalysis: "Legitimate new connection to public HTTPS port; both stateless and stateful firewalls permit this flow."
    },
    ack_spoof_probe: {
      id: "ack_spoof_probe",
      label: "Crafted TCP ACK Scan (SSH Port 22)",
      src: "198.51.100.30:60200",
      dst: "10.10.1.50:22 (Internal LAN SSH)",
      protocol: "TCP",
      flags: "SYN=0, ACK=1",
      statelessAction: "⚠️ PERMITTED (Vulnerable ACK Bypass via 'established' Rule #30!)",
      statefulAction: "🛡️ DROPPED (Out-of-state packet without prior 3-way handshake)",
      securityAnalysis: "Stateless filter blindly trusts ACK=1 and forwards probe to internal host! Stateful firewall checks conntrack table, finds zero prior session, and drops packet instantly."
    },
    unsolicited_syn_ssh: {
      id: "unsolicited_syn_ssh",
      label: "Unsolicited SYN Probe to Internal SSH (Port 22)",
      src: "198.51.100.20:60100",
      dst: "10.10.1.50:22 (Internal LAN SSH)",
      protocol: "TCP",
      flags: "SYN=1, ACK=0",
      statelessAction: "DENY (Rule #999 Default Deny)",
      statefulAction: "DROPPED (Default Deny)",
      securityAnalysis: "Stateless filter drops packet because destination port 22 is closed and SYN=1 fails the 'established' check."
    },
    udp_dns_query: {
      id: "udp_dns_query",
      label: "Public DNS Query to DMZ (UDP Port 53)",
      src: "198.51.100.40:53000",
      dst: "172.16.1.20:53 (DMZ DNS)",
      protocol: "UDP",
      flags: "N/A (Connectionless)",
      statelessAction: "PERMIT (Rule #40)",
      statefulAction: "PERMIT (Creates pseudo-state timer)",
      securityAnalysis: "UDP is connectionless; stateless filter matches destination port 53 without flag inspection."
    },
    tiny_fragment_probe: {
      id: "tiny_fragment_probe",
      label: "Tiny Fragment Attack (Offset = 0, Length = 28 Bytes)",
      src: "198.51.100.88:55000",
      dst: "10.10.1.50:22",
      protocol: "TCP (Fragmented)",
      flags: "Incomplete L4 Header",
      statelessAction: "⚠️ PERMITTED (Port 22 pushed to Fragment 2!)",
      statefulAction: "🛡️ CACHED & DROPPED (Virtual Reassembly detects unauthorized port)",
      securityAnalysis: "Naive stateless filter cannot see destination port in Fragment 1. Stateful firewall performs virtual reassembly in RAM before rule evaluation."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedPerformance = useMemo(() => {
    // Latency in nanoseconds
    const statelessLatencyNs = hardwareAcceleration ? 1.2 : 0.8 * ruleCount; // TCAM O(1) vs CPU O(N)
    const statefulLatencyNs = 140; // ~140ns conntrack hash lookup + state machine

    // Total processing power in Gigabits per second (assuming 1500-byte avg MTU)
    const throughputGbps = ((packetRateMpps * 1000000 * 1500 * 8) / 1000000000).toFixed(1);

    // CPU Clock cycles per packet
    const cpuCycles = hardwareAcceleration ? "1 Cycle (TCAM Parallel Match)" : `${Math.round(ruleCount * 1.5)} Cycles (Linear Search)`;

    return {
      statelessLatencyNs: statelessLatencyNs.toFixed(1),
      statefulLatencyNs,
      throughputGbps,
      cpuCycles,
      speedupFactor: (statefulLatencyNs / statelessLatencyNs).toFixed(0)
    };
  }, [packetRateMpps, ruleCount, hardwareAcceleration]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    jadavpur_nkn_gateway: {
      id: "jadavpur_nkn_gateway",
      title: "Jadavpur High-Speed Research NKN Gateway",
      location: "Jadavpur, Kolkata, West Bengal",
      throughput: "10 Gbps Line-Rate Research Backbone",
      challenge: "High-volume scientific data transfers caused edge stateful firewalls to run out of connection tracking memory (`nf_conntrack: table full`).",
      solution: "Sukanta Hui and Debangshu deployed stateless hardware TCAM ACLs at the Cisco edge router, using `-j NOTRACK` on high-volume research UDP streams, dropping packet latency from 180ns to 1.2ns while maintaining line-rate 10 Gbps throughput.",
      outcome: "Eliminated connection tracking memory bottlenecks, processing 14 Million packets per second with zero packet loss."
    },
    barrackpore_microfinance_filter: {
      id: "barrackpore_microfinance_filter",
      title: "Barrackpore Micro-Finance Branch Perimeter",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      throughput: "1 Gbps Commercial Banking Ingress",
      challenge: "Automated reconnaissance botnet launched TCP ACK scans (`nmap -sA`) attempting to map internal loan database ports behind naive stateless router filters.",
      solution: "Mamata and Mahima upgraded the branch boundary to a hybrid architecture: stateless ACLs drop Bogon and spoofed IPs at the border router, while an internal stateful SPI firewall dropped all out-of-state ACK probes.",
      outcome: "Complete neutralization of ACK reconnaissance scans; zero database topology disclosure."
    }
  };

  const currentTuple = tupleFields[selectedTupleField];
  const currentPacket = testPackets[selectedTestPacket];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>⚡ Module 005_001 • Topic 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Packet Filtering Firewalls (Stateless Inspection)
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master first-generation network security. Understand <strong className="text-sky-400">5-Tuple packet header matching</strong>, lightning-fast hardware TCAM lookup, TCP control flag analysis, and the critical structural vulnerabilities of stateless filtering (<strong className="text-rose-400">TCP ACK Spoofing &amp; Fragmentation Bypasses</strong>).
          </p>
        </header>

        {/* SECTION 1: 5-TUPLE ARCHITECTURE & SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The Stateless 5-Tuple Inspection Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              How stateless packet filters evaluate Layer 3 and Layer 4 headers in isolation without allocating connection tracking memory.
            </p>
          </div>

          {/* SVG 1: 5-TUPLE MATCHING DIAGRAM */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Stateless Packet Filter 5-Tuple Header Decomposition
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Layer 3 / Layer 4 Header Extraction</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svg5TupleId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Stateless 5-Tuple Packet Filter Diagram"
              >
                {/* RAW PACKET INGRESS */}
                <rect x="20" y="50" width="140" height="180" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                <text x="90" y="75" fill="#a1a1aa" fontSize="10" fontWeight="bold" textAnchor="middle">
                  INCOMING RAW PACKET
                </text>
                <rect x="35" y="90" width="110" height="30" rx="4" fill="#082f49" stroke="#38bdf8" />
                <text x="90" y="109" fill="#7dd3fc" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Layer 3: IP Header
                </text>
                <rect x="35" y="130" width="110" height="30" rx="4" fill="#311042" stroke="#818cf8" />
                <text x="90" y="149" fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Layer 4: TCP Header
                </text>
                <rect x="35" y="170" width="110" height="45" rx="4" fill="#27272a" stroke="#71717a" strokeDasharray="3,3" />
                <text x="90" y="196" fill="#71717a" fontSize="8" textAnchor="middle">
                  Layer 7 Payload
                </text>
                <text x="90" y="208" fill="#ef4444" fontSize="7" textAnchor="middle">
                  (IGNORED BY FILTER!)
                </text>

                {/* ARROW 1 */}
                <path d="M 160 140 L 210 140" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />

                {/* 5-TUPLE EXTRACTION ENGINE */}
                <rect x="210" y="30" width="260" height="220" rx="10" fill="#030712" stroke="#0284c7" strokeWidth="2" />
                <text x="340" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5-TUPLE MATCHING MATRIX
                </text>
                
                {/* 5 Fields */}
                <rect x="225" y="70" width="230" height="24" rx="4" fill="#082f49" />
                <text x="235" y="86" fill="#bae6fd" fontSize="8.5" fontWeight="bold">1. Source IP: 198.51.100.25</text>

                <rect x="225" y="100" width="230" height="24" rx="4" fill="#082f49" />
                <text x="235" y="116" fill="#bae6fd" fontSize="8.5" fontWeight="bold">2. Dest IP: 172.16.1.10</text>

                <rect x="225" y="130" width="230" height="24" rx="4" fill="#1e1b4b" />
                <text x="235" y="146" fill="#c7d2fe" fontSize="8.5" fontWeight="bold">3. Protocol: TCP (6)</text>

                <rect x="225" y="160" width="230" height="24" rx="4" fill="#1e1b4b" />
                <text x="235" y="176" fill="#c7d2fe" fontSize="8.5" fontWeight="bold">4. Source Port: 51200</text>

                <rect x="225" y="190" width="230" height="24" rx="4" fill="#311042" />
                <text x="235" y="206" fill="#fbcfe8" fontSize="8.5" fontWeight="bold">5. Dest Port: 443 (HTTPS)</text>

                <rect x="225" y="220" width="230" height="22" rx="4" fill="#4c0519" />
                <text x="235" y="235" fill="#fecdd3" fontSize="8" fontWeight="bold">+ Flags: SYN=1, ACK=0</text>

                {/* ARROW 2 */}
                <path d="M 470 140 L 520 140" stroke="#0284c7" strokeWidth="2.5" />

                {/* ACL RULE BASE (FIRST MATCH WINS) */}
                <rect x="520" y="40" width="310" height="200" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                <text x="675" y="65" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ORDERED ACL (FIRST MATCH WINS)
                </text>

                <rect x="535" y="80" width="280" height="30" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="545" y="100" fill="#a7f3d0" fontSize="8.5" fontWeight="bold">
                  Rule 10: PERMIT TCP ANY -&gt; 172.16.1.10:443 ➔ [MATCH!]
                </text>

                <rect x="535" y="120" width="280" height="30" rx="5" fill="#1e293b" opacity="0.6" />
                <text x="545" y="140" fill="#94a3b8" fontSize="8">
                  Rule 20: PERMIT TCP ANY -&gt; 172.16.1.10:80 (Skipped)
                </text>

                <rect x="535" y="160" width="280" height="30" rx="5" fill="#1e293b" opacity="0.6" />
                <text x="545" y="180" fill="#94a3b8" fontSize="8">
                  Rule 30: PERMIT TCP established (Skipped)
                </text>

                <rect x="535" y="200" width="280" height="26" rx="5" fill="#881337" opacity="0.6" />
                <text x="545" y="217" fill="#fda4af" fontSize="8">
                  Rule 999: DENY IP ANY -&gt; ANY (Implicit Deny)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: 5-TUPLE FIELD INSPECTOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: 5-Tuple Header Bitmask &amp; Field Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Deep-dive into each individual header field evaluated during stateless packet filtering.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              5-Tuple Explorer
            </span>
          </div>

          {/* Tuple Field Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(tupleFields).map((f) => (
              <button
                key={f.key}
                onClick={() => setSelectedTupleField(f.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedTupleField === f.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {f.name}
              </button>
            ))}
          </div>

          {/* Active Field Detail Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentTuple.name}
                </h3>
                <span className="text-gray-400 font-mono">Header Bit Length: {currentTuple.headerSize} • Match Mode: {currentTuple.matchType}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-300 font-mono self-start sm:self-auto">
                {currentTuple.example}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider block">
                  🔍 Functional Role in Packet Filtering:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentTuple.functionDesc}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">
                  ⚠️ Known Exploitation &amp; Evasion Vulnerability:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentTuple.vulnerabilityContext}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE ACK SCAN BYPASS SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: The ACK-Scan Bypass Laboratory (Stateless vs Stateful SPI)
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Demonstrating why stateless filters fall victim to crafted TCP ACK probes, while stateful firewalls drop out-of-state traffic.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono self-start sm:self-auto">
              Live Attack Probe
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Injected Packet Scenario:</label>
              <select
                value={selectedTestPacket}
                onChange={(e) => setSelectedTestPacket(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                {Object.values(testPackets).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Firewall Architecture Mode:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterMode("stateless")}
                  className={clsx(
                    "flex-1 p-2.5 rounded-lg text-xs font-semibold border transition-all",
                    filterMode === "stateless"
                      ? "bg-amber-950/80 text-amber-300 border-amber-800 shadow-md"
                      : "bg-slate-950 text-gray-400 border-slate-800"
                  )}
                &gt;
                  Stateless ACL (Cisco 'established')
                </button>
                <button
                  onClick={() => setFilterMode("stateful_spi")}
                  className={clsx(
                    "flex-1 p-2.5 rounded-lg text-xs font-semibold border transition-all",
                    filterMode === "stateful_spi"
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-md"
                      : "bg-slate-950 text-gray-400 border-slate-800"
                  )}
                &gt;
                  Stateful Inspection (SPI Conntrack)
                </button>
              </div>
            </div>
          </div>

          {/* Attack Result Comparison Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Packet 5-Tuple &amp; Flags:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentPacket.src} ➔ {currentPacket.dst} [{currentPacket.flags}]
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-gray-300 font-mono text-[11px]">
                  Mode: {filterMode.toUpperCase()}
                </span>
                <span className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border",
                  filterMode === "stateless"
                    ? currentPacket.statelessAction.includes("VULNERABLE")
                      ? "bg-rose-950 text-rose-300 border-rose-700 animate-pulse"
                      : currentPacket.statelessAction.includes("PERMIT")
                      ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                      : "bg-slate-900 text-gray-300 border-slate-700"
                    : currentPacket.statefulAction.includes("DROPPED")
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-sky-950 text-sky-300 border-sky-700"
                )}>
                  {filterMode === "stateless" ? currentPacket.statelessAction : currentPacket.statefulAction}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Forensic Architecture Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentPacket.securityAnalysis}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: STATELESS FILTER CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Stateless 5-Tuple Filter Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python script demonstrating static rule matching, Cisco 'established' flag evaluation, and ACK-spoofing detection.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              stateless_filter.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="stateless_filter.py"
            highlightLines={[25, 41, 51, 62]}
          />
        </section>

        {/* STUDIO 3: THROUGHPUT & TCAM CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Packet Filter Latency &amp; Hardware TCAM Speedup Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Compare nanosecond header lookup times between hardware TCAM stateless filters and software stateful inspection pipelines.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              Line-Rate Latency
            </span>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Packet Rate (Mpps):</span>
                <span className="text-sky-400 font-bold">{packetRateMpps} Mpps</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={packetRateMpps}
                onChange={(e) => setPacketRateMpps(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Active ACL Rules Count:</span>
                <span className="text-indigo-400 font-bold">{ruleCount} Rules</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={ruleCount}
                onChange={(e) => setRuleCount(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Hardware Acceleration:</span>
                <span className="text-emerald-400 font-bold">{hardwareAcceleration ? "TCAM Enabled" : "CPU Software"}</span>
              </div>
              <button
                onClick={() => setHardwareAcceleration(!hardwareAcceleration)}
                className={clsx(
                  "w-full p-1.5 rounded text-xs font-semibold border transition-all",
                  hardwareAcceleration
                    ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                    : "bg-amber-950 text-amber-300 border-amber-800"
                )}
              &gt;
                {hardwareAcceleration ? "✔ Hardware TCAM Active (O(1))" : "⚠️ Software CPU Scan (O(N))"}
              </button>
            </div>
          </div>

          {/* Latency Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Stateless Lookup Latency</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedPerformance.statelessLatencyNs} ns</div>
              <span className="text-[10px] text-gray-500 block">{calculatedPerformance.cpuCycles}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Stateful SPI Lookup Latency</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{calculatedPerformance.statefulLatencyNs} ns</div>
              <span className="text-[10px] text-gray-500 block">Hash collision + Conntrack Timer</span>
            </div>

            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Stateless Speed Advantage</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedPerformance.speedupFactor}x Faster</div>
              <span className="text-[10px] text-gray-500 block">Throughput: ~{calculatedPerformance.throughputGbps} Gbps Line-Rate</span>
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
                Collaborative regional response drills authored by Sukanta Hui and the student cyber engineering team.
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
                <span className="text-gray-400">Location: {currentDrill.location} • Link Speed: {currentDrill.throughput}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                TCAM Line-Rate Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Network Bottleneck / Threat:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.challenge}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Engineering Mitigation Deployed:</span>
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
                <span>Stateless firewalls inspect Layer 3 and Layer 4 headers in isolation (5-Tuple).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>5-Tuple: Source IP, Destination IP, Protocol, Source Port, Destination Port + TCP Flags.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Stateless filters do NOT track state tables (`conntrack`), providing line-rate speed (O(1)/O(N)).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Major weakness: Susceptible to TCP ACK spoofing, fragmentation attacks, and dynamic port bypasses.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Cisco `established` keyword checks for ACK or RST flag bits (0x10 or 0x04).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Hardware TCAM evaluates stateless ACLs in parallel in 1 clock cycle at 100+ Gbps.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Packet Filtering Firewalls (Stateless Inspection) FAQs"
            subtitle="30 In-depth Practice Questions & Stateless Header Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Packet Filtering Firewalls (Stateless Inspection) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 2 of Module 005_001! In this lesson, we explored the mechanics and limitations of Stateless Packet Filtering. Understand that while stateless filtering is exceptionally fast—executing in single clock cycles using hardware TCAM memory at edge screening routers—it operates with fundamental security blind spots. It cannot verify whether an incoming TCP ACK packet actually belongs to a legitimate session, leaving networks vulnerable to TCP ACK spoofing scans and dynamic port bypasses (such as Active FTP). In modern enterprise architectures, we use stateless filters at the border for high-speed volumetric packet dropping and Bogon filtering, but we always back them up with Stateful Packet Inspection (SPI) firewalls and Layer 7 Web Application Firewalls (WAF) to achieve true Defense-in-Depth. Keep this distinction sharp for your semester exams and technical interviews!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic2;
