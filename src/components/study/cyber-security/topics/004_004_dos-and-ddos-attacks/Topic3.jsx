import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgProtocolId = useId();

  // Studio 1: Active Protocol Vector Selection
  const [selectedProtocolKey, setSelectedProtocolKey] = useState("tcp_syn_flood_backlog");

  // Studio 2: Live Protocol State-Table Calculator State
  const [synIngressRatePps, setSynIngressRatePps] = useState(45000); // 1,000 to 100,000 PPS
  const [embryonicTimeoutSec, setEmbryonicTimeoutSec] = useState(75); // 5 to 75 Seconds
  const [conntrackMaxStates, setConntrackMaxStates] = useState(2000000); // 100k to 2M States
  const [synCookieMode, setSynCookieMode] = useState(false); // Boolean: SYN Cookies Active

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_syn_proxy_defense");

  // Studio 4: Protocol Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("linux_syn_cookie_conntrack_sysctl");

  // 8 Protocol Attack & State Profiles for Studio 1
  const protocolDatabase = {
    tcp_syn_flood_backlog: {
      key: "tcp_syn_flood_backlog",
      name: "1. TCP SYN Flood & Backlog Queue Collapse",
      category: "TRANSPORT LAYER STATE EXHAUSTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Transport Layer (TCP / Layer 4)",
      exploitationVector:
        "The botnet floods spoofed TCP SYN packets and never returns the final ACK; the server allocates Transmission Control Blocks (TCBs) in its SYN Backlog queue until memory is exhausted.",
      vulnerabilityImpact:
        "Complete rejection of legitimate incoming TCP connections (HTTP, SSH, SMTP) while bandwidth and CPU remain largely untouched.",
      telemetryIndicator: "Thousands of connections stuck in `SYN_RECV` state in `netstat` and high embryonic drop counts",
      resilientDefense: "Enabling Linux TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) and deploying hardware SYN proxies.",
      codeSnippet: `// TCP SYN Flood Mechanism:
// Attacker ➔ [SYN Packet] ➔ Server allocates Transmission Control Block (480B TCB)
// Server   ➔ [SYN-ACK]   ➔ Sent to Spoofed IP (No ACK ever arrives!)
// Server Half-Open Backlog Fills ➔ Subsequent legitimate connections DROPPED!`
    },
    smurf_icmp_directed_broadcast: {
      key: "smurf_icmp_directed_broadcast",
      name: "2. Smurf ICMP Directed Broadcast Amplification",
      category: "NETWORK BROADCAST AMPLIFICATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Network Layer (ICMP Broadcast)",
      exploitationVector:
        "The attacker sends ICMP echo requests with the Source IP spoofed to match the victim to the broadcast address of an unconfigured intermediary network, causing every subnet host to flood the victim.",
      vulnerabilityImpact:
        "Produces up to 250x bandwidth amplification, overwhelming the victim's router with unsolicited ICMP echo replies.",
      telemetryIndicator: "Massive influx of ICMP Echo Reply packets originating from dozens of hosts on an external subnet",
      resilientDefense: "Configuring border routers with `no ip directed-broadcast` to drop subnet broadcast ping packets.",
      codeSnippet: `// Smurf Broadcast Amplification:
// Attacker sends : 1 ICMP Request to Broadcast IP (10.0.0.255) with Source = Victim IP
// 250 Hosts reply: 250 ICMP Echo Replies flood Victim IP (250x Amplification!)
// Router Fix     : Cisco IOS "no ip directed-broadcast"`
    },
    fraggle_udp_chargen_echo_loop: {
      key: "fraggle_udp_chargen_echo_loop",
      name: "3. Fraggle UDP Echo / Chargen Loop",
      category: "UDP BROADCAST AMPLIFICATION LOOP",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Transport Layer (UDP Ports 7 & 19)",
      exploitationVector:
        "The attacker sends spoofed UDP packets targeting port 7 (Echo) or port 19 (Chargen) on a broadcast address; amplifiers reply to the victim, creating an infinite packet reflection loop.",
      vulnerabilityImpact:
        "Saturates intermediate network links and victim uplinks with self-sustaining UDP reflection traffic.",
      telemetryIndicator: "Continuous high-volume UDP traffic between port 7 and port 19 across external subnets",
      resilientDefense: "Disabling legacy UDP Echo and Chargen diagnostic services and blocking subnet directed broadcasts.",
      codeSnippet: `// Fraggle Attack UDP Loop:
// Attacker sends : UDP Packet to 10.0.0.255:7 (Echo) with Source IP = Victim:7
// Intermediaries : All respond to Victim:7
// Victim         : Responds back to Intermediaries:7 ➔ INFINITE BANDWIDTH FLOOD LOOP!`
    },
    tcp_ack_lookup_storm: {
      key: "tcp_ack_lookup_storm",
      name: "4. TCP ACK State-Table Lookup Storm",
      category: "FIREWALL CPU HASH LOOKUP EXHAUSTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Transport Layer & Stateful Firewall",
      exploitationVector:
        "The botnet sends 30+ Million ACK packets per second with random sequence numbers; stateful firewalls must execute full hash-table lookups for every packet, consuming 100% CPU.",
      vulnerabilityImpact:
        "Locks firewall CPU cores in hash-table traversal loops and generates massive outbound TCP RST floods.",
      telemetryIndicator: "Surge in unsolicited TCP ACK packets without preceding SYN handshakes and 100% CPU on firewall appliances",
      resilientDefense: "Scaling conntrack hash buckets (`hashsize = 524288`) and stateless ACK rate limiting.",
      codeSnippet: `// TCP ACK Flood Firewall Behavior:
// Ingress: 30 Mpps TCP ACK packets (Seq=Random, Ack=Random)
// Firewall: Searches state table (O(1) hash lookup across 2,000,000 entries)
// Result: 30,000,000 hash lookups/sec ➔ 100% Firewall CPU Lockup!`
    },
    tcp_rst_injection_teardown: {
      key: "tcp_rst_injection_teardown",
      name: "5. TCP RST Injection & Session Tear-down",
      category: "TCP SESSION TERMINATION EXPLOIT",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetLayer: "Transport Layer (RFC 793 Reset Flag)",
      exploitationVector:
        "The attacker sniffs or predicts active TCP session 4-tuples and injects spoofed TCP RST packets with sequence numbers in the receive window, causing endpoints to abort active sessions instantly.",
      vulnerabilityImpact:
        "Abruptly terminates high-value financial settlement sessions, long-running database syncs, and BGP routing peering.",
      telemetryIndicator: "Spike in anomalous TCP RST packets arriving with sequence numbers matching active session windows",
      resilientDefense: "Enforcing BGP MD5 signature authentication (RFC 2385 / RFC 5925) and IPsec encapsulation.",
      codeSnippet: `// TCP RST Injection Attack:
// Target: Active BGP peering session between 103.25.10.1:179 and 103.25.10.2:179
// Attacker sends: Spoofed TCP packet with RST=1 and Seq within window
// Result: BGP session drops instantly ➔ Entire autonomous system loses internet routing!`
    },
    tcp_syn_ack_reflection: {
      key: "tcp_syn_ack_reflection",
      name: "6. TCP SYN-ACK Reflection Flood",
      category: "THIRD-PARTY SERVER REFLECTION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetLayer: "Transport Layer (TCP / Layer 4)",
      exploitationVector:
        "The attacker spoofs the victim's IP and sends SYN packets to 100,000 legitimate external web servers; those servers reply with unsolicited SYN-ACKs, bypassing standard inbound SYN rate limiters.",
      vulnerabilityImpact:
        "Exhausts firewall state tables with unsolicited SYN-ACKs and achieves up to 5x packet retransmission amplification.",
      telemetryIndicator: "Ingress traffic consisting entirely of TCP SYN-ACK packets originating from thousands of legitimate external web servers",
      resilientDefense: "Stateful firewalls dropping incoming SYN-ACK packets that have no corresponding outbound SYN entry in the state table.",
      codeSnippet: `// SYN-ACK Reflection Attack Flow:
// 1. Attacker ➔ Sends SYN to 100,000 web servers worldwide with Source IP = Victim IP
// 2. 100,000 Servers ➔ Send SYN-ACK packets to Victim IP
// 3. Victim Firewall ➔ Standard SYN rate limiters do not trigger because packets are SYN-ACK!
// 4. Mitigation       ➔ Ingress firewall drops SYN-ACKs with no matching outbound SYN in state table!`
    },
    sockstress_zero_window_lock: {
      key: "sockstress_zero_window_lock",
      name: "7. Sockstress TCP Zero-Window Lock",
      category: "SOCKET BUFFER ALLOCATION LOCK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Transport Layer & OS Socket Buffers",
      exploitationVector:
        "The attacker completes a valid TCP handshake and immediately advertises `TCP Window Size = 0`; the server holds socket buffers in memory for hours while transmitting periodic zero-window probes.",
      vulnerabilityImpact:
        "Bypasses SYN cookie defenses, locking web server threads and socket RAM buffers with minimal attacker bandwidth.",
      telemetryIndicator: "Hundreds of established TCP connections with zero-window advertisements and periodic probe packet exchanges",
      resilientDefense: "Configuring aggressive TCP zero-window probe drop timers and client keepalive timeouts.",
      codeSnippet: `// Sockstress / Zero-Window Attack Header:
// TCP Three-Way Handshake Completed!
// Client sends: TCP Data Request (GET /large_file.iso)
// Client sets : TCP.window_size = 0
// Server OS   : Holds 64KB socket buffer in RAM and transmits periodic Window Probes for hours!`
    },
    tcp_fast_open_tfo_exploitation: {
      key: "tcp_fast_open_tfo_exploitation",
      name: "8. TCP Fast Open (TFO) Heavy Query Flood",
      category: "EARLY DATA APPLICATION EXPLOITATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Transport & Application Layer (RFC 7413)",
      exploitationVector:
        "Attackers abuse TCP Fast Open cookies to send heavy SQL/search payloads inside the initial SYN packet, forcing backend servers to execute database queries before completing handshakes.",
      vulnerabilityImpact:
        "Combines transport layer SYN flood state exhaustion with application-layer database CPU starvation.",
      telemetryIndicator: "High rate of SYN packets containing non-zero data payloads and valid TFO cookie options",
      resilientDefense: "Enforcing strict per-client TFO cookie rate limits and requiring complete handshakes for heavy database endpoints.",
      codeSnippet: `// TCP Fast Open (TFO) Packet Structure:
// SYN Packet [Seq=100, Flags=SYN, TCP_Option_TFO_Cookie=Valid]
// Payload: "GET /api/search?q=pan_database HTTP/1.1\\r\\n..."
// Target Server: Executes expensive database search BEFORE completing TCP Handshake!`
    }
  };

  const activeProtocol = protocolDatabase[selectedProtocolKey];

  // Studio 2: Live Protocol State-Table Calculations
  const stateSimulation = useMemo(() => {
    // If SYN cookies are enabled, effective embryonic hold timeout is virtually 0:
    const effectiveTimeout = synCookieMode ? 0.05 : embryonicTimeoutSec;
    const activeStates = Math.round(synIngressRatePps * effectiveTimeout);
    
    // Utilization ratio:
    const rawUtilization = (activeStates / conntrackMaxStates) * 100;
    
    // Drop probability:
    let rawDropProb = 0;
    if (activeStates <= conntrackMaxStates) {
      rawDropProb = 0.0;
    } else {
      const overload = (activeStates - conntrackMaxStates) / conntrackMaxStates;
      rawDropProb = (1 - Math.exp(-overload * 8.0)) * 100;
    }

    const finalDrop = rawDropProb > 99.9 ? 99.9 : rawDropProb;

    return {
      activeStates: activeStates.toLocaleString(),
      utilizationPercent: rawUtilization.toFixed(1),
      finalDrop: finalDrop.toFixed(2),
      badgeClass: parseFloat(finalDrop) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(finalDrop) > 5
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: synCookieMode
        ? `RFC 4987 SYN COOKIES ACTIVE: Connection state encoded into Initial Sequence Numbers (ISN); active embryonic RAM states reduced to ${activeStates.toLocaleString()}, connection drop rate is 0.00%!`
        : parseFloat(finalDrop) < 1
        ? `STATE TABLE RESILIENT: Active embryonic states (${activeStates.toLocaleString()}) within conntrack capacity (${conntrackMaxStates.toLocaleString()}); connection drop rate is 0.00%!`
        : `STATE TABLE EXHAUSTION: Active embryonic states (${activeStates.toLocaleString()}) exceed conntrack capacity (${conntrackMaxStates.toLocaleString()}) by ${rawUtilization.toFixed(0)}%, causing ${finalDrop}% connection drops!`
    };
  }, [synIngressRatePps, embryonicTimeoutSec, conntrackMaxStates, synCookieMode]);

  // Studio 4: Protocol Security Production Code Database
  const codeDatabase = {
    linux_syn_cookie_conntrack_sysctl: {
      name: "Linux sysctl.conf TCP SYN Cookie & Conntrack Hash Bucket Scaling",
      code: `# Linux Kernel Hardening for TCP SYN Floods & State-Table Scaling:

# 1. Enable TCP SYN Cookies (RFC 4987) - ZERO Memory Allocation for Half-Open Sockets!
net.ipv4.tcp_syncookies = 1

# 2. Increase Maximum SYN Backlog Queue Size
net.ipv4.tcp_max_syn_backlog = 8192

# 3. Reduce SYN-ACK Retransmission Retries (Clears dead embryonic sessions in ~7s)
net.ipv4.tcp_synack_retries = 2

# 4. Scale Maximum Stateful Conntrack Table Entries
net.netfilter.nf_conntrack_max = 2097152

# 5. Scale Conntrack Hash Buckets (Prevents O(N) Hash Collision Degradation)
# Run in shell: echo 524288 > /sys/module/nf_conntrack/parameters/hashsize

# 6. Drop Ingress Packets with Malformed TCP Flag Combinations (SYN+FIN, NULL, XMAS)
# iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
# iptables -A INPUT -p tcp --tcp-flags SYN,FIN SYN,FIN -j DROP`,
      explanation: "Linux kernel configuration enabling TCP SYN Cookies, increasing SYN backlog queues, scaling conntrack tables to 2,000,000 states, and sizing hash buckets to 524,288 entries to maintain fast O(1) lookups."
    },
    cisco_smurf_urpf_hardening: {
      name: "Cisco IOS Router Configuration for Smurf Defense & Strict uRPF Ingress Filtering",
      code: `! Cisco IOS Enterprise Border Router Hardening:
interface GigabitEthernet0/0
 description WAN-UPLINK-TO-TIER1-ISP
 ip address 103.25.10.1 255.255.255.0

 ! 1. Drop Directed Broadcasts (Completely Neutralizes Smurf & Fraggle Attacks!)
 no ip directed-broadcast

 ! 2. Enforce Strict Reverse Path Forwarding (uRPF - RFC 2827 / BCP 38)
 ! Drops any packet whose Source IP does not match the routing table ingress path!
 ip verify unicast source reachable-via rx

 ! 3. Block UDP Reserved Port 0 Anomalies
 access-list 101 deny udp any any eq 0
 access-list 101 permit ip any any
!
! Result: Spoofed SYN floods and broadcast amplification dropped at the border router!`,
      explanation: "Cisco IOS router configuration disabling directed broadcasts to defeat Smurf attacks, enabling Strict uRPF to drop spoofed source IPs, and filtering UDP port 0 anomalies."
    },
    scapy_protocol_inspector_py: {
      name: "Python Scapy Script for Protocol Flag Inspection & RST Injection Detection",
      code: `# Python Scapy Tool to Detect Anomalous TCP Flags (SYN Floods & Malformed Headers)
from scapy.all import *

def inspect_tcp_protocol_packet(packet):
    if packet.haslayer(TCP):
        flags = packet[TCP].flags
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        
        # 1. Detect Malformed TCP Flag Combinations (NULL, XMAS, SYN+FIN)
        if flags == 0:
            print(f"[!] NULL SCAN DETECTED from {src_ip} → Dropping packet!")
            return "DROP_NULL"
        elif flags == 0x29: # SYN+FIN+PSH
            print(f"[!] XMAS SCAN DETECTED from {src_ip} → Dropping packet!")
            return "DROP_XMAS"
            
        # 2. Check for TCP SYN-ACK without valid session state
        if flags == "SA": # SYN-ACK
            print(f"[*] Inspecting SYN-ACK from {src_ip} → Verifying against state table...")
            
    return "FORWARD_PACKET"

print("[+] Protocol Flag Inspection Engine Active on Kolkata Financial Gateway!")`,
      explanation: "Python Scapy network forensics tool inspecting incoming packets for malformed TCP flag combinations (NULL scans, XMAS scans, SYN+FIN anomalies) and unsolicited SYN-ACK reflection packets."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_syn_proxy_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending Banking Settlement Switches Against 40 Mpps SYN & ACK Floods",
      threatType: "PROTOCOL TCP SYN & ACK FLOOD (40 Million PPS)",
      budget: "₹66,00,000",
      incident:
        "A coordinated botnet flooded the settlement gateway with 40 Mpps of spoofed TCP SYN and ACK packets, attempting to exhaust the firewall's `conntrack` state table.",
      defenseStrategy:
        "Mamata deployed an inline hardware TCP SYN Proxy with SYN cookie generation, scaled Linux conntrack tables to 2,000,000 entries, and resized hash buckets to 524,288.",
      outcome: "100% of spoofed half-open connections absorbed with zero memory allocation; state table utilization remained below 8%; zero banking settlement delays.",
      metrics: {
        synPacketsAbsorbed: "40,000,000 PPS",
        conntrackUtilization: "< 8% RAM Used",
        settlementSwitchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_smurf_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "SMURF BROADCAST AMPLIFICATION & RST INJECTION",
      title: "Hardening Substation Telemetry Against Smurf Broadcast Floods",
      budget: "₹39,00,000",
      incident:
        "Adversaries broadcasted spoofed ICMP requests across state utility subnets, attempting to generate a 250x Smurf amplification flood to crash RTU controller telemetry.",
      defenseStrategy:
        "Debangshu enforced `no ip directed-broadcast` across all Cisco border routers and enabled Strict uRPF (BCP 38) to drop spoofed internal subnet addresses.",
      outcome: "Directed broadcast packets dropped at the boundary interface; Smurf amplification factor reduced from 250x to 0x; power grid stable.",
      metrics: {
        amplificationFactor: "0x (Completely Blocked)",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_synack_defense",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "SYN-ACK REFLECTION FLOOD (Third-Party Web Server Reflection)",
      title: "Protecting Outpatient Health Record Servers from SYN-ACK Reflection",
      budget: "₹30,00,000",
      incident:
        "Attackers spoofed the hospital's IP to query 50,000 global web servers, flooding the oncology patient database firewall with unsolicited SYN-ACK packets.",
      defenseStrategy:
        "Mahima configured stateful firewall inspection rules to drop all incoming SYN-ACK packets that lacked a corresponding outbound SYN record in the state table.",
      outcome: "100% of unsolicited reflection packets dropped at the firewall; patient appointment booking portal remained 100% available; 120,000 records protected.",
      metrics: {
        reflectionPacketsDropped: "100% at Perimeter",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_protocol_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF PROTOCOL STATE SATURATION & SYN COOKIES",
      title: "Formulating the Protocol State Table Saturation & SYN Backlog Model",
      budget: "₹25,00,000",
      incident:
        "Researchers modeled the mathematical interaction between embryonic arrival rates, hold timeouts, state table capacity, and TCP connection drop rates.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that RFC 4987 SYN Cookies eliminate state memory allocation, ensuring P_drop = 0.0%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 85,000 simulated protocol flood scenarios.",
      metrics: {
        simulationTrials: "85,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "State Table Queueing Model",
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
                Topic 03
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Network Protocol DDoS Attacks: SYN Flood and Smurf Attack
            </h1>
            <p className="text-xs text-gray-400">
              Protocol state exhaustion (Mpps), TCP SYN floods, Smurf broadcast amplification, conntrack scaling, and IT Act Section 66F.
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
              Protocol State Saturation Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Protocol DDoS: Exhausting State Tables, SYN Queues &amp; TCB Buffers
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Unlike volumetric floods that target raw bandwidth (Gbps), <strong>Network Protocol DDoS Attacks</strong> exploit 
              the stateful architecture of Layer 3 and Layer 4 protocols (measured in <strong>Packets Per Second - Mpps</strong>). 
              Adversaries target the memory buffers, state tracking tables (`conntrack`), and half-open connection queues of operating systems, 
              firewalls, and load balancers. Key protocol vectors include <strong>TCP SYN Floods</strong> (filling the server's half-open TCP backlog queue 
              with 480-byte TCB allocations), <strong>Smurf Attacks</strong> (exploiting directed ICMP broadcast amplification on unconfigured subnets), 
              <strong>Fraggle Attacks</strong> (UDP echo loops), and <strong>TCP ACK Lookup Storms</strong> (forcing expensive firewall hash-table searches).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Protocol Vectors Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                TCP Three-Way Handshake Exploitation
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                SYN Flood: 50,000 PPS ➔ 3.75M half-open states ➔ Conntrack state table crash!
              </div>
              <p className="text-gray-300 leading-relaxed">
                By sending SYN packets with spoofed IPs and never completing the handshake, the attacker fills the half-open backlog queue, 
                forcing the server to drop all subsequent legitimate client handshakes.
              </p>
            </div>

            {/* Hardware & Kernel Defense Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                SYN Cookies &amp; Conntrack Hash Sizing
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">TCP SYN Cookies (RFC 4987):</strong> Encodes connection state into ISN hashes (0 RAM allocated).</li>
                <li>• <strong className="text-purple-300">Conntrack Hash Sizing:</strong> `hashsize = 524288` ensures fast O(1) hash lookups during ACK floods.</li>
                <li>• <strong className="text-amber-300">Border Router Broadcast Drops:</strong> `no ip directed-broadcast` stops Smurf amplification.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Protocol Threat Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Protocol Defense Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Protocol SYN Flood Ingress vs Hardware SYN Proxy &amp; SYN Cookies
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how incoming high-PPS TCP SYN floods encounter Border Router broadcast filters, 
              Hardware SYN Proxies, Scaled Conntrack state tables, and Kernel SYN Cookie engines:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INGRESS SYN FLOOD */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. PROTOCOL FLOOD
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  40 Million PPS
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PROTOCOL VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  TCP SYN Flood
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Smurf / ACK Storm
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: BORDER ROUTER BROADCAST DROP */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. BORDER ROUTER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Cisco IOS ACL
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  BROADCAST FILTER:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  no ip directed-broadcast
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Strict uRPF Filtering!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: HARDWARE TCP SYN PROXY */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. HARDWARE PROXY
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  F5 / A10 SYN Proxy
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  HANDSHAKE SHIELD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Completes Handshake
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Drops Spoofed SYNs!
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
                  ZERO RAM FOOTPRINT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  ISN Encodes State
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Backlog Never Fills!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: CLEAN ORIGIN CONNECTIONS */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. ORIGIN SERVER
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Kolkata Gateway
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% AVAILABLE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  0% Connection Drop
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Fast User Banking!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Protocol Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Protocol Attack Vector &amp; State-Table Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a network protocol attack vector below to examine its target layer, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(protocolDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedProtocolKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedProtocolKey === item.key
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeProtocol.categoryBadge)}>
                    {activeProtocol.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Target: {activeProtocol.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeProtocol.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeProtocol.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeProtocol.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeProtocol.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeProtocol.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Packet Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeProtocol.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Protocol State-Table Saturation Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Protocol State-Table Saturation &amp; Connection Drop Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust incoming SYN packet rate N_syn, embryonic connection timeout T_timeout, 
              maximum conntrack capacity S_max, and toggle RFC 4987 SYN Cookies to model connection drop rate P_drop = 1 - e^(-max(0, U - 1.0) × 8):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Protocol State Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>SYN Ingress Rate (N_syn):</span>
                  <span className="text-rose-400 font-bold font-mono">{synIngressRatePps.toLocaleString()} PPS</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="2500"
                  value={synIngressRatePps}
                  onChange={(e) => setSynIngressRatePps(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Embryonic Hold Timeout (T):</span>
                  <span className="text-amber-400 font-bold font-mono">{embryonicTimeoutSec} Seconds</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="75"
                  step="5"
                  value={embryonicTimeoutSec}
                  onChange={(e) => setEmbryonicTimeoutSec(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Conntrack Table Capacity (S_max):</span>
                  <span className="text-cyan-400 font-bold font-mono">{conntrackMaxStates.toLocaleString()} States</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="100000"
                  value={conntrackMaxStates}
                  onChange={(e) => setConntrackMaxStates(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">RFC 4987 TCP SYN Cookie Defense:</span>
                <button
                  onClick={() => setSynCookieMode(!synCookieMode)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    synCookieMode
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {synCookieMode ? "✔ SYN Cookies ENABLED (0 RAM Allocated)" : "❌ SYN Cookies DISABLED (Allocates RAM)"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">State Table Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Active Embryonic States</span>
                  <span className="text-lg font-extrabold text-cyan-400">{stateSimulation.activeStates}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Utilization: {stateSimulation.utilizationPercent}%</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">TCP Connection Drop Rate</span>
                  <span className="text-lg font-extrabold text-white">{stateSimulation.finalDrop}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Legitimate SYN Drops</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", stateSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">State Saturation Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{stateSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Protocol Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              SYN Proxy &amp; Cisco Router Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production SYN Proxy &amp; Cisco Router Hardening Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Linux sysctl.conf kernel scripts enabling TCP SYN cookies and scaling conntrack hash buckets, 
              Cisco IOS router configurations with `no ip directed-broadcast`, and Python Scapy packet analysis tools:
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
                Hardened Config
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita absorb 40 Mpps SYN floods, 
              neutralize Smurf broadcasts, and defend patient databases across West Bengal infrastructure:
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
                  The Incident &amp; Protocol Flood Vector
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
              7. Legal Penalties for Protocol DDoS Attacks &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              treat Protocol DDoS attacks with severe civil compensation liabilities and life imprisonment penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Protocol floods paralyzing critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for persistent availability safeguards collapse.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Protocol DDoS extortion (Up to 7 years prison).
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
                  <strong>Leaving Directed Broadcasts Enabled on Routers:</strong> Enables Smurf amplification attacks against subnets.
                </li>
                <li>
                  <strong>Sizing Conntrack Hash Buckets Too Small:</strong> Degrades hash lookup time from O(1) to O(N) during ACK storms.
                </li>
                <li>
                  <strong>Relying on High SYN Retransmissions:</strong> 75-second timeouts hold dead half-open connections too long.
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
                  <strong>Enable `net.ipv4.tcp_syncookies = 1`:</strong> Completely eliminates TCB memory allocation for half-open sockets.
                </li>
                <li>
                  <strong>Deploy Hardware TCP SYN Proxies:</strong> Validates handshakes before passing traffic to backend servers.
                </li>
                <li>
                  <strong>Configure `no ip directed-broadcast`:</strong> Disables broadcast ping forwarding on border interfaces.
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
                  Why does a TCP SYN flood exhaust server memory even when total attack bandwidth is under 50 Mbps?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does Cisco's `no ip directed-broadcast` command completely eliminate Smurf ICMP broadcast amplification?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, enable SYN Cookies and observe connection drop rate collapse to 0.00%!
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
                <span>Protocol DDoS attacks target stateful connection tables and CPU processing (Mpps).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TCP SYN floods fill the server's half-open backlog; defeated via RFC 4987 TCP SYN Cookies.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Smurf attacks exploit ICMP broadcast amplification; defeated via `no ip directed-broadcast`.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Hardware SYN Proxies complete three-way handshakes before passing traffic to backend servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Scaling conntrack hash buckets (`hashsize = 524288`) prevents O(N) lookup degradation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes Protocol Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Network Protocol DDoS FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Protocol Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Network Protocol DDoS Attacks: SYN Flood and Smurf Attack (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Network Protocol DDoS attacks represent a sophisticated class of threats that target the stateful processing limits of network infrastructure and operating system stacks rather than raw bandwidth! Understand the primary vectors: TCP SYN Floods exploit the three-way handshake by filling the server's half-open backlog queue with 480-byte Transmission Control Block (TCB) memory allocations; Smurf Attacks exploit directed broadcast amplification on unconfigured subnets to generate 250x ICMP reply floods; Fraggle Attacks create self-sustaining UDP echo loops; and TCP ACK Storms exhaust firewall CPU by forcing millions of state-table hash lookups per second. Master essential hardening strategies: enable Linux kernel TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) to encode connection state into Initial Sequence Numbers (ISNs) with zero memory allocation, deploy inline hardware SYN Proxies, scale stateful conntrack tables to 2,000,000 entries with 524,288 hash buckets to maintain fast O(1) lookups, and configure `no ip directed-broadcast` across all border routers. Remember that Section 66F of the Indian IT Act treats protocol cyber terrorism against critical infrastructure with Life Imprisonment, and Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
