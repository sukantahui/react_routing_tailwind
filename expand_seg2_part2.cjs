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

// -----------------------------------------------------------------------------
// MODULE 002_004: Cryptography, Watermarking & Cipher Types
// -----------------------------------------------------------------------------
const mod2_004 = {
  '002_004_cryptography-and-watermarking/topic0_files/topic0_questions.js': [
    {
      question: "What is Kerckhoffs's Principle and why is it fundamental to modern cryptographic security?",
      shortAnswer: "A cryptosystem must remain secure even if everything about the system (including the algorithm source code) is public knowledge, with security depending solely on the secrecy of the key.",
      explanation: "Security by obscurity (hiding algorithm details) always fails. Publicly scrutinized algorithms (like AES and RSA) prove resilience against global cryptanalytic attacks.",
      hint: "Security must depend only on key secrecy, not on keeping the algorithm secret.",
      level: "moderate",
      codeExample: "// Kerckhoffs rule: AES-256 algorithm is open source; only the 256-bit key is confidential."
    },
    {
      question: "What is the difference between Confusion and Diffusion as formulated by Claude Shannon?",
      shortAnswer: "Confusion obscures the mathematical relationship between the ciphertext and the key (via S-boxes); Diffusion spreads statistical influence of a single plaintext bit across many ciphertext bits (via P-boxes/permutations).",
      explanation: "If one bit in plaintext changes, diffusion causes roughly half of all ciphertext bits to flip (the Avalanche effect).",
      hint: "Confusion hides key relationship; diffusion spreads plaintext bits across ciphertext.",
      level: "advanced",
      codeExample: "Shannon_Primitives: { Confusion: 'Substitution (S-Box)', Diffusion: 'Permutation (P-Box)' }"
    },
    {
      question: "What is a Known-Plaintext Attack (KPA) in cryptanalysis?",
      shortAnswer: "An attack model where the cryptanalyst possesses both the plaintext samples and their corresponding ciphertext versions, using them to deduce the secret key.",
      explanation: "For example, in WWII, Bletchley Park cryptanalysts used known daily weather forecast phrases ('WETTERVORHERSAGE') to deduce German Enigma rotor key settings.",
      hint: "Attacker has samples of both plaintext and corresponding ciphertext.",
      level: "moderate",
      codeExample: "KPA_Model: Deduce K from known pairs (P1, C1), (P2, C2)..."
    },
    {
      question: "What is a Chosen-Ciphertext Attack (CCA) and how does CCA2 (Adaptive CCA) work?",
      shortAnswer: "In CCA, the attacker chooses arbitrary ciphertexts and receives decrypted plaintexts; in Adaptive CCA (CCA2), choices can be made iteratively based on previous decryption results.",
      explanation: "Bleichenbacher's attack on RSA PKCS#1 v1.5 is a famous adaptive chosen-ciphertext attack that extracts private keys via error responses from SSL servers.",
      hint: "Attacker submits chosen ciphertexts to a decryption oracle to deduce the key.",
      level: "advanced",
      codeExample: "CCA2_Oracle: plaintext = DecryptOracle(chosen_c_prime)"
    },
    {
      question: "What is the 'One-Time Pad' (OTP) and why is it mathematically unbreakable (Information-Theoretically Secure)?",
      shortAnswer: "A cipher where a truly random key as long as the plaintext is XORed once and never reused; every possible plaintext is equally probable given a specific ciphertext.",
      explanation: "Shannon mathematically proved that if key length equals plaintext length, key is truly random, and used only once, ciphertext reveals zero information about plaintext.",
      hint: "Truly random key as long as message, used exactly once via XOR.",
      level: "moderate",
      codeExample: "C = P ^ K; // If K is uniform random and len(K) == len(P), entropy(P|C) == entropy(P)"
    }
  ],

  '002_004_cryptography-and-watermarking/topic1_files/topic1_questions.js': [
    {
      question: "What is the mathematical role of an Initialization Vector (IV) or Nonce in block ciphers?",
      shortAnswer: "An arbitrary, non-repeating number used alongside a secret key to ensure that encrypting identical plaintexts repeatedly produces completely distinct ciphertexts.",
      explanation: "Without an IV, encrypting the message 'PAY $100' twice with the same key produces identical ciphertext blocks, allowing traffic analysis and replay attacks.",
      hint: "Non-repeating random value preventing identical plaintexts from yielding identical ciphertexts.",
      level: "moderate",
      codeExample: "cipher = AES.new(key, AES.MODE_CBC, iv=os.urandom(16))"
    },
    {
      question: "What is 'Key Exhaustion' or 'Key Re-use Vulnerability' in stream ciphers?",
      shortAnswer: "Reusing the same keystream with a key/nonce pair allows attackers to XOR two ciphertexts together, completely eliminating the key: C1 ⊕ C2 = P1 ⊕ P2.",
      explanation: "Once the keystream is canceled out, frequency analysis easily separates plaintexts P1 and P2 (famous flaw in WEP Wi-Fi encryption).",
      hint: "Reusing a keystream cancels out the key via C1 XOR C2 = P1 XOR P2.",
      level: "advanced",
      codeExample: "C1 ^ C2 == (P1 ^ K) ^ (P2 ^ K) == P1 ^ P2"
    },
    {
      question: "What is Key Derivation Function (KDF) and why is PBKDF2 or Argon2 used instead of simple hashing?",
      shortAnswer: "A cryptographic algorithm that stretches human passwords into high-entropy keys using computational work factors, memory cost, and salts to defeat GPU brute-forcing.",
      explanation: "Simple hashes (like MD5 or SHA-256) can be calculated billions of times per second on GPUs. Argon2 enforces memory hardness, making ASIC/GPU cracking economically unviable.",
      hint: "Stretching passwords into strong keys using computational iteration and memory hardness.",
      level: "moderate",
      codeExample: "key = argon2.low_level.hash_secret(password, salt, time_cost=3, memory_cost=65536)"
    },
    {
      question: "What is 'Padding' in block ciphers and how does PKCS#7 padding work?",
      shortAnswer: "Adding bytes to the final block to match the fixed cipher block size (e.g. 16 bytes for AES); PKCS#7 appends N bytes, each with value N (e.g. 0x04 0x04 0x04 0x04 for 4 bytes).",
      explanation: "If a block is already full (16 bytes), PKCS#7 adds a complete block of 16 bytes of value 16, ensuring deterministic removal during decryption.",
      hint: "Appends N bytes, each having value N, to satisfy fixed block boundaries.",
      level: "moderate",
      codeExample: "PadLength = 16 - (len(data) % 16); padding = bytes([PadLength] * PadLength)"
    },
    {
      question: "What is the difference between 'Data at Rest', 'Data in Transit', and 'Data in Use'?",
      shortAnswer: "At Rest: stored on disk/databases (encrypted via BitLocker/AES); In Transit: traversing networks (encrypted via TLS/IPsec); In Use: actively processed in RAM/CPU registers.",
      explanation: "Data in Use requires technologies like Confidential Computing (hardware enclaves like Intel SGX) or Homomorphic Encryption to remain encrypted while computed.",
      hint: "Stored on disk (at rest), traversing network (in transit), processed in RAM (in use).",
      level: "basic",
      codeExample: "CryptoLayers = { Rest: 'BitLocker_XTS_AES', Transit: 'TLS_1_3', InUse: 'Intel_SGX' };"
    },
    {
      question: "What is 'Forward Secrecy' (Perfect Forward Secrecy - PFS) in key exchange protocols?",
      shortAnswer: "A security property ensuring that compromise of long-term server private keys does NOT compromise past session keys or historical recorded encrypted traffic.",
      explanation: "PFS uses Ephemeral Diffie-Hellman (DHE/ECDHE) to generate temporary session keys that are deleted immediately after session termination.",
      hint: "Compromise of long-term server keys does not decrypt past recorded sessions.",
      level: "advanced",
      codeExample: "SSL_Cipher_Suite = 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384' # Uses ephemeral ECDHE"
    }
  ],

  '002_004_cryptography-and-watermarking/topic2_files/topic2_questions.js': [
    {
      question: "How does Frequency Analysis crack monoalphabetic substitution ciphers like the Caesar cipher?",
      shortAnswer: "By comparing the statistical letter frequencies in the ciphertext against natural language frequency tables (e.g. 'E', 'T', 'A' being most frequent in English).",
      explanation: "In monoalphabetic ciphers, every occurrence of 'E' maps to the same ciphertext letter, preserving the unique statistical signature of the language.",
      hint: "Matching ciphertext letter frequency counts to English language letter frequencies.",
      level: "basic",
      codeExample: "FreqTable = { 'E': 12.7, 'T': 9.1, 'A': 8.2, 'O': 7.5, 'I': 7.0 };"
    },
    {
      question: "What is the Vigenère Cipher and why was it historically considered 'le chiffre indéchiffrable'?",
      shortAnswer: "A polyalphabetic substitution cipher using a repeating keyword to shift letters according to a Tabula Recta, masking single-letter frequency signatures.",
      explanation: "Because the same plaintext letter can map to multiple ciphertext letters depending on keyword position, simple frequency analysis fails.",
      hint: "Polyalphabetic substitution cipher shifting letters based on a repeating keyword.",
      level: "moderate",
      codeExample: "C_i = (P_i + K_(i mod m)) mod 26 # Vigenère mathematical formula"
    },
    {
      question: "How did Charles Babbage and Friedrich Kasiski break the Vigenère cipher (Kasiski Examination)?",
      shortAnswer: "By locating repeated sequences in the ciphertext, calculating the distances between them, and finding the greatest common divisor (GCD) of those distances to discover key length.",
      explanation: "Once the keyword length L is known, the ciphertext is factored into L separate monoalphabetic Caesar ciphers, each solved via frequency analysis.",
      hint: "Finding distances between repeated ciphertext strings and taking the GCD.",
      level: "advanced",
      codeExample: "KeyLength = gcd(distance1, distance2, distance3)"
    },
    {
      question: "How does a Rail Fence Transposition Cipher operate?",
      shortAnswer: "Plaintext characters are written diagonally in a zigzag pattern across multiple imaginary rails and then read off horizontally row by row to form ciphertext.",
      explanation: "Unlike substitution ciphers, transposition ciphers do not alter character identities; they rearrange their positions (permutations).",
      hint: "Writing letters in a zigzag pattern across rails, then reading row by row.",
      level: "basic",
      codeExample: "// Rail Fence (Key=3):\n// M . . . A . . . K\n// . E . S . G . E .\n// . . E . . . E . ."
    },
    {
      question: "What is the Playfair Cipher and how does it encrypt digraphs (pairs of letters)?",
      shortAnswer: "It encrypts two-letter pairs using a 5x5 key matrix (I and J combined). If in same row: take right letter; same column: take lower letter; rectangle: take horizontal opposite.",
      explanation: "Encrypting pairs of letters flattens frequency distribution from 26 single letters to 676 digraphs, significantly resisting basic frequency cryptanalysis.",
      hint: "5x5 letter matrix encrypting two-letter pairs using row, column, and rectangle rules.",
      level: "moderate",
      codeExample: "Playfair_Rules = { SameRow: 'ShiftRight', SameCol: 'ShiftDown', Rectangle: 'SwapCorners' };"
    },
    {
      question: "What is the Hill Cipher and what branch of mathematics does it use for encryption and decryption?",
      shortAnswer: "A polygraphic substitution cipher that uses Linear Algebra (matrix multiplication modulo 26) with an invertible square matrix as the key.",
      explanation: "Encryption: C = (K · P) mod 26. Decryption requires computing the modular matrix inverse K^(-1) mod 26 using adjugate and determinant mathematics.",
      hint: "Linear algebra multiplying character vectors by an invertible key matrix mod 26.",
      level: "advanced",
      codeExample: "C = np.dot(K, P) % 26; P = np.dot(modMatInv(K, 26), C) % 26"
    }
  ],

  '002_004_cryptography-and-watermarking/topic3_files/topic3_questions.js': [
    {
      question: "What is the Key Distribution Problem in Symmetric Key Cryptography?",
      shortAnswer: "How to securely deliver the shared secret key to both communicating parties over an insecure network before encrypted communication can begin.",
      explanation: "If an eavesdropper intercepts the symmetric key during transit, all subsequent encryption is compromised. This problem motivated asymmetric public-key cryptography.",
      hint: "Transmitting the secret key securely across insecure internet channels without interception.",
      level: "basic",
      codeExample: "Key_Pairs_Required = (n * (n - 1)) / 2 # O(n^2) scaling problem for n users"
    },
    {
      question: "What is the difference between a Block Cipher and a Stream Cipher?",
      shortAnswer: "Block ciphers encrypt fixed-size data chunks (e.g. 128 bits in AES) simultaneously; Stream ciphers encrypt continuous streams of data bit-by-bit or byte-by-byte via XOR with a keystream.",
      explanation: "Stream ciphers (e.g. ChaCha20) have lower latency and are ideal for live audio/video streaming, while block ciphers are standard for file storage and bulk data.",
      hint: "Encrypting fixed 128-bit blocks vs continuous bit-by-bit XOR keystreams.",
      level: "moderate",
      codeExample: "Block: C = AES_Encrypt(Block_128, K); Stream: C_i = P_i ^ KeyStream_i"
    },
    {
      question: "What is a Feistel Cipher Network and which famous ciphers employ it?",
      shortAnswer: "A symmetric block cipher structure that splits the block into two halves (Left and Right) and applies round functions iteratively; used in DES, 3DES, and Blowfish.",
      explanation: "Feistel networks are reversible: encryption and decryption use identical hardware operations, reversing only the round key schedule order.",
      hint: "Splitting data into two halves and iteratively swapping through round functions.",
      level: "advanced",
      codeExample: "L_(i+1) = R_i;\nR_(i+1) = L_i ^ F(R_i, K_i);"
    },
    {
      question: "What is the fatal security flaw of Electronic Codebook (ECB) mode?",
      shortAnswer: "Identical plaintext blocks always produce identical ciphertext blocks, preserving visual and structural patterns of the underlying data (the 'ECB Penguin' vulnerability).",
      explanation: "ECB does not use an initialization vector (IV), allowing eavesdroppers to analyze patterns in database records or uncompressed image bitmaps without knowing the key.",
      hint: "Identical 16-byte blocks yield identical ciphertext, preserving visual patterns.",
      level: "moderate",
      codeExample: "AES_ECB: C[i] = E_K(P[i]) # Never use ECB for multi-block data!"
    },
    {
      question: "How does Cipher Block Chaining (CBC) mode prevent the pattern leakage of ECB mode?",
      shortAnswer: "By XORing each plaintext block with the preceding ciphertext block before encryption: C[i] = E_K(P[i] ⊕ C[i-1]), using a random IV for the first block.",
      explanation: "This ensures that even if identical plaintext blocks recur, their ciphertext outputs are completely distinct and randomized.",
      hint: "XORing each plaintext block with the previous ciphertext block before encrypting.",
      level: "moderate",
      codeExample: "C[0] = E_K(P[0] ^ IV); C[i] = E_K(P[i] ^ C[i-1]);"
    },
    {
      question: "What is Galois/Counter Mode (GCM) and why is it preferred in modern TLS 1.3?",
      shortAnswer: "An Authenticated Encryption with Associated Data (AEAD) mode that combines CTR stream encryption with Galois field authentication (GHASH) for high-speed parallel throughput and integrity.",
      explanation: "GCM provides both confidentiality and tamper detection simultaneously in a single pass, with native hardware acceleration on modern CPU silicon (AES-NI).",
      hint: "AEAD mode providing encryption and cryptographic integrity verification simultaneously.",
      level: "advanced",
      codeExample: "cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)\nciphertext, tag = cipher.encrypt_and_digest(data)"
    }
  ],

  '002_004_cryptography-and-watermarking/topic4_files/topic4_questions.js': [
    {
      question: "Why was the Data Encryption Standard (DES) deprecated in the late 1990s?",
      shortAnswer: "Its effective key length of 56 bits is too short, allowing brute-force cracking in under 24 hours using distributed clusters (Deep Crack machine).",
      explanation: "Although DES uses 64-bit keys, 8 bits are parity bits. 2^56 keys (~7.2 × 10^16) can be thoroughly exhausted by modern FPGA and GPU rigs in minutes.",
      hint: "56-bit key length is trivially vulnerable to brute-force cracking.",
      level: "basic",
      codeExample: "Total_DES_Keys = 2**56 # 72,057,594,037,927,936 keys (crackable in hours)"
    },
    {
      question: "How does Triple-DES (3DES) enhance security and what is its Encrypt-Decrypt-Encrypt (EDE) architecture?",
      shortAnswer: "It applies DES three times with up to three distinct keys: C = E_K3(D_K2(E_K1(P))), providing an effective key length of 112 or 168 bits.",
      explanation: "The middle step is decryption to maintain backwards compatibility: if K1 = K2 = K3, 3DES reduces to standard single-DES.",
      hint: "Applying DES three times: Encrypt with K1, Decrypt with K2, Encrypt with K3.",
      level: "moderate",
      codeExample: "C = DES_Encrypt(K3, DES_Decrypt(K2, DES_Encrypt(K1, P)))"
    },
    {
      question: "What is the Meet-in-the-Middle attack and why does Double-DES (2DES) NOT provide 112 bits of security?",
      shortAnswer: "An attacker encrypts plaintext from one end and decrypts ciphertext from the other, storing intermediate states in a hash table; 2DES yields only 57 bits of security (2^57 operations).",
      explanation: "Instead of 2^(56+56) = 2^112, the space-time trade-off breaks 2DES in 2^57 steps, proving that double encryption is cryptographically ineffective.",
      hint: "Space-time trade-off matching forward encryption with backward decryption in memory.",
      level: "advanced",
      codeExample: "Table[E_K1(P)] = K1; if D_K2(C) in Table -> Candidate pair (K1, K2) found!"
    },
    {
      question: "What mathematical structure does the Advanced Encryption Standard (AES) use instead of a Feistel network?",
      shortAnswer: "A Substitution-Permutation Network (SPN) operating on a 4x4 matrix of bytes called the 'State'.",
      explanation: "Unlike Feistel ciphers which process only half the block per round, SPN transforms the entire 128-bit block in every single round.",
      hint: "Substitution-Permutation Network (SPN) operating on a 4x4 State byte matrix.",
      level: "advanced",
      codeExample: "AES_Round_Steps = ['SubBytes', 'ShiftRows', 'MixColumns', 'AddRoundKey'];"
    },
    {
      question: "What are the 4 distinct transformations executed in each round of AES?",
      shortAnswer: "1. SubBytes (non-linear S-box byte substitution), 2. ShiftRows (cyclical byte transposition), 3. MixColumns (Galois Field matrix multiplication), 4. AddRoundKey (XOR with round key).",
      explanation: "The final round omits the MixColumns step to allow symmetric mathematical inversion during decryption.",
      hint: "SubBytes, ShiftRows, MixColumns, AddRoundKey.",
      level: "moderate",
      codeExample: "def AES_Round(state, round_key):\n    return AddRoundKey(MixColumns(ShiftRows(SubBytes(state))), round_key)"
    },
    {
      question: "How do AES-128, AES-192, and AES-256 compare in terms of key length and round counts?",
      shortAnswer: "All use identical 128-bit block size. AES-128: 128-bit key, 10 rounds; AES-192: 192-bit key, 12 rounds; AES-256: 256-bit key, 14 rounds.",
      explanation: "Increasing rounds with larger key sizes ensures that quantum (Grover's algorithm) and classical cryptanalysis remain computationally infeasible.",
      hint: "All use 128-bit blocks; rounds are 10, 12, and 14 for 128, 192, and 256-bit keys.",
      level: "basic",
      codeExample: "AES_Profiles = { 128: {'rounds': 10}, 192: {'rounds': 12}, 256: {'rounds': 14} };"
    }
  ],

  '002_004_cryptography-and-watermarking/topic5_files/topic5_questions.js': [
    {
      question: "What is the foundational concept of Asymmetric Key Cryptography?",
      shortAnswer: "Using mathematically linked key pairs: a Public Key (freely distributed for encryption/verification) and a Private Key (kept strictly confidential for decryption/signing).",
      explanation: "Messages encrypted with the public key can only be decrypted by the matching private key, completely solving the symmetric key distribution paradox.",
      hint: "Key pairs where data encrypted with the public key is decrypted only by the private key.",
      level: "basic",
      codeExample: "Ciphertext = Encrypt(Plaintext, PublicKey_Bob)\nPlaintext = Decrypt(Ciphertext, PrivateKey_Bob)"
    },
    {
      question: "What is a Trapdoor One-Way Function in asymmetric cryptography?",
      shortAnswer: "A mathematical function that is easy to compute in one direction, but practically impossible to reverse without a specific piece of secret information called the 'trapdoor'.",
      explanation: "For example, multiplying two 1024-bit primes is trivial (fractions of a millisecond); factoring their 2048-bit product back into primes without the trapdoor takes thousands of computing years.",
      hint: "Easy to compute forward, impossible to reverse without the secret trapdoor key.",
      level: "advanced",
      codeExample: "Forward: N = p * q (milliseconds) -> Reverse: Factor(N) -> p, q (thousands of years)"
    },
    {
      question: "How does the Diffie-Hellman Key Exchange (DH) protocol work over an insecure channel?",
      shortAnswer: "Two parties agree on a public prime p and base g, each generate private numbers (a, b), exchange public values (g^a mod p, g^b mod p), and arrive at identical shared secrets (g^(ab) mod p).",
      explanation: "An eavesdropper seeing g, p, g^a mod p, and g^b mod p cannot compute the shared secret without solving the Discrete Logarithm Problem.",
      hint: "Exchanging public exponentiations to arrive at a common secret via discrete logarithms.",
      level: "advanced",
      codeExample: "AliceSecret = (B**a) % p; BobSecret = (A**b) % p; assert AliceSecret == BobSecret"
    },
    {
      question: "What is Elliptic Curve Cryptography (ECC) and why does it outperform RSA in mobile and IoT devices?",
      shortAnswer: "ECC bases security on the algebraic structure of elliptic curves over finite fields (ECDLP), achieving equivalent security with much smaller key lengths (256-bit ECC ≈ 3072-bit RSA).",
      explanation: "Smaller keys drastically reduce RAM consumption, CPU cycles, and battery power, making ECC ideal for smartphones and smartcards.",
      hint: "Equivalent cryptographic strength with vastly smaller keys and lower power draw.",
      level: "moderate",
      codeExample: "ECC_Curve: y^2 = x^3 + ax + b (mod p) # Weierstrass elliptic curve form"
    },
    {
      question: "How do Digital Signatures provide Non-Repudiation?",
      shortAnswer: "A sender encrypts a message hash using their private key; because only the sender possesses that private key, they cannot later deny authoring the message.",
      explanation: "Anyone with the sender's public key can verify the signature. Successful verification legally and mathematically proves authorship and data integrity.",
      hint: "Signing with private key proves authorship since no one else possesses that key.",
      level: "moderate",
      codeExample: "Signature = Encrypt_RSA(SHA256(Message), PrivateKey_Alice)"
    },
    {
      question: "Why is Asymmetric Encryption rarely used to encrypt large bulk files directly?",
      shortAnswer: "Because asymmetric mathematical operations (modular exponentiation on large integers) are approximately 1,000 times slower than symmetric block ciphers like AES.",
      explanation: "Asymmetric algorithms encrypt only tiny payloads (like session keys or hashes); actual files are encrypted with symmetric ciphers in hybrid systems.",
      hint: "Asymmetric math is ~1000x slower than symmetric block ciphers.",
      level: "basic",
      codeExample: "SpeedComparison = { AES_256: '~500 MB/s (AES-NI)', RSA_4096: '~0.5 MB/s' };"
    }
  ],

  '002_004_cryptography-and-watermarking/topic6_files/topic6_questions.js': [
    {
      question: "Compare Symmetric vs Asymmetric encryption across Key Lengths for comparable security.",
      shortAnswer: "AES-128 provides security equivalent to RSA-3072; AES-256 provides security equivalent to RSA-15360 and ECC-512.",
      explanation: "Symmetric security scales directly with bit length (2^n brute-force), whereas RSA security scales sub-exponentially due to the General Number Field Sieve (GNFS) factoring algorithm.",
      hint: "128-bit symmetric key equals 3072-bit RSA key strength.",
      level: "moderate",
      codeExample: "Equivalences = { 'AES-128': 'RSA-3072 / ECC-256', 'AES-256': 'RSA-15360 / ECC-512' };"
    },
    {
      question: "What is a 'Hybrid Cryptosystem' and how does it combine the advantages of Symmetric and Asymmetric encryption?",
      shortAnswer: "It uses fast symmetric encryption (AES) with a randomly generated session key to encrypt bulk data, and uses asymmetric encryption (RSA/ECC) to securely transmit that session key.",
      explanation: "Combines the microsecond speed of AES with the zero-pre-shared-secret key distribution convenience of RSA/ECC (standard in HTTPS, SSH, PGP).",
      hint: "Encrypts data with fast symmetric AES; encrypts AES key with asymmetric RSA.",
      level: "basic",
      codeExample: "Payload = { EncryptedData: AES(Data, SessionKey), EncryptedKey: RSA(SessionKey, PubKey) }"
    },
    {
      question: "How does the computational complexity of key generation compare between AES and RSA?",
      shortAnswer: "AES key generation is trivial (reading 256 random bits from an entropy pool); RSA key generation requires finding two large probable prime numbers via probabilistic testing (Miller-Rabin), taking seconds.",
      explanation: "Prime searching involves generating large random integers and testing them repeatedly, consuming significant processing time on constrained devices.",
      hint: "AES generates random bits in nanoseconds; RSA searches for massive primes taking seconds.",
      level: "advanced",
      codeExample: "AES_KeyGen = os.urandom(32); # Instantaneous vs RSA_KeyGen generating primes p, q"
    },
    {
      question: "Which encryption type provides native Non-Repudiation and why?",
      shortAnswer: "Asymmetric cryptography, because the private key is held exclusively by one entity; symmetric keys are shared by both parties, so either party could have created the ciphertext.",
      explanation: "In symmetric cryptography, if Alice and Bob share key K, Bob cannot prove to a judge that Alice wrote a message, since Bob possesses the same key.",
      hint: "Asymmetric private keys are unique to the author, while symmetric keys are shared.",
      level: "moderate",
      codeExample: "NonRepudiation = AsymmetricOnly; // Shared symmetric keys cannot establish sole authorship"
    },
    {
      question: "How do key management requirements scale with user count in Symmetric vs Asymmetric systems?",
      shortAnswer: "Symmetric: requires n(n-1)/2 keys (quadratic scaling O(n^2)); Asymmetric: requires only 2n keys (linear scaling O(n)).",
      explanation: "For 1,000 users, symmetric encryption requires 499,500 distinct key pairs, whereas asymmetric requires only 2,000 keys (1 public + 1 private per user).",
      hint: "O(n^2) quadratic explosion for symmetric vs O(n) linear scaling for asymmetric.",
      level: "moderate",
      codeExample: "Users = 1000;\nSymKeys = (Users * (Users - 1)) / 2; // 499,500 keys\nAsymKeys = Users * 2; // 2,000 keys"
    },
    {
      question: "What quantum computing algorithms threaten Symmetric vs Asymmetric cryptography?",
      shortAnswer: "Shor's Algorithm completely breaks RSA and ECC in polynomial time; Grover's Algorithm speeds up brute-force attacks on AES by square root, effectively halving key security (AES-256 drops to 128-bit security).",
      explanation: "To survive quantum computers, asymmetric crypto must transition to Post-Quantum Cryptography (PQC: lattice-based Kyber/Dilithium), while AES-256 remains secure.",
      hint: "Shor's algorithm breaks RSA/ECC; Grover's algorithm halves symmetric bit security.",
      level: "advanced",
      codeExample: "QuantumThreat = { 'RSA-2048': 'Broken (Shor)', 'AES-256': 'Secure at 128-bit level (Grover)' };"
    },
    {
      question: "Tabulate the primary trade-offs between Symmetric and Asymmetric Cryptography.",
      shortAnswer: "Symmetric: very fast, high throughput, simple math, small keys, but difficult key distribution; Asymmetric: slower, complex math, larger keys, but enables easy public distribution and digital signatures.",
      explanation: "Neither replaces the other; modern security architectures combine them symbiotically.",
      hint: "Speed and bulk encryption (symmetric) vs key exchange and signatures (asymmetric).",
      level: "basic",
      codeExample: "Architecture = 'Use Asymmetric to negotiate SessionKey, then Symmetric for all data streaming';"
    }
  ],

  '002_004_cryptography-and-watermarking/topic7_files/topic7_questions.js': [
    {
      question: "What are the three fundamental security properties required of a Cryptographic Hash Function?",
      shortAnswer: "1. Pre-image Resistance (one-way: hard to find m given h(m)); 2. Second Pre-image Resistance (hard to find m2 != m1 such that h(m1) = h(m2)); 3. Collision Resistance (hard to find any m1, m2 such that h(m1) = h(m2)).",
      explanation: "These properties guarantee that hashes cannot be reversed, forged, or duplicated across differing data.",
      hint: "Pre-image resistance, second pre-image resistance, and collision resistance.",
      level: "advanced",
      codeExample: "HashProperties = ['PreimageResistance', 'SecondPreimageResistance', 'CollisionResistance'];"
    },
    {
      question: "What is the 'Avalanche Effect' in cryptographic hashing algorithms?",
      shortAnswer: "A property where flipping even a single input bit causes approximately 50% of the output hash bits to change drastically and unpredictably.",
      explanation: "Prevents cryptanalysts from inferring relationships between inputs based on output similarities.",
      hint: "Changing 1 bit in input causes ~50% of output hash bits to flip randomly.",
      level: "moderate",
      codeExample: "sha256('cat') -> 77af778b51...\nsha256('dat') -> 241ffae97b... # Completely different hash"
    },
    {
      question: "Why was MD5 deprecated and what was the significance of the 2008 Rogue CA demonstration?",
      shortAnswer: "MD5's collision resistance was completely shattered; in 2008, researchers generated an MD5 collision to create a counterfeit, valid intermediate SSL Certificate Authority trusted by browsers.",
      explanation: "Today MD5 collisions can be generated in seconds on a standard smartphone, making it completely unsafe for security or digital certificates.",
      hint: "Collision resistance broken, allowing creation of forged SSL certificates.",
      level: "moderate",
      codeExample: "md5('file1') == md5('file2') # Easily fabricated collision using HashClash"
    },
    {
      question: "What is the Birthday Paradox and how does it limit hash collision resistance?",
      shortAnswer: "Finding a collision among any two arbitrary inputs requires only ~2^(n/2) operations for an n-bit hash, rather than 2^n operations.",
      explanation: "Just as only 23 people are needed in a room for a 50% chance of shared birthdays, finding matching hashes requires testing the square root of total hash space.",
      hint: "Collision search takes 2^(n/2) operations instead of 2^n due to birthday probability.",
      level: "advanced",
      codeExample: "SHA1_Collision_Space = 2**(160/2) # 2^80 operations (achieved in 2017 SHAttered attack)"
    },
    {
      question: "What is an HMAC (Hash-based Message Authentication Code) and why is plain `H(Key + Message)` insecure?",
      shortAnswer: "HMAC is a keyed cryptographic hash: HMAC(K, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m)). Plain H(Key + Message) is vulnerable to Length Extension Attacks in Merkle-Damgård hashes.",
      explanation: "HMAC double-hashes data with inner and outer padding, preventing attackers from appending data and computing valid hashes without the secret key.",
      hint: "Keyed hash construction preventing Length Extension attacks.",
      level: "advanced",
      codeExample: "import hmac, hashlib\nmac = hmac.new(b'secret_key', b'message_data', hashlib.sha256).hexdigest()"
    },
    {
      question: "How does SHA-3 differ fundamentally in internal architecture from SHA-2?",
      shortAnswer: "SHA-2 uses the Merkle-Damgård iterative compression structure; SHA-3 uses the Keccak Sponge Construction (absorbing data into state, then squeezing output).",
      explanation: "Because SHA-3 uses sponge functions rather than Merkle-Damgård, it is inherently immune to length extension attacks without needing HMAC structures.",
      hint: "Keccak Sponge construction (absorb and squeeze) instead of Merkle-Damgard compression.",
      level: "advanced",
      codeExample: "sha3 = hashlib.sha3_256(b'data').hexdigest()"
    }
  ],

  '002_004_cryptography-and-watermarking/topic8_files/topic8_questions.js': [
    {
      question: "What are the two fundamental steps involved in creating a Digital Signature?",
      shortAnswer: "1. Compute a cryptographic hash (e.g. SHA-256) of the document; 2. Encrypt that hash using the sender's private key.",
      explanation: "Signing the short fixed-length hash rather than the massive document maximizes processing speed while preserving mathematical proof over the entire file.",
      hint: "Hash the document, then encrypt the hash with the sender's private key.",
      level: "basic",
      codeExample: "Hash = SHA256(Doc); Signature = RSA_Sign(Hash, PrivateKey_Signer);"
    },
    {
      question: "How does a recipient verify a Digital Signature?",
      shortAnswer: "1. Decrypt the signature using the sender's public key to recover the original hash; 2. Independently compute the hash of the received document; 3. Compare if both hashes match.",
      explanation: "If both hashes match, it proves that the document was authored by the sender and was not altered in transit by even a single bit.",
      hint: "Decrypt signature with sender's public key, compute document hash, and compare.",
      level: "moderate",
      codeExample: "RecoveredHash = RSA_Verify(Signature, PublicKey_Signer)\nassert RecoveredHash == SHA256(ReceivedDoc)"
    },
    {
      question: "What three security goals are achieved simultaneously by Digital Signatures?",
      shortAnswer: "1. Authentication (proves sender identity), 2. Integrity (detects unauthorized tampering), 3. Non-Repudiation (sender cannot deny signing).",
      explanation: "Digital signatures form the legal and technical backbone of e-commerce, banking transactions, and software package integrity.",
      hint: "Authentication, Integrity, and Non-Repudiation.",
      level: "basic",
      codeExample: "SignatureBenefits = ['Authentication', 'DataIntegrity', 'NonRepudiation'];"
    },
    {
      question: "What is the difference between RSA signatures and ECDSA (Elliptic Curve Digital Signature Algorithm)?",
      shortAnswer: "ECDSA uses elliptic curve discrete logarithms, generating equivalent cryptographic strength with substantially smaller keys and signatures (e.g. 64-byte ECDSA signature vs 256-byte RSA-2048 signature).",
      explanation: "Bitcoin, Ethereum, and modern TLS certificates use ECDSA (secp256k1 / secp256r1) or Ed25519 for compact, fast signatures.",
      hint: "ECDSA uses elliptic curves producing much smaller signatures with equivalent security.",
      level: "moderate",
      codeExample: "from ecdsa import SigningKey, SECP256k1\nsk = SigningKey.generate(curve=SECP256k1); sig = sk.sign(b'tx_data')"
    },
    {
      question: "Why must a cryptographically secure random number (k) NEVER be reused in DSA/ECDSA signatures?",
      shortAnswer: "Reusing the same random nonce k across two distinct signatures allows an attacker to compute the signer's private key directly with simple high-school algebra.",
      explanation: "In 2010, Sony's PlayStation 3 security was broken because Sony used a static, hardcoded constant for k in their ECDSA implementation.",
      hint: "Reusing k allows direct algebraic derivation of the private key (PS3 hack).",
      level: "advanced",
      codeExample: "k = (m1 - m2) / (s1 - s2) mod n; private_key = (s * k - m) / r mod n"
    },
    {
      question: "What is Ed25519 and why is it replacing standard ECDSA in modern protocols (SSH, Signal)?",
      shortAnswer: "An EdDSA digital signature scheme based on Curve25519 that provides high speed, immunity to timing side-channel attacks, and deterministic nonce generation (eliminating bad random number generator risks).",
      explanation: "Ed25519 generates signatures in fractions of a millisecond and is supported in modern OpenSSH keys.",
      hint: "Deterministic, timing-attack resistant signature algorithm using Curve25519.",
      level: "advanced",
      codeExample: "ssh-keygen -t ed25519 -C 'user@corp.com'"
    },
    {
      question: "How does Code Signing protect software distribution pipelines?",
      shortAnswer: "Software developers digitally sign executable binaries and installers; operating systems verify the signature against trusted root CAs before permitting execution.",
      explanation: "Windows Defender SmartScreen and macOS Gatekeeper block or warn users if an application is unsigned or if the binary was modified after signing.",
      hint: "Developers sign binaries so operating systems can verify origin and integrity.",
      level: "moderate",
      codeExample: "signtool sign /f certificate.pfx /p password /tr http://timestamp.digicert.com setup.exe"
    },
    {
      question: "What is a Blind Signature and where is it applied in privacy-preserving cryptography?",
      shortAnswer: "A digital signature where the content of the message is disguised (blinded) before signing, allowing an authority to certify a document without reading its content (used in digital voting and e-cash).",
      explanation: "Invented by David Chaum, blind signatures prove that a digital ballot was signed by election authorities without revealing which candidate the voter selected.",
      hint: "Authority signs a blinded document without viewing its contents (e-cash, voting).",
      level: "advanced",
      codeExample: "BlindedMessage = (m * r**e) % n # David Chaum blinding formula"
    }
  ],

  '002_004_cryptography-and-watermarking/topic9_files/topic9_questions.js': [
    {
      question: "What is Digital Watermarking and what is its primary technical objective?",
      shortAnswer: "Embedding a permanent digital signal (identifier, copyright code, or serial number) imperceptibly into digital media (image, audio, video) to prove ownership and trace unauthorized copies.",
      explanation: "Unlike encryption which only protects media during transit, watermarks remain permanently embedded inside the decoded media even after playback or display.",
      hint: "Embedding imperceptible copyright metadata directly into media files.",
      level: "basic",
      codeExample: "EmbeddedMedia = HostImage + alpha * WatermarkSignal"
    },
    {
      question: "What is the difference between a Robust Watermark and a Fragile Watermark?",
      shortAnswer: "A Robust watermark is engineered to survive hostile transformations (compression, cropping, rotation, filtering); a Fragile watermark is designed to be destroyed by any alteration, serving as a tamper detector.",
      explanation: "Robust watermarks protect copyright ownership; fragile watermarks detect whether a court evidence photo or medical image was edited.",
      hint: "Robust survives editing for copyright; fragile breaks on edits for tamper detection.",
      level: "moderate",
      codeExample: "WatermarkTypes = { Robust: 'Survives JPEG compression', Fragile: 'Destroys on 1-pixel edit' };"
    },
    {
      question: "How does Spatial Domain Watermarking (e.g. Least Significant Bit - LSB) work?",
      shortAnswer: "By directly modifying the lowest-order bit values of pixel color bytes (e.g. changing 11010110 to 11010111) to embed watermark bitstreams.",
      explanation: "Because human visual perception cannot differentiate a 1/256th change in color luminosity, the modification is completely invisible to the eye.",
      hint: "Modifying the lowest-order bit of image pixels to store hidden bits.",
      level: "moderate",
      codeExample: "pixel_byte = (pixel_byte & 0xFE) | watermark_bit # LSB insertion"
    },
    {
      question: "What is the primary vulnerability of Spatial Domain (LSB) watermarking?",
      shortAnswer: "Extreme vulnerability to lossy compression (JPEG), geometric cropping, resizing, and noise filtering, which destroys the lowest-order bit planes.",
      explanation: "A simple JPEG compression cycle quantizes high-frequency data, completely wiping out LSB watermarks.",
      hint: "Easily destroyed by JPEG compression, cropping, or resizing.",
      level: "moderate",
      codeExample: "# Lossy compression wipes LSB:\nimg.save('output.jpg', quality=85) # LSB watermark erased"
    },
    {
      question: "How does Frequency Domain Watermarking (DCT / DWT) achieve superior robustness?",
      shortAnswer: "By applying mathematical transforms (Discrete Cosine Transform or Discrete Wavelet Transform) to embed the watermark in middle-frequency coefficients of the image.",
      explanation: "Middle-frequency coefficients survive JPEG compression and cropping without creating visible visual distortions that high or low frequencies would produce.",
      hint: "Embedding watermarks in middle-frequency coefficients using DCT or DWT.",
      level: "advanced",
      codeExample: "dct_coeffs = scipy.fftpack.dct(image_block);\ndct_coeffs[middle_band] += alpha * watermark_vector;"
    },
    {
      question: "What is Blind vs Non-Blind Watermark Extraction?",
      shortAnswer: "Blind extraction recovers the embedded watermark without needing the original unwatermarked host image; Non-Blind extraction requires the original host image as a baseline reference.",
      explanation: "Blind extraction is practically preferred because copyright authorities do not need to maintain petabyte databases of pristine original media to verify ownership.",
      hint: "Extracting watermark without original image (blind) vs needing original (non-blind).",
      level: "moderate",
      codeExample: "Watermark = BlindDetector(WatermarkedImage, SecretKey) # No original image required"
    },
    {
      question: "What is 'Fingerprinting' (Forensic Watermarking) in streaming platforms like Netflix and Hollywood screeners?",
      shortAnswer: "Embedding a unique recipient-specific serial watermark into each user's video stream, allowing studios to trace leaked pirate rips directly to the subscriber who recorded it.",
      explanation: "If a pre-release screener is leaked online, analyzing the forensic watermark reveals the exact account ID, time, and IP address of the leaker.",
      hint: "Unique watermarks embedded per user to trace leaked video streams back to the leaker.",
      level: "moderate",
      codeExample: "ForensicWatermark = { SubscriberID: 'usr_849201', SessionTimestamp: 1718294021 };"
    },
    {
      question: "What is the Stirmark benchmark in digital watermarking evaluation?",
      shortAnswer: "A standard benchmark software suite that subjects watermarked images to geometric distortions, rotation, cropping, jitter, and compression to test watermark survivability.",
      explanation: "Developed in the late 1990s, Stirmark established rigorous robustness testing criteria for commercial digital rights management (DRM) technologies.",
      hint: "Benchmark suite stress-testing watermark survival against image manipulation.",
      level: "advanced",
      codeExample: "stirmark -attack all -input watermarked.bmp -output tested_samples/"
    }
  ],

  '002_004_cryptography-and-watermarking/topic10_files/topic10_questions.js': [
    {
      question: "Compare Cryptography, Steganography, and Digital Watermarking in terms of visibility and objective.",
      shortAnswer: "Cryptography scrambles content (visible, hides meaning); Steganography conceals existence of communication (invisible, hides presence); Watermarking protects ownership/integrity (invisible, permanent attachment).",
      explanation: "In cryptography, an interceptor knows data is encrypted; in steganography, the interceptor does not know secret data exists at all.",
      hint: "Hiding meaning (crypto), hiding existence (stego), proving ownership (watermarking).",
      level: "basic",
      codeExample: "Comparison = { Crypto: 'Scrambled text', Stego: 'Secret message in cat photo', Watermark: 'Copyright code in media' };"
    },
    {
      question: "What is 'Steganalysis' and what is Chi-Square analysis in steganalysis?",
      shortAnswer: "The science of detecting hidden messages within carrier files; Chi-Square analysis detects statistical imbalances in Pairs of Values (PoVs) caused by LSB bit embedding.",
      explanation: "Natural images have uneven counts of even/odd byte values; LSB embedding equalizes adjacent even/odd counts, creating a telltale statistical signature.",
      hint: "Detecting hidden steganographic data via statistical analysis of pixel bit planes.",
      level: "advanced",
      codeExample: "chi2_stat = sum(((even_count - odd_count)**2) / (even_count + odd_count))"
    },
    {
      question: "What is a 'Cover Object' and 'Stego Object' in steganographic terminology?",
      shortAnswer: "A Cover Object is the original innocent carrier file (image, MP3, carrier text); a Stego Object is the carrier file after the secret payload has been embedded.",
      explanation: "The goal of steganography is to ensure the Stego Object is indistinguishable from the Cover Object to human senses and statistical algorithms.",
      hint: "Innocent carrier file (cover) vs file containing hidden data (stego).",
      level: "basic",
      codeExample: "StegoImage = Embed(CoverImage, SecretPayload, StegoKey)"
    },
    {
      question: "How can Network Steganography conceal data within TCP/IP protocol headers?",
      shortAnswer: "By embedding secret bits inside unused or variable header fields, such as the TCP Initial Sequence Number (ISN), IP Identification field, or covert timing intervals.",
      explanation: "Covert channels transmit information across firewalls without triggering packet payload deep inspection sensors.",
      hint: "Hiding data inside TCP sequence numbers or packet arrival time delays.",
      level: "advanced",
      codeExample: "IP_Packet.id = ord(secret_char) # Embeds character byte into IP ID header field"
    },
    {
      question: "What is the tool `steghide` and how does it secure embedded payloads?",
      shortAnswer: "An open-source steganography program that embeds data in images and audio files, using graph theory and Rijndael (AES) encryption with a passphrase.",
      explanation: "Encrypting the payload before embedding ensures that even if steganalysis detects anomalous bits, the extractor cannot read the plaintext without the passphrase.",
      hint: "Command-line tool embedding encrypted payloads into images and WAV files.",
      level: "moderate",
      codeExample: "steghide embed -cf cover.jpg -ef secret.txt -p 'Passphrase123!'"
    },
    {
      question: "What is Linguistic Steganography and how do Spammimic tools operate?",
      shortAnswer: "Concealing secret messages inside natural language text, formatting, or spam emails that appear innocent to mail filters and human readers.",
      explanation: "Spammimic encodes binary data into the syntactic choices of generated commercial spam letters.",
      hint: "Hiding secret binary bits within the wording and syntax of natural text.",
      level: "moderate",
      codeExample: "spammimic_encode('Secret') -> 'Dear Friend, Special offer on luxury watches...'"
    },
    {
      question: "Can Cryptography and Steganography be combined for defense-in-depth?",
      shortAnswer: "Yes; the optimal methodology encrypts the sensitive file with AES-256 first, then embeds the resulting ciphertext into an innocent cover image using steganography.",
      explanation: "If steganography is uncovered, cryptography keeps the content undecipherable; if cryptography is scrutinized, steganography prevents the adversary from knowing the data exists.",
      hint: "Encrypt data first with AES, then embed the encrypted bytes into an image.",
      level: "basic",
      codeExample: "StegoData = StegoEmbed(CarrierImage, AES_Encrypt(Plaintext, Key))"
    },
    {
      question: "Why do malware authors (like APT groups) increasingly utilize Steganography in cyber attacks?",
      shortAnswer: "To download secondary exploit payloads and exfiltrate stolen credentials disguised as innocent JPEG or PNG files, bypassing perimeter DLP and antivirus inspection.",
      explanation: "Firewalls permit image downloads from corporate websites; decoding code hidden in image pixels executes malware undetected (known as Stegware).",
      hint: "Disguising malware payloads inside innocent image downloads to bypass firewalls.",
      level: "moderate",
      codeExample: "powershell -c \"$img = [Drawing.Bitmap]::FromFile('logo.png'); ... Invoke-Expression $extracted_code\""
    }
  ],

  '002_004_cryptography-and-watermarking/topic11_files/topic11_questions.js': [
    {
      question: "How does end-to-end encryption (E2EE) in WhatsApp and Signal operate?",
      shortAnswer: "Using the Signal Protocol (Double Ratchet Algorithm, ECDH, AES-256), keys are negotiated directly between user endpoints; intermediate server operators cannot decrypt chats.",
      explanation: "The Double Ratchet rotates cryptographic keys with every single message, guaranteeing both forward secrecy and break-in recovery.",
      hint: "Keys stay strictly on user phones; server operators cannot read messages.",
      level: "moderate",
      codeExample: "DoubleRatchet: KDF_Chain_Ratchet() executes per message to derive ephemeral key"
    },
    {
      question: "What is BitLocker Drive Encryption and how does it utilize TPM (Trusted Platform Module) chips?",
      shortAnswer: "Full volume disk encryption using AES-XTS; the Full Volume Encryption Key (FVEK) is sealed inside the motherboard's TPM chip and released only if platform boot integrity checks pass.",
      explanation: "If a laptop is stolen and the hard drive is removed, the drive cannot be decrypted without the motherboard's hardware TPM key.",
      hint: "Hardware TPM chip sealing full disk encryption keys against offline tampering.",
      level: "moderate",
      codeExample: "manage-bde -status C: # Checks BitLocker volume encryption status"
    },
    {
      question: "How does the Bitcoin Blockchain utilize Cryptographic Hashing and Digital Signatures?",
      shortAnswer: "Transactions are signed using ECDSA (secp256k1) to authorize spending; blocks are chained together and secured using SHA-256 Proof-of-Work mining.",
      explanation: "Changing any past transaction alters its SHA-256 hash, invalidating all subsequent block headers and making historical tampering computationally impossible.",
      hint: "ECDSA for spending authorizations; SHA-256 for block mining and chain integrity.",
      level: "basic",
      codeExample: "Block_Hash = SHA256(SHA256(PrevHash + MerkleRoot + Timestamp + Bits + Nonce))"
    },
    {
      question: "What role does Cryptography play in electronic passport (e-Passport) security?",
      shortAnswer: "The contactless RFID chip stores biometric data protected by Passive Authentication (SOD file signed by the issuing nation's root CA) and Basic Access Control (BAC).",
      explanation: "Border control readers verify the digital signature on the chip against ICAO public key directories to detect forged or cloned passports.",
      hint: "Digital signatures from national issuing CAs verifying RFID biometric chips.",
      level: "moderate",
      codeExample: "ICAO_PKD: Verifies Document Signer Certificate (DSC) against Country Signing CA (CSCA)"
    },
    {
      question: "How does DRM (Digital Rights Management) in Widevine and FairPlay protect streaming media?",
      shortAnswer: "Video files are encrypted with AES-128; decryption keys are delivered over secure channels and decoded inside protected hardware video decoders (Trusted Execution Environment - TEE).",
      explanation: "Even with root privileges on an Android phone or PC, the user cannot dump decrypted 4K video frames from hardware TEE memory.",
      hint: "Hardware TEE decoding AES-encrypted video frames to prevent pirated screen ripping.",
      level: "advanced",
      codeExample: "Widevine_Security_Level: 'L1 (Hardware TEE Decryption)' vs 'L3 (Software Fallback)'"
    },
    {
      question: "What is Homomorphic Encryption and how could it revolutionize cloud computing privacy?",
      shortAnswer: "A form of encryption that allows mathematical operations to be performed directly on encrypted data without ever decrypting it first: Enc(A) + Enc(B) = Enc(A + B).",
      explanation: "Enables organizations to upload confidential medical or financial records to third-party public clouds for AI analysis without exposing plaintext to cloud providers.",
      hint: "Computing mathematical queries on encrypted data without decrypting it.",
      level: "advanced",
      codeExample: "Encrypted_Result = Homomorphic_Add(Enc(5), Enc(10)); // Decrypts to 15"
    },
    {
      question: "What is Zero-Knowledge Proof (ZKP) in modern cryptographic authentication?",
      shortAnswer: "A cryptographic method enabling one party (Prover) to prove to another party (Verifier) that a statement is true without revealing any information beyond the statement's validity.",
      explanation: "For example, proving you know a password or are over 21 years old without revealing the password or your date of birth.",
      hint: "Proving knowledge of a secret without revealing the secret itself.",
      level: "advanced",
      codeExample: "zk-SNARK: Verify(Proof, PublicInput) -> True/False (Zero private data leaked)"
    },
    {
      question: "How does Ransomware misuse symmetric and asymmetric cryptography in real-world attacks?",
      shortAnswer: "It generates a random symmetric key (AES-256) to encrypt files rapidly, then encrypts that AES key with the attacker's embedded public key (RSA-2048), demanding ransom for the private key.",
      explanation: "Because only the cybercriminals hold the RSA private key, files cannot be decrypted even if victims reverse-engineer the ransomware binary.",
      hint: "Files encrypted with AES; AES key encrypted with attacker's public RSA key.",
      level: "moderate",
      codeExample: "for f in files: AES_encrypt(f, key); Encrypted_Key = RSA_Encrypt(key, Attacker_PubKey)"
    },
    {
      question: "What is a Hardware Security Module (HSM) and why are they mandated in banking systems?",
      shortAnswer: "A dedicated physical computing appliance designed to safeguard and manage digital keys, perform rapid cryptographic acceleration, and self-destruct keys if physical tampering is detected.",
      explanation: "HSMs (FIPS 140-2 Level 3/4 certified) enforce zero-plaintext leakage; private keys never leave the tamper-responsive silicon hardware die.",
      hint: "Physical tamper-resistant hardware storing cryptographic root keys for banks.",
      level: "moderate",
      codeExample: "HSM_Zeroize(): Physical probe detection instantly purges cryptographic keys"
    },
    {
      question: "How does the Indian UPI (Unified Payments Interface) protect financial transactions cryptographically?",
      shortAnswer: "Mobile app registration binds device SIM credentials via SMS cryptographic challenges; transactions require a 4 or 6-digit MPIN entered into an isolated NPCI cryptographic library that encrypts the PIN with NPCI public keys.",
      explanation: "Banking apps never see the user's plaintext MPIN; the encrypted packet routes directly to the National Payments Corporation of India (NPCI) for bank switch settlement.",
      hint: "Device SIM binding and hardware-isolated MPIN encryption routed to NPCI.",
      level: "moderate",
      codeExample: "NPCI_Payload = Encrypt(MPIN + DeviceID, NPCI_Public_Certificate)"
    }
  ]
};

