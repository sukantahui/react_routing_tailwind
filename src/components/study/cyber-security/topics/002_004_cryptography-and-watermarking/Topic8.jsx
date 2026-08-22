import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Signing Sandbox State
  const [docText, setDocText] = useState("APPROVE ₹50,00,000 NEFT SETTLEMENT TO BENGAL POWER GRID");
  const [isTampered, setIsTampered] = useState(false);

  // Studio 2: Algorithm Selector State
  const [selectedAlgoKey, setSelectedAlgoKey] = useState("ed25519");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_ed25519_settle");

  // Studio 1: Deterministic Signing Simulator
  const signingSimulation = useMemo(() => {
    // Generate base hash for document
    let seed = 0;
    for (let i = 0; i < docText.length; i++) {
      seed = (seed * 31 + docText.charCodeAt(i)) & 0xffffffff;
    }

    const pseudoHex = (len, offset) => {
      let result = "";
      let s = (seed + offset) & 0xffffffff;
      const hexChars = "0123456789abcdef";
      for (let i = 0; i < len; i++) {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        result += hexChars[s % 16];
      }
      return result;
    };

    const docHash = pseudoHex(64, 501);
    const validSignature = pseudoHex(128, 777); // 64 bytes = 128 hex chars
    const signatureToVerify = isTampered ? validSignature.replace(/^[0-9a-f]{4}/, "dead") : validSignature;
    const isValid = !isTampered;

    return {
      docHash,
      signature: signatureToVerify,
      isValid,
      statusMessage: isValid
        ? "✔ SIGNATURE VALID: Verified authentic author identity & 100% data integrity."
        : "✖ INTEGRITY COMPROMISED: Calculated hash does NOT match signature! Tampering detected."
    };
  }, [docText, isTampered]);

  // Studio 2: Signature Algorithm Profiles Data
  const signatureAlgoProfiles = {
    rsa_pkcs1: {
      key: "rsa_pkcs1",
      name: "RSA-PKCS#1 v1.5 (Legacy)",
      standard: "PKCS#1 v1.5 (1993)",
      signatureSize: "256 bytes (2048-bit modulus)",
      nonceDependency: "Deterministic padding (Zero random nonce required)",
      vulnerability: "Vulnerable to Bleichenbacher padding oracle & existential signature forgery attacks.",
      legalStatus: "Legacy format; deprecated for new applications by NIST and RBI.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    rsa_pss: {
      key: "rsa_pss",
      name: "RSA-PSS (Probabilistic Signature Scheme)",
      standard: "PKCS#1 v2.2 / FIPS 186-5 (2002)",
      signatureSize: "256 bytes (2048-bit modulus)",
      nonceDependency: "Uses randomized salt with Mask Generation Function (MGF1)",
      vulnerability: "Provably secure; zero known padding oracle or mathematical reduction flaws.",
      legalStatus: "Global gold standard for RSA; legally recognized in Indian IT Act Section 5.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    ecdsa: {
      key: "ecdsa",
      name: "ECDSA (Elliptic Curve Digital Signature Algorithm)",
      standard: "ANSI X9.62 / FIPS 186-4 (1999)",
      signatureSize: "64 bytes (r, s pairs over P-256)",
      nonceDependency: "CRITICAL RANDOM NONCE (k) REQUIRED ON EVERY SIGNATURE",
      vulnerability: "Catastrophic: Reusing or biasing nonce k reveals the master private key (Sony PS3 disaster).",
      legalStatus: "Standard in Bitcoin and TLS 1.2; requires strict RFC 6979 deterministic nonce protection.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    ed25519: {
      key: "ed25519",
      name: "Ed25519 (Edwards-curve DSA)",
      standard: "RFC 8032 / FIPS 186-5 (2011)",
      signatureSize: "64 bytes (High-performance Ed25519 curve)",
      nonceDependency: "100% DETERMINISTIC: Nonce derived via SHA-512(K_priv || Message)",
      vulnerability: "Immune to random number generator failures, nonce reuse, and side-channel timing attacks.",
      legalStatus: "Modern standard for SSH, Signal, WebAuthn, and next-gen Indian FinTech APIs.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeAlgo = signatureAlgoProfiles[selectedAlgoKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_ed25519_settle",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Merchant Payment Settlement Ed25519 Migration",
      budget: "₹9,50,000",
      legacyFlaw: "High-Volume ECDSA Microservice Nonce Exhaustion Risks",
      dilemma:
        "High-volume merchant settlement API was using ECDSA, risking catastrophic private key leakage if container clusters suffered random entropy exhaustion during transaction spikes.",
      resolution:
        "Mamata migrated settlement signatures to deterministic Ed25519 (RFC 8032), processing 10,000 signatures/sec with zero RNG failure vulnerability and 100% RBI compliance.",
      metrics: {
        throughput: "10,000 Signatures / Second",
        rngFailureRisk: "0% Mathematical Exposure",
        signatureSize: "Compact 64-Byte Payloads",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_dsc_ehr",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Hospital Clinical EHR Class-3 DSC Integration",
      budget: "₹5,20,000",
      legacyFlaw: "Disputed Discharge Summaries and Diagnostic Reports",
      dilemma:
        "Hospital discharge summaries and diagnostic lab reports were disputed in malpractice cases due to lack of statutory non-repudiation in court.",
      resolution:
        "Mahima equipped 180+ hospital physicians with CCA India Class-3 DSC cryptographic USB tokens, digitally signing 50,000+ patient records under Section 5 of the IT Act 2000 and DPDP Act 2023.",
      metrics: {
        physiciansEquipped: "180+ FIPS 140-2 Crypto Tokens",
        recordsSigned: "50,000+ Electronic Health Profiles",
        legalAdmissibility: "100% Section 5 IT Act Validated",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_breaker_pss",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Breaker Control RSA-PSS Authentication",
      budget: "₹8,80,000",
      legacyFlaw: "Unauthenticated Remote Breaker Tripping Commands",
      dilemma:
        "Preventing unauthorized remote grid breaker tripping commands from being injected into 220kV power substation communication buses.",
      resolution:
        "Debangshu enforced RSA-PSS digital signature verification inside RTU controller microcode, rejecting any unsigned control command and guaranteeing 100% grid stability.",
      metrics: {
        controlCommandIntegrity: "100% RSA-PSS Signed Packets",
        rogueCommandsRejected: "0% Unauthorized Breaker Trips",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_ps3_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Sony PS3 Nonce Attack & Post-Quantum Lab",
      budget: "₹4,00,000",
      legacyFlaw: "Teaching the Mathematics of the 2010 Sony PS3 ECDSA Hack",
      dilemma:
        "Teaching computer science students how the Sony PS3 repeated-nonce vulnerability works in Python and how to implement NIST FIPS 204 ML-DSA Dilithium signatures.",
      resolution:
        "The team built an interactive laboratory simulating ECDSA private key recovery from duplicate nonces and implementing NIST FIPS 204 Dilithium signatures, training 140+ students.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        nonceFormulaSimulated: "d = (s1*k - z1) / r mod n",
        pqcSignaturesTested: "FIPS 204 ML-DSA-65",
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
            Cyber Security Module 002_004 • Topic 8 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Message Integrity and Digital Signatures
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the mathematics of digital trust: master the Hash-then-Sign paradigm, RSA-PSS vs Ed25519, 
            the Sony PS3 ECDSA nonce reuse disaster, X.509 PKI trust chains, and Class-3 DSC legal admissibility under Indian IT Act Section 5.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Digital Signature Signing & Verification Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>✍️</span> Studio 1: Digital Signature Signing &amp; Verification Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Type or modify the document payload below. The engine computes the SHA-256 digest and signs it with Alice's private key. Toggle the "Tamper Payload / Signature" button to see how altering a single character immediately breaks mathematical verification.
            </p>
          </div>

          <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-5 shadow-2xl">
            {/* Input Document */}
            <div className="space-y-1.5 text-xs">
              <label className="text-gray-300 font-bold uppercase tracking-wider block">Document Text to Sign:</label>
              <input
                type="text"
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Type document text..."
              />
            </div>

            {/* Tamper Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTampered(!isTampered)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center gap-2",
                  isTampered
                    ? "bg-rose-950 text-rose-200 border-rose-600 shadow-lg shadow-rose-950/50"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-750"
                )}
              >
                <span>{isTampered ? "⚠️ Tampering Active (Signature Forged)" : "🛡 Simulate Adversary Tampering"}</span>
              </button>
              <span className="text-[11px] text-gray-400 font-mono">
                {isTampered ? "Tampering enabled: Signature bytes corrupted!" : "Payload pristine: Valid signature"}
              </span>
            </div>

            {/* Digest & Signature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-gray-900 rounded-xl border border-blue-900/40 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">1. Document SHA-256 Digest (32 Bytes):</span>
                <span className="text-gray-300 truncate block font-extrabold">{signingSimulation.docHash}</span>
              </div>

              <div className="p-3.5 bg-gray-900 rounded-xl border border-purple-900/40 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">2. Digital Signature (Alice_K_priv):</span>
                <span className={clsx("truncate block font-extrabold", isTampered ? "text-rose-400" : "text-emerald-400")}>
                  {signingSimulation.signature}
                </span>
              </div>
            </div>

            {/* Verification Status Banner */}
            <div
              className={clsx(
                "p-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-between transition-all duration-300",
                signingSimulation.isValid
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700 shadow-lg shadow-emerald-950/40"
                  : "bg-rose-950/80 text-rose-300 border-rose-700 shadow-lg shadow-rose-950/40"
              )}
            >
              <span>{signingSimulation.statusMessage}</span>
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-black/40 border border-white/10">
                {signingSimulation.isValid ? "STATUS: 200 OK" : "STATUS: 403 REJECT"}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: Digital Signature Algorithm Evolution & Security Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Digital Signature Algorithm Evolution Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare RSA-PKCS#1 v1.5, RSA-PSS, ECDSA, and Ed25519: inspect signature sizes, nonce failure points (the Sony PS3 disaster), and Indian legal recognition under IT Act Section 5.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(signatureAlgoProfiles).map((alg) => {
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
                >
                  <div className="font-bold text-gray-200 truncate">{alg.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{alg.signatureSize.split(" ")[0]} Bytes</div>
                </button>
              );
            })}
          </div>

          {/* Active Algorithm Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeAlgo.badgeClass)}>
                  {activeAlgo.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeAlgo.standard}
                </h3>
              </div>
            </div>

            {/* Nonce & Signature Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Signature Output Size</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeAlgo.signatureSize}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Random Nonce (k) Requirement</span>
                <span className="font-bold text-indigo-300 text-xs sm:text-sm">{activeAlgo.nonceDependency}</span>
              </div>
            </div>

            {/* Vulnerability & Legal Weight */}
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-gray-900 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Vulnerability &amp; Padding Failure History:</span>
                <p className="text-gray-200 font-semibold leading-relaxed">{activeAlgo.vulnerability}</p>
              </div>

              <div className="p-4 bg-gray-900/90 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Indian Legal Admissibility (IT Act Section 5):</span>
                <p className="text-gray-200 font-semibold leading-relaxed">{activeAlgo.legalStatus}</p>
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
              Visualizing the Complete Digital Signature Pipeline and the Sony PS3 ECDSA Nonce Attack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Digital Signature Lifecycle */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Digital Signature Pipeline (Hash-then-Sign)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Sender Alice */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="125" y="47" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="10">1. SENDER (ALICE SIGNS)</text>
                    <rect x="35" y="65" width="180" height="30" rx="4" fill="#1e1b4b" />
                    <text x="125" y="84" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8">Document (M)</text>
                    <line x1="125" y1="95" x2="125" y2="120" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo24)" />
                    <rect x="35" y="120" width="180" height="30" rx="4" fill="#083344" />
                    <text x="125" y="139" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="8">SHA-256 Digest: H(M)</text>
                    <line x1="125" y1="150" x2="125" y2="175" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan24)" />
                    <rect x="35" y="175" width="180" height="35" rx="4" fill="#064e3b" />
                    <text x="125" y="195" fill="#d1fae5" textAnchor="middle" fontSize="8">Sign with Alice_K_priv</text>
                    <text x="125" y="240" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">Output: Signature (S)</text>
                  </g>

                  {/* Receiver Bob */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="375" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">2. RECEIVER (BOB VERIFIES)</text>
                    <rect x="285" y="65" width="180" height="30" rx="4" fill="#1e1b4b" />
                    <text x="375" y="84" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8">Compute SHA-256: H(M)</text>
                    <line x1="375" y1="95" x2="375" y2="120" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen24)" />
                    <rect x="285" y="120" width="180" height="30" rx="4" fill="#064e3b" />
                    <text x="375" y="139" fill="#d1fae5" textAnchor="middle" fontSize="8">Verify with Alice_K_pub</text>
                    <line x1="375" y1="150" x2="375" y2="175" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen24)" />
                    <rect x="285" y="175" width="180" height="35" rx="4" fill="#064e3b" />
                    <text x="375" y="197" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">VERIFY(H, S, Alice_Pub)</text>
                    <text x="375" y="240" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">Match == TRUE (Valid!)</text>
                  </g>

                  <text x="250" y="290" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    IT Act 2000 Section 5: Asymmetric signatures provide full legal non-repudiation in Indian courts.
                  </text>

                  <defs>
                    <marker id="arrowIndigo24" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowCyan24" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen24" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: The Hash-then-Sign digital signature lifecycle providing Integrity, Authentication, and Non-Repudiation.
              </p>
            </div>

            {/* Diagram 2: Sony PS3 Nonce Attack */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️</span> Diagram B: The Sony PS3 ECDSA Repeated-Nonce Hack
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Flawed Generation Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="450" height="95" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="10">SONY PS3 HARDCODED STATIC NONCE FLAW (2010)</text>
                    <text x="40" y="70" fill="#cbd5e1" font-family="monospace" fontSize="8.5">Game 1 Signed: s1 = k^(-1) * (z1 + r*d) mod n</text>
                    <text x="40" y="88" fill="#cbd5e1" font-family="monospace" fontSize="8.5">Game 2 Signed: s2 = k^(-1) * (z2 + r*d) mod n (SAME NONCE k!)</text>
                  </g>

                  {/* Math Extraction Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="135" width="450" height="110" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="157" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">MATHEMATICAL PRIVATE KEY EXTRACTION</text>
                    <text x="40" y="180" fill="#fca5a5" font-family="monospace" fontSize="9">Step 1: Nonce Recovery:       k = (z1 - z2) / (s1 - s2) mod n</text>
                    <text x="40" y="202" fill="#fca5a5" font-family="monospace" fontSize="9">Step 2: Private Key Recovery: d = (s1*k - z1) / r mod n</text>
                    <text x="250" y="230" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      ROOT PRIVATE KEY EXTRACTED -> ALL CONSOLES PERMANENTLY JAILBROKEN!
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Remedy: Always use Ed25519 (RFC 8032) where nonces are deterministic hashes (r = SHA-512(K_priv || M)).
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: The mathematics of the 2010 Sony PS3 ECDSA hack: duplicate nonces reveal the private key instantly.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Digital Signature Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads deploy Ed25519 on 10,000 TPS settlement gateways, equip 180+ hospital physicians with Class-3 DSCs under IT Act Section 5, enforce SCADA RSA-PSS commands, and author PQC labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Signature Dilemma ({currentLocalScenario.legacyFlaw})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Remediation &amp; Modernization Action
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
              Guidelines for system architects designing legal digital signature infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Digital Signature Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Default to Ed25519:</strong> Deterministic nonces prevent private key extraction completely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Hash-then-Sign:</strong> Compress payload with SHA-256 before asymmetric signing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Store Keys in FIPS HSMs:</strong> Master signing keys must reside in tamper-resistant silicon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce OCSP Stapling:</strong> Eliminate certificate revocation lookup latency on web servers.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Signature Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Claiming HMAC is Non-Repudiable:</strong> Both parties share the key; either could forge it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Reusing Nonces in ECDSA:</strong> Two signatures with the same nonce expose the private key (Sony PS3).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Legacy RSA PKCS#1 v1.5:</strong> Deterministic padding allows Bleichenbacher forgery attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Failing to Check Revocation:</strong> Accepting certificates that were compromised and revoked by CAs.</span>
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
                  <span><strong>Comply with IT Act Section 5:</strong> Deploy CCA India-licensed Class-3 DSCs for all contracts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Implement Certificate Transparency:</strong> Monitor public Merkle logs for unauthorized certificates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Threshold Signatures (t, n):</strong> Require multi-executive signing for high-value banking transfers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Prepare for FIPS 204 ML-DSA:</strong> Pilot Post-Quantum lattice signatures in production environments.</span>
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
              Synthesize key digital signature concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Software Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why digital signatures provide legal Non-Repudiation while symmetric HMACs cannot: in an asymmetric signature, ONLY the author holds the private key (e.g. inside a hardware FIPS 140-2 USB token), so no one else in the world could have authored the document.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The lesson of the 2010 Sony PlayStation 3 hack: ECDSA requires a truly random nonce $k$ for every single signature. If $k$ repeats even once, an attacker calculates the private key in milliseconds. Ed25519 permanently eliminates this flaw by deriving $r$ deterministically via SHA-512.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise microservice APIs, migrate legacy RSA-PKCS#1 v1.5 signatures to RSA-PSS or Ed25519, ensuring mathematical immunity to Bleichenbacher forgery attacks.
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
                <span>Digital Signature = Sign( Hash(M), PrivateKey ); Verified with Public Key.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Guarantees 3 pillars: Message Integrity, Authentication, and Non-Repudiation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Symmetric HMAC cannot provide Non-Repudiation; only Asymmetric signatures can.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Sony PS3 hack (2010): Reusing ECDSA nonce k leaked root private key instantly.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Ed25519 uses deterministic nonces (r = SHA-512(K_priv || M)), immune to RNG bias.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 5 gives Class-3 DSCs identical legal weight to ink signatures.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Message Integrity and Digital Signatures FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Message Integrity and Digital Signatures (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Digital Signatures are the pinnacle of digital authenticity and legal accountability. They transform abstract mathematical trapdoor functions into unforgeable legal instruments. Pay close attention to why symmetric HMACs cannot provide non-repudiation, remember the cautionary tale of the Sony PS3 nonce disaster, and master why Ed25519 and RSA-PSS are the gold standards for securing modern digital society."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
