import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: Cryptographic Primitive State
  const [selectedPrimitiveKey, setSelectedPrimitiveKey] = useState("key_primitive");

  // Studio 2: Mode of Operation State
  const [selectedModeKey, setSelectedModeKey] = useState("gcm_mode");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_ecb");

  // Cryptographic Primitives Data for Studio 1
  const cryptoPrimitives = {
    plaintext_primitive: {
      key: "plaintext_primitive",
      name: "Plaintext (P / M)",
      mathNotation: "P ∈ P (Plaintext Space)",
      transformation: "Original unencrypted data cleartext before mathematical transformation.",
      securityPurpose: "The confidential business, financial, or personal payload to be protected.",
      misconfigRisk: "Storing in unencrypted database triggers statutory penalties up to ₹250 Crores under DPDP Act 2023.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "📄"
    },
    ciphertext_primitive: {
      key: "ciphertext_primitive",
      name: "Ciphertext (C)",
      mathNotation: "C = e_k(P) ∈ C (Ciphertext Space)",
      transformation: "High-entropy pseudo-random output resulting from encryption with key K.",
      securityPurpose: "Renders data completely unintelligible to unauthorized interceptors on public networks.",
      misconfigRisk: "If cipher lacks diffusion (e.g. ECB mode), structural patterns remain visible in ciphertext.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      icon: "🔒"
    },
    key_primitive: {
      key: "key_primitive",
      name: "Cryptographic Key (K)",
      mathNotation: "K ∈ K (|K| = 2^256 for AES-256)",
      transformation: "Secret parameter governing non-linear substitution and permutation cipher rounds.",
      securityPurpose: "Enforces Kerckhoffs's Principle: secrecy of the entire system rests solely on the key.",
      misconfigRisk: "Hardcoding keys in source code or using low-entropy PRNGs allows trivial key recovery.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      icon: "🔑"
    },
    iv_nonce_primitive: {
      key: "iv_nonce_primitive",
      name: "Initialization Vector & Nonce",
      mathNotation: "IV ∈ {0, 1}^128 / Nonce ∈ {0, 1}^96",
      transformation: "Random / unique non-secret token combined with key to eliminate deterministic leaks.",
      securityPurpose: "Guarantees identical plaintexts produce completely different ciphertexts every session.",
      misconfigRisk: "Reusing nonces in AES-GCM or stream ciphers enables Two-Time Pad crib dragging and tag forgery.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "🎲"
    },
    salt_primitive: {
      key: "salt_primitive",
      name: "Cryptographic Salt",
      mathNotation: "Salt ∈ {0, 1}^128 (Random string for Hash KDFs)",
      transformation: "Appended to passwords before hashing: Hash(Password || Salt).",
      securityPurpose: "Ensures identical passwords produce unique hash strings, defeating pre-computed Rainbow Tables.",
      misconfigRisk: "Unsalted password storage allows instant rainbow table lookups across millions of user accounts.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "🧂"
    }
  };

  const activePrimitive = cryptoPrimitives[selectedPrimitiveKey];

  // Block Cipher Modes of Operation Data for Studio 2
  const cipherModes = {
    ecb_mode: {
      key: "ecb_mode",
      name: "Electronic Codebook (ECB Mode)",
      formula: "C_i = E_k( P_i ) (Independent Block Encryption)",
      securityLevel: "INSECURE & STRICTLY FORBIDDEN",
      patternResistance: "0% (Identical plaintext blocks produce identical ciphertext blocks!)",
      integritySupport: "None (Malleable, vulnerable to block insertion/deletion)",
      penguinVisual: "Visual outline of penguin silhouette remains 100% visible!",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    cbc_mode: {
      key: "cbc_mode",
      name: "Cipher Block Chaining (CBC Mode)",
      formula: "C_i = E_k( P_i ⊕ C_{i-1} ) with Random IV",
      securityLevel: "LEGACY / REQUIRES HMAC AUTHENTICATION",
      patternResistance: "100% (Sequential chaining randomizes identical blocks)",
      integritySupport: "Vulnerable to Padding Oracle attacks without HMAC (Encrypt-then-MAC needed)",
      penguinVisual: "Complete pseudo-random visual noise (No patterns visible)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    gcm_mode: {
      key: "gcm_mode",
      name: "Galois/Counter Mode (AES-GCM - AEAD)",
      formula: "C_i = P_i ⊕ E_k( Nonce || CTR_i ) + GMAC 128-bit Tag (T)",
      securityLevel: "GOLD STANDARD AUTHENTICATED ENCRYPTION (AEAD)",
      patternResistance: "100% (Parallel counter keystream + Unique 96-bit Nonce)",
      integritySupport: "Built-in 128-bit Cryptographic Authentication Tag verifies ciphertext & AAD",
      penguinVisual: "Pure cryptographic white noise; 100% Confidentiality & Integrity",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeMode = cipherModes[selectedModeKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_ecb",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Merchant Payment Switch ECB Elimination",
      budget: "₹9,50,000",
      flaw: "Legacy AES-ECB Mode in Core Banking Switches",
      dilemma:
        "Internal core banking transaction settlement switches used legacy AES-ECB mode, leaking transaction payload patterns across merchant settlement logs.",
      resolution:
        "Mamata eliminated ECB mode, deployed AES-256-GCM with 96-bit nonces, and achieved 100% RBI compliance.",
      metrics: {
        legacyCiphersRetired: "100% ECB & 3DES Deprecated",
        aeadEnforcement: "AES-256-GCM with 96-bit Nonces",
        patternLeakage: "0% Deterministic Block Correlation",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_nonce",
      lead: "Mahima",
      role: "Chief Healthcare Information Officer",
      location: "Ichapur General Hospital",
      title: "PACS Medical Imaging Nonce Hardening",
      budget: "₹5,20,000",
      flaw: "Static Initialization Vector Reuse in DICOM Transfers",
      dilemma:
        "Radiologists transmitting DICOM patient CT scans were reusing static 16-byte initialization vectors, creating cryptographic collision risks.",
      resolution:
        "Mahima deployed CSPRNG-generated unique nonces for every imaging transmission session, eliminating stream cipher collision risks under the DPDP Act 2023.",
      metrics: {
        nonceEntropy: "CSPRNG /dev/urandom Generated",
        imagingSessionsProtected: "100% DICOM Telemetry",
        twoTimePadRisk: "0% Keystream Collision Surface",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_trng",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Hardware TRNG Entropy Audit",
      budget: "₹8,80,000",
      flaw: "Low-Entropy PRNG in Substation Cryptographic Chips",
      dilemma:
        "Evaluating whether low-entropy pseudorandom keys in 220kV substation RTUs were vulnerable to prediction by external adversaries.",
      resolution:
        "Debangshu audited hardware TRNG chips, verified entropy output against NIST SP 800-22 suites, and automated daily cryptographic key rotation across all substation grid controllers.",
      metrics: {
        entropyVerification: "NIST SP 800-22 Randomness Suites",
        hardwareEntropySource: "Thermal Jitter Hardware TRNG",
        keyRotationSchedule: "Automated 24-Hour Key Refresh",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_shannon",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Shannon Entropy Binary Analysis Laboratory",
      budget: "₹4,00,000",
      flaw: "Malware Detection via Cryptographic Shannon Entropy",
      dilemma:
        "Teaching students how to measure mathematical Shannon entropy to distinguish encrypted malware payloads from standard plaintext code.",
      resolution:
        "The team built a Python lab calculating mathematical byte entropy (0.0 to 8.0 bits/byte), guiding 140+ students through detecting encrypted payloads and validating cryptosystem 5-tuple invariants.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        entropyCalculatorsAuthored: "Python Shannon Entropy Suite",
        invariantsVerified: "(P, C, K, E, D) Decryption Tests",
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
            Cyber Security Module 002_004 • Topic 1 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Core Cryptographic Terminology: Plaintext, Ciphertext, and Keys
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the formal 5-tuple mathematical definition of cryptosystems: master Plaintext, 
            Ciphertext, Key Space entropy, Initialization Vectors, Salts, and compare Block Cipher Modes of Operation (ECB vs CBC vs GCM).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Cryptographic 5-Tuple & Primitive Transformation Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔤</span> Studio 1: Cryptographic 5-Tuple &amp; Primitive Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a cryptographic primitive to inspect its mathematical notation, low-level transformation function, security purpose, and catastrophic misconfiguration risks.
            </p>
          </div>

          {/* Primitive Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(cryptoPrimitives).map((prim) => {
              const isSelected = selectedPrimitiveKey === prim.key;
              return (
                <button
                  key={prim.key}
                  onClick={() => setSelectedPrimitiveKey(prim.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{prim.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{prim.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{prim.mathNotation.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Primitive Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border font-mono", activePrimitive.badgeClass)}>
                  {activePrimitive.mathNotation}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activePrimitive.name}
                </h3>
              </div>
            </div>

            {/* Transformation Function */}
            <div className="p-4 bg-gray-900 rounded-xl border border-blue-900/30 space-y-1 text-xs">
              <span className="text-blue-400 font-bold uppercase tracking-wider block">Mathematical Role &amp; Transformation:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activePrimitive.transformation}</p>
            </div>

            {/* Security Purpose vs Misconfiguration Risk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Practical Security Purpose</span>
                <p className="text-gray-200 leading-relaxed">{activePrimitive.securityPurpose}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Misconfiguration Failure Mode</span>
                <p className="text-gray-300 leading-relaxed">{activePrimitive.misconfigRisk}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Block Cipher Modes of Operation & ECB Penguin Leakage Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🐧</span> Studio 2: Modes of Operation &amp; The ECB Penguin Leak Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare why Electronic Codebook (ECB) mode preserves visual and data patterns while Cipher Block Chaining (CBC) and Galois/Counter Mode (GCM) produce true cryptographic diffusion.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(cipherModes).map((mod) => {
              const isSelected = selectedModeKey === mod.key;
              return (
                <button
                  key={mod.key}
                  onClick={() => setSelectedModeKey(mod.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200">{mod.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{mod.key.split("_")[0].toUpperCase()}</div>
                </button>
              );
            })}
          </div>

          {/* Active Mode Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeMode.badgeClass)}>
                  {activeMode.securityLevel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeMode.name}
                </h3>
              </div>
            </div>

            {/* Formula */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Mathematical Block Formulation:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {activeMode.formula}
              </pre>
            </div>

            {/* Pattern Resistance & Integrity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Pattern Resistance &amp; Diffusion</span>
                <p className="text-gray-200">{activeMode.patternResistance}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Integrity &amp; AEAD Support</span>
                <p className="text-gray-200">{activeMode.integritySupport}</p>
              </div>
            </div>

            {/* Visual Leakage Outcome */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-cyan-900/30 text-xs space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Bitmap Image Encryption Result (The Penguin Test):</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeMode.penguinVisual}</p>
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
              Visualizing the 5-Tuple Cryptosystem Architecture and ECB Deterministic Leakage vs GCM Authenticated Encryption.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 5-Tuple Cryptosystem Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 5-Tuple Cryptosystem (P, C, K, E, D)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Plaintext Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="50" width="105" height="60" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="72" y="75" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9.5">PLAINTEXT (P)</text>
                    <text x="72" y="90" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Cleartext Data</text>
                  </g>

                  {/* Encryption Arrow */}
                  <path d="M 125 80 L 175 80" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan19)" />

                  {/* Encryption Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="50" width="140" height="60" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="75" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">ENCRYPTION e_k</text>
                    <text x="250" y="90" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">Key K + Nonce/IV</text>
                  </g>

                  {/* Ciphertext Arrow */}
                  <path d="M 320 80 L 370 80" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan19)" />

                  {/* Ciphertext Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="375" y="50" width="105" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="427" y="75" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="9.5">CIPHERTEXT (C)</text>
                    <text x="427" y="90" fill="#fca5a5" textAnchor="middle" fontSize="7.5">Scrambled Bits</text>
                  </g>

                  {/* Decryption Path (Bottom) */}
                  <path d="M 427 110 L 427 180 L 320 180" stroke="#ef4444" strokeWidth="2" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="150" width="140" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="175" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">DECRYPTION d_k</text>
                    <text x="250" y="190" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">d_k(C) = P</text>
                  </g>
                  <path d="M 180 180 L 72 180 L 72 110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen19)" />

                  {/* Decryption Invariance Banner */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="235" width="460" height="50" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="258" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9.5">DECRYPTION INVARIANCE PROPERTY</text>
                    <text x="250" y="272" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8.5">For all x ∈ P and k ∈ K:  d_k( e_k( x ) ) = x</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan19" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen19" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: The formal 5-tuple cryptosystem architecture satisfying the decryption invariance condition.
              </p>
            </div>

            {/* Diagram 2: ECB Leak vs GCM Authenticated Mode */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>🐧</span> Diagram B: ECB Pattern Leak vs GCM AEAD Mode
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: ECB Mode Leak */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="110" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="10">ECB MODE (Electronic Codebook) - INSECURE &amp; FORBIDDEN</text>
                    <text x="35" y="70" fill="#cbd5e1" font-family="monospace" fontSize="8.5">Block 1: [0xFF 0xFF 0xFF 0xFF] ──[AES]──➔ [0x8A 0x4C 0x12 0x9B]</text>
                    <text x="35" y="90" fill="#fca5a5" font-family="monospace" fontSize="8.5">Block 2: [0xFF 0xFF 0xFF 0xFF] ──[AES]──➔ [0x8A 0x4C 0x12 0x9B] (IDENTICAL!)</text>
                    <text x="250" y="118" fill="#fca5a5" textAnchor="middle" fontSize="8">Visual outline of bitmap images (ECB Penguin) remains 100% visible!</text>
                  </g>

                  {/* Bottom: GCM Mode */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="150" width="460" height="135" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="172" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">GCM MODE (Galois/Counter Mode) - AEAD GOLD STANDARD</text>
                    <text x="35" y="195" fill="#cbd5e1" font-family="monospace" fontSize="8.5">C_i = P_i ⊕ AES_k( Nonce || CTR_i ) + GMAC 128-bit Tag (T)</text>
                    <rect x="35" y="208" width="430" height="35" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="250" y="228" fill="#d1fae5" textAnchor="middle" fontSize="8.5">Produces Pure White Noise + Cryptographic Integrity Tag (T)!</text>
                    <text x="250" y="265" fill="#94a3b8" textAnchor="middle" fontSize="7.5">DPDP Act 2023 &amp; IT Act Section 43A: Mandates authenticated encryption for SPDI data.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: ECB mode preserves data structure, whereas GCM provides complete diffusion and authentication.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Cryptographic Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads eliminate ECB mode in payment switches, harden medical imaging nonces, audit SCADA TRNG hardware entropy, and author Shannon entropy labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Cryptographic Dilemma ({currentLocalScenario.flaw})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Security Architecture Action
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
              Guidelines for software developers and enterprise cryptographic engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Cryptographic Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Adopt AES-GCM:</strong> Provides confidentiality + 128-bit authentication tag in one pass.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Generate CSPRNG Nonces:</strong> Use <code className="text-indigo-300">crypto.randomBytes(12)</code> for 96-bit GCM nonces.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Salt Every Password:</strong> Unique salts defeat pre-computed rainbow table lookups.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Measure Shannon Entropy:</strong> Binary entropy &gt; 7.5 indicates encrypted or packed payloads.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Primitive Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using ECB Mode in Production:</strong> Preserves data patterns and bitmap silhouettes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Reusing Nonces with the Same Key:</strong> Enables Two-Time Pad crib dragging attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unauthenticated AES-CBC:</strong> Exposes applications to padding oracle decryption attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Storing Plaintext Customer SPDI:</strong> Violates IT Act Section 43A and DPDP Act 2023.</span>
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
                  <span><strong>Enforce Envelope Encryption:</strong> Use Master KEKs to wrap Data Encryption Keys (DEKs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Hardware KMS / HSM:</strong> Store root encryption keys in tamper-proof silicon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Rotate Keys Every 90 Days:</strong> Automate key rollover policies in cloud KMS services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act 2023:</strong> Maintain certified encryption safeguards for personal data.</span>
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
              Synthesize key cryptographic primitive and mode concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Software Developers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Electronic Codebook (ECB) mode is strictly forbidden in modern engineering: because it encrypts each 16-byte block independently with no chaining or randomness, encrypting structured records or images leaves visual outlines (the ECB Penguin) completely exposed in the ciphertext.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The distinct roles of Salt, IV, and Nonce: Salt is used to randomize password hashes against rainbow tables; IV is used to randomize block chaining in CBC mode; Nonce is a strictly unique counter used once per session in stream and GCM modes.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your future web and API development projects, default exclusively to Authenticated Encryption with Associated Data (AEAD - like AES-256-GCM or ChaCha20-Poly1305), ensuring data is both private and cryptographically tamper-proof.
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
                <span>Cryptosystem is formally defined as 5-tuple: (P, C, K, E, D).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Decryption invariance condition: d_k(e_k(x)) = x for all x in P.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>ECB mode encrypts blocks independently and leaks visual data patterns.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AES-GCM provides authenticated encryption (AEAD) with a 128-bit tag.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Shannon entropy measures randomness: Plaintext ~4.0, Encrypted &gt; 7.5.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023 imposes up to ₹250 Crores penalty for unencrypted data leaks.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Core Cryptographic Terminology: Plaintext, Ciphertext &amp; Keys FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Core Cryptographic Terminology: Plaintext, Ciphertext &amp; Keys (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Mastering the formal terminology of cryptography is what transforms a casual coder into an enterprise security architect. Understand why ECB mode is dangerous, why CSPRNG nonces are non-negotiable in AES-GCM, and how the 5-tuple (P, C, K, E, D) guarantees decryption invariance. When your cryptographic primitives are flawless, your applications become mathematically impenetrable."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
