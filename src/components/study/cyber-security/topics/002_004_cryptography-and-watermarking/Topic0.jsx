import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Studio 1: Attack Model State
  const [selectedModelKey, setSelectedModelKey] = useState("coa_attack");

  // Studio 2: Frequency Analysis Cipher State
  const [selectedCipherSampleKey, setSelectedCipherSampleKey] = useState("caesar_sample");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_aes_gcm");

  // Cryptanalysis Attack Models Data for Studio 1
  const attackModels = {
    coa_attack: {
      key: "coa_attack",
      name: "Ciphertext-Only Attack (COA)",
      attackerPossession: "Attacker intercepts ONLY encrypted ciphertext strings with zero access to plaintext.",
      mathematicalFlaw: "Statistical language redundancy; single-letter and digraph frequencies (ETAOIN SHRDLU) remain unmasked.",
      historicExample: "Breaking classical monoalphabetic substitution ciphers (Caesar, ROT13) via frequency histograms.",
      blueTeamDefense: "Modern block ciphers with Shannon diffusion (AES-256) where output is indistinguishable from random noise.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "📜"
    },
    kpa_attack: {
      key: "kpa_attack",
      name: "Known-Plaintext Attack (KPA)",
      attackerPossession: "Attacker possesses matching pairs of plaintext and ciphertext: P and C = Enc(P).",
      mathematicalFlaw: "Linear relationships in round keys or predictable header patterns in repetitive messages.",
      historicExample: "Alan Turing & Bletchley Park using predictable 06:00 AM German weather reports ('Cribs') to break Enigma.",
      blueTeamDefense: "Eliminating static predictable headers, using large pseudo-random Initialization Vectors (IVs) and high key entropy.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      icon: "🧩"
    },
    cpa_attack: {
      key: "cpa_attack",
      name: "Chosen-Plaintext Attack (CPA)",
      attackerPossession: "Attacker can submit arbitrary plaintexts of their choice to an encryption oracle and receive ciphertexts.",
      mathematicalFlaw: "Non-random statistical propagation of input differences through cipher Substitution Boxes (S-Boxes).",
      historicExample: "Differential Cryptanalysis (Biham & Shamir) breaking 16-round DES faster than brute-force search.",
      blueTeamDefense: "Cryptographic S-Boxes with optimal non-linearity and high round counts (14 rounds in AES-256).",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      icon: "🧪"
    },
    cca_attack: {
      key: "cca_attack",
      name: "Chosen-Ciphertext Attack (CCA / CCA2)",
      attackerPossession: "Attacker can submit crafted ciphertexts to a decryption oracle and observe plaintext or error codes.",
      mathematicalFlaw: "Malleable padding oracles; servers leaking error timing or error messages on malformed padding.",
      historicExample: "Bleichenbacher's Million Message Attack exploiting RSA PKCS#1 v1.5 padding errors to decrypt TLS sessions.",
      blueTeamDefense: "Authenticated Encryption with Associated Data (AEAD: AES-GCM, ChaCha20-Poly1305) and RSA-OAEP padding.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      icon: "💥"
    },
    sca_attack: {
      key: "sca_attack",
      name: "Side-Channel Attack (SCA)",
      attackerPossession: "Attacker measures physical implementation leaks: execution time, power draw (DPA), or electromagnetic noise.",
      mathematicalFlaw: "Data-dependent execution paths (early-exit string comparisons) and variable CPU power consumption.",
      historicExample: "Differential Power Analysis (DPA) on smartcards and timing attacks on early SSL RSA implementations.",
      blueTeamDefense: "Constant-time cryptographic code (`CRYPTO_memcmp`), hardware blinding, and power regulator shielding.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "⚡"
    }
  };

  const activeModel = attackModels[selectedModelKey];

  // Frequency Analysis Sample Data for Studio 2
  const cipherSamples = {
    caesar_sample: {
      key: "caesar_sample",
      name: "Classical Caesar Cipher (Shift +3)",
      ciphertext: "WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ",
      letterDistribution: [
        { letter: "H", count: 4, pct: "12.5%", mapsTo: "E (Shifted by 3)" },
        { letter: "K", count: 3, pct: "9.4%", mapsTo: "H" },
        { letter: "R", count: 3, pct: "9.4%", mapsTo: "O" },
        { letter: "W", count: 3, pct: "9.4%", mapsTo: "T" },
        { letter: "U", count: 3, pct: "9.4%", mapsTo: "R" }
      ],
      verdict: "HIGHLY VULNERABLE: Letter frequency peaks match standard English shifted by 3 positions!",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    modern_aes: {
      key: "modern_aes",
      name: "Modern AES-256-GCM Ciphertext",
      ciphertext: "7a 8f 3c 9e 11 d4 b0 88 52 f1 c6 39 a4 e0 27 d8...",
      letterDistribution: [
        { letter: "0x88", count: 1, pct: "3.8%", mapsTo: "Uniform Noise" },
        { letter: "0x3C", count: 1, pct: "3.8%", mapsTo: "Uniform Noise" },
        { letter: "0x9E", count: 1, pct: "3.8%", mapsTo: "Uniform Noise" },
        { letter: "0xD4", count: 1, pct: "3.8%", mapsTo: "Uniform Noise" },
        { letter: "0x52", count: 1, pct: "3.8%", mapsTo: "Uniform Noise" }
      ],
      verdict: "IMPREGNABLE: Flat, uniform distribution exhibiting complete Shannon confusion and diffusion.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeSample = cipherSamples[selectedCipherSampleKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_aes_gcm",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Banking Cipher Suite Upgrade to AES-GCM-256",
      budget: "₹9,50,000",
      focus: "Authenticated Encryption (AEAD) & Kerckhoffs's Principle",
      dilemma:
        "Legacy 3DES payment transaction switches were vulnerable to Sweet32 64-bit block collision attacks and CBC padding oracles.",
      resolution:
        "Mamata migrated core switches to AES-GCM-256 (AEAD), eliminating Chosen-Ciphertext padding oracles and enforcing Kerckhoffs's Principle across all merchant gateway clusters.",
      metrics: {
        legacyCiphersRetired: "100% 3DES & RC4 Deprecated",
        aeadEnforcement: "AES-256-GCM with 96-bit Nonce",
        sweet32Vulnerability: "0% Collision Attack Surface",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_constant_time",
      lead: "Mahima",
      role: "Chief Healthcare Information Officer",
      location: "Ichapur General Hospital",
      title: "Patient EHR Constant-Time Decryption Hardening",
      budget: "₹5,20,000",
      focus: "Side-Channel Timing Attack Mitigation",
      dilemma:
        "Vulnerable early-exit string comparisons in the hospital PACS archive allowed microsecond side-channel timing attacks to deduce cryptographic HMAC tokens.",
      resolution:
        "Mahima refactored cryptographic libraries to use constant-time bitwise comparisons (`CRYPTO_memcmp`), eliminating microsecond timing variations and protecting 50,000+ patient records.",
      metrics: {
        timingLeakage: "0.00 Microseconds Variance (Constant Time)",
        patientRecordsProtected: "50,000+ Clinical EHR Profiles",
        hmacVerification: "Constant-Time Bitwise XOR Validation",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_dpa",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Hardware DPA Power Hardening",
      budget: "₹8,80,000",
      focus: "Differential Power Analysis (DPA) Side-Channel Defense",
      dilemma:
        "Analyzing whether micro-watt power draw fluctuations in 220kV substation RTU cryptographic chips leaked secret keys to oscilloscope probes.",
      resolution:
        "Debangshu deployed Differential Power Analysis (DPA) countermeasures and noise-generating power regulators on hardware cryptographic coprocessors, neutralizing physical side-channel attacks.",
      metrics: {
        powerTraceCorrelation: "0% Statistical Key Correlation",
        hardwareShielding: "Tamper-Evident Crypto Module Housing",
        gridSecurity: "100% Substation Key Protection",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_kasiski",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Vigenère Kasiski Cryptanalysis Laboratory",
      budget: "₹4,00,000",
      focus: "Statistical Frequency Analysis & Polyalphabetic Decryption",
      dilemma:
        "Teaching cybersecurity students how to apply statistical frequency analysis and Kasiski tests to calculate polyalphabetic key lengths in Python.",
      resolution:
        "The team built an interactive Python cryptanalysis laboratory analyzing English letter distributions (ETAOIN SHRDLU), guiding 140+ students through breaking historic ciphers and understanding modern Shannon diffusion.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        ciphersAnalyzed: "Caesar, Vigenère, Playfair, Enigma",
        pythonToolsAuthored: "Automated Kasiski Key Length Estimator",
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
            Cyber Security Module 002_004 • Topic 0 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Introduction to Cryptography and Cryptanalysis
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the foundational mathematical science of Cryptology: master Kerckhoffs's Principle, 
            Claude Shannon's confusion and diffusion, the 5 cryptanalysis attack models, and statistical frequency analysis.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Cryptanalysis Attack Models Interactive Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 1: Cryptanalysis Attack Models Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a cryptanalysis attack model to inspect the attacker's capabilities, mathematical vulnerability exploited, historic real-world example, and modern defensive countermeasures.
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(attackModels).map((mod) => {
              const isSelected = selectedModelKey === mod.key;
              return (
                <button
                  key={mod.key}
                  onClick={() => setSelectedModelKey(mod.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{mod.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{mod.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{mod.key.split("_")[0].toUpperCase()}</div>
                </button>
              );
            })}
          </div>

          {/* Active Model Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeModel.badgeClass)}>
                  {activeModel.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Adversary Capability &amp; Mathematical Vulnerability
                </h3>
              </div>
            </div>

            {/* Attacker Possession */}
            <div className="p-4 bg-gray-900 rounded-xl border border-blue-900/30 space-y-1 text-xs">
              <span className="text-blue-400 font-bold uppercase tracking-wider block">Attacker Information &amp; Oracle Access:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeModel.attackerPossession}</p>
            </div>

            {/* Math Flaw vs Historic Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Mathematical Vulnerability</span>
                <p className="text-gray-300 leading-relaxed">{activeModel.mathematicalFlaw}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Historic / Real-World Example</span>
                <p className="text-gray-300 leading-relaxed">{activeModel.historicExample}</p>
              </div>
            </div>

            {/* Blue Team Defense */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Modern Blue Team Defense &amp; Hardening:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeModel.blueTeamDefense}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Letter Frequency Analysis Cryptanalysis Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 2: Letter Frequency Analysis Cryptanalysis Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare how classical monoalphabetic substitution ciphers leak statistical letter frequencies (ETAOIN SHRDLU) while modern AES-256 produces uniform statistical noise.
            </p>
          </div>

          {/* Cipher Sample Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(cipherSamples).map((cs) => {
              const isSelected = selectedCipherSampleKey === cs.key;
              return (
                <button
                  key={cs.key}
                  onClick={() => setSelectedCipherSampleKey(cs.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{cs.name}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{cs.key === "caesar_sample" ? "Statistical Leakage Present" : "Shannon Confusion & Diffusion"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Cipher Analysis Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSample.badgeClass)}>
                  {activeSample.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Ciphertext Statistical Distribution Analysis
                </h3>
              </div>
            </div>

            {/* Ciphertext Box */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Raw Ciphertext Sample:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-indigo-300 overflow-x-auto whitespace-pre-wrap">
                {activeSample.ciphertext}
              </pre>
            </div>

            {/* Frequency Histogram Table */}
            <div className="space-y-2 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Top Character Frequency Distribution:</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px]">
                {activeSample.letterDistribution.map((ld, idx) => (
                  <div key={idx} className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                    <div className="text-white font-bold text-sm">{ld.letter}</div>
                    <div className="text-emerald-400 font-bold">{ld.pct}</div>
                    <div className="text-[10px] text-gray-400">{ld.mapsTo}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verdict */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Cryptanalysis Verdict:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeSample.verdict}</p>
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
              Visualizing the Taxonomy of Cryptology and the Cryptanalysis Attack Models Spectrum.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Cryptology Taxonomy */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Taxonomy of Cryptology
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Root: Cryptology */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="160" y="25" width="180" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="250" y="48" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">CRYPTOLOGY</text>
                    <text x="250" y="62" fill="#a5b4fc" textAnchor="middle" fontSize="8">The Science of Secret Communications</text>
                  </g>

                  {/* Branch Lines */}
                  <line x1="210" y1="75" x2="125" y2="125" stroke="#6366f1" strokeWidth="2" />
                  <line x1="290" y1="75" x2="375" y2="125" stroke="#6366f1" strokeWidth="2" />

                  {/* Left: Cryptography */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="125" width="190" height="85" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="125" y="148" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">CRYPTOGRAPHY</text>
                    <text x="125" y="163" fill="#a7f3d0" textAnchor="middle" fontSize="8">Cipher Design &amp; Encryption</text>
                    <text x="125" y="180" fill="#cbd5e1" textAnchor="middle" fontSize="7.5">• Symmetric Ciphers (AES)</text>
                    <text x="125" y="195" fill="#cbd5e1" textAnchor="middle" fontSize="7.5">• Asymmetric Ciphers (RSA, ECC)</text>
                  </g>

                  {/* Right: Cryptanalysis */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="280" y="125" width="190" height="85" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="375" y="148" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">CRYPTANALYSIS</text>
                    <text x="375" y="163" fill="#fca5a5" textAnchor="middle" fontSize="8">Codebreaking &amp; Attack Models</text>
                    <text x="375" y="180" fill="#cbd5e1" textAnchor="middle" fontSize="7.5">• Ciphertext-Only (COA)</text>
                    <text x="375" y="195" fill="#cbd5e1" textAnchor="middle" fontSize="7.5">• Chosen-Plaintext / Side-Channel</text>
                  </g>

                  {/* Kerckhoffs's Principle Banner */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="235" width="440" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="258" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9.5">KERCKHOFFS'S PRINCIPLE (1883)</text>
                    <text x="250" y="274" fill="#cbd5e1" textAnchor="middle" fontSize="8">"System security must depend solely on the secrecy of the key, not on the algorithm."</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.1: The dual branches of Cryptology: Cryptography (design) and Cryptanalysis (breaking).
              </p>
            </div>

            {/* Diagram 2: Attack Models Capability Spectrum */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>⚔️</span> Diagram B: Cryptanalysis Attack Models Spectrum
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Spectrum Arrow */}
                  <line x1="50" y1="45" x2="450" y2="45" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowIndigo18)" />
                  <text x="50" y="32" fill="#94a3b8" fontSize="8">Least Attacker Access</text>
                  <text x="450" y="32" fill="#ef4444" textAnchor="end" fontSize="8">Maximum Attacker Access</text>

                  {/* Level 1: COA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="65" width="95" height="150" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="72" y="90" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. COA</text>
                    <text x="72" y="105" fill="#a5b4fc" textAnchor="middle" fontSize="7">Ciphertext Only</text>
                    <text x="72" y="130" fill="#94a3b8" textAnchor="middle" fontSize="6.5">Attacker has only</text>
                    <text x="72" y="142" fill="#94a3b8" textAnchor="middle" fontSize="6.5">intercepted</text>
                    <text x="72" y="154" fill="#94a3b8" textAnchor="middle" fontSize="6.5">ciphertexts.</text>
                  </g>

                  {/* Level 2: KPA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="135" y="65" width="95" height="150" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="182" y="90" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. KPA</text>
                    <text x="182" y="105" fill="#a5f3fc" textAnchor="middle" fontSize="7">Known Plaintext</text>
                    <text x="182" y="130" fill="#94a3b8" textAnchor="middle" fontSize="6.5">Has matching</text>
                    <text x="182" y="142" fill="#94a3b8" textAnchor="middle" fontSize="6.5">pairs of (P, C).</text>
                    <text x="182" y="154" fill="#94a3b8" textAnchor="middle" fontSize="6.5">(Enigma Cribs)</text>
                  </g>

                  {/* Level 3: CPA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="245" y="65" width="95" height="150" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <text x="292" y="90" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. CPA</text>
                    <text x="292" y="105" fill="#fde68a" textAnchor="middle" fontSize="7">Chosen Plaintext</text>
                    <text x="292" y="130" fill="#94a3b8" textAnchor="middle" fontSize="6.5">Chooses P,</text>
                    <text x="292" y="142" fill="#94a3b8" textAnchor="middle" fontSize="6.5">obtains C.</text>
                    <text x="292" y="154" fill="#94a3b8" textAnchor="middle" fontSize="6.5">(Differential)</text>
                  </g>

                  {/* Level 4: CCA */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="355" y="65" width="115" height="150" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="412" y="90" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. CCA / SCA</text>
                    <text x="412" y="105" fill="#fca5a5" textAnchor="middle" fontSize="7">Chosen Ciphertext</text>
                    <text x="412" y="130" fill="#94a3b8" textAnchor="middle" fontSize="6.5">Chooses C, gets P;</text>
                    <text x="412" y="142" fill="#94a3b8" textAnchor="middle" fontSize="6.5">Measures timing</text>
                    <text x="412" y="154" fill="#94a3b8" textAnchor="middle" fontSize="6.5">&amp; power leakage.</text>
                  </g>

                  {/* Summary */}
                  <text x="250" y="255" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8.5">
                    Modern Ciphers (AES-256) are mathematically secure against COA, KPA, CPA, and CCA!
                  </text>
                  <text x="250" y="272" fill="#94a3b8" textAnchor="middle" fontSize="7.5">
                    IT Act 2000 Section 66 &amp; 69: Interception and unauthorized decryption carries up to 7 years prison.
                  </text>

                  <defs>
                    <marker id="arrowIndigo18" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 0.2: Cryptanalysis attack models categorized by the degree of information available to the attacker.
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
              Explore how security leads upgrade banking cipher suites to AES-GCM, mitigate EHR side-channel timing leaks, harden SCADA RTUs against power analysis, and author Kasiski cryptanalysis labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Cryptographic Dilemma ({currentLocalScenario.focus})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Engineering Action &amp; Remediation
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
              Guidelines for software engineers and cryptographic security auditors.
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
                  <span><strong>Never Invent Custom Ciphers:</strong> Always use open, peer-reviewed standards (AES-GCM, Libsodium).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Write Constant-Time Code:</strong> Prevent side-channel timing leaks with <code className="text-indigo-300">CRYPTO_memcmp()</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Kerckhoffs's Principle:</strong> Keep the key secret, but keep the algorithm open to audit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Adopt Authenticated Encryption:</strong> Use AEAD modes to prevent padding oracle chosen-ciphertext attacks.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Crypto Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Reusing Nonces in Stream Ciphers:</strong> Enables catastrophic Two-Time Pad crib dragging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Security through Obscurity:</strong> Hiding proprietary algorithms creates false security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using AES-ECB Mode:</strong> Preserves plaintext patterns (the famous ECB Penguin leak).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unauthorized Decryption:</strong> Violates Section 66 and 69 of the Indian IT Act 2000.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Prepare for Post-Quantum (PQC):</strong> Begin migrating RSA/ECC to NIST ML-KEM standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Hardware Security Modules:</strong> Store root encryption keys in tamper-resistant HSMs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Rotate Keys Regularly:</strong> Automate cryptographic key rotation policies every 90 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Act 2023 Safeguards:</strong> Encrypt all personal data at rest and in transit.</span>
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
              Synthesize key cryptographic and cryptanalysis concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cryptographers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Kerckhoffs's Principle: why the mathematical algorithm should always be public. Because when an algorithm is open, thousands of expert cryptanalysts test it for flaws. If the math survives decades of global scrutiny, you know your security truly rests solely on the secret key.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Claude Shannon's dual concepts of Confusion (obscuring key statistics via S-Boxes) and Diffusion (spreading plaintext bits via P-Boxes): together, they create the Avalanche Effect where changing 1 bit in the input flips 50% of the output bits.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future software projects, never compare cryptographic tokens (like HMACs or password hashes) with standard string equality operators (`==`) which exit early; always use constant-time comparison functions to eliminate side-channel timing leaks.
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
                <span>Cryptology = Cryptography (Cipher Design) + Cryptanalysis (Codebreaking).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Kerckhoffs's Principle: System security depends solely on the secrecy of the key.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Confusion obscures the key (S-Boxes); Diffusion spreads plaintext statistics (P-Boxes).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The One-Time Pad is mathematically unbreakable if the key is random &amp; never reused.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Side-channel attacks exploit physical leakage (timing, power DPA, acoustics).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 66 and 69 penalize unauthorized interception and decryption.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Introduction to Cryptography and Cryptanalysis FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Cryptography and Cryptanalysis (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 002_004: Cryptography, Watermarking & Cipher Types! Cryptology is the mathematical cornerstone of our entire digital civilization. As you begin this journey, remember Kerckhoffs's immortal wisdom: true cryptographic security is never born from hidden algorithms, but from rigorous, peer-reviewed mathematics and uncompromised key stewardship."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
