const questions = [
  {
    question: "What are the core mathematical operations for RSA Encryption and Decryption?",
    shortAnswer: "Encryption: $C \\equiv M^e \\pmod N$ (using recipient's public key $(e, N)$); Decryption: $M \\equiv C^d \\pmod N$ (using recipient's secret private key $(d, N)$).",
    explanation: "To encrypt a plaintext message integer $M$ ($0 \\le M < N$): The sender computes ciphertext $C = M^e \\bmod N$. To decrypt ciphertext $C$: The recipient computes plaintext $M = C^d \\bmod N$. By Euler's Totient Theorem, $(M^e)^d \\equiv M^{e \\cdot d} \\equiv M^{1 + k\\phi(N)} \\equiv M \\pmod N$, restoring the exact original message integer with 100% mathematical fidelity.",
    hint: "Recall raising plaintext to power $e$ modulo $N$ for encryption, and raising ciphertext to power $d$ modulo $N$ for decryption.",
    level: "basic",
    codeExample: `// RSA Core Mathematical Operations:
Encryption: Ciphertext C = ( Plaintext_M ^ e ) mod N
Decryption: Plaintext M  = ( Ciphertext_C ^ d ) mod N
Where: N = p * q  and  e * d ≡ 1 (mod (p-1)(q-1))`
  },
  {
    question: "Why does RSA Decryption $(M^e)^d \\equiv M \\pmod N$ hold true even if $\\gcd(M, N) > 1$ (i.e. if $M$ shares a prime factor with $N$)?",
    shortAnswer: "By Fermat's Little Theorem and the Chinese Remainder Theorem, $M^{ed} \\equiv M \\pmod p$ and $M^{ed} \\equiv M \\pmod q$ both hold unconditionally; since $p$ and $q$ are distinct primes, $M^{ed} \\equiv M \\pmod{pq}$.",
    explanation: "While Euler's theorem strictly requires $\\gcd(M, N) = 1$, the RSA congruence holds for ALL integers $M < N$. If $p \\mid M$, then $M \\equiv 0 \\pmod p$, so $M^{ed} \\equiv 0^{ed} \\equiv 0 \\equiv M \\pmod p$. If $p \\nmid M$, by Fermat's Little Theorem, $M^{p-1} \\equiv 1 \\pmod p$, so $M^{ed} = M^{1 + k(p-1)(q-1)} = M \\cdot (M^{p-1})^{k(q-1)} \\equiv M \\cdot (1) \\equiv M \\pmod p$. By symmetry, $M^{ed} \\equiv M \\pmod q$. By the Chinese Remainder Theorem, $M^{ed} \\equiv M \\pmod{p \\cdot q}$ unconditionally.",
    hint: "Think of proving the congruence separately modulo prime $p$ and modulo prime $q$, and combining them via the Chinese Remainder Theorem.",
    level: "expert",
    codeExample: `// Proof of RSA Correctness for All Plaintexts M:
Case 1: Modulo p:
  - If p divides M:     M^(e*d) ≡ 0 ≡ M (mod p)
  - If p does not divide: M^(p-1) ≡ 1 (mod p) ==> M^(e*d) ≡ M * (1)^k ≡ M (mod p)
Case 2: Modulo q:
  - Identically:        M^(e*d) ≡ M (mod q)
Conclusion: Since gcd(p, q) = 1, M^(e*d) ≡ M (mod p * q) for ALL integers M < N!`
  },
  {
    question: "What is 'Multiplicative Homomorphism' in unpadded Textbook RSA, and how can an attacker manipulate financial payment transactions?",
    shortAnswer: "Multiplying two ciphertexts produces the encryption of their product: $E(M_1) \\cdot E(M_2) \\equiv (M_1 \\cdot M_2)^e \\pmod N$; an attacker can double an encrypted wire transfer without knowing the private key.",
    explanation: "In Textbook RSA ($C = M^e \\bmod N$): Given ciphertext $C = M^e \\bmod N$, an attacker computes $C' = (C \\cdot 2^e) \\bmod N = (M \\cdot 2)^e \\bmod N$. When the bank decrypts $C'$, it computes $(C')^d = 2M$, doubling the payment amount. This algebraic malleability is a catastrophic security vulnerability, necessitating randomized padding (RSA-OAEP).",
    hint: "Think of an attacker multiplying an encrypted check by 2 to double its cash payout without forging a signature.",
    level: "moderate",
    codeExample: `// Textbook RSA Malleability Exploit:
Original Ciphertext: C = ( ₹10,000 )^e mod N
Attacker Computes:   C_forged = ( C * (2^e mod N) ) mod N = ( ₹20,000 )^e mod N
Bank Decrypts:       ( C_forged )^d mod N = ₹20,000 (BANK PAYS DOUBLE CASH!)`
  },
  {
    question: "What is 'Optimal Asymmetric Encryption Padding' (RSA-OAEP / PKCS#1 v2.2), and how does it achieve IND-CCA2 provable security?",
    shortAnswer: "OAEP adds a randomized Feistel network with two cryptographic hash functions (MGF1/SHA-256) to plaintext before exponentiation, ensuring semantic randomized ciphertext and destroying malleability.",
    explanation: "Invented by Mihir Bellare and Phillip Rogaway in 1994, RSA-OAEP transforms plaintext $M$: 1. It generates a random 256-bit seed $r$; 2. Masks the data block ($DB = M || \\text{Padding}$) with $H(r)$; 3. Masks the seed with $G(\\text{MaskedDB})$; 4. Concatenates both blocks into padded message $EM$; 5. Computes $C = EM^e \\bmod N$. Because $r$ is random for every encryption, encrypting the identical message twice produces completely different ciphertexts, defeating all chosen-ciphertext attacks (IND-CCA2).",
    hint: "Think of wrapping a confidential document in two layers of randomized Feistel bubble wrap before placing it in the RSA vault.",
    level: "expert",
    codeExample: `// RSA-OAEP Feistel Encoding Pipeline:
DataBlock  = Hash(Label) || 0x00...01 || Plaintext_M
RandomSeed = CSPRNG( 256 bits )
MaskedDB   = DataBlock ⊕ MGF1( RandomSeed, DB_Len )
MaskedSeed = RandomSeed ⊕ MGF1( MaskedDB, Seed_Len )
EncodedMsg = 0x00 || MaskedSeed || MaskedDB
Ciphertext = ( EncodedMsg ^ e ) mod N (IND-CCA2 PROVABLY SECURE!)`
  },
  {
    question: "What is the 'Short Message Cube Root Attack' on unpadded RSA with public exponent $e = 3$?",
    shortAnswer: "If a small message $M < \\sqrt[3]{N}$ is encrypted with $e = 3$, $M^3 < N$; therefore no modular reduction occurs ($C = M^3$), and an attacker recovers $M = \\sqrt[3]{C}$ using standard integer arithmetic.",
    explanation: "In Textbook RSA: If modulus $N$ is 2048 bits ($N \\approx 2^{2048}$) and public exponent $e = 3$: If a short message $M = 42$ is encrypted without padding, $C = 42^3 = 74,088$. Because $74,088 < N$, the modulo operation has zero effect ($C = M^3 \\text{ over } \\mathbb{Z}$). An attacker simply computes the standard mathematical cube root $M = \\lfloor C^{1/3} \\rfloor = 42$, breaking encryption in 1 microsecond without factoring $N$.",
    hint: "Think of a clock with 3,000 numbers on its face: if you only move forward 74 steps, the hand never wraps around the dial.",
    level: "moderate",
    codeExample: `// Short Message Cube Root Vulnerability (e = 3):
Modulus N: 2048-bit integer (≈ 10^616)
Secret M:  1000 (Small 4-digit PIN)
Cipher:    C = (1000)^3 mod N = 1,000,000,000 (No modular wrap!)
Attacker:  M = integer_cube_root( 1,000,000,000 ) = 1000 (RECOVERED INSTANTLY!)`
  },
  {
    question: "How does the 'Chinese Remainder Theorem' (RSA-CRT) accelerate RSA Decryption by $4\\times$ using Gauss-Garner recombination?",
    shortAnswer: "By computing two independent 1024-bit exponentiations ($m_1 = C^{d_p} \\bmod p$ and $m_2 = C^{d_q} \\bmod q$) and recombining them: $M = m_2 + q \\cdot ((m_1 - m_2) \\cdot q_{inv} \\bmod p)$.",
    explanation: "Standard decryption computes $M = C^d \\bmod N$ with 2048-bit numbers. Since multiplication complexity scales quadratically ($O(b^2)$), 1024-bit operations are $4\\times$ faster. In RSA-CRT: 1. $m_1 = C^{d_p} \\bmod p$ (where $d_p = d \\bmod (p-1)$); 2. $m_2 = C^{d_q} \\bmod q$ (where $d_q = d \\bmod (q-1)$); 3. Garner's formula recombines them in microseconds: $h = (q_{inv} \\cdot (m_1 - m_2)) \\bmod p$, then $M = m_2 + h \\cdot q$. This delivers a $4\\times$ speedup across enterprise payment gateways.",
    hint: "Think of splitting a heavy arithmetic equation into two lightweight sub-problems and snapping the solutions together.",
    level: "expert",
    codeExample: `// RSA-CRT Garner's Decryption Algorithm:
1. m1 = mod_exp( C % p, d_p, p )  // 1024-bit exponentiation
2. m2 = mod_exp( C % q, d_q, q )  // 1024-bit exponentiation
3. h  = ( q_inv * (m1 - m2) ) % p
   if h < 0: h = h + p
4. M  = m2 + h * q               // Exact Plaintext in 1/4th the CPU time!`
  },
  {
    question: "What is 'Cryptographic Blinding' during RSA Decryption, and how does it prevent timing and power side-channel key extraction?",
    shortAnswer: "Multiplying ciphertext $C$ by a random secret factor $r^e \\bmod N$ before modular exponentiation, randomizing CPU instruction timings, and unblinding the result with $r^{-1} \\bmod N$ afterward.",
    explanation: "In RSA decryption, if an attacker measures physical CPU execution times or power spikes, observing subtle differences during square-and-multiply allows them to deduce private key bits. With Blinding: 1. Generate random secret $r$ coprime to $N$; 2. Compute blinded ciphertext $C' = (C \\cdot r^e) \\bmod N$; 3. Decrypt: $M' = (C')^d = (M \\cdot r) \\bmod N$; 4. Unblind: $M = (M' \\cdot r^{-1}) \\bmod N$. The CPU processes completely random numbers, rendering timing analysis mathematically useless.",
    hint: "Think of adding temporary secret static noise to a voice recording and subtracting it after playback.",
    level: "moderate",
    codeExample: `// RSA Modular Blinding Pipeline:
1. r = CSPRNG_coprime(N)
2. C_blinded = (C * mod_exp(r, e, N)) % N
3. M_blinded = mod_exp(C_blinded, d, N) = (M * r) % N
4. M_plain   = (M_blinded * mod_inv(r, N)) % N
// Result: 100% Timing Side-Channel Immunity!`
  },
  {
    question: "Under the Information Technology Act 2000 Section 43A and Section 5, why is RSA-OAEP mandatory for data encryption and RSA-PSS mandatory for digital signatures in India?",
    shortAnswer: "Legacy PKCS#1 v1.5 padding is vulnerable to Bleichenbacher padding oracle attacks; deploying RSA-OAEP and RSA-PSS satisfies statutory 'reasonable security practices' under Section 43A.",
    explanation: "Section 43A of the Indian IT Act 2000 holds organizations legally liable for compensation if they fail to implement 'reasonable security practices' resulting in data breaches. Bleichenbacher's attack proved that PKCS#1 v1.5 padding can be decrypted by oracle queries without private keys. Standardizing on RSA-OAEP (RFC 8017) for encryption and RSA-PSS for digital signatures ensures IND-CCA2 security, eliminating legal liability and preserving non-repudiation under Section 5.",
    hint: "Remember how Indian cyber regulations mandate modern padding schemes to prevent padding oracle breaches.",
    level: "basic",
    codeExample: `// Indian IT Act 43A Compliance Standard:
Legacy PKCS#1 v1.5:  Vulnerable to Bleichenbacher Oracle → Non-Compliant under Section 43A!
Modern PKCS#1 v2.2:  RSA-OAEP (Encryption) + RSA-PSS (Signatures) → 100% Statutory Compliance!`
  },
  {
    question: "What is a 'Chosen-Ciphertext Attack' (CCA2 / Bleichenbacher Million Message Attack) on RSA, and how does padding verification prevent it?",
    shortAnswer: "An attacker modifies ciphertext $C' = C \\cdot s^e \\bmod N$ and sends it to a server; observing whether the server returns padding errors allows the attacker to deduce the plaintext in $\\approx 1$ Million queries; OAEP prevents this by verifying integrity tags before processing.",
    explanation: "In PKCS#1 v1.5 padding, decrypted plaintexts must start with `0x00 0x02`. Daniel Bleichenbacher (1998) showed that if an SSL server returns different error messages for 'Bad Padding' vs 'Decryption Failed', an attacker can treat the server as an oracle. By sending adapted ciphertexts $C \\cdot s^e \\bmod N$, the attacker narrows down the possible plaintext range, recovering the pre-master secret. RSA-OAEP eliminates this by verifying cryptographic hash digests across the entire block before accepting the message.",
    hint: "Think of an attacker using error buzzers on a server to narrow down a secret combination.",
    level: "expert",
    codeExample: `// Bleichenbacher Oracle Feedback Loop:
Attacker submits: C' = (C * s^e) mod N
Server Response:  "Bad Padding" (Leaks top bits of plaintext M!)
Attacker Iterates: 1,000,000 queries → Full Plaintext Extracted!
OAEP Defense:     Verifies SHA256 integrity tag → Returns uniform constant-time error → ATTACK DEFEATED!`
  },
  {
    question: "What is the computational throughput limitation of RSA Encryption and Decryption compared to Symmetric AES-256-GCM?",
    shortAnswer: "RSA is approximately $1,000\\times$ slower than AES-256-GCM; RSA operates at ~5 MB/s on modern CPUs, whereas AES-NI hardware instructions process bulk data at >8.4 GB/s.",
    explanation: "Because RSA operations require computing modular exponentiations with massive 2048-bit numbers ($O(b^3)$ complexity), encrypting a 5 GB video or database directly with RSA would take several minutes and overload server processors. In contrast, symmetric AES-256-GCM uses dedicated silicon instructions (AES-NI) running in sub-nanoseconds. Consequently, production systems deploy Hybrid Cryptosystems: RSA encrypts a small 256-bit symmetric session key, and AES encrypts the bulk payload.",
    hint: "Contrast heavy 2048-bit modular exponentiation math with dedicated hardware AES-NI CPU instructions.",
    level: "moderate",
    codeExample: `// RSA vs AES-256 Throughput Benchmark:
RSA-2048 Encryption: ~0.08 ms per 256-byte block (~3.2 MB/s Throughput)
AES-256-GCM (AES-NI): ~0.12 ns per byte          (>8,400 MB/s Throughput)
Hybrid Model:        RSA encrypts 32-byte AES key (0.08 ms) + AES encrypts 10 GB file (1.2 s)!`
  },
  {
    question: "How does the 'Square-and-Multiply' algorithm execute modular exponentiation for encryption ($M^e \\bmod N$) with $e = 65537$?",
    shortAnswer: "Since $e = 65537 = 10000000000000001_2$ (17 bits), the algorithm performs exactly 16 squarings and 1 single multiplication, executing in under 0.05 milliseconds.",
    explanation: "Square-and-Multiply evaluates exponent bits from left to right: Starting with accumulator $x = M$, for each of the next 16 zero bits, it computes $x = x^2 \\bmod N$ (16 squarings). On the final bit (which is 1), it computes $x = (x^2 \\cdot M) \\bmod N$ (1 squaring + 1 multiplication). Thus, computing $M^{65537} \\bmod N$ requires only 17 modular operations, making RSA public key encryption blazingly fast on client web browsers and mobile apps.",
    hint: "Recall how Fermat prime $F_4 = 2^{16}+1$ has only two 1s in its binary representation.",
    level: "moderate",
    codeExample: `// Square-and-Multiply for e = 65537:
Binary representation: 0b10000000000000001 (17 bits)
Step 1:  Acc = M
Steps 2..16 (15 zero bits): Acc = (Acc^2) mod N (15 Squarings)
Step 17 (final 1 bit):     Acc = ((Acc^2) * M) mod N (1 Squaring + 1 Multiplication)
Total Operations: 16 Squarings + 1 Multiplication = 17 Operations!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is 'Envelope Encryption' with RSA-OAEP legally recognized as a robust security safeguard for Data Fiduciaries?",
    shortAnswer: "Envelope encryption wraps local data encryption keys (DEKs) inside RSA-OAEP master keys in HSMs; compromising the database storage layer reveals only useless ciphertext, preventing data breaches.",
    explanation: "Under Section 33 of the DPDP Act 2023, Data Fiduciaries must implement robust cryptographic safeguards. In Envelope Encryption: Customer personal data is encrypted locally with a fresh symmetric AES-256 key (Data Encryption Key - DEK). The DEK is encrypted using the hospital or bank's master RSA public key with OAEP padding ($C_{dek} = \\text{RSA-OAEP}(DEK, PubKey)$) and stored alongside the ciphertext. The private RSA key never leaves the hardware HSM, guaranteeing zero data exposure if cloud storage is breached.",
    hint: "Remember how envelope encryption protects petabytes of cloud databases under Indian privacy laws.",
    level: "moderate",
    codeExample: `// DPDP Act 2023 Envelope Encryption Architecture:
1. Plaintext Data: Customer Aadhaar & Medical Records
2. Local AES DEK:   DEK = CSPRNG( 256 bits ) → Encrypts Data at 8.4 GB/s
3. Master RSA Key: C_dek = RSA_OAEP_Encrypt( DEK, Hospital_HSM_PublicKey )
4. Storage:        Stores ( Ciphertext_Data + C_dek ) on Cloud DB (100% DPDP Compliant!)`
  },
  {
    question: "What is 'Hastad's Broadcast Attack' (1988) on unpadded RSA, and how did encrypting the same message to 3 different recipients with $e = 3$ break encryption?",
    shortAnswer: "If message $M$ is encrypted with $e = 3$ to 3 different recipients ($N_1, N_2, N_3$), the Chinese Remainder Theorem combines ciphertexts to find $C \\equiv M^3 \\pmod{N_1 N_2 N_3}$; taking the integer cube root recovers $M$ without factoring any modulus.",
    explanation: "Suppose a sender broadcasts message $M$ to Alice, Bob, and Charlie, each having public exponent $e = 3$ and coprime moduli $N_1, N_2, N_3$. The attacker intercepts $C_1 = M^3 \\bmod N_1$, $C_2 = M^3 \\bmod N_2$, and $C_3 = M^3 \\bmod N_3$. Using the Chinese Remainder Theorem, the attacker calculates $C \\equiv M^3 \\pmod{N_1 N_2 N_3}$. Since $M < N_i$, $M^3 < N_1 N_2 N_3$. Therefore $C = M^3$ over standard integers. Taking $M = \\sqrt[3]{C}$ extracts the plaintext in 1 millisecond. RSA-OAEP prevents this by randomizing every transmission.",
    hint: "Think of using three overlapping equations to eliminate the modular boundaries completely.",
    level: "expert",
    codeExample: `// Hastad's Broadcast Attack (e = 3, 3 Recipients):
C1 = M^3 mod N1,  C2 = M^3 mod N2,  C3 = M^3 mod N3
Attacker applies CRT: C_combined = M^3 mod (N1 * N2 * N3)
Since M^3 < N1*N2*N3: C_combined = M^3 (Exact Integer!)
Attacker Computes:   M = integer_cube_root( C_combined ) → PLAIN TEXT RECOVERED!`
  },
  {
    question: "Synthesizing RSA Encryption and Decryption: what is the master algorithmic lifecycle of a production RSA cryptographic transaction?",
    shortAnswer: "$$\\text{Plaintext } M \\xrightarrow{\\text{OAEP Padding}} EM \\xrightarrow{EM^e \\bmod N} \\text{Ciphertext } C \\xrightarrow{C^d \\bmod N \\text{ (CRT+Blinding)}} EM \\xrightarrow{\\text{OAEP Unpad}} M$$",
    explanation: "This complete pipeline defines production RSA encryption and decryption: 1. Plaintext $M$ is encoded with randomized OAEP Feistel padding using SHA-256; 2. Public exponentiation ($e=65537$) computes ciphertext $C$; 3. Receiver applies cryptographic blinding ($C' = C \\cdot r^e \\bmod N$); 4. Private modular exponentiation computes $EM$ using Chinese Remainder Theorem ($d_p, d_q, q_{inv}$) in $1/4$th the CPU time; 5. Unblinding and OAEP verification restores plaintext $M$ with full IND-CCA2 security.",
    hint: "Conclude by reviewing the complete 5-stage pipeline from OAEP padding to CRT-blinded decryption.",
    level: "expert",
    codeExample: `// Master Production RSA Lifecycle:
1. Sender:   EM = OAEP_Encode( M, SHA256, Random_Seed )
2. Sender:   C  = Montgomery_Exp( EM, e=65537, N )
3. Receiver: C_blind = ( C * (r^e mod N) ) mod N
4. Receiver: EM_blind = RSA_CRT_Decrypt( C_blind, d_p, d_q, q_inv )
5. Receiver: EM = ( EM_blind * r^(-1) ) mod N
6. Receiver: M = OAEP_Decode( EM, SHA256 ) → 100% SECURE PLAINTEXT RESTORED!`
  }
];

export default questions;
