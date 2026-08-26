import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic5_files/app_gateway.py?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgDualSessionId = useId();
  const svgForwardReverseId = useId();

  // Studio 1: Active L7 Parser Tab Selection
  const [selectedParserTab, setSelectedParserTab] = useState("uri_normalization");

  // Studio 2: Live L7 HTTP Exploit Simulator State
  const [selectedHttpScenario, setSelectedHttpScenario] = useState("sqli_in_uri");
  const [tlsDecryptionActive, setTlsDecryptionActive] = useState(true);
  const [dlpMaskingActive, setDlpMaskingActive] = useState(true);

  // Studio 3: Proxy Sizing & RAM Buffering Calculator
  const [requestsPerSecond, setRequestsPerSecond] = useState(15000); // 1,000 to 50,000 RPS
  const [avgRequestBodyKB, setAvgRequestBodyKB] = useState(64); // 8 to 512 KB
  const [tlsKeyLengthBits, setTlsKeyLengthBits] = useState(2048); // 2048 or 4096 bits

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_egov_proxy");

  // L7 Parser Features Database for Studio 1
  const parserFeatures = {
    uri_normalization: {
      key: "uri_normalization",
      title: "1. URI Decoding & Path Normalization",
      operatingScope: "Layer 7 URI Engine",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Decodes double-URL-encoding (`%2527` ➔ `%27` ➔ `'`), Unicode variations, and directory traversal tokens (`/../..`) before evaluating security rules.",
      securityValue: "Neutralizes obfuscated SQL injection and directory traversal attacks designed to bypass naive regex filters.",
      example: "GET /search?q=admin%2527%20UNION%20SELECT ➔ Normalized to: admin' UNION SELECT"
    },
    verb_filtering: {
      key: "verb_filtering",
      title: "2. HTTP Verb & Method Whitelisting",
      operatingScope: "HTTP Protocol Grammar",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "Enforces strict method whitelisting (permits only `GET`, `POST`, and `HEAD`). All unapproved verbs (`TRACE`, `DELETE`, `PUT`, `CONNECT`) are rejected with HTTP 405.",
      securityValue: "Prevents Cross-Site Tracing (XST) cookie theft and unauthorized remote file modifications on origin servers.",
      example: "TRACE /debug HTTP/1.1 ➔ Blocked with HTTP 405 Method Not Allowed"
    },
    header_sanitization: {
      key: "header_sanitization",
      title: "3. Header Sanitization & Server Masking",
      operatingScope: "Egress Response Filtering",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "Strips identifying server response headers (`Server: Apache/2.4.41`, `X-Powered-By: PHP/7.4.3`) and appends `X-Forwarded-For` with client IP.",
      securityValue: "Denies attackers the software version fingerprinting needed to launch version-specific zero-day exploits.",
      example: "Response: Server: Apache/2.4.41 ➔ Rewritten to: Server: SecureProxy/1.0"
    },
    mime_magic_check: {
      key: "mime_magic_check",
      title: "4. Binary Magic-Byte MIME Verification",
      operatingScope: "Payload File Inspector",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description: "Inspects true binary file headers (magic bytes) rather than trusting client-supplied filename extensions or `Content-Type` headers.",
      securityValue: "Blocks malicious `.exe` or `.sh` files disguised as innocent `.jpg` or `.pdf` attachments.",
      example: "File: avatar.jpg [Magic bytes: 0x4D 0x5A ('MZ')] ➔ Blocked as executable!"
    }
  };

  // Studio 2: Live HTTP Scenario Database
  const httpScenarios = {
    valid_catalog_req: {
      id: "valid_catalog_req",
      label: "Legitimate Product Catalog Request (GET /api/catalog)",
      method: "GET",
      uri: "/api/v1/catalog?category=books",
      headers: { Host: "barrackpore.gov.in", "User-Agent": "Mozilla/5.0" },
      body: "",
      verdict: "PERMITTED (HTTP 200)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      analysis: "Clean HTTP syntax, valid method, no exploit signatures detected; forwarded to backend database tier."
    },
    sqli_in_uri: {
      id: "sqli_in_uri",
      label: "SQL Injection in URL Parameter (UNION SELECT)",
      method: "GET",
      uri: "/search?q=admin' UNION SELECT username,password_hash FROM users--",
      headers: { Host: "barrackpore.gov.in" },
      body: "",
      verdict: "BLOCKED (HTTP 403 Forbidden)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      analysis: "Layer 7 parser decoded URI and detected 'UNION SELECT' signature; connection dropped with HTTP 403 before touching database."
    },
    xss_in_post_body: {
      id: "xss_in_post_body",
      label: "Stored Cross-Site Scripting in JSON Body (<script>)",
      method: "POST",
      uri: "/api/v1/citizen-feedback",
      headers: { Host: "barrackpore.gov.in", "Content-Type": "application/json" },
      body: '{"citizen_name": "Mamata", "comment": "<script>alert(document.cookie)</script>"}',
      verdict: "BLOCKED (HTTP 403 Forbidden)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      analysis: "JSON payload parser detected unescaped `<script>` tag in JSON body; request blocked, preventing XSS infection."
    },
    forbidden_trace_verb: {
      id: "forbidden_trace_verb",
      label: "Prohibited HTTP TRACE Request (XST Recon Probe)",
      method: "TRACE",
      uri: "/debug/session",
      headers: { Host: "barrackpore.gov.in" },
      body: "",
      verdict: "BLOCKED (HTTP 405 Method Not Allowed)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      analysis: "HTTP verb TRACE violates method whitelist; rejected with HTTP 405 to prevent cookie theft."
    },
    malicious_exe_upload: {
      id: "malicious_exe_upload",
      label: "Disguised Executable Upload (Fake PDF with MZ Magic Bytes)",
      method: "POST",
      uri: "/api/v1/upload-document",
      headers: { Host: "barrackpore.gov.in", "Content-Type": "application/x-msdownload" },
      body: "BINARY_PE_HEADER_MZ_EXPLOIT_PAYLOAD",
      verdict: "BLOCKED (HTTP 415 Unsupported Media Type)",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
      analysis: "MIME validator identified executable payload; rejected with HTTP 415, protecting server filesystem."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedProxySizing = useMemo(() => {
    // RAM buffering requirement: RPS * avgRequestBodyKB in MB
    const activeBufferMB = Math.round((requestsPerSecond * avgRequestBodyKB) / 1024);

    // Required CPU Cores (assuming ~1,500 RPS per CPU core with TLS 2048-bit decryption)
    const coresMultiplier = tlsKeyLengthBits === 4096 ? 800 : 1500;
    const requiredCpuCores = Math.max(4, Math.ceil(requestsPerSecond / coresMultiplier));

    // Latency Overhead in milliseconds
    const latencyOverheadMs = (2.5 + (avgRequestBodyKB / 64) * 1.5 + (tlsKeyLengthBits === 4096 ? 4.0 : 1.5)).toFixed(1);

    // 5-Year Enterprise WAF/Proxy TCO (INR ₹ Lakhs)
    const applianceHardwareLakhs = (8.0 + requiredCpuCores * 0.6).toFixed(2);
    const annualWafLicenseLakhs = 3.2;
    const fiveYearTcoLakhs = (Number(applianceHardwareLakhs) + annualWafLicenseLakhs * 5).toFixed(2);

    return {
      activeBufferMB,
      requiredCpuCores,
      latencyOverheadMs,
      fiveYearTcoLakhs
    };
  }, [requestsPerSecond, avgRequestBodyKB, tlsKeyLengthBits]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_egov_proxy: {
      id: "barrackpore_egov_proxy",
      title: "Barrackpore Municipal E-Governance Reverse Proxy Gateway",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      architecture: "Dual NGINX/ModSecurity Reverse Application Proxy in DMZ",
      threatScenario: "Adversaries attempted heavily obfuscated SQL injection attacks inside citizen tax dispute web forms.",
      solution: "Sukanta Hui and Mamata deployed a Layer 7 Reverse Proxy terminating TLS. The proxy normalized JSON inputs, stripped server banners, and enforced strict schema validation, rejecting unapproved metacharacters.",
      outcome: "100% of obfuscated SQL injection payloads were blocked at the DMZ proxy before reaching internal database servers."
    },
    kolkata_academic_proxy: {
      id: "kolkata_academic_proxy",
      title: "Kolkata University Campus Forward Web Proxy (Squid)",
      location: "Salt Lake & Jadavpur Campus Networks, Kolkata, West Bengal",
      architecture: "Enterprise Forward Proxy with Active Directory SSO & Content Filtering",
      threatScenario: "Students on campus Wi-Fi attempted to download malware and access known credential harvesting phishing domains.",
      solution: "Mahima and Abhronila configured category-based URL filtering and ClamAV dynamic stream scanning on the forward proxy, blocking malicious `.exe` downloads and enforcing HTTP 407 authentication.",
      outcome: "Protected 8,500 daily student workstations from phishing and drive-by downloads with sub-15ms response times."
    }
  };

  const currentParser = parserFeatures[selectedParserTab];
  const currentScenario = httpScenarios[selectedHttpScenario];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_001 • Topic 5</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Application-Level Gateways (Proxy Firewalls)
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master OSI Layer 7 application defense. Understand <strong className="text-sky-400">Dual-Session Protocol Termination</strong>, Forward vs Reverse Proxy topologies, deep <strong className="text-emerald-400">SQLi/XSS payload sanitization</strong>, and SSL/TLS offloading engines.
          </p>
        </header>

        {/* SECTION 1: DUAL SESSION ARCHITECTURE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Dual-Session Layer 7 Protocol Termination &amp; Sanitization
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              How Application Proxies terminate client TLS handshakes, parse application grammars, and reconstruct clean outbound requests.
            </p>
          </div>

          {/* SVG 1: DUAL SESSION APPLICATION PROXY PIPELINE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Layer 7 Application Proxy Dual-Session Architecture
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Full L7 Protocol Reassembly</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgDualSessionId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Application-Level Gateway Dual-Session Diagram"
              >
                {/* CLIENT TIER */}
                <rect x="20" y="50" width="160" height="180" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  UNTRUSTED CLIENT
                </text>
                <text x="100" y="95" fill="#94a3b8" fontSize="8.5" textAnchor="middle">
                  198.51.100.25
                </text>
                <rect x="35" y="110" width="130" height="40" rx="4" fill="#1e293b" />
                <text x="100" y="128" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  HTTP GET Request
                </text>
                <text x="100" y="142" fill="#f87171" fontSize="7.5" textAnchor="middle">
                  Contains SQLi Parameter
                </text>
                <text x="100" y="180" fill="#7dd3fc" fontSize="8" textAnchor="middle">
                  Encrypted HTTPS (TLS)
                </text>

                {/* ARROW 1: CLIENT TO PROXY */}
                <path d="M 180 130 L 290 130" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="235" y="120" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SESSION 1: HTTPS
                </text>

                {/* APPLICATION PROXY GATEWAY */}
                <rect x="290" y="30" width="270" height="220" rx="10" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
                <text x="425" y="55" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                  APPLICATION PROXY (WAF/ALG)
                </text>
                <text x="425" y="70" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
                  Full Layer 7 Protocol Termination
                </text>

                {/* Step 1 */}
                <rect x="305" y="85" width="240" height="35" rx="5" fill="#312e81" />
                <text x="425" y="102" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  1. Terminates TLS &amp; Parses RFC 7230
                </text>
                <text x="425" y="114" fill="#c7d2fe" fontSize="7">
                  Decodes URI, JSON Body &amp; Headers
                </text>

                {/* Step 2 */}
                <rect x="305" y="125" width="240" height="40" rx="5" fill="#4c0519" stroke="#f43f5e" />
                <text x="425" y="142" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  2. SQLi / XSS / Verb Inspection
                </text>
                <text x="425" y="156" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Blocks Malicious Payload Strings!
                </text>

                {/* Step 3 */}
                <rect x="305" y="170" width="240" height="35" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="425" y="187" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
                  3. Request Reconstruction &amp; Sanitization
                </text>
                <text x="425" y="199" fill="#6ee7b7" fontSize="7">
                  Strips Server Fingerprints &amp; Injects XFF
                </text>

                {/* ARROW 2: PROXY TO ORIGIN */}
                <path d="M 560 130 L 670 130" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="615" y="120" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SESSION 2: Clean mTLS
                </text>

                {/* ORIGIN DATABASE / WEB SERVER */}
                <rect x="670" y="50" width="160" height="180" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="750" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ORIGIN WEB SERVER
                </text>
                <text x="750" y="95" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  10.10.4.50 (Internal DMZ)
                </text>
                <rect x="685" y="110" width="130" height="40" rx="4" fill="#064e3b" />
                <text x="750" y="128" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Clean HTTP Request
                </text>
                <text x="750" y="142" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Sanitized Syntax
                </text>
                <text x="750" y="180" fill="#fde68a" fontSize="8" textAnchor="middle">
                  Direct WAN Access Blocked!
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: L7 PROTOCOL PARSER INSPECTOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Application-Level Protocol Parser &amp; Sanitization Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the internal mechanics of Layer 7 protocol parsing, URI normalization, header stripping, and binary magic byte checks.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentParser.badgeColor)}>
              {currentParser.operatingScope}
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.values(parserFeatures).map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedParserTab(p.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedParserTab === p.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Parser Detail Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentParser.title}
                </h3>
                <span className="text-gray-400 font-sans">Operating Scope: {currentParser.operatingScope}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentParser.badgeColor)}>
                Active Engine
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Parser Engineering Mechanics:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentParser.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  ✔ Security Advantage:
                </span>
                <p className="text-emerald-200 leading-relaxed">{currentParser.securityValue}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 font-mono">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  🔍 Live Parser Example:
                </span>
                <p className="text-gray-300 text-xs break-all">{currentParser.example}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE HTTP EXPLOIT SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live L7 HTTP Exploit Sanitization &amp; WAF Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject various Layer 7 web exploit vectors and observe status codes, URI decoding, and header sanitization verdicts.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              L7 Proxy Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Injected HTTP Scenario:</label>
              <select
                value={selectedHttpScenario}
                onChange={(e) => setSelectedHttpScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                {Object.values(httpScenarios).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">SSL/TLS Decryption &amp; Offloading:</label>
              <button
                onClick={() => setTlsDecryptionActive(!tlsDecryptionActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  tlsDecryptionActive
                    ? "bg-purple-950/80 text-purple-300 border-purple-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              &gt;
                {tlsDecryptionActive ? "✔ TLS Decryption Active (L7 Inspected)" : "❌ TLS Pass-through (Blind)"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Response Data Loss Prevention (DLP):</label>
              <button
                onClick={() => setDlpMaskingActive(!dlpMaskingActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  dlpMaskingActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              &gt;
                {dlpMaskingActive ? "✔ Aadhaar/PAN DLP Masking Active" : "❌ DLP Masking Disabled"}
              </button>
            </div>
          </div>

          {/* Scenario Execution Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated HTTP Request:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentScenario.method} {currentScenario.uri}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentScenario.badgeColor
              )}>
                {currentScenario.verdict}
              </span>
            </div>

            {currentScenario.body && (
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-gray-300 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Inspected HTTP Request Body:</span>
                <div className="text-amber-300 break-all">{currentScenario.body}</div>
              </div>
            )}

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 font-sans">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Application Proxy Verdict &amp; Rationale:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentScenario.analysis}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: APP GATEWAY CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Layer 7 Application Proxy &amp; Sanitization Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python implementation demonstrating URI decoding, SQLi/XSS regex inspection, method filtering, and header sanitization.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              app_gateway.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="app_gateway.py"
            highlightLines={[25, 41, 53, 67]}
          />
        </section>

        {/* STUDIO 3: SIZING & BUFFERING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Application Proxy Sizing, RAM Buffering &amp; Latency Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate required user-space RAM for buffering payloads, TLS decryption CPU cores, and 5-year Total Cost of Ownership in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              L7 Sizing Engine
            </span>
          </div>

          {/* Sizing Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Peak Requests / Sec (RPS):</span>
                <span className="text-sky-400 font-bold">{requestsPerSecond.toLocaleString()} RPS</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={requestsPerSecond}
                onChange={(e) => setRequestsPerSecond(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Average Request Body Size:</span>
                <span className="text-indigo-400 font-bold">{avgRequestBodyKB} KB / Request</span>
              </div>
              <input
                type="range"
                min="8"
                max="512"
                step="8"
                value={avgRequestBodyKB}
                onChange={(e) => setAvgRequestBodyKB(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>TLS Certificate Key Length:</span>
                <span className="text-emerald-400 font-bold">{tlsKeyLengthBits}-bit RSA/ECC</span>
              </div>
              <select
                value={tlsKeyLengthBits}
                onChange={(e) => setTlsKeyLengthBits(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gray-200 focus:outline-none"
              &gt;
                <option value={2048}>2048-bit RSA (Standard)</option>
                <option value={4096}>4096-bit RSA (High Security)</option>
              </select>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Required User-Space RAM Buffer</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedProxySizing.activeBufferMB} MB</div>
              <span className="text-[10px] text-gray-500 block">Buffering payload streams for AV/WAF</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Required CPU Compute Cores</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">{calculatedProxySizing.requiredCpuCores} Cores</div>
              <span className="text-[10px] text-gray-500 block">Latency Overhead: ~{calculatedProxySizing.latencyOverheadMs} ms</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Redundant WAF Cluster TCO</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹{calculatedProxySizing.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Includes ModSecurity/NGINX Support</span>
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
              &gt;
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.architecture}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                WAF Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Layer 7 Defense Strategy:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
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
                <span>Application-Level Gateways operate at OSI Layer 7, terminating sessions and inspecting payloads.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Dual-session architecture: Client <=> Proxy (Session 1) and Proxy <=> Server (Session 2).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Forward Proxies protect internal clients; Reverse Proxies protect backend DMZ web servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>ALGs inspect HTTP methods, headers, URIs, cookies, and decode nested JSON/XML/MIME payloads.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Major limitation: High CPU/RAM overhead and requires dedicated daemons per protocol.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Response filtering sanitizes server banners, preventing adversary OS and version fingerprinting.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Application-Level Gateways (Proxy Firewalls) FAQs"
            subtitle="30 In-depth Practice Questions & Layer 7 Proxy Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Application-Level Gateways (Proxy Firewalls) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 5 of Module 005_001! In this lesson, we explored the pinnacle of application-layer security: Application-Level Gateways and Reverse Proxy Firewalls (WAFs). Remember that while stateless and stateful firewalls protect network ports and connection tracking tables, only an Application Proxy understands the semantic meaning of HTTP, SMTP, DNS, and SQL commands. By terminating TLS sessions locally, normalizing URIs, stripping server identification banners, and scanning payloads for SQL injection and Cross-Site Scripting (XSS), Application Proxies provide airtight defense against modern application attacks. Always deploy Application Proxies behind stateful edge firewalls in your DMZ architecture to balance high line-rate throughput with deep Layer 7 intelligence! In Topic 6, we will explore Next-Generation Firewalls (NGFW) with Deep Packet Inspection (DPI) and App-ID!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic5;
