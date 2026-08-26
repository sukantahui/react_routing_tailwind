import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Studio 1: TLS Protocol Selector State
  const [selectedTlsProtocolKey, setSelectedTlsProtocolKey] = useState("tls_1_3");

  // Studio 2: SSH Step State
  const [activeSshStepIndex, setActiveSshStepIndex] = useState(1);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_tls13_switch");

  // Studio 1: TLS 1.2 vs TLS 1.3 Comparison Data
  const tlsProtocols = {
    tls_1_2: {
      key: "tls_1_2",
      name: "Legacy TLS 1.2 (Static RSA Key Transport)",
      handshakeLatency: "2-RTT (Full Two Round Trips / ~150ms)",
      keyExchangeRole: "Static RSA Encryption (Client encrypts pre-master secret with Server RSA PubKey)",
      forwardSecrecy: "NO FORWARD SECRECY (Vulnerable to HNDL / Stolen Master Keys)",
      vulnerabilities: "Vulnerable to Bleichenbacher ROBOT attacks, POODLE, and session snooping.",
      regulatoryStatus: "DEPRECATED (Banned by RBI for Commercial Banking Switches)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      steps: [
        { label: "1. ClientHello", desc: "Client sends supported ciphers (TLS_RSA_WITH_AES_256_CBC_SHA)" },
        { label: "2. ServerHello + Cert", desc: "Server presents static RSA public key in X.509 certificate" },
        { label: "3. ClientKeyExchange", desc: "Client encrypts 48-byte Pre-Master Secret with Server RSA Public Key" },
        { label: "4. Finished (2-RTT)", desc: "Both parties derive AES session key and begin encrypted communications" }
      ]
    },
    tls_1_3: {
      key: "tls_1_3",
      name: "Modern TLS 1.3 (RFC 8446 - Ephemeral ECDHE + RSA-PSS)",
      handshakeLatency: "1-RTT (~50ms) / 0-RTT Connection Resumption",
      keyExchangeRole: "RSA is RESTRICTED STRICTLY to Digital Signatures (RSA-PSS with SHA-256)",
      forwardSecrecy: "100% PERFECT FORWARD SECRECY (PFS via Ephemeral X25519 / ECDHE)",
      vulnerabilities: "Zero RSA encryption vulnerabilities; all legacy cipher suites removed.",
      regulatoryStatus: "CURRENT ENTERPRISE GOLD STANDARD (RFC 8446 / NIST / RBI)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      steps: [
        { label: "1. ClientHello + KeyShare", desc: "Client sends supported ciphers + Ephemeral X25519 Key Share in 1st packet" },
        { label: "2. ServerHello + KeyShare", desc: "Server sends Ephemeral Key Share + derives AES session key immediately" },
        { label: "3. EncryptedExtensions + Cert", desc: "Server sends Certificate + RSA-PSS Signature authenticating key exchange" },
        { label: "4. Finished (1-RTT)", desc: "Handshake completed in a single round trip; encrypted data flows immediately!" }
      ]
    }
  };

  const activeTls = tlsProtocols[selectedTlsProtocolKey];

  // Studio 2: SSH Challenge-Response Steps Data
  const sshSteps = [
    {
      step: 1,
      title: "Step 1: Public Key Assertion",
      clientAction: "ssh -i ~/.ssh/id_rsa user@server.kolkata.in",
      serverAction: "Server checks /home/user/.ssh/authorized_keys",
      sampleData: "Public Key: ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC... (RSA-3072)",
      details:
        "The SSH client initiates a connection on TCP port 22 and presents its public key identifier to the server. The server verifies that the public key matches an authorized entry in `authorized_keys`.",
      stateVars: { "Key Type": "RSA-3072 / Ed25519", "Public Key": "Asserted from ~/.ssh/id_rsa.pub", "Authorized Keys Check": "MATCH FOUND in authorized_keys", "Password Required": "NO (Passwordless Login)" }
    },
    {
      step: 2,
      title: "Step 2: Server Challenge Nonce Generation",
      clientAction: "Client waits for server cryptographic challenge",
      serverAction: "Server generates cryptographically random 256-bit Nonce R",
      sampleData: "Challenge Nonce R = 0x9B4E7A1C8F023D... + Session Identifier H",
      details:
        "To verify that the client genuinely possesses the private key without requiring the client to reveal it, the server generates a cryptographically random challenge nonce R bound to the TLS/SSH session ID.",
      stateVars: { "Challenge Nonce R": "256 bits CSPRNG", "Session Binding": "Tied to Diffie-Hellman Session ID", "Anti-Replay": "Unique per TCP connection", "Status": "Transmitted to Client" }
    },
    {
      step: 3,
      title: "Step 3: Client Cryptographic RSA Signing",
      clientAction: "Client signs challenge hash with private key d",
      serverAction: "Server awaits incoming signature packet",
      sampleData: "Signature S = RSA_Sign( Hash(R || H), id_rsa_privkey ) via rsa-sha2-256",
      details:
        "The client evaluates `rsa-sha2-256` (RFC 8332) over the challenge nonce and session hash using its local passphrase-protected private key (`~/.ssh/id_rsa`). The private key never leaves the client machine.",
      stateVars: { "Signature Algorithm": "rsa-sha2-256 (RFC 8332)", "Digest": "SHA-256 over (R || Session ID)", "Private Key Location": "Local Client Machine Only", "Signature Size": "384 Bytes (3072 bits)" }
    },
    {
      step: 4,
      title: "Step 4: Server Verification & Shell Grant",
      clientAction: "Client receives authenticated PTY shell prompt",
      serverAction: "Server verifies RSA_Verify(S, R, PubKey) == TRUE",
      sampleData: "Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-x86_64) - Access Granted!",
      details:
        "The server verifies the signature S using the public key stored in `authorized_keys`. Upon mathematical verification, the server spawns a secure pseudo-terminal (PTY) shell with zero password exposure.",
      stateVars: { "Verification Result": "RSA_Verify == TRUE (PASS)", "Authentication Type": "Public Key Challenge-Response", "Shell Access": "GRANTED (User: ubuntu)", "Security Status": "100% MITM Protected" }
    }
  ];

  const currentSshStep = sshSteps[activeSshStepIndex - 1];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_tls13_switch",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Payment Switch TLS 1.3 Migration",
      budget: "₹9,50,000",
      challenge: "Payment Nodes Running Static RSA Exposed to HNDL Threats",
      dilemma:
        "Payment switch nodes were supporting TLS 1.2 static RSA key exchange, exposing historical encrypted transaction traffic to Harvest Now, Decrypt Later threats.",
      resolution:
        "Mamata hardened 1,200 payment switch endpoints by enforcing TLS 1.3 with RSA-PSS and ECDHE, achieving 100% Perfect Forward Secrecy and full RBI compliance.",
      metrics: {
        switchesHardened: "1,200 Payment Gateways",
        forwardSecrecy: "100% Perfect Forward Secrecy",
        handshakeLatency: "0.85ms (1-RTT Connection)",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_ssh_hygiene",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Oncology PACS SSH Key Rotation",
      budget: "₹5,20,000",
      challenge: "Orphaned Legacy ssh-rsa Keys Lingering on Clinical Servers",
      dilemma:
        "45 clinical imaging servers contained orphaned legacy `ssh-rsa` (SHA-1) keys from former IT contractors, creating persistent backdoor risks.",
      resolution:
        "Mahima automated SSH key auditing and deployed short-lived certificate-based SSH access under Section 33 of the DPDP Act 2023, eliminating 100% of unauthorized backdoor risks.",
      metrics: {
        serversHardened: "45 DICOM PACS Hosts",
        orphanedKeysPurged: "100% Zero Legacy Footprint",
        dpdpLiabilityPrevented: "₹250 Crores Statutory Margin",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_bastion_host",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation Bastion Jump Host Hardening",
      budget: "₹8,80,000",
      challenge: "Protecting Substation Jump Hosts from Public Internet Scanners",
      dilemma:
        "Protecting substation SCADA jump hosts against unauthorized internet access and credential stuffing attacks on 220kV circuit breaker controls.",
      resolution:
        "Debangshu deployed hardware FIDO2/RSA crypto keys on SSH bastion hosts, securing 220kV circuit breaker controls with zero unauthorized grid tripping.",
      metrics: {
        jumpHostsHardened: "18 Substation Bastions",
        unauthorizedAccess: "0% Physical / Remote Breach",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_protocol_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "TLS & SSH Packet Analyzer Laboratory",
      budget: "₹4,00,000",
      challenge: "Visualizing 1-RTT TLS 1.3 Packets and SSH Challenge Nonces",
      dilemma:
        "Students struggled to visualize the 1-RTT TLS 1.3 handshake packet flow, RSA-PSS signature verification, and SSH challenge-response nonces.",
      resolution:
        "The team authored an interactive Python packet visualizer demonstrating TLS 1.2 vs TLS 1.3 key exchanges and SSH challenge-response signatures, training 140+ students.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        analyzersAuthored: "TLS 1.3 + SSH Packet Simulator",
        pfsConceptsProved: "100% Forward Secrecy Mastery",
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
            Cyber Security Module 002_005 • Topic 11 of 12 (Module Capstone)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Practical Implementations of RSA in SSL/TLS and SSH
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct production implementations of RSA in modern network protocols: analyze why TLS 1.3 strictly restricts RSA to RSA-PSS digital signatures, 
            explore 1-RTT and 0-RTT handshakes with Perfect Forward Secrecy (PFS), and master SSH public key challenge-response authentication.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive TLS 1.2 vs TLS 1.3 Handshake Protocol Visualizer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔒</span> Studio 1: TLS 1.2 vs TLS 1.3 Handshake Protocol Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select between Legacy TLS 1.2 (Static RSA Key Transport) and Modern TLS 1.3 (Ephemeral ECDHE + RSA-PSS) to inspect packet flows, latency, and Perfect Forward Secrecy.
            </p>
          </div>

          {/* Protocol Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(tlsProtocols).map((proto) => {
              const isSelected = selectedTlsProtocolKey === proto.key;
              return (
                <button
                  key={proto.key}
                  onClick={() => setSelectedTlsProtocolKey(proto.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{proto.name.split(" (")[0]}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{proto.handshakeLatency} • {proto.forwardSecrecy.split(" ")[0]} Forward Secrecy</div>
                </button>
              );
            })}
          </div>

          {/* Active Protocol Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeTls.badgeClass)}>
                  {activeTls.regulatoryStatus}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeTls.name}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Handshake Latency</span>
                <span className="text-base font-extrabold text-emerald-400">{activeTls.handshakeLatency}</span>
              </div>
            </div>

            {/* Handshake 4-Packet Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              {activeTls.steps.map((st, idx) => (
                <div key={idx} className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold block font-sans">{st.label}</span>
                  <p className="text-gray-300 text-[11px] font-sans leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            {/* Role & Forward Secrecy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">RSA Cryptographic Role:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed">{activeTls.keyExchangeRole}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5 font-mono">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Perfect Forward Secrecy (PFS):</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeTls.forwardSecrecy}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SSH Public Key Challenge-Response Authentication Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💻</span> Studio 2: SSH Public Key Challenge-Response Authentication Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 4 stages of passwordless SSH authentication (`ssh user@server`): public key assertion, challenge nonce generation, private key signing, and cryptographic verification.
            </p>
          </div>

          {/* SSH Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {sshSteps.map((st) => {
              const isSelected = activeSshStepIndex === st.step;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveSshStepIndex(st.step)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">Stage {st.step}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{st.title.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active SSH Step Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-950 text-emerald-300 border-emerald-800">
                SSH Protocol Stage: {currentSshStep.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                {currentSshStep.clientAction}
              </h3>
            </div>

            {/* Sample Data & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Cryptographic Payload:</span>
                <p className="text-emerald-400 text-xs sm:text-sm font-bold leading-relaxed">{currentSshStep.sampleData}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Protocol Execution Details:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{currentSshStep.details}</p>
              </div>
            </div>

            {/* State Variables Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Active SSH Session Parameters
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {Object.entries(currentSshStep.stateVars).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block truncate">{val}</span>
                  </div>
                ))}
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
              Visualizing TLS 1.2 Static RSA Key Transport vs TLS 1.3 Ephemeral ECDHE + RSA-PSS and SSH Challenge-Response Authentication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: TLS 1.2 vs TLS 1.3 Handshake */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: TLS 1.2 (Static RSA) vs TLS 1.3 (ECDHE + RSA-PSS)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: TLS 1.2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="130" y="47" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="9.5">TLS 1.2 (STATIC RSA)</text>
                    <text x="40" y="75" fill="#cbd5e1" font-family="monospace" fontSize="8">• 2-RTT Handshake (~150ms)</text>
                    <text x="40" y="100" fill="#fca5a5" font-family="monospace" fontSize="8">• Client encrypts PMS with</text>
                    <text x="50" y="120" fill="#fca5a5" font-family="monospace" fontSize="7.5">  Server RSA Public Key</text>
                    <text x="40" y="150" fill="#f87171" font-family="monospace" fontWeight="bold" fontSize="8">• NO FORWARD SECRECY!</text>
                    <text x="40" y="175" fill="#cbd5e1" font-family="monospace" fontSize="8">• ROBOT Oracle Exposure</text>
                    <text x="130" y="235" fill="#ef4444" textAnchor="middle" fontSize="8">DEPRECATED &amp; BANNED</text>
                  </g>

                  {/* Right: TLS 1.3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">TLS 1.3 (RFC 8446)</text>
                    <text x="280" y="75" fill="#cbd5e1" font-family="monospace" fontSize="8">• 1-RTT Handshake (~50ms)</text>
                    <text x="280" y="100" fill="#6ee7b7" font-family="monospace" fontSize="8">• Ephemeral Key Exchange:</text>
                    <text x="290" y="120" fill="#6ee7b7" font-family="monospace" fontSize="7.5">  X25519 / ECDHE</text>
                    <text x="280" y="150" fill="#34d399" font-family="monospace" fontWeight="bold" fontSize="8">• 100% PERFECT FORWARD SECRECY</text>
                    <text x="280" y="175" fill="#cbd5e1" font-family="monospace" fontSize="8">• RSA-PSS Signatures Only</text>
                    <text x="370" y="235" fill="#10b981" textAnchor="middle" fontSize="8">CURRENT GOLD STANDARD</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    TLS 1.3 eliminates static RSA encryption in favor of ephemeral ECDHE key agreement.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.1: Comparison between TLS 1.2 static RSA and TLS 1.3 ephemeral ECDHE + RSA-PSS.
              </p>
            </div>

            {/* Diagram 2: SSH Challenge-Response Authentication */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: SSH Public Key Challenge-Response Flow
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Client & Server Columns */}
                  <rect x="30" y="20" width="130" height="35" rx="4" fill="#083344" stroke="#06b6d4" />
                  <text x="95" y="42" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">SSH CLIENT</text>

                  <rect x="340" y="20" width="130" height="35" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="405" y="42" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="9">SSH SERVER</text>

                  {/* Flow 1: Public Key Assertion */}
                  <line x1="95" y1="70" x2="405" y2="90" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan36)" />
                  <text x="250" y="75" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7.5">1. Assert Public Key (e, N)</text>

                  {/* Flow 2: Challenge Nonce */}
                  <line x1="405" y1="110" x2="95" y2="130" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold36)" />
                  <text x="250" y="115" fill="#fbbf24" font-family="monospace" textAnchor="middle" fontSize="7.5">2. Send Challenge Nonce R + Session ID</text>

                  {/* Flow 3: Client Signature */}
                  <line x1="95" y1="150" x2="405" y2="170" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple36)" />
                  <text x="250" y="155" fill="#c084fc" font-family="monospace" textAnchor="middle" fontSize="7.5">3. S = RSA_Sign(Hash(R), d) [rsa-sha2-256]</text>

                  {/* Flow 4: Access Granted */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="200" width="400" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="222" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      4. RSA_Verify(S, R, PubKey) == TRUE ➔ ACCESS GRANTED!
                    </text>
                    <text x="250" y="236" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Passwordless authenticated PTY shell established with zero credential leakage.
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowCyan36" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGold36" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowPurple36" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 11.2: Step-by-step SSH public key challenge-response authentication protocol.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Production Protocol Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads enforce TLS 1.3 across 1,200 payment switches, automate SSH key hygiene for PACS servers, harden 220kV substation jump hosts with hardware keys, and build packet analyzers across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Protocol Security Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Engineering Hardening
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
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
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
              Guidelines for network security engineers configuring TLS and SSH services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Protocol Design Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce TLS 1.3:</strong> Strictly ban static RSA key exchange in favor of ECDHE + RSA-PSS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Disable Legacy ssh-rsa (SHA-1):</strong> Upgrade OpenSSH to `rsa-sha2-256` or `ssh-ed25519`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy SSH Bastion Hosts:</strong> Never expose internal database SSH ports directly to the internet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Restrict 0-RTT Early Data:</strong> Enforce 0-RTT only on idempotent HTTP GET requests.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Protocol Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using TLS 1.2 Static RSA:</strong> Lacks forward secrecy; vulnerable to ROBOT oracle attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Orphaned authorized_keys:</strong> Forgotten public keys create permanent root backdoors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Enabling 0-RTT on POST APIs:</strong> Vulnerable to transaction replay fraud.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unprotected Private SSH Keys:</strong> Storing `id_rsa` without a strong passphrase on developer laptops.</span>
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
                  <span><strong>Enforce RBI TLS Baseline:</strong> Disable SSLv3, TLS 1.0, and TLS 1.1 under IT Act Section 43A.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Short-Lived SSH Certs:</strong> Automate 8-hour SSH certificates via HashiCorp Vault.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Hardware FIDO2 for Bastions:</strong> Hardware crypto keys prevent phishing of server credentials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act Section 33:</strong> Maintain strict SSH key audits to avoid ₹250 Cr fines.</span>
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
              Synthesize practical RSA implementations in TLS and SSH before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Protocol Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  The fundamental rule of modern RSA: RSA should NEVER be used for key exchange or direct data encryption. In modern protocols (TLS 1.3 and SSH-2), RSA is restricted strictly to digital signature authentication (RSA-PSS / `rsa-sha2-256`), while ephemeral Elliptic Curves (X25519) handle key agreement to guarantee Perfect Forward Secrecy.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why 0-RTT early data must be restricted: While 0-RTT allows returning clients to send HTTP requests in the first packet, an attacker can replay that packet across the network. Never enable 0-RTT for financial payment transfers or non-idempotent POST requests!
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your Linux server `/etc/ssh/sshd_config` configurations, enforce `PubkeyAcceptedAlgorithms +rsa-sha2-256,rsa-sha2-512,ssh-ed25519` and strictly disable password authentication to achieve military-grade SSH access security.
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
                <span>TLS 1.2 static RSA lacks Forward Secrecy (PFS); banned by RBI.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TLS 1.3 restricts RSA to RSA-PSS signatures with SHA-256.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TLS 1.3 uses ephemeral ECDHE/X25519 for 100% Perfect Forward Secrecy.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>0-RTT early data is fast but vulnerable to network replay attacks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>OpenSSH disabled legacy `ssh-rsa` (SHA-1); uses `rsa-sha2-256` and Ed25519.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SSH challenge-response signs a random nonce R without sending passwords.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Practical Implementations of RSA in SSL/TLS and SSH FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Protocol Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Practical Implementations of RSA in SSL/TLS and SSH (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 002_005 on the RSA Algorithm and Public Key Infrastructure! The practical deployment of RSA in real-world protocols illustrates a profound cryptographic truth: static RSA encryption is dead, but RSA digital signatures remain vibrant and essential. Always enforce TLS 1.3 with RSA-PSS and ephemeral ECDHE key agreement to guarantee Perfect Forward Secrecy, upgrade your SSH servers to `rsa-sha2-256` or Ed25519, and maintain strict cryptographic hygiene under the Indian Information Technology Act 2000 and the DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
