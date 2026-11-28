const fs = require('fs');
const path = require('path');

const baseDir = 'src/components/study/cyber-security/topics';

function appendQuestions(relPath, newQuestions) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File does not exist: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  
  const lastBracketIndex = content.lastIndexOf('];');
  if (lastBracketIndex === -1) {
    console.error(`Cannot find closing bracket in ${fullPath}`);
    return;
  }

  const beforeBracket = content.slice(0, lastBracketIndex).trimEnd();
  const formattedNew = newQuestions.map(q => {
    return `  {\n    question: ${JSON.stringify(q.question)},\n    shortAnswer: ${JSON.stringify(q.shortAnswer)},\n    explanation: ${JSON.stringify(q.explanation)},\n    hint: ${JSON.stringify(q.hint || '')},\n    level: ${JSON.stringify(q.level || 'moderate')},\n    codeExample: ${JSON.stringify(q.codeExample || '')}\n  }`;
  }).join(',\n');

  let updatedBody = beforeBracket;
  if (!updatedBody.endsWith(',')) {
    updatedBody += ',';
  }
  updatedBody += '\n' + formattedNew + '\n];\n\nexport default questions;\n';

  fs.writeFileSync(fullPath, updatedBody, 'utf8');
  console.log(`Updated ${relPath} (+${newQuestions.length} questions)`);
}

