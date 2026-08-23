const questions = [
  {
    id: 1,
    question: "What is the primary architectural difference between HOTP (RFC 4226) and TOTP (RFC 6238)?",
    shortAnswer: "HOTP calculates one-time codes using an incrementing event counter C that advances each time the button is pressed. TOTP calculates codes by replacing the event counter with a dynamic time counter derived from Unix epoch time: C = floor(time / 30).",
    explanation: "Because TOTP is bound to standard UTC epoch time, client and server remain synchronized automatically without needing to transmit an incrementing counter over the wire.",
    hint: "HOTP uses an event counter incremented per press; TOTP uses time divided by 30 seconds.",
    level: "Basic",
    codeExample: `// HOTP Counter : C = 0, 1, 2, 3... (Incremented manually)
// TOTP Counter : T = Math.floor(Date.now() / 1000 / 30) (Changes automatically every 30s)`
  },
  {
    id: 2,
    question: "Write the exact mathematical formula for HOTP generation defined in RFC 4226.",
    shortAnswer: "HOTP(K, C) = Truncate(HMAC-SHA1(K, C)) mod 10^d, where K is the shared secret key, C is the 8-byte big-endian counter, and d is the number of digits (typically 6 or 8).",
    explanation: "Dynamic Truncation extracts a 31-bit unsigned integer from the 20-byte HMAC-SHA1 digest before computing modulo 10^d to produce the human-readable code.",
    hint: "Truncate(HMAC-SHA-1(K, C)) mod 10^d.",
    level: "Basic",
    codeExample: `// Mathematical Formula:
// HOTP(K, C) = Truncate(HMAC-SHA-1(K, C)) % (10^d)`
  },
  {
    id: 3,
    question: "How does Dynamic Truncation (DT) extract a 4-byte integer from the 20-byte HMAC-SHA1 output in HOTP?",
    shortAnswer: "1. Take the last byte of the HMAC digest (byte 19) and mask it with 0x0F to get an offset value between 0 and 15: Offset = digest[19] & 0x0F. 2. Extract 4 bytes starting at that offset: digest[Offset : Offset+4]. 3. Mask the most significant bit (0x7FFFFFFF) to prevent negative signed integers.",
    explanation: "This dynamic offset selection ensures that the extracted 4 bytes are unpredictably distributed across the 20-byte hash output.",
    hint: "Low-order 4 bits of the last byte determine the extraction start offset (0 to 15).",
    level: "Moderate",
    codeExample: `// Dynamic Truncation Implementation:
const offset = hmacDigest[19] & 0x0f;
const binary = (
  ((hmacDigest[offset] & 0x7f) << 24) |
  ((hmacDigest[offset + 1] & 0xff) << 16) |
  ((hmacDigest[offset + 2] & 0xff) << 8) |
  (hmacDigest[offset + 3] & 0xff)
);
const otp = binary % 1000000; // 6 digits`
  },
  {
    id: 4,
    question: "What is the standard time-step interval X defined in RFC 6238 for TOTP, and why was 30 seconds chosen?",
    shortAnswer: "The standard default time-step is X = 30 seconds. This duration provides a balance between giving human users sufficient time to read and type a 6-digit code while minimizing the exposure window for intercepted codes.",
    explanation: "A shorter window (e.g., 10s) causes frequent user input failures; a longer window (e.g., 120s) extends the validity lifetime of intercepted credentials.",
    hint: "Default interval is 30 seconds to balance human typing speed with minimal exposure window.",
    level: "Basic",
    codeExample: `// Time Counter Calculation:
const timeStep = 30; // seconds
const timeCounter = Math.floor(Date.now() / 1000 / timeStep);`
  },
  {
    id: 5,
    question: "Why are TOTP shared secrets encoded in Base32 rather than Base64 or Hex in QR code enrollment URIs?",
    shortAnswer: "Base32 uses only uppercase letters A–Z and digits 2–7 (excluding 0, 1, 8, 9). This eliminates visually ambiguous characters (like 0 vs O, 1 vs I, 8 vs B) that cause transcription errors if a user manually types the secret key into their authenticator app.",
    explanation: "Base32 is also case-insensitive and alphanumeric-only, which makes QR code rendering more compact and error-resistant.",
    hint: "Base32 avoids visually ambiguous characters like 'O' vs '0' and 'I' vs '1'.",
    level: "Moderate",
    codeExample: `// Base32 Character Set (RFC 4648):
// "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567" (32 characters, no 0/O or 1/I confusion)`
  },
  {
    id: 6,
    question: "What is the standard structure of an `otpauth://` URI scanned by mobile authenticator apps?",
    shortAnswer: "`otpauth://totp/[Issuer]:[AccountName]?secret=[Base32Key]&issuer=[Issuer]&algorithm=[SHA1]&digits=[6]&period=[30]`",
    explanation: "This URI standardizes the transfer of the shared cryptographic key, account metadata, time-step period, and hash algorithm from the server to apps like Google Authenticator or Microsoft Authenticator.",
    hint: "otpauth://totp/Issuer:User?secret=KEY&issuer=Issuer&digits=6&period=30.",
    level: "Moderate",
    codeExample: `// Sample Enrollment URI:
// otpauth://totp/BarrackporeTreasury:susmita@bank.in?secret=JBSWY3DPEHPK3PXP&issuer=BarrackporeTreasury&digits=6&period=30`
  },
  {
    id: 7,
    question: "What is Clock Drift in TOTP systems and how does the server resolve it during authentication?",
    shortAnswer: "Clock drift occurs when a mobile phone's internal clock runs faster or slower than the server's clock by a few seconds. The server resolves this by evaluating a tolerance window of +/- 1 time step (checking counters T-1, T, and T+1).",
    explanation: "A tolerance window of +/- 1 step checks a total time window of 90 seconds (30s past, 30s current, 30s future), preventing legitimate users from being locked out due to minor clock inaccuracies.",
    hint: "Server validates codes against current time counter T as well as T-1 and T+1.",
    level: "Moderate",
    codeExample: `// Server Tolerance Check:
const valid = [currentStep - 1, currentStep, currentStep + 1].some(step => {
  return generateHotp(secret, step) === submittedCode;
});`
  },
  {
    id: 8,
    question: "How does a secure TOTP authentication server prevent Replay Attacks within the 30-second validity window?",
    shortAnswer: "When a user submits a valid TOTP code for time step T, the server marks that time counter T as 'consumed' in an in-memory cache (like Redis) with an expiration time equal to the window length. Any subsequent submission with the same counter T is immediately rejected.",
    explanation: "Without replay tracking, an attacker eavesdropping on a network connection could capture a valid TOTP code and submit it 5 seconds later within the same 30-second window to gain unauthorized access.",
    hint: "Recording the consumed time step in a fast cache to ensure each counter step is strictly single-use.",
    level: "Expert",
    codeExample: `// Redis Atomic Replay Guard:
const key = \`totp:\${userId}:\${matchedCounter}\`;
const isFirstUse = await redis.set(key, "1", "NX", "EX", 60); // 60s TTL
if (!isFirstUse) {
    throw new Error("REPLAY_ATTACK_DETECTED: Code already consumed for this time step!");
}`
  },
  {
    id: 9,
    question: "What is Counter Desynchronization in HOTP hardware tokens and how does the Resynchronization Look-Ahead Window resolve it?",
    shortAnswer: "If a user presses the physical button on an HOTP hardware token multiple times without submitting the code to the server, the token's internal counter advances ahead of the server's counter. The server resynchronizes by testing candidate counters across a look-ahead window (e.g., s = 20 steps: C+1 to C+20).",
    explanation: "Once a match is found at counter C+k within the look-ahead window, the server accepts the login and advances its stored counter to C+k.",
    hint: "Server searches ahead by 20-50 steps to catch up with a hardware token whose button was pressed offline.",
    level: "Moderate",
    codeExample: `// HOTP Look-Ahead Resync:
const lookAheadWindow = 20;
for (let i = 1; i <= lookAheadWindow; i++) {
    if (generateHotp(secret, serverCounter + i) === userCode) {
        serverCounter += i; // Resynchronized!
        return true;
    }
}`
  },
  {
    id: 10,
    question: "Why does TOTP operate without requiring any network connectivity or cellular signal on the user's smartphone?",
    shortAnswer: "Because TOTP is calculated strictly using the shared secret key stored locally in the app and the device's internal hardware clock. No packets are transmitted between the phone and server to generate the 6-digit code.",
    explanation: "This allows users to authenticate seamlessly inside airplanes, underground basements, or remote locations with zero cellular reception.",
    hint: "Calculations rely entirely on local hardware time and the pre-shared key stored in the app.",
    level: "Basic",
    codeExample: `// Offline Generation:
// Device has: 1. Base32 Secret Key + 2. Internal RTC Clock -> Generates TOTP offline with zero Wi-Fi/cellular.`
  },
  {
    id: 11,
    question: "What hash algorithms are supported by RFC 6238 TOTP beyond SHA-1, and why is SHA-1 still the dominant industry standard in mobile authenticator apps?",
    shortAnswer: "RFC 6238 supports HMAC-SHA1, HMAC-SHA256, and HMAC-SHA512. SHA-1 remains dominant because the original Google Authenticator implementation only supported SHA-1, creating a legacy compatibility baseline across all third-party apps.",
    explanation: "Because HMAC-SHA1 is used as a pseudorandom function (PRF) with a high-entropy secret rather than for collision resistance, collision attacks against SHA-1 do not weaken HMAC-SHA1 security.",
    hint: "RFC 6238 supports SHA-256 and SHA-512, but SHA-1 is preserved for legacy app compatibility.",
    level: "Moderate",
    codeExample: `// RFC 6238 Algorithms:
// HMAC-SHA1   : 160-bit digest (Default)
// HMAC-SHA256 : 256-bit digest
// HMAC-SHA512 : 512-bit digest`
  },
  {
    id: 12,
    question: "What is the impact on TOTP if an attacker steals the raw Base32 secret key from the server database?",
    shortAnswer: "The attacker can clone the user's authenticator app onto their own device and generate valid, real-time TOTP codes indefinitely without physical access to the victim's phone, completely nullifying the second factor.",
    explanation: "This is why authentication servers must encrypt TOTP secrets at rest in their databases using AES-256-GCM or store them within Hardware Security Modules (HSMs).",
    hint: "Possessing the secret key allows cloning the authenticator and generating valid codes forever.",
    level: "Moderate",
    codeExample: `// Stolen Secret Impact:
// Attacker imports secret "JBSWY3DPEHPK3PXP" into their own phone -> Attacker's app produces identical valid codes!`
  },
  {
    id: 13,
    question: "How do Backup Recovery Codes (Scratch Codes) prevent account lockout if a user destroys or loses their TOTP device?",
    shortAnswer: "Backup codes are a set of 8 to 10 cryptographically random, high-entropy single-use strings issued during enrollment. The server stores slow KDF hashes (Argon2id/Bcrypt) of these codes and immediately deletes/burns each code once it is used for login.",
    explanation: "Storing only hashes of backup codes ensures that a database dump does not expose usable emergency recovery codes to attackers.",
    hint: "Single-use random recovery codes hashed in the database and deleted immediately upon consumption.",
    level: "Basic",
    codeExample: `// Backup Code Verification:
const isMatch = bcrypt.compareSync(submittedCode, storedBackupHash);
if (isMatch) {
    deleteBackupCodeFromDatabase(userId, storedBackupHash); // Burn code permanently
    grantAccess();
}`
  },
  {
    id: 14,
    question: "What is the mathematical length of an 8-digit OTP keyspace compared to a 6-digit OTP keyspace, and what is the probability of a random guess succeeding?",
    shortAnswer: "A 6-digit OTP has 10^6 = 1,000,000 combinations (probability of random guess = 0.0001%). An 8-digit OTP has 10^8 = 100,000,000 combinations (probability = 0.000001%), providing 100x greater resistance against online brute-forcing.",
    explanation: "8-digit OTPs are mandated in high-assurance banking and defense systems where rate-limiting might experience momentary failures.",
    hint: "6 digits = 1 million combinations; 8 digits = 100 million combinations (100x harder).",
    level: "Basic",
    codeExample: `// Keyspace Comparison:
// 6-digit: 000000 to 999999 -> 10^6 combinations
// 8-digit: 00000000 to 99999999 -> 10^8 combinations`
  },
  {
    id: 15,
    question: "How does an Adversary-in-the-Middle (AitM) phishing proxy (e.g., Evilginx) successfully bypass standard TOTP 2FA?",
    shortAnswer: "The proxy prompts the user for their username, password, and TOTP code on a fake domain, immediately relays them to the legitimate website to complete authentication, and intercepts the session cookie returned by the real server.",
    explanation: "Because standard TOTP codes lack origin binding, the user unknowingly provides the valid 6-digit code to the proxy within its 30-second window, allowing the proxy to log in on their behalf.",
    hint: "Relays the valid TOTP code to the real server in real time within the 30-second window and captures the session cookie.",
    level: "Expert",
    codeExample: `// AitM TOTP Interception:
// 1. User enters 6-digit TOTP on 'fake-bank-portal.net'
// 2. Evilginx proxy submits code to 'realbank.com' within 10 seconds
// 3. Real server accepts TOTP -> Issues session cookie -> Proxy steals cookie!`
  },
  {
    id: 16,
    question: "What is the difference between Time-Step Interval (30s) and Tolerance Window (e.g., 90s) in TOTP validation?",
    shortAnswer: "The time-step interval (30s) is the period during which a specific single code is generated on the client. The tolerance window (e.g., 90s across counters T-1, T, T+1) is the broader server-side verification range accepted by the server to accommodate clock drift and transmission lag.",
    explanation: "A code is generated for a 30-second window, but the server accepts codes from adjacent 30-second windows.",
    hint: "Interval is the client generation cycle (30s); tolerance window is the server's acceptance breadth (90s).",
    level: "Moderate",
    codeExample: `// Interval = 30 seconds
// Tolerance Window = [T-1 (30s past), T (30s current), T+1 (30s future)] = 90 seconds total span`
  },
  {
    id: 17,
    question: "What is the security risk of storing TOTP secret keys in plain text inside an application's database?",
    shortAnswer: "An SQL injection or unauthorized database read exposes all users' base32 secret keys. Adversaries can generate valid TOTP codes offline for every account, permanently bypassing 2FA without triggering any alerts.",
    explanation: "Mitigation requires encrypting the `totp_secret` column with an envelope key stored in a KMS (Key Management Service) or HSM.",
    hint: "Allows attackers dumping the database to generate TOTP codes for all accounts indefinitely.",
    level: "Moderate",
    codeExample: `// Vulnerable Table:
// SELECT username, password_hash, totp_secret FROM users; ❌ (Raw Base32 exposed)

// Secure Table:
// SELECT username, password_hash, encrypted_totp_secret, kms_key_id FROM users; ✔`
  },
  {
    id: 18,
    question: "How does Network Time Protocol (NTP) synchronization prevent TOTP failure across enterprise servers?",
    shortAnswer: "NTP synchronizes the system clocks of all authentication server nodes against authoritative stratum-1 atomic clocks over UDP port 123, ensuring server time drift remains within a few milliseconds.",
    explanation: "If an enterprise authentication cluster has nodes whose clocks drift by 40+ seconds, users routed to drifted nodes will experience random, baffling TOTP validation rejections.",
    hint: "Synchronizes server system clocks to atomic time to prevent validation failures.",
    level: "Moderate",
    codeExample: `// Linux NTP Verification:
// $ chronyc tracking
// Reference ID    : 103.220.14.88 (NTP Server Barrackpore)
// System time     : 0.000042 seconds slow of NTP time (Accurate within 42 microseconds ✔)`
  },
  {
    id: 19,
    question: "What happens if a user submits a TOTP code during the last second of a 30-second window (e.g., at second 29.8)?",
    shortAnswer: "By the time the network packet arrives at the server (second 30.5), the server will have transitioned to time counter T+1. Because the server incorporates a +/- 1 step tolerance window (checking T-1), the code matching counter T is still accepted.",
    explanation: "Without the tolerance window, network latency on border-second submissions would cause a high rate of false authentication rejections.",
    hint: "Tolerance window allows the server to accept the previous time step's code when network latency causes slight delays.",
    level: "Basic",
    codeExample: `// Border Condition:
// Generated at 14:00:29.8 (Counter 500)
// Received at 14:00:30.4 (Server at Counter 501)
// Server verifies Counter 500 in [500, 501, 502] -> PERMITTED ✔`
  },
  {
    id: 20,
    question: "What is an Authenticator App Transfer / Cloud Sync feature (e.g., Google Authenticator Cloud Backup) and what security debate does it trigger?",
    shortAnswer: "Cloud sync backs up and synchronizes TOTP secret keys across all devices linked to a user's Google/Apple account. While it eliminates account lockouts from lost phones, it means compromising the user's master Google/Apple account compromises all 2FA keys.",
    explanation: "High-security enterprises prohibit cloud-synced TOTP and enforce non-exportable hardware-bound authenticators (YubiKeys).",
    hint: "Convenient backup vs risk of exposing all 2FA seeds if the master cloud account is compromised.",
    level: "Moderate",
    codeExample: `// Cloud Sync Debate:
// Benefit: User buys new phone -> All 20 TOTP accounts restore instantly.
// Risk: Master Google account phished -> Attacker gains all 20 TOTP seeds simultaneously.`
  },
  {
    id: 21,
    question: "How does the TOTP dynamic truncation bitwise mask `& 0x7FFFFFFF` prevent integer overflow issues on 32-bit systems?",
    shortAnswer: "The most significant bit (MSB) in signed 32-bit integers indicates negative values. Masking with `0x7FFFFFFF` sets the MSB to 0, ensuring the extracted 4 bytes always represent a positive unsigned 31-bit integer before computing modulo.",
    explanation: "Without this mask, modulo operations on negative integers in languages like C/Java yield negative OTP values.",
    hint: "Clears the sign bit to ensure the integer is always positive.",
    level: "Moderate",
    codeExample: `// Bitwise Mask:
// 0x7FFFFFFF in binary = 01111111 11111111 11111111 11111111
// Clears bit 31 (sign bit) -> Guarantees positive 31-bit integer.`
  },
  {
    id: 22,
    question: "Why should an application enforce a maximum failed TOTP attempt limit (e.g., 5 failures) even though codes change every 30 seconds?",
    shortAnswer: "An attacker with a fast botnet could attempt hundreds of guesses within a single 30-second window. Without rate limiting, distributed brute-force scripts have an amplified probability of guessing the active 6-digit code.",
    explanation: "Enforcing exponential backoff or locking after 5 failures within a time window neutralizes automated brute-force scripts.",
    hint: "Prevents automated botnets from submitting thousands of guesses within a single 30-second window.",
    level: "Basic",
    codeExample: `// Rate Limiting Policy:
// Max 5 attempts per user per 30-second window -> Exceeding triggers 5-minute cooldown.`
  },
  {
    id: 23,
    question: "What is the recommended cryptographic minimum length for a TOTP shared secret key K according to RFC 6238?",
    shortAnswer: "The minimum recommended secret length is 128 bits (16 bytes), though 160 bits (20 bytes, matching SHA-1 output) is the standard industry recommendation. For HMAC-SHA256, a 256-bit (32-byte) key is recommended.",
    explanation: "Using low-entropy or short keys (e.g., 4 bytes) allows attackers to brute-force the shared secret from a series of observed OTP codes.",
    hint: "Minimum 128 bits (16 bytes); 160 bits (20 bytes) recommended for SHA-1.",
    level: "Moderate",
    codeExample: `// Generating Cryptographically Secure 160-bit Secret:
const crypto = require('crypto');
const secretBytes = crypto.randomBytes(20); // 160 bits
const base32Secret = base32Encode(secretBytes);`
  },
  {
    id: 24,
    question: "Explain why HOTP is vulnerable to a Brute-Force Look-Ahead attack if the look-ahead window size s is configured excessively large (e.g., s = 10,000).",
    shortAnswer: "If s = 10,000, for every single guess the attacker submits, the server calculates and tests 10,000 consecutive HOTP codes. This increases the attacker's probability of guessing a valid code by 10,000x per attempt (10,000 / 1,000,000 = 1% success rate per guess).",
    explanation: "RFC 4226 advises keeping the look-ahead parameter s small (e.g., s <= 20) to prevent amplification of brute-force probability.",
    hint: "Large window means the server checks thousands of codes per guess, drastically increasing attack success probability.",
    level: "Expert",
    codeExample: `// Vulnerable Large Look-Ahead Window:
// s = 10,000 -> 10,000 valid codes accepted simultaneously!
// Attacker submits 100 random guesses -> ~63% probability of breaching account! ❌`
  },
  {
    id: 25,
    question: "How does TOTP protect against offline dictionary attacks compared to traditional static passwords?",
    shortAnswer: "TOTP codes are generated and consumed dynamically in real time and are never stored in a static hash database. Even if an attacker steals the entire server database, there are no static password hashes to crack offline.",
    explanation: "An attacker must compromise the active runtime memory of the server or the user's physical smartphone to obtain secrets.",
    hint: "Codes are ephemeral and dynamic; no static hashes exist in the database for offline cracking.",
    level: "Basic",
    codeExample: `// Ephemeral Nature:
// Stored in DB: Encrypted Seed Key (AES-256)
// Generated in RAM: Active Code [ 849201 ] -> Discarded from memory after 30 seconds.`
  },
  {
    id: 26,
    question: "What is an RFC 4226 Throttling Parameter and why is it mandatory for HOTP implementations?",
    shortAnswer: "Throttling limits the number of unauthenticated HOTP attempts from a client, enforcing a delay (e.g., locking authentication after T_max = 3 consecutive failed attempts) to prevent rapid exhaustive search of the 6-digit space.",
    explanation: "Because HOTP counters do not expire automatically every 30 seconds like TOTP, strict server-side attempt throttling is non-negotiable.",
    hint: "Mandatory lockout or progressive delay after failed HOTP attempts to defeat brute-force scripts.",
    level: "Moderate",
    codeExample: `// RFC 4226 Throttling:
// Failed Attempts: 1 -> OK
// Failed Attempts: 2 -> OK
// Failed Attempts: 3 -> LOCKOUT! Requires administrator intervention or re-enrollment.`
  },
  {
    id: 27,
    question: "How does Hardware Token manufacturing ensure the security of pre-burned TOTP seeds (e.g., RSA SecurID key fobs)?",
    shortAnswer: "Seeds are injected into tamper-resistant cryptographic microcontrollers during clean-room factory production and sealed in epoxy resin. The seeds are delivered to the customer via encrypted PGP files and the master factory copies are permanently destroyed.",
    explanation: "Any physical attempt to slice or chemically dissolve the chip packaging triggers active micro-wire mesh sensors that zeroize the internal memory.",
    hint: "Factory-sealed in tamper-resistant chips with physical anti-tamper zeroization circuitry.",
    level: "Expert",
    codeExample: `// Hardware Fob Lifecycle:
// 1. Secret injected into secure enclave chip in factory clean-room.
// 2. Encrypted seed file shipped via PGP to client.
// 3. Chip clock ticks internally for 5-year battery life; zero external electrical interfaces exposed.`
  },
  {
    id: 28,
    question: "What is the difference between Google Authenticator's URI format and proprietary enterprise authenticator extensions (e.g., Steam Guard)?",
    shortAnswer: "Google Authenticator strictly adheres to RFC 6238 standard base32 secrets producing numeric digits (0-9). Steam Guard uses a custom proprietary algorithm producing 5-character alphanumeric codes (e.g., 'K3M8P') based on a custom character mapping table.",
    explanation: "Proprietary formats prevent standard authenticator apps from generating valid codes unless reverse-engineered.",
    hint: "Standard TOTP generates 6-8 numeric digits; proprietary formats use custom alphanumeric alphabet mappings.",
    level: "Moderate",
    codeExample: `// Standard TOTP : [ 4 8 9 2 0 1 ] (Numeric)
// Steam Guard   : [ K 3 M 8 P ] (Custom 5-character alphanumeric mapping)`
  },
  {
    id: 29,
    question: "In a forensic analysis of a web application in Kolkata, an auditor discovered that the TOTP verification function used standard JavaScript `===` to compare the submitted code with the expected code. What vulnerability does this introduce?",
    shortAnswer: "It introduces a Side-Channel Timing Attack. The standard equality operator `===` aborts on the first mismatched character, leaking timing information in nanoseconds that allows an attacker to deduce the 6 digits one by one.",
    explanation: "Mitigation requires using `crypto.timingSafeEqual()` or a constant-time comparison loop that always checks all 6 digits regardless of early mismatches.",
    hint: "Standard equality leaks timing information; constant-time comparison is required.",
    level: "Expert",
    codeExample: `// Vulnerable:
if (submittedCode === expectedCode) { ... } // LEAKS TIMING ❌

// Secure:
const crypto = require('crypto');
const match = crypto.timingSafeEqual(
    Buffer.from(submittedCode), 
    Buffer.from(expectedCode)
); // Constant-time verification ✔`
  },
  {
    id: 30,
    question: "During an audit at the Barrackpore municipal treasury, 35 staff members reported that their 6-digit TOTP codes were rejected when trying to approve end-of-month salary batches. What was the exact forensic root cause and how was it permanently fixed?",
    shortAnswer: "The municipal FreeRADIUS authentication server's NTP synchronization service had crashed 3 weeks prior, causing the server's hardware clock to drift 48 seconds ahead of real-time UTC. Because the drift exceeded the +/- 30s tolerance window, all valid codes were rejected. Fixing required restarting chrony NTP sync and configuring automated clock drift alerting.",
    explanation: "When server time drifts beyond the tolerance window $W$, mathematically valid client codes generate counter $T$ while the server evaluates $T+2$, causing 100% false rejection.",
    hint: "Server clock drifted by 48 seconds after NTP service crashed, exceeding the 30-second tolerance window.",
    level: "Expert",
    codeExample: `// Forensic Findings:
// Real UTC Time   : 10:00:00 (Time Counter = 1200)
// Server Clock    : 10:00:48 (Time Counter = 1201.6 -> 1201)
// Client Code Gen : Counter 1200
// Server Check    : [1201, 1202] -> Mismatch ❌
// Fix: Restart Chrony NTP daemon + configure Nagios alert for clock drift > 2 seconds.`
  }
];

export default questions;
