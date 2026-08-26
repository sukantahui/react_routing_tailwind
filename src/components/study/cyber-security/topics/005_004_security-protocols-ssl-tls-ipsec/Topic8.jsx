import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import sshTunnelAuditorPy from "./topic8_files/ssh_tunnel_auditor.py?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgTunnelPipelineId = useId();
  const svgKeyComparatorId = useId();

  // =========================================================================
  // STUDIO 1 STATE: INTERACTIVE PORT FORWARDING & TUNNELING VISUALIZER
  // =========================================================================
  const [forwardingMode, setForwardingMode] = useState("local_forward"); // "local_forward", "remote_forward", "dynamic_socks", "proxy_jump"

  const forwardingModes = {
    local_forward: {
      title: "1. Local Port Forwarding (-L)",
      command: "ssh -L 5432:10.14.0.88:5432 susmita@bastion.barrackpore.gov.in",
      clientPort: "127.0.0.1:5432 (Listening on Client)",
      tunnelPath: "Client ──(Encrypted SSH on Port 22)──&gt; Bastion (198.51.100.10)",
      targetDestination: "10.14.0.88:5432 (Internal PostgreSQL DB)",
      useCase: "Accessing private backend databases and microservices directly from local admin tools",
      flowDirection: "Inbound Local ➔ Outbound Remote Target",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    remote_forward: {
      title: "2. Remote Port Forwarding (-R)",
      command: "ssh -R 8080:localhost:3000 debangshu@public-relay.kolkata.gov.in",
      clientPort: "localhost:3000 (Developer Local Web Server)",
      tunnelPath: "Remote Relay ──(Encrypted SSH on Port 22)──> Local Client Machine",
      targetDestination: "0.0.0.0:8080 (Listening on Remote Server)",
      useCase: "Exposing a local web server running behind NAT/firewall to external internet testers",
      flowDirection: "Inbound Remote Gateway ➔ Piped back to Local Port",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    dynamic_socks: {
      title: "3. Dynamic SOCKS5 Proxy (-D)",
      command: "ssh -D 1080 mamata@bastion.kolkata.gov.in",
      clientPort: "127.0.0.1:1080 (Local SOCKS5 Proxy)",
      tunnelPath: "Browser ──(SOCKS5 on 1080)──> SSH Client ──(Encrypted Tunnel)──> Remote Server",
      targetDestination: "Arbitrary Internal Intranet URLs (*.internal.kolkata.gov.in)",
      useCase: "Browsing entire internal intranets securely without mapping static individual ports",
      flowDirection: "Dynamic Multi-Host Application Routing",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    proxy_jump: {
      title: "4. ProxyJump Bastion (-J)",
      command: "ssh -J susmita@bastion.barrackpore.gov.in debangshu@10.14.0.88",
      clientPort: "Local OpenSSH Client",
      tunnelPath: "Client ──(TCP Pipe through Bastion)──> End-to-End Encrypted to 10.14.0.88",
      targetDestination: "10.14.0.88 (Target Backend SSH Server)",
      useCase: "Multi-hop secure access without exposing private keys or agent sockets to intermediate bastions",
      flowDirection: "End-to-End Encrypted Tunnel through Transparent Proxy",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
    }
  };

  const currentForwarding = forwardingModes[forwardingMode];

  // =========================================================================
  // STUDIO 2 STATE: ASYMMETRIC KEY ALGORITHMS & FINGERPRINT VALIDATOR
  // =========================================================================
  const [selectedKeyAlgo, setSelectedKeyAlgo] = useState("ed25519");

  const keyAlgorithms = {
    ed25519: {
      name: "Ed25519 (Twisted Edwards Curve25519)",
      standard: "RFC 8709",
      keySize: "256 bits (Equal to 3072-bit RSA)",
      speed: "⚡ Ultra-Fast (< 0.1 ms sign/verify)",
      securityGrade: "🌟 MAXIMUM (Gold Standard)",
      randomArt: `+--[ED25519 256]--+
|    ..o+..       |
|   . .o=..       |
|  . . o.o        |
| . o . . o       |
|  + S o + .      |
|   = * + =       |
|    E o * .      |
+----[SHA256]-----+`,
      fingerprint: "SHA256:88af1901b3c499e14a1f89bc99e188af1901b3c499e",
      recommendation: "MANDATORY FOR ALL MODERN INFRASTRUCTURE. Deterministic signatures immune to RNG failure.",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    rsa_4096: {
      name: "RSA (Rivest-Shamir-Adleman 4096-bit)",
      standard: "RFC 4253",
      keySize: "4096 bits",
      speed: "🐢 Moderate (2.5 ms sign / 0.2 ms verify)",
      securityGrade: "✔ HIGH (Acceptable Legacy)",
      randomArt: `+---[RSA 4096]----+
|       .o++o.    |
|      . +oo+..   |
|     . + =..o    |
|    . * + o .    |
|     S + o .     |
|      + * .      |
|       = E       |
+----[SHA256]-----+`,
      fingerprint: "SHA256:4a1f89bc99e188af1901b3c488af19014a1f89bc99e",
      recommendation: "Acceptable for legacy system compatibility. Minimum acceptable RSA key size is 3072 bits.",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    ecdsa_256: {
      name: "ECDSA (NIST P-256 Curve)",
      standard: "RFC 5656",
      keySize: "256 bits",
      speed: "⚡ Fast (0.4 ms)",
      securityGrade: "⚠️ MODERATE (RNG Sensitive)",
      randomArt: `+---[ECDSA 256]---+
|    . .          |
|   . o o .       |
|  . + * o .      |
|   = B * S       |
|  o B + o        |
| . * . .         |
|  E o            |
+----[SHA256]-----+`,
      fingerprint: "SHA256:110a77889923bcfe4a1f89bc99e188af1901b3c499e",
      recommendation: "NOT RECOMMENDED. If the Random Number Generator produces a single biased bit, private key is leaked.",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    dsa_1024: {
      name: "DSA (Digital Signature Algorithm 1024-bit)",
      standard: "FIPS 186-2 (Legacy)",
      keySize: "1024 bits (Mathematically Broken)",
      speed: "⚠️ Slower",
      securityGrade: "❌ INSECURE & PROHIBITED",
      randomArt: `+---[DSA 1024]----+
|     [BROKEN]    |
|   X X X X X X   |
|  X DISCONTINUED X|
|   X X X X X X   |
|     [BROKEN]    |
+----[INSECURE]---+`,
      fingerprint: "SHA256:0000000000000000000000000000000000000000000",
      recommendation: "PROHIBITED BY OPENSSH. Permanently disabled due to SHA-1 collision and discrete logarithm factoring risks.",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    }
  };

  const currentKey = keyAlgorithms[selectedKeyAlgo];

  // =========================================================================
  // STUDIO 3 STATE: AUTOMATED SSHD_CONFIG HARDENING AUDITOR
  // =========================================================================
  const [permitRootLogin, setPermitRootLogin] = useState(false);
  const [passwordAuth, setPasswordAuth] = useState(false);
  const [maxAuthTries, setMaxAuthTries] = useState(3);
  const [x11Forwarding, setX11Forwarding] = useState(false);
  const [useAeadCiphersOnly, setUseAeadCiphersOnly] = useState(true);

  const hardeningScore = useMemo(() => {
    let score = 0;
    if (!permitRootLogin) score += 25;
    if (!passwordAuth) score += 30;
    if (maxAuthTries &le; 3) score += 15;
    if (!x11Forwarding) score += 10;
    if (useAeadCiphersOnly) score += 20;

    let grade = "F";
    let color = "bg-rose-950 text-rose-300 border-rose-700";
    if (score >= 95) {
      grade = "A+ (CIS Benchmark / NIST Compliant)";
      color = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else if (score &ge; 75) {
      grade = "B (Moderate Hardening)";
      color = "bg-cyan-950 text-cyan-300 border-cyan-700";
    } else if (score >= 50) {
      grade = "C (Weak Security)";
      color = "bg-amber-950 text-amber-300 border-amber-700";
    }

    return { score, grade, color };
  }, [permitRootLogin, passwordAuth, maxAuthTries, x11Forwarding, useAeadCiphersOnly]);

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_bastion");

  const regionalDrills = {
    barrackpore_bastion: {
      id: "barrackpore_bastion",
      title: "Barrackpore Municipal Hub: Hardened Bastion with ProxyJump",
      location: "Central administrative gateway securing 45 internal treasury & tax servers",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Internal servers were directly exposed with public IPs, suffering 15,000 automated password spraying attempts per hour from botnets.",
      solution:
        "Sukanta Hui removed all public IPs from internal servers, deployed a single hardened OpenSSH Bastion with ProxyJump (`ssh -J`), enforced Ed25519 keys, and set `PermitRootLogin no`.",
      outcome:
        "External attack surface reduced by 98%; botnet attempts dropped to zero on backend databases; full audit logging via `/var/log/auth.log`."
    },
    ichapur_sftp_disburser: {
      id: "ichapur_sftp_disburser",
      title: "Ichapur Defense Facility: Automated SFTP Chroot Batch Ingestion",
      location: "Automated daily pension disburser processing ₹85,00,000 across inter-agency banks",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Automated banking scripts had full interactive bash shell access, creating severe privilege escalation and lateral movement risks.",
      solution:
        "Enforced `Match Group sftpusers` with `ForceCommand internal-sftp`, `ChrootDirectory /var/sftp/%u`, `AllowTcpForwarding no`, and `X11Forwarding no`.",
      outcome:
        "Banking scripts locked strictly into isolated chroot jail; zero shell execution capability; 100% compliance under RBI/MoD audit guidelines."
    },
    kolkata_socks5_auditing: {
      id: "kolkata_socks5_auditing",
      title: "Kolkata FinTech Core: Dynamic SOCKS5 Intranet Auditing",
      location: "Encrypted remote browser tunneling for 150 financial auditors across Salt Lake Sector V",
      engineers: "Sukanta Hui (Lead Instructor) & Scholars",
      threatScenario:
        "Auditors connecting remotely needed access to 30 internal web portals without complex static port mapping or full VPN client installation.",
      solution:
        "Deployed Dynamic SOCKS5 Port Forwarding (`ssh -D 1080`) over TLS-hardened OpenSSH servers with FIDO2 hardware token verification.",
      outcome:
        "Single encrypted tunnel provided seamless browser access to all internal `*.kolkata.gov.in` subnets; zero multi-port firewall rule bloat."
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
            <span>🛡️ Module 005_004 • Topic 8</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Secure Shell (SSH-2): Architecture &amp; Port Forwarding
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master RFC 4251-4254 Secure Shell architecture: Local (-L), Remote (-R), and Dynamic SOCKS5 (-D) tunneling,
            ProxyJump (-J) bastion security, Ed25519 key verification, and production `sshd_config` hardening.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              SSH-2 Layered Architecture
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Port Forwarding (-L, -R, -D)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              ProxyJump vs Agent Forwarding
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Ed25519 vs RSA 4096
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Production SSHD Hardening
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
              💻
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The SSH-2 Three-Layer Protocol Architecture (RFC 4251)
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how Secure Shell multiplexes encrypted shells, SFTP subsystems, and TCP tunnels over a single secure transport
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In production server environments across <strong className="text-cyan-300">Barrackpore</strong>,{" "}
              <strong className="text-cyan-300">Kolkata</strong>, and <strong className="text-cyan-300">Ichapur</strong>,{" "}
              <strong className="text-white">Secure Shell (SSH-2)</strong> operates over TCP Port 22 as the industry standard for remote administration,
              file transfers, and encrypted application tunneling.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔒</span> 1. Transport Layer (RFC 4253)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Handles server host key verification, Diffie-Hellman key exchange, symmetric encryption (ChaCha20-Poly1305 / AES-256-GCM),
                  and Encrypt-then-MAC (EtM) packet integrity.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>👤</span> 2. User Auth Layer (RFC 4252)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Authenticates human users and automated daemons to the server using Ed25519 asymmetric keys, FIDO2 hardware tokens,
                  passwords, or central SSH Certificate Authorities (CAs).
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🔀</span> 3. Connection Layer (RFC 4254)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Multiplexes multiple independent channels over the single encrypted connection: interactive PTY shells, SFTP subsystems,
                  and Local / Remote / Dynamic SOCKS5 TCP tunnels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE PORT FORWARDING & TUNNELING VISUALIZER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🚇
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive Port Forwarding &amp; Tunneling Visualizer
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate Local (-L), Remote (-R), Dynamic SOCKS5 (-D), and ProxyJump (-J) socket forwarding mechanics
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              TCP Tunnel Engine
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(forwardingModes).map(([key, mode]) => {
              const isActive = forwardingMode === key;
              return (
                <button
                  key={key}
                  onClick={() => setForwardingMode(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1.5",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                &gt;
                  <span className="font-bold">{mode.title}</span>
                  <span className={clsx("text-[10px] px-2 py-0.5 rounded w-fit border", mode.badgeColor)}>
                    {mode.flowDirection.split(" ➔ ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tunnel Pipeline Visual Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <span className="text-slate-400 font-sans">OpenSSH Command:</span>
                <div className="text-cyan-300 font-bold text-sm sm:text-base pt-1">{currentForwarding.command}</div>
              </div>
              <span className={clsx("px-2.5 py-1 rounded text-xs font-bold border", currentForwarding.badgeColor)}>
                {currentForwarding.flowDirection}
              </span>
            </div>

            {/* 3-Stage Pipeline Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 font-sans flex items-center justify-between">
                  <span>1. Client Listening Socket</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Local Machine</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>Binding: <span className="text-cyan-300 font-bold">{currentForwarding.clientPort}</span></div>
                  <div>Status : <span className="text-emerald-400">LISTENING (ESTABLISHED)</span></div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 font-sans flex items-center justify-between">
                  <span>2. Encrypted Transport</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Port 22 SSH</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>Cipher : <span className="text-white">ChaCha20-Poly1305</span></div>
                  <div>Channel: <span className="text-indigo-300">{currentForwarding.tunnelPath}</span></div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 font-sans flex items-center justify-between">
                  <span>3. Target Endpoint</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Private Subnet</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>Target : <span className="text-emerald-300 font-bold">{currentForwarding.targetDestination}</span></div>
                  <div>Access : <span className="text-emerald-400">Direct TCP Pipe</span></div>
                </div>
              </div>
            </div>

            <div className="text-slate-300 text-[11px] font-sans leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <strong className="text-white">Operational Use Case:</strong> {currentForwarding.useCase}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: ASYMMETRIC KEY PAIRS & RANDOMART FINGERPRINT VALIDATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🔑
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Asymmetric Key Algorithms &amp; Visual Host Key Inspector
                </h2>
                <p className="text-sm text-slate-400">
                  Compare Ed25519 vs RSA vs ECDSA security and inspect Drunken Bishop ASCII art fingerprints
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              RFC 8709 Verified
            </span>
          </div>

          {/* Algorithm Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(keyAlgorithms).map(([key, algo]) => {
              const isActive = selectedKeyAlgo === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedKeyAlgo(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1.5",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                &gt;
                  <span className="font-bold">{algo.name.split(" (")[0]}</span>
                  <span className={clsx("text-[10px] px-2 py-0.5 rounded w-fit border", algo.badgeColor)}>
                    {algo.securityGrade.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Key Details & RandomArt Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Randomart Box */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold text-xs font-mono flex items-center justify-between">
                  <span>VisualHostKey (Drunken Bishop ASCII Art):</span>
                  <span className="text-[10px] text-slate-400">~/.ssh/known_hosts</span>
                </div>
                <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-emerald-300 font-mono text-xs leading-tight overflow-x-auto">
                  {currentKey.randomArt}
                </pre>
                <div className="text-[10px] text-slate-400 font-mono">
                  Fingerprint: <span className="text-cyan-300">{currentKey.fingerprint}</span>
                </div>
              </div>

              {/* Technical Attributes */}
              <div className="space-y-3 text-xs font-mono">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-slate-400">Key Size &amp; Mathematical Basis:</div>
                  <div className="text-white font-bold text-sm">{currentKey.keySize}</div>
                  <div className="text-slate-400 pt-1">Signature Generation Speed:</div>
                  <div className="text-cyan-300 font-bold">{currentKey.speed}</div>
                  <div className="text-slate-400 pt-1">Security Standard:</div>
                  <div className="text-emerald-400 font-bold">{currentKey.standard}</div>
                </div>

                <div className={clsx("p-3.5 rounded-xl border text-xs leading-relaxed font-sans", currentKey.badgeColor)}>
                  <strong>Recommendation:</strong> {currentKey.recommendation}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: AUTOMATED SSHD_CONFIG HARDENING & CIS BENCHMARK AUDITOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚙️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Automated `sshd_config` Hardening &amp; Compliance Sandbox
                </h2>
                <p className="text-sm text-slate-400">
                  Toggle server directives and observe real-time CIS Benchmark security scoring and generated configuration
                </p>
              </div>
            </div>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", hardeningScore.color)}>
              Score: {hardeningScore.score}/100 • {hardeningScore.grade}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {/* Interactive Toggle Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={!permitRootLogin}
                  onChange={(e) => setPermitRootLogin(!e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">Disable Root Login (PermitRootLogin no)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={!passwordAuth}
                  onChange={(e) => setPasswordAuth(!e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">Enforce Public Key Only (PasswordAuthentication no)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={maxAuthTries <= 3}
                  onChange={(e) => setMaxAuthTries(e.target.checked ? 3 : 6)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">Limit Max Auth Attempts (MaxAuthTries 3)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={!x11Forwarding}
                  onChange={(e) => setX11Forwarding(!e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">Disable X11 Forwarding (X11Forwarding no)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={useAeadCiphersOnly}
                  onChange={(e) => setUseAeadCiphersOnly(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">Enforce Modern AEAD Ciphers (ChaCha20-Poly1305 &amp; AES-256-GCM)</span>
              </label>
            </div>

            {/* Generated Production sshd_config Mockup */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>/etc/ssh/sshd_config (Generated Hardened Template)</span>
                <span className="text-cyan-400">sshd -t</span>
              </div>
              <pre className="p-4 text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
{`# OpenSSH Server Hardened Configuration - Production Standard
Port 22
PermitRootLogin ${permitRootLogin ? "yes" : "no"}
PasswordAuthentication ${passwordAuth ? "yes" : "no"}
PubkeyAuthentication yes
MaxAuthTries ${maxAuthTries}
X11Forwarding ${x11Forwarding ? "yes" : "no"}
AllowTcpForwarding yes
ClientAliveInterval 300
ClientAliveCountMax 2
${useAeadCiphersOnly ? `KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com` : "# Legacy ciphers enabled (Vulnerable)"}`}
              </pre>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & OPENSSH CLI AUDITING LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; OpenSSH Audit Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world bastion architectures and SFTP chroot lockdowns across West Bengal municipal systems
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
                &gt;
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
                  <span>🚨</span> Vulnerability &amp; Risk:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> Hardening Solution Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux SSH Terminal Diagnostic Mockup */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-bastion: ~ (Verbose SSH Diagnostic)</span>
                <span className="text-cyan-400">ssh -vvv susmita@10.14.0.88</span>
              </div>
              <div className="p-4 space-y-1 text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-emerald-400 font-bold">$ ssh -vvv -J bastion.barrackpore.gov.in debangshu@10.14.0.88</span></div>
                <div>debug1: Authenticating to bastion.barrackpore.gov.in:22 using "publickey"</div>
                <div>debug1: Offering public key: <span className="text-cyan-300">ED25519 SHA256:88af1901b3c4...</span></div>
                <div>debug1: Server accepts key ➔ Authentication succeeded (publickey).</div>
                <div>debug1: Setting up ProxyJump TCP tunnel to 10.14.0.88:22...</div>
                <div>debug1: kex: algorithm: <span className="text-emerald-300">curve25519-sha256</span></div>
                <div>debug1: kex: server-to-client cipher: <span className="text-emerald-300">chacha20-poly1305@openssh.com</span></div>
                <div>debug1: End-to-end encrypted session established to backend PostgreSQL database server.</div>
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
                <span><strong>Using Insecure Agent Forwarding (`ssh -A`):</strong> Exposes your local authentication socket to intermediate jump hosts. Compromised bastions can hijack your identity. Always use ProxyJump (`ssh -J`).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Overly Permissive File Permissions:</strong> Setting `777` on `~/.ssh` or `authorized_keys` causes OpenSSH `StrictModes` to reject all key logins immediately. Use `700` for `~/.ssh` and `600` for keys.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Leaving Password Authentication Enabled:</strong> Passwords are vulnerable to automated dictionary attacks. Disable passwords (`PasswordAuthentication no`) and mandate Ed25519 keys.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Deploying Deprecated DSA Keys:</strong> DSA 1024-bit keys are mathematically insecure and disabled in modern OpenSSH. Migrate all legacy keys to Ed25519.</span>
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
                <span><strong>Standardize on Ed25519 Keys:</strong> Fast, compact (256-bit), constant-time, and immune to side-channel and RNG failure attacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Lock Down SFTP Accounts with Chroot:</strong> Enforce `ForceCommand internal-sftp` and `ChrootDirectory /var/sftp/%u` with zero interactive shell access for automated pipelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Deploy Fail2ban for Automatic IP Banning:</strong> Automatically ban IP addresses exceeding 3 failed authentication attempts in the firewall.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Enable SSH Multiplexing (`ControlMaster`):</strong> Reuses existing connection sockets, cutting subsequent session setup times to under 20 milliseconds.</span>
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
                What is the difference between `-L` and `-R`? With `-L`, you open a port on your local laptop to access something on the server's network.
                With `-R`, you open a port on the remote server to let remote people access a website running on your laptop!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>SSH operates on TCP Port 22 over 3 layers (Transport, User Auth, Connection).</li>
                <li>Local Port Forwarding = `ssh -L local_port:target_host:target_port`.</li>
                <li>Remote Port Forwarding = `ssh -R remote_port:local_host:local_port`.</li>
                <li>Dynamic SOCKS5 Proxy = `ssh -D local_port`.</li>
                <li>ProxyJump (`ssh -J`) is strictly safer than Agent Forwarding (`ssh -A`).</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on SSH Protocol &amp; Hardening Auditor Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script demonstrating port forwarding mechanics, host key verification, and automated `sshd_config` auditing
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={sshTunnelAuditorPy}
            title="ssh_tunnel_auditor.py"
            highlightLines={[25, 45, 65, 85, 110]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Secure Shell (SSH-2) &amp; Port Forwarding FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: SSH-2 (RFC 4251) is a 3-layer application protocol over TCP Port 22. Be prepared to explain the exact syntax and mechanics of Local (-L), Remote (-R), and Dynamic SOCKS5 (-D) port forwarding. Remember that ProxyJump (ssh -J) replaces legacy Agent Forwarding (ssh -A) to prevent key socket hijacking on intermediate bastions. In sshd_config hardening, always mention disabling root login (PermitRootLogin no) and password authentication (PasswordAuthentication no) in favor of Ed25519 public keys!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 8: SSH Architecture &amp; Port Forwarding Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 8 Note"
            downloadFileName="topic8_ssh_and_port_forwarding_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
