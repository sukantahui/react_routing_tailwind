import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: SoA Control Selector State
  const [selectedSoaControlKey, setSelectedSoaControlKey] = useState("a811_masking");

  // Studio 2: Scope Checklist State
  const [scopeFactors, setScopeFactors] = useState({
    physicalBoundaries: true,
    coreCloudDatabases: true,
    vendorInterfaces: true,
    regulatoryDpdpRbi: true
  });

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_soa_formulation");

  // Studio 1: Representative SoA Controls Data
  const soaControls = {
    a523_cloud: {
      key: "a523_cloud",
      number: "A.5.23",
      title: "Information Security for Use of Cloud Services",
      theme: "Organizational Controls (Clause A.5)",
      applicable: "YES (Mandatory)",
      justification: "Risk Treatment RR-02 (Cloud data leaks) + DPDP Act Section 8 + RBI Master Direction on Cloud Governance.",
      status: "IMPLEMENTED (AWS CSPM active; strict IAM least privilege enforced)",
      policyRef: "POL-CLOUD-04 (Cloud Security & Architecture Standard v3.1)",
      owner: "Lead Cloud Security Architect",
      statuteRef: "RBI Master Direction Cloud Annexure & DPDP Cross-Border Rules",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    a65_disciplinary: {
      key: "a65_disciplinary",
      number: "A.6.5",
      title: "Disciplinary / Termination Process (JML)",
      theme: "People Controls (Clause A.6)",
      applicable: "YES (Mandatory)",
      justification: "Risk Treatment RR-07 (Insider data theft & lingering credentials post-departure).",
      status: "IMPLEMENTED (Automated HR-to-IAM webhook revoking access in < 15 mins)",
      policyRef: "POL-HR-02 (Joiner-Mover-Leaver Identity Governance Policy)",
      owner: "Head of Human Resources & CISO Office",
      statuteRef: "IT Act 2000 Section 85 (Executive Due Diligence Defense)",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    a74_physical_monitoring: {
      key: "a74_physical_monitoring",
      number: "A.7.4",
      title: "Physical Security Monitoring",
      theme: "Physical Controls (Clause A.7)",
      applicable: "YES (Mandatory)",
      justification: "Risk Treatment RR-11 (Physical intrusion at primary operations center & data vault).",
      status: "IMPLEMENTED (24/7 AI-monitored CCTV with 90-day DVR rolling archive)",
      policyRef: "POL-PHYS-01 (Physical Perimeter & Data Vault Security Standard)",
      owner: "Head of Physical Facilities & Security",
      statuteRef: "NCIIPC Protected Systems Physical Charter (IT Act Section 70)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    a811_masking: {
      key: "a811_masking",
      number: "A.8.11",
      title: "Data Masking",
      theme: "Technological Controls (Clause A.8)",
      applicable: "YES (Mandatory)",
      justification: "Risk Treatment RR-04 (Unauthorized staff viewing of customer PAN & Aadhaar numbers).",
      status: "IMPLEMENTED (PostgreSQL Dynamic Data Masking - DDM on all PII columns)",
      policyRef: "POL-SEC-08 (Cryptographic & Masking Standard v2.4)",
      owner: "Lead Cryptographic Architect",
      statuteRef: "DPDP Act 2023 Section 8(5) Mandatory Technical Safeguards (₹250 Cr Fine Shield)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    a824_cryptography: {
      key: "a824_cryptography",
      number: "A.8.24",
      title: "Use of Cryptography",
      theme: "Technological Controls (Clause A.8)",
      applicable: "YES (Mandatory)",
      justification: "Risk Treatment RR-01 (Data interception in transit and database compromise at rest).",
      status: "IMPLEMENTED (AES-256-GCM via AWS KMS HSM + Mutual TLS 1.3 with Pinning)",
      policyRef: "POL-CRYPTO-01 (Enterprise Cryptographic Key Management Standard)",
      owner: "Lead Cryptographic Architect",
      statuteRef: "IT Act 2000 Section 43A (Reasonable Security Practices Safe Harbor)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeSoaControl = soaControls[selectedSoaControlKey];

  // Studio 2: Scope Completeness Calculation
  const scopeEvaluation = useMemo(() => {
    const total = Object.keys(scopeFactors).length;
    const checkedCount = Object.values(scopeFactors).filter(Boolean).length;
    const percentage = Math.round((checkedCount / total) * 100);

    let verdict = "100% COMPLETE & AUDIT READY";
    let badgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";
    let scrutinyRisk = "LOW (Zero Scope Slicing Detected)";

    if (percentage < 100) {
      if (percentage >= 75) {
        verdict = "MINOR SCOPE GAP (Auditor Clarification Required)";
        badgeClass = "bg-amber-950 text-amber-300 border-amber-800";
        scrutinyRisk = "MODERATE (Excluded interfaces flagged for review)";
      } else {
        verdict = "CRITICAL SCOPE SLICING RISK (Major NC Expected)";
        badgeClass = "bg-rose-950 text-rose-300 border-rose-800";
        scrutinyRisk = "HIGH (Core databases excluded; certification blocked!)";
      }
    }

    return { percentage, checkedCount, total, verdict, badgeClass, scrutinyRisk };
  }, [scopeFactors]);

  const toggleScopeFactor = (key) => {
    setScopeFactors((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_soa_formulation",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Airtight SoA Formulation for 500 Payment Microservices",
      budget: "₹16,50,000",
      challenge: "Global Banking Partner Demanded an Audited SoA Justifying All 93 Controls",
      dilemma:
        "A global banking partner demanded a formal, audited Statement of Applicability justifying all 93 Annex A controls before signing a ₹45 Crore UPI settlement switch contract.",
      resolution:
        "Mamata authored a comprehensive SoA mapping A.8.11 (Data Masking), A.8.12 (DLP), and A.5.23 (Cloud), achieving 100% ISO 27001:2022 certification and securing the banking partnership.",
      metrics: {
        controlsDocumented: "93/93 Controls Fully Justified",
        b2bDealSecured: "₹45 Crores Banking Contract",
        dpdpLiabilityAverted: "₹250 Crores Protected",
        compliance: "ISO 27001:2022 & RBI Master Direction"
      }
    },
    {
      id: "ichapur_pacs_scope",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare PACS ISMS Scope & SoA Definition",
      budget: "₹8,20,000",
      challenge: "Hospital Imaging Network Lacked Explicit Boundaries Across 80,000 Scans",
      dilemma:
        "Hospital imaging network lacked explicit scope boundaries across 80,000 oncology patient records, risking clinical downtime and major non-conformities during accreditation.",
      resolution:
        "Mahima defined the ISMS Scope encompassing PACS servers, DICOM viewing workstations, and cloud archives, authoring an SoA justifying healthcare privacy safeguards under NABH and DPDP guidelines.",
      metrics: {
        recordsInScope: "80,000 Oncology Records",
        scopeLegitimacy: "100% Certified Scope",
        nabhAccreditation: "Approved Without NCs",
        compliance: "NABH Hospital Charter & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_protected_scope",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation Protected System Scope Definition",
      budget: "₹14,80,000",
      challenge: "Establishing Formal ISMS Scope Across 18 High-Voltage Sites",
      dilemma:
        "Establishing formal ISMS scope for 18 high-voltage 220kV transmission substations under IT Act Section 70, ensuring SCADA RTUs were designated as Protected Systems.",
      resolution:
        "Debangshu defined the OT Protected System scope covering SCADA telemetry, RTU firmware keys, and air-gapped jump hosts, authoring an SoA justifying physical monitoring (A.7.4) and config management (A.8.9).",
      metrics: {
        substationsInScope: "18 High-Voltage Sites",
        otControlsJustified: "100% Mandatory Controls",
        prisonRiskAverted: "10-Year Criminal Risk Immunized",
        compliance: "IT Act Section 70 & CEA Cyber Regulations"
      }
    },
    {
      id: "jadavpur_soa_matrix_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "SoA Matrix Builder & Scope Boundary Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand How to Justify Excluded Controls",
      dilemma:
        "Cybersecurity students struggled to understand how to justify excluded controls in an ISO 27001 audit and how to detect 'Scope Slicing' anti-patterns in enterprise architectures.",
      resolution:
        "The team developed an interactive SoA Matrix Builder and Scope Boundary Validator in React, training 215+ BCA cyber security students on preparing Statements of Applicability for Stage 2 audits.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        soaMatricesBuilt: "55+ Industry Architectures",
        examMastery: "100% Scope & SoA Proficiency",
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
            Course Module 3: Information Security Management • Module 003_002 • Topic 3 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            ISMS Scope Definition and Statement of Applicability (SoA)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Architect the definitive boundaries of enterprise cybersecurity: master ISMS scope definition under Clause 4.3 (Physical, Logical, Human, Regulatory), 
            avoid Scope Slicing anti-patterns, and construct an airtight Statement of Applicability (SoA) justifying all 93 Annex A controls under Clause 6.1.3(d).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Statement of Applicability (SoA) Matrix Builder */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Studio 1: Statement of Applicability (SoA) Matrix Builder
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a representative Annex A security control to inspect its mandatory SoA entry: applicability status, formal justification, implementation status, internal policy link, and statutory Indian law alignment.
            </p>
          </div>

          {/* Control Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {Object.values(soaControls).map((ctrl) => {
              const isSelected = selectedSoaControlKey === ctrl.key;
              return (
                <button
                  key={ctrl.key}
                  onClick={() => setSelectedSoaControlKey(ctrl.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-mono font-bold text-indigo-400">{ctrl.number}</div>
                  <div className="font-bold text-gray-200 truncate mt-0.5">{ctrl.title.split(" ")[0]} {ctrl.title.split(" ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active SoA Control Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSoaControl.badgeClass)}>
                  SoA Entry: Control {activeSoaControl.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeSoaControl.title}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Applicability Status</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400">{activeSoaControl.applicable}</span>
              </div>
            </div>

            {/* Justification & Implementation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Formal Justification for Inclusion:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">{activeSoaControl.justification}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/40 space-y-1.5">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block font-sans">Current Implementation Status:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold leading-relaxed">{activeSoaControl.status}</p>
              </div>
            </div>

            {/* Policy Reference & Statutory Alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Internal Policy Reference:</span>
                <p className="text-gray-200 text-xs font-bold leading-relaxed">{activeSoaControl.policyRef}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Statutory Indian Cyber Law Reference:</span>
                <p className="text-gray-200 text-xs font-semibold leading-relaxed">{activeSoaControl.statuteRef}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ISMS Scope Boundary & Risk Analyzer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🌐</span> Studio 2: ISMS Scope Boundary &amp; Risk Analyzer (Clause 4.3)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle the 4 core boundary dimensions to evaluate scope completeness, detect "Scope Slicing" risks, and verify auditor compliance.
            </p>
          </div>

          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", scopeEvaluation.badgeClass)}>
                  Status: {scopeEvaluation.verdict}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Scope Completeness: {scopeEvaluation.percentage}% ({scopeEvaluation.checkedCount} / {scopeEvaluation.total} Boundaries Defined)
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Auditor Scrutiny Risk</span>
                <span className="text-sm font-extrabold text-amber-400">{scopeEvaluation.scrutinyRisk}</span>
              </div>
            </div>

            {/* Scope Checklist Items */}
            <div className="space-y-2.5 text-xs">
              <label
                onClick={() => toggleScopeFactor("physicalBoundaries")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={scopeFactors.physicalBoundaries}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">1. Physical Boundaries (Offices, Data Centers, Remote Workstations):</span>
                  <p className="text-[11px] text-gray-400">Explicitly covers corporate HQ, disaster recovery sites, and mobile endpoint devices used by staff.</p>
                </div>
              </label>

              <label
                onClick={() => toggleScopeFactor("coreCloudDatabases")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={scopeFactors.coreCloudDatabases}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">2. Logical &amp; Cloud Boundaries (VPCs, Production Databases &amp; UPI APIs):</span>
                  <p className="text-[11px] text-gray-400">Includes core transactional switches, Kubernetes clusters, and cloud storage volumes processing real data.</p>
                </div>
              </label>

              <label
                onClick={() => toggleScopeFactor("vendorInterfaces")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={scopeFactors.vendorInterfaces}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">3. Third-Party Vendor &amp; Contractor Interfaces:</span>
                  <p className="text-[11px] text-gray-400">Governs boundary connections to NPCI, external payment gateways, and third-party SaaS customer support tools.</p>
                </div>
              </label>

              <label
                onClick={() => toggleScopeFactor("regulatoryDpdpRbi")}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={scopeFactors.regulatoryDpdpRbi}
                  readOnly
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-bold text-gray-200">4. Legal &amp; Regulatory Jurisdiction (DPDP Act 2023, IT Act &amp; RBI Directions):</span>
                  <p className="text-[11px] text-gray-400">Enforces statutory data protection obligations and CERT-In 6-hour reporting across all scoped workloads.</p>
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
              Visualizing the 4-Dimensional ISMS Scope Boundary Cube and the Risk Assessment to Statement of Applicability Pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 4-Dimensional Scope Cube */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Dimensional ISMS Scope Cube (Clause 4.3)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Dimension 1: Physical (Top Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="35" y="30" width="200" height="90" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="135" y="55" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">1. PHYSICAL BOUNDARIES</text>
                    <text x="50" y="75" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Kolkata HQ + DR Center</text>
                    <text x="50" y="92" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Server Rooms &amp; Workstations</text>
                    <text x="50" y="109" fill="#34d399" font-family="monospace" fontSize="7.5">• Remote Employee Endpoints</text>
                  </g>

                  {/* Dimension 2: Logical / Cloud (Top Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="30" width="200" height="90" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="365" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9">2. LOGICAL BOUNDARIES</text>
                    <text x="280" y="75" fill="#818cf8" font-family="monospace" fontSize="7.5">• AWS VPCs &amp; Kubernetes</text>
                    <text x="280" y="92" fill="#818cf8" font-family="monospace" fontSize="7.5">• PostgreSQL Payment DB</text>
                    <text x="280" y="109" fill="#34d399" font-family="monospace" fontSize="7.5">• IAM Identity Boundaries</text>
                  </g>

                  {/* Dimension 3: Human / Org (Bottom Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="35" y="145" width="200" height="90" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="135" y="170" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">3. HUMAN / ORG BOUNDARIES</text>
                    <text x="50" y="190" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• Engineering &amp; DevOps Staff</text>
                    <text x="50" y="207" fill="#cbd5e1" font-family="monospace" fontSize="7.5">• Customer Support &amp; Sales</text>
                    <text x="50" y="224" fill="#34d399" font-family="monospace" fontSize="7.5">• Third-Party QA Contractors</text>
                  </g>

                  {/* Dimension 4: Regulatory (Bottom Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="145" width="200" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="365" y="170" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">4. REGULATORY BOUNDARIES</text>
                    <text x="280" y="190" fill="#34d399" font-family="monospace" fontSize="7.5">• DPDP Act 2023 (₹250 Cr)</text>
                    <text x="280" y="207" fill="#34d399" font-family="monospace" fontSize="7.5">• IT Act Section 70B (CERT-In)</text>
                    <text x="280" y="224" fill="#a7f3d0" font-family="monospace" fontSize="7.5">• RBI Master Directions</text>
                  </g>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Defining all 4 dimensions eliminates unmonitored blind spots and prevents Scope Slicing.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: The 4-Dimensional ISMS Scope Boundary Cube (Clause 4.3).
              </p>
            </div>

            {/* Diagram 2: Risk Assessment to SoA Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Risk Assessment to SoA Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Risk Assessment */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. RISK ASSESSMENT</text>
                    <text x="87" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Clause 6.1.2</text>
                  </g>

                  <line x1="155" y1="47" x2="185" y2="47" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan45)" />

                  {/* Step 2: Risk Treatment */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="25" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. RISK TREATMENT</text>
                    <text x="250" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Clause 6.1.3</text>
                  </g>

                  <line x1="315" y1="47" x2="345" y2="47" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo45)" />

                  {/* Step 3: Annex A Mapping */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="25" width="135" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="412" y="45" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. ANNEX A CHECK</text>
                    <text x="412" y="58" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Compare 93 Controls</text>
                  </g>

                  <line x1="412" y1="70" x2="412" y2="105" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 4: Statement of Applicability */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="372" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. STATEMENT OF APPLICABILITY</text>
                    <text x="372" y="138" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="7">Clause 6.1.3(d) Manifest</text>
                  </g>

                  <line x1="265" y1="127" x2="230" y2="127" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen45)" />

                  {/* Step 5: External Certification Audit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="45" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="125" y="125" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. STAGE 2 AUDIT</text>
                    <text x="125" y="138" fill="#e0e7ff" font-family="monospace" textAnchor="middle" fontSize="7">100% Accredited ISO 27001</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      100% AUDIT TRACEABILITY &amp; STATUTORY SAFE HARBOR
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Proves every identified threat is mitigated by documented, verified Annex A controls.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The SoA guarantees that no required security controls are overlooked during risk treatment.
                  </text>

                  <defs>
                    <marker id="arrowCyan45" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo45" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGreen45" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: The traceability pipeline connecting Risk Assessment to the Statement of Applicability.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Scope &amp; SoA Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads justify 93 controls in Kolkata, scope hospital PACS in Ichapur, govern power grid boundaries in Barrackpore, and build SoA validators in Jadavpur.
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
                  <span>⚡</span> Scope / SoA Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied SoA Solution
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
              Guidelines for Lead Implementers and CISOs authoring Statements of Applicability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> SoA Authoring Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Include All PII Databases:</strong> Ensure customer databases are scoped under DPDP Section 8.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Document Rationale for All 93 Controls:</strong> Never leave blank justification cells in your SoA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain SoA as a Living Document:</strong> Update control mappings upon major cloud releases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Map Third-Party Dependencies:</strong> Explicitly document NPCI, cloud, and vendor API boundaries.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Scoping Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Scope Slicing:</strong> Artificially excluding legacy production databases to make the audit easy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unjustified Control Exclusions:</strong> Excluding controls without risk assessment evidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing Internal Policy Links:</strong> Failing to reference specific operational standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Cloud Shared Responsibility:</strong> Assuming AWS manages customer IAM and encryption.</span>
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
                  <span><strong>Deploy A.8.11 Data Masking:</strong> Enforce PostgreSQL DDM on all customer Aadhaar/PAN fields.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce A.8.10 Info Deletion:</strong> Deploy TTL partition drops and cloud KMS Crypto-Shredding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Validate Boundary Interfaces:</strong> Enforce Mutual TLS (mTLS 1.3) on all external B2B APIs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180-Day Indian Logs:</strong> Archive tamper-proof SIEM telemetry under IT Act Section 70B.</span>
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
              Synthesize scoping boundaries and Statement of Applicability mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Scope &amp; SoA Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why the Statement of Applicability is the most critical document in an audit: The SoA is the explicit contract that translates high-level risk treatment decisions into an itemized manifest across all 93 Annex A controls. Without a completed and justified SoA, external auditors cannot verify whether your security controls actually cover all applicable organizational risks.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The dangers of "Scope Slicing": If an enterprise defines its ISMS scope as only its marketing blog while excluding its core payment backend, the resulting ISO 27001 certificate is deceptive. Auditors examine data flows and network connections; if un-scoped legacy databases interface with scoped assets, a Major Non-Conformity is issued immediately.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise architecture designs, ensure that every customer database is explicitly documented in the ISMS Scope Document under Clause 4.3 and mapped to Controls A.8.10 (Deletion), A.8.11 (Masking), and A.8.12 (DLP) in the Statement of Applicability to guarantee statutory safe harbor under the Indian DPDP Act 2023.
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
                <span>ISMS Scope (Clause 4.3) defines physical, logical, human, and legal bounds.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Statement of Applicability (SoA - Clause 6.1.3(d)) details all 93 controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SoA records Applicability (Yes/No), Justification, Status, and Policy Links.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Controls can be excluded ONLY if risk assessment proves zero applicable risk.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Scope Slicing results in Major Non-Conformities and certification denial.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SoA provides statutory proof of Reasonable Security Practices under IT Act Sec 43A.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="ISMS Scope Definition and Statement of Applicability (SoA) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Scope/SoA Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="ISMS Scope Definition and Statement of Applicability (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Scope definition and the Statement of Applicability (SoA) represent the legal and operational bedrock of your ISO/IEC 27001 implementation. Always ensure your ISMS scope under Clause 4.3 comprehensively covers all physical data centers, cloud VPCs, employee endpoints, and third-party API interfaces without falling into the trap of 'Scope Slicing'. Author your SoA under Clause 6.1.3(d) to rigorously account for all 93 Annex A controls, justify every inclusion and exclusion with risk assessment evidence, and maintain statutory safe harbor under Section 43A of the Indian IT Act 2000 and Section 8 of the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
