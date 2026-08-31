import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Studio 1: Asymmetric Role Simulator State
  const [activeRsaMode, setActiveRsaMode] = useState("confidentiality");

  // Studio 2: RSA Evolution Selector State
  const [selectedKeyLength, setSelectedKeyLength] = useState("rsa2048");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_rsa2048_upgrade");

  // Studio 1: Asymmetric Mode Data
  const rsaModesData = {
    confidentiality: {
      key: "confidentiality",
      title: "1. Confidentiality Encryption Mode",
      goal: "Ensure that ONLY the intended recipient can read the confidential payload.",
      keyUsedForOperation: "Recipient's Public Key: (e, N) [e.g. e = 65537]",
      keyUsedForInversion: "Recipient's Private Key: (d, N) [Secret modular inverse]",
      mathOperation: "Encryption: C ≡ M^e (mod N)  |  Decryption: M ≡ C^d (mod N)",
      eulerProof: "(M^e)^d ≡ M^(e*d) ≡ M^(1 + k*φ(N)) ≡ M (mod N)",
      securityGuarantee: "Zero eavesdroppers on the internet can invert modular powers without private key d.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    signature: {
      key: "signature",
      title: "2. Digital Signature & Non-Repudiation Mode",
      goal: "Prove undeniably that Alice authored the document and that it was not altered in transit.",
      keyUsedForOperation: "Signer's Private Key: (d, N) [Kept inside FIPS 140-2 USB token]",
      keyUsedForInversion: "Signer's Public Key: (e, N) [Published in X.509 Certificate]",
      mathOperation: "Signing: S ≡ (Hash(M))^d (mod N)  |  Verification: Hash(M) ≡ S^e (mod N)",
      eulerProof: "(S)^e ≡ ((Hash(M))^d)^e ≡ Hash(M)^(d*e) ≡ Hash(M) (mod N)",
      securityGuarantee: "Full legal non-repudiation in Indian courts under IT Act 2000 Section 5.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const currentMode = rsaModesData[activeRsaMode];

  // Studio 2: RSA Key Length Profiles Data
  const rsaKeyProfiles = {
    rsa512: {
      key: "rsa512",
      name: "RSA-512 bits (155 decimal digits)",
      symmetricEquivalent: "~56 bits of security (Equivalent to single DES)",
      factoringStatus: "COMPLETELY BROKEN: Factored in 1999 (RSA-512 challenge in 6 months).",
      encryptionSpeed: "0.02 ms (Blazingly fast, but zero security)",
      ccaIndiaStatus: "Permanently obsolete and illegal for commercial transactions.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    rsa1024: {
      key: "rsa1024",
      name: "RSA-1024 bits (309 decimal digits)",
      symmetricEquivalent: "80 bits of security",
      factoringStatus: "RETIRED & BANNED: Vulnerable to nation-state supercomputers and cloud clusters.",
      encryptionSpeed: "0.04 ms (Fast)",
      ccaIndiaStatus: "Strictly banned since 2014 by CCA India and Reserve Bank of India.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    rsa2048: {
      key: "rsa2048",
      name: "RSA-2048 bits (617 decimal digits)",
      symmetricEquivalent: "112 bits of security",
      factoringStatus: "GLOBAL GOLD STANDARD: Classical factoring requires billions of CPU years (GNFS).",
      encryptionSpeed: "0.08 ms (High Throughput via e = 65537)",
      ccaIndiaStatus: "Mandatory statutory standard for Class-3 DSCs and web SSL/TLS certificates.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    rsa4096: {
      key: "rsa4096",
      name: "RSA-4096 bits (1,234 decimal digits)",
      symmetricEquivalent: "128 bits of security",
      factoringStatus: "ULTRA-HIGH SECURITY: Computationally impregnable to all known classical supercomputers.",
      encryptionSpeed: "0.25 ms (4x slower decryption than RSA-2048)",
      ccaIndiaStatus: "Standardized for Root Certificate Authorities and long-term legal archives.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeKeyProfile = rsaKeyProfiles[selectedKeyLength];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_rsa2048_upgrade",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Banking Certificate RSA-2048 Fleet Upgrade",
      budget: "₹9,50,000",
      legacyFlaw: "Legacy Payment Switches Running Deprecated 1024-bit RSA Keys",
      dilemma:
        "Legacy banking payment switch APIs were using deprecated 1024-bit RSA certificates, facing immediate RBI audit sanctions and factorization exposure.",
      resolution:
        "Mamata led the fleet-wide upgrade to RSA-2048 and RSA-4096 with SHA-256, achieving 100% RBI compliance and zero factorization risk.",
      metrics: {
        switchesUpgraded: "1,200 Payment Gateways",
        keyLengthEnforced: "2048-bit Minimum",
        factorizationRisk: "0% Mathematical Exposure",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_dsc_rsa",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Hospital Clinical EHR Class-3 DSC Integration",
      budget: "₹5,20,000",
      legacyFlaw: "Disputed Discharge Summaries Lacking Non-Repudiation",
      dilemma:
        "Hospital discharge summaries and e-prescriptions lacked tamper-evident non-repudiation in legal medical malpractice disputes.",
      resolution:
        "Mahima equipped 180+ doctors with 2048-bit RSA Class-3 DSC cryptographic USB tokens, securing 50,000+ patient records under Section 5 of the IT Act 2000 and DPDP Act 2023.",
      metrics: {
        physiciansEquipped: "180+ FIPS 140-2 Crypto Tokens",
        recordsSigned: "50,000+ Clinical EHR Profiles",
        legalAdmissibility: "100% Section 5 IT Act Validated",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_firmware_pss",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Firmware RSA-PSS Authentication",
      budget: "₹8,80,000",
      legacyFlaw: "Unauthenticated Firmware Flashing on 220kV Substation RTUs",
      dilemma:
        "Securing mission-critical 220kV power substation RTUs against unauthorized firmware tampering and rogue cyber attacks.",
      resolution:
        "Debangshu enforced RSA-PSS digital signature verification in RTU bootloader ROMs, blocking unsigned firmware binaries and ensuring 100.00% grid stability.",
      metrics: {
        firmwareIntegrity: "100% RSA-PSS Signed ROMs",
        unauthorizedCodeBlocked: "0% Rootkit Injection Surface",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_rsa_keygen_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Primality Testing & RSA KeyGen Laboratory",
      budget: "₹4,00,000",
      legacyFlaw: "Teaching Prime Factorization & Euler's Totient Inversion",
      dilemma:
        "Teaching computer science students how Miller-Rabin primality testing and Euler's Totient generate RSA keys in Python without modular arithmetic confusion.",
      resolution:
        "The team authored an interactive educational toolkit stepping through prime generation (p, q), calculating phi(N), and inverting e * d ≡ 1 mod phi(N), training 140+ students on RSA and Post-Quantum Kyber.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        pythonEnginesAuthored: "Miller-Rabin + Extended Euclidean Suite",
        mathVerified: "Euler's Totient Invariance",
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
            Cyber Security Module 002_005 • Topic 0 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Introduction to the RSA Algorithm and Asymmetric Security
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the genesis and mathematical architecture of the RSA cryptosystem: master prime factorization trapdoor functions, 
            Euler's Totient Theorem, $(e, N)$ public encryption vs $(d, N)$ private decryption, and Class-3 DSC compliance under Indian IT Act Section 5.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive RSA Key Pair & Asymmetric Trapdoor Inspector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 1: RSA Asymmetric Trapdoor &amp; Key Pair Inspector
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle between Confidentiality Encryption and Digital Signatures to inspect how RSA modular powers ($M^e \bmod N$ and $C^d \bmod N$) execute the mathematical trapdoor.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "confidentiality", label: "Mode A: Confidentiality Encryption", sub: "Public (e, N) Encrypts → Private (d, N) Decrypts" },
              { id: "signature", label: "Mode B: Digital Signature & Non-Repudiation", sub: "Private (d, N) Signs → Public (e, N) Verifies" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveRsaMode(m.id)}
                className={clsx(
                  "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                  activeRsaMode === m.id
                    ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                    : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                )}
              >
                <div className="font-bold text-sm text-gray-200">{m.label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{m.sub}</div>
              </button>
            ))}
          </div>

          {/* Active Mode Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentMode.badgeClass)}>
                {currentMode.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {currentMode.goal}
              </h3>
            </div>

            {/* Keys Used */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Key Used for Forward Operation:</span>
                <span className="font-mono text-emerald-400 font-bold text-sm block">{currentMode.keyUsedForOperation}</span>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Key Used for Trapdoor Inversion:</span>
                <span className="font-mono text-indigo-300 font-bold text-sm block">{currentMode.keyUsedForInversion}</span>
              </div>
            </div>

            {/* Mathematical Formulas */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 bg-gray-900 rounded-xl border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block">Modular Exponentiation Equation:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-extrabold">{currentMode.mathOperation}</p>
              </div>

              <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Euler's Totient Invariance Proof:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-extrabold">{currentMode.eulerProof}</p>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Cryptographic &amp; Legal Guarantee:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{currentMode.securityGuarantee}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: RSA Architectural Evolution & Hardware Performance Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: RSA Key Length Evolution &amp; Factoring Hardness
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare RSA-512, RSA-1024, RSA-2048, and RSA-4096: evaluate decimal modulus digits, General Number Field Sieve (GNFS) factoring complexity, encryption latency, and Indian CCA compliance.
            </p>
          </div>

          {/* Key Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(rsaKeyProfiles).map((kp) => {
              const isSelected = selectedKeyLength === kp.key;
              return (
                <button
                  key={kp.key}
                  onClick={() => setSelectedKeyLength(kp.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{kp.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{kp.symmetricEquivalent.split(" ")[0]} Bits Sec</div>
                </button>
              );
            })}
          </div>

          {/* Active Key Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeKeyProfile.badgeClass)}>
                  {activeKeyProfile.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeKeyProfile.symmetricEquivalent}
                </h3>
              </div>
            </div>

            {/* Factoring Status */}
            <div className="p-4 bg-gray-900 rounded-xl border border-rose-900/30 text-xs space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">GNFS Factoring History &amp; Cryptanalysis:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeKeyProfile.factoringStatus}</p>
            </div>

            {/* Speed & CCA Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Encryption Latency (e = 65537)</span>
                <span className="font-bold text-emerald-400 text-xs sm:text-sm">{activeKeyProfile.encryptionSpeed}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">CCA India &amp; RBI Legal Status</span>
                <span className="font-bold text-indigo-300 text-xs sm:text-sm">{activeKeyProfile.ccaIndiaStatus}</span>
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
              Visualizing the Prime Multiplication Trapdoor Problem and the Dual RSA Operational Workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The Prime Multiplication Trapdoor */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The RSA Prime Multiplication Trapdoor
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Primes */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="30" width="160" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="130" y="58" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="9">Prime p (1024 bits)</text>
                    <rect x="290" y="30" width="160" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="370" y="58" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="9">Prime q (1024 bits)</text>
                  </g>

                  {/* Multiplication Arrow */}
                  <line x1="210" y1="52" x2="290" y2="52" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 250 52 L 250 110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen26)" />
                  <text x="260" y="90" fill="#34d399" font-family="monospace" fontSize="8">p * q (0.0001 ms)</text>

                  {/* Public Modulus Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="80" y="115" width="340" height="50" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="137" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10">
                      PUBLIC MODULUS N = p * q (2048 bits)
                    </text>
                    <text x="250" y="153" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      617 Decimal Digits • Published to the entire world!
                    </text>
                  </g>

                  {/* Factoring Hardness Arrow */}
                  <line x1="250" y1="165" x2="250" y2="215" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrowRed26)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="220" width="400" height="55" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="242" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      FACTORING HARDNESS (GNFS BARRIER)
                    </text>
                    <text x="250" y="260" fill="#fee2e2" font-family="monospace" textAnchor="middle" fontSize="8">
                      Factoring N without secret trapdoor takes 10+ Billion Classical CPU Years!
                    </text>
                  </g>

                  <text x="250" y="300" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Multiplying primes is instantaneous; factoring the product is computationally impossible on classical computers.
                  </text>

                  <defs>
                    <marker id="arrowGreen26" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                    <marker id="arrowRed26" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.1: The RSA one-way trapdoor function: easy forward prime multiplication vs intractable GNFS integer factorization.
              </p>
            </div>

            {/* Diagram 2: Dual Functional Workflows */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🔄</span> Diagram B: Dual Functional Workflows (Encryption vs Signature)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: Confidentiality */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="110" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="10">1. CONFIDENTIALITY ENCRYPTION</text>
                    <rect x="35" y="65" width="125" height="40" rx="4" fill="#1e1b4b" />
                    <text x="97" y="88" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8.5">C = M^e mod N</text>
                    <line x1="160" y1="85" x2="320" y2="85" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo26)" />
                    <text x="240" y="77" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">Ciphertext C</text>
                    <rect x="325" y="65" width="140" height="40" rx="4" fill="#064e3b" />
                    <text x="395" y="88" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">M = C^d mod N</text>
                  </g>

                  {/* Bottom: Signature */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="150" width="460" height="115" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="172" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">2. DIGITAL SIGNATURE &amp; NON-REPUDIATION</text>
                    <rect x="35" y="190" width="135" height="45" rx="4" fill="#064e3b" />
                    <text x="102" y="215" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">S = Hash(M)^d mod N</text>
                    <line x1="170" y1="212" x2="310" y2="212" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen26b)" />
                    <text x="240" y="205" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">Signature S</text>
                    <rect x="315" y="190" width="150" height="45" rx="4" fill="#1e1b4b" />
                    <text x="390" y="215" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8.5">Hash(M) ≟ S^e mod N</text>
                  </g>

                  <text x="250" y="290" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    IT Act 2000 Section 5: Asymmetric RSA signatures carry identical legal weight to ink signatures.
                  </text>

                  <defs>
                    <marker id="arrowIndigo26" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowGreen26b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.2: The complementary functional workflows of the RSA cryptosystem: Encryption vs Digital Signatures.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: RSA Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security architects upgrade banking payment certificates to RSA-2048, equip 180+ hospital physicians with Class-3 DSCs under IT Act Section 5, enforce SCADA RSA-PSS commands, and author primality testing labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> RSA Asymmetric Dilemma ({currentLocalScenario.legacyFlaw})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Remediation &amp; Architecture Action
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
                <span>⭐</span> RSA Engineering Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Use e = 65537:</strong> Ultra-fast encryption with 17 operations and immunity to low-exponent attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Mandate RSA-OAEP Padding:</strong> Eliminates malleability and chosen-ciphertext attacks completely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy RSA-CRT for Decryption:</strong> Chinese Remainder Theorem gives a 4x computational speedup.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 2048-bit Minimum:</strong> Strictly ban 1024-bit RSA across all production servers.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common RSA Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Textbook RSA:</strong> Unpadded RSA allows attackers to multiply and manipulate ciphertexts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Choosing Small Private Exponent d:</strong> Wiener's continued fraction attack cracks d in seconds if d &lt; N^(1/4).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Reusing Modulus N Across Users:</strong> Common modulus attacks allow decrypting without private keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Side-Channel Timings:</strong> Decryption timing leaks private key bits unless Blinding is used.</span>
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
                  <span><strong>Store Private Keys in FIPS HSMs:</strong> Master signing keys must reside inside tamper-resistant silicon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with IT Act Section 35:</strong> Deploy CCA India-approved Class-3 DSCs for all digital contracts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy RSA-PSS for Signatures:</strong> Probabilistic salt padding provides provable security reductions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Prepare for PQC Hybrid Handshakes:</strong> Track NIST FIPS 203 (ML-KEM) to defeat quantum Shor attacks.</span>
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
              Synthesize foundational RSA concepts before reviewing the comprehensive practice questions.
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
                  Why the RSA algorithm works: Euler's Totient Theorem guarantees that raising a number to power $e$ and then to power $d$ modulo $N$ restores the original number $M$ because $e \cdot d \equiv 1$ (mod $\phi(N)$).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why $e = 65537$ is the global standard: It has only two set bits in binary (`10000000000000001`), making encryption blazingly fast with just 17 modular multiplications while eliminating low-exponent attacks.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise projects, never use unpadded Textbook RSA; always enforce RSA-OAEP for encryption and RSA-PSS for digital signatures to achieve provable cryptographic security.
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
                <span>RSA is based on Prime Factorization: N = p * q.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Euler's Totient: phi(N) = (p - 1) * (q - 1).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Public Key is (e, N) where e = 65537; Private Key is (d, N).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Encryption: C ≡ M^e mod N; Decryption: M ≡ C^d mod N.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Chinese Remainder Theorem (CRT) speeds up RSA decryption by 4x.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CCA India &amp; RBI mandate 2048-bit minimum; 1024-bit is permanently banned.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Introduction to the RSA Algorithm and Asymmetric Security FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Introduction to the RSA Algorithm (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 002_005: RSA Algorithm & Public Key Infrastructure! The RSA algorithm is one of the greatest intellectual achievements in human history. By linking the prime factorization problem with modular arithmetic, Rivest, Shamir, and Adleman gave the world an unforgeable foundation for digital commerce and privacy. Understand how (e, N) and (d, N) execute the one-way trapdoor, and remember that in India, Class-3 DSCs under Section 5 of the IT Act 2000 legally anchor multi-crore contracts on RSA-2048."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
