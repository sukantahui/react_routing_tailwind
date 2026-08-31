import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: CVSS Metric State
  const [attackVector, setAttackVector] = useState("N"); // N (Network), A (Adjacent), L (Local)
  const [attackComplexity, setAttackComplexity] = useState("L"); // L (Low), H (High)
  const [privilegesRequired, setPrivilegesRequired] = useState("N"); // N (None), L (Low), H (High)
  const [userInteraction, setUserInteraction] = useState("N"); // N (None), R (Required)
  const [impactLevel, setImpactLevel] = useState("H"); // H (High), L (Low)

  // Studio 2: Threat Scenario State
  const [selectedThreatScenarioKey, setSelectedThreatScenarioKey] = useState("ransomware_vpn");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_devsecops_sca");

  // Studio 1 CVSS Calculation
  const { cvssScore, severityTier, patchSla, vectorString, badgeClass } = useMemo(() => {
    let score = 5.0;

    // Attack Vector
    if (attackVector === "N") score += 2.0;
    else if (attackVector === "A") score += 1.0;
    else score += 0.2;

    // Complexity
    if (attackComplexity === "L") score += 1.2;
    else score -= 0.5;

    // Privileges Required
    if (privilegesRequired === "N") score += 1.2;
    else if (privilegesRequired === "L") score += 0.4;
    else score -= 0.6;

    // User Interaction
    if (userInteraction === "N") score += 0.8;
    else score -= 0.4;

    // Impact
    if (impactLevel === "H") score += 1.5;
    else score -= 1.0;

    score = Math.min(10.0, Math.max(0.0, score));
    const rounded = score.toFixed(1);

    let tier = "LOW";
    let sla = "< 90 Days (Routine Maintenance)";
    let badge = "bg-emerald-950 text-emerald-300 border-emerald-800";

    if (score >= 9.0) {
      tier = "CRITICAL";
      sla = "< 48 Hours (Emergency Patch / WAF Virtual Shield)";
      badge = "bg-rose-950 text-rose-300 border-rose-800";
    } else if (score >= 7.0) {
      tier = "HIGH";
      sla = "< 14 Calendar Days (Sprint Hotfix)";
      badge = "bg-amber-950 text-amber-300 border-amber-800";
    } else if (score >= 4.0) {
      tier = "MEDIUM";
      sla = "< 30 Calendar Days (Standard Release Cycle)";
      badge = "bg-indigo-950 text-indigo-300 border-indigo-800";
    }

    const vStr = `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/C:${impactLevel}/I:${impactLevel}/A:${impactLevel}`;

    return { cvssScore: rounded, severityTier: tier, patchSla: sla, vectorString: vStr, badgeClass: badge };
  }, [attackVector, attackComplexity, privilegesRequired, userInteraction, impactLevel]);

  // Studio 2: Threat vs Vulnerability Scenarios Data
  const threatScenarios = {
    ransomware_vpn: {
      key: "ransomware_vpn",
      title: "1. Ransomware Gang targeting Unpatched SSL-VPN Gateway",
      threatActor: "Organized Cybercriminal Syndicate (LockBit / BlackCat)",
      threatVector: "Automated Internet Port 443 Scanning & Exploit Ingress",
      vulnerability: "CVE-2026-8812 (Pre-Auth Remote Code Execution in VPN Gateway)",
      cvss: "9.8 (CRITICAL)",
      mitreTtp: "T1190: Exploit Public-Facing Application (Initial Access)",
      countermeasure: "Emergency Vendor Patch (< 24h) + WAF IP Reputation Filter + FIDO2 MFA",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    insider_database: {
      key: "insider_database",
      title: "2. Disgruntled Insider targeting Un-audited DB Query Access",
      threatActor: "Malicious / Negligent Insider (Departing Senior Developer)",
      threatVector: "Direct Internal SQL Query Execution & USB Mass Storage Copy",
      vulnerability: "CWE-284: Improper Access Control (Excessive SELECT privileges on PII)",
      cvss: "7.5 (HIGH)",
      mitreTtp: "T1078: Valid Accounts (Privilege Abuse) & T1048 (Data Exfiltration)",
      countermeasure: "Dynamic Data Masking (A.8.11) + Automated JML Offboarding (< 15 mins)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    apt_supply_chain: {
      key: "apt_supply_chain",
      title: "3. Nation-State APT exploiting Open-Source Dependency",
      threatActor: "Advanced Persistent Threat Group (APT29 / Cozy Bear)",
      threatVector: "Weaponized npm / PyPI Package Update (Dependency Confusion)",
      vulnerability: "CWE-506: Embedded Malicious Code in Third-Party Dependency",
      cvss: "9.1 (CRITICAL)",
      mitreTtp: "T1195.002: Supply Chain Compromise (Software Dependencies)",
      countermeasure: "Software Composition Analysis (SCA / Snyk) + Code Signing Verification",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    botnet_iot_scan: {
      key: "botnet_iot_scan",
      title: "4. Mirai-Style Botnet scanning for Default Credentials",
      threatActor: "Automated Opportunistic Script Syndicate",
      threatVector: "Mass Telnet/SSH Dictionary Brute-Force Scanning on Port 22/23",
      vulnerability: "CWE-798: Use of Hard-coded / Factory Default Credentials (`admin/admin`)",
      cvss: "5.3 (MEDIUM)",
      mitreTtp: "T1110: Brute Force & T1498: Network Denial of Service",
      countermeasure: "Automated Account Lockout (5 attempts) + Disabling Telnet + VLAN Isolation",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  };

  const activeThreatScenario = threatScenarios[selectedThreatScenarioKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_devsecops_sca",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Continuous DevSecOps SCA & DAST Scanning",
      budget: "₹18,50,000",
      challenge: "500 Payment Microservices Faced Automated Zero-Day Attacks on Open-Source Libraries",
      dilemma:
        "A 500-node payment switch processing ₹120 Crores daily faced automated exploit scripts targeting third-party Java/Python libraries, risking massive zero-day transaction hijacking.",
      resolution:
        "Mamata deployed automated Snyk SCA and OWASP ZAP DAST scanners in CI/CD pipelines, enforcing a 48-hour Critical CVE patch SLA and shielding ₹120 Crores/day UPI transactions from supply-chain exploits.",
      metrics: {
        dependenciesScanned: "4,200 Open-Source Packages",
        criticalCvesRemediated: "18 Flaws Patched in < 24h",
        buildPipelineBlocked: "100% Vulnerable Commits Intercepted",
        compliance: "ISO 27001 Control A.8.8 & PCI-DSS v4.0"
      }
    },
    {
      id: "ichapur_dicom_remediation",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "DICOM PACS Vulnerability Remediation",
      budget: "₹8,20,000",
      challenge: "Legacy Oncology PACS Imaging Server Ran Unpatched DICOM with CVSS 9.8 RCE Flaw",
      dilemma:
        "Hospital clinical network ran legacy DICOM medical imaging software with a known CVSS 9.8 Remote Code Execution vulnerability, leaving 80,000 cancer patient records vulnerable to ransomware.",
      resolution:
        "Mahima executed emergency WAF virtual patching within 12 hours and patched the underlying OS, safeguarding 80,000 oncology patient biopsy scans from ransomware encryption under the DPDP Act 2023.",
      metrics: {
        virtualPatchLatency: "12 Hours (SLA: 48h)",
        patientScansProtected: "80,000 Biopsy Records",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_mitre_ics",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA MITRE ATT&CK for ICS Threat Mapping",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced Targeted Nation-State Vectors Against Legacy RTU Firmware",
      dilemma:
        "18 high-voltage 220kV transmission substations faced targeted nation-state threat vectors against legacy RTU firmware, risking regional grid tripping and power collapse.",
      resolution:
        "Debangshu mapped SCADA vulnerabilities against MITRE ATT&CK for ICS (T0885 / T0800), deploying unidirectional data diodes and achieving 100% compliance with NCIIPC Protected System rules under IT Act Sec 70.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        mitreTechniquesMapped: "32 ICS Techniques",
        otExploitAttemptsBlocked: "100% Zero Ingress",
        compliance: "IT Act Section 70 & CEA Cyber Rules"
      }
    },
    {
      id: "jadavpur_cvss_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "CVSS v3.1 & VA/PT Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Calculate CVSS Vectors & Exploit Chaining",
      dilemma:
        "Cybersecurity students struggled to calculate CVSS vector strings, evaluate vulnerability exploit chaining, and prioritize remediation SLAs under ISO 27001 Control A.8.8.",
      resolution:
        "The team developed an interactive CVSS v3.1 Calculator and Threat-Vulnerability Matrix in React, training 215+ BCA cyber security students on professional vulnerability assessment and red teaming.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        vulnerabilitiesEvaluated: "140+ CVE Case Studies",
        examMastery: "100% Vulnerability Assessment Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 6 of 14
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Threat Identification and Vulnerability Assessment
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Neutralize attacker vectors before exploitation: master CVSS v3.1 quantitative severity scoring, 
            map adversary behaviors with the MITRE ATT&CK matrix, integrate multi-layered scanners (SAST, DAST, SCA) under ISO/IEC 27001 Control A.8.8, and enforce rapid patch SLAs under CERT-In and DPDP Act rules.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive CVSS v3.1 Base Metric Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎚️</span> Studio 1: Interactive CVSS v3.1 Base Metric Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle exploitability and impact metrics to calculate real-time CVSS v3.1 Base Scores, generate official vector strings, and determine mandatory remediation SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls: Metric Toggles */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl lg:col-span-2 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                CVSS v3.1 Exploitability &amp; Impact Metrics
              </h3>

              {/* Attack Vector */}
              <div className="space-y-1.5">
                <span className="text-gray-300 font-bold block">1. Attack Vector (AV):</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "N", label: "Network (Remote / Internet)" },
                    { id: "A", label: "Adjacent (Local Subnet)" },
                    { id: "L", label: "Local (Shell / CLI)" }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setAttackVector(btn.id)}
                      className={clsx(
                        "p-2 rounded-xl text-left border transition-all text-xs font-mono",
                        attackVector === btn.id
                          ? "bg-cyan-950 text-cyan-200 border-cyan-500 font-bold"
                          : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attack Complexity & Privileges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-gray-300 font-bold block">2. Attack Complexity (AC):</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "L", label: "Low (No special conditions)" },
                      { id: "H", label: "High (Race condition / specialized)" }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setAttackComplexity(btn.id)}
                        className={clsx(
                          "p-2 rounded-xl text-left border transition-all text-xs font-mono",
                          attackComplexity === btn.id
                            ? "bg-amber-950 text-amber-200 border-amber-500 font-bold"
                            : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850"
                        )}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-gray-300 font-bold block">3. Privileges Required (PR):</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "N", label: "None" },
                      { id: "L", label: "Low (User)" },
                      { id: "H", label: "High (Admin)" }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setPrivilegesRequired(btn.id)}
                        className={clsx(
                          "p-2 rounded-xl text-left border transition-all text-xs font-mono",
                          privilegesRequired === btn.id
                            ? "bg-purple-950 text-purple-200 border-purple-500 font-bold"
                            : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850"
                        )}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* User Interaction & Impact Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-800">
                <div className="space-y-1.5">
                  <span className="text-gray-300 font-bold block">4. User Interaction (UI):</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "N", label: "None (Zero-Click)" },
                      { id: "R", label: "Required (Victim clicks link)" }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setUserInteraction(btn.id)}
                        className={clsx(
                          "p-2 rounded-xl text-left border transition-all text-xs font-mono",
                          userInteraction === btn.id
                            ? "bg-rose-950 text-rose-200 border-rose-500 font-bold"
                            : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850"
                        )}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-gray-300 font-bold block">5. CIA Impact Magnitude:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "H", label: "High (Total CIA Loss)" },
                      { id: "L", label: "Low (Minor / Partial Loss)" }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setImpactLevel(btn.id)}
                        className={clsx(
                          "p-2 rounded-xl text-left border transition-all text-xs font-mono",
                          impactLevel === btn.id
                            ? "bg-emerald-950 text-emerald-200 border-emerald-500 font-bold"
                            : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850"
                        )}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Output: CVSS Score Dashboard */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  CVSS Score Engine
                </h3>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs font-mono">
                  <span className="text-gray-400 block text-[10px] uppercase">CVSS v3.1 Base Score:</span>
                  <span className="text-3xl font-extrabold text-white block">{cvssScore} / 10.0</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs font-mono">
                  <span className="text-gray-400 block text-[10px] uppercase">Official CVSS Vector String:</span>
                  <span className="text-[11px] text-cyan-300 font-mono break-all block">{vectorString}</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs font-mono">
                  <span className="text-gray-400 block text-[10px] uppercase">Mandatory Patching SLA:</span>
                  <span className="text-xs text-amber-300 font-bold block">{patchSla}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={clsx("p-3.5 rounded-xl border text-xs font-mono font-bold text-center", badgeClass)}>
                SEVERITY: {severityTier}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Threat vs Vulnerability Mapping Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Studio 2: Threat vs Vulnerability Matrix (MITRE ATT&amp;CK)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a real-world threat scenario to inspect the threat actor profile, exploit vector, CVE vulnerability, MITRE ATT&amp;CK technique, and defensive countermeasure.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(threatScenarios).map((sc) => {
              const isSelected = selectedThreatScenarioKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedThreatScenarioKey(sc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{sc.title.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{sc.cvss}</div>
                </button>
              );
            })}
          </div>

          {/* Active Threat Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeThreatScenario.badgeClass)}>
                  {activeThreatScenario.cvss} SEVERITY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeThreatScenario.title}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">MITRE ATT&amp;CK Tactic</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeThreatScenario.mitreTtp.split(":")[0]}</span>
              </div>
            </div>

            {/* Threat Actor & Exploited Flaw */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Identified Threat Actor &amp; Vector:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">
                  <strong>Actor:</strong> {activeThreatScenario.threatActor}<br />
                  <strong>Vector:</strong> {activeThreatScenario.threatVector}
                </p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Targeted Technical Vulnerability:</span>
                <p className="text-amber-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeThreatScenario.vulnerability}</p>
              </div>
            </div>

            {/* Defensive Countermeasure */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Prescribed Blue Team Countermeasure:</span>
              <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{activeThreatScenario.countermeasure}</p>
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
              Visualizing the Threat-Vulnerability-Control Intersection and the Continuous Vulnerability Management Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Threat-Vuln Intersection */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Threat-Vulnerability Symbiosis
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Circle: Threat Actor */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="180" cy="120" r="75" fill="#581c87" fillOpacity="0.8" stroke="#a855f7" strokeWidth="2" />
                    <text x="140" y="115" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="9">THREAT</text>
                    <text x="140" y="130" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7">Actors &amp; Vectors</text>
                  </g>

                  {/* Right Circle: Vulnerability */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="320" cy="120" r="75" fill="#083344" fillOpacity="0.8" stroke="#06b6d4" strokeWidth="2" />
                    <text x="360" y="115" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">VULNERABILITY</text>
                    <text x="360" y="130" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Unpatched Flaws</text>
                  </g>

                  {/* Intersection: EXPLOITATION EVENT */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="200" y="100" width="100" height="40" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="117" fill="#fca5a5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="7.5">
                      EXPLOITATION
                    </text>
                    <text x="250" y="130" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="6.5">
                      Security Breach
                    </text>
                  </g>

                  {/* Bottom Countermeasure Shield */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="215" width="450" height="50" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="237" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      BLUE TEAM COUNTERMEASURES BREAK THE INTERSECTION
                    </text>
                    <text x="250" y="252" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">
                      Patching the vulnerability removes the intersection, preventing exploitation completely.
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Vulnerabilities without active threats represent dormant risk; patching neutralizes the threat vector.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: The Threat-Vulnerability intersection and control neutralization model.
              </p>
            </div>

            {/* Diagram 2: Continuous Vulnerability Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Vulnerability Management Lifecycle (A.8.8)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Discover */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">1. DISCOVERY</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">SAST / DAST / Nessus</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan67)" />

                  {/* Step 2: Prioritize */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. PRIORITIZE</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">CVSS + CISA KEV</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo67)" />

                  {/* Step 3: Remediate */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="412" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">3. REMEDIATE</text>
                    <text x="412" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6.5">Patch / Virtual WAF</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Step 4: Verify */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="372" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">4. VERIFICATION RE-SCAN</text>
                    <text x="372" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6.5">Confirm CVE Closure</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen67)" />

                  {/* Step 5: Report */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="125" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">5. STATUTORY REPORTING</text>
                    <text x="125" y="138" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="6.5">CERT-In 6h Escalation (70B)</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      CONTINUOUS TECHNICAL VULNERABILITY MANAGEMENT
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Guarantees &lt; 48h Critical patch SLAs and complete regulatory safe harbor under DPDP Act.
                    </text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous vulnerability management prevents exploit chaining across all production microservices.
                  </text>

                  <defs>
                    <marker id="arrowCyan67" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo67" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGreen67" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: The Continuous Vulnerability Management lifecycle under ISO/IEC 27001 Control A.8.8.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Threat &amp; Vulnerability Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads manage SCA/DAST in Kolkata, remediate DICOM flaws in Ichapur, map SCADA ATT&amp;CK in Barrackpore, and simulate CVSS in Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Vulnerability Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Engineering Solution
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
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
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
              Guidelines for Vulnerability Engineers and Threat Hunters managing technical flaws.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Vulnerability Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 48-Hour SLA:</strong> Patch CVSS &gt;= 9.0 Critical flaws within 48 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Virtual WAF Shields:</strong> Use regex filters when no official patch is available.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Combine SAST, DAST &amp; SCA:</strong> Catch source code, runtime, and third-party flaws.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Test Exploit Chains:</strong> Evaluate how multiple Medium flaws can be chained together.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common VA/PT Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Annual Scan Myth:</strong> Scanning once a year while 70 new CVEs appear daily.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Open Source SCA:</strong> Overlooking 5,000 vulnerable third-party npm packages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Delaying CERT-In Reporting:</strong> Missing the mandatory 6-hour incident disclosure window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Exploit Status:</strong> Not checking if an exploit is actively circulating in the wild.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Patch Pipelines:</strong> Use Ansible/Puppet playbooks for automated rollouts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Integrate MITRE ATT&amp;CK:</strong> Map SIEM detection rules against real adversary TTPs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Quarterly Red Teaming:</strong> Validate real-world defenses under RBI guidelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Verify Re-Scans:</strong> Never close a remediation ticket without a successful re-scan.</span>
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
              Synthesize CVSS metric calculations and MITRE ATT&amp;CK threat mappings before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Vulnerability Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why vulnerability chaining makes even low-severity flaws dangerous: An individual flaw (like Information Disclosure or CSRF) might only have a CVSS score of 4.5. But when chained with an Insecure Direct Object Reference and Command Injection, an adversary achieves total root takeover. Always test for cumulative exploit chains during penetration testing.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How unpatched vulnerabilities establish statutory negligence under the Indian DPDP Act 2023: Leaving a documented, publicly known CVE unpatched for months that leads to a citizen data breach proves that the corporate entity failed to implement reasonable safeguards under Section 8, exposing the firm to maximum ₹250 Crore penalties under Section 33.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your DevSecOps CI/CD pipelines, integrate Software Composition Analysis (SCA) scanners to automatically reject pull requests containing dependencies with known Critical/High CVEs before code is merged into production.
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
                <span>Threat is the external danger; Vulnerability is the internal flaw or weakness.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CVSS v3.1: Critical (9.0-10.0), High (7.0-8.9), Medium (4.0-6.9), Low (0.1-3.9).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Vulnerability Assessment is scanning; Penetration Testing is active exploitation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SAST scans source code; DAST tests live apps; SCA checks open-source packages.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Critical CVEs must be patched in &lt; 48 hours; High CVEs in &lt; 14 days.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Directions 2022 mandate 6-hour reporting for critical cyber incidents.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Threat Identification and Vulnerability Assessment FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Vulnerability Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Threat Identification and Vulnerability Assessment (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Threat Identification and Vulnerability Assessment are the active shields of enterprise cyber defense. Always remember: threats and vulnerabilities are symbiotic—an attacker cannot harm you without an exploitable flaw! Master CVSS v3.1 scoring, map adversary behaviors with MITRE ATT&CK, integrate automated SAST/DAST/SCA scanners into your CI/CD pipelines under ISO 27001 Control A.8.8, and enforce strict 48-hour Critical patch SLAs to maintain unbroken statutory compliance under Indian CERT-In and DPDP Act mandates!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