const mod2_005_remaining = {
  '002_005_rsa-algorithm/topic3_files/topic3_questions.js': [
    {
      question: "What are the 5 sequential mathematical steps to generate an RSA key pair?",
      shortAnswer: "1. Select two large primes p, q; 2. Calculate n = p × q; 3. Calculate φ(n) = (p-1)(q-1); 4. Choose public exponent e coprime to φ(n); 5. Calculate private exponent d = e^(-1) mod φ(n).",
      explanation: "Following these 5 deterministic steps establishes public key (e, n) and private key (d, n).",
      hint: "Choose p, q -> compute n -> compute phi -> choose e -> compute d.",
      level: "basic",
      codeExample: "p, q = gen_primes(); n = p * q; phi = (p - 1) * (q - 1); e = 65537; d = pow(e, -1, phi)"
    },
    {
      question: "Why should p and q be of approximately equal bit length?",
      shortAnswer: "To prevent elliptic curve factorization (ECM) or trial division from discovering a disproportionately small prime factor.",
      explanation: "If n is 2048 bits, p and q should each be approximately 1024 bits long.",
      hint: "Equal bit length prevents ECM from rapidly finding a small prime factor.",
      level: "moderate",
      codeExample: "assert len(bin(p)) == 1026 and len(bin(q)) == 1026 # 1024-bit primes"
    },
    {
      question: "What is Carmichael's totient function λ(n) and why is it preferred over Euler's φ(n) in modern PKCS#1?",
      shortAnswer: "λ(n) = lcm(p - 1, q - 1); it is the smallest exponent such that a^λ(n) ≡ 1 mod n, producing a smaller, more computationally efficient private key d.",
      explanation: "PKCS#1 v2.2 standardizes calculating d = e^(-1) mod λ(n) rather than mod φ(n).",
      hint: "lcm(p-1, q-1) produces a smaller, more efficient private exponent d.",
      level: "advanced",
      codeExample: "lambda_n = math.lcm(p - 1, q - 1); d = pow(e, -1, lambda_n)"
    },
    {
      question: "What entropy sources are required when generating RSA primes in Linux and Windows?",
      shortAnswer: "Cryptographically Secure Pseudorandom Number Generators (CSPRNG): `/dev/urandom` / `getrandom()` in Linux, and `BCryptGenRandom` (CryptoAPI) in Windows.",
      explanation: "Using weak random number generators (`rand()`) causes duplicate or predictable primes, allowing attackers to factor public keys globally.",
      hint: "CSPRNG like /dev/urandom or BCryptGenRandom.",
      level: "moderate",
      codeExample: "seed = os.urandom(32) # Linux CSPRNG interface"
    },
    {
      question: "What happened in the 2012 'Ron was wrong, Whit is right' large-scale RSA vulnerability study?",
      shortAnswer: "Researchers scanned public keys on the Internet and found that tens of thousands of IoT devices and routers generated identical primes (p) due to poor boot-time entropy.",
      explanation: "By computing gcd(n1, n2) across public keys, researchers instantly factored tens of thousands of RSA private keys without any brute-forcing.",
      hint: "Shared prime factor p between weak keys allowed factoring via simple GCD.",
      level: "advanced",
      codeExample: "shared_p = math.gcd(key1.n, key2.n); if shared_p > 1: p = shared_p; q = key1.n // p"
    },
    {
      question: "Why must the prime values p and q be securely erased (zeroized) from RAM after key generation?",
      shortAnswer: "To prevent memory scrapers, cold boot attacks, or core dump inspections from recovering p and q from unallocated RAM pages.",
      explanation: "Cryptographic libraries (like OpenSSL) use `OPENSSL_cleanse()` to overwrite prime buffers with zeros immediately after deriving d.",
      hint: "Zeroizing RAM buffers prevents memory dumps from exposing primes p and q.",
      level: "moderate",
      codeExample: "OPENSSL_cleanse(p_buffer, sizeof(p_buffer)); OPENSSL_cleanse(q_buffer, sizeof(q_buffer));"
    },
    {
      question: "What is Wiener's Attack on RSA and how does it exploit small private exponents (d)?",
      shortAnswer: "If d < (1/3) · n^(1/4), continued fraction expansion of e/n reveals d efficiently in polynomial time.",
      explanation: "To prevent Wiener's attack, private exponent d must always be sufficiently large (d >= n^(1/4)).",
      hint: "Continued fractions break RSA if private exponent d is too small.",
      level: "advanced",
      codeExample: "if d < (1/3) * (n ** 0.25): raise CryptographicVulnerability('Wiener vulnerable!')"
    },
    {
      question: "What is Boneh-Durfee's improvement over Wiener's attack?",
      shortAnswer: "Using Coppersmith's lattice reduction method (LLL algorithm), it breaks private keys where d < n^0.292.",
      explanation: "Establishes that small private exponents are categorically unsafe under lattice cryptanalysis.",
      hint: "Lattice reduction breaking RSA for d < n^0.292.",
      level: "advanced",
      codeExample: "BonehDurfeeBound = n ** 0.292"
    },
    {
      question: "Why is public exponent e = 3 rarely used in modern deployments?",
      shortAnswer: "Small e = 3 is vulnerable to Coppersmith's attack, Hastad's Broadcast Attack (when same message is sent to 3 recipients), and cube-root attacks on small unpadded messages.",
      explanation: "If m^3 < n, the ciphertext c = m^3 mod n is identical to regular arithmetic m^3, allowing an attacker to decrypt by taking the standard cube root: m = c^(1/3).",
      hint: "Cube root attack and Hastad's broadcast attack break e=3.",
      level: "moderate",
      codeExample: "if m**3 < n: plaintext = round(c ** (1/3)) # Direct cube root decryption"
    },
    {
      question: "What are the components stored in an OpenSSL RSA Private Key file (PKCS#1 / PKCS#8)?",
      shortAnswer: "Modulus n, Public Exponent e, Private Exponent d, Prime 1 p, Prime 2 q, Exponent 1 (d mod (p-1)), Exponent 2 (d mod (q-1)), and Coefficient (q^(-1) mod p).",
      explanation: "Stores CRT precomputations to allow instantaneous private key operations.",
      hint: "n, e, d, p, q, and CRT acceleration components.",
      level: "moderate",
      codeExample: "openssl rsa -in private.key -text -noout"
    },
    {
      question: "How does a Key Ceremony ensure the authenticity of Root Certificate Authority RSA keys?",
      shortAnswer: "A strictly audited, physically secure, video-recorded event where multiple cryptographic officers assemble in a Faraday cage vault to generate and sign root keys inside an HSM.",
      explanation: "Enforces M-of-N dual control (e.g. 3 of 5 keyholders required) to prevent unilateral rogue certificate issuance.",
      hint: "Audited physical event using M-of-N quorum to generate root CA keys in an HSM.",
      level: "moderate",
      codeExample: "Quorum = '3 of 5 physical smartcards required to activate Root HSM'"
    }
  ],

  '002_005_rsa-algorithm/topic4_files/topic4_questions.js': [
    {
      question: "What is the mathematical formula for RSA Encryption?",
      shortAnswer: "c = (m^e) mod n, where m is the plaintext integer (0 <= m < n), e is public exponent, and n is modulus.",
      explanation: "Computes the remainder of message m raised to public power e divided by modulus n.",
      hint: "c = m^e mod n.",
      level: "basic",
      codeExample: "c = pow(m, e, n)"
    },
    {
      question: "What is the mathematical formula for RSA Decryption?",
      shortAnswer: "m = (c^d) mod n, where c is ciphertext, d is private exponent, and n is modulus.",
      explanation: "Computes the remainder of ciphertext c raised to private power d divided by modulus n, recovering original plaintext m.",
      hint: "m = c^d mod n.",
      level: "basic",
      codeExample: "m = pow(c, d, n)"
    },
    {
      question: "Why is 'Textbook RSA' (raw RSA without padding) fundamentally insecure?",
      shortAnswer: "Textbook RSA is deterministic (same plaintext always produces same ciphertext), allowing dictionary attacks; it is also completely vulnerable to multiplicative homomorphic manipulation.",
      explanation: "Because Enc(m1) × Enc(m2) ≡ Enc(m1 × m2) mod n, an attacker can forge valid ciphertexts without knowing the private key.",
      hint: "Deterministic output and multiplicative homomorphic vulnerability.",
      level: "moderate",
      codeExample: "(pow(m1, e, n) * pow(m2, e, n)) % n == pow(m1 * m2, e, n)"
    },
    {
      question: "What is OAEP (Optimal Asymmetric Encryption Padding) and why is it mandatory in modern RSA?",
      shortAnswer: "A randomized Feistel padding scheme (PKCS#1 v2.1) that injects cryptographic randomness and hashing before exponentiation, achieving IND-CCA2 security.",
      explanation: "OAEP ensures that encrypting identical plaintexts produces completely randomized ciphertexts, mathematically defeating chosen-ciphertext and homomorphic attacks.",
      hint: "Randomized Feistel padding scheme preventing chosen-ciphertext attacks.",
      level: "advanced",
      codeExample: "from Crypto.Cipher import PKCS1_OAEP\ncipher = PKCS1_OAEP.new(recipient_key)"
    },
    {
      question: "What is the Bleichenbacher Padding Oracle Attack on PKCS#1 v1.5?",
      shortAnswer: "An adaptive chosen-ciphertext attack where an attacker sends modified ciphertexts and observes whether the server returns a 'padding error', decrypting ciphertexts in ~million queries.",
      explanation: "Known as the Million Message Attack, it exploited distinct error messages to deduce plaintext byte-by-byte.",
      hint: "Padding oracle attack exploiting server error responses on PKCS#1 v1.5.",
      level: "advanced",
      codeExample: "// Bleichenbacher response oracle:\nif decrypt(c).startswith(b'\\x00\\x02'): return 'OK' else return 'Error'"
    },
    {
      question: "What is the mathematical relation between RSA Signing and RSA Decryption?",
      shortAnswer: "They use identical mathematics: Signature s = (h(m)^d) mod n; verification calculates (s^e) mod n and compares it to h(m).",
      explanation: "Decryption and signing both apply the private exponent d; encryption and verification both apply public exponent e.",
      hint: "Signing is mathematically identical to private key modular exponentiation.",
      level: "moderate",
      codeExample: "s = pow(hash_int, d, n); verified = (pow(s, e, n) == hash_int)"
    },
    {
      question: "What is PSS (Probabilistic Signature Scheme) in PKCS#1 v2.1?",
      shortAnswer: "A modern, provably secure digital signature padding scheme that incorporates a random salt, ensuring that signing the same message twice produces distinct digital signatures.",
      explanation: "RSA-PSS is standardized in TLS 1.3 to replace older deterministic PKCS#1 v1.5 signatures.",
      hint: "Randomized salt-based signature scheme standardized in TLS 1.3.",
      level: "advanced",
      codeExample: "from Crypto.Signature import pss\nsignature = pss.new(key).sign(hash_obj)"
    },
    {
      question: "How does binary Square-and-Multiply execute modular exponentiation efficiently?",
      shortAnswer: "It inspects the binary bits of exponent e from left to right: it squares the accumulator for every bit, and multiplies by base m only when the bit is '1'.",
      explanation: "Reduces multiplication count from e operations to at most 2 × log2(e) operations (e.g. only ~3000 operations for a 2048-bit key).",
      hint: "Squares at each bit; multiplies only when the exponent bit is 1.",
      level: "moderate",
      codeExample: "res = 1\nfor bit in bin(e)[2:]:\n    res = (res * res) % n\n    if bit == '1': res = (res * m) % n"
    },
    {
      question: "What is a Timing Attack on RSA and how do cryptographic libraries mitigate it?",
      shortAnswer: "An attacker measures subtle microsecond variations in modular exponentiation time to deduce private key bits; mitigated by Cryptographic Blinding.",
      explanation: "Blinding multiplies the ciphertext by a random value r^e before decryption and unblinds afterwards, randomizing computation time.",
      hint: "Measuring execution time to extract private bits; mitigated by blinding.",
      level: "advanced",
      codeExample: "Blinded_c = (c * pow(r, e, n)) % n; m = (pow(Blinded_c, d, n) * pow(r, -1, n)) % n"
    },
    {
      question: "What maximum plaintext size can be encrypted using RSA-2048 with OAEP (SHA-256)?",
      shortAnswer: "190 bytes (Modulus size 256 bytes - 2 × 32 bytes hash - 2 bytes framing = 190 bytes).",
      explanation: "Because RSA modulus is 2048 bits (256 bytes), OAEP overhead consumes 66 bytes, leaving 190 bytes maximum for plaintext payload.",
      hint: "256 bytes minus 66 bytes of OAEP overhead leaves 190 bytes.",
      level: "moderate",
      codeExample: "MaxPlaintext = 256 - 2 * 32 - 2 # 190 bytes"
    },
    {
      question: "How does an attacker exploit the Common Modulus vulnerability in RSA?",
      shortAnswer: "If the same message m is encrypted with two coprime public exponents (e1, e2) under the same modulus n, an attacker computes Bézout coefficients (a, b) to recover m without private keys.",
      explanation: "Using Extended Euclidean algorithm: a·e1 + b·e2 = 1. Then (c1^a · c2^b) mod n ≡ m^(a·e1 + b·e2) ≡ m^1 ≡ m mod n.",
      hint: "Same message encrypted with two different public exponents under the same modulus.",
      level: "advanced",
      codeExample: "m = (pow(c1, a, n) * pow(c2, b, n)) % n # Recover plaintext via common modulus"
    }
  ],

  '002_005_rsa-algorithm/topic5_files/topic5_questions.js': [
    {
      question: "Walk through RSA key generation with small primes p = 3 and q = 11.",
      shortAnswer: "1. n = 3 × 11 = 33; 2. φ(n) = (3-1)(11-1) = 20; 3. Choose e = 3 (gcd(3, 20) = 1); 4. Compute d = 3^(-1) mod 20 = 7 (since 3 × 7 = 21 ≡ 1 mod 20).",
      explanation: "Public Key: (e=3, n=33); Private Key: (d=7, n=33).",
      hint: "p=3, q=11 -> n=33, phi=20, choose e=3 -> d=7.",
      level: "basic",
      codeExample: "p = 3; q = 11; n = 33; phi = 20; e = 3; d = 7"
    },
    {
      question: "Using the keypair from the previous question (e=3, d=7, n=33), encrypt plaintext m = 4.",
      shortAnswer: "c = (4^3) mod 33 = 64 mod 33 = 31.",
      explanation: "64 divided by 33 equals 1 with a remainder of 31. Ciphertext is 31.",
      hint: "4^3 = 64; 64 mod 33 = 31.",
      level: "basic",
      codeExample: "c = (4 ** 3) % 33 # Result: 31"
    },
    {
      question: "Decrypt ciphertext c = 31 using private key d = 7 and n = 33.",
      shortAnswer: "m = (31^7) mod 33 = 4 (recovering original plaintext).",
      explanation: "31 ≡ -2 mod 33. (-2)^7 = -128. -128 mod 33 = 4 (since 33 × (-4) = -132, -128 - (-132) = 4).",
      hint: "31^7 mod 33 = 4.",
      level: "basic",
      codeExample: "m = pow(31, 7, 33) # Result: 4"
    },
    {
      question: "Walk through RSA key generation with primes p = 7 and q = 13, choosing e = 5.",
      shortAnswer: "n = 91, φ(n) = 6 × 12 = 72. gcd(5, 72) = 1. d = 5^(-1) mod 72 = 29 (since 5 × 29 = 145 = 2 × 72 + 1 ≡ 1 mod 72).",
      explanation: "Public Key: (5, 91); Private Key: (29, 91).",
      hint: "p=7, q=13 -> n=91, phi=72, e=5 -> d=29.",
      level: "moderate",
      codeExample: "p = 7; q = 13; n = 91; phi = 72; e = 5; d = pow(5, -1, 72) # d=29"
    },
    {
      question: "Encrypt message m = 10 using public key (e=5, n=91).",
      shortAnswer: "c = (10^5) mod 91 = 100000 mod 91 = 82.",
      explanation: "100000 = (1098 × 91) + 82. Ciphertext is 82.",
      hint: "10^5 = 100,000; 100,000 mod 91 = 82.",
      level: "moderate",
      codeExample: "c = pow(10, 5, 91) # Result: 82"
    },
    {
      question: "Decrypt ciphertext c = 82 using private key (d=29, n=91).",
      shortAnswer: "m = (82^29) mod 91 = 10.",
      explanation: "Using modular exponentiation, 82^29 mod 91 resolves to 10, perfectly recovering m.",
      hint: "82^29 mod 91 = 10.",
      level: "moderate",
      codeExample: "m = pow(82, 29, 91) # Result: 10"
    },
    {
      question: "What happens if you attempt to encrypt m = 35 using modulus n = 33?",
      shortAnswer: "It fails or produces an erroneous output because m >= n violates the foundational algebraic domain requirement of RSA.",
      explanation: "35 mod 33 is 2; decrypting will return 2 instead of 35. Plaintext must always be strictly smaller than n.",
      hint: "Plaintext exceeds modulus, corrupting decrypted value.",
      level: "basic",
      codeExample: "c = pow(35, 3, 33); m = pow(c, 7, 33); assert m == 2 != 35"
    },
    {
      question: "Demonstrate a digital signature calculation using small primes: sign message digest h = 9 using private key (d=7, n=33).",
      shortAnswer: "Signature s = (9^7) mod 33 = 15.",
      explanation: "9^7 mod 33 = 15. The signature is the integer 15.",
      hint: "s = h^d mod n = 9^7 mod 33 = 15.",
      level: "moderate",
      codeExample: "s = pow(9, 7, 33) # Signature: 15"
    },
    {
      question: "Verify the digital signature s = 15 using public key (e=3, n=33).",
      shortAnswer: "h_recovered = (15^3) mod 33 = 3375 mod 33 = 9 (matches original digest h = 9).",
      explanation: "3375 = (102 × 33) + 9. Since recovered value equals 9, the signature is mathematically valid.",
      hint: "15^3 mod 33 = 9, matching the original hash digest.",
      level: "moderate",
      codeExample: "assert pow(15, 3, 33) == 9 # Signature verified!"
    },
    {
      question: "Why are small primes like p=3, q=11 used only for textbook demonstrations and never in real systems?",
      shortAnswer: "Because n = 33 can be factored instantaneously by inspection; any observer factors 33 into 3 × 11 and computes private key d in microseconds.",
      explanation: "Real RSA requires primes of 1024 or 2048 bits to make factoring computationally impossible.",
      hint: "Small numbers are factored by inspection in microseconds.",
      level: "basic",
      codeExample: "Security_Bits = math.log2(33) # ~5.04 bits (trivially breakable)"
    },
    {
      question: "Demonstrate the multiplicative homomorphic property using small numbers (n=33, e=3): m1=2, m2=4.",
      shortAnswer: "Enc(2) = 2^3 mod 33 = 8; Enc(4) = 4^3 mod 33 = 31. Enc(2) × Enc(4) = 8 × 31 = 248 mod 33 = 17. Enc(2 × 4) = Enc(8) = 8^3 mod 33 = 512 mod 33 = 17.",
      explanation: "Both equal 17, demonstrating that multiplying two ciphertexts produces the encryption of the product of their plaintexts.",
      hint: "Enc(2) * Enc(4) mod 33 equals Enc(8) mod 33 (both 17).",
      level: "advanced",
      codeExample: "(pow(2, 3, 33) * pow(4, 3, 33)) % 33 == pow(2 * 4, 3, 33) # 17 == 17"
    }
  ],

  '002_005_rsa-algorithm/topic6_files/topic6_questions.js': [
    {
      question: "What is the fastest general-purpose factoring algorithm for large RSA moduli on classical computers?",
      shortAnswer: "The General Number Field Sieve (GNFS), with sub-exponential time complexity.",
      explanation: "GNFS uses algebraic number fields to find smooth polynomial relations, breaking 768-bit RSA in 2009 and 829-bit RSA in 2020.",
      hint: "General Number Field Sieve (GNFS).",
      level: "advanced",
      codeExample: "Complexity_GNFS = 'O(exp((c + o(1)) * (ln n)^(1/3) * (ln ln n)^(2/3)))'"
    },
    {
      question: "What is Shor's Algorithm and how does a quantum computer break RSA?",
      shortAnswer: "A quantum algorithm running on qubits that finds the order (period r) of a modular function in polynomial time O((log n)^2), factoring n in seconds.",
      explanation: "Peter Shor published the algorithm in 1994; once fault-tolerant quantum computers with ~4,000 logical qubits exist, all RSA keys will be factored instantaneously.",
      hint: "Quantum polynomial-time period finding algorithm that factors RSA moduli in seconds.",
      level: "advanced",
      codeExample: "Quantum_Factoring_Steps: 'Quantum Phase Estimation -> Period r -> GCD(a^(r/2) +- 1, n)'"
    },
    {
      question: "What is a Fault Injection Attack on RSA with Chinese Remainder Theorem (CRT)?",
      shortAnswer: "Inducing a bit-flip hardware error during the computation of m1 = c^d mod p causes the resulting signature s_err to reveal prime factor p via gcd(s^e - m, n).",
      explanation: "Known as the Bellcore Attack, a single induced hardware glitch reveals the complete private key; defended by verifying signatures before outputting.",
      hint: "Inducing hardware bit errors during CRT calculations to factor n via GCD.",
      level: "advanced",
      codeExample: "p = math.gcd(pow(s_faulty, e, n) - m, n) # Direct recovery of prime p"
    },
    {
      question: "What is an Acoustic or Power Side-Channel Attack on RSA?",
      shortAnswer: "Monitoring electrical power consumption (DPA) or high-frequency acoustic noise from motherboard capacitors while the CPU executes square-and-multiply loops to deduce private key bits.",
      explanation: "Squaring and multiplication draw differing electrical current levels; observing oscilloscope power traces reveals individual private key bits directly.",
      hint: "Measuring power consumption or capacitor hum during square-and-multiply.",
      level: "advanced",
      codeExample: "DPA_Countermeasure: Constant-time arithmetic and cryptographic blinding"
    },
    {
      question: "What is Hastad's Broadcast Attack on RSA?",
      shortAnswer: "If the same plaintext m is encrypted with e = 3 under three distinct moduli (n1, n2, n3), the Chinese Remainder Theorem solves for m^3 mod (n1·n2·n3), yielding m via integer cube root.",
      explanation: "Shows that broadcasting identical unpadded RSA messages to multiple recipients with small exponents allows complete passive decryption.",
      hint: "Using Chinese Remainder Theorem to take cube root across 3 broadcast messages.",
      level: "advanced",
      codeExample: "m = integer_cube_root(CRT([c1, c2, c3], [n1, n2, n3]))"
    },
    {
      question: "What is Franklin-Reiter Related Message Attack?",
      shortAnswer: "If two messages differ by a known linear relation (e.g. m2 = m1 + 1) and are encrypted with the same public key with e = 3, GCD of polynomial relations extracts both messages.",
      explanation: "Reiterates the absolute rule that deterministic textbook RSA must never be used without OAEP random padding.",
      hint: "Extracting messages if they share a known linear relationship.",
      level: "advanced",
      codeExample: "gcd(poly1(x), poly2(x)) reveals (x - m1)"
    },
    {
      question: "What is the 'ROCA' vulnerability (Return of Coppersmith's Attack, CVE-2017-8917)?",
      shortAnswer: "A flaw in Infineon cryptographic smartcard chips where generated primes were restricted to a specific algebraic form (p = k·M + (65537^a mod M)), allowing factoring in hours.",
      explanation: "Compromised millions of smartcards and national ID cards (e.g. Estonian ID cards) because keys lacked true prime entropy.",
      hint: "Infineon smartcard flaw generating non-random structured primes.",
      level: "advanced",
      codeExample: "ROCA_Pattern: Prime p forced into structured polynomial form by hardware library"
    },
    {
      question: "Why does the 'Square and Always Multiply' countermeasure protect RSA implementations?",
      shortAnswer: "It executes a multiplication on every single bit regardless of whether the bit is 0 or 1 (discarding the result if 0), neutralizing timing and power side-channel analysis.",
      explanation: "Ensures uniform execution duration and electrical power traces across all operations.",
      hint: "Performing multiplications on every loop to ensure constant execution time.",
      level: "moderate",
      codeExample: "for bit in key:\n    sq = (acc * acc) % n\n    mul = (sq * m) % n\n    acc = mul if bit == '1' else sq # Constant execution path"
    },
    {
      question: "What is the Pollard's p - 1 Factoring Algorithm?",
      shortAnswer: "An algorithm that quickly factors modulus n if one of the prime factors (p) has a 'smooth' predecessor (p - 1 factors entirely into small prime numbers).",
      explanation: "Defended by generating 'Safe Primes' where (p - 1) / 2 is also a large prime number.",
      hint: "Factors n if (p - 1) consists entirely of small prime factors.",
      level: "advanced",
      codeExample: "B = 10000; a = 2\nfor j in range(2, B): a = pow(a, j, n)\np = math.gcd(a - 1, n)"
    },
    {
      question: "Can an attacker factor n if they obtain private exponent d?",
      shortAnswer: "Yes; knowing the pair (e, d) allows factoring n = p × q in randomized polynomial time using the relation e·d - 1 = k·φ(n).",
      explanation: "Once d is compromised, changing public exponent e under the same modulus n is completely useless; a new modulus must be generated.",
      hint: "Knowing d allows complete factorization of modulus n.",
      level: "moderate",
      codeExample: "k_phi = e * d - 1 # Multiple of phi(n) allows probabilistic square root factoring"
    },
    {
      question: "What is the current record for the largest RSA modulus factored classically?",
      shortAnswer: "RSA-250 (an 829-bit composite number, 250 decimal digits), factored in February 2020 using the General Number Field Sieve requiring ~2,700 core-years of compute.",
      explanation: "Confirms that 1024-bit RSA is within reach of state-sponsored adversaries and must never be used in production.",
      hint: "RSA-250 (829 bits) factored in 2020 using GNFS.",
      level: "moderate",
      codeExample: "FactoredRecord = { Name: 'RSA-250', Bits: 829, Year: 2020, Compute: '2,700 Core-Years' };"
    }
  ],

  '002_005_rsa-algorithm/topic7_files/topic7_questions.js': [
    {
      question: "What is the current industry-standard minimum RSA key length mandated by NIST and CISCE?",
      shortAnswer: "2048 bits (providing approximately 112 bits of symmetric-equivalent security).",
      explanation: "NIST Special Publication 800-57 formally deprecated 1024-bit RSA in 2013, requiring 2048 bits through 2030 and 3072 bits beyond.",
      hint: "2048 bits minimum required by NIST and CISCE.",
      level: "basic",
      codeExample: "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out private.pem"
    },
    {
      question: "How do 1024-bit, 2048-bit, and 4096-bit RSA keys compare in symmetric security equivalence?",
      shortAnswer: "RSA-1024 ≈ 80-bit symmetric (insecure); RSA-2048 ≈ 112-bit symmetric (minimum standard); RSA-4096 ≈ 128-bit symmetric (high security / military grade).",
      explanation: "Notice that doubling RSA key length from 2048 to 4096 bits only yields 16 additional bits of symmetric security due to sub-exponential GNFS scaling.",
      hint: "1024 ≈ 80-bit; 2048 ≈ 112-bit; 4096 ≈ 128-bit symmetric equivalence.",
      level: "moderate",
      codeExample: "Security_Equivalence = { 1024: '80-bit (Broken)', 2048: '112-bit (Current)', 4096: '128-bit (High)' };"
    },
    {
      question: "What is the performance penalty of upgrading from RSA-2048 to RSA-4096?",
      shortAnswer: "Private key operations (decryption and signing) are approximately 5 to 7 times slower, and public key operations are ~2 times slower.",
      explanation: "Because modular multiplication scales as O(k^2) to O(k^3) with bit length k, 4096-bit operations consume substantial CPU overhead on high-traffic web servers.",
      hint: "Decryption and signing become 5x to 7x slower.",
      level: "moderate",
      codeExample: "openssl speed rsa2048 rsa4096 # Benchmarks operations per second"
    },
    {
      question: "Where are 4096-bit RSA keys predominantly deployed in enterprise security?",
      shortAnswer: "Root Certificate Authorities (Root CAs) and long-term PGP master signing keys, where private key operations occur infrequently (e.g. signing CRLs once a month).",
      explanation: "Root CAs remain valid for 10 to 25 years, justifying the computational overhead of 4096 bits for extreme longevity.",
      hint: "Root CAs and long-term PGP master keys with multi-decade validity.",
      level: "moderate",
      codeExample: "RootCA_Profile: { KeyLength: 4096, ValidityYears: 20, Algorithm: 'RSA-SHA256' }"
    },
    {
      question: "Why is 15360-bit RSA required to match the security of AES-256?",
      shortAnswer: "Because GNFS sub-exponential factoring scales much slower than AES brute force; matching 256 bits of symmetric security requires a massive 15,360-bit RSA key.",
      explanation: "15,360-bit RSA is completely impractical for real-world devices, which is why modern systems switch to Elliptic Curve Cryptography (ECC-512) for top-tier security.",
      hint: "Matching 256-bit AES requires an impractically massive 15,360-bit RSA key.",
      level: "advanced",
      codeExample: "Equivalence = { 'AES-256': '15360-bit RSA or 512-bit ECC' };"
    },
    {
      question: "What is the impact of larger RSA key sizes on network packet sizes in TLS handshakes?",
      shortAnswer: "Larger keys increase X.509 certificate sizes, which can exceed the network Maximum Transmission Unit (MTU ~1500 bytes), causing TCP packet fragmentation and connection latency.",
      explanation: "Multiple round-trip times (RTT) are required to transmit large certificate chains, degrading page load speeds on mobile networks.",
      hint: "Causes TCP packet fragmentation and multiple round trips during TLS handshake.",
      level: "advanced",
      codeExample: "MTU = 1500; if CertChainSize > MTU: PacketFragmentation = True"
    },
    {
      question: "How does key length affect the maximum plaintext size encryptable via RSA?",
      shortAnswer: "Maximum plaintext size equals modulus byte length minus padding overhead: 2048-bit key allows up to 190 bytes (OAEP); 4096-bit key allows up to 446 bytes.",
      explanation: "Formula: MaxBytes = (KeyBits / 8) - 2 × HashLen - 2.",
      hint: "Plaintext capacity grows with key size (190 bytes for 2048-bit, 446 bytes for 4096-bit).",
      level: "moderate",
      codeExample: "RSA_4096_Max_OAEP = (4096 // 8) - 2 * 32 - 2 # 446 bytes"
    },
    {
      question: "What is the NIST timeline for transitioning away from RSA-2048 to Post-Quantum Cryptography (PQC)?",
      shortAnswer: "NIST standards (FIPS 203, 204, 205) mandate beginning migration to lattice-based post-quantum algorithms (ML-KEM / Kyber, ML-DSA / Dilithium) by 2030.",
      explanation: "Adversaries engage in 'Harvest Now, Decrypt Later' (recording encrypted traffic today to decrypt with future quantum computers), necessitating immediate PQC hybrid deployment.",
      hint: "Migration by 2030 to post-quantum algorithms like ML-KEM and ML-DSA.",
      level: "advanced",
      codeExample: "PQC_Algorithms = { KEM: 'ML-KEM (Kyber)', DigitalSignature: 'ML-DSA (Dilithium)' };"
    },
    {
      question: "What is 'Harvest Now, Decrypt Later' (HNDL) and why does it affect RSA-2048 today?",
      shortAnswer: "Nation-state adversaries intercept and record encrypted RSA traffic today, planning to decrypt it years later when large-scale quantum computers become operational.",
      explanation: "Data requiring 10-30 years of confidentiality (military secrets, medical records) is already vulnerable to future decryption.",
      hint: "Recording encrypted traffic now to decrypt it when quantum computers exist.",
      level: "moderate",
      codeExample: "ThreatModel: RecordInTransit(2024) -> StoreInVault() -> QuantumDecrypt(2035)"
    },
    {
      question: "Why does RSA key generation time increase cubically with bit length?",
      shortAnswer: "Because both the frequency of primes (Prime Number Theorem: 1/ln(n)) and the cost of modular multiplication (O(k^2)) scale with key size, resulting in O(k^3) to O(k^4) work.",
      explanation: "Generating a 4096-bit key requires testing roughly twice as many candidates as a 2048-bit key, and each primality test takes 4 times longer.",
      hint: "Fewer primes and costlier multiplication create cubic scaling.",
      level: "advanced",
      codeExample: "TimeComplexity = 'O(k^3) to O(k^4) for k-bit prime generation'"
    },
    {
      question: "What is the recommended RSA key length for intermediate and leaf TLS certificates?",
      shortAnswer: "2048 bits for leaf certificates (or transition to ECC secp256r1 / P-256); 2048 or 4096 bits for intermediate CAs.",
      explanation: "Leaf certificates are rotated annually, making 2048 bits secure against attack during their 1-year lifespan while maintaining optimal TLS handshake speeds.",
      hint: "2048 bits for leaf certificates, rotated annually.",
      level: "basic",
      codeExample: "Leaf_Cert: { Algorithm: 'RSA-2048', MaxValidityDays: 398 }"
    }
  ],

  '002_005_rsa-algorithm/topic8_files/topic8_questions.js': [
    {
      question: "Why is a Hybrid Cryptosystem combining RSA and AES universally preferred over using either alone?",
      shortAnswer: "Because it provides the best of both worlds: the microsecond high-speed bulk data processing of symmetric AES with the zero-shared-secret key exchange convenience of RSA.",
      explanation: "RSA cannot efficiently encrypt gigabytes of file data; AES cannot exchange keys across the Internet without a pre-shared secret. Hybrid crypto unites them.",
      hint: "Combines fast AES bulk encryption with secure RSA public-key distribution.",
      level: "basic",
      codeExample: "HybridPacket = { EncryptedData: AES_GCM(Data, K), EncryptedKey: RSA_OAEP(K, PubKey) }"
    },
    {
      question: "What are the 4 chronological steps in sending an encrypted message in a hybrid system?",
      shortAnswer: "1. Sender generates ephemeral symmetric session key K; 2. Encrypts payload with K using AES; 3. Encrypts K with recipient's public RSA key; 4. Transmits both to recipient.",
      explanation: "The session key K is discarded from sender RAM immediately after transmission.",
      hint: "Generate session key -> AES encrypt data -> RSA encrypt session key -> transmit.",
      level: "moderate",
      codeExample: "K = os.urandom(32)\nc1 = AES_Encrypt(K, message)\nc2 = RSA_Encrypt(PubKey, K)\nsend(c1, c2)"
    },
    {
      question: "What are the 3 chronological steps in decrypting a hybrid cryptosystem package?",
      shortAnswer: "1. Recipient uses private RSA key to decrypt session key K; 2. Uses K to decrypt ciphertext payload with AES; 3. Discards K from memory.",
      explanation: "Only the matching private key holder can unlock K, ensuring total end-to-end confidentiality.",
      hint: "RSA decrypt session key with private key -> AES decrypt data with session key.",
      level: "moderate",
      codeExample: "K = RSA_Decrypt(PrivKey, c2)\nmessage = AES_Decrypt(K, c1)"
    },
    {
      question: "How does PGP (Pretty Good Privacy) / GPG implement hybrid cryptography?",
      shortAnswer: "GPG compresses plaintext, creates a 256-bit IDEA/AES session key, encrypts data with AES, encrypts session key with recipient RSA public key, and signs with sender RSA private key.",
      explanation: "Standardized in OpenPGP (RFC 4880), securing global encrypted emails and software packages.",
      hint: "OpenPGP combining AES symmetric encryption with RSA key encapsulation and signing.",
      level: "moderate",
      codeExample: "gpg --encrypt --sign --recipient recipient@domain.com document.pdf"
    },
    {
      question: "What is Key Encapsulation Mechanism (KEM) in modern hybrid systems?",
      shortAnswer: "A public-key encryption scheme designed specifically to encapsulate (wrap) and transport symmetric keys rather than arbitrary plaintext messages.",
      explanation: "KEM standards (e.g. RSA-KEM, Kyber-KEM) eliminate complex padding mechanisms and optimize key delivery.",
      hint: "Cryptographic primitive designed specifically to wrap and transport symmetric keys.",
      level: "advanced",
      codeExample: "(shared_secret, ciphertext) = KEM_Encapsulate(public_key)"
    },
    {
      question: "Why is the session key (K) in a hybrid cryptosystem generated as 'Ephemeral' (single-use)?",
      shortAnswer: "To isolate cryptographic blast radiuses: if a session key for one message is somehow compromised, no other past or future messages are affected.",
      explanation: "Reusing session keys degrades security and allows replay and traffic analysis attacks.",
      hint: "Single-use session keys ensure that one compromise does not affect other messages.",
      level: "basic",
      codeExample: "EphemeralSessionKey: Generated once per message/session, then wiped with memset(0)"
    },
    {
      question: "How does a hybrid cryptosystem incorporate digital signatures for complete CIA + Non-repudiation?",
      shortAnswer: "Sender computes hash of plaintext, signs hash with sender's private RSA key, packs signature with plaintext, and wraps the bundle in hybrid AES/RSA encryption.",
      explanation: "Guarantees Confidentiality (AES), Integrity (Hash), Authentication & Non-Repudiation (Signature).",
      hint: "Signing the hash with sender private key before hybrid encryption.",
      level: "moderate",
      codeExample: "Bundle = { Signature: RSA_Sign(SHA256(Msg), Priv_A), Data: Msg }\nHybrid_Encrypt(Bundle, Pub_B)"
    },
    {
      question: "What is the file size overhead added by hybrid encryption compared to plaintext?",
      shortAnswer: "Only the fixed size of the encapsulated key (256 bytes for RSA-2048) plus AES IV/GCM tag (28-32 bytes), independent of total file size.",
      explanation: "Encrypting a 10 GB video file with hybrid crypto increases the file size by less than 300 bytes.",
      hint: "Minimal fixed overhead (~288 bytes) regardless of whether file is 1 MB or 10 GB.",
      level: "basic",
      codeExample: "Overhead = sizeof(RSA_Encrypted_Key) + sizeof(AES_IV) + sizeof(GCM_Tag) # ~288 bytes"
    },
    {
      question: "What is Envelope Encryption in cloud security (AWS KMS, Google Cloud KMS)?",
      shortAnswer: "Encrypting plaintext with a Data Encryption Key (DEK), and encrypting the DEK with a root Key Encryption Key (KEK) managed inside a cloud HSM.",
      explanation: "Allows cloud customers to encrypt gigabytes of S3/database data locally at hardware speed without sending heavy files across network boundaries to the KMS.",
      hint: "Encrypting data with DEK and encrypting DEK with HSM-managed master KEK.",
      level: "advanced",
      codeExample: "kms_client.generate_data_key(KeyId='alias/MasterKey', KeySpec='AES_256')"
    },
    {
      question: "How does hybrid encryption protect multi-recipient emails without duplicating large attachments?",
      shortAnswer: "The large attachment is encrypted once with a single AES session key K; that tiny key K is encrypted multiple times (once for each recipient's public RSA key).",
      explanation: "An email with a 100 MB attachment sent to 10 recipients stays ~100 MB, appending only 10 small 256-byte encrypted key blocks.",
      hint: "Data encrypted once with AES; small session key encrypted for each recipient.",
      level: "moderate",
      codeExample: "EmailPayload = { Data: AES(File, K), Recipients: [RSA(K, Pub1), RSA(K, Pub2), ...] }"
    },
    {
      question: "What attack occurs if the AES ciphertext is modified in transit when using unauthenticated CBC mode?",
      shortAnswer: "Bit-Flipping Attack: flipping bits in ciphertext block C[i-1] predictable alters plaintext block P[i], allowing attackers to manipulate financial figures or commands.",
      explanation: "Emphasizes why hybrid cryptosystems must use Authenticated Encryption (AES-GCM) rather than unauthenticated CBC mode.",
      hint: "Flipping ciphertext bits alters decrypted plaintext predictably in CBC mode.",
      level: "advanced",
      codeExample: "C[i-1] ^= 0x01 # Directly flips corresponding bit in decrypted P[i]"
    },
    {
      question: "How do hardware cryptographic accelerators (AES-NI) make hybrid systems practically instantaneous?",
      shortAnswer: "Modern x86 and ARM CPUs contain dedicated silicon instruction pipelines (AESENC, AESDEC) that encrypt data at > 4 GB/sec per core.",
      explanation: "Symmetric operations run at memory bus speeds, making the hybrid architecture virtually transparent to end users.",
      hint: "CPU hardware instructions executing AES at gigabytes per second.",
      level: "basic",
      codeExample: "grep -m1 -o 'aes' /proc/cpuinfo # Confirms hardware AES-NI CPU instruction support"
    }
  ],

  '002_005_rsa-algorithm/topic9_files/topic9_questions.js': [
    {
      question: "What is Public Key Infrastructure (PKI) and what problem does it solve?",
      shortAnswer: "A comprehensive framework of hardware, software, policies, and legal standards that securely binds public keys to verified entity identities through Digital Certificates.",
      explanation: "PKI solves the Man-in-the-Middle impersonation problem: without PKI, an attacker can substitute their own public key, intercepting and decrypting confidential messages.",
      hint: "Framework binding public keys to verified identities via digital certificates.",
      level: "basic",
      codeExample: "PKI_Binding: DigitalCertificate = Sign_By_CA(Identity + PublicKey)"
    },
    {
      question: "What are the core components of a Public Key Infrastructure?",
      shortAnswer: "Certificate Authority (CA), Registration Authority (RA), Certificate Database, Certificate Store/Repository, and Revocation Services (CRL / OCSP).",
      explanation: "The RA verifies applicant identity credentials; the CA signs and issues the certificate; repository and revocation services manage certificate lifecycles.",
      hint: "CA, RA, Certificate Store, and Revocation services (CRL/OCSP).",
      level: "moderate",
      codeExample: "PKI_Components = ['CA', 'RA', 'CertStore', 'CRL', 'OCSP'];"
    },
    {
      question: "What is the role of a Registration Authority (RA) in PKI?",
      shortAnswer: "The RA acts as the verification gatekeeper that validates the identity, corporate registration, and domain ownership of applicants before requesting the CA to sign the certificate.",
      explanation: "The RA does not sign certificates itself; it handles identity verification and vetting workflows.",
      hint: "Vetting and validating applicant identity before the CA signs the certificate.",
      level: "moderate",
      codeExample: "RA_Vetting_Workflow: VerifyDomainControl(DNS_TXT) -> VerifyDunsNumber() -> ApproveCA()"
    },
    {
      question: "What is a Root Certificate Authority (Root CA) and where are Root Certificates pre-installed?",
      shortAnswer: "The top-level trust anchor in a PKI whose certificate is self-signed; Root CA certificates are pre-installed in operating system and browser trust stores (Windows, Apple, Mozilla).",
      explanation: "If you trust the Root CA pre-installed in your browser, you automatically trust any certificate signed by its intermediate certificate authorities.",
      hint: "Top-level trust anchor pre-installed in operating system and browser trust stores.",
      level: "basic",
      codeExample: "RootTrustStore: /etc/ssl/certs/ca-certificates.crt (Linux Root Certificate Bundle)"
    },
    {
      question: "Why do Root CAs rarely issue end-entity (leaf) certificates directly?",
      shortAnswer: "To keep the Root CA private key completely offline in a secure vault, minimizing risk of catastrophic compromise; issuance is delegated to Intermediate CAs.",
      explanation: "If an Intermediate CA key is compromised, it can be revoked by the Root CA without invalidating the entire global trust store.",
      hint: "Root CAs stay offline in vaults; daily issuance is delegated to Intermediate CAs.",
      level: "moderate",
      codeExample: "TrustHierarchy: Offline Root CA -> Online Intermediate CA -> Leaf Web Server Cert"
    },
    {
      question: "What is a Certificate Revocation List (CRL) and what are its performance limitations?",
      shortAnswer: "A digitally signed list of serial numbers of revoked certificates published periodically by the CA; limitations include large file download sizes and stale latency between update intervals.",
      explanation: "If a private key is stolen, a victim may wait hours or days for the next CRL publication, creating a vulnerability window.",
      hint: "Periodic signed list of revoked certificate serial numbers; slow and bandwidth heavy.",
      level: "moderate",
      codeExample: "curl -s http://crl.ca.com/master.crl | openssl crl -text -noout"
    },
    {
      question: "What is the Online Certificate Status Protocol (OCSP) and how does it improve upon CRLs?",
      shortAnswer: "A real-time network protocol where the client queries an OCSP responder with a certificate's serial number, receiving an instant signed status: 'Good', 'Revoked', or 'Unknown'.",
      explanation: "Eliminates downloading megabytes of CRL files, providing real-time revocation verification.",
      hint: "Real-time query protocol returning instant Good/Revoked status for a certificate.",
      level: "moderate",
      codeExample: "openssl ocsp -issuer intermediate.pem -cert site.pem -url http://ocsp.digicert.com"
    },
    {
      question: "What is OCSP Stapling and why is it preferred for user privacy and web performance?",
      shortAnswer: "The web server queries the OCSP responder periodically and 'staples' the time-stamped, CA-signed OCSP response into the TLS handshake directly to visiting clients.",
      explanation: "Protects user privacy (CA cannot track what websites users visit) and eliminates a separate DNS and HTTP round-trip connection to the CA responder.",
      hint: "Web server caches and delivers CA-signed OCSP response directly during TLS handshake.",
      level: "advanced",
      codeExample: "nginx.conf: ssl_stapling on; ssl_stapling_verify on; ssl_trusted_certificate ca.pem;"
    },
    {
      question: "What was the DigiNotar CA breach of 2011 and why was it a catastrophic PKI failure?",
      shortAnswer: "Iranian hackers breached the Dutch CA DigiNotar, issuing hundreds of rogue rogue wildcard certificates (including `*.google.com`) used to intercept communications of 300,000 Iranian citizens.",
      explanation: "DigiNotar concealed the breach; major browsers revoked trust in DigiNotar's root certificate, bankrupting the company and highlighting the risks of centralized CA trust.",
      hint: "Compromised Dutch CA issuing fraudulent Google certificates for state surveillance.",
      level: "advanced",
      codeExample: "RogueCertificate = { Subject: '*.google.com', Issuer: 'DigiNotar Root CA (Compromised)' }"
    },
    {
      question: "What is Certificate Transparency (CT) and how does it prevent rogue certificate issuance?",
      shortAnswer: "A mandatory, publicly auditable, append-only cryptographic ledger (Merkle Tree) where all newly issued TLS certificates must be logged before browsers will trust them.",
      explanation: "Domain owners monitor CT logs; if an unauthorized CA issues a fraudulent certificate for `apple.com` or `google.com`, the domain owner detects it within minutes.",
      hint: "Public cryptographic ledger where all issued SSL certificates must be registered.",
      level: "advanced",
      codeExample: "SCT_Header: Signed Certificate Timestamp embedded inside X.509 certificate extension"
    },
    {
      question: "What is a Certificate Signing Request (CSR)?",
      shortAnswer: "A standardized file generated by an applicant containing their public key and identification details, digitally signed with their private key, sent to a CA to request a certificate.",
      explanation: "Because the CSR is signed with the applicant's private key, it mathematically proves possession of the matching private key (Proof of Possession).",
      hint: "Application file containing applicant public key and company identity sent to the CA.",
      level: "basic",
      codeExample: "openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr"
    },
    {
      question: "What is the role of the Controller of Certifying Authorities (CCA) under the Indian IT Act 2000?",
      shortAnswer: "The statutory regulatory body that licenses and supervises all commercial Certifying Authorities (e.g. eMudhra, (n)Code, NIC) in India, managing the National Root CA of India (NRCAI).",
      explanation: "Ensures legal validity and evidentiary admissibility of digital signatures on government forms, GST filings, and court documents under Section 18 of the IT Act 2000.",
      hint: "Government regulatory body licensing and auditing all digital signature CAs in India.",
      level: "moderate",
      codeExample: "India_CCA_Hierarchy: National Root CA of India (NRCAI) -> eMudhra CA -> Class 3 DSC"
    }
  ],

  '002_005_rsa-algorithm/topic10_files/topic10_questions.js': [
    {
      question: "What international standard defines the format of Public Key Certificates?",
      shortAnswer: "ITU-T X.509 (standardized by the IETF in RFC 5280).",
      explanation: "X.509 specifies the exact ASN.1 data structure used for SSL/TLS, IPsec, S/MIME email certificates, and national identity cards.",
      hint: "ITU-T X.509 / RFC 5280 standard.",
      level: "basic",
      codeExample: "openssl x509 -in cert.crt -text -noout"
    },
    {
      question: "What are the essential fields contained inside an X.509 v3 Digital Certificate?",
      shortAnswer: "Version, Serial Number, Signature Algorithm, Issuer CA, Validity Period (Not Before / Not After), Subject Identity, Subject Public Key Info, and Extensions.",
      explanation: "Extensions contain critical security constraints including Subject Alternative Names (SAN), Key Usage, and Basic Constraints.",
      hint: "Version, Serial Number, Issuer, Validity, Subject, Public Key, and Extensions.",
      level: "moderate",
      codeExample: "X509_Structure = ['Version', 'Serial', 'Issuer', 'Validity', 'Subject', 'PublicKey', 'Extensions'];"
    },
    {
      question: "What is the function of the 'Subject Alternative Name' (SAN) extension in modern SSL certificates?",
      shortAnswer: "It specifies all domain names, subdomains, and IP addresses secured by the single certificate (e.g. `example.com`, `www.example.com`, `api.example.com`).",
      explanation: "Modern browsers ignore the legacy Common Name (CN) field in favor of the SAN extension.",
      hint: "Extension listing all hostnames and subdomains secured by the certificate.",
      level: "basic",
      codeExample: "X509v3 Subject Alternative Name:\n    DNS:target.com, DNS:www.target.com, DNS:api.target.com"
    },
    {
      question: "What are the three validation levels of commercial SSL/TLS certificates?",
      shortAnswer: "1. Domain Validation (DV): verifies domain control only; 2. Organization Validation (OV): verifies legal business existence; 3. Extended Validation (EV): thorough legal and physical verification.",
      explanation: "All three offer identical cryptographic encryption strength; they differ solely in the level of identity vetting performed by the CA.",
      hint: "DV (domain check only), OV (business verified), EV (stringent legal vetting).",
      level: "basic",
      codeExample: "CertTiers = { DV: 'Automated email/DNS', OV: 'Business registry', EV: 'Full legal audit' };"
    },
    {
      question: "What is the 'Basic Constraints' extension and why is `CA:FALSE` critical on server certificates?",
      shortAnswer: "It defines whether the certificate subject is authorized to act as a Certificate Authority (`CA:TRUE`) and sign other certificates; web servers must have `CA:FALSE`.",
      explanation: "If `CA:FALSE` were missing or set to `TRUE`, a compromised web server could issue valid certificates for any domain on the Internet.",
      hint: "Prevents a web server certificate from acting as an unauthorized Certificate Authority.",
      level: "advanced",
      codeExample: "X509v3 Basic Constraints: critical\n    CA:FALSE"
    },
    {
      question: "How does a browser validate a 'Certificate Chain of Trust' (Certification Path)?",
      shortAnswer: "It verifies the leaf certificate's signature using the intermediate CA's public key, then verifies the intermediate CA's signature using the root CA's public key in its local trust store.",
      explanation: "If every signature in the path from leaf to trusted root is valid, unexpired, and unrevoked, the connection displays the secure lock icon.",
      hint: "Verifying cryptographic signatures up the chain from leaf to trusted pre-installed root.",
      level: "moderate",
      codeExample: "LeafCert.Verify(IntermediateKey) && IntermediateCert.Verify(RootCAKey)"
    },
    {
      question: "What does the 'Self-Signed Certificate' warning mean in web browsers?",
      shortAnswer: "The certificate was signed by its own private key rather than by a recognized, pre-installed trusted root Certificate Authority in the user's trust store.",
      explanation: "While self-signed certificates provide encryption, they provide zero identity verification, making connections vulnerable to Man-in-the-Middle attacks.",
      hint: "Certificate signed by itself, lacking trust validation from a pre-installed root CA.",
      level: "basic",
      codeExample: "Browser_Error: 'NET::ERR_CERT_AUTHORITY_INVALID' (Untrusted self-signed certificate)"
    },
    {
      question: "What is a Wildcard Certificate and what are its security risks?",
      shortAnswer: "A certificate securing an entire domain and all immediate subdomains using an asterisk (e.g. `*.example.com`); compromise of the private key exposes all subdomains simultaneously.",
      explanation: "If the single wildcard private key is compromised on one unhardened development server, all corporate subdomains sharing that key are exposed.",
      hint: "Secures *.domain.com; private key compromise exposes all subdomains.",
      level: "moderate",
      codeExample: "Subject: CN=*.example.com (Valid for dev.example.com, api.example.com, but not sub.dev.example.com)"
    },
    {
      question: "What are the common encoding formats for digital certificates (PEM, DER, PKCS#12)?",
      shortAnswer: "PEM: Base64-encoded ASCII with headers (`-----BEGIN CERTIFICATE-----`); DER: binary format; PKCS#12 (.p12 / .pfx): password-protected archive bundling certificate and private key.",
      explanation: "Web servers (Apache, Nginx) use PEM; Java keystores and Windows IIS use DER or PKCS#12.",
      hint: "PEM (Base64 ASCII), DER (raw binary), and PKCS#12/PFX (password-protected bundle).",
      level: "moderate",
      codeExample: "openssl x509 -in cert.crt -outform DER -out cert.der # PEM to DER conversion"
    },
    {
      question: "What is the Key Usage vs Extended Key Usage (EKU) extension?",
      shortAnswer: "Key Usage restricts technical cryptographic operations (digitalSignature, keyEncipherment); Extended Key Usage restricts application purposes (Server Authentication, Client Auth, Code Signing).",
      explanation: "Prevents a TLS server certificate from being misused to sign executable software code.",
      hint: "Technical cryptographic operations (Key Usage) vs application purposes (EKU).",
      level: "advanced",
      codeExample: "X509v3 Extended Key Usage:\n    TLS Web Server Authentication, TLS Web Client Authentication"
    },
    {
      question: "How did the Let's Encrypt CA revolutionize web certificate deployment?",
      shortAnswer: "By introducing the automated ACME (Automated Certificate Management Environment) protocol, providing free, domain-validated 90-day certificates via automated HTTP/DNS challenges.",
      explanation: "Eliminated financial and administrative barriers, driving global web encryption from ~40% in 2015 to >95% today.",
      hint: "Automated ACME protocol providing free, auto-renewing SSL certificates.",
      level: "basic",
      codeExample: "certbot --nginx -d example.com -d www.example.com # Automated Let's Encrypt issuance"
    },
    {
      question: "What is Certificate Pinning (HPKP) and why was it deprecated in web browsers?",
      shortAnswer: "Hardcoding specific certificate public keys into client software; deprecated because misconfigurations or key rotations permanently locked legitimate users out of websites (bricking apps).",
      explanation: "Replaced by Certificate Transparency (CT) and Expect-CT headers, which achieve rogue certificate detection without lockout risks.",
      hint: "Hardcoding public keys in clients; deprecated due to accidental self-lockout risks.",
      level: "advanced",
      codeExample: "// Legacy HPKP Header:\nPublic-Key-Pins: pin-sha256=\"base64==\"; max-age=5184000; includeSubDomains"
    }
  ],

  '002_005_rsa-algorithm/topic11_files/topic11_questions.js': [
    {
      question: "How was RSA historically utilized in the classic SSL/TLS Handshake (TLS 1.2 and earlier)?",
      shortAnswer: "The browser generated a 48-byte Pre-Master Secret, encrypted it with the server's public RSA key, and sent it to the server; the server decrypted it with its private RSA key.",
      explanation: "Both parties then derived master and session keys from the Pre-Master Secret to encrypt communication using symmetric ciphers.",
      hint: "Client encrypts Pre-Master Secret with server's RSA public key.",
      level: "moderate",
      codeExample: "ClientExchange: EncryptedPreMasterSecret = RSA_Encrypt(ServerPubKey, PreMasterSecret)"
    },
    {
      question: "Why did TLS 1.3 completely remove RSA Key Exchange?",
      shortAnswer: "Because static RSA key exchange lacks Forward Secrecy; if the server's private RSA key is compromised years later, all historically recorded traffic can be retroactively decrypted.",
      explanation: "TLS 1.3 mandates Ephemeral Diffie-Hellman (ECDHE) for key exchange; RSA is permitted ONLY for digital signatures and server authentication.",
      hint: "RSA key exchange lacks Forward Secrecy; TLS 1.3 mandates ephemeral ECDHE.",
      level: "advanced",
      codeExample: "TLS_1_3_Mandate: 'ECDHE handles key exchange; RSA/ECDSA used only for signing.'"
    },
    {
      question: "How does SSH (Secure Shell) use RSA for Public Key User Authentication?",
      shortAnswer: "Client sends public key to server (`~/.ssh/authorized_keys`); server generates a random challenge, encrypts it with the public key; client decrypts with private key and sends signature back.",
      explanation: "Authenticates users without ever transmitting passwords across the network, completely defeating credential sniffing.",
      hint: "Cryptographic challenge-response verifying client holds private key matching authorized_keys.",
      level: "moderate",
      codeExample: "ssh-copy-id -i ~/.ssh/id_rsa.pub user@server.corp.com"
    },
    {
      question: "What is the difference between an SSH Host Key and an SSH User Key?",
      shortAnswer: "Host Key identifies and authenticates the remote server to prevent Man-in-the-Middle spoofing; User Key authenticates the individual connecting client to grant account access.",
      explanation: "First-time SSH connections prompt users to accept the Host Key fingerprint, saving it to `~/.ssh/known_hosts`.",
      hint: "Host key identifies server (in known_hosts); user key authenticates the user.",
      level: "basic",
      codeExample: "HostKeyLocation: /etc/ssh/ssh_host_rsa_key; UserKeyLocation: ~/.ssh/id_rsa"
    },
    {
      question: "What does the SSH warning 'HOST IDENTIFICATION HAS CHANGED!' indicate?",
      shortAnswer: "The remote server presented a host key different from the fingerprint saved in `~/.ssh/known_hosts`, signaling a possible Man-in-the-Middle attack (or a reinstalled server).",
      explanation: "SSH terminates the connection immediately to protect the user from transmitting credentials to an imposter server.",
      hint: "Warning that the remote server's public key fingerprint does not match known_hosts.",
      level: "basic",
      codeExample: "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! Host key verification failed."
    },
    {
      question: "How does OpenSSL convert an RSA private key into its corresponding public key via CLI?",
      shortAnswer: "By executing `openssl rsa -in private.key -pubout -out public.key`.",
      explanation: "Extracts modulus n and public exponent e from the private key structure and formats it as an X.509 SubjectPublicKeyInfo PEM file.",
      hint: "openssl rsa -in private.key -pubout -out public.key",
      level: "basic",
      codeExample: "openssl rsa -in private.pem -pubout -out public.pem"
    },
    {
      question: "How does HTTPS establish Mutual TLS (mTLS) authentication?",
      shortAnswer: "In addition to the server presenting its certificate to the client, the server requests the client to present a valid client certificate signed by a trusted internal CA.",
      explanation: "Enforces two-way cryptographic identity verification, widely used in API microservices and Zero Trust corporate architectures.",
      hint: "Both server and client present digital certificates to authenticate each other.",
      level: "moderate",
      codeExample: "curl --cert client.crt --key client.key --cacert ca.crt https://secure-api.corp.com"
    },
    {
      question: "What is S/MIME (Secure/Multipurpose Internet Mail Extensions) and how does it use RSA?",
      shortAnswer: "An email security protocol that uses hybrid RSA/AES cryptography to sign email bodies for integrity/authenticity and encrypt messages for confidentiality.",
      explanation: "Integrated natively into enterprise email clients (Microsoft Outlook, Apple Mail) using X.509 personal identity certificates.",
      hint: "Email encryption and digital signature protocol using X.509 certificates.",
      level: "moderate",
      codeExample: "SMIME_Payload = { EncryptedBody: AES(Body, K), EncryptedKey: RSA(K, Recipient_PubKey) }"
    },
    {
      question: "What happens during a TLS session resumption using Session IDs or Session Tickets?",
      shortAnswer: "The client and server reuse previously negotiated master secrets, bypassing the heavy asymmetric RSA/ECDHE key exchange to resume encrypted communications in a single round-trip.",
      explanation: "Saves CPU overhead and reduces connection latency on subsequent page views.",
      hint: "Reusing previous master secret to bypass asymmetric math on repeated connections.",
      level: "advanced",
      codeExample: "TLS_Session_Ticket: Encrypted by server key, held by client to resume session"
    },
    {
      question: "What is an RSA Certificate Conversion command from PEM to PKCS#12 (.pfx)?",
      shortAnswer: "`openssl pkcs12 -export -out certificate.pfx -inkey private.key -in certificate.crt -certfile ca-bundle.crt`.",
      explanation: "Bundles the private key, public certificate, and intermediate chain into a password-protected archive for importing into Windows IIS or Azure Key Vault.",
      hint: "openssl pkcs12 -export bundling private key and certificates into a .pfx file.",
      level: "moderate",
      codeExample: "openssl pkcs12 -export -out bundle.pfx -inkey server.key -in server.crt"
    },
    {
      question: "How does DNSSEC (DNS Security Extensions) utilize RSA signatures to prevent DNS spoofing?",
      shortAnswer: "Authoritative DNS zones sign their DNS records (A, MX, CNAME) using RSA private keys (RRSIG records); resolvers verify signatures up to the root zone trust anchor.",
      explanation: "Prevents cache poisoning and rogue DNS redirects by cryptographically proving that IP address answers originate from authentic domain owners.",
      hint: "Signing DNS records with RSA private keys to prevent cache poisoning.",
      level: "advanced",
      codeExample: "RRSIG A 8 2 300 20240701 20240615 1234 target.com. o8Z... (RSA DNS signature)"
    },
    {
      question: "What is a 'Passphrase' on an RSA Private Key file and what encryption algorithm protects it on disk?",
      shortAnswer: "A user password used to derive a symmetric key (via PBKDF2/scrypt) to encrypt the private key file on disk using AES-256-CBC, preventing theft if the file is copied.",
      explanation: "Whenever tools (like SSH or OpenSSL) load the key, the user must supply the passphrase to decrypt the key into memory.",
      hint: "Password deriving an AES-256 key to encrypt the private key file on disk.",
      level: "basic",
      codeExample: "openssl rsa -aes256 -in unencrypted.key -out encrypted.key"
    }
  ]
};

console.log('=== EXPANDING MODULE 002_005 (RSA Algorithm) Remaining Topics ===');
Object.keys(mod2_005_remaining).forEach(relPath => {
  appendQuestions(relPath, mod2_005_remaining[relPath]);
});

console.log('\nSegment 2 complete.');
