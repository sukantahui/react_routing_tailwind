const questions = [
  {
    question: "What is 'Symmetric Key Cryptography' (Secret Key Cryptography), and what is its primary operational advantage over asymmetric cryptography?",
    shortAnswer: "A cryptosystem where the exact same secret key is used for both encryption and decryption; its primary advantage is extreme computational speed and high throughput (gigabytes per second via hardware acceleration).",
    explanation: "In symmetric cryptography, Alice and Bob share a single secret key $K$. Encryption is $C = E_K(P)$ and decryption is $P = D_K(C)$. Because symmetric algorithms (such as AES and ChaCha20) rely on simple bitwise XOR, byte substitutions, and permutations rather than heavy modular exponentiation with 4096-bit prime numbers, modern CPU hardware instructions (AES-NI) can process encrypted data at over 5-10 GB/s with near-zero latency.",
    hint: "Think of a physical lock that uses the exact same metal key to lock and unlock the front door.",
    level: "basic",
    codeExample: `// Symmetric Cryptography Mathematical Relationship:
Shared Secret Key: K
Encryption: C = E_K( Plaintext )
Decryption: P = D_K( Ciphertext ) = D_K( E_K( Plaintext ) ) = Plaintext`
  },
  {
    question: "What is the 'Key Distribution Problem' in symmetric cryptography, and why is it the fundamental dilemma of secret key encryption?",
    shortAnswer: "The dilemma of securely transmitting the shared secret key between communicating parties over an untrusted public network before any encrypted communication can take place.",
    explanation: "For Alice and Bob to communicate securely using symmetric encryption, they must already share the secret key $K$. But how do they exchange $K$ across an insecure internet without an eavesdropper intercepting it? If they already had a secure channel to transmit the key, they would not need encryption in the first place. This circular dilemma was historically resolved via physical couriers, and in modern times by Asymmetric Key Exchange (Diffie-Hellman / RSA) or Kerberos Key Distribution Centers (KDCs).",
    hint: "Think about sending a locked safe through the mail, but realizing you also need to mail the key to the same recipient.",
    level: "basic",
    codeExample: `// The Key Distribution Dilemma:
Alice wants to send Key K to Bob over the Internet.
Attacker (Mallory) intercepts Key K on the network wire.
Mallory can now decrypt 100% of all future symmetric ciphertexts!`
  },
  {
    question: "What is the $N(N-1)/2$ 'Key Scaling Crisis' in symmetric cryptography, and how many unique secret keys are required for a network of 1,000 corporate nodes?",
    shortAnswer: "The formula $K = \\frac{N(N-1)}{2}$ calculates the number of pairwise secret keys needed for $N$ users; for 1,000 nodes, exactly 499,500 unique secret keys must be generated and securely stored.",
    explanation: "If every pair of users in a network of size $N$ needs private communication, the total number of shared keys required is given by the combination formula $\\binom{N}{2} = \\frac{N(N-1)}{2}$. As enterprise networks scale, managing hundreds of thousands of individual pairwise keys becomes administratively impossible. For 1,000 nodes: $\\frac{1000 \\times 999}{2} = 499,500$ keys. In contrast, Asymmetric cryptography requires only $2N = 2,000$ keys (1 public + 1 private key per user).",
    hint: "Think about how many direct handshake lines are needed if every person in a stadium of 1,000 people must shake hands with everyone else.",
    level: "moderate",
    codeExample: `// Symmetric Key Growth Formula:
Total Keys = [ N * (N - 1) ] / 2
N = 10 Users   → 45 Keys
N = 100 Users  → 4,950 Keys
N = 1,000 Users → 499,500 Keys (Symmetric Key Scaling Nightmare!)`
  },
  {
    question: "What is a 'Key Distribution Center' (KDC), and how does the 'Kerberos' protocol authenticate users and distribute symmetric session keys using Tickets?",
    shortAnswer: "A trusted central server holding a master key for every user/service; Kerberos uses an Authentication Service (AS) and Ticket Granting Service (TGS) to issue short-lived, encrypted symmetric session tickets.",
    explanation: "Instead of $N(N-1)/2$ keys, a KDC requires only $N$ keys (each user shares 1 secret key with the KDC). In Kerberos: 1. User logs in and authenticates to the Authentication Service (AS), receiving a Ticket Granting Ticket (TGT) encrypted with the KDC's secret key; 2. When the user requests access to a file server, they present the TGT to the Ticket Granting Service (TGS); 3. The TGS issues a short-lived, encrypted Service Ticket containing an ephemeral symmetric session key shared between the user and the file server.",
    hint: "Think of an amusement park ticket booth that checks your ID once and gives you a wristband (TGT) to obtain ride tickets throughout the day.",
    level: "expert",
    codeExample: `// Kerberos 3-Tier KDC Flow:
1. Client ──[AS-REQ]──> KDC (Authentication Service)
2. KDC ──[AS-REP (TGT + Client Session Key)]──> Client
3. Client ──[TGS-REQ (TGT)]──> KDC (Ticket Granting Service)
4. KDC ──[TGS-REP (Service Ticket)]──> Client
5. Client ──[AP-REQ (Service Ticket)]──> Enterprise File Server`
  },
  {
    question: "What is a 'Stream Cipher', and how does it generate a pseudorandom keystream to encrypt plaintext bit-by-bit using bitwise XOR?",
    shortAnswer: "A symmetric cipher that expands a short key and nonce into an infinite pseudorandom keystream ($S$); encryption is bitwise XOR: $C_i = P_i \\oplus S_i$; decryption is identical: $P_i = C_i \\oplus S_i$.",
    explanation: "Stream ciphers (e.g. ChaCha20, Salsa20) model the One-Time Pad computationally. A Pseudorandom Keystream Generator takes a secret key $K$ and a nonce $N$ to generate a continuous sequence of pseudorandom bits $S_0, S_1, S_2\\dots$. Encryption simply XORs the plaintext bitstream with the keystream: $C = P \\oplus S$. Decryption exploits the XOR inverse property: $C \\oplus S = (P \\oplus S) \\oplus S = P \\oplus 0 = P$. Stream ciphers have zero latency and require no padding.",
    hint: "Think of an endless ribbon of random colors that you lay over your text to scramble each letter instantly as it is typed.",
    level: "moderate",
    codeExample: `// Stream Cipher Bitwise Mechanics:
Plaintext Bit (P):     1  0  1  1  0  0  1  0
Keystream Bit (S):     0  1  1  0  1  0  1  1
Ciphertext (C = P⊕S):  1  1  0  1  1  0  0  1
Decryption (C⊕S = P):  1  0  1  1  0  0  1  0 (Restored Plaintext!)`
  },
  {
    question: "What is 'Synchronous Stream Cipher' vs 'Self-Synchronizing (Asynchronous) Stream Cipher'?",
    shortAnswer: "Synchronous generates the keystream independently of plaintext and ciphertext; Self-Synchronizing generates the keystream based on a fixed number of previous ciphertext bits.",
    explanation: "1. Synchronous Stream Cipher (e.g. ChaCha20, Counter mode): The keystream generator is entirely independent of message content. If a bit is lost or dropped in transit, the receiver loses synchronization and all subsequent bytes fail decryption until re-synchronized; 2. Self-Synchronizing Stream Cipher (e.g. CFB mode): Each keystream bit depends on the previous $n$ ciphertext bits ($S_i = f(C_{i-1}, C_{i-2}\\dots)$). If a bit is dropped, decryption automatically recovers after $n$ bits.",
    hint: "Contrast two synchronized metronomes (Synchronous) with a machine that adjusts its speed based on the wheels turning before it (Self-Synchronizing).",
    level: "expert",
    codeExample: `// Stream Cipher Synchronization:
Synchronous:       Keystream_i = Generator( Key, Nonce, Counter_i )
Self-Synchronizing: Keystream_i = Generator( Key, Ciphertext_{i-1}, Ciphertext_{i-2}... )`
  },
  {
    question: "What is the 'Two-Time Pad Attack' (Keystream Reuse), and why is encrypting two distinct messages with the same (Key, Nonce) pair fatal to stream ciphers?",
    shortAnswer: "XORing two ciphertexts encrypted with the same keystream eliminates the key entirely ($C_1 \\oplus C_2 = P_1 \\oplus P_2$), allowing attackers to recover both original plaintexts through crib dragging.",
    explanation: "If $C_1 = P_1 \\oplus S$ and $C_2 = P_2 \\oplus S$, an eavesdropper XORs them: $C_1 \\oplus C_2 = (P_1 \\oplus S) \\oplus (P_2 \\oplus S) = P_1 \\oplus P_2$. The secret keystream $S$ vanishes. Because natural language text possesses high redundancy and predictable statistical word patterns, guessing a single common word ('the ', 'CONFIDENTIAL', 'HTTP/1.1') in $P_1$ reveals the corresponding characters in $P_2$, completely breaking message confidentiality.",
    hint: "Remember the mathematical cancellation rule: $A \\oplus A = 0$, which eliminates the secret key completely.",
    level: "expert",
    codeExample: `// Two-Time Pad Vulnerability:
C1 = P1 ⊕ Keystream
C2 = P2 ⊕ Keystream
C1 ⊕ C2 = P1 ⊕ P2 (Keystream is 100% CANCELLED OUT!)`
  },
  {
    question: "What is a 'Block Cipher', and how does it process fixed-size chunks of data (e.g. 128-bit blocks) through iterative mathematical rounds?",
    shortAnswer: "A symmetric algorithm that encrypts discrete, fixed-length blocks of bits (128 bits in AES) simultaneously using a deterministic algorithm governed by subkeys generated by a Key Schedule.",
    explanation: "Unlike stream ciphers which operate byte-by-byte, a block cipher takes a fixed-size block of plaintext (e.g. 128 bits / 16 bytes for AES) and transforms it through multiple iterative rounds (10 rounds for AES-128, 14 rounds for AES-256). In each round, the data undergoes non-linear substitution (S-Boxes), permutation (P-Boxes or bit shifts), and round key addition ($AddRoundKey$). For messages longer than 128 bits, modes of operation (CBC, GCM) chain the blocks together.",
    hint: "Think of an industrial metal stamping press that stamps standardized steel sheets in identical 128-bit batches.",
    level: "basic",
    codeExample: `// Block Cipher Iterative Transformation:
[ 128-bit Plaintext Block ] ──> [ Round 1 (SubKey 1) ] ──> [ Round 2 (SubKey 2) ] ... ──> [ Round 14 (SubKey 14) ] ──> [ 128-bit Ciphertext Block ]`
  },
  {
    question: "What is a 'Key Schedule' in block ciphers, and how does it expand a master 256-bit key into multiple round subkeys?",
    shortAnswer: "An algorithmic expansion algorithm that takes the master key and generates a series of distinct, pseudo-random round subkeys ($K_0, K_1, \\dots, K_r$) for each round of encryption.",
    explanation: "A block cipher executes multiple rounds (e.g. 14 rounds in AES-256). Using the master key directly in every round would make the cipher vulnerable to slide and invariant subspace attacks. The AES Key Schedule expands a 256-bit master key into 15 round subkeys (each 128 bits long) using cyclic word rotations (`RotWord`), S-box substitutions (`SubWord`), and round constants (`Rcon`), ensuring every round is protected by independent key material.",
    hint: "Think of a master dough recipe that is divided and mixed with different secret spices for 14 distinct baking layers.",
    level: "moderate",
    codeExample: `// AES-256 Key Expansion Overview:
Master Key: 256 bits (32 bytes)
Key Schedule Function: RotWord() + SubWord() + Rcon (Round Constant XOR)
Output: 15 Round SubKeys (15 * 16 bytes = 240 bytes of expanded key schedule)`
  },
  {
    question: "What is 'Hybrid Cryptosystem' architecture, and how does it combine the speed of Symmetric AES with the key exchange security of Asymmetric RSA/ECC?",
    shortAnswer: "Generates an ephemeral symmetric AES key to encrypt the bulk message payload at gigabit speeds, then encrypts the small AES key using the recipient's asymmetric public key.",
    explanation: "Asymmetric encryption (RSA) is ~1,000 times slower than symmetric AES and cannot encrypt large files directly. A Hybrid Cryptosystem combines both: 1. Sender generates a random 256-bit AES session key $K_{session}$; 2. The multi-gigabyte file is encrypted using AES-GCM with $K_{session}$ at maximum speed; 3. The 32-byte $K_{session}$ is encrypted with the recipient's RSA/ECC public key; 4. Both the encrypted payload and encrypted session key are sent together (Envelope Encryption).",
    hint: "Think of putting a heavy diamond vault in an armored truck, but putting the tiny vault key inside a small wax-sealed diplomatic envelope.",
    level: "moderate",
    codeExample: `// Hybrid Cryptosystem (Envelope Encryption):
1. Bulk Payload (10 GB): Ciphertext = AES_256_GCM( Big_File, K_session )
2. Key Envelope (32 Bytes): Encrypted_Key = RSA_Encrypt( K_session, Bob_PublicKey )
Transmission: [ Encrypted_Key ] + [ Ciphertext ] → Bob decrypts Key with Private Key, then decrypts File!`
  },
  {
    question: "What is a 'Hardware Security Module' (HSM), and why do the RBI Master Directions mandate HSMs for managing symmetric master keys in banking switches?",
    shortAnswer: "A tamper-resistant physical cryptographic coprocessor that generates, stores, and performs encryption with keys inside sealed silicon; master keys never exist in plaintext in server RAM.",
    explanation: "In software encryption, secret keys reside in system RAM where kernel rootkits, memory dumps, or cold-boot attacks can steal them. An HSM (FIPS 140-3 Level 3/4) is an armored cryptographic hardware device. If physical tampering, voltage spikes, or temperature anomalies are detected, the HSM automatically zeroizes (destroys) all internal keys within microseconds. The Reserve Bank of India (RBI) mandates HSMs for all core banking, ATM, and credit card PIN processing switches.",
    hint: "Think of an explosive-proof safe that performs calculations inside its own walls and incinerates its contents if someone tries to drill into it.",
    level: "expert",
    codeExample: `// HSM Cryptographic Isolation:
Application Server ──[ Encrypt Request (Plaintext) ]──> HSM (Hardware Boundary)
// Key NEVER leaves HSM silicon!
HSM ──[ Ciphertext Output ]──> Application Server`
  },
  {
    question: "What is 'Cryptographic Key Zeroization' and 'Key Shredding' (Crypto-Shredding), and how is it used in cloud databases to permanently delete sensitive data under the DPDP Act 2023?",
    shortAnswer: "Key Zeroization overwrites physical key memory with zeroes; Crypto-Shredding deliberately destroys the specific symmetric encryption key, rendering all encrypted backups instantly and permanently unrecoverable.",
    explanation: "Under the Digital Personal Data Protection (DPDP) Act 2023, when a user requests data deletion ('Right to be Forgotten'), deleting terabytes of distributed cloud database backups across multiple data centers is difficult. By using Envelope Encryption (where each customer has a unique Data Encryption Key - DEK), deleting or zeroizing that user's specific DEK in the KMS renders their encrypted data mathematically impossible to decrypt, fulfilling statutory erasure requirements immediately.",
    hint: "Think of throwing the only key to a titanium safe into the deepest trench of the ocean rather than trying to demolish the safe itself.",
    level: "moderate",
    codeExample: `// Crypto-Shredding in Cloud KMS:
User Mamata requests Account Deletion under DPDP Act 2023.
Action: KMS.DeleteKey( Mamata_DEK_ID ) → Key permanently destroyed!
Result: All 500 GB of historical database backups become unrecoverable white noise!`
  },
  {
    question: "What is 'AES-NI' (Advanced Encryption Standard New Instructions), and how do hardware CPU instruction sets eliminate side-channel timing attacks in symmetric encryption?",
    shortAnswer: "A set of dedicated hardware instructions built directly into Intel/AMD/ARM silicon (`AESENC`, `AESDEC`) that execute AES rounds in constant clock cycles with zero S-Box lookup table cache misses.",
    explanation: "Software AES implementations used in-memory lookup tables (T-tables) for S-box substitutions. Measuring CPU L1 cache hits/misses allowed attackers to deduce secret key bits (Cache-Timing Attacks). AES-NI provides hardware execution units in the CPU silicon: instructions like `_mm_aesenc_si128` execute an entire AES round in a fixed number of clock cycles (constant-time) with no memory table lookups, eliminating software cache timing leaks completely.",
    hint: "Think of building the cryptographic math directly into the silicon gears of the engine rather than running software scripts.",
    level: "expert",
    codeExample: `// Hardware AES-NI Instruction (Assembly / C Intrinsics):
#include <wmmintrin.h>
__m128i block = _mm_loadu_si128((__m128i*)plaintext);
__m128i key = _mm_loadu_si128((__m128i*)round_key);
block = _mm_aesenc_si128(block, key); // Constant-time hardware round execution!`
  },
  {
    question: "What is 'ChaCha20-Poly1305', and why is it preferred over AES on mobile devices (smartphones, IoT) that lack hardware AES-NI coprocessors?",
    shortAnswer: "A high-speed stream cipher combined with Poly1305 authenticator designed by Daniel J. Bernstein; runs purely on simple 32-bit integer addition, rotation, and XOR (ARX), making it 3x faster than software AES on ARM chips.",
    explanation: "While AES is blazingly fast on CPUs with AES-NI instructions, on low-power IoT devices or older ARM mobile processors without hardware crypto acceleration, software AES is slow and vulnerable to cache timing attacks. ChaCha20 uses simple ARX operations (Add-Rotate-XOR) on 32-bit registers, achieving high speed in pure software while executing in strict constant-time with zero cache lookups.",
    hint: "Think of an agile lightweight runner that runs fast on any dirt road without needing paved specialized tracks.",
    level: "expert",
    codeExample: `// ChaCha20 ARX Quarter-Round Core Operation:
#define QR(a, b, c, d) \\
    a += b; d ^= a; d = ROTL32(d, 16); \\
    c += d; b ^= c; b = ROTL32(b, 12); \\
    a += b; d ^= a; d = ROTL32(d, 8);  \\
    c += d; b ^= c; b = ROTL32(b, 7);
// Pure integer math: Immune to cache-timing attacks on any CPU!`
  },
  {
    question: "What is 'Bit-Flipping Attack' on unauthenticated symmetric ciphers (e.g. CBC or Stream Ciphers), and how does AEAD (AES-GCM) prevent it?",
    shortAnswer: "In stream/CBC ciphers without MAC, flipping bit $i$ in the ciphertext flips bit $i$ in the decrypted plaintext; AEAD detects any bit alteration and rejects the message with an authentication error.",
    explanation: "In stream ciphers ($C = P \\oplus S$), if an active attacker changes ciphertext $C' = C \\oplus \\Delta$, decryption yields $P' = C' \\oplus S = P \\oplus \\Delta$. An attacker can change a wire transfer from 'PAY ₹01,000' to 'PAY ₹91,000' without knowing the key. In Authenticated Encryption (AES-GCM / Poly1305), the mathematical tag $T = \\text{GMAC}(C)$ is checked first. Tampering with even 1 bit causes the tag check to fail, and the system discards the payload without decrypting.",
    hint: "Think of a thief changing the numbers on a handwritten paper check versus a digital check protected by a cryptographic tamper-evident wax seal.",
    level: "moderate",
    codeExample: `// Bit-Flipping Attack on Stream Cipher:
Ciphertext[5] ^= ( '0' ^ '9' ); // Flips digit '0' to '9'
Decrypted Plaintext: "PAY ₹90,000" (Attacker altered amount without knowing the key!)
Defense: AES-GCM Tag Mismatch → Throws AuthenticationError & Aborts!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 69, what are the statutory obligations of symmetric key custodians when served with a lawful decryption order?",
    shortAnswer: "Custodians must provide technical assistance to decrypt encrypted data or surrender decryption keys to authorized law enforcement agencies within specified timeframes; non-compliance carries up to 7 years imprisonment.",
    explanation: "Section 69 of the IT Act 2000 empowers authorized government agencies to intercept, monitor, or decrypt any computer resource for sovereignty, integrity, or defense of India. Any person or intermediary who holds the symmetric keys or maintains the decryption facility must extend all technical facilities and assistance to decrypt information. Failure to comply is a non-bailable offense punishable with imprisonment up to 7 years and fine.",
    hint: "Remember the legal statutory obligation in India to assist authorized national security investigations with cryptographic decryption.",
    level: "basic",
    codeExample: `// Statutory Compliance under IT Act Section 69:
Lawful Decryption Order Issued by Authorized Agency.
Key Custodian Action: Must assist with technical decryption facilities.
Penalty for Refusal: IT Act Section 69(4) → Up to 7 Years Imprisonment.`
  },
  {
    question: "What is 'Linear Cryptanalysis' (introduced by Mitsuru Matsui in 1993), and how does it exploit high-probability linear approximations in symmetric S-Boxes?",
    shortAnswer: "A Known-Plaintext cryptanalysis technique that finds linear equations correlating specific plaintext bits, ciphertext bits, and key bits: $\\bigoplus P_i \\oplus \\bigoplus C_j = \\bigoplus K_k$ with a statistical bias $|p - 1/2| > 0$.",
    explanation: "Block cipher S-Boxes are designed to be non-linear. However, Matsui discovered that in weak ciphers like DES, certain linear combinations of input and output bits hold true with a probability $p \\neq 0.5$ (e.g. $p = 0.5 + 0.1$). By collecting millions of known $(P, C)$ pairs and evaluating the parity of these linear approximations, cryptanalysts isolate and recover the secret subkey bits without testing all $2^{56}$ combinations.",
    hint: "Think of finding a slightly weighted coin that lands on heads 52% of the time and using statistics to deduce the weight.",
    level: "expert",
    codeExample: `// Linear Cryptanalysis Approximation:
P[1] ⊕ P[4] ⊕ C[2] ⊕ C[7] = K[3] ⊕ K[6]  (Holds with Probability p = 0.58)
Bias ε = |0.58 - 0.50| = 0.08
Collecting N = c / ε^2 known plaintext-ciphertext pairs reveals Key bits K[3], K[6]!`
  },
  {
    question: "What is 'Cryptographic Key Derivation' (HKDF - RFC 5869), and why does the 'Extract-and-Expand' paradigm securely generate multiple symmetric keys from a single master secret?",
    shortAnswer: "HKDF uses HMAC to first 'Extract' a pseudorandom key (PRK) from non-uniform input key material, then 'Expands' it to generate multiple independent, cryptographically strong keys (e.g. Encryption Key + MAC Key).",
    explanation: "Reusing the exact same symmetric key for both AES encryption and HMAC integrity verification can cause mathematical cross-protocol interactions. HKDF (HMAC-based Key Derivation Function) solves this via two phases: 1. `HKDF-Extract`: Combines salt and master secret into a uniform PRK; 2. `HKDF-Expand`: Uses PRK and unique context labels (`'enc-key'`, `'auth-key'`) to generate distinct, independent 256-bit subkeys for each specific security function.",
    hint: "Think of tapping raw crude oil from a well (Extract) and refining it into specialized aviation fuel and motor oil (Expand).",
    level: "expert",
    codeExample: `// HKDF Key Separation (RFC 5869):
PRK = HMAC_Hash( Salt, MasterSecret )
Key_Encryption = HKDF_Expand( PRK, "AES-256-ENCRYPTION-KEY", 32 )
Key_MAC        = HKDF_Expand( PRK, "HMAC-SHA256-INTEGRITY-KEY", 32 )`
  },
  {
    question: "Synthesizing Symmetric Key Cryptography: what is the single most critical engineering architecture for securing enterprise data at rest and in transit?",
    shortAnswer: "Adopt a Hybrid Cryptosystem using AES-256-GCM for bulk data, FIDO2/ECC for key establishment, store symmetric master keys in FIPS 140-3 HSMs, and enforce automated 90-day key rotation with crypto-shredding governance.",
    explanation: "Symmetric key cryptography is the workhorse of digital security. Mathematical algorithms like AES-256-GCM are unbreakable against brute force and cryptanalysis when implemented correctly. Enterprise security succeeds by protecting the key lifecycle: generating keys via hardware TRNGs, storing root keys inside tamper-proof HSMs, using envelope encryption for customer data, and adhering strictly to Indian regulatory mandates (DPDP Act 2023 and RBI Master Directions).",
    hint: "Conclude by recognizing how combining AES-256-GCM with hardware HSM key lifecycle governance creates an invincible enterprise cryptosystem.",
    level: "expert",
    codeExample: `// The Master Enterprise Symmetric Security Blueprint:
Bulk_Data(AES_256_GCM) + Hardware_HSM_KMS + Automatic_90Day_Rotation + DPDP_Compliance = ABSOLUTE_DATA_SOVEREIGNTY;`
  }
];

export default questions;
