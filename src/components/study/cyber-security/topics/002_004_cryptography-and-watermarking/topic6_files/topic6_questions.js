const questions = [
  {
    question: "What is the primary technical reason why modern digital communications (such as TLS 1.3 and SSH) deploy 'Hybrid Cryptosystems' rather than relying purely on symmetric or asymmetric encryption alone?",
    shortAnswer: "Hybrid Cryptosystems combine the mathematical key distribution and identity authentication of Asymmetric cryptography with the extreme computational speed and bulk throughput of Symmetric AES.",
    explanation: "Symmetric encryption is thousands of times faster than asymmetric encryption but suffers from the key distribution dilemma ($N(N-1)/2$ shared keys). Asymmetric encryption solves key exchange and identity authentication via public keys, but its heavy modular exponentiation math is far too slow (~1000x slower) to encrypt multi-gigabyte data streams. A Hybrid Cryptosystem uses asymmetric cryptography (ECDH/RSA) to establish a 256-bit ephemeral session key, and then uses symmetric AES-GCM to encrypt the bulk payload at gigabits per second.",
    hint: "Think of using a small diplomat to deliver a secret house key, and then using that metal key to quickly unlock heavy shipping containers.",
    level: "basic",
    codeExample: `// The Hybrid Cryptosystem Pipeline:
1. Asymmetric Phase: ECDH Key Agreement -> Establishes Shared Secret Key K_session (Microseconds)
2. Symmetric Phase:  AES-256-GCM -> Encrypts 10 GB Video/Database Payload at 8 GB/s (High Speed!)`
  },
  {
    question: "What is the approximate computational speed and throughput difference between Symmetric encryption (AES-256-NI) and Asymmetric encryption (RSA-2048)?",
    shortAnswer: "Symmetric AES-256 is approximately 1,000x to 10,000x faster than Asymmetric RSA-2048 (processing ~5-10 GB/s compared to ~5-10 MB/s on modern CPU hardware).",
    explanation: "Symmetric algorithms like AES execute simple bitwise XOR, byte substitutions, and 8-bit Galois field shifts directly in hardware CPU registers (consuming ~0.6 clock cycles per byte). Asymmetric algorithms like RSA execute multi-precision modular exponentiations ($C = M^e \\bmod N$) with 2048-bit numbers, requiring thousands of CPU multiplication cycles. Consequently, symmetric encryption achieves gigabytes per second, while asymmetric is limited to megabytes per second.",
    hint: "Contrast an automated industrial conveyor belt running at 100 mph with an artisan hand-carving a stone statue.",
    level: "moderate",
    codeExample: `// Performance Benchmark Comparison:
Symmetric (AES-256-GCM via AES-NI): ~8,400 MB/s (8.4 GB/s throughput)
Asymmetric (RSA-2048 Decryption):   ~6.2 MB/s (~1,350x slower!)`
  },
  {
    question: "How do Symmetric and Asymmetric cryptosystems compare regarding the 'Number of Keys Required' for a network of $N = 5,000$ enterprise nodes?",
    shortAnswer: "Symmetric pairwise encryption requires $\\frac{N(N-1)}{2} = 12,497,500$ secret keys; Asymmetric encryption requires only $2N = 10,000$ keys (1 public + 1 private key per node).",
    explanation: "Symmetric key management explodes quadratically ($O(N^2)$). For 5,000 users, every pairwise connection requires a unique key, totaling $\\frac{5000 \\times 4999}{2} = 12,497,500$ shared keys to generate and distribute securely. In Asymmetric cryptography, key growth is linear ($O(N)$): each user generates 1 key pair, requiring only $2 \\times 5000 = 10,000$ total keys. Each user publishes their public key in an X.509 directory and keeps only 1 private key secret.",
    hint: "Remember quadratic growth ($N^2$) for pairwise symmetric keys versus linear growth ($2N$) for public-private key pairs.",
    level: "moderate",
    codeExample: `// Key Scaling for N = 5,000 Users:
Pairwise Symmetric: [ 5000 * 4999 ] / 2 = 12,497,500 Keys (Total Storage Nightmare)
Asymmetric (PKI):   2 * 5000 = 10,000 Keys (Easily Managed in LDAP / X.509 Directory)`
  },
  {
    question: "Why can Asymmetric cryptography provide 'Non-Repudiation' (legal proof of authorship), whereas Symmetric cryptography cannot?",
    shortAnswer: "In Asymmetric signatures, ONLY the author possesses the secret private key; in Symmetric authentication (HMAC), both sender and receiver share the exact same key, so either party could have created the message.",
    explanation: "Under the Indian IT Act 2000 Section 5, Non-Repudiation requires undeniable proof of origin. In a symmetric cryptosystem, Alice and Bob share secret key $K$. If a disputed transaction occurs, Alice can claim that Bob forged it because Bob also holds $K$. In an asymmetric digital signature, Alice's Private Key $K_{priv}$ is held exclusively by Alice (e.g. inside her FIPS 140-2 USB token). Because Bob only holds Alice's Public Key, Bob cannot forge her signature, providing mathematical proof of authorship.",
    hint: "Think about why a personal wax seal that only you own proves you signed the letter, while a shared stamp used by two people proves nothing.",
    level: "basic",
    codeExample: `// Legal Non-Repudiation Comparison:
Symmetric (HMAC):   Tag = HMAC( Key_K, Message ) -> Both Alice & Bob hold Key_K (Repudiable!)
Asymmetric (ECDSA): Sig = Sign( Alice_PrivKey, Hash ) -> ONLY Alice holds PrivKey (Non-Repudiable under IT Act Section 5!)`
  },
  {
    question: "What are the four discrete phases of a standard 'Hybrid Cryptosystem' session handshake (e.g. TLS 1.3 or PGP/GPG)?",
    shortAnswer: "1. Asymmetric Key Agreement & Identity Authentication, 2. Ephemeral Symmetric Session Key Derivation (HKDF), 3. High-Speed Symmetric Bulk Data Encryption (AES-GCM), 4. Key Zeroization & Session Teardown.",
    explanation: "A complete hybrid cryptosystem executes: 1. Identity & Key Agreement: Client and Server exchange X.509 certificates and compute a shared secret using Ephemeral Elliptic Curve Diffie-Hellman (ECDHE); 2. Key Derivation: The shared secret is expanded via HKDF into an ephemeral 256-bit symmetric session key; 3. Bulk Data Transfer: The payload is encrypted using AES-256-GCM at gigabits per second; 4. Teardown: Ephemeral session keys are wiped (zeroized) from RAM upon connection termination to enforce Perfect Forward Secrecy.",
    hint: "Recall the 4 steps: Authenticate & Agree, Derive Session Key, Encrypt Bulk Data, and Wipe Keys.",
    level: "expert",
    codeExample: `// 4-Phase Hybrid Lifecycle:
Phase 1: Alice & Bob run ECDHE with X.509 CAs -> Compute Master Secret (Z)
Phase 2: K_session = HKDF_Expand( Z, "TLS-1.3-SESSION-KEY", 32 )
Phase 3: Payload = AES_256_GCM_Encrypt( File_10GB, K_session, Nonce )
Phase 4: Connection Close -> memset_s( K_session, 0, 32 ) (Memory Zeroized!)`
  },
  {
    question: "How do Symmetric and Asymmetric algorithms compare in their vulnerability to 'Quantum Computing Attacks' (Grover's Algorithm vs Shor's Algorithm)?",
    shortAnswer: "Grover's algorithm halves symmetric key strength (AES-256 retains 128-bit quantum security and remains safe); Shor's algorithm solves prime factorization and discrete logarithms in polynomial time, completely destroying 100% of classical RSA, DH, and ECC.",
    explanation: "Quantum algorithms affect the two cryptographic paradigms fundamentally differently: 1. Symmetric (AES-256): Grover's algorithm speeds up brute force quadratically ($\\sqrt{2^n} = 2^{n/2}$). Doubling key size from 128 to 256 bits provides 128 bits of quantum security, making AES-256 safe against quantum attacks; 2. Asymmetric (RSA/ECC): Shor's algorithm finds mathematical periods in polynomial time $O((\\log N)^3)$, rendering all RSA, DH, and ECC keys trivial to crack on large quantum computers. Organizations must migrate asymmetric components to Post-Quantum Cryptography (FIPS 203 ML-KEM).",
    hint: "Think about symmetric keys only needing to be made twice as long, while asymmetric algorithms must be replaced entirely with lattice mathematics.",
    level: "expert",
    codeExample: `// Quantum Impact Matrix:
Algorithm Type | Classical Security | Quantum Algorithm | Quantum Impact
AES-256 (Sym)  | 256 bits           | Grover's (√2^N)   | 128-bit Quantum Security (STILL SAFE!)
RSA-2048 (Asym)| 112 bits           | Shor's (O(logN)^3)| 0 bits Security (100% BROKEN!)
ECC-256 (Asym) | 128 bits           | Shor's (O(logN)^3)| 0 bits Security (100% BROKEN!)`
  },
  {
    question: "What is 'PGP / GPG' (Pretty Good Privacy / GNU Privacy Guard), and how does it implement a Hybrid Cryptosystem for securing emails and file archives?",
    shortAnswer: "PGP generates a random one-time symmetric session key (AES-256) to compress and encrypt the email, then encrypts that small session key with the recipient's public RSA/ECC key.",
    explanation: "Invented by Phil Zimmermann in 1991, PGP represents the classic desktop hybrid cryptosystem: 1. Plaintext message is compressed (reducing redundancy); 2. A random 256-bit AES session key $K_{session}$ is generated; 3. The compressed message is encrypted with AES-256; 4. $K_{session}$ is encrypted with the recipient's public RSA key (Envelope Encryption); 5. The sender signs the hash of the message with their private key, providing confidentiality, integrity, and non-repudiation in a single `.gpg` file.",
    hint: "Think of sealing a confidential letter inside an armored envelope, with the envelope locked by a padlock keyed to the recipient.",
    level: "moderate",
    codeExample: `// PGP / GPG Hybrid Envelope:
[ Encrypted Session Key (RSA_Pub) ] + [ Digital Signature (Alice_Priv) ] + [ Compressed Payload (AES-256-GCM) ]`
  },
  {
    question: "Under the Indian Information Technology Act 2000 and DPDP Act 2023, what is the regulatory requirement for securing 'Data-at-Rest' vs 'Data-in-Transit' using symmetric and asymmetric encryption?",
    shortAnswer: "Data-at-Rest must be encrypted using FIPS-validated Symmetric AES-256 with hardware KMS key management; Data-in-Transit must use TLS 1.3 Hybrid Encryption with CCA India-approved X.509 digital certificates.",
    explanation: "Under Section 43A of the IT Act 2000 and Section 33 of the DPDP Act 2023: 1. Data-at-Rest (Customer databases, cloud backups) requires high-throughput symmetric AES-256 encryption with automated key rotation in HSMs; 2. Data-in-Transit (API traffic, web banking) requires TLS 1.3 hybrid encryption with Perfect Forward Secrecy (ECDHE) and Class-3 Digital Signature Certificates (DSCs) licensed under the Controller of Certifying Authorities (CCA India).",
    hint: "Remember the regulatory distinction between encrypting stored database files (Symmetric) and encrypting network wires (Hybrid TLS).",
    level: "basic",
    codeExample: `// Indian Statutory Cryptographic Architecture:
Data-at-Rest:    Symmetric AES-256-GCM (Enforced via Cloud KMS / HSM)
Data-in-Transit: Hybrid TLS 1.3 (ECDHE Key Exchange + AES-256-GCM Payload + X.509 CA Certificate)`
  },
  {
    question: "Why do low-power IoT sensors and smart meters prefer Elliptic Curve Diffie-Hellman (ECDH) over classical RSA for establishing symmetric AES keys?",
    shortAnswer: "ECDH-256 uses 32-byte keys and consumes up to 90% less CPU energy and battery power during key exchange than 512-byte RSA-4096, preventing sensor battery exhaustion.",
    explanation: "IoT microcontrollers (e.g. smart electricity meters, battery-powered medical monitors) have limited RAM (often <64 KB) and run on small batteries. Executing 4096-bit RSA modular multiplications drains battery rapidly and risks stack overflow in limited RAM. In contrast, 256-bit ECC point addition executes in tiny 32-byte registers with minimal clock cycles, establishing symmetric AES keys while preserving battery life for years.",
    hint: "Think about powering a lightweight sports bicycle versus a heavy steam locomotive with a small flashlight battery.",
    level: "moderate",
    codeExample: `// IoT Energy Consumption Benchmark:
RSA-4096 Key Generation & Handshake: ~1,200 mJ (Drains IoT battery rapidly!)
ECDH-256 Key Exchange:               ~18 mJ (98.5% Energy Savings -> 5-Year Battery Life!)`
  },
  {
    question: "What is 'Forward Secrecy' in hybrid TLS connections, and what happens if a server uses static RSA key exchange instead of Ephemeral Diffie-Hellman (ECDHE)?",
    shortAnswer: "Static RSA key exchange lacks Forward Secrecy: an attacker who records encrypted traffic and steals the server's private key years later can decrypt all historical sessions; ECDHE generates ephemeral keys, making past sessions undecryptable.",
    explanation: "In static RSA, the client encrypts the symmetric pre-master secret using the server's long-term RSA public key. If an intelligence agency records petabytes of encrypted traffic today and breaches the server's private key 3 years later, they can retroactively decrypt every historical session. Ephemeral Diffie-Hellman (ECDHE in TLS 1.3) generates a unique key pair per connection and erases it from RAM immediately after session key derivation, guaranteeing Forward Secrecy.",
    hint: "Think about destroying the physical padlock after every conversation so past conversations can never be reopened even if the master factory blueprint is leaked.",
    level: "expert",
    codeExample: `// Static RSA vs Ephemeral ECDHE:
Static RSA (Insecure):  C = RSA_Encrypt( PreMasterSecret, Server_Static_PublicKey ) -> Stolen Key decrypts ALL past traffic!
ECDHE (Forward Secret): Key = ECDH( Client_Ephemeral_Priv, Server_Ephemeral_Pub ) -> Ephemeral keys wiped -> Past traffic remains 100% UNREADABLE!`
  },
  {
    question: "What is 'Envelope Encryption' (Key Wrapping), and how does a Key Management Service (AWS KMS / Azure Key Vault / Google Cloud KMS) manage symmetric and asymmetric keys in enterprise cloud storage?",
    shortAnswer: "The KMS uses a Root Key Encrypting Key (KEK / Master Key) inside an HSM to wrap (encrypt) local Data Encryption Keys (DEKs); bulk data is encrypted locally with the DEK at gigabit speeds.",
    explanation: "Encrypting petabytes of data directly inside an HSM is impossible due to network bandwidth bottlenecks. In Envelope Encryption: 1. The application requests a Data Encryption Key (DEK) from KMS; 2. KMS generates a 256-bit AES DEK, wraps it using the HSM's Master Key (KEK), and returns both the Plaintext DEK and Encrypted DEK; 3. The application encrypts the petabyte database locally using the Plaintext DEK; 4. The application erases the Plaintext DEK from RAM and stores the Encrypted DEK alongside the ciphertext.",
    hint: "Think of an armored safe company providing you with disposable metal lockboxes, where the lockbox keys are stored inside their master bank vault.",
    level: "expert",
    codeExample: `// Envelope Encryption Flow (AWS KMS / Cloud KMS):
1. App -> KMS.GenerateDataKey( KEK_ID )
2. KMS -> Returns: { Plaintext_DEK (32 bytes), Encrypted_DEK (wrapped by KEK) }
3. App -> Ciphertext = AES_256_GCM( Database_1TB, Plaintext_DEK )
4. App -> SecureZeroMemory( Plaintext_DEK )
5. Storage -> Stores [ Encrypted_DEK ] + [ Ciphertext ] on S3 / Cloud Disk`
  },
  {
    question: "Why is Symmetric encryption considered 'Malleable' when unauthenticated, and how do Digital Signatures or AEAD tags prevent bit-flipping manipulation?",
    shortAnswer: "In unauthenticated symmetric ciphers (stream/CBC), an attacker can flip specific ciphertext bits to alter decrypted plaintext in a predictable way; Digital Signatures and AEAD GMAC tags detect any bit alteration and reject the message.",
    explanation: "In a stream cipher ($C = P \\oplus S$), XORing ciphertext byte $C_i$ with $\\Delta$ results in decrypted plaintext $P'_i = P_i \\oplus \\Delta$. An attacker on a wire can change a wire transfer amount from ₹10,000 to ₹90,000 without knowing the key. In Asymmetric Digital Signatures or Symmetric AEAD (AES-GCM), the sender computes a cryptographic signature or authentication tag over the plaintext hash. Changing even 1 bit causes the mathematical signature/tag verification to fail, aborting the transaction immediately.",
    hint: "Think of altering the numbers on a handwritten paper check versus a digital check protected by a tamper-evident holographic seal.",
    level: "moderate",
    codeExample: `// Bit-Flipping Malleability Defense:
Unauthenticated Stream: C[5] ^= ('1' ^ '9') -> Plaintext becomes "PAY ₹90,000" (Undetected manipulation!)
Authenticated Hybrid:   AES_GCM_Verify() FAILS -> Throws TagMismatchException & Discards Packet!`
  },
  {
    question: "What is 'Authenticated Key Exchange' (AKE), and how does the Sigma Protocol (used in IKEv2 and TLS 1.3) prevent identity misbinding and replay attacks?",
    shortAnswer: "A protocol that simultaneously performs Diffie-Hellman key exchange and mutual digital signature authentication, cryptographically binding the ephemeral session keys to the authentic identities of both communicating parties.",
    explanation: "In naive key exchange, an attacker can replay past handshake messages or misbind Alice's public key to Bob's session. The SIGMA protocol (SIGn-and-MAc, the foundation of TLS 1.3) ensures that both parties sign the entire transcript of ephemeral Diffie-Hellman public keys, nonces, and certificates using their long-term private keys. This cryptographically binds the established symmetric session key to verified X.509 identities, preventing replay, reflection, and identity misbinding attacks.",
    hint: "Think of signing the exact transcript of a verbal negotiation contract with your certified seal before shaking hands.",
    level: "expert",
    codeExample: `// SIGMA Authenticated Key Exchange (TLS 1.3):
Transcript = Hash( Client_Hello || Server_Hello || ECDHE_PublicKeys || Nonces )
Signature  = Sign( Transcript, Server_PrivateKey )
// Client verifies Signature using Server_Certificate -> Guarantees Identity Binding & Zero Replay!`
  },
  {
    question: "What is the memory and CPU footprint difference when running Symmetric AES-GCM versus Asymmetric RSA-4096 on embedded microcontrollers (e.g. ARM Cortex-M0)?",
    shortAnswer: "Symmetric AES-GCM requires <1 KB of RAM and executes in microseconds; Asymmetric RSA-4096 requires >8 KB of RAM for multi-precision bignum arithmetic and takes several seconds of 100% CPU utilization, causing severe thermal throttling.",
    explanation: "Embedded microcontrollers (like the ARM Cortex-M0 used in smart utility meters across West Bengal) have only 16-64 KB of RAM and run at ~48 MHz. An RSA-4096 private key operation requires massive 512-byte big-number modular exponentiations, consuming over 8 KB of stack memory and taking 3 to 8 seconds of continuous CPU computation. In contrast, AES-256-GCM uses tiny 16-byte state matrices and executes in under 2 milliseconds with zero thermal penalty.",
    hint: "Think of trying to fit a grand piano (RSA-4096) into a tiny elevator versus carrying a pocket flute (AES-GCM).",
    level: "moderate",
    codeExample: `// Embedded Microcontroller (ARM Cortex-M0 @ 48 MHz) Footprint:
Algorithm | RAM Required | Execution Time | Battery Impact
AES-256   | 512 Bytes    | 1.8 ms         | Negligible
RSA-4096  | 8,400 Bytes  | 4,200 ms       | Severe (High Battery Drain)`
  },
  {
    question: "How does the 'Diffie-Hellman Problem' (CDH and DDH) relate to the security of Symmetric Key Derivation in hybrid protocols?",
    shortAnswer: "Computational Diffie-Hellman (CDH) assumes computing $g^{ab}$ from $g^a$ and $g^b$ is hard; Decisional Diffie-Hellman (DDH) assumes $g^{ab}$ is indistinguishable from a random group element, ensuring the derived symmetric key has full entropy.",
    explanation: "Hybrid cryptosystems rely on two mathematical hardness assumptions: 1. CDH (Computational Diffie-Hellman): An eavesdropper observing public keys $g^a$ and $g^b$ cannot compute the shared value $g^{ab} \\bmod p$; 2. DDH (Decisional Diffie-Hellman): The shared secret $g^{ab}$ is statistically indistinguishable from a completely uniform random number. Passing $g^{ab}$ through HKDF extracts 256 bits of pure cryptographic entropy to initialize the symmetric AES-GCM cipher.",
    hint: "Think of ensuring that the secret recipe arrived at by two chefs is both secret (CDH) and tastes completely unique and unpredictable (DDH).",
    level: "expert",
    codeExample: `// CDH & DDH Cryptographic Guarantees:
CDH Assumption: Given (g, g^a, g^b) -> Finding g^(ab) is COMPUTATIONALLY INFEASIBLE.
DDH Assumption: Distribution (g^a, g^b, g^(ab)) ≈ (g^a, g^b, g^r) (INDISTINGUISHABLE FROM RANDOM NOISE!)`
  },
  {
    question: "Why is 'Certificate Pinning' used in mobile banking applications (e.g. UPI apps in India) to harden Hybrid TLS connections against rogue Certificate Authorities?",
    shortAnswer: "Certificate Pinning hardens the app by hardcoding the specific public key / certificate of the bank's server; even if a compromised CA issues a fraudulent certificate, the mobile app rejects the connection.",
    explanation: "In standard TLS, any of the ~150 root Certificate Authorities trusted by an Android/iOS operating system can issue a valid certificate for any domain name. If a rogue or compromised CA issues a fake certificate for `upi.bank.co.in`, an attacker can execute a Man-in-the-Middle attack. In Public Key Pinning, the mobile banking app hardcodes the SHA-256 hash of the bank's authentic public key (SPKI fingerprint). If the presented certificate's public key does not match the pinned hash, the app instantly aborts the connection.",
    hint: "Think of recognizing your friend's face directly rather than trusting any identity card issued by any government clerk in the world.",
    level: "moderate",
    codeExample: `// Mobile Public Key Pinning (OkHttp / Android):
CertificatePinner certificatePinner = new CertificatePinner.Builder()
    .add("upi.kolkatafintech.co.in", "sha256/k2026Abc9f123...=") // Pinned Public Key Fingerprint
    .build();
// Rejects any rogue certificate issued by compromised root CAs!`
  },
  {
    question: "What is 'Quantum Key Distribution' (QKD / e.g. BB84 Protocol), and how does quantum physics establish symmetric keys without relying on asymmetric computational hardness?",
    shortAnswer: "A physical key distribution method using single photons and quantum mechanics (Heisenberg Uncertainty Principle / No-Cloning Theorem); any eavesdropping attempt perturbs photon states, alerting the communicating parties.",
    explanation: "Classical asymmetric cryptography relies on mathematical hardness (factoring primes, discrete logs) which quantum computers can break. Quantum Key Distribution (QKD, such as the BB84 protocol developed by Bennett and Brassard) uses physics: Alice transmits single photons in polarized quantum states. Under the No-Cloning Theorem, an eavesdropper cannot intercept or measure a photon without altering its quantum state and inducing quantum bit errors (QBER). If QBER is below threshold, Alice and Bob distill an unconditionally secure symmetric key.",
    hint: "Think of sending a letter written in soap bubbles: anyone who touches the letter pops the bubbles, immediately alerting the recipient.",
    level: "expert",
    codeExample: `// Quantum Key Distribution (BB84 Protocol):
Alice sends: Photons polarized in Rectilinear (+) and Diagonal (x) bases.
Eavesdropper (Eve) intercepts -> Quantum state collapses -> QBER Error Rate spikes above 11%!
Alice & Bob detect anomaly -> Abort Key Exchange -> Zero Secret Key Material Leaked!`
  },
  {
    question: "Synthesizing Symmetric vs Asymmetric Encryption: what is the master design rule for enterprise cybersecurity architectures?",
    shortAnswer: "Never choose between them; deploy a multi-layered Hybrid Cryptosystem using Asymmetric ECC/PQC for identity authentication and key exchange, and Symmetric AES-256-GCM for high-speed bulk data protection.",
    explanation: "Symmetric and asymmetric cryptography are not competitors; they are symbiotic partners that complete each other. Asymmetric cryptography eliminates the key distribution dilemma and guarantees legal non-repudiation, while symmetric cryptography delivers gigabytes per second of authenticated bulk encryption. Modern digital security succeeds by uniting both into resilient hybrid cryptosystems governed by hardware security modules and statutory compliance frameworks.",
    hint: "Conclude by recognizing how the perfect synergy of asymmetric key establishment and symmetric bulk encryption powers all modern digital security.",
    level: "expert",
    codeExample: `// The Master Cryptographic Architecture:
(Asymmetric_PKI_Authentication + ECDHE_Key_Exchange) + (Symmetric_AES_256_GCM_Bulk) = MAXIMUM_SECURITY_AND_SPEED;`
  }
];

export default questions;
