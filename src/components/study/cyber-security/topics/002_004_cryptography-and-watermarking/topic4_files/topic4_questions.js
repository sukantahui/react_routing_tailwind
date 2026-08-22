const questions = [
  {
    question: "What is the 'Data Encryption Standard' (DES), and why is its 56-bit effective key length considered completely broken in modern computing?",
    shortAnswer: "DES is a 16-round Feistel block cipher with a 64-bit block size and 56-bit key; its $2^{56} \\approx 7.2 \\times 10^{16}$ search space is trivial to brute-force in hours on modern GPU hardware.",
    explanation: "Standardized as FIPS 46 in 1977, DES takes a 64-bit key where 8 bits are parity checks, leaving only 56 bits of true cryptographic entropy. In 1999, the Electronic Frontier Foundation (EFF) 'Deep Crack' machine brute-forced a DES key in 22 hours. Today, modern GPU clusters test billions of DES keys per second, recovering keys in under 1 hour, making standard DES completely obsolete.",
    hint: "Think about the total combinations of a 56-bit lock being small enough for modern computers to try every single combination in less than a day.",
    level: "basic",
    codeExample: `// DES Key Specifications:
Raw Key Input:   64 bits (8 bytes)
Parity Bits:     8 bits (1 bit per byte discarded during key expansion)
Effective Key:   56 bits (2^56 ≈ 7.2 x 10^16 keys -> Broken via GPU Brute Force)`
  },
  {
    question: "What is 'Triple-DES' (3DES / TDEA), and how does the 'Encrypt-Decrypt-Encrypt' (EDE) sequence provide backward compatibility with single DES?",
    shortAnswer: "3DES applies the sequence $C = E_{K3}( D_{K2}( E_{K1}( P ) ) )$; when $K_1 = K_2 = K_3$, the decryption step cancels the first encryption, resulting in standard single DES.",
    explanation: "Triple-DES was designed to extend the lifespan of DES without requiring new hardware. By using Encrypt-Decrypt-Encrypt: 1. $C_1 = E_{K1}(P)$; 2. $C_2 = D_{K2}(C_1)$; 3. $C = E_{K3}(C_2)$. If an organization configures all three keys to be identical ($K_1 = K_2 = K_3$), step 2 cancels step 1 ($D_K(E_K(P)) = P$), and step 3 produces standard single DES ($E_K(P)$), ensuring seamless backward compatibility with legacy 1970s hardware.",
    hint: "Think about turning a lock right, then left, then right: if all three steps use the same key, turning left cancels the first turn right.",
    level: "moderate",
    codeExample: `// 3DES Encrypt-Decrypt-Encrypt (EDE) Sequence:
Encryption: C = E_K3( D_K2( E_K1( P ) ) )
Decryption: P = D_K1( E_K2( D_K3( C ) ) )
Backward Compatibility: If K1 == K2 == K3 -> C = E_K( D_K( E_K( P ) ) ) = E_K( P ) (Single DES)`
  },
  {
    question: "What is the 'Sweet32 Attack' (CVE-2016-2183), and why did 64-bit block ciphers (3DES, Blowfish) suffer catastrophic collision vulnerability after $2^{32}$ blocks (~32 GB)?",
    shortAnswer: "Due to the Birthday Paradox, a 64-bit block cipher has a 50% probability of a ciphertext block collision after encrypting $\\sqrt{2^{64}} = 2^{32}$ blocks (~32 GB); colliding blocks leak plaintext XOR differences in CBC mode.",
    explanation: "In CBC mode, if two ciphertext blocks collide ($C_i = C_j$), their inputs to the block cipher must have been identical: $P_i \\oplus C_{i-1} = P_j \\oplus C_{j-1}$. Rearranging gives: $P_i \\oplus P_j = C_{i-1} \\oplus C_{j-1}$. An attacker sniffing a 3DES TLS connection transferring 32 GB of data recovers session cookies and authentication tokens. This forced NIST and the RBI to officially ban and deprecate 3DES globally in December 2023.",
    hint: "Think about the birthday paradox: in a room of only 23 people, there is a 50% chance two people share a birthday, even though there are 365 days in a year.",
    level: "expert",
    codeExample: `// Sweet32 Birthday Paradox Collision Formula:
Block Size: 64 bits
Collision Threshold: sqrt(2^64) = 2^32 blocks (32 GB of data)
Collision Equation: C_i == C_j  =>  P_i ⊕ P_j = C_{i-1} ⊕ C_{j-1} (Plaintext XOR Leaked!)`
  },
  {
    question: "What is the 'Advanced Encryption Standard' (AES / Rijndael), and what are its standard block size and supported key lengths?",
    shortAnswer: "AES (FIPS 197) is a Substitution-Permutation Network block cipher with a fixed 128-bit block size and three standardized key lengths: 128-bit (10 rounds), 192-bit (12 rounds), and 256-bit (14 rounds).",
    explanation: "Selected by NIST in 2001 after a 4-year international competition won by Belgian cryptographers Vincent Rijmen and Joan Daemen, AES replaced DES/3DES worldwide. AES operates on a $4 \\times 4$ byte matrix (the State matrix, representing 128 bits / 16 bytes). Unlike DES, AES is not a Feistel cipher; it transforms the entire 128-bit block simultaneously in every round using a Substitution-Permutation Network (SPN).",
    hint: "Remember that AES always operates on 128-bit blocks, regardless of whether the key is 128, 192, or 256 bits.",
    level: "basic",
    codeExample: `// AES Specification Matrix:
Block Size: 128 bits (16 bytes) - Constant across all variants
AES-128: Key = 128 bits (16 bytes) | Rounds = 10
AES-192: Key = 192 bits (24 bytes) | Rounds = 12
AES-256: Key = 256 bits (32 bytes) | Rounds = 14`
  },
  {
    question: "What are the four internal mathematical operations executed during each round of AES encryption?",
    shortAnswer: "1. `SubBytes` (Non-linear S-Box substitution), 2. `ShiftRows` (Cyclic row byte permutation), 3. `MixColumns` (Galois field matrix multiplication), 4. `AddRoundKey` (Bitwise XOR with round subkey).",
    explanation: "During each AES round (except the final round which omits `MixColumns`): 1. `SubBytes`: Replaces each byte using multiplicative inverse in Galois Field $GF(2^8)$ + affine mapping (Confusion); 2. `ShiftRows`: Cyclically shifts row 0 by 0, row 1 by 1, row 2 by 2, row 3 by 3 bytes (Diffusion); 3. `MixColumns`: Multiplies each column by a fixed matrix over $GF(2^8)$ (Diffusion); 4. `AddRoundKey`: XORs the 128-bit State matrix with the round subkey.",
    hint: "Recall the 4 steps: Substitute, Shift, Mix, and XOR Key.",
    level: "moderate",
    codeExample: `// AES Round Structure (Pseudocode):
void AES_Round(State &state, SubKey &round_key, bool is_final_round) {
    SubBytes(state);      // Step 1: S-Box Non-Linear Substitution (Confusion)
    ShiftRows(state);     // Step 2: Row-wise Cyclic Permutation (Diffusion)
    if (!is_final_round) {
        MixColumns(state);// Step 3: Column Linear Algebraic Mixing (Diffusion)
    }
    AddRoundKey(state, round_key); // Step 4: XOR with Key Schedule Material
}`
  },
  {
    question: "How does the `SubBytes` step in AES achieve non-linear confusion, and what Galois Field ($GF(2^8)$) mathematical transformation does it use?",
    shortAnswer: "It computes the multiplicative inverse of each byte in the Galois Field $GF(2^8)$ modulo the irreducible polynomial $m(x) = x^8 + x^4 + x^3 + x + 1$ (`0x11B`), followed by an affine transformation over $GF(2)$.",
    explanation: "The AES S-box is mathematically constructed to provide maximum algebraic complexity against differential and linear cryptanalysis. For any input byte $A$: 1. It calculates the multiplicative inverse $A^{-1}$ in $GF(2^8)$ with $0$ mapping to $0$; 2. It applies an invertible affine transformation: $B_i = A'_i \\oplus A'_{(i+4)\\bmod 8} \\oplus A'_{(i+5)\\bmod 8} \\oplus A'_{(i+6)\\bmod 8} \\oplus A'_{(i+7)\\bmod 8} \\oplus c_i$, where $c = \\text{0x63}$. This guarantees zero fixed points and zero opposite fixed points.",
    hint: "Think of computing 1 divided by the byte in finite field math, then scrambling the bits with a matrix formula.",
    level: "expert",
    codeExample: `// AES S-Box Transformation:
Input Byte: X in GF(2^8)
Step 1: Multiplicative Inverse: Y = X^(-1) in GF(2^8) (mod x^8 + x^4 + x^3 + x + 1)
Step 2: Affine Transformation:  Z = AffineMatrix * Y ⊕ 0x63
Output Byte: Z`
  },
  {
    question: "What is the exact cyclic byte displacement in the AES `ShiftRows` step, and why does it omit shifting Row 0?",
    shortAnswer: "Row 0 is shifted by 0 bytes; Row 1 is cyclically shifted left by 1 byte; Row 2 is cyclically shifted left by 2 bytes; Row 3 is cyclically shifted left by 3 bytes.",
    explanation: "The AES State matrix is arranged as 4 rows and 4 columns ($4 \\times 4 = 16$ bytes). In `ShiftRows`: Row 0: $[S_{0,0}, S_{0,1}, S_{0,2}, S_{0,3}] \\to$ No shift; Row 1: $[S_{1,0}, S_{1,1}, S_{1,2}, S_{1,3}] \\to [S_{1,1}, S_{1,2}, S_{1,3}, S_{1,0}]$; Row 2: Cyclically shifted left by 2 bytes; Row 3: Cyclically shifted left by 3 bytes. This ensures that bytes within the same column are dispersed across different columns for the subsequent `MixColumns` step.",
    hint: "Think of shifting each horizontal shelf by its row number (0, 1, 2, 3) to the left.",
    level: "moderate",
    codeExample: `// ShiftRows Matrix Transformation:
Before ShiftRows:      After ShiftRows:
[ s0  s4  s8  s12 ] -> [ s0   s4   s8   s12 ] (Shift 0)
[ s1  s5  s9  s13 ] -> [ s5   s9   s13  s1  ] (Shift 1)
[ s2  s6  s10 s14 ] -> [ s10  s14  s2   s6  ] (Shift 2)
[ s3  s7  s11 s15 ] -> [ s15  s3   s7   s11 ] (Shift 3)`
  },
  {
    question: "What mathematical matrix multiplication occurs during the AES `MixColumns` step, and why is it omitted in the final round?",
    shortAnswer: "Each 4-byte column is multiplied by a fixed circulant MDS matrix over $GF(2^8)$; it is omitted in the final round to make the decryption structure symmetrical to encryption.",
    explanation: "In `MixColumns`, each column vector is multiplied by a fixed matrix: $\\begin{bmatrix} 02 & 03 & 01 & 01 \\\\ 01 & 02 & 03 & 01 \\\\ 01 & 01 & 02 & 03 \\\\ 03 & 01 & 01 & 02 \\end{bmatrix} \\times \\begin{bmatrix} s_{0,c} \\\\ s_{1,c} \\\\ s_{2,c} \\\\ s_{3,c} \\end{bmatrix}$. This Maximum Distance Separable (MDS) matrix ensures that changing 1 input byte affects all 4 output bytes in that column. Omission in the final round allows `InvMixColumns` to align symmetrically during decryption without extra overhead.",
    hint: "Think of mixing four paint colors in a bucket so thoroughly that changing a drop of one color changes the shade of the entire mixture.",
    level: "expert",
    codeExample: `// MixColumns Matrix Multiplication in GF(2^8):
[ s'0 ]   [ 02  03  01  01 ]   [ s0 ]
[ s'1 ] = [ 01  02  03  01 ] * [ s1 ]
[ s'2 ]   [ 01  01  02  03 ]   [ s2 ]
[ s'3 ]   [ 03  01  01  02 ]   [ s3 ]`
  },
  {
    question: "Why was the 2-Key variant of 3DES ($K_1, K_2$) vulnerable to Meet-in-the-Middle attacks that reduced its effective security from 112 bits to only 80 bits?",
    shortAnswer: "Martin Hellman's Meet-in-the-Middle attack matches pre-computed forward encryptions $E_{K1}(P)$ with backward decryptions $D_{K2}(C)$ in a hash table, cracking 2-Key 3DES in $2^{80}$ operations.",
    explanation: "In 2-Key 3DES ($C = E_{K1}(D_{K2}(E_{K1}(P)))$), the nominal key length is 112 bits ($2 \\times 56$). However, an adversary with known plaintext-ciphertext pairs can perform a Meet-in-the-Middle attack: by pre-computing intermediate cipher values from both directions and storing them in RAM, the effective cryptographic work factor drops from $2^{112}$ to $2^{80}$ operations, falling below modern cryptographic thresholds.",
    hint: "Think of searching from two opposite ends towards a shared middle point in a hash table.",
    level: "expert",
    codeExample: `// 2-Key 3DES Work Factor:
Nominal Key Size:   56 + 56 = 112 bits
Meet-in-the-Middle: 2^80 Operations (Classified as INSECURE & Cryptographically Deprecated)`
  },
  {
    question: "Under the Reserve Bank of India (RBI) Cyber Security Directives, what is the statutory status of 3DES in Indian banking ATMs, POS terminals, and core switches?",
    shortAnswer: "3DES is officially banned and deprecated; all Scheduled Commercial Banks in India must mandatorily migrate PIN encryption and payment switches to AES-256 (or AES-128 minimum).",
    explanation: "Following NIST Special Publication 800-131A Rev 2 and RBI Master Directions on Cyber Security, 3DES was formally retired globally by December 31, 2023 due to Sweet32 64-bit collision attacks. All Indian banks, ATM networks (National Financial Switch - NFS), and payment gateways must use AES-256 with hardware HSMs to process customer debit/credit card PIN blocks and transaction packets.",
    hint: "Remember that 3DES is officially illegal for processing financial transactions in India.",
    level: "basic",
    codeExample: `// RBI Banking Regulatory Compliance:
Legacy Algorithm: 3DES / TDEA -> STATUS: BANNED / DEPRECATED (Dec 2023)
Mandated Standard: AES-256-GCM (Hardware HSM Enforced) -> STATUS: FULL COMPLIANCE`
  },
  {
    question: "What is the structural difference between the Feistel structure in DES and the Substitution-Permutation Network (SPN) in AES?",
    shortAnswer: "Feistel modifies only half the block (32 bits) in each round via XOR with an uninvertible round function $F$; SPN transforms the entire 128-bit block in parallel in every round using invertible algebraic steps.",
    explanation: "In a Feistel cipher (DES), the 64-bit block is split into $L$ and $R$. In round $i$: $L_i = R_{i-1}$ and $R_i = L_{i-1} \\oplus F(R_{i-1}, K_i)$. Only 32 bits are transformed per round, requiring 16 rounds for security. In an SPN cipher (AES), all 128 bits are transformed simultaneously across all rows and columns in every round (`SubBytes`, `ShiftRows`, `MixColumns`), achieving complete avalanche diffusion in only 10 rounds.",
    hint: "Contrast transforming only half a car at each assembly station (Feistel) versus painting and modifying the whole car simultaneously (SPN).",
    level: "expert",
    codeExample: `// Structural Comparison:
DES (Feistel): R_{i} = L_{i-1} ⊕ F(R_{i-1}, K_i)  [Only 50% of block modified per round]
AES (SPN):     State = AddRoundKey( MixColumns( ShiftRows( SubBytes( State ) ) ) ) [100% of block modified per round]`
  },
  {
    question: "What is an 'Initial Permutation' (IP) and 'Final Permutation' (FP / $IP^{-1}$) in DES, and why do they provide zero cryptographic security?",
    shortAnswer: "They are fixed, static bit-shuffling tables applied before Round 1 and after Round 16; because they involve zero key material and are completely public, they provide zero mathematical confusion or diffusion.",
    explanation: "In DES, the 64-bit plaintext is routed through an Initial Permutation ($IP$) table that reorganizes bit positions (e.g. bit 58 moves to bit 1). At the end of round 16, the Final Permutation ($FP = IP^{-1}$) inverts this shuffle. Because $IP$ and $FP$ contain no secret key bits and are fully known to everyone, cryptanalysts can bypass them instantly. They were originally included in 1977 solely to ease 1970s hardware circuit routing on 8-bit buses.",
    hint: "Think of an open, labeled cable organizer that routes wires in plain view without locking anything.",
    level: "moderate",
    codeExample: `// DES Initial Permutation (IP) Table Snippet:
// Bit 58 -> Pos 1, Bit 50 -> Pos 2, Bit 42 -> Pos 3...
// Has NO SECRET KEY -> Completely transparent to cryptanalysts!`
  },
  {
    question: "Why does AES-256 use 14 rounds while AES-128 uses 10 rounds?",
    shortAnswer: "To prevent advanced cryptanalytic attacks (like Biclique and Multidimensional Linear cryptanalysis) from penetrating deeper rounds as the key size and search space expand.",
    explanation: "When key length increases from 128 bits to 256 bits, the key search space expands to $2^{256}$. However, larger key schedules can introduce subtle algebraic relationships between subkeys. To maintain an insurmountable security margin where best-known attacks can only penetrate a fraction of the cipher (e.g. 7 rounds out of 14), NIST increased the round count to 14 for AES-256 and 12 for AES-192.",
    hint: "Think of adding extra reinforced steel layers to a heavier vault door to match its larger physical dimensions.",
    level: "moderate",
    codeExample: `// AES Round Count Hierarchy:
AES-128: 10 Rounds (Security Margin: ~3.5 Rounds unpenetrated)
AES-192: 12 Rounds (Security Margin: ~4.5 Rounds unpenetrated)
AES-256: 14 Rounds (Security Margin: ~6 Rounds unpenetrated -> Quantum Resistant)`
  },
  {
    question: "What is 'Biclique Cryptanalysis' (Bogdanov, Khovratovich, Rechberger, 2011), and why did it fail to break AES in any practical sense?",
    shortAnswer: "It reduced the computational complexity of cracking AES-128 from $2^{128}$ to $2^{126.1}$ (a minor theoretical speedup of factor 4); AES remains mathematically impregnable in practice.",
    explanation: "In 2011, cryptanalysts published the first key recovery attack faster than brute force on full 10-round AES-128. However, Biclique cryptanalysis only lowered the computational complexity from $2^{128}$ to $2^{126.1}$. Testing $2^{126.1}$ keys would still take billions of years on all global supercomputers combined. AES remains practically unbroken and computationally secure across all commercial and military domains.",
    hint: "Think of finding a theoretical shortcut that saves 1 minute on a 10-billion-year space voyage.",
    level: "expert",
    codeExample: `// Biclique Cryptanalysis Work Factor:
Theoretical Brute Force: 2^128 operations (3.4 x 10^38)
Biclique Attack:         2^126.1 operations (8.5 x 10^37)
Practical Impact:        ZERO (AES remains computationally impregnable!)`
  },
  {
    question: "What is 'AES-GCM' vs 'AES-CBC', and why does Google Chrome and modern TLS 1.3 mandate AES-GCM while deprecating AES-CBC?",
    shortAnswer: "AES-GCM provides integrated Authenticated Encryption with Associated Data (AEAD) in a single parallel hardware pass; AES-CBC requires separate unparallelized HMACs and is vulnerable to padding oracle attacks.",
    explanation: "AES-CBC processes blocks sequentially (Block $N$ depends on Block $N-1$), preventing multi-threaded CPU execution. Furthermore, CBC requires PKCS#7 padding, making it vulnerable to Lucky Thirteen and POODLE padding oracle attacks if integrity checks are flawed. AES-GCM operates on Counter mode (100% parallelizable) and calculates a Galois GMAC authentication tag ($T$), guaranteeing confidentiality and integrity simultaneously.",
    hint: "Contrast a single-file line where everyone must wait for the person in front, versus a parallel superhighway with automated security checkpoints.",
    level: "moderate",
    codeExample: `// Modern TLS 1.3 Cipher Suite:
TLS_AES_256_GCM_SHA384  -> High-Speed Parallel AEAD (Mandatory in TLS 1.3)
// TLS_RSA_WITH_AES_256_CBC_SHA -> FORBIDDEN & DEPRECATED in TLS 1.3!`
  },
  {
    question: "How does the 'Expansion Permutation' (E-Box) in DES expand a 32-bit half-block into 48 bits before XORing with the round subkey?",
    shortAnswer: "It duplicates 16 specific bits from adjacent positions in the 32-bit register to expand the data to 48 bits, matching the 48-bit length of the round subkey and driving the 8 S-Boxes.",
    explanation: "Inside the DES round function $F(R_{i-1}, K_i)$, the right half $R$ is 32 bits, but the round subkey $K_i$ is 48 bits. The Expansion Permutation ($E$-table) breaks the 32 bits into eight 4-bit nibbles. It appends the adjacent bit on the left and the adjacent bit on the right to each nibble, expanding each 4-bit group into 6 bits ($8 \\times 6 = 48$ bits). These 48 bits are XORed with $K_i$ and fed into eight $6 \\to 4$ S-Boxes.",
    hint: "Think of stretching a 32-seat train carriage by duplicating the end seats to fit 48 passengers.",
    level: "expert",
    codeExample: `// DES Expansion Permutation (E-Box):
32-bit Input: [ 4 bits ] [ 4 bits ] ... (8 blocks of 4 bits)
E-Box: Duplicates edge bits -> [ 6 bits ] [ 6 bits ] ... (8 blocks of 6 bits = 48 bits)
48-bit Expanded Data ⊕ 48-bit Round SubKey -> Feeds into 8 DES S-Boxes!`
  },
  {
    question: "What are 'DES S-Boxes', and what was the historic controversy regarding NSA involvement in their design parameters in 1976?",
    shortAnswer: "DES uses eight $6 \\to 4$ bit non-linear S-Boxes; critics feared the NSA had inserted a backdoor, but in 1990 it was revealed the NSA had secretly hardened the S-Boxes against Differential Cryptanalysis 15 years before its public discovery.",
    explanation: "When IBM designed DES (Lucifer), the NSA altered the S-box substitution tables. In 1990, Eli Biham and Adi Shamir publicly discovered Differential Cryptanalysis and found that any tiny change to the official DES S-box numbers made DES dramatically more vulnerable to differential attacks. The NSA had intentionally engineered the S-box constants to resist differential cryptanalysis, keeping the breakthrough classified for 15 years.",
    hint: "Remember the historic Cold War cryptology tale where suspected backdoor numbers were actually a classified defensive shield.",
    level: "expert",
    codeExample: `// DES S-Box Mechanics:
Input: 6 bits [ b1 b2 b3 b4 b5 b6 ]
Row Selection: Bits (b1, b6) -> Integer 0 to 3
Column Selection: Bits (b2, b3, b4, b5) -> Integer 0 to 15
Output: 4-bit value from 4x16 S-Box lookup table`
  },
  {
    question: "What is the computational throughput difference between AES-256-GCM executed with CPU hardware instructions (AES-NI) versus pure software execution?",
    shortAnswer: "Hardware AES-NI achieves throughputs of 5 to 10+ GB/s (consuming ~0.6 cycles per byte); pure software AES achieves only ~200 to 400 MB/s (consuming ~15-25 cycles per byte), a 15x to 25x performance leap.",
    explanation: "Software AES requires iterative bit-shifts, Galois field table lookups, and XOR operations in general-purpose CPU registers, consuming ~20 CPU cycles for every single byte encrypted. Hardware AES-NI implements dedicated pipelined execution units in the CPU silicon. With single-instruction multiple-data (SIMD) vector registers (`__m128i`), AES-NI processes 16 bytes per clock cycle, reaching over 8 GB/s on standard laptop CPUs.",
    hint: "Think of an electric bullet train on dedicated rails versus a bicycle riding over bumpy cobblestones.",
    level: "moderate",
    codeExample: `// Performance Benchmark Comparison:
Software AES-256: ~350 MB/s (High CPU utilization, cache timing risks)
Hardware AES-NI:  ~8,400 MB/s (8.4 GB/s, 0.6 cycles/byte, constant-time)`
  },
  {
    question: "Synthesizing Popular Symmetric Ciphers: what is the single most important architectural conclusion regarding DES, 3DES, and AES?",
    shortAnswer: "DES and 3DES are dead and legally banned due to small key spaces and Sweet32 64-bit block collisions; AES-256-GCM is the undisputed, mathematically invincible global gold standard for all modern symmetric encryption.",
    explanation: "The history of symmetric ciphers proves the relentless march of cryptanalysis and computing power. 56-bit DES fell to brute-force supercomputers; 64-bit 3DES fell to Sweet32 birthday collisions in high-bandwidth networks. AES-256 triumphed with its 128-bit block size, Substitution-Permutation Network, and 256-bit key space, providing an impregnable mathematical shield that remains secure even against quantum cryptanalytic attacks.",
    hint: "Conclude by recognizing the complete evolutionary triumph of AES-256-GCM over all legacy ciphers.",
    level: "expert",
    codeExample: `// The Symmetric Evolution Summary:
DES (1977, 56-bit Key, 64-bit Block)   -> BROKEN (GPU Brute Force)
3DES (1998, 112-bit Key, 64-bit Block) -> RETIRED (Sweet32 Collision Attack)
AES-256 (2001, 256-bit Key, 128-bit Block, SPN) -> GLOBAL GOLD STANDARD (UNBREAKABLE)`
  }
];

export default questions;
