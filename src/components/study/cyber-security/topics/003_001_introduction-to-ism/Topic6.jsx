import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: Regulatory Framework State
  const [selectedFrameworkKey, setSelectedFrameworkKey] = useState("dpdp_act");

  // Studio 2: Compliance Gap Checklist State
  const [checklist, setChecklist] = useState({
    dpdpSafeguards: true,
    certIn6Hour: true,
    independentCiso: true,
    isoSoa: false,
    ntpLogRetention: true
  });

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_multi_compliance");

  // Studio 1: Regulatory Frameworks Data
  const frameworks = {
    dpdp_act: {
      key: "dpdp_act",
      name: "1. Digital Personal Data Protection (DPDP) Act 2023",
      regulator: "Data Protection Board of India (DPB)",
      scope: "All commercial entities processing digital personal data of Indian citizens",
      reportingSla: "Immediate breach notification to Data Protection Board & affected citizens (Section 8(6))",
      maxPenalty: "UP TO ₹250 CRORES per breach violation (Section 33 Schedule 1)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      mandates: [
        { label: "Section 8(5)", desc: "Implement reasonable technical & organizational measures (AES-256 encryption, MFA, RBAC)." },
        { label: "Section 8(7)", desc: "Enforce automated storage limitation and data erasure once purpose is served." },
        { label: "Section 10", desc: "Mandatory appointment of a resident Data Protection Officer (DPO) reporting to the Board." },
        { label: "Section 6", desc: "Verifiable, granular consent governance and clear withdrawal mechanisms." }
      ]
    },
    cert_in: {
      key: "cert_in",
      name: "2. CERT-In Directions 2022 (IT Act Section 70B)",
      regulator: "Indian Computer Emergency Response Team (CERT-In / MeitY)",
      scope: "All service providers, intermediaries, data centers, and corporate entities in India",
      reportingSla: "Mandatory reporting within 6 HOURS of noticing cybersecurity incidents",
      maxPenalty: "Imprisonment up to 1 YEAR or statutory financial penalties (Section 70B(7))",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      mandates: [
        { label: "6-Hour Reporting", desc: "Report 20 categories of cyber incidents to incident@cert-in.org.in within 6 hours." },
        { label: "180-Day Log Storage", desc: "Mandatory rolling retention of system, firewall, and SIEM logs within Indian jurisdiction." },
        { label: "NTP Synchronization", desc: "Mandatory time synchronization with National Physical Laboratory (NPL) or NIC NTP servers." },
        { label: "KYC for VPN/Cloud", desc: "Maintain verified customer registration records for 5 years for cloud and VPN providers." }
      ]
    },
    rbi_framework: {
      key: "rbi_framework",
      name: "3. RBI Master Direction on Cyber Security",
      regulator: "Reserve Bank of India (Cyber Security and IT Risk Cell)",
      scope: "All commercial banks, urban cooperative banks, payment gateways, and NBFCs",
      reportingSla: "Mandatory incident escalation within 2 to 6 hours to RBI Cyber Security Cell",
      maxPenalty: "Monetary fines, operational business restrictions & banking license cancellation",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      mandates: [
        { label: "Independent CISO", desc: "Dedicated CISO reporting directly to the Board Risk Committee / Executive Director." },
        { label: "24/7/365 SOC", desc: "Continuous Security Operations Center with automated SIEM telemetry and threat hunting." },
        { label: "FIPS 140-3 HSMs", desc: "Mandatory end-to-end encryption of all customer PINs and payment tokens in hardware." },
        { label: "Vendor Risk (TPRM)", desc: "Strict third-party security audits and contractual SLAs for all FinTech APIs." }
      ]
    },
    nciipc_cii: {
      key: "nciipc_cii",
      name: "4. NCIIPC Protected Systems (IT Act Section 70)",
      regulator: "National Critical Information Infrastructure Protection Centre (NCIIPC)",
      scope: "Critical infrastructure in Power, Telecom, Banking, Defense, Transport, and Energy",
      reportingSla: "Continuous telemetry sharing and instant incident notification to NCIIPC",
      maxPenalty: "Rigorous IMPRISONMENT UP TO 10 YEARS for unauthorized access or tampering",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      mandates: [
        { label: "Section 70(1)", desc: "Designation of SCADA networks and core switches as Protected Systems." },
        { label: "Air-Gapped Isolation", desc: "Total isolation of operational technology (OT) from public internet networks." },
        { label: "Dual-Custody IAM", desc: "Mandatory hardware cryptographic tokens and dual-authorization for grid switching." },
        { label: "Zero Foreign Firmware", desc: "Prohibition of unvetted foreign firmware and mandatory supply chain integrity audits." }
      ]
    },
    iso_27001_gdpr: {
      key: "iso_27001_gdpr",
      name: "5. ISO/IEC 27001:2022 & GDPR (International)",
      regulator: "Accredited Certification Bodies / EU Data Protection Authorities",
      scope: "Global enterprises, export-oriented IT service firms, and B2B SaaS vendors",
      reportingSla: "GDPR Article 33: 72-Hour breach notification to supervisory authorities",
      maxPenalty: "Loss of ISO 27001 certification + GDPR fines up to €20M / 4% Global Annual Turnover",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      mandates: [
        { label: "Statement of Applicability", desc: "Mandatory documentation and audit of 93 Annex A security controls." },
        { label: "GDPR Article 32", desc: "Mandatory pseudonymization, AES-256 encryption, and regular vulnerability testing." },
        { label: "Safe Harbor Defense", desc: "ISO 27001 certification proves 'Reasonable Security Practices' under IT Act Section 43A." },
        { label: "Continuous CAPA", desc: "Corrective and Preventive Action plans to resolve all audit non-conformities." }
      ]
    }
  };

  const activeFramework = frameworks[selectedFrameworkKey];

  // Studio 2: Checklist & Gap Calculation
  const complianceScore = useMemo(() => {
    const totalItems = Object.keys(checklist).length;
    const checkedCount = Object.values(checklist).filter(Boolean).length;
    const percentage = Math.round((checkedCount / totalItems) * 100);

    let exposureRupees = "₹0 (Zero Residual Liability)";
    let verdict = "100% STATUTORY COMPLIANT";
    let badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";

    if (percentage < 100) {
      const penaltyCrores = (100 - percentage) * 2.5;
      exposureRupees = `Up to ₹${penaltyCrores.toFixed(1)} Crores Statutory Fine Exposure`;
      if (percentage >= 80) {
        verdict = "MODERATE COMPLIANCE GAP";
        badgeClass = "bg-amber-950 text-amber-300 border-amber-800";
      } else {
        verdict = "CRITICAL NON-COMPLIANCE (High DPDP & CERT-In Penalty Risk)";
        badgeClass = "bg-rose-950 text-rose-300 border-rose-800";
      }
    }

    return { percentage, checkedCount, totalItems, exposureRupees, verdict, badgeClass };
  }, [checklist]);

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_multi_compliance",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Multi-Regulatory Payment Gateway Compliance",
      budget: "₹18,50,00,000",
      challenge: "Simultaneous Compliance with DPDP, RBI Master Directions & PCI-DSS",
      dilemma:
        "A 500-node payment processing architecture needed simultaneous compliance with DPDP Act Section 33, RBI Master Directions, and PCI-DSS v4.0 with zero architectural downtime.",
      resolution:
        "Mamata built a unified compliance mapping engine, deploying AES-256-GCM tokenization, independent CISO reporting, and automated 6-hour CERT-In escalation playbooks.",
      metrics: {
        frameworksUnified: "DPDP + RBI + PCI-DSS + ISO 27001",
        certInEscalation: "Automated Sub-6-Hour SLA",
        dpdpFinesAvoided: "₹250 Crores Liability Protected",
        compliance: "RBI Master Direction & PCI-DSS v4.0"
      }
    },
    {
      id: "ichapur_healthcare_nabh_dpdp",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare NABH & DPDP Privacy Audit",
      budget: "₹8,20,000",
      challenge: "Hospital Imaging PACS Storing Unconsented Patient Diagnostic Scans",
      dilemma:
        "Hospital clinical imaging servers risked ₹250 Crore DPDP fines due to lack of granular patient consent tracking across 80,000 oncology radiology scans.",
      resolution:
        "Mahima authored healthcare data consent governance under DPDP Section 8 and NABH guidelines, deploying automated consent verification before opening patient DICOM scans.",
      metrics: {
        recordsGoverned: "80,000 Oncology Records",
        consentAutomated: "100% Verifiable Consent Traced",
        auditReadiness: "100% NABH & DPDP Certified",
        compliance: "NABH Hospital Guidelines & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_nciipc_cii",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation NCIIPC Protected System Compliance",
      budget: "₹12,80,000",
      challenge: "Ensuring 18 High-Voltage Substations Complied with IT Act Section 70",
      dilemma:
        "Ensuring 18 high-voltage 220kV transmission substations complied with IT Act Section 70 protected system rules, avoiding 10-year imprisonment liabilities for grid tampering.",
      resolution:
        "Debangshu designated SCADA systems as Protected Systems under NCIIPC guidelines, enforcing air-gapped jump hosts, dual-custody hardware keys, and 180-day audit log retention in India.",
      metrics: {
        substationsProtected: "18 High-Voltage Sites",
        nciipcControls: "100% Mandated Controls Active",
        prisonLiabilityAverted: "10-Year Criminal Risk Immunized",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_cyber_law_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Indian Cyber Law Simulator & Penalty Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Unaware of Statutory Penalties under DPDP Section 33",
      dilemma:
        "Cybersecurity students lacked understanding of statutory penalties under DPDP Section 33, CERT-In 6-hour reporting rules, and Section 65B court evidence certificates.",
      resolution:
        "The team developed an interactive Indian Cyber Law & Regulatory Compliance simulator, training 190+ BCA students on conducting gap analyses and authoring Statement of Applicability matrices.",
      metrics: {
        studentsTrained: "190+ Cyber BCA Students",
        lawsCovered: "DPDP, IT Act, CERT-In, RBI, GDPR",
        examMastery: "100% Statutory Law Proficiency",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 6 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Legal, Regulatory, and Compliance Drivers in ISM
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Navigate the high-stakes statutory compliance landscape: master the Indian DPDP Act 2023 (penalties up to ₹250 Crores), 
            CERT-In 6-hour incident reporting rules, IT Act Section 70 Critical Information Infrastructure, RBI directions, and ISO 27001 Statement of Applicability.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Regulatory Framework Matrix & Statutory Fine Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 1: Regulatory Framework Matrix &amp; Statutory Fine Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a statutory regulation to inspect its governing authority, mandatory technical safeguards, reporting SLA, and maximum statutory penalties.
            </p>
          </div>

          {/* Framework Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.values(frameworks).map((fw) => {
              const isSelected = selectedFrameworkKey === fw.key;
              return (
                <button
                  key={fw.key}
                  onClick={() => setSelectedFrameworkKey(fw.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{fw.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{fw.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Framework Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeFramework.badgeClass)}>
                  Statute: {activeFramework.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Governing Regulator: {activeFramework.regulator}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Reporting Window SLA</span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-400">{activeFramework.reportingSla}</span>
              </div>
            </div>

            {/* Mandatory Clauses Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Mandatory Technical &amp; Operational Clauses:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {activeFramework.mandates.map((m, idx) => (
                  <div key={idx} className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase block font-sans">{m.label}</span>
                    <p className="text-gray-300 text-[11px] font-sans leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maximum Penalties & Scope */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Maximum Statutory Penalties:</span>
                <p className="text-rose-300 text-xs sm:text-sm font-extrabold leading-relaxed">{activeFramework.maxPenalty}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Regulatory Application Scope:</span>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{activeFramework.scope}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Compliance Gap Analysis & Statutory Risk Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Studio 2: Compliance Gap Analysis &amp; Statutory Risk Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle enterprise compliance checkpoints to calculate statutory audit readiness, evaluate residual legal fine exposure, and inspect remediation advice.
            </p>
          </div>

          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", complianceScore.badgeClass)}>
                  Status: {complianceScore.verdict}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Audit Readiness: {complianceScore.percentage}% ({complianceScore.checkedCount} / {complianceScore.totalItems} Active Controls)
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Residual Legal Fine Exposure</span>
                <span className="text-sm font-extrabold text-rose-400">{complianceScore.exposureRupees}</span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 text-xs">
              <label
                onClick={() => toggleCheck("dpdpSafeguards")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              &gt;
                <input
                  type="checkbox"
                  checked={checklist.dpdpSafeguards}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">1. DPDP Act Section 8(5) Technical &amp; Organizational Safeguards:</span>
                  <p className="text-[11px] text-gray-400">Enforces AES-256 database encryption at rest, TLS 1.3 in transit, MFA, and automated storage purges.</p>
                </div>
              </label>

              <label
                onClick={() => toggleCheck("certIn6Hour")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              &gt;
                <input
                  type="checkbox"
                  checked={checklist.certIn6Hour}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">2. CERT-In 6-Hour Automated Incident Escalation Playbook:</span>
                  <p className="text-[11px] text-gray-400">SIEM triggers automated alert templates to incident@cert-in.org.in within the mandatory 6-hour window.</p>
                </div>
              </label>

              <label
                onClick={() => toggleCheck("independentCiso")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              &gt;
                <input
                  type="checkbox"
                  checked={checklist.independentCiso}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">3. Independent CISO Reporting Directly to Board Risk Committee:</span>
                  <p className="text-[11px] text-gray-400">Satisfies RBI directions and IT Act Section 85 executive due diligence defense.</p>
                </div>
              </label>

              <label
                onClick={() => toggleCheck("isoSoa")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              &gt;
                <input
                  type="checkbox"
                  checked={checklist.isoSoa}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">4. ISO/IEC 27001 Statement of Applicability (SoA) Documented:</span>
                  <p className="text-[11px] text-gray-400">All 93 Annex A controls formally audited, mapped, and justified (Safe harbor under IT Act Section 43A).</p>
                </div>
              </label>

              <label
                onClick={() => toggleCheck("ntpLogRetention")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              &gt;
                <input
                  type="checkbox"
                  checked={checklist.ntpLogRetention}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">5. 180-Day System Audit Log Retention &amp; IST NTP Clock Sync:</span>
                  <p className="text-[11px] text-gray-400">Maintains tamper-proof SIEM logs with Section 65B hash certificates synchronized with Indian Standard Time.</p>
                </div>
              </label>
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
              Visualizing the Indian Cyber Law &amp; Regulatory Hierarchy and the 5-Stage Compliance Management &amp; Audit Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Regulatory Hierarchy */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Indian Cyber Law &amp; Regulatory Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: Parliament */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="20" width="400" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">PARLIAMENT OF INDIA (STATUTORY LEGISLATION)</text>
                    <text x="250" y="54" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7">IT Act 2000 (Amended 2008) • DPDP Act 2023</text>
                  </g>

                  {/* Connectors */}
                  <line x1="250" y1="60" x2="100" y2="100" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="250" y1="60" x2="250" y2="100" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="250" y1="60" x2="400" y2="100" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Node 1: DPB India */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="100" width="140" height="60" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="90" y="122" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8.5">DPB INDIA</text>
                    <text x="90" y="137" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">DPDP Act 2023</text>
                    <text x="90" y="150" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="7">₹250 Cr Penalties</text>
                  </g>

                  {/* Node 2: CERT-In */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="100" width="140" height="60" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="250" y="122" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">CERT-In (MeitY)</text>
                    <text x="250" y="137" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">IT Act Sec 70B</text>
                    <text x="250" y="150" fill="#fbbf24" font-family="monospace" textAnchor="middle" fontSize="7">6-Hour SLA Reporting</text>
                  </g>

                  {/* Node 3: NCIIPC */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="340" y="100" width="140" height="60" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="410" y="122" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">NCIIPC (CII)</text>
                    <text x="410" y="137" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">IT Act Sec 70 / 70A</text>
                    <text x="410" y="150" fill="#c084fc" font-family="monospace" textAnchor="middle" fontSize="7">10-Year Imprisonment</text>
                  </g>

                  {/* Sectoral Regulators Tier */}
                  <line x1="250" y1="160" x2="250" y2="200" stroke="#6366f1" strokeWidth="1.5" />

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="200" width="400" height="55" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="222" fill="#cffafe" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      SECTORAL REGULATORS (RBI, SEBI, IRDAI, CEA)
                    </text>
                    <text x="250" y="238" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Independent CISO • 24/7 SOC • Banking &amp; Power Grid Mandates
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Unified statutory ecosystem governing enterprise cybersecurity and data protection in India.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: The Indian Cyber Law and Regulatory Architecture hierarchy.
              </p>
            </div>

            {/* Diagram 2: Compliance Management Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The 5-Stage Compliance Management Lifecycle
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Gap Analysis */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="40" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. GAP ANALYSIS</text>
                    <text x="87" y="54" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Audit Current Posture</text>
                  </g>

                  <line x1="155" y1="42" x2="185" y2="42" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan39)" />

                  {/* Step 2: Mapping Matrix */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="40" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. MAP (SoA)</text>
                    <text x="250" y="54" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">93 Annex A Controls</text>
                  </g>

                  <line x1="315" y1="42" x2="345" y2="42" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo39)" />

                  {/* Step 3: Execution */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="20" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="412" y="40" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. EXECUTE</text>
                    <text x="412" y="54" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Deploy AES-256/MFA</text>
                  </g>

                  <line x1="412" y1="65" x2="412" y2="105" stroke="#10b981" strokeWidth="1.5" />

                  {/* Step 4: Section 65B Evidence */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. SECTION 65B EVIDENCE</text>
                    <text x="372" y="139" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">SHA-256 Hashes &amp; Court Logs</text>
                  </g>

                  <line x1="265" y1="127" x2="235" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold39)" />

                  {/* Step 5: CAPA Remediation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="127" y="125" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. CAPA REMEDIATION</text>
                    <text x="127" y="139" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">5-Whys Root Cause Fixes</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% STATUTORY COMPLIANCE &amp; CORPORATE SAFE HARBOR
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Protects enterprise from ₹250 Cr DPDP fines and immunizes Directors under IT Act Section 85.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous compliance management turns legal mandates into sustained competitive advantage.
                  </text>

                  <defs>
                    <marker id="arrowCyan39" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo39" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGold39" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: The 5-Stage continuous compliance management and CAPA audit lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Regulatory Compliance Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads unify payment compliance in Kolkata, conduct hospital privacy audits in Ichapur, enforce NCIIPC protections in Barrackpore, and simulate cyber law penalties in Jadavpur.
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
                  <span>⚡</span> Regulatory Penalty Risk ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Statutory Solution
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
              Guidelines for compliance leads and CISOs maintaining statutory safe harbor defenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Regulatory Compliance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate CERT-In 6-Hour SLA:</strong> Build pre-formatted incident reporting templates in SIEM/SOAR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain Active SoA (ISO 27001):</strong> Review all 93 Annex A control justifications before every audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Generate Section 65B Evidence:</strong> Cryptographically hash audit logs with SHA-256 for court readiness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Section 8(7):</strong> Automatically purge customer data after statutory retention expires.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Regulatory Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Treating Compliance as Annual Paperwork:</strong> Compliance is a continuous 24/7 operational discipline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Storing CVVs Post-Authorization:</strong> Immediate violation of PCI-DSS Requirement 3 incurring heavy fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring NTP Clock Sync:</strong> Missing Indian Standard Time synchronization violates CERT-In rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting Director Liability:</strong> IT Act Section 85 pierces corporate veil for cyber negligence.</span>
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
                  <span><strong>Deploy CAPA Remediation:</strong> Execute 5-Whys root cause fixes for every internal audit finding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 180-Day Indian Log Storage:</strong> Archive encrypted SIEM telemetry within Indian territory.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Isolate Protected SCADA Systems:</strong> Deploy air-gapped jump hosts to comply with NCIIPC rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Quarterly Third-Party Audits:</strong> Engage accredited auditors to validate ISO 27001 posture.</span>
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
              Synthesize key legal and regulatory requirements before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Compliance Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why cybersecurity compliance is a board-level fiduciary duty: Under Section 33 of the Indian DPDP Act 2023, failing to implement reasonable security safeguards attracts statutory fines of up to ₹250 Crores, while Section 85 of the IT Act holds Directors personally liable in court unless they prove active due diligence.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The difference between CERT-In reporting and DPDP breach notification: CERT-In (IT Act Section 70B) requires technical incident reporting within 6 hours to incident@cert-in.org.in for national security coordination; DPDP Act Section 8(6) requires notifying the Data Protection Board and affected citizens about personal data privacy violations.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise architecture designs, maintain a formal Statement of Applicability (SoA) under ISO/IEC 27001:2022 to establish a definitive safe harbor defense under Section 43A of the Indian Information Technology Act 2000.
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
                <span>DPDP Act Section 33 penalizes security failures up to ₹250 Crores.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 70B mandates reporting incidents to CERT-In within 6 hours.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 70 protects Critical Information Infrastructure (10-yr prison).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 43A recognizes ISO 27001 as "Reasonable Security Practices".</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 85 holds Directors personally liable unless due diligence is proven.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 65B certificates are mandatory for court electronic evidence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Legal, Regulatory, and Compliance Drivers in ISM FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Indian Cyber Law Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Legal, Regulatory, and Compliance Drivers in ISM (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Compliance is the ultimate legal shield for an enterprise and its leadership. Always design your Information Security Management System to satisfy both technical standards and statutory legal mandates: enforce reasonable safeguards under Section 8 of the Indian DPDP Act 2023 to prevent ₹250 Crore fines, automate CERT-In 6-hour reporting under IT Act Section 70B, maintain an audited ISO/IEC 27001 Statement of Applicability (SoA), and preserve electronic evidence admissibility with Section 65B certificates!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
