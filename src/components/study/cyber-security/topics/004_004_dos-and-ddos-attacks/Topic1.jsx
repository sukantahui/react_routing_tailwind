import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgDdosId = useId();

  // Studio 1: Active Botnet Vector Selection
  const [selectedBotnetKey, setSelectedBotnetKey] = useState("mirai_iot_credential_scanner");

  // Studio 2: Live Botnet Aggregation Calculator State
  const [botCount, setBotCount] = useState(250000); // 10,000 to 1,000,000 Bots
  const [nodeBandwidthMbps, setNodeBandwidthMbps] = useState(5.0); // 1.0 to 20.0 Mbps per bot
  const [scrubbingCapacityGbps, setScrubbingCapacityGbps] = useState(10); // 10 = None (Origin Link), 200 = ISP Scrubber, 5000 = 5 Tbps Anycast Cloud

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_scrubbing_defense");

  // Studio 4: DDoS Defense Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("dga_generator_detector_python");

  // 8 Botnet Architecture & DDoS Profiles for Studio 1
  const botnetDatabase = {
    mirai_iot_credential_scanner: {
      key: "mirai_iot_credential_scanner",
      name: "1. Mirai IoT Botnet & Default Credential Harvester",
      category: "IOT CONSUMER DEVICE EXPLOITATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      c2Architecture: "Centralized C2 with Telnet Scanning Engine",
     exploitationVector:
        "Mirai-style malware historically propagated by targeting vulnerable IoT devices with exposed remote-access services and weak or default credentials. Compromised cameras, DVRs, and routers could be enrolled into a botnet and coordinated for large-scale DDoS activity. Operational scanning and credential details are omitted.",
      vulnerabilityImpact:
        "Historic 1+ Tbps volumetric DDoS floods capable of bringing down major DNS providers (Dyn 2016) and national telecommunications networks.",
      telemetryIndicator:
        "Unusual outbound connection-scanning activity from unmanaged IoT devices targeting remote-access services",
      resilientDefense: "Disabling default passwords, enforcing network segmentation for IoT hardware, and deploying BGP Anycast scrubbing.",
      codeSnippet: `// Mirai Botnet — Safe Conceptual Flow:
      // 1. Identify vulnerable IoT devices
      // 2. Detect weak or default security configurations
      // 3. Compromise vulnerable devices
      // 4. Enroll compromised devices into a botnet
      // 5. Coordinate defensive analysis and simulation
      // Credential lists, scanning logic, and attack procedures are omitted.`
    },
    p2p_kademlia_dht_topology: {
      key: "p2p_kademlia_dht_topology",
      name: "2. Peer-to-Peer (P2P) DHT Botnet Resilience",
      category: "DECENTRALIZED COMMAND & CONTROL",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      c2Architecture: "Kademlia Distributed Hash Table (DHT)",
      exploitationVector:
        "Eliminates central C2 servers; every infected bot acts as a client, relay, and command dispatcher; commands are signed cryptographically and propagated through the mesh network.",
      vulnerabilityImpact:
        "Immune to law enforcement domain seizures and IP sinkholing; seizing 1,000 nodes leaves the remaining 50,000 bots fully functional.",
      telemetryIndicator: "High-frequency UDP/P2P overlay traffic exchanges between globally dispersed residential endpoints",
      resilientDefense: "Cryptographic poisoning of P2P lookup tables (sybil attacks) and behavioral host anomaly isolation.",
      codeSnippet: `// P2P / DHT Botnet Architecture:
// [Bot 1] ⇄ [Bot 2] ⇄ [Bot 3] ⇄ [Bot 4] ...
// Botmaster injects cryptographically signed attack command into ANY single node
// Command ripples across all 100,000 nodes in seconds with ZERO central C2!`
    },
    dga_domain_generation_algorithms: {
      key: "dga_domain_generation_algorithms",
      name: "3. Domain Generation Algorithms (DGA) & Ephemeral C2",
      category: "ALGORITHMIC C2 EVASION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      c2Architecture: "Deterministic Pseudo-Random Domain Generator",
      exploitationVector:
        "The malware generates 500 pseudo-random domain names daily using a shared date/seed; the botmaster registers only 1 domain per day, rendering static DNS blacklists completely obsolete.",
      vulnerabilityImpact:
        "Prevents security analysts and firewalls from pre-blocking C2 communication channels.",
      telemetryIndicator: "Bursts of NXDOMAIN (Non-Existent Domain) responses in DNS resolver logs as bots query unallocated algorithm domains",
      resilientDefense: "DNS query entropy analysis, machine learning DGA classifiers, and automated sinkholing.",
      codeSnippet: `// Python DGA Generator:
import hashlib
def generate_dga_domain(date_str, index):
    return hashlib.md5(f"{date_str}_{index}".encode()).hexdigest()[:12] + ".in"
# Generates 500 daily domains: '3a8f9c1e0d2b.in', '7b4e2f9a1c8d.in' ...`
    },
    fast_flux_dns_ip_rotation: {
      key: "fast_flux_dns_ip_rotation",
      name: "4. Fast-Flux DNS & Proxy Swarm Masking",
      category: "DYNAMIC DNS RECORD PROXYING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      c2Architecture: "Ultra-Short TTL Dynamic DNS Pool",
      exploitationVector:
        "The C2 domain's `A` and `NS` records are continuously rotated every 60 seconds across a pool of thousands of compromised residential proxy bots (Double-Flux).",
      vulnerabilityImpact:
        "Hides the true origin of the central mother C2 server; IP-based firewall blocks become useless within 60 seconds.",
      telemetryIndicator: "DNS responses containing 5-10 distinct global IP addresses with TTLs of 60 seconds or less",
      resilientDefense: "Passive DNS historical tracking and blocking authoritative name servers exhibiting abnormal flux rates.",
      codeSnippet: `// Fast-Flux DNS Record Query (TTL = 60s):
// Minute 01: attacker-c2.net ➔ 185.220.101.5, 103.25.10.8, 198.51.100.4
// Minute 02: attacker-c2.net ➔ 45.33.32.156, 172.56.21.90, 82.102.23.4
// Result: Static firewall IP blocking is completely rendered useless!`
    },
    multivector_concurrency_floods: {
      key: "multivector_concurrency_floods",
      name: "5. Multi-Vector Concurrency Floods",
      category: "SIMULTANEOUS LAYER 3/4/7 ASSAULT",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      c2Architecture: "Multi-Vector Synchronized Orchestrator",
      exploitationVector:
        "The botnet simultaneously launches a 600 Gbps UDP flood (pipe saturation), a 40 Mpps SYN flood (firewall state exhaustion), and a 150k RPS HTTP flood (CPU lockup).",
      vulnerabilityImpact:
        "Single-layer defenses fail: on-premise WAFs are blinded by volumetric saturation, while upstream ISP filters miss application-layer queries.",
      telemetryIndicator: "Concurrent spikes in Gbps bandwidth, PPS packet rates, and Layer 7 HTTP error codes (502/503/504)",
      resilientDefense: "Hybrid DDoS defense: cloud Anycast scrubbing combined with on-premise behavioral WAFs.",
      codeSnippet: `// Multi-Vector DDoS Profile:
// Vector 1 (Volumetric)  : 600 Gbps DNS Amplification ➔ Saturates Upstream Fiber Pipe
// Vector 2 (Protocol)    : 35 Million PPS SYN Flood   ➔ Fills Firewall Conntrack Tables
// Vector 3 (Application) : 150,000 RPS HTTP POST Flood➔ Locks Database CPU & RAM`
    },
    booter_stresser_commercial_api: {
      key: "booter_stresser_commercial_api",
      name: "6. Commercial Booter / Stresser DDoS Services",
      category: "DDOS-AS-A-SERVICE (DaaS)",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      c2Architecture: "Web-Based API-Driven Attack Rental",
      exploitationVector:
        "Criminal platforms rent multi-terabit botnets to non-technical users for ₹500 to ₹5,000/hour, automating bypass scripts and reflection vectors via simple web portals.",
      vulnerabilityImpact:
        "Democratizes devastating multi-gigabit cyber warfare, allowing script kiddies and extortionists to target enterprise web infrastructure effortlessly.",
      telemetryIndicator: "Standardized attack packet payloads matching known open-source booter attack scripts",
      resilientDefense: "Law enforcement booter infrastructure takedowns and upstream threat intelligence blocklists.",
      codeSnippet: `// Booter / Stresser API Attack Request:
POST https://stresser-attacker-c2.net/api/v1/attack
{
    "target": "103.25.10.50", "port": 443, "duration_seconds": 3600,
    "method": "CLOUDFLARE_BYPASS_UAM", "threads": 500
}`
    },
    pulse_wave_hit_and_run: {
      key: "pulse_wave_hit_and_run",
      name: "7. Pulse Wave & Hit-and-Run DDoS Bursts",
      category: "BURST TRAFFIC SCRUBBER EVASION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      c2Architecture: "Precision Timing Synchronized Controller",
      exploitationVector:
        "The botnet unleashes 500 Gbps for 45 seconds, stops for 3 minutes, and pulses again; legacy cloud scrubbing rerouting takes 2-3 minutes, meaning the attack finishes before defense engages.",
      vulnerabilityImpact:
        "Intermittent network paralysis that defeats on-demand BGP route redirection auto-scalers.",
      telemetryIndicator: "Periodic square-wave bandwidth graphs with vertical spike ascents and zero background traffic",
      resilientDefense: "Always-on inline cloud Anycast proxy routing with zero BGP route convergence delay.",
      codeSnippet: `// Pulse Wave Timing Pattern:
// 00:00 - 00:45 : Ingress 600 Gbps Spike ➔ Origin Crashes!
// 00:45 - 03:00 : Traffic = 0 Gbps (Scrubber Auto-Scaler resets)
// 03:00 - 03:45 : Ingress 600 Gbps Spike ➔ Origin Crashes Again!
// Mitigation    : Always-On Cloud Proxy (Zero BGP route convergence delay!)`
    },
    direct_to_origin_bypassing: {
      key: "direct_to_origin_bypassing",
      name: "8. Direct-to-Origin Proxy Bypassing",
      category: "RECONNAISSANCE PROXY CIRCUMVENTION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      c2Architecture: "Reconnaissance-Driven Direct Target Flooding",
      exploitationVector:
        "The attacker discovers the true unproxied IP address of the backend server (via SSL certificate search engines like Censys/Shodan or email headers) and floods the origin directly, bypassing Cloudflare.",
      vulnerabilityImpact:
        "Renders cloud WAF and Anycast scrubbing completely useless as traffic never traverses the cloud proxy.",
      telemetryIndicator: "High-volume ingress traffic arriving directly on the origin server's public network interface",
      resilientDefense: "Origin firewall restricting ingress ports 80/443 exclusively to verified cloud proxy IP CIDR blocks.",
      codeSnippet: `// Origin Firewall Lockdown Rule (iptables):
iptables -A INPUT -p tcp -m multiport --dports 80,443 -s 173.245.48.0/20 -j ACCEPT
iptables -A INPUT -p tcp -m multiport --dports 80,443 -s 103.21.244.0/22 -j ACCEPT
iptables -A INPUT -p tcp -m multiport --dports 80,443 -j DROP # Drops direct bypass!`
    }
  };

  const activeBotnet = botnetDatabase[selectedBotnetKey];

  // Studio 2: Live Botnet Aggregation Calculations
  const botnetSimulation = useMemo(() => {
    // Total aggregate attack bandwidth in Gbps:
    const totalAttackGbps = (botCount * nodeBandwidthMbps) / 1000.0;
    
    // Saturation Probability:
    let rawSaturationProb = 0;
    if (totalAttackGbps &le; scrubbingCapacityGbps) {
      rawSaturationProb = 0.0;
    } else {
      const surplus = totalAttackGbps - scrubbingCapacityGbps;
      rawSaturationProb = (1 - Math.exp(-surplus / 50.0)) * 100;
    }

    const finalSaturation = rawSaturationProb > 99.9 ? 99.9 : rawSaturationProb;
    const overloadRatio = (totalAttackGbps / scrubbingCapacityGbps).toFixed(1);

    return {
      totalAttackGbps: totalAttackGbps.toFixed(1),
      finalSaturation: finalSaturation.toFixed(2),
      overloadRatio,
      badgeClass: parseFloat(finalSaturation) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(finalSaturation) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(finalSaturation) < 1
        ? `ANYCAST SCRUBBING SHIELD ACTIVE: Cloud Scrubbing Capacity (${scrubbingCapacityGbps} Gbps) exceeds total botnet aggregate flood (${totalAttackGbps} Gbps); saturation probability is 0.00%!`
        : `CRITICAL NETWORK SATURATION: Total botnet attack bandwidth (${totalAttackGbps} Gbps) exceeds scrubbing capacity (${scrubbingCapacityGbps} Gbps) by ${overloadRatio}x, causing ${finalSaturation}% packet loss!`
    };
  }, [botCount, nodeBandwidthMbps, scrubbingCapacityGbps]);

  // Studio 4: DDoS Defense Production Code Database
  const codeDatabase = {
    dga_generator_detector_python: {
      name: "Python Script for Domain Generation Algorithm (DGA) Generation & Entropy Detection",
      code: `import hashlib
import math
from datetime import datetime

def calculate_shannon_entropy(domain_string):
    prob_dict = {char: domain_string.count(char) / len(domain_string) for char in set(domain_string)}
    return -sum(p * math.log2(p) for p in prob_dict.values())

def generate_and_inspect_dga_domains():
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    print(f"[*] --- GENERATING & DETECTING DGA DOMAINS FOR SEED: {today_str} ---")
    
    for i in range(5):
        # Generate algorithmic domain using MD5 hash seed
        hash_digest = hashlib.md5(f"{today_str}_{i}".encode()).hexdigest()[:12]
        dga_domain = f"{hash_digest}.in"
        entropy = calculate_shannon_entropy(hash_digest)
        
        print(f"  [+] Generated Domain: {dga_domain:<20} | Entropy: {entropy:.2f} bits/symbol")
        if entropy > 3.2:
            print(f"      [!] DGA ANOMALY DETECTED: Flagged by Machine Learning DNS Classifier!")

generate_and_inspect_dga_domains()`,
      explanation: "Python script generating algorithmic pseudo-random DGA domain names from daily seeds and detecting them using Shannon character entropy analysis."
    },
    bgp_flowspec_mitigation_conf: {
      name: "BGP Flowspec (RFC 5575) Juniper / Cisco Upstream Filtering Configuration",
      code: `# BGP Flowspec Filtering Configuration to Scrub Distributed Reflection Floods at ISP Core:
routing-options {
    flow {
        route kolkata-fintech-ddos-filter {
            match {
                destination 103.25.10.50/32;       # Targeted Enterprise VIP
                protocol [ udp icmp ];             # Target Protocols
                destination-port [ 53 123 389 ];   # DNS, NTP, CLDAP Amplifiers
                packet-length 1200-1500;           # Oversized Reflection Packets
            }
            then {
                rate-limit 0;                      # Drop 100% of attack traffic at ISP Core!
                community [ "target:65000:666" ];  # Blackhole community tag
            }
        }
    }
}
# Result: 800 Gbps reflection flood scrubbed in ISP Tier-1 hardware without touching enterprise fiber!`,
      explanation: "BGP Flowspec (RFC 5575) router configuration injecting granular ACL filtering rules into upstream Tier-1 ISP core routers to scrub reflection floods before reaching the customer edge."
    },
    origin_firewall_lockdown_sh: {
      name: "Linux iptables Shell Script for Strict Origin Firewall Proxy Whitelisting",
      code: `#!/bin/bash
# Strict Origin Firewall Lockdown: Block all direct traffic except from verified Cloudflare IP ranges!

echo "[*] Flushing legacy iptables rules..."
iptables -F

# 1. Allow Loopback and Established Connections
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 2. Allow Inbound HTTP/HTTPS ONLY from Cloudflare IPv4 CIDR Ranges
CF_IPS=("173.245.48.0/20" "103.21.244.0/22" "103.22.200.0/22" "103.31.4.0/22" "141.101.64.0/18" "108.162.192.0/18" "190.93.240.0/20")

for ip in "\${CF_IPS[@]}"; do
    iptables -A INPUT -p tcp -m multiport --dports 80,443 -s "\$ip" -j ACCEPT
done

# 3. DROP all other direct-to-origin bypass traffic
iptables -A INPUT -p tcp -m multiport --dports 80,443 -j DROP

echo "[+] Origin Firewall LOCKED DOWN: Direct-to-Origin DDoS Bypassing Neutralized!"`,
      explanation: "Linux iptables shell script enforcing strict origin firewall whitelisting, dropping all direct HTTP/HTTPS connections not originating from verified cloud scrubbing proxy IP ranges."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_scrubbing_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Intercepting a 450 Gbps Distributed IoT Botnet Flood on Payment Switches",
      threatType: "MULTI-VECTOR IOT BOTNET FLOOD (450 Gbps UDP + 30 Mpps SYN)",
      budget: "₹58,00,000",
      incident:
        "A commercial stresser botnet launched a 450 Gbps multi-vector flood from 180,000 compromised IoT devices against the core financial settlement switch.",
      defenseStrategy:
        "Mamata routed all incoming traffic through a cloud Anycast scrubbing network and pushed BGP Flowspec rate-limiting rules to upstream Tier-1 ISPs.",
      outcome: "450 Gbps absorbed globally across 300 Anycast PoPs; only clean 8.2 Gbps reached the origin; zero transaction outages across Kolkata banks.",
      metrics: {
        attackPeakBandwidth: "450.0 Gbps",
        botnetNodesFiltered: "180,000 IoT Bots",
        settlementSwitchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_p2p_recon",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "P2P BOTNET RECONNAISSANCE & SYN FLOOD PROBING",
      title: "Detecting P2P Botnet Reconnaissance Probing SCADA Substation Gateways",
      budget: "₹41,00,000",
      incident:
        "A decentralized P2P botnet scanned 18 electrical substation gateway IPs, launching distributed 50 Mpps SYN floods to crash telemetry relays.",
      defenseStrategy:
        "Debangshu enabled kernel TCP SYN Cookies across all industrial boundary gateways and deployed inline hardware scrubbing appliances with BCP 38 filtering.",
      outcome: "100% of half-open SYN packets handled with zero memory allocation; zero substation telemetry latency; power grid stable.",
      metrics: {
        synPacketsAbsorbed: "50,000,000 PPS",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_mirai_variant",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "120,000-NODE MIRAI VARIANT (Emergency Telemedicine Portal Flood)",
      title: "Defending Oncology Telemedicine Portals Against a 120k-Node Mirai Flood",
      budget: "₹28,00,000",
      incident:
        "During emergency peak hours, an extortionist botnet flooded the patient oncology video portal with 250 Gbps of UDP and Slowloris traffic.",
      defenseStrategy:
        "Mahima activated Cloudflare Under Attack Mode (5-second JavaScript proof-of-work challenge) and locked down the origin firewall to Cloudflare IPs only.",
      outcome: "99.9% of dumb botnet requests dropped at the cloud edge; genuine doctor-patient consultations continued uninterrupted; 120,000 records protected.",
      metrics: {
        botRequestsBlocked: "99.9% at Edge",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_botnet_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF DISTRIBUTED BOTNET FLOOD DYNAMICS",
      title: "Formulating the Distributed Botnet Ingress & Cloud Scrubbing Model",
      budget: "₹23,00,000",
      incident:
        "Researchers modeled the mathematical interaction between aggregate botnet node volume, upstream ISP pipe capacity, and Anycast cloud scrubbing saturation.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that Anycast networks with C_scrubbing &gt; 5 × B_attack achieve zero link saturation.",
      outcome: "Published peer-reviewed mathematical proof; verified across 75,000 simulated distributed botnet scenarios.",
      metrics: {
        simulationTrials: "75,000 Test Trials",
        modelAccuracy: "99.7% Predictive Fit",
        modelFramework: "Botnet Aggregation Equation",
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
                Topic 01
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              From DoS to Distributed Denial of Service (DDoS)
            </h1>
            <p className="text-xs text-gray-400">
              The Botnet Multiplier, Mirai IoT scanners, P2P Kademlia C2, BGP Anycast scrubbing, BGP Flowspec, and IT Act Section 66F.
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
              The Botnet Multiplier &amp; Evolution
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Distributed Denial of Service: Weaponizing Global Zombie Botnets
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              While a traditional single-source DoS attack is constrained by the attacker's single network uplink (easily blocked by a single firewall rule), 
              a <strong>Distributed Denial of Service (DDoS)</strong> attack weaponizes thousands or millions of geographically dispersed compromised 
              devices (<strong>Zombies / Bots</strong>) coordinated by an adversary (<strong>Botmaster</strong>) through Command and Control (C2) infrastructure. 
              Modern botnets utilize resilient decentralized topologies like <strong>Peer-to-Peer (P2P Kademlia DHT)</strong>, 
              <strong>Domain Generation Algorithms (DGA)</strong>, and <strong>Fast-Flux DNS</strong> to evade takedowns, launching simultaneous 
              <strong>Multi-Vector Concurrency Floods</strong> (1+ Tbps volumetric UDP, 50 Mpps TCP SYN, and 200k RPS HTTP requests) that overwhelm 
              traditional perimeter firewalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Botnet Multiplier Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The Botnet Multiplier: Mirai &amp; P2P C2
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Mirai (2016): 62 default IoT passwords ➔ 400,000 bots ➔ 1.2 Tbps global flood!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Compromising vulnerable IoT cameras and routers transforms consumer devices into high-bandwidth reflection weapons, 
                generating floods that exceed the bandwidth of entire national internet backbones.
              </p>
            </div>

            {/* BGP Anycast & Cloud Scrubbing Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                BGP Anycast &amp; Cloud Scrubbing Centers
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">BGP Anycast Routing:</strong> Advertises the same IP from 300+ global PoPs, diluting floods.</li>
                <li>• <strong className="text-purple-300">BGP Flowspec (RFC 5575):</strong> Drops packet anomalies at upstream Tier-1 ISP core routers.</li>
                <li>• <strong className="text-amber-300">Origin Firewall Lockdown:</strong> Prevents direct-to-origin proxy bypassing.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Botnet Swarm vs Anycast Scrubbing */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Distributed Botnet Swarm Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Distributed Botnet Ingress vs Global BGP Anycast Scrubbing
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a 500,000-node global botnet flood is dispersed across BGP Anycast scrubbing centers 
              (Frankfurt, Singapore, Ashburn) so only clean, filtered traffic reaches the Kolkata origin server:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: BOTMASTER C2 */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. BOTMASTER C2
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Command Dispatch
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  C2 TOPOLOGIES:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  P2P DHT / DGA Seeds
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Fast-Flux DNS
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: 500k GLOBAL ZOMBIE BOT SWARM */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. ZOMBIE SWARM
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  500,000 IoT Nodes
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  MULTI-VECTOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  1.2 Tbps UDP Flood
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  50 Mpps SYN Flood
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: BGP ANYCAST GLOBAL DILUTION */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. BGP ANYCAST
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Global Dilution (300 PoPs)
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  LOCAL ABSORPTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Frankfurt: 2.1 Gbps
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Singapore: 1.8 Gbps
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: CLOUD SCRUBBING & FLOWSPEC */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. CLOUD SCRUBBING
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Hardware ASIC Filters
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PACKET SCRUBBING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  BGP Flowspec (RFC 5575)
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  99.8% Flood Filtered!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: CLEAN TRAFFIC TO ORIGIN SERVER */}
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
                  CLEAN TRAFFIC:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Encrypted GRE Tunnel
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Service Uptime!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Botnet Architecture Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Botnet Architecture &amp; DDoS Exploit Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a botnet mechanism below to examine its C2 architecture, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(botnetDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedBotnetKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedBotnetKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  BOTNET
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeBotnet.categoryBadge)}>
                    {activeBotnet.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Topology: {activeBotnet.c2Architecture}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeBotnet.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeBotnet.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeBotnet.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeBotnet.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeBotnet.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Topology / Code Pattern
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeBotnet.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Botnet Aggregation Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Botnet Aggregation &amp; Cloud Scrubbing Capacity Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust botnet zombie count N, individual node bandwidth B_i, and cloud scrubbing capacity C_scrubbing
              to model total attack bandwidth B_total = N × B_i and link saturation probability P_saturation = 1 - e^(-max(0, B_total - C) / σ):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Botnet Swarm Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Zombie Bot Count (N):</span>
                  <span className="text-cyan-400 font-bold font-mono">{botCount.toLocaleString()} Bots</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="25000"
                  value={botCount}
                  onChange={(e) => setBotCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Bandwidth per Bot (B_i):</span>
                  <span className="text-rose-400 font-bold font-mono">{nodeBandwidthMbps.toFixed(1)} Mbps</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="20.0"
                  step="0.5"
                  value={nodeBandwidthMbps}
                  onChange={(e) => setNodeBandwidthMbps(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Scrubbing Network Capacity (C):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setScrubbingCapacityGbps(10)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      scrubbingCapacityGbps === 10
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    10 Gbps (None)
                  </button>
                  <button
                    onClick={() => setScrubbingCapacityGbps(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      scrubbingCapacityGbps === 500
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
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
                  &gt;
                    5 Tbps (Anycast)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">DDoS Ingress Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Total Aggregate Flood</span>
                  <span className="text-lg font-extrabold text-rose-400">{botnetSimulation.totalAttackGbps} Gbps</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Overload Ratio: {botnetSimulation.overloadRatio}x</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Link Saturation Probability</span>
                  <span className="text-lg font-extrabold text-white">{botnetSimulation.finalSaturation}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Surplus / Deficit vs Scrubber</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", botnetSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Cloud Mitigation Telemetry:</span>
                <p className="mt-1 font-extrabold text-sm">{botnetSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - DDoS Defense Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              DGA Detectors &amp; BGP Flowspec Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production DGA Detection &amp; BGP Flowspec Scrubbing Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python DGA domain generators and Shannon entropy analyzers, BGP Flowspec (RFC 5575) router configurations, 
              and Linux origin firewall lockdown scripts:
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
                Production Defense
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita scrub 450 Gbps botnet floods, 
              neutralize P2P reconnaissance, and defend telemedicine portals across West Bengal:
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
                  The Incident &amp; Botnet Ingress Attack
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
              7. Legal Liabilities for Distributed Denial of Service &amp; Botnets in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national security statutes, and data protection regulations impose the most severe criminal penalties 
              on botnet operators, stresser rental services, and distributed denial of service attackers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Botnet DDoS attacks paralyzing critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(c) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(c):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for botnet contaminants.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to deploy availability safeguards.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Ransom DDoS extortion (Up to 7 years prison).
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
                  <strong>Trying to Blacklist 500,000 Bot IPs at the Firewall:</strong> Fills state tables, causing the firewall to crash.
                </li>
                <li>
                  <strong>Leaking Origin Server IP Addresses:</strong> Allows attackers to bypass Cloudflare and flood the origin directly.
                </li>
                <li>
                  <strong>Relying on On-Demand BGP Scrubbers for Pulse Wave DDoS:</strong> 2-minute route convergence is too slow.
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
                  <strong>Deploy Global BGP Anycast Scrubbing:</strong> Dilutes multi-terabit floods into small local chunks across 300 PoPs.
                </li>
                <li>
                  <strong>Enforce BGP Flowspec (RFC 5575):</strong> Injects ACL rules directly into Tier-1 ISP core routers.
                </li>
                <li>
                  <strong>Lock Down Origin Ingress Firewalls:</strong> Restrict ports 80/443 exclusively to cloud proxy CIDR blocks.
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
                  Why does BGP Anycast routing inherently dilute global DDoS floods without requiring all traffic to travel to a single data center?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why do Domain Generation Algorithms (DGA) and Fast-Flux DNS defeat static firewall and DNS blacklists?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set Scrubbing Capacity to 5 Tbps (Anycast) and observe saturation probability collapse to 0.00%!
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
                <span>Single-source DoS is blocked by single IP filters; DDoS requires global Anycast scrubbing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Botnets use P2P DHT and Domain Generation Algorithms (DGA) to prevent C2 takedowns.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Mirai (2016) weaponized 62 default IoT passwords across 400,000 cameras to break 1 Tbps.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BGP Anycast routes attack traffic to the closest local scrubbing center, diluting the flood.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BGP Flowspec (RFC 5575) allows injecting granular firewall rules into upstream ISP core routers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes DDoS Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="From DoS to DDoS FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Distributed Botnet Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="From DoS to Distributed Denial of Service (DDoS) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The transition from single-source DoS to Distributed Denial of Service (DDoS) completely transformed enterprise cybersecurity! Understand the Botnet Multiplier: while a single attacker is bottlenecked by their physical connection, a botnet commands 500,000 compromised IoT devices, smart TVs, and cloud servers across 120 countries, generating multi-terabit floods that cannot be stopped by simple IP blacklisting. Study botnet C2 evasion mechanisms: Domain Generation Algorithms (DGAs) generating 500 pseudo-random domains daily, Fast-Flux DNS shifting C2 IP addresses every 60 seconds, and decentralized Peer-to-Peer (P2P Kademlia DHT) networks with zero single points of failure. Master modern enterprise defense: deploy BGP Anycast Routing across 300+ global scrubbing centers to dilute terabit floods locally, push BGP Flowspec (RFC 5575) filtering rules directly into Tier-1 ISP core routers, and lock down origin server firewalls so that direct-to-origin bypassing is strictly dropped! Remember that Section 66F of the Indian IT Act treats DDoS attacks against critical infrastructure as Cyber Terrorism carrying mandatory Life Imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
