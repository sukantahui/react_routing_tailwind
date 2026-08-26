import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic12_files/topic12_note.txt?raw";

const Topic12 = () => {
  // Unique SVG IDs
  const svgDualPerimeterId = useId();

  // Studio 1: Active Dual-Perimeter Pattern Selection
  const [selectedPatternKey, setSelectedPatternKey] = useState("strict_nonce_csp");

  // Studio 2: Live Dual-Perimeter Gating & Anomaly Scoring Laboratory State
  const [rawHttpRequest, setRawHttpRequest] = useState("GET /api/pay?id=105' UNION SELECT 1,password,3 FROM users--");
  const [wafInspectionMode, setWafInspectionMode] = useState("modsec_anomaly_scoring"); // disabled_no_waf, negative_signature, modsec_anomaly_scoring, positive_openapi
  const [browserCspPolicy, setBrowserCspPolicy] = useState("strict_nonce_csp"); // no_csp, unsafe_inline_csp, strict_nonce_csp, report_only_csp
  const [codeDefenseLayer, setCodeDefenseLayer] = useState("parameterized_code"); // unsafe_concatenation, parameterized_code

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_waf_csp");

  // Studio 4: Dual-Perimeter Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("express_helmet_nonce_csp");

  // 8 Patterns for Studio 1
  const patternDatabase = {
    strict_nonce_csp: {
      key: "strict_nonce_csp",
      name: "1. Strict Nonce-Based Content Security Policy",
      category: "BROWSER EXECUTION GATING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Only execute scripts possessing a cryptographically random, per-request nonce token.",
      mechanismDescription:
        "Header: `script-src 'self' 'nonce-rAnd0m' 'strict-dynamic'`. When an attacker injects `<script>steal()</script>` or inline event handlers (`onerror`), the browser drops the payload because it lacks the secret per-request nonce.",
      mitigationPattern: "Deploy per-request nonces generated via `crypto.randomBytes(16).toString('base64')`.",
      typicalSyntax: "Content-Security-Policy: script-src 'self' 'nonce-4bf8e92a10c8' 'strict-dynamic';",
      codeSnippet: `// Strict Nonce CSP Header:
res.setHeader('Content-Security-Policy', \`default-src 'self'; script-src 'self' 'nonce-\${res.locals.nonce}'\`);`
    },
    modsec_crs_anomaly_scoring: {
      key: "modsec_crs_anomaly_scoring",
      name: "2. ModSecurity CRS Anomaly Scoring (PL1-PL4)",
      category: "INBOUND WAF PERIMETER INSPECTION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      securityPrinciple: "Aggregate anomaly points across multiple signature rules before dropping traffic.",
      mechanismDescription:
        "Rather than blocking on a single heuristic, CRS assigns severity points (Critical = 5, Warning = 3). If total points exceed the threshold (e.g. 5), the WAF drops the request (HTTP 403 Forbidden).",
      mitigationPattern: "Configure ModSecurity CRS with Paranoia Level 2 (PL2) or PL3 for financial APIs.",
      typicalSyntax: "SecAction \"id:900000,phase:1,nolog,pass,t:none,setvar:tx.paranoia_level=2\"",
      codeSnippet: `// ModSecurity Anomaly Scoring Rule:
SecRule ARGS "@rx (?i:union\\s+select)" "id:942100,phase:2,block,setvar:tx.anomaly_score=+5"`
    },
    waf_virtual_patching: {
      key: "waf_virtual_patching",
      name: "3. WAF Virtual Patching for Zero-Days",
      category: "EDGE INCIDENT RESPONSE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      securityPrinciple: "Deploy cloud edge filter rules in 60 seconds while code patches are developed.",
      mechanismDescription:
        "When a critical zero-day (Log4Shell or unauthenticated SQLi) is disclosed, a targeted WAF rule blocks exploit signatures at the cloud edge immediately, buying 48 hours for engineering teams to test code fixes.",
      mitigationPattern: "Deploy AWS WAF / Cloudflare custom regex rules on active CVE advisories.",
      typicalSyntax: "ByteMatchStatement: SearchString: \"jndi:ldap\" &rarr; Block",
      codeSnippet: `// AWS WAF Virtual Patch Rule:
{ "Name": "Block-Log4j-ZeroDay", "Statement": { "ByteMatchStatement": { "SearchString": "\${jndi:" } }, "Action": { "Block": {} } }`
    },
    positive_openapi_schema_waf: {
      key: "positive_openapi_schema_waf",
      name: "4. Positive Security Model (OpenAPI / Schema)",
      category: "CONTRACT-DRIVEN WAF FILTERING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Only allow HTTP endpoints, parameters, and types explicitly defined in the OpenAPI schema.",
      mechanismDescription:
        "The WAF ingests the Swagger / OpenAPI specification. Any request containing unapproved endpoints (`/admin.php`), illegal parameters (`role=admin`), or wrong data types is blocked at the perimeter.",
      mitigationPattern: "Enforce positive schema validation on all REST and GraphQL API gateways.",
      typicalSyntax: "Enforce OpenAPI Contract: POST /api/v1/transfer -&gt; Strict Types Only",
      codeSnippet: `// Positive OpenAPI WAF Gating:
// Request: POST /api/v1/invoice { "id": 105, "unapprovedParam": "attack" } ➔ BLOCKED (HTTP 400 Bad Request)`
    },
    clickjacking_frame_ancestors: {
      key: "clickjacking_frame_ancestors",
      name: "5. Clickjacking Defense (frame-ancestors 'none')",
      category: "UI REDRESSING ELIMINATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      securityPrinciple: "Instruct browser never to render the page inside an iframe.",
      mechanismDescription:
        "`frame-ancestors 'none'` completely supersedes legacy `X-Frame-Options: DENY`, preventing attackers from transparently overlaying banking or SCADA consoles under deceptive web games.",
      mitigationPattern: "Include `frame-ancestors 'none'` in all production CSP headers.",
      typicalSyntax: "Content-Security-Policy: frame-ancestors 'none';",
      codeSnippet: `// Frame Ancestors Clickjacking Gating:
Content-Security-Policy: frame-ancestors 'none';`
    },
    hsts_transport_hardening: {
      key: "hsts_transport_hardening",
      name: "6. HTTP Strict Transport Security (HSTS)",
      category: "TRANSPORT LAYER INTEGRITY",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      securityPrinciple: "Force browsers to communicate strictly over encrypted HTTPS.",
      mechanismDescription:
        "`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` forces browsers to upgrade all HTTP links to HTTPS automatically, neutralizing SSL-stripping Man-in-the-Middle (MitM) attacks.",
      mitigationPattern: "Enforce 2-year HSTS with `includeSubDomains` and `preload` flags.",
      typicalSyntax: "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
      codeSnippet: `// HSTS Header Blueprint:
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
    },
    csp_report_only_telemetry: {
      key: "csp_report_only_telemetry",
      name: "7. CSP Report-Only Mode & Violation Telemetry",
      category: "NON-BLOCKING STAGING AUDITING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Audit CSP violations in real time without breaking live applications.",
      mechanismDescription:
        "`Content-Security-Policy-Report-Only` evaluates policies and sends JSON violation payloads to `/api/csp-report` without blocking scripts, allowing security teams to tune policies safely before enforcement.",
      mitigationPattern: "Run Report-Only mode for 14 days before switching to active blocking.",
      typicalSyntax: "Content-Security-Policy-Report-Only: default-src 'self'; report-uri /api/csp-report;",
      codeSnippet: `// CSP Report-Only Header:
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'nonce-SECRET'; report-uri /api/csp-report;`
    },
    nosniff_and_permissions_policy: {
      key: "nosniff_and_permissions_policy",
      name: "8. X-Content-Type-Options: nosniff & Permissions",
      category: "BROWSER BEHAVIOR HARDENING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Prevent MIME sniffing and restrict client hardware sensor APIs.",
      mechanismDescription:
        "`X-Content-Type-Options: nosniff` stops browsers from executing images or text files as JavaScript. `Permissions-Policy: camera=(), microphone=()` blocks unauthorized access to device sensors.",
      mitigationPattern: "Include `nosniff` and `Permissions-Policy` across all server responses.",
      typicalSyntax: "X-Content-Type-Options: nosniff | Permissions-Policy: camera=(), microphone=()",
      codeSnippet: `// Security Headers:
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()`
    }
  };

  const activePattern = patternDatabase[selectedPatternKey];

  // Studio 2: Live Dual-Perimeter Gating & Anomaly Scoring Calculations
  const simulationResults = useMemo(() => {
    let wafDecision = "PASS (Traffic Forwarded to Origin)";
    let wafAnomalyScore = 0;
    let isWafBlocked = false;
    let browserCspDecision = "ALLOWED (Script Execution Permitted)";
    let isCspBlocked = false;
    let finalExploitOutcome = "SAFE";

    const hasSqliSignature = rawHttpRequest.toLowerCase().includes("union") || rawHttpRequest.toLowerCase().includes("select") || rawHttpRequest.includes("--") || rawHttpRequest.includes("or 1=1");
    const hasXssSignature = rawHttpRequest.toLowerCase().includes("<script>") || rawHttpRequest.toLowerCase().includes("onerror=") || rawHttpRequest.toLowerCase().includes("javascript:");

    // WAF Layer Evaluation
    if (wafInspectionMode === "disabled_no_waf") {
      wafDecision = "DISABLED (No Inspection - All Requests Pass)";
      wafAnomalyScore = 0;
      isWafBlocked = false;
    } else if (wafInspectionMode === "negative_signature") {
      if (hasSqliSignature || hasXssSignature) {
        wafDecision = "BLOCKED (Signature Match: Malicious Pattern Detected) ➔ HTTP 403 Forbidden";
        wafAnomalyScore = 5;
        isWafBlocked = true;
      } else {
        wafDecision = "PASS (No Signature Match)";
        wafAnomalyScore = 0;
        isWafBlocked = false;
      }
    } else if (wafInspectionMode === "modsec_anomaly_scoring") {
      if (hasSqliSignature) wafAnomalyScore += 5;
      if (hasXssSignature) wafAnomalyScore += 5;
      if (rawHttpRequest.includes("%09") || rawHttpRequest.includes("/**/")) wafAnomalyScore += 3;

      if (wafAnomalyScore &ge; 5) {
        wafDecision = `BLOCKED (Anomaly Score: ${wafAnomalyScore} >= Inbound Threshold 5) ➔ HTTP 403 Forbidden`;
        isWafBlocked = true;
      } else {
        wafDecision = `PASS (Anomaly Score: ${wafAnomalyScore} < Threshold 5)`;
        isWafBlocked = false;
      }
    } else {
      // Positive OpenAPI Schema
      if (hasSqliSignature || hasXssSignature || rawHttpRequest.includes("unapprovedParam")) {
        wafDecision = "BLOCKED (OpenAPI Schema Violation: Parameter Format Invalid) ➔ HTTP 400 Bad Request";
        wafAnomalyScore = 10;
        isWafBlocked = true;
      } else {
        wafDecision = "PASS (100% Conforms to OpenAPI 3.0 Contract)";
        wafAnomalyScore = 0;
        isWafBlocked = false;
      }
    }

    // Browser CSP Layer Evaluation (if payload reaches browser or is returned in view)
    if (browserCspPolicy === "no_csp") {
      browserCspDecision = "NO CSP: Browser Executes Any Injected Script (XSS EXPLODES!)";
      isCspBlocked = false;
    } else if (browserCspPolicy === "unsafe_inline_csp") {
      browserCspDecision = "WEAK CSP: 'unsafe-inline' Allows Injected Scripts to Execute!";
      isCspBlocked = false;
    } else if (browserCspPolicy === "strict_nonce_csp") {
      browserCspDecision = "STRICT NONCE CSP: Injected Script Lacks Secret Nonce ➔ Dropped by Browser DOM Parser!";
      isCspBlocked = true;
    } else {
      browserCspDecision = "REPORT-ONLY CSP: Violation Telemetry Sent to SIEM (Script Allowed in Browser)";
      isCspBlocked = false;
    }

    // Overall Joint Exploitability Calculation
    let jointExploitabilityPct = 0.0;
    if (codeDefenseLayer === "unsafe_concatenation") {
      if (isWafBlocked) {
        jointExploitabilityPct = 5.0; // Residual risk of WAF evasion
        finalExploitOutcome = "PERIMETER BLOCKED BY WAF (Underlying Code Remains Vulnerable to Evasions!)";
      } else {
        if (hasXssSignature && isCspBlocked) {
          jointExploitabilityPct = 0.0;
          finalExploitOutcome = "XSS NEUTRALIZED BY BROWSER CSP (Script Dropped by Nonce Gating)";
        } else if (hasSqliSignature) {
          jointExploitabilityPct = 100.0;
          finalExploitOutcome = "CRITICAL BREACH: WAF Bypassed & Unsafe String Concatenation Executed SQLi!";
        } else if (hasXssSignature) {
          jointExploitabilityPct = 100.0;
          finalExploitOutcome = "CRITICAL BREACH: WAF Bypassed & No CSP Gating Permitted XSS Execution!";
        } else {
          jointExploitabilityPct = 0.0;
          finalExploitOutcome = "CLEAN TRAFFIC: No Attack Detected";
        }
      }
    } else {
      // 100% Parameterized Code
      jointExploitabilityPct = 0.0;
      finalExploitOutcome = "100% SECURE: Parameterized Prepared Statement guarantees AST Invariance + Dual-Perimeter Gating!";
    }

    return {
      wafDecision,
      wafAnomalyScore,
      isWafBlocked,
      browserCspDecision,
      isCspBlocked,
      jointExploitabilityPct: jointExploitabilityPct.toFixed(1),
      finalExploitOutcome,
      badgeClass: jointExploitabilityPct > 0.0
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: jointExploitabilityPct === "0.0"
        ? `COMPLETE DUAL-PERIMETER IMMUNITY: WAF perimeter filtering + Strict Nonce CSP + Parameterized Code; Mathematical exploitability is exactly 0.000%!`
        : `VULNERABILITY DETECTED: Single point of failure identified; Relying solely on WAF or weak CSP leaves residual exploitability risk!`
    };
  }, [rawHttpRequest, wafInspectionMode, browserCspPolicy, codeDefenseLayer]);

  // Studio 4: Dual-Perimeter Hardening Production Code Database
  const codeDatabase = {
    express_helmet_nonce_csp: {
      name: "Express.js Production Helmet Middleware with Dynamic Per-Request Nonce CSP",
      code: `// Express.js Production Dual-Perimeter Helmet & Nonce CSP Setup:
const express = require('express');
const helmet = require('helmet');
const crypto = require('crypto');

const app = express();

// 1. Generate Cryptographically Secure Random Nonce Per Request:
app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
    next();
});

// 2. Configure Production Helmet Security Headers Suite:
app.use((req, res, next) => {
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    \`'nonce-\${res.locals.cspNonce}'\`,
                    "'strict-dynamic'"
                ],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https://images.kolkata-fintech.in"],
                connectSrc: ["'self'", "https://api.kolkata-fintech.in"],
                objectSrc: ["'none'"],
                baseUri: ["'none'"],
                frameAncestors: ["'none'"] // Stops Clickjacking!
            }
        },
        hsts: {
            maxAge: 63072000, // 2 Years
            includeSubDomains: true,
            preload: true
        },
        xContentTypeOptions: true, // nosniff
        referrerPolicy: { policy: "strict-origin-when-cross-origin" }
    })(req, res, next);
});

module.exports = app;`,
      explanation: "Production Express.js middleware integrating Helmet.js with per-request cryptographic nonces for CSP, 2-year HSTS transport encryption, `frame-ancestors 'none'` for Clickjacking defense, and `nosniff` MIME protection."
    },
    aws_waf_cloudformation_ruleset: {
      name: "AWS WAF Core Rule Set (CRS) & Rate-Limiting CloudFormation Blueprint",
      code: `# AWS WAF WebACL CloudFormation Definition:
Type: AWS::WAFv2::WebACL
Properties:
  Name: KolkataFinTech-Production-WAF
  Scope: CLOUDFRONT
  DefaultAction:
    Allow: {}
  VisibilityConfig:
    SampledRequestsEnabled: true
    CloudWatchMetricsEnabled: true
    MetricName: KolkataFinTechWAFMetrics
  Rules:
    # 1. AWS Managed Common Rule Set (OWASP Top 10 Signatures)
    - Name: AWS-AWSManagedRulesCommonRuleSet
      Priority: 1
      OverrideAction:
        None: {}
      Statement:
        ManagedRuleGroupStatement:
          VendorName: AWS
          Name: AWSManagedRulesCommonRuleSet
      VisibilityConfig:
        SampledRequestsEnabled: true
        CloudWatchMetricsEnabled: true
        MetricName: CommonRuleSetMetric

    # 2. AWS Managed SQLi Rule Set
    - Name: AWS-AWSManagedRulesSQLiRuleSet
      Priority: 2
      OverrideAction:
        None: {}
      Statement:
        ManagedRuleGroupStatement:
          VendorName: AWS
          Name: AWSManagedRulesSQLiRuleSet
      VisibilityConfig:
        SampledRequestsEnabled: true
        CloudWatchMetricsEnabled: true
        MetricName: SQLiRuleSetMetric

    # 3. Rate Limiting on Authentication Routes (100 req/min)
    - Name: RateLimitLoginEndpoint
      Priority: 3
      Action:
        Block: {}
      Statement:
        RateBasedStatement:
          Limit: 100
          AggregateKeyType: IP
          ScopeDownStatement:
            ByteMatchStatement:
              SearchString: "/api/auth/login"
              FieldToMatch:
                UriPath: {}
      VisibilityConfig:
        SampledRequestsEnabled: true
        CloudWatchMetricsEnabled: true
        MetricName: LoginRateLimitMetric`,
      explanation: "CloudFormation template configuring AWS WAF with AWS Managed Common Rule Set, SQLi Rule Set, and IP-based rate limiting on sensitive login endpoints."
    },
    modsecurity_crs_config: {
      name: "ModSecurity Core Rule Set (CRS) Anomaly Scoring Configuration Script",
      code: `# ModSecurity Core Rule Set (CRS) Production Configuration:
# -------------------------------------------------------------
# 1. Enable Rule Engine in Active Blocking Mode:
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess Off

# 2. Configure Inbound Anomaly Scoring Thresholds:
SecAction \
    "id:900000,\
    phase:1,\
    nolog,\
    pass,\
    t:none,\
    setvar:tx.paranoia_level=2,\
    setvar:tx.inbound_anomaly_score_threshold=5,\
    setvar:tx.outbound_anomaly_score_threshold=4"

# 3. Evaluate Cumulative Anomaly Score and Drop Inbound Requests:
SecRule TX:ANOMALY_SCORE "@ge %{tx.inbound_anomaly_score_threshold}" \
    "id:949110,\
    phase:2,\
    deny,\
    status:403,\
    log,\
    msg:'Inbound Anomaly Score Exceeded (Score: %{tx.anomaly_score}) - Request Blocked!'"`,
      explanation: "Production ModSecurity CRS configuration enforcing Paranoia Level 2 (PL2) and cumulative anomaly score evaluation, automatically dropping any request exceeding the inbound threshold of 5 points."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_waf_csp",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Deploying AWS WAF Core Rule Set & Per-Request Nonce CSP on Payment Clusters",
      threatType: "DISTRIBUTED L7 SQLi SCANNERS & STORED XSS PROBES",
      budget: "₹98,00,000",
      incident:
        "Botnets launched 400,000 automated SQL injection and XSS probes against merchant settlement portals during festival sales.",
      defenseStrategy:
        "Mamata deployed AWS WAF with OWASP Core Rule Sets, configured IP rate limiting, and enforced per-request nonce CSP headers across all web clusters.",
      outcome: "100% of automated injection probes dropped at the cloud edge; zero merchant sessions compromised; ₹4,700 Crores in daily UPI settlements secured.",
      metrics: {
        probesBlockedAtEdge: "400,000 Requests",
        settlementVolumeProtected: "₹4,700 Crores",
        webClustersProtected: "110 Microservices",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_modsec_hardening",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "WAF BYPASS VIA CHUNKED ENCODING IN SCADA WEB CONSOLES",
      title: "Hardening Substation SCADA Web Consoles with Embedded ModSecurity PL2 & Air-Gapped CSP",
      budget: "₹67,00,000",
      incident:
        "Adversaries attempted HTTP Request Smuggling and chunked transfer evasion against high-voltage breaker monitoring web consoles.",
      defenseStrategy:
        "Debangshu deployed embedded ModSecurity with Paranoia Level 2 (PL2) anomaly scoring and air-gapped `default-src 'none'` CSP policies.",
      outcome: "100% of evasion probes neutralized; SCADA breaker consoles maintained 100% uptime across North 24 Parganas.",
      metrics: {
        evasionsBlocked: "100.0%",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedAccess: "0 Incidents",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_csp_imaging",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "CROSS-SITE SCRIPTING VIA PATIENT PORTAL MEDICAL IMAGING UPLOADS",
      title: "Protecting Oncology Patient Imaging Portals with Strict Nonce CSP & WAF Virtual Patching",
      budget: "₹52,00,000",
      incident:
        "Adversaries attempted to inject malicious SVG images with embedded JavaScript into MRI scan upload forms to hijack oncologist cookies.",
      defenseStrategy:
        "Mahima enforced strict CSP `img-src 'self' data:` with `script-src 'nonce-...'`, combined with Cloudflare WAF magic byte inspection.",
      outcome: "100% of malicious SVG scripts blocked by the browser DOM; zero oncologist accounts hijacked; 120,000 cancer patient records fully secured.",
      metrics: {
        svgXssBlocked: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_dual_perimeter_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF DUAL-PERIMETER GATING & ANOMALY SCORING LATTICES",
      title: "Formulating the Dual-Perimeter Gating Safety Theorem in IEEE Transactions",
      budget: "₹45,00,000",
      incident:
        "Researchers formulated mathematical proofs demonstrating that joint perimeter gating G(R) = W(R) ∧ C(R) reduces exploitability to P_exploit = 0.00%.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving the superiority of joint WAF and Nonce-CSP architectures.",
      outcome: "Published peer-reviewed mathematical proof; verified across 480,000 simulated attack traffic events.",
      metrics: {
        simulationTrials: "480,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Dual-Perimeter Lattice Model",
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
                Module 004_005
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 12
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Web Application Firewalls (WAF) and Content Security Policy (CSP)
            </h1>
            <p className="text-xs text-gray-400">
              Layer 7 edge filtering, ModSecurity CRS anomaly scoring, strict nonce-based CSP, HSTS, virtual patching, and IT Act Section 66F.
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
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              The Dual-Perimeter Defense Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Dual-Perimeter Defense: Cloud Edge Filtering (WAF) and Browser DOM Gating (CSP)
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enterprise web applications require a comprehensive <strong>Dual-Perimeter Defense Architecture</strong>. 
              The <strong>Inbound Perimeter (WAF)</strong> operates at Layer 7 (Application Layer) at the cloud edge (AWS WAF, 
              Cloudflare, ModSecurity), inspecting incoming HTTP/HTTPS requests against the <strong>OWASP Core Rule Set (CRS)</strong>, 
              <strong>Anomaly Scoring Thresholds</strong>, and positive <strong>OpenAPI Schema Contracts</strong> to block automated 
              scanners, SQLi probes, and zero-day exploits (via <strong>Virtual Patching</strong>). However, because WAFs rely on heuristics 
              and can be bypassed via novel encoding tricks, the <strong>Browser Perimeter (CSP)</strong> operates at the client DOM layer, 
              enforcing <strong>Strict Nonce-Based Gating (`script-src 'self' 'nonce-...' 'strict-dynamic'`)</strong>. Even if an attacker 
              bypasses the WAF and injects markup into the response, the browser drops any script lacking the cryptographically generated 
              per-request secret nonce, establishing complete dual-perimeter immunity (P_exploit = 0.00%).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WAF Perimeter Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-purple-950/60 space-y-3 text-xs">
              <span className="font-bold text-purple-400 uppercase tracking-wider text-[10px] block">
                Inbound Perimeter: Cloud Edge WAF
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-purple-300 border border-purple-950/60 text-[11px]">
                Inspects L7 HTTP ➔ Anomaly Scoring (PL1-PL4) ➔ Drops Malicious Probes (403)!
              </div>
              <p className="text-gray-300 leading-relaxed">
                WAFs provide rate limiting, bot management, and instant virtual patching for zero-day CVEs across all edge distribution nodes.
              </p>
            </div>

            {/* Browser CSP Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Browser Perimeter: Strict Nonce CSP
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Cryptographic Nonce Gating:</strong> Enforces `script-src 'self' 'nonce-...'`.</li>
                <li>• <strong className="text-purple-300">Clickjacking Defense:</strong> `frame-ancestors 'none'` completely stops UI redressing.</li>
                <li>• <strong className="text-amber-300">HSTS Transport Encryption:</strong> Enforces 2-year HTTPS with `includeSubDomains`.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Dual-Perimeter Gating Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Dual-Perimeter Defense Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Dual-Perimeter Gating: From Cloud Edge WAF to Browser DOM Nonce Check
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an incoming HTTP request is inspected at the cloud edge WAF, processed by parameterized code, and gated in the browser by CSP:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INCOMING TRAFFIC */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. INBOUND HTTP
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Untrusted Web Client
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PAYLOAD ARRIVAL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SQLi / XSS Probes
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  GET /api/pay?id=...
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: CLOUD EDGE WAF */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. CLOUD WAF
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Layer 7 Anomaly Gate
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CRS INSPECTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Score >= 5 ➔ Block!
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Virtual Patch Active
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: APPLICATION SERVER (PREPARED CODE) */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. ORIGIN SERVER
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Parameterized Queries
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CODE DEFENSE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  AST Invariance $1
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Attaches Nonce CSP
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 4: BROWSER DOM GATING (CSP) */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. BROWSER CSP
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Client Execution Gate
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  NONCE VERIFICATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Matches 'nonce-...'?
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Drops Injected Scripts!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 5: COMPLETE DUAL-PERIMETER IMMUNITY */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. 100% IMMUNITY
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Zero Residual Risk
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  THEOREM INVARIANT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  P_exploit = 0.00%
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Dual-Perimeter Guard!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Pattern Dual-Perimeter Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Web Application Firewall &amp; Content Security Policy Pattern Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a dual-perimeter pattern below to examine its category, security principle, 
              filtering mechanics, enterprise mitigation patterns, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(patternDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedPatternKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedPatternKey === item.key
                    ? "bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-emerald-950 text-emerald-300 border-emerald-800 self-start">
                  PERIMETER
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activePattern.categoryBadge)}>
                    {activePattern.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Principle: {activePattern.securityPrinciple}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-[11px]">
                    Syntax: {activePattern.typicalSyntax}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activePattern.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Filtering Mechanics &amp; Execution Gating
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activePattern.mechanismDescription}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activePattern.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Execution &amp; Implementation Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activePattern.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Dual-Perimeter Gating & Anomaly Scoring Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Dual-Perimeter Gating &amp; Anomaly Scoring Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enter an untrusted HTTP request, select the WAF Inspection Mode, choose the Browser CSP Policy, 
              and toggle Application Code Defense to observe perimeter decisions and joint exploitability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Perimeter Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Incoming HTTP Request String:</span>
                <input
                  type="text"
                  value={rawHttpRequest}
                  onChange={(e) => setRawHttpRequest(e.target.value)}
                  className="w-full p-2 bg-gray-950 rounded border border-gray-800 text-cyan-300 font-mono text-xs focus:border-cyan-500 outline-none"
                /&gt;
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Inbound Cloud WAF Inspection Mode:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "disabled_no_waf", label: "Disabled / No WAF (Direct Traffic)" },
                    { id: "negative_signature", label: "Negative Signature Matching WAF" },
                    { id: "modsec_anomaly_scoring", label: "ModSecurity CRS Anomaly Scoring (PL2)" },
                    { id: "positive_openapi", label: "Positive OpenAPI Schema Validation WAF" }
                  ].map((waf) => (
                    <button
                      key={waf.id}
                      onClick={() => setWafInspectionMode(waf.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        wafInspectionMode === waf.id
                          ? "bg-purple-950 border-purple-500 text-purple-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {waf.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Browser Content Security Policy (CSP):</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "no_csp", label: "No CSP / Unrestricted" },
                    { id: "unsafe_inline_csp", label: "Weak CSP ('unsafe-inline')" },
                    { id: "strict_nonce_csp", label: "Strict Nonce CSP ('nonce-SECRET')" },
                    { id: "report_only_csp", label: "CSP Report-Only Mode (Audit)" }
                  ].map((csp) => (
                    <button
                      key={csp.id}
                      onClick={() => setBrowserCspPolicy(csp.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        browserCspPolicy === csp.id
                          ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {csp.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">4. Origin Application Code Defense:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "unsafe_concatenation", label: "Unsafe Concatenation" },
                    { id: "parameterized_code", label: "Prepared Statement ($1)" }
                  ].map((cd) => (
                    <button
                      key={cd.id}
                      onClick={() => setCodeDefenseLayer(cd.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        codeDefenseLayer === cd.id
                          ? cd.id === "unsafe_concatenation" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-emerald-950 border-emerald-500 text-emerald-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {cd.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics & Dual-Perimeter State Preview */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Dual-Perimeter Decision Matrix</h3>
                <span className={clsx("text-xs px-2.5 py-0.5 rounded font-mono font-bold border", simulationResults.jointExploitabilityPct > 0 ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-emerald-950 text-emerald-300 border-emerald-800")}&gt;
                  {simulationResults.jointExploitabilityPct > 0 ? "EXPLOITABLE RESIDUAL RISK" : "100% DUAL-PERIMETER IMMUNE"}
                </span>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Inbound Cloud Edge WAF Decision:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-purple-300 overflow-x-auto whitespace-pre-wrap border border-purple-950/60">
                  {simulationResults.wafDecision}
                </pre>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Outbound Browser CSP DOM Parser Decision:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap border border-emerald-950/60">
                  {simulationResults.browserCspDecision}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">WAF Anomaly Points (CRS)</span>
                  <span className="text-xs font-bold text-amber-300 mt-1 block">{simulationResults.wafAnomalyScore} Points (Threshold: 5)</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Joint Exploitability Probability</span>
                  <span className={clsx("text-lg font-extrabold mt-0.5 block", simulationResults.jointExploitabilityPct > 0 ? "text-rose-400" : "text-emerald-400")}&gt;
                    {simulationResults.jointExploitabilityPct}%
                  </span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Dual-Perimeter Safety Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Dual-Perimeter Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Helmet Nonce CSP &amp; AWS WAF Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Express.js Helmet Nonce CSP, AWS WAF CloudFormation &amp; ModSecurity CRS
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Express.js Helmet with per-request nonce CSP, 
              AWS WAF CloudFormation rule sets, and embedded ModSecurity Core Rule Set anomaly scoring scripts:
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
              &gt;
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Pattern
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita deploy AWS WAF &amp; Nonce CSP in Salt Lake, 
              harden ModSecurity SCADA consoles in Barrackpore, and protect oncology portals in Ichapur:
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
              &gt;
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
                  The Incident &amp; Perimeter Threat
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
              7. Legal Penalties for Perimeter Attacks &amp; WAF Bypasses in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection frameworks 
              strictly penalize exploiting perimeter bypasses to alter records, execute frauds, or compromise servers with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Perimeter attacks compromising critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data extraction.
                </li>
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems attack (Up to 10 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to maintain perimeter technical safeguards.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Commercial fraud &amp; fund siphoning (Up to 7 years prison).
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
                  <strong>Assuming a WAF Makes Code Safe:</strong> WAFs can be bypassed; prepared statements are mandatory.
                </li>
                <li>
                  <strong>Using `unsafe-inline` in CSP:</strong> Completely destroys XSS protection in the browser!
                </li>
                <li>
                  <strong>Relying on Legacy `X-Frame-Options` Alone:</strong> `frame-ancestors 'none'` in CSP is required.
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
                  <strong>Enforce Strict Nonce-Based CSP:</strong> Generates per-request cryptographic tokens with `crypto`.
                </li>
                <li>
                  <strong>Use WAF Anomaly Scoring &amp; Rate Limiting:</strong> ModSecurity PL2 blocks automated bot floods.
                </li>
                <li>
                  <strong>Stage Policies with CSP Report-Only:</strong> Audits violations without breaking production UI.
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
                  Why is a WAF compared to an emergency bandage (Virtual Patch) while Prepared Statements are the permanent cure?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does strict nonce CSP block an attacker's `<script>steal()</script>` even if it slips past the edge WAF?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Strict Nonce CSP and observe the browser drop injected scripts automatically!
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
                <span>WAF operates at Layer 7; inspects HTTP parameters, headers, and request bodies.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>WAFs are not a substitute for Parameterized Queries; they buy time via Virtual Patching.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Strict Nonce-Based CSP (`script-src 'nonce-...'`) completely neutralizes XSS in the browser.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>`frame-ancestors 'none'` supersedes `X-Frame-Options: DENY` for Clickjacking defense.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Use CSP Report-Only mode during staging to audit violations without breaking functionality.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes perimeter attacks on critical infrastructure with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Web Application Firewalls &amp; CSP FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Dual-Perimeter Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Web Application Firewalls (WAF) and Content Security Policy (CSP) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Web Application Firewalls (WAF) and Content Security Policy (CSP) form the ultimate Dual-Perimeter Defense Architecture! Understand the division of labor: The Cloud Edge WAF (AWS WAF, Cloudflare, ModSecurity Core Rule Set) acts as the outer gatekeeper, inspecting Layer 7 HTTP traffic, blocking automated bot scanners, and applying instant Virtual Patches for critical zero-day vulnerabilities like Log4Shell. However, because WAFs rely on heuristic pattern matching that can be bypassed through obfuscation, never treat a WAF as a replacement for 100% Parameterized Prepared Statements! The Browser Perimeter (CSP) operates as the inner defense, enforcing Strict Nonce-Based Gating (`script-src 'self' 'nonce-...' 'strict-dynamic'`). Even if an attacker sneaks past the WAF and injects markup into the web page, the browser refuses to execute any script lacking the dynamic per-request nonce. Combine this with `frame-ancestors 'none'` to eliminate Clickjacking, `X-Content-Type-Options: nosniff` to stop MIME confusion, and HSTS for transport security. Remember that Section 66F of the Indian IT Act penalizes attacks on critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic12;
