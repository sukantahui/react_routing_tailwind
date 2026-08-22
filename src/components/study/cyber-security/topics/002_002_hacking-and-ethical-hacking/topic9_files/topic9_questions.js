const questions = [
  {
    question: "What is the primary strategic role of Ethical Hackers within a modern enterprise organization?",
    shortAnswer: "To proactively identify, validate, and remediate security vulnerabilities across systems, software pipelines, and human processes before malicious threat actors can exploit them.",
    explanation: "Rather than waiting for a catastrophic breach, enterprise ethical hackers (Pentesters, Red Teamers, DevSecOps engineers) continuously stress-test defenses. They perform threat modeling, embed automated security quality gates in CI/CD pipelines, conduct red/purple team simulations, translate technical risk into financial terms (₹ INR) for the Board of Directors, and guide engineers to build resilient, zero-trust architectures.",
    hint: "Think about shifting from reactive cleanup after a disaster to proactive continuous defense.",
    level: "basic",
    codeExample: `// Enterprise Defense Evolution:
Legacy Model: Deploy software -> Hope firewalls hold -> React after ransomware breach.
Modern Model: Threat Model in Design -> Automated SAST/DAST in CI/CD -> Continuous Purple Teaming.`
  },
  {
    question: "How is 'Return on Security Investment' (ROSI) calculated in enterprise risk management?",
    shortAnswer: "ROSI = [ (ALE * Risk_Mitigation_Rate) - Security_Solution_Cost ] / Security_Solution_Cost * 100%",
    explanation: "To justify multi-lakh or multi-crore cybersecurity budgets to executive leadership, ethical hackers and CISOs use the ROSI formula: 1. Calculate Annualized Loss Expectancy (ALE = Single Loss Expectancy * Annual Rate of Occurrence); 2. Multiply ALE by the estimated percentage of risk mitigated by the tool; 3. Subtract the annual cost of the defensive solution; 4. Divide by the solution cost. A positive ROSI demonstrates tangible financial savings in ₹ INR.",
    hint: "Remember the formula: (Mitigated Loss - Security Cost) / Security Cost * 100%.",
    level: "moderate",
    codeExample: `// ROSI Calculation in Indian Rupees:
ALE (Potential Annual Breach Loss)  = ₹5,00,00,000 (₹5 Crores)
Mitigation Rate (EDR + DevSecOps)   = 90% (₹4,50,00,000 Loss Prevented)
Annual Defense Solution Cost       = ₹50,00,000 (₹50 Lakhs)
ROSI = (₹4,50,00,000 - ₹50,00,000) / ₹50,00,000 = 800% Net Return`
  },
  {
    question: "What are the core differences between SAST, DAST, IAST, and SCA in a modern DevSecOps CI/CD pipeline?",
    shortAnswer: "SAST inspects source code without running it; DAST tests running applications externally; IAST analyzes code execution internally from within the runtime; SCA scans third-party open-source dependencies for known CVEs.",
    explanation: "In an enterprise DevSecOps pipeline: 1. SAST (Static Application Security Testing - e.g., Semgrep, SonarQube) analyzes raw code for logic flaws and hardcoded secrets; 2. SCA (Software Composition Analysis - e.g., Snyk, Dependency-Check) scans `package.json` or `pom.xml` for vulnerable third-party libraries; 3. DAST (Dynamic Application Security Testing - e.g., OWASP ZAP) attacks running staging URLs; 4. IAST (Interactive Application Security Testing) monitors execution inside the JVM/Node runtime.",
    hint: "Recall SAST (static code), DAST (dynamic running app), IAST (interactive inside runtime), and SCA (third-party dependencies).",
    level: "moderate",
    codeExample: `// DevSecOps Toolchain Integration:
Code Commit (Git)   -> SAST (Semgrep) & SCA (Snyk Dependency Scan)
Build & Package     -> Container Image Scan (Trivy)
Staging Deployment  -> DAST (OWASP ZAP / Burp Enterprise)
Production Monitor  -> EDR (CrowdStrike) & SIEM (Splunk)`
  },
  {
    question: "What is 'Threat Modeling', and how does the STRIDE framework assist enterprise security architects during system design?",
    shortAnswer: "A structured process to identify system threats and design countermeasures; STRIDE categorizes threats into Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.",
    explanation: "Threat modeling occurs before software is written. Developed by Microsoft, STRIDE maps specific security properties to adversarial threats: 1. Spoofing violates Authentication; 2. Tampering violates Integrity; 3. Repudiation violates Non-repudiation; 4. Information Disclosure violates Confidentiality; 5. Denial of Service violates Availability; 6. Elevation of Privilege violates Authorization.",
    hint: "Remember the 6 STRIDE categories: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, and Elevation of Privilege.",
    level: "basic",
    codeExample: `// STRIDE Threat Mapping:
S - Spoofing Identity        --> Solution: FIDO2 MFA / mTLS Authentication
T - Tampering with Data      --> Solution: HMAC-SHA256 Signatures & Integrity Checks
R - Repudiation              --> Solution: Immutable Cryptographic Audit Logs
I - Information Disclosure   --> Solution: AES-256 Encryption at Rest & in Transit
D - Denial of Service        --> Solution: Rate-Limiting & Anycast DDoS Scrubbing
E - Elevation of Privilege   --> Solution: Role-Based Access Control (RBAC) & Least Privilege`
  },
  {
    question: "What is 'Continuous Threat Exposure Management' (CTEM) pioneered by Gartner, and how does it replace annual penetration tests?",
    shortAnswer: "A continuous 5-stage program (Scope, Discover, Prioritize, Validate, Mobilize) that continuously evaluates and remediates digital and physical attack surfaces year-round.",
    explanation: "Traditional penetration testing was an annual 'point-in-time' compliance exercise that became outdated the moment new code was deployed. Gartner's CTEM framework operates continuously: 1. Scoping critical assets; 2. Discovering exposed assets and shadow IT; 3. Prioritizing vulnerabilities based on real-world threat exploitation probability (EPSS); 4. Validating exploitability via automated red teaming; 5. Mobilizing cross-functional engineering teams to remediate flaws.",
    hint: "Think about shifting from a once-a-year security exam to continuous daily automated testing.",
    level: "expert",
    codeExample: `// Gartner CTEM 5-Stage Cycle:
1. SCOPE      -> Map business-critical core payment switches & cloud clusters.
2. DISCOVER   -> Continuous Attack Surface Management (ASM) of exposed subnets.
3. PRIORITIZE -> Rank CVEs using CVSS v3.1 + Exploit Prediction Scoring System (EPSS).
4. VALIDATE   -> Automated Breach and Attack Simulation (BAS) validation.
5. MOBILIZE   -> Automated Jira ticketing to engineering leads with code fixes.`
  },
  {
    question: "How does the NIST Cybersecurity Framework 2.0 (CSF 2.0) structure enterprise security governance across its six core functions?",
    shortAnswer: "Govern (GV), Identify (ID), Protect (PR), Detect (DE), Respond (RS), and Recover (RC).",
    explanation: "NIST CSF 2.0, updated in 2024, establishes a global standard for enterprise risk management: 1. GOVERN: Establishing cybersecurity governance, policies, and risk management strategy; 2. IDENTIFY: Cataloging assets, suppliers, and vulnerabilities; 3. PROTECT: Enforcing identity management, data security, and awareness; 4. DETECT: Continuous monitoring of anomalies and adverse events; 5. RESPOND: Executing incident response and containment; 6. RECOVER: Restoring operational resilience.",
    hint: "Recall the 6 NIST CSF 2.0 pillars: Govern, Identify, Protect, Detect, Respond, Recover.",
    level: "moderate",
    codeExample: `// NIST CSF 2.0 Core Functions:
[ GOVERN ]   -> C-level governance, DPDP Act compliance, risk strategy
[ IDENTIFY ] -> Asset inventory, threat intelligence, vulnerability scanning
[ PROTECT ]  -> Zero Trust, FIDO2 passkeys, data encryption, network segmentation
[ DETECT ]   -> 24/7 SOC, SIEM correlation, EDR behavioral alerts
[ RESPOND ]  -> SANS incident response, host isolation, 6-hour CERT-In notification
[ RECOVER ]  -> Restoring clean WORM backups, post-mortem lessons learned`
  },
  {
    question: "What is an 'Industrial Demilitarized Zone' (IDMZ) in the ISA/IEC 62443 / Purdue Enterprise Reference Architecture?",
    shortAnswer: "A secure buffer network separating the corporate IT enterprise network (Level 4/5) from the industrial OT manufacturing/SCADA network (Levels 0-3) to prevent lateral cyber breach traversal.",
    explanation: "Under the Purdue Model, mixing enterprise office IT networks directly with industrial factory or power grid control systems is a catastrophic vulnerability. An Industrial DMZ (IDMZ at Level 3.5) enforces complete protocol breaks: no direct IP routing exists between corporate IT and the SCADA network. All communication terminates at proxy servers, jump hosts, and unidirectional optical data diodes.",
    hint: "Think about the heavily guarded checkpoint separating corporate office computers from dangerous factory machinery.",
    level: "expert",
    codeExample: `// Purdue Model with IDMZ (Level 3.5):
[ Level 4/5: Corporate IT ] -> Email, ERP, Internet (High Attack Exposure)
          ↓ (Strict Firewall - No Direct Routing)
[ Level 3.5: Industrial DMZ ] -> Jump Hosts, Historian Mirror, Patch Proxy
          ↓ (Unidirectional Optical Data Diode)
[ Level 0-3: Industrial SCADA / OT ] -> PLCs, RTUs, Turbines, 220kV Switchgears`
  },
  {
    question: "What is 'Software Bill of Materials' (SBOM), and why is it essential for enterprise supply chain security post-Log4j?",
    shortAnswer: "A complete machine-readable inventory of all open-source libraries, modules, and sub-dependencies packaged inside a software build.",
    explanation: "When critical zero-days like Apache Log4j (CVE-2021-44228) were discovered, enterprises spent weeks searching through thousands of microservices trying to find which applications used the vulnerable library. A Software Bill of Materials (SBOM in CycloneDX or SPDX format) acts like an ingredient list on food packaging, enabling security teams to query their entire software catalog in seconds to identify vulnerable dependencies.",
    hint: "Think of an exact ingredient list showing every open-source library packed inside your software.",
    level: "moderate",
    codeExample: `// CycloneDX SBOM Dependency Extract (JSON):
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "components": [
    {
      "name": "log4j-core",
      "version": "2.14.1",
      "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
      "cves": ["CVE-2021-44228 - CRITICAL RCE"]
    }
  ]
}`
  },
  {
    question: "Under the Reserve Bank of India (RBI) Cyber Security Framework for Banks, what are the mandatory requirements for ethical hacking and vulnerability audits?",
    shortAnswer: "Mandatory annual comprehensive penetration testing by CERT-In empanelled auditors, continuous vulnerability assessments, and board-approved Cyber Crisis Management Plans (CCMP).",
    explanation: "The RBI Master Direction on Cyber Security Framework mandates that all commercial banks, payment gateways, and cooperative banks must: 1. Undergo annual comprehensive vulnerability assessment and penetration testing (VAPT) conducted by CERT-In empanelled auditing firms; 2. Maintain a 24/7 Security Operations Center (SOC); 3. Enforce multi-factor authentication on all administrative channels; 4. Maintain an active Cyber Crisis Management Plan (CCMP) approved by the Board of Directors.",
    hint: "Remember the mandatory annual VAPT audits by CERT-In auditors required by the Reserve Bank of India.",
    level: "basic",
    codeExample: `// RBI Banking Cyber Compliance Checklist:
[X] Annual VAPT by CERT-In Empanelled Auditor
[X] 24/7 SOC with Real-time Threat Correlation
[X] Mandatory Field-Level Encryption on Core UPI Payment Queues
[X] Bi-annual Cyber Disaster Recovery (DR) Drill`
  },
  {
    question: "What is 'Zero Trust Architecture' (NIST SP 800-207), and what are its three fundamental operational tenets?",
    shortAnswer: "1. Verify explicitly, 2. Use least privilege access, 3. Assume breach.",
    explanation: "Zero Trust completely replaces the legacy 'castle-and-moat' perimeter model. Its three core tenets are: 1. Verify Explicitly: Always authenticate and authorize based on all available data points (user identity, device health, location, data classification) on every request; 2. Least Privilege: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA); 3. Assume Breach: Minimize blast radius by micro-segmenting networks and encrypting all internal communications.",
    hint: "Recall the 3 Zero Trust rules: Verify explicitly, Least privilege, Assume breach.",
    level: "basic",
    codeExample: `// Zero Trust Policy Engine Decision:
function evaluateAccessRequest(user, device, resource) {
    if (user.mfa_verified && device.is_compliant && user.role_has_permission(resource)) {
        issue_short_lived_jwt(duration="15m");
    } else {
        deny_and_log_anomaly();
    }
}`
  },
  {
    question: "What is a 'Security Champions Program', and how does an enterprise ethical hacking team scale security across hundreds of software developers?",
    shortAnswer: "Embedding interested software developers within product squads to act as localized security advocates, receiving specialized training from the central security team.",
    explanation: "In large enterprises, a security team of 5 ethical hackers cannot manually review the code of 500 developers. A Security Champions program trains select engineers within each development squad in secure coding, threat modeling, and OWASP Top 10 vulnerabilities. These champions review PRs, run automated SAST tools, and catch vulnerabilities early in the sprint before code reaches production.",
    hint: "Think about training designated developers inside each engineering team to be the local security expert.",
    level: "moderate",
    codeExample: `// Security Champions Scaling Model:
Central Security Team (5 Ethical Hackers)
          ↓ (Trains & Mentors)
30 Security Champions (Developers embedded in Frontend, Backend & Mobile squads)
          ↓ (Reviews code & runs SAST daily)
500 Software Developers Building Secure Microservices`
  },
  {
    question: "How do Ethical Hackers assist executive leadership in managing 'Third-Party Vendor Supply Chain Risk' (TPRM)?",
    shortAnswer: "By conducting standardized security questionnaires, reviewing SOC 2 / ISO 27001 reports, and executing external attack surface scans on third-party SaaS and software vendors.",
    explanation: "Enterprises rely on hundreds of third-party vendors (cloud hosting, HR payroll SaaS, marketing analytics). Ethical hackers perform Third-Party Risk Management (TPRM): reviewing vendor SOC 2 Type II audit reports, scanning vendor external IP ranges for unpatched CVEs, and mandating contractual security standards (e.g. 24-hour breach notification, right to audit) to prevent SolarWinds-style supply chain compromises.",
    hint: "Think about auditing the security of external companies whose software your company buys.",
    level: "moderate",
    codeExample: `// TPRM Vendor Security Scorecard:
Vendor: Cloud Analytics Partner SaaS
Audit Criteria:
- SOC 2 Type II Report: Verified (Clean Opinion)
- External Attack Surface: Zero Critical CVEs Exposed
- Contractual SLA: Mandatory 6-Hour Incident Notification (DPDP Act Compliance)`
  },
  {
    question: "What is 'DREAD' Risk Rating, and how does it help ethical hackers calculate mathematical severity scores for discovered vulnerabilities?",
    shortAnswer: "A risk assessment model scoring: Damage potential, Reproducibility, Exploitability, Affected users, and Discoverability on a 1-10 scale.",
    explanation: "DREAD provides a quantitative formula to prioritize vulnerabilities: `Risk_Score = (Damage + Reproducibility + Exploitability + Affected_Users + Discoverability) / 5`. If an SQL injection has Damage=10, Reproducibility=10, Exploitability=8, Affected=10, and Discoverability=7, the overall DREAD score is 9.0 (Critical Priority), justifying immediate emergency developer patching.",
    hint: "Remember DREAD: Damage, Reproducibility, Exploitability, Affected users, Discoverability.",
    level: "expert",
    codeExample: `// DREAD Score Calculation:
Damage Potential:       10 (Full Database Compromise)
Reproducibility:        10 (100% Reliable via HTTP GET)
Exploitability:         08 (Basic SQL syntax knowledge)
Affected Users:         10 (All 500,000 Customers)
Discoverability:        07 (Visible in URL parameter)
DREAD Score = (10 + 10 + 8 + 10 + 7) / 5 = 9.0 / 10.0 (CRITICAL)`
  },
  {
    question: "What is 'Immutable WORM Storage' (Write Once, Read Many), and why is it a mandatory enterprise defense against human-operated ransomware cartels?",
    shortAnswer: "Storage technology (like AWS S3 Object Lock) that physically prevents files from being modified, overwritten, or deleted by anyone—including compromised Domain Admins—for a defined retention period.",
    explanation: "Modern ransomware affiliates prioritize deleting local shadow copies (`vssadmin delete shadows`) and compromising backup console accounts before encrypting production servers. Immutable WORM storage enforces strict retention locks: even if the attacker gains root administrative credentials, the S3 Object Lock API rejects all delete/overwrite commands until the retention clock expires (e.g. 30 days), guaranteeing clean recovery snapshots.",
    hint: "Think about backup storage that physically cannot be deleted or modified by anyone until a month passes.",
    level: "moderate",
    codeExample: `// AWS S3 Object Lock (Immutable WORM Backup Configuration):
aws s3api put-object-retention \\
    --bucket enterprise-core-backups \\
    --key backup_2026_08_23.tar.gz \\
    --retention Mode=COMPLIANCE,RetainUntilDate=2026-09-23T00:00:00Z
// Result: Even Root Admin cannot delete this backup for 30 days!`
  },
  {
    question: "What role do Ethical Hackers play in creating and testing an enterprise 'Cyber Crisis Management Plan' (CCMP)?",
    shortAnswer: "Designing and facilitating realistic Tabletop Exercises (TTX) and live technical simulation drills to test executive communication, legal escalation, and technical containment during a crisis.",
    explanation: "A Cyber Crisis Management Plan is useless if it has never been tested under stress. Ethical hackers run Tabletop Exercises (TTX) involving the CEO, CISO, Legal Counsel, PR team, and lead engineers. They inject realistic scenarios: e.g., 'LockBit has encrypted our UPI payment switch, exfiltrated 100,000 customer records, and posted a 48-hour ransom timer.' The drill tests whether legal meets the 6-hour CERT-In deadline, whether PR communicates effectively, and whether backups restore reliably.",
    hint: "Think of conducting a full disaster fire drill for the entire executive leadership team.",
    level: "basic",
    codeExample: `// Tabletop Exercise (TTX) Simulation Script:
09:00 AM: SOC alerts: Ransomware detected on 15 core servers.
09:15 AM: Legal confirms: DPDP Act 2023 breach implications active.
10:00 AM: Executive decision: Refuse ransom payment; activate immutable S3 WORM recovery.
11:30 AM: CERT-In 6-hour incident report submitted by CISO.`
  },
  {
    question: "What is 'Micro-segmentation', and how does it stop lateral movement in modern cloud and virtualized data centers?",
    shortAnswer: "Isolating workloads down to individual virtual machines or containers with fine-grained Layer 7 firewall policies, preventing compromised nodes from talking to adjacent peers.",
    explanation: "In traditional flat networks, once an attacker compromises a web server, they can pivot across the entire subnet to reach databases. Micro-segmentation (using tools like VMware NSX, Illumio, or Kubernetes NetworkPolicies) enforces strict zero-trust rules at the virtual NIC level: the web container can ONLY communicate with the database container on TCP port 5432, completely blocking all lateral SSH, RDP, or SMB scans to neighboring servers.",
    hint: "Think of watertight bulkheads in a submarine that prevent water in one flooded compartment from sinking the entire ship.",
    level: "expert",
    codeExample: `// Kubernetes NetworkPolicy Micro-segmentation Example:
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-access-only
spec:
  podSelector:
    matchLabels:
      role: database
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend-api
    ports:
    - protocol: TCP
      port: 5432`
  },
  {
    question: "How do Ethical Hackers translate technical vulnerabilities into 'Executive Business Risk' for presentation to the Board of Directors?",
    shortAnswer: "By framing vulnerabilities not as technical bugs, but in terms of financial loss in ₹ INR, operational downtime hours, regulatory non-compliance penalties, and customer churn.",
    explanation: "Board members and C-level executives do not understand technical jargon like 'buffer overflow in libc' or 'unvalidated deserialization'. The ethical hacker translates this into business risk: 'This vulnerability allows external attackers to exfiltrate our customer database, exposing us to statutory DPDP Act fines up to ₹250 Crores, 48 hours of revenue downtime (₹4.5 Crores loss), and irreversible brand reputation damage.'",
    hint: "Think about explaining a software flaw in terms of money, fines in ₹ INR, and lost customers rather than programming code.",
    level: "basic",
    codeExample: `// Technical Translation to Executive Board Deck:
Technical finding: "Unauthenticated IDOR in /api/v1/invoices"
Executive translation: "Critical financial data exposure -> 45,000 corporate invoices readable -> Risks ₹250 Cr statutory DPDP fine -> Recommendation: Allocate ₹8 Lakhs for DevSecOps patch."`
  },
  {
    question: "What is 'Deception Technology' (Honeypots / Deception Grids), and how does it provide early warning indicators to enterprise Blue Teams?",
    shortAnswer: "Deploying decoy servers, fake databases, and honeytokens across the network with zero legitimate business use, so any interaction triggers an instant high-priority breach alert.",
    explanation: "Because legitimate employees and authorized applications never interact with deception assets, any network probe, port scan, or login attempt against a honeypot (e.g. an unadvertised server running a fake SSH service named `backup-server-02`) is a 100% true-positive indicator of an intruder conducting internal reconnaissance, allowing defenders to trap and isolate the attacker immediately.",
    hint: "Think of placing fake decoy servers across your office that scream and call security the instant someone touches them.",
    level: "moderate",
    codeExample: `// Deception Grid Trap Architecture:
Production Network: 192.168.1.10 (Live Web Server) | 192.168.1.20 (Live Database)
Decoy Trap:         192.168.1.99 (Fake High-Value Active Directory Domain Controller)
Rule: If TCP_SYN to 192.168.1.99 -> Trigger IMMEDIATE HOST ISOLATION on the initiating IP!`
  },
  {
    question: "What is 'Attack Surface Management' (ASM), and how does it help ethical hackers eliminate 'Shadow IT' in large enterprises?",
    shortAnswer: "Continuous discovery, analysis, and monitoring of all internet-facing digital assets (subdomains, cloud IP ranges, exposed API gateways, certificates) belonging to an organization.",
    explanation: "In large corporations, marketing teams or regional offices frequently launch unmonitored cloud servers or test subdomains without notifying the central security team ('Shadow IT'). Attack Surface Management (ASM) tools continuously scan DNS records, certificate transparency logs (crt.sh), and public IP CIDR ranges, creating an up-to-the-minute asset inventory and alerting security engineers when unpatched test portals are exposed to the public internet.",
    hint: "Think about an automated satellite constantly scanning the internet to find every single website and server your company owns.",
    level: "moderate",
    codeExample: `// Automated ASM Recon Pipeline:
Target Org: West Bengal FinTech Enterprise
1. Subdomain Enumeration: Discovers 340 active subdomains via crt.sh & Amass
2. Shadow IT Discovery: Flags unpatched test server: "https://dev-staging-payment.corp.in"
3. Port Scan: Identifies exposed unauthenticated Redis database on port 6379 -> Alerts SOC`
  },
  {
    question: "Synthesizing the role of Ethical Hackers in Enterprise Defense: what is the ultimate measure of success for a corporate cybersecurity program?",
    shortAnswer: "Not the absence of attacks, but the resilience of the organization—the ability to withstand adversarial attempts, minimize blast radius, maintain business operations, and rapidly recover without catastrophic data or financial loss.",
    explanation: "In a hyper-connected digital world, preventing 100% of attack attempts is impossible. True enterprise security excellence is measured by resilience: adopting Zero Trust, verifying code in DevSecOps pipelines, training security champions, maintaining immutable backups, and empowering ethical hackers to continuously find flaws before adversaries do. When an intrusion inevitably occurs, a resilient organization detects it in minutes, isolates it cleanly, and continues delivering seamless services to society.",
    hint: "Conclude by recognizing that organizational resilience and defense-in-depth are the ultimate goals of enterprise cybersecurity.",
    level: "expert",
    codeExample: `// The Resilient Enterprise Equation:
Cyber_Resilience = (Continuous_Exposure_Management * Zero_Trust_Architecture * Immutable_Recovery) / Total_Blast_Radius;`
  }
];

export default questions;
