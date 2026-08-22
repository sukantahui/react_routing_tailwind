const questions = [
  {
    question: "Why is information considered the primary organizational asset of modern enterprises, and how does its value compare to physical assets?",
    shortAnswer: "Information (intellectual property, customer data, proprietary algorithms, financial records) constitutes the core revenue driver and competitive advantage; physical servers can be replaced in days, but compromising customer data leads to permanent brand loss and up to ₹250 Crores in statutory penalties.",
    explanation: "In the digital economy, physical infrastructure (servers, laptops, office buildings) is a commodity. An enterprise's true market valuation resides in its intangible information assets: proprietary algorithms, ML training weights, customer databases, trade secrets, and transaction ledgers. Physical assets depreciate linearly, but information assets generate recurring value—and if stolen, leaked, or corrupted, can cause total business failure and severe regulatory penalties under the Indian DPDP Act 2023.",
    hint: "Think of a bank: losing a physical chair or laptop is minor, but leaking all customer account numbers destroys the bank.",
    level: "basic",
    codeExample: `// Physical Asset vs Information Asset Value:
Physical Asset (Commodity):   Dell PowerEdge Server -> Value = ₹8,00,000 (Replaceable in 48 hours)
Information Asset (Capital): Core Customer Banking DB -> Value = ₹50,00,00,000 (Breach causes insolvency!)`
  },
  {
    question: "What is an Information Asset Register (IAR), and why is it mandatory under ISO/IEC 27001 (Control 5.9)?",
    shortAnswer: "An IAR is a centralized, comprehensive inventory of all enterprise information assets, documenting asset owners, technical custodians, classification levels, storage locations, and regulatory dependencies.",
    explanation: "ISO/IEC 27001:2022 Control 5.9 (Inventory of information and other associated assets) mandates that an organization must identify and maintain an inventory of all assets associated with information and information processing facilities. The rationale is simple: 'You cannot protect, classify, or assess risk for what you do not know you own.' The IAR provides the baseline for all risk assessments, access reviews, and compliance audits.",
    hint: "Think of an official title deed registry that tracks every piece of land and its owner.",
    level: "basic",
    codeExample: `// Mandatory ISO 27001 Information Asset Register (IAR) Fields:
1. Asset ID & Name:          AST-PAY-001 (UPI Transaction Ledger DB)
2. Asset Description:        PostgreSQL cluster storing processed UPI payment records
3. Asset Owner (Accountable): Chief Financial Officer (CFO)
4. Asset Custodian (Maintainer): Lead Database Administrator (DBA)
5. Classification Level:     CONFIDENTIAL / RESTRICTED
6. Physical/Cloud Location:  AWS ap-south-1 (Mumbai) Encrypted EBS Volume
7. Legal Compliance Mapping: DPDP Act 2023 Section 8, RBI Master Direction, PCI-DSS v4.0`
  },
  {
    question: "What is the crucial governance distinction between an 'Asset Owner' and an 'Asset Custodian' in Information Security Management?",
    shortAnswer: "The Asset Owner is a senior business executive accountable for the asset's security classification and access approvals; the Asset Custodian is the technical specialist responsible for day-to-day maintenance, backups, and control implementation.",
    explanation: "1. Asset Owner: A business executive (e.g. VP of HR for employee payroll, CFO for accounting ledgers, Chief Medical Officer for patient health records). The Owner decides who is authorized to access the data, determines its classification level, and bears business accountability for risk; 2. Asset Custodian: An IT or security specialist (e.g. Database Administrator, Cloud Architect, Storage Admin) who implements the technical controls dictated by the Owner: configuring encryption, executing daily backups, patching servers, and enforcing access control lists.",
    hint: "Think of the homeowner who decides who gets keys versus the locksmith who physically installs the deadbolt.",
    level: "moderate",
    codeExample: `// Asset Owner vs Asset Custodian Matrix:
Asset: Customer KYC Database (PAN & Aadhaar numbers)
Asset Owner:     Head of Compliance (Decides access policies & approves user roles)
Asset Custodian: Lead DevOps Engineer (Configures AES-256 encryption & runs daily backups)`
  },
  {
    question: "Step through the 6 stages of the Information Asset Security Lifecycle (NIST SP 800-88 / ISO 27001).",
    shortAnswer: "1. Creation/Collection; 2. Storage; 3. Usage/Processing; 4. Sharing/Transmission; 5. Archival; 6. Destruction/Sanitization.",
    explanation: "Information flows through 6 distinct lifecycle stages, each requiring specific security controls: 1. Creation: Data classification tagging and input validation; 2. Storage: Encryption at rest (AES-256), access control, and immutable backups; 3. Usage: Role-based access control (RBAC), memory protection, and audit logging; 4. Sharing: Encryption in transit (TLS 1.3 / mTLS), DLP monitoring, and third-party NDAs; 5. Archival: Long-term encrypted WORM storage meeting statutory retention periods; 6. Destruction: Cryptographic erasure or physical degaussing compliant with NIST SP 800-88.",
    hint: "Follow data from the moment it is entered, stored, used, transmitted, archived, and permanently destroyed.",
    level: "moderate",
    codeExample: `// 6-Stage Information Asset Lifecycle:
[ 1. CREATE ]   ➔ Apply Classification Tag (e.g., CONFIDENTIAL)
      |
[ 2. STORE ]    ➔ AES-256 Encryption at Rest + Backup Replication
      |
[ 3. USE ]      ➔ Role-Based Access Control (RBAC) + Audit Logging
      |
[ 4. SHARE ]    ➔ Mutual TLS (mTLS) in Transit + DLP Boundary Filters
      |
[ 5. ARCHIVE ]  ➔ Encrypted WORM Long-Term Cold Storage (5-Year SLA)
      |
[ 6. DESTROY ]  ➔ NIST SP 800-88 Cryptographic Sanitization / Shredding`
  },
  {
    question: "What are the primary differences between Quantitative and Qualitative Asset Valuation methodologies?",
    shortAnswer: "Quantitative valuation assigns monetary financial figures (e.g. replacement cost, revenue generation, downtime loss); Qualitative valuation assigns categorical ranking levels (e.g. High, Medium, Low) based on reputational, legal, and operational impact.",
    explanation: "1. Quantitative Valuation: Calculates objective economic metrics in Rupees: Cost to recreate data ($C_{\\text{recreate}}$), hourly business downtime loss ($C_{\\text{downtime}}$), and potential regulatory fines (up to ₹250 Crores under DPDP). Used for calculating SLE, ALE, and ROSI; 2. Qualitative Valuation: Ranks assets on relative scales (Critical, High, Medium, Low) based on subjective business criteria: brand reputation damage, loss of competitive edge, patient health impact, or national security disruption. Both methods are complementary in a mature ISMS.",
    hint: "Contrast measuring exact monetary rupees versus assigning color-coded priority tiers.",
    level: "moderate",
    codeExample: `// Asset Valuation Comparison:
Quantitative Valuation: Asset Value (AV) = Replacement Cost (₹20L) + Downtime Loss (₹50L) + DPDP Fine (₹25Cr) = ₹25.7 Crores
Qualitative Valuation:  Asset Criticality = CRITICAL (Impact: High, Likelihood: Moderate, Category: Tier-1 PII)`
  },
  {
    question: "What is 'Data Sanitization' under NIST SP 800-88, and what are the three recognized sanitization methods (Clear, Purge, Destroy)?",
    shortAnswer: "1. Clear: Overwriting storage media with logical techniques (single/multi-pass overwrite); 2. Purge: Executing low-level cryptographic erase or degaussing to prevent laboratory recovery; 3. Destroy: Physical shredding, incineration, or disintegration of storage media.",
    explanation: "When retiring hard drives, SSDs, or cloud storage volumes: 1. Clear (Logical Sanitization): Overwriting data sectors with fixed patterns (e.g. all zeros) using standard read/write commands, protecting against simple recovery tools; 2. Purge (Physical/Cryptographic Sanitization): Executing ATA Secure Erase, NVMe Crypto Erase, or magnetic degaussing, rendering recovery impossible even in state-of-the-art forensic laboratories; 3. Destroy (Physical Destruction): Mechanically shredding drives into particles smaller than 2mm, smelting, or incinerating.",
    hint: "Think of erasing a whiteboard (Clear), bleaching the board (Purge), and crushing the board into dust (Destroy).",
    level: "expert",
    codeExample: `// NIST SP 800-88 Sanitization Levels:
Clear:   $ dd if=/dev/zero of=/dev/sdb bs=1M status=progress (Logical Overwrite)
Purge:   nvme format /dev/nvme0n1 --namespace-id=1 --ses=2 (Cryptographic Crypto-Erase)
Destroy: Industrial Drive Shredder -> Mechanically shreds SSD to < 2mm particles`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is customer personal data classified as a 'Fiduciary Information Asset'?",
    shortAnswer: "The enterprise does not 'own' personal data; it holds it in trust as a Data Fiduciary on behalf of the Data Principal (citizen); Section 8 legally mandates protecting this fiduciary asset under threat of up to ₹250 Crores in fines.",
    explanation: "The DPDP Act 2023 establishes a trust-based legal relationship: the individual is the Data Principal, and the company processing the data is the Data Fiduciary. Personal data is not the proprietary property of the enterprise to exploit arbitrarily—it is an asset held in fiduciary custody. The Data Fiduciary must honor user withdrawal of consent, enforce data minimization, prevent unauthorized third-party sharing, and maintain robust technical safeguards under Section 33.",
    hint: "Think of a bank holding depositor money in trust rather than owning the money outright.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Fiduciary Model:
Data Principal (Citizen) ➔ Grants Consent ➔ Data Fiduciary (Enterprise)
Obligation: Enterprise holds data in TRUST (Purpose Limitation + Security Safeguards)
Penalty: Up to ₹250 Crores for breaching fiduciary trust under Section 33!`
  },
  {
    question: "Under Section 65B of the Indian Evidence Act 1872 / Bharatiya Sakshya Adhiniyam, what is required to produce electronic records and audit logs as legally admissible evidence in Indian courts?",
    shortAnswer: "A signed Section 65B Certificate by an authorized official in charge of the computer device, certifying the authenticity, continuous operational integrity, and tamper-free custody of the electronic record.",
    explanation: "In Indian jurisprudence, digital evidence (system logs, database records, email headers, forensic disk images) is not admissible as primary physical evidence. Under Section 65B(4) of the Indian Evidence Act, the electronic record must be accompanied by a formal Section 65B Certificate signed by the Asset Custodian or System Administrator, stating: 1. The computer was operating properly during record creation; 2. The record was produced in the ordinary course of business; 3. Cryptographic hashes (SHA-256) prove zero data tampering.",
    hint: "Remember the mandatory legal certificate required for all computer printouts and logs in Indian courts.",
    level: "basic",
    codeExample: `// Section 65B Electronic Evidence Certificate Template:
"I, Sukanta Hui, System Administrator, hereby certify under Section 65B:
1. The server 'api.bank.in' was operating normally on 2026-08-23.
2. The attached transaction logs were generated in the ordinary course of activities.
3. Cryptographic Hash: SHA256(audit.log) = 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
4. The logs are authentic and have not been altered or tampered with."`
  },
  {
    question: "What is 'Data Classification', and how does it determine the baseline security controls applied to an information asset?",
    shortAnswer: "Data classification categorizes information assets into defined tiers (e.g. Public, Internal, Confidential, Restricted) based on sensitivity and business impact; higher tiers mandate stricter controls (e.g. mandatory encryption, MFA, restricted access).",
    explanation: "Treating all data identically is economically impossible and operationally crippling. Data classification assigns each asset to a tier based on the harm that unauthorized disclosure, modification, or destruction would cause: 1. Public: No harm if disclosed (marketing flyers); 2. Internal: Minor operational harm (internal phone directories); 3. Confidential: Significant financial or competitive harm (source code, financial projections); 4. Restricted: Catastrophic harm or regulatory fines (customer PII, encryption keys, medical records). Controls scale up with classification.",
    hint: "Think of airport security: general terminal area (Public), boarding gate (Internal), cockpit (Restricted).",
    level: "basic",
    codeExample: `// 4-Tier Enterprise Classification Scheme:
Tier 1: Public       -> No encryption required | Freely published online
Tier 2: Internal     -> Password protected | Employees only
Tier 3: Confidential -> AES-256 encrypted | Need-to-know access | DLP monitored
Tier 4: Restricted   -> Hardware HSM keys + mTLS + MFA + DPDP Section 8 protection`
  },
  {
    question: "What is 'Asset Sprawl', and how does it create critical hidden vulnerabilities in enterprise cloud environments?",
    shortAnswer: "Asset sprawl is the uncontrolled proliferation of forgotten cloud servers, storage buckets, test databases, and developer snapshots; unmonitored and unpatched, they become low-hanging entry points for attackers.",
    explanation: "With self-service cloud infrastructure (AWS/Azure/GCP), developers can spin up virtual machines, S3 buckets, and RDS databases in minutes. When projects finish, these resources are frequently abandoned ('orphan assets'). Because they are not catalogued in the Information Asset Register, they receive no security patches, lack WAF protection, and often have public IP addresses or hardcoded credentials. Attackers scan the internet to find these forgotten orphan assets and pivot into the core network.",
    hint: "Think of forgotten storage sheds behind a factory that have rusted locks and open windows.",
    level: "moderate",
    codeExample: `// Cloud Asset Sprawl Vulnerability:
Developer spins up test S3 bucket: 'test-bank-dump-2024' -> Forgets to delete it ->
Bucket contains real customer database backup -> Publicly readable -> MASSIVE DATA BREACH!`
  },
  {
    question: "How do cryptographic keys, API tokens, and digital certificates fit into the Information Asset Register?",
    shortAnswer: "They are classified as 'Cryptographic Tier-1 Information Assets' with maximum criticality; compromising a master private key compromises all data protected by that key, requiring dedicated hardware storage (HSMs) and strict lifecycle tracking.",
    explanation: "Cryptographic keys and secrets are not just technical configuration files—they are the master information assets that protect all other data assets. If an RSA private key or root TLS certificate is compromised, all encrypted customer databases, HTTPS sessions, and digital signatures become untrusted. The IAR must track: Key ID, Algorithm, Bit Length, HSM Storage Slot, Generation Date, Expiration Date, Key Custodian, and Key Compromise Revocation Plan.",
    hint: "Think of the master key that opens every safe in a bank vault.",
    level: "moderate",
    codeExample: `// Cryptographic Key Asset Entry in IAR:
Asset ID:       AST-CRY-009
Asset Name:     Root Payment Switch RSA-4096 Private Key
Custodian:      Lead Security Architect
Storage:        FIPS 140-3 Level 3 Hardware Security Module (HSM Slot #4)
Classification: RESTRICTED / MASTER KEY
Lifecycle SLA:  Annual key rotation + 6-hour CERT-In compromise revocation protocol`
  },
  {
    question: "What is 'Cryptographic Erasure' (Crypto-Shredding), and why is it the gold standard for sanitizing cloud information assets?",
    shortAnswer: "Crypto-shredding sanitizes encrypted data by permanently destroying its decryption key ($K$); without the key, the ciphertext remains mathematically undecryptable random noise, instantly sanitizing terabytes of cloud data.",
    explanation: "In multi-tenant cloud storage (AWS S3, Azure Blob, Google Cloud Storage), physical disk shredding or low-level block overwriting is impossible because the underlying hardware is shared. Crypto-shredding (NIST SP 800-88 Section 2.4) solves this: When data is stored, it is encrypted with a unique Data Encryption Key (DEK). To sanitize the asset, the enterprise destroys the DEK inside its Key Management Service (KMS) or HSM. Even if the raw bits remain on physical flash chips, the data is permanently unrecoverable ($2^{256}$ brute-force barrier).",
    hint: "Think of burning the only key to a titanium safe dropped into the bottom of the Mariana Trench.",
    level: "expert",
    codeExample: `// Crypto-Shredding / Cryptographic Erasure in Action:
Data in S3:     Encrypted with AES-256 Key K (10 TB Customer Archive)
Sanitization:   aws kms schedule-key-deletion --key-id K --pending-window-in-days 7
Key Destroyed:  DEK Erased from HSM silicon -> Data instantly converted to useless mathematical entropy!`
  },
  {
    question: "Synthesizing Information as an Organizational Asset: what is the master governance equation for protecting enterprise information capital?",
    shortAnswer: "$$\\text{Asset Security Posture} = \\frac{\\text{IAR Completeness} \\times \\text{Classification Rigor} \\times \\text{Lifecycle Controls}}{\\text{Asset Sprawl} \\times \\text{Unmonitored Shadow IT}}$$ with continuous audit verification.",
    explanation: "This master governance relationship demonstrates that true cybersecurity begins with complete, verified asset visibility. Maintaining an exhaustive Information Asset Register (IAR), enforcing strict data classification tiers, and applying end-to-end lifecycle controls (from creation to NIST SP 800-88 sanitization) guarantees that organizational information assets are protected against breach, theft, and devastating statutory fines under the Indian DPDP Act 2023.",
    hint: "Conclude by reviewing how asset visibility and classification eliminate the risks of asset sprawl.",
    level: "expert",
    codeExample: `// The Master Asset Governance Rule:
Security = (IAR_Visibility * Classification_Discipline * Lifecycle_Sanitization) / (Asset_Sprawl + Shadow_IT);
Outcome: 100% Asset Accountability, Zero Orphan Servers & Full DPDP Legal Compliance!`
  }
];

export default questions;
