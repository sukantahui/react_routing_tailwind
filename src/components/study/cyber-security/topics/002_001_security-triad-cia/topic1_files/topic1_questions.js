// topic1_questions.js
// 30 Moderate to Expert Questions on Confidentiality: Concepts and Controls

const questions = [
  {
    question: "What is the primary objective of the Confidentiality pillar in cybersecurity?",
    shortAnswer: "To restrict data access, viewing, and extraction exclusively to authorized entities, processes, and users, preventing unauthorized disclosure across storage, transmission, and computation.",
    explanation: "Confidentiality ensures privacy, protects intellectual property, and maintains regulatory compliance across digital ecosystems.",
    hint: "Preventing unauthorized eyes from reading or leaking sensitive data.",
    level: "basic",
    codeExample: "if (!authContext.hasRole('AUTHORIZED_VIEWER')) throw new AccessDeniedException();"
  },
  {
    question: "What are the three fundamental states of digital data that require confidentiality controls?",
    shortAnswer: "1) Data-at-Rest (stored on disks, databases, backups); 2) Data-in-Transit (moving across networks, internet, APIs); and 3) Data-in-Use (active in CPU registers, RAM cache, and memory buffers).",
    explanation: "Securing only network traffic leaves stored disks vulnerable, and securing disks leaves live memory dumps vulnerable.",
    hint: "Rest (storage), Transit (network), and Use (RAM/CPU).",
    level: "basic",
    codeExample: "DataStates = ['Data-at-Rest', 'Data-in-Transit', 'Data-in-Use'];"
  },
  {
    question: "Which cryptographic algorithm is universally recognized as the gold standard for securing Data-at-Rest?",
    shortAnswer: "AES-256 (Advanced Encryption Standard with a 256-bit key), specifically using Galois/Counter Mode (GCM) for authenticated encryption or XTS mode for full-disk encryption (FDE).",
    explanation: "AES-256 offers 2^256 key combinations, making brute-force mathematically impossible with current and foreseeable classical computing.",
    hint: "Symmetric block cipher standard using 256-bit keys and GCM/XTS modes.",
    level: "basic",
    codeExample: "Cipher cipher = Cipher.getInstance('AES/GCM/NoPadding');\ncipher.init(Cipher.ENCRYPT_MODE, secretKey256, gcmParameterSpec);"
  },
  {
    question: "How does TLS 1.3 enforce confidentiality for Data-in-Transit compared to legacy protocols?",
    shortAnswer: "TLS 1.3 mandates Perfect Forward Secrecy (PFS) via Ephemeral Diffie-Hellman (ECDHE), removes insecure legacy ciphers (RC4, DES, static RSA key exchange), and encrypts the handshake certificates, reducing latency to 1-RTT (or 0-RTT).",
    explanation: "Even if a server's private master key is compromised years later, past TLS 1.3 captured traffic cannot be decrypted.",
    hint: "Mandates ephemeral key exchange so past recorded traffic remains encrypted forever.",
    level: "moderate",
    codeExample: "ssl_protocols TLSv1.3;\nssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;"
  },
  {
    question: "What is Confidential Computing and how does it protect Data-in-Use?",
    shortAnswer: "It protects data active in memory by performing computation inside a hardware-isolated Trusted Execution Environment (TEE) or secure enclave (such as Intel SGX or AMD SEV), encrypting memory so even the hypervisor or OS kernel cannot read it.",
    explanation: "Essential for multi-tenant cloud environments where hospital patients' or financial records reside in shared RAM.",
    hint: "Hardware-isolated secure enclaves in CPU/RAM that block host OS snooping.",
    level: "expert",
    codeExample: "sgx_enclave_create('secure_vault.signed.so', true, &token, &updated, &eid, NULL);"
  },
  {
    question: "What is the typical cost in Indian Rupees (₹) for deploying an Enterprise Data Loss Prevention (DLP) Appliance in Kolkata?",
    shortAnswer: "Approximately ₹8,50,000 to ₹22,00,000 for a multi-gigabit network and endpoint DLP cluster with 1,000 agent licenses, OCR scanning, and automated USB/email exfiltration blocking.",
    explanation: "Enterprise DLP systems scan outgoing web, email, and portable storage channels to stop accidental or deliberate customer data leaks.",
    hint: "Enterprise DLP hardware and agent cluster costs ₹8,50,000 – ₹22,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "EnterpriseDLP_Cost = ₹14,50,000; // Network & Endpoint DLP deployment in Salt Lake, Kolkata"
  },
  {
    question: "How does Role-Based Access Control (RBAC) enforce the Principle of Least Privilege for confidentiality?",
    shortAnswer: "By grouping permissions into discrete administrative or job roles (e.g. Doctor, Pharmacist, Billing Specialist) and assigning users strictly to roles matching their verified duties, preventing blanket administrative access.",
    explanation: "RBAC simplifies audit trails and ensures employees cannot view records outside their job scope.",
    hint: "Users are assigned roles, and roles have explicit, minimal permissions.",
    level: "basic",
    codeExample: "CREATE ROLE DoctorRole;\nGRANT SELECT ON PatientPrescriptions TO DoctorRole;\n-- Billing cannot view clinical notes"
  },
  {
    question: "What is Attribute-Based Access Control (ABAC) and why is it superior to static RBAC in complex environments?",
    shortAnswer: "ABAC evaluates dynamic boolean policies combining Subject attributes (user department, clearance), Resource attributes (data sensitivity tier), Action attributes (read/export), and Environmental attributes (IP location, time of day, device posture).",
    explanation: "Allows rules like: 'Allow Doctor to view patient chart only if accessed from hospital IP during on-duty shift on a managed device'.",
    hint: "Evaluates subject, object, action, and dynamic context like IP and time.",
    level: "expert",
    codeExample: "Permit rule IF subject.role == 'Doctor' && resource.type == 'EHR' && environment.network == 'HOSPITAL_WIFI_ICHAPUR';"
  },
  {
    question: "What is Discretionary Access Control (DAC) vs Mandatory Access Control (MAC)?",
    shortAnswer: "In DAC, the resource owner determines who is granted access (common in Windows/Linux file permissions); in MAC, a centralized security authority enforces rigid sensitivity labels (e.g. Top Secret, Secret) which users cannot override (common in SELinux, military).",
    explanation: "MAC prevents a compromised user from re-sharing sensitive files with unauthorized third parties.",
    hint: "DAC gives owner control; MAC enforces centralized mandatory security labels.",
    level: "moderate",
    codeExample: "// DAC: chmod 777 file.txt (User decides)\n// MAC: SELinux label top_secret_t (Enforced by kernel policy)"
  },
  {
    question: "What is the Bell-LaPadula Security Model and which confidentiality rules does it enforce?",
    shortAnswer: "A formal state machine model enforcing confidentiality in multi-level security systems via two rules: 1) Simple Security Property: 'No Read Up' (cannot read higher clearance data); and 2) *-Property (Star Property): 'No Write Down' (cannot write data to lower clearance levels).",
    explanation: "Prevents a user with Top Secret clearance from accidentally or maliciously copying classified intelligence into an Unclassified document.",
    hint: "No Read Up, No Write Down model designed specifically for confidentiality.",
    level: "expert",
    codeExample: "if (subject.clearance < object.classification) denyRead(); // No Read Up\nif (subject.clearance > target.classification) denyWrite(); // No Write Down"
  },
  {
    question: "What is Dynamic Data Masking (DDM) and where is it implemented?",
    shortAnswer: "DDM obfuscates sensitive data (such as masking credit card numbers to 'XXXX-XXXX-XXXX-1234' or Aadhaar to 'XXXX-XXXX-5678') on-the-fly as queries execute, preventing database admins and support staff from viewing cleartext.",
    explanation: "The underlying data remains intact in encrypted storage, but the presentation layer transforms it in real time.",
    hint: "Masks card or Aadhaar digits on the fly so operators cannot view full numbers.",
    level: "moderate",
    codeExample: "ALTER TABLE Customers ALTER COLUMN AadhaarNumber ADD MASKED WITH (FUNCTION = 'partial(0, \"XXXX-XXXX-\", 4)');"
  },
  {
    question: "How does Tokenization preserve confidentiality while enabling payment processing?",
    shortAnswer: "By replacing high-value sensitive data (like 16-digit PANs) with a non-sensitive, randomly generated surrogate value (token) of identical format; the true cardholder data is stored exclusively in a hardened, isolated Token Vault.",
    explanation: "If a merchant's database in Barrackpore is hacked, the attacker acquires meaningless tokens that cannot be reversed without the isolated vault.",
    hint: "Swapping real card numbers with random surrogate tokens.",
    level: "moderate",
    codeExample: "String token = tokenVault.tokenize(realCardNumber); // e.g. '9482-1049-5501-9921' -> 'tok_8f93a10c'"
  },
  {
    question: "What is Crypto-Shredding (Cryptographic Erasure)?",
    shortAnswer: "A data sanitization method where the unique encryption key used to encrypt a specific dataset is deliberately deleted or overwritten, rendering the encrypted data irrevocably unreadable and indecipherable across all cloud replicas.",
    explanation: "Crucial for compliance with 'Right to be Forgotten' under data protection laws when physical media destruction is impossible.",
    hint: "Deleting the encryption key so the encrypted data can never be decrypted again.",
    level: "expert",
    codeExample: "kmsClient.deleteKey('KEY_ID_MAMATA_PATIENT_2026'); // All associated ciphertexts become permanently useless"
  },
  {
    question: "What is Data Classification and how does it drive confidentiality controls?",
    shortAnswer: "The systematic categorization of organizational data into sensitivity tiers (e.g. Public, Internal, Confidential, Restricted/Secret) based on the business, legal, and financial damage resulting from unauthorized disclosure.",
    explanation: "Each tier dictates automated mandatory controls: Restricted requires AES-256, HSM key storage, and dual-custody access.",
    hint: "Categorizing files into Public, Internal, Confidential, and Secret tiers.",
    level: "basic",
    codeExample: "enum SensitivityTier { PUBLIC, INTERNAL_USE, CONFIDENTIAL, STRICTLY_CONFIDENTIAL };"
  },
  {
    question: "How do Hardware Security Modules (HSMs) protect Master Encryption Keys from memory extraction?",
    shortAnswer: "HSMs are physical, tamper-responsive cryptographic hardware units certified under FIPS 140-2/3 Level 3 or 4; if physical probing or unauthorized bus tapping is detected, the HSM automatically zeroes its volatile memory (tamper-zeroization).",
    explanation: "Private keys generated inside the HSM boundary never enter host server operating system RAM.",
    hint: "Tamper-zeroizing dedicated chips that keep private keys off server RAM.",
    level: "expert",
    codeExample: "hsm.generateAsymmetricKeyPair(KeyType.RSA_4096, SecurityPolicy.NON_EXPORTABLE);"
  },
  {
    question: "What is Full Disk Encryption (FDE) and what threat does it mitigate?",
    shortAnswer: "FDE (e.g. BitLocker, LUKS, FileVault) encrypts the entire storage volume at the hardware/sector level, protecting data confidentiality against physical device theft or unauthorized drive removal from laptops and servers.",
    explanation: "FDE requires a pre-boot PIN or TPM chip attestation to unlock the storage volume during boot.",
    hint: "Encrypts the entire hard drive to stop thieves from reading files if a laptop is stolen.",
    level: "basic",
    codeExample: "cryptsetup luksFormat /dev/nvme0n1p3 --cipher aes-xts-plain64 --key-size 512"
  },
  {
    question: "What is Key Encryption Key (KEK) vs Data Encryption Key (DEK) in Envelope Encryption?",
    shortAnswer: "Envelope encryption uses a local DEK to encrypt the actual data payload; the DEK is then encrypted using a higher-level KEK stored securely in an HSM or Key Management Service (KMS).",
    explanation: "Allows rapid bulk encryption with local DEKs while keeping root master KEKs strictly protected.",
    hint: "DEK encrypts the data; KEK encrypts the DEK.",
    level: "moderate",
    codeExample: "EncryptedData = Encrypt(Data, DEK);\nEncryptedDEK = Encrypt(DEK, KEK_in_KMS);\nSave(EncryptedData, EncryptedDEK);"
  },
  {
    question: "How does Network Microsegmentation prevent confidentiality breaches across internal enterprise networks?",
    shortAnswer: "By dividing the internal network into granular, isolated zones using software-defined firewalls and VLANs, restricting lateral traffic so an attacker compromising an accounting machine in Barrackpore cannot reach core payment databases.",
    explanation: "Enforces Zero Trust: every east-west connection across subnets requires authentication and packet filtering.",
    hint: "Isolating internal network subnets to stop hackers from moving sideways.",
    level: "moderate",
    codeExample: "zone 'FINTECH_CORE' { deny all; allow from 'APP_TIER' on port 5432 with mTLS; }"
  },
  {
    question: "What is Steganography and how does it differ from Cryptography in protecting confidentiality?",
    shortAnswer: "Cryptography encrypts a message so its content is incomprehensible (obvious ciphertext); Steganography conceals the very existence of the secret message inside an innocuous carrier file (like hiding binary data in image pixels).",
    explanation: "Combining both (encrypting with AES-256, then hiding in a carrier image) achieves both secrecy and concealment.",
    hint: "Cryptography hides meaning; Steganography hides the existence of the message.",
    level: "moderate",
    codeExample: "embedInLeastSignificantBits(carrierImageBitmap, encryptedSecretBytes);"
  },
  {
    question: "What is the role of an Air Gap in protecting the confidentiality of national defense systems?",
    shortAnswer: "An Air Gap ensures that critical computers and control systems have zero physical, wireless, or logical connections to the internet or any external network, defeating remote network-based exfiltration.",
    explanation: "Strict physical media scanning protocols and optical data diodes are required to transfer files across the air gap.",
    hint: "Physically isolating computers with zero internet or external network cables.",
    level: "basic",
    codeExample: "AirGapEnforcement = { NIC_Disabled: true, Bluetooth_Removed: true, PhysicalShielding: 'Faraday Cage' };"
  },
  {
    question: "How does Optical Data Diode hardware enforce unidirectional confidentiality?",
    shortAnswer: "A hardware data diode uses a physical single fiber-optic strand (one LED emitter and one photodetector) allowing light pulses to travel in only one direction, mathematically making data exfiltration in reverse physically impossible.",
    explanation: "Used to allow SCADA telemetry out of a power grid while preventing any incoming command or reverse leak.",
    hint: "Physical one-way optical fiber that guarantees data cannot travel in the reverse direction.",
    level: "expert",
    codeExample: "DataDiodeDirection = TransmitOnly_LED -> SingleFiberStrand -> ReceiveOnly_Photodetector;"
  },
  {
    question: "What is Data Ingress vs Data Egress filtering in firewall security?",
    shortAnswer: "Ingress filtering inspects incoming traffic entering the network boundary; Egress filtering inspects and restricts outgoing traffic leaving internal systems, blocking compromised hosts from transmitting stolen files to external C2 servers.",
    explanation: "Strict egress filtering (e.g. blocking all outbound ports except 443 via inspected proxies) stops backdoor exfiltration.",
    hint: "Ingress filters incoming traffic; Egress filters outgoing traffic to prevent data leaks.",
    level: "moderate",
    codeExample: "iptables -A OUTPUT -p tcp --dport 22 -j DROP # Blocks unauthorized outbound SSH exfiltration"
  },
  {
    question: "What is Shoulder Surfing and what physical controls mitigate it?",
    shortAnswer: "A direct physical social engineering attack where an unauthorized person observes screen displays, passwords, or ATM PINs over a victim's shoulder; mitigated using polarized privacy filters, biometric readers, and angled workstation cubicles.",
    explanation: "Common in public cafes, airports, and open-plan bank branches in Kolkata.",
    hint: "Spying on someone's screen over their shoulder; stopped by polarized privacy screen filters.",
    level: "basic",
    codeExample: "PhysicalControl = 'Polarized Screen Filter with 30-degree narrow viewing angle';"
  },
  {
    question: "How do Optical Character Recognition (OCR) engines inside DLP solutions protect confidentiality?",
    shortAnswer: "OCR scans scanned PDFs, image screenshots, handwritten invoices, and photographs attached to emails, extracting text and regex patterns (like PAN/Aadhaar) that standard text filters miss.",
    explanation: "Prevents rogue employees from bypassing email filters by taking screenshots of confidential spreadsheets.",
    hint: "Extracts text from screenshots and photos to detect leaked card or Aadhaar numbers.",
    level: "moderate",
    codeExample: "String extractedText = ocrEngine.scanImage(attachmentJpeg);\nif (containsAadhaar(extractedText)) blockEmail();"
  },
  {
    question: "What is the Biba Model and why is it NOT focused on confidentiality?",
    shortAnswer: "The Biba Model is a formal security model designed exclusively for Data Integrity ('No Read Down', 'No Write Up'); in contrast to Bell-LaPadula which addresses Confidentiality ('No Read Up', 'No Write Down').",
    explanation: "Using Biba to protect confidentiality is an architectural error; Biba protects against corruption, not snooping.",
    hint: "Biba is for Integrity (No Read Down); Bell-LaPadula is for Confidentiality (No Read Up).",
    level: "expert",
    codeExample: "BibaRule: if (subject.integrity < object.integrity) denyWrite(); // Focuses on Integrity"
  },
  {
    question: "How does Mutual TLS (mTLS) provide dual confidentiality and authentication for microservice APIs?",
    shortAnswer: "Both client and server present and cryptographically validate each other's X.509 digital certificates before establishing an encrypted TLS 1.3 tunnel, ensuring only authorized microservices can send or receive sensitive payloads.",
    explanation: "Prevents rogue pods in Kubernetes clusters from intercepting inter-service API communications.",
    hint: "Both client and server authenticate each other with certificates before encrypting traffic.",
    level: "expert",
    codeExample: "curl --cert client.crt --key client.key --cacert ca.crt https://api.kolkata-fintech.internal:8443/v1/ledger"
  },
  {
    question: "What is Ephemeral Key Exchange and why is it essential for long-term confidentiality?",
    shortAnswer: "A cryptographic mechanism (like ECDHE) where temporary, disposable key pairs are generated for each individual session; even if private master keys are stolen in the future, past recorded communications cannot be decrypted.",
    explanation: "Provides Perfect Forward Secrecy (PFS), protecting historical communications against nation-state storage.",
    hint: "Creates disposable keys per session so past traffic can never be retroactively decrypted.",
    level: "moderate",
    codeExample: "KeyPair ephemeralKey = generateECDHKeyPair(); // Discarded immediately after session handshake"
  },
  {
    question: "What is Watermarking vs Fingerprinting in tracking confidential document leaks?",
    shortAnswer: "Watermarking embeds a visible or invisible copyright tag across all copies; Fingerprinting embeds a unique recipient-specific identifier (e.g. embedding employee ID 4082) into each downloaded document to forensically pinpoint the exact leaker.",
    explanation: "Used by research organizations in Jadavpur to trace unauthorized source code dissemination.",
    hint: "Fingerprinting puts a unique recipient tag in every downloaded file to catch who leaked it.",
    level: "moderate",
    codeExample: "embedDocumentFingerprint(pdfDoc, 'ISSUED_TO_MAHIMA_ICHAPUR_EMP_9042');"
  },
  {
    question: "How does the principle of Separation of Duties (SoD) enforce confidentiality?",
    shortAnswer: "By dividing critical tasks among multiple individuals so no single person has complete unilateral authority or visibility to execute sensitive actions (e.g. one employee generates encryption keys, another approves decryption requests).",
    explanation: "Mitigates insider threat risks and prevents rogue employees from orchestrating solitary data breaches.",
    hint: "Dividing a sensitive workflow so no single employee has complete control or visibility.",
    level: "moderate",
    codeExample: "if (request.initiator == request.approver) throw new SecurityViolation('Dual Authorization Required');"
  },
  {
    question: "What is the ultimate golden rule for implementing and maintaining Confidentiality controls?",
    shortAnswer: "'Classify all data at origin, enforce AES-256 for data-at-rest, mandate TLS 1.3 with Perfect Forward Secrecy for data-in-transit, isolate memory using secure enclaves for data-in-use, govern access with granular ABAC and least privilege, and budget enterprise DLP and HSM infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes lifecycle data encryption, strict access governance, zero trust policies, and enterprise procurement budgeting.",
    hint: "Encrypt in all 3 states, enforce least privilege and ABAC, and budget in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ClassifyData() -> Encrypt(Rest, Transit, Use) -> EnforceABAC() -> BudgetInRupees(₹);"
  }
];

export default questions;
