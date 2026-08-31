const questions = [
  {
    question: "Given primes $p = 61$ and $q = 53$, what is the public modulus $N$ and Euler's Totient $\\phi(N)$?",
    shortAnswer: "Modulus $N = 61 \\times 53 = 3233$; Euler's Totient $\\phi(N) = (61 - 1)(53 - 1) = 60 \\times 52 = 3120$.",
    explanation: "For the RSA cryptosystem with $p = 61$ and $q = 53$: 1. Public modulus $N = p \\cdot q = 61 \\times 53 = 3233$; 2. Euler's Totient $\\phi(N) = (p - 1)(q - 1) = (61 - 1)(53 - 1) = 60 \\times 52 = 3120$. All private key exponents $d$ must satisfy $e \\cdot d \\equiv 1 \\pmod{3120}$.",
    hint: "Multiply the two primes to get $N$, and multiply $(p-1)$ by $(q-1)$ to get $\\phi(N)$.",
    level: "basic",
    codeExample: `// Small Prime Calculation Step 1 & 2:
p = 61, q = 53
N = p * q = 61 * 53 = 3233
phi(N) = (p - 1) * (q - 1) = 60 * 52 = 3120`
  },
  {
    question: "For $p = 61, q = 53$, what is the Carmichael Totient $\\lambda(N)$, and why is it smaller than $\\phi(N)$?",
    shortAnswer: "$\\lambda(N) = \\text{lcm}(60, 52) = 780$; it is smaller because $\\gcd(60, 52) = 4$, so $\\lambda(N) = \\frac{3120}{4} = 780$.",
    explanation: "Carmichael's totient is defined as $\\lambda(N) = \\text{lcm}(p - 1, q - 1) = \\frac{(p - 1)(q - 1)}{\\gcd(p - 1, q - 1)}$. With $p-1=60$ and $q-1=52$, their greatest common divisor is $\\gcd(60, 52) = 4$. Therefore, $\\lambda(N) = \\frac{60 \\times 52}{4} = \\frac{3120}{4} = 780$. Using $\\lambda(N)$ produces a valid private exponent $d = 413$ that is much smaller than $d = 2753$.",
    hint: "Recall that $\\text{lcm}(a, b) = (a \\cdot b) / \\gcd(a, b)$.",
    level: "moderate",
    codeExample: `// Carmichael Totient lambda(N) vs Euler phi(N):
gcd(60, 52) = 4
lambda(N) = lcm(60, 52) = (60 * 52) / 4 = 3120 / 4 = 780`
  },
  {
    question: "Given $\\phi(N) = 3120$ and public exponent $e = 17$, how is the private decryption exponent $d$ calculated via the Extended Euclidean Algorithm?",
    shortAnswer: "The Extended Euclidean Algorithm solves $17 \\cdot d + 3120 \\cdot k = 1$; the Bezout solution is $17(2753) + 3120(-15) = 1$, giving $d = 2753$.",
    explanation: "We set up Euclidean division for $\\gcd(3120, 17)$: 1. $3120 = 183 \\times 17 + 9$; 2. $17 = 1 \\times 9 + 8$; 3. $9 = 1 \\times 8 + 1$; 4. $8 = 8 \\times 1 + 0$. Back-substituting Bezout coefficients: $1 = 9 - 8 = 9 - (17 - 9) = 2 \\times 9 - 17 = 2 \\times (3120 - 183 \\times 17) - 17 = 2 \\times 3120 - 367 \\times 17$. Modulo 3120: $-367 \\equiv 3120 - 367 = 2753$. Thus, $d = 2753$.",
    hint: "Follow the backward substitution of remainders in the Euclidean algorithm.",
    level: "moderate",
    codeExample: `// Extended Euclidean Inversion:
Equation: (17 * d) mod 3120 = 1
Bezout:   (17 * 2753) + (3120 * -15) = 1
Modulo 3120: 17 * 2753 = 46801 ≡ 1 (mod 3120) → Private Key d = 2753!`
  },
  {
    question: "Using public key $(e = 17, N = 3233)$, how is plaintext message $M = 65$ encrypted into ciphertext $C$?",
    shortAnswer: "$C \\equiv 65^{17} \\pmod{3233} = 2790$.",
    explanation: "We compute $C = 65^{17} \\bmod 3233$ using Square-and-Multiply ($17 = 10001_2$): 1. $65^2 = 4225 \\equiv 992 \\pmod{3233}$; 2. $65^4 \\equiv 992^2 = 984064 \\equiv 1374 \\pmod{3233}$; 3. $65^8 \\equiv 1374^2 = 1887876 \\equiv 3152 \\pmod{3233}$; 4. $65^{16} \\equiv 3152^2 = 9935104 \\equiv 1083 \\pmod{3233}$; 5. $65^{17} = 65^{16} \\times 65 \\equiv 1083 \\times 65 = 70395 \\equiv 2790 \\pmod{3233}$. Ciphertext $C = 2790$.",
    hint: "Recall binary exponentiation for $17 = 16 + 1$, squaring 4 times and multiplying by 65.",
    level: "moderate",
    codeExample: `// Encryption Calculation (M = 65, e = 17, N = 3233):
65^1  mod 3233 = 65
65^2  mod 3233 = 992
65^4  mod 3233 = 1374
65^8  mod 3233 = 3152
65^16 mod 3233 = 1083
65^17 mod 3233 = (1083 * 65) mod 3233 = 70395 mod 3233 = 2790 → Ciphertext C = 2790!`
  },
  {
    question: "Using private key $(d = 2753, N = 3233)$, how is ciphertext $C = 2790$ decrypted back to plaintext $M$?",
    shortAnswer: "$M \\equiv 2790^{2753} \\pmod{3233} = 65$.",
    explanation: "We evaluate $M = 2790^{2753} \\bmod 3233$. Using the binary expansion of $2753 = 101011000001_2$ (requiring 11 squarings and 5 multiplications), modular exponentiation computes $M = 65$. Alternatively, using Carmichael's smaller exponent $d = 413 = 110011101_2$, $2790^{413} \\bmod 3233 = 65$, restoring the exact original ASCII character 'A'.",
    hint: "Remember that raising ciphertext to power $d$ modulo $N$ restores the original plaintext number.",
    level: "moderate",
    codeExample: `// Decryption Calculation (C = 2790, d = 2753, N = 3233):
Plaintext M = (2790 ^ 2753) mod 3233 = 65 (ASCII 'A')
Verification: M == 65 → 100% RECOVERY SUCCESS!`
  },
  {
    question: "For $p = 61, q = 53, d = 2753$, what are the Chinese Remainder Theorem (RSA-CRT) pre-computed constants $d_p, d_q$, and $q_{inv}$?",
    shortAnswer: "$d_p = 2753 \\bmod 60 = 17$; $d_q = 2753 \\bmod 52 = 25$; $q_{inv} = 53^{-1} \\bmod 61 = 38$.",
    explanation: "In RSA-CRT: 1. $d_p = d \\bmod (p - 1) = 2753 \\bmod 60 = 17$; 2. $d_q = d \\bmod (q - 1) = 2753 \\bmod 52 = 25$; 3. $q_{inv} = q^{-1} \\bmod p = 53^{-1} \\bmod 61$. Since $53 \\times 38 = 2014 \\equiv 1 \\pmod{61}$, $q_{inv} = 38$.",
    hint: "Compute $d$ modulo $(p-1)$, $d$ modulo $(q-1)$, and find the inverse of $q$ modulo $p$.",
    level: "expert",
    codeExample: `// CRT Pre-computed Parameters:
d_p   = 2753 % 60 = 17
d_q   = 2753 % 52 = 25
q_inv = mod_inverse(53, 61) = 38 (Check: 53 * 38 = 2014 = 33 * 61 + 1 ≡ 1 mod 61)`
  },
  {
    question: "Step through the RSA-CRT Gauss-Garner decryption for ciphertext $C = 2790$ using the parameters $d_p = 17, d_q = 25, q_{inv} = 38, p = 61, q = 53$.",
    shortAnswer: "$m_1 = 2790^{17} \\bmod 61 = 4$; $m_2 = 2790^{25} \\bmod 53 = 12$; $h = (38(4 - 12)) \\bmod 61 = 1$; $M = 12 + 1 \\times 53 = 65$.",
    explanation: "1. Modulo $p$: $C \\bmod 61 = 2790 \\bmod 61 = 45$. $m_1 = 45^{17} \\bmod 61 = 4$; 2. Modulo $q$: $C \\bmod 53 = 2790 \\bmod 53 = 34$. $m_2 = 34^{25} \\bmod 53 = 12$; 3. Garner's formula: $h = (q_{inv} \\times (m_1 - m_2)) \\bmod p = (38 \\times (4 - 12)) \\bmod 61 = (38 \\times -8) \\bmod 61 = -304 \\bmod 61 = 1$; 4. Recombination: $M = m_2 + h \\times q = 12 + 1 \\times 53 = 65$. Computed with tiny 2-digit numbers instead of 4-digit numbers!",
    hint: "Follow the Garner steps: compute $m_1$ and $m_2$, find $h$, and compute $M = m_2 + h \\cdot q$.",
    level: "expert",
    codeExample: `// Step-by-Step Garner CRT Recombination:
1. m1 = (2790 % 61)^17 mod 61 = 45^17 mod 61 = 4
2. m2 = (2790 % 53)^25 mod 53 = 34^25 mod 53 = 12
3. h  = (38 * (4 - 12)) mod 61 = -304 mod 61 = 1
4. M  = 12 + (1 * 53) = 65 (Plaintext Restored 4x Faster!)`
  },
  {
    question: "Given a second small prime example with $p = 11, q = 13, e = 7$, what is $N, \\phi(N)$, and private key $d$?",
    shortAnswer: "$N = 11 \\times 13 = 143$; $\\phi(N) = 10 \\times 12 = 120$; private exponent $d = 103$ (since $7 \\times 103 = 721 \\equiv 1 \\pmod{120}$).",
    explanation: "1. Modulus $N = 11 \\times 13 = 143$; 2. Totient $\\phi(N) = (11 - 1)(13 - 1) = 10 \\times 12 = 120$; 3. To find $d$: $7 \\cdot d \\equiv 1 \\pmod{120}$. By Extended Euclidean Algorithm: $7 \\times 103 = 721 = 6 \\times 120 + 1$. Thus, $d = 103$.",
    hint: "Multiply 11 by 13 to get 143, and solve $7 d \\equiv 1 \\pmod{120}$.",
    level: "basic",
    codeExample: `// Example 2 (p = 11, q = 13, e = 7):
N = 11 * 13 = 143
phi(N) = 10 * 12 = 120
e = 7
d = 103 (Check: 7 * 103 = 721 = 6 * 120 + 1 ≡ 1 mod 120)`
  },
  {
    question: "For $N = 143, e = 7, d = 103$, encrypt message $M = 9$ and decrypt the resulting ciphertext $C$.",
    shortAnswer: "Encryption: $C = 9^7 \\bmod 143 = 48$; Decryption: $M = 48^{103} \\bmod 143 = 9$.",
    explanation: "1. Encryption: $C = 9^7 \\bmod 143$. $9^2 = 81$, $9^4 = 81^2 = 6561 \\equiv 126 \\pmod{143}$. $9^7 = 9^4 \\times 9^2 \\times 9 \\equiv 126 \\times 81 \\times 9 = 91854 \\equiv 48 \\pmod{143}$. Ciphertext $C = 48$; 2. Decryption: $M = 48^{103} \\bmod 143$. Using binary exponentiation: $48^{103} \\bmod 143 = 9$. Plaintext restored successfully.",
    hint: "Compute $9^7 \\bmod 143$ for ciphertext and $48^{103} \\bmod 143$ for plaintext.",
    level: "moderate",
    codeExample: `// Example 2 Encryption & Decryption:
Encrypt: C = (9 ^ 7) mod 143 = 4782969 mod 143 = 48
Decrypt: M = (48 ^ 103) mod 143 = 9`
  },
  {
    question: "Given a third small prime example with $p = 7, q = 19, e = 5$, what is $N, \\phi(N)$, and private key $d$?",
    shortAnswer: "$N = 7 \\times 19 = 133$; $\\phi(N) = 6 \\times 18 = 108$; private exponent $d = 65$ (since $5 \\times 65 = 325 = 3 \\times 108 + 1 \\equiv 1 \\pmod{108}$).",
    explanation: "1. Modulus $N = 7 \\times 19 = 133$; 2. Totient $\\phi(N) = (7 - 1)(19 - 1) = 6 \\times 18 = 108$; 3. To find $d$: $5 \\cdot d \\equiv 1 \\pmod{108}$. By Extended Euclidean Algorithm: $5 \\times 65 = 325 = 3 \\times 108 + 1$. Thus, $d = 65$.",
    hint: "Multiply 7 by 19 to get 133, and solve $5 d \\equiv 1 \\pmod{108}$.",
    level: "basic",
    codeExample: `// Example 3 (p = 7, q = 19, e = 5):
N = 7 * 19 = 133
phi(N) = 6 * 18 = 108
e = 5
d = 65 (Check: 5 * 65 = 325 = 3 * 108 + 1 ≡ 1 mod 108)`
  },
  {
    question: "For $N = 133, e = 5, d = 65$, encrypt message $M = 6$ and decrypt the resulting ciphertext $C$.",
    shortAnswer: "Encryption: $C = 6^5 \\bmod 133 = 62$; Decryption: $M = 62^{65} \\bmod 133 = 6$.",
    explanation: "1. Encryption: $C = 6^5 \\bmod 133 = 7776 \\bmod 133 = 62$. Ciphertext $C = 62$; 2. Decryption: $M = 62^{65} \\bmod 133$. Using square-and-multiply ($65 = 1000001_2$): $M = 6$. Plaintext recovered with zero error.",
    hint: "Compute $6^5 \\bmod 133$ for ciphertext and $62^{65} \\bmod 133$ for plaintext.",
    level: "moderate",
    codeExample: `// Example 3 Encryption & Decryption:
Encrypt: C = (6 ^ 5) mod 133 = 7776 mod 133 = 62
Decrypt: M = (62 ^ 65) mod 133 = 6`
  },
  {
    question: "Why are small prime hands-on calculations vital for computer science university examinations (e.g. West Bengal BCA/B.Tech syllabus BCAC703)?",
    shortAnswer: "They allow students to trace the entire asymmetric key generation, Extended Euclidean inversion, and modular exponentiation pipeline by hand using standard scientific calculators without 2048-bit multi-precision libraries.",
    explanation: "In university examinations (MAKAUT / Calcutta University / West Bengal State University), students are asked to calculate $N$, $\\phi(N)$, $d$ via the Extended Euclidean Algorithm, and encrypt/decrypt small integers using step-by-step tableau methods. Practicing with small primes ($p=61, q=53$ or $p=11, q=13$) cements the algebraic mechanics of Euler's totient theorem, Bezout coefficients, and Square-and-Multiply.",
    hint: "Remember how hand calculations build the foundational mental model required for software engineering.",
    level: "basic",
    codeExample: `// Exam Strategy for RSA Questions:
1. Write down: N = p * q
2. Write down: phi(N) = (p - 1) * (q - 1)
3. Set up EEA Table: Find d such that e * d ≡ 1 mod phi(N)
4. Show Square-and-Multiply powers for C = M^e mod N
5. Show Decryption: M = C^d mod N`
  },
  {
    question: "What is the danger of assuming a small prime calculation represents production security?",
    shortAnswer: "Small prime moduli (e.g. $N = 3233$) can be factored in microseconds by trial division; production systems require 2048-bit to 4096-bit moduli to withstand the General Number Field Sieve (GNFS).",
    explanation: "Small prime numbers ($p=61, q=53$) are purely pedagogical tools to illustrate modular arithmetic. In production, an attacker factoring $N = 3233$ tests primes starting from 2 and finds $p = 61$ in 0.0001 ms, immediately deriving private key $d = 2753$. Production RSA requires 2048-bit numbers (617 decimal digits) where trial division requires $2^{1024}$ operations and GNFS requires $2^{112}$ operations.",
    hint: "Contrast academic classroom examples with 617-digit commercial RSA keys.",
    level: "basic",
    codeExample: `// Pedagogical vs Production Scale:
Classroom:  p = 61, q = 53     → N = 3233 (12 bits)  → Factored in 0.0001 ms!
Production: p, q = 1024-bit     → N = 2048 bits (617 digits) → Secure for 100 Billion Years!`
  },
  {
    question: "Synthesizing Hands-on RSA Calculation: what is the master numerical summary of the canonical $p=61, q=53$ RSA cryptosystem?",
    shortAnswer: "$$p=61, q=53 \\implies N=3233, \\phi(N)=3120, e=17, d=2753 \\implies \\text{Enc}(65) = 2790 \\implies \\text{Dec}(2790) = 65$$",
    explanation: "This complete numerical lifecycle summarizes the classic small-prime RSA system: 1. Modulus: $N = 3233$; 2. Group Order: $\\phi(N) = 3120$; 3. Public Key: $(17, 3233)$; 4. Private Key: $(2753, 3233)$; 5. Encryption: $65^{17} \\bmod 3233 = 2790$; 6. Decryption: $2790^{2753} \\bmod 3233 = 65$; 7. CRT Decryption: $M = 12 + 1(53) = 65$. Mastering this numerical walkthrough guarantees 100% conceptual mastery of RSA.",
    hint: "Conclude by reviewing the complete 7-parameter numerical summary of the $p=61, q=53$ RSA system.",
    level: "expert",
    codeExample: `// The Master Small-Prime RSA Summary:
Parameters: (p=61, q=53, N=3233, phi=3120, e=17, d=2753)
Operations: C = 65^17 mod 3233 = 2790  |  M = 2790^2753 mod 3233 = 65`
  }
];

export default questions;
