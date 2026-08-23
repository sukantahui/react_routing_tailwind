import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgKillChainId = useId();
  const svgBlastRadiusId = useId();

  // Studio 1: Selected Landmark Case Study
  const [selectedCaseKey, setSelectedCaseKey] = useState("stuxnet_2010");

  // Studio 2: Interactive Kill Chain & Blast Radius Simulator
  const [killChainInterruptionStep, setKillChainInterruptionStep] = useState(3); // 1 to 7
  const [networkSegmentationLevel, setNetworkSegmentationLevel] = useState("micro_segmented"); // flat, vlan, micro_segmented
  const [totalSubnetHosts, setTotalSubnetHosts] = useState(1200); // 100 to 5000 hosts
  const [mfaEnforced, setMfaEnforced] = useState(true);

  // Studio 3: Security ROI & DPDP Statutory Fine Exposure Calculator (INR ₹)
  const [annualRevenueINR, setAnnualRevenueINR] = useState(50); // In Crores INR (e.g. 50 Crores)
  const [customerRecordsExposed, setCustomerRecordsExposed] = useState(250000); // Records
  const [securityInvestmentINR, setSecurityInvestmentINR] = useState(15); // In Lakhs INR (e.g. 15 Lakhs)
  const [hasIncidentResponsePlan, setHasIncidentResponsePlan] = useState(true);

  // Studio 4: Regional West Bengal SOC Tabletop Scenario State
  const [selectedScenarioId, setSelectedScenarioId] = useState("barrackpore_health_incident");
  const [activeFiveWhysStep, setActiveFiveWhysStep] = useState(1);

  // Landmark Incident Profiles Database for Studio 1
  const caseStudiesDatabase = {
    stuxnet_2010: {
      key: "stuxnet_2010",
      title: "Stuxnet (2010) — The First Cyber Weapon & SCADA Sabotage",
      year: "2010",
      target: "Natanz Uranium Enrichment Facility (Iran)",
      threatActor: "Nation-State Advanced Persistent Threat (Equation Group / Olympic Games)",
      attackVector: "Infected USB flash drives exploiting 4 zero-day vulnerabilities (including LNK shortcut CVE-2010-2568)",
      dwellTime: "Estimated 18+ Months",
      impact: "Physical destruction of ~1,000 uranium centrifuges via malicious PLC frequency alterations while reporting normal telemetry.",
      primaryLesson: "Air-gapping is not an absolute barrier; industrial control systems (ICS/SCADA) require rigorous hardware root-of-trust and logic verification.",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    },
    target_2013: {
      key: "target_2013",
      title: "Target Corporation Breach (2013) — HVAC Supply Chain Vector",
      year: "2013",
      target: "Target Retail Stores (USA)",
      threatActor: "Organized Cybercrime Syndicate (FIN6 / BlackPOS)",
      attackVector: "Spear-phishing email against Fazio Mechanical Services (third-party HVAC vendor) to harvest portal credentials.",
      dwellTime: "24 Days before external law enforcement notification",
      impact: "40 Million credit/debit card numbers stolen; 70 Million customer PII records exfiltrated; over ₹1,600 Crores in direct remediation and legal costs.",
      primaryLesson: "Third-party vendor credentials must never have unrestricted access to internal payment environments; micro-segmentation and Zero Trust are essential.",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800"
    },
    sony_2014: {
      key: "sony_2014",
      title: "Sony Pictures Entertainment (2014) — Nation-State Destructive Wiper",
      year: "2014",
      target: "Sony Pictures Corporate Infrastructure (USA)",
      threatActor: "Lazarus Group (Nation-State APT)",
      attackVector: "Spear-phishing emails containing malicious PDF/documents leading to deep Active Directory privilege escalation.",
      dwellTime: "Estimated 2+ Months",
      impact: "Destructive Wiper malware ('WIPALL') overwrote Master Boot Records (MBRs), destroying thousands of servers; unreleased films and executive emails leaked.",
      primaryLesson: "Nation-state threats are not limited to military entities; commercial enterprises must deploy immutable air-gapped backups and Active Directory tiering.",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800"
    },
    ukraine_2015: {
      key: "ukraine_2015",
      title: "Ukraine Power Grid Cyber Attack (2015) — BlackEnergy & Blackout",
      year: "2015",
      target: "Prykarpattyaoblenergo & Regional Power Distribution (Ukraine)",
      threatActor: "Sandworm Team (Nation-State APT)",
      attackVector: "Spear-phishing Word documents with malicious macros deploying BlackEnergy 3 trojan; stolen VPN credentials.",
      dwellTime: "6 Months internal reconnaissance",
      impact: "230,000 citizens plunged into winter darkness for 6 hours; substation breakers opened remotely, KillDisk wiped operator workstations, and telephony DoS blinded call centers.",
      primaryLesson: "Physical grid security requires strict out-of-band OT network separation, manual failover procedures, and robust emergency dispatch readiness.",
      badgeColor: "bg-red-950 text-red-300 border-red-800"
    },
    wannacry_2017: {
      key: "wannacry_2017",
      title: "WannaCry Outbreak (2017) — Automated EternalBlue Worm",
      year: "2017",
      target: "Over 200,000 computers in 150 countries (NHS UK, FedEx, Spanish Telcos)",
      threatActor: "Lazarus Group (leveraging leaked Equation Group EternalBlue exploit)",
      attackVector: "Unauthenticated Remote Code Execution in Microsoft SMBv1 (MS17-010 / Port 445) paired with automated worm propagation.",
      dwellTime: "Instantaneous lateral execution (hours to global spread)",
      impact: "Hospitals forced to divert ambulances; massive enterprise downtime; stopped by Marcus Hutchins registering the emergency 'kill-switch' domain.",
      primaryLesson: "Legacy protocols (SMBv1) must be deactivated immediately; emergency patch management SLAs must be enforced across all connected subnets.",
      badgeColor: "bg-blue-950 text-blue-300 border-blue-800"
    },
    equifax_2017: {
      key: "equifax_2017",
      title: "Equifax Breach (2017) — Unpatched Apache Struts Vulnerability",
      year: "2017",
      target: "Equifax Credit Bureau (USA)",
      threatActor: "Chinese Military APT (PLA Unit 54th Research Institute)",
      attackVector: "Exploitation of Apache Struts Jakarta Multipart parser bug (CVE-2017-5638) on an online dispute resolution portal.",
      dwellTime: "76 Days",
      impact: "147 Million citizens' Social Security numbers, credit histories, and sensitive PII compromised; ₹5,800+ Crores in global regulatory settlements.",
      primaryLesson: "Comprehensive asset inventory and automated vulnerability scanning are paramount; expired SSL inspection certificates blinded defensive intrusion monitoring.",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800"
    },
    solarwinds_2020: {
      key: "solarwinds_2020",
      title: "SolarWinds Supply Chain Attack (2020) — SUNBURST Build Backdoor",
      year: "2020",
      target: "18,000 Orion customers including US Treasury, Homeland Security, Microsoft, FireEye",
      threatActor: "APT29 / Cozy Bear (Russian Foreign Intelligence Service SVR)",
      attackVector: "Compromise of SolarWinds internal software build system, injecting SUNBURST backdoor into signed Orion updates (`SolarWinds.Orion.Core.BusinessLayer.dll`).",
      dwellTime: "Estimated 9+ Months",
      impact: "Unprecedented cyber espionage access into world governments and critical Fortune 500 networks via trusted, digitally signed vendor updates.",
      primaryLesson: "Software Supply Chain Security (SLSA framework, SBOM, reproducible builds) and deep inspection of DNS beaconing egress traffic are mandatory.",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    colonial_2021: {
      key: "colonial_2021",
      title: "Colonial Pipeline Ransomware (2021) — IT/OT Operational Shutdown",
      year: "2021",
      target: "Colonial Pipeline Company (Largest refined oil pipeline in the USA)",
      threatActor: "DarkSide Ransomware as a Service (RaaS) Group",
      attackVector: "Single leaked employee VPN password discovered in dark web credential dumps; account lacked Multi-Factor Authentication (MFA).",
      dwellTime: "Less than 1 week before encryption detonation",
      impact: "5,500 miles of pipeline halted for 6 days; East Coast fuel shortages and panic buying; ₹37 Crore ($4.4M) ransom paid in Bitcoin (partially recovered by FBI).",
      primaryLesson: "MFA must be unconditionally universal across all remote access gateways; IT and OT networks must maintain verified independent operating capability.",
      badgeColor: "bg-orange-950 text-orange-300 border-orange-800"
    }
  };

  // Kill Chain Steps Definition for Studio 2
  const killChainSteps = [
    { step: 1, name: "1. Reconnaissance", desc: "Adversary scans target IP ranges, harvests emails, analyzes public job postings.", mitre: "T1595, T1589" },
    { step: 2, name: "2. Weaponization", desc: "Attacker pairs exploit code with a payload (e.g. MS17-010 with ransomware or DLL injector).", mitre: "T1587, T1588" },
    { step: 3, name: "3. Delivery", desc: "Payload transmitted via spear-phishing attachment, drive-by web link, or USB drop.", mitre: "T1566, T1091" },
    { step: 4, name: "4. Exploitation", desc: "Target application vulnerability triggered (e.g. buffer overflow, OGNL injection) to gain shell.", mitre: "T1203, T1059" },
    { step: 5, name: "5. Installation", desc: "Adversary establishes persistence via registry keys, WebShell, or scheduled background tasks.", mitre: "T1547, T1505" },
    { step: 6, name: "6. Command & Control (C2)", desc: "Infected host opens covert outbound beaconing channel (DNS, HTTPS, Tor) to attacker server.", mitre: "T1071, T1568" },
    { step: 7, name: "7. Actions on Objectives", desc: "Data exfiltration, database encryption, Wiper detonation, or industrial SCADA sabotage.", mitre: "T1048, T1486" }
  ];

  // Studio 2 Calculation: Blast Radius & Containment
  const blastRadiusMetrics = useMemo(() => {
    let containmentPct = 0;
    let compromisedHosts = 0;
    let breachSevered = false;

    if (killChainInterruptionStep <= 3) {
      // Interrupted during Delivery or earlier
      breachSevered = true;
      compromisedHosts = 0;
      containmentPct = 100;
    } else if (killChainInterruptionStep <= 5) {
      // Interrupted at Exploitation or Installation
      breachSevered = false;
      if (networkSegmentationLevel === "micro_segmented") {
        compromisedHosts = 1;
        containmentPct = (((totalSubnetHosts - 1) / totalSubnetHosts) * 100).toFixed(1);
      } else if (networkSegmentationLevel === "vlan") {
        compromisedHosts = Math.min(totalSubnetHosts, Math.round(totalSubnetHosts * 0.15));
        containmentPct = (((totalSubnetHosts - compromisedHosts) / totalSubnetHosts) * 100).toFixed(1);
      } else {
        // Flat network
        compromisedHosts = totalSubnetHosts;
        containmentPct = 0;
      }
    } else {
      // Full C2 or Actions on Objectives reached
      if (networkSegmentationLevel === "micro_segmented") {
        compromisedHosts = Math.min(totalSubnetHosts, mfaEnforced ? 3 : 12);
        containmentPct = (((totalSubnetHosts - compromisedHosts) / totalSubnetHosts) * 100).toFixed(1);
      } else if (networkSegmentationLevel === "vlan") {
        compromisedHosts = Math.min(totalSubnetHosts, Math.round(totalSubnetHosts * (mfaEnforced ? 0.35 : 0.65)));
        containmentPct = (((totalSubnetHosts - compromisedHosts) / totalSubnetHosts) * 100).toFixed(1);
      } else {
        compromisedHosts = totalSubnetHosts;
        containmentPct = 0;
      }
    }

    return {
      containmentPct,
      compromisedHosts,
      breachSevered
    };
  }, [killChainInterruptionStep, networkSegmentationLevel, totalSubnetHosts, mfaEnforced]);

  // Studio 3 Calculation: Financial Exposure & Return on Security Investment (ROSI)
  const financialRiskMetrics = useMemo(() => {
    // Under India DPDP Act 2023: max penalty is ₹250 Crores
    const baseRecordCostINR = 2400; // Estimated forensic + notification + legal cost per leaked Indian consumer record
    const potentialDirectLossINR = (customerRecordsExposed * baseRecordCostINR) / 10000000; // In Crores INR
    
    // DPDP statutory penalty estimate (up to ₹250 Cr cap based on negligence level)
    let dpdpPenaltyEstimateINR = 0;
    if (!hasIncidentResponsePlan) {
      dpdpPenaltyEstimateINR = Math.min(250, annualRevenueINR * 0.4 + 25);
    } else {
      dpdpPenaltyEstimateINR = Math.min(250, annualRevenueINR * 0.05 + 5);
    }

    const totalPotentialBreachImpactINR = (potentialDirectLossINR + dpdpPenaltyEstimateINR).toFixed(2);
    
    // Cost of proactive security controls (in Crores)
    const securityCostInCrores = securityInvestmentINR / 100; // e.g. 15 Lakhs = 0.15 Crores
    const netSavingsINR = (parseFloat(totalPotentialBreachImpactINR) - securityCostInCrores).toFixed(2);
    const rosiPercentage = Math.round(((parseFloat(totalPotentialBreachImpactINR) - securityCostInCrores) / securityCostInCrores) * 100);

    return {
      potentialDirectLossINR: potentialDirectLossINR.toFixed(2),
      dpdpPenaltyEstimateINR: dpdpPenaltyEstimateINR.toFixed(2),
      totalPotentialBreachImpactINR,
      netSavingsINR,
      rosiPercentage: rosiPercentage > 0 ? rosiPercentage.toLocaleString() : 0
    };
  }, [annualRevenueINR, customerRecordsExposed, securityInvestmentINR, hasIncidentResponsePlan]);

  // Studio 4: Five Whys Step Descriptions for Regional Classroom Case
  const fiveWhysData = [
    {
      step: 1,
      why: "1. Why was the Barrackpore municipal health database encrypted?",
      finding: "Attacker executed a ransomware payload from an unmonitored laboratory PC located in the Ichapur branch.",
      culprit: "Technical execution symptom."
    },
    {
      step: 2,
      why: "2. Why was the Ichapur laboratory PC able to reach the central database server?",
      finding: "The router was running a flat 10.0.0.0/16 network without firewall isolation between diagnostic testing stations and central patient database clusters in Kolkata.",
      culprit: "Network architecture & lack of micro-segmentation."
    },
    {
      step: 3,
      why: "3. How did the attacker obtain local administrator privileges on the Ichapur PC?",
      finding: "A phished lab technician opened a macro invoice; the local administrator password was identical ('HealthAdmin#2024') across all 450 clinic PCs in North 24 Parganas.",
      culprit: "Credential hygiene & lack of Microsoft LAPS / PAM."
    },
    {
      step: 4,
      why: "4. Why were the online backups encrypted simultaneously with the primary datastore?",
      finding: "The backup NAS volume was mounted as a persistent Windows network share with write permissions granted to the domain admin account.",
      culprit: "Absence of Immutable / Air-Gapped (WORM) backup architectures."
    },
    {
      step: 5,
      why: "5. (ROOT CAUSE) Why were these vulnerabilities allowed to persist in production?",
      finding: "No periodic independent security auditing, absence of automated vulnerability scans, and no mandatory executive security governance review.",
      culprit: "ORGANIZATIONAL GOVERNANCE & SECURITY AUDIT DEFICIENCY."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 0</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              The Value of Case Study Analysis in Cyber Security
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Why empirical post-mortems of landmark breaches (Stuxnet, Target, Sony, Ukraine Grid, WannaCry, Equifax, SolarWinds, Colonial Pipeline) are essential for designing resilient zero-trust defenses, calculating cyber risk ROI in Indian Rupees (₹), and preventing catastrophic operational collapses.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Empirical Threat Modeling</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Root Cause Analysis (5 Whys)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Cyber Kill Chain & Blast Radius</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">DPDP Act 2023 & ROI (₹)</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL ESSENCE & SCIENTIFIC VALUE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">01.</span> The Empirical Science of Cyber Incident Analysis
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Moving from abstract theoretical security to forensic, verifiable adversarial reality.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-mono">
              Theoretical vs Empirical
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-base font-semibold text-white">Adversary Tactics in the Wild</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Adversaries do not follow textbook security assumptions. They chain zero-days, exploit obscure supply chain dependencies, abuse living-off-the-land binaries (LOLBins), and weaponize trusted administrative accounts.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-base font-semibold text-white">Systemic Root Cause Discovery</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Superficial symptoms (e.g., an unpatched server or an infected USB) disguise the underlying governance failures: missing asset registries, flat subnets, absent multi-factor authentication, or delayed patch approval cycles.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-base font-semibold text-white">Executive Risk Justification</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Case studies translate technical vulnerabilities into concrete monetary metrics (business downtime, regulatory penalties under DPDP Act 2023, forensic expenses), justifying proactive security budgets to leadership.
              </p>
            </div>
          </div>

          {/* SVG INFOGRAPHIC: The 5 Pillars of Forensic Case Analysis */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Interactive Architectural Blueprint: Five Core Dimensions of Breach Post-Mortems
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 180" className="w-full min-w-[700px] h-44">
                <defs>
                  <linearGradient id={`${svgKillChainId}_grad1`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Step 1: Initial Access */}
                <rect x="20" y="30" width="150" height="110" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="95" y="60" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">1. Initial Access</text>
                <text x="95" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">Phishing, VPN Creds,</text>
                <text x="95" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10">RCE 0-Day, Supply Chain</text>

                {/* Arrow 1 */}
                <line x1="170" y1="85" x2="195" y2="85" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

                {/* Step 2: Dwell & Recon */}
                <rect x="195" y="30" width="150" height="110" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="270" y="60" textAnchor="middle" fill="#c084fc" fontSize="13" fontWeight="bold">2. Dwell & Recon</text>
                <text x="270" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">AD Enum, Cred Dumping,</text>
                <text x="270" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10">Avg Dwell: 76-270 Days</text>

                {/* Arrow 2 */}
                <line x1="345" y1="85" x2="370" y2="85" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

                {/* Step 3: Lateral Spread */}
                <rect x="370" y="30" width="150" height="110" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="445" y="60" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">3. Lateral Pivot</text>
                <text x="445" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">Flat Subnet Traversal,</text>
                <text x="445" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10">Pass-The-Hash, WMI</text>

                {/* Arrow 3 */}
                <line x1="520" y1="85" x2="545" y2="85" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

                {/* Step 4: Blast Radius */}
                <rect x="545" y="30" width="150" height="110" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="620" y="60" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">4. Blast Radius</text>
                <text x="620" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">Wiper, Ransomware,</text>
                <text x="620" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10">Exfiltration, Blackout</text>

                {/* Arrow 4 */}
                <line x1="695" y1="85" x2="720" y2="85" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

                {/* Step 5: Root Cause / AAR */}
                <rect x="720" y="30" width="160" height="110" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="800" y="60" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">5. Remedial AAR</text>
                <text x="800" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">Zero Trust Policy,</text>
                <text x="800" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10">Micro-seg, WORM Backups</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE LANDMARK BREACH COMPARATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">02.</span> Studio 1: Landmark Global Case Study Explorer
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Select a landmark historic incident to review its technical kill chain, impact, and defensive takeaway.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Historic Incident Matrix
            </span>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.values(caseStudiesDatabase).map((incident) => {
              const isActive = selectedCaseKey === incident.key;
              return (
                <button
                  key={incident.key}
                  onClick={() => setSelectedCaseKey(incident.key)}
                  className={clsx(
                    "px-3 py-2.5 rounded-xl text-left border transition-all text-xs font-semibold flex flex-col gap-1",
                    isActive
                      ? "bg-blue-600/20 border-blue-500 text-blue-200 shadow-md ring-1 ring-blue-500"
                      : "bg-slate-800/60 border-slate-700/80 text-gray-400 hover:bg-slate-800 hover:text-gray-200"
                  )}
                >
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{incident.year}</span>
                  <span className="truncate">{incident.title.split("—")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Case Details Card */}
          {(() => {
            const cur = caseStudiesDatabase[selectedCaseKey];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <span className={clsx("px-2.5 py-1 rounded text-xs font-mono font-bold border", cur.badgeColor)}>
                      Incident Profile: {cur.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{cur.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      <span className="font-semibold text-gray-300">Target Victim:</span> {cur.target}
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-right">
                    <span className="text-gray-400 block">Attributed Threat Actor</span>
                    <span className="font-mono text-amber-400 font-semibold">{cur.threatActor}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-rose-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> Initial Attack Vector & Infiltration
                    </span>
                    <p className="text-gray-300 leading-relaxed">{cur.attackVector}</p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-gray-400">
                      <span className="font-semibold text-gray-300">Adversary Dwell Time:</span> {cur.dwellTime}
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Repercussions & Realized Blast Radius
                    </span>
                    <p className="text-gray-300 leading-relaxed">{cur.impact}</p>
                  </div>
                </div>

                <div className="bg-blue-950/30 border border-blue-800/60 rounded-xl p-4 space-y-2">
                  <span className="text-blue-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="text-base">🛡️</span> Strategic Defensive Architecture Lesson
                  </span>
                  <p className="text-xs text-blue-100 leading-relaxed font-sans">{cur.primaryLesson}</p>
                </div>
              </div>
            );
          })()}
        </section>

        {/* STUDIO 2: INTERACTIVE KILL CHAIN & BLAST RADIUS SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">03.</span> Studio 2: Cyber Kill Chain & Blast Radius Containment Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate an adversary advancing through the 7 Kill Chain stages. Test how micro-segmentation and early interruption minimize the blast radius.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              Real-time Containment Simulator
            </span>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950 border border-slate-800 rounded-xl p-5">
            {/* Control 1: Kill Chain Interruption Point */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-300">Defense Interruption Stage:</span>
                <span className="font-mono text-blue-400 font-bold">Step {killChainInterruptionStep} of 7</span>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                value={killChainInterruptionStep}
                onChange={(e) => setKillChainInterruptionStep(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[11px] text-gray-400">
                {killChainSteps[killChainInterruptionStep - 1].name}
              </p>
            </div>

            {/* Control 2: Network Segmentation Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block">Internal Network Topology:</label>
              <select
                value={networkSegmentationLevel}
                onChange={(e) => setNetworkSegmentationLevel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="flat">Flat Network (No Internal Firewalls — e.g. Target 2013)</option>
                <option value="vlan">Standard VLAN Segmentation (Inter-VLAN Routing)</option>
                <option value="micro_segmented">Zero Trust Micro-segmentation (Host Isolation)</option>
              </select>
            </div>

            {/* Control 3: Multi-Factor Authentication & Host Count */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-300">Universal MFA Enforced:</label>
                <button
                  onClick={() => setMfaEnforced(!mfaEnforced)}
                  className={clsx(
                    "px-3 py-1 rounded text-xs font-bold transition-all",
                    mfaEnforced ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {mfaEnforced ? "ENABLED (FIDO2)" : "DISABLED (Password Only)"}
                </button>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Enterprise Hosts:</span>
                <span className="font-mono text-gray-200">{totalSubnetHosts} Endpoints</span>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={100}
                value={totalSubnetHosts}
                onChange={(e) => setTotalSubnetHosts(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Kill Chain Progress Visualizer */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Adversary Progression across Lockheed Martin Cyber Kill Chain:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
              {killChainSteps.map((k) => {
                const isPassed = k.step <= killChainInterruptionStep;
                const isInterruptionPoint = k.step === killChainInterruptionStep;
                return (
                  <div
                    key={k.step}
                    className={clsx(
                      "p-3 rounded-lg border text-center transition-all flex flex-col justify-between",
                      isInterruptionPoint
                        ? "bg-amber-500/20 border-amber-500 text-amber-200 ring-2 ring-amber-500"
                        : isPassed
                        ? "bg-rose-950/40 border-rose-800 text-rose-300"
                        : "bg-slate-950/60 border-slate-800 text-gray-500"
                    )}
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase">
                        {isInterruptionPoint ? "⚡ INTERCEPT" : isPassed ? "EXPLOITED" : "BLOCKED"}
                      </div>
                      <div className="text-xs font-bold mt-1 text-white">{k.name.split(". ")[1]}</div>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2 font-mono">{k.mitre}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Calculated Blast Radius Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-1">
              <span className="text-[11px] text-gray-400 uppercase font-semibold">Breach Severed Before Execution?</span>
              <div className={clsx("text-xl font-extrabold", blastRadiusMetrics.breachSevered ? "text-emerald-400" : "text-rose-400")}>
                {blastRadiusMetrics.breachSevered ? "YES (Threat Defeated Early)" : "NO (Active Lateral Infection)"}
              </div>
              <p className="text-[11px] text-gray-500">
                {blastRadiusMetrics.breachSevered ? "Interrupted prior to payload exploitation" : "Payload executed on internal endpoint"}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-1">
              <span className="text-[11px] text-gray-400 uppercase font-semibold">Total Compromised Endpoints</span>
              <div className="text-2xl font-mono font-extrabold text-amber-400">
                {blastRadiusMetrics.compromisedHosts} <span className="text-xs text-gray-400 font-normal">/ {totalSubnetHosts}</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Based on topology: {networkSegmentationLevel.toUpperCase()}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-1">
              <span className="text-[11px] text-gray-400 uppercase font-semibold">Containment Efficiency</span>
              <div className="text-2xl font-mono font-extrabold text-blue-400">
                {blastRadiusMetrics.containmentPct}%
              </div>
              <p className="text-[11px] text-gray-500">
                Infrastructure preserved from adversary takeover
              </p>
            </div>
          </div>
        </section>

        {/* STUDIO 3: FINANCIAL CYBER RISK & RETURN ON SECURITY INVESTMENT (ROSI) CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">04.</span> Studio 3: Cyber Security ROI & DPDP Statutory Fine Calculator (₹)
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Quantify financial breach liability under the Indian DPDP Act 2023 and justify security expenditures in Indian Rupees (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              India DPDP 2023 & ROSI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Enterprise Profile & Safeguard Inputs (Kolkata / Barrackpore Hub)
              </h3>

              {/* Annual Turnover Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Annual Enterprise Turnover:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{annualRevenueINR} Crores</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={annualRevenueINR}
                  onChange={(e) => setAnnualRevenueINR(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Customer PII Records Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer Records in Database:</span>
                  <span className="font-mono text-blue-400 font-bold">{customerRecordsExposed.toLocaleString()} Records</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={2000000}
                  step={50000}
                  value={customerRecordsExposed}
                  onChange={(e) => setCustomerRecordsExposed(parseInt(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Security Budget Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Proactive Defense Budget (MFA, Micro-seg, WORM):</span>
                  <span className="font-mono text-amber-400 font-bold">₹{securityInvestmentINR} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={100}
                  step={1}
                  value={securityInvestmentINR}
                  onChange={(e) => setSecurityInvestmentINR(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Verified Incident Plan Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-gray-300 font-semibold">Incident Response & Audit Plan in Place?</span>
                <button
                  onClick={() => setHasIncidentResponsePlan(!hasIncidentResponsePlan)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    hasIncidentResponsePlan ? "bg-emerald-600 text-white" : "bg-rose-900 text-rose-200"
                  )}
                >
                  {hasIncidentResponsePlan ? "VERIFIED (Mitigates Fine)" : "ABSENT (Gross Negligence)"}
                </button>
              </div>
            </div>

            {/* Calculated Risk & ROI Dashboard */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Financial Exposure & ROSI Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Direct Breach Losses (Downtime, Forensics):</span>
                    <span className="font-mono font-bold text-rose-400">₹{financialRiskMetrics.potentialDirectLossINR} Crores</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">DPDP Act 2023 Statutory Penalty Exposure:</span>
                    <span className="font-mono font-bold text-amber-400">₹{financialRiskMetrics.dpdpPenaltyEstimateINR} Crores</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded bg-rose-950/40 border border-rose-800/80">
                    <span className="text-rose-200 font-semibold">Total Catastrophic Loss Exposure:</span>
                    <span className="font-mono font-extrabold text-rose-300">₹{financialRiskMetrics.totalPotentialBreachImpactINR} Crores</span>
                  </div>
                </div>
              </div>

              {/* Big ROSI Callout */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-1">
                <span className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
                  Return on Security Investment (ROSI)
                </span>
                <div className="text-3xl font-mono font-black text-emerald-400">
                  +{financialRiskMetrics.rosiPercentage}%
                </div>
                <p className="text-[11px] text-emerald-200">
                  Net Loss Avoidance: ₹{financialRiskMetrics.netSavingsINR} Crores for a ₹{securityInvestmentINR} Lakh investment!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL BARRACKPORE SOC CASE TABLETOP & 5 WHYS LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-400">05.</span> Studio 4: Regional SOC Tabletop & 5 Whys Root Cause Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative incident investigation: Mamata, Mahima, Abhronila, Susmita, and Debangshu dissect a regional healthcare ransomware outbreak.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              5 Whys Root Cause Drill
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-5">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full font-medium">
                Lead Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (Forensic Lead)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (Network Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Reverse Engineer)
              </span>
            </div>

            {/* Incident Description */}
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-gray-300 space-y-1">
              <span className="font-bold text-amber-400">Incident Dispatch Summary (Barrackpore Central Diagnostic Lab):</span>
              <p>
                At 06:45 AM, staff at the Jadavpur and Ichapur collection branches reported inability to query diagnostic pathology reports. Primary database server returned encrypted files with extension <code className="text-rose-400 bg-black/40 px-1 py-0.5 rounded">.bengal_crypt</code>. Incident Commander Susmita triggered emergency post-mortem protocol.
              </p>
            </div>

            {/* Interactive 5 Whys Progression */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Step-by-Step 5 Whys Root Cause Investigation (Click steps to analyze):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {fiveWhysData.map((item) => (
                  <button
                    key={item.step}
                    onClick={() => setActiveFiveWhysStep(item.step)}
                    className={clsx(
                      "p-3 rounded-lg border text-left transition-all text-xs flex flex-col justify-between",
                      activeFiveWhysStep === item.step
                        ? "bg-purple-600/20 border-purple-500 text-purple-200 ring-1 ring-purple-500"
                        : "bg-slate-900 border-slate-800 text-gray-400 hover:bg-slate-800"
                    )}
                  >
                    <span className="font-bold text-[11px]">Why #{item.step}</span>
                    <span className="text-[10px] text-gray-500 truncate mt-1">{item.why.split("?")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Active 5 Whys Output Detail */}
              {(() => {
                const currentWhy = fiveWhysData[activeFiveWhysStep - 1];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h4 className="text-sm font-bold text-white">{currentWhy.why}</h4>
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[11px] font-mono">
                        Level {currentWhy.step} Investigation
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      <span className="font-semibold text-gray-100">Forensic Finding:</span> {currentWhy.finding}
                    </p>
                    <div className="p-2.5 rounded bg-black/40 border border-slate-800 text-xs font-mono text-amber-300">
                      Culprit Category: {currentWhy.culprit}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <FAQTemplate
            title="The Value of Case Study Analysis in Cyber Security FAQs"
            subtitle="30 In-depth Practice Questions & Forensic Case Analysis Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="The Value of Case Study Analysis in Cyber Security (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
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

export default Topic0;
