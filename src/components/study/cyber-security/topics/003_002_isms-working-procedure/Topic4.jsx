import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio 1: Theme Selector State
  const [selectedThemeKey, setSelectedThemeKey] = useState("technological_theme");

  // Studio 2: Attribute Filter State
  const [selectedAttributeType, setSelectedAttributeType] = useState("preventive");
  const [selectedCiaProperty, setSelectedCiaProperty] = useState("confidentiality");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_tech_controls");

  // Studio 1: 4 Control Themes Data
  const controlThemes = {
    organizational_theme: {
      key: "organizational_theme",
      name: "1. Organizational Controls (Clause A.5)",
      count: "37 Controls",
      scope: "Corporate governance, asset management, cloud security, vendor risk, and incident handling.",
      primaryRisk: "Administrative negligence, cloud misconfigurations, vendor data leaks, and slow incident escalation.",
      keyControls: [
        "A.5.1 Policies for information security",
        "A.5.7 Threat intelligence (New in 2022)",
        "A.5.9 Inventory of information assets",
        "A.5.19 Security in supplier relationships",
        "A.5.23 Security for use of cloud services (New in 2022)",
        "A.5.24 Incident management planning & CERT-In 6h SLA",
        "A.5.30 ICT readiness for business continuity (New in 2022)"
      ],
      statuteAlignment: "RBI Master Direction on Cloud & CERT-In 6-Hour Incident Escalation",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    people_theme: {
      key: "people_theme",
      name: "2. People Controls (Clause A.6)",
      count: "8 Controls",
      scope: "Pre-employment screening, employee lifecycle, remote working security, and continuous awareness.",
      primaryRisk: "Insider data theft, credential sharing, social engineering phishing, and lingering accounts post-departure.",
      keyControls: [
        "A.6.1 Screening (Pre-employment background verification)",
        "A.6.2 Terms and conditions of employment",
        "A.6.3 Information security awareness & phishing drills",
        "A.6.4 Disciplinary process",
        "A.6.5 Responsibilities after termination (JML Offboarding in < 15 mins)",
        "A.6.6 Confidentiality & Non-Disclosure Agreements (NDAs)",
        "A.6.7 Remote working security",
        "A.6.8 Information security event reporting"
      ],
      statuteAlignment: "DPDP Act 2023 Section 8(5) Mandatory Employee Training & IT Act Section 85",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    physical_theme: {
      key: "physical_theme",
      name: "3. Physical Controls (Clause A.7)",
      count: "14 Controls",
      scope: "Data center physical perimeters, clean desk policies, physical monitoring, and media sanitization.",
      primaryRisk: "Physical break-ins, shoulder surfing, workstation snooping, and data remanence on discarded disks.",
      keyControls: [
        "A.7.1 Physical security perimeters (Turnstiles / Biometrics)",
        "A.7.2 Physical entry controls",
        "A.7.4 Physical security monitoring (AI CCTV - New in 2022)",
        "A.7.7 Clear desk and clear screen policies (Win+L locking)",
        "A.7.8 Equipment siting and protection",
        "A.7.10 Storage media protection",
        "A.7.14 Secure disposal of equipment (NIST SP 800-88 shredding < 2mm)"
      ],
      statuteAlignment: "NCIIPC Protected Systems Physical Charter under IT Act Section 70",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    technological_theme: {
      key: "technological_theme",
      name: "4. Technological Controls (Clause A.8)",
      count: "34 Controls",
      scope: "Identity & access management, dynamic data masking, DLP, cryptography, logging, and secure coding.",
      primaryRisk: "SQL injection, ransomware propagation, unencrypted database leaks, and lack of audit trails.",
      keyControls: [
        "A.8.5 Secure authentication (Hardware FIDO2 MFA)",
        "A.8.9 Configuration management & CIS Benchmarks (New in 2022)",
        "A.8.10 Information deletion & Crypto-Shredding (New in 2022)",
        "A.8.11 Data masking - PostgreSQL DDM (New in 2022)",
        "A.8.12 Data leakage prevention - DLP (New in 2022)",
        "A.8.16 Monitoring activities & 180-day SIEM retention (New in 2022)",
        "A.8.17 Clock synchronization with NPL IST NTP servers",
        "A.8.24 Use of cryptography (AES-256-GCM / HSM Keys)",
        "A.8.28 Secure coding & DevSecOps CI/CD scanning (New in 2022)"
      ],
      statuteAlignment: "DPDP Act 2023 Section 8(5) (₹250 Cr Fine Shield) & CERT-In Section 70B",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeTheme = controlThemes[selectedThemeKey];

  // Studio 2: Multi-Attribute Query Engine Data
  const attributeControlsMap = {
    "preventive-confidentiality": {
      title: "Preventive Controls for Confidentiality",
      matchedControls: [
        "A.8.11 Data Masking (Obscures sensitive PAN/Aadhaar fields)",
        "A.8.12 Data Leakage Prevention (Blocks unauthorized USB/webmail exports)",
        "A.8.24 Use of Cryptography (AES-256-GCM encryption at rest and in transit)",
        "A.8.5 Secure Authentication (Hardware FIDO2 Multi-Factor Authentication)",
        "A.6.6 Confidentiality or Non-Disclosure Agreements (NDAs)"
      ],
      statutoryImpact: "Provides 100% statutory safe harbor against ₹250 Crore DPDP Act Section 33 penalties.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    "preventive-integrity": {
      title: "Preventive Controls for Data & System Integrity",
      matchedControls: [
        "A.8.9 Configuration Management (Enforces CIS Hardening baselines via Terraform)",
        "A.8.28 Secure Coding (Embeds automated SAST/DAST scanning into CI/CD pipelines)",
        "A.5.3 Segregation of Duties (Maker-Checker dual authorization for production changes)",
        "A.8.7 Protection Against Malware (Behavioral EDR and sandboxed execution)"
      ],
      statutoryImpact: "Prevents unauthorized system tampering, satisfying IT Act Section 70 Critical Infrastructure rules.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    "preventive-availability": {
      title: "Preventive Controls for System Availability",
      matchedControls: [
        "A.8.14 Redundancy of Information Processing Facilities (Multi-AZ active-active clusters)",
        "A.5.30 ICT Readiness for Business Continuity (Automated RTO < 15m and RPO = 0s failovers)",
        "A.8.6 Capacity Management (Dynamic cloud auto-scaling preventing resource exhaustion)",
        "A.7.11 Supporting Utilities (Dual redundant UPS and backup diesel power generators)"
      ],
      statutoryImpact: "Maintains 99.999% uptime for core banking switches under RBI Master Directions.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    "detective-confidentiality": {
      title: "Detective Controls for Confidentiality Breaches",
      matchedControls: [
        "A.8.16 Monitoring Activities (User and Entity Behavior Analytics detecting anomalous PII access)",
        "A.8.15 Logging (Capturing all database SELECT and decryption telemetry)",
        "A.5.7 Threat Intelligence (Monitoring dark web forums for leaked corporate credentials)"
      ],
      statutoryImpact: "Ensures breach detection within seconds, enabling mandatory CERT-In 6-hour reporting.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    "detective-integrity": {
      title: "Detective Controls for Tampering & Log Integrity",
      matchedControls: [
        "A.8.17 Clock Synchronization (NPL NTP IST time sync ensuring accurate forensic correlation)",
        "A.7.4 Physical Security Monitoring (AI-powered CCTV detecting unauthorized server room entry)",
        "A.8.8 Management of Technical Vulnerabilities (Automated daily vulnerability scanning)"
      ],
      statutoryImpact: "Generates tamper-proof digital evidence admissible under Section 65B of the Indian Evidence Act.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    "detective-availability": {
      title: "Detective Controls for Service Outages",
      matchedControls: [
        "A.8.16 Monitoring Activities (Continuous synthetic uptime health checks and latency alerts)",
        "A.5.24 Incident Management Monitoring (Automated P1 outage alert escalation to SOC)"
      ],
      statutoryImpact: "Triggers rapid automated failover within RTO limits under CEA power grid regulations.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const currentAttributeKey = `${selectedAttributeType}-${selectedCiaProperty}`;
  const matchedAttributeResult = attributeControlsMap[currentAttributeKey] || attributeControlsMap["preventive-confidentiality"];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_tech_controls",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Deploying 34 Technological Controls Across 500 Nodes",
      budget: "₹18,50,000",
      challenge: "High-Velocity Payment Switch Required Complete Annex A.8 Hardening",
      dilemma:
        "A 500-node payment switch required complete Annex A.8 technical hardening to satisfy RBI cyber directions and prevent ₹250 Crore DPDP breach liabilities.",
      resolution:
        "Mamata deployed PostgreSQL Dynamic Data Masking (A.8.11), Network DLP filters (A.8.12), and AWS KMS AES-256-GCM encryption (A.8.24), achieving 100% ISO 27001 Annex A certification.",
      metrics: {
        techControlsDeployed: "34/34 Controls Active",
        dpdpLiabilityAverted: "₹250 Crores Protected",
        mfaAdoption: "100% FIDO2 Hardware Tokens",
        compliance: "ISO 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_people_controls",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare People Controls & Data Masking",
      budget: "₹8,20,000",
      challenge: "Hospital Staff Mishandling Patient Records Due to Lack of JML Governance",
      dilemma:
        "Hospital clinical care network suffered from lingering employee credentials and unmasked radiology scans, threatening 80,000 oncology patient records.",
      resolution:
        "Mahima enforced JML access termination (A.6.5), monthly clinical awareness drills (A.6.3), and dynamic data masking on patient diagnostic PACS scans (A.8.11) under NABH and DPDP guidelines.",
      metrics: {
        recordsSecured: "80,000 Oncology Records",
        jmlOffboardingSla: "< 15 Minutes Revocation",
        phishingFailureRate: "Dropped to 1.1%",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_physical_scada",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation Physical Perimeters & Config Management",
      budget: "₹14,80,000",
      challenge: "18 Substations Requiring Physical Hardening & SCADA Baselines",
      dilemma:
        "18 high-voltage 220kV transmission substations required physical perimeter intrusion detection and automated configuration drift management under IT Act Section 70.",
      resolution:
        "Debangshu deployed 24/7 AI-monitored CCTV (A.7.4), clean desk enforcement (A.7.7), and automated configuration management (A.8.9) across all high-voltage sites under CEA guidelines.",
      metrics: {
        substationsHardened: "18 High-Voltage Sites",
        cctvAiCoverage: "100% Perimeter Monitoring",
        configDriftRemediation: "Automated Instant Drift Alert",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_annex_a_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "93 Annex A Control Navigator & Attribute Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling with the 5-Attribute Taxonomy Cross-Mapping",
      dilemma:
        "Cybersecurity students struggled to understand how the ISO 27002:2022 5-attribute taxonomy maps controls across NIST CSF, CIS Controls, and the Indian DPDP Act 2023.",
      resolution:
        "The team developed an interactive 93 Annex A Control Navigator and 5-Attribute Filter Engine in React, training 215+ BCA cyber security students on cross-mapping ISO 27001 to global standards.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        controlsCataloged: "93 Controls Tagged",
        examMastery: "100% Annex A Architecture Mastery",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 4 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Annex A Security Controls in ISO 27001
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Navigate the 93 reference controls of ISO/IEC 27001:2022 across 4 modern themes: Organizational (37), People (8), Physical (14), and Technological (34), 
            leverage the 5-attribute taxonomy for dynamic filtering, and satisfy statutory requirements under the Indian DPDP Act 2023 and CERT-In directions.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 93 Annex A Control Explorer across 4 Themes */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 1: 93 Annex A Control Explorer across 4 Themes
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a control theme to inspect its scope, total control count, primary risks mitigated, representative controls, and statutory alignment.
            </p>
          </div>

          {/* Theme Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(controlThemes).map((theme) => {
              const isSelected = selectedThemeKey === theme.key;
              return (
                <button
                  key={theme.key}
                  onClick={() => setSelectedThemeKey(theme.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{theme.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono font-bold mt-0.5">{theme.count}</div>
                </button>
              );
            })}
          </div>

          {/* Active Theme Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeTheme.badgeClass)}>
                  {activeTheme.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Total Control Count: {activeTheme.count}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Statutory Alignment</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeTheme.statuteAlignment}</span>
              </div>
            </div>

            {/* Scope & Risk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Operational Scope:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeTheme.scope}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Primary Threat Vectors Mitigated:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-sans leading-relaxed">{activeTheme.primaryRisk}</p>
              </div>
            </div>

            {/* Key Representative Controls List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block font-sans">
                Key Representative Controls in this Theme:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {activeTheme.keyControls.map((ctrl, idx) => (
                  <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold font-sans">✔</span>
                    <span className="text-gray-200 leading-relaxed font-sans">{ctrl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Attribute Control Filter & Compliance Mapping Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏷️</span> Studio 2: Multi-Attribute Control Filter &amp; Compliance Mapping Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Filter controls dynamically using the ISO/IEC 27002:2022 5-attribute taxonomy (Control Type + CIA Property) to generate targeted compliance subsets.
            </p>
          </div>

          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            {/* Filter Toggle Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Type Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-mono">
                  1. Filter by Control Type:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedAttributeType("preventive")}
                    className={clsx(
                      "p-2.5 rounded-xl font-bold transition-all duration-300 border text-center",
                      selectedAttributeType === "preventive"
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-md shadow-indigo-950/50"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                    )}
                  >
                    #Preventive Controls
                  </button>
                  <button
                    onClick={() => setSelectedAttributeType("detective")}
                    className={clsx(
                      "p-2.5 rounded-xl font-bold transition-all duration-300 border text-center",
                      selectedAttributeType === "detective"
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-md shadow-indigo-950/50"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                    )}
                  >
                    #Detective Controls
                  </button>
                </div>
              </div>

              {/* CIA Property Filter */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block font-mono">
                  2. Filter by InfoSec Property (CIA):
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedCiaProperty("confidentiality")}
                    className={clsx(
                      "p-2.5 rounded-xl font-bold transition-all duration-300 border text-center truncate",
                      selectedCiaProperty === "confidentiality"
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-md shadow-indigo-950/50"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                    )}
                  >
                    #Confidentiality
                  </button>
                  <button
                    onClick={() => setSelectedCiaProperty("integrity")}
                    className={clsx(
                      "p-2.5 rounded-xl font-bold transition-all duration-300 border text-center truncate",
                      selectedCiaProperty === "integrity"
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-md shadow-indigo-950/50"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                    )}
                  >
                    #Integrity
                  </button>
                  <button
                    onClick={() => setSelectedCiaProperty("availability")}
                    className={clsx(
                      "p-2.5 rounded-xl font-bold transition-all duration-300 border text-center truncate",
                      selectedCiaProperty === "availability"
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-md shadow-indigo-950/50"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                    )}
                  >
                    #Availability
                  </button>
                </div>
              </div>
            </div>

            {/* Filtered Result Card */}
            <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 space-y-4">
              <div className="border-b border-gray-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-bold text-white text-base font-sans flex items-center gap-2">
                  <span>🎯</span> {matchedAttributeResult.title}
                </h4>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", matchedAttributeResult.badgeClass)}>
                  Query: #{selectedAttributeType} + #{selectedCiaProperty}
                </span>
              </div>

              {/* Matched Controls Grid */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block font-sans">
                  Matched Annex A Security Controls:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                  {matchedAttributeResult.matchedControls.map((ctrl, idx) => (
                    <div key={idx} className="bg-gray-950 p-3 rounded-lg border border-gray-800 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold font-sans">➔</span>
                      <span className="text-gray-200 leading-relaxed font-sans">{ctrl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Impact */}
              <div className="p-3 bg-gray-950 rounded-lg border border-emerald-900/30 text-xs font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Statutory Compliance Value:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">{matchedAttributeResult.statutoryImpact}</p>
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
              Visualizing the 4-Thematic Annex A Control Matrix and the 5-Attribute Taxonomy Cross-Mapping Model.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 4-Thematic Control Matrix */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Thematic Annex A Control Matrix (93 Controls)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Theme 1: Organizational */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="35" y="30" width="200" height="90" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="135" y="55" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">A.5 ORGANIZATIONAL</text>
                    <text x="135" y="70" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="8 font-bold">37 Controls</text>
                    <text x="50" y="90" fill="#cbd5e1" font-family="monospace" fontSize="7">• Policies • Threat Intel (A.5.7)</text>
                    <text x="50" y="105" fill="#cbd5e1" font-family="monospace" fontSize="7">• Cloud (A.5.23) • BCP (A.5.30)</text>
                  </g>

                  {/* Theme 2: People */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="30" width="200" height="90" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="365" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9">A.6 PEOPLE</text>
                    <text x="365" y="70" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="8 font-bold">8 Controls</text>
                    <text x="280" y="90" fill="#cbd5e1" font-family="monospace" fontSize="7">• Screening (A.6.1) • Awareness</text>
                    <text x="280" y="105" fill="#cbd5e1" font-family="monospace" fontSize="7">• JML Offboarding (A.6.5)</text>
                  </g>

                  {/* Theme 3: Physical */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="35" y="145" width="200" height="90" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="135" y="170" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">A.7 PHYSICAL</text>
                    <text x="135" y="185" fill="#fcd34d" font-family="monospace" textAnchor="middle" fontSize="8 font-bold">14 Controls</text>
                    <text x="50" y="205" fill="#cbd5e1" font-family="monospace" fontSize="7">• Perimeters (A.7.1) • CCTV (A.7.4)</text>
                    <text x="50" y="220" fill="#cbd5e1" font-family="monospace" fontSize="7">• Clean Desk (A.7.7) • Shredding</text>
                  </g>

                  {/* Theme 4: Technological */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="145" width="200" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="365" y="170" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">A.8 TECHNOLOGICAL</text>
                    <text x="365" y="185" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="8 font-bold">34 Controls</text>
                    <text x="280" y="205" fill="#cbd5e1" font-family="monospace" fontSize="7">• Masking (A.8.11) • DLP (A.8.12)</text>
                    <text x="280" y="220" fill="#cbd5e1" font-family="monospace" fontSize="7">• AES-256 (A.8.24) • DevSecOps</text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    93 reference controls providing defense-in-depth across governance, humans, facilities, and code.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.1: The 4-Thematic Annex A Control Matrix (ISO/IEC 27001:2022).
              </p>
            </div>

            {/* Diagram 2: 5-Attribute Cross-Mapping Model */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The 5-Attribute Taxonomy Cross-Mapping Model
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Control */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="150" r="50" fill="#18181b" stroke="#10b981" strokeWidth="2" />
                    <text x="250" y="145" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">A.8.12 DLP</text>
                    <text x="250" y="160" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">Data Leakage</text>
                  </g>

                  {/* Attribute 1: Type (Top) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="20" width="140" height="35" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="42" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">#Control_Type: Preventive</text>
                  </g>
                  <line x1="250" y1="55" x2="250" y2="100" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Attribute 2: CIA (Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="330" y="85" width="150" height="35" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="405" y="107" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">#CIA: Confidentiality</text>
                  </g>
                  <line x1="330" y1="102" x2="295" y2="125" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Attribute 3: NIST Concept (Bottom Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="330" y="195" width="150" height="35" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="405" y="217" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">#NIST_Concept: Protect</text>
                  </g>
                  <line x1="330" y1="212" x2="295" y2="180" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Attribute 4: Operational Capability (Bottom Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="195" width="150" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="95" y="217" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8">#Op_Cap: Data_Protection</text>
                  </g>
                  <line x1="170" y1="212" x2="205" y2="180" stroke="#10b981" strokeWidth="1.5" />

                  {/* Attribute 5: Domain (Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="85" width="150" height="35" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="95" y="107" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8">#Domain: Protection</text>
                  </g>
                  <line x1="170" y1="102" x2="205" y2="125" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Bottom Text */}
                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Multidimensional metadata attributes enable automated compliance mapping across global standards.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.2: The 5-Attribute Taxonomy Cross-Mapping Model (ISO/IEC 27002:2022).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Annex A Implementation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads harden 500 payment nodes in Kolkata, govern healthcare records in Ichapur, monitor power substations in Barrackpore, and build attribute navigators in Jadavpur.
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
                  <span>⚡</span> Annex A Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Annex A Solution
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
              Guidelines for Lead Architects and CISOs deploying Annex A security controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Annex A Engineering Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Filter by 5 Attributes:</strong> Query controls by #Preventive and #Confidentiality for DPDP compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Maker-Checker (A.5.3):</strong> Separate code development from production deployment roles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate Info Deletion (A.8.10):</strong> Enforce TTL partition drops and cloud KMS Crypto-Shredding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Retain 180-Day Indian Logs (A.8.16):</strong> Archive immutable SIEM telemetry under IT Act Section 70B.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Control Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring People Controls:</strong> Neglecting the 8 human controls leaves the organization open to phishing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Default Cloud Configurations:</strong> Leaving default security groups open violates Control A.8.9.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Manual PR Approvals:</strong> Developers approving their own code violates Control A.5.3 Segregation of Duties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Clock Drift:</strong> Unsynchronized server clocks violate Control A.8.17 and CERT-In rules.</span>
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
                  <span><strong>Embed A.8.28 in CI/CD:</strong> Run automated Semgrep SAST and Snyk dependency checks on every PR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy A.8.11 Data Masking:</strong> Mask customer PAN/Aadhaar numbers in PostgreSQL for support staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate JML Offboarding (A.6.5):</strong> Revoke departing employee access in &lt; 15 minutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Clean Desk (A.7.7):</strong> Require Win+L workstation locking and lock paper files in drawers.</span>
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
              Synthesize the 93 Annex A controls and 5-attribute taxonomy before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Annex A Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Annex A controls operate as a defense-in-depth matrix: If an enterprise implements all 34 technological controls (encryption, firewalls, DLP) but neglects the 8 people controls (screening, JML termination, phishing awareness), an attacker can simply trick an employee into revealing master credentials, completely bypassing the technological investments.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the 5-attribute taxonomy transforms control management: Rather than manually cross-referencing controls across ISO 27001, NIST CSF, and the Indian DPDP Act 2023, you can query tags such as `#Preventive` + `#Confidentiality` + `#Information_protection` to instantly extract the exact controls (A.8.11, A.8.12, A.8.24) needed to build statutory privacy defenses.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your DevSecOps pipelines, automate Control A.8.28 (Secure Coding) and Control A.8.9 (Configuration Management) through pre-commit linters and CI/CD security gates to eliminate vulnerabilities before software ever reaches production servers.
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
                <span>Annex A has 93 controls in 4 Themes: Org (37), People (8), Phys (14), Tech (34).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>5 Attributes: Control Type, CIA Property, NIST Concept, Op Capability, Domain.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>A.8.10 (Deletion), A.8.11 (Masking), and A.8.12 (DLP) fulfill DPDP Act Section 8.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>A.8.15 (Logs), A.8.16 (Monitoring), and A.8.17 (NTP Sync) fulfill CERT-In Sec 70B.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>A.8.28 embeds automated SAST/DAST secure coding into CI/CD pipelines.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>A.5.3 enforces Segregation of Duties and the Maker-Checker principle.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Annex A Security Controls in ISO 27001 FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Annex A Control Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Annex A Security Controls in ISO 27001 (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Annex A of ISO/IEC 27001:2022 is your universal defensive toolkit. Master the 4 themes: establish governance in Organizational Controls (A.5), build a resilient Human Firewall in People Controls (A.6), protect facilities in Physical Controls (A.7), and engineer robust cryptography, data masking, DLP, and secure coding in Technological Controls (A.8). Use the 5-attribute taxonomy to dynamically map controls to the Indian DPDP Act 2023 and CERT-In directions, guaranteeing both global audit excellence and unshakeable statutory safe harbor!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
