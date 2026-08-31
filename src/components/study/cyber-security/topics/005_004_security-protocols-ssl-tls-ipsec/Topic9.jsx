import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import emailCryptoAuditorPy from "./topic9_files/email_crypto_auditor.py?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgPipelineId = useId();
  const svgTrustModelId = useId();

  // =========================================================================
  // STUDIO 1 STATE: HYBRID ENCRYPTION & DIGITAL SIGNING PIPELINE
  // =========================================================================
  const [pipelineProtocol, setPipelineProtocol] = useState("smime"); // "smime", "openpgp"
  const [activePipelineStage, setActivePipelineStage] = useState(1); // 1 to 5

  const pipelineStages = [
    {
      stage: 1,
      title: "1. Digital Signing (Origin Auth & Integrity)",
      senderAction: "Susmita computes SHA-256 hash of message body and signs it using her Private Key.",
      recipientAction: "Prepares signature payload for non-repudiation.",
      cryptoMath: "Signature = Encrypt_PrivKey(SHA256(Message))",
      dataState: "Signed Plaintext Payload",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    {
      stage: 2,
      title: "2. Ephemeral Symmetric Key Generation",
      senderAction: "Client generates a cryptographically random 256-bit symmetric Session Key (AES-256-GCM).",
      recipientAction: "Key exists only in sender memory.",
      cryptoMath: "K_session = CSPRNG(256 bits)",
      dataState: "Random Session Key Created",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
    },
    {
      stage: 3,
      title: "3. Symmetric Body Encryption",
      senderAction: "Encrypts the entire message body + digital signature using the 256-bit Session Key.",
      recipientAction: "Payload is converted to opaque ciphertext.",
      cryptoMath: "Ciphertext = AES_256_GCM_Encrypt(K_session, Message + Signature)",
      dataState: "🔒 Opaque Encrypted Envelope",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    {
      stage: 4,
      title: "4. Asymmetric Key Encapsulation (Key Wrap)",
      senderAction: "Encrypts K_session using Debangshu's Public Key (X.509 Certificate or PGP Public Key).",
      recipientAction: "Wrapped key attached to MIME header.",
      cryptoMath: "Encrypted_Key = Encrypt_PubKey(K_session, Debangshu_PubKey)",
      dataState: "Encrypted Session Key Attached",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    {
      stage: 5,
      title: "5. Recipient Decryption & Verification",
      senderAction: "Message transmitted over SMTP wire.",
      recipientAction: "Debangshu decrypts K_session with his Private Key, decrypts body, and verifies signature with Susmita's Public Key.",
      cryptoMath: "Verify_Signature(Susmita_PubKey, Decrypted_Message, Signature) ➔ VALID ✔",
      dataState: "✔ 100% Verified Plaintext Delivered",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    }
  ];

  const currentStage = pipelineStages[activePipelineStage - 1];

  // =========================================================================
  // STUDIO 2 STATE: WEB OF TRUST (WOT) VS CENTRALIZED PKI
  // =========================================================================
  const [selectedTrustModel, setSelectedTrustModel] = useState("smime_pki"); // "smime_pki", "pgp_wot"

  // =========================================================================
  // STUDIO 3 STATE: EMAIL ANTI-SPOOFING SIMULATOR (SPF, DKIM & DMARC)
  // =========================================================================
  const [dmarcPolicySetting, setDmarcPolicySetting] = useState("reject"); // "none", "quarantine", "reject"
  const [testScenarioKey, setTestScenarioKey] = useState("legitimate_aligned");

  const antiSpoofingScenarios = {
    legitimate_aligned: {
      title: "1. Legitimate Municipal Email (Barrackpore Treasury)",
      mailFrom: "susmita@barrackpore.gov.in",
      clientIp: "203.0.113.10 (Authorized Gateway)",
      spfStatus: "PASS (IP 203.0.113.10 is in SPF record)",
      dkimStatus: "PASS (Valid RSA-2560 signature from barrackpore.gov.in)",
      alignment: "ALIGNED (Both SPF and DKIM domains match From:)",
      verdict: "DELIVER TO INBOX ✔",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      description: "Standard legitimate transaction email. Both SPF and DKIM pass with full domain alignment."
    },
    spoofed_ip_phishing: {
      title: "2. Spoofed CEO Phishing Email (Rogue Server)",
      mailFrom: "ceo@barrackpore.gov.in",
      clientIp: "198.51.100.99 (Rogue Attacker Server)",
      spfStatus: "FAIL (IP 198.51.100.99 is NOT in SPF record)",
      dkimStatus: "FAIL (No valid DKIM signature)",
      alignment: "UNALIGNED (Both SPF and DKIM failed)",
      verdict: dmarcPolicySetting === "reject" ? "REJECT & DROP ❌" : dmarcPolicySetting === "quarantine" ? "QUARANTINE / SPAM ⚠️" : "DELIVERED WITH WARNING ⚠️",
      badgeColor: dmarcPolicySetting === "reject" ? "bg-rose-950 text-rose-300 border-rose-700" : "bg-amber-950 text-amber-300 border-amber-700",
      description: "Attacker attempted to forge municipal leadership identity. DMARC policy dictates whether it is dropped or quarantined."
    },
    forwarded_mailing_list: {
      title: "3. Forwarded via Jadavpur Academic List (Mailing List Relay)",
      mailFrom: "mamata@barrackpore.gov.in",
      clientIp: "140.211.9.1 (Jadavpur List Server)",
      spfStatus: "FAIL (List IP not in barrackpore SPF)",
      dkimStatus: "PASS (Original DKIM signature intact)",
      alignment: "ALIGNED via DKIM (ARC Seal present)",
      verdict: "DELIVER TO INBOX ✔",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      description: "Email was forwarded. SPF failed due to IP rewrite, but DKIM signature survived, maintaining DMARC alignment."
    }
  };

  const currentScenario = antiSpoofingScenarios[testScenarioKey];

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_smime");

  const regionalDrills = {
    barrackpore_smime: {
      id: "barrackpore_smime",
      title: "Barrackpore Municipal Executive: Enterprise S/MIME Enforcement",
      location: "Securing financial authorization emails across 80 municipal department heads",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Attackers sent forged emails pretending to be the Municipal Executive Officer ordering urgent vendor wire transfers worth ₹75,00,000.",
      solution:
        "Enforced S/MIME with hardware YubiKey smartcards. Bank disbursement accounts reject all payment authorization emails lacking a valid cryptographic S/MIME signature.",
      outcome:
        "100% non-repudiation for municipal fund allocations; forged CEO emails completely neutralized."
    },
    ichapur_defense_pgp: {
      id: "ichapur_defense_pgp",
      title: "Ichapur Defense Facility: OpenPGP Procurement Keyring Architecture",
      location: "End-to-end encrypted tender bidding and CAD blueprint transmission",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Third-party defense contractors submitted proprietary radar schematics via standard email, risking espionage if intermediate mail relays were intercepted.",
      solution:
        "Implemented GnuPG with 4096-bit RSA keys and Web Key Directory (WKD). All tender documents are encrypted with the procurement committee's public key before transmission.",
      outcome:
        "100% end-to-end confidentiality; intermediate cloud email providers cannot view attached blueprint files."
    },
    kolkata_fintech_dmarc: {
      id: "kolkata_fintech_dmarc",
      title: "Salt Lake Sector V FinTech Core: DMARC `p=reject` Campaign",
      location: "High-volume banking and stock broking domain handling 250,000 transactional emails/day",
      engineers: "Sukanta Hui (Lead Instructor) & Scholars",
      threatScenario:
        "Phishing botnets sprayed 50,000 spoofed credential-harvesting emails per day using the `@kolkatafintech.gov.in` domain name.",
      solution:
        "Configured 2048-bit DKIM keys, strict SPF records, and enforced DMARC with `p=reject; pct=100` alongside BIMI verified logo certification.",
      outcome:
        "Over 99.9% of spoofed phishing emails blocked at recipient mail server gateways globally; zero domain abuse reports."
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
            <span>🛡️ Module 005_004 • Topic 9</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Secure Email Protocols: S/MIME and PGP/GPG
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master end-to-end email cryptography: S/MIME (RFC 8551) vs OpenPGP (RFC 4880), hybrid encryption pipelines,
            digital signing, and domain anti-spoofing architecture (SPF, DKIM, and DMARC).
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              S/MIME (X.509 PKI) vs OpenPGP (WoT)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Digital Signatures &amp; Hybrid Encryption
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              SPF • DKIM • DMARC Alignment
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              EFAIL &amp; Metadata Leakage
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              MIME Multipart Envelopes
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
              ✉️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. Hop-by-Hop Transport (STARTTLS) vs End-to-End Encryption
              </h2>
              <p className="text-sm text-slate-400">
                Understanding why store-and-forward SMTP architectures require application-layer payload encryption (S/MIME / PGP)
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In government and financial infrastructure across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, standard SMTP email transmission is inherently insecure. While{" "}
              <strong className="text-white">STARTTLS</strong> encrypts traffic between individual mail servers (hop-by-hop),
              messages are decrypted to cleartext in RAM and on disk at every intermediate relay.
              <strong className="text-white"> S/MIME (RFC 8551)</strong> and <strong className="text-white">OpenPGP (RFC 4880)</strong> solve this
              by providing true end-to-end payload cryptography.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔏</span> 1. Digital Signing (Integrity)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The sender signs the SHA-256 body hash using their Private Key, guaranteeing that the message originated from the claimed author
                  and was not tampered with.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>🔒</span> 2. Hybrid Encryption (Confidentiality)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generates an ephemeral 256-bit AES session key to encrypt the payload, and encapsulates the session key using the recipient's Public Key.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🛡️</span> 3. Anti-Spoofing (SPF/DKIM/DMARC)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Domain-level authentication verifying outbound server IP authorization (SPF), header digital signatures (DKIM),
                  and enforcing drop policies (DMARC `p=reject`).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE END-TO-END HYBRID CRYPTOGRAPHY PIPELINE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚙️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive Hybrid Signing &amp; Encryption Pipeline
                </h2>
                <p className="text-sm text-slate-400">
                  Step-by-step visual animation of asymmetric key encapsulation, AES session key generation, and digital signature verification
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPipelineProtocol(pipelineProtocol === "smime" ? "openpgp" : "smime")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950 border border-cyan-700 text-cyan-300 hover:bg-cyan-900 transition-colors"
              >
                Switch to {pipelineProtocol === "smime" ? "OpenPGP / GPG" : "S/MIME (X.509)"}
              </button>
            </div>
          </div>

          {/* 5-Stage Progression Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {pipelineStages.map((stg) => {
              const isActive = activePipelineStage === stg.stage;
              return (
                <button
                  key={stg.stage}
                  onClick={() => setActivePipelineStage(stg.stage)}
                  className={clsx(
                    "text-left p-2.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{stg.title.split(". ")[1].split(" (")[0]}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Stage #{stg.stage}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-5 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{currentStage.title}</h3>
                <span className="text-[11px] text-slate-400 font-sans">Protocol: {pipelineProtocol === "smime" ? "S/MIME v4.0 (RFC 8551)" : "OpenPGP (RFC 4880)"}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded text-xs font-bold border", currentStage.badgeColor)}>
                {currentStage.dataState}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 font-sans flex items-center justify-between">
                  <span>Sender Action (Susmita)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Client Engine</span>
                </div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{currentStage.senderAction}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 font-sans flex items-center justify-between">
                  <span>Recipient Action (Debangshu)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Verification</span>
                </div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{currentStage.recipientAction}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Cryptographic Formula:</div>
              <div className="text-cyan-300 font-bold overflow-x-auto text-[11px]">{currentStage.cryptoMath}</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: WEB OF TRUST (WOT) VS CENTRALIZED PKI TRUST MODELS */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🌐
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Trust Model Architecture (S/MIME PKI vs OpenPGP WoT)
                </h2>
                <p className="text-sm text-slate-400">
                  Compare centralized X.509 hierarchical Certificate Authorities against decentralized peer-to-peer Web of Trust signing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedTrustModel("smime_pki")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  selectedTrustModel === "smime_pki"
                    ? "bg-cyan-950 border-cyan-500 text-white shadow-md shadow-cyan-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                S/MIME Hierarchical PKI
              </button>
              <button
                onClick={() => setSelectedTrustModel("pgp_wot")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  selectedTrustModel === "pgp_wot"
                    ? "bg-emerald-950 border-emerald-500 text-white shadow-md shadow-emerald-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                OpenPGP Web of Trust (WoT)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {selectedTrustModel === "smime_pki" ? (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>Hierarchical Certificate Authority Chain:</strong> The client's certificate is cryptographically validated
                  up through an Intermediate CA to a pre-installed Trusted Root CA in the OS trust store.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-center">
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white">1. Root CA</div>
                    <div className="text-[10px] text-cyan-400">DigiCert / National PKI</div>
                    <div className="text-[9px] text-slate-500">Embedded in OS/Browser</div>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white">2. Intermediate CA</div>
                    <div className="text-[10px] text-indigo-400">West Bengal Municipal CA</div>
                    <div className="text-[9px] text-slate-500">Signs Enterprise Users</div>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white">3. Leaf Certificate</div>
                    <div className="text-[10px] text-emerald-400">susmita@barrackpore.gov.in</div>
                    <div className="text-[9px] text-slate-500">User S/MIME Cert (X.509)</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>Decentralized Web of Trust (WoT):</strong> No central authority exists. Users sign each other's keys
                  after in-person fingerprint verification, establishing transitive trust networks.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-center">
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white">Susmita's Key</div>
                    <div className="text-[10px] text-cyan-400">Owner Trust: FULL</div>
                    <div className="text-[9px] text-slate-500">Signs Mamata's Key</div>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white">Mamata's Key</div>
                    <div className="text-[10px] text-indigo-400">Trusted Introducer</div>
                    <div className="text-[9px] text-slate-500">Signs Debangshu's Key</div>
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white">Debangshu's Key</div>
                    <div className="text-[10px] text-emerald-400">Validity: FULL ✔</div>
                    <div className="text-[9px] text-slate-500">Valid via Transitive Trust</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: EMAIL ANTI-SPOOFING SIMULATOR (SPF, DKIM & DMARC) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🛡️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Email Anti-Spoofing Architecture (SPF, DKIM &amp; DMARC)
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate incoming SMTP evaluation against SPF authorization, DKIM cryptographic headers, and DMARC alignment policy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">DMARC Policy:</span>
              <select
                value={dmarcPolicySetting}
                onChange={(e) => setDmarcPolicySetting(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-cyan-300 font-mono text-xs focus:outline-none"
              >
                <option value="none">p=none (Monitor Only)</option>
                <option value="quarantine">p=quarantine (Spam Folder)</option>
                <option value="reject">p=reject (Drop at Gateway)</option>
              </select>
            </div>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(antiSpoofingScenarios).map(([key, item]) => {
              const isActive = testScenarioKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setTestScenarioKey(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1.5",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{item.title}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">{item.mailFrom}</span>
                </button>
              );
            })}
          </div>

          {/* Evaluation Results Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-400 font-sans">1. SPF Verification</div>
                <div className="text-slate-300 text-[11px]">Result: {currentScenario.spfStatus}</div>
                <div className="text-[10px] text-slate-500">Checks connecting IP against DNS TXT</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-indigo-400 font-sans">2. DKIM Verification</div>
                <div className="text-slate-300 text-[11px]">Result: {currentScenario.dkimStatus}</div>
                <div className="text-[10px] text-slate-500">Validates RSA/ECDSA header signature</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-400 font-sans">3. DMARC Alignment</div>
                <div className="text-slate-300 text-[11px]">Alignment: {currentScenario.alignment}</div>
                <div className="text-[10px] text-slate-500">Matches From: with SPF/DKIM domains</div>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", currentScenario.badgeColor)}>
              <div className="font-bold flex items-center gap-2">
                <span>⚡ Gateway Verdict:</span>
                <span>{currentScenario.verdict} (Policy: p={dmarcPolicySetting})</span>
              </div>
              <p className="opacity-90 font-sans text-[11px]">
                {currentScenario.description}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & GNUPG CLI AUDITING LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; GPG Terminal Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world email security deployments in West Bengal and inspect live GnuPG commands
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
                  <span>🚨</span> Vulnerability &amp; Phishing Vector:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> Email Cryptography Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux GnuPG Terminal Mockup */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-soc: ~ (GnuPG Encryption &amp; Signing)</span>
                <span className="text-cyan-400">gpg --sign --encrypt</span>
              </div>
              <div className="p-4 space-y-1 text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-emerald-400 font-bold">$ gpg --armor --sign --encrypt -r debangshu@defense.ichapur.gov.in tender_doc.pdf</span></div>
                <div>gpg: using "susmita@treasury.barrackpore.gov.in" as default secret key for signing</div>
                <div>gpg: checking the trustdb...</div>
                <div>gpg: marginal trust [1], full trust [2], expire: 2027-01-01</div>
                <div>gpg: 4096-bit RSA encrypted session key generated</div>
                <div>gpg: writing to <span className="text-cyan-300">tender_doc.pdf.asc</span> (100% End-to-End Encrypted)</div>
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
                <span><strong>Relying on STARTTLS Alone:</strong> STARTTLS is hop-by-hop. Intermediate mail servers decrypt messages into cleartext on disk and in memory. Always use S/MIME or PGP for confidential data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Subject Line Leakage:</strong> Standard S/MIME and PGP only encrypt the message body. The Subject line is sent in cleartext across the Internet unless Protected Headers extensions are used.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Deploying DMARC at `p=none` Indefinitely:</strong> `p=none` only monitors without blocking anything. Domain owners must transition to `p=quarantine` and finally `p=reject` to neutralize spoofing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Failing to Generate a Revocation Certificate:</strong> If an OpenPGP private key is lost or stolen without a pre-generated revocation certificate, the key can never be revoked on public keyservers.</span>
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
                <span><strong>Enforce DMARC `p=reject; pct=100`:</strong> Completely eliminates CEO fraud and domain spoofing across all major mail providers globally.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Separate Signing Keys from Encryption Keys:</strong> Signing keys require strict non-repudiation (never escrowed); encryption keys require enterprise escrow for business data recovery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Store Master PGP Keys Offline:</strong> Keep master certify keys in an offline vault and use disposable subkeys for daily email signing and decryption.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Publish BIMI Brand Indicators:</strong> Reward strict DMARC enforcement by displaying verified company logos in recipient inboxes to build user trust.</span>
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
                Why does hybrid encryption exist? Why not encrypt the whole 50 MB PDF attachment directly with RSA?
                Because asymmetric RSA math is 1,000x slower than symmetric AES! We use fast AES to encrypt the large payload,
                and asymmetric RSA/ECC only to encrypt the tiny 256-bit AES session key!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>S/MIME uses centralized X.509 PKI; OpenPGP uses decentralized Web of Trust.</li>
                <li>Sign with SENDER's private key; Encrypt with RECEIVER's public key.</li>
                <li>SPF checks server IPs; DKIM checks cryptographic header signatures.</li>
                <li>DMARC aligns From: domain and enforces `p=reject` policy actions.</li>
                <li>Email subject lines are NOT encrypted by default in standard S/MIME or PGP.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on Email Crypto &amp; DMARC Auditor Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script demonstrating hybrid asymmetric key wrapping, MIME multipart creation, and DMARC alignment validation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={emailCryptoAuditorPy}
            title="email_crypto_auditor.py"
            highlightLines={[25, 45, 65, 85, 110]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Secure Email Protocols (S/MIME, PGP, SPF, DKIM &amp; DMARC) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Be crystal clear on the dual-step hybrid encryption process: explain why we sign with the SENDER'S private key (for non-repudiation and origin proof) and encrypt the symmetric session key with the RECIPIENT'S public key (for confidentiality). Distinguish between S/MIME's hierarchical X.509 CA trust model and PGP's peer-to-peer Web of Trust. Always remember that SPF, DKIM, and DMARC prevent spoofing at the domain level, while S/MIME and PGP secure the email content end-to-end!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 9: Secure Email Protocols Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 9 Note"
            downloadFileName="topic9_secure_email_protocols_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
