const questions = [
  {
    question: "What is the primary objective of an Enterprise Information Security Risk Management (ERM) Case Study under ISO/IEC 27001:2022?",
    shortAnswer: "To synthesize all phases of the risk management lifecycle—from asset identification and threat modeling to quantitative loss forecasting, treatment planning, and residual risk governance—into an integrated, auditable operational framework.",
    explanation: "Isolated security practices fail without an overarching governance architecture. An end-to-end ERM case study demonstrates how technical controls (firewalls, encryption, EDR) align with quantitative financial metrics (SLE, ALE, ROSI), board risk appetites, and statutory legal requirements (DPDP Act 2023 and RBI guidelines) to ensure enterprise cyber resilience.",
    hint: "Connecting every phase of risk management from asset discovery to board financial sign-off.",
    level: "basic",
    codeExample: `// End-to-End ERM Governance Lifecycle:
[Asset Discovery] ➔ [Threat & CVSS Scan] ➔ [Quantitative ALE] ➔ [Treatment RTP] ➔ [GRC Register] ➔ [Board BRMC Sign-off]`
  },
  {
    question: "In our Kolkata FinTech Case Study (PayShield India), how does the security team justify an ₹18.5 Lakh security budget to the Chief Financial Officer?",
    shortAnswer: "By calculating that the unmitigated Annual Loss Expectancy (ALE) of ₹3.0 Crores drops to ₹15 Lakhs after deploying AWS WAF and EDR, delivering a 1,440% Return on Security Investment (ROSI) and saving ₹2.66 Crores annually.",
    explanation: "Security leaders must speak the language of business. Rather than presenting qualitative red boxes, Lead Architect Mamata presented a quantitative FAIR financial model: Asset Value = ₹15 Crores, Exposure Factor = 40%, Single Loss Expectancy = ₹6 Crores, ARO = 0.5 times/yr. The proposed ₹18.5 Lakh control prevents ₹2.85 Crores in annual losses, securing unanimous board approval.",
    hint: "Proving positive financial ROSI (1,440%) saves the company crores in annualized losses.",
    level: "moderate",
    codeExample: `// PayShield Quantitative Business Case:
Asset Value (AV):   ₹15,00,00,000 (Core UPI Switch)
Exposure Factor:    0.40 (40% damage in ransomware lockout)
SLE:                ₹6,00,00,000 per incident
ARO:                0.5 (Once every 2 years)
ALE Before Control: ₹3,00,00,000 / year
Control Cost:       ₹18,50,000 / year
ALE After Control:  ₹15,00,000 / year
ROSI:               1,440% Net Return (CFO APPROVED!)`
  },
  {
    question: "How does the Case Study integrate the Digital Personal Data Protection (DPDP) Act 2023 Section 8 and Section 33 into Asset Valuation and Risk Treatment?",
    shortAnswer: "By factoring the statutory penalty cap of up to ₹250 Crores into secondary loss calculations and mandating technical mitigation (S3 crypto-shredding, dynamic data masking) to establish statutory Safe Harbor.",
    explanation: "Failing to include legal liabilities underestimates true cyber risk. In the Ichapur Healthcare case study, 80,000 patient biopsy records carried potential ₹250 Crore statutory exposure. Conducting threat modeling, deploying AES-256 encryption, and logging controls in the GRC Risk Register provides legal proof of reasonable safeguards under Section 8, immunizing the hospital from maximum penalties.",
    hint: "Statutory fines up to ₹250 Crores are factored into loss models and defended via documented ISMS.",
    level: "basic",
    codeExample: `// DPDP Statutory Defense Strategy:
Risk: Exfiltration of 80,000 oncology patient biopsy scans
Statutory Exposure: ₹250,00,00,000 (Section 33 Fine Cap)
Treatment:          MITIGATE ➔ AES-256 S3 Object Lock + Dynamic Data Masking + DPA with Cloud PACS
Legal Status:       Full Statutory Safe Harbor under DPDP Act Section 8(5)!`
  },
  {
    question: "What are the 6 sequential stages of an Enterprise Risk Management Implementation Workflow?",
    shortAnswer: "1. Scope & Asset Valuation; 2. Threat & Vulnerability Assessment; 3. Qualitative & Quantitative Risk Analysis; 4. Risk Treatment & RTP Formulation; 5. Risk Register Logging & Residual Verification; 6. Board Reporting & Management Review.",
    explanation: "Under ISO/IEC 27001 Clause 6.1 and 9.3, the ERM process follows a rigorous sequential cycle: discovering what needs protection, identifying threat vectors, calculating financial exposure, selecting treatment controls, verifying residual scores remain within appetite, and presenting results to the Board Risk Management Committee (BRMC).",
    hint: "1. Scope/Assets ➔ 2. Threats ➔ 3. Analysis ➔ 4. Treatment ➔ 5. Register ➔ 6. Board Review.",
    level: "basic",
    codeExample: `// 6-Stage ERM Workflow:
Stage 1: Catalog 500 microservices & determine ₹15 Cr Asset Value
Stage 2: Scan for CVEs and map adversary TTPs to MITRE ATT&CK
Stage 3: Calculate SLE (₹6 Cr) and ALE (₹3 Cr/yr)
Stage 4: Author RTP selecting Annex A controls (A.8.20, A.8.24)
Stage 5: Log in GRC Register & verify Residual Score (1.4 <= 3.0 Appetite)
Stage 6: Obtain formal BRMC Board Sign-off under RBI rules`
  },
  {
    question: "How does the Barrackpore Power Grid Case Study address Critical National Infrastructure (CNI) protection under IT Act Section 70?",
    shortAnswer: "By implementing semi-quantitative risk scoring, deploying unidirectional physical data diodes across 18 high-voltage substations, and enforcing strict air-gapped isolation under NCIIPC guidelines.",
    explanation: "For protected systems under Section 70 of the Information Technology Act 2000, unauthorized access carries up to 10 years imprisonment. The Barrackpore 220kV SCADA case study threat modeled legacy Modbus/DNP3 protocols, banned all remote management access (Risk Avoidance), and installed hardware data diodes to guarantee 100% unidirectional telemetry without inbound attack vectors.",
    hint: "Protected systems under Section 70 require hardware data diodes and air-gapped isolation.",
    level: "moderate",
    codeExample: `// Section 70 Protected System Architecture:
Asset:        18 High-Voltage 220kV Substations (Protected System)
Threat:       Nation-State Command Injection on SCADA RTU (MITRE T0885)
Treatment:    AVOID (Ban remote SSH/RDP) + MITIGATE (Unidirectional Hardware Data Diodes)
Legal Status: 100% NCIIPC & IT Act Section 70 Compliance`
  },
  {
    question: "Why must third-party software dependencies (e.g. open-source npm/Java libraries) be audited within the Enterprise Case Study?",
    shortAnswer: "Because modern enterprise applications rely on thousands of external packages; unmonitored transitive dependencies (like Log4j) introduce severe zero-day Remote Code Execution risks that bypass perimeter firewalls.",
    explanation: "In our Kolkata FinTech case study, 500 payment microservices integrated 45 third-party SDKs and 4,200 open-source libraries. Lead Architect Mamata mandated automated Software Composition Analysis (SCA) and CycloneDX SBOM ingestion in CI/CD pipelines, automatically intercepting 14 vulnerable transitive libraries before production deployment.",
    hint: "External libraries contain hidden transitive vulnerabilities that must be caught using SBOMs and SCA.",
    level: "moderate",
    codeExample: `// Supply Chain Interception in Case Study:
Service:     ` + "`payment-crypto-service:v2.4.0`" + `
SCA Scan:    Discovers transitive dependency ` + "`log4j-core:2.14.1`" + ` (CVSS 9.8 RCE)
CI/CD Gate:  Build BLOCKED automatically; patch upgraded to v2.17.1 before deployment!`
  },
  {
    question: "What role does the 'Risk Appetite Benchmark' play in determining whether a new software release is approved for production deployment?",
    shortAnswer: "If an asset's post-treatment Residual Risk Score is less than or equal to the Board's approved Risk Appetite (e.g. <= 4.0), the release is approved; if residual risk exceeds appetite, deployment is strictly blocked.",
    explanation: "Risk appetite is the non-negotiable governance barrier. Even if developers meet all feature deadlines, if an architectural threat model reveals an unmitigated Elevation of Privilege flaw that leaves the residual risk score at 6.8 (above the 4.0 threshold), the automated GRC release gate blocks production deployment until compensatory controls are verified.",
    hint: "Residual Risk <= Risk Appetite = RELEASE APPROVED; Residual Risk > Appetite = BLOCKED.",
    level: "basic",
    codeExample: `// Automated GRC Release Gate Decision:
Board Risk Appetite Threshold: <= 4.0 / 25
Pre-Release Residual Score:    2.5 / 25 (Low)
Pipeline Decision:             ✔ APPROVED: Automatic deployment to Kubernetes production cluster!`
  },
  {
    question: "How does the Case Study demonstrate the synergy between Qualitative 5x5 Heatmaps and Quantitative FAIR Financial Modeling?",
    shortAnswer: "Qualitative 5x5 heatmaps are used for rapid initial screening across all 500 microservices; Quantitative FAIR financial modeling is applied to the top 10 Critical Tier 1 payment switches requiring multi-lakh budget justifications.",
    explanation: "Conducting full quantitative modeling on every minor internal script is financially inefficient. The enterprise case study demonstrates a hybrid approach: triage 500 services in an afternoon using a qualitative 5x5 matrix; then calculate exact SLE, ALE, and ROSI figures for the core payment switch and patient databases to secure CFO capital approval.",
    hint: "Qualitative for broad fast triage; Quantitative for high-stakes financial budgets.",
    level: "moderate",
    codeExample: `// Hybrid Enterprise Risk Strategy:
Broad Screening:   Qualitative 5x5 Heatmap triages 500 microservices in 4 hours
Deep Valuation:    Quantitative FAIR calculates exact ₹3.0 Cr ALE on core payment switch`
  },
  {
    question: "What evidence must the CISO present during the ISO/IEC 27001 Clause 9.3 Management Review meeting?",
    shortAnswer: "1. The updated Enterprise Risk Register; 2. Status of the Risk Treatment Plan (RTP) and patch SLAs; 3. Statement of Applicability (SoA) audit justifications; 4. Results of internal/external penetration tests; 5. Metrics proving residual risks are within appetite.",
    explanation: "Clause 9.3 requires top management to review the ISMS at planned intervals. The CISO presents the complete operational portfolio: proving that 100% of Critical CVEs were remediated within 48 hours, demonstrating that cyber insurance policies are active, and securing executive sign-off on all accepted residual risks.",
    hint: "Risk Register, RTP status, SoA justifications, pentest results, and residual risk metrics.",
    level: "moderate",
    codeExample: `// Clause 9.3 Management Review Docket:
Docket 1: Enterprise Risk Register RSK-2026 (100% assets governed)
Docket 2: RTP Completion Status (34 of 34 mitigation actions deployed)
Docket 3: SoA Version 4.2 (All 93 Annex A controls formally justified)
Docket 4: Board BRMC Resolution approving ₹18.5 Lakh security budget`
  },
  {
    question: "How does Cyber Insurance complement technical mitigation in the PayShield India case study?",
    shortAnswer: "Technical controls (WAF, EDR, mTLS) reduce the likelihood and frequency of routine attacks (ALE reduction), while a ₹50 Crore Cyber Insurance policy transfers the catastrophic financial tail risk of worst-case systemic outages.",
    explanation: "No technical defense is 100% infallible against zero-day nation-state attacks. PayShield deploys state-of-the-art mitigation to prevent 99% of threats, and purchases a ₹50 Crore cyber insurance policy (Transfer) to absorb extreme business interruption, forensic response costs, and regulatory litigation if a catastrophic breach occurs.",
    hint: "Mitigation stops everyday attacks; insurance transfers the worst-case disaster tail risk.",
    level: "basic",
    codeExample: `// Dual Defense Portfolio:
Layer 1 (Mitigation): AWS WAF + CrowdStrike EDR + FIDO2 ➔ Reduces routine ALE by 95%
Layer 2 (Transfer):   ₹50 Crore HDFC ERGO Cyber Insurance ➔ Covers catastrophic tail risk!`
  },
  {
    question: "What are the common failure modes in Enterprise Risk Management programs, and how does this case study prevent them?",
    shortAnswer: "1. Static Spreadsheet Trap (Prevented by automated ServiceNow GRC); 2. Unowned Orphan Risks (Prevented by named owner SLAs); 3. Pitching Colors to CFOs (Prevented by quantitative ROSI); 4. Supply Chain Blindness (Prevented by SBOMs).",
    explanation: "ERM programs fail when they become academic paper exercises. This case study demonstrates enterprise maturity: automating scanner feeds directly into the risk register, assigning clear calendar SLAs to named engineers, proving financial return to leadership, and mandating SBOM dependency checks across the entire software supply chain.",
    hint: "Avoid static Excel sheets, orphan risks, color-only pitches, and unmonitored vendor packages.",
    level: "moderate",
    codeExample: `// ERM Anti-Pattern Prevention:
Anti-Pattern: Static Excel Sheet ➔ Solution: Automated GRC Database with Scanner Sync
Anti-Pattern: Pitching Colors     ➔ Solution: Quantitative Rupee ALE and ROSI Modeling
Anti-Pattern: Vendor Blind Spots  ➔ Solution: CycloneDX Machine-Readable SBOM Ingestion`
  },
  {
    question: "Synthesizing the entire Information Security Risk Management module: what is the Master Equation of Enterprise Cyber Resilience?",
    shortAnswer: "$$\\text{Enterprise Resilience} = \\frac{\\text{Asset Visibility} \\times \\text{Quantitative Financial Rigor (ROSI)} \\times \\text{RTP Treatment Velocity}}{\\sum (\\text{Residual Risk} - \\text{Appetite})^{+} + \\text{Supply Chain Vulnerabilities}} \\ge 1.0$$ with unbroken ISO 27001, DPDP Act 2023, and RBI safe harbor compliance.",
    explanation: "This ultimate capstone relationship proves that modern cybersecurity governance succeeds when complete asset visibility, rigorous quantitative financial loss modeling, rapid SLA-driven risk treatment, and supply chain SBOM governance converge to keep residual risks strictly below board appetite. This guarantees unshakeable operational resilience, executive alignment, and total statutory safe harbor.",
    hint: "Conclude by reviewing how asset visibility, quantitative ROSI, RTP execution, and supply chain control guarantee enterprise cyber resilience.",
    level: "expert",
    codeExample: `// Master Equation of Enterprise Cyber Governance:
Resilience = (Asset_Coverage * Quantitative_ROSI * RTP_Velocity) / (Over_Appetite_Residuals + Supply_Chain_Gaps);
Condition:  Residual_Risk <= Board_Risk_Appetite (<= 3.0);
Outcome:    100% Audit Conformance, Bulletproof Operations & Total Regulatory Safe Harbor!`
  }
];

export default questions;
