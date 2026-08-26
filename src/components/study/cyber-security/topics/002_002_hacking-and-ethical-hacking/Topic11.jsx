import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Studio 1: Multi-Industry Sector State
  const [selectedSectorKey, setSelectedSectorKey] = useState("banking_fintech");

  // Studio 2: Landmark Case Study State
  const [selectedCaseKey, setSelectedCaseKey] = useState("aiims_delhi_2022");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_swift");

  // Multi-Industry Sectors Data for Studio 1
  const industrySectors = {
    banking_fintech: {
      key: "banking_fintech",
      name: "Banking & FinTech Systems",
      icon: "🏦",
      color: "from-blue-600 to-indigo-700",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      criticalAsset: "Core Banking UPI 2.0 Switches, SWIFT Wire Gateways, ATM Transaction Queues",
      primaryThreat: "SWIFT DLL memory-hooking, FASTCash ATM approval spoofing, Point-of-Sale RAM scrapers",
      damageExposureINR: "₹500+ Crores (Direct wire theft & liquidity crisis)",
      ethicalSolution:
        "FIPS 140-2 Level 3 Hardware Security Modules (HSMs), cryptographic MAC signatures on ISO 8583 message queues, and dedicated air-gapped VLANs."
    },
    healthcare_hospitals: {
      key: "healthcare_hospitals",
      name: "Healthcare & Hospital IoMT",
      icon: "🏥",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      criticalAsset: "Smart Infusion Pumps, MRI/CT PACS DICOM Imagery, Electronic Health Records (EHR)",
      primaryThreat: "Cleartext DICOM telemetry manipulation, unpatched legacy Windows XP/7 embedded OS, medical ransomware",
      damageExposureINR: "₹250 Crores DPDP Cap + Imminent Threat to Human Life",
      ethicalSolution:
        "Clinical VLAN Micro-segmentation, Layer 7 deep packet inspection on DICOM ports, and immutable AWS S3 WORM backups."
    },
    critical_grid_scada: {
      key: "critical_grid_scada",
      name: "Critical Power Grid & SCADA",
      icon: "⚡",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      criticalAsset: "220kV Substation RTU Controllers, High-Voltage Switchgears, Nuclear Centrifuges",
      primaryThreat: "Industroyer IEC 61850 protocol manipulation, HMI remote hijacking, KillDisk firmware wiping",
      damageExposureINR: "₹1,000+ Crores (Regional blackout & physical generator destruction)",
      ethicalSolution:
        "Purdue Model Level 3.5 Industrial DMZ (IDMZ), hardware Unidirectional Optical Data Diodes, and IEC 62351 nonces."
    },
    cloud_ecommerce: {
      key: "cloud_ecommerce",
      name: "Cloud & E-Commerce / SaaS",
      icon: "☁️",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      criticalAsset: "Multi-tenant Kubernetes Clusters, AWS IAM Root Roles, E-Commerce Checkout Portals",
      primaryThreat: "IAM PassRole privilege escalation, AWS metadata SSRF (169.254.169.254), Magecart JavaScript form-skimmers",
      damageExposureINR: "₹150+ Crores (Mass credit card theft & cloud resource hijacking)",
      ethicalSolution:
        "Kubernetes NetworkPolicy egress isolation, automated Snyk/Semgrep CI/CD quality gates, and Subresource Integrity (SRI) headers."
    },
    aerospace_telecom: {
      key: "aerospace_telecom",
      name: "Aerospace, 5G & Telecom",
      icon: "🛰️",
      color: "from-cyan-500 to-teal-600",
      badgeClass: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
      criticalAsset: "5G Core Network Slices, ADS-B Aircraft Tracking Radar, BGP Autonomous Routing Tables",
      primaryThreat: "BGP Route Hijacking, SDR radio ADS-B aircraft spoofing, 5G inter-slice container escapes",
      damageExposureINR: "National Security Crisis & Commercial Flight Disruption",
      ethicalSolution:
        "RPKI Route Origin Authorization (ROA), cryptographically signed avionics telemetry, and Software-Defined Network (SDN) slice boundaries."
    }
  };

  const activeSector = industrySectors[selectedSectorKey];

  // Landmark Case Studies Data for Studio 2
  const landmarkCases = {
    aiims_delhi_2022: {
      key: "aiims_delhi_2022",
      title: "AIIMS New Delhi Ransomware Attack (2022)",
      category: "Healthcare Infrastructure (India)",
      ingressVector: "Compromised administrative credentials & unpatched edge VPN gateway",
      adversaryTTP: "Deployed targeted ransomware encrypting core EHR and laboratory billing server databases simultaneously across main campus.",
      realImpact: "Paralyzed online OPD registrations for 14 days; doctors reverted to manual paper registers; 40M patient records exposed.",
      ethicalBlueprint:
        "Enforce immutable AWS S3 WORM storage for medical records, clinical micro-segmentation, and FIDO2 MFA across all hospital terminals.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    bangladesh_bank_2016: {
      key: "bangladesh_bank_2016",
      title: "Bangladesh Bank SWIFT Heist (2016)",
      category: "Central Banking & FinTech (South Asia)",
      ingressVector: "Phishing email to employee -> Lateral movement across unmanaged $10 network switches",
      adversaryTTP: "Injected evtdt.exe and hooked PDF printer library (fxservice.dll) to suppress physical paper transaction receipts for fraudulent MT103 wire transfers.",
      realImpact: "₹650 Crores ($81 Million) successfully stolen and laundered through Sri Lankan and Philippine casinos.",
      ethicalBlueprint:
        "Deploy FIPS 140-2 Level 3 Hardware Security Modules (HSMs), dedicated isolated SWIFT VLANs, and dual-authorization smartcards.",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700"
    },
    colonial_pipeline_2021: {
      key: "colonial_pipeline_2021",
      title: "Colonial Pipeline Ransomware Outage (2021)",
      category: "Critical Energy Infrastructure (USA)",
      ingressVector: "Single leaked employee password on dark web used on an inactive legacy VPN portal without MFA",
      adversaryTTP: "DarkSide ransomware cartel encrypted billing systems, forcing pipeline operators to proactively shut down physical oil delivery.",
      realImpact: "5,500 miles of major fuel pipelines shut down for 6 days; $4.4M (₹35 Crores) ransom paid to threat actors.",
      ethicalBlueprint:
        "Universal FIDO2 Multi-Factor Authentication, decommissioning obsolete legacy VPN gateways, and automated dark web credential monitoring.",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    },
    ukraine_grid_2015: {
      key: "ukraine_grid_2015",
      title: "Ukraine Power Grid Blackout (2015)",
      category: "Electric Grid & SCADA (Eastern Europe)",
      ingressVector: "Spear-phishing Word documents containing malicious VBA macros deploying BlackEnergy 3",
      adversaryTTP: "Attackers remotely controlled operator HMI screens, systematically opened 220kV circuit breakers across 30 substations, and wiped bridge firmware with KillDisk.",
      realImpact: "230,000 citizens left without electricity in freezing winter; world's first cyber-induced physical power grid outage.",
      ethicalBlueprint:
        "Install Unidirectional Optical Data Diodes, cryptographically signed IEC 61850 GOOSE commands, and out-of-band manual override controls.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    },
    solarwinds_2020: {
      key: "solarwinds_2020",
      title: "SolarWinds Orion Supply Chain Hack (2020)",
      category: "Enterprise Software Supply Chain (Global)",
      ingressVector: "APT29 breached internal software development environment and build servers",
      adversaryTTP: "Injected SUNBURST backdoor into source code during compilation; trojanized DLL was signed with legitimate Microsoft certificate.",
      realImpact: "18,000 global enterprise and government organizations downloaded the trojanized update automatically.",
      ethicalBlueprint:
        "Multi-party hermetic build verification, Software Bill of Materials (CycloneDX SBOM), and behavioral EDR memory monitoring.",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    }
  };

  const activeCase = landmarkCases[selectedCaseKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_swift",
      lead: "Mamata",
      role: "Lead FinTech Forensic Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "SWIFT Gateway Hardware Vault Hardening",
      budget: "₹14,50,000",
      industryDomain: "Banking & FinTech (UPI & SWIFT)",
      dilemma:
        "Following the Bangladesh Bank heist, a regional bank in Kolkata needed to prove its SWIFT Alliance gateway was impervious to memory-hooking malware and DLL injection.",
      resolution:
        "Mamata deployed FIPS 140-2 Level 3 Hardware Security Modules (HSMs) and enforced mutual TLS (mTLS) with hardware smartcards, completely eliminating software memory scraping vulnerabilities.",
      metrics: {
        hsmLevel: "FIPS 140-2 Level 3 Silicon",
        dailyWireVolume: "₹250+ Crores Protected",
        softwareVulnerabilities: "Zero In-Memory Keys",
        compliance: "RBI Master Direction & SWIFT CSP"
      }
    },
    {
      id: "ichapur_hospital_iomt",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "Hospital IoMT Clinical Micro-Segmentation",
      budget: "₹6,20,000",
      industryDomain: "Healthcare & Patient Safety (IoMT)",
      dilemma:
        "40 smart infusion pumps and 2 MRI scanners ran unpatched embedded Linux on a flat network, vulnerable to remote telemetry tampering and ransomware encryption.",
      resolution:
        "Mahima created an isolated clinical VLAN with Layer 7 stateful firewall policies and deployed immutable AWS S3 WORM storage for 50,000 oncology patient records, achieving full DPDP Act compliance.",
      metrics: {
        devicesIsolated: "42 Critical Clinical Assets",
        dataProtection: "100% Immutable WORM Backups",
        telemetryEncryption: "DICOM-over-TLS (Port 2762)",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_supergrid",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore 220kV Supergrid",
      title: "220kV Supergrid Optical Data Diode Defense",
      budget: "₹9,80,000",
      industryDomain: "Critical Energy Infrastructure (SCADA)",
      dilemma:
        "Protecting high-voltage substation switchgear RTUs against BlackEnergy/Industroyer cyber-kinetic sabotage without disconnecting corporate real-time energy dashboards.",
      resolution:
        "Debangshu installed unidirectional optical data diodes separating corporate billing from SCADA controllers, physically guaranteeing zero inbound command injection into substation breakers.",
      metrics: {
        airGapGuarantee: "100% Unidirectional Light Beam",
        substationsProtected: "4 Regional 220kV Grids",
        gridUptime: "100.00% Continuous Transmission",
        compliance: "ISA/IEC 62443 & CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_supplychain",
      lead: "Abhronila & Susmita",
      role: "Cloud Security Research Leads",
      location: "Jadavpur University Cloud Labs",
      title: "CI/CD Supply Chain Hermetic Build Lab",
      budget: "₹4,50,000",
      industryDomain: "Cloud & DevSecOps Supply Chain",
      dilemma:
        "Authoring open-source detection algorithms to catch SolarWinds-style background build-pipeline injections during container compilation.",
      resolution:
        "The team built an automated hermetic build verification engine comparing reproducible binary hashes against Git source trees, publishing the framework to the global cybersecurity community.",
      metrics: {
        buildTamperingCaught: "100% Injected DLLs Detected",
        sbomStandard: "CycloneDX 1.5 Specification",
        openSourceStars: "1,200+ GitHub Community Stars",
        compliance: "SLSA Level 4 Supply Chain Standard"
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
            Cyber Security Module 002_002 • Topic 11 of 12 (Module Capstone)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ethical Hacking Case Studies &amp; Industry Applications
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Synthesize real-world ethical defense across mission-critical sectors: Banking &amp; FinTech (UPI/SWIFT), Healthcare (IoMT/DICOM), 
            Critical Infrastructure (220kV SCADA), Cloud, and Aerospace. Analyze landmark historical forensic investigations from the 2016 Bangladesh Bank 
            SWIFT heist and 2021 Colonial Pipeline outage to the 2022 AIIMS New Delhi cyber crisis.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Multi-Industry Cyber Defense Architecture Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏭</span> Studio 1: Multi-Industry Cyber Defense Architecture Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an industry sector to inspect its critical digital assets, primary adversarial attack vectors, financial risk in Indian Rupees (₹), and ethical architectural defenses.
            </p>
          </div>

          {/* Industry Switcher Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(industrySectors).map((sector) => {
              const isSelected = selectedSectorKey === sector.key;
              return (
                <button
                  key={sector.key}
                  onClick={() => setSelectedSectorKey(sector.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{sector.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{sector.name.split(" &")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{sector.name.split(" ")[0]} Sector</div>
                </button>
              );
            })}
          </div>

          {/* Active Industry Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSector.badgeClass)}>
                  {activeSector.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Sector Asset &amp; Defense Profile
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Catastrophic Risk Exposure</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400">{activeSector.damageExposureINR}</span>
              </div>
            </div>

            {/* Asset vs Threat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Critical Assets at Risk</span>
                <p className="text-gray-300 leading-relaxed">{activeSector.criticalAsset}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Primary Adversary Attack Vectors</span>
                <p className="text-gray-300 leading-relaxed">{activeSector.primaryThreat}</p>
              </div>
            </div>

            {/* Ethical Solution */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Ethical Hacker Architectural Defense Blueprint:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeSector.ethicalSolution}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Landmark Cyber Case Study Forensic Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 2: Landmark Cyber Case Study Forensic Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Analyze iconic global and national cyber crises through a forensic lens: inspect initial access vectors, lateral movement TTPs, real damage, and remediation.
            </p>
          </div>

          {/* Case Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(landmarkCases).map((c) => {
              const isSelected = selectedCaseKey === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setSelectedCaseKey(c.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{c.title.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{c.category.split(" (")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Landmark Case Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCase.badgeClass)}>
                  {activeCase.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeCase.title}
                </h3>
              </div>
            </div>

            {/* Ingress vs Tradecraft */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Initial Ingress Breach Vector</span>
                <p className="text-gray-300 leading-relaxed">{activeCase.ingressVector}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Adversary Tradecraft &amp; Lateral Movement</span>
                <p className="text-gray-300 leading-relaxed">{activeCase.adversaryTTP}</p>
              </div>
            </div>

            {/* Real Impact */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-purple-300 font-bold uppercase tracking-wider block">Real-World Financial &amp; Physical Impact:</span>
              <p className="text-gray-300 text-xs leading-relaxed">{activeCase.realImpact}</p>
            </div>

            {/* Ethical Blueprint */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Ethical Remediation &amp; Defense Blueprint:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeCase.ethicalBlueprint}</p>
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
              Visualizing the Multi-Sector Cyber Defense Architecture Matrix and the Cyber Incident Forensic Reconstruction Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Multi-Sector Defense Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🛡️</span> Diagram A: Multi-Sector Cyber Defense Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Banking */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="220" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="35" y="45" fill="#c7d2fe" fontWeight="bold" fontSize="10.5">BANKING &amp; FINTECH</text>
                    <text x="35" y="62" fill="#94a3b8" fontSize="8.5">HSMs • MAC on ISO 8583 • SWIFT</text>
                    <text x="35" y="78" fill="#a5b4fc" fontWeight="bold" fontSize="8">RBI Cyber Framework</text>
                  </g>

                  {/* Healthcare */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="20" width="220" height="75" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="275" y="45" fill="#fee2e2" fontWeight="bold" fontSize="10.5">HOSPITALS &amp; IOMT</text>
                    <text x="275" y="62" fill="#fca5a5" fontSize="8.5">Clinical VLANs • DICOM-TLS • WORM</text>
                    <text x="275" y="78" fill="#ef4444" fontWeight="bold" fontSize="8">DPDP Act 2023 Cap</text>
                  </g>

                  {/* SCADA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="220" height="75" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="35" y="135" fill="#fef3c7" fontWeight="bold" fontSize="10.5">220KV SCADA &amp; GRIDS</text>
                    <text x="35" y="152" fill="#fde68a" fontSize="8.5">Optical Data Diodes • Purdue IDMZ</text>
                    <text x="35" y="168" fill="#f59e0b" fontWeight="bold" fontSize="8">IEC 62443 Standard</text>
                  </g>

                  {/* Cloud */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="110" width="220" height="75" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="275" y="135" fill="#e0e7ff" fontWeight="bold" fontSize="10.5">CLOUD &amp; E-COMMERCE</text>
                    <text x="275" y="152" fill="#c7d2fe" fontSize="8.5">K8s NetworkPolicies • Anti-Magecart</text>
                    <text x="275" y="168" fill="#818cf8" fontWeight="bold" fontSize="8">PCI-DSS 4.0 Standard</text>
                  </g>

                  {/* Bottom Principle */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="200" width="460" height="85" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="225" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="11.5">DEFENSE-IN-DEPTH RESILIENCE ARCHITECTURE</text>
                    <text x="250" y="243" fill="#cbd5e1" textAnchor="middle" fontSize="9">"Assume breach, micro-segment all subnets, and physically isolate critical assets."</text>
                    <text x="250" y="260" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Ethical hackers design defenses proportional to the specific industry risk model.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.1: Specialized defense architectures across Banking, Healthcare, SCADA, and Cloud sectors.
              </p>
            </div>

            {/* Diagram 2: Forensic Reconstruction Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🔬</span> Diagram B: Cyber Incident Forensic Reconstruction
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. Isolation</text>
                    <text x="85" y="56" fill="#94a3b8" textAnchor="middle" fontSize="8">Sever C2 Tunnels</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan7)" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">2. RAM &amp; Disk Dump</text>
                    <text x="250" y="56" fill="#c7d2fe" textAnchor="middle" fontSize="8">Write-Blocker + Hash</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowCyan7)" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="42" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">3. Root Cause</text>
                    <text x="415" y="56" fill="#fde68a" textAnchor="middle" fontSize="8">DLL Hooks &amp; Logs</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="415" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">4. WORM Recovery</text>
                    <text x="415" y="146" fill="#a7f3d0" textAnchor="middle" fontSize="8">Restore Clean Image</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCyan7)" />

                  {/* Step 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="295" height="50" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="167" y="135" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11">5. 6-HOUR CERT-IN NOTIFICATION</text>
                    <text x="167" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Legal Sec 65B Electronic Evidence Affidavits</text>
                  </g>

                  {/* Regulatory Footer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="95" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="210" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">INDIAN CYBER FORENSICS JURISPRUDENCE</text>
                    <text x="250" y="230" fill="#cbd5e1" textAnchor="middle" fontSize="9">Bharatiya Sakshya Adhiniyam Sec 65B • IT Act 2000 Sec 70B (6-Hour Mandate)</text>
                    <text x="250" y="248" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">180-Day Centralized Log Archival retained on Indian domestic cloud infrastructure.</text>
                    <text x="250" y="265" fill="#fbbf24" textAnchor="middle" fontSize="8">DPDP Act 2023 Penalty Cap: ₹250 Crores for corporate negligence.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan7" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.2: The 5-stage cyber incident forensic reconstruction and statutory reporting lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Industry Capstone Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Examine how security leads protect core banking switches, clinical hospital networks, 220kV supergrids, and software supply chains across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Engineering Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Industry Dilemma ({currentLocalScenario.industryDomain})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Ethical Hacker Engineering Solution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Industry Metrics &amp; Operational Standards
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
              Guidelines to lead mission-critical cybersecurity defense across enterprise and national infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Architectural Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Hardware HSMs:</strong> Never store master encryption keys in volatile server RAM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Optical Data Diodes:</strong> Use physical one-way light barriers on SCADA power grids.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Micro-segment Clinical VLANs:</strong> Isolate hospital infusion pumps from guest Wi-Fi networks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce FIDO2 MFA:</strong> Eliminate password-only authentication across all remote access VPNs.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Industry Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Flat Network Fallacy:</strong> Connecting corporate accounting PCs directly to industrial PLCs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting Legacy VPNs:</strong> Leaving unmonitored single-factor portals active for remote staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Cleartext Medical DICOM:</strong> Transmitting unencrypted patient scans over open TCP port 104.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Third-Party Blindspots:</strong> Failing to audit HVAC and SaaS vendors (Target breach lesson).</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> National Compliance Rules
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act 2023:</strong> Protect citizen privacy to avoid ₹250 Crore penalty caps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain 180-Day Log Archival:</strong> Retain immutable SIEM audit trails within India.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Respect 6-Hour CERT-In SLA:</strong> Escalate confirmed security intrusions within 6 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Implement Immutable WORM:</strong> Lock backup snapshots with S3 Object Lock for total ransomware immunity.</span>
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
              Synthesize key industry case studies and defense principles before reviewing the final comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Future Cybersecurity Leaders
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why the Colonial Pipeline shutdown happened without a zero-day: single-factor legacy passwords on remote VPNs bypass millions of rupees in enterprise firewall investments.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Optical Data Diodes solve the SCADA dilemma: using a physical one-way light beam allows corporate dashboards to view real-time energy production while physically guaranteeing zero inbound cyber attacks.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise architectures, never rely on a single perimeter wall. Design with defense-in-depth: assume breach, micro-segment every network, and lock backups in immutable WORM storage.
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
                <span>Bangladesh Bank (2016): Printer DLL hooked to hide $81M wire fraud.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Colonial Pipeline (2021): Single-factor legacy VPN shut down fuel pipeline.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AIIMS Delhi (2022): Ransomware forced 14 days of manual pen/paper.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Ukraine Grid (2015): First cyber attack to open circuit breakers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SolarWinds (2020): Build pipeline injected trojanized signed DLLs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Optical Data Diodes guarantee 100% one-way SCADA data flow.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Ethical Hacking Case Studies & Industry Applications FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Ethical Hacking Case Studies & Industry Applications (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 002_002: Hacking, Ethical Hacking & Hacker Types! You have explored the entire continuum—from the history of hacking and hacker taxonomy to red/blue/purple teaming, threat actors, cyber laws, enterprise defense, bug bounties, and mission-critical industry case studies. As you advance to subsequent modules, carry forward this foundational truth: technical excellence without unyielding ethics is perilous, but technical mastery united with ethical integrity is the greatest shield of our digital nation."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
