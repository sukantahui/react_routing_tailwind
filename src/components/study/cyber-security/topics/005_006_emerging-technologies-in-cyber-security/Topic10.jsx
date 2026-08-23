import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import nistEnginePy from "./topic10_files/kyber_dilithium_engine.py?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgKyberId = useId();
  const svgDilithiumId = useId();

  // =========================================================================
  // STUDIO 1: NIST FIPS 203 ML-KEM (CRYSTALS-KYBER) SANDBOX
  // =========================================================================
  const [kyberLevel, setKyberLevel] = useState("ML-KEM-768"); // "ML-KEM-512", "ML-KEM-768", "ML-KEM-1024"
  const [kemExecuted, setKemExecuted] = useState(false);

  const kyberParams = {
    "ML-KEM-512": {
      name: "NIST FIPS 203 ML-KEM-512",
      securityLevel: "NIST Level 1 (AES-128 equivalent)",
      rankK: "k = 2 (2x2 Matrix)",
      pubKeySize: "800 Bytes",
      cipherSize: "768 Bytes",
      sharedSecret: "32 Bytes (256-bit symmetric key)"
    },
    "ML-KEM-768": {
      name: "NIST FIPS 203 ML-KEM-768 (Recommended Standard)",
      securityLevel: "NIST Level 3 (AES-192 equivalent)",
      rankK: "k = 3 (3x3 Matrix)",
      pubKeySize: "1,184 Bytes",
      cipherSize: "1,088 Bytes",
      sharedSecret: "32 Bytes (256-bit symmetric key)"
    },
    "ML-KEM-1024": {
      name: "NIST FIPS 203 ML-KEM-1024 (Defense Grade)",
      securityLevel: "NIST Level 5 (AES-256 equivalent)",
      rankK: "k = 4 (4x4 Matrix)",
      pubKeySize: "1,568 Bytes",
      cipherSize: "1,568 Bytes",
      sharedSecret: "32 Bytes (256-bit symmetric key)"
    }
  };

  const currentKyber = kyberParams[kyberLevel];

  // =========================================================================
  // STUDIO 2: NIST FIPS 204 ML-DSA (CRYSTALS-DILITHIUM) SIGNATURE SIMULATOR
  // =========================================================================
  const [docToSign, setDocToSign] = useState("Authorize Barrackpore Treasury Disbursement ₹45,00,000");
  const [signatureGenerated, setSignatureGenerated] = useState(false);

  const dilithiumResult = useMemo(() => {
    return {
      standard: "NIST FIPS 204 ML-DSA-65 (Level 3)",
      pubKeySize: "1,952 Bytes",
      sigSize: "3,293 Bytes",
      rejectionLoops: "2 Rejection Iterations (Norm bounded to ||z|| < gamma1 - beta)",
      sigHash: "0x8f9a2b4c10e7d58a",
      status: signatureGenerated ? "DIGITAL SIGNATURE VALIDATED ✔ (FIPS 204 Certified)" : "IDLE (Click 'Sign Document')",
      badgeColor: signatureGenerated ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-slate-800 text-slate-400 border-slate-700"
    };
  }, [docToSign, signatureGenerated]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_mldsa_treasury");

  const regionalDrills = {
    barrackpore_mldsa_treasury: {
      id: "barrackpore_mldsa_treasury",
      title: "Barrackpore Municipal Treasury: Hybrid TLS 1.3 & ML-DSA Rollout",
      location: "Municipal financial portal processing disbursements of ₹85,00,000 across 40 department branches",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Archived treasury wire authorizations protected under RSA-2048 were vulnerable to retro-quantum decryption and forgery.",
      solution:
        "Deployed NGINX reverse proxies with OpenSSL 3.0 oqsprovider serving Hybrid X25519Kyber768 TLS 1.3 and ML-DSA-65 client certificates.",
      outcome:
        "100% quantum-safe web sessions; average TLS handshake latency increased by only 2.1 milliseconds."
    },
    kolkata_fintech_mldsa_core: {
      id: "kolkata_fintech_mldsa_core",
      title: "Salt Lake Sector V FinTech: NIST FIPS 204 Core Banking Migration",
      location: "Core payment switch executing ₹15,00,00,000 in daily interbank settlements",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "High-volume interbank API channels required post-quantum digital signatures without exceeding microsecond SLAs.",
      solution:
        "Integrated AVX2-accelerated ML-DSA-65 signature verification and tuned Linux kernel TCP initial congestion windows (`initcwnd 30`).",
      outcome:
        "Zero TCP packet fragmentation; verified sub-100 microsecond signature checks on payment APIs."
    },
    ichapur_defense_cnsa2_deployment: {
      id: "ichapur_defense_cnsa2_deployment",
      title: "Ichapur Ordnance Manufacturing: NSA CNSA 2.0 Level-5 Hardening",
      location: "Classified defense manufacturing CAD and telemetry communications",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Nation-state adversaries targeted high-value military CAD blueprints with advanced cryptanalytic quantum tools.",
      solution:
        "Deployed maximum-security NIST Level 5 standards (ML-KEM-1024 for key exchange and ML-DSA-87 for digital signatures).",
      outcome:
        "Certified 100% compliance with CNSA 2.0 defense standards; complete mathematical immunity against Shor's algorithm."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 10
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                NIST Post-Quantum Standards: CRYSTALS-Kyber &amp; CRYSTALS-Dilithium
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-indigo-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            In August 2024, NIST released the finalized Federal Information Processing Standards (FIPS) for the post-quantum era.
            Dissect <strong>NIST FIPS 203: ML-KEM (CRYSTALS-Kyber)</strong> for general-purpose key encapsulation, master 
            <strong>NIST FIPS 204: ML-DSA (CRYSTALS-Dilithium)</strong> for digital signatures via <strong>Fiat-Shamir with Aborts</strong>, 
            explore <strong>Fujisaki-Okamoto (FO) transform decapsulation</strong>, and analyze 
            <strong>Hybrid TLS 1.3 (`X25519Kyber768`) deployment architecture</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: NIST FIPS 203 ML-KEM (CRYSTALS-KYBER) SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔐</span> Studio 1: NIST FIPS 203 ML-KEM (CRYSTALS-Kyber) Key Encapsulation Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Select a parameter tier to simulate key generation, matrix polynomial expansion, and encapsulation of 256-bit symmetric session keys.
              </p>
            </div>
            <div className="flex gap-2">
              {Object.keys(kyberParams).map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setKyberLevel(level);
                    setKemExecuted(false);
                  }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    kyberLevel === level
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {level.replace("ML-KEM-", "Level ")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">{currentKyber.name}</span>
                <span className="text-indigo-400 font-mono text-xs">{currentKyber.securityLevel}</span>
              </div>

              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Module Matrix Rank:</span>
                  <span className="text-white">{currentKyber.rankK}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Public Key Size (pk):</span>
                  <span className="text-amber-400 font-bold">{currentKyber.pubKeySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ciphertext Size (c):</span>
                  <span className="text-cyan-400 font-bold">{currentKyber.cipherSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shared Secret Derived:</span>
                  <span className="text-emerald-400 font-bold">{currentKyber.sharedSecret}</span>
                </div>
              </div>

              <button
                onClick={() => setKemExecuted(true)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg shadow-indigo-950 transition-all duration-200"
              >
                Execute ML-KEM Encapsulation &amp; Decapsulation ⚡
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  KEM Handshake Telemetry
                </span>
                
                {kemExecuted ? (
                  <div className="p-3 bg-slate-900 rounded-lg border border-emerald-800/60 font-mono text-[11px] space-y-1.5">
                    <div className="text-emerald-400 font-bold">✔ KeyGen(): Public key t = A*s + e generated.</div>
                    <div className="text-cyan-300">✔ Encaps(pk): Generated ciphertext (u, v) + Secret K.</div>
                    <div className="text-purple-300">✔ Decaps(c, sk): FO transform re-encryption verified!</div>
                    <div className="text-white font-bold pt-1 border-t border-slate-800 truncate">
                      Shared Key: 0x8a92b4c10e7d58a3f91...
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-800 text-slate-500 text-center py-6">
                    Click 'Execute ML-KEM' to simulate post-quantum key encapsulation.
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Fujisaki-Okamoto Protection: </strong> The FO transform re-encrypts the recovered plaintext and tests for identical ciphertext, guaranteeing IND-CCA2 security!
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: NIST FIPS 204 ML-DSA (CRYSTALS-DILITHIUM) SIGNATURE SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>✍️</span> Studio 2: NIST FIPS 204 ML-DSA (CRYSTALS-Dilithium) Signature Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Sign a document using Fiat-Shamir with Aborts, observing rejection sampling loops that prevent secret key statistical leakage.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", dilithiumResult.badgeColor)}>
              {dilithiumResult.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Document Signing Input
              </span>

              <div className="space-y-1.5">
                <span className="text-slate-300 font-semibold block">Disbursement Authorization String:</span>
                <input
                  type="text"
                  value={docToSign}
                  onChange={(e) => {
                    setDocToSign(e.target.value);
                    setSignatureGenerated(false);
                  }}
                  className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                <div>{"$\\mathbf{z} = \\mathbf{y} + c\\mathbf{s}_1$ (Fiat-Shamir with Aborts)"}</div>
                <div className="text-[10px] text-slate-400">{"Rejects candidate signatures where $||\\mathbf{z}||_\\infty \\ge \\gamma_1 - \\beta$."}</div>
              </div>

              <button
                onClick={() => setSignatureGenerated(true)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow-lg shadow-purple-950 transition-all duration-200"
              >
                Generate NIST FIPS 204 ML-DSA Signature ✍️
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  ML-DSA Signature Attributes
                </span>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Public Key Size:</span>
                    <span className="text-white">{dilithiumResult.pubKeySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Signature Payload Size:</span>
                    <span className="text-amber-400 font-bold">{dilithiumResult.sigSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rejection Sampling Loops:</span>
                    <span className="text-cyan-400">{dilithiumResult.rejectionLoops}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Signature Hash Commitment:</span>
                    <span className="text-emerald-400 font-bold">{dilithiumResult.sigHash}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Zero Knowledge Leakage: </strong> Fiat-Shamir with Aborts mathematically guarantees that accepted signature vectors have zero correlation with secret key distributions!
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 3: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Case studies of municipal hybrid TLS 1.3 gateways, ML-DSA banking migrations, and NSA CNSA 2.0 defense deployments.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(regionalDrills).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    activeDrillKey === key
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_mldsa_treasury" ? "Barrackpore Hybrid TLS" : key === "kolkata_fintech_mldsa_core" ? "Kolkata Banking ML-DSA" : "Ichapur CNSA 2.0"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-indigo-400 font-mono bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Scenario</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400 uppercase text-[10px] tracking-wider block">NIST PQC Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Measurable Outcome</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Mistakes
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Side-Channel Timing Leaks:</strong> Non-constant-time polynomial operations leak secret key coefficients through CPU cache timing measurements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Reusing Ephemeral ML-KEM Private Keys:</strong> Key reuse without strict FO transform verification allows adversaries to exploit decryption failure errors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Overlooking TCP Packet Fragmentation:</strong> ML-DSA certificates (> 3 KB) exceed standard 1,460-byte MSS; tune Linux `initcwnd` to 30 packets.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> NIST PQC Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Hybrid TLS 1.3 (X25519Kyber768):</strong> Combine classical and post-quantum key encapsulation to protect against HNDL traffic harvesting today.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enable TLS Certificate Compression (RFC 8879):</strong> Compress ML-DSA certificates using zstd/brotli to preserve fast mobile connection handshakes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Dual-Signed X.509 PKI:</strong> Sign certificates with both RSA-2048 and ML-DSA-65 for seamless backward compatibility during transition.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-300">Think About:</span>
              <p className="leading-relaxed">
                Why does ML-DSA use 'Fiat-Shamir with Aborts'? Because in lattice signatures, if the candidate signature vector is too large, it leaks the secret key distribution! Rejection sampling aborts and restarts, guaranteeing zero statistical private key leakage!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>NIST FIPS 203 is ML-KEM (CRYSTALS-Kyber) for Key Encapsulation.</li>
                <li>NIST FIPS 204 is ML-DSA (CRYSTALS-Dilithium) for Digital Signatures.</li>
                <li>NIST FIPS 205 is SLH-DSA (SPHINCS+) for Stateless Hash Signatures.</li>
                <li>ML-KEM-768 and ML-DSA-65 are the primary Level 3 enterprise standards.</li>
                <li>Hybrid TLS 1.3 combines classical X25519 and ML-KEM-768.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on NIST PQC Standards (Kyber &amp; Dilithium) Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating ML-KEM-768 encapsulation, ML-DSA-65 Fiat-Shamir signing, and parameter benchmarking
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={nistEnginePy}
            title="kyber_dilithium_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="NIST Post-Quantum Standards (Kyber &amp; Dilithium) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the official NIST Post-Quantum Cryptography standards: FIPS 203 ML-KEM (CRYSTALS-Kyber), FIPS 204 ML-DSA (CRYSTALS-Dilithium), and FIPS 205 SLH-DSA (SPHINCS+). Detail the parameter sets (ML-KEM-512/768/1024 and ML-DSA-44/65/87). Explain how the Fujisaki-Okamoto (FO) transform guarantees IND-CCA2 security during decapsulation and describe why Fiat-Shamir with Aborts uses rejection sampling to eliminate private key leakage."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 10: NIST Post-Quantum Standards Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 10 Note"
            downloadFileName="topic10_nist_pqc_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
