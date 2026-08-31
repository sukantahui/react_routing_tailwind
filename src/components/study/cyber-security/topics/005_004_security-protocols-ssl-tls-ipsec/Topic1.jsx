import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import tlsEvolutionAuditorPy from "./topic1_files/tls_evolution_auditor.py?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgHandshakeCompareId = useId();
  const svgPruningMatrixId = useId();

  // Studio 1: Active Protocol Version State
  const [selectedProtoKey, setSelectedProtoKey] = useState("tls_1_3"); // "ssl_2_0", "ssl_3_0", "tls_1_0", "tls_1_1", "tls_1_2", "tls_1_3"

  // Studio 2: Live Latency Simulator State
  const [simulatedRttMs, setSimulatedRttMs] = useState(45); // 10 to 180 ms
  const [isSessionResumption, setIsSessionResumption] = useState(false);

  // Studio 3: Cryptographic Pruning Explorer State
  const [selectedPruningCategory, setSelectedPruningCategory] = useState("key_exchange"); // "key_exchange", "symmetric_ciphers", "hashing_mac", "handshake_features"

  // Studio 4: Regional SOC Case Studies State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_bank_pci_dss");

  // Protocol Specs Database for Studio 1
  const protocolSpecs = {
    ssl_2_0: {
      key: "ssl_2_0",
      title: "1. SSL 2.0 (1995 - Netscape)",
      badge: "PROHIBITED (RFC 6176)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      rttHandshake: "2-RTT Handshake",
      pfsStatus: "No PFS (Static RSA Only)",
      certEncryption: "Cleartext on Wire",
      ciphers: "RC4-40 (Export), DES-CBC, RC2-CBC, 3DES",
      flaws: "DROWN, Export cipher cracking, Truncation attacks, Lack of handshake MAC integrity",
      verdict: "Fundamentally insecure. Banned globally by RFC 6176."
    },
    ssl_3_0: {
      key: "ssl_3_0",
      title: "2. SSL 3.0 (1996 - Netscape / Kocher)",
      badge: "PROHIBITED (RFC 7568)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      rttHandshake: "2-RTT Handshake",
      pfsStatus: "Optional DHE (Rarely used)",
      certEncryption: "Cleartext on Wire",
      ciphers: "RC4-128, DES-CBC, 3DES-EDE-CBC, AES-CBC",
      flaws: "POODLE (CVE-2014-3566), BEAST, Insecure padding, MD5 hash collisions",
      verdict: "Vulnerable to POODLE padding oracles. Officially prohibited by RFC 7568."
    },
    tls_1_0: {
      key: "tls_1_0",
      title: "3. TLS 1.0 (1999 - RFC 2246)",
      badge: "DEPRECATED (RFC 8996)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      rttHandshake: "2-RTT Handshake",
      pfsStatus: "Optional DHE / ECDHE",
      certEncryption: "Cleartext on Wire",
      ciphers: "RC4-128, 3DES-CBC, AES-128-CBC, AES-256-CBC",
      flaws: "BEAST (Predictable IV), SWEET32 (3DES), CRIME, Lucky 13",
      verdict: "Deprecated by IETF RFC 8996 and prohibited by PCI-DSS 4.0."
    },
    tls_1_1: {
      key: "tls_1_1",
      title: "4. TLS 1.1 (2006 - RFC 4346)",
      badge: "DEPRECATED (RFC 8996)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      rttHandshake: "2-RTT Handshake",
      pfsStatus: "Optional DHE / ECDHE",
      certEncryption: "Cleartext on Wire",
      ciphers: "3DES-CBC, AES-128-CBC, AES-256-CBC",
      flaws: "SWEET32, Lucky 13, ROBOT (RSA Padding), Insecure Renegotiation",
      verdict: "Added explicit IVs to fix BEAST, but retains legacy cipher flaws. Deprecated."
    },
    tls_1_2: {
      key: "tls_1_2",
      title: "5. TLS 1.2 (2008 - RFC 5246)",
      badge: "PRODUCTION STANDARD",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      rttHandshake: "2-RTT Handshake",
      pfsStatus: "Supported (ECDHE) but not enforced",
      certEncryption: "Cleartext on Wire",
      ciphers: "AES-128-GCM, AES-256-GCM, ChaCha20-Poly1305, AES-CBC, 3DES",
      flaws: "ROBOT (if static RSA enabled), Lucky 13 (if CBC enabled), Insecure Renegotiation",
      verdict: "Introduced AEAD AES-GCM and SHA-256 PRF. Secure when properly hardened."
    },
    tls_1_3: {
      key: "tls_1_3",
      title: "6. TLS 1.3 (2018 - RFC 8446)",
      badge: "RECOMMENDED MODERN STANDARD",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      rttHandshake: "1-RTT Standard / 0-RTT Resumption",
      pfsStatus: "MANDATORY (ECDHE / DHE Only)",
      certEncryption: "Encrypted on Wire (Full Privacy)",
      ciphers: "TLS_AES_256_GCM, TLS_CHACHA20_POLY1305, TLS_AES_128_GCM, TLS_AES_128_CCM",
      flaws: "Zero known protocol flaws (All broken ciphers and static RSA purged)",
      verdict: "Radical pruning, 1-RTT speed, mandatory PFS, and encrypted certificate metadata."
    }
  };

  // Studio 2: Live Latency Comparison Computation
  const latencyMetrics = useMemo(() => {
    const tcpSynMs = simulatedRttMs; // 1 RTT for TCP 3-way handshake

    // TLS 1.2 (2 RTT)
    const tls12HandshakeMs = simulatedRttMs * 2.0;
    const tls12TimeToFirstByte = tcpSynMs + tls12HandshakeMs + simulatedRttMs;

    // TLS 1.3 (1 RTT)
    const tls13HandshakeMs = isSessionResumption ? 0.0 : simulatedRttMs * 1.0;
    const tls13TimeToFirstByte = tcpSynMs + tls13HandshakeMs + simulatedRttMs;

    const latencySavedMs = Math.max(0, tls12TimeToFirstByte - tls13TimeToFirstByte);
    const speedImprovementPercent = Math.round((latencySavedMs / tls12TimeToFirstByte) * 100);

    return {
      tcpSynMs,
      tls12HandshakeMs,
      tls12TimeToFirstByte: Math.round(tls12TimeToFirstByte),
      tls13HandshakeMs,
      tls13TimeToFirstByte: Math.round(tls13TimeToFirstByte),
      latencySavedMs: Math.round(latencySavedMs),
      speedImprovementPercent
    };
  }, [simulatedRttMs, isSessionResumption]);

  // Studio 3: Pruning Database
  const pruningCategories = {
    key_exchange: {
      title: "1. Key Exchange Mechanisms",
      removed: ["Static RSA Key Transport", "Static Diffie-Hellman", "Custom DH Groups (512B/1024B)"],
      whyRemoved: "Static RSA lacked Perfect Forward Secrecy (PFS) and was vulnerable to ROBOT / Bleichenbacher padding attacks. Custom DH allowed Logjam precomputation.",
      tls13Replacement: "Mandatory Ephemeral (EC)DHE: X25519 (Curve25519), secp256r1 (P-256), secp384r1, secp521r1.",
      badge: "Mandatory PFS Enforced"
    },
    symmetric_ciphers: {
      title: "2. Symmetric Encryption Ciphers",
      removed: ["RC4 Stream Cipher", "DES / 3DES (64-bit blocks)", "AES in CBC Mode (AES-CBC)", "IDEA / Camellia (legacy)"],
      whyRemoved: "RC4 had statistical keystream bias (RFC 7465); 3DES suffered birthday collisions at 32GB (SWEET32); CBC mode suffered Lucky 13 timing and POODLE padding oracles.",
      tls13Replacement: "Only Modern AEAD Ciphers: AES-256-GCM, ChaCha20-Poly1305, AES-128-GCM, AES-128-CCM.",
      badge: "100% AEAD Ciphers"
    },
    hashing_mac: {
      title: "3. Cryptographic Hashes & MACs",
      removed: ["MD5 Hash Function", "SHA-1 Hash Function", "Ad-hoc MAC-then-Encrypt"],
      whyRemoved: "MD5 and SHA-1 suffered practical mathematical collision attacks. MAC-then-Encrypt construction allowed padding oracle attacks.",
      tls13Replacement: "SHA-256 / SHA-384 PRF + Authenticated Encryption (AEAD Built-in Tags).",
      badge: "Zero Weak Hashes"
    },
    handshake_features: {
      title: "4. Protocol Features & Extensions",
      removed: ["TLS-Level Data Compression (DEFLATE)", "Arbitrary Mid-Session Renegotiation", "Cleartext Certificate Transmission"],
      whyRemoved: "TLS compression was exploited by CRIME and BREACH to leak session cookies. Arbitrary renegotiation allowed injection attacks (CVE-2009-3555).",
      tls13Replacement: "1-RTT Key Shares, 0-RTT Early Data Resumption, Encrypted Certificates, and 1-byte KeyUpdate records.",
      badge: "Streamlined & Hardened"
    }
  };

  // Studio 4: Regional SOC Case Studies Data
  const regionalDrills = {
    barrackpore_bank_pci_dss: {
      id: "barrackpore_bank_pci_dss",
      title: "Barrackpore Co-operative Bank: PCI-DSS 4.0 TLS Hardening",
      location: "North 24 Parganas Central Banking Gateway serving 85,000 account holders",
      threatScenario:
        "Susmita and Mamata audited the banking portal with 'nmap --script ssl-enum-ciphers' and discovered active 3DES-CBC and TLS 1.0 support. The portal failed RBI cybersecurity compliance due to SWEET32 vulnerability.",
      solution:
        "Sukanta Hui reconfigured NGINX load balancers: disabled SSL 2.0/3.0, TLS 1.0, and TLS 1.1; restricted ciphers strictly to AES-GCM and ChaCha20; enabled HSTS with preloading.",
      outcome:
        "100% compliance certified under PCI-DSS 4.0 and RBI Cybersecurity Framework; eliminated all padding oracle attack vectors; achieved A+ rating on SSL Labs."
    },
    kolkata_ecommerce_0rtt: {
      id: "kolkata_ecommerce_0rtt",
      title: "Salt Lake Sector V E-Commerce Hub: TLS 1.3 0-RTT Optimization",
      location: "Sector V FinTech & Retail Portal processing 5,000 checkout transactions/min",
      threatScenario:
        "Debangshu and Mahima noticed mobile shoppers in Kolkata experienced 280ms connection latency over 4G cellular links due to TLS 1.2 2-RTT handshakes.",
      solution:
        "Upgraded edge reverse proxies to TLS 1.3 with 0-RTT Early Data session resumption for idempotent GET requests and configured anti-replay sliding caches.",
      outcome:
        "Handshake connection latency slashed from 280ms to 90ms (a 68% speedup); mobile checkout conversion increased by 14%; server CPU reduced by 28%."
    }
  };

  const currentProto = protocolSpecs[selectedProtoKey];
  const currentPruning = pruningCategories[selectedPruningCategory];
  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_004 • Topic 1</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Evolution from SSL 2.0/3.0 to TLS 1.2 &amp; TLS 1.3
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Trace three decades of transport encryption history: how devastating cryptographic attacks (POODLE, BEAST, SWEET32)
            forced radical cryptographic pruning, 1-RTT latency speedups, and mandatory Perfect Forward Secrecy.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              SSL 2.0/3.0 to TLS 1.3 History
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              1-RTT &amp; 0-RTT Latency
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Mandatory Perfect Forward Secrecy
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              POODLE, BEAST &amp; SWEET32 Mitigation
            </span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SCOPED INLINE KEYFRAME ANIMATIONS */}
        {/* ========================================================================= */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseGlowCyan {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.8)); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              ⏳
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Three Decades of Transport Security Evolution
              </h2>
              <p className="text-sm text-slate-400">
                Why transport layer encryption evolved from broken proprietary algorithms into a streamlined, high-speed standard
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              When Netscape introduced SSL 2.0 in 1995, it was designed for early e-commerce. However, over the next 25 years,
              cryptanalysts uncovered deep structural flaws in legacy ciphers, padding schemes, and key exchange models.
              Today in <strong className="text-cyan-300">Barrackpore</strong> and <strong className="text-cyan-300">Kolkata</strong>,
              enterprise banking and government portals enforce <strong className="text-emerald-400">TLS 1.3 (RFC 8446)</strong> to
              deliver mathematically unforgeable security with near-zero latency penalty.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                  <span>❌</span> 1. The Broken Era (SSL 2.0/3.0)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export-grade 40-bit keys, unauthenticated handshakes, and non-deterministic CBC padding led to
                  catastrophic attacks like <strong className="text-rose-300">DROWN</strong> and <strong className="text-rose-300">POODLE</strong>.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                  <span>⚠️</span> 2. The Patchwork Era (TLS 1.0–1.2)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Standardized by IETF. Added AES-GCM and SHA-256 PRF in TLS 1.2, but retained legacy RSA key exchange
                  (vulnerable to <strong className="text-amber-300">ROBOT</strong>) and 2-RTT handshake latency.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>✔</span> 3. The Modern Era (TLS 1.3)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Purged all legacy ciphers, mandated <strong className="text-emerald-300">Perfect Forward Secrecy</strong>,
                  slashed handshake latency to <strong className="text-emerald-300">1-RTT (and 0-RTT)</strong>, and encrypted certificate metadata.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE PROTOCOL TIMELINE & ARCHITECTURE COMPARISON */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                📜
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive Protocol Evolution Timeline &amp; Architecture
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect specifications, cipher support, and vulnerability exposure for all six SSL/TLS protocol generations
                </p>
              </div>
            </div>

            {/* Protocol Switcher */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(protocolSpecs).map((key) => {
                const item = protocolSpecs[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedProtoKey(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border",
                      selectedProtoKey === key
                        ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(". ")[1].split(" (")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Protocol Display Card */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">{currentProto.title}</h3>
              <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold border", currentProto.badgeColor)}>
                {currentProto.badge}
              </span>
            </div>

            {/* Handshake RTT Visual Comparison SVG */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <svg
                id={svgHandshakeCompareId}
                viewBox="0 0 880 260"
                className="w-full min-w-[700px] h-auto"
                aria-label="TLS 1.2 vs TLS 1.3 Handshake RTT Packet Comparison"
              >
                <defs>
                  <marker id="arrowTls" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#06b6d4" />
                  </marker>
                  <marker id="arrowTlsGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Left Side: TLS 1.2 (2-RTT) */}
                <g transform="translate(40, 20)">
                  <text x="180" y="20" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Legacy TLS 1.2 Handshake (2-RTT)
                  </text>
                  {/* Lifelines */}
                  <line x1="80" y1="40" x2="80" y2="230" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="280" y1="40" x2="280" y2="230" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="80" y="35" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Client</text>
                  <text x="280" y="35" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Server</text>

                  {/* Flow 1: ClientHello */}
                  <line x1="80" y1="60" x2="275" y2="90" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowTls)" />
                  <text x="180" y="70" fill="#67e8f9" fontSize="9" textAnchor="middle">1. ClientHello (Cipher Proposals)</text>

                  {/* Flow 2: ServerHello + Cert */}
                  <line x1="280" y1="100" x2="85" y2="130" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowTls)" />
                  <text x="180" y="110" fill="#67e8f9" fontSize="9" textAnchor="middle">2. ServerHello + Cert (Cleartext!) + KeyExchange</text>

                  {/* Flow 3: ClientKeyExchange + Finished */}
                  <line x1="80" y1="140" x2="275" y2="170" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowTls)" />
                  <text x="180" y="150" fill="#67e8f9" fontSize="9" textAnchor="middle">3. ClientKeyExchange + Finished</text>

                  {/* Flow 4: Server Finished */}
                  <line x1="280" y1="180" x2="85" y2="210" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowTls)" />
                  <text x="180" y="190" fill="#67e8f9" fontSize="9" textAnchor="middle">4. Server Finished ➔ 2-RTT Total Delay</text>
                </g>

                {/* Right Side: TLS 1.3 (1-RTT) */}
                <g transform="translate(480, 20)">
                  <text x="180" y="20" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Modern TLS 1.3 Handshake (1-RTT)
                  </text>
                  {/* Lifelines */}
                  <line x1="80" y1="40" x2="80" y2="230" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="280" y1="40" x2="280" y2="230" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="80" y="35" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Client</text>
                  <text x="280" y="35" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Server</text>

                  {/* Flow 1: ClientHello + KeyShare */}
                  <line x1="80" y1="60" x2="275" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowTlsGreen)" />
                  <text x="180" y="80" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
                    1. ClientHello + KeyShare (ECDHE Guess)
                  </text>

                  {/* Flow 2: ServerHello + EncryptedCert + Finished */}
                  <line x1="280" y1="120" x2="85" y2="170" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowTlsGreen)" />
                  <text x="180" y="140" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
                    2. ServerHello + KeyShare + { "{" }EncryptedCert + Finished{ "}" }
                  </text>

                  {/* Flow 3: Encrypted HTTP Application Data */}
                  <line x1="80" y1="180" x2="275" y2="210" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowTls)" />
                  <text x="180" y="195" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">
                    3. Encrypted Application Data (HTTP GET / API)
                  </text>
                  <text x="180" y="225" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                    ➔ 1-RTT Handshake Complete (50% Faster!)
                  </text>
                </g>
              </svg>
            </div>

            {/* Protocol Spec Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Handshake Latency:</span>
                <div className="font-bold text-cyan-300">{currentProto.rttHandshake}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Forward Secrecy:</span>
                <div className="font-bold text-emerald-300">{currentProto.pfsStatus}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Certificate Privacy:</span>
                <div className="font-bold text-amber-300">{currentProto.certEncryption}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Compliance Verdict:</span>
                <div className="font-bold text-white">{currentProto.verdict}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE HANDSHAKE LATENCY & NETWORK RTT SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              ⚡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 2: Live Handshake Latency &amp; Network RTT Simulator
              </h2>
              <p className="text-sm text-slate-400">
                Observe how TLS 1.3 1-RTT and 0-RTT session resumption slash connection latency across network distances
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider: Network RTT */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Network Round-Trip Time (RTT):</span>
                <span className="text-cyan-400 font-mono text-sm">{simulatedRttMs} ms</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={simulatedRttMs}
                onChange={(e) => setSimulatedRttMs(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Barrackpore to Kolkata Datacenter (~12ms) vs Roaming Mobile 4G (~65ms).
              </p>
            </div>

            {/* Toggle: Session Resumption */}
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🚀</span> TLS 1.3 0-RTT Session Resumption
                </div>
                <div className="text-[11px] text-slate-400">
                  Instant re-connection using cached pre-shared key (PSK) session tickets
                </div>
              </div>
              <button
                onClick={() => setIsSessionResumption(!isSessionResumption)}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 border",
                  isSessionResumption
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                )}
              >
                {isSessionResumption ? "0-RTT ACTIVE" : "STANDARD 1-RTT"}
              </button>
            </div>
          </div>

          {/* Latency Comparison Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Legacy TLS 1.2 Latency (2-RTT)
              </div>
              <div className="text-3xl font-extrabold text-rose-400 font-mono">
                {latencyMetrics.tls12TimeToFirstByte} <span className="text-sm font-normal text-slate-300">ms</span>
              </div>
              <p className="text-[11px] text-slate-400">
                TCP (1-RTT) + TLS (2-RTT) + Data (1-RTT) = 4 Round Trips total.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Modern TLS 1.3 Latency {isSessionResumption ? "(0-RTT)" : "(1-RTT)"}
              </div>
              <div className="text-3xl font-extrabold text-emerald-300 font-mono">
                {latencyMetrics.tls13TimeToFirstByte} <span className="text-sm font-normal text-white">ms</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isSessionResumption
                  ? "Instant Resumption: Encrypted data sent in packet 1!"
                  : "TCP (1-RTT) + TLS (1-RTT) + Data (1-RTT) = 2 Round Trips."}
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Latency Reduction Benefit
              </div>
              <div className="text-3xl font-extrabold text-cyan-300 font-mono">
                -{latencyMetrics.speedImprovementPercent}% <span className="text-sm font-normal text-white">({latencyMetrics.latencySavedMs} ms saved)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Massive boost in page load speed and API transaction responsiveness.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: CRYPTOGRAPHIC PRUNING & VULNERABILITY ELIMINATION EXPLORER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 text-xl">
                ✂️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Cryptographic Pruning &amp; Vulnerability Elimination
                </h2>
                <p className="text-sm text-slate-400">
                  Examine how TLS 1.3 purged legacy broken algorithms to permanently extinguish major security exploits
                </p>
              </div>
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(pruningCategories).map((key) => {
                const item = pruningCategories[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPruningCategory(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                      selectedPruningCategory === key
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(". ")[1]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{currentPruning.title}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                ✔ {currentPruning.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>❌</span> Deprecated &amp; Purged in TLS 1.3:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentPruning.removed.map((alg, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-800 text-rose-200 font-mono text-[11px]">
                      {alg}
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed pt-1">{currentPruning.whyRemoved}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡️</span> Modern TLS 1.3 Standard:
                </div>
                <p className="text-slate-200 font-semibold leading-relaxed">{currentPruning.tls13Replacement}</p>
                <p className="text-[11px] text-slate-400">
                  Guarantees that no downgrade probes can force weak encryption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* REAL-WORLD USAGE EXAMPLES (4 DETAILED SCENARIOS) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🏢
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Real-World Protocol Hardening Scenarios
              </h2>
              <p className="text-sm text-slate-400">
                How network security engineers audit and upgrade transport encryption across West Bengal organizations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🏛️</span> Scenario 1: District Bank PCI-DSS Hardening
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  PCI-DSS 4.0
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita and Mamata found legacy 3DES ciphers running on a core banking server in Barrackpore.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Fix: Configured NGINX &apos;ssl_protocols TLSv1.2 TLSv1.3;&apos; and eliminated all CBC ciphers.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Eliminated SWEET32 vulnerabilities; passed RBI cyber audit with zero infractions.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>📱</span> Scenario 2: E-Commerce Mobile 0-RTT Boost
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  0-RTT Resumption
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu optimized mobile checkout for 5,000 shoppers/min in Salt Lake Sector V.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Fix: Deployed TLS 1.3 with session tickets for fast 0-RTT reconnection on mobile apps.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Connection handshake latency dropped from 280ms to 90ms; checkout conversion up 14%.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🛡️</span> Scenario 3: Mitigating ROBOT &amp; Bleichenbacher
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  PFS ECDHE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Mahima audited municipal servers in Ichapur and discovered static RSA key exchanges active.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Fix: Enforced Ephemeral Diffie-Hellman (ECDHE with X25519) and disabled static RSA key transport.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> 100% Perfect Forward Secrecy guaranteed; immune to retroactive private key theft.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🔒</span> Scenario 4: Defense Against Post-Quantum HNDL
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Hybrid Kyber-768
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila protects long-term state land records from Harvest Now, Decrypt Later threats.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Fix: Enabled hybrid post-quantum TLS 1.3 (X25519Kyber768) on Cloudflare edge proxies.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Recorded traffic is mathematically impossible to decrypt even by future quantum computers.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC INCIDENT DRILLS (WEST BENGAL CASE STUDIES) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 text-xl">
                🚨
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional West Bengal SOC Case Studies &amp; Hardening Drills
                </h2>
                <p className="text-sm text-slate-400">
                  Real-world protocol migration and vulnerability elimination in Barrackpore &amp; Kolkata
                </p>
              </div>
            </div>

            {/* Drill Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDrillKey("barrackpore_bank_pci_dss")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_bank_pci_dss"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore Bank Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_ecommerce_0rtt")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_ecommerce_0rtt"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Sector V E-Commerce Drill
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{currentDrill.title}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-700 font-mono">
                📍 {currentDrill.location}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚠️</span> Threat Scenario:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛠️</span> Technical Solution:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏆</span> Operational Outcome:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EDUCATIONAL PYTHON SCRIPT LOADER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🐍
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Programmatic SSL/TLS Evolution &amp; Latency Auditor (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Audit protocol specifications, calculate RTT connection latencies, and model vulnerability exposure in Python
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={tlsEvolutionAuditorPy}
            title="tls_evolution_auditor.py"
            highlightLines={[32, 54, 76, 95]}
          />
        </section>

        {/* ========================================================================= */}
        {/* TIPS & TRICKS, PITFALLS, BEST PRACTICES & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Professional Wisdom, Common Pitfalls &amp; Student Checklist
              </h2>
              <p className="text-sm text-slate-400">
                Essential transport security tuning habits, common beginner misconceptions, and revision points
              </p>
            </div>
          </div>

          {/* Tips & Tricks */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🚀</span> Professional Tips &amp; Tricks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">1. Always Disable SSL 2/3 &amp; TLS 1.0/1.1:</strong>
                <p className="text-slate-400">
                  In NGINX, set &apos;ssl_protocols TLSv1.2 TLSv1.3;&apos;. This immediately eliminates POODLE, BEAST,
                  SWEET32, and DROWN attack vectors in a single configuration line.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Enable TLS 1.3 0-RTT Only for Safe GET Requests:</strong>
                <p className="text-slate-400">
                  Because 0-RTT Early Data is vulnerable to replay attacks, configure your web application to reject
                  0-RTT on financial POST/PUT API calls and allow it strictly for idempotent GET requests.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Mandate Perfect Forward Secrecy (ECDHE):</strong>
                <p className="text-slate-400">
                  Never configure static RSA cipher suites. Enforce ECDHE with Curve25519 or P-256 so that historical
                  network traffic cannot be retroactively decrypted if a server private key is leaked.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Deploy OCSP Stapling on Reverse Proxies:</strong>
                <p className="text-slate-400">
                  Configure &apos;ssl_stapling on;&apos; in your web server so the server pre-fetches signed OCSP revocation
                  proofs from the CA, saving clients an extra DNS and HTTP lookup during the handshake.
                </p>
              </div>
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Beginner Misconceptions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 1: "Heartbleed was a flaw in the TLS protocol."</strong>
                <p className="text-slate-400">
                  Heartbleed was a memory buffer over-read bug in OpenSSL&apos;s C implementation; it was not a flaw in the
                  mathematical specification of the TLS protocol itself.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "Supporting TLS 1.0 is harmless if clients use TLS 1.3."</strong>
                <p className="text-slate-400">
                  Active Man-in-the-Middle attackers can tamper with handshakes to force downgrade attacks. Keeping legacy
                  protocols enabled leaves servers open to POODLE and DROWN attacks.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Using 3DES Ciphers in Financial Portals:</strong>
                <p className="text-slate-400">
                  3DES uses 64-bit blocks and is vulnerable to SWEET32 collision attacks after 32GB of transfer. It is
                  strictly prohibited under PCI-DSS 4.0 and RBI directives.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Neglecting HSTS Preloading:</strong>
                <p className="text-slate-400">
                  Without HSTS headers, an attacker on public Wi-Fi can intercept the initial unencrypted &apos;http://&apos;
                  request and strip SSL protection completely before TLS is ever negotiated.
                </p>
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className="bg-cyan-950/40 border border-cyan-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span>💭</span> Pedagogical Hints for System Analysts
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-cyan-200">Think about:</strong> Why does TLS 1.3 encrypt the server&apos;s digital certificate while TLS 1.2 sent it in cleartext?</li>
              <li><strong className="text-cyan-200">Observe carefully:</strong> How the 1-RTT handshake in Studio 1 cuts connection establishment time in half compared to TLS 1.2.</li>
              <li><strong className="text-cyan-200">Try changing this:</strong> Toggle 0-RTT Session Resumption in Studio 2 and observe how latency drops to the bare minimum TCP round trip.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <span>✅</span> Student Revision Mini-Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain the timeline from SSL 2.0 (1995) to TLS 1.3 (2018)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe why static RSA key exchange was completely removed in TLS 1.3</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Compare the handshake latency of TLS 1.2 (2-RTT) vs TLS 1.3 (1-RTT)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain the mechanics of POODLE, BEAST, SWEET32, and ROBOT attacks</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="Evolution from SSL 2.0/3.0 to TLS 1.2 & TLS 1.3 FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="Evolution from SSL to TLS Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic1_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="The evolution from SSL 2.0 to TLS 1.3 is one of the most fascinating case studies in cybersecurity history. For over two decades, engineers tried to patch broken algorithms—adding explicit IVs to patch BEAST in TLS 1.1, adding AEAD in TLS 1.2—until the cryptographic community realized that backward compatibility was the greatest vulnerability of all. In TLS 1.3, the IETF made the bold decision to purge all legacy dead weight: no static RSA, no CBC mode, no 3DES, and no unencrypted certificates. Always remember Sukanta Hui's golden rule of transport security: Modern security is not achieved by supporting everything; it is achieved by ruthlessly eliminating weak algorithms and mandating Perfect Forward Secrecy across every single connection!"
        />

      </div>
    </div>
  );
};

export default Topic1;
