import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: Active Compliance Framework Key
  const [selectedFrameworkKey, setSelectedFrameworkKey] = useState("fw_dpdp_india");

  // Studio 2: Active Unified Control Mapping Key
  const [selectedUnifiedControlKey, setSelectedUnifiedControlKey] = useState("uc_encryption_at_rest");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_multi_compliance");

  // Studio 1: 5 Compliance Frameworks Data
  const complianceFrameworks = {
    fw_dpdp_india: {
      key: "fw_dpdp_india",
      name: "1. India DPDP Act 2023",
      authority: "Data Protection Board of India (DPBI) & MeitY",
      scope: "Personal data of Indian citizens (Data Principals) processed by digital Data Fiduciaries.",
      coreMandates: "Section 8 Reasonable Security Safeguards, Section 10 Independent Data Audits for SDFs, India-based DPO appointment, and prompt breach notification.",
      auditType: "Periodic Data Audits & Data Protection Impact Assessments (DPIAs) by independent Data Auditors.",
      penalty: "Up to ₹250 CRORE per violation (Section 33 Schedule for security safeguard failures).",
      keySafeguard: "End-to-end cryptographic encryption, WORM audit trails, role-based access control, and consent manager integration.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    fw_gdpr_eu: {
      key: "fw_gdpr_eu",
      name: "2. EU GDPR",
      authority: "European Data Protection Board (EDPB) & National DPAs",
      scope: "Personal data of European Union residents processed by global Data Controllers and Processors.",
      coreMandates: "Privacy by Design & Default (Art 25), 72-Hour Breach Notification (Art 33), Data Protection Officers (Art 37), and Cross-border Standard Contractual Clauses (SCCs).",
      auditType: "Independent GDPR Privacy & Information Security Assurance Audits and Supervisory Inquiries.",
      penalty: "Up to €20 MILLION or 4% of total worldwide annual turnover (whichever is higher).",
      keySafeguard: "Pseudonymisation, AES-256 encryption, data minimization, and automated user data portability endpoints.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    fw_hipaa_us: {
      key: "fw_hipaa_us",
      name: "3. US HIPAA Security Rule",
      authority: "US Department of Health and Human Services (HHS) Office for Civil Rights (OCR)",
      scope: "Electronic Protected Health Information (ePHI) created, received, or transmitted by Covered Entities & Business Associates.",
      coreMandates: "Administrative Safeguards (§164.308), Physical Safeguards (§164.310), Technical Safeguards (§164.312), and Business Associate Agreements (BAAs).",
      auditType: "Periodic HIPAA Compliance Risk Assessments & Federal HHS OCR Compliance Audits.",
      penalty: "Tiered civil monetary penalties up to $2,000,000+ per year and potential criminal liability for willful neglect.",
      keySafeguard: "AES-256 encryption for PACS DICOM images, emergency access controls, unique user IDs, and immutable audit logs.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    fw_pci_dss: {
      key: "fw_pci_dss",
      name: "4. PCI-DSS v4.0",
      authority: "PCI Security Standards Council (PCI SSC) & Card Brands (Visa/Mastercard/RuPay)",
      scope: "Cardholder Data Environment (CDE) storing, processing, or transmitting PAN, CVV, and sensitive payment card authentication data.",
      coreMandates: "12 Principal Requirements: Network segmentation, Point-to-Point Encryption (P2PE), multi-factor authentication, and quarterly ASV scans.",
      auditType: "Annual Report on Compliance (ROC) conducted by Qualified Security Assessors (QSAs) or SAQ D.",
      penalty: "Fines up to $100,000/month by card networks, termination of merchant processing privileges, and mandatory forensic audits.",
      keySafeguard: "Hardware HSM tokenization, TLS 1.3 in transit, strict CDE firewall isolation, and 90-day access re-certifications.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    fw_soc2_type2: {
      key: "fw_soc2_type2",
      name: "5. AICPA SOC 2 Type 2",
      authority: "American Institute of Certified Public Accountants (AICPA)",
      scope: "Cloud service providers, SaaS platforms, and enterprise data centers holding customer data.",
      coreMandates: "5 Trust Services Criteria: Security (Common Criteria - mandatory), Availability, Confidentiality, Processing Integrity, and Privacy.",
      auditType: "Independent CPA attestation report testing operating effectiveness of controls continuously across 6 to 12 months.",
      penalty: "Loss of enterprise sales contracts, failed vendor security due diligence, and customer breach of contract litigation.",
      keySafeguard: "Automated CI/CD security linters, quarterly IAM user access reviews, continuous SIEM telemetry, and tested DR failover.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeFramework = complianceFrameworks[selectedFrameworkKey];

  // Studio 2: Unified Control Harmonization Data
  const unifiedControls = {
    uc_encryption_at_rest: {
      key: "uc_encryption_at_rest",
      name: "Unified Control 1: Cryptographic Encryption at Rest (AES-256 / KMS)",
      description: "Enforcing AWS KMS managed AES-256 encryption across all databases, S3 buckets, and backup volumes with automated annual key rotation.",
      crossWalk: {
        dpdp: "DPDP Act 2023 Section 8(5) (Reasonable Security Safeguards protecting Data Principals)",
        gdpr: "GDPR Article 32(1)(a) (Security of Processing via Pseudonymisation and Encryption)",
        hipaa: "HIPAA Security Rule 45 CFR §164.312(a)(2)(iv) (Technical Safeguard: Encryption at Rest)",
        pci: "PCI-DSS v4.0 Requirement 3.4 & 3.5 (Protect Cardholder Data & Secure Cryptographic Keys)",
        soc2: "SOC 2 Type 2 TSC CC6.6 & CC6.7 (Logical Boundary Protection & Cryptography Controls)"
      },
      isoMapping: "ISO/IEC 27001:2022 Control A.8.24 (Use of Cryptography) & Control A.8.20"
    },
    uc_access_reviews_mfa: {
      key: "uc_access_reviews_mfa",
      name: "Unified Control 2: Quarterly Access Reviews (UAR) & Phishing-Resistant MFA",
      description: "Mandating hardware YubiKey MFA for all employees, terminating dormant accounts > 90 days, and executing quarterly manager access re-certification.",
      crossWalk: {
        dpdp: "DPDP Act 2023 Section 8(5) (Role-Based Access Control on Citizen Personal Data)",
        gdpr: "GDPR Article 25 & 32 (Access Control & Confidentiality by Design)",
        hipaa: "HIPAA Security Rule 45 CFR §164.312(a)(1) (Unique User Identification & Emergency Access)",
        pci: "PCI-DSS v4.0 Requirement 7.2 & 8.3 (Limit Access by Need-to-Know & Multi-Factor Authentication)",
        soc2: "SOC 2 Type 2 TSC CC6.1 & CC6.3 (Logical Access Controls & Role Access Revocations)"
      },
      isoMapping: "ISO/IEC 27001:2022 Control A.5.15 (Access Control) & Control A.5.18 (Access Rights)"
    },
    uc_worm_log_telemetry: {
      key: "uc_worm_log_telemetry",
      name: "Unified Control 3: Centralized 180-Day WORM Log Telemetry & NTP Time-Sync",
      description: "Streaming all authentication, admin escalation, and firewall logs to S3 Object Lock in Compliance Mode with Stratum-1 NTP synchronization.",
      crossWalk: {
        dpdp: "DPDP Act 2023 Section 8(6) & CERT-In Directions 2022 (180-Day Log Mandate & Incident Reporting)",
        gdpr: "GDPR Article 33 & 34 (Breach Documentation & 72-Hour Notification Readiness)",
        hipaa: "HIPAA Security Rule 45 CFR §164.312(b) (Audit Controls & Information System Activity Review)",
        pci: "PCI-DSS v4.0 Requirement 10.2 & 10.3 (Log All Access to System Components & Secure Audit Trails)",
        soc2: "SOC 2 Type 2 TSC CC7.2 & CC7.3 (Continuous Infrastructure Monitoring & Incident Telemetry)"
      },
      isoMapping: "ISO/IEC 27001:2022 Control A.8.15 (Logging) & Control A.8.16 (Monitoring Activities)"
    }
  };

  const activeUnifiedControl = unifiedControls[selectedUnifiedControlKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_multi_compliance",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Multi-Framework Harmonization Across 500 Microservices",
      budget: "₹18,50,000",
      challenge: "PayShield India Required Simultaneous PCI-DSS v4.0, SOC 2 Type 2, and DPDP Compliance",
      dilemma:
        "500 payment microservices faced overlapping audits from global card brands, US enterprise SaaS clients, and the Data Protection Board of India, risking audit fatigue and contradictory control implementations.",
      resolution:
        "Mamata built a Unified Compliance Framework mapping 500 payment microservices, enforcing AWS KMS encryption and quarterly access reviews, passing all 3 certification audits in a single 90-day cycle.",
      metrics: {
        frameworksHarmonized: "DPDP + PCI-DSS + SOC 2",
        microservicesGoverned: "500 Payment Pods",
        auditCycleDuration: "90-Day Single Cycle",
        compliance: "ISO 27001, PCI v4.0, SOC 2 Type 2"
      }
    },
    {
      id: "ichapur_dual_hipaa_dpdp",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Dual HIPAA Security Rule & DPDP Data Audit",
      budget: "₹8,20,000",
      challenge: "80,000 Biopsy Records Processed for US Clinical Trials Required HIPAA BAA and DPDP Audits",
      dilemma:
        "Clinical trials network held 80,000 oncology patient biopsy scans subject to US HIPAA cross-border data transfer rules and mandatory independent Data Audits under Indian DPDP Act Section 10.",
      resolution:
        "Mahima implemented AES-256 encrypted DICOM storage, automated WORM audit trails, and appointed an India DPO, shielding the clinical network from statutory ₹250 Cr fines and passing US HIPAA inspections.",
      metrics: {
        biopsyRecordsShielded: "80,000 Patient Scans",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        hipaaBaaCompliance: "100% Validated BAAs",
        compliance: "DPDP Act 2023 & HIPAA Security Rule"
      }
    },
    {
      id: "barrackpore_scada_soc2_nciipc",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA OT SOC 2 Availability & NCIIPC Audit",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced NCIIPC Audit While Seeking SOC 2 Type 2 Availability Certification",
      dilemma:
        "Power grid required formal SOC 2 Type 2 Availability Trust Criteria certification to sign industrial energy distribution contracts while complying with statutory NCIIPC Section 70 Protected System rules.",
      resolution:
        "Debangshu hardened SCADA networks with hardware data diodes, documented 99.999% grid uptime telemetry, and achieved zero non-conformities across both national critical infrastructure and SOC 2 audits.",
      metrics: {
        substationsAudited: "18 High-Voltage Sites",
        gridAvailabilityUptime: "99.999% Uptime Telemetry",
        soc2TrustCriteria: "Security & Availability Passed",
        compliance: "IT Act Section 70 & SOC 2 Type 2"
      }
    },
    {
      id: "jadavpur_compliance_mapping_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Multi-Framework Compliance Mapping Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Compare GDPR vs DPDP Penalties and Map PCI-DSS to SOC 2",
      dilemma:
        "Cybersecurity students struggled to understand cross-framework control mapping, confusing GDPR 72-hour notifications with CERT-In 6-hour rules and SOC 2 Type 1 with Type 2 scopes.",
      resolution:
        "The team developed an interactive Multi-Framework Compliance Harmonizer & Cross-Walk Studio in React, training 215+ BCA cyber security students on cross-framework compliance mapping and audit preparation.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        frameworksCrossWalked: "5 Global Standards",
        examMastery: "100% Compliance Harmonization",
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
            Course Module 3: Information Security Management • Module 003_004 • Topic 6 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Compliance Frameworks: GDPR, HIPAA, PCI-DSS, SOC 2, and India DPDP Act
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Navigate the global and domestic cybersecurity regulatory spectrum: compare India DPDP Act 2023, EU GDPR, US HIPAA, PCI-DSS v4.0, and AICPA SOC 2 Type 2, 
            and implement the "Map Once, Comply Many" Unified Compliance Framework (UCF) to streamline enterprise auditing.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 5-Framework Multi-Compliance Matrix & Cross-Walk */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🌐</span> Studio 1: 5-Framework Multi-Compliance Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a regulatory framework to inspect its governing authority, governance scope, core statutory mandates, audit type, maximum statutory penalties, and encryption/access safeguards.
            </p>
          </div>

          {/* Framework Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.values(complianceFrameworks).map((fw) => {
              const isSelected = selectedFrameworkKey === fw.key;
              return (
                <button
                  key={fw.key}
                  onClick={() => setSelectedFrameworkKey(fw.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs font-mono",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{fw.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{fw.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Framework Details Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeFramework.badgeClass)}>
                  {activeFramework.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">
                  Authority: {activeFramework.authority}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400 text-left sm:text-right">
                Audit Model: <span className="text-emerald-400 font-bold">{activeFramework.auditType.split(" (")[0]}</span>
              </div>
            </div>

            {/* Scope & Core Mandates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Primary Governance Scope:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeFramework.scope}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Core Statutory Mandates:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed font-sans">{activeFramework.coreMandates}</p>
              </div>
            </div>

            {/* Maximum Penalty & Key Safeguards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Maximum Statutory Penalty / Consequences:</span>
                <p className="text-rose-300 text-xs font-semibold leading-relaxed font-sans">{activeFramework.penalty}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Mandatory Technical Safeguards:</span>
                <p className="text-gray-200 text-xs font-sans leading-relaxed">{activeFramework.keySafeguard}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Unified Compliance Harmonization & Control Mapping Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 2: Unified Compliance Harmonization ("Map Once, Comply Many")
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise baseline security control to inspect how a single implementation satisfies the legal requirements of all 5 compliance frameworks simultaneously.
            </p>
          </div>

          {/* Unified Control Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(unifiedControls).map((uc) => {
              const isSelected = selectedUnifiedControlKey === uc.key;
              return (
                <button
                  key={uc.key}
                  onClick={() => setSelectedUnifiedControlKey(uc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{uc.name.split(": ")[1]}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{uc.name.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Unified Control Details */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Unified Baseline Control Architecture
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-sans">
                  {activeUnifiedControl.name}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Core Standard: <span className="text-emerald-400 font-bold">{activeUnifiedControl.isoMapping.split(" & ")[0]}</span>
              </div>
            </div>

            <div className="p-3.5 bg-gray-900 rounded-xl border border-gray-800 text-xs font-mono">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Technical Control Implementation:</span>
              <p className="text-gray-200 text-xs sm:text-sm font-sans mt-0.5">{activeUnifiedControl.description}</p>
            </div>

            {/* Cross-Walk Matrix (5 Frameworks) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                Cross-Walk Regulatory Mapping (5 Standards Satisfied Simultaneously)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-gray-900 rounded-xl border border-emerald-900/40 space-y-1">
                  <span className="text-emerald-400 font-bold block">1. India DPDP Act 2023:</span>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{activeUnifiedControl.crossWalk.dpdp}</p>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-cyan-900/40 space-y-1">
                  <span className="text-cyan-400 font-bold block">2. EU GDPR:</span>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{activeUnifiedControl.crossWalk.gdpr}</p>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-indigo-900/40 space-y-1">
                  <span className="text-indigo-400 font-bold block">3. US HIPAA Security Rule:</span>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{activeUnifiedControl.crossWalk.hipaa}</p>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-amber-900/40 space-y-1">
                  <span className="text-amber-400 font-bold block">4. PCI-DSS v4.0:</span>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{activeUnifiedControl.crossWalk.pci}</p>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-purple-900/40 space-y-1 sm:col-span-2 lg:col-span-2">
                  <span className="text-purple-400 font-bold block">5. AICPA SOC 2 Type 2:</span>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{activeUnifiedControl.crossWalk.soc2}</p>
                </div>
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
              Visualizing the 5-Framework Compliance Spectrum and the "Map Once, Comply Many" Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 5 Frameworks Spectrum */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 5-Framework Regulatory Spectrum
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Hub */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="250" cy="150" r="45" fill="#18181b" stroke="#6366f1" strokeWidth="2" />
                    <text x="250" y="146" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">UNIFIED ISMS</text>
                    <text x="250" y="160" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6.5">ISO 27001 Core</text>
                  </g>

                  {/* Satellite 1: DPDP */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="105" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="77" y="50" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">INDIA DPDP 2023</text>
                    <text x="77" y="63" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">Max ₹250 Cr Fine</text>
                  </g>
                  <line x1="130" y1="52" x2="210" y2="125" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Satellite 2: GDPR */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="370" y="30" width="105" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="422" y="50" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">EU GDPR</text>
                    <text x="422" y="63" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">€20M / 4% Fine</text>
                  </g>
                  <line x1="370" y1="52" x2="290" y2="125" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Satellite 3: HIPAA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="15" y="240" width="105" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="67" y="260" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7.5">US HIPAA</text>
                    <text x="67" y="273" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">Healthcare ePHI</text>
                  </g>
                  <line x1="120" y1="245" x2="210" y2="175" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Satellite 4: PCI-DSS */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="380" y="240" width="105" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="432" y="260" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="7.5">PCI-DSS v4.0</text>
                    <text x="432" y="273" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6">12 CDE Rules</text>
                  </g>
                  <line x1="380" y1="245" x2="290" y2="175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />

                  <text x="250" y="225" fill="#94a3b8" textAnchor="middle" fontSize="7.5">
                    Unified ISMS simultaneously satisfies DPDP, GDPR, HIPAA, PCI, and SOC 2.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: The 5-framework regulatory compliance spectrum around a central ISMS.
              </p>
            </div>

            {/* Diagram 2: Map Once Comply Many */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: "Map Once, Comply Many" Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Master Control */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="25" width="200" height="50" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      1 UNIFIED CONTROL
                    </text>
                    <text x="250" y="62" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">
                      (e.g., KMS AES-256 + MFA + WORM)
                    </text>
                  </g>

                  {/* Branches */}
                  <line x1="250" y1="75" x2="250" y2="110" stroke="#10b981" strokeWidth="1.5" />
                  <line x1="75" y1="110" x2="425" y2="110" stroke="#10b981" strokeWidth="1.5" />

                  {/* Output 1: DPDP */}
                  <line x1="75" y1="110" x2="75" y2="140" stroke="#10b981" strokeWidth="1.5" />
                  <rect x="25" y="140" width="100" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="75" y="160" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7">DPDP Sec 8</text>
                  <text x="75" y="172" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">Safe Harbor</text>

                  {/* Output 2: GDPR */}
                  <line x1="160" y1="110" x2="160" y2="140" stroke="#06b6d4" strokeWidth="1.5" />
                  <rect x="115" y="140" width="90" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                  <text x="160" y="160" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7">GDPR Art 32</text>
                  <text x="160" y="172" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">Security Rule</text>

                  {/* Output 3: HIPAA */}
                  <line x1="250" y1="110" x2="250" y2="140" stroke="#6366f1" strokeWidth="1.5" />
                  <rect x="205" y="140" width="90" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="250" y="160" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7">HIPAA §164</text>
                  <text x="250" y="172" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">ePHI Shield</text>

                  {/* Output 4: PCI */}
                  <line x1="340" y1="110" x2="340" y2="140" stroke="#f59e0b" strokeWidth="1.5" />
                  <rect x="295" y="140" width="90" height="40" rx="4" fill="#78350f" stroke="#f59e0b" />
                  <text x="340" y="160" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="7">PCI Req 3/8</text>
                  <text x="340" y="172" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6">CDE Protect</text>

                  {/* Output 5: SOC 2 */}
                  <line x1="425" y1="110" x2="425" y2="140" stroke="#a855f7" strokeWidth="1.5" />
                  <rect x="385" y="140" width="85" height="40" rx="4" fill="#581c87" stroke="#a855f7" />
                  <text x="427" y="160" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="7">SOC 2 CC6</text>
                  <text x="427" y="172" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6">Security TSC</text>

                  <text x="250" y="235" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    1 Audit Test satisfies all 5 frameworks, reducing compliance costs by 70%.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: The "Map Once, Comply Many" Unified Compliance Framework (UCF) architecture.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Compliance Harmonization Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads harmonize frameworks in Kolkata, govern clinical trials in Ichapur, manage SCADA in Barrackpore, and simulate cross-walks in Jadavpur.
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
                  <span>⚡</span> Governance Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for Compliance Architects and Lead Auditors harmonizing multi-framework environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Compliance Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Adopt Unified Frameworks:</strong> Harmonize controls to ISO 27001 for multi-standard coverage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Segment Card Environments:</strong> Isolate CDE to shrink PCI-DSS audit scope by 90%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Prepare for SOC 2 Type 2:</strong> Collect continuous evidence over 6 to 12 months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Appoint Resident DPO:</strong> Enforce India-based Data Protection Officer for DPDP Act Section 10.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Compliance Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Siloed Audit Fatigue:</strong> Running 5 separate audits with duplicate testing overhead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>PCI Scope Sprawl:</strong> Leaving corporate laptops unsegmented inside the cardholder network.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Type 1 vs Type 2 Confusion:</strong> Believing a point-in-time snapshot proves continuous security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing 6-Hour SLA:</strong> Failing to notify CERT-In within 6 hours of incident detection.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Safeguards:</strong> Encrypt all citizen PII to claim Section 8 safe harbor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Validate BAAs &amp; DPAs:</strong> Enforce binding data protection contracts on all vendors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Point-to-Point Encryption:</strong> Use hardware P2PE for all retail POS terminals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Continuous Evidence:</strong> Stream CloudWatch and KMS telemetry into GRC platforms.</span>
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
              Synthesize multi-framework compliance architectures and unified control mapping before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Compliance Practitioners
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why the Unified Compliance Framework ("Map Once, Comply Many") is the only scalable way to manage enterprise risk: If a global fintech tried to implement separate password policies and encryption keys for DPDP, GDPR, HIPAA, PCI-DSS, and SOC 2, engineers would spend 100% of their time answering duplicate audit requests. Standardizing on an ISO 27001 baseline and mapping controls to all standards cuts audit overhead by over 70%.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The difference between GDPR 72-hour notifications and CERT-In 6-hour incident reporting: Under European GDPR Article 33, Data Controllers have up to 72 hours to notify the regulator. In India, under CERT-In Directions 2022, critical cybersecurity incidents must be reported to the national CERT within 6 HOURS of detection.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud architectures, enforce default AWS KMS AES-256 encryption and quarterly User Access Reviews (UAR) to achieve instant baseline compliance across ISO 27001, DPDP Act 2023, HIPAA, PCI-DSS v4.0, and SOC 2 Type 2.
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
                <span>DPDP Act 2023 Section 33 enforces max ₹250 CRORE fine for safeguard lapses.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>GDPR Article 83 imposes up to €20M or 4% global turnover for privacy breaches.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>HIPAA Security Rule mandates Administrative, Physical, and Technical safeguards.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>PCI-DSS v4.0 protects Cardholder Data Environment across 12 requirements.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SOC 2 Type 2 evaluates continuous control effectiveness across 6-12 months.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Directions 2022 mandate 6-HOUR incident notification in India.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Compliance Frameworks &amp; Multi-Regulation FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Cross-Walk Mapping Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Compliance Frameworks: GDPR, HIPAA, PCI-DSS, SOC 2, and India DPDP Act (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Modern Information Security Auditing requires mastering multiple overlapping compliance frameworks. Always remember: do not build siloed compliance programs for each regulation! Master the Unified Compliance Framework (UCF) approach—implement rigorous ISO 27001 baseline controls, enforce AWS KMS encryption, mandate quarterly access reviews, and map once to satisfy India DPDP Act Section 8 (shielding from ₹250 Cr fines), EU GDPR, US HIPAA, PCI-DSS v4.0, and SOC 2 Type 2 simultaneously!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
