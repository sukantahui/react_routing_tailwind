const questions = [
  {
    question: "How has NIST SP 800-63B modernized enterprise Password Policies compared to legacy 8-character complex rotation rules?",
    shortAnswer: "NIST SP 800-63B recommends long passphrases (>= 16 characters), bans mandatory periodic expiration without breach evidence, prohibits arbitrary complexity rules, mandates compromised password screening, and enforces Multi-Factor Authentication (MFA).",
    explanation: "Legacy policies requiring 8-character passwords rotated every 90 days with special symbols failed because users created predictable variations (e.g. `Spring2026!`, `Summer2026!`). Modern guidelines prioritize length (passphrases like `horse-correct-battery-staple`), eliminate forced rotation that induces weak passwords, check new passwords against known breached password lists (HaveIBeenPwned), and require hardware-based MFA (FIDO2).",
    hint: "Think: Length beats complexity, and never force password changes unless a breach is detected.",
    level: "basic",
    codeExample: `// NIST SP 800-63B vs Legacy Password Policy:
Legacy Rule: 8 Characters + Uppercase + Symbol + 90-Day Forced Expiry ➔ User picks: "P@ssw0rd1!"
Modern Rule: >= 16 Character Passphrase + FIDO2 Hardware MFA + Breached Password Check ➔ "kolkata-metro-blue-line-safe!"`
  },
  {
    question: "What is the Principle of Least Privilege (PoLP) under ISO/IEC 27001 Control A.5.15, and how is it enforced via Role-Based Access Control (RBAC)?",
    shortAnswer: "PoLP mandates that users and processes are granted only the minimum permissions necessary to perform their specific job functions; RBAC groups granular permissions into defined corporate roles, preventing 'privilege creep'.",
    explanation: "Under Control A.5.15, broad administrative permissions must never be granted by default. In an RBAC model, users are assigned specific roles (e.g. `Billing_Analyst`, `DevOps_ReadOnly`); when an employee changes departments, their old role is revoked and the new role assigned, eliminating lingering excess privileges across cloud consoles and databases.",
    hint: "Give workers only the exact keys they need to do their daily job and no more.",
    level: "basic",
    codeExample: `// Role-Based Access Control (RBAC) AWS IAM Policy:
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],  // Read-only least privilege!
    "Resource": "arn:aws:s3:::kolkata-fintech-billing-archive/*"
  }]
}`
  },
  {
    question: "What is Attribute-Based Access Control (ABAC), and how does it provide dynamic zero-trust protection beyond traditional RBAC?",
    shortAnswer: "ABAC evaluates real-time attributes of the subject (role, department), resource (data classification), action (read, write), and environment (IP address, time, device health) to make fine-grained, dynamic access decisions.",
    explanation: "While RBAC only checks static job titles, ABAC enables conditional Zero Trust policies. For example, a doctor might have the role `Oncologist`, but ABAC permits access to patient medical records *only if* the request originates from a hospital-managed laptop connected to the internal clinical network during on-duty hours, blocking external access from unvetted personal devices.",
    hint: "Think of checking not just who you are, but where you are, what device you're using, and what time it is.",
    level: "moderate",
    codeExample: `// ABAC Dynamic Access Rule (XACML / OPA Rego):
allow {
    input.user.role == "Doctor"
    input.device.is_compliant == true
    input.network.ip_subnet == "10.240.0.0/16"  // Hospital Internal Network
    input.environment.time_hour >= 8
    input.environment.time_hour <= 20
}`
  },
  {
    question: "What is the 'Joiner-Mover-Leaver' (JML) access control lifecycle (Control A.5.18), and why is an automated de-provisioning SLA critical?",
    shortAnswer: "JML manages the employee identity lifecycle from hiring (Joiner) to role transfers (Mover) and termination (Leaver); automated de-provisioning (< 15 mins) prevents orphaned accounts and disgruntled insider data theft.",
    explanation: "Departed employees with active accounts ('Orphaned Accounts') are a primary vector for ransomware and data exfiltration. An automated JML pipeline integrates HRMS resignation triggers with Active Directory/Okta to instantly revoke all cloud tokens, VPN certificates, and single sign-on sessions the moment an employee's resignation is processed.",
    hint: "Remember: Joiner provisions least privilege, Mover removes old roles, Leaver revokes all access in minutes.",
    level: "basic",
    codeExample: `// JML Offboarding Pipeline (SOP-IAM-04):
1. HRMS Trigger:   HR marks employee "Terminated" in Workday / BambooHR
2. Webhook Event:  Automated API call sent to Identity Provider (Okta / Azure AD)
3. Immediate SLA:  100% of Active Sessions, SSO tokens, and VPN certs revoked in < 300 seconds!`
  },
  {
    question: "What is the 'Storage Limitation' principle under Section 8(7) of the Indian Digital Personal Data Protection (DPDP) Act 2023, and how does it dictate Data Retention Policies?",
    shortAnswer: "Section 8(7) mandates that Data Fiduciaries must erase digital personal data as soon as the specified processing purpose is fulfilled or consent is withdrawn; retaining data beyond this purpose violates statutory duties, risking ₹250 Crore fines.",
    explanation: "Under the DPDP Act 2023, personal data cannot be hoarded indefinitely. An enterprise Data Retention Policy defines exact statutory retention schedules (e.g. keeping transaction logs for 5 years under PMLA, but erasing customer browsing telemetry after 30 days). Once the retention duration expires, data must be permanently erased or anonymized.",
    hint: "Keep data only as long as strictly necessary, then delete it permanently.",
    level: "moderate",
    codeExample: `// DPDP Statutory Retention Schedule:
Asset Category:      Customer KYC Documentation (PMLA Requirement) ➔ Retain 5 Years
Asset Category:      Marketing Campaign Leads (Consent Withdrawn)   ➔ Erase within 72 Hours
Penalty for Hoarding:Up to ₹250 Crores under DPDP Act 2023 Section 33!`
  },
  {
    question: "What is 'Cryptographic Erasure' (Crypto-Shredding) under ISO 27001 Control A.8.10 and NIST SP 800-88 Rev 1, and why is it effective in cloud environments?",
    shortAnswer: "Crypto-shredding destroys the unique cryptographic decryption keys used to encrypt data stored in multi-tenant cloud storage, instantly rendering the underlying ciphertext mathematically impossible to decrypt or recover.",
    explanation: "In public cloud environments (AWS S3, Azure Blob), customers cannot physically shred or degauss hard drives in third-party data centers. Under NIST SP 800-88 Purge guidelines, by deleting the KMS Customer Managed Key (CMK) associated with an encrypted S3 bucket, all petabytes of stored data are instantaneously sanitized and rendered permanently unreadable at zero cost.",
    hint: "Throwing away the only key to a titanium vault makes the contents forever inaccessible.",
    level: "moderate",
    codeExample: `// AWS KMS Crypto-Shredding Execution:
Command: aws kms schedule-key-deletion --key-id "arn:aws:kms:ap-south-1:123456789:key/pacs-2021" --pending-window-in-days 7
Result:  Key deleted -> 80,000 encrypted medical images permanently shredded across AWS multi-AZ storage!`
  },
  {
    question: "What are the three sanitization levels defined in NIST SP 800-88 Rev 1 for media disposal?",
    shortAnswer: "1. Clear (Logical sanitization: Overwriting data with random bits); 2. Purge (Physical/Cryptographic sanitization: Crypto-shredding or degaussing); 3. Destroy (Physical destruction: Disintegrating, incinerating, or shredding drives).",
    explanation: "NIST SP 800-88 Rev 1 provides the global media sanitization standard: 1. Clear: Software overwrite tools (e.g. writing zeros across magnetic sectors) to protect against basic keyboard recovery; 2. Purge: Advanced methods (e.g. secure ATA Erase commands, degaussing magnetic tapes, or crypto-shredding) preventing laboratory forensic recovery; 3. Destroy: Physical cross-cut industrial shredding reducing solid-state chips to < 2mm particles.",
    hint: "Remember the 3 levels: Clear (overwrite), Purge (crypto/degauss), Destroy (physical shredding).",
    level: "moderate",
    codeExample: `// Media Sanitization Decision Matrix:
Level 1: CLEAR   ➔ Low-sensitivity test laptops (Overwritten with zeros before internal re-assignment)
Level 2: PURGE   ➔ Cloud database backups (Crypto-shredded by deleting KMS master encryption key)
Level 3: DESTROY ➔ Decommissioned banking SAN disks (Physically crushed in industrial shredder)`
  },
  {
    question: "What is a 'Quarterly Privileged Access Review' (ISO 27001 Control A.8.2), and why is it mandatory for enterprise compliance?",
    shortAnswer: "A quarterly access certification campaign requiring department heads to formally review, verify, or revoke all elevated credentials, identifying and terminating unauthorized access and privilege creep.",
    explanation: "Over time, developers accumulate temporary root access for troubleshooting projects that are never revoked ('Privilege Creep'). Control A.8.2 mandates that every 90 days, managers receive an automated report listing all privileged accounts in their department; un-certified accounts are automatically suspended after 14 days, maintaining strict least-privilege baselines.",
    hint: "Every 90 days, managers must audit and re-approve every single administrative key.",
    level: "basic",
    codeExample: `// Automated Access Certification Campaign:
Campaign Cycle:  Every 90 Days triggered via SailPoint / Okta Identity Governance
Manager Action:  Manager reviews 35 developer IAM roles -> Revokes 4 temporary admin permissions
Audit Artifact:  Signed PDF Access Certification Manifest archived for ISO 27001 auditors`
  },
  {
    question: "What mandatory Log Retention schedule is enforced in India under CERT-In Directions 2022 and Section 70B of the IT Act?",
    shortAnswer: "All service providers, intermediaries, data centers, and corporate entities must mandatorily maintain rolling system, firewall, and access logs securely within the Indian jurisdiction for a minimum of 180 days.",
    explanation: "To enable cyber forensic investigations and track adversary lateral movement, CERT-In issued binding directives under Section 70B of the IT Act 2000 requiring organizations to retain all ICT logs (firewall traffic, DNS queries, authentication logs, proxy requests) for at least 180 days. Logs must also be synchronized with Indian Standard Time (IST) via National Physical Laboratory (NPL) NTP servers.",
    hint: "Remember the 180-day log retention mandate and IST clock synchronization.",
    level: "basic",
    codeExample: `// CERT-In 180-Day Log Retention Policy:
Retention Period: 180 Days rolling window in immutable AWS S3 Glacier vault
NTP Source:       time.nplindia.org (Synchronized within +/- 1 second of Indian Standard Time)
Penalty:          Non-compliance punishable under Section 70B(7) with 1 Year Imprisonment!`
  },
  {
    question: "How does Hardware-Based Multi-Factor Authentication (FIDO2 / WebAuthn) eliminate the vulnerabilities of SMS and Email OTPs?",
    shortAnswer: "FIDO2 uses public-key cryptography and origin-bound domain verification (WebAuthn); because the hardware security key verifies the browser domain cryptographic handshake, phishing sites cannot proxy or steal the authentication token.",
    explanation: "Adversaries frequently bypass SMS/Email OTPs using SIM swapping, SS7 interception, or reverse-proxy phishing kits (e.g. Evilginx). FIDO2 hardware keys (YubiKeys) sign a cryptographic challenge directly bound to the legitimate website domain (e.g. `login.kolkatafintech.in`). If a user visits a fake phishing clone, the hardware key detects the domain mismatch and refuses to sign the authentication challenge.",
    hint: "FIDO2 security keys cannot be phished because they verify the real website domain cryptographically.",
    level: "moderate",
    codeExample: `// FIDO2 WebAuthn Origin Binding:
Legitimate URL: https://login.kolkatafintech.in ➔ FIDO2 Key signs challenge -> ACCESS GRANTED!
Phishing Clone: https://login.kolkata-fintech-fake.com ➔ FIDO2 Key detects domain mismatch -> ACCESS BLOCKED!`
  },
  {
    question: "What is 'Compromised Password Screening' under NIST SP 800-63B, and how is it implemented in modern Active Directory environments?",
    shortAnswer: "An automated filter that checks newly submitted passwords against billions of known breached credentials (e.g. HaveIBeenPwned database) during password creation or reset, rejecting any match before it is stored.",
    explanation: "Users frequently choose common breached passwords (e.g. `Password123!`, `Admin2026!`). Modern identity systems (such as Azure AD Password Protection or custom AD password filters) hash newly entered passwords and query a local or API database of known leaked passwords; if a match is found, the system forces the user to pick a unique, uncompromised passphrase.",
    hint: "Block passwords that hackers already have listed in their dictionary databases.",
    level: "moderate",
    codeExample: `// Azure AD Password Protection & Breached Password Filter:
User Input:     "Welcome2026!"
Filter Check:   Found in global breached password database (12,400+ hits)
System Action:  REJECTED! "This password has been exposed in a known third-party data breach. Choose a unique passphrase."`
  },
  {
    question: "Why does the Indian Prevention of Money Laundering Act (PMLA) 2002 require a 5-year Data Retention Policy for financial entities?",
    shortAnswer: "Section 12 of PMLA mandates that banking institutions and FinTechs must preserve customer KYC records and transaction ledgers for 5 years after account closure to support anti-money laundering investigations and forensic tracking.",
    explanation: "In financial cybersecurity, Data Retention Policies must balance privacy erasure rules against statutory investigative mandates. While DPDP Act requires deleting expired marketing data, PMLA Section 12 strictly overrides privacy erasure for core transaction ledgers, requiring banks to archive customer KYC and wire transfers in tamper-evident storage for at least 5 years after relationship termination.",
    hint: "Financial records must be kept for 5 years to catch financial criminals and money launderers.",
    level: "basic",
    codeExample: `// PMLA vs DPDP Statutory Balance:
PMLA Mandate:  Retain Core Banking Ledgers & KYC Identity Documents for 5 Years post-account closure
DPDP Mandate:  Erase ephemeral browsing logs, marketing telemetry, and cookies immediately upon consent withdrawal`
  },
  {
    question: "Synthesizing Password, Access Control, and Data Retention Policies: what is the master equation of Identity and Data Governance?",
    shortAnswer: "$$\\text{Identity \\& Data Resilience} = \\frac{\\text{FIDO2 MFA Rigor} \\times \\text{Least Privilege RBAC/ABAC} \\times \\text{Crypto-Shredding Velocity}}{\\text{Orphaned Accounts} + \\text{Hoarded Stale Data}}$$ with continuous quarterly access certification.",
    explanation: "This master governance relationship proves that identity and data security is the product of phishing-resistant authentication, strict least-privilege authorization, and rapid cryptographic erasure of expired records. Eliminating orphaned accounts and unnecessary data hoarding guarantees 100% audit compliance and total statutory safe harbor under the DPDP Act 2023 and PMLA.",
    hint: "Conclude by reviewing how strong authentication, least privilege access, and timely data deletion protect the enterprise.",
    level: "expert",
    codeExample: `// Master Equation of Identity & Data Governance:
Resilience = (FIDO2_MFA * Least_Privilege_RBAC * Crypto_Shredding_Speed) / (Orphaned_Accounts + Stale_Data_Hoarding);
Outcome: Zero Account Takeovers, Zero Privilege Creep & Total Regulatory Safe Harbor!`
  }
];

export default questions;
