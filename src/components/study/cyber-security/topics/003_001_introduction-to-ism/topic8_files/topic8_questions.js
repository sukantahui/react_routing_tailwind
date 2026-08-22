const questions = [
  {
    question: "What is Data Lifecycle Security Management, and why must security controls be applied continuously from creation to destruction?",
    shortAnswer: "Data Lifecycle Security Management applies tailored cryptographic and governance safeguards at every stage of data existence (Create ➔ Store ➔ Use ➔ Share ➔ Archive ➔ Destroy); protecting data during storage is useless if it is leaked during sharing or unencrypted in memory during processing.",
    explanation: "Security is not a single static barrier; data continuously transforms its state. It is collected, stored in databases, loaded into CPU memory, shared across APIs, archived in cold storage, and ultimately destroyed. Vulnerabilities exist at every transition: unprotected APIs leak data in motion, memory dumps expose data in use, and abandoned disks leak data post-retirement. Complete lifecycle management ensures zero unprotected windows.",
    hint: "Think of protecting a VIP throughout their entire journey: at home, in the car, at the event, and returning home.",
    level: "basic",
    codeExample: `// The 6 Universal Lifecycle Stages:
[ 1. CREATE ]  ➔ Data Minimization & Classification Tagging (DPDP Sec 8)
[ 2. STORE ]   ➔ AES-256-GCM Encryption at Rest + Multi-AZ Replication
[ 3. USE ]     ➔ Role-Based Access Control (RBAC) + Enclave Memory Protection
[ 4. SHARE ]   ➔ Mutual TLS (mTLS 1.3) + Data Loss Prevention (DLP)
[ 5. ARCHIVE ] ➔ Immutable WORM Encrypted Cold Storage (5-Year SLA)
[ 6. DESTROY ] ➔ NIST SP 800-88 Crypto-Shredding / Physical Drive Destruction`
  },
  {
    question: "What are the three fundamental states of data in computer systems, and what security controls protect each state?",
    shortAnswer: "1. Data at Rest (Protected by AES-256-GCM full-disk/database encryption); 2. Data in Motion (Protected by TLS 1.3 / mTLS); 3. Data in Use (Protected by Confidential Computing / Trusted Execution Environments and memory encryption).",
    explanation: "1. Data at Rest: Stored on hard drives, SSDs, SANs, or cloud S3 buckets (protected by AES-256-GCM and FIPS 140-3 HSM key hierarchies); 2. Data in Motion (in Transit): Traversing public internet or internal subnets (protected by TLS 1.3, IPsec, and mutual TLS / mTLS); 3. Data in Use: Loaded into active CPU registers and RAM during processing (traditionally exposed in plaintext; protected by modern Confidential Computing / AMD SEV / Intel SGX hardware enclaves).",
    hint: "Remember the triad: resting on disk, moving over the wire, and active in RAM/CPU.",
    level: "moderate",
    codeExample: `// The 3 Data States & Controls:
1. Data at Rest:   AWS KMS Encrypted PostgreSQL (AES-256-GCM)
2. Data in Motion: Mutual TLS (mTLS with TLS 1.3 Cipher Suites)
3. Data in Use:    Intel SGX / AMD SEV Confidential Computing Enclaves`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(7), what is 'Storage Limitation', and how is it technically implemented?",
    shortAnswer: "Storage Limitation mandates that a Data Fiduciary must erase personal data as soon as the specified purpose for which it was collected has been served, implemented via automated Time-to-Live (TTL) retention policies and crypto-shredding.",
    explanation: "Organizations cannot hoard customer data indefinitely. Under Section 8(7) of the DPDP Act 2023, personal data must be permanently erased upon withdrawal of consent by the user or as soon as it is reasonable to assume that the specified purpose is no longer being served. Technical implementation includes: 1. Database Time-to-Live (TTL) partition expiration; 2. Automated S3 bucket lifecycle deletion rules; 3. Cryptographic erasure of customer-specific encryption keys.",
    hint: "Remember the statutory duty to delete customer records once the job is finished.",
    level: "basic",
    codeExample: `// DPDP Act Section 8(7) Automated Storage Limitation:
-- PostgreSQL Automated Retention Partition Drop:
CREATE OR REPLACE PROCEDURE purge_expired_kyc_partitions() LANGUAGE plpgsql AS $$
BEGIN
  -- Automatically drop KYC partitions older than statutory 5-year retention
  EXECUTE 'DROP TABLE IF EXISTS kyc_records_p' || to_char(NOW() - INTERVAL '5 years', 'YYYY_MM');
END;
$$;`
  },
  {
    question: "What is 'Confidential Computing' (Trusted Execution Environments - TEE), and how does it solve the vulnerability of 'Data in Use'?",
    shortAnswer: "Confidential Computing encrypts data in memory (RAM) while it is being processed by the CPU inside isolated hardware enclaves, preventing unauthorized access even by system administrators, hypervisors, or root attackers.",
    explanation: "Historically, data had to be decrypted into plaintext RAM before the CPU could process it, allowing root attackers or compromised cloud hypervisors to inspect memory dumps and steal credentials. Confidential Computing (Intel SGX, AMD SEV, ARM TrustZone) hardware-encrypts memory pages using CPU-generated ephemeral keys. The memory remains encrypted even in RAM chips and is decrypted only inside the secure silicon CPU enclave.",
    hint: "Think of an armored room inside a bank where even the bank guards cannot see what is being counted.",
    level: "expert",
    codeExample: `// Confidential Computing (TEE) Enclave Execution:
Standard Processing: Host RAM contains plaintext customer Aadhaar numbers -> Root memory dump steals data!
Confidential Enclave: Host RAM is AES-128 hardware encrypted -> Decrypted ONLY inside CPU silicon register!`
  },
  {
    question: "What is 'Write-Once-Read-Many' (WORM) storage, and why is it mandatory during the 'Archival' stage of the data lifecycle?",
    shortAnswer: "WORM storage physically or cryptographically prevents data from being modified, overwritten, or deleted for a specified retention period; ensuring audit logs and financial ledgers are immune to ransomware tampering.",
    explanation: "During active cyber attacks, ransomware operators attempt to delete or encrypt system backups and audit logs to prevent recovery and forensic investigation. WORM storage (e.g. AWS S3 Object Lock in Compliance Mode, immutable SAN volumes) enforces immutability at the storage controller level. Once written, files cannot be altered or deleted by anyone—not even root administrators or the cloud root account—until the statutory retention timer expires.",
    hint: "Think of carving text into stone: once written, it can be read thousands of times but never erased.",
    level: "moderate",
    codeExample: `// AWS S3 Object Lock WORM Configuration:
aws s3api put-object-retention \\
  --bucket bank-audit-records \\
  --key siem_audit_2026.log \\
  --retention '{ "Mode": "COMPLIANCE", "RetainUntilDate": "2031-08-23T00:00:00Z" }'
// File CANNOT be modified or deleted by anyone (including root!) for 5 years!`
  },
  {
    question: "What are the three sanitization methods defined in NIST SP 800-88 Rev 1 (Clear, Purge, Destroy)?",
    shortAnswer: "1. Clear: Logical overwrite of addressable storage locations (e.g. single pass 0x00); 2. Purge: Low-level ATA Secure Erase or Cryptographic Erase preventing laboratory recovery; 3. Destroy: Physical shredding (< 2mm), incineration, or melting.",
    explanation: "NIST SP 800-88 provides the global standard for media sanitization: 1. Clear: Protects against simple logical recovery using standard read/write interfaces (suitable for internal reuse); 2. Purge: Executes firmware-level cryptographic format or ATA Secure Erase, protecting against sophisticated laboratory reconstruction tools (suitable when releasing media outside enterprise control); 3. Destroy: Mechanically shreds solid-state drives into particles smaller than 2mm or incinerates magnetic platters (mandatory for high-security decommissioned hardware).",
    hint: "Remember the three escalating levels: software overwrite (Clear), firmware erase (Purge), physical destruction (Destroy).",
    level: "basic",
    codeExample: `// NIST SP 800-88 Sanitization Commands:
Clear:   dd if=/dev/zero of=/dev/sdc bs=4M status=progress (Logical Overwrite)
Purge:   blkdiscard --secure /dev/nvme0n1 (Firmware-Level NVMe Secure Erase)
Destroy: Dual-Shaft Industrial Media Shredder -> Reduces SSD to < 2mm particulate`
  },
  {
    question: "What is 'Crypto-Shredding' (Cryptographic Erasure), and why is it the definitive solution for cloud storage sanitization?",
    shortAnswer: "Crypto-shredding sanitizes cloud data by permanently deleting its unique Data Encryption Key (DEK); without the key, the ciphertext stored across distributed cloud servers is mathematically unrecoverable ($2^{256}$ barrier).",
    explanation: "In multi-tenant cloud environments (AWS S3, Azure Blob, Google Cloud Storage), customers do not own physical hard drives and cannot physically shred them. Crypto-shredding (NIST SP 800-88 Section 2.4) solves this: Data is encrypted at creation with an individual Data Encryption Key (DEK) managed in an HSM. When the asset reaches end-of-life, the enterprise destroys the DEK in the Key Management Service (KMS). Even if cloud snapshots remain on physical flash chips, the data is permanently undecryptable random noise.",
    hint: "Think of locking a vault and dropping the only key into an active volcano.",
    level: "expert",
    codeExample: `// Crypto-Shredding / Cryptographic Erasure in AWS KMS:
1. Data Storage: 50 TB Customer Transaction Archive encrypted with KMS Key K
2. End-of-Life:  DPDP Section 8(7) 5-year retention period expires
3. Destruction:  aws kms schedule-key-deletion --key-id K --pending-window-in-days 7
4. Silicon Erase: HSM erases Key K -> 50 TB ciphertext instantly converted to useless entropy!`
  },
  {
    question: "Under the Information Technology Act 2000 Section 65B, how is digital evidence preserved across the data lifecycle for legal court admissibility?",
    shortAnswer: "By generating cryptographic SHA-256 hashes at the moment of log creation, storing logs in tamper-proof WORM repositories, maintaining a continuous chain of custody, and issuing a signed Section 65B Certificate.",
    explanation: "In Indian courts, digital evidence (firewall logs, transaction records, forensic disk images) is challenged on the grounds of potential tampering. Preserving court admissibility requires: 1. Calculating a SHA-256 hash at the moment of record generation; 2. Storing logs in immutable WORM storage; 3. Maintaining an unbroken chain of custody; 4. Producing a signed Section 65B Certificate by the lawful system administrator certifying device integrity.",
    hint: "Remember the combination of SHA-256 hashing, immutable storage, and signed 65B certificates.",
    level: "basic",
    codeExample: `// Section 65B Chain of Custody Entry:
Log File:        siem_breach_telemetry_20260823.log
Creation Time:   2026-08-23T02:00:00 IST (Synchronized with NPL NTP Server)
SHA-256 Hash:    b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
Storage:         WORM Immutable Compliance Mode (Locked until 2031)
Certifier:       Sukanta Hui (Lead Forensic Officer - Section 65B Certified)`
  },
  {
    question: "What is 'Data Minimization' during the 'Creation/Collection' stage, and how does it reduce the enterprise breach blast radius?",
    shortAnswer: "Data Minimization requires collecting only the absolute minimum data fields strictly necessary for the immediate business purpose; eliminating unnecessary data reduces the financial and regulatory damage if a breach occurs.",
    explanation: "The best way to protect data is not to collect it in the first place. Under Section 8 of the Indian DPDP Act 2023, Data Fiduciaries must collect only what is necessary. If a digital wallet only needs a mobile number to execute UPI transfers, asking for user GPS location, full contact lists, and passport scans creates massive unnecessary liability. If the database is breached, the attacker gains only mobile numbers rather than an entire identity profile.",
    hint: "Think of packing only essential clothes for a trip rather than moving your entire wardrobe.",
    level: "basic",
    codeExample: `// Data Minimization Schema Design:
Unnecessary Bloat (High Risk): Collect { Name, Phone, Aadhaar, GPS, Contacts, Photos } -> Huge ₹250 Cr fine exposure!
Minimized Design (Low Risk):    Collect { Phone_Number, UPI_VPA } -> Minimal breach blast radius!`
  },
  {
    question: "What are the core technical controls required during the 'Sharing / Transmission' stage of the data lifecycle?",
    shortAnswer: "Mutual TLS (mTLS) with strong cipher suites (TLS 1.3), API tokenization, Data Loss Prevention (DLP) boundary filters, Third-Party Risk Management (TPRM) audits, and automated end-to-end payload encryption.",
    explanation: "When data leaves corporate boundaries to interface with partner APIs or third-party cloud vendors: 1. mTLS: Both client and server authenticate using X.509 digital certificates; 2. Payload Encryption: Encrypting JSON fields with AES-256 before transmission so intermediaries cannot read the plaintext; 3. Tokenization: Replacing real PAN/Aadhaar numbers with random tokens; 4. DLP: Automated network DLP filters scanning outbound web and email traffic for unencrypted PII.",
    hint: "Think of an armored courier vehicle with armed guards and sealed titanium lockboxes.",
    level: "moderate",
    codeExample: `// Secure API Payload Encryption & Tokenization in Transit:
{
  "transaction_id": "TXN-902184",
  "customer_token": "TOK-8921-X92", // Real Aadhaar/PAN is tokenized!
  "payload_ciphertext": "U2FsdGVkX1+vupppZksvRf58Ng5BTar...", // AES-256-GCM Encrypted
  "signature": "3045022100e4...", // ECDSA SHA-256 Digital Signature
  "protocol": "mTLS v1.3 with Certificate Pinning"
}`
  },
  {
    question: "What is 'Data Remanence', and why does standard file deletion fail to sanitize storage media?",
    shortAnswer: "Data remanence is the residual physical or magnetic trace of data remaining on storage media after logical deletion; standard file deletion only removes directory pointers, leaving the actual file contents intact on disk blocks until overwritten.",
    explanation: "When an operating system deletes a file (`rm file.txt` or empty recycle bin), it only marks the file's index pointer as free space in the filesystem allocation table (MFT or inode). The underlying NAND flash blocks or magnetic sectors continue to store the raw bytes. Anyone with basic forensic tools (PhotoRec, FTK Imager) can recover the entire database in minutes. Complete sanitization requires NIST SP 800-88 overwriting, crypto-shredding, or physical destruction.",
    hint: "Think of removing a book title from the library index card catalog while leaving the physical book sitting on the shelf.",
    level: "moderate",
    codeExample: `// Data Remanence Vulnerability:
Step 1: Admin runs $ rm customer_database.db (Only inode pointer deleted!)
Step 2: Attacker runs $ photorec /dev/sdb1 -> Recovers 100% of customer records in 60 seconds!
Defense: NIST SP 800-88 blkdiscard / crypto-shredding destroys underlying flash blocks!`
  },
  {
    question: "How does the 'Joiner-Mover-Leaver' (JML) identity lifecycle interlock with the Data Lifecycle during the 'Usage' stage?",
    shortAnswer: "JML ensures that data access privileges are continuously updated throughout an employee's career: provisioning least privilege at hire (Joiner), revoking old permissions upon department transfer (Mover), and immediately de-provisioning all data access upon departure (Leaver).",
    explanation: "Data in Use is protected by access control. If an employee who moves from Finance to Marketing retains their Finance database access ('privilege creep'), they create a major insider leak vector. JML automates privilege synchronization: when HR updates employee status, identity governance systems (Okta, Azure AD, SailPoint) instantly revoke outdated permissions and terminate sessions within 15 minutes of employee resignation.",
    hint: "Think of updating room keycards whenever hotel guests check in, switch rooms, or check out.",
    level: "basic",
    codeExample: `// JML Privilege Synchronization:
Employee: Mahima moves from Radiology (PACS access) to General Admin
Automated JML Action:
1. REVOKE role 'radiology_pacs_rw'
2. GRANT role 'admin_general_ro'
3. Invalidate active OAuth sessions -> Zero privilege creep!`
  },
  {
    question: "Synthesizing Data Lifecycle Security Management: what is the master equation of lifecycle data protection?",
    shortAnswer: "$$\\text{Lifecycle Security Resilience} = \\frac{\\prod_{i=1}^{6} \\text{Stage Safeguards}_i}{\\text{Data Remanence} + \\text{Unauthorized Sharing} + \\text{Unmanaged Retention}}$$ with continuous compliance verification.",
    explanation: "This master governance relationship demonstrates that data security is a continuous chain: if any single lifecycle stage fails (e.g. collecting data without consent, failing to encrypt in motion, or leaving retired cloud disks un-shredded), the product $\\prod \\text{Stage Safeguards}$ collapses to zero. Enforcing end-to-end safeguards across all 6 stages guarantees complete protection and total compliance with the Indian DPDP Act 2023.",
    hint: "Conclude by reviewing how the product of safeguards across all 6 stages ensures unbroken security.",
    level: "expert",
    codeExample: `// Master Equation of Data Lifecycle Security:
Resilience = (Create_Minimization * Store_AES256 * Use_RBAC * Share_mTLS * Archive_WORM * Destroy_CryptoShred) / Flaws;
Outcome: Unbroken End-to-End Protection, Zero Data Remanence & Full DPDP Compliance!`
  }
];

export default questions;
