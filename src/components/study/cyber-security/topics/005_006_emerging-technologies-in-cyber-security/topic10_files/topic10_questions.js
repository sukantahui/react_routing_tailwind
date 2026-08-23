const questions = [
  {
    id: 1,
    question: "What are the three official FIPS Post-Quantum Cryptography standards released by NIST in August 2024?",
    shortAnswer: "1. FIPS 203: ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism, derived from CRYSTALS-Kyber); 2. FIPS 204: ML-DSA (Module-Lattice-Based Digital Signature Algorithm, derived from CRYSTALS-Dilithium); 3. FIPS 205: SLH-DSA (Stateless Hash-Based Digital Signature Algorithm, derived from SPHINCS+).",
    explanation: "These three documents represent the finalized global cryptographic standards for the post-quantum era.",
    hint: "FIPS 203 (ML-KEM Kyber), FIPS 204 (ML-DSA Dilithium), and FIPS 205 (SLH-DSA SPHINCS+).",
    level: "Basic",
    codeExample: `// NIST Finalized Standards (August 2024):
// FIPS 203 : ML-KEM (Key Encapsulation / TLS 1.3 Key Exchange)
// FIPS 204 : ML-DSA (Digital Signatures / PKI & Identity)
// FIPS 205 : SLH-DSA (Stateless Hash-Based Signatures)`
  },
  {
    id: 2,
    question: "Explain the three parameter sets of ML-KEM (CRYSTALS-Kyber) and their corresponding NIST security levels.",
    shortAnswer: "1. ML-KEM-512 (Matrix rank $k=2$): NIST Security Level 1 (AES-128 equivalent); 2. ML-KEM-768 (Matrix rank $k=3$): NIST Security Level 3 (AES-192 equivalent - Recommended Default Standard); 3. ML-KEM-1024 (Matrix rank $k=4$): NIST Security Level 5 (AES-256 equivalent - Maximum Security).",
    explanation: "ML-KEM-768 provides the optimal balance of quantum security margin and compact network performance.",
    hint: "ML-KEM-512 (Level 1), ML-KEM-768 (Level 3 - Recommended Default), ML-KEM-1024 (Level 5).",
    level: "Basic",
    codeExample: `// ML-KEM Parameter Sets:
// ML-KEM-512  : PubKey = 800 B  | Ciphertext = 768 B   | Level 1
// ML-KEM-768  : PubKey = 1184 B | Ciphertext = 1088 B  | Level 3 (Standard) ✔
// ML-KEM-1024 : PubKey = 1568 B | Ciphertext = 1568 B  | Level 5`
  },
  {
    id: 3,
    question: "What polynomial quotient ring and prime modulus are used in ML-KEM (FIPS 203)?",
    shortAnswer: "ML-KEM operates over the cyclotomic polynomial quotient ring $R_q = \\mathbb{Z}_q[X]/(X^{256} + 1)$ with prime modulus $q = 3329$. Because $q \\equiv 1 \\pmod{2n}$ ($3329 = 13 \\times 256 + 1$), it has primitive 512-th roots of unity, enabling full Number Theoretic Transform (NTT) acceleration.",
    explanation: "The choice of $q=3329$ and $n=256$ is optimized for fast SIMD / AVX2 vector processing.",
    hint: "Polynomial ring Z_q[X]/(X^256 + 1) with prime modulus q = 3329.",
    level: "Expert",
    codeExample: `// Kyber Ring Definition:
// R_q = Z_3329[X] / (X^256 + 1) (Enables 256-point NTT multiplication)`
  },
  {
    id: 4,
    question: "Explain the three parameter sets of ML-DSA (CRYSTALS-Dilithium) and their key and signature sizes.",
    shortAnswer: "1. ML-DSA-44 ($k=4, l=4$): NIST Level 2. PubKey: 1,312 Bytes | Signature: 2,420 Bytes. 2. ML-DSA-65 ($k=6, l=5$): NIST Level 3 (Recommended Default). PubKey: 1,952 Bytes | Signature: 3,293 Bytes. 3. ML-DSA-87 ($k=8, l=7$): NIST Level 5. PubKey: 2,592 Bytes | Signature: 4,595 Bytes.",
    explanation: "ML-DSA-65 is the standard choice for general-purpose X.509 enterprise certificates.",
    hint: "ML-DSA-44 (2.4KB sig), ML-DSA-65 (3.3KB sig - Recommended), ML-DSA-87 (4.6KB sig).",
    level: "Basic",
    codeExample: `// ML-DSA Parameter Sets:
// ML-DSA-44 : PubKey = 1,312 B | Sig = 2,420 B | Level 2
// ML-DSA-65 : PubKey = 1,952 B | Sig = 3,293 B | Level 3 (Standard) ✔
// ML-DSA-87 : PubKey = 2,592 B | Sig = 4,595 B | Level 5`
  },
  {
    id: 5,
    question: "What is the 'Fiat-Shamir with Aborts' technique used in Dilithium (ML-DSA) and why does it reject certain signatures?",
    shortAnswer: "When computing $\\mathbf{z} = \\mathbf{y} + c\\mathbf{s}_1$, if the components of $\\mathbf{z}$ fall too close to the boundary of allowable values ($||\\mathbf{z}||_\\infty \\ge \\gamma_1 - \\beta$), $\\mathbf{z}$ leaks statistical information about the private key $\\mathbf{s}_1$. Rejection sampling aborts and restarts with a fresh $\\mathbf{y}$, guaranteeing that accepted signatures follow a uniform distribution completely independent of the private key.",
    explanation: "Rejection sampling eliminates complex Gaussian sampling trapdoors, simplifying secure implementation.",
    hint: "Aborts signatures where z exceeds norm bounds to prevent statistical leakage of the secret key.",
    level: "Expert",
    codeExample: `// Rejection Sampling Loop:
// while True:
//   y = SampleRandom()
//   z = y + c * s1
//   if max(abs(val) for val in z) < (gamma1 - beta):
//     return z (Signature Accepted! ✔)`
  },
  {
    id: 6,
    question: "How does ML-KEM achieve IND-CCA2 security using the Fujisaki-Okamoto (FO) transform during Decapsulation?",
    shortAnswer: "During `Decaps(c, sk)`: 1. The recipient recovers message $m'$ using secret key $\\mathbf{s}$; 2. The recipient explicitly re-encrypts $m'$ with public key $\\mathbf{A}$ to generate ciphertext $c'$; 3. If $c \\neq c'$, the recipient aborts or returns a pseudo-random value. This prevents adversaries from submitting malformed ciphertexts to probe decryption failure errors.",
    explanation: "Re-encryption verification neutralizes chosen-ciphertext attacks completely.",
    hint: "Re-encrypts the recovered plaintext and verifies that the generated ciphertext exactly matches the received ciphertext.",
    level: "Expert",
    codeExample: `// FO Re-Encryption Check:
// m' = Decrypt(c, sk)
// c' = Encrypt(m', Seed(m'))
// if c != c':
//   return PseudoRandomFailKey(sk.implicit_rejection_value) // Never leak error details!`
  },
  {
    id: 7,
    question: "What is the Number Theoretic Transform (NTT) in ML-KEM and ML-DSA and what is its computational complexity?",
    shortAnswer: "NTT is a discrete Fourier transform over the finite field $\\mathbb{Z}_q$. It transforms polynomial multiplication in the ring $\\mathbb{Z}_q[X]/(X^n + 1)$ into point-wise coordinate multiplication, reducing complexity from $O(n^2)$ schoolbook multiplication to $O(n \\log n)$ quasi-linear time (taking $\\sim 2,048$ operations instead of 65,536 for $n=256$).",
    explanation: "NTT allows post-quantum key exchanges and signature checks to execute in less than 50 microseconds on modern CPUs.",
    hint: "Reduces polynomial multiplication from O(n^2) to O(n log n), accelerating lattice operations by over 30x.",
    level: "Moderate",
    codeExample: `// NTT Multiplication:
// c_poly = invNTT( NTT(a_poly) .* NTT(b_poly) )`
  },
  {
    id: 8,
    question: "What is the Keccak / SHAKE Extendable-Output Function (XOF) and how is it used in Kyber and Dilithium?",
    shortAnswer: "SHAKE-128 and SHAKE-256 (NIST FIPS 202) are sponge functions that produce arbitrary-length pseudo-random byte streams. In Kyber and Dilithium, SHAKE expands compact 32-byte public seeds into full $k \\times k$ polynomial matrices $\\mathbf{A}$ and samples noise vectors deterministically.",
    explanation: "Using SHAKE allows transmitting only a 32-byte seed `rho` instead of a massive matrix $\\mathbf{A}$, saving thousands of bytes of bandwidth.",
    hint: "Sponge function producing arbitrary-length random bytes to expand 32-byte seeds into full polynomial matrices.",
    level: "Moderate",
    codeExample: `// Matrix Expansion:
// Matrix A = SHAKE128(seed_rho, i, j) (Only 32-byte seed transmitted across network!)`
  },
  {
    id: 9,
    question: "What is the difference between Key Encapsulation Mechanism (KEM) and Traditional Asymmetric Encryption (PKE)?",
    shortAnswer: "Traditional PKE (like RSA) encrypts an arbitrary user-supplied plaintext of arbitrary length. A KEM (like ML-KEM) generates a fresh, uniform, random symmetric secret key ($K \\in \\{0,1\\}^{256}$) and outputs both the key $K$ and an encrypted ciphertext $c$ simultaneously, designed specifically for establishing symmetric session keys.",
    explanation: "KEMs eliminate padding oracle vulnerabilities (like PKCS#1 v1.5 Bleichenbacher attacks) by construction.",
    hint: "KEM generates and encrypts a random symmetric key simultaneously; PKE encrypts arbitrary user messages.",
    level: "Basic",
    codeExample: `// KEM Interface:
// (Ciphertext c, SharedSecret K) = Encaps(PublicKey)
// SharedSecret K = Decaps(Ciphertext c, SecretKey)`
  },
  {
    id: 10,
    question: "What is Hint Bit Vector ($h$) in Dilithium (ML-DSA) and how does it shrink signature sizes?",
    shortAnswer: "To verify a signature, the verifier needs the high-order bits of the polynomial vector $\\mathbf{w}_1$. Dilithium computes a compact binary 'hint' vector $\\mathbf{h}$ that tells the verifier whether adding the low-order error terms causes a carry into the high-order bits, allowing the verifier to reconstruct $\\mathbf{w}_1$ without transmitting it.",
    explanation: "Hint bits reduce Dilithium signature size by over 50%.",
    hint: "Binary flags indicating carry bits in high-order polynomial rounding, reducing signature size by 50%.",
    level: "Expert",
    codeExample: `// HighBits Reconstruction:
// w1_reconstructed = UseHint(h, A * z - c * t) (Verified without transmitting raw w1 vector)`
  },
  {
    id: 11,
    question: "What is the NSA Commercial National Security Algorithm (CNSA 2.0) mandate for ML-KEM and ML-DSA?",
    shortAnswer: "NSA CNSA 2.0 mandates the adoption of NIST PQC standards for all US National Security Systems and defense contractors: 1. Software and Firmware signing must support ML-DSA / SLH-DSA by 2025 (mandatory by 2030); 2. Web browsers, TLS 1.3, and cloud services must adopt ML-KEM-1024 by 2026; 3. Complete prohibition of legacy RSA/ECC by 2033.",
    explanation: "CNSA 2.0 selects the Level 5 parameter sets (ML-KEM-1024 and ML-DSA-87) for maximum security.",
    hint: "NSA timeline mandating ML-KEM and ML-DSA adoption by 2026-2030 and banning RSA/ECC by 2033.",
    level: "Basic",
    codeExample: `// CNSA 2.0 Requirements:
// Key Exchange : ML-KEM-1024 (Level 5)
// Digital Sig  : ML-DSA-87 (Level 5) or SLH-DSA-256`
  },
  {
    id: 12,
    question: "Why did NIST standardize SPHINCS+ (SLH-DSA / FIPS 205) alongside Dilithium (ML-DSA)?",
    shortAnswer: "As a 'Hedge' against mathematical cryptanalysis: Dilithium relies on the hardness of Module Lattices. If a future mathematical breakthrough breaks lattice problems, SPHINCS+ (which relies strictly on SHA-256 hashes with zero lattice math) will remain completely unbroken, guaranteeing an emergency fallback signature algorithm.",
    explanation: "Diversity of mathematical foundations is a cornerstone of NIST's post-quantum resilience strategy.",
    hint: "Serves as an emergency backup relying strictly on hash functions in case lattice math is ever broken.",
    level: "Moderate",
    codeExample: `// NIST Redundancy Strategy:
// Primary : ML-DSA (Lattice-based - Fast & Compact)
// Backup  : SLH-DSA (Hash-based - Immune to lattice cryptanalysis)`
  },
  {
    id: 13,
    question: "What is Constant-Time Implementation and why is it mandatory for Kyber and Dilithium code?",
    shortAnswer: "If execution time, CPU branch jumps, or memory cache lookups vary depending on the values of secret polynomials or error coefficients, an attacker measuring microsecond timing variations over the network can reconstruct the private key $\\mathbf{s}$. Constant-time code ensures identical execution cycle counts regardless of secret values.",
    explanation: "Libraries like `liboqs` and reference C implementations are strictly audited for constant-time compliance.",
    hint: "Ensuring execution time is identical regardless of secret key values to prevent timing side-channel attacks.",
    level: "Moderate",
    codeExample: `// Constant-Time Absolute Value:
// int32_t mask = v >> 31;
// int32_t abs_v = (v + mask) ^ mask; (Zero conditional jumps!)`
  },
  {
    id: 14,
    question: "What is Hybrid TLS 1.3 Key Exchange (`X25519Kyber768Draft00`) and how is it deployed in Google Chrome and Cloudflare?",
    shortAnswer: "In TLS 1.3 ClientHello, the client sends both an X25519 public key and an ML-KEM-768 ciphertext in the `key_share` extension. The server processes both and combines the two shared secrets via HKDF: $K = \\text{HKDF-Extract}(K_{\\text{X25519}} || K_{\\text{Kyber768}})$.",
    explanation: "This delivers instant quantum resistance against HNDL traffic harvesting while preserving classical security compliance.",
    hint: "Combines X25519 and ML-KEM-768 in the TLS 1.3 handshake to provide hybrid classical-quantum security.",
    level: "Basic",
    codeExample: `// Hybrid TLS 1.3 Handshake:
// Supported Groups: [x25519_kyber768] (Supported in 100% of modern Chrome and Cloudflare endpoints)`
  },
  {
    id: 15,
    question: "How does Coefficient Compression ($d_u, d_v$) in Kyber shrink ciphertext from 1,800 bytes to 1,088 bytes?",
    shortAnswer: "In ML-KEM-768, polynomial coefficients in $\\mathbf{u}$ are rounded from 12 bits down to $d_u = 10$ bits, and coefficients in $v$ are rounded down to $d_v = 4$ bits: $\\text{Compress}_q(x, d) = \\lfloor (2^d / q) \\cdot x \\rceil \\pmod{2^d}$. This discards unneeded low-order noise bits while preserving sufficient signal for the decapsulation decision threshold.",
    explanation: "Compression optimizes network transmission efficiency across global internet backbones.",
    hint: "Discards low-order noise bits, reducing u coefficients to 10 bits and v coefficients to 4 bits.",
    level: "Expert",
    codeExample: `// Compression Math:
// u_compressed = 3 * 256 * 10 bits = 7,680 bits = 960 Bytes
// v_compressed = 1 * 256 * 4 bits  = 1,024 bits = 128 Bytes
// Total Ciphertext = 960 + 128 = 1,088 Bytes ✔`
  },
  {
    id: 16,
    question: "What is TLS Certificate Compression (RFC 8879) and why is it essential for ML-DSA X.509 certificates?",
    shortAnswer: "ML-DSA-65 certificates are $\\sim 3.5\\text{ KB}$ (over 10x larger than RSA/ECDSA certificates). RFC 8879 allows TLS servers to compress certificates using Zstandard (`zstd`) or Brotli before transmission, reducing certificate payload size by 40–60% and preventing TCP packet fragmentation.",
    explanation: "Certificate compression preserves sub-100ms connection establishment times on mobile cellular networks.",
    hint: "Compresses X.509 certificates using zstd/brotli to prevent TCP packet fragmentation and latency.",
    level: "Moderate",
    codeExample: `// RFC 8879 Compression:
// Raw ML-DSA Certificate Chain: 7.2 KB ➔ Compressed via zstd: 2.9 KB (Fits in initial TCP congestion window ✔)`
  },
  {
    id: 17,
    question: "What is the difference between NIST Security Levels 1, 3, and 5 in post-quantum evaluations?",
    shortAnswer: "NIST Security Levels define quantum hardness relative to symmetric brute force: Level 1: Hardness $\\ge$ AES-128 key search ($2^{143}$ classical / $2^{128}$ quantum gates); Level 3: Hardness $\\ge$ AES-192 key search ($2^{207}$ classical / $2^{192}$ quantum gates); Level 5: Hardness $\\ge$ AES-256 key search ($2^{272}$ classical / $2^{256}$ quantum gates).",
    explanation: "Level 3 is the standard benchmark for commercial enterprises, while Level 5 is mandated for military/classified systems.",
    hint: "Level 1 = AES-128 equivalent, Level 3 = AES-192 equivalent, Level 5 = AES-256 equivalent.",
    level: "Moderate",
    codeExample: `// NIST Hardness Floor:
// ML-KEM-512 / ML-DSA-44  : Level 1 (AES-128)
// ML-KEM-768 / ML-DSA-65  : Level 3 (AES-192) - General Enterprise Standard
// ML-KEM-1024 / ML-DSA-87 : Level 5 (AES-256) - Defense Standard`
  },
  {
    id: 18,
    question: "What is Implicit Rejection in ML-KEM decapsulation?",
    shortAnswer: "If FO transform verification fails (ciphertext $c \\neq c'$), the decapsulation function does NOT return an explicit error code. Instead, it deterministically computes a pseudo-random key derived from a secret value stored in the private key: $K = \\text{SHAKE256}(z || c)$. The attacker cannot distinguish between a successful decapsulation and a failed one from error timing.",
    explanation: "Implicit rejection denies the attacker any timing or error oracle to mount chosen-ciphertext probing attacks.",
    hint: "Returns a pseudo-random key upon failure instead of an error message to prevent side-channel probing.",
    level: "Expert",
    codeExample: `// Implicit Rejection Logic:
// if fail:
//   return SHAKE256(sk.implicit_reject_value || ciphertext)`
  },
  {
    id: 19,
    question: "What is the memory and stack size impact of ML-DSA on low-power IoT microcontrollers (ARM Cortex-M4)?",
    shortAnswer: "Generating an ML-DSA-65 signature requires maintaining polynomial vectors in RAM, consuming 30–50 KB of stack memory (compared to $< 1\\text{ KB}$ for ECDSA). In microcontrollers with only 64 KB total RAM, un-optimized Dilithium can trigger stack overflow crashes unless in-place Streaming NTT polynomial arithmetic is implemented.",
    explanation: "Embedded firmware requires specialized assembly libraries (like pqm4) optimized for low memory footprint.",
    hint: "Consumes 30-50 KB of stack RAM; requires streaming NTT optimizations on low-memory microcontrollers.",
    level: "Moderate",
    codeExample: `// pqm4 Optimization:
// Standard Dilithium Stack : 48 KB RAM
// PQM4 In-Place NTT Stack : 8.2 KB RAM (Runs safely on Cortex-M4 ✔)`
  },
  {
    id: 20,
    question: "What is Dual-Signing in hybrid X.509 Certificate Authorities?",
    shortAnswer: "A CA signs an enterprise certificate with BOTH an established classical private key (RSA-2048 / ECDSA) and a post-quantum private key (ML-DSA-65). Legacy operating systems and browsers verify the classical signature, while quantum-aware systems verify the ML-DSA signature, ensuring zero disruption during migration.",
    explanation: "Dual-signing enables a phased, non-breaking rollout of post-quantum PKI across global corporate fleets.",
    hint: "Signing certificates with both classical and PQC keys so all clients can verify according to their capability.",
    level: "Basic",
    codeExample: `// Dual-Signing Architecture:
// Root CA [RSA-2048 + ML-DSA-65] ➔ Signs Cert ➔ Verified by Legacy Windows 10 AND Quantum-Ready Linux`
  },
  {
    id: 21,
    question: "What is the role of the Centered Binomial Distribution $\\text{CBD}_\\eta$ in Kyber noise generation?",
    shortAnswer: "CBD samples small error polynomials $\\mathbf{e}$ by generating $2\\eta$ uniform random bits and computing $\\sum_{i=0}^{\\eta-1} a_i - \\sum_{i=0}^{\\eta-1} b_i$. This produces a discrete bell-shaped distribution centered at 0 with support $[-\\eta, \\eta]$ (where $\\eta = 2$ in ML-KEM-768), perfectly approximating Gaussian noise in constant time without floating-point math.",
    explanation: "CBD avoids complex floating-point Gaussian sampling while maintaining mathematical LWE security.",
    hint: "Generates discrete bell-shaped noise centered at zero using simple integer bit additions without floating-point math.",
    level: "Expert",
    codeExample: `// Centered Binomial Distribution (eta=2):
// noise_sample = (bit0 + bit1) - (bit2 + bit3) -> Values in {-2, -1, 0, 1, 2}`
  },
  {
    id: 22,
    question: "What is Key Reuse Vulnerability in Ephemeral ML-KEM deployments?",
    shortAnswer: "If a server reuses the same ephemeral private key $\\mathbf{s}$ across thousands of TLS handshakes without applying the Fujisaki-Okamoto transform, an active attacker submitting crafted ciphertexts can observe decryption failure patterns to solve for the secret polynomial coefficients via the Fluhrer / Ding-LWE attack.",
    explanation: "Ephemeral keys must never be reused across connections, or must enforce strict FO decapsulation.",
    hint: "Reusing ephemeral private keys allows attackers to exploit decryption errors to extract the secret key.",
    level: "Expert",
    codeExample: `// Ephemeral Mandate:
// Each TLS 1.3 connection generates a fresh single-use keypair: (pk, sk) = ML_KEM_KeyGen()`
  },
  {
    id: 23,
    question: "What is the difference between SPHINCS+ `simple` and `robust` parameter variants?",
    shortAnswer: "`robust` applies an extra masking step (XORing tree nodes with bitmasks generated from SHAKE) to provide provable security in the standard random oracle model. `simple` omits the bitmasking step to increase signing and verification throughput by 15–20% while relying on the quantum random oracle model (QROM).",
    explanation: "NIST standard FIPS 205 includes both `simple` and `robust` variants for flexibility.",
    hint: "Robust uses bitmasking for maximum security proof; Simple omits masks for 20% faster performance.",
    level: "Moderate",
    codeExample: `// SPHINCS+ Variants:
// SLH-DSA-128s-robust : Maximum mathematical proof assurance
// SLH-DSA-128s-simple : 20% faster signing speed`
  },
  {
    id: 24,
    question: "How do Hardware Security Modules (HSMs) update microcode to support NIST FIPS 203 and 204?",
    shortAnswer: "Modern HSM vendors (Thales Luna, Utimaco, AWS CloudHSM) deploy firmware updates containing accelerated polynomial math coprocessors and constant-time NTT engines, exposing standard PKCS#11 v3.1 APIs (`CKM_ML_KEM_KEY_PAIR_GEN`, `CKM_ML_DSA_SIGN`) to enterprise applications.",
    explanation: "PKCS#11 v3.1 standardization enables seamless enterprise HSM migration to PQC.",
    hint: "Firmware updates adding NTT acceleration and PKCS#11 v3.1 PQC function calls to hardware security modules.",
    level: "Moderate",
    codeExample: `// PKCS#11 v3.1 Call:
// C_GenerateKeyPair(hSession, &mech_ml_dsa_65, pubTemplate, privTemplate, &hPub, &hPriv)`
  },
  {
    id: 25,
    question: "What is the impact of ML-KEM-768 on SSH connection speeds and VPN tunnel establishment?",
    shortAnswer: "Because ML-KEM-768 key exchange executes in under 50 microseconds of CPU time (faster than classical ECDH on modern processors) and public key/ciphertext payloads ($1,184 + 1,088 = 2,272\\text{ bytes}$) transmit in milliseconds, SSH and WireGuard VPN handshake latency increases by less than 2 milliseconds.",
    explanation: "Post-quantum security is achieved with virtually zero human-perceptible performance degradation.",
    hint: "Microsecond CPU execution and 2KB payloads result in less than 2ms added handshake latency.",
    level: "Basic",
    codeExample: `// SSH Handshake Speed:
// Classical Curve25519 : Handshake = 18.2 ms
// Hybrid sntrup761x25519 : Handshake = 19.4 ms (+1.2 ms delta)`
  },
  {
    id: 26,
    question: "What is Falcon (FN-DSA) and in which scenarios is it preferred over Dilithium (ML-DSA)?",
    shortAnswer: "Falcon (NTRU Lattice Signature - NIST FIPS draft) produces signatures that are 5x smaller than Dilithium (666 bytes vs 3,293 bytes). It is preferred in bandwidth-constrained environments (e.g., DNSSEC UDP packets, satellite telemetry, low-bandwidth radio links) where packet fragmentation must be avoided at all costs.",
    explanation: "Falcon's compact size prevents DNS amplification and UDP truncation issues.",
    hint: "Produces 5x smaller signatures (666 bytes); ideal for DNSSEC and low-bandwidth radio links.",
    level: "Moderate",
    codeExample: `// DNSSEC UDP Constraints:
// DNS UDP Packet Limit : 1,232 Bytes
// ML-DSA-65 Signature   : 3,293 Bytes (Cannot fit in single UDP packet! ❌)
// Falcon-512 Signature  : 666 Bytes (Fits easily inside single DNS packet! ✔)`
  },
  {
    id: 27,
    question: "What is the Number of NTT Butterflies in Kyber Polynomial Multiplication?",
    shortAnswer: "A 256-point NTT in Kyber consists of 7 stages of Cooley-Tukey butterfly operations, requiring exactly $128 \\times 7 = 896$ butterfly operations. Each butterfly performs integer modular additions, subtractions, and multiplications with precomputed twiddle factors $\\zeta^k \\pmod{3329}$.",
    explanation: "Butterfly structures map directly to SIMD AVX2 256-bit vector registers, executing in single-digit clock cycles.",
    hint: "Consists of 7 stages of Cooley-Tukey butterflies, requiring 896 butterfly operations for 256 coefficients.",
    level: "Expert",
    codeExample: `// Cooley-Tukey Butterfly:
// t = a[j+len] * zeta (mod q)
// a[j+len] = a[j] - t (mod q)
// a[j] = a[j] + t (mod q)`
  },
  {
    id: 28,
    question: "What is OpenSSL 3.0 `oqsprovider` (Open Quantum Safe)?",
    shortAnswer: "An open-source C plugin for OpenSSL 3.0 developed by the Open Quantum Safe (OQS) project. It integrates liboqs into standard OpenSSL installations, providing drop-in support for NIST FIPS 203/204/205 algorithms across NGINX, Apache, curl, and OpenSSH without modifying server code.",
    explanation: "oqsprovider is the industry-standard software tool for testing and deploying PQC across Linux servers.",
    hint: "OpenSSL 3.0 plugin providing drop-in support for all NIST post-quantum algorithms across web servers.",
    level: "Basic",
    codeExample: `// Loading oqsprovider in OpenSSL:
// $ openssl s_server -cert server.crt -key server.key -groups mlkem768:x25519_kyber768 -www`
  },
  {
    id: 29,
    question: "In the Salt Lake Sector V FinTech case study, an enterprise payment gateway migrated from RSA-2048 to NIST FIPS 203 ML-KEM-768 and FIPS 204 ML-DSA-65. What two network tuning parameters were adjusted to eliminate TCP handshake latency spikes?",
    shortAnswer: "1. TCP Initial Congestion Window (`initcwnd`): Increased from default 10 to 30 packets in the Linux kernel (`ip route change ... initcwnd 30`), allowing the 3.5 KB ML-DSA certificate and 1.1 KB Kyber keys to transmit in a single round-trip burst without packet drops. 2. TLS Certificate Compression (RFC 8879): Enabled `zstd` certificate compression, shrinking the X.509 certificate chain by 55%.",
    explanation: "Kernel congestion window tuning combined with certificate compression eliminated TCP latency spikes completely.",
    hint: "Increased TCP initcwnd to 30 packets and enabled RFC 8879 zstd certificate compression.",
    level: "Expert",
    codeExample: `// Linux Kernel Network Tuning:
// $ sudo ip route change default via 192.168.1.1 dev eth0 initcwnd 30 initrwnd 30
// NGINX Config: ssl_certificate_compression zstd;`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical blueprint for an Enterprise NIST FIPS 203/204 Post-Quantum Migration Architecture.",
    shortAnswer: "1. Key Exchange: Deploy Hybrid TLS 1.3 (`X25519Kyber768`) across all public load balancers and VPNs (FIPS 203 ML-KEM). 2. Digital Identity: Issue Dual-Signed X.509 certificates (RSA-2048 + FIPS 204 ML-DSA-65) for web servers and smart cards. 3. Firmware Signing: Transition build pipelines to Stateless FIPS 205 SLH-DSA-128 (SPHINCS+). 4. Infrastructure Optimization: Increase TCP `initcwnd` to 30, enable RFC 8879 certificate compression, and deploy streaming NTT on smart cards. 5. Crypto-Agility: Enforce OpenSSL 3.0 pluggable providers for instant algorithmic updates.",
    explanation: "This complete blueprint delivers full compliance with NIST FIPS 203/204/205 and NSA CNSA 2.0 mandates while maintaining 100% operational performance.",
    hint: "Hybrid X25519Kyber768 TLS, Dual ML-DSA certificates, Stateless SLH-DSA firmware signing, and TCP initcwnd tuning.",
    level: "Expert",
    codeExample: `// Enterprise NIST PQC Blueprint:
// [Transit: Web/VPN]   ➔ NIST FIPS 203 ML-KEM-768 Hybrid TLS 1.3
// [Identity: PKI/Auth] ➔ NIST FIPS 204 ML-DSA-65 Dual X.509 Certificates
// [Firmware/Cold Trust]➔ NIST FIPS 205 SLH-DSA Stateless Signatures
// [Network Tuning]     ➔ TCP initcwnd 30 + RFC 8879 zstd Compression`
  }
];

export default questions;
