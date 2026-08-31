const questions = [
  {
    question: "What is a 'Cryptographic Hash Function', and what are its two fundamental mathematical characteristics?",
    shortAnswer: "A deterministic mathematical algorithm mapping an arbitrary-length input to a fixed-length digest ($H: \\{0, 1\\}^* \\to \\{0, 1\\}^n$), such that the mapping is irreversible (one-way) and collision-resistant.",
    explanation: "A cryptographic hash function compresses any variable-size data (from 1 byte to a 100 GB database) into a fixed-length string of bits (e.g. exactly 256 bits for SHA-256). Its two defining characteristics are: 1. Determinism: The exact same input message will always produce the identical hash digest; 2. Fixed-Length Compression: Regardless of input size, the output length is constant, exhibiting uniform pseudo-random distribution.",
    hint: "Think of an irreversible digital fingerprint machine that turns any book or photo into a unique 64-character code.",
    level: "basic",
    codeExample: `// Hash Function Mapping:
H("Kolkata") = 4a8b9f... (Exactly 256 bits)
H("A 100-Gigabyte Database Backup...") = e3c12d... (Exactly 256 bits!)`
  },
  {
    question: "What are the three essential security properties that define a cryptographically secure hash function?",
    shortAnswer: "1. Preimage Resistance (One-Way), 2. Second Preimage Resistance (Weak Collision Resistance), 3. Collision Resistance (Strong Collision Resistance).",
    explanation: "A secure hash function must satisfy: 1. Preimage Resistance: Given hash $h$, it is computationally infeasible to find any message $m$ such that $H(m) = h$ ($O(2^n)$ work factor); 2. Second Preimage Resistance: Given message $m_1$, it is computationally infeasible to find a different message $m_2 \\neq m_1$ such that $H(m_1) = H(m_2)$ ($O(2^n)$ work factor); 3. Collision Resistance: It is computationally infeasible to find ANY arbitrary pair $(m_1, m_2)$ such that $H(m_1) = H(m_2)$ ($O(2^{n/2})$ work factor).",
    hint: "Recall the 3 properties: Cannot invert the hash, cannot match a target message, and cannot find any two colliding messages.",
    level: "moderate",
    codeExample: `// The 3 Security Properties:
1. Preimage Resistance:        Given h → Find m such that H(m) = h (Difficulty: 2^256)
2. Second Preimage Resistance: Given m1 → Find m2 != m1 such that H(m2) = H(m1) (Difficulty: 2^256)
3. Collision Resistance:       Find ANY m1, m2 such that H(m1) = H(m2) (Difficulty: 2^128)`
  },
  {
    question: "Why does the 'Birthday Paradox' reduce the computational complexity of finding a collision in an $n$-bit hash function from $2^n$ to $2^{n/2}$?",
    shortAnswer: "Finding ANY two colliding messages among all possibilities requires only $\\approx \\sqrt{2^n} = 2^{n/2}$ evaluations, because the number of comparisons grows quadratically with the number of generated hashes.",
    explanation: "In probability theory, the Birthday Paradox shows that in a group of only 23 people, there is a >50% probability that two people share a birthday (even though there are 365 possible days). Similarly, for an $n$-bit hash function with $2^n$ possible outputs, a cryptanalyst generating random messages only needs to generate $\\approx \\sqrt{2^n} = 2^{n/2}$ hashes before finding two matching outputs. For 128-bit MD5, a collision requires only $2^{64}$ attempts, making MD5 vulnerable to practical collision attacks.",
    hint: "Think about how finding two people in a room who share ANY birthday is much easier than finding someone who shares YOUR specific birthday.",
    level: "expert",
    codeExample: `// Birthday Bound Collision Complexity:
128-bit Hash (MD5):     sqrt(2^128) = 2^64 operations (Practical collision found in seconds!)
160-bit Hash (SHA-1):   sqrt(2^160) = 2^80 operations (SHAttered attack in 2017: 2^63.1)
256-bit Hash (SHA-256): sqrt(2^256) = 2^128 operations (Mathematically Impregnable!)`
  },
  {
    question: "What is the 'Avalanche Effect' in cryptographic hash functions, and what percentage of output bits should change when a single input bit is flipped?",
    shortAnswer: "A property where changing a single bit in the input causes a cascading pseudo-random change in approximately 50% of the output digest bits.",
    explanation: "If changing 1 bit in a file changes only a few bits in the hash, an attacker could use gradient search to reverse-engineer modifications. In modern hash functions like SHA-256, iterative compression rounds (bitwise rotations, majority functions, and modular additions) ensure that flipping even 1 bit in the input flips ~128 out of 256 bits in the output, completely destroying any mathematical correlation between input and output.",
    hint: "Think of a small pebble rolling down a snow slope that triggers a giant avalanche reshaping the entire mountain.",
    level: "basic",
    codeExample: `// SHA-256 Avalanche Demonstration:
Input 1: "KolkataFinTech2026" → 4a8b9f12c7... (256 bits)
Input 2: "KolkataFinTech2027" → e3c12d90a5... (131 out of 256 bits flipped! ~51.2% change)`
  },
  {
    question: "Why is 'MD5' (Message Digest 5) completely broken and strictly forbidden for cryptographic integrity and digital signatures?",
    shortAnswer: "Practical collision attacks (discovered by Xiaoyun Wang in 2004) allow attackers to generate two different files (e.g. a benign program and a malware binary) with the exact same MD5 hash in milliseconds.",
    explanation: "Standardized in 1991 by Ron Rivest, MD5 produces a 128-bit digest. In 2004, Chinese cryptanalyst Xiaoyun Wang demonstrated chosen-prefix collision attacks against MD5. In 2012, the nation-state 'Flame' cyber weapon used MD5 hash collisions to forge fraudulent Microsoft Windows Update code-signing certificates. Today, generating an MD5 collision takes under 1 second on a standard laptop, rendering MD5 completely insecure for security applications.",
    hint: "Remember the historic breakthrough in 2004 that destroyed MD5 collision resistance forever.",
    level: "basic",
    codeExample: `// MD5 Collision Vulnerability (Flame Malware):
File A (Benign Executable): MD5 = 79054025255fb1a26e4bc422aef54eb4
File B (Rogue Rootkit):     MD5 = 79054025255fb1a26e4bc422aef54eb4 (IDENTICAL HASH → TOTAL FAILURE!)`
  },
  {
    question: "What was the 'SHAttered Attack' (2017), and how did researchers generate the first real-world collision for 'SHA-1'?",
    shortAnswer: "Google and CWI Amsterdam generated two distinct PDF documents with different visual contents that produced the exact same 160-bit SHA-1 hash after $9 \\times 10^{18}$ computations.",
    explanation: "In February 2017, researchers published SHAttered, creating two PDFs (one displaying a blue background and the other a red background) that had identical SHA-1 hashes: `38762cf7f55934b34d179ae6a4c80cadccbb7f0a`. This proved that SHA-1 collision resistance had fallen below practical thresholds ($2^{63.1}$ operations), leading major web browsers, Git, and certificate authorities to deprecate SHA-1 globally.",
    hint: "Think of two different contracts with completely different text producing the exact same digital hash.",
    level: "moderate",
    codeExample: `// SHAttered SHA-1 Collision (2017):
PDF 1 (Valid Good Contract): SHA-1 = 38762cf7f55934b34d179ae6a4c80cadccbb7f0a
PDF 2 (Fraudulent Contract): SHA-1 = 38762cf7f55934b34d179ae6a4c80cadccbb7f0a`
  },
  {
    question: "What is the 'Merkle-Damgård Construction', and how does it process variable-length messages using iterative fixed-size compression functions?",
    shortAnswer: "It pads the message, divides it into fixed-size blocks (512 bits in SHA-256), and iteratively feeds each block along with the previous chaining variable into a one-way compression function $f$: $H_i = f(H_{i-1}, M_i)$.",
    explanation: "Invented independently by Ralph Merkle and Ivan Damgård in 1979, this construction underpins MD5, SHA-1, and SHA-2. The message is padded with `1000...` and appended with the 64-bit length. The initial chaining variable $H_0$ is loaded with fixed Initial Vectors (IVs). Each 512-bit message block $M_i$ is compressed: $H_i = f(H_{i-1}, M_i)$. The final chaining variable $H_t$ is the output hash digest. Merkle and Damgård proved that if the compression function $f$ is collision-resistant, the entire hash function is collision-resistant.",
    hint: "Think of pouring water into identical 512-ml measuring cups and mixing each cup sequentially with the previous bowl.",
    level: "expert",
    codeExample: `// Merkle-Damgård Iteration:
H_0 = Initial_Vector_Constants (IV)
H_1 = CompressionFunction( H_0, Block_1 )
H_2 = CompressionFunction( H_1, Block_2 )
...
H_t = CompressionFunction( H_{t-1}, Block_t ) → Final Hash Digest`
  },
  {
    question: "What is a 'Length Extension Attack', and why does it break naive message authentication constructions like $\\text{Hash}(Key || Message)$ on Merkle-Damgård hashes?",
    shortAnswer: "An attacker who knows $H(Key || M)$ and the length of $M$ can initialize the hash state with $H(Key || M)$ and append additional data $M'$ to compute a valid hash $H(Key || M || M')$ without knowing the secret key.",
    explanation: "In Merkle-Damgård hashes (MD5, SHA-1, SHA-256), the final hash output is the exact internal state of the compression function. If a server verifies requests with $\\text{Hash}(Key || Message)$, an attacker does not need to know $Key$. The attacker takes the hash digest, loads it into the internal registers ($H_0 \\dots H_7$), appends padding and malicious commands (e.g. `&admin=true`), and calculates the valid hash for the extended message, completely bypassing authentication. This flaw necessitated HMAC.",
    hint: "Think of jumping into the middle of a conveyor belt assembly line right where the previous worker left off.",
    level: "expert",
    codeExample: `// Length Extension Vulnerability:
Server calculates: Token = SHA256( SecretKey || "user=debangshu&role=guest" )
Attacker knows:    Token AND message length
Attacker computes: NewToken = SHA256_Extend( Token, "&role=admin" )
Server accepts:    Valid Token without attacker ever knowing SecretKey!`
  },
  {
    question: "What is 'HMAC' (Hash-based Message Authentication Code - RFC 2104), and how does its nested hashing structure $(\\text{Hash}(K \\oplus opad || \\text{Hash}(K \\oplus ipad || M)))$ permanently defeat length extension attacks?",
    shortAnswer: "HMAC hashes the message twice with two derived keys: an Inner Pad ($ipad$) and Outer Pad ($opad$); the outer hash absorbs the inner hash, preventing attackers from extending the internal state.",
    explanation: "Standardized by Bellare, Canetti, and Krawczyk in 1996, HMAC computes: $\\text{HMAC}(K, M) = H((K \\oplus opad) || H((K \\oplus ipad) || M))$ where $ipad = \\text{0x36}$ and $opad = \\text{0x5C}$ repeated to block size. Because the inner hash output is compressed and hashed a second time inside the outer key envelope, an attacker cannot append data to the inner message without knowing the secret key, completely neutralizing length extension attacks.",
    hint: "Think of sealing a confidential document inside an inner envelope, and then sealing that envelope inside an outer armored envelope.",
    level: "expert",
    codeExample: `// HMAC Mathematical Formulation:
K_inner = Key ⊕ 0x363636...36 (ipad)
K_outer = Key ⊕ 0x5C5C5C...5C (opad)
HMAC = SHA256( K_outer || SHA256( K_inner || Message ) )`
  },
  {
    question: "What is the 'SHA-3' (Keccak) family, and how does its 'Sponge Construction' differ fundamentally from the Merkle-Damgård structure of SHA-2?",
    shortAnswer: "SHA-3 uses a Sponge Construction with 'Absorbing' and 'Squeezing' phases over a 1600-bit state permutation ($f_{1600}$); it is immune to length extension attacks and shares zero mathematical lineage with SHA-2.",
    explanation: "Selected by NIST in 2015, SHA-3 (Keccak) departed from Merkle-Damgård. The Sponge Construction maintains a large 1600-bit state divided into Bitrate ($r$) and Capacity ($c$): 1. Absorbing Phase: Message blocks are XORed into the bitrate part and permuted through 24 rounds of Keccak-$f$; 2. Squeezing Phase: Output digest bits are extracted ('squeezed') from the bitrate state. Because the capacity part ($c$) is never exposed, SHA-3 is inherently immune to length extension attacks without needing HMAC.",
    hint: "Think of a sponge that absorbs liquid (message data) until saturated, and is then squeezed to release the output hash.",
    level: "expert",
    codeExample: `// SHA-3 Sponge Construction:
State: [ Rate (r bits) ] [ Capacity (c bits) ] (Total 1600 bits)
Absorbing: State[0..r] ⊕ Message_Block_i ──> [ Keccak-f Permutation ]
Squeezing: Output_Hash = State[0..r] (Capacity part stays hidden → Immune to Length Extension!)`
  },
  {
    question: "Under Section 65B of the Indian Evidence Act 1872 (and Bharatiya Sakshya Adhiniyam 2023), why is SHA-256 hashing mandatory when collecting digital forensic evidence?",
    shortAnswer: "Section 65B requires proof that digital evidence was not altered; generating and logging a SHA-256 hash at the moment of seizure establishes an immutable mathematical Chain of Custody admissible in Indian courts.",
    explanation: "Digital evidence (hard drives, CCTV footage, database logs) can be easily manipulated. When Indian cyber forensic investigators seize evidence under Section 65B of the Indian Evidence Act, they immediately calculate its SHA-256 hash. The hash is recorded in a legal Section 65B Certificate. In court, recalculating the hash proves that not a single bit has been altered or tampered with since the moment of seizure.",
    hint: "Remember the legal certificate in India that proves digital evidence has remained untouched and authentic.",
    level: "moderate",
    codeExample: `// Section 65B Forensic Chain of Custody:
1. Seizure: Forensic Image created → SHA-256: 4a8b9f12c7... (Recorded in Certificate)
2. Court Trial 2 Years Later: Image Hash Verified → SHA-256: 4a8b9f12c7... (100% Match → ADMISSIBLE EVIDENCE!)`
  },
  {
    question: "Why is standard fast hashing (SHA-256) strictly INSECURE for storing user passwords, and why must organizations use 'Memory-Hard Password Hash Functions' (Argon2id, Bcrypt)?",
    shortAnswer: "SHA-256 is designed to be blazingly fast in hardware (modern GPUs test >100 Billion SHA-256 hashes per second); Argon2id forces high RAM and CPU time consumption, making GPU brute-force cracking impossible.",
    explanation: "Fast cryptographic hash functions (SHA-256) are optimized for high-speed data verification. If an attacker steals a database of SHA-256 password hashes, a single RTX 4090 GPU can test 100,000,000,000 hashes per second, cracking 8-character passwords in minutes. Password hashing requires intentionally slow, memory-hard algorithms: Argon2id (winner of the Password Hashing Competition) requires gigabytes of RAM and thousands of iterations per attempt, reducing GPU cracking speeds from billions to just dozens per second.",
    hint: "Contrast a sports car engine designed for speed (SHA-256) with a heavy industrial vault door designed to open slowly (Argon2id).",
    level: "expert",
    codeExample: `// Password Hashing Security Comparison:
SHA-256 Password Hash: GPU Cracking Speed = 100,000,000,000 guesses/sec (VULNERABLE!)
Argon2id Password Hash: GPU Cracking Speed = 50 guesses/sec (Memory-Hard → 100% IMPREGNABLE!)`
  },
  {
    question: "What are the four internal logical functions used in each round of the SHA-256 compression algorithm?",
    shortAnswer: "1. Majority function ($Maj$), 2. Choice function ($Ch$), 3. Lowercase Sigma ($\\sigma_0, \\sigma_1$ for message scheduling), 4. Uppercase Sigma ($\\Sigma_0, \\Sigma_1$ for state compression).",
    explanation: "In SHA-256, each of the 64 rounds operates on eight 32-bit working variables ($a, b, c, d, e, f, g, h$): 1. $Ch(e, f, g) = (e \\wedge f) \\oplus (\\neg e \\wedge g)$ (Chooses bits of $f$ or $g$ depending on $e$); 2. $Maj(a, b, c) = (a \\wedge b) \\oplus (a \\wedge c) \\oplus (b \\wedge c)$ (Returns majority bit); 3. $\\Sigma_0(a) = \\text{ROTR}^2(a) \\oplus \\text{ROTR}^{13}(a) \\oplus \\text{ROTR}^{22}(a)$; 4. $\\Sigma_1(e) = \\text{ROTR}^6(e) \\oplus \\text{ROTR}^{11}(e) \\oplus \\text{ROTR}^{25}(e)$.",
    hint: "Recall the core bitwise logical operations: Choice, Majority, and Cyclic Bit Rotations.",
    level: "expert",
    codeExample: `// SHA-256 Core Logical Functions (C Macros):
#define CH(x, y, z)    (((x) & (y)) ^ (~(x) & (z)))
#define MAJ(x, y, z)   (((x) & (y)) ^ ((x) & (z)) ^ ((y) & (z)))
#define SIGMA0(x)      (ROTR32(x, 2) ^ ROTR32(x, 13) ^ ROTR32(x, 22))
#define SIGMA1(x)      (ROTR32(x, 6) ^ ROTR32(x, 11) ^ ROTR32(x, 25))`
  },
  {
    question: "What is a 'Rainbow Table Attack', and how does appending a random Cryptographic Salt to passwords before hashing defeat it?",
    shortAnswer: "A Rainbow Table is a pre-computed lookup table of billions of plaintext passwords and their corresponding hashes; a unique Salt ensures that identical passwords produce completely different hashes, rendering pre-computed tables useless.",
    explanation: "In an unsalted database, if 10,000 users have the password `Password123`, all 10,000 rows contain the exact same SHA-256 hash. An attacker uses pre-computed Rainbow Tables (which use reduction functions and hash chains) to reverse millions of hashes in seconds. A Salt (e.g. 128 bits of CSPRNG randomness) makes the input unique: $\\text{Hash}(\\text{Password} || \\text{Salt})$. Because each user has a unique salt, an attacker must generate a dedicated multi-terabyte rainbow table for each individual user, making large-scale attacks impossible.",
    hint: "Think of adding a unique secret pinch of spice to each person's recipe so no two cakes look or smell the same.",
    level: "moderate",
    codeExample: `// Salted Password Verification:
User A: Hash( "Password123" || "9f!k2@" ) → 4a8b9f...
User B: Hash( "Password123" || "3x#p8L" ) → e3c12d... (COMPLETELY DIFFERENT HASHES!)
Result: Pre-computed Rainbow Tables are 100% USELESS!`
  },
  {
    question: "How do 'Merkle Trees' (Hash Trees) use cryptographic hash functions to verify the integrity of large distributed datasets (e.g. Git, Blockchains)?",
    shortAnswer: "By organizing data blocks as leaf nodes and recursively hashing pairs of nodes up to a single 'Merkle Root' ($H_{root}$); verifying the integrity of any single data block requires only $O(\\log N)$ hash checks.",
    explanation: "In a Merkle Tree, each data block $D_i$ is hashed ($L_i = H(D_i)$). Parent nodes are formed by hashing pairs of children: $N_1 = H(L_1 || L_2)$. This continues hierarchically until reaching the Merkle Root ($H_{root}$). If any block in a 1-million-file Git repository or Bitcoin block is modified, the Merkle Root changes immediately. To prove that a specific transaction exists in a block of $N$ items, a client only needs an $O(\\log_2 N)$ 'Merkle Proof' audit path rather than downloading the entire dataset.",
    hint: "Think of a pyramid where the top stone's color depends on every single stone beneath it.",
    level: "expert",
    codeExample: `// Merkle Tree 4-Block Construction:
       [ Merkle Root = H( N1 || N2 ) ]
              /                 \\
     [ N1 = H(L1||L2) ]     [ N2 = H(L3||L4) ]
       /         \\            /         \\
  [ L1=H(D1) ] [ L2=H(D2) ] [ L3=H(D3) ] [ L4=H(D4) ]`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, how is 'Cryptographic Pseudonymization' (using HMAC-SHA256) used to protect customer Aadhaar numbers and financial identifiers in analytics data warehouses?",
    shortAnswer: "By replacing real customer identifiers (e.g. Aadhaar numbers) with HMAC-SHA256 tokens keyed by a secret KMS master key, allowing analytics processing without exposing plain personal data.",
    explanation: "The DPDP Act 2023 mandates technical safeguards for personal data. In analytics data pipelines, sensitive customer identifiers (Aadhaar numbers, bank account numbers) are passed through an HMAC function: $\\text{PseudoID} = \\text{HMAC-SHA256}(K_{KMS}, \\text{Aadhaar})$. Internal data scientists and AI models can correlate customer behaviors across datasets using the stable Pseudonym Token without ever viewing or storing real Aadhaar numbers, preventing data leaks.",
    hint: "Remember how keyed cryptographic hashing protects customer identities during big data analysis.",
    level: "moderate",
    codeExample: `// DPDP Act 2023 Pseudonymization Pipeline:
Raw Input:  Aadhaar Number = "9876-5432-1098"
KMS Key:    Secret 256-bit Master Key in HSM
Analytics:  Pseudo_ID = HMAC_SHA256( KMS_Key, "9876-5432-1098" ) → "d4e8c1...a9"
Result:     Data scientists analyze data safely with ZERO exposure of customer Aadhaar!`
  },
  {
    question: "What is 'Hash Collision' vs 'Hash Preimage', and which of the two is easier for a cryptanalyst to find in any hash function?",
    shortAnswer: "Hash Collision finds ANY $m_1 \\neq m_2$ such that $H(m_1) = H(m_2)$ (Difficulty: $2^{n/2}$); Preimage finds $m$ for a GIVEN $h$ (Difficulty: $2^n$); Finding a Collision is exponentially easier due to the Birthday Paradox.",
    explanation: "In a Preimage attack, the target hash $h$ is fixed by the defender, requiring the attacker to test $2^n$ messages on average. In a Collision attack, the attacker has complete freedom over both messages ($m_1$ and $m_2$). Because any pair that matches satisfies the condition, the Birthday Paradox reduces the search space to $2^{n/2}$. For SHA-256: finding a preimage requires $2^{256}$ operations, while finding a collision requires $2^{128}$ operations.",
    hint: "Think about matching a specific lottery number (Preimage: 1 in a million) versus finding any two people who bought the same lottery ticket (Collision: much higher probability).",
    level: "moderate",
    codeExample: `// Difficulty Comparison (SHA-256):
Preimage Attack (Target Fixed):     2^256 Operations = 1.15 x 10^77 (Astronomical)
Collision Attack (Any Match Valid): 2^128 Operations = 3.40 x 10^38 (Exponentially Easier, but still safe!)`
  },
  {
    question: "What is 'Git' Object Hashing, and why did the Git version control system migrate from SHA-1 to SHA-256?",
    shortAnswer: "Git addresses every commit, file blob, and tree by its cryptographic hash; the 2017 SHAttered attack on SHA-1 forced Git to adopt SHA-256 (Object Format sha256) to prevent malicious commit tampering and hash collisions.",
    explanation: "In Git, the entire repository integrity is anchored by Directed Acyclic Graphs (DAGs) of hash digests: `commit <hash>`, `tree <hash>`, `blob <hash>`. If an attacker could generate two files with the same SHA-1 hash (as demonstrated by SHAttered), they could replace verified open-source source code with a backdoor without altering the Git commit hash. Git introduced SHA-256 object formatting to ensure tamper-proof code provenance.",
    hint: "Think about the foundational commit ID in Git that uniquely identifies every snapshot of your source code.",
    level: "moderate",
    codeExample: `// Git SHA-256 Object Initialization:
git init --object-format=sha256 my_secure_repo
git commit -m "Initial commit"
// Generated Commit Hash: 8f3c9e11d4b08852f1c639a4e027d8... (64-character SHA-256 Digest!)`
  },
  {
    question: "Synthesizing Cryptographic Hash Functions: what is the master principle for deploying hashes in modern cybersecurity engineering?",
    shortAnswer: "Use SHA-256 / SHA-512 / SHA-3 for data integrity and legal chain of custody; use HMAC-SHA256 for message authentication; use Argon2id for password storage; and permanently ban MD5 and SHA-1.",
    explanation: "Cryptographic hash functions are the universal mathematical glue of information security. They enable digital signatures, blockchain consensus, tamper-evident forensic evidence under the Indian Evidence Act, and high-speed data integrity checks. Modern engineering requires choosing the right tool: SHA-256 for data verification, HMAC for keyed message authentication, and slow memory-hard Argon2id for passwords, while eliminating all legacy MD5 and SHA-1 implementations.",
    hint: "Conclude by recognizing how selecting the appropriate hash family ensures total integrity across data, passwords, and legal compliance.",
    level: "expert",
    codeExample: `// The Master Hash Deployment Blueprint:
Data Integrity & Forensics: SHA-256 / SHA-3 (FIPS 180-4 / FIPS 202)
Message Authentication:     HMAC-SHA256 (RFC 2104)
Password Storage:           Argon2id (Memory-Hard)
Deprecated & Banned:        MD5 & SHA-1 (ZERO TOLERANCE)`
  }
];

export default questions;
