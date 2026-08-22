import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Studio 1: Vendor Tiering State
  const [dataAccessLevel, setDataAccessLevel] = useState("pii_banking"); // pii_banking, confidential, public
  const [networkConnectivity, setNetworkConnectivity] = useState("direct_vpn"); // direct_vpn, api_only, air_gapped
  const [businessCriticality, setBusinessCriticality] = useState("mission_critical"); // mission_critical, standard, non_critical

  // Studio 2: SBOM Component Inspector State
  const [selectedSbomKey, setSelectedSbomKey] = useState("payment_crypto");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_sbom_fintech");

  // Studio 1 Calculation: Vendor Risk Tier & Audit Requirements
  const { vendorTier, tierBadgeClass, requiredDueDiligence, breachSla, contractClauses } = useMemo(() => {
    let tier = "TIER 3 (MEDIUM / LOW)";
    let badge = "bg-indigo-950 text-indigo-300 border-indigo-800";
    let sla = "< 72 Hours Notification";
    let dd = "Standard CAIQ-Lite Questionnaire + NDA";
    let clauses = "Standard Terms of Service & Confidentiality Agreement";

    if (dataAccessLevel === "pii_banking" || networkConnectivity === "direct_vpn" || businessCriticality === "mission_critical") {
      tier = "TIER 1 (CRITICAL VENDOR)";
      badge = "bg-rose-950 text-rose-300 border-rose-800";
      sla = "< 24 Hours Mandatory Breach Notification SLA";
      dd = "SOC 2 Type II Report + ISO 27001 Certificate + CycloneDX SBOM + Annual Penetration Test";
      clauses = "Right-to-Audit + ₹50 Cr Indemnity + NIST SP 800-88 Crypto-Shredding + Sub-processor Restrictions";
    } else if (dataAccessLevel === "confidential" || networkConnectivity === "api_only" || businessCriticality === "standard") {
      tier = "TIER 2 (HIGH RISK VENDOR)";
      badge = "bg-amber-950 text-amber-300 border-amber-800";
      sla = "< 48 Hours Notification";
      dd = "Annual SIG Security Questionnaire + Third-Party Pen Test Executive Summary + DPA";
      clauses = "Data Processing Agreement (DPA) + Incident Notification Clause";
    }

    return {
      vendorTier: tier,
      tierBadgeClass: badge,
      requiredDueDiligence: dd,
      breachSla: sla,
      contractClauses: clauses
    };
  }, [dataAccessLevel, networkConnectivity, businessCriticality]);

  // Studio 2: SBOM Components Data
  const sbomComponents = {
    payment_crypto: {
      key: "payment_crypto",
      serviceName: "payment-crypto-service:v2.4.0",
      purl: "pkg:npm/@kolkatafintech/payment-crypto@2.4.0",
      dependencies: [
        { name: "jsonwebtoken", version: "9.0.2", type: "Direct", cve: "None (Secure)", status: "CLEAN", badge: "text-emerald-400" },
        { name: "log4j-core", version: "2.14.1", type: "Transitive (Nested)", cve: "CVE-2021-44228 (CVSS 9.8 RCE)", status: "CRITICAL VULNERABILITY", badge: "text-rose-400 font-bold" },
        { name: "crypto-js", version: "4.2.0", type: "Direct", cve: "None (Secure)", status: "CLEAN", badge: "text-emerald-400" }
      ],
      ciAction: "BLOCKED: Build automatically failed by Snyk SCA gate! Upgrade log4j-core to >= 2.17.1 immediately."
    },
    auth_jwt_provider: {
      key: "auth_jwt_provider",
      serviceName: "auth-jwt-provider:v1.8.0",
      purl: "pkg:npm/@kolkatafintech/auth-jwt@1.8.0",
      dependencies: [
        { name: "bcrypt", version: "5.1.1", type: "Direct", cve: "None (Secure)", status: "CLEAN", badge: "text-emerald-400" },
        { name: "node-jose", version: "2.2.0", type: "Direct", cve: "None (Secure)", status: "CLEAN", badge: "text-emerald-400" },
        { name: "buffer-equal-constant-time", version: "1.0.1", type: "Transitive", cve: "None (Secure)", status: "CLEAN", badge: "text-emerald-400" }
      ],
      ciAction: "PASSED: All dependencies verified. Cosign cryptographic signature generated successfully."
    },
    reporting_pdf: {
      key: "reporting_pdf",
      serviceName: "reporting-pdf-generator:v1.1.2",
      purl: "pkg:npm/@kolkatafintech/reporting-pdf@1.1.2",
      dependencies: [
        { name: "pdfkit", version: "0.13.0", type: "Direct", cve: "None (Secure)", status: "CLEAN", badge: "text-emerald-400" },
        { name: "pdf-image-extractor", version: "0.2.1", type: "Transitive", cve: "CVE-2024-5512 (CVSS 8.4 Command Injection)", status: "HIGH VULNERABILITY", badge: "text-amber-400 font-bold" }
      ],
      ciAction: "BLOCKED: High severity vulnerability detected in transitive package. Replace unmaintained library."
    }
  };

  const activeSbom = sbomComponents[selectedSbomKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_sbom_fintech",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Auditing 45 Payment Vendors & CycloneDX SBOMs",
      budget: "₹18,50,000",
      challenge: "500 Payment Microservices Integrated 45 Third-Party Fintech SDKs with Hidden Flaws",
      dilemma:
        "A 500-node payment switch processing ₹120 Crores daily integrated 45 third-party fintech SDKs, exposing the switch to unmonitored transitive Log4j-style library exploits.",
      resolution:
        "Mamata enforced mandatory CycloneDX SBOM ingestion and automated Snyk CI/CD gates, blocking 14 vulnerable packages and achieving 100% compliance with RBI and PCI-DSS v4.0 supply chain mandates.",
      metrics: {
        vendorsAudited: "45 Fintech Third Parties",
        sbomsIngested: "100% Machine-Readable SBOMs",
        vulnerableCommitsBlocked: "14 High/Critical Packages",
        compliance: "ISO 27001 A.5.19 & RBI Guidelines"
      }
    },
    {
      id: "ichapur_pacs_dpa_audit",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Healthcare Cloud PACS Vendor DPA & Audit",
      budget: "₹8,20,000",
      challenge: "Third-Party PACS Vendor Stored 80,000 Biopsy Records on Un-Audited Cloud Infrastructure",
      dilemma:
        "Hospital engaged an external cloud medical imaging vendor that stored 80,000 cancer patient biopsy scans without formal Data Processing Agreements, risking ₹250 Cr DPDP vicarious liability.",
      resolution:
        "Mahima executed a formal Data Processing Agreement (DPA) with a 24-hour breach SLA, verified SOC 2 Type II reports, and deployed automated S3 client-side encryption, shielding the hospital from ₹250 Cr DPDP fines.",
      metrics: {
        recordsShielded: "80,000 Patient Records",
        vendorDpaExecuted: "100% Contractual Safeguards",
        dpdpFineImmunization: "₹250 Cr Fine Shielded",
        compliance: "DPDP Act 2023 Sec 8(2) & NABH"
      }
    },
    {
      id: "barrackpore_scada_hardware_provenance",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV SCADA OT Hardware Supply Chain Provenance",
      budget: "₹14,80,000",
      challenge: "18 Substations Faced Hardware Trojan and Untrusted Firmware Risks from Suppliers",
      dilemma:
        "18 high-voltage 220kV transmission substations faced hardware trojan and untrusted firmware supply chain risks from third-party RTU hardware vendors under IT Act Section 70.",
      resolution:
        "Debangshu enforced trusted hardware provenance certification, cryptographically verified firmware signatures via Cosign, and isolated all RTUs behind hardware data diodes under IT Act Section 70 rules.",
      metrics: {
        substationsGoverned: "18 High-Voltage Sites",
        firmwareVerified: "100% Cryptographic Cosign",
        otSupplyChainIsolated: "100% Hardware Data Diodes",
        compliance: "IT Act Section 70 & CEA Rules"
      }
    },
    {
      id: "jadavpur_tprm_simulation_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "TPRM & SBOM Simulation Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Struggling to Understand Transitive Dependencies & Vendor Tiering",
      dilemma:
        "Cybersecurity students struggled to distinguish direct from transitive dependencies in open-source software, understand CycloneDX SBOM schemas, and enforce vendor risk tiers.",
      resolution:
        "The team developed an interactive Third-Party Vendor Risk Tiering & SBOM Inspector Studio in React, training 215+ BCA cyber security students on software supply chain security and vendor audits.",
      metrics: {
        studentsTrained: "215+ Cyber BCA Students",
        sbomsInspected: "95+ CycloneDX Schemas",
        examMastery: "100% TPRM & Supply Chain Mastery",
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
            Course Module 3: Information Security Management • Module 003_003 • Topic 11 of 14
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Third-Party and Supply Chain Risk Management
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Secure the modern extended enterprise: establish 3-tier vendor risk classifications under ISO/IEC 27001 Controls A.5.19–A.5.22, 
            ingest machine-readable Software Bill of Materials (SBOMs), detect transitive dependency risks (Log4j-style flaws), and enforce strict Data Fiduciary liability under the Indian DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Vendor Risk Assessment & Tiering Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Studio 1: Interactive Vendor Risk Assessment &amp; Tiering Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Configure data sensitivity, network connectivity, and business criticality to determine Vendor Risk Tier, mandatory audit requirements, and contractual breach SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls: Selectors */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl lg:col-span-2 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Vendor Inherent Exposure Parameters
              </h3>

              {/* Data Access Level */}
              <div className="space-y-1.5">
                <span className="text-gray-300 font-bold block">1. Data Access &amp; Privacy Sensitivity:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "pii_banking", label: "PII / Banking / Biometrics" },
                    { id: "confidential", label: "Confidential Business Data" },
                    { id: "public", label: "Public / Marketing Data" }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setDataAccessLevel(btn.id)}
                      className={clsx(
                        "p-2.5 rounded-xl text-left border transition-all text-xs font-mono",
                        dataAccessLevel === btn.id
                          ? "bg-cyan-950 text-cyan-200 border-cyan-500 font-bold"
                          : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Network Connectivity */}
              <div className="space-y-1.5">
                <span className="text-gray-300 font-bold block">2. Network Connectivity &amp; Ingress:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "direct_vpn", label: "Direct VPN / Production Bastion" },
                    { id: "api_only", label: "REST API / Webhook Only" },
                    { id: "air_gapped", label: "No Direct Network Access" }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setNetworkConnectivity(btn.id)}
                      className={clsx(
                        "p-2.5 rounded-xl text-left border transition-all text-xs font-mono",
                        networkConnectivity === btn.id
                          ? "bg-purple-950 text-purple-200 border-purple-500 font-bold"
                          : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Criticality */}
              <div className="space-y-1.5 pt-2 border-t border-gray-800">
                <span className="text-gray-300 font-bold block">3. Operational Business Criticality:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "mission_critical", label: "Mission Critical (Core Switch)" },
                    { id: "standard", label: "Standard Operations" },
                    { id: "non_critical", label: "Commodity / Low Impact" }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setBusinessCriticality(btn.id)}
                      className={clsx(
                        "p-2.5 rounded-xl text-left border transition-all text-xs font-mono",
                        businessCriticality === btn.id
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

            {/* Right Output: Vendor Governance Tier Card */}
            <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Vendor Governance Profile
                </h3>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-sans">Calculated Risk Tier:</span>
                  <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border inline-block", tierBadgeClass)}>
                    {vendorTier}
                  </span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-sans">Mandatory Due Diligence:</span>
                  <span className="text-cyan-300 font-sans text-xs font-semibold block">{requiredDueDiligence}</span>
                </div>

                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase font-sans">Contractual Incident SLA:</span>
                  <span className="text-amber-300 font-bold block">{breachSla}</span>
                </div>
              </div>

              {/* Contract Clauses Output */}
              <div className="p-3 bg-gray-900 rounded-xl border border-emerald-900/30 text-xs font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans text-[10px]">
                  Enforceable Contractual Clauses (DPA):
                </span>
                <p className="text-gray-300 text-[11px] font-sans mt-0.5 leading-relaxed">{contractClauses}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Software Bill of Materials (SBOM) & Dependency Inspector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📦</span> Studio 2: Software Bill of Materials (SBOM) &amp; Dependency Inspector
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a production microservice to inspect its machine-readable CycloneDX SBOM components, detect direct vs transitive vulnerabilities, and verify CI/CD gate actions.
            </p>
          </div>

          {/* Microservice Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(sbomComponents).map((svc) => {
              const isSelected = selectedSbomKey === svc.key;
              return (
                <button
                  key={svc.key}
                  onClick={() => setSelectedSbomKey(svc.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{svc.serviceName}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5 truncate">{svc.purl}</div>
                </button>
              );
            })}
          </div>

          {/* Active SBOM Details */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-5 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                  CycloneDX v1.5 SBOM Inventory
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeSbom.serviceName}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs font-mono text-gray-400">
                Format: <span className="text-white font-bold">CycloneDX JSON</span>
              </div>
            </div>

            {/* Dependency Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                  <tr>
                    <th className="p-3">Component Name</th>
                    <th className="p-3">Version</th>
                    <th className="p-3">Dependency Type</th>
                    <th className="p-3">Vulnerability / CVE Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {activeSbom.dependencies.map((dep, idx) => (
                    <tr key={idx} className="hover:bg-gray-900/50">
                      <td className="p-3 font-bold text-white">{dep.name}</td>
                      <td className="p-3 text-cyan-300">{dep.version}</td>
                      <td className="p-3">
                        <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold", dep.type.includes("Transitive") ? "bg-amber-950 text-amber-300 border border-amber-800" : "bg-indigo-950 text-indigo-300 border border-indigo-800")}>
                          {dep.type}
                        </span>
                      </td>
                      <td className={clsx("p-3 font-bold", dep.badge)}>{dep.cve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CI/CD Gate Action Output */}
            <div className="p-3.5 bg-gray-900 rounded-xl border border-gray-800 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans text-[10px]">
                DevSecOps Pipeline Enforcement Action:
              </span>
              <p className="text-gray-200 mt-1 font-sans font-semibold leading-relaxed">{activeSbom.ciAction}</p>
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
              Visualizing the Multi-Tier Software Supply Chain Attack Vector and the 5-Stage Vendor Risk Management (TPRM) Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Supply Chain Vector */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Multi-Tier Supply Chain Vector
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Attacker */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="100" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="70" y="52" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">ATTACKER</text>
                    <text x="70" y="65" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="6.5">Compromises Vendor</text>
                  </g>

                  <line x1="120" y1="52" x2="150" y2="52" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed71)" />

                  {/* Middle: Third-Party Vendor */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="30" width="130" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="215" y="52" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">THIRD-PARTY VENDOR</text>
                    <text x="215" y="65" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6.5">Infected npm / SDK</text>
                  </g>

                  <line x1="280" y1="52" x2="310" y2="52" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold71)" />

                  {/* Right: Target Enterprise */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="310" y="30" width="165" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="392" y="52" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">TARGET ENTERPRISE</text>
                    <text x="392" y="65" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6.5">Pre-Authenticated Ingress</text>
                  </g>

                  {/* Bottom Protective Shield */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="455" height="60" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="150" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      SBOM + SCA PIPELINE INTERCEPTION SHIELD
                    </text>
                    <text x="250" y="167" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Automated Snyk and Sigstore gates block untrusted vendor artifacts before deployment.
                    </text>
                  </g>

                  <text x="250" y="235" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Supply chain defenses inspect every incoming line of external code and vendor dependency.
                  </text>

                  <defs>
                    <marker id="arrowRed71" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowGold71" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.1: Multi-tier software supply chain attack vector and SCA interception.
              </p>
            </div>

            {/* Diagram 2: TPRM Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: The 5-Stage TPRM Lifecycle (A.5.19)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Identify */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="85" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="62" y="45" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="7.5">1. TIER</text>
                    <text x="62" y="58" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="6">Tier 1/2/3</text>
                  </g>

                  <line x1="105" y1="47" x2="115" y2="47" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Step 2: Assess */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="115" y="25" width="85" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="157" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="7.5">2. ASSESS</text>
                    <text x="157" y="58" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="6">SOC 2 / SIG</text>
                  </g>

                  <line x1="200" y1="47" x2="210" y2="47" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Step 3: Contract */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="210" y="25" width="85" height="45" rx="4" fill="#581c87" stroke="#a855f7" />
                    <text x="252" y="45" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="7.5">3. CONTRACT</text>
                    <text x="252" y="58" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="6">DPA &amp; SLAs</text>
                  </g>

                  <line x1="295" y1="47" x2="305" y2="47" stroke="#a855f7" strokeWidth="1.5" />

                  {/* Step 4: Monitor */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="305" y="25" width="85" height="45" rx="4" fill="#78350f" stroke="#f59e0b" />
                    <text x="347" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="7.5">4. MONITOR</text>
                    <text x="347" y="58" fill="#fde68a" font-family="monospace" textAnchor="middle" fontSize="6">BitSight feeds</text>
                  </g>

                  <line x1="390" y1="47" x2="400" y2="47" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 5: Offboard */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="400" y="25" width="85" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="442" y="45" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="7.5">5. OFFBOARD</text>
                    <text x="442" y="58" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="6">Revoke &amp; Shred</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="115" width="465" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="137" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      CONTINUOUS THIRD-PARTY SECURITY GOVERNANCE
                    </text>
                    <text x="250" y="154" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Guarantees compliance with DPDP Act Sec 8(2) and RBI IT Outsourcing Directions.
                    </text>
                  </g>

                  <text x="250" y="215" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Tiering ➔ Assessment ➔ Contract DPA ➔ Continuous Monitoring ➔ Secure Offboarding.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.2: The 5-stage Vendor Risk Management lifecycle under ISO/IEC 27036.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Supply Chain Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads audit payment SDKs in Kolkata, enforce PACS DPAs in Ichapur, verify SCADA firmware in Barrackpore, and simulate TPRM in Jadavpur.
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
                  <span>⚡</span> Supply Chain Dilemma ({currentLocalScenario.challenge})
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
              Guidelines for TPRM Leads and DevSecOps Engineers governing software supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> TPRM Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 24-Hour SLA:</strong> Require third parties to notify of breaches in &lt; 24h.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Mandate Machine SBOMs:</strong> Ingest CycloneDX or SPDX SBOMs for all third-party code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate Offboarding:</strong> Revoke OAuth keys and VPN logins within 1 hour of contract end.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Block Vulnerable Merges:</strong> Gate CI/CD pipelines with automated Snyk SCA checks.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Supply Chain Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>The Trusted Vendor Bias:</strong> Assuming big-name vendors are immune to cyber attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Transitive Code:</strong> Overlooking 400 nested packages behind 10 direct imports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Self-Attested Surveys:</strong> Relying on unverified Word questionnaires without SOC 2 audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Orphaned Vendor Access:</strong> Leaving third-party contractor logins active indefinitely.</span>
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
                  <span><strong>Enforce DPDP DPAs:</strong> Bind Data Processors to strict statutory liability clauses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Cryptographic Provenance:</strong> Verify container signatures via Cosign and Sigstore.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with RBI Residency:</strong> Store 100% of UPI payment data within Indian borders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Obtain Shred Certificates:</strong> Verify NIST SP 800-88 crypto-shredding on offboarding.</span>
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
              Synthesize vendor risk tiering and SBOM dependency management before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Supply Chain Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why transitive dependencies represent the largest blind spot in modern software: When your team imports 10 direct libraries in `package.json`, those 10 libraries silently import hundreds of transitive sub-packages. If a single unmaintained nested library (like Log4j) contains a Remote Code Execution flaw, your entire production cluster is vulnerable. Maintain machine-readable CycloneDX SBOMs to achieve 100% dependency visibility.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Section 8(2) of the Indian DPDP Act 2023 establishes strict vicarious liability: You can outsource data processing to a cloud vendor, but you CANNOT outsource legal accountability. If your third-party vendor leaks personal citizen data, the Data Protection Board of India holds your enterprise directly liable for up to ₹250 Crore statutory fines under Section 33.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your vendor contracts, enforce mandatory 24-hour breach notification clauses and annual Right-to-Audit provisions to guarantee continuous compliance under Indian CERT-In and RBI guidelines.
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
                <span>TPRM is governed by ISO/IEC 27001 Controls A.5.19–A.5.22 and ISO 27036.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Tier 1 Critical vendors have direct access to PII, banking APIs, or networks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Software Bill of Materials (SBOM) formats: CycloneDX (OWASP) &amp; SPDX.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Direct dependencies are explicitly imported; Transitive are nested sub-packages.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8(2) holds Fiduciaries strictly liable for Processor breaches.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Mandatory DPA clauses: Right-to-Audit, 24h Breach SLA, NIST 800-88 Data Destruction.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Third-Party and Supply Chain FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Supply Chain Security Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Third-Party and Supply Chain Risk Management (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Third-Party and Supply Chain Risk Management is the ultimate test of enterprise defense depth. Always remember: an attacker will always attack your weakest supplier to breach your core systems! Implement 3-tier vendor risk classifications under ISO/IEC 27001 Controls A.5.19–A.5.22, mandate machine-readable CycloneDX SBOMs to eliminate transitive dependency blind spots, enforce strict 24-hour breach notification SLAs, and remember that under Section 8(2) of the Indian DPDP Act 2023, you remain 100% legally accountable for your third-party data processors!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
