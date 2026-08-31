import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: 4-Step PKI Stepper State
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  // Studio 2: Trust Hierarchy Node State
  const [selectedNodeKey, setSelectedNodeKey] = useState("cca_root");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_mtls_pki");

  // Studio 1: 4 PKI Lifecycle Steps Data
  const pkiSteps = [
    {
      step: 1,
      title: "Step 1: Identity & Credential Vetting (RA)",
      action: "Registration Authority (RA) Identity Verification",
      sampleValue: "Applicant: Mamata (Lead Architect) • PAN: ABCDE1234F • Video KYC: Verified",
      details:
        "The applicant submits identity proofs (Aadhaar/PAN e-KYC or DNS challenge tokens). The Registration Authority verifies physical credentials and corporate authorization before issuing cryptographic approval.",
      stateVars: { "Entity Vetted": "Individual / Corporation / FQDN", "Validation Method": "Video KYC / DNS-01 Challenge", "RA Approval": "Cryptographically Approved", "Status": "Ready for CSR Generation" },
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      step: 2,
      title: "Step 2: Certificate Signing Request (CSR)",
      action: "Generate Key Pair & CSR via OpenSSL",
      sampleValue: "openssl req -new -key privkey.pem -out request.csr -subj '/CN=api.bank.in'",
      details:
        "The applicant generates an RSA-2048/4096 key pair inside their local server or crypto USB token. The public key and Distinguished Name (DN) are packaged into a PKCS#10 CSR and transmitted to the CA.",
      stateVars: { "CSR Format": "PKCS#10 (RFC 2986)", "Modulus Bit Length": "RSA-2048 / RSA-4096", "Subject DN": "CN=api.bank.in, O=FinTech Ltd, C=IN", "Private Key": "Retained Locally by Applicant" },
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      step: 3,
      title: "Step 3: CA Digital Signature & X.509 Issuance",
      action: "CA Signs Certificate with Master Private Key",
      sampleValue: "X.509 v3 Certificate Issued (Serial #0x7A9B42F1 • Signed with SHA-256 with RSA)",
      details:
        "The Certificate Authority verifies the RA approval, embeds the applicant's public key into an X.509 v3 structure, appends validity dates and extensions, and signs the certificate using its master private key in an HSM.",
      stateVars: { "Issuer": "India PKI Licensed CA (eMudhra/Sify)", "Signature Algorithm": "sha256WithRSAEncryption", "Certificate Format": "X.509 v3 (RFC 5280)", "CT Log Status": "SCT Embedded (RFC 6962)" },
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    {
      step: 4,
      title: "Step 4: Revocation Checking (CRL / OCSP Stapling)",
      action: "Verify Real-Time Certificate Validity",
      sampleValue: "OCSP Staple: Status = 'Good' • Validated Locally in 0.01 ms (RFC 6066)",
      details:
        "During TLS handshakes or digital signature verification, the relying party checks revocation status via OCSP Stapling or CRL lookups. If the private key is compromised, the CA revokes the certificate immediately.",
      stateVars: { "Revocation Protocol": "OCSP Stapling (RFC 6066)", "Latency Overhead": "0.01 ms (Cached Staple)", "Privacy Protection": "100% Zero Client CA Query", "CRL Fallback": "RFC 5280 HTTP Distribution" },
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  ];

  const currentStep = pkiSteps[activeStepIndex - 1];

  // Studio 2: Indian PKI Trust Hierarchy Nodes Data
  const hierarchyNodes = {
    cca_root: {
      key: "cca_root",
      name: "1. India PKI Root CA (CCA Apex)",
      role: "Supreme National Root of Trust (New Delhi)",
      keyLength: "RSA-4096 (Offline Air-gapped HSM Vault)",
      lifespan: "30 Years (2014 - 2044)",
      legalAuthority: "Section 17 & 18 of Information Technology Act 2000",
      duties: "Licenses, regulates, and audits all commercial Certifying Authorities; operates national root keys."
    },
    licensed_ca: {
      key: "licensed_ca",
      name: "2. Licensed Commercial CAs",
      role: "eMudhra, (n)Code Solutions, Sify Safescrypt, CDAC, IDRBT",
      keyLength: "RSA-4096 (FIPS 140-3 Level 3 Network HSM)",
      lifespan: "10 Years",
      legalAuthority: "Section 21 of Information Technology Act 2000",
      duties: "Manages Registration Authorities, processes video KYC, and signs Intermediate CA certificates."
    },
    intermediate_ca: {
      key: "intermediate_ca",
      name: "3. Intermediate & Sub-CAs",
      role: "Automated Issuance CAs & ACME Endpoints",
      keyLength: "RSA-2048 / RSA-4096 (High-Throughput HSM)",
      lifespan: "3 - 5 Years",
      legalAuthority: "CCA India Interoperability Guidelines",
      duties: "Issues high-volume end-entity TLS certificates and Class 3 DSC certificates to clients."
    },
    end_entity_dsc: {
      key: "end_entity_dsc",
      name: "4. End-Entity Class 3 DSC & TLS",
      role: "Corporate Signers, Doctors, Banks, and TLS Web Servers",
      keyLength: "RSA-2048 (FIPS 140-2 Level 2 USB Crypto Token)",
      lifespan: "1 - 2 Years",
      legalAuthority: "Section 5 & 35 of IT Act and Section 65B Indian Evidence Act",
      duties: "Legally binding e-tendering, company filings (MCA21), tax returns, and TLS web server encryption."
    }
  };

  const activeNode = hierarchyNodes[selectedNodeKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_mtls_pki",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "500-Microservice mTLS Private PKI Deployment",
      budget: "₹9,50,000",
      challenge: "Unencrypted Internal HTTP Traffic Leaking Customer Data",
      dilemma:
        "Internal microservice APIs were transmitting unencrypted personal banking data over plain HTTP, creating internal sniffing and DPDP compliance exposure.",
      resolution:
        "Mamata deployed HashiCorp Vault Private CA issuing automated mTLS certificates via ACME to 500+ pods, achieving 100% east-west encryption and fulfilling Section 33 of the DPDP Act 2023.",
      metrics: {
        podsSecured: "500+ Kubernetes Microservices",
        mTLSAdoption: "100% East-West Traffic Encrypted",
        latencyOverhead: "0.45ms per Handshake",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_doctor_dsc",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "180-Physician Class 3 DSC USB Token Ceremonies",
      budget: "₹5,20,000",
      challenge: "Hospital Clinicians Requiring Legally Admissible e-Prescriptions",
      dilemma:
        "Hospital clinicians required legally admissible e-prescriptions with non-repudiation for 50,000+ patients under NABH hospital standards.",
      resolution:
        "Mahima conducted formal Class 3 DSC enrollment ceremonies on FIPS 140-2 crypto USB tokens with video KYC, securing 100% legal admissibility under Section 5 of the IT Act 2000.",
      metrics: {
        physiciansEnrolled: "180+ Clinical Specialists",
        tokensIssued: "FIPS 140-2 Level 2 USB Tokens",
        legalAdmissibility: "100% Section 5 IT Act Validated",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_pki",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation IEC 62351 PKI Trust Tree",
      budget: "₹8,80,000",
      challenge: "Preventing Rogue Firmware and Fake Control Commands on RTUs",
      dilemma:
        "Preventing rogue firmware and fake command injection on 18 substation RTU controllers across high-voltage 220kV transmission lines.",
      resolution:
        "Debangshu established an air-gapped Substation Root CA and Intermediate CA hierarchy issuing X.509 device identity certificates, ensuring 100.00% authenticated grid switching.",
      metrics: {
        substationsCovered: "18 High-Voltage Sites",
        deviceCertificates: "100% IEC 62351 Authenticated",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_ocsp_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "X.509 CA & OCSP Stapling Laboratory",
      budget: "₹4,00,000",
      challenge: "Teaching Students CSR Signing, Merkle Trees, and OCSP Stapling",
      dilemma:
        "Teaching computer science students how CAs sign CSRs, how Certificate Transparency logs work, and how OCSP stapling prevents latency.",
      resolution:
        "The team developed an interactive Python/OpenSSL PKI testbed parsing ASN.1 certificate trees and simulating CRL lookups and OCSP stapling, training 140+ students on PKI operations.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        testbedsAuthored: "OpenSSL CA + OCSP Responder",
        staplingLatencyBenchmarked: "0.01ms Local Verification",
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
            Cyber Security Module 002_005 • Topic 9 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Public Key Infrastructure (PKI) and Certificate Authorities (CAs)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the operational architecture of global and national digital trust: explore Certificate Authorities (CAs), 
            Registration Authorities (RAs), CRL and OCSP Stapling revocation mechanisms, Certificate Transparency (CT) Merkle logs, and the Indian CCA legal framework under the IT Act 2000.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 4-Tier PKI Hierarchy & Certificate Issuance Stepper */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📜</span> Studio 1: The 4-Stage PKI Certificate Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 4 sequential stages of certificate issuance and validation: identity vetting, CSR generation, CA digital signing, and real-time revocation checking.
            </p>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {pkiSteps.map((st) => {
              const isSelected = activeStepIndex === st.step;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStepIndex(st.step)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">Stage {st.step}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{st.title.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Step Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentStep.badgeClass)}>
                {currentStep.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {currentStep.action}
              </h3>
            </div>

            {/* Value & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Cryptographic State &amp; Command:</span>
                <p className="text-emerald-400 text-xs sm:text-sm font-bold leading-relaxed">{currentStep.sampleValue}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Operational Engineering Note:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{currentStep.details}</p>
              </div>
            </div>

            {/* State Variables */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Active PKI Pipeline Parameters
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {Object.entries(currentStep.stateVars).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block truncate">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Indian PKI Trust Hierarchy Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🇮🇳</span> Studio 2: Indian PKI Trust Hierarchy Explorer (CCA Apex Model)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 4 nodes in the national trust hierarchy to explore how the Controller of Certifying Authorities (CCA India) regulates commercial CAs and Class 3 DSCs under the IT Act 2000.
            </p>
          </div>

          {/* Node Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(hierarchyNodes).map((node) => {
              const isSelected = selectedNodeKey === node.key;
              return (
                <button
                  key={node.key}
                  onClick={() => setSelectedNodeKey(node.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{node.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{node.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Node Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-950 text-emerald-300 border-emerald-800">
                  Trust Node: {activeNode.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeNode.role}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Key Spec &amp; Validity</span>
                <span className="text-sm font-extrabold text-emerald-400">{activeNode.lifespan}</span>
              </div>
            </div>

            {/* Key Length & Legal Authority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Cryptographic Hardware &amp; Key:</span>
                <p className="text-cyan-300 text-xs sm:text-sm font-bold">{activeNode.keyLength}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Statutory Legal Authority:</span>
                <p className="text-purple-300 text-xs sm:text-sm font-semibold">{activeNode.legalAuthority}</p>
              </div>
            </div>

            {/* Duties Note */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Mandatory Regulatory Duties:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeNode.duties}</p>
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
              Visualizing the Complete PKI Architectural Ecosystem and the Indian CCA Hierarchical National PKI Tree.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: PKI Architectural Ecosystem */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The PKI Architectural Ecosystem
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: Certificate Authority */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="20" width="200" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">CERTIFICATE AUTHORITY (CA)</text>
                    <text x="250" y="58" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">FIPS 140-3 HSM • Signs X.509</text>
                  </g>

                  {/* Left: Registration Authority */}
                  <path d="M 170 70 L 100 110" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan34)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="160" height="55" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="100" y="132" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">REGISTRATION AUTH (RA)</text>
                    <text x="100" y="148" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Vets Identity (KYC/DNS)</text>
                  </g>

                  {/* Right: Repository / OCSP */}
                  <path d="M 330 70 L 400 110" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold34)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="320" y="110" width="160" height="55" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="400" y="132" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">CRL &amp; OCSP RESPONDER</text>
                    <text x="400" y="148" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">Real-time Revocation</text>
                  </g>

                  {/* Bottom: Client & Server */}
                  <line x1="100" y1="165" x2="150" y2="210" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="400" y1="165" x2="350" y2="210" stroke="#f59e0b" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="210" width="400" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="232" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      END-ENTITY: TLS WEB SERVER &amp; CLASS 3 DSC SIGNER
                    </text>
                    <text x="250" y="248" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Client validates signature chain up to Trusted Root CA with OCSP staple!
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowCyan34" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGold34" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: The core functional components of a Public Key Infrastructure ecosystem.
              </p>
            </div>

            {/* Diagram 2: Indian CCA National PKI Hierarchy */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Indian CCA Hierarchical National PKI Tree
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Root Node */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="130" y="20" width="240" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">INDIA PKI ROOT CA (CCA)</text>
                    <text x="250" y="56" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">IT Act Section 17 • RSA-4096</text>
                  </g>

                  {/* Split Lines */}
                  <line x1="250" y1="65" x2="100" y2="105" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="250" y1="65" x2="250" y2="105" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="250" y1="65" x2="400" y2="105" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Licensed CAs */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">eMudhra CA</text>
                    <text x="87" y="140" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Commercial DSC</text>

                    <rect x="182" y="105" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="250" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">Sify / (n)Code</text>
                    <text x="250" y="140" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">e-Tender / Tax</text>

                    <rect x="345" y="105" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="412" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">IDRBT / CDAC</text>
                    <text x="412" y="140" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Banking &amp; Gov</text>
                  </g>

                  {/* End-Entities */}
                  <path d="M 87 150 L 87 200 L 250 200" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 250 150 L 250 200" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 412 150 L 412 200 L 250 200" stroke="#06b6d4" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="210" width="400" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="232" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      CLASS 3 DIGITAL SIGNATURE CERTIFICATES (DSC)
                    </text>
                    <text x="250" y="248" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      FIPS 140-2 Level 2 Crypto USB Tokens (MCA21, e-Tenders, GST)
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The Indian National PKI hierarchy established under Section 17-35 of the Information Technology Act 2000.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: The Indian national PKI trust tree operating under the Controller of Certifying Authorities.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: PKI Architecture Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads deploy 500-microservice mTLS private PKIs, issue 180 doctor Class 3 DSC tokens under IT Act Section 35, secure substation RTUs with air-gapped PKI trees, and author testbeds across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Public Key Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied PKI Solution
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
              Guidelines for PKI architects designing enterprise and national public key systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> PKI Operational Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Keep Root CAs Strictly Offline:</strong> Air-gap root HSMs in physical security vaults.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy OCSP Stapling (RFC 6066):</strong> Eliminates client-side CA queries and accelerates TLS handshakes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate Lifecycles with ACME:</strong> Use automated renewal agents (Certbot) to prevent certificate outages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce FIPS 140-2 Level 2 USB Tokens:</strong> Mandatory for all legal Indian DSC signing keys.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common PKI Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Leaving Root CAs Online:</strong> One compromise destroys the entire organization's trust tree.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Failing to Monitor Expiry:</strong> Unmonitored certificates cause catastrophic application downtime.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Certificate Transparency:</strong> Allows rogue CAs to impersonate domains in secret.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Self-Signed Certs in Web:</strong> Triggers severe browser security warnings and user dropoff.</span>
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
                  <span><strong>Enforce CCA India Standards:</strong> Audit all legal signing tokens for 2048-bit RSA keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Mutual TLS (mTLS):</strong> Zero-trust authentication for east-west microservices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with CERT-In 6-Hour Rule:</strong> Maintain automated playbooks for key compromise reporting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Monitor CT Merkle Logs:</strong> Detect unauthorized certificate issuance in real time.</span>
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
              Synthesize key PKI and Certificate Authority mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Systems Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why asymmetric cryptography requires PKI: RSA math proves that a ciphertext was encrypted with public key $(e, N)$, but only a digitally signed X.509 certificate from a trusted CA proves that $(e, N)$ belongs to `bank.in` and not an eavesdropping Man-in-the-Middle attacker.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How OCSP Stapling solves both privacy and latency: Instead of having every client query the CA's server during every TLS handshake, the web server caches the CA-signed OCSP response and includes it directly in the handshake, validating revocation status in 0.01 ms.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your enterprise microservice clusters, eliminate long-lived 1-year certificates; adopt automated ACME protocols with cert-manager or HashiCorp Vault to issue short-lived (24-hour to 30-day) mTLS certificates automatically.
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
                <span>PKI binds public keys to identities via digital signatures, preventing MITM.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Root CAs are self-signed and offline; Intermediate CAs sign daily certs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RAs authenticate applicant identity (KYC/DNS) before certificate issuance.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CRLs are periodic lists; OCSP is real-time; OCSP Stapling caches responses.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Certificate Transparency (CT / RFC 6962) logs public certs into Merkle trees.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CCA India regulates commercial CAs under Section 17 of the IT Act 2000.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Public Key Infrastructure (PKI) and Certificate Authorities FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; PKI Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Public Key Infrastructure & CAs (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Public Key Infrastructure is the indispensable bridge between abstract mathematical cryptography and real-world legal identity. Without a trusted Certificate Authority hierarchy, asymmetric keys are vulnerable to Man-in-the-Middle impersonation. Master the 4-tier trust model, deploy OCSP Stapling (RFC 6066) to eliminate latency, automate certificate lifecycles via ACME (RFC 8555), and always generate legal digital signing keys directly inside FIPS 140-2 Level 2 crypto USB tokens under Section 35 of the Indian Information Technology Act 2000!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
