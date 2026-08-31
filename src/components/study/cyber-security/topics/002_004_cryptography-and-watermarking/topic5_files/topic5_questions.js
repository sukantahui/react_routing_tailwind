const questions = [
  {
    question: "What is 'Asymmetric Key Cryptography' (Public Key Cryptography), and what fundamental mathematical discovery in 1976 resolved the symmetric key distribution problem?",
    shortAnswer: "A cryptosystem using a mathematically linked pair of keys: a Public Key for encryption/verification and a Private Key for decryption/signing; introduced by Diffie, Hellman, and Merkle.",
    explanation: "In 1976, Whitfield Diffie and Martin Hellman published 'New Directions in Cryptography', introducing public-key cryptography. Instead of sharing a single secret key, each entity generates an asymmetric key pair: 1. Public Key ($K_{pub}$): Freely distributed over untrusted networks; 2. Private Key ($K_{priv}$): Kept strictly secret by the owner. Anyone can encrypt a message using Alice's public key, but only Alice's mathematically linked private key can decrypt it.",
    hint: "Think of an open mailbox that anyone can drop a letter into, but only the owner has the physical key to unlock and read the mail.",
    level: "basic",
    codeExample: `// Asymmetric Key Pair Relationship:
User: Alice
Public Key (Open to World):  Alice_K_pub
Private Key (Strictly Secret): Alice_K_priv
Confidentiality: Ciphertext = Encrypt( Plaintext, Alice_K_pub )
Decryption:      Plaintext  = Decrypt( Ciphertext, Alice_K_priv )`
  },
  {
    question: "What is a 'One-Way Trapdoor Function', and what is the mathematical difference between a standard one-way function and a trapdoor function?",
    shortAnswer: "A function $y = f(x)$ that is easy to compute in the forward direction, but computationally infeasible to invert ($x = f^{-1}(y)$) unless a secret piece of auxiliary information (the 'Trapdoor') is known.",
    explanation: "A standard one-way function (like SHA-256) cannot be inverted by anyone. A One-Way Trapdoor Function can be easily inverted if and only if the decrypter possesses the secret trapdoor key. For example, in RSA: multiplying two 1024-bit prime numbers $N = p \\times q$ is easy (forward direction), but factoring $N$ back into $p$ and $q$ takes billions of years (one-way). The private key $d$ is the secret 'trapdoor' that makes inverting the function instantaneous.",
    hint: "Think of a self-locking padlock: anyone can snap it shut (one-way), but only the person holding the key can open it (trapdoor).",
    level: "moderate",
    codeExample: `// Trapdoor Function Concept:
Forward (Public): Compute y = f(x) → Computationally trivial (Microseconds)
Inverse (Adversary without Trapdoor): Compute x = f^(-1)(y) → Infeasible (10 Billion Years)
Inverse (Owner with Secret Trapdoor K_priv): Compute x = g(y, K_priv) → Microseconds!`
  },
  {
    question: "What are the three fundamental hard mathematical problems upon which modern asymmetric cryptography is built?",
    shortAnswer: "1. Integer Prime Factorization (RSA), 2. Discrete Logarithm Problem (Diffie-Hellman / DSA), 3. Elliptic Curve Discrete Logarithm Problem (ECC / ECDSA / Ed25519).",
    explanation: "All classical public-key algorithms derive security from number-theoretic hardness: 1. Prime Factorization: Given $N = p \\cdot q$, finding $p$ and $q$ is intractable for huge numbers (RSA); 2. Discrete Logarithm Problem (DLP): Given $g, p,$ and $y = g^x \\bmod p$, finding $x$ is intractable (Diffie-Hellman, ElGamal); 3. Elliptic Curve DLP (ECDLP): Given base point $P$ and public point $Q = k \\cdot P$ on a curve $y^2 = x^3 + ax + b$, finding the scalar integer $k$ is intractable.",
    hint: "Recall the 3 mathematical pillars: Factoring large primes, finding modular exponents, and finding scalar points on elliptic curves.",
    level: "moderate",
    codeExample: `// The 3 Asymmetric Hard Problems:
1. RSA: Factor N = p * q (p, q are 2048-bit primes)
2. Diffie-Hellman / DSA: Solve x in g^x ≡ y (mod p)
3. Elliptic Curve (ECC): Solve scalar k in Q = k * P`
  },
  {
    question: "What are the two distinct operational modes of asymmetric cryptography: 'Confidentiality Encryption' vs 'Digital Signatures'?",
    shortAnswer: "Confidentiality: Encrypt with Recipient's Public Key → Decrypt with Recipient's Private Key; Digital Signature: Sign with Sender's Private Key → Verify with Sender's Public Key.",
    explanation: "Asymmetric math supports two complementary workflows: 1. Confidentiality (Encryption): Sender Bob encrypts data using Alice's Public Key ($C = E_{Alice\\_Pub}(P)$). Only Alice's Private Key can decrypt it; 2. Authentication & Non-Repudiation (Digital Signatures): Sender Alice creates a signature over a hash using her Private Key ($S = \\text{Sign}_{Alice\\_Priv}(\\text{Hash}(M))$). Anyone in the world can verify $S$ using Alice's Public Key, proving undeniably that Alice authored the message.",
    hint: "Remember: Encrypt with THEIR public key for privacy; sign with YOUR private key for authenticity.",
    level: "basic",
    codeExample: `// Confidentiality vs Digital Signature:
1. Confidentiality:
   Sender:   Cipher = Encrypt( Data, Recipient_PublicKey )
   Receiver: Plain  = Decrypt( Cipher, Recipient_PrivateKey )

2. Digital Signature:
   Signer:   Signature = Sign( Hash(Document), Signer_PrivateKey )
   Verifier: IsValid   = Verify( Hash(Document), Signature, Signer_PublicKey )`
  },
  {
    question: "Why does 'Elliptic Curve Cryptography' (ECC) offer superior performance over RSA, and what is the key size equivalency between ECC-256 and RSA?",
    shortAnswer: "ECC-256 provides equivalent cryptographic strength (128-bit security) to RSA-3072, using a key size over 10x smaller, resulting in faster handshakes and lower bandwidth consumption.",
    explanation: "The best algorithm to break RSA (General Number Field Sieve) runs in sub-exponential time. However, solving the Elliptic Curve Discrete Logarithm Problem (ECDLP) requires Pollard's Rho algorithm, which runs in fully exponential time ($O(\\sqrt{N})$). Because ECDLP is mathematically harder per bit, a 256-bit ECC key provides identical security to a 3072-bit RSA key, enabling blazingly fast TLS handshakes on mobile devices and IoT sensors.",
    hint: "Think of packing the same vault security into a tiny microchip rather than a massive steel safe.",
    level: "moderate",
    codeExample: `// NIST Key Strength Equivalency:
Security Level | RSA Key Length | ECC Key Length
80-bit         | 1024 bits      | 160 bits (Deprecated)
112-bit        | 2048 bits      | 224 bits
128-bit        | 3072 bits      | 256 bits (P-256 / secp256k1)
256-bit        | 15360 bits     | 512 bits (Quantum-Resistant Margin)`
  },
  {
    question: "What is 'Diffie-Hellman Key Exchange' (DH / ECDH), and how do two parties establish a shared secret over an insecure channel without transmitting the secret?",
    shortAnswer: "Alice and Bob combine their private keys with each other's public keys ($K = (g^b)^a \\equiv (g^a)^b \\bmod p$ or $K = d_A \\cdot Q_B = d_B \\cdot Q_A$ on ECC), computing the exact same shared secret without sending it over the wire.",
    explanation: "In classical Diffie-Hellman: Alice picks private $a$, sends public $A = g^a \\bmod p$. Bob picks private $b$, sends public $B = g^b \\bmod p$. Alice computes $K_A = B^a = (g^b)^a = g^{ab} \\bmod p$. Bob computes $K_B = A^b = (g^a)^b = g^{ab} \\bmod p$. Both obtain the identical shared key $K = g^{ab} \\bmod p$. An eavesdropper who sees $g, p, A,$ and $B$ cannot compute $g^{ab} \\bmod p$ without solving the discrete logarithm problem.",
    hint: "Think of mixing two public paint colors with private secret colors to arrive at the exact same blended color.",
    level: "expert",
    codeExample: `// Diffie-Hellman Mathematical Shared Secret:
Alice: Picks secret a → Computes A = g^a mod p → Sends A to Bob
Bob:   Picks secret b → Computes B = g^b mod p → Sends B to Alice
Alice: SharedKey = B^a mod p = (g^b)^a = g^(ab) mod p
Bob:   SharedKey = A^b mod p = (g^a)^b = g^(ab) mod p (IDENTICAL SHARED SECRET!)`
  },
  {
    question: "What is the 'Man-in-the-Middle' (MitM) Key Replacement Attack on unauthenticated Diffie-Hellman, and how do 'Digital Certificates' (X.509) defeat it?",
    shortAnswer: "An active attacker intercepts public keys and establishes separate DH keys with Alice and Bob; Digital Certificates signed by trusted Certificate Authorities (CAs) bind public keys to verified domain identities, preventing key substitution.",
    explanation: "Raw Diffie-Hellman provides zero entity authentication. Attacker Mallory intercepts Alice's public key $A$, substitutes her own public key $M$, and intercepts Bob's public key $B$. Mallory now decrypts, reads, and re-encrypts all traffic. Public Key Infrastructure (PKI) defeats this: Bob's public key is encapsulated inside an X.509 certificate cryptographically signed by a trusted CA (e.g. DigiCert). Alice's browser verifies the CA signature, so Mallory cannot substitute her fake public key.",
    hint: "Think of presenting a notarized passport with an embossed government seal rather than verbally stating your name.",
    level: "moderate",
    codeExample: `// Man-in-the-Middle Attack vs PKI:
Without PKI: Alice <──[Key 1]──> Mallory (Attacker) <──[Key 2]──> Bob (Compromised!)
With PKI:    Alice verifies Bob's Certificate signed by trusted CA → Mallory's fake certificate is rejected!`
  },
  {
    question: "What is 'Forward Secrecy' (Perfect Forward Secrecy - PFS), and why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) while banning static RSA key exchange?",
    shortAnswer: "PFS generates unique, ephemeral key pairs for every session; compromising the server's long-term private key in the future cannot decrypt recorded past network sessions.",
    explanation: "In legacy static RSA key exchange, the client encrypted the pre-master secret with the server's static RSA public key. If an attacker recorded 5 years of encrypted network traffic and later stole the server's private key, they could decrypt all 5 years of historical traffic. In Ephemeral Diffie-Hellman (ECDHE), ephemeral keys are generated dynamically per session and immediately discarded from RAM. Stolen long-term private keys cannot decrypt past sessions.",
    hint: "Think of burning the physical padlock and key after every conversation so past conversations can never be reopened.",
    level: "expert",
    codeExample: `// Perfect Forward Secrecy (ECDHE):
Session 1: Ephemeral DH KeyPair 1 → Session Key 1 (Discarded after call)
Session 2: Ephemeral DH KeyPair 2 → Session Key 2 (Discarded after call)
// Attacker steals Server Private Key 2 years later → CANNOT DECRYPT Session 1 or 2!`
  },
  {
    question: "Under the Indian Information Technology Act 2000, what is a 'Digital Signature Certificate' (DSC), and what is the role of the Controller of Certifying Authorities (CCA)?",
    shortAnswer: "Under IT Act Section 35, licensed Certifying Authorities (CAs) issue DSCs under the regulatory supervision of the CCA; Section 3 and 5 give electronic digital signatures identical legal validity to handwritten physical signatures.",
    explanation: "The IT Act 2000 legally recognizes public-key cryptography in India. The Controller of Certifying Authorities (CCA) licenses CAs (e.g. eMudhra, (n)Code, Capricorn) to issue Class-3 Digital Signature Certificates (DSCs) using 2048-bit RSA keys stored on FIPS 140-2 Level 2 cryptographic USB crypto-tokens. Under Section 5 of the IT Act, documents signed with an authentic DSC have full legal admissibility and non-repudiation in Indian courts.",
    hint: "Remember the Indian statutory framework governing digital signatures and the national authority (CCA).",
    level: "basic",
    codeExample: `// Indian IT Act 2000 Legal Status:
IT Act Section 3: Authentication of Electronic Records via Asymmetric Cryptosystem.
IT Act Section 5: Legal recognition of Digital Signatures (Equal to physical ink signatures).
Supervisory Body: Controller of Certifying Authorities (CCA), Ministry of Electronics & IT.`
  },
  {
    question: "What is 'Shor's Algorithm' (Peter Shor, 1994), and how will fault-tolerant Quantum Computers break all classical asymmetric cryptography?",
    shortAnswer: "A quantum algorithm that computes period finding using Quantum Fourier Transform in polynomial time ($O((\\log N)^3)$), completely solving Prime Factorization (RSA) and Discrete Logarithms (ECC/DH).",
    explanation: "Classical computers require millions of years to factor a 2048-bit RSA modulus $N$. Shor's algorithm running on a sufficiently large fault-tolerant quantum computer (with ~4,000 stable logical qubits) finds the period of modular exponentiation in polynomial time $O((\\log N)^3)$—cracking RSA-2048 and ECC-256 in minutes. This renders all classical public-key cryptography completely obsolete once quantum computers scale.",
    hint: "Think of a quantum computer checking all mathematical combinations simultaneously in quantum superposition.",
    level: "expert",
    codeExample: `// Quantum Computational Complexity Impact:
Problem: Integer Factorization & Discrete Logarithms
Classical Best Algorithm (GNFS): Sub-Exponential Time → O( exp( (c log N)^(1/3) (log log N)^(2/3) ) )
Quantum Shor's Algorithm:        Polynomial Time     → O( (log N)^3 ) [100% BROKEN IN MINUTES!]`
  },
  {
    question: "What are the new NIST Post-Quantum Cryptography (PQC) standards standardized in 2024 to replace RSA and ECC?",
    shortAnswer: "FIPS 203 (ML-KEM / Kyber for Key Encapsulation) and FIPS 204 (ML-DSA / Dilithium for Digital Signatures), based on the mathematical hardness of Module Learning with Errors (MLWE) in high-dimensional lattices.",
    explanation: "To prepare for quantum threats, NIST standardized Post-Quantum Cryptography (PQC) in August 2024: 1. FIPS 203 (ML-KEM, based on CRYSTALS-Kyber): A lattice-based Key Encapsulation Mechanism replacing RSA/ECDH key exchange; 2. FIPS 204 (ML-DSA, based on CRYSTALS-Dilithium): A lattice-based digital signature algorithm replacing RSA/ECDSA; 3. FIPS 205 (SLH-DSA, based on SPHINCS+): A stateless hash-based signature backup.",
    hint: "Remember the modern lattice-based standards ML-KEM and ML-DSA designed to withstand quantum attacks.",
    level: "expert",
    codeExample: `// Post-Quantum Standards Hierarchy (NIST 2024):
Key Exchange / KEM:  FIPS 203 (ML-KEM / Kyber-768) → Replaces RSA-2048 & ECDH
Digital Signatures:  FIPS 204 (ML-DSA / Dilithium)   → Replaces RSA-PSS & ECDSA
Hash-Based Backup:   FIPS 205 (SLH-DSA / SPHINCS+)  → Stateless Hash Signatures`
  },
  {
    question: "What is 'Non-Repudiation', and why can asymmetric digital signatures prove non-repudiation while symmetric HMACs cannot?",
    shortAnswer: "Non-repudiation proves undeniably that a specific author created a message; in asymmetric signatures, ONLY the author holds the private key; in symmetric HMACs, both sender and receiver hold the key, so either could have generated the tag.",
    explanation: "In symmetric HMACs, Alice and Bob share key $K$. If an unauthorized bank transfer occurs, Alice can claim Bob generated the HMAC tag because Bob also holds $K$. In Asymmetric Digital Signatures, Alice's Private Key $K_{priv}$ is held exclusively by Alice (e.g. inside her hardware DSC token). Because nobody else on Earth has access to her private key, Alice cannot deny authoring the transaction (Non-Repudiation under IT Act Section 5).",
    hint: "Think about why a unique personal wax seal stamp only held by you proves you signed the document.",
    level: "moderate",
    codeExample: `// Non-Repudiation Proof:
HMAC (Symmetric):   Alice & Bob both hold Key K → Bob could have forged the tag → NO Non-Repudiation!
Digital Signature: ONLY Alice holds Private Key → Mathematical proof Alice authored message → TRUE Non-Repudiation!`
  },
  {
    question: "What is 'Ed25519' (Edwards-curve Digital Signature Algorithm), and why is it preferred over classical ECDSA in modern protocols like SSH and Signal?",
    shortAnswer: "A Twisted Edwards curve signature scheme using Curve25519; offers faster signature generation, constant-time execution with zero random number dependency during signing, and immunity to side-channel attacks.",
    explanation: "In classical ECDSA, generating a signature requires a cryptographically random nonce $k$. If the random number generator repeats or is biased even by 1 bit (as happened in Sony PlayStation 3's PS3 hack), an attacker calculates the private key instantly. Ed25519 (RFC 8032) derives the nonce deterministically from the private key and message hash, completely eliminating RNG failure vulnerabilities while executing in strict constant-time.",
    hint: "Think of an engine designed to work flawlessly even if the fuel quality fluctuates.",
    level: "expert",
    codeExample: `// ECDSA Flaw vs Ed25519 Deterministic Nonce:
ECDSA Flaw: Bad Random Nonce k → Private Key d = (s * k - Hash(m)) / r mod n → KEY COMPROMISED!
Ed25519:    Nonce is Deterministic: r = SHA-512( PrivateKey || Message ) → 100% IMMUNE TO RNG BIAS!`
  },
  {
    question: "What is the 'RSA-OAEP' (Optimal Asymmetric Encryption Padding) standard, and why is unpadded 'Textbook RSA' vulnerable to malleability and mathematical attacks?",
    shortAnswer: "Textbook RSA ($C = M^e \\bmod N$) is homomorphic ($E(M_1) \\cdot E(M_2) = E(M_1 \\cdot M_2)$), allowing attackers to forge ciphertexts; RSA-OAEP adds randomized Feistel padding with cryptographic hashes to achieve IND-CCA2 security.",
    explanation: "In Textbook RSA, encrypting message $M$ without padding is strictly deterministic ($C = M^e \\bmod N$). An attacker who intercepts $C$ can multiply it by $2^e \\bmod N$ to produce $C' = (2M)^e \\bmod N$, doubling the value without knowing the private key. RSA-OAEP (PKCS#1 v2.2) uses two hash functions in an all-or-nothing Feistel transform to randomize the input plaintext, making ciphertext bit-flipping and chosen-ciphertext attacks mathematically impossible.",
    hint: "Think of adding randomized cryptographic bubble wrap around a gift before locking it in a box.",
    level: "expert",
    codeExample: `// RSA-OAEP vs Textbook RSA:
Textbook RSA: C = M^e mod N (Vulnerable to Multiplicative Malleability & Coppersmith Attacks)
RSA-OAEP:     M_padded = OAEP_Encode( M, Hash_SHA256, Random_Seed )
              C = (M_padded)^e mod N (IND-CCA2 Provably Secure!)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, how does asymmetric public-key cryptography safeguard user consent management?",
    shortAnswer: "Users cryptographically sign digital consent artifacts using asymmetric keys; Consent Managers verify signatures via public keys, creating legally binding, tamper-evident audit trails.",
    explanation: "Under the DPDP Act 2023, processing personal data requires explicit, informed user consent. By deploying asymmetric digital signatures, when a user grants consent via a licensed 'Consent Manager', the consent artifact is cryptographically signed with the user's private key. The data fiduciary verifies the signature against the user's public key, guaranteeing non-repudiation and providing audit-proof compliance to the Data Protection Board of India.",
    hint: "Remember how digital signatures provide legally binding consent artifacts under Indian data privacy laws.",
    level: "moderate",
    codeExample: `// DPDP Act 2023 Digital Consent Architecture:
Consent Artifact: { User: "Mahima", Purpose: "EHR Processing", Expiry: "2027-01-01" }
Signature:        Sign( Hash(Consent_Artifact), Mahima_PrivateKey )
Verification:     Verify( Consent_Artifact, Signature, Mahima_PublicKey ) → 100% Legal Compliance!`
  },
  {
    question: "What is 'Key Encapsulation Mechanism' (KEM), and how does it differ from traditional public-key encryption in modern hybrid protocols?",
    shortAnswer: "Instead of encrypting an arbitrary plaintext message, a KEM generates a shared symmetric key and simultaneously encapsulates (encrypts) it using the recipient's public key.",
    explanation: "In traditional public-key encryption (like RSA), the sender creates a symmetric key and encrypts it with padding ($C = \\text{Enc}(K_{pub}, Key)$). In a Key Encapsulation Mechanism (like ML-KEM / Kyber), the algorithm takes the public key and outputs two things at once: a random symmetric shared secret $K$ and its encapsulated ciphertext $C = \\text{Encap}(K_{pub})$. The receiver runs $\\text{Decap}(K_{priv}, C)$ to recover $K$. KEMs are mathematically cleaner and avoid complex padding attacks.",
    hint: "Think of an automated machine that creates a key and its sealed shipping box in one single mechanical motion.",
    level: "expert",
    codeExample: `// Key Encapsulation Mechanism (KEM) Flow:
Sender:   (Shared_Secret_K, Ciphertext_C) = KEM_Encapsulate( Recipient_PublicKey )
Receiver: Shared_Secret_K = KEM_Decapsulate( Ciphertext_C, Recipient_PrivateKey )`
  },
  {
    question: "What is 'Zero-Knowledge Proof' (ZKP / e.g. zk-SNARKs), and how does it allow a prover to demonstrate possession of a private key without revealing the key?",
    shortAnswer: "A cryptographic protocol where Prover Peggy proves to Verifier Victor that a statement is true (e.g. 'I know the private key corresponding to this public key') without conveying any information other than the fact that she knows it.",
    explanation: "Introduced by Goldwasser, Micali, and Rackoff in 1985, a Zero-Knowledge Proof satisfies three properties: 1. Completeness: If the statement is true, an honest verifier will be convinced; 2. Soundness: If the statement is false, no cheating prover can convince the verifier; 3. Zero-Knowledge: The verifier learns nothing about the secret witness itself. In blockchain identity and authentication, ZKPs allow users to prove identity and solvency without revealing secret private keys or financial balances.",
    hint: "Think of proving you know the secret password to a cave door by entering one side of the cave and walking out the other side without saying the password aloud.",
    level: "expert",
    codeExample: `// Zero-Knowledge Proof Properties:
1. Completeness: Pr[Verifier Accepts True Proof] = 1.0
2. Soundness:    Pr[Cheating Prover Succeeds] <= 2^-128 (Negligible)
3. Zero-Knowledge: Verifier learns ZERO bits about Private Key!`
  },
  {
    question: "What is 'Elliptic Curve Point Multiplication' ($Q = k \\cdot P$), and why is it computationally easy to compute $k \\cdot P$ but impossible to find $k$ given $P$ and $Q$?",
    shortAnswer: "Point multiplication is computed efficiently using the 'Double-and-Add' algorithm in $O(\\log k)$ steps; finding $k$ requires solving the Elliptic Curve Discrete Logarithm Problem (ECDLP), which has no known polynomial-time classical algorithm.",
    explanation: "On an elliptic curve $y^2 = x^3 + ax + b \\pmod p$, point addition ($P + Q = R$) is defined geometrically by drawing a line through $P$ and $Q$ and reflecting the third intersection point across the x-axis. Using the Double-and-Add algorithm (analogous to square-and-multiply), calculating $Q = k \\cdot P$ for a 256-bit scalar $k$ requires only ~384 geometric point operations. However, reversing this to find $k$ given $P$ and $Q$ requires $O(\\sqrt{p}) \\approx 2^{128}$ operations, which is physically impossible on classical computers.",
    hint: "Think of jumping from stepping stone to stepping stone across a giant pond: following the secret map takes 1 minute, but guessing which combination of stones was used takes billions of years.",
    level: "expert",
    codeExample: `// Double-and-Add Algorithm for Q = k * P:
Point Q = Infinity;
for bit in binary_representation(k):
    Q = PointDouble(Q); // Q = 2 * Q
    if bit == 1:
        Q = PointAdd(Q, P); // Q = Q + P
return Q; // Computes k * P in O(log k) steps!`
  },
  {
    question: "Synthesizing Asymmetric Key Cryptography: what is the master architectural role of public-key cryptography in modern digital civilization?",
    shortAnswer: "Asymmetric cryptography solves the foundational problems of Trust, Identity, and Key Establishment, enabling secure global internet commerce, digital signatures, and end-to-end encryption without prior shared secrets.",
    explanation: "Without asymmetric cryptography, the global internet economy could not exist: every e-commerce purchase, banking transaction, and encrypted chat would require physically exchanging secret keys in advance. By uniting one-way trapdoor mathematics (RSA, ECC, ML-KEM) with Public Key Infrastructure (X.509 CAs) and statutory legal frameworks (Indian IT Act 2000), public-key cryptography provides the mathematical foundation of trust in the digital age.",
    hint: "Conclude by recognizing how asymmetric cryptography provides the mathematical foundation of universal digital trust.",
    level: "expert",
    codeExample: `// The Master Asymmetric Trust Equation:
(Trapdoor_Math + PKI_Trust_Chains + Digital_Signatures_IT_Act) = UNIVERSAL_DIGITAL_TRUST;`
  }
];

export default questions;
