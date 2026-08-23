const questions = [
  {
    id: 1,
    question: "What is Multi-Factor Authentication (MFA) and what is the fundamental mathematical principle governing its security?",
    shortAnswer: "MFA is an authentication mechanism requiring credentials from two or more independent factor categories. The core principle is that compromise of one factor (e.g., password stolen via phishing) does not compromise credentials in another domain (e.g., physical hardware key).",
    explanation: "True MFA mathematically reduces the overall probability of compromise to the product of the individual compromise probabilities of independent authentication channels: P(compromise) = P(factor_1) * P(factor_2).",
    hint: "Requires two or more distinct factor categories (Knowledge, Possession, Inherence).",
    level: "Basic",
    codeExample: `// True MFA vs Multi-Step 1FA:
// Multi-Step 1FA: Password (Knowledge) + PIN (Knowledge) -> Same domain ❌
// True 2FA      : Password (Knowledge) + TOTP Token (Possession) -> Distinct domains ✔`
  },
  {
    id: 2,
    question: "What are the three classical authentication factor categories defined in NIST SP 800-63B?",
    shortAnswer: "1. Something You KNOW (Knowledge - Passwords, PINs); 2. Something You HAVE (Possession - Security keys, Authenticator apps, smartcards); 3. Something You ARE (Inherence - Fingerprint, facial geometry, iris).",
    explanation: "Modern zero-trust systems extend this to include 'Somewhere You ARE' (Location - GPS/subnet) and 'Something You DO' (Behavioral - keystroke dynamics).",
    hint: "Knowledge (know), Possession (have), Inherence (are).",
    level: "Basic",
    codeExample: `// The 3 Classical Factors:
// 1. Knowledge  : "Passphrase#2026"
// 2. Possession : YubiKey 5 NFC / Google Authenticator
// 3. Inherence  : 3D Facial Geometry Scan`
  },
  {
    id: 3,
    question: "Why does requiring a password followed by the user's Mother's Maiden Name fail to qualify as True Two-Factor Authentication (2FA)?",
    shortAnswer: "Because both credentials belong strictly to the 'Something You Know' (Knowledge) factor category. This is Multi-Step Single-Factor Authentication (1FA) and can be compromised simultaneously by phishing or social engineering.",
    explanation: "For an authentication flow to be True 2FA, the second credential must originate from an independent factor domain such as a physical hardware key (Possession) or biometric scan (Inherence).",
    hint: "Both credentials are knowledge factors; compromising one mechanism allows compromising both.",
    level: "Basic",
    codeExample: `// Flawed Multi-Step Flow:
// Step 1: Enter Password -> "Kolkata#2026" (Knowledge)
// Step 2: Enter Security Question -> "St. Xavier's" (Knowledge)
// Result: 1FA only! Vulnerable to single-point phishing compromise.`
  },
  {
    id: 4,
    question: "Explain the three NIST Authenticator Assurance Levels (AAL1, AAL2, AAL3) outlined in NIST SP 800-63B.",
    shortAnswer: "AAL1: Single-factor authentication. AAL2: Multi-factor authentication using software tokens (TOTP) or secure push notifications. AAL3: High-assurance multi-factor requiring hardware cryptographic keys with origin binding (FIDO2/WebAuthn) to defeat phishing.",
    explanation: "AAL3 is mandatory for high-impact federal, defense, and high-value financial transaction systems where Adversary-in-the-Middle (AitM) attacks must be completely neutralized.",
    hint: "AAL1 = Single-factor; AAL2 = Standard MFA (TOTP); AAL3 = Hardware Cryptographic MFA (FIDO2).",
    level: "Moderate",
    codeExample: `// NIST AAL Tiers:
// AAL1: Password only
// AAL2: Password + Microsoft Authenticator TOTP app
// AAL3: Password/PIN + FIDO2 USB Security Key with physical touch proof`
  },
  {
    id: 5,
    question: "What is an MFA Fatigue Attack (MFA Prompt Bombing) and how do attackers execute it?",
    shortAnswer: "An attacker who possesses stolen credentials repeatedly triggers dozens of push notification approval prompts to the victim's smartphone (often late at night) until the victim experiences fatigue or confusion and clicks 'Approve'.",
    explanation: "This attack exploits human psychological exhaustion to bypass simple push-notification MFA without needing to compromise the mobile authenticator itself.",
    hint: "Bombarding a user with push notifications until they inadvertently tap 'Approve'.",
    level: "Moderate",
    codeExample: `// MFA Prompt Bombing Sequence:
// 02:15 AM - Push 1 sent -> Denied
// 02:16 AM - Push 2 sent -> Ignored
// ...
// 02:28 AM - Push 42 sent -> User taps "Approve" to silence alarm -> ACCOUNT BREACHED! 🚨`
  },
  {
    id: 6,
    question: "How does Number Matching completely eliminate MFA Fatigue / Prompt Bombing attacks?",
    shortAnswer: "Number Matching forces the user to view a 2-digit number generated on the web login screen and manually type that exact number into their mobile authenticator app to complete the authentication.",
    explanation: "Because an attacker triggering remote push bombs cannot see the victim's physical monitor, the victim cannot blindly tap 'Approve' without knowing the 2-digit code displayed on the attacker's screen.",
    hint: "User must enter a 2-digit code displayed on the login browser into their mobile app.",
    level: "Moderate",
    codeExample: `// Number Matching Workflow:
// Web Browser shows: "Enter [ 84 ] in your Authenticator app"
// Mobile App prompts: "Enter the 2-digit number shown on your computer screen: [ __ ]"
// Result: Attacker cannot complete push approval remotely.`
  },
  {
    id: 7,
    question: "What is an Adversary-in-the-Middle (AitM) Reverse Proxy attack (e.g., using Evilginx) against standard MFA?",
    shortAnswer: "An AitM reverse proxy sits transparently between the victim and the legitimate banking website, proxying login credentials and OTP codes in real time, and capturing the authenticated session cookie once the user finishes 2FA.",
    explanation: "Because software TOTP and SMS OTP codes are not cryptographically bound to the browser's TLS channel, the proxy relays the valid OTP to the real server and steals the resulting session token.",
    hint: "Proxies phishing traffic to the real server, stealing the final authenticated session cookie.",
    level: "Expert",
    codeExample: `// AitM Flow (Evilginx):
// Victim -> [Fake Phishing Proxy: bank-login.net] -> [Real Bank: bank.com]
// Victim enters Password + TOTP -> Proxy forwards to real bank -> Real bank issues Session Cookie -> Proxy intercepts cookie!`
  },
  {
    id: 8,
    question: "Why is FIDO2 / WebAuthn completely immune to Adversary-in-the-Middle (AitM) phishing proxies?",
    shortAnswer: "FIDO2 enforces Cryptographic Origin Binding: the browser signs a challenge using the hardware key's private key that includes the exact domain origin (e.g., 'https://bank.com'). When sent to a phishing proxy ('https://bank-login.net'), the cryptographic signature verification fails on the real server.",
    explanation: "Because origin verification is handled by the browser engine and cryptographic public key cryptography, an attacker's fake domain cannot forge signatures for the legitimate origin.",
    hint: "Hardware key binds authentication directly to the exact browser domain in the URL bar.",
    level: "Expert",
    codeExample: `// Cryptographic Origin Binding:
// Client on 'evil-phish.in' -> Hardware key signs: { origin: 'https://evil-phish.in', challenge: '...' }
// Real server 'bank.com' checks signature -> Origin mismatch ('evil-phish.in' !== 'bank.com') -> REJECTED ❌`
  },
  {
    id: 9,
    question: "What is Adaptive Risk-Based Authentication (Step-Up Authentication) and how does it optimize user experience?",
    shortAnswer: "Adaptive Authentication dynamically evaluates contextual risk signals (location, device health, transaction amount in ₹, time) during access requests, granting seamless single sign-on for low-risk sessions and demanding stronger MFA factors only when anomalies occur.",
    explanation: "Rather than burdening users with 2FA prompts on every routine internal click, Step-Up MFA triggers high-assurance challenges when users attempt high-risk actions (e.g., transferring ₹5,00,000).",
    hint: "Dynamically prompts for stronger authentication based on contextual risk scores.",
    level: "Moderate",
    codeExample: `// Adaptive Step-Up Decision:
if (transactionAmount > 500000 || isImpossibleTraveler) {
    enforceMfa("FIDO2_HARDWARE_KEY_TOUCH"); // High Risk Step-Up
} else {
    allowSeamlessSession(); // Low Risk SSO
}`
  },
  {
    id: 10,
    question: "Why is SMS OTP considered the weakest possession factor and deprecated by modern NIST guidelines?",
    shortAnswer: "SMS OTP messages are transmitted in cleartext across cellular networks and are highly vulnerable to SIM Swapping attacks, SS7 cellular signaling interception, and malware-infected mobile device SMS interceptors.",
    explanation: "NIST SP 800-63B classifies SMS OTP as 'Restricted' and recommends replacing it with app-based TOTP or hardware security keys.",
    hint: "Vulnerable to SIM swapping, SS7 interception, and mobile malware.",
    level: "Basic",
    codeExample: `// SIM Swap Attack:
// 1. Attacker bribes telecom agent with ₹5,000 to assign Susmita's phone number to new SIM.
// 2. Attacker clicks "Forgot Password" on bank.
// 3. Bank sends SMS OTP -> Delivered to attacker's phone! ❌`
  },
  {
    id: 11,
    question: "What is the difference between Out-of-Band (OOB) authentication and In-Band authentication?",
    shortAnswer: "In-Band authentication transmits all authentication factors over the same primary communication channel (e.g., typing a password and PIN into the same browser window). Out-of-Band (OOB) delivers the second factor across a completely separate, independent channel (e.g., a push notification to a mobile app via cellular data).",
    explanation: "OOB authentication ensures that compromising the user's primary network connection (e.g., a compromised Wi-Fi router) does not compromise the secondary authentication pathway.",
    hint: "In-band uses the same channel; Out-of-Band uses an independent communication channel.",
    level: "Moderate",
    codeExample: `// In-Band: PC Browser -> Sends Password + PIN over same Ethernet cable.
// Out-of-Band: PC Browser sends Password -> Server sends encrypted Push Notification over 5G cellular to Mobile App.`
  },
  {
    id: 12,
    question: "How do Backup Recovery Codes (Emergency Codes) maintain security when a user loses their primary MFA authenticator?",
    shortAnswer: "Backup codes are a set of single-use, high-entropy random strings generated during MFA enrollment, hashed using slow KDFs, and stored by the user in a secure offline location. Using a backup code immediately invalidates it from the database.",
    explanation: "Single-use enforcement ensures that intercepted or leaked emergency codes cannot be replayed by adversaries for persistent account access.",
    hint: "High-entropy, single-use codes that are permanently invalidated after one successful login.",
    level: "Moderate",
    codeExample: `// Backup Codes Array:
// ["8f92-a1b4", "3c78-99e2", "01fa-45cd"]
// When "8f92-a1b4" is used -> Server marks status as "REDEEMED" and prevents re-use.`
  },
  {
    id: 13,
    question: "What is Context-Rich Push Notification and what metadata must it display to the user?",
    shortAnswer: "Context-rich notifications display the geographic location (city/state), IP address, operating system, browser application name, and timestamp of the login request alongside the approval prompt.",
    explanation: "If Susmita is in Barrackpore and receives a push notification stating 'Login requested from Moscow, Russia on Chrome Windows', she instantly recognizes the fraud attempt and taps 'Deny & Report'.",
    hint: "Displays requesting location, app name, and IP address to help users identify fraud.",
    level: "Basic",
    codeExample: `// Context-Rich Prompt:
// "Authentication Request from Chrome on Windows 11"
// Location: Barrackpore, West Bengal, India
// IP Address: 103.220.14.88
// Time: 14:32 IST
// [ Approve ]   [ Deny & Report Fraud 🚨 ]`
  },
  {
    id: 14,
    question: "How do Time-Based One-Time Passwords (TOTP - RFC 6238) synchronize between a client authenticator app and an authentication server without communicating?",
    shortAnswer: "Client and server share a static base32 cryptographic secret key. Both independently calculate the current time counter $C = \\lfloor \\text{current\\_epoch\\_time} / 30 \\rfloor$ and compute $HMAC\\text{-}SHA1(\\text{secret}, C)$, truncating the result to a 6-digit code.",
    explanation: "Because both devices use UTC epoch time with a 30-second window, they generate identical 6-digit codes simultaneously without needing an active network connection.",
    hint: "Both compute HMAC on the shared secret using the current 30-second UTC time counter.",
    level: "Moderate",
    codeExample: `// TOTP Formula:
// Counter C = floor(Epoch_Seconds / 30)
// Code = Truncate(HMAC-SHA1(SharedSecret, C)) % 10^6`
  },
  {
    id: 15,
    question: "What is Clock Drift in TOTP systems and how is it resolved on authentication servers?",
    shortAnswer: "Clock drift occurs when a client smartphone or authentication server's internal hardware clock drifts forward or backward by several seconds. Servers resolve this by validating codes against a tolerance window (e.g., $C-1$, $C$, $C+1$), accepting codes generated 30 seconds before or after.",
    explanation: "A tolerance window of $\\pm 1$ step prevents legitimate users from being rejected when their phone clock is slightly out of sync.",
    hint: "Server accepts TOTP codes from the current time step as well as the immediately preceding and succeeding time steps.",
    level: "Moderate",
    codeExample: `// Server Verification Window:
const currentStep = Math.floor(Date.now() / 1000 / 30);
const valid = (
    verifyCode(secret, currentStep - 1) || // 30 sec past
    verifyCode(secret, currentStep)     || // Current
    verifyCode(secret, currentStep + 1)    // 30 sec future
);`
  },
  {
    id: 16,
    question: "Explain the Session Hijacking threat model after successful MFA completion.",
    shortAnswer: "Once MFA is successfully completed, the server issues a session token (cookie or JWT) stored in the user's browser. If an attacker steals this token via Infostealer malware, XSS, or AitM proxy, they bypass MFA entirely for all subsequent requests.",
    explanation: "MFA authenticates the initial login handshake; session security requires continuous binding (e.g., DPoP - Demonstrating Proof-of-Possession, Token Binding, and short session lifetimes).",
    hint: "Stealing the authenticated session cookie allows bypassing MFA on subsequent HTTP requests.",
    level: "Expert",
    codeExample: `// Session Token Theft:
// 1. User completes high-assurance FIDO2 MFA.
// 2. Server sets cookie: "session_id=9f8a7c2b...".
// 3. LummaC2 infostealer malware extracts cookie -> Attacker injects cookie into their browser -> Full access without MFA!`
  },
  {
    id: 17,
    question: "What is Demonstrating Proof-of-Possession (DPoP - RFC 9449) and how does it prevent stolen session tokens from being replayed?",
    shortAnswer: "DPoP binds OAuth access and refresh tokens to a client's private cryptographic key. For every API request, the client generates a unique signed JWT proof using its private key; an attacker stealing the token cannot replay it without possessing the private key.",
    explanation: "DPoP transforms bearer tokens into sender-constrained tokens, ensuring stolen tokens are useless on unauthorized devices.",
    hint: "Binds access tokens to a client private key, making stolen tokens unusable without the key.",
    level: "Expert",
    codeExample: `// DPoP Protected Request:
// Header: Authorization: DPoP <access_token>
// Header: DPoP: <signed_jwt_proof_containing_http_method_and_uri>`
  },
  {
    id: 18,
    question: "What is MFA Bypass via OAuth Device Authorization Grant abuse (Device Code Phishing)?",
    shortAnswer: "An attacker initiates a Device Authorization Flow (RFC 8628), obtains a user code (e.g., 'WDJB-MJHT'), and phishes the victim into entering this code on `microsoft.com/devicelogin`. When the victim logs in and completes MFA, the attacker's CLI tool receives the session tokens.",
    explanation: "Because the victim logs in on the legitimate corporate portal, they believe the action is safe, unaware that they are authorizing the attacker's remote terminal.",
    hint: "Tricks a victim into entering an attacker's device code on the legitimate corporate portal.",
    level: "Expert",
    codeExample: `// Device Code Phishing:
// 1. Attacker runs: az login --use-device-code -> Gets code: 'BCA-703'
// 2. Attacker emails victim: "Please verify device at microsoft.com/devicelogin with code BCA-703"
// 3. Victim enters code and completes MFA -> Attacker CLI gets full Azure AD admin token!`
  },
  {
    id: 19,
    question: "What is Biometric Liveness Detection and why is it essential for Inherence factor security?",
    shortAnswer: "Liveness detection determines whether a presented biometric sample (fingerprint, face, iris) originates from a live human present at the sensor rather than a synthetic spoof (e.g., 3D printed silicon mask, photograph, gelatin mold, deepfake video).",
    explanation: "Techniques include infrared depth sensors, structured light projection, pupil dilation response, micro-texture reflection analysis, and challenge-response eye movements.",
    hint: "Verifies the biometric trait is from a live, physically present human rather than a fake replica.",
    level: "Moderate",
    codeExample: `// Liveness Check:
// 1. Structured Infrared Dot Mesh projects 30,000 dots on face (measures 3D depth).
// 2. Infrared camera checks thermal heat signature and involuntary blink micro-motion.
// 3. 2D photo or silicon mask rejected with Presentation Attack Detection (PAD) alert.`
  },
  {
    id: 20,
    question: "Explain the role of Hardware Security Modules (HSM) in enterprise MFA key management.",
    shortAnswer: "An HSM is a tamper-resistant physical computing appliance that securely generates, stores, and manages cryptographic keys for MFA token validation, preventing key extraction even if the host server is fully compromised.",
    explanation: "HSMs enforce physical security boundaries, zeroizing (wiping) keys if physical intrusion or voltage tampering is detected.",
    hint: "Dedicated tamper-resistant hardware storing and calculating cryptographic MFA keys.",
    level: "Moderate",
    codeExample: `// HSM Key Operation:
// Server sends challenge to HSM -> HSM signs challenge internally with master private key -> Returns signature.
// Master private key NEVER leaves the secure physical boundary of the HSM chip.`
  },
  {
    id: 21,
    question: "What is the difference between Synchronous and Asynchronous MFA push notifications?",
    shortAnswer: "Synchronous push requires the user to actively interact with both the browser and mobile device in lockstep (e.g., typing a number shown on screen). Asynchronous push delivers a passive 'Approve / Deny' prompt without requiring cross-verification between devices.",
    explanation: "Asynchronous push is highly vulnerable to accidental approvals and MFA fatigue attacks, whereas synchronous push prevents blind approvals.",
    hint: "Synchronous requires cross-device verification (number matching); asynchronous is a simple tap.",
    level: "Basic",
    codeExample: `// Asynchronous: "Did you just log in? [Yes] [No]" (Vulnerable to blind tap ❌)
// Synchronous : "Type the number 47 displayed on your laptop into your phone." (Secure ✔)`
  },
  {
    id: 22,
    question: "How does Impossible Traveler detection identify compromised accounts using geo-velocity math?",
    shortAnswer: "It calculates the Great-Circle distance between two consecutive login locations and divides by the elapsed time. If the calculated travel speed exceeds commercial aviation limits (e.g., velocity > 900 km/h), the system flags the login as fraudulent.",
    explanation: "Using the Haversine formula, logging in from Barrackpore at 10:00 AM and Frankfurt at 10:30 AM requires an impossible travel velocity of ~15,000 km/h, indicating credential sharing or botnet proxy usage.",
    hint: "Measures distance between two logins divided by elapsed time to detect impossible physical travel.",
    level: "Moderate",
    codeExample: `// Haversine Velocity Check:
// Login 1: Barrackpore (22.76°N, 88.36°E) at 10:00 IST
// Login 2: Frankfurt (50.11°N, 8.68°E) at 10:30 IST (Distance = 7,200 km)
// Velocity = 7,200 km / 0.5 hr = 14,400 km/h (> 900 km/h limit) -> TRIGGER LOCKOUT! 🚨`
  },
  {
    id: 23,
    question: "What is Passkey Synchronization across cloud ecosystems (Apple iCloud Keychain / Google Password Manager) and what security trade-off does it introduce?",
    shortAnswer: "Synced passkeys replicate FIDO2 cryptographic private keys across all devices in a user's cloud account using end-to-end encryption. The benefit is seamless backup and multi-device usability, but the trade-off is that compromising the master cloud account exposes all synced passkeys.",
    explanation: "For ultra-high-security environments (defense, high finance), organizations enforce hardware-bound, non-exportable passkeys (Device-Bound Passkeys on YubiKeys).",
    hint: "Passkeys sync across cloud devices for convenience; device-bound passkeys remain locked to one hardware chip.",
    level: "Expert",
    codeExample: `// Synced vs Device-Bound Passkey:
// Synced Passkey        : Stored in iCloud/Google Keychain -> Accessible on iPhone, iPad, Mac.
// Device-Bound Passkey : Stored on YubiKey AAL3 hardware -> Private key CANNOT be copied or synced.`
  },
  {
    id: 24,
    question: "What is the impact of MFA on Automated API and Service-to-Service communications?",
    shortAnswer: "Interactive human MFA (TOTP, push notifications, biometrics) cannot be answered by automated backend microservices. Automated systems use non-interactive cryptographic authentication: mTLS (mutual TLS certificates), Workload Identity Federation, or OAuth client credentials.",
    explanation: "Enforcing interactive human MFA on machine-to-machine service accounts causes scheduled automation jobs to crash.",
    hint: "Machine APIs require non-interactive mTLS or OAuth client credentials, not human push prompts.",
    level: "Moderate",
    codeExample: `// Machine-to-Machine Authentication:
// Service A -> Sends Client X.509 Certificate (mTLS) + Signed JWT Assertion -> Service B verifies cryptographically.`
  },
  {
    id: 25,
    question: "How does Conditional Access Policy enforcement in Microsoft Entra ID or Okta protect enterprise networks?",
    shortAnswer: "Conditional Access evaluates an 'if-then' policy engine: IF user role is Finance, device is non-compliant, and IP is outside corporate subnet, THEN block access or enforce mandatory FIDO2 hardware MFA + PIN.",
    explanation: "This allows fine-grained security rules that tailor authentication rigor to user privilege, asset sensitivity, and ambient risk.",
    hint: "Rules engine evaluating user, device health, location, and risk to assign authentication requirements.",
    level: "Moderate",
    codeExample: `// Conditional Access Rule:
// IF (User in "Treasury_Admins" AND Location != "Barrackpore_HQ") {
//    Require: MFA (AAL3 FIDO2) AND Device_Compliant == True
// }`
  },
  {
    id: 26,
    question: "What is MFA Downgrade / Fallback Attack and how is it mitigated?",
    shortAnswer: "An attacker intentionally causes a high-assurance MFA method (FIDO2 or TOTP) to fail or triggers error conditions to force the server into offering a weaker fallback method (such as SMS OTP or security questions).",
    explanation: "Mitigation requires disabling weak fallback options entirely or requiring administrator authorization for MFA reset requests.",
    hint: "Manipulating authentication to force the server to accept a weaker secondary factor like SMS.",
    level: "Moderate",
    codeExample: `// Downgrade Attack:
// Attacker clicks "Hardware key not available? Try SMS OTP instead" -> Server falls back to phishable SMS channel ❌
// Hardened Policy: Fallback to weaker factors is strictly disabled ✔`
  },
  {
    id: 27,
    question: "Explain the concept of Continuous Adaptive Risk and Trust Assessment (CARTA) in zero-trust MFA.",
    shortAnswer: "CARTA is a security paradigm that continuously monitors user and device behavior throughout the entire session (not just at login), dynamically terminating sessions or requesting step-up authentication if anomalies arise.",
    explanation: "If a user successfully authenticates with 2FA but their device abruptly disables its firewall, begins exfiltrating gigabytes of data, or connects via a VPN, CARTA revokes access in real time.",
    hint: "Continuously monitors session risk and revokes access dynamically rather than checking only at login.",
    level: "Expert",
    codeExample: `// CARTA Session Monitoring:
// 10:00 - User logs in with MFA (Risk: 5/100 -> Pass)
// 10:25 - User disables endpoint antivirus -> Risk jumps to 85/100 -> CARTA instantly revokes active JWT session!`
  },
  {
    id: 28,
    question: "What is an Infostealer Malware (e.g., RedLine, Racoon, Lumma) attack on MFA-authenticated browsers?",
    shortAnswer: "Infostealer malware infects a user's machine and extracts decrypted cookies, session tokens, and saved credentials directly from browser SQLite databases (like Chrome's `Cookies` file) in user memory, bypassing MFA entirely.",
    explanation: "Because the attacker steals the valid, active session token, they can replay it on their own machine without having to solve the MFA challenge.",
    hint: "Steals active session cookies directly from the victim's local browser memory.",
    level: "Moderate",
    codeExample: `// Infostealer Action:
// Target file: %LocalAppData%\\Google\\Chrome\\User Data\\Default\\Network\\Cookies
// Extracts: session_token for banking portal -> Exfiltrates to Telegram C2 channel.`
  },
  {
    id: 29,
    question: "How does Fast IDentity Online (FIDO) Universal 2nd Factor (U2F) protocol differ from modern FIDO2?",
    shortAnswer: "U2F was designed strictly as a second factor alongside a mandatory first-factor password (Password + USB key tap). FIDO2 (WebAuthn + CTAP2) supports passwordless authentication, allowing the security key to act as a standalone primary authenticator using on-device PIN or biometrics.",
    explanation: "FIDO2 incorporates Client to Authenticator Protocol 2 (CTAP2), enabling mobile phones, laptops, and external USB keys to provide resident credentials without passwords.",
    hint: "U2F was strictly a 2nd factor; FIDO2 supports true single-step passwordless login.",
    level: "Moderate",
    codeExample: `// Evolution:
// U2F   : Password (1st Factor) + U2F Key Tap (2nd Factor)
// FIDO2 : FIDO2 Security Key + Fingerprint Touch (Single-Step Passwordless Authentication)`
  },
  {
    id: 30,
    question: "In a forensic incident at a financial institution in Barrackpore, a remote worker's account was compromised despite having standard SMS OTP 2FA enabled. What was the exact root cause and what architectural change was mandated?",
    shortAnswer: "The worker fell victim to an Adversary-in-the-Middle (AitM) phishing proxy (Evilginx) that relayed their password and SMS OTP in real time to the real banking server and captured the authenticated session cookie. The SOC mandated migration to phishing-resistant FIDO2 hardware keys (NIST AAL3).",
    explanation: "SMS OTP and software TOTP are phishable via AitM reverse proxies; only cryptographic origin-bound authenticators (FIDO2) provide absolute immunity.",
    hint: "AitM proxy intercepted the SMS OTP and stole the session cookie; resolved by migrating to FIDO2.",
    level: "Expert",
    codeExample: `// Root Cause & Resolution:
// Root Cause : AitM Reverse Proxy intercepted SMS OTP and captured active session cookie.
// Mandated Fix: Enforced FIDO2 WebAuthn keys with mandatory origin verification; deprecated SMS OTP.`
  }
];

export default questions;
