import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic6_files/multi_vpn_engine.py?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgTriadId = useId();
  const svgStealthScanId = useId();

  // Studio 1: Active Protocol Selection
  const [selectedProtocolKey, setSelectedProtocolKey] = useState("wireguard_noise");

  // Studio 2: Live Handshake & Stealth Simulator State
  const [selectedSimProto, setSelectedSimProto] = useState("wireguard"); // "wireguard", "openvpn_udp", "openvpn_tcp", "webvpn"
  const [isPortScanProbe, setIsPortScanProbe] = useState(false);

  // Studio 3: Performance & Sizing Calculations
  const [activeUsersCount, setActiveUsersCount] = useState(500); // 50 to 3000 users
  const [bandwidthPerUserMbps, setBandwidthPerUserMbps] = useState(8); // 2 to 50 Mbps
  const [deployedStackType, setDeployedStackType] = useState("wireguard"); // "wireguard", "openvpn"

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_telemedicine_vpn");

  // Comparison Database for Studio 1
  const vpnProtocols = {
    wireguard_noise: {
      key: "wireguard_noise",
      title: "1. WireGuard (In-Kernel Noise Protocol)",
      category: "Modern In-Kernel",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      execution: "Runs entirely inside the Linux/Windows kernel network stack (`wg0`). Zero userspace context switching.",
      codebase: "~4,000 Lines of Code (Extremely easy to audit & formally verify).",
      cryptography: "Fixed Modern Suite: Curve25519 (ECDH) + ChaCha20-Poly1305 (AEAD) + BLAKE2s + Noise IK.",
      handshake: "1-RTT (~25ms). Instant cryptographic connection with zero round-trip negotiation delay.",
      stealth: "Silent Listen: Completely invisible to unauthenticated port scans (0 bytes returned).",
      verdict: "The highest performing and most secure VPN protocol for managed enterprise endpoints."
    },
    openvpn_tls: {
      key: "openvpn_tls",
      title: "2. OpenVPN (Userspace TLS Tunnel)",
      category: "Legacy Userspace",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      execution: "Runs as a userspace application using virtual TUN/TAP network drivers. High context switching overhead.",
      codebase: "~100,000 Lines of Code (Dependent on large OpenSSL library).",
      cryptography: "Negotiable: Supports TLS 1.3 with AES-256-GCM, RSA/ECDSA X.509 PKI, and optional `tls-crypt`.",
      handshake: "3-RTT to 4-RTT (~180ms to ~350ms). Multi-step OpenSSL certificate exchange.",
      stealth: "Responds to initial handshakes unless obfuscated with `tls-crypt` / `port-share` on port 443.",
      verdict: "Best deployed as a TCP port 443 fallback for users trapped behind restrictive firewalls."
    },
    clientless_webvpn: {
      key: "clientless_webvpn",
      title: "3. Clientless Browser SSL-VPN (WebVPN)",
      category: "Application Reverse Proxy",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      execution: "Runs inside standard HTML5 web browsers without installing client software or virtual adapters.",
      codebase: "Web Application Gateway (Translates internal RDP, SSH, and HTTP via WebSockets).",
      cryptography: "Standard HTTPS / TLS 1.3 encryption between browser and gateway.",
      handshake: "Standard HTTPS web connection.",
      stealth: "Visible as a public HTTPS web portal on port 443.",
      verdict: "Ideal for third-party contractors and personal BYOD laptops requiring zero software installation."
    }
  };

  // Studio 2: Live Simulator Logic
  const liveSimResult = useMemo(() => {
    if (selectedSimProto === "wireguard") {
      if (isPortScanProbe) {
        return {
          protocolName: "WireGuard (Noise Protocol)",
          status: "SILENT_DROP",
          verdict: "🛡️ STEALTH MODE: Zero Bytes Returned! Port Scanner Sees Port CLOSED.",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          handshakeLatency: "0 ms (Packet dropped immediately)",
          cryptographicAction: "Curve25519 MAC Verification Failed ➔ Silent Discard",
          wireBytesReturned: "0 Bytes",
          explanation: "WireGuard dropped the unauthorized port scanner datagram silently without generating any ICMP port unreachable or reset packets. The attacker's scanner reports the port as closed or filtered!"
        };
      } else {
        return {
          protocolName: "WireGuard (In-Kernel Noise Protocol)",
          status: "ESTABLISHED",
          verdict: "✔ WIREGUARD ACTIVE: 1-RTT Handshake Complete in ~25ms!",
          badgeColor: "bg-sky-950 text-sky-300 border-sky-700",
          handshakeLatency: "1-RTT (~25ms)",
          cryptographicAction: "Noise_IK: Curve25519 + ChaCha20-Poly1305 + BLAKE2s",
          wireBytesReturned: "148 Bytes (Encrypted session active @ 4.2 Gbps)",
          explanation: "Authenticated client performed a single round-trip handshake. Derived ephemeral session keys and enabled line-rate in-kernel routing with zero context switching."
        };
      }
    } else if (selectedSimProto === "openvpn_tcp") {
      return {
        protocolName: "OpenVPN over TCP Port 443",
        status: isPortScanProbe ? "PORT_DETECTED" : "ESTABLISHED",
        verdict: isPortScanProbe
          ? "⚠️ PORT DETECTED: Server responded with TCP SYN-ACK on Port 443!"
          : "✔ OPENVPN TCP CONNECTED: Firewall Bypassed on Port 443!",
        badgeColor: isPortScanProbe
          ? "bg-amber-950 text-amber-300 border-amber-700"
          : "bg-emerald-950 text-emerald-300 border-emerald-700",
        handshakeLatency: "4-RTT (~350ms)",
        cryptographicAction: "OpenSSL TLS 1.3 Handshake + AES-256-GCM AEAD",
        wireBytesReturned: "1,240 Bytes (Full X.509 Certificate Chain Exchange)",
        explanation: isPortScanProbe
          ? "The server responded to the TCP port probe. Network scanners identify an open HTTPS/OpenVPN service."
          : "OpenVPN connected over TCP port 443, successfully traversing restrictive hotel/airport firewalls that block UDP."
      };
    } else if (selectedSimProto === "openvpn_udp") {
      return {
        protocolName: "OpenVPN over UDP Port 1194",
        status: isPortScanProbe ? "PORT_DETECTED" : "ESTABLISHED",
        verdict: isPortScanProbe
          ? "⚠️ PROBE RESPONDED: Server sent OpenVPN Handshake Error Packet."
          : "✔ OPENVPN UDP CONNECTED: Standard Userspace TUN Tunnel Active.",
        badgeColor: isPortScanProbe
          ? "bg-amber-950 text-amber-300 border-amber-700"
          : "bg-emerald-950 text-emerald-300 border-emerald-700",
        handshakeLatency: "3-RTT (~180ms)",
        cryptographicAction: "OpenSSL TLS 1.3 + AES-256-GCM + SHA-256 Data Channel",
        wireBytesReturned: "980 Bytes (TLS Handshake Packets)",
        explanation: "OpenVPN established tunnel on standard UDP port 1194 using userspace TUN adapter."
      };
    } else {
      // Clientless WebVPN
      return {
        protocolName: "Clientless Browser SSL-VPN (HTML5 WebVPN)",
        status: "PORTAL_ACTIVE",
        verdict: "✔ WEBVPN SESSION ACTIVE: Rendered via Browser HTML5 WebSockets!",
        badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
        handshakeLatency: "Standard HTTPS Handshake (~60ms)",
        cryptographicAction: "Browser Native TLS 1.3 (Zero Client Software Required)",
        wireBytesReturned: "DOM HTML5 / Canvas Stream",
        explanation: "Contractor accessed internal web applications and remote desktop directly inside a Google Chrome tab with zero local software footprint."
      };
    }
  }, [selectedSimProto, isPortScanProbe]);

  // Studio 3: Performance Calculations
  const calculatedStackMetrics = useMemo(() => {
    // Total aggregate throughput (Gbps)
    const aggregateThroughputGbps = ((activeUsersCount * bandwidthPerUserMbps) / 1000).toFixed(2);
    // Estimated Server CPU Utilization (%)
    const estimatedCpuLoadPercent = deployedStackType === "wireguard"
      ? (Number(aggregateThroughputGbps) * 4.5).toFixed(0) // In-kernel WireGuard
      : (Number(aggregateThroughputGbps) * 22.0).toFixed(0); // Userspace OpenVPN

    // 5-Year Enterprise Remote Access TCO (INR ₹ Lakhs)
    const serverHardwareLakhs = (Number(aggregateThroughputGbps) * 2.8 + 8.0).toFixed(2);
    const clientLicensingLakhs = deployedStackType === "wireguard"
      ? 0.0 // WireGuard is 100% Free & Open Source
      : ((activeUsersCount * 900 * 5) / 100000).toFixed(2);
    const fiveYearTcoLakhs = (Number(serverHardwareLakhs) + Number(clientLicensingLakhs) + 4.5).toFixed(2);

    return {
      aggregateThroughputGbps,
      estimatedCpuLoadPercent,
      fiveYearTcoLakhs
    };
  }, [activeUsersCount, bandwidthPerUserMbps, deployedStackType]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_telemedicine_vpn: {
      id: "barrackpore_telemedicine_vpn",
      title: "Barrackpore-to-Kolkata Municipal Hybrid Telemedicine Grid",
      location: "Barrackpore, Ichapur, and Shyamnagar Clinics to Salt Lake Central Hospital",
      architecture: "In-Kernel WireGuard (UDP 51820) + OpenVPN TCP/443 Fallback + Clientless WebVPN",
      threatScenario: "Monsoon cellular connection drops caused doctors' video calls to freeze, while airport Wi-Fi blocked UDP ports for roaming specialists.",
      solution: "Sukanta Hui, Mamata, and Mahima deployed WireGuard for 0ms cellular roaming, activated OpenVPN TCP/443 for blocked networks, and provided WebVPN for visiting surgeons.",
      outcome: "Zero diagnostic interruptions; 4.2 Gbps medical imaging throughput; 100% DPDP Act and CERT-In compliance."
    },
    saltlake_vendor_webvpn: {
      id: "saltlake_vendor_webvpn",
      title: "Salt Lake Sector V Financial Datacenter Contractor Isolation",
      location: "Sector V Core Hub connecting 80 Third-Party Audit Consultants",
      architecture: "Clientless Browser SSL-VPN (HTML5 WebSockets + Sandbox Iframe Isolation)",
      threatScenario: "Auditors using unmanaged personal laptops brought potential malware, risking lateral network movement if given full IP-level VPN access.",
      solution: "Abhronila, Susmita, and Debangshu restricted all contractors to clientless WebVPN portals with session recording and zero network-layer routing.",
      outcome: "Malware lateral movement mathematically prevented; 100% of audit sessions recorded and archived for 180 days."
    }
  };

  const currentProtocol = vpnProtocols[selectedProtocolKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 6</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            SSL/TLS VPNs, WireGuard &amp; Browser WebVPN
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master modern non-IPsec VPN architectures. Compare <strong className="text-sky-400">In-Kernel WireGuard (Noise Protocol)</strong> with <strong className="text-amber-400">Userspace OpenVPN (TLS 1.3)</strong> and <strong className="text-purple-400">Clientless Browser WebVPN</strong>, exploring stealth port-scan immunity, firewall bypass, and multi-gigabit line-rate throughput.
          </p>
        </header>

        {/* SECTION 1: PROTOCOL TRIAD & STEALTH SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Non-IPsec Architecture Triad &amp; WireGuard Stealth Scan Immunity
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 3 modern non-IPsec paradigms on the left and WireGuard's silent drop stealth mechanism on the right.
            </p>
          </div>

          {/* SVG 1: NON-IPSEC TRIAD & STEALTH SCAN */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                WireGuard (In-Kernel) ➔ OpenVPN (TLS 1.3) ➔ Browser WebVPN (Clientless)
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Modern Architecture &amp; Stealth Scan</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgTriadId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="WireGuard OpenVPN and WebVPN Architecture Diagram"
              >
                {/* LEFT: 3 MODERN NON-IPSEC PARADIGMS */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  MODERN NON-IPSEC VPN PARADIGMS
                </text>

                {/* 1. WIREGUARD */}
                <rect x="35" y="58" width="115" height="185" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="92" y="78" fill="#7dd3fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">1. WIREGUARD</text>
                <text x="92" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• In-Kernel (`wg0`)</text>
                <text x="92" y="115" fill="#ffffff" fontSize="6.5" textAnchor="middle">• ~4,000 LOC</text>
                <text x="92" y="132" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• Curve25519</text>
                <text x="92" y="150" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• ChaCha20-Poly</text>
                <text x="92" y="175" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">1-RTT Handshake</text>
                <text x="92" y="225" fill="#bae6fd" fontSize="6.5" textAnchor="middle">Line-Rate 4.2 Gbps</text>

                {/* 2. OPENVPN */}
                <rect x="157" y="58" width="115" height="185" rx="5" fill="#451a03" stroke="#d97706" />
                <text x="214" y="78" fill="#fde68a" fontSize="7.5" fontWeight="bold" textAnchor="middle">2. OPENVPN</text>
                <text x="214" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Userspace Daemon</text>
                <text x="214" y="115" fill="#ffffff" fontSize="6.5" textAnchor="middle">• TUN/TAP Driver</text>
                <text x="214" y="132" fill="#fed7aa" fontSize="6.5" textAnchor="middle">• ~100,000 LOC</text>
                <text x="214" y="150" fill="#fed7aa" fontSize="6.5" textAnchor="middle">• OpenSSL TLS 1.3</text>
                <text x="214" y="175" fill="#f59e0b" fontSize="7" fontWeight="bold" textAnchor="middle">TCP 443 Bypass</text>
                <text x="214" y="225" fill="#fde68a" fontSize="6.5" textAnchor="middle">Firewall Evasion</text>

                {/* 3. CLIENTLESS WEBVPN */}
                <rect x="280" y="58" width="115" height="185" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="337" y="78" fill="#c7d2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle">3. WEBVPN</text>
                <text x="337" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Clientless Web</text>
                <text x="337" y="115" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Browser DOM</text>
                <text x="337" y="132" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• HTML5 WebSocket</text>
                <text x="337" y="150" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• RDP / SSH Proxy</text>
                <text x="337" y="175" fill="#a855f7" fontSize="7" fontWeight="bold" textAnchor="middle">Zero Software</text>
                <text x="337" y="225" fill="#e0e7ff" fontSize="6.5" textAnchor="middle">Vendor / BYOD</text>

                {/* RIGHT: WIREGUARD STEALTH SCAN BEHAVIOR */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  WIREGUARD SILENT LISTEN: PORT-SCAN STEALTH
                </text>

                {/* ATTACKER SCANNER PROBE */}
                <rect x="455" y="58" width="175" height="185" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="542" y="78" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Nmap Port Scan Probe
                </text>
                <text x="542" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Probe to UDP 51820</text>
                <text x="542" y="114" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Random invalid keys</text>
                <text x="542" y="132" fill="#fca5a5" fontSize="6.5" textAnchor="middle">• MAC verification Fails</text>
                <text x="542" y="155" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  0 BYTES RETURNED
                </text>
                <text x="542" y="185" fill="#ffffff" fontSize="6.5" textAnchor="middle">Scanner reports:</text>
                <text x="542" y="205" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="middle">
                  "PORT CLOSED / FILTERED"
                </text>
                <text x="542" y="228" fill="#cbd5e1" fontSize="6" textAnchor="middle">
                  Zero Server Discovery
                </text>

                {/* VALID DOCTOR HANDSHAKE */}
                <rect x="640" y="58" width="175" height="185" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="727" y="78" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Valid Employee Device
                </text>
                <text x="727" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Known Public Key</text>
                <text x="727" y="114" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Valid Curve25519 MAC</text>
                <text x="727" y="132" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• 1-RTT Response Sent</text>
                <text x="727" y="155" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  TUNNEL ACTIVE IN 25ms
                </text>
                <text x="727" y="185" fill="#ffffff" fontSize="6.5" textAnchor="middle">Kernel routes packets:</text>
                <text x="727" y="205" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">
                  "LINE-RATE 4.2 Gbps"
                </text>
                <text x="727" y="228" fill="#cbd5e1" fontSize="6" textAnchor="middle">
                  100% Cryptographic Trust
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: PROTOCOL MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Modern Non-IPsec Architecture Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the engineering parameters of WireGuard (In-Kernel), OpenVPN (Userspace TLS), and Browser WebVPN (Reverse Proxy).
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentProtocol.badgeColor)}>
              {currentProtocol.category}
            </span>
          </div>

          {/* Protocol Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(vpnProtocols).map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedProtocolKey(p.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedProtocolKey === p.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Protocol Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentProtocol.title}</h3>
                <span className="text-gray-400">Category: {currentProtocol.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentProtocol.badgeColor)}>
                Active Profile
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Execution Architecture:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentProtocol.execution}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  📜 Cryptographic Engine &amp; Codebase:
                </span>
                <p className="text-gray-300 leading-relaxed font-mono text-xs">{currentProtocol.cryptography}</p>
                <div className="text-gray-400 text-[10px] pt-1">Codebase: {currentProtocol.codebase}</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-indigo-950/80 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  ⚡ Handshake &amp; Stealth Behavior:
                </span>
                <p className="text-indigo-200 text-xs">Latency: {currentProtocol.handshake}</p>
                <p className="text-gray-400 text-[10px] pt-1">{currentProtocol.stealth}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentProtocol.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE PROTOCOL & STEALTH SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Protocol Handshake &amp; Stealth Scanner Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Test 1-RTT Noise vs TLS handshakes and toggle port-scan probes to observe WireGuard's silent drop stealth behavior.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Stealth Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select VPN Protocol Stack:</label>
              <select
                value={selectedSimProto}
                onChange={(e) => setSelectedSimProto(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="wireguard">1. WireGuard (In-Kernel Noise Protocol @ UDP 51820)</option>
                <option value="openvpn_tcp">2. OpenVPN over TCP Port 443 (Firewall Bypass)</option>
                <option value="openvpn_udp">3. OpenVPN over UDP Port 1194 (Standard TLS)</option>
                <option value="webvpn">4. Clientless Browser WebVPN (HTML5 WebSockets)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Simulate Traffic Origin:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsPortScanProbe(false)}
                  className={clsx(
                    "p-2 rounded-lg text-xs font-semibold border transition-all",
                    !isPortScanProbe
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-md shadow-emerald-500/10"
                      : "bg-slate-950 text-gray-400 border-slate-800"
                  )}
                >
                  ✔ Valid Employee Device
                </button>
                <button
                  onClick={() => setIsPortScanProbe(true)}
                  className={clsx(
                    "p-2 rounded-lg text-xs font-semibold border transition-all",
                    isPortScanProbe
                      ? "bg-rose-950/80 text-rose-300 border-rose-800 shadow-md shadow-rose-500/10"
                      : "bg-slate-950 text-gray-400 border-slate-800"
                  )}
                >
                  🚨 Nmap Port-Scan Probe
                </button>
              </div>
            </div>
          </div>

          {/* Simulation Output Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Active Stack Evaluation:
                </span>
                <span className="text-white font-bold text-sm">{liveSimResult.protocolName}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                liveSimResult.badgeColor
              )}>
                {liveSimResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">Handshake Latency &amp; Traffic:</span>
                <div className="text-gray-300 text-xs">Latency: {liveSimResult.handshakeLatency}</div>
                <div className="text-gray-500 text-[10px]">Wire Bytes: {liveSimResult.wireBytesReturned}</div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold text-[11px] block">Cryptographic Action:</span>
                <div className="text-gray-300 text-xs">{liveSimResult.cryptographicAction}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                Engineering Assessment:
              </span>
              <p className="text-gray-300 leading-relaxed font-sans">{liveSimResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: MULTI-VPN ENGINE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Multi-Protocol VPN Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation benchmarking WireGuard 1-RTT Noise handshake, silent port-scan drops, OpenVPN TLS exchanges, and WebVPN reverse proxying.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              multi_vpn_engine.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="multi_vpn_engine.py"
            highlightLines={[25, 42, 58, 70]}
          />
        </section>

        {/* STUDIO 3: PERFORMANCE & SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Remote Access Throughput, CPU Load &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate total remote throughput (Gbps), server CPU load with WireGuard vs OpenVPN, and 5-year remote access TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Remote Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Active Users:</span>
                <span className="text-sky-400 font-bold">{activeUsersCount} Users</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={activeUsersCount}
                onChange={(e) => setActiveUsersCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Bandwidth per User:</span>
                <span className="text-purple-400 font-bold">{bandwidthPerUserMbps} Mbps</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                step="2"
                value={bandwidthPerUserMbps}
                onChange={(e) => setBandwidthPerUserMbps(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Gateway Architecture:</span>
                <span className="text-emerald-400 font-bold">{deployedStackType === "wireguard" ? "WireGuard (In-Kernel)" : "OpenVPN (Userspace)"}</span>
              </div>
              <button
                onClick={() => setDeployedStackType(deployedStackType === "wireguard" ? "openvpn" : "wireguard")}
                className={clsx(
                  "w-full p-2 rounded text-xs font-semibold border transition-all",
                  deployedStackType === "wireguard"
                    ? "bg-sky-950/80 text-sky-300 border-sky-800 shadow-md shadow-sky-500/10"
                    : "bg-amber-950/80 text-amber-300 border-amber-800 shadow-md shadow-amber-500/10"
                )}
              >
                {deployedStackType === "wireguard" ? "✔ WireGuard Kernel (High Speed)" : "⚠️ OpenVPN Userspace (Higher CPU)"}
              </button>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Gateway Throughput</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedStackMetrics.aggregateThroughputGbps} Gbps</div>
              <span className="text-[10px] text-gray-500 block">Aggregate remote worker traffic</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Estimated CPU Load</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedStackMetrics.estimatedCpuLoadPercent}% Core Load</div>
              <span className="text-[10px] text-gray-500 block">{deployedStackType === "wireguard" ? "Zero Context Switching Overhead" : "Userspace TUN Context Overhead"}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Remote TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedStackMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">{deployedStackType === "wireguard" ? "₹0 Client Licensing (Open Source)" : "Proprietary Client Licenses Included"}</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Stack: {currentDrill.architecture}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical Hybrid Deployment:</span>
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
                <span>OpenVPN runs in userspace with TUN/TAP adapters and supports TCP 443 firewall bypass.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>WireGuard runs in-kernel with ~4,000 lines of code and uses the Noise Protocol framework.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>WireGuard uses fixed modern cryptography: Curve25519, ChaCha20-Poly1305, BLAKE2s.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>WireGuard is completely silent to unauthenticated port scans, dropping invalid packets silently.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Browser-based SSL VPN provides clientless application access via HTML5 reverse proxies.</span>
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
            title="SSL/TLS VPNs &amp; WireGuard FAQs"
            subtitle="30 In-depth Practice Questions &amp; Protocol Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="SSL/TLS VPNs &amp; WireGuard (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 6 highlights the modern evolution of VPN tunneling! WireGuard represents the gold standard for managed devices—delivering 4+ Gbps in-kernel throughput, 1-RTT connection speeds, and stealth silent-drop behavior that renders VPN servers completely invisible to unauthenticated port scanners. Use OpenVPN over TCP port 443 as a resilient fallback for restrictive networks that block UDP, and deploy Clientless Browser WebVPN for external contractors to grant secure web and remote desktop access without installing software. In Topic 7, we will explore PPTP and L2TP: Legacy Protocols and Security Limitations!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic6;
