import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic7_files/snort_suricata_engine.py?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgSnortRuleAnatomyId = useId();
  const svgSuricataPipelineId = useId();

  // Studio 1: Active Architecture Comparison Selection
  const [selectedArchKey, setSelectedArchKey] = useState("threading_model");

  // Studio 2: Live Rule Matcher State
  const [selectedRuleTemplate, setSelectedRuleTemplate] = useState("sqli_rule");
  const [injectedPayloadType, setInjectedPayloadType] = useState("sqli_exploit");

  // Studio 3: Performance & Sizing Calculations
  const [cpuCoresCount, setCpuCoresCount] = useState(16); // 4 to 64 CPU cores
  const [networkLinkGbps, setNetworkLinkGbps] = useState(20); // 1 to 100 Gbps
  const [loadedRuleCountThousands, setLoadedRuleCountThousands] = useState(35); // 5k to 60k rules

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_telecom_core");

  // Architecture Comparison Database for Studio 1
  const architectureDimensions = {
    threading_model: {
      key: "threading_model",
      title: "1. Multi-Core Threading & Scaling Architecture",
      category: "Hardware Execution Model",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      snort2Detail: "Single-Threaded process. Scaling across multi-core CPUs requires manually running multiple distinct Snort daemon instances.",
      snort3Detail: "Multi-Threaded architecture. Uses worker threads per packet stream and modernized Lua control plane.",
      suricataDetail: "Natively Multi-Threaded from inception. Supports fine-grained CPU thread pinning (Receive, Worker, Verdict, Logging threads).",
      verdict: "Suricata scales linearly across 64+ hardware CPU cores using AF_PACKET and DPDK zero-copy ring buffers."
    },
    pattern_matcher: {
      key: "pattern_matcher",
      title: "2. Pattern Matching & Regex Acceleration",
      category: "Algorithmic Engine",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      snort2Detail: "Aho-Corasick Multi-Pattern Matcher (MPM) with standard PCRE evaluation (single regex pass).",
      snort3Detail: "Hyperscan SIMD vector acceleration and pluggable regex engines.",
      suricataDetail: "Integrated Intel Hyperscan SIMD acceleration; evaluates 35,000+ regex rules in parallel across AVX-512 registers.",
      verdict: "Intel Hyperscan integration in Suricata and Snort 3 eliminates single-rule regex performance bottlenecks."
    },
    protocol_inspection: {
      key: "protocol_inspection",
      title: "3. Protocol Parsers & TLS SNI Extraction",
      category: "Application Layer Inspection",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      snort2Detail: "C-based preprocessors (http_inspect, stream5). Limited native visibility into encrypted TLS handshakes.",
      snort3Detail: "Modular C++ Inspectors and OpenAppID application layer categorization.",
      suricataDetail: "Deep built-in Rust protocol parsers (HTTP/1, HTTP/2, TLS, SSH, DNS, SMB, NFS) with native TLS SNI & Certificate extraction.",
      verdict: "Suricata extracts TLS certificates and domain SNIs in real time without requiring full SSL decryption."
    },
    telemetry_output: {
      key: "telemetry_output",
      title: "4. Telemetry Logging & SIEM Ingestion",
      category: "SOC Observability",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      snort2Detail: "Legacy Unified2 binary files (requires Barnyard2 parser daemon), Syslog, and PCAP dumps.",
      snort3Detail: "Alert JSON output, structured CSV, and unified syslog.",
      suricataDetail: "Industry-standard EVE JSON (`eve.json`) streaming logs consumed directly by Elasticsearch, Splunk, and Wazuh.",
      verdict: "Suricata's EVE JSON provides standard structured telemetry for modern automated SOC SIEM pipelines."
    }
  };

  // Studio 2: Live Rule Templates Database
  const ruleTemplates = {
    sqli_rule: {
      id: "sqli_rule",
      title: "SQL Injection Detection Rule (SID: 1000001)",
      ruleHeader: "alert tcp $EXTERNAL_NET any → $HTTP_SERVERS 80",
      ruleOptions: `(msg:"EXPLOIT SQL Injection UNION SELECT"; flow:to_server,established; content:"UNION SELECT"; nocase; http_uri; fast_pattern; classtype:web-application-attack; sid:1000001; rev:1;)`,
      testedPattern: "UNION SELECT",
      isHttpUri: true
    },
    log4shell_rule: {
      id: "log4shell_rule",
      title: "Log4Shell JNDI Exploit Drop Rule (SID: 1000002)",
      ruleHeader: "drop tcp $EXTERNAL_NET any → $HTTP_SERVERS 443",
      ruleOptions: `(msg:"EXPLOIT Log4Shell JNDI Lookup"; flow:to_server,established; content:"\${diagnostic_jndi:"; nocase; fast_pattern; classtype:attempted-admin; sid:1000002; rev:2;)`,
      testedPattern: "${diagnostic_jndi:",
      isHttpUri: false
    },
    xmas_scan_rule: {
      id: "xmas_scan_rule",
      title: "XMAS Port Scan Detection Rule (SID: 1000003)",
      ruleHeader: "alert tcp any any → $HOME_NET any",
      ruleOptions: `(msg:"SCAN XMAS Scan Attempt"; flags:FPU; classtype:attempted-recon; sid:1000003; rev:1;)`,
      testedPattern: "FLAGS_FPU",
      isHttpUri: false
    }
  };

  // Studio 2: Live Injected Payload Samples
  const injectedPayloads = {
    sqli_exploit: {
      id: "sqli_exploit",
      label: "SQL Injection Attempt: ' UNION SELECT username, password_hash FROM users--",
      uri: "/search?q=%27%20union%20select%20null,pass%20from%20admin",
      payload: "GET /search?q=%27%20union%20select%20null,pass%20from%20admin HTTP/1.1\r\nHost: portal.barrackpore.gov\r\n\r\n",
      flags: "ACK, PSH"
    },
    log4shell_exploit: {
      id: "log4shell_exploit",
      label: "Log4Shell Diagnostic Pattern Test: ${diagnostic_jndi:ldap://test.internal/probe}",
      uri: "/login",
      payload: "POST /login HTTP/1.1\r\nUser-Agent: ${diagnostic_jndi:ldap://test.internal/probe}\r\nHost: auth.saltlake.gov\r\n\r\n",
      flags: "ACK, PSH"
    },
    clean_traffic: {
      id: "clean_traffic",
      label: "Clean Citizen Web Browsing: GET /records/citizen?id=499120",
      uri: "/records/citizen?id=499120",
      payload: "GET /records/citizen?id=499120 HTTP/1.1\r\nHost: portal.barrackpore.gov\r\n\r\n",
      flags: "ACK"
    }
  };

  // Studio 2: Rule Matcher Logic
  const ruleMatchResult = useMemo(() => {
    const currentRule = ruleTemplates[selectedRuleTemplate];
    const payload = injectedPayloads[injectedPayloadType];

    let isMatch = false;
    let matchedReason = "";

    if (currentRule.id === "sqli_rule") {
      if (payload.uri.toLowerCase().includes("union select") || payload.uri.toLowerCase().includes("union%20select")) {
        isMatch = true;
        matchedReason = "Matched normalized URI token 'UNION SELECT' (Case-Insensitive `nocase; http_uri;`).";
      }
    } else if (currentRule.id === "log4shell_rule") {
      if (payload.payload.toLowerCase().includes("${diagnostic_jndi:")) {
        isMatch = true;
        matchedReason = "Matched critical byte signature '${diagnostic_jndi:' in HTTP header payload (`action:drop;`).";
      }
    } else if (currentRule.id === "xmas_scan_rule") {
      if (payload.flags.includes("FPU")) {
        isMatch = true;
        matchedReason = "Matched abnormal TCP flags (FIN, PSH, URG set simultaneously).";
      }
    }

    return {
      isMatch,
      matchedReason: isMatch ? matchedReason : "No signature criteria matched. Packet passed cleanly.",
      verdict: isMatch
        ? (currentRule.ruleHeader.startsWith("drop") ? "🚨 IPS ACTION: PACKET DROPPED (SID " + currentRule.id + ")" : "⚠️ IDS ALERT: INTRUSION DETECTED (SID " + currentRule.id + ")")
        : "✔ CLEAN PACKET (No Match)",
      badgeColor: isMatch ? "bg-rose-950 text-rose-300 border-rose-700" : "bg-emerald-950 text-emerald-300 border-emerald-700"
    };
  }, [selectedRuleTemplate, injectedPayloadType]);

  // Studio 3: Performance Calculations
  const calculatedSuricataMetrics = useMemo(() => {
    // Inspection line rate capability (Gbps) based on cores and Hyperscan acceleration
    const throughputCapacityGbps = (cpuCoresCount * 2.8).toFixed(1);
    const cpuUtilizationPercent = Math.min(100, Math.round((networkLinkGbps / Number(throughputCapacityGbps)) * 100));

    // 5-Year Hardware Appliance & Threat Intel Feed TCO (INR ₹ Lakhs)
    const serverHardwareLakhs = (cpuCoresCount * 0.75 + 8.0).toFixed(2);
    const commercialThreatFeedLakhs = (5.5).toFixed(2);
    const fiveYearTcoLakhs = (Number(serverHardwareLakhs) + Number(commercialThreatFeedLakhs) * 5 + 6.0).toFixed(2);

    return {
      throughputCapacityGbps,
      cpuUtilizationPercent,
      fiveYearTcoLakhs
    };
  }, [cpuCoresCount, networkLinkGbps, loadedRuleCountThousands]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_telecom_core: {
      id: "barrackpore_telecom_core",
      title: "Barrackpore Municipal Telecom Gateway 100 Gbps Suricata Migration",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      engineSetup: "Suricata 7.0 + Intel Hyperscan + AF_PACKET Cluster (32 Cores)",
      threatScenario: "Single-threaded Snort 2 was experiencing 42% packet drops during morning citizen tax filing peaks, causing blind spots.",
      solution: "Sukanta Hui and Mahima deployed a 32-core Suricata cluster with AF_PACKET symmetrical 5-tuple load distribution and Intel Hyperscan SIMD compilation across 35,000 rules.",
      outcome: "Sensor packet drops dropped to exactly 0.00%; line-rate inspection achieved 94 Gbps; zero missed intrusions; full CERT-In compliance."
    },
    saltlake_cloud_eve: {
      id: "saltlake_cloud_eve",
      title: "Salt Lake Sector V State Data Center Suricata EVE JSON Streaming",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      engineSetup: "Suricata EVE JSON ➔ Apache Kafka ➔ OpenSearch Cluster",
      threatScenario: "Legacy Unified2 binary logs required complex Barnyard2 daemons that crashed during high-volume attacks, losing critical forensic logs.",
      solution: "Abhronila, Susmita, and Debangshu converted all sensors to native EVE JSON streaming with TLS certificate extraction, sending structured logs directly to OpenSearch.",
      outcome: "Zero log loss; real-time alert triage latency reduced from 8 minutes to 450 milliseconds; 180-day immutable forensic retention verified."
    }
  };

  const currentArch = architectureDimensions[selectedArchKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 7</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Popular IDS/IPS Tools: Snort Rule Syntax &amp; Suricata Overview
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the industry-standard engines of network defense. Explore <strong className="text-sky-400">Snort Rule Syntax &amp; Payload Modifiers</strong>, <strong className="text-emerald-400">Suricata Multi-Threaded Architecture</strong>, <strong className="text-purple-400">Intel Hyperscan SIMD Acceleration</strong>, and structured <strong className="text-amber-400">EVE JSON Logging</strong>.
          </p>
        </header>

        {/* SECTION 1: SNORT SYNTAX ANATOMY & SURICATA PIPELINE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Snort Rule Anatomy &amp; Suricata Multi-Threaded Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the structural components of a Snort signature on the left and Suricata's multi-core worker pipeline on the right.
            </p>
          </div>

          {/* SVG 1: SNORT ANATOMY & SURICATA PIPELINE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Snort Rule Grammar ➔ Suricata Multi-Core Threaded Architecture
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Header, Options &amp; Hyperscan SIMD</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgSnortRuleAnatomyId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Snort Rule Anatomy and Suricata Pipeline Diagram"
              >
                {/* LEFT: SNORT RULE ANATOMY */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ANATOMY OF A SNORT / SURICATA RULE
                </text>

                {/* RULE HEADER BOX */}
                <rect x="35" y="58" width="360" height="70" rx="6" fill="#082f49" stroke="#0284c7" strokeWidth="1.5" />
                <text x="215" y="76" fill="#7dd3fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                  RULE HEADER (Addressing &amp; Routing)
                </text>
                <text x="45" y="98" fill="#ffffff" fontSize="8" fontFamily="monospace">
                  alert tcp $EXTERNAL_NET any -&gt; $HTTP_SERVERS 80
                </text>
                <text x="45" y="116" fill="#93c5fd" fontSize="7">
                  [Action] [Proto] [Source IP/Port] [Dir] [Dest IP/Port]
                </text>

                {/* RULE OPTIONS BOX */}
                <rect x="35" y="138" width="360" height="108" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="215" y="156" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">
                  RULE OPTIONS (Deep Inspection Logic)
                </text>
                <text x="45" y="176" fill="#e0e7ff" fontSize="7.5" fontFamily="monospace">
                  (msg:"EXPLOIT SQLi"; content:"UNION SELECT";
                </text>
                <text x="45" y="194" fill="#e0e7ff" fontSize="7.5" fontFamily="monospace">
                  nocase; http_uri; fast_pattern; sid:1000001; rev:1;)
                </text>
                <text x="45" y="215" fill="#fde68a" fontSize="7">
                  • msg: Alert description • content: Payload match • fast_pattern: MPM
                </text>
                <text x="45" y="230" fill="#a7f3d0" fontSize="7">
                  • sid: Unique Rule ID (100–999,999: Custom) • rev: Revision number
                </text>

                {/* RIGHT: SURICATA MULTI-THREADED PIPELINE */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  SURICATA MULTI-CORE WORKER PIPELINE
                </text>

                {/* THREAD 1: AF_PACKET ACQUISITION */}
                <rect x="460" y="60" width="350" height="42" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="635" y="78" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  1. AF_PACKET / DPDK Zero-Copy Ingestion
                </text>
                <text x="635" y="93" fill="#a7f3d0" fontSize="7" textAnchor="middle">
                  5-Tuple Symmetrical Fanout across 16–64 CPU Worker Threads
                </text>

                {/* THREAD 2: INTEL HYPERSCAN MPM */}
                <rect x="460" y="110" width="350" height="50" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="635" y="128" fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  2. Intel Hyperscan SIMD Multi-Pattern Matcher
                </text>
                <text x="635" y="145" fill="#e0e7ff" fontSize="7" textAnchor="middle">
                  Evaluates 35,000+ Regex &amp; Content Signatures in Single Vectorized Pass
                </text>

                {/* THREAD 3: EVE JSON LOGGING */}
                <rect x="460" y="170" width="350" height="76" rx="5" fill="#451a03" stroke="#f59e0b" />
                <text x="635" y="188" fill="#fef3c7" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  3. Protocol Parsers &amp; EVE JSON Telemetry
                </text>
                <text x="635" y="205" fill="#fde68a" fontSize="7" textAnchor="middle">
                  Rust Protocol Parsers (HTTP, TLS SNI, SSH, DNS, SMB)
                </text>
                <text x="635" y="222" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Emits structured eve.json directly to SIEM / OpenSearch
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: SNORT 2 VS SNORT 3 VS SURICATA MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Snort 2 vs Snort 3 vs Suricata Architectural Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical trade-offs across Multi-Core Threading, Intel Hyperscan, Protocol Parsers, and Telemetry Formats.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentArch.badgeColor)}>
              {currentArch.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(architectureDimensions).map((a) => (
              <button
                key={a.key}
                onClick={() => setSelectedArchKey(a.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedArchKey === a.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {a.title}
              </button>
            ))}
          </div>

          {/* Active Comparison Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentArch.title}</h3>
                <span className="text-gray-400">Category: {currentArch.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentArch.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[11px] block">
                  📜 Snort 2 (Legacy):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentArch.snort2Detail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
                  ⚙️ Snort 3 (Lua/Multi-Thread):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentArch.snort3Detail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-950/80 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  ⚡ Suricata (Native Multi-Thread):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentArch.suricataDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentArch.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE RULE MATCHER & EVALUATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Snort Rule Editor &amp; Pattern Matching Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Select custom Snort signatures and inject simulated HTTP/TCP payload streams to evaluate real-time pattern matching.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Rule Matcher Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Snort Signature Template:</label>
              <select
                value={selectedRuleTemplate}
                onChange={(e) => setSelectedRuleTemplate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(ruleTemplates).map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Injected Network Payload:</label>
              <select
                value={injectedPayloadType}
                onChange={(e) => setInjectedPayloadType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(injectedPayloads).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Rule Syntax Display */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center text-gray-400">
              <span>Active Rule Syntax:</span>
              <span className="text-sky-400">SID: {ruleTemplates[selectedRuleTemplate].id}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-sky-300 break-all leading-relaxed">
              <span className="text-emerald-400">{ruleTemplates[selectedRuleTemplate].ruleHeader}</span>{" "}
              <span className="text-purple-300">{ruleTemplates[selectedRuleTemplate].ruleOptions}</span>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Ingress Payload Stream:
                </span>
                <span className="text-white font-bold text-sm">{injectedPayloads[injectedPayloadType].label}</span>
                <div className="font-mono text-gray-400 text-[11px] truncate max-w-md">
                  URI: {injectedPayloads[injectedPayloadType].uri}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                ruleMatchResult.badgeColor
              )}>
                {ruleMatchResult.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Pattern Matching Evaluation:
              </span>
              <p className="text-gray-300 leading-relaxed">{ruleMatchResult.matchedReason}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: SNORT/SURICATA ENGINE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Snort &amp; Suricata Rule Parser and Evaluator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation parsing Snort rule headers, extracting payload modifiers, and generating structured EVE JSON events.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              snort_suricata_engine.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="snort_suricata_engine.py"
            highlightLines={[25, 42, 60, 75]}
          />
        </section>

        {/* STUDIO 3: SURICATA MULTI-CORE SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Multi-Core Suricata Throughput &amp; Hardware Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate line-rate inspection throughput (Gbps), CPU utilization, and 5-year enterprise appliance TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Suricata Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Allocated CPU Cores:</span>
                <span className="text-sky-400 font-bold">{cpuCoresCount} Cores</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                step="4"
                value={cpuCoresCount}
                onChange={(e) => setCpuCoresCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Ingress Network Link:</span>
                <span className="text-purple-400 font-bold">{networkLinkGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="5"
                value={networkLinkGbps}
                onChange={(e) => setNetworkLinkGbps(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Active Rule Base Size:</span>
                <span className="text-emerald-400 font-bold">{loadedRuleCountThousands}k Rules</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={loadedRuleCountThousands}
                onChange={(e) => setLoadedRuleCountThousands(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Throughput Capacity</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedSuricataMetrics.throughputCapacityGbps} Gbps</div>
              <span className="text-[10px] text-gray-500 block">Hyperscan SIMD Ingestion</span>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Estimated CPU Load</span>
              <div className={clsx("text-2xl font-extrabold font-mono", calculatedSuricataMetrics.cpuUtilizationPercent > 80 ? "text-rose-400" : "text-emerald-400")}>
                {calculatedSuricataMetrics.cpuUtilizationPercent}% Load
              </div>
              <span className="text-[10px] text-gray-500 block">{calculatedSuricataMetrics.cpuUtilizationPercent > 80 ? "⚠️ Sizing Warning: Add More Cores" : "✔ Inspection Headroom Optimal"}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Appliance TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedSuricataMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Multi-Core Server + Threat Feeds</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Engine: {currentDrill.engineSetup}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Suricata Engineering Solution:</span>
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
                <span>Snort Rule Header syntax: Action Protocol SrcIP SrcPort -&gt; DstIP DstPort.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Local custom Snort SIDs must be numbered between 100 and 999,999.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>content modifiers: nocase, offset, depth, distance, within, fast_pattern.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Suricata is natively multi-threaded; Snort 2 is single-threaded; Snort 3 uses Lua multi-threading.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Intel Hyperscan enables high-speed regex multi-pattern matching across tens of thousands of rules.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Suricata eve.json provides unified JSON telemetry for SIEM and SOC threat correlation.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Snort Rule Syntax &amp; Suricata FAQs"
            subtitle="30 In-depth Practice Questions &amp; IDS Rule Authoring Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Snort Rule Syntax &amp; Suricata (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 7 gives you hands-on mastery over the two greatest intrusion detection powerhouses in cybersecurity: Snort and Suricata! Master rule authoring: always structure your header with accurate protocols and ports, pair regular expressions with fast static content strings, leverage fast_pattern and http_uri modifiers to prevent CPU backtracking, and assign local custom SIDs in the 100–999,999 range. When designing high-speed datacenter sensors, deploy multi-threaded Suricata with Intel Hyperscan SIMD acceleration and stream structured eve.json logs into your SOC SIEM! In Topic 8, we will explore Honeypots: Purpose, Value, and Deception Technology!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic7;
