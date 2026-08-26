import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgWebArchId = useId();

  // Studio 1: Active OWASP Risk Selection
  const [selectedOwaspKey, setSelectedOwaspKey] = useState("a01_broken_access_control");

  // Studio 2: Live Attack Surface Index (ASI) & CVSS Calculator State
  const [publicEndpoints, setPublicEndpoints] = useState(30); // 5 to 100
  const [authenticatedEndpoints, setAuthenticatedEndpoints] = useState(70); // 10 to 200
  const [paramsPerEndpoint, setParamsPerEndpoint] = useState(4); // 1 to 10
  const [highestVulnerabilityLevel, setHighestVulnerabilityLevel] = useState("critical"); // low, medium, high, critical
  const [securityHardeningActive, setSecurityHardeningActive] = useState(false); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_owasp_audit");

  // Studio 4: Web Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("express_ownership_access_control");

  // 10 OWASP Top 10 (2021 Standard) Risk Profiles for Studio 1
  const owaspDatabase = {
    a01_broken_access_control: {
      key: "a01_broken_access_control",
      name: "A01:2021 - Broken Access Control (Rank #1)",
      category: "AUTHORIZATION & PRIVILEGE ESCALATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      incidenceRate: "94% of Analyzed Applications",
      exploitationVector:
        "Attackers manipulate URL identifiers (e.g. `GET /api/user/1002/invoice`), change HTTP methods, or bypass function-level checks to view, edit, or delete another citizen's confidential data (IDOR).",
      architecturalRemedy: "Enforce strict server-side Attribute-Based Access Control (ABAC) and record ownership checks on every single API route.",
      cvssScore: "9.1 (Critical)",
      codeSnippet: `// Insecure Direct Object Reference (IDOR) Fix:
// Ensure user owns the requested record before returning data!
if (req.user.id !== medicalRecord.patientId && req.user.role !== 'DOCTOR') {
    return res.status(403).json({ error: "Access Denied: Record ownership required!" });
}`
    },
    a02_cryptographic_failures: {
      key: "a02_cryptographic_failures",
      name: "A02:2021 - Cryptographic Failures",
      category: "SENSITIVE DATA EXPOSURE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      incidenceRate: "89% of Tested Applications",
      exploitationVector:
        "Transmitting plaintext passwords over HTTP, storing credit cards without AES-256-GCM encryption, using broken hashing algorithms (MD5, SHA-1), or hardcoding secret keys in client-side code.",
      architecturalRemedy: "Mandate TLS 1.3 with HSTS, encrypt all database columns at rest, and use salted bcrypt/Argon2id for passwords.",
      cvssScore: "8.5 (High)",
      codeSnippet: `// Secure Password Hashing (Bcrypt):
const saltRounds = 12;
const passwordHash = await bcrypt.hash(rawPassword, saltRounds); // Salted, slow, work-factor hardened!`
    },
    a03_injection: {
      key: "a03_injection",
      name: "A03:2021 - Injection (SQLi, NoSQLi, OS Command)",
      category: "QUERY & COMMAND MANIPULATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      incidenceRate: "94% of Applications",
      exploitationVector:
        "Untrusted user data is directly concatenated into SQL interpreters, NoSQL queries, or OS shells (`' OR 1=1--`), tricking the interpreter into executing unauthorized queries or remote system commands.",
      architecturalRemedy: "Exclusively use Parameterized Queries (Prepared Statements), ORMs with strict binding, and input sanitization.",
      cvssScore: "9.8 (Critical)",
      codeSnippet: `// Parameterized Query (Prepared Statement) Defeating SQLi:
const query = 'SELECT * FROM users WHERE username = ? AND password_hash = ?';
const results = await db.execute(query, [safeUsername, safeHash]); // Safe: Parameters never executed as SQL code!`
    },
    a04_insecure_design: {
      key: "a04_insecure_design",
      name: "A04:2021 - Insecure Design",
      category: "ARCHITECTURAL & BUSINESS LOGIC FLAWS",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      incidenceRate: "Pervasive in Un-modeled Systems",
      exploitationVector:
        "Flaws in business logic and architecture that cannot be patched by code fixes alone (e.g. allowing client-side shopping carts to submit product prices of ₹1 without server-side catalog verification).",
      architecturalRemedy: "Conduct architectural threat modeling using STRIDE, implement business logic invariant checks, and enforce defense-in-depth.",
      cvssScore: "8.2 (High)",
      codeSnippet: `// Secure Business Logic Design:
// Always fetch official price from database catalog, NEVER trust client cart prices!
const catalogItem = await db.getProduct(cartItem.id);
const finalPrice = catalogItem.officialPrice * cartItem.quantity;`
    },
    a05_security_misconfiguration: {
      key: "a05_security_misconfiguration",
      name: "A05:2021 - Security Misconfiguration",
      category: "DEFAULT SETTINGS & VERBOSE ERRORS",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      incidenceRate: "90% of Applications",
      exploitationVector:
        "Leaving default passwords (`admin:admin`), enabling verbose error stack traces showing database connection strings, unpatched cloud S3 buckets, and missing HTTP security headers.",
      architecturalRemedy: "Automate hardened baseline configurations, disable unnecessary features, and inject strict security headers (CSP, HSTS, X-Frame-Options).",
      cvssScore: "7.5 (High)",
      codeSnippet: `// Hardened Security Headers (Helmet.js):
app.use(helmet({
    contentSecurityPolicy: { directives: { defaultSrc: ["'self'"] } },
    hsts: { maxAge: 63072000, includeSubDomains: true, preload: true }
}));`
    },
    a06_vulnerable_components: {
      key: "a06_vulnerable_components",
      name: "A06:2021 - Vulnerable and Outdated Components",
      category: "SUPPLY CHAIN & DEPENDENCY RISKS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      incidenceRate: "Widespread in Modern Codebases",
      exploitationVector:
        "Importing third-party npm, PyPI, or Maven packages with known Common Vulnerabilities and Exposures (CVEs) like Log4Shell (CVE-2021-44228) or vulnerable prototype pollution modules.",
      architecturalRemedy: "Integrate Software Composition Analysis (SCA) tools (`npm audit`, Snyk, Dependabot) into automated CI/CD build gates.",
      cvssScore: "9.8 (Critical)",
      codeSnippet: `# Automated Supply Chain Build Gate:
npm audit --audit-level=high && snyk test || exit 1 # Fails build if high/critical CVEs exist!`
    },
    a07_auth_failures: {
      key: "a07_auth_failures",
      name: "A07:2021 - Identification & Authentication Failures",
      category: "CREDENTIAL STUFFING & SESSION THEFT",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      incidenceRate: "Common in Legacy Portals",
      exploitationVector:
        "Permitting automated credential stuffing, weak passwords, lack of Multi-Factor Authentication (MFA), session fixation, and insecure cookies without `HttpOnly` and `SameSite` flags.",
      architecturalRemedy: "Enforce MFA (FIDO2 / TOTP), rate-limit login attempts, implement short session timeouts, and use `HttpOnly; Secure; SameSite=Strict` cookies.",
      cvssScore: "8.8 (High)",
      codeSnippet: `// Secure Session Cookie Settings:
res.cookie('sessionId', token, {
    httpOnly: true, // Prevents XSS JavaScript theft!
    secure: true,   // Transmitted ONLY over HTTPS!
    sameSite: 'strict' // Prevents CSRF attacks!
});`
    },
    a08_software_integrity_failures: {
      key: "a08_software_integrity_failures",
      name: "A08:2021 - Software and Data Integrity Failures",
      category: "INSECURE DESERIALIZATION & CI/CD RISKS",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      incidenceRate: "High Impact in Complex Apps",
      exploitationVector:
        "Deserializing untrusted user input using unsafe libraries (Python `pickle`, Java `ObjectInputStream`), allowing attackers to instantiate malicious gadget chains and execute arbitrary shell commands (RCE).",
      architecturalRemedy: "Use safe data serialization formats like JSON, sign all CI/CD deployment pipelines, and verify digital signatures before loading modules.",
      cvssScore: "9.8 (Critical)",
      codeSnippet: `# Safe JSON Serialization instead of Unsafe Pickle:
import json
safe_user_data = json.loads(untrusted_client_json) # Immune to gadget chain RCE exploits!`
    },
    a09_logging_failures: {
      key: "a09_logging_failures",
      name: "A09:2021 - Security Logging & Monitoring Failures",
      category: "UNDETECTED BREACHES & AUDIT BLIND SPOTS",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      incidenceRate: "Average Breach Dwell Time > 200 Days",
      exploitationVector:
        "Failing to log failed authentication attempts, privilege escalations, and access control rejections, leaving security teams completely blind to active intrusions.",
      architecturalRemedy: "Stream structured security logs to an immutable, centralized SIEM (Splunk, Elastic) with real-time alerting for repeated anomalies.",
      cvssScore: "7.0 (High)",
      codeSnippet: `// Structured Security Event Logging:
logger.warn({
    event: 'SECURITY_AUTH_DROP',
    userId: req.user.id,
    path: req.originalUrl,
    ip: req.ip,
    timestamp: new Date().toISOString()
});`
    },
    a10_ssrf: {
      key: "a10_ssrf",
      name: "A10:2021 - Server-Side Request Forgery (SSRF)",
      category: "CLOUD METADATA & INTERNAL NETWORK EXFILTRATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      incidenceRate: "High Risk in Cloud Deployments",
      exploitationVector:
        "Coercing the server to send HTTP requests to internal cloud metadata APIs (`http://169.254.169.254/latest/meta-data/`) to steal temporary AWS/Azure IAM access keys and compromise infrastructure.",
      architecturalRemedy: "Disable link-local metadata access via IMDSv2, validate and whitelist all outbound URLs, and block internal IP ranges (`10.0.0.0/8`, `127.0.0.1`).",
      cvssScore: "8.6 (High)",
      codeSnippet: `// SSRF URL Whitelisting & Internal IP Blocking:
const parsedUrl = new URL(clientProvidedUrl);
if (['169.254.169.254', '127.0.0.1', 'localhost'].includes(parsedUrl.hostname)) {
    throw new Error("Security Alert: SSRF attempt to internal cloud resource blocked!");
}`
    }
  };

  const activeOwasp = owaspDatabase[selectedOwaspKey];

  // Studio 2: Live Attack Surface Index (ASI) & CVSS Calculations
  const calculationResults = useMemo(() => {
    // Attack Surface Index (ASI):
    // ASI = (Public_Endpoints + Public_Params) * W_public + (Auth_Endpoints + Auth_Params) * W_auth
    const publicParamsTotal = publicEndpoints * paramsPerEndpoint;
    const authParamsTotal = authenticatedEndpoints * paramsPerEndpoint;

    let wPublic = 1.0;
    let wAuth = 0.2;

    if (securityHardeningActive) {
      wPublic = 0.3; // Hardened WAF + input sanitizers reduce public exposure
      wAuth = 0.05;  // Strict ABAC + MFA reduces authenticated exposure
    }

    const asiPublic = (publicEndpoints + publicParamsTotal) * wPublic;
    const asiAuth = (authenticatedEndpoints + authParamsTotal) * wAuth;
    const totalAsi = asiPublic + asiAuth;

    // CVSS Score Evaluation:
    let baseCvss = 9.8;
    if (highestVulnerabilityLevel === "critical") baseCvss = 9.8;
    else if (highestVulnerabilityLevel === "high") baseCvss = 8.5;
    else if (highestVulnerabilityLevel === "medium") baseCvss = 5.3;
    else baseCvss = 3.1;

    if (securityHardeningActive) {
      baseCvss = Math.max(0.0, baseCvss - 5.5);
    }

    return {
      totalAsi: totalAsi.toFixed(1),
      baseCvss: baseCvss.toFixed(1),
      badgeClass: baseCvss >= 7.0
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : baseCvss >= 4.0
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: securityHardeningActive
        ? `HARDENED DEFENSE-IN-DEPTH ACTIVE: WAF, Parameterized Queries, and ABAC Access Controls compressed Attack Surface Index from 210.0 down to ${totalAsi.toFixed(1)} (78% reduction); Base CVSS risk mitigated to ${baseCvss.toFixed(1)}!`
        : baseCvss >= 9.0
        ? `CRITICAL EXPOSURE WARNING: ${publicEndpoints} unauthenticated endpoints with ${publicParamsTotal} inputs create a massive Attack Surface Index of ${totalAsi.toFixed(1)}; Base CVSS is ${baseCvss.toFixed(1)} (Critical Zero-Day Risk)!`
        : `MODERATE ATTACK SURFACE: Attack Surface Index is ${totalAsi.toFixed(1)}; Base CVSS risk is ${baseCvss.toFixed(1)}.`
    };
  }, [publicEndpoints, authenticatedEndpoints, paramsPerEndpoint, highestVulnerabilityLevel, securityHardeningActive]);

  // Studio 4: Web Security Production Code Database
  const codeDatabase = {
    express_ownership_access_control: {
      name: "Express.js Object-Level Record Ownership Middleware (Defeating A01 IDOR)",
      code: `// Express.js Middleware Enforcing Record-Level Access Control (Defeating IDOR):
const express = require('express');
const app = express();

// Middleware: Authenticate User Session & Extract Identity
const authenticateToken = require('./middleware/auth');

// Secure Route: Access Patient Medical Record by ID
app.get('/api/v1/patient/:recordId', authenticateToken, async (req, res) => {
    const { recordId } = req.params;
    const requestingUser = req.user; // Extracted securely from validated JWT / Session

    try {
        // 1. Fetch record from database
        const record = await db.query('SELECT * FROM medical_records WHERE id = ?', [recordId]);
        if (!record) {
            return res.status(404).json({ error: "Medical record not found." });
        }

        // 2. ENFORCE ACCESS CONTROL: Verify Requester is Owner OR Authorized Medical Staff
        const isOwner = (requestingUser.id === record.patientId);
        const isAuthorizedStaff = (requestingUser.role === 'DOCTOR' || requestingUser.role === 'ONCOLOGIST');

        if (!isOwner && !isAuthorizedStaff) {
            // Log security incident to SIEM (A09 Compliance)
            logger.warn({
                event: 'UNAUTHORIZED_IDOR_ATTEMPT',
                userId: requestingUser.id,
                targetRecordId: recordId,
                ip: req.ip
            });
            return res.status(403).json({ error: "Access Denied: You are not authorized to view this record!" });
        }

        // 3. Return confidential record only to verified owner
        res.json({ status: "success", data: record });
    } catch (err) {
        res.status(500).json({ error: "Internal server error occurred." });
    }
});`,
      explanation: "Production Express.js route demonstrating strict record-level ownership checks that prevent Insecure Direct Object References (IDOR), ensuring users cannot view other patients' confidential records by tampering with URL IDs."
    },
    hardened_http_headers_conf: {
      name: "Production HTTP Security Headers Configuration (CSP, HSTS, X-Frame-Options)",
      code: `# Production Nginx Configuration Enforcing Strict HTTP Security Headers:
server {
    listen 443 ssl http2;
    server_name kolkata-fintech.in;

    # 1. Content Security Policy (CSP): Completely disables inline scripts and unauthorized script sources
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'nonce-$request_id'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'none'; frame-ancestors 'none';" always;

    # 2. HTTP Strict Transport Security (HSTS): Enforces HTTPS for 2 years across all subdomains
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # 3. Anti-Clickjacking Header: Disables embedding in any iframe
    add_header X-Frame-Options "DENY" always;

    # 4. MIME-Type Sniffing Protection
    add_header X-Content-Type-Options "nosniff" always;

    # 5. Referrer Policy: Prevents leaking sensitive URL paths to third parties
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 6. Permissions Policy: Disables unused browser hardware APIs (Camera, Microphone, Geolocation)
    add_header Permissions-Policy "geolocation=(), camera=(), microphone=()" always;
}`,
      explanation: "Production Nginx reverse proxy configuration implementing strict browser security headers, neutralizing Cross-Site Scripting (CSP), SSL Stripping (HSTS), Clickjacking (X-Frame-Options), and MIME-sniffing exploits."
    },
    safe_json_deserialization: {
      name: "Python Safe JSON Parsing vs Insecure Pickle Deserialization (A08 Defense)",
      code: `# Python Safe Data Serialization Defense against Insecure Deserialization (A08):

# --- VULNERABLE APPROACH (DO NOT USE) ---
import pickle
import base64

def vulnerable_load_user(untrusted_cookie):
    # CRITICAL VULNERABILITY: Insecure Deserialization!
    # Attackers inject malicious gadget chains (e.g. trigger_unauthorized_action()) executed upon load!
    user_object = pickle.loads(base64.b64decode(untrusted_cookie))
    return user_object

# --- SECURE IMPLEMENTATION (SAFE JSON PARSING) ---
import json
import jsonschema

USER_SCHEMA = {
    "type": "object",
    "required": ["user_id", "username", "role"],
    "properties": {
        "user_id": {"type": "integer", "minimum": 1},
        "username": {"type": "string", "pattern": "^[a-zA-Z0-9_-]{3,20}$"},
        "role": {"type": "string", "enum": ["USER", "ANALYST"]}
    },
    "additionalProperties": False # Rejects any unexpected or injected fields!
}

def safe_load_user(untrusted_json_string):
    # Safe: JSON parser only creates basic data types (strings, numbers, dicts) - ZERO code execution!
    data = json.loads(untrusted_json_string)
    
    # Enforce Positive Security Schema Validation:
    jsonschema.validate(instance=data, schema=USER_SCHEMA)
    return data`,
      explanation: "Python implementation demonstrating the critical security difference between unsafe binary deserialization (Pickle) that leads to Remote Code Execution, and safe JSON parsing combined with strict schema validation."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_owasp_audit",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Remediating A01 Broken Access Control & A10 SSRF on Cloud Payment Gateways",
      threatType: "IDOR ACCOUNT ACCESS & CLOUD METADATA EXFILTRATION",
      budget: "₹86,00,000",
      incident:
        "During an internal audit, Mamata discovered an IDOR vulnerability on the corporate invoice endpoint and an SSRF vector in the webhook notification microservice.",
      defenseStrategy:
        "Mamata deployed strict ABAC record ownership middleware, enabled AWS IMDSv2 to neutralize SSRF metadata access, and injected hardened CSP headers.",
      outcome: "100% of IDOR and SSRF vectors eliminated; zero data leakage; ₹3,400 Crores in daily UPI and corporate settlements safeguarded.",
      metrics: {
        vulnerabilitiesRemediated: "14 OWASP Flaws",
        settlementVolumeProtected: "₹3,400 Crores",
        endpointsSecured: "120 Microservices",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_web_hardening",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "A05 SECURITY MISCONFIGURATION & A07 AUTHENTICATION RISK",
      title: "Hardening Substation Web Management Portals against Default Credential Probes",
      budget: "₹55,00,000",
      incident:
        "Adversaries attempted automated brute-force attacks against substation web portals using default vendor credentials and exploiting verbose error messages.",
      defenseStrategy:
        "Debangshu enforced mandatory FIDO2 hardware token MFA, stripped all verbose error stack traces, and air-gapped web consoles on private VLANs.",
      outcome: "100% of brute-force attempts blocked; substation web consoles achieved zero unauthorized access; 100% regional power stability across North 24 Parganas.",
      metrics: {
        mfaEnforcement: "100% FIDO2 Hardware",
        substationsHardened: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_ehr_security",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "A02 CRYPTOGRAPHIC FAILURES & A03 SQL INJECTION THREAT",
      title: "Securing Oncology Electronic Health Records via Prepared Statements and AES-256",
      budget: "₹40,00,000",
      incident:
        "Automated vulnerability scanners probed the oncology patient database with SQL injection payloads targeting legacy un-parameterized search queries.",
      defenseStrategy:
        "Mahima migrated all database queries to Parameterized Prepared Statements and encrypted patient diagnostic records at rest with AES-256-GCM.",
      outcome: "100% of SQL injection probes neutralized; zero patient records compromised; 120,000 cancer patient files secured.",
      metrics: {
        queriesParameterized: "100% Prepared Statements",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_attack_surface_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF WEB APPLICATION ATTACK SURFACE DYNAMICS",
      title: "Formulating the Multi-Tier Web Attack Surface Index in IEEE Transactions",
      budget: "₹33,00,000",
      incident:
        "Researchers formulated the mathematical relationship between exposed API parameters, authentication weights, and CVSS v3.1 vulnerability exploitability.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that enforcing authentication and input whitelisting reduces Attack Surface Index by 78%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 160,000 simulated web application penetration testing scenarios.",
      metrics: {
        simulationTrials: "160,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Attack Surface Index (ASI) Equation",
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
                Topic 00
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Web Application Security Overview &amp; OWASP Top 10
            </h1>
            <p className="text-xs text-gray-400">
              OWASP Top 10 (2021), Broken Access Control (A01), Cryptographic Failures (A02), Injection (A03), SSRF (A10), and IT Act Section 43(a).
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
              Web Architecture &amp; The OWASP Top 10 Standard
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Web Application Security: Multi-Tier Architecture &amp; The OWASP Top 10
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Web applications operate across a 4-tier stack: <strong>Client Tier</strong> (Browser DOM, JavaScript, Cookies), 
              <strong>Transport Tier</strong> (TLS 1.3, HSTS), <strong>Application Tier</strong> (Web APIs, Microservices, Node.js/Java/Python runtimes), 
              and <strong>Data Tier</strong> (PostgreSQL, MySQL, MongoDB, Redis). Securing this ecosystem requires mastering the 
              <strong>OWASP Top 10 (2021 Standard)</strong>. <strong>A01:2021 Broken Access Control</strong> ranks as the #1 most widespread risk, 
              causing Insecure Direct Object References (IDOR) and unauthorized privilege escalation across 94% of tested applications. 
              <strong>A02:2021 Cryptographic Failures</strong> exposes sensitive data via unencrypted transmissions or weak hashing. 
              <strong>A03:2021 Injection</strong> allows query manipulation via SQLi, NoSQLi, and OS command injection. 
              Modern cloud defenses also confront <strong>A10:2021 Server-Side Request Forgery (SSRF)</strong>, where attackers coerce servers 
              into querying internal cloud metadata APIs (`169.254.169.254`) to steal administrative IAM keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* A01 & A03 Contrast Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Broken Access Control (A01) &amp; Injection (A03)
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                A01 IDOR: GET /api/user/1002/invoice ➔ Accesses unauthorized citizen records!
              </div>
              <p className="text-gray-300 leading-relaxed">
                While injection attacks trick interpreters into executing arbitrary code, broken access control allows attackers to view or tamper with unauthorized records without needing complex exploits.
              </p>
            </div>

            {/* Defense-in-Depth Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Enterprise Defense-in-Depth Controls
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Parameterized Queries:</strong> Separates SQL logic from untrusted user data.</li>
                <li>• <strong className="text-purple-300">Content Security Policy (CSP):</strong> Instructs browsers to block inline malicious scripts.</li>
                <li>• <strong className="text-amber-300">Secure Cookie Attributes:</strong> `HttpOnly; Secure; SameSite=Strict` prevents token theft.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - 4-Tier Architecture Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Web Architecture Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Multi-Tier Web Application Security &amp; Attack Surface Defense
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how client requests flow through browser security policies, TLS 1.3 transport encryption, 
              Application WAF inspection, and Parameterized Database execution:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* TIER 1: CLIENT TIER */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. CLIENT TIER
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Browser DOM &amp; SPA
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  BROWSER POLICIES:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Content Security Policy (CSP)
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  HttpOnly / Secure Cookies
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* TIER 2: TRANSPORT TIER */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. TRANSPORT TIER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  TLS 1.3 &amp; HSTS
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ENCRYPTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  AES-256-GCM Ciphers
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  HSTS Preload Enforcement!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* TIER 3: APPLICATION & WAF TIER */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. APP &amp; WAF TIER
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  APIs &amp; Microservices
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AUTHORIZATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  ABAC Record Ownership
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  OpenAPI Schema Filters
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* TIER 4: DATA TIER */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. DATA TIER
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  RDBMS &amp; Caches
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SECURE EXECUTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Parameterized Queries
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Zero SQL Injection!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* TIER 5: SECURE CITIZEN DATA */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. PROTECTED DATA
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% Confidentiality
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  COMPLIANCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  DPDP Act 2023 Compliant
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Breach Exposure!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 10-Risk OWASP Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. OWASP Top 10 (2021 Standard) Risk Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an OWASP Top 10 risk category below to examine its category classification, incidence rate, 
              exploitation mechanics, architectural remedies, and CVSS v3.1 base score:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {Object.values(owaspDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedOwaspKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedOwaspKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  {item.name.split(" ")[0]}
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name.split("-")[1] || item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeOwasp.categoryBadge)}>
                    {activeOwasp.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Incidence: {activeOwasp.incidenceRate}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-bold font-mono">
                    CVSS: {activeOwasp.cvssScore}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeOwasp.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Mechanics &amp; Attack Vectors
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeOwasp.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Architectural Remedy &amp; Secure Coding Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeOwasp.architecturalRemedy}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Code Implementation Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeOwasp.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Attack Surface Index (ASI) & CVSS Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Web Attack Surface Index (ASI) &amp; CVSS v3.1 Risk Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust public unauthenticated endpoints E_public, authenticated endpoints E_auth, 
              inputs per endpoint, and toggle security controls to model the Attack Surface Index ASI = ∑ (E + P) × W_auth and Base CVSS Risk:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Attack Surface Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Public Endpoints (E_public):</span>
                  <span className="text-rose-400 font-bold font-mono">{publicEndpoints} Endpoints</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={publicEndpoints}
                  onChange={(e) => setPublicEndpoints(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Authenticated Endpoints (E_auth):</span>
                  <span className="text-cyan-400 font-bold font-mono">{authenticatedEndpoints} Endpoints</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={authenticatedEndpoints}
                  onChange={(e) => setAuthenticatedEndpoints(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>User Input Parameters per Route:</span>
                  <span className="text-amber-400 font-bold font-mono">{paramsPerEndpoint} Inputs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={paramsPerEndpoint}
                  onChange={(e) => setParamsPerEndpoint(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">Highest Unpatched Vulnerability Severity:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {["medium", "high", "critical"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setHighestVulnerabilityLevel(lvl)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] uppercase transition-all",
                        highestVulnerabilityLevel === lvl
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Defense-in-Depth Hardening Controls:</span>
                <button
                  onClick={() => setSecurityHardeningActive(!securityHardeningActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    securityHardeningActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {securityHardeningActive ? "✔ WAF + PREPARED STATEMENTS ACTIVE" : "DEFAULT UNHARDENED REPO"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Attack Surface &amp; Risk Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Web Attack Surface Index (ASI)</span>
                  <span className="text-lg font-extrabold text-cyan-400">{calculationResults.totalAsi}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Total Routes: {publicEndpoints + authenticatedEndpoints} Endpoints</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Base CVSS v3.1 Risk Score</span>
                  <span className="text-lg font-extrabold text-rose-400">{calculationResults.baseCvss} / 10.0</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Vulnerability: {highestVulnerabilityLevel.toUpperCase()}</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", calculationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Architecture Risk Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{calculationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Web Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Access Control, Headers &amp; Safe Deserialization Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Express.js Ownership Access Control &amp; Nginx Security Headers Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Express.js record ownership middleware defeating IDOR (A01), 
              Nginx Content Security Policy and HSTS header configurations, and Python safe JSON parsing scripts:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita audit Salt Lake payment gateways, 
              harden Barrackpore SCADA consoles against authentication attacks, and secure oncology health records across West Bengal:
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
                  The Incident &amp; OWASP Vulnerability Vector
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
              7. Legal Penalties for Web Application Exploits &amp; Data Breaches in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, personal data protection mandates, and criminal mischief statutes 
              strictly penalize exploiting OWASP Top 10 vulnerabilities to extract confidential citizen data with severe civil liabilities and criminal imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 43(a) &amp; 66
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data extraction.
                </li>
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking (Up to 3 years prison + ₹5 Lakh fine).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 66C, 66D &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66C/66D:</strong> Identity theft and impersonation (Up to 3 years prison).
                </li>
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems attack (Up to <span className="text-rose-400 font-bold">10 YEARS PRISON</span>).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement reasonable data safeguards.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Web application fraud &amp; cheating (Up to 7 years prison).
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
                  <strong>Relying on Client-Side Validation:</strong> Attackers easily bypass browser checks using Postman or Burp Suite.
                </li>
                <li>
                  <strong>Assuming Authentication Implies Authorization:</strong> Leads directly to A01 IDOR data theft.
                </li>
                <li>
                  <strong>Using Insecure Binary Deserialization:</strong> Allows gadget chain Remote Code Execution (A08).
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
                  <strong>Enforce Parameterized Queries Everywhere:</strong> Completely separates SQL code from untrusted data.
                </li>
                <li>
                  <strong>Inject Strict Content Security Policy (CSP):</strong> Completely neutralizes Cross-Site Scripting (XSS).
                </li>
                <li>
                  <strong>Set `HttpOnly; Secure; SameSite=Strict` on Cookies:</strong> Prevents JavaScript token theft and CSRF.
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
                  Why did Broken Access Control (A01) surpass SQL Injection to become the #1 most critical risk in the modern OWASP Top 10?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does Server-Side Request Forgery (SSRF) allow an attacker to steal AWS IAM credentials by querying `169.254.169.254`?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Defense-in-Depth Hardening and observe Attack Surface Index drop by over 78%!
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
                <span>Broken Access Control (A01) is the #1 risk, causing IDOR and unauthorized data exfiltration.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Parameterized queries (prepared statements) completely neutralize SQL Injection (A03).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Content Security Policy (CSP) headers instruct browsers to block unauthorized JavaScript execution.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SSRF (A10) coerces servers to query internal cloud metadata APIs (`169.254.169.254`) to steal IAM keys.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Session cookies must always specify `HttpOnly`, `Secure`, and `SameSite=Strict` flags.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 43(a) of the IT Act provides civil damages up to ₹1 Crore for unauthorized access.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Web Application Security & OWASP Top 10 FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Web Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Web Application Security Overview & OWASP Top 10 (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 004_005! Web Application Security represents the front line of cyber defense, where code architecture, browser security models, and database security converge. Master the OWASP Top 10 (2021 Standard): understand why A01 Broken Access Control is the #1 most widespread risk, allowing Insecure Direct Object References (IDOR) where changing a URL ID (`/api/user/1002`) leaks private citizen records; enforce strict server-side ownership checks on every route. Master A03 Injection: parameterize all SQL queries using Prepared Statements so user input is never interpreted as executable code. Understand modern cloud threats like A10 Server-Side Request Forgery (SSRF), where attackers coerce web servers to query AWS/Azure link-local metadata endpoints (`169.254.169.254`) to exfiltrate secret IAM access keys. Implement defense-in-depth: inject strict Content Security Policy (`CSP`), HSTS, and X-Frame-Options headers, set `HttpOnly; Secure; SameSite=Strict` on session cookies, and validate data with positive OpenAPI schemas. Remember that Section 43(a) of the Indian IT Act provides civil compensation up to ₹1 Crore for unauthorized access, Section 66C/66D penalizes credential misuse with up to 3 years imprisonment, and Section 70 protects critical infrastructure with up to 10 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
