import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: 5-Step Stepper State
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  // Studio 2: Key Format State
  const [selectedFormatKey, setSelectedFormatKey] = useState("pkcs8_encrypted");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_zeromem_hsm");

  // Studio 1: 5 Sequential Keygen Steps Data
  const keygenSteps = [
    {
      step: 1,
      title: "Step 1: Strong Prime Generation (p, q)",
      mathAction: "Generate two distinct 1024-bit primes via hardware CSPRNG",
      sampleValues: "p = 61, q = 53 (Sample small primes for demonstration)",
      details:
        "Run 64 rounds of Miller-Rabin primality testing to ensure error probability < 2^-128. Enforce prime separation |p - q| > 2^900 to defeat Fermat difference-of-squares factorization.",
      stateVariables: { "Prime p": 61, "Prime q": 53, "Primality Test": "Miller-Rabin (64 Rounds)", "Separation": "|61 - 53| = 8" },
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      step: 2,
      title: "Step 2: Public Modulus Calculation (N = p * q)",
      mathAction: "Multiply primes: N = 61 * 53 = 3233",
      sampleValues: "Public Modulus N = 3233 (2048 bits / 617 decimal digits in production)",
      details:
        "The modulus N is published openly to the world as part of the public key. Factoring N without knowing p and q requires billions of classical CPU years using the General Number Field Sieve (GNFS).",
      stateVariables: { "Modulus N": 3233, "Modulus Bit Length": "12 bits (demo) / 2048 bits (prod)", "Published In": "Public & Private Key" },
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    {
      step: 3,
      title: "Step 3: Euler & Carmichael Totient (φ(N) / λ(N))",
      mathAction: "Calculate group orders: φ(N) = (61-1)*(53-1) = 3120 | λ(N) = lcm(60, 52) = 780",
      sampleValues: "Euler Totient φ(N) = 3120, Carmichael Totient λ(N) = 780",
      details:
        "Euler's Totient counts positive integers coprime to N. Carmichael's Totient λ(N) = lcm(p-1, q-1) is the standard in PKCS#1 v2.2, producing a smaller valid private exponent d.",
      stateVariables: { "Euler φ(N)": 3120, "Carmichael λ(N)": 780, "gcd(p-1, q-1)": 4, "Group Order Status": "Kept strictly secret" },
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    {
      step: 4,
      title: "Step 4: Public Exponent Selection (e = 65537)",
      mathAction: "Select integer e such that 1 < e < φ(N) and gcd(e, φ(N)) = 1",
      sampleValues: "Public Exponent e = 17 (Sample coprime: gcd(17, 3120) = 1) [Production: e = 65537]",
      details:
        "Universally standard choice e = 65537 = 2^16 + 1 has only two set bits in binary (10000000000000001₂), requiring only 17 modular operations during square-and-multiply while defeating low-exponent attacks.",
      stateVariables: { "Public Exponent e": 17, "Coprimality Check": "gcd(17, 3120) == 1 (PASSED)", "Public Key Tuple": "( e = 17, N = 3233 )" },
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      step: 5,
      title: "Step 5: Private Exponent Inversion & CRT Derivation",
      mathAction: "Compute d = e⁻¹ mod φ(N) via Extended Euclidean Algorithm + Pre-compute CRT",
      sampleValues: "Private Exponent d = 2753 | CRT: d_p = 17, d_q = 25, q_inv = 38",
      details:
        "Extended Euclidean Algorithm derives secret d = 2753 such that (17 * 2753) mod 3120 = 1. Pre-computed Chinese Remainder Theorem (CRT) parameters enable a 4x decryption speedup. Primes p and q are purged from volatile RAM immediately.",
      stateVariables: { "Private Key d": 2753, "CRT Exponent d_p": 17, "CRT Exponent d_q": 25, "CRT Coefficient q_inv": 38, "RAM Status": "Primes p, q wiped via OPENSSL_cleanse()" },
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  ];

  const currentStep = keygenSteps[activeStepIndex - 1];

  // Studio 2: Key Format Profiles Data
  const formatProfiles = {
    pkcs1_private: {
      key: "pkcs1_private",
      name: "1. PKCS#1 RSA Private Key (RFC 8017)",
      header: "-----BEGIN RSA PRIVATE KEY-----",
      scope: "RSA-Specific Only",
      structure: "ASN.1 sequence containing 8 fields: (version, N, e, d, p, q, d_p, d_q, q_inv)",
      encryption: "Unencrypted by default (Legacy OpenSSL DES encryption is deprecated)",
      openSslCmd: "openssl rsa -in private.key -text -noout",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    pkcs8_unencrypted: {
      key: "pkcs8_unencrypted",
      name: "2. PKCS#8 Unencrypted PrivateKeyInfo (RFC 5208)",
      header: "-----BEGIN PRIVATE KEY-----",
      scope: "Universal (RSA, ECC, Ed25519, ML-KEM)",
      structure: "Wraps algorithm OID (1.2.840.113549.1.1.1 for rsaEncryption) and embedded raw key",
      encryption: "Unencrypted (Requires secure filesystem permissions 0600)",
      openSslCmd: "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out priv.pem",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    pkcs8_encrypted: {
      key: "pkcs8_encrypted",
      name: "3. PKCS#8 EncryptedPrivateKeyInfo (FIPS Standard)",
      header: "-----BEGIN ENCRYPTED PRIVATE KEY-----",
      scope: "Universal Password-Protected Standard",
      structure: "Encrypted ASN.1 blob wrapped with PBKDF2/Argon2 key derivation + AES-256-CBC cipher",
      encryption: "AES-256-CBC with PBKDF2 salt and iteration count (Cryptographically secure on disk)",
      openSslCmd: "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -aes-256-cbc -out secure_priv.pem",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    x509_spki_public: {
      key: "x509_spki_public",
      name: "4. X.509 SubjectPublicKeyInfo (RFC 5280)",
      header: "-----BEGIN PUBLIC KEY-----",
      scope: "Universal Public Key Format",
      structure: "Sequence of AlgorithmIdentifier (rsaEncryption) and BIT STRING containing (N, e)",
      encryption: "Public data (Zero confidentiality required; integrity protected via digital certificates)",
      openSslCmd: "openssl pkey -in secure_priv.pem -pubout -out public.pem",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeFormat = formatProfiles[selectedFormatKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_zeromem_hsm",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Zero-Memory Persistence 500-Key HSM Pipeline",
      budget: "₹9,50,000",
      flaw: "Primes p and q Lingering in Unmanaged Heap RAM",
      dilemma:
        "High-volume payment gateway key generation servers were leaving raw primes p and q in unmanaged heap RAM, creating cold-boot attack exposure.",
      resolution:
        "Mamata engineered an automated key generation microservice with immediate OPENSSL_cleanse() RAM zeroization, generating 500+ RSA-2048 keys daily with zero memory persistence and 100% RBI compliance.",
      metrics: {
        keysGeneratedDaily: "500+ RSA-2048 Pairs",
        ramZeroization: "100% OPENSSL_cleanse() Purge",
        memoryLeakage: "0 Bytes Linger in RAM",
        compliance: "RBI Master Directions on Cyber Security"
      }
    },
    {
      id: "ichapur_dsc_ceremonies",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Doctor Class-3 DSC USB Token Ceremonies",
      budget: "₹5,20,000",
      flaw: "Insecure Software-Generated Physician Signature Keys",
      dilemma:
        "Hospital medical staff required tamper-evident 2048-bit RSA key generation directly inside crypto USB tokens for legal e-prescriptions.",
      resolution:
        "Mahima conducted formal key generation ceremonies on FIPS 140-2 crypto USB tokens for 180+ physicians, securing 50,000+ clinical records under Section 5 of the IT Act 2000.",
      metrics: {
        physiciansEnrolled: "180+ Hospital Clinicians",
        tokensIssued: "FIPS 140-2 Level 2 USB Keys",
        legalAdmissibility: "100% Section 5 IT Act Validated",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_tpm_sealing",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Device Identity TPM 2.0 Sealing",
      budget: "₹8,80,000",
      flaw: "Plaintext Device Private Keys Stored on Flash Memory",
      dilemma:
        "Preventing rogue firmware from extracting 2048-bit device authentication keys from 220kV substation RTUs.",
      resolution:
        "Debangshu automated OpenSSL key generation bound directly to TPM 2.0 Platform Configuration Registers (PCRs), ensuring private keys remain hardware-sealed and maintaining 100.00% grid stability.",
      metrics: {
        rtusHardened: "18 High-Voltage Substations",
        keyStorage: "TPM 2.0 Hardware NVRAM",
        unauthorizedExtraction: "0% Physical/Software Surface",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_keygen_visualizer",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "ASN.1 PEM RSA KeyGen Visualizer Laboratory",
      budget: "₹4,00,000",
      flaw: "Teaching Students ASN.1 DER & PKCS#8 Structural Sequences",
      dilemma:
        "Teaching computer science students how the 5-step key generation pipeline maps to ASN.1 DER and PKCS#8 PEM blocks in Python.",
      resolution:
        "The team authored an interactive educational visualizer parsing RSAPrivateKey structures and inspecting CRT parameters, training 140+ students on modern cryptographic key lifecycles.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        visualizersAuthored: "ASN.1 Tree + PKCS#8 Parser",
        crtParametersBenchmarked: "d_p, d_q, q_inv Verified",
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
            Cyber Security Module 002_005 • Topic 3 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            RSA Key Generation Step-by-Step
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the complete 5-step asymmetric key generation lifecycle: master prime generation ($p, q$), modulus multiplication ($N$), 
            totient group order ($\phi(N)$), public exponent selection ($e=65537$), private inversion ($d = e^{-1}$ (mod $\phi(N)$)), and PKCS#1/PKCS#8 key serialization.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive 5-Step RSA Key Generation Pipeline */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🪜</span> Studio 1: The 5-Step RSA Key Generation Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 5 sequential mathematical operations to generate a fully functioning RSA key pair with CRT pre-computations and RAM sanitization.
            </p>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {keygenSteps.map((st) => {
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
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">Step {st.step}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{st.title.split(": ")[1].split(" (")[0]}</div>
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
                {currentStep.mathAction}
              </h3>
            </div>

            {/* Sample Values & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Concrete Mathematical Execution:</span>
                <p className="text-emerald-400 text-xs sm:text-sm font-bold leading-relaxed">{currentStep.sampleValues}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Security &amp; Standards Note:</span>
                <p className="text-gray-300 leading-relaxed">{currentStep.details}</p>
              </div>
            </div>

            {/* Cryptographic State Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Active Cryptographic State Variables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {Object.entries(currentStep.stateVariables).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block truncate">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Key Format & Serialization Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📜</span> Studio 2: Key Format &amp; Serialization Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare PKCS#1 (RSA-specific), PKCS#8 (Universal Unencrypted &amp; Encrypted), and X.509 SubjectPublicKeyInfo PEM formats.
            </p>
          </div>

          {/* Format Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(formatProfiles).map((fp) => {
              const isSelected = selectedFormatKey === fp.key;
              return (
                <button
                  key={fp.key}
                  onClick={() => setSelectedFormatKey(fp.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{fp.name.split(". ")[1].split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{fp.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Format Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeFormat.badgeClass)}>
                  {activeFormat.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                  {activeFormat.header}
                </h3>
              </div>
            </div>

            {/* Structure & Scope */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">ASN.1 Structure Definition:</span>
                <p className="text-gray-200 font-mono leading-relaxed">{activeFormat.structure}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Password &amp; Cipher Protection:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{activeFormat.encryption}</p>
              </div>
            </div>

            {/* OpenSSL CLI Command */}
            <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/40 text-xs font-mono space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">OpenSSL 3.0 Generation / Inspection Syntax:</span>
              <p className="text-emerald-300 text-xs sm:text-sm font-extrabold">{activeFormat.openSslCmd}</p>
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
              Visualizing the 5-Step RSA Key Generation Lifecycle and the PKCS#1 vs PKCS#8 ASN.1 Structural Hierarchy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 5-Step Keygen State Machine */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 5-Step RSA Key Generation State Machine
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="210" height="50" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="125" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">1. GENERATE PRIMES (p, q)</text>
                    <text x="125" y="63" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7.5">64 Miller-Rabin Rounds (P &lt; 2^-128)</text>
                  </g>

                  {/* Step 2 */}
                  <line x1="230" y1="50" x2="270" y2="50" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan29)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="25" width="210" height="50" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="375" y="47" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">2. MODULUS N = p * q</text>
                    <text x="375" y="63" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">2048 Bits / 617 Dec Digits</text>
                  </g>

                  {/* Step 3 */}
                  <line x1="375" y1="75" x2="375" y2="105" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold29)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="105" width="210" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="375" y="127" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">3. TOTIENT φ(N) / λ(N)</text>
                    <text x="375" y="143" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">(p-1)(q-1) / lcm(p-1, q-1)</text>
                  </g>

                  {/* Step 4 */}
                  <line x1="270" y1="130" x2="230" y2="130" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen29)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="210" height="50" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="125" y="127" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9">4. SELECT e = 65537</text>
                    <text x="125" y="143" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">gcd(e, φ(N)) == 1 Verified</text>
                  </g>

                  {/* Step 5 */}
                  <line x1="125" y1="155" x2="125" y2="185" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo29)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="185" width="400" height="55" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      5. INVERT d = e⁻¹ mod φ(N) &amp; ZEROIZE RAM
                    </text>
                    <text x="250" y="225" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8">
                      Pre-compute CRT (d_p, d_q, q_inv) + OPENSSL_cleanse(p, q)
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Complete 5-step sequence generates cryptographically invincible RSA-2048 key pairs.
                  </text>

                  <defs>
                    <marker id="arrowCyan29" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGold29" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowGreen29" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                    <marker id="arrowIndigo29" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: The 5-step RSA key generation pipeline with CRT pre-computations and memory zeroization.
              </p>
            </div>

            {/* Diagram 2: PKCS#1 vs PKCS#8 ASN.1 Structure */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: PKCS#1 vs PKCS#8 ASN.1 Structural Hierarchy
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: PKCS#1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="210" height="210" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="130" y="55" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">PKCS#1 RSAPrivateKey</text>
                    <text x="40" y="80" fill="#cbd5e1" font-family="monospace" fontSize="8">• Version: 0</text>
                    <text x="40" y="100" fill="#38bdf8" font-family="monospace" fontSize="8">• Modulus N</text>
                    <text x="40" y="120" fill="#38bdf8" font-family="monospace" fontSize="8">• Public Exponent e</text>
                    <text x="40" y="140" fill="#fbbf24" font-family="monospace" fontSize="8">• Private Exponent d</text>
                    <text x="40" y="160" fill="#f87171" font-family="monospace" fontSize="8">• Primes: p, q</text>
                    <text x="40" y="180" fill="#34d399" font-family="monospace" fontSize="8">• CRT: d_p, d_q, q_inv</text>
                    <text x="130" y="220" fill="#818cf8" textAnchor="middle" fontSize="7.5">BEGIN RSA PRIVATE KEY</text>
                  </g>

                  {/* Right: PKCS#8 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="30" width="210" height="210" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="55" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">PKCS#8 PrivateKeyInfo</text>
                    <text x="280" y="80" fill="#cbd5e1" font-family="monospace" fontSize="8">• Version: 0</text>
                    <text x="280" y="105" fill="#34d399" font-family="monospace" fontSize="8">• AlgorithmIdentifier:</text>
                    <text x="295" y="125" fill="#6ee7b7" font-family="monospace" fontSize="7.5">OID 1.2.840.113549.1.1.1</text>
                    <text x="280" y="150" fill="#fbbf24" font-family="monospace" fontSize="8">• PrivateKey (OCTET STRING):</text>
                    <text x="295" y="170" fill="#fef08a" font-family="monospace" fontSize="7.5">Embeds PKCS#1 Struct</text>
                    <text x="280" y="195" fill="#a7f3d0" font-family="monospace" fontSize="8">• Optional PBKDF2/AES Wrap</text>
                    <text x="370" y="220" fill="#34d399" textAnchor="middle" fontSize="7.5">BEGIN ENCRYPTED PRIVATE KEY</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    PKCS#8 wraps PKCS#1 inside an algorithm identifier OID and enables password-based AES encryption.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: Comparison of ASN.1 sequence structures between PKCS#1 and PKCS#8 encrypted formats.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Key Generation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads automate zero-memory HSM key generation, conduct doctor DSC ceremonies under IT Act Section 35, seal RTU device identities inside TPM 2.0 chips, and author ASN.1 visualizers across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Key Generation Vulnerability ({currentLocalScenario.flaw})
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
              Guidelines for cryptographic engineers designing production key generation lifecycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Key Generation Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Use OpenSSL genpkey:</strong> Generates PKCS#8 encrypted keys with PBKDF2/AES-256.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Zeroize RAM Primes:</strong> Execute `OPENSSL_cleanse()` on primes $p, q$ immediately after keygen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Pre-Compute CRT Parameters:</strong> Store d_p, d_q, q_inv for 4x faster private operations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Verify Full System Entropy:</strong> Block key generation until `/dev/urandom` is fully seeded.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Keygen Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Math.random():</strong> Predictable PRNGs allow attackers to reconstruct primes instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Generating Keys on Bootup:</strong> Low entropy leads to shared primes and Batch GCD factorization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Proprietary 'Fast Primes':</strong> Flawed algebraic structures cause ROCA-style factorization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Leaving Keys Unencrypted on Disk:</strong> Vulnerable to unauthorized file system inspection.</span>
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
                  <span><strong>Conduct Audited Key Ceremonies:</strong> Follow IT Act Section 35 guidelines for CA root keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act Section 33:</strong> Avoid up to ₹250 Crores in statutory penalties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Seal Keys Inside TPM 2.0 NVRAM:</strong> Bind device identity keys to Platform Configuration Registers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 2048-bit Modulus Minimum:</strong> Strictly ban legacy 1024-bit key generation.</span>
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
              Synthesize key RSA key generation principles before reviewing the comprehensive practice questions.
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
                  The sequential dependency of the 5 steps: You cannot compute $N$ without $p, q$; you cannot compute $\phi(N)$ without $p, q$; you cannot select $e$ without verifying $\gcd(e, \phi(N))=1$; and you cannot compute $d$ without running the Extended Euclidean Algorithm on $e$ and $\phi(N)$.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why PKCS#8 is superior to PKCS#1: PKCS#8 is algorithm-agnostic and explicitly specifies the cryptographic algorithm OID (`1.2.840.113549.1.1.1`), allowing operating systems to parse and wrap keys in password-derived PBKDF2/AES-256 envelopes.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your cryptographic microservices, always zeroize volatile RAM using `OPENSSL_cleanse()` or `memset_s()` immediately after private exponent $d$ is derived, ensuring that secret primes $p$ and $q$ never linger in server heap memory.
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
                <span>5 Steps: Primes (p,q) ➔ Modulus (N) ➔ Totient (phi) ➔ Exponent (e) ➔ Inversion (d).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Public Key is (e, N); Private Key is (d, N) with CRT parameters (d_p, d_q, q_inv).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>PKCS#1 is RSA-specific (`BEGIN RSA PRIVATE KEY`); PKCS#8 is universal &amp; encrypted.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SubjectPublicKeyInfo defines standard format for public keys (`BEGIN PUBLIC KEY`).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Primes must be erased from volatile RAM (`OPENSSL_cleanse()`) after keygen.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 35 mandates audited Key Generation Ceremonies on FIPS HSMs for CAs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="RSA Key Generation Step-by-Step FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="RSA Key Generation Step-by-Step (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Key generation is the most critical phase in the life of an asymmetric cryptosystem. If your primes are weak, if your entropy is flawed, or if your private keys linger unzeroized in server RAM, the entire mathematical fortress collapses. Master the 5 sequential steps, standardize on PKCS#8 password-encrypted storage with PBKDF2/AES-256, and always ensure that private keys are generated inside FIPS 140-3 Hardware Security Modules under Section 35 of the Indian IT Act 2000."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
