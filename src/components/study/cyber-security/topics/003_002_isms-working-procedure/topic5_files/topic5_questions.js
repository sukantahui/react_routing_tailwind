const questions = [
  {
    question: "What is the tripartite classification of security controls in an Information Security Management System (ISMS)?",
    shortAnswer: "Security controls are classified into three complementary pillars: Technical (Logical) Controls, Administrative (Managerial / Operational) Controls, and Physical Controls.",
    explanation: "Effective security cannot rely on software alone. The tripartite model provides defense-in-depth: 1. Technical Controls: Software and hardware algorithms (AES-256 encryption, FIDO2 MFA, firewalls, DLP); 2. Administrative Controls: Human policies, background checks, training, and operational procedures (JML offboarding, Maker-Checker); 3. Physical Controls: Tangible barriers protecting facilities (biometric turnstiles, mantraps, AI CCTV, media shredding).",
    hint: "Think of software algorithms, human policies, and physical walls working in unison.",
    level: "basic",
    codeExample: `// Tripartite Control Model:
1. Technical:      AES-256-GCM + FIDO2 WebAuthn + PostgreSQL Dynamic Data Masking
2. Administrative: Information Security Policy + Monthly Phishing Drills + JML Offboarding (< 15 mins)
3. Physical:       Biometric Mantraps + AI CCTV Surveillance + NIST SP 800-88 Hard Drive Shredding`
  },
  {
    question: "What are Technical (Logical) Controls, and what core cybersecurity mechanisms do they execute?",
    shortAnswer: "Technical controls are automated hardware and software safeguards that control access to data and systems; examples include cryptography (AES-256), authentication (FIDO2 MFA), firewalls (NGFW/WAF), DLP, and Zero Trust micro-segmentation.",
    explanation: "Technical controls operate directly at the network, OS, application, and database layers to enforce the CIA triad: 1. Cryptography (A.8.24): Enforcing AES-256-GCM encryption with HSM keys; 2. Identity & Access Management (A.8.5): Requiring hardware FIDO2 tokens for cloud console access; 3. Data Protection: Dynamic data masking (A.8.11) and DLP boundary filters (A.8.12); 4. Network Security: WAF and micro-segmentation blocking unauthorized lateral movement.",
    hint: "Think of automated software rules, encryption algorithms, and firewall filters.",
    level: "basic",
    codeExample: `// Technical Control Implementations:
- Encryption:   AWS KMS AES-256-GCM for all PostgreSQL database volumes
- MFA:          FIDO2 Hardware Security Keys (YubiKey) required for AWS Root & CISO logins
- Data Masking: Dynamic PostgreSQL view masking Aadhaar/PAN numbers for support staff`
  },
  {
    question: "What are Administrative (Managerial) Controls, and why is technology ineffective without them?",
    shortAnswer: "Administrative controls are organizational policies, governance frameworks, training programs, and operational procedures that direct human behavior; without them, users will bypass technical controls or fall victim to social engineering.",
    explanation: "Even the strongest AES-256 encryption is useless if an untrained employee emails the private decryption key to a phishing attacker. Administrative controls establish: 1. Governance Policies: Signed Information Security Policy (A.5.1) and Acceptable Use Policy (A.5.10); 2. Human Lifecycle: Pre-employment background checks (A.6.1) and immediate JML credential offboarding (A.6.5); 3. Security Awareness: Monthly phishing simulation drills (A.6.3); 4. Change Management: Segregation of Duties (A.5.3 Maker-Checker dual authorization).",
    hint: "Think of corporate policies, employee training, background checks, and separation of duties.",
    level: "moderate",
    codeExample: `// Administrative Control Execution:
- Policy:         POL-SEC-01 (Mandatory Screen Locking & Multi-Factor Authentication Standard)
- Human HR:       HRMS webhook triggering automated account de-provisioning within 15 minutes of resignation
- Awareness:      Monthly unannounced simulated phishing campaigns targeting all 250 employees`
  },
  {
    question: "What are Physical Controls, and what tangible threats do they protect against?",
    shortAnswer: "Physical controls are tangible barriers, environmental safeguards, and physical monitoring systems that protect buildings, server rooms, hardware, and physical storage media from unauthorized entry, theft, fire, and natural disasters.",
    explanation: "If an attacker can physically pick up a database server or plug a malicious USB drive into an unattended console, all software firewalls are bypassed. Physical controls include: 1. Perimeter Defense (A.7.1-A.7.3): Biometric turnstiles, mantraps, and reinforced security doors; 2. Monitoring (A.7.4): 24/7 AI-powered CCTV motion cameras; 3. Environmental: Dual UPS, diesel generators, and FM-200 gas fire suppression systems; 4. Media Sanitization (A.7.14): NIST SP 800-88 cross-cut physical shredding (< 2mm).",
    hint: "Think of doors, locks, mantraps, guards, CCTV, fire suppression, and physical shredders.",
    level: "basic",
    codeExample: `// Physical Control Implementations:
- Entry:          Biometric fingerprint + RFID badge mantrap airlock for server room entry
- Monitoring:     24/7 AI CCTV with automated facial recognition and 90-day rolling DVR archive
- Disposal:       Industrial degaussing followed by NIST SP 800-88 physical shredding (< 2mm)`
  },
  {
    question: "What are the functional control categories: Preventive, Detective, Corrective, Compensating, and Deterrent?",
    shortAnswer: "1. Preventive (blocks attacks before they happen); 2. Detective (identifies ongoing or past attacks); 3. Corrective (restores systems post-attack); 4. Compensating (alternative safeguard when primary is impossible); 5. Deterrent (discourages adversaries from attempting attacks).",
    explanation: "Controls are classified by their functional timing and purpose: 1. Preventive: Firewalls, MFA, encryption, locked doors; 2. Detective: SIEM alerts, AI CCTV, intrusion detection systems (IDS), audit logs; 3. Corrective: Disaster recovery failover, automated patch scripts, CAPA remediation; 4. Compensating: Air-gapping and network isolation for legacy SCADA devices that cannot support modern MFA; 5. Deterrent: Warning banners citing IT Act penalties, visible guard posts.",
    hint: "Remember: Stop before (Prevent), Catch during (Detect), Fix after (Correct), Alternative (Compensate), Scare away (Deter).",
    level: "moderate",
    codeExample: `// Functional Classification Matrix:
[ Preventive ]   ➔ AES-256 Encryption, FIDO2 MFA, Biometric Turnstiles
[ Detective ]    ➔ SIEM Log Correlation, AI CCTV Analytics, Vulnerability Scanners
[ Corrective ]   ➔ Automated DR Failover, CAPA 5-Whys Plans, Patch Deployment
[ Compensating ] ➔ Network Micro-segmentation & Bastion Jump Hosts for legacy OT systems
[ Deterrent ]    ➔ "Violators subject to 10-year imprisonment under IT Act Section 70" login banners`
  },
  {
    question: "What is a 'Compensating Control', and when is it legally and technically permissible in an ISMS?",
    shortAnswer: "A compensating control is an alternate security measure that provides equivalent protection when a primary control is technically unfeasible, economically prohibitive, or would break legacy industrial systems.",
    explanation: "In legacy environments (such as 220kV power grid SCADA RTUs or legacy medical imaging devices), modern technical controls like FIDO2 MFA or endpoint EDR agents cannot be installed without crashing the hardware. A compensating control architecture (such as air-gapping the legacy network, enforcing strict Bastion jump-host access with session recording, and deploying network micro-segmentation) is documented in the Statement of Applicability (SoA) to maintain equivalent security.",
    hint: "Think of an alternative safety mechanism when the standard seatbelt cannot be fitted.",
    level: "expert",
    codeExample: `// Compensating Control Example:
Legacy Asset: 20-year-old Substation RTU running proprietary firmware (Cannot support MFA!)
Primary Control Gap: Control A.8.5 (Secure Authentication) technically impossible
Compensating Control Architecture:
1. Complete network air-gapping (VLAN isolation)
2. Access permitted ONLY via hardened Linux Bastion host with dual-operator MFA
3. 100% SSH session video recording & AI anomaly detection`
  },
  {
    question: "What is the 'Defense-in-Depth' (DiD) principle, and how does the tripartite control model implement it?",
    shortAnswer: "Defense-in-Depth is a layered security strategy where multiple redundant controls (Physical, Administrative, Technical) are deployed so that if an adversary bypasses one defensive layer, subsequent layers successfully stop the breach.",
    explanation: "Relying on a single defensive line is fatal. In a Defense-in-Depth architecture: 1. Physical Layer: The attacker is blocked by biometric turnstiles and AI CCTV; 2. Administrative Layer: If the attacker uses social engineering, trained employees identify the phishing attack and report it; 3. Technical Layer: If credentials are compromised, FIDO2 hardware MFA and dynamic data masking prevent unauthorized database extraction.",
    hint: "Think of a medieval castle: moat, outer wall, portcullis, inner courtyard, and keep.",
    level: "basic",
    codeExample: `// Defense-in-Depth Layering:
[ Layer 1: Physical ]       ➔ Biometric Mantrap + AI CCTV + Guard Post
[ Layer 2: Administrative ] ➔ Background Checks + Security Awareness + Maker-Checker
[ Layer 3: Technical ]      ➔ WAF + FIDO2 MFA + AES-256-GCM + Dynamic Data Masking
[ Layer 4: Data Vault ]     ➔ Automated Crypto-Shredding + Immutable WORM Backups`
  },
  {
    question: "How does the 'Maker-Checker' administrative control prevent fraud and unauthorized changes in production environments?",
    shortAnswer: "The Maker-Checker (Segregation of Duties - Control A.5.3) principle mandates that the individual who creates/initiates a transaction or code change (Maker) cannot approve or execute it; a separate authorized individual (Checker) must independently review and sign off.",
    explanation: "Maker-Checker eliminates single points of human failure and insider threats: 1. DevSecOps: A software engineer writes code (Maker), but cannot deploy to production without independent QA and Lead Architect sign-off (Checker); 2. Banking Transfers: A finance clerk creates a ₹5 Crore wire transfer (Maker), which requires dual-key cryptographic authorization by the Finance Director (Checker); 3. Cloud Admin: Modifying IAM firewall rules requires dual-operator sign-off.",
    hint: "Think of two distinct keys required simultaneously to open a bank vault.",
    level: "moderate",
    codeExample: `// Maker-Checker Code Deployment Workflow:
1. Maker:   DevOps engineer submits Terraform Pull Request to update AWS security groups
2. Checker: Lead Cryptographic Architect reviews PR against CIS Benchmarks and signs off
3. Enforce: GitHub Actions / GitLab CI pipeline enforces branch protection rule (2 approvals required)`
  },
  {
    question: "What are Clean Desk and Clean Screen policies (Control A.7.7), and how are they operationally enforced?",
    shortAnswer: "Clean Desk requires locking all sensitive papers and removable media in secure drawers when unattended; Clean Screen requires locking computer displays (Win+L / 3-minute auto-lock) and deploying privacy screen filters to prevent visual snooping.",
    explanation: "Physical data theft frequently occurs when visitors, cleaners, or unauthorized employees glance at unattended desks. Under Control A.7.7: 1. Clean Desk: Sensitive documents, access badges, and USB drives must be locked in drawers at the end of the day; 2. Clean Screen: OS group policy enforces a 3-minute inactivity screen lock; employees must press Win+L whenever stepping away; 3. Privacy Filters: Polarized screen filters are mandated for laptops in public spaces.",
    hint: "Remember locking papers in drawers and pressing Win+L to lock screens.",
    level: "basic",
    codeExample: `// Clean Screen Group Policy (GPO):
Computer Configuration -> Windows Settings -> Security Settings -> Local Policies -> Security Options:
- Interactive logon: Machine inactivity limit = 180 seconds (3 Minutes)
- Screen Saver: Password protected = ENABLED`
  },
  {
    question: "How does the tripartite control model satisfy the statutory 'Reasonable Security Practices' mandate under Section 43A of the Indian IT Act 2000?",
    shortAnswer: "Section 43A and the SPDI Rules 2011 mandate comprehensive administrative, technical, and physical safeguards; implementing all three pillars establishes an unassailable legal Safe Harbor defense in civil liability lawsuits.",
    explanation: "Under Indian cyber law, an enterprise handling Sensitive Personal Data or Information (SPDI) is liable for compensation if it fails to maintain reasonable security practices. The SPDI Rules explicitly state that an audited ISO/IEC 27001 ISMS—encompassing technical encryption (A.8.24), administrative policies (A.5.1), and physical perimeters (A.7.1)—constitutes conclusive judicial proof of statutory compliance.",
    hint: "Remember how Technical, Administrative, and Physical controls together form the Safe Harbor defense.",
    level: "basic",
    codeExample: `// Judicial Defense under IT Act Section 43A:
Plaintiff Claim: "Enterprise was negligent in protecting customer bank account data."
Defense Evidence: Produces ISO 27001 audit report proving:
1. Technical:      AES-256-GCM encryption + PostgreSQL Dynamic Data Masking
2. Administrative: Board-signed security policy + Monthly employee phishing drills
3. Physical:       Biometric mantrap access logs + AI CCTV surveillance
Court Ruling:      Corporate entity demonstrated statutory reasonable security practices -> Dismissed!`
  },
  {
    question: "What is NIST SP 800-88 physical media sanitization (Control A.7.14), and why are software file deletions insufficient for decommissioned storage?",
    shortAnswer: "NIST SP 800-88 defines standards for media sanitization (Clear, Purge, Destroy); software file deletion leaves residual data on magnetic/flash platters that forensic tools can recover, requiring physical destruction (cross-cut shredding < 2mm or degaussing).",
    explanation: "Clicking 'Delete' or formatting a drive merely removes file directory pointers while leaving raw data blocks intact on magnetic platters or NAND flash cells. Control A.7.14 enforces: 1. Purge: Cryptographic erase (Crypto-Shredding) or multi-pass overwriting; 2. Destroy: Industrial degaussing (magnetic neutralization) followed by physical disintegration/shredding into fragments smaller than 2mm, accompanied by a signed Certificate of Destruction.",
    hint: "Think of tearing a paper into microscopic dust rather than simply tossing it in the wastebasket.",
    level: "moderate",
    codeExample: `// NIST SP 800-88 Sanitization Protocol (Control A.7.14):
Level 1 (Clear):   Multi-pass binary overwrite (0x00, 0xFF, Random) across all disk sectors
Level 2 (Purge):   Cryptographic erase (destroying AES-256 master key in HSM)
Level 3 (Destroy): Industrial hydraulic shredder cross-cutting drive platters to < 2mm fragments`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why must Data Fiduciaries deploy both Administrative and Technical controls to avoid Section 33 fines?",
    shortAnswer: "Section 8(5) mandates reasonable technical and organizational safeguards; deploying administrative consent policies without technical masking/DLP allows breaches, while deploying technical tools without employee training leads to insider leaks, exposing the firm to ₹250 Crore fines.",
    explanation: "The DPDP Act 2023 penalizes failures to prevent personal data breaches under Section 33. The law requires a dual approach: 1. Administrative: Documented consent records, privacy notices, and DPO appointment; 2. Technical: Dynamic data masking (A.8.11), DLP endpoint filtering (A.8.12), and automated information deletion (A.8.10). An enterprise with policies but no masking will leak data; an enterprise with masking but un-trained staff will suffer credential compromise.",
    hint: "Remember that policies without technical tools fail, and technical tools without human training fail.",
    level: "basic",
    codeExample: `// DPDP Section 8(5) Dual Safeguard Model:
Administrative Safeguards: Board Privacy Policy + DPO Oversight + Phishing Awareness
Technical Safeguards:      PostgreSQL Dynamic Data Masking + Endpoint DLP + AES-256 HSM Keys
Result:                    Total immunity from ₹250 Crore penalties under Section 33!`
  },
  {
    question: "Synthesizing Implementing Technical, Administrative, and Physical Controls: what is the master equation of Tripartite Control Efficacy?",
    shortAnswer: "$$\\text{Tripartite Control Efficacy} = \\frac{\\text{Technical Safeguards} \\times \\text{Administrative Governance} \\times \\text{Physical Perimeters}}{\\text{Residual Threat Surface} + \\text{Human Error Rate}}$$ with continuous Defense-in-Depth verification.",
    explanation: "This master governance relationship proves that enterprise cybersecurity resilience is the mathematical product of Technical, Administrative, and Physical controls. If any single pillar is zero (e.g. powerful technical encryption but zero physical security, allowing server theft), the total efficacy collapses to zero. Layering all three pillars in harmony minimizes human error, eliminates single points of failure, and guarantees total statutory safe harbor.",
    hint: "Conclude by reviewing how the product of Technical, Administrative, and Physical controls eliminates breach risk.",
    level: "expert",
    codeExample: `// Master Equation of Tripartite Control Efficacy:
Efficacy = (Technical_Safeguards * Administrative_Governance * Physical_Perimeters) / (Threat_Surface + Human_Error);
Outcome: 100% Defense-in-Depth, Zero Single Points of Failure & Total Statutory Safe Harbor!`
  }
];

export default questions;
