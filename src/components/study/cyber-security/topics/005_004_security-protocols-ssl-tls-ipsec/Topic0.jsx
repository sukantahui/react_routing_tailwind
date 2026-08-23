import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import osiSecurityAuditorPy from "./topic0_files/osi_security_auditor.py?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgOsiStackId = useId();
  const svgEncapsulationId = useId();

  // Studio 1: Active OSI Layer State
  const [selectedLayerKey, setSelectedLayerKey] = useState("layer_7_app"); // "layer_7_app", "layer_4_transport", "layer_3_network", "layer_2_datalink", "layer_1_physical"

  // Studio 2: Multi-Layer Defense-in-Depth Threat Simulator State
  const [threatScenarioKey, setThreatScenarioKey] = useState("isp_mitm"); // "public_wifi_sniff", "isp_mitm", "dns_poisoning", "fiber_tap", "sql_tamper"
  const [enableLayer2Macsec, setEnableLayer2Macsec] = useState(true);
  const [enableLayer3Ipsec, setEnableLayer3Ipsec] = useState(true);
  const [enableLayer7Https, setEnableLayer7Https] = useState(true);

  // Studio 3: Cumulative Overhead & Performance Calculator State
  const [networkLinkSpeedGbps, setNetworkLinkSpeedGbps] = useState(1.0); // 0.1 to 10 Gbps
  const [averagePayloadBytes, setAveragePayloadBytes] = useState(1200); // 100 to 1460 bytes

  // Studio 4: Regional SOC Case Studies State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_treasury_multitier");

  // OSI Layer Database for Studio 1
  const osiLayerSpecs = {
    layer_7_app: {
      key: "layer_7_app",
      title: "Layer 7: Application Layer Security",
      badge: "End-to-End User Data",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      primaryProtocols: "HTTPS (TLS 1.3), SSH v2, S/MIME, PGP/GPG, DNSSEC, SFTP",
      cryptoAlgorithms: "AES-256-GCM, ChaCha20-Poly1305, RSA-4096, ECDSA P-384, Ed25519",
      headerTax: "29 to 100+ Bytes (Application-specific framing)",
      transparency: "Application-Aware (Understands URLs, Cookies, API Payloads, SQL queries)",
      scope: "End-to-End from User Browser / Client App directly to Destination Server Logic",
      verdict: "Essential for granular user authentication and transaction non-repudiation."
    },
    layer_4_transport: {
      key: "layer_4_transport",
      title: "Layer 4: Transport Layer Security",
      badge: "Process-to-Process Sockets",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      primaryProtocols: "TLS 1.2 / TLS 1.3 (TCP), DTLS 1.3 (UDP / WebRTC), SSH Transport",
      cryptoAlgorithms: "ECDHE Key Exchange (Curve25519), AES-GCM AEAD, Poly1305",
      headerTax: "21 Bytes (TLS Record Header + Auth Tag)",
      transparency: "Socket-Bound (Secures TCP/UDP port streams between client and server processes)",
      scope: "Process-to-Process encrypted pipe across intermediate networks",
      verdict: "The universally deployed standard for securing TCP and real-time UDP streams."
    },
    layer_3_network: {
      key: "layer_3_network",
      title: "Layer 3: Network Layer Security",
      badge: "Transparent Host-to-Host",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
      primaryProtocols: "IPsec ESP (Tunnel/Transport), IPsec AH, IKEv2, WireGuard Noise IK",
      cryptoAlgorithms: "AES-256-GCM, ChaCha20-Poly1305, HMAC-SHA-256 (AH), Curve25519",
      headerTax: "56 to 76 Bytes (Outer IP + ESP + IV + ICV + Padding)",
      transparency: "100% Transparent (Encrypts all TCP, UDP, ICMP traffic in the kernel)",
      scope: "Host-to-Host, Gateway-to-Gateway, and Client-to-Gateway Site-to-Site VPNs",
      verdict: "Protects all applications automatically without modifying application code."
    },
    layer_2_datalink: {
      key: "layer_2_datalink",
      title: "Layer 2: Data Link Layer Security",
      badge: "Hop-by-Hop Link Encryption",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      primaryProtocols: "IEEE 802.1AE (MACsec), IEEE 802.1X (EAP-TLS), WPA3-Enterprise",
      cryptoAlgorithms: "AES-128/256-GCM (SecTAG), EAP-TLS Certificates, 128-bit ICV",
      headerTax: "32 Bytes (SecTAG + ICV Tag)",
      transparency: "100% Transparent (Operates inside switch ASICs at line rate)",
      scope: "Hop-by-Hop Physical Link (Switch-to-Switch, Host-to-Switch, Campus Wi-Fi)",
      verdict: "Protects local Ethernet switches and campus fiber links against wiretapping."
    },
    layer_1_physical: {
      key: "layer_1_physical",
      title: "Layer 1: Physical Layer Security",
      badge: "Bulk Bitstream Line Rate",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      primaryProtocols: "Optical OTN Bulk Wire Encryption (DWDM), Quantum Key Distribution (QKD BB84)",
      cryptoAlgorithms: "Hardware AES-256 OTN, Quantum Polarization Photons",
      headerTax: "0 Bytes (Direct Bitstream Encryption inside Optical Transceivers)",
      transparency: "100% Hardware Bitstream (Completely invisible to all upper layers)",
      scope: "Submarine fiber cables and inter-datacenter high-capacity optical fiber links",
      verdict: "Zero-latency physical protection against fiber laser splitting and espionage."
    }
  };

  // Studio 2: Live Threat Defense-in-Depth Computation
  const threatDefenseResult = useMemo(() => {
    let isMitigated = false;
    let stoppingLayer = "NONE (BREACHED)";
    let badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    let explanation = "";
    let technicalTrace = "";

    if (threatScenarioKey === "public_wifi_sniff") {
      if (enableLayer7Https || enableLayer3Ipsec || enableLayer2Macsec) {
        isMitigated = true;
        stoppingLayer = enableLayer7Https ? "Layer 7 (HTTPS TLS 1.3)" : enableLayer3Ipsec ? "Layer 3 (IPsec ESP)" : "Layer 2 (WPA3/MACsec)";
        badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
        explanation = "Adversary captures 802.11 Wi-Fi frames, but payload is fully encrypted by " + stoppingLayer + ". Wireshark shows 100% ciphertext.";
        technicalTrace = "Wi-Fi Sniffer captures frame ➔ Inspects TCP payload ➔ Encrypted via AES-256-GCM ➔ ZERO credentials exposed!";
      } else {
        explanation = "All three layers disabled! Adversary captures HTTP GET /login credentials in cleartext over public Wi-Fi!";
        technicalTrace = "Wi-Fi Sniffer captures frame ➔ Inspects TCP payload ➔ Plaintext HTTP cookie 'session_id=88af' STOLEN!";
      }
    } else if (threatScenarioKey === "isp_mitm") {
      if (enableLayer7Https || enableLayer3Ipsec) {
        isMitigated = true;
        stoppingLayer = enableLayer7Https ? "Layer 7 (HTTPS TLS 1.3)" : "Layer 3 (IPsec ESP)";
        badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
        explanation = "Compromised transit router attempts packet modification, but " + stoppingLayer + " AEAD integrity check (Poly1305/ICV) drops tampered packets.";
        technicalTrace = "Rogue ISP Router modifies payload ➔ Destination receives packet ➔ AEAD Tag Mismatch ➔ PACKET DROPPED!";
      } else {
        explanation = "Layer 2 MACsec terminates at the local switch! ISP router sees raw plaintext and injects malicious redirect scripts!";
        technicalTrace = "Rogue ISP Router intercepts unencrypted packet ➔ Injects malicious JavaScript ➔ Client browser infected!";
      }
    } else if (threatScenarioKey === "fiber_tap") {
      if (enableLayer2Macsec || enableLayer3Ipsec || enableLayer7Https) {
        isMitigated = true;
        stoppingLayer = enableLayer2Macsec ? "Layer 2 (MACsec 802.1AE)" : enableLayer3Ipsec ? "Layer 3 (IPsec ESP)" : "Layer 7 (HTTPS)";
        badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
        explanation = "Physical laser tap on optical fiber cable captures raw Ethernet frames, but " + stoppingLayer + " renders bitstream 100% unreadable.";
        technicalTrace = "Optical Splitter captures fiber photons ➔ Raw SecTAG frame extracted ➔ AES-256-GCM ciphertext ➔ Zero data leaked!";
      } else {
        explanation = "Zero encryption active! Physical optical splitter copies raw Ethernet frames directly into adversary recorder!";
        technicalTrace = "Optical Splitter taps cable ➔ Captures unencrypted Ethernet frames ➔ Complete database backup leaked!";
      }
    } else if (threatScenarioKey === "sql_tamper") {
      if (enableLayer7Https) {
        isMitigated = true;
        stoppingLayer = "Layer 7 (HTTPS / mTLS Digital Signature)";
        badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
        explanation = "Application Layer mTLS and digital signatures guarantee end-to-end non-repudiation and transaction integrity.";
        technicalTrace = "API Gateway verifies client certificate ➔ SHA-256 Digital Signature verified ➔ Transaction authorized.";
      } else {
        explanation = "Even if lower layers (IPsec/MACsec) protect the wire, unauthenticated Layer 7 allows forged API requests!";
        technicalTrace = "Adversary injects forged API call ➔ Lower layers encrypt the malicious request ➔ Server executes rogue command!";
      }
    } else {
      // dns_poisoning
      isMitigated = true;
      stoppingLayer = "Layer 7 (DNSSEC / DNS-over-HTTPS)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      explanation = "Cryptographic RRSIG signatures anchored at the Root DNS zone verify that the returned IP address was not poisoned.";
      technicalTrace = "Attacker sends fake DNS reply ➔ Resolver checks DNSKEY & RRSIG ➔ Cryptographic signature INVALID ➔ Fake reply DROPPED!";
    }

    return {
      isMitigated,
      stoppingLayer,
      badgeColor,
      explanation,
      technicalTrace
    };
  }, [threatScenarioKey, enableLayer2Macsec, enableLayer3Ipsec, enableLayer7Https]);

  // Studio 3: Cumulative Overhead Calculation Logic
  const cumulativeOverheadMetrics = useMemo(() => {
    let totalOverhead = 0;
    if (enableLayer7Https) totalOverhead += 29; // TLS record
    if (enableLayer3Ipsec) totalOverhead += 60; // IPsec ESP
    if (enableLayer2Macsec) totalOverhead += 32; // MACsec

    const totalFrameSize = averagePayloadBytes + totalOverhead + 40; // 40B IP/TCP
    const efficiencyPercent = ((averagePayloadBytes / totalFrameSize) * 100).toFixed(1);
    const overheadPercent = ((totalOverhead / totalFrameSize) * 100).toFixed(1);

    // Throughput under link speed
    const effectiveThroughputGbps = ((networkLinkSpeedGbps * (averagePayloadBytes / totalFrameSize))).toFixed(2);

    return {
      totalOverhead,
      totalFrameSize,
      efficiencyPercent,
      overheadPercent,
      effectiveThroughputGbps
    };
  }, [enableLayer7Https, enableLayer3Ipsec, enableLayer2Macsec, averagePayloadBytes, networkLinkSpeedGbps]);

  // Studio 4: Regional SOC Case Studies Data
  const regionalDrills = {
    barrackpore_treasury_multitier: {
      id: "barrackpore_treasury_multitier",
      title: "Barrackpore District Treasury: Multi-Tier OSI Defense Stack",
      location: "Barrackpore Central Treasury disbursing ₹45 Crore monthly pensions",
      threatScenario:
        "Susmita and Mamata designed the security perimeter for treasury branch interconnects. The infrastructure faced risks from public ISP snooping, physical fiber tapping, and rogue switch injection.",
      solution:
        "Sukanta Hui orchestrated a 3-tier defense-in-depth model: Layer 2 MACsec on local switch uplinks, Layer 3 IPsec ESP across WAN leased lines, and Layer 7 HTTPS with mTLS client certificates for all database APIs.",
      outcome:
        "Zero single point of failure; physical fiber taps yield only encrypted SecTAG frames; certified 100% compliant with RBI core banking guidelines."
    },
    kolkata_iot_sensor_grid: {
      id: "kolkata_iot_sensor_grid",
      title: "Salt Lake Sector V Smart City: Lightweight DTLS IoT Grid",
      location: "Sector V Smart City Grid with 12,000 Water & Power Telemetry Sensors",
      threatScenario:
        "Debangshu and Mahima deployed battery-powered sensors. Standard TCP HTTPS caused battery drain and latency timeouts on weak 4G cellular links.",
      solution:
        "Migrated sensor telemetry to Layer 4 DTLS 1.3 (Datagram TLS over UDP) paired with Layer 2 802.1X port access control.",
      outcome:
        "Sensor battery lifespan extended by 3.8 years; telemetry packet loss handled without TCP meltdown; zero spoofing attacks."
    }
  };

  const currentLayer = osiLayerSpecs[selectedLayerKey];
  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_004 • Topic 0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Network Security Protocols across the OSI Stack
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the mapping, encapsulation mechanisms, and architectural trade-offs of security protocols
            operating from Physical Layer 1 to Application Layer 7.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              OSI 7-Layer Mapping
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              HTTPS, TLS 1.3 &amp; DTLS
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              IPsec AH vs ESP
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              MACsec (802.1AE)
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
              🌐
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The OSI Security Model: Protection at Every Layer
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how cryptographic protocols operate across the 7-layer stack to deliver defense-in-depth
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In enterprise cybersecurity across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, no single security protocol can protect against all attack
              vectors. A robust security posture implements <strong className="text-white">Defense-in-Depth</strong> by
              deploying complementary protocols across the <strong className="text-emerald-400">OSI Reference Model</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-emerald-700/60 transition-all duration-300 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                    <span>🔝</span> Higher Layers (Layer 4 &amp; Layer 7)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Application-Aware
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Protocols like <strong className="text-white">HTTPS (TLS 1.3)</strong>, <strong className="text-white">SSH</strong>, and{" "}
                  <strong className="text-white">S/MIME</strong> understand user identities, URL paths, and SQL payloads.
                  They provide end-to-end security that travels across untrusted proxies intact.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-indigo-700/60 transition-all duration-300 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-indigo-400 flex items-center gap-2">
                    <span>🔌</span> Lower Layers (Layer 2 &amp; Layer 3)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    Transparent Network
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Protocols like <strong className="text-white">IPsec ESP</strong> and <strong className="text-white">MACsec (802.1AE)</strong> operate
                  transparently in network cards and switch ASICs. They encrypt 100% of IP and Ethernet frames without
                  requiring any changes to application software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE 7-LAYER OSI SECURITY STACK EXPLORER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🗺️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: 7-Layer OSI Security Protocol Stack Explorer
                </h2>
                <p className="text-sm text-slate-400">
                  Select an OSI layer to inspect active security protocols, cryptographic algorithms, and encapsulation scope
                </p>
              </div>
            </div>

            {/* Layer Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(osiLayerSpecs).map((key) => {
                const item = osiLayerSpecs[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedLayerKey(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border",
                      selectedLayerKey === key
                        ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(":")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Layer Details Banner */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">{currentLayer.title}</h3>
              <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold border", currentLayer.badgeColor)}>
                {currentLayer.badge}
              </span>
            </div>

            {/* Dynamic Instructional SVG Stack Diagram */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <svg
                id={svgOsiStackId}
                viewBox="0 0 880 280"
                className="w-full min-w-[700px] h-auto"
                aria-label="OSI 7-Layer Security Protocol Mapping Diagram"
              >
                {/* Visual Stack Layers */}
                <g transform="translate(20, 20)">
                  {/* Layer 7 */}
                  <rect
                    x="0"
                    y="0"
                    width="840"
                    height="45"
                    rx="8"
                    fill={selectedLayerKey === "layer_7_app" ? "#064e3b" : "#0f172a"}
                    stroke={selectedLayerKey === "layer_7_app" ? "#10b981" : "#334155"}
                    strokeWidth="2"
                  />
                  <text x="20" y="28" fill="#34d399" fontSize="12" fontWeight="bold">Layer 7 - Application</text>
                  <text x="220" y="28" fill="#ffffff" fontSize="11 font-mono">HTTPS (TLS 1.3), SSH v2, S/MIME, PGP, DNSSEC</text>
                  <text x="700" y="28" fill="#94a3b8" fontSize="10 font-mono">Scope: End-to-End User</text>

                  {/* Layer 4 */}
                  <rect
                    x="0"
                    y="55"
                    width="840"
                    height="45"
                    rx="8"
                    fill={selectedLayerKey === "layer_4_transport" ? "#083344" : "#0f172a"}
                    stroke={selectedLayerKey === "layer_4_transport" ? "#06b6d4" : "#334155"}
                    strokeWidth="2"
                  />
                  <text x="20" y="83" fill="#67e8f9" fontSize="12" fontWeight="bold">Layer 4 - Transport</text>
                  <text x="220" y="83" fill="#ffffff" fontSize="11 font-mono">TLS 1.3 (TCP Sockets), DTLS 1.3 (UDP Sockets)</text>
                  <text x="700" y="83" fill="#94a3b8" fontSize="10 font-mono">Scope: Process Sockets</text>

                  {/* Layer 3 */}
                  <rect
                    x="0"
                    y="110"
                    width="840"
                    height="45"
                    rx="8"
                    fill={selectedLayerKey === "layer_3_network" ? "#1e1b4b" : "#0f172a"}
                    stroke={selectedLayerKey === "layer_3_network" ? "#6366f1" : "#334155"}
                    strokeWidth="2"
                  />
                  <text x="20" y="138" fill="#c7d2fe" fontSize="12" fontWeight="bold">Layer 3 - Network</text>
                  <text x="220" y="138" fill="#ffffff" fontSize="11 font-mono">IPsec ESP / AH, IKEv2, WireGuard Noise IK</text>
                  <text x="700" y="138" fill="#94a3b8" fontSize="10 font-mono">Scope: Host-to-Host IP</text>

                  {/* Layer 2 */}
                  <rect
                    x="0"
                    y="165"
                    width="840"
                    height="45"
                    rx="8"
                    fill={selectedLayerKey === "layer_2_datalink" ? "#422006" : "#0f172a"}
                    stroke={selectedLayerKey === "layer_2_datalink" ? "#eab308" : "#334155"}
                    strokeWidth="2"
                  />
                  <text x="20" y="193" fill="#fde047" fontSize="12" fontWeight="bold">Layer 2 - Data Link</text>
                  <text x="220" y="193" fill="#ffffff" fontSize="11 font-mono">IEEE 802.1AE MACsec, IEEE 802.1X (EAP-TLS), WPA3</text>
                  <text x="700" y="193" fill="#94a3b8" fontSize="10 font-mono">Scope: Switch Hop-by-Hop</text>

                  {/* Layer 1 */}
                  <rect
                    x="0"
                    y="220"
                    width="840"
                    height="45"
                    rx="8"
                    fill={selectedLayerKey === "layer_1_physical" ? "#4c0519" : "#0f172a"}
                    stroke={selectedLayerKey === "layer_1_physical" ? "#f43f5e" : "#334155"}
                    strokeWidth="2"
                  />
                  <text x="20" y="248" fill="#fecdd3" fontSize="12" fontWeight="bold">Layer 1 - Physical</text>
                  <text x="220" y="248" fill="#ffffff" fontSize="11 font-mono">Optical OTN Bulk Wire Encryption, Quantum Key Distribution (QKD)</text>
                  <text x="700" y="248" fill="#94a3b8" fontSize="10 font-mono">Scope: Fiber Bitstream</text>
                </g>
              </svg>
            </div>

            {/* Detailed Attribute Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Protocols &amp; Cryptographic Ciphers
                </h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <p><strong className="text-white">Primary Protocols:</strong> {currentLayer.primaryProtocols}</p>
                  <p><strong className="text-white">Ciphers &amp; Hashes:</strong> {currentLayer.cryptoAlgorithms}</p>
                  <p><strong className="text-white">Header Overhead:</strong> {currentLayer.headerTax}</p>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Architectural Scope &amp; Transparency
                </h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <p><strong className="text-white">Transparency:</strong> {currentLayer.transparency}</p>
                  <p><strong className="text-white">Protection Scope:</strong> {currentLayer.scope}</p>
                  <p className="text-emerald-400 font-semibold">{currentLayer.verdict}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE MULTI-LAYER DEFENSE-IN-DEPTH THREAT SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-800 text-rose-400 text-xl">
              🎯
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 2: Multi-Layer Defense-in-Depth Threat Simulator
              </h2>
              <p className="text-sm text-slate-400">
                Test how combining Layer 2, Layer 3, and Layer 7 security protocols mitigates real-world adversarial attacks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control 1: Threat Scenario */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Adversary Threat Vector
              </label>
              <select
                value={threatScenarioKey}
                onChange={(e) => setThreatScenarioKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="isp_mitm">Compromised ISP Edge Router / Man-in-the-Middle (Kolkata Transit)</option>
                <option value="public_wifi_sniff">Public Wi-Fi Packet Sniffing (Barrackpore Coffee Shop)</option>
                <option value="fiber_tap">Physical Optical Fiber Laser Tap (Sector V Datacenter)</option>
                <option value="sql_tamper">Application-Layer API / SQL Injection Tampering</option>
                <option value="dns_poisoning">DNS Cache Poisoning / Domain Spoofing Attack</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Simulates real-world network interception and tampering tactics.
              </p>
            </div>

            {/* Control 2: Active Layer Toggles */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Active Security Layers (Defense-in-Depth)
              </label>
              <div className="space-y-1.5 text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableLayer7Https}
                    onChange={(e) => setEnableLayer7Https(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Layer 7: HTTPS / TLS 1.3 (End-to-End API Crypto)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableLayer3Ipsec}
                    onChange={(e) => setEnableLayer3Ipsec(e.target.checked)}
                    className="accent-cyan-500 rounded"
                  />
                  <span>Layer 3: IPsec ESP (Network Layer Gateway VPN)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableLayer2Macsec}
                    onChange={(e) => setEnableLayer2Macsec(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Layer 2: MACsec 802.1AE (Switch Link Encryption)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Threat Simulation Decision Card */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Defense Outcome:</span>
                <span className="text-xs font-mono font-bold text-white">
                  Mitigated by {threatDefenseResult.stoppingLayer}
                </span>
              </div>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", threatDefenseResult.badgeColor)}>
                {threatDefenseResult.isMitigated ? "✔ ATTACK MITIGATED" : "🚨 SECURITY BREACH"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider">
                  Defense Mechanism &amp; Analysis:
                </h4>
                <p className="text-slate-300 leading-relaxed">{threatDefenseResult.explanation}</p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-cyan-400 uppercase tracking-wider">
                  Packet Execution Trace:
                </h4>
                <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                  {threatDefenseResult.technicalTrace}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: CUMULATIVE HEADER TAX & PERFORMANCE CALCULATOR (INR ₹) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              📊
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 3: Layer Performance &amp; Cumulative Header Tax Calculator
              </h2>
              <p className="text-sm text-slate-400">
                Calculate total encapsulation byte expansion when combining multiple OSI security layers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: Link Speed */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Physical WAN / LAN Link Speed:</span>
                <span className="text-cyan-400 font-mono text-sm">{networkLinkSpeedGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.1"
                value={networkLinkSpeedGbps}
                onChange={(e) => setNetworkLinkSpeedGbps(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Physical bandwidth capacity of the optical or copper link.
              </p>
            </div>

            {/* Slider 2: Average Payload Size */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Application Payload Segment:</span>
                <span className="text-emerald-400 font-mono text-sm">{averagePayloadBytes} Bytes</span>
              </div>
              <input
                type="range"
                min="200"
                max="1400"
                step="50"
                value={averagePayloadBytes}
                onChange={(e) => setAveragePayloadBytes(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Average user data payload before multi-layer security headers.
              </p>
            </div>
          </div>

          {/* Computed Metrics Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Cumulative Security Header Tax</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">
                {cumulativeOverheadMetrics.totalOverhead} <span className="text-sm font-normal text-white">Bytes</span>
              </div>
              <div className="text-[11px] text-slate-400">L7 ({enableLayer7Https ? "29B" : "0B"}) + L3 ({enableLayer3Ipsec ? "60B" : "0B"}) + L2 ({enableLayer2Macsec ? "32B" : "0B"})</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Bandwidth Efficiency</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                {cumulativeOverheadMetrics.efficiencyPercent}%
              </div>
              <div className="text-[11px] text-slate-400">Payload Ratio vs Total Frame</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Encapsulated Frame Size</div>
              <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                {cumulativeOverheadMetrics.totalFrameSize} <span className="text-sm font-normal text-white">Bytes</span>
              </div>
              <div className="text-[11px] text-slate-400">Includes 40B IP/TCP Baseline</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Effective Encrypted Throughput</div>
              <div className="text-2xl font-extrabold text-white font-mono">
                {cumulativeOverheadMetrics.effectiveThroughputGbps} <span className="text-sm font-normal text-emerald-400">Gbps</span>
              </div>
              <div className="text-[11px] text-slate-400">Net Usable Data Delivery</div>
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
                2. Real-World Multi-Layer Security Implementations
              </h2>
              <p className="text-sm text-slate-400">
                How modern enterprises deploy security protocols across the OSI stack in production
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🏛️</span> Scenario 1: District Treasury Financial Core
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  L2 + L3 + L7
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita and Mamata manage pension disbursements in Barrackpore.
                Financial regulations mandate zero cleartext on any wire.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Stack: MACsec (802.1AE) on switches + IPsec ESP (AES-256) on WAN + HTTPS (TLS 1.3) on web banking APIs.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Defense-in-depth guarantees that fiber taps or edge router breaches yield zero usable plaintext.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>📡</span> Scenario 2: Smart City Telemetry Sensors
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  L2 + L4 DTLS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu and Mahima deployed 12,000 smart water meters across New Town, Kolkata.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Stack: Layer 2 802.1X certificate admission + Layer 4 DTLS 1.3 over UDP to eliminate TCP state overhead.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> 3.8-year battery life achieved with zero vulnerability to sensor spoofing.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🔐</span> Scenario 3: Executive Confidential Email (S/MIME)
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Layer 7 E2EE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Municipal executive communications require legal non-repudiation in court.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Stack: S/MIME X.509 digital signatures and public-key encryption inside Microsoft Outlook.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Emails remain encrypted even on intermediate mail servers; sender identity legally verified.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🛡️</span> Scenario 4: DNSSEC Against Cache Poisoning
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Layer 7 Integrity
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila protects public tax payment portal domains from DNS hijacking.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Stack: DNSSEC with RRSIG ECDSA signatures anchored to the .gov.in and root DNS trust hierarchy.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Attackers cannot forge DNS IP responses; prevents phishing redirects.
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
                  Studio 4: Regional West Bengal SOC Case Studies &amp; Layer Drills
                </h2>
                <p className="text-sm text-slate-400">
                  Real-world enterprise protocol troubleshooting and multi-layer defense implementations
                </p>
              </div>
            </div>

            {/* Drill Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDrillKey("barrackpore_treasury_multitier")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_treasury_multitier"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore Treasury Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_iot_sensor_grid")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_iot_sensor_grid"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Sector V Smart Grid Drill
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
                3. Programmatic OSI Security Protocol &amp; Header Auditor (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Audit network security protocols across the OSI stack, evaluate multi-layer defenses, and calculate header taxes
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={osiSecurityAuditorPy}
            title="osi_security_auditor.py"
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
                Essential engineering habits, common beginner misconceptions, and revision points
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
                <strong className="text-white">1. Always Match Protocol to Transport:</strong>
                <p className="text-slate-400">
                  Use standard TLS 1.3 for TCP web traffic, but always switch to DTLS 1.3 for UDP voice/video streams
                  to prevent packet loss desynchronization and latency.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Deploy MACsec for Datacenter Interconnects:</strong>
                <p className="text-slate-400">
                  Enable IEEE 802.1AE MACsec on dark fiber links between datacenter buildings. It provides line-rate
                  wire encryption with zero CPU overhead on host servers.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Track Cumulative Encapsulation Overhead:</strong>
                <p className="text-slate-400">
                  When stacking Layer 2 (32B) + Layer 3 (60B) + Layer 4 (21B) security, remember to clamp TCP MSS to
                  1360 bytes on gateways to avoid MTU fragmentation drops.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Enforce HSTS on All Web Services:</strong>
                <p className="text-slate-400">
                  Always send the &apos;Strict-Transport-Security: max-age=31536000; includeSubDomains&apos; header to prevent
                  active Man-in-the-Middle SSL stripping attacks on public Wi-Fi.
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
                <strong className="text-rose-300">Misconception 1: "HTTPS encrypts the destination IP and port."</strong>
                <p className="text-slate-400">
                  HTTPS operates at Layer 7. The underlying IP address and TCP port 443 remain visible in cleartext
                  to routers and ISPs. To hide IP addresses, you must use Layer 3 IPsec or Tor.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "DNSSEC encrypts your web browsing history."</strong>
                <p className="text-slate-400">
                  DNSSEC provides digital signatures for integrity only (preventing cache poisoning). DNS queries remain
                  100% plaintext unless combined with DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT).
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Using IPsec AH over NAT Connections:</strong>
                <p className="text-slate-400">
                  AH covers the outer IP header in its hash. When NAT modifies the IP address, AH integrity checks fail
                  and packets are dropped. Always use IPsec ESP with NAT-T for internet transit.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Relying on a Single Security Layer:</strong>
                <p className="text-slate-400">
                  Assuming that having an IPsec VPN makes HTTPS unnecessary is a dangerous mistake. If an attacker breaches
                  the VPN endpoint, all application data travels in cleartext without Layer 7 encryption.
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
              <li><strong className="text-cyan-200">Think about:</strong> Why does an optical fiber tap fail to read data when Layer 2 MACsec or Layer 3 IPsec is active?</li>
              <li><strong className="text-cyan-200">Observe carefully:</strong> How different layers add header bytes in Studio 3 and calculate the net bandwidth efficiency of the frame.</li>
              <li><strong className="text-cyan-200">Try changing this:</strong> Disable all three security layers in Studio 2 and observe how simple Wi-Fi packet sniffers capture cleartext session cookies.</li>
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
                <span>Map security protocols across OSI Layers 7, 4, 3, 2, and 1</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Define Confidentiality, Integrity, Authentication, Non-Repudiation &amp; Anti-Replay</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain why IPsec AH fails over NAT while ESP with NAT-T succeeds</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Contrast Application-Layer (HTTPS) vs Network-Layer (IPsec) security trade-offs</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="Network Security Protocols across the OSI Stack FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="Overview of Network Security Protocols Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic0_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="Welcome to Module 005_004: Network Security Protocols: SSL, TLS & IPsec! As we begin this advanced module, remember that network security is an architectural stack, not a single standalone tool. Every layer of the OSI model has a unique role to play: Layer 2 MACsec protects physical switch fibers; Layer 3 IPsec creates transparent encrypted tunnels across the public internet; Layer 4 TLS encrypts process-to-process sockets; and Layer 7 HTTPS/SSH delivers end-to-end user identity and transaction non-repudiation. Throughout this module, we will explore the mathematical handshakes of TLS 1.2 and 1.3, deep dive into IPsec AH and ESP, configure secure SSH and DNSSEC, and learn how to harden enterprise networks against downgrade attacks. Master the layers, understand their trade-offs, and build bulletproof defense-in-depth!"
        />

      </div>
    </div>
  );
};

export default Topic0;
