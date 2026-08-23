const questions = [
  {
    id: 1,
    question: "What are the three primary physiological biometric modalities used in modern identity verification systems?",
    shortAnswer: "1. Fingerprint Recognition (friction ridge minutiae); 2. Facial Recognition (2D/3D facial landmark embeddings); 3. Iris Scanning (epigenetic trabecular meshwork patterns via Daugman's algorithm).",
    explanation: "These physiological traits belong to the 'Something You ARE' (Inherence) authentication factor category, providing non-transferable identity binding.",
    hint: "Fingerprint, Facial geometry, and Iris scanning.",
    level: "Basic",
    codeExample: `// Primary Modalities:
// 1. Fingerprint : Minutiae (Ridge Endings & Bifurcations)
// 2. Face        : 128-D Deep Neural Network Vector Embeddings
// 3. Iris        : 2048-bit Phase Demodulation IrisCode`
  },
  {
    id: 2,
    question: "What is a Minutiae Point in fingerprint recognition and what are the two most common types?",
    shortAnswer: "A minutiae point is a local discontinuity in the fingerprint friction ridge pattern. The two most common types are Ridge Endings (where a ridge abruptly stops) and Bifurcations (where a single ridge branches into two separate ridges).",
    explanation: "Fingerprint templates record the spatial coordinates (x, y), orientation angle (theta), and type of 30 to 80 minutiae points for matching.",
    hint: "Ridge Endings (ridge terminates) and Bifurcations (ridge splits into two).",
    level: "Basic",
    codeExample: `// Minutiae Tuple:
// { x: 142, y: 88, type: "BIFURCATION", orientation_angle: 45.2° }`
  },
  {
    id: 3,
    question: "How does Daugman's Algorithm process an eye image into an IrisCode?",
    shortAnswer: "1. Detects pupil and limbic boundaries. 2. Unwraps the circular iris into a normalized rectangular polar coordinate strip. 3. Convolves the texture with multi-scale 2D Gabor wavelets. 4. Quantizes the complex phase response into a 2048-bit binary IrisCode with a matching noise mask.",
    explanation: "Daugman's phase demodulation transforms complex biological tissue patterns into a compact 256-byte binary string capable of ultra-fast bitwise XOR matching.",
    hint: "Unwraps circular iris into polar strip and applies 2D Gabor wavelets to extract phase bits.",
    level: "Expert",
    codeExample: `// Daugman IrisCode Pipeline:
// Eye Image -> Circular Boundary Detection -> Polar Coordinate Unwrapping -> 2D Gabor Filtering -> 2048-bit Binary IrisCode`
  },
  {
    id: 4,
    question: "What mathematical formula is used to compare two IrisCodes in Daugman's algorithm and what threshold constitutes a match?",
    shortAnswer: "Fractional Hamming Distance: HD = (sum((IrisCode_A XOR IrisCode_B) AND Mask_A AND Mask_B)) / (sum(Mask_A AND Mask_B)). A match is declared if HD < 0.32 (indicating over 68% bitwise agreement).",
    explanation: "Because two unrelated eyes share an average HD of 0.50 (random coin flips), an HD below 0.32 provides a theoretical False Acceptance Rate of less than 1 in 4 million.",
    hint: "Hamming Distance using bitwise XOR and bitmask; match declared if HD < 0.32.",
    level: "Expert",
    codeExample: `// Hamming Distance Calculation:
const differingBits = countOnes((codeA ^ codeB) & maskA & maskB);
const validBits = countOnes(maskA & maskB);
const hd = differingBits / validBits;
const isMatch = hd <= 0.32; // MATCH VERIFIED ✔`
  },
  {
    id: 5,
    question: "What is the Biometric Non-Revocability Problem and why is it a critical vulnerability?",
    shortAnswer: "Unlike passwords or cryptographic keys, human biological traits cannot be revoked, reset, or re-issued if a raw template is breached. Once your facial geometry or raw fingerprint is leaked, your biological identity is compromised for life.",
    explanation: "This fundamental constraint requires that raw biometric images never be transmitted or stored in central plaintext databases.",
    hint: "You cannot change your biological face or fingerprint if a database is breached.",
    level: "Basic",
    codeExample: `// Non-Revocability:
// Leaked Password ➔ User resets password (Fixed in 10s ✔)
// Leaked Fingerprint ➔ Biological finger is compromised forever ❌`
  },
  {
    id: 6,
    question: "What are Cancellable Biometrics (BioHashing) and how do they solve the non-revocability problem?",
    shortAnswer: "Cancellable Biometrics applies a parameterized, non-invertible mathematical transformation (e.g., projection onto random orthogonal vectors using a user-specific seed key) to the biometric features before storage. If a template is compromised, a new seed key is issued to generate a fresh, completely distinct template from the same finger.",
    explanation: "Because the transformation is non-invertible, attackers possessing the transformed template cannot reconstruct the original biological fingerprint.",
    hint: "Non-invertible mathematical transforms that allow issuing new templates if breached.",
    level: "Expert",
    codeExample: `// Cancellable BioHashing:
// Raw Fingerprint Vector V + User Key K1 ➔ Transformed Template T1 (Stored in DB)
// If T1 breached ➔ Admin issues Key K2 ➔ Produces New Template T2 from same finger!`
  },
  {
    id: 7,
    question: "What is a Presentation Attack (Spoofing) in biometric authentication according to ISO/IEC 30107-3?",
    shortAnswer: "A Presentation Attack is the presentation of an artificial replica (spoof artifact such as a 2D photo, video on an iPad, 3D silicon mask, or gelatin fake fingerprint) to a biometric sensor to impersonate an authorized user.",
    explanation: "ISO/IEC 30107 defines standards for Presentation Attack Detection (PAD) metrics and testing methodologies.",
    hint: "Presenting a fake artifact (silicon mask, photo, fake finger) to trick a biometric sensor.",
    level: "Moderate",
    codeExample: `// Presentation Attack Examples:
// 1. 2D Photo / Tablet Screen held in front of webcam
// 2. 3D Printed Silicon Mask
// 3. Gelatin / Play-Doh "Gummy Finger" with lifted fingerprint ridges`
  },
  {
    id: 8,
    question: "How does 3D Structured Light Infrared Facial Recognition (e.g., Apple Face ID) prevent 2D photo spoofing?",
    shortAnswer: "An infrared dot projector beams over 30,000 invisible structured infrared dots onto the user's face. An infrared camera captures the 3D grid distortion to measure actual facial depth, contours, and micro-curvature, instantly rejecting flat 2D photographs or digital screens.",
    explanation: "Because a 2D photograph or smartphone screen is completely flat, the infrared dot mesh reflects without depth distortion and is rejected immediately.",
    hint: "Projects 30,000 IR dots to create a 3D depth mesh that flat photos cannot replicate.",
    level: "Moderate",
    codeExample: `// 3D Depth Verification:
// Projects 30,000 dots -> Calculates Z-depth coordinate for each point -> Rejects flat Z=0 photos.`
  },
  {
    id: 9,
    question: "What are the differences between Optical, Capacitive, and Ultrasonic Fingerprint Sensors?",
    shortAnswer: "Optical: Takes a 2D photographic snapshot using visible light (easily fooled by high-res photos). Capacitive: Uses thousands of tiny capacitor plates to measure electrical charge variations between conductive skin ridges and air valleys. Ultrasonic: Emits high-frequency sound waves penetrating epidermal layers to map true 3D sub-surface ridges (immune to dirty/wet fingers).",
    explanation: "Ultrasonic sensors provide the highest security because they scan deep sub-dermal tissue, defeating surface-level silicon fake fingerprints.",
    hint: "Optical = 2D camera; Capacitive = electrical charge; Ultrasonic = 3D sound waves.",
    level: "Moderate",
    codeExample: `// Sensor Technologies:
// Optical    : 2D Image (Low security, common in cheap door locks)
// Capacitive : Micro-capacitance array (Standard in laptops & smartphones)
// Ultrasonic : 3D Acoustic Echo (High security, in-display smartphone sensors)`
  },
  {
    id: 10,
    question: "What is Liveness Detection and what are three active vs passive techniques?",
    shortAnswer: "Liveness Detection verifies that a biometric sample originates from a living human physically present at the sensor. Active: Prompting head rotation, smiling, or reading random words. Passive: Infrared depth sensing, thermal blood-heat mapping ($36.5^\circ\\text{C}$), and optical pulse oximetry (capillary blood pulsation).",
    explanation: "Passive liveness is preferred in modern consumer applications because it prevents spoofs without creating user interaction friction.",
    hint: "Verifies sample is from a live human using depth, thermal heat, or involuntary eye blinking.",
    level: "Moderate",
    codeExample: `// Passive Liveness Checks:
// 1. Thermal Infrared Camera : Checks body temperature (36.5°C - 37.5°C)
// 2. Photoplethysmography (rPPG): Detects facial blood pulse micro-color shifts
// 3. Eye Saccade Tracker      : Detects involuntary micro-movements of live human eyes`
  },
  {
    id: 11,
    question: "What is the difference between 1:1 Biometric Verification and 1:N Biometric Identification?",
    shortAnswer: "1:1 Verification (Authentication): User claims an identity ('I am Susmita') and presents a biometric sample; the system compares it strictly against Susmita's enrolled template. 1:N Identification (Search): User presents a biometric sample with no ID; the system searches across an entire database of N users to find a match.",
    explanation: "1:1 verification is fast and computationally lightweight; 1:N identification requires massive computing clusters (e.g., searching Aadhaar's 1.4 billion database).",
    hint: "1:1 matches against one known user; 1:N searches across an entire database of N users.",
    level: "Basic",
    codeExample: `// 1:1 Verification     : match(probeSample, susmitaEnrolledTemplate) ➔ Boolean (Pass/Fail)
// 1:N Identification : search(probeSample, [user1, user2, ..., userN]) ➔ Matched User ID`
  },
  {
    id: 12,
    question: "Why do biometric systems operate on Probabilistic Matching rather than Exact Deterministic Matching?",
    shortAnswer: "Because biological traits change slightly on every scan due to sensor pressure, finger placement angle, facial expression, ambient lighting, dirt, cuts, and aging. Biometric algorithms compute a Similarity Score and compare it against a decision threshold theta.",
    explanation: "Unlike cryptographic hashes where changing a single bit produces a completely different output, biometric systems must tolerate natural physical variations.",
    hint: "Biological scans vary on every capture; matching evaluates similarity scores against thresholds.",
    level: "Basic",
    codeExample: `// Probabilistic Decision:
const similarityScore = computeCosineSimilarity(probeVector, galleryVector); // e.g. 0.88
if (similarityScore >= DECISION_THRESHOLD) {
    grantAccess(); // Match declared
}`
  },
  {
    id: 13,
    question: "What is a Deep Neural Network (DNN) Face Embedding and what vector dimensions are standard?",
    shortAnswer: "A DNN face embedding (e.g., FaceNet, ArcFace) is a compact, dense numerical vector (typically 128, 256, or 512 floating-point dimensions) generated by a convolutional neural network representing high-level facial geometry on a normalized hypersphere.",
    explanation: "Embeddings place identical faces close together in Euclidean space while pushing different faces far apart, allowing rapid Cosine Similarity comparison.",
    hint: "128-D to 512-D vector produced by neural networks representing facial features.",
    level: "Moderate",
    codeExample: `// 128-D Face Embedding Vector:
// [ 0.042, -0.198, 0.512, ..., -0.089 ] (128 floats, unit length ||V|| = 1.0)`
  },
  {
    id: 14,
    question: "How does Latent Fingerprint Lifting exploit physical surfaces to compromise optical sensors?",
    shortAnswer: "Adversaries dust for residual sebum/oil fingerprint residues left on smooth glass or smartphone screens, photograph the print with macro lenses, invert the contrast, and print a 3D conductive ink or silicon mold (gummy finger) to bypass optical/capacitive sensors.",
    explanation: "This attack exploits the fact that humans leave latent biometric credentials on every surface they touch throughout the day.",
    hint: "Lifting residual finger oil residues from glass surfaces to fabricate silicon replica molds.",
    level: "Moderate",
    codeExample: `// Latent Print Lift:
// Touch Screen -> Sebum Oil Residue -> UV Light Dusting -> Silicon Mold Casting -> Fake Finger Spoof`
  },
  {
    id: 15,
    question: "What is Near-Infrared (NIR) Illumination and why is it mandatory for Iris Scanning?",
    shortAnswer: "Dark brown irises (predominant in South Asian and African populations) contain high concentrations of melanin that absorb visible light, appearing almost featureless under normal cameras. Near-infrared light (700–900 nm) penetrates melanin, revealing the complex, intricate trabecular meshwork pattern beneath.",
    explanation: "NIR illumination also ensures consistent contrast regardless of ambient room lighting conditions.",
    hint: "Near-infrared light penetrates melanin pigments to reveal intricate iris patterns in dark brown eyes.",
    level: "Moderate",
    codeExample: `// NIR Wavelength:
// Visible Light (400-700nm): Dark brown eye appears as solid black disk.
// NIR Light (700-900nm)    : Melanin becomes transparent; intricate iris crypts & collarette revealed!`
  },
  {
    id: 16,
    question: "What is the Secure Enclave / TrustZone architecture used for biometric template protection on smartphones?",
    shortAnswer: "The Secure Enclave is an isolated hardware coprocessor with dedicated encrypted memory and separate cryptographic execution hardware. Biometric sensor data is wired directly to the Secure Enclave; the main OS (Android/iOS) receives only a binary 'Match/No-Match' token and never sees the raw biometric template.",
    explanation: "Even if the main operating system is fully rooted or infected with kernel-level malware, the attacker cannot extract raw biometric templates from the Secure Enclave.",
    hint: "Hardware-isolated coprocessor storing and matching templates completely out of reach of the main OS.",
    level: "Expert",
    codeExample: `// Secure Enclave Isolation:
// Biometric Sensor ➔ [DIRECT HARDWARE BUS] ➔ Secure Enclave (Matches Template)
// Secure Enclave ➔ Returns: { "authenticated": true, "auth_token": "signed_assertion" } ➔ Android/iOS`
  },
  {
    id: 17,
    question: "What is a MasterPrint in fingerprint biometrics and how is it generated?",
    shortAnswer: "A MasterPrint is a synthetic fingerprint template engineered using machine learning that contains common, universally recurring minutiae sub-patterns, capable of matching against partial fingerprint sensors across a large percentage of unrelated users.",
    explanation: "Because small smartphone sensors capture only tiny partial prints (matching on only 5-10 minutiae), MasterPrints exploit high false match rates in partial sensors.",
    hint: "Synthetic fingerprint template containing common sub-patterns that match partial sensors across many users.",
    level: "Expert",
    codeExample: `// MasterPrint Vulnerability:
// Partial Sensor (Matches on 6 minutiae) -> MasterPrint matches 20-30% of enrolled user pool!`
  },
  {
    id: 18,
    question: "How do Deepfake Video Puppetry attacks target video-based facial identity verification (e.g., e-KYC video calls)?",
    shortAnswer: "Adversaries train Generative Adversarial Networks (GANs) or diffusion models on photographs of a victim to synthesize real-time video feeds that mimic the victim's face, synchronizing lip movements and head turns to pass live video interview challenges.",
    explanation: "Modern defense requires AI artifact detection, reflection geometry analysis, and challenge-response micro-latency testing.",
    hint: "AI generative models synthesizing real-time video to impersonate faces during video KYC.",
    level: "Moderate",
    codeExample: `// Deepfake Attack on e-KYC:
// Attacker Video Camera -> Real-Time GAN Face Swap (Victim's Face) -> Injected into Browser Webcam Feed`
  },
  {
    id: 19,
    question: "What is Behavioral Biometrics and how does it complement physiological biometrics?",
    shortAnswer: "Behavioral biometrics analyzes dynamic human behavioral patterns over time (e.g., keystroke flight time, touchscreen swipe velocity, mouse trajectory curves, gait rhythm) rather than static biological features.",
    explanation: "Behavioral biometrics enables continuous background authentication without interrupting user workflow or collecting sensitive biological images.",
    hint: "Analyzes dynamic behavior like typing rhythm, swipe velocity, and mouse movement.",
    level: "Basic",
    codeExample: `// Behavioral Features:
// Keystroke Dwell Time  : Time a key is held down (ms)
// Keystroke Flight Time : Time between releasing key A and pressing key B (ms)
// Touch Pressure & Curve: Pressure and angle during screen swipes`
  },
  {
    id: 20,
    question: "What is Template Inversion / Reconstruction attack in biometric systems?",
    shortAnswer: "A Template Inversion attack uses machine learning algorithms to reverse-engineer a reconstructed synthetic fingerprint image or facial photograph directly from stored mathematical feature vectors (minutiae lists or DNN embeddings).",
    explanation: "This disproves the common myth that 'feature vectors cannot be converted back into images', underscoring why templates must be protected with strong cryptographic encryption.",
    hint: "Reverse-engineering a synthetic biological image directly from mathematical feature vectors.",
    level: "Expert",
    codeExample: `// Template Inversion:
// Stored Minutiae List (x, y, theta) -> Reconstruction Algorithm -> Synthetic Fingerprint Image -> Fabricates Physical Fake Finger!`
  },
  {
    id: 21,
    question: "Why is Voice Biometrics (Speaker Recognition) highly vulnerable to Voice Cloning and Deepfake Audio?",
    shortAnswer: "Modern text-to-speech AI models (like VALL-E or ElevenLabs) can clone a victim's exact vocal timbre, pitch, cadence, and acoustic resonance using as little as 3 seconds of reference audio sampled from social media or phone calls.",
    explanation: "Voice biometrics without multi-frequency phase-coherence liveness verification is easily bypassed by synthesized audio played into microphones.",
    hint: "Generative AI can clone vocal timbre and cadence from 3 seconds of reference audio.",
    level: "Moderate",
    codeExample: `// Voice Clone Vector:
// 5s Voice Sample from YouTube -> AI Voice Cloner -> Synthesizes "My voice is my password" -> Bypasses Phone Banking!`
  },
  {
    id: 22,
    question: "What is the role of the FIDO Alliance Biometric Component Certification Program?",
    shortAnswer: "It tests and certifies that biometric recognition subsystems meet stringent False Acceptance Rate (FAR), False Rejection Rate (FRR), and Presentation Attack Detection (PAD) standards before being deployed in FIDO2 hardware.",
    explanation: "Certification guarantees that sensors are tested against standardized spoof artifacts (silicon, latex, 3D masks) in independent testing laboratories.",
    hint: "Independent lab testing certifying sensor accuracy and resistance against physical spoofs.",
    level: "Moderate",
    codeExample: `// FIDO Certified Biometrics:
// Requires PAD Level 1 & 2 testing (Resistant to photos, video screens, and 3D silicon molds).`
  },
  {
    id: 23,
    question: "How does Vascular Biometrics (Finger Vein / Palm Vein recognition) operate and why is it virtually impossible to spoof?",
    shortAnswer: "Near-infrared light shines through the finger/palm; deoxygenated hemoglobin in blood absorbs the infrared light, creating an internal shadow map of the subcutaneous vein network. Because vein patterns are internal within biological tissue and require active blood flow, they cannot be photographed or lifted from surfaces.",
    explanation: "A severed finger or silicon replica lacks deoxygenated hemoglobin flow and is immediately rejected.",
    hint: "Maps internal blood vessel patterns beneath the skin; requires live hemoglobin flow.",
    level: "Expert",
    codeExample: `// Palm Vein Scanning:
// NIR Light (760nm) -> Absorbed by Hemoglobin in Blood -> Cameras map internal 3D vein branches.`
  },
  {
    id: 24,
    question: "What is Aadhaar Enabled Payment System (AePS) and what fraud vector exploited silicon thumb clones in rural India?",
    shortAnswer: "AePS allows banking withdrawals using a 12-digit Aadhaar number and fingerprint scan at Micro-ATMs. Fraud syndicates harvested fingerprint images from public land registry deed documents, cast 3D silicon thumb replicas, and drained rural accounts.",
    explanation: "UIDAI neutralized this by mandating real-time Two-Factor Liveness Detection checking dermal conductivity and blood pulsation on all AePS terminals.",
    hint: "Silicon replicas made from lifted land deed documents used to drain micro-ATM accounts; mitigated by liveness checks.",
    level: "Moderate",
    codeExample: `// AePS Fraud & Mitigation:
// Attack: Land Registry PDF (Fingerprint Image) -> Silicon Replica -> Micro-ATM Withdrawal ❌
// Defense: UIDAI mandatory 2-Factor AI Fingerprint Liveness Detection deployed nationwide ✔`
  },
  {
    id: 25,
    question: "What is Biometric Cryptosystem (Fuzzy Vault / Fuzzy Extractor)?",
    shortAnswer: "A Fuzzy Extractor extracts a uniformly random, high-entropy cryptographic key from a noisy biometric input and outputs public 'helper data'. During authentication, a fresh biometric reading combined with the helper data reconstructs the exact secret key.",
    explanation: "This allows generating true cryptographic encryption keys directly from biological traits without storing the biometric template.",
    hint: "Extracts an exact cryptographic key from noisy biometric readings using helper data.",
    level: "Expert",
    codeExample: `// Fuzzy Extractor:
// Gen(Biometric_Bio) ➔ (Secret_Key K, Helper_Data P)
// Rep(Biometric_Bio', Helper_Data P) ➔ Exact Secret_Key K (If Bio' is close to Bio)`
  },
  {
    id: 26,
    question: "How does aging and physical injury affect fingerprint and facial recognition accuracy over a 10-year horizon?",
    shortAnswer: "Aging causes epidermal skin thinning, loss of elasticity, and wrinkle formation (increasing fingerprint and face FRR). Facial recognition templates experience template decay, requiring periodic template updating algorithms or adaptive enrollment to track slow biological drift.",
    explanation: "In contrast, the adult human iris structure remains remarkably stable and immutable across an entire lifetime.",
    hint: "Fingerprints and faces change with aging and injuries; iris patterns remain stable for life.",
    level: "Basic",
    codeExample: `// Template Drift:
// Iris Recognition    : 0% template decay over 25 years (Stable muscle structure)
// Facial Recognition : 5-10% score degradation over 5 years (Requires adaptive updating)`
  },
  {
    id: 27,
    question: "What is the privacy risk of Biometric Cross-Matching across unrelated corporate databases?",
    shortAnswer: "If multiple organizations store identical raw biometric templates (e.g., your raw fingerprint or face encoding), a rogue government agency or attacker can cross-reference and correlate your activities across banking, health, travel, and social platforms without your consent.",
    explanation: "Cancellable biometrics prevents cross-matching by ensuring every organization uses a distinct mathematical transform key, producing uncorrelated templates.",
    hint: "Using identical raw templates allows tracking and correlating user activity across different unrelated organizations.",
    level: "Moderate",
    codeExample: `// Cross-Matching Risk:
// Bank Database (Raw Face) + Hospital Database (Raw Face) ➔ Correlates user's medical records with financial accounts!`
  },
  {
    id: 28,
    question: "What is Coercion / Duress Risk in biometric authentication (e.g., forced unlock)?",
    shortAnswer: "Unlike a password (which an attacker cannot physically force out of your brain if you refuse), an attacker can physically hold a victim's finger against a sensor or point a phone at their face while they are tied up or sleeping.",
    explanation: "Mitigations include 'Attention Awareness' (requiring open eyes and focused gaze), Panic/Duress fingers (enrollment of a specific finger that secretly alerts police), and requiring a PIN after reboot.",
    hint: "Physically forcing a victim's finger or face onto a sensor; mitigated by gaze detection and duress fingers.",
    level: "Basic",
    codeExample: `// Duress Mitigations:
// 1. Attention Detection : Eyes must be open and looking directly at camera.
// 2. Duress Fingerprint : Unlocking with Pinky finger silently dispatches silent SOS to security.`
  },
  {
    id: 29,
    question: "How do Optical Pulse Oximetry and Remote Photoplethysmography (rPPG) detect liveness in facial video feeds?",
    shortAnswer: "rPPG analyzes subtle, invisible micro-color fluctuations in human skin caused by arterial blood pulsation with each heartbeat. Standard video cameras measure these periodic green-channel photon absorption shifts to extract a real cardiac pulse signal.",
    explanation: "A silicon mask or static photograph has zero blood flow and produces a flat, non-pulsing rPPG spectrum, triggering an instant spoof alert.",
    hint: "Measures invisible skin micro-color changes corresponding to cardiac blood pulse.",
    level: "Expert",
    codeExample: `// rPPG Pulse Detection:
// Extract skin pixel average in Green Channel -> Fast Fourier Transform (FFT) -> Detects 1.2 Hz peak (72 BPM Heartbeat) ✔`
  },
  {
    id: 30,
    question: "In a high-security defense installation in Ichapur, an access control terminal using 2D facial recognition was bypassed during night shifts by holding an iPad playing a recorded video of the facility commander. What three layered architectural upgrades were implemented?",
    shortAnswer: "1. Upgraded to 3D Structured Light Infrared sensors measuring physical facial depth curvature. 2. Integrated Thermal Infrared imaging to verify biological human body temperature ($36.8^\circ\\text{C}$). 3. Enforced multi-modal authentication combining 3D facial verification with a hardware FIDO2 PIN.",
    explanation: "Eliminating single-modality 2D optical cameras and deploying hardware-based Presentation Attack Detection (ISO/IEC 30107-3) completely neutralizes screen playback and 2D photograph spoofing.",
    hint: "3D Structured Light IR depth, thermal body heat verification, and multi-modal FIDO2 key pairing.",
    level: "Expert",
    codeExample: `// Layered Defense Upgrade:
// Layer 1: 3D IR Dot Mesh (Rejects flat iPad screen)
// Layer 2: Thermal Heatmap (Rejects room-temperature glass iPad)
// Layer 3: Hardware FIDO2 Security Key + PIN (Multi-Factor assurance)`
  }
];

export default questions;
