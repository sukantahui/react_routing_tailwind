import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic12_files/topic12_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import formalProtocolVerifierPy from "./topic12_files/formal_protocol_verifier.py?raw";

const Topic12 = () => {
  // Unique SVG IDs
  const svgDolevYaoId = useId();
  const svgProverifTraceId = useId();

  // =========================================================================
  // STUDIO 1 STATE: DOLEV-YAO THREAT MODEL & INVARIANTS
  // =========================================================================
  const [selectedAttackerCapability, setSelectedAttackerCapability] = useState("intercept_forge");

  const attackerCapabilities = {
    eavesdrop: {
      name: "1. Passive Eavesdropping (Overhear)",
      attackerAction: "Reads all raw plaintext packets on the wire (Wi-Fi sniffing, tap on fiber links).",
      defensePrimitive: "Symmetric AEAD Encryption (AES-256-GCM / ChaCha20-Poly1305)",
      provenInvariant: "Secrecy (Strong Confidentiality) ➔ not attacker(Secret_Data)",
      status: "Mathematically Proven in ProVerif ✔",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    intercept_forge: {
      name: "2. Active Man-in-the-Middle (Intercept & Forge)",
      attackerAction: "Blocks packets, modifies handshake fields, injects forged messages from known public keys.",
      defensePrimitive: "Asymmetric Digital Signatures (RSA/ECDSA/Ed25519) + Transcript Hashing",
      provenInvariant: "Injective Agreement (1-to-1 Mutual Authentication)",
      status: "Mathematically Proven in ProVerif ✔",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
    },
    replay: {
      name: "3. Replay & Delayed Reflection",
      attackerAction: "Captures past valid messages and resends them hours later to trigger duplicate actions.",
      defensePrimitive: "Fresh Cryptographic Nonces (`new Na: bitstring`) + Monotonic Sequence Counters",
      provenInvariant: "Anti-Replay & Message Freshness Guarantee",
      status: "Mathematically Proven in ProVerif ✔",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    key_compromise: {
      name: "4. Long-Term Identity Key Compromise",
      attackerAction: "Adversary seizes server long-term private identity key at future time T2.",
      defensePrimitive: "Ephemeral Diffie-Hellman Key Exchange (ECDHE Curve25519)",
      provenInvariant: "Perfect Forward Secrecy (PFS) ➔ Past sessions remain secret",
      status: "Mathematically Proven in Tamarin ✔",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    }
  };

  const currentCapability = attackerCapabilities[selectedAttackerCapability];

  // =========================================================================
  // STUDIO 2 STATE: PROVERIF MODEL & ATTACK TRACE DISCOVERY
  // =========================================================================
  const [modelType, setModelType] = useState("tls13_hardened"); // "needham_flawed", "tls13_hardened"

  // =========================================================================
  // STUDIO 3 STATE: COMPREHENSIVE MULTI-PROTOCOL MATRIX (MODULE REVIEW)
  // =========================================================================
  const [selectedProtocolKey, setSelectedProtocolKey] = useState("tls13");

  const multiProtocolMatrix = {
    tls13: {
      name: "TLS 1.3 (RFC 8446)",
      layer: "Transport / App (OSI Layer 4-7)",
      keyExchange: "ECDHE (Curve25519 / P-256)",
      secrecy: "🌟 Maximum (AEAD Only)",
      pfs: "✔ Mandatory & Built-in",
      identityPrivacy: "✔ Encrypted Certificate",
      formalProof: "Formal Proof in ProVerif & Tamarin (RFC Pre-Publication)",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    ipsec_ikev2: {
      name: "IPsec IKEv2 / ESP (RFC 7296)",
      layer: "Network Layer (OSI Layer 3)",
      keyExchange: "IKEv2 Ephemeral DH (Parent & Child SAs)",
      secrecy: "🌟 Maximum (ESP AEAD)",
      pfs: "✔ Supported via Child SA Rekeying",
      identityPrivacy: "✔ Encrypted in IKE_AUTH",
      formalProof: "Formally Verified State Machine & Anti-Replay 64-bit Window",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
    },
    ssh2: {
      name: "Secure Shell (SSH-2 / RFC 4251)",
      layer: "Application Layer (Port 22)",
      keyExchange: "KEX DH with Host Key Signature",
      secrecy: "🌟 High (ChaCha20-Poly1305 / AES-GCM)",
      pfs: "✔ Ephemeral KEX Rekeying",
      identityPrivacy: "⚠️ Host Key Verified on First Use (TOFU)",
      formalProof: "Formally Modeled in Scyther & ProVerif",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    smime_pgp: {
      name: "Secure Email (S/MIME & PGP)",
      layer: "MIME Payload (End-to-End)",
      keyExchange: "Asymmetric Hybrid Wrap (AES-256 + RSA/ECC)",
      secrecy: "🌟 End-to-End Payload Privacy",
      pfs: "❌ None (Static Public Keys)",
      identityPrivacy: "❌ Cleartext Email Headers (Subject/To)",
      formalProof: "Verified MIME Parsers & MDC Integrity Checks",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    dnssec: {
      name: "DNSSEC (RFC 4033-4035)",
      layer: "Application / DNS (Port 53)",
      keyExchange: "Dual Key: KSK (Flag 257) & ZSK (Flag 256)",
      secrecy: "❌ None (Data is Public)",
      pfs: "❌ None (Static Zone Signatures)",
      identityPrivacy: "❌ Public DNS Queries (Requires DoH/DoT)",
      formalProof: "Formal Proof of Hierarchical Chain of Trust & Non-Existence",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    }
  };

  const currentProtocol = multiProtocolMatrix[selectedProtocolKey];

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_banking_audit");

  const regionalDrills = {
    barrackpore_banking_audit: {
      id: "barrackpore_banking_audit",
      title: "Barrackpore Municipal Core Banking: ProVerif Formal Audit",
      location: "Municipal property tax and treasury fund settlement gateways",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "High-value API settlements processing ₹85,00,000 required mathematical guarantees against replay and reflection attacks before government deployment.",
      solution:
        "Modeled the entire custom mutual authentication handshake in Applied Pi-Calculus using ProVerif. Automated resolution uncovered an unauthenticated nonce reflection race condition.",
      outcome:
        "Patched protocol with cryptographic transcript hashing; proved 100% Injective Agreement and Secrecy across infinite concurrent sessions."
    },
    ichapur_defense_tamarin: {
      id: "ichapur_defense_tamarin",
      title: "Ichapur Defense Facility: Tamarin Satellite Telemetry State Machine Proof",
      location: "Tactical mesh telemetry and drone command and control links",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Tactical mesh nodes operating in hostile electronic warfare environments needed verified Perfect Forward Secrecy and Post-Compromise Security.",
      solution:
        "Constructed Multiset Rewriting rules in Tamarin Prover modeling the Noise Protocol state machine with continuous ephemeral Diffie-Hellman ratcheting.",
      outcome:
        "Automated proof generated in 45 seconds verifying zero key leakage even under partial hardware memory dumps."
    },
    kolkata_fintech_zero_trust: {
      id: "kolkata_fintech_zero_trust",
      title: "Salt Lake Sector V FinTech: Continuous CI/CD Formal Verification",
      location: "Microservice zero-trust mesh routing 500,000 transactions/minute",
      engineers: "Sukanta Hui (Lead Instructor) & Scholars",
      threatScenario:
        "Frequent microservice API token updates risked introducing authentication bypass regressions in inter-service mTLS communication.",
      solution:
        "Integrated ProVerif and EasyCrypt checks into the automated GitLab CI/CD pipeline. Every protocol commit is formally verified against the Dolev-Yao threat model.",
      outcome:
        "Zero regressions in production; mathematically certified security compliance under RBI FinTech regulations."
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
            <span>🛡️ Module 005_004 • Topic 12 (Capstone)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            End-to-End Cryptographic Protocol Verification Case Study
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Capstone formal methods analysis: Dolev-Yao threat model, ProVerif / Tamarin Prover symbolic execution,
            counterexample discovery (Lowe's anomaly), and comprehensive multi-protocol verification across the entire OSI stack.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Dolev-Yao Threat Model (1983)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              ProVerif &amp; Applied Pi-Calculus
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Tamarin Multiset Rewriting
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Secrecy • Injective Agreement • PFS
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Full Module Multi-Protocol Review
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
              📐
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Science of Formal Protocol Verification
              </h2>
              <p className="text-sm text-slate-400">
                Why human intuition and informal pen-and-paper proofs fail, and how automated theorem provers mathematically prove protocol invariants
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In high-security engineering across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, testing a cryptographic protocol against 100 manual test cases proves nothing about its security.
              Subtle race conditions, message replay interleavings, and identity-binding flaws can remain undetected for decades.
              <strong className="text-white"> Formal Methods</strong> use mathematical logic (such as <strong className="text-white">ProVerif</strong> and <strong className="text-white">Tamarin Prover</strong>)
              to explore all infinite adversary execution paths under the <strong className="text-white">Dolev-Yao Threat Model</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🕵️</span> 1. The Dolev-Yao Model
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Assumes the adversary has complete control over the network (can overhear, intercept, forge, and replay any message),
                  while cryptographic primitives are treated as perfect black boxes.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>🔍</span> 2. Invariant Verification
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Proves fundamental security invariants: Secrecy (data never leaks), Injective Agreement (1-to-1 mutual authentication without replay),
                  and Perfect Forward Secrecy.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>⚡</span> 3. Attack Trace Discovery
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If a security invariant fails, the formal tool automatically generates a step-by-step counterexample trace demonstrating exactly how an attacker can breach the protocol.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: DOLEV-YAO THREAT MODEL & INVARIANTS SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🛡️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Dolev-Yao Attacker Primitives &amp; Mathematical Invariants
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect the foundational Dolev-Yao attacker capabilities and the exact cryptographic primitives used to mathematically neutralize each threat
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              Dolev-Yao (1983)
            </span>
          </div>

          {/* Capability Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.entries(attackerCapabilities).map(([key, item]) => {
              const isActive = selectedAttackerCapability === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAttackerCapability(key)}
                  className={clsx(
                    "text-left p-3 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{item.name.split(". ")[1].split(" (")[0]}</span>
                  <span className={clsx("text-[10px] px-2 py-0.5 rounded w-fit border", item.badgeColor)}>
                    Primitive #{item.name.split(".")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Capability Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{currentCapability.name}</h3>
                <span className="text-[11px] text-slate-400 font-sans">Formal Verifier Status: {currentCapability.status}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded text-xs font-bold border", currentCapability.badgeColor)}>
                Verified Invariant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-rose-400 font-sans">Adversary Network Action:</div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{currentCapability.attackerAction}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-400 font-sans">Required Cryptographic Defense Primitive:</div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{currentCapability.defensePrimitive}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Formal Mathematical Invariant Query:</div>
              <div className="text-emerald-300 font-bold overflow-x-auto text-[11px]">{currentCapability.provenInvariant}</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: PROVERIF MODEL & ATTACK TRACE DISCOVERY */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🔬
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: ProVerif Applied Pi-Calculus &amp; Counterexample Studio
                </h2>
                <p className="text-sm text-slate-400">
                  Compare an unpatched protocol discovering Lowe's Man-in-the-Middle counterexample vs hardened TLS 1.3 theorem resolution
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setModelType("needham_flawed")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  modelType === "needham_flawed"
                    ? "bg-rose-950 border-rose-600 text-rose-300 shadow-md shadow-rose-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                Flawed Protocol (Counterexample Found)
              </button>
              <button
                onClick={() => setModelType("tls13_hardened")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  modelType === "tls13_hardened"
                    ? "bg-emerald-950 border-emerald-600 text-emerald-300 shadow-md shadow-emerald-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                Hardened TLS 1.3 (Mathematically Proven)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            {modelType === "needham_flawed" ? (
              <div className="space-y-3">
                <div className="text-xs text-rose-300 font-sans leading-relaxed">
                  🚨 <strong>ProVerif Attack Trace Discovered (Lowe's Anomaly):</strong> Because Message 2 lacked Bob's explicit identity,
                  an active adversary intercepts Alice's message, relays it to Bob, and decrypts the session key using Alice as an oracle.
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                  <div className="text-cyan-400 font-bold">--- Attack Trace Output by ProVerif Engine ---</div>
                  <div>1. Alice ➔ Attacker (I) : &#123;Na, Alice&#125;_Pk(I)</div>
                  <div>2. Attacker decrypts with Sk(I) ➔ Learns Nonce Na</div>
                  <div>3. Attacker ➔ Bob (B)    : &#123;Na, Alice&#125;_Pk(B) (Impersonating Alice!)</div>
                  <div>4. Bob ➔ Alice (A)       : &#123;Na, Nb&#125;_Pk(A)</div>
                  <div>5. Alice ➔ Attacker (I)  : &#123;Nb&#125;_Pk(I)</div>
                  <div>6. Attacker decrypts ➔ Learns Bob's secret Nonce Nb!</div>
                  <div className="text-rose-400 font-bold">RESULT: Injective Agreement FAILS. Attacker authenticated as Alice!</div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-emerald-300 font-sans leading-relaxed">
                  🌟 <strong>ProVerif Proof Established (TLS 1.3 RFC 8446):</strong> Ephemeral Diffie-Hellman, transcript hashing,
                  and HKDF key separation guarantee that no Dolev-Yao attacker state can derive the session key or forge handshakes.
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-300 space-y-1.5 text-[11px] leading-relaxed">
                  <div className="text-cyan-400 font-bold">--- ProVerif Horn Clause Theorem Prover Output ---</div>
                  <div>Completing equations...</div>
                  <div>Starting query: not attacker(client_application_traffic_secret[])</div>
                  <div><span className="text-emerald-400 font-bold">RESULT not attacker(client_application_traffic_secret[]) is true.</span> (Secrecy Holds ✔)</div>
                  <div>Starting query: inj-event(endServer(x)) ==&gt; inj-event(beginClient(x))</div>
                  <div><span className="text-emerald-400 font-bold">RESULT inj-event(endServer(x)) ==&gt; inj-event(beginClient(x)) is true.</span> (1-to-1 Authentication Holds ✔)</div>
                  <div className="text-emerald-300 font-bold">Verification time: 0.284s • 0 Counterexamples found across infinite sessions.</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: COMPREHENSIVE MULTI-PROTOCOL VERIFICATION MATRIX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                📊
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Module-Wide Multi-Protocol Cryptographic Verification Matrix
                </h2>
                <p className="text-sm text-slate-400">
                  Comprehensive capstone comparison of all security protocols studied across Module 005_004
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Module 005_004 Master Review
            </span>
          </div>

          {/* Protocol Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {Object.entries(multiProtocolMatrix).map(([key, proto]) => {
              const isActive = selectedProtocolKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedProtocolKey(key)}
                  className={clsx(
                    "text-left p-3 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{proto.name.split(" (")[0]}</span>
                  <span className={clsx("text-[10px] px-2 py-0.5 rounded w-fit border", proto.badgeColor)}>
                    {proto.layer.split(" (")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Protocol Master Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{currentProtocol.name}</h3>
                <span className="text-[11px] text-slate-400 font-sans">OSI Scope: {currentProtocol.layer}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded text-xs font-bold border", currentProtocol.badgeColor)}>
                {currentProtocol.keyExchange}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-slate-400 font-sans">Data Secrecy:</div>
                <div className="text-cyan-300 font-bold">{currentProtocol.secrecy}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-slate-400 font-sans">Forward Secrecy (PFS):</div>
                <div className="text-emerald-300 font-bold">{currentProtocol.pfs}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-slate-400 font-sans">Identity Anonymity:</div>
                <div className="text-indigo-300 font-bold">{currentProtocol.identityPrivacy}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="text-slate-400 font-sans">Formal Verification:</div>
                <div className="text-emerald-400 font-bold">Verified ✔</div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-sans">
              <strong className="text-white">Formal Method Achievement:</strong> {currentProtocol.formalProof}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & PROVERIF CLI AUDITING LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; ProVerif Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world formal verification deployments in West Bengal and inspect live ProVerif execution traces
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
                  <span>🚨</span> High-Assurance Challenge:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> Formal Verification Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux ProVerif Command Mockup */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-soc: ~ (Running ProVerif Theorem Prover)</span>
                <span className="text-cyan-400">proverif banking_gateway.pv</span>
              </div>
              <div className="p-4 space-y-1 text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-emerald-400 font-bold">$ proverif -in pi banking_gateway.pv</span></div>
                <div>-- Clause generation: 0.012s</div>
                <div>-- Resolution algorithm running across 42 Horn clauses...</div>
                <div>Query not attacker(session_secret[]): <span className="text-emerald-300 font-bold">RESULT true (Secrecy holds)</span></div>
                <div>Query inj-event(endTreasury(x)) ==&gt; inj-event(beginClient(x)): <span className="text-emerald-300 font-bold">RESULT true (Mutual Injective Agreement holds)</span></div>
                <div>Mathematical verification complete. Zero counterexamples found. Certificate generated ✔</div>
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
                <span><strong>Relying Solely on Pen-and-Paper Proofs:</strong> Complex message interleavings and state machine race conditions can bypass human inspection. Always use automated formal tools.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Ignoring Lowe's Identity Binding Rule:</strong> Failing to bind the responder's identity explicitly in authentication messages allows Man-in-the-Middle identity spoofing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Confusing Aliveness with Injective Agreement:</strong> Proving that a partner was "alive" does not prove that they agreed on session keys or that the session wasn't a replayed duplicate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Ignoring 0-RTT Anti-Replay Limits:</strong> 0-RTT early data in TLS 1.3 does not possess forward secrecy or replay protection unless bounded by strict server ticket single-use caches.</span>
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
                <span><strong>Model Under Dolev-Yao Threat Conditions:</strong> Always assume the adversary has total control over all network channels and packet routing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Integrate Formal Verification into CI/CD:</strong> Run ProVerif and Tamarin regression checks automatically on every cryptographic commit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Enforce Ephemeral Diffie-Hellman (PFS):</strong> Delete ephemeral keys immediately after session key derivation to guarantee Perfect Forward Secrecy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Enforce Strict Cryptographic Domain Separation:</strong> Use HKDF key schedules with unique context labels to prevent cross-phase key collisions.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST SECTION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Capstone Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why was TLS 1.3 such a massive breakthrough compared to TLS 1.2? Because TLS 1.3 was mathematically proven in ProVerif and Tamarin BEFORE it was published!
                All legacy cipher negotiation, static RSA key exchange, and unverified CBC padding were formally purged from the specification!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Capstone Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Dolev-Yao model assumes full network control + black-box cryptography.</li>
                <li>Injective Agreement provides 1-to-1 mutual authentication without replay.</li>
                <li>PFS protects past sessions; PCS heals future sessions after a compromise.</li>
                <li>ProVerif uses Applied Pi-Calculus; Tamarin uses Multiset Rewriting.</li>
                <li>Full mastery of Module 005_004: SSL/TLS, IPsec, SSH-2, S/MIME, PGP, DNSSEC, and HSTS.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on Symbolic Protocol Verifier Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating Dolev-Yao adversary capabilities, Lowe's counterexample discovery, and TLS 1.3 invariant verification
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={formalProtocolVerifierPy}
            title="formal_protocol_verifier.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="End-to-End Cryptographic Protocol Verification FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="Congratulations on completing Module 005_004! For your BCA BCAC703 examination: Master the Dolev-Yao Threat Model assumptions (attacker controls the network, cryptography is a black-box). Understand the difference between Secrecy, Injective Agreement (replay immunity), and Perfect Forward Secrecy (PFS). Explain how formal tools like ProVerif (Applied Pi-Calculus) and Tamarin Prover discover attack traces (like Lowe's fix on Needham-Schroeder). Be prepared to compare the cryptographic guarantees of TLS 1.3, IPsec IKEv2, SSH-2, S/MIME, and DNSSEC across the full OSI stack!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 12: Cryptographic Protocol Verification Capstone Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 12 Note"
            downloadFileName="topic12_cryptographic_protocol_verification_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic12;
