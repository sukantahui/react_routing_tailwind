import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import httpsSecurityAuditorPy from "./topic4_files/https_security_auditor.py?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgWireInspectorId = useId();
  const svgCertHierarchyId = useId();

  // Studio 1: Wire Inspector Protocol State
  const [wireProtocolMode, setWireProtocolMode] = useState("https_port_443"); // "http_port_80", "https_port_443"

  // Studio 2: Live X.509 PKI Validator State
  const [certTestScenario, setCertTestScenario] = useState("valid_cert"); // "valid_cert", "expired_date", "san_mismatch", "untrusted_root", "revoked_ocsp"

  // Studio 3: Security Header Generator State
  const [enableHsts, setEnableHsts] = useState(true);
  const [enableHstsSubdomains, setEnableHstsSubdomains] = useState(true);
  const [enableHstsPreload, setEnableHstsPreload] = useState(true);
  const [enableCsp, setEnableCsp] = useState(true);
  const [enableNoSniff, setEnableNoSniff] = useState(true);
  const [enableDnsCaa, setEnableDnsCaa] = useState(true);

  // Studio 4: Regional SOC Case Studies State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_tax_hsts_preload");

  // Studio 2: PKI Scenario Database
  const certScenarios = {
    valid_cert: {
      title: "1. Valid & Authenticated Certificate Chain",
      issuer: "DigiCert Global Root CA ➔ Intermediate CA-G2",
      domain: "treasury.barrackpore.gov.in",
      sanList: "treasury.barrackpore.gov.in, bank.barrackpore.gov.in",
      validityDates: "Jan 1 2026 to Jan 1 2027 (Current)",
      ocspStatus: "GOOD (Active / Not Revoked)",
      isPassed: true,
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      verdict: "✔ VALID & TRUSTED: Browser displays secure padlock. All 4 checks pass.",
      technicalDetail: "Chain anchors in OS trust store; requested domain matches SAN; system time falls within validity window."
    },
    expired_date: {
      title: "2. Expired Validity Period (CERT_DATE_INVALID)",
      issuer: "Let's Encrypt Authority X3 ➔ ISRG Root X1",
      domain: "treasury.barrackpore.gov.in",
      sanList: "treasury.barrackpore.gov.in",
      validityDates: "Jan 1 2024 to Apr 1 2024 (EXPIRED!)",
      ocspStatus: "UNKNOWN (Expired)",
      isPassed: false,
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      verdict: "❌ FAILED: Browser blocks connection with 'SEC_ERROR_EXPIRED_CERTIFICATE'.",
      technicalDetail: "Current date is after NotAfter timestamp. ACME automated renewal failed to execute."
    },
    san_mismatch: {
      title: "3. Hostname Mismatch (SSL_ERROR_BAD_CERT_DOMAIN)",
      issuer: "DigiCert Global Root CA ➔ Intermediate CA-G2",
      domain: "treasury.barrackpore.gov.in",
      sanList: "mail.barrackpore.gov.in, portal.barrackpore.gov.in",
      validityDates: "Jan 1 2026 to Jan 1 2027 (Current)",
      ocspStatus: "GOOD (Active)",
      isPassed: false,
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      verdict: "❌ FAILED: Browser warns 'Your connection is not private (Common Name Mismatch)'.",
      technicalDetail: "URL hostname 'treasury' is not present in the Subject Alternative Name (SAN) extension."
    },
    untrusted_root: {
      title: "4. Self-Signed Untrusted Root CA (MOZILLA_PKIX_ERROR_SELF_SIGNED)",
      issuer: "Self-Signed CA ('Barrackpore-Internal-Test-CA')",
      domain: "treasury.barrackpore.gov.in",
      sanList: "treasury.barrackpore.gov.in",
      validityDates: "Jan 1 2026 to Jan 1 2027 (Current)",
      ocspStatus: "N/A (No public OCSP responder)",
      isPassed: false,
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      verdict: "❌ FAILED: Browser blocks with 'Self-Signed Certificate in Certificate Chain'.",
      technicalDetail: "Root CA certificate is not installed in the browser/operating system public trust store."
    },
    revoked_ocsp: {
      title: "5. Revoked Certificate (SEC_ERROR_REVOKED_CERTIFICATE)",
      issuer: "DigiCert Global Root CA ➔ Intermediate CA-G2",
      domain: "treasury.barrackpore.gov.in",
      sanList: "treasury.barrackpore.gov.in",
      validityDates: "Jan 1 2026 to Jan 1 2027 (Current)",
      ocspStatus: "REVOKED (Key Compromise Alert)",
      isPassed: false,
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      verdict: "❌ FAILED: Browser blocks immediately via OCSP Stapling revocation proof.",
      technicalDetail: "CA marked certificate as compromised; OCSP response indicates serial number is permanently revoked."
    }
  };

  const currentCert = certScenarios[certTestScenario];

  // Studio 3: SSL Labs Scoring & Header Generator
  const headerScoreResult = useMemo(() => {
    let score = 0;
    const activeHeaders = [];

    if (enableHsts) {
      score += 40;
      let hstsString = "Strict-Transport-Security: max-age=31536000";
      if (enableHstsSubdomains) {
        score += 10;
        hstsString += "; includeSubDomains";
      }
      if (enableHstsPreload) {
        score += 15;
        hstsString += "; preload";
      }
      activeHeaders.push(hstsString);
    }

    if (enableCsp) {
      score += 15;
      activeHeaders.push("Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'");
    }

    if (enableNoSniff) {
      score += 10;
      activeHeaders.push("X-Content-Type-Options: nosniff");
    }

    if (enableDnsCaa) {
      score += 10;
    }

    let grade = "F";
    let badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    if (score >= 95) {
      grade = "A+ (Maximum Hardening)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else if (score >= 80) {
      grade = "A (Strong Security)";
      badgeColor = "bg-cyan-950 text-cyan-300 border-cyan-700";
    } else if (score >= 60) {
      grade = "B (Moderate Security)";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
    }

    return {
      score,
      grade,
      badgeColor,
      activeHeaders,
      sslStrippingProtected: enableHsts && enableHstsPreload
    };
  }, [enableHsts, enableHstsSubdomains, enableHstsPreload, enableCsp, enableNoSniff, enableDnsCaa]);

  // Studio 4: Regional SOC Case Studies Data
  const regionalDrills = {
    barrackpore_tax_hsts_preload: {
      id: "barrackpore_tax_hsts_preload",
      title: "Barrackpore Tax Assessment Portal: HSTS Preload Hardening",
      location: "Barrackpore Municipal Core serving 350,000 citizens in North 24 Parganas",
      threatScenario:
        "Susmita and Mamata proved that attackers on public Wi-Fi in local railway station cafes could execute 'sslstrip', intercepting the initial unencrypted HTTP request before the browser redirected to HTTPS.",
      solution:
        "Sukanta Hui configured HSTS with 'max-age=31536000; includeSubDomains; preload' and submitted the municipal domain to the global Chromium HSTS Preload List.",
      outcome:
        "Browsers now open HTTPS directly without ever transmitting an initial cleartext HTTP request; 100% immune to SSL stripping attacks on any network."
    },
    kolkata_fintech_caa_ct_monitoring: {
      id: "kolkata_fintech_caa_ct_monitoring",
      title: "Salt Lake Sector V FinTech Exchange: DNS CAA & CT Monitoring",
      location: "Sector V FinTech Core processing 15,000 algorithmic stock orders/sec",
      threatScenario:
        "Debangshu and Mahima audited rogue CA risks, identifying that an overseas compromised CA could issue an unauthorized certificate for their domain.",
      solution:
        "Published DNS CAA records restricting issuance strictly to 'digicert.com' and deployed automated Certificate Transparency (CT) Merkle tree log monitors.",
      outcome:
        "Automated alerts trigger in < 60 seconds if any rogue CA attempts to generate a certificate; zero spoofing risk; full compliance under RBI FinTech guidelines."
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
            <span>🛡️ Module 005_004 • Topic 4</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            HTTPS (HTTP over TLS): Port 443 &amp; Web Encryption
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master web application encryption: X.509 PKI trust validation, HSTS Preloading against SSL Stripping,
            DNS CAA policies, and Certificate Transparency monitoring.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Port 80 vs Port 443
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              X.509 PKI Validation Chain
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              HSTS &amp; SSL Stripping Defense
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              DNS CAA &amp; CT Logs
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
                1. The HTTPS Architecture: Securing the Global Web
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how HTTP is encrypted inside TLS sockets on Port 443 to protect user privacy and financial integrity
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In production web applications across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, <strong className="text-white">HTTPS (RFC 2818 / RFC 9110)</strong> is
              the cornerstone of web security. By executing standard HTTP semantics inside an encrypted TLS tunnel on TCP Port 443,
              HTTPS guarantees that all request paths, query parameters, authentication cookies, and JSON payloads remain
              100% confidential and tamper-proof.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔒</span> 1. End-to-End Encryption
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full URLs, session cookies, passwords, and banking JSON payloads are 100% encrypted. ISPs see only the
                  destination IP and Port 443.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>📜</span> 2. X.509 PKI Trust Anchor
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Web browsers validate identity via hierarchical Root CAs, Subject Alternative Names (SAN), and automated
                  ACME 60-day renewal lifecycles.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🛡️</span> 3. Web Hardening Headers
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  HSTS Preload stops SSL Stripping on the very first visit; DNS CAA records and CT logs prevent rogue CA
                  spoofing permanently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE HTTP (PORT 80) VS HTTPS (PORT 443) WIRE INSPECTOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🕵️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: HTTP (Port 80) vs HTTPS (Port 443) Wire Inspector
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect raw network packets and see exactly what passive eavesdroppers capture on Port 80 vs Port 443
                </p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setWireProtocolMode("http_port_80")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  wireProtocolMode === "http_port_80"
                    ? "bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Cleartext HTTP (Port 80)
              </button>
              <button
                onClick={() => setWireProtocolMode("https_port_443")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  wireProtocolMode === "https_port_443"
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Encrypted HTTPS (Port 443)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {wireProtocolMode === "https_port_443"
                  ? "Encrypted HTTPS Packet Stream (TLS 1.3 / AES-256-GCM)"
                  : "Unencrypted Plaintext HTTP Packet Stream (Vulnerable!)"}
              </h3>
              <span className={clsx(
                "px-3 py-1 rounded-full text-xs font-bold border",
                wireProtocolMode === "https_port_443"
                  ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                  : "bg-rose-950 text-rose-300 border-rose-700"
              )}>
                {wireProtocolMode === "https_port_443" ? "✔ 100% ENCRYPTED" : "🚨 CLEARTEXT EXPOSED"}
              </span>
            </div>

            {/* Simulated Wireshark Packet Sniffer View */}
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Network Sniffer Captured Frame:
              </div>
              {wireProtocolMode === "https_port_443" ? (
                <div className="space-y-1 text-slate-300 leading-relaxed">
                  <p><span className="text-cyan-400">Outer IP:</span> 192.168.1.45 ➔ 203.0.113.10 | <span className="text-cyan-400">TCP Port:</span> 443 (HTTPS)</p>
                  <p><span className="text-indigo-400">TLS Record:</span> ContentType: ApplicationData (23) | Length: 1420 Bytes</p>
                  <p><span className="text-emerald-400">Ciphertext:</span> 4a 1f 88 bc 3d 44 ae 77 fa 90 12 55 66 aa bb cc dd ee ff 01 ...</p>
                  <p><span className="text-rose-400">AEAD Tag:</span> 9b 3d 44 ae 55 66 77 88 11 22 33 44 55 66 77 88 (128-bit GHASH)</p>
                  <p className="text-[11px] text-slate-400 pt-1 font-sans">
                    ✔ Result: Session cookies, passwords, and JSON API bodies are 100% unreadable to ISPs and sniffers.
                  </p>
                </div>
              ) : (
                <div className="space-y-1 text-rose-300 leading-relaxed">
                  <p><span className="text-cyan-400">Outer IP:</span> 192.168.1.45 ➔ 203.0.113.10 | <span className="text-cyan-400">TCP Port:</span> 80 (HTTP)</p>
                  <p className="text-yellow-300">POST /api/v1/pension_disburse HTTP/1.1</p>
                  <p>Host: treasury.barrackpore.gov.in</p>
                  <p>Cookie: <span className="text-rose-400 font-bold bg-rose-950 px-1 rounded">session_id=SECRET_TOKEN_88AF19</span> (STOLEN!)</p>
                  <p>Authorization: Bearer <span className="text-rose-400 font-bold bg-rose-950 px-1 rounded">eyJhGciOi...</span> (LEAKED!)</p>
                  <p>Payload: { "{" } &quot;account_number&quot;: &quot;884129&quot;, &quot;amount&quot;: 50000 { "}" }</p>
                  <p className="text-[11px] text-rose-400 pt-1 font-sans font-bold">
                    🚨 CRITICAL: Anyone on public Wi-Fi captured your credentials and financial data in cleartext!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE X.509 CERTIFICATE CHAIN & PKI TRUST VALIDATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 text-xl">
                📜
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Live X.509 PKI Trust &amp; Certificate Chain Validator
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate different certificate states to see how browsers enforce the 4-step validation pipeline
                </p>
              </div>
            </div>

            {/* Scenario Switcher */}
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(certScenarios).map((key) => {
                const item = certScenarios[key];
                return (
                  <button
                    key={key}
                    onClick={() => setCertTestScenario(key)}
                    className={clsx(
                      "px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                      certTestScenario === key
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(". ")[1].split(" (")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{currentCert.title}</h3>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", currentCert.badgeColor)}>
                {currentCert.isPassed ? "✔ TRUSTED" : "❌ REJECTED"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Issuer CA Chain:</span>
                <div className="font-bold text-white text-[11px]">{currentCert.issuer}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">SAN Domain Match:</span>
                <div className="font-bold text-cyan-300 text-[11px]">{currentCert.sanList}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">Validity Period:</span>
                <div className="font-bold text-amber-300 text-[11px]">{currentCert.validityDates}</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400">OCSP Revocation Status:</span>
                <div className="font-bold text-emerald-300 text-[11px]">{currentCert.ocspStatus}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-white">{currentCert.verdict}</p>
              <p className="text-slate-400">{currentCert.technicalDetail}</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: WEB SECURITY HARDENING HEADER GENERATOR & SSL LABS SCORER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              🛡️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 3: Web Security Hardening Header Generator &amp; SSL Labs Scorer
              </h2>
              <p className="text-sm text-slate-400">
                Configure HSTS Preload, CSP, and DNS CAA policies to achieve an A+ rating and eliminate SSL Stripping
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Header Toggles */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Security Headers &amp; Policies:
              </label>
              <div className="space-y-1.5 text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableHsts}
                    onChange={(e) => setEnableHsts(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Enable HSTS (Strict-Transport-Security: max-age=31536000)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer pl-4">
                  <input
                    type="checkbox"
                    checked={enableHstsSubdomains}
                    disabled={!enableHsts}
                    onChange={(e) => setEnableHstsSubdomains(e.target.checked)}
                    className="accent-emerald-500 rounded disabled:opacity-30"
                  />
                  <span>HSTS includeSubDomains (Protects *.barrackpore.gov.in)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer pl-4">
                  <input
                    type="checkbox"
                    checked={enableHstsPreload}
                    disabled={!enableHsts}
                    onChange={(e) => setEnableHstsPreload(e.target.checked)}
                    className="accent-emerald-500 rounded disabled:opacity-30"
                  />
                  <span>HSTS Preload (Hardcoded in Chrome/Firefox browsers)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableCsp}
                    onChange={(e) => setEnableCsp(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Content-Security-Policy (Mitigates XSS)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableNoSniff}
                    onChange={(e) => setEnableNoSniff(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>X-Content-Type-Options: nosniff (Blocks MIME confusion)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableDnsCaa}
                    onChange={(e) => setEnableDnsCaa(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>Publish DNS CAA Records (Restricts authorized CAs)</span>
                </label>
              </div>
            </div>

            {/* SSL Labs Score & NGINX Output */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">SSL Labs Security Rating:</span>
                <span className={clsx("font-bold px-2.5 py-0.5 rounded text-xs border", headerScoreResult.badgeColor)}>
                  Grade: {headerScoreResult.grade} ({headerScoreResult.score}/100)
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">SSL Stripping Resilience:</span>
                <span className="font-bold text-emerald-400">
                  {headerScoreResult.sslStrippingProtected ? "✔ 100% IMMUNE (Preloaded)" : "⚠️ VULNERABLE ON FIRST VISIT"}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Generated NGINX Configuration:
                </div>
                <pre className="bg-slate-900 p-2.5 rounded font-mono text-[10px] text-slate-300 overflow-x-auto">
                  {headerScoreResult.activeHeaders.map((h, idx) => `add_header ${h} always;\n`).join("") || "# No security headers enabled\n"}
                </pre>
              </div>
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
                2. Real-World Web Encryption Implementations
              </h2>
              <p className="text-sm text-slate-400">
                How enterprise architects configure and audit HTTPS infrastructure across West Bengal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🏛️</span> Scenario 1: Municipal Tax Portal HSTS Preload
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  HSTS Preload
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita and Mamata hardened public tax payment portals against SSL stripping on cafe Wi-Fi.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Fix: Submitted &apos;barrackpore.gov.in&apos; to the global Chromium HSTS Preload list with max-age=31536000.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Browsers open HTTPS directly on the very first visit; 100% immune to sslstrip.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🔒</span> Scenario 2: FinTech DNS CAA Authorization
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  DNS CAA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu and Mahima protected stock exchange APIs in Sector V from rogue CA certificate generation.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Fix: Configured DNS CAA records: &apos;issue &quot;digicert.com&quot;&apos; and &apos;iodef &quot;mailto:soc@fintech.in&quot;&apos;.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Unauthorized CAs must refuse certificate generation requests; automated SOC alerts.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🤖</span> Scenario 3: Automated ACME 60-Day Renewals
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  ACME Bot
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila manages 250 microservices endpoints across North 24 Parganas.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Fix: Deployed Certbot ACME daemon with automated DNS-01 challenge verification and 60-day renewal cycles.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> 100% elimination of certificate expiration outages; zero manual intervention.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>⚡</span> Scenario 4: OCSP Stapling Performance Optimization
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  OCSP Stapling
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Mobile shoppers in Ichapur experienced 120ms delays when browsers contacted external CA OCSP responders.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Fix: Enabled &apos;ssl_stapling on;&apos; on central load balancers to deliver pre-signed OCSP validity proofs.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Handshake connection delay slashed by 120ms; protected user privacy from third-party CA tracking.
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
                  Studio 4: Regional West Bengal SOC Case Studies &amp; HTTPS Drills
                </h2>
                <p className="text-sm text-slate-400">
                  Real-world web security hardening and certificate management in Barrackpore &amp; Kolkata
                </p>
              </div>
            </div>

            {/* Drill Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveDrillKey("barrackpore_tax_hsts_preload")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_tax_hsts_preload"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore Tax HSTS Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_fintech_caa_ct_monitoring")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_fintech_caa_ct_monitoring"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Sector V DNS CAA Drill
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
                3. Programmatic HTTPS Security Header &amp; PKI Auditor (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Audit X.509 certificate chains, validate SAN hostnames, and score HSTS security headers in Python
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={httpsSecurityAuditorPy}
            title="https_security_auditor.py"
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
                Essential HTTPS hardening habits, common beginner misconceptions, and revision points
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
                <strong className="text-white">1. Always Preload HSTS:</strong>
                <p className="text-slate-400">
                  Submit your domain to &apos;hstspreload.org&apos;. This hardcodes the HTTPS mandate into browser source code,
                  permanently eliminating the first-visit SSL stripping vulnerability.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Publish DNS CAA Records:</strong>
                <p className="text-slate-400">
                  Add CAA records to your authoritative DNS server to restrict certificate issuance strictly to your
                  chosen CA, blocking rogue CA spoofing.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Automate 60-Day Renewals with ACME:</strong>
                <p className="text-slate-400">
                  Never rely on manual calendar reminders to renew certificates. Deploy Certbot with cron jobs to renew
                  certificates 30 days before expiration automatically.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Enable OCSP Stapling on Reverse Proxies:</strong>
                <p className="text-slate-400">
                  Configure &apos;ssl_stapling on;&apos; in NGINX so your server delivers pre-signed validity proofs,
                  saving users 120ms of lookup delay and protecting their privacy.
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
                <strong className="text-rose-300">Misconception 1: "HTTPS hides what website domain you are visiting."</strong>
                <p className="text-slate-400">
                  The destination IP and SNI domain name remain visible to your ISP in standard HTTPS unless Encrypted
                  Client Hello (ECH) is enabled.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "Redirecting Port 80 to 443 makes HSTS unnecessary."</strong>
                <p className="text-slate-400">
                  Without HSTS, an attacker on public Wi-Fi can intercept the initial HTTP request and strip the redirect,
                  keeping the victim on cleartext HTTP (sslstrip).
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Active Mixed Content in Production:</strong>
                <p className="text-slate-400">
                  Loading an unencrypted JavaScript file over &apos;http://&apos; on an HTTPS page causes modern browsers
                  to block the script completely, breaking application functionality.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Relying on Common Name (CN) Instead of SAN:</strong>
                <p className="text-slate-400">
                  Modern browsers mandate checking the Subject Alternative Name (SAN) extension. A certificate without
                  SAN entries will be rejected as invalid.
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
              <li><strong className="text-cyan-200">Think about:</strong> Why does an attacker on public Wi-Fi easily steal session cookies on Port 80 but captures only encrypted ciphertext on Port 443?</li>
              <li><strong className="text-cyan-200">Observe carefully:</strong> How the 4-step certificate validation in Studio 2 catches expired dates and SAN hostname mismatches.</li>
              <li><strong className="text-cyan-200">Try changing this:</strong> Enable HSTS Preload in Studio 3 to see your SSL Labs rating climb to a perfect A+ grade.</li>
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
                <span>Explain the architecture of HTTPS on Port 443 vs Port 80</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe the 4-step X.509 certificate validation pipeline</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain how HSTS Preloading permanently prevents SSL Stripping</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe the purpose of DNS CAA records and Certificate Transparency</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="HTTPS (HTTP over TLS): Port 443 & Web Encryption FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="HTTPS Web Encryption Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic4_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="HTTPS on Port 443 is the foundation of modern digital trust. However, deploying an SSL certificate is only the first step in securing a web portal. A truly hardened web application enforces defense-in-depth: deploying HSTS with browser preloading to kill SSL stripping on public Wi-Fi, publishing DNS CAA records to prevent unauthorized CAs from forging certificates, and enabling OCSP Stapling so user privacy is protected. Always remember Sukanta Hui's golden rule of web architecture: Never leave security to chance—automate your ACME certificate renewals so human forgetfulness never brings down your enterprise services!"
        />

      </div>
    </div>
  );
};

export default Topic4;
