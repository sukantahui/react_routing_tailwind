// topic3_questions.js
// 30 Moderate to Expert Questions on Integrity: Data Accuracy and Trust

const questions = [
  {
    question: "What is Data Integrity in the context of the CIA Triad?",
    shortAnswer: "The cybersecurity assurance that information, software, or system configurations remain accurate, authentic, complete, and uncorrupted by unauthorized modification, tampering, or accidental deletion throughout their lifecycle.",
    explanation: "Integrity guarantees that data received or stored is identical to what was originally created by an authorized entity.",
    hint: "Ensuring data is accurate, authentic, and has not been altered without authorization.",
    level: "basic",
    codeExample: "IsDataIntact = (ComputedHash === StoredAuthenticHash);"
  },
  {
    question: "What is the key difference between Data Integrity and System Integrity?",
    shortAnswer: "Data Integrity focuses on the correctness and untampered state of stored files, database records, and network packets; System Integrity ensures that hardware, OS kernels, firmware, and services operate predictably without unauthorized state modifications.",
    explanation: "System integrity creates the trusted compute foundation necessary to uphold data integrity.",
    hint: "Data integrity is about files and records; system integrity is about OS and hardware stability.",
    level: "moderate",
    codeExample: "SystemIntegrity = SecureBootVerified && KernelUnmodified && TPM_PCR_Valid;"
  },
  {
    question: "Why are cryptographic hash functions called 'one-way functions'?",
    shortAnswer: "Given an arbitrary input data x, it is computationally trivial to compute the digest H(x), but computationally infeasible to reverse H(x) back to determine the original input x (Preimage Resistance).",
    explanation: "One-way hashing ensures signatures and integrity verifications cannot leak sensitive raw data.",
    hint: "Easy to calculate forward, impossible to reverse backward to find the original text.",
    level: "basic",
    codeExample: "Digest = SHA256('Payroll_₹4,50,000'); // Cannot derive plaintext from Digest"
  },
  {
    question: "What is the Avalanche Effect in secure hashing algorithms (e.g. SHA-256)?",
    shortAnswer: "A property where a single-bit flip or minor alteration in the input data results in a drastically different, seemingly random hash digest across more than 50% of the output bits.",
    explanation: "Ensures that even microscopic data tampering or corruption is instantly noticeable.",
    hint: "Changing a single letter causes the entire hash digest to change completely.",
    level: "basic",
    codeExample: "SHA256('Kolkata') => b89...4a\nSHA256('kolkata') => 71f...c9 // Completely different"
  },
  {
    question: "Why are MD5 and SHA-1 deprecated and prohibited for cryptographic integrity verification?",
    shortAnswer: "Both algorithms suffer from practical Collision Attacks (e.g. SHAttered attack on SHA-1 in 2017), where attackers can craft two completely different files (like a harmless PDF and a malicious contract) that produce the exact same hash.",
    explanation: "Security standards mandate SHA-256, SHA-512, SHA-3, or BLAKE3 for all security-critical operations.",
    hint: "Attackers can generate two different files that produce the exact same MD5 or SHA-1 hash.",
    level: "moderate",
    codeExample: "// Vulnerable: MD5(fileA) === MD5(fileB) with crafted collisions"
  },
  {
    question: "What is the Birthday Paradox in the context of cryptographic hash collisions?",
    shortAnswer: "A mathematical probability principle stating that finding any two inputs with identical hash digests requires only approximately 2^(n/2) operations for an n-bit hash, drastically lower than brute-forcing a specific target hash (2^n).",
    explanation: "An n-bit hash algorithm only provides n/2 bits of collision resistance against quantum or brute-force adversaries.",
    hint: "Finding any collision is much easier (2^(n/2)) than targeting one specific hash.",
    level: "expert",
    codeExample: "CollisionResistance = 2 ** (HashBits / 2); // SHA-256 offers 128-bit collision resistance"
  },
  {
    question: "How does a Hash-based Message Authentication Code (HMAC) guarantee both integrity and authenticity?",
    shortAnswer: "HMAC combines a cryptographic hash function (e.g. SHA-256) with a pre-shared secret key (K); an attacker can recalculate a hash of modified data, but cannot produce a valid HMAC without possessing the secret key.",
    explanation: "Protects against tampering while proving that the sender possesses the shared secret key.",
    hint: "Hashing the message together with a secret key so attackers cannot forge the hash.",
    level: "moderate",
    codeExample: "HMAC = Hash(Key_Opad || Hash(Key_Ipad || Message));"
  },
  {
    question: "What is the Biba Integrity Model and what are its two core mathematical axioms?",
    shortAnswer: "A formal security model focused strictly on integrity (the inverse of Bell-LaPadula), enforcing: 1) Simple Integrity Axiom ('No Read Down'): A subject cannot read an object of lower integrity; 2) *-Integrity Property ('No Write Up'): A subject cannot write or alter an object of higher integrity.",
    explanation: "Prevents dirty, untrusted, or malicious data from corrupting high-integrity corporate processes.",
    hint: "No Read Down (don't read dirty data) and No Write Up (don't contaminate high-integrity files).",
    level: "expert",
    codeExample: "BibaRules = {\n  SimpleIntegrity: 'Subject_Level <= Object_Level to Read',\n  StarIntegrity: 'Subject_Level >= Object_Level to Write'\n};"
  },
  {
    question: "What is the Clark-Wilson Integrity Model and how does it prevent commercial data tampering?",
    shortAnswer: "A business-oriented integrity model enforcing Well-Formed Transactions (Transformational Procedures - TPs) and Separation of Duties, ensuring users can only modify Constrained Data Items (CDIs) through certified programs after Integrity Verification Procedures (IVPs).",
    explanation: "Prevents internal fraud in banking (e.g. ensuring the person who creates an invoice cannot approve the payment).",
    hint: "Ensures data can only be changed via certified transactions and enforces separation of duties.",
    level: "expert",
    codeExample: "ClarkWilson = CDI(Data) → TP(CertifiedTransaction) → IVP(Verification) → DualApproval();"
  },
  {
    question: "How does a Digital Signature provide Non-Repudiation in addition to data integrity?",
    shortAnswer: "The sender hashes the payload and encrypts the digest with their private key; recipients verify the signature using the sender's public key. Because only the sender holds the private key, they cannot deny having authored and sent the untampered document.",
    explanation: "Non-repudiation prevents legal dispute in transactions, contracts, and software updates.",
    hint: "Encrypting a hash with a private key proves authorship and prevents denying sending it.",
    level: "moderate",
    codeExample: "Signature = Encrypt(SHA256(Contract), Sender_PrivateKey);\nIsValid = Decrypt(Signature, Sender_PublicKey) === SHA256(ReceivedContract);"
  },
  {
    question: "What is File Integrity Monitoring (FIM) and how does it detect unauthorized server changes?",
    shortAnswer: "A security process (e.g. Tripwire, OSSEC, Wazuh) that periodically scans critical OS system binaries, configuration files (/etc/passwd, kernel configs), and registry keys against a baseline cryptographic hash database, alerting on discrepancies.",
    explanation: "Detects backdoors, unauthorized administrative changes, and rootkits tampering with system files.",
    hint: "Software that alerts administrators when system binaries or config files are modified.",
    level: "basic",
    codeExample: "tripwire --check // Scans filesystem hashes against baseline.db"
  },
  {
    question: "What is the difference between a Simple Checksum (e.g. CRC32) and a Cryptographic Hash (e.g. SHA-256)?",
    shortAnswer: "CRC32 is an error-detection code designed solely to detect accidental transmission errors or cosmic ray bit-flips; it is not collision-resistant and an attacker can easily craft forged data with a matching CRC32. SHA-256 is mathematically designed to resist intentional adversary manipulation.",
    explanation: "Never use CRC32 or Adler32 for security or tamper-proofing.",
    hint: "CRC32 catches accidental line noise; SHA-256 prevents deliberate hacker tampering.",
    level: "basic",
    codeExample: "// CRC32: Accidental Error Check | SHA-256: Adversary Tamper Defense"
  },
  {
    question: "How do Merkle Trees (Hash Trees) enable efficient, tamper-evident integrity verification in Blockchains and Git?",
    shortAnswer: "Leaf nodes contain hashes of individual data blocks; parent nodes contain hashes of their concatenated children up to a single Merkle Root. Altering any single transaction changes the Merkle Root, enabling O(log N) verification of any data element.",
    explanation: "Used extensively in Git commits, distributed databases (Cassandra), and Bitcoin/Ethereum ledgers.",
    hint: "A tree of hashes where changing any transaction alters the single top Root Hash.",
    level: "moderate",
    codeExample: "MerkleRoot = SHA256(SHA256(TxA_Hash + TxB_Hash) + SHA256(TxC_Hash + TxD_Hash));"
  },
  {
    question: "What is Secure Boot and how does it uphold Bootloader Integrity?",
    shortAnswer: "A UEFI firmware security feature that cryptographically verifies the digital signature of the OS bootloader, kernel, and initial drivers against OEM certificates in NVRAM before executing them, preventing bootkits from hijacking the OS startup.",
    explanation: "Stops UEFI rootkits and malicious kernels from running before antivirus software loads.",
    hint: "UEFI firmware checks cryptographic signatures before booting the operating system.",
    level: "moderate",
    codeExample: "UEFI_Verify(Bootloader_Binary, Microsoft_Or_OEM_Certificate) → ProceedBoot();"
  },
  {
    question: "What is a TPM 2.0 (Trusted Platform Module) and what role do PCR (Platform Configuration Register) measurements play?",
    shortAnswer: "A tamper-resistant hardware crypto-processor; PCR registers store cryptographic hash measurements of BIOS firmware, bootloader, and OS state. If any component is tampered with, the PCR values change and the TPM refuses to release disk encryption keys (BitLocker seal).",
    explanation: "Provides a hardware root of trust guaranteeing system integrity prior to decrypting filesystems.",
    hint: "Hardware chip that measures boot components and refuses to unlock disks if files were altered.",
    level: "expert",
    codeExample: "TPM_Extend(PCR[7], SHA256(SecureBoot_State));\nif (PCR_Matches_Baseline) Release_BitLocker_Key();"
  },
  {
    question: "How do Database ACID properties ensure transactional data integrity?",
    shortAnswer: "Atomicity (all-or-nothing execution), Consistency (schema constraints and foreign keys enforced), Isolation (concurrent transactions don't corrupt each other), and Durability (committed transactions survive crashes via Write-Ahead Logging - WAL).",
    explanation: "Prevents partial bank transfers or corrupted ledgers during power outages or system panics.",
    hint: "Atomicity, Consistency, Isolation, Durability ensure database records remain valid.",
    level: "moderate",
    codeExample: "BEGIN TRANSACTION;\nUPDATE accounts SET bal = bal - 50000 WHERE id = 1;\nUPDATE accounts SET bal = bal + 50000 WHERE id = 2;\nCOMMIT;"
  },
  {
    question: "What is Man-in-the-Middle (MitM) Data Tampering and how does TLS 1.3 prevent it?",
    shortAnswer: "An active adversary modifies data packets in transit (e.g. changing bank account routing numbers in cleartext HTTP); TLS 1.3 utilizes Authenticated Encryption with Associated Data (AEAD, e.g. AES-GCM or ChaCha20-Poly1305) which appends a cryptographic authentication tag to verify packet integrity.",
    explanation: "Any packet modification invalidates the authentication tag, causing the connection to immediately drop.",
    hint: "Active attackers modifying packets in transit; prevented by TLS 1.3 AEAD auth tags.",
    level: "moderate",
    codeExample: "AES_GCM_Decrypt(Ciphertext, Key, AuthTag) → { if (!TagValid) throw 'TamperedPacketError'; }"
  },
  {
    question: "What is Software Supply Chain Tampering and how does code signing mitigate it?",
    shortAnswer: "Attackers inject malicious backdoors into source repositories or build pipelines before release (e.g. SolarWinds); Code Signing applies a digital signature from a trusted Certificate Authority to binaries, allowing OSs to verify that executable code hasn't been altered since compilation.",
    explanation: "Windows SmartScreen and macOS Gatekeeper block execution of unsigned or modified binaries.",
    hint: "Signing compiled software binaries with a trusted digital certificate to prove they haven't been hacked.",
    level: "moderate",
    codeExample: "signtool sign /fd SHA256 /a /tr http://timestamp.digicert.com /td SHA256 BankingApp.exe"
  },
  {
    question: "What is Memory Corruption (e.g. Buffer Overflow) and how does it violate system integrity?",
    shortAnswer: "Flaws in C/C++ applications where writing beyond allocated array bounds overwrites adjacent stack/heap memory, corrupting the function return address and allowing attackers to redirect control flow to execute arbitrary malicious shellcode.",
    explanation: "Mitigated by memory-safe languages (Rust, Go), stack canaries, ASLR, and DEP/NX bits.",
    hint: "Writing past buffer boundaries to overwrite return pointers and take over system execution.",
    level: "expert",
    codeExample: "char buf[64];\nstrcpy(buf, untrusted_input); // Unbounded copy leads to stack corruption"
  },
  {
    question: "What is Sinking (Bit-Rot) in physical storage media and how do ZFS / Btrfs maintain integrity?",
    shortAnswer: "Silent data corruption caused by electromagnetic decay, cosmic radiation, or bad drive sectors over time; ZFS and Btrfs calculate 256-bit checksums for every data block on write and verify them on read, automatically repairing corrupted blocks using RAID parity.",
    explanation: "Prevents silent archival degradation of long-term backups without user awareness.",
    hint: "Silent magnetic decay over time; detected and self-healed by file systems like ZFS.",
    level: "moderate",
    codeExample: "zpool scrub tank // Verifies all filesystem block checksums and self-heals corruption"
  },
  {
    question: "What is Database SQL Injection (SQLi) data tampering and how is it prevented?",
    shortAnswer: "Adversaries manipulate SQL query syntax via unvalidated user inputs (e.g. ' OR '1'='1; UPDATE payroll SET salary=99999999;), tampering with database records; prevented by Parameterized Queries (Prepared Statements) and Object-Relational Mappers (ORMs).",
    explanation: "Prepared statements treat user inputs strictly as literals, eliminating query structure tampering.",
    hint: "Injecting malicious SQL commands to change database values; fixed by parameterized queries.",
    level: "basic",
    codeExample: "const stmt = db.prepare('UPDATE users SET balance = ? WHERE user_id = ?');\nstmt.run(amount, userId);"
  },
  {
    question: "What is DNS Cache Poisoning (Kaminsky Attack) and how does DNSSEC restore DNS integrity?",
    shortAnswer: "Attackers flood DNS resolvers with forged DNS response packets containing false IP mappings, redirecting legitimate users to phishing servers; DNSSEC attaches cryptographic signatures (RRSIG) to DNS records, validated against a chain of trust back to the root zone.",
    explanation: "Ensures internet domain name resolutions cannot be altered or spoofed in transit.",
    hint: "Spoofing DNS server caches to redirect traffic; fixed by DNSSEC digital signatures.",
    level: "expert",
    codeExample: "dig +dnssec bank.kolkata.in // Verifies cryptographic RRSIG validation chain"
  },
  {
    question: "What is BGP Route Hijacking and how does RPKI (Resource Public Key Infrastructure) defend routing integrity?",
    shortAnswer: "Rogue Autonomous Systems (AS) broadcast unauthorized BGP routes for IP prefixes they do not own, redirecting global internet traffic through adversary nodes; RPKI uses cryptographically signed Route Origin Authorizations (ROAs) to validate route advertisements.",
    explanation: "Protects internet core routing from malicious hijacking and accidental routing leaks.",
    hint: "Faking global internet routing announcements; prevented by RPKI cryptographic route signatures.",
    level: "expert",
    codeExample: "RPKI_Validation = ValidateROA(BGP_Prefix, Origin_ASN, Cryptographic_Signature);"
  },
  {
    question: "What is Time-of-Check to Time-of-Use (TOCTOU) Race Condition in software integrity?",
    shortAnswer: "A software concurrency flaw where an application checks a resource's state or file permissions (Time of Check), but an attacker swaps the file (e.g. via symlink) before the application actually uses or writes to it (Time of Use).",
    explanation: "Violates program execution integrity; mitigated by atomic file operations (O_NOFOLLOW, fstat).",
    hint: "Swapping a file between the moment a program checks permissions and when it uses the file.",
    level: "expert",
    codeExample: "if (access('/tmp/file', W_OK) == 0) {\n    // Attacker replaces /tmp/file with symlink to /etc/shadow here!\n    fd = open('/tmp/file', O_WRONLY);\n}"
  },
  {
    question: "What is Data Inconsistency caused by Split-Brain in Distributed Clustering?",
    shortAnswer: "When network partitioning isolates nodes in a distributed database cluster, both halves may elect leaders and accept conflicting writes simultaneously, corrupting overall data integrity; solved by Quorum Consensus algorithms (Raft, Paxos).",
    explanation: "Ensures writes only succeed if acknowledged by a strict majority (>50%) of cluster nodes.",
    hint: "Network splits causing two nodes to accept conflicting writes; fixed by Raft quorum consensus.",
    level: "moderate",
    codeExample: "Quorum = Math.floor(TotalNodes / 2) + 1; // Minimum votes required for valid write"
  },
  {
    question: "What is In-Memory Bit-Flipping (Rowhammer Attack) and how does ECC RAM defend integrity?",
    shortAnswer: "A physical vulnerability where repeatedly activating a specific row of DRAM memory cells causes electrical interference that flips bits in adjacent rows without software authorization; Error-Correcting Code (ECC) RAM uses parity bits to detect and automatically correct single-bit flips.",
    explanation: "Essential for mission-critical banking and aerospace servers to prevent memory corruption.",
    hint: "Rapidly reading RAM lines to flip adjacent bits; prevented by ECC server memory.",
    level: "expert",
    codeExample: "ECC_RAM = DetectSingleBitError() → CorrectBit() → AlertSysadmin();"
  },
  {
    question: "What is Configuration Drift in DevOps and how does Infrastructure-as-Code (IaC) maintain integrity?",
    shortAnswer: "Unrecorded manual changes made directly to production servers over time cause systems to diverge from tested baselines; IaC tools (Terraform, Ansible) enforce immutable infrastructure where environments are torn down and redeployed from version-controlled Git code.",
    explanation: "Guarantees production environments match verified development baselines precisely.",
    hint: "Production servers drifting from standard configs; fixed by automated Terraform redeployments.",
    level: "moderate",
    codeExample: "terraform plan --detailed-exitcode // Detects unrecorded configuration drift"
  },
  {
    question: "What is the typical commercial cost in Indian Rupees (₹) to deploy an Enterprise File Integrity Monitoring (FIM) & Code Signing Solution in Kolkata?",
    shortAnswer: "Approximately ₹4,50,000 to ₹14,00,000 for enterprise FIM agents (Wazuh/Tripwire), Hardware Security Module (HSM) code-signing tokens, and automated CI/CD pipeline integrity gates.",
    explanation: "Protects fintech and defense software development studios across Salt Lake and New Town.",
    hint: "Enterprise FIM and Code Signing infrastructure costs ₹4,50,000 – ₹14,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "FIM_Infrastructure_Budget = ₹8,50,000; // Complete enterprise deployment in Kolkata"
  },
  {
    question: "How does Chain of Custody in Digital Forensics preserve evidence integrity for court admissibility?",
    shortAnswer: "Every piece of digital evidence is cryptographically hashed (SHA-256) immediately upon acquisition; all physical transfers, examinations, and tools used are logged in a tamper-evident audit ledger, proving in court that the evidence was not altered.",
    explanation: "Required under Section 65B of the Indian Evidence Act for cybercrime evidence in Indian courts.",
    hint: "Hashing seized evidence immediately and recording every person who touches it for court.",
    level: "moderate",
    codeExample: "Evidence = { InitialHash: 'sha256:4a8b...', Custodian: 'Debangshu_Forensics', Timestamp: '2026-08-22' };"
  },
  {
    question: "What is the ultimate golden rule for maintaining Data and System Integrity across cyber operations?",
    shortAnswer: "'Never trust unverified input: compute cryptographic hashes (SHA-256/BLAKE3) for all critical assets, enforce digital signatures and HMACs with HSMs, implement Biba and Clark-Wilson integrity models, deploy real-time FIM engines, and budget enterprise integrity safeguards in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes hashing, digital signatures, formal integrity models, FIM monitoring, and enterprise budgeting.",
    hint: "Never trust unverified data: hash everything, sign with HSMs, enforce Biba/Clark-Wilson, and budget in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: Hash(Data) → VerifySignature() → EnforceBiba() → MonitorFIM() → BudgetInRupees(₹);"
  }
];

export default questions;
