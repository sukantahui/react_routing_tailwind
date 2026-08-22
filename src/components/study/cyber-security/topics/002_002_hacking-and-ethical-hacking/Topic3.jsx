import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: White Hat Specialization Explorer State
  const [selectedRoleKey, setSelectedRoleKey] = useState("pentester");

  // Studio 2: PTES 7-Phase Workflow State
  const [activePtesPhaseIndex, setActivePtesPhaseIndex] = useState(0);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_osstmm");

  // White Hat Roles Data for Studio 1
  const whiteHatRoles = {
    pentester: {
      key: "pentester",
      title: "Penetration Tester (Network / Web / Mobile)",
      icon: "🎯",
      color: "from-blue-500 to-indigo-600",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      avgSalaryINR: "₹8 Lakhs - ₹25 Lakhs / yr",
      primaryMission:
        "Conduct systematic, authorized technical assessments to discover and safely exploit vulnerabilities across web applications, cloud APIs, and internal Active Directory networks.",
      toolset: "Burp Suite Pro, Nmap, Metasploit Framework, BloodHound, FFUF, OWASP ZAP",
      frameworks: "PTES (Penetration Testing Execution Standard), OWASP WSTG v4.2, NIST SP 800-115",
      keyDeliverable: "Comprehensive Technical Pentest Report with CVSS v3.1 Scores & Developer Remediation Code"
    },
    vuln_researcher: {
      key: "vuln_researcher",
      title: "Vulnerability Researcher & Reverse Engineer",
      icon: "🔬",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      avgSalaryINR: "₹15 Lakhs - ₹45 Lakhs / yr",
      primaryMission:
        "Dissect compiled C/C++ binaries, operating system kernels, and IoT hardware firmware to discover previously unknown zero-day vulnerabilities and author defensive patches.",
      toolset: "NSA Ghidra, IDA Pro, Binary Ninja, AFL++ (Fuzzer), GDB PEDA, WinDbg",
      frameworks: "Binary Taint Analysis, Memory Model Specifications, Coordinated Vulnerability Disclosure",
      keyDeliverable: "Formal CVE Advisory Submission, Safe Proof-of-Concept Exploit, Vendor Root-Cause Fix"
    },
    red_teamer: {
      key: "red_teamer",
      title: "Red Team Operator (Adversary Emulation)",
      icon: "⚔️",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      avgSalaryINR: "₹18 Lakhs - ₹40 Lakhs / yr",
      primaryMission:
        "Emulate multi-stage nation-state threat actors (APTs) to test an enterprise's defensive detection capabilities (Blue Team SOC), incident response velocity, and physical perimeter locks.",
      toolset: "Cobalt Strike, Sliver C2, Mythic, Proxmark3 (RFID cloner), Lockpicks, Rubber Ducky",
      frameworks: "MITRE ATT&CK Framework, TIBER-EU, CBEST Adversary Emulation Guidelines",
      keyDeliverable: "End-to-End Campaign Timeline, Blue Team Detection Evasion Analysis, SOC Dwell-Time Metrics"
    },
    bug_hunter: {
      key: "bug_hunter",
      title: "Bug Bounty Hunter (Crowdsourced Security)",
      icon: "💰",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      avgSalaryINR: "₹10,000 - ₹15,00,000+ per Critical Bug Payout",
      primaryMission:
        "Independently audit global enterprise programs across HackerOne and Bugcrowd within defined safe harbor scopes, earning tiered financial bounties for valid reported security flaws.",
      toolset: "Nuclei, Amass, Sublist3r, Caido, Custom Python API Automation, Burp Suite Extensions",
      frameworks: "Program Policy Terms of Service, Legal Safe Harbor Agreements, CWE Taxonomy",
      keyDeliverable: "Reproducible Bug Bounty Report with Raw HTTP Requests & Harmless PoC Validation"
    },
    compliance_auditor: {
      key: "compliance_auditor",
      title: "Information Security & Compliance Auditor",
      icon: "📋",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      avgSalaryINR: "₹7 Lakhs - ₹22 Lakhs / yr",
      primaryMission:
        "Evaluate an enterprise's overall Information Security Management System (ISMS), technical configurations, and employee policies against national and international legal mandates.",
      toolset: "OpenSCAP, Wazuh, Nessus Professional, Qualys Guard, Audit Scripting Engines",
      frameworks: "ISO/IEC 27001:2022, PCI-DSS 4.0, SOC 2 Type II, India DPDP Act 2023, RBI Cyber Framework",
      keyDeliverable: "Formal Statement of Applicability (SoA), Gap Analysis Matrix, Statutory Certification Audit"
    }
  };

  const activeRole = whiteHatRoles[selectedRoleKey];

  // PTES 7-Phase Workflow Data for Studio 2
  const ptesPhases = [
    {
      step: "01",
      name: "Pre-engagement Interactions",
      tagline: "Scope Definition, Rules of Engagement & Legal Sign-off",
      icon: "📝",
      objectives: "Define in-scope IP ranges, establish permitted testing timeframes, obtain signed RoE contracts from CISO, and configure 24/7 emergency abort contact protocols.",
      deliverable: "Signed Rules of Engagement (RoE) & Non-Disclosure Agreement (NDA)",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700"
    },
    {
      step: "02",
      name: "Intelligence Gathering (OSINT)",
      tagline: "Passive & Active Target Reconnaissance",
      icon: "🔍",
      objectives: "Collect Open Source Intelligence (whois, DNS records, crt.sh certificate transparency logs), map external IP subnets, and identify exposed employee credentials.",
      deliverable: "Attack Surface Map & Infrastructure Topology Document",
      badgeClass: "bg-indigo-900/50 text-indigo-300 border-indigo-700"
    },
    {
      step: "03",
      name: "Threat Modeling & Asset Mapping",
      tagline: "STRIDE Analysis & Attack Path Planning",
      icon: "🗺️",
      objectives: "Categorize high-value client digital assets (core banking ledgers, customer databases), identify potential entry points, and map likely adversarial motivation.",
      deliverable: "Targeted Attack Path Matrix & STRIDE Component Model",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    },
    {
      step: "04",
      name: "Vulnerability Analysis",
      tagline: "Automated Scanning & Manual Logic Flaw Discovery",
      icon: "🔎",
      objectives: "Execute targeted port scans (Nmap), web application proxy analysis (Burp Suite), and manual inspection to discover unpatched CVEs, IDORs, and misconfigurations.",
      deliverable: "Raw Vulnerability Findings Registry with False-Positive Filtering",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    },
    {
      step: "05",
      name: "Exploitation (Vulnerability Validation)",
      tagline: "Controlled, Safe Proof-of-Concept Execution",
      icon: "⚡",
      objectives: "Safely execute precision exploit payloads (e.g. non-destructive SQL queries or diagnostic command execution) to definitively validate exploitability without crashing systems.",
      deliverable: "Validated Proof-of-Concept (PoC) Evidence & Access Screenshots",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700"
    },
    {
      step: "06",
      name: "Post-Exploitation & Blast Radius",
      tagline: "Asset Value Assessment & Privilege Escalation",
      icon: "📊",
      objectives: "Determine the true business impact of the breach, test lateral movement paths within scope, identify sensitive PII exposure, and evaluate defense-in-depth controls.",
      deliverable: "Blast Radius Calculation & Business Risk Impact Analysis",
      badgeClass: "bg-teal-900/50 text-teal-300 border-teal-700"
    },
    {
      step: "07",
      name: "Actionable Reporting & Clean-up",
      tagline: "Executive Business Summary & Developer Fix Blueprints",
      icon: "📄",
      objectives: "Deliver an executive summary quantifying risk in ₹ INR for C-suite leaders, provide exact code patches for engineers, and perform complete post-test artifact cleanup.",
      deliverable: "Final Penetration Testing Report & Post-Test Cleanup Verification",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700"
    }
  ];

  const currentPtesPhase = ptesPhases[activePtesPhaseIndex];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_osstmm",
      lead: "Mamata",
      role: "Lead Penetration Testing Specialist",
      location: "Kolkata FinTech Hub",
      title: "OSSTMM-Compliant Core Banking Audit",
      budget: "₹8,50,000",
      specialization: "Network & Web Penetration Testing",
      dilemma:
        "A commercial UPI switch in Kolkata required a formal metrics-based security assessment before receiving final production authorization from the Reserve Bank of India (RBI).",
      professionalRemedy:
        "Mamata executed an OSSTMM-compliant operational audit across data network channels and REST API endpoints. She discovered and patched an unauthenticated parameter tampering flaw, delivering a comprehensive PTES-structured final audit report.",
      metrics: {
        methodologyStandard: "OSSTMM v3 & PTES",
        ravScoreAchieved: "98.4 Ravs (High Operational Posture)",
        vulnerabilitiesPatched: "14 Verified Flaws",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_telemed",
      lead: "Mahima",
      role: "Chief Healthcare Security Auditor",
      location: "Ichapur General Hospital",
      title: "OWASP WSTG Telemedicine Security Audit",
      budget: "₹4,80,000",
      specialization: "Application Security & Compliance",
      dilemma:
        "The hospital deployed a cloud telemedicine consultation portal. Under India's DPDP Act 2023, exposing patient prescription files to unauthorized users risks statutory penalties up to ₹250 Crores.",
      professionalRemedy:
        "Mahima systematically applied the OWASP Web Security Testing Guide (WSTG v4.2). She identified a Broken Object-Level Authorization (BOLA/IDOR) vulnerability, guided developers to enforce tenant session checks, and validated data at rest with AES-256 encryption.",
      metrics: {
        methodologyStandard: "OWASP WSTG v4.2",
        recordsProtected: "20,000 Patient Files",
        remediationSpeed: "< 6 Hours",
        compliance: "NABH & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada",
      lead: "Debangshu",
      role: "Principal OT Infrastructure Researcher",
      location: "Barrackpore 220kV Substation Grid",
      title: "NIST SP 800-115 Industrial SCADA Audit",
      budget: "₹6,20,000",
      specialization: "Vulnerability Research & Industrial OT",
      dilemma:
        "Auditing substation Remote Terminal Units (RTUs) and protective relays without sending active fuzzing packets that could trip high-voltage circuit breakers and cause regional blackouts.",
      professionalRemedy:
        "Debangshu applied NIST SP 800-115 Review Techniques (firewall rulesets, firmware binary decompilation in Ghidra) and passive network sniffing, confirming that all protective switching commands enforce IEC 62351 cryptographic nonces.",
      metrics: {
        methodologyStandard: "NIST SP 800-115 Review",
        gridSafety: "100% Operational Continuity",
        firmwareAnalyzed: "IEC 60870-5-104 Gateway",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_bounty",
      lead: "Abhronila & Susmita",
      role: "Crowdsourced Security Research Leads",
      location: "Jadavpur University Cyber Syndicate",
      title: "E-Commerce Cloud Metadata SSRF Discovery",
      budget: "₹3,90,000",
      specialization: "Bug Bounty Hunting & Cloud Security",
      dilemma:
        "While testing a major Indian e-commerce platform on HackerOne within legal safe harbor, the researchers discovered an unauthenticated Server-Side Request Forgery (SSRF) flaw leaking AWS EC2 internal metadata.",
      professionalRemedy:
        "They provided a harmless proof-of-concept showing loopback reachability (`http://169.254.169.254/latest/meta-data/`) without dumping customer credit cards, earning a ₹3,50,000 bug bounty and formal safe harbor commendation.",
      metrics: {
        methodologyStandard: "HackerOne Safe Harbor Policy",
        bountyReward: "₹3,50,000 Bounty Awarded",
        severityRating: "Critical (CVSS 9.8)",
        compliance: "Coordinated Vulnerability Disclosure"
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
            Cyber Security Module 002_002 • Topic 3 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hacker Taxonomy: White Hat Hackers
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            White Hat hackers are the vital digital immune system of contemporary civilization. Explore the five core defensive 
            specializations (Pentesters, Reverse Engineers, Red Teamers, Bug Bounty Hunters, Compliance Auditors), global testing 
            standards (PTES, OSSTMM, NIST SP 800-115, OWASP WSTG), and the Indian CERT-In empanelled auditing ecosystem.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: White Hat Specialization & Career Arsenal Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 1: White Hat Defensive Specialization &amp; Tooling Arsenal
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a specialized White Hat discipline to inspect its primary operational mission, industry toolset, standard testing frameworks, and compensation in Indian Rupees (₹).
            </p>
          </div>

          {/* Role Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(whiteHatRoles).map((role) => {
              const isSelected = selectedRoleKey === role.key;
              return (
                <button
                  key={role.key}
                  onClick={() => setSelectedRoleKey(role.key)}
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
                    Career Role
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Role Detailed Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeRole.badgeClass)}>
                  {activeRole.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Specialization Profile &amp; Core Mandate
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Average Compensation in India</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{activeRole.avgSalaryINR}</span>
              </div>
            </div>

            {/* Mission Description */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5 text-xs">
              <span className="text-indigo-300 font-bold uppercase tracking-wider block">Primary Mission Objective</span>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{activeRole.primaryMission}</p>
            </div>

            {/* Toolset & Frameworks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-purple-300 font-bold uppercase tracking-wider block">Primary Weaponry &amp; Toolset</span>
                <p className="text-gray-300 font-mono text-[11px] leading-relaxed">{activeRole.toolset}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-amber-300 font-bold uppercase tracking-wider block">Testing Methodologies &amp; Standards</span>
                <p className="text-gray-300 font-mono text-[11px] leading-relaxed">{activeRole.frameworks}</p>
              </div>
            </div>

            {/* Key Deliverable */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Key Professional Deliverable:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeRole.keyDeliverable}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: The 7-Phase PTES Penetration Testing Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 2: Penetration Testing Execution Standard (PTES) Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the industry-standard 7 phases of a penetration test to understand the technical deliverables and safety gates enforced at each stage.
            </p>
          </div>

          {/* 7-Step Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {ptesPhases.map((phase, idx) => {
              const isSelected = activePtesPhaseIndex === idx;
              return (
                <button
                  key={phase.step}
                  onClick={() => setActivePtesPhaseIndex(idx)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] font-mono text-indigo-400 font-bold">Phase {phase.step}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{phase.name.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active PTES Phase Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentPtesPhase.badgeClass)}>
                  Phase {currentPtesPhase.step} of 07
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentPtesPhase.name}
                </h3>
                <p className="text-xs sm:text-sm text-indigo-300 italic mt-0.5">{currentPtesPhase.tagline}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Mandatory Deliverable</span>
                <span className="text-xs sm:text-sm font-bold text-amber-300">{currentPtesPhase.deliverable}</span>
              </div>
            </div>

            {/* Phase Objectives */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Operational Objectives &amp; Technical Execution</span>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{currentPtesPhase.objectives}</p>
            </div>

            {/* Next / Previous Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={activePtesPhaseIndex === 0}
                onClick={() => setActivePtesPhaseIndex((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-750 disabled:opacity-40 text-gray-300 rounded-lg text-xs font-semibold border border-gray-700 transition"
              >
                ← Previous Phase
              </button>
              <span className="text-xs text-gray-500 font-mono">
                Step {activePtesPhaseIndex + 1} / 7
              </span>
              <button
                disabled={activePtesPhaseIndex === ptesPhases.length - 1}
                onClick={() => setActivePtesPhaseIndex((prev) => Math.min(ptesPhases.length - 1, prev + 1))}
                className="px-3.5 py-1.5 bg-indigo-900/80 hover:bg-indigo-850 disabled:opacity-40 text-indigo-200 rounded-lg text-xs font-semibold border border-indigo-700 transition"
              >
                Next Phase →
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
              Visualizing the White Hat Career Ecosystem and the 7-Phase Penetration Testing Execution Standard (PTES).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: White Hat Career Ecosystem */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🌐</span> Diagram A: The White Hat Career Ecosystem &amp; Standards Stack
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Layer 1: Governance & Compliance */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="460" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="35" y="42" fill="#a7f3d0" fontWeight="bold" fontSize="11">GOVERNANCE &amp; AUDIT TIER</text>
                    <text x="35" y="58" fill="#6ee7b7" fontSize="8.5">ISO 27001 • DPDP Act 2023 • RBI Cyber Framework • CERT-In Empanelled Auditors</text>
                  </g>

                  {/* Layer 2: Adversary Emulation & Red Teaming */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="80" width="460" height="50" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="35" y="102" fill="#fee2e2" fontWeight="bold" fontSize="11">RED TEAM &amp; ADVERSARY EMULATION TIER</text>
                    <text x="35" y="118" fill="#fca5a5" fontSize="8.5">Cobalt Strike • MITRE ATT&amp;CK • Physical Bypasses • Active Directory Attacks (CRTO)</text>
                  </g>

                  {/* Layer 3: Technical Penetration Testing */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="140" width="460" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="35" y="162" fill="#c7d2fe" fontWeight="bold" fontSize="11">TECHNICAL PENETRATION TESTING TIER</text>
                    <text x="35" y="178" fill="#94a3b8" fontSize="8.5">PTES • OWASP WSTG v4.2 • Burp Suite • OSCP Hands-on Exploitation</text>
                  </g>

                  {/* Layer 4: Vulnerability Research & Bug Bounty */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="200" width="460" height="50" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="35" y="222" fill="#e0e7ff" fontWeight="bold" fontSize="11">VULNERABILITY RESEARCH &amp; BUG BOUNTY TIER</text>
                    <text x="35" y="238" fill="#c7d2fe" fontSize="8.5">NSA Ghidra • Fuzzing (AFL++) • HackerOne Safe Harbor • Kernel Zero-Days</text>
                  </g>

                  {/* Foundation: Ethics & Cyber Law */}
                  <rect x="20" y="260" width="460" height="40" rx="8" fill="#18181b" stroke="#4f46e5" strokeWidth="1.5" />
                  <text x="250" y="285" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10.5">FOUNDATION: IT Act 2000 Section 66 • (ISC)² Canons • Signed RoE</text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: The multi-tiered White Hat ecosystem built upon legal authorization and ethical discipline.
              </p>
            </div>

            {/* Diagram 2: PTES 7-Phase Cycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🔄</span> Diagram B: The 7-Phase PTES Standard Workflow
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1 to 7 Circular/Sequential Flow */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="47" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. Pre-Engagement</text>
                  </g>

                  <path d="M 150 42 L 180 42" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan)" />

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="45" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">2. Recon (OSINT)</text>
                  </g>

                  <path d="M 315 42 L 345 42" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowCyan)" />

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="45" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="47" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">3. Threat Model</text>
                  </g>

                  <path d="M 415 65 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="45" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="137" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">4. Vuln Analysis</text>
                  </g>

                  <path d="M 350 132 L 320 132" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCyan)" />

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="110" width="130" height="45" rx="6" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="250" y="137" fill="#ffe4e6" fontWeight="bold" textAnchor="middle" fontSize="10">5. Exploitation</text>
                  </g>

                  <path d="M 185 132 L 155 132" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrowCyan)" />

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="130" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="85" y="137" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">6. Post-Exploit</text>
                  </g>

                  <path d="M 85 155 L 85 200" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Final Reporting Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="200" width="460" height="85" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="225" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="12">7. ACTIONABLE REPORTING &amp; CLEANUP</text>
                    <text x="250" y="245" fill="#cbd5e1" textAnchor="middle" fontSize="9.5">Executive Summary (Business Risk in ₹ INR) • Developer Code Fixes • Artifact Erase</text>
                    <text x="250" y="262" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Verified Safe State Restored -> Re-testing Clearance Issued</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: The rigorous 7-phase PTES standard guarantees comprehensive vulnerability validation with zero operational harm.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: White Hat Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how white-hat security leaders apply global standards across Kolkata, Ichapur, Barrackpore, and Jadavpur environments.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Audit / Bounty Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Professional Remedy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Technical Dilemma &amp; Compliance Requirement
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> White Hat Professional Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.professionalRemedy}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Auditing Standards &amp; Deliverables
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
              Guidelines to advance your career as an elite white-hat security researcher.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Professional Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Quantify Risk in ₹ INR:</strong> Show executives the financial cost of unpatched bugs to secure remediation budgets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Clean Up Test Artifacts:</strong> Never leave uploaded webshells or test admin accounts on client systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Master the MITRE ATT&amp;CK Matrix:</strong> Align Red Team findings with real-world threat group TTPs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Pursue Hands-On Certs:</strong> Prioritize practical exams like OSCP and CRTO over multiple-choice certs.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Beginner Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Over-Reliance on Scanners:</strong> Relying on automated scanners that miss deep business logic vulnerabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Poor Executive Reports:</strong> Writing overly technical reports that confuse non-technical board directors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Violating Safe Harbor:</strong> Dumping entire database tables when discovering a simple SQL injection bug.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Clean-up:</strong> Leaving backdoors behind that real black-hat hackers later exploit.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Best Practices
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adhere to PTES 7-Phase Standard:</strong> Structure all audits sequentially from Pre-engagement to Reporting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Engage with CERT-In &amp; NCIIPC:</strong> Report critical national vulnerabilities through authorized RVDP channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 180-Day Log Archival:</strong> Maintain complete, immutable audit trails of all testing traffic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Help Developers Fix Flaws:</strong> Include exact configuration and code snippets to accelerate remediation.</span>
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
              Synthesize key White Hat principles before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Aspiring White Hat Professionals
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why PTES mandates that the final report must contain both an Executive Summary (for financial/risk decision-makers) and Detailed Technical Findings (for software engineers).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How a Red Team assessment tests not just software security, but the human detection and incident response speed of the enterprise Blue Team SOC.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future penetration testing reports, always link every identified vulnerability directly to its exact MITRE ATT&amp;CK Technique ID and CWE root-cause classification.
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
                <span>White Hats operate 100% with legal authorization.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>PTES standard has 7 distinct testing phases.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>OSSTMM measures operational security across 5 channels.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Empanelled Auditors audit Indian national banks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>OSCP is the gold-standard hands-on 24-hr practical exam.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Post-test artifact cleanup is a non-negotiable duty.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Hacker Taxonomy: White Hat Hackers FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Hacker Taxonomy: White Hat Hackers (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: White Hat hacking is one of the most intellectually rewarding and socially impactful professions in the world. As you prepare for your BCA cybersecurity careers in Kolkata, West Bengal, and across India, master the PTES and OWASP testing standards, practice responsible vulnerability disclosure, and always write actionable, high-quality reports that empower engineering teams to build resilient, trustworthy systems."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
