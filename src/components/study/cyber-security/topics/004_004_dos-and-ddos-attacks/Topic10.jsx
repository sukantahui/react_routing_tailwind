import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgScrubberId = useId();

  // Studio 1: Active Scrubbing & WAF Technology Selection
  const [selectedTechKey, setSelectedTechKey] = useState("always_on_anycast_ingestion");

  // Studio 2: Live Scrubbing Throughput & Latency Calculator State
  const [ingressFloodGbps, setIngressFloodGbps] = useState(1000); // 100 to 2000 Gbps
  const [fpgaDropRatePercent, setFpgaDropRatePercent] = useState(99.5); // 90.0% to 99.9%
  const [wafDropRatePercent, setWafDropRatePercent] = useState(60.0); // 20.0% to 90.0%
  const [greTunnelActive, setGreTunnelActive] = useState(true); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_scrubber_architecture");

  // Studio 4: Scrubbing & WAF Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("cisco_gre_tunnel_mss_clamp");

  // 8 Cloud Scrubbing & WAF Technologies for Studio 1
  const technologyDatabase = {
    always_on_anycast_ingestion: {
      key: "always_on_anycast_ingestion",
      name: "1. Always-On BGP Anycast Global Ingestion",
      category: "ROUTING & INGRESS DIVERSION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Edge Routing Architecture (300+ Global PoPs)",
      technicalMechanism:
        "Continuously routes all customer traffic through 300+ global scrubbing centers 24/7, providing 0-second automatic mitigation for volumetric attacks without manual intervention.",
      operationalAdvantage: "Zero mitigation delay; immediate absorption of multi-terabit volumetric floods.",
      telemetryIndicator: "Global BGP Anycast routing state active 24/7 with zero traffic shift latency during flood onset",
      enterpriseStandard: "Mandatory for mission-critical banking (UPI/RTGS) and hospital ICU telemetry infrastructure.",
      codeSnippet: `// Always-On vs On-Demand Profile:
// Always-On  : Mitigation Latency = 0 Seconds | Routing = BGP Anycast 24/7 | SLA = 100% Uptime
// On-Demand  : Mitigation Latency = 2-15 Minutes | Routing = NetFlow Triggered BGP Divert`
    },
    fpga_hardware_silicon_engine: {
      key: "fpga_hardware_silicon_engine",
      name: "2. FPGA / ASIC Hardware Silicon Packet Engines",
      category: "WIRE-SPEED HARDWARE FILTERING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Layer 3/4 Physical Hardware Silicon",
      technicalMechanism:
        "Executes packet parsing, access control list (ACL) evaluation, and RFC 4987 HMAC SYN cookie calculations directly in custom FPGA microchips in 4.2 nanoseconds without CPU overhead.",
      operationalAdvantage: "Processes over 100 Million Packets Per Second (Mpps) per chassis at full 100 Gbps line rate.",
      telemetryIndicator: "Hardware-level drop counters incrementing in silicon with near-zero CPU core load",
      enterpriseStandard: "Custom Xilinx / Intel Stratix FPGA arrays deployed in Tier-1 cloud scrubbing centers.",
      codeSnippet: `// FPGA Hardware Pipeline Logic:
// Ingress 100 Gbps Frame ➔ Silicon Pipeline (4.2ns) ➔ Matches UDP Reflection Signature ➔ DROP!
// Ingress TCP SYN ➔ Hardware RFC 4987 HMAC Engine (3.8ns) ➔ SYN-ACK Cookie Transmitted!`
    },
    gre_ipsec_return_tunnels: {
      key: "gre_ipsec_return_tunnels",
      name: "3. Redundant GRE / IPsec Clean Return Tunnels",
      category: "CLEAN TRAFFIC RE-INJECTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Network Layer Tunneling (Protocol 47)",
      technicalMechanism:
        "The scrubbing center encapsulates clean, filtered packets inside GRE headers (`IP-in-IP`) and transmits them across the internet to the customer origin router, with TCP MSS clamped to 1436 bytes.",
      operationalAdvantage: "Delivers clean traffic securely to origin data centers while customer public IPs remain announced at the edge.",
      telemetryIndicator: "GRE tunnel interface uptime 100% with TCP MSS clamped to 1436B preventing packet fragmentation",
      enterpriseStandard: "Dual redundant GRE tunnels configured across geographically diverse ISP uplinks.",
      codeSnippet: `! Cisco GRE Return Tunnel with TCP MSS Clamping:
interface Tunnel100
 ip address 192.168.254.2 255.255.255.252
 tunnel source 103.25.10.1
 tunnel destination 198.41.128.1
 ip tcp adjust-mss 1436    ! Prevents GRE fragmentation!`
    },
    positive_security_openapi: {
      key: "positive_security_openapi",
      name: "4. Positive Security Model & Strict OpenAPI Schema Validation",
      category: "STRICT PROTOCOL WHITELISTS",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Application Layer (WAF Inspection)",
      technicalMechanism:
        "Blocks all incoming requests by default and permits only strictly validated JSON payloads matching predefined OpenAPI schemas (data types, regex patterns, allowed fields), providing zero-day immunity.",
      operationalAdvantage: "Completely immune to zero-day injection attacks and malformed Layer 7 payload exploits.",
      telemetryIndicator: "WAF logs recording instant HTTP 400 rejections for requests containing unrecognized parameters",
      enterpriseStandard: "Enforcing strict OpenAPI 3.0 contract validation on all financial and healthcare API endpoints.",
      codeSnippet: `// Positive Security Model Schema:
/api/v1/pay:
  post:
    requestBody:
      schema:
        type: object
        required: [amount, upi_id]
        properties:
          amount: { type: integer, minimum: 1, maximum: 100000 }
        additionalProperties: false # REJECTS NON-WHITELISTED FIELDS!`
    },
    negative_security_owasp_crs: {
      key: "negative_security_owasp_crs",
      name: "5. Negative Security Model & OWASP CRS Anomaly Scoring",
      category: "SIGNATURE ANOMALY SCORING",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetLayer: "Application Layer (WAF Inspection)",
      technicalMechanism:
        "Evaluates incoming requests against thousands of known attack signatures (OWASP Core Rule Set), accumulating anomaly points; blocks the request only if the cumulative score exceeds a threshold (Score >= 5).",
      operationalAdvantage: "Minimizes false positive disruptions on legitimate user traffic while blocking complex multi-vector exploits.",
      telemetryIndicator: "WAF transaction logs detailing cumulative anomaly scores (e.g. Score=12 ➔ Blocked)",
      enterpriseStandard: "OWASP ModSecurity / AWS WAF Core Rule Set running in Anomaly Scoring mode.",
      codeSnippet: `// OWASP ModSecurity Anomaly Scoring:
# Rule 1: Semicolon in Query Parameter (Score +2)
# Rule 2: SQL Keyword 'UNION' (Score +5)
# Rule 3: SQL Keyword 'SELECT' (Score +5)
# Total Anomaly Score = 12 (Threshold = 5) ➔ BLOCKED WITH HTTP 403!`
    },
    tls_ja3_ja4_bot_fingerprint: {
      key: "tls_ja3_ja4_bot_fingerprint",
      name: "6. TLS JA3 & JA4 Cryptographic Bot Fingerprinting",
      category: "BEHAVIORAL BOT DETECTION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetLayer: "Transport Layer Security (TLS Handshake)",
      technicalMechanism:
        "Generates a cryptographic hash of the client's TLS Client Hello parameters (ciphers, extensions, curves), identifying automated attack bots (Python, Mirai, Go HTTP) regardless of spoofed User-Agents.",
      operationalAdvantage: "Accurately identifies and blocks automated attack scripts in microsecond lookups.",
      telemetryIndicator: "WAF security events showing dropped requests with JA3 hashes matching known threat actor tooling",
      enterpriseStandard: "Cloud WAF integration with real-time JA3/JA4 threat intelligence databases.",
      codeSnippet: `// JA3 Fingerprint Hash Construction:
// Parameters: SSLVersion, Ciphers, Extensions, EllipticCurves, PointFormats
// JA3 String : 771,4865-4866-4867-49195,0-23-65281-10-11-35-16,29-23-24,0
// JA3 Hash   : b32309a26951912be7dba376398abc12 ➔ MATCHES PYTHON BOT ➔ BLOCK HTTP 403!`
    },
    waf_virtual_patching_zero_day: {
      key: "waf_virtual_patching_zero_day",
      name: "7. WAF Virtual Patching for Zero-Day Vulnerabilities",
      category: "EMERGENCY EDGE SHIELDING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Edge WAF Rule Engine",
      technicalMechanism:
        "Deploys centralized Layer 7 inspection rules at the cloud edge within hours of a zero-day disclosure (e.g. Log4Shell CVE-2021-44228), blocking exploits before backend servers are patched.",
      operationalAdvantage: "Eliminates the window of vulnerability during emergency security patch deployment cycles.",
      telemetryIndicator: "WAF virtual patch rule triggers dropping malicious exploitation strings with HTTP 403",
      enterpriseStandard: "Automated virtual patch deployment pipelines synchronized with national CERT-In advisories.",
      codeSnippet: `// AWS WAF Virtual Patch for Log4Shell (CVE-2021-44228):
ByteMatchStatement {
  SearchString: "\${jndi:"
  FieldToMatch: { AllQueryArguments: {} }
  Action: Block {}
}`
    },
    graphql_http2_sanitization: {
      key: "graphql_http2_sanitization",
      name: "8. GraphQL Query Depth & HTTP/2 Stream Sanitization",
      category: "API & PROTOCOL PARSER DEFENSE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Application API & HTTP/2 Parser",
      technicalMechanism:
        "Parses GraphQL query Abstract Syntax Trees (AST) to enforce maximum depth limits (Depth <= 5), and sanitizes HTTP/2 frames to block Rapid Reset (CVE-2023-44487) stream cancellation exploits.",
      operationalAdvantage: "Prevents complex API parser and database recursive CPU lockup attacks.",
      telemetryIndicator: "WAF blocking GraphQL requests exceeding query depth 5 and dropping abnormal RST_STREAM bursts",
      enterpriseStandard: "Cloud WAF API Shield with strict GraphQL depth capping and HTTP/2 concurrency controls.",
      codeSnippet: `// GraphQL Query Depth Defense (Cloud WAF):
query MaliciousDeepQuery { # Depth = 15 ➔ EXCEEDS WAF MAX DEPTH (5) ➔ BLOCKED HTTP 400!
  user { friends { friends { friends { friends { name } } } } }
}`
    }
  };

  const activeTech = technologyDatabase[selectedTechKey];

  // Studio 2: Live Scrubbing Throughput & Pipeline Latency Calculations
  const simulationResults = useMemo(() => {
    const drL3L4 = fpgaDropRatePercent / 100.0;
    const drL7 = wafDropRatePercent / 100.0;

    // Traffic reaching Layer 7 after FPGA hardware filter:
    const trafficAfterFpgaGbps = ingressFloodGbps * (1.0 - drL3L4);
    // Final clean traffic delivered to origin:
    const cleanTrafficThroughputGbps = trafficAfterFpgaGbps * (1.0 - drL7);

    // Latency Pipeline Breakdown (in milliseconds):
    const anycastRttMs = 2.5;
    const fpgaInspectMs = 0.005; // 5 microseconds
    const wafEvalMs = 1.8;
    const greReturnRttMs = greTunnelActive ? 3.5 : 0.0;

    const totalScrubbingLatencyMs = (anycastRttMs + fpgaInspectMs + wafEvalMs + greReturnRttMs).toFixed(3);
    const overallDropPercentage = (((ingressFloodGbps - cleanTrafficThroughputGbps) / ingressFloodGbps) * 100).toFixed(2);

    return {
      trafficAfterFpgaGbps: trafficAfterFpgaGbps.toFixed(2),
      cleanTrafficThroughputGbps: cleanTrafficThroughputGbps.toFixed(2),
      totalScrubbingLatencyMs,
      overallDropPercentage,
      badgeClass: parseFloat(overallDropPercentage) > 99.0
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : "bg-amber-950 text-amber-300 border-amber-800",
      statusMessage: `SCRUBBING PIPELINE OPTIMAL: ${ingressFloodGbps} Gbps dirty flood reduced to ${cleanTrafficThroughputGbps.toFixed(2)} Gbps of clean traffic (${overallDropPercentage}% filtered); total added latency across Anycast, FPGA, WAF, and GRE tunnel is only ${totalScrubbingLatencyMs} ms!`
    };
  }, [ingressFloodGbps, fpgaDropRatePercent, wafDropRatePercent, greTunnelActive]);

  // Studio 4: Scrubbing & WAF Production Code Database
  const codeDatabase = {
    cisco_gre_tunnel_mss_clamp: {
      name: "Cisco Router GRE Return Tunnel Configuration with TCP MSS Clamping",
      code: `! Cisco IOS Router Configuration for Cloud DDoS Scrubbing Clean Return Tunnel:

! 1. Create Dedicated GRE Clean Return Tunnel Interface
interface Tunnel100
 description "Clean Scrubbed Traffic Return from Cloud Scrubbing Center"
 ip address 192.168.254.2 255.255.255.252
 tunnel source 103.25.10.1                 ! Customer Public Edge Router IP
 tunnel destination 198.41.128.1           ! Cloud Scrubbing Center PoP IP
 tunnel mode gre ip
 tunnel path-mtu-discovery

! 2. Mandatory TCP MSS Clamping to Prevent WAN IP Packet Fragmentation
 mtu 1476                                  ! 24-byte GRE encapsulation overhead adjustment
 ip tcp adjust-mss 1436                    ! Clamps TCP MSS to 1436 bytes (1500 - 64B headers)

! 3. Configure Ingress Firewall Permitting Only Clean Traffic via GRE Tunnel
interface GigabitEthernet0/0/1             ! Physical Internet WAN Interface
 ip access-group DROP_DIRECT_FLOODS_IN in  ! Drops all direct-to-origin traffic not in GRE!`,
      explanation: "Cisco IOS router configuration establishing a dedicated GRE return tunnel with TCP MSS clamped to 1436 bytes to prevent packet fragmentation when receiving clean traffic from cloud scrubbing centers."
    },
    aws_waf_terraform_log4shell_rule: {
      name: "Terraform AWS WAF v2 Log4Shell Virtual Patch & Rate Limiting Rule",
      code: `# Terraform AWS WAF v2 Web ACL with Virtual Patching and Rate Limiting:
resource "aws_wafv2_web_acl" "kolkata_fintech_waf" {
  name        = "kolkata-fintech-waf"
  scope       = "REGIONAL"
  description = "Enterprise WAF with Virtual Patching & Bot Management"

  default_action {
    allow {}
  }

  # 1. Virtual Patching Rule: Blocks Log4Shell (CVE-2021-44228) at Cloud Edge
  rule {
    name     = "Log4Shell_Virtual_Patch"
    priority = 1

    action {
      block {}
    }

    statement {
      byte_match_statement {
        search_string = "\${jndi:"
        field_to_match {
          all_query_arguments {}
        }
        text_transformation {
          priority = 0
          type     = "URL_DECODE"
        }
        positional_constraint = "CONTAINS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "Log4ShellBlocked"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "KolkataFinTechWAF"
    sampled_requests_enabled   = true
  }
}`,
      explanation: "Terraform configuration deploying an AWS WAF v2 Web ACL with an emergency virtual patching rule that intercepts and blocks Log4Shell exploit payloads at the cloud edge before reaching backend servers."
    },
    modsecurity_owasp_crs_conf: {
      name: "ModSecurity OWASP Core Rule Set (CRS) Anomaly Scoring Configuration",
      code: `# ModSecurity OWASP Core Rule Set (CRS) Anomaly Scoring Engine Configuration:

# 1. Enable ModSecurity Engine in Blocking Mode
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess Off

# 2. Configure Anomaly Scoring Thresholds (OWASP CRS v3.3.0 Standard)
SecAction \\
 "id:900110,\\
  phase:1,\\
  nolog,\\
  pass,\\
  setvar:tx.inbound_anomaly_score_threshold=5,\\
  setvar:tx.outbound_anomaly_score_threshold=4"

# 3. Blocking Evaluation Rule (Evaluates at End of Inbound Phase 2)
SecRule TX:ANOMALY_SCORE "@ge %{tx.inbound_anomaly_score_threshold}" \\
 "id:949110,\\
  phase:2,\\
  deny,\\
  status:403,\\
  log,\\
  msg:'Inbound Anomaly Score Exceeded (Score: %{TX.ANOMALY_SCORE}) - Request Blocked!'"`,
      explanation: "ModSecurity configuration enabling OWASP Core Rule Set in Anomaly Scoring mode, evaluating cumulative penalty points across multiple attack signatures and blocking requests exceeding a score threshold of 5."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_scrubber_architecture",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Deploying Always-On Scrubbing & Dual GRE Tunnels for 45 Core Banking Nodes",
      threatType: "VOLUMETRIC MULTI-VECTOR ASSAULT (1.2 Tbps UDP Reflection + SYN Flood)",
      budget: "₹88,00,000",
      incident:
        "Adversaries launched a 1.2 Tbps volumetric flood attempting to saturate data center uplinks during national tax payment deadlines.",
      defenseStrategy:
        "Mamata deployed an Always-On BGP Anycast cloud scrubbing architecture with dual GRE return tunnels and hardware FPGA HMAC SYN cookie validation.",
      outcome: "1.2 Tbps flood filtered in silicon down to 2.4 Gbps clean traffic; 0% transaction loss; ₹3,500 Crores in tax settlements completed.",
      metrics: {
        attackPeakBandwidth: "1,200.0 Gbps (1.2 Tbps)",
        cleanOutputDelivered: "2.4 Gbps Clean",
        switchesProtected: "45 Core Banking Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_hardware_scrubber",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "INDUSTRIAL SCADA WEB CONSOLE FLOOD & SYN SATURATION",
      title: "Hardening Substation Web Management Consoles via Hardware FPGA Scrubbing",
      budget: "₹56,00,000",
      incident:
        "A 350 Gbps SYN flood targeted substation web management consoles, attempting to lock controller CPU and block emergency switching commands.",
      defenseStrategy:
        "Debangshu deployed an on-premise hardware FPGA scrubbing appliance computing RFC 4987 SYN cookies at wire speed combined with on-demand cloud diversion.",
      outcome: "350 Gbps SYN flood neutralized in silicon in under 5 nanoseconds; substation web consoles remained 100% responsive across North 24 Parganas.",
      metrics: {
        hardwareScrubbingSpeed: "4.2 Nanoseconds",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_virtual_patching",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "ZERO-DAY EXPLOITATION & LAYER 7 HTTP FLOOD (Log4Shell Attack)",
      title: "Neutralizing Automated Zero-Day Exploits via Cloud WAF Virtual Patching",
      budget: "₹41,00,000",
      incident:
        "Automated botnets scanned and flooded the hospital's oncology patient database with Log4Shell JNDI exploit payloads disguised as HTTP headers.",
      defenseStrategy:
        "Mahima deployed a Cloud WAF virtual patch within 45 minutes of CVE disclosure, blocking all JNDI string injection attempts at the cloud edge.",
      outcome: "100% of zero-day exploit payloads dropped with HTTP 403; oncology database servers remained completely insulated; 120,000 records protected.",
      metrics: {
        virtualPatchDeployTime: "45 Minutes",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_scrubbing_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF CLOUD SCRUBBING PIPELINE LATENCY",
      title: "Formulating the GRE Return Tunnel Latency & JA4 Bot Fingerprinting Model",
      budget: "₹33,00,000",
      incident:
        "Researchers modeled the latency overhead and throughput efficiency of 3-stage cloud scrubbing pipelines across 180,000 simulated attack conditions.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that FPGA silicon pipelines bound total scrubbing latency under 8.0 ms.",
      outcome: "Published peer-reviewed mathematical proof; verified across 180,000 simulated cloud scrubbing trials.",
      metrics: {
        simulationTrials: "180,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Cloud Scrubbing Throughput Equation",
        publication: "IEEE Transactions on Information Forensics"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_004
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 10
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Cloud-based DDoS Scrubbing Centers and Web Application Firewalls (WAF)
            </h1>
            <p className="text-xs text-gray-400">
              Multi-terabit Anycast ingestion, FPGA silicon scrubbing, GRE clean return tunnels, TLS JA3/JA4, and IT Act Section 66F.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Multi-Terabit Edge Ingestion &amp; Silicon Filtering
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Cloud Scrubbing: Ingesting Terabits, Filtering in Silicon &amp; Returning Clean Traffic
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Modern enterprise DDoS defense relies on <strong>Cloud-Based DDoS Scrubbing Centers</strong> and <strong>Web Application Firewalls (WAF)</strong> 
              to neutralize multi-terabit volumetric floods and sophisticated Layer 7 exploits before malicious packets reach origin data centers. 
              The architecture operates across a 3-stage pipeline: <strong>1. Ingestion:</strong> Ingesting terabits of dirty flood traffic across 300+ global 
              BGP Anycast Points of Presence (PoPs); <strong>2. Hardware Scrubbing:</strong> Custom FPGA / ASIC silicon packet engines filter volumetric UDP reflection 
              and compute RFC 4987 HMAC SYN cookies in under 5 nanoseconds; <strong>3. Layer 7 WAF &amp; Clean Return:</strong> Cloud WAF engines evaluate 
              OWASP Core Rule Set anomaly scores, validate OpenAPI schemas, and inspect TLS JA3/JA4 bot fingerprints, returning clean traffic to the origin 
              via dedicated <strong>GRE/IPsec encapsulation tunnels</strong> with TCP MSS clamped to 1436 bytes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3-Stage Pipeline Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The 3-Stage Scrubbing Pipeline
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                1,000 Gbps Dirty Flood ➔ FPGA Filters ➔ Cloud WAF ➔ 2.0 Gbps Clean Return (GRE Tunnel)!
              </div>
              <p className="text-gray-300 leading-relaxed">
                By performing Layer 3/4 filtering in FPGA hardware silicon and Layer 7 inspection at the edge, cloud scrubbers deliver 99.8% flood reduction with under 8.0ms added latency.
              </p>
            </div>

            {/* WAF Models & Virtual Patching Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                WAF Positive Security &amp; Virtual Patching
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Positive Security:</strong> OpenAPI contract validation blocks all non-whitelisted parameters.</li>
                <li>• <strong className="text-purple-300">Virtual Patching:</strong> Shields zero-days (Log4Shell) at the edge in hours before code fixes.</li>
                <li>• <strong className="text-amber-300">TLS JA3/JA4:</strong> Cryptographically identifies automated botnets regardless of spoofed headers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Scrubbing Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Cloud Scrubbing Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing BGP Anycast Ingestion, FPGA Silicon Scrubbing &amp; GRE Clean Return
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a 1.2 Tbps multi-vector flood is ingested across 300 Anycast PoPs, filtered by FPGA silicon and Cloud WAFs, 
              and returned cleanly to the Kolkata banking origin via GRE encapsulation tunnels:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INGRESS 1.2 TBPS FLOOD */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. 1.2 TBPS INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Multi-Vector Dirty Flood
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ATTACK PAYLOAD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  UDP &amp; NTP Reflection
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  SYN Floods &amp; Bots
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: HARDWARE FPGA SILICON SCRUBBING */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. FPGA SILICON
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Layer 3/4 Hardware Filter
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  4.2ns SILICON ENGINE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  HMAC SYN Cookies
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Drops 99.5% Volumetric!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: CLOUD WEB APPLICATION FIREWALL (WAF) */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. CLOUD WAF
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Layer 7 Deep Inspection
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  L7 SECURITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  JA4 Bot Fingerprinting
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Virtual Patching &amp; Schemas
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: GRE CLEAN RETURN TUNNEL */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. GRE TUNNEL
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Clean Traffic Return
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ENCAPSULATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  IP-in-IP (Protocol 47)
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  TCP MSS = 1436 Bytes!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: PROTECTED CUSTOMER ORIGIN */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. ORIGIN SERVER
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Kolkata Gateway
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% AVAILABLE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  2.4 Gbps Clean Output
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Added Latency &lt; 8.0ms!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Technology Scrubbing & WAF Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Cloud Scrubbing &amp; WAF Technology Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a scrubbing or WAF technology below to examine its target layer, technical mechanism, 
              operational advantages, telemetry indicators, and enterprise standards:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(technologyDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedTechKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedTechKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  TECH
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeTech.categoryBadge)}>
                    {activeTech.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Target: {activeTech.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeTech.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism &amp; Operational Flow
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeTech.technicalMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Operational Advantage &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeTech.operationalAdvantage}</p>
                  <p className="text-gray-400 text-[11px]">{activeTech.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Engineering Standard
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeTech.enterpriseStandard}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Configuration Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeTech.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Scrubbing Throughput & Pipeline Latency Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Cloud Scrubbing Throughput &amp; Pipeline Latency Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust ingress dirty flood volume V_total, Layer 3/4 FPGA drop rate, Layer 7 WAF drop rate, 
              and toggle GRE return tunnels to model clean throughput T_clean = V_total × (1 - DR_L3L4) × (1 - DR_L7) and total added latency ΔL:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Pipeline Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Ingress Dirty Flood Volume:</span>
                  <span className="text-rose-400 font-bold font-mono">{ingressFloodGbps} Gbps</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={ingressFloodGbps}
                  onChange={(e) => setIngressFloodGbps(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>FPGA Hardware L3/L4 Drop Rate:</span>
                  <span className="text-purple-400 font-bold font-mono">{fpgaDropRatePercent.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="90.0"
                  max="99.9"
                  step="0.1"
                  value={fpgaDropRatePercent}
                  onChange={(e) => setFpgaDropRatePercent(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Cloud WAF Layer 7 Drop Rate:</span>
                  <span className="text-amber-400 font-bold font-mono">{wafDropRatePercent.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="20.0"
                  max="90.0"
                  step="5.0"
                  value={wafDropRatePercent}
                  onChange={(e) => setWafDropRatePercent(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">Clean Return Transport Mode:</span>
                <button
                  onClick={() => setGreTunnelActive(!greTunnelActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    greTunnelActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {greTunnelActive ? "✔ GRE RETURN TUNNEL (+3.5ms RTT)" : "DIRECT CROSS-CONNECT (0ms RTT)"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Scrubbing Telemetry &amp; Latency Pipeline</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Clean Output Throughput Delivered</span>
                  <span className="text-lg font-extrabold text-emerald-400">{simulationResults.cleanTrafficThroughputGbps} Gbps</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Filtered: {simulationResults.overallDropPercentage}% of Flood</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Total Added Pipeline Latency</span>
                  <span className="text-lg font-extrabold text-cyan-400">{simulationResults.totalScrubbingLatencyMs} ms</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">FPGA Inspect: 0.005ms | WAF: 1.8ms</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Pipeline Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Scrubbing & WAF Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              GRE Tunnel, AWS WAF &amp; ModSecurity Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Cisco GRE Return Tunnel &amp; AWS WAF Virtual Patching Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Cisco GRE return tunnel configurations with TCP MSS clamping, 
              AWS WAF v2 Terraform virtual patching rules for Log4Shell, and ModSecurity OWASP CRS anomaly scoring scripts:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Policy
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita deploy Always-On scrubbing for core banking, 
              harden SCADA consoles in FPGA silicon, and apply WAF virtual patching across West Bengal:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; Multi-Vector Threat
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Penalties for Attacks on Protected Systems &amp; Cloud Scrubbing in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              strictly penalize launching DDoS attacks targeting cloud scrubbing centers or bypassing WAF protections with severe civil liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Flooding cloud scrubbers protecting critical infrastructure carries <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 70 &amp; 43(f)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems DDoS (Up to <span className="text-rose-400 font-bold">10 YEARS PRISON</span>).
                </li>
                <li>
                  <strong className="text-white">Section 43(f):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for denial of access.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for persistent availability safeguards collapse.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Cloud scrubbing bypass fraud (Up to 7 years prison).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Forgetting TCP MSS Clamping on GRE Tunnels:</strong> Causes MTU packet fragmentation across WAN links.
                </li>
                <li>
                  <strong>Relying Exclusively on Negative Security WAF Rules:</strong> Vulnerable to novel zero-day payload bypasses.
                </li>
                <li>
                  <strong>Choosing On-Demand Scrubbing for Financial Switches:</strong> Incurs 2-15 minutes of downtime during BGP shifts.
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Enforce Always-On Anycast Ingestion:</strong> Guarantees 0-second mitigation delay for critical banking and health.
                </li>
                <li>
                  <strong>Deploy TLS JA3/JA4 Bot Fingerprinting:</strong> Accurately detects automated botnets regardless of spoofed headers.
                </li>
                <li>
                  <strong>Configure Strict Origin IP Cloaking:</strong> Restricts origin ingress exclusively to cloud scrubber VIPs.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  Why is TCP MSS clamping to 1436 bytes mandatory when returning clean traffic through GRE encapsulation tunnels?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does TLS JA3/JA4 fingerprinting identify an automated Python bot even if it sends an exact Google Chrome User-Agent header?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, adjust FPGA Drop Rate to 99.9% and observe clean delivered traffic drop to negligible levels!
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Always-On scrubbing provides 0-second automatic protection vs On-Demand's 2-15 minute BGP shift.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>GRE return tunnels require TCP MSS clamping to 1436 bytes to prevent WAN MTU packet fragmentation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Hardware FPGA packet engines evaluate HMAC SYN cookies in silicon in under 5 nanoseconds.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>TLS JA3/JA4 fingerprinting detects automated botnets regardless of spoofed User-Agent headers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>WAF Virtual Patching shields zero-day vulnerabilities (Log4Shell) at the edge within hours.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes Cloud DDoS Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Cloud Scrubbing & WAF FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Scrubbing Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Cloud-based DDoS Scrubbing Centers and Web Application Firewalls (WAF) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Cloud-Based DDoS Scrubbing Centers and Web Application Firewalls (WAF) represent the pinnacle of modern enterprise cyber defense, combining multi-terabit edge routing, hardware FPGA silicon acceleration, and deep application-layer inspection! Master the 3-stage scrubbing pipeline: 1. Ingestion: 300+ BGP Anycast Points of Presence (PoPs) ingest multi-terabit floods at the edge; 2. Silicon Scrubbing: Hardware FPGA packet engines filter volumetric UDP amplification and compute RFC 4987 HMAC SYN cookies in under 5 nanoseconds without CPU load; 3. Clean Return: Scrubbers encapsulate clean packets inside GRE tunnels (Protocol 47), requiring TCP MSS clamping to 1436 bytes (`ip tcp adjust-mss 1436`) to prevent WAN MTU fragmentation! Understand WAF security models: Positive Security enforces strict OpenAPI schema contracts (zero-day immunity), while Negative Security uses OWASP Core Rule Set anomaly scoring (blocking when Score >= 5). Master advanced bot defense: TLS JA3/JA4 fingerprinting hashes SSL Client Hello parameters to spot automated botnets (Python, Mirai) regardless of fake User-Agents, and WAF Virtual Patching shields zero-days (Log4Shell CVE-2021-44228) at the edge in hours before backend patches can be coded. Remember that Section 70 of the Indian IT Act penalizes attacks on designated Protected Systems with up to 10 years imprisonment, and Section 66F treats cloud DDoS cyber terrorism against national infrastructure with Life Imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
