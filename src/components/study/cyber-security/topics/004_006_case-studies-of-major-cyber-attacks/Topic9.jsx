import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgTriadId = useId();
  const svgBlastRadiusId = useId();

  // Studio 1: 3-Pillar Defensive Architecture State
  const [pillar1PatchActive, setPillar1PatchActive] = useState(true);
  const [pillar2ZeroTrustActive, setPillar2ZeroTrustActive] = useState(true);
  const [pillar3SegmentationActive, setPillar3SegmentationActive] = useState(true);

  // Studio 2: Historical Case Study Matrix Comparator State
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState("target");

  // Studio 3: Patch SLA vs Threat Window State
  const [enterprisePatchSlaHours, setEnterprisePatchSlaHours] = useState(24); // 24h, 48h, 7 days, 30 days, 90 days

  // Studio 4: Regional Tabletop Lab Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("enterprise_vulnerabilities");

  // Case Study Comparative Database for Studio 2
  const caseStudySynthesisDb = {
    stuxnet: {
      name: "Stuxnet (2010) — SCADA Sabotage",
      fatalGap: "Air-gap bridged via contractor USB flash drive; unauthenticated Siemens PLC ladder logic updates.",
      architecturalCure: "Physical USB sanitization kiosks + Host-based EDR + Cryptographically signed PLC firmware validation.",
      pillarImpact: "Pillar 2 (Device Identity) & Pillar 3 (Purdue IDMZ Segmentation)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    },
    target: {
      name: "Target Corp (2013) — HVAC Supply Chain",
      fatalGap: "Unsegmented flat network allowed compromised HVAC vendor credentials to reach core Point-of-Sale (POS) credit card vault.",
      architecturalCure: "Host-based micro-segmentation (Pillar 3) + Application-specific ZTNA reverse proxy for third-party vendors.",
      pillarImpact: "Pillar 3 (Micro-segmentation) & Pillar 2 (Zero Trust ZTNA)",
      badgeColor: "bg-red-950 text-red-300 border-red-800"
    },
    sony: {
      name: "Sony Pictures (2014) — Wiper & Extortion",
      fatalGap: "Plaintext passwords stored on shared network drives; single-factor remote access; lack of living-off-the-land EDR behavioral termination.",
      architecturalCure: "Just-In-Time Privileged Access Management (PAM) + Hardware token vaults + Behavioral EDR process termination.",
      pillarImpact: "Pillar 2 (Zero Trust PAM) & Pillar 3 (Host Isolation)",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800"
    },
    ukraine: {
      name: "Ukraine Grid (2015) — BlackEnergy Sabotage",
      fatalGap: "Single-factor IT/OT VPN access; firmware flasher reachable over network without multi-party physical authorization.",
      architecturalCure: "FIDO2 Hardware MFA on Purdue Level 3.5 IDMZ + Unidirectional Data Diodes + Manual mechanical hand-crank backup drills.",
      pillarImpact: "Pillar 2 (Hardware MFA) & Pillar 3 (Purdue IDMZ & Data Diodes)",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800"
    },
    wannacry: {
      name: "WannaCry / NotPetya (2017) — SMBv1 Worms",
      fatalGap: "Unpatched MS17-010 EternalBlue on legacy SMBv1; flat workstation subnets allowing instant automated lateral propagation.",
      architecturalCure: "Unconditional SMBv1 uninstallation + 24-hr CISA KEV patch SLA + Host-based East-West Port 445 firewall blocking.",
      pillarImpact: "Pillar 1 (Automated Patching) & Pillar 3 (East-West Micro-segmentation)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800"
    },
    equifax: {
      name: "Equifax (2017) — Apache Struts Flaw",
      fatalGap: "Lack of Software Asset Inventory (SBOM); expired SSL inspection certificate blinded intrusion detection sensors for 76 days.",
      architecturalCure: "Automated CI/CD SBOM scanning (CycloneDX) + Certificate Lifecycle Management (CLM) + Database Least Privilege & Tokenization.",
      pillarImpact: "Pillar 1 (SBOM & Patching) & Pillar 2 (Zero Trust DB Tokenization)",
      badgeColor: "bg-red-950 text-red-300 border-red-800"
    },
    solarwinds: {
      name: "SolarWinds (2020) — SUNBURST Backdoor",
      fatalGap: "Compromised persistent build server; stolen ADFS private token-signing certificate allowing Golden SAML cloud token forgery.",
      architecturalCure: "SLSA Level 3 hermetic ephemeral build runners + FIPS 140-2 Level 3 HSM key storage + Intune device-bound Conditional Access.",
      pillarImpact: "Pillar 1 (SLSA Build Integrity) & Pillar 2 (Golden SAML Defense)",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    colonial: {
      name: "Colonial Pipeline (2021) — Energy Shutdown",
      fatalGap: "Orphaned legacy VPN account without MFA; tight operational coupling where IT billing disruption halted physical SCADA pumping.",
      architecturalCure: "Automated 30-day dormant IGA de-provisioning + Universal FIDO2 Hardware MFA + Autonomous SCADA islanding mode.",
      pillarImpact: "Pillar 2 (Universal Hardware MFA) & Pillar 3 (IT/OT Decoupling)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    }
  };

  // Studio 1 Calculation: Grand Enterprise Resilience Score & Blast Radius
  const triadResilience = useMemo(() => {
    let score = 0;
    if (pillar1PatchActive) score += 33;
    if (pillar2ZeroTrustActive) score += 34;
    if (pillar3SegmentationActive) score += 33;

    let blastRadiusDesc = "";
    let postureSummary = "";
    let postureColor = "";

    if (score === 100) {
      blastRadiusDesc = "ISOLATED TO SINGLE WORKLOAD (0.01% Blast Radius)";
      postureSummary = "GOLDEN RESILIENCE FORTRESS: Automated 24-hr KEV patch pipelines eliminate weaponized CVEs; NIST Zero Trust and FIDO2 MFA prevent credential misuse; micro-segmentation prevents lateral movement. Breaches are instantly contained!";
      postureColor = "text-emerald-400 font-extrabold";
    } else if (score >= 66) {
      blastRadiusDesc = "CONTAINED TO LOCAL SUBNET (10-25% Blast Radius)";
      postureSummary = "MODERATE DEFENSE: Two pillars active, but gaps remain. An adversary can breach one dimension, requiring manual SOC intervention to prevent domain escalation.";
      postureColor = "text-blue-400 font-bold";
    } else if (score >= 33) {
      blastRadiusDesc = "WIDE REGIONAL COMPROMISE (50-75% Blast Radius)";
      postureSummary = "HIGH RISK: Single pillar active. High vulnerability to automated worm propagation or supply chain lateral traversal.";
      postureColor = "text-amber-400 font-bold";
    } else {
      blastRadiusDesc = "TOTAL ENTERPRISE COLLAPSE (100% Blast Radius)";
      postureSummary = "CATASTROPHIC EXPOSURE: Zero pillars active. Flat unpatched network identical to Maersk, Equifax, and Target pre-breach posture!";
      postureColor = "text-rose-400 font-extrabold";
    }

    return {
      score,
      blastRadiusDesc,
      postureSummary,
      postureColor
    };
  }, [pillar1PatchActive, pillar2ZeroTrustActive, pillar3SegmentationActive]);

  // Studio 3 Calculation: Threat Window & Exposure Window
  const patchWindowMetrics = useMemo(() => {
    let adversaryWindowHours = 0;
    let riskLevel = "";
    let riskColor = "";
    let description = "";

    if (enterprisePatchSlaHours <= 24) {
      adversaryWindowHours = enterprisePatchSlaHours;
      riskLevel = "MINIMAL (CISA KEV Compliant)";
      riskColor = "text-emerald-400 font-bold";
      description = "Emergency 24-hour SLA closes the exploitation window before automated weaponized worm scanning or mass exploitation can scale.";
    } else if (enterprisePatchSlaHours <= 48) {
      adversaryWindowHours = enterprisePatchSlaHours;
      riskLevel = "LOW (High Resilience)";
      riskColor = "text-blue-400 font-bold";
      description = "48-hour window provides strong defense for critical RCE bugs, though fast-acting worms (WannaCry) may still attempt rapid scanning.";
    } else if (enterprisePatchSlaHours <= 168) {
      // 7 Days
      adversaryWindowHours = 168;
      riskLevel = "ELEVATED RISK";
      riskColor = "text-amber-400 font-bold";
      description = "7-day window leaves endpoints vulnerable during the peak weaponization window following public zero-day disclosure.";
    } else {
      adversaryWindowHours = enterprisePatchSlaHours * 24;
      riskLevel = "CRITICAL EXPOSURE (Equifax 2017 Posture)";
      riskColor = "text-rose-400 font-extrabold";
      description = "30 to 90-day patch cycles guarantee that weaponized threat actors will discover, exploit, and exfiltrate enterprise data long before patches deploy.";
    }

    return {
      adversaryWindowHours,
      riskLevel,
      riskColor,
      description
    };
  }, [enterprisePatchSlaHours]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 border border-emerald-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 9</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Lessons Learned: Patching, Zero Trust, and Micro-segmentation
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Architectural synthesis of three decades of landmark cyber conflicts: How automated risk-based patch management (RBVM), NIST SP 800-207 Zero Trust, and workload micro-segmentation combine to neutralize catastrophic enterprise threats.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Pillar 1: Automated Patch Management & SBOM</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Pillar 2: NIST SP 800-207 Zero Trust</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Pillar 3: Purdue & Host Micro-segmentation</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Blast Radius Minimization</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL DEFENSIVE TRIAD & BLAST RADIUS INFOGRAPHIC */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">01.</span> The 3-Pillar Enterprise Defense Architecture
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing how the three foundational pillars intersect to eliminate vulnerabilities, enforce identity verification, and minimize blast radius.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono">
              Defensive Triad
            </span>
          </div>

          {/* SVG INFOGRAPHIC: Defensive Triad */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              The Grand Defensive Triad: Comprehensive Coverage Across the Modern Enterprise Kill Chain
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgTriadId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#065f46" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Pillar 1: Automated Patch Management */}
                <rect x="20" y="25" width="260" height="175" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="150" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">PILLAR 1: RISK-BASED PATCHING</text>
                <text x="150" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Eliminate Ingress Vulnerabilities</text>
                <text x="150" y="98" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">• Automated SBOM & SCA Pipelines</text>
                <text x="150" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">• CISA KEV 24-48 Hour SLAs</text>
                <text x="150" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">• Edge WAF Virtual Patching</text>
                <rect x="35" y="150" width="230" height="26" rx="6" fill="#065f46" />
                <text x="150" y="167" textAnchor="middle" fill="#d1fae5" fontSize="9" fontWeight="bold">Neutralizes WannaCry & Equifax</text>

                {/* Inter-Pillar Connector 1 */}
                <line x1="280" y1="110" x2="320" y2="110" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />

                {/* Pillar 2: NIST SP 800-207 Zero Trust */}
                <rect x="320" y="25" width="260" height="175" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="450" y="50" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">PILLAR 2: NIST ZERO TRUST</text>
                <text x="450" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Eliminate Implicit Trust</text>
                <text x="450" y="98" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">• Universal FIDO2 Hardware MFA</text>
                <text x="450" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">• Just-In-Time (JIT) PAM Access</text>
                <text x="450" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">• ZTNA App Proxies (No Flat VPNs)</text>
                <rect x="335" y="150" width="230" height="26" rx="6" fill="#1e3a8a" />
                <text x="450" y="167" textAnchor="middle" fill="#dbeafe" fontSize="9" fontWeight="bold">Neutralizes Colonial & SolarWinds</text>

                {/* Inter-Pillar Connector 2 */}
                <line x1="580" y1="110" x2="620" y2="110" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4 2" />

                {/* Pillar 3: Network Micro-segmentation */}
                <rect x="620" y="25" width="260" height="175" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="750" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="12" fontWeight="bold">PILLAR 3: MICRO-SEGMENTATION</text>
                <text x="750" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="10">Minimize Lateral Blast Radius</text>
                <text x="750" y="98" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">• Host-Based East-West Firewalling</text>
                <text x="750" y="118" textAnchor="middle" fill="#94a3b8" fontSize="9">• Purdue Level 3.5 Industrial IDMZ</text>
                <text x="750" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">• Physical Unidirectional Data Diodes</text>
                <rect x="635" y="150" width="230" height="26" rx="6" fill="#581c87" />
                <text x="750" y="167" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">Neutralizes Target & Ukraine Grid</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE 3-PILLAR ENTERPRISE DEFENSE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">02.</span> Studio 1: 3-Pillar Enterprise Defense & Blast Radius Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Toggle the three foundational defensive pillars on or off, and evaluate how combined controls compress adversary blast radius to a single isolated workload.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              Defense Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3 Pillar Toggles */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Enterprise Defensive Pillar Toggles
              </h3>

              {/* Pillar 1 Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Pillar 1: Automated Risk-Based Patching</div>
                  <div className="text-[11px] text-gray-400">24-hr CISA KEV SLAs + CI/CD SBOM & WAF Virtual Patching</div>
                </div>
                <button
                  onClick={() => setPillar1PatchActive(!pillar1PatchActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    pillar1PatchActive ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {pillar1PatchActive ? "ACTIVE (+33%)" : "DISABLED"}
                </button>
              </div>

              {/* Pillar 2 Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Pillar 2: NIST SP 800-207 Zero Trust</div>
                  <div className="text-[11px] text-gray-400">Universal FIDO2 Hardware MFA + Just-In-Time PAM + ZTNA</div>
                </div>
                <button
                  onClick={() => setPillar2ZeroTrustActive(!pillar2ZeroTrustActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    pillar2ZeroTrustActive ? "bg-blue-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {pillar2ZeroTrustActive ? "ACTIVE (+34%)" : "DISABLED"}
                </button>
              </div>

              {/* Pillar 3 Toggle */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Pillar 3: Workload Micro-segmentation</div>
                  <div className="text-[11px] text-gray-400">East-West Workstation Firewalls + Purdue Level 3.5 IDMZ</div>
                </div>
                <button
                  onClick={() => setPillar3SegmentationActive(!pillar3SegmentationActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    pillar3SegmentationActive ? "bg-purple-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {pillar3SegmentationActive ? "ACTIVE (+33%)" : "DISABLED"}
                </button>
              </div>
            </div>

            {/* Calculated Resilience & Blast Radius Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Enterprise Resilience & Blast Radius Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Enterprise Defense Posture Index:</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-base">{triadResilience.score} / 100</span>
                  </div>

                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Maximum Breach Blast Radius:</span>
                    <span className={clsx("font-bold text-sm", triadResilience.score === 100 ? "text-emerald-400" : "text-rose-400")}>
                      {triadResilience.blastRadiusDesc}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Post-Mortem Containment Verdict:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{triadResilience.postureSummary}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-emerald-300">
                  Golden Rule of Enterprise Defense:
                </span>
                <p>
                  "A breach in one domain (e.g. stolen password or unpatched bug) must NEVER allow an adversary to compromise the entire enterprise. Micro-segmentation and Zero Trust contain the blast radius."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: HISTORICAL CASE STUDY MATRIX VS ARCHITECTURAL SOLUTIONS COMPARATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">03.</span> Studio 2: Historical Case Study Matrix vs Architectural Solutions
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore how the 3-Pillar defense model directly solves each landmark vulnerability across all 8 historical case studies.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Case Study Matrix
            </span>
          </div>

          {/* Selector Grid of All 8 Case Studies */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.entries(caseStudySynthesisDb).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedCaseStudyId(key)}
                className={clsx(
                  "p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                  selectedCaseStudyId === key
                    ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500 shadow-md"
                    : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
                )}
              >
                <div className="font-bold text-white text-[11px] truncate">{item.name.split(" — ")[0]}</div>
                <div className="text-[10px] text-gray-400 mt-0.5 truncate">{item.name.split(" — ")[1]}</div>
              </button>
            ))}
          </div>

          {/* Active Case Study Detailed Architectural Breakdown */}
          {(() => {
            const activeCase = caseStudySynthesisDb[selectedCaseStudyId];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeCase.name}</h3>
                    <p className="text-xs text-amber-400 mt-0.5 font-semibold">
                      Primary Architectural Remedy: {activeCase.pillarImpact}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-rose-400 font-semibold uppercase tracking-wider">
                      Fatal Historical Root Cause & Vulnerability
                    </span>
                    <p className="text-gray-300 leading-relaxed font-sans">{activeCase.fatalGap}</p>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-emerald-400 font-semibold uppercase tracking-wider">
                      Modern Zero Trust & Micro-segmentation Cure
                    </span>
                    <p className="text-gray-300 leading-relaxed font-sans">{activeCase.architecturalCure}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* STUDIO 3: PATCH SLA VS ADVERSARY EXPLOIT WINDOW CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">04.</span> Studio 3: Patch SLA vs Threat Exploitation Window Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Analyze how enterprise vulnerability remediation timelines (SLAs) directly define the adversary exposure window.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Patch SLA Calculator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Vulnerability Remediation Policy Configuration
              </h3>

              <div className="space-y-2">
                <label className="text-gray-300 font-semibold block">Enterprise Critical RCE Patch SLA Window:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setEnterprisePatchSlaHours(24)}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all",
                      enterprisePatchSlaHours === 24 ? "bg-emerald-600 text-white" : "bg-slate-900 border-slate-800 text-gray-400"
                    )}
                  >
                    24 Hours (CISA KEV SLA)
                  </button>
                  <button
                    onClick={() => setEnterprisePatchSlaHours(48)}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all",
                      enterprisePatchSlaHours === 48 ? "bg-blue-600 text-white" : "bg-slate-900 border-slate-800 text-gray-400"
                    )}
                  >
                    48 Hours (High Standard)
                  </button>
                  <button
                    onClick={() => setEnterprisePatchSlaHours(7 * 24)}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all",
                      enterprisePatchSlaHours === 168 ? "bg-amber-600 text-white" : "bg-slate-900 border-slate-800 text-gray-400"
                    )}
                  >
                    7 Days (Standard SLA)
                  </button>
                  <button
                    onClick={() => setEnterprisePatchSlaHours(30 * 24)}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all",
                      enterprisePatchSlaHours === 720 ? "bg-rose-900 text-rose-200" : "bg-slate-900 border-slate-800 text-gray-400"
                    )}
                  >
                    30+ Days (Legacy / Equifax)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Risk Dashboard */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Adversary Exposure Window Assessment
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Adversary Threat Window:</span>
                    <span className="font-mono font-bold text-amber-400">{patchWindowMetrics.adversaryWindowHours} Hours</span>
                  </div>

                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Exploitation Risk Classification:</span>
                    <span className={patchWindowMetrics.riskColor}>{patchWindowMetrics.riskLevel}</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Remediation Policy Assessment:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{patchWindowMetrics.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-xs text-blue-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-blue-300">
                  CISA KEV Directive:
                </span>
                <p>
                  "Known Exploited Vulnerabilities (KEVs) must be patched within 24 to 48 hours. Anything longer than 7 days gives automated threat actors sufficient time to discover and compromise internal networks."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL ENTERPRISE & INFRASTRUCTURE TABLETOP LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">05.</span> Studio 4: Regional Enterprise & Infrastructure Defense Tabletop
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative architecture audit: Mamata, Mahima, Abhronila, Susmita, and Debangshu design an enterprise-wide Zero Trust defense blueprint for a regional conglomerate in Kolkata, Barrackpore, Ichapur, and Jadavpur.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              Regional Blueprint Lab
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-medium">
                Lead Enterprise Architect: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (Vulnerability & SBOM Specialist)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (Zero Trust Network Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Identity & HSM Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("enterprise_vulnerabilities")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "enterprise_vulnerabilities"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Conglomerate Audit Findings (Kolkata & Barrackpore)
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("zero_trust_blueprint")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "zero_trust_blueprint"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed 3-Pillar Zero Trust Blueprint
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "enterprise_vulnerabilities" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered across Regional Enterprise Hubs:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Monthly Patching Cycles:</span> Critical servers were only patched once every 30 days, leaving an unmitigated 29-day exploitation window.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Flat Enterprise Network:</span> Finance accounting PCs in Jadavpur were on the same unsegmented VLAN as warehouse shipping terminals.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Standing Domain Admin Accounts:</span> IT administrators logged into daily workstations with permanent domain administrator privileges.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Blueprint Deployed by Susmita, Mahima & Debangshu:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Pillar 1 (RBVM & SBOM):</span> Integrated automated continuous CDM scanning with mandatory 24-hr SLAs for CISA KEV vulnerabilities and automated CI/CD CycloneDX SBOM generation.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Pillar 2 (NIST Zero Trust):</span> Deployed universal FIDO2 hardware keys (YubiKeys), eliminated standing admin rights with Just-In-Time PAM, and replaced flat VPNs with ZTNA application proxies.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Pillar 3 (Micro-segmentation):</span> Enforced host-based East-West firewall rules blocking client-to-client traffic and isolated industrial SCADA networks behind Purdue Level 3.5 IDMZs with data diodes.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <FAQTemplate
            title="Lessons Learned: Patching, Zero Trust, and Micro-segmentation FAQs"
            subtitle="30 In-depth Practice Questions & Forensic Case Analysis Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Lessons Learned: Patching, Zero Trust, and Micro-segmentation (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic9;
