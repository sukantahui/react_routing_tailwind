import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pqcEnginePy from "./topic9_files/pqc_lattice_hash_engine.py?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgLatticeId = useId();
  const svgHyperTreeId = useId();

  // =========================================================================
  // STUDIO 1: LATTICE LEARNING WITH ERRORS (LWE) SIMULATOR
  // =========================================================================
  const [inputBit, setInputBit] = useState(1);
  const [errorMagnitude, setErrorMagnitude] = useState(1); // 0 (Zero noise), 1 (Normal noise), 3 (High noise - decryption failure)

  const lweSimulation = useMemo(() => {
    const q = 97;
    // Toy 4-element secret vector s
    const s = [1, -1, 0, 1];
    // Encrypted vector computation: v = dot(b, r) + bit * (q/2) + noise
    const baseSignal = inputBit * Math.floor(q / 2);
    const noise = errorMagnitude === 3 ? 32 : errorMagnitude === 1 ? 4 : 0;
    const receivedVal = (baseSignal + noise) % q;
    
    // Decryption decision boundary: check distance to q/2 (48) vs 0/97
    const diffToHalf = Math.abs(receivedVal - 48);
    const decryptedBit = diffToHalf < 24 ? 1 : 0;
    const isSuccess = decryptedBit === inputBit;

    return {
      q,
      receivedVal,
      noise,
      decryptedBit,
      isSuccess,
      status: isSuccess ? "DECRYPTION SUCCESSFUL ✔ (Quantum-Safe Lattice Match)" : "DECRYPTION NOISE FAILURE 🚨 (Noise Exceeded Decision Boundary)",
      badgeColor: isSuccess ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700",
      explanation: isSuccess
        ? `Lattice LWE vector decrypted correctly. Noise magnitude (${noise}) remained well within the decision threshold ($< q/4 = 24$).`
        : `Decryption failure! Cumulative Gaussian noise (${noise}) exceeded the decision boundary threshold, causing a bit-flip error.`
    };
  }, [inputBit, errorMagnitude]);

  // =========================================================================
  // STUDIO 2: PQC ALGORITHM BENCHMARK MATRIX (NIST STANDARDS)
  // =========================================================================
  const [selectedAlgo, setSelectedAlgo] = useState("ML-KEM-768");

  const algoProfiles = {
    "ML-KEM-768": {
      name: "ML-KEM-768 (CRYSTALS-Kyber - NIST FIPS 203)",
      family: "Module-Lattice (Module-LWE)",
      useCase: "General Key Encapsulation (TLS 1.3 & VPN Handshakes)",
      pubKeySize: "1,184 Bytes",
      sigCipherSize: "1,088 Bytes (Ciphertext)",
      quantumSecurity: "NIST Level 3 (AES-192 equivalent)",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
      notes: "Primary global standard for post-quantum key exchange. Fast microsecond NTT multiplication."
    },
    "ML-DSA-65": {
      name: "ML-DSA-65 (CRYSTALS-Dilithium - NIST FIPS 204)",
      family: "Module-Lattice (Fiat-Shamir with Aborts)",
      useCase: "General Digital Signatures (X.509 PKI & Identity)",
      pubKeySize: "1,952 Bytes",
      sigCipherSize: "3,293 Bytes (Signature)",
      quantumSecurity: "NIST Level 3 (AES-192 equivalent)",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
      notes: "Primary digital signature standard. Replaces RSA and ECDSA across enterprise PKI."
    },
    "SLH-DSA-128": {
      name: "SLH-DSA-128 (SPHINCS+ - NIST FIPS 205)",
      family: "Stateless Hash-Based (Merkle Hypertree + FORS)",
      useCase: "Firmware Signing & Long-Term Archive Trust",
      pubKeySize: "32 Bytes (Ultra-Compact)",
      sigCipherSize: "7,856 Bytes (Large Signature)",
      quantumSecurity: "NIST Level 1 (AES-128 equivalent)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      notes: "Highest mathematical trust. Relies strictly on SHA-256 with zero unproven algebraic assumptions."
    },
    "RSA-2048": {
      name: "RSA-2048 (Legacy Classical Standard)",
      family: "Integer Prime Factorization ($N = p \\cdot q$)",
      useCase: "Legacy Web PKI & Signatures (Deprecated)",
      pubKeySize: "256 Bytes",
      sigCipherSize: "256 Bytes",
      quantumSecurity: "0 Bits (COMPLETELY BROKEN BY SHOR'S) 🚨",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      notes: "Cracked in ~8.4 hours on a 4,100 logical qubit CRQC. Complete enterprise migration required."
    }
  };

  const currentAlgo = algoProfiles[selectedAlgo];

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_mldsa_pki");

  const regionalDrills = {
    barrackpore_mldsa_pki: {
      id: "barrackpore_mldsa_pki",
      title: "Barrackpore Municipal Treasury: NIST FIPS 204 ML-DSA Transition",
      location: "Municipal employee smart card PKI issuing digital signatures across 40 departments",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Legacy RSA-2048 smart card certificates were vulnerable to retroactive forgery under future quantum computers.",
      solution:
        "Migrated certificate authority to NIST FIPS 204 ML-DSA-65 with streaming NTT in-place verification.",
      outcome:
        "100% quantum-resistant authentication; verified 1.2ms signature checks on low-power municipal terminals."
    },
    kolkata_fintech_slhdsa_firmware: {
      id: "kolkata_fintech_slhdsa_firmware",
      title: "Salt Lake Sector V FinTech: Stateless SLH-DSA POS Terminal Signing",
      location: "Merchant payment POS terminal network managing 50,000 active hardware devices",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Stateful XMSS signatures suffered catastrophic private key reuse risks during VM snapshot rollbacks in cloud CI/CD pipelines.",
      solution:
        "Deployed Stateless NIST FIPS 205 (SLH-DSA / SPHINCS+), eliminating state counter tracking completely.",
      outcome:
        "100% immune to VM rollback key leakage; guaranteed 50-year quantum firmware validation security."
    },
    ichapur_defense_hybrid_mlkem: {
      id: "ichapur_defense_hybrid_mlkem",
      title: "Ichapur Ordnance Manufacturing: Hybrid X25519Kyber768 WAN",
      location: "Classified defense manufacturing CAD and telemetry networks",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Foreign adversaries intercepted IPsec WAN traffic under 'Harvest Now, Decrypt Later' (HNDL) programs.",
      solution:
        "Deployed Hybrid TLS 1.3 tunnels combining classical X25519 with NIST FIPS 203 ML-KEM-768.",
      outcome:
        "Neutralized all traffic harvesting; certified compliance with NSA CNSA 2.0 post-quantum mandates."
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
                <span className="px-3 py-1 bg-purple-950 text-purple-400 border border-purple-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 9
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Post-Quantum Cryptography (PQC): Lattice-Based &amp; Hash-Based Cryptography
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-purple-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Post-Quantum Cryptography (PQC) delivers mathematical algorithms that run on existing classical computers but are proven 
            immune to attacks by both classical and quantum supercomputers.
            Explore the mathematics of <strong>High-Dimensional Lattices (SVP, CVP &amp; Learning With Errors - LWE)</strong>, analyze 
            <strong>Hash-Based Signatures (Lamport OTS &amp; Stateless SPHINCS+ / SLH-DSA)</strong>, examine 
            <strong>Number Theoretic Transforms (NTT)</strong>, and evaluate the <strong>NIST FIPS 203/204/205 Standards Portfolio</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: LATTICE LEARNING WITH ERRORS (LWE) SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📐</span> Studio 1: Lattice Learning With Errors (LWE) Encryption Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Encode a binary message bit into a high-dimensional lattice vector and observe how Gaussian error noise affects decryption boundaries.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", lweSimulation.badgeColor)}>
              {lweSimulation.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                LWE Vector Encoding Controls
              </span>

              <div className="space-y-1.5">
                <span className="text-slate-300 font-semibold block">Input Plaintext Bit to Encrypt:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setInputBit(0)}
                    className={clsx(
                      "flex-1 py-2 rounded-lg font-bold transition-all duration-200",
                      inputBit === 0
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    )}
                  >
                    Bit '0' (Center at 0)
                  </button>
                  <button
                    onClick={() => setInputBit(1)}
                    className={clsx(
                      "flex-1 py-2 rounded-lg font-bold transition-all duration-200",
                      inputBit === 1
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    )}
                  >
                    Bit '1' (Center at q/2 = 48)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Gaussian Noise Magnitude ($e$):</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {errorMagnitude === 0 ? "Zero Noise (0)" : errorMagnitude === 1 ? "Normal Noise (+4)" : "Extreme Noise (+32 🚨)"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setErrorMagnitude(0)}
                    className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", errorMagnitude === 0 ? "bg-slate-800 text-white border-slate-600" : "bg-slate-950 text-slate-500 border-slate-800")}
                  >
                    Zero Noise
                  </button>
                  <button
                    onClick={() => setErrorMagnitude(1)}
                    className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", errorMagnitude === 1 ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-slate-950 text-slate-500 border-slate-800")}
                  >
                    Standard Noise (LWE)
                  </button>
                  <button
                    onClick={() => setErrorMagnitude(3)}
                    className={clsx("flex-1 py-1.5 rounded-lg text-[11px] font-bold border", errorMagnitude === 3 ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-slate-950 text-slate-500 border-slate-800")}
                  >
                    Excessive Noise (Fail)
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                <div>{"$\\mathbf{b} = \\mathbf{A}\\mathbf{s} + \\mathbf{e} \\pmod q$"}</div>
                <div className="text-[10px] text-slate-400">Modulus $q = 97$ | Signal Center: Bit 0 = $0$, Bit 1 = $48$</div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Received Vector Sample</span>
                    <span className="font-mono font-bold text-white text-sm">{lweSimulation.receivedVal} / 97</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Decrypted Bit Result</span>
                    <span className={clsx("font-mono font-bold text-sm", lweSimulation.isSuccess ? "text-emerald-400" : "text-rose-400")}>
                      Bit '{lweSimulation.decryptedBit}' {lweSimulation.isSuccess ? "(MATCH ✔)" : "(BIT FLIP 🚨)"}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  {lweSimulation.explanation}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Fujisaki-Okamoto Protection: </strong> The FO transform verifies ciphertext consistency upon decapsulation to prevent adversaries from exploiting rare decryption failures!
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: NIST PQC ALGORITHM BENCHMARK MATRIX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📊</span> Studio 2: NIST PQC Finalized Standards Portfolio Benchmark
              </h2>
              <p className="text-xs text-slate-400">
                Select an algorithm to compare mathematical foundations, key sizes, signature lengths, and quantum security margins.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", currentAlgo.badgeColor)}>
              {currentAlgo.quantumSecurity}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {Object.keys(algoProfiles).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedAlgo(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    selectedAlgo === key
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">{currentAlgo.name}</span>
                <span className="text-purple-400 text-xs">{currentAlgo.useCase}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-sans">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Mathematical Family</span>
                  <span className="font-mono text-cyan-400 font-bold text-xs">{currentAlgo.family}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Public Key Size</span>
                  <span className="font-mono text-amber-400 font-bold text-xs">{currentAlgo.pubKeySize}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Signature / Ciphertext</span>
                  <span className="font-mono text-emerald-400 font-bold text-xs">{currentAlgo.sigCipherSize}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Quantum Security Status</span>
                  <span className={clsx("font-mono font-bold text-xs", currentAlgo.quantumSecurity.includes("BROKEN") ? "text-rose-400" : "text-emerald-400")}>
                    {currentAlgo.quantumSecurity}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 leading-relaxed font-sans">
                <strong className="text-white">Architectural Note: </strong>
                {currentAlgo.notes}
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
                Case studies of ML-DSA smart card PKI migrations, stateless SLH-DSA firmware signing, and hybrid ML-KEM WAN tunnels.
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
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_mldsa_pki" ? "Barrackpore ML-DSA PKI" : key === "kolkata_fintech_slhdsa_firmware" ? "Kolkata SLH-DSA POS" : "Ichapur Hybrid ML-KEM"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-purple-400 font-mono bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Vector</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-purple-400 uppercase text-[10px] tracking-wider block">PQC Architecture</span>
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
                <span><strong>Reusing Stateful XMSS Leaf Keys:</strong> Reusing a one-time OTS leaf key leaks private strings, allowing adversaries to forge digital signatures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring PQC Key Size Network Overhead:</strong> Dilithium and Kyber keys (&gt; 1 KB) exceed 1,460-byte TCP MSS, causing packet fragmentation unless tuned.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Deploying Non-Standardized PQC Schemes:</strong> Avoid broken or non-standardized schemes like SIKE and Rainbow; deploy only NIST FIPS 203/204/205.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> PQC Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Standardize on NIST FIPS 203 (ML-KEM) &amp; FIPS 204 (ML-DSA):</strong> Module-Lattice algorithms provide optimal performance and compact key sizes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Stateless SLH-DSA for Firmware:</strong> Eliminate state tracking risks during VM snapshot rollbacks in cloud CI/CD pipelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Streaming NTT Verification:</strong> Optimize polynomial arithmetic to verify PQC signatures on RAM-constrained smart cards.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-purple-300">Think About:</span>
              <p className="leading-relaxed">
                Why is the Number Theoretic Transform (NTT) so crucial for lattice cryptography? Because multiplying two degree-256 polynomials in schoolbook math takes $256^2 = 65,536$ operations, while NTT takes only $256 \log_2(256) \approx 2,048$ operations (over 30x faster)!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Lattice security is based on Shortest Vector Problem (SVP) in high dimensions.</li>
                <li>Learning With Errors (LWE) adds Gaussian noise to linear equations ($b = As + e$).</li>
                <li>NIST FIPS 203 ML-KEM (Kyber) is the standard for Key Encapsulation.</li>
                <li>NIST FIPS 204 ML-DSA (Dilithium) is the standard for Digital Signatures.</li>
                <li>NIST FIPS 205 SLH-DSA (SPHINCS+) is the stateless hash-based standard.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-950 border border-purple-800 text-purple-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Post-Quantum Cryptography (Lattice &amp; Hash) Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating LWE encryption, Lamport OTS signatures, and NIST PQC benchmark comparisons
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={pqcEnginePy}
            title="pqc_lattice_hash_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Post-Quantum Cryptography (Lattice &amp; Hash) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the mathematical definition of a Lattice and explain the Shortest Vector Problem (SVP) and Closest Vector Problem (CVP). Detail the Learning With Errors (LWE) formula ($\mathbf{b} = \mathbf{A}\mathbf{s} + \mathbf{e} \pmod q$) and explain why small Gaussian noise prevents Gaussian elimination. Describe Lamport One-Time Signatures (OTS) and why key reuse causes security collapse. Detail the official NIST PQC standards: FIPS 203 ML-KEM (Kyber), FIPS 204 ML-DSA (Dilithium), and FIPS 205 SLH-DSA (SPHINCS+)."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 9: Post-Quantum Cryptography Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 9 Note"
            downloadFileName="topic9_pqc_lattice_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
