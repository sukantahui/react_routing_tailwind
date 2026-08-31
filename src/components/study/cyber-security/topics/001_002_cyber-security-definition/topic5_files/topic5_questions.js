// topic5_questions.js
// 30 Moderate to Expert Questions on Digital Assets, Classification, Crown Jewels, Tokenization, and Sanitization

const questions = [
  {
    question: "What is a Digital Asset in cybersecurity and what makes it valuable?",
    shortAnswer: "A digital asset is any information, software, hardware, cryptographic key, or digital identity owned or leased by an organization that has operational, strategic, legal, or financial value; its value stems from the business revenue it generates and the severe damage caused if it is stolen, altered, or destroyed.",
    explanation: "Includes customer databases, source code, AI models, master encryption keys, server infrastructure, and network routers.",
    hint: "Any computer hardware, software, database, or digital key that has value to an organization.",
    level: "basic",
    codeExample: "DigitalAsset = { AssetID: 'DB_CUST_01', Type: 'Financial Ledger', Value: '₹25 Crore', Sensitivity: 'Crown Jewel' };"
  },
  {
    question: "What are the Four Primary Categories of Digital Assets?",
    shortAnswer: "1. Hardware Assets (servers, SAN arrays, routers, HSMs, IoT sensors); 2. Software & Code Assets (source code, AI models, ERP software); 3. Data & Information Assets (PII, healthcare records, financial ledgers); 4. Identity & Cryptographic Assets (master keys, SSL certificates, API tokens, admin credentials).",
    explanation: "A robust security architecture categorizes and inventories all four categories to eliminate blind spots.",
    hint: "Hardware (servers), Software (code), Data (customer records), and Identity/Cryptographic keys.",
    level: "basic",
    codeExample: "AssetCategories = ['Hardware Infrastructure', 'Software & Proprietary Code', 'Data & Information', 'Cryptographic Secrets'];"
  },
  {
    question: "What are 'Crown Jewels' in enterprise digital asset management?",
    shortAnswer: "The most vital, mission-critical digital assets that, if compromised, would result in existential ruin, catastrophic financial bankruptcy, or irreversible legal liability for the organization (e.g. master HSM encryption keys, proprietary semiconductor patents, core banking transaction ledgers).",
    explanation: "Crown jewels receive maximum layered defense, air-gapped isolation, and executive monitoring in Barrackpore.",
    hint: "The most valuable and critical 2% of company data that would destroy the business if stolen.",
    level: "moderate",
    codeExample: "CrownJewels = ['Core Banking Ledger', 'Master Cryptographic Root Key', 'AI Proprietary Weights', '85,000 Patient Genomic Records'];"
  },
  {
    question: "What is the four-tier Data Classification scheme (Public, Internal, Confidential, Restricted)?",
    shortAnswer: "1. Public: Freely shareable (press releases); 2. Internal: For employees only, low risk (office directory); 3. Confidential: Sensitive business data, high financial risk (pricing models, vendor contracts); 4. Restricted / Secret: Mission-critical crown jewels, catastrophic risk (Aadhaar databases, master keys).",
    explanation: "Allows security teams in Kolkata to allocate heavy encryption and DLP policies where they matter most.",
    hint: "Public (open), Internal (staff only), Confidential (business sensitive), Restricted (top secret crown jewels).",
    level: "basic",
    codeExample: "DataClassificationTiers = { Tier1: 'Public', Tier2: 'Internal', Tier3: 'Confidential', Tier4: 'Restricted / Secret' };"
  },
  {
    question: "What are the Six Stages of the Digital Asset Lifecycle?",
    shortAnswer: "1. Creation/Acquisition ➔ 2. Classification & Tagging ➔ 3. Storage & Encryption ➔ 4. Usage & Access Governance ➔ 5. Archiving & Backup ➔ 6. Secure Destruction / Sanitization.",
    explanation: "Security controls must govern the asset at every single phase; neglecting stage 6 (sanitization) leaves discarded hard drives readable by dump-diver hackers in Ichapur.",
    hint: "Create → Classify → Encrypt → Use → Archive → Destroy/Sanitize.",
    level: "expert",
    codeExample: "AssetLifecycle = ['Creation', 'Classification', 'Encryption', 'AccessGovernance', 'Archival', 'Sanitization'];"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Data Loss Prevention (DLP) & Tokenization Platform?",
    shortAnswer: "Approximately ₹4,80,000 to ₹11,00,000 per year (including endpoint agents for 200 users, network DLP inspection, and database tokenization vault).",
    explanation: "DLP software inspects emails, USB drives, and cloud uploads in real time to prevent unauthorized digital asset exfiltration in ₹.",
    hint: "Enterprise DLP platform costs ₹4,80,000 – ₹11,00,000 per year in Indian Rupees.",
    level: "moderate",
    codeExample: "Annual_DLP_Budget = ₹6,50,000; // 200 Endpoint DLP Licenses + Database Tokenization Gateway in Kolkata"
  },
  {
    question: "What is Data Tokenization and how does it protect payment card digital assets?",
    shortAnswer: "The process of replacing sensitive data (e.g. 16-digit credit card number) with a surrogate non-sensitive random token value (e.g. 'TKN-9832-X'); the original card data is stored in an isolated, encrypted token vault, making stolen database tokens completely useless to hackers.",
    explanation: "Mandated by the Reserve Bank of India (RBI) for all card-on-file e-commerce merchants in Kolkata.",
    hint: "Replacing real credit card numbers with fake random tokens so stolen database records are useless.",
    level: "moderate",
    codeExample: "Tokenization: '4532-7589-2234-1190' → TokenVault → 'TKN_88392_Z' (Stored in web database)"
  },
  {
    question: "What is a Software Bill of Materials (SBOM) and why is it a critical software asset inventory?",
    shortAnswer: "A formal, machine-readable inventory of all software components, open-source libraries, modules, and dependencies included in an application build; allows security teams to instantly identify if a newly disclosed zero-day (e.g. Log4j) exists in their code assets.",
    explanation: "Mandated for government and enterprise software procurement across India.",
    hint: "An ingredients list for software showing all open-source libraries and packages used.",
    level: "expert",
    codeExample: "SBOM_Format = { Standard: 'CycloneDX / SPDX', Dependencies: ['log4j-core@2.14.1', 'openssl@1.1.1k'] };"
  },
  {
    question: "What is 'Shadow IT' and why does it represent unmanaged digital asset risk?",
    shortAnswer: "Hardware devices, software applications, or cloud accounts deployed and used by employees without the knowledge, approval, or security oversight of the IT and cybersecurity department (e.g. an unmonitored AWS S3 bucket or personal Dropbox).",
    explanation: "Leaves confidential company blueprints unencrypted on public internet servers in Barrackpore.",
    hint: "Unapproved apps or cloud servers set up by staff without IT department permission or protection.",
    level: "basic",
    codeExample: "ShadowAssetRisk: Developer sets up personal AWS EC2 server → Leaves port 22 open → Infiltrated by botnet"
  },
  {
    question: "What is the difference between Data Masking (Static vs Dynamic) in asset protection?",
    shortAnswer: "Static Data Masking permanently replaces sensitive data with fictitious data in non-production test/development copies; Dynamic Data Masking masks sensitive data on-the-fly in real-time query outputs (e.g. showing 'XXXX-XXXX-1234' to call center staff while revealing the full number to senior managers).",
    explanation: "Allows software developers in Jadavpur to test application code against realistic databases without exposing real customer Aadhaar numbers.",
    hint: "Static masking alters test databases; Dynamic masking hides numbers on-screen based on who is looking.",
    level: "moderate",
    codeExample: "DynamicMasking: if (user.role == 'CallCenterAgent') return 'XXXX-XXXX-' + aadhaar.slice(-4); else return aadhaar;"
  },
  {
    question: "What is Cryptographic Key Lifecycle Management (CKLM) for digital assets?",
    shortAnswer: "The governance framework managing the end-to-end lifecycle of cryptographic keys: Generation (in HSM) ➔ Distribution ➔ Storage ➔ Rotation ➔ Revocation ➔ Destruction, ensuring keys are never exposed in cleartext.",
    explanation: "Mandates rotating database encryption keys every 90 to 365 days in Kolkata.",
    hint: "Managing encryption keys from birth to death: create, store, rotate, revoke, and destroy securely.",
    level: "expert",
    codeExample: "KeyLifecycle = ['HSM_Generate_AES256', 'Vaulted_Storage', 'Rotate_Every_90_Days', 'Crypto_Shred'];"
  },
  {
    question: "What is Media Sanitization & Crypto-Shredding (NIST SP 800-88)?",
    shortAnswer: "Media Sanitization ensures data cannot be recovered from retired storage drives via Overwriting (Clear), Degaussing (Purge), or Physical Shredding (Destroy); Crypto-Shredding deliberately deletes or destroys the encryption master key, rendering all underlying ciphertext permanently unrecoverable in microseconds.",
    explanation: "Allows cloud storage tenants in Ichapur to securely erase petabytes of virtual disk storage instantly.",
    hint: "Crypto-shredding deletes the encryption key, making millions of files instantly and permanently unreadable.",
    level: "expert",
    codeExample: "CryptoShredding: deleteKeyFromHSM(MasterKey_ID) => All 500 Terabytes of encrypted data rendered unreadable instantly."
  },
  {
    question: "What is a Configuration Management Database (CMDB) and IT Asset Management (ITAM)?",
    shortAnswer: "A centralized database storing an accurate, real-time inventory of all enterprise IT assets (hardware, virtual machines, cloud buckets, software packages, network switches) and their interdependencies, providing visibility for vulnerability patching.",
    explanation: "'You cannot protect what you do not know you own.' CMDB prevents unmanaged servers from escaping security patches in Barrackpore.",
    hint: "A master database listing every single server, laptop, router, and software app owned by the company.",
    level: "basic",
    codeExample: "CMDB_Entry = { Host: 'srv-db-01.kolkata.local', OS: 'Ubuntu 22.04', Owner: 'Finance', PatchLevel: 'Compliant' };"
  },
  {
    question: "How do Digital Rights Management (DRM) and Watermarking protect Intellectual Property assets?",
    shortAnswer: "DRM encrypts proprietary multimedia and educational content so it can only be decrypted by authenticated players; steganographic watermarking embeds invisible, unique user identifiers into documents to trace unauthorized leakers.",
    explanation: "If an employee leaks a proprietary engineering CAD document in Kolkata, the hidden watermark identifies the exact user account that downloaded it.",
    hint: "Watermarking hides invisible tracking codes in documents to catch employees who leak them.",
    level: "moderate",
    codeExample: "WatermarkEngine: EmbedInvisiblePayload(UserUUID = 'USR_9921', Timestamp) into Outbound_PDF;"
  },
  {
    question: "What is Endpoint Device Encryption (BitLocker / FileVault) and why is it mandatory for hardware assets?",
    shortAnswer: "Full-Disk Encryption (FDE) using AES-256 that encrypts the entire physical storage drive; if an employee’s laptop is physically stolen from a train or taxi in Barrackpore, the thief cannot read any corporate files without the TPM hardware key and boot password.",
    explanation: "Renders physical laptop theft a zero-data-loss incident under DPDPA 2023.",
    hint: "Encrypts the entire computer hard drive so thieves cannot read files if the laptop is stolen.",
    level: "basic",
    codeExample: "BitLocker_Status: Drive_C = 'AES-256-XTS Encrypted'; KeyProtector = 'TPM 2.0 + PIN';"
  },
  {
    question: "What is Personally Identifiable Information (PII) and Sensitive Personal Data (SPD)?",
    shortAnswer: "PII is any data that can identify an individual (Name, Phone, Email, Address); SPD includes highly sensitive categories requiring elevated legal protection under DPDPA (Biometrics, Genetic data, Health records, Financial bank details, Passwords).",
    explanation: "Healthcare clinics in Ichapur must store SPD in encrypted database columns with strict audit logging.",
    hint: "PII is name and email; SPD is medical records, biometrics, and banking passwords.",
    level: "basic",
    codeExample: "SPD_Categories = ['Biometric Fingerprints', 'Medical Lab Diagnosis', 'Bank Account Numbers', 'Aadhaar ID'];"
  },
  {
    question: "What is an Air-Gapped Immutable Backup Vault for digital asset preservation?",
    shortAnswer: "A Write-Once-Read-Many (WORM) backup storage repository physically or logically disconnected from the production network, preventing ransomware malware from modifying, deleting, or encrypting backup snapshots.",
    explanation: "Guarantees 100% recovery of financial ledgers in Kolkata even if the entire production domain controller is wiped.",
    hint: "A backup storage system that cannot be edited or deleted by hackers once written.",
    level: "moderate",
    codeExample: "WORM_Vault: FileWritten('Backup_2026.bak') → LockRetentionPeriod('365 Days') → ImmutablyLocked"
  },
  {
    question: "How does Hardware Security Module (HSM) key isolation prevent asset theft?",
    shortAnswer: "HSMs are physical tamper-responsive crypto-processors; private cryptographic keys are generated inside the silicon and never leave the hardware chip in plaintext; cryptographic signing happens directly on-chip.",
    explanation: "If an adversary compromises the server operating system in Jadavpur, they cannot extract the private key from the HSM.",
    hint: "A special tamper-proof hardware chip where encryption keys live and can never be exported in cleartext.",
    level: "expert",
    codeExample: "HSM_Sign: Payload → SentToHSM → SignedInsideSilicon(PrivateKey) → Returns Signature (Key never exposed)"
  },
  {
    question: "What is Data Loss Prevention (DLP) Content Inspection (Regex & Machine Learning)?",
    shortAnswer: "DLP engines inspect network packets, emails, and clipboard pastes using regular expressions (detecting 16-digit credit cards or 12-digit Aadhaar numbers) and ML document fingerprinting, blocking transmissions that violate policies.",
    explanation: "Blocks an employee in Barrackpore from attaching customer tax spreadsheets to a personal Gmail account.",
    hint: "Scans emails and USB transfers for credit card and Aadhaar numbers, blocking unauthorized leaks.",
    level: "moderate",
    codeExample: "DLP_Rule: if (regexMatch('^[2-9]{1}[0-9]{3}\\\\s[0-9]{4}\\\\s[0-9]{4}$') > 5) blockOutboundEmail();"
  },
  {
    question: "What is Cloud Storage Bucket Misconfiguration and why is it a primary asset leak vector?",
    shortAnswer: "Accidentally setting cloud object storage permissions (e.g. AWS S3 bucket, Azure Blob) to 'Public Read', allowing anyone on the public Internet to download confidential corporate assets without authentication.",
    explanation: "Responsible for exposing hundreds of millions of citizen records worldwide; remediated via automated CSPM tools in Kolkata.",
    hint: "Leaving an online cloud folder set to 'Public' so anyone on Google can download private company files.",
    level: "basic",
    codeExample: "CSPM_Remediation: if (s3Bucket.PublicAccess == true) enforceBlockPublicAccess() && alertAdmin();"
  },
  {
    question: "What is the role of Secrets Management (HashiCorp Vault / AWS Secrets Manager)?",
    shortAnswer: "A centralized software platform that securely stores, rotates, and dispenses database passwords, API tokens, and SSH keys to microservices at runtime, eliminating hardcoded plaintext passwords in source code repositories.",
    explanation: "Prevents junior developers in Jadavpur from accidentally committing production database passwords to public GitHub repos.",
    hint: "A secure digital safe that dispenses database passwords to software apps dynamically at runtime.",
    level: "moderate",
    codeExample: "SecretsVault: fetchDatabasePassword(Role = 'PaymentService') → Returns temporary 15-minute token."
  },
  {
    question: "What is Orphaned Asset and Zombie Server Risk in cloud environments?",
    shortAnswer: "Legacy virtual machines, unattached storage volumes, or test databases created for temporary projects and forgotten by developers; they remain running without security patches or monitoring, serving as easy entry points for attackers.",
    explanation: "Cloud asset discovery tools in Kolkata scan for idle resources and terminate unmanaged zombie servers.",
    hint: "Old, forgotten test servers that nobody uses but hackers find because they never get updated.",
    level: "basic",
    codeExample: "ZombieServerDetection: if (cpuUtilization < 1% for 30_Days && ownerUnreachable) quarantineServer();"
  },
  {
    question: "How does Code Signing guarantee the Integrity and Authenticity of software assets?",
    shortAnswer: "Developers digitally sign software executable binaries with an X.509 code-signing certificate; the operating system verifies the signature before execution, blocking modified or malware-infected executables from launching.",
    explanation: "Prevents attackers in Barrackpore from trojanizing company software update packages.",
    hint: "Digital stamps on software that prove the code was written by the real company and not tampered with.",
    level: "moderate",
    codeExample: "CodeSigning: signtool sign /f CompanyCert.pfx /t http://timestamp.digicert.com Application.exe"
  },
  {
    question: "What is the difference between Structured Data and Unstructured Data asset protection?",
    shortAnswer: "Structured Data resides in organized databases (tables/rows) protected via column-level encryption and SQL firewalls; Unstructured Data exists in PDFs, Word docs, emails, and images, requiring DLP content scanning, metadata tagging, and IRM encryption.",
    explanation: "Over 80% of an enterprise's digital assets in Kolkata exist as unmanaged unstructured files.",
    hint: "Structured is organized in database tables; Unstructured is scattered across Word docs, PDFs, and emails.",
    level: "moderate",
    codeExample: "AssetForms = { Structured: 'MySQL / PostgreSQL (AES-256-GCM)', Unstructured: 'PDFs / Word Docs (DLP + IRM)' };"
  },
  {
    question: "What is Information Rights Management (IRM) / Azure Information Protection (AIP)?",
    shortAnswer: "Security technology that embeds persistent encryption and usage policies directly inside documents (e.g. allowing read-only access, disabling printing, preventing screen capture, and expiring access after 30 days even outside the corporate network).",
    explanation: "Ensures that even if an engineering blueprint is forwarded to an outside vendor in Ichapur, unauthorized users cannot open it.",
    hint: "Locks down Word/PDF files so they cannot be printed, copied, or forwarded to outside people.",
    level: "expert",
    codeExample: "AIP_Policy: Document.setPermissions({ AllowPrint: false, AllowForward: false, ExpireAfterDays: 30 });"
  },
  {
    question: "What is Database Activity Monitoring (DAM) for crown jewel database protection?",
    shortAnswer: "A specialized security tool that monitors and analyzes all database transactions (SELECT, INSERT, UPDATE, DELETE) in real time directly on network taps, detecting anomalous bulk data downloads and SQL injection attacks independently of native database logs.",
    explanation: "Alerts security teams in Barrackpore if a DBA account queries 100,000 credit card numbers at midnight.",
    hint: "Watches database queries in real time to catch employees downloading massive amounts of data.",
    level: "expert",
    codeExample: "DAM_Alert: if (query.rowsReturned > 50000 && query.time == '02:30:00') triggerCriticalAlert() && blockSession();"
  },
  {
    question: "What is Data Minimization under modern asset governance frameworks?",
    shortAnswer: "The principle of collecting, processing, and retaining only the minimum amount of personal digital assets strictly necessary to accomplish a specific business purpose, and deleting the data once the purpose is fulfilled.",
    explanation: "Reduces an enterprise's liability and breach blast radius under India's DPDPA 2023 in Kolkata.",
    hint: "Only collecting the minimum personal data you actually need, deleting it as soon as you are done.",
    level: "basic",
    codeExample: "DataMinimization: Collect(DeliveryAddress) → CompleteDelivery() → PurgeAddressAfter30Days();"
  },
  {
    question: "Why are API Keys and OAuth Tokens high-value digital identity assets?",
    shortAnswer: "APIs connect microservices and third-party integrations; stolen API keys grant programmatic, unrestricted read/write access to backend databases, completely bypassing web login pages, CAPTCHAs, and multi-factor authentication.",
    explanation: "A leaked Stripe or AWS API key on GitHub can allow attackers to drain bank accounts or spin up crypto-mining servers within seconds.",
    hint: "API keys are master computer passwords that let programs bypass web login screens entirely.",
    level: "moderate",
    codeExample: "API_Security: EnforceTokenExpiration(15_Min) + RotateKeysMonthly() + ScanPublicReposForLeakedSecrets();"
  },
  {
    question: "What is Asset Tagging & Automated Metadata Indexing in enterprise security?",
    shortAnswer: "Attaching cryptographic, searchable metadata tags (e.g. `Confidentiality: Restricted`, `Owner: Finance_Dept`, `DPDPA: Contains_PII`) to data files and cloud resources, enabling automated firewalls and DLP engines to enforce appropriate protection policies.",
    explanation: "Ensures automated cloud policies in Jadavpur automatically encrypt any storage bucket tagged with `Contains_PII`.",
    hint: "Labeling files and servers with digital tags so automated security tools know how to protect them.",
    level: "basic",
    codeExample: "ResourceTagging: AWS_S3.setTags({ 'DataSensitivity': 'Restricted', 'Compliance': 'DPDPA_Mandated' });"
  },
  {
    question: "What is the ultimate golden rule for discovering, classifying, and protecting Digital Assets?",
    shortAnswer: "'Maintain an automated, real-time inventory of all hardware, software, data, and cryptographic assets; classify data into sensitivity tiers; guard crown jewels with tokenization and HSMs; enforce crypto-shredding at retirement; and budget asset security in Indian Rupees (₹)!'",
    explanation: "This complete rule captures full asset lifecycle governance, discovery, classification, cryptographic protection, sanitization, and financial budgeting.",
    hint: "Inventory all assets + Classify data + Protect crown jewels + Crypto-shred at end + Budget in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: InventoryAllAssets() → ClassifyTiers() → TokenizeCrownJewels() → EnforceCryptoShredding() → BudgetInRupees(₹);"
  }
];

export default questions;
