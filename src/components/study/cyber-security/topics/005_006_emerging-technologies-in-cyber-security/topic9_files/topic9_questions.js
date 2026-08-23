const questions = [
  {
    id: 1,
    question: "What is a Lattice in mathematics and which two foundational NP-hard problems provide security for lattice-based Post-Quantum Cryptography?",
    shortAnswer: "A lattice is a discrete periodic grid of points in $n$-dimensional Euclidean space $\\mathbb{R}^n$ formed by integer linear combinations of basis vectors. The two core computational hardness problems are: 1. Shortest Vector Problem (SVP): Finding the shortest non-zero lattice vector; 2. Closest Vector Problem (CVP): Finding the lattice point closest to an arbitrary target point.",
    explanation: "In high dimensions ($n \\ge 512$), finding approximate solutions to SVP and CVP requires exponential time on both classical and quantum computers.",
    hint: "Shortest Vector Problem (SVP) and Closest Vector Problem (CVP) in high-dimensional lattices.",
    level: "Basic",
    codeExample: `// Lattice Vector Grid:
// Lambda = { z1*b1 + z2*b2 + ... + zn*bn | zi in Integers }
// SVP: min ||v|| for v in Lambda, v != 0 (NP-hard in high dimensions)`
  },
  {
    id: 2,
    question: "What is the Learning With Errors (LWE) problem formulated by Oded Regev in 2005?",
    shortAnswer: "LWE asks to solve a system of noisy linear equations over a finite field: Given a random public matrix $\\mathbf{A} \\in \\mathbb{Z}_q^{m \\times n}$ and a noisy vector $\\mathbf{b} = \\mathbf{A}\\mathbf{s} + \\mathbf{e} \\pmod q$ (where $\\mathbf{e}$ is small Gaussian error), recover the secret integer vector $\\mathbf{s}$.",
    explanation: "Without the error vector $\\mathbf{e}$, the system could be solved easily via Gaussian elimination; adding small noise makes it provably as hard as worst-case lattice problems.",
    hint: "Given b = A*s + e (mod q), finding secret vector s is computationally infeasible due to small noise e.",
    level: "Basic",
    codeExample: `// LWE Equation:
// b = A * s + e (mod q)
// Without error 'e' : Solvable via Gaussian Elimination in O(n^3) ❌
// With error 'e'    : Exponential complexity (Quantum-Safe ✔)`
  },
  {
    id: 3,
    question: "What is the difference between Standard LWE, Ring-LWE (R-LWE), and Module-LWE (M-LWE)?",
    shortAnswer: "Standard LWE uses generic matrices (large key sizes, slow multiplication). Ring-LWE replaces matrices with elements of a polynomial quotient ring $\\mathbb{Z}_q[X]/(X^n + 1)$, reducing key sizes by factor $n$ and enabling $O(n\\log n)$ multiplication via Number Theoretic Transform (NTT). Module-LWE is a hybrid using small matrices of ring polynomials, offering balanced trade-offs between algebraic security and efficiency.",
    explanation: "CRYSTALS-Kyber (ML-KEM) and CRYSTALS-Dilithium (ML-DSA) use Module-LWE.",
    hint: "Standard uses full matrices; Ring uses single polynomial rings; Module uses matrices of polynomial rings.",
    level: "Moderate",
    codeExample: `// Lattice Variants:
// LWE        : Generic Matrix A in Z_q^(m x n) (Large Keys)
// Ring-LWE   : Single Polynomial Ring a(x) in Z_q[X]/(X^n+1)
// Module-LWE : Matrix of Polynomials A_hat in (Z_q[X]/(X^n+1))^(k x k) (Kyber/Dilithium ✔)`
  },
  {
    id: 4,
    question: "What is a Lamport One-Time Signature (OTS) and why does reusing a private key compromise security?",
    shortAnswer: "Lamport OTS generates 256 pairs of random strings $(sk_{0,i}, sk_{1,i})$ and publishes their hashes $(H(sk_{0,i}), H(sk_{1,i}))$. Signing reveals $sk_{0,i}$ if bit is 0, or $sk_{1,i}$ if bit is 1. If a key is reused to sign a second different message, an attacker intercepts both $sk_0$ and $sk_1$ for conflicting bit positions, allowing them to forge signatures on arbitrary new messages.",
    explanation: "Lamport OTS is strictly a single-use signature scheme.",
    hint: "Signing reveals half the private keys; signing a second message reveals the rest, allowing full forgery.",
    level: "Basic",
    codeExample: `// Lamport Key Compromise:
// Msg 1 (0101...) ➔ Reveals [sk0_0, sk1_1, sk0_2, sk1_3]
// Msg 2 (1100...) ➔ Reveals [sk1_0, sk1_1, sk0_2, sk0_3]
// Attacker now owns both sk0 and sk1 for bit 0 and bit 3 ➔ FORGERY POSSIBLE! 🚨`
  },
  {
    id: 5,
    question: "How does the Merkle Signature Scheme (MSS / XMSS) scale Lamport OTS to sign multiple messages?",
    shortAnswer: "XMSS (eXtended Merkle Signature Scheme - RFC 8391) generates $2^H$ individual one-time OTS key pairs and places their public key hashes as the leaves of a binary Merkle Tree. The single Merkle Root is the permanent master public key. Signing a message consumes one OTS leaf and attaches the $O(H)$ Merkle authentication path to the root.",
    explanation: "XMSS allows signing $2^{10} = 1,024$ or $2^{20} = 1,000,000$ messages from a single 32-byte public key.",
    hint: "Places OTS keys as leaves in a Merkle tree; master public key is the Merkle root.",
    level: "Moderate",
    codeExample: `// XMSS Tree Architecture:
// Leaves: [OTS_0, OTS_1, ..., OTS_1023]
// Master Public Key = Merkle Root (32 Bytes)
// Signature = [OTS_Key_i_Signature] + [Merkle Authentication Path to Root]`
  },
  {
    id: 6,
    question: "What is the difference between Stateful (XMSS / LMS) and Stateless (SPHINCS+ / SLH-DSA) Hash-Based Signatures?",
    shortAnswer: "Stateful schemes (XMSS/LMS) MUST track an internal sequential leaf counter to ensure no OTS key is ever used twice. If a virtual machine snapshot reverts state or two threads reuse the same counter index, security collapses. Stateless schemes (SPHINCS+ / SLH-DSA) use a massive hypertree of Few-Time Signatures (FORS) where signing chooses random leaves, eliminating state tracking entirely.",
    explanation: "Stateless SPHINCS+ is robust against VM snapshot rollbacks and multi-threading concurrency bugs.",
    hint: "Stateful must track which keys were used (fragile in cloud VMs); Stateless needs no counter tracking.",
    level: "Expert",
    codeExample: `// Stateful vs Stateless:
// XMSS (Stateful)   : VM Snapshot Rollback ➔ Reuses Leaf #4 ➔ PRIVATE KEY LEAKED! ❌
// SPHINCS+ (Stateless): Pseudo-random leaf selection across 2^64 hypertree ➔ Safe against VM Rollbacks ✔`
  },
  {
    id: 7,
    question: "What is the Number Theoretic Transform (NTT) and why is it essential for Lattice-Based Cryptography?",
    shortAnswer: "NTT is a specialized discrete Fourier transform over a finite field $\\mathbb{Z}_q$. It reduces the computational complexity of multiplying two degree-$n$ ring polynomials from $O(n^2)$ classical schoolbook multiplication down to $O(n\\log n)$ quasi-linear time, accelerating polynomial operations by over 100x.",
    explanation: "NTT enables CRYSTALS-Kyber and Dilithium to execute microsecond key exchanges on standard microprocessors.",
    hint: "Discrete Fourier transform over finite fields reducing polynomial multiplication from O(n^2) to O(n log n).",
    level: "Expert",
    codeExample: `// NTT Polynomial Multiplication:
// c(x) = NTT_Inverse( NTT(a(x)) * NTT(b(x)) ) (Takes O(n log n) steps!)`
  },
  {
    id: 8,
    question: "Why is Hash-Based Cryptography considered the 'Most Conservative' and trusted Post-Quantum family?",
    shortAnswer: "Because its security depends strictly on the well-studied mathematical collision and preimage resistance of established cryptographic hash functions (SHA-256 / SHAKE-256). It relies on zero unproven structural algebra (unlike lattices or multivariate codes) and is mathematically immune to algebraic decomposition attacks.",
    explanation: "If SHA-256 is secure, SPHINCS+ and XMSS are unconditionally quantum-safe.",
    hint: "Relies only on standard hash functions (SHA-256) with zero complex algebraic assumptions.",
    level: "Basic",
    codeExample: `// Hash-Based Trust Guarantee:
// Security Proof: Attacking SPHINCS+ requires finding a SHA-256 preimage (2^256 classical / 2^128 quantum).`
  },
  {
    id: 9,
    question: "What is the trade-off of Hash-Based Signatures (SPHINCS+) compared to Lattice Signatures (Dilithium)?",
    shortAnswer: "SPHINCS+ has exceptionally compact public keys (32 bytes) and bulletproof mathematical trust, but produces extremely large signatures (7,856 bytes for SLH-DSA-128) and slower signing speeds. Dilithium produces faster signing speeds and smaller signatures (2,420 to 3,293 bytes), but relies on newer lattice hardness assumptions.",
    explanation: "SPHINCS+ is ideal for firmware signing; Dilithium is ideal for real-time TLS handshakes and smart cards.",
    hint: "SPHINCS+ has tiny public keys (32B) but huge signatures (8KB); Dilithium has balanced key/signature sizes.",
    level: "Moderate",
    codeExample: `// Size Comparison:
// ML-DSA-65 (Dilithium) : PubKey = 1,952 B | Signature = 3,293 B (Fast)
// SLH-DSA-128 (SPHINCS+) : PubKey = 32 B    | Signature = 7,856 B (Conservative)`
  },
  {
    id: 10,
    question: "What is Decryption Failure Probability in Lattice-Based Encryption (LWE / Kyber)?",
    shortAnswer: "In LWE, encryption adds small Gaussian noise vectors $\\mathbf{e}$. During decryption, if the cumulative sum of noise terms happens to exceed the decision boundary threshold ($q/4$), the decrypted bit flips, causing a rare decryption failure (e.g., $\\delta < 2^{-138}$ in Kyber-768). Parameters are calibrated so failure probability is negligible.",
    explanation: "A non-zero decryption failure probability must be protected by the Fujisaki-Okamoto transform.",
    hint: "Rare probability (< 2^-138) that cumulative Gaussian noise exceeds decision threshold causing a bit error.",
    level: "Expert",
    codeExample: `// Noise Boundary:
// Decrypted = (v - s*u) = bit*(q/2) + noise
// If noise > q/4 ➔ Bit Flip Error (Calibrated to < 1 in 10^40 operations)`
  },
  {
    id: 11,
    question: "What is the Fujisaki-Okamoto (FO) Transform and why is it required to convert Chosen-Plaintext Secure (IND-CPA) lattices into Chosen-Ciphertext Secure (IND-CCA2) KEMs?",
    shortAnswer: "Raw LWE encryption is only CPA-secure; an adversary submitting crafted ciphertexts can exploit decryption failure errors to reconstruct the private key $\\mathbf{s}$. The FO transform re-encrypts the decrypted plaintext using a deterministic random oracle and verifies that the generated ciphertext exactly matches the received ciphertext, aborting if any tampering is detected.",
    explanation: "The FO transform is the mandatory mathematical bridge that makes Kyber IND-CCA2 secure.",
    hint: "Re-encrypts decrypted text and verifies matching ciphertext to prevent chosen-ciphertext attacks.",
    level: "Expert",
    codeExample: `// Fujisaki-Okamoto KEM Decapsulation:
// 1. m' = Decrypt(c, sk)
// 2. c' = Encrypt(m', RandomSeed(m'))
// 3. If c != c' ➔ REVERT / RETURN PSEUDO-RANDOM VALUE (Stops CCA2 probing! ✔)`
  },
  {
    id: 12,
    question: "What is Code-Based Cryptography (Classic McEliece) and why is it a primary finalist for long-term key encapsulation?",
    shortAnswer: "Introduced by Robert McEliece in 1978, it relies on the hardness of decoding a random linear error-correcting Goppa code (Syndrome Decoding). It has survived 45+ years of intense cryptanalysis without any polynomial quantum speedup. Its primary drawback is a massive public key size (261 KB to 1 MB).",
    explanation: "Classic McEliece has the longest security track record of all post-quantum candidates.",
    hint: "45-year-old system based on Goppa error-correcting codes; highly secure but requires huge public keys (512KB).",
    level: "Moderate",
    codeExample: `// Classic McEliece Profile:
// Public Key Size  : 524,160 Bytes (~512 KB)
// Ciphertext Size  : 128 Bytes (Ultra-compact!)
// Security History : Unbroken since 1978 ✔`
  },
  {
    id: 13,
    question: "What is Multivariate Quadratic (MQ) Cryptography and why did the Rainbow signature scheme collapse in 2022?",
    shortAnswer: "MQ cryptography relies on the NP-hardness of solving systems of non-linear quadratic polynomial equations over finite fields. In 2022, Ward Beullens published an algebraic 'MinRank / Rectangular Oil-and-Vinegar' attack that completely broke the Rainbow NIST finalist signature scheme on a standard laptop in under 53 hours.",
    explanation: "The collapse of Rainbow demonstrated the danger of relying on complex unproven algebraic structures.",
    hint: "Based on solving systems of quadratic equations; Rainbow was broken in 2022 on a standard laptop.",
    level: "Expert",
    codeExample: `// Beullens Rainbow Attack (2022):
// Laptop CPU (53 hours) -> Solves MinRank algebraic subspace -> Extracts Rainbow Layer-1 Secret Keys 🚨`
  },
  {
    id: 14,
    question: "What was SIKE (Supersingular Isogeny Key Encapsulation) and how was it broken in 2022 by Castryck and Decru?",
    shortAnswer: "SIKE was an isogeny-based candidate using elliptic curve walks with ultra-compact public keys (330 bytes). In July 2022, Castryck and Decru used the Kani-Rosen-Liebendörfer gluing theorem from 1997 algebraic geometry to compute the hidden isogeny in 1 hour on a single CPU core using auxiliary torsion point information.",
    explanation: "SIKE was completely eliminated from NIST standardization overnight.",
    hint: "Isogeny candidate with tiny keys, completely broken in 1 hour using auxiliary torsion points in 2022.",
    level: "Expert",
    codeExample: `// SIKE Demise:
// Castryck-Decru attack exploited (P, Q) torsion auxiliary points -> 100% private key recovery in 60 mins.`
  },
  {
    id: 15,
    question: "What is Falcon (FN-DSA) and how does NTRU lattice trapdoor sampling differ from Dilithium?",
    shortAnswer: "Falcon is a lattice-based digital signature based on NTRU lattices using Fast Fourier Trapdoor Sampling (GPV framework). It generates the most compact public keys (897 bytes) and signatures (666 bytes) among lattice schemes, but requires constant-time 64-bit IEEE 754 floating-point arithmetic, making secure hardware implementation extremely difficult.",
    explanation: "NIST selected Falcon as an alternative standard for environments where bandwidth is constrained.",
    hint: "Uses NTRU lattices with fast Fourier sampling; ultra-compact signatures (666B) but requires floating-point math.",
    level: "Expert",
    codeExample: `// Falcon vs Dilithium:
// Falcon-512   : PubKey = 897 B  | Sig = 666 B (Smallest, but requires floating-point math)
// Dilithium-2  : PubKey = 1312 B | Sig = 2420 B (Integer-only arithmetic, easier hardware security)`
  },
  {
    id: 16,
    question: "What is Kyber (ML-KEM) and what are its three NIST security parameter sets?",
    shortAnswer: "ML-KEM (Module-Lattice Key Encapsulation Mechanism - NIST FIPS 203) is the primary global standard for post-quantum key exchange. Three parameter sets: 1. ML-KEM-512 (NIST Level 1 - AES-128 equivalent); 2. ML-KEM-768 (NIST Level 3 - AES-192 equivalent, Recommended Standard); 3. ML-KEM-1024 (NIST Level 5 - AES-256 equivalent).",
    explanation: "ML-KEM-768 is the default recommendation for enterprise TLS 1.3 and VPN deployments.",
    hint: "NIST FIPS 203 standard with 3 levels: ML-KEM-512, ML-KEM-768 (recommended), and ML-KEM-1024.",
    level: "Basic",
    codeExample: `// ML-KEM-768 Specifications:
// Modulus q = 3329 | Polynomial Degree n = 256 | Module Rank k = 3
// Public Key = 1,184 Bytes | Ciphertext = 1,088 Bytes | Shared Secret = 32 Bytes`
  },
  {
    id: 17,
    question: "What is Dilithium (ML-DSA) and how does Fiat-Shamir with Aborts operate?",
    shortAnswer: "ML-DSA (Module-Lattice Digital Signature Algorithm - NIST FIPS 204) is the primary digital signature standard. It uses the 'Fiat-Shamir with Aborts' paradigm (Lyubashevsky): it computes candidate signature vectors, and if the signature leaks information about the secret key distribution, it intentionally aborts and restarts, ensuring signature distributions are independent of the private key.",
    explanation: "Rejection sampling eliminates the need for complex Gaussian sampling trapdoors.",
    hint: "NIST FIPS 204 signature standard using Fiat-Shamir with Aborts to eliminate private key leakage.",
    level: "Expert",
    codeExample: `// Fiat-Shamir with Aborts:
// 1. y = SampleRandom()
// 2. w = A * y
// 3. c = Hash(M, w)
// 4. z = y + c * s
// 5. If ||z|| exceeds rejection threshold ➔ ABORT & RESTART (Prevents key leakage ✔)`
  },
  {
    id: 18,
    question: "What is SPHINCS+ (SLH-DSA - NIST FIPS 205) and what is the FORS (Forest of Random Subsets) scheme?",
    shortAnswer: "SLH-DSA is a stateless hash-based signature standard. FORS is a Few-Time Signature (FTS) primitive consisting of $k$ independent Merkle trees of height $a$. The message hash selects one leaf from each of the $k$ trees; revealing these $k$ secret leaves signs the message with negligible collision probability even over $2^{64}$ signatures.",
    explanation: "FORS signs message digests at the bottom layer of the SPHINCS+ hyper-tree.",
    hint: "Few-Time Signature scheme inside SPHINCS+ consisting of k Merkle trees of height a.",
    level: "Expert",
    codeExample: `// FORS Architecture:
// Message Digest ➔ Parsed into k integer indices ➔ Reveals k secret leaf nodes across k Merkle trees.`
  },
  {
    id: 19,
    question: "What is the impact of larger PQC public keys on TCP packet fragmentation in TLS handshakes?",
    shortAnswer: "Standard TCP Maximum Segment Size (MSS) is 1,460 bytes. Classical RSA/ECDHE keys easily fit inside a single TCP packet. PQC public keys and certificates (e.g., Dilithium certificates $> 3\\text{ KB}$) exceed the MSS, forcing IP packet fragmentation. Packet loss during handshake causes TCP head-of-line blocking and increases connection latency by 15–30%.",
    explanation: "Mitigated by tuning TCP initial congestion windows (initcwnd = 10) and using TLS certificate compression (RFC 8879).",
    hint: "PQC keys exceed the 1460-byte TCP MSS, causing packet fragmentation and connection latency.",
    level: "Moderate",
    codeExample: `// TCP Fragmentation:
// Classical ECDH : 32 Bytes (1 Single IP Packet) ✔
// ML-DSA Cert    : 3,400 Bytes (Spans 3 Fragmented IP Packets ⚠️)`
  },
  {
    id: 20,
    question: "What is Hybrid Cryptographic Key Exchange in TLS 1.3 (e.g., `X25519Kyber768Draft00`)?",
    shortAnswer: "A defense-in-depth transition mechanism where the client and server negotiate BOTH an elliptic curve key exchange (X25519) and a post-quantum KEM (ML-KEM-768) simultaneously. The final symmetric encryption key is derived via: $\\text{Key} = \\text{HKDF}(\\text{X25519\\_Shared\\_Secret} || \\text{Kyber\\_Shared\\_Secret})$.",
    explanation: "If a future mathematical breakthrough breaks Kyber, X25519 protects the session; if a quantum computer arrives, Kyber protects the session.",
    hint: "Combines classical X25519 and PQC Kyber shared secrets into a single HKDF derived session key.",
    level: "Basic",
    codeExample: `// Hybrid TLS 1.3 Handshake:
// Client sends: ClientHello + KeyShare[X25519_Pub, Kyber768_Ciphertext]
// MasterKey = HKDF-Extract(X25519_Secret || Kyber_Secret)`
  },
  {
    id: 21,
    question: "What is Side-Channel Resistance in Post-Quantum Cryptographic implementations (e.g., Power Analysis & Timing Attacks)?",
    shortAnswer: "Lattice operations involve polynomial coefficients and rejection sampling loops that can leak private key bits via execution timing or power consumption spikes (DPA/CPA). Constant-time programming (eliminating secret-dependent memory lookups and branch jumps) and Masking (splitting secret polynomials into random shares) are mandatory.",
    explanation: "Constant-time implementations prevent cache-timing attacks on lattice algorithms.",
    hint: "Ensuring code executes in constant time with masked variables to prevent power and timing side-channel leaks.",
    level: "Expert",
    codeExample: `// Constant-Time Selection:
// int val = (mask & a) | (~mask & b); (Zero branch instructions)`
  },
  {
    id: 22,
    question: "What is the LWE Gaussian Error Distribution and why is it used instead of Uniform Random Noise?",
    shortAnswer: "Discrete Gaussian distributions $\\chi_\\sigma$ concentrate noise tightly around zero with rapidly decaying tails. This guarantees that noise terms remain small enough for reliable decryption while mathematically enabling worst-case to average-case security reductions to lattice SVP problems.",
    explanation: "Regev proved that solving average-case LWE with Gaussian noise is as hard as solving worst-case lattice problems.",
    hint: "Concentrates noise around zero with rapid tail decay, enabling worst-case to average-case security proofs.",
    level: "Expert",
    codeExample: `// Discrete Gaussian Sampling:
// P(e = x) = exp(-pi * x^2 / sigma^2) / sum_y(exp(-pi * y^2 / sigma^2))`
  },
  {
    id: 23,
    question: "What is XMSS-MT (Multi-Tree XMSS) and how does it increase message signing capacity to $2^{60}$?",
    shortAnswer: "XMSS-MT arranges multiple layers of Merkle trees into a hierarchical hyper-tree of depth $D$. The top tree signs the roots of the sub-trees in layer 2, which sign the roots in layer 3, down to layer $D$. This distributes key generation and signing computation, allowing practical issuance of $2^{60}$ signatures.",
    explanation: "Multi-tree structures enable stateful hash-based signatures for high-volume enterprise certificate authorities.",
    hint: "Hierarchical hyper-tree of Merkle trees allowing issuance of billions of signatures without slow keygen.",
    level: "Moderate",
    codeExample: `// XMSS-MT Hyper-Tree:
// Layer 1 (Root Tree) ➔ Signs Layer 2 Sub-Tree Roots ➔ Signs Layer 3 Leaf OTS Keys (Capacity: 2^60 signatures)`
  },
  {
    id: 24,
    question: "What is Dual-Certificate PKI Architecture during PQC Transition?",
    shortAnswer: "An X.509 certificate architecture (ITU-T X.509 / IETF draft) where a server presents a certificate containing BOTH a classical public key (RSA-2048 / ECDSA) and a post-quantum public key (ML-DSA). Legacy clients verify the classical signature, while modern quantum-ready clients verify the PQC signature.",
    explanation: "Dual certificates provide backward compatibility while hardening quantum-aware connections.",
    hint: "X.509 certificates containing both classical and PQC public keys for full backward compatibility.",
    level: "Moderate",
    codeExample: `// Dual X.509 Extensions:
// SubjectAltPublicKeyInfo: [ML-DSA-65 Public Key]
// Signature: [RSA-2048 Signature] + AltSignature: [ML-DSA-65 Signature]`
  },
  {
    id: 25,
    question: "What is the Kyber Compression Algorithm ($d_u, d_v$) and how does it save bandwidth?",
    shortAnswer: "Kyber rounds each 12-bit polynomial coefficient in $\\mathbb{Z}_{3329}$ down to $d$ bits (e.g., $d_u = 10$ bits, $d_v = 4$ bits): $\\text{Compress}_q(x, d) = \\lfloor (2^d / q) \\cdot x \\rceil \\pmod{2^d}$. This discards low-order noise bits that carry zero information, reducing ciphertext size by over 40%.",
    explanation: "Compression shrinks ML-KEM-768 ciphertext from ~1,800 bytes down to exactly 1,088 bytes.",
    hint: "Rounds polynomial coefficients down to fewer bits, discarding low-order noise to reduce ciphertext size by 40%.",
    level: "Expert",
    codeExample: `// Coefficient Compression:
// Original: 12-bit integer (0 to 3328) ➔ Compressed: 10-bit integer (0 to 1023)`
  },
  {
    id: 26,
    question: "What is Cryptographic Agility in Enterprise PQC Migration?",
    shortAnswer: "Building security protocols and application layers with modular, pluggable cryptographic interfaces so that algorithms (e.g., switching from ML-KEM-768 to Classic McEliece or Falcon) can be swapped instantly via configuration without modifying application source code or database schemas.",
    explanation: "Agility protects organizations in case a newly deployed PQC algorithm suffers an unexpected mathematical vulnerability.",
    hint: "Pluggable modular cryptographic architecture allowing ciphers to be swapped via configuration.",
    level: "Basic",
    codeExample: `// OpenSSL 3.0 OQS Provider:
// LoadProvider("oqsprovider") ➔ Default cipher: "kyber768" (Can be swapped to "falcon512" via conf file)`
  },
  {
    id: 27,
    question: "What is the Dilithium Matrix Rank $k \\times l$ across NIST security levels 2, 3, and 5?",
    shortAnswer: "ML-DSA-44 (Level 2): $k=4, l=4$ (PubKey 1,312 B, Sig 2,420 B); ML-DSA-65 (Level 3): $k=6, l=5$ (PubKey 1,952 B, Sig 3,293 B); ML-DSA-87 (Level 5): $k=8, l=7$ (PubKey 2,592 B, Sig 4,595 B). Increasing matrix rank expands the lattice dimension, raising hardness against quantum lattice reduction (BKZ).",
    explanation: "Level 3 (ML-DSA-65) is the primary general-purpose standard recommended for enterprise PKI.",
    hint: "ML-DSA-44 (4x4), ML-DSA-65 (6x5 recommended), and ML-DSA-87 (8x7 highest security).",
    level: "Moderate",
    codeExample: `// Dilithium Parameter Sets:
// Level 2 : ML-DSA-44 (k=4, l=4)
// Level 3 : ML-DSA-65 (k=6, l=5) - Enterprise Standard ✔
// Level 5 : ML-DSA-87 (k=8, l=7)`
  },
  {
    id: 28,
    question: "What is the BKZ (Block Korkine-Zolotarev) Algorithm in assessing lattice security bit-strength?",
    shortAnswer: "BKZ is the state-of-the-art classical and quantum lattice reduction algorithm used to solve the Shortest Vector Problem (SVP). Cryptographers assess the bit security of an LWE parameter set by calculating the minimum BKZ block size $\\beta$ and quantum sieve operations required to reduce the lattice basis.",
    explanation: "Kyber-768 requires BKZ block size $\\beta \\ge 620$, corresponding to $> 2^{192}$ quantum operations.",
    hint: "Leading lattice reduction algorithm; security is measured by the block size beta required to break the lattice.",
    level: "Expert",
    codeExample: `// BKZ Hardness:
// Core-SVP Quantum Sieve Cost: 2^(0.265 * beta) operations
// For Kyber-768 (beta = 620) ➔ Security > 2^164 operations (Exceeds NIST Level 3 ✔)`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Treasury deployment, engineers upgraded all municipal smart card digital signatures to NIST FIPS 204 ML-DSA-65. What memory and verification optimization was implemented for low-power smart card chips?",
    shortAnswer: "Because smart cards have limited RAM (under 8 KB), engineers implemented Streaming Number Theoretic Transform (NTT) polynomial computation and in-place verification, which processes polynomial matrix columns sequentially without loading the entire 3.3 KB signature into volatile RAM simultaneously.",
    explanation: "Streaming verification allows resource-constrained smart cards to verify PQC signatures without memory exhaustion.",
    hint: "Streaming NTT computation and in-place signature verification to operate within 8 KB smart card RAM limits.",
    level: "Expert",
    codeExample: `// Streaming Verification:
// For col in range(5):
//   Compute NTT column in-place -> Accumulate hash -> Release buffer (Peak RAM: < 1.5 KB ✔)`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical comparison matrix across all major NIST Post-Quantum Cryptography Standards.",
    shortAnswer: "1. ML-KEM (FIPS 203 / Kyber): Module-LWE Key Encapsulation (Pub: 1,184B, Cipher: 1,088B), primary general-purpose encryption standard. 2. ML-DSA (FIPS 204 / Dilithium): Module-Lattice Digital Signatures (Pub: 1,952B, Sig: 3,293B), primary signature standard. 3. SLH-DSA (FIPS 205 / SPHINCS+): Stateless Hash-Based Signatures (Pub: 32B, Sig: 7,856B), highest mathematical trust backup. 4. FN-DSA (Falcon): NTRU Lattice Signatures (Pub: 897B, Sig: 666B), ultra-compact alternative.",
    explanation: "This portfolio of standards gives organizations tailored post-quantum primitives for web transit, digital signatures, firmware signing, and embedded devices.",
    hint: "FIPS 203 ML-KEM (Kyber for KEM), FIPS 204 ML-DSA (Dilithium for Signatures), FIPS 205 SLH-DSA (SPHINCS+ hash-based), and Falcon (compact).",
    level: "Expert",
    codeExample: `// Complete NIST PQC Portfolio:
// FIPS 203 : ML-KEM (General KEM / TLS Key Exchange)
// FIPS 204 : ML-DSA (General Digital Signatures / X.509 PKI)
// FIPS 205 : SLH-DSA (Conservative Hash-Based Signatures / Firmware)
// Alternate: FN-DSA (Falcon - Bandwidth-Constrained Signatures)`
  }
];

export default questions;
