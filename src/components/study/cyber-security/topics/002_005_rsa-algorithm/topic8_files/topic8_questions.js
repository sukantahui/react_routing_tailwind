const questions = [
  {
    question: "What fundamental computational problem in asymmetric cryptography necessitates the use of a Hybrid Cryptosystem (combining RSA and AES)?",
    shortAnswer: "RSA is ~1,000x slower than AES and cannot encrypt payloads larger than its modulus size ($M < N$); Hybrid cryptography uses RSA to securely distribute a 256-bit AES key, and AES to encrypt multi-gigabyte bulk payloads at line speed.",
    explanation: "Because RSA requires heavy 2048-bit modular exponentiations ($O(b^3)$ complexity), encrypting large files directly with RSA is computationally prohibitive (~3.2 MB/s throughput) and mathematically impossible for payloads exceeding the modulus size ($M \\ge N$). Conversely, symmetric AES-256-GCM operates in hardware at >8.4 GB/s but requires a pre-shared secret key. A Hybrid Cryptosystem combines both: RSA provides asymmetric key encapsulation (KEM), while AES provides high-speed data encapsulation (DEM).",
    hint: "Think of using a small armored lockbox (RSA) to mail the physical key for a massive cargo shipping container (AES).",
    level: "basic",
    codeExample: `// The Core Asymmetric vs Symmetric Dilemma:
Asymmetric RSA-2048: Great Key Distribution | Slow Throughput (~3.2 MB/s) | Max Payload < 214 Bytes (OAEP)
Symmetric AES-256:   Key Sharing Problem    | Ultra-Fast (>8.4 GB/s)      | Unlimited Bulk Data
Hybrid Solution:     RSA Encapsulates 32-Byte AES Key + AES Encrypts 10 GB Bulk Payload!`
  },
  {
    question: "What is the KEM/DEM (Key Encapsulation Mechanism / Data Encapsulation Mechanism) paradigm in modern hybrid cryptography?",
    shortAnswer: "KEM uses an asymmetric public key (RSA-OAEP) to encapsulate an ephemeral symmetric session key; DEM uses the symmetric session key with an authenticated cipher (AES-256-GCM) to encrypt bulk data.",
    explanation: "Formalized by Victor Shoup and Cramer-Shoup, the KEM/DEM paradigm divides hybrid encryption into two provably secure components: 1. KEM (Key Encapsulation Mechanism): Generates a random session key $K$ and encrypts it with the recipient's public key $C_{key} = \\text{KEM}(PubKey)$; 2. DEM (Data Encapsulation Mechanism): Encrypts message $M$ using an authenticated symmetric cipher $C_{data} = \\text{DEM}(K, M)$. This modular separation guarantees IND-CCA2 security across the entire hybrid pipeline.",
    hint: "Think of splitting the process into 'Key Packaging' and 'Data Packing'.",
    level: "moderate",
    codeExample: `// KEM / DEM Architectural Paradigm:
1. KEM Stage: SessionKey K = CSPRNG(256 bits)
             C_key = RSA_OAEP_Encrypt( K, Recipient_PublicKey )
2. DEM Stage: (C_data, AuthTag, IV) = AES_256_GCM_Encrypt( Bulk_Payload, K )
3. Package:   Hybrid_Envelope = [ C_key || IV || C_data || AuthTag ]`
  },
  {
    question: "Step through the 5-step operational workflow of Hybrid Encryption and Decryption across untrusted networks.",
    shortAnswer: "1. Generate ephemeral AES key; 2. Encrypt bulk data with AES-256-GCM; 3. Encrypt AES key with recipient's RSA-OAEP public key; 4. Transmit envelope; 5. Recipient decrypts AES key with private RSA key and decrypts bulk data with AES.",
    explanation: "1. Sender creates fresh 256-bit session key $K$; 2. Sender encrypts bulk data $M$ with $K$ via AES-256-GCM, producing ciphertext $C_{data}$ and 128-bit tag $T$; 3. Sender encrypts $K$ using recipient's public RSA key ($C_k = \\text{RSA-OAEP}(K, PubKey)$); 4. Sender transmits $[C_k || \\text{IV} || C_{data} || T]$; 5. Recipient uses private key $d$ to recover $K = \\text{RSA-OAEP-Decrypt}(C_k, PrivKey)$, then uses $K$ to decrypt $C_{data}$ and verify tag $T$ at line speed.",
    hint: "Follow the generation of the ephemeral key, symmetric encryption of the file, asymmetric encryption of the key, and reverse decapsulation.",
    level: "basic",
    codeExample: `// 5-Step Hybrid Cryptosystem Workflow:
Sender:
  1. K_session = generate_random_256bit_key()
  2. C_data, tag, iv = AES_GCM_Encrypt( file_data, K_session )
  3. C_key = RSA_OAEP_Encrypt( K_session, recipient_rsa_pubkey )
  4. Network_Envelope = { C_key, iv, C_data, tag }
Recipient:
  5. K_session = RSA_OAEP_Decrypt( Network_Envelope.C_key, recipient_rsa_privkey )
     file_data = AES_GCM_Decrypt( Network_Envelope.C_data, K_session, tag, iv )`
  },
  {
    question: "What is 'Envelope Encryption' in cloud architectures (e.g. AWS KMS, Google Cloud KMS, Azure Key Vault), and how does it map to hybrid RSA-AES?",
    shortAnswer: "Envelope encryption encrypts customer data with a local Data Encryption Key (DEK); the DEK is encrypted using a Master Key / Key Encryption Key (KEK) stored inside a Hardware Security Module (HSM).",
    explanation: "In enterprise cloud architectures, storing gigabytes of database records directly inside an HSM is impossible. Instead: 1. A microservice generates a local symmetric Data Encryption Key (DEK - AES-256); 2. The database encrypts customer records with the DEK; 3. The microservice calls the HSM to wrap (encrypt) the DEK with the master RSA/ECC Key Encryption Key (KEK); 4. The encrypted DEK ($C_{dek}$) is stored alongside the encrypted database records. The root KEK never leaves the physical HSM silicon.",
    hint: "Think of wrapping a sensitive house key in an armored envelope and locking it in a bank safe.",
    level: "moderate",
    codeExample: `// Cloud HSM Envelope Encryption Model:
KEK: Key Encryption Key (Master RSA-4096 Key stored permanently inside HSM)
DEK: Data Encryption Key (Ephemeral AES-256 Key generated locally per database row)
Database Storage: Stores ( AES_Encrypted_Data + RSA_Encrypted_DEK )
Outcome: Even if the database storage volume is leaked, data is 100% UNREADABLE without HSM access!`
  },
  {
    question: "Why is an 'Ephemeral' session key used for each hybrid transaction, and how does this prevent global catastrophic data exposure?",
    shortAnswer: "Using a unique ephemeral AES session key for every transaction ensures that compromising one session key decrypts only that single transmission, leaving all past and future encrypted archives secure.",
    explanation: "If an organization re-used a single static AES key across millions of transactions and that key was exposed (e.g. via RAM dump or malware), all historical customer records would be compromised simultaneously. By generating a fresh 256-bit ephemeral session key for every file or network message, compromise of a single session key isolates the exposure to that single transaction, providing robust security compartmentalization.",
    hint: "Think of changing the physical lock on a delivery van for every single package delivery.",
    level: "moderate",
    codeExample: `// Security Compartmentalization via Ephemeral Keys:
Transaction 1: K_session_1 = CSPRNG() → Encrypts Invoice #101 (Only Invoice #101 at risk)
Transaction 2: K_session_2 = CSPRNG() → Encrypts Invoice #102 (Protected by distinct key)
Static Key Flaw: 1 Leaked Key = 10,000,000 Stolen Customer Files (CATASTROPHIC BREACH!)`
  },
  {
    question: "Why is AES-GCM (Galois/Counter Mode) preferred over AES-CBC as the Data Encapsulation Mechanism (DEM) in modern hybrid cryptosystems?",
    shortAnswer: "AES-GCM provides Authenticated Encryption with Associated Data (AEAD); it computes an authentication tag that detects ciphertext tampering in hardware, eliminating padding oracle attacks.",
    explanation: "AES-CBC requires PKCS#7 padding and is vulnerable to padding oracle attacks (like POODLE and Lucky13) unless wrapped with an external HMAC (Encrypt-then-MAC). In contrast, AES-GCM is a stream-based authenticated cipher (AEAD) that produces a 128-bit GHASH authentication tag in parallel hardware. If an attacker modifies even a single bit of ciphertext $C_{data}$, the GCM tag verification fails immediately, aborting decryption before any plaintext is processed.",
    hint: "Recall how AEAD combines confidentiality and cryptographic tamper-proofing in a single primitive.",
    level: "moderate",
    codeExample: `// AES-CBC vs AES-GCM in Hybrid Systems:
AES-CBC: Vulnerable to Padding Oracles | Sequential (Slow) | Requires separate HMAC tag
AES-GCM: AEAD (Built-in 128-bit GHASH Tag) | Parallel (>8.4 GB/s) | 100% Tamper Evident!`
  },
  {
    question: "How does the maximum payload size limit in RSA-OAEP dictate the minimum modulus size needed to encrypt an AES-256 key?",
    shortAnswer: "RSA-OAEP with SHA-256 requires padding overhead of $2 \\cdot hLen + 2 = 66$ bytes; encrypting a 32-byte AES-256 key requires an RSA modulus of at least 1024 bits (128 bytes), which easily fits inside standard RSA-2048 (256 bytes).",
    explanation: "In RSA-OAEP (RFC 8017), the maximum plaintext payload capacity is $M_{max} = k - 2 \\cdot hLen - 2$ bytes where $k$ is the modulus length in bytes and $hLen$ is the hash output length. Using SHA-256 ($hLen = 32$ bytes), the padding overhead is $2(32) + 2 = 66$ bytes. For a standard 2048-bit modulus ($k = 256$ bytes), the maximum payload is $256 - 66 = 190$ bytes. Since an AES-256 session key is only 32 bytes, it fits comfortably within RSA-2048 with 158 bytes to spare for associated metadata.",
    hint: "Calculate the 66-byte padding overhead of OAEP and compare it with the 256-byte modulus capacity.",
    level: "expert",
    codeExample: `// RSA-OAEP Payload Capacity Formula:
Hash Algorithm: SHA-256 (hLen = 32 bytes)
Overhead:       2 * hLen + 2 = 66 bytes
RSA-2048 (k = 256 bytes): Max Payload = 256 - 66 = 190 bytes
AES-256 Session Key:     32 bytes (FITS EASILY! 190 - 32 = 158 bytes unused headroom)`
  },
  {
    question: "Under the Information Technology Act 2000 Section 43A and Section 65B of the Indian Evidence Act, why does Hybrid RSA-AES GCM provide legally binding non-repudiation and electronic record admissibility?",
    shortAnswer: "RSA-PSS asymmetric digital signatures establish non-repudiation under Section 5 of the IT Act, while AES-GCM authenticated tags guarantee tamper-evident electronic record integrity under Section 65B.",
    explanation: "Under Section 65B of the Indian Evidence Act, electronic records are admissible in court only if their technical integrity and absence of tampering can be mathematically certified. In a complete hybrid cryptosystem: Asymmetric RSA signatures bind the sender's identity (Section 5 non-repudiation), while AES-GCM GHASH tags ensure that not a single byte of the financial or medical data was altered in transit. This satisfies all statutory 'reasonable security practices' under Section 43A.",
    hint: "Remember how asymmetric signatures guarantee identity while symmetric AEAD tags guarantee record integrity in court.",
    level: "basic",
    codeExample: `// Indian Legal Admissibility Stack:
Identity & Non-Repudiation: RSA-PSS Digital Signature (Section 5 & 35 IT Act 2000)
Data Integrity & Authenticity: AES-256-GCM 128-bit Tag (Section 65B Indian Evidence Act)
Data Confidentiality:        RSA-OAEP Key Wrap + AES-256 Encryption (Section 43A IT Act)`
  },
  {
    question: "What is the computational throughput comparison between encrypting a 5 GB video file using Pure RSA-2048 versus Hybrid RSA-2048 + AES-256-GCM?",
    shortAnswer: "Pure RSA would take ~26 minutes and overload server CPUs; Hybrid RSA-AES encrypts the 5 GB file in ~0.6 seconds using hardware AES-NI instructions.",
    explanation: "Pure RSA-2048 encrypts in chunks of 190 bytes at ~3.2 MB/s, requiring over 27.6 million modular exponentiations to process 5 GB of data. This would consume 1,562 seconds (~26 minutes) of 100% CPU time. In Hybrid RSA-AES: RSA performs a single 1.1 ms key encapsulation for the 32-byte AES key, and AES-256-GCM processes the 5 GB file at 8.4 GB/s in 0.595 seconds. The total hybrid execution time is ~0.60 seconds (>2,600x faster).",
    hint: "Contrast millions of heavy 2048-bit BigNumber operations with single-nanosecond AES-NI CPU instructions.",
    level: "moderate",
    codeExample: `// 5 GB File Encryption Benchmark:
Pure RSA-2048:  5 GB / 3.2 MB/s = ~1,562 Seconds (26.0 Minutes of Heavy CPU Load!)
Hybrid RSA-AES: RSA Wrap (1.1 ms) + AES-GCM (0.595 s) = ~0.60 Seconds (2,600x FASTER!)`
  },
  {
    question: "What is OpenPGP (RFC 4880 / RFC 9580), and how does it implement Hybrid Cryptography for secure email and file encryption?",
    shortAnswer: "OpenPGP generates an ephemeral symmetric session key (AES-256), encrypts the email/file with AES, and encrypts the session key once for each recipient using their respective public RSA/ECC keys.",
    explanation: "OpenPGP (used in GnuPG / PGP) is the world's most widely deployed hybrid email encryption standard: When Alice sends an encrypted email to Bob and Charlie: 1. GnuPG generates a single random AES-256 session key $K$; 2. The email body and attachments are compressed and encrypted once with $K$; 3. $K$ is encrypted with Bob's public key ($C_{k1} = \\text{RSA}(K, PubKey_{Bob})$) and with Charlie's public key ($C_{k2} = \\text{RSA}(K, PubKey_{Charlie})$); 4. The single package containing $[C_{k1}, C_{k2}, C_{data}]$ is transmitted. Each recipient decrypts only their own key block.",
    hint: "Think of an encrypted document with two different key tags attached to the envelope for two different recipients.",
    level: "expert",
    codeExample: `// OpenPGP Multi-Recipient Hybrid Packet Structure:
[ Public Key Encrypted Session Key Packet 1 (Bob's RSA Key: C_k1) ]
[ Public Key Encrypted Session Key Packet 2 (Charlie's RSA Key: C_k2) ]
[ Symmetrically Encrypted and Authenticated Data Packet (AES-256: C_data) ]`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is Hybrid Envelope Encryption considered the gold standard for protecting cloud customer backups?",
    shortAnswer: "It allows petabytes of cloud backups to be encrypted locally with high performance while centralizing key management and access revocation inside HSMs, fulfilling Section 33 statutory safeguards.",
    explanation: "Under Section 33 of the DPDP Act 2023, Data Fiduciaries must implement robust safeguards to protect personal data. Hybrid Envelope Encryption allows banks and hospitals to encrypt petabytes of cloud backups locally using fast AES-256 keys. Because the master RSA keys reside inside an on-premise FIPS 140-3 HSM, revoking access to an entire cloud data lake requires merely deleting or revoking the master RSA key in the HSM, instantly rendering petabytes of cloud ciphertext mathematically unrecoverable (Cryptographic Erasure).",
    hint: "Remember how deleting the master RSA key in an HSM instantly shreds petabytes of cloud data without touching the storage drive.",
    level: "moderate",
    codeExample: `// DPDP Act Cryptographic Erasure via Envelope Encryption:
Requirement: Right to Erasure / Secure Data Decommissioning
Action:      Delete Master RSA Key in HSM
Outcome:     All encrypted DEKs become permanently unrecoverable → Petabytes of Cloud Backups SHREDDED in 0.01 seconds!`
  },
  {
    question: "What is a 'Key Re-Wrapping' operation in hybrid envelope architectures, and how does it enable key rotation without re-encrypting petabytes of data?",
    shortAnswer: "Decrypting the small encrypted DEK with an old master RSA key and re-encrypting it with a new master RSA key; the underlying petabytes of AES-encrypted bulk data remain completely untouched.",
    explanation: "In enterprise storage containing 100 Terabytes of encrypted data, annual master key rotation would take days if the entire data volume had to be decrypted and re-encrypted. In Hybrid Envelope Encryption: The 100 TB of data remains encrypted with its original AES Data Encryption Key (DEK). During key rotation, the microservice decrypts the 32-byte DEK using Old Master Key ($KEK_{old}$) and immediately re-encrypts the 32-byte DEK with New Master Key ($KEK_{new}$). The rotation takes 2 milliseconds and processes only 32 bytes of data instead of 100 Terabytes.",
    hint: "Think of putting a new padlock on a small keybox without moving any of the heavy furniture in the warehouse.",
    level: "expert",
    codeExample: `// Master Key Re-Wrapping Flow (Annual Key Rotation):
Old State: [ 100 TB Data (Encrypted with DEK) ] + [ DEK (Encrypted with KEK_2025) ]
Rotation:  DEK = RSA_Decrypt( Encrypted_DEK, KEK_2025_PrivKey )
           New_Encrypted_DEK = RSA_Encrypt( DEK, KEK_2026_PubKey )
New State: [ 100 TB Data (UNCHANGED!) ] + [ New_Encrypted_DEK (Wrapped by KEK_2026) ]
Time Taken: 2.1 milliseconds (Zero I/O overhead on the 100 TB volume!)`
  },
  {
    question: "Synthesizing Hybrid Cryptosystems: what is the master algorithmic lifecycle of an enterprise Hybrid RSA + AES cryptographic transaction?",
    shortAnswer: "$$\\text{Bulk Data } M \\xrightarrow{\\text{AES-256-GCM}(K)} [C_{data}, T, \\text{IV}] \\quad \\& \\quad K \\xrightarrow{\\text{RSA-OAEP}(PubKey)} C_{key} \\implies \\text{Envelope } [C_{key} \\parallel \\text{IV} \\parallel C_{data} \\parallel T]$$",
    explanation: "This complete formula encapsulates the hybrid architecture: 1. Plaintext payload $M$ is encrypted with ephemeral session key $K$ via AES-256-GCM at line speed; 2. Session key $K$ is encapsulated with recipient's public RSA key via RSA-OAEP; 3. The combined envelope $[C_{key} || \\text{IV} || C_{data} || T]$ is transmitted; 4. Recipient decapsulates $K$ using private RSA key $d$; 5. Recipient decrypts and authenticates $M$ using $K$. This achieves the theoretical holy grail: asymmetric key management with symmetric hardware speed.",
    hint: "Conclude by reviewing the complete 5-component envelope packaging equation.",
    level: "expert",
    codeExample: `// Master Hybrid Cryptosystem Equation:
Envelope = [ RSA_OAEP_Encrypt( K_session, RSA_PubKey ) || IV || AES_GCM_Encrypt( Payload, K_session ) || AuthTag ]`
  }
];

export default questions;
