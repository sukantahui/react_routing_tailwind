const questions = [
  {
    question: "What is 'Wiener's Attack' (1990) on RSA, and what is the exact mathematical vulnerability threshold for private exponent $d$?",
    shortAnswer: "If private exponent $d < \\frac{1}{3} N^{1/4}$, the fraction $\\frac{e}{N}$ is exceptionally close to $\\frac{k}{d}$; Continued Fraction expansion of $\\frac{e}{N}$ recovers the private key $d$ in polynomial time $O(\\log N)$.",
    explanation: "Michael J. Wiener proved that if an engineer attempts to speed up RSA decryption by choosing a small private exponent $d < \\frac{1}{3} N^{1/4}$ (for a 2048-bit modulus, $d < 2^{512}$), the algebraic relation $e \\cdot d - k \\cdot \\phi(N) = 1$ forces $\\left| \\frac{e}{N} - \\frac{k}{d} \\right| < \\frac{1}{2 d^2}$. By Legendre's theorem in number theory, $\\frac{k}{d}$ must be one of the continued fraction convergents of $\\frac{e}{N}$. An attacker calculates all convergents in polynomial time, recovering the exact private key $d$ in seconds.",
    hint: "Think of trying to make a key lightweight by filing down its teeth until an intruder can open the lock with a simple wire.",
    level: "expert",
    codeExample: `// Wiener's Low Private Exponent Attack:
Condition: d < (1/3) * N^(0.25)
Method:    Compute Continued Fractions of (e / N) → Generates convergents [k0/d0, k1/d1, ...]
Result:    One convergent (k_i / d_i) gives exact Private Key d in < 0.1 seconds!`
  },
  {
    question: "What is the 'Boneh-Durfee Attack' (1999), and how did it expand Wiener's low private exponent vulnerability bound?",
    shortAnswer: "Boneh and Durfee used Coppersmith's bivariate polynomial lattice reduction (LLL) to expand the vulnerability bound of private exponent $d$ up to $d < N^{0.292}$.",
    explanation: "Dan Boneh and Glenn Durfee improved Wiener's bound from $N^{0.25}$ to $N^{0.292}$. They formulated the RSA relation as a bivariate modular polynomial $f(x, y) = 1 + x(A + y) \\equiv 0 \\pmod e$ where $A = N+1$ and $y = -(p+q)$. By constructing a high-dimensional lattice matrix from the polynomials and applying the Lenstra-Lenstra-Lovász (LLL) lattice reduction algorithm, an attacker finds the small integer roots, factoring modulus $N$ for any private exponent $d < N^{0.292}$.",
    hint: "Remember the famous cryptographic theorem that improved Wiener's bound using lattice reduction.",
    level: "expert",
    codeExample: `// Boneh-Durfee Lattice Reduction:
Vulnerability Bound: d < N^(0.292)  (e.g. d < 2^598 for 2048-bit N)
Technique:           Bivariate Coppersmith Polynomial + LLL Lattice Reduction
Impact:              Total Private Key Extraction in minutes!`
  },
  {
    question: "How does 'Fermat's Factorization Method' crack an RSA modulus $N$ if the two prime factors $p$ and $q$ are chosen close together ($p \\approx q$)?",
    shortAnswer: "Any odd integer $N = x^2 - y^2 = (x - y)(x + y)$; if $p \\approx q$, $x = \\frac{p+q}{2} \\approx \\sqrt{N}$, allowing an attacker to find perfect square $y^2 = x^2 - N$ in a few loops starting from $\\lceil \\sqrt{N} \\rceil$.",
    explanation: "If $|p - q| < 2^{n/4}$ (e.g. $|p - q| < 2^{512}$ for a 2048-bit modulus), the average $x = \\frac{p+q}{2}$ is exceptionally close to $\\sqrt{N}$. An attacker initializes $x = \\lceil \\sqrt{N} \\rceil$ and iterates $x = x + 1$, testing if $x^2 - N$ is a perfect square $y^2$. When a square is found, the prime factors are extracted instantly as $p = x - y$ and $q = x + y$. Defeating this requires enforcing $|p - q| > 2^{900}$.",
    hint: "Think of expressing $N$ as the difference of two squares $x^2 - y^2$.",
    level: "moderate",
    codeExample: `// Fermat's Factorization Algorithm:
x = ceil( sqrt(N) )
while True:
    y2 = x*x - N
    if is_perfect_square(y2):
        y = integer_sqrt(y2)
        p = x - y
        q = x + y
        return p, q  // FACTORED IN SECONDS!`
  },
  {
    question: "What is 'Pollard's $p-1$ Factoring Algorithm', and why is an RSA key compromised if $p-1$ is 'Powersmooth'?",
    shortAnswer: "If all prime factors of $p-1$ are small ($\le B$), $p-1$ divides $M = B!$; therefore $a^M \\equiv 1 \\pmod p$, allowing prime factor $p$ to be extracted via $\\gcd(a^M - 1, N)$.",
    explanation: "John Pollard (1974) showed that if $p-1$ factors entirely into small prime factors below a smoothness bound $B$, then $p-1$ divides $M = \\text{lcm}(1, 2, \\dots, B)$. By Fermat's Little Theorem, $a^{p-1} \\equiv 1 \\pmod p$, which implies $a^M \\equiv 1 \\pmod p$. Thus, $p$ divides $a^M - 1$. An attacker computes $\\gcd(a^M - 1, N) = p$, extracting prime factor $p$ in milliseconds. To defeat this, cryptographers enforce 'Strong Primes' where $p-1 = 2 \\cdot p' + 1$ and $p'$ is a large 1023-bit prime.",
    hint: "Think of a lock whose internal pins all line up at simple integer intervals.",
    level: "expert",
    codeExample: `// Pollard's p-1 Factoring Flow:
Smoothness Bound: B = 1,000,000
Compute:          M = lcm(1, 2, ..., B)
Evaluate:         Factor_p = gcd( mod_exp(2, M, N) - 1, N )
If p-1 is B-smooth: Factor_p yields prime p in 0.01 seconds!`
  },
  {
    question: "What is 'Hastad's Broadcast Attack' (1988), and how does sending the same message $M$ to $e$ recipients break unpadded RSA?",
    shortAnswer: "If message $M$ is encrypted with public exponent $e=3$ to 3 different recipients ($N_1, N_2, N_3$), Chinese Remainder Theorem finds $C \\equiv M^3 \\pmod{N_1 N_2 N_3}$; taking the integer cube root recovers $M$ in 1 millisecond.",
    explanation: "Suppose Alice broadcasts unpadded message $M$ to 3 users with public exponent $e=3$ and coprime moduli $N_1, N_2, N_3$. The attacker intercepts $C_1 = M^3 \\bmod N_1$, $C_2 = M^3 \\bmod N_2$, and $C_3 = M^3 \\bmod N_3$. Applying CRT yields $C_{combined} \\equiv M^3 \\pmod{N_1 N_2 N_3}$. Because $M < N_i$, $M^3 < N_1 N_2 N_3$. Therefore, $C_{combined} = M^3$ over standard integers. Taking $M = \\lfloor (C_{combined})^{1/3} \\rfloor$ extracts plaintext $M$ without factoring any modulus. RSA-OAEP randomized padding eliminates this attack.",
    hint: "Think of combining three separate equations using CRT to remove the modular clock completely.",
    level: "expert",
    codeExample: `// Hastad's Broadcast Attack (e = 3):
C1 = M^3 mod N1,  C2 = M^3 mod N2,  C3 = M^3 mod N3
CRT Solution:   C_total = M^3 mod (N1 * N2 * N3)
Direct Root:    Plaintext M = round( C_total ** (1/3) ) → EXTRACTED INSTANTLY!`
  },
  {
    question: "What is 'Bleichenbacher's Padding Oracle Attack' (Million Message Attack, 1998) on PKCS#1 v1.5?",
    shortAnswer: "An adaptive chosen-ciphertext attack that exploits servers returning 'Bad PKCS#1 Padding' errors; by querying the server with $C \\cdot s^e \\bmod N$, an attacker decrypts ciphertexts in $\\approx 1$ Million queries.",
    explanation: "In PKCS#1 v1.5, decrypted plaintexts must begin with `0x00 0x02`. Daniel Bleichenbacher discovered that if an SSL server returns distinguishable error messages or different response timings when padding is invalid, it acts as a boolean oracle ($P[\\text{Valid PKCS#1}] \\in \\{\\text{True, False}\\}$). By sending systematically adapted ciphertexts $C' = (C \\cdot s^e) \\bmod N$, the attacker halves the interval of possible plaintexts on each response, fully recovering the pre-master secret in $\\approx 1$ Million requests without knowing private key $d$.",
    hint: "Think of an attacker using a server's error buzzer to play 'Higher or Lower' to guess a secret number.",
    level: "expert",
    codeExample: `// Bleichenbacher Oracle Feedback Loop:
Attacker submits: C' = (C * s^e) mod N
Server Response:  "Bad Padding" (Leaks top bits of plaintext M!)
Attacker Iterates: 1,000,000 queries → Full Plaintext Extracted!
OAEP Defense:     Verifies SHA256 integrity tag → Returns uniform constant-time error → ATTACK DEFEATED!`
  },
  {
    question: "What is the 'Bellcore Fault Injection Attack' (Boneh, DeMillo, Lipton, 1997) on RSA-CRT, and how does a single hardware glitch factor modulus $N$?",
    shortAnswer: "If a laser or voltage glitch corrupts the computation of $m_1 \\bmod p$ while $m_2 \\bmod q$ remains correct, the faulty signature $S'$ satisfies $\\gcd((S')^e - M, N) = q$, factoring $N$ with a single GCD calculation.",
    explanation: "In RSA-CRT signing, $S$ is assembled from $m_1 = M^{d_p} \\bmod p$ and $m_2 = M^{d_q} \\bmod q$. If an electromagnetic or voltage pulse corrupts $m_1$ into $m_1'$, the resulting signature $S'$ is correct modulo $q$ ($(S')^e \\equiv M \\pmod q$), but incorrect modulo $p$ ($(S')^e \\not\\equiv M \\pmod p$). Therefore, $(S')^e - M$ is a multiple of $q$ but not of $p$. The attacker simply calculates $\\gcd((S')^e - M, N) = q$, extracting prime factor $q$ in 0.001 ms.",
    hint: "Think of an intentional electrical glitch that unbalances one side of a scale, revealing the secret weight.",
    level: "expert",
    codeExample: `// Bellcore CRT Fault Attack:
Faulty Signature: S' (Computed with corrupted m1' mod p, but correct m2 mod q)
Attacker evaluates:
  Factor_q = gcd( (S')^e - M, N )
Result: gcd yields exact prime factor q in 0.001 ms → TOTAL SYSTEM COMPROMISE!
Defense: ALWAYS verify signature ( (S')^e mod N == M ) BEFORE transmitting!`
  },
  {
    question: "What is the 'ROCA Vulnerability' (CVE-2017-15361 / Return of Coppersmith's Attack), and how did flawed Infineon chip prime generation compromise millions of RSA keys?",
    shortAnswer: "Infineon cryptographic smart cards generated primes of the structured form $p = k \\cdot M + (65537^a \\bmod M)$; this allowed attackers using Coppersmith's algorithm to factor 2048-bit RSA keys for ~$76 on AWS.",
    explanation: "To accelerate prime generation on low-power smart card silicon, Infineon implemented an algorithm where primes were constructed as $p = k \\cdot M + (65537^a \\bmod M)$ (where $M = 2 \\times 3 \\times 5 \\dots \\times 709$). This imparted an identifiable algebraic fingerprint to $N = p \\cdot q$. In 2017, researchers proved that Coppersmith's polynomial root-finding could factor these 2048-bit moduli in 17 days on commercial cloud servers, forcing worldwide recalls of national e-ID cards and government signing tokens.",
    hint: "Think of an automaker using a flawed shortcut on metal bolts that causes millions of cars to fail safety inspections.",
    level: "expert",
    codeExample: `// ROCA Flawed Prime Structure (CVE-2017-15361):
Flawed Form: p = k * M + (65537^a mod M) where M = 2 * 3 * 5 * ... * 709
Vulnerability: Attacker knows N mod M has tiny set of possible discrete values!
Factoring Time: 1024-bit RSA factored in 45 minutes; 2048-bit factored in 17 days!
Lesson: NEVER use proprietary 'fast prime' shortcuts; enforce standard Miller-Rabin!`
  },
  {
    question: "What are 'Flush+Reload' and 'Prime+Probe' CPU Cache-Timing Attacks on RSA modular exponentiation, and how do they extract private keys across virtual machines?",
    shortAnswer: "Attackers measure CPU L1/L3 cache latency when accessing pre-computed modular power tables; cache line hits reveal which table index (and therefore which private key bits) the victim processed.",
    explanation: "In sliding-window modular exponentiation, pre-computed powers ($M^1, M^3, \\dots, M^{15} \\bmod N$) are stored in memory arrays. When a victim thread loads `table[d_i]`, that memory line is loaded into CPU cache. A co-located attacker thread runs `Flush+Reload` (flushing cache lines and measuring memory access reload times). Fast access indicates the victim accessed that specific cache line, revealing private key bits $d_i$ in real time across cloud multi-tenant boundaries.",
    hint: "Think of an eavesdropper listening to which drawer in a filing cabinet opens by measuring the sound delay.",
    level: "expert",
    codeExample: `// Flush+Reload Cache-Timing Attack:
1. Attacker flushes shared memory: _mm_clflush( &table[i] )
2. Victim executes RSA Decryption: loads table[d_chunk] into L3 cache
3. Attacker measures access time: rdtsc() → table[i] is FAST!
Outcome: Attacker deduces d_chunk = i → FULL PRIVATE KEY RECOVERED!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66 and CERT-In Directions 2022, what are the statutory liabilities and reporting requirements when an RSA key factorization vulnerability is exploited?",
    shortAnswer: "Exploiting RSA factorization flaws for unauthorized access is punishable with up to 3 years imprisonment and fines under Section 66; organizations suffering private key compromise must report to CERT-In within 6 hours under Section 70B.",
    explanation: "Under Section 66 of the Indian IT Act 2000, unauthorized decryption or forging of electronic records using cryptographic exploits constitutes criminal hacking punishable with up to 3 years imprisonment and heavy fines. Furthermore, under CERT-In Directions 2022 (issued under Section 70B), any compromised private signing key, SSL certificate breach, or cryptographic incident must be formally reported to the Indian Computer Emergency Response Team (CERT-In) within 6 hours of discovery.",
    hint: "Remember the 3-year imprisonment penalty for hacking and the strict 6-hour CERT-In mandatory reporting timeline.",
    level: "basic",
    codeExample: `// Indian Statutory Incident Reporting Timeline:
Event: RSA Private Key Extracted via Side-Channel / Bleichenbacher Oracle
Criminal Liability (Attacker): Section 66 IT Act (Up to 3 Years Imprisonment)
Mandatory Reporting (Enterprise): Notify CERT-In Incident Response Desk within 6 HOURS!`
  },
  {
    question: "What is 'Shor's Algorithm' (1994), and how does it fundamentally undermine the prime factorization security of the RSA cryptosystem on quantum computers?",
    shortAnswer: "Shor's algorithm uses quantum Fourier transform to find the period of modular exponentiation in polynomial time $O((\\log N)^3)$, reducing 2048-bit RSA factoring from billions of years to a few minutes on a fault-tolerant quantum computer.",
    explanation: "Classical factoring algorithms (like GNFS) require sub-exponential time $O(\\exp((\\log N)^{1/3}))$. Peter Shor proved that a quantum computer operating in quantum superposition can evaluate period finding of $f(x) = a^x \\bmod N$ in polynomial time $O((\\log N)^3)$. A quantum computer with ~4,000 stable logical qubits can factor 2048-bit and 4096-bit RSA moduli in minutes, completely breaking all classical RSA public-key infrastructure.",
    hint: "Recall the landmark quantum algorithm that solves integer factorization in polynomial time.",
    level: "expert",
    codeExample: `// Classical vs Quantum Factoring Complexity:
Classical (GNFS): O( exp( (64/9 * b)^(1/3) * (log b)^(2/3) ) ) → Infeasible for 2048-bit N!
Quantum (Shor):   O( b^3 ) [Polynomial Time → Cracks RSA-2048 & RSA-4096 in Minutes!]`
  },
  {
    question: "What is the 'Harvest Now, Decrypt Later' (HNDL) threat model, and why are nation-state adversaries intercepting encrypted RSA traffic today?",
    shortAnswer: "Adversaries record and store encrypted high-security communications today so that when fault-tolerant quantum computers become available, they can run Shor's algorithm to decrypt the stored historical archives.",
    explanation: "Even though large-scale fault-tolerant quantum computers do not yet exist, intelligence agencies and sophisticated threat actors are executing 'Harvest Now, Decrypt Later' operations: They tap undersea fiber-optic cables and capture petabytes of encrypted government, defense, and banking traffic. In 10 to 15 years, when quantum computers arrive, they will factor the RSA keys and decrypt all historical diplomatic and financial records. Defeating HNDL requires immediate migration to Hybrid Post-Quantum Cryptography (FIPS 203 ML-KEM).",
    hint: "Think of an adversary stealing sealed letters today, planning to wait until an unpickable lock-breaker is invented in the future.",
    level: "moderate",
    codeExample: `// Harvest Now, Decrypt Later (HNDL) Attack Lifecycle:
Year 2026: Adversary taps TLS 1.3 fiber → Stores Encrypted Petabytes in Cloud Vaults.
Year 2035: Adversary builds 4,000-qubit Quantum Computer → Runs Shor's Algorithm.
Year 2035: ALL 2026 DIPLOMATIC & BANKING RECORDS DECRYPTED IN SECONDS!`
  },
  {
    question: "What is the 'Common Modulus Attack' (Simmons, 1983) on RSA, and why must organizations never share the same modulus $N$ among multiple users with different public exponents $e_1, e_2$?",
    shortAnswer: "If two users share modulus $N$ with coprime exponents $\\gcd(e_1, e_2) = 1$, an attacker intercepting the same message encrypted to both users ($C_1 = M^{e_1} \\bmod N, C_2 = M^{e_2} \\bmod N$) recovers plaintext $M$ in polynomial time via the Extended Euclidean Algorithm.",
    explanation: "If two users share modulus $N$ and have public exponents $e_1, e_2$ with $\\gcd(e_1, e_2) = 1$: The Extended Euclidean Algorithm finds integers $r, s$ such that $e_1 \\cdot r + e_2 \\cdot s = 1$. An attacker computes $C_1^r \\cdot C_2^s \\equiv (M^{e_1})^r \\cdot (M^{e_2})^s = M^{e_1 r + e_2 s} = M^1 \\equiv M \\pmod N$. The attacker recovers plaintext $M$ in milliseconds without knowing any private key.",
    hint: "Think of using Bezout's coefficients $r$ and $s$ as powers to combine two ciphertexts into $M^1$.",
    level: "expert",
    codeExample: `// Common Modulus Attack:
Given: C1 = M^(e1) mod N,  C2 = M^(e2) mod N with gcd(e1, e2) = 1
EEA finds r, s: e1 * r + e2 * s = 1
Attacker computes: M = (C1^r * C2^s) mod N (RECOVERS PLAINTEXT IN 0.001 MS!)`
  },
  {
    question: "Synthesizing Security Strengths and Factorization Vulnerabilities of RSA: what is the master blueprint for defending production RSA deployments against all known attacks?",
    shortAnswer: "1. Enforce 2048-bit/4096-bit modulus; 2. Strong primes with $|p-q| > 2^{900}$; 3. Standard $e=65537$; 4. RSA-OAEP / RSA-PSS padding; 5. Constant-time Montgomery Ladder; 6. Cryptographic blinding; 7. Pre-transmission CRT verification; 8. Hybrid Post-Quantum Migration.",
    explanation: "To engineer an invincible RSA deployment: 1. Factorization Defense: Use $\\ge 2048$-bit modulus with 64-round Miller-Rabin strong primes to defeat GNFS, Pollard, and Fermat attacks; 2. Exponent Defense: Use $e=65537$ and full-entropy $d$ to defeat Wiener, Boneh-Durfee, and cube root attacks; 3. Malleability Defense: Use RSA-OAEP and RSA-PSS (RFC 8017) to defeat Bleichenbacher and homomorphic attacks; 4. Side-Channel Defense: Deploy constant-time Montgomery math and cryptographic blinding; 5. Fault Defense: Verify CRT signatures before sending; 6. Quantum Defense: Pilot NIST FIPS 203 ML-KEM hybrid handshakes.",
    hint: "Conclude by reviewing the complete 8-tier architectural blueprint for bulletproof RSA security.",
    level: "expert",
    codeExample: `// Master Blueprint for Bulletproof RSA Security:
(GNFS_2048_Modulus + Strong_Primes + e_65537 + OAEP_Feistel + ConstantTime_Montgomery + Blinding + CRT_Verification + PQC_Hybrid) = INVINCIBLE_RSA;`
  }
];

export default questions;
