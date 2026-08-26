import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import downgradeMitigationAuditorPy from "./topic11_files/downgrade_mitigation_auditor.py?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgSslStripId = useId();
  const svgDowngradeMatrixId = useId();

  // =========================================================================
  // STUDIO 1 STATE: SSLSTRIP VS HSTS PRELOAD SIMULATOR
  // =========================================================================
  const [isHstsPreloaded, setIsHstsPreloaded] = useState(true);

  const sslStripResult = useMemo(() => {
    if (isHstsPreloaded) {
      return {
        status: "PROTECTED (HSTS PRELOAD LIST ACTIVE)",
        trafficState: "Internal 307 Temporary Redirect locally inside browser engine",
        wireTransmission: "🔒 Zero cleartext HTTP bytes sent over network wire. Direct TLS 1.3 connection to Port 443.",
        attackerImpact: "❌ Attacker sees zero traffic on Wi-Fi interface. SSLstrip fails completely.",
        verdict: "SECURE ✔ (Immune to SSLstrip & Wi-Fi ARP Spoofing)",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
      };
    } else {
      return {
        status: "VULNERABLE (UNPROTECTED / TOFU FIRST VISIT)",
        trafficState: "Plaintext HTTP GET request sent over unencrypted Wi-Fi",
        wireTransmission: "⚠️ 'GET / HTTP/1.1' intercepted by MitM attacker (Arp Spoofing / Rogue Wi-Fi).",
        attackerImpact: "🚨 Attacker proxies HTTPS to server, but serves plain HTTP to client. Passwords & session cookies stolen!",
        verdict: "COMPROMISED 🚨 (Victim of SSLstrip session hijacking)",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
      };
    }
  }, [isHstsPreloaded]);

  // =========================================================================
  // STUDIO 2 STATE: DOWNGRADE ATTACKS & FALLBACK SCSV MATRIX
  // =========================================================================
  const [selectedAttackKey, setSelectedAttackKey] = useState("poodle");

  const downgradeAttacks = {
    poodle: {
      name: "POODLE (Padding Oracle On Downgraded Legacy Encryption)",
      cve: "CVE-2014-3566",
      targetProtocol: "SSL 3.0 CBC Mode",
      exploitMechanism: "Forces handshake fallback from TLS 1.2 to SSL 3.0. Exploits unverified CBC padding to decrypt session cookies byte-by-byte.",
      mitigation: "Permanently disable SSL 3.0 and mandate TLS 1.2/1.3 only; deploy TLS_FALLBACK_SCSV.",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    },
    freak: {
      name: "FREAK (Factoring Attack on Export RSA Keys)",
      cve: "CVE-2015-0204",
      targetProtocol: "RSA_EXPORT (512-bit RSA)",
      exploitMechanism: "MitM forces handshake down to legacy 1990s 512-bit export RSA keys, factoring the weak modulus in hours on cloud servers.",
      mitigation: "Eliminate all EXPORT, DES, and RC4 cipher suites from server configuration.",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    logjam: {
      name: "Logjam Attack",
      cve: "CVE-2015-4000",
      targetProtocol: "DHE_EXPORT (512-bit Diffie-Hellman)",
      exploitMechanism: "Precomputes discrete log tables for standardized 512-bit prime modulus, decrypting Diffie-Hellman handshakes in real time.",
      mitigation: "Enforce minimum 2048-bit DH parameters (openssl dhparam 4096) or standardize on ECDHE Curve25519.",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
    },
    drown: {
      name: "DROWN (Decrypting RSA with Obsolete and Weakened eNcryption)",
      cve: "CVE-2016-0800",
      targetProtocol: "SSLv2 Cross-Protocol Key Reuse",
      exploitMechanism: "Exploits Bleichenbacher padding oracle on a secondary SSLv2 service (e.g., mail server) sharing the same RSA private key to decrypt TLS sessions.",
      mitigation: "Disable SSLv2 across ALL network services globally; never share private keys between web and mail servers.",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    }
  };

  const currentAttack = downgradeAttacks[selectedAttackKey];

  // =========================================================================
  // STUDIO 3 STATE: AUTOMATED HTTP SECURITY HEADER & CAA GENERATOR
  // =========================================================================
  const [includeSubdomains, setIncludeSubdomains] = useState(true);
  const [enablePreload, setEnablePreload] = useState(true);
  const [enableCsp, setEnableCsp] = useState(true);
  const [enableNosniff, setEnableNosniff] = useState(true);
  const [enableCaaRecord, setEnableCaaRecord] = useState(true);

  const securityScore = useMemo(() => {
    let score = 50;
    if (includeSubdomains) score += 10;
    if (enablePreload) score += 15;
    if (enableCsp) score += 10;
    if (enableNosniff) score += 5;
    if (enableCaaRecord) score += 10;

    let grade = "A+ (Enterprise Hardened)";
    let color = "bg-emerald-950 text-emerald-300 border-emerald-700";
    if (score < 80) {
      grade = "B (Moderate Hardening)";
      color = "bg-amber-950 text-amber-300 border-amber-700";
    }
    return { score, grade, color };
  }, [includeSubdomains, enablePreload, enableCsp, enableNosniff, enableCaaRecord]);

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_hsts");

  const regionalDrills = {
    barrackpore_hsts: {
      id: "barrackpore_hsts",
      title: "Barrackpore Municipal Hub: HSTS Preload & SSLstrip Neutralization",
      location: "Citizen tax portal and property registration gateway",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Rogue Wi-Fi access points near the municipal building performed SSLstrip attacks on public taxpayers submitting property tax payments worth ₹55,00,000.",
      solution:
        "Submitted `barrackpore.gov.in` to the global Chromium HSTS Preload List with `max-age=31536000; includeSubDomains; preload`.",
      outcome:
        "All browsers enforce instant local 307 internal redirects; zero cleartext HTTP packets on public Wi-Fi; SSLstrip neutralized 100%."
    },
    ichapur_defense_caa: {
      id: "ichapur_defense_caa",
      title: "Ichapur Defense Facility: Strict CAA Records & CT Merkle Monitoring",
      location: "Classified defense research & arms procurement portals",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Targeted espionage groups attempted to obtain rogue SSL certificates from foreign public Certificate Authorities.",
      solution:
        "Published DNSSEC-signed CAA records restricting issuance strictly to National Informatics Centre (NIC) and configured automated Certificate Transparency log monitors.",
      outcome:
        "Foreign CAs legally prevented from issuing certificates; instant automated SOC alerts on unauthorized certificate probing."
    },
    kolkata_fintech_zero_downgrade: {
      id: "kolkata_fintech_zero_downgrade",
      title: "Salt Lake Sector V FinTech: TLS 1.3 Zero-Downgrade Enforcement",
      location: "High-volume banking ledger APIs processing ₹1,20,00,000 in hourly settlements",
      engineers: "Sukanta Hui (Lead Instructor) & Scholars",
      threatScenario:
        "Adversaries attempted handshake truncation and POODLE-style fallback injection against payment gateways.",
      solution:
        "Disabled all protocols below TLS 1.2, enforced AEAD ciphers only, configured `TLS_FALLBACK_SCSV`, and generated strong 4096-bit DH parameters.",
      outcome:
        "Achieved 100% A+ rating on Qualys SSL Labs; completely immune to version rollback and padding oracle exploits."
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
            <span>🛡️ Module 005_004 • Topic 11</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Protocol Downgrade Attacks &amp; Modern Hardening (HSTS)
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master version rollback attack mechanics (POODLE, FREAK, Logjam, DROWN), SSLstrip neutralization,
            HSTS preloading (RFC 6797), TLS_FALLBACK_SCSV (RFC 7507), CAA records, and modern HTTP security headers.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              SSLstrip &amp; HSTS Preloading
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              TLS_FALLBACK_SCSV (RFC 7507)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              POODLE • FREAK • Logjam • DROWN
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              CAA Records (RFC 8659)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Certificate Transparency (CT) &amp; SCTs
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
              🛡️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. Protocol Downgrade Vulnerabilities &amp; Defense Framework
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how active Man-in-the-Middle adversaries force legacy cryptographic rollbacks and how modern standards enforce zero-downgrade policies
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In enterprise cybersecurity across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, attackers rarely try to break 256-bit AES directly. Instead, they exploit{" "}
              <strong className="text-white">Protocol Downgrade Attacks</strong>—tampering with the unauthenticated handshake to force servers and clients
              down to broken legacy ciphers (512-bit export RSA, SSL 3.0 CBC mode, or plain HTTP via SSLstrip).
              Modern standards like <strong className="text-white">HSTS Preloading (RFC 6797)</strong>, <strong className="text-white">TLS_FALLBACK_SCSV (RFC 7507)</strong>,
              and <strong className="text-white">CAA (RFC 8659)</strong> eliminate these attack surfaces permanently.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🚀</span> 1. HSTS Preloading
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hardcodes HTTPS enforcement directly into browser source code, eliminating the initial unencrypted HTTP request that enables SSLstrip.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>🔒</span> 2. TLS_FALLBACK_SCSV
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Prevents retry downgrade attacks by signaling when a client retries with an older protocol version despite supporting higher standards.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>📜</span> 3. CAA &amp; CT Merkle Logs
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  DNS-level restriction specifying authorized CAs, backed by public append-only Certificate Transparency Merkle logs and SCT validation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE SSLSTRIP VS HSTS PRELOAD SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚡
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive SSLstrip Attack vs HSTS Preload Simulator
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate Man-in-the-Middle traffic interception on public Wi-Fi vs browser-internal 307 HSTS redirection
                </p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 text-xs">
              <input
                type="checkbox"
                checked={isHstsPreloaded}
                onChange={(e) => setIsHstsPreloaded(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              /&gt;
              <span className="text-slate-300 font-semibold">Enable Domain in HSTS Preload List</span>
            </label>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 font-sans flex items-center justify-between">
                  <span>1. Client Browser Execution</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Local Cache</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>Input URL   : <span className="text-cyan-300">http://barrackpore.gov.in</span></div>
                  <div>HSTS State  : <span className={clsx(isHstsPreloaded ? "text-emerald-400 font-bold" : "text-rose-400 font-bold")}>
                    {isHstsPreloaded ? "PRELOADED (Hardcoded in Chrome/Firefox)" : "NOT PRELOADED (Standard TOFU)"}
                  </span></div>
                  <div>Resolution  : <span className="text-white">{sslStripResult.trafficState}</span></div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 font-sans flex items-center justify-between">
                  <span>2. Network Wire &amp; Attacker Scope</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Wi-Fi Air Interface</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>Wire Traffic: <span className="text-white">{sslStripResult.wireTransmission}</span></div>
                  <div>MitM Impact : <span className="text-white">{sslStripResult.attackerImpact}</span></div>
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", sslStripResult.badgeColor)}>
              <div className="font-bold flex items-center gap-2">
                <span>{isHstsPreloaded ? "✔" : "🚨"}</span>
                <span>{sslStripResult.status}</span>
              </div>
              <p className="opacity-90 font-sans text-[11px]">
                {sslStripResult.verdict}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: HISTORIC TLS DOWNGRADE ATTACKS & FALLBACK SCSV MATRIX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                📉
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Historic TLS Downgrade Attacks &amp; Fallback SCSV Matrix
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze vulnerability mechanisms for POODLE, FREAK, Logjam, and DROWN, and understand how TLS_FALLBACK_SCSV blocks forced rollbacks
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              RFC 7507 Enforced
            </span>
          </div>

          {/* Attack Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.entries(downgradeAttacks).map(([key, item]) => {
              const isActive = selectedAttackKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAttackKey(key)}
                  className={clsx(
                    "text-left p-3 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                &gt;
                  <span className="font-bold">{item.name.split(" (")[0]}</span>
                  <span className={clsx("text-[10px] px-2 py-0.5 rounded w-fit border", item.badgeColor)}>
                    {item.cve}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Attack Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{currentAttack.name}</h3>
                <span className="text-[11px] text-slate-400 font-sans">Target: {currentAttack.targetProtocol}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded text-xs font-bold border", currentAttack.badgeColor)}>
                {currentAttack.cve}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-rose-400 font-sans">Exploit Mechanism:</div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{currentAttack.exploitMechanism}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-400 font-sans">Mandatory Hardening &amp; Remediation:</div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{currentAttack.mitigation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: AUTOMATED HTTP SECURITY HEADER & CAA GENERATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚙️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Automated HTTP Security Header &amp; CAA Generator
                </h2>
                <p className="text-sm text-slate-400">
                  Configure HSTS, CSP, CAA records, and generate hardened Nginx configuration blocks with live security scoring
                </p>
              </div>
            </div>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", securityScore.color)}>
              Score: {securityScore.score}/100 • {securityScore.grade}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {/* Interactive Toggle Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={includeSubdomains}
                  onChange={(e) => setIncludeSubdomains(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">HSTS includeSubDomains</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={enablePreload}
                  onChange={(e) => setEnablePreload(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">HSTS preload directive</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={enableCsp}
                  onChange={(e) => setEnableCsp(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">Content-Security-Policy (CSP)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={enableNosniff}
                  onChange={(e) => setEnableNosniff(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">X-Content-Type-Options: nosniff</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={enableCaaRecord}
                  onChange={(e) => setEnableCaaRecord(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                /&gt;
                <span className="text-slate-300">Generate DNS CAA Record (Restrict CA Issuance)</span>
              </label>
            </div>

            {/* Generated Production Nginx / DNS Mockup */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>/etc/nginx/conf.d/hardened_security.conf (Generated Template)</span>
                <span className="text-cyan-400">nginx -t</span>
              </div>
              <pre className="p-4 text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
{`# Production Hardened HTTP Security Headers
add_header Strict-Transport-Security "max-age=31536000${includeSubdomains ? "; includeSubDomains" : ""}${enablePreload ? "; preload" : ""}" always;
${enableCsp ? "add_header Content-Security-Policy \"default-src 'self'; script-src 'self' https://trusted.cdn.gov.in; object-src 'none'; frame-ancestors 'none';\" always;" : "# CSP disabled"}
${enableNosniff ? "add_header X-Content-Type-Options \"nosniff\" always;" : "# nosniff disabled"}
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;

# SSL/TLS Protocol & Cipher Lockdown
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;
ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305';

${enableCaaRecord ? `# DNS Zone CAA Record (barrackpore.gov.in):
# barrackpore.gov.in. IN CAA 0 issue "letsencrypt.org"
# barrackpore.gov.in. IN CAA 0 issuewild ";"
# barrackpore.gov.in. IN CAA 0 iodef "mailto:security-alerts@barrackpore.gov.in"` : ""}`}
              </pre>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & OPENSSL CLI AUDITING LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; OpenSSL Diagnostic Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world downgrade mitigation deployments in West Bengal and inspect live `openssl` handshake audits
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
                  <span>🚨</span> Vulnerability &amp; Downgrade Vector:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> Protocol Hardening Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux OpenSSL Handshake Verification Mockup */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-soc: ~ (Testing Insecure Protocol Rejection)</span>
                <span className="text-cyan-400">openssl s_client -tls1</span>
              </div>
              <div className="p-4 space-y-1 text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-emerald-400 font-bold">$ openssl s_client -connect treasury.barrackpore.gov.in:443 -tls1</span></div>
                <div>CONNECTED(00000003)</div>
                <div>140211831:error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version:../ssl/record/rec_layer_s3.c:1544:SSL alert number 70</div>
                <div><span className="text-rose-400 font-bold">--- No peer certificate available (Insecure TLS 1.0 Rejected! ✔) ---</span></div>
                <div><span className="text-emerald-400 font-bold">$ openssl s_client -connect treasury.barrackpore.gov.in:443 -tls1_3</span></div>
                <div>New, TLSv1.3, Cipher is <span className="text-cyan-300 font-bold">TLS_AES_256_GCM_SHA384</span></div>
                <div>Secure renegotiation IS supported. HSTS Preload Verified.</div>
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
                <span><strong>Accidental `includeSubDomains` Deployment:</strong> Adding this directive before securing all internal legacy subdomains will cause immediate permanent outages for users on those subdomains.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Relying on Standard HSTS without Preloading:</strong> Leaves the user vulnerable to SSLstrip on their very first connection (TOFU gap) on untrusted public Wi-Fi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Reusing Private Keys Across Protocols:</strong> Sharing an RSA certificate between modern TLS web servers and legacy mail servers exposes the web server to DROWN cross-protocol attacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Failing to Configure `TLS_FALLBACK_SCSV`:</strong> Allows MitM attackers to deliberately sever handshakes to force downgrade retries.</span>
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
                <span><strong>Submit Domain to HSTS Preload List:</strong> Guarantees that Chrome, Firefox, and Safari never make unencrypted HTTP connections to your domain.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Publish Strict DNS CAA Records:</strong> Restrict public certificate issuance strictly to authorized CAs (e.g., Let's Encrypt / NIC).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Disable SSLv2, SSLv3, TLS 1.0, and TLS 1.1:</strong> Support TLS 1.2 and TLS 1.3 exclusively with AEAD cipher suites.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Deploy Robust Content Security Policy (CSP):</strong> Disables inline scripts and restricts resource loading to defeat XSS and clickjacking.</span>
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
                Why is HSTS preloading necessary? If a server responds with `Strict-Transport-Security: max-age=31536000`, the browser only learns this AFTER the first visit.
                If an attacker sits on the Wi-Fi during that first visit, they strip the header completely! Preload solves this by shipping the header inside the browser binary before the user ever types the URL!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>HSTS header requires `max-age=31536000`, `includeSubDomains`, and `preload`.</li>
                <li>TLS_FALLBACK_SCSV (RFC 7507) blocks forced version downgrade retries.</li>
                <li>POODLE exploited SSL 3.0 CBC padding; FREAK exploited 512-bit export RSA.</li>
                <li>CAA DNS records prevent unauthorized CAs from issuing rogue certificates.</li>
                <li>Certificate Transparency (CT) uses SCTs to prove certificates were publicly logged.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on Protocol Downgrade &amp; HSTS Auditor Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating SSLstrip attacks, HSTS preload internal redirects, and TLS_FALLBACK_SCSV defense
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={downgradeMitigationAuditorPy}
            title="downgrade_mitigation_auditor.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Protocol Downgrade Attacks &amp; Modern Hardening (HSTS) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Understand how Moxie Marlinspike's SSLstrip works by intercepting 301/302 HTTP redirects, and why HSTS Preload (RFC 6797) is the only definitive defense that eliminates the TOFU first-connection vulnerability. Be able to name and describe historic downgrade attacks (POODLE on SSLv3 CBC padding, FREAK on 512-bit export RSA, Logjam on export DH, and DROWN on SSLv2 key reuse). Always explain TLS_FALLBACK_SCSV (RFC 7507) and DNS CAA records (RFC 8659) for full marks!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 11: Protocol Downgrade Attacks &amp; HSTS Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 11 Note"
            downloadFileName="topic11_protocol_downgrade_and_hsts_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
