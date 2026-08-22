// 30 Practice Questions & Case Study Dilemmas for Topic 11: Information Security Audit Case Study in Banking and FinTech
const questions = [
  {
    id: 1,
    question: "Under the RBI Master Directions on Cyber Security Framework for Banks, what is the mandatory reporting window for reporting major cyber security incidents to CERT-In and RBI CSITE?",
    options: [
      "Within 6 hours of detection",
      "Within 24 hours of confirmation",
      "Within 72 hours under GDPR equivalence",
      "At the end of the quarterly board audit cycle"
    ],
    correctAnswer: "Within 6 hours of detection",
    explanation: "RBI Cyber Security Framework and CERT-In directions mandate that all scheduled commercial banks and regulated financial entities report cyber security incidents within 6 hours of noticing them."
  },
  {
    id: 2,
    question: "In a Core Banking Solution (CBS) audit, which finding represents a critical Segregation of Duties (SoD) Major Non-Conformity?",
    options: [
      "Database Administrators (DBAs) possess production privileges allowing them to directly modify loan approval account balance tables without maker-checker audit trails",
      "Developers can deploy code only through an automated CI/CD pipeline requiring peer review",
      "Branch tellers cannot process transactions exceeding ₹50,000 without branch manager authorization",
      "Security Analysts have read-only access to SIEM log repositories"
    ],
    correctAnswer: "Database Administrators (DBAs) possess production privileges allowing them to directly modify loan approval account balance tables without maker-checker audit trails",
    explanation: "Direct database write access by DBAs to financial account balances bypasses the core maker-checker control mechanism, representing a severe SoD Major Non-Conformity and fraud risk."
  },
  {
    id: 3,
    question: "During a PCI-DSS v4.0 audit of a Kolkata FinTech payment gateway, what is the primary requirement regarding the storage of Sensitive Authentication Data (SAD) after card transaction authorization?",
    options: [
      "SAD (including CVV/CVC and Full Magnetic Stripe Data) must NEVER be stored post-authorization, even if encrypted",
      "SAD can be stored indefinitely if encrypted with AES-256 GCM",
      "SAD can be retained for up to 90 days for dispute chargeback resolution",
      "SAD may be stored in raw plaintext if located inside a secure corporate intranet"
    ],
    correctAnswer: "SAD (including CVV/CVC and Full Magnetic Stripe Data) must NEVER be stored post-authorization, even if encrypted",
    explanation: "PCI-DSS Requirement 3.2 strictly prohibits the post-authorization storage of Sensitive Authentication Data (Card Verification Value/Code, full track data, or PIN blocks), regardless of encryption."
  },
  {
    id: 4,
    question: "In an NPCI UPI switch audit, what cryptographic hardware component is strictly required for encrypting customer MPINs and generating transaction MAC signatures?",
    options: [
      "Payment Hardware Security Module (Payment HSM) certified to FIPS 140-2/3 Level 3 or PCI HSM",
      "Software-based OpenSSL key store running in a Docker container",
      "Standard cloud virtual machine TPM 2.0 emulator",
      "Client-side encrypted local storage within the mobile app"
    ],
    correctAnswer: "Payment Hardware Security Module (Payment HSM) certified to FIPS 140-2/3 Level 3 or PCI HSM",
    explanation: "NPCI UPI guidelines and RBI mandates require dedicated Payment HSMs meeting FIPS 140-2/3 Level 3 or PCI HSM standards for all MPIN translation, key management, and cryptographic signing."
  },
  {
    id: 5,
    question: "During a mobile banking application audit in Salt Lake Sector V, the assessor discovers the app runs on rooted Android devices without detecting superuser binaries. What risk does this present?",
    options: [
      "Memory hooking and runtime instrumentation (e.g. Frida/Xposed) can bypass biometric authentication and capture MPIN in plaintext",
      "The mobile device will consume 50% more battery during UPI transfers",
      "The application will automatically fail DNS resolution queries",
      "The bank server will reject TLS 1.3 handshakes automatically"
    ],
    correctAnswer: "Memory hooking and runtime instrumentation (e.g. Frida/Xposed) can bypass biometric authentication and capture MPIN in plaintext",
    explanation: "On rooted or jailbroken devices, attackers can use dynamic instrumentation frameworks like Frida to hook native methods, bypass client-side authentication checks, and intercept confidential credentials."
  },
  {
    id: 6,
    question: "Which control is essential to prevent man-in-the-middle (MitM) attacks during API communication between a mobile banking app and the bank's API gateway?",
    options: [
      "SSL/TLS Certificate and Public Key Pinning combined with mutual TLS (mTLS)",
      "Base64 encoding of JSON request bodies",
      "Restricting API calls to standard HTTP GET verbs only",
      "Storing API keys inside client-side JavaScript constants"
    ],
    correctAnswer: "SSL/TLS Certificate and Public Key Pinning combined with mutual TLS (mTLS)",
    explanation: "SSL/TLS Certificate/Public Key Pinning ensures that the mobile application only trusts the bank's specific public key, preventing proxy tools and rogue CA certificates from decrypting traffic."
  },
  {
    id: 7,
    question: "What is the primary audit objective when reviewing an ATM Switch network under RBI Baseline Cyber Security Controls?",
    options: [
      "Ensuring network micro-segmentation, Terminal Master Key (TMK) encryption, and strict whitelisting on ATM operating systems",
      "Verifying that ATM displays use high-definition OLED screens",
      "Ensuring ATMs allow unrestricted remote desktop access over public internet",
      "Confirming that ATM receipt printers use thermal paper"
    ],
    correctAnswer: "Ensuring network micro-segmentation, Terminal Master Key (TMK) encryption, and strict whitelisting on ATM operating systems",
    explanation: "RBI ATM baseline controls mandate strict network isolation, hardware-based key management (TMK/TPK), OS application whitelisting, USB port disabling, and BIOS password protection."
  },
  {
    id: 8,
    question: "In a SOC 2 Type II audit of a FinTech SaaS cloud provider, what differentiates a Type II report from a Type I report?",
    options: [
      "Type II evaluates the operational effectiveness of controls over a minimum testing period (e.g., 6 to 12 months), whereas Type I only evaluates design at a point in time",
      "Type I is for banking while Type II is exclusively for manufacturing",
      "Type I is performed by internal auditors while Type II is self-certified by the CEO",
      "Type II eliminates the need for testing evidence"
    ],
    correctAnswer: "Type II evaluates the operational effectiveness of controls over a minimum testing period (e.g., 6 to 12 months), whereas Type I only evaluates design at a point in time",
    explanation: "SOC 2 Type I reviews control design at a single point in time, while SOC 2 Type II tests whether controls operated effectively throughout a defined observation window (typically 6-12 months)."
  },
  {
    id: 9,
    question: "Under RBI guidelines on Card-on-File (CoF) Tokenization, what data can merchants store in place of actual 16-digit Primary Account Numbers (PAN)?",
    options: [
      "A cryptographically generated surrogate Token and the last 4 digits of the card",
      "The full 16-digit PAN encrypted with a static merchant password",
      "The card CVV and customer mobile number",
      "The plain magnetic stripe track data"
    ],
    correctAnswer: "A cryptographically generated surrogate Token and the last 4 digits of the card",
    explanation: "RBI CoF tokenization prohibits merchants and payment aggregators from storing actual PAN data post-transaction, allowing only unique surrogate tokens and masked card identifiers (last 4 digits)."
  },
  {
    id: 10,
    question: "During an audit of a FinTech micro-lending API, the auditor finds that altering the customer_id parameter in an API GET request returns other users' credit reports. What OWASP API vulnerability is this?",
    options: [
      "Broken Object Level Authorization (BOLA / IDOR)",
      "Unrestricted Resource Consumption",
      "Broken Function Level Authorization",
      "Improper Asset Management"
    ],
    correctAnswer: "Broken Object Level Authorization (BOLA / IDOR)",
    explanation: "BOLA (formerly IDOR) occurs when an API endpoint does not validate whether the authenticated user has permission to access the requested object ID, exposing unauthorized customer data."
  },
  {
    id: 11,
    question: "In a banking SWIFT environment, what mandatory security baseline framework must all participating financial institutions comply with annually?",
    options: [
      "SWIFT Customer Security Programme (CSP) / Customer Security Controls Framework (CSCF)",
      "Fedwire Basic Security Standards",
      "SEBI Intermediary Circular",
      "NIST Special Publication 800-53 Low Baseline"
    ],
    correctAnswer: "SWIFT Customer Security Programme (CSP) / Customer Security Controls Framework (CSCF)",
    explanation: "All financial institutions connected to SWIFT must comply annually with the SWIFT Customer Security Controls Framework (CSCF), requiring independent mandatory assessments and attestation."
  },
  {
    id: 12,
    question: "What is the role of an automated Maker-Checker workflow in enterprise banking applications?",
    options: [
      "Ensuring that no single user can initiate and approve a high-value financial transaction or configuration change independently",
      "Automatically speeding up transaction approvals without human review",
      "Replacing multi-factor authentication for high-privilege operations",
      "Allowing developers to bypass code review in emergency deployments"
    ],
    correctAnswer: "Ensuring that no single user can initiate and approve a high-value financial transaction or configuration change independently",
    explanation: "Maker-Checker enforces four-eyes principle (dual authorization): the 'Maker' initiates the financial transaction, and a distinct authorized 'Checker' verifies and approves it before execution."
  },
  {
    id: 13,
    question: "In an audit of a bank's Disaster Recovery (DR) readiness, what metric specifies the maximum acceptable age of data that can be lost following an unplanned outage?",
    options: [
      "Recovery Point Objective (RPO)",
      "Recovery Time Objective (RTO)",
      "Maximum Tolerable Downtime (MTD)",
      "Mean Time Between Failures (MTBF)"
    ],
    correctAnswer: "Recovery Point Objective (RPO)",
    explanation: "Recovery Point Objective (RPO) defines the maximum allowable data loss measured in time (e.g. Near-Zero RPO for Core Banking databases via synchronous database replication)."
  },
  {
    id: 14,
    question: "During a penetration test of a bank's Net Banking portal, the auditor successfully injects script tags into the beneficiary nickname field that executes in the bank admin portal. What vulnerability is this?",
    options: [
      "Stored (Persistent) Cross-Site Scripting (XSS)",
      "Reflected Cross-Site Scripting",
      "Server-Side Request Forgery (SSRF)",
      "SQL Injection (Blind)"
    ],
    correctAnswer: "Stored (Persistent) Cross-Site Scripting (XSS)",
    explanation: "Stored XSS occurs when malicious payloads are saved in the database (e.g., beneficiary nickname) and later rendered unescaped in an administrator's browser, executing with administrative privileges."
  },
  {
    id: 15,
    question: "Under the India Digital Personal Data Protection (DPDP) Act 2023, what is the maximum statutory financial penalty for a Significant Data Fiduciary that fails to implement reasonable security safeguards resulting in a personal data breach?",
    options: [
      "Up to ₹250 Crores per breach event",
      "Up to ₹50 Lakhs total",
      "Up to 4% of global turnover or ₹100 Crores, whichever is lower",
      "No financial penalty if an apology is published"
    ],
    correctAnswer: "Up to ₹250 Crores per breach event",
    explanation: "Schedule to the DPDP Act 2023 specifies a penalty of up to ₹250 Crores (INR 2.5 Billion) for failure to take reasonable security safeguards to prevent personal data breaches."
  },
  {
    id: 16,
    question: "When auditing privileged access in a Tier-4 Banking Datacenter in Kolkata, which solution should be deployed to record administrative sessions and rotate root passwords?",
    options: [
      "Privileged Access Management (PAM) with session recording and automated credential vaulting",
      "Sharing root passwords in an encrypted Excel sheet via corporate email",
      "Disabling passwords and enabling anonymous SSH access",
      "Using shared generic administrator accounts without individual attribution"
    ],
    correctAnswer: "Privileged Access Management (PAM) with session recording and automated credential vaulting",
    explanation: "PAM systems enforce individual accountability, eliminate hardcoded credentials, dynamically rotate administrative passwords, and provide searchable session recordings for audit compliance."
  },
  {
    id: 17,
    question: "What is the primary vulnerability when a banking API returns verbose stack traces containing database queries and server framework versions in HTTP 500 error responses?",
    options: [
      "Improper Error Handling & Security Misconfiguration (Information Disclosure)",
      "Cross-Origin Resource Sharing (CORS) misconfiguration",
      "Cryptographic Failure on TLS handshakes",
      "Broken Object Property Level Authorization"
    ],
    correctAnswer: "Improper Error Handling & Security Misconfiguration (Information Disclosure)",
    explanation: "Verbose error messages reveal underlying infrastructure versions, database schemas, and stack traces that attackers can exploit to craft targeted injection and remote code execution attacks."
  },
  {
    id: 18,
    question: "In an audit of a bank's Security Operations Center (SOC), which key metric measures the average time elapsed from when an alert is triggered to when the threat is actively contained?",
    options: [
      "Mean Time to Contain / Remediate (MTTR)",
      "Mean Time to Detect (MTTD)",
      "Mean Time Between Failures (MTBF)",
      "Return on Security Investment (ROSI)"
    ],
    correctAnswer: "Mean Time to Contain / Remediate (MTTR)",
    explanation: "Mean Time to Respond/Remediate (MTTR) quantifies the speed with which SOC incident responders contain and neutralize an active security threat once it has been detected."
  },
  {
    id: 19,
    question: "Which encryption standard is mandatory for protecting cardholder Primary Account Numbers (PAN) stored at rest in a PCI-DSS v4.0 Cardholder Data Environment?",
    options: [
      "Strong cryptography such as AES-256 with robust key management (split knowledge / dual control)",
      "Single DES encryption",
      "MD5 hashing without salt",
      "Base64 obfuscation"
    ],
    correctAnswer: "Strong cryptography such as AES-256 with robust key management (split knowledge / dual control)",
    explanation: "PCI-DSS v4.0 Requirement 3.4 mandates strong industry-accepted encryption (such as AES-256 or RSA-3072+) with dual control and split knowledge for all stored cardholder data at rest."
  },
  {
    id: 20,
    question: "During an audit of a FinTech payment gateway's CI/CD pipeline, the auditor finds hardcoded AWS access keys in a public GitHub repository. What audit finding should be issued?",
    options: [
      "Major Non-Conformity with immediate credential revocation and deployment of secrets management (e.g. HashiCorp Vault / AWS Secrets Manager)",
      "Observation only, since GitHub requires a login",
      "Opportunity for Improvement scheduled for review in 12 months",
      "No finding if the repository is private"
    ],
    correctAnswer: "Major Non-Conformity with immediate credential revocation and deployment of secrets management (e.g. HashiCorp Vault / AWS Secrets Manager)",
    explanation: "Hardcoded production cloud credentials in source repositories represent an immediate catastrophic exposure risk, requiring emergency credential rotation and classification as a Major Non-Conformity."
  },
  {
    id: 21,
    question: "What is the main objective of conducting a Red Team vs. Blue Team Adversarial Simulation in a Scheduled Commercial Bank?",
    options: [
      "To realistically test the bank's holistic detection, response, and resilience capabilities against real-world Advanced Persistent Threat (APT) tactics",
      "To replace standard internal vulnerability assessments completely",
      "To test whether network cables are physically labeled properly",
      "To train IT staff on how to format Excel spreadsheets"
    ],
    correctAnswer: "To realistically test the bank's holistic detection, response, and resilience capabilities against real-world Advanced Persistent Threat (APT) tactics",
    explanation: "Adversarial simulations stress-test people, processes, and technologies by simulating sophisticated multi-stage cyber attacks, evaluating SOC alert efficacy and incident response coordination."
  },
  {
    id: 22,
    question: "Under the RBI IT Governance framework, what is the mandatory role of the Board-level IT Strategy Committee?",
    options: [
      "Reviewing IT alignment with business strategy, ensuring adequate resource allocation, and governing information security risk at the highest level",
      "Writing daily software code for the mobile banking app",
      "Manually approving daily teller cash drawer reconciliation",
      "Installing antivirus updates on branch workstations"
    ],
    correctAnswer: "Reviewing IT alignment with business strategy, ensuring adequate resource allocation, and governing information security risk at the highest level",
    explanation: "The IT Strategy Committee of the Board provides strategic direction, oversees IT governance, reviews major technology investments, and monitors cyber risk posture across the bank."
  },
  {
    id: 23,
    question: "In a cloud-native FinTech application deployed on AWS, who is responsible for securing the underlying physical data center infrastructure according to the AWS Shared Responsibility Model?",
    options: [
      "AWS (Cloud Service Provider)",
      "The FinTech Customer (Cloud Consumer)",
      "The Reserve Bank of India",
      "The payment gateway merchant"
    ],
    correctAnswer: "AWS (Cloud Service Provider)",
    explanation: "Under the Shared Responsibility Model, AWS is responsible for 'Security of the Cloud' (physical infrastructure, virtualization layer, hardware), while the customer is responsible for 'Security in the Cloud' (OS, IAM, encryption, application code)."
  },
  {
    id: 24,
    question: "What control must be implemented on banking web portals to mitigate automated credential stuffing attacks and brute-force login attempts?",
    options: [
      "Rate limiting, Adaptive Multi-Factor Authentication (MFA), CAPTCHA, and Web Application Firewall (WAF) bot management",
      "Allowing unlimited login attempts to prevent user lockouts",
      "Sending user passwords in plain HTTP GET query parameters",
      "Disabling password expiration policies completely"
    ],
    correctAnswer: "Rate limiting, Adaptive Multi-Factor Authentication (MFA), CAPTCHA, and Web Application Firewall (WAF) bot management",
    explanation: "Defending against automated botnets and credential stuffing requires a layered defense: aggressive IP/account rate limiting, step-up MFA, challenge puzzles (CAPTCHA), and AI-driven bot protection."
  },
  {
    id: 25,
    question: "In a payment processing system audit, what does the term 'End-to-End Encryption (E2EE)' guarantee for transaction payloads from POS terminal to acquiring bank?",
    options: [
      "Card data is encrypted at the physical PIN pad and remains ciphertext until decrypted inside the secure acquiring bank Payment HSM, preventing decryption by intermediate POS software or networks",
      "Data is encrypted only across the local Wi-Fi router",
      "Data is compressed to save network bandwidth",
      "Data is encrypted only when written to the merchant's local hard disk"
    ],
    correctAnswer: "Card data is encrypted at the physical PIN pad and remains ciphertext until decrypted inside the secure acquiring bank Payment HSM, preventing decryption by intermediate POS software or networks",
    explanation: "Point-to-Point / End-to-End Encryption ensures cardholder data is encrypted at the point of interaction (secure card reader) and can only be decrypted within the acquiring bank's hardware security module."
  },
  {
    id: 26,
    question: "During an audit of a bank's third-party vendor ecosystem (Supply Chain Risk), which control is vital prior to onboarding a SaaS software vendor?",
    options: [
      "Conducting third-party security risk assessment, reviewing SOC 2 Type II / ISO 27001 reports, and executing mandatory Right-to-Audit covenants",
      "Relying solely on the vendor's marketing brochure",
      "Granting full administrative domain access without a background check",
      "Exempting third parties from data privacy agreements to speed up onboarding"
    ],
    correctAnswer: "Conducting third-party security risk assessment, reviewing SOC 2 Type II / ISO 27001 reports, and executing mandatory Right-to-Audit covenants",
    explanation: "RBI and ISO 27001:2022 (Control A.5.19) require rigorous vendor risk due diligence, independent third-party audit certifications, and binding contractual clauses including Right-to-Audit."
  },
  {
    id: 27,
    question: "What is the primary risk associated with allowing internal banking staff to access production databases using shared generic service accounts (e.g. 'oracle_admin')?",
    options: [
      "Loss of Non-Repudiation and complete inability to attribute specific fraudulent transactions to an individual human operator",
      "Databases will run at half their maximum query processing speed",
      "Automatic revocation of the bank's internet service provider contract",
      "The database will automatically delete daily transaction tables"
    ],
    correctAnswer: "Loss of Non-Repudiation and complete inability to attribute specific fraudulent transactions to an individual human operator",
    explanation: "Shared accounts destroy accountability and non-repudiation; in forensic investigations following fraud, it is impossible to prove which individual employee performed unauthorized actions."
  },
  {
    id: 28,
    question: "In a forensic readiness review of a Core Banking database, what technology ensures that database audit logs cannot be modified or deleted by a rogue DBA?",
    options: [
      "WORM (Write Once, Read Many) immutable cloud storage / append-only syslog forwarding with cryptographic hashing",
      "Storing logs in standard Microsoft Word documents on local desktop",
      "Emailing log files as unencrypted zip attachments to personal email",
      "Enabling DBA write access on the syslog directory"
    ],
    correctAnswer: "WORM (Write Once, Read Many) immutable cloud storage / append-only syslog forwarding with cryptographic hashing",
    explanation: "WORM storage and remote append-only logging servers prevent even privileged root/DBA administrators from altering historical audit trails, ensuring evidence admissibility in court."
  },
  {
    id: 29,
    question: "During a biometric authentication audit for an Aadhaar-enabled Payment System (AePS), what feature is required by UIDAI to prevent spoofing with synthetic silicon fingerprints?",
    options: [
      "Liveness Detection (Presentation Attack Detection - PAD) compliant with ISO/IEC 30107",
      "Increasing image brightness by 50%",
      "Allowing fingerprint capture from photographs taken by standard phone cameras",
      "Disabling encryption on the biometric scanner driver"
    ],
    correctAnswer: "Liveness Detection (Presentation Attack Detection - PAD) compliant with ISO/IEC 30107",
    explanation: "UIDAI and RBI AePS guidelines mandate RD (Registered Device) services with certified Liveness Detection / Presentation Attack Detection to detect artificial silicone, latex, or 3D printed fake fingerprints."
  },
  {
    id: 30,
    question: "What is the final and most critical phase of an enterprise Information Security Audit in a Banking environment before closing the audit engagement?",
    options: [
      "Follow-up Audit and CAPA Verification to validate that all identified Major and Minor Non-Conformities have been remediated effectively with verified evidence",
      "Deleting all working papers and test logs immediately after presenting the draft report",
      "Issuing a clean certification without re-testing resolved findings",
      "Conducting a public press conference announcing all identified vulnerabilities"
    ],
    correctAnswer: "Follow-up Audit and CAPA Verification to validate that all identified Major and Minor Non-Conformities have been remediated effectively with verified evidence",
    explanation: "An audit lifecycle is not complete until follow-up fieldwork verifies that the auditee's Corrective and Preventive Actions (CAPA) have successfully eliminated the root causes of all identified non-conformities."
  }
];

export default questions;
