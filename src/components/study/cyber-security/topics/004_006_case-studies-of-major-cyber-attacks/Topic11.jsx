import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgDefenseWheelId = useId();
  const svgDoctrineId = useId();

  // Studio 1: Enterprise Defense Maturity & ROI Calculator State
  const [patchHygieneLevel, setPatchHygieneLevel] = useState(3); // 1 to 4
  const [zeroTrustIdentityLevel, setZeroTrustIdentityLevel] = useState(3); // 1 to 4
  const [microsegmentationLevel, setMicrosegmentationLevel] = useState(3); // 1 to 4
  const [immutableBackupLevel, setImmutableBackupLevel] = useState(3); // 1 to 4
  const [soarAutomationLevel, setSoarAutomationLevel] = useState(3); // 1 to 4

  // Studio 2: Master Case Study Matrix Explorer State
  const [selectedCaseFilter, setSelectedCaseFilter] = useState("all");

  // Studio 3: NIST CSF 2.0 Function Selector
  const [activeCsfFunction, setActiveCsfFunction] = useState("govern");

  // Studio 4: Regional Capstone Blueprint Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("grand_blueprint");

  // Master 8 Case Studies Comprehensive Database
  const masterCaseStudyData = [
    {
      id: "stuxnet",
      name: "Stuxnet (2010)",
      category: "SCADA Sabotage & Cyber Warfare",
      actor: "US / Israeli Intelligence (Operation Olympic Games)",
      vector: "Contractor infected USB flash drive bridging air gap",
      failure: "Unchecked Siemens PLC ladder logic; implicit trust on industrial LAN",
      remedy: "Host-based EDR + Hardware USB sanitization + Cryptographically signed PLC firmware validation",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    },
    {
      id: "target",
      name: "Target Corp (2013)",
      category: "Supply Chain & Flat Network",
      actor: "Criminal Syndicate (Fazio Mechanical credentials)",
      vector: "Phished credentials of third-party HVAC vendor",
      failure: "Unsegmented flat corporate network; vendor reached core POS credit card vault",
      remedy: "Host-based micro-segmentation + ZTNA application-specific reverse proxies",
      badgeColor: "bg-red-950 text-red-300 border-red-800"
    },
    {
      id: "sony",
      name: "Sony Pictures (2014)",
      category: "Nation-State Wiper & Extortion",
      actor: "Lazarus Group (North Korea / RGB)",
      vector: "Spear-phishing email delivering wiper malware",
      failure: "Plaintext passwords on network shares; lack of behavioral EDR process blocking",
      remedy: "Just-In-Time PAM + Hardware token vaults + Behavioral EDR process termination",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      id: "ukraine",
      name: "Ukraine Grid (2015)",
      category: "Critical Energy Infrastructure",
      actor: "Sandworm Team (Russian GRU Unit 74455)",
      vector: "BlackEnergy 3 weaponized Microsoft Office macro via spear-phishing",
      failure: "Single-factor IT/OT VPN; remote serial firmware flashing without dual authorization",
      remedy: "FIDO2 Hardware MFA on Purdue Level 3.5 IDMZ + Unidirectional Data Diodes + Manual hand-crank drills",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      id: "wannacry",
      name: "WannaCry / NotPetya (2017)",
      category: "Autonomous Cryptoworms & Wipers",
      actor: "Lazarus Group (WannaCry) / Sandworm (NotPetya)",
      vector: "EternalBlue (MS17-010) SMBv1 RCE exploit on Port 445",
      failure: "Unpatched legacy SMBv1; flat workstation subnets allowing rapid automated worm spread",
      remedy: "Unconditional SMBv1 purge + 24-hr CISA KEV patch SLA + Host-based East-West firewall rules",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800"
    },
    {
      id: "equifax",
      name: "Equifax (2017)",
      category: "Web Application RCE & Data Exfiltration",
      actor: "Chinese PLA 54th Research Institute",
      vector: "Apache Struts 2 OGNL Injection RCE (CVE-2017-5638)",
      failure: "No centralized SBOM; expired SSL inspection certificate blinded IDS for 76 days",
      remedy: "Automated CI/CD CycloneDX SBOM scans + Certificate Lifecycle Management + DB Tokenization",
      badgeColor: "bg-red-950 text-red-300 border-red-800"
    },
    {
      id: "solarwinds",
      name: "SolarWinds (2020)",
      category: "CI/CD Build Pipeline Infiltration",
      actor: "APT29 / Cozy Bear (Russian Foreign Intelligence - SVR)",
      vector: "SUNSPOT compiler source swap during `msbuild.exe` execution",
      failure: "Persistent build server; ADFS private token-signing key stolen for Golden SAML forgery",
      remedy: "Ephemeral SLSA Level 3 build runners + FIPS 140-2 Level 3 HSM key isolation + Device Conditional Access",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    {
      id: "colonial",
      name: "Colonial Pipeline (2021)",
      category: "Ransomware & IT/OT Interdependency",
      actor: "DarkSide Ransomware-as-a-Service (RaaS)",
      vector: "Orphaned legacy VPN account without MFA (reused dark web password)",
      failure: "Single-factor authentication; tight operational coupling between IT billing and physical pumping",
      remedy: "Automated 30-day dormant IGA de-provisioning + Universal FIDO2 Hardware MFA + Autonomous SCADA islanding",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    }
  ];

  // Studio 1: Calculate Maturity Index & Financial Risk Exposure (in ₹ Crores)
  const enterpriseMaturityMetrics = useMemo(() => {
    const totalScore = patchHygieneLevel + zeroTrustIdentityLevel + microsegmentationLevel + immutableBackupLevel + soarAutomationLevel;
    const maturityPercentage = Math.round((totalScore / 20) * 100);

    // Financial Risk Exposure (FAIR model calculation in ₹ Crores)
    // Base unmitigated enterprise risk = ₹120 Crores
    const baseRiskExposureINR = 120;
    const mitigatedRiskExposureINR = Math.max(2.5, +(baseRiskExposureINR * (1 - maturityPercentage / 105)).toFixed(1));
    const annualSavingsINR = +(baseRiskExposureINR - mitigatedRiskExposureINR).toFixed(1);

    let maturityTier = "";
    let tierColor = "";
    let description = "";

    if (maturityPercentage >= 85) {
      maturityTier = "TIER 4: ADAPTIVE & CYBER-RESILIENT";
      tierColor = "text-emerald-400 font-extrabold";
      description = "World-class defense! Automated 24-hr KEV patching, universal FIDO2 hardware MFA, host micro-segmentation, and immutable WORM backups reduce breach probability by >95%.";
    } else if (maturityPercentage >= 65) {
      maturityTier = "TIER 3: SYSTEMATIC & PROACTIVE";
      tierColor = "text-blue-400 font-bold";
      description = "Strong foundation. Security controls are documented and enforced across core subnets, though legacy edge systems require automated posture checking.";
    } else if (maturityPercentage >= 45) {
      maturityTier = "TIER 2: REACTIVE & RISK-EXPOSED";
      tierColor = "text-amber-400 font-bold";
      description = "Elevated vulnerability. Monthly patch cycles and partial MFA leave critical blind spots for automated ransomware worms and lateral movement.";
    } else {
      maturityTier = "TIER 1: FRAGILE & CATASTROPHIC RISK";
      tierColor = "text-rose-400 font-extrabold";
      description = "Severe exposure! Flat unsegmented network with single-factor passwords matches pre-breach postures of Equifax, Target, and Colonial Pipeline.";
    }

    return {
      maturityPercentage,
      mitigatedRiskExposureINR,
      annualSavingsINR,
      maturityTier,
      tierColor,
      description
    };
  }, [patchHygieneLevel, zeroTrustIdentityLevel, microsegmentationLevel, immutableBackupLevel, soarAutomationLevel]);

  // Studio 3: NIST CSF 2.0 Core Data
  const csfFunctions = {
    govern: {
      name: "1. GOVERN (GV)",
      focus: "Strategic alignment, organizational risk management, legal compliance, and board oversight.",
      outcomes: [
        "GV.OC: Organizational context and legal obligations (DPDP Act 2023 / CERT-In) established.",
        "GV.RM: Cyber risk appetite and financial quantification (FAIR framework) approved by Board of Directors.",
        "GV.SC: Comprehensive Third-Party Software Supply Chain Risk Management (C-SCRM) and SBOM verification."
      ]
    },
    identify: {
      name: "2. IDENTIFY (ID)",
      focus: "Continuous asset discovery, vulnerability scoring (CISA KEV / EPSS), and attack surface mapping.",
      outcomes: [
        "ID.AM: Complete hardware, software (SBOM), and service account inventories maintained continuously.",
        "ID.RA: Risk-based vulnerability assessments integrated with 24-hour KEV remediation SLAs.",
        "ID.IM: Continuous Attack Surface Management (ASM) identifying shadow IT and unindexed endpoints."
      ]
    },
    protect: {
      name: "3. PROTECT (PR)",
      focus: "Zero Trust identity, universal FIDO2 hardware MFA, micro-segmentation, and data encryption.",
      outcomes: [
        "PR.AA: Universal FIDO2/WebAuthn hardware keys (YubiKeys) with Just-In-Time PAM role assignment.",
        "PR.DS: Data tokenization and AES-256 encryption at rest; immutable WORM air-gapped backups.",
        "PR.PS: Host-based East-West micro-segmentation and Purdue Level 3.5 IDMZ with physical data diodes."
      ]
    },
    detect: {
      name: "4. DETECT (DE)",
      focus: "Continuous behavioral monitoring, living-off-the-land hunting, and automated SOAR correlation.",
      outcomes: [
        "DE.CM: 24/7 EDR behavioral process execution tracking and real-time DNS DGA exfiltration detection.",
        "DE.AE: Automated Breach and Attack Simulation (BAS) validating detection rules continuously.",
        "DE.TI: Real-time Threat Intelligence ingestion mapping adversary TTPs to MITRE ATT&CK."
      ]
    },
    respond: {
      name: "5. RESPOND (RS)",
      focus: "Rapid containment, eradication of persistence, and statutory regulatory notifications.",
      outcomes: [
        "RS.MA: Automated host network isolation via EDR APIs executed within minutes of detection.",
        "RS.CO: Mandatory 6-hour CERT-In and 72-hour GDPR statutory incident notification dispatch.",
        "RS.AN: Forensic super-timeline reconstruction (Plaso) and memory volatility analysis."
      ]
    },
    recover: {
      name: "6. RECOVER (RC)",
      focus: "Safe phased restoration, blameless post-mortems, and permanent architectural hardening.",
      outcomes: [
        "RC.RP: Bare-metal restoration from immutable backups in quarantined staging VLANs.",
        "RC.CO: Transparent crisis communication on verified corporate domains.",
        "RC.IM: 5-Whys Root Cause Analysis converting lessons into tracked Jira engineering roadmaps."
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Capstone Topic 11</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Synthesizing Strategic Defensive Takeaways for Modern Enterprises
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              The Grand Capstone Synthesis of Module 004_006: Transforming the lessons of history's greatest cyber conflicts into an enduring enterprise defense doctrine combining NIST CSF 2.0, Zero Trust resilience, automated hygiene, and sovereign regulatory compliance.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">The 5 Strategic Commandments</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">NIST CSF 2.0 Wheel Implementation</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Master 8-Case Study Knowledge Matrix</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">FAIR Cyber Risk & ROI Quantification</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL 5 STRATEGIC COMMANDMENTS INFOGRAPHIC */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">01.</span> The 5 Strategic Commandments of Enterprise Cyber Resilience
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing the five non-negotiable architectural mandates required to defend modern critical infrastructure and cloud enterprises.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono">
              Capstone Doctrine
            </span>
          </div>

          {/* SVG INFOGRAPHIC: The 5 Strategic Pillars */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              The Grand Enterprise Cyber Resilience Architecture: From Automated Hygiene to Sovereign Compliance
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgDoctrineId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#065f46" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Pillar 1: Automated Hygiene */}
                <rect x="15" y="25" width="165" height="175" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="97" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">1. AUTOMATE HYGIENE</text>
                <text x="97" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• 24-hr CISA KEV SLAs</text>
                <text x="97" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Continuous SBOMs</text>
                <text x="97" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Edge Virtual Patching</text>
                <rect x="25" y="150" width="145" height="26" rx="6" fill="#065f46" />
                <text x="97" y="167" textAnchor="middle" fill="#d1fae5" fontSize="9" fontWeight="bold">No Unpatched Bugs</text>

                {/* Pillar 2: Zero Trust Identity */}
                <rect x="190" y="25" width="165" height="175" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="272" y="50" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">2. ZERO TRUST IDENTITY</text>
                <text x="272" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• FIDO2 Hardware Keys</text>
                <text x="272" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Just-In-Time PAM</text>
                <text x="272" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• App-Level ZTNA Proxies</text>
                <rect x="200" y="150" width="145" height="26" rx="6" fill="#1e3a8a" />
                <text x="272" y="167" textAnchor="middle" fill="#dbeafe" fontSize="9" fontWeight="bold">Identity is Perimeter</text>

                {/* Pillar 3: Micro-segmentation */}
                <rect x="365" y="25" width="165" height="175" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="447" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontWeight="bold">3. MICRO-SEGMENT</text>
                <text x="447" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Host East-West Filters</text>
                <text x="447" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Purdue Level 3.5 IDMZ</text>
                <text x="447" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Physical Data Diodes</text>
                <rect x="375" y="150" width="145" height="26" rx="6" fill="#581c87" />
                <text x="447" y="167" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">Contain Blast Radius</text>

                {/* Pillar 4: Supply Chain & HSM */}
                <rect x="540" y="25" width="165" height="175" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="622" y="50" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">4. HARDEN BUILDS</text>
                <text x="622" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• SLSA Level 3 Runners</text>
                <text x="622" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• FIPS 140-2 Level 3 HSM</text>
                <text x="622" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• M-of-N Signing Quorum</text>
                <rect x="550" y="150" width="145" height="26" rx="6" fill="#78350f" />
                <text x="622" y="167" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Tamper-Proof Code</text>

                {/* Pillar 5: Immutable Recovery */}
                <rect x="715" y="25" width="170" height="175" rx="10" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
                <text x="800" y="50" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">5. SURVIVABILITY</text>
                <text x="800" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Immutable WORM Vaults</text>
                <text x="800" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">• SCADA Islanding Buffers</text>
                <text x="800" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">• Blameless Post-Mortems</text>
                <rect x="725" y="150" width="150" height="26" rx="6" fill="#831843" />
                <text x="800" y="167" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="bold">Guaranteed Continuity</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE ENTERPRISE DEFENSE MATURITY & FINANCIAL ROI CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">02.</span> Studio 1: Enterprise Defense Maturity Index & FAIR ROI Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calibrate your enterprise defensive capabilities across five core dimensions and quantify the direct reduction in financial breach exposure in Indian Rupees (₹ Crores).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              FAIR ROI Calculator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 5 Dimension Sliders */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Defensive Dimension Calibration (Level 1 to 4)
              </h3>

              {/* Slider 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>1. Vulnerability & SBOM Hygiene:</span>
                  <span className="font-mono text-emerald-400 font-bold">Level {patchHygieneLevel} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={patchHygieneLevel}
                  onChange={(e) => setPatchHygieneLevel(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>2. Zero Trust Identity & FIDO2 MFA:</span>
                  <span className="font-mono text-blue-400 font-bold">Level {zeroTrustIdentityLevel} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={zeroTrustIdentityLevel}
                  onChange={(e) => setZeroTrustIdentityLevel(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>3. Workload Micro-segmentation:</span>
                  <span className="font-mono text-purple-400 font-bold">Level {microsegmentationLevel} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={microsegmentationLevel}
                  onChange={(e) => setMicrosegmentationLevel(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              {/* Slider 4 */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>4. Immutable Backups & Continuity:</span>
                  <span className="font-mono text-amber-400 font-bold">Level {immutableBackupLevel} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={immutableBackupLevel}
                  onChange={(e) => setImmutableBackupLevel(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Slider 5 */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300">
                  <span>5. Automated SOAR & Threat Hunting:</span>
                  <span className="font-mono text-pink-400 font-bold">Level {soarAutomationLevel} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={soarAutomationLevel}
                  onChange={(e) => setSoarAutomationLevel(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated FAIR ROI Dashboard */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Quantified Cyber Risk & Financial Savings (FAIR Model)
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Enterprise Cyber Maturity Index:</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-base">{enterpriseMaturityMetrics.maturityPercentage}%</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Maturity Classification:</span>
                    <span className={enterpriseMaturityMetrics.tierColor}>{enterpriseMaturityMetrics.maturityTier.split(": ")[1]}</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Residual Financial Risk Exposure:</span>
                    <span className="font-mono font-bold text-rose-400">₹{enterpriseMaturityMetrics.mitigatedRiskExposureINR} Crores / Year</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Annual Prevented Loss (ROI):</span>
                    <span className="font-mono font-bold text-emerald-400">₹{enterpriseMaturityMetrics.annualSavingsINR} Crores / Year</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-emerald-300">
                  CISO Executive Takeaway:
                </span>
                <p className="text-[11px] leading-relaxed font-sans">{enterpriseMaturityMetrics.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: MASTER CASE STUDY FORENSIC TAXONOMY MATRIX EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">03.</span> Studio 2: Master Case Study Taxonomy & Forensic Knowledge Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Side-by-side comparative analysis of all 8 landmark historical case studies, correlating attack vectors, failure modes, and architectural cures.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Master Taxonomy
            </span>
          </div>

          {/* Master Taxonomy Table */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="border-b border-slate-800 text-gray-400 font-mono">
                  <th className="py-2.5 px-3">Landmark Case Study</th>
                  <th className="py-2.5 px-3">Threat Actor & Category</th>
                  <th className="py-2.5 px-3">Primary Ingress Vector</th>
                  <th className="py-2.5 px-3">Systemic Failure</th>
                  <th className="py-2.5 px-3">Strategic Defensive Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {masterCaseStudyData.map((cs) => (
                  <tr key={cs.id} className="hover:bg-slate-900/60 transition-all">
                    <td className="py-3 px-3">
                      <span className="font-bold text-white block">{cs.name}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={clsx("px-2 py-0.5 rounded border text-[10px] font-mono font-bold block w-fit", cs.badgeColor)}>
                        {cs.actor.split(" (")[0]}
                      </span>
                      <span className="text-gray-400 text-[10px] mt-0.5 block">{cs.category}</span>
                    </td>
                    <td className="py-3 px-3 text-gray-300 text-[11px] leading-relaxed">{cs.vector}</td>
                    <td className="py-3 px-3 text-rose-300/90 text-[11px] leading-relaxed">{cs.failure}</td>
                    <td className="py-3 px-3 text-emerald-300/90 text-[11px] leading-relaxed font-semibold">{cs.remedy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* STUDIO 3: NIST CSF 2.0 GOVERNANCE IMPLEMENTATION LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">04.</span> Studio 3: NIST CSF 2.0 Governance Implementation Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the six core functions of the NIST Cybersecurity Framework 2.0 and map enterprise policies to concrete operational outcomes.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              NIST CSF 2.0 Wheel
            </span>
          </div>

          {/* 6 CSF Function Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {Object.entries(csfFunctions).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCsfFunction(key)}
                className={clsx(
                  "p-2.5 rounded-xl border text-center transition-all text-xs font-bold",
                  activeCsfFunction === key
                    ? "bg-indigo-950/70 border-indigo-500 text-white ring-2 ring-indigo-500 shadow-lg"
                    : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
                )}
              >
                {item.name.split(" (")[0]}
              </button>
            ))}
          </div>

          {/* Active CSF Function Card */}
          {(() => {
            const activeCsf = csfFunctions[activeCsfFunction];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-xl font-bold text-white">{activeCsf.name}</h3>
                  <p className="text-xs text-indigo-300 mt-0.5 font-semibold">{activeCsf.focus}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-white uppercase tracking-wider block">
                    Core Category Outcomes & Concrete Enterprise Implementations:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {activeCsf.outcomes.map((out, i) => (
                      <div key={i} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-gray-300 leading-relaxed font-sans flex flex-col justify-between">
                        <div>{out}</div>
                        <div className="text-[10px] text-indigo-400 mt-2 font-mono font-bold">NIST CSF 2.0 Compliant</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* STUDIO 4: REGIONAL ENTERPRISE CAPSTONE TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">05.</span> Studio 4: Regional Enterprise Capstone Blueprint Drill
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative grand capstone: Mamata, Mahima, Abhronila, Susmita, and Debangshu present the final enterprise cyber resilience blueprint for Kolkata, Barrackpore, Ichapur, and Jadavpur hubs.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Capstone Defense Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-medium">
                Lead Defense Architect: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (Vulnerability & DevSecOps Lead)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (Zero Trust & Cloud IAM Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter & Forensics Lead)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander & Governance Lead)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Hardware Cryptography & OT SCADA Lead)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("grand_blueprint")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "grand_blueprint"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. The Regional Enterprise Resilience Architecture
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("sovereign_governance")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "sovereign_governance"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Sovereign Governance & DPDP Act 2023 Compliance
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "grand_blueprint" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Deployed Technical Architecture across Regional Enterprise Hubs:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Automated DevSecOps & SBOM (Mamata):</span> Integrated continuous CycloneDX SBOM generation into CI/CD build runners with automated 24-hr CISA KEV patch SLAs.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Zero Trust Identity & Micro-segmentation (Mahima):</span> Enforced universal FIDO2 hardware keys (YubiKeys), eliminated standing domain admins with JIT PAM, and deployed host-based East-West packet filtering.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Purdue IDMZ & Hardware Cryptography (Debangshu):</span> Isolated critical SCADA pumping and power grid controllers behind Purdue Level 3.5 IDMZs with unidirectional data diodes and FIPS 140-2 Level 3 HSMs.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-indigo-400">Sovereign Regulatory Governance (Susmita, Abhronila & Sukanta Hui):</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">CERT-In 6-Hour Incident Escalation:</span> Automated API telemetry pipelines dispatch incident reports to CERT-In within 2 hours of verified security alerts.
                    </li>
                    <li>
                      <span className="font-semibold text-white">DPDP Act 2023 Full Compliance:</span> Deployed AES-256 database tokenization, automated consent management, and immutable WORM backup storage, eliminating multi-crore statutory liability.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Continuous Post-Mortem Feedback Loop:</span> Every security anomaly triggers blameless 5-Whys root cause analysis, converting lessons directly into tracked Jira engineering roadmaps.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">06.</span> Academic Note & Printable Revision Guide
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Print or export clean ASCII academic notes prepared by Sukanta Hui for BCA semester revision.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ASCII Revision Guide
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <PlainTextPrint
              text={noteText}
              fileName="Topic11_Synthesizing_Strategic_Defensive_Takeaways_Capstone_Notes.txt"
            />
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">07.</span> Comprehensive Exam & Interview Question Bank
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                30 in-depth conceptual, analytical, and forensic questions with code snippets, hints, and model answers synthesizing the grand enterprise cyber defense doctrine.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              30 Topic Questions
            </span>
          </div>

          <FAQTemplate questions={questions} />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic11;
