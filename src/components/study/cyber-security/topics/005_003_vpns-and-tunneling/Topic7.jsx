import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic7_files/legacy_vpn_scanner.py?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgPptpFlawsId = useId();
  const svgL2tpComparisonId = useId();

  // Studio 1: Active Protocol Selection
  const [selectedLegacyKey, setSelectedLegacyKey] = useState("pptp_broken");

  // Studio 2: Live Cracking & Exploit Simulator State
  const [selectedAuditProto, setSelectedAuditProto] = useState("pptp"); // "pptp", "l2tp_plain", "l2tp_ipsec", "wireguard"
  const [simulateBitFlipAttack, setSimulateBitFlipAttack] = useState(false);

  // Studio 3: Migration Cost & Sizing Calculations
  const [legacyServersCount, setLegacyServersCount] = useState(6); // 1 to 20 servers
  const [migratedUsersCount, setMigratedUsersCount] = useState(400); // 50 to 2000 users
  const [migrationTargetType, setMigrationTargetType] = useState("wireguard"); // "wireguard", "ipsec_ikev2"

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_pptp_kill");

  // Comparison Database for Studio 1
  const legacyProtocols = {
    pptp_broken: {
      key: "pptp_broken",
      title: "1. PPTP (Point-to-Point Tunneling Protocol)",
      category: "Cryptographically Broken",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      architecture: "Control: TCP Port 1723 | Data: GRE (IP Protocol 47) carrying PPP frames.",
      authentication: "MS-CHAPv2 (56-bit DES Reduction - 100% cracked in < 23 hours via CloudCracker FPGA).",
      encryption: "MPPE (RC4 128-bit Stream Cipher - Zero HMAC integrity tag, vulnerable to bit-flipping).",
      status: "❌ FORBIDDEN / DEPRECATED by NIST SP 800-77, PCI-DSS 4.0, and CERT-In.",
      verdict: "Completely obsolete; must be blocked at perimeter firewalls and decommissioned immediately."
    },
    l2tp_standalone: {
      key: "l2tp_standalone",
      title: "2. Standalone L2TP (No IPsec)",
      category: "Insecure (Cleartext)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      architecture: "Control & Data: UDP Port 1701 carrying Layer 2 PPP frames across IP networks.",
      authentication: "PAP (Cleartext passwords) or CHAP (Weak MD5 challenge-response).",
      encryption: "NONE (Transmits all payloads, passwords, and tokens in 100% unencrypted cleartext).",
      status: "❌ INSECURE: Vulnerable to passive packet sniffing and injection on public networks.",
      verdict: "Never deploy standalone L2TP over untrusted public networks without IPsec encapsulation."
    },
    l2tp_ipsec: {
      key: "l2tp_ipsec",
      title: "3. L2TP/IPsec (Transport Mode)",
      category: "Legacy Heavyweight",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      architecture: "L2TP wrapped inside IPsec ESP Transport Mode (UDP 1701 + UDP 500/4500).",
      authentication: "X.509 Digital Certificates or Pre-Shared Keys (PSK) with MS-CHAPv2/EAP.",
      encryption: "AES-256-CBC or AES-256-GCM via IPsec ESP envelope.",
      status: "⚠️ OBSOLETE & HEAVY: Massive 76+ byte overhead; prone to NAT-T failures.",
      verdict: "Secure but overly complex and high overhead; migrate to lightweight WireGuard or native IPsec IKEv2."
    },
    wireguard_modern: {
      key: "wireguard_modern",
      title: "4. Modern WireGuard (Gold Standard)",
      category: "Modern In-Kernel",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      architecture: "In-kernel `wg0` network interface over UDP Port 51820 using Noise IK Protocol.",
      authentication: "Curve25519 Public-Key Cryptographic Routing + Optional Quantum PSK.",
      encryption: "ChaCha20-Poly1305 AEAD (Hardware authenticated in a single pass).",
      status: "✔ MODERN GOLD STANDARD: 4+ Gbps throughput, ~4,000 LOC, silent port-scan immunity.",
      verdict: "The universally recommended replacement for all legacy PPTP and L2TP VPN infrastructures."
    }
  };

  // Studio 2: Live Exploit & Cracking Simulator Logic
  const auditResult = useMemo(() => {
    if (selectedAuditProto === "pptp") {
      return {
        protocolName: "PPTP (Point-to-Point Tunneling Protocol)",
        status: "CRITICAL_EXPLOITABLE",
        verdict: "❌ CRITICAL RISK: Broken MS-CHAPv2 & RC4 Exploitation Possible!",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        authCrackTime: "MS-CHAPv2 56-bit DES: 22.5 Hours (100% Guaranteed Recovery via FPGA)",
        encryptionStrength: "MPPE (RC4 128-bit) - Zero Integrity Verification!",
        bitFlipResult: simulateBitFlipAttack
          ? "🚨 BIT-FLIP SUCCESSFUL: Modified ₹10,000 to ₹90,000 undetected! (Zero HMAC Check)"
          : "Vulnerable to bit-flipping tampering (No cryptographic HMAC tag present)",
        explanation: "Adversaries capturing the MS-CHAPv2 handshake can crack the Windows NT password hash in less than a day. In-transit attackers can alter plaintext values directly by flipping ciphertext bits!"
      };
    } else if (selectedAuditProto === "l2tp_plain") {
      return {
        protocolName: "Standalone L2TP (UDP Port 1701)",
        status: "CLEARTEXT_EXPOSURE",
        verdict: "❌ HIGH RISK: Zero Native Encryption! Cleartext Traffic Exposure.",
        badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
        authCrackTime: "PAP Cleartext: 0 Seconds (Password visible directly in Wireshark!)",
        encryptionStrength: "NONE (0-bit Encryption - 100% Cleartext)",
        bitFlipResult: "Plaintext packets can be intercepted, read, and modified by any on-path sniffer.",
        explanation: "Standalone L2TP provides zero confidentiality. Passwords and sensitive data are transmitted in plain ASCII text across intermediate ISPs and public Wi-Fi access points."
      };
    } else if (selectedAuditProto === "l2tp_ipsec") {
      return {
        protocolName: "L2TP/IPsec (Transport Mode)",
        status: "LEGACY_SECURE",
        verdict: "⚠️ LEGACY: Cryptographically Secure but Heavy Double Overhead (76B).",
        badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
        authCrackTime: "X.509 PKI / RSA-3072: Computationally Infeasible (> 10^18 Years)",
        encryptionStrength: "AES-256-GCM (IPsec ESP Envelope)",
        bitFlipResult: "✔ Bit-flip blocked by IPsec ICV tag (Tampered packet dropped).",
        explanation: "L2TP/IPsec is secure against eavesdropping and tampering, but suffers from severe packet overhead (76+ bytes), NAT-T configuration complexity, and high latency on mobile devices."
      };
    } else {
      // WireGuard
      return {
        protocolName: "WireGuard (In-Kernel Noise Protocol)",
        status: "MODERN_IMMUNE",
        verdict: "✔ 100% IMMUNE: Modern Post-Quantum Ready Cryptographic Architecture!",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        authCrackTime: "Curve25519 (ECDH): Mathematically Unbreakable (> 10^24 Years)",
        encryptionStrength: "ChaCha20-Poly1305 AEAD + BLAKE2s + 256-bit Quantum PSK",
        bitFlipResult: "✔ Bit-flip rejected instantly by Poly1305 MAC tag in-kernel.",
        explanation: "WireGuard utilizes state-of-the-art cryptography with an ultra-compact 4,000-line codebase. 100% immune to MS-CHAPv2 cracking, RC4 keystream bias, and MITM bit-flipping."
      };
    }
  }, [selectedAuditProto, simulateBitFlipAttack]);

  // Studio 3: Migration Calculations
  const calculatedMigrationMetrics = useMemo(() => {
    // Migration Capital Cost (INR ₹ Lakhs)
    const hardwareGatewayLakhs = (legacyServersCount * 1.5 + 4.5).toFixed(2);
    const clientRolloutLakhs = ((migratedUsersCount * 450) / 100000).toFixed(2);
    const totalMigrationTcoLakhs = (Number(hardwareGatewayLakhs) + Number(clientRolloutLakhs) + 2.5).toFixed(2);

    // Bandwidth overhead savings (%)
    const overheadSavedPercent = migrationTargetType === "wireguard" ? "58.2%" : "22.5%";

    return {
      totalMigrationTcoLakhs,
      overheadSavedPercent
    };
  }, [legacyServersCount, migratedUsersCount, migrationTargetType]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_pptp_kill: {
      id: "barrackpore_pptp_kill",
      title: "Barrackpore Municipal Revenue Gateway PPTP Emergency Decommissioning",
      location: "Barrackpore Central Revenue Hub connecting 6 Branch Tax Collection Desks",
      threatScenario: "An attacker on the public broadband link captured MS-CHAPv2 handshakes and used automated DES rainbow tables to recover the supervisor's password in 14 minutes.",
      solution: "Sukanta Hui, Mamata, and Mahima immediately blocked TCP port 1723 and IP Protocol 47 at the perimeter firewall, deploying in-kernel WireGuard tunnels across all tax collection desks.",
      outcome: "100% elimination of legacy authentication risk; bandwidth consumption reduced by 8%; full compliance with CERT-In directives."
    },
    saltlake_l2tp_migration: {
      id: "saltlake_l2tp_migration",
      title: "Salt Lake Sector V Datacenter L2TP/IPsec Modernization",
      location: "Sector V Core Hub connecting 300 Roaming Field Engineers",
      threatScenario: "Legacy L2TP/IPsec suffered frequent MTU fragmentation drops and NAT-T timeouts during mobile cellular handoffs in monsoon weather.",
      solution: "Abhronila, Susmita, and Debangshu migrated the roaming workforce to WireGuard with automated MSS clamping to 1420 bytes.",
      outcome: "Connection drops reduced to 0; cellular handshake latency slashed from 450ms to 25ms; zero NAT-T configuration headaches."
    }
  };

  const currentLegacy = legacyProtocols[selectedLegacyKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 7</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            PPTP &amp; L2TP: Legacy Protocols &amp; Security Limitations
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Understand why <strong className="text-rose-400">PPTP is Mathematically Broken</strong> (MS-CHAPv2 56-bit DES Cracking &amp; RC4 Bit-Flipping), why <strong className="text-amber-400">Standalone L2TP is Insecure</strong>, the overhead of <strong className="text-purple-400">L2TP/IPsec</strong>, and the migration path to <strong className="text-sky-400">Modern WireGuard &amp; IKEv2</strong>.
          </p>
        </header>

        {/* SECTION 1: PPTP FLAWS & L2TP COMPARISON SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-rose-400">01.</span> PPTP Catastrophic Flaws vs L2TP/IPsec Overhead vs WireGuard
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the cryptographic vulnerabilities of PPTP on the left and the packet overhead comparison on the right.
            </p>
          </div>

          {/* SVG 1: PPTP FLAWS & OVERHEAD COMPARISON */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                PPTP Fatal Vulnerabilities ➔ Protocol Overhead Comparison
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Legacy Flaws &amp; MTU Impact</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgPptpFlawsId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="PPTP Vulnerabilities and Protocol Overhead Diagram"
              >
                {/* LEFT: PPTP FATAL VULNERABILITIES */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#ef4444" strokeWidth="1.5" />
                <text x="215" y="42" fill="#ef4444" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  PPTP: CATASTROPHIC VULNERABILITY MATRIX
                </text>

                {/* FLAW 1: MS-CHAPV2 */}
                <rect x="35" y="58" width="360" height="52" rx="4" fill="#450a0a" stroke="#dc2626" />
                <text x="215" y="74" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  1. BROKEN MS-CHAPv2 AUTHENTICATION (DES Reduction)
                </text>
                <text x="215" y="90" fill="#ffffff" fontSize="6.5" textAnchor="middle">
                  Splits password into two 56-bit DES keys ($2^{56} \approx 7.2 \times 10^{16}$)
                </text>
                <text x="215" y="103" fill="#fca5a5" fontSize="6.5" textAnchor="middle">
                  100% Cracked in &lt; 23 Hours via CloudCracker FPGA Cluster!
                </text>

                {/* FLAW 2: RC4 MPPE */}
                <rect x="35" y="116" width="360" height="52" rx="4" fill="#450a0a" stroke="#dc2626" />
                <text x="215" y="132" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  2. RC4 MPPE STREAM CIPHER (Zero HMAC Integrity)
                </text>
                <text x="215" y="148" fill="#ffffff" fontSize="6.5" textAnchor="middle">
                  No cryptographic MAC tag ➔ Bit-Flipping Attacks Undetected!
                </text>
                <text x="215" y="161" fill="#fca5a5" fontSize="6.5" textAnchor="middle">
                  Changing ₹10,000 to ₹90,000 succeeds without server detection.
                </text>

                {/* FLAW 3: GRE ROUTING */}
                <rect x="35" y="174" width="360" height="42" rx="4" fill="#18181b" stroke="#71717a" />
                <text x="215" y="190" fill="#cbd5e1" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  3. GRE PROTOCOL 47 NAT &amp; FIREWALL FAILURE
                </text>
                <text x="215" y="206" fill="#94a3b8" fontSize="6.5" textAnchor="middle">
                  No Layer 4 ports ➔ Blocked by AWS/Azure and Home Wi-Fi NAT
                </text>

                <text x="215" y="245" fill="#ef4444" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  STRICTLY FORBIDDEN BY CERT-IN &amp; PCI-DSS 4.0
                </text>

                {/* RIGHT: OVERHEAD & SECURITY COMPARISON */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="635" y="42" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  PROTOCOL SECURITY &amp; OVERHEAD COMPARISON
                </text>

                {/* 1. PPTP */}
                <rect x="455" y="58" width="360" height="40" rx="4" fill="#450a0a" stroke="#ef4444" />
                <text x="470" y="74" fill="#fee2e2" fontSize="7.5" fontWeight="bold">PPTP (TCP 1723 + GRE 47)</text>
                <text x="795" y="74" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="end">❌ BROKEN</text>
                <text x="470" y="90" fill="#ffffff" fontSize="6.5">Overhead: 44 Bytes | Auth: MS-CHAPv2 | Enc: RC4 MPPE</text>

                {/* 2. L2TP/IPsec */}
                <rect x="455" y="104" width="360" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                <text x="470" y="120" fill="#c7d2fe" fontSize="7.5" fontWeight="bold">L2TP / IPsec (Transport)</text>
                <text x="795" y="120" fill="#fde68a" fontSize="7" fontWeight="bold" textAnchor="end">⚠️ HEAVY</text>
                <text x="470" y="136" fill="#ffffff" fontSize="6.5">Overhead: 76 - 92 Bytes (Double Wrap) | Auth: X.509 | Enc: AES-256</text>

                {/* 3. WIREGUARD */}
                <rect x="455" y="150" width="360" height="44" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="470" y="168" fill="#a7f3d0" fontSize="8" fontWeight="bold">WireGuard (In-Kernel Noise)</text>
                <text x="795" y="168" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="end">✔ GOLD STANDARD</text>
                <text x="470" y="184" fill="#ffffff" fontSize="6.5">Overhead: 32 Bytes (Lightest) | Auth: Curve25519 | Enc: ChaCha20-Poly</text>

                {/* MIGRATION DIRECTIVE */}
                <rect x="455" y="200" width="360" height="44" rx="4" fill="#082f49" stroke="#0284c7" />
                <text x="635" y="218" fill="#7dd3fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  MIGRATION BLUEPRINT: PERMANENTLY DECOMMISSION PPTP
                </text>
                <text x="635" y="234" fill="#ffffff" fontSize="6.5" textAnchor="middle">
                  Block TCP 1723 at Perimeter ➔ Standardize on WireGuard / IKEv2
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: LEGACY PROTOCOLS MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">02.</span> Studio 1: Legacy vs Modern Protocol Security &amp; Vulnerability Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical architectures, cryptographic flaws, and regulatory compliance status of legacy VPN protocols.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentLegacy.badgeColor)}>
              {currentLegacy.category}
            </span>
          </div>

          {/* Protocol Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(legacyProtocols).map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedLegacyKey(p.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedLegacyKey === p.key
                    ? "bg-slate-800 text-white border-rose-500 shadow-md shadow-rose-500/10"
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
                <h3 className="text-base font-bold text-white">{currentLegacy.title}</h3>
                <span className="text-gray-400">Category: {currentLegacy.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentLegacy.badgeColor)}>
                Active Profile
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Network Architecture &amp; Ports:
              </span>
              <p className="text-gray-300 leading-relaxed font-mono text-xs">{currentLegacy.architecture}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-rose-950/80 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                  🚨 Authentication &amp; Flaws:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentLegacy.authentication}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-amber-950/80 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  📜 Encryption &amp; Integrity:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentLegacy.encryption}</p>
              </div>
            </div>

            <div className="p-3.5 bg-rose-950/40 rounded-lg border border-rose-900/50 space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚖️ Regulatory Status &amp; Verdict:
              </span>
              <p className="text-rose-200 font-mono text-xs">{currentLegacy.status}</p>
              <p className="text-gray-300 text-xs pt-1">{currentLegacy.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE CRACKING & EXPLOIT SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">03.</span> Studio 2: Live Legacy Vulnerability &amp; Cracking Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Audit legacy protocols, calculate MS-CHAPv2 56-bit DES cracking time, and test RC4 in-transit bit-flipping vulnerabilities.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Vulnerability Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Protocol to Audit:</label>
              <select
                value={selectedAuditProto}
                onChange={(e) => setSelectedAuditProto(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-rose-500 focus:outline-none"
              >
                <option value="pptp">1. PPTP (TCP 1723 + GRE 47 / MS-CHAPv2 + RC4)</option>
                <option value="l2tp_plain">2. Standalone L2TP (UDP 1701 / Cleartext)</option>
                <option value="l2tp_ipsec">3. L2TP/IPsec (Transport Mode / AES-256)</option>
                <option value="wireguard">4. WireGuard (In-Kernel Noise / ChaCha20-Poly1305)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Simulate In-Transit Bit-Flip Attack:</label>
              <button
                onClick={() => setSimulateBitFlipAttack(!simulateBitFlipAttack)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  simulateBitFlipAttack
                    ? "bg-rose-950/80 text-rose-300 border-rose-800 shadow-md shadow-rose-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {simulateBitFlipAttack ? "🚨 Bit-Flip Injected (Tampering ₹10,000 ➔ ₹90,000)" : "✔ Normal Clean Transmission"}
              </button>
            </div>
          </div>

          {/* Audit Output Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Vulnerability Forensic Assessment:
                </span>
                <span className="text-white font-bold text-sm">{auditResult.protocolName}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                auditResult.badgeColor
              )}>
                {auditResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold text-[11px] block">Authentication Cracking Time:</span>
                <div className="text-gray-300 text-xs">{auditResult.authCrackTime}</div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold text-[11px] block">Encryption &amp; Data Integrity:</span>
                <div className="text-gray-300 text-xs">{auditResult.encryptionStrength}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                In-Transit Bit-Flipping Tampering Result:
              </span>
              <p className="text-rose-300 font-mono text-xs">{auditResult.bitFlipResult}</p>
              <p className="text-gray-400 text-[11px] pt-1">{auditResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: LEGACY SCANNER CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">04.</span> Python Forensic Lab: Legacy VPN Vulnerability Scanner
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation auditing legacy VPN endpoints, calculating 56-bit DES cracking times, and detecting cleartext transmission risks.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              legacy_vpn_scanner.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="legacy_vpn_scanner.py"
            highlightLines={[20, 36, 52, 68]}
          />
        </section>

        {/* STUDIO 3: MIGRATION SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">05.</span> Studio 3: Legacy Protocol Migration Cost &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate total decommissioning and modern gateway migration costs in INR (₹) and estimate bandwidth overhead savings.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Migration Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Legacy PPTP Servers:</span>
                <span className="text-rose-400 font-bold">{legacyServersCount} Servers</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={legacyServersCount}
                onChange={(e) => setLegacyServersCount(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Migrated Users:</span>
                <span className="text-purple-400 font-bold">{migratedUsersCount} Users</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={migratedUsersCount}
                onChange={(e) => setMigratedUsersCount(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Migration Target:</span>
                <span className="text-emerald-400 font-bold">{migrationTargetType === "wireguard" ? "In-Kernel WireGuard" : "IPsec IKEv2"}</span>
              </div>
              <button
                onClick={() => setMigrationTargetType(migrationTargetType === "wireguard" ? "ipsec_ikev2" : "wireguard")}
                className={clsx(
                  "w-full p-2 rounded text-xs font-semibold border transition-all",
                  migrationTargetType === "wireguard"
                    ? "bg-sky-950/80 text-sky-300 border-sky-800 shadow-md shadow-sky-500/10"
                    : "bg-purple-950/80 text-purple-300 border-purple-800 shadow-md shadow-purple-500/10"
                )}
              >
                {migrationTargetType === "wireguard" ? "✔ Target: WireGuard (Lightweight)" : "⚙️ Target: IPsec IKEv2 (Enterprise)"}
              </button>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Bandwidth Overhead Saved</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedMigrationMetrics.overheadSavedPercent} Reduction</div>
              <span className="text-[10px] text-gray-500 block">Compared to legacy 76-byte L2TP/IPsec overhead</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Migration TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedMigrationMetrics.totalMigrationTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Decommissioning + Hardware + Endpoint Rollout</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL SOC TABLETOP DRILL */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
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
                    ? "bg-rose-600/20 text-rose-300 border-rose-500/60"
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
                <span className="text-gray-400">Location: {currentDrill.location}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical Migration &amp; Hardening:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>PPTP uses TCP port 1723 and GRE (IP Protocol 47), relying on broken MS-CHAPv2 and RC4 MPPE.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>MS-CHAPv2 is vulnerable to 56-bit DES reduction attacks, allowing full password recovery in hours.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>PPTP has zero data integrity verification (no HMAC), making it vulnerable to bit-flipping attacks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>L2TP uses UDP port 1701 and provides zero native encryption; it must be paired with IPsec.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>L2TP/IPsec suffers from heavy double encapsulation overhead (76+ bytes) and NAT-T complexity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In and NIST SP 800-77 strictly mandate deprecating PPTP and legacy standalone L2TP.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="PPTP &amp; L2TP Legacy Protocols FAQs"
            subtitle="30 In-depth Practice Questions &amp; Vulnerability Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="PPTP and L2TP Legacy Protocols (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 7 emphasizes a critical cybersecurity principle: never trust legacy, broken protocols! PPTP's MS-CHAPv2 authentication can be 100% broken in under 23 hours via 56-bit DES reduction, and its RC4 MPPE encryption lacks any cryptographic HMAC, leaving data vulnerable to in-transit bit-flipping attacks. Standalone L2TP transmits everything in cleartext unless wrapped in IPsec. Today, both are obsolete. Block TCP port 1723 and GRE Protocol 47 at your perimeter firewalls, and standardize on in-kernel WireGuard or modern IKEv2 IPsec. In Topic 8, we will explore Split Tunneling vs Full Tunneling Security Trade-offs!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic7;
