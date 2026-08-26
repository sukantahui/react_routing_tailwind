import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Studio 1: Sector Architecture State
  const [selectedSectorKey, setSelectedSectorKey] = useState("banking_fintech");

  // Studio 2: Next-Gen Technology Switcher State
  const [activeNextGenKey, setActiveNextGenKey] = useState("post_quantum_lattice");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_tokenization_hsm");

  // Studio 1: 4 Industrial Sectors Data
  const sectorProfiles = {
    banking_fintech: {
      key: "banking_fintech",
      name: "1. Banking & Real-Time FinTech",
      cryptoStack: "FIPS 140-3 Level 4 Hardware Security Modules (HSMs), ISO 9564 PIN Blocks, AES-256 CoFT Tokenization.",
      watermarkStack: "Dynamic transaction session forensic logging and tamper-evident digital signature audit trails.",
      threatDefeated: "ATM PIN skimming, Man-in-the-Middle wire replay, and database credit card PAN exfiltration.",
      compliance: "RBI Master Direction on Cyber Security, NPCI UPI Cryptographic Framework, PCI-DSS v4.0.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    cloud_e2ee: {
      key: "cloud_e2ee",
      name: "2. Cloud & E2EE Communications",
      cryptoStack: "TLS 1.3 (ECDHE + AES-256-GCM), Signal Protocol Double Ratchet, WireGuard ChaCha20-Poly1305.",
      watermarkStack: "Dynamic user email and timestamp watermarking on exported cloud PDFs and screenshots.",
      threatDefeated: "Mass internet surveillance, unauthenticated packet eavesdropping, and historical session decryption.",
      compliance: "Zero Trust Architecture (ZTA), IT Act Section 43A, India DPDP Act 2023.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    scada_ot_grid: {
      key: "scada_ot_grid",
      name: "3. Critical OT & Power Grid SCADA",
      cryptoStack: "IEC 62351-3/5 mutual TLS (mTLS), DNP3 SAv5 HMAC-SHA256, TPM 2.0 Measured Boot.",
      watermarkStack: "Semi-fragile 2D-DWT wavelets embedded in GIS cadastral maps and substation wiring schematics.",
      threatDefeated: "Cyber warfare grid blackouts, unauthorized circuit breaker tripping, and malware rootkits.",
      compliance: "Central Electricity Authority (CEA) Cyber Security Regulations, NCIIPC CII Directives.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    multimedia_drm: {
      key: "multimedia_drm",
      name: "4. Multimedia DRM & OTT Streaming",
      cryptoStack: "Google Widevine L1 / Apple FairPlay Hardware TEE AES-128 video path, HDCP 2.2 HDMI crypto.",
      watermarkStack: "Real-time DWT-DCT spread spectrum forensic traitor tracing embedded in 4K streaming video frames.",
      threatDefeated: "Pre-release screener theft, live 4K restreaming piracy, and screen recording capture.",
      compliance: "Indian Copyright Act 1957 Section 65A (TPM) & Section 65B (RMI / Watermarks).",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeSector = sectorProfiles[selectedSectorKey];

  // Studio 2: Next-Gen Technology Profiles Data
  const nextGenProfiles = {
    post_quantum_lattice: {
      key: "post_quantum_lattice",
      name: "Post-Quantum Lattice Cryptography (FIPS 203 ML-KEM & FIPS 204 ML-DSA)",
      mathProblem: "Module Learning with Errors (MLWE) and Module Short Integer Solution (MSIS) in high-dimensional lattices.",
      realWorldUse: "Hybrid TLS 1.3 (X25519Kyber768Draft00) securing global web traffic against 'Harvest Now, Decrypt Later' quantum attacks.",
      performance: "Microsecond execution speed; public key size ~1,184 bytes; 100% immune to Shor's algorithm.",
      roadmap: "NIST FIPS 203 standardized Aug 2024; active pilot adoption across Indian banking and defense networks.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    fully_homomorphic: {
      key: "fully_homomorphic",
      name: "Fully Homomorphic Encryption (FHE / CKKS & BFV Schemes)",
      mathProblem: "Ring Learning with Errors (RLWE) enabling arbitrary addition and multiplication over encrypted ciphertexts.",
      realWorldUse: "Private cloud AI inference: hospitals run cancer diagnostic AI on encrypted genomic data without decrypting in RAM.",
      performance: "High computational overhead (~100x to 1000x slower than plaintext), optimized via GPU/FPGA hardware accelerators.",
      roadmap: "Standardized in ISO/IEC 18033-8; deployed in high-security genomic research and confidential financial analytics.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    zero_knowledge: {
      key: "zero_knowledge",
      name: "Zero-Knowledge Succinct Proofs (zk-SNARKs & zk-STARKs)",
      mathProblem: "Elliptic curve pairings and polynomial commitment schemes (KZG / FRI) proving knowledge without data disclosure.",
      realWorldUse: "Privacy-preserving digital identity (e.g. proving 'Age &ge; 18' without revealing Aadhaar birthdate) and blockchain rollups.",
      performance: "Succinct proof size (<500 bytes); sub-millisecond verification time on resource-constrained mobile devices.",
      roadmap: "Integrated into next-generation Web3 identity protocols and national digital governance frameworks.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeNextGen = nextGenProfiles[activeNextGenKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_tokenization_hsm",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Zero-Latency 20M Card Tokenization Switch",
      budget: "₹9,50,000",
      challenge: "Processing 20 Million Card Tokens at 15,000 TPS under RBI CoFT",
      dilemma:
        "Migrating 20 Million customer card transactions to RBI Card-on-File Tokenization (CoFT) without incurring checkout transaction latency or dropped payments.",
      resolution:
        "Mamata deployed cluster-redundant FIPS 140-3 Level 4 HSMs running AES-256 tokenization at 15,000 TPS, achieving 0.8ms token resolution and 100% RBI compliance.",
      metrics: {
        tokensManaged: "20 Million Saved Cards",
        peakThroughput: "15,000 TPS Hardware Speed",
        latency: "0.8ms Cryptographic Lookup",
        compliance: "RBI Card-on-File Tokenization Mandate"
      }
    },
    {
      id: "ichapur_abdm_pacs",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "ABDM-Compliant Multi-Hospital PACS Cloud",
      budget: "₹5,20,000",
      challenge: "Connecting 12 Oncology Centers with Lossless Diagnostic Security",
      dilemma:
        "Connecting 12 regional hospital oncology centers to Ayushman Bharat Digital Mission (ABDM) while protecting 100,000+ patient MRI scans from data leaks.",
      resolution:
        "Mahima deployed AES-256 envelope encryption with Reversible DICOM watermarking, achieving 100% bit-for-bit lossless diagnostic reconstruction and zero DPDP Act liability.",
      metrics: {
        mriScansSecured: "100,000+ DICOM Records",
        diagnosticReversibility: "100% Bit-for-Bit Lossless",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_iec62351_grid",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "IEC 62351 Encrypted SCADA 220kV Grid",
      budget: "₹8,80,000",
      challenge: "Securing 220kV Power Grid Against Cyber Warfare Breaker Tripping",
      dilemma:
        "Securing mission-critical 220kV power distribution substations against cyber warfare grid tripping and rogue Modbus packet injection attacks.",
      resolution:
        "Debangshu deployed IEC 62351-3/5 encrypted SCADA links with DNP3 Secure Authentication (SAv5) and TPM 2.0 Secure Boot, achieving 100.00% grid stability and zero unauthorized control injections.",
      metrics: {
        substationsProtected: "18 High-Voltage Substations",
        controlCommandSecurity: "100% IEC 62351 Authenticated",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_pqc_supercomputer",
      lead: "Abhronila & Susmita",
      role: "University Quantum Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "NIST FIPS 203 ML-KEM Quantum Supercomputer Lab",
      budget: "₹4,00,000",
      challenge: "Preparing Bengal Engineers for Post-Quantum & FHE Migration",
      dilemma:
        "Preparing Bengal engineering students for the post-quantum transition by implementing ML-KEM lattice key encapsulation and Fully Homomorphic Encryption in Python.",
      resolution:
        "The team built a university post-quantum cryptographic testbed bench-testing FIPS 203 Kyber-768 and Fully Homomorphic Encryption (CKKS), training 140+ students on next-generation quantum defense.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        pqcAlgorithmsBenchmarked: "FIPS 203 ML-KEM & FIPS 204 ML-DSA",
        fheEnginesTested: "CKKS Homomorphic AI Matrix",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cyber Security Module 002_004 • Topic 11 of 12 (Module Capstone)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Real-World Applications of Cryptography and Watermarking
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Synthesize the complete cryptographic universe: master UPI payments &amp; HSMs, TLS 1.3 &amp; Signal E2EE, 
            IEC 62351 power grid SCADA, 4K Widevine DRM, Post-Quantum lattice cryptography (FIPS 203/204), and DPDP Act 2023 compliance.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Enterprise Cryptographic Sector Architecture Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 1: Cross-Sector Cryptographic Architecture Explorer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 4 core industrial sectors to inspect its cryptographic primitives, watermarking mechanisms, threat vectors defeated, and Indian statutory standards.
            </p>
          </div>

          {/* Sector Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(sectorProfiles).map((sec) => {
              const isSelected = selectedSectorKey === sec.key;
              return (
                <button
                  key={sec.key}
                  onClick={() => setSelectedSectorKey(sec.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{sec.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{sec.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Sector Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSector.badgeClass)}>
                Sector Architecture: {activeSector.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                Production Cryptographic Stack
              </h3>
            </div>

            {/* Crypto Stack vs Watermark Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Cryptographic Security Primitives:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeSector.cryptoStack}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Watermarking &amp; Forensic Provenance:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeSector.watermarkStack}</p>
              </div>
            </div>

            {/* Threats Defeated & Regulatory Mandate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Threat Vectors Defeated:</span>
                <p className="text-gray-300 leading-relaxed">{activeSector.threatDefeated}</p>
              </div>

              <div className="bg-gray-900/90 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Indian &amp; Global Regulatory Standards:</span>
                <p className="text-gray-300 leading-relaxed font-mono">{activeSector.compliance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Next-Gen Quantum-Resistant & Homomorphic Encryption Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔮</span> Studio 2: Next-Gen Quantum &amp; Homomorphic Frontiers
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore the bleeding-edge frontiers of applied cryptography: Post-Quantum Lattice Cryptography (FIPS 203), Fully Homomorphic Encryption (FHE), and Zero-Knowledge Proofs (zk-SNARKs).
            </p>
          </div>

          {/* Next-Gen Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(nextGenProfiles).map((tech) => {
              const isSelected = activeNextGenKey === tech.key;
              return (
                <button
                  key={tech.key}
                  onClick={() => setActiveNextGenKey(tech.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-sm text-gray-200">{tech.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{tech.name.includes("(") ? tech.name.split("(")[1].replace(")", "") : "Technology"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Next-Gen Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeNextGen.badgeClass)}>
                Advanced Technology: {activeNextGen.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                Underlying Hard Mathematics &amp; Industrial Application
              </h3>
            </div>

            {/* Math vs Real-World */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Hard Mathematical Foundation:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeNextGen.mathProblem}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Real-World Production Deployment:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeNextGen.realWorldUse}</p>
              </div>
            </div>

            {/* Performance & Roadmap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Execution Performance &amp; Key Overhead</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeNextGen.performance}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Industry Standardization &amp; Adoption</span>
                <span className="font-bold text-indigo-300 text-xs sm:text-sm">{activeNextGen.roadmap}</span>
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
              Visualizing the End-to-End Enterprise Cryptographic Ecosystem and the Hybrid Post-Quantum Migration Handshake.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Enterprise Ecosystem */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: End-to-End Enterprise Cryptographic Ecosystem
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Banking Layer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="35" y="47" fill="#34d399" fontWeight="bold" fontSize="9">1. BANKING &amp; UPI LAYER</text>
                    <text x="180" y="47" fill="#cbd5e1" font-family="monospace" fontSize="8">NPCI UPI Switch ➔ FIPS 140-3 HSM ➔ Card Tokenization</text>
                    <text x="450" y="47" fill="#34d399" textAnchor="end" fontSize="7.5">RBI Compliant</text>
                    <text x="35" y="68" fill="#94a3b8" fontSize="7.5">ISO 9564 PIN blocks processed exclusively inside tamper-resistant hardware silicon.</text>
                  </g>

                  {/* Cloud & Communications Layer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="95" width="460" height="55" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="35" y="117" fill="#818cf8" fontWeight="bold" fontSize="9">2. CLOUD &amp; E2EE COMMUNICATIONS</text>
                    <text x="210" y="117" fill="#cbd5e1" font-family="monospace" fontSize="8">TLS 1.3 (ECDHE+AES-GCM) ➔ Signal Double Ratchet</text>
                    <text x="450" y="117" fill="#818cf8" textAnchor="end" fontSize="7.5">Zero Trust</text>
                    <text x="35" y="138" fill="#94a3b8" fontSize="7.5">Mutual TLS (mTLS) with automated SPIFFE certificates and ephemeral forward secrecy.</text>
                  </g>

                  {/* Critical OT Power Grid Layer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="165" width="460" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="35" y="187" fill="#fbbf24" fontWeight="bold" fontSize="9">3. CRITICAL SCADA POWER GRID</text>
                    <text x="195" y="187" fill="#cbd5e1" font-family="monospace" fontSize="8">IEC 62351-3/5 ➔ DNP3 SAv5 ➔ TPM 2.0 Secure Boot</text>
                    <text x="450" y="187" fill="#fbbf24" textAnchor="end" fontSize="7.5">CEA Standards</text>
                    <text x="35" y="208" fill="#94a3b8" fontSize="7.5">Cryptographic authentication blocks unauthorized circuit breaker trip commands.</text>
                  </g>

                  {/* Healthcare & DRM Layer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="235" width="460" height="55" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="35" y="257" fill="#c084fc" fontWeight="bold" fontSize="9">4. HEALTHCARE &amp; MULTIMEDIA DRM</text>
                    <text x="215" y="257" fill="#cbd5e1" font-family="monospace" fontSize="8">Reversible DICOM Watermarking ➔ Widevine L1 TEE</text>
                    <text x="450" y="257" fill="#c084fc" textAnchor="end" fontSize="7.5">DPDP Compliant</text>
                    <text x="35" y="278" fill="#94a3b8" fontSize="7.5">Lossless radiology scan reconstruction + real-time 4K forensic traitor tracing.</text>
                  </g>

                  <text x="250" y="310" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Unified Enterprise Security: Applied Cryptography and Watermarking protect modern civilization.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.1: The cross-sector enterprise cryptographic ecosystem spanning Banking, Cloud, SCADA, and Healthcare.
              </p>
            </div>

            {/* Diagram 2: Hybrid Post-Quantum Handshake */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Hybrid Post-Quantum Handshake (X25519 + Kyber-768)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Classical Key Exchange */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="200" height="95" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="125" y="55" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">CLASSICAL X25519 ECDH</text>
                    <text x="125" y="75" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8.5">Shared Secret: Z_classical</text>
                    <text x="125" y="95" fill="#38bdf8" textAnchor="middle" fontSize="8">• 32-Byte Scalar Point Math</text>
                    <text x="125" y="112" fill="#fca5a5" textAnchor="middle" fontSize="7.5">Vulnerable to Shor's Algorithm</text>
                  </g>

                  {/* Right: Quantum Lattice Key Exchange */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="275" y="30" width="200" height="95" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="375" y="55" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">POST-QUANTUM ML-KEM-768</text>
                    <text x="375" y="75" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">Shared Secret: Z_quantum</text>
                    <text x="375" y="95" fill="#34d399" textAnchor="middle" fontSize="8">• High-Dim Lattice Vectors</text>
                    <text x="375" y="112" fill="#34d399" textAnchor="middle" fontSize="7.5">100% Quantum Immune!</text>
                  </g>

                  {/* HKDF Combination */}
                  <path d="M 125 125 L 125 160 L 250 160" stroke="#6366f1" strokeWidth="1.5" />
                  <path d="M 375 125 L 375 160 L 250 160" stroke="#10b981" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="100" y="165" width="300" height="50" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="187" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      HKDF( Z_classical || Z_quantum )
                    </text>
                    <text x="250" y="203" fill="#cbd5e1" textAnchor="middle" fontSize="7.5">
                      Combines classical &amp; quantum entropy into unified session key!
                    </text>
                  </g>

                  {/* Output Symmetric AES Key */}
                  <line x1="250" y1="215" x2="250" y2="245" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold25)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="245" width="400" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="268" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      FINAL AES-256-GCM SESSION KEY (UNBREAKABLE BY ANY COMPUTER)
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowGold25" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.2: Hybrid Post-Quantum TLS 1.3 Key Encapsulation uniting classical and quantum lattice shared secrets.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Enterprise Applied Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads deploy 20M card tokenization HSMs, connect hospital PACS to ABDM, enforce IEC 62351 on 220kV power lines, and benchmark Post-Quantum ML-KEM across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Enterprise Challenge ({currentLocalScenario.challenge})
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
              Guidelines for enterprise Chief Information Security Officers (CISOs) and lead security architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Applied Security Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Envelope Encryption:</strong> Wrap local Data Keys (DEKs) using HSM Master Keys (KEKs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Crypto-Shredding:</strong> Dedicated user DEKs fulfill DPDP Act erasure mandates in milliseconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Standardize on TLS 1.3:</strong> Enforce Ephemeral Diffie-Hellman (ECDHE) for Perfect Forward Secrecy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce CERT-In 6-Hour Reporting:</strong> Automated incident response playbooks for key leaks.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Applied Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Storing Keys in Source Code:</strong> Root private keys committed to Git cause immediate breach disasters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Software PIN Blocks:</strong> Violates RBI mandates requiring FIPS 140-3 Hardware Security Modules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Permanent Lossy Medical Watermarks:</strong> Permanent pixel noise impairs clinical diagnosis in DICOM scans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Post-Quantum Migration:</strong> Leaves traffic vulnerable to 'Harvest Now, Decrypt Later'.</span>
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
                  <span><strong>Pilot Hybrid PQC (Kyber+X25519):</strong> Deploy quantum-safe key exchange across enterprise edge servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act Section 33:</strong> Avoid up to ₹250 Crores in statutory penalties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce IEC 62351 in SCADA:</strong> Cryptographically sign breaker control commands with RSA-PSS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Zero-Knowledge Proofs:</strong> Protect customer privacy during biometric and age verification.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Module Capstone Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Review the capstone checklist synthesizing all 12 topics of Module 002_004 before taking the comprehensive final examination.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Enterprise Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  How all cryptographic primitives unite into a cohesive defense: Asymmetric cryptography (ECDHE/PQC) establishes identity and trust; Symmetric ciphers (AES-256-GCM) provide high-speed armor; Hash functions (SHA-256) ensure tamper-proof integrity; and Digital Watermarking preserves forensic provenance.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The Indian statutory landscape: Under the IT Act 2000, DPDP Act 2023, and Indian Copyright Act 1957, cryptographic key protection, 6-hour incident reporting to CERT-In, and watermark preservation are not just technical best practices—they are strict legal mandates with severe criminal and financial consequences.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your production systems, begin adopting NIST FIPS 203 (ML-KEM) hybrid key encapsulation today to protect your organization's confidential data against quantum 'Harvest Now, Decrypt Later' adversaries.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Module 002_004 Capstone Checklist (100% Mastery Verification)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>UPI payments use ECC device keys, Bank RSA PIN blocks, and FIPS 140-3 HSMs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RBI Card Tokenization (CoFT) replaces 16-digit PANs with AES-256 tokens.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Signal Protocol uses Double Ratchet for self-healing message forward secrecy.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IEC 62351 enforces TLS 1.3 and DNP3 SAv5 authentication in power grids.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Widevine L1 DRM decrypts 4K video directly inside hardware TEE secure memory.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Reversible DICOM watermarking restores medical scans 100% losslessly for diagnosis.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST Post-Quantum standards: FIPS 203 (ML-KEM / Kyber) &amp; FIPS 204 (ML-DSA).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Crypto-shredding fulfills DPDP Act Right to be Forgotten by destroying user DEKs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates reporting all private key leaks and incidents within 6 hours.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Real-World Applications of Cryptography and Watermarking FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Real-World Applications of Cryptography and Watermarking (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 002_004: Cryptography, Watermarking & Cipher Types! We have traversed from the ancient Caesar and Vigenère ciphers to 56-bit DES, the Sweet32 downfall of 3DES, the unbreakable Substitution-Permutation Network of AES-256, the mathematical beauty of Elliptic Curve Diffie-Hellman, SHA-256 forensic hashing, digital signatures, transform-domain watermarking, and the post-quantum lattice horizon (NIST FIPS 203 ML-KEM). You now possess the comprehensive theoretical and engineering foundation required to secure enterprise banking, healthcare, power grids, and cloud ecosystems. Carry these principles forward with pride!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
