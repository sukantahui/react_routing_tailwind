// topic8_questions.js
// 30 Moderate to Expert Questions on Balancing Security Controls with Usability

const questions = [
  {
    question: "What is the primary trade-off represented by the Security vs. Usability dilemma?",
    shortAnswer: "As security controls become more restrictive and complex, user friction, cognitive load, and operational delays increase, often driving users toward insecure workarounds.",
    explanation: "Security and usability frequently exist in tension. When security mechanisms impose excessive friction (such as demanding frequent complex password rotations or redundant multi-step verifications for low-risk actions), users experience security fatigue, resulting in reduced compliance and the emergence of Shadow IT.",
    hint: "Think about what happens when authentication barriers become too tedious for daily work.",
    level: "moderate",
    codeExample: "// Security Friction Index Formula\nFrictionIndex = (AuthSteps * StepLatencyMs) + CognitiveLoadFactor;"
  },
  {
    question: "What is 'Security Fatigue' and how does it manifest in enterprise environments?",
    shortAnswer: "Security fatigue is a state of cognitive burnout and helplessness where users become overwhelmed by constant security prompts, leading to habitual bypass behaviors.",
    explanation: "Security fatigue occurs when users face unrelenting security demands, such as frequent password resets, complex approval queues, or repeated 2FA prompts. It manifests in blind approval of MFA push notifications (MFA fatigue attacks), sticky-note password storage, and adopting unauthorized cloud collaboration tools.",
    hint: "Consider mental exhaustion from answering too many security popups and login prompts.",
    level: "moderate",
    codeExample: "if (dailyPrompts > 25) {\n  userBehavior = 'AutoApprove_All_Prompts';\n}"
  },
  {
    question: "Why does NIST SP 800-63B explicitly advise against mandatory periodic password changes (e.g., every 90 days) without evidence of compromise?",
    shortAnswer: "Forced frequent password rotations cause users to adopt predictable pattern shifts (e.g., Winter2025! → Spring2025!), significantly weakening cryptographic entropy.",
    explanation: "Empirical studies proved that when forced to change passwords every 30 to 90 days, users do not create stronger passwords; instead, they make predictable incremental transformations to existing passwords, choose shorter strings, or write them down, yielding weaker overall organizational security.",
    hint: "Think about human cognitive limitations when forced to memorize a new complex string every quarter.",
    level: "expert",
    codeExample: "// Predictable transformation anti-pattern\n'Kolkata#2025' → 'Kolkata#2026' → 'Kolkata#2027!'"
  },
  {
    question: "How does 'Shadow IT' emerge as a direct consequence of poor security usability?",
    shortAnswer: "When sanctioned corporate tools impose severe delays or restrictive friction, employees adopt unauthorized third-party apps to complete their job duties efficiently.",
    explanation: "If an engineer in Barrackpore cannot transfer large debugging logs to a peer in Ichapur due to restrictive 5 MB email limits and cumbersome VPN hurdles, they may turn to unauthorized personal cloud drives or messaging channels. This creates unmonitored data repositories outside enterprise DLP controls.",
    hint: "Think about unauthorized tools employees use simply to get their daily work done faster.",
    level: "moderate",
    codeExample: "// Unsanctioned data bypass\ncurl -X POST https://personal-drive.io/upload -F 'file=@hospital_patient_data.csv'"
  },
  {
    question: "What is Risk-Based Adaptive Authentication (Context-Aware Access) and how does it optimize usability?",
    shortAnswer: "It dynamically adjusts authentication challenges based on contextual risk signals (IP geolocation, device posture, behavioral biometrics), minimizing friction for low-risk logins.",
    explanation: "Rather than subjecting every user to rigid multi-step verification for every login, adaptive authentication calculates a real-time risk score. A recognized user on a managed corporate laptop inside the Kolkata office gets seamless Single Sign-On (zero friction), while an unrecognized login from an overseas IP triggers biometric MFA and step-up verification.",
    hint: "Consider invisible verification when contextual signals match safe enterprise baselines.",
    level: "expert",
    codeExample: "const riskScore = evaluateContext({ geoIP, deviceHealth, timeOfDay, userVelocity });\nif (riskScore < 0.2) grantAccess(); else requestStepUpMFA();"
  },
  {
    question: "How do FIDO2 / WebAuthn Passkeys solve both the security and usability flaws of legacy passwords?",
    shortAnswer: "Passkeys replace memorized secrets with asymmetric cryptography bound to device biometrics, eliminating phishing while enabling instant, single-touch logins.",
    explanation: "Passkeys use public-key cryptography where the private key never leaves the user's hardware authenticator (e.g., Secure Enclave or TPM). The user simply touches a fingerprint sensor or uses Face ID. It is cryptographically immune to credential stuffing, phishing, and server database breaches while offering 1-second sign-in speeds.",
    hint: "Think about public-key cryptography combined with native device fingerprint/face unlock.",
    level: "expert",
    codeExample: "const credential = await navigator.credentials.create({\n  publicKey: {\n    challenge: serverChallenge,\n    rp: { name: 'Kolkata FinTech Portal' },\n    user: { id: userId, name: 'mamata@fintech.in' },\n    pubKeyCredParams: [{ alg: -7, type: 'public-key' }]\n  }\n});"
  },
  {
    question: "What is the 'Security-Usability Trilemma' (also known as the CIA-UX tradeoff)?",
    shortAnswer: "The conceptual model asserting that maximizing security, usability, and functionality simultaneously is challenging, requiring deliberate architectural trade-offs.",
    explanation: "In software and system design, increasing security often degrades convenience or feature velocity. World-class engineering does not treat security and usability as zero-sum; instead, it leverages modern technologies (like automated PKI and SSO) to push the efficiency frontier outward.",
    hint: "Think of balancing security strength, user convenience, and feature capabilities.",
    level: "moderate",
    codeExample: "// Trilemma balance equation\nSystemQuality = (SecurityWeight * S) + (UsabilityWeight * U) + (FeatureWeight * F);"
  },
  {
    question: "What is Single Sign-On (SSO) and how does it enhance both enterprise security and usability?",
    shortAnswer: "SSO allows a user to authenticate once using a centralized Identity Provider (IdP) and gain access to multiple independent applications without re-entering credentials.",
    explanation: "By reducing dozens of passwords down to a single master authentication event protected by robust MFA and adaptive conditional access, SSO eliminates password fatigue, drastically cuts helpdesk reset requests, and allows security teams to instantly revoke access enterprise-wide with one click.",
    hint: "Think of a master identity pass that unlocks all authorized workplace apps.",
    level: "moderate",
    codeExample: "// SAML 2.0 / OIDC Flow\nUser → App → Redirects to IdP → Authenticates with MFA → Returns JWT/Assertion → App grants session"
  },
  {
    question: "What is 'MFA Fatigue' (Push Notification Bombing) and how do usability enhancements prevent it?",
    shortAnswer: "An attack where adversaries flood a user with repeated push notifications until they approve out of frustration; prevented using Number Matching challenges.",
    explanation: "When attackers obtain valid passwords, they trigger dozens of MFA push prompts at night until an exhausted employee in Jadavpur hits 'Approve'. Modern usability fixes replace simple 'Approve/Deny' buttons with 'Number Matching', requiring the user to type a 2-digit number displayed on the login screen into their authenticator app.",
    hint: "Think about requiring the user to enter the specific two digits shown on their browser screen.",
    level: "expert",
    codeExample: "// MFA Number Matching Challenge\nBrowser: 'Enter code 47 on your mobile app'\nMobile App: [ Input: 47 ] → Verified"
  },
  {
    question: "How does the principle of 'Default Opt-Out vs Default Opt-In' influence security usability?",
    shortAnswer: "Secure-by-default configurations protect users automatically without requiring proactive technical configuration or deep security expertise.",
    explanation: "If strong encryption, automatic screen timeouts, and multi-factor authentication are enabled by default, everyday users are protected without needing to navigate complex preference menus. Opt-in security features are rarely adopted by non-technical staff.",
    hint: "Consider making the most secure path the default, effortless path for every user.",
    level: "moderate",
    codeExample: "const systemDefaults = {\n  encryptionAtRest: true, // Secure by default\n  mfaEnforced: true,\n  sessionTimeoutMins: 15\n};"
  },
  {
    question: "What is 'Cognitive Friction' in security interface design?",
    shortAnswer: "The mental effort and hesitation experienced by users when encountering ambiguous, alarming, or technical jargon in security dialogues.",
    explanation: "When a browser displays a cryptic certificate warning like 'ERR_SSL_VERSION_OR_CIPHER_MISMATCH' or a system warning asks about 'revoking unmanaged ACLs', non-technical users cannot make informed decisions. They either dismiss the warning blindly or freeze, harming productivity and safety.",
    hint: "Think about confusing technical warning dialogs that users click past without reading.",
    level: "moderate",
    codeExample: "// Poor vs Good Warning\nBad: 'X.509 CRL delta validation failed: Code 0x80092013'\nGood: 'This website is not verified. Entering financial data here puts your account at risk.'"
  },
  {
    question: "How can enterprise security teams measure 'Security Usability' quantitatively?",
    shortAnswer: "By tracking System Usability Scale (SUS) scores for security tools, Task Completion Time (TCT), helpdesk ticket volume, and Shadow IT discovery rates.",
    explanation: "Quantitative usability metrics include: 1) Average login latency (seconds), 2) Monthly password reset tickets (and direct costs in ₹), 3) Policy non-compliance rates, 4) SUS survey scores for internal security portals, and 5) Drop-off rates during multi-step customer checkout journeys.",
    hint: "Look for metrics like time spent logging in, helpdesk support costs, and user satisfaction surveys.",
    level: "expert",
    codeExample: "MonthlyResetCostINR = (TotalResetTickets * AverageAgentTimeMins * HourlyRateINR) / 60;"
  },
  {
    question: "In hospital ICU environments (such as Ichapur General Hospital), why can strict 2-minute workstation screen lockouts cause life-threatening risks?",
    shortAnswer: "Doctors and nurses attending cardiac arrests cannot afford delays typing 16-character passwords; they require rapid proximity badges or single-tap tap-in/tap-out smartcards.",
    explanation: "In critical care emergency wards, an unresponsive terminal during a cardiac code blue can delay defibrillation or drug dosage lookups. Imposing generic office timeout policies leads staff to prop open doors or insert key-press jiggler devices. High-usability RFID proximity cards with instant workstation switching solve this safely.",
    hint: "Think about emergency healthcare scenarios where 10-second password delays cost lives.",
    level: "expert",
    codeExample: "// Fast Healthcare Interoperability Access\nonBadgeProximityDetected(doctorBadgeId) => unlockTerminal(150ms);"
  },
  {
    question: "What is 'Fitts's Law' and how does it apply to secure interface design?",
    shortAnswer: "Fitts's law models target acquisition time; in security UI, primary safe actions should be large and easily clickable, while dangerous actions require deliberate effort.",
    explanation: "Fitts's Law states that the time required to rapidly move to a target area is a function of target distance and size. In phishing warnings or dangerous settings, the safe button ('Take Me Back to Safety') should be prominent and large, while the dangerous bypass button ('Proceed Anyway') should be smaller and visually subdued.",
    hint: "Consider making the safe choice visually obvious and effortless to click.",
    level: "moderate",
    codeExample: "<button className='p-4 bg-emerald-600 text-lg w-full'>Back to Safety</button>\n<a className='text-xs text-gray-500 mt-4'>Advanced: proceed to unverified site</a>"
  },
  {
    question: "Why is 'Just-in-Time' (JIT) Privileged Access Management (PAM) superior to permanent standing admin privileges in terms of usability?",
    shortAnswer: "JIT PAM provides engineers temporary elevated credentials only when actively needed for a specific task, reducing standing attack surfaces without permanent administrative overhead.",
    explanation: "Instead of granting permanent domain admin rights that require constant audit checks, an engineer in Barrackpore requests elevated access for 60 minutes via an automated Slack or Teams workflow. Once approved, temporary credentials auto-expire, keeping daily workflows clean and systems secure.",
    hint: "Think about temporary, automated privilege escalation that expires automatically.",
    level: "expert",
    codeExample: "POST /api/jit-grant { role: 'DB_Admin', duration: '45m', ticket: 'INC-9042', approver: 'Debangshu' }"
  },
  {
    question: "How does Password Manager auto-fill improve both security entropy and user convenience?",
    shortAnswer: "Password managers generate 24+ character random strings that users never need to memorize, auto-filling credentials only on authentic domain names.",
    explanation: "Password managers eliminate the cognitive load of memorizing credentials, enabling the use of maximum-entropy unique passwords across thousands of services. Furthermore, they protect against phishing by refusing to auto-fill on spoofed domain names (e.g., bank-kolkata.com vs bank-kolkata.co.in).",
    hint: "Think about software that creates strong random keys and checks domain authenticity automatically.",
    level: "moderate",
    codeExample: "GeneratedPassword: crypto.randomBytes(18).toString('base64'); // 24 chars, 140 bits entropy"
  },
  {
    question: "What is 'Security by Obscurity' and why does it fail usability and security standards alike?",
    shortAnswer: "Relying on keeping implementation details or non-standard ports secret rather than proven cryptographic controls, creating false confidence and fragile workflows.",
    explanation: "Hiding SSH on port 2222 or renaming files to avoid inspection provides negligible protection against automated port scanners while complicating legitimate monitoring, troubleshooting, and documentation for internal engineering teams.",
    hint: "Consider the mistake of hiding keys under the doormat instead of using a certified lock.",
    level: "basic",
    codeExample: "// Antipattern: Security by obscurity\nconst adminPortalUrl = '/super-hidden-secret-admin-page-xyz'; // Easily found in JS bundle"
  },
  {
    question: "How does 'Zero Trust Network Access' (ZTNA) provide a more usable experience than legacy full-tunnel VPNs?",
    shortAnswer: "ZTNA connects users directly and transparently to specific authorized applications over HTTPS without requiring clunky desktop VPN clients or slow routing backhauls.",
    explanation: "Legacy VPNs require users to launch dedicated client software, enter 2FA tokens, and route all household internet traffic through a distant corporate datacenter, degrading video calls. ZTNA operates seamlessly at the application layer, authenticating per-request in the background.",
    hint: "Think about direct application access via reverse proxies without launching a heavy VPN tunnel.",
    level: "expert",
    codeExample: "// ZTNA edge policy evaluation\nif (DevicePosture.isEncrypted && User.isAuthorizedForApp('FinTech-Ledger')) {\n  proxyDirectToApp();\n}"
  },
  {
    question: "What is 'Nudge Theory' in behavioral cyber security?",
    shortAnswer: "Designing system choices and visual prompts to subtly guide users toward secure behaviors without restricting their operational freedom.",
    explanation: "Rather than blocking actions with hard stops that frustrate users, nudge theory uses visual indicators, default pre-selections, and timely reminders (e.g., showing a strength meter that turns green when passphrases exceed 16 characters or warning '3 recipients are outside your organisation').",
    hint: "Think about gentle visual guidance that encourages safe decisions naturally.",
    level: "moderate",
    codeExample: "<span className={clsx(isExternalRecipient ? 'text-amber-400 font-semibold' : 'text-gray-400')}>\n  ⚠️ 2 external recipients in this email\n</span>"
  },
  {
    question: "Why is 'Blameless Post-Mortem' culture critical to improving security usability?",
    shortAnswer: "Focusing on underlying system flaws rather than punishing individuals encourages transparent incident reporting, revealing where security UX failed.",
    explanation: "If an employee in Kolkata is fired for clicking a phishing link, staff will hide future errors and security compromises. A blameless post-mortem asks: 'Why was our email filter unable to catch this payload?' and 'Why did our UI fail to highlight the forged sender domain?'",
    hint: "Consider treating human errors as symptoms of broken UI/UX systems rather than personal negligence.",
    level: "moderate",
    codeExample: "// Incident review action item\nActionItem = 'Implement email external banner tag' NOT 'Reprimand Susmita';"
  },
  {
    question: "What role does 'Single Point of Failure' (SPoF) play when balancing usability in central identity systems?",
    shortAnswer: "Centralizing authentication (e.g., Okta, Azure AD) provides massive usability gains but concentrates systemic risk if the identity provider suffers an outage.",
    explanation: "While SSO makes logging into 50 SaaS tools effortless, an outage or compromise of the central IdP paralyzes the entire enterprise. Usability must be balanced with disaster recovery plans, emergency break-glass accounts, and multi-region IdP redundancy.",
    hint: "Think about what happens to all corporate systems when the central login server goes offline.",
    level: "expert",
    codeExample: "const breakGlassAccount = {\n  username: 'emergency_admin_kolkata',\n  storedInHardwareVault: true,\n  monitoredBySOC: true\n};"
  },
  {
    question: "How do 'Passphrases' (e.g., 'correct-horse-battery-staple') provide superior security and usability over short complex passwords?",
    shortAnswer: "Passphrases deliver massive cryptographic entropy through length while remaining easy for human memory to retain and type without errors.",
    explanation: "A 4-word passphrase like 'mango-barrackpore-train-river' possesses ~52 bits of entropy and is effortless to type on mobile keyboards. In contrast, 'Tr#8$k9!' has only ~38 bits of entropy, is difficult to remember, and triggers constant typo lockouts.",
    hint: "Think of combining 4 to 5 common random words instead of scrambling 8 unreadable characters.",
    level: "moderate",
    codeExample: "// Entropy comparison\n'P@$$w0rd1' → ~32 bits entropy (hard to type, cracked in seconds)\n'jadavpur-bengal-river-metro' → ~60 bits entropy (easy to type, impossible to crack)"
  },
  {
    question: "What is 'Usable Cryptography' and why is PGP/GPG often cited as its historic failure?",
    shortAnswer: "Usable cryptography ensures encryption tools are intuitive for non-experts; classic PGP failed because key management and web-of-trust models were bewildering to ordinary users.",
    explanation: "In 1999, the landmark study 'Why Johnny Can't Encrypt' proved that even technical users failed to correctly sign and encrypt emails using PGP without leaking secrets. Modern usable cryptography (like Signal's Double Ratchet or WhatsApp E2EE) automates key exchange entirely in the background.",
    hint: "Consider how early email encryption required manual public/private key exchanges that confused everyone.",
    level: "expert",
    codeExample: "// Automated vs Manual Key Exchange\nSignal: autoPerformDiffieHellmanHandshake(); // 0 user effort\nPGP 1995: manualExportAsciiArmorKeyringImport(); // 95% user error rate"
  },
  {
    question: "How does 'Privilege Creep' occur and how do automated access reviews solve it without hurting worker velocity?",
    shortAnswer: "Employees accumulate permissions as they change projects over time; automated periodic recertification revokes stale access while keeping active permissions seamless.",
    explanation: "When Debangshu moves from the Barrackpore blast furnace team to software DevOps, his old SCADA access remains active if not revoked. Identity Governance and Administration (IGA) tools prompt managers with simple 1-click quarterly approval workflows to revoke unneeded roles.",
    hint: "Think of an employee collecting keys to every room they ever worked in over 10 years.",
    level: "moderate",
    codeExample: "// Automated Access Expiration\nif (lastLoginTime > 90_DAYS && !managerConfirmed(accessId)) {\n  revokeEntitlement(accessId);\n}"
  },
  {
    question: "What is the psychological impact of 'False Positive Fatigue' in developer security tooling (SAST/DAST)?",
    shortAnswer: "Flooding developers with non-exploitable alerts causes them to silence or ignore security scanners entirely, allowing genuine critical bugs into production.",
    explanation: "If a Static Application Security Testing (SAST) tool flags 500 benign warnings on a Kolkata FinTech codebase, developers will disable the CI/CD blocking gate or run automated dismiss scripts. Security teams must tune scanners to prioritize high-confidence, exploitable vulnerabilities.",
    hint: "Think about the 'Boy Who Cried Wolf' effect when code scanners report hundreds of fake bugs.",
    level: "expert",
    codeExample: "// CI/CD Gate Tuning\nif (vuln.confidence === 'HIGH' && vuln.severity === 'CRITICAL' && vuln.isReachable) {\n  blockBuildPipeline();\n}"
  },
  {
    question: "How can security policies support Bring Your Own Device (BYOD) workers without violating personal privacy?",
    shortAnswer: "Using Mobile Application Management (MAM) or containerization to separate and wipe corporate data without accessing the employee's personal photos or messages.",
    explanation: "Full Mobile Device Management (MDM) allows corporate admins to factory-reset an employee's personal phone or track GPS location, sparking intense user pushback. MAM isolates corporate apps (Outlook, Teams) into an encrypted sandbox, allowing remote enterprise wipes while leaving personal data untouched.",
    hint: "Think about creating an encrypted work container on a personal smartphone.",
    level: "moderate",
    codeExample: "// Containerized Corporate Sandbox\nPersonalProfile → Unrestricted personal apps\nWorkProfile → Encrypted container (AES-256), DLP enforced, remote wipeable"
  },
  {
    question: "What is 'Frictionless Security' and what are its realistic limitations?",
    shortAnswer: "An approach that embeds security checks into invisible background processes; its limitation is that high-impact actions still mandate conscious user confirmation.",
    explanation: "While background telemetry (behavioral biometrics, IP reputation) can make routine logins invisible, high-stakes transactions (e.g., transferring ₹15,00,000 to a new vendor in Barrackpore) MUST introduce intentional friction (step-up verification, cooling-off periods) to prevent coercion and impulsive fraud.",
    hint: "Consider why high-value banking transfers intentionally require explicit user verification.",
    level: "expert",
    codeExample: "if (txAmountINR > 100000 && isNewBeneficiary) {\n  requireExplicitBiometricConsent();\n  enforce24HourCoolingPeriod();\n}"
  },
  {
    question: "Why are Captchas considered an accessibility and usability bottleneck, and what modern alternatives exist?",
    shortAnswer: "Distorted text and image recognition captchas frustrate legitimate users and screen-readers; alternatives include Cloudflare Turnstile and Private Access Tokens (PAT).",
    explanation: "Traditional CAPTCHAs degrade user conversion rates by up to 12% and fail visually impaired users. Privacy-preserving cryptographically signed tokens (PAT / Turnstile) authenticate human presence via browser environment proofs in under 100ms with zero interactive puzzles.",
    hint: "Think about invisible browser challenges that replace clicking on traffic lights and fire hydrants.",
    level: "moderate",
    codeExample: "// Cloudflare Turnstile / PAT\n<Turnstile sitekey='0x4AAAAAA...' onVerify={(token) => submitPayment(token)} />"
  },
  {
    question: "How should error messages in secure authentication forms be designed to balance security with helpful UX?",
    shortAnswer: "Use generic feedback ('Invalid username or password') to prevent user enumeration, while providing clear, accessible account recovery links.",
    explanation: "Displaying 'Password incorrect for user mamata' reveals to brute-force bots that the account 'mamata' exists. However, overly cryptic errors leave legitimate locked-out users helpless. The UI should state: 'Invalid credentials. Need help? Reset your password here.'",
    hint: "Think about preventing hackers from discovering valid usernames while guiding real users to recovery.",
    level: "basic",
    codeExample: "// Standardized Authentication Response\nres.status(401).json({ message: 'Invalid username or password. Please try again.' });"
  },
  {
    question: "What is the ultimate goal of combining User Experience (UX) and Cyber Security?",
    shortAnswer: "To make the most secure path the easiest, most intuitive, and fastest path for every human in the organization.",
    explanation: "When security controls align with natural human workflows and minimize unnecessary friction, compliance becomes the path of least resistance. Security succeeds not when it forbids user actions, but when it enables business operations to occur safely, resiliently, and confidently.",
    hint: "Consider designing systems where doing the right, safe thing is simpler than doing the wrong thing.",
    level: "moderate",
    codeExample: "// The Golden Rule of Usable Security\nOptimalDesign = Minimize(UserFriction) + Maximize(CryptographicAssurance);"
  }
];

export default questions;
