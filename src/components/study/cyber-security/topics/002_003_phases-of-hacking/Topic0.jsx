import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Studio 1: 5-Phase Hacking Lifecycle State
  const [selectedPhaseKey, setSelectedPhaseKey] = useState("phase_1_recon");

  // Studio 2: Cross-Framework Alignment State
  const [selectedFrameworkKey, setSelectedFrameworkKey] = useState("classic_5_phases");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_upi_pentest");

  // 5 Phases Data for Studio 1
  const hackingPhases = {
    phase_1_recon: {
      key: "phase_1_recon",
      phaseNum: "01",
      name: "Phase 1: Reconnaissance (Footprinting)",
      icon: "🔍",
      color: "from-blue-600 to-indigo-700",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      objective:
        "Gather maximum public, organizational, and technical intelligence about the target organization without triggering alarms (Passive OSINT vs Active DNS footprinting).",
      offensiveArsenal: "WHOIS, crt.sh (Certificate Transparency), Shodan, Google Dorks, Maltego, theHarvester, DNSRecon",
      defensiveRemedy: "Minimizing public digital footprint, enforcing domain WHOIS privacy, and deploying RFC 9116 security.txt.",
      ethicalMandate:
        "Do not engage in physical trespassing or unauthorized phone pretexting without signed Rules of Engagement (RoE) explicit social engineering scope."
    },
    phase_2_scanning: {
      key: "phase_2_scanning",
      phaseNum: "02",
      name: "Phase 2: Scanning & Enumeration",
      icon: "📡",
      color: "from-cyan-500 to-teal-600",
      badgeClass: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
      objective:
        "Actively probe discovered IP ranges to identify live hosts, open TCP/UDP ports, operating system versions, and extract usernames, shares, and vulnerable service banners.",
      offensiveArsenal: "Nmap, Masscan, Nessus Professional, OpenVAS, Nikto, enum4linux, rpcclient, SNMPwalk",
      defensiveRemedy: "Next-Gen Firewall (NGFW) port scan drop rules, disabling unneeded services, and removing verbose server header banners.",
      ethicalMandate:
        "Rate-limit automated scans to prevent overloading fragile production servers, especially in clinical hospital or SCADA industrial environments."
    },
    phase_3_gaining_access: {
      key: "phase_3_gaining_access",
      phaseNum: "03",
      name: "Phase 3: Gaining Access (Exploitation)",
      icon: "💥",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      objective:
        "Exploit identified vulnerabilities (network buffer overflows, web application logic flaws, SQL injection, default credentials) to achieve initial remote code execution or unauthorized shell access.",
      offensiveArsenal: "Metasploit Framework, Burp Suite Professional, SQLmap, Hydra, Ghidra, Immunity Debugger",
      defensiveRemedy: "Web Application Firewalls (WAF), operating system ASLR/DEP memory protections, patch management, and Multi-Factor Authentication (MFA).",
      ethicalMandate:
        "Use non-destructive Proof-of-Concepts (PoCs); never crash production databases or alter live customer data."
    },
    phase_4_maintaining_access: {
      key: "phase_4_maintaining_access",
      phaseNum: "04",
      name: "Phase 4: Maintaining Access (Persistence & C2)",
      icon: "⚓",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      objective:
        "Establish durable, stealthy persistence (registry run keys, scheduled tasks, webshells, C2 beacons) to retain access across reboots, and execute vertical privilege escalation and lateral movement.",
      offensiveArsenal: "Cobalt Strike, Sliver C2, Havoc, Mimikatz (LSASS Dumping), BloodHound, LinPEAS / WinPEAS",
      defensiveRemedy: "Endpoint Detection and Response (EDR), Zero Trust Network Architecture, and Just-In-Time (JIT) least privilege access.",
      ethicalMandate:
        "Keep an exact inventory of all dropped test beacons and credentials created to guarantee 100% complete removal."
    },
    phase_5_clearing_tracks: {
      key: "phase_5_clearing_tracks",
      phaseNum: "05",
      name: "Phase 5: Clearing Tracks (Anti-Forensics vs Cleanup)",
      icon: "🧹",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      objective:
        "Adversary Goal: Erase audit logs and timestomp files to evade detection; Ethical Goal: Clean up all dropped tools, restore configurations, and preserve client compliance audit logs.",
      offensiveArsenal: "wevtutil (Log clearer), timestomp, sdelete (Secure wiper), shred, /dev/null redirection",
      defensiveRemedy: "Centralized Immutable WORM Logging (Splunk/Sentinel), 180-Day domestic CERT-In log archival, and tamper-proof Syslog streams.",
      ethicalMandate:
        "NEVER delete or alter client audit logs! Clean up your own test artifacts only and document all remediation actions in the report."
    }
  };

  const activePhase = hackingPhases[selectedPhaseKey];

  // Frameworks Comparison Data for Studio 2
  const frameworksData = {
    classic_5_phases: {
      key: "classic_5_phases",
      name: "Classic CEH 5-Phase Methodology",
      stages: [
        "1. Reconnaissance (Footprinting)",
        "2. Scanning & Enumeration",
        "3. Gaining Access (Exploitation)",
        "4. Maintaining Access (Persistence)",
        "5. Clearing Tracks (Anti-Forensics)"
      ],
      description: "The traditional educational framework established by EC-Council, focusing on the end-to-end intrusion sequence from an auditor's perspective.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    cyber_kill_chain: {
      key: "cyber_kill_chain",
      name: "Lockheed Martin Cyber Kill Chain (7 Stages)",
      stages: [
        "1. Reconnaissance (Harvesting email addresses & IP assets)",
        "2. Weaponization (Coupling exploit with backdoor payload)",
        "3. Delivery (Transmitting weaponized payload via email/web)",
        "4. Exploitation (Triggering vulnerability code execution)",
        "5. Installation (Installing malware/webshell on endpoint)",
        "6. Command & Control (Opening outbound C2 channel)",
        "7. Actions on Objectives (Data exfiltration or ransomware encryption)"
      ],
      description: "Military-derived defensive model focusing on breaking the adversarial chain at any of the 7 stages to neutralize the attack.",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    },
    mitre_attack: {
      key: "mitre_attack",
      name: "MITRE ATT&CK Enterprise (14 Tactics)",
      stages: [
        "TA0043: Reconnaissance • TA0042: Resource Development",
        "TA0001: Initial Access • TA0002: Execution",
        "TA0003: Persistence • TA0004: Privilege Escalation",
        "TA0005: Defense Evasion • TA0006: Credential Access",
        "TA0007: Discovery • TA0008: Lateral Movement",
        "TA0009: Collection • TA0011: Command and Control",
        "TA0010: Exfiltration • TA0040: Impact"
      ],
      description: "The global industry-standard knowledge base of real-world adversary TTPs used by enterprise SOCs for threat hunting and detection engineering.",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    }
  };

  const activeFramework = frameworksData[selectedFrameworkKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_upi_pentest",
      lead: "Mamata",
      role: "Lead Penetration Testing Consultant",
      location: "Kolkata FinTech Operations Center",
      title: "Core Banking UPI Switch 5-Phase Audit",
      budget: "₹9,50,000",
      targetScope: "Core UPI 2.0 Microservice Clusters",
      dilemma:
        "Conducting an authorized penetration test on high-throughput UPI payment switches without disrupting live customer transactions or violating RBI compliance.",
      resolution:
        "Mamata executed passive OSINT in Phase 1, rate-limited Nmap scanning in Phase 2, discovered an unauthenticated IDOR in Phase 3, maintained non-destructive access in Phase 4, and cleanly removed test accounts in Phase 5 without touching live production audit logs.",
      metrics: {
        phasesExecuted: "All 5 Phases Validated",
        vulnerabilitiesRemediated: "1 Critical IDOR + 2 High CVEs",
        productionDowntime: "0.00 Seconds",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_hospital_phase",
      lead: "Mahima",
      role: "Hospital Information Security Lead",
      location: "Ichapur General Hospital",
      title: "Clinical Hospital IoMT 5-Phase Assessment",
      budget: "₹5,20,000",
      targetScope: "40 Smart Infusion Pumps & DICOM PACS",
      dilemma:
        "Auditing medical devices running embedded legacy operating systems where aggressive port scanning could cause device crashes during active surgery.",
      resolution:
        "Mahima restricted Phase 2 to passive network sniffing (Wireshark) and gentle single-packet scans, identifying cleartext DICOM telemetry and deploying clinical VLAN micro-segmentation before attackers could exploit Phase 3 vulnerabilities.",
      metrics: {
        patientSafety: "100% Medical Uptime Maintained",
        devicesHardened: "42 Clinical IoMT Endpoints",
        complianceStatus: "NABH & India DPDP Act 2023",
        auditStandard: "CEH 5-Phase Ethical Framework"
      }
    },
    {
      id: "barrackpore_scada_phase",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation SCADA Phase Modeling",
      budget: "₹8,80,000",
      targetScope: "220kV Substation RTU Switchgears",
      dilemma:
        "Modeling how a hostile nation-state threat actor (APT) would progress through the 5 phases to sabotage high-voltage substation switchgears.",
      resolution:
        "Debangshu mapped defensive countermeasures across all 5 phases, deploying unidirectional optical data diodes that physically sever Phase 3 exploitation and Phase 4 lateral movement into SCADA protective relays.",
      metrics: {
        attackChainsDisrupted: "100% Phase 3/4 Severed",
        gridIsolation: "Unidirectional Optical Diode",
        threatModel: "BlackEnergy & Industroyer TTPs",
        compliance: "ISA/IEC 62443 & CEA Regulations"
      }
    },
    {
      id: "jadavpur_atomic_lab",
      lead: "Abhronila & Susmita",
      role: "Cyber Research Lab Directors",
      location: "Jadavpur University AI Labs",
      title: "Atomic Kill Chain Cross-Mapping Lab",
      budget: "₹4,00,000",
      targetScope: "Virtualized Enterprise Sandbox",
      dilemma:
        "Building an interactive simulation demonstrating how real-world MITRE ATT&CK techniques map to the classical 5 phases of hacking for university students.",
      resolution:
        "The team authored an open-source purple teaming script demonstrating Phase 1 OSINT, Phase 2 Nmap enumeration, Phase 3 buffer overflow injection, and Phase 4 registry persistence in a safe virtualized lab.",
      metrics: {
        studentsTrained: "120+ BCA Cyber Students",
        techniquesSimulated: "18 MITRE ATT&CK TTPs",
        labFramework: "CEH 5-Phases + Kill Chain",
        openSourceRelease: "GitHub Education Repository"
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
            Cyber Security Module 002_003 • Topic 0 of 12 (Module Kickoff)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Overview of the 5 Phases of Hacking
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the foundational methodology of ethical hacking: Phase 1 (Reconnaissance), Phase 2 (Scanning &amp; Enumeration), 
            Phase 3 (Gaining Access), Phase 4 (Maintaining Access), and Phase 5 (Clearing Tracks). Explore cross-framework mapping with 
            the Lockheed Martin Cyber Kill Chain and MITRE ATT&amp;CK Enterprise matrix.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: 5-Phase Hacking Lifecycle Interactive Flow & Tool Arsenal Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 1: The 5-Phase Ethical Hacking Lifecycle &amp; Arsenal
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select any phase in the ethical hacking lifecycle to inspect its operational objective, primary offensive tools, defensive countermeasures, and professional ethical boundaries.
            </p>
          </div>

          {/* 5-Phase Switcher Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(hackingPhases).map((phase) => {
              const isSelected = selectedPhaseKey === phase.key;
              return (
                <button
                  key={phase.key}
                  onClick={() => setSelectedPhaseKey(phase.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{phase.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">Phase {phase.phaseNum}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{phase.name.split(": ")[1]?.split(" (")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePhase.badgeClass)}>
                  {activePhase.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Operational Objective &amp; Methodology
                </h3>
              </div>
            </div>

            {/* Objective */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Primary Phase Objective</span>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{activePhase.objective}</p>
            </div>

            {/* Arsenal vs Defense Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Primary Offensive Tooling</span>
                <p className="text-gray-300 font-mono text-[11px] leading-relaxed">{activePhase.offensiveArsenal}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Defensive Countermeasures</span>
                <p className="text-gray-300 leading-relaxed">{activePhase.defensiveRemedy}</p>
              </div>
            </div>

            {/* Ethical Mandate */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-amber-900/30 text-xs space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Cardinal Ethical Hacker Mandate:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activePhase.ethicalMandate}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 5 Phases vs Cyber Kill Chain vs MITRE ATT&CK Cross-Mapping Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Studio 2: Cross-Framework Alignment Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare the classic CEH 5-phase methodology against the Lockheed Martin Cyber Kill Chain and the MITRE ATT&amp;CK Enterprise matrix.
            </p>
          </div>

          {/* Framework Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(frameworksData).map((fw) => {
              const isSelected = selectedFrameworkKey === fw.key;
              return (
                <button
                  key={fw.key}
                  onClick={() => setSelectedFrameworkKey(fw.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{fw.name.split(" (")[0]}</div>
                  <div className="text-[11px] text-gray-400 mt-1 truncate">{fw.stages.length} Structured Stages</div>
                </button>
              );
            })}
          </div>

          {/* Active Framework Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeFramework.badgeClass)}>
                  {activeFramework.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Tactical Stage Decomposition
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-gray-900 p-4 rounded-xl border border-gray-800">
              {activeFramework.description}
            </p>

            {/* Stage List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Sequential Tactical Stages:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {activeFramework.stages.map((stage, idx) => (
                  <div key={idx} className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-gray-200 font-mono text-[11.5px] flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{stage}</span>
                  </div>
                ))}
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
              Visualizing the 5 Phases of Hacking Circular Lifecycle and cross-framework alignment with the Cyber Kill Chain and MITRE ATT&amp;CK.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 5 Phases Circular Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 5-Phase Hacking Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. Reconnaissance</text>
                    <text x="85" y="56" fill="#94a3b8" textAnchor="middle" fontSize="8">OSINT &amp; Footprinting</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan8)" />

                  {/* Phase 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">2. Scanning</text>
                    <text x="250" y="56" fill="#a5f3fc" textAnchor="middle" fontSize="8">Nmap &amp; Enumeration</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan8)" />

                  {/* Phase 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="42" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">3. Gaining Access</text>
                    <text x="415" y="56" fill="#fca5a5" textAnchor="middle" fontSize="8">Exploits &amp; Metasploit</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Phase 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1.5" />
                    <text x="415" y="132" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="10">4. Maintaining</text>
                    <text x="415" y="146" fill="#e9d5ff" textAnchor="middle" fontSize="8">Persistence &amp; C2</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#d8b4fe" strokeWidth="2" markerEnd="url(#arrowCyan8)" />

                  {/* Phase 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="110" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">5. Clearing Tracks</text>
                    <text x="250" y="146" fill="#a7f3d0" textAnchor="middle" fontSize="8">Ethical Tool Cleanup</text>
                  </g>

                  {/* Summary Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="95" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="210" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11.5">STRUCTURED DEFENSIVE ENGINEERING</text>
                    <text x="250" y="230" fill="#cbd5e1" textAnchor="middle" fontSize="9">"Understand the adversary's phases to disrupt the attack chain early."</text>
                    <text x="250" y="248" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Ethical Hackers clean test artifacts in Phase 5 but NEVER alter client audit logs.</text>
                    <text x="250" y="265" fill="#fbbf24" textAnchor="middle" fontSize="8">IT Act 2000 Section 66: Unauthorized hacking carries up to 3 years imprisonment.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan8" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.1: The 5 standard phases of ethical hacking in continuous execution flow.
              </p>
            </div>

            {/* Diagram 2: Cross-Framework Alignment */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>🗺️</span> Diagram B: Cross-Framework Mapping Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Row 1: Recon */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="140" height="42" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="90" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9.5">1. Reconnaissance</text>
                  </g>
                  <text x="175" y="45" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="195" y="20" width="135" height="42" rx="6" fill="#18181b" stroke="#818cf8" strokeWidth="1" />
                    <text x="262" y="45" fill="#e0e7ff" textAnchor="middle" fontSize="8.5">Kill Chain: Recon</text>
                  </g>
                  <text x="345" y="45" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="360" y="20" width="120" height="42" rx="6" fill="#18181b" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="420" y="45" fill="#f3e8ff" textAnchor="middle" fontSize="8.5">MITRE: TA0043</text>
                  </g>

                  {/* Row 2: Scanning */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="70" width="140" height="42" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="90" y="95" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9.5">2. Scanning</text>
                  </g>
                  <text x="175" y="95" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="195" y="70" width="135" height="42" rx="6" fill="#18181b" stroke="#06b6d4" strokeWidth="1" />
                    <text x="262" y="95" fill="#a5f3fc" textAnchor="middle" fontSize="8.5">Kill Chain: Weaponize</text>
                  </g>
                  <text x="345" y="95" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="360" y="70" width="120" height="42" rx="6" fill="#18181b" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="420" y="95" fill="#f3e8ff" textAnchor="middle" fontSize="8.5">MITRE: TA0007</text>
                  </g>

                  {/* Row 3: Gaining Access */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="120" width="140" height="42" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="90" y="145" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="9.5">3. Gaining Access</text>
                  </g>
                  <text x="175" y="145" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="195" y="120" width="135" height="42" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1" />
                    <text x="262" y="145" fill="#fca5a5" textAnchor="middle" fontSize="8.5">Deliver + Exploit</text>
                  </g>
                  <text x="345" y="145" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="360" y="120" width="120" height="42" rx="6" fill="#18181b" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="420" y="145" fill="#f3e8ff" textAnchor="middle" fontSize="8.5">TA0001 / TA0002</text>
                  </g>

                  {/* Row 4: Maintaining */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="170" width="140" height="42" rx="6" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="90" y="195" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="9.5">4. Maintaining</text>
                  </g>
                  <text x="175" y="195" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="195" y="170" width="135" height="42" rx="6" fill="#18181b" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="262" y="195" fill="#e9d5ff" textAnchor="middle" fontSize="8.5">Install + C2</text>
                  </g>
                  <text x="345" y="195" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="360" y="170" width="120" height="42" rx="6" fill="#18181b" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="420" y="195" fill="#f3e8ff" textAnchor="middle" fontSize="8.5">TA0003 / TA0011</text>
                  </g>

                  {/* Row 5: Clearing */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="220" width="140" height="42" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="90" y="245" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9.5">5. Clearing Tracks</text>
                  </g>
                  <text x="175" y="245" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="195" y="220" width="135" height="42" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1" />
                    <text x="262" y="245" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Actions on Object</text>
                  </g>
                  <text x="345" y="245" fill="#94a3b8" textAnchor="middle" fontSize="10">→</text>
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="360" y="220" width="120" height="42" rx="6" fill="#18181b" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="420" y="245" fill="#f3e8ff" textAnchor="middle" fontSize="8.5">MITRE: TA0005</text>
                  </g>

                  {/* Summary */}
                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="9">
                    Cross-mapping aligns tactical hacking phases with modern enterprise threat hunting matrices.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.2: Direct mapping between the 5 phases, Cyber Kill Chain, and MITRE ATT&amp;CK tactics.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: 5-Phase Methodology Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how cybersecurity leads apply the 5-phase methodology to audit core banking, hospital IoMT, 220kV supergrids, and university research labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                >
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Audit / Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Methodological Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Ethical Hacker 5-Phase Action
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
              Guidelines for ethical penetration testers executing the 5-phase hacking methodology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Methodological Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Dedicate 70% Time to Recon:</strong> Deep enumeration makes exploitation in Phase 3 effortless.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain a Dropped Artifact Log:</strong> Record every webshell and test account for complete Phase 5 cleanup.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Rate-Limit Network Scans:</strong> Avoid triggering denial of service on fragile hospital devices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Map to MITRE ATT&amp;CK:</strong> Align your pentest findings with industry-standard TTP heatmaps.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Methodological Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Rushing to Exploitation:</strong> Skipping enumeration leads to missed low-hanging critical vulnerabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Deleting Client Logs:</strong> Altering audit trails destroys compliance and violates IT Act Sec 65.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Leaving Ghost Backdoors:</strong> Forgetting to terminate test C2 beacons after the audit concludes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Destructive Exploits:</strong> Firing unstable exploits that crash production databases.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Governance Rules
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Signed RoE is Mandatory:</strong> Never execute Phase 2 or 3 without explicit written authorization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Centralized WORM Logging:</strong> Defeat adversary Phase 5 anti-forensics with immutable off-site logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Respect 6-Hour CERT-In Rule:</strong> Report critical vulnerabilities and breach indicators within 6 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Least Privilege:</strong> Restrict lateral movement in Phase 4 using micro-segmentation.</span>
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
              Synthesize key concepts of the 5 phases of hacking before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Ethical Penetration Testers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Phase 5 (Clearing Tracks) defines the ethical divide: criminals erase audit logs to hide their crimes, whereas ethical hackers carefully preserve client audit logs while removing their own testing tools.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Cyber Kill Chain and MITRE ATT&amp;CK decompose the 5 phases: breaking any single link in the chain—such as blocking C2 beacons in Phase 4—neutralizes the entire adversarial campaign.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future practical penetration tests, always spend 70% of your allotted assessment time on Phase 1 (Reconnaissance) and Phase 2 (Enumeration) before firing a single exploit in Phase 3.
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
                <span>5 Phases: Recon, Scanning, Gaining Access, Maintaining, Clearing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Passive Recon sends zero packets; Active Recon probes target servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Scanning finds open ports; Enumeration extracts usernames &amp; shares.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Lockheed Martin Cyber Kill Chain has 7 tactical stages.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MITRE ATT&amp;CK organizes real-world TTPs across 14 tactics.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Ethical hackers clean test tools in Phase 5; NEVER delete client logs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Overview of the 5 Phases of Hacking FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Overview of the 5 Phases of Hacking (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 002_003: Phases of Hacking Methodology! Ethical hacking is a disciplined engineering craft. The 5-phase methodology (Reconnaissance, Scanning, Gaining Access, Maintaining Access, and Clearing Tracks) provides the structured blueprint for thinking like an adversary while building resilient defenses. Master each phase with rigorous ethical discipline, protect client audit integrity, and lead our nation's digital defense with distinction."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
