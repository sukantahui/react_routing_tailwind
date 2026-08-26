import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgOtdrId = useId();

  // Studio 1: Active Passive Defense Technique Selection
  const [selectedTechKey, setSelectedTechKey] = useState("cotdr_supervisory");

  // Studio 2: Live C-OTDR Simulator State
  const [fiberLengthKm, setFiberLengthKm] = useState(25);
  const [isTapAttached, setIsTapAttached] = useState(true);
  const [tapPositionKm, setTapPositionKm] = useState(14.2);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("barrackpore_cotdr_grid");

  // Studio 4: Anti-Passive Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("cisco_macsec");

  // 8 Passive Defense Techniques for Studio 1
  const techniqueDatabase = {
    cotdr_supervisory: {
      key: "cotdr_supervisory",
      name: "Continuous C-OTDR (1625 nm Supervisory Reflectometry)",
      category: "PHYSICAL DETECTION INSTRUMENTATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Layer 1 (Physical Single-Mode Optical Fiber)",
      mechanism:
        "Continuously injects an out-of-band 1625 nm laser test pulse alongside active 1310/1550 nm data channels, detecting Rayleigh backscatter attenuation drops as small as 0.05 dB to pinpoint physical macrobend taps within ±0.5 meters.",
      keyMetric: "Sensitivity: 0.05 dB Loss | Response Latency: <200 ms",
      proactiveRole: "Detects physical conduit intrusion and optical bending clamps on dark fiber trunks.",
      configSnippet: `// C-OTDR Threshold Alert Policy:
set otdr supervisory-wavelength 1625nm
set otdr attenuation-threshold 0.05dB
set otdr alarm-action notify-siem-immediate`
    },
    macsec_line_rate: {
      key: "macsec_line_rate",
      name: "IEEE 802.1AE MACsec Line-Rate Encryption",
      category: "DATA LINK PROACTIVE PREVENTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 2 (Data Link / Ethernet)",
      mechanism:
        "Hardware-based point-to-point encryption (AES-128/256-GCM) operating at full 100 Gbps wire speed across switch trunks, encrypting all payload and IP headers so physical taps capture only ciphertext.",
      keyMetric: "Throughput: 100 Gbps Line Rate | Latency Overhead: <0.5 µs",
      proactiveRole: "Neutralizes inter-switch wiretaps, span port sniffing, and rogue switch attachments.",
      configSnippet: `// Cisco Switch MACsec Trunk Config:
interface TenGigabitEthernet1/0/1
 macsec
 mka policy ENTERPRISE-MACSEC
 mka pre-shared-key key-chain MACSEC-KEYRING`
    },
    cbr_traffic_padding: {
      key: "cbr_traffic_padding",
      name: "Constant-Bitrate (CBR) Traffic Padding",
      category: "NETWORK LAYER METADATA DEFENSE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 3 (IPsec Tunnel Mode)",
      mechanism:
        "Injects continuous pseudo-random dummy ciphertext packets whenever genuine data is idle, enforcing a 100% flatline transmission rate to eliminate volume burst intelligence.",
      keyMetric: "Efficiency: η = R_real / max(R_burst) | Metadata Leakage: 0.0%",
      proactiveRole: "Eliminates Traffic Flow Analysis on military backhauls and SCADA command channels.",
      configSnippet: `// IPsec Constant-Rate Traffic Padding:
crypto ipsec profile CBR-PADDING
 set traffic-padding constant-rate 50000000 # Flat 50 Mbps`
    },
    ech_tls13: {
      key: "ech_tls13",
      name: "Encrypted Client Hello (ECH / RFC 9460)",
      category: "APPLICATION METADATA SHIELDING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 7 (TLS 1.3 Handshake)",
      mechanism:
        "Encrypts the Server Name Indication (SNI) and handshake parameters inside an outer wrapper using a public key published in DNS, hiding the visited domain from ISPs and passive sniffers.",
      keyMetric: "SNI Visibility: 0% (Hides target domain inside encrypted envelope)",
      proactiveRole: "Defeats ISP browsing profiling and website fingerprinting reconnaissance.",
      configSnippet: `// ECH DNS HTTPS Record:
kolkatabank.in. IN HTTPS 1 . (
    alpn="h2,h3" ech="AEn+DQBFBwAgAC..."
)`
    },
    post_quantum_mlkem: {
      key: "post_quantum_mlkem",
      name: "Post-Quantum Cryptography (FIPS 203 ML-KEM)",
      category: "QUANTUM SURVEILLANCE DEFENSE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Cryptographic Presentation Layer",
      mechanism:
        "Replaces classical Diffie-Hellman/RSA key encapsulation with module-lattice cryptography (CRYSTALS-Kyber), ensuring recorded historical ciphertexts cannot be decrypted by future quantum computers.",
      keyMetric: "Security: NIST Level 3 (Immune to Shor's Algorithm)",
      proactiveRole: "Completely neutralizes 'Harvest Now, Decrypt Later' state-sponsored surveillance.",
      configSnippet: `// Hybrid Post-Quantum TLS 1.3 Key Exchange:
// Key Agreement: X25519 + ML-KEM-768 (CRYSTALS-Kyber)`
    },
    canary_honeytokens: {
      key: "canary_honeytokens",
      name: "Canary Honeytoken Deception Traps",
      category: "DECEPTION-BASED DETECTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Layer 7 (Application Database / JSON Feeds)",
      mechanism:
        "Deliberately inserts unique decoy credentials into simulated cleartext internal feeds. When a passive sniffer attempts to authenticate with the stolen token, the canary backend alerts the SOC.",
      keyMetric: "False Positive Rate: 0.0% | Time to Alert: <1 second upon token usage",
      proactiveRole: "Exposes silent insider sniffers and rogue network taps.",
      configSnippet: `// Canary API Token Lure in Database Feed:
const canaryLure = {
  db_user: "canary_kolkata_admin",
  api_key: "CANARY_TOKEN_99812_ALERT_SOC"
};`
    },
    private_vlans: {
      key: "private_vlans",
      name: "Private VLAN (PVLAN) Subnet Isolation",
      category: "SWITCH LAYER PROACTIVE ISOLATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 2 (Switch Port Architecture)",
      mechanism:
        "Divides a single broadcast subnet into Isolated and Promiscuous ports, preventing hosts in the same VLAN from communicating directly or sniffing each other's traffic.",
      keyMetric: "Inter-Host Sniffing: Physically Blocked in Hardware",
      proactiveRole: "Prevents peer-to-peer promiscuous packet sniffing in medical and enterprise LANs.",
      configSnippet: `// Cisco Private VLAN Configuration:
switch(config-vlan)# vlan 100
switch(config-vlan)# private-vlan community
switch(config-vlan)# vlan 101
switch(config-vlan)# private-vlan isolated`
    },
    tempest_shielding: {
      key: "tempest_shielding",
      name: "TEMPEST RF & Acoustic Shielding (NATO SDIP-27)",
      category: "PHYSICAL SIDE-CHANNEL DEFENSE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Physical Environment (Zone 0)",
      mechanism:
        "Encloses server racks in Faraday cages, adds ferrite choke beads to cables, and applies acoustic baffles to eliminate electromagnetic and acoustic radiation across air-gaps.",
      keyMetric: "RF Attenuation: >90 dB across 10 MHz to 10 GHz",
      proactiveRole: "Prevents remote radio-frequency and acoustic eavesdropping on high-security systems.",
      configSnippet: `// TEMPEST Zone 0 Facility Standard:
// Enforce solid ground planes, double-shielded Cat7 cabling, and copper Faraday enclosures.`
    }
  };

  const activeTech = techniqueDatabase[selectedTechKey];

  // Studio 2: Live C-OTDR Optical Calculation
  const otdrMetrics = useMemo(() => {
    const fiberLossDbPerKm = 0.22;
    const connectorLossDb = 0.8;
    const normalTotalLoss = (fiberLengthKm * fiberLossDbPerKm + connectorLossDb).toFixed(2);
    const tapLossDb = isTapAttached ? 0.18 : 0.0;
    const totalMeasuredLoss = (parseFloat(normalTotalLoss) + tapLossDb).toFixed(2);
    const isAlarmTriggered = isTapAttached && tapLossDb &ge; 0.05;

    return {
      normalTotalLoss,
      tapLossDb,
      totalMeasuredLoss,
      isAlarmTriggered,
      statusText: isAlarmTriggered
        ? `ALARM! Localized -${tapLossDb} dB Macrobend Tap Detected at km ${tapPositionKm}!`
        : "FIBER SECURE: Attenuation profile matches normal baseline (Zero Tap Detected)."
    };
  }, [fiberLengthKm, isTapAttached, tapPositionKm]);

  // Studio 4: Anti-Passive Code Database
  const codeDatabase = {
    cisco_macsec: {
      name: "Cisco 802.1AE MACsec AES-256-GCM Configuration",
      code: `! Configure MKA Keyring and Policy
key chain MACSEC-KEYS macsec
 key 01
  cryptographic-algorithm aes-256-cmac
  key-string 0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF

mka policy MACSEC-STRICT
 macsec-cipher-suite gcm-aes-256
 confidentiality-offset 0
 key-server priority 1

! Apply to Inter-Switch Trunk Interface
interface HundredGigE1/0/1
 description Core Backbone Link to Kolkata Data Center
 macsec
 mka policy MACSEC-STRICT
 mka pre-shared-key key-chain MACSEC-KEYS`,
      explanation: "Configures hardware-level AES-256-GCM line-rate encryption across 100 Gbps switch trunks, defeating all physical cable taps and span-port sniffing."
    },
    canary_listener: {
      name: "Python Canary Honeytoken SIEM Daemon",
      code: `import redis, json, requests

# Connect to Redis honeypot token database
r = redis.Redis(host='localhost', port=6379, db=0)

def alert_soc_sniffer_detected(token, source_ip, client_headers):
    payload = {
        "alert_level": "P1_CRITICAL",
        "threat_type": "PASSIVE_SNIFFER_DETECTED",
        "honeytoken_used": token,
        "sniffer_source_ip": source_ip,
        "headers": client_headers
    }
    requests.post("https://siem.kolkatabank.in/api/v1/alerts", json=payload)
    print(f"[!] SOC ALERT: Honeytoken {token} used from IP {source_ip}!")`,
      explanation: "Monitors honeypot authentication endpoints; if any planted decoy token is submitted, an immediate P1 alert is dispatched capturing the sniffer's IP."
    },
    systemd_doh: {
      name: "Linux Encrypted DNS & ECH Configuration",
      code: `# /etc/systemd/resolved.conf
[Resolve]
# Direct queries to secure DNS-over-TLS / DoH resolvers
DNS=1.1.1.1 9.9.9.9
FallbackDNS=8.8.8.8
DNSOverTLS=yes
DNSSEC=yes

# Verify Encrypted Client Hello (ECH) in browser:
# In Chrome: chrome://flags/#encrypted-client-hello &rarr; ENABLED
# In Firefox: network.dns.echconfig.enabled -> TRUE`,
      explanation: "Enforces DNS-over-TLS with DNSSEC validation and activates Encrypted Client Hello (ECH) to close the Server Name Indication (SNI) metadata leak."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "barrackpore_cotdr_grid",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      title: "Real-Time 1625nm C-OTDR Live Pulse Monitoring on SCADA Dark Fiber",
      threatType: "PHYSICAL FIBER WIRETAP (Optical Macrobending Tap)",
      budget: "₹22,00,000",
      incident:
        "Physical inspection revealed an unauthorized fiber clip installed inside a roadside manhole, extracting 2% of optical power (-0.18 dB) to siphon unencrypted power grid telemetry.",
      defenseStrategy:
        "Debangshu installed Continuous Supervisory C-OTDR (1625 nm) multiplexed on all high-voltage substation dark fiber trunks, maintaining active baseline attenuation profiles with 0.05 dB sensitivity.",
      outcome: "Any future physical macrobending detected and geographically pinpointed within 200 milliseconds.",
      metrics: {
        otdrSensitivity: "0.05 dB Loss Threshold",
        localizationAccuracy: "±0.5 meters",
        substationsMonitored: "18 High-Voltage Nodes",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "kolkata_canary_mtls",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Catching Passive Insider Sniffers Using Canary Tokens & mTLS",
      threatType: "INSIDER PASSIVE PACKET SNIFFING (Promiscuous Sniffing)",
      budget: "₹27,00,000",
      incident:
        "Suspecting an internal rogue administrator was passively sniffing database replication feeds on an unmanaged switch port, Mamata planted a Canary API credential inside a simulated internal JSON broadcast stream.",
      defenseStrategy:
        "Mamata enforced Mutual TLS (mTLS) with X.509 certificates across all inter-service database links and planted 12 Canary Honeytokens in legacy staging feeds.",
      outcome: "Rogue administrator attempted to use Canary token within 48 hours; insider isolated and prosecuted under IT Act Section 66.",
      metrics: {
        timeToSnifferExposure: "48 Hours",
        canaryTokensPlanted: "12 Decoy Credentials",
        insiderIsolated: "IP 192.168.10.45",
        compliance: "RBI Cyber Master Direction Section 4.2"
      }
    },
    {
      id: "ichapur_macsec_dicom",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "LAN PACKET SNIFFING (Medical DICOM Imaging Siphoning)",
      title: "Securing Oncology MRI & CT Scan Feeds with Hardware MACsec",
      budget: "₹14,00,000",
      incident:
        "A network vulnerability assessment discovered that patient MRI and CT scans transmitted via DICOM protocols across hospital switch links were unencrypted, vulnerable to local promiscuous sniffing.",
      defenseStrategy:
        "Mahima deployed IEEE 802.1AE MACsec (AES-256-GCM) hardware line encryption on all switch trunk links and configured Private VLANs on diagnostic imaging terminals.",
      outcome: "100% of patient diagnostic image streams encrypted at wire speed; passive sniffing rendered impossible.",
      metrics: {
        dicomStreamsSecured: "95,000 Annual Imaging Studies",
        macsecLineRate: "10 Gbps Wire Speed",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_pqc_kyber",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "HARVEST NOW, DECRYPT LATER (Quantum Eavesdropping)",
      title: "Deploying FIPS 203 ML-KEM Post-Quantum Hybrid Cryptography",
      budget: "₹16,50,000",
      incident:
        "Researchers simulated state-sponsored passive archiving of university research telemetry, testing classical RSA-2048 against post-quantum lattice-based key encapsulation.",
      defenseStrategy:
        "Susmita and Abhronila migrated core communication tunnels to hybrid post-quantum TLS 1.3 utilizing FIPS 203 ML-KEM-768 (CRYSTALS-Kyber) paired with X25519 elliptic-curve key exchange.",
      outcome: "Archived ciphertext rendered permanently secure against future quantum cryptanalysis.",
      metrics: {
        pqcAlgorithm: "ML-KEM-768 (CRYSTALS-Kyber)",
        handshakeOverhead: "1.2 ms Additional Latency",
        quantumResistance: "NIST Security Category 3",
        publication: "IEEE Transactions on Information Forensics & Security"
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
                Topic 09
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Detection &amp; Prevention Techniques for Passive Attacks
            </h1>
            <p className="text-xs text-gray-400">
              C-OTDR 1625nm supervisory reflectometry, IEEE 802.1AE MACsec, CBR traffic padding, ECH, and ML-KEM PQC.
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

        {/* SECTION 1: Executive Theory & The Asymmetric Model */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Asymmetric Defense Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Two Pillars of Passive Attack Defense: Specialized Detection &amp; 100% Proactive Prevention
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Because passive threats modify zero bits and leave zero log events (<strong>ΔS = ∅</strong>), defense requires a two-pronged strategy: 
              <strong>Specialized Physical &amp; Deception Instrumentation</strong> (C-OTDR 1625nm, Canary Honeytokens, Fake Unicast Probes) to expose physical taps, 
              combined with <strong>100% Proactive Prevention</strong> (MACsec line encryption, Constant-Bitrate Padding, ECH, and Post-Quantum Cryptography).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detection Card 1 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-cyan-950/60 space-y-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                Pillar 1: Specialized Detection Instrumentation
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>C-OTDR 1625nm:</strong> Real-time supervisory pulse reflectometry detecting 0.05 dB drops.</li>
                <li>• <strong>Canary Honeytokens:</strong> Decoy credentials in simulated feeds alerting on unauthorized usage.</li>
                <li>• <strong>Fake Unicast MAC Probes:</strong> Exposing promiscuous NICs with disabled hardware filters.</li>
              </ul>
            </div>

            {/* Prevention Card 2 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Pillar 2: 100% Proactive Cryptographic Prevention
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>IEEE 802.1AE MACsec:</strong> Hardware AES-256-GCM line-rate encryption on switch links.</li>
                <li>• <strong>CBR Traffic Padding:</strong> Continuous dummy packet injection enforcing flatlines.</li>
                <li>• <strong>Encrypted Client Hello (ECH):</strong> Hiding Server Name Indication (SNI) inside DNS envelopes.</li>
                <li>• <strong>Post-Quantum ML-KEM:</strong> Lattice cryptography defeating quantum harvest-and-decrypt.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - C-OTDR Supervisory Pulse Reflectometry */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Optical Reflectometry Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Continuous C-OTDR Supervisory Pulse Monitoring along Optical Fiber
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how a 1625 nm supervisory test pulse is multiplexed alongside 1310/1550 nm data channels, 
              instantly flagging localized Rayleigh backscatter drops caused by macrobending taps:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Optical Fiber Conduit */}
              <rect x="60" y="140" width="760" height="30" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <line x1="60" y1="155" x2="820" y2="155" stroke="#06b6d4" strokeWidth="3" />

              {/* Data Channels (1310 / 1550 nm) */}
              <text x="120" y="130" fill="#38bdf8" fontSize="10" fontWeight="bold">
                Live Data Channels (1310nm / 1550nm) ➔
              </text>

              {/* Supervisory OTDR Pulse (1625 nm) */}
              <text x="120" y="195" fill="#f43f5e" fontSize="10" fontWeight="bold">
                Supervisory Test Pulse (1625nm Out-of-Band) ➔
              </text>

              {/* Animated Supervisory Pulse */}
              <circle r="6" fill="#f43f5e">
                <animate attributeName="cx" from="60" to="820" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="155;155" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {/* Macrobend Tap Event at Marker 460 */}
              <g transform="translate(460, 90)">
                <rect width="130" height="130" rx="10" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="65" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  MACROBEND TAP
                </text>
                <text x="65" y="42" fill="#fca5a5" fontSize="9" textAnchor="middle">
                  Marker: 14.2 km
                </text>
                <rect x="10" y="55" width="110" height="35" rx="4" fill="#881337" />
                <text x="65" y="72" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Loss: -0.18 dB
                </text>
                <text x="65" y="84" fill="#fda4af" fontSize="8" textAnchor="middle">
                  Rayleigh Spike Flagged
                </text>
                <text x="65" y="112" fill="#f87171" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  C-OTDR ALERT!
                </text>
              </g>

              {/* SENDER NODE (Barrackpore Grid) */}
              <g transform="translate(40, 50)">
                <rect width="160" height="65" rx="8" fill="#1e3a8a" stroke="#60a5fa" />
                <text x="80" y="28" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  BARRACKPORE NODE
                </text>
                <text x="80" y="48" fill="#bfdbfe" fontSize="9" textAnchor="middle">
                  C-OTDR Supervisory Laser
                </text>
              </g>

              {/* RECEIVER NODE (Kolkata Load Dispatch) */}
              <g transform="translate(680, 50)">
                <rect width="160" height="65" rx="8" fill="#064e3b" stroke="#34d399" />
                <text x="80" y="28" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  KOLKATA DISPATCH
                </text>
                <text x="80" y="48" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                  Optical Power Meter
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Technique Passive Defense Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Passive Defense Technique &amp; Instrumentation Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a defensive technique below to inspect its operational mechanics, target layer, 
              key performance metrics, and production configuration code:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(techniqueDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedTechKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedTechKey === item.key
                    ? "bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-cyan-950 text-cyan-300 border-cyan-800 self-start">
                  DEFENSE
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeTech.categoryBadge)}>
                    {activeTech.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeTech.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeTech.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                    Operational Mechanism &amp; Architecture
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeTech.mechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Key Performance Metrics
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeTech.keyMetric}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Passive Threat Neutralized
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeTech.proactiveRole}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Production Configuration Snippet
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeTech.configSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live C-OTDR Reflectometry Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. C-OTDR Fiber Reflectometry &amp; Link Budget Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust fiber length and toggle an active macrobending tap to simulate how continuous 1625 nm C-OTDR 
              detects micro-optical power anomalies:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Fiber Line Controls</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Fiber Trunk Length:</span>
                  <span className="text-cyan-400 font-bold font-mono">{fiberLengthKm} km</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={fiberLengthKm}
                  onChange={(e) => setFiberLengthKm(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                /&gt;
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsTapAttached(!isTapAttached)}
                  className={clsx(
                    "w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 border",
                    isTapAttached
                      ? "bg-rose-950 border-rose-500 text-rose-300"
                      : "bg-gray-900 border-gray-800 text-gray-300"
                  )}
                &gt;
                  {isTapAttached ? "⚡ MACROBEND TAP ATTACHED (-0.18 dB)" : "✔ FIBER CLEAN (Zero Physical Tap)"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Optical Telemetry Diagnostics</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Baseline Fiber Loss</span>
                  <span className="text-base font-extrabold text-cyan-400">{otdrMetrics.normalTotalLoss} dB</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">0.22 dB/km + Connectors</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Measured Attenuation</span>
                  <span className="text-base font-extrabold text-indigo-400">{otdrMetrics.totalMeasuredLoss} dB</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Total End-to-End</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Supervisory C-OTDR</span>
                  <span className={clsx("text-base font-extrabold", otdrMetrics.isAlarmTriggered ? "text-rose-400" : "text-emerald-400")}>
                    {otdrMetrics.isAlarmTriggered ? "ALARM TRIPPED" : "NORMAL (OK)"}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Threshold: 0.05 dB</span>
                </div>
              </div>

              <div className={clsx("p-3.5 rounded-lg border font-mono text-xs", otdrMetrics.isAlarmTriggered ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-emerald-950 text-emerald-300 border-emerald-800")}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">C-OTDR Supervisory Diagnostic:</span>
                <p className="mt-1 font-bold">{otdrMetrics.statusText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Anti-Passive Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Production Configuration &amp; Deception Code
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Anti-Passive Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production configurations for Cisco MACsec line encryption, Python Canary Honeytoken listeners, 
              and Linux DoH/ECH DNS hardening:
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
                Production Code
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita implement cutting-edge 
              passive attack detection and prevention across West Bengal critical infrastructure:
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
                  The Incident &amp; Passive Threat
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
              7. Legal Frameworks &amp; Mandatory Safeguards in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian data privacy and cybersecurity regulations mandate state-of-the-art encryption to prevent passive leaks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 Section 8(5) &amp; 33
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Mandatory Encryption Safeguards:</strong> Organizations must implement end-to-end encryption (TLS 1.3 / MACsec) across all personal data paths.
                </li>
                <li>
                  <strong className="text-white">Statutory Penalties:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement reasonable security safeguards.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 Section 43(a) &amp; 66
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to ₹1 Crore for unauthorized packet extraction and data copying.
                </li>
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking penalties (Up to 3 years prison + ₹5 Lakh fine).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                Section 69 Lawful Interception
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Home Secretary Authorization:</strong> Lawful interception can only be ordered by the Union/State Home Secretary with mandatory 60-day oversight reviews.
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
                  <strong>Relying on Standard IDS for Passive Taps:</strong> Standard IDS engines generate 0 alerts; specialized C-OTDR and Honeytokens are required.
                </li>
                <li>
                  <strong>Leaving Inter-Switch Trunks Cleartext:</strong> Unencrypted VLAN trunks allow physical taps to sniff corporate communications.
                </li>
                <li>
                  <strong>Ignoring Traffic Burst Intelligence:</strong> Even encrypted streams leak operational timing without Constant-Bitrate (CBR) padding.
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
                  <strong>Deploy Continuous 1625nm C-OTDR:</strong> Monitor dark fiber attenuation profiles with 0.05 dB sensitivity during live data transmission.
                </li>
                <li>
                  <strong>Enforce IEEE 802.1AE MACsec:</strong> Encrypt all Data Link Layer frames at 100 Gbps line speed on switch trunks.
                </li>
                <li>
                  <strong>Migrate to Post-Quantum ML-KEM:</strong> Eliminate future quantum harvest-and-decrypt risks today.
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
                  If someone is reading your letters silently without touching the delivery truck, how do you catch them?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does C-OTDR use an out-of-band wavelength (1625 nm) rather than the standard 1310/1550 nm data laser?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the C-OTDR simulator above, toggle the physical tap on and observe how the 0.05 dB threshold trips an instant SOC alarm.
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
                <span>Passive attacks are state-invariant (ΔS = ∅); proactive prevention is mandatory.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>C-OTDR (1625 nm) detects optical fiber taps with 0.05 dB sensitivity during live traffic.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IEEE 802.1AE MACsec provides hardware AES-256-GCM line-rate encryption on switch links.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Constant-Bitrate (CBR) padding injects continuous dummy noise to eliminate traffic surges.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Encrypted Client Hello (ECH) closes the Server Name Indication (SNI) metadata leak.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Post-Quantum Cryptography (ML-KEM) neutralizes 'Harvest Now, Decrypt Later' quantum threats.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Passive Attacks: Detection & Prevention FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Defense Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Detection and Prevention Techniques for Passive Attacks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Defending against passive cyber attacks requires an asymmetric mindset! Because passive sniffers never transmit and leave zero log trails, you cannot wait for an IDS alarm to tell you that you are being tapped. You must embrace 100% proactive prevention: deploy hardware IEEE 802.1AE MACsec across your switch trunks, enforce TLS 1.3 with Encrypted Client Hello (ECH), inject Constant-Bitrate (CBR) dummy traffic to flatten transmission bursts, monitor dark fiber with 1625nm C-OTDR, and prepare for quantum supercomputers with Post-Quantum Cryptography (ML-KEM)!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
