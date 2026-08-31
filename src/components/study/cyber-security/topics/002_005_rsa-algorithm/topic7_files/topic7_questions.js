const questions = [
  {
    question: "What is the equivalent symmetric security strength of RSA-1024, RSA-2048, RSA-3072, and RSA-4096 according to NIST SP 800-57?",
    shortAnswer: "RSA-1024 provides 80 bits (deprecated); RSA-2048 provides 112 bits; RSA-3072 provides 128 bits (equivalent to AES-128); RSA-4096 provides ~140 bits of equivalent symmetric security.",
    explanation: "Because the General Number Field Sieve (GNFS) factors RSA moduli in sub-exponential time $L_N[1/3, c]$, asymmetric key sizes must be significantly larger than symmetric keys to achieve the same security: RSA-1024 $\\approx$ 80-bit security (deprecated by NIST in 2011); RSA-2048 $\\approx$ 112-bit security (universal baseline through 2030); RSA-3072 $\\approx$ 128-bit security (equivalent to AES-128); RSA-4096 $\\approx$ 140-bit security (military/Root CA level); RSA-15360 is required to match AES-256 (256-bit security).",
    hint: "Recall how sub-exponential factoring requires a 2048-bit RSA key to match just 112 bits of symmetric AES security.",
    level: "basic",
    codeExample: `// NIST SP 800-57 Security Equivalence Table:
Symmetric (AES) | RSA Modulus Size | ECC (ECDSA/Ed25519) | Status
80 bits (AES-80) | RSA-1024 (128 B) | ECC-160             | DEPRECATED (Insecure)
112 bits        | RSA-2048 (256 B) | ECC-224             | Standard (Through 2030)
128 bits (AES128)| RSA-3072 (384 B) | ECC-256             | High-Security Long-Term
140 bits        | RSA-4096 (512 B) | ECC-384             | Root CAs & Military
256 bits (AES256)| RSA-15360 (1920B)| ECC-521             | Ultra-Long-Term Archive`
  },
  {
    question: "Why was RSA-1024 formally deprecated by NIST and the Controller of Certifying Authorities (CCA) India in 2011/2013?",
    shortAnswer: "Factoring RSA-1024 is within reach of nation-state supercomputers and specialized ASIC clusters (costing ~$1M-$5M); its 80-bit security level provides zero resistance against modern cryptanalytic advancements.",
    explanation: "In 2009, researchers factored RSA-768 in ~1,500 CPU years using GNFS. Extrapolating computing power, factoring a 1024-bit modulus is estimated to cost between $1M and $5M on custom FPGA/ASIC hardware. Recognizing that 80-bit security is vulnerable to well-funded adversaries, NIST deprecated RSA-1024 in 2011, and CCA India mandated that all Digital Signature Certificates (DSCs) must use at least RSA-2048 starting in 2013 under Section 35 of the IT Act 2000.",
    hint: "Think of an old lock mechanism that can now be picked by specialized commercial lock-picking machines.",
    level: "basic",
    codeExample: `// Regulatory Deprecation Timeline of RSA-1024:
2009: RSA-768 Factored by Kleinjung et al. via GNFS
2011: NIST SP 800-131A Disallows RSA-1024 for US Federal Government
2013: CCA India strictly mandates RSA-2048 minimum for all Indian Class 3 DSCs
Current: Any system using RSA-1024 is non-compliant and legally liable under IT Act 43A!`
  },
  {
    question: "How does the computational complexity of RSA private key operations (decryption and signing) scale as key length increases from 2048-bit to 4096-bit?",
    shortAnswer: "Private key modular exponentiation scales cubically $O(b^3)$; quadrupling the modulus length increases decryption CPU time by approximately $6\\times$ to $8\\times$.",
    explanation: "Modular exponentiation complexity is proportional to $O(b^3)$ where $b$ is the modulus bit length: Doubling the key length from 2048 bits to 4096 bits doubles the number of bits in exponent $d$ (requiring $2\\times$ more multiplications) and quadruples the cost of each multi-precision 4096-bit multiplication ($O(b^2)$). As a result, signing/decryption throughput drops from ~1,000 ops/sec (RSA-2048) to ~130 ops/sec (RSA-4096) on modern server processors.",
    hint: "Recall that doubling the bit length doubles both the number of steps and quadruples the multiplication complexity.",
    level: "moderate",
    codeExample: `// Complexity Scaling: 2048-bit vs 4096-bit RSA:
Key Length:     RSA-2048 (2048 bits)    ➔    RSA-4096 (4096 bits) [2x Bit Length]
Multiplication: 2048-bit BigNum (1x)    ➔    4096-bit BigNum (4x CPU cost)
Exponent Steps: 2048 bits (1x steps)    ➔    4096 bits (2x steps)
Total Decrypt:  ~1.1 ms per operation   ➔    ~8.5 ms per operation (7.7x SLOWER!)`
  },
  {
    question: "Why is public key verification ($e = 65537$) significantly faster than private key signing across all RSA key lengths?",
    shortAnswer: "Public exponent $e = 65537 = 2^{16} + 1$ requires only 17 modular operations regardless of modulus length, whereas private exponent $d$ has full 2048/4096-bit random entropy requiring thousands of operations.",
    explanation: "Because $e = 65537 = 10000000000000001_2$ has only two set bits, Square-and-Multiply computes $M^e \\bmod N$ in exactly 16 squarings and 1 multiplication (17 operations total) across RSA-1024, RSA-2048, and RSA-4096. In contrast, private exponent $d$ contains ~1024 set bits for RSA-2048 (requiring 2047 squarings and ~1024 multiplications) and ~2048 set bits for RSA-4096. Consequently, public verification runs in under 0.05 ms, while signing takes ~1.1 to 8.5 ms.",
    hint: "Compare the tiny fixed 17-bit length of $e=65537$ with the massive 2048-bit length of secret $d$.",
    level: "moderate",
    codeExample: `// Public Verification vs Private Signing Operations:
Public Exp e=65537:  16 Squarings + 1 Multiplication  = 17 Operations  (0.05 ms)
Private Key d_2048:  2047 Squarings + ~1024 Multiplies = ~3071 Operations (1.10 ms)
Ratio: Public verification is ~22x faster than private signing!`
  },
  {
    question: "What is the network transmission overhead of RSA-4096 in TLS 1.3 handshakes compared to Elliptic Curve Cryptography (ECDSA P-256 or Ed25519)?",
    shortAnswer: "An RSA-4096 public key and certificate chain consumes >3,500 bytes, exceeding the TCP Maximum Segment Size (MSS 1460 bytes) and causing multi-packet fragmentation; Ed25519 public keys require only 32 bytes and fit in a single packet.",
    explanation: "Standard TCP Maximum Segment Size (MSS) over Ethernet is 1460 bytes. A TLS certificate chain containing RSA-4096 public keys (512 bytes each) and signatures exceeds 3.5 KB, forcing the TCP stack to split the handshake into multiple IP fragments. In high-latency or packet-loss environments, this introduces round-trip delays (RTT). In contrast, Ed25519 uses 32-byte public keys and 64-byte signatures, completing TLS handshakes in a single sub-millisecond IP packet.",
    hint: "Think of trying to mail a thick 500-page book in a standard letter envelope versus mailing a postcard.",
    level: "moderate",
    codeExample: `// Network Packet Size Comparison:
Protocol / Cipher | Public Key Size | Signature Size | TLS Certificate Chain | TCP IP Packets
RSA-2048          | 256 bytes       | 256 bytes      | ~1.8 KB               | 2 IP Packets
RSA-4096          | 512 bytes       | 512 bytes      | ~3.6 KB               | 3 IP Packets (High RTT)
Ed25519 (ECC)     | 32 bytes        | 64 bytes       | ~0.6 KB               | 1 IP Packet (Zero Frag!)`
  },
  {
    question: "Under what specific enterprise architectural conditions is RSA-4096 mandatory instead of RSA-2048?",
    shortAnswer: "RSA-4096 is mandatory for Root Certificate Authorities (Root CAs), offline intermediate CAs with 20-30 year lifespans, and government defense systems requiring high cryptographic margins beyond 2035.",
    explanation: "Because Root CAs issue long-lived certificates that remain valid for 20 to 30 years and sign intermediate certificates relatively infrequently (e.g. once per month), the higher CPU signing cost of RSA-4096 (8.5 ms) is completely negligible. RSA-4096 provides a massive safety buffer against unforeseen algebraic factorization breakthroughs in the General Number Field Sieve, ensuring that Root CAs remain secure through the mid-21st century.",
    hint: "Think of master vault keys that are rarely turned versus daily cash register keys.",
    level: "expert",
    codeExample: `// Enterprise Key Allocation Architecture:
Root CA (30-Year Validity):         RSA-4096 / RSA-8192 (Offline HSM Vault, Rare Signing)
Intermediate CA (10-Year Validity): RSA-4096 (High Security, Weekly Signing)
End-Entity TLS Server (1-Year):     RSA-2048 or ECDSA P-256 (High Throughput, >5,000 req/sec)`
  },
  {
    question: "Why is RSA-8192 generally considered impractical for high-traffic real-time web servers?",
    shortAnswer: "RSA-8192 key generation takes >30 seconds, signing takes ~65 milliseconds (>100x slower than RSA-2048), and certificate handshakes cause massive TLS connection bottlenecks while providing zero additional security against quantum Shor attacks.",
    explanation: "Evaluating $O(b^3)$ for an 8192-bit modulus requires computing modular arithmetic on 1024-byte BigNumbers. A web server handling 5,000 TLS connections per second would require hundreds of dedicated CPU cores just to handle handshakes. Furthermore, against quantum computers running Shor's algorithm, RSA-8192 falls in polynomial time just like RSA-2048. Therefore, transitioning to Post-Quantum Cryptography (ML-KEM/Kyber) is vastly superior to scaling RSA to 8192 bits.",
    hint: "Think of building a 100-ton vault door that takes 5 minutes to open for every customer entering a convenience store.",
    level: "expert",
    codeExample: `// RSA-8192 Performance Degradation Benchmark:
Keygen Time:   ~32.5 seconds per key pair
Signing Time:  ~65.4 ms per signature (Only ~15 signatures/sec per CPU core!)
Quantum Risk:  Broken by Shor's Algorithm just like RSA-2048!
Conclusion:    Vastly inferior to Post-Quantum Lattice Cryptography (FIPS 203 ML-KEM)!`
  },
  {
    question: "Under the Controller of Certifying Authorities (CCA) Guidelines in India, what are the minimum RSA key length requirements for Class 3 Digital Signature Certificates (DSCs)?",
    shortAnswer: "CCA India mandates a strict minimum of RSA-2048 with SHA-256; generating or using RSA-1024 keys for legal DSCs in India is strictly prohibited under Section 35 of the IT Act 2000.",
    explanation: "Under the powers conferred by Section 35 and Section 89 of the Information Technology Act 2000, the Controller of Certifying Authorities (CCA) issued guidelines enforcing RSA-2048 as the absolute minimum key size for all Class 3 DSCs used in Indian e-tendering, MCA21 company filings, income tax returns, and digital land registries. Any DSC issued with RSA-1024 is legally void and inadmissible under Section 65B of the Indian Evidence Act.",
    hint: "Remember the mandatory 2048-bit key length requirement for all Indian legal digital signatures.",
    level: "basic",
    codeExample: `// Indian CCA DSC Regulatory Compliance Rules:
Class 3 DSC Key Length: Minimum RSA 2048-bit (or ECC P-256)
Hash Algorithm:         SHA-256 or SHA-384
Hardware Token:         FIPS 140-2 Level 2 / Crypto Token (ePass2003 / mToken)
Status of RSA-1024:     REJECTED by CCA Portal (Invalid under Section 35 IT Act)`
  },
  {
    question: "How does the 'General Number Field Sieve' (GNFS) complexity formula $L_N[1/3, c] = \\exp\\left( c \\cdot (\\ln N)^{1/3} (\\ln \\ln N)^{2/3} \\right)$ explain why RSA key sizes grow exponentially faster than ECC keys?",
    shortAnswer: "GNFS is sub-exponential ($L_N[1/3]$), meaning factoring difficulty grows slower than modulus size; Elliptic Curve attacks (Pollard's Rho) are fully exponential ($O(\\sqrt{p})$), allowing ECC keys to remain tiny (256 bits vs 3072 bits).",
    explanation: "In RSA, the best factoring algorithm (GNFS) has sub-exponential complexity $O(e^{(64/9 \\cdot b)^{1/3} (\\log b)^{2/3}})$. Because factoring becomes relatively easier as numbers get larger, an engineer must triple the RSA key size (from 1024 to 3072 bits) just to increase security from 80 to 128 bits. In Elliptic Curve Cryptography, no sub-exponential attack exists; the best attack is Pollard's Rho with fully exponential complexity $O(2^{k/2})$. Thus, a 256-bit ECC key matches a massive 3072-bit RSA key with $10\\times$ lower memory and power consumption.",
    hint: "Contrast sub-exponential GNFS factorization with fully exponential Elliptic Curve discrete log attacks.",
    level: "expert",
    codeExample: `// Growth Curves: RSA (Sub-exponential) vs ECC (Exponential):
Security Level | RSA Key Size (GNFS L[1/3]) | ECC Key Size (Pollard Rho O(sqrt(N)))
80-bit         | 1024 bits                  | 160 bits
112-bit        | 2048 bits (2x growth)      | 224 bits (1.4x growth)
128-bit        | 3072 bits (3x growth)      | 256 bits (1.6x growth)
256-bit        | 15360 bits (15x growth!)   | 512 bits (3.2x growth!)`
  },
  {
    question: "What is the energy consumption and battery impact of using RSA-4096 versus ECDSA P-256 on resource-constrained Internet of Things (IoT) edge microcontrollers?",
    shortAnswer: "RSA-4096 consumes approximately $20\\times$ to $30\\times$ more millijoules of battery energy per signature than ECDSA P-256, rapidly depleting remote solar and battery-powered IoT sensor nodes.",
    explanation: "Resource-constrained microcontrollers (like ARM Cortex-M4 or ESP32 running at 80 MHz) lack dedicated BigNumber hardware multipliers. Computing a 4096-bit modular exponentiation requires millions of 32-bit ALU cycles, taking ~1.2 seconds and drawing ~150 mJ of energy per handshake. In contrast, ECDSA P-256 finishes in ~45 ms, consuming under 5 mJ. For remote IoT devices deployed in smart meters or agricultural sensors, using RSA-4096 degrades battery longevity from 5 years to under 6 months.",
    hint: "Think of battery-powered sensors in rural fields that must run for years on a single battery.",
    level: "moderate",
    codeExample: `// IoT Energy Consumption Benchmark (ARM Cortex-M4 @ 80 MHz):
Algorithm   | CPU Execution Time | Energy Consumed | Battery Lifespan (100 tx/day)
RSA-2048    | 320 ms             | ~42 mJ          | 2.8 Years
RSA-4096    | 1,250 ms           | ~165 mJ         | 0.6 Years (RAPID DRAIN!)
ECDSA P-256 | 45 ms              | ~4.8 mJ         | >8.5 Years (OPTIMAL!)`
  },
  {
    question: "How do modern Linux and cloud systems benchmark OpenSSL RSA operations using the `openssl speed` CLI tool?",
    shortAnswer: "By executing `openssl speed rsa1024 rsa2048 rsa4096`, which runs timed loops to measure signatures/second and verifications/second across different modulus lengths.",
    explanation: "The standard OpenSSL benchmarking command `openssl speed rsa` tests RSA algorithms across multiple key lengths. It reports raw sign and verify operations per second, allowing systems architects to determine the exact TLS handshake capacity of their CPU hardware before provisioning cloud server instances.",
    hint: "Remember the classic OpenSSL speed benchmarking command.",
    level: "basic",
    codeExample: `// OpenSSL RSA Speed Benchmarking Command:
$ openssl speed rsa2048 rsa4096

// Sample Terminal Output (AMD EPYC 7763 64-Core Server):
                  sign    verify    sign/s verify/s
rsa 2048 bits 0.000720s 0.000035s   1388.9  28571.4
rsa 4096 bits 0.005520s 0.000140s    181.2   7142.9`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is maintaining an active key-length lifecycle policy legally required for Data Fiduciaries?",
    shortAnswer: "Section 33 requires Data Fiduciaries to maintain appropriate technical safeguards; failing to decommission deprecated key lengths (like RSA-1024) leaves data exposed and triggers statutory penalties up to ₹250 Crores.",
    explanation: "Under the DPDP Act 2023, Data Fiduciaries are legally obligated to protect personal data with robust technical measures. If an enterprise continues using obsolete RSA-1024 or weak key lengths resulting in encrypted customer data being factored by threat actors, the Data Protection Board of India (DPBI) will treat this as a failure of reasonable security safeguards under Section 33, imposing fines up to ₹250 Crores.",
    hint: "Remember the ₹250 Crores maximum statutory fine under the DPDP Act for failing to maintain technical security safeguards.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Key Lifecycle Policy:
Standard: Regular Cryptographic Inventory & Key Deprecation
Action:   Audit all TLS endpoints, VPN gateways, and database encryption keys.
Policy:   Strictly decommission RSA-1024; enforce RSA-2048 minimum, RSA-3072 for >10-year data.
Penalty for Non-Compliance: Up to ₹250 Crores per data breach incident!`
  },
  {
    question: "What is the recommended cryptographic key transition path for enterprise infrastructure moving from RSA to Post-Quantum Cryptography?",
    shortAnswer: "1. Decommission RSA-1024 immediately; 2. Maintain RSA-2048/3072 for classical baseline compatibility; 3. Deploy Hybrid TLS (RSA/ECDSA + FIPS 203 ML-KEM) for quantum resistance.",
    explanation: "Enterprises should not attempt to achieve post-quantum security by inflating RSA key sizes to 8192 or 16384 bits, as Shor's algorithm cracks all classical RSA in polynomial time regardless of size. The official NIST and NCIIPC transition roadmap specifies: 1. Maintain RSA-2048 or RSA-3072 for classical compliance; 2. Deploy Hybrid Key Encapsulation (combining X25519 with ML-KEM-768 / Kyber) in TLS 1.3 to protect against Harvest Now, Decrypt Later threats.",
    hint: "Remember that post-quantum security is achieved through lattice cryptography (ML-KEM), not massive RSA keys.",
    level: "expert",
    codeExample: `// Enterprise Post-Quantum Transition Roadmap:
Stage 1 (Immediate): Decommission all RSA-1024 → Enforce RSA-2048 / RSA-3072 baseline.
Stage 2 (Hybrid):    Deploy X25519 + ML-KEM-768 (Kyber) Hybrid TLS 1.3 Handshakes.
Stage 3 (Full PQC):  Migrate Root PKI to FIPS 204 ML-DSA (Dilithium) & FIPS 205 SLH-DSA (SPHINCS+).`
  },
  {
    question: "Synthesizing RSA Key Lengths: what is the master executive matrix for selecting RSA key lengths across modern software and network architectures?",
    shortAnswer: "RSA-1024: DEPRECATED/ILLEGAL; RSA-2048: Standard TLS/Web (Through 2030); RSA-3072: High-Security / Banking (>2030); RSA-4096: Root CAs & Long-term Vaults; RSA-8192+: IMPRACTICAL (Use PQC instead).",
    explanation: "This complete architectural matrix dictates key selection across enterprise systems: 1. RSA-1024 is deprecated and legally non-compliant; 2. RSA-2048 (112-bit security) is the universal high-speed standard for web APIs, TLS servers, and mobile apps; 3. RSA-3072 (128-bit security) matches AES-128 for high-value banking records; 4. RSA-4096 (140-bit security) is reserved for offline Root CAs and government archives; 5. For post-2035 security, migrate to NIST Post-Quantum standards (FIPS 203 ML-KEM).",
    hint: "Conclude by reviewing the complete 5-tier key length allocation matrix.",
    level: "expert",
    codeExample: `// Master Key Length Selection Matrix:
Key Length | Bits Equivalence | Ideal Architectural Use Case        | Status
RSA-1024   | 80 bits          | DO NOT USE                          | DEPRECATED (Illegal)
RSA-2048   | 112 bits         | Web Servers, TLS 1.3, Mobile Apps   | PRODUCTION STANDARD
RSA-3072   | 128 bits         | Core Banking, Government DSCs       | HIGH-SECURITY STANDARD
RSA-4096   | 140 bits         | Offline Root CAs, 30-Year Archives  | VAULT / ROOT CA ONLY
RSA-8192+  | ~160 bits        | High Latency Overhead / Inefficient | MIGRATE TO PQC (ML-KEM)`
  }
];

export default questions;
