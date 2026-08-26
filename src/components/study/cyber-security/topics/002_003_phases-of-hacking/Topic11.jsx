import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Studio 1: 5-Phase Defensive Shield State
  const [selectedPhaseKey, setSelectedPhaseKey] = useState("phase3_exploit");

  // Studio 2: Zero Trust Architecture Toggle State
  const [isZeroTrustActive, setIsZeroTrustActive] = useState(true);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_defense");

  // 5-Phase End-to-End Countermeasures Data for Studio 1
  const phaseDefenses = {
    phase1_recon: {
      key: "phase1_recon",
      phaseNum: 1,
      name: "Phase 1: Reconnaissance Defense",
      primaryThreat: "OSINT Harvesting, Subdomain Enumeration, WHOIS Scraping, Employee Social Engineering",
      layer1Perimeter: "External Attack Surface Management (EASM), WHOIS Privacy Protection, DNS Zone Transfer Lock",
      layer2Host: "Sanitizing HR job postings & social media policies; seeding fake Canarytokens and decoy files",
      layer3Detection: "Certificate Transparency (crt.sh) log monitoring; Dark Web leak alert telemetry",
      indianStandard: "CERT-In National Cyber Threat Feed & IT Act Section 43A Reasonable Security Practices",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "🌐"
    },
    phase2_scan: {
      key: "phase2_scan",
      phaseNum: 2,
      name: "Phase 2: Scanning & Enumeration Defense",
      primaryThreat: "Port Scanning (-sS / -sT), Service Banner Grabbing, Vulnerability Enumeration (Nessus)",
      layer1Perimeter: "Next-Gen Firewalls (NGFW) with SYN flood rate limiting; Intrusion Prevention Systems (Suricata/Snort)",
      layer2Host: "Service Banner Masking (Apache `ServerTokens Prod`, Nginx `server_tokens off`); Port Knocking",
      layer3Detection: "Automated SIEM port sweep correlation; Honeypot decoy port triggers",
      indianStandard: "NCIIPC CII Protection Guidelines & RBI Cyber Security Framework Section 3",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      icon: "🔍"
    },
    phase3_exploit: {
      key: "phase3_exploit",
      phaseNum: 3,
      name: "Phase 3: Exploitation & Gaining Access Defense",
      primaryThreat: "Memory Buffer Overflows, Web SQL Injection, Log4Shell RCE, Phishing HTML Smuggling",
      layer1Perimeter: "Cloud Web Application Firewall (WAF) reverse proxy filtering; Email Attachment Sandboxing",
      layer2Host: "Compiler Protections: Stack Canaries (`-fstack-protector-all`), ASLR, DEP/NX, Intel CET Shadow Stack",
      layer3Detection: "FIDO2 Hardware Passkeys (WebAuthn); EPSS-driven 24-hour vulnerability patch SLA",
      indianStandard: "DPDP Act 2023 Section 33 (Data Safeguards) & CERT-In 6-Hour Incident Reporting Mandate",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      icon: "🛡️"
    },
    phase4_persist: {
      key: "phase4_persist",
      phaseNum: 4,
      name: "Phase 4: Maintaining Access & Lateral Movement Defense",
      primaryThreat: "Registry Run Keys, WMI Event Subscriptions, Pass-the-Hash over SMB, C2 HTTPS Beaconing",
      layer1Perimeter: "Egress Proxy Filtering (Blocking unauthorized outbound non-443 connections); DNS Sinkholing",
      layer2Host: "Microsoft LAPS (Randomize Local Admin Passwords); Host Micro-segmentation (Block Port 445 laterally)",
      layer3Detection: "Endpoint Detection and Response (EDR); Sysmon Event ID 13/19/20/21 monitoring; UEFI Secure Boot",
      indianStandard: "RBI Master Direction on Cyber Security (Tiered Administration & Micro-segmentation)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "🏰"
    },
    phase5_tracks: {
      key: "phase5_tracks",
      phaseNum: 5,
      name: "Phase 5: Covering Tracks & Anti-Forensics Defense",
      primaryThreat: "Local Event Log Wiping (`wevtutil cl Security`), File Timestomping, Secure File Shredding",
      layer1Perimeter: "Centralized Immutable WORM Logging (Write-Once Read-Many) streaming over encrypted TLS Syslog",
      layer2Host: "File Integrity Monitoring (FIM / Wazuh); Locking shell history with `chattr +a .bash_history`",
      layer3Detection: "Instant Critical SOC Alert on Windows Event ID 1102; NTFS USN Journal & Memory Forensics",
      indianStandard: "CERT-In Directions 2022 (Mandatory 180-Day Domestic Log Archival & NTP Atomic Clock Sync)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "📜"
    }
  };

  const activePhase = phaseDefenses[selectedPhaseKey];

  // Zero Trust vs Legacy Flat Network Comparison for Studio 2
  const zeroTrustMetrics = {
    legacy: {
      title: "Legacy Perimeter-Only Flat Network",
      mttd: "18 Days (432 Hours)",
      mttr: "7 Days (168 Hours)",
      lateralMovement: "UNRESTRICTED (Pass-the-Hash compromises all 5,000 corporate machines)",
      logSurvivability: "0% (Local logs easily wiped by attacker executing `wevtutil cl`)",
      dpdpPenaltyRisk: "HIGH RISK (Up to ₹250 Crores fine under DPDP Act 2023)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    zeroTrust: {
      title: "Modern Zero Trust Defense-in-Depth (NIST SP 800-207)",
      mttd: "2.4 Minutes (Real-Time EDR/SIEM Alert)",
      mttr: "8 Minutes (Automated Host Network Isolation)",
      lateralMovement: "100% BLOCKED (Microsoft LAPS + Host Firewall Micro-segmentation)",
      logSurvivability: "100% IMMUTABLE (Real-Time TLS Streaming to WORM SIEM Archive)",
      dpdpPenaltyRisk: "ZERO PENALTY (100% Certified Reasonable Security Safeguards)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const currentMetrics = isZeroTrustActive ? zeroTrustMetrics.zeroTrust : zeroTrustMetrics.legacy;

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_defense",
      lead: "Mamata",
      role: "Lead Security Architect",
      location: "Kolkata FinTech Operations Center",
      title: "5-Phase Banking Defense-in-Depth Architecture",
      budget: "₹9,50,000",
      architecture: "Concentric Defense-in-Depth & WORM Splunk SIEM",
      dilemma:
        "Reducing enterprise Mean-Time-to-Detect (MTTD) from 18 days to minutes across core banking transaction payment gateways.",
      resolution:
        "Mamata deployed an integrated 5-phase Defense-in-Depth architecture: Cloud WAF + EDR + Microsoft LAPS + Immutable WORM Splunk, dropping MTTD to 2.4 minutes and achieving 100% RBI compliance.",
      metrics: {
        mttdReduction: "Dropped from 18 Days to 2.4 Min",
        lateralMovementResistance: "100% LAPS & Microsegmentation",
        wormLogRetention: "180 Days Mandatory Compliance",
        compliance: "RBI Master Direction & CERT-In 2022"
      }
    },
    {
      id: "ichapur_zero_trust",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "Hospital Zero Trust EHR Micro-segmentation",
      budget: "₹5,20,000",
      architecture: "NIST SP 800-207 Zero Trust & FIDO2 Passkeys",
      dilemma:
        "Preventing lateral malware movement across 12 clinical wards and protecting sensitive patient EHR medical records from ransomware.",
      resolution:
        "Mahima implemented host firewall micro-segmentation blocking peer-to-peer SMB (Port 445), enforced FIDO2 Yubikey MFA for all doctors, and met DPDP Act 2023 data security mandates.",
      metrics: {
        clinicalWardsSegmented: "12 Hospital Departments",
        fido2MfaAdoption: "100% Clinical Staff Enforced",
        dpdpDataProtection: "₹0 Breach Liability Risk",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_diode_ot",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA Hardware Unidirectional Diode Defense",
      budget: "₹8,80,000",
      architecture: "Hardware Optical Data Diode & Modbus DPI",
      dilemma:
        "Eliminating all possibility of remote software exploit traversal from corporate IT into 220kV power substation RTUs.",
      resolution:
        "Debangshu deployed hardware unidirectional optical data diodes and deep packet inspection for Modbus protocols, physically guaranteeing zero inbound packet traversal and 100% grid operational uptime.",
      metrics: {
        hardwareInboundTraversal: "0% Physical Surface (Unidirectional)",
        gridUptime: "100.00% Zero Disruption",
        ceaRegulatoryAdherence: "100% Section 70 Compliance",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_blue_team",
      lead: "Abhronila & Susmita",
      role: "University Cyber Threat Leads",
      location: "Jadavpur University AI Labs",
      title: "Blue Team SOC Incident Playbook Range",
      budget: "₹4,00,000",
      architecture: "CERT-In 6-Hour Playbook & Atomic Red Team Range",
      dilemma:
        "Teaching students how to author end-to-end incident response playbooks for mandatory CERT-In 6-hour reporting and Section 65B forensic certification.",
      resolution:
        "The team built a multi-phase SOC simulation range, training 140+ students to detect simulated APT attacks, execute automated EDR containment, and issue Section 65B compliant forensic incident reports.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        incidentResponseSLA: "Under 6 Hours CERT-In Standard",
        forensicCertificates: "100% Section 65B Admissible",
        compliance: "NCIIPC Educational Security Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cyber Security Module 002_003 • Topic 11 of 12 (Module Capstone)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Defensive Countermeasures across the 5 Hacking Phases
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Synthesize the complete multi-layered defensive blueprint: master concentric Defense-in-Depth 
            and NIST SP 800-207 Zero Trust across all 5 hacking phases, enforce CERT-In 6-hour incident reporting, and achieve DPDP Act 2023 compliance.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: 5-Phase End-to-End Defensive Shield Interactive Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 1: 5-Phase End-to-End Defensive Shield Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 5 ethical hacking phases to inspect its primary threat vector, Layer 1 perimeter defense, Layer 2 host/endpoint hardening, Layer 3 detection telemetry, and Indian statutory compliance standard.
            </p>
          </div>

          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(phaseDefenses).map((ph) => {
              const isSelected = selectedPhaseKey === ph.key;
              return (
                <button
                  key={ph.key}
                  onClick={() => setSelectedPhaseKey(ph.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{ph.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">Phase {ph.phaseNum}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{ph.name.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Defense Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePhase.badgeClass)}>
                  {activePhase.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Concentric Countermeasure Architecture
                </h3>
              </div>
            </div>

            {/* Primary Threat Vector */}
            <div className="p-4 bg-gray-900 rounded-xl border border-rose-900/30 space-y-1 text-xs">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Primary Adversary Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activePhase.primaryThreat}</p>
            </div>

            {/* 3 Defensive Layers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Layer 1: Perimeter Control</span>
                <p className="text-gray-200 leading-relaxed">{activePhase.layer1Perimeter}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Layer 2: Host &amp; OS Hardening</span>
                <p className="text-gray-200 leading-relaxed">{activePhase.layer2Host}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Layer 3: Detection &amp; Telemetry</span>
                <p className="text-gray-200 leading-relaxed">{activePhase.layer3Detection}</p>
              </div>
            </div>

            {/* Indian Regulatory Standard */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-amber-900/30 text-xs space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Indian Cyber Law &amp; Regulatory Standard:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activePhase.indianStandard}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Defense-in-Depth Zero Trust Simulator & MTTD Lab */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Studio 2: Zero Trust Simulator &amp; MTTD Lab
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle between a Legacy Perimeter-Only Flat Network and a Modern Zero Trust Defense-in-Depth architecture to compare Mean-Time-to-Detect (MTTD), lateral movement containment, and statutory DPDP compliance.
            </p>
          </div>

          <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6 shadow-2xl">
            {/* Architecture Toggle Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white">Active Architectural Posture</h3>
                <span className="text-xs text-gray-400">Comparing network breach blast radius and containment metrics</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-semibold">Legacy Flat Network</span>
                <button
                  onClick={() => setIsZeroTrustActive(!isZeroTrustActive)}
                  className={clsx(
                    "w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer",
                    isZeroTrustActive ? "bg-emerald-600" : "bg-rose-700"
                  )}
                &gt;
                  <div
                    className={clsx(
                      "bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300",
                      isZeroTrustActive ? "translate-x-7" : "translate-x-0"
                    )}
                  />
                </button>
                <span className="text-xs text-emerald-400 font-bold">Zero Trust (NIST SP 800-207)</span>
              </div>
            </div>

            {/* Active Posture Metrics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={clsx("text-xs font-bold px-3 py-1 rounded-full border", currentMetrics.badgeClass)}>
                  {currentMetrics.title}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 font-bold uppercase tracking-wider block">Mean-Time-to-Detect (MTTD)</span>
                  <span className={clsx("text-base sm:text-lg font-extrabold block", isZeroTrustActive ? "text-emerald-400" : "text-rose-400")}>
                    {currentMetrics.mttd}
                  </span>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 font-bold uppercase tracking-wider block">Mean-Time-to-Remediate (MTTR)</span>
                  <span className={clsx("text-base sm:text-lg font-extrabold block", isZeroTrustActive ? "text-emerald-400" : "text-rose-400")}>
                    {currentMetrics.mttr}
                  </span>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 font-bold uppercase tracking-wider block">Lateral Movement Status</span>
                  <span className="font-semibold text-gray-200 block text-xs">{currentMetrics.lateralMovement}</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 font-bold uppercase tracking-wider block">DPDP Act 2023 Liability</span>
                  <span className="font-semibold text-gray-200 block text-xs">{currentMetrics.dpdpPenaltyRisk}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Concentric Rings of Defense-in-Depth and NIST SP 800-207 Zero Trust Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Concentric Rings of Defense-in-Depth */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Concentric Defense-in-Depth Rings
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Ring: Perimeter */}
                  <circle cx="250" cy="160" r="140" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9">1. PERIMETER: NGFW, Cloud WAF, EASM</text>

                  {/* Ring 2: Network */}
                  <circle cx="250" cy="160" r="110" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="250" y="72" fill="#67e8f9" fontWeight="bold" textAnchor="middle" fontSize="9">2. NETWORK: Microsegmentation, IPS, TLS</text>

                  {/* Ring 3: Endpoint */}
                  <circle cx="250" cy="160" r="80" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1.5" />
                  <text x="250" y="102" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="9">3. HOST: EDR, ASLR, LAPS</text>

                  {/* Ring 4: Application */}
                  <circle cx="250" cy="160" r="50" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="250" y="130" fill="#a7f3d0" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. APP: FIDO2, WAF</text>

                  {/* Core: Crown Jewel Data */}
                  <circle cx="250" cy="160" r="24" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="250" y="163" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">DATA</text>
                  <text x="250" y="174" fill="#fca5a5" textAnchor="middle" fontSize="6.5">WORM SIEM</text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.1: Concentric Defense-in-Depth rings ensuring failure of one layer does not compromise data.
              </p>
            </div>

            {/* Diagram 2: NIST SP 800-207 Zero Trust Engine */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> Diagram B: NIST SP 800-207 Zero Trust Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Policy Decision Point (PDP) Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="130" y="25" width="240" height="90" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10.5">POLICY DECISION POINT (PDP)</text>
                    <text x="250" y="68" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8.5">Policy Engine + Policy Administrator</text>
                    <text x="250" y="85" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Evaluates: FIDO2 MFA + Device Health + Threat Intel</text>
                  </g>

                  {/* Vertical Connection */}
                  <line x1="250" y1="115" x2="250" y2="165" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="290" y="142" fill="#34d399" fontSize="7.5">Dynamic Trust Grant</text>

                  {/* Subject (Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="165" width="120" height="75" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="80" y="195" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9">SUBJECT</text>
                    <text x="80" y="210" fill="#a5b4fc" textAnchor="middle" fontSize="7.5">User / Device</text>
                  </g>

                  {/* PEP (Center) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="165" width="130" height="75" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="195" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9.5">POLICY ENFORCEMENT</text>
                    <text x="250" y="210" fill="#a5f3fc" fontWeight="bold" textAnchor="middle" fontSize="9.5">POINT (PEP)</text>
                  </g>

                  {/* Enterprise Resource (Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="360" y="165" width="120" height="75" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="420" y="195" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="9">RESOURCE</text>
                    <text x="420" y="210" fill="#fca5a5" textAnchor="middle" fontSize="7.5">Core Banking DB</text>
                  </g>

                  {/* Data Flow Arrows */}
                  <path d="M 140 202 L 185 202" stroke="#6366f1" strokeWidth="2" />
                  <path d="M 315 202 L 360 202" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowGreen17)" />

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8.5">
                    DPDP Act 2023 &amp; CERT-In 2022: Enforces continuous authentication with zero implicit trust.
                  </text>

                  <defs>
                    <marker id="arrowGreen17" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.2: NIST SP 800-207 Zero Trust Engine evaluating trust dynamically before granting access.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Enterprise Defense Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads deploy 5-phase Defense-in-Depth, Zero Trust hospital micro-segmentation, SCADA optical diodes, and Blue Team SOC incident ranges across Kolkata, Ichapur, Barrackpore, and Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Defensive Dilemma ({currentLocalScenario.architecture})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Security Architecture Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for enterprise security architects and Chief Information Security Officers (CISOs).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Blue Team Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Prioritize by EPSS:</strong> Patch flaws with high in-the-wild exploitation probability first.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Immutable WORM Logging:</strong> Ensure audit trails survive local administrative compromises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Microsoft LAPS Everywhere:</strong> Eliminate lateral Pass-the-Hash across workstation subnets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Seed Canarytokens:</strong> High-fidelity decoy triggers provide zero-false-positive early warnings.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Defensive Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Perimeter-Only Illusion:</strong> Flat internal networks collapse instantly to phishing breaches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing CERT-In 6-Hour SLA:</strong> Late incident reporting violates Section 70B statutory rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Annual-Only Penetration Testing:</strong> Configuration drift creates undetected vulnerabilities between audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Clock Skew:</strong> Unsynchronized server clocks destroy forensic evidence correlation.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Governance
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt NIST SP 800-207:</strong> Implement dynamic Policy Enforcement Points for all application access.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act 2023:</strong> Maintain certified data safeguards to avoid ₹250 Crore penalties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Continuous BAS Testing:</strong> Automate daily multi-phase threat simulations 24/7/365.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce FIDO2 Hardware Passkeys:</strong> Permanently eliminate password spraying and phishing proxies.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize key defense-in-depth and zero trust concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Enterprise Defenders
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Defense-in-Depth is the master law of cybersecurity: no single control is infallible. By arranging controls in overlapping concentric layers (EASM, NGFW, WAF, ASLR, LAPS, Immutable WORM SIEM), an attacker who bypasses one layer is stopped dead by the next.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The NIST SP 800-207 Zero Trust paradigm: by replacing static perimeter trust with continuous, dynamic context evaluation (FIDO2 authentication + device health check + least privilege), internal lateral movement becomes virtually impossible.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise architecture designs, always ensure that all server logs stream in real time over TLS to an immutable WORM SIEM cluster and synchronize with Stratum-1 atomic clocks to guarantee legal admissibility under Section 65B of the Indian Evidence Act.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Defense-in-Depth deploys overlapping controls across perimeter, host, &amp; data.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Zero Trust principles: Never Trust, Always Verify; Assume Breach; Least Privilege.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ASLR, DEP/NX, and Stack Canaries neutralize binary buffer overflow exploits.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Microsoft LAPS and micro-segmentation permanently stop lateral Pass-the-Hash.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Directions 2022 mandate 6-Hour incident reporting &amp; 180-day log archival.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023 imposes up to ₹250 Crores penalty for data breach safeguard failures.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Defensive Countermeasures across the 5 Hacking Phases FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Defensive Countermeasures across the 5 Hacking Phases (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 002_003: Phases of Hacking Methodology! You now possess an end-to-end understanding of both the adversary's offensive lifecycle (Recon, Scanning, Exploitation, Maintaining Access, Covering Tracks) and the defender's architectural mastery (Zero Trust, Defense-in-Depth, LAPS, Immutable WORM Logging, and Indian Cyber Governance). Remember: the ultimate purpose of offensive knowledge is to build an unbreachable digital fortress."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
