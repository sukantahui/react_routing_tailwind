import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgComparisonId = useId();

  // Studio 1: Master Dimension Comparison Selector
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("system_state");

  // Studio 2: Multi-Stage Cyber Kill Chain Simulator State
  const [activeStageStep, setActiveStageStep] = useState(1);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_heist");

  // Studio 4: Master Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("certin_report_schema");

  // 10 Comparative Dimensions for Studio 1
  const dimensionDatabase = {
    system_state: {
      key: "system_state",
      name: "System State Alteration (ΔS)",
      category: "MATHEMATICAL STATE DYNAMICS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      passivePerspective:
        "STATE INVARIANT (ΔS = ∅): Passive attacks never modify packet bytes, transmit new packets, or alter server memory. The system operates exactly as before, with zero state transitions.",
      activePerspective:
        "STATE ALTERED (ΔS ≠ ∅): Active attacks inject payloads, flip cryptographic bits, elevate user roles, or exhaust socket queues. System state is directly mutated or degraded.",
      differentialAnalysis:
        "Because passive attacks produce zero state delta, they cannot be detected via traditional state-change logs; active attacks produce immediate state discrepancies.",
      statutoryRelevance: "Active alteration of data triggers IT Act Section 65/66 (Tampering) and Section 66F (Cyber Terrorism)."
    },
    cia_triad: {
      key: "cia_triad",
      name: "CIA Triad Impact",
      category: "SECURITY PILLAR TARGETING",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      passivePerspective:
        "CONFIDENTIALITY DESTROYED: Secret passwords, proprietary source code, patient medical records, or encryption keys are exposed to unauthorized eavesdroppers.",
      activePerspective:
        "INTEGRITY & AVAILABILITY DESTROYED: Data is modified, transactions are tampered with, identities are spoofed, or services are knocked offline (DoS).",
      differentialAnalysis:
        "Passive attacks break secrecy while leaving data intact; Active attacks corrupt data trustworthiness or destroy operational availability.",
      statutoryRelevance: "DPDP Act 2023 Section 8(5) penalizes confidentiality leaks; IT Act Section 66F penalizes availability destruction."
    },
    detection_ease: {
      key: "detection_ease",
      name: "Detection Feasibility & Telemetry",
      category: "OPERATIONAL MONITORING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      passivePerspective:
        "NEAR-IMPOSSIBLE ON STANDARD IT: Zero syslog events, zero firewall drops, zero CPU spikes. Requires physical C-OTDR optical reflectometry or Canary honeytokens.",
      activePerspective:
        "HIGHLY DETECTABLE ON SIEM: Triggers failed authentication logs, AEAD GHASH verification errors, TCP half-open buffer overflows, and WAF rate limit drops.",
      differentialAnalysis:
        "Passive defense requires 100% proactive encryption (assume tapped); Active defense uses dynamic SIEM/SOAR detection and automated containment.",
      statutoryRelevance: "CERT-In mandates reporting detected active incidents within a strict 6-hour window."
    },
    inline_requirement: {
      key: "inline_requirement",
      name: "In-Line vs. Out-of-Band Positioning",
      category: "NETWORK TOPOLOGY & PROXYING",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      passivePerspective:
        "OUT-OF-BAND & NON-INTRUSIVE: Attacker attaches physical optical splitters, span ports, or RF antennas. Packet flow continues without passing through the attacker.",
      activePerspective:
        "IN-LINE OR ROUTING MANIPULATION: Attacker must position directly in the transmission path (via ARP spoofing, BGP hijacking, or proxying) to modify or drop frames.",
      differentialAnalysis:
        "Passive sniffers can be completely invisible on the wire; Active attackers risk packet latency, connection drops, and immediate routing exposure.",
      statutoryRelevance: "In-line manipulation constitutes Cheating by Personation under IT Act Section 66D."
    },
    forensic_footprint: {
      key: "forensic_footprint",
      name: "Forensic Footprint & Evidence Trail",
      category: "DIGITAL FORENSICS & INCIDENT RESPONSE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      passivePerspective:
        "PHYSICAL LAYER EVIDENCE ONLY: Forensic investigators find no OS event logs; proof requires optical OTDR attenuation traces or physical cable tap inspections.",
      activePerspective:
        "RICH DIGITAL AUDIT LOGS: Server access logs, database transaction rollbacks, mismatched cryptographic nonces, and packet capture PCAPs provide clear evidence.",
      differentialAnalysis:
        "Passive attacks leave an ephemeral digital trail; Active attacks leave permanent forensic artifacts in SIEM and database transaction journals.",
      statutoryRelevance: "Digital audit logs are admissible as electronic evidence under Section 65B of the Indian Evidence Act."
    },
    primary_vectors: {
      key: "primary_vectors",
      name: "Primary Threat Vectors",
      category: "EXPLOITATION TAXONOMY",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      passivePerspective:
        "Packet Sniffing (Wireshark/tcpdump), Fiber Macrobending Wiretaps, Keystroke Acoustic Emanations, TEMPEST RF Snooping, and Traffic Flow Analysis.",
      activePerspective:
        "Message Tampering (Bit-flipping), Masquerade (IP/MAC/Email Spoofing), Replay Attacks, Man-in-the-Middle (SSLstrip), and Volumetric/Protocol DoS.",
      differentialAnalysis:
        "Passive vectors focus on recording and pattern recognition; Active vectors focus on injecting, modifying, or destroying packets.",
      statutoryRelevance: "Active vectors trigger criminal penalties across IT Act Sections 43, 66, 66C, 66D, and 66F."
    },
    defensive_paradigm: {
      key: "defensive_paradigm",
      name: "Defensive Architecture & Strategy",
      category: "ENGINEERING ARCHITECTURE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      passivePerspective:
        "100% PROACTIVE PREVENTIVE ENCRYPTION: IEEE 802.1AE MACsec, TLS 1.3 AEAD, Encrypted Client Hello (ECH), CBR Traffic Padding, and Post-Quantum ML-KEM.",
      activePerspective:
        "ZERO TRUST DYNAMIC FEEDBACK LOOP: Mutual TLS (mTLS), FIDO2 WebAuthn, Dynamic ARP Inspection, TCP SYN Cookies, WAF Token Bucket, and SOAR Containment.",
      differentialAnalysis:
        "Passive defense assumes the wire is already tapped and renders data unreadable; Active defense continuously verifies identity and integrity at every transaction.",
      statutoryRelevance: "DPDP Act Section 8(5) mandates reasonable technical security safeguards across both domains."
    },
    attacker_traceability: {
      key: "attacker_traceability",
      name: "Attacker Traceability & Exposure Risk",
      category: "THREAT ATTRIBUTION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      passivePerspective:
        "VIRTUALLY UNTRACEABLE: The eavesdropper never transmits electromagnetic or optical energy; locating the tap requires physical line inspection.",
      activePerspective:
        "HIGH ATTRIBUTION RISK: Injected packets carry routing headers, source IPs, TCP sequence numbers, and client TLS fingerprints that lead to attribution.",
      differentialAnalysis:
        "Passive surveillance carries near-zero risk of immediate capture; Active attacks expose the adversary's IP, tooling signatures, and timing.",
      statutoryRelevance: "Digital forensics enables prosecution under IT Act and Bharatiya Nyaya Sanhita (BNS)."
    },
    kill_chain_role: {
      key: "kill_chain_role",
      name: "Cyber Kill Chain Progression",
      category: "ADVANCED PERSISTENT THREAT (APT) LIFECYCLE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      passivePerspective:
        "RECONNAISSANCE & FOOTPRINTING: Gathers intelligence on internal subnets, software versions, API endpoints, and employee operational shift schedules.",
      activePerspective:
        "EXPLOITATION, LATERAL MOVEMENT & IMPACT: Executes privilege escalation, lateral pivoting, data exfiltration, ransomware encryption, or system destruction.",
      differentialAnalysis:
        "Passive operations prepare the battlefield; Active operations deliver the kinetic or financial payload.",
      statutoryRelevance: "Conspiracy and execution of multi-stage cyber attacks are punishable under IT Act Section 66."
    },
    statutory_penalties: {
      key: "statutory_penalties",
      name: "Statutory & Criminal Penalties in India",
      category: "INDIAN JURISPRUDENCE & STATUTORY LAW",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      passivePerspective:
        "Section 43(a) (Civil damages up to ₹1 Crore) and Section 66 (Criminal hacking: Up to 3 Years Imprisonment + ₹5 Lakh Fine).",
      activePerspective:
        "Section 66F (Cyber Terrorism: RIGOROUS LIFE IMPRISONMENT), Section 66D (Cheating by Personation: 3 Years), and Section 43(f) (System Disruption).",
      differentialAnalysis:
        "Active attacks on critical infrastructure carry the ultimate penalty in Indian cyber law: rigorous life imprisonment.",
      statutoryRelevance: "Adjudicated under IT Act 2000, DPDP Act 2023, and Bharatiya Nyaya Sanhita (BNS)."
    }
  };

  const activeDim = dimensionDatabase[selectedDimensionKey];

  // Studio 2: Live Multi-Stage Attack Simulation Data
  const killChainStages = [
    {
      step: 1,
      title: "Phase 1: Silent Passive Sniffing",
      type: "PASSIVE RECONNAISSANCE",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800",
      description:
        "Adversary attaches a span-port tap to the unsegmented switch trunk in Kolkata Salt Lake, passively sniffing unencrypted HTTP/JSON database replication feeds.",
      stateDelta: "ΔS = ∅ (Zero Server State Changes)",
      logTelemetry: "0 Syslog Events | 0 Firewall Drops | 0 SIEM Alerts",
      intelHarvested: "Discovered DB_USER='admin', API_KEY='secret_key_kolkata', Wire Transfer Endpoint: /api/v1/transfer",
      defenseStatus: "Vulnerable to Passive Sniffing (Missing mTLS / MACsec encryption on internal trunk!)"
    },
    {
      step: 2,
      title: "Phase 2: Active Identity Masquerade & In-Flight Tampering",
      type: "ACTIVE EXPLOITATION",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      description:
        "Using the harvested API key, the adversary submits an active wire transfer request, modifying the beneficiary account to an offshore bank and flipping amount bytes from ₹500 to ₹12,00,00,000.",
      stateDelta: "ΔS ≠ ∅ (Unauthorized Wire Transfer Transaction Injected)",
      logTelemetry: "HTTP POST /api/v1/transfer emitted | In-Flight AEAD GHASH Tag Check Initiated",
      intelHarvested: "Adversary attempting to extract ₹12 Crores",
      defenseStatus: "Zero Trust Gateway verifies AEAD GHASH tag and checks client certificate."
    },
    {
      step: 3,
      title: "Phase 3: Automated Zero Trust & SOAR Containment",
      type: "ZERO TRUST DEFENSE & RECOVERY",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description:
        "AEAD Galois GHASH tag verification fails due to in-flight parameter tampering. SIEM correlation triggers a SOAR playbook that isolates switch port Gig0/12 in 140 ms and revokes the API key.",
      stateDelta: "ΔS = Rolled Back (Transaction Aborted, Port Isolated)",
      logTelemetry: "SIEM Alert ID 9012 'AEAD_GHASH_MISMATCH' | SOAR API Call: Port Gig0/12 Shutdown in 140ms",
      intelHarvested: "Attacker IP 192.168.10.45 isolated; ₹12 Crore wire transfer completely prevented!",
      defenseStatus: "100% Financial Integrity Protected; Formal 6-Hour Incident Report dispatched to CERT-In."
    }
  ];

  const currentStage = killChainStages.find((s) => s.step === activeStageStep) || killChainStages[0];

  // Studio 4: Master Compliance & Incident Response Database
  const codeDatabase = {
    certin_report_schema: {
      name: "CERT-In Mandatory 6-Hour Incident Report Schema",
      code: `{
  "incident_report": {
    "reporting_entity": "Kolkata Salt Lake FinTech Core Ltd",
    "organization_type": "Banking & Financial Intermediary",
    "incident_category": "BLENDED_PASSIVE_RECON_ACTIVE_TAMPERING",
    "timestamp_detection": "2026-08-23T11:40:00+05:30",
    "timestamp_reporting": "2026-08-23T14:15:00+05:30",
    "sla_compliance": "Reported within 2h 35m (Compliant with 6-Hour CERT-In SLA)",
    "statutory_mandate": "Section 70B Information Technology Act 2000",
    "technical_details": {
      "passive_phase": "Span port promiscuous sniffing on internal VLAN 10",
      "active_phase": "In-flight payload modification on /api/v1/transfer (Attempted ₹12 Cr fraud)",
      "containment_action": "AEAD GHASH verification failed; SOAR isolated port Gig0/12 in 140ms",
      "data_compromise": "Zero citizen financial records altered; integrity 100% intact"
    }
  }
}`,
      explanation: "Standard JSON incident report format submitted to CERT-In (incident@cert-in.org.in) within the mandatory 6-hour SLA under Section 70B of the IT Act."
    },
    zero_trust_blueprint: {
      name: "Unified Zero Trust Python Defense & SOAR Daemon",
      code: `import hmac, hashlib, redis, requests

def verify_and_contain(payload_bytes, received_tag, secret_key, switch_ip, port):
    # 1. Cryptographic Invariant: AEAD / HMAC Integrity Check
    computed_tag = hmac.new(secret_key, payload_bytes, hashlib.sha256).hexdigest()
    
    if not hmac.compare_digest(computed_tag, received_tag):
        # 2. Tampering Detected -> Execute SOAR Automated Containment (<150ms)
        print("[!] ACTIVE TAMPERING DETECTED: Discarding packet & isolating port!")
        
        # Shutdown switch port via RESTCONF API
        requests.patch(
            f"https://{switch_ip}/restconf/data/ietf-interfaces:interfaces/interface={port}",
            json={"ietf-interfaces:interface": {"name": port, "enabled": False}},
            auth=('admin', 'VaultSecret'), verify='/certs/ca.crt'
        )
        return False
    return True`,
      explanation: "Python implementation demonstrating the active mitigation feedback loop: verifying cryptographic invariants and triggering automated sub-second port containment."
    },
    penalty_matrix: {
      name: "Indian Cyber Law & DPDP Act Statutory Penalty Matrix",
      code: `// Statutory & Criminal Liability Matrix (Republic of India):
// --------------------------------------------------------------------------------
// Section 66F IT Act : CYBER TERRORISM (Critical Infrastructure DoS/Tampering) ➔ LIFE IMPRISONMENT
// Section 66D IT Act : Cheating by Personation / MitM Phishing ➔ Up to 3 Years Prison + ₹1 Lakh Fine
// Section 66  IT Act : Criminal Hacking & Data Tampering ➔ Up to 3 Years Prison + ₹5 Lakh Fine
// Section 43  IT Act : Civil Damages for Unauthorized Extraction/Disruption ➔ Up to ₹1,00,00,000
// Section 33 DPDP Act: Severe Citizen Data Privacy Breaches ➔ Statutory Fines up to ₹250,00,00,000
// CERT-In Directive  : Mandatory Incident Reporting within a strict 6-HOUR WINDOW`,
      explanation: "Reference matrix outlining statutory criminal sentences, civil compensation limits, and DPDP privacy fines under Indian jurisprudence."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_heist",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Hub",
      title: "Defeating Blended Passive Sniffing & ₹12 Crore Active Wire Tampering",
      threatType: "BLENDED THREAT (Passive Sniffing ➔ Active Tampering & Masquerade)",
      budget: "₹45,00,000",
      incident:
        "Adversaries passively sniffed internal banking switch links to steal API keys, then actively attempted to modify a ₹500 transaction into a ₹12 Crore wire transfer to an offshore account.",
      defenseStrategy:
        "Mamata deployed a Zero Trust architecture combining IEEE 802.1AE MACsec on switch trunks, AEAD (AES-256-GCM) with 128-bit GHASH verification, and FIDO2 WebAuthn hardware keys.",
      outcome: "AEAD GHASH check failed on the tampered amount; SOAR shut down the rogue switch port in 140 ms; ₹12 Crores preserved.",
      metrics: {
        fraudPrevented: "₹12,00,00,000",
        containmentSpeed: "140 milliseconds",
        certInCompliance: "Reported in 2h 35m",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_blackout",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "BLENDED THREAT (Passive Acoustic/SCADA Analysis ➔ Active SYN Flood & Replay)",
      title: "Neutralizing Substation Blackout Attack on High-Voltage Power Grid",
      budget: "₹26,00,000",
      incident:
        "Attackers passively recorded transformer 100 Hz acoustic hum to map industrial peak loads, then launched a 10M Mpps TCP SYN flood while actively replaying Modbus 0x05 breaker trip commands.",
      defenseStrategy:
        "Debangshu deployed C-OTDR (1625 nm) dark fiber monitoring, hardware SYN Proxies with Linux SYN Cookies, and IPsec 64-bit Anti-Replay sliding windows on RTU controllers.",
      outcome: "SYN flood absorbed without state buffer exhaustion; replayed Modbus commands discarded; grid blackout averted.",
      metrics: {
        synFloodAbsorbed: "10 Million SYNs/sec",
        substationsProtected: "18 High-Voltage Nodes",
        gridBlackoutPrevented: "100% Continuous Telemetry",
        statutoryMandate: "IT Act Section 66F (Cyber Terrorism Immunity)"
      }
    },
    {
      id: "ichapur_clinical_ransomware",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "BLENDED THREAT (Passive Wi-Fi Sniffing ➔ Active SSLstrip & Ransomware)",
      title: "Protecting Oncology Chemotherapy Databases & Neutralizing Ransomware",
      budget: "₹16,50,000",
      incident:
        "Adversaries passively sniffed cleartext DICOM radiology scans on guest Wi-Fi, executed an active SSLstrip attack on physician logins, and attempted to alter chemotherapy dosage databases.",
      defenseStrategy:
        "Mahima deployed Private VLANs, HSTS Preloading on medical portals, AEAD Galois encryption on oncology databases, and WPA3-Enterprise 802.1X EAP-TLS on hospital tablets.",
      outcome: "SSLstrip blocked by HSTS Preload; tampered dosage packets rejected by AEAD; hospital data integrity preserved.",
      metrics: {
        patientsProtected: "120,000 Oncology Records",
        tamperingPrevented: "100% Chemotherapy Prescriptions",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_quantum_rpki",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "BLENDED THREAT (Passive Quantum Archiving ➔ Active ReDoS & BGP Hijack)",
      title: "Building Quantum-Resistant & BGP Route Authenticated Networks",
      budget: "₹19,00,000",
      incident:
        "Researchers simulated state-sponsored 'Harvest Now, Decrypt Later' archiving of research telemetry combined with an active ReDoS algorithmic flood and BGP prefix hijacking.",
      defenseStrategy:
        "Susmita and Abhronila deployed hybrid post-quantum TLS 1.3 with FIPS 203 ML-KEM-768, RE2 DFA linear-time regex engines, and RPKI BGP Route Origin Authorization validation.",
      outcome: "Archived telemetry secured against quantum decryption; ReDoS evaluated in 0.01 ms; hijacked BGP prefixes dropped.",
      metrics: {
        quantumResistance: "NIST Security Category 3 (ML-KEM)",
        regexExecutionTime: "0.01 ms (O(n) Linear Time)",
        bgpPrefixSecurity: "100% RPKI Validated",
        publication: "IEEE Transactions on Information Forensics & Security"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-purple-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 11 (Capstone Synthesis)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Active vs Passive Attack Scenario Analysis
            </h1>
            <p className="text-xs text-gray-400">
              10-point master comparative matrix, multi-stage cyber kill chain simulation, and West Bengal field case studies.
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

        {/* SECTION 1: Executive Theory & The Master Duality */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Capstone Synthesis &amp; Foundational Duality
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Master Dichotomy: Passive Reconnaissance vs. Active Exploitation
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Cybersecurity engineering classifies all cyber threats into two foundational paradigms based on their interaction 
              with <strong>System State (S)</strong> and the <strong>CIA Triad</strong>. Understanding the fundamental duality between 
              silent passive intelligence gathering (<strong>ΔS = ∅</strong>) and active disruptive exploitation (<strong>ΔS ≠ ∅</strong>) 
              is essential for architecting resilient enterprise defense systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Passive Summary Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-cyan-950/60 space-y-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                Passive Attacks: Secrecy &amp; Intelligence Gathering
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>System State:</strong> Invariant (ΔS = ∅). Zero bits altered, zero server memory modified.</li>
                <li>• <strong>CIA Impact:</strong> Compromises <strong>Confidentiality</strong> (Integrity and Availability intact).</li>
                <li>• <strong>Detection:</strong> Near-impossible on standard IT logs (requires C-OTDR / Canary Honeytokens).</li>
                <li>• <strong>Defensive Shield:</strong> 100% Proactive Prevention (TLS 1.3, MACsec, CBR Padding, ML-KEM).</li>
              </ul>
            </div>

            {/* Active Summary Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Active Attacks: Disruption, Fraud &amp; Tampering
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>System State:</strong> Altered (ΔS ≠ ∅). Bits flipped, identities spoofed, socket queues flooded.</li>
                <li>• <strong>CIA Impact:</strong> Directly compromises <strong>Integrity</strong> and/or <strong>Availability</strong>.</li>
                <li>• <strong>Detection:</strong> Highly detectable on SIEM (triggers hash mismatches, buffer overflows).</li>
                <li>• <strong>Defensive Shield:</strong> Zero Trust Dynamic Feedback Loop (AEAD, mTLS, FIDO2, SOAR in &lt;200ms).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Cyber Kill Chain Progression */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Cyber Kill Chain Progression
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing the Multi-Stage Progression: Passive Recon ➔ Active Attack ➔ Zero Trust Defense
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how adversaries bridge silent passive sniffing into active fraud, and how the Zero Trust gateway 
              intercepts the tampering and triggers automated SOAR containment:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: PASSIVE RECONNAISSANCE */}
              <g transform="translate(40, 95)">
                <rect width="180" height="130" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="90" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 1: PASSIVE
                </text>
                <text x="90" y="44" fill="#7dd3fc" fontSize="9" textAnchor="middle">
                  Silent Packet Sniffing (ΔS = ∅)
                </text>
                <rect x="12" y="56" width="156" height="58" rx="6" fill="#0c4a6e" />
                <text x="90" y="74" fill="#bae6fd" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  HARVESTS INTELLIGENCE:
                </text>
                <text x="90" y="90" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  DB_USER='admin'
                </text>
                <text x="90" y="104" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  API_KEY='secret_kolkata'
                </text>
              </g>

              {/* PATH 1: Passive -> Active */}
              <path d="M 220 160 L 340 160" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              <circle r="4" fill="#f59e0b">
                <animateMotion path="M 220 160 L 340 160" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* STAGE 2: ACTIVE EXPLOITATION */}
              <g transform="translate(340, 95)">
                <rect width="190" height="130" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="95" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 2: ACTIVE
                </text>
                <text x="95" y="44" fill="#fecdd3" fontSize="9" textAnchor="middle">
                  In-Flight Tampering (ΔS ≠ ∅)
                </text>
                <rect x="12" y="56" width="166" height="58" rx="6" fill="#450a0a" stroke="#f87171" />
                <text x="95" y="74" fill="#fca5a5" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  TAMPERED WIRE TRANSFER:
                </text>
                <text x="95" y="90" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  ₹500 ➔ ₹12,00,00,000
                </text>
                <text x="95" y="104" fill="#fca5a5" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  To: Offshore Bank
                </text>
              </g>

              {/* PATH 2: Active -> Zero Trust Defense */}
              <path d="M 530 160 L 650 160" stroke="#10b981" strokeWidth="3" fill="none" />
              <circle r="5" fill="#10b981">
                <animateMotion path="M 530 160 L 650 160" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* STAGE 3: ZERO TRUST & SOAR DEFENSE */}
              <g transform="translate(650, 80)">
                <rect width="190" height="160" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="95" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PHASE 3: ZERO TRUST
                </text>
                <text x="95" y="44" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                  AEAD GHASH + SOAR (&lt;150ms)
                </text>
                <rect x="12" y="56" width="166" height="42" rx="6" fill="#022c22" />
                <text x="95" y="72" fill="#6ee7b7" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  GHASH TAG MISMATCH!
                </text>
                <text x="95" y="86" fill="#d1fae5" fontSize="8" textAnchor="middle">
                  Tampered Packet Dropped
                </text>
                <rect x="12" y="104" width="166" height="42" rx="6" fill="#052e16" stroke="#10b981" />
                <text x="95" y="120" fill="#a7f3d0" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  SOAR PORT ISOLATION
                </text>
                <text x="95" y="134" fill="#6ee7b7" fontSize="8" textAnchor="middle">
                  Port Gig0/12 Closed in 140ms
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 10-Dimension Master Comparative Dissector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. The 10-Dimension Master Comparative Dissector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select any comparative evaluation dimension below to examine the side-by-side technical distinctions, 
              architectural differences, and statutory legal implications under Indian law:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {Object.values(dimensionDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedDimensionKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedDimensionKey === item.key
                    ? "bg-purple-950/80 border-purple-500 shadow-lg shadow-purple-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded border bg-purple-950 text-purple-300 border-purple-800 self-start">
                  DIMENSION
                </span>
                <span className="font-bold text-white text-[10.5px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeDim.categoryBadge)}>
                  {activeDim.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{activeDim.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {/* Passive Perspective */}
              <div className="bg-gray-950 p-4 rounded-lg border border-cyan-950/60 space-y-2">
                <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                  Passive Attack Dimension
                </span>
                <p className="text-gray-300 leading-relaxed">{activeDim.passivePerspective}</p>
              </div>

              {/* Active Perspective */}
              <div className="bg-gray-950 p-4 rounded-lg border border-rose-950/60 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                  Active Attack Dimension
                </span>
                <p className="text-gray-300 leading-relaxed">{activeDim.activePerspective}</p>
              </div>
            </div>

            {/* Differential Analysis & Statutory Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                  Architectural Differential Synthesis
                </span>
                <p className="text-gray-300 leading-relaxed">{activeDim.differentialAnalysis}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                <span className="font-bold text-purple-400 uppercase tracking-wider text-[10px] block">
                  Statutory Jurisprudence in India
                </span>
                <p className="text-gray-300 leading-relaxed font-semibold text-purple-200">{activeDim.statutoryRelevance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Multi-Stage Cyber Kill Chain Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Multi-Stage Cyber Kill Chain &amp; Containment Simulator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Step through the stages of a real-world blended cyber attack to evaluate state delta transitions, 
              log telemetry, and Zero Trust automated containment:
            </p>
          </div>

          {/* Step Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {killChainStages.map((stage) => (
              <button
                key={stage.step}
                onClick={() => setActiveStageStep(stage.step)}
                className={clsx(
                  "p-3.5 rounded-xl border text-left transition-all duration-300 space-y-1.5",
                  activeStageStep === stage.step
                    ? "bg-purple-950 border-purple-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded border", stage.badgeClass)}>
                  Step {stage.step} · {stage.type}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{stage.title}</h4>
              </button>
            ))}
          </div>

          {/* Current Stage Breakdown */}
          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{currentStage.title}</h3>
              <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", currentStage.badgeClass)}>
                {currentStage.type}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-xs">{currentStage.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-950 p-3.5 rounded-lg border border-gray-800 space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">Mathematical State Delta (ΔS)</span>
                <span className="font-mono text-xs text-white font-bold block">{currentStage.stateDelta}</span>
              </div>

              <div className="bg-gray-950 p-3.5 rounded-lg border border-gray-800 space-y-1">
                <span className="text-[10px] text-cyan-400 uppercase font-bold block">SOC Log Telemetry</span>
                <span className="font-mono text-xs text-white font-bold block">{currentStage.logTelemetry}</span>
              </div>
            </div>

            <div className="bg-gray-950 p-3.5 rounded-lg border border-gray-800 space-y-1">
              <span className="text-[10px] text-indigo-400 uppercase font-bold block">Adversary Activity &amp; Extracted Data</span>
              <p className="text-gray-300 font-mono">{currentStage.intelHarvested}</p>
            </div>

            <div className="p-3.5 rounded-lg border bg-gray-900 border-gray-800 text-gray-300">
              <strong className="text-white block uppercase tracking-wider text-[10px]">Zero Trust Defensive State:</strong>
              <p className="mt-1">{currentStage.defenseStatus}</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Master Compliance & Incident Response Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Incident Response &amp; Statutory Schemas
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Master Compliance &amp; Incident Response Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore the official CERT-In mandatory 6-hour incident report JSON schema, unified Zero Trust Python containment scripts, 
              and the statutory penalty matrix under Indian law:
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
                Statutory Code
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita analyze and defend 
              against complex blended attacks across West Bengal critical infrastructure:
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
                  The Incident &amp; Blended Attack
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
              7. Comparative Statutory Penalties &amp; Compliance Mandates in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber jurisprudence treats active disruption on critical infrastructure as Cyber Terrorism with rigorous life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F (Cyber Terrorism)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Critical Infrastructure Attacks:</strong> Denying access or tampering with power grids or banking switches carries <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 Section 43 &amp; 66
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43:</strong> Civil compensation up to ₹1 Crore for unauthorized packet extraction and system disruption.
                </li>
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking (Up to 3 years prison + ₹5 Lakh fine).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Penalties up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement reasonable security safeguards.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all active incidents within <strong className="text-white">6 hours</strong>.
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
                  <strong>Treating Passive Attacks as Harmless:</strong> Passive reconnaissance provides the exact credentials and blueprints needed for devastating active heists.
                </li>
                <li>
                  <strong>Expecting SIEM Alerts for Passive Sniffing:</strong> Passive wiretaps generate zero logs; specialized C-OTDR and Honeytokens are required.
                </li>
                <li>
                  <strong>Relying on Perimeter Defenses for Active Insider Attacks:</strong> Zero Trust micro-segmentation is mandatory inside corporate networks.
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
                  <strong>Enforce 100% Proactive Encryption:</strong> Deploy IEEE 802.1AE MACsec and TLS 1.3 to neutralize passive eavesdropping.
                </li>
                <li>
                  <strong>Implement Zero Trust mTLS &amp; FIDO2:</strong> Authenticate every microservice and eliminate password phishing.
                </li>
                <li>
                  <strong>Automate Containment via SOAR:</strong> Isolate compromised switch ports in sub-second time (&lt;150 ms).
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
                  Why is a passive wiretap state-invariant (ΔS = ∅) while an active bit-flipping attack alters state (ΔS ≠ ∅)?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How do Canary Honeytokens convert a silent passive sniffer into a detectable active authentication alert?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the Cyber Kill Chain simulator above, advance to Phase 3 and observe how the Zero Trust gateway aborts the ₹12 Crore wire transfer.
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-purple-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Passive attacks leave state invariant (ΔS = ∅) and violate Confidentiality.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Active attacks alter state (ΔS ≠ ∅) and violate Integrity or Availability.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Passive defense requires 100% proactive encryption; Active defense uses Zero Trust SOAR.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Canary tokens bridge silent passive sniffing into active, detectable SIEM alerts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act mandates LIFE IMPRISONMENT for Cyber Terrorism on critical infrastructure.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>All active cyber security breaches must be reported to CERT-In within a mandatory 6-hour window.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Active vs Passive Attack Scenario Analysis FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Capstone Scenario Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Active vs Passive Attack Scenario Analysis (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 004_001 on Passive and Active Cyber Attacks! Remember the grand architectural principle: you cannot separate passive and active defense in the real world. Passive eavesdropping is the reconnaissance reconnaissance engine that enables active tampering and fraud. To build true cyber resilience, you must unify both domains: enforce 100% proactive encryption (IEEE 802.1AE MACsec, TLS 1.3, and Post-Quantum ML-KEM) to defeat passive surveillance, combined with Zero Trust Mutual TLS (mTLS), FIDO2 WebAuthn, AEAD Galois integrity verification, and sub-second automated SOAR containment to crush active attacks. Remember that under Section 66F of the Indian IT Act, attacking national critical infrastructure carries LIFE IMPRISONMENT!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