// -----------------------------------------------------------------------------
// MODULE 002_005: RSA Algorithm & Public Key Infrastructure
// -----------------------------------------------------------------------------
const mod2_005 = {
  '002_005_rsa-algorithm/topic0_files/topic0_questions.js': [
    {
      question: "Who are the inventors of the RSA algorithm and in what year was it published?",
      shortAnswer: "Ron Rivest, Adi Shamir, and Leonard Adleman; published in 1977 at MIT (patented in 1983).",
      explanation: "Clifford Cocks at the British intelligence agency GCHQ discovered an equivalent system in 1973, but it was classified until 1997.",
      hint: "Rivest, Shamir, and Adleman at MIT in 1977.",
      level: "basic",
      codeExample: "Inventors = ['Ron Rivest', 'Adi Shamir', 'Leonard Adleman']; Year = 1977;"
    },
    {
      question: "What fundamental mathematical hard problem underpins the security of the RSA cryptosystem?",
      shortAnswer: "The Integer Factorization Problem: multiplying two large primes is trivial, but factoring their product n = p × q is computationally intractable.",
      explanation: "No known classical polynomial-time algorithm exists to factor large composite integers on classical computers.",
      hint: "The computational difficulty of factoring the product of two large prime numbers.",
      level: "basic",
      codeExample: "Factor(n) -> p, q # Sub-exponential complexity: General Number Field Sieve (GNFS)"
    },
    {
      question: "What are the components of the RSA Public Key and Private Key?",
      shortAnswer: "Public Key consists of the pair (e, n); Private Key consists of the pair (d, n) (where n is the modulus, e is public exponent, and d is private exponent).",
      explanation: "Modulus n is shared between both keys; e is public for encryption/verification, while d is kept confidential for decryption/signing.",
      hint: "Public key is (e, n); Private key is (d, n).",
      level: "basic",
      codeExample: "PublicKey = (e, n); PrivateKey = (d, n);"
    },
    {
      question: "What is Euler's Totient Function φ(n) and what is its formula when n = p × q for prime p and q?",
      shortAnswer: "φ(n) counts the number of positive integers up to n that are coprime to n. For primes p and q, φ(n) = (p - 1)(q - 1).",
      explanation: "Knowledge of φ(n) allows calculating the private exponent d; knowing n alone without p and q makes calculating φ(n) as hard as factoring n.",
      hint: "Euler totient formula: phi(n) = (p - 1) * (q - 1).",
      level: "moderate",
      codeExample: "phi = (p - 1) * (q - 1)"
    },
    {
      question: "What is the mathematical condition required between public exponent e and φ(n)?",
      shortAnswer: "gcd(e, φ(n)) = 1 (they must be coprime) and 1 < e < φ(n).",
      explanation: "Coprimality is mandatory to ensure that the modular multiplicative inverse d = e^(-1) mod φ(n) exists.",
      hint: "e and phi(n) must be coprime: gcd(e, phi(n)) == 1.",
      level: "moderate",
      codeExample: "assert math.gcd(e, phi) == 1 and 1 < e < phi"
    },
    {
      question: "What is the universally adopted standard value for public exponent e in modern RSA implementations?",
      shortAnswer: "65537 (0x10001, the 4th Fermat prime F4 = 2^16 + 1).",
      explanation: "65537 has only two '1' bits in binary (10000000000000001), requiring only 17 squarings and 1 multiplication, making public-key operations extremely fast while resisting low-exponent attacks.",
      hint: "65537 (0x10001), offering fast exponentiation and resistance to small-exponent attacks.",
      level: "moderate",
      codeExample: "RSA_Standard_e = 65537 # Binary: 0b10000000000000001"
    }
  ],

  '002_005_rsa-algorithm/topic1_files/topic1_questions.js': [
    {
      question: "What is Euler's Theorem in modular arithmetic and how does RSA rely on it?",
      shortAnswer: "If gcd(a, n) = 1, then a^(φ(n)) ≡ 1 (mod n). In RSA, this guarantees that (m^e)^d ≡ m^(ed) ≡ m^(1 + k·φ(n)) ≡ m (mod n).",
      explanation: "Euler's theorem mathematically proves that encrypting a message m with e and decrypting with d returns the exact original message m.",
      hint: "a^phi(n) = 1 mod n, proving that m^(ed) returns original plaintext m.",
      level: "advanced",
      codeExample: "m**(e * d) % n == m # Fundamental RSA algebraic identity"
    },
    {
      question: "How does the Extended Euclidean Algorithm compute the private exponent d?",
      shortAnswer: "It finds integers d and k that satisfy Bézout's identity: e · d + φ(n) · k = 1, which gives e · d ≡ 1 (mod φ(n)).",
      explanation: "d is the modular multiplicative inverse of e modulo φ(n).",
      hint: "Finds the modular inverse d such that (e * d) mod phi(n) == 1.",
      level: "moderate",
      codeExample: "d = pow(e, -1, phi) # Python 3.8+ modular inverse"
    },
    {
      question: "Why must the prime factors p and q be kept strictly confidential?",
      shortAnswer: "Because anyone who knows p and q can trivially calculate φ(n) = (p-1)(q-1), and then immediately derive the private key d from public exponent e.",
      explanation: "Security of RSA collapses entirely once the prime factors p and q are exposed.",
      hint: "Knowing p and q allows instant computation of phi(n) and private key d.",
      level: "basic",
      codeExample: "if compromised(p, q): Attacker_d = pow(e, -1, (p-1)*(q-1))"
    },
    {
      question: "How are massive prime numbers (1024+ bits) generated for RSA keypairs?",
      shortAnswer: "By generating cryptographically random odd numbers and testing them for primality using probabilistic algorithms like the Miller-Rabin Primality Test.",
      explanation: "Testing an integer with 64 Miller-Rabin rounds with random bases reduces the probability of a composite passing as prime to less than 2^(-128).",
      hint: "Random number generation followed by Miller-Rabin probabilistic primality tests.",
      level: "advanced",
      codeExample: "while not miller_rabin(p, rounds=64): p = random_odd_1024_bit_int()"
    },
    {
      question: "What is Fermat's Little Theorem and how does it relate to Euler's Totient Theorem?",
      shortAnswer: "If p is prime, a^(p-1) ≡ 1 (mod p); Euler's Totient Theorem generalizes this to any composite integer modulus n via φ(n).",
      explanation: "Fermat's theorem is the special prime case of Euler's totient theorem where φ(p) = p - 1.",
      hint: "a^(p-1) = 1 mod p, the special prime case of Euler's totient theorem.",
      level: "moderate",
      codeExample: "assert pow(a, p - 1, p) == 1 # Fermat's Little Theorem"
    },
    {
      question: "Why must primes p and q NOT be too close to each other (|p - q| must be large)?",
      shortAnswer: "If p and q are close, Fermat's Factorization Method can quickly factor n by testing numbers near sqrt(n), breaking the private key in minutes.",
      explanation: "Fermat's method expresses n as a difference of squares: n = x^2 - y^2 = (x - y)(x + y). When p ≈ q, x is very close to sqrt(n).",
      hint: "Fermat's factorization method trivially factors n if p and q are close to sqrt(n).",
      level: "advanced",
      codeExample: "x = math.isqrt(n) + 1; while not is_square(x**2 - n): x += 1"
    },
    {
      question: "What is a 'Safe Prime' and why is it recommended in cryptographic parameter generation?",
      shortAnswer: "A prime number of the form p = 2q + 1, where q is also a prime (Sophie Germain prime); it ensures that (p - 1) has a large prime factor, defeating Pollard's p - 1 factoring.",
      explanation: "If (p - 1) consists entirely of small prime factors (smooth number), Pollard's p - 1 algorithm factors n with minimal effort.",
      hint: "Prime of the form p = 2q + 1 where q is also prime, preventing Pollard p-1 attacks.",
      level: "advanced",
      codeExample: "is_safe_prime = is_prime(p) and is_prime((p - 1) // 2)"
    },
    {
      question: "Why can the message integer m NOT be greater than or equal to the modulus n in RSA?",
      shortAnswer: "Because all calculations occur modulo n; if m >= n, decryption computes m mod n, losing the higher-order value of m.",
      explanation: "RSA operates strictly on the finite field Z_n; plaintexts must satisfy 0 <= m < n.",
      hint: "Plaintext integer m must be strictly less than modulus n: 0 <= m < n.",
      level: "basic",
      codeExample: "assert 0 <= m < n, 'Message exceeds modulus size!'"
    },
    {
      question: "What is the Chinese Remainder Theorem (CRT) optimization in RSA private key operations?",
      shortAnswer: "A mathematical technique that splits the calculation m = c^d mod n into two smaller calculations: mod p and mod q, speeding up RSA private key operations by ~4x.",
      explanation: "Because p and q are half the bit length of n, computing modular exponentiations on half-sized moduli provides a massive performance boost.",
      hint: "Splitting computation modulo p and q to speed up RSA private key ops by ~4x.",
      level: "advanced",
      codeExample: "m1 = pow(c, d % (p - 1), p); m2 = pow(c, d % (q - 1), q); m = CRT(m1, m2)"
    },
    {
      question: "How does the General Number Field Sieve (GNFS) algorithm impact RSA key length choices?",
      shortAnswer: "GNFS is the fastest known classical factoring algorithm, factoring n in sub-exponential time; this forces RSA keys to be at least 2048 bits today (and 3072+ for long-term security).",
      explanation: "GNFS complexity scales as O(exp(c · (ln n)^(1/3) · (ln ln n)^(2/3))), making 1024-bit RSA crackable by well-funded adversaries.",
      hint: "Sub-exponential factoring algorithm forcing modern RSA keys to 2048+ bits.",
      level: "advanced",
      codeExample: "NIST_Recommendation: 'RSA-1024 deprecated in 2013; minimum 2048-bit required.'"
    }
  ],

  '002_005_rsa-algorithm/topic2_files/topic2_questions.js': [
    {
      question: "What is Modular Congruence in number theory?",
      shortAnswer: "Two integers a and b are congruent modulo n (written a ≡ b mod n) if their difference (a - b) is divisible by n.",
      explanation: "Equivalently, both a and b yield identical remainders when divided by positive integer n.",
      hint: "a and b leave the same remainder when divided by modulus n.",
      level: "basic",
      codeExample: "assert (38 % 12) == (14 % 12) # 38 = 14 mod 12 (both remainder 2)"
    },
    {
      question: "What is the Modular Multiplicative Inverse?",
      shortAnswer: "An integer x such that (a · x) ≡ 1 (mod m); in RSA, the private exponent d is the modular multiplicative inverse of e modulo φ(n).",
      explanation: "The inverse exists if and only if a and m are coprime (gcd(a, m) = 1).",
      hint: "Integer x such that (a * x) mod m == 1.",
      level: "moderate",
      codeExample: "(e * d) % phi == 1"
    },
    {
      question: "How does Modular Exponentiation (Square-and-Multiply) prevent integer overflow during RSA calculations?",
      shortAnswer: "By reducing intermediate results modulo n after every single squaring and multiplication operation, keeping numbers from exceeding n^2.",
      explanation: "Calculating m^e first on 2048-bit numbers would produce an integer with hundreds of thousands of digits, exhausting computer memory. Modular exponentiation keeps memory usage negligible.",
      hint: "Applying modulo n after each step to prevent massive integer expansion.",
      level: "moderate",
      codeExample: "pow(base, exp, mod) # Python internal binary square-and-multiply"
    },
    {
      question: "Why is division NOT a standard operation in modular arithmetic?",
      shortAnswer: "Because integers modulo n do not form a field unless n is prime; 'division by b' is executed by multiplying by the modular multiplicative inverse b^(-1) mod n.",
      explanation: "If gcd(b, n) != 1, the inverse does not exist and division is undefined.",
      hint: "Division is performed by multiplying by the modular inverse b^(-1) mod n.",
      level: "advanced",
      codeExample: "def mod_div(a, b, m): return (a * pow(b, -1, m)) % m"
    },
    {
      question: "Calculate the modular multiplicative inverse of 3 modulo 11.",
      shortAnswer: "4, because (3 × 4) = 12 ≡ 1 (mod 11).",
      explanation: "Testing values: 3×1=3, 3×2=6, 3×3=9, 3×4=12 ≡ 1 mod 11.",
      hint: "Find x such that (3 * x) mod 11 == 1.",
      level: "basic",
      codeExample: "pow(3, -1, 11) == 4"
    },
    {
      question: "Calculate the modular multiplicative inverse of 7 modulo 26.",
      shortAnswer: "15, because (7 × 15) = 105 = (4 × 26) + 1 ≡ 1 (mod 26).",
      explanation: "7 and 26 are coprime (gcd=1); Extended Euclidean algorithm yields 7(-11) + 26(3) = 1; -11 mod 26 = 15.",
      hint: "Find x such that (7 * x) mod 26 == 1.",
      level: "moderate",
      codeExample: "pow(7, -1, 26) == 15"
    },
    {
      question: "What happens if you attempt to calculate modular inverse when gcd(a, m) != 1?",
      shortAnswer: "A modular inverse does not exist; mathematical algorithms fail or throw an exception.",
      explanation: "For example, 4 mod 6 has no inverse because no multiple of 4 can ever yield a remainder of 1 when divided by 6 (multiples of 4 are always even, while 6k + 1 is always odd).",
      hint: "No inverse exists; throws ValueError because numbers share common factors.",
      level: "moderate",
      codeExample: "# pow(4, -1, 6) -> ValueError: base is not invertible for the given modulus"
    },
    {
      question: "How does Montgomery Multiplication optimize modular arithmetic in hardware cryptographic chips?",
      shortAnswer: "It replaces slow division-based remainder operations with fast binary bitwise shifts and additions by transforming numbers into Montgomery representation.",
      explanation: "Critical for smartcards and HSMs that lack dedicated multi-word hardware division circuits.",
      hint: "Transforms numbers to replace division with fast bit shifts and additions.",
      level: "advanced",
      codeExample: "MontgomeryForm(x) = (x * R) % n # Accelerates modular exponentiation loops"
    },
    {
      question: "What is Bézout's Identity and how is it used in RSA key generation?",
      shortAnswer: "For any integers a and b with gcd(a, b) = d, there exist integers x and y such that a·x + b·y = d. In RSA, e·d + φ(n)·y = 1.",
      explanation: "The Extended Euclidean Algorithm calculates the coefficients x and y; taking x mod φ(n) directly yields private exponent d.",
      hint: "ax + by = gcd(a, b), used to extract inverse d from Extended Euclidean algorithm.",
      level: "advanced",
      codeExample: "gcd, d, _ = extended_gcd(e, phi); d = d % phi"
    },
    {
      question: "What is the time complexity of the Extended Euclidean Algorithm for two n-bit integers?",
      shortAnswer: "O(n^2) bit operations (or O(log(min(a, b))) divisions).",
      explanation: "Extremely fast, executing in a fraction of a millisecond even on 4096-bit integers.",
      hint: "O(log(min(a, b))) iterations, completing in milliseconds.",
      level: "moderate",
      codeExample: "ExecutionTime = '< 0.001 seconds for 4096-bit modulus'"
    },
    {
      question: "Why is modular reduction distributive across addition and multiplication?",
      shortAnswer: "(a + b) mod n = ((a mod n) + (b mod n)) mod n, and (a · b) mod n = ((a mod n) · (b mod n)) mod n.",
      explanation: "This ring homomorphism property allows intermediate values to be kept small throughout modular exponentiation.",
      hint: "Allows taking modulo before and after addition and multiplication.",
      level: "basic",
      codeExample: "assert ((a * b) % n) == (((a % n) * (b % n)) % n)"
    }
  ]
};

// Execute updates
console.log('=== EXPANDING MODULE 002_004 (Cryptography & Watermarking) ===');
Object.keys(mod2_004).forEach(relPath => {
  appendQuestions(relPath, mod2_004[relPath]);
});

console.log('\n=== EXPANDING MODULE 002_005 (RSA Algorithm) Part 1 ===');
Object.keys(mod2_005).forEach(relPath => {
  appendQuestions(relPath, mod2_005[relPath]);
});

console.log('\nBatch complete.');
