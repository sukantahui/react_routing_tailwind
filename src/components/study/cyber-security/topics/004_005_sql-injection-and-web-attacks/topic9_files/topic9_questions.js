const questions = [
  {
    question: "What is a 'Parameterized Query' (Prepared Statement), and why is it the Primary Gold Standard Defense against SQL Injection?",
    shortAnswer: "A database query technique where the SQL code structure is pre-compiled by the database engine into a fixed Abstract Syntax Tree (AST) template before user inputs are supplied; user inputs are transmitted separately as pure literal data values, making it mathematically impossible for input to alter query logic.",
    explanation: "In string concatenation, the database compiles code and user data together, allowing malicious syntax to inject new clauses. In prepared statements, the database compiles `SELECT * FROM users WHERE username = ?` first. When an attacker sends `' OR 1=1--`, the database treats the entire string literally as a username value, searching for a user named `' OR 1=1--`.",
    hint: "Locking the query shape in stone first, and then filling in user answers as harmless text.",
    level: "basic",
    codeExample: `// Two-Phase Prepared Statement Execution:
// Phase 1 (Compile AST) : PREPARE stmt FROM 'SELECT * FROM users WHERE email = ?';
// Phase 2 (Bind Data)   : EXECUTE stmt USING 'admin@bank.in'; (Zero SQL Syntax Mutation!)`
  },
  {
    question: "How does the 'Two-Phase Query Compilation Pipeline' (PREPARE and EXECUTE) Prevent SQL Injection at the Parser Level?",
    shortAnswer: "In Phase 1 (`PREPARE`), the SQL parser constructs and freezes the Abstract Syntax Tree (AST) grammar nodes; in Phase 2 (`EXECUTE`), user parameters are placed directly into memory execution slots as literal typed constants, completely bypassing the SQL parser and lexer.",
    explanation: "Because user parameters never pass through the SQL lexer or grammar parser during execution, characters with syntactic meaning (quotes, semicolons, dashes, keywords) are treated strictly as character data, guaranteeing AST invariance.",
    hint: "The database builds the grammar tree before seeing the user's text, so user text can never create new grammar branches.",
    level: "expert",
    codeExample: `// Database Wire Protocol Level:
// 1. Parse Message   : "SELECT id, balance FROM accounts WHERE account_no = $1" (Grammar frozen!)
// 2. Bind Message    : $1 = "9841' OR '1'='1" (Treated as 16-character string literal!)
// 3. Execute Message : Returns 0 rows because no account matches that literal string!`
  },
  {
    question: "Why CANNOT SQL Identifiers (Table Names, Column Names, `ORDER BY` directions) be Parameterized?",
    shortAnswer: "Database query planners require table and column names during the compilation phase (`PREPARE`) to verify schema validity, resolve types, and build index execution plans; parameters can ONLY replace literal data values in `WHERE`, `VALUES`, or `SET` clauses.",
    explanation: "Executing `SELECT * FROM $1` or `ORDER BY $1` fails or evaluates as a literal string constant (e.g. `ORDER BY 'salary'`, which orders by a constant string without sorting the table). Developers must handle dynamic identifiers through strict server-side whitelisting maps.",
    hint: "The database needs to know which table and column to look at before it can build the query plan.",
    level: "expert",
    codeExample: `// Invalid Parameterization Attempt:
// db.query('SELECT * FROM $1 WHERE status = $2', [userTableName, 'active']); ➔ SYNTAX ERROR!

// Secure Identifier Whitelisting:
const ALLOWED_TABLES = { 'merchants': 'merchants', 'invoices': 'invoices' };
const safeTable = ALLOWED_TABLES[req.query.type] || 'merchants';
const query = \`SELECT * FROM \${safeTable} WHERE status = $1\`;`
  },
  {
    question: "How do you Safely Implement Dynamic `ORDER BY` Sorting without SQL Injection Vulnerabilities?",
    shortAnswer: "By mapping untrusted user sorting inputs against a strict server-side whitelist dictionary of allowable column names and sort directions (`ASC` or `DESC`), rejecting or defaulting any unapproved input.",
    explanation: "If user input is concatenated into `ORDER BY`: `\"SELECT * FROM users ORDER BY \" + req.query.sort`, an attacker injects `(CASE WHEN (SELECT 1)=1 THEN id ELSE price END)`. Mitigation requires: `const safeCol = {'price': 'price', 'name': 'name'}[req.query.sort] || 'id'; const safeDir = req.query.dir === 'DESC' ? 'DESC' : 'ASC';`.",
    hint: "Only allowing users to pick sort options from a fixed list of approved column names.",
    level: "moderate",
    codeExample: `// Secure ORDER BY Whitelist Implementation:
function getSafeSortClause(sortParam, orderParam) {
    const columnMap = { 'date': 'created_at', 'amount': 'total_amount', 'name': 'customer_name' };
    const safeColumn = columnMap[sortParam] || 'created_at';
    const safeDirection = String(orderParam).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return \`ORDER BY \${safeColumn} \${safeDirection}\`;
}`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for failing to secure Critical National Infrastructure with Parameterized Queries resulting in Cyber Terrorism?",
    shortAnswer: "Using un-parameterized queries leading to catastrophic database compromise of critical national information infrastructure (power grids, nuclear systems, defense) is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an organization operating power grid telemetry in Barrackpore or banking settlement gateways in Salt Lake fails to use parameterized queries, resulting in hostile database takeover, the perpetrators face mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Exploiting un-parameterized SQL queries to seize control of 220kV power transmission SCADA databases
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "How do Parameter Placeholders Differ across Languages: Node.js, Java JDBC, Python, PHP PDO, C# ADO.NET, and Go?",
    shortAnswer: "Node.js (pg) uses `$1, $2`; Java JDBC uses `?`; Python (psycopg2) uses `%s` or `$1`; PHP PDO uses named `:name` or `?`; C# ADO.NET uses `@param`; Go (database/sql) uses `$1` (PostgreSQL) or `?` (MySQL).",
    explanation: "Different database drivers implement distinct positional and named parameter syntax, but all transmit parameters out-of-band over the database wire protocol to maintain AST invariance.",
    hint: "Different programming languages use different symbols like $1, ?, or @name to hold parameter spots.",
    level: "moderate",
    codeExample: `// Language Parameter Placeholder Matrix:
// 1. Node.js (pg)     : pool.query('SELECT * FROM users WHERE id = $1', [userId])
// 2. Java (JDBC)      : pstmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?"); pstmt.setInt(1, userId);
// 3. Python (asyncpg) : await conn.fetch('SELECT * FROM users WHERE id = $1', user_id)
// 4. PHP (PDO)        : $stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id'); $stmt->execute(['id' => $id]);
// 5. C# (ADO.NET)     : cmd.CommandText = "SELECT * FROM users WHERE id = @id"; cmd.Parameters.AddWithValue("@id", userId);`
  },
  {
    question: "How do you Safely Construct Parameterized Queries for Dynamic `WHERE id IN (...)` Array Clauses?",
    shortAnswer: "By dynamically generating an array of positional placeholders matching the input array length (`$1, $2, $3`) and passing the flattened array values as parameter bindings, or using PostgreSQL `= ANY($1)` syntax.",
    explanation: "Concatenating array values: `\"WHERE id IN (\" + ids.join(',') + \")\"` is vulnerable if array elements are strings. In Node.js PostgreSQL: `const placeholders = ids.map((_, i) => '$' + (i + 1)).join(','); const query = 'SELECT * FROM items WHERE id IN (' + placeholders + ')'; db.query(query, ids);`. In PostgreSQL native: `SELECT * FROM items WHERE id = ANY($1::int[])`.",
    hint: "Generating the exact number of $1, $2, $3 placeholders matching the number of items in the list.",
    level: "expert",
    codeExample: `// Dynamic IN Clause Parameterization (Node.js pg):
const itemIds = [101, 102, 105, 108];

// Method 1: Placeholder Array Mapping
const placeholders = itemIds.map((_, idx) => \`$\${idx + 1}\`).join(', ');
const query1 = \`SELECT * FROM products WHERE id IN (\${placeholders})\`;
await pool.query(query1, itemIds);

// Method 2: Native PostgreSQL Array Operator
const query2 = 'SELECT * FROM products WHERE id = ANY($1::int[])';
await pool.query(query2, [itemIds]);`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if failure to use Parameterized Queries causes citizen data theft?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as parameterized prepared statements) resulting in personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical security safeguards. If an enterprise in Kolkata uses string concatenation instead of prepared statements, leading to citizen financial record leaks, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to protect citizen personal data with prepared statements triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent database query vulnerabilities`
  },
  {
    question: "Can Stored Procedures Still be Vulnerable to SQL Injection if They Concatenate Strings Internally?",
    shortAnswer: "YES. Stored procedures are ONLY secure if their internal SQL statements use parameterization; if a stored procedure internally builds dynamic SQL strings and executes them with `EXEC()` or `sp_executesql`, it remains completely vulnerable to SQL injection.",
    explanation: "A common misconception is that stored procedures automatically prevent SQLi. If a DBA writes: `CREATE PROCEDURE FindUser @name varchar(50) AS BEGIN EXEC('SELECT * FROM users WHERE name = ''' + @name + '''') END;`, passing `' OR '1'='1` will inject into the dynamic `EXEC()` call.",
    hint: "Stored procedures are only safe if the code inside them doesn't glue text strings together.",
    level: "expert",
    codeExample: `// Vulnerable Stored Procedure (Dynamic String Concatenation):
CREATE PROCEDURE GetCitizenProfile @taxId varchar(50) AS
BEGIN
    -- VULNERABLE: Dynamic concatenation inside stored procedure!
    EXEC('SELECT * FROM citizens WHERE tax_id = ''' + @taxId + '''');
END;

// Secure Stored Procedure (Parameterized Internal Execution):
CREATE PROCEDURE GetCitizenProfileSecure @taxId varchar(50) AS
BEGIN
    -- SECURE: Uses parameterized sp_executesql
    EXEC sp_executesql N'SELECT * FROM citizens WHERE tax_id = @id', N'@id varchar(50)', @id = @taxId;
END;`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for SQL Injection data breaches?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from SQL injection to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of SQL injection database leaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Second-Order SQL Injection' and why can it Occur Even if the Initial Data Insertion was Parameterized?",
    shortAnswer: "When malicious input is safely stored in the database via prepared statements during Phase 1, but is subsequently retrieved and concatenated into a secondary dynamic SQL query in Phase 2 (such as an admin report or batch job), executing the payload.",
    explanation: "Phase 1: Attacker registers with username `admin'--`. The INSERT query uses prepared statements, storing `admin'--` safely in the `users` table. Phase 2: A nightly admin batch script runs: `\"SELECT * FROM activity WHERE username = '\" + row.username + \"'\"`. The retrieved string breaks out of the secondary query.",
    hint: "Safely storing dangerous text in the database today, which explodes tomorrow when a secondary report script glues it into a query.",
    level: "expert",
    codeExample: `// Second-Order SQLi Lifecycle:
// Phase 1 (Safe Insert): db.query('INSERT INTO users (name) VALUES ($1)', ["admin'--"]); (SAFELY STORED!)
// Phase 2 (Vulnerable Report): const q = "SELECT * FROM logs WHERE user = '" + row.name + "'"; (SQLi EXPLODES!)
// Mitigation: ALL queries—both primary and background/batch queries—MUST be 100% parameterized!`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for extracting database records using SQL Injection?",
    shortAnswer: "Securing access and extracting or copying data from a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized database data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Exploiting un-parameterized SQL queries to extract 30,000 corporate payroll records in Kolkata
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "How does Java JDBC `PreparedStatement` Handle Type Binding (e.g. `setInt`, `setString`, `setDate`)?",
    shortAnswer: "JDBC `PreparedStatement` provides dedicated setter methods that map Java native types directly to SQL binary wire types, enforcing compile-time and runtime type safety while preventing character escaping errors.",
    explanation: "Calling `pstmt.setInt(1, 105)` guarantees the database receives a 4-byte binary integer, not a character sequence. Calling `pstmt.setString(2, untrustedInput)` packages the characters into a length-prefixed data buffer on the database wire protocol.",
    hint: "Java tells the database whether each parameter is a number, a word, or a date, preventing sneaky text tricks.",
    level: "moderate",
    codeExample: `// Java JDBC PreparedStatement Implementation:
String sql = "SELECT id, balance, status FROM accounts WHERE customer_id = ? AND branch_code = ?";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setInt(1, 9841);
    pstmt.setString(2, "KOL-SALT-LAKE");
    try (ResultSet rs = pstmt.executeQuery()) {
        while (rs.next()) { /* Process safe records */ }
    }
}`
  },
  {
    question: "What is 'Client-Side Prepared Statements' vs 'Server-Side Prepared Statements'?",
    shortAnswer: "Server-side prepared statements send the query template and data values in separate wire protocol packets (`PREPARE` and `EXECUTE`); client-side prepared statements (emulated prepared statements) perform string escaping inside the client library before sending a single concatenated query string to the server.",
    explanation: "Server-side preparation is true parameterization (AST invariance). Emulated client-side preparation (e.g. PDO default `ATTR_EMULATE_PREPARES = true`) relies on string escaping regexes, which can be bypassed by character set encoding vulnerabilities (like GBK multibyte bypasses). True security requires disabling emulation.",
    hint: "Real prepared statements compile on the database server; fake prepared statements just escape quotes in client code.",
    level: "expert",
    codeExample: `// PHP PDO True Server-Side Preparation:
$pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_EMULATE_PREPARES => false, // DISBALE client-side emulation!
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing and executing SQL Injection exploits?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing automated scripts targeting un-parameterized SQL endpoints in West Bengal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Automated Static Application Security Testing (SAST)' for Detecting Un-Parameterized Queries in CI/CD Pipelines?",
    shortAnswer: "Static code analysis engines (such as Semgrep, CodeQL, and SonarQube) that parse source code into Abstract Syntax Trees (ASTs), trace data flow from HTTP inputs (Sources) to SQL execution functions (Sinks), and flag any string concatenation as a blocking vulnerability.",
    explanation: "A Semgrep rule `pattern: $DB.query(\"...\" + $REQ.query.$PARAM + \"...\")` analyzes developer commits. If a developer concatenates strings into a database query, the CI/CD pipeline fails the build automatically, preventing un-parameterized code from reaching production.",
    hint: "Automated code scanners that inspect every line of code during git commit to ensure every query uses prepared statements.",
    level: "moderate",
    codeExample: `// Semgrep SAST Rule for Un-Parameterized Queries (YAML):
rules:
  - id: unparameterized-sql-query
    patterns:
      - pattern-either:
          - pattern: pool.query("..." + $X + "...")
          - pattern: pool.query(\`...\${$X}...\`)
    message: "CRITICAL: Un-parameterized SQL query detected! Use positional parameters ($1, $2)."
    severity: ERROR
    languages: [javascript, typescript]`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defensive Coding Architecture ensuring 100% Parameterization Coverage.",
    shortAnswer: "A comprehensive framework combining 100% Parameterized Prepared Statements, Strict Static Column Whitelisting for Dynamic Identifiers, Automated SAST AST Linters (Semgrep/CodeQL) in CI/CD, Disabling Prepared Statement Emulation, and Least Privilege Database Accounts.",
    explanation: "To achieve complete immunity: 1. Code Tier: 100% Parameterized Prepared Statements across all queries (including internal cron/batch jobs). 2. Dynamic Clause Tier: Whitelist mapping dictionaries for dynamic table/column names and `ORDER BY` directions. 3. Database Driver Tier: Disabling client-side prepared statement emulation (`ATTR_EMULATE_PREPARES = false`). 4. Automated Verification: Blocking CI/CD build gates via Semgrep/CodeQL taint rules. 5. Database Tier: Principle of Least Privilege.",
    hint: "Combine 100% Prepared Statements, column whitelisting, disabling driver emulation, and automated CI/CD SAST scanning.",
    level: "expert",
    codeExample: `// Master Defensive Coding Architecture Blueprint:
// 1. Prepared Statement : const { rows } = await pool.query('SELECT * FROM accounts WHERE id = $1', [safeId]);
// 2. Column Whitelist  : const safeCol = { 'name': 'name', 'date': 'created_at' }[req.query.sort] || 'id';
// 3. Driver Setting     : { emulatePrepares: false }
// 4. CI/CD Static Gate  : Semgrep / CodeQL blocking all string concatenations in DB sinks`
  },
  {
    question: "What is 'Type-Safe SQL Query Builders' (Knex.js, Kysely, jOOQ) and How Do They Enforce Parameterization by Design?",
    shortAnswer: "Query builder libraries that construct SQL queries through method chaining (`db('users').where('id', id)`), automatically converting all input variables into positional parameterized placeholders (`$1, $2`) without manual developer intervention.",
    explanation: "In Knex.js or Kysely: `knex('users').where('name', req.query.name).select('id', 'email')`. The query builder automatically outputs SQL: `SELECT id, email FROM users WHERE name = ?` with parameter bindings `[req.query.name]`. Developers cannot accidentally concatenate strings unless they explicitly call `.raw()`.",
    hint: "Code libraries that automatically turn all your variables into prepared statements without you having to write $1 manually.",
    level: "moderate",
    codeExample: `// Safe Knex.js Query Builder (Automatic Parameterization):
const user = await knex('corporate_merchants')
    .where({ tax_id: req.query.gst_no })
    .select('id', 'business_name', 'compliance_status');
// Compiles to: SELECT id, business_name, compliance_status FROM corporate_merchants WHERE tax_id = ?`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Un-Parameterized SQL Exploits?",
    shortAnswer: "Intentionally destroying, altering, or diminishing the value and utility of digital property and database records by exploiting un-parameterized SQL queries, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker exploits an un-parameterized query to delete or corrupt hospital diagnostic records in West Bengal, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Exploiting un-parameterized SQL queries to drop billing tables in a Kolkata hospital (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Parameterized Stored Procedures in Microsoft SQL Server' via `sp_executesql`?",
    shortAnswer: "Executing dynamic SQL in MSSQL using `sp_executesql` with defined parameter definition strings (`@params`) and passing parameter values, ensuring the query plan is cached and user parameters cannot alter the SQL AST.",
    explanation: "Instead of executing `EXEC('SELECT * FROM users WHERE name = ''' + @name + '''')`, developers must execute: `EXEC sp_executesql N'SELECT * FROM users WHERE name = @n', N'@n varchar(50)', @n = @name;`. The query plan is pre-compiled and parameters are bound safely.",
    hint: "Using sp_executesql with @param definitions in SQL Server to make dynamic queries 100% safe.",
    level: "expert",
    codeExample: `// Secure MSSQL sp_executesql Parameterization:
DECLARE @sql nvarchar(500) = N'SELECT id, balance FROM accounts WHERE account_no = @acc AND status = @st';
DECLARE @params nvarchar(200) = N'@acc varchar(20), @st varchar(10)';
EXEC sp_executesql @sql, @params, @acc = '9841', @st = 'ACTIVE';`
  },
  {
    question: "What is 'Second-Order Parameterization Defense' for Data Pipelines and ETL Jobs?",
    shortAnswer: "The architectural rule that data retrieved from a database must STILL be treated as untrusted and parameterized when passed into secondary SQL queries, background workers, or analytical ETL jobs.",
    explanation: "Developers often assume that because data came from their own database, it is safe to concatenate. However, if a malicious username `' OR 1=1--` was stored during signup, concatenating it into a secondary reporting script re-introduces SQL injection. 100% parameterization must be applied everywhere.",
    hint: "Even when reading data out of your own database, you must still use prepared statements in your report scripts.",
    level: "expert",
    codeExample: `// Second-Order Defense in Background Cron Job:
// 1. Fetch user records from DB:
const { rows } = await pool.query('SELECT username FROM pending_users');

// 2. SECURE: Parameterize the secondary query!
for (const row of rows) {
    await pool.query('INSERT INTO audit_log (actor) VALUES ($1)', [row.username]); // 100% SAFE!
}`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for exploiting SQL Injection against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an SQL injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Exploiting un-parameterized SQL queries against SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Raw Query Escape Functions' (e.g. `mysql_real_escape_string`, `pg_escape_string`) and Why Are They Inferior to Parameterization?",
    shortAnswer: "String escaping functions attempt to add backslashes before dangerous characters (`'` $\\to$ `\\'`), but are prone to developer omission, fail completely on numeric contexts (`WHERE id = 105 OR 1=1`), and can be bypassed by character set encoding flaws (GBK multibyte bypasses).",
    explanation: "Escaping functions only protect string literals and do nothing for numeric contexts (`SELECT * FROM users WHERE id = \" + escape(input)`). An attacker sends `105 OR 1=1`, which contains zero quotes, bypassing the escaping function. Parameterization provides 100% mathematical immunity across all contexts.",
    hint: "Escaping adds slashes to quotes, which doesn't protect numbers and can be tricked by multibyte character sets.",
    level: "moderate",
    codeExample: `// Numeric Context Escaping Failure:
// Input : 105 OR 1=1
// Escaped: 105 OR 1=1 (No quotes to escape!)
// Query  : SELECT * FROM accounts WHERE id = 105 OR 1=1 (SQL INJECTION SUCCEEDS!)
// Solution: USE PARAMETERIZED PREPARED STATEMENTS!`
  },
  {
    question: "Under the Indian IT Act Section 66C, what constitutes Identity Theft via SQL Injection Credential Extraction?",
    shortAnswer: "Fraudulently or dishonestly making use of the electronic signature, password, or unique identification feature of another person carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66C of the IT Act explicitly criminalizes identity theft. If an attacker uses SQL injection to extract citizen password hashes or banking tokens and impersonates users in Kolkata, they face up to 3 years imprisonment under Section 66C.",
    hint: "Section 66C covers Identity Theft and Credential Extraction with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66C):
// Offense: Extracting 15,000 citizen banking credentials via un-parameterized SQL injection
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'Performance Impact of Prepared Statements' (Query Plan Caching vs Dynamic Parsing)?",
    shortAnswer: "Prepared statements are FASTER than dynamic SQL because the database compiles and caches the query plan once; subsequent executions reuse the pre-compiled plan, saving CPU cycles on query parsing and optimization.",
    explanation: "When executing 10,000 inserts: Dynamic SQL requires the database parser, optimizer, and planner to run 10,000 times. Prepared statements compile the query once (`PREPARE`), caching the plan in memory, and execute 10,000 times with direct parameter binding, achieving up to 300% higher transaction throughput.",
    hint: "Prepared statements make your website faster because the database only has to figure out the query once.",
    level: "moderate",
    codeExample: `// Performance Benchmark:
// Dynamic SQL (10,000 Queries) : 10,000 Compilations ➔ 4.8 Seconds
// Prepared Stmt (10,000 Queries): 1 Compilation + 10,000 Binds ➔ 1.2 Seconds (4x FASTER!)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via SQL Injection Financial Exploitation?",
    shortAnswer: "Dishonestly accessing, altering, or siphoning funds using SQL injection exploits on un-parameterized endpoints, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker exploits an un-parameterized SQL query to siphon ₹75 Lakhs from a Kolkata payment gateway, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Financial Siphoning with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Exploiting un-parameterized SQL queries to siphon ₹75 Lakhs from corporate escrow accounts
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'GraphQL Query Parameterization' in Modern Web Architectures?",
    shortAnswer: "Ensuring that GraphQL resolvers use parameterized prepared statements when querying the underlying SQL database, rather than concatenating GraphQL arguments (`args.id`) into raw SQL strings.",
    explanation: "GraphQL does NOT automatically prevent SQL injection. If a resolver executes `db.query(\"SELECT * FROM users WHERE id = \" + args.id)`, an attacker sends a GraphQL query with an injection payload: `query { user(id: \"105 OR 1=1\") { email } }`. Resolvers must pass GraphQL arguments as parameter bindings.",
    hint: "GraphQL is just an API layer; if its backend code glues text into SQL, it is still vulnerable.",
    level: "moderate",
    codeExample: `// Secure GraphQL Resolver:
const resolvers = {
    Query: {
        user: async (_, { id }, { db }) => {
            // SECURE: Pass GraphQL argument as parameterized $1 binding!
            const { rows } = await db.query('SELECT id, email, name FROM users WHERE id = $1', [id]);
            return rows[0];
        }
    }
};`
  },
  {
    question: "What is 'ORM Injection' via Raw SQL Fragments (e.g. Sequelize `Sequelize.literal()`, TypeORM `whereRaw()`)?",
    shortAnswer: "A vulnerability where developers using an ORM bypass the ORM's built-in parameterization by calling raw SQL escape hatches (`Sequelize.literal()`, `knex.raw()`) with concatenated strings, re-introducing SQL injection into modern frameworks.",
    explanation: "While ORM methods like `User.findOne({ where: { id } })` are automatically parameterized, calling `User.findAll({ where: Sequelize.literal(\"status = '\" + req.query.status + \"'\") })` evaluates the raw string without parameterization, re-creating SQL injection.",
    hint: "Using raw SQL functions inside an ORM and concatenating text bypasses the ORM's safety shields.",
    level: "expert",
    codeExample: `// Vulnerable Sequelize Raw SQL Fragment:
await User.findAll({
    where: Sequelize.literal(\`status = '\${req.query.status}'\`) // VULNERABLE!
});

// Secure Sequelize Parameterized Fragment:
await User.findAll({
    where: Sequelize.literal('status = :safeStatus'),
    replacements: { safeStatus: req.query.status } // 100% SECURE!
});`
  },
  {
    question: "Synthesize the mathematical formulation of Abstract Syntax Tree Invariance (Delta AST), Grammar Production Rules (G), and Parameter Binding Mapping (f_param) Proving Complete SQLi Immunity.",
    shortAnswer: "Let the SQL grammar be G = (V_N, V_T, P, S). Prepared Statements compile AST(Q_template) in Phase 1; in Phase 2, parameter binding f_param maps inputs directly to literal token values v in V_T without executing production rules in P, proving Delta AST = AST(Q_executed) - AST(Q_template) = empty set, guaranteeing P_sqli = 0.000%.",
    explanation: "Let the formal grammar of the database query language be $G = (V_N, V_T, P, S)$ where $V_N$ is non-terminal grammar symbols, $V_T$ is terminal literal tokens, $P$ is production rules, and $S$ is the start symbol. In an un-parameterized query, untrusted input $\\omega$ passes through $P$, adding new non-terminal subtrees (e.g. $S \\to \\text{WHERE} \\to \\text{OR} \\to \\text{TRUE}$), resulting in $\\Delta \\text{AST} \\neq \\emptyset$. In a Parameterized Prepared Statement, the query template $Q_{\\text{template}}$ is compiled in Phase 1, generating a fixed tree $T_0 = \\text{AST}(Q_{\\text{template}})$. In Phase 2, parameter binding function $f_{\\text{param}}: \\Omega \\to V_T$ assigns inputs strictly to leaf nodes in $V_T$ without invoking any production rule in $P$. Therefore, $\\text{AST}(Q_{\\text{executed}}) = T_0$, proving $\\Delta \\text{AST} = \\emptyset$ and mathematically establishing that the probability of query logic mutation is $P_{\\text{sqli}} = 0.000\\%$ (absolute mathematical immunity).",
    hint: "Mathematical proof formula showing that Prepared Statements freeze the grammar tree first, so user parameters can only touch leaf values, proving zero percent (0.000%) SQL injection exploitability.",
    level: "expert",
    codeExample: `// Mathematical AST Invariance Proof:
// String Concatenation : Delta AST != Empty Set (Grammar Mutated ➔ SQLi Exploited!)
// Prepared Statement   : Delta AST == Empty Set (Grammar Tree Invariant ➔ P_sqli = 0.000% IMMUNE!)`
  }
];

export default questions;
