import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: Asymmetric Role Simulator State
  const [activeAsymRole, setActiveAsymRole] = useState("confidentiality");

  // Studio 2: Algorithm Benchmark Selector State
  const [selectedAlgoKey, setSelectedAlgoKey] = useState("ecc256");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_upi_ecc");

  // Studio 1: Asymmetric Role Data
  const asymRolesData = {
    confidentiality: {
      key: "confidentiality",
      title: "Confidentiality Encryption Flow",
      goal: "Ensure that ONLY the intended recipient can read the confidential payload.",
      keyUsedForOperation: "Recipient's Public Key (Bob_K_pub)",
      keyUsedForInversion: "Recipient's Private Key (Bob_K_priv)",
      senderAction: "Alice encrypts message P using Bob's publicly available Public Key: C = Enc(P, Bob_K_pub).",
      receiverAction: "Bob uses his secret Private Key to invert the trapdoor: P = Dec(C, Bob_K_priv).",
      securityProperty: "Confidentiality (Zero eavesdropper on the internet can invert the trapdoor without Bob's private key).",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    signature: {
      key: "signature",
      title: "Digital Signature & Non-Repudiation Flow",
      goal: "Prove undeniably that Alice authored the document and that it was not altered in transit.",
      keyUsedForOperation: "Signer's Private Key (Alice_K_priv)",
      keyUsedForInversion: "Signer's Public Key (Alice_K_pub)",
      senderAction: "Alice signs the cryptographic hash of document M using her Private Key: S = Sign(Hash(M), Alice_K_priv).",
      receiverAction: "Bob (and anyone in the world) verifies the signature using Alice's Public Key: Verify(Hash(M), S, Alice_K_pub).",
      securityProperty: "Authentication, Data Integrity, and Non-Repudiation (Legal validity under IT Act 2000 Section 5).",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const currentRole = asymRolesData[activeAsymRole];

  // Studio 2: Asymmetric Algorithm Benchmark Profiles
  const algoProfiles = {
    rsa2048: {
      key: "rsa2048",
      name: "RSA-2048 (Rivest-Shamir-Adleman)",
      hardProblem: "Integer Prime Factorization (Factoring N = p * q)",
      keySize: "2048 bits (256 bytes)",
      securityLevel: "112 bits of symmetric security equivalence",
      handshakeLatency: "Moderate (Heavy 2048-bit modular exponentiation calculations)",
      quantumStatus: "100% BROKEN by Shor's Algorithm running on quantum computers",
      ccaIndiaStatus: "Approved Class-3 DSC Standard under Controller of Certifying Authorities",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    rsa4096: {
      key: "rsa4096",
      name: "RSA-4096 (High-Security RSA)",
      hardProblem: "Integer Prime Factorization (Factoring N = p * q)",
      keySize: "4096 bits (512 bytes)",
      securityLevel: "128 bits of symmetric security equivalence",
      handshakeLatency: "High Latency (8x slower CPU modular multiplication than RSA-2048)",
      quantumStatus: "100% BROKEN by Shor's Algorithm (Requires slightly larger quantum registers)",
      ccaIndiaStatus: "Approved for Root & Intermediate Certificate Authority Master Keys",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    ecc256: {
      key: "ecc256",
      name: "Elliptic Curve Cryptography (ECC-256 / Ed25519)",
      hardProblem: "Elliptic Curve Discrete Logarithm Problem (ECDLP: Q = k * P)",
      keySize: "256 bits (32 bytes - 8x to 16x smaller than RSA!)",
      securityLevel: "128 bits of symmetric security equivalence (Matches AES-128 / RSA-3072)",
      handshakeLatency: "Ultra-Fast (Near-zero CPU overhead; optimal for mobile UPI & TLS 1.3)",
      quantumStatus: "100% BROKEN by Shor's Algorithm (Requires ~2,330 logical qubits)",
      ccaIndiaStatus: "Standardized in modern banking API gateways & Reserve Bank frameworks",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    ml_kem768: {
      key: "ml_kem768",
      name: "Post-Quantum ML-KEM-768 (CRYSTALS-Kyber / FIPS 203)",
      hardProblem: "Module Learning with Errors (MLWE) in High-Dimensional Lattices",
      keySize: "Public Key: 1,184 bytes | Ciphertext: 1,088 bytes",
      securityLevel: "NIST Security Category 3 (128-bit Post-Quantum Classical Security)",
      handshakeLatency: "High Throughput (Lattice vector matrix operations execute in microseconds)",
      quantumStatus: "100% QUANTUM RESISTANT (Immune to Shor's and Grover's algorithms)",
      ccaIndiaStatus: "NIST FIPS 203 Standard (In pilot adoption across Indian defense & banking)",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  };

  const activeAlgo = algoProfiles[selectedAlgoKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_upi_ecc",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "UPI Banking API ECC-256 Migration",
      budget: "₹9,50,000",
      focus: "Bloated RSA-2048 Handshake Latency on Mobile UPI Gateways",
      dilemma:
        "High payload latency during peak transaction hours due to bloated 2048-bit RSA certificates on mobile devices causing transaction timeouts.",
      resolution:
        "Mamata migrated banking API endpoints to ECC-256 (secp256k1 & Ed25519), reducing cryptographic handshake bandwidth by 85% while maintaining 128-bit security and 100% RBI compliance.",
      metrics: {
        bandwidthSaved: "85% Smaller Certificate Payloads",
        handshakeLatency: "Dropped from 120ms to 14ms",
        securityStrength: "128-bit Symmetric Equivalence",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_dsc_ehr",
      lead: "Mahima",
      role: "Chief Healthcare Technology Officer",
      location: "Ichapur General Hospital",
      title: "Hospital EHR Class-3 DSC Integration",
      budget: "₹5,20,000",
      focus: "Non-Repudiation for Clinical Discharge Summaries",
      dilemma:
        "Clinical discharge summaries and e-prescriptions lacked tamper-evident non-repudiation, creating legal liability in medical malpractice disputes.",
      resolution:
        "Mahima implemented CCA India Class-3 Digital Signature Certificates on hardware crypto-tokens for 180+ doctors, securing 50,000+ patient records under Section 5 of the IT Act 2000 and DPDP Act 2023.",
      metrics: {
        doctorsEquipped: "180+ Class-3 FIPS USB Tokens",
        recordsSigned: "50,000+ Electronic Health Profiles",
        legalAdmissibility: "100% IT Act Section 5 Compliant",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_mtls",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA TLS 1.3 Mutual Authentication (mTLS)",
      budget: "₹8,80,000",
      focus: "Machine-to-Machine Substation Device Authentication",
      dilemma:
        "Securing machine-to-machine RTU communication channels against rogue spoofing across 220kV power substations.",
      resolution:
        "Debangshu deployed TLS 1.3 Mutual Authentication (mTLS) with Ephemeral Elliptic Curve Diffie-Hellman (ECDHE), guaranteeing Perfect Forward Secrecy and zero rogue substation device injection.",
      metrics: {
        pfsEnforced: "100% Ephemeral ECDHE Key Exchange",
        rogueDeviceRejection: "100% Client Certificate Validation",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_ecc_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Elliptic Curve Point Multiplication Laboratory",
      budget: "₹4,00,000",
      focus: "Double-and-Add Algorithm & Lattice PQC Mathematics",
      dilemma:
        "Teaching students how the Double-and-Add algorithm calculates Q = k * P over elliptic curves in Python without point doubling errors.",
      resolution:
        "The team authored a mathematical visualization toolkit demonstrating geometric point addition (P + Q = R) and scalar multiplication, guiding 140+ students through mastering ECC and Post-Quantum Kyber lattices.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        pythonVisualizersAuthored: "Elliptic Curve Double-and-Add Engine",
        pqcModulesTested: "NIST FIPS 203 ML-KEM Lattices",
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
            Cyber Security Module 002_004 • Topic 5 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Asymmetric Key Cryptography (Public Key Cryptography)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the mathematics of public-key cryptography: master One-Way Trapdoor Functions, 
            Confidentiality vs Digital Signatures, Elliptic Curve Cryptography (ECC), PKI X.509 trust chains, and NIST Post-Quantum standards (FIPS 203 / 204).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Asymmetric Key Dual-Role Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎭</span> Studio 1: Asymmetric Dual-Role Simulator (Encryption vs Signatures)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle between Confidentiality Encryption and Digital Signatures to inspect which key is used for the operation, which key inverts the trapdoor, and the resulting security property.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "confidentiality", label: "Mode A: Confidentiality Encryption", sub: "Encrypt with Recipient Public Key" },
              { id: "signature", label: "Mode B: Digital Signature & Non-Repudiation", sub: "Sign with Sender Private Key" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveAsymRole(m.id)}
                className={clsx(
                  "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                  activeAsymRole === m.id
                    ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                    : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                )}
              &gt;
                <div className="font-bold text-sm text-gray-200">{m.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{m.sub}</div>
              </button>
            ))}
          </div>

          {/* Active Mode Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentRole.badgeClass)}>
                  {currentRole.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentRole.goal}
                </h3>
              </div>
            </div>

            {/* Key Mechanics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Key Used For Operation</span>
                <span className="font-mono text-emerald-400 font-bold text-sm block">{currentRole.keyUsedForOperation}</span>
                <p className="text-gray-300 leading-relaxed pt-1">{currentRole.senderAction}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Key Used For Inversion / Verification</span>
                <span className="font-mono text-indigo-300 font-bold text-sm block">{currentRole.keyUsedForInversion}</span>
                <p className="text-gray-300 leading-relaxed pt-1">{currentRole.receiverAction}</p>
              </div>
            </div>

            {/* Security Property */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Security &amp; Legal Guarantee:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{currentRole.securityProperty}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Asymmetric Algorithm Benchmark & Key Size Equivalency Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Asymmetric Benchmark &amp; Key Equivalency Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an asymmetric algorithm profile to inspect its underlying mathematical problem, key size overhead, computational latency, quantum computing resistance, and CCA India statutory compliance.
            </p>
          </div>

          {/* Algorithm Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(algoProfiles).map((alg) => {
              const isSelected = selectedAlgoKey === alg.key;
              return (
                <button
                  key={alg.key}
                  onClick={() => setSelectedAlgoKey(alg.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{alg.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{alg.keySize.split(" ")[0]} Bits</div>
                </button>
              );
            })}
          </div>

          {/* Active Algorithm Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeAlgo.badgeClass)}>
                  {activeAlgo.securityLevel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeAlgo.name}
                </h3>
              </div>
            </div>

            {/* Hard Problem Box */}
            <div className="p-4 bg-gray-900 rounded-xl border border-blue-900/30 text-xs space-y-1">
              <span className="text-blue-400 font-bold uppercase tracking-wider block">Underlying Number-Theoretic Hard Problem:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeAlgo.hardProblem}</p>
            </div>

            {/* 3 Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Key Size Overhead</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeAlgo.keySize}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Handshake Latency</span>
                <span className="font-bold text-emerald-400 text-xs sm:text-sm">{activeAlgo.handshakeLatency}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Quantum Status (Shor's Algorithm)</span>
                <span className={clsx("font-bold text-xs sm:text-sm", activeAlgo.key === "ml_kem768" ? "text-emerald-400" : "text-rose-400")}>
                  {activeAlgo.quantumStatus.split(" ")[0]}
                </span>
              </div>
            </div>

            {/* CCA India Status */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-amber-900/30 text-xs space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Indian Legal &amp; CCA Status:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeAlgo.ccaIndiaStatus}</p>
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
              Visualizing the Dual Workflows of Public-Key Cryptography and Geometric Elliptic Curve Point Addition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Encryption vs Digital Signature */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Public Key Encryption vs Digital Signature
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: Confidentiality */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="110" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="10">1. CONFIDENTIALITY ENCRYPTION WORKFLOW</text>
                    <rect x="35" y="65" width="115" height="40" rx="4" fill="#1e1b4b" />
                    <text x="92" y="88" fill="#c7d2fe" textAnchor="middle" fontSize="8.5">Sender: Enc(P, Bob_Pub)</text>
                    <line x1="150" y1="85" x2="330" y2="85" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo22)" />
                    <text x="240" y="77" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">Ciphertext (C)</text>
                    <rect x="335" y="65" width="130" height="40" rx="4" fill="#064e3b" />
                    <text x="400" y="88" fill="#d1fae5" textAnchor="middle" fontSize="8.5">Receiver: Dec(C, Bob_Priv)</text>
                  </g>

                  {/* Bottom: Digital Signature */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="150" width="460" height="115" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="172" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">2. DIGITAL SIGNATURE WORKFLOW (Non-Repudiation)</text>
                    <rect x="35" y="190" width="125" height="45" rx="4" fill="#064e3b" />
                    <text x="97" y="212" fill="#d1fae5" textAnchor="middle" fontSize="8.5">Signer: Sign(Hash, Alice_Priv)</text>
                    <line x1="160" y1="212" x2="320" y2="212" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen22)" />
                    <text x="240" y="205" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">Signature + Message</text>
                    <rect x="325" y="190" width="140" height="45" rx="4" fill="#1e1b4b" />
                    <text x="395" y="212" fill="#c7d2fe" textAnchor="middle" fontSize="8.5">Verifier: Verify(Hash, Sig, Alice_Pub)</text>
                  </g>

                  <text x="250" y="290" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    IT Act 2000 Section 5: Asymmetric signatures provide full legal non-repudiation in courts.
                  </text>

                  <defs>
                    <marker id="arrowIndigo22" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGreen22" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The dual operational workflows of asymmetric cryptography: Encryption vs Digital Signatures.
              </p>
            </div>

            {/* Diagram 2: Elliptic Curve Geometric Addition */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>📐</span> Diagram B: Elliptic Curve Geometric Point Addition ($P + Q = R$)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Coordinate Axes */}
                  <line x1="50" y1="160" x2="450" y2="160" stroke="#475569" strokeWidth="1" />
                  <line x1="200" y1="30" x2="200" y2="290" stroke="#475569" strokeWidth="1" />
                  <text x="440" y="150" fill="#94a3b8" fontSize="8">X</text>
                  <text x="210" y="45" fill="#94a3b8" fontSize="8">Y</text>

                  {/* Elliptic Curve (y^2 = x^3 - 3x + 3) Smooth Path */}
                  <path
                    d="M 120 160 C 130 90, 160 80, 200 95 C 260 115, 320 80, 420 40"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                  <path
                    d="M 120 160 C 130 230, 160 240, 200 225 C 260 205, 320 240, 420 280"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />

                  {/* Secant Line connecting P, Q, and -R */}
                  <line x1="150" y1="100" x2="380" y2="260" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Point P */}
                  <circle cx="170" cy="115" r="4" fill="#34d399" />
                  <text x="160" y="108" fill="#34d399" fontWeight="bold" fontSize="9">P</text>

                  {/* Point Q */}
                  <circle cx="280" cy="190" r="4" fill="#34d399" />
                  <text x="290" y="195" fill="#34d399" fontWeight="bold" fontSize="9">Q</text>

                  {/* Point -R (Intersection) */}
                  <circle cx="360" cy="245" r="4" fill="#ef4444" />
                  <text x="375" y="245" fill="#ef4444" fontSize="8">-R</text>

                  {/* Reflection Vertical Line to +R */}
                  <line x1="360" y1="245" x2="360" y2="75" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2 2" />

                  {/* Point R (P + Q) */}
                  <circle cx="360" cy="75" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1" />
                  <text x="375" y="80" fill="#d8b4fe" fontWeight="bold" fontSize="10">R = P + Q</text>

                  <text x="250" y="305" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Double-and-Add computes Q = k * P in O(log k); reversing to find scalar k is computationally impossible!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: Geometric Elliptic Curve Point Addition ($P + Q = R$) defining the ECDLP trapdoor problem.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Public Key Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads optimize mobile UPI banking with ECC-256, deploy Class-3 DSCs in hospital wards, enforce SCADA mTLS ECDHE, and author Python ECC labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Public Key Dilemma ({currentLocalScenario.focus})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Architecture Action &amp; Remediation
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
              Guidelines for cryptographic engineers designing public-key infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Public Key Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Default to ECC (Ed25519 / P-256):</strong> 10x smaller keys with identical 128-bit security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Perfect Forward Secrecy:</strong> Use ECDHE to protect past network sessions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Store Private Keys in Hardware:</strong> Class-3 DSCs must reside in FIPS 140-2 USB crypto-tokens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Prepare for PQC Migration:</strong> Track NIST FIPS 203 (ML-KEM) and FIPS 204 (ML-DSA).</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Asymmetric Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Encrypting with Own Private Key:</strong> Private keys are for SIGNING, not encrypting confidential data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Textbook RSA:</strong> Omitting OAEP padding allows multiplicative ciphertext manipulation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring ECDSA Nonce Bias:</strong> Reusing or biasing the random nonce leaks the private key.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unauthenticated Diffie-Hellman:</strong> Exposes networks to Man-in-the-Middle key substitution.</span>
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
                  <span><strong>Enforce Certificate Pinning / CAA:</strong> Restrict which CAs can issue certificates for your domain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with IT Act Section 35:</strong> Deploy CCA-licensed Class-3 DSCs for legal signatures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate OCSP Stapling:</strong> Verify certificate revocation status in real time with zero latency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Hybrid PQC / Classical Handshakes:</strong> Combine X25519 with Kyber-768 for future-proof security.</span>
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
              Synthesize key asymmetric cryptography and PKI concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cryptographic Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  The dual nature of the asymmetric key pair: if you want to send a secret to Bob, you encrypt with Bob's Public Key (so only Bob can open it). If you want to prove you wrote a message, you sign with your own Private Key (so everyone can verify your authorship with your Public Key).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why Elliptic Curve Cryptography (ECC) revolutionized mobile and cloud security: by basing security on the Elliptic Curve Discrete Logarithm Problem (ECDLP), a 256-bit ECC key achieves the same 128-bit security margin as a 3072-bit RSA key, drastically reducing packet size and computation time.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your TLS and SSH configurations, always enforce Ephemeral Diffie-Hellman (ECDHE) to guarantee Perfect Forward Secrecy (PFS), ensuring that compromising server private keys in the future cannot decrypt past recorded network sessions.
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
                <span>Asymmetric crypto uses Public Key (open) + Private Key (secret).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Confidentiality: Encrypt with Recipient Public Key -&gt; Decrypt with Recipient Private Key.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Digital Signature: Sign with Sender Private Key -&gt; Verify with Sender Public Key.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3 Hard Problems: Prime Factorization (RSA), Discrete Log (DH), ECDLP (ECC).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ECC-256 provides equivalent security to RSA-3072 with 10x smaller key size.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 35 and 5 legally recognize Class-3 DSCs under CCA India.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Asymmetric Key Cryptography (Public Key Cryptography) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Asymmetric Key Cryptography (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Asymmetric Key Cryptography is the crown jewel of mathematical computer science. Without the genius of Diffie, Hellman, Merkle, Rivest, Shamir, and Adleman, the global internet as we know it could never have been built. Understand how one-way trapdoor functions enable trust between strangers, why ECC dominates modern mobile devices, and how digital signatures achieve legal non-repudiation under Indian law."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
