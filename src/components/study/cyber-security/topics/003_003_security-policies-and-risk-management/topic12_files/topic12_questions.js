const questions = [
  {
    question: "What is Threat Modeling, and what are the 4 fundamental questions of the Threat Modeling process?",
    shortAnswer: "A structured engineering methodology to identify, prioritize, and mitigate security threats during software design; asks: 1. What are we building? 2. What can go wrong? 3. What are we going to do about it? 4. Did we do a good job?",
    explanation: "Threat modeling represents the core of Shift-Left DevSecOps under ISO/IEC 27001 Control A.8.25 (Secure Development Lifecycle). Rather than waiting for penetration testers to find flaws in production, threat modeling analyzes Data Flow Diagrams (DFDs) during architectural design to eliminate architectural flaws before writing code.",
    hint: "1. What are we building? 2. What can go wrong? 3. How do we fix it? 4. Did we succeed?",
    level: "basic",
    codeExample: `// 4 Core Questions of Threat Modeling:
Question 1 (Architecture):  Create Data Flow Diagram (DFD) showing trust boundaries
Question 2 (Threats):       Apply STRIDE to identify Spoofing, Tampering, Elevation flaws
Question 3 (Mitigation):    Design cryptographic and access control countermeasures
Question 4 (Verification):  Validate mitigations through automated unit tests and code review`
  },
  {
    question: "What does the STRIDE acronym stand for, and which security property does each element violate?",
    shortAnswer: "S: Spoofing (Violates Authenticity); T: Tampering (Violates Integrity); R: Repudiation (Violates Non-Repudiation); I: Information Disclosure (Violates Confidentiality); D: Denial of Service (Violates Availability); E: Elevation of Privilege (Violates Authorization).",
    explanation: "Developed by Microsoft, STRIDE maps specific threat types directly to corresponding security properties: 1. Spoofing: Impersonating a user or service; 2. Tampering: Modifying data in transit or storage; 3. Repudiation: Denying performing a transaction; 4. Info Disclosure: Exposing confidential data; 5. Denial of Service: Crashing a service; 6. Elevation of Privilege: Gaining unauthorized admin rights.",
    hint: "Spoofing, Tampering, Repudiation, Info Disclosure, Denial of Service, Elevation of Privilege.",
    level: "basic",
    codeExample: `// STRIDE to Security Property Mapping:
[S] Spoofing               ➔ Authenticity
[T] Tampering              ➔ Integrity
[R] Repudiation            ➔ Non-Repudiation
[I] Information Disclosure ➔ Confidentiality
[D] Denial of Service      ➔ Availability
[E] Elevation of Privilege ➔ Authorization`
  },
  {
    question: "How does the DREAD methodology calculate quantitative risk ratings for identified threats?",
    shortAnswer: "DREAD scores 5 dimensions from 1 to 10: Damage Potential, Reproducibility, Exploitability, Affected Users, and Discoverability; the final score is the mathematical average: $$DREAD = \\frac{D + R + E + A + D}{5}$$.",
    explanation: "DREAD provides a standardized quantitative scoring framework for software development teams: 1. Damage (Severity of financial/data loss); 2. Reproducibility (Ease of replicating exploit); 3. Exploitability (Skill/tools required); 4. Affected Users (% of user base impacted); 5. Discoverability (Ease of finding the vulnerability). Scores between 8.0–10.0 are classified as Critical.",
    hint: "Sum all 5 parameters (each scored 1-10) and divide by 5.",
    level: "basic",
    codeExample: `// DREAD Score Calculation:
Damage Potential:  10 (Total database wipe)
Reproducibility:   10 (100% reliable exploit)
Exploitability:     8 (Simple curl script)
Affected Users:    10 (All 500,000 users)
Discoverability:    7 (Documented API endpoint)
DREAD Score = (10 + 10 + 8 + 10 + 7) / 5 = 9.0 / 10 (CRITICAL SEVERITY)`
  },
  {
    question: "What is a 'Trust Boundary' in a Data Flow Diagram (DFD), and why do threats concentrate across trust boundaries?",
    shortAnswer: "A trust boundary represents a perimeter where data transitions between different privilege levels or network zones (e.g. public internet ➔ corporate DMZ); threats concentrate here because untrusted input enters the trusted environment.",
    explanation: "In threat modeling, vulnerabilities rarely occur inside isolated trusted memory spaces; they emerge when untrusted data crosses a boundary: 1. User Browser (Untrusted) ➔ Web Application Firewall (DMZ); 2. REST API Gateway ➔ Internal Microservice; 3. Corporate Network ➔ Core Database. Every crossing requires rigorous authentication, authorization, and input validation.",
    hint: "The red line on your architecture diagram separating untrusted users from trusted servers.",
    level: "moderate",
    codeExample: `// Trust Boundary Crossing Example:
Public Internet (Untrusted Zone)
       │
═══════╪══════════════════════════ [ TRUST BOUNDARY 1: Web Ingress ]
       ▼
AWS API Gateway (DMZ Zone)
       │
═══════╪══════════════════════════ [ TRUST BOUNDARY 2: Internal Microservice ]
       ▼
PostgreSQL Production Database (Secure Core Zone)`
  },
  {
    question: "How is 'Spoofing' identified and mitigated in modern cloud microservices?",
    shortAnswer: "Spoofing occurs when an attacker fakes an identity or forges API tokens; mitigated using Mutual TLS (mTLS), FIDO2 WebAuthn authentication, and cryptographically verified JWT RS256 signatures.",
    explanation: "If Microservice A calls Microservice B without authentication, an attacker can spoof Microservice A. Mitigation under Control A.8.5: Deploying a Service Mesh (Istio) that enforces Mutual TLS (mTLS) with X.509 certificate verification between all pods, and requiring signed JSON Web Tokens (JWT) for user requests.",
    hint: "Spoofing = Faking identity; Fix = Strong MFA, mTLS, and cryptographic token verification.",
    level: "basic",
    codeExample: `// Mitigating API Spoofing via JWT RS256 Signature Verification:
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  // Verify using RSA Public Key (prevents algorithmic spoofing)
  jwt.verify(token, rsaPublicKey, { algorithms: ['RS256'] }, (err, user) => {
    if (err) return res.status(401).json({ error: "Spoofed or Invalid Token!" });
    req.user = user;
    next();
  });
}`
  },
  {
    question: "How is 'Tampering' identified and mitigated in database and transaction workflows?",
    shortAnswer: "Tampering involves unauthorized modification of data in transit or storage; mitigated using SHA-256 Hash Message Authentication Codes (HMAC), database Row-Level Encryption, and TLS 1.3.",
    explanation: "If a user intercepts an HTTP POST request and modifies the transaction amount from `₹100` to `₹1`, they commit a Tampering attack. Mitigation: The client/server computes an HMAC using a shared secret ($$HMAC = SHA256(Payload + Secret)$$). If the payload is modified by even 1 byte, the hash validation fails and the transaction is dropped.",
    hint: "Tampering = Modifying data; Fix = Digital signatures, HMACs, and immutable ledgers.",
    level: "basic",
    codeExample: `// Mitigating Payment Tampering via SHA-256 HMAC:
const crypto = require('crypto');
function verifyPayloadIntegrity(payload, receivedHmac, secretKey) {
  const calculatedHmac = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(calculatedHmac), Buffer.from(receivedHmac));
}`
  },
  {
    question: "How is 'Repudiation' identified and mitigated in financial banking systems under RBI guidelines?",
    shortAnswer: "Repudiation occurs when a user denies performing a transaction; mitigated through tamper-proof immutable audit logs (WORM storage), PKI digital signatures, and multi-factor authentication timestamps.",
    explanation: "Under the Information Technology Act 2000 Section 3 and RBI guidelines, digital financial transactions must possess legal non-repudiation. When a customer transfers ₹5 Lakhs via NEFT/UPI, the transaction is cryptographically signed with the user's private key or authenticated via FIDO2 biometric token and logged to an immutable append-only ledger.",
    hint: "Repudiation = 'I didn't do it!'; Fix = Tamper-proof logs and cryptographic signatures.",
    level: "moderate",
    codeExample: `// Non-Repudiation Audit Log Schema (ISO 27001 Control A.8.15):
{
  "eventId": "EVT-99218",
  "timestamp": "2026-08-23T02:40:00.000Z",
  "userId": "usr_kolkata_mamata",
  "action": "UPI_TRANSFER_INITIATED",
  "amount": "₹50,000.00",
  "fido2BiometricAssertion": "0x4a8f9c...",
  "immutableS3ObjectLock": true
}`
  },
  {
    question: "How is 'Elevation of Privilege' identified and mitigated in application architectures?",
    shortAnswer: "Elevation of Privilege occurs when a standard user acquires administrative rights; mitigated using Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), Parameterized SQL, and Least Privilege.",
    explanation: "Elevation attacks occur via broken access control (e.g. changing `role=user` to `role=admin` in JSON requests) or injection attacks (SQLi/Command Injection spawning root shells). Mitigation: Enforce strict server-side authorization middleware, never trust client-side role parameters, and parameterize all SQL queries.",
    hint: "Elevation = Regular user becomes Root Admin; Fix = Strict server-side RBAC and Least Privilege.",
    level: "basic",
    codeExample: `// Server-Side Authorization Middleware (Prevents Privilege Elevation):
function requireRole(requiredRole) {
  return (req, res, next) => {
    // Role MUST be retrieved from verified session/DB, NEVER client request body!
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Access Denied: Insufficient Privileges" });
    }
    next();
  };
}`
  },
  {
    question: "Under the Indian DPDP Act 2023, why is Threat Modeling legally required during Data Protection Impact Assessments (DPIAs)?",
    shortAnswer: "Section 8 mandates Privacy-by-Design and reasonable security safeguards; conducting STRIDE threat modeling on personal data flows identifies Information Disclosure risks before launch, providing statutory Safe Harbor against ₹250 Cr penalties.",
    explanation: "If a company deploys a mobile app that leaks Aadhaar biometric data due to an unencrypted local SQLite database, claiming 'we did not know' is rejected as statutory negligence. Threat modeling proves that the organization proactively identified Information Disclosure risks and engineered appropriate cryptographic mitigations.",
    hint: "Threat modeling proves you proactively searched for data leak risks before launching.",
    level: "moderate",
    codeExample: `// DPDP Privacy-by-Design STRIDE Check:
Threat: Information Disclosure (I) on mobile SQLite cache
Flaw:   Aadhaar numbers stored in cleartext on device storage
Mitigation: Enforce SQLCipher AES-256 database encryption with Android Keystore key`
  },
  {
    question: "What is the PASTA (Process for Attack Simulation and Threat Analysis) methodology, and how does it differ from STRIDE?",
    shortAnswer: "PASTA is a risk-centric, 7-step threat modeling framework that aligns technical application threats directly with business objectives, financial impact, and real-world adversary attack simulation.",
    explanation: "While STRIDE is a developer-centric mnemonic focused on categorizing technical bugs, PASTA is a comprehensive business-focused framework: 1. Define Business Objectives; 2. Define Technical Scope; 3. Decompose Application (DFD); 4. Threat Analysis; 5. Vulnerability Analysis; 6. Attack Simulation; 7. Risk and Impact Analysis.",
    hint: "STRIDE focuses on developer bug types; PASTA focuses on business impact and attack simulation.",
    level: "expert",
    codeExample: `// PASTA 7-Stage Risk-Centric Framework:
Stage 1: Define Business Objectives ➔ Protect ₹120 Cr/day UPI Transaction Ledger
Stage 2: Technical Scope Scope      ➔ 500 Payment Microservices on Kubernetes
Stage 3: Application Decomposition  ➔ Data Flow Diagrams & Trust Boundaries
Stage 4: Threat Intelligence        ➔ MITRE ATT&CK TTPs targeting Indian FinTechs
Stage 5: Vulnerability Analysis     ➔ Static/Dynamic SCA & DAST Flaws
Stage 6: Attack Simulation          ➔ Red Team Penetration Testing
Stage 7: Risk & Impact Analysis     ➔ FAIR Quantitative Loss & ROSI Justification`
  },
  {
    question: "Why has Microsoft deprecated the 'Discoverability' metric in modern implementations of DREAD?",
    shortAnswer: "Because assuming a vulnerability will remain 'hidden' (Security through Obscurity) is a dangerous flaw; in the era of automated mass-scanning, if a vulnerability exists, attackers will discover it (Discoverability is always assumed to be 10).",
    explanation: "Historically, engineers would artificially lower a threat's DREAD score by giving Discoverability a '1' ('Attackers won't find this internal URL'). Modern security frameworks reject this fallacy: with automated scanners, search engines (Shodan), and reverse engineering, all vulnerabilities are discoverable. Many teams use DREAD-D (Damage, Reproducibility, Exploitability, Affected Users).",
    hint: "Security through obscurity is dead; assume hackers will discover every flaw.",
    level: "moderate",
    codeExample: `// Modern DREAD Assumption:
Old View: "Discoverability = 1 because the URL is not linked on our homepage." (Dangerous!)
New View: "Discoverability = 10 because automated fuzzers scan all endpoints." ➔ Accurate Risk!`
  },
  {
    question: "When should Threat Modeling be performed during the Software Development Life Cycle (SDLC)?",
    shortAnswer: "During the initial Architecture and Design phase (Sprint 0 / System Design), updated continuously on every major feature architectural change, and re-validated prior to production deployment.",
    explanation: "Fixing an architectural security flaw in design costs 1x; fixing it during coding costs 10x; fixing it after deployment following a real-world breach costs 100x+ (plus ₹250 Crore DPDP statutory penalties). Threat modeling is the ultimate cost-saving engineering discipline in DevSecOps.",
    hint: "During design phase before writing code; update continuously as architecture evolves.",
    level: "basic",
    codeExample: `// Cost of Fixing Security Flaws Across SDLC:
Design Phase (Threat Modeling): ₹10,000 (Update architectural DFD diagram)
Build Phase (SAST Scan):        ₹1,00,000 (Refactor code & re-test)
Production Phase (Data Breach): ₹250,00,00,000 (DPDP Act Statutory Penalty + Business Collapse!)`
  },
  {
    question: "Synthesizing Threat Modeling Methodologies: what is the master equation of Proactive Architectural Immunity?",
    shortAnswer: "$$\\text{Architectural Immunity} = \\frac{\\text{STRIDE Trust Boundary Coverage} \\times \\text{DREAD Prioritization Velocity}}{\\text{Unmitigated Architectural Flaws} + \\text{Security Through Obscurity Fallacies}} \\ge 1.0$$ with continuous ISO 27001 Control A.8.25 verification.",
    explanation: "This master engineering relationship proves that application security is maximized when STRIDE systematically inspects every trust boundary transition, DREAD quantitative scoring prioritizes engineering backlogs, and architectural flaws are eliminated before deployment. This guarantees bulletproof software, zero architectural vulnerabilities, and total statutory safe harbor.",
    hint: "Conclude by reviewing how STRIDE coverage and DREAD scoring eliminate unmitigated architectural flaws.",
    level: "expert",
    codeExample: `// Master Equation of Threat Modeling Governance:
Immunity = (STRIDE_Coverage * DREAD_Velocity) / (Architectural_Flaws + Obscurity_Assumptions);
Condition: Immunity >= 1.0 (Zero High/Critical Architectural Flaws in Production);
Outcome:   100% Secure by Design, Zero RCE/Injection Flaws & Total Regulatory Safe Harbor!`
  }
];

export default questions;
