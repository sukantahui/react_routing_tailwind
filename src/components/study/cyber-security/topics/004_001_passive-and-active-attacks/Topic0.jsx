import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgFlowId = useId();

  // Studio 1: Active Threat Vector Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("eavesdropping");

  // Studio 2: Live Protocol Simulator State
  const [selectedAttackTest, setSelectedAttackTest] = useState("replay_sim");
  const [selectedDefenseLayer, setSelectedDefenseLayer] = useState("tls13_nonce");

  // Studio 3: West Bengal Regional Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_upi_replay");

  // Studio 4: OSI Layer Distribution Active Tab
  const [activeOsiLayer, setActiveOsiLayer] = useState(7);

  // 8 Comprehensive Threat Vectors for Studio 1
  const threatDatabase = {
    eavesdropping: {
      key: "eavesdropping",
      name: "Packet Eavesdropping & Cleartext Sniffing",
      category: "PASSIVE ATTACK",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      ciaTarget: "Confidentiality (Pillar C)",
      ciaBadge: "bg-blue-950 text-blue-300 border-blue-800",
      osiLayer: "Layer 2 (Data Link) / Layer 7 (Application)",
      systemImpact: "0% Modification — System state, data, and performance remain completely untouched.",
      detectability: "Virtually Impossible on standard networks (Generates 0 audit log entries).",
      detectabilityScore: 8, // Out of 100
      mechanism:
        "Adversary places a Network Interface Card (NIC) into Promiscuous Mode on a shared Ethernet broadcast domain, Wi-Fi radio, or mirrored switch port, copying every passing frame into memory.",
      attackVectorCode: `// Promiscuous Sniffing Command (tcpdump / Wireshark):
# tcpdump -i eth0 -nn -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>&gt;2)) != 0)'
// Output captured: Cleartext HTTP credentials, unencrypted session cookies, database queries.`,
      realWorldPayload: "GET /api/v1/auth HTTP/1.1\nHost: portal.kolkata-edu.in\nCookie: session_id=SECRET_SESSION_TOKEN_89812\nAuthorization: Bearer eyJhbGciOi...",
      countermeasure: "End-to-End Encryption (E2EE) with TLS 1.3 (AES-256-GCM / ChaCha20-Poly1305), IPsec ESP, and SSHv2.",
      countermeasureCode: `// Nginx Strict TLS 1.3 Configuration:
ssl_protocols TLSv1.3;
ssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;
ssl_prefer_server_ciphers off;`
    },
    traffic_analysis: {
      key: "traffic_analysis",
      name: "Traffic Flow & Frequency Analysis",
      category: "PASSIVE ATTACK",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      ciaTarget: "Confidentiality (Metadata / Behavioral)",
      ciaBadge: "bg-blue-950 text-blue-300 border-blue-800",
      osiLayer: "Layer 3 (Network) / Layer 4 (Transport)",
      systemImpact: "0% Modification — Payload remains encrypted; adversary monitors packet rate, burst size, and node pairs.",
      detectability: "Undetectable (Adversary only reads externally visible IP/TCP header metadata without transmitting).",
      detectabilityScore: 4,
      mechanism:
        "Even when payloads are strongly encrypted with AES-256, the adversary analyzes packet timing intervals, burst volumes, and endpoint IP pairs to deduce military, commercial, or operational activity.",
      attackVectorCode: `// Statistical Burst Analyzer:
// Inter-packet arrival time: [0.001s, 0.001s, 0.002s] &rarr; Keystroke typing cadence identified
// Volume Surge: 120,000 pkts/min between Barrackpore Military Substation & Kolkata Command at 03:00 AM`,
      realWorldPayload: "[Encrypted TLS 1.3 ApplicationData]\nSrc: 192.168.10.5:5432 -> Dst: 10.0.1.20:443\nLength: 1420 Bytes | Burst Duration: 45.2s (Inferred DB Dump)",
      countermeasure: "Traffic Padding (Continuous dummy packet injection), Constant-Rate Transmission, and Onion Routing (Tor).",
      countermeasureCode: `// Constant-Bitrate Dummy Packet Injector:
def transmit_with_padding(payload, target_rate_bps=10000000):
    send(encrypt(payload))
    while channel_idle:
        send(encrypt(generate_pseudo_random_bytes(1400))) # Dummy noise`
    },
    fiber_macrobending: {
      key: "fiber_macrobending",
      name: "Optical Fiber Macrobending Wiretap",
      category: "PASSIVE ATTACK",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      ciaTarget: "Physical Layer Confidentiality",
      ciaBadge: "bg-blue-950 text-blue-300 border-blue-800",
      osiLayer: "Layer 1 (Physical)",
      systemImpact: "0% Data Modification — 1% to 3% light photons extracted via refraction; transmission continues unbroken.",
      detectability: "Near-Zero (<0.3 dB attenuation is within standard optical patch-panel tolerance).",
      detectabilityScore: 12,
      mechanism:
        "Adversary attaches a clip-on optical coupler that slightly curves the glass fiber core. Leaked light is focused onto a high-sensitivity photodiode receiver, cloning gigabit backbone data streams.",
      attackVectorCode: `// Optical Tapping Physics:
// Light Ray Angle > Critical Angle &rarr; Core Confinement broken -&gt; Photon leakage
// Attenuation Delta: -0.22 dB (Ignored by standard network monitoring alarms)`,
      realWorldPayload: "[Optical Bitstream Raw] 10 Gbps Ethernet Frame Cloned in Real-Time at Physical Fiber Sheath",
      countermeasure: "Optical Time-Domain Reflectometry (OTDR), Armored Conduit Enclosures, and Layer 2/3 Link-Level Encryption (MACsec / IPsec).",
      countermeasureCode: `// Cisco Catalyst MACsec (802.1AE) Layer 2 Line Encryption:
interface TenGigabitEthernet1/0/1
 macsec
 macsec key-chain MACSEC-KEY-CHAIN
 macsec replay-protection window-size 64`
    },
    timing_sidechannel: {
      key: "timing_sidechannel",
      name: "Timing & Cache Side-Channel Attack",
      category: "PASSIVE / HYBRID",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      ciaTarget: "Confidentiality (Cryptographic Keys)",
      ciaBadge: "bg-blue-950 text-blue-300 border-blue-800",
      osiLayer: "Hardware / Microarchitecture",
      systemImpact: "0% State Corruption — Passively measures nanosecond CPU execution differences during cryptographic operations.",
      detectability: "Extremely Low (Standard OS and application logs observe no abnormal errors).",
      detectabilityScore: 15,
      mechanism:
        "If a password or RSA private key verification routine terminates early on the first mismatched byte, the adversary measures response latencies to guess secret keys character-by-character.",
      attackVectorCode: `// Vulnerable Non-Constant-Time String Comparison:
function unsafeCompare(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false; // Timing leak on character mismatch!
  }
  return true;
}`,
      realWorldPayload: "Probe: 'P' -> Time: 4.12ms | Probe: 'Pa' &rarr; Time: 4.18ms | Probe: 'Pas' -&gt; Time: 4.25ms (Key Leaked!)",
      countermeasure: "Constant-Time Cryptographic Primitives (crypto.timingSafeEqual), Hardware Masking, and Cache Flush Defenses.",
      countermeasureCode: `// Constant-Time Secure Comparison in Node.js / WebCrypto:
const crypto = require('crypto');
function secureCompare(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return crypto.timingSafeEqual(bufA, bufB); // Constant execution time!
}`
    },
    message_modification: {
      key: "message_modification",
      name: "In-Flight Message Modification (Data Tampering)",
      category: "ACTIVE ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Integrity (Pillar I)",
      ciaBadge: "bg-amber-950 text-amber-300 border-amber-800",
      osiLayer: "Layer 4 (Transport) / Layer 7 (Application)",
      systemImpact: "Severe State Corruption — Financial amounts, beneficiary account numbers, or system configurations modified.",
      detectability: "High (Cryptographic hash / HMAC / Checksum mismatches trigger alerts).",
      detectabilityScore: 90,
      mechanism:
        "Adversary intercepts in-flight packet stream, alters critical payload values (e.g. changing account number or transaction amount), recalculates TCP checksums, and forwards the packet.",
      attackVectorCode: `// Scapy Packet Injection & Tampering Script:
from scapy.all import *
def modify_packet(pkt):
    if pkt.haslayer(Raw) and b"amount=500" in pkt[Raw].load:
        pkt[Raw].load = pkt[Raw].load.replace(b"amount=500", b"amount=50000")
        del pkt[IP].chksum
        del pkt[TCP].chksum
        send(pkt)`,
      realWorldPayload: "Original Payload : { transferId: 9012, toAccount: 'Debangshu_Barrackpore', amount: ₹500 }\nModified Payload : { transferId: 9012, toAccount: 'Attacker_Mule_Account', amount: ₹50,000 }",
      countermeasure: "HMAC-SHA256, Authenticated Encryption with Associated Data (AEAD - AES-GCM), and Asymmetric Digital Signatures.",
      countermeasureCode: `// HMAC-SHA256 Payload Integrity Tagging:
const hmac = crypto.createHmac('sha256', secretKey);
hmac.update(payloadString);
const signature = hmac.digest('hex'); // In-flight tampering invalidates tag!`
    },
    masquerade: {
      key: "masquerade",
      name: "Masquerade / Identity Spoofing",
      category: "ACTIVE ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Authenticity & Integrity",
      ciaBadge: "bg-purple-950 text-purple-300 border-purple-800",
      osiLayer: "Layer 3 (IP Spoofing) / Layer 7 (Auth)",
      systemImpact: "Unauthorized Privileged Access — Attacker executes administrative commands impersonating an authorized user.",
      detectability: "Moderate to High (Anomalous IP geolocation, concurrent session alerts in SIEM).",
      detectabilityScore: 78,
      mechanism:
        "Attacker acquires stolen credentials or forges IP source headers to impersonate Bank Admin Mamata, issuing unauthorized database purge or fund transfer requests.",
      attackVectorCode: `// IP Spoofing + Forged Request:
# hping3 -a 192.168.1.100 -S -p 443 10.0.0.1
// Victim server records source IP as trusted admin 192.168.1.100`,
      realWorldPayload: "POST /admin/db/truncate Host: bank-kolkata.in\nAuthorization: Bearer FORGED_OR_STOLEN_TOKEN\nX-Forwarded-For: 192.168.1.100 (Spoofed Mamata Admin)",
      countermeasure: "Mutual TLS (mTLS) with X.509 Client Certificates, FIDO2/WebAuthn Hardware Keys, BCP 38 Ingress Filtering.",
      countermeasureCode: `// mTLS Nginx Configuration:
ssl_client_certificate /etc/ssl/certs/ca.crt;
ssl_verify_client on;
ssl_verify_depth 2;`
    },
    replay_attack: {
      key: "replay_attack",
      name: "Cryptographic Replay Attack",
      category: "ACTIVE ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Integrity & Non-Repudiation",
      ciaBadge: "bg-amber-950 text-amber-300 border-amber-800",
      osiLayer: "Layer 7 (Application) / Layer 4 (Transport)",
      systemImpact: "Duplicate Execution — Legitimate encrypted commands processed multiple times without user authorization.",
      detectability: "Moderate (Audit ledgers show duplicate transaction IDs or out-of-order sequence numbers).",
      detectabilityScore: 82,
      mechanism:
        "Attacker intercepts a valid encrypted transaction `E_k('Transfer ₹10,000 to Susmita')` and broadcasts the exact ciphertext 10 times. Without freshness checks, the server executes ₹1,00,000 in duplicate transfers.",
      attackVectorCode: `// Replay Injection Loop (Curl Re-transmission):
for i in {1..10}; do
  curl -X POST https://api.bank.in/transfer -d '{"cipher": "d8a7ef90bc..."}' -H "Content-Type: application/json"
done`,
      realWorldPayload: "Valid Ciphertext Captured at 10:00:01 AM -> Replayed at 10:00:05 AM, 10:00:10 AM, 10:00:15 AM...",
      countermeasure: "Cryptographic Nonces (UUID), Monotonic Sequence Numbers, Synchronized Timestamps with strict 500ms sliding TTL windows.",
      countermeasureCode: `// Redis Distributed Anti-Replay Nonce Verification:
async function verifyTransaction(nonce, timestamp, signature) {
  if (Math.abs(Date.now() - timestamp) > 30000) throw new Error("Timestamp Expired");
  const isDuplicate = await redis.set(\`nonce:\${nonce}\`, '1', 'NX', 'EX', 60);
  if (!isDuplicate) throw new Error("Replay Attack Detected! Nonce already used.");
}`
    },
    denial_of_service: {
      key: "denial_of_service",
      name: "Denial of Service (SYN Flood & DoS)",
      category: "ACTIVE ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      ciaTarget: "Availability (Pillar A)",
      ciaBadge: "bg-red-950 text-red-300 border-red-800",
      osiLayer: "Layer 4 (Transport) / Layer 7 (Application)",
      systemImpact: "Total Service Outage — Server memory and connection state tables (TCB) exhausted; legitimate customers blocked.",
      detectability: "Extremely High (Bandwidth saturation alarms, 100% CPU utilization, 504 Gateway Timeouts).",
      detectabilityScore: 98,
      mechanism:
        "Botnet floods the target with millions of half-open TCP SYN requests per second with spoofed source IPs, filling the kernel backlog queue and dropping legitimate connections.",
      attackVectorCode: `// High-Rate SYN Flood (hping3):
# hping3 --flood --rand-source -S -p 443 203.0.113.10
// Result: 1,000,000 SYN packets/sec exhaust Transmission Control Blocks`,
      realWorldPayload: "TCP SYN [Src: Spoofed Random IPs, Dst: 203.0.113.10:443] x 5,000,000/sec (No ACK returned)",
      countermeasure: "SYN Cookies (RFC 4987), Anycast CDN Scrubbing Centers, Cloudflare Magic Transit / AWS Shield, BCP 38 Ingress Filtering.",
      countermeasureCode: `// Linux Kernel Hardening against SYN Floods:
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -w net.ipv4.tcp_max_syn_backlog=4096
sysctl -w net.ipv4.tcp_synack_retries=2`
    }
  };

  const activeThreat = threatDatabase[selectedThreatKey];

  // OSI Layer Data for Section 2
  const osiLayerData = {
    1: {
      layer: "Layer 1: Physical Layer",
      passiveAttacks: "Optical fiber macrobending taps, copper cable inductive wiretaps, RF electromagnetic emanations (TEMPEST).",
      activeAttacks: "Cable severance, physical hardware destruction, wireless signal jamming, rogue hardware keyloggers.",
      defenses: "Optical Time-Domain Reflectometry (OTDR), armored conduit cable trays, Faraday cage shielding, MACsec (802.1AE)."
    },
    2: {
      layer: "Layer 2: Data Link Layer",
      passiveAttacks: "Promiscuous mode packet sniffing on shared hubs/Wi-Fi, MAC address table harvesting.",
      activeAttacks: "ARP cache poisoning / spoofing, MAC flooding, CAM table overflow, Spanning Tree (STP) manipulation, VLAN hopping.",
      defenses: "Dynamic ARP Inspection (DAI), DHCP Snooping, Port Security (limit MAC per port), 802.1X Network Access Control."
    },
    3: {
      layer: "Layer 3: Network Layer",
      passiveAttacks: "IP header inspection, routing path tracing (traceroute), traffic volume and transmission burst analysis.",
      activeAttacks: "IP address spoofing, ICMP Redirect attacks, Smurf amplification, BGP route hijacking, Ping of Death.",
      defenses: "BCP 38 / uRPF Ingress/Egress Filtering, IPsec Tunnel Mode with ESP, RPKI for BGP validation, ICMP rate limiting."
    },
    4: {
      layer: "Layer 4: Transport Layer",
      passiveAttacks: "TCP port scanning (SYN stealth scans), TCP sequence number monitoring and window size analysis.",
      activeAttacks: "TCP SYN Flood DoS, TCP Reset (RST) injection, TCP Session Hijacking, UDP flood reflection.",
      defenses: "SYN Cookies (RFC 4987), Random TCP Initial Sequence Numbers (ISNs), Statefull Firewalls, TLS 1.3 encryption."
    },
    5: {
      layer: "Layer 5/6: Session & Presentation Layer",
      passiveAttacks: "SSL/TLS handshake metadata inspection, SNI (Server Name Indication) snooping, cipher negotiation listening.",
      activeAttacks: "SSL Stripping (HTTP downgrade), Padding Oracle attacks, BEAST/CRIME cipher exploits, rogue CA certificate injection.",
      defenses: "Encrypted SNI (ECH), HTTP Strict Transport Security (HSTS Preload), Certificate Pinning, Deprecation of TLS 1.0/1.1."
    },
    7: {
      layer: "Layer 7: Application Layer",
      passiveAttacks: "HTTP cleartext eavesdropping, unencrypted POP3/FTP password sniffing, log harvesting.",
      activeAttacks: "SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, API token replay attacks, HTTP Slowloris, credential stuffing.",
      defenses: "Web Application Firewalls (WAF), Parameterized SQL queries, Nonces and CSRF tokens, FIDO2 Multi-Factor Authentication."
    }
  };

  // Studio 2: Live Protocol Attack & Defense Simulation Matrix
  const attackSimulations = {
    replay_sim: {
      name: "Transaction Replay Simulation",
      attackAction: "Capturing ₹10,000 encrypted transfer token and re-sending it 5 times consecutively.",
      withNoDefense: "FAILED — Server has no nonce check; processes all 5 requests. ₹50,000 deducted illegally!",
      withTLS13: "PARTIAL — TLS session prevents network-level replay, but application-level replay succeeds if token is reused.",
      withNonceHMAC: "SUCCESSFULLY BLOCKED — Redis nonce cache detects duplicate UUID on attempt #2; instantly rejected in 0.8ms!"
    },
    tamper_sim: {
      name: "In-Flight Data Modification Simulation",
      attackAction: "Adversary rewrites beneficiary account from 'Susmita' to 'Attacker_Mule' and recalculates TCP checksums.",
      withNoDefense: "FAILED — Plaintext packet accepted; funds routed to attacker's bank account!",
      withTLS13: "SUCCESSFULLY BLOCKED — TLS 1.3 Poly1305 MAC tag verification fails; socket instantly terminated with DecryptionError.",
      withNonceHMAC: "SUCCESSFULLY BLOCKED — HMAC-SHA256 signature verification fails; packet discarded with tampering alarm dispatched."
    },
    sniff_sim: {
      name: "Promiscuous Packet Sniffing Simulation",
      attackAction: "Adversary runs tcpdump on unencrypted subnet to capture banking login credentials.",
      withNoDefense: "FAILED — Username 'Mamata_Admin' and Password 'Secret#2026' displayed in cleartext ASCII hex dump!",
      withTLS13: "SUCCESSFULLY BLOCKED — Sniffer captures only high-entropy pseudorandom ciphertext bytes (AES-GCM); 0 bytes leaked.",
      withNonceHMAC: "PROTECTED CONFIDENTIALITY — Encrypted payload prevents cleartext extraction; HMAC guarantees integrity."
    },
    syn_flood_sim: {
      name: "TCP SYN Flood Exhaustion Simulation",
      attackAction: "Botnet blasts 2,000,000 SYN packets/sec with randomized spoofed source IPs to knock server offline.",
      withNoDefense: "FAILED — Kernel backlog full; TCB table exhausted in 3 seconds; 504 Gateway Timeout for legitimate users!",
      withTLS13: "PARTIAL — TLS doesn't stop L4 connection exhaustion without kernel SYN cookie activation.",
      withNonceHMAC: "SUCCESSFULLY MITIGATED — Stateless SYN Cookies (RFC 4987) encode connection state; zero memory allocated until ACK."
    }
  };

  const activeAttackTestDetails = attackSimulations[selectedAttackTest];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_upi_replay",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Neutralizing ₹4.8 Crore Replay Attack on Payment Switch",
      threatType: "ACTIVE ATTACK (Cryptographic Replay & In-Flight Injection)",
      budget: "₹32,50,000",
      incident:
        "A rogue node within an unsegmented microservices VPC intercepted valid encrypted UPI payment dispatch tokens and attempted to re-broadcast 480 transactions for ₹1,00,000 each.",
      defenseStrategy:
        "Mamata implemented a Redis-backed Distributed Nonce Cache paired with Monotonic Epoch Sequence Numbers and AES-256-GCM authenticated payload tags. Any token presented with a duplicate nonce or timestamp drift > 500ms is dropped and forwarded to the SOC.",
      outcome: "100% of replayed packets rejected instantly; zero fraudulent rupees dispatched.",
      metrics: {
        replayedPacketsBlocked: "480 Malicious Requests",
        financialLossAverted: "₹4,80,00,000",
        verificationLatency: "1.2 ms per transaction",
        statutoryCompliance: "RBI Cyber Master Direction Section 4.2"
      }
    },
    {
      id: "barrackpore_grid_passive",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "PASSIVE ATTACK (Optical Macrobending Wiretap)",
      title: "Discovering Physical Fiber Tap on SCADA Modbus Backhaul",
      budget: "₹18,00,000",
      incident:
        "During an OT infrastructure audit, an anomaly in light signal attenuation (-0.35 dB) revealed a physical macrobending coupler attached to the unencrypted substation telemetry fiber.",
      defenseStrategy:
        "Debangshu deployed Optical Time-Domain Reflectometers (OTDR) for real-time link monitoring and converted all inter-substation Modbus TCP telemetry into IPsec Tunnel Mode with ESP (Encapsulating Security Payload) and constant Traffic Padding.",
      outcome: "Eliminated optical signal snooping; adversary traffic analysis rendered obsolete.",
      metrics: {
        opticalLossMonitored: "Real-time OTDR (<0.05 dB)",
        scadaTrafficEncrypted: "100% IPsec ESP",
        paddingOverhead: "Constant 10 Mbps Bus",
        statutoryCompliance: "NCIIPC Critical Infrastructure Guidelines (IT Act Sec 70)"
      }
    },
    {
      id: "ichapur_hospital_mitm",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "ACTIVE ATTACK (SSL Stripping & Masquerade)",
      title: "Thwarting Rogue Wi-Fi MitM on Patient Biopsy Feeds",
      budget: "₹9,50,000",
      incident:
        "An attacker set up a rogue access point ('Hospital_Guest_Free') attempting SSL Strip attacks to downgrade clinical diagnostic imaging transfers from HTTPS to plain HTTP.",
      defenseStrategy:
        "Mahima enforced enterprise-wide HTTP Strict Transport Security (HSTS) with preloaded domain lists, deployed 802.1X WPA3-Enterprise authentication, and mandated Mutual TLS (mTLS) client certificates on all medical tablets.",
      outcome: "Rogue Wi-Fi downgrade completely failed; all biopsy transfer records shielded.",
      metrics: {
        patientRecordsProtected: "85,000 Biopsy Reports",
        hstsEnforcement: "100% Browser Preload",
        penaltyPrevented: "₹250 Crore DPDP Act Section 33 Fine",
        statutoryCompliance: "DPDP Act 2023 Section 8(5)"
      }
    },
    {
      id: "jadavpur_lab_arpspoof",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University High-Performance Computing Lab",
      threatType: "HYBRID ATTACK (Passive Sniffing via Active ARP Poisoning)",
      title: "Detecting & Mitigating Layer 2 ARP Spoofing Infiltration",
      budget: "₹6,00,000",
      incident:
        "A compromised testing node emitted 10,000 gratuitous ARP replies per minute, poisoning switch caches to redirect subnet research data through an unauthorized sniffing laptop.",
      defenseStrategy:
        "Susmita and Abhronila configured Dynamic ARP Inspection (DAI), DHCP Snooping with IP-MAC-Port binding tables, and Port Security limiting MAC addresses to 1 per physical switch port.",
      outcome: "Compromised port automatically shut down within 200 milliseconds.",
      metrics: {
        arpPoisonPacketsDropped: "100% via DAI",
        portShutdownTime: "180 milliseconds",
        credentialsShielded: "450 Academic SSO Logins",
        statutoryCompliance: "ISO/IEC 27001:2022 Control A.8.20"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-indigo-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 00
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Classification of Cyber Attacks: Active vs. Passive
            </h1>
            <p className="text-xs text-gray-400">
              State-machine theory, OSI layer mapping, packet-level exploitation mechanics, and defense engineering.
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

        {/* SECTION 1: Theoretical Epistemology & State-Machine Axioms */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Module 4 · Foundational Axioms
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Theoretical &amp; Mathematical Distinction: Active vs. Passive
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Under RFC 4949 (Internet Security Glossary) and ISO 7498-2 (Security Architecture), cyber attacks are 
              classified based on their formal interaction with the target system state machine.
            </p>
          </div>

          {/* Mathematical State Machine Box */}
          <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Mathematical State-Machine Model of Cyber Attacks
            </h3>
            <p className="text-xs text-gray-300">
              Let an information system state be defined as a tuple <span className="font-mono text-cyan-300">S = (D, C, R)</span>, 
              where <span className="font-mono text-cyan-300">D</span> represents stored data &amp; in-transit messages, 
              <span className="font-mono text-cyan-300"> C</span> represents system security configurations, and 
              <span className="font-mono text-cyan-300"> R</span> represents computational resources (CPU, RAM, bandwidth).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-950 p-4 rounded-lg border border-cyan-900/60 space-y-2">
                <span className="text-cyan-400 font-bold block">PASSIVE ATTACK FORMULA:</span>
                <p className="text-gray-300">
                  State Delta: <span className="text-emerald-400 font-bold">ΔS = ∅</span> (Zero State Change)<br />
                  Information Leak: <span className="text-rose-400 font-bold">I_leak(D) &gt; 0</span><br />
                  Resource Impact: <span className="text-cyan-400 font-bold">ΔR = 0</span> (No latency change)
                </p>
                <p className="text-[11px] font-sans text-gray-400 mt-1">
                  The attacker learns message contents or traffic metadata while the target system operates normally with zero log triggers.
                </p>
              </div>
              <div className="bg-gray-950 p-4 rounded-lg border border-rose-900/60 space-y-2">
                <span className="text-rose-400 font-bold block">ACTIVE ATTACK FORMULA:</span>
                <p className="text-gray-300">
                  State Delta: <span className="text-rose-400 font-bold">ΔS ≠ ∅</span> (State Corrupted)<br />
                  Data / Config: <span className="text-amber-400 font-bold">D' ≠ D ∨ C' ≠ C</span><br />
                  Resource Impact: <span className="text-rose-400 font-bold">R → ∅</span> (In Denial of Service)
                </p>
                <p className="text-[11px] font-sans text-gray-400 mt-1">
                  The attacker alters in-flight packets, impersonates identities, or exhausts system resources, producing measurable system state disruption.
                </p>
              </div>
            </div>
          </div>

          {/* Deep Comparative Analysis Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 text-gray-300 border-b border-gray-800">
                  <th className="p-3.5 font-bold uppercase">Attribute / Dimension</th>
                  <th className="p-3.5 font-bold uppercase text-cyan-400">Passive Cyber Attacks</th>
                  <th className="p-3.5 font-bold uppercase text-rose-400">Active Cyber Attacks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80 text-gray-300">
                <tr className="hover:bg-gray-900/50">
                  <td className="p-3.5 font-bold text-white">Primary Goal</td>
                  <td className="p-3.5">Unauthorized information acquisition &amp; intelligence reconnaissance.</td>
                  <td className="p-3.5">Unauthorized data modification, masquerade, service disruption, or fraud.</td>
                </tr>
                <tr className="hover:bg-gray-900/50">
                  <td className="p-3.5 font-bold text-white">CIA Triad Impact</td>
                  <td className="p-3.5 text-cyan-300">Violates <strong>Confidentiality</strong> (Pillar C).</td>
                  <td className="p-3.5 text-rose-300">Violates <strong>Integrity</strong> and <strong>Availability</strong> (Pillars I &amp; A).</td>
                </tr>
                <tr className="hover:bg-gray-900/50">
                  <td className="p-3.5 font-bold text-white">Modification of System State</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">NO (0% modification to data, packets, or memory).</td>
                  <td className="p-3.5 text-rose-400 font-semibold">YES (Data altered, injected, deleted, or replayed).</td>
                </tr>
                <tr className="hover:bg-gray-900/50">
                  <td className="p-3.5 font-bold text-white">Detectability in Real-Time</td>
                  <td className="p-3.5 text-rose-400">VIRTUALLY IMPOSSIBLE (Produces 0 log traces or bandwidth alarms).</td>
                  <td className="p-3.5 text-emerald-400">HIGHLY DETECTABLE (SIEM, IDS/IPS, and hash verification alert instantly).</td>
                </tr>
                <tr className="hover:bg-gray-900/50">
                  <td className="p-3.5 font-bold text-white">Core Defense Strategy</td>
                  <td className="p-3.5 text-indigo-300"><strong>PREVENTION 100%</strong> (End-to-End Encryption, Traffic Padding).</td>
                  <td className="p-3.5 text-indigo-300"><strong>DETECTION + PREVENTION</strong> (WAF, mTLS, Nonces, Rate Limiting).</td>
                </tr>
                <tr className="hover:bg-gray-900/50">
                  <td className="p-3.5 font-bold text-white">Primary Exemplars</td>
                  <td className="p-3.5">Eavesdropping, Optical Macrobending, Traffic Analysis, Side-Channel timing leaks.</td>
                  <td className="p-3.5">Message Modification, Masquerade / Spoofing, Replay Attacks, SYN Flood DoS.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: Comprehensive OSI 7-Layer Attack & Defense Distribution Matrix */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Protocol Stack Mapping
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. OSI 7-Layer Attack &amp; Defensive Architecture Matrix
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Every layer of the Open Systems Interconnection (OSI) reference model hosts specific passive eavesdropping 
              vectors and active disruption mechanisms. Select a layer to explore its specific threat landscape:
            </p>
          </div>

          {/* OSI Layer Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[7, 6, 4, 3, 2, 1].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveOsiLayer(lvl)}
                className={clsx(
                  "p-3 rounded-xl border text-center transition-all duration-300 text-xs font-bold",
                  activeOsiLayer === lvl
                    ? "bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              &gt;
                Layer {lvl}
                <span className="block text-[10px] font-normal text-gray-400 mt-0.5">
                  {lvl === 7 ? "Application" : lvl === 6 ? "Pres / Sess" : lvl === 4 ? "Transport" : lvl === 3 ? "Network" : lvl === 2 ? "Data Link" : "Physical"}
                </span>
              </button>
            ))}
          </div>

          {/* Active OSI Layer Content */}
          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white">{osiLayerData[activeOsiLayer]?.layer}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                OSI L{activeOsiLayer}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-cyan-900/40 space-y-2">
                <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                  Passive Threat Vectors (L{activeOsiLayer})
                </span>
                <p className="text-gray-300 leading-relaxed">{osiLayerData[activeOsiLayer]?.passiveAttacks}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-rose-900/40 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                  Active Threat Vectors (L{activeOsiLayer})
                </span>
                <p className="text-gray-300 leading-relaxed">{osiLayerData[activeOsiLayer]?.activeAttacks}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-emerald-900/40 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                  Architectural Defenses (L{activeOsiLayer})
                </span>
                <p className="text-gray-300 leading-relaxed font-semibold">{osiLayerData[activeOsiLayer]?.defenses}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic Animated SVG Architectural Diagram */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Architectural Transmission Flow
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Visualizing Network Transmission Paths: Passive vs. Active
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how a passive eavesdropper silently copies packets in parallel without breaking the wire, while an 
              active adversary positions in-line to intercept, tamper, replay, or drop live network packets.
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[700px]"
              viewBox="0 0 880 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`${svgFlowId}-gradSender`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id={`${svgFlowId}-gradPassive`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id={`${svgFlowId}-gradActive`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
                <linearGradient id={`${svgFlowId}-gradReceiver`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>

              {/* Background Grid Lines */}
              <line x1="40" y1="80" x2="840" y2="80" stroke="#1f2937" strokeDasharray="4 4" />
              <line x1="40" y1="200" x2="840" y2="200" stroke="#1f2937" strokeDasharray="4 4" />
              <line x1="40" y1="320" x2="840" y2="320" stroke="#1f2937" strokeDasharray="4 4" />

              {/* NODE 1: Sender (Mamata) */}
              <g className="transition-transform duration-300 hover:scale-105" transform="translate(40, 140)">
                <rect width="160" height="90" rx="12" fill={`url(#${svgFlowId}-gradSender)`} stroke="#60a5fa" strokeWidth="2" />
                <text x="80" y="32" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
                  SENDER (Mamata)
                </text>
                <text x="80" y="52" fill="#bfdbfe" fontSize="11" textAnchor="middle">
                  Kolkata FinTech Node
                </text>
                <text x="80" y="70" fill="#93c5fd" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Payload: ₹5,000 Transfer
                </text>
              </g>

              {/* PATH A: Direct Top Flow - Passive Eavesdropping */}
              <path
                d="M 200 160 C 280 80, 600 80, 680 160"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="6 6"
                fill="none"
              />
              <circle r="5" fill="#38bdf8">
                <animateMotion path="M 200 160 C 280 80, 600 80, 680 160" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* PASSIVE SNIFFER NODE */}
              <g className="transition-transform duration-300 hover:scale-105" transform="translate(360, 30)">
                <rect width="180" height="85" rx="10" fill={`url(#${svgFlowId}-gradPassive)`} stroke="#67e8f9" strokeWidth="1.5" />
                <text x="90" y="24" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  PASSIVE SNIFFER
                </text>
                <text x="90" y="42" fill="#cffafe" fontSize="10" textAnchor="middle">
                  Eavesdropper / Wireshark
                </text>
                <text x="90" y="60" fill="#e0f2fe" fontSize="9.5" textAnchor="middle">
                  Reads Stream (0% Tampering)
                </text>
                <text x="90" y="75" fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Confidentiality Breached!
                </text>
              </g>

              {/* PATH B: In-Line Middle Flow - Active Man-in-the-Middle */}
              <path d="M 200 190 L 360 230" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <path d="M 540 230 L 680 190" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <circle r="6" fill="#f43f5e">
                <animateMotion path="M 200 190 L 360 230" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle r="6" fill="#fb7185">
                <animateMotion path="M 540 230 L 680 190" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* ACTIVE ATTACKER NODE */}
              <g className="transition-transform duration-300 hover:scale-105" transform="translate(360, 190)">
                <rect width="180" height="100" rx="10" fill={`url(#${svgFlowId}-gradActive)`} stroke="#fda4af" strokeWidth="2" />
                <text x="90" y="24" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ACTIVE MITM PROXY
                </text>
                <text x="90" y="42" fill="#ffe4e6" fontSize="10" textAnchor="middle">
                  Interception &amp; Tampering
                </text>
                <text x="90" y="62" fill="#ffffff" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                  Rewrites: ₹5,000 ➔ ₹50,000
                </text>
                <text x="90" y="80" fill="#fecdd3" fontSize="9" textAnchor="middle">
                  Injects Replay / Drops SYN
                </text>
                <text x="90" y="93" fill="#fef08a" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Integrity &amp; Availability Broken!
                </text>
              </g>

              {/* NODE 2: Receiver (Debangshu) */}
              <g className="transition-transform duration-300 hover:scale-105" transform="translate(680, 140)">
                <rect width="160" height="90" rx="12" fill={`url(#${svgFlowId}-gradReceiver)`} stroke="#34d399" strokeWidth="2" />
                <text x="80" y="32" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
                  RECEIVER (Debangshu)
                </text>
                <text x="80" y="52" fill="#d1fae5" fontSize="11" textAnchor="middle">
                  Barrackpore Node
                </text>
                <text x="80" y="70" fill="#a7f3d0" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Verifies Cryptographic MAC
                </text>
              </g>

              {/* Bottom Legend */}
              <g transform="translate(160, 335)">
                <circle cx="20" cy="15" r="5" fill="#38bdf8" />
                <text x="35" y="19" fill="#9ca3af" fontSize="11">
                  Passive Path: Packet cloned in flight; original reaches destination undisturbed.
                </text>
                <circle cx="480" cy="15" r="5" fill="#f43f5e" />
                <text x="495" y="19" fill="#9ca3af" fontSize="11">
                  Active Path: Packet intercepted, modified, replayed, or blocked in-line.
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 4: Studio 1 - Detailed 8-Vector Threat Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Threat Vector Inspector &amp; Packet Dissector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an attack vector below to inspect its operational mechanics, OSI layer location, live packet 
              hex dump, and production mitigation code:
            </p>
          </div>

          {/* Threat Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(threatDatabase).map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedThreatKey(t.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedThreatKey === t.key
                    ? "bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span
                  className={clsx(
                    "text-[8.5px] font-bold px-1.5 py-0.5 rounded border self-start",
                    t.category.startsWith("PASSIVE")
                      ? "bg-cyan-950 text-cyan-300 border-cyan-800"
                      : "bg-rose-950 text-rose-300 border-rose-800"
                  )}
                >
                  {t.category.startsWith("PASSIVE") ? "PASSIVE" : "ACTIVE"}
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{t.name}</span>
              </button>
            ))}
          </div>

          {/* Active Threat Detail Panel */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeThreat.categoryBadge)}>
                    {activeThreat.category}
                  </span>
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeThreat.ciaBadge)}>
                    Target: {activeThreat.ciaTarget}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeThreat.osiLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeThreat.name}</h3>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Detectability Score</span>
                <span
                  className={clsx(
                    "text-sm font-extrabold",
                    activeThreat.detectabilityScore > 70
                      ? "text-emerald-400"
                      : activeThreat.detectabilityScore &gt; 30
                      ? "text-amber-400"
                      : "text-rose-400"
                  )}
                >
                  {activeThreat.detectabilityScore}/100{" "}
                  <span className="text-xs font-normal text-gray-400">
                    ({activeThreat.detectabilityScore < 20 ? "Stealthy" : "Loud/Observable"})
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Mechanism &amp; Execution
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.mechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Attack Vector Scapy / Command Simulation
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-rose-200 overflow-x-auto whitespace-pre-wrap border border-rose-950/50">
                    {activeThreat.attackVectorCode}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Captured Packet / In-Flight Payload Trace
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-amber-200 overflow-x-auto whitespace-pre-wrap border border-amber-950/50">
                    {activeThreat.realWorldPayload}
                  </pre>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Production Mitigation Code &amp; Config
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-emerald-200 overflow-x-auto whitespace-pre-wrap border border-emerald-950/50">
                    {activeThreat.countermeasureCode}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 2 - Live Attack vs. Defense Protocol Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Live Attack vs. Defense Protocol Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an attack simulation scenario to see how legacy plaintext architectures crumble compared to 
              modern authenticated AEAD, anti-replay nonces, and stateless SYN cookie defenses:
            </p>
          </div>

          {/* Attack Test Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(attackSimulations).map(([key, sim]) => (
              <button
                key={key}
                onClick={() => setSelectedAttackTest(key)}
                className={clsx(
                  "p-3.5 rounded-xl border text-left transition-all duration-300 space-y-1.5 text-xs",
                  selectedAttackTest === key
                    ? "bg-emerald-950/80 border-emerald-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              &gt;
                <span className="font-bold text-white block">{sim.name}</span>
                <span className="text-[10px] text-gray-400 line-clamp-1">{sim.attackAction}</span>
              </button>
            ))}
          </div>

          {/* Test Scenario Details */}
          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="border-b border-gray-800 pb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Simulated Attack Scenario
              </span>
              <p className="text-sm text-gray-200 font-semibold mt-1">{activeAttackTestDetails.attackAction}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Architecture 1 */}
              <div className="bg-gray-950 p-4 rounded-xl border border-rose-950 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Legacy Architecture (Plaintext / No Nonce)
                </span>
                <p className="text-gray-300 leading-relaxed font-mono pt-2">{activeAttackTestDetails.withNoDefense}</p>
              </div>

              {/* Architecture 2 */}
              <div className="bg-gray-950 p-4 rounded-xl border border-amber-950 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Standard TLS 1.3 Encryption Only
                </span>
                <p className="text-gray-300 leading-relaxed font-mono pt-2">{activeAttackTestDetails.withTLS13}</p>
              </div>

              {/* Architecture 3 */}
              <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950 space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Layered Defense (mTLS + Nonce Cache + SYN Cookies)
                </span>
                <p className="text-gray-300 leading-relaxed font-mono pt-2">{activeAttackTestDetails.withNonceHMAC}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Real-World Pedagogical Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. Regional Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how security architects Mamata, Debangshu, Mahima, and Susmita mitigate critical active and passive 
              threats in real-world West Bengal infrastructure.
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
              &gt;
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
                  The Incident &amp; Threat Vector
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
              Statutory &amp; Legal Frameworks
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Penalties Under Indian Cyber Law &amp; CERT-In Directives
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber jurisprudence establishes distinct statutory liabilities for unauthorized passive interception 
              versus destructive active cyber attacks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                Information Technology Act 2000
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil liability for unauthorized access or data extraction (Compensation up to ₹1 Crore).
                </li>
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking with fraudulent intent (Up to 3 years imprisonment + ₹5 Lakh fine).
                </li>
                <li>
                  <strong className="text-white">Section 66F:</strong> Cyber terrorism (attacks on critical infrastructure) — <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                CERT-In Mandatory Directives
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Mandatory 6-Hour SLA:</strong> Indian organizations must report all active intrusions and ransomware attacks to CERT-In within 6 hours.
                </li>
                <li>
                  <strong className="text-white">180-Day Log Mandate:</strong> NTP-synchronized system and network audit logs must be securely archived on Indian servers for 180 days.
                </li>
                <li>
                  <strong className="text-white">VPN / Cloud Record Keeping:</strong> Subscriber registration logs maintained for 5 years.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; RBI Directions
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Act Section 8(5):</strong> Mandates reasonable technical security safeguards to prevent passive leaks and active breaches.
                </li>
                <li>
                  <strong className="text-white">DPDP Act Section 33:</strong> Statutory fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failure to protect personal data.
                </li>
                <li>
                  <strong className="text-white">RBI Master Directions:</strong> Mandates annual audits of commercial payment switches by CERT-In empaneled auditors.
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
                  <strong>Assuming Encryption Stops Replay:</strong> Encrypting a payload hides its content (Confidentiality) 
                  but does not stop an attacker from replaying valid ciphertext without nonces.
                </li>
                <li>
                  <strong>Confusing Traffic Analysis with Sniffing:</strong> Sniffing reads payloads; traffic analysis reads 
                  transmission metadata, timing bursts, and packet sizes even when encrypted.
                </li>
                <li>
                  <strong>Relying Solely on IDS for Passive Defense:</strong> Passive taps generate zero log alerts on 
                  standard routers; defense requires 100% encryption prevention.
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
                  <strong>Enforce AEAD Ciphers:</strong> Always use Authenticated Encryption (AES-GCM / ChaCha20-Poly1305) 
                  to protect both confidentiality and integrity simultaneously.
                </li>
                <li>
                  <strong>Deploy SYN Cookies:</strong> Enable <code className="text-indigo-300">tcp_syncookies=1</code> in 
                  production Linux kernels to defeat volumetric SYN floods without allocating backlog memory.
                </li>
                <li>
                  <strong>Strict Nonce Sliding Windows:</strong> Use UUID nonces cached in distributed memory (Redis) 
                  with a 500ms sliding TTL window to eliminate replay attacks.
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
                  If a thief stands outside your house measuring when your lights turn on and off, is that active or passive?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why do banks use OTPs that expire in 30 seconds rather than static passwords for UPI transfers?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In your mind, swap TCP SYN flood with an optical fiber tap—which one triggers an alert on your SIEM?
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Passive attacks violate Confidentiality; Active attacks violate Integrity &amp; Availability.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Passive attacks leave 0 digital footprints; defense must focus on Prevention.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Active attacks are detectable by IDS/SIEM; defense requires Detection + Prevention.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Encryption alone does NOT prevent Replay attacks—Nonces/Timestamps are required.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Traffic Padding masks transmission bursts against passive metadata analysis.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Indian IT Act Sec 66 penalizes active hacking; CERT-In mandates 6-hr incident reporting.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Classification of Cyber Attacks: Active vs Passive FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Technical Analysis"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Classification of Cyber Attacks: Active vs Passive (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Understanding the distinction between Active and Passive attacks is the cornerstone of threat modeling! Always remember: passive eavesdropping is stealthy and silent—you cannot rely on intrusion detection alarms to spot it; you MUST enforce robust end-to-end encryption (TLS 1.3/IPsec) proactively! For active attacks like Replay and Message Tampering, encryption alone is insufficient—always combine Authenticated Ciphers (AEAD) with Cryptographic Nonces and Sequence Counters. Adhere strictly to Indian cyber laws (IT Act Sec 43/66) and CERT-In 6-hour disclosure mandates!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
