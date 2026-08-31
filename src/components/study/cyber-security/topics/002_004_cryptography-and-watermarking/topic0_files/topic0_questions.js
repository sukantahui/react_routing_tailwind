const questions = [
  {
    question: "What is 'Cryptology', and what is the exact scientific relationship between 'Cryptography' and 'Cryptanalysis'?",
    shortAnswer: "Cryptology is the overarching mathematical science of secure communication, composed of Cryptography (creating secure ciphers) and Cryptanalysis (analyzing and breaking ciphers).",
    explanation: "Cryptology encompasses two symbiotic disciplines: 1. Cryptography (from Greek 'kryptos' hidden + 'graphein' to write): The practice and study of designing mathematical techniques for secure communication, data confidentiality, and integrity; 2. Cryptanalysis (codebreaking): The science of studying cryptosystems to find weaknesses, decipher ciphertext without knowing the key, or recover the secret cryptographic key.",
    hint: "Think about Cryptology as the complete discipline, with Cryptography as the lock-maker and Cryptanalysis as the lock-picker.",
    level: "basic",
    codeExample: `// The Cryptology Spectrum:
Cryptology = Cryptography (Cipher Design & Encryption) + Cryptanalysis (Cipher Breaking & Vulnerability Analysis)`
  },
  {
    question: "What is 'Kerckhoffs's Principle' (1883), and why is 'Security through Obscurity' rejected in modern enterprise cryptography?",
    shortAnswer: "Kerckhoffs's Principle states that a cryptosystem must remain secure even if everything about the system (except the secret key) is public knowledge.",
    explanation: "Auguste Kerckhoffs established that proprietary, secret encryption algorithms provide false security ('Security through Obscurity'). If an algorithm depends on secrecy, reverse-engineering or source code leaks destroy all security permanently. Modern standards (AES, RSA, ECC) publish their mathematical algorithms openly, inviting thousands of cryptanalysts worldwide to test them. Security rests 100% on the entropy and secrecy of the cryptographic key.",
    hint: "Remember the golden rule that the design of the lock should be public, while only the key remains secret.",
    level: "moderate",
    codeExample: `// Kerckhoffs's Principle in Practice:
AES-256 Algorithm: 100% Open & Public Standard (Published in NIST FIPS 197)
Secret Key:        256-bit Random Secret Key held ONLY by authorized user → SECURE!`
  },
  {
    question: "What are the four core security goals achieved by modern cryptographic systems?",
    shortAnswer: "1. Confidentiality (Privacy), 2. Integrity (Tamper-proofing), 3. Authentication (Identity verification), 4. Non-Repudiation (Undeniability of origin).",
    explanation: "Modern cryptography goes far beyond simple secrecy: 1. Confidentiality: Ensuring only authorized parties can read data (Encryption); 2. Data Integrity: Ensuring data was not modified in transit (Hashing / HMAC); 3. Authentication: Verifying the true identity of sender/system (Digital Certificates / Signatures); 4. Non-Repudiation: Proving conclusively that a specific sender authored a message (Digital Signatures).",
    hint: "Recall the 4 cryptographic pillars: Privacy, Tamper-resistance, Identity, and Undeniability.",
    level: "basic",
    codeExample: `// The 4 Cryptographic Pillars:
Confidentiality → Symmetric / Asymmetric Encryption (AES / RSA)
Integrity       → Cryptographic Hash Functions (SHA-256)
Authentication  → Digital Certificates & Public Key Infrastructure (PKI)
Non-Repudiation → Asymmetric Digital Signatures (ECDSA / RSA)`
  },
  {
    question: "What is a 'Ciphertext-Only Attack' (COA), and how does 'Frequency Analysis' allow cryptanalysts to break classical monoalphabetic substitution ciphers?",
    shortAnswer: "COA occurs when the cryptanalyst only has access to intercepted ciphertext; in classical substitution, analyzing letter frequencies (e.g. 'E', 'T', 'A' being most frequent in English) maps cipher letters back to plaintext.",
    explanation: "In a Ciphertext-Only Attack, the attacker has no plaintext. However, simple substitution ciphers (Caesar, monoalphabetic) preserve language statistics. In English, 'E' occurs ~12.7% of the time, 'T' ~9.1%, 'A' ~8.2%, and digraphs like 'TH' and 'HE' appear frequently. By counting letter occurrences in a large ciphertext, the cryptanalyst matches the most frequent cipher letters to 'E', 'T', and 'A', breaking the entire cipher without the key.",
    hint: "Think about matching the tallest bars on a letter count chart to the most common letters in the English alphabet (ETAOIN SHRDLU).",
    level: "moderate",
    codeExample: `// Frequency Analysis Attack:
Ciphertext: "WKH TXLFN EURZQ IRA MXPSV..."
Letter 'K' appears 13% of the time → Maps to English 'E'
Letter 'W' appears 9% of the time  → Maps to English 'T'
Decoded Shift: Key = 3 (Caesar Cipher Broken!)`
  },
  {
    question: "What is a 'Known-Plaintext Attack' (KPA), and how did the Allies exploit it to break the German Enigma machine at Bletchley Park using 'Cribs'?",
    shortAnswer: "KPA occurs when the attacker possesses samples of both plaintext and corresponding ciphertext; Alan Turing used predictable daily German weather reports ('Cribs') to determine Enigma rotor settings.",
    explanation: "In a Known-Plaintext Attack, the cryptanalyst has pairs of $P$ and $C = E_k(P)$. German military radio transmissions routinely began with standardized phrases (e.g. \"WETTERVORHERSAGE\" meaning weather forecast at 06:00 AM, or \"KEINE BESONDEREN VORKOMMNISSE\"). Alan Turing and the Bletchley Park team used these known plaintexts (called 'cribs') inside the electro-mechanical Bombe machines to eliminate millions of invalid rotor combinations within minutes.",
    hint: "Think of knowing that every morning email always starts with 'Good morning team' and using that phrase to crack the code.",
    level: "expert",
    codeExample: `// Known-Plaintext Attack (Enigma Cribbing):
Known Plaintext:  W E T T E R V O R H E R S A G E
Intercepted Cipher: K X R M P L Q Z B V C W T Y U I
-> Cryptanalytic Bombe eliminates non-matching rotor wirings → Recovers daily master key!`
  },
  {
    question: "What is a 'Chosen-Plaintext Attack' (CPA), and how does 'Differential Cryptanalysis' evaluate how changes in input plaintexts affect output ciphertexts?",
    shortAnswer: "CPA allows the attacker to choose arbitrary plaintexts and receive their encrypted ciphertexts; Differential Cryptanalysis analyzes how specific input bit differences propagate through cipher rounds to recover secret subkeys.",
    explanation: "In a Chosen-Plaintext Attack, the cryptanalyst has temporary access to an encryption oracle. Introduced by Eli Biham and Adi Shamir, Differential Cryptanalysis submits pairs of plaintexts with specific mathematical differences ($\Delta P = P_1 \oplus P_2$) and observes the resulting ciphertext differences ($\Delta C$). Non-random statistical correlations in cipher substitution boxes (S-boxes) reveal internal round keys, drastically reducing the search space compared to brute force.",
    hint: "Think of poking a black box with specific calibrated needles and watching which lights flicker to reverse-engineer the internal wiring.",
    level: "expert",
    codeExample: `// Differential Cryptanalysis Principle:
Input Difference:  ΔP = P1 ⊕ P2 (Chosen constant difference)
Output Difference: ΔC = C1 ⊕ C2 (Observed propagation through S-Boxes)
-> Identifies high-probability differential characteristics to extract round keys!`
  },
  {
    question: "What is a 'Chosen-Ciphertext Attack' (CCA / CCA2), and how did Bleichenbacher's Million Message Attack exploit RSA PKCS#1 v1.5 padding errors?",
    shortAnswer: "CCA allows the attacker to submit chosen ciphertexts to a decryption oracle; Bleichenbacher manipulated RSA ciphertexts and used error responses ('Valid Padding' vs 'Invalid Padding') to decrypt arbitrary TLS session keys.",
    explanation: "In a Chosen-Ciphertext Attack (CCA2 / Adaptive CCA), the attacker submits crafted ciphertext $C'$ to a server. In 1998, Daniel Bleichenbacher discovered that SSL servers returned different error codes if decrypted RSA ciphertext conformed to PKCS#1 v1.5 padding (`0x00 0x02 ...`). By sending ~1,000,000 modified ciphertexts and observing whether the server accepted or rejected padding, the attacker mathematically deduced the plaintext session key without knowing the RSA private key.",
    hint: "Think of playing 'Twenty Questions' with a vault door that makes a slightly different click sound when the combination is warm or cold.",
    level: "expert",
    codeExample: `// Bleichenbacher RSA PKCS#1 v1.5 Padding Oracle (CCA2):
Attacker sends: C' = (C * s^e) mod N
Server response: "Padding Error" (Invalid 0x00 0x02) OR "Silent Drop"
-> Attacker narrows mathematical interval until pre-master secret is recovered!`
  },
  {
    question: "What is a 'Side-Channel Attack' (SCA), and how can measuring physical characteristics (Power, Timing, Acoustics) break cryptographically secure algorithms?",
    shortAnswer: "Attacks that exploit physical implementation artifacts (execution time, power consumption fluctuations, electromagnetic leaks) rather than mathematical flaws in the algorithm.",
    explanation: "An algorithm like AES or RSA may be mathematically unbreakable, but its execution on physical silicon leaks physical signals: 1. Timing Attacks: Measuring how many microseconds a comparison takes reveals byte matches; 2. Differential Power Analysis (DPA): Measuring micro-watt fluctuations in CPU power draw as cryptographic S-boxes execute reveals secret key bits; 3. Acoustic Cryptanalysis: Recording the high-frequency acoustic noise of CPU capacitors during RSA decryption.",
    hint: "Think of listening to the clicking sound of a safe's mechanical tumblers with a stethoscope rather than trying every combination.",
    level: "moderate",
    codeExample: `// Constant-Time Cryptographic Comparison (Defeating Timing Attacks):
// VULNERABLE:
int insecure_compare(char *a, char *b, int len) {
    for (int i=0; i<len; i++) if (a[i] != b[i]) return 0; // Exits early → Leaks matching byte count!
    return 1;
}
// SECURE (Constant Time):
int constant_time_compare(char *a, char *b, int len) {
    int diff = 0;
    for (int i=0; i<len; i++) diff |= (a[i] ^ b[i]); // Always executes identical loop cycles!
    return diff == 0;
}`
  },
  {
    question: "What are Claude Shannon's two foundational properties of secure cipher design: 'Confusion' and 'Diffusion'?",
    shortAnswer: "Confusion obscures the relationship between the key and the ciphertext (via Substitution / S-Boxes); Diffusion spreads the influence of each plaintext bit across the entire ciphertext (via Transposition / P-Boxes).",
    explanation: "Published in 1949, Claude Shannon established: 1. Confusion: Ensures that statistical analysis of ciphertext reveals no information about the key (achieved in modern ciphers using non-linear Substitution Boxes / S-Boxes); 2. Diffusion: Ensures that changing a single bit in the plaintext changes approximately 50% of the ciphertext bits (the 'Avalanche Effect', achieved via Permutation / P-Boxes and bit shifts).",
    hint: "Remember: Confusion hides the Key (Substitution); Diffusion spreads the Plaintext (Transposition/Avalanche).",
    level: "moderate",
    codeExample: `// Shannon's Cryptographic Principles:
Confusion (S-Boxes)  → Complex non-linear byte substitution: Hides Key statistics.
Diffusion (P-Boxes)  → 1-bit Plaintext flip flips ~50% of Ciphertext bits (Avalanche Effect).`
  },
  {
    question: "What is the 'Avalanche Effect', and why is it a mandatory requirement for modern symmetric block ciphers and cryptographic hash functions?",
    shortAnswer: "A property where flipping a single bit in the input plaintext or key causes a cascading, pseudo-random change in at least 50% of the output ciphertext bits.",
    explanation: "If changing 1 bit of plaintext changes only 1 bit of ciphertext, an attacker can deduce plaintext modifications through correlation. In algorithms exhibiting a strict Avalanche Effect (like AES and SHA-256), flipping a single bit in a 128-bit block causes round-after-round diffusion where ~64 bits flip randomly in the output block, completely obliterating any mathematical or statistical correlation between input and output.",
    hint: "Think of a small pebble triggering a massive snow avalanche that reshapes the entire mountain.",
    level: "basic",
    codeExample: `// Strict Avalanche Effect (SHA-256 Example):
Input 1: "Kolkata2026"  → SHA-256: 4a8b9f... (256 bits)
Input 2: "Kolkata2027"  → SHA-256: e3c12d... (131 out of 256 bits flipped! ~51.2% change)`
  },
  {
    question: "What is a 'Stream Cipher' vs a 'Block Cipher', and how do their encryption mechanics differ at the byte and bit level?",
    shortAnswer: "A Stream Cipher encrypts plaintext continuous bit-by-bit (or byte-by-byte) using a pseudorandom keystream and XOR; a Block Cipher encrypts fixed-size blocks (e.g. 128 bits) simultaneously through multiple rounds.",
    explanation: "1. Stream Ciphers (e.g. ChaCha20, RC4): Generate an infinite pseudorandom keystream from a seed key and nonce, executing $C_i = P_i \oplus K_i$. They have low latency and zero padding requirements; 2. Block Ciphers (e.g. AES, DES): Divide plaintext into fixed blocks (128 bits for AES) and process each block through rounds of substitution, shift rows, mix columns, and round key addition. They require modes of operation (CBC, GCM) for bulk data.",
    hint: "Contrast continuous flowing water from a faucet (Stream Cipher) with loading discrete standardized shipping crates (Block Cipher).",
    level: "moderate",
    codeExample: `// Stream vs Block Cipher Processing:
Stream Cipher (ChaCha20): Byte[0] XOR Keystream[0] → CipherByte[0] (Continuous flow)
Block Cipher (AES-128):  [ 128-bit Plaintext Block ] ──[ 10 AES Rounds ]──> [ 128-bit Ciphertext Block ]`
  },
  {
    question: "What is the 'One-Time Pad' (OTP), and why is it the ONLY mathematically proven 'Information-Theoretically Secure' cryptosystem in existence?",
    shortAnswer: "A cipher where the plaintext is XORed with a truly random key that is as long as the message, used exactly once, and kept completely secret; mathematically impossible to break because all possible plaintexts are equally probable.",
    explanation: "Proved by Claude Shannon in 1949, the One-Time Pad ($C = P \oplus K$) possesses Perfect Secrecy. If a 100-letter ciphertext is intercepted, brute-forcing all possible keys produces every possible 100-letter English sentence with equal mathematical probability. It cannot be broken even with infinite supercomputing power. However, practical implementation is difficult because key distribution requires physically transporting gigabytes of truly random keys securely.",
    hint: "Remember the only unbreakable cipher in human history that requires a truly random key as long as the message itself.",
    level: "expert",
    codeExample: `// One-Time Pad Perfect Secrecy:
Plaintext:  "ATTACK AT DAWN" (14 bytes)
Random Key: "9x!K2@mQ#vL*8p" (14 bytes of pure physical hardware entropy)
Ciphertext: P ⊕ K (Mathematically 100% Unbreakable!)
Crucial Rule: NEVER REUSE THE KEY! (Reusing key allows Two-Time Pad crib dragging attack).`
  },
  {
    question: "What is a 'Two-Time Pad Attack' (Crib Dragging), and what catastrophic vulnerability occurs when a stream cipher key/nonce is reused?",
    shortAnswer: "Reusing a keystream allows an attacker to XOR two intercepted ciphertexts together ($C_1 \oplus C_2 = P_1 \oplus P_2$), eliminating the key entirely and recovering both plaintexts via crib dragging.",
    explanation: "If two messages $P_1$ and $P_2$ are encrypted with the same keystream $K$: $C_1 = P_1 \oplus K$ and $C_2 = P_2 \oplus K$. The attacker XORs both ciphertexts: $C_1 \oplus C_2 = (P_1 \oplus K) \oplus (P_2 \oplus K) = P_1 \oplus P_2$. The secret key $K$ cancels out completely. By guessing common words ('the ', 'http') and 'dragging' them across $P_1 \oplus P_2$, both plaintexts are revealed in plaintext.",
    hint: "Remember that XORing two identical secret keys cancels them out to zero, leaving only the combined secret messages.",
    level: "expert",
    codeExample: `// Two-Time Pad Vulnerability:
C1 ⊕ C2 = P1 ⊕ P2 (Key is completely eliminated!)
Crib Guess: "the " ⊕ (P1 ⊕ P2) → Reveals corresponding readable text in P2!`
  },
  {
    question: "Under the Indian Information Technology Act 2000, what are the legal ramifications of unauthorized interception and decryption of encrypted communications?",
    shortAnswer: "Section 66 (Hacking) and Section 69 (Power to issue directions for interception/decryption) carry up to 3 to 7 years imprisonment for unauthorized decryption or failure to assist authorized investigative agencies.",
    explanation: "Under Section 66 of the IT Act 2000, intercepting and decrypting data without authorization is criminal hacking punishable by up to 3 years imprisonment. Under Section 69, the central government may direct any subscriber or intermediary to assist in decrypting information for national security; failure to provide decryption assistance carries up to 7 years imprisonment and fine.",
    hint: "Remember the legal provisions in India governing cryptographic interception and mandatory decryption assistance.",
    level: "basic",
    codeExample: `// Indian IT Act 2000 Cryptographic Provisions:
Section 66: Unauthorized Decryption / Interception → Up to 3 Years Imprisonment + Fine
Section 69: Refusal to assist authorized agencies with Decryption → Up to 7 Years Imprisonment`
  },
  {
    question: "What is 'Polyalphabetic Substitution' (e.g. Vigenère Cipher), and how did the 'Kasiski Examination' solve the mystery of breaking it in 1863?",
    shortAnswer: "Vigenère uses multiple Caesar cipher alphabets governed by a keyword; Kasiski discovered that repeated words encrypted by the same key alignment produce identical ciphertext repetitions, revealing the key length.",
    explanation: "Monoalphabetic ciphers fall to single-letter frequency analysis. The Vigenère cipher was called 'le chiffre indéchiffrable' (the unbreakable cipher) for 300 years because it shifted each letter by a repeating keyword. In 1863, Friedrich Kasiski observed that if a 3-letter word like 'THE' aligns with the keyword at intervals that are multiples of the key length, identical 3-letter cipher sequences appear. Finding the Greatest Common Divisor (GCD) of distances between repeated sequences reveals the key length $L$, reducing the problem to $L$ simple Caesar ciphers.",
    hint: "Think about finding the rhythm of repeated musical patterns to deduce how many beats are in a repeating measure.",
    level: "expert",
    codeExample: `// Kasiski Examination for Key Length:
Repeated Ciphertext String: "XYZ" appears at position 12 and position 36
Distance between repetitions: 36 - 12 = 24
Factors of 24: 2, 3, 4, 6, 8, 12, 24 → Key length is likely 4 or 6 letters!`
  },
  {
    question: "What is the 'Man-in-the-Middle' (MitM) Attack on unauthenticated Key Exchange (such as Diffie-Hellman), and how do Digital Certificates prevent it?",
    shortAnswer: "An attacker intercepts the public keys between Alice and Bob, establishing separate keys with each party; Digital Certificates prevent this by cryptographically binding public keys to verified identities via a trusted CA.",
    explanation: "In raw Diffie-Hellman, Alice and Bob exchange public keys. Mallory sits on the wire, intercepts Alice's public key, sends her own key to Alice, and sends a second key to Bob. Mallory now decrypts, reads, and re-encrypts all traffic. Public Key Infrastructure (PKI) and X.509 Digital Certificates eliminate this: Alice's public key is signed by a trusted Certificate Authority (CA) that verifies her domain name, so Mallory cannot substitute her fake public key without invalidating the cryptographic signature.",
    hint: "Think about checking a government-issued passport with a tamper-evident holographic seal rather than trusting a stranger's verbal claim.",
    level: "moderate",
    codeExample: `// Unauthenticated Diffie-Hellman vs PKI:
Without PKI: Alice <──[Key 1]──> Mallory (Attacker) <──[Key 2]──> Bob (Compromised!)
With PKI:    Alice verifies Bob's Certificate signed by DigiCert CA → Mallory's fake key is rejected!`
  },
  {
    question: "What is 'Brute-Force Cryptanalysis', and what is the mathematical formula for the search space of an $n$-bit cryptographic key?",
    shortAnswer: "Testing every possible key combination sequentially; the total search space is $2^n$ combinations, requiring on average $2^{n-1}$ attempts to discover the key.",
    explanation: "Brute-force is the baseline against which all cryptanalytic attacks are measured. For a 56-bit DES key, the search space is $2^{56} \approx 72$ Quadrillion keys (broken in hours by modern hardware). For modern 128-bit AES, the search space is $2^{128} \approx 3.4 \times 10^{38}$ keys; testing 1 Trillion keys per second would take over 10 Billion times the age of the universe, rendering AES-128 brute-force computationally impossible under the laws of physics.",
    hint: "Remember the exponential power of binary keys: adding 1 bit doubles the time required to crack the cipher.",
    level: "basic",
    codeExample: `// Key Search Space Complexity:
56-bit Key (DES):     2^56  = 7.2 x 10^16 keys (Broken in 24 hours)
128-bit Key (AES):    2^128 = 3.4 x 10^38 keys (Mathematically Impregnable to Brute Force)
256-bit Key (AES):    2^256 = 1.1 x 10^77 keys (Resistant to Quantum Grover's Algorithm)`
  },
  {
    question: "What is 'Quantum Cryptanalysis' (Grover's Algorithm and Shor's Algorithm), and how do they threaten classical RSA and AES cryptography?",
    shortAnswer: "Shor's Algorithm completely breaks RSA and ECC in polynomial time on large quantum computers; Grover's Algorithm halves the effective key length of symmetric AES (reducing AES-128 to 64-bit security).",
    explanation: "Future fault-tolerant quantum computers pose a catastrophic risk to classical cryptography: 1. Shor's Algorithm: Solves prime factorization and discrete logarithms in polynomial time, completely destroying RSA, Diffie-Hellman, and Elliptic Curve Cryptography (ECC); 2. Grover's Algorithm: Speeds up unstructured search quadratically, halving symmetric key strength ($\sqrt{2^n} = 2^{n/2}$). To survive, organizations must migrate to Post-Quantum Cryptography (PQC - NIST ML-KEM/FIPS 203) and use AES-256 (which provides 128-bit quantum security).",
    hint: "Think about quantum computers using quantum superposition to factor huge prime numbers in seconds.",
    level: "expert",
    codeExample: `// Quantum Impact on Cryptographic Standards:
RSA-2048 / ECC-256: 100% BROKEN by Shor's Algorithm → Must migrate to Post-Quantum Kyber (ML-KEM)!
AES-128:            Weakened to 64-bit by Grover's Algorithm (Vulnerable!)
AES-256:            Reduced to 128-bit by Grover's Algorithm (STILL SECURE!)`
  },
  {
    question: "What is 'Homomorphic Encryption', and why is it considered the holy grail for privacy-preserving cloud computation in healthcare and finance?",
    shortAnswer: "A form of encryption that allows mathematical operations to be performed directly on encrypted ciphertext in the cloud without ever decrypting the underlying data.",
    explanation: "Traditionally, data must be decrypted in cloud RAM before an AI model or database query can process it, exposing plaintext to memory dump attacks. In Fully Homomorphic Encryption (FHE): $E(A) \otimes E(B) = E(A \times B)$. An Indian hospital can send encrypted patient health records to an external cloud AI for cancer diagnostic modeling. The cloud processes the encrypted data and returns an encrypted diagnosis; only the hospital holding the private key can decrypt the result, guaranteeing 100% patient privacy.",
    hint: "Think of putting gold into a sealed glove box: workers can assemble the jewelry with the gloves without ever touching or stealing the gold.",
    level: "expert",
    codeExample: `// Fully Homomorphic Encryption (FHE) Concept:
Hospital Encrypts:   Cipher_A = Encrypt(10), Cipher_B = Encrypt(20)
Cloud Computes:      Cipher_Result = Cipher_A * Cipher_B (Cloud NEVER sees numbers 10 or 20!)
Hospital Decrypts:   Decrypt(Cipher_Result) → 200 (100% Privacy Preserved!)`
  },
  {
    question: "Synthesizing Introduction to Cryptography and Cryptanalysis: what is the master principle that ensures long-term cryptographic integrity?",
    shortAnswer: "Rely on open, peer-reviewed mathematical standards (AES-256, PQC), enforce Kerckhoffs's Principle, maintain true cryptographic key entropy, and combine authenticated encryption (AES-GCM) with continuous side-channel defenses.",
    explanation: "True cryptographic security is an unbroken chain spanning mathematical theory, implementation engineering, and operational key governance. Security is not achieved by inventing secret proprietary algorithms, but by deploying open standards (AES-256, ML-KEM) validated by decades of cryptanalysis, using true hardware random number generators (TRNGs), and implementing constant-time code to defeat side-channel leakage.",
    hint: "Conclude by recognizing that open peer-reviewed mathematics, high-entropy keys, and constant-time implementations are what guarantee perpetual cryptographic trust.",
    level: "expert",
    codeExample: `// The Master Cryptographic Integrity Paradigm:
Open_Standard_Math(AES_256) + Hardware_TRNG_Key + Constant_Time_Code + Authenticated_GCM = UNBREAKABLE_SYSTEM;`
  }
];

export default questions;
