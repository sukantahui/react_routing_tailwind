const questions = [
  {
    question: "What is the fundamental difference in core objectives between 'Cryptography', 'Steganography', and 'Digital Watermarking'?",
    shortAnswer: "Cryptography hides the MEANING of a message; Steganography hides the EXISTENCE of the communication; Digital Watermarking protects the CARRIER media itself by binding permanent metadata.",
    explanation: "The three information-hiding disciplines have distinct goals: 1. Cryptography: Scrambles plaintext into random-looking ciphertext; everyone knows an encrypted message exists, but only key holders can read its meaning; 2. Steganography: Hides a secret message inside an innocent-looking cover file (e.g. an image); the goal is covert communication where eavesdroppers do not even suspect a secret message is present; 3. Digital Watermarking: Permanently embeds an unremovable copyright or forensic identifier into the cover file itself; the primary goal is protecting the host carrier media from theft or unauthorized redistribution.",
    hint: "Think of an encrypted locked box (Cryptography), a secret compartment hidden behind a mirror (Steganography), and an artist's signature carved into a stone statue (Watermarking).",
    level: "basic",
    codeExample: `// The 3 Paradigms:
Cryptography:   Ciphertext = Encrypt( Plaintext, Key )     -> Existence is KNOWN, Meaning is HIDDEN
Steganography:  StegoObject = Hide( CoverObject, Secret )  -> Existence is CONCEALED completely
Watermarking:   Watermarked = Embed( HostMedia, Copyright) -> Protects the HOST MEDIA itself`
  },
  {
    question: "What is 'Steganalysis', and what is the primary objective of a steganalyst compared to a cryptanalyst?",
    shortAnswer: "A cryptanalyst attempts to decrypt scrambled ciphertext; a steganalyst attempts to detect the very presence of hidden secret data inside innocent-looking carrier media.",
    explanation: "In cryptanalysis, the adversary already possesses the ciphertext and knows encrypted communication is occurring; their goal is to extract the plaintext or key. In steganalysis, the primary victory condition for the adversary (Warden / Defender) is merely detecting that a file (e.g. a JPEG photo or audio clip) contains hidden data ($P[\\text{Hidden Data Present}] > 0.5$). Once detected, the covert channel is destroyed, even if the payload is not yet decrypted.",
    hint: "Think of a prison guard searching for secret hidden notes inside inmates' innocent letters rather than trying to crack a code.",
    level: "moderate",
    codeExample: `// Cryptanalysis vs Steganalysis Objectives:
Cryptanalyst: Target = Decrypt( Ciphertext ) -> Recover Plaintext P
Steganalyst:  Target = Detect( CoverImage )  -> Output: { "CLEAN_IMAGE", "STEGO_PAYLOAD_DETECTED" }`
  },
  {
    question: "How does the relationship between the 'Embedded Payload' and the 'Cover Carrier' differ between Steganography and Digital Watermarking?",
    shortAnswer: "In Steganography, the payload is completely UNRELATED to the cover (the cover is just disposable wrapping); in Watermarking, the payload is DIRECTLY RELATED to the cover (it is the cover's copyright, author, or patient metadata).",
    explanation: "In steganography, the cover image (e.g. a picture of the Victoria Memorial in Kolkata) has zero conceptual connection to the payload (e.g. an encrypted bank account password list); if the cover image is destroyed, the sender simply picks a picture of a cat. In digital watermarking, the payload exists solely to protect that specific cover image (e.g. the photographer's copyright ID or patient's DICOM record); the host media is the valuable asset.",
    hint: "Think of hiding a gold coin inside a cardboard shipping box (Stego) versus stamping a purity hallmark directly onto a gold bar (Watermarking).",
    level: "moderate",
    codeExample: `// Payload-Carrier Relationship:
Steganography: Cover = "Cat.jpg" | Secret Payload = "Confidential_Bank_Passwords.txt" (UNRELATED)
Watermarking:  Host  = "MRI_Brain.dcm" | Watermark = "Patient_Mamata_Kolkata_Hospital" (DIRECTLY BOUND)`
  },
  {
    question: "What is the 'Chi-Square' ($\\chi^2$) Statistical Attack in steganalysis, and how does it detect Spatial LSB replacement in uncompressed images?",
    shortAnswer: "LSB replacement pairs even and odd pixel values (Pairs of Values - PoVs), equalizing their statistical frequencies; $\\chi^2$ analysis measures this artificial symmetry to mathematically detect hidden payloads.",
    explanation: "In natural images, adjacent even and odd pixel luminance values (e.g. 214 and 215) have natural variations. When an attacker replaces the 8th bit with random secret bits ($0$ or $1$), even values $2k$ are converted to $2k+1$ with 50% probability, and odd values $2k+1$ are converted to $2k$ with 50% probability. This forces the frequencies of $(2k, 2k+1)$ pairs to become unnaturally equal. A $\\chi^2$ statistical test measures this artificial equalization, detecting LSB steganography in seconds.",
    hint: "Think of an artificial lawn where every pair of grass blades is trimmed to exactly identical height.",
    level: "expert",
    codeExample: `// Chi-Square (χ²) PoV Detection:
Expected Count: E_k = ( Count(2k) + Count(2k+1) ) / 2
Chi-Square:     χ² = Sum( (Count(2k) - E_k)^2 / E_k )
Result: In pristine image, χ² is high; in LSB stego image, χ² drops near 0 -> STEGO DETECTED!`
  },
  {
    question: "What is 'Network / Protocol Steganography', and how do adversaries hide covert data in standard TCP/IP packet headers?",
    shortAnswer: "Adversaries encode secret bits into unused or variable protocol header fields (such as IP Identification, TCP Initial Sequence Numbers - ISNs, or packet inter-arrival timing delays).",
    explanation: "Covert network channels bypass firewalls by modifying standard network packets without disrupting packet delivery: 1. TCP ISN Steganography: Encoding 32 bits of covert data into the Initial Sequence Number of TCP SYN packets; 2. IP ID & TTL Modulation: Embedding bits into the 16-bit IP identification field or varying TTL hop counts; 3. Timing Channels: Modulating the millisecond time intervals between transmitted packets (e.g. 10ms delay = 0, 50ms delay = 1).",
    hint: "Think of sending a letter through the postal service where the secret message is encoded in the pattern of postage stamps on the envelope.",
    level: "expert",
    codeExample: `// TCP ISN Network Steganography:
Normal TCP SYN: ISN = Random 32-bit Integer
Covert TCP SYN: ISN = (Covert_Byte_1 << 24) | (Covert_Byte_2 << 16) | ...
// Packet travels across enterprise firewall -> Firewall inspects headers and sees normal traffic!`
  },
  {
    question: "What is 'Linguistic Steganography' (Text Steganography), and how do techniques like Zero-Width Unicode characters hide data in plain text documents?",
    shortAnswer: "By inserting invisible Unicode characters (such as Zero-Width Space `U+200B` and Zero-Width Non-Joiner `U+200C`) into standard text; the document renders normally on screen while carrying hidden binary data.",
    explanation: "Text steganography conceals information in plain ASCII/Unicode text: 1. Zero-Width Characters: Using `U+200B` (binary 0) and `U+200C` (binary 1) between normal words. To a human reader, the text looks like ordinary prose, but a script extracts hidden bits; 2. Whitespace Steganography (SNOW): Appending variable combinations of spaces and tabs at the ends of text lines; 3. Semantic Synonym Substitution: Replacing words with synonyms based on a shared dictionary.",
    hint: "Think of writing invisible ink characters between the printed letters of a newspaper article.",
    level: "moderate",
    codeExample: `// Zero-Width Unicode Steganography:
Visible Text:   "Welcome to Kolkata"
Rendered UTF-8: "Welcome\\u200B\\u200C\\u200B to Kolkata"
// Human eye sees: "Welcome to Kolkata" | Script decodes: 010 (Hidden Binary Data!)`
  },
  {
    question: "Why does a robust 'Multi-Layer Covert Defense' combine Cryptography, Steganography, and Digital Watermarking into a single file?",
    shortAnswer: "Cryptography protects content if discovered (Defense in Depth); Steganography conceals the communication channel from detection; Digital Watermarking preserves carrier ownership and provenance.",
    explanation: "Relying on a single mechanism creates a single point of failure: 1. Layer 1 (Cryptography): Encrypt the secret payload with AES-256-GCM so that even if the stego channel is broken, the adversary reads gibberish; 2. Layer 2 (Steganography): Embed the ciphertext into a JPEG cover using F5 or matrix embedding to evade firewall inspection; 3. Layer 3 (Watermarking): Embed a DWT digital watermark into the cover image to prove original ownership and trace leaks.",
    hint: "Think of wrapping a diamond in carbon paper (Crypto), hiding it inside a false book compartment (Stego), and stamping the museum seal on the book cover (Watermarking).",
    level: "expert",
    codeExample: `// The 3-Layer Integrated Architecture:
Step 1: Ciphertext = AES_256_GCM_Encrypt( SecretMessage, MasterKey )
Step 2: StegoImage = F5_Embed( CoverImage, Ciphertext, StegoKey )
Step 3: FinalImage = DWT_Watermark_Embed( StegoImage, "Owner: Mamata Kolkata" )
// Guarantees Confidentiality + Covert Delivery + Ownership Tracking simultaneously!`
  },
  {
    question: "Under Section 69 of the Indian Information Technology Act 2000, what are the statutory obligations and legal penalties regarding encrypted and steganographic data?",
    shortAnswer: "Section 69 empowers authorized government agencies to intercept, monitor, or decrypt information; any person or service provider who fails to assist with decryption or decrypting keys faces imprisonment up to 7 years and fines.",
    explanation: "Section 69 of the IT Act 2000 authorizes designated government agencies (e.g. CERT-In, Intelligence Bureau) to intercept electronic records for national security or crime investigation. If an individual or enterprise uses cryptography or steganography to conceal evidence, they are legally required to provide decryption keys or technical assistance. Failing to comply is a non-bailable offense punishable with imprisonment up to 7 years.",
    hint: "Remember the Indian law empowering cybersecurity authorities to demand decryption keys during criminal investigations.",
    level: "basic",
    codeExample: `// Indian IT Act 2000 Section 69 Powers:
Authority: Designated Agencies under Ministry of Home Affairs / CERT-In.
Order: Interception, Monitoring, or Decryption of electronic records.
Failure to Provide Decryption Key: Imprisonment up to 7 Years + Non-Bailable Fine.`
  },
  {
    question: "What is 'Matrix Embedding' (F5 Steganography Algorithm by Andreas Westfeld, 2001), and how does it maximize embedding efficiency while minimizing cover modifications?",
    shortAnswer: "A coding technique (using Hamming codes $(1, 2^k-1, k)$) that embeds $k$ secret bits by altering at most 1 single coefficient out of $2^k-1$ coefficients, drastically reducing detectable distortion.",
    explanation: "In naive LSB embedding, embedding $k$ bits flips approximately $k/2$ cover pixels. In Matrix Embedding: To embed 2 bits ($k=2$), F5 takes 3 DCT coefficients ($2^2-1=3$). By computing linear syndrome equations, modifying at most 1 coefficient changes the syndrome to match the 2 secret bits. For $k=3$, F5 embeds 3 bits into 7 coefficients by changing at most 1 coefficient. This achieves high embedding efficiency ($E > 1.5$ bits changed per modification), defeating first-order statistical steganalysis.",
    hint: "Think of answering three multiple-choice questions correctly by moving only one piece on a chessboard.",
    level: "expert",
    codeExample: `// (1, 3, 2) Matrix Embedding (Embed 2 bits [x1, x2] in 3 coefficients [a1, a2, a3]):
Syndrome: s1 = a1 ⊕ a2,  s2 = a2 ⊕ a3
If [s1, s2] == [x1, x2]: Modify 0 coefficients!
If [s1, s2] != [x1, x2]: Flip ONLY a1, a2, or a3 to match [x1, x2] (At most 1 change for 2 bits!)`
  },
  {
    question: "What is 'Deep Learning-based Steganalysis' (e.g. SRNet / XuNet Convolutional Neural Networks), and how does it detect advanced adaptive steganography (HILL / S-UNIWARD)?",
    shortAnswer: "Deep CNNs use high-pass spatial filtering layers to suppress image content and isolate noise residuals, learning subtle pixel co-occurrence probability shifts to detect adaptive steganography.",
    explanation: "Modern adaptive steganography (e.g. S-UNIWARD, WOW, HILL) hides data exclusively in complex, noisy image textures where statistical changes are hardest to spot. Traditional feature models (SRM - Spatial Rich Models) used handcrafted filter banks. Modern deep learning steganalysis (such as SRNet - Spatial Residual Network) uses 12+ convolutional layers with unpooled residual blocks, learning to extract high-dimensional noise patterns directly from image pixels, achieving over 90% detection accuracy even against low-payload adaptive steganography.",
    hint: "Think of an AI trained to listen to the faint static noise between radio stations to detect an unauthorized microphone.",
    level: "expert",
    codeExample: `// SRNet Deep Learning Steganalysis Architecture:
Input: 512x512 Image ──> [ High-Pass Residual Filters ] (Suppresses image content)
                      ──> [ Unpooled Convolutional Layers (Layers 1..7) ]
                      ──> [ Average Pooling & Dense Softmax ]
                      ──> Probability Output: { Clean: 0.05, Stego: 0.95 }`
  },
  {
    question: "How do Data Loss Prevention (DLP) gateways in enterprise security operations centers (SOCs) detect 'Malicious Insider Data Exfiltration via Steganography'?",
    shortAnswer: "By performing deep packet inspection on outgoing web traffic, running statistical entropy analysis and structural heuristics on uploaded image attachments, and stripping high-frequency DCT coefficients.",
    explanation: "Malicious insiders often attempt to bypass DLP firewalls by hiding stolen source code or database records inside social media image uploads. Enterprise SOCs deploy advanced DLP engines that: 1. Calculate entropy and pixel co-occurrence matrices on all outgoing image attachments; 2. Run real-time steganalysis filters; 3. Enforce 'Active Content Normalization' (re-compressing outgoing images through lossy JPEG transcoding with a quality factor of 85%), which wipes spatial LSB payloads while preserving image viewability.",
    hint: "Think of the airport security scanner that sanitizes and X-rays all outgoing luggage before allowing it onto the plane.",
    level: "moderate",
    codeExample: `// SOC DLP Active Sanitization Rule:
Outgoing File: "profile_pic.png" (Uploaded by Employee to Social Media)
DLP Action:   1. Detect χ² Anomaly -> Flag Incident: "Steganography Suspected"
              2. Active Sanitization -> Re-encode PNG to JPEG (QF=80) in memory
              3. Result: Any hidden LSB payload is 100% DESTROYED before leaving network!`
  },
  {
    question: "What is 'Microdot Steganography' and 'Printer Tracking Dots' (Machine Identification Codes - MIC), and how do color laser printers embed invisible tracking codes?",
    shortAnswer: "Color laser printers print microscopic yellow dots ($<0.1$ mm) across every page in a grid pattern, encoding the printer's exact serial number, manufacturer, and timestamp for law enforcement tracking.",
    explanation: "Developed in the 1980s by Xerox and Canon in collaboration with government secret services, Machine Identification Codes (MIC) are a hardware form of steganography: Every color laser printer prints tiny, faint yellow dots (visible only under blue LED light and magnification) in an $8 \\times 16$ grid. The dots encode the printer's unique serial number, date, and hour of printing. If a counterfeit bank note or threat letter is printed, forensic investigators extract the dots to identify the exact printer used.",
    hint: "Think of microscopic yellow breadcrumbs printed invisibly on every sheet of paper leaving your office printer.",
    level: "moderate",
    codeExample: `// Printer Tracking Dots (MIC) Grid Matrix:
[ Parity Bits ] [ Serial Number Bits: "SN-98214-KOLKATA" ] [ Timestamp: "2026-08-23-01:52" ]
// Yellow dots printed at 1/10th mm spacing -> Invisible to human eye without blue light!`
  },
  {
    question: "What is 'Audio Steganography' via 'Echo Hiding', and how does introducing microscopic acoustic delays ($<1$ ms) hide secret binary data in voice recordings?",
    shortAnswer: "By adding an artificial, microscopic echo to audio signals with two different delay times (e.g. 0.5 ms for bit 0, 1.0 ms for bit 1); delays below 1 ms are completely imperceptible to human ears.",
    explanation: "In Echo Hiding steganography, a secret binary message is encoded into an audio waveform by adding an imperceptible echo: $y(t) = x(t) + \\alpha \\cdot x(t - \\Delta t)$. If the delay $\\Delta t$ is kept under 1 millisecond and amplitude $\\alpha$ is small, the Human Auditory System blends the echo directly into the original sound, perceiving zero reverberation. The receiver calculates the Cepstrum (the inverse Fourier transform of the log spectrum) to detect the exact echo delay peak and recover the hidden bits.",
    hint: "Think of an echo so fast that your brain hears it as the original voice rather than a separate reflection.",
    level: "expert",
    codeExample: `// Echo Hiding Parameter Matrix:
Bit 0: Delay Delta_0 = 0.5 ms (Echo offset = 22 samples @ 44.1 kHz)
Bit 1: Delay Delta_1 = 1.0 ms (Echo offset = 44 samples @ 44.1 kHz)
Cepstrum Analysis: Peak at Offset 44 -> Extracted Bit = 1!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is 'Malicious Steganography' considered a severe aggravating factor during data breach penalty assessments?",
    shortAnswer: "Using steganography demonstrates deliberate intent to conceal and exfiltrate personal data, triggering maximum statutory penalties (up to ₹250 Crores) and immediate criminal prosecution.",
    explanation: "Under the DPDP Act 2023, the Data Protection Board of India evaluates both the breach impact and the 'nature, gravity, and duration' of non-compliance. When an enterprise insider or external hacker uses steganography to conceal the theft of sensitive personal data (e.g. medical or financial records), it proves premeditated evasion of security controls. This constitutes an egregious breach, disqualifying the organization from statutory leniency and invoking maximum ₹250 Crore fines.",
    hint: "Remember how deliberate attempts to hide data theft trigger the highest statutory penalties under Indian data privacy laws.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Penalty Aggravation:
Standard Accidental Leak:    Statutory fine evaluated based on mitigation efforts.
Steganographic Exfiltration: Premeditated Evasion -> MAXIMUM ₹250 CRORES PENALTY + CRIMINAL PROSECUTION!`
  },
  {
    question: "What is 'Steganographic Capacity' vs 'Steganographic Security', and what is the fundamental trade-off governed by 'Simmons's Prisoners' Problem'?",
    shortAnswer: "Increasing payload capacity increases statistical distortion in the cover, making detection by a watchful warden exponentially easier; security requires limiting capacity to $<0.05$ bits per pixel.",
    explanation: "In 1983, Gustavus Simmons formulated the Prisoners' Problem: Alice and Bob want to hatch an escape plan while communicating under the watchful eye of Warden Wendy. If Alice hides too many secret bits in her letter (High Capacity), the statistical distribution of the text or image shifts noticeably, allowing Wendy to detect the secret channel and throw Alice in solitary confinement. To remain undetectable (High Security), the embedding payload must remain below the statistical noise floor of the cover media.",
    hint: "Think of packing a backpack: stuffing it full makes the bulge obvious to guards; packing just a tiny envelope keeps it invisible.",
    level: "moderate",
    codeExample: `// Capacity vs Security Trade-off:
Payload = 0.50 bits/pixel (High Capacity) -> Chi-Square χ² easily detects stego (0% Security!)
Payload = 0.05 bits/pixel (Low Capacity)  -> Statistically indistinguishable from noise (100% Secure!)`
  },
  {
    question: "What is 'Spread Spectrum Steganography' (Direct Sequence / Frequency Hopping), and how does it prevent statistical detection by spreading secret energy below the noise floor?",
    shortAnswer: "Multiplying the secret bit by a wideband pseudorandom sequence and embedding it at tiny amplitude across all frequency coefficients, ensuring the signal is mathematically indistinguishable from thermal sensor noise.",
    explanation: "In Spread Spectrum Steganography, each secret bit $b_i \\in \\{-1, +1\\}$ is multiplied by a long pseudorandom noise sequence $P_i$. The resulting low-amplitude signal is added to the frequency coefficients of an image or audio track ($I' = I + \\alpha \\cdot b \\cdot P$). Because $\\alpha$ is tiny, the added energy is well below the natural variance (thermal sensor noise) of the original camera or microphone. Statistical steganalysts cannot detect the signal without possessing the secret PRNG key $P$.",
    hint: "Think of whispering a message across a crowded stadium where each word is so soft that nobody hears anything except normal crowd noise.",
    level: "expert",
    codeExample: `// Spread Spectrum Steganography Formula:
Cover Vector:    I = [120, 145, 132, 180, 110, ...]
PRNG Sequence:   P = [+1,  -1,  +1,  +1,  -1,  ...] (Shared Secret Key)
Embedded Signal: I' = I + (0.5 * Secret_Bit * P)
Noise Variance:  Added delta (+0.5) is smaller than sensor noise (+-2.0) -> UNTOUCHED BY STEGANALYSIS!`
  },
  {
    question: "Synthesizing Steganography, Watermarking, and Cryptography: what is the master taxonomy that unifies all three information-hiding disciplines?",
    shortAnswer: "Cryptography secures the message text; Steganography secures the communication channel; Digital Watermarking secures the host media asset. Master security architectures deploy all three in layered harmony.",
    explanation: "Information hiding is a multi-dimensional continuum: Cryptography provides mathematical Confidentiality and Non-Repudiation; Steganography provides Covertness and Channel Concealment; Digital Watermarking provides Provenance, Copyright, and Integrity for the host asset. A comprehensive cybersecurity posture leverages cryptography for data in transit/rest, watermarking for intellectual property protection, and steganalysis-enabled DLP gateways to block covert insider exfiltration.",
    hint: "Conclude by recognizing how the three distinct paradigms form a unified, complementary framework for information protection and threat detection.",
    level: "expert",
    codeExample: `// The Master Information Hiding Paradigm:
+-------------------+---------------------------+-----------------------------------+
| DISCIPLINE        | PRIMARY TARGET PROTECTED  | CORE ATTACK TO DEFEAT             |
+-------------------+---------------------------+-----------------------------------+
| 1. Cryptography   | Message Content (Meaning) | Cryptanalysis (Eavesdropping)     |
| 2. Steganography  | Communication Channel     | Steganalysis (Channel Detection)  |
| 3. Watermarking   | Host Media Carrier Asset  | Watermark Removal & Piracy        |
+-------------------+---------------------------+-----------------------------------+`
  }
];

export default questions;
