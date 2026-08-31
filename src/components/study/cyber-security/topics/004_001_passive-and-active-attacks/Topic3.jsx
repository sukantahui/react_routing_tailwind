import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgAsymId = useId();

  // Studio 1: Active Characteristic Vector Selection
  const [selectedCharKey, setSelectedCharKey] = useState("zero_transmission");

  // Studio 2: Remote Sniffer Probing Simulator State
  const [probeMode, setProbeMode] = useState("fake_unicast");
  const [targetHostType, setTargetHostType] = useState("promiscuous_host");

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_canary_tokens");

  // 8 Passive Attack Characteristics for Studio 1
  const characteristicsDatabase = {
    zero_transmission: {
      key: "zero_transmission",
      name: "Zero Outbound Transmission (Listen-Only Mode)",
      category: "CORE CHARACTERISTIC",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      detectionDifficulty: "Extreme (10/10)",
      challengeSummary:
        "The sniffing device acts strictly as an electromagnetic or optical receiver, transmitting zero packets back into the network switch or medium.",
      forensicTrace: "Network Switch Logs: 0 Packets Transmitted | Port Ingress: 0 Bytes | Syslog Alerts: 0",
      detectionMethod: "Remote Promiscuous Mode ARP/ICMP Probing or Physical Conduit Inspection.",
      remedialCode: `// Remote Promiscuous Sniffer Probe (Fake Unicast MAC):
# nmap --script sniffer-detect 192.168.1.0/24
// Sends frames with valid IP but bogus unicast MAC; only promiscuous NICs reply.`
    },
    state_invariance: {
      key: "state_invariance",
      name: "System State Invariance (ΔS = ∅)",
      category: "MATHEMATICAL AXIOM",
      categoryBadge: "bg-blue-950 text-blue-300 border-blue-800",
      detectionDifficulty: "Extreme (10/10)",
      challengeSummary:
        "No database rows are altered, no system files are corrupted, and no process memory is modified during passive observation.",
      forensicTrace: "File Integrity Monitoring (Tripwire/AIDE): 0 Modifications | DB Audit Ledger: 100% Valid Hash Chain",
      detectionMethod: "Cannot be detected at OS level; requires proactive cryptographic prevention (E2EE/AEAD).",
      remedialCode: `// State-Invariant Equation:
// S_t = (Data, Config, Resources)
// S_(t+1) == S_t  → File hashes match, zero database row anomalies exist.`
    },
    minimal_energy_leakage: {
      key: "minimal_energy_leakage",
      name: "Minimal Energy Extraction (<0.3 dB Loss)",
      category: "PHYSICAL ATTRIBUTE",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      detectionDifficulty: "High (8.5/10)",
      challengeSummary:
        "Optical macrobending and copper inductive taps extract less than 2-3% of signal energy, staying well within normal link margin variances.",
      forensicTrace: "Optical Power Loss: -0.22 dB (Ignored by standard transceivers as dirty connector variance).",
      detectionMethod: "Continuous High-Resolution Optical Time-Domain Reflectometry (C-OTDR) with 0.05 dB sensitivity.",
      remedialCode: `// Optical Budget Delta Analysis:
// Baseline Power : -3.80 dBm
// Measured Power : -4.02 dBm (-0.22 dB tap loss requires C-OTDR to pinpoint)`
    },
    invisible_forensic_footprints: {
      key: "invisible_forensic_footprints",
      name: "Invisible Forensic Log Footprints",
      category: "AUDIT CHALLENGE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      detectionDifficulty: "Extreme (9.5/10)",
      challengeSummary:
        "Standard SIEM, EDR, and Firewall engines generate alerts only upon abnormal state transitions; passive eavesdropping triggers zero events.",
      forensicTrace: "Splunk / Elastic SIEM: Zero Correlation Triggers | Suricata / Snort NIDS: Zero Packet Drop Alerts",
      detectionMethod: "Canary Honeytokens planted in simulated cleartext traffic to lure sniffer into active exposure.",
      remedialCode: `// Canary Credential Insertion in Decoy API:
const canaryPayload = {
  db_user: "fintech_canary_admin",
  api_key: "CANARY_TOKEN_99812_ALERT_SOC"
}; // Triggers high-priority SIEM alert upon first login attempt`
    },
    hndl_quantum_threat: {
      key: "hndl_quantum_threat",
      name: "Harvest Now, Decrypt Later (HNDL)",
      category: "LONG-TERM RISK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      detectionDifficulty: "Permanent Concealment",
      challengeSummary:
        "Adversaries passively record encrypted diplomatic/banking traffic today without being detected, storing ciphertexts for future quantum decryption.",
      forensicTrace: "Archived Ciphertext on Foreign SAN: 10 Petabytes of 2026 TLS sessions awaiting 2035 quantum computers.",
      detectionMethod: "Proactive Post-Quantum Cryptography (PQC) Key Encapsulation (FIPS 203 ML-KEM).",
      remedialCode: `// Post-Quantum Hybrid TLS 1.3 Cipher Suite:
// Key Agreement: X25519 + ML-KEM-768 (CRYSTALS-Kyber)
// Prevents quantum factorization of recorded historical session keys.`
    },
    reconnaissance_enabler: {
      key: "reconnaissance_enabler",
      name: "Silent APT Reconnaissance Enabler",
      category: "ATTACK LIFECYCLE",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      detectionDifficulty: "High (8/10)",
      challengeSummary:
        "Passive sniffing acts as the stealthy initial reconnaissance phase for Advanced Persistent Threats, mapping topologies before launching active strikes.",
      forensicTrace: "Zero active port scans emitted; attacker listens passively over 90 days to discover admin credentials.",
      detectionMethod: "Zero Trust Network Access (ZTNA) + IEEE 802.1X Network Access Control on all physical switch ports.",
      remedialCode: `// Switch Port Security (Prevents rogue sniffer attachment):
switch(config-if)# switchport port-security
switch(config-if)# switchport port-security maximum 1
switch(config-if)# switchport port-security violation shutdown`
    },
    airgap_sidechannel: {
      key: "airgap_sidechannel",
      name: "Air-Gap Acoustic & RF Emanations",
      category: "PHYSICAL SIDE-CHANNEL",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      detectionDifficulty: "Extreme (9.5/10)",
      challengeSummary:
        "Physically disconnected networks can still leak cryptographic secrets through CPU fan acoustic resonance or TEMPEST video cable radiation.",
      forensicTrace: "Zero Ethernet packets; data exfiltrated via 1.2 kHz - 8.5 kHz acoustic vibrations to smartphone microphone.",
      detectionMethod: "Faraday shielded enclosures (TEMPEST Zone 0) and physical acoustic dampening baffles.",
      remedialCode: `// Physical TEMPEST Shielding Specification:
// Standard: NATO SDIP-27 Level A (Zone 0)
// Metallic Mesh Faraday Shielding Attenuation: >90 dB across 10 MHz to 10 GHz`
    },
    prevention_paradox: {
      key: "prevention_paradox",
      name: "The Prevention Paradox Mandate",
      category: "STRATEGIC DOCTRINE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      detectionDifficulty: "N/A (Strategic Shift)",
      challengeSummary:
        "Because real-time detection cannot be guaranteed, security doctrine must mandate 100% proactive cryptographic prevention on all links.",
      forensicTrace: "Guaranteed Security: Intercepted ciphertext is mathematically unbreakable even with unlimited capture bandwidth.",
      detectionMethod: "Proactive enforcement of IEEE 802.1AE MACsec, TLS 1.3 AEAD with ECH, and Constant-Bitrate Traffic Padding.",
      remedialCode: `// Master Proactive Prevention Directive:
// 1. All Layer 2 Switch Links : MACsec (AES-256-GCM)
// 2. All WAN Backbone Links   : IPsec Tunnel Mode (ESP) + CBR Padding
// 3. All Application APIs     : TLS 1.3 AEAD + Encrypted Client Hello (ECH)`
    }
  };

  const activeChar = characteristicsDatabase[selectedCharKey];

  // Studio 2: Interactive Sniffer Detection Simulator Logic
  const snifferSimResult = useMemo(() => {
    if (probeMode === "fake_unicast") {
      if (targetHostType === "normal_host") {
        return {
          frameStatus: "DROPPED IN HARDWARE (NIC ASIC Filter)",
          kernelState: "Kernel never receives frame; 0% CPU overhead.",
          socAlert: "NO REPLY (Host confirmed in standard non-promiscuous mode).",
          badge: "bg-emerald-950 text-emerald-300 border-emerald-800",
          isSniffer: false
        };
      } else {
        return {
          frameStatus: "ACCEPTED BY PROMISCUOUS HARDWARE FILTER",
          kernelState: "Frame passed to libpcap buffer; OS IP stack sees matching IP and replies.",
          socAlert: "ALERT! Host replied to fake unicast MAC FF:FF:FF:FF:FF:FE → PROMISCUOUS SNIFFER DETECTED!",
          badge: "bg-rose-950 text-rose-300 border-rose-800",
          isSniffer: true
        };
      }
    } else {
      // Canary Token Mode
      if (targetHostType === "normal_host") {
        return {
          frameStatus: "NORMAL TRAFFIC (No Canary Triggered)",
          kernelState: "Decoy token passes through network untouched.",
          socAlert: "Canary token remains idle; zero unauthorized access attempts.",
          badge: "bg-emerald-950 text-emerald-300 border-emerald-800",
          isSniffer: false
        };
      } else {
        return {
          frameStatus: "CANARY TOKEN CAPTURED & EXPLOITED",
          kernelState: "Sniffer extracted decoy API key from cleartext feed and attempted authentication.",
          socAlert: "HIGH-SEVERITY SIEM INCIDENT! Canary Token DB_PASS_CANARY used from IP 192.168.1.45!",
          badge: "bg-rose-950 text-rose-300 border-rose-800",
          isSniffer: true
        };
      }
    }
  }, [probeMode, targetHostType]);

  // Studio 3: Regional West Bengal Pedagogical Scenarios
  const localScenarios = [
    {
      id: "kolkata_canary_tokens",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Catching Passive Insider Sniffers Using Canary Honeytokens",
      threatType: "INSIDER PASSIVE SNIFFING (Canary Token Trap)",
      budget: "₹21,00,000",
      incident:
        "Suspecting an internal rogue administrator was passively sniffing database replication feeds on an unmanaged switch port, Mamata planted a Canary API credential inside a simulated internal JSON broadcast stream.",
      defenseStrategy:
        "Within 48 hours, the rogue sniffer attempted to use the Canary API key on the staging payment gateway. The Canary backend immediately triggered a P1 SIEM alert, capturing the insider's workstation IP and physical switch port.",
      outcome: "Insider sniffer identified and isolated; zero legitimate customer financial data compromised.",
      metrics: {
        timeToSnifferDetection: "48 Hours",
        canaryTokensPlanted: "12 Decoy Credential Sets",
        insiderIdentified: "Workstation IP 192.168.10.45",
        compliance: "RBI Cyber Master Directions Section 4.2"
      }
    },
    {
      id: "barrackpore_grid_otdr_alarm",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "PHYSICAL WIRETAP DETECTION (C-OTDR Pulse Monitoring)",
      title: "Real-Time Optical Power Delta Alarms on SCADA Telemetry",
      budget: "₹17,50,000",
      incident:
        "A physical security audit demonstrated that standard power meters missed a 0.18 dB macrobend tap installed on dark fiber linking Barrackpore to the regional load dispatch center.",
      defenseStrategy:
        "Debangshu installed Continuous Supervisory C-OTDR running at 1625 nm. The system maintains an active baseline profile and automatically trips an acoustic alarm if localized attenuation deviates by more than 0.05 dB.",
      outcome: "Any physical conduit intrusion or optical bending detected within 200 milliseconds.",
      metrics: {
        otdrThreshold: "0.05 dB Sensitivity",
        responseLatency: "180 milliseconds",
        substationsMonitored: "18 Transmission Nodes",
        statutoryMandate: "NCIIPC Critical Grid Protection Guidelines"
      }
    },
    {
      id: "ichapur_health_promisc_scan",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "REMOTE PROMISCUOUS MODE AUDITING",
      title: "Automated Subnet Scans for Unauthorized Promiscuous NICs",
      budget: "₹9,80,000",
      incident:
        "To ensure compliance with the Indian DPDP Act 2023, Mahima instituted daily automated scans using fake unicast MAC testing across 1,200 hospital endpoint workstations and diagnostic tablets.",
      defenseStrategy:
        "Mahima deployed an automated Python daemon executing fake unicast ARP probes during off-peak hours. Any endpoint replying to the test frame is immediately quarantined in a remediation VLAN.",
      outcome: "Identified and removed 2 unauthorized network analysis laptops running Wireshark in patient wards.",
      metrics: {
        endpointsAuditedDaily: "1,200 Workstations",
        unauthorizedSniffersRemoved: "2 Unauthorized Nodes",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_pqc_migration",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Telecom Research Lab",
      threatType: "HARVEST NOW, DECRYPT LATER (Quantum Defense)",
      title: "Deploying Post-Quantum Cryptography against HNDL Archives",
      budget: "₹12,00,000",
      incident:
        "Researchers simulated state-sponsored passive archiving of university research telemetry, testing classical RSA-2048 against post-quantum lattice-based key encapsulation.",
      defenseStrategy:
        "Susmita and Abhronila migrated the core research tunnel to hybrid post-quantum TLS 1.3 utilizing FIPS 203 ML-KEM-768 (CRYSTALS-Kyber) paired with X25519 elliptic-curve key exchange.",
      outcome: "Archived ciphertext rendered permanently secure against future quantum cryptanalysis.",
      metrics: {
        pqcAlgorithm: "ML-KEM-768 (CRYSTALS-Kyber)",
        handshakeOverhead: "1.2 ms Additional Latency",
        quantumResistance: "NIST Security Category 3",
        publication: "IEEE Security & Privacy Proceedings"
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
                Topic 03
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Characteristics &amp; Challenges in Detecting Passive Attacks
            </h1>
            <p className="text-xs text-gray-400">
              Detection asymmetry, the Prevention Paradox, Canary tokens, remote promiscuous probing, and PQC defenses.
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

        {/* SECTION 1: Executive Theory & The Detection Asymmetry */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              The Detection Asymmetry &amp; Prevention Paradox
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Fundamental Asymmetry: Why Passive Attacks Leave Zero Footprints
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Unlike active attacks that cause loud digital anomalies (failed login spikes, 504 timeouts, process crashes), 
              passive attacks extract information while leaving system state completely unchanged (<strong>ΔS = ∅</strong>). 
              This creates the <strong>Prevention Paradox</strong>: because real-time detection cannot be guaranteed on standard networks, 
              security strategy must focus 100% on proactive cryptographic prevention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active vs Passive Asymmetry Card 1 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-900/50 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Active Attack Forensic Profile (Loud &amp; Detectable)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">✖</span>
                  <span><strong>System State Alteration:</strong> Database rows tampered, configs corrupted.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">✖</span>
                  <span><strong>Network Impact:</strong> Packet retransmissions, abnormal connection resets, bandwidth surges.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">✖</span>
                  <span><strong>SIEM / IDS Alarms:</strong> Triggered immediately upon protocol violations.</span>
                </li>
              </ul>
            </div>

            {/* Passive Asymmetry Card 2 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-cyan-900/50 space-y-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                Passive Attack Forensic Profile (Silent &amp; Invisible)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span><strong>State Invariance:</strong> ΔS = ∅ (Zero bytes altered in data or memory).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span><strong>Network Impact:</strong> 0 bytes transmitted (Listen-only promiscuous NICs &amp; optical taps).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span><strong>SIEM / IDS Alarms:</strong> ZERO standard log events; requires specialized physical/honeytoken traps.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Detection Asymmetry Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Architectural Threat Comparison
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Architectural Comparison: Active Intrusion Alarms vs. Passive Invisibility vs. Canary Decoy
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Compare how an active intrusion immediately triggers SIEM alarms, a passive sniffer operates completely undetected, 
              and a canary honeytoken lures the passive sniffer into revealing their identity:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Box 1: Active Attack Path */}
              <g transform="translate(40, 40)">
                <rect width="240" height="240" rx="12" fill="#1c1917" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="120" y="30" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">
                  ACTIVE ATTACK PATH
                </text>
                <text x="120" y="50" fill="#fda4af" fontSize="10" textAnchor="middle">
                  TCP Tampering / SYN Flood
                </text>
                <rect x="20" y="70" width="200" height="60" rx="8" fill="#881337" opacity="0.6" />
                <text x="120" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Checksum Mismatch
                </text>
                <text x="120" y="115" fill="#fecdd3" fontSize="9.5" textAnchor="middle">
                  State Corrupted (ΔS ≠ ∅)
                </text>
                <rect x="20" y="150" width="200" height="60" rx="8" fill="#450a0a" stroke="#f43f5e" />
                <text x="120" y="175" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                  SIEM / IDS ALARM!
                </text>
                <text x="120" y="195" fill="#fca5a5" fontSize="9" textAnchor="middle">
                  SOC alerted in &lt;1 second
                </text>
              </g>

              {/* Box 2: Passive Attack Path */}
              <g transform="translate(320, 40)">
                <rect width="240" height="240" rx="12" fill="#0c1929" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="120" y="30" fill="#0ea5e9" fontSize="13" fontWeight="bold" textAnchor="middle">
                  PASSIVE ATTACK PATH
                </text>
                <text x="120" y="50" fill="#7dd3fc" fontSize="10" textAnchor="middle">
                  Promiscuous Sniffing / Fiber Tap
                </text>
                <rect x="20" y="70" width="200" height="60" rx="8" fill="#0369a1" opacity="0.6" />
                <text x="120" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Listen-Only Mode
                </text>
                <text x="120" y="115" fill="#bae6fd" fontSize="9.5" textAnchor="middle">
                  State Invariant (ΔS = ∅)
                </text>
                <rect x="20" y="150" width="200" height="60" rx="8" fill="#082f49" stroke="#0ea5e9" />
                <text x="120" y="175" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ZERO LOG FOOTPRINTS
                </text>
                <text x="120" y="195" fill="#7dd3fc" fontSize="9" textAnchor="middle">
                  Standard SIEM stays completely blind
                </text>
              </g>

              {/* Box 3: Canary Token Detection Path */}
              <g transform="translate(600, 40)">
                <rect width="240" height="240" rx="12" fill="#06281e" stroke="#10b981" strokeWidth="1.5" />
                <text x="120" y="30" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">
                  CANARY TOKEN TRAP
                </text>
                <text x="120" y="50" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                  Proactive Deception Strategy
                </text>
                <rect x="20" y="70" width="200" height="60" rx="8" fill="#065f46" opacity="0.6" />
                <text x="120" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Plant Decoy Honeytoken
                </text>
                <text x="120" y="115" fill="#a7f3d0" fontSize="9.5" textAnchor="middle">
                  Sniffer steals fake credential
                </text>
                <rect x="20" y="150" width="200" height="60" rx="8" fill="#022c22" stroke="#10b981" />
                <text x="120" y="175" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  SNIFFER EXPOSED!
                </text>
                <text x="120" y="195" fill="#6ee7b7" fontSize="9" textAnchor="middle">
                  Decoy usage exposes sniffer IP
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Characteristic Threat & Detection Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Passive Threat Characteristics &amp; Detection Challenge Dissector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a characteristic dimension below to examine why standard security controls fail and what specialized 
              instrumentation or deception strategies are required:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(characteristicsDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedCharKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedCharKey === item.key
                    ? "bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-cyan-950 text-cyan-300 border-cyan-800 self-start">
                  CHALLENGE
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeChar.categoryBadge)}>
                    {activeChar.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Detection Difficulty: {activeChar.detectionDifficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeChar.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                    Core Detection Challenge &amp; Phenomenon
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeChar.challengeSummary}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Observed Standard Forensic Log Output
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-rose-200 overflow-x-auto whitespace-pre-wrap border border-rose-950/50">
                    {activeChar.forensicTrace}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Specialized Detection / Deception Methodology
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeChar.detectionMethod}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Engineering Remediation / Command
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeChar.remedialCode}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Remote Sniffer Probing & Canary Token Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Remote Sniffer Detection &amp; Canary Token Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a detection testing paradigm below to simulate how security teams catch silent promiscuous sniffers 
              using Fake Unicast MAC tests and Canary Honeytoken lures:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Panel */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Probing &amp; Deception Controls</h3>

              <div className="space-y-2">
                <span className="text-gray-400 text-[10px] uppercase block">Select Detection Strategy:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setProbeMode("fake_unicast")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      probeMode === "fake_unicast"
                        ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    Fake Unicast MAC Test
                  </button>
                  <button
                    onClick={() => setProbeMode("canary_token")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      probeMode === "canary_token"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    Canary Honeytoken Lure
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-gray-400 text-[10px] uppercase block">Select Target Host State:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTargetHostType("normal_host")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      targetHostType === "normal_host"
                        ? "bg-indigo-950 border-indigo-500 text-indigo-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    Standard Host (Normal NIC)
                  </button>
                  <button
                    onClick={() => setTargetHostType("promiscuous_host")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      targetHostType === "promiscuous_host"
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    Rogue Sniffer (Promiscuous NIC)
                  </button>
                </div>
              </div>
            </div>

            {/* Live Simulation Output */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Kernel &amp; SIEM Diagnostic Feed</h3>

              <div className="space-y-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">NIC Hardware Filter Action</span>
                  <span className="text-xs font-bold text-white block">{snifferSimResult.frameStatus}</span>
                  <p className="text-gray-400 text-[11px]">{snifferSimResult.kernelState}</p>
                </div>

                <div className={clsx("p-3.5 rounded-lg border font-mono text-xs", snifferSimResult.badge)}>
                  <span className="font-bold block uppercase tracking-wider text-[10px]">SOC Event Monitor Result:</span>
                  <p className="mt-1">{snifferSimResult.socAlert}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita solve the challenge of 
              passive attack detection across critical West Bengal infrastructure:
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
                  The Incident &amp; Detection Challenge
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

        {/* SECTION 6: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. Legal Mandates &amp; Statutory Liabilities in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian regulatory frameworks establish strict compliance baselines to hold organizations accountable 
              even when passive eavesdropping is difficult to detect:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                Information Technology Act 2000
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to ₹1 Crore for unauthorized downloading, copying, or extracting of data packets.
                </li>
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking penalties (up to 3 years imprisonment + ₹5 Lakh fine).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Section 69 Lawful Interception
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Home Ministry Order:</strong> Lawful monitoring requires explicit written authorization from the Union or State Home Secretary.
                </li>
                <li>
                  <strong className="text-white">Mandatory Oversight:</strong> All lawful interception dockets are reviewed every 60 days by the Cabinet Oversight Committee.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 Section 8(5) &amp; 33
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Reasonable Safeguards:</strong> Mandates state-of-the-art encryption (TLS 1.3 / AES-256) at rest and in transit.
                </li>
                <li>
                  <strong className="text-white">Statutory Penalties:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for unencrypted data leaks.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Common Pitfalls, Industry Best Practices &amp; Key Hints
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
                  <strong>Waiting for Breach Alerts:</strong> Passive taps generate zero SIEM alerts; waiting for a breach alert means you will never know you are being tapped.
                </li>
                <li>
                  <strong>Assuming Air-Gaps are 100% Immune:</strong> Acoustic fan modulation and TEMPEST RF radiation can passively leak keys across air-gaps.
                </li>
                <li>
                  <strong>Ignoring Quantum HNDL Risk:</strong> Storing encrypted data with classical RSA today risks decryption by future quantum supercomputers.
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
                  <strong>Plant Canary Honeytokens:</strong> Insert decoy API keys into internal feeds to catch silent sniffers when they attempt exploitation.
                </li>
                <li>
                  <strong>Automate Fake Unicast MAC Probes:</strong> Run periodic subnet scans to identify unauthorized promiscuous NICs.
                </li>
                <li>
                  <strong>Migrate to PQC (ML-KEM):</strong> Implement post-quantum lattice-based key encapsulation to defeat 'Harvest Now, Decrypt Later'.
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
                  If a bank security guard walks around at night, how can they prove someone is standing silently in a dark room without making noise?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does a host in promiscuous mode reply to a frame addressed to a fake MAC address?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In your mind, compare an optical power meter with a continuous C-OTDR—why is localized reflectometry superior?
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
                <span>Passive attacks are state-invariant (ΔS = ∅); detection is impossible on standard routers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The Prevention Paradox requires 100% proactive reliance on end-to-end cryptography.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Canary Honeytokens alert SOC teams when stolen decoy credentials are used.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Fake Unicast MAC tests expose promiscuous NICs whose hardware filters are disabled.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Post-Quantum Cryptography (ML-KEM) neutralizes 'Harvest Now, Decrypt Later' threats.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 33 penalizes unencrypted citizen data leaks with fines up to ₹250 Crores.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Detecting Passive Attacks FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Detection Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Characteristics and Challenges in Detecting Passive Attacks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 10: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The defining challenge of passive cyber attacks is their silent, state-invariant nature (ΔS = ∅). Standard firewalls and SIEM systems will NEVER raise an alarm because no packets are dropped or modified! You must embrace the Prevention Paradox: assume every physical and wireless link is compromised, enforce 100% proactive encryption (TLS 1.3 / MACsec), deploy Canary Honeytokens for deception, and prepare for future quantum threats with Post-Quantum Cryptography (ML-KEM)!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
