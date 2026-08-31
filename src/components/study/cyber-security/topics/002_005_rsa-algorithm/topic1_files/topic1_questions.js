const questions = [
  {
    question: "What is 'Euler's Totient Function' (denoted $\\phi(N)$), and how is it defined mathematically for any positive integer $N$?",
    shortAnswer: "The function $\\phi(N)$ counts the number of positive integers in the range $[1, N-1]$ that are relatively prime (coprime) to $N$ (i.e. $\\gcd(a, N) = 1$).",
    explanation: "Introduced by Leonhard Euler in 1763, Euler's totient function $\\phi(N)$ measures the multiplicative capacity of modular arithmetic modulo $N$. For example, for $N = 10$, the numbers coprime to 10 are $\\{1, 3, 7, 9\\}$; therefore, $\\phi(10) = 4$. If $N$ is prime, every integer from $1$ to $N-1$ is coprime to $N$, so $\\phi(p) = p - 1$.",
    hint: "Think of counting how many numbers smaller than $N$ share zero common factors with $N$ other than 1.",
    level: "basic",
    codeExample: `// Euler's Totient Examples:
For Prime p = 7:       Coprimes = {1, 2, 3, 4, 5, 6} → phi(7) = 6 = (p - 1)
For Composite N = 10:  Coprimes = {1, 3, 7, 9}       → phi(10) = 4
For RSA Modulus N=p*q: phi(N) = (p - 1) * (q - 1)`
  },
  {
    question: "Why is $\\phi(N) = (p - 1)(q - 1)$ when $N = p \\cdot q$ is the product of two distinct prime numbers $p$ and $q$?",
    shortAnswer: "Because $\\phi(N)$ is a multiplicative function ($\\phi(p \\cdot q) = \\phi(p) \\cdot \\phi(q)$ when $\\gcd(p, q) = 1$); since $p$ and $q$ are prime, $\\phi(p) = p-1$ and $\\phi(q) = q-1$.",
    explanation: "Out of the $p \\cdot q$ total integers in $[1, pq]$: There are $q$ multiples of $p$ ($\\{p, 2p, \\dots, qp\\}$) and $p$ multiples of $q$ ($\\{q, 2q, \\dots, pq\\}$). The number $pq$ is counted in both sets. The number of integers sharing a factor with $N$ is $(q + p - 1)$. Therefore, $\\phi(N) = pq - (p + q - 1) = pq - p - q + 1 = (p - 1)(q - 1)$.",
    hint: "Recall the principle of inclusion-exclusion subtracting the multiples of $p$ and multiples of $q$.",
    level: "moderate",
    codeExample: `// Algebraic Proof of phi(p * q):
Total Integers in [1..pq] = pq
Multiples of p            = q
Multiples of q            = p
Common Multiple (pq)      = 1
Coprime Integers phi(N)   = pq - q - p + 1 = (p - 1) * (q - 1)`
  },
  {
    question: "What is 'Euler's Theorem' (Generalization of Fermat's Little Theorem), and why is it the foundational theorem of RSA decryption?",
    shortAnswer: "If $\\gcd(a, N) = 1$, then $a^{\\phi(N)} \\equiv 1 \\pmod N$; this guarantees that $(M^e)^d \\equiv M^{1 + k\\phi(N)} \\equiv M \\pmod N$.",
    explanation: "Euler's theorem states that raising any coprime integer $a$ to the power of $\\phi(N)$ modulo $N$ always yields $1$. In RSA, the private exponent $d$ is constructed so that $e \\cdot d \\equiv 1 \\pmod{\\phi(N)}$, meaning $e \\cdot d = 1 + k \\cdot \\phi(N)$. When decrypting: $C^d \\equiv (M^e)^d \\equiv M^{ed} \\equiv M^{1 + k\\phi(N)} \\equiv M \\cdot (M^{\\phi(N)})^k \\equiv M \\cdot (1)^k \\equiv M \\pmod N$.",
    hint: "Remember that raising to power $\\phi(N)$ modulo $N$ acts as a mathematical 'reset' to 1.",
    level: "moderate",
    codeExample: `// Euler's Theorem in RSA:
Theorem: a^(phi(N)) ≡ 1 (mod N)
In RSA:  e * d = 1 + k * phi(N)
Result:  (M^e)^d = M^(1 + k * phi(N)) = M * (M^(phi(N)))^k = M * (1)^k = M (mod N)`
  },
  {
    question: "What is the 'Carmichael Function' $\\lambda(N) = \\text{lcm}(p - 1, q - 1)$, and why does modern PKCS#1 v2.2 use $\\lambda(N)$ instead of Euler's $\\phi(N)$?",
    shortAnswer: "$\\lambda(N)$ is the smallest positive integer such that $a^{\\lambda(N)} \\equiv 1 \\pmod N$; using $\\lambda(N) = \\text{lcm}(p-1, q-1)$ yields a smaller valid private exponent $d$, speeding up computation.",
    explanation: "While $\\phi(N) = (p-1)(q-1)$ is universally known, Carmichael's totient $\\lambda(N) = \\text{lcm}(p-1, q-1) = \\frac{(p-1)(q-1)}{\\gcd(p-1, q-1)}$ is the true exponent of the multiplicative group $(\\mathbb{Z}/N\\mathbb{Z})^*$. Because $\\gcd(p-1, q-1)$ is always at least 2 for odd primes, $\\lambda(N)$ is at least half the size of $\\phi(N)$. Computing $d \\equiv e^{-1} \\pmod{\\lambda(N)}$ produces a smaller private exponent $d$ that satisfies RSA decryption identically.",
    hint: "Think of using the Least Common Multiple (LCM) instead of direct multiplication.",
    level: "expert",
    codeExample: `// Carmichael Totient lambda(N) vs Euler phi(N):
Primes: p = 61, q = 53
Euler:      phi(N) = (61 - 1) * (53 - 1) = 60 * 52 = 3,120
Carmichael: lambda(N) = lcm(60, 52) = (60 * 52) / gcd(60, 52) = 3120 / 4 = 780 (4x smaller!)`
  },
  {
    question: "Why is 'Fermat's Primality Test' flawed, and what is a 'Carmichael Number' (e.g. 561)?",
    shortAnswer: "Fermat's test checks if $a^{N-1} \\equiv 1 \\pmod N$; Carmichael numbers are composite numbers that satisfy Fermat's test for ALL coprime bases $a$, completely fooling the test.",
    explanation: "Fermat's Little Theorem states that if $N$ is prime, $a^{N-1} \\equiv 1 \\pmod N$. However, the converse is false. Carmichael numbers (such as $561 = 3 \\times 11 \\times 17$) are composite pseudo-primes: For every base $a$ where $\\gcd(a, 561) = 1$, $a^{560} \\equiv 1 \\pmod{561}$. Because there are infinitely many Carmichael numbers, naive Fermat testing is strictly insecure for generating cryptographic primes.",
    hint: "Think of a composite imposter number wearing an identical disguise that fools basic modular tests.",
    level: "expert",
    codeExample: `// Carmichael Number (561 = 3 * 11 * 17) Vulnerability:
Input N = 561 (COMPOSITE NUMBER!)
Base a = 2: 2^(560) mod 561 = 1
Base a = 3: gcd(3, 561) != 1
Base a = 5: 5^(560) mod 561 = 1
Fermat test falsely concludes: "561 is Prime" (DANGEROUS FALSE POSITIVE!)`
  },
  {
    question: "How does the 'Miller-Rabin Primality Test' (FIPS 186-5) work, and why does running $k = 64$ rounds make the probability of accepting a composite number $< 2^{-128}$?",
    shortAnswer: "It decomposes $N-1 = 2^s \\cdot d$ and checks for non-trivial square roots of 1 modulo $N$; each random round has error probability $\\le \\frac{1}{4}$, so $k=64$ rounds yields error $\\le 4^{-64} = 2^{-128}$.",
    explanation: "Miller-Rabin exploits the algebraic property that in a prime field, the only square roots of $1 \\pmod N$ are $+1$ and $-1$. It factors $N-1 = 2^s \\cdot d$. For random base $a$, it computes $x = a^d \\bmod N$. If $x=1$ or $x=N-1$, $N$ passes. Otherwise, it squares $x$ up to $s-1$ times. If $x$ becomes 1 without passing through $N-1$, $N$ is guaranteed composite. A composite number passes at most $\\frac{1}{4}$ of bases, making $k=64$ rounds mathematically infallible.",
    hint: "Think of checking multiple independent security checkpoints where each check has a 75% chance of catching a fake ID.",
    level: "expert",
    codeExample: `// Miller-Rabin Primality Algorithm:
Write N - 1 = 2^s * d (with d odd)
For round = 1 to 64:
    Pick random base a in [2, N - 2]
    x = (a^d) mod N
    if x == 1 or x == N - 1: continue
    for r = 1 to s - 1:
        x = (x^2) mod N
        if x == N - 1: break
    else: return "COMPOSITE" // Found non-trivial square root of 1!
return "PROBABLY PRIME" (Error Probability < 2^-128)`
  },
  {
    question: "What is the 'AKS Primality Test' (Agrawal-Kayal-Saxena, IIT Kanpur, 2002), and what historical milestone did it achieve in computational number theory?",
    shortAnswer: "The first deterministic, unconditionally polynomial-time, general primality proving algorithm ($O((\\log N)^6)$), proving that PRIMES is in computational class P without unproven hypotheses.",
    explanation: "Published in 2002 by Manindra Agrawal, Neeraj Kayal, and Nitin Saxena at the Indian Institute of Technology Kanpur (IIT Kanpur), the AKS algorithm answered a centuries-old problem. It evaluates polynomial congruences $(x - a)^N \\equiv (x^N - a) \\pmod{x^r - 1, N}$. Unlike Miller-Rabin which is probabilistic, AKS is 100% deterministic and runs in $O((\\log N)^6)$ time without relying on the unproven Generalized Riemann Hypothesis.",
    hint: "Remember the landmark algorithm invented by Indian computer scientists at IIT Kanpur.",
    level: "moderate",
    codeExample: `// AKS Primality Polynomial Congruence:
Condition: N is prime if and only if:
(X + a)^N ≡ X^N + a (mod X^r - 1, N)
for all integers a in [1, 2*sqrt(phi(r))*log(N)]`
  },
  {
    question: "Why must the two prime numbers $p$ and $q$ in RSA be 'Strong Primes' (where $p-1$ and $q-1$ have large prime factors)?",
    shortAnswer: "To prevent 'Pollard's $p-1$ Factoring Attack', which factors modulus $N$ in seconds if $p-1$ is $B$-powersmooth (has only small prime factors).",
    explanation: "If $p-1$ factors completely into small primes ($p-1 = 2^{a_1} 3^{a_2} 5^{a_3} \\dots$), John Pollard's $p-1$ algorithm computes $M = \\prod q_i^{\\lfloor \\log N / \\log q_i \\rfloor}$ and evaluates $\\gcd(a^M - 1, N)$. Because $p-1$ divides $M$, $a^M \\equiv 1 \\pmod p$, revealing prime factor $p = \\gcd(a^M - 1, N)$ instantly. To defeat this, cryptographers select 'Strong Primes' where $p-1 = 2 \\cdot p' + 1$ and $p'$ is itself a large prime (Sophie Germain prime).",
    hint: "Think of ensuring that the lock mechanism does not use gears whose tooth counts are all simple multiples of 2 and 3.",
    level: "expert",
    codeExample: `// Pollard's p-1 Factoring Attack:
If p - 1 = 2 * 3 * 3 * 5 * 7 (Smooth Number!):
Compute: M = 2 * 3 * 4 * ... * B
Evaluate: Factor p = gcd( 2^M - 1, N ) → Factorization extracted in milliseconds!
Defensive Rule: Enforce p = 2 * p' + 1 where p' is a huge 1023-bit prime!`
  },
  {
    question: "Why must $|p - q|$ (the difference between primes $p$ and $q$) be large (e.g. $|p - q| > 2^{1024 - 100}$)?",
    shortAnswer: "If $p$ and $q$ are close to each other ($p \\approx q \\approx \\sqrt{N}$), 'Fermat's Factorization Method' factors modulus $N$ in a few iterations by computing $N = x^2 - y^2$.",
    explanation: "Fermat's factorization observes that any odd integer $N$ can be written as the difference of two squares: $N = x^2 - y^2 = (x - y)(x + y)$ where $x = \\frac{p+q}{2}$ and $y = \\frac{q-p}{2}$. If $p$ and $q$ are close together, $x$ is only slightly larger than $\\sqrt{N}$. An attacker starts at $\\lceil \\sqrt{N} \\rceil$ and checks if $x^2 - N$ is a perfect square $y^2$. If $|p - q| < 2^{n/4}$, Fermat's method finds $p$ and $q$ in seconds.",
    hint: "Think of finding two numbers whose average is already known to be practically identical to $\\sqrt{N}$.",
    level: "expert",
    codeExample: `// Fermat's Factorization Method:
x = ceil( sqrt(N) )
while True:
    y2 = x^2 - N
    if is_perfect_square( y2 ):
        y = sqrt( y2 )
        p = x - y
        q = x + y
        return p, q  // FACTORED INSTANTLY!
    x = x + 1`
  },
  {
    question: "What is the 'General Number Field Sieve' (GNFS), and what is its asymptotic sub-exponential computational complexity for factoring an $n$-bit RSA modulus $N$?",
    shortAnswer: "GNFS is the fastest known classical factoring algorithm; its heuristic asymptotic complexity is $O\\left( \\exp\\left( \\left(\\sqrt[3]{\\frac{64}{9}} + o(1)\\right) (\\ln N)^{1/3} (\\ln \\ln N)^{2/3} \\right) \\right)$.",
    explanation: "Developed by John Pollard, Carl Pomerance, and Hendrik Lenstra, GNFS factors large integers by constructing algebraic number fields and finding smooth relations over polynomial rings. Because its complexity grows with $(\\ln N)^{1/3}$ (sub-exponential), factoring 512-bit and 768-bit numbers is feasible on distributed clusters. However, for 2048-bit $N$, GNFS requires $2^{112}$ operations ($>10^{33}$ operations), ensuring that 2048-bit RSA remains computationally secure on classical supercomputers.",
    hint: "Remember the sub-exponential algorithm that defines all classical RSA key length standards.",
    level: "expert",
    codeExample: `// GNFS Asymptotic Complexity:
L_N[ 1/3, c ] = exp( (c * ln(N))^(1/3) * (ln(ln(N)))^(2/3) )
For 512-bit N:  Operations ≈ 2^56 (Broken in 1999)
For 1024-bit N: Operations ≈ 2^80 (Broken in 2014)
For 2048-bit N: Operations ≈ 2^112 (Requires 100 Billion Years of Cloud Supercomputing!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000, why is mathematical primality validation inside FIPS 140-2 crypto-tokens legally mandated for Class-3 Digital Signature Certificates?",
    shortAnswer: "Generating weak or flawed primes (e.g. ROCA vulnerability / small prime factors) invalidates the mathematical non-repudiation of digital signatures under Section 5.",
    explanation: "If a cryptographic token generates flawed RSA keys (as occurred in the 2017 ROCA vulnerability CVE-2017-15361 where Infineon chips generated flawed primes), attackers can factor the modulus $N$ and forge the user's digital signature. Under Section 35 of the Indian IT Act 2000, Certifying Authorities must verify that hardware USB tokens implement FIPS 140-2 Level 2 validated PRNGs and Miller-Rabin primality testing, guaranteeing that digital signatures possess 100% legal admissibility in court.",
    hint: "Remember the statutory requirement in India ensuring that digital signature tokens generate cryptographically genuine primes.",
    level: "moderate",
    codeExample: `// ROCA Vulnerability (CVE-2017-15361) Flawed Prime Math:
Flawed Generator: Primes generated of form p = k * M + (65537^a mod M)
Impact: Attacker factors 2048-bit RSA in 17 days on AWS!
Remedy: FIPS 140-2 Level 2 Full-Entropy Miller-Rabin Keygen Mandate.`
  },
  {
    question: "What is 'Coppersmith's Partial Key Exposure Attack', and how many bits of private key $d$ or prime factor $p$ must be leaked before the entire RSA key is compromised?",
    shortAnswer: "Leaking only the lower or upper $\\frac{1}{4}$ of the bits of private exponent $d$ (or $\\frac{1}{2}$ of prime $p$) allows an attacker using LLL lattice reduction to recover the FULL 2048-bit private key in polynomial time.",
    explanation: "Don Coppersmith (1996) proved that RSA security is not all-or-nothing. If a side-channel attack or memory scraping flaw leaks the lower 512 bits of a 2048-bit private exponent $d$ (just 25% of the key), formulating the known bits as a polynomial $f(x) \\equiv 0 \\pmod p$ allows the Lenstra-Lenstra-Lovász (LLL) algorithm to find the remaining 1536 bits in seconds, resulting in total private key extraction.",
    hint: "Think of revealing just the first few digits of a combination safe, allowing a mathematical tool to solve the remaining dials automatically.",
    level: "expert",
    codeExample: `// Partial Key Exposure Theorem (Coppersmith):
Known: Lower 25% of bits of private key d (d0 = d mod 2^(n/4))
Action: Construct 2-dimensional lattice matrix from (e * d - 1)
Result: LLL Lattice Reduction extracts remaining 75% of private key in 0.4 seconds!`
  },
  {
    question: "What is the relationship between 'Euler's Totient Theorem' and 'Modular Multiplicative Inverses' calculated via the Extended Euclidean Algorithm?",
    shortAnswer: "Euler's theorem guarantees that $e$ has a unique modular inverse $d$ if $\\gcd(e, \\phi(N)) = 1$; the Extended Euclidean Algorithm computes integers $d$ and $k$ satisfying Bezout's identity: $e \\cdot d + \\phi(N) \\cdot k = 1$.",
    explanation: "In RSA key generation, we need an exponent $d$ such that $e \\cdot d \\equiv 1 \\pmod{\\phi(N)}$. Bezout's identity states that for coprimes $e$ and $\\phi(N)$, there exist integers $d$ and $k$ such that $e \\cdot d + \\phi(N) \\cdot k = \\gcd(e, \\phi(N)) = 1$. Rearranging modulo $\\phi(N)$ yields $e \\cdot d \\equiv 1 \\pmod{\\phi(N)}$. The Extended Euclidean Algorithm calculates $d$ in $O(\\log(\\phi(N)))$ division steps, completing key generation in microseconds.",
    hint: "Recall Bezout's identity and the Euclidean algorithm for computing greatest common divisors and modular inverses.",
    level: "moderate",
    codeExample: `// Extended Euclidean Algorithm for d = e^(-1) mod phi:
function modular_inverse(e, phi):
    t = 0; newt = 1;
    r = phi; newr = e;
    while newr != 0:
        quotient = r // newr;
        (t, newt) = (newt, t - quotient * newt);
        (r, newr) = (newr, r - quotient * newr);
    if t < 0: t = t + phi;
    return t; // Secret Decryption Key d!`
  },
  {
    question: "Why does multiplying primes in RSA create a 'One-Way' trapdoor, while in classical ciphers (Caesar/Vigenère), the operations are completely symmetric and reversible without trapdoors?",
    shortAnswer: "Classical ciphers use linear permutation/substitution where the decryption key is a trivial inverse operation (e.g. $-K$); RSA uses non-linear modular exponentiation over composite prime fields where inverting powers without $\\phi(N)$ requires solving the discrete log / factoring problem.",
    explanation: "In classical ciphers, knowing the encryption key $K$ instantly reveals the decryption key (e.g. shift $+3$ implies shift $-3$). In asymmetric RSA, knowing the public key $(e, N)$ does not reveal decryption key $d$, because computing $d$ requires knowing Euler's Totient $\\phi(N) = (p-1)(q-1)$. Finding $\\phi(N)$ from $N$ is mathematically equivalent to factoring $N$. Thus, the non-linear algebraic structure of $\\mathbb{Z}/N\\mathbb{Z}$ creates an authentic one-way trapdoor.",
    hint: "Think about why knowing the lock design does not give you the metal key in asymmetric mathematics.",
    level: "moderate",
    codeExample: `// Classical vs Asymmetric Reversibility:
Caesar Cipher:   Enc: (x + 3) mod 26 → Dec: (x - 3) mod 26 (Trivially Reversible!)
RSA Trapdoor:    Enc: (M^e) mod N     → Dec: (C^d) mod N   (Requires Secret phi(N) = (p-1)(q-1)!)`
  },
  {
    question: "Synthesizing Mathematical Foundations of RSA: what is the master equation that links prime factorization, Euler's totient, and public-key decryption?",
    shortAnswer: "$$M \\equiv (M^e)^d \\equiv M^{e \\cdot d} \\equiv M^{1 + k \\cdot (p-1)(q-1)} \\equiv M \\pmod{p \\cdot q}$$",
    explanation: "This single master equation unites the entire mathematical architecture of RSA: 1. Prime Factorization defines the composite modulus $N = p \\cdot q$; 2. Euler's Totient defines the group order $\\phi(N) = (p-1)(q-1)$; 3. Modular Multiplicative Inverse links public exponent $e$ and private exponent $d$ via $e \\cdot d = 1 + k \\cdot \\phi(N)$; 4. Euler's Theorem ensures that raising ciphertext to power $d$ restores plaintext $M$ with 100% mathematical fidelity.",
    hint: "Conclude by recognizing how the product of primes and Euler's totient guarantee flawless asymmetric message recovery.",
    level: "expert",
    codeExample: `// The Master RSA Mathematical Synthesis:
N = p * q
phi(N) = (p - 1) * (q - 1)
e * d ≡ 1 (mod phi(N))
C^d ≡ (M^e)^d ≡ M^(e*d) ≡ M^(1 + k*phi(N)) ≡ M (mod N)`
  }
];

export default questions;
