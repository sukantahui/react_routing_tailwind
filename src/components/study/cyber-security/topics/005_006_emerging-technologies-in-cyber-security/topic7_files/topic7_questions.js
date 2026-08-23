const questions = [
  {
    id: 1,
    question: "What is Shor's Algorithm and which foundational mathematical problems used in modern asymmetric cryptography does it solve in polynomial time?",
    shortAnswer: "Shor's Algorithm (1994) is a quantum algorithm that solves the Hidden Subgroup Problem in polynomial time $O((\\log N)^3)$. It efficiently solves: 1. Integer Prime Factorization (breaking RSA); 2. Finite Field Discrete Logarithms (breaking Diffie-Hellman and DSA); 3. Elliptic Curve Discrete Logarithms (breaking ECDH, ECDSA, and Ed25519).",
    explanation: "Shor's algorithm breaks all widely used public-key encryption and digital signature algorithms currently deployed on the internet.",
    hint: "Quantum algorithm that solves Prime Factorization (RSA) and Discrete Logarithms (ECC/Diffie-Hellman) in polynomial time.",
    level: "Basic",
    codeExample: `// Shor's Algorithm Impact:
// RSA-2048   : Broken in ~8.4 hours on a 4,100 Logical Qubit CRQC 🚨
// ECC-256    : Broken in ~1.5 hours on a 2,330 Logical Qubit CRQC 🚨`
  },
  {
    id: 2,
    question: "What is Grover's Algorithm and what is its quantitative impact on symmetric encryption (AES) and cryptographic hash functions (SHA)?",
    shortAnswer: "Grover's Algorithm (1996) provides a quadratic speedup ($O(\\sqrt{N})$) for searching unstructured spaces. It halves the effective bit security of symmetric ciphers: AES-128 is reduced to 64-bit security (Vulnerable to brute force), while AES-256 is reduced to 128-bit security (Still Quantum Safe). For hash functions, finding collisions via the BHT algorithm reduces SHA-256 security to $2^{85}$.",
    explanation: "Symmetric ciphers survive quantum computing simply by doubling key lengths (migrating from AES-128 to AES-256).",
    hint: "Provides quadratic speedup; halves symmetric key security (AES-128 becomes 64-bit, AES-256 becomes 128-bit).",
    level: "Basic",
    codeExample: `// Grover's Key Halving:
// AES-128 ➔ 64-bit Quantum Security (UNSAFE 🚨)
// AES-256 ➔ 128-bit Quantum Security (SAFE ✔ - Meets NIST 128-bit floor)`
  },
  {
    id: 3,
    question: "What is the 'Harvest Now, Decrypt Later' (HNDL) or 'Store Now, Decrypt Later' (SNDL) attack strategy?",
    shortAnswer: "Adversaries and nation-state intelligence agencies are currently intercepting and archiving petabytes of encrypted internet traffic (TLS sessions, VPN tunnels, confidential military/financial records) today. Even though they cannot decrypt it now, they will decrypt the archived ciphertexts retroactively once a Cryptanalytically Relevant Quantum Computer (CRQC) becomes operational.",
    explanation: "HNDL means long-term secrets are already compromised today if they remain protected only by classical RSA/ECC.",
    hint: "Intercepting and storing encrypted data today to decrypt it years later using a future quantum computer.",
    level: "Basic",
    codeExample: `// HNDL Timeline:
// 2026: Adversary captures RSA-2048 encrypted treasury wire packets ➔ Stores on tape
// 2033: CRQC online ➔ Factorizes RSA keys ➔ Decrypts entire historical communication history!`
  },
  {
    id: 4,
    question: "What is Mosca's Theorem (Theorem of Quantum Risk) and what does the inequality $X + Y > Z$ signify?",
    shortAnswer: "Formulated by Dr. Michele Mosca: Let $X$ = Data Shelf-Life (years data must remain secret); $Y$ = Migration Time (years required to transition enterprise infrastructure to Post-Quantum Cryptography); $Z$ = Collapse Time (years until a CRQC is built). If $X + Y > Z$, the organization is ALREADY in a state of critical cryptographic failure.",
    explanation: "Mosca's theorem proves why quantum migration must begin years before the physical CRQC is built.",
    hint: "If (Data Shelf-Life X + Migration Time Y) > Quantum Arrival Z, data is already exposed to HNDL attacks.",
    level: "Moderate",
    codeExample: `// Mosca's Formula Check:
// X (Shelf-Life) = 15 Years (Medical/Defense secrets)
// Y (Migration)  = 3 Years
// Z (Quantum)    = 7 Years
// X + Y = 18 > 7 ➔ IMMEDIATE SYSTEM EXPOSURE 🚨`
  },
  {
    id: 5,
    question: "What is the difference between a Physical Qubit and a Logical Qubit in Quantum Error Correction (Surface Codes)?",
    shortAnswer: "Physical Qubits are noisy, prone to decoherence and thermal jitter ($10^{-3}$ error rate). A Logical Qubit is a fault-tolerant, error-corrected qubit synthesized from an array of hundreds or thousands of physical qubits using quantum error correction codes (e.g., Surface Code). Current estimates require roughly 1,000 to 2,000 physical qubits to produce 1 reliable logical qubit.",
    explanation: "Breaking RSA-2048 requires ~4,100 Logical Qubits, which corresponds to roughly 4 to 8 million Physical Qubits.",
    hint: "Physical qubits are noisy hardware qubits; logical qubits are fault-tolerant qubits built from ~1000 physical qubits.",
    level: "Expert",
    codeExample: `// Qubit Requirement:
// RSA-2048 Factorization: ~4,099 Logical Qubits
// Physical-to-Logical Ratio: 1,000 : 1 ➔ Requires ~4.1 Million Physical Qubits with Surface Code`
  },
  {
    id: 6,
    question: "How does the Quantum Fourier Transform (QFT) enable Period Finding in Shor's Algorithm?",
    shortAnswer: "Shor reduces factoring $N$ to finding the period $r$ of the modular exponential function $f(x) = a^x \\pmod N$. A quantum circuit evaluates $f(x)$ on a superposition of all states simultaneously and applies the Quantum Fourier Transform (QFT). Quantum interference causes constructive interference at states corresponding to multiples of $1/r$, allowing measurement of the period $r$ in $O((\\log N)^2)$ steps.",
    explanation: "Once period $r$ is known, $p$ and $q$ are computed classically in milliseconds via $\\gcd(a^{r/2} \\pm 1, N)$.",
    hint: "Uses quantum superposition and QFT interference to measure the period r of modular exponentiation in polynomial time.",
    level: "Expert",
    codeExample: `// Shor's Quantum Period Pipeline:
// Superposition |x> -> Modular Exponentiation |a^x mod N> -> QFT -> Measure Peak -> Period r -> GCD -> (p, q) found!`
  },
  {
    id: 7,
    question: "Why are Elliptic Curve Cryptosystems (ECC-256) actually MORE vulnerable and faster to break on a quantum computer than RSA-2048?",
    shortAnswer: "Because ECC uses much smaller key sizes (256-bit ECC provides 128-bit classical security vs 2048-bit for RSA). Shor's algorithm for ECC requires only $2n + 9\\log_2(n) \\approx 2,330$ logical qubits, whereas RSA-2048 requires $\\sim 4,099$ logical qubits. Therefore, ECC will collapse on smaller, earlier quantum computers before RSA!",
    explanation: "The smaller group size of elliptic curves makes them easier targets for quantum period finding.",
    hint: "ECC-256 uses smaller key sizes and requires only ~2,330 logical qubits compared to ~4,100 for RSA-2048.",
    level: "Expert",
    codeExample: `// Qubit Comparison:
// ECC-256   : ~2,330 Logical Qubits (Breaks FIRST 🚨)
// RSA-2048  : ~4,099 Logical Qubits (Breaks second)
// RSA-4096  : ~8,195 Logical Qubits`
  },
  {
    id: 8,
    question: "What is a Cryptanalytically Relevant Quantum Computer (CRQC)?",
    shortAnswer: "A fault-tolerant quantum computer with sufficient logical qubit capacity, low gate error rates, and coherence times capable of running Shor's Algorithm to break standard public-key cryptography (e.g., factorizing RSA-2048 or breaking ECC-256) in hours or days.",
    explanation: "CRQC is the standardized term used by NIST and NSA to define the threshold of quantum cryptographic threat.",
    hint: "A quantum computer powerful enough with fault-tolerant qubits to break real-world RSA and ECC keys.",
    level: "Basic",
    codeExample: `// CRQC Threshold:
// NISQ (Current) : 1,000 Noisy Physical Qubits (Cannot run Shor's on RSA-2048)
// CRQC (Future)  : 4,000+ Fault-Tolerant Logical Qubits (Breaks global RSA/ECC infrastructure)`
  },
  {
    id: 9,
    question: "How does Quantum Superposition allow quantum computers to process $2^n$ states simultaneously?",
    shortAnswer: "While $n$ classical bits can represent only 1 of $2^n$ states at any instant, $n$ entangled qubits in superposition exist in a linear combination of all $2^n$ computational basis states simultaneously: $|\\psi\\rangle = \\sum_{i=0}^{2^n-1} c_i |i\\rangle$. Applying a quantum gate transforms all $2^n$ amplitudes in a single physical operation.",
    explanation: "This exponential state capacity enables massive quantum parallelism in specialized algorithms like Shor's and Grover's.",
    hint: "n qubits exist in a linear combination of all 2^n states simultaneously, transforming all states in one operation.",
    level: "Basic",
    codeExample: `// Superposition State:
// 3 Qubits = c0|000> + c1|001> + c2|010> + c3|011> + c4|100> + c5|101> + c6|110> + c7|111> (All 8 states at once!)`
  },
  {
    id: 10,
    question: "What is the No-Cloning Theorem in quantum mechanics and why is it fundamental to quantum security?",
    shortAnswer: "The No-Cloning Theorem mathematically proves that it is impossible to create an identical copy of an arbitrary unknown quantum state $|\\psi\\rangle$ without destroying the original state ($U(|\\psi\\rangle|0\\rangle) \\neq |\\psi\\rangle|\\psi\\rangle$). This prevents eavesdroppers from copying quantum keys unnoticed.",
    explanation: "The No-Cloning Theorem is the physical foundation of Quantum Key Distribution (QKD) security.",
    hint: "Fundamental law stating that an unknown quantum state cannot be cloned or copied without altering it.",
    level: "Moderate",
    codeExample: `// No-Cloning Proof:
// Linearity of unitary operators prevents U(|a> + |b>) from producing (|a> + |b>)(|a> + |b>).`
  },
  {
    id: 11,
    question: "What is Quantum Decoherence and why is it the primary engineering bottleneck in building large-scale quantum computers?",
    shortAnswer: "Decoherence is the loss of quantum superposition and entanglement caused by unwanted interactions with the external environment (thermal vibrations, electromagnetic radiation, cosmic rays). It collapses fragile qubit states into classical binary states, introducing computational errors before algorithms complete.",
    explanation: "Mitigated by dilution refrigerators cooling qubits to near absolute zero (15 millikelvin) and surface code error correction.",
    hint: "Environmental noise causing qubits to lose their fragile superposition states and collapse into classical bits.",
    level: "Moderate",
    codeExample: `// Decoherence Times:
// T1 (Energy Relaxation) : ~100 microseconds
// T2 (Phase Dephasing)    : ~50 microseconds (Algorithm must finish within T2 or lose computation!)`
  },
  {
    id: 12,
    question: "What is the impact of Shor's Algorithm on Bitcoin and Cryptocurrency blockchain networks?",
    shortAnswer: "Bitcoin uses ECDSA (Secp256k1) for digital signatures. Shor's algorithm can derive the private key from a public key in under an hour. While Bitcoin addresses that have never spent funds hide their public key behind a SHA-256/RIPEMD-160 hash (quantum-safe until first spend), any address that has made a transaction exposes its public key, leaving all unspent funds vulnerable to immediate quantum theft.",
    explanation: "Blockchains must hard-fork to post-quantum signatures (like Dilithium/Falcon) before CRQC arrival.",
    hint: "ECDSA private keys can be derived from exposed public keys; addresses that have spent funds once are vulnerable.",
    level: "Expert",
    codeExample: `// Bitcoin Quantum Exposure:
// Address A (Never spent): Public key hashed (Safe behind SHA-256) ✔
// Address B (Spent once) : Public key visible in mempool -> CRQC derives private key -> Steals funds! 🚨`
  },
  {
    id: 13,
    question: "What is Hybrid Classical-Post-Quantum Cryptography (Hybrid Key Exchange) in TLS 1.3 (e.g., X25519Kyber768)?",
    shortAnswer: "A transition mechanism combining a classical key exchange (e.g., X25519) and a post-quantum key encapsulation mechanism (e.g., ML-KEM / CRYSTALS-Kyber) in a single TLS handshake. The final symmetric session key is derived by hashing both shared secrets: $K = \\text{HKDF}(K_{\\text{classical}} || K_{\\text{PQC}})$.",
    explanation: "Security is guaranteed as long as EITHER the classical OR the post-quantum algorithm remains unbroken.",
    hint: "Combines classical X25519 and PQC Kyber shared secrets together into a single hybrid session key.",
    level: "Moderate",
    codeExample: `// Hybrid Key Derivation:
// K_session = HKDF-Extract(X25519_Secret || Kyber768_Secret) (Immune to classical AND quantum attacks ✔)`
  },
  {
    id: 14,
    question: "How does Shor's Algorithm break Diffie-Hellman (DH) and Elliptic Curve Diffie-Hellman (ECDH) Key Exchange?",
    shortAnswer: "Diffie-Hellman security relies on the hardness of computing $x$ given $g^x \\pmod p$ (Discrete Logarithm). Shor's algorithm constructs a 2D Quantum Fourier Transform over the group $\\mathbb{Z}_{p-1} \\times \\mathbb{Z}_{p-1}$ to find the hidden period $(x_1, x_2)$ satisfying $g^{x_1} h^{x_2} = 1$, finding the private key $x$ in $O((\\log p)^3)$ steps.",
    explanation: "This allows an adversary who recorded a Diffie-Hellman TLS exchange to compute the shared session key in seconds.",
    hint: "Constructs a 2D QFT to solve the discrete logarithm problem g^x mod p in polynomial time.",
    level: "Expert",
    codeExample: `// Quantum DH Attack:
// Public: g, g^a, g^b -> CRQC runs Shor's Discrete Log -> Extracts private key 'a' in minutes -> Decrypts TLS session!`
  },
  {
    id: 15,
    question: "What is Brassard-Høyer-Tapp (BHT) Algorithm and what is its impact on hash function collision resistance?",
    shortAnswer: "BHT is a quantum algorithm that combines Grover's search with classical sorting to find collisions in an $n$-bit cryptographic hash function in $O(2^{n/3})$ quantum steps, improving upon the classical Birthday Paradox attack bound of $O(2^{n/2})$.",
    explanation: "Under BHT, finding collisions in SHA-256 requires only $2^{85}$ quantum operations, requiring migration to SHA-384 or SHA-512.",
    hint: "Quantum collision-finding algorithm reducing hash collision search from 2^(n/2) to 2^(n/3).",
    level: "Expert",
    codeExample: `// BHT Collision Complexity:
// Classical Birthday Bound : 2^(256 / 2) = 2^128 operations
// Quantum BHT Bound        : 2^(256 / 3) = 2^85.3 operations (Migrate to SHA-384!)`
  },
  {
    id: 16,
    question: "What is NIST's Post-Quantum Cryptography (PQC) Standardization Project?",
    shortAnswer: "An international competition launched in 2016 by the US National Institute of Standards and Technology (NIST) to evaluate, select, and standardize quantum-resistant public-key algorithms based on mathematical lattices, hashes, error-correcting codes, and multivariate equations.",
    explanation: "NIST finalized the primary PQC standards (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA) in August 2024.",
    hint: "Global NIST standardization effort selecting lattice and hash-based replacements for RSA and ECC.",
    level: "Basic",
    codeExample: `// Finalized NIST PQC Standards (2024):
// FIPS 203: ML-KEM (CRYSTALS-Kyber) - Encryption / KEM
// FIPS 204: ML-DSA (CRYSTALS-Dilithium) - Digital Signatures
// FIPS 205: SLH-DSA (SPHINCS+) - Stateless Hash-based Signatures`
  },
  {
    id: 17,
    question: "Why does AES-256 remain secure against Grover's Algorithm while AES-128 does not?",
    shortAnswer: "Grover's algorithm reduces $n$-bit brute force to $2^{n/2}$. For AES-128, $2^{128/2} = 2^{64}$ operations (which is computationally feasible for nation-state supercomputers). For AES-256, $2^{256/2} = 2^{128}$ operations, which requires $3.4 \\times 10^{38}$ quantum operations—far beyond the thermodynamic physical limits of the universe.",
    explanation: "A security level of 128 bits is universally recognized as unbreakable under the laws of physics.",
    hint: "2^128 operations requires more energy than exists in the universe, making AES-256 permanently quantum-safe.",
    level: "Moderate",
    codeExample: `// Thermodynamic Security:
// 2^64 operations  : ~18 quintillion ops (Feasible for a CRQC) ❌
// 2^128 operations : ~3.4 * 10^38 ops (Physically impossible to compute ✔)`
  },
  {
    id: 18,
    question: "What is Crypto-Agility and why is it mandatory for enterprise infrastructure preparing for PQC migration?",
    shortAnswer: "Crypto-Agility is the architectural capability of software systems (TLS stacks, VPNs, databases, PKI) to rapidly switch cryptographic algorithms, key lengths, and certificate formats via configuration changes without requiring code rewrites or system downtime.",
    explanation: "Agility allows organizations to hot-swap post-quantum algorithms if a newly standardized PQC cipher is later broken.",
    hint: "Designing software so cryptographic algorithms can be swapped via configuration without code changes.",
    level: "Moderate",
    codeExample: `// Crypto-Agile Config:
// cipher_suite: "TLS_AES_256_GCM_SHA384" -> Can be swapped to "TLS_ML_KEM_768_AES_256" via JSON config update.`
  },
  {
    id: 19,
    question: "What are the Five Mathematical Families of Post-Quantum Cryptography?",
    shortAnswer: "1. Lattice-based Cryptography (Learning With Errors - LWE); 2. Hash-based Signatures (Merkle Trees, XMSS, SPHINCS+); 3. Code-based Cryptography (McEliece cryptosystem); 4. Multivariate Quadratic Equation Cryptography; 5. Isogeny-based Cryptography (Supersingular Isogenies - largely broken in 2022).",
    explanation: "Lattice and Hash-based systems dominate modern NIST standards due to performance and compact key sizes.",
    hint: "Lattice-based, Hash-based, Code-based, Multivariate, and Isogeny-based cryptography.",
    level: "Expert",
    codeExample: `// PQC Families:
// Lattice-based : Kyber, Dilithium, Falcon (Primary NIST standards)
// Hash-based    : SPHINCS+, XMSS (High security, zero unproven math)`
  },
  {
    id: 20,
    question: "What is the impact of Quantum Computing on SSH, IPsec VPNs, and HTTPS TLS Handshakes?",
    shortAnswer: "All current TLS 1.2/1.3, SSH, and IPsec VPN connections rely on RSA or ECDHE key exchanges during the handshake. While the symmetric traffic encryption (AES-GCM) is safe under AES-256, Shor's algorithm allows an adversary to break the handshake, extract the pre-master secret, and decrypt all session traffic retroactively.",
    explanation: "Securing network transit requires upgrading the key exchange phase to PQC (ML-KEM).",
    hint: "Shor breaks the asymmetric handshake (ECDHE/RSA), allowing attackers to extract symmetric AES session keys.",
    level: "Basic",
    codeExample: `// TLS Handshake Vulnerability:
// Handshake (ECDHE - Broken by Shor 🚨) ➔ Generates AES Key ➔ Attacker extracts AES key and decrypts stream!`
  },
  {
    id: 21,
    question: "What is Quantum Annealing (e.g., D-Wave) and can it run Shor's Algorithm?",
    shortAnswer: "NO. Quantum Annealers are specialized, non-universal quantum systems designed exclusively for solving combinatorial optimization and energy-minimization problems (Ising spin glasses). They CANNOT execute universal gate-based quantum circuits and CANNOT run Shor's or Grover's algorithms.",
    explanation: "Breaking modern cryptography requires universal gate-model quantum computers (like those being built by IBM, Google, Quantinuum).",
    hint: "Quantum annealers only solve optimization problems; they cannot run universal quantum gates or Shor's algorithm.",
    level: "Moderate",
    codeExample: `// Quantum Machine Types:
// D-Wave (Annealer)      : Optimization only (Cannot break RSA ❌)
// IBM / Google (Universal Gate) : Universal quantum circuits (Runs Shor's algorithm ✔)`
  },
  {
    id: 22,
    question: "What is the NISQ Era (Noisy Intermediate-Scale Quantum) and what are its limitations?",
    shortAnswer: "The current era of quantum computing characterized by processors with 50 to 1,000 physical qubits that lack error correction. Qubits suffer from noise, crosstalk, and short decoherence times ($< 100\\mu\\text{s}$), making them capable of running only shallow quantum circuits and incapable of factorizing large RSA keys.",
    explanation: "Transitioning from NISQ to fault-tolerant quantum computing requires implementing surface codes.",
    hint: "Current noisy quantum processors (50-1000 qubits) lacking error correction, incapable of breaking RSA.",
    level: "Basic",
    codeExample: `// NISQ Limitations:
// Circuit Depth Limit: ~50 gate layers before decoherence destroys quantum state.`
  },
  {
    id: 23,
    question: "What is Surface Code Quantum Error Correction?",
    shortAnswer: "A 2D spatial arrangement of physical qubits on a chip where 'data qubits' (which hold quantum information) are interleaved with 'syndrome/ancilla qubits' (which continuously measure parity errors without destroying superposition). It has a high error threshold (~1%), making it the leading architecture for fault tolerance.",
    explanation: "Surface codes allow physical error rates of 0.1% to be suppressed exponentially into arbitrary logical fidelity.",
    hint: "2D grid of data and ancilla qubits that detects and corrects bit-flip and phase-flip errors continuously.",
    level: "Expert",
    codeExample: `// Surface Code Grid:
// [Data Qubit] --- [Ancilla X-Check] --- [Data Qubit]
//       |                   |                   |
// [Ancilla Z-Check] --- [Data Qubit] --- [Ancilla Z-Check]`
  },
  {
    id: 24,
    question: "What is the National Security Memorandum 10 (NSM-10) and Commercial National Security Algorithm (CNSA 2.0) timeline?",
    shortAnswer: "NSM-10 is a US Presidential directive mandating that all federal agencies and defense contractors transition to Post-Quantum Cryptography. NSA's CNSA 2.0 specifies mandatory timelines: Software/firmware signing must support PQC by 2025, cloud/networks by 2026, and full legacy RSA/ECC deprecation by 2033.",
    explanation: "CNSA 2.0 sets the global benchmark timeline for enterprise post-quantum compliance.",
    hint: "Mandates complete enterprise transition to NIST post-quantum algorithms by 2030-2033.",
    level: "Moderate",
    codeExample: `// CNSA 2.0 Deadlines:
// 2025: Software & Firmware Signing (ML-DSA / SPHINCS+)
// 2026: Web Browsers & TLS 1.3 (ML-KEM)
// 2033: Complete prohibition of classical RSA/ECC`
  },
  {
    id: 25,
    question: "What is the Quantum Phase Estimation (QPE) subroutine in Shor's Algorithm?",
    shortAnswer: "QPE is a fundamental quantum subroutine that estimates the eigenvalue phase $\\theta$ of a unitary operator $U$ (where $U|u\\rangle = e^{2\\pi i \\theta}|u\\rangle$). In Shor's algorithm, QPE applied to the modular multiplication operator extracts the rational phase $\\theta = s/r$, directly revealing the period $r$.",
    explanation: "QPE is the mathematical engine behind quantum exponential speedups in period finding.",
    hint: "Subroutine estimating the eigenvalue phase of a unitary operator to extract period r.",
    level: "Expert",
    codeExample: `// QPE Circuit:
// |0>---[H]---[•]---[QFT†]---[Measure: Phase θ]`
  },
  {
    id: 26,
    question: "How does Post-Quantum Cryptographic Migration impact hardware token resource constraints (Smart Cards, HSMs, IoT)?",
    shortAnswer: "PQC algorithms have significantly larger public keys and signatures (e.g., Dilithium-3 signatures are 3,293 bytes vs 64 bytes for Ed25519; Kyber-768 public keys are 1,184 bytes vs 32 bytes for X25519). Smart cards and low-power IoT microcontrollers require hardware upgrades with larger RAM buffers to process PQC frames.",
    explanation: "Managing larger key sizes and network packet fragmentation is the major engineering challenge of PQC adoption.",
    hint: "PQC keys and signatures are 10x to 50x larger, requiring expanded RAM and hardware upgrades in microcontrollers.",
    level: "Moderate",
    codeExample: `// Key Size Comparison:
// RSA-2048 Public Key : 256 Bytes | Signature: 256 Bytes
// ML-KEM-768 Public Key: 1,184 Bytes | ML-DSA-3 Signature: 3,293 Bytes (~13x Larger!)`
  },
  {
    id: 27,
    question: "What is the Quantum Supremacy / Quantum Advantage milestone achieved by Google and IBM?",
    shortAnswer: "The demonstration that a programmable quantum computer can execute a specific computational task (e.g., Random Circuit Sampling) faster than the world's most powerful classical supercomputer. Google's Sycamore processor (53 qubits) completed a calculation in 200 seconds that would take classical supercomputers thousands of years.",
    explanation: "While Random Circuit Sampling has no direct commercial use, it proved the physical reality of exponential quantum speedup.",
    hint: "Demonstrating that a quantum computer can solve a specific task faster than the most powerful classical supercomputer.",
    level: "Basic",
    codeExample: `// Quantum Advantage:
// Google Sycamore: 200 seconds vs Summit Supercomputer: 10,000 years (Proven 2019)`
  },
  {
    id: 28,
    question: "What is Co-Design in Post-Quantum Hardware Acceleration?",
    shortAnswer: "Designing specialized silicon ASICs and FPGA coprocessors specifically optimized for polynomial arithmetic, Number Theoretic Transforms (NTT), and Keccak hashing required by lattice-based PQC algorithms (CRYSTALS-Kyber/Dilithium) to execute handshakes in microseconds on low-power chips.",
    explanation: "Hardware accelerators ensure PQC algorithms do not degrade line-rate throughput in 100Gbps firewalls.",
    hint: "Designing dedicated silicon chips optimized for polynomial math (NTT) to accelerate PQC operations.",
    level: "Expert",
    codeExample: `// NTT Hardware Accelerator:
// Executes 256-point polynomial multiplication in 32 clock cycles (100x faster than general-purpose CPU).`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Treasury case study, engineers conducted a cryptographic asset audit and discovered that 10-year municipal land deeds and pension records were encrypted under RSA-2048. Applying Mosca's Theorem ($X=10, Y=2, Z=7$), what immediate action plan was mandated?",
    shortAnswer: "Since $X + Y = 12 > 7$ (Critical HNDL exposure), the engineers immediately: 1. Implemented Hybrid PQC TLS (X25519 + ML-KEM-768) on all network tunnels to neutralize ongoing traffic harvesting; 2. Re-encrypted all long-term database storage keys using AES-256 (providing a permanent 128-bit quantum security floor); 3. Initiated a 2-year firmware rollout to upgrade municipal verification PKI to ML-DSA signatures.",
    explanation: "Executing hybrid key encapsulation immediately stops adversaries from intercepting data for future quantum decryption.",
    hint: "Applied hybrid PQC TLS (X25519 + Kyber), re-encrypted databases with AES-256, and scheduled ML-DSA rollout.",
    level: "Expert",
    codeExample: `// Remediation Protocol:
// 1. Network Transit : Deploy X25519Kyber768 Hybrid TLS 1.3 (Stops HNDL harvesting today ✔)
// 2. Data-at-Rest    : Upgrade DB Encryption to AES-256 (Grover-safe ✔)
// 3. Digital Identity: Migrate PKI to NIST FIPS 204 (ML-DSA) by 2027 ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical blueprint for an Enterprise Quantum-Readiness and Post-Quantum Cryptographic Migration Architecture.",
    shortAnswer: "1. Cryptographic Discovery & Inventory: Automated scanning of source code, TLS endpoints, and data-at-rest to identify all RSA/ECC assets. 2. Risk Prioritization via Mosca's Theorem: Triage assets with shelf-life $X > 5$ years. 3. Symmetric Hardening: Upgrade all symmetric ciphers to AES-256 and hashes to SHA-384/512 (neutralizing Grover's Algorithm). 4. Transit Hybridization: Deploy Hybrid TLS 1.3 (X25519 + ML-KEM-768) on all internet and VPN gateways. 5. PKI Migration: Transition Root/Intermediate CAs to NIST FIPS 204 (ML-DSA) and FIPS 205 (SLH-DSA) with strict crypto-agility.",
    explanation: "This complete blueprint guarantees end-to-end immunity against Shor's algorithm, Grover's algorithm, and HNDL attacks.",
    hint: "Crypto-discovery, Mosca risk scoring, AES-256 upgrade, Hybrid PQC TLS 1.3, and FIPS 204/205 PKI migration.",
    level: "Expert",
    codeExample: `// Enterprise Quantum-Resilience Blueprint:
// [Crypto-Asset Discovery] ➔ [Mosca Scoring: X+Y>Z] ➔ [Upgrade to AES-256] ➔ [Hybrid X25519Kyber768 TLS 1.3] ➔ [NIST FIPS 204 ML-DSA PKI]`
  }
];

export default questions;
