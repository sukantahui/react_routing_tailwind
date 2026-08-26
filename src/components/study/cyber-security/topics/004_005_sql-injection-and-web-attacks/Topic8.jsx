import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgCsrfPipelineId = useId();

  // Studio 1: Active CSRF / Access Control Vector Selection
  const [selectedVectorKey, setSelectedVectorKey] = useState("ambient_csrf_form");

  // Studio 2: Live CSRF & IDOR Permission Access Control Laboratory State
  const [scenarioType, setScenarioType] = useState("idor_invoice_lookup"); // idor_invoice_lookup, vertical_role_promotion, cross_site_fund_transfer
  const [requestingUser, setRequestingUser] = useState("user_mamata"); // user_mamata (ID 10), user_debangshu (ID 11), admin_mahima (ID 1)
  const [targetResourceOwner, setTargetResourceOwner] = useState("user_debangshu"); // user_mamata, user_debangshu
  const [activeDefenses, setActiveDefenses] = useState({
    sameSiteStrict: false,
    antiCsrfToken: false,
    tenantOwnershipCheck: false
  });

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_csrf_defense");

  // Studio 4: Access Control Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("double_submit_csrf_middleware");

  // 8 Vectors for Studio 1
  const vectorDatabase = {
    ambient_csrf_form: {
      key: "ambient_csrf_form",
      name: "1. Ambient Authority Form CSRF",
      category: "CROSS-ORIGIN REQUEST FORGERY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      vulnerabilityType: "Exploits automatic browser cookie transmission on cross-site forms.",
      vulnerabilityMechanism:
        "When an authenticated user visits `attacker.in`, a hidden auto-submitting `<form action=\"https://bank.in/transfer\" method=\"POST\">` executes; the browser automatically attaches session cookies, executing the transfer without user intent.",
      mitigationPattern: "Deploy `SameSite=Strict` cookies and Double-Submit Anti-CSRF tokens.",
      typicalPayload: "<form action='https://bank.in/api/transfer' method='POST'><input name='amount' value='500000'/></form>",
      codeSnippet: `// Malicious Auto-Submitting Form:
<body onload="document.forms[0].submit()">
  <form action="https://kolkata-fintech.in/api/pay" method="POST">
    <input type="hidden" name="to" value="Hacker_Account" />
  </form>
</body>`
    },
    samesite_strict_defense: {
      key: "samesite_strict_defense",
      name: "2. SameSite=Strict Cookie Gating",
      category: "BROWSER COOKIE ISOLATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      vulnerabilityType: "Completely blocks cross-site cookie transmission.",
      vulnerabilityMechanism:
        "Instructs the browser to NEVER attach the session cookie on any cross-site request (even when following external links), guaranteeing that cross-site requests arrive unauthenticated.",
      mitigationPattern: "Set `Set-Cookie: session=token; Secure; HttpOnly; SameSite=Strict`.",
      typicalPayload: "Set-Cookie: session=xyz; SameSite=Strict; Secure; HttpOnly",
      codeSnippet: `// SameSite=Strict Cookie Header:
Set-Cookie: session_token=9f8e7d6c5b4a; Secure; HttpOnly; SameSite=Strict; Path=/;`
    },
    double_submit_csrf_token: {
      key: "double_submit_csrf_token",
      name: "3. Double-Submit Anti-CSRF Token",
      category: "STATELESS INTENT VERIFICATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      vulnerabilityType: "Stateless verification for modern REST & SPA architectures.",
      vulnerabilityMechanism:
        "The server sends a cryptographic token in a cookie; client JavaScript reads it and sends the identical value in a custom header (`X-XSRF-TOKEN`); the server verifies `cookieToken === headerToken`.",
      mitigationPattern: "Mandatory token comparison middleware on all state-changing endpoints.",
      typicalPayload: "Header: X-XSRF-TOKEN: 9841af8e... | Cookie: XSRF-TOKEN=9841af8e...",
      codeSnippet: `// Double-Submit Verification:
if (req.cookies['XSRF-TOKEN'] !== req.headers['x-xsrf-token']) {
    return res.status(403).json({ error: "CSRF token mismatch!" });
}`
    },
    idor_direct_object_ref: {
      key: "idor_direct_object_ref",
      name: "4. Insecure Direct Object Reference (IDOR)",
      category: "BROKEN OBJECT-LEVEL AUTHORIZATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      vulnerabilityType: "Accessing other users' private database records via sequential IDs.",
      vulnerabilityMechanism:
        "An endpoint (`/api/invoices/:id`) queries database records directly by integer primary key without verifying whether the requesting authenticated user owns the resource.",
      mitigationPattern: "Enforce ownership validation: `SELECT * FROM invoices WHERE id = $1 AND user_id = $2`.",
      typicalPayload: "/api/invoices/106 (Changed from /api/invoices/105)",
      codeSnippet: `// Vulnerable IDOR Endpoint:
app.get('/api/invoice/:id', async (req, res) => {
    // VULNERABILITY: No user ownership check!
    const row = await db.query('SELECT * FROM invoices WHERE id = $1', [req.params.id]);
    res.json(row);
});`
    },
    vertical_privilege_escalation: {
      key: "vertical_privilege_escalation",
      name: "5. Vertical Privilege Escalation",
      category: "ROLE HIERARCHY BYPASS",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      vulnerabilityType: "Regular users invoking hidden administrative functions.",
      vulnerabilityMechanism:
        "The application hides admin buttons in the UI but fails to verify administrative roles on the backend API (`/api/admin/resetSystem`), allowing regular users to execute admin actions.",
      mitigationPattern: "Role-Based Access Control (RBAC) middleware on all administrative endpoints.",
      typicalPayload: "POST /api/admin/deleteTenant (Invoked with Regular User Token)",
      codeSnippet: `// RBAC Route Guard Middleware:
function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ error: "Access Forbidden!" });
        next();
    };
}`
    },
    mass_assignment_overposting: {
      key: "mass_assignment_overposting",
      name: "6. Mass Assignment (Over-Posting)",
      category: "UNFILTERED MODEL BINDING",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      vulnerabilityType: "Injecting privileged model properties during profile updates.",
      vulnerabilityMechanism:
        "Directly binding the entire `req.body` into database update functions (`User.update(req.body)`), allowing an attacker to submit `{\"isAdmin\": true}` and self-elevate to Super Admin.",
      mitigationPattern: "Use strict Data Transfer Objects (DTOs) with property whitelisting.",
      typicalPayload: "PUT /api/profile { \"name\": \"Mamata\", \"role\": \"SUPER_ADMIN\" }",
      codeSnippet: `// Secure DTO Whitelisting:
const { name, email, bio } = req.body; // ONLY safe fields bound!
await User.findByIdAndUpdate(req.user.id, { name, email, bio });`
    },
    multitenant_cross_tenant_leak: {
      key: "multitenant_cross_tenant_leak",
      name: "7. Multi-Tenant Cross-Tenant Leakage",
      category: "SHARED SAAS DATABASE DEFECT",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      vulnerabilityType: "Company A accessing Company B's confidential enterprise records.",
      vulnerabilityMechanism:
        "Queries in multi-tenant SaaS platforms omit `AND organization_id = req.user.orgId`, allowing authenticated employees from one tenant to view payroll data from another tenant.",
      mitigationPattern: "PostgreSQL Row-Level Security (RLS) policies enforcing automated tenant isolation.",
      typicalPayload: "SELECT * FROM payroll_records WHERE employee_id = 9841 (Missing org_id!)",
      codeSnippet: `// PostgreSQL Row-Level Security (RLS):
CREATE POLICY tenant_isolation_policy ON payroll_records
    FOR ALL USING (org_id = current_setting('app.current_org_id')::uuid);`
    },
    abac_dynamic_policy_engine: {
      key: "abac_dynamic_policy_engine",
      name: "8. Attribute-Based Access Control (ABAC)",
      category: "CONTEXT-AWARE PERMISSION ENGINE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      vulnerabilityType: "Granular multi-dimensional access control.",
      vulnerabilityMechanism:
        "Evaluates dynamic user attributes, resource metadata, assigned department, and request time/location to make real-time authorization decisions, completely eliminating IDOR.",
      mitigationPattern: "Deploy centralized ABAC policy evaluation engines.",
      typicalPayload: "Policy: Can access patient IF assignedDoctorId == user.id AND dept == 'Oncology'",
      codeSnippet: `// ABAC Decision Logic:
if (record.assignedDoctorId === req.user.id && req.user.dept === 'Oncology') {
    return res.json(record);
}`
    }
  };

  const activeVector = vectorDatabase[selectedVectorKey];

  // Studio 2: Live CSRF & IDOR Permission Access Control Calculations
  const simulationResults = useMemo(() => {
    let accessGranted = false;
    let httpStatus = 200;
    let responseBody = "";
    let reasonText = "";

    const isOwner = requestingUser === targetResourceOwner;
    const isAdmin = requestingUser === "admin_mahima";

    if (scenarioType === "idor_invoice_lookup") {
      if (activeDefenses.tenantOwnershipCheck) {
        if (isOwner || isAdmin) {
          accessGranted = true;
          httpStatus = 200;
          responseBody = `{\n  "status": "success",\n  "invoiceId": "INV-9841",\n  "owner": "${targetResourceOwner}",\n  "amount": "₹4,50,000",\n  "verifiedBy": "Ownership Middleware"\n}`;
          reasonText = "OWNERSHIP VERIFIED: Authenticated user owns the requested invoice resource (or holds Administrator role). Access Granted (HTTP 200).";
        } else {
          accessGranted = false;
          httpStatus = 403;
          responseBody = `{\n  "error": "Forbidden: You do not have permission to access resource belonging to ${targetResourceOwner}."\n}`;
          reasonText = "IDOR PREVENTED: Ownership verification middleware detected resource owner mismatch. Access Denied (HTTP 403).";
        }
      } else {
        // Vulnerable IDOR: Any authenticated user can view any invoice!
        accessGranted = true;
        httpStatus = 200;
        responseBody = `{\n  "status": "VULNERABLE_IDOR_LEAK",\n  "invoiceId": "INV-9841",\n  "owner": "${targetResourceOwner}",\n  "amount": "₹4,50,000",\n  "confidentialTaxPan": "ABCDE1234F"\n}`;
        reasonText = "CRITICAL IDOR VULNERABILITY: Backend returned private invoice data belonging to another citizen without verifying ownership! (HTTP 200).";
      }
    } else if (scenarioType === "vertical_role_promotion") {
      if (isAdmin) {
        accessGranted = true;
        httpStatus = 200;
        responseBody = `{\n  "status": "success",\n  "role": "SUPER_ADMIN",\n  "action": "Authorized System Role Update"\n}`;
        reasonText = "AUTHORIZED: Requesting user holds Administrator credentials. Role update authorized (HTTP 200).";
      } else {
        accessGranted = false;
        httpStatus = 403;
        responseBody = `{\n  "error": "Forbidden: Only administrators can modify role assignments."\n}`;
        reasonText = "PRIVILEGE ESCALATION PREVENTED: Regular user cannot promote accounts to Administrator (HTTP 403).";
      }
    } else {
      // Cross-Site Fund Transfer POST
      const csrfProtected = activeDefenses.sameSiteStrict || activeDefenses.antiCsrfToken;
      if (csrfProtected) {
        accessGranted = false;
        httpStatus = 403;
        responseBody = `{\n  "error": "CSRF Attack Blocked: ${activeDefenses.sameSiteStrict ? "SameSite=Strict Cookie Withheld" : "Invalid/Missing Anti-CSRF Token"}."\n}`;
        reasonText = "CSRF ATTACK NEUTRALIZED: Cross-site request rejected due to active Anti-CSRF token / SameSite=Strict cookie gating! (HTTP 403).";
      } else {
        accessGranted = true;
        httpStatus = 200;
        responseBody = `{\n  "status": "FRAUDULENT_TRANSFER_EXECUTED",\n  "fromAccount": "${requestingUser}",\n  "toAccount": "Hacker_Account_9841",\n  "amount": "₹5,00,000",\n  "mechanism": "Ambient Authority Cookie"\n}`;
        reasonText = "CRITICAL CSRF SUCCESS: Browser automatically attached ambient session cookies to cross-site request; Unauthorized transfer executed! (HTTP 200).";
      }
    }

    return {
      accessGranted,
      httpStatus,
      responseBody,
      reasonText,
      badgeClass: httpStatus === 200 && (scenarioType === "cross_site_fund_transfer" && !activeDefenses.sameSiteStrict && !activeDefenses.antiCsrfToken || scenarioType === "idor_invoice_lookup" && !activeDefenses.tenantOwnershipCheck && !isOwner && !isAdmin)
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : httpStatus === 200
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : "bg-indigo-950 text-indigo-300 border-indigo-800"
    };
  }, [scenarioType, requestingUser, targetResourceOwner, activeDefenses]);

  // Studio 4: Access Control Hardening Production Code Database
  const codeDatabase = {
    double_submit_csrf_middleware: {
      name: "Express.js Production Double-Submit HMAC Anti-CSRF Middleware",
      code: `// Express.js Double-Submit HMAC Anti-CSRF Middleware:
const crypto = require('crypto');

const CSRF_SECRET = process.env.CSRF_SECRET || 'SecretKeyKolkata2026!';

// 1. Generate Signed CSRF Cookie & Token
exports.generateCsrfToken = (req, res, next) => {
    const randomSalt = crypto.randomBytes(8).toString('hex');
    const signature = crypto.createHmac('sha256', CSRF_SECRET).update(randomSalt).digest('hex');
    const token = \`\${randomSalt}.\${signature}\`;

    // Set readable cookie for client JavaScript to send in X-XSRF-TOKEN header:
    res.cookie('XSRF-TOKEN', token, {
        secure: true,
        sameSite: 'Strict',
        httpOnly: false // Client JS must read this to set custom request header
    });
    next();
};

// 2. Validate Anti-CSRF Header on State-Changing HTTP Methods
exports.verifyCsrf = (req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

    const clientHeaderToken = req.headers['x-xsrf-token'];
    const clientCookieToken = req.cookies['XSRF-TOKEN'];

    if (!clientHeaderToken || !clientCookieToken || clientHeaderToken !== clientCookieToken) {
        return res.status(403).json({ error: "CSRF verification failed: Token mismatch or missing!" });
    }

    const [salt, sig] = clientHeaderToken.split('.');
    const expectedSig = crypto.createHmac('sha256', CSRF_SECRET).update(salt).digest('hex');

    if (sig !== expectedSig) {
        return res.status(403).json({ error: "Invalid CSRF cryptographic signature!" });
    }

    next();
};`,
      explanation: "Production Express.js middleware implementing the Double-Submit HMAC Anti-CSRF pattern, generating signed tokens in cookies and validating matching request headers on all state-changing endpoints."
    },
    postgres_row_level_security_rls: {
      name: "PostgreSQL Row-Level Security (RLS) Multi-Tenant Isolation Policy",
      code: `-- Production PostgreSQL Multi-Tenant Row-Level Security (RLS) Script:
-- -------------------------------------------------------------------
-- 1. Enable Row-Level Security on Invoices Table
ALTER TABLE corporate_invoices ENABLE ROW LEVEL SECURITY;

-- 2. Create Tenant Isolation Policy:
-- Guarantees that EVERY query (SELECT, UPDATE, DELETE) automatically filters by the current session's tenant ID!
-- Even if a developer forgets 'WHERE tenant_id = ...' in Node.js, the database kernel enforces isolation!
CREATE POLICY tenant_isolation_policy ON corporate_invoices
    FOR ALL
    USING (
        tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

-- 3. Application Connection Setup in Node.js:
-- Before executing user queries, set the session variable:
-- SET LOCAL app.current_tenant_id = '9f8e7d6c-5b4a-4321-8765-abcdef123456';`,
      explanation: "Production PostgreSQL database script enforcing Row-Level Security (RLS), mathematically guaranteeing that all queries are strictly filtered by the authenticated tenant ID at the database kernel level."
    },
    nodejs_tenant_ownership_controller: {
      name: "Node.js Strict Tenant Ownership Verification Controller",
      code: `// Node.js Strict Tenant Ownership & IDOR Protection Controller:
const { Pool } = require('pg');
const pool = new Pool();

// Secure Controller: View Invoice by UUIDv4 Identifier
exports.getInvoiceDetails = async (req, res, next) => {
    const requestedInvoiceId = req.params.id; // UUIDv4: "9f8e7d6c-5b4a-..."
    const authenticatedUserId = req.user.id;
    const authenticatedTenantId = req.user.tenantId;

    try {
        // 1. SECURE OWNERSHIP VALIDATION QUERY:
        // Always enforce tenant_id and user_id constraints!
        const queryText = \`
            SELECT id, invoice_number, total_amount, status, created_at 
            FROM corporate_invoices 
            WHERE id = $1 AND tenant_id = $2 AND (user_id = $3 OR $4 = 'ADMIN')
        \`;
        const queryValues = [
            requestedInvoiceId,
            authenticatedTenantId,
            authenticatedUserId,
            req.user.role
        ];

        const { rows } = await pool.query(queryText, queryValues);

        if (rows.length === 0) {
            // Return 404 to avoid leaking resource existence to attackers!
            return res.status(404).json({ error: "Invoice not found or access denied." });
        }

        res.json({ status: "success", invoice: rows[0] });
    } catch (err) {
        next(err);
    }
};`,
      explanation: "Production Node.js controller enforcing strict resource ownership checks in SQL queries, validating both tenant organization boundaries and user ownership before returning confidential invoice data."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_csrf_defense",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending UPI Corporate Settlement APIs Against POST-Based CSRF and IDOR",
      threatType: "AMBIENT AUTHORITY CSRF & INVOICE IDOR EXPLOITATION",
      budget: "₹94,00,000",
      incident:
        "Threat actors hosted malicious websites with auto-submitting forms targeting `/api/transfer` to execute unauthorized UPI funds transfers using ambient cookies.",
      defenseStrategy:
        "Mamata deployed `SameSite=Strict` session cookies, implemented Double-Submit HMAC Anti-CSRF tokens, and enforced strict tenant ownership middleware.",
      outcome: "100% of CSRF and IDOR requests blocked; zero unauthorized transfers; ₹4,300 Crores in daily corporate payments safeguarded.",
      metrics: {
        csrfRequestsBlocked: "100.0%",
        settlementVolumeProtected: "₹4,300 Crores",
        endpointsProtected: "95 Payment Endpoints",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_abac_switching",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "BROKEN FUNCTION LEVEL ACCESS CONTROL IN SCADA SWITCHING",
      title: "Deploying Attribute-Based Access Control (ABAC) on Substation Breaker Portals",
      budget: "₹63,00,000",
      incident:
        "Adversaries attempted to invoke hidden substation switching APIs (`/api/scada/breaker/trip`) directly without holding high-voltage operator privileges.",
      defenseStrategy:
        "Debangshu deployed an ABAC policy engine validating operator role, assigned substation node, and hardware MFA tokens before executing grid commands.",
      outcome: "100% of unauthorized switching attempts rejected; zero power disruptions; regional electrical grid stability maintained across North 24 Parganas.",
      metrics: {
        unauthorizedSwitchesBlocked: "100.0%",
        substationsProtected: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_idor_records",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "IDOR ENUMERATION ACROSS ONCOLOGY PATIENT LAB REPORTS",
      title: "Eliminating Sequential IDOR Enumeration Across 120,000 Cancer Diagnostic Files",
      budget: "₹48,00,000",
      incident:
        "Scanners crawled `/api/oncology/report/:id` by incrementing integer IDs, attempting to dump confidential chemotherapy diagnostic records.",
      defenseStrategy:
        "Mahima migrated integer IDs to high-entropy UUIDv4 non-enumerable tokens and enforced doctor-patient assignment ownership verification in Node.js.",
      outcome: "100% of IDOR enumeration attempts neutralized; zero patient records leaked; 120,000 oncology patient files fully protected.",
      metrics: {
        idorEnumerationsBlocked: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_access_lattice_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF ACCESS CONTROL LATTICES & AMBIENT AUTHORITY CSRF",
      title: "Formulating the Formal Access Control Lattice Model in IEEE Transactions",
      budget: "₹41,00,000",
      incident:
        "Researchers formulated mathematical proofs demonstrating that combining SameSite=Strict cookies with tenant ownership verification guarantees zero CSRF and IDOR exploitability.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that ownership verification reduces IDOR exploitability to exactly 0.00%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 380,000 simulated authorization state transitions.",
      metrics: {
        simulationTrials: "380,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Access Control Lattice Model",
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
                Topic 08
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Cross-Site Request Forgery (CSRF) and Broken Access Control
            </h1>
            <p className="text-xs text-gray-400">
              Ambient authority, SameSite cookies, Synchronizer / Double-Submit tokens, IDOR, Mass Assignment, RLS, and IT Act Section 66C.
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
              CSRF &amp; Broken Access Control Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. Cross-Site Request Forgery (CSRF) &amp; Broken Access Control: Exploiting Ambient Authority &amp; Object References
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Cross-Site Request Forgery (CSRF)</strong> exploits "ambient authority"—the browser's automatic inclusion 
              of stored session cookies with every cross-site request—tricking authenticated victims into executing unintended 
              state-changing actions (such as financial transfers or password resets) on trusted web applications. Simultaneously, 
              <strong>Broken Access Control</strong> (ranked #1 on the OWASP Top 10) occurs when applications fail to enforce 
              strict user permission boundaries. Its most rampant variant, <strong>Insecure Direct Object Reference (IDOR)</strong>, 
              occurs when endpoints expose direct database keys (`/api/invoices/105`) without validating whether the requesting 
              authenticated user owns that specific record. Other critical access control flaws include <strong>Vertical Privilege Escalation</strong>, 
              <strong>Mass Assignment (Over-Posting)</strong>, and <strong>Multi-Tenant Cross-Tenant Data Leakage</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Core Vulnerabilities Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The Ambient Authority &amp; IDOR Attack Vectors
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Cross-Site POST ➔ Auto-Attaches Cookie ➔ IDOR /api/invoices/106 ➔ Leaks Secrets!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Without explicit anti-CSRF intent verification and backend resource ownership validation, external websites can execute unauthorized actions and enumerate private citizen data.
              </p>
            </div>

            {/* Enterprise Defensive Architecture Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Enterprise Multi-Tier Defense Controls
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">SameSite=Strict Cookies:</strong> Completely blocks ambient cross-site cookie transmission.</li>
                <li>• <strong className="text-purple-300">Double-Submit Anti-CSRF Tokens:</strong> Validates matching cryptographic tokens on all state-changing routes.</li>
                <li>• <strong className="text-amber-300">Tenant Ownership Middleware &amp; RLS:</strong> Validates `WHERE id = $1 AND tenant_id = $2` in all SQL queries.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - CSRF & Access Control Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              CSRF &amp; Access Control Verification Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing CSRF &amp; IDOR Defense: Gating Intent via Anti-CSRF Tokens &amp; Tenant Ownership
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how modern web applications evaluate incoming requests to block cross-site forgery and enforce resource ownership:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INCOMING REQUEST */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. INCOMING REQUEST
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Cross-Site or Direct API
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  HTTP PAYLOAD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  POST /api/transfer
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Cookie Attached!
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: SAMESITE COOKIE GATING */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. SAMESITE CHECK
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Browser Cookie Policy
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SAMESITE EVAL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SameSite=Strict?
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Cross-Site Cookie Withheld!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: ANTI-CSRF TOKEN VALIDATOR */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. CSRF TOKEN
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Double-Submit HMAC
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TOKEN COMPARISON:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  headerToken === cookie?
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Validates User Intent!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: TENANT OWNERSHIP & RBAC */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. OWNERSHIP CHECK
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  IDOR &amp; RLS Gating
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TENANT ISOLATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  WHERE tenant_id = $2
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Blocks Cross-Tenant IDOR!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: AUTHORIZED TRANSACTION */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. AUTHORIZED
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% Security Verified
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RESULT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Action Executed
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Forgery &amp; IDOR!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector CSRF & Access Control Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. CSRF &amp; Broken Access Control Vector Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an access control or CSRF vector below to examine its category, vulnerability type, 
              mechanics, enterprise mitigation patterns, typical exploit payloads, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(vectorDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedVectorKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedVectorKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  AUTHZ
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeVector.categoryBadge)}>
                    {activeVector.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Type: {activeVector.vulnerabilityType}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[11px]">
                    Payload: {activeVector.typicalPayload}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeVector.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Mechanics &amp; Cross-Site Exploitation
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.vulnerabilityMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeVector.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Exploitation &amp; Execution Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeVector.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live CSRF & IDOR Access Control Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. CSRF &amp; IDOR Permission Access Control Interactive Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select the Access Control Scenario, Requesting User, Target Resource Owner, and toggle Defensive Controls 
              to evaluate authorization state transitions and HTTP responses:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Authorization Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Target API Scenario:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "idor_invoice_lookup", label: "IDOR Invoice Lookup (/api/invoices/105)" },
                    { id: "vertical_role_promotion", label: "Vertical Role Promotion (isAdmin: true)" },
                    { id: "cross_site_fund_transfer", label: "Cross-Site Fund Transfer POST (/api/transfer)" }
                  ].map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => setScenarioType(sc.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        scenarioType === sc.id
                          ? "bg-rose-950 border-rose-500 text-rose-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. Requesting User Context:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "user_mamata", label: "Mamata (ID 10)" },
                    { id: "user_debangshu", label: "Debangshu (ID 11)" },
                    { id: "admin_mahima", label: "Mahima (Admin)" }
                  ].map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setRequestingUser(u.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        requestingUser === u.id
                          ? "bg-purple-950 border-purple-500 text-purple-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Target Resource Owner:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "user_debangshu", label: "Debangshu (ID 11)" },
                    { id: "user_mamata", label: "Mamata (ID 10)" }
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setTargetResourceOwner(o.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] transition-all",
                        targetResourceOwner === o.id
                          ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    &gt;
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">4. Active Defensive Controls:</span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveDefenses(prev => ({ ...prev, sameSiteStrict: !prev.sameSiteStrict }))}
                    className={clsx("w-full p-2 rounded border font-bold text-[10px] text-left transition-all", activeDefenses.sameSiteStrict ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-gray-950 border-gray-800 text-gray-400")}
                  >
                    {activeDefenses.sameSiteStrict ? "✔ SameSite=Strict Cookies Active" : "SameSite=None (Ambient Cookies Sent)"}
                  </button>

                  <button
                    onClick={() => setActiveDefenses(prev => ({ ...prev, antiCsrfToken: !prev.antiCsrfToken }))}
                    className={clsx("w-full p-2 rounded border font-bold text-[10px] text-left transition-all", activeDefenses.antiCsrfToken ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-gray-950 border-gray-800 text-gray-400")}
                  >
                    {activeDefenses.antiCsrfToken ? "✔ Anti-CSRF Token Validation Active" : "No Anti-CSRF Token Validation"}
                  </button>

                  <button
                    onClick={() => setActiveDefenses(prev => ({ ...prev, tenantOwnershipCheck: !prev.tenantOwnershipCheck }))}
                    className={clsx("w-full p-2 rounded border font-bold text-[10px] text-left transition-all", activeDefenses.tenantOwnershipCheck ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-gray-950 border-gray-800 text-gray-400")}
                  >
                    {activeDefenses.tenantOwnershipCheck ? "✔ Tenant Ownership Middleware Active" : "No Tenant Ownership Check (Vulnerable IDOR)"}
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics & Simulated Backend Response */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Backend API Authorization Console</h3>
                <span className={clsx("text-xs px-2.5 py-0.5 rounded font-mono font-bold border", simulationResults.httpStatus === 200 ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-rose-950 text-rose-300 border-rose-800")}>
                  HTTP {simulationResults.httpStatus} {simulationResults.httpStatus === 200 ? "OK" : "FORBIDDEN"}
                </span>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Simulated Server JSON Response:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap border border-cyan-950/60">
                  {simulationResults.responseBody}
                </pre>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Authorization Evaluation Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.reasonText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Access Control Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Anti-CSRF &amp; Tenant Isolation Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Double-Submit Anti-CSRF Middleware, PostgreSQL RLS &amp; Ownership Verification Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Express.js Double-Submit HMAC Anti-CSRF middleware, 
              PostgreSQL Row-Level Security tenant isolation policies, and Node.js ownership validation controllers:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita block CSRF funds transfers in Salt Lake, 
              deploy ABAC switching controls in Barrackpore, and eliminate IDOR records leakage in Ichapur:
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
                  The Incident &amp; Access Control Threat
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
              7. Legal Penalties for CSRF &amp; Broken Access Control (IDOR) in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, identity protection statutes, and personal data protection frameworks 
              strictly penalize executing CSRF or IDOR to steal records or execute fraudulent transfers with severe civil compensation liabilities and criminal imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66C &amp; 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66C:</strong> Identity theft &amp; unauthorized session actions (Up to 3 years prison + ₹1 Lakh fine).
                </li>
                <li>
                  <strong className="text-white">Section 66D:</strong> Personation cheating using computer resources (Up to 3 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data access/damage.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to prevent access control breaches.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Fraudulent funds transfer via CSRF (Up to 7 years prison).
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
                  <strong>Relying ONLY on UI Button Hiding:</strong> Fails; backend APIs must verify user roles.
                </li>
                <li>
                  <strong>Using Sequential Integer IDs in URLs:</strong> Enables automated IDOR crawling.
                </li>
                <li>
                  <strong>Binding Raw `req.body` into Models:</strong> Enables Mass Assignment (`isAdmin: true`).
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
                  <strong>Always Set `SameSite=Strict` on Cookies:</strong> Completely stops cross-site form submissions.
                </li>
                <li>
                  <strong>Verify Ownership in Every SQL Query:</strong> `WHERE id = $1 AND tenant_id = $2`.
                </li>
                <li>
                  <strong>Deploy Double-Submit HMAC Tokens:</strong> Verifies intent for all REST/SPA state changes.
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
                  Why does `SameSite=Strict` completely block CSRF even if an attacker hosts a malicious form on their own website?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does adding `AND tenant_id = req.user.tenantId` to an SQL query eliminate Insecure Direct Object References?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Tenant Ownership Middleware and observe IDOR access attempts get blocked with HTTP 403!
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
                <span>CSRF exploits ambient authority where browsers automatically attach cookies to cross-site requests.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>`SameSite=Strict` blocks cookies on all cross-site links, completely neutralizing CSRF.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Anti-CSRF tokens embed secret cryptographically random codes that outside websites cannot read.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IDOR occurs when an application references database keys without validating user ownership.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Mass Assignment allows attackers to inject `isAdmin: true` into database update models.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66C of the IT Act penalizes identity theft and unauthorized session actions with up to 3 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="CSRF &amp; Broken Access Control FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Access Control Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Cross-Site Request Forgery (CSRF) and Broken Access Control (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Cross-Site Request Forgery (CSRF) and Broken Access Control (IDOR) target the very core of trust and authorization in web architecture! Understand why CSRF happens: browsers automatically attach stored session cookies with every cross-site request (ambient authority) without verifying user intent. Understand how to neutralize CSRF: 1. Set `SameSite=Strict; Secure; HttpOnly` on all session cookies; 2. Enforce Double-Submit HMAC Anti-CSRF tokens on all state-changing HTTP requests (POST, PUT, DELETE). Understand Broken Access Control (OWASP Top 10 #1): never rely on hidden UI buttons or sequential database integers (`/invoices/105`); always enforce tenant ownership validation in your database queries (`WHERE id = $1 AND tenant_id = $2`) and deploy PostgreSQL Row-Level Security (RLS). Prevent Mass Assignment by whitelisting Data Transfer Object (DTO) properties. Remember that Section 66C of the Indian IT Act penalizes identity theft and unauthorized session actions with up to 3 years imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized computer access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
