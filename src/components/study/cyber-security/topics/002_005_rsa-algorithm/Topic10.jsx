import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: Dissector State
  const [selectedAsnFieldKey, setSelectedAsnFieldKey] = useState("subject_alt_name");

  // Studio 2: Chain Tier State
  const [selectedChainTierKey, setSelectedChainTierKey] = useState("intermediate_ca");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fullchain_fix");

  // Studio 1: 6 ASN.1 Dissector Fields Data
  const asnFields = {
    tbs_header: {
      key: "tbs_header",
      name: "1. TBS Header & Serial Number",
      asnPath: "Certificate.tbsCertificate.serialNumber",
      rawAsn: "INTEGER: 0x4A:7B:91:3C:D2:E5:88:14:90:FA:21 (128-bit CSPRNG Entropy)",
      details:
        "Version 3 (INTEGER 2) identifies the X.509 v3 standard. The Serial Number is a unique positive integer assigned by the CA with high cryptographic entropy to prevent hash collision attacks.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    subject_issuer_dn: {
      key: "subject_issuer_dn",
      name: "2. Subject & Issuer Distinguished Names",
      asnPath: "Certificate.tbsCertificate.subject / issuer",
      rawAsn: "Subject: CN=api.bank.in, O=Kolkata FinTech Ltd, ST=West Bengal, C=IN\nIssuer:  CN=India PKI Class 3 CA, O=eMudhra Ltd, C=IN",
      details:
        "Issuer DN identifies the signing Certificate Authority; Subject DN identifies the certificate owner. During path validation, Child.Issuer must exactly match Parent.Subject.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    subject_public_key: {
      key: "subject_public_key",
      name: "3. SubjectPublicKeyInfo (SPKI)",
      asnPath: "Certificate.tbsCertificate.subjectPublicKeyInfo",
      rawAsn: "Algorithm: rsaEncryption (OID: 1.2.840.113549.1.1.1)\nPublicKey: BIT STRING (2048-bit Modulus N + Public Exponent e = 65537)",
      details:
        "Embeds the applicant's public RSA key (N, e) along with algorithm identifiers. Clients use this public key to verify digital signatures or wrap symmetric session keys in hybrid encryption.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    subject_alt_name: {
      key: "subject_alt_name",
      name: "4. Subject Alternative Name (SAN)",
      asnPath: "Certificate.tbsCertificate.extensions.subjectAltName",
      rawAsn: "X509v3 Subject Alternative Name (OID: 2.5.29.17):\n  DNS:api.bank.in, DNS:pay.bank.in, DNS:*.secure.bank.in, IP:10.0.4.1",
      details:
        "Mandatory for all modern web browsers (RFC 5280 / RFC 6125). Allows a single digital certificate to secure multiple fully qualified domain names, wildcard domains, and IP addresses. Replaces legacy Common Name (CN).",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    basic_constraints: {
      key: "basic_constraints",
      name: "5. Basic Constraints & Key Usage",
      asnPath: "Certificate.tbsCertificate.extensions.basicConstraints",
      rawAsn: "Basic Constraints: critical, CA:FALSE\nKey Usage: critical, Digital Signature, Key Encipherment\nExtended Key Usage: TLS Web Server Authentication (serverAuth)",
      details:
        "Critical security control: CA:FALSE strictly prevents end-entity certificates from acting as rogue CAs. Key Usage defines primitive operations; Extended Key Usage defines protocol roles (serverAuth).",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    signature_block: {
      key: "signature_block",
      name: "6. CA Digital Signature Block",
      asnPath: "Certificate.signatureValue",
      rawAsn: "Algorithm: sha256WithRSAEncryption (OID: 1.2.840.113549.1.1.11)\nSignature: BIT STRING (256 Bytes RSA Digital Signature over SHA-256(tbsCertificate))",
      details:
        "The issuing CA hashes the entire tbsCertificate structure with SHA-256 and encrypts the digest with its private RSA key. Relying parties verify this signature using the CA's public key.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activeField = asnFields[selectedAsnFieldKey];

  // Studio 2: Trust Chain Tiers Data
  const chainTiers = {
    leaf_cert: {
      key: "leaf_cert",
      name: "1. End-Entity Leaf Certificate (api.bank.in)",
      subject: "CN=api.bank.in, O=Kolkata FinTech Ltd, C=IN",
      issuer: "CN=India PKI Sub-CA 2026, O=eMudhra Ltd, C=IN",
      basicConstraints: "CA:FALSE (Leaf)",
      keyUsage: "Digital Signature, Key Encipherment, serverAuth",
      verificationMethod: "Verified using Intermediate CA's Public Key",
      status: "Configured on Web Server via fullchain.pem"
    },
    intermediate_ca: {
      key: "intermediate_ca",
      name: "2. Intermediate Issuing CA (India PKI Sub-CA)",
      subject: "CN=India PKI Sub-CA 2026, O=eMudhra Ltd, C=IN",
      issuer: "CN=India PKI Root CA, O=Controller of Certifying Authorities, C=IN",
      basicConstraints: "CA:TRUE, pathlen:0",
      keyUsage: "Key Cert Sign, CRL Sign",
      verificationMethod: "Verified using Root CA's Public Key",
      status: "Bundled alongside Leaf Certificate in fullchain.pem"
    },
    root_ca: {
      key: "root_ca",
      name: "3. Root Certificate Authority (India PKI Root CA)",
      subject: "CN=India PKI Root CA, O=Controller of Certifying Authorities, C=IN",
      issuer: "CN=India PKI Root CA (Self-Signed Trust Anchor)",
      basicConstraints: "CA:TRUE (Self-Signed Root Anchor)",
      keyUsage: "Key Cert Sign, CRL Sign",
      verificationMethod: "Pre-installed in OS Trust Store (Windows / Mozilla NSS)",
      status: "Air-Gapped Offline Master Vault (New Delhi)"
    }
  };

  const activeTier = chainTiers[selectedChainTierKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_fullchain_fix",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Payment Gateway Fullchain.pem Migration",
      budget: "₹9,50,000",
      challenge: "Missing Intermediate Certs Dropping 15% Mobile Transactions",
      dilemma:
        "Mobile banking apps were dropping 15% of payment transactions with SEC_ERROR_UNKNOWN_ISSUER errors due to servers serving only leaf certificates without intermediate CA bundles.",
      resolution:
        "Mamata deployed automated fullchain.pem bundling (Leaf + Intermediate CA) across 1,200 payment nodes, eliminating 100% of chain verification errors and meeting RBI compliance.",
      metrics: {
        switchesSecured: "1,200 Payment Nodes",
        chainErrors: "0% SEC_ERROR_UNKNOWN_ISSUER",
        mobileSuccessRate: "100.00% Verified Handshakes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_san_enforcement",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Oncology DICOM PACS SAN Extension Enforcement",
      budget: "₹5,20,000",
      challenge: "Browsers Blocking Clinician Access Due to Missing SANs",
      dilemma:
        "Modern web browsers were blocking doctor access to clinical imaging servers with SSL_ERROR_BAD_CERT_DOMAIN errors because legacy certificates used Common Name (CN) instead of Subject Alternative Name (SAN).",
      resolution:
        "Mahima re-issued all hospital SSL certificates with multi-domain SAN extensions (DNS + IP entries), ensuring seamless clinical access and compliance with the DPDP Act 2023.",
      metrics: {
        certificatesReissued: "35 Hospital Web Endpoints",
        sanCoverage: "100% Multi-Domain + IP SANs",
        browserWarnings: "0 Security Warnings",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_pathlen_hardening",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Substation RTU PathLen:0 Hardening",
      budget: "₹8,80,000",
      challenge: "Preventing Rogue Sub-CA Delegation Across 18 Substations",
      dilemma:
        "Preventing rogue sub-CA delegation and unauthorized certificate creation across 18 substation RTU controllers operating along 220kV transmission grids.",
      resolution:
        "Debangshu enforced strict Basic Constraints `pathLen:0` in Intermediate Substation CAs, blocking unauthorized child CAs and ensuring 100.00% grid switching stability.",
      metrics: {
        substationsHardened: "18 High-Voltage Sites",
        pathLenConstraint: "pathlen:0 Strictly Enforced",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_asn_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "X.509 ASN.1 Dissector & Parser Laboratory",
      budget: "₹4,00,000",
      challenge: "Teaching DER Byte Encodings, AKI/SKI Matching, and Path Validation",
      dilemma:
        "Students struggled to understand how DER byte encodings map to X.509 certificate fields and how RFC 5280 path validation validates trust trees in OpenSSL.",
      resolution:
        "The team authored an interactive Python/OpenSSL ASN.1 certificate dissector parsing TBS headers, AKI/SKI fingerprints, and RSA signature blocks, training 140+ students.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        dissectorsAuthored: "ASN.1 Dissector + DER Decoder",
        pathValidationProved: "100% RFC 5280 Compliance",
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
            Cyber Security Module 002_005 • Topic 10 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Digital Certificates (X.509) and Trust Chains
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the universal standard of digital identity: explore X.509 v3 ASN.1 certificate anatomy, 
            Subject Alternative Name (SAN) extensions, Basic Constraints (`CA:TRUE/FALSE`), and master the RFC 5280 6-step trust chain path validation algorithm.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive X.509 v3 ASN.1 Structural Dissector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 1: X.509 v3 Certificate ASN.1 Dissector
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an ASN.1 field from the X.509 v3 certificate structure to inspect its syntax path, raw byte representation, and cryptographic purpose.
            </p>
          </div>

          {/* Field Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(asnFields).map((field) => {
              const isSelected = selectedAsnFieldKey === field.key;
              return (
                <button
                  key={field.key}
                  onClick={() => setSelectedAsnFieldKey(field.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{field.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{field.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Field Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeField.badgeClass)}>
                ASN.1 Element: {activeField.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                {activeField.asnPath}
              </h3>
            </div>

            {/* Raw Representation & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Raw ASN.1 DER Encoding:</span>
                <pre className="text-emerald-400 text-xs font-mono whitespace-pre-wrap leading-relaxed">{activeField.rawAsn}</pre>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Security &amp; RFC 5280 Specification:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{activeField.details}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: RFC 5280 Path Validation & Trust Chain Verification Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⛓️</span> Studio 2: RFC 5280 Certificate Trust Chain Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 3 tiers in the certificate trust chain to inspect how the client builds and verifies the cryptographic path from leaf to root.
            </p>
          </div>

          {/* Tier Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(chainTiers).map((tier) => {
              const isSelected = selectedChainTierKey === tier.key;
              return (
                <button
                  key={tier.key}
                  onClick={() => setSelectedChainTierKey(tier.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tier.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{tier.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Tier Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-950 text-emerald-300 border-emerald-800">
                Trust Chain Level: {activeTier.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                {activeTier.subject}
              </h3>
            </div>

            {/* Subject & Issuer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Issuer Distinguished Name (Parent):</span>
                <span className="text-gray-200 text-xs sm:text-sm font-semibold">{activeTier.issuer}</span>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Basic Constraints &amp; Roles:</span>
                <span className="text-emerald-400 text-xs sm:text-sm font-bold">{activeTier.basicConstraints}</span>
              </div>
            </div>

            {/* Verification Method & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block">Cryptographic Verification:</span>
                <p className="text-gray-300 font-semibold">{activeTier.verificationMethod}</p>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Storage &amp; Deployment Location:</span>
                <p className="text-gray-300 font-semibold">{activeTier.status}</p>
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
              Visualizing the X.509 v3 Certificate ASN.1 Internal Hierarchy and the RFC 5280 3-Tier Certificate Chain Path Validation Workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: X.509 v3 ASN.1 Internal Hierarchy */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: X.509 v3 Certificate ASN.1 Structure
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Certificate Box */}
                  <rect x="20" y="20" width="460" height="270" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="250" y="42" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="10">X.509 v3 Certificate SEQUENCE (RFC 5280)</text>

                  {/* tbsCertificate Box */}
                  <rect x="35" y="55" width="430" height="160" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="50" y="75" fill="#cffafe" fontWeight="bold" fontSize="9">1. tbsCertificate (To-Be-Signed Data Block)</text>
                  <text x="50" y="95" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Version (v3) + SerialNumber (128-bit CSPRNG)</text>
                  <text x="50" y="115" fill="#67e8f9" font-family="monospace" fontSize="7.5">• SignatureAlgorithm (sha256WithRSAEncryption)</text>
                  <text x="50" y="135" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Issuer DN &amp; Validity (notBefore / notAfter)</text>
                  <text x="50" y="155" fill="#67e8f9" font-family="monospace" fontSize="7.5">• Subject DN &amp; SubjectPublicKeyInfo (N, e)</text>
                  <text x="50" y="175" fill="#a5f3fc" font-family="monospace" fontWeight="bold" fontSize="7.5">• Extensions: SAN, BasicConstraints (CA:FALSE), KeyUsage, AIA, CDP</text>

                  {/* Signature Algorithm */}
                  <rect x="35" y="225" width="205" height="45" rx="4" fill="#1e1b4b" stroke="#a855f7" />
                  <text x="137" y="245" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="8">2. signatureAlgorithm</text>
                  <text x="137" y="260" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7">OID 1.2.840.113549.1.1.11</text>

                  {/* Signature Value */}
                  <rect x="260" y="225" width="205" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                  <text x="362" y="245" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">3. signatureValue (BIT STRING)</text>
                  <text x="362" y="260" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">CA's RSA Signature over Hash(TBS)</text>

                  <text x="250" y="305" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    The three structural components of an X.509 v3 digital certificate defined in RFC 5280.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: Internal ASN.1 structural hierarchy of the X.509 v3 digital certificate.
              </p>
            </div>

            {/* Diagram 2: RFC 5280 Trust Chain Path Validation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: RFC 5280 3-Tier Certificate Chain Path Validation
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: Leaf */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="25" width="440" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="45" y="47" fill="#cffafe" fontWeight="bold" fontSize="9">LEAF CERTIFICATE (api.bank.in)</text>
                    <text x="260" y="47" fill="#67e8f9" font-family="monospace" fontSize="7.5">Issuer: India PKI Sub-CA | CA:FALSE</text>
                    <text x="45" y="65" fill="#a5f3fc" font-family="monospace" fontSize="7">SAN: DNS:api.bank.in • EKU: serverAuth • Signature: S_leaf</text>
                  </g>

                  {/* Arrow 1 */}
                  <line x1="250" y1="75" x2="250" y2="105" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan35)" />
                  <text x="265" y="95" fill="#06b6d4" font-family="monospace" fontSize="7">Verified by Sub-CA Key</text>

                  {/* Tier 2: Intermediate */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="105" width="440" height="50" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="45" y="127" fill="#818cf8" fontWeight="bold" fontSize="9">INTERMEDIATE CA (India PKI Sub-CA 2026)</text>
                    <text x="260" y="127" fill="#c7d2fe" font-family="monospace" fontSize="7.5">Issuer: India PKI Root CA | CA:TRUE, pathlen:0</text>
                    <text x="45" y="145" fill="#e0e7ff" font-family="monospace" fontSize="7">KeyUsage: keyCertSign, cRLSign • Signature: S_intermediate</text>
                  </g>

                  {/* Arrow 2 */}
                  <line x1="250" y1="155" x2="250" y2="185" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo35)" />
                  <text x="265" y="175" fill="#818cf8" font-family="monospace" fontSize="7">Verified by Root Key</text>

                  {/* Tier 3: Root CA in Trust Store */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="185" width="440" height="55" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="45" y="207" fill="#34d399" fontWeight="bold" fontSize="9">ROOT CA (India PKI Root CA - In OS Trust Store)</text>
                    <text x="260" y="207" fill="#d1fae5" font-family="monospace" fontSize="7.5">Self-Signed: Issuer == Subject | CA:TRUE</text>
                    <text x="45" y="227" fill="#a7f3d0" font-family="monospace" fontSize="7">TRUST ANCHOR FOUND IN OS STORE ➔ GREEN PADLOCK GRANTED!</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    RFC 5280 path validation builds and verifies the unbroken chain of trust from Leaf to Root CA.
                  </text>

                  <defs>
                    <marker id="arrowCyan35" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowIndigo35" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: The RFC 5280 3-tier certificate chain validation workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Certificate Chain Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads resolve missing intermediate certificate outages, enforce multi-domain SAN extensions, harden substation RTU path length constraints, and build ASN.1 parsers across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Certificate Chain Issue ({currentLocalScenario.challenge})
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
              Guidelines for systems engineers and web administrators managing digital certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Certificate Management Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Serve fullchain.pem:</strong> Bundle leaf and intermediate certificates together.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Populate SAN:</strong> Include all domain names and subdomains in the SAN extension.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce CA:FALSE on Leaf Certs:</strong> Prevents compromised end-entity keys from acting as sub-CAs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Verify AKI matches Parent SKI:</strong> Ensures deterministic, fast certificate path validation.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Certificate Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Serving Only leaf.crt:</strong> Causes SEC_ERROR_UNKNOWN_ISSUER on mobile browsers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on Common Name (CN):</strong> Deprecated by RFC 6125 and ignored by modern browsers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unmonitored Certificate Expiration:</strong> Causes sudden 3:00 AM production payment outages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Setting CA:TRUE on Web Certs:</strong> Creates catastrophic rogue signing vulnerabilities.</span>
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
                  <span><strong>Automate Renewals with ACME:</strong> Renew certificates every 60 days before expiration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce pathlen:0 on Sub-CAs:</strong> Restricts intermediate CAs from delegating authority.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce CCA Class 3 DSC OIDs:</strong> Ensure non-repudiation key usage for IT Act compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit Certificate Transparency:</strong> Monitor CT Merkle logs for unauthorized domain certificates.</span>
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
              Synthesize key X.509 certificate and trust chain mechanics before reviewing the comprehensive practice questions.
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
                  Why web servers must serve `fullchain.pem`: Operating systems only have Root CAs pre-installed in their trust store. They do not know about intermediate CAs unless the web server delivers the intermediate certificate alongside its leaf certificate during the TLS handshake.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The critical role of Basic Constraints `CA:FALSE`: If an end-entity certificate mistakenly contains `CA:TRUE`, the owner of that certificate can act as an intermediate CA and issue valid SSL certificates for any website in the world. Always enforce `CA:FALSE` on leaf certificates!
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your Nginx/Apache web server configurations, replace deprecated `ssl_certificate leaf.crt;` with `ssl_certificate fullchain.pem;` to ensure 100% error-free TLS connections on mobile devices and legacy clients.
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
                <span>X.509 top fields: tbsCertificate, signatureAlgorithm, signatureValue.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Subject Alternative Name (SAN) is mandatory; Common Name (CN) is deprecated.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Basic Constraints: CA:FALSE on leaf certs; CA:TRUE, pathlen:0 on intermediates.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RFC 5280 path validation: verifies dates, name chaining, signatures, and root.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Missing Intermediate CA error is fixed by bundling fullchain.pem.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Indian Class 3 DSCs require policy OID 2.16.356.100.1.3 under IT Act.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Digital Certificates (X.509) and Trust Chains FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Certificate Structure Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Digital Certificates (X.509) & Trust Chains (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Digital certificates are the bedrock of the global web. Mastering the internal ASN.1 structure of X.509 v3—from Subject Alternative Names (SAN) to Basic Constraints and Key Usage extensions—is essential for every security engineer. Always bundle the complete certificate chain (`fullchain.pem`) on your web servers to prevent mobile trust errors, enforce `CA:FALSE` on leaf certificates, and ensure all digital signatures comply with RFC 5280 path validation and Section 35 of the Indian IT Act 2000!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
