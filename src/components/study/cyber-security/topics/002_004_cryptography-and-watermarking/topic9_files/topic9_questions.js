const questions = [
  {
    question: "What is 'Digital Watermarking', and how does its primary purpose differ from traditional data encryption?",
    shortAnswer: "Digital watermarking embeds permanent, imperceptible copyright or forensic signals directly into host multimedia (images, audio, video); encryption protects data in transit, but once decrypted, watermarks remain permanently inside the content.",
    explanation: "Encryption scrambles multimedia data so that unauthorized eavesdroppers cannot view it during transmission. However, once an authorized user decrypts the file, encryption offers zero protection against unauthorized copying or re-distribution. Digital watermarking permanently embeds an imperceptible, tamper-resistant payload (copyright owner, recipient ID, serial number) into the multimedia signal itself, surviving decoding, re-encoding, and display.",
    hint: "Think of an encrypted envelope that is discarded after opening versus a permanent watermark pressed into the paper fibers.",
    level: "basic",
    codeExample: `// Encryption vs Digital Watermarking:
Encryption:   Ciphertext = Encrypt( Image ) -> Decrypted Image has ZERO remaining protection!
Watermarking: WatermarkedImage = Embed( Image, Watermark_ID ) -> Protection is PERMANENT across copies!`
  },
  {
    question: "What are the three fundamental classifications of digital watermarks based on their 'Robustness' (Robust, Fragile, Semi-Fragile)?",
    shortAnswer: "1. Robust: Withstands severe signal processing (compression, cropping, filtering) for copyright protection; 2. Fragile: Destroys on any 1-bit alteration for tamper detection; 3. Semi-Fragile: Tolerates benign compression (JPEG) but detects malicious content edits.",
    explanation: "Watermarks are engineered according to application requirements: 1. Robust Watermarks: Designed to survive aggressive image attacks (lossy JPEG compression, scaling, rotation, filtering) to prove copyright ownership in court; 2. Fragile Watermarks: Break completely if a single pixel is altered, proving that medical X-rays or legal documents have remained untouched; 3. Semi-Fragile Watermarks: Distinguish between lossy compression (allowed) and malicious object removal/insertion (flagged as tampering).",
    hint: "Contrast an indestructible steel brand on livestock (Robust) with a delicate paper security seal on a pill bottle (Fragile).",
    level: "moderate",
    codeExample: `// Watermark Robustness Archetypes:
Robust Watermark:       Survives 50% JPEG Compression & Scaling -> Proves Copyright in Court!
Fragile Watermark:      Flipping 1 pixel destroys signature -> Proves Medical X-Ray Tampering!
Semi-Fragile Watermark: Ignores JPEG 80% compression, but alerts if a doctor's signature is erased!`
  },
  {
    question: "What is 'Spatial Domain' watermarking (e.g. Least Significant Bit - LSB), and what is its fatal vulnerability in production environments?",
    shortAnswer: "Spatial domain watermarking modifies raw pixel color values directly (e.g. replacing the 8th bit); its fatal flaw is extreme fragility (it is completely wiped out by standard JPEG compression, blurring, or noise).",
    explanation: "In Spatial LSB embedding: $I'(x, y) = (I(x, y) \\land \\text{0xFE}) \\lor W_i$. Replacing the 8th bit of pixel color planes introduces negligible visual distortion (high PSNR > 45 dB) and allows massive data capacity. However, because the 8th bit represents high-frequency noise, standard lossy JPEG quantization, contrast adjustment, or simple screenshot cropping completely destroys the embedded watermark signal, making it useless for robust copyright tracking.",
    hint: "Think of writing a secret note in light pencil dust on a table: a gentle breeze (JPEG compression) blows it away completely.",
    level: "moderate",
    codeExample: `// Spatial LSB Embedding:
Pixel_Byte:   11010110 (214 in decimal)
Watermark Bit: 1
Modified Byte: 11010111 (215 in decimal -> Imperceptible 1-unit change!)
// Problem: JPEG Lossy Quantization rounds 215 -> 210, ERASING THE WATERMARK!`
  },
  {
    question: "What is 'Frequency Domain' (Transform Domain) watermarking, and why are 'Middle-Frequency' coefficients in the Discrete Cosine Transform (DCT) chosen for embedding?",
    shortAnswer: "Transforming pixels into frequency coefficients (via DCT/DWT); middle-frequencies provide the optimal mathematical trade-off between human visual imperceptibility and robustness against lossy JPEG compression.",
    explanation: "In 2D-DCT, an image block is transformed into frequency spectrum coefficients: 1. Low-Frequency (DC & near-DC): Carries the bulk of visual energy; modifying low frequencies creates visible image distortion; 2. High-Frequency: Represents fine textures; standard lossy JPEG quantization discards high frequencies to save disk space; 3. Middle-Frequency: Offers the sweet spot where watermark modifications remain invisible to the Human Visual System (HVS) while surviving aggressive lossy JPEG compression.",
    hint: "Think of finding the Goldilocks zone in music: neither so loud that it distorts the song nor so quiet that compression filters remove it.",
    level: "expert",
    codeExample: `// DCT 8x8 Frequency Coefficient Matrix:
[ DC (Do Not Touch!)  Low-Freq    Low-Freq   Mid-Freq ... ]
[ Low-Freq           Mid-Freq*   Mid-Freq*  High-Freq ... ]
[ Low-Freq           Mid-Freq*   Mid-Freq*  High-Freq ... ]
[ Mid-Freq*          High-Freq   High-Freq  High-Freq (Discarded by JPEG!) ]
// *Middle Frequencies = OPTIMAL ROBUST WATERMARK EMBEDDING ZONE!`
  },
  {
    question: "How does the 'Discrete Wavelet Transform' (DWT) decompose an image, and why is DWT watermarking resilient against multi-resolution scaling and cropping attacks?",
    shortAnswer: "DWT decomposes an image into 4 spatial-frequency sub-bands (LL - Approximation, LH - Horizontal, HL - Vertical, HH - Diagonal); embedding in directional detail bands (LH/HL) survives multi-scale compression and geometric cropping.",
    explanation: "Unlike DCT which operates on rigid $8 \\times 8$ pixel blocks, 2D-DWT analyzes the entire image simultaneously at multiple resolutions: 1. $LL_1$ (Low-Low): Low-frequency approximation of the image; 2. $LH_1$: Horizontal edge details; 3. $HL_1$: Vertical edge details; 4. $HH_1$: Diagonal high-frequency textures. Embedding watermarks into $LH$ and $HL$ sub-bands distributes the watermark energy across global multi-resolution spatial structures, making DWT watermarks resilient against JPEG2000 compression, scaling, and cropping.",
    hint: "Think of viewing a landscape painting through multi-scale zoom lenses that capture both broad hills and fine leaves.",
    level: "expert",
    codeExample: `// 1-Level 2D-DWT Sub-Band Decomposition:
+-------------------+-------------------+
| LL1 (Approx)      | HL1 (Vertical)    |  <-- Embed in HL1 & LH1 for
+-------------------+-------------------+      maximum robustness!
| LH1 (Horizontal)  | HH1 (Diagonal)    |
+-------------------+-------------------+`
  },
  {
    question: "What is 'Singular Value Decomposition' (SVD) watermarking, and why do Singular Values ($S$) provide extreme mathematical stability under geometric image attacks?",
    shortAnswer: "SVD decomposes image matrix $A = U S V^T$; singular values ($S$) represent intrinsic image luminance energy and exhibit minimal numerical variation under rotation, scaling, and compression attacks.",
    explanation: "In linear algebra, any real matrix $A$ decomposes into orthogonal matrices $U$ and $V$, and diagonal matrix $S = \\text{diag}(\\sigma_1, \\sigma_2, \\dots, \\sigma_n)$ representing singular values in descending order. Adding watermark coefficients directly to singular values ($S' = S + \\alpha W$) preserves structural image integrity because small perturbations to matrix elements cause only tiny variations in singular values, providing world-class mathematical resilience against noise and filtering.",
    hint: "Think of modifying the core gravitational center of a gyroscope rather than altering its surface paint.",
    level: "expert",
    codeExample: `// SVD Watermark Embedding Pipeline:
1. Decompose Host Image: A = U * S * V^T
2. Modify Singular Values: S_watermarked = S + (alpha * Watermark_Matrix)
3. SVD on Modified Values: S_watermarked = U_w * S_new * V_w^T
4. Reconstruct Watermarked Image: A_w = U * S_new * V^T`
  },
  {
    question: "What are the two standard mathematical metrics used to evaluate the 'Perceptual Invisibility' of a watermarked image (PSNR and SSIM)?",
    shortAnswer: "Peak Signal-to-Noise Ratio (PSNR in dB, where >38 dB indicates imperceptible quality) and Structural Similarity Index (SSIM, where 1.0 indicates perfect visual structure preservation).",
    explanation: "To measure perceptual distortion: 1. PSNR (Peak Signal-to-Noise Ratio): Defined as $\\text{PSNR} = 10 \\log_{10} \\left( \\frac{MAX_I^2}{MSE} \\right)$ where MSE is the Mean Squared Error between cover image $I$ and watermarked image $I'$. A PSNR $> 38$ dB indicates that the Human Visual System cannot perceive watermark artifacts; 2. SSIM (Structural Similarity Index): Compares luminance, contrast, and structural correlation; an SSIM score $> 0.98$ guarantees pristine visual quality.",
    hint: "Remember the two industry-standard image fidelity metrics: decibels (PSNR) and structural correlation percentage (SSIM).",
    level: "moderate",
    codeExample: `// Quality Benchmark Metrics:
MSE = Sum( (Original[i,j] - Watermarked[i,j])^2 ) / (Width * Height)
PSNR = 10 * log10( 255^2 / MSE )  // Target: > 40 dB
SSIM = (2*mu_x*mu_y + c1)*(2*sigma_xy + c2) / ((mu_x^2 + mu_y^2 + c1)*(sigma_x^2 + sigma_y^2 + c2)) // Target: > 0.99`
  },
  {
    question: "What is the difference between 'Blind' and 'Non-Blind' Watermark Extraction?",
    shortAnswer: "Blind extraction recovers the watermark without needing the original unwatermarked host image; Non-Blind extraction requires the original cover image to subtract and isolate the embedded watermark.",
    explanation: "In Non-Blind watermarking, the decoder needs access to the pristine original cover image $I$ to subtract it from the watermarked image $I'$ ($W = (I' - I) / \\alpha$). While highly robust, non-blind schemes are impractical for automated internet web crawlers scanning millions of streaming videos. In Blind Watermarking, the decoding algorithm extracts the watermark using only the watermarked content and a secret key ($K$), making it the standard for broadcast monitoring and DRM.",
    hint: "Think of solving a puzzle using a secret magnifying glass alone (Blind) versus needing the master blueprint alongside the puzzle (Non-Blind).",
    level: "moderate",
    codeExample: `// Blind vs Non-Blind Extraction:
Non-Blind: Extracted_W = ( Received_Image - Original_Cover_Image ) / Alpha
Blind:     Extracted_W = Decoder_Function( Received_Image, Secret_Key ) // No original needed!`
  },
  {
    question: "Under Sections 65A and 65B of the Indian Copyright Act 1957 (amended 2012), what are the criminal penalties for circumvention of Technological Protection Measures and watermark removal?",
    shortAnswer: "Section 65A penalizes circumvention of TPM with up to 2 years imprisonment and fines; Section 65B penalizes unauthorized removal or alteration of Rights Management Information (RMI / Watermarks) with up to 2 years imprisonment.",
    explanation: "The Indian Copyright Act 1957 provides statutory protection for digital watermarks: 1. Section 65A: Protects Technological Protection Measures (TPM / DRM). Anyone who circumvents TPM with the intention of infringing copyright is punishable with imprisonment up to 2 years and a fine; 2. Section 65B: Protects Rights Management Information (RMI). Removing or altering digital watermarks or digital signatures embedded in digital works carries criminal liability up to 2 years imprisonment.",
    hint: "Remember the Indian copyright laws that make stripping digital watermarks a punishable criminal offense.",
    level: "basic",
    codeExample: `// Indian Copyright Act 1957 Statutory Provisions:
Section 65A: Protection of Technological Protection Measures (TPM / DRM) -> Up to 2 Years Jail.
Section 65B: Protection of Rights Management Information (Digital Watermarks / RMI) -> Up to 2 Years Jail.`
  },
  {
    question: "What is a 'Geometric Attack' (RST: Rotation, Scaling, Translation) on watermarked images, and how does the Fourier-Mellin Transform achieve RST invariance?",
    shortAnswer: "Geometric attacks de-synchronize the spatial coordinate grid so the detector cannot find embedded coefficients; Fourier-Mellin transforms the image to log-polar frequency coordinates, converting rotations and scale into invariant shifts.",
    explanation: "Even a 1-degree rotation or 5% crop does not visually degrade an image, but it shifts pixel coordinates completely, causing blind correlation detectors to output zero. In the Fourier-Mellin Transform: 1. The 2D-DFT magnitude is invariant to translation; 2. Converting the Cartesian frequency plane $(u, v)$ to Log-Polar coordinates $(\\log r, \\theta)$ transforms image scaling into horizontal translation and rotation into vertical translation; 3. Taking a second DFT produces coefficients completely invariant to RST geometric distortions.",
    hint: "Think of converting a circular spinning wheel into a flat ruler where spinning just shifts lines along the ruler.",
    level: "expert",
    codeExample: `// Fourier-Mellin RST Invariance Pipeline:
1. Compute 2D-DFT: F(u, v) = DFT2( Image ) -> Magnitude |F(u, v)| is Translation Invariant
2. Map to Log-Polar: (u, v) -> ( log(r), theta ) -> Converts Rotation & Scaling into Linear Shifts
3. Second DFT -> Yields RST-Invariant Transform Coefficients for Watermark Embedding!`
  },
  {
    question: "What is 'Collusion Attack' in digital fingerprinting (watermarking), and how do 'Tardos Fingerprinting Codes' defeat multi-user collusion?",
    shortAnswer: "Multiple malicious users combine their differently watermarked copies of the same film to average out and erase the watermark; Tardos probabilistic codes ensure that combining $c$ copies mathematically exposes at least one colluder.",
    explanation: "If a Hollywood studio or Kolkata OTT platform gives 5 reviewers uniquely watermarked video copies, the 5 users can align frames and compute the mathematical average of pixel values, canceling out the unique fingerprint noise. Gábor Tardos (2003) developed optimal probabilistic fingerprinting codes of length $m = O(c^2 \\log(1/\\epsilon))$. Even if $c$ adversaries collude, the mathematical correlation score of at least one colluder exceeds the detection threshold with provable probability $1 - \\epsilon$.",
    hint: "Think of embedding unique mathematical micro-dots across multiple paper copies so that averaging them together highlights the traitors.",
    level: "expert",
    codeExample: `// Tardos Collusion Resistance Theorem:
Colluders: c adversaries combine c watermarked copies.
Tardos Code Length: m = 100 * c^2 * ln( 1 / epsilon )
Result: Accusation Score( Traitor_i ) > Threshold Z -> Traitor Identity PROVEN in Court!`
  },
  {
    question: "What is 'Reversible Watermarking' (Lossless Watermarking), and why is it mandatory in Medical Informatics (DICOM) and Military Satellite Imagery?",
    shortAnswer: "A watermarking technique that allows the detector to extract the watermark AND completely restore the original cover image bit-for-bit, ensuring zero permanent pixel distortion in medical diagnoses.",
    explanation: "In standard robust watermarking, embedding introduces permanent (though subtle) pixel noise. In clinical oncology (mammograms, brain MRI scans) or military satellite target reconnaissance, modifying even a few pixels could cause a radiologist to misdiagnose a tumor. Reversible Watermarking (using Difference Expansion or Prediction Error Expansion) embeds patient metadata into the image and enables the clinic's viewer to extract the data while perfectly reconstructing the 100% original unwatermarked raw image.",
    hint: "Think of an invisible adhesive note that peels off completely without leaving any sticky residue on a fragile historical manuscript.",
    level: "expert",
    codeExample: `// Difference Expansion Reversible Watermarking:
Pixel Pair: (x, y) = (100, 104)
Difference: d = y - x = 4 | Average: a = floor((x+y)/2) = 102
Embed Bit b=1: d' = 2*d + b = 2*4 + 1 = 9
Watermarked Pixels: x' = a - floor(d'/2) = 102-4 = 98, y' = a + ceil(d'/2) = 102+5 = 107
// Decoder: Extracts b = d' mod 2 = 1, AND RESTORES ORIGINAL (100, 104) 100% LOSSLESSLY!`
  },
  {
    question: "How does 'Audio Watermarking' use the 'Psychoacoustic Masking Model' (Frequency Masking and Temporal Masking) to embed imperceptible acoustic signals?",
    shortAnswer: "By embedding watermark frequencies below the human ear's Threshold of Hearing or underneath loud dominant tones (Auditory Masking), making the watermark completely inaudible to human listeners.",
    explanation: "The Human Auditory System (HAS) has dynamic perceptual limitations: 1. Frequency (Simultaneous) Masking: When a loud 1 kHz acoustic tone (e.g. a drum hit) occurs, quiet frequencies within the critical band cannot be heard by the human ear; 2. Temporal Masking: A loud sound masks quiet sounds occurring immediately before (pre-masking, ~20ms) or after (post-masking, ~100ms). Spread-spectrum audio watermarks are shaped to hide strictly within masked energy pockets, surviving MP3/AAC compression at 128 kbps.",
    hint: "Think of whispering a secret during a loud thunderclap so nobody in the room can hear your voice.",
    level: "expert",
    codeExample: `// Audio Psychoacoustic Masking:
Audio Spectrum: Dominant Peak at 1,000 Hz @ 85 dB
Masking Threshold: All sounds below 55 dB at 1,000±100 Hz are 100% INAUDIBLE!
Watermark Signal: Injected at 40 dB in the 1,050 Hz band -> Completely Imperceptible!`
  },
  {
    question: "What is 'Dual Watermarking' (Combining Robust and Fragile Watermarks in a Single Image), and how does it provide both Copyright Ownership and Tamper Localization?",
    shortAnswer: "Embedding a Robust DCT/DWT watermark in the middle frequencies for persistent copyright ownership, and a Fragile spatial LSB watermark for detecting and highlighting the exact pixels tampered by an attacker.",
    explanation: "A single watermark scheme cannot satisfy conflicting goals. Dual Watermarking integrates both: 1. Layer 1 (Robust Frequency Watermark): Embedded in DCT/DWT mid-bands using a secret key; survives lossy compression, cropping, and internet sharing to prove legal copyright under Section 65B; 2. Layer 2 (Fragile Spatial Watermark): Embedded in spatial LSBs; if an attacker alters a license plate or signature in a court photograph, the fragile watermark breaks only in that local block, pinpointing the exact coordinates of tampering.",
    hint: "Think of an armored steel chassis (Robust) covered by a delicate layer of tamper-evident paint (Fragile).",
    level: "expert",
    codeExample: `// Dual Watermarking Architecture:
Input Image ──> [ DWT Robust Embedder (Owner ID) ] ──> [ Spatial Fragile Embedder (Block Hash) ]
Detector:
  - Robust Channel: Extracts "Owner: Mamata Kolkata" (Survives Web Resizing!)
  - Fragile Channel: Flags "Tampering Detected at Coordinates (X: 140..180, Y: 220..260)"!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, how does Forensic Watermarking (Traitor Tracing) enforce accountability on cloud EHR databases?",
    shortAnswer: "Whenever an authorized employee downloads a patient record, a unique invisible watermark containing their Employee ID and timestamp is dynamically embedded, ensuring forensic accountability if records are leaked.",
    explanation: "Under the DPDP Act 2023, data fiduciaries face statutory fines up to ₹250 Crores for unauthorized data exposure. When a hospital employee (doctor, nurse, billing clerk) exports or screenshots a patient's medical history, the enterprise viewer dynamically injects a personalized invisible watermark (Employee ID + Department + Timestamp). If the image is subsequently posted to social media, the Data Protection Officer extracts the watermark and identifies the leaker within seconds.",
    hint: "Remember how dynamic personalized watermarking tracks the exact source of an insider data leak.",
    level: "moderate",
    codeExample: `// Forensic Traitor Tracing Pipeline:
Employee Mamata views Patient X-Ray -> Viewer injects: Watermark("EMP-9021-MAMATA-2026-08-23")
Leaked Image Found on Dark Web -> Extraction: "EMP-9021-MAMATA" -> Leaker Identified & Fined!`
  },
  {
    question: "What is 'Spread Spectrum Watermarking' (Direct Sequence Spread Spectrum - DSSS), and how does spreading a narrow-band watermark across wide frequency bands achieve extreme resilience against jamming?",
    shortAnswer: "The watermark bit is multiplied by a long Pseudo-Random Noise (PN) sequence, spreading its energy across all frequency spectrum bins below the noise floor; correlation with the PN key extracts the signal perfectly.",
    explanation: "Introduced by Cox et al. in 1997, Spread Spectrum watermarking applies military radio techniques to images. A 1-bit watermark $W_i \\in \\{-1, +1\\}$ is multiplied by a long pseudorandom sequence $P_i \\in \\{-1, +1\\}^L$. The resulting signal is embedded into $L$ frequency coefficients with tiny amplitude $\\alpha$. Because the energy is spread thinly across hundreds of frequencies, it is imperceptible (below the noise floor) and impossible for an attacker to remove without destroying the entire image. The detector computes correlation: $C = \\sum I'_i \\cdot P_i$.",
    hint: "Think of dissolving a grain of sugar across an entire Olympic swimming pool: invisible to the eye, but detected by a chemical test.",
    level: "expert",
    codeExample: `// Spread Spectrum Embedding & Correlation:
Watermark Bit: b = +1
PN Sequence:   P = [+1, -1, +1, +1, -1, ...] (Length L = 1024)
Embedded Wave: I'_k = I_k + alpha * b * P_k
Detector:      Correlation = Sum( I'_k * P_k ) = b * alpha * L + Noise -> If Corr > 0 => Bit = 1!`
  },
  {
    question: "Synthesizing Digital Watermarking: what is the master engineering guideline for designing enterprise multimedia protection architectures?",
    shortAnswer: "Deploy Frequency-Domain DWT-DCT spread spectrum watermarks for robust copyright and traitor tracing; deploy Reversible Fragile watermarks for medical/legal integrity; and anchor legal claims under Indian Copyright Act Section 65A/B.",
    explanation: "Digital watermarking bridges the gap between cryptographic math and perceptual signal processing. An impenetrable multimedia security architecture deploys a multi-tier strategy: robust transform-domain DWT-DCT algorithms for tracking broadcast piracy and insider leaks, lossless reversible watermarking for medical EHR compliance, and statutory alignment under the Indian Copyright Act 1957 and DPDP Act 2023 to ensure digital evidence stands up in court.",
    hint: "Conclude by recognizing how balancing imperceptibility, robustness, and statutory compliance creates enduring multimedia security.",
    level: "expert",
    codeExample: `// The Master Watermarking Architectural Equation:
(DWT_DCT_SpreadSpectrum + Reversible_DICOM_Integrity + Indian_Copyright_Act_Sec65B) = COMPLETE_MULTIMEDIA_PROTECTION;`
  }
];

export default questions;
