import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic3_files/vpn_crypto_engine.py?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgCryptoTriadId = useId();
  const svgAntiReplayId = useId();

  // Studio 1: Active Cryptographic Service Selection
  const [selectedServiceKey, setSelectedServiceKey] = useState("confidentiality_aead");

  // Studio 2: Live Cryptographic Pipeline Simulator State
  const [selectedCipherChoice, setSelectedCipherChoice] = useState("aes_256_gcm");
  const [attackSimulationType, setAttackSimulationType] = useState("normal"); // "normal", "tamper", "replay"

  // Studio 3: Performance & Hardware Crypto Calculations
  const [cryptoThroughputGbps, setCryptoThroughputGbps] = useState(4); // 1 to 20 Gbps
  const [hardwareAccelerationEnabled, setHardwareAccelerationEnabled] = useState(true);
  const [packetSizeAverageBytes, setPacketSizeAverageBytes] = useState(1360); // 512 to 1420 Bytes

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_scada_crypto");

  // Comparison Database for Studio 1
  const cryptoServices = {
    confidentiality_aead: {
      key: "confidentiality_aead",
      title: "1. Confidentiality (AEAD Symmetric Ciphers)",
      category: "Data Privacy",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      mechanism: "Symmetric key encryption transforms plaintext into mathematical ciphertext in a single authenticated pass.",
      algorithms: "AES-256-GCM (Hardware Accelerated via AES-NI), ChaCha20-Poly1305 (Ultra-fast on ARM mobile).",
      securityAdvantage: "Provides 256-bit quantum-resistant symmetric security, preventing eavesdroppers from reading data.",
      verdict: "AES-256-GCM is the modern enterprise gold standard, eliminating CBC padding vulnerabilities."
    },
    data_integrity: {
      key: "data_integrity",
      title: "2. Data Integrity & Anti-Tampering",
      category: "Cryptographic Hashing",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      mechanism: "Computes a 128-bit or 256-bit cryptographic authentication tag over the ciphertext and packet sequence number.",
      algorithms: "HMAC-SHA-256, HMAC-SHA-384, Poly1305, GMAC.",
      securityAdvantage: "Detects and discards any packet modified, bit-flipped, or injected by a Man-in-the-Middle (MitM) attacker.",
      verdict: "AEAD combines integrity with encryption, completely immunizing against padding-oracle timing leaks."
    },
    mutual_authentication: {
      key: "mutual_authentication",
      title: "3. Mutual Identity Authentication",
      category: "Identity Assurance",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      mechanism: "Both client and gateway present and verify X.509 digital certificates and user identity before tunnel negotiation.",
      algorithms: "RSA-3072 / RSA-4096, ECDSA (P-256 / P-384), Ed25519, FIDO2 WebAuthn MFA.",
      securityAdvantage: "Neutralizes rogue gateway spoofing and credential theft via hardware TPM-tethered private keys.",
      verdict: "Always enforce Mutual TLS (mTLS) and machine certificates to prevent unauthorized rogue access."
    },
    perfect_forward_secrecy: {
      key: "perfect_forward_secrecy",
      title: "4. Perfect Forward Secrecy & Anti-Replay",
      category: "Key Exchange & Counters",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      mechanism: "Generates ephemeral single-use session keys via Curve25519 / ECDHE and tracks packets in a 64-bit sliding window.",
      algorithms: "ECDHE-Curve25519, ML-KEM-768 (Hybrid Post-Quantum), IPsec 64-packet Anti-Replay Window.",
      securityAdvantage: "Ensures stolen master private keys cannot decrypt past recorded sessions; drops duplicate replay packets.",
      verdict: "PFS guarantees long-term historical confidentiality against 'Harvest Now, Decrypt Later' attacks."
    }
  };

  // Studio 2: Live Evaluation Logic
  const pipelineResult = useMemo(() => {
    if (attackSimulationType === "tamper") {
      return {
        status: "TAMPER_DETECTED",
        verdict: "❌ INTEGRITY ERROR: Auth Tag Mismatch! Bit-Flip Tampering Dropped.",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        seqNumber: 42,
        ciphertextHex: "7F4A99B812C450E72B33880F1A29D4E6...FF (Flipped Byte)",
        authTagStatus: "❌ FAILED (Calculated Tag != Received Tag)",
        antiReplayStatus: "✔ Sequence #42 Valid (Tamper Caught at Step 2)",
        recoveredData: "[REJECTED - DATA TAMPERED IN TRANSIT]",
        explanation: "A simulated MitM attacker flipped the last byte of the encrypted packet. The GMAC / Poly1305 authentication tag failed verification, and the packet was instantly discarded before reaching memory!"
      };
    } else if (attackSimulationType === "replay") {
      return {
        status: "REPLAY_DETECTED",
        verdict: "❌ REPLAY ATTACK BLOCKED: Duplicate Sequence #41 Rejected!",
        badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
        seqNumber: 41,
        ciphertextHex: "7F4A99B812C450E72B33880F1A29D4E6...00 (Duplicate)",
        authTagStatus: "✔ Valid HMAC (Captured from earlier session)",
        antiReplayStatus: "❌ FAILED: Sequence #41 already in processed bitmask!",
        recoveredData: "[REJECTED - DUPLICATE PACKET DISCARDED]",
        explanation: "An adversary captured a valid encrypted SCADA command and re-sent it across the wire. The VPN gateway's anti-replay sliding window detected that Sequence #41 was already executed and dropped the duplicate."
      };
    } else {
      return {
        status: "VERIFIED",
        verdict: "✔ 100% SECURE: Confidentiality, Integrity & Replay Checks Passed!",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        seqNumber: 43,
        ciphertextHex: "7F4A99B812C450E72B33880F1A29D4E67789AABB...",
        authTagStatus: "✔ PASSED (AEAD 128-bit Tag Match)",
        antiReplayStatus: "✔ PASSED: Sequence #43 New & In-Window",
        recoveredData: "SCADA_VALVE_OPEN_PURIFICATION_PUMP_04_BARRACKPORE",
        explanation: "The packet was encrypted with AES-256-GCM / ChaCha20, authenticated with a 128-bit tag, verified through the anti-replay window, and safely decrypted at the gateway."
      };
    }
  }, [selectedCipherChoice, attackSimulationType]);

  // Studio 3: Performance Calculations
  const calculatedCryptoMetrics = useMemo(() => {
    // Packets per second (Millions)
    const packetsPerSecondMillions = (((cryptoThroughputGbps * 1000 * 1000 * 1000) / 8) / packetSizeAverageBytes / 1000000).toFixed(2);
    // CPU Utilization Estimate (%)
    const cpuUtilizationPercent = hardwareAccelerationEnabled
      ? (Number(packetsPerSecondMillions) * 4.2).toFixed(0) // AES-NI hardware offload
      : (Number(packetsPerSecondMillions) * 28.5).toFixed(0); // Software crypto overhead

    // 5-Year Hardware Crypto Concentrator TCO (INR ₹ Lakhs)
    const hardwareApplianceLakhs = (cryptoThroughputGbps * 1.8 + 7.5).toFixed(2);
    const hsmKeyVaultLakhs = 6.5;
    const fiveYearTcoLakhs = (Number(hardwareApplianceLakhs) + hsmKeyVaultLakhs + 4.0).toFixed(2);

    return {
      packetsPerSecondMillions,
      cpuUtilizationPercent,
      fiveYearTcoLakhs
    };
  }, [cryptoThroughputGbps, hardwareAccelerationEnabled, packetSizeAverageBytes]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_scada_crypto: {
      id: "barrackpore_scada_crypto",
      title: "Barrackpore Water Treatment SCADA High-Security Cryptographic Mesh",
      location: "Barrackpore Water Purification Plant to Salt Lake Sector V HQ",
      cryptoStack: "IPsec ESP (AES-256-GCM + ECDHE-Curve25519 PFS + X.509 Device PKI)",
      threatScenario: "An adversary executed packet injection and replay attacks on the municipal fiber link attempting to trigger unauthorized chemical valve shutdowns.",
      solution: "Sukanta Hui, Mamata, and Mahima deployed AES-256-GCM authenticated encryption with a 1024-packet anti-replay sliding window and Curve25519 PFS.",
      outcome: "100% of injected and replayed packets dropped instantly by hardware verification; zero SCADA downtime; full compliance with CERT-In directives."
    },
    saltlake_banking_mtls: {
      id: "saltlake_banking_mtls",
      title: "Salt Lake Sector V State Financial Gateway Mutual TLS (mTLS) Mesh",
      location: "Sector V Core Datacenter connecting 8 State Banking Nodes",
      cryptoStack: "Mutual TLS 1.3 (TLS_AES_256_GCM_SHA384 + Hardware HSM Root PKI)",
      threatScenario: "Adversaries attempted a padding-oracle timing exploit against legacy CBC ciphers to steal municipal salary settlement records.",
      solution: "Abhronila, Susmita, and Debangshu decommissioned legacy CBC modes, enforcing strict AEAD GCM ciphers and constant-time HMAC tag comparisons.",
      outcome: "Padding-oracle attack mathematically neutralized; zero salary records leaked; 100% DPDP Act compliance."
    }
  };

  const currentService = cryptoServices[selectedServiceKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 3</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Core Security Services in VPNs: CIA &amp; Anti-Replay
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the cryptographic engine powering modern VPNs. Explore <strong className="text-sky-400">AES-256-GCM &amp; ChaCha20 AEAD Ciphers</strong>, <strong className="text-emerald-400">HMAC-SHA-256 Data Integrity</strong>, <strong className="text-purple-400">Mutual X.509 PKI Authentication</strong>, <strong className="text-amber-400">Perfect Forward Secrecy (PFS)</strong>, and <strong className="text-rose-400">Anti-Replay Sliding Windows</strong>.
          </p>
        </header>

        {/* SECTION 1: CRYPTOGRAPHIC TRIAD & ANTI-REPLAY SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The Cryptographic Pipeline &amp; Anti-Replay Sliding Window
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 3 core cryptographic pillars on the left and the anti-replay sliding window algorithm on the right.
            </p>
          </div>

          {/* SVG 1: CRYPTO TRIAD & ANTI-REPLAY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Cryptographic Triad (CIA + PFS) ➔ Anti-Replay Sliding Window
              </span>
              <span className="text-[11px] text-gray-400 font-mono">AEAD &amp; Monotonic Counters</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgCryptoTriadId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="VPN Cryptographic Core Services and Anti-Replay Diagram"
              >
                {/* LEFT: CRYPTOGRAPHIC SERVICES TRIAD */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  VPN CRYPTOGRAPHIC SECURITY ENGINE
                </text>

                {/* PILLAR 1: CONFIDENTIALITY */}
                <rect x="35" y="58" width="115" height="185" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="92" y="78" fill="#7dd3fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">1. CONFIDENTIALITY</text>
                <text x="92" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• AES-256-GCM</text>
                <text x="92" y="115" fill="#ffffff" fontSize="6.5" textAnchor="middle">• ChaCha20-Poly1305</text>
                <text x="92" y="135" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• 256-bit Keys</text>
                <text x="92" y="155" fill="#fde68a" fontSize="6.5" textAnchor="middle">• AES-NI Offload</text>
                <text x="92" y="180" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">Symmetric Ciphers</text>
                <text x="92" y="225" fill="#bae6fd" fontSize="6.5" textAnchor="middle">Zero Eavesdropping</text>

                {/* PILLAR 2: INTEGRITY */}
                <rect x="157" y="58" width="115" height="185" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="214" y="78" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">2. DATA INTEGRITY</text>
                <text x="214" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• HMAC-SHA-256</text>
                <text x="214" y="115" fill="#ffffff" fontSize="6.5" textAnchor="middle">• AEAD 128-bit Tag</text>
                <text x="214" y="135" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• Non-Repudiation</text>
                <text x="214" y="155" fill="#fde68a" fontSize="6.5" textAnchor="middle">• Tamper Dropped</text>
                <text x="214" y="180" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">Cryptographic Hash</text>
                <text x="214" y="225" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">Zero Bit-Flipping</text>

                {/* PILLAR 3: AUTHENTICATION & PFS */}
                <rect x="280" y="58" width="115" height="185" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="337" y="78" fill="#c7d2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle">3. AUTH &amp; PFS</text>
                <text x="337" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• X.509 PKI Certs</text>
                <text x="337" y="115" fill="#ffffff" fontSize="6.5" textAnchor="middle">• ECDSA / RSA-4096</text>
                <text x="337" y="135" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• Curve25519 PFS</text>
                <text x="337" y="155" fill="#fde68a" fontSize="6.5" textAnchor="middle">• SAML 2.0 MFA</text>
                <text x="337" y="180" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">Identity Assurance</text>
                <text x="337" y="225" fill="#e0e7ff" fontSize="6.5" textAnchor="middle">Zero Rogue Access</text>

                {/* RIGHT: ANTI-REPLAY SLIDING WINDOW */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  ANTI-REPLAY SLIDING WINDOW ALGORITHM
                </text>

                {/* SLIDING WINDOW BOX */}
                <rect x="455" y="60" width="360" height="70" rx="6" fill="#18181b" stroke="#64748b" />
                <text x="635" y="80" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Active Receiver 64-Packet Bitmask Window [Max Sequence: #42]
                </text>

                {/* VISUAL BIT CELLS */}
                <rect x="475" y="92" width="40" height="24" rx="3" fill="#064e3b" stroke="#10b981" />
                <text x="495" y="108" fill="#ffffff" fontSize="7" textAnchor="middle">#42 (✓)</text>

                <rect x="525" y="92" width="40" height="24" rx="3" fill="#064e3b" stroke="#10b981" />
                <text x="545" y="108" fill="#ffffff" fontSize="7" textAnchor="middle">#41 (✓)</text>

                <rect x="575" y="92" width="40" height="24" rx="3" fill="#064e3b" stroke="#10b981" />
                <text x="595" y="108" fill="#ffffff" fontSize="7" textAnchor="middle">#40 (✓)</text>

                <rect x="625" y="92" width="40" height="24" rx="3" fill="#082f49" stroke="#0284c7" />
                <text x="645" y="108" fill="#7dd3fc" fontSize="7" textAnchor="middle">#39 (Pending)</text>

                <rect x="675" y="92" width="40" height="24" rx="3" fill="#064e3b" stroke="#10b981" />
                <text x="695" y="108" fill="#ffffff" fontSize="7" textAnchor="middle">#38 (✓)</text>

                <text x="755" y="108" fill="#94a3b8" fontSize="7" textAnchor="middle">... [to #0]</text>

                {/* REPLAY ATTACK ATTEMPT */}
                <rect x="455" y="145" width="170" height="95" rx="5" fill="#450a0a" stroke="#ef4444" />
                <text x="540" y="165" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Attacker Replays #41
                </text>
                <text x="540" y="185" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Check: #41 in Bitmask?</text>
                <text x="540" y="200" fill="#fca5a5" fontSize="6.5" textAnchor="middle">• YES! Already Processed.</text>
                <text x="540" y="222" fill="#fee2e2" fontSize="7" fontWeight="bold" textAnchor="middle">
                  ACTION: DROP PACKET
                </text>

                {/* NEW VALID PACKET */}
                <rect x="640" y="145" width="175" height="95" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="727" y="165" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Client sends #43
                </text>
                <text x="727" y="185" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Check: #43 &gt; Max Seq (#42)</text>
                <text x="727" y="200" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• Window advances to #43</text>
                <text x="727" y="222" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">
                  ACTION: ACCEPT &amp; ADVANCE
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: CRYPTOGRAPHIC SERVICES MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Core Cryptographic Services &amp; Cipher Suite Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the algorithms powering Confidentiality, Data Integrity, Mutual Authentication, and Perfect Forward Secrecy.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentService.badgeColor)}>
              {currentService.category}
            </span>
          </div>

          {/* Service Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(cryptoServices).map((s) => (
              <button
                key={s.key}
                onClick={() => setSelectedServiceKey(s.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedServiceKey === s.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Active Service Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentService.title}</h3>
                <span className="text-gray-400">Category: {currentService.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentService.badgeColor)}>
                Active Service
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Cryptographic Mechanism:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentService.mechanism}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  🛡️ Security Advantage:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentService.securityAdvantage}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-indigo-950/80 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  📜 Standard Algorithms:
                </span>
                <p className="text-indigo-200 font-mono text-xs">{currentService.algorithms}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentService.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE CRYPTO PIPELINE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live VPN Cryptographic Pipeline Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Test AEAD encryption, inject simulated bit-flipping tampering or replay attacks, and observe cryptographic gateway verification.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Crypto Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select AEAD Cipher Suite:</label>
              <select
                value={selectedCipherChoice}
                onChange={(e) => setSelectedCipherChoice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="aes_256_gcm">AES-256-GCM + SHA-384 (IPsec ESP / OpenVPN)</option>
                <option value="chacha20_poly1305">ChaCha20-Poly1305 (WireGuard)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Simulate Threat Vector:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAttackSimulationType("normal")}
                  className={clsx(
                    "p-2 rounded-lg text-xs font-semibold border transition-all",
                    attackSimulationType === "normal"
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-md shadow-emerald-500/10"
                      : "bg-slate-950 text-gray-400 border-slate-800"
                  )}
                >
                  ✔ Valid Packet
                </button>
                <button
                  onClick={() => setAttackSimulationType("tamper")}
                  className={clsx(
                    "p-2 rounded-lg text-xs font-semibold border transition-all",
                    attackSimulationType === "tamper"
                      ? "bg-rose-950/80 text-rose-300 border-rose-800 shadow-md shadow-rose-500/10"
                      : "bg-slate-950 text-gray-400 border-slate-800"
                  )}
                >
                  🚨 Bit-Flip Tamper
                </button>
                <button
                  onClick={() => setAttackSimulationType("replay")}
                  className={clsx(
                    "p-2 rounded-lg text-xs font-semibold border transition-all",
                    attackSimulationType === "replay"
                      ? "bg-amber-950/80 text-amber-300 border-amber-800 shadow-md shadow-amber-500/10"
                      : "bg-slate-950 text-gray-400 border-slate-800"
                  )}
                >
                  🔁 Replay #41
                </button>
              </div>
            </div>
          </div>

          {/* Pipeline Verification Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Cryptographic Verification Status:
                </span>
                <span className="text-white font-bold text-sm">Sequence Number: #{pipelineResult.seqNumber}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                pipelineResult.badgeColor
              )}>
                {pipelineResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">AEAD Integrity Tag &amp; Anti-Replay:</span>
                <div className="text-gray-300 text-xs">Auth Tag: {pipelineResult.authTagStatus}</div>
                <div className="text-gray-300 text-xs">Anti-Replay: {pipelineResult.antiReplayStatus}</div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold text-[11px] block">In-Transit Ciphertext Payload:</span>
                <div className="text-gray-300 text-xs truncate">{pipelineResult.ciphertextHex}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                Recovered Plaintext at Gateway:
              </span>
              <div className="font-mono text-xs text-white bg-slate-950 p-2 rounded border border-slate-800">
                {pipelineResult.recoveredData}
              </div>
              <p className="text-gray-400 text-[11px] pt-1">{pipelineResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: CRYPTO SUITE ENGINE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: VPN Cryptographic Suite Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation validating AEAD authenticated encryption, HMAC integrity tags, and anti-replay sliding window sequences.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              vpn_crypto_engine.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="vpn_crypto_engine.py"
            highlightLines={[25, 42, 55, 70]}
          />
        </section>

        {/* STUDIO 3: CRYPTO THROUGHPUT & HARDWARE SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Crypto Throughput, CPU Overhead &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate packet processing rate (Mpps), CPU utilization with/without Intel AES-NI acceleration, and 5-year hardware crypto TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Crypto Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Encrypted Throughput:</span>
                <span className="text-sky-400 font-bold">{cryptoThroughputGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={cryptoThroughputGbps}
                onChange={(e) => setCryptoThroughputGbps(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Hardware AES-NI Offload:</span>
                <span className="text-purple-400 font-bold">{hardwareAccelerationEnabled ? "ENABLED" : "DISABLED"}</span>
              </div>
              <button
                onClick={() => setHardwareAccelerationEnabled(!hardwareAccelerationEnabled)}
                className={clsx(
                  "w-full p-2 rounded text-xs font-semibold border transition-all",
                  hardwareAccelerationEnabled
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              >
                {hardwareAccelerationEnabled ? "✔ Hardware AES-NI Active" : "❌ Software Crypto (Slow)"}
              </button>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Average Packet Size:</span>
                <span className="text-emerald-400 font-bold">{packetSizeAverageBytes} Bytes</span>
              </div>
              <input
                type="range"
                min="512"
                max="1420"
                step="64"
                value={packetSizeAverageBytes}
                onChange={(e) => setPacketSizeAverageBytes(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Packet Processing Rate</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedCryptoMetrics.packetsPerSecondMillions} Mpps</div>
              <span className="text-[10px] text-gray-500 block">Packets per second throughput</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Estimated CPU Load</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedCryptoMetrics.cpuUtilizationPercent}% Core Load</div>
              <span className="text-[10px] text-gray-500 block">{hardwareAccelerationEnabled ? "Hardware AES-NI Offloaded" : "High Software CPU Overhead!"}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Crypto TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedCryptoMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Crypto Concentrator + HSM Vault</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL SOC TABLETOP DRILL */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative regional response scenarios authored by Sukanta Hui and the student cyber engineering team.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              WB Defense Lab
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(regionalDrills).map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrillId(d.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeDrillId === d.id
                    ? "bg-sky-600/20 text-sky-300 border-sky-500/60"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Stack: {currentDrill.cryptoStack}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                CERT-In Compliant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical Cryptographic Defense:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Confidentiality prevents eavesdropping using AES-256-GCM, AES-CBC, or ChaCha20-Poly1305.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Data Integrity uses HMAC-SHA-256 or AEAD 128-bit authentication tags to detect packet tampering.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Authentication uses X.509 PKI certificates, Pre-Shared Keys, or SAML 2.0 Multi-Factor Authentication.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Perfect Forward Secrecy (PFS) ensures stolen master keys cannot decrypt past recorded VPN sessions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Anti-Replay protection uses sequence numbers and sliding windows to drop duplicate captured packets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all VPN authentication logs synchronized with NPL India NTP servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Core Security Services in VPNs FAQs"
            subtitle="30 In-depth Practice Questions &amp; Cryptographic Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Core Security Services in VPNs (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 3 dissects the cryptographic engine that makes Virtual Private Networks mathematically secure! Never rely on deprecated ciphers like 3DES, RC4, or standalone CBC modes with separate HMACs. Always enforce Authenticated Encryption with Associated Data (AES-256-GCM or ChaCha20-Poly1305), enable Perfect Forward Secrecy (PFS) via Curve25519 or ECDHE to protect past sessions against future key compromise, and activate the anti-replay sliding window to defeat packet injection and duplication attacks. In Topic 4, we will dive deep into Tunneling Concepts: Encapsulation and Carrier Protocols!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic3;
