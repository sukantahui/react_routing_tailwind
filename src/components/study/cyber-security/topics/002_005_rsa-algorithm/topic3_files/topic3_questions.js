const questions = [
  {
    question: "What are the 5 sequential mathematical steps in standard RSA Key Generation?",
    shortAnswer: "1. Generate primes $p, q$; 2. Compute modulus $N = p \\cdot q$; 3. Compute totient $\\phi(N) = (p-1)(q-1)$; 4. Select coprime public exponent $e$ (typically 65537); 5. Compute private exponent $d = e^{-1} \\bmod \\phi(N)$ via Extended Euclidean Algorithm.",
    explanation: "Standard RSA key generation proceeds through 5 strict steps: 1. Generate two large, distinct primes $p$ and $q$ using a CSPRNG and 64-round Miller-Rabin test; 2. Compute the public modulus $N = p \\cdot q$; 3. Compute Euler's Totient $\\phi(N) = (p-1)(q-1)$ or Carmichael's $\\lambda(N) = \\text{lcm}(p-1, q-1)$; 4. Select public exponent $e$ such that $1 < e < \\phi(N)$ and $\\gcd(e, \\phi(N)) = 1$ (standard: $e=65537$); 5. Calculate private exponent $d$ using the Extended Euclidean Algorithm ($e \\cdot d \\equiv 1 \\pmod{\\phi(N)}$).",
    hint: "Think through the chronological lifecycle: Primes -> Modulus -> Totient -> Public Exponent -> Private Inversion.",
    level: "basic",
    codeExample: `// 5-Step RSA Key Generation Flow:
Step 1: p = CSPRNG_Prime(1024), q = CSPRNG_Prime(1024)
Step 2: N = p * q (2048 bits)
Step 3: phi(N) = (p - 1) * (q - 1)
Step 4: e = 65537 (Verify: gcd(e, phi(N)) == 1)
Step 5: d = Extended_Euclidean_Inverse( e, phi(N) )`
  },
  {
    question: "What is the difference between 'PKCS#1' and 'PKCS#8' key encoding formats for RSA private keys?",
    shortAnswer: "PKCS#1 (`BEGIN RSA PRIVATE KEY`) is specific to RSA and encodes raw RSA components ($N, e, d, p, q, d_p, d_q, q_{inv}$); PKCS#8 (`BEGIN PRIVATE KEY` or `BEGIN ENCRYPTED PRIVATE KEY`) is algorithm-agnostic and supports password-based PBKDF2/AES encryption.",
    explanation: "In Public Key Cryptography Standards: 1. PKCS#1 (RFC 8017): Designed exclusively for RSA. The header is `-----BEGIN RSA PRIVATE KEY-----` and defines the ASN.1 sequence containing modulus $N$, public exponent $e$, private exponent $d$, and CRT components; 2. PKCS#8 (RFC 5208): Modern universal format for ANY private key (RSA, ECC, Ed25519). The header is `-----BEGIN PRIVATE KEY-----` (unencrypted) or `-----BEGIN ENCRYPTED PRIVATE KEY-----` (wrapped with password-derived AES-256 encryption via PBKDF2).",
    hint: "Think of an RSA-specific cardboard box (PKCS#1) versus a universal armored shipping crate with a combination lock (PKCS#8).",
    level: "moderate",
    codeExample: `// PKCS#1 vs PKCS#8 PEM Headers:
PKCS#1 (RSA-Specific):
  -----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEA0r... (Raw RSA ASN.1 Struct)
  -----END RSA PRIVATE KEY-----

PKCS#8 (Universal Password-Encrypted):
  -----BEGIN ENCRYPTED PRIVATE KEY-----
  MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQI... (AES-256-CBC Wrapped)
  -----END ENCRYPTED PRIVATE KEY-----`
  },
  {
    question: "What specific mathematical fields are stored inside an RSA Private Key structure to enable Chinese Remainder Theorem (RSA-CRT) acceleration?",
    shortAnswer: "Eight ASN.1 fields: Version, Modulus $N$, Public Exponent $e$, Private Exponent $d$, Prime1 $p$, Prime2 $q$, Exponent1 $d_p = d \\bmod (p-1)$, Exponent2 $d_q = d \\bmod (q-1)$, and Coefficient $q_{inv} = q^{-1} \\bmod p$.",
    explanation: "Under PKCS#1 v2.2 (RFC 8017), an `RSAPrivateKey` ASN.1 structure does not merely store $(d, N)$. It stores eight parameters: $N, e, d, p, q, d_p, d_q, q_{inv}$. The pre-computed values $d_p = d \\bmod (p-1)$, $d_q = d \\bmod (q-1)$, and $q_{inv} = q^{-1} \\bmod p$ allow decrypters and signers to compute RSA-CRT directly without repeatedly recalculating modular inverses, achieving an immediate $4\\times$ speedup.",
    hint: "Recall the 8 ASN.1 integers in standard OpenSSL RSA private key dumps.",
    level: "expert",
    codeExample: `// RSAPrivateKey ASN.1 Structure (RFC 8017):
RSAPrivateKey ::= SEQUENCE {
    version           INTEGER,  -- 0
    modulus           INTEGER,  -- N = p * q
    publicExponent    INTEGER,  -- e (65537)
    privateExponent   INTEGER,  -- d
    prime1            INTEGER,  -- p
    prime2            INTEGER,  -- q
    exponent1         INTEGER,  -- d_p = d mod (p-1)
    exponent2         INTEGER,  -- d_q = d mod (q-1)
    coefficient       INTEGER   -- q_inv = q^(-1) mod p
}`
  },
  {
    question: "Why is 'Ephemeral Memory Zeroization' (Secure Key Shredding in RAM) strictly mandated immediately after RSA key generation?",
    shortAnswer: "To prevent memory scrapers, core dumps, and Cold Boot Attacks from extracting primes $p$ and $q$ or totient $\phi(N)$ from lingering server RAM.",
    explanation: "Once RSA key generation completes and the public key $(e, N)$ and encrypted private key are saved to disk or hardware token, the plaintext primes $p$ and $q$, totient $\phi(N)$, and raw exponent $d$ must be wiped using `memset_s()` or `OPENSSL_cleanse()`. If a server crashes and generates a core dump or an attacker performs a memory dump, uncleared RAM leaves the secret prime factors $p$ and $q$ exposed in plain text, completely compromising the private key.",
    hint: "Think of burning the blueprint sketches immediately after the bank vault is built so nobody can find them in the trash.",
    level: "moderate",
    codeExample: `// Secure Memory Zeroization in OpenSSL:
BIGNUM *p = generate_prime();
BIGNUM *q = generate_prime();
// ... Compute N, e, d, CRT parameters ...
OPENSSL_cleanse( p->d, p->dmax * sizeof(BN_ULONG) ); // Secure Overwrite!
OPENSSL_cleanse( q->d, q->dmax * sizeof(BN_ULONG) );
BN_free( p ); BN_free( q ); // RAM PURGED COMPLETELY!`
  },
  {
    question: "What OpenSSL CLI command generates a 2048-bit RSA private key in modern PKCS#8 format protected by AES-256 encryption?",
    shortAnswer: "`openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -aes-256-cbc -out private_key.pem`",
    explanation: "Modern cryptographic best practices deprecate legacy `openssl genrsa`. The standard OpenSSL 3.0+ command `openssl genpkey` generates a cryptographically sound key: `-algorithm RSA` selects the cryptosystem; `-pkeyopt rsa_keygen_bits:2048` sets modulus length to 2048 bits with public exponent 65537; `-aes-256-cbc` prompts for a passphrase and encrypts the key using PKCS#8 with PBKDF2 key derivation.",
    hint: "Recall the modern OpenSSL 3.0 `genpkey` syntax with the AES encryption flag.",
    level: "moderate",
    codeExample: `// Modern OpenSSL Key Generation Commands:
# 1. Generate PKCS#8 Encrypted RSA-2048 Key:
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -aes-256-cbc -out rsa_priv.pem

# 2. Extract Public Key (SubjectPublicKeyInfo):
openssl pkey -in rsa_priv.pem -pubout -out rsa_pub.pem`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 35, what is a 'Key Generation Ceremony' for licensed Certifying Authorities (CAs)?",
    shortAnswer: "A strictly audited, multi-person operational ceremony where Root CA RSA-4096 keys are generated inside offline FIPS 140-2 Level 3/4 HSMs under video surveillance and witnessed by independent auditors.",
    explanation: "Under the CCA India regulatory framework, licensed CAs (e.g. eMudhra, (n)Code, IDRBT) cannot generate Root and Intermediate signing keys on ordinary computers. They must conduct a formal Key Generation Ceremony: 1. Conducted in a Faraday-shielded, air-gapped cleanroom; 2. Keys generated directly inside a FIPS 140-2 Level 3/4 HSM; 3. Private key split into $M$-of-$N$ Shamir secret shares across multiple physical smart cards held by separate security officers; 4. Entire ceremony recorded and signed by certified chartered auditors.",
    hint: "Remember the formal, multi-custodian audited event required to create trust anchor root keys in India.",
    level: "basic",
    codeExample: `// CA Root Keygen Ceremony Checklist (CCA India):
1. Hardware: Offline FIPS 140-3 Level 4 HSM
2. Modulus:  4096-bit RSA (e = 65537)
3. Custody:  3-of-5 Shamir Secret Sharing (M-of-N Smart Cards)
4. Audit:    Physical video recording + Section 65B certified audit log`
  },
  {
    question: "What is the 'ROCA Vulnerability' (CVE-2017-15361 / Return of Coppersmith's Attack), and what catastrophic flaw in smart card RSA key generation did it expose?",
    shortAnswer: "Infineon cryptographic chips used a flawed prime generation algorithm ($p = k \\cdot M + (65537^a \\bmod M)$) to speed up keygen; the resulting structure allowed attackers to factor 2048-bit RSA keys in 17 days on AWS.",
    explanation: "In 2017, security researchers discovered that Infineon crypto chips generated primes with a specific algebraic structure to avoid slow trial divisions on low-power chips. Because primes had this fixed form, the public modulus $N$ inherited a recognizable mathematical fingerprint. An attacker using Coppersmith's algorithm could factor a 2048-bit public key for ~$76 on cloud instances, forging digital signatures on national ID cards and software firmware worldwide.",
    hint: "Think of an automaker cutting corners on metal bolts to save time, causing millions of cars to fail safety inspections.",
    level: "expert",
    codeExample: `// ROCA Flawed Prime Structure (CVE-2017-15361):
Flawed Form: p = k * M + (65537^a mod M) where M = 2 * 3 * 5 * ... * 709
Vulnerability: Attacker knows N mod M has tiny set of possible discrete values!
Factoring Time: 1024-bit RSA factored in 45 minutes; 2048-bit factored in 17 days!
Lesson: NEVER use proprietary 'fast prime' shortcuts; enforce standard Miller-Rabin!`
  },
  {
    question: "What is 'Debian OpenSSL Predictable PRNG Bug' (CVE-2008-0166), and why did removing two lines of code make every generated RSA key worldwide trivially predictable?",
    shortAnswer: "A maintainer removed uninitialized memory entropy from OpenSSL to silence Valgrind warnings; this reduced the PRNG seed space to only 32,767 possible Process IDs, making all generated RSA keys pre-calculable in seconds.",
    explanation: "In 2006, a Debian maintainer removed two lines of code in OpenSSL's random generator because memory analyzers flagged reading uninitialized bytes. This disastrously left the Process ID (PID $\\le 32,767$) as the ONLY entropy source. As a result, only 32,768 possible RSA keys could ever be generated for any key length. Attackers pre-computed dictionaries of all 32,768 public/private key pairs, compromising millions of SSH and SSL servers worldwide.",
    hint: "Think of a lottery machine that only knows 32,000 combinations, allowing a gambler to buy every ticket.",
    level: "expert",
    codeExample: `// Debian OpenSSL Bug (CVE-2008-0166):
Flawed Code: Entropy pool seeded ONLY by getpid() (Values 1 .. 32767)
Attacker Tool: Pre-computed rainbow table of all 32,767 RSA-2048 keys:
  Dictionary = { Hash(Public_Key_i): Private_Key_i for i in range(1, 32768) }
Outcome: SSH root login on any Debian server achieved in 0.01 seconds!`
  },
  {
    question: "Why must $p$ and $q$ be generated using a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) rather than `Math.random()` or `rand()`?",
    shortAnswer: "`Math.random()` and `rand()` use linear congruential generators (LCG) whose internal states are easily predictable from previous outputs, allowing attackers to calculate future primes and factor $N$ instantly.",
    explanation: "Standard pseudo-random generators (`rand()`, `Math.random()`) are designed for statistical simulations, not cryptography. Their state transitions ($X_{n+1} = (a X_n + c) \\bmod m$) are completely deterministic and can be reconstructed from a few output samples. A CSPRNG (such as `/dev/urandom`, `CryptGenRandom`, or hardware TRNGs based on thermal jitter) provides forward and backward secrecy, ensuring that even if an attacker observes 1,000 past keys, predicting future prime seeds is computationally impossible.",
    hint: "Think of a predictable clock pendulum versus random atmospheric radio static.",
    level: "basic",
    codeExample: `// CSPRNG vs Predictable PRNG:
Insecure:  p = LCG_Random()       -> Attacker predicts seed -> FACTORS KEY IN 0.001 MS!
Secure:    p = Crypto.getRandomValues() -> Hardware Thermal Entropy -> UNBREAKABLE!`
  },
  {
    question: "What is the 'Public Key' file format (SubjectPublicKeyInfo / RFC 5280), and what ASN.1 structure does it define?",
    shortAnswer: "An ASN.1 sequence containing two elements: 1. AlgorithmIdentifier (`rsaEncryption` OID `1.2.840.113549.1.1.1`); 2. BitString containing the DER-encoded `RSAPublicKey` sequence $(N, e)$.",
    explanation: "When an RSA public key is saved (`-----BEGIN PUBLIC KEY-----`), it conforms to the X.509 SubjectPublicKeyInfo standard (RFC 5280). This format explicitly specifies which cryptographic algorithm is used so that receivers (browsers, operating systems) know how to parse the embedded BitString. The BitString itself contains the ASN.1 sequence containing the modulus $N$ and the public exponent $e=65537$.",
    hint: "Recall the standard PEM public key header and its internal algorithm OID header.",
    level: "moderate",
    codeExample: `// SubjectPublicKeyInfo ASN.1 Structure:
SubjectPublicKeyInfo ::= SEQUENCE {
    algorithm         AlgorithmIdentifier { rsaEncryption (1.2.840.113549.1.1.1) },
    subjectPublicKey  BIT STRING {
        RSAPublicKey ::= SEQUENCE {
            modulus         INTEGER,  -- N (2048 bits)
            publicExponent  INTEGER   -- e (65537)
        }
    }
}`
  },
  {
    question: "What is 'Batch GCD' (Heninger et al., 2012), and how did scanning the public IPv4 internet discover tens of thousands of broken RSA keys due to poor embedded device entropy?",
    shortAnswer: "Batch GCD computes pairwise GCDs across millions of public moduli ($N_i, N_j$) simultaneously; if two independent IoT routers shared a single prime factor $p$ during bootup, $\\gcd(N_i, N_j) = p$ factored both keys instantly in sub-quadratic time.",
    explanation: "In 2012, researchers scanned millions of public SSL/TLS and SSH hosts. They discovered that low-power routers and firewalls generated RSA keys immediately after bootup before the Linux kernel gathered sufficient entropy. Consequently, two different routers frequently generated the same prime $p$ with different second primes $q_1, q_2$. By constructing a binary product tree of all moduli and running Batch GCD, the researchers factored 64,000+ commercial RSA keys across the internet in a few hours without brute-force attacks.",
    hint: "Think of finding a single shared key tooth between millions of locks by comparing all key shapes simultaneously.",
    level: "expert",
    codeExample: `// Batch GCD Internet Key Compromise:
Router A (Kolkata): Modulus N1 = p * q1
Router B (Munich):  Modulus N2 = p * q2  (Both used flawed boot entropy!)
Attacker computes:  Common_p = gcd( N1, N2 )
Result: Common_p > 1 -> BOTH PRIVATE KEYS DERIVED IN 0.0001 SECONDS!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is 'Hardware-Secured RSA Key Generation' mandatory for Data Fiduciaries processing sensitive personal data?",
    shortAnswer: "Software-only key generation on general-purpose servers risks RAM leakage and malware interception, violating Section 33 security safeguards and risking up to ₹250 Crores in statutory penalties.",
    explanation: "Under Section 33 of the DPDP Act 2023, Data Fiduciaries must deploy 'reasonable security safeguards' to prevent data breaches. Key generation performed on multi-tenant cloud servers or virtual machines is vulnerable to hypervisor memory inspection, cold-boot attacks, and core dump extraction. Generating master RSA encryption keys inside dedicated Hardware Security Modules (HSMs) ensures that plaintext private keys NEVER enter general server RAM, providing statutory legal compliance.",
    hint: "Remember the maximum ₹250 Crore penalty for negligent cryptographic key management under Indian privacy laws.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Key Generation Mandate:
Software Keygen in Node.js/Python: Lingering RAM primes -> DPDP Compliance Violation!
FIPS 140-3 HSM Keygen Ceremony:    Silicon Isolation -> 100% Statutory Compliance!`
  },
  {
    question: "What is the computational difference in key generation between RSA and Elliptic Curve Cryptography (ECC-256)?",
    shortAnswer: "RSA keygen requires hunting for massive 1024-bit primes via heavy Miller-Rabin tests (~85 ms); ECC keygen simply picks a single random 256-bit scalar integer $k \\in [1, n-1]$ (~0.05 ms, 1700x faster).",
    explanation: "RSA key generation is computationally heavy because it must generate random 1024-bit candidates, filter out small primes, and perform dozens of modular exponentiations during Miller-Rabin testing until two genuine primes $p$ and $q$ are found. In contrast, in Elliptic Curve Cryptography (ECC-256): The private key is simply a random 256-bit integer, and the public key is a single scalar point multiplication $Q = k \\cdot G$. This makes ECC key generation thousands of times faster, ideal for battery-constrained IoT devices.",
    hint: "Contrast searching for two needles in two giant haystacks (RSA) with simply picking a single random number (ECC).",
    level: "moderate",
    codeExample: `// RSA vs ECC Key Generation Comparison:
RSA-2048 Keygen: Find Prime p + Find Prime q + Invert EEA -> ~85.00 ms (Heavy!)
ECC-256 Keygen:  k = CSPRNG(256) -> Public Q = k * G     -> ~0.05 ms (1,700x Faster!)`
  },
  {
    question: "Synthesizing RSA Key Generation: what is the complete architectural checklist for production-grade, legally compliant RSA key generation?",
    shortAnswer: "1. True hardware entropy (CSPRNG); 2. 64-round Miller-Rabin primality test; 3. Large prime separation ($|p-q| > 2^{900}$); 4. Standard $e=65537$; 5. Extended Euclidean Inversion; 6. Pre-computed CRT parameters; 7. Ephemeral RAM zeroization; 8. PKCS#8 AES-256 encryption.",
    explanation: "Engineering a production-grade RSA key pair requires fulfilling every link in the cryptographic chain: 1. Entropy: Hardware TRNG; 2. Primality: 64-round Miller-Rabin ($P < 2^{-128}$); 3. Structure: Strong primes with $|p-q| > 2^{900}$; 4. Exponent: $e=65537$ coprime to $\\phi(N)$; 5. Inversion: Canonical positive $d = e^{-1} \\bmod \\phi(N)$; 6. Optimization: Pre-compute $d_p, d_q, q_{inv}$; 7. Sanitization: `OPENSSL_cleanse()` primes from RAM; 8. Storage: FIPS 140-3 HSM or PKCS#8 AES-256 envelope.",
    hint: "Conclude by reviewing the complete 8-point checklist required for invincible RSA key pairs.",
    level: "expert",
    codeExample: `// Master Production Keygen Recipe:
(TRNG_Entropy + MillerRabin_64 + Prime_Separation + e_65537 + EEA_Inversion + CRT_Params + RAM_Cleanse + PKCS8_Storage) = SECURE_RSA_KEYPAIR;`
  }
];

export default questions;
