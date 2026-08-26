import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgCookieId = useId();

  // Studio 1: Active Handshake Mechanism Selection
  const [selectedMechKey, setSelectedMechKey] = useState("handshake_memory_asymmetry");

  // Studio 2: Live RFC 4987 SYN Cookie ISN Calculator State
  const [clientIpInput, setClientIpInput] = useState("182.70.10.45");
  const [clientPortInput, setClientPortInput] = useState(54321);
  const [serverPortInput, setServerPortInput] = useState(443);
  const [mssIndex, setMssIndex] = useState(6); // Index 6 = 1460 (Standard MTU 1500)
  const [timeEpoch, setTimeEpoch] = useState(14); // 0 to 31 (5-bit counter)
  const [secretKey, setSecretKey] = useState("KolkataCore2026");

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_syncookie_defense");

  // Studio 4: SYN Cookie Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("kernel_c_syncookie_implementation");

  // Standard 8-value MSS lookup table (RFC 4987)
  const mssTable = [64, 256, 512, 536, 1024, 1440, 1460, 8960];

  // 8 Handshake & SYN Cookie Mechanism Profiles for Studio 1
  const mechanismDatabase = {
    handshake_memory_asymmetry: {
      key: "handshake_memory_asymmetry",
      name: "1. Three-Way Handshake Memory Allocation Asymmetry",
      category: "RFC 793 STRUCTURAL VULNERABILITY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetComponent: "Kernel SYN Backlog Queue & TCB Slab",
      exploitationVector:
        "The server commits ~480 bytes of non-pageable kernel RAM (Transmission Control Block) and transitions to `SYN_RECV` upon receiving Step 1 (SYN), while the client commits zero memory.",
      vulnerabilityImpact:
        "An attacker sending 50,000 SYN packets per second fills the server's SYN Backlog within milliseconds, locking out legitimate users while committing zero attacker resources.",
      telemetryIndicator: "Surge in embryonic connections in `SYN_RECV` state in `netstat` and connection drop alerts",
      resilientDefense: "Enabling Linux TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) to eliminate pre-handshake memory allocation.",
      codeSnippet: `// Handshake Asymmetry:
// Step 1: Client ➔ [SYN (Seq=x)] ➔ Server allocates 480B TCB in memory!
// Step 2: Server ➔ [SYN-ACK (Seq=y, Ack=x+1)] ➔ Client (Waits 75 seconds!)
// Step 3: Client NEVER sends ACK ➔ RAM exhausted by half-open sessions!`
    },
    isn_bitfield_decomposition: {
      key: "isn_bitfield_decomposition",
      name: "2. RFC 4987 32-Bit ISN Cryptographic Encoding",
      category: "STATELESS ISN SYNTHESIS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetComponent: "32-Bit Initial Sequence Number (ISN)",
      exploitationVector:
        "Instead of storing state in RAM, the server encodes connection parameters into the 32-bit ISN: 5 bits timestamp, 3 bits MSS index, and 24 bits HMAC cryptographic hash.",
      vulnerabilityImpact:
        "Completely eliminates half-open socket memory allocation ($M = 0$ bytes), making memory exhaustion mathematically impossible.",
      telemetryIndicator: "Cryptographically uniform ISN sequence distribution with zero growth in kernel socket memory",
      resilientDefense: "RFC 4987 standard implementation with 24-bit HMAC-SHA1 cryptographic signature hashing.",
      codeSnippet: `// RFC 4987 ISN Bitfield Breakdown:
// Bits 31-27 (5 Bits) : Timestamp 't' mod 32 (advances every 64s)
// Bits 26-24 (3 Bits) : MSS Table Index 'm' (0 to 7)
// Bits 23-0  (24 Bits): HMAC-SHA1(4-Tuple || t || SecretKey) mod 2^24`
    },
    reconstructive_verification: {
      key: "reconstructive_verification",
      name: "3. Server-Side Reconstructive Verification on Final ACK",
      category: "STATELESS RECONSTRUCTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetComponent: "Step 3 Final ACK Ingress Pipeline",
      exploitationVector:
        "Upon receiving the final ACK (`Ack = ISN + 1`), the server extracts $t$ and $m$, verifies the HMAC hash, and constructs the TCP socket only upon successful cryptographic match.",
      vulnerabilityImpact:
        "Guarantees that socket memory is allocated ONLY for authentic clients that have proven their bidirectional reachability.",
      telemetryIndicator: "Zero embryonic sessions in memory; connections transition directly from unallocated to `ESTABLISHED`",
      resilientDefense: "Hardware and kernel cryptographic verification routines operating in under 5 microseconds.",
      codeSnippet: `// Verification Logic:
let isn = ack_pkt.tcp.ack_seq - 1;
let t = (isn &gt;> 27) & 0x1F;
let mss_idx = (isn >> 24) & 0x07;
if (compute_hmac24(4_tuple, t, key) === (isn & 0x00FFFFFF) && is_valid(t)) {
    allocate_socket(mss_table[mss_idx]); // AUTHENTICATED!
}`
    },
    mss_table_indexing: {
      key: "mss_table_indexing",
      name: "4. 3-Bit Maximum Segment Size (MSS) Table Indexing",
      category: "MTU CONSTRAINT RESOLUTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetComponent: "TCP MSS Option Field",
      exploitationVector:
        "Because arbitrary MSS values cannot be stored without RAM, RFC 4987 uses an 8-entry lookup table (`[64, 256, 512, 536, 1024, 1440, 1460, 8960]`), encoding the index in 3 bits.",
      vulnerabilityImpact:
        "Allows the server to preserve near-optimal MTU segment sizing without consuming a single byte of state memory.",
      telemetryIndicator: "Negotiated MSS values strictly mapped to one of the 8 standard RFC 4987 table constants",
      resilientDefense: "Picking the closest conservative MSS lower bound to avoid downstream IP fragmentation.",
      codeSnippet: `// 8-Value Standard MSS Table:
static const uint16_t msstab[8] = {
    64, 256, 512, 536, 1024, 1440, 1460, 8960
}; // 3-Bit Index encodes exact segment size!`
    },
    rfc7323_timestamp_extensions: {
      key: "rfc7323_timestamp_extensions",
      name: "5. RFC 7323 TCP Timestamp Window Scaling Preservation",
      category: "ADVANCED PROTOCOL PRESERVATION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetComponent: "TCP Timestamp Option (TSval)",
      exploitationVector:
        "Classic SYN cookies disabled Window Scaling and SACK; modern Linux kernels encode Window Scale (4 bits) and SACK (1 bit) into the TCP Timestamp TSval lower bits.",
      vulnerabilityImpact:
        "Restores full high-throughput TCP performance (Window Scaling & Selective ACK) during active SYN flood attacks.",
      telemetryIndicator: "TCP options containing active TSval stamps with encoded Window Scale multipliers",
      resilientDefense: "Enabling `net.ipv4.tcp_timestamps = 1` alongside `net.ipv4.tcp_syncookies = 1`.",
      codeSnippet: `# Linux Timestamps Hardening:
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -w net.ipv4.tcp_timestamps=1
# Window Scaling & SACK preserved under active SYN Floods!`
    },
    replay_defense_5bit_epoch: {
      key: "replay_defense_5bit_epoch",
      name: "6. 5-Bit Timestamp Replay Defense & Epoch Expiration",
      category: "CRYPTOGRAPHIC ANTI-REPLAY",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetComponent: "Top 5 Bits of ISN (Epoch Timer)",
      exploitationVector:
        "Divides time into 64-second epochs; a cookie expires after 2 epochs (128 seconds), preventing attackers from replaying captured valid ISNs to open unauthorized sessions.",
      vulnerabilityImpact:
        "Prevents replay attacks while allowing up to 128 seconds of network latency for legitimate clients to complete handshakes.",
      telemetryIndicator: "Immediate rejection of ACKs arriving with timestamp epochs older than 2 cycles",
      resilientDefense: "Automatic epoch incrementing and CSPRNG secret seed rotation every 10 minutes.",
      codeSnippet: `// 5-Bit Replay Defense:
// Epoch Duration = 64s | Valid Window = [t, t - 1] (Max 128s)
// If (Current_Epoch - Extracted_t) > 1 ➔ REPLAY DETECTED ➔ DROP!`
    },
    fpga_hardware_syn_proxy: {
      key: "fpga_hardware_syn_proxy",
      name: "7. Hardware FPGA / ASIC SYN Proxy Acceleration",
      category: "WIRE-SPEED HARDWARE VALIDATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetComponent: "FPGA Silicon Pipeline (F5 / A10)",
      exploitationVector:
        "Implements RFC 4987 HMAC hashing directly inside FPGA circuits, validating 50+ Million handshakes per second in hardware in under 5 microseconds.",
      vulnerabilityImpact:
        "Shields backend application servers from multi-gigabit SYN floods with zero CPU overhead.",
      telemetryIndicator: "Hardware-level SYN-ACK transmission with microsecond handshake completion latencies",
      resilientDefense: "Hardware Application Delivery Controllers (ADC) acting as transparent SYN proxies.",
      codeSnippet: `// FPGA Silicon Pipeline:
// Ingress SYN ➔ Hardware HMAC Hash Engine (4.2ns) ➔ SYN-ACK Cookie Outbound
// Legitimate ACK arrives ➔ Splices clean TCP session to Backend Server!`
    },
    csprng_isn_entropy: {
      key: "csprng_isn_entropy",
      name: "8. CSPRNG ISN Entropy & Blind Spoofing Defense",
      category: "CRYPTOGRAPHIC RANDOMNESS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetComponent: "Initial Sequence Number Generator",
      exploitationVector:
        "Because the lower 24 bits are generated by a cryptographic HMAC hash, blind attackers have only a 1 in 16,777,216 chance of guessing a valid ACK sequence number.",
      vulnerabilityImpact:
        "Makes blind connection hijacking and unauthorized socket establishment mathematically infeasible (99.9999% drop rate).",
      telemetryIndicator: "Uniform sequence entropy across all connection streams with zero predictable sequence patterns",
      resilientDefense: "RFC 6528 CSPRNG Half-SipHash sequence generation.",
      codeSnippet: `// Brute-Force Odds:
// 24-Bit HMAC Hash Space = 2^24 = 16,777,216 combinations
// Blind Guess Success Probability = 1 / 16,777,216 = 0.00000596%!
// Result: Mathematically immune to blind ACK spoofing!`
    }
  };

  const activeMech = mechanismDatabase[selectedMechKey];

  // Studio 2: Live RFC 4987 SYN Cookie ISN Cryptographic Calculations
  const synCookieCalc = useMemo(() => {
    // Generate a pseudo-HMAC 24-bit hash from parameters:
    const combinedString = `${clientIpInput}:${clientPortInput} &rarr; ${serverPortInput}:${timeEpoch}:${secretKey}`;
    let hashVal = 0;
    for (let i = 0; i < combinedString.length; i++) {
      hashVal = (hashVal * 31 + combinedString.charCodeAt(i)) & 0xFFFFFF; // 24-bit mask
    }

    const tBits = (timeEpoch & 0x1F) << 27;
    const mBits = (mssIndex & 0x07) << 24;
    const hBits = hashVal & 0x00FFFFFF;
    const fullIsn = (tBits | mBits | hBits) >&gt;> 0; // Unsigned 32-bit integer

    const isnHex = "0x" + fullIsn.toString(16).toUpperCase().padStart(8, "0");
    const ackExpectedHex = "0x" + ((fullIsn + 1) >>> 0).toString(16).toUpperCase().padStart(8, "0");

    const tBinary = (timeEpoch & 0x1F).toString(2).padStart(5, "0");
    const mBinary = (mssIndex & 0x07).toString(2).padStart(3, "0");
    const hBinary = (hashVal & 0x00FFFFFF).toString(2).padStart(24, "0");

    return {
      fullIsn,
      isnHex,
      ackExpectedHex,
      tBinary,
      mBinary,
      hBinary,
      hashVal: "0x" + hashVal.toString(16).toUpperCase().padStart(6, "0"),
      mssValue: mssTable[mssIndex],
      statusMessage: `CRYPTOGRAPHIC ISN SYNTHESIZED: 32-bit ISN ${isnHex} encodes 5-bit Timestamp epoch (${timeEpoch}), 3-bit MSS index (${mssIndex} ➔ ${mssTable[mssIndex]}B), and 24-bit HMAC signature (${("0x" + hashVal.toString(16).toUpperCase()).slice(0, 8)}) with ZERO kernel RAM allocated!`
    };
  }, [clientIpInput, clientPortInput, serverPortInput, mssIndex, timeEpoch, secretKey]);

  // Studio 4: SYN Cookie Production Code Database
  const codeDatabase = {
    kernel_c_syncookie_implementation: {
      name: "Linux Kernel C Source: cookie_v4_init_sequence & Verification (RFC 4987)",
      code: `// Linux Kernel Net IPv4 SYN Cookie Core Implementation (net/ipv4/syncookies.c)
#include <linux/tcp.h>
#include <linux/cryptohash.h>

// 1. Synthesize 32-bit ISN upon receiving TCP SYN (Allocates ZERO RAM!)
__u32 cookie_v4_init_sequence(const struct sk_buff *skb, __u16 *mssp) {
    const struct iphdr *iph = ip_hdr(skb);
    const struct tcphdr *th = tcp_hdr(skb);
    int mssind;
    const __u16 mss = *mssp;

    // Find closest lower standard MSS table index (0 to 7)
    for (mssind = 0; mssind < 7; mssind++)
        if (mss <= msstab[mssind]) break;
    *mssp = msstab[mssind];

    // Compute ISN: 5-bit timestamp | 3-bit MSS index | 24-bit HMAC hash
    return secure_tcp_syn_cookie(iph->saddr, iph &rarr; daddr,
                                th-&gt;source, th->dest,
                                tcp_cookie_time(), mssind);
}

// 2. Validate final ACK and reconstruct connection state
struct sock *cookie_v4_check(struct sock *sk, struct sk_buff *skb) {
    struct tcphdr *th = tcp_hdr(skb);
    __u32 cookie = ntohl(th->ack_seq) - 1;
    int mssind;

    // Verify cryptographic HMAC and timestamp window (|t - t_now| &le; 1)
    mssind = check_tcp_syn_cookie(cookie, ip_hdr(skb)->saddr, ip_hdr(skb) &rarr; daddr,
                                th->source, th->dest);
    if (mssind < 0) return NULL; // Forged or expired cookie ➔ REJECT!

    // ONLY UPON SUCCESS: Allocate real TCP socket in kernel RAM!
    return tcp_create_openreq_child(sk, req, skb);
}`,
      explanation: "Official Linux kernel C implementation of RFC 4987 SYN cookies in net/ipv4/syncookies.c, showing ISN synthesis with zero memory allocation and socket creation on ACK validation."
    },
    python_syncookie_simulator: {
      name: "Python Cryptographic Engine for RFC 4987 SYN Cookie Generation & Verification",
      code: `import hmac
import hashlib
import struct
import time

MSS_TABLE = [64, 256, 512, 536, 1024, 1440, 1460, 8960]

class SynCookieEngine:
    def __init__(self, secret_key=b"KolkataFinTechCore2026"):
        self.secret_key = secret_key

    def generate_cookie(self, src_ip, src_port, dst_ip, dst_port, mss):
        # 1. 5-bit Timestamp epoch (advances every 64s)
        t = int(time.time() // 64) & 0x1F
        
        # 2. 3-bit MSS Index
        mss_idx = 6 # Default 1460
        for i, val in enumerate(MSS_TABLE):
            if mss <= val:
                mss_idx = i
                break
                
        # 3. 24-bit HMAC-SHA1 Hash
        data = f"{src_ip}:{src_port}->{dst_ip}:{dst_port}:{t}".encode()
        h = hmac.new(self.secret_key, data, hashlib.sha1).digest()
        hash24 = struct.unpack("&gt;I", b"\\x00" + h[:3])[0] & 0x00FFFFFF
        
        # 4. Synthesize 32-bit ISN
        isn = (t << 27) | (mss_idx << 24) | hash24
        print(f"[+] Synthesized SYN Cookie ISN: 0x{isn:08X} (Zero RAM Allocated!)")
        return isn

    def verify_cookie(self, src_ip, src_port, dst_ip, dst_port, ack_seq):
        isn = (ack_seq - 1) & 0xFFFFFFFF
        t = (isn >&gt; 27) & 0x1F
        mss_idx = (isn >> 24) & 0x07
        received_hash = isn & 0x00FFFFFF
        
        # Verify hash
        data = f"{src_ip}:{src_port} &rarr; {dst_ip}:{dst_port}:{t}".encode()
        expected_h = hmac.new(self.secret_key, data, hashlib.sha1).digest()
        expected_hash = struct.unpack(">I", b"\\x00" + expected_h[:3])[0] & 0x00FFFFFF
        
        if received_hash == expected_hash:
            print(f"[+] VALID SYN COOKIE! Reconstructed TCP MSS = {MSS_TABLE[mss_idx]}B")
            return True
        print("[-] INVALID SYN COOKIE: Hash mismatch!")
        return False

engine = SynCookieEngine()
isn = engine.generate_cookie("182.70.10.45", 54321, "103.25.10.50", 443, 1460)
engine.verify_cookie("182.70.10.45", 54321, "103.25.10.50", 443, isn + 1)`,
      explanation: "Complete Python implementation of the RFC 4987 SYN cookie algorithm demonstrating 32-bit ISN bitfield assembly, HMAC calculation, and socket reconstruction on final ACK."
    },
    kernel_sysctl_syncookie_conf: {
      name: "Linux sysctl.conf & Queue Tuning for Production SYN Cookie Deployment",
      code: `# Complete Production Linux sysctl.conf Configuration for SYN Flood Immunity:

# 1. Enable TCP SYN Cookies (RFC 4987)
net.ipv4.tcp_syncookies = 1

# 2. Enable TCP Timestamps (RFC 7323) - Preserves Window Scaling & SACK permissions!
net.ipv4.tcp_timestamps = 1
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_sack = 1

# 3. Scale SYN Backlog Queue (Half-Open Sockets)
net.ipv4.tcp_max_syn_backlog = 8192

# 4. Scale Application Accept Queue (Completed Handshakes)
net.core.somaxconn = 65535

# 5. Fast Termination of Non-Responsive Embryonic Connections (~7s timeout)
net.ipv4.tcp_synack_retries = 2

# Apply immediately:
# sysctl -p /etc/sysctl.conf`,
      explanation: "Production Linux sysctl configuration enabling TCP SYN cookies with timestamps to preserve Window Scaling and SACK, scaling backlog queues to 8,192, and reducing embryonic timeouts to 7 seconds."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_syncookie_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Absorbing 50 Million PPS SYN Floods via RFC 4987 SYN Cookies",
      threatType: "PROTOCOL SYN FLOOD (50 Million PPS / Half-Open Queue Saturation)",
      budget: "₹68,00,000",
      incident:
        "Adversaries launched a 50 Mpps spoofed TCP SYN flood targeting the payment settlement gateway, attempting to exhaust the Linux kernel SYN backlog queue.",
      defenseStrategy:
        "Mamata configured RFC 4987 TCP SYN Cookies (`tcp_syncookies = 1`) with RFC 7323 Timestamps, eliminating pre-handshake RAM allocation.",
      outcome: "100% of half-open SYN packets handled with zero memory allocation; 0% transaction latency; 45 core banking switches secured.",
      metrics: {
        synPacketsAbsorbed: "50,000,000 PPS",
        ramAllocatedForSyn: "0 Bytes (Stateless)",
        switchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_timestamp_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "TCP SYN FLOOD & INDUSTRIAL SCADA TELEMETRY TIMEOUT",
      title: "Preserving Industrial Modbus TCP SACK & Window Scaling under Flood",
      budget: "₹42,00,000",
      incident:
        "A botnet flooded SCADA boundary RTU controllers with 30 Mpps SYN packets, attempting to force controllers into classic SYN cookie mode where Window Scaling was disabled.",
      defenseStrategy:
        "Debangshu enabled modern RFC 7323 Timestamp-extended SYN cookies, preserving Window Scaling and Selective ACK across high-voltage substation telemetry links.",
      outcome: "Telemetry throughput maintained at full 1 Gbps capacity; zero packet re-transmission storms; power grid frequency stabilized.",
      metrics: {
        telemetryThroughput: "1.0 Gbps (100% SACK)",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_registry_defense",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "EMBRYONIC CONNECTION QUEUE SATURATION (Database Port 3306 Flood)",
      title: "Protecting Cancer Registry Database Servers from SYN Floods",
      budget: "₹31,00,000",
      incident:
        "During statutory monthly cancer registry reporting, an attacker flooded database port 3306 with 25 Mpps SYN packets, exhausting the database host backlog queue.",
      defenseStrategy:
        "Mahima tuned `tcp_max_syn_backlog = 8192`, enabled SYN cookies, and configured `tcp_synack_retries = 2` to drop dead sessions in 7 seconds.",
      outcome: "Database connection queue remained clear; all oncology reporting completed on schedule; 120,000 patient records protected.",
      metrics: {
        queueHoldTimeDrop: "75s ➔ 7s",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_syncookie_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL FORMULATION OF CRYPTOGRAPHIC ISN SYNTHESIS",
      title: "Formulating the Cryptographic ISN HMAC & Backlog Resilience Model",
      budget: "₹26,00,000",
      incident:
        "Researchers modeled the cryptographic collision resistance and Shannon entropy of 24-bit HMAC signatures across 100 Million simulated connection trials.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that 24-bit HMAC signatures provide a 1 in 16.7 million (1 : 1.67 × 10^7) brute-force defense.",
      outcome: "Published peer-reviewed mathematical proof; verified across 100 Million simulated handshake trials.",
      metrics: {
        simulationTrials: "100 Million Handshakes",
        bruteForceResistance: "1 in 16,777,216 Odds",
        modelFramework: "RFC 4987 ISN Cryptographic Model",
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
                Topic 04
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              TCP Three-Way Handshake Exploitation and SYN Cookies
            </h1>
            <p className="text-xs text-gray-400">
              RFC 793 handshake asymmetry, RFC 4987 32-bit ISN encoding, RFC 7323 Timestamps, FPGA SYN proxies, and IT Act Section 66F.
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
              Handshake Asymmetry &amp; Cryptographic Defense
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of TCP Handshake Exploitation: Breaking the Memory Allocation Bottleneck
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Under standard <strong>RFC 793 TCP</strong>, connection establishment follows the three-way handshake: 
              <strong>Client SYN ➔ Server SYN-ACK ➔ Client ACK</strong>. This introduces a severe structural vulnerability: 
              upon receiving Step 1 (SYN), the server commits ~480 bytes of non-pageable kernel RAM (Transmission Control Block - TCB) 
              in its half-open <strong>SYN Backlog queue</strong>, while the client commits zero memory. When attackers flood millions of spoofed SYNs, 
              the server runs out of memory and drops all legitimate connections. The cryptographic invention of 
              <strong>TCP SYN Cookies (RFC 4987 by D. J. Bernstein)</strong> eliminates memory allocation completely by encoding the connection state 
              directly into the 32-bit <strong>Initial Sequence Number (ISN)</strong> using cryptographic HMAC hashes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RFC 4987 ISN Bitfield Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                RFC 4987 32-Bit ISN Cryptographic Encoding
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                ISN = [5b Timestamp t] + [3b MSS Index m] + [24b HMAC-SHA1 Signature]
              </div>
              <p className="text-gray-300 leading-relaxed">
                When a SYN arrives, the server allocates ZERO memory in RAM. It returns the cryptographic ISN in the SYN-ACK. 
                When the client returns the final ACK ($ISN + 1$), the server validates the signature and reconstructs the socket.
              </p>
            </div>

            {/* RFC 7323 Timestamps & Hardware Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                RFC 7323 Timestamps &amp; Hardware SYN Proxies
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">TCP Timestamps (RFC 7323):</strong> Encodes Window Scale &amp; SACK into TSval lower bits.</li>
                <li>• <strong className="text-purple-300">Hardware FPGA SYN Proxies:</strong> Computes ISNs in hardware at 50+ Mpps wire speed.</li>
                <li>• <strong className="text-amber-300">SYN-ACK Retry Tuning:</strong> `tcp_synack_retries = 2` drops dead sessions in 7 seconds.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Handshake & SYN Cookie Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              SYN Cookie Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing RFC 4987 ISN Cryptographic Synthesis &amp; Socket Reconstruction
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an incoming TCP SYN triggers stateless ISN cryptographic generation, 
              bypassing kernel RAM allocation until the client returns a verified final ACK:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INCOMING SYN PACKET */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. STEP 1: SYN
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Client Handshake Init
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SYN PAYLOAD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SrcIP + SrcPort + DstPort
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Proposed MSS (1460B)
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: RFC 4987 CRYPTOGRAPHIC ISN ENGINE */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. ISN ENCODER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  RFC 4987 Stateless Hash
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  32-BIT ISN SYNTHESIS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  5b Timestamp + 3b MSS
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  24b HMAC-SHA1 Hash!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: OUTBOUND SYN-ACK (ZERO RAM ALLOCATION) */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. STEP 2: SYN-ACK
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  0 Bytes RAM Committed
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  STATELESS RESPONSE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Seq = Encoded ISN
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Backlog Memory = 0 Bytes!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: CLIENT ACK INGRESS & VERIFICATION */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. STEP 3: FINAL ACK
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Signature Validation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  HMAC VERIFICATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  ISN = Ack - 1
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  HMAC Matches ➔ VALID!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: TCP SOCKET RECONSTRUCTION */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. ESTABLISHED
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Socket Allocated in RAM
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CLEAN SESSION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  MSS = 1460 Bytes
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Availability!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Mechanism Handshake Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Handshake &amp; SYN Cookie Mechanism Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a handshake mechanism below to examine its target component, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(mechanismDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedMechKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedMechKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  MECHANISM
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeMech.categoryBadge)}>
                    {activeMech.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Target: {activeMech.targetComponent}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeMech.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMech.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeMech.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeMech.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMech.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Packet Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeMech.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live RFC 4987 SYN Cookie ISN Calculator Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. RFC 4987 Cryptographic SYN Cookie ISN Calculator &amp; Bitfield Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enter connection 4-tuple parameters, select an MSS value, and adjust the 5-bit timestamp epoch t 
              to observe live synthesis of the 32-bit ISN hex value and its binary bitfield decomposition:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Connection 4-Tuple &amp; Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">Client Source IP:</span>
                <input
                  type="text"
                  value={clientIpInput}
                  onChange={(e) => setClientIpInput(e.target.value)}
                  className="w-full p-2 bg-gray-950 border border-gray-800 rounded font-mono text-cyan-300 text-xs"
                /&gt;
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-gray-400 block">Client Port:</span>
                  <input
                    type="number"
                    value={clientPortInput}
                    onChange={(e) => setClientPortInput(parseInt(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-950 border border-gray-800 rounded font-mono text-cyan-300 text-xs"
                  /&gt;
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 block">Server Port:</span>
                  <input
                    type="number"
                    value={serverPortInput}
                    onChange={(e) => setServerPortInput(parseInt(e.target.value) || 0)}
                    className="w-full p-2 bg-gray-950 border border-gray-800 rounded font-mono text-cyan-300 text-xs"
                  /&gt;
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block">Negotiated MSS Value (3-Bit Index):</span>
                <select
                  value={mssIndex}
                  onChange={(e) => setMssIndex(parseInt(e.target.value))}
                  className="w-full p-2 bg-gray-950 border border-gray-800 rounded font-mono text-emerald-300 text-xs"
                &gt;
                  {mssTable.map((val, idx) => (
                    <option key={idx} value={idx}>
                      Index {idx} ➔ {val} Bytes {idx === 6 ? "(Standard MTU 1500)" : idx === 7 ? "(Jumbo Frame 9000)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Timestamp Epoch (t mod 32):</span>
                  <span className="text-amber-400 font-bold font-mono">{timeEpoch}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="31"
                  step="1"
                  value={timeEpoch}
                  onChange={(e) => setTimeEpoch(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block">Kernel Secret Key:</span>
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full p-2 bg-gray-950 border border-gray-800 rounded font-mono text-purple-300 text-xs"
                /&gt;
              </div>
            </div>

            {/* Calculated ISN Bitfield Breakdown */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">32-Bit Cryptographic ISN Breakdown</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Synthesized 32-Bit ISN (SYN-ACK)</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">{synCookieCalc.isnHex}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Decimal: {synCookieCalc.fullIsn}</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Expected Client Final ACK Number</span>
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">{synCookieCalc.ackExpectedHex}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Formula: ISN + 1</span>
                </div>
              </div>

              {/* Visual Bitfield Breakdown */}
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-3">
                <span className="font-bold text-gray-300 uppercase tracking-wider text-[10px] block">
                  32-Bit Binary Layout Decomposition:
                </span>
                
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 rounded bg-amber-950/60 border border-amber-800">
                    <span className="text-[9px] text-amber-300 block">Bits 31-27 (5 Bits)</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{synCookieCalc.tBinary}</span>
                    <span className="text-[9px] text-amber-400 block mt-0.5">Epoch = {timeEpoch}</span>
                  </div>

                  <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800">
                    <span className="text-[9px] text-emerald-300 block">Bits 26-24 (3 Bits)</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{synCookieCalc.mBinary}</span>
                    <span className="text-[9px] text-emerald-400 block mt-0.5">MSS = {synCookieCalc.mssValue}B</span>
                  </div>

                  <div className="p-2 rounded bg-purple-950/60 border border-purple-800">
                    <span className="text-[9px] text-purple-300 block">Bits 23-0 (24 Bits)</span>
                    <span className="text-xs font-bold text-white block mt-0.5 line-clamp-1">{synCookieCalc.hBinary}</span>
                    <span className="text-[9px] text-purple-400 block mt-0.5">HMAC = {synCookieCalc.hashVal}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border font-mono text-xs bg-emerald-950 text-emerald-300 border-emerald-800">
                <span className="font-bold block uppercase tracking-wider text-[10px]">Kernel Stateless Telemetry:</span>
                <p className="mt-1 font-semibold text-xs leading-relaxed">{synCookieCalc.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - SYN Cookie Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Kernel C &amp; Python Implementation Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Kernel C &amp; Python SYN Cookie Implementation Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore official Linux kernel C source code from `net/ipv4/syncookies.c`, Python cryptographic test harnesses, 
              and Linux sysctl.conf kernel queue scaling configurations:
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
              &gt;
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Implementation
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita absorb 50 Mpps SYN floods, 
              preserve SCADA Window Scaling, and defend database backlogs across West Bengal infrastructure:
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
                  The Incident &amp; Handshake Saturation Vector
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
              7. Legal Penalties for TCP Handshake Exploitation &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              treat TCP Handshake and SYN flood attacks with severe civil compensation liabilities and life imprisonment penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> SYN floods paralyzing critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">Section 70:</strong> Protected Systems DDoS (Up to 10 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to deploy SYN flood availability safeguards.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> TCP SYN flood extortion (Up to 7 years prison).
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
                  <strong>Disabling TCP Timestamps alongside SYN Cookies:</strong> Breaks Window Scaling and SACK options.
                </li>
                <li>
                  <strong>Leaving `tcp_synack_retries = 5`:</strong> Holds dead embryonic sessions for 75 seconds.
                </li>
                <li>
                  <strong>Forgetting to Scale the Accept Queue (`somaxconn`):</strong> Causes drops after handshake completion.
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
                  <strong>Enable `net.ipv4.tcp_syncookies = 1`:</strong> Eliminates half-open socket memory allocation.
                </li>
                <li>
                  <strong>Tune `net.ipv4.tcp_synack_retries = 2`:</strong> Clears dead embryonic connections in ~7 seconds.
                </li>
                <li>
                  <strong>Scale `net.core.somaxconn = 65535`:</strong> Prevents application worker queue overflow under load.
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
                  Why does RFC 4987 use a 24-bit cryptographic HMAC hash in the ISN instead of a simple random sequence number?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does encoding Window Scale parameters into RFC 7323 Timestamp TSval fields restore full high-speed TCP performance?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the calculator above, change the MSS index and observe how the middle 3 bits of the ISN binary representation update in real time!
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
                <span>TCP Handshake asymmetry forces the server to allocate TCB memory before client verification.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RFC 4987 SYN Cookies encode state into the 32-bit ISN with ZERO half-open memory allocation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The ISN encodes a 5-bit timestamp (t), 3-bit MSS index (m), and 24-bit HMAC signature.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TCP Timestamps (RFC 7323) preserve Window Scale and SACK permissions during SYN Cookie mode.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Hardening `tcp_synack_retries = 2` terminates dead embryonic sessions in ~7s instead of 75s.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes TCP Handshake Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="TCP Handshake & SYN Cookie FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Handshake Cryptography Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="TCP Three-Way Handshake Exploitation and SYN Cookies (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The invention of TCP SYN Cookies by Daniel J. Bernstein represents one of the most elegant mathematical solutions in the history of computer networking! Understand the core handshake asymmetry: under RFC 793, receiving a SYN packet forces the server to allocate a ~480-byte Transmission Control Block (TCB) in non-pageable kernel RAM, creating an easy vector for resource starvation. Master the RFC 4987 Initial Sequence Number (ISN) decomposition: the 32-bit ISN encodes a 5-bit timestamp epoch $t$ (advancing every 64 seconds to prevent replay attacks), a 3-bit Maximum Segment Size (MSS) table index $m$, and a 24-bit HMAC-SHA1 cryptographic signature. When the final ACK arrives ($ISN + 1$), the server validates the signature and only then allocates socket memory! Understand why enabling RFC 7323 TCP Timestamps (`net.ipv4.tcp_timestamps = 1`) is essential to preserve TCP Window Scaling and Selective Acknowledgment (SACK) permissions during SYN flood attacks, and why tuning `net.ipv4.tcp_synack_retries = 2` frees dead embryonic slots in ~7 seconds instead of 75 seconds. Remember that Section 66F of the Indian IT Act treats TCP handshake cyber terrorism against critical infrastructure with Life Imprisonment, and Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
