import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio 1: Black Hat Syndicate Role State
  const [selectedSyndicateRoleKey, setSelectedSyndicateRoleKey] = useState("iab");

  // Studio 2: Ransomware Kill Chain Step State
  const [activeKillChainStepIndex, setActiveKillChainStepIndex] = useState(0);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_infostealer");

  // Syndicate Roles Data for Studio 1
  const syndicateRoles = {
    iab: {
      key: "iab",
      title: "Initial Access Broker (IAB)",
      icon: "🚪",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      monetization: "₹80,000 - ₹15,00,000+ per breached enterprise network",
      roleSummary:
        "Specializes exclusively in breaching perimeter defense barriers—harvesting active VPN credentials, exploiting unpatched public edge appliances (Citrix, Fortinet), and selling verified admin access on dark web auctions.",
      primaryWeapons: "Shodan, Masscan, Hydra, Infostealer Log Crawlers, VPN Exploit Frameworks",
      undergroundHandoff: "Auctions remote desktop (RDP) or domain admin access to Ransomware Affiliates on Russian Market and Exploit.in."
    },
    malware_author: {
      key: "malware_author",
      title: "Malware & Exploit Developer",
      icon: "☣️",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      monetization: "₹5,00,000 - ₹50,00,000+ per zero-day exploit or custom crypter",
      roleSummary:
        "Writes low-level polymorphic binaries, in-memory loaders, kernel rootkits, and custom crypters that bypass modern Endpoint Detection and Response (EDR) agents without writing `.exe` files to disk.",
      primaryWeapons: "C/C++, Rust, x86/x64 Assembly, Process Hollowing, API Hook Unhooking, Custom Packers",
      undergroundHandoff: "Licenses weaponized ransomware builders or rootkits to RaaS cartels on underground escrow forums."
    },
    raas_cartel: {
      key: "raas_cartel",
      title: "Ransomware-as-a-Service (RaaS) Syndicate",
      icon: "💀",
      color: "from-red-600 to-rose-700",
      badgeClass: "bg-red-950 text-red-300 border-red-800",
      monetization: "80/20 Profit Split on Ransoms (₹5 Crores - ₹50+ Crores per victim)",
      roleSummary:
        "Operates the centralized extortion platform: maintains automated Tor negotiation portals, runs dark web data leak blogs, and licenses their high-speed cryptographic ransomware to operational 'Affiliates'.",
      primaryWeapons: "LockBit, BlackCat (ALPHV), DarkSide, REvil, Tor Hidden Services, Double Extortion Portals",
      undergroundHandoff: "Affiliates execute network intrusions; RaaS core developers manage payment gateways and decryptor generation."
    },
    data_broker: {
      key: "data_broker",
      title: "Dark Web Data & Identity Broker",
      icon: "🗄️",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      monetization: "₹500 - ₹5,00,000 per breached database / victim fingerprint",
      roleSummary:
        "Aggregates, parses, and sells breached personal identity records (PII), Aadhaar cards, credit card numbers, and digital browser fingerprint packages stolen by infostealers (RedLine, Lumma).",
      primaryWeapons: "Genesis Browser Plugin, Telegram Data Leak Bots, Elasticsearch Scrapers, SQL Dumps",
      undergroundHandoff: "Supplies credential stuffing syndicates, SIM swappers, and wire fraud rings with targeted victim identities."
    },
    cryptomixer: {
      key: "cryptomixer",
      title: "Cryptocurrency Mixer & Money Mule",
      icon: "🧼",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      monetization: "10% - 20% laundering commission on total extorted funds",
      roleSummary:
        "Breaks the cryptographic blockchain audit trail by routing extortion proceeds through privacy mixers (Tornado Cash, ChipMixer), Monero (XMR) privacy swaps, and decentralized P2P OTC fiat cash-out networks.",
      primaryWeapons: "Tornado Cash, Monero (XMR) Ring Signatures, Chain-Hopping Scripts, Mule Accounts",
      undergroundHandoff: "Delivers clean fiat currency to cartel leaders via physical cash drops or offshore shell companies."
    }
  };

  const activeSyndicateRole = syndicateRoles[selectedSyndicateRoleKey];

  // Modern Ransomware Kill Chain Workflow for Studio 2
  const killChainSteps = [
    {
      phaseNum: "01",
      name: "Initial Perimeter Compromise",
      mitreId: "T1190 / T1078",
      icon: "🚪",
      threatAction:
        "Initial Access Broker exploits an unpatched SSL VPN gateway (e.g. Fortinet CVE) or uses valid corporate credentials purchased from an infostealer log dump to log into internal servers.",
      forensicEvidence: "Unusual geographic IP logins, failed VPN brute-force spikes, and unexpected RDP session creations.",
      countermeasure: "Enforce FIDO2 Hardware Passkeys, disable legacy protocols, and patch edge appliances within 24 hours.",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    },
    {
      phaseNum: "02",
      name: "Internal Discovery & Privilege Escalation",
      mitreId: "T1087 / T1068",
      icon: "🔍",
      threatAction:
        "Attacker executes BloodHound to map Active Directory trust relationships, runs Mimikatz in memory to dump LSASS credentials, and escalates privileges to Domain Administrator.",
      forensicEvidence: "LSASS process memory access events (Event ID 4673), Kerberoasting ticket requests (Event ID 4769).",
      countermeasure: "Deploy Credential Guard, enforce LAPS (Local Administrator Password Solution), and restrict Domain Admin logins.",
      badgeClass: "bg-indigo-900/50 text-indigo-300 border-indigo-700"
    },
    {
      phaseNum: "03",
      name: "Living off the Land (Lateral Movement)",
      mitreId: "T1021 / T1047",
      icon: "💻",
      threatAction:
        "Attacker moves laterally across subnets using legitimate Windows utilities (LOLBins) like WMI, PowerShell, and PSExec, leaving zero foreign binary files on disk to evade signature antivirus.",
      forensicEvidence: "Anomalous PowerShell child processes spawned by WMI (Event ID 4688), remote scheduled task creations.",
      countermeasure: "Enforce PowerShell Script Block Logging (Event ID 4104), Constrained Language Mode, and network micro-segmentation.",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    },
    {
      phaseNum: "04",
      name: "Silent Data Exfiltration (Double Extortion)",
      mitreId: "T1567 / T1048",
      icon: "📦",
      threatAction:
        "Before deploying encryption, the attacker secretly compresses 500GB+ of confidential customer databases, executive emails, and trade secrets, uploading them to Mega.nz or private Tor C2 servers via Rclone.",
      forensicEvidence: "Massive outbound HTTPS egress spikes to cloud storage endpoints during off-peak night hours.",
      countermeasure: "Implement Data Loss Prevention (DLP) egress monitoring and strict cloud storage domain blocking.",
      badgeClass: "bg-teal-900/50 text-teal-300 border-teal-700"
    },
    {
      phaseNum: "05",
      name: "Mass Encryption & Shadow Copy Wiping",
      mitreId: "T1486 / T1490",
      icon: "🔒",
      threatAction:
        "Attacker executes `vssadmin delete shadows` to destroy local backup snapshots, disables security agents, and deploys high-speed multithreaded ransomware (LockBit/AES-256) across all domain endpoints and ESXi servers.",
      forensicEvidence: "Event ID 7045 (Ransomware service installed), mass `.lockbit` file extensions, CPU usage pegged at 100%.",
      countermeasure: "Maintain immutable air-gapped WORM backups (AWS S3 Object Lock) and automated EDR isolation triggers.",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700"
    },
    {
      phaseNum: "06",
      name: "Dark Web Extortion & Regulatory Coercion",
      mitreId: "T1651 / T1491",
      icon: "💀",
      threatAction:
        "Attacker drops `README_RESTORE.txt` ransom notes demanding ₹15 Crores in cryptocurrency. If unpaid, they publish sample customer Aadhaar cards on their dark web leak blog to force compliance under India's DPDP Act 2023.",
      forensicEvidence: "Tor `.onion` negotiation portal communications, public dark web leak blog listings.",
      countermeasure: "Immediate 6-hour CERT-In incident notification, engage specialized forensic negotiators, and refuse ransom payments.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    }
  ];

  const currentKillChainStep = killChainSteps[activeKillChainStepIndex];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_infostealer",
      lead: "Mamata",
      role: "Lead Forensic Cybercrime Investigator",
      location: "Kolkata Cyber Forensics Lab",
      title: "Infostealer Log Dump Forensics",
      budget: "₹7,50,000",
      threatFamily: "RedLine & Lumma Stealer",
      dilemma:
        "A dark web broker posted 5,000 compromised employee credentials and active session cookies originating from Kolkata tech consulting firms.",
      forensicRemedy:
        "Mamata decompiled the SQLite browser database extracts, identified how the infostealer decrypted Chrome DPAPI keys, and triggered an emergency global Active Directory session revocation, neutralizing active session hijacking.",
      metrics: {
        credentialsAnalyzed: "5,000 Compromised Accounts",
        sessionHijacksBlocked: "1,200 Active Cookies Revoked",
        malwareFamily: "RedLine Stealer v24",
        compliance: "CERT-In 6-Hour Incident Notification"
      }
    },
    {
      id: "ichapur_lockbit",
      lead: "Mahima",
      role: "Lead Healthcare Incident Responder",
      location: "Ichapur General Hospital",
      title: "LockBit Ransomware Intrusion Reconstruction",
      budget: "₹5,20,000",
      threatFamily: "LockBit 3.0 (Black) RaaS",
      dilemma:
        "Affiliate hackers encrypted 40 virtual machines containing patient diagnostic history on a Sunday night, demanding ₹8 Crores in Monero (XMR).",
      forensicRemedy:
        "Mahima isolated the infected VLAN within 8 minutes, restored all oncology databases from immutable air-gapped S3 WORM backups without paying the ransom, and delivered memory dumps to state cyber police.",
      metrics: {
        recoveryTime: "4.5 Hours (Zero Ransom Paid)",
        ransomDemanded: "₹8,00,00,000 (Avoided)",
        recordsRestored: "100% Patient Medical Files",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_schematic",
      lead: "Debangshu",
      role: "Senior SCADA Threat Intelligence Officer",
      location: "Barrackpore Industrial Grid",
      title: "Industrial SCADA Schematic Leak Auction",
      budget: "₹6,80,000",
      threatFamily: "Initial Access Broker (Exploit.in)",
      dilemma:
        "A dark web forum auctioned stolen engineering blueprints and VPN gateway IP addresses belonging to regional high-voltage industrial substations.",
      forensicRemedy:
        "Debangshu correlated the leaked telemetry, discovered that a third-party HVAC contractor's laptop had been breached, severed the contractor VPN tunnel, and enforced hardware data diodes on the 220kV substation network.",
      metrics: {
        threatNeutralized: "Contractor Supply Chain Breach",
        gridDowntime: "0.00 Seconds (Grid Stable)",
        iocShared: "National NCIIPC & CERT-In",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_dga",
      lead: "Abhronila & Susmita",
      role: "Malware Reverse Engineering Leads",
      location: "Jadavpur University AI Labs",
      title: "Banking Trojan DGA Decompilation",
      budget: "₹4,20,000",
      threatFamily: "Banking Trojan (Zeus/DGA Variant)",
      dilemma:
        "A stealthy banking trojan targeting regional netbanking customers used a Domain Generation Algorithm (DGA) to rotate its Command-and-Control (C2) domains every 24 hours.",
      forensicRemedy:
        "The team decompiled the binary in NSA Ghidra, extracted the mathematical DGA seed, generated the next 100 predicted C2 domains, and collaborated with DNS registrars to sinkhole the domains, cutting off the attacker.",
      metrics: {
        dgaDomainsSinkholed: "100 Predicted C2 Domains",
        botsNeutralized: "45,000+ Compromised Endpoints",
        reversalToolchain: "NSA Ghidra & Python DGA Solver",
        compliance: "Academic Threat Research Exemption"
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
            Cyber Security Module 002_002 • Topic 4 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Hacker Taxonomy: Black Hat Hackers
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Examine the operational mechanics, organizational division of labor, and financial monetization models of modern malicious 
            Black Hat syndicates. Explore Initial Access Brokers (IABs), Ransomware-as-a-Service (RaaS) cartels, Double Extortion lifecycles, 
            and international law enforcement takedown operations.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Black Hat Cybercrime Syndicate Ecosystem & Supply Chain Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🦹</span> Studio 1: The Underground Cybercrime Syndicate Supply Chain
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Modern cybercrime operates as a specialized division of labor. Select a syndicate role to analyze its illicit business model, weaponry, and monetization in Indian Rupees (₹).
            </p>
          </div>

          {/* Role Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(syndicateRoles).map((role) => {
              const isSelected = selectedSyndicateRoleKey === role.key;
              return (
                <button
                  key={role.key}
                  onClick={() => setSelectedSyndicateRoleKey(role.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{role.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{role.title.split(" (")[0]}</div>
                  <div className={clsx("mt-1 text-[10px] px-1.5 py-0.5 rounded border inline-block", role.badgeClass)}>
                    Threat Role
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Syndicate Role Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSyndicateRole.badgeClass)}>
                  {activeSyndicateRole.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Syndicate Operational Profile
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Estimated Illicit Revenue Cut</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400">{activeSyndicateRole.monetization}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5 text-xs">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Operational Function &amp; Mission</span>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{activeSyndicateRole.roleSummary}</p>
            </div>

            {/* Toolset & Handoff */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-purple-300 font-bold uppercase tracking-wider block">Primary Malicious Toolset</span>
                <p className="text-gray-300 font-mono text-[11px] leading-relaxed">{activeSyndicateRole.primaryWeapons}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-amber-300 font-bold uppercase tracking-wider block">Underground Hand-off &amp; Collaboration</span>
                <p className="text-gray-300 text-[11px] leading-relaxed">{activeSyndicateRole.undergroundHandoff}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Modern Double Extortion Ransomware Kill Chain Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⛓️</span> Studio 2: The Double Extortion Ransomware Kill Chain Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 6 stages of a modern human-operated ransomware intrusion from initial access to dark web extortion.
            </p>
          </div>

          {/* Step Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {killChainSteps.map((step, idx) => {
              const isSelected = activeKillChainStepIndex === idx;
              return (
                <button
                  key={step.phaseNum}
                  onClick={() => setActiveKillChainStepIndex(idx)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] font-mono text-rose-400 font-bold">Stage {step.phaseNum}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{step.name.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Kill Chain Step Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentKillChainStep.badgeClass)}>
                  Stage {currentKillChainStep.phaseNum} of 06 • MITRE ATT&amp;CK {currentKillChainStep.mitreId}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentKillChainStep.name}
                </h3>
              </div>
            </div>

            {/* Threat Action */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Adversarial Threat Execution</span>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{currentKillChainStep.threatAction}</p>
            </div>

            {/* Forensic Evidence vs Defensive Countermeasure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Forensic Artifacts &amp; Event Logs</span>
                <p className="text-gray-300 text-[11px] leading-relaxed">{currentKillChainStep.forensicEvidence}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Defensive Mitigation &amp; Architecture</span>
                <p className="text-gray-300 text-[11px] leading-relaxed">{currentKillChainStep.countermeasure}</p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={activeKillChainStepIndex === 0}
                onClick={() => setActiveKillChainStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-750 disabled:opacity-40 text-gray-300 rounded-lg text-xs font-semibold border border-gray-700 transition"
              >
                ← Previous Stage
              </button>
              <span className="text-xs text-gray-500 font-mono">
                Stage {activeKillChainStepIndex + 1} / 6
              </span>
              <button
                disabled={activeKillChainStepIndex === killChainSteps.length - 1}
                onClick={() => setActiveKillChainStepIndex((prev) => Math.min(killChainSteps.length - 1, prev + 1))}
                className="px-3.5 py-1.5 bg-rose-900/80 hover:bg-rose-850 disabled:opacity-40 text-rose-200 rounded-lg text-xs font-semibold border border-rose-700 transition"
              >
                Next Stage →
              </button>
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
              Visualizing the underground Black Hat cybercrime pipeline and the Double Extortion attack kill chain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Cybercrime Shadow Economy Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>💰</span> Diagram A: The Cybercrime Shadow Economy Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: IAB */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="60" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="85" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10.5">1. Access Broker</text>
                    <text x="85" y="60" fill="#fde68a" textAnchor="middle" fontSize="8.5">Breaches VPN &amp; sells keys</text>
                  </g>

                  {/* Arrow 1 to 2 */}
                  <path d="M 150 50 L 185 50" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowRed)" />

                  {/* Step 2: RaaS Affiliate */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="190" y="20" width="130" height="60" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="255" y="45" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10.5">2. RaaS Affiliate</text>
                    <text x="255" y="60" fill="#fca5a5" textAnchor="middle" fontSize="8.5">Exfiltrates &amp; Encrypts</text>
                  </g>

                  {/* Arrow 2 to 3 */}
                  <path d="M 320 50 L 355 50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />

                  {/* Step 3: Extortion Portal */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="360" y="20" width="120" height="60" rx="8" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="420" y="45" fill="#ffe4e6" fontWeight="bold" textAnchor="middle" fontSize="10">3. Tor Portal</text>
                    <text x="420" y="60" fill="#fda4af" textAnchor="middle" fontSize="8">Demands ₹10 Cr</text>
                  </g>

                  {/* Downward Connector */}
                  <path d="M 420 80 L 420 140" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4: Cryptomixer Laundering */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="140" width="400" height="65" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="165" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="11">4. CRYPTOCURRENCY TUMBLING &amp; MONERO SWAP</text>
                    <text x="250" y="182" fill="#a7f3d0" textAnchor="middle" fontSize="9">Tornado Cash / ChipMixer mixes coins to break blockchain forensic trails</text>
                  </g>

                  {/* Downward Arrow */}
                  <path d="M 250 205 L 250 240" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowRed)" />

                  {/* Step 5: Law Enforcement Takedown */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="40" y="240" width="420" height="65" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="265" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">5. INTERNATIONAL LAW ENFORCEMENT TAKEDOWN</text>
                    <text x="250" y="282" fill="#94a3b8" textAnchor="middle" fontSize="9">CBI / INTERPOL / FBI seize C2 servers, freeze wallets, and issue Red Notices</text>
                  </g>

                  <defs>
                    <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.1: The multi-stage cybercrime supply chain from initial breach to money laundering and police takedowns.
              </p>
            </div>

            {/* Diagram 2: Modern Double Extortion Kill Chain */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>🔒</span> Diagram B: Modern Double Extortion Kill Chain
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="85" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">1. Foothold (VPN)</text>
                    <text x="85" y="58" fill="#fde68a" textAnchor="middle" fontSize="8">Stolen SSL VPN keys</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowCyan2)" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="45" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">2. Recon (AD)</text>
                    <text x="250" y="58" fill="#c7d2fe" textAnchor="middle" fontSize="8">BloodHound / Mimikatz</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowCyan2)" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="415" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">3. Lateral Move</text>
                    <text x="415" y="58" fill="#94a3b8" textAnchor="middle" fontSize="8">WMI / LOLBins</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="415" y="135" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">4. Exfiltration</text>
                    <text x="415" y="148" fill="#a5f3fc" textAnchor="middle" fontSize="8">500GB to Mega / Tor</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan2)" />

                  {/* Step 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="110" width="130" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="135" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">5. Mass Encrypt</text>
                    <text x="250" y="148" fill="#fca5a5" textAnchor="middle" fontSize="8">AES-256 / Wipes VSS</text>
                  </g>

                  <path d="M 185 135 L 155 135" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCyan2)" />

                  {/* Step 6 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="130" height="50" rx="6" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="85" y="135" fill="#ffe4e6" fontWeight="bold" textAnchor="middle" fontSize="10">6. Double Extort</text>
                    <text x="85" y="148" fill="#fda4af" textAnchor="middle" fontSize="8">Leak Threat / DPDP</text>
                  </g>

                  <path d="M 85 160 L 85 200" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Defensive Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="200" width="460" height="85" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="225" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="12">DEFENSIVE MITIGATION: ZERO TRUST ARCHITECTURE</text>
                    <text x="250" y="245" fill="#d1fae5" textAnchor="middle" fontSize="9.5">Immutable WORM Backups • FIDO2 Passkeys • EDR Behavioral Isolation • DLP Egress Blocks</text>
                    <text x="250" y="262" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">"Assume Breach" -&gt; Stop lateral movement before exfiltration occurs</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.2: Double extortion combines stealthy data exfiltration with ransomware locking to force payment.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Forensic Investigation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Analyze how cybersecurity defense leads detect, reconstruct, and neutralize black-hat cyber attacks across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Investigation Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Forensic Remedy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Black Hat Threat Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Defensive Forensic Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.forensicRemedy}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Forensic Deliverables &amp; Incident Metrics
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
              Essential defensive strategies to protect enterprise infrastructure against organized black-hat cartels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Defensive Countermeasures
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce FIDO2 Passkeys:</strong> Completely neutralize infostealer credential harvesting and phishing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Air-Gap Backups:</strong> Store immutable backups with S3 Object Lock (WORM storage) to survive ransomware.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Audit Egress Traffic:</strong> Monitor high-volume outbound data transfers to detect exfiltration in progress.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Patch Edge VPNs Within 24h:</strong> Shut down Initial Access Brokers before they can auction your network.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Critical Defensive Mistakes
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Paying the Ransom:</strong> Over 40% of victims who pay are attacked again by the same cartel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on SMS OTPs:</strong> Highly susceptible to SIM swapping and telecom social engineering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Flat Internal Networks:</strong> Allowing attackers to pivot freely from a receptionist PC to Domain Controllers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Overwriting Forensics:</strong> Rebooting compromised servers without taking RAM memory dumps first.</span>
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
                  <span><strong>Mandatory 6-Hour Reporting:</strong> Notify CERT-In immediately upon detecting ransomware or breaches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>180-Day Log Archival:</strong> Maintain centralized immutable SIEM logs within Indian jurisdiction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt Zero Trust (Assume Breach):</strong> Treat internal network traffic with the same hostility as the internet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Red Team Drills:</strong> Test SOC detection velocity and dwell time against MITRE ATT&amp;CK TTPs.</span>
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
              Synthesize key Black Hat concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Defensive Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why modern ransomware attackers exfiltrate data BEFORE encrypting it: if you have clean backups, you can ignore encryption, but you cannot ignore the public leakage of your confidential customer records.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Initial Access Brokers (IABs) separate the skill of breaking into a perimeter from the operational skill of deploying ransomware, creating a fast, efficient underground supply chain.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise designs, replace password-based VPN authentication with FIDO2 Hardware Passkeys and enforce strict egress firewall filters on outbound data connections.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Interview Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Black Hats operate illegally with malicious financial motives.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IABs breach networks and auction access to RaaS syndicates.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Double Extortion: Data exfiltration + File encryption.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Infostealers steal browser passwords and session cookies.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Living off the Land (LotL) uses built-in tools (PowerShell/WMI).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 66F: Life jail for cyber terrorism.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Hacker Taxonomy: Black Hat Hackers FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Hacker Taxonomy: Black Hat Hackers (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: To defend the digital infrastructure of West Bengal and India against organized black-hat cartels, you must study their methodologies, supply chains, and economic incentives with absolute objectivity. Understand how Initial Access Brokers exploit edge appliances, why Double Extortion makes standard backups insufficient, and how Zero Trust Architecture isolates blast radiuses to render intrusions harmless."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
