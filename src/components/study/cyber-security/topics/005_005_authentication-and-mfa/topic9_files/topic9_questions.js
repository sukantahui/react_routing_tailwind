const questions = [
  {
    id: 1,
    question: "What is a Passkey in modern cybersecurity architecture?",
    shortAnswer: "A Passkey is a consumer-friendly, standardized discoverable FIDO2/WebAuthn public-key credential designed to replace passwords. It authenticates users via public-key cryptography unlocked by on-device biometrics (Face ID/Touch ID) or local device PIN.",
    explanation: "Passkeys eliminate passwords entirely, eliminating phishing, credential stuffing, and database breach password theft.",
    hint: "A discoverable FIDO2 public-key credential replacing passwords with biometric or PIN unlock.",
    level: "Basic",
    codeExample: `// Passkey Essence:
// Private Key : Securely stored in device hardware / synced keychain
// Public Key  : Registered on server database
// Login Action: Biometric touch unlocks private key to sign server challenge.`
  },
  {
    id: 2,
    question: "What is the difference between a Multi-Device (Synced) Passkey and a Single-Device (Device-Bound) Passkey?",
    shortAnswer: "Synced Passkeys synchronize private keys across all devices linked to a user's cloud account (Apple iCloud Keychain / Google Password Manager) using end-to-end encryption. Device-Bound Passkeys are stored strictly on a physical hardware chip (YubiKey / TPM) and are non-exportable.",
    explanation: "Synced passkeys maximize consumer convenience and backup; device-bound passkeys satisfy ultra-high-assurance enterprise compliance (NIST AAL3).",
    hint: "Synced passkeys replicate across cloud ecosystems; device-bound passkeys remain locked to physical hardware.",
    level: "Basic",
    codeExample: `// Synced vs Device-Bound:
// Synced Passkey       : iPhone ➔ iPad ➔ Mac (Synced via iCloud)
// Device-Bound Passkey: YubiKey 5 NFC (Private key NEVER leaves USB chip)`
  },
  {
    id: 3,
    question: "How do the FIDO CTAP2 Backup Eligibility (BE) and Backup State (BS) flags allow servers to distinguish between Synced and Device-Bound passkeys?",
    shortAnswer: "BE (Backup Eligibility - Bit 3 of authenticatorData) indicates if the device is capable of backing up the key. BS (Backup State - Bit 4) indicates if the key is currently backed up. A hardware YubiKey outputs BE=0, BS=0, while an Apple iCloud passkey outputs BE=1, BS=1.",
    explanation: "Enterprise relying parties inspect these flags to enforce policies blocking synced passkeys on sensitive systems.",
    hint: "BE = Can it be backed up? BS = Is it currently backed up?",
    level: "Moderate",
    codeExample: `// authenticatorData Flag Parsing:
const isBackupEligible = Boolean(flags & 0x08); // Bit 3 (BE)
const isBackedUp = Boolean(flags & 0x10);       // Bit 4 (BS)`
  },
  {
    id: 4,
    question: "Explain the workflow of FIDO Hybrid Transport (caBLE - Client to Authenticator over BLE) when logging into a desktop PC using a smartphone.",
    shortAnswer: "1. Desktop displays a WebAuthn QR code containing ephemeral keys. 2. User scans the QR code with their mobile phone. 3. Phone and PC verify local Bluetooth Low Energy (BLE) proximity (< 10m). 4. An encrypted tunnel is established. 5. User unlocks phone with Face ID to sign the desktop's login assertion.",
    explanation: "Hybrid transport allows seamless cross-platform login without installing software or entering passwords on shared computers.",
    hint: "Scans QR code on PC screen, verifies BLE proximity, and completes biometric unlock on phone.",
    level: "Moderate",
    codeExample: `// caBLE Hybrid Flow:
// PC Browser (QR Code) ➔ Phone Scans QR ➔ BLE Proximity Handshake ➔ Phone Face ID ➔ PC Logged In ✔`
  },
  {
    id: 5,
    question: "Why is Bluetooth Low Energy (BLE) proximity verification mandatory in the FIDO Hybrid (caBLE) specification?",
    shortAnswer: "BLE signals travel only a few meters (< 10 meters). Requiring BLE verification proves that the smartphone and desktop PC are physically in the same room, preventing a remote phishing attacker on the other side of the world from forwarding a QR code to trick a victim.",
    explanation: "Without BLE proximity, an attacker could screenshot the QR code and display it on a phishing website to trick a victim into authenticating the attacker's session.",
    hint: "Proves the phone and computer are physically in the same room, defeating remote QR phishing.",
    level: "Expert",
    codeExample: `// Anti-Relay Defense:
// Remote Attacker in London sends QR to Susmita in Barrackpore ➔ Phone scans QR ➔ BLE Handshake Fails (Distance > 10m) ➔ Session Aborted! 🛡️`
  },
  {
    id: 6,
    question: "How does Passkey Auto-Fill (Conditional UI) streamline the user login experience?",
    shortAnswer: "The browser detects saved passkeys for the domain and automatically presents them inside the standard username dropdown. Clicking an account prompts for instant fingerprint or facial recognition, logging in with zero keystrokes.",
    explanation: "Conditional UI eliminates cognitive overhead while maintaining the full phishing resistance of WebAuthn.",
    hint: "Presents passkeys in username input autocomplete dropdowns for single-tap login.",
    level: "Basic",
    codeExample: `// HTML Form:
// <input id="username" name="username" autocomplete="username webauthn" />`
  },
  {
    id: 7,
    question: "What is End-to-End Encryption (E2EE) in Cloud Keychain synchronization (e.g., Apple iCloud Keychain / Google Password Manager)?",
    shortAnswer: "Private keys are encrypted on the client device using an encryption key derived from the user's device passcode/biometrics before being uploaded to cloud storage. Apple or Google cloud servers store only encrypted ciphertext and have zero mathematical ability to decrypt the private keys.",
    explanation: "Even if Apple's or Google's cloud servers are subpoenaed or breached, passkeys remain mathematically unreadable.",
    hint: "Encrypted locally with user device passcodes before cloud upload; cloud providers cannot read the keys.",
    level: "Moderate",
    codeExample: `// E2EE Sync Architecture:
// Local Passkey + Device Passcode -> Argon2id -> AES-256 Key -> Encrypted Passkey -> Synced to Cloud Blob.`
  },
  {
    id: 8,
    question: "What security risk arises if an attacker gains physical access to an unlocked smartphone with synced passkeys?",
    shortAnswer: "If the smartphone is unlocked and lacks biometric re-authentication for WebAuthn, the attacker could authenticate to passkey-protected web services. However, WebAuthn requires User Verification (biometric touch or passcode re-entry) for sensitive operations.",
    explanation: "Mandating `userVerification: 'required'` ensures that an unlocked phone still demands a biometric face/fingerprint match during login.",
    hint: "Mitigated by enforcing mandatory User Verification (UV) biometrics during authentication.",
    level: "Basic",
    codeExample: `// WebAuthn Option:
// userVerification: "required" ➔ Forces Face ID / Fingerprint prompt even if phone is already unlocked.`
  },
  {
    id: 9,
    question: "How do Passkeys eliminate the 'Account Recovery' vulnerability inherent in traditional password resets?",
    shortAnswer: "Traditional password resets rely on vulnerable SMS OTPs or cleartext email links. With synced passkeys, loss of a single phone is resolved by simply logging into a new device with the master cloud account, which automatically restores all passkeys without resetting credentials.",
    explanation: "This removes the 'Forgot Password' workflow—the most heavily targeted social engineering attack vector in consumer banking.",
    hint: "Passkeys restore automatically across cloud devices, eliminating insecure email/SMS reset links.",
    level: "Moderate",
    codeExample: `// Passkey Recovery:
// User buys new iPhone -> Signs into Apple ID -> All 50 banking passkeys restored instantly via iCloud E2EE.`
  },
  {
    id: 10,
    question: "What is the Passkey Ecosystem Provider Lock-in concern and what standard is addressing it?",
    shortAnswer: "Passkeys created in Apple iCloud Keychain were historically difficult to export to Google Password Manager or Windows. The FIDO Alliance CXP (Credential Exchange Protocol) and CXF (Credential Exchange Format) standards are developing secure, encrypted passkey export/import mechanisms between providers.",
    explanation: "Standardized credential exchange ensures users can migrate between Android, iOS, and third-party password managers (1Password, Bitwarden) freely.",
    hint: "FIDO CXP/CXF standards allow encrypted import/export of passkeys between Apple, Google, and password managers.",
    level: "Moderate",
    codeExample: `// FIDO CXP (Credential Exchange Protocol):
// Export Passkeys from Apple Keychain -> Encrypted CXF Archive -> Import into Bitwarden.`
  },
  {
    id: 11,
    question: "Why are Passkeys classified as Multi-Factor Authentication (MFA) within a single physical interaction?",
    shortAnswer: "Because a passkey inherently combines 'Something You HAVE' (possession of the physical smartphone hardware chip or YubiKey) with 'Something You ARE' (biometric Face ID/fingerprint) or 'Something You KNOW' (device PIN) during a single biometric tap.",
    explanation: "Passkeys achieve true multi-factor assurance without the user having to type separate passwords and OTP codes.",
    hint: "Possession of the physical phone chip + Biometric face/fingerprint unlock.",
    level: "Basic",
    codeExample: `// Single-Step MFA:
// Factor 1 (Possession) : Hardware Secure Enclave Chip
// Factor 2 (Inherence)  : Face ID Biometric Scan
// Result: High-Assurance 2FA in 400 milliseconds ✔`
  },
  {
    id: 12,
    question: "What is an Authenticator Attachment option in WebAuthn and how do servers enforce hardware-only keys?",
    shortAnswer: "The server sets `authenticatorAttachment: 'cross-platform'` in the creation options. This instructs the browser to reject built-in platform authenticators (like Touch ID/Windows Hello) and accept only external roaming hardware keys (like USB YubiKeys).",
    explanation: "Enterprise IT administrators use cross-platform attachment to enforce physical token ownership across corporate workstations.",
    hint: "Setting authenticatorAttachment to 'cross-platform' mandates external USB/NFC hardware keys.",
    level: "Moderate",
    codeExample: `// WebAuthn Creation Options:
// authenticatorSelection: {
//   authenticatorAttachment: "cross-platform", // USB/NFC YubiKey only
//   userVerification: "required"
// }`
  },
  {
    id: 13,
    question: "How do Third-Party Password Managers (Bitwarden, 1Password, Dashlane) manage passkeys across multiple operating systems?",
    shortAnswer: "They act as FIDO2 WebAuthn authenticators via browser extensions and native OS integration APIs, storing the encrypted private keys in their zero-knowledge cloud vaults and unlocking them via the master password or local biometrics.",
    explanation: "This allows users on Linux, Windows, macOS, and Android to share the exact same synced passkeys without being locked into a single OS vendor.",
    hint: "Store passkeys in cross-platform encrypted vaults unlocked by a master key or biometric.",
    level: "Moderate",
    codeExample: `// Third-Party Passkey Manager:
// Browser WebAuthn API -> Redirected to Bitwarden Extension -> Vault Decrypted -> Signs Assertion across any OS.`
  },
  {
    id: 14,
    question: "What is an Ephemeral Tunnel Key in the FIDO caBLE cross-device protocol?",
    shortAnswer: "An ephemeral keypair generated during QR code display using Elliptic Curve Diffie-Hellman (ECDH). When the smartphone scans the QR code, both devices compute a shared symmetric session key (AES-256-GCM) that encrypts all Bluetooth and cloud relay messages.",
    explanation: "The tunnel key is discarded immediately after authentication, ensuring forward secrecy for cross-device sessions.",
    hint: "Short-lived cryptographic key encrypting the communication between phone and PC.",
    level: "Expert",
    codeExample: `// caBLE Tunnel Key Derivation:
// QR Code contains: Client_Ephemeral_Public_Key
// Phone generates: Phone_Ephemeral_Keypair
// Shared Key = ECDH(Phone_Private, Client_Public) -> Encrypts WebAuthn payload.`
  },
  {
    id: 15,
    question: "How does a relying party server verify that a passkey user has not fallen victim to a phishing proxy on a sub-domain (e.g., `bank.barrackpore.gov.in` vs `evil.barrackpore.gov.in`)?",
    shortAnswer: "The Relying Party ID is strictly scoped. A server on `bank.barrackpore.gov.in` sets `rp.id: 'bank.barrackpore.gov.in'`. The browser verifies that the origin is an exact match or valid sub-domain of the `rp.id`. A compromised sister sub-domain (`evil.barrackpore.gov.in`) cannot request assertions for `bank.barrackpore.gov.in`.",
    explanation: "WebAuthn's origin matching rules strictly prevent sibling sub-domain impersonation.",
    hint: "Browser enforces strict domain hierarchy rules, preventing unauthorized sub-domains from claiming the RP ID.",
    level: "Expert",
    codeExample: `// Scoping Rules:
// Origin: 'https://bank.barrackpore.gov.in' ➔ Permitted rp.id: 'bank.barrackpore.gov.in' or 'barrackpore.gov.in'
// Origin: 'https://evil.barrackpore.gov.in' ➔ CANNOT set rp.id to 'bank.barrackpore.gov.in' ❌`
  },
  {
    id: 16,
    question: "What is Passkey Step-Up Authentication in high-value banking transactions?",
    shortAnswer: "Even if a user is already logged in with an active session, triggering a high-value transfer (e.g., ₹5,00,000) prompts a fresh `navigator.credentials.get()` call with a new challenge, demanding a fresh biometric Face ID or fingerprint touch to cryptographically authorize the transfer.",
    explanation: "Step-up passkey verification proves the authorized user is physically present at the moment of fund transfer, defeating session hijacking malware.",
    hint: "Demands a fresh biometric passkey tap to authorize high-value financial disbursements.",
    level: "Basic",
    codeExample: `// Step-Up Transaction Signing:
// User clicks "Transfer ₹5,00,000" -> Server issues Challenge(Tx_ID: 10482) -> Phone prompts Face ID -> Assertion signed.`
  },
  {
    id: 17,
    question: "Why does Passkey deployment reduce enterprise IT Helpdesk operational expenditure by up to 50%?",
    shortAnswer: "Over 40% of all IT helpdesk calls in corporate enterprises are related to forgotten passwords, locked accounts from failed rotations, and broken 2FA authenticators. Passkeys eliminate forgotten passwords entirely, dramatically reducing support ticket volume.",
    explanation: "In an enterprise of 10,000 employees, eliminating password reset tickets saves thousands of engineering hours and millions of rupees annually.",
    hint: "Eliminates password reset and account lockout helpdesk tickets, which represent 40%+ of IT support calls.",
    level: "Basic",
    codeExample: `// Cost Reduction Impact:
// Legacy: 10,000 users * 3 password resets/year * ₹500/ticket = ₹1,50,00,000 support cost
// Passkeys: 0 password reset tickets -> 100% cost elimination ✔`
  },
  {
    id: 18,
    question: "What is an Apple iCloud Keychain Secure Enclave Recovery Key and how does it prevent cloud provider access to passkeys?",
    shortAnswer: "Apple uses a Hardware Security Module (HSM) cluster with Secure Enclave escrow. To recover passkeys on a new device, the user must provide their iCloud password AND their trusted device lock screen passcode. The HSM allows only a limited number of passcode guesses before destroying the recovery key.",
    explanation: "This architecture ensures that Apple engineers have zero mathematical capability to read or extract synced passkeys from iCloud.",
    hint: "HSM escrow cluster enforcing rate-limited passcode verification with zero vendor access.",
    level: "Expert",
    codeExample: `// Cloud HSM Escrow:
// 10 Failed Passcode Guesses ➔ Cloud HSM zeroizes escrow key ➔ Passkey data permanently destroyed.`
  },
  {
    id: 19,
    question: "How does Passkey authentication eliminate Keylogger threats on public workstations?",
    shortAnswer: "Because no passwords, PINs, or credentials are typed into the desktop keyboard. Authentication is performed over Bluetooth to the user's personal smartphone or by tapping a physical YubiKey, leaving hardware and software keyloggers with zero keystrokes to record.",
    explanation: "Keyloggers capture keyboard switch closures; passkeys operate via public-key cryptographic challenge-response protocols.",
    hint: "No credentials are typed on the keyboard; authentication occurs via phone biometrics or hardware touch.",
    level: "Basic",
    codeExample: `// Keylogger Capture:
// User logs in via Passkey QR Code -> Keylogger logs: [EMPTY] -> 0 credentials captured 🛡️`
  },
  {
    id: 20,
    question: "What is WebAuthn Attestation Conveyance Preference (`none`, `indirect`, `direct`, `enterprise`) in passkey registration?",
    shortAnswer: "`none`: Strips all hardware serial identifiers for maximum user privacy (standard consumer default). `direct`: Returns the manufacturer batch attestation certificate (verifies genuine hardware make). `enterprise`: Returns unique hardware serial numbers for corporate fleet management.",
    explanation: "Consumer portals use `none` to prevent user tracking; enterprise banks use `direct` or `enterprise` to enforce certified hardware tokens.",
    hint: "`none` for consumer privacy; `direct`/`enterprise` for verifying certified hardware models.",
    level: "Moderate",
    codeExample: `// Attestation Option:
// attestation: "none"       // Consumer privacy (Default)
// attestation: "enterprise" // Enterprise hardware inventory tracking`
  },
  {
    id: 21,
    question: "How does a passkey resist SIM Swapping and SS7 telecommunication attacks?",
    shortAnswer: "Passkeys have ZERO connection to cellular phone numbers, SMS gateways, or telecom networks. The private key resides inside the device's hardware Secure Enclave and communicates over encrypted IP/Bluetooth, making cellular network breaches completely irrelevant.",
    explanation: "Even if an attacker swaps a user's SIM card, they cannot access the user's passkeys stored in the physical phone hardware.",
    hint: "Passkeys do not use phone numbers or SMS; private keys are stored in hardware chips.",
    level: "Basic",
    codeExample: `// Threat Immunity:
// SIM Swapped ➔ Attacker controls phone number (+91 98300...) ➔ Zero impact on Passkeys stored in phone chip ✔`
  },
  {
    id: 22,
    question: "What is FIDO Device-Bound Passkey enforcement in Microsoft Entra ID or Okta?",
    shortAnswer: "Administrators configure Authentication Strength policies that mandate `authenticatorAttachment: 'cross-platform'` and restrict registration to specific FIPS 140-2 AAGUIDs (e.g., YubiKey 5 FIPS), explicitly rejecting consumer cloud-synced passkeys from personal iCloud/Google accounts.",
    explanation: "This guarantees that corporate private keys never leave physical, enterprise-managed hardware tokens.",
    hint: "Enforces cross-platform YubiKeys with specific AAGUIDs, blocking cloud-synced consumer passkeys.",
    level: "Moderate",
    codeExample: `// Entra ID Policy:
// Policy: "Phishing-Resistant MFA" ➔ Allowed Authenticators: FIDO2 Security Keys (AAGUID Whitelist)`
  },
  {
    id: 23,
    question: "How does Passkey authentication prevent Session Hijacking when paired with Demonstrating Proof-of-Possession (DPoP)?",
    shortAnswer: "Passkey authenticates the user and establishes an access token bound to a client DPoP private key. Every subsequent HTTP API request must include a signed DPoP proof; if malware steals the bearer token, it cannot replay it without possessing the private key.",
    explanation: "Combining WebAuthn for initial login with DPoP for runtime API requests provides end-to-end token binding throughout the entire session lifecycle.",
    hint: "WebAuthn authenticates the login; DPoP binds subsequent API requests to a client private key.",
    level: "Expert",
    codeExample: `// DPoP + Passkey Architecture:
// 1. Passkey Login -> Server issues DPoP-bound JWT.
// 2. Client signs each HTTP request with local DPoP private key -> Stolen tokens cannot be replayed.`
  },
  {
    id: 24,
    question: "What is WebAuthn Resident Key (RK) requirement configuration (`residentKey: 'required'`)?",
    shortAnswer: "Setting `residentKey: 'required'` (or `preferred`) forces the hardware authenticator to store the user handle and private key directly in internal flash memory, enabling username-less login where the user merely touches the key without typing their email.",
    explanation: "If `residentKey: 'discouraged'` is set, the key does not store user metadata, requiring the user to type their username first.",
    hint: "Mandates storing user metadata on the key for true username-less login.",
    level: "Moderate",
    codeExample: `// WebAuthn Creation Options:
// authenticatorSelection: {
//   residentKey: "required", // Stored in hardware memory for username-less login
//   requireResidentKey: true
// }`
  },
  {
    id: 25,
    question: "How does the FIDO Alliance WebAuthn Developer Adoption Dashboard track global passkey readiness?",
    shortAnswer: "It monitors browser support (Chrome, Safari, Edge, Firefox), operating system support (iOS, Android, Windows, macOS), and major consumer platform deployments (Google, Apple, Microsoft, Amazon, WhatsApp), tracking the global phase-out of static passwords.",
    explanation: "As of 2026, over 95% of active consumer web browsers support passkeys natively.",
    hint: "Tracks native browser and OS support across Apple, Google, Microsoft, and Amazon platforms.",
    level: "Basic",
    codeExample: `// Browser Support:
// window.PublicKeyCredential !== undefined ➔ Passkey Supported (99% Global Browser Coverage ✔)`
  },
  {
    id: 26,
    question: "What is a Passkey Downgrade Attack and how do web applications protect against it?",
    shortAnswer: "An attacker who compromises a user's password attempts to bypass passkey security by triggering legacy login forms or clicking 'Log in with password instead'. Applications protect against this by enforcing 'Passkey-Only' mode, disabling password fallback once a passkey is registered.",
    explanation: "Allowing password fallback leaves the account vulnerable to credential stuffing despite passkey enrollment.",
    hint: "Forcing authentication to fall back to passwords; mitigated by enforcing Passkey-Only mode.",
    level: "Moderate",
    codeExample: `// Passkey-Only Enforcement:
if (user.hasPasskeyRegistered) {
    disablePasswordAuthentication();
    enforceWebAuthnOnly();
}`
  },
  {
    id: 27,
    question: "How does Passkey authentication interact with Content Security Policy (CSP) headers?",
    shortAnswer: "WebAuthn execution requires no external third-party JavaScript libraries or inline eval scripts. The native `navigator.credentials` API operates under strict CSP environments (`default-src 'self'`), minimizing XSS and script injection attack surfaces.",
    explanation: "Because WebAuthn is a native browser C++ API, it requires zero external script dependencies.",
    hint: "Native browser API compatible with strict CSP headers without third-party script dependencies.",
    level: "Moderate",
    codeExample: `// Strict CSP Header:
// Content-Security-Policy: default-src 'self'; script-src 'self'; (WebAuthn functions natively ✔)`
  },
  {
    id: 28,
    question: "What is the role of the FIDO Credential Protection Extension (`credProtect`) in CTAP2?",
    shortAnswer: "The `credProtect` extension allows an enterprise Relying Party to specify whether a resident credential can be enumerated (listed) by any client or whether user verification (PIN/Biometric) must be completed before the key reveals the existence of the account.",
    explanation: "Setting `userVerificationRequired` prevents an unauthorized person who plugs in a lost key from discovering what corporate accounts are stored on it.",
    hint: "Prevents a hardware key from revealing account names until user verification PIN is satisfied.",
    level: "Expert",
    codeExample: `// credProtect Extension:
// extensions: {
//   credProtect: 3 // userVerificationRequired (Hidden until PIN is verified)
// }`
  },
  {
    id: 29,
    question: "In a forensic deployment at the Barrackpore municipal treasury, 150 administrative clerks transitioned to synced passkeys on managed corporate iPhones. Why was this approved for municipal operations while being prohibited for root defense databases in Ichapur?",
    shortAnswer: "Municipal treasury clerks operate under managed Apple Business Manager MDM with encrypted iCloud backup, delivering 100% phishing resistance with zero lost-key lockout disruption. Defense systems in Ichapur require air-gapped, zero-cloud compliance, mandating Device-Bound YubiKeys (NIST AAL3) where private keys can never touch any cloud server.",
    explanation: "Security architects balance threat models: consumer/clerk operations benefit from synced passkey recovery; national defense mandates non-exportable hardware isolation.",
    hint: "Clerks benefit from managed cloud recovery; defense requires air-gapped hardware isolation.",
    level: "Expert",
    codeExample: `// Tiered Architecture:
// Municipal Clerks ➔ Synced Passkeys on Managed MDM iPhones (AAL2+ High Usability)
// Defense Root Admins ➔ Non-Exportable YubiKey 5 FIPS Hardware Keys (AAL3 Air-Gapped)`
  },
  {
    id: 30,
    question: "Write out the comprehensive comparison table contrasting Traditional Passwords, SMS OTP 2FA, App-Based TOTP 2FA, and Passwordless Passkeys.",
    shortAnswer: "Passwords: Low security, phishable, high memory burden. SMS OTP: Moderate security, vulnerable to SIM swap & SS7, phishable via AitM. App TOTP: High security, immune to SIM swap, but still phishable via AitM reverse proxies. Passkeys (FIDO2): Highest security (NIST AAL3), 100% phishing immune via origin binding, zero memory burden, instant login.",
    explanation: "Passkeys represent the definitive evolution of digital identity, providing the strongest cryptographic security paired with the simplest user experience.",
    hint: "Passkeys provide the only solution that is simultaneously 100% phishing-immune and frictionless.",
    level: "Expert",
    codeExample: `// Identity Security Hierarchy:
// 1. Passkeys (FIDO2 WebAuthn) : Phishing Immune, Zero Passwords, Single-Tap ✔
// 2. App-Based TOTP (RFC 6238)  : Strong, but phishable via AitM proxies ⚠️
// 3. SMS/Email OTP (Legacy)     : Vulnerable to SIM Swap & SS7 Interception ❌
// 4. Static Passwords (1FA)     : Vulnerable to credential stuffing & GPU cracking ❌`
  }
];

export default questions;
