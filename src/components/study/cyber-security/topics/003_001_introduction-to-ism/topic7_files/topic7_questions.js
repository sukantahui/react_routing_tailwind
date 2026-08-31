const questions = [
  {
    question: "What is Information Classification, and why is it impossible to run an effective Information Security Management System without it?",
    shortAnswer: "Information Classification categorizes enterprise data into defined sensitivity tiers based on the business, financial, and legal impact of unauthorized disclosure or loss; it ensures high-value assets receive strict protection without wasting security budget on public data.",
    explanation: "Treating all data identically is financially and operationally impossible: applying military-grade FIPS HSM encryption to public marketing brochures wastes resources, while applying generic password protection to customer Aadhaar or PAN records leads to catastrophic ₹250 Crore statutory penalties under the Indian DPDP Act 2023. Data classification establishes baseline security controls tailored to each asset's sensitivity.",
    hint: "Think of organizing valuables in a bank: free flyers on the counter, office supplies in staff desks, and cash/gold in the reinforced vault.",
    level: "basic",
    codeExample: `// Why Classification is Mandatory:
Public Data:      Marketing brochure → Standard HTTP/HTTPS | No encryption needed | ₹0 Breach Loss
Restricted Data:  Customer Aadhaar/PAN DB → AES-256-GCM + HSM + MFA → Unprotected = ₹250 Cr DPDP Fine!`
  },
  {
    question: "What are the four standard tiers of a commercial Information Classification scheme?",
    shortAnswer: "1. Public (Unrestricted); 2. Internal Use Only (Authorized staff); 3. Confidential (Proprietary business value); 4. Restricted / Highly Confidential (Mission-critical, PII/SPDI, maximum harm if leaked).",
    explanation: "Commercial enterprises universally adopt a 4-tier scheme: 1. Public: Freely shareable with the public (zero impact); 2. Internal Use Only: Intended for internal employees (e.g. employee phone directory, standard intranet announcements; low impact); 3. Confidential: Sensitive business data (source code, financial models, pricing strategy, vendor contracts; high competitive/financial harm); 4. Restricted / Highly Confidential: Regulated customer personal data (PII, Aadhaar, PAN, medical records, master cryptographic keys; catastrophic harm, regulatory fines, and legal liability).",
    hint: "Remember the 4 levels: Public, Internal, Confidential, and Restricted.",
    level: "basic",
    codeExample: `// 4-Tier Commercial Classification Scheme:
Tier 1: Public       → Press releases, marketing flyers, open-source documentation
Tier 2: Internal     → Intranet phonebook, internal process guidelines, holiday calendar
Tier 3: Confidential → Proprietary source code, Q4 financial forecasts, vendor contracts
Tier 4: Restricted   → Customer KYC databases (Aadhaar/PAN), banking PINs, HSM master keys`
  },
  {
    question: "How does the Government and Military classification scheme differ from commercial enterprise classification?",
    shortAnswer: "Government and military schemes classify data based on national security impact under statutes like the Official Secrets Act 1923, utilizing four levels: Top Secret (Exceptionally grave damage), Secret (Serious damage), Confidential (Prejudicial to national interest), and Unclassified / Official.",
    explanation: "While commercial classification focuses on financial loss, competitive harm, and DPDP compliance, government classification protects national defense and sovereignty: 1. Top Secret: Unauthorized disclosure causes exceptionally grave damage to national security (war plans, nuclear codes); 2. Secret: Causes serious damage to national security (diplomatic cables, military intelligence); 3. Confidential: Causes prejudice to national interests; 4. Unclassified / Restricted: Standard administrative governmental information.",
    hint: "Contrast commercial financial/privacy impact with military national security damage.",
    level: "moderate",
    codeExample: `// Government & Military Classification (Official Secrets Act 1923):
Top Secret:   Exceptionally Grave Damage (Nuclear codes, military defense operations)
Secret:       Serious National Damage (Intelligence reports, strategic radar positions)
Confidential: Prejudicial to State Interests (Internal diplomatic communications)
Unclassified: Standard public government gazette notifications`
  },
  {
    question: "What technical safeguards must be enforced for data classified as 'Restricted / Highly Confidential'?",
    shortAnswer: "Mandatory AES-256-GCM encryption at rest, TLS 1.3 / mTLS in transit, hardware-backed MFA, role-based access control (RBAC), immutable WORM logging, Data Loss Prevention (DLP) blocking, and NIST SP 800-88 cryptographic sanitization.",
    explanation: "Restricted data represents the highest risk category in an enterprise. Safeguards must include: 1. Cryptography: AES-256-GCM encryption with keys stored inside FIPS 140-3 Level 3 Hardware Security Modules; 2. Transmission: Mutual TLS (mTLS) with certificate pinning; 3. Access: Hardware FIDO2 tokens, strict need-to-know access, and quarterly access reviews; 4. Loss Prevention: DLP agents that block copying to USB or personal cloud; 5. Disposal: Cryptographic erasure (Crypto-Shredding) or physical shredding.",
    hint: "Think of maximum defense: hardware keys, strong encryption, multi-factor authentication, and tamper-proof logs.",
    level: "moderate",
    codeExample: `// Restricted Data Security Baseline:
Encryption at Rest:  AES-256-GCM (Master Key inside AWS KMS / Thales HSM)
Encryption in Transit: Mutual TLS (TLS 1.3 with AES-256 Cipher Suites)
Access Control:      FIDO2 Hardware Security Token + Role-Based Access Control (RBAC)
Data Loss Prevention: Automated DLP blocks USB export, printing, and personal email forwarding
Disposal SLA:        NIST SP 800-88 Crypto-Shredding or physical drive shredding to < 2mm`
  },
  {
    question: "What is 'Data Loss Prevention' (DLP), and how does it utilize classification metadata tags to prevent data leaks?",
    shortAnswer: "DLP is a software technology that inspects data in use (endpoints), data in motion (network), and data at rest (cloud/storage) to automatically detect classification tags or patterns (e.g. Aadhaar/PAN regex) and block unauthorized exfiltration.",
    explanation: "DLP software enforces classification rules across three vectors: 1. Endpoint DLP: Inspects clipboard, USB drives, and printer queues; if a document tagged 'RESTRICTED' is copied to a USB stick, the transfer is instantly blocked; 2. Network DLP: Inspects outbound web traffic and emails; blocks unencrypted transmission of files containing sensitive keywords or Aadhaar numbers; 3. Cloud / Storage DLP: Scans cloud buckets and database tables, alerting when unclassified data contains sensitive PII.",
    hint: "Think of an automated airport baggage scanner that inspects every outgoing packet for contraband.",
    level: "moderate",
    codeExample: `// DLP Policy Rule Configuration:
IF Data_Tag == "RESTRICTED" OR Content_Matches_Regex("^[2-9]{1}[0-9]{3}\\\\s[0-9]{4}\\\\s[0-9]{4}$") // Aadhaar
AND Destination == "External_USB" OR Destination == "Public_Webmail"
THEN ACTION = BLOCK_AND_LOG
ALERT_SOC("Critical DLP Policy Violation: Attempted exfiltration of Restricted customer PII!")`
  },
  {
    question: "Under the Information Technology Act 2000 and SPDI Rules 2011, what specific data types are legally defined as 'Sensitive Personal Data or Information' (SPDI)?",
    shortAnswer: "Passwords, financial information (bank account/credit card numbers), physical/physiological/mental health condition, sexual orientation, medical records, and biometric information.",
    explanation: "Rule 3 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 explicitly defines SPDI. Organizations handling SPDI must classify this information at the highest commercial tier (Restricted), obtain explicit prior consent before collection, maintain comprehensive privacy policies, and implement ISO/IEC 27001 security safeguards under Section 43A.",
    hint: "Remember the 6 categories of sensitive personal data under Indian cyber law.",
    level: "basic",
    codeExample: `// SPDI Statutory Categories (IT Act Rules 2011):
1. Passwords and authentication credentials
2. Financial information (Bank account, credit card, debit card details)
3. Medical and physiological health records & history
4. Biometric information (Fingerprints, facial recognition vectors, iris scans)
5. Sexual orientation`
  },
  {
    question: "What is 'Visual Marking' versus 'Metadata Tagging' in information classification?",
    shortAnswer: "Visual Marking applies visible labels (headers, footers, watermarks) to human-readable documents; Metadata Tagging embeds hidden digital classification attributes into file headers or database schemas for automated software enforcement.",
    explanation: "1. Visual Marking: Alerts human users to the sensitivity of physical or digital documents (e.g. header stating 'RESTRICTED - DO NOT DISTRIBUTE', dynamic watermark showing the reader's email address and timestamp); 2. Metadata Tagging: Invisible digital labels embedded into document schemas (e.g. Microsoft Information Protection / MIP labels) or database column tags (e.g. `pg_class.sensitivity = 'RESTRICTED'`). Automated tools (DLP, firewalls, CASB) read metadata tags to enforce security policies automatically.",
    hint: "Contrast a visible 'CONFIDENTIAL' stamp on a printed letter versus a digital file attribute read by a firewall.",
    level: "moderate",
    codeExample: `// Visual Marking vs Metadata Tagging:
Visual Marking:    Watermark across PDF: "CONFIDENTIAL - PROPERTY OF KOLKATA FINTECH - USER: Mamata"
Metadata Tagging:  File Header: { "Classification": "RESTRICTED", "Policy_ID": "POL-DPDP-001", "DLP_Action": "Block_External" }`
  },
  {
    question: "What is 'Over-Classification' versus 'Under-Classification', and what are the operational risks of each?",
    shortAnswer: "Over-classification marks low-sensitivity data as Restricted (wasting budget and crippling employee collaboration); Under-classification marks sensitive data as Public or Internal (causing severe data leaks and ₹250 Crore DPDP fines).",
    explanation: "1. Over-Classification: Occurs when employees mark routine emails and public documents as 'RESTRICTED'. This causes security fatigue, slows business operations (requiring cumbersome approvals to view trivial files), and inflates encryption and storage costs; 2. Under-Classification: Occurs when sensitive customer KYC or proprietary source code is marked as 'Internal' or 'Public', resulting in unencrypted storage, lack of access restrictions, and catastrophic data breaches under the DPDP Act 2023.",
    hint: "Contrast locking paper towels in a bank vault (over-classification) versus leaving gold bars on the front porch (under-classification).",
    level: "basic",
    codeExample: `// Classification Calibration Errors:
Over-Classification:  Marketing flyer marked "RESTRICTED" → Sales team cannot send to clients → ₹50L deal delayed!
Under-Classification: Customer KYC database marked "INTERNAL" → Unencrypted S3 bucket → ₹250 CR DPDP FINE!`
  },
  {
    question: "What is 'De-Classification' or 'Re-Classification', and when is it executed in the information lifecycle?",
    shortAnswer: "Re-classification adjusts an asset's classification tier over time as its sensitivity changes; e.g. unreleased financial earnings are 'Restricted' until public announcement, after which they are de-classified to 'Public'.",
    explanation: "Information sensitivity is dynamic, not static: 1. Financial Earnings: Quarterly results are 'RESTRICTED' prior to board approval and stock exchange disclosure; once officially filed with SEBI, they become 'PUBLIC'; 2. Product Blueprints: A patented design may be 'CONFIDENTIAL' for 5 years, but de-classified to 'INTERNAL' once superseded by next-generation technology; 3. Incident Reports: Active breach forensic logs are 'RESTRICTED' during investigation, but anonymized summary reports become 'PUBLIC' for industry threat sharing.",
    hint: "Think of an embargoed news release that is top secret until 9:00 AM, when it becomes public news.",
    level: "moderate",
    codeExample: `// Re-Classification Lifecycle Example:
Phase 1 (Pre-Launch):   Q4 Earnings Report → RESTRICTED (Insider trading protection)
Phase 2 (SEBI Filing):  Official Stock Exchange Disclosure at 10:00 AM IST
Phase 3 (Post-Launch):  Asset Owner executes de-classification → PUBLIC (Published on company website)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why must all employee and customer personal data be mapped to the highest classification tier?",
    shortAnswer: "Under Section 8(5) and Section 33, any unmanaged breach of personal data exposes the enterprise to statutory fines up to ₹250 Crores; classifying PII as Restricted guarantees mandatory AES-256 encryption and strict access logging.",
    explanation: "The DPDP Act 2023 does not distinguish between 'minor' and 'major' personal data breaches when assessing liability for failure to implement reasonable security safeguards. If an enterprise leaves employee salary slips or customer phone numbers exposed in an unencrypted database, it faces maximum statutory penalty liability. Classifying all personal data as Restricted enforces automated encryption, MFA, and automated access reviews across all environments.",
    hint: "Remember that Indian law treats all personal data breach liabilities with extreme statutory severity.",
    level: "basic",
    codeExample: `// DPDP Act Classification Rule:
Asset: Customer Mobile Numbers & KYC Documents
Statutory Risk: Up to ₹250 Crores in fines under Section 33 Schedule 1
Classification Mandate: RESTRICTED / HIGHLY CONFIDENTIAL (Requires AES-256 + MFA + Access Audits)`
  },
  {
    question: "How does the 'Bell-LaPadula' (BLP) confidentiality model enforce classification rules in multi-level security systems?",
    shortAnswer: "BLP enforces two mandatory rules: 1. Simple Security Property (No Read Up - a user cannot read data at a higher classification); 2. Star Property (No Write Down - a user cannot write/leak data to a lower classification level).",
    explanation: "Formulated for military multi-level security: 1. Simple Security Property ('No Read Up'): A user with 'Confidential' clearance can read 'Public' and 'Confidential' data, but is strictly blocked from reading 'Restricted' data; 2. * (Star) Property ('No Write Down'): A user with 'Restricted' clearance cannot write or copy data into a 'Public' or 'Internal' document, mathematically preventing unauthorized data leakage or accidental de-classification.",
    hint: "Remember the two classic BLP rules: No Read Up, No Write Down.",
    level: "expert",
    codeExample: `// Bell-LaPadula (BLP) Confidentiality Properties:
User Clearance: CONFIDENTIAL
Rule 1 (Simple Security): Can READ Public & Confidential | CANNOT READ RESTRICTED (No Read Up!)
Rule 2 (* Property):      Can WRITE Confidential & Restricted | CANNOT WRITE TO PUBLIC (No Write Down!)`
  },
  {
    question: "What is 'Database Row-Level and Column-Level Classification', and how is it implemented in modern cloud data warehouses?",
    shortAnswer: "Column-level classification tags specific columns (e.g. Aadhaar, credit card CVV) with masking and encryption policies; Row-level security (RLS) restricts row visibility based on the user's role and security clearance.",
    explanation: "In modern database architectures (PostgreSQL, AWS Redshift, Snowflake, Google BigQuery): 1. Column-Level Classification: Tags the `pan_number` and `aadhaar_number` columns with dynamic data masking (e.g. `XXXX-XXXX-1234` for support clerks, plaintext for compliance officers); 2. Row-Level Security (RLS): Uses SQL security policies (e.g. `CREATE POLICY branch_isolation ON accounts USING (branch_id = current_user_branch())`) to restrict row visibility by classification clearance.",
    hint: "Think of masking credit card digits on a receipt while allowing the bank backend to see the full number.",
    level: "expert",
    codeExample: `// PostgreSQL Row-Level Security (RLS) & Column Masking:
ALTER TABLE customer_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_confidential ON customer_accounts
  FOR SELECT TO staff_role
  USING (classification_level <= 'INTERNAL');
-- Restricted rows are automatically hidden from general staff queries!`
  },
  {
    question: "Synthesizing Information Classification Schemes: what is the master equation of enterprise classification effectiveness?",
    shortAnswer: "$$\\text{Classification Effectiveness} = \\frac{\\text{Automated Tagging} \\times \\text{DLP Policy Enforcement} \\times \\text{DPDP Section 8 Rigor}}{\\text{Under-Classification Rate} + \\text{Manual User Error}}$$ with continuous audit verification.",
    explanation: "This master governance relationship proves that reliable information classification cannot rely on human memory or manual document tagging alone. Combining automated metadata discovery, strict DLP boundary enforcement, and statutory DPDP compliance guarantees that sensitive enterprise assets receive impenetrable protection while eliminating data leaks and statutory penalty exposure.",
    hint: "Conclude by reviewing how automated tagging and DLP eliminate manual user classification errors.",
    level: "expert",
    codeExample: `// Master Equation of Information Classification:
Effectiveness = (Automated_DLP_Tags * Encryption_Rigour * DPDP_Alignment) / (Under_Classification + Human_Error);
Outcome: 100% Data Asset Protection, Zero Accidental Leaks & Full Statutory Safe Harbor!`
  }
];

export default questions;
