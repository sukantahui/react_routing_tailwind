const questions = [
  {
    question: "What is a 'Modular Multiplicative Inverse', and how is it defined mathematically in the context of RSA private key generation?",
    shortAnswer: "Given an integer $e$ and modulus $\\phi(N)$, the inverse $d$ is an integer such that $(e \\cdot d) \\equiv 1 \\pmod{\\phi(N)}$; it exists if and only if $\\gcd(e, \\phi(N)) = 1$.",
    explanation: "In standard arithmetic, the multiplicative inverse of $x$ is $\\frac{1}{x}$ because $x \\cdot \\frac{1}{x} = 1$. In modular arithmetic modulo $\\phi(N)$, division is not allowed; instead, we find an integer $d \\in [1, \\phi(N)-1]$ such that multiplying $e$ by $d$ and dividing by $\\phi(N)$ leaves a remainder of exactly 1 ($e \\cdot d = 1 + k \\cdot \\phi(N)$). This integer $d$ serves as the secret private decryption key in RSA.",
    hint: "Think of finding a whole number multiplier that wraps around the modular clock to land on exactly 1.",
    level: "basic",
    codeExample: `// Modular Multiplicative Inverse Definition:
e * d ≡ 1 (mod phi(N))
Example: e = 7, phi(N) = 20
Check:   7 * 3 = 21 ≡ 1 (mod 20) → Private Key d = 3!`
  },
  {
    question: "What is 'Bezout's Identity', and how does it guarantee that the Extended Euclidean Algorithm can find the modular inverse $d$?",
    shortAnswer: "Bezout's identity states that for any non-zero integers $a$ and $b$, there exist integers $x$ and $y$ such that $a \\cdot x + b \\cdot y = \\gcd(a, b)$; when $\\gcd(e, \\phi(N)) = 1$, this becomes $e \\cdot x + \\phi(N) \\cdot y = 1$, giving $d = x \\pmod{\\phi(N)}$.",
    explanation: "The Euclidean algorithm computes the greatest common divisor $\\gcd(a, b)$. By running the Extended Euclidean Algorithm (EEA) backward, we express $\\gcd(e, \\phi(N))$ as a linear combination of $e$ and $\\phi(N)$. Since $e$ is chosen coprime to $\\phi(N)$, $\\gcd(e, \\phi(N)) = 1$. Thus, $e \\cdot x + \\phi(N) \\cdot y = 1$. Taking this equation modulo $\\phi(N)$ eliminates the $\\phi(N) \\cdot y$ term, yielding $e \\cdot x \\equiv 1 \\pmod{\\phi(N)}$.",
    hint: "Recall the famous algebraic identity expressing the greatest common divisor as a linear combination $a x + b y = \\gcd(a, b)$.",
    level: "moderate",
    codeExample: `// Bezout's Identity in RSA:
Given: e = 17, phi(N) = 3120, gcd(17, 3120) = 1
EEA finds Bezout coefficients: (17 * 2753) + (3120 * -15) = 1
Modulo 3120:                  17 * 2753 ≡ 1 (mod 3120)
Result:                       Private Exponent d = 2753!`
  },
  {
    question: "How does the 'Square-and-Multiply' (Binary Modular Exponentiation) algorithm compute $C = M^e \\bmod N$ in $O(\\log e)$ operations instead of $O(e)$?",
    shortAnswer: "By scanning the binary representation of exponent $e$: For every bit, it squares the accumulator ($x = x^2 \\bmod N$); if the bit is 1, it also multiplies by the base ($x = x \\cdot M \\bmod N$).",
    explanation: "Naive exponentiation ($M^e$) requires $e - 1$ multiplications; for a 2048-bit exponent $e \\approx 2^{2048}$, this would require $10^{616}$ operations (impossible). Square-and-Multiply breaks $e$ into its binary expansion ($e = \\sum b_i 2^i$). For a 2048-bit exponent, it performs at most 2048 squarings and ~1024 multiplications (at most ~3072 total operations), executing in under 2 milliseconds on standard microprocessors.",
    hint: "Think of repeatedly doubling your speed (Squaring) and taking a step forward (Multiplying) whenever you encounter a 1 in binary.",
    level: "moderate",
    codeExample: `// Square-and-Multiply Modular Exponentiation:
function mod_exp(base, exp, mod):
    result = 1
    base = base % mod
    while exp > 0:
        if exp % 2 == 1:       // If current bit is 1: Multiply!
            result = (result * base) % mod
        base = (base * base) % mod  // Always Square!
        exp = exp // 2
    return result`
  },
  {
    question: "What is 'Montgomery Multiplication', and why is it used in high-performance cryptographic hardware and HSMs for modular exponentiation?",
    shortAnswer: "It transforms numbers into the 'Montgomery domain' where modular reduction is performed using fast bitwise shifts and additions rather than expensive multi-precision integer divisions.",
    explanation: "Standard modular multiplication ($a \\cdot b \\bmod N$) requires dividing a 4096-bit product by 2048-bit $N$, which is computationally slow on CPUs. Peter Montgomery (1985) introduced a method: Numbers are converted into Montgomery representation $\\tilde{a} = a \\cdot R \\bmod N$ (where $R = 2^{2048}$). Multiplication in this domain $(\\tilde{a} \\cdot \\tilde{b} \\cdot R^{-1} \\bmod N)$ replaces hardware division with simple binary bit-shifts and additions modulo $R$, delivering a $3\\times$ hardware acceleration.",
    hint: "Think of shifting calculations into a special currency where currency exchange requires only moving decimal points.",
    level: "expert",
    codeExample: `// Montgomery Multiplication Concept:
Radix: R = 2^2048 (Power of 2, so modulo R is a simple bit-mask!)
Montgomery Form: a_bar = (a * R) mod N,  b_bar = (b * R) mod N
Montgomery Multiply: MontMul(a_bar, b_bar) = (a_bar * b_bar * R^(-1)) mod N
Hardware Cost: ZERO DIVISIONS → Replaced with fast 64-bit word additions and shifts!`
  },
  {
    question: "What is a 'Simple Power Analysis' (SPA) and 'Timing Attack' on naive Square-and-Multiply, and how does the 'Montgomery Ladder' achieve constant-time security?",
    shortAnswer: "Naive Square-and-Multiply executes multiplication ONLY when a key bit is 1, creating distinct CPU power spikes and timing leaks; the Montgomery Ladder executes exactly one squaring and one multiplication on EVERY bit regardless of whether it is 0 or 1.",
    explanation: "In naive Square-and-Multiply, bit 0 triggers only Squaring, while bit 1 triggers Squaring + Multiplication. By measuring the power consumption oscilloscope trace or microsecond execution time of an HSM or smart card, an attacker reads the secret private key $d$ directly (SPA attack). The Montgomery Ladder ensures regular, constant-time execution: For every bit $b_i$, it computes both $R_0 = R_0^2$ and $R_1 = R_0 \\cdot R_1$, eliminating all timing and power side channels.",
    hint: "Think of an engine that hums at an identical acoustic frequency whether it is driving forward or idling, revealing zero information to eavesdroppers.",
    level: "expert",
    codeExample: `// Constant-Time Montgomery Ladder:
R0 = 1; R1 = Base
for bit in binary_bits_of_d:
    if bit == 0:
        R1 = MontMul(R0, R1)
        R0 = MontMul(R0, R0)
    else:
        R0 = MontMul(R0, R1)
        R1 = MontMul(R1, R1)
// EXACTLY TWO MULTIPLICATIONS PER BIT ALWAYS → ZERO SPA POWER LEAKAGE!`
  },
  {
    question: "How does the 'Chinese Remainder Theorem' (CRT) split 2048-bit modular exponentiation into two independent 1024-bit operations to achieve a $4\\times$ speedup?",
    shortAnswer: "Instead of computing $M = C^d \\bmod N$ with 2048-bit math ($O(N^3)$), RSA-CRT computes $m_1 = C^{d_p} \\bmod p$ and $m_2 = C^{d_q} \\bmod q$ with 1024-bit math and recombines them in microseconds.",
    explanation: "Because modular multiplication complexity scales quadratically with bit length ($O(b^2)$), operations with 1024-bit numbers are $(2048/1024)^2 = 4\\times$ faster per operation and require half as many square-and-multiply steps, yielding an overall $8\\times$ theoretical and $\\approx 4\\times$ practical speedup. The decrypter stores pre-computed constants: $d_p = d \\bmod (p-1)$, $d_q = d \\bmod (q-1)$, and $q_{inv} = q^{-1} \\bmod p$. The plaintext is restored via Gauss-Garner recombination: $M = m_2 + q \\cdot ((m_1 - m_2) \\cdot q_{inv} \\bmod p)$.",
    hint: "Think of solving two small 100-piece jigsaw puzzles simultaneously rather than tackling one giant 1000-piece puzzle.",
    level: "expert",
    codeExample: `// RSA-CRT Garner's Recombination:
1. Compute: m1 = C^(d_p) mod p   (1024-bit math)
2. Compute: m2 = C^(d_q) mod q   (1024-bit math)
3. Garner Recombination:
   h = (q_inv * (m1 - m2)) mod p
   M = m2 + h * q
// Result: 4x Faster Decryption with zero loss of mathematical fidelity!`
  },
  {
    question: "What is the 'Bellcore Fault Injection Attack' (Boneh-DeMillo-Lipton, 1997) on RSA-CRT, and how does a single bit error during decryption reveal prime factor $p$?",
    shortAnswer: "If a hardware fault corrupts $m_1$ while $m_2$ is computed correctly, the faulty signature $S'$ satisfies $\\gcd(S'^e - M, N) = q$, instantly factoring modulus $N$ with a single GCD calculation.",
    explanation: "In RSA-CRT signing, suppose an attacker uses a laser or voltage glitch to induce a hardware error during the computation of $m_1 = M^{d_p} \\bmod p$, resulting in a faulty value $m_1'$, while $m_2 = M^{d_q} \\bmod q$ remains correct. The resulting signature $S'$ is correct modulo $q$ ($(S')^e \\equiv M \\pmod q$), but incorrect modulo $p$ ($(S')^e \\not\\equiv M \\pmod p$). Therefore, $(S')^e - M$ is a multiple of $q$ but not of $p$. The attacker simply computes $\\gcd((S')^e - M, N) = q$, factoring the 2048-bit modulus $N$ in 1 millisecond.",
    hint: "Think of an intentionally induced glitch that causes one side of a balance scale to drop, revealing the secret counterweight instantly.",
    level: "expert",
    codeExample: `// Bellcore Fault Attack on RSA-CRT:
Faulty Signature: S' (Computed with corrupted m1' mod p, but correct m2 mod q)
Attacker evaluates:
  Factor_q = gcd( (S')^e - M, N )
Result: gcd yields exact prime factor q in 0.001 ms → TOTAL SYSTEM COMPROMISE!
Defense: ALWAYS verify signature ( (S')^e mod N == M ) BEFORE transmitting!`
  },
  {
    question: "What is 'Cryptographic Blinding' in modular arithmetic, and how does it mathematically eliminate all timing and cache side-channel vulnerabilities?",
    shortAnswer: "Multiplying ciphertext $C$ by a secret random blinding factor $r^e \\bmod N$ before modular exponentiation, randomizing the intermediate mathematical values, and unblinding the result with $r^{-1} \\bmod N$ afterward.",
    explanation: "In RSA decryption, if an attacker knows the ciphertext $C$ being decrypted, they can correlate CPU cache hits and timing delays with the specific bits of $d$. With Blinding: 1. Generate random secret $r$ coprime to $N$; 2. Compute blinded ciphertext $C' = (C \\cdot r^e) \\bmod N$; 3. Decrypt: $M' = (C')^d = (C^d \\cdot (r^e)^d) = (M \\cdot r) \\bmod N$; 4. Unblind: $M = (M' \\cdot r^{-1}) \\bmod N$. Because $r$ is random for every operation, the CPU processes purely random numbers, completely destroying all timing correlation.",
    hint: "Think of adding temporary secret static noise to a voice recording and then subtracting that exact static after transmission.",
    level: "moderate",
    codeExample: `// RSA Modular Blinding Pipeline:
1. Pick random r in [2, N-1] with gcd(r, N) == 1
2. Blind:   C_blind = (C * (r^e mod N)) mod N
3. Decrypt: M_blind = (C_blind ^ d) mod N = (M * r) mod N
4. Unblind: M_plain = (M_blind * mod_inv(r, N)) mod N
// Result: 100% Timing Side-Channel Immunity!`
  },
  {
    question: "Under Section 65B of the Indian Evidence Act and IT Act 2000, why is constant-time modular arithmetic critical for the legal admissibility of electronic signatures?",
    shortAnswer: "Vulnerabilities to side-channel key extraction allow adversaries to claim their private keys were stolen without their knowledge, creating repudiation loopholes in commercial contract litigation.",
    explanation: "Under Indian commercial and contract law, digital signatures provide non-repudiation (the legal presumption that the key owner personally authorized the transaction). If an enterprise uses flawed, variable-time modular arithmetic libraries vulnerable to SPA or timing attacks, a rogue executive can argue in court that their private key was extracted by a side-channel exploit, undermining the legal integrity of the electronic contract under Section 65B. Deploying constant-time modular libraries guarantees non-repudiation.",
    hint: "Remember how mathematical side-channel security prevents repudiation claims in legal court proceedings.",
    level: "basic",
    codeExample: `// Legal Non-Repudiation Defense:
Flawed Library: Variable-time modular exponentiation → Key theft claimed in court → Legal dispute.
Hardened HSM:  Constant-time Montgomery Ladder + Blinding → Mathematically irrepudiable under IT Act Section 5!`
  },
  {
    question: "How does the 'Extended Euclidean Algorithm' handle negative Bezout coefficients when computing the private key $d$?",
    shortAnswer: "If the Extended Euclidean Algorithm returns a negative coefficient $x < 0$, we simply add the modulus: $d = (x \\bmod \\phi(N)) + \\phi(N) = x + \\phi(N)$ to ensure $d$ is a positive integer in $[1, \\phi(N)-1]$.",
    explanation: "Because Bezout's identity operates over the ring of all integers $\\mathbb{Z}$, the coefficient $x$ in $e \\cdot x + \\phi(N) \\cdot y = 1$ can be negative (e.g. $x = -15$). In modular arithmetic, $-15 \\pmod{3120} = 3120 - 15 = 3105$. Adding $\\phi(N)$ produces the canonical positive representative in the range $[1, \\phi(N)-1]$, which is the true positive private key $d$.",
    hint: "Think of turning a clock backward by 1 hour, which is identical to turning it forward by 11 hours.",
    level: "moderate",
    codeExample: `// Handling Negative Modular Inverses:
Raw EEA Output: x = -15, phi(N) = 3120
Correction:     d = (-15 + 3120) % 3120 = 3105
Verification:   (17 * 3105) mod 3120 = 52785 mod 3120 = 1 → CORRECT!`
  },
  {
    question: "What is 'Modular Reduction' by Barrett Reduction, and how does pre-computing $\\mu = \\lfloor 2^{2k} / N \\rfloor$ accelerate RSA signature verification?",
    shortAnswer: "Barrett reduction replaces division by $N$ with two standard multiplications and bit-shifts using pre-computed constant $\\mu$, optimizing modular reduction for fixed public modulus $N$.",
    explanation: "In RSA signature verification ($S^e \\bmod N$), the modulus $N$ remains fixed across millions of verifications. P. David Barrett (1986) showed that by pre-computing $\\mu = \\lfloor 4^k / N \\rfloor$ (where $k$ is the word size), computing $z \\bmod N$ can be estimated as $q = \\lfloor (z \\cdot \\mu) / 4^k \\rfloor$ and $r = z - q \\cdot N$. This eliminates all multi-precision divisions during public key verification, doubling verification speed on web servers.",
    hint: "Think of pre-calculating the reciprocal of a recurring divisor to turn heavy division into lightning-fast multiplication.",
    level: "expert",
    codeExample: `// Barrett Reduction Algorithm:
Precompute: mu = floor( 2^(2 * 2048) / N )
For each reduction of z:
  q = floor( (z * mu) / 2^4096 )  // Fast bit shift!
  r = z - q * N
  if r >= N: r = r - N
return r // ZERO CPU DIVISION INSTRUCTIONS!`
  },
  {
    question: "Why must the public encryption exponent $e$ satisfy $\\gcd(e, \\phi(N)) = 1$, and what catastrophic failure occurs if $e$ shares a common factor with $\\phi(N)$?",
    shortAnswer: "If $\\gcd(e, \\phi(N)) = g > 1$, no modular multiplicative inverse $d$ exists in $\\mathbb{Z}/\\phi(N)\\mathbb{Z}$; encryption becomes a many-to-one function, making unique plaintext decryption mathematically impossible.",
    explanation: "For an inverse to exist modulo $\\phi(N)$, $e$ must generate the entire multiplicative group $(\\mathbb{Z}/\\phi(N)\\mathbb{Z})^*$. If $\\gcd(e, \\phi(N)) = g > 1$, the function $f(M) = M^e \\bmod N$ is not a bijection (not a one-to-one permutation): multiple different plaintext messages $M_1 \\neq M_2$ map to the exact same ciphertext $C$. When the receiver attempts to decrypt, there are $g$ possible original messages, completely destroying the deterministic nature of encryption.",
    hint: "Think of an irreversible one-way trash compactor that mashes different letters into the exact same shape.",
    level: "expert",
    codeExample: `// Coprimality Failure Condition:
If gcd(e, phi(N)) != 1:
  EEA fails: Bezout identity e*x + phi(N)*y = g != 1
  Result: NO UNIQUE INVERSE d EXISTS → RSA Key Generation ABORTS!`
  },
  {
    question: "How do modern cryptographic libraries (OpenSSL, BoringSSL) prevent 'Cache-Timing Attacks' (e.g. Flush+Reload) during modular exponentiation?",
    shortAnswer: "By implementing constant-time table lookups using bitwise branchless masks rather than memory array indexing, preventing CPU L1/L3 cache access patterns from leaking secret key bits.",
    explanation: "In fixed-window modular exponentiation, pre-computed powers ($M^1, M^2, \\dots, M^{15} \\bmod N$) are stored in an array table. If the CPU accesses `table[d_i]`, the memory address is cached in CPU L1 cache. An attacker sharing the same physical CPU core runs Flush+Reload to measure which cache line was fetched, extracting private exponent $d$ in milliseconds. Modern constant-time libraries load EVERY element of the table into CPU registers on every access and select the correct power using bitwise conditional moves (`CMOV` / branchless masks), ensuring cache access patterns are 100% constant.",
    hint: "Think of inspecting every single box on a shelf every time you need an item so an onlooker cannot tell which box you actually opened.",
    level: "expert",
    codeExample: `// Constant-Time Branchless Table Lookup:
function constant_time_lookup(table, index):
    result = 0
    for i = 0 to 15:
        mask = -(i == index) // 0xFFFFFFFF if match, 0x00000000 otherwise
        result = result | (table[i] & mask)
    return result // ALL 16 ENTRIES ACCESSED EVERY TIME → ZERO CACHE LEAKS!`
  },
  {
    question: "Synthesizing Modular Arithmetic and Multiplicative Inverses in RSA: what is the master algorithmic sequence of RSA mathematical execution?",
    shortAnswer: "$$\\gcd(e, \\phi(N)) = 1 \\xrightarrow{\\text{EEA}} d = e^{-1} \\bmod \\phi(N) \\xrightarrow{\\text{Montgomery}} C = M^e \\bmod N \\xrightarrow{\\text{CRT + Blinding}} M = C^d \\bmod N$$",
    explanation: "This complete algorithmic sequence represents the mathematical lifecycle of RSA: 1. Public exponent selection verifies coprimality; 2. Extended Euclidean Algorithm calculates the secret private exponent $d$; 3. Montgomery square-and-multiply executes constant-time public encryption; 4. Chinese Remainder Theorem with cryptographic blinding executes $4\\times$ accelerated, side-channel immune private decryption. Mastering these components provides the complete blueprint of modern asymmetric public-key systems.",
    hint: "Conclude by recognizing how Extended Euclidean Inversion, Montgomery Exponentiation, and CRT unite into an invincible asymmetric engine.",
    level: "expert",
    codeExample: `// The Master Modular Sequence:
1. KeyGen:      d = Extended_Euclidean_Inverse( e, (p-1)*(q-1) )
2. Encryption:  C = Montgomery_Exp( M, e, N )
3. Decryption:  M = CRT_Garner_Recombination( Blinded_C, d_p, d_q, q_inv )`
  }
];

export default questions;
