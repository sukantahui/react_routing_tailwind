import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgAmplificationId = useId();

  // Studio 1: Active Amplification Vector Selection
  const [selectedAmpKey, setSelectedAmpKey] = useState("dns_edns0_any_query");

  // Studio 2: Live Amplification Multiplier Calculator State
  const [attackerRequestMbps, setAttackerRequestMbps] = useState(500); // 100 Mbps to 20,000 Mbps (20 Gbps)
  const [selectedProtocolFactor, setSelectedProtocolFactor] = useState("ntp_monlist"); // dns (70), ntp (556), memcached (50000), cldap (70), snmp (650), ssdp (30)
  const [scrubbingCapacityGbps, setScrubbingCapacityGbps] = useState(10); // 10 = None (Origin Link), 500 = ISP Scrubber, 10000 = 10 Tbps Anycast Cloud

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_amplification_defense");

  // Studio 4: Amplification Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("bgp_flowspec_reflection_filter");

  // Protocol amplification lookup database
  const protocolFactors = {
    memcached_udp: { name: "Memcached UDP (Port 11211)", factor: 51200, unit: "51,200x Multiplier" },
    snmp_getbulk: { name: "SNMPv2c GetBulk (Port 161)", factor: 650, unit: "650x Multiplier" },
    ntp_monlist: { name: "NTP Mode 7 monlist (Port 123)", factor: 556, unit: "556x Multiplier" },
    chargen_loop: { name: "CHARGEN Stream (Port 19)", factor: 358, unit: "358x Multiplier" },
    ws_discovery: { name: "WS-Discovery ONVIF (Port 3702)", factor: 100, unit: "100x Multiplier" },
    dns_edns0: { name: "DNSSEC EDNS0 ANY (Port 53)", factor: 70, unit: "70x Multiplier" },
    cldap_search: { name: "CLDAP Active Directory (Port 389)", factor: 70, unit: "70x Multiplier" },
    ssdp_upnp: { name: "SSDP UPnP M-SEARCH (Port 1900)", factor: 30, unit: "30x Multiplier" }
  };

  // 8 Amplification Protocol Profiles for Studio 1
  const amplificationDatabase = {
    dns_edns0_any_query: {
      key: "dns_edns0_any_query",
      name: "1. DNSSEC EDNS0 ANY Query Amplification",
      category: "DOMAIN NAME SYSTEM REFLECTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      udpPort: "UDP Port 53",
      amplificationFactor: "50x to 77x Multiplier",
      exploitationVector:
        "The attacker sends a 45-byte `ANY` query with EDNS0 buffer set to 4096 bytes to an open recursive DNS resolver using a spoofed victim IP; the resolver returns a 3,500-byte DNSSEC response.",
      vulnerabilityImpact:
        "Multiplies 10 Gbps of botnet traffic into over 700 Gbps of raw volumetric saturation, choking enterprise internet fiber links.",
      telemetryIndicator: "Surge in UDP packets originating from port 53 with payload sizes exceeding 3,000 bytes containing DNSSEC resource records",
      resilientDefense: "Enforcing Response Rate Limiting (RRL) in BIND, implementing RFC 8482 minimal ANY responses, and upstream BGP Flowspec.",
      codeSnippet: `// DNS Amplification Query:
// Ingress Query : "dig ANY isc.org @8.8.8.8 +bufsize=4096" (45 Bytes)
// Server Reply  : DNSSEC Key Records & Signatures (3,500 Bytes)
// Amplification : 3,500 / 45 = 77.7x Multiplier!`
    },
    ntp_monlist_mode7: {
      key: "ntp_monlist_mode7",
      name: "2. NTP Mode 7 'monlist' Command Amplification",
      category: "TIME PROTOCOL DIAGNOSTIC ABUSE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      udpPort: "UDP Port 123",
      amplificationFactor: "556x Multiplier",
      exploitationVector:
        "The attacker sends a 234-byte Mode 7 `monlist` diagnostic query; the NTP server returns data on the last 600 clients synced with it across 100 consecutive UDP packets totaling ~48,000 bytes.",
      vulnerabilityImpact:
        "Enables a single 10 Mbps broadband connection to generate over 5.5 Gbps of attack traffic directed at the victim in Kolkata.",
      telemetryIndicator: "Floods of NTP packets originating from port 123 arriving in bursts of 100 consecutive frames with Mode 7 opcodes",
      resilientDefense: "Adding `disable monitor` and `restrict default nomodify notrap nopeer noquery` to `/etc/ntp.conf`.",
      codeSnippet: `// NTP monlist Amplification:
// Ingress Request : 234 Bytes (NTP Mode 7 query)
// Server Response : 100 UDP Packets * 480B = 48,000 Bytes
// Amplification AF: 48,000 / 234 = 556x Multiplier!`
    },
    memcached_udp_reflection: {
      key: "memcached_udp_reflection",
      name: "3. Memcached UDP Key-Value Amplification (1.35 Tbps)",
      category: "DATABASE CACHE KEY RETRIEVAL",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      udpPort: "UDP Port 11211",
      amplificationFactor: "10,000x to 51,200x Multiplier",
      exploitationVector:
        "Memcached servers exposed to the WAN on UDP port 11211 allow unauthenticated attackers to set a 1MB value and retrieve it with a 15-byte `get <key>` request, returning megabytes of data.",
      vulnerabilityImpact:
        "Unleashed the historic 1.35 Tbps DDoS flood against GitHub in 2018, the largest recorded volumetric reflection attack in internet history.",
      telemetryIndicator: "Massive streams of UDP fragments originating from port 11211 containing cached application strings",
      resilientDefense: "Configuring `/etc/memcached.conf` with `-l 127.0.0.1` and `-U 0` to disable the UDP listener completely.",
      codeSnippet: `// Memcached Amplification Math:
// Attacker Query : "get a\\r\\n" (15 Bytes over UDP Port 11211)
// Server Response: 750 KB Cached Payload across hundreds of packets
// Amplification  : 750,000 / 15 = 50,000x Multiplier!`
    },
    cldap_active_directory_search: {
      key: "cldap_active_directory_search",
      name: "4. CLDAP Active Directory Metadata Amplification",
      category: "DIRECTORY SERVICE ROOT DSE ABUSE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      udpPort: "UDP Port 389",
      amplificationFactor: "56x to 70x Multiplier",
      exploitationVector:
        "Querying Microsoft Active Directory domain controllers exposing CLDAP on UDP port 389 with an unauthenticated `searchRequest`; the DC returns up to 4,000 bytes of domain forest metadata.",
      vulnerabilityImpact:
        "Weaponizes enterprise Windows Server infrastructure with high-bandwidth gigabit uplinks for massive reflection assaults.",
      telemetryIndicator: "UDP traffic originating from port 389 containing ASN.1 encoded LDAP search response payloads",
      resilientDefense: "Restricting public WAN access to UDP port 389 and disabling external connectionless LDAP queries.",
      codeSnippet: `// CLDAP Amplification Vector:
// Query  : 60-byte LDAP root DSE search query
// Reply  : 3,500-byte Active Directory Domain Controller Configuration
// AF     : 56x to 70x Multiplier!`
    },
    snmp_getbulk_mib_walk: {
      key: "snmp_getbulk_mib_walk",
      name: "5. SNMPv2c GetBulkRequest MIB Tree Walk",
      category: "NETWORK MANAGEMENT MONITORING ABUSE",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      udpPort: "UDP Port 161",
      amplificationFactor: "Up to 650x Multiplier",
      exploitationVector:
        "Sending a 60-byte SNMP `GetBulkRequest` with default community `public` to internet-exposed routers; the router returns routing tables and interface statistics totaling 40,000 bytes.",
      vulnerabilityImpact:
        "Produces up to 650x bandwidth amplification while leaking proprietary network topology and routing data.",
      telemetryIndicator: "Floods of SNMP response packets originating from port 161 with sequence-encoded MIB tree structures",
      resilientDefense: "Disabling default community strings (`public`), enforcing SNMPv3 with SHA/AES encryption, and blocking public port 161.",
      codeSnippet: `// SNMP GetBulkRequest:
// Ingress : 60-byte SNMPv2c GetBulk (Community: "public")
// Response: Entire Router MIB-II Tree (40,000 Bytes)
// AF      : Up to 650x Multiplier!`
    },
    ssdp_upnp_msearch: {
      key: "ssdp_upnp_msearch",
      name: "6. SSDP UPnP M-SEARCH Device Discovery",
      category: "CONSUMER IOT & SMART TV DISCOVERY",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      udpPort: "UDP Port 1900",
      amplificationFactor: "30x Multiplier",
      exploitationVector:
        "Flooding home routers, smart TVs, and printers running UPnP with `M-SEARCH *` discovery requests; vulnerable devices reply with XML device description payloads.",
      vulnerabilityImpact:
        "Weaponizes millions of consumer home broadband connections to generate multi-hundred gigabit reflection swarms.",
      telemetryIndicator: "High-volume UDP traffic originating from port 1900 containing HTTP/1.1 200 OK headers with `LOCATION:` XML URLs",
      resilientDefense: "Disabling UPnP on public WAN router interfaces and filtering UDP port 1900 at the ISP edge.",
      codeSnippet: `// SSDP M-SEARCH Request:
M-SEARCH * HTTP/1.1\\r\\n
HOST: 239.255.255.250:1900\\r\\n
ST: ssdp:all\\r\\n
# AF: ~30x Multiplier from millions of consumer IoT routers!`
    },
    ws_discovery_onvif_soap: {
      key: "ws_discovery_onvif_soap",
      name: "7. WS-Discovery ONVIF Security Camera Probe",
      category: "IP CAMERA SOAP XML SCHEMA ABUSE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      udpPort: "UDP Port 3702",
      amplificationFactor: "75x to 100x Multiplier",
      exploitationVector:
        "Querying internet-connected ONVIF security cameras exposing WS-Discovery on UDP port 3702 with SOAP XML probe messages, returning 3,000-byte XML schemas.",
      vulnerabilityImpact:
        "Weaponizes global CCTV and security surveillance networks into high-volume reflection amplifiers.",
      telemetryIndicator: "UDP packets originating from port 3702 containing XML SOAP envelopes with `wsa:Action` discovery headers",
      resilientDefense: "Disabling WS-Discovery on external camera interfaces and blocking UDP port 3702.",
      codeSnippet: `// WS-Discovery SOAP Probe:
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope">
 <s:Body><d:Probe/></s:Body>
</s:Envelope>
# AF: 75x to 100x Multiplier from ONVIF IP Cameras!`
    },
    chargen_ascii_stream: {
      key: "chargen_ascii_stream",
      name: "8. CHARGEN Repeating Character Stream Loop",
      category: "LEGACY RFC 864 DIAGNOSTIC ABUSE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      udpPort: "UDP Port 19",
      amplificationFactor: "358x Multiplier",
      exploitationVector:
        "Sending a 1-byte UDP datagram to port 19; the legacy character generator service returns an endless stream of 72-character repeating ASCII lines.",
      vulnerabilityImpact:
        "Saturates victim uplinks with self-sustaining character streams using obsolete 1980s network services.",
      telemetryIndicator: "Streams of UDP packets from port 19 containing repeating sequential ASCII character sets",
      resilientDefense: "Disabling CHARGEN in `/etc/inetd.conf` and blocking UDP port 19 on all network firewalls.",
      codeSnippet: `// CHARGEN Stream:
// Ingress : 20-byte UDP packet to Port 19
// Reply   : Endless stream of 72-byte ASCII lines
// AF      : 358x Multiplier!`
    }
  };

  const activeAmp = amplificationDatabase[selectedAmpKey];

  // Studio 2: Live Protocol Amplification & Bandwidth Calculations
  const amplificationSimulation = useMemo(() => {
    const selectedObj = protocolFactors[selectedProtocolFactor] || protocolFactors.ntp_monlist;
    const af = selectedObj.factor;
    
    // Total reflected bandwidth in Gbps:
    const reflectedGbps = (attackerRequestMbps * af) / 1000.0;
    
    // Saturation Probability:
    let rawSatProb = 0;
    if (reflectedGbps <= scrubbingCapacityGbps) {
      rawSatProb = 0.0;
    } else {
      const surplus = reflectedGbps - scrubbingCapacityGbps;
      rawSatProb = (1 - Math.exp(-surplus / 50.0)) * 100;
    }

    const finalSat = rawSatProb > 99.9 ? 99.9 : rawSatProb;
    const overloadRatio = (reflectedGbps / scrubbingCapacityGbps).toFixed(1);

    return {
      protocolName: selectedObj.name,
      afValue: af,
      reflectedGbps: reflectedGbps.toFixed(1),
      finalSat: finalSat.toFixed(2),
      overloadRatio,
      badgeClass: parseFloat(finalSat) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(finalSat) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(finalSat) < 1
        ? `ANYCAST SCRUBBING SHIELD ACTIVE: Cloud Scrubbing Capacity (${scrubbingCapacityGbps} Gbps) absorbs ${reflectedGbps} Gbps reflected flood generated by ${selectedObj.name} (${af}x); saturation probability is 0.00%!`
        : `CRITICAL PIPE SATURATION: Reflected flood (${reflectedGbps} Gbps) generated by ${selectedObj.name} (${af}x) exceeds scrubbing capacity (${scrubbingCapacityGbps} Gbps) by ${overloadRatio}x, causing ${finalSat}% packet loss!`
    };
  }, [attackerRequestMbps, selectedProtocolFactor, scrubbingCapacityGbps]);

  // Studio 4: Amplification Security Production Code Database
  const codeDatabase = {
    bgp_flowspec_reflection_filter: {
      name: "BGP Flowspec (RFC 5575) Juniper / Cisco Script to Scrub UDP Amplification Ports",
      code: `# BGP Flowspec Policy to Scrub Multi-Protocol Amplification Floods at Tier-1 ISP Core:
routing-options {
    flow {
        route kolkata-amplification-scrubber {
            match {
                destination 103.25.10.50/32;             # Targeted Financial VIP
                protocol udp;
                source-port [ 53 123 389 11211 1900 19 ];# DNS, NTP, CLDAP, Memcached, SSDP, Chargen
                packet-length 1200-1500;                 # Oversized Reflection Packets
            }
            then {
                rate-limit 0;                            # Drop 100% of attack traffic at ISP Core!
                community [ "target:65000:666" ];        # Blackhole community tag
            }
        }
    }
}
# Result: 800 Gbps amplification flood scrubbed in ISP hardware without touching enterprise fiber!`,
      explanation: "BGP Flowspec (RFC 5575) router configuration pushing granular packet filtering rules directly into Tier-1 ISP core routers, scrubbing reflection floods from ports 53, 123, 389, and 11211 before reaching customer fiber links."
    },
    bind9_rrl_rfc8482_conf: {
      name: "BIND 9 Response Rate Limiting (RRL) & RFC 8482 Minimal ANY Configuration",
      code: `# BIND 9 named.conf Hardening against DNS Amplification Exploitation:
options {
    directory "/var/named";

    # 1. Disable Open Recursion (Only allow local corporate subnets!)
    recursion yes;
    allow-recursion { 127.0.0.1; 103.25.10.0/24; };

    # 2. Response Rate Limiting (RRL) - Neutralizes DNS Reflection Attacks!
    rate-limit {
        responses-per-second 5;    # Max 5 responses/sec to same client IP
        window 5;
        slip 2;                    # Returns truncated TC=1 packet for every 2nd dropped query
    };

    # 3. RFC 8482 Minimal ANY Response (Returns minimal 64B HINFO record for ANY queries)
    minimal-any yes;
};`,
      explanation: "BIND 9 DNS server configuration enabling Response Rate Limiting (RRL) to cap responses to 5 per second, disabling open recursion, and enforcing RFC 8482 minimal ANY responses to destroy DNS amplification factors."
    },
    ntp_memcached_hardening_sh: {
      name: "Linux Shell Script Hardening NTP (monlist disable) & Memcached (localhost only)",
      code: `#!/bin/bash
# Hardening NTP & Memcached to Prevent Amplification Exploitation:

# 1. Hardening NTP Daemon (/etc/ntp.conf)
echo "[*] Hardening NTP: Disabling Mode 7 monlist diagnostic query..."
cat << 'EOF' >> /etc/ntp.conf
disable monitor
restrict default nomodify notrap nopeer noquery
restrict 127.0.0.1
restrict ::1
EOF
systemctl restart ntp

# 2. Hardening Memcached (/etc/memcached.conf)
echo "[*] Hardening Memcached: Binding ONLY to localhost and disabling UDP..."
sed -i 's/^-l .*/-l 127.0.0.1/' /etc/memcached.conf
if ! grep -q "^-U 0" /etc/memcached.conf; then
    echo "-U 0" >> /etc/memcached.conf # Disables UDP port 11211!
fi
systemctl restart memcached

echo "[+] NTP (556x) and Memcached (51,000x) Amplification Vectors COMPLETELY NEUTRALIZED!"`,
      explanation: "Linux system administration shell script disabling the NTP Mode 7 monlist command (`disable monitor`) and configuring Memcached to bind exclusively to localhost with UDP disabled (`-U 0`)."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_amplification_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending Payment Gateways Against an 800 Gbps Multi-Protocol Reflection Flood",
      threatType: "MULTI-PROTOCOL AMPLIFICATION (800 Gbps DNS ANY + NTP monlist)",
      budget: "₹74,00,000",
      incident:
        "Adversaries spoofed the gateway's IP to query 120,000 open DNS and NTP servers, generating an 800 Gbps reflected flood that threatened to overwhelm data center uplinks.",
      defenseStrategy:
        "Mamata injected BGP Flowspec (RFC 5575) rules into Tier-1 ISP core routers to drop oversized UDP reflection responses on ports 53 and 123.",
      outcome: "800 Gbps scrubbed in ISP core hardware; clean 7.5 Gbps forwarded to origin; zero payment transaction latency across Kolkata banks.",
      metrics: {
        attackPeakBandwidth: "800.0 Gbps",
        reflectionAmplifiersFiltered: "120,000 Servers",
        switchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_ntp_audit",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "NTP MONLIST REFLECTION & UDP MEMCACHED AUDIT",
      title: "Auditing and Disabling NTP Monlist across Substation Control Gateways",
      budget: "₹46,00,000",
      incident:
        "Security audits revealed legacy NTP time synchronization servers at 18 electrical substations were responding to public Mode 7 monlist queries.",
      defenseStrategy:
        "Debangshu deployed automated Ansible playbooks enforcing `disable monitor` in `/etc/ntp.conf` and disabling UDP listeners on internal Memcached nodes.",
      outcome: "18 substations hardened; monlist amplification factor reduced from 556x to 0x; power grid telemetry frequency stable.",
      metrics: {
        monlistFactorDrop: "556x ➔ 0x",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_cldap_defense",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "CLDAP REFLECTION FLOOD (Active Directory UDP Port 389 Flood)",
      title: "Protecting Cancer Research Data Servers from CLDAP Reflection Floods",
      budget: "₹34,00,000",
      incident:
        "Attackers flooded the oncology hospital gateway with 150 Gbps of CLDAP Active Directory reflection traffic generated from misconfigured corporate domain controllers.",
      defenseStrategy:
        "Mahima configured perimeter firewall rules to drop UDP port 389 ingress traffic from public IPs and activated Anycast cloud scrubbing.",
      outcome: "100% of CLDAP reflection traffic dropped at the cloud edge; patient consultation video feeds remained 100% available; 120,000 records protected.",
      metrics: {
        cldapFloodDropped: "150.0 Gbps",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_amplification_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF MULTI-PROTOCOL AMPLIFICATION FACTORS",
      title: "Formulating the Multi-Protocol Reflection & Asymmetric Bandwidth Model",
      budget: "₹28,00,000",
      incident:
        "Researchers modeled the bandwidth multiplication dynamics of 8 UDP protocols across 100,000 simulated reflection queries.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that combining BGP Flowspec with BCP 38 ingress filtering neutralizes 100% of reflection floods.",
      outcome: "Published peer-reviewed mathematical proof; verified across 100,000 simulated reflection trials.",
      metrics: {
        simulationTrials: "100,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Amplification Asymmetry Equation",
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
                Topic 06
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              DDoS Amplification Attacks: DNS Amplification and NTP Amplification
            </h1>
            <p className="text-xs text-gray-400">
              Reflection physics, DNS ANY (77x), NTP monlist (556x), Memcached (51,200x), BGP Flowspec (RFC 5575), and IT Act Section 66F.
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
              The Physics of Reflection &amp; Amplification
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of DDoS Amplification: Multiplying Bandwidth via Asymmetric UDP Protocols
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              <strong>DDoS Reflection and Amplification Attacks</strong> allow an adversary with modest bandwidth (e.g. 100 Mbps) 
              to generate multi-hundred gigabit volumetric floods by weaponizing misconfigured third-party servers on the internet. 
              These attacks require two fundamental prerequisites: <strong>1. A stateless connectionless protocol (UDP)</strong> 
              that allows forging the victim's IP address in the Source IP field, and <strong>2. An unauthenticated command</strong> 
              where the response payload is significantly larger than the request payload (AF = Response / Request). 
              Key amplification vectors include <strong>DNSSEC EDNS0 ANY queries (50x - 77x)</strong>, 
              <strong>NTP Mode 7 monlist (556x)</strong>, <strong>Memcached UDP (51,200x)</strong>, 
              <strong>SNMP GetBulk (650x)</strong>, and <strong>CLDAP (70x)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amplification Multiplier Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The Bandwidth Multiplier: Memcached &amp; NTP
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Memcached (11211): 15B query ➔ 750KB response = 51,200x Multiplier (1.35 Tbps GitHub flood!)
              </div>
              <p className="text-gray-300 leading-relaxed">
                By reflecting small queries off thousands of open servers worldwide, the attacker hides their identity completely 
                while saturating the victim's downlink fiber links with multi-terabit responses.
              </p>
            </div>

            {/* BGP Flowspec & RRL Defense Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                BGP Flowspec &amp; Server Remediation Defense
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">BGP Flowspec (RFC 5575):</strong> Scrubs UDP reflection ports at Tier-1 ISP core routers.</li>
                <li>• <strong className="text-purple-300">DNS Response Rate Limiting (RRL):</strong> Caps responses to 5/s to prevent resolver abuse.</li>
                <li>• <strong className="text-amber-300">Host Hardening:</strong> `disable monitor` in NTP; `-l 127.0.0.1 -U 0` in Memcached.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Amplification Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Amplification Attack Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Reflection Amplification Mechanics vs BGP Flowspec ISP Scrubbing
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a tiny spoofed query triggers massive responses from open reflection servers (DNS/NTP/Memcached) 
              and how BGP Flowspec filters the multi-hundred gigabit flood at Tier-1 ISP core routers:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: ATTACKER SPOOFED QUERY */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. SPOOFED QUERY
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Small UDP Request
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ATTACKER INPUT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  45B Query (Port 53/123)
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  SrcIP = Victim IP!
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: OPEN REFLECTION AMPLIFIERS */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. REFLECTORS
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Open DNS / NTP Servers
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AMPLIFIERS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  NTP monlist (556x)
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Memcached (51,200x)
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: MULTI-HUNDRED GIGABIT RESPONSE FLOOD */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. REFLECTED FLOOD
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  800 Gbps Ingress
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AMPLIFIED VOLUME:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  3,500B Responses
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Directed at Victim IP!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: TIER-1 ISP BGP FLOWSPEC FILTER */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. BGP FLOWSPEC
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  ISP Core Scrubbing
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RFC 5575 SCRUBBING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Drops Ports 53/123/11211
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  99.9% Flood Dropped!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: CLEAN FIBER UPLINK TO ORIGIN */}
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
                  0% Pipe Saturation
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Clean User Banking!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Amplification Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Protocol Amplification Factor &amp; Vulnerability Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a reflection amplification vector below to examine its UDP port, amplification factor, 
              exploitation vector, vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(amplificationDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedAmpKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedAmpKey === item.key
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeAmp.categoryBadge)}>
                    {activeAmp.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Port: {activeAmp.udpPort}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-bold font-mono">
                    {activeAmp.amplificationFactor}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeAmp.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeAmp.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeAmp.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeAmp.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeAmp.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Packet Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeAmp.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Protocol Amplification Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Protocol Amplification Multiplier &amp; Bandwidth Saturation Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an amplification vector, adjust the attacker outbound query bandwidth B_req, 
              and cloud scrubbing capacity C_scrubbing to model reflected bandwidth B_reflected = B_req × AF and saturation probability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Amplification Variables</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">Amplification Protocol Vector:</span>
                <select
                  value={selectedProtocolFactor}
                  onChange={(e) => setSelectedProtocolFactor(e.target.value)}
                  className="w-full p-2 bg-gray-950 border border-gray-800 rounded font-mono text-cyan-300 text-xs"
                >
                  {Object.entries(protocolFactors).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.name} ➔ {val.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Attacker Query Bandwidth (B_req):</span>
                  <span className="text-rose-400 font-bold font-mono">{attackerRequestMbps} Mbps</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={attackerRequestMbps}
                  onChange={(e) => setAttackerRequestMbps(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
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
                  >
                    500 Gbps (ISP)
                  </button>
                  <button
                    onClick={() => setScrubbingCapacityGbps(10000)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      scrubbingCapacityGbps === 10000
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    10 Tbps (Anycast)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Amplification Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Total Reflected Attack Bandwidth</span>
                  <span className="text-lg font-extrabold text-rose-400">{amplificationSimulation.reflectedGbps} Gbps</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Multiplier: {amplificationSimulation.afValue}x</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Downlink Saturation Probability</span>
                  <span className="text-lg font-extrabold text-white">{amplificationSimulation.finalSat}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Overload Ratio: {amplificationSimulation.overloadRatio}x</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", amplificationSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Scrubbing Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{amplificationSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Amplification Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              BGP Flowspec &amp; Server Hardening Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production BGP Flowspec &amp; DNS/NTP Server Hardening Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production BGP Flowspec (RFC 5575) router configurations scrubbing UDP reflection ports at Tier-1 ISP cores, 
              BIND 9 Response Rate Limiting (RRL) scripts, and NTP/Memcached hardening commands:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita scrub 800 Gbps reflection floods, 
              disable NTP monlist at SCADA substations, and defend cancer research databases across West Bengal:
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
                  The Incident &amp; Amplification Threat Vector
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
              7. Legal Penalties for Amplification DDoS &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              treat Amplification DDoS attacks with severe civil compensation liabilities and life imprisonment penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Amplification floods paralyzing critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to deploy availability safeguards.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Amplification DDoS extortion (Up to 7 years prison).
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
                  <strong>Leaving Recursive DNS Resolvers Open to the Public WAN:</strong> Creates high-leverage amplification reflectors.
                </li>
                <li>
                  <strong>Exposing Memcached on Public UDP Port 11211:</strong> Enables 51,200x astronomical amplification attacks.
                </li>
                <li>
                  <strong>Attempting Local Firewall Filtering for 500 Gbps Floods:</strong> Fiber pipes choke at the ISP upstream level.
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
                  <strong>Inject BGP Flowspec (RFC 5575) Rules:</strong> Scrubs reflection ports directly at Tier-1 ISP core routers.
                </li>
                <li>
                  <strong>Enable Response Rate Limiting (RRL) in BIND:</strong> Caps repeated responses to the same client IP to 5/s.
                </li>
                <li>
                  <strong>Disable NTP Monlist &amp; Bind Memcached to Localhost:</strong> Eliminates host-level reflector abuse.
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
                  Why is a connectionless protocol like UDP mandatory for reflection amplification attacks to work?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why did the Memcached amplification attack achieve an unprecedented 51,200x amplification factor compared to DNS's 70x?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set Scrubbing Capacity to 10 Tbps (Anycast) and observe saturation probability collapse to 0.00%!
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
                <span>Amplification requires UDP connectionless spoofing and asymmetric response payloads.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Memcached achieved a historic 51,000x amplification factor, generating 1.35 Tbps against GitHub.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NTP `monlist` returned 600 IP addresses across 100 packets, producing a 556x multiplier.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DNS Response Rate Limiting (RRL) caps responses to the same client IP to 5 per second.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RFC 8482 returns minimal 64-byte HINFO responses for DNS ANY queries, eliminating amplification.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes Amplification Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="DDoS Amplification FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Reflection Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="DDoS Amplification Attacks: DNS Amplification and NTP Amplification (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: DDoS Reflection and Amplification attacks represent an extreme asymmetric weapon in modern cyber warfare, allowing an adversary to multiply their attack bandwidth by 50x to 50,000x by exploiting misconfigured UDP services worldwide! Master the two mandatory prerequisites: 1. A stateless connectionless protocol (UDP) that permits Source IP spoofing, and 2. An unauthenticated command where response payload size exceeds request size. Master the amplification hierarchy: DNSSEC EDNS0 ANY queries achieve 70x amplification, NTP Mode 7 monlist achieves 556x amplification by returning 600 IP addresses across 100 packets, and Memcached UDP port 11211 achieved an astronomical 51,200x amplification factor, generating the historic 1.35 Tbps DDoS flood against GitHub! Master enterprise defense: inject BGP Flowspec (RFC 5575) rules into Tier-1 ISP core routers to scrub reflection ports (53, 123, 389, 11211), configure Response Rate Limiting (RRL) in BIND 9, adopt RFC 8482 minimal 64-byte HINFO responses for DNS ANY queries, add `disable monitor` to `/etc/ntp.conf`, and bind Memcached strictly to `127.0.0.1` with UDP disabled (`-U 0`). Remember that Section 66F of the Indian IT Act treats amplification cyber terrorism against critical infrastructure with Life Imprisonment, and Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
