const questions = [
  {
    question: "What is the formal mathematical definition of a 'Cryptosystem' as a 5-tuple $(\\mathcal{P}, \\mathcal{C}, \\mathcal{K}, \\mathcal{E}, \\mathcal{D})$?",
    shortAnswer: "A system consisting of 5 mathematical sets: $\\mathcal{P}$ (Plaintext space), $\\mathcal{C}$ (Ciphertext space), $\\mathcal{K}$ (Key space), $\\mathcal{E}$ (Family of encryption functions), and $\\mathcal{D}$ (Family of decryption functions).",
    explanation: "In formal cryptography, a cryptosystem is defined as $(\\mathcal{P}, \\mathcal{C}, \\mathcal{K}, \\mathcal{E}, \\mathcal{D})$ where for each key $k \\in \\mathcal{K}$, there is an encryption rule $e_k \\in \\mathcal{E}$ mapping $e_k: \\mathcal{P} \\to \\mathcal{C}$, and an inverse decryption rule $d_k \\in \\mathcal{D}$ mapping $d_k: \\mathcal{C} \\to \\mathcal{P}$ such that for every plaintext $x \\in \\mathcal{P}$, $d_k(e_k(x)) = x$.",
    hint: "Remember the 5 components: Plaintext, Ciphertext, Keys, Encryption rules, and Decryption rules.",
    level: "moderate",
    codeExample: `// Formal Cryptosystem 5-Tuple Definition:
S = (P, C, K, E, D)
where:
  P = { Plaintext Messages }
  C = { Encrypted Ciphertexts }
  K = { Secret Cryptographic Keys }
  E = { e_k : P → C } (Encryption Function)
  D = { d_k : C → P } (Decryption Function)
Invariance Condition: For all x in P, d_k(e_k(x)) = x`
  },
  {
    question: "What is 'Key Space' ($\\mathcal{K}$), and why does increasing the key length from 128 bits to 256 bits increase brute-force resistance by a factor of $2^{128}$ rather than double it?",
    shortAnswer: "Key Space is the total number of unique keys possible in a cryptosystem; each additional bit doubles the number of combinations, so 256 bits has $2^{256}$ keys, which is $2^{128}$ times larger than $2^{128}$.",
    explanation: "Key space grows exponentially ($2^n$). A 128-bit key space has $2^{128} \\approx 3.4 \\times 10^{38}$ keys. A 256-bit key space has $2^{256} \\approx 1.15 \\times 10^{77}$ keys. Adding 128 bits does not merely double the search space; it multiplies the total number of keys by $2^{128}$ (over 340 undecillion times larger), making brute-force cracking mathematically impossible even for quantum computers using Grover's algorithm.",
    hint: "Think about how doubling the number of digits on a bicycle combination lock multiplies the combinations by thousands.",
    level: "basic",
    codeExample: `// Key Space Calculation:
128-bit Key Space: 2^128 = 340,282,366,920,938,463,463,374,607,431,768,211,456 keys
256-bit Key Space: 2^256 = 2^128 * 2^128 (Exponentially Vast Search Space!)`
  },
  {
    question: "What is an 'Initialization Vector' (IV) or 'Nonce' (Number used ONCE), and why is IV reuse catastrophic in symmetric encryption?",
    shortAnswer: "An IV/Nonce is a non-secret, pseudo-random value combined with the key to ensure that encrypting identical plaintexts multiple times produces completely different ciphertexts; reusing an IV in stream/GCM modes leaks plaintext differences.",
    explanation: "If an encryption algorithm is deterministic, encrypting the word 'CONFIDENTIAL' with key $K$ will always produce the exact same ciphertext block. An attacker sniffing the wire detects repeated patterns. An IV ($C = E_k(P \\oplus IV)$) ensures every encryption session starts from a unique pseudo-random state. In stream ciphers and AES-GCM, reusing an (IV, Key) pair enables Two-Time Pad crib dragging and allows attackers to forge authentication tags.",
    hint: "Think of adding a unique random timestamp ticket to every sealed envelope so no two envelopes ever look identical.",
    level: "moderate",
    codeExample: `// Without IV (Deterministic Leak):
AES-ECB("TRANSFER ₹50,000") → 8a4c12...
AES-ECB("TRANSFER ₹50,000") → 8a4c12... (Attacker knows messages are identical!)

// With Unique IV (Semantic Security):
AES-CBC("TRANSFER ₹50,000", IV_1) → 3f9a1b...
AES-CBC("TRANSFER ₹50,000", IV_2) → e8c740... (Completely different ciphertexts!)`
  },
  {
    question: "What is the 'ECB Penguin Leak', and why is Electronic Codebook (ECB) mode strictly forbidden for encrypting structured data or images?",
    shortAnswer: "ECB mode encrypts each 16-byte plaintext block independently with the same key, preserving visual and structural patterns in the ciphertext (e.g. the Tux penguin image remains clearly visible after encryption).",
    explanation: "In Electronic Codebook (ECB) mode, identical 16-byte plaintext blocks are transformed into identical ciphertext blocks ($C_i = E_k(P_i)$). When encrypting an uncompressed bitmap image (like the Linux Tux Penguin), solid color blocks (such as white background or black feathers) produce identical ciphertext bytes throughout the image. The resulting encrypted image reveals the complete visual silhouette of the penguin, proving total failure of confidentiality.",
    hint: "Think of translating a book where the word 'king' is always replaced by the same symbol '★', so anyone can spot the king's story immediately.",
    level: "basic",
    codeExample: `// ECB Mode Flaw:
Block 1 (White Pixel): [ 0xFF 0xFF 0xFF 0xFF... ] ──[ AES ]──> [ 0x8A 0x4C 0x12 0x9B... ]
Block 2 (White Pixel): [ 0xFF 0xFF 0xFF 0xFF... ] ──[ AES ]──> [ 0x8A 0x4C 0x12 0x9B... ] (IDENTICAL!)
Result: Image outlines and database record structures remain 100% visible in ciphertext!`
  },
  {
    question: "What is 'Cipher Block Chaining' (CBC) mode, and how does XOR chaining with the previous ciphertext block eliminate the ECB pattern leakage?",
    shortAnswer: "In CBC mode, each plaintext block is XORed with the preceding ciphertext block before encryption ($C_i = E_k(P_i \\oplus C_{i-1})$), ensuring that identical plaintext blocks produce completely different ciphertext blocks.",
    explanation: "CBC mode introduces sequential dependency: Block 1 is XORed with a random Initialization Vector ($IV$) before encryption: $C_1 = E_k(P_1 \\oplus IV)$. Block 2 is XORed with $C_1$ before encryption: $C_2 = E_k(P_2 \\oplus C_1)$. Even if $P_1$ and $P_2$ are identical, the XOR with preceding ciphertexts randomizes the input to the cipher block, destroying all structural and visual patterns.",
    hint: "Think of linking chain links together so each link's position depends directly on the link before it.",
    level: "moderate",
    codeExample: `// Cipher Block Chaining (CBC) Mathematical Formulation:
C_0 = IV (Random Initialization Vector)
C_1 = E_k( P_1 ⊕ IV )
C_2 = E_k( P_2 ⊕ C_1 )
C_i = E_k( P_i ⊕ C_{i-1} )`
  },
  {
    question: "What is 'Galois/Counter Mode' (GCM), and why is it classified as 'Authenticated Encryption with Associated Data' (AEAD)?",
    shortAnswer: "GCM combines Counter (CTR) mode encryption with Galois field polynomial authentication (GMAC) to provide both confidentiality and cryptographic integrity verification in a single, high-speed parallel operation.",
    explanation: "Traditional encryption (CBC) only provides confidentiality; it does not protect against active bit-flipping or padding oracle attacks. Galois/Counter Mode (AES-GCM) encrypts data using Counter mode and simultaneously computes a 128-bit cryptographic Authentication Tag ($T$) over both the ciphertext and unencrypted header metadata (Associated Data - AAD). If an attacker alters a single bit in the ciphertext, decryption fails immediately with an authentication error.",
    hint: "Think of an armored courier package that includes both an unbreakable lock and a tamper-evident holographic cryptographic seal.",
    level: "expert",
    codeExample: `// AES-GCM (AEAD) Operation:
Inputs:  Plaintext (P), Key (K), 96-bit Nonce (IV), Associated Data (AAD)
Outputs: Ciphertext (C), 128-bit Authentication Tag (T)
Verification: Decrypt(C, K, IV, AAD, T) → Returns P only if Tag T matches 100%! Otherwise: REJECTS.`
  },
  {
    question: "What is 'Key Entropy', and what is the difference between a True Random Number Generator (TRNG) and a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)?",
    shortAnswer: "TRNG harvests physical hardware noise (thermal jitter, radioactive decay, avalanche diodes) for true non-deterministic entropy; CSPRNG uses mathematical algorithms seeded by true entropy to generate cryptographically unpredictable bitstreams.",
    explanation: "If a cryptographic key is generated using low-entropy sources (like system time `time()`), an attacker can predict the key in seconds. A TRNG measures chaotic physical phenomena (e.g. quantum noise in hardware chips). A CSPRNG (like `/dev/urandom` or Windows `BCryptGenRandom`) takes a high-entropy seed from the TRNG and passes it through cryptographic hash/cipher pools, generating billions of bits passing all NIST SP 800-22 statistical randomness tests.",
    hint: "Think of flipping real physical coins in turbulent wind (TRNG) versus using a complex mathematical calculator with a secret starting number (CSPRNG).",
    level: "expert",
    codeExample: `// Generating Cryptographically Secure Random Keys:
// Linux (/dev/urandom):
head -c 32 /dev/urandom | xxd -p # 256-bit CSPRNG key

// Node.js (crypto module):
const crypto = require('crypto');
const key = crypto.randomBytes(32); // 256-bit high-entropy cryptographic key`
  },
  {
    question: "What is a 'Cryptographic Salt', and how does it differ from an 'Initialization Vector' (IV) and a 'Nonce'?",
    shortAnswer: "A Salt is a random string added to passwords before hashing to defeat rainbow tables; an IV is a random block used in block ciphers to randomize ciphertext; a Nonce is a strictly unique number used once per key in stream/AEAD ciphers.",
    explanation: "While all three introduce randomness, their cryptographic domains differ: 1. Salt: Used in Password Hashing (Argon2id, Bcrypt) to ensure identical passwords produce unique hash strings, defeating pre-computed rainbow tables; 2. Initialization Vector (IV): Used in Block Cipher modes (CBC) to randomize the first block; 3. Nonce: Used in Stream ciphers (ChaCha20) and AEAD modes (GCM) where uniqueness is mandatory to prevent keystream reuse attacks.",
    hint: "Remember: Salt is for password hashes, IV is for block cipher chaining, and Nonce is for stream/AEAD uniqueness.",
    level: "moderate",
    codeExample: `// Primitive Roles:
Salt:  Hash("SecretPass" + "9f!k2@") → Unique password hash per user.
IV:    AES_CBC(Plaintext, Key, IV)    → Randomizes block chaining.
Nonce: AES_GCM(Plaintext, Key, Nonce) → Guarantees unique keystream per session.`
  },
  {
    question: "What is 'Padding' in block ciphers, and how does the 'PKCS#7' standard handle plaintexts that are not exact multiples of the block size?",
    shortAnswer: "PKCS#7 appends $N$ bytes, each with value $N$ (where $N$ is the number of bytes needed to fill the final block); if the plaintext is already an exact multiple, a full block of 16 padding bytes is appended.",
    explanation: "AES operates on fixed 16-byte (128-bit) blocks. If a message is 13 bytes long, it needs 3 padding bytes. Under PKCS#7, the byte value `0x03` is appended 3 times (`... 0x03 0x03 0x03`). If a message is already exactly 16 bytes, PKCS#7 appends a full 16-byte dummy block containing sixteen `0x10` bytes, ensuring the receiver unambiguously knows where padding starts upon decryption.",
    hint: "Think about packing boxes where you fill the remaining empty space with packing foam labeled with the number of foam pieces used.",
    level: "moderate",
    codeExample: `// PKCS#7 Padding Examples (16-byte AES block):
13-byte Data: [ D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13 ] + [ 0x03 0x03 0x03 ]
15-byte Data: [ D1 ... D15 ] + [ 0x01 ]
16-byte Data: [ D1 ... D16 ] + [ 0x10 0x10 0x10 ... (16 bytes of 0x10) ]`
  },
  {
    question: "What is a 'Padding Oracle Attack' (e.g. against AES-CBC), and how does an attacker decrypt ciphertext block-by-block without the key?",
    shortAnswer: "An attack where a server reveals whether decrypted ciphertext has valid PKCS#7 padding; by modifying the previous ciphertext block and observing server error responses, the attacker deduces plaintext byte-by-byte.",
    explanation: "In CBC mode, $P_2 = D_k(C_2) \\oplus C_1$. If an attacker tampers with byte $C_{1}[15]$ and sends it to the server, the server attempts decryption and checks PKCS#7 padding. If the padding is valid (`0x01`), the server processes it; if invalid, it returns a 500 error or takes longer to respond. By iterating 256 possible byte values, the attacker solves for $D_k(C_2)$ and recovers the plaintext $P_2$ in 256 attempts per byte rather than $2^{128}$.",
    hint: "Think about listening for a specific lock tumbler click when testing different key tooth depths.",
    level: "expert",
    codeExample: `// Padding Oracle Decryption Formula:
Attacker tests C1'[15] = 0x00 to 0xFF until Server responds: "Valid Padding (0x01)"!
Then: Intermediate_Byte = C1'[15] ⊕ 0x01
Plaintext_Byte = Intermediate_Byte ⊕ Original_C1[15] → RECOVERED PLAINTEXT!`
  },
  {
    question: "What is 'Counter Mode' (CTR), and how does it convert a synchronous Block Cipher into a high-speed Stream Cipher?",
    shortAnswer: "CTR mode encrypts a successive counter value combined with a nonce to produce a keystream, which is then XORed with the plaintext; allows parallel processing and requires zero padding.",
    explanation: "In CTR mode, the underlying block cipher (AES) does not encrypt the plaintext directly. Instead, it encrypts the concatenation of a Nonce and an incrementing Counter: $Keystream_i = E_k(Nonce || Counter_i)$. The plaintext is then XORed with the keystream: $C_i = P_i \\oplus Keystream_i$. Because each counter block is independent, CTR mode can encrypt and decrypt blocks in parallel across multi-core CPUs and GPUs with zero latency.",
    hint: "Think of turning a heavy block stamper into an automated high-speed spray painter that paints numbers sequentially.",
    level: "moderate",
    codeExample: `// AES-CTR Mode Mathematical Architecture:
Block 1: Keystream_1 = AES_k( Nonce || 0x00000001 ) → C_1 = P_1 ⊕ Keystream_1
Block 2: Keystream_2 = AES_k( Nonce || 0x00000002 ) → C_2 = P_2 ⊕ Keystream_2
Feature: 100% Parallelizable on Multi-Core Hardware!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 43A and DPDP Act 2023, why is unencrypted plaintext storage of sensitive personal data a major statutory violation?",
    shortAnswer: "Section 43A mandates 'Reasonable Security Practices and Procedures' (ISO/IEC 27001 encryption); DPDP Act 2023 imposes penalties up to ₹250 Crores for failure to prevent personal data breaches through encryption.",
    explanation: "Under Section 43A of the IT Act 2000, body corporates handling Sensitive Personal Data or Information (SPDI) must maintain comprehensive documented security controls, including encryption at rest and in transit. Under Section 33 of the Digital Personal Data Protection Act 2023, storing plaintext customer financial or biometric data without cryptographic safeguards constitutes statutory negligence, exposing corporations to massive administrative penalties.",
    hint: "Remember the Indian cyber laws that make unencrypted plaintext storage of customer data a punishable corporate offense.",
    level: "basic",
    codeExample: `// Indian Statutory Cryptographic Compliance:
IT Act 2000 Section 43A: Mandatory ISO/IEC 27001 Encryption for SPDI data.
DPDP Act 2023 Section 33: Up to ₹250 Crores fine for unencrypted data leaks.`
  },
  {
    question: "What is 'Shannon Entropy' ($H$), and how is it used in malware analysis to detect encrypted and packed executable payloads?",
    shortAnswer: "A mathematical measure of randomness in a byte stream ($0.0$ to $8.0$ bits per byte); plaintext English has low entropy (~3.5-4.5), while encrypted or compressed binaries exhibit high entropy (>7.2).",
    explanation: "Shannon Entropy measures information density: $H(X) = -\\sum_{i=1}^{n} P(x_i) \\log_2 P(x_i)$. In standard unencrypted code, many bytes are repeated (spaces, zeroes, ASCII letters), resulting in low entropy ($H \\approx 4.0$). Modern ciphers (AES) output pseudo-random distributions where all 256 byte values appear with equal probability, yielding high entropy ($H \\approx 7.9$ out of $8.0$). Antivirus and EDR scanners flag executable sections with $H > 7.2$ as suspicious encrypted malware payloads.",
    hint: "Think of an entropy meter that reads near 0 for repetitive text and near 8.0 for pure cryptographic white noise.",
    level: "expert",
    codeExample: `// Shannon Entropy in PE Binary Analysis:
Section .text (Normal Code):   Entropy = 5.82 (Standard compiled assembly)
Section .rsrc (Plaintext UI):  Entropy = 3.41 (Low randomness)
Section .upx0 (Packed / AES):  Entropy = 7.94 → [!] Flagged as Encrypted Malware Payload!`
  },
  {
    question: "What is 'Key Wrapping' (e.g. AES Key Wrap / RFC 3394), and how do Key Management Systems (KMS) securely encrypt and transport cryptographic keys?",
    shortAnswer: "A specialized block cipher mode designed to encrypt and integrity-protect cryptographic keys (Key Encrypting Keys - KEK encrypting Data Encryption Keys - DEK) without requiring padding.",
    explanation: "Encrypting a cryptographic key using standard CBC mode can expose it to padding oracle attacks. Key Wrapping algorithms (NIST AES Key Wrap) use an integrity-checked Feistel-like construction: a Master Key (KEK) wraps a 256-bit data encryption key (DEK) with an embedded 64-bit integrity check value (`0xA6A6A6A6A6A6A6A6`). If even 1 bit of the wrapped key is corrupted, the unwrapping process fails completely, preventing corrupted keys from being imported.",
    hint: "Think of an armored safe designed specifically to transport smaller metal lockbox keys.",
    level: "expert",
    codeExample: `// Key Management Hierarchy (Envelope Encryption):
1. Data Encryption Key (DEK): 256-bit AES key used to encrypt customer database.
2. Key Encrypting Key (KEK): Master HSM key used to WRAP (encrypt) the DEK.
Wrapped_DEK = AES_Key_Wrap(DEK, KEK)`
  },
  {
    question: "What is the 'Meet-in-the-Middle Attack', and why did it reduce the effective security of Double-DES ($2 \\times 56 = 112$ bits) to only 57 bits?",
    shortAnswer: "An attack that encrypts from the plaintext side and decrypts from the ciphertext side, finding a match in an intermediate hash table in $2^{56} + 2^{56} = 2^{57}$ operations rather than $2^{112}$.",
    explanation: "To increase DES security, engineers proposed Double-DES: $C = E_{k2}(E_{k1}(P))$. While the key length is 112 bits, Martin Hellman showed: $E_{k1}(P) = D_{k2}(C)$. The attacker pre-computes and stores all $2^{56}$ intermediate encryptions $E_{k1}(P)$ in RAM. Then, they compute $D_{k2}(C)$ for each possible $k2$ and look for a table match. This breaks Double-DES in $2^{56}$ time and space, proving that Double-DES offers virtually zero extra security over single DES.",
    hint: "Think of two teams digging a tunnel from opposite ends of a mountain until they meet in the middle, cutting the work in half.",
    level: "expert",
    codeExample: `// Meet-in-the-Middle Complexity:
Naive Brute Force: 2^56 * 2^56 = 2^112 operations
Meet-in-the-Middle: 2^56 (Forward Encryptions) + 2^56 (Backward Decryptions) = 2^57 Operations!`
  },
  {
    question: "What is 'Semantic Security' (Ciphertext Indistinguishability under Chosen-Plaintext Attack - IND-CPA)?",
    shortAnswer: "A mathematical proof of security where an adversary who chooses two plaintexts $P_0$ and $P_1$ cannot guess which one was encrypted with a probability better than a random coin flip ($1/2$).",
    explanation: "Semantic security formalizes privacy: knowing the ciphertext reveals zero information about the plaintext. In the IND-CPA security game, the adversary gives the challenger two equal-length messages $P_0$ and $P_1$. The challenger flips a coin and returns $C = E_k(P_b)$. If the cryptosystem uses randomized encryption (like AES-CBC with random IV or AES-GCM with unique nonce), the adversary's probability of guessing $b$ is exactly $\\frac{1}{2} + \\epsilon$, where $\\epsilon$ is negligible.",
    hint: "Think of an encryption so perfectly randomized that guessing what is inside is no better than guessing heads or tails.",
    level: "expert",
    codeExample: `// IND-CPA Semantic Security Game:
Attacker chooses: P0 = "PAY ₹10,000", P1 = "PAY ₹99,999"
Challenger encrypts: C = Enc(K, P_b, Random_IV)
Attacker Advantage: |Pr[Guess == b] - 1/2| <= 2^-128 (Negligible Advantage → SEMANTICALLY SECURE!)`
  },
  {
    question: "What is 'Key Derivation Function' (KDF / e.g. PBKDF2, HKDF, Argon2), and how does it convert a low-entropy user password into a 256-bit cryptographic key?",
    shortAnswer: "A cryptographic algorithm that applies repeated hashing, salting, and memory-hard iterations to stretch a human password into a high-entropy, uniformly distributed binary encryption key.",
    explanation: "Humans cannot remember 256-bit random hexadecimal keys; they remember 12-character passwords like `Kolkata#2026`. A Key Derivation Function (KDF) stretches the password: 1. Adds a unique cryptographic Salt; 2. Runs through 600,000 iterations of HMAC-SHA256 (PBKDF2) or memory-hard matrices (Argon2id); 3. Outputs a cryptographically strong, uniformly distributed 256-bit AES master key.",
    hint: "Think of stretching a small lump of dough through repeated folding and rolling until it fills the entire baking pan.",
    level: "moderate",
    codeExample: `// HKDF / PBKDF2 Key Derivation (Node.js):
const crypto = require('crypto');
const salt = crypto.randomBytes(16);
const aesKey = crypto.pbkdf2Sync('UserPassword2026!', salt, 600000, 32, 'sha256');
// Generates 32 bytes (256 bits) of uniformly distributed key material!`
  },
  {
    question: "What is 'End-to-End Encryption' (E2EE), and how does it differ from 'Encryption-in-Transit' (TLS)?",
    shortAnswer: "Encryption-in-Transit (TLS) decrypts data at intermediate cloud/service provider servers; End-to-End Encryption ensures data is encrypted on the sender's device and decrypted ONLY on the recipient's device, so service providers cannot read it.",
    explanation: "In standard TLS (Encryption-in-Transit), your message is encrypted between your phone and the WhatsApp/Google server, decrypted in the server's RAM, and re-encrypted to the recipient. The cloud provider can read and log your data. In true End-to-End Encryption (E2EE using the Signal Protocol), the sender encrypts data with the recipient's public key; intermediate servers only route opaque ciphertext blocks and cannot decrypt the messages even under subpoena.",
    hint: "Contrast locking a letter inside a private lockbox that only your friend has the key for, versus giving the letter to a courier who opens and reads it at the post office sorting station.",
    level: "basic",
    codeExample: `// TLS vs E2EE Comparison:
TLS (In-Transit): Client ──[Encrypted]──> Cloud Server (DECRYPTED IN RAM!) ──[Encrypted]──> Recipient
E2EE (End-to-End): Client ──[Encrypted]──> Cloud Server (Opaque Ciphertext) ──[Encrypted]──> Recipient (ONLY RECIPIENT DECRYPTS!)`
  },
  {
    question: "Synthesizing Core Cryptographic Terminology: what is the single most critical engineering rule when implementing encryption in enterprise software?",
    shortAnswer: "Always use Authenticated Encryption (AEAD: AES-256-GCM or ChaCha20-Poly1305), generate nonces using a CSPRNG, never reuse nonces with the same key, and never implement custom cryptographic primitives.",
    explanation: "Enterprise encryption failures rarely stem from mathematical flaws in AES; they stem from implementation errors: using ECB mode, reusing IVs/nonces, ignoring integrity verification (padding oracles), or hardcoding keys. By adopting AES-256-GCM with CSPRNG nonces, enforcing hardware key management (KMS/HSM), and relying on audited libraries, engineers guarantee confidentiality, integrity, and regulatory compliance.",
    hint: "Conclude by recognizing that combining AEAD authenticated encryption with proper nonce governance and hardware entropy permanently secures data.",
    level: "expert",
    codeExample: `// The Golden Engineering Cryptographic Rule:
const cipher = crypto.createCipheriv('aes-256-gcm', key256, nonce96);
cipher.setAAD(associatedData);
// Encrypts + Computes 128-bit Authentication Tag = UNBREAKABLE IMPLEMENTATION;`
  }
];

export default questions;
