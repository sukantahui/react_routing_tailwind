const questions = [
  {
    question: "What is the fundamental architectural distinction between a 'Substitution Cipher' and a 'Transposition Cipher'?",
    shortAnswer: "A Substitution cipher replaces plaintext characters with other characters/symbols (altering identity); a Transposition cipher rearranges the positions/order of plaintext characters (altering position without changing identity).",
    explanation: "Classical cryptography is built on two core operations: 1. Substitution: Each letter in the plaintext is replaced by another letter, number, or symbol according to a fixed rule (e.g. 'A' becomes 'D' in Caesar cipher), providing Shannon Confusion; 2. Transposition (Permutation): The letters of the plaintext remain unchanged, but their linear positions are shuffled into a new sequence (e.g. Rail Fence or Columnar Transposition), providing Shannon Diffusion.",
    hint: "Think about wearing a mask (Substitution) versus changing where people stand in a line (Transposition).",
    level: "basic",
    codeExample: `// Substitution vs Transposition:
Plaintext:     "HELLO"
Substitution:  "KHOOR" (Letters replaced by shift +3)
Transposition: "HLOEL" (Letters rearranged: positions 1,3,5,2,4)`
  },
  {
    question: "What is the mathematical formulation of the 'Caesar Cipher', and why does it have an insignificantly small key space of only 25 usable keys?",
    shortAnswer: "Encryption: $C = (P + K) \\bmod 26$; Decryption: $P = (C - K) \\bmod 26$; with only 26 letters in the English alphabet, shifts of 1 to 25 represent the entire key space ($K=0$ or $K=26$ leaves text unchanged).",
    explanation: "The Caesar cipher is a monoalphabetic shift cipher where each letter is replaced by the letter $K$ positions down the alphabet. For English (modulo 26 arithmetic), there are only 25 non-trivial keys ($K \\in \\{1, 2, \\dots, 25\\}$). A cryptanalyst can brute-force all 25 possible decryptions in less than 5 seconds with zero specialized tools.",
    hint: "Think of a circular wheel with 26 letters: turning it 26 times brings you back to the exact starting point.",
    level: "basic",
    codeExample: `// Caesar Cipher Encryption & Decryption (C / JavaScript):
function caesarEncrypt(char, key) {
    let p = char.charCodeAt(0) - 65; // 'A' = 0, 'B' = 1...
    let c = (p + key) % 26;
    return String.fromCharCode(c + 65);
}
// Encrypt('H', 3) → 'K' | Decrypt('K', 3) → 'H'`
  },
  {
    question: "What is the 'Affine Cipher', and what mathematical condition must the multiplicative key $a$ satisfy in modulo 26 arithmetic?",
    shortAnswer: "Encryption is $C = (aP + b) \\bmod 26$; the key $a$ must be coprime to 26 (i.e., $\\gcd(a, 26) = 1$) so that $a$ possesses a modular multiplicative inverse $a^{-1} \\bmod 26$ for decryption.",
    explanation: "The Affine cipher combines multiplicative and additive shifts: $C = (aP + b) \\bmod 26$. For decryption ($P = a^{-1}(C - b) \\bmod 26$) to work uniquely, $a$ must have a modular inverse modulo 26. The numbers coprime to 26 are $\\{1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25\\}$ (12 valid values of $a$). With 26 possible values for $b$, the total Affine key space is $12 \\times 26 = 312$ keys.",
    hint: "Remember that you cannot divide in modular arithmetic unless the multiplier shares no common factors with 26 (must be coprime).",
    level: "moderate",
    codeExample: `// Affine Cipher Decryption:
Formula: P = a^-1 * (C - b) mod 26
If a = 5, then a^-1 mod 26 = 21 (since 5 * 21 = 105 = 4*26 + 1 = 1 mod 26).
Decryption Example: P = 21 * (C - b) mod 26`
  },
  {
    question: "What is the 'Playfair Cipher', and what are its three fundamental rules for encrypting digrams in a $5 \\times 5$ matrix?",
    shortAnswer: "A digram substitution cipher using a $5 \\times 5$ letter matrix (I/J combined); Rules: 1. Same row → shift right; 2. Same column → shift down; 3. Rectangle → swap corners horizontally.",
    explanation: "Invented by Charles Wheatstone in 1854, Playfair encrypts pairs of letters (digrams): 1. Same Row: Replace each letter with the letter to its immediate right (wrapping around); 2. Same Column: Replace each letter with the letter immediately below it (wrapping around); 3. Rectangle Rule: Form a rectangle and replace each letter with the letter in its own row but at the column of the other letter. Duplicate letters in a pair are separated with 'X' (e.g. 'HELLO' → 'HE LX LO').",
    hint: "Remember the 3 geometric rules in the 5x5 grid: Row (Right), Column (Down), and Rectangle (Opposite Corners).",
    level: "moderate",
    codeExample: `// Playfair 5x5 Matrix Example (Key: "MONARCHY"):
M  O  N  A  R
C  H  Y  B  D
E  F  G  I  K  (I/J share slot)
L  P  Q  S  T
U  V  W  X  Z

Pair "EA" (Rectangle) → Encrypts to "IM" (Opposite column corners)
Pair "OC" (Column)    → Encrypts to "HF" (Shift down)`
  },
  {
    question: "What is the 'Hill Cipher', and what linear algebra condition must the key matrix $K$ satisfy for successful decryption?",
    shortAnswer: "A polygraphic cipher using matrix multiplication ($C = K \\cdot P \\bmod 26$); the key matrix $K$ must be invertible modulo 26, requiring $\\gcd(\\det(K), 26) = 1$.",
    explanation: "Invented by Lester S. Hill in 1929, the Hill cipher transforms $m$ plaintext letters into $m$ ciphertext letters using an $m \\times m$ matrix $K$. Decryption requires computing the inverse matrix: $P = K^{-1} \\cdot C \\bmod 26$. The inverse matrix $K^{-1} = (\\det(K))^{-1} \\cdot \\text{adj}(K) \\bmod 26$ exists if and only if the determinant $\\det(K)$ is non-zero and coprime to 26 ($\\{1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25\\}$).",
    hint: "Think about solving a system of linear equations where the coefficient matrix must have a non-zero determinant coprime to 26.",
    level: "expert",
    codeExample: `// Hill 2x2 Matrix Encryption:
Key Matrix K = [ [3, 2], [5, 7] ]
det(K) = (3*7 - 2*5) = 21 - 10 = 11. (gcd(11, 26) = 1 → Invertible!)
Plaintext "HE" → Vector P = [7, 4]^T
Cipher Vector C = [ [3, 2], [5, 7] ] * [7, 4]^T mod 26
C = [ 3*7 + 2*4, 5*7 + 7*4 ] = [ 29, 63 ] mod 26 = [ 3, 11 ] → "DL"`
  },
  {
    question: "What is the 'Vigenère Cipher', and why was it hailed as 'le chiffre indéchiffrable' (the unbreakable cipher) for over 300 years?",
    shortAnswer: "A polyalphabetic substitution cipher that shifts each plaintext letter by the corresponding letter of a repeating keyword, flattening single-letter frequency peaks.",
    explanation: "In a monoalphabetic cipher, 'E' always maps to the same ciphertext letter. In Vigenère ($C_i = (P_i + K_{i \\bmod L}) \\bmod 26$), a repeating keyword (e.g. 'KOLKATA') applies different Caesar shifts across successive letters. If 'E' appears 5 times in a sentence, it might be encrypted to 'O', 'P', 'R', 'E', and 'X'. This destroyed naive single-letter frequency analysis, causing mathematicians to believe it was unbreakable from 1586 until Friedrich Kasiski broke it in 1863.",
    hint: "Think about changing the secret shift number for every single letter based on a repeating passphrase.",
    level: "moderate",
    codeExample: `// Vigenère Encryption:
Plaintext:  A T T A C K   (P = [0, 19, 19, 0, 2, 10])
Keyword:    K E Y K E Y   (K = [10, 4, 24, 10, 4, 24])
Ciphertext: K X R K G I   (C = (P + K) mod 26)`
  },
  {
    question: "What is the 'Index of Coincidence' (IoC), and how did William Friedman use it in 1922 to determine the key length of a Vigenère cipher?",
    shortAnswer: "IoC ($I_c$) measures the probability that two randomly chosen letters from a ciphertext are identical; English plaintext has $I_c \\approx 0.0667$, while uniform random noise has $I_c \\approx 0.0385$.",
    explanation: "William Friedman calculated that in natural English, uneven letter frequencies (many E's and T's) yield an Index of Coincidence: $I_c = \\frac{\\sum f_i(f_i - 1)}{N(N - 1)} \\approx 0.0667$. For polyalphabetic ciphers, as key length $L$ increases, $I_c$ approaches random flat noise ($0.0385$). By dividing ciphertext into $L$ slices and computing the average $I_c$, the exact key length $L$ is discovered when the slice $I_c$ spikes up to $\\approx 0.066$, allowing automated cryptanalysis.",
    hint: "Think of an entropy and probability meter that measures whether a text looks like structured human English or flat random noise.",
    level: "expert",
    codeExample: `// Index of Coincidence Formula:
I_c = Σ [ f_i * (f_i - 1) ] / [ N * (N - 1) ]
English Monolingual Plaintext:  I_c ≈ 0.0667
Uniform Random Text (Key L=∞): I_c ≈ 0.0385`
  },
  {
    question: "What is the 'Rail Fence Cipher', and how does zig-zag transposition rearrange plaintext letters across $N$ rails?",
    shortAnswer: "Plaintext is written diagonally downwards and upwards in a zig-zag pattern across $N$ imaginary rails, then read off horizontally row by row to create ciphertext.",
    explanation: "In a 3-rail Rail Fence cipher, the text 'DEFEND THE BARRACKPORE GRID' is written diagonally: Rail 1 takes letters at peaks ($0, 4, 8\\dots$), Rail 2 takes middle letters ($1, 3, 5, 7\\dots$), and Rail 3 takes bottom troughs ($2, 6, 10\\dots$). The ciphertext is constructed by concatenating Rail 1 + Rail 2 + Rail 3. The letter frequencies remain 100% identical to English, but the linear sequence is thoroughly permuted.",
    hint: "Think of drawing a wave or mountain range across 3 lined lines on a sheet of notebook paper.",
    level: "basic",
    codeExample: `// 3-Rail Fence Zig-Zag on "DEFEND":
Rail 1: D . . . N .
Rail 2: . E . E . D
Rail 3: . . F . . .
Ciphertext = "DN" + "EED" + "F" = "DNEEDF"`
  },
  {
    question: "What is a 'Columnar Transposition Cipher', and how does an alphabetical keyword dictate the extraction order of columns?",
    shortAnswer: "Plaintext is written row-by-row into a grid of width $L$; columns are then read out vertically in the alphabetical order of the characters in the secret keyword.",
    explanation: "If the keyword is 'BENGAL' (sorted alphabetical order: A=1, B=2, E=3, G=4, L=5, N=6), the grid has 6 columns labeled [2, 3, 6, 4, 1, 5]. Plaintext is written across rows. To construct the ciphertext, the cryptographer reads down Column 'A' (order 1) first, then Column 'B' (order 2), then Column 'E' (order 3), etc. In 'Double Columnar Transposition', this process is repeated twice with two different keys, providing high diffusion.",
    hint: "Think of packing books into rows on a bookshelf and then pulling them out by color-coded column tags.",
    level: "moderate",
    codeExample: `// Columnar Transposition (Key: "CAT" → Sorted: A=1, C=2, T=3):
Key Order:  2 1 3 (C A T)
Row 1:      H E L
Row 2:      P M E
Read Columns: Col 1 (A) = "EM" | Col 2 (C) = "HP" | Col 3 (T) = "LE"
Ciphertext = "EMHPLE"`
  },
  {
    question: "What is the ancient Spartan 'Scytale Cipher', and what physical object served as the cryptographic key?",
    shortAnswer: "A transposition cipher where a parchment/leather strip is wrapped around a cylindrical wooden rod of specific fixed diameter; the physical diameter of the rod is the cryptographic key.",
    explanation: "Used by the Spartan military in the 5th century BC, the sender wrapped a thin leather strip helically around a wooden rod (a scytale) and wrote the message horizontally across the cylinder. When unrolled, the strip appeared as a meaningless jumble of letters. The recipient wrapped the strip around an identical rod of the exact same diameter to realign and read the secret battle orders.",
    hint: "Remember the ancient Greek wooden baton around which messengers wrapped leather straps.",
    level: "basic",
    codeExample: `// Scytale Transposition:
Wrapped on Rod of Diameter D=4: Letters align horizontally into readable words.
Unwrapped Leather Strip:        Letters appear scrambled in step-intervals of 4.`
  },
  {
    question: "What is a 'Product Cipher', and how did Claude Shannon's concept of combining Substitution and Transposition create modern block ciphers?",
    shortAnswer: "A cipher that alternately cascades Substitution stages (providing Confusion) and Transposition stages (providing Diffusion) across multiple iterative rounds, forming Feistel and SPN networks.",
    explanation: "Neither substitution alone nor transposition alone is secure against modern cryptanalysis (substitution falls to frequency analysis, transposition preserves letter statistics). Claude Shannon proposed cascading them: a Substitution layer (S-Boxes) replaces bytes to destroy linear algebraic relations, followed immediately by a Permutation layer (P-Boxes) to diffuse bits across the entire block. Repeating this $N$ times (10-14 rounds in AES, 16 rounds in DES) creates an unbreakable Product Cipher.",
    hint: "Think of kneading dough: adding spices (Substitution) and repeatedly folding and rolling (Transposition) until the flavor is uniformly distributed.",
    level: "expert",
    codeExample: `// Product Cipher Architecture (Substitution-Permutation Network - SPN):
Round 1: [Plaintext Block] ──[ S-Box (Confusion) ]──> [ P-Box (Diffusion) ] ──[ Key Addition ]──>
Round 2: [Round 1 Output]  ──[ S-Box (Confusion) ]──> [ P-Box (Diffusion) ] ──[ Key Addition ]──>
...
Round 10: [ FINAL CIPHERTEXT BLOCK ] (Immune to classical frequency & transposition attacks!)`
  },
  {
    question: "What is a 'ROT13' Cipher, and why is it its own mathematical inverse ($f(f(x)) = x$)?",
    shortAnswer: "A special case of Caesar cipher with a fixed shift of $K=13$; because $13 + 13 = 26 \\equiv 0 \\bmod 26$, applying ROT13 twice restores the original plaintext.",
    explanation: "ROT13 ('Rotate by 13 places') splits the 26-letter Latin alphabet into two equal 13-letter halves ($A \\leftrightarrow N, B \\leftrightarrow O$). Because $2 \\times 13 = 26$, encryption and decryption use the exact same function: $\\text{ROT13}(\\text{ROT13}(P)) = P$. It provides zero cryptographic security and is used strictly for obscuring spoilers, jokes, and puzzle answers in online forums.",
    hint: "Think of turning a wheel half-way (180 degrees); turning it another 180 degrees brings you back to the exact top.",
    level: "basic",
    codeExample: `// ROT13 Involutory Property:
ROT13("KOLKATA") = "XBXYNGN"
ROT13("XBXYNGN") = "KOLKATA" (Self-inverting cipher!)`
  },
  {
    question: "Why does the 'General Monoalphabetic Substitution Cipher' have a massive key space of $26! \\approx 4.03 \\times 10^{26}$, yet can be broken in seconds by a human or computer?",
    shortAnswer: "Because the mapping is 1-to-1 and static, preserving all underlying statistical language characteristics (letter frequency, digraphs, trigraphs, word lengths) which allows instant frequency analysis cracking.",
    explanation: "A general monoalphabetic cipher allows any arbitrary permutation of the 26 letters, creating $26! \\approx 4 \\times 10^{26}$ possible keys (equivalent to an 88-bit key). Brute force is impossible. However, the cipher does not provide Shannon Diffusion: 'E' always becomes 'X', 'TH' always becomes 'QZ', and double letters like 'LL' become 'MM'. A frequency analysis script compares the ciphertext frequency histogram to English language statistics, breaking the cipher in under 1 second.",
    hint: "Remember that a huge key space is completely useless if the cipher leaks the underlying language statistics.",
    level: "moderate",
    codeExample: `// 26! Key Space vs Frequency Analysis:
Key Space: 26! = 403,291,461,126,605,635,584,000,000 keys (Huge!)
Cracking Time: 0.02 Seconds using Python Frequency Analysis Dictionary Solver!`
  },
  {
    question: "Under the Indian Information Technology Act 2000, why is deploying classical ciphers (Caesar, Vigenère) for protecting sensitive financial data considered a statutory violation of Section 43A?",
    shortAnswer: "Section 43A mandates 'Reasonable Security Practices'; classical ciphers are historically obsolete, trivial to break, and fail to meet ISO/IEC 27001 / FIPS cryptographic standards.",
    explanation: "The IT Act 2000 Section 43A and DPDP Act 2023 require Indian body corporates to maintain reasonable security safeguards to protect sensitive personal data. Deploying obsolete classical ciphers (which can be broken by high school students using frequency analysis) constitutes gross statutory negligence, exposing the organization to full civil liability and administrative penalties.",
    hint: "Remember that using toy or ancient ciphers to protect real customer data fails Indian statutory compliance.",
    level: "basic",
    codeExample: `// Legal Assessment:
Protecting Credit Card Numbers with Vigenère Cipher → Fails IT Act Section 43A!
Remedy: Must deploy FIPS 197 validated AES-256-GCM.`
  },
  {
    question: "What is 'Digraphic Substitution' (e.g. Playfair), and why does encrypting pairs of letters reduce frequency analysis vulnerability compared to monoalphabetic ciphers?",
    shortAnswer: "Instead of 26 single-letter frequencies, digraphic substitution operates on $26 \\times 26 = 676$ possible letter pairs, significantly flattening the statistical frequency distribution.",
    explanation: "In single-letter substitution, 'E' stands out with a massive 12.7% spike. In digraphic substitution (Playfair), the basic unit of encryption is a pair of letters. There are $26^2 = 676$ possible digrams ('TH', 'HE', 'IN', 'ER', etc.). The most frequent digram ('TH') accounts for only ~1.5% of English text. This dramatic flattening of frequency peaks requires cryptanalysts to collect thousands of words of ciphertext before statistical analysis becomes feasible.",
    hint: "Think about how it is much harder to guess 2-letter word combinations than individual single letters.",
    level: "moderate",
    codeExample: `// Digram Frequency Flattening:
Single Letter 'E': 12.7% Frequency Peak (Massive statistical beacon!)
Digram 'TH':       1.52% Frequency Peak (Much harder to detect!)`
  },
  {
    question: "What is an 'Anagramming' attack, and how do cryptanalysts use it to break classical transposition ciphers?",
    shortAnswer: "Rearranging columns and letter positions based on likely digram/trigram formations (e.g. searching for 'TH', 'QU', 'ING') to reconstruct the original plaintext layout.",
    explanation: "Because transposition ciphers only shuffle letter positions, the exact letters of the original message are all present in the ciphertext. Cryptanalysts look for vowels and common consonant clusters ('Q' is almost always followed by 'U', 'T' is followed by 'H'). By testing column alignments that form valid English digrams and trigrams, the cryptanalyst rapidly reconstructs the original grid width and column permutation order.",
    hint: "Think about solving a jumble word puzzle in the Sunday newspaper.",
    level: "moderate",
    codeExample: `// Anagramming Col Analysis:
Col 1: T R E P
Col 2: H O A S
Combining Col 1 + Col 2 → Forms "TH", "RO", "EA", "PS" (All valid English digrams → Correct column order!)`
  },
  {
    question: "How did the 'Feistel Cipher Network' (invented by Horst Feistel) revolutionize symmetric block cipher design using substitution and transposition?",
    shortAnswer: "It splits data into Left and Right halves ($L, R$) and applies round functions ($R_{i+1} = L_i \\oplus F(R_i, K_i)$); encryption and decryption use the exact same algorithm, simply reversing the key schedule.",
    explanation: "Invented at IBM in the 1970s and used in DES, Blowfish, and Twofish, the Feistel structure splits a 64-bit block into $L_0$ and $R_0$. In each round: $L_{i+1} = R_i$ and $R_{i+1} = L_i \\oplus F(R_i, K_i)$. Because the round function $F$ is XORed with $L_i$, $F$ does NOT need to be mathematically invertible. Decryption is identical to encryption—simply apply the subkeys in reverse order ($K_{16}$ down to $K_1$), drastically reducing hardware chip complexity.",
    hint: "Think of an origami folding structure where folding and unfolding follow the exact same mechanical creases in reverse.",
    level: "expert",
    codeExample: `// Feistel Network Round Formulation:
L_{i+1} = R_i
R_{i+1} = L_i ⊕ RoundFunction( R_i, SubKey_i )
Decryption: Identical circuit! Simply apply SubKeys in reverse: K_{16}, K_{15}... K_1.`
  },
  {
    question: "What is a 'Substitution-Permutation Network' (SPN), and how does it differ from a Feistel cipher in modern AES design?",
    shortAnswer: "SPN processes the entire data block simultaneously through parallel S-Boxes and P-Boxes in every round (unlike Feistel which only modifies half the block per round), requiring all operations to be mathematically invertible.",
    explanation: "AES (Rijndael) abandoned the Feistel structure in favor of a pure Substitution-Permutation Network (SPN). In an SPN: 1. `SubBytes`: Replaces all 16 bytes simultaneously using non-linear S-Boxes (Confusion); 2. `ShiftRows` & `MixColumns`: Permutes bits across rows and columns (Diffusion); 3. `AddRoundKey`: XORs the round key. Because the entire 128-bit block is transformed in every round, SPN achieves full diffusion in fewer rounds than Feistel networks.",
    hint: "Contrast transforming only half a car at a time (Feistel) versus painting and modifying the entire car in every assembly station (SPN).",
    level: "expert",
    codeExample: `// AES SPN Round Operations (Entire 128-bit Block):
1. SubBytes()    → S-Box Non-Linear Byte Substitution (Confusion)
2. ShiftRows()   → Cyclic Row Permutation (Diffusion)
3. MixColumns()  → Matrix Multiplicative Diffusion across Columns
4. AddRoundKey() → XOR with Round SubKey`
  },
  {
    question: "Synthesizing Classical Ciphers: what is the fundamental historical lesson that classical substitution and transposition ciphers teach modern cybersecurity engineers?",
    shortAnswer: "Never rely on a single mathematical transformation; true security requires cascading non-linear substitution (Confusion) and high-dispersion transposition (Diffusion) in multi-round Product Ciphers governed by large, random keys.",
    explanation: "Every classical cipher failed because it was uni-dimensional: substitution ciphers leaked language statistics, transposition ciphers leaked character identities, and monoalphabetic mappings had trivial key spaces. Modern cryptography succeeded by uniting them: Claude Shannon's insight that cascading substitution (S-Boxes) and transposition (P-Boxes) across multiple rounds obliterates all statistical traces, creating modern cryptographic standards like AES.",
    hint: "Conclude by recognizing how the fusion of substitution and transposition birthed modern unbreakable block ciphers.",
    level: "expert",
    codeExample: `// The Classical-to-Modern Evolutionary Law:
(Substitution_Confusion + Transposition_Diffusion)^N_Rounds + 256_Bit_Key = UNBREAKABLE_AES_CIPHER;`
  }
];

export default questions;
