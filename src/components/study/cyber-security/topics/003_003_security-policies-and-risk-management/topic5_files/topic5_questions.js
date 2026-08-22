const questions = [
  {
    question: "Why is Asset Identification and Valuation the foundational first step of any cybersecurity risk assessment under ISO/IEC 27001 Control A.5.9?",
    shortAnswer: "Because an organization cannot protect what it does not know it owns; asset valuation determines the business impact and dictates proportional security control investments.",
    explanation: "Security budgets are finite. Spending ₹50 Lakhs to protect a server worth ₹5,000 is poor governance, while spending ₹50,000 on a database with ₹50 Crores in statutory DPDP exposure guarantees catastrophe. Asset identification creates a comprehensive Information Asset Register (IAR), and valuation assigns measurable criticality scores to prioritize defenses.",
    hint: "Think: You cannot lock doors if you do not know which rooms contain gold vs scrap metal.",
    level: "basic",
    codeExample: `// Information Asset Register (IAR - Control A.5.9) Entry:
Asset ID:         AST-DB-001 (Core Payment Customer Ledger)
Classification:   RESTRICTED / HIGHLY CONFIDENTIAL
Asset Owner:      Chief Financial Officer (CFO)
Asset Custodian:  Lead Database Administrator (Mamata)
Quantified Value: ₹45,00,00,000 (Based on revenue dependency + DPDP regulatory liability)`
  },
  {
    question: "What is the difference between a Primary Asset and a Supporting Asset under ISO/IEC 27005:2022?",
    shortAnswer: "Primary Assets are core business processes and valuable information (e.g. customer PII, trade secrets, payment processing); Supporting Assets are the tangible IT infrastructure components (servers, databases, networks, personnel, physical buildings) that host, process, or transmit primary assets.",
    explanation: "Threats and vulnerabilities physically exist on Supporting Assets (e.g. a vulnerability in an Apache Linux server), but the ultimate business impact occurs on the Primary Asset (e.g. theft of customer credit card data). A successful risk assessment maps every primary information asset to its underlying supporting hardware, software, and network nodes.",
    hint: "Primary = The treasure (data/process); Supporting = The chest, wagon, and guards (servers/networks).",
    level: "basic",
    codeExample: `// Primary vs Supporting Asset Mapping:
PRIMARY ASSET:    Customer Oncology Diagnostic Scans (Primary Information Asset)
   └── SUPPORTING ASSET 1: AWS Aurora PostgreSQL Instance (Database)
   └── SUPPORTING ASSET 2: Ubuntu 24.04 Production Container Host (OS)
   └── SUPPORTING ASSET 3: Jadavpur Fiber Optic Leased Line (Network)`
  },
  {
    question: "What are the 4 standard tiers of Enterprise Information Asset Classification (Control A.5.12)?",
    shortAnswer: "1. Restricted / Highly Confidential (Catastrophic impact if leaked); 2. Confidential (Severe financial/reputational harm); 3. Internal Use Only (Minor operational disruption); 4. Public (Zero impact / Approved for public release).",
    explanation: "Control A.5.12 mandates that information shall be classified in accordance with the information security needs of the organization: 1. Restricted: Cryptographic root keys, unannounced M&A deals, patient health records; 2. Confidential: Employee salaries, source code, network architecture diagrams; 3. Internal: Intranet policies, project schedules; 4. Public: Marketing press releases, published annual reports.",
    hint: "Restricted ➔ Confidential ➔ Internal ➔ Public.",
    level: "basic",
    codeExample: `// 4-Tier Asset Classification Scheme:
[ TIER 1: RESTRICTED ]   ➔ Master AWS KMS Root Keys & Customer PAN/Aadhaar Records
[ TIER 2: CONFIDENTIAL ] ➔ Proprietary Python Microservice Source Code & Audit Reports
[ TIER 3: INTERNAL ]     ➔ Engineering Onboarding Guides & Jira Ticket Backlogs
[ TIER 4: PUBLIC ]       ➔ Marketing Brochures & Public REST API Documentation`
  },
  {
    question: "What financial components must be aggregated to determine the Quantitative Valuation of an Information Asset?",
    shortAnswer: "1. Acquisition & Development Cost; 2. Replacement Cost; 3. Revenue Dependency / Business Interruption Cost; 4. Legal & Regulatory Liabilities (DPDP/PMLA fines); 5. Intellectual Property & Brand Reputation Loss.",
    explanation: "Valuing an asset is not merely looking up hardware purchase invoices. If a core database server costing ₹5 Lakhs is stolen, the true asset value includes: ₹5 Lakhs replacement cost + ₹20 Lakhs developer recovery time + ₹5 Crores in daily lost transaction revenue + ₹250 Crores in statutory DPDP Act penalties under Section 33. The true quantitative value is over ₹255 Crores!",
    hint: "Total Value = Hardware Cost + Rebuilding Cost + Daily Revenue Loss + Statutory Fines + Brand Damage.",
    level: "moderate",
    codeExample: `// Quantitative Asset Valuation Equation:
Total_Asset_Value = Cost_Hardware + Cost_Dev_Rebuild + Revenue_Loss_Daily + Legal_Liability + Brand_Damage;
Example:
Total = ₹5,00,000 + ₹25,00,000 + ₹3,00,00,000 + ₹25,00,00,000 + ₹10,00,00,000 = ₹38.3 Crores!`
  },
  {
    question: "What is Qualitative Asset Valuation using the CIA Triad Impact Scoring methodology?",
    shortAnswer: "Assigning discrete numerical ratings (e.g. 1 to 5) to evaluate the potential business damage resulting from a loss of Confidentiality (C), Integrity (I), or Availability (A) of the asset.",
    explanation: "When exact financial numbers are difficult to quantify, organizations use CIA qualitative impact scoring: 1. Confidentiality Impact (1-5): Impact if data is exposed to public; 2. Integrity Impact (1-5): Impact if data is tampered with or corrupted; 3. Availability Impact (1-5): Impact if systems suffer downtime. The asset's Criticality Score is often the maximum or weighted sum of the three ratings.",
    hint: "Rate the impact on Confidentiality, Integrity, and Availability from 1 to 5.",
    level: "basic",
    codeExample: `// CIA Triad Qualitative Asset Scoring:
Asset: Core Payment Switch Ledger
- Confidentiality Impact: 5 / 5 (Catastrophic regulatory fines if stolen)
- Integrity Impact:       5 / 5 (Catastrophic financial fraud if balances modified)
- Availability Impact:    5 / 5 (Catastrophic transaction halt if offline)
➔ Overall Criticality:   CRITICAL (Score: 15/15 ➔ Maximum Tier 1 Protection Required)`
  },
  {
    question: "What is the difference between an Asset Owner and an Asset Custodian under ISO 27001 Control A.5.9?",
    shortAnswer: "The Asset Owner is the senior business executive responsible for classifying the asset and deciding who may access it; the Asset Custodian is the technical administrator responsible for implementing and maintaining the technical safeguards.",
    explanation: "Separation of roles is critical for governance: 1. Asset Owner (e.g. Chief Financial Officer): Owns the financial ledger data, determines its 'Restricted' classification, and approves access requests; 2. Asset Custodian (e.g. Senior Linux Sysadmin / DBA): Implements the AES-256 encryption, configures automated backups, and monitors database health as instructed by the owner.",
    hint: "Owner makes the business and access rules; Custodian implements the technical locks.",
    level: "moderate",
    codeExample: `// Owner vs Custodian Accountability:
Asset:           Customer KYC Aadhaar Vault
Asset Owner:     Head of Compliance (Business Authority ➔ Approves access & retention)
Asset Custodian: Lead DevOps Engineer Mamata (Technical Execution ➔ Configures KMS & backups)`
  },
  {
    question: "How does the Indian Information Technology Act 2000 declare and protect 'Critical Information Infrastructure' (CII) under Section 70?",
    shortAnswer: "Section 70 empowers the appropriate Government to declare any computer resource whose destruction would have a debilitating impact on national security, economy, or public health as a 'Protected System', managed under NCIIPC guidelines.",
    explanation: "Certain high-value national assets (e.g. power grid SCADA systems, nuclear power telemetry, banking switches, air traffic control) are designated as Protected Systems. Accessing or attempting to secure access to a Protected System without authorization is punishable under Section 70(3) with up to 10 years rigorous imprisonment.",
    hint: "Protected Systems under Section 70 protect vital national infrastructure with 10-year prison sentences.",
    level: "moderate",
    codeExample: `// IT Act Section 70 Protected System Declaration:
Asset:         220kV High-Voltage SCADA Grid Substation Switching Controller
Authority:     Declared Protected System by West Bengal State Load Despatch Center & NCIIPC
Penal Sanction:Unauthorized access punishable under Section 70(3) with up to 10 Years Imprisonment!`
  },
  {
    question: "Why must an Information Asset Register (IAR) be updated dynamically via Automated Cloud Discovery tools?",
    shortAnswer: "Manual spreadsheets become obsolete within days in modern dynamic cloud environments where microservices, containers, and serverless databases are provisioned and deleted automatically.",
    explanation: "In modern cloud architectures (AWS, Azure, GCP), developers launch ephemeral instances, S3 buckets, and Lambda functions daily. A manual Excel sheet results in 'Shadow IT' and uninventoried orphan assets. Modern IARs ingest automated API telemetry from CloudTrail, AWS Config, and CMDBs to maintain real-time, continuous asset inventories.",
    hint: "Cloud servers change by the minute; automated discovery prevents blind spots and shadow IT.",
    level: "moderate",
    codeExample: `// Automated AWS Config Asset Discovery Rule:
trigger: OnResourceCreation (AWS::S3::Bucket OR AWS::RDS::DBInstance)
action:  Extract Tags { "Owner": "FinTech_Billing", "Classification": "Confidential" }
output:  Auto-update Central Information Asset Register in ServiceNow CMDB in < 5 seconds!`
  },
  {
    question: "Under the Indian DPDP Act 2023, why does Asset Valuation for personal data repositories directly impact corporate financial risk?",
    shortAnswer: "Because Section 33 establishes statutory penalty tiers up to ₹250 Crores per violation; personal data assets carrying millions of citizen records carry multi-crore legal liabilities that dwarf the physical hardware cost.",
    explanation: "When calculating the value of a PostgreSQL database storing 1,000,000 citizen KYC records, the physical server cost (₹2 Lakhs) is negligible compared to the statutory exposure. Under the DPDP Act 2023, a failure to implement reasonable safeguards on that personal data asset exposes the firm to penalties up to ₹250 Crores, mandating Tier 1 Restricted security controls.",
    hint: "Statutory fines under DPDP Act transform small databases into ₹250 Crore financial assets.",
    level: "basic",
    codeExample: `// DPDP Act Asset Risk Valuation:
Asset:          1,000,000 Kolkata Citizen Aadhaar & Mobile Records
Physical Cost:  ₹1,50,000 (Cloud storage fee)
Statutory Risk: ₹250,00,00,000 (Section 33 statutory fine cap for data breach)
Asset Valuation:₹250.015 Crores ➔ Classified as RESTRICTED with FIPS 140-3 Hardware HSM protection!`
  },
  {
    question: "What is an 'Orphan Asset', and why does it represent a critical security threat in enterprise asset management?",
    shortAnswer: "An orphan asset is an active, unmonitored IT system, database, or cloud bucket that lacks an assigned Asset Owner; because no one maintains or patches it, it becomes an unmonitored gateway for attackers.",
    explanation: "When developers create test databases or spun-up EC2 instances for a short-term project and leave the company without decommissioning them, an orphan asset is born. Lacking an owner, it never receives security patches, is excluded from quarterly access reviews, and is frequently exploited by ransomware gangs to establish persistent command-and-control backdoors.",
    hint: "An abandoned server with no owner that nobody patches or monitors.",
    level: "basic",
    codeExample: `// Orphan Cloud Asset Quarantine Script:
if resource.tags["AssetOwner"] == null OR resource.last_activity_days > 90 {
    action: TRIGGER_QUARANTINE_ISOLATION
    notify: "Un-owned resource detected. Quarantining network interface pending owner assignment."
}`
  },
  {
    question: "How does Asset Labeling and Handling (ISO 27001 Control A.5.13) enforce classification rules on physical and digital assets?",
    shortAnswer: "By applying visible classification banners, digital watermarks, and cryptographic DLP tags to all documents, emails, and physical media, instructing handlers on required protection procedures.",
    explanation: "Under Control A.5.13, classified information must be clearly labeled: 1. Digital Documents: Header banner stating 'RESTRICTED - DO NOT DISTRIBUTE'; 2. Emails: Automated DLP tagging in Outlook header; 3. Physical Storage: Red label stickers on hard drives and backup tapes; 4. Handling Rules: Restricted documents must be encrypted at rest and never transmitted over unencrypted email.",
    hint: "Put clear warning labels on top of files and red stickers on hardware.",
    level: "moderate",
    codeExample: `// Document Classification Header Standard (Control A.5.13):
[ CLASSIFICATION: RESTRICTED // INTERNAL ENTERPRISE USE ONLY ]
Distribution: Strictly limited to authorized Payment Operations team members.
Sanctions:    Unauthorized disclosure punishable under IT Act Section 43 and Section 66.`
  },
  {
    question: "What is the recommended frequency for conducting full enterprise Information Asset Register (IAR) reviews?",
    shortAnswer: "Annually for all enterprise assets; semi-annually or quarterly for Tier 1 Restricted/Confidential assets; and immediately following any major corporate restructuring, merger, or cloud migration.",
    explanation: "Under ISO 27001 Clause 9.2 (Internal Audit) and Control A.5.9, an outdated IAR invalidates the entire risk assessment. Asset owners must verify their asset inventories at least once every 12 months, verifying that decommissioned hardware is removed, new cloud resources are inventoried, and classification levels still accurately reflect business risk.",
    hint: "Every 12 months for standard assets; every 3 to 6 months for critical restricted data.",
    level: "basic",
    codeExample: `// IAR Governance Review Schedule:
Tier 1 (Restricted):   Quarterly Re-certification (Every 90 Days by CISO)
Tier 2 (Confidential): Semi-Annual Review (Every 180 Days by Asset Owner)
Tier 3 & 4 (Standard): Annual Re-certification (Every 365 Days during Internal Audit)`
  },
  {
    question: "Synthesizing Asset Identification and Asset Valuation: what is the master equation of Asset-Driven Risk Defensibility?",
    shortAnswer: "$$\\text{Asset Defensibility} = \\frac{\\text{IAR Completeness (\\%)} \\times \\text{Quantified Asset Valuation (\\text{₹})} \\times \\text{Control A.5.12 Classification}}{\\text{Orphan Assets} + \\text{Unclassified Data Sprawl}}$$ with continuous automated cloud CMDB synchronization.",
    explanation: "This master governance relationship proves that enterprise risk defensibility is maximized when 100% of information assets are cataloged in an active IAR, accurately valued incorporating statutory DPDP liabilities, and rigorously classified under Control A.5.12. Eliminating orphan assets and data sprawl guarantees unbroken visibility, prioritized security investments, and total statutory safe harbor.",
    hint: "Conclude by reviewing how comprehensive inventory, valuation, and classification eliminate blind spots.",
    level: "expert",
    codeExample: `// Master Equation of Asset Governance Integrity:
Defensibility = (IAR_Completeness * Total_Valuation_Rigor * Classification_Rigor) / (Orphan_Assets + Unclassified_Sprawl);
Outcome: 100% Asset Visibility, Zero Blind Spots & Total Regulatory Compliance under DPDP Act & IT Act Section 70!`
  }
];

export default questions;
