const questions = [
  {
    question: "What is the 'RSA Algorithm', and who were the three MIT researchers who introduced it in 1977?",
    shortAnswer: "The first practical public-key cryptosystem based on the mathematical difficulty of prime factorization; invented by Ron Rivest, Adi Shamir, and Leonard Adleman in 1977.",
    explanation: "Published in 1977 at MIT by Ron Rivest, Adi Shamir, and Leonard Adleman (and independently discovered in 1973 by Clifford Cocks at the British intelligence agency GCHQ), RSA revolutionized cybersecurity. It allows two communicating parties to establish secure communications and exchange encrypted messages over completely insecure channels without sharing any prior secret keys.",
    hint: "Recall the three letters representing the surnames of the famous MIT mathematicians.",
    level: "basic",
    codeExample: `// RSA Inventors & Milestone:
Inventors: Ron Rivest, Adi Shamir, Leonard Adleman (MIT, 1977)
Algorithm: RSA Cryptosystem
Core Hardness: Integer Factorization Problem (N = p * q)`
  },
  {
    question: "What is the fundamental 'One-Way Trapdoor Function' underlying the RSA algorithm?",
    shortAnswer: "Multiplying two large prime numbers $N = p \\times q$ is computationally trivial (forward direction), but factoring composite modulus $N$ back into $p$ and $q$ without the secret trapdoor $d$ is computationally infeasible.",
    explanation: "In RSA: Given two 1024-bit prime numbers $p$ and $q$, computing the 2048-bit modulus $N = p \\cdot q$ takes less than 1 millisecond on any smartphone. However, given only $N$, the fastest classical algorithm (General Number Field Sieve - GNFS) requires billions of CPU years to deduce $p$ and $q$. The secret decryption exponent $d$ is the mathematical 'trapdoor' that allows the legitimate key holder to invert modular powers instantly.",
    hint: "Think of mixing two colors of paint: mixing them is instant, but separating them back into pure colors is nearly impossible without a magic recipe.",
    level: "moderate",
    codeExample: `// One-Way Trapdoor Mathematics:
Forward Direction (Easy): p * q = N (Takes 0.0001 ms)
Adversary Inverse (Hard): Given N -> Find p, q (Takes 10 Billion CPU Years via GNFS!)
Legitimate Inverse (Trapdoor): Compute M = C^d mod N (Takes 2 ms using private key d!)`
  },
  {
    question: "What mathematical components constitute the 'RSA Public Key' vs the 'RSA Private Key'?",
    shortAnswer: "Public Key: $(e, N)$ where $N$ is the modulus and $e$ is the public encryption exponent; Private Key: $(d, N)$ where $d$ is the secret modular multiplicative inverse of $e \\pmod{\\phi(N)}$.",
    explanation: "In RSA: 1. Public Key $(e, N)$: Freely published to the world. $N = p \\cdot q$ is the product of two huge primes, and $e$ is a public exponent coprime to Euler's totient $\\phi(N)$ (typically $e = 65537 = 2^{16}+1$); 2. Private Key $(d, N)$: Kept strictly secret by the owner. The exponent $d$ satisfies the modular congruence $e \\cdot d \\equiv 1 \\pmod{\\phi(N)}$.",
    hint: "Remember the two numbers in the public tuple $(e, N)$ and the secret number in the private tuple $(d, N)$.",
    level: "basic",
    codeExample: `// RSA Key Pair Structure:
Public Key:  ( e, N ) -> Published in X.509 Digital Certificates
Private Key: ( d, N ) -> Stored inside FIPS 140-3 Hardware Crypto USB Tokens
Where: N = p * q  and  e * d ≡ 1 (mod (p-1)(q-1))`
  },
  {
    question: "What are the two core mathematical formulas for RSA Encryption and Decryption?",
    shortAnswer: "Encryption: $C \\equiv M^e \\pmod N$; Decryption: $M \\equiv C^d \\pmod N$ (where $M$ is the plaintext integer $< N$ and $C$ is the ciphertext).",
    explanation: "To encrypt message $M$: The sender computes ciphertext $C = M^e \\bmod N$ using the recipient's public key $(e, N)$. To decrypt ciphertext $C$: The recipient computes plaintext $M = C^d \\bmod N$ using their secret private key $(d, N)$. By Euler's Totient Theorem, $(M^e)^d \\equiv M^{ed} \\equiv M^{1 + k\\phi(N)} \\equiv M \\pmod N$, restoring the exact original plaintext message.",
    hint: "Remember raising to power $e$ for encryption and raising to power $d$ for decryption, always modulo $N$.",
    level: "basic",
    codeExample: `// RSA Mathematical Operations:
Encryption: Ciphertext C = ( Plaintext_M ^ e ) mod N
Decryption: Plaintext M  = ( Ciphertext_C ^ d ) mod N`
  },
  {
    question: "Why is unpadded 'Textbook RSA' vulnerable to Multiplicative Homomorphism and Small Exponent attacks, and why is 'RSA-OAEP' mandatory in modern implementations?",
    shortAnswer: "Textbook RSA ($C = M^e \\bmod N$) allows attackers to multiply ciphertexts ($E(M_1) \\cdot E(M_2) = E(M_1 \\cdot M_2)$); RSA-OAEP adds randomized Feistel padding with cryptographic hashes to achieve IND-CCA2 security.",
    explanation: "Textbook RSA is homomorphic: An attacker intercepting $C = M^e \\bmod N$ can compute $C' = C \\cdot 2^e \\bmod N = (2M)^e \\bmod N$, doubling a payment transaction without knowing private key $d$. Furthermore, if small messages are encrypted with $e=3$ without padding, taking the integer cube root ($M = \\sqrt[3]{C}$) recovers plaintext without factoring $N$. Optimal Asymmetric Encryption Padding (RSA-OAEP / PKCS#1 v2.2) introduces randomized hashing to completely destroy algebraic malleability.",
    hint: "Think of wrapping a sensitive letter in randomized cryptographic bubble wrap before sealing it in a vault.",
    level: "expert",
    codeExample: `// Textbook RSA vs RSA-OAEP:
Textbook RSA Flaw: C1 * C2 mod N = (M1 * M2)^e mod N (Malleable!)
RSA-OAEP Standard: Padded_M = OAEP_Encode( M, SHA256, Random_Seed )
                   C = ( Padded_M ^ e ) mod N (IND-CCA2 Provably Secure!)`
  },
  {
    question: "What is the common choice for the public encryption exponent $e$ in modern RSA implementations, and why is $e = 65537$ universally preferred?",
    shortAnswer: "$e = 65537 = 2^{16} + 1$ (Fermat prime $F_4$); it has only two binary 1s (`10000000000000001`), requiring only 17 modular squarings and 1 modular multiplication during square-and-multiply.",
    explanation: "In modular exponentiation ($C = M^e \\bmod N$), computing the power using the square-and-multiply algorithm takes time proportional to the number of set bits (Hamming weight) in $e$. The fourth Fermat prime $F_4 = 2^{16} + 1 = 65537$ has a binary representation of exactly 17 bits with only two 1s. This makes encryption blazingly fast while being large enough to completely defeat Coppersmith's and Hastad's low-exponent broadcast attacks.",
    hint: "Think of the fourth Fermat prime ($2^{16}+1$) that maximizes speed while eliminating low-exponent algebraic attacks.",
    level: "moderate",
    codeExample: `// Why e = 65537 is Optimal:
Binary of 65537: 0b10000000000000001 (17 bits, Hamming Weight = 2)
Square-and-Multiply Cost: 16 Squarings + 1 Multiplication = 17 Total Operations!`
  },
  {
    question: "How do the computational complexities of RSA Key Generation, Encryption, and Decryption compare on modern hardware?",
    shortAnswer: "Encryption is ultra-fast ($O((\\log N)^2)$ via small $e=65537$); Decryption is slower ($O((\\log N)^3)$ via large 2048-bit $d$); Key Generation is slowest (requires searching for random 1024-bit primes $p, q$).",
    explanation: "In RSA: 1. Encryption: Computing $M^{65537} \\bmod N$ takes only 17 modular multiplications (<0.1 ms); 2. Decryption: Computing $C^d \\bmod N$ where $d$ is a 2048-bit integer takes thousands of modular operations (~2 to 5 ms, optimized using Chinese Remainder Theorem - CRT); 3. Key Generation: Involves generating random 1024-bit integers and running probabilistic Miller-Rabin primality tests until finding genuine primes $p$ and $q$ (~50 to 200 ms).",
    hint: "Contrast dropping a letter into an open mailbox (Encryption: fast) with unlocking a complex multi-tumbler safe (Decryption: slower).",
    level: "moderate",
    codeExample: `// RSA Relative Performance Hierarchy:
Operation        | Key Material Used       | CPU Time (2048-bit)
1. Encryption    | Public Key (e = 65537)   | ~0.08 ms (Ultra-Fast)
2. Decryption    | Private Key (d, with CRT)| ~1.80 ms (~20x slower)
3. Key Gen       | Random Primes (p, q)    | ~85.00 ms (One-time generation)`
  },
  {
    question: "What is the 'Chinese Remainder Theorem' (CRT) optimization in RSA Decryption, and how much computational speedup does RSA-CRT achieve?",
    shortAnswer: "RSA-CRT decomposes 2048-bit modular exponentiation into two smaller 1024-bit exponentiations modulo $p$ and $q$, achieving a $4\\times$ computational speedup.",
    explanation: "Standard decryption computes $M = C^d \\bmod N$ with 2048-bit numbers ($O(N^3)$ complexity). Using the Chinese Remainder Theorem: The private key stores pre-computed values: $d_p = d \\bmod (p-1)$, $d_q = d \\bmod (q-1)$, and $q_{inv} = q^{-1} \\bmod p$. The decrypter computes $m_1 = C^{d_p} \\bmod p$ and $m_2 = C^{d_q} \\bmod q$. Because 1024-bit operations are $8\\times$ faster than 2048-bit operations, combining the two halves yields an overall $\\approx 4\\times$ faster decryption.",
    hint: "Think of dividing a heavy 200-kg cargo load into two 100-kg packages that can be carried in half the time.",
    level: "expert",
    codeExample: `// RSA-CRT Decryption Pipeline:
1. m1 = C^(d_p) mod p   (1024-bit math)
2. m2 = C^(d_q) mod q   (1024-bit math)
3. h  = (q_inv * (m1 - m2)) mod p
4. M  = m2 + h * q      (Exact Plaintext, computed 4x faster than standard C^d mod N!)`
  },
  {
    question: "What is 'Shor's Algorithm' (1994), and why does it represent an existential threat to all classical RSA key lengths (1024-bit, 2048-bit, 4096-bit)?",
    shortAnswer: "Shor's algorithm uses quantum Fourier transform to find the period of modular exponentiation in polynomial time $O((\\log N)^3)$, factoring 2048-bit and 4096-bit RSA moduli in minutes on a fault-tolerant quantum computer.",
    explanation: "Classical computers require billions of years to factor $N = p \\cdot q$ using the General Number Field Sieve (GNFS). Peter Shor demonstrated that a quantum computer with ~4,000 stable logical qubits can evaluate quantum superposition states and solve period finding in polynomial time $O((\\log N)^3)$. Increasing RSA key length from 2048 to 4096 bits only adds seconds to a quantum computer's cracking time, necessitating migration to NIST Post-Quantum standards (FIPS 203 ML-KEM).",
    hint: "Remember the quantum algorithm that transforms exponential factoring difficulty into trivial polynomial time.",
    level: "expert",
    codeExample: `// Classical vs Quantum Factoring Complexity:
Classical (GNFS): O( exp( (64/9 * b)^(1/3) * (log b)^(2/3) ) ) -> Infeasible for 2048-bit N!
Quantum (Shor):   O( b^3 ) [Polynomial Time -> Cracks RSA-2048 & RSA-4096 in Minutes!]`
  },
  {
    question: "Under the Indian Information Technology Act 2000, how does the Controller of Certifying Authorities (CCA) mandate RSA key lengths for Class-3 Digital Signature Certificates (DSC)?",
    shortAnswer: "CCA India mandates a minimum key length of 2048-bit RSA with SHA-256 (stored inside FIPS 140-2 Level 2 cryptographic USB crypto-tokens); 1024-bit RSA is strictly banned.",
    explanation: "Under Section 35 of the Indian IT Act 2000, licensed Certifying Authorities (such as eMudhra, (n)Code, Capricorn) issue Digital Signature Certificates (DSCs). In 2014, CCA India issued regulatory directives permanently deprecating 1024-bit RSA keys due to advances in distributed computing. All Class-3 DSCs issued for e-tendering, income tax filing, and court evidence must use at least 2048-bit RSA keys generated directly inside cryptographic USB tokens.",
    hint: "Remember the minimum bit length required under Indian cyber law for commercial and legal digital signatures.",
    level: "basic",
    codeExample: `// CCA India Statutory Key Requirements:
Minimum RSA Key Size: 2048 bits (4096 bits recommended for Root CAs)
Hashing Algorithm:    SHA-256 / SHA-512 (FIPS 180-4)
Hardware Enclosure:   FIPS 140-2 Level 2 / Common Criteria EAL 4+ USB Token`
  },
  {
    question: "What is 'Wiener's Attack' on RSA, and why is choosing a small private decryption exponent $d$ to speed up decryption fatal to security?",
    shortAnswer: "If private exponent $d < \\frac{1}{3} N^{1/4}$, Continued Fraction expansion of $\\frac{e}{N}$ allows an attacker to compute $d$ in polynomial time, compromising the private key completely.",
    explanation: "Engineers trying to make RSA decryption faster might be tempted to choose a small private exponent $d$. Michael J. Wiener proved in 1990 that if $d < \\frac{1}{3} N^{1/4}$ (e.g. $d < 2^{512}$ for a 2048-bit modulus), the fraction $\\frac{e}{N}$ is an exceptionally close approximation to $\\frac{k}{d}$. Using continued fraction expansions, an attacker calculates all convergents of $\\frac{e}{N}$ in polynomial time $O(\\log N)$, finding the exact private key $d$ in seconds.",
    hint: "Think of trying to make a key lightweight by shaving off its metal teeth until an intruder can pick it with a wire.",
    level: "expert",
    codeExample: `// Wiener's Low Private Exponent Attack Vulnerability:
If d < (1/3) * N^(0.25):
  Attacker computes Continued Fractions of (e / N)
  One of the convergents (k / d) yields the exact Private Key d in seconds!
Rule: ALWAYS generate d with full 2048-bit entropy!`
  },
  {
    question: "What is 'Bleichenbacher's Million Message Attack' (1998) on RSA-PKCS#1 v1.5, and how did padding oracle error responses allow attackers to decrypt ciphertext without knowing the private key?",
    shortAnswer: "An adaptive chosen-ciphertext attack where an attacker submits modified ciphertexts to a server; observing whether the server responds with 'Invalid PKCS#1 Padding' allows the attacker to narrow down and decrypt the plaintext in $\\approx 1$ Million queries.",
    explanation: "Daniel Bleichenbacher discovered that in RSA PKCS#1 v1.5, the decrypted plaintext must begin with the two bytes `0x00 0x02`. An attacker multiplies ciphertext $C$ by $s^e \\bmod N$ and sends it to the server. If the server returns a padding error ('Bad Padding'), the attacker knows the top bits were incorrect. By systematically adjusting $s$ and observing server responses, the attacker halves the interval of possible plaintexts, fully recovering the pre-master secret without knowing private key $d$.",
    hint: "Think of playing a game of '20 Questions' with a server that leaks subtle hints whenever your guess has the right first letter.",
    level: "expert",
    codeExample: `// Bleichenbacher Padding Oracle Flow:
Attacker submits: C' = (C * s^e) mod N
Server response:  "200 OK" (Decrypted bytes start with 0x0002) vs "500 Bad Padding"
Attacker iterates: Narrows interval [2B, 3B-1] -> Plaintext recovered after ~1,000,000 queries!`
  },
  {
    question: "What is a 'Coppersmith Attack' (1996) on RSA, and how does lattice reduction (LLL algorithm) find small roots of polynomials to break flawed RSA implementations?",
    shortAnswer: "Don Coppersmith proved that finding small roots of modular polynomials $f(x) \\equiv 0 \\pmod N$ where $|x| < N^{1/e}$ can be solved in polynomial time using the LLL lattice reduction algorithm.",
    explanation: "If an RSA user encrypts related messages (e.g. $M_1 = M$ and $M_2 = M + \\Delta$) with public exponent $e=3$, formulating the relationship as a polynomial $f(x) = (M + \\Delta)^3 - C_2 \\equiv 0 \\pmod N$ allows an attacker to construct a lattice matrix. Running the Lenstra-Lenstra-Lovász (LLL) lattice reduction algorithm extracts the small integer root in polynomial time, recovering the plaintext $M$ without factoring $N$.",
    hint: "Think of finding a hidden needle in a haystack by transforming the haystack into a simple geometric grid.",
    level: "expert",
    codeExample: `// Coppersmith Lattice Reduction Condition:
Polynomial: f(x) ≡ 0 (mod N) with degree e
Root Bound: |x_0| < N^(1/e)
Action:     Apply LLL Lattice Reduction to polynomial matrix -> Finds root x_0 in polynomial time!`
  },
  {
    question: "Why did the RSA algorithm require a minimum key length migration from 512-bit to 1024-bit, and subsequently from 1024-bit to 2048-bit/4096-bit over the last three decades?",
    shortAnswer: "Exponential increases in computing power, distributed cloud clusters, and mathematical improvements in the General Number Field Sieve (GNFS) made factoring smaller moduli computationally practical.",
    explanation: "The history of RSA key lengths reflects the relentless march of computing: 1. 512-bit RSA: Factored in 1999 (RSA-512) in 6 months using academic clusters; 2. 768-bit RSA: Factored in 2009 (RSA-768); 3. 1024-bit RSA: Broken by nation-state supercomputers and distributed clouds in ~2014, leading NIST and RBI to mandate 2048-bit keys; 4. 2048-bit RSA: Provides 112 bits of symmetric security, secure against classical supercomputers through 2030+; 5. 4096-bit RSA: Recommended for Root CAs.",
    hint: "Remember how Moore's Law and advanced factoring algorithms steadily obsoleted 512-bit and 1024-bit RSA keys.",
    level: "moderate",
    codeExample: `// RSA Key Length Deprecation History:
Year | Key Length | Security Equivalent | Classical Status
1999 | 512 bits   | ~56 bits (DES level) | FACTORED & BROKEN
2009 | 768 bits   | ~68 bits            | FACTORED & BROKEN
2014 | 1024 bits  | 80 bits             | RETIRED & BANNED
2026 | 2048 bits  | 112 bits            | CURRENT GLOBAL STANDARD
2026 | 4096 bits  | 128 bits            | HIGH-SECURITY ROOT CAs`
  },
  {
    question: "How does the 'Hybrid Cryptosystem' model combine the RSA algorithm with Symmetric AES to achieve both key exchange and gigabit-speed data transfer?",
    shortAnswer: "RSA encrypts a small 256-bit symmetric Data Encryption Key (DEK); high-speed AES-256-GCM uses the DEK to encrypt the bulk multi-gigabyte payload at gigabytes per second.",
    explanation: "Because RSA decryption requires heavy 2048-bit modular exponentiations ($C^d \\bmod N$), encrypting a 10 GB file directly with RSA would take several hours and overheat CPU hardware. In Hybrid Cryptography (Envelope Encryption): 1. Sender generates a random 256-bit AES session key $K$; 2. Encrypts $K$ with recipient's RSA public key ($C_{key} = K^e \\bmod N$, taking 0.1 ms); 3. Encrypts the 10 GB file with AES-256-GCM ($C_{data} = \\text{AES}(File, K)$, taking 1.2 seconds at 8.4 GB/s); 4. Recipient decrypts $K$ using their RSA private key and decrypts the file with AES.",
    hint: "Think of using a small diplomat to deliver a secret house key, and then using that metal key to quickly unlock heavy shipping containers.",
    level: "moderate",
    codeExample: `// RSA + AES Hybrid Envelope Pipeline:
1. Sender:   Key_AES = CSPRNG( 256 bits )
2. Sender:   Encrypted_Key = RSA_Encrypt( Key_AES, Recipient_RSA_Pub ) // 256 bytes
3. Sender:   Ciphertext = AES_256_GCM_Encrypt( 10GB_Database, Key_AES ) // 8.4 GB/s
4. Receiver: Key_AES = RSA_Decrypt( Encrypted_Key, Recipient_RSA_Priv )
5. Receiver: Database = AES_256_GCM_Decrypt( Ciphertext, Key_AES )`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, how are RSA-based Hardware Security Modules (HSMs) used to govern consent management and patient record confidentiality?",
    shortAnswer: "Hospital consent managers sign digital consent artifacts using RSA private keys inside FIPS 140-3 HSMs; Data Fiduciaries verify signatures via public keys to establish non-repudiable legal compliance.",
    explanation: "Under the DPDP Act 2023, data fiduciaries face fines up to ₹250 Crores for processing personal data without verifiable consent. By housing RSA private signing keys inside tamper-resistant Hardware Security Modules (HSMs), when a patient grants consent via an ABDM-compliant app, the HSM generates a cryptographically signed JSON consent artifact. The signature cannot be forged or backdated, providing audit-proof compliance to the Data Protection Board of India.",
    hint: "Remember how hardware-secured digital signatures create legally binding consent artifacts under Indian data privacy laws.",
    level: "moderate",
    codeExample: `// DPDP Act 2023 HSM Consent Signing:
Consent JSON: { "Patient": "Mahima", "Hospital": "Ichapur Hospital", "Expiry": "2027-12-31" }
Action:       HSM.Sign( SHA256(Consent_JSON), Hospital_RSA_PrivKey )
Output:       Digital Signature with FIPS 140-3 Non-Repudiation Guarantee!`
  },
  {
    question: "What is 'Timing Attack' on RSA, and how does 'Cryptographic Blinding' protect RSA private keys from side-channel execution time measurements?",
    shortAnswer: "An attacker measures subtle millisecond differences in RSA modular exponentiation execution times to deduce private key bits; Blinding multiplies ciphertext by a random secret factor $r^e \\bmod N$ before decryption, randomizing execution time.",
    explanation: "In naive RSA decryption ($M = C^d \\bmod N$), computing square-and-multiply operations on private key bits takes slightly different times depending on whether each bit of $d$ is 0 or 1. Paul Kocher (1996) demonstrated that observing thousands of decryption timings reveals private key $d$. RSA Blinding eliminates this side channel: 1. Generate random secret $r$; 2. Blind ciphertext: $C' = C \\cdot r^e \\bmod N$; 3. Decrypt blinded value: $M' = (C')^d = M \\cdot r \\bmod N$; 4. Unblind: $M = M' \\cdot r^{-1} \\bmod N$. The execution time is completely randomized.",
    hint: "Think of wearing an acoustic scrambler while speaking so listeners cannot tell whether you are saying long or short words.",
    level: "expert",
    codeExample: `// RSA Cryptographic Blinding:
1. Pick random integer r coprime to N
2. Blind:   C_blinded = (C * (r^e mod N)) mod N
3. Decrypt: M_blinded = (C_blinded ^ d) mod N = (M * r) mod N
4. Unblind: M = (M_blinded * r^(-1)) mod N
// Execution time is decoupled from Plaintext M -> TIMING ATTACK DEFEATED!`
  },
  {
    question: "What is the role of 'Euler's Totient Function' $\\phi(N) = (p-1)(q-1)$ in the foundational proof of the RSA algorithm?",
    shortAnswer: "Euler's Totient counts positive integers coprime to $N$; by Euler's Theorem ($M^{\\phi(N)} \\equiv 1 \\pmod N$), setting $e \\cdot d \\equiv 1 \\pmod{\\phi(N)}$ guarantees that $(M^e)^d \\equiv M \\pmod N$.",
    explanation: "Euler's theorem states that if $\\gcd(M, N) = 1$, then $M^{\\phi(N)} \\equiv 1 \\pmod N$. For modulus $N = p \\cdot q$, the number of coprimes is $\\phi(N) = (p-1)(q-1)$. In RSA key generation, we choose $d$ such that $e \\cdot d = 1 + k \\cdot \\phi(N)$. When decrypting: $C^d \\equiv (M^e)^d \\equiv M^{ed} \\equiv M^{1 + k\\phi(N)} \\equiv M \\cdot (M^{\\phi(N)})^k \\equiv M \\cdot (1)^k \\equiv M \\pmod N$. This mathematical invariance guarantees that decryption restores the original message perfectly.",
    hint: "Recall Euler's totient theorem and how $\\phi(N) = (p-1)(q-1)$ enables inverting modular powers.",
    level: "expert",
    codeExample: `// Euler's Totient Proof of RSA:
e * d ≡ 1 (mod phi(N))  ==>  e * d = 1 + k * phi(N)
C^d ≡ (M^e)^d ≡ M^(e*d) ≡ M^(1 + k*phi(N)) ≡ M * (M^phi(N))^k ≡ M * (1)^k ≡ M (mod N)`
  },
  {
    question: "Synthesizing the RSA Algorithm: what is the master architectural significance of RSA in the history of computer science and digital security?",
    shortAnswer: "RSA proved that universal trust and confidential communication between strangers is mathematically achievable without pre-shared secrets, creating the foundational architecture for the global internet economy, PKI, and digital signatures.",
    explanation: "Before RSA in 1977, secure communication required physical couriers, codebooks, or prior face-to-face meetings to exchange secret keys. RSA shattered this limitation by coupling the one-way hardness of integer prime factorization with modular arithmetic. It enabled web browsers, mobile banking apps, digital certificates, and software distribution to authenticate identities and establish encrypted channels dynamically across the globe. RSA remains the foundational prototype of all asymmetric public-key cryptography.",
    hint: "Conclude by recognizing how the RSA algorithm made modern global e-commerce and internet communications possible.",
    level: "expert",
    codeExample: `// The Master RSA Equation:
(Prime_Factorization_Hardness + Euler_Totient_Math + PKI_Trust) = UNIVERSAL_DIGITAL_COMMERCE;`
  }
];

export default questions;
