import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic0_files/perimeter_simulation.py?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgOnionId = useId();
  const svgPipelineId = useId();

  // Studio 1: Active Defense-in-Depth Layer Selection
  const [selectedLayerKey, setSelectedLayerKey] = useState("perimeter");

  // Studio 2: Live Packet Inspection Simulator
  const [selectedPacketType, setSelectedPacketType] = useState("sqli_attack");
  const [firewallStrictness, setFirewallStrictness] = useState("high"); // low, medium, high
  const [edrEnabled, setEdrEnabled] = useState(true);
  const [zeroTrustEnabled, setZeroTrustEnabled] = useState(true);

  // Studio 3: Mathematical Breach Probability & ROI Calculator
  const [layer1Prob, setLayer1Prob] = useState(15); // Edge Firewall Bypass % (1 - 50)
  const [layer2Prob, setLayer2Prob] = useState(10); // WAF Bypass % (1 - 50)
  const [layer3Prob, setLayer3Prob] = useState(8);  // Host EDR Evasion % (1 - 50)
  const [layer4Prob, setLayer4Prob] = useState(2);  // Data Tokenization Bypass % (1 - 50)
  const [enterpriseRevenueCrores, setEnterpriseRevenueCrores] = useState(75); // ₹ Crores

  // Studio 4: Regional West Bengal SOC Tabletop Scenario
  const [activeScenarioId, setActiveScenarioId] = useState("barrackpore_hospital_perimeter");

  // 6 Concentric Rings of Defense-in-Depth Database for Studio 1
  const defenseLayers = {
    physical: {
      key: "physical",
      ringNumber: "Layer 1",
      name: "Physical Security",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      accentColor: "#f59e0b",
      focus: "Hardware & Facilities Integrity",
      coreControls: ["Biometric Mantrap Portals", "Locking Server Racks", "CCTV Surveillance", "Chassis Intrusion Switches"],
      threatMitigated: "Physical server tampering, rogue USB implants, hardware theft, cold-boot memory extractions.",
      principle: "If an adversary attains physical access to server hardware, all software and cryptographic controls can be bypassed.",
      regionalApplication: "Securing dedicated server cages and fiber entry points across Barrackpore and Kolkata data hubs."
    },
    perimeter: {
      key: "perimeter",
      ringNumber: "Layer 2",
      name: "Perimeter Network Defense",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      accentColor: "#0284c7",
      focus: "Boundary Filtering & Edge Inspection",
      coreControls: ["Next-Gen Firewalls (NGFW)", "BGP FlowSpec Scrubbing", "Bogon & uRPF Filtering", "Edge Screening Routers"],
      threatMitigated: "Volumetric DDoS floods, unauthenticated port scans, IP address spoofing, unauthorized protocol probes.",
      principle: "Default-Deny at the boundary discards unsolicited external traffic before stateful server memory is allocated.",
      regionalApplication: "Deploying BGP Anycast DDoS mitigation with upstream Tier-1 ISPs in Kolkata."
    },
    network: {
      key: "network",
      ringNumber: "Layer 3",
      name: "Internal Network Segmentation",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      accentColor: "#6366f1",
      focus: "East-West Lateral Movement Containment",
      coreControls: ["VLAN Micro-segmentation", "802.1X Port Security", "Internal IDS/IPS (Suricata)", "Software-Defined Perimeters"],
      threatMitigated: "Lateral worm propagation (e.g. EternalBlue), subnet sniffing, ARP poisoning, rogue device connection.",
      principle: "Watertight compartments: Compromise of an administrative desktop must never permit direct reachability to the core database tier.",
      regionalApplication: "Isolating healthcare workstations in Ichapur from central patient records via private VLANs."
    },
    host: {
      key: "host",
      ringNumber: "Layer 4",
      name: "Host & Endpoint Security",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      accentColor: "#10b981",
      focus: "Operating System & Memory Integrity",
      coreControls: ["EDR Agents (CrowdStrike/Wazuh)", "Host-based Firewalls (iptables)", "Automated Kernel Patching", "ASLR / DEP Protections"],
      threatMitigated: "Ransomware payload execution, credential dumping (Mimikatz), fileless PowerShell attacks, privilege escalation.",
      principle: "Host-level behavioral monitoring detects malicious execution even when payloads traverse encrypted network tunnels.",
      regionalApplication: "Deploying automated EDR telemetry across 450 municipal workstations in Barrackpore."
    },
    application: {
      key: "application",
      ringNumber: "Layer 5",
      name: "Application & API Security",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      accentColor: "#a855f7",
      focus: "Layer 7 Logic & Input Sanitization",
      coreControls: ["Web Application Firewall (WAF)", "Parameterized SQL Queries", "OAuth2 / OIDC Gateways", "Static Code Taint Analysis"],
      threatMitigated: "OWASP Top 10 exploits (SQL Injection, XSS, SSRF, Broken Object-Level Authorization, Command Injection).",
      principle: "Application logic must treat all incoming inputs as potentially hostile and validate syntax strictly against schemas.",
      regionalApplication: "WAF virtual patching protecting Jadavpur academic portals during zero-day disclosure windows."
    },
    data: {
      key: "data",
      ringNumber: "Layer 6",
      name: "Data Security (Core Vault)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      accentColor: "#f43f5e",
      focus: "Cryptographic Confidentiality at Rest",
      coreControls: ["AES-256-GCM Encryption at Rest", "Data Tokenization", "Hardware Security Modules (HSM)", "Immutable WORM Backups"],
      threatMitigated: "Catastrophic database dump exfiltration, ransomware encryption extortion, cleartext PII theft.",
      principle: "Even if an attacker dumps 10 million database records, tokenized and encrypted values render stolen data useless.",
      regionalApplication: "Enforcing FIPS 140-2 Level 3 HSM tokenization for citizen identities under the DPDP Act 2023."
    }
  };

  // Studio 2: Packet Simulation Profiles
  const testPackets = {
    normal_traffic: {
      id: "normal_traffic",
      label: "Legitimate HTTPS Request",
      src: "203.0.113.88:51240",
      dst: "192.168.1.10:443",
      protocol: "TCP",
      payload: "GET /api/v1/catalog HTTP/1.1",
      expectedResult: "ALLOWED",
      layerPassed: "All 6 Layers",
      actionDesc: "Packet matches standard HTTPS port 443, passes WAF sanitization, and reaches application cleanly."
    },
    spoofed_bogon: {
      id: "spoofed_bogon",
      label: "Spoofed Bogon IP Packet",
      src: "127.0.0.99:49152 (Reserved)",
      dst: "192.168.1.10:443",
      protocol: "TCP (SYN)",
      payload: "Incoming connection from unroutable loopback block",
      expectedResult: "DROPPED at Layer 1 (Edge Router)",
      layerPassed: "Dropped at Edge Router",
      actionDesc: "Strict uRPF and Bogon ACLs instantly drop unroutable loopback IP from public WAN interface."
    },
    closed_port_probe: {
      id: "closed_port_probe",
      label: "Unauthorized Port Scan (Port 4444)",
      src: "198.51.100.15:60120",
      dst: "192.168.1.10:4444",
      protocol: "TCP (SYN)",
      payload: "Meterpreter bind shell listening probe",
      expectedResult: "DROPPED at Layer 2 (Stateful Firewall)",
      layerPassed: "Dropped at Firewall",
      actionDesc: "Default-Deny policy drops unsolicited probe to closed port 4444, zero state allocated in conntrack."
    },
    sqli_attack: {
      id: "sqli_attack",
      label: "Layer 7 SQL Injection Exploit",
      src: "198.51.100.42:55320",
      dst: "192.168.1.10:443",
      protocol: "TCP (HTTPS)",
      payload: "GET /search?q=admin' UNION SELECT username,password_hash FROM users--",
      expectedResult: "DROPPED at Layer 5 (WAF / AppSec)",
      layerPassed: "Dropped at WAF",
      actionDesc: "Edge firewall permits port 443, but WAF terminates TLS and blocks SQLi signature 'UNION SELECT'."
    },
    ransomware_dropper: {
      id: "ransomware_dropper",
      label: "Encrypted Ransomware Dropper",
      src: "198.51.100.77:59100",
      dst: "192.168.1.55:443",
      protocol: "TCP (HTTPS)",
      payload: "Encrypted payload triggering: [simulated_obfuscated_script_execution]",
      expectedResult: edrEnabled ? "BLOCKED at Layer 4 (Host EDR)" : "EXPLOITED (EDR Disabled!)",
      layerPassed: edrEnabled ? "Dropped by EDR Agent" : "COMPROMISED",
      actionDesc: edrEnabled
        ? "Workstation EDR detects anomalous PowerShell process spawning, terminates thread in 120ms."
        : "Without EDR, malware executes in memory and dumps local LSASS passwords!"
    },
    unauth_ssh: {
      id: "unauth_ssh",
      label: "Direct Bastion SSH Probe",
      src: "198.51.100.99:62000",
      dst: "192.168.1.5:22",
      protocol: "TCP (SSH)",
      payload: "SSH-2.0-OpenSSH_8.9 password brute-force attempt",
      expectedResult: zeroTrustEnabled ? "REJECTED at Layer 3 (Zero Trust IAM)" : "CHALLENGED",
      layerPassed: zeroTrustEnabled ? "Blocked by Zero Trust" : "Password Prompt Exposed",
      actionDesc: zeroTrustEnabled
        ? "Zero Trust Gateway drops connection: Missing mutual TLS client certificate and FIDO2 hardware key."
        : "Legacy bastion exposes password prompt, vulnerable to credential stuffing."
    }
  };

  // Studio 3: Calculated Mathematical Metrics
  const calculatedRisk = useMemo(() => {
    const p1 = layer1Prob / 100;
    const p2 = layer2Prob / 100;
    const p3 = layer3Prob / 100;
    const p4 = layer4Prob / 100;

    // Multi-layer independent compromise probability
    const pOverall = p1 * p2 * p3 * p4;
    const pOverallPercent = pOverall * 100;
    const odds = pOverall > 0 ? Math.round(1 / pOverall) : 0;

    // Single layer comparison (relying on firewall alone)
    const singleLayerRiskPercent = p1 * 100;

    // Statutory DPDP Risk Exposure (₹ Crores)
    const maxDPDPPenaltyCrores = 250; // ₹250 Crores under DPDP Act 2023
    const expectedLossWithoutDiD = (enterpriseRevenueCrores * 0.12 + maxDPDPPenaltyCrores * 0.3) * (p1);
    const expectedLossWithDiD = (enterpriseRevenueCrores * 0.12 + maxDPDPPenaltyCrores * 0.3) * (pOverall);
    const riskReductionCrores = expectedLossWithoutDiD - expectedLossWithDiD;

    return {
      pOverallPercent: pOverallPercent < 0.0001 ? pOverallPercent.toExponential(4) : pOverallPercent.toFixed(4),
      oddsFormatted: odds.toLocaleString(),
      singleLayerRiskPercent: singleLayerRiskPercent.toFixed(1),
      riskReductionCrores: riskReductionCrores.toFixed(2),
      expectedLossWithDiD: expectedLossWithDiD.toFixed(3)
    };
  }, [layer1Prob, layer2Prob, layer3Prob, layer4Prob, enterpriseRevenueCrores]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalScenarios = {
    barrackpore_hospital_perimeter: {
      id: "barrackpore_hospital_perimeter",
      title: "Barrackpore Multi-Speciality Hospital Data Center",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      budgetINR: "₹18,50,000",
      threatVector: "Targeted LockBit 3.0 Ransomware Campaign via Phishing & External Port Scan",
      defenseStrategy: "Mahima & Sukanta Hui deployed strict edge firewall default-deny policies, while Abhronila configured EDR behavioral process interception on 350 hospital terminals. Susmita established an automated 6-hour CERT-In escalation runbook.",
      outcome: "Attackers breached an unpatched edge router but were completely stopped at the network micro-segmentation layer (Layer 3), saving ₹12 Crores in potential medical record extortion."
    },
    kolkata_fintech_gateway: {
      id: "kolkata_fintech_gateway",
      title: "Kolkata Commercial Core Banking & UPI Gateway",
      location: "Sector V, Salt Lake, Kolkata, West Bengal",
      budgetINR: "₹45,00,000",
      threatVector: "Multi-Vector Layer 7 DDoS & Automated SQLi Credential Stuffing",
      defenseStrategy: "Mamata deployed an inline Cloudflare/ModSecurity WAF with virtual patch rules, while Debangshu implemented AES-256-GCM tokenization for customer bank accounts inside dedicated FIPS 140-2 Level 3 HSM vaults.",
      outcome: "2.4 million malicious requests per minute were filtered at the edge, maintaining 99.999% UPI gateway availability with zero database exposure."
    },
    ichapur_defense_scada: {
      id: "ichapur_defense_scada",
      title: "Ichapur Industrial SCADA Manufacturing Facility",
      location: "Ichapur, West Bengal",
      budgetINR: "₹32,00,000",
      threatVector: "Nation-State Supply-Chain Pivot Attempting Modbus PLC Hijacking",
      defenseStrategy: "Debangshu and Mahima built a Purdue Model Level 3.5 Industrial Demilitarized Zone (IDMZ) enforced by unidirectional optical data diodes, physically preventing external inbound packets from touching industrial PLCs.",
      outcome: "External supply-chain exploit was quarantined in the DMZ proxy, preventing physical production disruption."
    }
  };

  const currentLayer = defenseLayers[selectedLayerKey];
  const currentPacket = testPackets[selectedPacketType];
  const currentScenario = regionalScenarios[activeScenarioId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_001 • Topic 0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Introduction to Network Perimeter Defense &amp; Defense-in-Depth
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the foundational architecture of enterprise boundary protection. Transition from vulnerable monolithic "Castle-and-Moat" perimeters to resilient, multi-layered <strong className="text-sky-400">Defense-in-Depth (DiD)</strong> concentric rings and modern Zero Trust frameworks.
          </p>
        </header>

        {/* CONCEPT EXPLANATION & ARCHITECTURAL SVGS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The Architectural Foundation: From Castle-and-Moat to Concentric Defense
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Why single-layer perimeter firewalls inevitably fail, and how concentric protective rings eliminate single points of compromise.
            </p>
          </div>

          {/* SVG 1: CONCENTRIC DEFENSE-IN-DEPTH ONION MODEL */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Interactive Architecture: The 6 Concentric Rings of Defense-in-Depth
              </span>
              <span className="text-[11px] text-gray-400 font-mono">NIST SP 800-207 Aligned</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgOnionId}
                viewBox="0 0 800 360"
                className="w-full max-w-3xl h-auto"
                aria-label="Concentric Rings of Defense in Depth"
              >
                {/* Ring 1: Physical Security (Outer Ring) */}
                <circle cx="400" cy="180" r="160" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2.5" opacity="0.35" />
                <text x="400" y="35" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                  LAYER 1: PHYSICAL SECURITY (Bunker, CCTV, Biometrics, Rack Locks)
                </text>

                {/* Ring 2: Perimeter Network (Edge Firewall) */}
                <circle cx="400" cy="180" r="130" fill="#082f49" stroke="#0284c7" strokeWidth="2.5" opacity="0.45" />
                <text x="400" y="65" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  LAYER 2: PERIMETER (NGFW, BGP FlowSpec, uRPF, DDoS Scrubbing)
                </text>

                {/* Ring 3: Internal Network (Microsegmentation) */}
                <circle cx="400" cy="180" r="102" fill="#311042" stroke="#6366f1" strokeWidth="2.5" opacity="0.55" />
                <text x="400" y="92" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                  LAYER 3: NETWORK (VLANs, 802.1X, Micro-segmentation)
                </text>

                {/* Ring 4: Host & Endpoint Security */}
                <circle cx="400" cy="180" r="76" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" opacity="0.65" />
                <text x="400" y="118" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  LAYER 4: HOST (EDR, iptables, Kernel Patching)
                </text>

                {/* Ring 5: Application Security (WAF) */}
                <circle cx="400" cy="180" r="50" fill="#4c0519" stroke="#a855f7" strokeWidth="2.5" opacity="0.75" />
                <text x="400" y="142" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                  LAYER 5: APP (WAF, SQLi Defense)
                </text>

                {/* Ring 6: Core Data Vault (Center) */}
                <circle cx="400" cy="180" r="26" fill="#881337" stroke="#f43f5e" strokeWidth="3" />
                <text x="400" y="177" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                  DATA
                </text>
                <text x="400" y="188" fill="#fecdd3" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  AES-256
                </text>

                {/* Penetration Vectors (Threat Arrows) */}
                <path d="M 120 180 L 220 180" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="5,5" />
                <text x="170" y="172" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">
                  External Attack
                </text>

                <path d="M 680 180 L 580 180" stroke="#f43f5e" strokeWidth="3" strokeDasharray="5,5" />
                <text x="630" y="172" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Insider / Phishing
                </text>
              </svg>
            </div>
          </div>

          {/* Comparison Matrix: Castle-and-Moat vs Defense-in-Depth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">
                ❌ Flawed Paradigm: Castle-and-Moat
              </span>
              <p className="text-gray-300 leading-relaxed">
                Relies entirely on a single hard outer firewall. Internal networks are completely flat and implicitly trusted. When an attacker breaches the edge via a single phished VPN credential, they encounter <strong>zero internal barriers</strong>, resulting in rapid lateral movement and total ransomware lockdown.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/60 rounded-xl space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">
                ✔ Modern Doctrine: Defense-in-Depth (DiD)
              </span>
              <p className="text-gray-300 leading-relaxed">
                Assumes the perimeter will be breached. Deploys independent, overlapping security rings. If an attacker bypasses the edge firewall, they are stopped by host EDR; if EDR is bypassed, internal micro-segmentation blocks lateral movement; and tokenized database vaults prevent cleartext data theft.
              </p>
            </div>
          </div>
        </section>

        {/* STUDIO 1: DEFENSE-IN-DEPTH LAYER INSPECTOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Deep-Dive Defense-in-Depth Layer Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms, primary threat mitigations, and engineering principles across all 6 concentric rings.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentLayer.badgeColor)}>
              {currentLayer.ringNumber} Active
            </span>
          </div>

          {/* Layer Selection Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(defenseLayers).map((l) => (
              <button
                key={l.key}
                onClick={() => setSelectedLayerKey(l.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedLayerKey === l.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {l.ringNumber}: {l.name}
              </button>
            ))}
          </div>

          {/* Active Layer Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentLayer.name}
                </h3>
                <span className="text-xs text-gray-400 font-sans">Core Architectural Objective: {currentLayer.focus}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentLayer.badgeColor)}>
                {currentLayer.ringNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider block">
                  🛠️ Core Defensive Technologies:
                </span>
                <ul className="space-y-1 text-gray-300 list-disc list-inside">
                  {currentLayer.coreControls.map((ctrl, idx) => (
                    <li key={idx}>{ctrl}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">
                  🎯 Primary Threat Vectors Mitigated:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentLayer.threatMitigated}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">
                🧠 Guiding Engineering Axiom:
              </span>
              <p className="text-gray-200 italic font-mono">"{currentLayer.principle}"</p>
            </div>

            <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-900/50 text-xs text-sky-200 flex items-center gap-2">
              <span className="text-sky-400 font-bold">📍 Regional Deployment Context:</span>
              <span>{currentLayer.regionalApplication}</span>
            </div>
          </div>
        </section>

        {/* STUDIO 2: INTERACTIVE PERIMETER DEFENSE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Perimeter Defense &amp; Packet Inspection Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject various threat vectors and observe which defensive layer blocks or permits the network flow in real-time.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Live Flow Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Injected Network Traffic Flow:</label>
              <select
                value={selectedPacketType}
                onChange={(e) => setSelectedPacketType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                {Object.values(testPackets).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Host EDR Protection State:</label>
              <button
                onClick={() => setEdrEnabled(!edrEnabled)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  edrEnabled
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              &gt;
                {edrEnabled ? "✔ Host EDR Active (CrowdStrike/Wazuh)" : "❌ Host EDR Disabled"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Zero Trust IAM Enforcement:</label>
              <button
                onClick={() => setZeroTrustEnabled(!zeroTrustEnabled)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  zeroTrustEnabled
                    ? "bg-indigo-950/80 text-indigo-300 border-indigo-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              &gt;
                {zeroTrustEnabled ? "✔ Zero Trust Gatekeeper Active" : "❌ Legacy Bastion (Password Only)"}
              </button>
            </div>
          </div>

          {/* Packet Inspection Pipeline Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Simulated Ingress Packet Flow:
                </span>
                <div className="font-mono text-xs text-sky-300">
                  {currentPacket.src} ➔ {currentPacket.dst} ({currentPacket.protocol})
                </div>
              </div>
              <div className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentPacket.expectedResult.includes("ALLOWED")
                  ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                  : currentPacket.expectedResult.includes("DROPPED") || currentPacket.expectedResult.includes("BLOCKED") || currentPacket.expectedResult.includes("REJECTED")
                  ? "bg-rose-950 text-rose-300 border-rose-700"
                  : "bg-amber-950 text-amber-300 border-amber-700"
              )}>
                {currentPacket.expectedResult}
              </div>
            </div>

            {/* Payload preview */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-gray-300 space-y-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Raw L7 Payload:</span>
              <div className="text-amber-300 break-all">{currentPacket.payload}</div>
            </div>

            {/* Decision Logic Explanation */}
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-gray-300 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Security Engine Verdict &amp; Rationale:
              </span>
              <p className="leading-relaxed">{currentPacket.actionDesc}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: PERIMETER SIMULATION SCRIPT */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Perimeter Defense Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete, executable Python simulation implementing uRPF bogon checks, stateful tables, WAF regex rules, and EDR filters.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              perimeter_simulation.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="perimeter_simulation.py"
            highlightLines={[25, 41, 48, 59, 67]}
          />
        </section>

        {/* STUDIO 3: MATHEMATICAL BREACH PROBABILITY & DPDP ROI CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Mathematical Breach Risk &amp; DPDP Statutory Exposure Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Proof of multi-layered independence: P_overall = P_1 &times; P_2 &times; P_3 &times; P_4 and statutory liability under DPDP Act 2023.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono self-start sm:self-auto">
              INR ₹ Risk Engine
            </span>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>1. Firewall Bypass (P_1):</span>
                <span className="text-sky-400 font-bold">{layer1Prob}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={layer1Prob}
                onChange={(e) => setLayer1Prob(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>2. WAF Evasion (P_2):</span>
                <span className="text-purple-400 font-bold">{layer2Prob}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={layer2Prob}
                onChange={(e) => setLayer2Prob(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>3. EDR Evasion (P_3):</span>
                <span className="text-emerald-400 font-bold">{layer3Prob}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={layer3Prob}
                onChange={(e) => setLayer3Prob(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>4. Vault Bypass (P_4):</span>
                <span className="text-rose-400 font-bold">{layer4Prob}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={layer4Prob}
                onChange={(e) => setLayer4Prob(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              /&gt;
            </div>
          </div>

          {/* Mathematical Results Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1 text-center">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Single Perimeter Vulnerability</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{calculatedRisk.singleLayerRiskPercent}%</div>
              <span className="text-[10px] text-gray-500 block">Castle-and-Moat Failure Rate</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1 text-center">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Combined Defense-in-Depth Risk</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedRisk.pOverallPercent}%</div>
              <span className="text-[10px] text-gray-500 block">1 in {calculatedRisk.oddsFormatted} Odds of Full Breach</span>
            </div>

            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1 text-center">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Estimated Risk Liability Avoided</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">₹{calculatedRisk.riskReductionCrores} Cr</div>
              <span className="text-[10px] text-gray-500 block">DPDP Act (₹250 Cr Max Penalty Protection)</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL WEST BENGAL SOC TABLETOP SCENARIO */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative regional response drills authored by Sukanta Hui and the student cyber defense team.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              WB Cyber Drill
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(regionalScenarios).map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveScenarioId(s.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeScenarioId === s.id
                    ? "bg-sky-600/20 text-sky-300 border-sky-500/60"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200"
                )}
              &gt;
                {s.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentScenario.title}</h3>
                <span className="text-gray-400">Location: {currentScenario.location} • Defense Budget: {currentScenario.budgetINR}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300 font-mono self-start sm:self-auto">
                CERT-In 6-Hour Rule Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentScenario.threatVector}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Multi-Layer Defense Execution:</span>
              <p className="text-gray-300 leading-relaxed">{currentScenario.defenseStrategy}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentScenario.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Defense-in-Depth layers overlapping controls (Physical, Perimeter, Network, Host, App, Data).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Castle-and-Moat is obsolete; Zero Trust enforces "Never Trust, Always Verify" on all network flows.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Bogon filtering and uRPF (RFC 3704) at edge routers eliminate IP spoofing before firewall state allocation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Next-Gen Firewalls combine Layer 4 stateful inspection with Layer 7 Deep Packet Inspection (App-ID).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023 Section 8(5) penalizes data fiduciary security failures with fines up to ₹250 Crores.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 6-hour security incident reporting and 180-day perimeter telemetry log retention.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Introduction to Network Perimeter Defense FAQs"
            subtitle="30 In-depth Practice Questions & Defense-in-Depth Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Network Perimeter Defense (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Segment 5 of our Cyber Security track on Technological Aspects of Cyber Security, beginning with Module 005_001 on Firewalls & Perimeter Defense Architectures! Always remember that the single greatest mistake in enterprise security engineering is assuming that a hard outer perimeter is sufficient. Master the core axiom of Defense-in-Depth: no single control is infallible! Security is achieved by layering independent, overlapping controls: Edge Bogon/uRPF filters drop spoofed packets, Stateful NGFWs enforce default-deny connection tracking, WAFs inspect Layer 7 HTTP payloads, Micro-segmentation eliminates East-West lateral movement, Host EDR terminates malicious memory threads, and Hardware Security Modules (HSMs) keep data encrypted at rest. Mathematically, layering controls drives the overall breach probability down exponentially (P_overall = P_1 × P_2 × P_3 × P_4). In India, compliance with the DPDP Act 2023 mandates technical safeguards against breaches with penalties up to ₹250 Crores, and CERT-In directions mandate perimeter incident reporting within 6 hours. Study this module diligently to build truly resilient, impenetrable enterprise defense systems!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic0;
