const questions = [
  {
    id: 1,
    question: "What two core technical specifications constitute the FIDO2 standard framework?",
    shortAnswer: "1. W3C Web Authentication (WebAuthn): The standardized JavaScript browser API; 2. FIDO Client-to-Authenticator Protocol 2 (CTAP2): The protocol enabling browsers to communicate with external hardware authenticators (USB/NFC/BLE) and platform security chips.",
    explanation: "WebAuthn operates at the application/browser layer, while CTAP2 manages low-level binary message framing to physical security keys.",
    hint: "W3C WebAuthn (browser API) + FIDO CTAP2 (hardware communication protocol).",
    level: "Basic",
    codeExample: `// FIDO2 Architecture:
// Web Application → W3C WebAuthn API → Browser → CTAP2 Protocol → Hardware YubiKey`
  },
  {
    id: 2,
    question: "How does FIDO2 WebAuthn achieve 100% Phishing Resistance against Adversary-in-the-Middle (AitM) reverse proxies (Evilginx)?",
    shortAnswer: "Through Cryptographic Origin Binding: The browser verifies the exact domain in the URL bar (e.g., 'https://bank.com') and passes it in clientDataJSON. The hardware key cryptographically signs this origin into the authentication assertion. When relayed to a real bank by a phishing proxy ('https://fake-bank.net'), signature verification fails.",
    explanation: "Because signature creation mathematically incorporates the browser's verified origin, an attacker on a fake domain cannot generate a signature that validates on the legitimate relying party server.",
    hint: "Browser binds the exact domain origin into the cryptographic signature payload.",
    level: "Expert",
    codeExample: `// Origin Binding Verification:
// Browser computes: clientDataHash = SHA256({ "origin": "https://fake-bank.net", ... })
// Hardware signs: Signature = Sign(authenticatorData || clientDataHash)
// Real bank server checks against 'https://realbank.com' → MISMATCH! Assertion Rejected ❌`
  },
  {
    id: 3,
    question: "What is the difference between FIDO U2F (Universal 2nd Factor) and FIDO2?",
    shortAnswer: "U2F was designed strictly as a second factor alongside a static password (Password + Key Tap). FIDO2 supports true single-step passwordless login (Security Key Tap + on-device PIN or Biometric), completely eliminating the need for usernames and passwords.",
    explanation: "FIDO2 introduces Resident Credentials (Discoverable Credentials) stored directly on the hardware key chip.",
    hint: "U2F requires a password first; FIDO2 supports standalone passwordless authentication.",
    level: "Basic",
    codeExample: `// Evolution:
// U2F   : Step 1 = Password → Step 2 = USB Key Tap
// FIDO2 : Single Step = USB Key Tap + Hardware PIN/Biometric (Passwordless ✔)`
  },
  {
    id: 4,
    question: "What cryptographic algorithms are standard in WebAuthn public-key credential generation?",
    shortAnswer: "ES256 (ECDSA over NIST P-256 curve with SHA-256 - alg: -7) and Ed25519 (EdDSA over Curve25519 - alg: -8), along with RS256 (RSA 2048-bit - alg: -257) for legacy enterprise environments.",
    explanation: "Elliptic curve cryptography provides maximum security assurance with compact signature lengths ideal for memory-constrained microcontroller key fobs.",
    hint: "ES256 (ECDSA P-256), Ed25519 (EdDSA), and RS256.",
    level: "Moderate",
    codeExample: `// WebAuthn Algorithm Identifier:
// pubKeyCredParams: [
//   { type: "public-key", alg: -7 }, // ES256 (ECDSA P-256)
//   { type: "public-key", alg: -8 }  // Ed25519
// ]`
  },
  {
    id: 5,
    question: "Explain the two fundamental CTAP2 verification flags: User Presence (UP) vs User Verification (UV).",
    shortAnswer: "User Presence (UP - Bit 0): Proves a human is physically present and interacted with the device (capacitive metal contact touch on the key). User Verification (UV - Bit 2): Proves the specific authorized owner unlocked the device (entering a local hardware PIN or matching on-device fingerprint).",
    explanation: "UP satisfies possession factor proof; UV satisfies multi-factor authentication in a single physical interaction.",
    hint: "UP = Physical touch (presence); UV = Local PIN or biometric verification.",
    level: "Moderate",
    codeExample: `// CTAP2 Flag Byte:
// Bit 0 (0x01) → User Presence (UP) = 1 (Key was physically touched)
// Bit 2 (0x04) → User Verification (UV) = 1 (PIN/Biometric verified on key)`
  },
  {
    id: 6,
    question: "What is a Resident Credential (Discoverable Credential) in FIDO2?",
    shortAnswer: "A Resident Credential is a private key pair and associated user metadata stored permanently inside the flash memory of the hardware security key. During login, the user inserts the key with zero input; the key announces available user accounts to the browser.",
    explanation: "Resident credentials enable true username-less and passwordless login workflows.",
    hint: "Private key and user metadata stored directly in hardware memory for username-less login.",
    level: "Moderate",
    codeExample: `// Discoverable Credential Workflow:
// User visits bank.com → Touches YubiKey → Key transmits [User: susmita@bank.in] + Assertion Signature → Instant Login!`
  },
  {
    id: 7,
    question: "What is the Signature Counter (`signCount`) in WebAuthn and how does it detect cloned hardware authenticators?",
    shortAnswer: "The hardware key increments an internal 32-bit hardware counter on every signature operation. The server records this count. If a login assertion arrives with a `signCount` lower than or equal to the previously recorded count, the server knows a cloned private key is active.",
    explanation: "Hardware security keys cannot be cloned non-destructively; if a rogue software-emulated key is active, signature counter regression alerts the SOC immediately.",
    hint: "Monotonically increasing counter; a lower or equal value indicates a cloned key.",
    level: "Expert",
    codeExample: `// Cloned Key Detection:
// Login 1 : signCount = 42 (Server records 42)
// Login 2 : signCount = 38 (CLONED KEY ALERT! 🚨 Assertion Rejected)`
  },
  {
    id: 8,
    question: "What is WebAuthn Public Key Attestation and what is its purpose during registration?",
    shortAnswer: "Attestation is a cryptographic proof signed by the hardware key manufacturer's factory batch certificate (e.g., Yubico CA), certifying that the public key was generated on a genuine, tamper-resistant hardware security chip rather than a software emulator.",
    explanation: "Enterprise relying parties inspect attestation statements to enforce policies restricting registration strictly to FIPS 140-2 certified hardware keys.",
    hint: "Cryptographic statement from the manufacturer certifying the authenticator is genuine hardware.",
    level: "Expert",
    codeExample: `// Attestation Statement Verification:
// Server verifies X.509 certificate chain up to Yubico Root CA → Validates physical model: 'YubiKey 5 NFC FIPS'`
  },
  {
    id: 9,
    question: "What is the difference between Platform Authenticators and Cross-Platform Authenticators in WebAuthn?",
    shortAnswer: "Platform Authenticators are built directly into the client device hardware (e.g., Windows Hello TPM chip, Apple Touch ID / Face ID Secure Enclave, Android Biometrics). Cross-Platform Authenticators are external, roaming hardware tokens (e.g., USB-A/USB-C YubiKeys, NFC smartcards, Bluetooth fobs).",
    explanation: "Cross-platform keys can be carried between multiple computers; platform authenticators are bound to a single laptop or phone.",
    hint: "Platform = Built-in (Touch ID, Windows Hello); Cross-Platform = External USB/NFC keys (YubiKey).",
    level: "Basic",
    codeExample: `// Authenticator Attachment Option:
// "platform"       : Windows Hello / Apple Touch ID
// "cross-platform" : USB YubiKey 5 NFC / SoloKey`
  },
  {
    id: 10,
    question: "Why does FIDO2 eliminate server-side credential theft in data breaches?",
    shortAnswer: "Because the authentication server stores ONLY public keys and credential IDs. The private cryptographic keys never leave the tamper-resistant hardware security key chip. If the server database is breached via SQL injection, the stolen public keys cannot be used to forge authentication signatures.",
    explanation: "No shared secrets or reversible hashes exist on the server to be cracked offline.",
    hint: "Server holds only public keys; private keys remain permanently locked inside the physical hardware key.",
    level: "Basic",
    codeExample: `// Database Storage:
// [user_id: 101, public_key: "3059301306072a8648ce3d0201...", cred_id: "8f9a2b..."]
// Stolen Public Keys are mathematically useless for impersonation ✔`
  },
  {
    id: 11,
    question: "How does the Relying Party ID (`rp.id`) scoping rule prevent a hardware key from leaking credentials across websites?",
    shortAnswer: "The hardware key partitions its internal key generation by Relying Party ID (domain name). When authenticating to `bank.com`, the key only accesses keys scoped to `bank.com`. If you visit `evil-site.com`, the key generates completely different, uncorrelated keys.",
    explanation: "This prevents cross-site user tracking and ensures that a compromised relying party cannot use credentials against other websites.",
    hint: "Keys are isolated per domain name; credentials on one website cannot be queried by another.",
    level: "Moderate",
    codeExample: `// Domain Scoping:
// rp.id = "bank.barrackpore.gov.in" ➔ Key A (Only accessible by barrackpore.gov.in)
// rp.id = "shopping.in"              ➔ Key B (Completely isolated)`
  },
  {
    id: 12,
    question: "What is a FIDO PIN and how does it defend against a physically stolen hardware key?",
    shortAnswer: "The FIDO PIN is a local alphanumeric code entered into the client machine to unlock the hardware key. The PIN is verified locally inside the key's microcontroller over CTAP2 and is never transmitted over the internet.",
    explanation: "If an adversary steals your physical YubiKey, they cannot authenticate without knowing the local PIN, and the key permanently locks after 8 failed attempts.",
    hint: "Local hardware unlock code verified on the key; locks permanently after 8 failed attempts.",
    level: "Basic",
    codeExample: `// PIN Protection:
// Failed Attempts: 1/8 → 2/8 → ... → 8/8 ➔ Key hardware locks and zeroizes credentials!`
  },
  {
    id: 13,
    question: "What is CTAP2 ClientPIN protocol and how does it prevent keyloggers from capturing the PIN over USB?",
    shortAnswer: "The browser and security key establish an ephemeral Elliptic Curve Diffie-Hellman (ECDH) key exchange over the USB bus, creating an encrypted shared AES-256 session key. The PIN hash is transmitted across the USB cable fully encrypted.",
    explanation: "Even if an attacker attaches a hardware USB bus sniffer, they capture only encrypted ephemeral packets.",
    hint: "Uses ECDH key exchange to encrypt the PIN across the USB bus before transmission.",
    level: "Expert",
    codeExample: `// ClientPIN Encryption:
// Browser & YubiKey → ECDH P-256 Key Agreement → AES-256-CBC Encrypted PIN Token → Secure USB Transport ✔`
  },
  {
    id: 14,
    question: "What is an Authenticator Attestation GUID (AAGUID)?",
    shortAnswer: "The AAGUID is a 16-byte identifier in the authenticatorData structure that identifies the exact make and model of the hardware authenticator (e.g., Yubico YubiKey 5 NFC vs Feitian ePass FIDO2).",
    explanation: "Enterprise security teams inspect the AAGUID to enforce policy compliance, restricting employee logins strictly to approved corporate hardware models.",
    hint: "16-byte identifier indicating the exact manufacturer and model of the security key.",
    level: "Moderate",
    codeExample: `// AAGUID Examples:
// YubiKey 5 NFC   : "ee882879-721c-4916-ad92-e030d6ec18ca"
// Windows Hello   : "08987058-cadc-4b81-b6e1-30c504b9be3b"`
  },
  {
    id: 15,
    question: "How does WebAuthn handle User Account Recovery if an employee loses their physical security key?",
    shortAnswer: "Enterprises enforce multi-key registration (enrolling at least two physical security keys: a primary key and a backup stored in a safe), enterprise-managed Passkey escrow, or administrator-supervised recovery workflows requiring identity re-verification.",
    explanation: "Because FIDO2 private keys cannot be extracted from hardware, recovery requires revoking the old public key on the server and registering a new key.",
    hint: "Enrolling a primary and backup key; lost keys are revoked and new keys registered on the server.",
    level: "Moderate",
    codeExample: `// Recovery Strategy:
// User Profile:
// Keys Registered: [ "YubiKey_Primary (Active)", "YubiKey_Backup_Home (Active)" ]
// If Primary lost → Revoke Primary key ID on server, authenticate with Backup key.`
  },
  {
    id: 16,
    question: "What is the `clientDataJSON` structure in WebAuthn and what critical fields does it contain?",
    shortAnswer: "`clientDataJSON` is a UTF-8 JSON string constructed by the browser containing: `type` ('webauthn.create' or 'webauthn.get'), `challenge` (Base64URL challenge from server), `origin` (verified browser origin e.g. 'https://bank.in'), and `crossOrigin` boolean.",
    explanation: "The cryptographic signature is computed over the SHA-256 hash of this exact JSON string.",
    hint: "JSON containing the operation type, server challenge, and verified browser domain origin.",
    level: "Moderate",
    codeExample: `// clientDataJSON Anatomy:
// {
//   "type": "webauthn.get",
//   "challenge": "a9f3b7c2...",
//   "origin": "https://bank.barrackpore.gov.in",
//   "crossOrigin": false
// }`
  },
  {
    id: 17,
    question: "Why does NIST SP 800-63B assign FIDO2 hardware keys the highest Authenticator Assurance Level (AAL3)?",
    shortAnswer: "Because FIDO2 satisfies all three AAL3 criteria: 1. Hardware-backed cryptographic keys isolated from the host OS; 2. Mandatory origin-bound verification immune to Adversary-in-the-Middle (AitM) phishing; 3. Mandatory physical user presence touch.",
    explanation: "No other commodity authentication technology matches the cryptographic resistance of FIDO2 hardware tokens.",
    hint: "Combines hardware key isolation, cryptographic origin binding, and physical presence verification.",
    level: "Basic",
    codeExample: `// NIST AAL3 Compliance:
// Hardware Private Key + Cryptographic Origin Binding + Touch Proof = AAL3 Phishing Resistant ✔`
  },
  {
    id: 18,
    question: "What is WebAuthn Conditional UI (Passkey Autofill)?",
    shortAnswer: "Conditional UI allows the browser to show saved passkeys directly inside standard HTML username autocomplete dropdowns (`autocomplete='username webauthn'`). When the user clicks their name, the browser immediately requests a hardware touch or fingerprint to log in with zero typing.",
    explanation: "This integrates passwordless WebAuthn seamlessly into traditional login forms.",
    hint: "Shows passkeys inside standard username input autocomplete dropdowns.",
    level: "Moderate",
    codeExample: `// HTML Markup:
// <input type="text" name="username" autocomplete="username webauthn" />`
  },
  {
    id: 19,
    question: "How does FIDO2 protect against malware on the host PC attempting to execute silent background logins?",
    shortAnswer: "The hardware key requires a physical capacitive contact touch (User Presence) for every single cryptographic assertion. Malware running silently in the background cannot physically touch the metal sensor on the USB key.",
    explanation: "Without physical human contact, the hardware key refuses to compute the signature, thwarting automated background botnets.",
    hint: "Requires physical touch on the metal contact; background malware cannot touch the key.",
    level: "Basic",
    codeExample: `// Physical Touch Barrier:
// Malware triggers API → YubiKey LED blinks → Waits for human finger → Timeout after 15s → Assertion Fails! 🛡️`
  },
  {
    id: 20,
    question: "What is Enterprise Attestation in FIDO2 and how does it support corporate fleet management?",
    shortAnswer: "Enterprise Attestation is a specialized mode where the hardware key transmits its unique hardware serial number during registration to corporate MDM/IAM servers, allowing enterprise administrators to enforce device inventory binding.",
    explanation: "To preserve consumer privacy, standard FIDO2 uses anonymized batch attestation, while enterprise attestation is restricted to managed corporate domains.",
    hint: "Transmits hardware serial numbers to corporate MDM for strict device inventory tracking.",
    level: "Expert",
    codeExample: `// Enterprise Attestation:
// attestation: "enterprise" ➔ Returns unique device serial: 'YUBIKEY-SN-10948291'`
  },
  {
    id: 21,
    question: "What is FIDO2 WebAuthn Large Blob Storage (`largeBlob` extension)?",
    shortAnswer: "The `largeBlob` extension allows web applications to store arbitrary encrypted data (e.g., an encrypted SSH private key, recovery seeds, or client certificates) directly on the physical hardware key's flash memory.",
    explanation: "The data is encrypted using a key derived from the WebAuthn credential and can only be read after successful user verification.",
    hint: "Allows storing encrypted files (like SSH keys) directly in the hardware key's memory.",
    level: "Expert",
    codeExample: `// Large Blob Usage:
// Encrypts SSH Private Key → Writes to YubiKey flash memory → Decrypted only upon physical key touch.`
  },
  {
    id: 22,
    question: "How does WebAuthn handle Cross-Origin IFrames and what permission policy is required?",
    shortAnswer: "By default, WebAuthn is blocked inside IFrames to prevent clickjacking and credential harvesting. To permit WebAuthn inside an embedded iframe (e.g., a payment widget), the parent page must explicitly declare: `allow='publickey-credentials-get'`.",
    explanation: "This ensures third-party advertisers cannot trigger authentication prompts silently.",
    hint: "Requires explicit iframe permission: allow='publickey-credentials-get'.",
    level: "Moderate",
    codeExample: `// Secure IFrame Declaration:
// <iframe src="https://pay.barrackpore.bank.in" allow="publickey-credentials-get"></iframe>`
  },
  {
    id: 23,
    question: "What is the CBOR (Concise Binary Object Representation) format in CTAP2 and why is it used instead of JSON?",
    shortAnswer: "CBOR (RFC 8949) is a binary data serialization format designed for small code size and minimal memory parsing footprints on embedded 8-bit and 32-bit microcontrollers found in hardware USB keys.",
    explanation: "Parsing bulky text-based JSON strings on low-power cryptographic smartcard chips with limited RAM would cause performance bottlenecks and memory overflow vulnerabilities.",
    hint: "Compact binary serialization format optimized for low-power microcontroller chips.",
    level: "Moderate",
    codeExample: `// JSON vs CBOR:
// JSON : { "cmd": 1, "data": "hex" } (30 bytes text)
// CBOR : \\xa2\\x01\\x01\\x02\\x43\\x01\\x02\\x03 (8 bytes binary stream)`
  },
  {
    id: 24,
    question: "How do YubiKey 5 Series keys combine FIDO2 with legacy OTP and Smart Card (PIV) applets on a single physical chip?",
    shortAnswer: "YubiKeys run multiple independent cryptographic applets inside a secure microcontroller: 1. FIDO2 / WebAuthn applet; 2. FIDO U2F applet; 3. Yubico OTP applet; 4. CCID Smart Card (PIV - PKCS#11) applet for Windows Smart Card login; 5. OpenPGP applet.",
    explanation: "This allows a single physical USB key to support modern web browser passkeys, legacy terminal SSH, and Windows Active Directory workstation smartcard logon.",
    hint: "Runs independent applets on a single secure chip supporting FIDO2, PIV Smartcard, and OpenPGP.",
    level: "Moderate",
    codeExample: `// YubiKey Multi-Protocol Architecture:
// USB Interface → [Secure Enclave Controller] → { FIDO2, PIV SmartCard, OpenPGP, Yubico OTP }`
  },
  {
    id: 25,
    question: "What is a FIDO Device Onboarding (FDO) protocol in IoT and industrial systems?",
    shortAnswer: "FDO is an automated zero-touch onboarding specification that allows headless edge IoT devices and industrial controllers to automatically authenticate and securely configure themselves onto cloud management platforms without human credential entry.",
    explanation: "FDO uses public-key cryptography burned into device silicon during manufacturing to automate secure zero-trust onboarding.",
    hint: "Zero-touch automated onboarding protocol for headless IoT devices using silicon keys.",
    level: "Expert",
    codeExample: `// FDO Workflow:
// Unbox IoT Sensor → Connect Power → Sensor authenticates to cloud using factory silicon key → Automatically provisions.`
  },
  {
    id: 26,
    question: "What is the difference between Synchronized Passkeys and Device-Bound Passkeys in enterprise security policy?",
    shortAnswer: "Synchronized passkeys replicate across a user's cloud keychain (iCloud / Google Password Manager) for consumer convenience. Device-Bound passkeys (enforced via `authenticatorAttachment='cross-platform'` on YubiKeys) are non-exportable hardware keys whose private keys can never leave the physical USB chip.",
    explanation: "High-security financial and government institutions strictly enforce Device-Bound passkeys to eliminate cloud account compromise risks.",
    hint: "Synced passkeys replicate across cloud keychains; Device-Bound passkeys are locked to physical hardware.",
    level: "Moderate",
    codeExample: `// Enterprise Policy:
// Ban Synced Passkeys ➔ Require: authenticatorAttachment = "cross-platform" + FIPS Certified AAGUID.`
  },
  {
    id: 27,
    question: "Why does WebAuthn eliminate Credential Stuffing and Password Spraying attacks entirely?",
    shortAnswer: "Because there are no passwords or shared secrets in WebAuthn. Attackers cannot guess or spray credentials because every authentication requires a unique asymmetric cryptographic signature generated by a physical hardware private key.",
    explanation: "Automated credential lists (like `rockyou.txt`) are completely useless against public-key cryptography.",
    hint: "No shared secrets or passwords exist to be sprayed or stuffed by automated botnets.",
    level: "Basic",
    codeExample: `// Defense Outcome:
// Credential Stuffing Botnet tests 10,000,000 passwords → FIDO2 endpoint requires cryptographic signature → 0% attack success ✔`
  },
  {
    id: 28,
    question: "How does FIDO2 WebAuthn handle User Verification (UV) fallback when biometric sensors fail?",
    shortAnswer: "If an on-device fingerprint or facial sensor fails (e.g., due to a cut on a finger), the hardware key falls back locally to the hardware FIDO PIN. The PIN is evaluated on the key itself, preserving the multi-factor assurance level.",
    explanation: "Local fallback maintains accessibility without compromising security or reverting to weak SMS/email OTP.",
    hint: "Falls back to local hardware PIN evaluated on the key chip itself.",
    level: "Basic",
    codeExample: `// Biometric Failure Fallback:
// Fingerprint scan failed → Prompt: "Enter 6-digit FIDO PIN on your security key" → PIN verified on chip.`
  },
  {
    id: 29,
    question: "In a penetration test against a banking portal in Barrackpore, an adversary deployed Evilginx2 with a reverse-proxy domain `bank.barrackpore-fake.in`. Why did the login attempt fail when the user touched their YubiKey?",
    shortAnswer: "The browser constructed the `clientDataJSON` containing `origin: 'https://bank.barrackpore-fake.in'`. The YubiKey signed this payload with its private key. When Evilginx forwarded this signed assertion to the real banking server (`https://bank.barrackpore.gov.in`), the real server checked the origin against its expected identity, detected the cryptographic mismatch, and instantly rejected the assertion.",
    explanation: "Origin binding is mathematically enforced by public-key cryptography, making reverse-proxy phishing impossible.",
    hint: "The browser included the fake domain in the signature payload, causing verification to fail on the real server.",
    level: "Expert",
    codeExample: `// Phishing Neutralization:
// 1. Evilginx proxies traffic on fake domain.
// 2. YubiKey signs hash of fake domain origin.
// 3. Real server verifies: Expecting 'bank.barrackpore.gov.in', Got 'bank.barrackpore-fake.in' → SIGNATURE REJECTED 🚨`
  },
  {
    id: 30,
    question: "What is the comprehensive deployment blueprint for transitioning an enterprise workforce of 5,000 employees from passwords to FIDO2 hardware keys?",
    shortAnswer: "1. Distribute two FIPS 140-2 certified FIDO2 hardware keys (Primary + Backup) per employee. 2. Configure IDP (Okta / Entra ID) to enforce WebAuthn with mandatory User Verification (PIN/Biometric). 3. Restrict attestation to corporate YubiKey AAGUIDs. 4. Deactivate password and SMS OTP fallback channels. 5. Integrate FIDO2 for workstation OS login (Windows Hello / PAM) and SSH terminal authentication.",
    explanation: "Following this blueprint achieves complete end-to-end phishing resistance (NIST AAL3) across all enterprise assets.",
    hint: "Distribute dual hardware keys, enforce WebAuthn with user verification, restrict AAGUIDs, and eliminate legacy fallback.",
    level: "Expert",
    codeExample: `// Enterprise FIDO2 Blueprint:
// Phase 1: Dual Key Enrollment (Primary + Backup)
// Phase 2: Enforce WebAuthn AAL3 policy across all IDP apps
// Phase 3: Total deprecation of SMS, Email OTP, and static passwords.`
  }
];

export default questions;
