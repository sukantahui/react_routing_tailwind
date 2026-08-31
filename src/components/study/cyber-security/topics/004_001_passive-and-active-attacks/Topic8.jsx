import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgDdosId = useId();

  // Studio 1: Active DDoS Threat Vector Selection
  const [selectedDdosKey, setSelectedDdosKey] = useState("dns_amplification");

  // Studio 2: Live Volumetric Flood & SYN Cookie Simulator State
  const [botCount, setBotCount] = useState(25000);
  const [isSynCookiesOn, setIsSynCookiesOn] = useState(true);
  const [attackVectorType, setAttackVectorType] = useState("syn_flood");

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_anycast_defense");

  // Studio 4: Anti-DDoS Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("linux_syn_cookies");

  // 8 DDoS Threat Vector Profiles for Studio 1
  const ddosDatabase = {
    dns_amplification: {
      key: "dns_amplification",
      name: "DNS Amplification & Reflection Flood",
      category: "VOLUMETRIC UDP FLOOD",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 3 (IP) / Layer 4 (UDP Port 53)",
      amplificationFactor: "50x to 70x Amplification",
      exploitationMechanism:
        "Adversary floods open recursive DNS resolvers with spoofed small queries (e.g. `ANY kolkatabank.in` with EDNS0 enabled). The resolvers reply with 3,500-byte responses directed at the victim's IP, saturating bandwidth.",
      attackVectorPayload: "Small 60-Byte Request ➔ 3,850-Byte DNS Response (70x Bandwidth Multiplier!)",
      productionDefense: "BGP Anycast Scrubbing Centers + Response Rate Limiting (RRL) on Authoritative Nameservers.",
      codeSnippet: `// BIND9 Response Rate Limiting (RRL) Config:
rate-limit {
    responses-per-second 5;
    window 5;
};`
    },
    tcp_syn_flood: {
      key: "tcp_syn_flood",
      name: "TCP SYN Flood (Socket Backlog Exhaustion)",
      category: "PROTOCOL / STATE EXHAUSTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 4 (Transport / TCP)",
      amplificationFactor: "1x (State-Exhaustive)",
      exploitationMechanism:
        "Adversary floods target with millions of forged TCP SYN packets from random IPs, filling the kernel's half-open backlog queue (`SYN_RECV`), causing all new legitimate connection requests to be dropped.",
      attackVectorPayload: "1,000,000 SYN Packets/sec ➔ Backlog Buffer (4,096 slots) exhausted in 4 milliseconds!",
      productionDefense: "Linux TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) + Hardware SYN Proxy Firewalls.",
      codeSnippet: `// Linux Kernel TCP SYN Cookie Activation:
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -w net.ipv4.tcp_max_syn_backlog=8192`
    },
    slowloris_http: {
      key: "slowloris_http",
      name: "Slowloris (Slow HTTP Header Exhaustion)",
      category: "APPLICATION LAYER EXHAUSTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (HTTP / Web Server)",
      amplificationFactor: "Asymmetric (Low Bandwidth, High Impact)",
      exploitationMechanism:
        "Opens hundreds of HTTP connections and sends incomplete headers very slowly (1 header byte every 15s). Thread-based web servers keep worker threads open indefinitely, exhausting connection pools.",
      attackVectorPayload: "Bandwidth: ~5 Kbps ➔ Exhausts 1,024 Apache Worker Threads in 30 seconds!",
      productionDefense: "Asynchronous event-driven web servers (Nginx) + `client_header_timeout 10s` + Connection limits.",
      codeSnippet: `// Nginx Anti-Slowloris Configuration:
client_body_timeout 10s;
client_header_timeout 10s;
limit_conn_zone $binary_remote_addr zone=addr:10m;
limit_conn addr 20;`
    },
    http2_rapid_reset: {
      key: "http2_rapid_reset",
      name: "HTTP/2 Rapid Reset Flood (CVE-2023-44487)",
      category: "LAYER 7 PROTOCOL ABUSE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (HTTP/2 Protocol)",
      amplificationFactor: "398 Million Requests/sec Record",
      exploitationMechanism:
        "Abuses HTTP/2 multiplexing by transmitting `HEADERS` frames followed immediately by `RST_STREAM` cancellation frames, forcing server CPUs to allocate and destroy stream state tables millions of times per second.",
      attackVectorPayload: "1 TCP Socket ➔ Transmits 500,000 Streams/sec with immediate RST_STREAM cancellations!",
      productionDefense: "Capping concurrent HTTP/2 streams per connection + WAF rapid reset anomaly rate limiting.",
      codeSnippet: `// Nginx HTTP/2 Stream Limit Hardening:
http2_max_concurrent_streams 64;
http2_max_requests 1000;`
    },
    redos_backtracking: {
      key: "redos_backtracking",
      name: "Regular Expression Denial of Service (ReDoS)",
      category: "ALGORITHMIC COMPLEXITY ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Application Runtime (Node.js / Python / Java)",
      amplificationFactor: "Exponential Time O(2^n)",
      exploitationMechanism:
        "Exploits vulnerable regex patterns with nested quantifiers (e.g. `(a+)+$`). Submitting a 30-character non-matching string triggers catastrophic backtracking, locking CPU cores at 100% for minutes.",
      attackVectorPayload: "Input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa!' ➔ 1 Billion backtracking iterations (CPU pegged at 100%)",
      productionDefense: "Google RE2 (Deterministic Finite Automata) linear-time regex engines + Regex validation linting.",
      codeSnippet: `// Secure Linear-Time Regex with RE2 in Node.js:
const RE2 = require('re2');
const safeRegex = new RE2('^([a-zA-Z0-9_.-]+)+@([a-zA-Z0-9_.-]+)+$');
safeRegex.test(userInput); // Always evaluates in O(n) linear time!`
    },
    memcached_reflection: {
      key: "memcached_reflection",
      name: "Memcached UDP Reflection Attack",
      category: "MEGA-AMPLIFICATION VOLUMETRIC",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 4 (UDP Port 11211)",
      amplificationFactor: "10,000x to 51,000x Amplification!",
      exploitationMechanism:
        "Attackers send 15-byte `stats` requests with a spoofed victim source IP to exposed Memcached servers on UDP port 11211. The server returns 750 Kilobytes of cached keys, generating terabits of attack traffic.",
      attackVectorPayload: "15-Byte UDP Query ➔ 750 KB Response (50,000x Amplification Factor)",
      productionDefense: "Disabling UDP on Memcached (`-U 0`) + Binding to localhost (127.0.0.1) + BGP FlowSpec.",
      codeSnippet: `// /etc/memcached.conf Hardening:
-l 127.0.0.1
-U 0 # Completely disables vulnerable UDP listener`
    },
    ntp_monlist_reflection: {
      key: "ntp_monlist_reflection",
      name: "NTP Monlist Amplification Flood",
      category: "VOLUMETRIC REFLECTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 4 (UDP Port 123)",
      amplificationFactor: "556x Amplification Factor",
      exploitationMechanism:
        "Adversary sends spoofed `monlist` queries to open NTP servers. The server returns the IP addresses of the last 600 clients that queried it, producing up to 100 packets totaling ~130 KB.",
      attackVectorPayload: "234-Byte NTP Request ➔ 130,000-Byte Response Stream (556x Multiplier)",
      productionDefense: "Disabling `monitor` in NTP configurations (`disable monitor` in `ntp.conf`).",
      codeSnippet: `// /etc/ntp.conf Hardening:
restrict default nomodify notrap nopeer noquery
disable monitor`
    },
    bgp_blackholing: {
      key: "bgp_blackholing",
      name: "BGP Remotely Triggered Blackholing (RTBH)",
      category: "MITIGATION EMERGENCY MECHANISM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 3 (BGP Routing)",
      amplificationFactor: "N/A (Sacrificial Routing)",
      exploitationMechanism:
        "When an overwhelming multi-terabit flood threatens upstream ISP transit pipes, the victim announces a `/32` host route tagged with community `65535:666`, causing the ISP to discard all traffic to that specific host.",
      attackVectorPayload: "BGP Route: 103.25.10.45/32 ➔ Community 65535:666 (Routes traffic into Null0)",
      productionDefense: "Fine-grained BGP FlowSpec (RFC 5575) instead of blunt full-host blackholing.",
      codeSnippet: `// Cisco BGP RTBH Announcement:
router bgp 65000
 address-family ipv4
  network 103.25.10.45 mask 255.255.255.255 route-map SET-BLACKHOLE`
    }
  };

  const activeDdos = ddosDatabase[selectedDdosKey];

  // Studio 2: Live Simulator Calculation Logic
  const simMetrics = useMemo(() => {
    let rawAttackGbps = 0;
    let packetDropRate = "0.0%";
    let cpuLoad = "12%";
    let serverStatus = "ONLINE & HEALTHY";
    let badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";

    if (attackVectorType === "syn_flood") {
      const synRateMpps = (botCount * 0.05).toFixed(1); // Mpps
      if (isSynCookiesOn) {
        serverStatus = "HEALTHY: SYN Cookies Active (No Socket Backlog Allocated)";
        packetDropRate = "0.0% Legitimate Loss";
        cpuLoad = "28%";
        badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";
      } else {
        serverStatus = "SERVER CRASHED: Backlog Queue Overflows (SYN_RECV Exhausted!)";
        packetDropRate = "99.8% Legitimate Connection Drops";
        cpuLoad = "100%";
        badgeClass = "bg-rose-950 text-rose-300 border-rose-800";
      }
      return {
        metricValue: `${synRateMpps} Mpps`,
        metricLabel: "SYN Packet Ingress Rate",
        serverStatus,
        packetDropRate,
        cpuLoad,
        badgeClass
      };
    } else {
      // DNS Amplification
      rawAttackGbps = ((botCount * 1.5 * 70) / 1000).toFixed(1); // Gbps
      if (parseFloat(rawAttackGbps) > 100) {
        serverStatus = "LINK SATURATED: 100 Gbps WAN Pipe Overwhelmed by Volumetric Flood!";
        packetDropRate = "94.5% Legitimate Packet Loss";
        cpuLoad = "95%";
        badgeClass = "bg-rose-950 text-rose-300 border-rose-800";
      } else {
        serverStatus = "PROTECTED: BGP Anycast Dispersing Traffic across Global Scrubbing PoPs";
        packetDropRate = "0.1% Packet Loss";
        cpuLoad = "34%";
        badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";
      }
      return {
        metricValue: `${rawAttackGbps} Gbps`,
        metricLabel: "Aggregated Volumetric Bandwidth",
        serverStatus,
        packetDropRate,
        cpuLoad,
        badgeClass
      };
    }
  }, [botCount, isSynCookiesOn, attackVectorType]);

  // Studio 4: Anti-DDoS Code Database
  const codeDatabase = {
    linux_syn_cookies: {
      name: "Linux Kernel SYN Cookie Hardening",
      code: `# /etc/sysctl.d/99-anti-ddos.conf
# Enable SYN Cookies (Defeats SYN backlog exhaustion)
net.ipv4.tcp_syncookies = 1

# Increase max half-open SYN backlog queue
net.ipv4.tcp_max_syn_backlog = 8192

# Reduce TCP SYN-ACK retransmission retries
net.ipv4.tcp_synack_retries = 2

# Increase max system socket queue
net.core.somaxconn = 8192

# Apply settings immediately:
# sudo sysctl -p /etc/sysctl.d/99-anti-ddos.conf`,
      explanation: "Hardens the Linux network stack by enabling SYN Cookies and expanding queue boundaries to defeat high-rate TCP SYN floods."
    },
    nginx_rate_limit: {
      name: "Nginx Token Bucket Rate Limiting",
      code: `# /etc/nginx/nginx.conf
http {
    # Define 10 MB memory zone tracking client IPs (10 requests/sec rate)
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    
    # Define connection zone limiting concurrent sockets per IP
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

    server {
        location /api/v1/ {
            # Allow burst of 20 requests with nodelay, drop excess with HTTP 429
            limit_req zone=api_limit burst=20 nodelay;
            limit_conn conn_limit 15;
            
            proxy_pass http://backend_cluster;
        }
    }
}`,
      explanation: "Uses Token Bucket algorithms in Nginx to cap incoming HTTP request rates, returning `HTTP 429 Too Many Requests` during Layer 7 floods."
    },
    bgp_flowspec_cisco: {
      name: "BGP FlowSpec Edge Filtering (Cisco IOS-XR)",
      code: `flowspec
 address-family ipv4
  service-policy type pbr DDoS-DROP-POLICY
 !
! Define FlowSpec Match Rules
class-map type pbr match-all DROP-NTP-AMPLIFICATION
 match destination-address 103.25.10.0 255.255.255.0
 match protocol udp
 match port 123
 match packet-length 400 1500
!
policy-map type pbr DDoS-DROP-POLICY
 class DROP-NTP-AMPLIFICATION
  drop
 !`,
      explanation: "Propagates fine-grained packet matching rules across border edge routers to drop amplified NTP/DNS traffic at hardware line rate."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_anycast_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Mitigating 450 Gbps DNS Amplification during Durga Puja Shopping",
      threatType: "VOLUMETRIC DNS REFLECTION & HTTP/2 RAPID RESET",
      budget: "₹38,00,000",
      incident:
        "A multi-terabit botnet launched a 450 Gbps DNS Amplification flood combined with an HTTP/2 Rapid Reset attack during peak Durga Puja online shopping, threatening to bring down the state payment switch.",
      defenseStrategy:
        "Mamata routed all incoming traffic through a global BGP Anycast scrubbing network (300 global PoPs) and deployed edge WAF stream capping, dispersing the 450 Gbps flood into manageable 1.5 Gbps local streams.",
      outcome: "100% portal uptime maintained; payment switch processed ₹240 Crores in festive transactions smoothly.",
      metrics: {
        peakFloodMitigated: "450 Gbps Volumetric",
        uptimeMaintained: "100.00%",
        mitigationLatency: "Under 2 Seconds",
        compliance: "RBI Cyber Security Master Direction Section 6"
      }
    },
    {
      id: "barrackpore_syn_proxy",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "PROTOCOL SYN FLOOD (SCADA Socket Exhaustion)",
      title: "Hardening Substation Gateway with Hardware SYN Proxies",
      budget: "₹19,00,000",
      incident:
        "A malicious TCP SYN flood targeted the substation gateway on port 502 (Modbus TCP), attempting to exhaust half-open socket buffers and block real-time breaker telemetry.",
      defenseStrategy:
        "Debangshu deployed a hardware SYN Proxy firewall on the perimeter, enabling Linux TCP SYN Cookies on all RTU front-end controllers to handle incoming handshakes without buffer allocation.",
      outcome: "Substation SCADA socket buffers remained 100% clear; continuous grid telemetry preserved.",
      metrics: {
        synFloodAbsorbed: "8.5 Million SYNs/sec",
        substationsProtected: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_slowloris_defense",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "APPLICATION LAYER SLOW HTTP (Slowloris)",
      title: "Neutralizing Slowloris Attacks on Cancer Appointment Web Portals",
      budget: "₹10,50,000",
      incident:
        "An adversary used Slowloris to open 2,000 slow HTTP connections, locking Apache worker threads and making the hospital oncology appointment booking portal unreachable.",
      defenseStrategy:
        "Mahima replaced Apache front-ends with an asynchronous event-driven Nginx reverse proxy configured with `client_header_timeout 10s` and strict IP connection limits.",
      outcome: "Slowloris attack collapsed within 10 seconds; hospital appointment portal restored to full availability.",
      metrics: {
        slowSocketsTerminated: "2,000 Rogue Connections",
        webServerThroughput: "12,000 Legitimate Patients/day",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_redos_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University High-Performance Computing Lab",
      threatType: "ALGORITHMIC COMPLEXITY DoS (ReDoS Backtracking)",
      title: "Building Automated DFA Linear-Time Regular Expression Analyzers",
      budget: "₹12,50,000",
      incident:
        "Researchers analyzed how a crafted 35-character string exploiting a nested regex quantifier in the university portal locked the Node.js single-threaded event loop for 60 seconds.",
      defenseStrategy:
        "Susmita and Abhronila integrated Google RE2 (Deterministic Finite Automata) linear-time evaluation engines across all university web services, eliminating catastrophic backtracking.",
      outcome: "Regex evaluation time reduced from 60 seconds to 0.01 milliseconds; ReDoS completely neutralized.",
      metrics: {
        timeComplexity: "O(n) Linear Time Guaranteed",
        cpuUtilizationDuringAttack: "1.2%",
        engineDeployed: "Google RE2 DFA",
        publication: "IEEE Transactions on Software Engineering"
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
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 08
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Active Attacks: Denial of Service (DoS &amp; DDoS) Fundamentals
            </h1>
            <p className="text-xs text-gray-400">
              Volumetric amplification, TCP SYN cookies, Slowloris, HTTP/2 Rapid Reset, ReDoS, BGP Anycast, and IT Act Section 66F.
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

        {/* SECTION 1: Executive Theory & The Availability Threat */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Availability Violation &amp; Resource Exhaustion
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Denial of Service: Overwhelming System Capacity
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              A <strong>Denial of Service (DoS)</strong> attack directly targets the <strong>Availability</strong> pillar of the CIA Triad. 
              By saturating network bandwidth, exhausting OS socket buffers, or triggering exponential CPU backtracking, adversaries 
              render critical systems unreachable to legitimate users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Volumetric Model Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Volumetric Amplification Equation
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60">
                Inbound_Volume = Bots × Egress_Rate × Amplification_Factor
              </div>
              <p className="text-gray-300 leading-relaxed">
                Exploiting stateless UDP reflection (Memcached 50,000x, NTP 556x, DNS 70x), small botnet requests 
                multiply into multi-terabit volumetric floods crushing upstream ISP pipes.
              </p>
            </div>

            {/* Protocol & App Layer Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                TCP SYN Cookie State Elimination
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60">
                ISN = PRF_Key( SrcIP, DstIP, Ports, t, MSS )
              </div>
              <p className="text-gray-300 leading-relaxed">
                SYN Cookies encode connection state into the 32-bit TCP sequence number, eliminating half-open socket backlog 
                allocation until the client completes the three-way handshake with a valid ACK.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Anycast Dispersion & Scrubbing Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              DDoS Dispersion Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing BGP Anycast Dispersion &amp; Global Traffic Scrubbing
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how a 1.5 Tbps global botnet flood is dispersed across multiple regional Anycast scrubbing centers, 
              filtering malicious UDP/SYN floods and forwarding only clean legitimate traffic to the origin server:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* NODE 1: GLOBAL BOTNET (1.5 Tbps Flood) */}
              <g transform="translate(40, 100)">
                <rect width="180" height="130" rx="12" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="90" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  GLOBAL BOTNET
                </text>
                <text x="90" y="48" fill="#fecdd3" fontSize="10" textAnchor="middle">
                  500,000 Compromised Bots
                </text>
                <rect x="15" y="60" width="150" height="55" rx="6" fill="#450a0a" stroke="#f87171" />
                <text x="90" y="80" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
                  1.5 Tbps VOLUMETRIC
                </text>
                <text x="90" y="98" fill="#ffffff" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                  UDP &amp; SYN Flood Tsunami
                </text>
              </g>

              {/* PATH 1: Botnet → Anycast PoPs */}
              <path d="M 220 165 L 360 165" stroke="#f43f5e" strokeWidth="4" fill="none" />
              <circle r="6" fill="#f43f5e">
                <animateMotion path="M 220 165 L 360 165" dur="1s" repeatCount="indefinite" />
              </circle>

              {/* NODE 2: BGP ANYCAST SCRUBBING CLUSTER */}
              <g transform="translate(360, 60)">
                <rect width="230" height="210" rx="12" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                <text x="115" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  BGP ANYCAST SCRUBBING
                </text>
                <text x="115" y="46" fill="#7dd3fc" fontSize="9.5" textAnchor="middle">
                  300 Global PoPs (Kolkata, Mumbai, Frankfurt)
                </text>

                <rect x="15" y="58" width="200" height="65" rx="6" fill="#082f49" />
                <text x="115" y="76" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  TRAFFIC DILUTION &amp; SCRUB:
                </text>
                <text x="115" y="92" fill="#e0f2fe" fontSize="8.5" textAnchor="middle">
                  Dispersed to ~5 Gbps / PoP
                </text>
                <text x="115" y="108" fill="#a5f3fc" fontSize="8" textAnchor="middle">
                  BGP FlowSpec + SYN Proxy Active
                </text>

                <rect x="15" y="132" width="200" height="65" rx="6" fill="#450a0a" stroke="#f43f5e" />
                <text x="115" y="152" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
                  DROPPED AT EDGE:
                </text>
                <text x="115" y="170" fill="#fca5a5" fontSize="8.5" textAnchor="middle">
                  1.498 Tbps Malicious Flood Discarded
                </text>
              </g>

              {/* PATH 2: Anycast → Clean Origin */}
              <path d="M 590 165 L 690 165" stroke="#10b981" strokeWidth="3" fill="none" />
              <circle r="4" fill="#10b981">
                <animateMotion path="M 590 165 L 690 165" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* NODE 3: PROTECTED ORIGIN SERVER */}
              <g transform="translate(690, 100)">
                <rect width="150" height="130" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="75" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ORIGIN SERVER
                </text>
                <text x="75" y="48" fill="#a7f3d0" fontSize="10" textAnchor="middle">
                  Kolkata Bank Core
                </text>

                <rect x="12" y="60" width="126" height="55" rx="6" fill="#022c22" />
                <text x="75" y="80" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">
                  CLEAN TRAFFIC ONLY
                </text>
                <text x="75" y="98" fill="#d1fae5" fontSize="8" textAnchor="middle">
                  100% Uptime Maintained
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector DDoS Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Denial of Service Threat Vector &amp; Amplification Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a DoS/DDoS attack vector below to inspect its operational mechanics, amplification multiplier, 
              live payload trace, and production mitigation code:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(ddosDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedDdosKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedDdosKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  DDoS
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeDdos.categoryBadge)}>
                    {activeDdos.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeDdos.targetLayer}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-amber-400">
                    Multiplier: {activeDdos.amplificationFactor}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeDdos.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Mechanism &amp; Exhaustion Flow
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeDdos.exploitationMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Observed Flood Metric / Attack Trace
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-amber-200 overflow-x-auto whitespace-pre-wrap border border-amber-950/50">
                    {activeDdos.attackVectorPayload}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Defensive Strategy &amp; Architecture
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeDdos.productionDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Hardening Configuration Code
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeDdos.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Volumetric & SYN Cookie Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. DDoS Volumetric &amp; SYN Cookie Resilience Simulator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust botnet scale and toggle TCP SYN Cookies to evaluate server survival and packet drop rates 
              during high-intensity floods:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Attack Parameters</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Botnet Device Count:</span>
                  <span className="text-rose-400 font-bold font-mono">{botCount.toLocaleString()} Bots</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={botCount}
                  onChange={(e) => setBotCount(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-2">
                <span className="text-gray-400 text-[10px] uppercase block">Select Attack Method:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAttackVectorType("syn_flood")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      attackVectorType === "syn_flood"
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    TCP SYN Flood
                  </button>
                  <button
                    onClick={() => setAttackVectorType("dns_amp")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      attackVectorType === "dns_amp"
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    DNS Amplification
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsSynCookiesOn(!isSynCookiesOn)}
                  className={clsx(
                    "w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 border",
                    isSynCookiesOn
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-rose-950 border-rose-500 text-rose-300"
                  )}
                >
                  {isSynCookiesOn ? "✔ TCP SYN Cookies ENABLED" : "✖ TCP SYN Cookies DISABLED"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Server Performance &amp; State</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">{simMetrics.metricLabel}</span>
                  <span className="text-base font-extrabold text-rose-400">{simMetrics.metricValue}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Ingress Inflow</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Legitimate Loss</span>
                  <span className="text-base font-extrabold text-amber-400">{simMetrics.packetDropRate}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Packet Dropped</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Server CPU Load</span>
                  <span className="text-base font-extrabold text-cyan-400">{simMetrics.cpuLoad}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Core Utilization</span>
                </div>
              </div>

              <div className={clsx("p-3.5 rounded-lg border font-mono text-xs", simMetrics.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Server Diagnostic Health:</span>
                <p className="mt-1 font-bold">{simMetrics.serverStatus}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Anti-DDoS Production Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              System Hardening &amp; Upstream Filtering
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Anti-DDoS Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Linux kernel sysctl configurations, Nginx rate limiting rules, and Cisco BGP FlowSpec policies:
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
                Production Config
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita defeat active Denial of Service 
              attacks across critical West Bengal infrastructure:
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
                  The Incident &amp; DDoS Threat
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
              7. Cyber Terrorism &amp; Statutory Penalties for DoS/DDoS in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber jurisprudence treats deliberate disruption of computer networks with extreme severity:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F (Cyber Terrorism)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Critical Infrastructure Denial:</strong> Intentionally disrupting critical systems (power grids, banking switches, nuclear facilities) carries <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 Section 66 &amp; 43(f)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking &amp; computer disruption (Up to 3 years prison + ₹5 Lakh fine).
                </li>
                <li>
                  <strong className="text-white">Section 43(f):</strong> Civil compensation up to ₹1 Crore for causing denial of computer access.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                CERT-In Mandatory 6-Hour Reporting
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Mandatory Timeline:</strong> All organizations in India must report DDoS and ransomware attacks to CERT-In within <strong className="text-white">6 hours</strong> of detection.
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
                  <strong>Relying on Local Firewalls for Multi-Gigabit Floods:</strong> Local firewalls cannot absorb a 100 Gbps flood when the internet link is only 1 Gbps.
                </li>
                <li>
                  <strong>Ignoring Slowloris on Apache:</strong> Slowloris consumes minimal bandwidth but completely exhausts web server worker threads.
                </li>
                <li>
                  <strong>Leaving UDP Open on Memcached/NTP:</strong> Exposed UDP ports allow attackers to use your servers as 50,000x reflection amplifiers.
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
                  <strong>Deploy BGP Anycast Scrubbing:</strong> Disperse multi-terabit floods across hundreds of global points of presence.
                </li>
                <li>
                  <strong>Enable Linux SYN Cookies:</strong> Protect socket backlogs against TCP SYN floods without allocating memory.
                </li>
                <li>
                  <strong>Use RE2 DFA Linear-Time Regex:</strong> Eliminate Regular Expression Denial of Service (ReDoS) catastrophic backtracking.
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
                  If a road can fit 100 cars per minute, what happens when 10,000 cars try to drive down the road at the same time?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does Memcached UDP reflection produce a staggering 50,000x amplification factor compared to DNS 70x?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the simulator above, increase the bot count to 50,000 and turn SYN cookies off—watch the server crash with a 100% CPU lockup.
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
                <span>DoS/DDoS attacks violate the Availability pillar of the CIA Triad.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>UDP reflection attacks achieve up to 50,000x amplification (Memcached UDP 11211).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TCP SYN Cookies defeat half-open backlog exhaustion without allocating socket memory.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Slowloris exhausts web worker threads using slow headers with minimal bandwidth.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BGP Anycast disperses global multi-terabit floods across hundreds of distributed scrubbing centers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act mandates LIFE IMPRISONMENT for Cyber Terrorism via critical DoS.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Active Attacks: Denial of Service (DoS & DDoS) FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Availability Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Active Attacks: Denial of Service Fundamentals (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Denial of Service attacks directly target the Availability pillar of the CIA Triad! Whether it is a 1.5 Terabit UDP reflection flood, a TCP SYN backlog exhaustion, or a Slowloris thread starvation attack, the objective is to prevent legitimate citizens and businesses from accessing critical services. Always deploy multi-tiered defenses: BGP Anycast scrubbing at the cloud tier, BGP FlowSpec at the ISP border, TCP SYN Cookies in the OS kernel, and Token Bucket rate limiters on application WAFs. Remember that Section 66F of the Indian IT Act treats cyber attacks on critical infrastructure as Cyber Terrorism punishable by LIFE IMPRISONMENT!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
