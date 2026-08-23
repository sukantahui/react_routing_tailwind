import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgDosId = useId();

  // Studio 1: Active DoS Attack Selection
  const [selectedAttackKey, setSelectedAttackKey] = useState("tcp_syn_flood_exhaustion");

  // Studio 2: Live Queueing Availability Calculator State
  const [serverCapacity, setServerCapacity] = useState(1000); // 200 to 2000 req/s (mu)
  const [legitTraffic, setLegitTraffic] = useState(200); // 50 to 500 req/s (lambda_legit)
  const [attackTraffic, setAttackTraffic] = useState(3500); // 0 to 5000 req/s (lambda_attack)
  const [mitigationStrength, setMitigationStrength] = useState(1); // 1 = None, 50 = Basic Firewall, 500 = SYN Cookies + WAF

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_dos_defense");

  // Studio 4: DoS Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("linux_kernel_sysctl_hardening");

  // 8 Fundamental DoS Attack Profiles for Studio 1
  const attackDatabase = {
    tcp_syn_flood_exhaustion: {
      key: "tcp_syn_flood_exhaustion",
      name: "1. TCP SYN Flood & Half-Open Queue Exhaustion",
      category: "PROTOCOL STATE-TABLE EXHAUSTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Transport Layer (TCP / Layer 4)",
      exploitationVector:
        "The attacker floods the server with TCP SYN packets from spoofed IPs and never sends the final ACK; the server's SYN Backlog queue fills up, rejecting all legitimate connection handshakes.",
      vulnerabilityImpact:
        "Complete denial of service for all incoming TCP connections (HTTP, SSH, SMTP) while server CPU and bandwidth remain largely untouched.",
      telemetryIndicator: "Surge in TCP connections stuck in `SYN_RECV` state in `netstat` and high embryonic connection drops",
      resilientDefense: "Enabling Linux TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) and increasing `tcp_max_syn_backlog`.",
      codeSnippet: `// TCP SYN Flood Mechanism:
// Attacker ➔ [SYN Packet] ➔ Server allocates Transmission Control Block (TCB)
// Server   ➔ [SYN-ACK]   ➔ Sent to Spoofed IP (No reply ever arrives!)
// Server Half-Open Backlog Fills ➔ Subsequent legitimate connections DROPPED!`
    },
    slowloris_header_starvation: {
      key: "slowloris_header_starvation",
      name: "2. Slowloris HTTP Header Starvation",
      category: "APPLICATION LAYER THREAD STARVATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Application Layer (HTTP / Layer 7)",
      exploitationVector:
        "The attacker opens multiple HTTP connections and transmits incomplete request headers extremely slowly (every 15 seconds), holding server worker threads open with minimal bandwidth.",
      vulnerabilityImpact:
        "Exhausts thread-based web server connection pools (e.g. Apache prefork), locking the web application with under 5 KB/s of attacker traffic.",
      telemetryIndicator: "Dozens of open HTTP connections in `READ_HEADER` state with near-zero transfer bandwidth",
      resilientDefense: "Deploying asynchronous event-driven reverse proxies (Nginx `epoll`) with strict `client_header_timeout` caps.",
      codeSnippet: `// Slowloris Header Sequence:
GET / HTTP/1.1\\r\\n
Host: kolkata-fintech.in\\r\\n
X-Header-1: a\\r\\n
... (waits 15 seconds) ...
X-Header-2: b\\r\\n  <-- Never sends final \\r\\n\\r\\n! Holds thread indefinitely!`
    },
    ping_of_death_fragmentation: {
      key: "ping_of_death_fragmentation",
      name: "3. Ping of Death (Malformed IP Fragmentation)",
      category: "OPERATING SYSTEM KERNEL CRASH",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Network Layer (IPv4 / ICMP / Layer 3)",
      exploitationVector:
        "The attacker sends fragmented ICMP echo packets whose total reassembled offset length exceeds the maximum IPv4 limit of 65,535 bytes, overflowing kernel memory buffers.",
      vulnerabilityImpact:
        "Immediate kernel panic, Blue Screen of Death (BSOD), or system reboot upon packet reassembly in unpatched OS stacks.",
      telemetryIndicator: "Fragmented IP packets with offset and fragment length combinations summing to $> 65,535$ bytes",
      resilientDefense: "Operating system TCP/IP stack kernel patches enforcing strict IPv4 reassembled size checks.",
      codeSnippet: `// Ping of Death Size Calculation:
// Fragment 1 : Offset = 0, Length = 1500
// ...
// Final Frag : Offset = 8100 (64,800 bytes), Length = 1000
// Reassembled Total: 65,800 bytes > 65,535 Max IP Limit ➔ KERNEL PANIC!`
    },
    teardrop_overlapping_offset: {
      key: "teardrop_overlapping_offset",
      name: "4. Teardrop Overlapping Offset Crash",
      category: "IP REASSEMBLY LOGIC EXPLOITATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Network Layer (IPv4 Fragmentation)",
      exploitationVector:
        "The attacker sends fragmented IP packets with overlapping offset fields; flawed reassembly code calculates negative payload lengths, corrupting kernel heap memory.",
      vulnerabilityImpact:
        "Instant operating system crash and server lockup without requiring high bandwidth.",
      telemetryIndicator: "Consecutive IP fragments where Fragment 2 offset is smaller than Fragment 1 end offset",
      resilientDefense: "Boundary validation in kernel IP reassembly routines dropping out-of-order overlapping fragments.",
      codeSnippet: `// Teardrop Overlapping Fragment Configuration:
// Frag 1 : Offset = 0   ➔ Bytes 0 to 1499
// Frag 2 : Offset = 100 ➔ Bytes 800 to 2299 (Overlaps Frag 1 by 700 bytes!)
// Result : Unpatched stack calculates negative length ➔ Memory Corruption Crash!`
    },
    land_attack_infinite_loop: {
      key: "land_attack_infinite_loop",
      name: "5. Land Attack (Spoofed Self-Loop)",
      category: "NETWORK LAYER LOGIC EXPLOITATION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetLayer: "Transport & Network Layer (TCP/IP)",
      exploitationVector:
        "The attacker sends a TCP SYN packet where the Source IP and Port are spoofed to match the victim's own Destination IP and Port, forcing the victim to reply to itself endlessly.",
      vulnerabilityImpact:
        "The victim operating system enters an infinite connection loop, consuming 100% CPU and exhausting internal socket tables.",
      telemetryIndicator: "Inbound packets arriving on external interfaces where `Source IP == Destination IP`",
      resilientDefense: "Perimeter ingress firewall rules dropping any packet where the Source IP matches internal local subnet ranges (RFC 2827 / BCP 38).",
      codeSnippet: `// Land Attack Packet Header:
IP_Header.src_ip = "103.25.10.50"; // Victim IP
IP_Header.dst_ip = "103.25.10.50"; // Victim IP (SAME!)
TCP_Header.src_port = 80;
TCP_Header.dst_port = 80;
// Result: Victim machine loops infinitely sending SYN-ACKs to itself!`
    },
    udp_connectionless_flood: {
      key: "udp_connectionless_flood",
      name: "6. UDP Connectionless Port Flood",
      category: "VOLUMETRIC PIPE SATURATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetLayer: "Transport Layer (UDP / Layer 4)",
      exploitationVector:
        "The attacker floods random destination UDP ports with large datagrams; the victim must look up each port, find no listening application, and generate an ICMP Port Unreachable reply.",
      vulnerabilityImpact:
        "Saturates upstream network bandwidth (Gbps) and exhausts server CPU generating millions of ICMP error packets.",
      telemetryIndicator: "Massive volume of UDP traffic targeting closed high ports (e.g. ports 10,000-65,000) and spike in ICMP Type 3 Code 3 replies",
      resilientDefense: "Upstream ISP rate limiting, dropping UDP on unallocated ports, and ICMP response rate limiting.",
      codeSnippet: `# Scapy Python UDP Flood Command:
packet = IP(src=fake_ip, dst="103.25.10.50")/UDP(dport=random.randint(1024,65535))/Raw(load=b"X"*1400)
send(packet, loop=1, verbose=False)`
    },
    redos_regex_cpu_starvation: {
      key: "redos_regex_cpu_starvation",
      name: "7. ReDoS (Regular Expression Denial of Service)",
      category: "APPLICATION ALGORITHMIC COMPLEXITY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Application Layer (Input Validation)",
      exploitationVector:
        "The attacker submits crafted text inputs to an endpoint using a poorly designed regular expression with nested quantifiers, triggering exponential $O(2^N)$ backtracking in the regex engine.",
      vulnerabilityImpact:
        "100% CPU lockup across all server cores with just 20-30 concurrent HTTP requests, freezing the entire application.",
      telemetryIndicator: "Sudden spike to 100% CPU utilization on web worker processes handling specific search/validation URLs",
      resilientDefense: "Using linear-time regex engines (Google RE2) that guarantee $O(N)$ matching and enforcing regex timeout limits.",
      codeSnippet: `// ReDoS Vulnerable Pattern:
let regex = /^(a+)+$/;
let attack_payload = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"; // 30 'a's followed by '!'
// Result: 1,073,741,824 backtracking operations ➔ 100% CPU Core Lock!`
    },
    smurf_icmp_broadcast_amplification: {
      key: "smurf_icmp_broadcast_amplification",
      name: "8. Smurf ICMP Broadcast Amplification",
      category: "NETWORK AMPLIFICATION FLOOD",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Network Layer (ICMP Broadcast)",
      exploitationVector:
        "The attacker sends ICMP echo requests to the broadcast address of an intermediary network with the Source IP spoofed to the victim, causing every host on the subnet to reply to the victim.",
      vulnerabilityImpact:
        "Generates up to $250\\times$ bandwidth amplification, overwhelming the victim's network link with unsolicited ICMP echo replies.",
      telemetryIndicator: "Massive influx of ICMP Echo Reply packets originating from dozens of hosts on an external subnet",
      resilientDefense: "Configuring border routers with `no ip directed-broadcast` to drop subnet broadcast ping packets.",
      codeSnippet: `// Smurf Broadcast Amplification:
// Attacker sends : 1 ICMP Request to Broadcast IP (10.0.0.255) with Source = Victim IP
// 250 Hosts reply: 250 ICMP Echo Replies flood Victim IP (250x Amplification!)
// Mitigation    : Cisco Router: "no ip directed-broadcast"`
    }
  };

  const activeAttack = attackDatabase[selectedAttackKey];

  // Studio 2: Live M/M/1 Queueing Availability Calculations
  const queueSimulation = useMemo(() => {
    // Effective attack traffic after mitigation:
    const effectiveAttack = attackTraffic / mitigationStrength;
    const availableCapacity = serverCapacity - legitTraffic;
    
    let rawDropProb = 0;
    if (availableCapacity <= 0) {
      rawDropProb = 100;
    } else {
      const exponent = -effectiveAttack / availableCapacity;
      rawDropProb = (1 - Math.exp(exponent)) * 100;
    }

    const finalDropProb = rawDropProb > 99.9 ? 99.9 : rawDropProb < 0.1 ? 0.1 : rawDropProb;
    const availabilityScore = (100 - finalDropProb).toFixed(2);

    return {
      availabilityScore,
      dropProb: finalDropProb.toFixed(2),
      badgeClass: parseFloat(availabilityScore) > 90
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : parseFloat(availabilityScore) > 50
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-rose-950 text-rose-300 border-rose-800",
      statusMessage: parseFloat(availabilityScore) > 90
        ? `HIGH SERVICE AVAILABILITY: With Kernel SYN Cookies & WAF Mitigation (${mitigationStrength}x), service availability is ${availabilityScore}% despite ${attackTraffic} req/s of attack traffic!`
        : `CRITICAL SERVICE OUTAGE: Without DoS mitigation (${mitigationStrength}x), ${attackTraffic} req/s attack traffic causes a ${finalDropProb.toFixed(1)}% request drop rate, paralyzing the server!`
    };
  }, [serverCapacity, legitTraffic, attackTraffic, mitigationStrength]);

  // Studio 4: DoS Security Production Code Database
  const codeDatabase = {
    linux_kernel_sysctl_hardening: {
      name: "Linux sysctl.conf Kernel Hardening for TCP SYN Flood & Conntrack Resilience",
      code: `# Production Linux /etc/sysctl.conf DoS Hardening Configuration:

# 1. Enable TCP SYN Cookies (RFC 4987) - Immune to SYN Queue Exhaustion!
net.ipv4.tcp_syncookies = 1

# 2. Increase TCP SYN Backlog Queue Size
net.ipv4.tcp_max_syn_backlog = 8192

# 3. Reduce SYN-ACK Retries to Drop Dead Embryonic Connections Faster
net.ipv4.tcp_synack_retries = 2

# 4. Scale Stateful Firewall Conntrack Table Capacity
net.netfilter.nf_conntrack_max = 2097152

# 5. Drop Spoofed Localhost / Subnet Ingress Packets (Land Attack Defense)
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# 6. Ignore ICMP Broadcast Requests (Smurf Attack Defense)
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Apply settings immediately:
# sysctl -p /etc/sysctl.conf`,
      explanation: "Linux kernel configuration parameters enabling TCP SYN Cookies, scaling stateful connection tracking tables to 2,000,000 entries, and disabling ICMP broadcast responses."
    },
    nginx_dos_rate_limiting: {
      name: "Nginx Asynchronous Reverse Proxy Rate Limiting & Slowloris Timeout Rules",
      code: `# Nginx Web Server Configuration for Slowloris & HTTP Flood Defense
http {
    # 1. Define In-Memory Rate Limiting Zone (10MB holds 160,000 IP addresses)
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=15r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

    server {
        listen 80;
        server_name kolkata-fintech.in;

        # 2. Slowloris Mitigation: Strict Client Header & Body Read Timeouts
        client_header_timeout 10s;
        client_body_timeout   10s;
        keepalive_timeout     15s;
        send_timeout          10s;

        # 3. Restrict Maximum Concurrent Connections per Source IP
        limit_conn conn_limit 20;

        location /api/ {
            # 4. Enforce Request Rate Limiting (Allows 15 r/s with burst of 10)
            limit_req zone=api_limit burst=10 nodelay;
            proxy_pass http://backend_cluster;
        }
    }
}`,
      explanation: "Nginx reverse proxy configuration defining per-IP request rate limiting zones, capping concurrent connections, and setting strict 10-second client timeouts to defeat Slowloris."
    },
    scapy_dos_packet_inspector: {
      name: "Python Scapy Script for Land & Ping of Death Packet Analysis",
      code: `# Python Scapy Tool to Inspect and Validate Malformed DoS Packet Headers
from scapy.all import *

def inspect_packet_for_dos_signatures(packet):
    if packet.haslayer(IP):
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        
        # 1. Check for Land Attack (Source IP == Destination IP)
        if src_ip == dst_ip:
            print(f"[!] LAND ATTACK DETECTED: Spoofed loop packet targeting {dst_ip}!")
            return "DROP_MALFORMED_LAND"
            
        # 2. Check for Ping of Death (Oversized Reassembly Offsets)
        if packet.haslayer(ICMP):
            total_offset = packet[IP].frag * 8 + packet[IP].len
            if total_offset > 65535:
                print(f"[!] PING OF DEATH DETECTED: Packet reassembly size {total_offset} > 65535!")
                return "DROP_PING_OF_DEATH"
                
    return "FORWARD_CLEAN_PACKET"

print("[+] DoS Packet Inspection Engine Active on Kolkata Financial Gateway!")`,
      explanation: "Python forensic script using Scapy to analyze incoming network packets, detecting and dropping Land attack self-loops and oversized Ping of Death fragmentation structures."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_dos_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Intercepting a Localized Single-Source DoS Flood on Payment Switches",
      threatType: "CONNECTION POOL & STATE TABLE EXHAUSTION",
      budget: "₹48,00,000",
      incident:
        "An attacker launched a multi-threaded TCP SYN and Slowloris flood from a 10 Gbps host, attempting to exhaust the connection pool on core financial settlement switches.",
      defenseStrategy:
        "Mamata tuned Linux kernel parameters to enable TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) and deployed Nginx reverse proxy rate limiting with 10s header timeouts.",
      outcome: "Zero settlement transaction delays; 100% of bogus half-open connections absorbed without RAM allocation; 45 core financial switches protected.",
      metrics: {
        synPacketsAbsorbed: "850,000 / Second",
        stateTableUsage: "< 12% RAM Utilized",
        settlementSwitchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction & IT Act Section 43(f)"
      }
    },
    {
      id: "barrackpore_scada_dos_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "LOGIC-BASED PACKET CRASH (Malformed Modbus RTU Packets)",
      title: "Preventing Logic-Based DoS Packet Crashes on SCADA Controllers",
      budget: "₹36,00,000",
      incident:
        "Adversaries transmitted malformed, oversized Modbus TCP packets to industrial RTU controllers, attempting to trigger memory buffer overflows and crash substation telemetry.",
      defenseStrategy:
        "Debangshu deployed deep packet inspection (DPI) industrial firewalls enforcing strict Modbus protocol boundary validation and dropping non-standard packet lengths.",
      outcome: "Malformed DoS packets dropped at the OT boundary; zero controller crashes; power grid frequency stabilized across North 24 Parganas.",
      metrics: {
        malformedPacketsDropped: "100% Intercepted",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_cpu_starvation",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "APPLICATION LAYER CPU STARVATION (ReDoS & SQL Scans)",
      title: "Protecting Patient Registration Servers Against ReDoS CPU Starvation",
      budget: "₹25,00,000",
      incident:
        "During peak morning outpatient registration, an attacker submitted recursive regex payloads to the appointment search portal, driving server CPU to 100%.",
      defenseStrategy:
        "Mahima replaced the vulnerable backtracking regex engine with Google RE2 ($O(N)$ linear-time engine) and implemented WAF request timeout quotas.",
      outcome: "Search latency reduced from 30+ seconds to 4 milliseconds; registration portal remained 100% available for 1,500 daily patients.",
      metrics: {
        searchLatency: "4.0 Milliseconds",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_queueing_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF QUEUEING STARVATION & DoS DROP RATES",
      title: "Formulating the Queueing Starvation & DoS Resource Exhaustion Model",
      budget: "₹21,50,000",
      incident:
        "Researchers analyzed the mathematical interaction between arrival rates, server processing capacity, and request drop probabilities in M/M/1 queueing systems.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that kernel SYN cookies and asynchronous proxies keep drop rates below 0.2%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 65,000 simulated DoS traffic conditions.",
      metrics: {
        simulationTrials: "65,000 Test Trials",
        modelAccuracy: "99.6% Predictive Fit",
        modelFramework: "M/M/1 Queueing Equation",
        publication: "IEEE Transactions on Information Forensics"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_004
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 00
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Introduction to Denial of Service (DoS) Attacks
            </h1>
            <p className="text-xs text-gray-400">
              The CIA Availability pillar, volumetric vs protocol vs application DoS, TCP SYN cookies, Slowloris, and IT Act Section 66F.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Fundamental Threat Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Denial of Service: Violating the Availability Pillar
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              A <strong>Denial of Service (DoS)</strong> attack is designed to render computer systems, network services, or cloud applications 
              inaccessible to authorized legitimate users, directly violating the <strong>Availability</strong> pillar of the CIA triad. 
              DoS attacks span three primary technical dimensions: <strong>Volumetric Attacks</strong> (saturating upstream bandwidth in Gbps 
              via UDP/ICMP floods), <strong>Protocol / State Exhaustion Attacks</strong> (exhausting firewall `conntrack` tables, TCP SYN backlogs, 
              and memory buffers in PPS via SYN floods, Ping of Death, Teardrop, and Land attacks), and <strong>Application Layer Attacks</strong> 
              (exhausting server CPU, RAM, and database connection pools in RPS via Slowloris, RUDY, and ReDoS algorithmic complexity).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Volumetric vs Protocol Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Volumetric vs Protocol vs Application DoS
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                TCP SYN Flood: Fills half-open connection queue ➔ Defeated via RFC 4987 TCP SYN Cookies!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Volumetric attacks choke physical pipes; protocol attacks exhaust OS connection tables; application attacks tie up worker threads 
                using minimal bandwidth (e.g. Slowloris sending headers every 15s).
              </p>
            </div>

            {/* Kernel Tuning & Defense Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Kernel Tuning &amp; Asynchronous Protection
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">TCP SYN Cookies:</strong> Encodes state in ISN hashes, eliminating backlog RAM allocation.</li>
                <li>• <strong className="text-purple-300">Conntrack Table Scaling:</strong> Expands state table limits to 2,000,000 entries.</li>
                <li>• <strong className="text-amber-300">Nginx Epoll Proxies:</strong> Buffers slow headers asynchronously without locking worker threads.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - DoS Threat Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              DoS Defense Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing DoS Attack Pathways vs Multi-Layered Defensive Armor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how incoming volumetric, protocol, and application DoS traffic encounters Upstream ISP BGP filters, 
              Stateful Firewall Conntrack tables, Kernel SYN Cookies, and Asynchronous Nginx worker pools:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INCOMING ATTACK TRAFFIC */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. DoS FLOOD
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  High-Rate Ingress
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ATTACK TYPES:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SYN Flood / UDP Flood
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Slowloris / ReDoS
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: UPSTREAM ISP & BGP FILTER */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. ISP BGP FILTER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Pipe Saturation Defense
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EDGE FILTERS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  BGP Flowspec ACLs
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Null0 Blackhole Discard
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: FIREWALL CONNTRACK SCALING */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. STATE TABLE
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Conntrack Hardening
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  STATE CAPACITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Max = 2,000,000 States
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Embryonic Drop Timers
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: KERNEL TCP SYN COOKIES */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. SYN COOKIES
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  RFC 4987 ISN Hashing
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ZERO RAM ALLOC:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  ISN Hash Encodes State
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Queue Never Fills Up!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: ASYNCHRONOUS APP POOL */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. NGINX EPOLL
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Async Event Engine
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% AVAILABLE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Drops Slow Headers
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Clean User Traffic!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Attack DoS Vector Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. DoS Attack Vector &amp; Resource Starvation Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a fundamental DoS attack vector below to examine its target layer, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(attackDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedAttackKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedAttackKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  VECTOR
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeAttack.categoryBadge)}>
                    {activeAttack.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Target: {activeAttack.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeAttack.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeAttack.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeAttack.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeAttack.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeAttack.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Packet Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeAttack.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live M/M/1 Queueing Availability Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. M/M/1 Queueing Availability &amp; Request Drop Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust server capacity $\mu$, legitimate traffic $\lambda_{\text{legit}}$, attack traffic $\lambda_{\text{attack}}$, 
              and kernel/WAF mitigation strength $R$ to model request drop probability $P_{\text{drop}} = 1 - e^{-\frac{\lambda_{\text{attack}}}{\mu - \lambda_{\text{legit}}}}$ and see how SYN cookies restore availability above 99%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Queueing &amp; Traffic Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Server Processing Capacity (μ):</span>
                  <span className="text-cyan-400 font-bold font-mono">{serverCapacity} req/s</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="100"
                  value={serverCapacity}
                  onChange={(e) => setServerCapacity(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Legitimate Traffic Rate (λ_legit):</span>
                  <span className="text-emerald-400 font-bold font-mono">{legitTraffic} req/s</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={legitTraffic}
                  onChange={(e) => setLegitTraffic(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>DoS Attack Traffic Rate (λ_attack):</span>
                  <span className="text-rose-400 font-bold font-mono">{attackTraffic} req/s</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="250"
                  value={attackTraffic}
                  onChange={(e) => setAttackTraffic(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Kernel &amp; WAF Mitigation (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setMitigationStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      mitigationStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setMitigationStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      mitigationStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Firewall (50x)
                  </button>
                  <button
                    onClick={() => setMitigationStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      mitigationStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    SYN Cookie (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Availability &amp; Drop Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Service Availability Score</span>
                  <span className="text-lg font-extrabold text-emerald-400">{queueSimulation.availabilityScore}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Legitimate Requests Handled</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Request Drop Probability</span>
                  <span className="text-lg font-extrabold text-white">{queueSimulation.dropProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Buffer Overflow Drop Rate</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", queueSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Queueing Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{queueSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - DoS Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Kernel sysctl &amp; Nginx Tuning Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production DoS Kernel Hardening &amp; Proxy Tuning Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Linux sysctl.conf kernel parameters enabling TCP SYN cookies, Nginx reverse proxy rate limiting configurations, 
              and Python Scapy packet inspection scripts:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Hardening
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita absorb TCP SYN floods, 
              prevent SCADA controller buffer overflows, and eliminate ReDoS search freezes across West Bengal infrastructure:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; DoS Threat Vector
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Penalties for Denial of Service &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              treat Denial of Service attacks with severe civil compensation liabilities and life imprisonment penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> DoS attacks paralyzing critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(f) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(f):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for denying authorized access.
                </li>
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems DoS (Up to 10 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In SLA
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for persistent availability safeguards collapse.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of DoS service outages within <strong className="text-white">6 hours</strong>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Assuming High Bandwidth is Required for All DoS:</strong> Slowloris and ReDoS crash servers with under 5 KB/s.
                </li>
                <li>
                  <strong>Leaving TCP SYN Cookies Disabled:</strong> Leaves servers vulnerable to SYN queue memory exhaustion.
                </li>
                <li>
                  <strong>Allowing Subnet Directed Broadcasts:</strong> Enables Smurf amplification floods against internal hosts.
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Enable `net.ipv4.tcp_syncookies = 1`:</strong> Renders SYN flood queue exhaustion mathematically impossible.
                </li>
                <li>
                  <strong>Deploy Asynchronous Nginx Reverse Proxies:</strong> Buffers Slowloris headers without locking worker threads.
                </li>
                <li>
                  <strong>Scale Stateful Conntrack Tables:</strong> Set `nf_conntrack_max = 2000000` to prevent state memory drops.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  Why does an M/M/1 queue experience an exponential surge in request drop probability when attack traffic rate $\lambda_{\text{attack}}$ exceeds available service capacity $\mu - \lambda_{\text{legit}}$?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why do TCP SYN Cookies (RFC 4987) prevent memory allocation during the SYN phase without breaking TCP RFC compliance?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch mitigation to SYN Cookie (500x) and observe availability surge above 99%!
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DoS attacks directly violate the Availability pillar of the CIA Triad.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Volumetric attacks saturate bandwidth (Gbps); Protocol attacks exhaust connection state (PPS).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Application attacks (Slowloris, RUDY) consume server threads (RPS) using minimal bandwidth.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TCP SYN Cookies (RFC 4987) encode connection state into ISN, eliminating backlog memory allocation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes DoS Cyber Terrorism with Life Imprisonment.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 43(f) of the IT Act provides civil damages up to ₹1 Crore for denying authorized access.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Introduction to DoS FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Availability Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Denial of Service (DoS) Attacks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 004_004 on Denial of Service (DoS) and DDoS Attacks! Remember that while Confidentiality breaches steal data and Integrity breaches alter data, DoS attacks are weaponized explicitly against the Availability pillar of the CIA Triad! Understand the three attack dimensions: Volumetric floods (saturating upstream bandwidth in Gbps via UDP/ICMP floods), Protocol state-exhaustion attacks (exhausting firewall conntrack tables and TCP SYN queues in PPS), and Application layer starvation (exhausting CPU and database pools in RPS via Slowloris, RUDY, and ReDoS regular expression backtracking). Master the core technical countermeasures: enable Linux kernel TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) to eliminate memory allocation during connection handshakes, scale stateful connection tracking tables to 2,000,000 entries, deploy asynchronous event-driven Nginx reverse proxies with strict client header timeouts, and configure upstream BGP Flowspec rate limits. Remember that Section 66F of the Indian IT Act treats DoS attacks on critical infrastructure as Cyber Terrorism punishable with Life Imprisonment, and Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
