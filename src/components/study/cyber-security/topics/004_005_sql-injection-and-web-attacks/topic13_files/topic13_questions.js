const questions = [
  {
    question: "What is the Structured 6-Stage 'SQL Injection Vulnerability Analysis and Remediation Lifecycle'?",
    shortAnswer: "A systematic enterprise workflow: 1. SAST Static Code Scanning (AST inspection); 2. DAST Dynamic Fuzzing (OWASP ZAP / Burp); 3. Root Cause Triage (AST mutation confirmation); 4. Code-Level Parameterization Remediation (100% Prepared Statements); 5. Dual-Perimeter Mitigation (WAF Virtual Patching & CSP); 6. Regression Verification & CI/CD DevSecOps Blocking Gates.",
    explanation: "Remediation is not just writing a quick patch. It requires discovering the vulnerability via static/dynamic analysis, analyzing the exact AST root cause, refactoring the code to use parameterized queries, applying temporary WAF virtual patches, and adding automated SAST unit tests to prevent regression.",
    hint: "The 6 steps: Scan code, Fuzz live app, Find root cause, Refactor with prepared statements, Add firewall rules, and Lock CI/CD tests.",
    level: "basic",
    codeExample: `// 6-Stage Remediation Lifecycle:
// 1. SAST Scan    ➔ Semgrep flags: $queryRawUnsafe("..." + id)
// 2. DAST Fuzz    ➔ Burp Suite confirms: ' OR 1=1-- returns HTTP 200 with all records
// 3. Triage       ➔ Root Cause: String concatenation in invoice lookup route
// 4. Remediation  ➔ Refactor: prisma.$queryRaw\`SELECT * FROM invoices WHERE id = \${id}\`
// 5. WAF Patch    ➔ Deploy AWS WAF regex rule blocking UNION SELECT on /api/invoices
// 6. CI/CD Gate   ➔ Add Semgrep rule failing pull requests containing $queryRawUnsafe`
  },
  {
    question: "How do Security Engineers Remediate an 'Authentication Bypass SQLi' in a Legacy Node.js Express Login Route?",
    shortAnswer: "By replacing vulnerable string concatenation (`\"SELECT * FROM users WHERE user = '\" + u + \"' AND pass = '\" + p + \"'\"`) with positional parameterized queries (`pool.query(\"SELECT id, password_hash, role FROM users WHERE username = $1\", [username])`) and verifying passwords via bcrypt.",
    explanation: "In vulnerable code, `' OR '1'='1` creates a tautology. Remediated code: 1. Query the database using `$1` for username only. 2. Retrieve the stored bcrypt hash. 3. Compare passwords in Node.js via `await bcrypt.compare(rawPassword, user.password_hash)`. This completely decouples query execution from password verification.",
    hint: "Look up the user with a parameterized query using $1, then compare the hashed password using bcrypt.",
    level: "basic",
    codeExample: `// Remediated Node.js Express Login Controller:
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    // 1. Positional Parameterized Query ($1):
    const { rows } = await pool.query(
        'SELECT id, password_hash, role FROM users WHERE username = $1',
        [String(username)]
    );
    if (!rows[0]) return res.status(401).json({ error: "Invalid credentials" });
    // 2. Safe Cryptographic Password Comparison:
    const isValid = await bcrypt.compare(password, rows[0].password_hash);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });
    res.json({ success: true, token: generateJwt(rows[0]) });
});`
  },
  {
    question: "How do Developers Remediate Dynamic 'ORDER BY' Identifier Injection where Parameterization is Unsupported by SQL Parsers?",
    shortAnswer: "By enforcing a strict Server-Side Static Whitelist Map (dictionary lookup) that translates user-supplied sort keys (`date`, `amount`) to hardcoded database column names (`created_at`, `total_amount`), falling back to a safe default if the input is not in the map.",
    explanation: "Database query planners do not permit `$1` placeholders for column names. If a user sends `sort=date`, the backend executes `const columnMap = { 'date': 'created_at', 'amount': 'total_amount' }; const safeCol = columnMap[req.query.sort] || 'created_at'; const safeDir = req.query.dir === 'DESC' ? 'DESC' : 'ASC'; const sql = \`SELECT * FROM invoices ORDER BY \${safeCol} \${safeDir}\`;`.",
    hint: "Use a fixed dictionary object to look up safe column names instead of putting the user's text into the query.",
    level: "moderate",
    codeExample: `// Remediated Dynamic ORDER BY Pattern:
const SORT_WHITELIST = {
    'date': 'created_at',
    'amount': 'settlement_amount',
    'merchant': 'merchant_name'
};
const safeColumn = SORT_WHITELIST[req.query.sort] || 'created_at';
const safeDirection = String(req.query.dir).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
const query = \`SELECT * FROM settlements ORDER BY \${safeColumn} \${safeDirection}\`;
const { rows } = await pool.query(query);`
  },
  {
    question: "How do Developers Remediate Dynamic 'IN (...)` Array Batch Lookup SQLi in PostgreSQL vs MySQL?",
    shortAnswer: "In PostgreSQL: Use native array parameter binding (`WHERE id = ANY($1::int[])`); in MySQL / standard SQL: Dynamically generate an array of positional placeholders matching array length (`WHERE id IN ($1, $2, $3)`) and pass values as a parameter array.",
    explanation: "Concatenating `WHERE id IN (\" + ids.join(',') + \")` allows array injection. In PostgreSQL: Passing `[ids]` to `WHERE id = ANY($1::int[])` binds the entire array out-of-band as a single parameter slot. In MySQL: `ids.map((_, i) => '$' + (i + 1)).join(',')` constructs safe placeholders.",
    hint: "Use = ANY($1) in PostgreSQL or build a list of ($1, $2, $3) placeholders for MySQL.",
    level: "expert",
    codeExample: `// Remediated PostgreSQL Array Batch Query:
const merchantIds = [101, 102, 105];
const { rows } = await pool.query(
    'SELECT id, business_name, total_balance FROM corporate_merchants WHERE id = ANY($1::int[])',
    [merchantIds] // Bound as single typed array parameter!
);`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for failing to remediate known critical SQL injection vulnerabilities resulting in Cyber Terrorism?",
    shortAnswer: "Intentionally leaving or exploiting un-remediated SQL injection vulnerabilities to compromise, seize control of, or destroy critical national information infrastructure (power grids, banking switches) is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an organization or actor knowingly neglects or exploits SQLi vulnerabilities on 220kV power grid SCADA servers in Barrackpore or financial clearing databases in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Exploiting un-remediated SQL injection flaws to disrupt state power grid SCADA systems
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "How do Developers Remediate 'Prisma ORM `$queryRawUnsafe`' Injections in High-Concurrency Microservices?",
    shortAnswer: "By converting all `$queryRawUnsafe()` calls to `$queryRaw` Tagged Template Literals (`prisma.$queryRaw\`SELECT * FROM accounts WHERE id = \${id}\``), which automatically extract variables into positional parameter bindings (`$1`).",
    explanation: "In Prisma: `$queryRawUnsafe` takes a concatenated string and bypasses parameterization. Replacing it with `$queryRaw\`SELECT * FROM accounts WHERE tax_id = \${userTaxId}\`` instructs JavaScript to pass the template and variable separately to Prisma's tagged template handler, compiling to `SELECT * FROM accounts WHERE tax_id = $1` with bindings.",
    hint: "Change $queryRawUnsafe to $queryRaw with backticks so Prisma can parameterize your variables automatically.",
    level: "moderate",
    codeExample: `// Vulnerable Code:
await prisma.$queryRawUnsafe(\`SELECT * FROM merchants WHERE tax_id = '\${taxId}'\`); // VULNERABLE!

// Remediated Code (100% Parameterized):
await prisma.$queryRaw\`SELECT * FROM merchants WHERE tax_id = \${taxId}\`; // 100% SECURE!`
  },
  {
    question: "How do Database Administrators Remediate Vulnerable Stored Procedures in Microsoft SQL Server using `sp_executesql`?",
    shortAnswer: "By refactoring dynamic queries from `EXEC('SELECT...'+@param)` to `EXEC sp_executesql @sql, @params, @param = @val` with explicit parameter definition strings.",
    explanation: "In SQL Server: Dynamic SQL inside stored procedures must be executed via `sp_executesql`. The procedure defines `@params = N'@taxId varchar(50)'` and passes `@taxId = @UserInput`. SQL Server caches the compiled query plan and binds the input as literal data, eliminating AST mutation.",
    hint: "Replace EXEC() with sp_executesql and define your parameter types inside the procedure.",
    level: "expert",
    codeExample: `// Remediated MSSQL Stored Procedure:
CREATE OR ALTER PROCEDURE dbo.GetMerchantProfileRemediated @TaxId varchar(50) AS
BEGIN
    DECLARE @sql nvarchar(500) = N'SELECT id, balance FROM merchants WHERE tax_id = @t';
    DECLARE @params nvarchar(200) = N'@t varchar(50)';
    EXEC sp_executesql @sql, @params, @t = @TaxId;
END;`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if un-remediated SQLi leaks 1,000,000 citizen medical records?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as remediating SQL injection flaws with prepared statements) resulting in massive personal data breaches triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical security safeguards. If an enterprise in Kolkata neglects known SQL injection vulnerabilities, allowing an attacker to exfiltrate citizen oncology records, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to remediate SQL injection leading to citizen data leaks triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent failure to remediate SQL injection vulnerabilities`
  },
  {
    question: "What is 'Automated Regression Testing for SQL Injection Remediation' in CI/CD DevSecOps Pipelines?",
    shortAnswer: "Writing automated unit and integration test suites that submit aggressive SQLi fuzz payloads (e.g. `' OR 1=1--`, `105; DROP TABLE;--`, `1' AND SLEEP(5)--`) to remediated endpoints and assert that responses return HTTP 200 (exact matched record), HTTP 400 (rejected by validation), or HTTP 404 (not found) without erroring, altering logic, or sleeping.",
    explanation: "In Jest/Mocha: An integration test fires `POST /api/search { query: \"' OR 1=1--\" }`. The test asserts `expect(res.body.length).toBe(0)` (no records matched the literal string \"' OR 1=1--\") and `expect(res.statusCode).toBe(200)`. If any change re-introduces string concatenation, the test immediately fails the pull request.",
    hint: "Writing automated tests that send hacker payloads to make sure your fix doesn't break in future updates.",
    level: "expert",
    codeExample: `// Jest Automated SQLi Regression Test:
test('Verify Parameterized Search Route is Immune to SQLi Tautologies', async () => {
    const maliciousPayload = "' OR '1'='1' --";
    const res = await request(app).get(\`/api/search?q=\${encodeURIComponent(maliciousPayload)}\`);
    expect(res.status).toBe(200);
    // Should treat payload as literal search string, returning 0 matching results:
    expect(res.body.records).toHaveLength(0);
});`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for SQL injection vulnerabilities and exploitation incidents?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from SQL injection to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of SQL injection breaches within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do Developers Remediate 'Second-Order SQL Injection' in Nightly Batch Reporting and Cron ETL Scripts?",
    shortAnswer: "By ensuring that secondary queries reading stored data from database tables ALSO use 100% Parameterized Prepared Statements (`pool.query('INSERT INTO audit (user) VALUES ($1)', [row.username])`) rather than concatenating retrieved database fields into secondary SQL strings.",
    explanation: "Even if an attacker's payload (`admin'--`) was safely inserted into the database in Phase 1, concatenating it into a nightly ETL report query in Phase 2 causes second-order injection. 100% parameterization must apply to all background workers, cron scripts, and analytical pipelines.",
    hint: "Always parameterize background scripts and nightly report queries, even when reading data from your own database.",
    level: "expert",
    codeExample: `// Remediated Nightly Reporting Worker:
const { rows } = await pool.query('SELECT username FROM pending_users');
for (const user of rows) {
    // 100% PARAMETERIZED: Secondary query uses positional $1 binding!
    await pool.query('INSERT INTO audit_log (actor_name, event) VALUES ($1, $2)', [user.username, 'BATCH_PROCESSED']);
}`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized data extraction resulting from un-remediated SQLi?",
    shortAnswer: "Accessing or securing access to a computer system, downloading, copying, or extracting data without permission carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized database data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Exploiting un-remediated SQL injection to extract 80,000 customer records in Kolkata
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "How do Developers Remediate 'UNION-Based Data Exfiltration' in Java Spring Boot / JDBC Services?",
    shortAnswer: "By replacing `Statement.executeQuery(\"SELECT * FROM items WHERE cat = '\" + cat + \"'\")` with `PreparedStatement.setString(1, cat)` and using Spring Data JPA repository interfaces (`findCategory(String cat)`).",
    explanation: "In Java JDBC: `conn.prepareStatement(\"SELECT id, name, price FROM products WHERE category = ?\")` pre-compiles the query template. Calling `pstmt.setString(1, userCategory)` binds the parameter out-of-band as pure literal data, preventing UNION clauses from altering the result set.",
    hint: "Use PreparedStatement with setString(1, val) or Spring Data JPA repository methods.",
    level: "moderate",
    codeExample: `// Remediated Java JDBC PreparedStatement:
String sql = "SELECT id, product_name, price FROM products WHERE category = ?";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, userCategory); // Bound out-of-band!
    try (ResultSet rs = pstmt.executeQuery()) {
        while (rs.next()) {
            // Process safe products...
        }
    }
}`
  },
  {
    question: "What is 'Semgrep AST Linter Configuration for SQL Injection Remediation Verification'?",
    shortAnswer: "A static analysis configuration rule that scans code repositories for dangerous concatenation patterns (e.g. `db.query(\"...\" + $VAR)`) and blocks git commits or pull requests failing the rule.",
    explanation: "A Semgrep YAML rule defines patterns: `pattern-either: - pattern: pool.query(\"...\" + $X) - pattern: prisma.$queryRawUnsafe(...)`. When a developer attempts to commit code containing string concatenation in database queries, the CI/CD pipeline fails with a blocking error, guaranteeing zero regressions.",
    hint: "Automated scanner rules that prevent developers from committing string concatenation in SQL queries.",
    level: "expert",
    codeExample: `// Semgrep Remediation Guard Rule (YAML):
rules:
  - id: enforce-parameterized-queries
    patterns:
      - pattern-either:
          - pattern: pool.query(\`...\${$VAR}...\`)
          - pattern: pool.query("..." + $VAR)
          - pattern: prisma.$queryRawUnsafe(...)
    message: "CRITICAL: String concatenation in database query! Use parameterized placeholders ($1, ?) or prisma.$queryRaw."
    severity: ERROR
    languages: [javascript, typescript]`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for unauthorized database manipulation via un-remediated SQLi?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Exploiting un-remediated SQL injection vulnerabilities to alter taxpayer balances in West Bengal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "How do Developers Remediate 'Time-Based Blind SQLi' in Asynchronous Python `asyncpg` Services?",
    shortAnswer: "By migrating raw string queries (`conn.fetch(f\"SELECT * FROM t WHERE k = '{key}'\")`) to positional parameter bindings (`conn.fetch(\"SELECT * FROM t WHERE k = $1\", key)`).",
    explanation: "In Python `asyncpg`: `await conn.fetch(\"SELECT id, balance FROM accounts WHERE tax_id = $1\", user_tax_id)` sends `user_tax_id` over the PostgreSQL binary wire protocol. Even if an attacker passes `9841' AND (SELECT pg_sleep(10))--`, the string is evaluated as a literal tax ID, completing in 1 millisecond without sleeping.",
    hint: "Use $1 positional parameter placeholders in asyncpg fetch calls.",
    level: "moderate",
    codeExample: `// Remediated Python asyncpg Query:
async with pool.acquire() as conn:
    # 100% PARAMETERIZED: pg_sleep() payload treated as harmless literal text!
    records = await conn.fetch(
        "SELECT id, balance, status FROM corporate_accounts WHERE tax_id = $1",
        str(user_tax_id)
    )`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Remediation Architecture combining Code Refactoring, Dual-Perimeter Gating, and CI/CD DevSecOps Controls.",
    shortAnswer: "A defense-in-depth framework combining 100% Parameterized Prepared Statements across all code repositories, Server-Side Static Whitelist Maps for Dynamic Identifiers, Tagged Template Literals in ORMs, Cloud WAF Virtual Patching, Strict Nonce-Based CSP, and Semgrep CI/CD Blocking Gates.",
    explanation: "To achieve complete, verified remediation: 1. Code Tier: Refactor 100% of queries to positional `$1, ?` prepared statements. 2. Identifiers: Sanitize dynamic `ORDER BY` using static dictionaries. 3. ORMs: Enforce tagged template literals (`$queryRaw\`...\``). 4. Perimeter: Deploy WAF virtual patches and strict nonce CSP headers. 5. CI/CD: Enforce Semgrep rules blocking `$queryRawUnsafe` and string concatenations.",
    hint: "Combine Parameterized Prepared Statements, Static Whitelist Maps, Tagged Raw ORM queries, WAF Virtual Patches, and CI/CD Semgrep rules.",
    level: "expert",
    codeExample: `// Master Enterprise Remediation Blueprint:
// 1. Code Layer    : pool.query('SELECT * FROM accounts WHERE id = $1', [userId])
// 2. Sorting Layer : ORDER BY \${WHITELIST[req.query.sort] || 'created_at'}
// 3. ORM Layer     : prisma.$queryRaw\`SELECT * FROM logs WHERE user = \${u.name}\`
// 4. Perimeter     : AWS WAF Core Rule Set + Content-Security-Policy: script-src 'nonce-SECRET'
// 5. CI/CD Layer   : Semgrep AST blocking gate banning string concatenation in all pull requests`
  },
  {
    question: "What is 'Database Account Privilege De-Escalation' as a Complementary Remediation Control?",
    shortAnswer: "Configuring the application database user with minimum required permissions (e.g. `SELECT`, `INSERT`, `UPDATE` only on application tables), revoking administrative privileges (`SUPERUSER`, `db_owner`, `sa`), and blocking access to system stored procedures (`xp_cmdshell`, `COPY PROGRAM`).",
    explanation: "Even if an un-discovered SQLi flaw exists in a legacy script, an application database user stripped of `DROP TABLE`, `CREATE USER`, `INTO OUTFILE`, and `xp_cmdshell` permissions cannot overwrite database schemas or execute operating system shell commands, drastically reducing the blast radius.",
    hint: "Giving the database user only permission to read and write normal tables, never administrative or shell access.",
    level: "moderate",
    codeExample: `// PostgreSQL Least Privilege User Script:
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM web_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.merchants, public.invoices TO web_app_user;
-- web_app_user CANNOT execute DROP TABLE, ALTER SYSTEM, or COPY PROGRAM!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Un-Remediated SQL Injection Exploitation?",
    shortAnswer: "Intentionally exploiting un-remediated SQL injection vulnerabilities to alter, corrupt, or destroy digital databases, causing wrongful loss, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker exploits an un-remediated SQLi flaw to drop patient diagnostic records or alter tax ledgers in West Bengal, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Data Destruction with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Exploiting un-remediated SQL injection to corrupt patient chemotherapy records in Ichapur (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "How do Developers Remediate 'Second-Order SQLi in User Profile Registration'?",
    shortAnswer: "By parameterizing BOTH the initial profile insert query AND any subsequent administrative lookup or reporting queries that read the stored profile fields.",
    explanation: "Phase 1: `await pool.query('INSERT INTO users (username) VALUES ($1)', [username])`. Phase 2: When an admin views the user: `await pool.query('SELECT * FROM audit WHERE user = $1', [storedUsername])`. Because BOTH queries use positional parameters, stored payloads (like `admin'--`) remain harmless literal strings forever.",
    hint: "Parameterize both the registration INSERT and every subsequent query that reads that user's name.",
    level: "expert",
    codeExample: `// Remediated Second-Order Defense:
// 1. Safe Insert : await pool.query('INSERT INTO users (name) VALUES ($1)', [rawName]);
// 2. Safe Read   : const user = (await pool.query('SELECT name FROM users WHERE id = $1', [id])).rows[0];
// 3. Safe Lookup : await pool.query('SELECT * FROM logs WHERE actor = $1', [user.name]); // 100% IMMUNE!`
  },
  {
    question: "What is 'DAST Automated Verification using OWASP ZAP' in the Post-Remediation Workflow?",
    shortAnswer: "Running automated dynamic application security scans (DAST) using OWASP ZAP or Burp Suite Enterprise against staging environments to fuzz all HTTP routes with thousands of active SQLi payloads, verifying that zero injection vectors remain before production release.",
    explanation: "A ZAP baseline scan automatically injects in-band, blind, and time-based SQLi probes across all form parameters and headers. If the scan completes with 0 high-severity alerts, the staging build receives automated security certification for production release.",
    hint: "Using automated tools like OWASP ZAP to bombard your fixed website with thousands of hacker attacks to make sure it is 100% secure.",
    level: "moderate",
    codeExample: `// OWASP ZAP CLI Automated DAST Scan:
zap-cli quick-scan --spider -r -l High https://staging.kolkata-fintech.in/api/v1`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for exploiting un-remediated SQLi against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an SQL injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Exploiting un-remediated SQL injection flaws against SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "How do Developers Remediate 'SQLi in Legacy PHP PDO' by Disabling Emulated Prepares?",
    shortAnswer: "By setting `PDO::ATTR_EMULATE_PREPARES => false` during PDO connection instantiation, which forces PHP to use true server-side prepared statements and disables flawed client-side regex escaping.",
    explanation: "By default, PHP PDO emulates prepared statements by escaping strings on the client. In certain multibyte character sets (GBK), attackers bypass client escaping. Setting `PDO::ATTR_EMULATE_PREPARES => false` forces the MySQL server to compile the query AST first, providing 100% server-side immunity.",
    hint: "Set ATTR_EMULATE_PREPARES to false in PHP PDO to force true server-side prepared statements.",
    level: "expert",
    codeExample: `// Remediated PHP PDO Connection Setup:
$pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_EMULATE_PREPARES   => false, // True server-side preparation!
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);
$stmt = $pdo->prepare('SELECT id, balance FROM accounts WHERE tax_id = :tax_id');
$stmt->execute(['tax_id' => $userTaxId]);`
  },
  {
    question: "Under the Indian IT Act Section 66C, what constitutes Identity Theft via Un-Remediated SQL Injection?",
    shortAnswer: "Fraudulently or dishonestly making use of the electronic signature, password, or unique identification feature of another person carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66C of the IT Act explicitly criminalizes identity theft. If an attacker exploits an un-remediated SQL injection vulnerability to dump citizen credentials or session tokens and impersonates users in Kolkata, they face up to 3 years imprisonment under Section 66C.",
    hint: "Section 66C covers Identity Theft and Credential Extraction with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66C):
// Offense: Dumping 30,000 citizen banking credentials via un-remediated SQL injection
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'CodeQL Query Writing for SQL Injection Vulnerability Analysis'?",
    shortAnswer: "Writing semantic query rules in CodeQL to trace data flow (taint tracking) from untrusted user inputs (`RemoteFlowSource`) to dangerous database sinks (`SqlExecutionSink`), identifying all vulnerable code paths across an entire codebase automatically.",
    explanation: "CodeQL treats source code as a relational database. A CodeQL query traces whether `req.query.id` flows into `Statement.executeQuery()` without passing through a sanitizer or parameterization barrier. Running CodeQL in GitHub Actions automatically flags any new SQLi vulnerability on every pull request.",
    hint: "Using advanced semantic code search to trace untrusted user input from web requests straight into database queries.",
    level: "expert",
    codeExample: `// CodeQL Taint Tracking Concept (QL):
import javascript
import semmle.javascript.security.dataflow.SqlInjectionQuery

from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "SQL Injection vulnerability from $@.", source.getNode(), "user input"`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via Un-Remediated SQLi Exploitation?",
    shortAnswer: "Dishonestly accessing, altering, or siphoning funds using un-remediated SQL injection exploits, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker exploits an un-remediated SQL injection flaw on a Kolkata payment portal to siphon ₹95 Lakhs from merchant settlement balances, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Fund Siphoning with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Siphoning ₹95 Lakhs from corporate merchant balances via un-remediated SQL injection
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Microservice Architecture Isolation' to Limit SQL Injection Blast Radius?",
    shortAnswer: "Decoupling monolithic databases into isolated microservice databases where each service (Auth, Payments, Products, Users) owns its dedicated database instance and credentials, preventing an SQLi breach on one service from exposing data across other business domains.",
    explanation: "If the Product Catalog service is breached via SQLi, the attacker only accesses public product data. Because the Payments service runs on an isolated database cluster with distinct credentials and network VPCs, the attacker cannot pivot to siphon money or extract credit cards.",
    hint: "Giving each microservice its own separate database so a break-in at one doesn't expose the others.",
    level: "moderate",
    codeExample: `// Microservice Database Isolation Architecture:
// 1. Catalog Service ➔ Connected to catalog_db (Read-Only Public Products)
// 2. Payment Service ➔ Connected to payment_db (Isolated VPC & Encrypted Escrow Ledgers)`
  },
  {
    question: "What is 'WAF Virtual Patching De-Provisioning Post-Remediation'?",
    shortAnswer: "The structured process of retiring temporary WAF virtual patch rules after permanent code-level fixes have been deployed, verified via automated regression tests, and monitored in production for 14 days, preventing WAF rule bloat and performance degradation.",
    explanation: "Temporary WAF rules should not remain active forever. Once the engineering team deploys the parameterized prepared statement fix and verifies zero regressions in CI/CD, the WAF virtual patch rule is gracefully archived after a 14-day observation window.",
    hint: "Cleaning up temporary firewall rules after the permanent code fix is tested and deployed.",
    level: "moderate",
    codeExample: `// Virtual Patch Deprovisioning Checklist:
// 1. Code fix deployed to Production with 100% Prepared Statements
// 2. Automated DAST regression tests pass with 0 alerts
// 3. 14-day production monitoring confirms zero attack traffic on route
// 4. Archive temporary AWS WAF custom rule`
  },
  {
    question: "Synthesize the mathematical formulation of AST Diff Invariance (Delta AST), Parameterized State Machine Transition (T_safe), and Mathematical Proof of Zero SQL Injection Exploitability.",
    shortAnswer: "Let vulnerable query AST be AST(Q_vuln) and remediated AST be AST(Q_rem). Under parameterized remediation, the relational compiler freezes fixed AST template T_0 in Phase 1 and binds parameters out-of-band as literal constants V_T in Phase 2. The AST Diff operator yields Delta AST = AST(Q_rem) - T_0 = empty set, mathematically proving that user input is incapable of generating grammar production rules, driving exploitability to exactly P_sqli = 0.000%.",
    explanation: "Let the formal grammar of the database query language be G = (V_N, V_T, P, S). In vulnerable string concatenation, untrusted input x in Σ* is parsed by the SQL lexer, introducing new non-terminal grammar productions P_injected subset of P, such that AST(Q_vuln) = T_0 UNION ΔT, where ΔT ≠ ∅ (e.g. injected OR nodes, subqueries). In parameterized remediation, the compilation function C: Σ* → T pre-compiles the query template Q_0 into a fixed tree structure T_0 = C(Q_0) with placeholder slots S_1, ..., S_n in V_T. In Phase 2, parameters x_1, ..., x_n are bound directly to leaf slots without passing through the production rules P. Therefore, ΔAST = AST(Q_rem) - T_0 = ∅. Because ΔAST = ∅ for all x in Σ*, the probability of query logic alteration is P_sqli = 0.000%, establishing the formal mathematical proof of complete remediation.",
    hint: "Mathematical proof formula showing that parameterization freezes the query AST template first, proving zero percent (0.000%) SQL injection exploitability forever.",
    level: "expert",
    codeExample: `// Formal Mathematical Proof of Remediation Safety:
// Vulnerable Query : Q_vuln = "SELECT * FROM u WHERE id = '" + x + "'" ➔ Delta AST != Empty Set ➔ P_sqli = 100.0%
// Remediated Query : Q_rem  = "SELECT * FROM u WHERE id = $1" with [x]  ➔ Delta AST == Empty Set ➔ P_sqli = 0.000% (MATHEMATICALLY IMMUNE!)`
  }
];

export default questions;
