const questions = [
  {
    id: 1,
    question: "What is False Acceptance Rate (FAR / Type II Error) and what is its mathematical formula?",
    shortAnswer: "FAR is the probability that an unauthorized imposter is incorrectly accepted as a legitimate user: FAR(theta) = (Total False Acceptances) / (Total Imposter Presentation Attempts).",
    explanation: "FAR directly measures the vulnerability of a security perimeter to unauthorized intrusion.",
    hint: "Fraction of imposter attempts that are incorrectly accepted by the system.",
    level: "Basic",
    codeExample: `// FAR Formula:
// FAR(theta) = (False_Acceptances / Total_Imposter_Attempts) * 100%`
  },
  {
    id: 2,
    question: "What is False Rejection Rate (FRR / Type I Error) and what is its mathematical formula?",
    shortAnswer: "FRR is the probability that an authorized, legitimate user is incorrectly rejected and denied access: FRR(theta) = (Total False Rejections) / (Total Genuine Presentation Attempts).",
    explanation: "FRR directly measures user friction, workflow inconvenience, and false alarm rates.",
    hint: "Fraction of legitimate user attempts that are incorrectly rejected.",
    level: "Basic",
    codeExample: `// FRR Formula:
// FRR(theta) = (False_Rejections / Total_Genuine_Attempts) * 100%`
  },
  {
    id: 3,
    question: "What is the Equal Error Rate (EER / Crossover Error Rate CER) and why is it universally used as the benchmark metric for biometric comparison?",
    shortAnswer: "EER is the operating point where the False Acceptance Rate exactly equals the False Rejection Rate (FAR = FRR). It provides a standardized, threshold-independent metric to compare the intrinsic algorithmic and sensor accuracy of different biometric systems.",
    explanation: "A lower EER value indicates a superior, more discerning biometric recognition algorithm.",
    hint: "The crossover point where FAR equals FRR; lower EER means higher overall accuracy.",
    level: "Basic",
    codeExample: `// Equal Error Rate (EER):
// At threshold theta*: FAR(theta*) == FRR(theta*) == EER`
  },
  {
    id: 4,
    question: "What happens to FAR and FRR when an administrator increases the decision threshold theta towards 1.0 (strict matching)?",
    shortAnswer: "FAR decreases towards 0% (imposters are strictly blocked), but FRR increases significantly (legitimate users with slight finger angles, dirty skin, or glasses will be falsely rejected).",
    explanation: "Increasing the threshold makes the system more secure against intruders at the expense of user convenience and retry rates.",
    hint: "Higher threshold lowers FAR (more secure) but raises FRR (more false rejections).",
    level: "Basic",
    codeExample: `// Increasing Threshold (theta -> 1.0):
// FAR -> 0.0001% (High Security ✔)
// FRR -> 8.5% (Frequent False Rejections for real users ❌)`
  },
  {
    id: 5,
    question: "What happens to FAR and FRR when an administrator decreases the decision threshold theta towards 0.0 (lenient matching)?",
    shortAnswer: "FRR drops towards 0% (legitimate users are almost never rejected, enabling fast passage), but FAR increases (imposters or similar-looking individuals have a higher chance of being falsely accepted).",
    explanation: "Lowering the threshold prioritizes high throughput and convenience over strict access security.",
    hint: "Lower threshold lowers FRR (high convenience) but raises FAR (higher imposter risk).",
    level: "Basic",
    codeExample: `// Decreasing Threshold (theta -> 0.0):
// FRR -> 0.01% (Seamless entry ✔)
// FAR -> 3.5% (High risk of imposter entry ❌)`
  },
  {
    id: 6,
    question: "Why does a high-security defense facility in Ichapur configure its biometric threshold to the far right of the EER point?",
    shortAnswer: "Because in a defense facility, the cost of a Type II error (admitting an enemy imposter) is catastrophic, while the cost of a Type I error (a general having to rescan their finger once) is merely a momentary inconvenience. Thus, FAR is minimized to near zero.",
    explanation: "High-security perimeters always prioritize ultra-low FAR over user convenience.",
    hint: "Defense facilities prioritize zero imposter tolerance over employee convenience.",
    level: "Moderate",
    codeExample: `// Defense Policy:
// Set Threshold = 0.88 ➔ FAR = 0.0001% (Zero Imposters), FRR = 6.2% (Acceptable retry friction)`
  },
  {
    id: 7,
    question: "Why does a metro railway smart turnstile gate in Kolkata configure its biometric threshold to the left of the EER point?",
    shortAnswer: "Because in public transit, high throughput is paramount. If 5% of commuters were falsely rejected, massive crowd stampedes and platform bottlenecks would occur. The system minimizes FRR to guarantee instant gate opening.",
    explanation: "Turnstiles accept a slightly higher FAR (since secondary security guards and CCTV cameras monitor passengers) to prevent crowd congestion.",
    hint: "Public transit prioritizes rapid passenger flow and zero false rejection queues.",
    level: "Moderate",
    codeExample: `// Metro Turnstile Policy:
// Set Threshold = 0.28 ➔ FRR = 0.001% (Instant Gate Opening), FAR = 1.8%`
  },
  {
    id: 8,
    question: "What is a Detection Error Tradeoff (DET) curve and how does it differ from a standard ROC curve?",
    shortAnswer: "A DET curve plots False Rejection Rate (FRR) against False Acceptance Rate (FAR) using non-linear standard normal deviate (probit) logarithmic scales, which transforms Gaussian error curves into straight diagonal lines for easier comparison of ultra-low error rates.",
    explanation: "Standard ROC curves compress the high-performance region near the origin; DET curves expand low-error regions to clearly distinguish between state-of-the-art algorithms.",
    hint: "Plots FRR vs FAR on logarithmic/probit scales, turning Gaussian curves into straight lines.",
    level: "Expert",
    codeExample: `// DET Curve Scaling:
// X-axis: Probit(FAR)
// Y-axis: Probit(FRR)
// Curve closest to lower-left origin represents the superior algorithm.`
  },
  {
    id: 9,
    question: "What is the Receiver Operating Characteristic (ROC) curve in biometrics and what does the Area Under the Curve (AUC) represent?",
    shortAnswer: "An ROC curve plots True Positive Rate (TPR = 1 - FRR) on the Y-axis against False Acceptance Rate (FAR) on the X-axis. The Area Under the Curve (AUC) measures overall diagnostic discrimination: an AUC of 1.0 represents a perfect system, while 0.5 represents random guessing.",
    explanation: "An optimal biometric ROC curve rises vertically towards TPR = 100% at extremely low FAR values before plateauing.",
    hint: "Plots TPR (1-FRR) against FAR; AUC = 1.0 indicates perfect accuracy.",
    level: "Moderate",
    codeExample: `// ROC Coordinates:
// Point (FAR, TPR) = (0.001, 0.995) ➔ 99.5% genuine users accepted at 0.1% imposter rate.`
  },
  {
    id: 10,
    question: "What is Failure to Enroll Rate (FTE) and what demographic or physical factors influence it?",
    shortAnswer: "FTE is the proportion of the population whose biological traits cannot be successfully registered during initial enrollment. Influencing factors include worn friction ridges (elderly manual laborers), severe cataracts, missing limbs, or genetic absence of fingerprints (adermatoglyphia).",
    explanation: "An FTE of 2% in a national ID program (like Aadhaar with 1.4 billion people) would leave 28 million citizens unable to enroll, requiring multimodal fallback.",
    hint: "Percentage of people who cannot successfully register their biometrics due to physical limitations.",
    level: "Moderate",
    codeExample: `// FTE Formula:
// FTE = (Failed_Enrollment_Attempts / Total_Enrollment_Population) * 100%`
  },
  {
    id: 11,
    question: "What is Failure to Acquire Rate (FTA) and how does it differ from Failure to Enroll (FTE)?",
    shortAnswer: "FTE occurs once during initial registration if a user cannot be enrolled. FTA occurs during routine authentication when an enrolled user presents a biometric sample, but the sensor fails to capture an image of sufficient quality (e.g., due to sensor smudge, excessive glare, or dry skin).",
    explanation: "FTA causes immediate operational rejection before any algorithmic matching can occur.",
    hint: "FTE is during initial registration; FTA is when a sensor fails to capture a clean image during login.",
    level: "Moderate",
    codeExample: `// FTA Scenario:
// User places dry finger on sensor -> Image contrast too low (< 30 DPI) -> Sensor outputs "IMAGE_ACQUISITION_FAILED".`
  },
  {
    id: 12,
    question: "What is the difference between Genuine Distribution and Imposter Distribution in biometric similarity score modeling?",
    shortAnswer: "Genuine Distribution (Intra-class) is the probability distribution of similarity scores obtained when comparing multiple scans from the same individual. Imposter Distribution (Inter-class) is the distribution of scores obtained when comparing scans from different individuals.",
    explanation: "The degree of overlap between these two statistical distributions determines the Equal Error Rate (EER) of the biometric system.",
    hint: "Genuine = same person scores; Imposter = different person scores. Overlap creates errors.",
    level: "Moderate",
    codeExample: `// Distribution Overlap:
// Genuine Scores : Mean = 0.85, StdDev = 0.08 (Bell curve around 0.85)
// Imposter Scores: Mean = 0.20, StdDev = 0.06 (Bell curve around 0.20)
// Overlap Region : Generates FAR and FRR errors!`
  },
  {
    id: 13,
    question: "What is the Zero-FAR Threshold and why is it difficult to achieve in real-world large-scale deployments?",
    shortAnswer: "The Zero-FAR threshold is the minimum decision threshold where the False Acceptance Rate is mathematically zero (0.0%). It is difficult to maintain in large populations because statistical imposter tail distributions inevitably overlap, driving FRR unacceptably high (often > 25%).",
    explanation: "Setting a Zero-FAR threshold causes massive numbers of legitimate users to be falsely locked out due to minor physical variations.",
    hint: "The threshold that guarantees zero imposters, but causes high false rejections for real users.",
    level: "Expert",
    codeExample: `// Zero-FAR Trade-off:
// Threshold set to 0.98 ➔ FAR = 0.0% ✔, but FRR jumps to 32.4% (1 in 3 real users falsely rejected!) ❌`
  },
  {
    id: 14,
    question: "What is the Zero-FRR Threshold?",
    shortAnswer: "The Zero-FRR threshold is the decision threshold where the False Rejection Rate is 0.0% (no legitimate user is ever rejected). However, this causes FAR to rise significantly, admitting a substantial number of unauthorized imposters.",
    explanation: "Zero-FRR is only acceptable in low-risk public information kiosks where security is irrelevant.",
    hint: "Threshold where no legitimate user is rejected, but imposter acceptance rate becomes dangerously high.",
    level: "Basic",
    codeExample: `// Zero-FRR Trade-off:
// Threshold set to 0.10 ➔ FRR = 0.0% ✔, but FAR jumps to 18.5% (Huge security risk) ❌`
  },
  {
    id: 15,
    question: "How does Multi-Modal Biometric Fusion (e.g., Fingerprint + Face + Iris) dramatically improve EER compared to single-modality systems?",
    shortAnswer: "Multi-modal fusion combines independent similarity scores from multiple distinct biological modalities (Score-Level or Feature-Level Fusion). Because false acceptances across independent modalities are uncorrelated, the overall system FAR drops exponentially: FAR_combined approx FAR_finger * FAR_face.",
    explanation: "Even if an imposter resembles the victim's face, the probability that their fingerprint and iris also match is astronomically small.",
    hint: "Combines independent scores, multiplying imposter probabilities to achieve near-zero EER.",
    level: "Expert",
    codeExample: `// Score-Level Fusion:
const compositeScore = (0.4 * scoreFingerprint) + (0.35 * scoreIris) + (0.25 * scoreFace);
if (compositeScore >= COMPOSITE_THRESHOLD) { grantAccess(); }`
  },
  {
    id: 16,
    question: "What is the D-Prime (d') Decidability Index in biometric performance evaluation?",
    shortAnswer: "d' measures the statistical separation between the means of the genuine and imposter score distributions divided by their pooled standard deviation: d' = |mu_genuine - mu_imposter| / sqrt(0.5 * (sigma_genuine^2 + sigma_imposter^2)).",
    explanation: "A higher d' value indicates greater statistical separation between genuine users and imposters, corresponding directly to lower EER.",
    hint: "Measures distance between genuine and imposter score distribution peaks; higher is better.",
    level: "Expert",
    codeExample: `// Decidability Index:
// Iris Recognition : d' > 7.0 (Extreme separation)
// Fingerprint      : d' ≈ 3.5
// 2D Face          : d' ≈ 2.2`
  },
  {
    id: 17,
    question: "What is the difference between False Match Rate (FMR) and False Acceptance Rate (FAR) under ISO/IEC 2382-37 standards?",
    shortAnswer: "FMR refers strictly to algorithmic 1:1 matching errors (two different biometric templates incorrectly produce a similarity score above threshold). FAR includes overall end-to-end system errors, including presentation attack spoofs and transmission failures.",
    explanation: "In academic literature they are often used interchangeably, but ISO standards distinguish algorithmic matching (FMR/FNMR) from total system operational rates (FAR/FRR).",
    hint: "FMR is strictly algorithmic; FAR encompasses end-to-end system and spoof errors.",
    level: "Moderate",
    codeExample: `// ISO Terminology:
// FMR  : Pure Algorithmic Match Error
// FAR  : Total System False Acceptance (Includes Spoofs + Algorithmic Errors)`
  },
  {
    id: 18,
    question: "What is the difference between False Non-Match Rate (FNMR) and False Rejection Rate (FRR)?",
    shortAnswer: "FNMR is the algorithmic failure to match two templates from the same person. FRR encompasses all reasons a legitimate user is rejected by the overall system, including FTA (image quality acquisition failure) and user timeout.",
    explanation: "FRR = FTA + (1 - FTA) * FNMR.",
    hint: "FNMR is algorithmic mismatch; FRR includes sensor acquisition failures (FTA).",
    level: "Moderate",
    codeExample: `// Total FRR Formula:
// FRR = FTA + ((1 - FTA) * FNMR)`
  },
  {
    id: 19,
    question: "How does population size N affect the cumulative False Acceptance Rate in a 1:N Identification system?",
    shortAnswer: "In a 1:N system with N enrolled users, the cumulative system false match rate FAR_N increases exponentially with population size: FAR_N = 1 - (1 - FAR_1)^N approx N * FAR_1.",
    explanation: "If a 1:1 algorithm has FAR = 0.01% (1 in 10,000), searching across a database of N = 100,000 people yields FAR_N = 1 - (1 - 0.0001)^100000 approx 99.99% probability of at least one false match!",
    hint: "Cumulative false match rate scales with database size N: FAR_N ≈ N * FAR_1.",
    level: "Expert",
    codeExample: `// 1:N Scaling Problem:
// 1:1 FAR = 0.0001 (0.01%)
// N = 100,000 enrolled users
// Cumulative FAR_N = 1 - (1 - 0.0001)^100000 = 99.995% chance of false match! 🚨`
  },
  {
    id: 20,
    question: "What is the Doddington's Zoo classification of biometric users?",
    shortAnswer: "Doddington categorized users into 4 archetypes based on their statistical error behavior: Sheep (Normal users, low FAR/FRR); Goats (Hard to match, high FRR); Lambs (Easy to imitate, high FAR); Wolves (Skilled imposters whose biometrics easily match others).",
    explanation: "Understanding Doddington's Zoo helps engineers design robust adaptive thresholding algorithms.",
    hint: "Sheep (normal), Goats (high FRR), Lambs (high FAR), Wolves (skilled imposters).",
    level: "Moderate",
    codeExample: `// Doddington's Zoo:
// Sheep  : Low FRR, Low FAR (90% of population)
// Goats  : High FRR (Poor quality traits)
// Lambs  : High FAR (Easily spoofed/impersonated)
// Wolves : Exceptionally successful at impersonating others`
  },
  {
    id: 21,
    question: "How does environmental temperature and humidity in West Bengal affect fingerprint sensor FRR?",
    shortAnswer: "High humidity during monsoon causes sweaty skin, creating saturated 'ink-blot' optical ridges. Dry winter air causes faint, low-contrast ridges. Both conditions degrade image quality, causing spikes in Failure to Acquire (FTA) and False Rejection Rate (FRR).",
    explanation: "Ultrasonic and capacitive sensors with adaptive gain control are deployed to normalize moisture and temperature extremes.",
    hint: "High humidity causes sweaty ridge saturation; winter dryness causes faint ridges, increasing FRR.",
    level: "Basic",
    codeExample: `// Environmental Impact:
// Monsoon (95% Humidity) ➔ Sweaty finger blur ➔ FRR spikes from 0.1% to 4.5%
// Winter (Low Humidity)  ➔ Dry faint ridges    ➔ FTA spikes from 0.01% to 3.2%`
  },
  {
    id: 22,
    question: "What is Adaptive Thresholding in advanced biometric access control?",
    shortAnswer: "Adaptive Thresholding dynamically adjusts the matching threshold theta based on real-time contextual risk signals (e.g., lowering threshold during morning rush hour on low-value gates, raising threshold during off-hours or for financial transactions exceeding ₹5,00,000).",
    explanation: "This delivers optimal throughput during high-traffic windows while enforcing zero-tolerance security for high-value operations.",
    hint: "Dynamically shifts threshold based on time, traffic volume, and transaction value.",
    level: "Moderate",
    codeExample: `// Adaptive Threshold Policy:
let threshold = 0.50; // Standard EER
if (transactionValue > 500000) { threshold = 0.85; } // High Security
if (isMorningRushHour && gateType === "turnstile") { threshold = 0.35; } // High Flow`
  },
  {
    id: 23,
    question: "What is the Crossover Error Rate (CER) and is it identical to EER?",
    shortAnswer: "Yes. Crossover Error Rate (CER) is an alternative term for Equal Error Rate (EER), describing the crossover point where the decreasing FAR curve intersects the increasing FRR curve on a performance graph.",
    explanation: "Both terms refer to the exact same mathematical operating point (FAR = FRR).",
    hint: "CER is synonymous with Equal Error Rate (EER).",
    level: "Basic",
    codeExample: `// Terminology:
// CER == EER == Point where FAR(theta) == FRR(theta)`
  },
  {
    id: 24,
    question: "Why is a biometric system with EER = 0.01% vastly superior to one with EER = 1.0% in an enterprise of 10,000 employees?",
    shortAnswer: "With EER = 1.0%, an organization processing 20,000 daily door scans experiences 200 false rejections per day (causing massive helpdesk calls and employee frustration). With EER = 0.01%, false rejections drop to only 2 per day.",
    explanation: "In enterprise scale, a 100x reduction in EER translates directly into smooth operations and minimal IT support overhead.",
    hint: "1.0% EER produces 200 false rejections daily for 20,000 scans; 0.01% produces only 2.",
    level: "Moderate",
    codeExample: `// Enterprise Operational Impact (20,000 scans/day):
// EER = 1.0%  ➔ 200 daily angry employees blocked at gates! ❌
// EER = 0.01% ➔ 2 daily retry scans across entire workforce ✔`
  },
  {
    id: 25,
    question: "What is NIST MINEX (Minutiae Interoperability Exchange) and how does it evaluate fingerprint algorithm accuracy?",
    shortAnswer: "NIST MINEX is a standardized competitive benchmark that evaluates the compliance and accuracy (FMR and FNMR) of fingerprint template generators and matchers on standardized ISO/IEC 19794-2 minutiae formats across millions of test comparisons.",
    explanation: "MINEX certification guarantees that templates created by vendor A's sensor can be accurately matched by vendor B's algorithm.",
    hint: "Standardized NIST benchmark testing fingerprint minutiae interoperability and error rates.",
    level: "Expert",
    codeExample: `// NIST MINEX Certification:
// Evaluates cross-matcher accuracy: Matcher(Vendor_A_Template, Vendor_B_Probe) <= Mandated EER`
  },
  {
    id: 26,
    question: "What is the Impact of Biometric Aging (Template Decay) on FRR over a 5-year timeline?",
    shortAnswer: "As users age, subtle changes in facial tissue, wrinkles, and skin elasticity cause genuine similarity scores to slowly drift downwards towards the imposter distribution, causing FRR to increase gradually over time.",
    explanation: "Modern biometric systems combat template decay via Adaptive Template Updating (slowly updating the enrolled template with high-confidence live scans).",
    hint: "Biological aging degrades genuine match scores, increasing FRR unless adaptive updates are used.",
    level: "Moderate",
    codeExample: `// Template Decay:
// Year 1 Score : 0.92 (Pass)
// Year 3 Score : 0.84 (Pass)
// Year 5 Score : 0.74 (Below 0.80 threshold -> Falsely Rejected! ❌)`
  },
  {
    id: 27,
    question: "How does the Presentation Attack Detection Error Rate (APCER and BPCER) relate to FAR and FRR under ISO/IEC 30107-3?",
    shortAnswer: "APCER (Attack Presentation Classification Error Rate) is the proportion of spoof artifacts incorrectly classified as genuine (analogous to FAR for spoofs). BPCER (Bona Fide Presentation Classification Error Rate) is the proportion of real humans incorrectly classified as spoofs (analogous to FRR).",
    explanation: "A robust anti-spoof system requires both low APCER (blocks fake masks) and low BPCER (doesn't falsely block real humans).",
    hint: "APCER = Spoof accepted as real (FAR); BPCER = Real human rejected as spoof (FRR).",
    level: "Expert",
    codeExample: `// ISO/IEC 30107-3 Metrics:
// APCER : Spoof acceptance rate (Target < 1.0%)
// BPCER : Genuine user falsely flagged as spoof (Target < 0.5%)`
  },
  {
    id: 28,
    question: "What is the mathematical definition of Specificity and Sensitivity in biometric verification?",
    shortAnswer: "Sensitivity (True Positive Rate) = 1 - FRR (percentage of real users correctly admitted). Specificity (True Negative Rate) = 1 - FAR (percentage of imposters correctly blocked).",
    explanation: "High-security systems demand near 100% Specificity, while high-convenience systems prioritize high Sensitivity.",
    hint: "Sensitivity = 1 - FRR (admits real users); Specificity = 1 - FAR (blocks imposters).",
    level: "Moderate",
    codeExample: `// Sensitivity & Specificity:
// Sensitivity = (True_Positives / Total_Genuine) = 1 - FRR
// Specificity = (True_Negatives / Total_Imposters) = 1 - FAR`
  },
  {
    id: 29,
    question: "In a forensic analysis of a financial portal in Kolkata, the CISO noticed that when the decision threshold theta was calibrated to EER (theta = 0.50), the system blocked ₹15,00,000 in legitimate high-value transactions due to false rejections. What dual-tier threshold policy was instituted?",
    shortAnswer: "The institution deployed Step-Up Dynamic Thresholding: for routine transactions below ₹50,000, threshold is set to theta = 0.40 (low FRR, seamless UX). For transactions exceeding ₹5,00,000, threshold is raised to theta = 0.85 paired with mandatory FIDO2 hardware PIN fallback, ensuring zero imposter entries without permanently blocking real users.",
    explanation: "Pairing a high-security threshold with multi-factor fallback ensures that legitimate users experiencing false rejections can verify via a secondary factor.",
    hint: "Low threshold for routine low-value actions; high threshold paired with FIDO2 fallback for large transactions.",
    level: "Expert",
    codeExample: `// Dual-Tier Threshold Policy:
if (amount < 50000) {
    applyThreshold(0.40); // Low FRR for daily transactions
} else {
    applyThreshold(0.85); // High Security for high-value fund transfers + FIDO2 fallback
}`
  },
  {
    id: 30,
    question: "Write out the comprehensive trade-off table comparing FAR, FRR, EER, and Target Applications across Fingerprint, 2D Facial, 3D Facial, and Iris biometrics.",
    shortAnswer: "Iris: EER ~10^-6, FAR ~0.0001%, FRR ~0.5% (High Security / Data Centers). 3D Facial: EER ~0.05%, FAR ~0.001%, FRR ~1.0% (Executive & Mobile Unlock). Capacitive Fingerprint: EER ~0.1%, FAR ~0.01%, FRR ~1.5% (Laptops & Banking). 2D Facial: EER ~1.5%, FAR ~1.0%, FRR ~3.0% (Low-cost Attendance).",
    explanation: "Understanding modality-specific error metrics allows architects to select the optimal biometric sensor for specific threat models and user volumes.",
    hint: "Iris offers highest accuracy (EER 10^-6), followed by 3D Face (0.05%), Fingerprint (0.1%), and 2D Face (1.5%).",
    level: "Expert",
    codeExample: `// Modality Accuracy Hierarchy:
// 1. Iris Recognition : EER ≈ 0.0001% (Fortress Tier)
// 2. 3D Face (IR)     : EER ≈ 0.05%   (High Assurance)
// 3. Fingerprint      : EER ≈ 0.1%    (Standard Commercial)
// 4. 2D Optical Face  : EER ≈ 1.5%    (Basic Attendance)`
  }
];

export default questions;
