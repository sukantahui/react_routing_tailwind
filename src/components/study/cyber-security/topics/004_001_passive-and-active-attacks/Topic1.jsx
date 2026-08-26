import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgFiberId = useId();

  // Studio 1: Active Interception Method Selection
  const [selectedTapKey, setSelectedTapKey] = useState("optical_macrobend");

  // Studio 2: OTDR Calculator Interactive State
  const [fiberLengthKm, setFiberLengthKm] = useState(15);
  const [tapPositionKm, setTapPositionKm] = useState(6.4);
  const [tapLossDb, setTapLossDb] = useState(0.28);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_swift_span");

  // Studio 4: BPF Protocol Filter Tab
  const [activeBpfTab, setActiveBpfTab] = useState("http_auth");

  // 8 Interception Method Profiles for Studio 1
  const interceptionDatabase = {
    optical_macrobend: {
      key: "optical_macrobend",
      name: "Optical Fiber Macrobending Tap",
      category: "PHYSICAL WIRETAP",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      osiLayer: "Layer 1 (Physical)",
      medium: "Single-Mode Optical Glass Fiber (9/125 μm)",
      physicsPrinciple: "Total Internal Reflection (TIR) violation via physical curvature of core beyond critical angle.",
      detectability: "Near-Zero (<0.3 dB power drop is within dirty connector variance).",
      detectabilityScore: 10,
      mechanism:
        "A mechanical clip-on coupler curves the glass fiber buffer. Escaped photons (1% to 3%) refract through cladding into a high-gain photodiode, capturing 10G/100G optical bitstreams without cutting the cable.",
      packetTrace: "[Raw Optical Bitstream Cloned: 10 Gbps Synchronous Optical Network (SONET) Frame]",
      mitigation: "Optical Time-Domain Reflectometry (OTDR) baseline monitoring + MACsec (802.1AE) Layer 2 line encryption.",
      configCode: `// Cisco Catalyst MACsec (802.1AE) Line-Rate Encryption:
interface TenGigabitEthernet1/0/1
 macsec
 macsec key-chain MACSEC-BACKBONE-KEYS
 macsec cipher-suite gcm-aes-256
 macsec replay-protection window-size 64`
    },
    copper_inductive: {
      key: "copper_inductive",
      name: "Inductive Copper Wiretap",
      category: "PHYSICAL WIRETAP",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      medium: "Unshielded Twisted Pair (Cat5e / Cat6 UTP)",
      osiLayer: "Layer 1 (Physical)",
      physicsPrinciple: "Faraday's Law of Induction & Ampere's Law (B = μI / 2πr).",
      detectability: "Extremely Low (Does not break physical continuity or alter electrical resistance).",
      detectabilityScore: 14,
      mechanism:
        "A clamp-on magnetic sensor (Hall effect pickup coil) detects alternating electromagnetic fields emitted by current pulses in copper pairs, demodulating raw baseband data without stripping wire insulation.",
      packetTrace: "[Analog Electromagnetic Signal Demodulated -> 100BASE-TX 4B5B Encoded Bitstream]",
      mitigation: "Shielded Fully Screened Twisted Pair (Cat6A / Cat7 S/FTP) with grounded metallic foil conduits.",
      configCode: `// Physical Infrastructure Shielding Specification:
// Standard: ISO/IEC 11801 Class EA (Cat6A S/FTP)
// Shielding: Individual pair aluminum foil + Outer tinned copper braid (95% optical coverage)
// Grounding: < 1 Ohm resistance to Telecom Grounding Busbar (TGB)`
    },
    promiscuous_sniffing: {
      key: "promiscuous_sniffing",
      name: "Promiscuous Mode Packet Sniffing",
      category: "SOFTWARE EAVESDROPPING",
      categoryBadge: "bg-blue-950 text-blue-300 border-blue-800",
      medium: "Shared Ethernet Collision Domain / Wi-Fi",
      osiLayer: "Layer 2 (Data Link)",
      physicsPrinciple: "Disabling Hardware MAC Address Filter in Network Interface Card Controller.",
      detectability: "Undetectable on unmanaged hubs; detectable on switches via ARP timing tests.",
      detectabilityScore: 25,
      mechanism:
        "The OS instructs the NIC to accept all Ethernet frames regardless of whether the destination MAC matches the host. The libpcap engine passes all cleartext payloads into memory for analysis.",
      packetTrace: "Ethernet II, Src: 00:1a:2b:3c:4d:5e, Dst: 00:5f:4e:3d:2c:1b -> IPv4 -> TCP -> HTTP Payload",
      mitigation: "Dynamic ARP Inspection (DAI), IEEE 802.1X Port Authentication, and switch port isolation (Private VLANs).",
      configCode: `// Linux Command to Enable Promiscuous Sniffing:
sudo ip link set dev eth0 promisc on
sudo tcpdump -i eth0 -nn -s 0 -w capture.pcap`
    },
    wifi_monitor_mode: {
      key: "wifi_monitor_mode",
      name: "802.11 Monitor Mode Radio Capture",
      category: "RF WIRELESS EAVESDROPPING",
      categoryBadge: "bg-blue-950 text-blue-300 border-blue-800",
      medium: "2.4 GHz / 5 GHz / 6 GHz Radio Spectrum",
      osiLayer: "Layer 2 (Data Link / 802.11)",
      physicsPrinciple: "Passive RF Antenna Demodulation without 802.11 Association.",
      detectability: "100% Invisible (Radio card transmits zero RF energy; emits 0 probe requests).",
      detectabilityScore: 5,
      mechanism:
        "Wireless card is placed into RFMON mode, capturing all airborne radio beacons, probe requests, EAPOL 4-way handshakes, and data frames across chosen 20/40/80 MHz Wi-Fi channels.",
      packetTrace: "802.11 RadioTap Header -> EAPOL Key (Type 2: Pairwise, Key MIC: e4f8901b...)",
      mitigation: "WPA3-Enterprise with 192-bit CNSA Suite + Opportunistic Wireless Encryption (OWE - RFC 8110).",
      configCode: `# Put wireless interface into passive monitor mode:
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon --channel 6 --bssid 00:14:22:01:23:45`
    },
    span_port_mirror: {
      key: "span_port_mirror",
      name: "Switch SPAN / Mirror Port Abuse",
      category: "NETWORK INFRASTRUCTURE EAVESDROPPING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      medium: "Managed Core / Distribution Switch Backplane",
      osiLayer: "Layer 2 / Layer 3",
      physicsPrinciple: "Internal Switch ASIC Frame Replication to Designated Monitoring Interface.",
      detectability: "Detectable via Switch Config Audit / TACACS+ Administrative Accounting Logs.",
      detectabilityScore: 65,
      mechanism:
        "An attacker gaining unauthorized CLI access creates a SPAN session that silently duplicates 100% of packets passing through a target VLAN or physical uplink to the attacker's monitoring port.",
      packetTrace: "[SPAN Mirror Copy] 100% Full-Duplex Clone of Finance & SWIFT VLAN 30 Traffic",
      mitigation: "Strict TACACS+ AAA command accounting, SNMPv3 encrypted monitoring, and immutable switch config logs.",
      configCode: `// Unauthorized SPAN Mirror Session:
switch(config)# monitor session 1 source vlan 30 both
switch(config)# monitor session 1 destination interface GigabitEthernet1/0/24`
    },
    tempest_rf: {
      key: "tempest_rf",
      name: "TEMPEST (Van Eck Phreaking) RF Emanations",
      category: "PHYSICAL SIDE-CHANNEL",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      medium: "Electromagnetic Radiation through Air & Building Walls",
      osiLayer: "Physical / Hardware",
      physicsPrinciple: "Maxwell's Equations: Unintended RF radiation from serializer clock lines & video DACs.",
      detectability: "Zero Detectability (Passive antenna operates hundreds of meters away).",
      detectabilityScore: 3,
      mechanism:
        "High-frequency digital signals in HDMI/DisplayPort video cables act as unintended radio transmitters. A software-defined radio (SDR) receives these waves and reconstructs live desktop screens through walls.",
      packetTrace: "[Demodulated RF Video Signal -> Reconstructed 1920x1080 60Hz Screen Image]",
      mitigation: "TEMPEST-certified Faraday shielded enclosures, ferrite chokes on cables, and fiber-to-the-desktop.",
      configCode: `// TEMPEST Shielding Standard (NATO AMSG 720B / SDIP-27):
// Zone 0: Sealed copper-mesh Faraday room (<1m emanation zone)
// Attenuation Requirement: >80 dB shielding from 10 MHz to 10 GHz`
    },
    cleartext_protocols: {
      key: "cleartext_protocols",
      name: "Cleartext Application Protocol Sniffing",
      category: "APPLICATION LAYER EAVESDROPPING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      medium: "IP Network Transport (TCP/UDP)",
      osiLayer: "Layer 7 (Application)",
      physicsPrinciple: "Unencrypted ASCII / Binary transmission over standard sockets.",
      detectability: "Passive sniffing is undetectable; application logs show normal successful logins.",
      detectabilityScore: 12,
      mechanism:
        "Legacy protocols (Telnet, HTTP, FTP, SNMPv1/v2c, unencrypted POP3/IMAP) transmit sensitive passwords and database queries in plaintext bytes readable by any packet sniffer.",
      packetTrace: "USER admin\\r\\nPASS Sukanta@Barrackpore2026\\r\\n230 User logged in.\\r\\n",
      mitigation: "Mandatory deprecation of cleartext protocols; enforcement of TLS 1.3, SSHv2, SNMPv3, and HTTPS only.",
      configCode: `// Apache / Nginx Strict HTTPS Redirection:
server {
    listen 80 default_server;
    server_name _;
    return 301 https://$host$request_uri;
}`
    },
    hardware_inline_tap: {
      key: "hardware_inline_tap",
      name: "Failsafe Inline Optical TAP",
      category: "PHYSICAL HARDWARE INTERCEPTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      medium: "Optical Fiber Link (50/50 or 70/30 Splitter)",
      osiLayer: "Layer 1 (Physical)",
      physicsPrinciple: "Fused Biconical Taper (FBT) passive light beam splitting.",
      detectability: "Permanent insertion loss (e.g. -3.0 dB for 50/50 split) detectable during link power commissioning.",
      detectabilityScore: 35,
      mechanism:
        "A hardware optical splitter splits the incoming light beam: 70% continues to destination, while 30% is directed to a monitoring port. Failsafe relays ensure the line stays up even if power fails.",
      packetTrace: "[100% Full-Duplex Optical Clone with Zero Packet Dropping under Peak Load]",
      mitigation: "Continuous Optical Power Metering (OPM), Armored conduits, and Layer 2 MACsec encryption.",
      configCode: `// Optical Splitter Calculation:
// Split Ratio: 70/30 (Live Path Loss: -1.8 dB; Monitor Path Loss: -5.8 dB)
// Transmit Power: 0 dBm -> Received Power: -1.8 dBm (Verify with OPM)`
    }
  };

  const activeTap = interceptionDatabase[selectedTapKey];

  // Studio 2: OTDR Calculation Helpers
  const otdrCalculations = useMemo(() => {
    const fiberAttenuationPerKm = 0.22; // dB/km for 1310nm Single-Mode
    const normalTotalLoss = fiberLengthKm * fiberAttenuationPerKm;
    const totalLossWithTap = normalTotalLoss + tapLossDb;
    const timeDelayMicroseconds = (2 * (tapPositionKm * 1000) * 1.4682) / (3.0e8 / 1e6); // Round-trip time in microseconds

    return {
      normalTotalLoss: normalTotalLoss.toFixed(2),
      totalLossWithTap: totalLossWithTap.toFixed(2),
      timeDelayMicroseconds: timeDelayMicroseconds.toFixed(2),
      isDetectedByOpm: tapLossDb >= 0.25 ? "YES (Exceeds 0.25 dB threshold)" : "MARGINAL (<0.25 dB variance)",
      otdrResolutionStatus: "EXACT PINPOINT (Located at " + tapPositionKm + " km ± 0.5m)"
    };
  }, [fiberLengthKm, tapPositionKm, tapLossDb]);

  // Studio 4: BPF Expressions Database
  const bpfDatabase = {
    http_auth: {
      name: "HTTP Cleartext Passwords & Auth",
      bpfCode: `tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>>2)) != 0) and (tcp[((tcp[12:2]&0xf0)>>2):4] = 0x504f5354 or tcp[((tcp[12:2]&0xf0)>>2):4] = 0x474554)`,
      description: "Filters all HTTP GET and POST requests to capture cleartext passwords, session cookies, and API tokens."
    },
    telnet_ftp: {
      name: "Telnet & FTP Password Sniffer",
      bpfCode: `(tcp port 21 or tcp port 23) and (tcp[((tcp[12:2]&0xf0)>>2):4] = 0x55534552 or tcp[((tcp[12:2]&0xf0)>>2):4] = 0x50415353)`,
      description: "Intercepts Telnet (port 23) and FTP (port 21) packets matching ASCII strings 'USER' and 'PASS'."
    },
    dns_queries: {
      name: "DNS Unencrypted Domain Lookups",
      bpfCode: `udp port 53 and (udp[10] & 0x80 == 0)`,
      description: "Captures all outbound unencrypted DNS queries to compile a profile of every website visited on the network."
    },
    syn_stealth: {
      name: "TCP Stealth SYN Port Scan",
      bpfCode: `tcp[tcpflags] & (tcp-syn) != 0 and tcp[tcpflags] & (tcp-ack) == 0`,
      description: "Isolates incoming TCP SYN packets without ACKs to detect stealth reconnaissance port scans."
    }
  };

  const activeBpf = bpfDatabase[activeBpfTab];

  // Studio 3: Regional West Bengal Pedagogical Scenarios
  const localScenarios = [
    {
      id: "kolkata_swift_span",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Core Banking Data Center",
      title: "Investigating Unauthorized SPAN Mirroring on SWIFT Link",
      threatType: "NETWORK INFRASTRUCTURE EAVESDROPPING (Abused SPAN)",
      budget: "₹24,00,000",
      incident:
        "During a quarterly security audit under ISO 27001 Clause 9.2, Mamata detected an undocumented SPAN mirror session on Core Switch #3 duplicating financial settlement VLAN 30 to an unmanaged access port in the basement server room.",
      defenseStrategy:
        "Mamata revoked the unauthorized port configuration, instituted TACACS+ strict multi-admin command approvals for all SPAN/RSPAN commands, and enforced IEEE 802.1AE MACsec line-rate encryption (AES-256-GCM) across all core switch-to-switch trunks.",
      outcome: "Eliminated unauthorized mirroring; inter-bank settlement feeds encrypted at Layer 2.",
      metrics: {
        unauthorizedPacketsDiverted: "0 (Port Disabled)",
        macsecThroughput: "40 Gbps Line Rate",
        auditCompliance: "RBI Cyber Master Directions Section 4.2",
        financialExposureShielded: "₹85 Crores Daily Volume"
      }
    },
    {
      id: "barrackpore_modbus_clamp",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "PHYSICAL WIRETAP (RS-485 Inductive Clamp)",
      title: "Detecting Inductive Magnetic Tap on SCADA Serial Bus",
      budget: "₹14,50,000",
      incident:
        "Physical inspection of a remote transformer telemetry conduit revealed an unauthorized inductive clamp sensor wrapped around an unshielded RS-485 serial pair, passively decoding Modbus TCP voltage telemetry.",
      defenseStrategy:
        "Debangshu replaced all unshielded serial cables with double-shielded Cat6A S/FTP armored conduit cables, enclosed all junction boxes in tamper-evident microswitch housings, and converted telemetry streams to IPsec ESP Tunnel Mode.",
      outcome: "Physical tap removed; magnetic leakage eliminated by grounded metallic braided foil.",
      metrics: {
        scadaTelemetryShielded: "100% Substation Feed",
        tamperEnclosureSensors: "32 Junction Boxes Monitored",
        statutoryMandate: "NCIIPC Critical Grid Protection Guidelines",
        gridCapacityProtected: "220 kV Substation Network"
      }
    },
    {
      id: "ichapur_hospital_dicom",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "RF WIRELESS EAVESDROPPING (Unencrypted DICOM)",
      title: "Securing Oncology Imaging Streams Against Wi-Fi Sniffers",
      budget: "₹11,00,000",
      incident:
        "A penetration test revealed that internal medical MRI and CT scan PACS imaging servers were transmitting unencrypted DICOM files over a legacy WPA2-PSK Wi-Fi network, allowing any nearby monitor-mode laptop to view raw patient tumor scans.",
      defenseStrategy:
        "Mahima migrated the medical wireless infrastructure to WPA3-Enterprise (802.1X EAP-TLS with client certificates) and enforced mandatory TLS 1.3 encryption on all DICOM PACS network endpoints.",
      outcome: "100% of patient biopsy and radiological scans encrypted in transit; zero cleartext leaks.",
      metrics: {
        patientScansSecured: "92,000 DICOM Records",
        wirelessSecurityMode: "WPA3-Enterprise 192-bit",
        statutoryCompliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore Statutory DPDP Fine"
      }
    },
    {
      id: "jadavpur_telecom_otdr",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Telecom Research Lab",
      threatType: "PHYSICAL WIRETAP (Optical Fiber Macrobending)",
      title: "Pinpointing Optical Fiber Macrobend Taps Using OTDR",
      budget: "₹8,50,000",
      incident:
        "Researchers simulated an optical fiber macrobend tap on a 15 km single-mode testbed link, demonstrating that bending a fiber around a 5mm mandrel extracted 2.5% of light power (-0.28 dB loss) without severing connectivity.",
      defenseStrategy:
        "Susmita and Abhronila programmed an automated OTDR polling daemon that continuously compares backscatter trace curves against initial baselines, alerting the NOC within 200 milliseconds of any localized attenuation anomaly exceeding 0.05 dB.",
      outcome: "Simulated tap pinpointed to within 0.5 meters of exact geographic location.",
      metrics: {
        otdrDetectionTime: "180 milliseconds",
        spatialResolution: "±0.5 meters",
        attenuationSensitivity: "0.05 dB Threshold",
        researchPublication: "IEEE Telecom & Optical Security"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-cyan-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 01
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Passive Attacks: Eavesdropping &amp; Wiretapping
            </h1>
            <p className="text-xs text-gray-400">
              Optical physics, induction tapping, promiscuous sniffing, OTDR detection reflectometry, and MACsec line defenses.
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

        {/* SECTION 1: Executive Theory & Physics of Interception */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Theoretical &amp; Physical Foundations
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Eavesdropping &amp; Physical Wiretapping
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Passive interception threats target the <strong>Confidentiality</strong> of communication systems without 
              modifying data payloads, injecting rogue packets, or altering network latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Eavesdropping Column */}
            <div className="bg-[#0b101b] p-5 rounded-xl border border-cyan-900/50 hover:border-cyan-500 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  LOGICAL / SOFTWARE EAVESDROPPING
                </span>
                <span className="text-xs text-cyan-400 font-semibold">OSI Layers 2–7</span>
              </div>
              <h3 className="text-base font-bold text-white">Software-Level Packet Sniffing &amp; Monitoring</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Capturing packets traversing a logical communication channel. Involves placing a network card into 
                promiscuous mode, monitoring unencrypted 802.11 Wi-Fi radio frequencies, or configuring switch SPAN port 
                mirrors to clone data streams into analyzer memory.
              </p>
              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Physical Media Breach:</span>
                  <span className="text-cyan-400 font-bold">NO (Operates on existing ports)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Target Protocols:</span>
                  <span className="text-amber-400 font-bold">HTTP, Telnet, FTP, DNS, SNMPv1</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Core Defense:</span>
                  <span className="text-emerald-400 font-bold">TLS 1.3 AEAD, SSHv2, WPA3-Enterprise</span>
                </div>
              </div>
            </div>

            {/* Wiretapping Column */}
            <div className="bg-[#0b101b] p-5 rounded-xl border border-blue-900/50 hover:border-blue-500 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  PHYSICAL / HARDWARE WIRETAPPING
                </span>
                <span className="text-xs text-blue-400 font-semibold">OSI Layer 1 (Physical)</span>
              </div>
              <h3 className="text-base font-bold text-white">Hardware-Level Signal Extraction &amp; Splitting</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Directly accessing the physical transmission medium (copper or glass fiber). Involves mechanical optical 
                macrobending to capture leaked light, inductive Hall-effect clamps around copper cables to read electromagnetic 
                fields, or inserting inline hardware optical TAPs.
              </p>
              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Physical Media Breach:</span>
                  <span className="text-rose-400 font-bold">YES (Conduit/Cable Tapped)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Attenuation Impact:</span>
                  <span className="text-amber-400 font-bold">&lt;0.3 dB (Optical) / &lt;1% (Copper)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Core Defense:</span>
                  <span className="text-emerald-400 font-bold">OTDR Monitoring + MACsec (802.1AE)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Optical Fiber Macrobending Mechanics */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Optical Physics in Action
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Physics of Optical Macrobending: Photon Leakage &amp; Tap Sensor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              In an unbent fiber, Total Internal Reflection (TIR) confines 100% of light within the core. When an adversary 
              mechanically curves the fiber, light rays strike the cladding at an angle less than the critical angle, causing 
              1% to 3% of photons to escape into an external photodiode sensor.
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`${svgFiberId}-coreGrad`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id={`${svgFiberId}-leakGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Background Reference Lines */}
              <line x1="40" y1="60" x2="840" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="40" y1="280" x2="840" y2="280" stroke="#1e293b" strokeDasharray="3 3" />

              {/* UNBENT FIBER SECTION (Left) */}
              <rect x="40" y="130" width="300" height="80" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <rect x="40" y="150" width="300" height="40" fill={`url(#${svgFiberId}-coreGrad)`} opacity="0.6" />
              <text x="190" y="120" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
                Straight Optical Fiber (Total Internal Reflection: 100%)
              </text>
              <text x="190" y="175" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle">
                Core (n=1.4682) | Cladding (n=1.4628)
              </text>

              {/* Straight Light Ray Path */}
              <polyline
                points="50,170 110,155 170,185 230,155 290,185 340,170"
                stroke="#38bdf8"
                strokeWidth="3"
                fill="none"
              />
              <circle r="4" fill="#38bdf8">
                <animateMotion path="M 50 170 L 110 155 L 170 185 L 230 155 L 290 185 L 340 170" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* MACROBEND CURVATURE SECTION (Center to Right) */}
              <path
                d="M 340 170 C 440 170, 480 70, 580 70 C 680 70, 720 170, 840 170"
                stroke="#0ea5e9"
                strokeWidth="40"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 340 170 C 440 170, 480 70, 580 70 C 680 70, 720 170, 840 170"
                stroke="#38bdf8"
                strokeWidth="3"
                fill="none"
              />

              {/* Photon Leakage Radiation Rays */}
              <path d="M 530 65 L 560 25" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />
              <path d="M 550 55 L 580 15" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />
              <path d="M 570 50 L 600 10" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />

              {/* Leaked Photon Animation */}
              <circle r="3.5" fill="#f43f5e">
                <animateMotion path="M 530 65 L 560 25" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle r="3.5" fill="#f43f5e">
                <animateMotion path="M 550 55 L 580 15" dur="1s" repeatCount="indefinite" begin="0.3s" />
              </circle>

              {/* WIRETAP SENSOR RECEPTOR */}
              <g transform="translate(560, 5)">
                <rect width="180" height="75" rx="10" fill="#881337" stroke="#fb7185" strokeWidth="2" />
                <text x="90" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CLIP-ON OPTICAL TAP
                </text>
                <text x="90" y="42" fill="#fecdd3" fontSize="10" textAnchor="middle">
                  High-Gain Photodiode Sensor
                </text>
                <text x="90" y="60" fill="#fef08a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  Captured: 2.5% Light Power
                </text>
              </g>

              {/* DESTINATION RECEIVER (Far Right) */}
              <g transform="translate(720, 200)">
                <rect width="130" height="70" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="65" y="28" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  RECEIVER NODE
                </text>
                <text x="65" y="46" fill="#a7f3d0" fontSize="9.5" textAnchor="middle">
                  97.5% Light Received
                </text>
                <text x="65" y="60" fill="#6ee7b7" fontSize="9" textAnchor="middle">
                  Loss: -0.28 dB (Undetected)
                </text>
              </g>

              {/* Bottom Explanatory Legend */}
              <g transform="translate(100, 290)">
                <circle cx="20" cy="15" r="5" fill="#38bdf8" />
                <text x="35" y="19" fill="#9ca3af" fontSize="11">
                  Main Optical Stream: Propagates to legitimate destination with imperceptible attenuation.
                </text>
                <circle cx="560" cy="15" r="5" fill="#f43f5e" />
                <text x="575" y="19" fill="#9ca3af" fontSize="11">
                  Leaked Photons: Captured by optical coupler to clone 10G/100G bitstream.
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Method Interception Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Interception Mechanism &amp; Defense Dissector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an eavesdropping or wiretapping technique below to examine its physical medium, scientific principles, 
              detectability rating, and enterprise mitigation:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(interceptionDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedTapKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedTapKey === item.key
                    ? "bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span
                  className={clsx(
                    "text-[8.5px] font-bold px-1.5 py-0.5 rounded border self-start",
                    item.category.includes("PHYSICAL")
                      ? "bg-cyan-950 text-cyan-300 border-cyan-800"
                      : "bg-blue-950 text-blue-300 border-blue-800"
                  )}
                >
                  {item.category.includes("PHYSICAL") ? "HARDWARE" : "SOFTWARE"}
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeTap.categoryBadge)}>
                    {activeTap.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeTap.osiLayer}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400">
                    Medium: {activeTap.medium}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeTap.name}</h3>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Detectability Score</span>
                <span
                  className={clsx(
                    "text-sm font-extrabold",
                    activeTap.detectabilityScore > 50
                      ? "text-emerald-400"
                      : activeTap.detectabilityScore > 20
                      ? "text-amber-400"
                      : "text-rose-400"
                  )}
                >
                  {activeTap.detectabilityScore}/100{" "}
                  <span className="text-xs font-normal text-gray-400">
                    ({activeTap.detectabilityScore < 15 ? "Extremely Stealthy" : "Moderately Observable"})
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                    Physics Principle &amp; Exploitation Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeTap.physicsPrinciple}</p>
                  <p className="text-gray-400 leading-relaxed mt-2">{activeTap.mechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Captured Data Stream / Output Signature
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-amber-200 overflow-x-auto whitespace-pre-wrap border border-amber-950/50">
                    {activeTap.packetTrace}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Defensive Strategy &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeTap.mitigation}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Production Configuration &amp; Deployment Code
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeTap.configCode}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Interactive OTDR & Optical Link Budget Calculator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Optical Link Budget &amp; OTDR Pulse Reflectometry Calculator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust fiber link parameters below to simulate how Optical Time-Domain Reflectometers (OTDR) detect physical 
              macrobend wiretaps via Rayleigh backscatter time-delay measurements:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Fiber Link Parameters</h3>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Total Fiber Span:</span>
                  <span className="text-cyan-400 font-bold">{fiberLengthKm} km</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={fiberLengthKm}
                  onChange={(e) => setFiberLengthKm(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Wiretap Physical Location:</span>
                  <span className="text-amber-400 font-bold">{tapPositionKm} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={fiberLengthKm - 1}
                  step="0.1"
                  value={tapPositionKm > fiberLengthKm - 1 ? fiberLengthKm - 1 : tapPositionKm}
                  onChange={(e) => setTapPositionKm(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Wiretap Induced Loss:</span>
                  <span className="text-rose-400 font-bold">{tapLossDb} dB</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.01"
                  value={tapLossDb}
                  onChange={(e) => setTapLossDb(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>
            </div>

            {/* Calculated OTDR Results */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">OTDR Diagnostic Output</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Baseline Link Loss</span>
                  <span className="text-base font-extrabold text-cyan-400">{otdrCalculations.normalTotalLoss} dB</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">0.22 dB/km standard</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Measured Loss (With Tap)</span>
                  <span className="text-base font-extrabold text-rose-400">{otdrCalculations.totalLossWithTap} dB</span>
                  <span className="text-[10px] text-rose-400 block mt-0.5">+{tapLossDb} dB Anomaly</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Round-Trip Time Delay</span>
                  <span className="text-base font-extrabold text-indigo-400">{otdrCalculations.timeDelayMicroseconds} μs</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Rayleigh Backscatter</span>
                </div>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Optical Power Meter (OPM) Detection:</span>
                  <span className="font-bold text-amber-400">{otdrCalculations.isDetectedByOpm}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">OTDR Spatial Localization:</span>
                  <span className="font-bold text-emerald-400">{otdrCalculations.otdrResolutionStatus}</span>
                </div>
                <p className="text-gray-400 text-[11px] pt-1">
                  Formula: <code className="text-cyan-300 font-mono">Distance = (c × t) / (2 × n_core)</code> where 
                  refractive index <code className="text-cyan-300 font-mono">n = 1.4682</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Berkeley Packet Filter (BPF) & Scapy Scripting Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Packet Filter Engineering
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Berkeley Packet Filter (BPF) &amp; Lawful Interception Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore in-kernel BPF byte-level filtering expressions used by network engineers to isolate specific 
              cleartext credential streams and protocol headers without loading entire 10G feeds into user space:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(bpfDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveBpfTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeBpfTab === key
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
              <h3 className="text-sm font-bold text-white">{activeBpf.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                BPF Kernel Microcode
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeBpf.description}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeBpf.bpfCode}
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita mitigate real-world 
              eavesdropping and physical wiretapping incidents in West Bengal infrastructure:
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
                  The Incident &amp; Interception Vector
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Remediation
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
              7. Legal Penalties for Unlawful Wiretapping in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian law strictly prohibits unauthorized electronic eavesdropping and wiretapping while establishing 
              rigorous statutory procedures for sovereign lawful interception:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                Indian Telegraph Act 1885
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 26:</strong> Criminal offense for unlawfully intercepting or disclosing electronic/telegraphic messages (Up to 3 years imprisonment).
                </li>
                <li>
                  <strong className="text-white">Section 20:</strong> Penalizes unauthorized wireless telegraph apparatus and radio sniffing installations.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 &amp; Section 69
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to ₹1 Crore for copying, extracting, or downloading unauthorized data.
                </li>
                <li>
                  <strong className="text-white">Section 69:</strong> Lawful interception requires explicit written authorization exclusively from the Union or State Home Secretary.
                </li>
                <li>
                  <strong className="text-white">Cabinet Secretary Review:</strong> All lawful interception orders must be reviewed by the Cabinet Oversight Committee every 60 days.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; Data Safeguards
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 8(5):</strong> Enterprise Data Fiduciaries must implement reasonable technical safeguards (E2EE/MACsec) to prevent passive wiretaps.
                </li>
                <li>
                  <strong className="text-white">Section 33:</strong> Statutory penalties up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for systemic data breaches caused by unencrypted communications.
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
                  <strong>Assuming Fiber Optic Cannot Be Tapped:</strong> Optical glass fiber CAN be easily tapped using macrobending clip-on couplers without cutting the cable.
                </li>
                <li>
                  <strong>Confusing Promiscuous Mode with Monitor Mode:</strong> Promiscuous captures associated Ethernet frames; Monitor mode captures all raw 802.11 RF frames over the air without associating.
                </li>
                <li>
                  <strong>Relying on Router Logs to Catch Wiretaps:</strong> Physical taps emit zero packets; detection requires optical power meters (OPM) or OTDR reflectometry.
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
                  <strong>Enforce IEEE 802.1AE MACsec:</strong> Encrypt all switch-to-switch fiber links at Layer 2 to render optical taps completely useless.
                </li>
                <li>
                  <strong>Deploy Armored Conduits:</strong> Run inter-building fiber inside pressurized steel conduits that trigger alarms upon physical penetration.
                </li>
                <li>
                  <strong>Preload HSTS &amp; Enable ECH:</strong> Prevent SSL stripping and SNI metadata leakage across public Wi-Fi hotspots.
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
                  If an adversary taps your fiber line and steals 2% of the light, why doesn't your router trigger a link-down alarm?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does WPA3 OWE encrypt Wi-Fi on coffee shop hotspots even when there is no Wi-Fi password?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  Calculate OTDR pulse delay if a tap is applied at 10 km vs 20 km—how does the reflection time change?
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Eavesdropping is logical/software capture; Wiretapping is physical/hardware tapping.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Optical macrobending leaks 1-3% of photons through cladding without severing the link.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>OTDR uses Rayleigh backscatter time delays to pinpoint physical taps to within ±0.5m.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MACsec (IEEE 802.1AE) encrypts all Layer 2 frames at line rate across switch trunks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TEMPEST (Van Eck phreaking) reconstructs desktop displays from unintended RF radiation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 69 of the IT Act mandates that lawful wiretapping requires Home Ministry sanction.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Passive Attacks: Eavesdropping & Wiretapping FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Technical Explanations"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Passive Attacks: Eavesdropping and Wiretapping (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Always remember that physical security is network security! Many students falsely assume that optical fiber is completely immune to tapping—this is a dangerous misconception! Mechanical macrobending taps allow adversaries to silently extract photons without triggering link-down alarms. Always enforce Layer 2 MACsec line encryption on your switch trunks, deploy continuous OTDR optical monitoring, and eliminate cleartext legacy protocols (Telnet/HTTP/SNMPv1). Adhere strictly to Indian cyber jurisprudence under IT Act Section 43/66/69!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
