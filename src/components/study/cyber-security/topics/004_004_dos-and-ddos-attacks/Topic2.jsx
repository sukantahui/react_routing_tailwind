import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgVolumetricId = useId();

  // Studio 1: Active Volumetric Vector Selection
  const [selectedVectorKey, setSelectedVectorKey] = useState("udp_random_port_flood");

  // Studio 2: Live Volumetric Bandwidth Calculator State
  const [ingressVolumeGbps, setIngressVolumeGbps] = useState(450); // 50 to 1000 Gbps
  const [enterprisePipeGbps, setEnterprisePipeGbps] = useState(10); // 1 to 100 Gbps
  const [scrubbingCapacityGbps, setScrubbingCapacityGbps] = useState(10); // 10 = None (Origin Link), 500 = ISP Scrubber, 5000 = 5 Tbps Anycast Cloud

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_volumetric_defense");

  // Studio 4: Volumetric Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("ebpf_xdp_packet_drop_c");

  // 8 Volumetric Attack & Hardware Profiles for Studio 1
  const vectorDatabase = {
    udp_random_port_flood: {
      key: "udp_random_port_flood",
      name: "1. UDP Random High-Port Flood",
      category: "VOLUMETRIC PIPE & CPU STARVATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Transport Layer (UDP / Layer 4)",
      exploitationVector:
        "The attacker floods random high ports (10,000-65,535) with high-volume UDP datagrams; the victim OS checks for listening sockets, finds none, and generates millions of ICMP Port Unreachable error packets.",
      vulnerabilityImpact:
        "Saturates upstream network pipes (Gbps) and exhausts operating system CPU generating outbound ICMP error packets.",
      telemetryIndicator: "Massive volume of UDP traffic targeting closed high ports and spike in outbound ICMP Type 3 Code 3 replies",
      resilientDefense: "Deploying upstream BGP Flowspec rules and Linux kernel ICMP rate limiting (`net.ipv4.icmp_ratelimit = 100`).",
      codeSnippet: `// UDP High-Port Flood Flow:
// Ingress Flood  ➔ Sends 600,000 UDP datagrams/sec with spoofed IPs to random high ports
// Target OS      ➔ Checks ports ➔ Finds no listening service
// Target OS      ➔ Generates ICMP Port Unreachable packets ➔ Saturates Outbound Uplink!`
    },
    icmp_echo_ping_flood: {
      key: "icmp_echo_ping_flood",
      name: "2. ICMP Echo (Ping) Flood",
      category: "NETWORK LAYER SYMMETRICAL FLOOD",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Network Layer (ICMP Type 8 Echo Request)",
      exploitationVector:
        "The botnet sends massive streams of maximum-size (64KB) ICMP Echo Requests without waiting for replies; the victim system is forced to generate equal-sized ICMP Echo Replies (Type 0).",
      vulnerabilityImpact:
        "Saturates both the inbound downlink and outbound uplink fiber connections, causing complete bi-directional network collapse.",
      telemetryIndicator: "Continuous stream of ICMP Type 8 requests saturating network interfaces at maximum interface capacity",
      resilientDefense: "Dropping ICMP Echo requests at the border firewall while preserving ICMP Type 3 Code 4 for Path MTU Discovery.",
      codeSnippet: `# Scapy ICMP Echo Flood Command:
packet = IP(dst="103.25.10.50")/ICMP(type=8, code=0)/Raw(load=b"X"*1400)
send(packet, loop=1, inter=0.0005, verbose=False)`
    },
    udp_fragmentation_buffer_overflow: {
      key: "udp_fragmentation_buffer_overflow",
      name: "3. UDP Fragmentation Buffer Overflow",
      category: "IP REASSEMBLY MEMORY EXHAUSTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Network Layer (IPv4 Fragmentation)",
      exploitationVector:
        "The attacker floods secondary UDP fragments (with non-zero fragment offsets) without ever sending initial fragments (offset 0), forcing the kernel reassembly queue to hold incomplete trees in RAM.",
      vulnerabilityImpact:
        "Exhausts kernel IP reassembly memory buffers (`ipfrag_high_thresh`), crashing router network processing and dropping clean packets.",
      telemetryIndicator: "High volume of fragmented IP packets with non-zero offsets and zero matching initial offset-0 packets",
      resilientDefense: "Reducing Linux fragment hold timers (`net.ipv4.ipfrag_time = 10`) and dropping orphan fragments in hardware.",
      codeSnippet: `// Fragmentation Flood Pattern:
// Frag 1 : Offset = 185 (1480B) ➔ Kernel allocates reassembly memory
// Frag 2 : Offset = 370 (2960B) ➔ Kernel waits for initial Frag 0
// Initial Fragment (Offset 0) NEVER arrives ➔ Kernel RAM Exhausted!`
    },
    junk_payload_padding: {
      key: "junk_payload_padding",
      name: "4. Junk 1400-Byte Payload Padding",
      category: "MAXIMUM MTU BANDWIDTH SATURATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Transport & Network Layer (MTU 1500B)",
      exploitationVector:
        "The botnet pads the UDP payload with 1400 bytes of pseudo-random garbage characters, maximizing packet size up to the 1500-byte MTU to maximize bandwidth consumption per packet.",
      vulnerabilityImpact:
        "Allows a relatively small botnet (1,000 bots) generating 50,000 PPS per bot to produce over 570 Gbps of raw volumetric saturation.",
      telemetryIndicator: "Uniform packet sizes clustered around 1428-1500 bytes containing static or random byte streams",
      resilientDefense: "Deep Packet Inspection (DPI) dropping UDP payloads with static junk characters and upstream BGP Flowspec.",
      codeSnippet: `// 1400-Byte Junk Padding:
char packet[1428];
memset(packet + 28, 'A', 1400); // 1400 Bytes of Junk Padding
sendto(raw_sock, packet, sizeof(packet), 0, (struct sockaddr *)&target, sizeof(target));`
    },
    udp_port_0_anomaly_flood: {
      key: "udp_port_0_anomaly_flood",
      name: "5. UDP Port 0 Anomaly Flood",
      category: "MALFORMED PROTOCOL ANOMALY",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetLayer: "Transport Layer (RFC 768 Reserved Port 0)",
      exploitationVector:
        "Botnet scripts generate UDP packets with destination port set to 0; because port 0 is reserved and invalid under RFC 768, target operating systems spend CPU cycles processing malformed headers.",
      vulnerabilityImpact:
        "Consumes router CPU handling invalid transport headers and triggers unhandled kernel socket errors.",
      telemetryIndicator: "Ingress packets arriving with `Destination Port == 0`",
      resilientDefense: "Hardware firewall ACLs configured to immediately drop all traffic targeting port 0 (`deny udp any any eq 0`).",
      codeSnippet: `// Cisco IOS ACL Dropping Port 0 Floods:
access-list 101 deny udp any any eq 0
access-list 101 permit ip any any`
    },
    nic_ring_buffer_softirq_lockup: {
      key: "nic_ring_buffer_softirq_lockup",
      name: "6. NIC Ring Buffer Overflow & SoftIRQ Lockup",
      category: "HARDWARE INTERRUPT OVERLOAD",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetLayer: "Physical / Data Link / OS Kernel Interface",
      exploitationVector:
        "When incoming packet rates exceed 30 Million PPS, hardware descriptor ring buffers overflow; CPU spends 100% of its cycles handling hardware interrupts in `ksoftirqd`.",
      vulnerabilityImpact:
        "Complete operating system freeze; user-space application worker processes are starved of CPU cycles even if bandwidth is not fully saturated.",
      telemetryIndicator: "Spike to 100% CPU on `%si` (softirq) in `top` and high `rx_dropped` counts in `ethtool -S eth0`",
      resilientDefense: "Scaling NIC ring buffer queues (`ethtool -G eth0 rx 4096`) and deploying eBPF/XDP driver hooks.",
      codeSnippet: `# Linux SoftIRQ & Ring Buffer Commands:
ethtool -G eth0 rx 4096 tx 4096 # Scales ring buffer capacity
top # Monitor %si (softirq) CPU saturation`
    },
    asymmetrical_uplink_choke: {
      key: "asymmetrical_uplink_choke",
      name: "7. Asymmetrical Uplink Choke",
      category: "EGRESS BANDWIDTH STARVATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Physical Network Uplink / Egress Pipe",
      exploitationVector:
        "Exploiting commercial broadband connections with asymmetrical bandwidth (e.g. 1 Gbps download vs 100 Mbps upload); inbound floods force server replies that choke the smaller upload pipe.",
      vulnerabilityImpact:
        "Completely freezes outbound business traffic, payment gateway settlement confirmations, and database synchronization.",
      telemetryIndicator: "100% link utilization on the outbound network interface while inbound traffic is below threshold",
      resilientDefense: "Enforcing kernel ICMP rate limits and dropping unauthenticated UDP traffic before response generation.",
      codeSnippet: `// Asymmetrical Link Saturation:
// Ingress Link: 1000 Mbps | Egress Link: 100 Mbps
// Inbound Ping: 150 Mbps ➔ Outbound Replies: 150 Mbps > 100 Mbps ➔ 100% UPLINK COLLAPSE!`
    },
    symmetrical_bidirectional_saturation: {
      key: "symmetrical_bidirectional_saturation",
      name: "8. Symmetrical Bi-Directional Link Saturation",
      category: "TOTAL FIBER LINK PARALYSIS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Enterprise Fiber Optic Backbone",
      exploitationVector:
        "Multi-gigabit floods fill both the download and upload paths of a symmetrical leased line (e.g. 10 Gbps full-duplex fiber), rendering all corporate connectivity impossible.",
      vulnerabilityImpact:
        "Total isolation of the enterprise data center from the global internet.",
      telemetryIndicator: "Bi-directional interface bandwidth graphs locked at 100% maximum capacity",
      resilientDefense: "Upstream cloud Anycast scrubbing centers and BGP Blackhole / Null0 routing.",
      codeSnippet: `// Symmetrical Link Saturation:
// Inbound Flood : 11.2 Gbps UDP ➔ Downlink 100% Full
// Outbound Flood: 10.0 Gbps ICMP ➔ Uplink 100% Full
// Result        : Total Bi-Directional Data Center Isolation!`
    }
  };

  const activeVector = vectorDatabase[selectedVectorKey];

  // Studio 2: Live Volumetric Bandwidth Calculations
  const bandwidthSimulation = useMemo(() => {
    // Total effective capacity:
    const effectiveCapacity = scrubbingCapacityGbps > enterprisePipeGbps ? scrubbingCapacityGbps : enterprisePipeGbps;
    
    // Saturation & Packet Loss:
    let rawPacketLoss = 0;
    if (ingressVolumeGbps <= effectiveCapacity) {
      rawPacketLoss = 0.0;
    } else {
      const surplus = ingressVolumeGbps - effectiveCapacity;
      rawPacketLoss = (1 - Math.exp(-surplus / 20.0)) * 100;
    }

    const finalLoss = rawPacketLoss > 99.9 ? 99.9 : rawPacketLoss;
    const linkUtilization = ((ingressVolumeGbps / effectiveCapacity) * 100).toFixed(1);

    return {
      finalLoss: finalLoss.toFixed(2),
      linkUtilization,
      effectiveCapacity,
      badgeClass: parseFloat(finalLoss) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(finalLoss) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(finalLoss) < 1
        ? `HIGH BANDWIDTH AVAILABILITY: Scrubbing Network (${effectiveCapacity} Gbps) absorbs ${ingressVolumeGbps} Gbps flood; packet loss is 0.00%!`
        : `CRITICAL PIPE SATURATION: Ingress flood (${ingressVolumeGbps} Gbps) exceeds link capacity (${effectiveCapacity} Gbps) by ${linkUtilization}%, causing ${finalLoss}% packet drop at ISP edge!`
    };
  }, [ingressVolumeGbps, enterprisePipeGbps, scrubbingCapacityGbps]);

  // Studio 4: Volumetric Security Production Code Database
  const codeDatabase = {
    ebpf_xdp_packet_drop_c: {
      name: "C eBPF / XDP Kernel Driver Hook Dropping Volumetric UDP Floods at 40 Mpps",
      code: `// C eBPF / XDP High-Performance Packet Filter (Executes in Driver Ring Buffer!)
#include <linux/bpf.h>
#include <linux/if_ether.h>
#include <linux/ip.h>
#include <linux/udp.h>
#include <bpf/bpf_helpers.h>

SEC("xdp_volumetric_filter")
int drop_volumetric_udp_floods(struct xdp_md *ctx) {
    void *data = (void *)(long)ctx->data;
    void *data_end = (void *)(long)ctx->data_end;
    
    struct ethhdr *eth = data;
    if ((void *)(eth + 1) > data_end) return XDP_PASS;
    if (eth->h_proto != __constant_htons(ETH_P_IP)) return XDP_PASS;
    
    struct iphdr *ip = (void *)(eth + 1);
    if ((void *)(ip + 1) > data_end) return XDP_PASS;
    
    // Inspect UDP Packets
    if (ip->protocol == IPPROTO_UDP) {
        struct udphdr *udp = (void *)((void *)ip + (ip->ihl * 4));
        if ((void *)(udp + 1) > data_end) return XDP_PASS;
        
        // Drop UDP Port 0 Anomalies
        if (udp->dest == 0 || udp->source == 0) {
            return XDP_DROP; // Wire-speed hardware discard!
        }
        
        // Drop high-port volumetric junk packets (> 1200 bytes)
        if (__constant_ntohs(udp->dest) >= 10000 && __constant_ntohs(udp->len) >= 1200) {
            return XDP_DROP; // Dropped at 40+ Million PPS per core!
        }
    }
    
    return XDP_PASS;
}
char _license[] SEC("license") = "GPL";`,
      explanation: "C eBPF program running directly inside the network interface driver ring buffer (XDP), inspecting packet headers and dropping volumetric UDP floods at 40+ Million PPS per core without kernel overhead."
    },
    bgp_flowspec_volumetric_conf: {
      name: "BGP Flowspec (RFC 5575) Juniper / Cisco Configuration for Volumetric Flood Scrubbing",
      code: `# BGP Flowspec Policy to Scrub 500 Gbps UDP & ICMP Floods at Upstream Tier-1 ISP Core:
routing-options {
    flow {
        route kolkata-volumetric-scrubber {
            match {
                destination 103.25.10.50/32;       # Targeted Financial Gateway IP
                protocol [ udp icmp ];             # Target Protocols
                destination-port 10000-65535;      # High UDP Ports
                packet-length 1400-1500;           # Maximum MTU Junk Payloads
            }
            then {
                rate-limit 0;                      # Drop 100% of attack traffic at ISP Core!
                community [ "target:65000:666" ];  # Blackhole community tag
            }
        }
    }
}
# Result: 500 Gbps attack traffic scrubbed in ISP hardware without touching enterprise fiber!`,
      explanation: "BGP Flowspec (RFC 5575) router configuration pushing granular packet filtering rules directly into Tier-1 ISP core routers, scrubbing volumetric floods before they reach customer fiber links."
    },
    sysctl_icmp_frag_hardening_sh: {
      name: "Linux sysctl & Shell Script for ICMP Rate Limiting & Fragment Timeout Hardening",
      code: `#!/bin/bash
# Linux Kernel Network Stack Hardening for Volumetric Floods:

# 1. Cap ICMP Error Generation Rate (Prevents Outbound Uplink Starvation!)
sysctl -w net.ipv4.icmp_ratelimit=100
sysctl -w net.ipv4.icmp_ratemask=6168

# 2. Reduce IP Fragment Reassembly Timeout from 30s to 10s
sysctl -w net.ipv4.ipfrag_time=10

# 3. Set Memory Thresholds for IP Fragment Queue (Prevents RAM Starvation)
sysctl -w net.ipv4.ipfrag_high_thresh=4194304
sysctl -w net.ipv4.ipfrag_low_thresh=3145728

# 4. Scale NIC Descriptor Ring Buffers to Maximum Hardware Capacity
ethtool -G eth0 rx 4096 tx 4096

echo "[+] Linux Kernel Network Stack Hardened against Volumetric Floods!"`,
      explanation: "Linux sysctl hardening script capping ICMP response generation to 100 packets/sec, reducing fragment reassembly hold timers to 10 seconds, and scaling NIC ring buffer queues to 4096 descriptors."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_volumetric_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending Payment Gateways Against a 650 Gbps High-Port UDP Flood",
      threatType: "VOLUMETRIC UDP FLOOD (650 Gbps / 42 Million PPS)",
      budget: "₹62,00,000",
      incident:
        "An adversary flooded the payment gateway VIP with 650 Gbps of 1400-byte UDP packets on random high ports, threatening to saturate the data center's 40 Gbps fiber uplink.",
      defenseStrategy:
        "Mamata pushed BGP Flowspec rate-limiting rules to upstream Tier-1 ISPs and deployed eBPF/XDP packet filtering inside network interface card drivers.",
      outcome: "650 Gbps scrubbed at the ISP core; residual traffic dropped at wire speed via XDP; zero transaction latency across Kolkata banks.",
      metrics: {
        attackPeakBandwidth: "650.0 Gbps",
        packetsDroppedPerSec: "42,000,000 PPS",
        switchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_icmp_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "ICMP PING FLOOD & ASYMMETRICAL UPLINK SATURATION",
      title: "Hardening Substation Routers Against ICMP Ping Floods",
      budget: "₹38,00,000",
      incident:
        "A botnet flooded the substation border router with 80 Gbps of ICMP Echo Requests, saturating the 1 Gbps uplink with outbound Echo Replies and locking router CPU.",
      defenseStrategy:
        "Debangshu configured border firewalls to drop ICMP Echo requests while preserving ICMP Type 3 Code 4 for Path MTU Discovery, and enabled kernel ICMP rate limits.",
      outcome: "Router CPU utilization dropped from 100% to 4%; outbound uplink restored; zero power grid telemetry latency across West Bengal.",
      metrics: {
        routerCpuDrop: "100% ➔ 4%",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_fragment_defense",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "UDP FRAGMENTATION FLOOD (Buffer Reassembly Exhaustion)",
      title: "Protecting Telemedicine Servers from UDP Fragmentation Floods",
      budget: "₹29,00,000",
      incident:
        "During emergency surgery broadcasts, an attacker flooded the clinic network with fragmented UDP packets with missing initial fragments, exhausting kernel RAM buffers.",
      defenseStrategy:
        "Mahima tuned kernel `ipfrag_time` from 30s to 10s, scaled NIC ring buffers to 4096, and deployed Deep Packet Inspection (DPI) dropping orphan fragments.",
      outcome: "Kernel reassembly queue utilization dropped below 15%; video streaming remained 100% stable; 120,000 patient records protected.",
      metrics: {
        ramBufferSaved: "85% Kernel RAM",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_volumetric_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF VOLUMETRIC SATURATION & PACKET LOSS",
      title: "Formulating the Volumetric Bandwidth Saturation & Packet Loss Model",
      budget: "₹24,00,000",
      incident:
        "Researchers modeled the mathematical interaction between incoming volumetric flood volume, physical pipe capacity, and ingress packet loss probabilities.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that eBPF/XDP combined with Anycast scrubbing ensures $P_{\\text{loss}} = 0.0\\%$.",
      outcome: "Published peer-reviewed mathematical proof; verified across 80,000 simulated volumetric flood conditions.",
      metrics: {
        simulationTrials: "80,000 Test Trials",
        modelAccuracy: "99.8% Predictive Fit",
        modelFramework: "Volumetric Saturation Equation",
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
                Topic 02
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Volumetric DDoS Attacks: UDP Flood, ICMP Ping Flood
            </h1>
            <p className="text-xs text-gray-400">
              Bandwidth saturation (Gbps/Tbps), UDP high-port floods, ICMP echo replies, eBPF/XDP filtering, and IT Act Section 66F.
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
              Volumetric Saturation Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Volumetric Saturation: Choking Network Pipes &amp; Hardware Interrupts
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              A <strong>Volumetric DDoS Attack</strong> is engineered to saturate the physical bandwidth capacity (Gbps/Tbps) of 
              internet uplinks, border routers, and stateful firewalls. When incoming attack volume exceeds the network link capacity, 
              upstream ISP routers drop all incoming packets indiscriminately, preventing legitimate customer transactions from reaching the enterprise. 
              The primary volumetric vectors include <strong>UDP High-Port Floods</strong> (forcing victim operating systems to generate millions of ICMP Port Unreachable error packets), 
              <strong>ICMP Echo (Ping) Floods</strong> (saturating symmetrical and asymmetrical links), and <strong>UDP Fragmentation Floods</strong> 
              (filling kernel reassembly memory buffers).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Volumetric Vectors Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Primary Volumetric Attack Vectors
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                UDP Flood: 1400-byte junk padding ➔ 50k PPS per bot ➔ 570+ Gbps flood!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Volumetric attacks use connectionless protocols (UDP/ICMP) to forge spoofed source IPs without handshake overhead, 
                saturating downstream pipes and forcing outbound error replies that choke smaller upload links.
              </p>
            </div>

            {/* Hardware & Kernel Defense Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Hardware eBPF/XDP &amp; BGP Flowspec Defense
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">BGP Flowspec (RFC 5575):</strong> Discards UDP flood traffic at Tier-1 ISP core routers.</li>
                <li>• <strong className="text-purple-300">eBPF / XDP Drivers:</strong> Drops packets at 40+ Million PPS inside the NIC ring buffer.</li>
                <li>• <strong className="text-amber-300">ICMP Rate Limiting:</strong> Caps kernel error replies (`icmp_ratelimit = 100`).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Volumetric Threat Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Volumetric Flood Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Volumetric Pipe Saturation vs Hardware eBPF/XDP Scrubbing
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a 650 Gbps volumetric UDP/ICMP flood is intercepted by Tier-1 ISP BGP Flowspec filters, 
              hardware eBPF/XDP drivers, and kernel ICMP rate limiters before reaching the enterprise origin:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INGRESS VOLUMETRIC FLOOD */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. VOLUMETRIC INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  650 Gbps / 42 Mpps
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  UDP High-Port Flood
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  ICMP Ping Flood
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: UPSTREAM TIER-1 ISP BGP FLOWSPEC */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. ISP BGP FLOWSPEC
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  RFC 5575 Core Filter
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CORE SCRUBBING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Drops 1400B Junk UDP
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Rate-Limit 0 at Core!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: DRIVER eBPF / XDP WIRE-SPEED DROP */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. eBPF / XDP HOOK
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  NIC Ring Buffer Drop
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  40+ Mpps CAPACITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  XDP_DROP in Driver
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Zero Kernel SoftIRQ Lock!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: KERNEL ICMP RATE LIMITER */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. KERNEL ICMP CAP
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  icmp_ratelimit = 100
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  UPLINK SHIELD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Caps Outbound Errors
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Prevents Asym Choke!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: CLEAN ORIGIN TRAFFIC */}
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
                  0% Packet Loss
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Clean User Banking!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Volumetric Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Volumetric Attack Vector &amp; Hardware Saturation Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a volumetric attack mechanism below to examine its target layer, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(vectorDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedVectorKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedVectorKey === item.key
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeVector.categoryBadge)}>
                    {activeVector.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Target: {activeVector.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeVector.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeVector.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeVector.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Packet Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeVector.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Volumetric Bandwidth Saturation Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Volumetric Bandwidth Saturation &amp; Packet Loss Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust ingress flood volume $V_{\text{ingress}}$, enterprise physical uplink capacity $C_{\text{pipe}}$, 
              and cloud scrubbing capacity $C_{\text{scrubbing}}$ to model link utilization and packet loss rate $P_{\text{loss}} = 1 - e^{-\frac{\max(0, V - C)}{\sigma}}$:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Bandwidth &amp; Pipe Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Ingress Flood Volume (V_ingress):</span>
                  <span className="text-rose-400 font-bold font-mono">{ingressVolumeGbps} Gbps</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={ingressVolumeGbps}
                  onChange={(e) => setIngressVolumeGbps(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Enterprise Physical Uplink (C_pipe):</span>
                  <span className="text-cyan-400 font-bold font-mono">{enterprisePipeGbps} Gbps</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="5"
                  value={enterprisePipeGbps}
                  onChange={(e) => setEnterprisePipeGbps(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Scrubbing Network Capacity (C_scrub):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setScrubbingCapacityGbps(10)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      scrubbingCapacityGbps === 10
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (10G)
                  </button>
                  <button
                    onClick={() => setScrubbingCapacityGbps(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      scrubbingCapacityGbps === 500
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    500 Gbps (ISP)
                  </button>
                  <button
                    onClick={() => setScrubbingCapacityGbps(5000)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      scrubbingCapacityGbps === 5000
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    5 Tbps (Anycast)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Pipe Saturation Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Link Utilization Ratio</span>
                  <span className="text-lg font-extrabold text-cyan-400">{bandwidthSimulation.linkUtilization}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Effective Cap: {bandwidthSimulation.effectiveCapacity} Gbps</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Ingress Packet Loss Rate</span>
                  <span className="text-lg font-extrabold text-white">{bandwidthSimulation.finalLoss}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">ISP Edge Buffer Drop Rate</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", bandwidthSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Bandwidth Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{bandwidthSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Volumetric Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              eBPF / XDP &amp; BGP Flowspec Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production eBPF / XDP Driver &amp; BGP Flowspec Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production C eBPF / XDP kernel driver hooks dropping UDP floods at 40 Mpps wire speed, 
              BGP Flowspec (RFC 5575) router configurations, and Linux sysctl network stack hardening scripts:
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
                Wire-Speed Driver
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita scrub 650 Gbps UDP floods, 
              harden SCADA routers against ping floods, and eliminate fragmentation overflows across West Bengal:
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
                  The Incident &amp; Volumetric Flood Vector
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
              7. Legal Penalties for Volumetric DDoS &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              treat Volumetric DDoS attacks with severe civil compensation liabilities and life imprisonment penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Volumetric attacks paralyzing critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">IPC Section 420:</strong> Volumetric DDoS extortion (Up to 7 years prison).
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
                  <strong>Blocking All ICMP Packets:</strong> Breaks Path MTU Discovery (PMTUD), causing large web pages to hang.
                </li>
                <li>
                  <strong>Leaving ICMP Rate Limiting Disabled:</strong> Inbound floods force outbound error replies that choke the uplink.
                </li>
                <li>
                  <strong>Attempting iptables Filtering for 40 Mpps Floods:</strong> `sk_buff` allocation locks CPU Core 0 in softirq.
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
                  <strong>Deploy eBPF / XDP Driver Drops:</strong> Discards packets in hardware ring buffers at 40+ Mpps wire speed.
                </li>
                <li>
                  <strong>Inject BGP Flowspec (RFC 5575) Rules:</strong> Scrubs volumetric junk payloads directly at Tier-1 ISP cores.
                </li>
                <li>
                  <strong>Tune `icmp_ratelimit = 100`:</strong> Restricts outbound error generation to protect smaller egress links.
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
                  Why does an asymmetrical broadband connection (1 Gbps download vs 100 Mbps upload) experience total collapse during an ICMP ping flood?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why do eBPF/XDP driver hooks achieve 20x higher packet drop rates than traditional Linux `iptables` rules?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set Scrubbing Capacity to 5 Tbps (Anycast) and observe packet loss collapse to 0.00%!
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
                <span>Volumetric DDoS saturates bandwidth (Gbps/Tbps) and packet processing rates (Mpps).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>UDP floods force target operating systems to generate ICMP Port Unreachable error packets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ICMP rate limiting (`icmp_ratelimit = 100`) prevents outbound uplink choke.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>eBPF/XDP drops volumetric floods inside the NIC driver at 40+ Mpps without kernel overhead.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BGP Flowspec (RFC 5575) discards volumetric junk traffic at upstream Tier-1 ISP core routers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes Volumetric Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Volumetric DDoS FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Bandwidth Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Volumetric DDoS Attacks: UDP Flood, ICMP Ping Flood (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Volumetric DDoS attacks represent the most brute-force category of cyber threats, weaponizing raw data volume to overwhelm physical fiber pipes and network interface buffers! Understand the mechanics: UDP High-Port Floods exploit connectionless IP spoofing to overwhelm downstream bandwidth and force outbound ICMP Port Unreachable error packets that choke smaller upload pipes; ICMP Echo (Ping) Floods generate equal-sized echo replies that saturate symmetrical lines; and UDP Fragmentation Floods exhaust kernel reassembly memory buffers (`ipfrag_high_thresh`). Master modern high-performance countermeasures: inject BGP Flowspec (RFC 5575) filtering rules directly into Tier-1 ISP core routers to scrub volumetric floods before reaching enterprise uplinks, deploy C eBPF / XDP driver hooks inside network card ring buffers to drop malicious packets at 40+ Million PPS per core without kernel softirq overhead, tune `net.ipv4.icmp_ratelimit = 100` to prevent outbound reply choke, and reduce `net.ipv4.ipfrag_time` to 10 seconds. Remember that Section 66F of the Indian IT Act treats volumetric cyber terrorism against critical infrastructure with Life Imprisonment, and Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
