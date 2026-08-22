const questions = [
  {
    question: "What is Annex A of ISO/IEC 27001:2022, and how are its 93 security controls structured across the 4 modern themes?",
    shortAnswer: "Annex A is the normative reference catalog of 93 information security controls organized into 4 themes: Organizational Controls (Clause A.5 - 37 controls), People Controls (Clause A.6 - 8 controls), Physical Controls (Clause A.7 - 14 controls), and Technological Controls (Clause A.8 - 34 controls).",
    explanation: "Annex A serves as the universal reference benchmark against which an organization compares its risk treatment decisions during the authoring of the Statement of Applicability (Clause 6.1.3(d)). The 2022 revision consolidated the previous 14 domains into 4 logical, operational themes: A.5 Organizational (policies, asset management, vendor risk), A.6 People (screening, awareness, JML), A.7 Physical (perimeters, equipment, clean desk), and A.8 Technological (cryptography, IAM, secure coding, DLP).",
    hint: "Remember the 4 themes: Organizational (37), People (8), Physical (14), and Technological (34).",
    level: "basic",
    codeExample: `// ISO/IEC 27001:2022 Annex A Control Distribution:
Clause A.5: Organizational Controls ➔ 37 Controls (Policies, Vendor Risk, Incident Response)
Clause A.6: People Controls         ➔ 8 Controls  (Screening, JML, Awareness Training)
Clause A.7: Physical Controls       ➔ 14 Controls (Perimeters, Clear Desk, Monitoring)
Clause A.8: Technological Controls  ➔ 34 Controls (AES-256, IAM, DLP, Secure Coding)
TOTAL                               ➔ 93 Controls`
  },
  {
    question: "What are the core controls in Clause A.5 (Organizational Controls), and what governance functions do they perform?",
    shortAnswer: "Clause A.5 contains 37 controls governing information security policies (A.5.1), asset inventory (A.5.9), threat intelligence (A.5.7), supplier/vendor relationships (A.5.19), cloud service security (A.5.23), incident response (A.5.24), and ICT business continuity (A.5.30).",
    explanation: "Organizational controls establish corporate governance, administrative procedures, and supply chain integrity: 1. Asset Management (A.5.9-A.5.14): Inventorying, classifying, and labeling information assets; 2. Supplier & Cloud Security (A.5.19-A.5.23): Enforcing contractual security SLAs for third-party FinTech APIs and cloud providers; 3. Incident Management (A.5.24-A.5.28): Establishing playbooks to report cyber incidents to CERT-In within 6 hours.",
    hint: "Think of the corporate rulebook: policies, vendor contracts, incident playbooks, and cloud governance.",
    level: "moderate",
    codeExample: `// Representative Clause A.5 Controls:
A.5.1  Policies for information security  | A.5.7  Threat intelligence
A.5.9  Inventory of information assets    | A.5.19 Security in supplier relationships
A.5.23 Security for use of cloud services | A.5.24 Incident management planning`
  },
  {
    question: "What are the 8 controls in Clause A.6 (People Controls), and how do they manage the employee lifecycle?",
    shortAnswer: "Clause A.6 governs the complete human lifecycle: Pre-employment screening (A.6.1), employment terms (A.6.2), awareness/training (A.6.3), disciplinary processes (A.6.4), termination/JML offboarding (A.6.5), NDAs (A.6.6), remote working (A.6.7), and security event reporting (A.6.8).",
    explanation: "People controls secure the human element from onboarding to exit: 1. Pre-Employment: Background verification and police clearance before granting system access (A.6.1); 2. Employment: Mandatory security awareness training and monthly phishing simulations (A.6.3); 3. Post-Employment / JML: Instant revocation of all VPN, cloud, and building access on an employee's last working day (A.6.5); 4. Remote Work: Hardening home office laptops and teleworking environments (A.6.7).",
    hint: "Remember the 8 people controls covering hiring, training, remote work, and firing/offboarding.",
    level: "basic",
    codeExample: `// Clause A.6 People Controls Lifecycle:
Joiner ➔ A.6.1 Screening + A.6.2 Terms of Employment + A.6.6 NDA
Mover  ➔ A.6.3 Awareness Training + A.6.7 Remote Working Security
Leaver ➔ A.6.5 Termination & Immediate Credential Revocation (< 15 mins)`
  },
  {
    question: "What are the core controls in Clause A.7 (Physical Controls), and how do they protect physical computing assets?",
    shortAnswer: "Clause A.7 contains 14 controls governing physical security perimeters (A.7.1), entry controls (A.7.2), physical monitoring (A.7.4), clean desk and clear screen policies (A.7.7), equipment siting/maintenance (A.7.8/A.7.13), and secure media disposal (A.7.14).",
    explanation: "Physical controls ensure attackers cannot simply walk into data centers or steal unattended laptops: 1. Perimeters (A.7.1-A.7.4): Cardkey badge turnstiles, biometric scanners, and 24/7 AI-monitored CCTV; 2. Workstation Security (A.7.7): Mandatory screen locking (Win+L) and locking confidential documents in drawers; 3. Media Sanitization (A.7.14): Physical shredding (< 2mm) or degaussing of decommissioned hard drives.",
    hint: "Think of walls, locks, guards, CCTV, clean desks, and industrial shredders.",
    level: "basic",
    codeExample: `// Representative Clause A.7 Controls:
A.7.1 Physical security perimeters | A.7.4 Physical security monitoring
A.7.7 Clear desk and clear screen  | A.7.10 Storage media protection
A.7.14 Secure disposal of equipment (NIST SP 800-88 physical shredding < 2mm)`
  },
  {
    question: "What are the core controls in Clause A.8 (Technological Controls), and what technical layers do they protect?",
    shortAnswer: "Clause A.8 contains 34 controls protecting privileged access (A.8.2), secure authentication (A.8.5), vulnerability management (A.8.8), configuration management (A.8.9), information deletion (A.8.10), data masking (A.8.11), DLP (A.8.12), logging/monitoring (A.8.15-A.8.17), network security (A.8.20), cryptography (A.8.24), and secure coding (A.8.28).",
    explanation: "Technological controls form the engineering backbone of cybersecurity: 1. Identity & Cryptography: FIDO2 MFA (A.8.5) and AES-256-GCM encryption with HSM keys (A.8.24); 2. Privacy Engineering: Dynamic data masking (A.8.11), DLP boundary filters (A.8.12), and automated crypto-shredding deletion (A.8.10); 3. DevSecOps: Automated SAST/DAST security scanning and secure coding (A.8.28); 4. Monitoring: 180-day SIEM log retention and IST clock synchronization (A.8.15-A.8.17).",
    hint: "Remember the 34 technical controls: encryption, IAM, firewalls, DLP, masking, logging, and coding.",
    level: "moderate",
    codeExample: `// Representative Clause A.8 Controls:
A.8.5  Secure authentication (MFA)   | A.8.11 Data masking (PostgreSQL DDM)
A.8.10 Information deletion (Crypto) | A.8.12 Data leakage prevention (DLP)
A.8.24 Use of cryptography (AES-256) | A.8.28 Secure coding (OWASP Top 10)`
  },
  {
    question: "What is the five-dimensional 'Control Attributes' taxonomy in ISO/IEC 27002:2022, and how does it revolutionize control querying?",
    shortAnswer: "The 5 attributes (#Control_Type, #InfoSec_Properties, #Cybersecurity_Concepts, #Operational_Capabilities, #Security_Domains) provide structured metadata tags that allow architects to dynamically filter, group, and cross-map controls to other frameworks like NIST CSF and DPDP Act.",
    explanation: "ISO 27002:2022 introduced attribute tagging to simplify compliance mapping: 1. Control Type: #Preventive, #Detective, #Corrective; 2. InfoSec Properties: #Confidentiality, #Integrity, #Availability; 3. Cybersecurity Concepts: #Identify, #Protect, #Detect, #Respond, #Recover (matches NIST CSF); 4. Operational Capabilities: 15 operational tags (e.g. #IAM, #Cryptography); 5. Security Domains: #Governance_and_Ecosystem, #Protection, #Defense, #Resilience.",
    hint: "Remember the 5 tags: Type, CIA, NIST Concept, Operational Capability, and Security Domain.",
    level: "expert",
    codeExample: `// Control Attributes Tagging for A.8.12 (Data Leakage Prevention):
#Control_Type:              #Preventive, #Detective
#InfoSec_Properties:        #Confidentiality
#Cybersecurity_Concepts:    #Protect, #Detect
#Operational_Capabilities:  #Information_protection
#Security_Domains:          #Protection, #Defense`
  },
  {
    question: "How do Annex A controls A.8.10, A.8.11, and A.8.12 directly operationalize compliance with the Indian Digital Personal Data Protection (DPDP) Act 2023?",
    shortAnswer: "A.8.10 (Information Deletion) fulfills DPDP Section 8(7) Storage Limitation; A.8.11 (Data Masking) and A.8.12 (DLP) fulfill DPDP Section 8(5) reasonable technical safeguards, shielding the enterprise from ₹250 Crore statutory fines.",
    explanation: "The DPDP Act 2023 mandates specific technical and organizational data protection obligations: 1. Storage Limitation: Personal data must be permanently erased once purpose is served (enforced via A.8.10 automated TTL partition drops and crypto-shredding); 2. Technical Safeguards: Personal data exposure must be minimized (enforced via A.8.11 dynamic masking of Aadhaar/PAN numbers and A.8.12 DLP agents blocking unauthorized USB and webmail exports).",
    hint: "Link deletion to storage limitation, masking to PII minimization, and DLP to breach prevention.",
    level: "basic",
    codeExample: `// ISO 27001 Annex A to DPDP Act 2023 Mapping:
DPDP Section 8(7) Erasure    <---> Control A.8.10 (Information Deletion / Crypto-Shredding)
DPDP Section 8(5) Safeguards <---> Control A.8.11 (Data Masking) + Control A.8.12 (DLP)
Statutory Shield             <---> Eliminates ₹250 Crore Penalty Exposure under Section 33!`
  },
  {
    question: "How do Annex A controls A.8.15, A.8.16, and A.8.17 operationalize the mandatory CERT-In Cyber Security Directions 2022 under IT Act Section 70B?",
    shortAnswer: "A.8.15 (Logging) and A.8.16 (Monitoring) enforce mandatory 180-day secure audit log retention within Indian territory; A.8.17 (Clock Synchronization) mandates synchronizing all system clocks with National Physical Laboratory (NPL) NTP servers.",
    explanation: "Issued under Section 70B(6) of the IT Act: 1. Log Retention: System, firewall, and database logs must be retained for a rolling 180 days within India (fulfilled by A.8.15 and A.8.16 immutable SIEM storage); 2. NTP Time Sync: All ICT systems must synchronize clocks with National Physical Laboratory (NPL) or NIC NTP servers (fulfilled by A.8.17 clock synchronization); 3. Incident SLA: Reporting cyber breaches within 6 hours (fulfilled by A.5.24 incident workflows).",
    hint: "Remember the 180-day log storage, NPL NTP clock sync, and 6-hour incident reporting links.",
    level: "basic",
    codeExample: `// CERT-In Compliance via Annex A:
Control A.8.15 / A.8.16: Rolling 180-day encrypted SIEM log storage within Indian jurisdiction
Control A.8.17:          pool.ntp.org / time.nplindia.org NTP synchronization (+/- 1 second IST)
Control A.5.24 / A.5.28: Automated 6-hour incident escalation playbook to incident@cert-in.org.in`
  },
  {
    question: "What is Control A.8.28 (Secure Coding), and how is it integrated into modern DevSecOps CI/CD pipelines?",
    shortAnswer: "Control A.8.28 requires applying secure coding principles throughout software development; integrated by embedding automated SAST/DAST vulnerability scanners, dependency SCA checks, and pre-commit linters into automated CI/CD pipelines.",
    explanation: "Secure coding is no longer manual. Under Control A.8.28, the enterprise must: 1. Train developers on OWASP Top 10 and secure coding standards; 2. Embed Static Application Security Testing (SAST - SonarQube, Semgrep) and Software Composition Analysis (SCA - Snyk) directly into GitHub Actions / GitLab CI pipelines; 3. Block build pipelines if high-severity vulnerabilities (SQLi, XSS, unauthenticated endpoints) are detected.",
    hint: "Think of automated safety inspectors testing every line of code before it can be merged into production.",
    level: "moderate",
    codeExample: `// DevSecOps CI/CD Pipeline Configuration for Control A.8.28:
# GitHub Actions Secure Coding Pipeline
- name: Run SAST Scanner
  run: semgrep --config=auto --error --severity=ERROR
- name: Run Dependency SCA Check
  run: snyk test --severity-threshold=high
# Pipeline fails and blocks deployment if any OWASP Top 10 flaw is detected!`
  },
  {
    question: "What is Control A.8.9 (Configuration Management), and how does it eliminate 'Configuration Drift' in cloud infrastructure?",
    shortAnswer: "Control A.8.9 establishes and monitors standard security baselines (CIS Benchmarks); eliminates configuration drift by using Infrastructure as Code (IaC - Terraform) and automated cloud compliance tools (AWS Config/CSPM) that alert and auto-remediate unauthorized changes.",
    explanation: "Misconfiguration is the #1 cause of cloud data breaches. Under Control A.8.9: 1. Standard Baselines: Hardening OS, database, and network configurations according to Center for Internet Security (CIS) Benchmarks; 2. Infrastructure as Code: Defining all infrastructure in Terraform/CloudFormation; 3. Drift Detection: Automated CSPM scanners continuously compare running cloud assets against baseline templates, triggering instant alerts when an engineer opens an insecure port or bucket.",
    hint: "Think of an automated blueprint checker that flags any unauthorized brick or window added to a building.",
    level: "moderate",
    codeExample: `// Control A.8.9 Configuration Drift Detection:
Terraform Baseline: S3 bucket 'payment-backups' configured with 'encryption = AES256'
Drift Event:        DevOps engineer manually disables encryption via AWS console
CSPM Alert:         A.8.9 Drift Detected! AWS Lambda automatically re-enables KMS AES-256 encryption!`
  },
  {
    question: "What is Control A.5.30 (ICT Readiness for Business Continuity), and how does it interface with disaster recovery metrics?",
    shortAnswer: "Control A.5.30 requires that ICT infrastructure and technical redundancy are designed and maintained to meet defined Business Continuity objectives (Recovery Time Objective - RTO and Recovery Point Objective - RPO).",
    explanation: "Business continuity requires technical readiness. Under A.5.30: 1. Redundancy (A.8.14): Deploying active-active multi-region cloud clusters and dual power supplies; 2. RTO/RPO SLA: Ensuring databases can recover within 15 minutes (RTO) with zero data loss (RPO); 3. Disaster Drills: Conducting semi-annual unannounced live traffic failover simulations from primary data centers to secondary disaster recovery sites.",
    hint: "Remember the link between ICT technical readiness and RTO/RPO recovery targets.",
    level: "moderate",
    codeExample: `// Control A.5.30 ICT Readiness SLA:
Recovery Time Objective (RTO): 15 Minutes (Maximum allowable downtime)
Recovery Point Objective (RPO): 0 Seconds (Zero data loss via synchronous database replication)
Validation: Semi-annual unannounced live traffic switchover to Barrackpore secondary disaster recovery site`
  },
  {
    question: "What is Control A.5.3 (Segregation of Duties), and how does the 'Maker-Checker' principle prevent fraud in financial and cloud operations?",
    shortAnswer: "Segregation of duties separates conflicting roles so that no single individual can initiate, approve, and execute a critical transaction or security change without independent verification.",
    explanation: "Allowing one person complete control invites fraud, sabotage, and catastrophic accidental error. Control A.5.3 enforces the 'Maker-Checker' principle: 1. Software Deployment: A developer who writes code cannot approve and deploy it to production (requires independent QA and security sign-off); 2. Financial Transfers: A finance clerk who creates a payment request cannot execute the wire transfer (requires manager approval); 3. Cloud Admin: Modifying IAM root policies requires dual-custody approval.",
    hint: "Think of launching a missile: two separate keys turned simultaneously by two different officers.",
    level: "basic",
    codeExample: `// Maker-Checker Segregation of Duties (Control A.5.3):
Step 1 (Maker):   DevOps engineer creates PR to update AWS firewall rules
Step 2 (Checker): Lead Cryptographic Architect reviews PR and validates security baseline
Step 3 (Deploy):  CI/CD merges code ONLY after dual-authorization signature is verified!`
  },
  {
    question: "Synthesizing Annex A Security Controls in ISO 27001: what is the master equation of Annex A defense-in-depth?",
    shortAnswer: "$$\\text{Annex A Defense-in-Depth} = \\frac{\\sum_{i=1}^{37} \\text{Org}_i \\times \\sum_{j=1}^{8} \\text{People}_j \\times \\sum_{k=1}^{14} \\text{Phys}_k \\times \\sum_{l=1}^{34} \\text{Tech}_l}{\\text{Unaddressed Vulnerabilities} + \\text{Un-mitigated Risks}}$$ with continuous Statement of Applicability (SoA) audit verification.",
    explanation: "This master governance relationship proves that Annex A operates as a multiplicative defense-in-depth matrix. If any single theme is neglected (e.g. implementing 34 technological controls while ignoring the 8 people controls, leaving staff vulnerable to phishing), the enterprise defense collapses. Deploying all 93 controls in balance guarantees impenetrable resilience and total statutory safe harbor under global and Indian cyber laws.",
    hint: "Conclude by reviewing how the balanced synergy of all 4 themes guarantees defense-in-depth.",
    level: "expert",
    codeExample: `// Master Equation of Annex A Defense-in-Depth:
Resilience = (37_Org_Controls * 8_People_Controls * 14_Phys_Controls * 34_Tech_Controls) / Residual_Risks;
Outcome: 100% ISO 27001 Audit Success, Zero Statutory Fines & Unshakable Enterprise Trust!`
  }
];

export default questions;
