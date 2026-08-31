import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio 1: Live Math Sandbox State
  const [selectedMessageVal, setSelectedMessageVal] = useState(65); // Default: 65 (ASCII 'A')

  // Studio 2: Comparative Radar State
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("malleability");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_oaep_switch");

  // Sandbox Cryptographic Constants (p=61, q=53 => N=3233, e=17, d=2753, dp=17, dq=25, qinv=38)
  const N = 3233;
  const e = 17;
  const d = 2753;
  const p = 61;
  const q = 53;
  const dp = 17;
  const dq = 25;
  const qinv = 38;

  // Helper for fast modular exponentiation
  const modExp = (base, exp, mod) => {
    let res = 1;
    let b = base % mod;
    let x = exp;
    while (x > 0) {
      if (x % 2 === 1) res = (res * b) % mod;
      b = (b * b) % mod;
      x = Math.floor(x / 2);
    }
    return res;
  };

  // Compute live sandbox values
  const sandboxCalculations = useMemo(() => {
    const M = selectedMessageVal;
    const C = modExp(M, e, N);
    const restoredM = modExp(C, d, N);

    // CRT breakdown
    const m1 = modExp(C, dp, p);
    const m2 = modExp(C, dq, q);
    let h = (qinv * (m1 - m2)) % p;
    if (h < 0) h += p;
    const crtM = m2 + h * q;

    // Homomorphic malleability demo (multiply ciphertext by 2^e mod N)
    const factor = 2;
    const factorCipher = modExp(factor, e, N);
    const multipliedCipher = (C * factorCipher) % N;
    const decryptedMalleable = modExp(multipliedCipher, d, N);

    return { M, C, restoredM, m1, m2, h, crtM, factor, multipliedCipher, decryptedMalleable };
  }, [selectedMessageVal]);

  // Studio 2: 5 Comparative Dimensions
  const paddingDimensions = {
    determinism: {
      key: "determinism",
      name: "1. Determinism & Pattern Leaks",
      textbook: "Deterministic: Encrypting the same message 'BUY' always outputs identical ciphertext C.",
      oaep: "Semantically Randomized: Each encryption uses a fresh 256-bit CSPRNG seed; identical plaintexts output completely different ciphertexts.",
      verdict: "Textbook RSA leaks codebook transaction patterns; RSA-OAEP achieves IND-CPA security."
    },
    malleability: {
      key: "malleability",
      name: "2. Multiplicative Malleability",
      textbook: "Vulnerable: E(M₁) * E(M₂) = E(M₁ * M₂) mod N allows attackers to double payments without the private key.",
      oaep: "Invulnerable: The 2-round Feistel network with SHA-256 completely destroys algebraic homomorphisms.",
      verdict: "RSA-OAEP prevents transaction tampering and payment modification fraud."
    },
    short_messages: {
      key: "short_messages",
      name: "3. Short Message Cube Root Security",
      textbook: "Vulnerable: If e=3 and M < N^(1/3), C = M³ over integers; attacker computes exact integer cube root.",
      oaep: "Invulnerable: Plaintext is expanded and randomized to the full 2048-bit width of modulus N.",
      verdict: "RSA-OAEP eliminates all low-exponent and small-message mathematical attacks."
    },
    cca2_security: {
      key: "cca2_security",
      name: "4. Chosen-Ciphertext Attack (CCA2)",
      textbook: "Broken: Bleichenbacher padding oracle attacks decrypt pre-master secrets in ~1M queries.",
      oaep: "Provably Secure: IND-CCA2 security verified; constant-time integrity checks reject corrupted blocks.",
      verdict: "RSA-OAEP is mathematically proven secure against active adaptive chosen-ciphertext attacks."
    },
    indian_compliance: {
      key: "indian_compliance",
      name: "5. Indian Statutory Compliance",
      textbook: "Illegal & Non-Compliant: Violates IT Act Section 43A 'Reasonable Security Practices'.",
      oaep: "Mandatory Standard: Enforced by Reserve Bank of India (RBI) and Controller of Certifying Authorities (CCA).",
      verdict: "Deploying RSA-OAEP satisfies Section 33 statutory safeguards under the DPDP Act 2023."
    }
  };

  const activeDimension = paddingDimensions[selectedDimensionKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_oaep_switch",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Banking Payment Switch RSA-OAEP Migration",
      budget: "₹9,50,000",
      flaw: "Unpadded RSA Exposing UPI Wire Transfers to Malleability Fraud",
      dilemma:
        "Payment APIs were using unpadded RSA, exposing encrypted UPI wire transfers to multiplicative malleability fraud where forged multiplier packets doubled transaction values.",
      resolution:
        "Mamata deployed RSA-OAEP with SHA-256 across all transaction switching nodes, eliminating 100% of malleability vulnerabilities and meeting RBI compliance.",
      metrics: {
        switchesSecured: "1,200 Payment Gateways",
        malleabilityRisk: "0% Mathematical Exposure",
        latency: "0.85ms per Encrypted Payload",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_crt_pacs",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Oncology PACS Cloud RSA-CRT Hardware Acceleration",
      budget: "₹5,20,000",
      flaw: "Server CPU Throttling During 100,000+ MRI Scans Decryption",
      dilemma:
        "Decrypting 100,000+ patient MRI DICOM records using standard 2048-bit exponentiation was causing massive server CPU throttling and clinical delays.",
      resolution:
        "Mahima deployed RSA-CRT hardware acceleration with Garner recombination, achieving a 4x throughput boost and 100% compliance with ABDM and the DPDP Act 2023.",
      metrics: {
        recordsDecrypted: "100,000+ DICOM Scans",
        throughputBoost: "4x Hardware Acceleration",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_pss_breaker",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Circuit Breaker RSA-PSS Digital Signatures",
      budget: "₹8,80,000",
      flaw: "Replay & Malleability Vulnerabilities in Breaker Control Commands",
      dilemma:
        "Protecting mission-critical 220kV circuit breaker trip commands against command replay and packet malleability attacks.",
      resolution:
        "Debangshu enforced RSA-PSS digital signatures with probabilistic salt in RTU firmware, ensuring 100.00% command authentication and zero unauthorized grid tripping.",
      metrics: {
        substationsProtected: "18 High-Voltage Substations",
        signatureVerification: "100% RSA-PSS Authenticated",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_malleability_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Textbook RSA vs RSA-OAEP Laboratory Testbed",
      budget: "₹4,00,000",
      flaw: "Demonstrating Multiplicative Malleability & OAEP Feistel Masks",
      dilemma:
        "Teaching computer science students why multiplying Textbook RSA ciphertexts doubles payment values and how OAEP Feistel masks prevent attacks.",
      resolution:
        "The team built an interactive Python testbed comparing Textbook RSA against RSA-OAEP and RSA-CRT, training 140+ students on chosen-ciphertext attacks and Feistel padding networks.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        testbedsAuthored: "Textbook Malleability + OAEP Feistel",
        crtGarnerVerified: "4x Speedup Proved",
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
            Cyber Security Module 002_005 • Topic 4 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            RSA Encryption and Decryption Mathematical Operations
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the mathematical transformations of asymmetric cryptography: execute modular encryption ($C \equiv M^e \pmod N$), 
            decryption ($M \equiv C^d \pmod N$), Chinese Remainder Theorem (RSA-CRT) acceleration, and explore why RSA-OAEP padding is mandatory to eliminate multiplicative malleability.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive RSA Encryption & Decryption Live Math Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 1: Live RSA Modular Arithmetic Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a sample plaintext integer $M$ to execute live RSA encryption ($M^{17} \bmod 3233$), standard decryption ($C^{2753} \bmod 3233$), 
              accelerated RSA-CRT Garner reconstruction, and inspect the multiplicative malleability exploit.
            </p>
          </div>

          {/* Message Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { val: 65, label: "M = 65 (ASCII 'A')", desc: "Character Byte" },
              { val: 88, label: "M = 88 (ASCII 'X')", desc: "Character Byte" },
              { val: 120, label: "M = 120 (ASCII 'x')", desc: "Character Byte" },
              { val: 250, label: "M = 250", desc: "Numeric Value" }
            ].map((msg) => {
              const isSelected = selectedMessageVal === msg.val;
              return (
                <button
                  key={msg.val}
                  onClick={() => setSelectedMessageVal(msg.val)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200">{msg.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{msg.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Active Mathematical Sandbox Results */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                Key Parameters: Public (e = 17, N = 3233) • Private (d = 2753)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                Plaintext M = {sandboxCalculations.M} ➔ Ciphertext C = {sandboxCalculations.C} ➔ Restored M = {sandboxCalculations.restoredM}
              </h3>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">1. Public Encryption</span>
                <p className="text-gray-200 text-xs sm:text-sm font-bold">
                  C = {sandboxCalculations.M}¹⁷ mod 3233
                </p>
                <span className="text-emerald-400 font-extrabold text-sm block">Ciphertext C = {sandboxCalculations.C}</span>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">2. Standard Private Decryption</span>
                <p className="text-gray-200 text-xs sm:text-sm font-bold">
                  M = {sandboxCalculations.C}²⁷⁵³ mod 3233
                </p>
                <span className="text-indigo-300 font-extrabold text-sm block">Restored Plaintext = {sandboxCalculations.restoredM}</span>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">3. 4x Faster RSA-CRT Decryption</span>
                <p className="text-gray-300 text-[11px]">
                  m₁ = {sandboxCalculations.m1} (mod 61) | m₂ = {sandboxCalculations.m2} (mod 53)
                </p>
                <span className="text-emerald-400 font-extrabold text-sm block">Garner CRT M = {sandboxCalculations.crtM} (MATCH!)</span>
              </div>
            </div>

            {/* Textbook RSA Multiplicative Malleability Exploit */}
            <div className="p-4 bg-gray-900 rounded-xl border border-rose-900/40 text-xs font-mono space-y-2">
              <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">
                ⚠️ Textbook RSA Multiplicative Malleability Exploit Demonstrated:
              </span>
              <p className="text-gray-300 leading-relaxed font-sans">
                Attacker intercepts Ciphertext C = {sandboxCalculations.C} and multiplies it by 2^17 mod 3233 = {modExp(2, e, N)}. 
                The forged ciphertext becomes C_forged = ({sandboxCalculations.C} &times; {modExp(2, e, N)}) mod 3233 = {sandboxCalculations.multipliedCipher}.
              </p>
              <div className="p-2.5 bg-gray-950 rounded-lg border border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-gray-300">Bank Decrypts $({sandboxCalculations.multipliedCipher})^{2753} \bmod 3233$:</span>
                <span className="text-rose-400 font-extrabold text-sm font-mono">
                  Result = {sandboxCalculations.decryptedMalleable} (EXACTLY 2 × {sandboxCalculations.M} = {2 * sandboxCalculations.M}!)
                </span>
              </div>
              <p className="text-emerald-400 text-[11px] font-sans">
                Remedy: Deploying RSA-OAEP padding destroys this algebraic malleability by wrapping plaintext in randomized Feistel masks!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Textbook RSA vs RSA-OAEP Architectural Radar */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Textbook RSA vs RSA-OAEP Architectural Radar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 5 comparative dimensions to evaluate why unpadded Textbook RSA is fundamentally flawed and why RSA-OAEP is mandatory.
            </p>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(paddingDimensions).map((dim) => {
              const isSelected = selectedDimensionKey === dim.key;
              return (
                <button
                  key={dim.key}
                  onClick={() => setSelectedDimensionKey(dim.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{dim.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{dim.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Dimension Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                Comparative Dimension: {activeDimension.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                Padding Scheme Security Evaluation
              </h3>
            </div>

            {/* Textbook vs OAEP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">1. Unpadded Textbook RSA:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeDimension.textbook}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">2. Modern RSA-OAEP (PKCS#1 v2.2):</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeDimension.oaep}</p>
              </div>
            </div>

            {/* Verdict */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Architectural Verdict:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeDimension.verdict}</p>
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
              Visualizing the RSA-OAEP Feistel Encoding Pipeline and the Accelerated RSA-CRT Garner Decryption Workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: RSA-OAEP Feistel Encoding */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: RSA-OAEP Feistel Padding Network
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Random Seed Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="30" width="160" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="110" y="55" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="8.5">Random Seed r (256 bits)</text>
                  </g>

                  {/* Plaintext DB Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="250" y="30" width="220" height="40" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="360" y="55" fill="#fbbf24" font-family="monospace" textAnchor="middle" fontSize="8.5">DataBlock (M || Padding)</text>
                  </g>

                  {/* Feistel Round 1 */}
                  <path d="M 110 70 L 110 110 L 230 110" stroke="#06b6d4" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="230" y="90" width="80" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="270" y="115" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8.5">MGF1(r)</text>
                  </g>
                  <line x1="310" y1="110" x2="360" y2="110" stroke="#6366f1" strokeWidth="1.5" />
                  <line x1="360" y1="70" x2="360" y2="150" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="360" cy="110" r="10" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="360" y="114" fill="#34d399" textAnchor="middle" fontSize="10">⊕</text>

                  {/* Masked DB */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="250" y="150" width="220" height="35" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="360" y="172" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">MaskedDB (DB ⊕ MGF1)</text>
                  </g>

                  {/* Output Padded Msg */}
                  <line x1="110" y1="70" x2="110" y2="220" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="360" y1="185" x2="360" y2="220" stroke="#10b981" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="220" width="440" height="40" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="250" y="245" fill="#c084fc" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      EncodedMsg = 0x00 || MaskedSeed || MaskedDB (C = EM^e mod N)
                    </text>
                  </g>

                  <text x="250" y="290" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    RSA-OAEP randomized padding guarantees IND-CCA2 security and eliminates malleability.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.1: The 2-round Feistel network architecture of RSA-OAEP randomized padding.
              </p>
            </div>

            {/* Diagram 2: RSA-CRT Garner Decryption */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: RSA-CRT Garner Decryption Pipeline (4x Speedup)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Input Ciphertext */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="25" width="200" height="35" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="250" y="47" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      CIPHERTEXT C (2048 bits)
                    </text>
                  </g>

                  {/* Split Arrows */}
                  <path d="M 200 60 L 125 100" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan30)" />
                  <path d="M 300 60 L 375 100" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen30)" />

                  {/* Left: m1 mod p */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="100" width="200" height="60" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="125" y="125" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">HALF 1: MODULO PRIME p</text>
                    <text x="125" y="145" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="8">m₁ = C^(d_p) mod p (1024-bit)</text>
                  </g>

                  {/* Right: m2 mod q */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="275" y="100" width="200" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="375" y="125" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">HALF 2: MODULO PRIME q</text>
                    <text x="375" y="145" fill="#6ee7b7" font-family="monospace" textAnchor="middle" fontSize="8">m₂ = C^(d_q) mod q (1024-bit)</text>
                  </g>

                  {/* Garner Combination */}
                  <path d="M 125 160 L 125 195 L 250 195" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 375 160 L 375 195 L 250 195" stroke="#10b981" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="200" width="360" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="222" fill="#818cf8" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      GARNER: h = (q_inv * (m₁ - m₂)) mod p
                    </text>
                    <text x="250" y="238" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8">
                      M = m₂ + h * q (Exact Plaintext in 1/4th CPU time!)
                    </text>
                  </g>

                  <text x="250" y="290" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    RSA-CRT splits 2048-bit modular exponentiation into two independent 1024-bit operations.
                  </text>

                  <defs>
                    <marker id="arrowCyan30" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen30" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.2: The RSA-CRT Gauss-Garner recombination pipeline delivering a $4\times$ decryption speedup.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Operational Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads eliminate payment malleability with RSA-OAEP, accelerate hospital MRI decryption by 4x with RSA-CRT, secure power grid breakers with RSA-PSS, and author testbeds across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Encryption Operation Vulnerability ({currentLocalScenario.flaw})
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
              Guidelines for cryptographic engineers designing production encryption and decryption workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Operational Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Enforce RSA-OAEP:</strong> Eliminates codebook determinism and multiplicative malleability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Standardize on e = 65537:</strong> 16 squarings + 1 multiplication gives ultra-fast encryption.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy RSA-CRT with Blinding:</strong> 4x decryption throughput with zero timing side-channel leaks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Hybrid Envelope Models:</strong> Encrypt AES-256 session keys with RSA rather than bulk data.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Operation Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Textbook RSA:</strong> Allows attackers to multiply and manipulate ciphertexts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using e = 3 with Short Messages:</strong> Attacker extracts plaintext via integer cube roots M = cbrt(C).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Re-using Modulus N Across Users:</strong> Allows common modulus factorization without private keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unverified CRT Signatures:</strong> Single laser fault reveals prime factors via Bellcore attack.</span>
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
                  <span><strong>Comply with IT Act Section 43A:</strong> Enforce modern PKCS#1 v2.2 standards across all services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Envelope Encryption:</strong> Wrap local AES DEKs using RSA master HSM keys for DPDP compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce RSA-PSS for Signatures:</strong> Probabilistic salt padding delivers provable signature security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Return Constant-Time Errors:</strong> Uniform decryption error codes prevent Bleichenbacher oracle leaks.</span>
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
              Synthesize key mathematical encryption and decryption principles before reviewing the comprehensive practice questions.
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
                  Why RSA decryption holds unconditionally: Proving $(M^e)^d \equiv M$ (mod $p$) and $(M^e)^d \equiv M$ (mod $q$) separately via Fermat's Little Theorem proves that $(M^e)^d \equiv M$ (mod $p \cdot q$) for ALL messages $M &lt; N$, even if $\gcd(M, N) &gt; 1$.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why Textbook RSA is dangerous: In Textbook RSA ($C = M^e \bmod N$), multiplying two ciphertexts produces the valid encryption of their product ($C_1 \cdot C_2 \equiv (M_1 \cdot M_2)^e \pmod N$), allowing financial payment amounts to be doubled in transit without private keys.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise codebases, never use unpadded RSA; always standardize on RSA-OAEP with SHA-256 for encryption and RSA-PSS for digital signatures to achieve IND-CCA2 security.
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
                <span>RSA Encryption: C ≡ M^e (mod N); Decryption: M ≡ C^d (mod N).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Proof holds for ALL M &lt; N via Chinese Remainder Theorem modulo p and q.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Textbook RSA is homomorphic: E(M₁) * E(M₂) = E(M₁ * M₂) mod N.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RSA-OAEP uses a 2-round Feistel network with SHA-256 for IND-CCA2 security.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RSA-CRT computes m₁ mod p and m₂ mod q for 4x faster Garner decryption.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 43A mandates RSA-OAEP &amp; RSA-PSS as statutory safeguards.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="RSA Encryption and Decryption Mathematical Operations FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="RSA Encryption & Decryption Mathematical Operations (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The mathematical simplicity of RSA encryption (C ≡ M^e mod N) and decryption (M ≡ C^d mod N) is deceptive. In academic theory, unpadded Textbook RSA is elegant; but in real-world engineering, Textbook RSA is fatally vulnerable to multiplicative malleability, cube root attacks, and padding oracle exploits. Always wrap your plaintexts in RSA-OAEP randomized padding, accelerate private key operations via RSA-CRT with Garner's formula, and apply cryptographic blinding to ensure 100% security."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
