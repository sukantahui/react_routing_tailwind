import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import ikeSaNegotiatorPy from "./topic7_files/ike_sa_negotiator.py?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgHandshakeLadderId = useId();
  const svgSaHierarchyId = useId();

  // =========================================================================
  // STUDIO 1 STATE: IKEV1 VS IKEV2 HANDSHAKE LADDER & PAYLOAD DISSECTOR
  // =========================================================================
  const [selectedIkeVersion, setSelectedIkeVersion] = useState("ikev2"); // "ikev1_main", "ikev2"
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const ikev2Steps = [
    {
      step: 1,
      name: "Message 1: IKE_SA_INIT (Initiator ➔ Responder)",
      sender: "Initiator (Barrackpore Hub)",
      receiver: "Responder (Kolkata Core)",
      isEncrypted: false,
      payloads: "HDR, SAi1 (AES-256-GCM proposals), KEi (Diffie-Hellman Public Key), Ni (Nonce)",
      desc: "Initiator proposes supported cipher suites, sends its ephemeral Diffie-Hellman public value (KEi), and a random 128-bit nonce (Ni) to prevent replay.",
      securityState: "Unencrypted Plaintext Exchange"
    },
    {
      step: 2,
      name: "Message 2: IKE_SA_INIT (Responder ➔ Initiator)",
      sender: "Responder (Kolkata Core)",
      receiver: "Initiator (Barrackpore Hub)",
      isEncrypted: false,
      payloads: "HDR, SAr1 (Selected Cipher), KEr (DH Public Key), Nr (Nonce), [CERTREQ]",
      desc: "Responder selects the cryptographic transforms, sends its DH public value (KEr) and nonce (Nr). Both peers now compute the shared secret (SKEYSEED) and derive 7 key streams (SK_e, SK_a, SK_d).",
      securityState: "Unencrypted (Keys Derived Immediately After)"
    },
    {
      step: 3,
      name: "Message 3: IKE_AUTH (Initiator ➔ Responder)",
      sender: "Initiator (Barrackpore Hub)",
      receiver: "Responder (Kolkata Core)",
      isEncrypted: true,
      payloads: "HDR, SK { IDi (Identity), [CERT], AUTH (Signature), SAi2 (Child SA Proposal), TSi, TSr }",
      desc: "Initiator proves identity via RSA-PSS/ECDSA signature over IKE_SA_INIT messages, sends digital certificates, proposes Child SA transforms, and declares Traffic Selectors (10.14.0.0/16).",
      securityState: "🔒 100% Encrypted with SK_ei (Identity Protected!)"
    },
    {
      step: 4,
      name: "Message 4: IKE_AUTH (Responder ➔ Initiator)",
      sender: "Responder (Kolkata Core)",
      receiver: "Initiator (Barrackpore Hub)",
      isEncrypted: true,
      payloads: "HDR, SK { IDr (Identity), [CERT], AUTH (Signature), SAr2 (Selected Child SA), TSi, TSr }",
      desc: "Responder authenticates itself with its digital signature, confirms accepted Child SA algorithms and Traffic Selectors (10.20.0.0/16). Initial ESP data tunnel is established in kernel.",
      securityState: "🔒 100% Encrypted with SK_er (Tunnel Fully Established)"
    }
  ];

  const ikev1Steps = [
    {
      step: 1,
      name: "Phase 1 - Msg 1-2: Security Association Proposals",
      sender: "Initiator ➔ Responder ➔ Initiator",
      isEncrypted: false,
      payloads: "HDR, SA (Proposed transforms) ➔ HDR, SA (Selected transform)",
      desc: "Peers agree on encryption (3DES/AES), hashing (SHA1/SHA256), authentication (PSK/Cert), and Diffie-Hellman group.",
      securityState: "Unencrypted"
    },
    {
      step: 2,
      name: "Phase 1 - Msg 3-4: Diffie-Hellman Key Exchange",
      sender: "Initiator ➔ Responder ➔ Initiator",
      isEncrypted: false,
      payloads: "HDR, KE, Nonce ➔ HDR, KE, Nonce",
      desc: "Peers exchange Diffie-Hellman public parameters and random nonces. Shared master secret is computed.",
      securityState: "Unencrypted (Keys Derived Afterwards)"
    },
    {
      step: 3,
      name: "Phase 1 - Msg 5-6: Peer Identity Authentication",
      sender: "Initiator ➔ Responder ➔ Initiator",
      isEncrypted: true,
      payloads: "HDR*, ID, HASH/SIG ➔ HDR*, ID, HASH/SIG",
      desc: "Peers authenticate identities inside the encrypted Phase 1 IKE SA. (Requires 6 total messages for Phase 1 alone!)",
      securityState: "🔒 Encrypted with Phase 1 Key"
    },
    {
      step: 4,
      name: "Phase 2 - Msg 1-3: Quick Mode (Child SA Setup)",
      sender: "Initiator ➔ Responder ➔ Initiator",
      isEncrypted: true,
      payloads: "HDR*, HASH, SA, Nonce, [KE], IDci, IDcr ➔ HDR* ➔ HDR*",
      desc: "Three additional messages are required to negotiate the IPsec ESP data plane SA. Total = 9 round-trip messages!",
      securityState: "🔒 Encrypted (Heavy 9-Message Latency)"
    }
  ];

  const currentSteps = selectedIkeVersion === "ikev2" ? ikev2Steps : ikev1Steps;
  const currentStep = currentSteps[Math.min(activeStepIndex, currentSteps.length - 1)];

  // =========================================================================
  // STUDIO 2 STATE: IKEV2 DOS PROTECTION & ANTI-SPOOFING COOKIE SIMULATOR
  // =========================================================================
  const [isUnderDosFlood, setIsUnderDosFlood] = useState(false);
  const [clientIpAddress, setClientIpAddress] = useState("203.0.113.88");
  const [cookieChallengeState, setCookieChallengeState] = useState("normal"); // "normal", "cookie_issued", "cookie_verified"

  const dosSimulationMetrics = useMemo(() => {
    if (isUnderDosFlood) {
      const generatedCookie = "0x88AF1901B3C499E1";
      return {
        modeTitle: "High-Load DoS Mitigation Active (RFC 7296 Section 2.6)",
        responderStatus: "🛡️ CHALLENGE ISSUED: Stateless Anti-Spoofing Cookie Returned",
        memoryAllocated: "0 Bytes (Zero Half-Open State Stored in RAM)",
        cpuExpended: "0.02 µs (Zero DH Exponentiation Spent on Bogus Packet)",
        cookieTag: generatedCookie,
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        description:
          "The responder refuses to store state or execute heavy Diffie-Hellman math. It challenges the client with HMAC(Secret, ClientIP:SPI). Spoofed source IPs cannot receive or echo the cookie."
      };
    } else {
      return {
        modeTitle: "Normal Operational Load",
        responderStatus: "✔ NORMAL HANDSHAKE: IKE_SA_INIT Processed Directly",
        memoryAllocated: "2.4 KB (Allocated for DH and SKEYSEED generation)",
        cpuExpended: "1.2 ms (Curve25519 / ECP-384 Computation)",
        cookieTag: "N/A (Bypassed)",
        badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
        description:
          "Under standard network traffic, the responder processes IKE_SA_INIT immediately, generating DH keys and establishing the tunnel in standard 4-message latency."
      };
    }
  }, [isUnderDosFlood]);

  // =========================================================================
  // STUDIO 3 STATE: DUAL SA HIERARCHY & PFS REKEY SANDBOX
  // =========================================================================
  const [activeChildSaCount, setActiveChildSaCount] = useState(2);
  const [pfsEnabled, setPfsEnabled] = useState(true);
  const [rekeyCounter, setRekeyCounter] = useState(1);
  const [rekeyLog, setRekeyLog] = useState([
    { id: 1, time: "18:24:00", event: "Initial SA Established (DH Group 19 / ECP-256)", spi: "0x88af1901" }
  ]);

  const handleTriggerRekey = () => {
    const nextRekey = rekeyCounter + 1;
    setRekeyCounter(nextRekey);
    const newSpi = "0x" + Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, "0");
    const eventText = pfsEnabled
      ? `CREATE_CHILD_SA (PFS Enforced: Fresh Ephemeral DH Secret Exchanged)`
      : `CREATE_CHILD_SA (Fast Rekey: Derived from Parent SK_d without DH)`;
    setRekeyLog((prev) => [
      { id: nextRekey, time: new Date().toLocaleTimeString(), event: eventText, spi: newSpi },
      ...prev.slice(0, 4)
    ]);
  };

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_fintech_ikev2");

  const regionalDrills = {
    barrackpore_fintech_ikev2: {
      id: "barrackpore_fintech_ikev2",
      title: "Barrackpore Treasury ➔ Salt Lake FinTech Core: IKEv2 ECP-384 Tunnel",
      location: "Connecting North 24 Parganas Treasury Hub to Salt Lake Sector V FinTech Data Center",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Municipal audit mandated migrating from legacy static Pre-Shared Keys (vulnerable to dictionary attacks) to X.509 RSA-PSS/ECDSA certificates with automated 8-hour PFS rekeying.",
      solution:
        "Deployed strongSwan IKEv2 with ECP-384 elliptic curves, automated OCSP revocation checks, and AES-256-GCM Child SAs with `CREATE_CHILD_SA` rekeying.",
      outcome:
        "100% mutual cryptographic authentication; zero password exposure; uninterrupted session rotation securing ₹60,00,000 daily transaction sync."
    },
    ichapur_defense_eap_tls: {
      id: "ichapur_defense_eap_tls",
      title: "Ichapur Defense Facility: Remote Access with EAP-TLS Authentication",
      location: "Securing 250 remote defense engineers and field laptops accessing Ichapur CAD/CAM clusters",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Field laptops connecting from untrusted hotel and home networks required hardware-backed multi-factor authentication (MFA) without proprietary client software.",
      solution:
        "Configured native IKEv2 EAP-TLS with hardware YubiKey smartcards. The strongSwan gateway validates the hardware certificate before issuing a virtual IP via Configuration Payloads (`CP`).",
      outcome:
        "100% compliance under Defense Information Assurance standards; zero password interception risk."
    },
    jadavpur_smart_mobike: {
      id: "jadavpur_smart_mobike",
      title: "Jadavpur Smart City: MOBIKE (RFC 4555) Seamless Roaming",
      location: "Patrol surveillance vehicles streaming live telemetry across municipal Wi-Fi and 5G cellular",
      engineers: "Sukanta Hui (Lead Instructor) & Research Scholars",
      threatScenario:
        "Vehicles experienced constant VPN drops and video stream freezing whenever their IP address changed as they transitioned from roadside Wi-Fi hotspots to cellular towers.",
      solution:
        "Activated IKEv2 MOBIKE (RFC 4555). Vehicles send lightweight `UPDATE_SA_ADDRESSES` notifications, updating kernel outer IP addresses in under 40 milliseconds.",
      outcome:
        "Zero video drops during network handover; seamless continuous tunnel persistence across the entire municipal corridor."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_004 • Topic 7</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Internet Key Exchange (IKEv1 &amp; IKEv2) &amp; Security Associations
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master IPsec control-plane architecture: IKEv1 vs IKEv2 evolution, 4-message initial exchanges (IKE_SA_INIT / IKE_AUTH),
            parent IKE SA vs Child SAs, Perfect Forward Secrecy (PFS), MOBIKE, and DoS Anti-Spoofing Cookies.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              IKEv1 (9 msgs) vs IKEv2 (4 msgs)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              IKE_SA_INIT &amp; IKE_AUTH
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              IKE SA vs Child SA Hierarchy
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Stateless DoS Anti-Spoofing Cookies
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              MOBIKE (RFC 4555) Roaming
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
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🔑
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Control Plane vs Data Plane Separation in IPsec
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how user-space IKE daemons establish cryptographic trust before programming the in-kernel data plane
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In production IPsec architectures across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, security operations are divided into two strictly decoupled layers:
              the <strong className="text-white">Control Plane (IKE on UDP 500/4500)</strong> and the{" "}
              <strong className="text-white">Data Plane (ESP on Protocol 50)</strong>. IKE handles asymmetric handshakes, mutual authentication,
              and key derivation in user-space, and then installs negotiated Security Associations (SAs) into the operating system kernel for wire-speed packet processing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>⚡</span> 1. Fast 4-Message Setup
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  IKEv2 establishes both the control channel (IKE SA) and the initial data tunnel (Child SA) in just 2 round trips
                  (4 messages), slashing connection setup latency by 50% compared to IKEv1.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>🛡️</span> 2. Built-in DoS &amp; NAT Resilience
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Features native stateless anti-spoofing cookies to defeat half-open SYN floods and automated NAT-detection (NAT-D)
                  that seamlessly switches to UDP 4500 without manual intervention.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🔄</span> 3. MOBIKE &amp; PFS Rekeying
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  MOBIKE (RFC 4555) allows mobile clients to roam between Wi-Fi and 5G networks without dropping VPN tunnels, while
                  ephemeral Diffie-Hellman guarantees Perfect Forward Secrecy during every rekey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE IKEV1 VS IKEV2 HANDSHAKE LADDER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🪜
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: IKEv1 vs IKEv2 Message Ladder &amp; Payload Dissector
                </h2>
                <p className="text-sm text-slate-400">
                  Step-by-step visual dissection of initial handshake exchanges, payload structures, and encryption boundaries
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setSelectedIkeVersion("ikev2"); setActiveStepIndex(0); }}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  selectedIkeVersion === "ikev2"
                    ? "bg-cyan-950 border-cyan-500 text-white shadow-md shadow-cyan-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                IKEv2 (4 Messages - Modern)
              </button>
              <button
                onClick={() => { setSelectedIkeVersion("ikev1_main"); setActiveStepIndex(0); }}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  selectedIkeVersion === "ikev1_main"
                    ? "bg-amber-950 border-amber-500 text-white shadow-md shadow-amber-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                IKEv1 Main Mode (9 Messages - Legacy)
              </button>
            </div>
          </div>

          {/* Step Progression Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {currentSteps.map((stepItem, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={clsx(
                    "text-left p-3 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{stepItem.name.split(":")[0]}</span>
                  <span className={clsx("text-[10px] font-mono", stepItem.isEncrypted ? "text-emerald-400" : "text-amber-400")}>
                    {stepItem.isEncrypted ? "🔒 Encrypted" : "🔓 Plaintext"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{currentStep.name}</h3>
                <span className="text-[11px] text-slate-400 font-sans">Direction: {currentStep.sender}</span>
              </div>
              <span className={clsx(
                "px-2.5 py-1 rounded text-[11px] font-bold border",
                currentStep.isEncrypted ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-amber-950 text-amber-300 border-amber-700"
              )}>
                {currentStep.securityState}
              </span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold text-[11px] font-sans">Payloads Carried on Wire:</div>
              <p className="text-slate-200 text-[11px] bg-slate-950 p-2.5 rounded-lg border border-slate-800 overflow-x-auto">
                {currentStep.payloads}
              </p>
            </div>

            <div className="text-slate-300 text-[11px] font-sans leading-relaxed">
              <strong className="text-white">Forensic Explanation:</strong> {currentStep.desc}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: IKEV2 DOS PROTECTION & ANTI-SPOOFING COOKIE SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🛡️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: IKEv2 DoS Defense &amp; Stateless Cookie Simulator
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate responder behavior under SYN/INIT flood attacks and observe stateless anti-spoofing challenge verification
                </p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 text-xs">
              <input
                type="checkbox"
                checked={isUnderDosFlood}
                onChange={(e) => setIsUnderDosFlood(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0"
              />
              <span className="text-slate-300 font-semibold">Simulate High-Load DoS / Half-Open Flood</span>
            </label>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 font-sans flex items-center justify-between">
                  <span>1. Incoming Connection Request</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">UDP Port 500</span>
                </div>
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>Client IP : <span className="text-cyan-300">{clientIpAddress}</span></div>
                  <div>Payload   : <span className="text-amber-400">IKE_SA_INIT (KEi + SAi1)</span></div>
                  <div>Load State: <span className={clsx(isUnderDosFlood ? "text-rose-400 font-bold" : "text-emerald-400")}>
                    {isUnderDosFlood ? "🚨 FLOOD DETECTED (Threshold > 500 req/s)" : "✔ NORMAL (Load < 50 req/s)"}
                  </span></div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 font-sans flex items-center justify-between">
                  <span>2. Responder Resource Allocation</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Kolkata Gateway</span>
                </div>
                <div className="text-slate-300 space-y-1 text-[11px]">
                  <div>Memory State Stored: <span className="text-emerald-300 font-bold">{dosSimulationMetrics.memoryAllocated}</span></div>
                  <div>CPU Time Expended   : <span className="text-emerald-300 font-bold">{dosSimulationMetrics.cpuExpended}</span></div>
                  <div>Cookie Issued       : <span className="text-amber-400 font-mono">{dosSimulationMetrics.cookieTag}</span></div>
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", dosSimulationMetrics.badgeColor)}>
              <div className="font-bold flex items-center gap-2">
                <span>⚡ Responder Action:</span>
                <span>{dosSimulationMetrics.responderStatus}</span>
              </div>
              <p className="opacity-90 font-sans text-[11px]">
                {dosSimulationMetrics.description}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: DUAL SA HIERARCHY & PFS REKEY SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🌳
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Two-Tier SA Hierarchy &amp; Perfect Forward Secrecy Rekey Sandbox
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect parent IKE SA controlling multiple Child SAs, and trigger live `CREATE_CHILD_SA` rekey exchanges with PFS
                </p>
              </div>
            </div>
            <button
              onClick={handleTriggerRekey}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              Trigger Rekey (CREATE_CHILD_SA) ➔
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800/80 pb-3 gap-2">
              <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <input
                  type="checkbox"
                  checked={pfsEnabled}
                  onChange={(e) => setPfsEnabled(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Enforce Perfect Forward Secrecy (PFS Diffie-Hellman on Rekey)</span>
              </label>
              <span className="text-slate-400 font-mono">
                Active Child SAs: <strong className="text-cyan-300">2 Tunnels</strong> | Rekey Generation: #{rekeyCounter}
              </span>
            </div>

            {/* Visual SA Tree Architecture */}
            <div className="space-y-3 font-mono text-xs">
              {/* Parent IKE SA */}
              <div className="bg-indigo-950/70 border border-indigo-600 rounded-xl p-4 space-y-2 shadow-lg shadow-indigo-950/30">
                <div className="flex justify-between items-center font-sans font-bold text-indigo-300">
                  <span className="flex items-center gap-2">👑 Parent IKE SA (Control Channel - Bidirectional)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-700">UDP Port 500 / 4500</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                  <div>Initiator SPI: <span className="text-cyan-300">0x88af1901b3c499e1</span></div>
                  <div>Responder SPI: <span className="text-emerald-300">0x4a1f89bc99e188af</span></div>
                  <div>Cipher: <span className="text-white">AES-256-GCM / PRF-SHA384 / ECP-384</span></div>
                </div>
              </div>

              {/* Child SAs */}
              <div className="pl-6 border-l-2 border-indigo-700 space-y-3">
                <div className="bg-emerald-950/40 border border-emerald-700/80 rounded-xl p-3.5 space-y-1">
                  <div className="flex justify-between items-center font-sans font-bold text-emerald-300">
                    <span>Child SA #1: Financial Treasury Subnet (10.14.0.0/16 ➔ 10.20.0.0/16)</span>
                    <span className="text-[10px] text-emerald-400">ESP (SPI: {rekeyLog[0].spi})</span>
                  </div>
                  <div className="text-[11px] text-slate-300 flex justify-between">
                    <span>Inbound SPI: 0x88af1901 | Outbound SPI: 0x4a1f89bc</span>
                    <span className="text-slate-400 font-sans">AES-256-GCM AEAD (Active)</span>
                  </div>
                </div>

                <div className="bg-cyan-950/40 border border-cyan-700/80 rounded-xl p-3.5 space-y-1">
                  <div className="flex justify-between items-center font-sans font-bold text-cyan-300">
                    <span>Child SA #2: VoIP &amp; Video Subnet (10.14.50.0/24 ➔ 10.20.50.0/24)</span>
                    <span className="text-[10px] text-cyan-400">ESP (SPI: 0x9923bcfe)</span>
                  </div>
                  <div className="text-[11px] text-slate-300 flex justify-between">
                    <span>Inbound SPI: 0x9923bcfe | Outbound SPI: 0x110a7788</span>
                    <span className="text-slate-400 font-sans">AES-256-GCM AEAD (Active)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rekey History Log */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Rekey Event History:
              </div>
              {rekeyLog.map((log) => (
                <div
                  key={log.id}
                  className="flex justify-between items-center p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono"
                >
                  <span className="text-slate-300">{log.event}</span>
                  <span className="text-cyan-400">SPI: {log.spi} ({log.time})</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & STRONGSWAN CLI AUDITING LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; strongSwan Audit Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world IKEv2 deployments in West Bengal and inspect live `swanctl` SA database dumps
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Forensic Lab
            </span>
          </div>

          {/* Drill Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(regionalDrills).map(([key, drill]) => {
              const isActive = activeDrillKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-2",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{drill.title}</span>
                  <span className="text-[10px] text-cyan-400">{drill.engineers}</span>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">{currentDrill.title}</h3>
                <p className="text-xs text-slate-400">Location: {currentDrill.location}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono">
                Engineers: {currentDrill.engineers}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>🚨</span> Threat Vector &amp; Audit Finding:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> IKEv2 Cryptographic Architecture:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux strongSwan Swanctl Terminal Output */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-gw: ~ (strongSwan VICI Interface)</span>
                <span className="text-cyan-400">swanctl --list-sas</span>
              </div>
              <div className="p-4 space-y-2 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                <div>
                  <span className="text-emerald-400 font-bold">$ sudo swanctl --list-sas</span>
                </div>
                <div className="text-slate-400">
                  net-to-net: #1, ESTABLISHED, <span className="text-cyan-300">IKEv2</span>, 88af1901b3c499e1_i* 4a1f89bc99e188af_r<br />
                  &nbsp;&nbsp;local:  'barrackpore-hub.gov.in'<br />
                  &nbsp;&nbsp;remote: 'kolkata-core.gov.in'<br />
                  &nbsp;&nbsp;AES_GCM_16_256/PRF_HMAC_SHA2_384/<span className="text-emerald-300">ECP_384</span><br />
                  &nbsp;&nbsp;net-to-net: #1, reqid 1, INSTALLED, TUNNEL, ESP:AES_GCM_16_256<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;installed 45m ago, <span className="text-amber-300">rekeying in 7h 15m</span>, expires in 8h 15m<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;in  c88af101, 1450280 bytes, 1024 packets, 0 replay drops<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;out c4a1f89b, 2840120 bytes, 2048 packets
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-rose-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>⚠️</span> Common Pitfalls &amp; Traps
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">1.</span>
                <span><strong>Using IKEv1 Aggressive Mode:</strong> Transmits peer identities and PSK hashes in cleartext in the first packet, allowing attackers with `ike-scan` to capture and crack passwords offline.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Mismatched Traffic Selectors:</strong> If Gateway A proposes `10.14.0.0/16` and Gateway B expects `10.14.2.0/24`, the IKE_AUTH handshake fails with `TS_UNACCEPTABLE`.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Disabling Dead Peer Detection (DPD):</strong> Without DPD keepalives, when a remote link crashes, the local router creates a routing black hole, failing to switch to backup circuits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Weak MODP Diffie-Hellman Groups:</strong> Deploying DH Group 1 (768-bit) or Group 2 (1024-bit) leaves tunnels vulnerable to nation-state Logjam factoring attacks. Standardize on Group 14+ or Curve25519.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>🛡️</span> Production Best Practices
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span><strong>Standardize Exclusively on IKEv2 (RFC 7296):</strong> Cuts handshake latency by 50%, natively handles NAT-T, provides built-in DoS cookies, and supports MOBIKE roaming.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Mandate Perfect Forward Secrecy (PFS):</strong> Configure ephemeral DH exchange on every `CREATE_CHILD_SA` rekey so compromise of one key never exposes other sessions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Use Elliptic Curve Cryptography (ECP-384 / Curve25519):</strong> Delivers military-grade security with 10x faster key generation and zero UDP packet fragmentation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Enable Route-Based IPsec (VTI / XFRM Interfaces):</strong> Binds tunnels to virtual network interfaces, enabling standard OSPF/BGP routing and simple traffic accounting.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST SECTION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why does IKEv2 use 4 messages instead of IKEv1's 9? Because IKEv2 merges the Diffie-Hellman key setup (IKE_SA_INIT)
                and authenticated Child SA negotiation (IKE_AUTH) into an integrated two-step exchange!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>IKE is UDP Port 500 / 4500 (Control Plane).</li>
                <li>IKE SA is bidirectional; Child SAs are unidirectional pairs.</li>
                <li>IKEv2 4-message initial setup: IKE_SA_INIT (2 msgs) + IKE_AUTH (2 msgs).</li>
                <li>Stateless anti-spoofing cookies protect against DoS flood attacks.</li>
                <li>MOBIKE (RFC 4555) preserves tunnels across changing IP addresses.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on IKEv2 &amp; SA Lifecycle Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating IKEv2 4-message exchange, SKEYSEED derivation, and stateless DoS cookie verification
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={ikeSaNegotiatorPy}
            title="ike_sa_negotiator.py"
            highlightLines={[30, 48, 70, 95, 120]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Internet Key Exchange (IKEv1/IKEv2) &amp; Security Associations FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="In your BCA examination, emphasize the clear separation of concerns: IKE is the user-space control plane protocol (UDP Port 500/4500) that negotiates cryptographic keys, while ESP/AH are the kernel data-plane protocols. Memorize the 4-message IKEv2 handshake: IKE_SA_INIT (2 unencrypted messages for DH parameter exchange) followed by IKE_AUTH (2 encrypted messages for mutual identity authentication and Child SA creation). Always mention how IKEv2's stateless anti-spoofing cookies prevent Denial-of-Service half-open floods!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: IKE &amp; Security Associations Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 7 Note"
            downloadFileName="topic7_ike_and_sa_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
