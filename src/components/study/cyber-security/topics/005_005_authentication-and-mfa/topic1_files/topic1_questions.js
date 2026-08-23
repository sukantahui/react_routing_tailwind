const questions = [
  {
    id: 1,
    question: "What are the three classical authentication factor categories defined in NIST SP 800-63B, and what is an example of each?",
    shortAnswer: "1. Something You KNOW (Knowledge Factor - e.g., Passwords, PINs, passphrases); 2. Something You HAVE (Possession Factor - e.g., Hardware FIDO2 YubiKey, smartcard, TOTP authenticator app); 3. Something You ARE (Inherence Factor - e.g., Fingerprint, Facial Recognition, Iris scan).",
    explanation: "These three categories are mathematically independent; compromising a factor in one category (e.g., stealing a password via phishing) does not compromise credentials in another category (e.g., a physical USB hardware token).",
    hint: "Knowledge (know), Possession (have), Inherence (are).",
    level: "Basic",
    codeExample: `// The 3 Classical Factors:
// 1. Knowledge  : "Passphrase#2026" / PIN: 4892
// 2. Possession : YubiKey 5 NFC / RSA SecurID Token
// 3. Inherence  : Capacitive Fingerprint Scan / 3D Infrared Facial Mesh`
  },
  {
    id: 2,
    question: "Why is requiring a user to enter both a Password and an ATM PIN considered 'Multi-Step 1FA' rather than True Two-Factor Authentication (2FA)?",
    shortAnswer: "Because both a Password and a PIN belong to the exact same factor category: 'Something You Know' (Knowledge). If an attacker infects the user's laptop with a keylogger or executes a phishing attack, both credentials are compromised simultaneously.",
    explanation: "True Multi-Factor Authentication mathematically requires credentials originating from at least two distinct, independent factor domains (e.g., Knowledge + Possession).",
    hint: "Both are Knowledge factors; compromising one mechanism compromises both.",
    level: "Basic",
    codeExample: `// Flawed Multi-Step 1FA vs True 2FA:
// Flawed 1FA : Password (Knowledge) + PIN (Knowledge) ➔ SAME CATEGORY (Single Factor) ❌
// True 2FA   : Password (Knowledge) + YubiKey (Possession) ➔ TWO DISTINCT FACTORS ✔`
  },
  {
    id: 3,
    question: "What is the critical security weakness inherent to Biometric Authentication (Inherence) compared to Passwords and Hardware Tokens?",
    shortAnswer: "Biometric traits are permanently non-revocable and public. If a database containing your facial geometry or raw fingerprint template is breached by adversaries, you cannot cancel and re-issue a new face or fingerprint; that biometric identity is permanently compromised for life.",
    explanation: "This is why modern biometric systems use revocable template hashing, cancellable biometrics, and store raw templates inside hardware Secure Enclaves rather than central cloud databases.",
    hint: "Biometrics cannot be revoked or changed if compromised.",
    level: "Moderate",
    codeExample: `// Non-Revocability Dilemma:
// Password Breached  ➔ Admin clicks "Reset Password" (Resolved in 10 seconds ✔)
// Fingerprint Leaked ➔ User CANNOT change their biological fingerprint (Compromised forever ❌)`
  },
  {
    id: 4,
    question: "What are the 4th and 5th modern extended authentication factors used in zero-trust architectures?",
    shortAnswer: "4. 'Somewhere You ARE' (Location Factor - GPS coordinates, corporate IP subnets, BLE beacon proximity); 5. 'Something You DO' (Behavioral / Velocity Factor - Keystroke dynamics, touchscreen swipe velocity, and Impossible Traveler time-distance checks).",
    explanation: "These contextual signals allow modern IAM systems to evaluate invisible background risk without increasing user login friction.",
    hint: "Location (where you are) and Behavior/Velocity (what you do / how you type).",
    level: "Moderate",
    codeExample: `// Extended Modern Factors:
// Location  : Geofence: Must be inside Barrackpore Municipal Office Wi-Fi (BSSID check)
// Behavioral: Keystroke Flight Time (ms between key presses matches Susmita's profile)`
  },
  {
    id: 5,
    question: "How does the 'Impossible Traveler' fraud detection algorithm detect compromised user accounts?",
    shortAnswer: "It calculates the Great-Circle distance (Haversine formula) and time elapsed between two consecutive logins for the same account. If the required travel velocity exceeds commercial aircraft limits (e.g., $v > 900\\text{ km/h}$, such as logging in from Barrackpore at 14:00 and London at 14:20), the system flags the second login as impossible and locks the account.",
    explanation: "Impossible traveler detection catches credential-stuffing botnets using stolen passwords across geographically distributed proxies.",
    hint: "Detects logins from two distant cities within an impossibly short timeframe.",
    level: "Moderate",
    codeExample: `// Impossible Traveler Calculation:
// Login 1: Barrackpore (22.76°N, 88.36°E) at 14:00 UTC
// Login 2: London (51.50°N, -0.12°W) at 14:20 UTC (7,960 km in 20 minutes)
// Velocity: 23,880 km/h (> 900 km/h limit) ➔ TRIGGER FRAUD LOCKOUT! 🚨`
  },
  {
    id: 6,
    question: "What are the three Authenticator Assurance Levels (AAL) defined by NIST SP 800-63B?",
    shortAnswer: "1. AAL1: Single-Factor Authentication (Single password or shared secret); 2. AAL2: Multi-Factor Authentication using secure software/hardware tokens (e.g., Password + TOTP app or SMS OTP); 3. AAL3: Multi-Factor Authentication using hardware cryptographic tokens with proof of possession and phishing resistance (e.g., FIDO2 / WebAuthn hardware key).",
    explanation: "Government and defense networks in Ichapur mandate AAL3 for all root and cryptographic administrators.",
    hint: "AAL1 = Single-factor; AAL2 = Standard MFA (TOTP); AAL3 = Hardware cryptographic MFA (FIDO2).",
    level: "Expert",
    codeExample: `// NIST SP 800-63B AAL Spectrum:
// AAL1 : Password only (Low Assurance)
// AAL2 : Password + Google Authenticator TOTP (Medium Assurance)
// AAL3 : Password + FIDO2 YubiKey Hardware Token with Pin/Biometric (High Assurance)`
  },
  {
    id: 7,
    question: "What is 'Behavioral Biometrics' and what physical attributes does it continuously monitor?",
    shortAnswer: "Behavioral biometrics analyzes subconscious human behavioral patterns during device interaction, including keystroke dynamics (dwell time and flight time between keys), mouse cursor acceleration and jitter, touchscreen swipe pressure and curvature, and smartphone walking gait.",
    explanation: "Unlike static biometrics (which check identity once at login), behavioral biometrics provides continuous authentication, instantly locking the screen if an unauthorized person grabs an unlocked laptop.",
    hint: "Monitors how you type, swipe, and move the mouse continuously in the background.",
    level: "Expert",
    codeExample: `// Keystroke Dynamics Attributes:
// • Dwell Time  : Duration a key remains physically depressed (e.g., 85 ms)
// • Flight Time : Interval between releasing Key A and pressing Key B (e.g., 120 ms)`
  },
  {
    id: 8,
    question: "Why is SMS-based OTP considered the weakest and most insecure implementation of the Possession factor?",
    shortAnswer: "SMS messages travel in unencrypted cleartext across cellular SS7 signaling networks (vulnerable to SS7 interception and rogue IMSI-catchers), and mobile phone numbers can be hijacked remotely via SIM Swapping attacks (social engineering mobile carrier store clerks).",
    explanation: "NIST SP 800-63B officially designates SMS OTP as 'RESTRICTED' and strongly discourages its use for high-value financial and administrative systems.",
    hint: "Vulnerable to SIM swapping carrier fraud and SS7 cellular network interception.",
    level: "Basic",
    codeExample: `// SMS OTP Attack Vectors:
// 1. SIM Swapping : Attacker convinces telecom clerk to port Susmita's number to attacker's SIM.
// 2. SS7 Intercept: Attacker exploits cellular signaling flaws to reroute SMS messages globally.`
  },
  {
    id: 9,
    question: "What is 'Adaptive / Risk-Based Authentication' and how does it balance security with user convenience?",
    shortAnswer: "It dynamically adjusts authentication requirements based on a real-time risk score computed from contextual telemetry (IP reputation, device compliance, location, time, user behavior). Low-risk logins proceed with zero friction (Single Sign-On); medium-risk logins trigger standard MFA (TOTP); high-risk anomalies demand hardware biometric step-up or are blocked.",
    explanation: "This eliminates 'MFA Fatigue' by only challenging users when genuine risk or anomalous behavior is detected.",
    hint: "Calculates a real-time risk score to trigger step-up MFA only when anomalies are detected.",
    level: "Moderate",
    codeExample: `// Adaptive Risk Matrix:
// Risk Score 0-30   ➔ SSO Pass (Known office IP, managed corporate laptop)
// Risk Score 31-70  ➔ Step-Up 2FA (New browser or residential broadband IP)
// Risk Score 71-100 ➔ Mandatory Hardware FIDO2 + Biometric / Deny (Tor exit node, foreign IP)`
  },
  {
    id: 10,
    question: "What is a 'Knowledge-Based Authentication' (KBA) question (e.g., 'What was your first pet's name?') and why is it critically flawed?",
    shortAnswer: "Static KBA answers are easily discoverable through open-source intelligence (OSINT), social media scraping (Facebook/LinkedIn posts), public voter records, or social engineering. Furthermore, the total entropy of typical KBA questions is extremely low (e.g., only a few dozen common pet names or car models exist).",
    explanation: "NIST has deprecated static KBA questions; they should never be used as an authentication factor or password recovery mechanism.",
    hint: "Easily found on social media and has very low mathematical randomness (entropy).",
    level: "Basic",
    codeExample: `// OSINT Vulnerability:
// Security Question: "What high school did you attend?"
// Attacker searches Susmita's public LinkedIn profile ➔ Discovers "Barrackpore Govt High School" ➔ Account Hacked! ❌`
  },
  {
    id: 11,
    question: "What is the difference between 'Physical Biometrics' and 'Behavioral Biometrics'?",
    shortAnswer: "Physical biometrics measures static biological and anatomical characteristics (Fingerprint ridge patterns, 3D facial facial mesh, Iris vascular patterns); Behavioral biometrics measures dynamic learned physical habits and actions (Keystroke cadence, mouse velocity, touchscreen gestures, voice modulation).",
    explanation: "Physical biometrics is typically point-in-time at login; behavioral biometrics is continuous throughout the user session.",
    hint: "Physical = static body traits; Behavioral = how you interact with the device.",
    level: "Basic",
    codeExample: `// Classification:
// Physical   : Capacitive Fingerprint, Iris Scanner, Retina Scan, Hand Geometry
// Behavioral : Typing rhythm, Touchscreen pressure, Walking gait, Voice cadence`
  },
  {
    id: 12,
    question: "What is 'MFA Fatigue Attack' (MFA Push Bombing / MFA Spamming) and how do modern authenticators mitigate it?",
    shortAnswer: "An attacker who has stolen a victim's password floods their smartphone with dozens of mobile push notification prompts in the middle of the night, hoping the exhausted victim will tap 'Approve' to silence their phone. Mitigated by 'Number Matching' (requiring the user to type a 2-digit number displayed on the login screen into their authenticator app).",
    explanation: "Number matching guarantees that only a user physically looking at the login screen can approve the push notification.",
    hint: "Spamming push notifications until the user approves; fixed by Number Matching.",
    level: "Moderate",
    codeExample: `// Number Matching Defense:
// Login Screen displays : "Enter number [ 42 ] on your phone"
// Attacker cannot see the number; victim cannot blindly approve push notification without entering 42!`
  },
  {
    id: 13,
    question: "What is a 'Smartcard' (e.g., PIV / CAC card) and why is it considered a highly secure Possession factor?",
    shortAnswer: "A smartcard contains an embedded cryptographic microchip with a tamper-resistant Secure Cryptoprocessor. The user's private key is generated directly inside the chip and can NEVER be extracted or exported; cryptographic signing operations execute inside the card hardware, requiring a local PIN to unlock.",
    explanation: "Even if an administrator's PC in Ichapur is infected with malware, the malware cannot clone the private key from the smartcard.",
    hint: "Contains a tamper-resistant chip where private keys cannot be extracted.",
    level: "Moderate",
    codeExample: `// Smartcard Cryptographic Operation:
// PC ➔ Smartcard : Hash(Session_Challenge) + PIN
// Smartcard Chip : Computes RSA/ECDSA signature internally
// Smartcard ➔ PC : Digital Signature (Private Key never leaves the microchip!)`
  },
  {
    id: 14,
    question: "What is 'Cancellable Biometrics' and how does it address biometric non-revocability?",
    shortAnswer: "Cancellable biometrics applies an intentional, repeatable non-invertible mathematical distortion (e.g., geometric morphing or cryptographic transformation with a secret key) to the raw biometric template before storage. If the stored template is compromised in a breach, the key is revoked, and a new distorted template is generated using a different key without altering the user's biological trait.",
    explanation: "This allows biometric identities to be reset just like passwords.",
    hint: "Applies a mathematical distortion key to the biometric so it can be re-issued if breached.",
    level: "Expert",
    codeExample: `// Cancellable Biometric Formula:
// Stored_Template = NonInvertibleTransform(Raw_Fingerprint, Secret_Seed_Key)
// If Stored_Template leaked ➔ Revoke Seed_Key ➔ Generate new Stored_Template with Seed_Key_2 ✔`
  },
  {
    id: 15,
    question: "What is the 'False Acceptance Rate' (FAR) versus 'False Rejection Rate' (FRR) in biometric evaluation?",
    shortAnswer: "False Acceptance Rate (FAR - Type II Error) is the probability that an unauthorized impostor is incorrectly accepted as legitimate; False Rejection Rate (FRR - Type I Error) is the probability that a legitimate authorized user is incorrectly rejected.",
    explanation: "The point where FAR equals FRR is the Equal Error Rate (EER); lower EER indicates higher overall biometric accuracy.",
    hint: "FAR = impostor allowed in (security risk); FRR = legitimate user locked out (usability pain).",
    level: "Basic",
    codeExample: `// Biometric Error Trade-off:
// High Security (Bank Vault)  : Minimize FAR to 0.0001% (Accepts higher FRR friction)
// High Usability (Phone Unlock): Minimize FRR to 0.1% (Slightly higher FAR allowed)`
  },
  {
    id: 16,
    question: "Why is a physical MAC Address or IP Address NOT a valid standalone authentication factor?",
    shortAnswer: "MAC addresses and IP addresses can be trivially spoofed on local networks using standard software tools (`macchanger`, raw sockets), and IP addresses change dynamically across mobile networks and VPNs. They serve only as contextual attributes in ABAC, not authenticated identity factors.",
    explanation: "Relying on MAC address filtering for Wi-Fi or network switch security provides zero cryptographic assurance.",
    hint: "Easily spoofed and altered with software; useful only as contextual signals.",
    level: "Basic",
    codeExample: `// Trivial MAC Spoofing:
# sudo ip link set dev eth0 address 00:11:22:33:44:55
// (Bypasses naive MAC filtering in 2 seconds!)`
  },
  {
    id: 17,
    question: "What is 'Geofencing' in location-based authentication and how is it enforced for mobile workforces?",
    shortAnswer: "Geofencing defines a virtual geographic boundary (e.g., a 500-meter radius around the Barrackpore Municipal Administrative Complex). Authentication requests are verified against verified GPS coordinates and cell tower triangulation, rejecting login attempts originating outside the approved perimeter.",
    explanation: "Used to restrict access to sensitive field inspection portals strictly to active work zones.",
    hint: "Restricting logins strictly within a predefined geographic coordinate perimeter.",
    level: "Moderate",
    codeExample: `// Geofence Policy Definition:
// Center: 22.7667° N, 88.3667° E (Barrackpore SOC)
// Radius: 500 meters
// Policy: IF Distance(Device_GPS, Center) > 500m ➔ DENY ACCESS ❌`
  },
  {
    id: 18,
    question: "What is an 'Out-of-Band' (OOB) authentication channel and why does it enhance security?",
    shortAnswer: "OOB authentication transmits the secondary verification factor across a completely separate, independent physical network or communication path from the primary login session (e.g., logging in via a PC browser on Ethernet, while receiving an approval push notification over encrypted cellular data on an iPhone).",
    explanation: "Even if the PC's local Ethernet connection is intercepted by a Wi-Fi Man-in-the-Middle attacker, the attacker cannot access the separate cellular data stream.",
    hint: "Sends the second factor across a completely separate communication network (e.g. PC vs cellular).",
    level: "Moderate",
    codeExample: `// Out-of-Band Architecture:
// Primary Channel (PC)      : Web Browser ──(Public Ethernet)──> Banking Server
// Secondary Channel (Phone) : Authenticator App ──(Separate 5G Cellular)──> Push Notification Server`
  },
  {
    id: 19,
    question: "What is 'Voice Biometrics' (Voiceprint Recognition) and what attack vector threatens it today?",
    shortAnswer: "Voice biometrics analyzes vocal tract frequency harmonics, pitch, and phonetic cadence. Today, it is severely threatened by AI-driven Generative Voice Cloning and Deepfake Audio synthesis, where attackers train neural models on a few seconds of a victim's voice (e.g., from YouTube or phone calls) to bypass voice authentication.",
    explanation: "Voice authentication requires liveness detection and challenge-response phrase prompts to detect synthesized audio.",
    hint: "Analyzes voice harmonics; threatened by generative AI voice cloning deepfakes.",
    level: "Moderate",
    codeExample: `// Deepfake Threat:
// Attacker feeds 10s audio of Municipal Executive to AI Voice Model ➔ Synthesizes phrase: "Authorize wire transfer ₹50,00,000" ➔ Bypasses naive voice verification!`
  },
  {
    id: 20,
    question: "What is 'Liveness Detection' in biometric authentication and why is it mandatory for facial recognition?",
    shortAnswer: "Liveness detection verifies that the biometric sample is presented by a living, physically present human rather than a static photograph, video replay on a tablet, or 3D silicone mask. Methods include 3D infrared structured light depth mapping, pupil dilation checks, random blink/smile challenges, and blood flow micro-reflectance.",
    explanation: "Without liveness detection, holding a high-resolution printed photo of the administrator in front of the camera unlocks the system.",
    hint: "Verifies the biometric sample is from a live human, not a photo or video replay.",
    level: "Moderate",
    codeExample: `// Liveness Detection Techniques:
// 1. Passive : 3D Depth Sensing (Structured Infrared Dots) + Micro-texture analysis
// 2. Active  : "Please blink twice and turn your head slowly to the left"`
  },
  {
    id: 21,
    question: "How does Hardware Token Clock Drift affect Time-based One-Time Passwords (TOTP), and how do servers compensate?",
    shortAnswer: "Hardware TOTP keyfobs (like RSA SecurID) have internal quartz clocks that drift by a few seconds each year. Authentication servers maintain a 'Validation Window' (checking the current 30-second time-step plus $\\pm 1$ or $\\pm 2$ adjacent time-steps) and dynamically track and adjust the clock offset in the user's database record upon successful login.",
    explanation: "This ensures legitimate users are not locked out due to minute hardware clock drift over several years.",
    hint: "Internal token clocks drift over time; servers check adjacent 30-second time windows to compensate.",
    level: "Expert",
    codeExample: `// TOTP Server Time Window:
// Server checks: Hash(T - 1) [Past 30s], Hash(T) [Current], Hash(T + 1) [Next 30s]`
  },
  {
    id: 22,
    question: "What is 'Step-Up Authentication' and in what business scenarios is it deployed?",
    shortAnswer: "Step-Up Authentication allows users to browse low-sensitivity areas with basic single-factor credentials, but prompts for a high-assurance secondary factor (e.g., hardware security key or biometric scan) only when the user attempts a privileged or destructive transaction (such as transferring > ₹10,000 or changing account passwords).",
    explanation: "This minimizes user friction for routine read-only tasks while locking down critical transactions.",
    hint: "Demanding a stronger second factor only when accessing high-risk actions like wire transfers.",
    level: "Basic",
    codeExample: `// Step-Up Workflow:
// 1. User logs into municipal portal with Password (1FA) ➔ Views tax balance (Permitted)
// 2. User clicks "Disburse ₹50,00,000" ➔ Prompt: "Touch YubiKey Hardware Token" (Step-Up 2FA Required!)`
  },
  {
    id: 23,
    question: "Why does entering a One-Time Password (OTP) received on a smartphone qualify as the 'Possession' factor rather than 'Knowledge'?",
    shortAnswer: "Because the user does not 'know' or memorize the OTP in advance; the OTP is dynamically generated and delivered to a physically registered device. The credential proves that the user is in physical possession of the specific SIM card, authenticator hardware, or registered smartphone at that exact moment.",
    explanation: "The short 60-second expiration guarantees that possession of the receiving device is required in real time.",
    hint: "You don't memorize the OTP; it proves physical possession of the receiving device at that moment.",
    level: "Basic",
    codeExample: `// Possession Factor Rationale:
// User does not memorize OTP ➔ OTP exists transiently on the physical phone ➔ Proves phone possession.`
  },
  {
    id: 24,
    question: "What is 'Credential Stuffing' and why does Multi-Factor Authentication render it 99.9% ineffective?",
    shortAnswer: "Credential stuffing is an automated cyberattack where adversaries take millions of leaked username/password pairs from third-party breaches and test them across banking and government portals. MFA neutralizes it because even when the attacker possesses the valid stolen password (Knowledge), they cannot provide the physical hardware key or biometric trait (Possession/Inherence).",
    explanation: "Microsoft and Google telemetry confirm that enabling any form of 2FA blocks over 99.9% of automated account takeover attacks.",
    hint: "Automated testing of leaked passwords; blocked because attackers lack the second factor.",
    level: "Basic",
    codeExample: `// Credential Stuffing Attack Neutralization:
// Attacker enters stolen password ➔ Server responds: "Enter FIDO2 Hardware Token" ➔ Attacker blocked! ✔`
  },
  {
    id: 25,
    question: "What is a 'FIDO2 / WebAuthn' hardware key and why is it mathematically immune to phishing?",
    shortAnswer: "FIDO2 authenticators generate asymmetric key pairs bound directly to the exact website domain origin (e.g., `barrackpore.gov.in`). During authentication, the browser signs a challenge containing the verified origin URL. If a user is tricked by a phishing site (`barrackpore-fake.com`), the key refuses to sign the challenge for the fake origin.",
    explanation: "This origin binding makes FIDO2 the only authentication standard completely immune to adversary-in-the-middle phishing proxies (like Evilginx).",
    hint: "Cryptographically binds credentials to the exact domain name, preventing phishing.",
    level: "Expert",
    codeExample: `// Origin Binding in WebAuthn:
// Real Site: https://barrackpore.gov.in ➔ YubiKey signs challenge for "barrackpore.gov.in" ✔
// Fake Site: https://barrackpore-phish.com ➔ YubiKey detects mismatch & refuses to sign! ❌`
  },
  {
    id: 26,
    question: "What is the 'Man-in-the-Endpoint' threat to Multi-Factor Authentication?",
    shortAnswer: "If a user's workstation is infected with an Infostealer or Remote Access Trojan (RAT), the attacker waits until the legitimate user completes the full MFA handshake (Password + YubiKey + Biometric), and then steals the resulting authenticated session cookie from browser memory to hijack the active session.",
    explanation: "This highlights why endpoint security, device posture checking, and hardware-bound tokens (Token Binding / DPoP) are essential complements to MFA.",
    hint: "Malware on the user's PC stealing the session cookie after the user completes MFA.",
    level: "Expert",
    codeExample: `// Man-in-the-Endpoint Attack:
// Susmita completes 3FA ➔ Server issues 'session_token=xyz123' ➔ Infostealer malware copies token from RAM ➔ Attacker hijacks session!`
  },
  {
    id: 27,
    question: "What is the difference between 'Iris Scanning' and 'Retina Scanning' in ocular biometrics?",
    shortAnswer: "Iris scanning photographs the colored ring of the eye using near-infrared light from a distance of up to 1 meter (highly convenient, stable across lifetime); Retina scanning uses a focused beam of light to map the blood vessel patterns at the back of the eyeball, requiring the user to press their eye close to an eyepiece (highly intrusive, but virtually impossible to forge).",
    explanation: "Iris scanning is standard in civil ID programs (like Aadhaar in India), while retina scanning is reserved for ultra-high-security military vaults.",
    hint: "Iris scans the colored outer ring from a distance; Retina scans blood vessels at the back of the eyeball.",
    level: "Moderate",
    codeExample: `// Ocular Biometrics Comparison:
// Iris Scan   : Non-intrusive camera scan (Used in National ID & Airport Gates)
// Retina Scan : Deep optical blood vessel mapping (Used in Nuclear & High-Security Defense Vaults)`
  },
  {
    id: 28,
    question: "What is 'Session Expiration' and 'Re-Authentication Velocity' in high-security banking portals?",
    shortAnswer: "High-security applications enforce strict idle session timeouts (e.g., 5-15 minutes) and absolute session lifetimes (e.g., 8 hours), requiring re-authentication to prevent unauthorized access on abandoned or unattended terminal screens in municipal offices.",
    explanation: "This bounds the window of opportunity for opportunistic shoulder-surfers or physical intruders.",
    hint: "Automatically logging out users after 5-15 minutes of inactivity.",
    level: "Basic",
    codeExample: `// Banking Session Policy:
// Idle Timeout     : 300 seconds (5 minutes)
// Absolute Lifetime: 28800 seconds (8 hours maximum)`
  },
  {
    id: 29,
    question: "How does 'Continuous Authentication' using behavioral telemetry improve upon traditional one-time login authentication?",
    shortAnswer: "Traditional authentication checks identity only at the moment of login (a single point in time). Continuous authentication monitors ongoing behavioral telemetry (typing cadence, active process health, geofence consistency) throughout the entire workday, terminating the session immediately if an unauthorized user takes over the keyboard.",
    explanation: "Continuous authentication enforces the Zero-Trust principle: 'Never Trust, Always Verify'.",
    hint: "Continuously checks user behavior and device health throughout the entire session.",
    level: "Moderate",
    codeExample: `// Continuous Zero-Trust Authentication:
// 09:00 : Login Verified (3FA) ✔
// 11:30 : Typing rhythm suddenly changes ➔ Background Step-Up Prompted ⚠️
// 11:31 : Step-Up Failed ➔ Session Terminated immediately ❌`
  },
  {
    id: 30,
    question: "What are the primary diagnostic checks when a user in Barrackpore reports their hardware YubiKey is not recognized during WebAuthn login?",
    shortAnswer: "1. Verify browser WebAuthn API support and HTTPS connection; 2. Ensure the website domain matches the registered Relying Party ID (RP ID); 3. Check USB / NFC physical connectivity and HID permissions; 4. Verify FIDO2 PIN is not locked due to repeated failed attempts (`ykman fido info`); 5. Check browser developer console for `NotAllowedError` or `SecurityError`.",
    explanation: "Running the YubiKey Manager (`ykman`) command-line tool verifies firmware status and FIDO2 credential storage.",
    hint: "Check HTTPS, domain RP ID matching, USB connection, and FIDO2 PIN status via ykman.",
    level: "Expert",
    codeExample: `// YubiKey CLI Diagnostic Command:
# ykman fido info
# ykman list`
  }
];

export default questions;
