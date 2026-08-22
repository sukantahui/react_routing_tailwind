const questions = [
  {
    question: "How does the 'Unified Payments Interface' (UPI) in India combine Asymmetric Cryptography, HSMs, and Symmetric AES-256 to secure real-time mobile banking transactions?",
    shortAnswer: "UPI uses asymmetric PKI (RSA/ECC) for device binding and API signatures, tamper-resistant Hardware Security Modules (HSMs) for PIN block encryption (ISO 9564), and AES-256-GCM for encrypted transaction switching.",
    explanation: "Securing India's UPI payments infrastructure (handling over 14 Billion monthly transactions) requires multi-tiered cryptography: 1. Device Binding: The mobile app signs payment requests using an asymmetric key pair bound to the SIM card and Android Keystore; 2. PIN Block Protection: When the user enters their 4/6-digit UPI PIN, the mobile SDK encrypts the PIN block using the issuing bank's public key; 3. Core HSM Switching: Transaction switches inside NPCI and banks process PIN validation inside FIPS 140-3 Level 4 Hardware Security Modules (HSMs); 4. Channel Encryption: Payload transmission across banking gateways is protected via TLS 1.3 with AES-256-GCM.",
    hint: "Think about the multi-layered security required from your smartphone screen to the bank's central hardware vault.",
    level: "basic",
    codeExample: `// UPI Cryptographic Payment Pipeline:
1. Mobile App:       Signs Request using Device Hardware Key (ECC-256)
2. PIN Block:        Encrypted via Bank Public Key: C_pin = RSA_Encrypt( UPI_PIN, Bank_Pub )
3. NPCI Switch:      Transmits via TLS 1.3 (AES-256-GCM)
4. Bank Central HSM: Validates PIN Block inside FIPS 140-3 Level 4 Hardware Silicon!`
  },
  {
    question: "What is 'Card-on-File Tokenization' (CoFT), and how does symmetric AES-256 tokenization protect credit card numbers during online e-commerce checkouts under RBI regulations?",
    shortAnswer: "CoFT replaces actual 16-digit credit card numbers (PANs) with a unique, cryptographically generated 16-digit 'Token' specific to each merchant and device; compromising the merchant's database exposes only useless tokens.",
    explanation: "Under the Reserve Bank of India (RBI) Card-on-File Tokenization mandate, e-commerce merchants (like Flipkart, Amazon, Swiggy) are strictly prohibited from storing actual 16-digit card Primary Account Numbers (PANs) and CVVs on their servers. Instead, when a customer saves their card, a Token Service Provider (Visa, Mastercard, RuPay) generates a surrogate Token using symmetric AES-256 encryption. The merchant stores only the Token. If a merchant's database is breached, the stolen tokens cannot be used at any other merchant or website.",
    hint: "Think of using casino chips instead of real cash: the chips have value only inside that specific casino and are worthless to a thief outside.",
    level: "moderate",
    codeExample: `// RBI Card Tokenization Flow:
Actual Card PAN:  "4532 8901 2345 6789" (Stored ONLY inside Card Network HSM)
Merchant Token:   "4532 0918 7654 1122" (Unique to Kolkata_Merchant_ID)
Compromise Impact: Hacker steals Token -> Cannot charge card at any other store!`
  },
  {
    question: "What is the 'Signal Protocol' (Double Ratchet Algorithm + X3DH), and how does it achieve End-to-End Encryption (E2EE) and self-healing Forward Secrecy in WhatsApp and Signal?",
    shortAnswer: "Combines an initial asymmetric key agreement (Extended Triple Diffie-Hellman - X3DH) with a continuous 'Double Ratchet' (symmetric KDF ratchet + asymmetric DH ratchet), continuously deriving fresh keys for every single chat message.",
    explanation: "Invented by Trevor Perrin and Moxie Marlinspike, the Signal Protocol provides state-of-the-art E2EE: 1. X3DH: Establishes a shared master secret between Alice and Bob even if Bob is offline; 2. Double Ratchet: For every message sent, a symmetric KDF ratchet advances, creating a unique one-time message key; 3. Self-Healing Break-in Recovery: Every time a reply is received, an ephemeral Diffie-Hellman ratchet steps forward, refreshing the root key material. If an attacker breaches the phone and steals current RAM keys, the very next reply heals the cryptosystem, locking the attacker out permanently.",
    hint: "Think of an interlocking mechanical gear that clicks forward with every word spoken, so an old key can never open future conversations.",
    level: "expert",
    codeExample: `// Double Ratchet Lifecycle:
Message 1: Key_1 derived from KDF_Chain -> Encrypts "Hello Mamata" -> Key_1 WIPED!
Message 2: Key_2 derived from KDF_Chain -> Encrypts "Meeting at 5 PM" -> Key_2 WIPED!
Bob Replies: DH Ratchet Steps -> Root Key REFRESHED -> Future messages self-healed!`
  },
  {
    question: "How does 'IEC 62351' standard enforce cryptography and message authentication in electrical power grid SCADA networks (DNP3 and IEC 60870-5-104)?",
    shortAnswer: "IEC 62351 mandates TLS 1.3 encryption for SCADA TCP/IP links, HMAC-SHA256 authentication for DNP3 Secure Authentication (SAv5), and RSA-PSS digital signatures for critical circuit breaker control commands.",
    explanation: "Modern electrical substations (like the 220kV grids across West Bengal) rely on SCADA protocols that historically lacked security. The IEC 62351 cybersecurity standard mandates: 1. IEC 62351-3: TLS encryption with mutual certificate authentication (mTLS) for all TCP-based SCADA traffic; 2. IEC 62351-5: DNP3 Secure Authentication (SAv5) using HMAC-SHA256 challenge-response handshakes to verify RTU commands; 3. Non-Repudiation: Critical breaker open/close operations must be digitally signed with RSA-PSS to prevent cyber warfare blackouts.",
    hint: "Remember the international cybersecurity standard governing electric power grids and substation controllers.",
    level: "expert",
    codeExample: `// IEC 62351 SCADA Authentication Challenge:
Control Center sends: "TRIP BREAKER 220KV-SUBSTATION-4"
RTU responds:         "CHALLENGE: Random_Nonce_9812"
Control Center signs: HMAC_SHA256( MasterKey, Command || Nonce )
RTU verifies:         Signature MATCH -> Breaker Tripped Safely!`
  },
  {
    question: "What is 'Digital Rights Management' (DRM / Widevine L1 / Apple FairPlay), and how does hardware cryptography protect 4K streaming video pipelines inside Smart TVs and mobile devices?",
    shortAnswer: "DRM uses a Hardware Root of Trust (TEE / ARM TrustZone) to decrypt AES-128 video streams directly into secure video memory (SVM), preventing operating systems and screenshot utilities from capturing raw decoded frames.",
    explanation: "In modern 4K OTT video streaming (Netflix, Hotstar, Prime Video), streaming without hardware DRM allows software screen recorders to capture pristine video frames. In Widevine Level 1 (L1) DRM: 1. Video chunks are encrypted with AES-128-CTR; 2. The DRM decryption key is negotiated inside a hardware Trusted Execution Environment (TEE); 3. The video frames are decrypted directly into encrypted video RAM (Secure Video Path); 4. The GPU displays the video on screen via HDCP 2.2 hardware encryption, making screen recording completely impossible.",
    hint: "Think of an armored pipeline that transports a precious liquid directly into a sealed glass room without ever exposing it to the open air.",
    level: "moderate",
    codeExample: `// Widevine L1 Hardware Video Pipeline:
Encrypted 4K Stream ──> [ CPU / Android OS (Cannot Read Content) ]
                    ──> [ ARM TrustZone TEE (Decrypts AES-128 Keys) ]
                    ──> [ Secure Video Memory ] ──> [ HDCP 2.2 Display Output ]`
  },
  {
    question: "How does the 'Ayushman Bharat Digital Mission' (ABDM) in India leverage Envelope Encryption and Reversible Digital Watermarking to protect patient Electronic Health Records (EHR)?",
    shortAnswer: "ABDM uses asymmetric envelope encryption (AES-256 Data Keys wrapped by Hospital HSM Master Keys) for cloud EHR storage, and reversible DICOM watermarking to embed doctor signatures and patient identifiers directly into radiology scans.",
    explanation: "Under the ABDM architecture and DPDP Act 2023: 1. Health Data at Rest: Large clinical health archives and whole-genome datasets are encrypted with local AES-256 Data Encryption Keys (DEKs) wrapped by cloud HSMs; 2. Diagnostic Integrity: Radiology MRI and CT scans use Difference Expansion Reversible Watermarking to embed patient ABHA IDs and radiologist digital signatures directly into pixel matrices, allowing 100% lossless cover reconstruction during tumor surgery.",
    hint: "Remember India's national digital health infrastructure and how it unifies encryption and watermarking.",
    level: "moderate",
    codeExample: `// ABDM Secure Healthcare Architecture:
1. Patient Records: Encrypted locally via AES-256-GCM Envelope Encryption.
2. DICOM Scans:     Reversible DWT Watermark embeds ABHA ID ("ABHA-9812-7712") + Doctor DSC.
3. Access Control:  Consent Manager verifies user signature before granting temporary KMS decryption key!`
  },
  {
    question: "What is 'Fully Homomorphic Encryption' (FHE / e.g. CKKS, BFV schemes), and how does it allow cloud servers to compute analytics and AI inference directly on encrypted data without ever decrypting it?",
    shortAnswer: "FHE enables mathematical operations (addition and multiplication) to be performed directly on ciphertexts, producing an encrypted result ($E(P_1) \\otimes E(P_2) = E(P_1 \\times P_2)$) that decrypts to the exact correct plaintext answer.",
    explanation: "In traditional cloud computing, an enterprise must decrypt confidential database records in cloud RAM before running analytics, exposing data to cloud administrators and memory scrapers. Fully Homomorphic Encryption (FHE, introduced by Craig Gentry in 2009) solves this: An enterprise encrypts customer bank balances and uploads them. The cloud AI runs complex statistical models directly on the encrypted ciphertexts without ever decrypting them. The enterprise downloads the encrypted result and decrypts it locally, maintaining 100% confidentiality.",
    hint: "Think of an artisan assembling a delicate watch inside a locked glovebox without ever opening the box.",
    level: "expert",
    codeExample: `// Fully Homomorphic Encryption (FHE) Concept:
Input: Encrypted Salaries: E(₹50,000), E(₹70,000)
Cloud AI Computes: Result_Encrypted = E(₹50,000) ⊕ E(₹70,000) = E(₹1,20,000)
Cloud Knowledge:   Zero! (Cloud sees only random cipher noise)
Enterprise Decrypts: Decrypt( Result_Encrypted, PrivKey ) = ₹1,20,000 (Exact Plaintext Answer!)`
  },
  {
    question: "What are the NIST Post-Quantum Cryptography (PQC) standards finalized in August 2024, and what is the 'Hybrid Classical-PQC Migration Strategy' for enterprise TLS 1.3 networks?",
    shortAnswer: "FIPS 203 (ML-KEM / Kyber), FIPS 204 (ML-DSA / Dilithium), and FIPS 205 (SLH-DSA); Hybrid TLS 1.3 combines classical X25519 with Post-Quantum ML-KEM-768 (`X25519Kyber768Draft00`) to guarantee security against both classical and quantum adversaries.",
    explanation: "To defend against 'Harvest Now, Decrypt Later' quantum attacks, NIST standardized FIPS 203 and 204 in August 2024. However, migrating complex global networks overnight risks bugs in new lattice implementations. Enterprise TLS 1.3 deploys a Hybrid Handshake: The client and server perform two simultaneous key exchanges—classical Elliptic Curve (X25519) and Post-Quantum Lattice (ML-KEM-768)—and hash both shared secrets together: $K_{master} = \\text{HKDF}(Z_{X25519} || Z_{Kyber})$. An attacker must break BOTH algorithms to compromise the session.",
    hint: "Think of locking a vault door with both a traditional physical brass lock and a next-generation biometric scanner.",
    level: "expert",
    codeExample: `// Hybrid Post-Quantum Key Agreement (TLS 1.3):
Client & Server compute:
  1. Classical ECDH Shared Secret:    Z_X25519 (32 bytes)
  2. Post-Quantum Lattice Shared Secret: Z_Kyber768 (32 bytes)
Combined Master Session Key:
  K_session = HKDF_Extract_and_Expand( Z_X25519 || Z_Kyber768, "TLS13-HYBRID-PQC", 32 )
// 100% UNBREAKABLE even if an adversary possesses a full-scale Quantum Computer!`
  },
  {
    question: "Under the CERT-In Cyber Security Directions (April 2022) and IT Act Section 70B, what is the mandatory reporting timeline for cryptographic key breaches or ransomware incidents in India?",
    shortAnswer: "All cybersecurity incidents (including ransomware, compromised private keys, and data breaches) must be formally reported to CERT-In within strictly 6 hours of detection.",
    explanation: "Under the CERT-In Directions issued under Section 70B(6) of the Information Technology Act 2000, all service providers, intermediaries, data centers, and corporate entities in India must report designated cyber incidents (including compromised private signing keys, SSL certificate breaches, ransomware attacks, and unauthorized database access) to the Indian Computer Emergency Response Team (CERT-In) within 6 hours of noticing the incident.",
    hint: "Remember the strict statutory reporting window enforced by India's national cyber emergency team.",
    level: "basic",
    codeExample: `// CERT-In 6-Hour Mandatory Reporting Window:
Event: Private HSM Root Signing Key Leaked or Ransomware Detected at 02:00 AM
Statutory Deadline: Must notify CERT-In Incident Response Desk BEFORE 08:00 AM!
Failure to Report: Criminal prosecution and statutory penalties under IT Act Section 70B.`
  },
  {
    question: "How does 'Hardware Root of Trust' (TPM 2.0 / Secure Boot) use cryptographic digital signatures and hash measurements (PCR registers) to prevent operating system rootkits?",
    shortAnswer: "UEFI Secure Boot cryptographically verifies the digital signature of the OS kernel before execution; TPM 2.0 hashes each boot stage into Platform Configuration Registers (PCRs) and releases full-disk encryption keys ONLY if all measurements match.",
    explanation: "When a server or laptop boots: 1. Secure Boot: The CPU ROM verifies the digital signature of the UEFI bootloader and Linux/Windows kernel against trusted public keys stored in hardware NVRAM; 2. Measured Boot: The TPM 2.0 chip cryptographically hashes each firmware component and extends Platform Configuration Registers (PCRs): $\\text{PCR}_i = \\text{SHA256}(\\text{PCR}_i || \\text{Hash}(\\text{Module}))$; 3. Sealed Storage: The BitLocker/LUKS full-disk AES encryption key is 'sealed' to the PCR values. If a hacker installs a bootkit, the PCR hash changes, the TPM refuses to release the key, and the computer locks down instantly.",
    hint: "Think of a high-security facility where each guard verifies the badge and fingerprints of the next guard before unlocking the next vault door.",
    level: "expert",
    codeExample: `// TPM 2.0 Measured Boot & Key Sealing:
PCR[0] = SHA256( PCR[0] || Hash(UEFI_BIOS) )
PCR[4] = SHA256( PCR[4] || Hash(Bootloader) )
PCR[7] = SHA256( PCR[7] || Hash(SecureBoot_Certificates) )
// If PCRs match baseline -> TPM unseals AES-256 Full Disk Encryption Key -> OS Boots!
// If Rootkit injected -> PCR mismatch -> TPM LOCKS VAULT ZERO DATA EXPOSED!`
  },
  {
    question: "What is 'Zero-Knowledge Proofs' (ZKP / e.g. zk-SNARKs), and how does ZKP revolutionize privacy-preserving identity verification and blockchain scalability?",
    shortAnswer: "Allows a user (Prover) to mathematically prove to a service (Verifier) that a statement is true (e.g. 'I am an Indian citizen over 18 years old with a credit score >750') without revealing their actual date of birth, name, or credit score.",
    explanation: "Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) allow verifying computations without seeing underlying data. In modern digital identity (like privacy-preserving Aadhaar or Web3 ID): User Mamata generates a cryptographic zero-knowledge proof that her age is $\\ge 18$. The verifier's smart contract or server checks the proof in milliseconds and verifies it is mathematically valid with 100% soundness, while Mamata reveals ZERO bits of her actual birth date or Aadhaar number, eliminating identity theft risks.",
    hint: "Think of proving you are tall enough to ride a roller coaster by walking under a fixed height bar without giving the operator your birth certificate.",
    level: "expert",
    codeExample: `// Zero-Knowledge Identity Verification (zk-SNARK):
Public Statement: "User Age >= 18"
Private Witness:  Aadhaar Birthdate = "1998-05-14"
ZKP Proof:        pi = zk_Prove( ProvingKey, PublicStatement, PrivateWitness )
Verifier:         isValid = zk_Verify( VerifyingKey, PublicStatement, pi ) -> TRUE! (ZERO DATA LEAKED!)`
  },
  {
    question: "What is 'Database Envelope Encryption' with 'Crypto-Shredding', and how does it satisfy the 'Right to be Forgotten' under the Digital Personal Data Protection (DPDP) Act 2023?",
    shortAnswer: "Each user's record is encrypted with a dedicated Data Encryption Key (DEK); when the user requests account deletion, the data fiduciary destroys (zeroizes) ONLY that user's specific DEK in the HSM, rendering the user's historical database backups mathematically unreadable instantly.",
    explanation: "Under Section 12 of the DPDP Act 2023, data principals have the 'Right to Correction and Erasure' (Right to be Forgotten). However, deleting user rows from multi-petabyte immutable cloud backups, cold storage tapes, and database replicas is technically near-impossible. In Crypto-Shredding: 1. Every user has a unique 256-bit AES DEK stored in a Key Management Service (KMS); 2. All user data is encrypted with their DEK; 3. Upon receiving a deletion request, the data fiduciary securely erases that single 32-byte DEK from the KMS. All petabytes of past backups instantly become mathematically irrecoverable random garbage, fulfilling legal erasure mandates in milliseconds.",
    hint: "Think of throwing away the unique key to a heavy steel safe: the safe may still sit in the warehouse, but nobody on Earth can ever open it again.",
    level: "expert",
    codeExample: `// DPDP Act 2023 Crypto-Shredding Workflow:
User: "Mamata" (Requests Account Erasure under DPDP Act)
Action: KMS.DestroyKey( DEK_User_Mamata_ID )
Result:
  - Active Database: Unreadable random noise
  - Immutable S3 Backups: Unreadable random noise
  - 5-Year Cold Storage Tapes: Unreadable random noise
Legal Status: 100% STATUTORY ERASURE COMPLIANCE ACHIEVED INSTANTLY!`
  },
  {
    question: "How do 'Blockchain Consensus Networks' (e.g. Bitcoin and Ethereum) synthesize Cryptographic Hash Functions, Merkle Trees, and Asymmetric Digital Signatures into an immutable decentralized ledger?",
    shortAnswer: "Transactions are signed via ECDSA (secp256k1) for non-repudiation, aggregated into Merkle Trees via SHA-256 for rapid integrity proofs, and chained sequentially by including the previous block's hash digest.",
    explanation: "Blockchains represent a masterclass in applied cryptography: 1. Authentication: Users sign transactions using their private key with ECDSA or Ed25519, guaranteeing non-repudiation; 2. Verification: Thousands of transactions are organized into a binary Merkle Tree, producing a single 32-byte Merkle Root; 3. Immutability: Each block header contains the cryptographic SHA-256 hash of the previous block ($H(Block_{i-1})$). Modifying any transaction in past history alters that block's hash, which breaks every subsequent block in the chain, rendering tampering mathematically impossible across the global network.",
    hint: "Think of an unbroken chain of notary certificates where each new certificate embeds an exact photographic copy of the previous certificate.",
    level: "expert",
    codeExample: `// Blockchain Cryptographic Block Structure:
Block 1000:
  - Previous Block Hash: 00000000000000000003f9a1be8c740...
  - Merkle Root:        e3b0c44298fc1c149afbf4c8996fb92... (SHA-256 Tree of 2,500 Transactions)
  - Nonce:              3,891,204
  - Block Hash:         00000000000000000001a4b8c9d0e1f... (Anchors Block 1001!)`
  },
  {
    question: "What is 'Forensic Traitor Tracing' in digital video watermarking, and how did film studios and streaming networks identify insider leaks of pre-release Hollywood and Tollywood movies?",
    shortAnswer: "Each digital screener copy distributed to reviewers or post-production artists has a unique, imperceptible spread-spectrum watermark embedded across frames; when a pirated copy appears online, decoding the watermark extracts the exact recipient's identity.",
    explanation: "Before a movie is released in theaters, preview copies are distributed to awards critics, color grading studios, and dubbing artists. Video watermarking engines (such as NexGuard or Civolution) inject unique forensic serial numbers using DWT-DCT spread spectrum into the video frames. The watermark survives screen recording, camcording, video downscaling, and aggressive social media video re-encoding. When a leaked file is discovered on pirate sites, forensic investigators extract the watermark in minutes, revealing the exact identity and time of distribution.",
    hint: "Think of an invisible forensic barcode stamped into every frame of a video that identifies the exact person holding that copy.",
    level: "moderate",
    codeExample: `// Forensic Traitor Tracing Pipeline:
Screener 1: Watermarked with "REC-9812-REVIEWER-MAMATA"
Screener 2: Watermarked with "REC-4410-DUBBING-DEBANGSHU"
Pirated Torrent Found Online -> Extraction Engine extracts: "REC-9812-REVIEWER-MAMATA"
Outcome: Legal prosecution initiated under Indian Copyright Act Section 65B!`
  },
  {
    question: "Synthesizing Real-World Applications of Cryptography and Watermarking: what is the master conclusion of Module 002_004?",
    shortAnswer: "Cryptography and Watermarking are the twin foundations of global digital civilization: Cryptography secures identity, privacy, and data processing; Watermarking protects asset provenance and forensic accountability; together they enable resilient trust across banking, healthcare, power grids, and digital governance.",
    explanation: "Across Module 002_004, we deconstructed the four-decade journey from classical Caesar ciphers and 56-bit DES to AES-256, Elliptic Curve Diffie-Hellman, SHA-256 forensic hashing, digital signatures, and transform-domain watermarking. In production systems, these tools do not operate in isolation: they unite into robust Hybrid Cryptosystems, Envelope Encryption KMS architectures, and zero-trust critical infrastructure frameworks governed by Indian statutory law (IT Act 2000, DPDP Act 2023, Copyright Act 1957). Mastering these principles empowers cyber defenders to engineer an invincible digital future.",
    hint: "Conclude by recognizing how mastering cryptography and watermarking empowers cyber defenders to secure modern digital society.",
    level: "expert",
    codeExample: `// The Master Architectural Synthesis:
(Symmetric_AES_256 + Asymmetric_ECC_PQC + SHA256_Integrity + DWT_Watermarking + DPDP_Compliance) = RESILIENT_DIGITAL_CIVILIZATION;`
  }
];

export default questions;
