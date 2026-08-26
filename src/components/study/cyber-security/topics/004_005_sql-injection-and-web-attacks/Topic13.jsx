import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic13_files/topic13_note.txt?raw";

const Topic13 = () => {
  // Unique SVG IDs
  const svgLifecycleId = useId();

  // Studio 1: Active Remediation Pattern Selection
  const [selectedPatternKey, setSelectedPatternKey] = useState("auth_bypass_login_remediation");

  // Studio 2: Live Interactive Vulnerability Sandbox State
  const [activeSandboxScenario, setActiveSandboxScenario] = useState("kolkata_upi_auth_bypass"); // kolkata_upi_auth_bypass, barrackpore_scada_order_by, ichapur_hospital_in_array, jadavpur_union_extraction
  const [customExploitPayload, setCustomExploitPayload] = useState("9841' OR '1'='1");
  const [activeEngineMode, setActiveEngineMode] = useState("compare_both"); // compare_both, vulnerable_only, remediated_only

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_remediation_war_room");

  // Studio 4: Production Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("nodejs_express_remediated_auth");

  // 8 Master Patterns for Studio 1
  const patternDatabase = {
    auth_bypass_login_remediation: {
      key: "auth_bypass_login_remediation",
      name: "1. Auth Bypass Login Route Parameterization",
      category: "AUTHENTICATION LOGIC REMEDIATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Query user record with positional `$1` parameter; verify password using bcrypt.",
      mechanismDescription:
        "Vulnerable code concatenates password into the SQL string. Remediated code queries username via `$1`, retrieves the stored password hash, and performs constant-time bcrypt verification in application memory.",
      mitigationPattern: "`pool.query('SELECT id, password_hash FROM users WHERE username = $1', [u])` + `bcrypt.compare()`",
      typicalSyntax: "pool.query('... WHERE username = $1', [username]) + bcrypt.compare(pass, hash)",
      codeSnippet: `// Remediated Auth Route:
const { rows } = await pool.query('SELECT id, password_hash FROM users WHERE username = $1', [username]);
if (!rows[0] || !(await bcrypt.compare(password, rows[0].password_hash))) throw new Error("Invalid credentials");`
    },
    dynamic_order_by_whitelisting: {
      key: "dynamic_order_by_whitelisting",
      name: "2. Dynamic ORDER BY Static Whitelist Map",
      category: "IDENTIFIER INJECTION REMEDIATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      securityPrinciple: "Translate user-supplied sort keys to hardcoded column names via static dictionaries.",
      mechanismDescription:
        "SQL parsers do not support parameter placeholders for column names. Developers must map user inputs against a static dictionary of allowed columns with safe fallbacks.",
      mitigationPattern: "`const safeCol = ALLOWED_SORT_COLUMNS[req.query.sort] || 'created_at'`",
      typicalSyntax: "ORDER BY ${WHITELIST[sort] || 'created_at'} ${dir === 'DESC' ? 'DESC' : 'ASC'}",
      codeSnippet: `// Remediated Dynamic ORDER BY:
const sortMap = { 'date': 'created_at', 'amount': 'total_amount' };
const safeCol = sortMap[req.query.sort] || 'created_at';
const safeDir = req.query.dir === 'DESC' ? 'DESC' : 'ASC';
const query = \`SELECT * FROM invoices ORDER BY \${safeCol} \${safeDir}\`;`
    },
    dynamic_in_array_binding: {
      key: "dynamic_in_array_binding",
      name: "3. Dynamic IN (...) Native Array Binding",
      category: "BATCH LOOKUP REMEDIATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      securityPrinciple: "Bind arrays as single typed parameter objects or positional placeholder lists.",
      mechanismDescription:
        "In PostgreSQL: `WHERE id = ANY($1::int[])` binds the entire array out-of-band as a single parameter slot. In MySQL: Generate `$1, $2, $3` positional lists dynamically.",
      mitigationPattern: "PostgreSQL: `= ANY($1::int[])` | MySQL: Generate dynamic `(?, ?, ?)` placeholder list.",
      typicalSyntax: "WHERE id = ANY($1::int[]) OR WHERE id IN ($1, $2, $3)",
      codeSnippet: `// Remediated PostgreSQL Array Binding:
await pool.query('SELECT * FROM accounts WHERE id = ANY($1::int[])', [merchantIds]);`
    },
    prisma_tagged_template_fix: {
      key: "prisma_tagged_template_fix",
      name: "4. Prisma $queryRaw Tagged Template Refactoring",
      category: "ORM RAW ESCAPE HATCH REMEDIATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Replace `$queryRawUnsafe()` with `$queryRaw` tagged template literals.",
      mechanismDescription:
        "Tagged template literals (`prisma.$queryRaw\`...\``) automatically parse template variables into positional parameter slots (`$1, $2`), preventing AST mutation.",
      mitigationPattern: "Convert all `$queryRawUnsafe` calls to `$queryRaw\`...\``; enforce via Semgrep.",
      typicalSyntax: "await prisma.$queryRaw`SELECT * FROM accounts WHERE id = ${userId}`;",
      codeSnippet: `// Remediated Prisma Tagged Template:
const merchant = await prisma.$queryRaw\`SELECT * FROM accounts WHERE tax_id = \${userTaxId}\`;`
    },
    stored_proc_sp_executesql_fix: {
      key: "stored_proc_sp_executesql_fix",
      name: "5. T-SQL sp_executesql Parameterization",
      category: "DATABASE PROCEDURE REMEDIATION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      securityPrinciple: "Execute dynamic queries inside stored procedures via `sp_executesql`.",
      mechanismDescription:
        "Refactor dynamic queries from `EXEC('SELECT...'+@param)` to `EXEC sp_executesql` with defined parameter types, caching pre-compiled plans and preventing AST mutation.",
      mitigationPattern: "Deploy `sp_executesql` with typed `@params` strings inside all dynamic stored procedures.",
      typicalSyntax: "EXEC sp_executesql @sql, N'@id varchar(50)', @id = @userParam;",
      codeSnippet: `// Remediated T-SQL Stored Procedure:
EXEC sp_executesql N'SELECT * FROM accounts WHERE tax_id = @t', N'@t varchar(50)', @t = @TaxId;`
    },
    second_order_sqli_batch_fix: {
      key: "second_order_sqli_batch_fix",
      name: "6. Second-Order SQLi Batch Query Hardening",
      category: "DATA PIPELINE REMEDIATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      securityPrinciple: "Parameterize all secondary queries, batch jobs, and analytical scripts.",
      mechanismDescription:
        "Data retrieved from the database can still explode if concatenated into secondary queries. Enforce 100% parameterization on all background cron jobs and analytical workers.",
      mitigationPattern: "Parameterize all reporting scripts, batch jobs, and analytical queries.",
      typicalSyntax: "pool.query('INSERT INTO audit (actor) VALUES ($1)', [row.username])",
      codeSnippet: `// Remediated Secondary Batch Worker:
for (const user of rows) {
    await pool.query('INSERT INTO audit_log (actor) VALUES ($1)', [user.username]); // 100% SAFE!
}`
    },
    dast_automated_fuzz_verification: {
      key: "dast_automated_fuzz_verification",
      name: "7. Automated DAST Fuzzing (OWASP ZAP)",
      category: "POST-REMEDIATION VERIFICATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      securityPrinciple: "Fuzz all remediated routes with active SQLi payloads before release.",
      mechanismDescription:
        "Run automated OWASP ZAP / Burp Suite DAST scans against staging environments to verify that aggressive SQLi fuzz payloads return 0 alerts before production deployment.",
      mitigationPattern: "Integrate OWASP ZAP baseline scans into CI/CD release pipelines.",
      typicalSyntax: "zap-cli quick-scan --spider -r -l High https://staging.kolkata-fintech.in",
      codeSnippet: `// ZAP Automated DAST Scan Script:
// zap-cli quick-scan --spider -r -l High https://staging.kolkata-fintech.in/api/v1`
    },
    semgrep_ci_cd_blocking_gates: {
      key: "semgrep_ci_cd_blocking_gates",
      name: "8. Semgrep CI/CD Blocking Gates",
      category: "CONTINUOUS DEVSECOPS PREVENTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Fail git commits containing raw string concatenation in SQL queries.",
      mechanismDescription:
        "Semgrep AST rules scan all code commits for dangerous concatenation patterns (`pool.query(\"...\" + $X)`), failing pull requests automatically on any violation.",
      mitigationPattern: "Deploy Semgrep AST rules in GitHub Actions / GitLab CI pipelines.",
      typicalSyntax: "pattern-either: - pattern: pool.query(\"...\" + $X) - pattern: prisma.$queryRawUnsafe(...)",
      codeSnippet: `// Semgrep AST Guard Rule (YAML):
rules:
  - id: enforce-parameterized-queries
    pattern: pool.query(\`...\${$X}...\`)
    message: "String concatenation in database query forbidden!"
    severity: ERROR`
    }
  };

  const activePattern = patternDatabase[selectedPatternKey];

  // Sandbox Scenarios Database for Studio 2
  const sandboxScenarios = {
    kolkata_upi_auth_bypass: {
      id: "kolkata_upi_auth_bypass",
      name: "Scenario A: Kolkata UPI Payment Auth Route",
      endpoint: "POST /api/v1/auth/merchant-login",
      defaultPayload: "9841' OR '1'='1",
      vulnCode: `// VULNERABLE NODE.JS LOGIN CONTROLLER:
app.post('/api/v1/auth/merchant-login', async (req, res) => {
    const { taxId, password } = req.body;
    // INSECURE: String concatenation creates tautology!
    const sql = "SELECT * FROM merchants WHERE tax_id = '" + taxId + "' AND password = '" + password + "'";
    const { rows } = await pool.query(sql);
    if (rows.length > 0) {
        return res.json({ success: true, token: "JWT_MERCHANT_SESSION" });
    }
    res.status(401).json({ error: "Invalid credentials" });
});`,
      remediatedCode: `// REMEDIATED 100% PARAMETERIZED LOGIN CONTROLLER:
app.post('/api/v1/auth/merchant-login', async (req, res) => {
    const { taxId, password } = req.body;
    // SECURE: Positional parameter placeholder ($1) + Bcrypt verification:
    const sql = "SELECT id, password_hash, role FROM merchants WHERE tax_id = $1";
    const { rows } = await pool.query(sql, [String(taxId)]);
    if (!rows[0]) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(String(password), rows[0].password_hash);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ success: true, token: generateJwt(rows[0]) });
});`,
      vulnExplanation: "String concatenation creates a tautology (`tax_id = '9841' OR '1'='1'`), allowing attackers to log in as the first merchant in the database without a valid password.",
      remedExplanation: "Positional parameter `$1` sends `taxId` over the database wire protocol as a pure literal string. Password verification occurs in Node.js via constant-time bcrypt."
    },
    barrackpore_scada_order_by: {
      id: "barrackpore_scada_order_by",
      name: "Scenario B: Barrackpore SCADA Grid Sorting Route",
      endpoint: "GET /api/scada/telemetry/logs?sort=date",
      defaultPayload: "date; SELECT pg_sleep(5);--",
      vulnCode: `// VULNERABLE JAVA SPRING CONTROLLER:
@GetMapping("/api/scada/telemetry/logs")
public List<TelemetryLog> getLogs(@RequestParam String sort) {
    // INSECURE: Concatenating sort parameter into ORDER BY!
    String sql = "SELECT * FROM breaker_telemetry ORDER BY " + sort + " DESC";
    return jdbcTemplate.query(sql, new TelemetryRowMapper());
}`,
      remediatedCode: `// REMEDIATED JAVA CONTROLLER WITH STATIC WHITELIST:
private static final Map<String, String> ALLOWED_SORT_COLS = Map.of(
    "date", "created_at",
    "voltage", "busbar_voltage",
    "frequency", "grid_frequency"
);

@GetMapping("/api/scada/telemetry/logs")
public List<TelemetryLog> getLogs(@RequestParam(defaultValue = "date") String sort) {
    // SECURE: Strict server-side dictionary whitelist lookup!
    String safeCol = ALLOWED_SORT_COLS.getOrDefault(sort, "created_at");
    String sql = "SELECT id, busbar_voltage, grid_frequency, created_at FROM breaker_telemetry ORDER BY " + safeCol + " DESC";
    return jdbcTemplate.query(sql, new TelemetryRowMapper());
}`,
      vulnExplanation: "Concatenating user input into `ORDER BY` allows subquery injections, conditional sleep statements, and data exfiltration.",
      remedExplanation: "Static dictionary `ALLOWED_SORT_COLS` safely maps user keys (`date`) to hardcoded column names (`created_at`), rejecting arbitrary SQL expressions."
    },
    ichapur_hospital_in_array: {
      id: "ichapur_hospital_in_array",
      name: "Scenario C: Ichapur Hospital Batch Chemotherapy Route",
      endpoint: "GET /api/patients/batch?ids=101,102",
      defaultPayload: "101, 102) OR (1=1",
      vulnCode: `// VULNERABLE PYTHON ASYNCPG ROUTE:
@app.get("/api/patients/batch")
async def get_patient_batch(ids: str):
    # INSECURE: Joining array strings directly into SQL!
    query = f"SELECT * FROM oncology_records WHERE id IN ({ids})"
    async with pool.acquire() as conn:
        return await conn.fetch(query)`,
      remediatedCode: `// REMEDIATED PYTHON ASYNCPG ROUTE WITH ARRAY BINDING:
@app.get("/api/patients/batch")
async def get_patient_batch(ids: List[int] = Query(...)):
    # SECURE: Native PostgreSQL array binding (= ANY($1::int[])):
    query = "SELECT id, patient_name, diagnosis, chemo_sessions FROM oncology_records WHERE id = ANY($1::int[])"
    async with pool.acquire() as conn:
        return await conn.fetch(query, ids)`,
      vulnExplanation: "Concatenating comma-separated IDs allows an attacker to break out of the parenthesis with `) OR (1=1`, dumping all oncology records.",
      remedExplanation: "Passing a typed integer list `[101, 102]` to `= ANY($1::int[])` binds the array as a single parameter slot over the PostgreSQL binary protocol."
    },
    jadavpur_union_extraction: {
      id: "jadavpur_union_extraction",
      name: "Scenario D: Jadavpur Research Ledger UNION Route",
      endpoint: "GET /api/research/grants?dept=Physics",
      defaultPayload: "Physics' UNION SELECT 1,password_hash,role,4 FROM system_users--",
      vulnCode: `// VULNERABLE PRISMA RAW ESCAPE HATCH:
app.get('/api/research/grants', async (req, res) => {
    const { dept } = req.query;
    // INSECURE: $queryRawUnsafe evaluates concatenated string!
    const grants = await prisma.$queryRawUnsafe(
        "SELECT id, project_name, grant_amount, principal_investigator FROM research_grants WHERE department = '" + dept + "'"
    );
    res.json(grants);
});`,
      remediatedCode: `// REMEDIATED PRISMA TAGGED TEMPLATE LITERAL:
app.get('/api/research/grants', async (req, res) => {
    const { dept } = req.query;
    // SECURE: $queryRaw tagged template literal automatically parameterizes ($1):
    const grants = await prisma.$queryRaw\`
        SELECT id, project_name, grant_amount, principal_investigator 
        FROM research_grants 
        WHERE department = \${String(dept)}
    \`;
    res.json(grants);
});`,
      vulnExplanation: "Prisma `$queryRawUnsafe` treats the string verbatim, allowing UNION injection to extract system user password hashes.",
      remedExplanation: "Prisma `$queryRaw\`...\`` extracts `dept` into parameter `$1`, rendering UNION keywords as harmless literal search strings."
    }
  };

  const currentScenario = sandboxScenarios[activeSandboxScenario];

  // Studio 2: Live Sandbox Evaluation
  const sandboxEvaluation = useMemo(() => {
    const isPayloadMalicious = customExploitPayload.includes("'") || customExploitPayload.includes(";") || customExploitPayload.includes("--") || customExploitPayload.includes("UNION") || customExploitPayload.includes("OR");

    // Vulnerable Engine Evaluation
    let vulnExecutedQuery = "";
    let vulnAstStatus = "";
    let vulnOutcome = "";
    let vulnResponseData = "";

    if (activeSandboxScenario === "kolkata_upi_auth_bypass") {
      vulnExecutedQuery = `SELECT * FROM merchants WHERE tax_id = '${customExploitPayload}' AND password = 'password'`;
      if (isPayloadMalicious) {
        vulnAstStatus = "AST MUTATED: Injected Boolean OR Clause (Tautology Created)";
        vulnOutcome = "VULNERABILITY EXPLOITED: Authentication Bypassed! Logged in as Merchant Admin!";
        vulnResponseData = 'HTTP 200 OK -> { "success": true, "token": "JWT_UNAUTHORIZED_ADMIN_SESSION", "account": "Mamata_FinTech_Primary" }';
      } else {
        vulnAstStatus = "Standard AST";
        vulnOutcome = "Normal Evaluation (No Exploit Triggered)";
        vulnResponseData = 'HTTP 401 Unauthorized -> { "error": "Invalid credentials" }';
      }
    } else if (activeSandboxScenario === "barrackpore_scada_order_by") {
      vulnExecutedQuery = `SELECT * FROM breaker_telemetry ORDER BY ${customExploitPayload} DESC`;
      if (isPayloadMalicious) {
        vulnAstStatus = "AST MUTATED: Stacked Query / Subquery Injected into ORDER BY";
        vulnOutcome = "VULNERABILITY EXPLOITED: Injected Command Executed on SCADA Database!";
        vulnResponseData = 'HTTP 200 OK -> Telemetry Logs returned with 5000ms delay (pg_sleep executed!)';
      } else {
        vulnAstStatus = "Standard AST";
        vulnOutcome = "Normal Sorted Result Set";
        vulnResponseData = 'HTTP 200 OK -> [ { "id": 1, "voltage": 220.4, "freq": 50.0 } ]';
      }
    } else if (activeSandboxScenario === "ichapur_hospital_in_array") {
      vulnExecutedQuery = `SELECT * FROM oncology_records WHERE id IN (${customExploitPayload})`;
      if (isPayloadMalicious) {
        vulnAstStatus = "AST MUTATED: Injected Parenthesis Breakout & OR Condition";
        vulnOutcome = "VULNERABILITY EXPLOITED: All 120,000 Oncology Patient Records Dumped!";
        vulnResponseData = 'HTTP 200 OK -> [ 120,000 Patient Records Exfiltrated ]';
      } else {
        vulnAstStatus = "Standard AST";
        vulnOutcome = "Matched Single Patient Record";
        vulnResponseData = 'HTTP 200 OK -> [ { "id": 101, "patient": "Patient_A" } ]';
      }
    } else {
      vulnExecutedQuery = `SELECT id, project_name, grant_amount FROM research_grants WHERE department = '${customExploitPayload}'`;
      if (isPayloadMalicious) {
        vulnAstStatus = "AST MUTATED: UNION Branch Created (Result Set Spliced)";
        vulnOutcome = "VULNERABILITY EXPLOITED: System Password Hashes Dumped in Response!";
        vulnResponseData = 'HTTP 200 OK -> [ { "id": 1, "project_name": "sha256$8f9d2...", "grant_amount": "admin" } ]';
      } else {
        vulnAstStatus = "Standard AST";
        vulnOutcome = "Department Grants Returned";
        vulnResponseData = 'HTTP 200 OK -> [ { "id": 10, "project_name": "Quantum Crypto", "grant_amount": "₹45,00,000" } ]';
      }
    }

    // Remediated Engine Evaluation
    let remedExecutedQuery = "";
    let remedAstStatus = "AST INVARIANT: Fixed Template (Delta AST = Empty Set)";
    let remedOutcome = "ATTACK COMPLETELY NEUTRALIZED: Treated as literal data constant (P_sqli = 0.000%)";
    let remedResponseData = "";

    if (activeSandboxScenario === "kolkata_upi_auth_bypass") {
      remedExecutedQuery = `SELECT id, password_hash, role FROM merchants WHERE tax_id = $1 [Param: "${customExploitPayload}"]`;
      remedResponseData = 'HTTP 401 Unauthorized -> { "error": "Invalid credentials" } (Payload checked as literal tax ID; Bcrypt rejected!)';
    } else if (activeSandboxScenario === "barrackpore_scada_order_by") {
      remedExecutedQuery = 'SELECT id, busbar_voltage, grid_frequency, created_at FROM breaker_telemetry ORDER BY created_at DESC (Fallback Column)';
      remedResponseData = 'HTTP 200 OK -> Telemetry Logs returned safely (Invalid sort string ignored; Fell back to created_at in 1ms)';
    } else if (activeSandboxScenario === "ichapur_hospital_in_array") {
      remedExecutedQuery = `SELECT id, patient_name, diagnosis FROM oncology_records WHERE id = ANY($1::int[]) [Param: [${customExploitPayload}]]`;
      remedResponseData = 'HTTP 400 Bad Request / 0 Records -> { "error": "Input does not conform to integer array" } (Zero records leaked!)';
    } else {
      remedExecutedQuery = `SELECT id, project_name, grant_amount FROM research_grants WHERE department = $1 [Param: "${customExploitPayload}"]`;
      remedResponseData = 'HTTP 200 OK -> [] (0 records matched the literal string "Physics\' UNION SELECT...")';
    }

    return {
      vulnExecutedQuery,
      vulnAstStatus,
      vulnOutcome,
      vulnResponseData,
      remedExecutedQuery,
      remedAstStatus,
      remedOutcome,
      remedResponseData,
      isPayloadMalicious
    };
  }, [activeSandboxScenario, customExploitPayload]);

  // Studio 4: Production Code Database
  const codeDatabase = {
    nodejs_express_remediated_auth: {
      name: "Node.js Express Parameterized Auth Controller with Bcrypt & Zod Schema",
      code: `// Node.js Production Remediated Auth Controller:
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const pool = new Pool();
const router = express.Router();

const LoginSchema = z.object({
    taxId: z.string().trim().min(5).max(20),
    password: z.string().min(8).max(100)
}).strict();

router.post('/login', async (req, res) => {
    try {
        // 1. Strict Input Schema Validation:
        const { taxId, password } = LoginSchema.parse(req.body);

        // 2. 100% Parameterized Prepared Statement ($1):
        const queryText = 'SELECT id, business_name, password_hash, role FROM corporate_merchants WHERE tax_id = $1';
        const { rows } = await pool.query(queryText, [taxId]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid tax identifier or password." });
        }

        // 3. Constant-Time Cryptographic Password Verification:
        const isPasswordValid = await bcrypt.compare(password, rows[0].password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid tax identifier or password." });
        }

        // 4. Issue Authenticated Session:
        res.json({ success: true, merchantId: rows[0].id, role: rows[0].role });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: "Invalid payload format." });
        }
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;`,
      explanation: "Production Node.js login controller combining Zod schema validation, positional `$1` prepared statement execution, and constant-time bcrypt password hash verification."
    },
    postgres_array_repository_pattern: {
      name: "PostgreSQL Native Array Repository Pattern with Dynamic ORDER BY Whitelisting",
      code: `// Production PostgreSQL Parameterized Repository:
const { Pool } = require('pg');
const pool = new Pool();

class MerchantInvoiceRepository {
    static ALLOWED_SORT_COLUMNS = {
        'date': 'created_at',
        'amount': 'total_amount',
        'status': 'settlement_status'
    };

    // 1. Safe Dynamic ORDER BY Whitelisting
    static async listInvoicesSorted(taxId, sortBy = 'date', sortDirection = 'ASC') {
        const safeColumn = this.ALLOWED_SORT_COLUMNS[sortBy] || 'created_at';
        const safeDir = String(sortDirection).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        const sql = \`
            SELECT id, invoice_number, total_amount, settlement_status, created_at 
            FROM merchant_invoices 
            WHERE tax_id = $1 
            ORDER BY \${safeColumn} \${safeDir}
        \`;
        const { rows } = await pool.query(sql, [String(taxId)]);
        return rows;
    }

    // 2. Safe Dynamic Array Batch Lookup (= ANY($1::int[]))
    static async findInvoicesByIds(invoiceIds = []) {
        const sql = \`
            SELECT id, invoice_number, total_amount 
            FROM merchant_invoices 
            WHERE id = ANY($1::int[])
        \`;
        const { rows } = await pool.query(sql, [invoiceIds]);
        return rows;
    }
}

module.exports = MerchantInvoiceRepository;`,
      explanation: "Production PostgreSQL repository pattern demonstrating dictionary-based static column whitelisting for `ORDER BY` and native array parameter binding (`= ANY($1)`)."
    },
    jest_automated_sqli_regression_suite: {
      name: "Jest & Supertest Automated SQL Injection Regression Testing Suite",
      code: `// Jest Production SQLi Regression Test Suite:
const request = require('supertest');
const app = require('../app');

describe('DevSecOps SQL Injection Regression Suite', () => {
    // 1. Test Auth Route against Classic Tautology Payloads
    test('POST /api/auth/login should reject SQLi tautology payloads with HTTP 401', async () => {
        const maliciousPayloads = [
            "9841' OR '1'='1",
            "admin'--",
            "' UNION SELECT 1, 'admin', 'hash', 'ADMIN'--"
        ];

        for (const payload of maliciousPayloads) {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ taxId: payload, password: "password123" });

            expect(res.status).toBe(401);
            expect(res.body.success).toBeUndefined();
        }
    });

    // 2. Test Dynamic Sorting Route against Time-Based Payloads
    test('GET /api/invoices should ignore stacked sleep commands in ORDER BY', async () => {
        const startTime = Date.now();
        const res = await request(app).get('/api/invoices?sort=date;SELECT+pg_sleep(5)--');
        const duration = Date.now() - startTime;

        expect(res.status).toBe(200);
        // Duration should be under 200ms (pg_sleep was NOT executed!):
        expect(duration).toBeLessThan(500);
    });
});`,
      explanation: "Production Jest integration test suite executing automated SQLi fuzz payloads against authentication and sorting routes, asserting that attacks are rejected in linear time without leaking data."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_remediation_war_room",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Leading the Enterprise SQLi Remediation War Room During Diwali Festival Sales",
      threatType: "140 CONCATENATED SQL VECTORS IN LEGACY UPI CLEARING MICROSERVICES",
      budget: "₹99,00,000",
      incident:
        "Automated DAST fuzzers discovered 140 string concatenation injection vectors across legacy settlement routes right before the peak Diwali transaction surge.",
      defenseStrategy:
        "Mamata established a 48-hour remediation war room, refactoring all 140 endpoints to Node.js positional prepared statements and deploying Semgrep blocking gates in CI/CD.",
      outcome: "140 of 140 SQLi vulnerabilities permanently remediated; zero merchant breaches; ₹4,800 Crores in daily UPI settlements completely protected.",
      metrics: {
        vulnerabilitiesRemediated: "140 Endpoints",
        settlementVolumeProtected: "₹4,800 Crores",
        warRoomResolutionTime: "48 Hours",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_remediation",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "DYNAMIC ORDER BY & PL/SQL INJECTION IN SUBSTATION SCADA CONSOLES",
      title: "Remediating 18 Substation Telemetry Sorting Vectors in Java JDBC and PL/SQL",
      budget: "₹68,00,000",
      incident:
        "Penetration testing identified dynamic sorting injection holes in breaker monitoring telemetry APIs across 18 high-voltage substations.",
      defenseStrategy:
        "Debangshu refactored all Java JDBC controllers to use static column whitelisting maps and converted PL/SQL procedures to `EXECUTE ... USING` parameter bindings.",
      outcome: "100% of telemetry sorting injection vectors eliminated; breaker consoles maintained 100% power reliability across North 24 Parganas.",
      metrics: {
        substationsRemediated: "18 High-Voltage Nodes",
        sortingVectorsFixed: "100.0%",
        powerUptimeMaintained: "100.0%",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_remediation",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "BATCH ARRAY & DJANGO RAWSQL INJECTION IN CHEMOTHERAPY RECORDS",
      title: "Remediating 120,000 Oncology Patient Record Lookup Routes in Python Django & asyncpg",
      budget: "₹53,00,000",
      incident:
        "Security audits revealed un-parameterized `WHERE id IN (...)` array queries in cancer patient diagnostic and chemotherapy scheduling portals.",
      defenseStrategy:
        "Mahima migrated queries to PostgreSQL native array binding (`= ANY($1::int[])`) and replaced Django `RawSQL` f-strings with typed parameter tuples.",
      outcome: "100% of batch lookup flaws remediated; zero oncology records leaked; 120,000 cancer patient files permanently secured.",
      metrics: {
        oncologyRecordsProtected: "120,000 Patient Files",
        batchQueriesHardened: "100.0%",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_remediation_lifecycle_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF THE 6-STAGE REMEDIATION LIFECYCLE & AST DIFF THEOREM",
      title: "Formulating the Formal Remediation AST Diff Invariance Model in IEEE Transactions",
      budget: "₹46,00,000",
      incident:
        "Researchers modeled the formal grammar tree transformations between vulnerable code (delta T != empty set) and remediated parameterized queries (delta T = empty set).",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that parameterization guarantees delta AST = empty set and P_sqli = 0.000%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 500,000 simulated remediation compiler test runs.",
      metrics: {
        simulationTrials: "500,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "AST Diff Invariance Model",
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
                Topic 13 (Capstone)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Interactive SQL Injection Vulnerability Analysis and Remediation
            </h1>
            <p className="text-xs text-gray-400">
              6-stage remediation lifecycle, interactive live sandbox, side-by-side AST verification, Jest regression suites, and IT Act Section 66F.
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
              Module Capstone: Comprehensive Vulnerability Analysis &amp; Remediation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of SQLi Remediation: Systematic 6-Stage Lifecycle and Mathematical AST Invariance
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Remediating SQL Injection across enterprise microservices requires a rigorous, systematic <strong>6-Stage Lifecycle</strong>: 
              1. <strong>Static Analysis (SAST)</strong> using Semgrep / CodeQL to identify string concatenation sinks; 2. <strong>Dynamic Analysis (DAST)</strong> 
              using OWASP ZAP / Burp Suite to verify active exploitability; 3. <strong>Root Cause Triage</strong> analyzing Abstract Syntax Tree (AST) grammar mutations; 
              4. <strong>Code-Level Refactoring</strong> replacing concatenation with 100% <strong>Parameterized Prepared Statements ($1, ?)</strong>, static whitelist maps for dynamic `ORDER BY`, 
              and native array bindings; 5. <strong>Dual-Perimeter Mitigation</strong> deploying temporary WAF virtual patches and strict nonce CSP headers; 
              and 6. <strong>Continuous DevSecOps CI/CD Gates</strong> enforcing automated Jest regression test suites and Semgrep commit blockers. 
              By freezing query AST templates in Phase 1 and binding user parameters out-of-band in Phase 2 (delta AST = empty set), 
              SQL injection exploitability is mathematically reduced to <strong>exactly 0.000%</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The 6-Stage Lifecycle Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The 6-Stage Remediation Workflow
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60 text-[11px]">
                SAST Scan ➔ DAST Fuzz ➔ Triage Root Cause ➔ Parameterize ➔ WAF Patch ➔ CI/CD Gate
              </div>
              <p className="text-gray-300 leading-relaxed">
                A permanent fix requires code parameterization combined with automated CI/CD regression tests to prevent developers from re-introducing string concatenation.
              </p>
            </div>

            {/* Master Remediation Strategies Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-cyan-950/60 space-y-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                Master Remediation Patterns
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Auth Routes:</strong> Query with `$1` + constant-time `bcrypt.compare()`.</li>
                <li>• <strong className="text-purple-300">Dynamic ORDER BY:</strong> Enforce static server-side dictionary whitelist maps.</li>
                <li>• <strong className="text-amber-300">Dynamic IN (...):</strong> PostgreSQL `= ANY($1::int[])` array parameter binding.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - 6-Stage Lifecycle Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              6-Stage Vulnerability Remediation Lifecycle Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing the Enterprise Remediation Pipeline: From SAST Discovery to CI/CD Gate
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a security team discovers, triages, refactors, and locks down an SQL injection vulnerability:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: SAST DISCOVERY */}
              <g transform="translate(15, 60)">
                <rect width="125" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="62.5" y="26" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  1. SAST SCAN
                </text>
                <text x="62.5" y="44" fill="#7dd3fc" fontSize="8" textAnchor="middle">
                  Semgrep / CodeQL
                </text>
                <rect x="8" y="55" width="109" height="70" rx="6" fill="#0c4a6e" />
                <text x="62.5" y="74" fill="#bae6fd" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  SINKS FLAGGED:
                </text>
                <text x="62.5" y="90" fill="#ffffff" fontSize="7" textAnchor="middle">
                  pool.query("..."+x)
                </text>
                <text x="62.5" y="106" fill="#7dd3fc" fontSize="7" textAnchor="middle">
                  AST String Concat
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 140 130 L 160 130" stroke="#38bdf8" strokeWidth="2.5" fill="none" />

              {/* STAGE 2: DAST FUZZING */}
              <g transform="translate(160, 60)">
                <rect width="125" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="62.5" y="26" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  2. DAST FUZZ
                </text>
                <text x="62.5" y="44" fill="#c7d2fe" fontSize="8" textAnchor="middle">
                  OWASP ZAP / Burp
                </text>
                <rect x="8" y="55" width="109" height="70" rx="6" fill="#312e81" />
                <text x="62.5" y="74" fill="#a5b4fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  PAYLOAD TESTING:
                </text>
                <text x="62.5" y="90" fill="#ffffff" fontSize="7" textAnchor="middle">
                  ' OR 1=1-- ➔ 200 OK
                </text>
                <text x="62.5" y="106" fill="#c7d2fe" fontSize="7" textAnchor="middle">
                  Exploit Confirmed!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 285 130 L 305 130" stroke="#818cf8" strokeWidth="2.5" fill="none" />

              {/* STAGE 3: CODE REFACTORING */}
              <g transform="translate(305, 60)">
                <rect width="125" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="62.5" y="26" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  3. REFACTOR
                </text>
                <text x="62.5" y="44" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                  Prepared Statement
                </text>
                <rect x="8" y="55" width="109" height="70" rx="6" fill="#064e3b" />
                <text x="62.5" y="74" fill="#6ee7b7" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  PARAMETERIZE:
                </text>
                <text x="62.5" y="90" fill="#ffffff" fontSize="7" textAnchor="middle">
                  WHERE id = $1
                </text>
                <text x="62.5" y="106" fill="#a7f3d0" fontSize="7" textAnchor="middle">
                  AST Invariant Frozen
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 430 130 L 450 130" stroke="#34d399" strokeWidth="2.5" fill="none" />

              {/* STAGE 4: WAF VIRTUAL PATCH */}
              <g transform="translate(450, 60)">
                <rect width="125" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="62.5" y="26" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  4. WAF PATCH
                </text>
                <text x="62.5" y="44" fill="#fde68a" fontSize="8" textAnchor="middle">
                  Cloud Edge Shield
                </text>
                <rect x="8" y="55" width="109" height="70" rx="6" fill="#78350f" />
                <text x="62.5" y="74" fill="#fcd34d" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  VIRTUAL PATCH:
                </text>
                <text x="62.5" y="90" fill="#ffffff" fontSize="7" textAnchor="middle">
                  AWS WAF Regex Rule
                </text>
                <text x="62.5" y="106" fill="#fde68a" fontSize="7" textAnchor="middle">
                  Blocks Edge Probes
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 575 130 L 595 130" stroke="#f59e0b" strokeWidth="2.5" fill="none" />

              {/* STAGE 5: JEST REGRESSION */}
              <g transform="translate(595, 60)">
                <rect width="125" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="62.5" y="26" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  5. JEST TEST
                </text>
                <text x="62.5" y="44" fill="#fecdd3" fontSize="8" textAnchor="middle">
                  Automated Tests
                </text>
                <rect x="8" y="55" width="109" height="70" rx="6" fill="#4c0519" />
                <text x="62.5" y="74" fill="#fda4af" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  REGRESSION:
                </text>
                <text x="62.5" y="90" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Fuzz Assertions
                </text>
                <text x="62.5" y="106" fill="#fecdd3" fontSize="7" textAnchor="middle">
                  Passes 100% Tests
                </text>
              </g>

              {/* ARROW 5 */}
              <path d="M 720 130 L 740 130" stroke="#f43f5e" strokeWidth="2.5" fill="none" />

              {/* STAGE 6: CI/CD GATE */}
              <g transform="translate(740, 60)">
                <rect width="125" height="140" rx="10" fill="#14532d" stroke="#4ade80" strokeWidth="2" />
                <text x="62.5" y="26" fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  6. CI/CD GATE
                </text>
                <text x="62.5" y="44" fill="#bbf7d0" fontSize="8" textAnchor="middle">
                  DevSecOps Guard
                </text>
                <rect x="8" y="55" width="109" height="70" rx="6" fill="#166534" />
                <text x="62.5" y="74" fill="#86efac" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  THEOREM PROVEN:
                </text>
                <text x="62.5" y="90" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Delta AST = Empty Set
                </text>
                <text x="62.5" y="106" fill="#bbf7d0" fontSize="7" textAnchor="middle">
                  P_sqli = 0.000%!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Pattern Master Remediation Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Master SQLi Remediation Pattern &amp; Lifecycle Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a remediation pattern below to examine its category, security principle, 
              AST compilation mechanics, enterprise mitigation patterns, and code syntax:
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
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-emerald-950 text-emerald-300 border-emerald-800 self-start">
                  FIXED
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
                    Remediation Mechanics &amp; AST Invariance
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

        {/* SECTION 4: Studio 2 - Live Side-by-Side Vulnerability Sandbox */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Live Interactive Vulnerability Analysis &amp; Side-by-Side Remediation Sandbox
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an active vulnerability scenario, input a custom attack exploit payload, and compare the execution 
              behavior, AST mutation status, and output response between Vulnerable Code and Remediated Code in real time:
            </p>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.values(sandboxScenarios).map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveSandboxScenario(sc.id);
                  setCustomExploitPayload(sc.defaultPayload);
                }}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs space-y-1",
                  activeSandboxScenario === sc.id
                    ? "bg-emerald-950/80 border-emerald-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold text-emerald-400 block">{sc.endpoint.split(" ")[0]}</span>
                <span className="font-bold text-white block line-clamp-1">{sc.name}</span>
              </button>
            ))}
          </div>

          {/* Exploit Payload Input Bar */}
          <div className="bg-[#050811] p-4 rounded-xl border border-gray-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Target Endpoint: <span className="text-cyan-400 font-mono">{currentScenario.endpoint}</span>
              </span>
              <span className="text-xs text-gray-400">
                Type an Exploit Payload below to evaluate against both codebases:
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customExploitPayload}
                onChange={(e) => setCustomExploitPayload(e.target.value)}
                className="flex-1 p-2.5 bg-gray-950 rounded border border-gray-800 text-cyan-300 font-mono text-xs focus:border-cyan-500 outline-none"
              />
              <button
                onClick={() => setCustomExploitPayload(currentScenario.defaultPayload)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 rounded transition-all"
              >
                Reset Default Exploit
              </button>
            </div>
          </div>

          {/* Side-by-Side Comparison Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* COLUMN 1: VULNERABLE CODE & EXECUTION TRACE */}
            <div className="bg-[#070b14] p-5 rounded-xl border border-rose-950/80 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <h3 className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">
                    1. Vulnerable Code (String Concatenation)
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                  FLAWED IMPLEMENTATION
                </span>
              </div>

              <p className="text-gray-300">{currentScenario.vulnExplanation}</p>

              <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-rose-200 overflow-x-auto whitespace-pre-wrap border border-rose-950/50">
                {currentScenario.vulnCode}
              </pre>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                <span className="text-gray-400 text-[10px] uppercase block">Executed SQL String in Database Engine:</span>
                <pre className="p-2 bg-black/90 rounded font-mono text-xs text-rose-300 overflow-x-auto whitespace-pre-wrap">
                  {sandboxEvaluation.vulnExecutedQuery}
                </pre>
              </div>

              <div className="p-3 rounded-lg border bg-rose-950/60 border-rose-800 space-y-1 font-mono">
                <span className="font-bold text-rose-300 uppercase text-[10px] block">Vulnerable Engine Assessment:</span>
                <span className="font-bold text-white text-xs block">{sandboxEvaluation.vulnOutcome}</span>
                <span className="text-gray-300 text-[11px] block mt-1">{sandboxEvaluation.vulnResponseData}</span>
              </div>
            </div>

            {/* COLUMN 2: REMEDIATED CODE & EXECUTION TRACE */}
            <div className="bg-[#070b14] p-5 rounded-xl border border-emerald-950/80 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                    2. Remediated Code (100% Parameterized)
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                  100% IMMUNE ($1 / ?)
                </span>
              </div>

              <p className="text-gray-300">{currentScenario.remedExplanation}</p>

              <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-emerald-200 overflow-x-auto whitespace-pre-wrap border border-emerald-950/50">
                {currentScenario.remedCode}
              </pre>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                <span className="text-gray-400 text-[10px] uppercase block">Executed Parameterized Plan &amp; Wire Binding:</span>
                <pre className="p-2 bg-black/90 rounded font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                  {sandboxEvaluation.remedExecutedQuery}
                </pre>
              </div>

              <div className="p-3 rounded-lg border bg-emerald-950/60 border-emerald-800 space-y-1 font-mono">
                <span className="font-bold text-emerald-300 uppercase text-[10px] block">Remediated Engine Assessment:</span>
                <span className="font-bold text-white text-xs block">{sandboxEvaluation.remedOutcome}</span>
                <span className="text-gray-300 text-[11px] block mt-1">{sandboxEvaluation.remedResponseData}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Multi-Language Remediation Production Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Enterprise Production Repositories &amp; Jest Suites
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Node.js Auth Controller, PostgreSQL Repository &amp; Jest Regression Suite
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of remediated Node.js auth controllers, PostgreSQL array repositories 
              with static column whitelisting, and automated Jest regression testing suites:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita lead enterprise remediation war rooms in Salt Lake, 
              harden 18 SCADA substations in Barrackpore, and secure 120,000 oncology patient files in Ichapur:
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
                  The Incident &amp; Pre-Remediation Threat
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Remediation &amp; Resolution
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
              7. Legal Penalties for Failing to Remediate Critical SQL Injection Flaws in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection frameworks 
              strictly penalize knowingly neglecting or failing to remediate SQL injection vulnerabilities resulting in citizen data leaks or infrastructure damage with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Un-remediated SQLi compromising critical infrastructure carries <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized database data extraction.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to remediate database vulnerabilities.
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
                  <strong>Only Patching Front-End Login Routes:</strong> Leaves secondary reporting and ETL scripts vulnerable!
                </li>
                <li>
                  <strong>Replacing String Concat with Regex Escaping:</strong> Multibyte character bypasses still succeed.
                </li>
                <li>
                  <strong>Failing to Write Automated Regression Tests:</strong> Future code updates accidentally re-introduce SQLi.
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
                  <strong>Follow the 6-Stage Lifecycle:</strong> SAST ➔ DAST ➔ Triage ➔ Parameterize ➔ WAF ➔ CI/CD.
                </li>
                <li>
                  <strong>Enforce Semgrep Pull Request Gates:</strong> Blocks any raw string concatenation during git commits.
                </li>
                <li>
                  <strong>Deploy Least Privilege DB Accounts:</strong> Strip `DROP TABLE` and `xp_cmdshell` from app users.
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
                  Why is a temporary WAF virtual patch retired after permanent parameterized code is verified and deployed?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does the Remediated Engine in the sandbox above treat `' OR '1'='1` as a harmless literal string?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  Select different scenarios in the sandbox above and test custom payloads to see how AST invariance guarantees safety!
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
                <span>Follow the 6-stage lifecycle: SAST ➔ DAST ➔ Triage ➔ Refactor ➔ WAF Patch ➔ CI/CD Gates.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Auth routes must query username with `$1` and verify passwords using bcrypt.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dynamic `ORDER BY` sorting requires strict server-side static whitelist dictionaries.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dynamic `IN (...)` queries in PostgreSQL use `= ANY($1::int[])` array parameter binding.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Prisma `$queryRaw` tagged template literal guarantees 100% parameterization by design.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes SQL injection attacks on critical infrastructure with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="SQLi Vulnerability Analysis &amp; Remediation FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Enterprise Remediation Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Interactive SQL Injection Vulnerability Analysis and Remediation (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic13_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 004_005 on Web Attacks, SQL Injection & Injection Defense! In this Capstone Topic 13, you have mastered the complete, professional 6-Stage Vulnerability Analysis & Remediation Lifecycle: 1. Static Code Analysis (SAST) with Semgrep / CodeQL; 2. Dynamic Fuzzing (DAST) with OWASP ZAP; 3. Root Cause Triage & AST Tracing; 4. Code Refactoring to 100% Parameterized Prepared Statements ($1, ?); 5. Dual-Perimeter Mitigation with WAF Virtual Patching & Nonce CSP; and 6. Continuous DevSecOps Regression Gates. Always remember: in authentication routes, look up the user via a parameterized query ($1) and verify the password hash using constant-time bcrypt in memory. For dynamic `ORDER BY` sorting, never concatenate column names—use strict server-side static whitelist dictionaries. For dynamic `IN (...)` queries in PostgreSQL, use native array binding (`= ANY($1::int[])`). In ORMs, strictly ban raw escape hatches like `$queryRawUnsafe` and enforce Tagged Template Literals (`prisma.$queryRaw\`...\``). In stored procedures, enforce `sp_executesql` with typed `@params`. Above all, understand the mathematical reality: by pre-compiling the query AST template in Phase 1 and binding user parameters out-of-band in Phase 2, you enforce delta AST = empty set, driving SQL injection exploitability to exactly 0.000% forever. Remember that Section 66F of the Indian IT Act penalizes SQL injection attacks on critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic13;
