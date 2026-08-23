import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import tlsHandshakeEnginePy from "./topic2_files/tls_handshake_engine.py?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgHandshakeStepperId = useId();
  const svgHkdfKeyScheduleId = useId();

  // Studio 1: Active Handshake Step State (1 to 6)
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  // Studio 2: Auth Mode & Key Schedule State
  const [authMode, setAuthMode] = useState("server_only"); // "server_only", "mutual_tls"
  const [selectedNamedGroup, setSelectedNamedGroup] = useState("x25519"); // "x25519", "secp256r1", "secp384r1"

  // Studio 3: Cipher Suite Dissector State
  const [selectedCipherKey, setSelectedCipherKey] = useState("tls_aes_256_gcm_sha384");

  // Studio 4: Regional SOC Case Studies State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_fintech_mtls");

  // Handshake Steps Database for Studio 1
  const handshakeSteps = [
    {
      step: 1,
      title: "Step 1: ClientHello (Key Share Proposal)",
      sender: "Client ➔ Server",
      encryptionStatus: "UNENCRYPTED (Cleartext on Wire)",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      description: "Client transmits Client Random (32B), supported version (TLS 1.3), AEAD cipher proposals, SNI target domain, and speculative Ephemeral Public Key in the KeyShare extension.",
      packetPayload: "ClientHello { version: 0x0303, random: 0x5a1f..., cipher_suites: [TLS_AES_256_GCM_SHA384], key_share: [group: X25519, key: 0x9b3d...], server_name: 'bank.barrackpore.gov.in' }",
      securityRole: "Proposes parameters and provides client half of Diffie-Hellman secret in packet 1."
    },
    {
      step: 2,
      title: "Step 2: ServerHello (Key Share Agreement)",
      sender: "Server ➔ Client",
      encryptionStatus: "UNENCRYPTED (Cleartext on Wire)",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      description: "Server selects cipher suite (TLS_AES_256_GCM_SHA384) and matching KeyShare group (X25519), transmitting its Server Random and Server Ephemeral Public Key.",
      packetPayload: "ServerHello { version: 0x0304, random: 0x2244..., selected_cipher: TLS_AES_256_GCM_SHA384, key_share: [group: X25519, key: 0x77fa...] }",
      securityRole: "Both parties now possess both halves of the ECDHE key pair. Cryptographic boundary established!"
    },
    {
      step: 3,
      title: "Step 3: Shared Secret & HKDF Key Schedule Calculation",
      sender: "Internal Cryptographic Computation (Both Peers)",
      encryptionStatus: "INTERNAL COMPUTATION (Zero Wire Packets)",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
      description: "Both peers independently compute Shared Secret S = ECDH(Priv, Pub). HKDF derives Handshake Traffic Keys (client_handshake_key, server_handshake_key) and IVs.",
      packetPayload: "HKDF-Extract(salt, ECDHE_Secret) ➔ Handshake_Secret ➔ HKDF-Expand-Label(Handshake_Secret, 'c hs traffic' / 's hs traffic') ➔ 256-bit AES-GCM Keys Derived!",
      securityRole: "All subsequent handshake messages are now 100% encrypted on the wire."
    },
    {
      step: 4,
      title: "Step 4: EncryptedExtensions, Certificate & CertificateVerify",
      sender: "Server ➔ Client",
      encryptionStatus: "ENCRYPTED (Under Server Handshake Key)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      description: "Server sends EncryptedExtensions (ALPN 'h2'), its encrypted X.509 Certificate, and CertificateVerify containing an RSA-PSS/ECDSA signature over the transcript hash.",
      packetPayload: "EncryptedHandshakeMessage { EncryptedExtensions(alpn: 'h2') + Certificate(X.509 Chain) + CertificateVerify(RSA_PSS_SHA256 Signature over Transcript Hash) }",
      securityRole: "Proves server identity and possession of private key without leaking certificate in cleartext."
    },
    {
      step: 5,
      title: "Step 5: Finished Messages & Transcript Verification",
      sender: "Server ➔ Client, then Client ➔ Server",
      encryptionStatus: "ENCRYPTED (Under Handshake Keys)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      description: "Both parties exchange Finished messages containing verify_data HMACs over the complete handshake transcript, confirming zero Man-in-the-Middle tampering.",
      packetPayload: "Finished { verify_data: HMAC-SHA256(finished_key, SHA256(ClientHello || ServerHello || ... || CertificateVerify)) }",
      securityRole: "Guarantees complete negotiation integrity. Application Traffic Keys derived."
    },
    {
      step: 6,
      title: "Step 6: Bi-Directional Encrypted Application Data Flow",
      sender: "Client 🔁 Server",
      encryptionStatus: "ENCRYPTED (Under Application Traffic Keys)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      description: "Secure, authenticated HTTP/2 or HTTP/3 traffic flows seamlessly. Handshake complete in 1-RTT!",
      packetPayload: "ApplicationDataRecord { ContentType: ApplicationData (23), EncryptedPayload: AES_256_GCM('GET /api/v1/pension_records HTTP/2.0') + 128-bit Auth Tag }",
      securityRole: "Full Perfect Forward Secrecy and authenticated encryption for enterprise data transfer."
    }
  ];

  // Cipher Suite Database for Studio 3
  const cipherSuiteSpecs = {
    tls_aes_256_gcm_sha384: {
      name: "TLS_AES_256_GCM_SHA384",
      standard: "TLS 1.3 (RFC 8446)",
      cipher: "AES-256-GCM (Galois/Counter Mode)",
      keyLength: "256 Bits",
      authTag: "128-Bit AEAD Tag",
      prfHash: "SHA-384",
      securityRating: "MAXIMUM (Military & Financial Grade)",
      hardwareScore: "Ultra-Fast (Hardware AES-NI Accelerated)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      analysis: "Gold standard for banking portals, high-security government infrastructure, and core databases."
    },
    tls_chacha20_poly1305_sha256: {
      name: "TLS_CHACHA20_POLY1305_SHA256",
      standard: "TLS 1.3 (RFC 8446)",
      cipher: "ChaCha20-Poly1305 (Stream Cipher + MAC)",
      keyLength: "256 Bits",
      authTag: "128-Bit Poly1305 Tag",
      prfHash: "SHA-256",
      securityRating: "HIGH (Constant-Time Software Security)",
      hardwareScore: "Ultra-Fast on Mobile ARM CPUs (No AES-NI needed)",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      analysis: "Ideal for Android smartphones, IoT telemetry sensors, and ARM servers lacking hardware AES."
    },
    tls_aes_128_gcm_sha256: {
      name: "TLS_AES_128_GCM_SHA256",
      standard: "TLS 1.3 (RFC 8446)",
      cipher: "AES-128-GCM (Galois/Counter Mode)",
      keyLength: "128 Bits",
      authTag: "128-Bit AEAD Tag",
      prfHash: "SHA-256",
      securityRating: "STRONG (Standard Enterprise Web)",
      hardwareScore: "Fastest (100 Gbps Line Rate on SmartNICs)",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
      analysis: "High-throughput general web browsing with minimal CPU load and robust 128-bit cryptographic strength."
    },
    legacy_ecdhe_rsa_cbc: {
      name: "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256",
      standard: "Legacy TLS 1.2 (RFC 5246)",
      cipher: "AES-128-CBC (Cipher Block Chaining)",
      keyLength: "128 Bits",
      authTag: "HMAC-SHA256 (MAC-then-Encrypt)",
      prfHash: "SHA-256",
      securityRating: "INSECURE (Prohibited in TLS 1.3)",
      hardwareScore: "Slow (Vulnerable to Timing Attacks)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      analysis: "Vulnerable to Lucky 13 padding oracle timing attacks. Completely purged in RFC 8446."
    }
  };

  // Studio 4: Regional SOC Case Studies Data
  const regionalDrills = {
    barrackpore_fintech_mtls: {
      id: "barrackpore_fintech_mtls",
      title: "Barrackpore FinTech Core: Mutual TLS (mTLS) API Gateway",
      location: "Barrackpore Central Treasury Disbursal Engine connecting 18 Banking Microservices",
      threatScenario:
        "Susmita and Mamata detected unauthorized internal API probes inside the container cluster. Attackers attempted to spoof the payment gateway API without valid credentials.",
      solution:
        "Sukanta Hui configured Strict Mutual TLS (mTLS) with internal X.509 client certificates and RSA-PSS signatures; microservices enforce CertificateRequest validation on port 8443.",
      outcome:
        "100% cryptographic authentication between microservices; all rogue API calls rejected during the TLS handshake before HTTP execution; zero unauthorized transactions."
    },
    kolkata_transit_clock_skew: {
      id: "kolkata_transit_clock_skew",
      title: "Kolkata Smart Metro: Handshake CertificateVerify Clock Skew Outage",
      location: "Salt Lake Sector V & Central Metro Automated Fare Collection Gates",
      threatScenario:
        "Debangshu and Mahima investigated an emergency outage where 45 ticketing kiosks failed TLS handshakes to cloud fare validators with error 'SEC_ERROR_EXPIRED_CERTIFICATE'.",
      solution:
        "Diagnosed CMOS battery failure causing a 4-day clock skew on kiosk motherboards; deployed local GPS NTP time servers to synchronize edge validator clocks.",
      outcome:
        "100% resolution of handshake certificate verification failures; sub-second passenger ticketing restored with zero fare collection downtime."
    }
  };

  const currentStep = handshakeSteps[activeStepIndex - 1];
  const currentCipher = cipherSuiteSpecs[selectedCipherKey];
  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_004 • Topic 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            TLS Handshake Protocol: Key Exchange &amp; Cipher Suites
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Step through the mathematical mechanics of the modern TLS 1.3 1-RTT Handshake, Curve25519 ECDHE Key Shares,
            the HKDF key derivation schedule, and Mutual TLS (mTLS) authentication.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              1-RTT Handshake Stepper
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Curve25519 ECDHE KeyShare
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              HKDF Key Schedule (RFC 5869)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Mutual TLS (mTLS) Zero Trust
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
              🤝
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Modern TLS 1.3 Handshake Architecture
              </h2>
              <p className="text-sm text-slate-400">
                How client and server negotiate cryptographic parameters, authenticate identities, and establish ephemeral encryption in 1-RTT
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In modern enterprise banking across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, every HTTPS interaction begins with the{" "}
              <strong className="text-white">TLS 1.3 Handshake Protocol</strong>. By combining speculative{" "}
              <strong className="text-emerald-400">KeyShare extensions</strong> with HMAC-based Key Derivation (HKDF),
              TLS 1.3 establishes an authenticated, encrypted tunnel in a single round trip (1-RTT) while ensuring that
              the server&apos;s digital certificate is completely protected from passive network observers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔑</span> 1. Key Exchange Phase
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Client and Server exchange Curve25519 ephemeral public keys in `ClientHello` and `ServerHello`.
                  Handshake traffic keys are derived immediately.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>📜</span> 2. Authentication Phase
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Server transmits its encrypted X.509 Certificate and `CertificateVerify` RSA-PSS digital signature
                  proving ownership of the private key over the transcript hash.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🔒</span> 3. Application Phase
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Finished HMAC verify_data seals the negotiation against tampering. Bi-directional HTTP/2 data begins
                  flowing under derived Application Traffic Keys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE 6-STEP TLS 1.3 HANDSHAKE STEPPER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🔢
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Step-by-Step Interactive TLS 1.3 Handshake Stepper
                </h2>
                <p className="text-sm text-slate-400">
                  Step through the 6 sequential phases of the 1-RTT handshake and watch encryption kick in mid-stream
                </p>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {handshakeSteps.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(s.step)}
                  className={clsx(
                    "w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 border",
                    activeStepIndex === s.step
                      ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                  )}
                >
                  {s.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Handshake Step Card */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{currentStep.title}</h3>
                <span className="text-xs text-slate-400">Direction: <strong className="text-cyan-300">{currentStep.sender}</strong></span>
              </div>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-semibold border", currentStep.badgeColor)}>
                {currentStep.encryptionStatus}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{currentStep.description}</p>

            {/* Simulated Raw Packet Display */}
            <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Wire Protocol Packet Structure:
              </div>
              <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                {currentStep.packetPayload}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
              <strong className="text-emerald-400">Cryptographic Purpose:</strong> {currentStep.securityRole}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex justify-between pt-2">
              <button
                disabled={activeStepIndex === 1}
                onClick={() => setActiveStepIndex(activeStepIndex - 1)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                ◀ Previous Step
              </button>
              <button
                disabled={activeStepIndex === 6}
                onClick={() => setActiveStepIndex(activeStepIndex + 1)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 text-white border border-cyan-400 hover:bg-cyan-500 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                Next Step ▶
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE HKDF KEY SCHEDULE & TRAFFIC SECRET WORKBENCH */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 text-xl">
                ⚙️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Live HKDF Key Schedule &amp; Secret Derivation
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect the RFC 5869 Extract-and-Expand state machine from Early Secret to Application Traffic Keys
                </p>
              </div>
            </div>

            {/* Auth Mode Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setAuthMode("server_only")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  authMode === "server_only"
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Server-Only Auth
              </button>
              <button
                onClick={() => setAuthMode("mutual_tls")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  authMode === "mutual_tls"
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Mutual TLS (mTLS)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 uppercase tracking-wider">
                  1. Early Secret (0-RTT / PSK)
                </div>
                <p className="text-slate-300">
                  <code className="text-cyan-300 font-mono text-[11px]">HKDF-Extract(0, PSK)</code>
                </p>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Used for Early Data traffic in 0-RTT resumption mode; defaults to 0 in full 1-RTT handshakes.
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 uppercase tracking-wider">
                  2. Handshake Secret (ECDHE)
                </div>
                <p className="text-slate-300">
                  <code className="text-indigo-300 font-mono text-[11px]">HKDF-Extract(Derived, S)</code>
                </p>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Generates <strong className="text-white">client_hs_key</strong> &amp; <strong className="text-white">server_hs_key</strong> to encrypt Certificate and Verify messages.
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 uppercase tracking-wider">
                  3. Master Secret (App Data)
                </div>
                <p className="text-slate-300">
                  <code className="text-emerald-300 font-mono text-[11px]">HKDF-Extract(Derived, 0)</code>
                </p>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Generates <strong className="text-white">client_app_key</strong> &amp; <strong className="text-white">server_app_key</strong> for bidirectional HTTP application payloads.
                </div>
              </div>
            </div>

            {/* Auth Mode Context Banner */}
            <div className={clsx(
              "p-4 rounded-xl border flex items-start gap-3 text-xs",
              authMode === "mutual_tls"
                ? "bg-emerald-950/80 border-emerald-800 text-emerald-200"
                : "bg-slate-900 border-slate-800 text-slate-300"
            )}>
              <span className="text-lg">{authMode === "mutual_tls" ? "🛡️" : "🌐"}</span>
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {authMode === "mutual_tls"
                    ? "Mutual TLS (mTLS) Two-Way Authentication Active"
                    : "Standard Server-Only Authentication Active"}
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {authMode === "mutual_tls"
                    ? "Server sends CertificateRequest. Client transmits client X.509 certificate and CertificateVerify signature, cryptographically authenticating both communicating peers before HTTP data flows."
                    : "Only the server presents an X.509 certificate. The client remains anonymous at the transport layer, with user authentication handled later via passwords/cookies."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: CIPHER SUITE DISSECTOR & SECURITY ANALYZER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🔬
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Cipher Suite Dissector &amp; Security Analyzer
                </h2>
                <p className="text-sm text-slate-400">
                  Select a cipher suite to analyze its symmetric algorithm, key length, AEAD mode, and security strength
                </p>
              </div>
            </div>

            {/* Cipher Switcher */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(cipherSuiteSpecs).map((key) => {
                const item = cipherSuiteSpecs[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCipherKey(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                      selectedCipherKey === key
                        ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.name.split("_WITH_")[0].split("_")[1] || item.name.split("_")[1]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">{currentCipher.name}</h3>
              <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold border", currentCipher.badgeColor)}>
                {currentCipher.securityRating}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Standard:</span>
                <div className="font-bold text-white">{currentCipher.standard}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Bulk Cipher:</span>
                <div className="font-bold text-cyan-300">{currentCipher.cipher}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Key Length:</span>
                <div className="font-bold text-emerald-300">{currentCipher.keyLength}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">PRF Hash:</span>
                <div className="font-bold text-amber-300">{currentCipher.prfHash}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p><strong className="text-emerald-400">Hardware Performance:</strong> {currentCipher.hardwareScore}</p>
              <p className="text-slate-400">{currentCipher.analysis}</p>
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
                2. Real-World TLS Handshake Engineering Scenarios
              </h2>
              <p className="text-sm text-slate-400">
                How senior security engineers configure and troubleshoot handshake protocols in production
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🔐</span> Scenario 1: Zero-Trust Microservices mTLS
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Strict mTLS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita and Mamata hardened the payment gateway API in Barrackpore.
                Rogue containers were attempting unauthorized access.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Fix: Enforced mTLS on Envoy proxy with client certificate validation and RSA-PSS signatures.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> 100% of unauthorized API calls dropped during the TLS handshake before executing application code.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>⏱️</span> Scenario 2: Metro Transit Clock Skew Fix
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  NTP Sync
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu and Mahima investigated Kolkata ticketing gates failing TLS handshakes with certificate expired errors.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Fix: Discovered edge kiosks had skewed system clocks; deployed local GPS NTP time sync.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> 100% resolution of certificate validity errors; sub-second passenger ticketing restored.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🚀</span> Scenario 3: ALPN HTTP/2 Multiplexing
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  ALPN h2
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila optimized tax assessment portal loading times for thousands of concurrent users in North 24 Parganas.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Fix: Configured ALPN &apos;h2&apos; negotiation directly inside the TLS 1.3 ClientHello.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Eliminated HTTP upgrade round trip; enabled 100+ assets to load concurrently over a single TLS socket.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🛡️</span> Scenario 4: OCSP Stapling Latency Drop
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  OCSP Stapling
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Mobile users in Ichapur experienced 120ms delays when browsers queried third-party CA revocation responders.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Fix: Enabled &apos;ssl_stapling on;&apos; on central reverse proxies to deliver pre-signed OCSP proofs directly in the handshake.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Handshake connection delay slashed by 120ms; 100% uptime even during CA OCSP server outages.
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
                  Studio 4: Regional West Bengal SOC Case Studies &amp; Handshake Drills
                </h2>
                <p className="text-sm text-slate-400">
                  Real-world enterprise handshake debugging and mTLS security configurations
                </p>
              </div>
            </div>

            {/* Drill Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDrillKey("barrackpore_fintech_mtls")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_fintech_mtls"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore mTLS Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_transit_clock_skew")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_transit_clock_skew"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Kolkata Transit Clock Drill
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
                3. Programmatic TLS 1.3 Handshake &amp; HKDF Simulator (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Execute a step-by-step mathematical simulation of the 1-RTT Handshake and HKDF key schedule in Python
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={tlsHandshakeEnginePy}
            title="tls_handshake_engine.py"
            highlightLines={[32, 54, 76, 98]}
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
                Essential handshake configuration habits, common beginner misconceptions, and revision points
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
                <strong className="text-white">1. Prioritize X25519 in KeyShare:</strong>
                <p className="text-slate-400">
                  Always place Curve25519 (X25519) first in your client&apos;s supported groups list. It executes key
                  exchanges in constant time 2x faster than NIST P-256 and avoids HelloRetryRequest fallback.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Enforce RSA-PSS or Ed25519 Signatures:</strong>
                <p className="text-slate-400">
                  Configure your Certificate Authority to issue certificates using RSA-PSS or Ed25519 to eliminate
                  deterministic padding forgery vulnerabilities permanently.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Configure Strict mTLS on Internal APIs:</strong>
                <p className="text-slate-400">
                  Never rely solely on perimeter firewalls. Enforce Mutual TLS between all internal microservices to
                  prevent lateral container spoofing inside Kubernetes clusters.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Always Synchronize System Clocks via NTP:</strong>
                <p className="text-slate-400">
                  Ensure all edge servers and IoT devices sync with NTP time servers. Even a few hours of clock drift
                  will trigger fatal &apos;CERT_DATE_INVALID&apos; handshake rejections.
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
                <strong className="text-rose-300">Misconception 1: "The server certificate proves the server is secure."</strong>
                <p className="text-slate-400">
                  The certificate only proves domain ownership. It does not protect against application vulnerabilities,
                  SQL injection, or compromised server backend code.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "0-RTT Early Data is safe for financial POST requests."</strong>
                <p className="text-slate-400">
                  0-RTT Early Data has no anti-replay protection. An attacker can replay a captured &apos;POST /transfer&apos;
                  packet, causing duplicate money transfers! Use 0-RTT only for safe GET requests.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Assuming TLS 1.3 Sends Cleartext Certificates:</strong>
                <p className="text-slate-400">
                  Unlike TLS 1.2, TLS 1.3 derives intermediate keys immediately after ServerHello and transmits the
                  certificate encrypted under server_handshake_key.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Neglecting Directional Traffic Keys:</strong>
                <p className="text-slate-400">
                  TLS 1.3 uses separate keys for client-to-server and server-to-client traffic. Attempting to decrypt both
                  directions with a single key will cause BAD_MAC_READ errors.
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
              <li><strong className="text-cyan-200">Think about:</strong> Why does the CertificateVerify signature cover the entire handshake transcript hash rather than just the certificate?</li>
              <li><strong className="text-cyan-200">Observe carefully:</strong> How Step 3 in Studio 1 derives Handshake Traffic Keys before Step 4 transmits the certificate.</li>
              <li><strong className="text-cyan-200">Try changing this:</strong> Switch between Server-Only and Mutual TLS in Studio 2 to see the extra CertificateRequest verification steps.</li>
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
                <span>Draw the complete step-by-step TLS 1.3 1-RTT handshake packet flow</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain how KeyShare achieves instant Diffie-Hellman secret derivation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe the 3 stages of the HKDF Key Schedule (Early, Handshake, Master)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain why Mutual TLS (mTLS) is mandatory for Zero Trust microservices</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="TLS Handshake Protocol: Key Exchange & Cipher Suites FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="TLS Handshake Protocol Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic2_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="The TLS 1.3 Handshake Protocol is a masterclass in elegant cryptographic engineering. By replacing complex multi-step proposals with speculative KeyShare extensions, the IETF achieved what was once thought impossible: halving handshake latency to a single round trip (1-RTT) while simultaneously making Perfect Forward Secrecy mandatory and encrypting the server's certificate on the wire. Always remember Sukanta Hui's golden rules of handshake security: 1. Prioritize Curve25519 (X25519) to eliminate timing attacks and HelloRetryRequest fallbacks; 2. Enforce RSA-PSS or Ed25519 digital signatures; and 3. Deploy Mutual TLS (mTLS) across all internal microservices so every API call is cryptographically authenticated before a single byte of application data is accepted!"
        />

      </div>
    </div>
  );
};

export default Topic2;
